import seed from "../data/foreign-investors.json";
import {database,documentStatement,ensureDatabase} from "./database-store";
import {validateForeignResearch,type ForeignResearch} from "./foreign-investors";
export async function readForeignResearch(id="blackstone"){
 if(id!=="blackstone")return null;
 const value=validateForeignResearch(seed as ForeignResearch);
 await ensureDatabase();
 let row=await database().prepare("SELECT payload,checked_at FROM app_documents WHERE key=?").bind("foreign-investor:"+id).first<{payload:string;checked_at:string}>();
 if(!row||new Date(row.checked_at)<new Date(value.checkedAt)){
  await database().batch([documentStatement(database(),"foreign-investor:"+id,value,value.checkedAt)]);
  row=await database().prepare("SELECT payload,checked_at FROM app_documents WHERE key=?").bind("foreign-investor:"+id).first<{payload:string;checked_at:string}>();
 }
 if(!row)throw new Error("Foreign investor research is unavailable.");
 return validateForeignResearch(JSON.parse(row.payload) as ForeignResearch);
}
