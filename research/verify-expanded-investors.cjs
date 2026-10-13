const assert=require('node:assert/strict');
const {investorHoldingView,sortInvestorHoldings}=require('../lib/ace-investor-view.ts');
const files=[['mukul','mukul-agrawal'],['malabar','malabar-investments'],['nalanda','nalanda-capital'],['abakkus','abakkus'],['goel','anil-kumar-goel'],['dolly','dolly-khanna'],['porinju','porinju-veliyath'],['dhawan','ashish-dhawan'],['nemish','nemish-shah'],['pabrai','mohnish-pabrai']];
let count=0;
for(const [id,file] of files){
 const p=require('../data/'+file+'.json');
 assert(p.holdings.length>0);assert(p.coverageNote,'Coverage limits required');
 const names=new Set();
 for(const h of p.holdings){
  assert(!names.has(h.name),'Duplicate company '+h.name);names.add(h.name);
  assert(h.date<='2026-10-11' && /^\d{4}-\d{2}(-\d{2})?$/.test(h.date));
  assert(h.note && h.basis && h.holder);
  assert(['primary','providers','review'].includes(h.status),'Known evidence status: '+h.name);
  if(h.parts?.length && h.status!=='review'){assert.equal(Math.round(h.parts.reduce((t,p)=>t+p.stake,0)*100)/100,h.stake,'Holder parts: '+h.name);}
  assert(h.evidence?.length>=2,'Two observations required: '+h.name);
  const domains=new Set(h.evidence.map(e=>{assert(e.observation && p.sources[e.source],h.name);return new URL(p.sources[e.source].url).hostname.replace(/^www\./,'');}));
  assert(domains.size>=2,'Independent domains: '+h.name);
  if(h.status==='review')assert.equal(h.stake,null,'Withhold unresolved stake');
  else assert(typeof h.stake==='number' && h.stake>0 && h.stake<=100,h.name);
  const v=investorHoldingView(h,'all',id,file);
  assert.equal(v.stake,h.stake,'Displayed stake must match reconciled source: '+h.name);
  assert.equal(v.shares,h.status==='review'?null:h.shares,'Displayed shares must match: '+h.name);
  assert(v.holderLabel && !v.holderLabel.includes('Kedia'),h.name);
  count++;
 }
 for(const direction of ['asc','desc']){
  const rows=sortInvestorHoldings(p.holdings,'stake',direction);let pending=false;let prev=direction==='asc'?-Infinity:Infinity;
  for(const h of rows){if(h.stake===null){pending=true;continue;}assert(!pending);assert(direction==='asc'?h.stake>=prev:h.stake<=prev);prev=h.stake;}
 }
 console.log(file+': '+p.holdings.length+' dated records checked');
}
console.log(count+' new records: evidence links, source domains, dates, displayed ownership and sorting validated.');

const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
const originals=[['malabar-investments','malabar-original-evidence'],['nalanda-capital','nalanda-original-evidence'],['abakkus','abakkus-primary-evidence']];
for(const [file,auditFile] of originals){
 const p=require('../data/'+file+'.json');const a=require('./'+auditFile+'.json');const rows=Array.isArray(a)?a:a.records;
 for(const h of p.holdings.filter(h=>h.status==='primary')){
  const targets=h.parts??[{name:h.holder,shares:h.shares,stake:h.stake}];
  for(const t of targets){const r=rows.find(r=>norm(r.company)===norm(h.name)&&norm(r.holder)===norm(t.name)&&r.date===h.date);assert(r,'Original exact holder/date: '+h.name);assert.equal(r.stake,t.stake);assert.equal(r.shares,t.shares);assert(/^[a-f0-9]{64}$/.test(r.sha256));}
 }
}
console.log('Original-filing badges matched to exact dated legal-holder facts and retained content hashes.');

const fs=require('node:fs');const ideas=require('../data/investor-philosophies.json');
for(const [id] of files){const idea=ideas[id];assert(idea?.bio && idea.detail && idea.person && idea.portraitLabel);assert(idea.sources.length);assert(fs.existsSync('public'+idea.portrait),id+' portrait missing');}
const latestEvidence=require('./finology-primary-evidence.json');
for(const file of ['dolly-khanna','mohnish-pabrai']){for(const h of require('../data/'+file+'.json').holdings.filter(h=>h.status==='primary')){const e=latestEvidence.find(e=>e.company===h.name&&e.date===h.date);assert(e,h.name+' original evidence');assert.equal(e.stake,h.stake);assert.equal(e.shares,h.shares);assert(/^[a-f0-9]{64}$/.test(e.sha256));}}
assert.equal(ideas.dolly.portraitLabel,'Rajiv Khanna');
console.log('New portraits, profile attribution and original-filing facts validated.');
