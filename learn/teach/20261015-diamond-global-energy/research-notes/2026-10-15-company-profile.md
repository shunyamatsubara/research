<!-- Research digest saved on 2026-10-15 from a background research agent (company profile).
     Treat everything here as leads with sources.
     Checked directly by Claude on 2026-10-15: the DGI→DGE rename and address (GLEIF API record);
     Tokyo Gas and Toho Gas deal terms, including Ex-Ship delivery (text of their press releases);
     the MC Global Gas → DGI Cameron FOB contract (text of the DOE filing).
     Agreed by two independent agents but not opened by Claude: MC's description of DGE, the JERA
     and Tohoku Electric deals, Cameron ≈4 Mt/yr. Re-check anything else before teaching it. -->

**Diamond Global Energy Pte. Ltd. (DGE), formerly Diamond Gas International Pte. Ltd. (DGI): research brief, 2026-10-15**

How I got the sources: mitsubishicorp.com and spglobal.com return HTTP 403 to direct requests, so I read the MC pages through the r.jina.ai reader (the text is MC's own). S&P items are titles or snippets only, marked "snippet". The search budget ran out near the end.

**Fact sheet**

*Registry (secondary sources derived from ACRA)*
- UEN 201323623E; registered 2 Sep 2013; status "Live Company"; private company limited by shares. Registered office: 1 Temasek Avenue #17-03 Millenia Tower, Singapore 039192. SSIC 46610, with the activity described as "LIQUIFIED NATURAL GAS TRADING HUB FOR RELATED COMPANIES". Source: https://acrawatch.sg/company/diamond-global-energy-pte-ltd (data.gov.sg import, about May 2026). OpenCorporates still shows the old name: https://opencorporates.com/companies/sg/201323623E. sgpgrid.com is behind Cloudflare, but its search snippet now shows DIAMOND GLOBAL ENERGY PTE. LTD. **High**
- LEI 254900YEU05SFCYLUW25, from GLEIF:
  - Legal name DIAMOND GLOBAL ENERGY PTE. LTD.; PREVIOUS_LEGAL_NAME DIAMOND GAS INTERNATIONAL PTE. LTD.
  - CHANGE_LEGAL_NAME event **effective 2026-03-15**, recorded 2026-03-18, supported by documents.
  - Registered with ACRA as 201323623E.
  - Direct and ultimate parent: Mitsubishi Corporation.
  - Record status FULLY_CORROBORATED; last updated 2026-07-01.
  - https://api.gleif.org/api/v1/lei-records/254900YEU05SFCYLUW25 (also /field-modifications). **High**
- RecordOwl: "formerly known as Diamond Gas International"; logs a "Company Name changed" event on **10 May 2026**; annual return 15 Sep 2025; financial year ends in March; auditor Deloitte & Touche LLP. Capital figures conflict (S$61.92m paid-up versus shares listed as "USD 140,000,000"). https://recordowl.com/company/diamond-gas-international-pte-ltd **Low–Medium**
- Ownership: "Shareholder: Mitsubishi Corporation (100%)", "Established: Sep/2013", "Head Office: Singapore". Tokyo Gas, 2018-10-10: https://www.tokyo-gas.co.jp/Press_e/20181010-01e.pdf **High**
- LinkedIn lists 51–200 employees, with 94 members linked. The About text still says "DGI" in one place. https://sg.linkedin.com/company/diamondglobalenergy **Medium**

*MC official text (verbatim)*
- Energy & Power Solution Group page, "Business Investments", under the **Energy Business Development & Marketing Division**:
  - On DGE: "Based in Singapore, Diamond Global Energy Pte. Ltd. is engaged in the marketing of LNG produced by Mitsubishi Corporation-affiliated projects in the United States and Canada, as well as LNG sales optimization and short-term trading."
  - On Diamond LNG Canada Ltd. (DLC): "Through a Canadian subsidiary, we have invested in and participated in the LNG Canada Project in British Columbia. The company also procures feed gas for the project and offtakes LNG produced by LNG Canada."
  - The division covers "new business development, marketing, optimization and trading… as well as… the LNG carrier business".
  - On Cameron, MC has "tolling capacity equivalent to one liquefaction train… approximately 4 million tons of LNG annually".
  - https://www.mitsubishicorp.com/jp/en/about/business-group/energy-power-solution/ (undated) **High**
- MC Singapore page, "MC Singapore Offices and Subsidiaries (as of April 1, 2026)": "Diamond Global Energy Pte Ltd | LNG Sales & Trading". https://www.mitsubishicorp.com/sg/en/bg/ **High**. The /sg/en/about/profile.html page does not mention DGE or DGI.
- Earlier MC wording:
  - DGI is "MC's wholly owned subsidiary for global LNG marketing, based in Singapore" (2016-01-20): https://www.mitsubishicorp.com/jp/en/news/release/2016/0000029226.html
  - MC's 15% of LNG Canada, "(approximately 2.1 mtpa)", goes to Asia "with Japan as the primary destination, through… Diamond Gas International Pte. Ltd." (2025-07-01): https://www.mitsubishicorp.com/jp/en/news/release/2025/20250701001.html
  - **High**

*How the company describes itself*
- MyCareersFuture employer profile, synced 2026-09-22: "Diamond Global Energy Pte. Ltd. (DGE) is a wholly owned subsidiary of Mitsubishi Corporation which specializes in Marketing, Trading and Shipping of LNG. As a marketing arm of all the equity LNG which Mitsubishi Corporation will be entitled to, DGE is also aggressively working to find new markets for LNG." https://api.mycareersfuture.gov.sg/v2/companies/201323623E **High**
- LNG2026 exhibitor profile (Doha, 2–5 Feb 2026, stand 4310): "DGI is responsible for marketing LNG from MC's U.S. and Canadian LNG projects, optimizing LNG sales portfolios, and engaging in short- to mid-term LNG trading. The company also manages commercial contracts, oversees execution, and ensures smooth delivery operations. Serving a broad global customer base—from major Japanese utilities to international trading firms…" https://lng2026.com/exhibitors/diamond-gas-international-pte- (the "-dgi" URL now returns 404). **High**

*Volumes and deals*
- LNG Canada: DGI offtakes 2.1 mtpa. Three heads of agreement (HOAs):
  - Tokyo Gas: up to 0.6 mtpa, Apr 2026–Mar 2039, ex-ship (Tokyo Gas PDF above).
  - Toho Gas: about 0.3 mtpa, 15 years from FY2024: https://www.tohogas.co.jp/lang-n/en/corporate/press/__icsFiles/afieldfile/2018/10/10/20181010_1.pdf
  - JERA: about 1.2 mtpa (16 cargoes), about 15 years from FY2024, DES: https://www.jera.co.jp/en/news/information/20190409_338
  - Together these equal 2.1 mtpa (my arithmetic). **High.** I found nothing showing they were converted to SPAs.
- Cameron LNG:
  - Toho Gas SPA, 2016-06-06: 19 years from 2019, about 0.2 mtpa, priced against US gas, ex-ship: https://www.tohogas.co.jp/lang-n/en/corporate/press/__icsFiles/afieldfile/2016/06/06/20160606.pdf
  - Tokyo Gas: 19 years from 2020, about 0.2 mtpa (Tokyo Gas PDF above).
  - Tohoku Electric: up to about 0.2 mtpa, 18 years from 2022, DES: https://offshore-energy.biz/2019/10/17/tohoku-secures-cameron-lng-volumes
  - **High/Medium**
- Supply from outside North America: binding SPA with Santos (Dec 2020) for 1.5 mtpa of Barossa LNG over 10 years plus extension options, priced on JKM. https://www.santos.com/news/santos-and-mitsubishi-sign-spa-for-barossa-lng-supply/ **High**
- Carbon-neutral cargoes went to Toho Gas (Apr 2021) and Japex (Oct 2021). https://lngprime.com/lng-terminals/japans-toho-gas-gets-first-carbon-neutral-lng-cargo/17221/ ; https://lngprime.com/asia/japex-gets-carbon-neutral-lng-cargo-at-soma-terminal/30838/ **Medium-High**
- Trading:
  - Platts subscriber notes, titles only: "Diamond Gas to join Asia JKM LNG physical MOC" (Jul 2018) and "…to join EMEA - LNG - Physical MOC" (Oct 2020). https://www.spglobal.com/platts/en/our-methodology/subscriber-notes/070518-diamond-gas-to-join-asia-jkm-lng-physical-moc
  - On 2026-02-16 DGI placed its first-ever Atlantic MOC bids: one-cancels-the-other (OCO), Northwest Europe/Mediterranean, 3.5 TBtu, for Mar 10–12 delivery. They closed at TTF Mar −$1.50/MMBtu and TTF Apr −$1.20/MMBtu. https://www.hellenicshippingnews.com/dgi-bids-first-ever-cargoes-in-atlantic-lng-moc/ (2026-02-18, Platts content)
  - **Medium-High**
- Shipping (long-term time charters to DGI/DGE):
  - Diamond LNG Shipping 3 vessel: about 19 years from 2019, Cameron (https://www.mitsubishicorp.com/jp/en/news/release/2016/0000031702.html).
  - Diamond Gas Crystal: delivered 2021-05-31, 18-year charter (https://www.nyk.com/english/news/2021/20210601_02.html).
  - Diamond Gas Victoria: delivered 2021-07-28 (https://www.nyk.com/english/news/2021/20210729_01.html).
  - K Line newbuild: 15 years plus a 10-year option, signed 2023-05-12 (https://www.kline.co.jp/en/news/lng/lng-20230515.html). Named **DIAMOND GAS JADE** on 2026-05-19 for LNG Canada (https://www.ajot.com/news/newly-built-lng-vessel-for-diamond-global-energy-named-diamond-gas-jade).
  - **DIAMOND GAS NEXUS**: 174k m³, named 2026-09-18, mainly for Cameron (https://www.nyk.com/english/news/2026/20260925_03.html).
  - **High**
- Systems: Publicis Sapient completed "a new ETRM system implementation" for MC Global Gas Corp. (Houston) and DGI for the Cameron value chain. Product not named. 2018-10-24: https://www.publicissapient.com/company/news/Publicis-Sapient-MC-Global-Gas-Corporation-and-Diamond-Gas-International-Collaborate-to-Deliver-ETRM-platform-for-LNG-Business **High**

*Leadership (public roles only)*
- Tetsuro Wada, CEO of DGE (May and Sep 2026; AJOT and NYK above). **High**
- Takuji Konzo, CEO of DGI (Reuters, 2024-11-07): https://sg.finance.yahoo.com/news/1-diamond-gas-international-expects-065913404.html **High**. A conference bio says "since April 2024", but I saw it only as a snippet. **Low**
- Takeshi Matsushita, Chairman & CEO, and Takeshi Noma, President & COO (K Line, May 2023). **High**
- Gen Kunihiro, President & COO (Santos, Dec 2020). **High**
- Ryosuke Tsugaru, CEO (Tokyo Gas, Oct 2018). **High**
- Tadashi Hara, EVP and Branch Manager of the "DGI Japan Branch" (2025 speaker page): https://www.japanenergyevent.com/speaker-collection/previous-strategic-speakers/tadashi-hara/ **Medium**

*Hiring signals (MyCareersFuture; all closed; UEN 201323623E)*
- GM, Delivery Management, Long-Term Contracts Management (LTCM). Posted 2026-06-04, S$18–21k/month. Reports to the SVP of LTCM. The posting says the "buyer portfolio will increasingly become Japan oriented". https://www.mycareersfuture.gov.sg/job/wholesale-trade/general-manager-delivery-management-long-term-contracts-management-diamond-global-energy-649c51aa4833e6c800fc3e043e1812f1
- AM, Commercial, LTCM. Posted 2026-06-11, S$14–17k. Asks for knowledge of NAESB contracts, tolling agreements and long-term SPAs, Excel value-chain models, contract administration, and dealing with Japanese and Singapore tax authorities. https://www.mycareersfuture.gov.sg/job/wholesale-trade/assistant-manager-commercial-long-term-contracts-management-diamond-global-energy-95995195529d0d56d84c6aae292220d2
- CFO. Posted 2026-07-08, S$20–25k. Covers commodity-price and credit-risk hedging, and says: "Drive the integration and optimization of finance processes and systems, including ERP and trading/ETRM platforms". https://www.mycareersfuture.gov.sg/job/others/chief-financial-officer-diamond-global-energy-b9de4d433a3d319cbf1ee94b13a16821
- Trading Analyst. Posted 2026-08-18, S$14–17k. Asks for "VBA, and Python", options pricing, and freight models. https://www.mycareersfuture.gov.sg/job/others/trading-analyst-diamond-global-energy-d340c368868c24161f758505b52de42e
- VP, Trading & Optimization. Posted 2026-09-07, S$19–25k. Leads spot and short-term trading. https://www.mycareersfuture.gov.sg/job/others/vice-president-trading-optimization-diamond-global-energy-1787092d210e3799f3668e19b4670b5e
- All five require Japanese. Endur, Allegro, Power BI and named CTRM products: **not found**. Nothing was open on 2026-10-15. **High**

**Timeline**
- 2013-09-02: Incorporated as DGI (GLEIF/ACRA).
- 2015-04-23: Toho Gas Cameron HOA (SPA 2016-06-06).
- 2018-10: Tokyo Gas and Toho Gas LNG Canada HOAs; ETRM goes live.
- 2019-04-09: JERA HOA. 2020-12: Santos SPA.
- 2023-11-15: DGI's 10th anniversary. S&P reported an expected portfolio of about 10 mtpa (snippet: https://www.spglobal.com/commodity-insights/en/news-research/latest-news/lng/111623-mitsubishis-dgi-expects-cameron-lng-expansion-fid-and-lng-canada-startup-in-2024). **Low**
- 2024-07-03: Pakistan's competition regulator clears an LNG-procurement right for "Diamond Gas International Japan Co. Ltd", attached to its sale of Tabeer Energy: https://cc.gov.pk/home/viewpressreleases/508
- 2024-11-07: CEO Konzo speaks at the FT Commodities Asia Summit (Reuters).
- 2025-06-30: First LNG Canada cargo. MC's share is marketed through DGI.
- 2026-02-02 to 05: Exhibits at LNG2026 as DGI.
- 2026-02-16: First Atlantic MOC bids.
- 2026-03-15: Name change effective (GLEIF).
- 2026-04-01: MC Singapore lists DGE.
- 2026-04-15: Platts note "Diamond Gas International Pte. Ltd. changes entity name to Diamond Global Energy Pte. Ltd." The snippet says DGE asked to join the APAC LNG physical and paper MOCs and the Atlantic physical MOC. https://www.spglobal.com/energy/en/pricing-benchmarks/our-methodology/subscriber-notes/041526-diamond-gas-international-pte-ltd-changes-entity-name-to-diamond-global-energy-pte-ltd
- 2026-05-19: DIAMOND GAS JADE named.
- 2026-09-18: DIAMOND GAS NEXUS named.
- 2026-09-29: MC takes FID on the LNG Canada expansion, adding 2.1 mtpa for MC from the early 2030s (4.2 mtpa in total). The release does not name DGE. https://www.mitsubishicorp.com/jp/en/news/release/2026/20260929001.html

**Name question**
DGI → DGE is a **rename of the same Singapore legal entity**, effective **15 March 2026** according to GLEIF. It is not a new or separate company. The evidence:
- The UEN 201323623E, the LEI and the address are the same under both names.
- GLEIF lists DGI as PREVIOUS_LEGAL_NAME and records a CHANGE_LEGAL_NAME event.
- The data.gov.sg-derived registry shows the new name under the same UEN.
- The Platts note title and RecordOwl's "formerly known as" line say the same.
- The MyCareersFuture employer under that UEN is DGE.
- Every source before mid-March 2026 says DGI (LNG2026, Feb 2026; Platts, 18 Feb 2026), and every source from April 2026 on says DGE.

RecordOwl's "10 May 2026" is probably when its data picked up the change. BizFile+ would give ACRA's filing date.

Separate entities not to confuse with DGE:
- Diamond Gas International Japan Co. Ltd. (Tokyo, named by Pakistan's competition regulator). How it relates to the "DGI Japan Branch" is unclear.
- Diamond LNG Canada Ltd.
- Diamond LNG Shipping 3, 5 and 6 Pte. Ltd. (ship-owning joint ventures).
- MC Global Gas Corp.
- Diamond Gas MidOcean, in which NYK is taking 87.4%: https://www.bairdmaritime.com/amp/story/shipping/tankers/gas/nyk-ties-up-with-compatriot-mitsubishi-in-221m-lng-push (Reuters, 2026-07-30)

**Best sources (ranked)**
1. GLEIF: previous name, rename date, parent. https://api.gleif.org/api/v1/lei-records/254900YEU05SFCYLUW25
2. MC: official role and division. https://www.mitsubishicorp.com/jp/en/about/business-group/energy-power-solution/
3. MC Singapore list as of 2026-04-01. https://www.mitsubishicorp.com/sg/en/bg/
4. Tokyo Gas 2018: DGI profile, CEO, contract terms. https://www.tokyo-gas.co.jp/Press_e/20181010-01e.pdf
5. NYK 2026: current CEO, charter. https://www.nyk.com/english/news/2026/20260925_03.html
6. JERA, Toho Gas, Santos: volumes and terms (above).
7. MyCareersFuture: self-description, 2026 jobs. https://api.mycareersfuture.gov.sg/v2/companies/201323623E
8. ACRA Watch (data.gov.sg): registry fields. https://acrawatch.sg/company/diamond-global-energy-pte-ltd
9. Platts via Hellenic: MOC trading. https://www.hellenicshippingnews.com/dgi-bids-first-ever-cargoes-in-atlantic-lng-moc/
10. LNG2026: latest self-description as DGI. https://lng2026.com/exhibitors/diamond-gas-international-pte-

**Unknowns**
- ACRA's filing date for the rename (only GLEIF's effective date is known).
- Directors and shareholders (aggregators require a login).
- Financials. The capital figures conflict.
- Current portfolio size in mtpa and trading volumes.
- Whether the HOAs became SPAs, and whether Tokyo Gas deliveries started in Apr 2026.
- Whether Barossa supply to DGI has started.
- The name of the ETRM/CTRM product, and any use of Endur, Allegro or Power BI.
- Any spot tender wins.
- When Tetsuro Wada started as CEO.
- The Japan Branch's name after the rename.
