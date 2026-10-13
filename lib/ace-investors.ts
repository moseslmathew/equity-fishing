export type HoldingPart={name:string;type:string;stake:number;shares:number;date:string;source:string};
export type Holding={name:string;stake:number|null;shares:number|null;holder:string;date:string;basis:string;note:string;sources:string[];status:"primary"|"providers"|"review";parts:HoldingPart[];evidence:{source:string;observation:string}[]};
export type Portfolio={checkedOn:string;sources:Record<string,{name:string;url:string}>;holdings:Holding[]};
export function holdingView(h:Holding,filter:string,investor:string){
 const parts=investor==="kedia"&&filter!=="all"?h.parts.filter(p=>p.type===filter):h.parts.filter(p=>investor==="kedia"||p.type==="direct");
 const stake=h.status==="review"?null:Math.round(parts.reduce((sum,p)=>sum+p.stake,0)*100)/100;
 const shares=h.status==="review"?null:parts.reduce((sum,p)=>sum+p.shares,0);
 return {stake,shares,holder:parts.map(p=>p.name).join(" + "),label:parts.length>1?"combined company stake":parts[0]?.type==="entity"?"entity’s company stake":"personal company stake"};
}
