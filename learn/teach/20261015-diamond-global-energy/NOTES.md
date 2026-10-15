# Notes

## About the learner
- Engineer / data scientist at MCD3 (Mitsubishi Corporation's AI and digital company, formed July 2025).
- DGE is already a client; the project is running.
- Project: phase 1 market and geopolitical monitoring → early risk-signal detection → credit risk management.
- New to LNG (said on 2026-10-15).
- Deadline: ready within one week (about 2026-10-22).

## Preferences
- Plain English, with words a non-native speaker knows. Concise, but no abbreviations that confuse.
- If the learner's English is unnatural, first show a natural version, then answer.
- Lessons in plain English (chosen 2026-10-15), not Japanese.

## Teaching decisions (provisional)
- Workspace is `learn/teach/20261015-diamond-global-energy/`, not the repo root, because the repo holds other learning projects (see `learn/slides/`). Same reason as the earlier slides project: the learner opens files in the app.
- Lessons, references and the hub page are published together as one private Artifact ("DGE Field Guide"): https://claude.ai/artifact/6oSqSE3Q45KQNtqxFb2t3g (first published 2026-10-15). Republish to this same URL for each new lesson: pass it as `url`, with `index.html` as the page and every lesson, reference and asset in `files`. `index.html` has no doctype or head (the Artifact publish adds them); every other HTML file is a full document.
- Quizzes save nothing: they start fresh on each visit (retrieval practice). The learner copies the result and pastes it into the chat; use it as evidence for learning records.
- Course frame, used in every lesson: **event → impact channel → DGE's spread**. The four impact channels are price, volume, shipping and credit.
- Plan: L1 the chain and how DGE makes money; L2 DGE's pressures in 2026 and the signals that warn of them; L3 credit risk in LNG and early warning signs.

## Context found on 2026-10-15 (see research-notes/)
- 2026 is unusual: war closed the Strait of Hormuz from the end of February (≈20% of world LNG). Asian spot LNG averaged $17.5 in Q2 while Henry Hub averaged $2.95 (IEA Q3-2026). DGE's spread is wide now; the glut is postponed to about 2028–30 (JKM forward for 2029 ≈ $9.08 vs new US contract cost $7.39–7.77 before shipping).
- DGE = renamed DGI (15 Mar 2026). Buys Cameron LNG FOB from MC Global Gas (≈4 Mt/yr, 20-year contract); markets MC's 2.1 Mt/yr from LNG Canada (+2.1 from the early 2030s). Long-term sales to JERA, Tokyo Gas, Toho Gas, Tohoku Electric are delivered Ex-Ship, so DGE carries shipping risk.

## Plan for the next lessons
- **Lesson 2, DGE's Pressures in 2026.** Open with spaced recall of Lesson 1 (channels, $3.4m rule, spread). Then five pressures, each with evidence, channel, direction and the signals a monitoring system could watch: (1) the postponed glut and the fixed fee; (2) price volatility between Henry Hub and JKM; (3) fragile, price-sensitive Asian demand and China's tariff on US LNG; (4) shipping routes (Panama, Cape, Red Sea, Hormuz) and freight swings against long-term charters; (5) crowded market of portfolio sellers. Practice: one event, several channels, with direction (the Hormuz case: price up is good for free cargoes, freight up, buyers stressed). Build a reference "signal map".
- **Lesson 3, Who Might Not Pay.** Cargo value (3.4m MMBtu × $17.5 ≈ $60m), how exposure builds (delivery before payment; long-term contract replacement cost), protections (letters of credit, guarantees, limits), force majeure chains (DLA Piper), early-warning signals. Needs new high-trust sources first.
- Before Lesson 2: read the learner's quiz result and teach-back; write learning records from them.

## Term decisions (use these words everywhere)
- **impact channel**: the way an event reaches DGE's money. Four channels: price, volume, shipping, credit. Avoid "risk bucket", "risk type".
- **credit risk**: the risk that the other side of a deal does not pay or does not do what the contract says. Avoid "counterparty risk" in lessons (harder word); mention it once as an alias.
- **spread**: sale price minus all costs, per MMBtu. Avoid "margin" except when quoting a source.
- **cargo**: one shipload of LNG, about 3.4 million MMBtu.
- **MC**: Mitsubishi Corporation. **DGE**: Diamond Global Energy.

## GLOSSARY.md
- Not created yet. Promote terms only after the learner uses them correctly (quiz result, teach-back or chat).
