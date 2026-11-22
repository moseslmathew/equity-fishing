"use client";
import {useCallback,useEffect,useState} from "react";
import {Bookmark,Plus,RefreshCw,Search,Trash2,ExternalLink,ChartNoAxesCombined,ArrowUp,ArrowDown,ArrowUpDown,TrendingUp,TrendingDown} from "lucide-react";
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

type SortKey="security"|"price"|"change";
type RowProps={
  symbol:string;
  revision:number;
  quote?:NseSnapshot;
  saveQuote:(snapshot:NseSnapshot)=>void;
  remove:()=>void;
};
function StockRow({symbol,revision,quote,saveQuote,remove}:RowProps){
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
        if(!controller.signal.aborted){saveQuote(snapshot);setStatus("");}
      }catch{if(!controller.signal.aborted)setStatus("Quote unavailable");}
    }
    void refresh();
    return ()=>controller.abort();
  },[symbol,revision,saveQuote]);
  const live=quote?.live?.price!=null?quote.live:null;
  const price=live?.price??quote?.eod?.close;
  const change=live?.changePercent;
  const volume=live?live.volume:quote?.eod?.volume;
  const asOf=live?.asOfIso?new Date(live.asOfIso).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})+" IST":live?.asOf??quote?.eod?.date;
  const path="/companies/"+encodeURIComponent(symbol);
  const direction=change==null||change===0?"flat":change>0?"up":"down";
  const Trend=direction==="up"?TrendingUp:TrendingDown;
  return <tr>
    <th scope="row"><a className="wl-company" href={path}>{companies.get(symbol)}</a><small>{symbol}</small></th>
    <td><strong className="wl-price">{price==null?"—":rupees.format(price)}</strong>
      <small>{!live&&price!=null?"Close · ":""}{asOf}{status&&asOf?" · ":""}{status}</small></td>
    <td><span className={"wl-move "+direction}>{direction!=="flat"&&<Trend size={14} aria-hidden="true"/>}{change==null?"—":(change>0?"+":"")+change.toFixed(2)+"%"}</span>
      <small>{live?.change==null?"—":(live.change>0?"+":"")+rupees.format(live.change)}</small></td>
    <td className="wl-volume">{volume==null?"—":volume.toLocaleString("en-IN")}</td>
    <td><div className="wl-actions"><a href={path} aria-label={"Research "+symbol} title="Company research"><ChartNoAxesCombined size={17}/></a>
      <a href={"https://www.nseindia.com/get-quotes/equity?symbol="+encodeURIComponent(symbol)} target="_blank" rel="noopener noreferrer" aria-label={"Open "+symbol+" on NSE"} title="Open on NSE"><ExternalLink size={16}/></a>
      <button onClick={remove} aria-label={"Remove "+symbol} title="Remove stock"><Trash2 size={16}/></button></div></td>
  </tr>;
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
  const [quotes,setQuotes]=useState<Record<string,NseSnapshot>>({});
  const saveQuote=useCallback((quote:NseSnapshot)=>setQuotes(current=>({...current,[quote.symbol]:quote})),[]);
  const [sort,setSort]=useState<{key:SortKey;ascending:boolean}>({key:"security",ascending:true});
  function numericValue(symbol:string){
    const quote=quotes[symbol];
    if(sort.key==="price")return quote?.live?.price??quote?.eod?.close;
    return quote?.live?.price!=null?quote.live.changePercent:null;
  }
  const sorted=[...symbols].sort((a,b)=>{
    const byName=(companies.get(a)??a).localeCompare(companies.get(b)??b);
    if(sort.key==="security")return sort.ascending?byName:-byName;
    const left=numericValue(a),right=numericValue(b);
    if(left==null||right==null)return left==null&&right==null?byName:left==null?1:-1;
    return (sort.ascending?left-right:right-left)||byName;
  });
  function heading(key:SortKey,label:string){
    const active=sort.key===key;
    const Arrow=active?(sort.ascending?ArrowUp:ArrowDown):ArrowUpDown;
    return <th scope="col" aria-sort={active?(sort.ascending?"ascending":"descending"):"none"}>
      <button onClick={()=>setSort({key,ascending:active?!sort.ascending:key==="security"})}>{label}<Arrow size={13}/></button></th>;
  }
  const term=query.trim().toLowerCase();
  const matches=term?directory.securities.filter(([symbol,name])=>symbol.toLowerCase().includes(term)||name.toLowerCase().includes(term)).sort(([a],[b])=>Number(b.toLowerCase()===term)-Number(a.toLowerCase()===term)).slice(0,10):[];
  return <div className="dashboard"><WorkspaceHeader section="watchlist"/><main className="fund-main wl">
    <header className="research-masthead"><div className="orbit-etch" aria-hidden="true"/><div className="masthead-copy"><h1>Watchlist</h1><p>NSE equities · Saved in this browser</p></div></header>
    <section className="wl-panel"><div className="wl-tools"><label className="wl-search"><Search size={18}/><input type="search" value={query} aria-label="Search by company or NSE symbol" placeholder="Search by company or NSE symbol…" onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Escape")setQuery("");}}/></label>
    {symbols.length>0&&<button className="wl-refresh" onClick={()=>setRevision(r=>r+1)}><RefreshCw size={15}/>Refresh quotes</button>}</div>
    {term&&<div className="wl-matches">{matches.length?matches.map(([symbol,name])=><button key={symbol} disabled={symbols.includes(symbol)} onClick={()=>update(symbol,true)}><span><strong>{name}</strong><small>{symbol}</small></span>{symbols.includes(symbol)?"Added":<Plus size={17} aria-label="Add"/>}</button>):<p>No matching NSE stocks.</p>}</div>}
    {error&&<p role="alert">{error}</p>}
    {symbols.length?<div className="wl-scroll"><table><caption className="sr-only">Watched stocks and latest available NSE quotes</caption><thead><tr>{heading("security","Security")}{heading("price","Last price")}{heading("change","Day change")}<th scope="col">Volume</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead><tbody>{sorted.map(symbol=><StockRow key={symbol} symbol={symbol} revision={revision} quote={quotes[symbol]} saveQuote={saveQuote} remove={()=>update(symbol,false)}/>)}</tbody></table></div>:<div className="wl-empty"><Bookmark size={24}/><h2>Add your first stock</h2><p>Search above to start tracking prices.</p></div>}</section>
  </main></div>;
}
