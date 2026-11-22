"use client";
import {useEffect,useState} from "react";
import {Bookmark,Plus,RefreshCw,Search,X} from "lucide-react";
import directory from "../../data/nse-equity-securities.json";
import type {NseSnapshot} from "../../lib/nse-mcp";
import WorkspaceHeader from "../workspace-header";
import "./watchlist.css";

const companies=new Map(directory.securities.map(([symbol,name])=>[symbol,name]));
const storageKey="observatory.watchlist.v1";
const rupees=new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"});
function readSymbols():string[]{
  const saved:unknown=JSON.parse(localStorage.getItem(storageKey)??"[]");
  return Array.isArray(saved)?[...new Set(saved.filter((s):s is string=>typeof s==="string"&&companies.has(s)))]:[];
}

function StockRow({symbol,revision,remove}:{symbol:string;revision:number;remove:()=>void}){
  const [quote,setQuote]=useState<NseSnapshot|null>(null);
  const [status,setStatus]=useState("Loading…");
  useEffect(()=>{
    const controller=new AbortController();
    async function refresh(){
      setStatus("Updating…");
      try{
        const response=await fetch("/api/nse?symbol="+encodeURIComponent(symbol),{signal:controller.signal,cache:"no-store"});
        if(!response.ok) throw Error();
        const snapshot:NseSnapshot=await response.json();
        if(snapshot.symbol!==symbol) throw Error();
        setQuote(snapshot);setStatus("");
      }catch{if(!controller.signal.aborted)setStatus("Quote unavailable");}
    }
    void refresh();
    return ()=>controller.abort();
  },[symbol,revision]);
  const live=quote?.live?.price!=null?quote.live:null;
  const price=live?.price??quote?.eod?.close;
  const change=live?.changePercent;
  const volume=live?live.volume:quote?.eod?.volume;
  const asOf=live?.asOfIso?new Date(live.asOfIso).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})+" IST":live?.asOf??quote?.eod?.date;
  return <tr><th scope="row"><a href={"/companies/"+encodeURIComponent(symbol)}>{companies.get(symbol)}</a><small>{symbol}</small></th>
    <td>{price==null?"—":rupees.format(price)}</td><td className={change==null?"":change>0?"wl-up":change<0?"wl-down":""}>{change==null?"—":(change>0?"+":"")+change.toFixed(2)+"%"}</td>
    <td>{volume==null?"—":volume.toLocaleString("en-IN")}</td><td>{asOf??"—"}<small>{status||(live?"Last trade":price!=null?"Closing price":"Quote unavailable")}</small></td>
    <td><button className="wl-remove" aria-label={"Remove "+symbol} title="Remove stock" onClick={remove}><X size={16}/></button></td></tr>;
}

export default function Watchlist(){
  const [symbols,setSymbols]=useState<string[]>([]);
  const [query,setQuery]=useState("");
  const [revision,setRevision]=useState(0);
  const [error,setError]=useState("");
  useEffect(()=>{
    function sync(){try{setSymbols(readSymbols());}catch{setError("Your saved list could not be read.");}}
    sync();
    const changed=(event:StorageEvent)=>{if(event.key===storageKey||event.key===null)sync();};
    window.addEventListener("storage",changed);
    return ()=>window.removeEventListener("storage",changed);
  },[]);
  function update(symbol:string,add:boolean){
    try{
      const current=readSymbols();
      const next=add?[...new Set([...current,symbol])]:current.filter(item=>item!==symbol);
      localStorage.setItem(storageKey,JSON.stringify(next));setSymbols(next);setError("");
      if(add)setQuery("");
    }catch{setError("Unable to save changes. Check browser storage and try again.");}
  }
  const term=query.trim().toLowerCase();
  const matches=term?directory.securities.filter(([symbol,name])=>symbol.toLowerCase().includes(term)||name.toLowerCase().includes(term)).sort(([a],[b])=>Number(b.toLowerCase()===term)-Number(a.toLowerCase()===term)).slice(0,10):[];
  return <div className="dashboard"><WorkspaceHeader section="watchlist"/><main className="fund-main wl">
    <header className="research-masthead"><div className="orbit-etch" aria-hidden="true"/><div className="masthead-copy"><h1>Watchlist</h1><p>NSE equities · Saved in this browser</p></div></header>
    <section className="wl-panel"><div className="wl-tools"><label className="wl-search"><Search size={18}/><input type="search" value={query} aria-label="Search by company or NSE symbol" placeholder="Search by company or NSE symbol…" onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Escape")setQuery("");}}/></label>
    {symbols.length>0&&<button className="wl-refresh" onClick={()=>setRevision(r=>r+1)}><RefreshCw size={15}/>Refresh quotes</button>}</div>
    {term&&<div className="wl-matches">{matches.length?matches.map(([symbol,name])=><button key={symbol} disabled={symbols.includes(symbol)} onClick={()=>update(symbol,true)}><span><strong>{name}</strong><small>{symbol}</small></span>{symbols.includes(symbol)?"Added":<Plus size={17} aria-label="Add"/>}</button>):<p>No matching NSE stocks.</p>}</div>}
    {error&&<p role="alert">{error}</p>}
    {symbols.length?<div className="wl-scroll"><table><caption className="sr-only">Watched stocks and latest available NSE quotes</caption><thead><tr>{["Company","Price","Day change","Volume","Quote as of",""].map(h=><th key={h} scope="col">{h||<span className="sr-only">Actions</span>}</th>)}</tr></thead><tbody>{symbols.map(symbol=><StockRow key={symbol} symbol={symbol} revision={revision} remove={()=>update(symbol,false)}/>)}</tbody></table></div>:<div className="wl-empty"><Bookmark size={24}/><h2>Add your first stock</h2><p>Search above to start tracking prices.</p></div>}</section>
  </main></div>;
}
