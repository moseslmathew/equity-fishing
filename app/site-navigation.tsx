"use client";
import {useState} from "react";
import {Menu,BarChart3,Users,ArrowRight,Check,X} from "lucide-react";
import {Dialog,DialogClose,DialogContent,DialogTitle,DialogDescription} from "../components/ui/dialog";
export default function SiteNavigation({section,onNavigate}:{section:"funds"|"investors";onNavigate:(section:"funds"|"investors")=>void}){
 const [open,setOpen]=useState(false);
 return <><button className="quiet-button menu-button" aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)}><Menu size={21}/></button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="site-menu" showCloseButton={false}>
  <header className="workspace-menu-header"><span className="workspace-menu-eyebrow">YOUR RESEARCH WORKSPACE</span><DialogTitle>Explore</DialogTitle><DialogDescription>Where would you like to go?</DialogDescription><DialogClose className="workspace-menu-close" aria-label="Close navigation"><X size={19}/></DialogClose></header>
  <nav aria-label="Main navigation">{([{id:"funds",label:"Mutual funds",description:"Holdings, portfolio changes & research",icon:BarChart3},{id:"investors",label:"Ace investors",description:"Explore leading investors’ portfolios",icon:Users}] as const).map(item=><button key={item.id} className={section===item.id?"active":""} aria-current={section===item.id?"page":undefined} onClick={()=>{onNavigate(item.id);setOpen(false);}}><span className="workspace-menu-icon"><item.icon size={22}/></span><span className="workspace-menu-copy"><strong>{item.label}</strong><span>{item.description}</span></span><span className="workspace-menu-direction" aria-hidden="true">{section===item.id?<Check size={18}/>:<ArrowRight size={18}/>}</span></button>)}</nav>
 </DialogContent></Dialog></>;
}
