"use client";
import {useState} from "react";
import {BarChart3,LockKeyhole,Eye,EyeOff} from "lucide-react";
export default function Login(){
  const [password,setPassword]=useState(""),[show,setShow]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState("");
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();setBusy(true);setError("");
    try{
      const response=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
      const result=await response.json() as {error?:string};
      if(!response.ok)throw new Error(result.error||"Unable to sign in.");
      window.location.replace("/");
    }catch(e){setError(e instanceof Error?e.message:"Unable to sign in.");setBusy(false);}
  }
  return <main className="login-page"><div className="login-brand"><span className="brand-mark"><BarChart3 size={22}/></span><span>Smallcap<span className="brand-sub">OBSERVATORY</span></span></div><section className="login-card"><span className="login-lock"><LockKeyhole size={24}/></span><h1>Your fund dashboard</h1><p>Enter your password to view the funds.</p><form onSubmit={submit}><label htmlFor="password">Password</label><div className="password-field"><input id="password" name="password" type={show?"text":"password"} autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required autoFocus/><button type="button" aria-label={show?"Hide password":"Show password"} onClick={()=>setShow(!show)}>{show?<EyeOff size={19}/>:<Eye size={19}/>}</button></div>{error&&<p className="login-error" role="alert">{error}</p>}<button className="login-submit" disabled={busy} type="submit">{busy?"Signing in…":"Sign in"}</button></form></section></main>;
}
