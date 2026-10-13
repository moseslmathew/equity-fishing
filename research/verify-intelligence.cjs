const assert=require('node:assert/strict');
const runtime=require('./database-test-runtime.cjs').setup({get:async()=>null,list:async()=>({objects:[],truncated:false})});
for(const path of ['../data/agent-research.json','../data/ace-investor-research.json']){
 const report=require(path);
 for(const section of ['takeaways','cases','perspectives'])for(const block of report.intelligence[section])for(const ref of block.refs)assert(report.marketSources[ref]?.url.startsWith('https://'),`${path} ${block.title}: invalid source`);
 for(const stock of report.stocks){assert(stock.sections.every(p=>p.refs.length>0),stock.symbol+': uncited paragraph');for(const p of stock.sections)for(const ref of p.refs)assert(stock.sources[ref]);}
 assert.equal(report.stocks.length,10);assert.equal(report.intelligence.scenarios.length,3);
 assert(!JSON.stringify(report).includes('if the parent'));assert.equal(report.modelName,'Exact runtime model unavailable');
}
(async()=>{
 const store=require('../lib/database-store.ts'),seed=require('../data/agent-research.json');await store.ensureDatabase();
 // Simulate the already-migrated production database containing the previous edition.
 runtime.sqlite.prepare('DELETE FROM research_reports WHERE id=?').run(seed.id);
 const old={...seed,id:'research-previous-edition',checkedAt:'2026-10-11T00:00:00Z'};
 runtime.sqlite.prepare('INSERT INTO research_reports(id,checked_at,model,fingerprint,payload) VALUES (?,?,?,?,?)').run(old.id,old.checkedAt,old.modelName,old.portfolioFingerprint,JSON.stringify(old));
 assert.equal((await store.readResearchSnapshot()).id,seed.id);await store.readResearchSnapshot();
 assert.equal(runtime.sqlite.prepare('SELECT count(*) n FROM research_reports WHERE id=?').get(seed.id).n,1);
 assert.equal(runtime.sqlite.prepare('SELECT count(*) n FROM research_reports WHERE id=?').get(old.id).n,1);
 const newer={...seed,id:'research-later-edition',checkedAt:'2099-01-01T00:00:00Z'};
 await store.saveResearchSnapshot(newer);assert.equal((await store.readResearchSnapshot()).id,newer.id);
 console.log('Strategic reports passed: citation integrity, twenty company cases, migration of existing reports, idempotency and preservation of later research.');
})().catch(e=>{console.error(e);process.exitCode=1;});
