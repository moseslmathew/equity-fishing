const assert=require('node:assert/strict'),fs=require('node:fs');
const runtime=require('./database-test-runtime.cjs').setup({get:async()=>null,list:async()=>({objects:[],truncated:false})});
(async()=>{
 const seed=require('../data/ace-investor-research.json'),registry=require('../lib/investor-registry.ts').investorProfiles,{enrichAceResearch}=require('../lib/ace-research.ts');
 assert.equal(seed.scope,'ace-investors');assert.equal(seed.stocks.length,10);assert.equal(new Set(seed.stocks.map(s=>s.symbol)).size,10);
 for(const s of seed.stocks){assert(new Set(s.sources.map(x=>new URL(x.url).hostname)).size>=2);assert(s.sections.length>=3);assert(s.quality);for(const p of s.sections)for(const i of p.refs)assert(s.sources[i]);for(const x of s.sources){assert.equal(new URL(x.url).protocol,'https:');assert(x.checkedOn<=seed.asOf);}}
 const enriched=await enrichAceResearch(seed,registry);assert.equal(enriched.portfolioChanged,false);assert.equal(enriched.coverage.companies,255);assert(enriched.stocks.every(s=>s.ownership?.investorCount>=1));
 const changed=structuredClone(registry);changed[0].portfolio.holdings[0].note+=' Changed evidence';assert.equal((await enrichAceResearch(seed,changed)).portfolioChanged,true);
 const db=require('../lib/database-store.ts'),route=require('../app/api/investors/research/route.ts');
 assert.equal((await route.GET(new Request('https://test/api/investors/research'))).status,401);
 const request=new Request('https://test/api/investors/research',{headers:{'x-fund-update-key':'test-updater-secret'}});const res=await route.GET(request);assert.equal(res.status,200);const body=await res.json();assert.equal(body.portfolioChanged,false);assert.equal(body.stocks.length,10);
 assert(!(await db.readResearchSnapshot()).id.startsWith('ace-'));assert.equal((await route.GET(request)).status,200);assert.equal(runtime.sqlite.prepare("SELECT count(*) n FROM research_reports WHERE id LIKE 'ace-%'").get().n,1);
 // Newer scoped research must not displace the mutual-fund report.
 runtime.sqlite.prepare('UPDATE research_reports SET checked_at=? WHERE id LIKE ?').run('2099-01-01T00:00:00Z','ace-%');assert(!(await db.readResearchSnapshot()).id.startsWith('ace-'));
 const ui=fs.readFileSync('app/ace-investors.tsx','utf8');assert(ui.includes('<AceInvestorResearch/>'));
 console.log('Ace research passed: ten matched cases, dated multi-source evidence, change detection, authenticated D1 persistence, idempotency and mutual-fund report isolation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
