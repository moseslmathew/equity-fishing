import type {ResearchReport} from "../lib/agent-research";
import {monthLabel} from "./research-overview";
export default function ResearchNewsletter({report}:{report:ResearchReport}){
 const letter=report.newsletter;
 if(!letter)return null;
 const latest=report.periods.find(p=>p.month===report.fundMonth);
 return <div className="research-newsletter">
  <div className="newsletter-edition"><span>THE OBSERVATORY LETTER</span><time dateTime={report.asOf}>{letter.edition}</time></div>
  <p className="newsletter-deck">{report.summary}</p>
  <div className="newsletter-pulse" aria-label="Three-month analysis coverage"><div><strong>{report.deepResearch?.funds.length??latest?.coverage??0}</strong><span>matched funds</span></div><div><strong>{report.deepResearch?.companies??latest?.companies??0}</strong><span>reconciled companies</span></div><div><strong>{report.deepResearch?.counts.persistent??0}</strong><span>companies with repeat additions</span></div><div><strong>{report.deepResearch?`${monthLabel(report.deepResearch.months[0])} – ${monthLabel(report.fundMonth)}`:monthLabel(report.fundMonth)}</strong><span>three month-end snapshots</span></div></div>
  <p className="newsletter-scope">{report.coverageNote}</p>
  <nav className="newsletter-contents" aria-label="Newsletter contents"><a href="#newsletter-letter">Editor’s letter</a><a href="#newsletter-dispatches">In this issue</a><a href="#newsletter-watchlist">What to watch</a><a href="#research-audit">Calculation notes</a></nav>
  <section id="newsletter-letter" className="newsletter-letter"><span className="newsletter-kicker">FROM THE EDITOR</span><h2>What the three-month trail reveals</h2>{letter.editorNote.split("\n\n").map((p,i)=><p key={i}>{p}</p>)}</section>
  {report.deepResearch?.available&&<section className="newsletter-watchlist" aria-label="Key discoveries"><span className="newsletter-kicker">THREE FINDINGS WORTH YOUR ATTENTION</span><div>{report.deepResearch.highlights.map(h=><article key={h.title}><h3>{h.title}</h3><p>{h.text}</p></article>)}</div></section>}
  <div id="newsletter-dispatches">{letter.stories.map((s,i)=><article className="newsletter-story" key={s.title}><div className="newsletter-story-index">{String(i+1).padStart(2,"0")}</div><div><span className="newsletter-kicker">{s.label}</span><h2>{s.title}</h2>{s.paragraphs.map((p,j)=><p key={j}>{p}</p>)}{s.refs.length>0&&<details className="newsletter-sources"><summary>Evidence sources ({s.refs.length})</summary>{s.refs.map(ref=>report.newsletterSources[ref]?<a key={ref} href={report.newsletterSources[ref].url} target="_blank" rel="noopener noreferrer">{report.newsletterSources[ref].label}</a>:null)}</details>}</div></article>)}</div>
  {report.deepResearch&&<details id="research-audit" className="research-source-list"><summary>Calculation notes &amp; excluded positions ({report.deepResearch.excluded.length})</summary><p>{report.method}</p><p>Two intervals: {report.deepResearch.months.join(" → ")}. Repeat accumulation requires a strictly positive quantity change in both intervals. Retention uses only initiations in the first interval. Share-growth percentages use the initial share count; a zero base has no growth percentage. Allocation changes are percentage points.</p><ul>{report.deepResearch.excluded.map((x,i)=><li key={i}><strong>{x.company} · {x.fund}</strong>: {x.reason}</li>)}</ul></details>}
  <section id="newsletter-watchlist" className="newsletter-watchlist"><span className="newsletter-kicker">THE NEXT CHECKPOINTS</span><h2>What to watch from here</h2><div>{letter.watchlist.map(w=><article key={w.title}><h3>{w.title}</h3><p>{w.text}</p></article>)}</div><p className="newsletter-signoff">{letter.closing}</p></section>
 </div>;
}
