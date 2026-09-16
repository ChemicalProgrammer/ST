import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function setup({status=200,denied=false}={}) {
 const values={GEMINI_API_KEY:'private-test-key'},calls=[];
 const ctx={PropertiesService:{getUserProperties:()=>({getProperty:k=>values[k]||null})},createSimulatorError_:(code,message)=>Object.assign(new Error(message),{code}),getCase_:(id,user)=>{assert.equal(user.email,'owner@test');if(denied)throw Error('Access denied');return {id,equipment:[{name:'Filler'}],simulations:[{results:{throughput:42}}]};},UrlFetchApp:{fetch:(url,options)=>{calls.push({url,options});return {getResponseCode:()=>status,getContentText:()=>JSON.stringify({candidates:[{content:{parts:[{text:'Observed throughput: 42.'}]}}]})};}}};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('apps-script/GeminiService.gs','utf8'),ctx);return {ctx,calls,values};
}
test('Gemini uses owned saved case and server key; bootstrap never exposes key',()=>{
 const {ctx,calls}=setup();assert.equal(JSON.stringify(ctx.getGeminiClientConfig_()).includes('private-test-key'),false);
 assert.match(ctx.askGemini_({caseId:'case-a',question:'Analyze',history:[]},{email:'owner@test'}).text,/42/);
 const sent=calls[0];assert.equal(sent.options.headers['x-goog-api-key'],'private-test-key');assert(!sent.options.payload.includes('private-test-key'));assert.match(sent.options.payload,/Filler/);assert.match(sent.options.payload,/throughput/);
});
test('Gemini rejects inaccessible cases and invalid requests before HTTP',()=>{
 const {ctx,calls}=setup({denied:true});assert.throws(()=>ctx.askGemini_({caseId:'other',question:'Analyze'},{email:'owner@test'}),/Access denied/);assert.equal(calls.length,0);
 assert.throws(()=>ctx.normalizeGeminiSettings_({model:'../../evil'}),/Check/);
});
test('Gemini sanitizes remote errors and reports missing keys',()=>{
 const {ctx,values}=setup({status:403});assert.throws(()=>ctx.askGemini_({caseId:'a',question:'Analyze'},{email:'owner@test'}),/HTTP 403/);delete values.GEMINI_API_KEY;assert.throws(()=>ctx.askGemini_({caseId:'a',question:'Analyze'},{email:'owner@test'}),/API key in Settings/);
});
