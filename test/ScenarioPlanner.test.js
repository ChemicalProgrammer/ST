import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {planScenarios,applyScenarioChanges,scenarioSignature,scenarioAudit} from '../src/analysis/ScenarioPlanner.js';
function fixture(){const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('apps-script/PublicDemoCaseFactory.gs','utf8'),c);return {id:'a',name:'Simulation A',equipment:JSON.parse(JSON.stringify(c.createPublicDemoCaseRequest_().equipment)),dynamicConfig:{durationSeconds:60,tickSeconds:.25,sampleEverySeconds:1,seed:17,commands:[]},results:null};}
test('static design produces three explicit categories without inventing dynamic metrics',()=>{
 const sim=fixture(),snapshot=JSON.stringify(sim),plan=planScenarios(sim);
 assert.deepEqual(plan.projects.map(p=>p.tier),['ZERO','MEDIUM','HIGH']);assert(plan.projects.every(p=>p.basis==='STATIC'));assert.equal(JSON.stringify(sim),snapshot);
 const project=plan.projects.find(p=>p.canApply);assert(project);const copy=applyScenarioChanges(sim,project.changes);assert.equal(copy.dynamicConfig.seed,17);assert.equal(copy.results,null);assert.notDeepEqual(copy.equipment,sim.equipment);
 assert(plan.checks.some(c=>c.rule==='TURN_TRAP_AND_FILLED_DIAMETER'&&c.status==='NOT_EVALUATED'));
});
test('maintenance scenarios affect evidenced microstop targets only and distinguish hybrid evidence',()=>{
 const sim=fixture();sim.equipment[0].noiseProfile.reliability={mtbfMinutes:8,mttrMinutes:2};sim.results={summary:{},equipmentMetrics:{[sim.equipment[0].id]:{failureSeconds:45,availabilityPercent:80}},durationSeconds:60};
 const p=planScenarios(sim).projects.find(p=>p.tier==='MEDIUM');assert(p.canApply);assert.equal(p.basis,'HYBRID');assert.equal(new Set(p.changes.map(c=>c.equipmentId)).size,1);
 const copy=applyScenarioChanges(sim,p.changes);assert.equal(copy.equipment[0].noiseProfile.reliability.mtbfMinutes,9.6);assert.equal(copy.equipment[0].noiseProfile.reliability.mttrMinutes,1.7);assert.equal(sim.equipment[0].noiseProfile.reliability.mtbfMinutes,8);
 sim.equipment[0].noiseProfile.reliability.mttrMinutes=20;assert(!planScenarios(sim).candidates.some(p=>p.kind==='RELIABILITY'&&p.equipmentId===sim.equipment[0].id));
});
test('unsafe, stale and unrelated mutations cannot become scenario buttons',()=>{
 const sim=fixture(),p=planScenarios(sim).projects.find(p=>p.canApply),change=p.changes[0];
 for(const replacement of [{path:'__proto__.polluted'},{equipmentId:'other'},{after:-10},{after:Infinity},{before:123456}])assert.throws(()=>applyScenarioChanges(sim,[{...change,...replacement}]));
 const signature=scenarioSignature(sim);sim.dynamicConfig.seed++;assert.notEqual(scenarioSignature(sim),signature);
});
test('high CAPEX recovery uses recalculated geometry rather than a fixed length multiplier',()=>{
 const sim=fixture(),e=sim.equipment[1];e.processData.geometry.lactMm=1000;e.processData.geometry.lpPrimeMm=200;e.processData.accumulation.backupSensorPositionMm=100;
 const plan=planScenarios(sim),p=plan.candidates.find(p=>p.kind==='BUFFER_RECOVERY'&&p.equipmentId===e.id);assert(p);assert(p.canApply,p.disabledReason);
 const copy=applyScenarioChanges(sim,p.changes),after=scenarioAudit(copy).find(a=>a.equipmentId===e.id).engineering;
 assert(after.calculated.recoveryLengthMm>0);assert(after.input.backupSensorPositionMm>=after.calculated.recommendedBackupSensorPositionMm);assert.equal(sim.equipment[1].processData.geometry.lactMm,1000);
});
