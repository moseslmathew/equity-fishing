import type {InvestorPortfolio} from "./ace-investor-view";
export function validateInvestorPortfolio(value:unknown):asserts value is InvestorPortfolio{
 const p=value as InvestorPortfolio;
 if(!p||!/^\d{4}-\d{2}-\d{2}$/.test(p.checkedOn)||!Number.isFinite(Date.parse(p.checkedOn))||(p.coverageNote!==undefined&&typeof p.coverageNote!=="string")||!p.sources||!Array.isArray(p.holdings)||p.holdings.length>500)throw new Error("Invalid investor snapshot.");
 const seen=new Set<string>();
 for(const h of p.holdings){
  if(!h.name||seen.has(h.name)||!h.holder||!/^\d{4}-\d{2}(-\d{2})?$/.test(h.date)||h.date.slice(0,7)>p.checkedOn.slice(0,7)||!h.basis||!h.note||!['primary','providers','review'].includes(h.status??'')||!Array.isArray(h.sources)||h.sources.length<2)throw new Error("Invalid investor holding or disclosure date.");
  if(h.stake!==null&&(!Number.isFinite(h.stake)||h.stake<=0||h.stake>100)||h.shares!==null&&(!Number.isSafeInteger(h.shares)||h.shares<0)||h.status==='review'&&h.stake!==null)throw new Error("Unresolved percentages must remain withheld.");
  const domains=new Set<string>();for(const id of h.sources){const source=p.sources[id];if(!source?.name||new URL(source.url).protocol!=="https:")throw new Error("Invalid source.");domains.add(new URL(source.url).hostname);}if(domains.size<2)throw new Error("Use multiple source domains.");
  if(h.evidence?.some(e=>!p.sources[e.source]||!e.observation))throw new Error("Invalid evidence reference.");
  if(h.parts?.length&&h.stake!==null&&Math.abs(h.parts.filter(x=>h.holder!=="direct"||x.type==="direct").reduce((n,x)=>n+x.stake,0)-h.stake)>.011)throw new Error("Legal-holder split does not match ownership.");seen.add(h.name);
 }
}
// Preserve the saved report contract, including nested evidence, before accepting updater data.
export function validateReportShape(value:unknown,template:unknown,path="report"){
 if(template===null){if(value!==null&&typeof value!=="string"&&typeof value!=="number")throw new Error("Invalid "+path);return;}
 if(Array.isArray(template)){if(!Array.isArray(value))throw new Error("Invalid "+path);if(template.length)for(const item of value)validateReportShape(item,template[0],path+"[]");return;}
 if(typeof template==="object"){if(!value||typeof value!=="object"||Array.isArray(value))throw new Error("Invalid "+path);for(const [key,item] of Object.entries(template))validateReportShape((value as Record<string,unknown>)[key],item,path+"."+key);return;}
 if(path.endsWith(".url")&&(typeof value!=="string"||new URL(value).protocol!=="https:"))throw new Error("Invalid source URL");
 if(typeof value!==typeof template||typeof value==="number"&&!Number.isFinite(value))throw new Error("Invalid "+path);
}
