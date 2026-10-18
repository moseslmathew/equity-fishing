import {headers} from "next/headers";
import {sessionValid} from "../../lib/access";
import {readForeignResearch} from "../../lib/foreign-investor-store";
import Login from "../login";
import ForeignInvestors from "../foreign-investors";
export const dynamic="force-dynamic";
export default async function ForeignInvestorsPage(){
 if(!await sessionValid(await headers()))return <Login/>;
 const data=await readForeignResearch();
 if(!data)throw new Error("Research unavailable.");
 return <ForeignInvestors data={data}/>;
}
