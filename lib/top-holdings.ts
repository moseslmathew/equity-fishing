import type {Fund} from "./portfolio";
import type {FullComparison} from "./full-portfolio";
export const holdingLimit=15;
export function companyKey(name:string){
  const aliases:Record<string,string>={MCX:"Multi Commodity Exchange of India",BHEL:"Bharat Heavy Electricals"};
  return (aliases[name]??name).toLowerCase().replace(/\((?:formerly|previously)[^)]*\)/g,"").replace(/\b(limited|ltd)\b/g,"").replace(/[^a-z0-9]/g,"");
}
// Enrich only from the same dated complete equity disclosure. Never carry ranks
// across months or claim an incomplete set of weights is a complete ranking.
export function withTopHoldings(fund:Fund,comparison?:FullComparison):Fund {
  if(fund.holdings.length>=holdingLimit||!comparison||comparison.fundId!==fund.id||comparison.currentDate!==fund.portfolioDate)return fund;
  const current=comparison.rows.filter(row=>row.currentQuantity>0);
  if(current.length<holdingLimit||current.some(row=>row.weight===null))return fund;
  const ranked=current.slice().sort((a,b)=>b.weight!-a.weight!).slice(0,holdingLimit);
  // Retain saved corroborated figures; refuse conflicting full-portfolio data.
  if(fund.holdings.some(old=>!ranked.slice(0,fund.holdings.length).some(row=>companyKey(row.name)===companyKey(old.name)&&row.weight===old.weight)))return fund;
  return {...fund,holdings:ranked.map(row=>{
    const old=fund.holdings.find(item=>companyKey(item.name)===companyKey(row.name));
    return old??{key:row.key,name:row.name.replace(/\*+$/g,""),weight:row.weight!};
  }),holdingsEvidence:{basis:"saved_full_portfolio",checkedAt:comparison.checkedAt,sources:comparison.sources},notes:[...fund.notes,"The top 15 are ranked from the saved full equity disclosure for this same date. Existing top-five figures were retained; additional positions carry the full-portfolio source coverage shown below, not an independent verification of every allocation."]};
}
