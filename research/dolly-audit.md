# Dolly Khanna / Rajiv Khanna — audit, 11 October 2026

## Scope and result

The registered holder is **Dolly Khanna**. Rajiv Khanna is her husband and the reported decision-maker. These are individual registered stakes, not a family aggregate and not allocations within her portfolio.

Four current disclosed records are retained. This is the full positive current set reported by Finology and Trendlyne at this check, not a complete account statement. Two companies have September observations, while two await September reporting and retain explicitly dated June observations.

| Company | Stake | Shares | Reporting date | Exact percentage checks | Quantity checks |
|---|---:|---:|---|---|---|
| Rain Industries | 1.72% | 5,798,355 | 30 September 2026 | Finology, Rediff, Block.deal | Rediff, Trendlyne, Block.deal |
| Chennai Petroleum Corporation | 1.02% | 1,513,689 | 30 September 2026 | Finology, Rediff | Rediff, Trendlyne |
| Prakash Industries | 2.12% | 3,794,120 | 30 June 2026 | Finology, Rediff | Rediff, Trendlyne, Smallcase |
| Savera Industries | 1.70% | 203,108 | 30 June 2026 | Finology, named Trendlyne company pattern, Bigul | Named Trendlyne pattern, Smallcase |

Full source URLs and concise observations are stored per holding in `data/dolly-khanna.json`.

## Accuracy decisions

- Finology and Trendlyne retain many historical companies in their tables. A historical positive figure followed by newer absence is not copied forward as current. Excluded examples include Emkay, KCP Sugar, National Oxygen, Som Distilleries, SPIC, Sharda Cropchem and Coffee Day.
- Trendlyne's portfolio headline percentages are rounded to one decimal. Exact values use Finology plus a second exact named/date-matched source; rounded numbers are not treated as disagreement.
- Rediff's portfolio lists stale rows from different quarters alongside current ones. Its overall company count and total value are not used. Only date-matched rows corroborate the positive active set.
- Smallcase's table labels its percentage column March 2026 while quantities reflect June. The March percentage column is not interpreted as June. Its dated June quantity and sector narrative are used only where corroborated.
- A Financial Express Savera narrative found in search described approximately 1.3% June, conflicting with named June tables at 1.70%. That article is not a percentage input.
- Pending filings and public disclosure thresholds can conceal positions. Falling below 1% does not establish full disposal; awaiting a filing does not establish zero ownership.
- Provider crosschecks are not guaranteed independent original data collection. They may share exchange filings/data feeds. Except for any explicitly described primary row below, no primary filing claim is made.

## Profile and investment idea

Suggested biography: Chennai-based investor Dolly Khanna holds the disclosed shares in her name; her husband Rajiv Khanna, an engineer and former ice-cream entrepreneur, reportedly manages the investments.

Core idea title: **Lesser-known businesses with active risk control**.

Suggested summary: Research less-followed businesses and special situations, then actively reassess positions as conditions change.

Suggested detail: The disclosed portfolio often includes traditional industrial and consumer businesses. At a September 2023 investor seminar, Rajiv described broad diversification, active rotation and a moving-average exit filter. This is a dated account of his stated process, rather than proof that every current position follows the same rule or that the portfolio is simply a long-term buy-and-hold strategy.

Focus points:
1. Lesser-followed businesses and special situations.
2. Broad research and active reassessment.
3. Defined exit discipline when the investment or market picture weakens.

Attribution: Mint's first-hand report of Rajiv Khanna's Tamil Nadu Investor Association seminar, published 15 September 2023: https://www.livemint.com/money/personal-finance/how-rajiv-khanna-invests-his-money/amp-11694784014570.html . It reports his engineering/business background, legal holder distinction, active approach and 30-day moving-average filter. Treat that method as dated, not verified current policy.

Supplemental portfolio context: https://trendlyne.com/portfolio/superstar-shareholders/53757/latest/dolly-khanna/ . Finology's generic patient/long-term profile conflicts with the more specific reported seminar process, so the latter is explicitly attributed and dated.

Portrait: Finology's investor image shows **Rajiv Khanna**, not Dolly. Use alt text “Rajiv Khanna, reported manager of Dolly Khanna's portfolio” and label the distinction if displaying it: https://d3po6s2ufk88fh.cloudfront.net/400x400/Ticker/54d11f222dfe4a5c9b75196f5c449105.jpg . Profile source: https://ticker.finology.in/investor/dolly-khanna . No fabricated photograph or net-worth claim.

## Original Rain XBRL verification

Original NSE filing independently downloaded and parsed: https://nsearchives.nseindia.com/corporate/xbrl/SHP_1734227_08102026023909_WEB.xml . Legal name `Dolly Khanna` in duration context `D_DetailsOfSharesHeldByResidentIndividualShareholdersHoldingNominalShareCapitalInExcessOfRsTwoLakh_Context15` links to the identically dimensioned instant context without `D_`, ending 30 September 2026. `NumberOfShares` is 5798355; percentage fact is 0.0172, i.e. 1.72%. Rain status is `primary`; the other three remain `providers`. Assertions for name-linked shares, percentage and reporting instant passed.
