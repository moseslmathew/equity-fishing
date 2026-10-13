import {companyKey} from "./top-holdings";
import {investorHoldingView,type InvestorPortfolio} from "./ace-investor-view";
export type CombinedInvestorInput={id:string;name:string;portfolio:InvestorPortfolio};
export function aceCombinedAnalysis(input:CombinedInvestorInput[]){
 const companies=new Map<string,{key:string;name:string;owners:ReturnType<typeof owner>[]}>();
 function owner(profile:CombinedInvestorInput,h:InvestorPortfolio["holdings"][number]){const v=investorHoldingView(h,"all",profile.id,profile.name);return {investorId:profile.id,investorName:profile.name,holder:v.holderLabel,stake:v.stake,shares:v.shares,date:h.date,checkedOn:profile.portfolio.checkedOn,status:h.status??"review",note:h.note,basis:h.basis,sources:h.sources.map(id=>({...profile.portfolio.sources[id],observation:h.evidence?.find(e=>e.source===id)?.observation??null})).filter(s=>s.url)};}
 for(const profile of input){
  // One profile contributes at most once to a company; never sum legal owners or dates across profiles.
  const latest=new Map<string,InvestorPortfolio["holdings"][number]>();
  for(const h of profile.portfolio.holdings){const key=companyKey(h.name),old=latest.get(key);if(!old||h.date>old.date)latest.set(key,h);}
  for(const [key,h] of latest){const group=companies.get(key)??{key,name:h.name,owners:[]};group.owners.push(owner(profile,h));companies.set(key,group);}
 }
 const rows=[...companies.values()].map(c=>{const confirmed=c.owners.filter(o=>o.stake!==null&&o.stake>0&&o.status!=="review"),review=c.owners.filter(o=>o.stake===null||o.status==="review"),dates=[...new Set(c.owners.map(o=>o.date))].sort();return {...c,owners:c.owners.sort((a,b)=>(b.stake??-1)-(a.stake??-1)||a.investorName.localeCompare(b.investorName)),investorCount:confirmed.length,reviewCount:review.length,highestStake:confirmed.length?Math.max(...confirmed.map(o=>o.stake!)):null,latestDate:dates.at(-1)!,mixedDates:dates.length>1};}).sort((a,b)=>b.investorCount-a.investorCount||a.name.localeCompare(b.name));
 return {investorCount:input.length,recordCount:input.reduce((n,p)=>n+p.portfolio.holdings.length,0),companyCount:rows.length,sharedCount:rows.filter(r=>r.investorCount>=2).length,reviewCount:rows.filter(r=>r.reviewCount>0).length,checkedOn:[...new Set(input.map(p=>p.portfolio.checkedOn))].sort(),investors:input.map(p=>({id:p.id,name:p.name})),companies:rows};
}
export type AceCombinedResult=ReturnType<typeof aceCombinedAnalysis>;
