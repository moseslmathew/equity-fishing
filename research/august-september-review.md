# August–September portfolio research refresh

Research cutoff: 10 October 2026. Creating agent: Codex.

## Inputs and coverage

- Reviewed the complete bundled archive, not dashboard top holdings: 22 comparisons, 42 distinct fund-month snapshots, 682 distinct equities.
- July-to-August: 20 funds. August-to-September: DSP Small Cap Fund and Nippon India Small Cap Fund only.
- Same two-fund cohort: 38 companies with additions and 21 with reductions in August; 22 and 13 respectively in September. These are company counts, not fund transactions or flows.
- Portfolio fingerprint: `fae4facb`. The existing API mismatch warning remains in place for changed runtime archives.
- A live authenticated site request was attempted but returned HTTP 403. No runtime R2 snapshot was obtained during this review. The written conclusions therefore use the checked-in archive; they must not be described as a successful live-storage verification.
- Original September AMC workbooks were previously imported with their audit in `research/september-import-audit.json`. Secondary portfolio pages retrieved during this run still displayed August; September is not independently provider-matched.

## Editorial decision

Replaced the whole report narrative and all ten company cases. The order reflects growth economics, evidence quality, cash and valuation, not a mechanical buyer-count score:

1. eClerx Services
2. Narayana Hrudayalaya
3. Kalpataru Projects International
4. Ipca Laboratories
5. Prudent Corporate Advisory Services
6. Vinati Organics
7. KPIT Technologies
8. INOX India
9. Dhoot Transmission
10. Ather Energy

The full archive was screened. Detailed external company research is concentrated on these ten; the report does not claim a full fundamental audit of all 682 companies. Existing two-section popup presentation is preserved.

## Material refreshed evidence

- Narayana: original revised Q1 presentation separates India operations from acquisition-led consolidated growth; October expansion is corroborated with secondary reporting and filing index, with the inaccessible October original disclosed.
- Ipca: original 26 September Unichem notice reports five inspection observations; neither clearance nor a sanction is presumed.
- Prudent: consultation risk for insurance distribution is separated from the larger mutual-fund business; proposed rules are not presented as enacted.
- eClerx: constant-currency growth, operating versus reported margins, and quarterly versus annual cash conversion are distinguished.
- KPIT: near-flat constant-currency revenue is distinguished from rupee growth; contract wins are not booked revenue.
- Kalpataru: recent awards and execution visibility are balanced against receivables and working capital.
- Vinati: price and currency contributions are separated from volume growth; commissioning remains guidance.
- INOX: backlog and technical certification are not treated as delivered earnings; shipment timing and valuation are central.
- Dhoot: IPO allocation, acquisition effects, missing original downloads and discrepant trailing multiples reduce confidence.
- Ather: two September VAHAN compilations differ by extraction and share the same underlying feed. Registration growth is positive but below the wider market in the retrieved compilation. Registrations are not wholesale deliveries.

## Source and calculation discipline

Per-case source URLs, source type, period, checked date and verification notes are embedded in `data/agent-research.json`. Latest retrieved institutional ownership is explicitly dated; provider percentage changes are not labelled cash flows or actual share purchases. Missing September coverage is unknown, not an exit. The same manager adding in consecutive windows is distinguished from different managers adding across months. No price target, daily price narrative, fabricated quote or numerical confidence score was added.

No application execution path was changed: opening the report loads the saved reviewed narrative, not a fresh online research agent. The request was fulfilled by a new manual research run and publication.

## Validation

`node research/verify-all-research.cjs` passed. It checks full archive coverage, all ten exact company matches, repeat additions, mixed signals, source-reference bounds, corporate-action withholding, deduplication and paginated archive discovery.

`node node_modules/typescript/bin/tsc --noEmit` passed.
