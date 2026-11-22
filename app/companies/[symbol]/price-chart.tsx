"use client";

import {useEffect,useState} from "react";
import {ChartNoAxesCombined} from "lucide-react";
import {Area,Bar,CartesianGrid,Cell,ComposedChart,ReferenceLine,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger} from "../../../components/ui/dialog";
import type {TradingDay} from "../../../lib/nse-price-history";
import "./price-chart.css";

const ranges = {"5D":1,"1M":1,"3M":3,"6M":6,"1Y":12} as const;
type Range = keyof typeof ranges;
const price = new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"});
const shares = new Intl.NumberFormat("en-IN");
const shortDate = new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",timeZone:"UTC"});
const fullDate = new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"});
const at = (date: string) => new Date(date+"T00:00:00Z");

function SessionStats({day}:{day:TradingDay}) {
  return <dl className="price-chart-stats">
    {(["open","high","low","close","volume"] as const).map(key=><div key={key}>
      <dt>{key}</dt><dd>{key==="volume"?shares.format(day[key]):price.format(day[key])}</dd>
    </div>)}
  </dl>;
}

function History({symbol,series}:{symbol:string;series:string}) {
  const [range,setRange]=useState<Range>("1M");
  const [history,setHistory]=useState<Record<number,TradingDay[]>>({});
  const [error,setError]=useState("");
  const [retry,setRetry]=useState(0);
  const months=ranges[range];
  const saved=history[months]??history[12]?.filter(day=>{
    const latest=new Date(history[12].at(-1)?.date??0);
    latest.setUTCMonth(latest.getUTCMonth()-months);
    return at(day.date)>=latest;
  });
  useEffect(()=>{
    if(saved)return;
    const controller=new AbortController();
    setError("");
    async function load() {
      try {
        const params=new URLSearchParams({symbol,series,months:String(months)});
        const response=await fetch("/api/nse/history?"+params,{signal:controller.signal});
        const result=await response.json() as {days?:TradingDay[];error?:string};
        if(!response.ok||!result.days)throw new Error(result.error||"Unable to load NSE price history.");
        if(!controller.signal.aborted)setHistory(current=>({...current,[months]:result.days!}));
      } catch(error) {
        if(!controller.signal.aborted)setError(error instanceof Error?error.message:"Unable to load NSE price history.");
      }
    }
    void load();
    return ()=>controller.abort();
  },[months,retry,saved,series,symbol]);

  const days=range==="5D"?saved?.slice(-5):saved;
  const latest=days?.at(-1);
  const high=days?.length?Math.max(...days.map(day=>day.high)):0;
  const low=days?.length?Math.min(...days.map(day=>day.low)):0;
  const padding=Math.max((high-low)*0.08,high*0.005);
  const chartBottom=low-padding-Math.max(high-low,padding)*0.42;
  const volumeMax=days?.length?Math.max(1,...days.map(day=>day.volume)):1;

  return <>
    <div className="price-chart-toolbar"><div role="group" aria-label="Price history range">
      {(Object.keys(ranges) as Range[]).map(key=><button key={key} aria-pressed={key===range} onClick={()=>{if(key!==range){setError("");setRange(key);}}}>{key}</button>)}
    </div>{latest&&<p>High <strong>{price.format(high)}</strong> <span>Low <strong>{price.format(low)}</strong></span></p>}</div>
    {!latest?<div className="price-chart-state" role="status">{saved?"No trading sessions available for this range.":error||"Loading NSE price history…"}{error&&<button onClick={()=>{setError("");setRetry(value=>value+1);}}>Try again</button>}</div>:<>
      <div className="price-chart-plot">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={days} margin={{top:12,right:4,left:4,bottom:0}}>
            <defs><linearGradient id="price-history-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#17a77e" stopOpacity={0.26}/><stop offset="100%" stopColor="#17a77e" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid vertical={false} strokeDasharray="4 5" stroke="#e8e1f1"/>
            <XAxis dataKey="date" axisLine={false} tickLine={false} minTickGap={34} tickFormatter={date=>shortDate.format(at(date))}/>
            <YAxis yAxisId="price" orientation="right" width={68} domain={[Math.max(0,chartBottom),high+padding]} tickCount={5} axisLine={false} tickLine={false} tickFormatter={value=>"₹"+shares.format(value)}/>
            <YAxis yAxisId="volume" hide domain={[0,volumeMax*5]}/>
            <ReferenceLine yAxisId="price" y={low-padding/2} stroke="#eee7f4"/>
            <Tooltip content={({active,payload})=>{
              const day=payload?.[0]?.payload as TradingDay|undefined;
              return active&&day?<div className="price-chart-tooltip"><strong>{fullDate.format(at(day.date))}</strong><SessionStats day={day}/></div>:null;
            }}/>
            <Area yAxisId="price" dataKey="close" stroke="#098766" strokeWidth={2.4} fill="url(#price-history-fill)" baseValue={low-padding/2} dot={days?.length===1} activeDot={{r:4}} isAnimationActive={false}/>
            <Bar yAxisId="volume" dataKey="volume" maxBarSize={18} radius={[2,2,0,0]} isAnimationActive={false}>
              {days?.map((day,index)=><Cell key={day.date} fill={day.close>=(days[index-1]?.close??day.open)?"#80cdb4":"#eaa09f"}/>)}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="price-chart-session">{fullDate.format(at(latest.date))}</p>
      <SessionStats day={latest}/>
      <p className="price-chart-source">NSE Bhavcopy · Daily closes and traded volume · Prices are unadjusted for corporate actions</p>
    </>}
  </>;
}

export default function PriceChart({symbol,name,series}:{symbol:string;name:string;series:string}) {
  const [open,setOpen]=useState(false);
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><button type="button"><ChartNoAxesCombined size={16} aria-hidden="true"/>Charts</button></DialogTrigger>
    <DialogContent className="price-chart-dialog">
      <DialogHeader><DialogTitle>{name}</DialogTitle><DialogDescription>NSE · {symbol} · Price and volume</DialogDescription></DialogHeader>
      {open&&<History key={symbol+":"+series} symbol={symbol} series={series}/>}
    </DialogContent>
  </Dialog>;
}
