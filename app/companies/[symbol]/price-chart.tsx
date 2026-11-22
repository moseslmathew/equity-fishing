"use client";

import {useEffect,useState} from "react";
import {ChartNoAxesCombined} from "lucide-react";
import {Area,Bar,CartesianGrid,Cell,ComposedChart,ReferenceDot,ReferenceLine,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger} from "../../../components/ui/dialog";
import type {TradingDay} from "../../../lib/nse-price-history";
import "./price-chart.css";

const ranges = {"5D":1,"1M":1,"3M":3,"6M":6,"1Y":12,"3Y":36,"5Y":60,"All":60} as const;
type Range = keyof typeof ranges;
const price = new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"});
const changeFormat = new Intl.NumberFormat("en-IN",{style:"percent",signDisplay:"exceptZero",minimumFractionDigits:2,maximumFractionDigits:2});
const shares = new Intl.NumberFormat("en-IN");
const shortDate = new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",timeZone:"UTC"});
const yearDate = new Intl.DateTimeFormat("en-IN",{month:"short",year:"2-digit",timeZone:"UTC"});
const fullDate = new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"});
const at = (date: string) => new Date(date+"T00:00:00Z");

function SessionStats({day}:{day:TradingDay}) {
  return <dl className="price-chart-stats">
    {(["close","volume"] as const).map(key=><div key={key}>
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
  const saved=history[months]??(months<60?history[60]:undefined)??(months<36?history[36]:undefined)??(months<12?history[12]:undefined);
  useEffect(()=>{
    if(saved)return;
    const controller=new AbortController();
    setError("");
    async function load() {
      try {
        // Overlap the windows by a month because the feed pages in 90-day chunks.
        // Keep each Worker request to four upstream history calls or fewer.
        const offsets=months<=12?[0]:Array.from({length:Math.ceil(months/11)},(_,index)=>index*11);
        const windows=await Promise.all(offsets.map(async offset=>{
          const size=months<=12?months:Math.min(12,months-offset+1);
          const params=new URLSearchParams({symbol,series,months:String(size<=1?1:size<=3?3:size<=6?6:12),offset:String(offset)});
          const response=await fetch("/api/nse/history?"+params,{signal:controller.signal});
          const result=await response.json() as {days?:TradingDay[];error?:string};
          if(!response.ok||!result.days)throw new Error(result.error||"Unable to load NSE price history.");
          return result.days;
        }));
        const byDate=new Map(windows.flat().map(day=>[day.date,day]));
        const days=[...byDate.values()].sort((a,b)=>a.date.localeCompare(b.date));
        if(!controller.signal.aborted)setHistory(current=>({...current,[months]:days}));
      } catch(error) {
        if(!controller.signal.aborted)setError(error instanceof Error?error.message:"Unable to load NSE price history.");
      }
    }
    void load();
    return ()=>controller.abort();
  },[months,retry,saved,series,symbol]);

  const lastSession=saved?.at(-1);
  const cutoff=lastSession?at(lastSession.date):null;
  if(cutoff){
    if(range==="1Y")cutoff.setUTCDate(cutoff.getUTCDate()-52*7);
    else{
      const date=cutoff.getUTCDate();
      cutoff.setUTCDate(1);
      cutoff.setUTCMonth(cutoff.getUTCMonth()-months);
      cutoff.setUTCDate(Math.min(date,new Date(Date.UTC(cutoff.getUTCFullYear(),cutoff.getUTCMonth()+1,0)).getUTCDate()));
    }
  }
  const days=range==="5D"?saved?.slice(-5):range==="All"||!cutoff?saved:saved?.filter(day=>at(day.date)>=cutoff);
  const first=days?.[0];
  const latest=days?.at(-1);
  const periodChange=first&&latest&&first.date!==latest.date?latest.close/first.close-1:null;
  const highDay=days?.length?days.reduce((highest,day)=>day.high>=highest.high?day:highest):undefined;
  const lowDay=days?.length?days.reduce((lowest,day)=>day.low<=lowest.low?day:lowest):undefined;
  const high=highDay?.high??0;
  const low=lowDay?.low??0;
  const padding=Math.max((high-low)*0.08,high*0.005);
  const chartBottom=low-padding-Math.max(high-low,padding)*0.42;
  const plotDays = days?.flatMap((day,index)=>{
    const previous=days[index-1];
    if(previous&&at(day.date).getTime()-at(previous.date).getTime()>14*86_400_000){
      const gapDate=new Date(at(previous.date).getTime()+86_400_000).toISOString().slice(0,10);
      return [{date:gapDate,close:null,volume:null},day];
    }
    return [day];
  });
  const hasGaps=plotDays?.some(day=>day.close===null);
  const volumeMax=days?.length?Math.max(1,...days.map(day=>day.volume)):1;

  return <>
    <div className="price-chart-toolbar"><div role="group" aria-label="Price history range">
      {(Object.keys(ranges) as Range[]).map(key=><button key={key} aria-pressed={key===range} onClick={()=>{if(key!==range){setError("");setRange(key);}}}>{key}</button>)}
    </div>{latest&&<div className="price-chart-range-summary">
      <p className="price-chart-period-change">
        Change <strong data-direction={periodChange===null||periodChange===0?"flat":periodChange>0?"up":"down"}
          title={first&&periodChange!==null?`Close to close · ${fullDate.format(at(first.date))} to ${fullDate.format(at(latest.date))}`:undefined}>
          {periodChange===null?"—":changeFormat.format(periodChange)}
        </strong>
      </p>
      <p>{range==="1Y"?"52-week high":"High"} <strong>{price.format(high)}</strong> <span>{range==="1Y"?"52-week low":"Low"} <strong>{price.format(low)}</strong></span></p></div>}</div>
    {!latest?<div className="price-chart-state" role="status">{saved?"No trading sessions available for this range.":error||"Loading NSE price history…"}{error&&<button onClick={()=>{setError("");setRetry(value=>value+1);}}>Try again</button>}</div>:<>
      <div className="price-chart-plot">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={plotDays} margin={{top:26,right:4,left:12,bottom:16}}>
            <defs><linearGradient id="price-history-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#17a77e" stopOpacity={0.26}/><stop offset="100%" stopColor="#17a77e" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid vertical={false} strokeDasharray="4 5" stroke="#e8e1f1"/>
            <XAxis dataKey="date" axisLine={false} tickLine={false} minTickGap={34} tickFormatter={date=>(months>=36?yearDate:shortDate).format(at(date))}/>
            <YAxis yAxisId="price" orientation="right" width={68} domain={[Math.max(0,chartBottom),high+padding]} tickCount={5} axisLine={false} tickLine={false} tickFormatter={value=>"₹"+shares.format(value)}/>
            <YAxis yAxisId="volume" hide domain={[0,volumeMax*5]}/>
            <ReferenceLine yAxisId="price" y={low-padding/2} stroke="#eee7f4"/>
            <Tooltip content={({active,payload})=>{
              const day=payload?.[0]?.payload as TradingDay|undefined;
              return active&&day&&day.close!=null?<div className="price-chart-tooltip">
                <time dateTime={day.date}>{fullDate.format(at(day.date))}</time>
                <dl><dt>Close</dt><dd>{price.format(day.close)}</dd>
                  <dt>Volume</dt><dd>{shares.format(day.volume)}</dd></dl>
              </div>:null;
            }}/>
            <Area yAxisId="price" dataKey="close" stroke="#098766" strokeWidth={2.4} fill="url(#price-history-fill)" baseValue={low-padding/2} dot={days?.length===1} activeDot={{r:4}} isAnimationActive={false}/>
            <Bar yAxisId="volume" dataKey="volume" maxBarSize={18} radius={[2,2,0,0]} isAnimationActive={false}>
              {plotDays?.map((day,index)=><Cell key={day.date} fill={day.close!==null&&day.close>=(plotDays[index-1]?.close??day.close)?"#80cdb4":"#eaa09f"}/>)}
            </Bar>
            {highDay&&lowDay&&high>low&&([
              {kind:"high",day:highDay,value:high,color:"#098766",offset:-11},
              {kind:"low",day:lowDay,value:low,color:"#d63848",offset:20},
            ] as const).map(({kind,day,value,color,offset})=>{
              const position=days!.indexOf(day)/Math.max(1,days!.length-1);
              const anchor=position<=0.25?"start":position>=0.75?"end":"middle";
              return <ReferenceDot key={kind}
              x={day.date} y={value} yAxisId="price" r={5} fill={color} stroke="white" strokeWidth={2}
              shape={({cx,cy})=><g className="price-chart-extreme" role="img"
                aria-label={(range==="1Y"?"52-week ":"")+kind+" "+price.format(value)+" on "+fullDate.format(at(day.date))}>
                <circle cx={cx} cy={cy} r={5} fill={color} stroke="white" strokeWidth={2}/>
                <text x={cx} y={(cy??0)+offset} textAnchor={anchor}>{price.format(value)}</text>
              </g>}
            />;})}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="price-chart-session">{fullDate.format(at(latest.date))}</p>
      <SessionStats day={latest}/>
      <p className="price-chart-source">NSE Bhavcopy{range==="All"?" · All available history (up to 5 years)":""} · Daily closes and traded volume · Prices are unadjusted for corporate actions{hasGaps?" · Gaps indicate unavailable NSE sessions":""}</p>
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
