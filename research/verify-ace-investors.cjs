const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpile(fs.readFileSync(f,'utf8'),{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}),f);
const {holdingView}=require('../lib/ace-investors.ts');
const k=require('../data/ace-investors.json'),a=require('../data/ashish-kacholia.json'),audit=require('./ace-primary-evidence.json');
const key=s=>s.toLowerCase().replace(/limited|ltd/g,'').replace(/[^a-z0-9]/g,'');
for(const [investor,p] of [['kedia',k],['kacholia',a]]){
 assert.equal(new Set(p.holdings.map(h=>key(h.name))).size,p.holdings.length);
 for(const h of p.holdings){
  assert.ok(h.date<=p.checkedOn);assert.ok(h.evidence.length>=2);
  for(const e of h.evidence)assert.ok(p.sources[e.source]?.url.startsWith('https://'));
  assert.ok(new Set(h.evidence.map(e=>new URL(p.sources[e.source].url).hostname)).size>=2);
  assert.equal(holdingView(h,'all',investor).stake,h.stake);assert.equal(holdingView(h,'all',investor).shares,h.shares);
  if(h.status==='review'){assert.equal(h.stake,null);assert.equal(h.shares,null);}
  if(h.status==='primary'){
   const original=audit.records.find(r=>key(r.company)===key(h.name));assert.ok(original,'issuer match '+h.name);
   for(const part of h.parts){
    const row=original.holdings.find(r=>key(r.holder)===key(part.name));assert.ok(row,'holder match '+h.name);
    assert.equal(part.date,row.date[0]);assert.equal(part.shares,Number(row.shares));assert.equal(part.stake,Math.round(Number(row.stake)*10000)/100);
   }
  }
 }
}
const find=(p,name)=>p.holdings.find(h=>h.name.startsWith(name));
assert.deepEqual(['all','direct','entity'].map(f=>holdingView(find(k,'Atul'),f,'kedia').stake),[20.91,18.2,2.71]);
assert.deepEqual(['all','direct','entity'].map(f=>holdingView(find(k,'Global'),f,'kedia').shares),[679218,419436,259782]);
assert.equal(holdingView(find(a,'Beta'),'all','kacholia').stake,4.91);
assert.equal(holdingView(find(a,'Shaily'),'all','kacholia').stake,3.22);
assert.equal(holdingView(find(a,'TechEra'),'all','kacholia').stake,3.57);
assert.equal(find(a,'V-Marc').shares,3966000);assert.equal(find(a,'V-Marc').date,'2026-07-08');
assert.equal(find(a,'Knowledge').stake,2.36);assert.equal(find(a,'Z-Tech').stake,3.31);
assert.equal(find(k,'Elecon').date,'2026-09-30');assert.equal(find(k,'Everest').status,'review');
console.log('Ace-investor verification passed: exact issuer/holder/date/quantity matching, independent domains, personal vs entity filters, corporate-action quantities and unresolved withholding.');
