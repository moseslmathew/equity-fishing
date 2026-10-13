import {ChevronDown} from "lucide-react";

type SharedCompany = {name:string;funds:{name:string;weight:number}[]};

export default function SharedHoldings({companies,month,pending,partial=false}:{companies:SharedCompany[];month:string;pending:boolean;partial?:boolean}){
  return <details className="shared-section">
    <summary className="shared-summary"><span className="shared-title">Shared holdings</span><span className="section-toggle" aria-hidden="true"/></summary>
    <div className="shared-content"><p className="section-context">{companies.length} shared companies · Companies appearing in multiple funds’ top 15 · {month}</p>
      {companies.length>0?<ul className="shared-grid">{companies.map(company=><li className="shared-company" key={company.name}>
        <details className="shared-company-details">
        <summary className="shared-company-heading"><span className="shared-company-name">{company.name}</span><span className="shared-company-toggle"><span className="shared-fund-count">{company.funds.length} funds</span><span className="shared-collapse-label">Minimize</span><ChevronDown size={18} aria-hidden="true"/></span></summary>
        <div className="shared-company-content">
        <div className="shared-columns" aria-hidden="true"><span>Fund</span><span>Allocation</span></div>
        <ul className="shared-fund-list">{company.funds.map(fund=><li key={fund.name}><span className="shared-fund-name">{fund.name}</span><span className="shared-weight"><span className="sr-only">Allocation: </span>{fund.weight.toFixed(2)}%</span></li>)}</ul>
        <div className="shared-collapse-bottom"><button className="minimize-button" aria-label={"Minimize "+company.name+" shared holding"} onClick={event=>{const card=event.currentTarget.closest("details");card?.removeAttribute("open");card?.querySelector("summary")?.focus();}}>Minimize</button></div>
        </div>
        </details>
      </li>)}</ul>:<p className="shared-empty">{pending?"Holdings are pending for this reporting month.":"No shared companies in the available top 15."}</p>}
      {companies.length>0&&<p className="shared-scope">Allocation is the company’s share of each fund’s net assets. This comparison covers the top 15 holdings only.{partial?" Some funds have fewer than 15 saved holdings for this month; shared holdings coverage is incomplete.":""}</p>}
    </div>
  </details>;
}
