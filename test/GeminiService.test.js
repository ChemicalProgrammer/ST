import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function setup({status=200,denied=false,answer='Observed throughput: 42.'}={}) {
 const values={GEMINI_API_KEY:'private-test-key'},calls=[];
 let record;
 const ctx={PropertiesService:{getUserProperties:()=>({getProperty:k=>values[k]||null})},createSimulatorError_:(code,message,details)=>Object.assign(new Error(message),{code,details}),getCase_:(id,user)=>{assert.equal(user.email,'owner@test');if(denied)throw Error('Access denied');return record;},UrlFetchApp:{fetch:(url,options)=>{calls.push({url,options});return {getResponseCode:()=>status,getContentText:()=>JSON.stringify({candidates:[{content:{parts:[{text:answer}]}}]})};}}};
 vm.createContext(ctx);
 for(const file of ['TextResources.gs','PublicDemoCaseFactory.gs','ScenarioEngine.gs','ScenarioService.gs','GeminiContext.gs','GeminiService.gs'])vm.runInContext(fs.readFileSync('apps-script/'+file,'utf8'),ctx);
 const demo=JSON.parse(JSON.stringify(ctx.createPublicDemoCaseRequest_()));
 record={id:'case-a',name:'Case A',revision:1,unitOfFlow:'units',simulations:[{id:'a',name:'Simulation A',equipment:demo.equipment,dynamicConfig:{durationSeconds:60,tickSeconds:.25,sampleEverySeconds:1,seed:7,commands:[]},results:{summary:{throughput:42},equipmentMetrics:{},replay:{samples:[{privateReplay:'x'.repeat(2100000)}]}}}]};
 return {ctx,calls,values,record};
}
const request={caseId:'case-a',simulationId:'a',question:'Analyze',history:[]},user={email:'owner@test'};
test('Gemini sends compact selected-simulation context even when replay exceeds the old limit',()=>{
 const {ctx,calls,record}=setup();
 record.simulations.push({...record.simulations[0],id:'b',name:'Other simulation'});
 assert(!JSON.stringify(ctx.getGeminiClientConfig_()).includes('private-test-key'));
 const result=ctx.askGemini_(request,user);assert.match(result.text,/42/);
 const sent=calls[0],payload=sent.options.payload;
 assert.equal(sent.options.headers['x-goog-api-key'],'private-test-key');assert(!payload.includes('private-test-key'));assert(payload.includes('Filler'));assert(payload.includes('throughput'));
 assert(!payload.includes('privateReplay'));assert(payload.length<120000);assert.equal(result.context.replayIncluded,false);assert.equal(result.context.includedEquipment,13);
 assert(JSON.parse(payload).systemInstruction.parts[0].text.includes('entirely in English'));
});
test('Gemini rejects inaccessible cases and nonexistent selected simulations before HTTP',()=>{
 const {ctx,calls}=setup({denied:true});assert.throws(()=>ctx.askGemini_(request,user),/Access denied/);assert.equal(calls.length,0);
 assert.throws(()=>ctx.normalizeGeminiSettings_({model:'../../evil'}),/Check/);
 const other=setup();assert.throws(()=>other.ctx.askGemini_({...request,simulationId:'missing'},user),/Select an existing/);assert.equal(other.calls.length,0);
});
test('Gemini sanitizes remote errors and reports missing keys',()=>{
 const {ctx,values}=setup({status:403});assert.throws(()=>ctx.askGemini_(request,user),/HTTP 403/);delete values.GEMINI_API_KEY;assert.throws(()=>ctx.askGemini_(request,user),/API key in Settings/);
});
test('Gemini accepts validated changes and binds buttons to the original simulation inputs',()=>{
 const fixture=setup(),project=fixture.ctx.STScenarioEngine_.plan(fixture.record.simulations[0]).projects.find(p=>p.canApply);
 const proposal={...project,title:'Test the infeed speed',description:'Static engineering hypothesis'};
 const h=setup({answer:JSON.stringify({text:'Review this scenario.',proposals:[proposal,{...proposal,changes:[{equipmentId:'missing',path:'__proto__.bad',before:null,after:4}]}]})});
 const result=h.ctx.askGemini_(request,user);assert.equal(result.proposals.length,1);assert.equal(result.proposals[0].sourceSimulationId,'a');assert(result.proposals[0].sourceSignature);assert.match(result.text,/did not pass/);
 assert.equal(Object.prototype.bad,undefined);
});
test('history uses a bounded suffix and reports omitted messages',()=>{
 const h=setup();const history=Array.from({length:24},(_,i)=>({role:i%2?'model':'user',text:'text'.repeat(2000)}));
 const result=h.ctx.askGemini_({...request,history},user);assert(result.historyOmitted>0);assert(h.calls[0].options.payload.length<125000);
});
