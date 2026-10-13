import seed from "../data/ace-investor-research.json";
import {aceCombinedAnalysis,type CombinedInvestorInput,type AceCombinedResult} from "./ace-combined-analysis";
import {companyKey} from "./top-holdings";
export async function acePortfolioFingerprint(combined:AceCombinedResult){
 const evidence=combined.companies.map(c=>({key:c.key,owners:c.owners.map(o=>({...o,sources:[...o.sources].sort((a,b)=>a.url.localeCompare(b.url))})).sort((a,b)=>a.investorId.localeCompare(b.investorId))})).sort((a,b)=>a.key.localeCompare(b.key));
 const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(JSON.stringify(evidence)));return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
}
export async function enrichAceResearch(report:typeof seed,input:CombinedInvestorInput[]){
 const combined=aceCombinedAnalysis(input),fingerprint=await acePortfolioFingerprint(combined);
 return {...report,portfolioChanged:fingerprint!==report.portfolioFingerprint,coverage:{investors:combined.investorCount,records:combined.recordCount,companies:combined.companyCount,shared:combined.sharedCount,review:combined.reviewCount},stocks:report.stocks.map(stock=>({...stock,ownership:combined.companies.find(c=>c.key===companyKey(stock.name))??null}))};
}
export type AceResearchReport=Awaited<ReturnType<typeof enrichAceResearch>>;
