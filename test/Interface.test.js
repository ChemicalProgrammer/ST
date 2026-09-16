import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { JSDOM, VirtualConsole } from 'jsdom';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
const read = file => fs.readFileSync(new URL('../apps-script/'+file,import.meta.url),'utf8');
const settle = () => new Promise(resolve=>setTimeout(resolve,35));
async function setup({remember=false,fail=false,many=false}={}) {
 const context={}; vm.createContext(context);vm.runInContext(read('PublicDemoCaseFactory.gs'),context);
 const initial=JSON.parse(JSON.stringify(context.createPublicDemoCaseRequest_()));
 Object.assign(initial,{id:'demo',revision:1,updatedAt:'2026-09-15T10:00:00Z'});
 let cases=[initial], stored={workspaceRootFolderId:'preview',preferredPlaybackRate:10}, calls=[];
 if(many) cases=Array.from({length:60},(_,i)=>({...initial,id:'case-'+i,name:'Line '+String(i).padStart(2,'0')}));
 const copy=x=>JSON.parse(JSON.stringify(x));
 const api={
  getBootstrap:()=>({user:{email:'preview@example.test'},settings:stored,globalConfig:{},cases:cases.map(c=>({id:c.id,name:c.name,equipmentCount:c.equipment.length,isSimulationReady:c.equipment.length>1,updatedAt:c.updatedAt}))}),
  getCase:id=>copy(cases.find(c=>c.id===id)),
  saveCase:c=>{c=copy(c);c.revision++;cases=cases.map(x=>x.id===c.id?c:x);return c;},
  saveUserSettings:s=>(stored=s),
  cloneSimulation:(id,sid)=>{const c=cases.find(c=>c.id===id),source=c.simulations.find(s=>s.id===sid),next=copy(source);next.id='simulation-b';next.name='Simulation B';next.results=null;c.simulations.push(next);return copy(c);},
  deleteCase:id=>{cases=cases.filter(c=>c.id!==id);return {id};},
  createCase:c=>{c={...c,id:'new',equipment:[],revision:1,updatedAt:new Date().toISOString()};cases.push(c);return c;}
 };
 const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 let media;
 const dom=new JSDOM(read('Index.html'),{url:'https://st.test/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  if(remember)w.localStorage.setItem('st.ui.v1.remember','yes');
  media={matches:false,addEventListener(_,fn){this.listener=fn;}};w.matchMedia=()=>media;
  w.confirm=()=>true;w.scrollBy=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
  w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({},{get:()=>()=>{}});
  function runner(success,failure){return new Proxy({withSuccessHandler:fn=>runner(fn,failure),withFailureHandler:fn=>runner(success,fn)},{get:(o,key)=>o[key]||((...args)=>{calls.push(key);setTimeout(()=>{try{if(fail)throw Error('offline');if(!api[key])throw Error('Unmocked '+key);success({ok:true,data:api[key](...args)});}catch(e){failure(e);}},0);})});}
  w.google={script:{run:runner()}};
 }});
 await new Promise(r=>dom.window.addEventListener('load',r));await settle();
 const w=dom.window,d=w.document;
 return {w,d,dom,errors,calls,media,click:async selector=>{d.querySelector(selector).click();await settle();},visible:id=>!d.getElementById(id).classList.contains('hidden')};
}
test('UI: cases-only entry, accessible navigation, theme settings and remembered access',async()=>{
 const h=await setup();try{
  assert.equal(h.d.documentElement.dataset.theme,'light');assert(h.visible('auth-panel'));assert(!h.visible('application'));
  h.d.getElementById('remember-session').checked=true;await h.click('#sign-in-button');
  assert(h.visible('cases-panel'));for(const id of ['run-panel','editor-panel','results-panel','whatif-panel'])assert(!h.visible(id));
  assert.equal(h.d.querySelectorAll('.case-row').length,1);assert.equal(h.w.localStorage.getItem('st.ui.v1.remember'),'yes');
  await h.click('#open-settings');assert(h.d.getElementById('settings-dialog').open);
  const theme=h.d.getElementById('settings-theme');theme.value='dark';theme.dispatchEvent(new h.w.Event('change'));assert.equal(h.d.documentElement.dataset.theme,'dark');
  theme.value='auto';theme.dispatchEvent(new h.w.Event('change'));h.media.matches=true;h.media.listener();assert.equal(h.d.documentElement.dataset.theme,'dark');
  h.media.matches=false;h.media.listener();assert.equal(h.d.documentElement.dataset.theme,'light');
  const field=h.d.getElementById('workspace-folder-id');field.value='new-folder';field.dispatchEvent(new h.w.Event('input',{bubbles:true}));assert.match(h.d.getElementById('settings-unsaved').textContent,/Unsaved/);
  h.d.getElementById('settings-dialog').dispatchEvent(new h.w.Event('cancel',{cancelable:true}));assert(!h.d.getElementById('settings-dialog').open);assert.equal(field.value,'preview');
  await h.click('#open-settings');field.value='saved-folder';await h.click('#settings-save');assert(!h.d.getElementById('settings-dialog').open);assert.equal(field.value,'saved-folder');
  await h.click('#collapse-sidebar');assert(h.d.getElementById('application').classList.contains('sidebar-collapsed'));
  await h.click('#sign-out');assert(h.visible('auth-panel'));assert.equal(h.w.localStorage.getItem('st.ui.v1.remember'),null);
  assert.deepEqual(h.errors,[]);
 }finally{h.dom.window.close();}
 const remembered=await setup({remember:true});assert(remembered.visible('application'));remembered.dom.window.close();
});
test('UI: run, edit, clone, compare, and delete retain the existing engine workflow',async()=>{
 const h=await setup();try{
  await h.click('#sign-in-button');await h.click('.open-case');assert(h.visible('run-panel'));assert(!h.visible('editor-panel'));
  await h.click('.sidebar [data-view="editor"]');assert(h.visible('editor-panel'));assert.equal(h.d.querySelectorAll('.equipment-card').length,13);
  await h.click('.toggle-step');assert.equal(h.d.querySelector('.toggle-step').getAttribute('aria-expanded'),'true');
  await h.click('.sidebar [data-view="simulation"]');h.d.getElementById('run-duration').value='60';await h.click('#run-simulation');await settle();await h.click('#pause-simulation');
  assert.equal(h.d.querySelectorAll('.live-equipment-card').length,13,h.d.getElementById('status').textContent+' '+JSON.stringify(h.errors));await h.click('.loss-toggle');assert(h.d.querySelector('.live-equipment-card').classList.contains('show-losses'));
  await h.click('.sidebar [data-view="results"]');assert(h.visible('results-panel'));assert.equal(h.d.querySelectorAll('#results-table tbody tr').length,13);
  assert.match(h.d.getElementById('results-reference').textContent,/equipment-minutes/);assert(!h.d.getElementById('export-results').disabled);
  await h.click('.sidebar [data-view="editor"]');await h.click('#clone-case');await settle();
  await h.click('.sidebar [data-view="whatif"]');assert(h.visible('whatif-panel'));assert(h.d.querySelector('#case-comparison-content .comparison-context'));
  await h.click('.sidebar [data-view="simulation"]');await h.click('#run-simulation');await settle();await h.click('#pause-simulation');
  await h.click('.sidebar [data-view="whatif"]');assert(h.d.querySelector('#case-comparison-content table'));assert.match(h.d.getElementById('case-comparison-content').textContent,/Absolute Δ/);
  await h.click('#home-cases');assert(h.visible('cases-panel'));await h.click('.delete-case');assert.equal(h.d.querySelectorAll('.case-row').length,0);
  assert.deepEqual(h.errors,[]);
 }finally{h.dom.window.close();}
});
test('UI: compact case pagination, search and filters',async()=>{
 const h=await setup({many:true});try{
  await h.click('#sign-in-button');assert.equal(h.d.querySelectorAll('.case-row').length,24);await h.click('#case-pagination button:last-child');assert.match(h.d.getElementById('case-pagination').textContent,/Page 2/);
  const search=h.d.getElementById('case-search');search.value='Line 59';search.dispatchEvent(new h.w.Event('input'));assert.equal(h.d.querySelectorAll('.case-row').length,1);
  const filter=h.d.getElementById('case-filter');filter.value='draft';filter.dispatchEvent(new h.w.Event('change'));assert.equal(h.d.querySelectorAll('.case-row').length,0);assert.match(h.d.getElementById('cases-list').textContent,/No matching/);
  assert.deepEqual(h.errors,[]);
 }finally{h.dom.window.close();}
});
test('UI: network failure restores entry and reports the error',async()=>{
 const h=await setup({fail:true});try{await h.click('#sign-in-button');assert(h.visible('auth-panel'));assert(!h.d.getElementById('sign-in-button').disabled);assert.match(h.d.getElementById('auth-status').textContent,/NETWORK_ERROR/);assert.deepEqual(h.errors,[]);}finally{h.dom.window.close();}
});
test('styles have valid selectors and all custom properties are defined',()=>{
 const html=read('Index.html'),css=[...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');const ast=postcss.parse(css),defined=new Set(),used=new Set();
 ast.walkRules(rule=>{selectorParser().astSync(rule.selector);assert.doesNotMatch(rule.selector,/:\s+(?:hover|not|active|disabled)/);});
 ast.walkDecls(decl=>{if(decl.prop.startsWith('--'))defined.add(decl.prop);for(const m of decl.value.matchAll(/var\((--[\w-]+)/g))used.add(m[1]);});
 assert.deepEqual([...used].filter(name=>!defined.has(name)),[]);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'IDs must remain unique');
});
test('semantic text and chart colors retain contrast in both palettes',()=>{
 const ast=postcss.parse(read('DesignTokens.html').replace(/<\/?style>/g,'')),base={},dark={};
 ast.walkRules(rule=>{const target=rule.selector.includes('data-theme')?dark:base;rule.walkDecls(d=>{target[d.prop]=d.value;});});
 function resolve(map,key){let value=map[key];for(let i=0;i<8&&value?.startsWith('var(');i++)value=map[value.slice(4,-1)];return value;}
 function luminance(hex){let c=hex.replace('#','');if(c.length===3)c=c.split('').map(v=>v+v).join('');return [0,2,4].map((p)=>parseInt(c.slice(p,p+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);}
 function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
 for(const [name,palette] of [['light',base],['dark',{...base,...dark}]]) {
  for(const [fg,bg] of [['ink','surface'],['muted','surface'],['muted','surface-soft'],['on-accent','accent'],['selected-text','selected'],...['success','warning','danger','info','critical','running','stopped','starved','blocked','failure'].map(k=>[k,k+'-soft'])])assert(contrast(resolve(palette,'--'+fg),resolve(palette,'--'+bg))>=4.5,name+': '+fg);
  for(let i=0;i<13;i++)assert(contrast(resolve(palette,'--series-'+i),resolve(palette,'--surface'))>=3,name+': series '+i);
 }
});
