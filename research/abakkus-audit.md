# Abakkus disclosed holdings audit — 11 October 2026

Scope: publicly identifiable AIF/investment-vehicle positions associated with Abakkus, not Sunil Singhania's personal portfolio. Abakkus Mutual Fund scheme positions were excluded. No completeness claim for private funds, PMS clients, unlisted investments or holdings below named-shareholder disclosure thresholds.

## Coverage and evidence

30 company records: 3 original NSE filings checked, 23 provider-cross-checked records, and 4 review records with stake and shares withheld. Each row contains observations from at least two independent publishing domains; two websites may ultimately ingest the same exchange disclosure, so this is corroboration across publishers, not two independently audited ownership registers.

Discovery reviewed Trendlyne's September Abakkus Fund portfolio, Block.deal's Emerging Opportunities Fund-1, Growth Fund-2 and Diversified Alpha profiles, Inve's Emerging Opportunities Fund-1 history, Stocks Sena's Four2Eight profile, and targeted searches for Venture Opportunities, Growth Fund Open Ended and Alpha Fund-2. Confirmed records cover Emerging Opportunities Fund-1, Growth Fund-2, Growth Fund Open Ended, Diversified Alpha and Four2Eight. Older Growth Fund-1 and Diversified Alpha Fund-2 records lack corroborated current-period disclosure and were not silently carried forward. Latest quarter portfolio-page titles do not establish that every row is September.

Three original XML files were downloaded with plain urllib, parsed and matched for company, registered holder, report date, issued-share ownership percentage and share quantity. SHA256 evidence is in abakkus-primary-evidence.json; raw original snapshots are abakkus-carysil.xml, abakkus-jkumar.xml and abakkus-anup.xml. Web retrieval could not render application/xml, but direct original retrieval succeeded. Carysil September 30: Emerging Opportunities Fund-1, 1,519,981 shares, 5.34%; J. Kumar September 30: Growth Fund-2, 1,873,547 shares, 2.48%; Anup June 30: Emerging Opportunities Fund-1, 715,229 shares, 3.57%. Anup fully diluted ownership is 3.54%, distinct from 3.57% issued-share ownership; issued-share basis is displayed.

Emerging Opportunities rows were checked against exact Block.deal percentage/count and Inve exact percentages; Trendlyne independently corroborates counts but rounds investor-page percentages. Growth and Alpha rows additionally link the company-specific dated Trendlyne tables with precise percentages and counts. Aye Finance percentage has multiple publishers but exact share quantity is only one source, so shares are null. All Time Plastics remains dated June 30, where exact 6.16% / 4,032,258 shares are corroborated by Canara Securities and Block.deal; a lone September observation is described without changing the row's date.

Rupa combines same-date Fund-1 1.64% / 1,306,744 shares and Growth Fund-2 1.78% / 1,418,347 shares: arithmetic total 3.42% / 2,725,091 shares. Hindware combines Growth Fund-2 1.46% / 1,223,319 and Open Ended 1.00% / 840,000: total 2.46% / 2,063,319. Breakdown parts are retained. Old Growth Fund-1 positions are excluded, and percentages are not portfolio weights.

## Withheld records

- Suven: latest July 8 provider row differs from June on both count and denominator; second same-date confirmation absent.
- Caliber: Stocks Sena history labels 3.55% as September but page overall label July; Value Research precise value lacks date in retrieved excerpt; Investing July reports different manager-level basis. No current headline inferred.
- Dhabriya: transcribed July 24 SAST declaration says July 23 acquisition of 601,341 shares and 5.56%; Moneycontrol gives same shares with 5.55%. Direct BSE PDF returned 403. Historical purchase is not assumed to remain held today.
- Credent: ET RHP/pre-IPO 1.21% and MC anchor-inclusive 2.26% are different share-capital/allocation bases; final post-allotment quantity and denominator not reconciled. Anchor-book percentage is not company ownership.

Other discovered but omitted candidates: SRIT and Adroit have manager-level and scheme-labelled provider records not independently reconciled; Bai-Kakaji and Anawil have recent purchases/anchor allocations but these alone do not prove current holdings. These are declared omissions, not presumed exits. A complete private portfolio cannot be reconstructed from public threshold disclosures.

Sources and individual observations are stored in data/abakkus.json. No market-value sums or performance inference were generated. Check date is 11 October; record dates remain as individually disclosed.
