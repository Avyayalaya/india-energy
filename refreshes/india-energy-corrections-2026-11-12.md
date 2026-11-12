# India energy corrections - November 12, 2026

This revision keeps the reader-first exploration while correcting the underlying evidence, records and interactions. Reporting still covers February-May 2026; this is a correction, not a November market-data refresh.

## Reader experience

- Added three working question entries: different fuel exposure to Hormuz, refinery supplier changes, and insurance's effect on trade.
- Put mechanisms before detailed reporting and source notes.
- Replaced repeated warnings with a compact map legend and one quiet data-through date.
- Renamed Signal Cascade to **How disruption spreads**.
- Kept detailed definitions in Sources and the correction record.
- Fixed small-screen overflow and framing; controls start collapsed on phones.
- Added keyboard-operable controls, native dialogs, focus containment and Escape behavior.
- Updated the preview image and social-preview URL to this repository's current interface.

## Factual corrections

### Hormuz reporting

Removed the claim of zero transits on May 18 and 19. The [May 19 Insurance Journal/Bloomberg article](https://www.insurancejournal.com/news/international/2026/05/19/870495.htm) reports approximately 11 on Saturday May 16, eight on Sunday May 17, and three by Monday morning May 18.

Those observations are displayed with their actual windows. The partial Monday observation is not converted into a full-day total or a percentage change. Unsupported claims of 1,500 stranded vessels and under-2% tonnage were also removed.

### Insurance chronology and the vessel incident

The [May 18 Al Jazeera explainer](https://www.aljazeera.com/news/2026/5/18/iran-plans-to-offer-insurance-for-hormuz-transit-will-it-work) distinguishes the PGSA announcement from reports of the insurance proposal two days earlier. It supports Chubb participation in the US-supported $20 billion programme, but not a first-entry date. The unsupported first-reinsurer and simultaneous-entry claims were removed.

The [News24 report](https://news24online.com/world/indian-cargo-ship-haji-ali-sinks-after-suspected-drone-attack-in-strait-of-hormuz-india-calls-incident-unacceptable/836967/) supports the May 13 Haji Ali incident and 14 crew surviving. The current page uses that specific reference and does not identify a confirmed attacker.

### Refinery inventory

The complete inventory now matches [PPAC's April 1, 2026 table](https://ppac.gov.in/infrastructure/installed-refinery-capacity): **24 entries, 267.116 MMTPA**.

| Record | Previous MMTPA | Corrected MMTPA |
|---|---:|---:|
| IOCL Haldia | 7.5 | 8.0 |
| IOCL Guwahati | 1.0 | 1.2 |
| HPCL Vizag | 15.3 | 15.0 |
| ONGC Tatipaka | 0.078 | 0.066 |
| CPCL Cauvery Basin / Nagapattinam | 1.0 | 0, under capacity augmentation |
| IOCL Bongaigaon | Missing | 2.7 |

Numaligarh and Bina company labels were aligned with the cited table. Bongaigaon is included in lists and totals; a map marker is withheld until its coordinates are verified.

### Ports, terminals and refineries

Removed generic port-capacity figures that mixed refinery capacity, terminal capacity and annual throughput. Kochi no longer displays 20.5 MMTPA as one port capacity.

Dahej and Kochi retain separately labeled LNG-terminal capacities supported by [Petronet](https://www.petronetlng.in/). Connected refinery capacities are displayed as refinery measures. Port entries no longer claim current operators or operating status without supporting evidence.

### State shading

Replaced unvalidated vulnerability scores with **installed refinery capacity** derived from the same PPAC inventory. Map shading and state profiles now share one category function:

- Over 50 MMTPA.
- 10-50 MMTPA.
- Positive capacity below 10 MMTPA.
- Zero-listed or unassessed states: neutral.

The 18 profiles include Assam and have consistent refinery sums. Unsupported generation mixes, source percentages and immunity claims were removed.

### Power dispatch

Comparing the old enriched subset with the original capture revealed incorrect names, wrong row associations, fabricated zero replacements and unreliable coordinates.

Replaced that subset with **all 335 source rows across six allocation states**, from the public MERIT tables captured on April 2, 2026:

- Restored original source names instead of inferred expanded names.
- Restored listed and allocated capacities, merit ranks, variable costs and scheduled energy from the capture.
- Preserved nulls as **Not reported** and genuine numeric zeros as zero.
- Labeled the grouping **allocation state**, distinct from physical plant location.
- Removed the unreliable plant map markers. Power dispatch is now a browsable, keyboard-accessible state list and detail view.

The capture date identifies the extract; it does not establish a common observation date for every row. The original state-specific source tables are linked from each record's detail.

## Unsupported precision removed

The correction removes numerical claims that could not be tied to a supporting dated source:

- Daily Brent, freight, insurance and other financial-market series, including the contradictory Day 30 values.
- The 16 expanded numeric signals and the unverified prediction-market contract history.
- Route-level volumes, calculated crisis multipliers and exact transit times.
- Refinery source-share percentages and Hormuz-exposure percentages.
- Conflicting oil-import dependency and reserve-cover comparisons.
- Exact scenario yield losses, price effects, GDP effects and fixed propagation delays.

Four explanatory cards remain: oil prices, Hormuz passage, shipping and insurance. The map retains 39 schematic supply connections with equal-width arcs. These connections describe the geography of possible supply chains rather than identifying individual cargo contracts.

The event selector now uses four supported dates and a separate conditional scenario. Dates, cards and open signal details all use the same event definition.

## Implementation fixes

- Open signal details update when the selected event changes.
- State colors and displayed capacity bands come from the same underlying records.
- Facility values use distinct labels and units.
- Null and zero handling is explicit.
- Route selection opens a readable detail rather than leaving the previous panel unchanged.
- LNG and coal supplier-change explanations preserve the selected fuel instead of switching readers into an oil-only journey.
- Map attribution for OpenStreetMap and CARTO is visible above the map controls.
- The Share action updates its own button rather than whichever content action appears first.
- The README, source list, preview and data counts match the corrected page.
- Added dependency-free data regression tests at `tests/data-integrity.cjs`.

## Sources and historical material

Broken, soft-404, unrelated redirect and wrong-period references were removed from the current source list. The correction retains specific claim-supporting references rather than treating a working URL as validation.

Earlier archive pages and refresh notes remain unchanged as historical material. Their superseded claims are not carried into the current page.

## Quality Check

- Checked every refinery capacity against the transcribed April 1 PPAC table and its 267.116 MMTPA total.
- Compared all 335 displayed dispatch records with the original six captured source tables.
- Checked state sums, source exclusions, zero/null handling and timeline structure with `node tests/data-integrity.cjs`.
- Exercised reader questions, route/facility selection, allocation-state lists, event/detail synchronization, keyboard controls and dialog focus in Microsoft Edge.
- Checked widths of 320, 390, 768, 1024, 1280, 1440 and 1920 pixels for document/panel overflow and map attribution.
- Exercised actual arc-color accessors and checked browser errors; a migration rendering issue was found and corrected before the final pass.

These checks cover the corrected records and interactions. Schematic connection pairs and retained facility coordinates have not been independently geospatially certified. No new exact claim is made for market data that could not be verified.
