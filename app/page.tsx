import Dashboard from "./dashboard";
import Login from "./login";
import {headers} from "next/headers";
import {sessionValid} from "../lib/access";
export const dynamic="force-dynamic";
export default async function Home() { return await sessionValid(await headers()) ? <Dashboard /> : <Login />; }
