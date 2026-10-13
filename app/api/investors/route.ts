import {readerAllowed,writerAllowed,deny} from "../../../lib/access";
import {validateInvestorPortfolio} from "../../../lib/database-validation";
import {readInvestorCards,readInvestorPortfolio,saveInvestorPortfolio} from "../../../lib/database-store";
export const dynamic="force-dynamic";
export async function GET(request:Request){
 if(!await readerAllowed(request.headers))return deny();
 try{const id=new URL(request.url).searchParams.get("id");const value=id?await readInvestorPortfolio(id):await readInvestorCards();if(!value)return Response.json({error:"Investor not found."},{status:404});return Response.json(value,{headers:{"Cache-Control":"private, no-store"}});}catch{return Response.json({error:"Investor data is temporarily unavailable. Please retry."},{status:503});}
}
export async function POST(request:Request){
 if(!await writerAllowed(request.headers))return deny();
 if(!request.headers.get("content-type")?.includes("application/json"))return Response.json({error:"Expected JSON."},{status:415});
 try{const raw=await request.text();if(raw.length>500000)return Response.json({error:"Snapshot too large."},{status:413});const input=JSON.parse(raw);if(typeof input.id!=="string"||!/^[-a-z]+$/.test(input.id))throw new Error("Invalid investor.");validateInvestorPortfolio(input.portfolio);const existing=await readInvestorPortfolio(input.id);if(!existing)return Response.json({error:"Unknown investor."},{status:404});if(input.portfolio.checkedOn<existing.checkedOn)return Response.json({error:"An older snapshot cannot replace current data."},{status:409});await saveInvestorPortfolio(input.id,input.portfolio);return Response.json({ok:true,id:input.id},{headers:{"Cache-Control":"no-store"}});}catch(e){return Response.json({error:e instanceof Error?e.message:"Update failed."},{status:400});}
}
