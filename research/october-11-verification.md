# Research and ace-investor review — 11 October 2026

## Ace investors

Revisited every saved company against Finology, Trendlyne and available holder-specific records. Retrieved and parsed 45 original NSE XBRL shareholding filings. The extracted issuer names, registered holders, dates, quantities and percentages (plus source SHA-256) are in ace-primary-evidence.json. These extracts intentionally omit unrelated holders and personal identifiers.

Published coverage: Vijay Kedia 22 records (14 original filings checked for the displayed date, six provider cross-checks, two unresolved); Ashish Kacholia 46 records (30 original filings checked, 16 provider cross-checks). These are curated, dated disclosures, not complete live portfolios. Agreement between providers that share exchange data is not an independent audit.

Corrections and reconciliations:

- Atul Auto: 20.91% combines Vijay Kedia 18.20% and Kedia Securities 2.71%. Global Vectra: 4.86% combines 3.00% and 1.86%. Holder filters now change both percentage and quantity.
- Ashish's personal Beta Drugs 4.91%, Shaily 3.22% and TechEra 3.57% agree with original June filings. Provider totals 11.04%, 5.21% and 6.29% include Suryavanshi. Individual registered-holder rows are displayed separately; associated entities are not silently attributed to him personally. Other Bengal Finance rows encountered in original filings are shown as separate legal owners, not beneficial-ownership totals.
- Elecon Engineering September 1.00%, 2,250,000 shares verified in the original September filing. Eimco September 1.45%, 83,930 shares agrees across providers, but retrieved original filing is June, so September remains provider-level verification.
- Knowledge Marine restored using original 4 August filing: 594,721 shares, 2.36%; later than the June provider summaries. V-Marc restored using 8 July original: 3,966,000 shares, 2.71%. Its pre-bonus June quantity is not used for the later date.
- Concord Control restored at September 1.64%, 170,292 shares based on two providers; original September filing not independently retrieved.
- Z-Tech September 13 original confirms 535,700 shares / 3.31%; June's 3.71% is a different date. Thomas Scott September 1 provider record confirms 307,539 shares / 2.07%; June 2.10% is historical.
- EverestIMS headline 4.99% removed. Retrieved 21 September RHP confirms it is pre-offer (850,010 shares); post-offer percentage is blank. Finology's 3.93% matches an indicative dilution calculation using the proposed fresh issue, but the final post-allotment filing was not independently verified. No current headline asserted.
- SPML: June provider 1.78% vs 18 July provider 1.77% at unchanged 1,498,107 shares. Later denominator not independently reconciled; headline withheld.

Company-specific evidence popups state what each source supports. March disclosures retain their historical date; absence from a newer provider view is not interpreted as a sale. Entity-only Ashish positions remain outside the named-personal-holdings scope, stated visibly in coverage notes. Records do not automatically refresh after this review.

## Research refresh

Rewrote the comprehensive narrative and ten company growth cases with separate business economics, management execution, balance-sheet/cash conversion, valuation and failure conditions. Reviewed new issuer material and news through 11 October; price-sensitive information has its own source period. Added eClerx's September Investor Day, KPIL's Linjemontage listing/OFS distinction, CARE's October 8 Vinati review, Ather's updated supply/distribution plans and recent macro developments. Retained uncertainties where original transcripts or full filings could not be retrieved.

Portfolio evidence remains 20 August comparisons and two September comparisons (DSP and Nippon), representing 42 distinct snapshots and 682 companies. September is not described as full industry coverage. Motilal's current provider page had a malformed all-zero comparison and was not imported as wholesale selling; historical signals are explicitly qualified. Live R2 contents were not independently refreshed in this review. Narrative freshness is not portrayed as a live generated report.

The exact model identifier is not exposed by the runtime. The report honestly says “Exact model unavailable”; Codex remains an agent provenance field, not a model version. Never infer a version from product names or tool model options.

## Checks

TypeScript compilation, all-archive research checks and ace-investor tests cover source references, issuer/holder/date/quantity reconciliation, corporate-action quantities, personal/entity display, and null headline values for unresolved records. Browser preview was unavailable; visual browser QA was not performed.
