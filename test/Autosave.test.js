import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
function setup(){
 const sent=[],statuses=[];let value='first',revision=1;
 const ctx={window:{},setTimeout,clearTimeout,__ST_TEXT__:x=>x};vm.createContext(ctx);vm.runInContext(fs.readFileSync('apps-script/Autosave.html','utf8').replace(/<\/?script>/g,''),ctx);
 const queue=ctx.window.STAutosave({capture:()=>({value,expectedRevision:revision}),send:(payload,done)=>sent.push({payload,done}),accept:s=>{revision=s.revision;},status:(s,e)=>statuses.push({s,e})});
 return {queue,sent,statuses,edit:v=>{value=v;queue.change();},revision:()=>revision};
}
test('autosave serializes edits during flight without replacing the current editor',async()=>{
 const h=setup();h.edit('first');const pending=h.queue.flush();assert.equal(h.sent.length,1);h.edit('second');assert.equal(h.sent.length,1);
 h.sent[0].done({ok:true,data:{revision:2}});assert.equal(h.sent.length,2);assert.equal(h.sent[1].payload.value,'second');assert.equal(h.sent[1].payload.expectedRevision,2);
 h.sent[1].done({ok:true,data:{revision:3}});await pending;assert(!h.queue.pending());assert.equal(h.revision(),3);
});
test('autosave retains failed edits and retries transient errors',async()=>{
 const h=setup();h.edit('retained');const failed=h.queue.flush();h.sent[0].done({ok:false,error:{code:'NETWORK_ERROR',message:'offline'}});await assert.rejects(failed,/offline/);assert(h.queue.pending());
 const retry=h.queue.retry();assert.equal(h.sent[1].payload.value,'retained');h.sent[1].done({ok:true,data:{revision:2}});await retry;assert(!h.queue.pending());
});
test('autosave never silently retries a conflicting revision',async()=>{
 const h=setup();h.edit('local');const failed=h.queue.flush();h.sent[0].done({ok:false,error:{code:'CASE_CONFLICT',message:'conflict'}});await assert.rejects(failed,/conflict/);
 h.edit('more local edits');await assert.rejects(h.queue.flush(),/conflict/);assert.equal(h.sent.length,1);assert(h.queue.pending());h.queue.reset();
});
