import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('deleting the current user API key retains the model and other users settings', () => {
  const accounts = {alice:{GEMINI_API_KEY:'alice-secret',GEMINI_MODEL:'gemini-2.5-pro',USER_SETTINGS_JSON:'{"workspaceRootFolderId":"alice"}'},bob:{GEMINI_API_KEY:'bob-secret'}};
  let current='alice';
  const context=vm.createContext({
    PropertiesService:{getUserProperties:()=>({
      getProperty:key=>accounts[current][key]||null,
      deleteProperty:key=>{delete accounts[current][key];}
    })},
    requireCurrentUser_:()=>({email:current+'@example.test'})
  });
  for(const file of ['ApiResponse.gs','GeminiService.gs','Main.gs'])vm.runInContext(fs.readFileSync('apps-script/'+file,'utf8'),context,{filename:file});
  const result=context.deleteGeminiApiKey();
  assert.equal(result.ok,true);
  assert.equal(result.data.configured,false);
  assert.equal(result.data.model,'gemini-2.5-pro');
  assert.equal(accounts.alice.GEMINI_API_KEY,undefined);
  assert.equal(accounts.alice.USER_SETTINGS_JSON,'{"workspaceRootFolderId":"alice"}');
  assert.equal(accounts.bob.GEMINI_API_KEY,'bob-secret');
  assert.doesNotMatch(JSON.stringify(result),/alice-secret|bob-secret/);
  current='bob';
  assert.equal(context.getGeminiClientConfig_().configured,true);
});
