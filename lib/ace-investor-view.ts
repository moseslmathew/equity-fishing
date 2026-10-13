export type InvestorHolding={name:string;stake:number|null;shares:number|null;holder:string;date:string;basis:string;note:string;sources:string[];parts?:{name:string;type:string;stake:number;shares:number|null}[];status?:string;evidence?:{source:string;observation:string}[]};
export type InvestorPortfolio={checkedOn:string;coverageNote?:string;sources:Record<string,{name:string;url:string}>;holdings:InvestorHolding[]};
export type InvestorSort="name"|"stake";
export type SortDirection="asc"|"desc";

// Display the selected legal holder's stake, including for combined records.
export function investorHoldingView(h:InvestorHolding,holder:string,investorId:string,investorName:string){
 const parts=h.parts??(h.holder==="both"&&investorId==="kedia"?
  h.name.startsWith("Atul Auto")?[{name:"Vijay Kedia",type:"direct",stake:18.20,shares:5050505},{name:"Kedia Securities Private Limited",type:"entity",stake:2.71,shares:751512}]:
  h.name.startsWith("Global Vectra")?[{name:"Vijay Kedia",type:"direct",stake:3.00,shares:419436},{name:"Kedia Securities Private Limited",type:"entity",stake:1.86,shares:259782}]:[]:
  [{name:h.holder==="direct"?investorName:investorId==="kedia"?"Kedia Securities Private Limited":h.holder,type:h.holder,stake:h.stake??0,shares:h.shares??0}]);
 const selected=parts.filter(p=>investorId==="kacholia"?p.type==="direct":holder==="all"||p.type===holder);
 const unresolved=h.stake===null||h.status==="review";
 return {...h,stake:unresolved?null:Math.round(selected.reduce((total,p)=>total+p.stake,0)*100)/100,shares:unresolved||h.shares===null||selected.some(p=>p.shares===null)?null:selected.reduce((total,p)=>total+(p.shares??0),0),holderLabel:selected.map(p=>p.name).join(" + "),combined:selected.length>1};
}
export function sortInvestorHoldings<T extends {name:string;stake:number|null}>(holdings:T[],field:InvestorSort,direction:SortDirection):T[]{
 const sign=direction==="asc"?1:-1;
 return [...holdings].sort((a,b)=>{
  if(field==="stake"){
   // Unconfirmed percentages remain last in both directions.
   if(a.stake===null&&b.stake!==null)return 1;
   if(b.stake===null&&a.stake!==null)return -1;
   const difference=(a.stake??0)-(b.stake??0);if(difference)return difference*sign;
  }
  return a.name.localeCompare(b.name,"en",{sensitivity:"base"})*(field==="name"?sign:1);
 });
}
