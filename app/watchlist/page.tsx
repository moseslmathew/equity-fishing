import {headers} from "next/headers";
import {sessionValid} from "../../lib/access";
import Login from "../login";
import Watchlist from "./watchlist";

export const dynamic="force-dynamic";
export const metadata={title:"Watchlist | Smallcap Observatory"};

export default async function WatchlistPage(){
  if(!await sessionValid(await headers())) return <Login/>;
  return <Watchlist/>;
}
