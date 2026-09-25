function getScenarioSourceSignature_(request,user) {
  var record=getCase_(request.caseId,user);
  if(Number(request.expectedRevision)!==Number(record.revision))throw createSimulatorError_('CASE_CONFLICT','The case changed. Review the latest version before creating a scenario.');
  var source=record.simulations.find(function(s){return s.id===request.simulationId;});
  if(!source)throw createSimulatorError_('SIMULATION_NOT_FOUND','The source simulation no longer exists.');
  return {revision:record.revision,simulationId:source.id,signature:STScenarioEngine_.signature(source)};
}

function createScenario_(request,user) {
  return withCaseWriteLock_(function() {
    var owned=getOwnedCaseFile_(request.caseId,user),record=ensureCaseSimulations_(owned.caseData);
    if(Number(request.expectedRevision)!==Number(record.revision))throw createSimulatorError_('CASE_CONFLICT','The case changed. Review the latest version before creating a scenario.');
    var source=record.simulations.find(function(s){return s.id===request.simulationId;});
    if(!source)throw createSimulatorError_('SIMULATION_NOT_FOUND','The source simulation no longer exists.');
    if(request.sourceSignature!==STScenarioEngine_.signature(source))throw createSimulatorError_('SCENARIO_STALE','The simulation inputs changed. Request a new proposal.');
    var proposal=normalizeScenarioProposal_(request.proposal,source),copy;
    try{copy=STScenarioEngine_.apply(source,proposal.changes);}catch(error){throw createSimulatorError_('INVALID_SCENARIO','The proposed inputs did not pass the physical model checks.',[String(error.message)]);}
    copy.id=generateSimulationId_(record.simulations.length)+'-'+Utilities.getUuid().slice(0,8);
    copy.name=proposal.title.slice(0,120);copy.clonedFromSimulationId=source.id;copy.results=null;
    copy.createdAt=new Date().toISOString();copy.updatedAt=copy.createdAt;
    copy.scenario={kind:proposal.kind,title:proposal.title,capex:proposal.tier,evidenceBasis:proposal.basis,sourceSimulationId:source.id,sourceSimulationName:source.name,sourceSignature:request.sourceSignature,changes:proposal.changes,evidence:proposal.evidence,origin:request.origin==='GEMINI'?'GEMINI':'LOCAL',validation:'INPUTS_VALIDATED_NOT_SIMULATED',createdAt:copy.createdAt};
    record.simulations.push(copy);record.revision++;record.updatedAt=copy.createdAt;
    owned.file.setContent(JSON.stringify(record,null,2));return {case:record,simulationId:copy.id};
  });
}
function normalizeScenarioProposal_(proposal,source) {
  if(!proposal||!['ZERO','MEDIUM','HIGH'].includes(proposal.tier)||!['STATIC','DYNAMIC','HYBRID'].includes(proposal.basis)||!Array.isArray(proposal.changes))throw createSimulatorError_('INVALID_SCENARIO','The scenario format is invalid.');
  if(proposal.basis!=='STATIC'&&!source.results?.summary)throw createSimulatorError_('INVALID_SCENARIO','Dynamic evidence requires a completed simulation.');
  var title=typeof proposal.title==='string'?proposal.title.trim().slice(0,120):'';
  if(!title)throw createSimulatorError_('INVALID_SCENARIO','A scenario title is required.');
  // Field allowlist, value bounds, expected before values, topology and audits are shared with the browser.
  try{STScenarioEngine_.apply(source,proposal.changes);}catch(error){throw createSimulatorError_('INVALID_SCENARIO','The scenario contains an invalid or stale change.',[String(error.message)]);}
  var changes=proposal.changes.map(function(c){return {equipmentId:c.equipmentId,path:c.path,before:c.before,after:c.after,unit:STScenarioEngine_.fields[c.path][2]};});
  if(proposal.tier==='ZERO'&&changes.some(function(c){return /geometry|reliability/.test(c.path);}))throw createSimulatorError_('INVALID_SCENARIO','Geometry and maintenance changes cannot be labeled zero CAPEX.');
  var evidence={};
  if(proposal.evidence&&typeof proposal.evidence==='object'&&!Array.isArray(proposal.evidence))Object.keys(proposal.evidence).slice(0,12).forEach(function(key){
    if(!/^[a-zA-Z][a-zA-Z0-9]{0,60}$/.test(key)||['constructor','prototype'].includes(key))return;
    var value=proposal.evidence[key];if(typeof value==='number'&&isFinite(value)||value===null)evidence[key]=value;else if(typeof value==='string')evidence[key]=value.slice(0,600);
  });
  return {title:title,kind:typeof proposal.kind==='string'?proposal.kind.slice(0,60):'CUSTOM',tier:proposal.tier,basis:proposal.basis,changes:changes,evidence:evidence};
}
