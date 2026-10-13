# Nalanda Capital portfolio reconciliation — 11 October 2026

Scope: public named Indian listed-company shareholdings for Nalanda India Equity Fund Limited and Nalanda India Fund Limited. These are institutional legal holders, not Pulak Prasad’s personal portfolio. Holdings below public naming thresholds, private investments, holdings through undiscovered vehicles and intra-quarter trades are not covered. Nalanda is not exclusively a small-cap investor; all 25 discovered listed companies are retained rather than filtering out larger companies.

## Discovery and freshness

The union of Trendlyne June 2026 holder breakdowns, Solomo’s separate holder pages and freshly opened Block.deal legal-holder pages comprises 21 Equity Fund companies and 9 India Fund companies. Five overlaps (Ahluwalia Contracts, Ratnamani, Triveni Turbine, V-Guard and Voltamp) produce 25 unique companies. Both Block.deal holder pages were read in full including the continuation rows after the first ten; this is not a top-ten sample.

Havells has a 30 September 2026 filing, 25,536,718 shares and 4.07%, replacing June 25,820,184 shares / 4.11%. September Trendlyne overview otherwise includes many “Filing Awaited” rows. Those blank latest-quarter cells do not prove exits. All other records retain their actual 30 June dates; no June data are presented as September ownership.

Sources:
- https://block.deal/entities/nalanda-india-equity-fund-limited/
- https://block.deal/entities/nalanda-india-fund-limited/
- https://trendlyne.com/portfolio/superstar-shareholders/53966/Q2-2026/nalanda-india-fund-limited/
- https://trendlyne.com/portfolio/superstar-shareholders/53966/Q3-2026/nalanda-india-fund-limited/
- https://solomo.ai/investor/nalandaindiaequityfundlimited/
- https://solomo.ai/investor/nalandaindiafundlimited/
- https://www.stockssena.com/investors/holder/nalanda-india-equity-fund-limited

## Exact values and source independence

Each row links named per-source observations in the JSON. Exact two-decimal percentages were read from Solomo and corroborated by Block.deal and/or exact Trendlyne company shareholding tables/history. Trendlyne’s portfolio overview rounds percentages to one decimal; those rounded values were never converted into invented precise percentages. Share counts were compared against Block.deal and Trendlyne legal-holder breakdowns (or a directly parsed NSE original). Different providers may share an exchange filing as underlying data; multiple domains are a consistency check, not independent audits of beneficial ownership.

The combined ownership percentages are sums of displayed vehicle percentages on the identical date, not portfolio allocations. Examples: Ahluwalia 5.49 + 2.48 = 7.97%; Ratnamani 2.97 + 3.85 = 6.82%; Triveni 3.87 + 3.50 = 7.37%; V-Guard 3.60 + 1.25 = 4.85%; Voltamp 6.08 + 1.70 = 7.78%. Exact legal names remain visible in parts. Case and cosmetic provider-name spelling variations were reconciled; unrelated capital service firms and historical exits were excluded.

## Original filings directly checked

`research/nalanda-original-evidence.json` contains extracted non-sensitive public facts and SHA256 digests for:
- Havells September: SHP_1734459_08102026053816_WEB.xml; issuer HAVELLS; reporting instant 2026-09-30; Nalanda India Equity Fund 25,536,718 shares / 4.07%.
- Ratnamani June: SHP_1691971_14072026123104_WEB.xml; reporting instant 2026-06-30; Equity Fund 2,082,858 shares / 2.97%; India Fund 2,696,804 / 3.85%.

The originals were downloaded using Python urllib, parsed with ElementTree and matched using the exact NameOfTheShareholder context. The descriptive context has a D_ prefix; its paired numeric context omits D_. Percentage decimal ratios were multiplied by 100 only after identifying ShareholdingAsAPercentageOfTotalNumberOfShares. Issuer/reporting date and quantity were checked in the matching contexts. PAN fields were neither retained nor exposed.

Only Havells and Ratnamani receive `status: primary`; all other rows receive `status: providers`. Provider agreement must not be described as an original audit. No unresolved row is presently given a fabricated value. Future conflicting/new single-source filings require reconciliation before replacing these dated records.
