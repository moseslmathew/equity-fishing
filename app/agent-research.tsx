"use client";
import {useEffect,useState} from "react";
import {Printer,X} from "lucide-react";
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogClose} from "../components/ui/dialog";
import ResearchOverview from "./research-overview";
import type {ResearchReport} from "../lib/agent-research";
export default function AgentResearch(){
 const [report,setReport]=useState<ResearchReport|null>(null),[error,setError]=useState("");
 const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;setError("");setReport(null);const controller=new AbortController();fetch("/api/research",{cache:"no-store",signal:controller.signal}).then(async r=>{if(!r.ok)throw new Error("Research report could not be loaded.");return r.json() as Promise<ResearchReport>;}).then(setReport).catch(e=>{if(e.name!=="AbortError")setError(e.message);});return()=>controller.abort();},[open]);
 return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="research-ai-button" aria-label="Open AI research report"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5 15.2 8.8 22.5 12 15.2 15.2 12 22.5 8.8 15.2 1.5 12 8.8 8.8Z"/></svg><span>AI Insights</span></button></DialogTrigger><DialogContent className="research-popup" showCloseButton={false}><div className="research-popup-header"><DialogTitle className="research-popup-title">AI Insights · The Observatory Letter</DialogTitle><DialogClose asChild><button className="research-popup-close" aria-label="Close research report"><X size={19} aria-hidden="true"/>Close</button></DialogClose></div><DialogDescription className="sr-only">A detailed portfolio newsletter with three-month calculations, fund evidence and clear interpretation.</DialogDescription><div className="research-content research-popup-scroll">
 {error?<p role="alert">{error} Refresh the page to try again.</p>:!report?<p role="status" className="loading-status"><span className="loading-spinner"/>Loading research…</p>:<>
 <header className="research-heading research-editorial-header"><div><span className="research-eyebrow">THE SMALLCAP OBSERVATORY / RESEARCH</span><h2>{report.title}</h2><p className="research-compact-meta" title={report.modelDisclosure}>{report.refreshedLabel} · Three-month portfolio review</p></div><div className="research-actions"><button className="quiet-button" onClick={()=>window.print()}><Printer size={16}/>Print report</button></div></header>
 <ResearchOverview report={report}/>
 <div className="research-case-bottom"><button className="minimize-button" onClick={()=>setOpen(false)}><X size={15}/>Close report</button></div>
 </>}
 </div></DialogContent></Dialog>;
}
