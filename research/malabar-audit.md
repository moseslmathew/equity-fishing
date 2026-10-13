# Malabar public portfolio reconciliation — 11 October 2026

The scope is Malabar India Fund's named public holdings, associated with Sumeet Nagar / Malabar Investments. These are institutional holdings, not Nagar's personal investments. Malabar Select Fund is not combined with Malabar India Fund. Percentages measure company ownership, not fund allocation. The latest available public portfolio is incomplete and contains mixed reporting dates.

## Coverage and sources

22 companies are included: 19 June 30 records, a June RACL row with an abbreviated legal-holder name, a newer September 16 Neogen snapshot, and Virtuoso's August capital-change record held for reconciliation. Every record has two or more independently operated source domains plus per-source observations. These are provider cross-checks, not independent primary-document audits. Block.deal points to official exchange filings; NSE links returned internal errors during retrieval, so no unchecked original filing is labelled verified.

- Block.deal: https://block.deal/entities/malabar-india-fund-limited/ —20 named June rows, full precision stakes and quantities. Neogen's June row superseded by September snapshot.
- Solomo: https://solomo.ai/investor/malabarindiafundlimited/ — corroborates all 20 June company stakes at two decimals; shares not exposed. Has 21 holdings with Virtuoso, omits RACL.
- Trendlyne June: https://trendlyne.com/portfolio/superstar-shareholders/53954/Q 2-2026/malabar-investments/ — exact share quantities corroborate Block.deal; percentages mostly rounded to one decimal. Has 22 holdings including RACL.
- Trendlyne September: https://trendlyne.com/portfolio/superstar-shareholders/53954/Q 3-2026/malabar-investments/ — most rows marked filing awaited; these must not be relabelled September. Tanfac marked below 1% with no exact stake shown.

## Material discrepancies

RACL: Trendlyne's June holder is MALABAR INDIA FUND with 691,785 shares and 5.9% rounded. Value Research's explicitly labelled Jun 26 column has 5.87% under the same name. TipHub corroborates 691,785/5.9%. Solomo's absence/exit suggestion is contradicted by those named June records. Store holder as Malabar India Fund, retain the suffix variation and do not infer legal identity solely from a provider name match.

Value Research: https://www.valueresearchonline.com/stocks/44020/racl-geartech-ltd/
TipHub: https://www.tiphub.ai/stocks/RACLGEAR

Neogen: Trendlyne's latest shareholding snapshot is explicitly September 16,2026 with 390,167 shares/1.30%; ICICI Direct agrees on the holder, shares and percentage but does not independently date the row. Date confidence is consequently based on Trendlyne. Prior June record 345,476/1.26 is historical, not the latest.

https://trendlyne.com/equity/share-holding/141845/NEOGEN/latest/neogen-chemicals-ltd/
https://www.icicidirect.com/stocks/neogen-chemicals-ltd-share-price

Virtuoso: Trendlyne August 13 and Investing.com August 12 show 4,656,417/13.59%; ScanX's August 12 preferential acquisition report also gives 4,656,417 shares but 13.32%, including a statement about diluted/voting capital. Primary denominator not independently reconciled. Withhold stake and shares in headline, retain numbers and basis conflict in source observations. Generic June portfolio tables show 7.91%; some dynamic Moneycontrol result displays 9.99. Neither supersedes the newer dated August event. This row is review, not providers.

https://trendlyne.com/equity/share-holding/1023084/VOEPL/latest/virtuoso-optoelectronics-ltd/
https://in.investing.com/equities/virtuoso-optoelectronics-ownership
https://scanx.trade/stock-market-news/companies/malabar-india-fund-raises-virtuoso-optoelectronics-stake-13-32/48243835

Tanfac: June 1.07%/226,605 shares is corroborated. September Trendlyne signals below 1%, but exact latest percentage was not retrieved or cross-checked. Keep historical June row with explicit caution rather than inventing zero/current stake.

Dr. Agarwal's Eye Hospital is BSE 526783. Do not conflate with the differently listed Dr. Agarwal's Health Care.

Bansal Wire bulk/block purchase data is a transaction, not a verified total holding. It is excluded from portfolio numbers absent named, dated total ownership confirmation. Old Ganesh Benzoplast/SIS/Prataap/Acutaas/etc. absent current named rows are not treated as confirmed zero holdings or exits.

The checkedOn date is a research review date, not the effective date of every holding. Providers may derive from the same exchange dataset; agreement improves consistency but does not remove dependence on correct filings or guarantee completeness.

A later root-agent Block.deal retrieval returned Affle September 30 2.16% / 3,039,164 shares and Le Travenues September 30 3.93% / 17,314,410 shares. My retrieval served June rows. Explicit later single-provider observations were added without relabelling the June display. Search found Affle same stake/quantity on Bajaj Finserv but not independently dated September; no Le Travenues September corroboration. No false claim of complete latest-quarter verification.

## Successful direct original retrieval — final update

Plain urllib requests successfully downloaded Affle and Le Travenues September NSE XBRL documents after the web click route failed. Both exact named-holder contexts are dated September 30, 2026. Affle: 3,039,164 shares / 2.16%; Le Travenues: 17,314,410 shares / 3.93%. Both match the later Block.deal September observations. These two rows now supersede June and are labelled primary. ShareholdingAsAPercentageOfTotalNumberOfShares is stored as a fraction in the XBRL (0.0216 and 0.0393), multiplied by100 for displayed percentages. Fully diluted fields0.0204 and0.0378 are not substituted for issued-share ownership. Earlier caution paragraphs describe the first retrieval, not the final evidence level.

research/malabar-original-evidence.json contains URLs, SHA256, company, exact holder, context, report date, quantity, percentage and extracted context facts. Final counts: 2 primary, 19 provider cross-checks, 1 review.
