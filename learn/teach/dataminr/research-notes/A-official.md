# A. Dataminr: what the company officially says its products can do (fact base, 2025-2026)

Prepared 2026-10-15 for a lesson on Dataminr's capabilities, limits, and why it is more than "a scheduled LLM agent that searches the web".

## How to read this file

- **PRIMARY** means the source is Dataminr itself: dataminr.com pages, Dataminr press releases (including word-for-word syndicated copies), Dataminr PDFs, and listings or apps published by "Dataminr, Inc.".
- **INDEPENDENT** means anyone else: news media, Wikipedia, government procurement records, third-party integration docs. Partners and resellers are marked **INDEPENDENT (partner)** because they have a commercial interest.
- "**Dataminr says**" marks a self-reported or marketing claim. "**Independently confirmed**" is used only when a non-Dataminr source states the same fact.
- Dates are publication dates when known. Otherwise they read "page accessed 2026-10-15".
- **Quote fidelity.** Web pages were read with a fetch tool that extracts page text. I asked it for verbatim text, but small transcription differences are possible. PDF quotes were extracted directly with `pdftotext`, with line breaks collapsed. Quotes are 25 words or fewer, and "..." marks an omission. Text marked "(paraphrase)" is not a verbatim quote.
- **Gaps.** web.archive.org could not be fetched, so archived Pulse pages are unavailable. Several pages returned HTTP 403; they are noted where relevant. The web-search budget ran out near the end, so a few leads were not opened and are marked **unverified**. These include the original Intercept articles, G2 reviews, and the GovConWire article on the deal closing.

---

## 0. Ten-line summary (all detail and sources below)

1. Dataminr (founded 2009, New York) calls itself "the global leader in AI-powered real-time event, threat & risk intelligence" ([/company](https://www.dataminr.com/company)).
2. The 2026 lineup is AI Platform, Dataminr for Corporate Security ("Advanced"), Dataminr for Cyber Defense (built on ThreatConnect), First Alert / First Alert Advanced (public sector), and Dataminr for News. The "Pulse" brand appears to be legacy.
3. The core claim is continuous detection from "1M+" public sources (text in 150+ languages, images, video, audio, sensors, deep/dark web) using 50 to 60+ proprietary LLMs. Dataminr says these are deliberately not frontier models.
4. Generative and agentic layers sit on top of detection: ReGenAI live briefs (2024), Intel Agents (2025), and "Autonomous Real-Time Intelligence" with corroboration, context, and "predictive intelligence" (2026).
5. An alert is a short headline with source attribution, location, priority, topic/watchlist matches, and optional Live Brief or Intel Agent summaries. Two independent integration docs name the priority levels Flash, Urgent, and Alert. Alerts reach users via web, mobile, email, API, Teams, Splunk, XSOAR, Elastic, Palantir Foundry, and other tools.
6. Humans remain in the loop. Dataminr's Chief AI Officer says the models alert on "99%" of what Dataminr alerts on, and human experts handle "nuanced and tricky" events.
7. Money and deals in 2025-26: $85M (Mar 2025) and $100M (Apr 2025) of convertible/credit financing, then a "$300 million" financing (Sep 2025). ThreatConnect was bought for $290M (announced Oct 2025, closed 2025). A $318M, 5-year U.S. Department of War contract was awarded Aug 2026 and is independently confirmed by DefenseScoop.
8. No public price list exists. The AWS Marketplace listing is "Private Offers ONLY". Independent price points include FDNY's $75,399 First Alert license renewal (2026).
9. Japan: no Japanese-language Dataminr site or named Japanese customer was found. The only reseller found is NEC Networks & System Integration (NESIC), reported in 2022.
10. Most speed and accuracy figures are self-reported, for example "99.5% accuracy" for ReGenAI briefs and "15 minutes before mainstream news". No independent benchmark was found.

---

## 1. Company overview

### 1.1 One-line self-description
| Claim | Exact quote | Source | Date | Type |
|---|---|---|---|---|
| Self-description | "Dataminr is the global leader in AI-powered real-time event, threat & risk intelligence." | https://www.dataminr.com/company | page accessed 2026-10-15 | PRIMARY |
| Homepage headline | "AI-Powered Real-Time Event, Threat & Risk Intelligence" | https://www.dataminr.com/ | page accessed 2026-10-15 | PRIMARY |
| Homepage "About" blurb | "Dataminr's AI platform delivers the earliest warnings on high impact events and critical information far in advance of other sources." | https://www.dataminr.com/ | page accessed 2026-10-15 | PRIMARY |
| Press boilerplate | "The company delivers the earliest actionable intelligence on breaking events, emerging threats, and unexpected risks" | https://www.dataminr.com/press/announcement/dataminr-launches-first-alert-advanced-awarded-dow-contract/ | 2026-08-26 | PRIMARY |
| Tagline | "Clarity for a World in Motion" | https://www.dataminr.com/company | page accessed 2026-10-15 | PRIMARY |
| Neutral description | "Dataminr is an artificial intelligence company." | https://en.wikipedia.org/wiki/Dataminr | page accessed 2026-10-15 | INDEPENDENT |

### 1.2 Founding year and founders (independently confirmed)
- Dataminr says: "Since founding Dataminr in 2009, Ted has transformed the company into a world leading AI business". Source: https://www.dataminr.com/company/leadership (page accessed 2026-10-15). PRIMARY.
- Dataminr says: "Jeff Kinsey is a co-founder of and Chief Technology Officer at Dataminr." Same page. PRIMARY.
- Independent: "Dataminr was founded in 2009 by Yale University graduates Ted Bailey, Sam Hendel and Jeff Kinsey." Source: https://en.wikipedia.org/wiki/Dataminr (page accessed 2026-10-15). INDEPENDENT.

### 1.3 Headquarters and offices
- The careers page labels New York, NY as "United States HQ". The other offices listed are Arlington, VA; London; Dublin; Melbourne; and Cluj-Napoca. Source: https://www.dataminr.com/careers (page accessed 2026-10-15). PRIMARY.
- Site footer: "Dataminr is one of New York's top private technology companies, with employees across six global offices." Source: https://www.dataminr.com/company (page accessed 2026-10-15). PRIMARY.
- Independent: "Dataminr employs around 800 people and is headquartered in New York." The Wikipedia infobox gives HQ as "Manhattan, New York, U.S." Source: https://en.wikipedia.org/wiki/Dataminr (page accessed 2026-10-15). INDEPENDENT.
- Inference (not stated by Dataminr): the Arlington, VA office probably came with ThreatConnect, which Wikipedia describes as "based in Arlington, Virginia". Source: https://en.wikipedia.org/wiki/ThreatConnect (page accessed 2026-10-15). INDEPENDENT.

### 1.4 Employees
- Current headcount is **unverified**. No figure appears on the 2026 site.
- Dataminr said in April 2024: "approximately 800 employees" (boilerplate). Source: https://www.dataminr.com/press/dataminr-unveils-regenai-the-first-generative-ai-that-automatically-regenerates-in-real-time/ (2024-04-18). PRIMARY.
- Independent, 2023 layoff: "about 20% of staff today, or around 150 people". Source: https://techcrunch.com/?p=2634540 (TechCrunch, 2023-11-28). INDEPENDENT.
- Dataminr said ThreatConnect would add "ThreatConnect's amazing 170-person mission-oriented team". Source: https://www.dataminr.com/press/announcement/dataminr-to-acquire-threatconnect/ (2025-10-21). PRIMARY.
- Inconsistency: the Wikipedia infobox says "1050+ (2022)", but its body text says "around 800 people". INDEPENDENT.

### 1.5 Customer counts and types (all "Dataminr says" unless noted)
| Claim | Exact quote | Source | Date | Type |
|---|---|---|---|---|
| Enterprise and government reach | "More than two-thirds of the Fortune 50, half of the Fortune 100, 100+ U.S. government agencies" | https://www.dataminr.com/press/announcement/dataminr-launches-first-alert-advanced-awarded-dow-contract/ | 2026-08-26 | PRIMARY |
| International governments | "20+ international governments" | https://www.dataminr.com/ | page accessed 2026-10-15 | PRIMARY |
| People and facilities covered | "14M+ employees protected across 1.1M+ client facilities worldwide." | https://www.dataminr.com/company/customers | page accessed 2026-10-15 | PRIMARY |
| Contradiction on the same page | "Half of the Fortune 50, the United Nations, and leading organizations worldwide rely on Dataminr" (other text on the page says "two-thirds") | https://www.dataminr.com/company/customers | page accessed 2026-10-15 | PRIMARY |
| Militaries | "The product is relied on by the militaries of 18 different nations across the world, including 15 NATO member nations." | DoW/First Alert Advanced release (URL above) | 2026-08-26 | PRIMARY |
| U.S. public sector | "First Alert is also relied on by over 100 government organizations across the U.S. federal, state, and local markets." | same | 2026-08-26 | PRIMARY |
| Named U.S. government users | "including the Department of Homeland Security, State Department, Department of Justice, Congress" | same | 2026-08-26 | PRIMARY |
| First Alert scale (2024 sheet) | "200+ Organizations ... 150K+ Users ... 190+ Countries & Territories" (layout-extracted PDF) | https://www.dataminr.com/dataminr-solutionsheet-firstalert-digital (PDF, created 2024-11-20) | 2024 | PRIMARY |
| Corporate customers (2024) | "Dataminr Pulse for Corporate Security is relied on by over 500 leading global corporations" | https://www.dataminr.com/press/announcement/dataminrs-regenai-expands-to-cover-hyperlocal-events-across-the-globe-delivering-10x-more-dynamically-updating-event-briefs/ | 2024-09-18 | PRIMARY |
| Public-sector customers (2024) | "The company's First Alert product serves over 200 defense, federal, state and local and NGO organizations" | same | 2024-09-18 | PRIMARY |
| Newsrooms | "acts as a force multiplier for more than 1,500 newsrooms and 30,000 journalists" | https://www.dataminr.com/products/dataminr-for-news | page accessed 2026-10-15 | PRIMARY |
| Nonprofits | Stat block "185" nonprofits and UN agencies, and "147" countries (paraphrase of the stat labels) | https://www.dataminr.com/company/dataminr-for-nonprofits | page accessed 2026-10-15 | PRIMARY |
| Revenue | "approaching $200M in ARR" | https://www.dataminr.com/press/announcement/dataminr-secures-funding/ | 2025-03-19 | PRIMARY |
| ThreatConnect base | "Relied on by 250 leading enterprise and government organizations" | https://www.dataminr.com/press/announcement/dataminr-to-acquire-threatconnect/ | 2025-10-21 | PRIMARY |
| CEO on NATO (reported) | "NATO is our second largest customer" | https://breakingdefense.com/2026/09/dataminr-ai-tech-to-go-live-on-nato-maven-system-ceo/ | 2026-09-01 | INDEPENDENT (reports a CEO claim) |

**Customer types (Dataminr says):** large corporations (Fortune 50/100), U.S. federal, state and local agencies, militaries and NATO, international governments, newsrooms, and nonprofits/UN agencies.

### 1.6 Named customers
**Displayed by Dataminr (logos).** The homepage and /company/customers show logos that the fetch tool identified from image file names, since the images have no alt text. They are Goldman Sachs, Microsoft, NATO, NVIDIA, OpenAI, Walmart, Wiz, CISA, the U.S. Department of Defense, and the U.S. Department of State. Treat these as displayed logos, not confirmed contracts. Sources: https://www.dataminr.com/ and https://www.dataminr.com/company/customers (page accessed 2026-10-15). PRIMARY.

**Named in Dataminr testimonials or case studies (PRIMARY, page accessed 2026-10-15 unless dated):**
- **Corporate security** (https://www.dataminr.com/products/corporate-security/): ASM Global, Sierra Nevada Company, Wiz, Air Products & Chemicals, and HP (case study). Wiz quote: "Dataminr is really a key resource for our program—including how we assess threats and manage incidents."
- **First Alert** (https://www.dataminr.com/products/first-alert): NATO SHAPE Task Force Maven ("First Alert Advanced is a giant leap forward for NATO's real-time intelligence picture") and La Poste Group.
- **News** (https://www.dataminr.com/products/dataminr-for-news): Patch, Getty Images, Reach PLC, Deutsche Welle, and Radio Free Europe/Radio Liberty.
- **Case studies** (https://www.dataminr.com/company/customers): USO, CNA ("with ThreatConnect, Now a Part of Dataminr"), CyberPeace Institute, and Wyndham.
- **ReGenAI releases:** Danske Bank and Six Flags (2024-04-18); Carhartt (2024-09-18). URLs are in §5.
- **Nonprofits page** (logos): Oxfam, United Nations, Habitat for Humanity, Direct Relief, Mercy Corps, World Central Kitchen, IRC, Amnesty International, and Save the Children. Case studies: UNICEF OPSCEN, IOM, CyberPeace Institute, and Ushahidi.

**Independently confirmed customers:**
- **U.S. DoD / Air Force:** "The award was issued by the Air Force." Source: https://defensescoop.com/2026/08/27/pentagon-awards-dataminr-318m-contract/ (2026-08-27). INDEPENDENT.
- **New York City Fire Department (FDNY):** "To renew Dataminr's First Alert Licenses for the public sector alerts first responders to breaking events". Source: https://a856-cityrecord.nyc.gov/RequestDetail/20260420047 (award notice 2026-04-27). INDEPENDENT (government record).

---

## 2. Product lineup today and what each product does

### 2.0 Lineup and naming (as of 2026-10-15)
- The homepage "Products" menu lists AI Platform; Dataminr for Corporate Security; Dataminr for Cyber Defense; First Alert; and Dataminr for News. Source: https://www.dataminr.com/ (page accessed 2026-10-15). PRIMARY.
- **The "Pulse" brand appears to be legacy.** Old URLs such as https://www.dataminr.com/pulse/corporate-security/ now show the "Dataminr Advanced for Corporate Security" page, and /pulse/cyber-risk/ shows the Cyber Defense page (observed 2026-10-15). The Cyber Defense page relabels the old products:
  - Threat Intelligence "(Formerly Pulse for Cybersecurity)"
  - Investigation Insights "(formerly Polarity)"
  - Agentic Threat Intelligence Platform "(formerly TI Ops)"
  - Continuous Control Monitoring with Risk Quantification "(formerly Risk Quantifier)"
  
  Source: https://www.dataminr.com/products/cyber-defense (page accessed 2026-10-15). PRIMARY.
- The Splunk app, created by Dataminr, is now titled "Dataminr Threat Intelligence for Splunk Enterprise and Splunk Cloud" and describes itself as formerly Dataminr Pulse (paraphrase). Source: https://splunkbase.splunk.com/app/6520 (v3.1.1, 2026-05-12). PRIMARY.

### 2.1 Dataminr for Corporate Security (formerly Dataminr Pulse for Corporate Security; now "Dataminr Advanced for Corporate Security")
| Aspect | Exact quote / content | Source | Date | Type |
|---|---|---|---|---|
| Target user | Corporate security teams: "protect their people, sites, and operations before risk escalates." | https://www.dataminr.com/products/corporate-security/ | page accessed 2026-10-15 | PRIMARY |
| Use cases | "Enhance organizational safety and resilience across three key use cases." The three are "protecting people, securing facilities and events, and ensuring operational resilience". The page also links Employee Safety, Executive Protection, Physical Security, Travel Risk Management, and Supply Chain Management. | https://www.dataminr.com/ ; /products/corporate-security/ | page accessed 2026-10-15 | PRIMARY |
| Positioning | "transforms the category of real-time alerting into Autonomous Real-Time Intelligence powered by Agentic AI" | /products/corporate-security/ | page accessed 2026-10-15 | PRIMARY |
| Agentic features | "Agentic Search, Real-Time Brief Builder, Watchlist Agent, ReGenAI Tailored Live Briefs, and Advanced Custom Alerts deliver Agentic AI capabilities" | /products/corporate-security/ | page accessed 2026-10-15 | PRIMARY |
| Launch (GSX 2026) | Release title: "Dataminr Advanced for Corporate Security Brings Autonomous Real-Time Intelligence to the Enterprise". Agentic Corroboration, Agentic Context, and Near-Term Predictive Intelligence were generally available at launch. ReGenAI Tailored Live Briefs, Real-Time Brief Builder, Watchlist Agent, Agentic Search, Next Gen Custom Alerts, and Advanced API were listed as upcoming. | https://cioinfluence.com/?p=402832 (Business Wire copy) | 2026-09-15 | PRIMARY (syndicated release) |
| Independent write-up of the launch | "AI agents verify events at machine speed." | https://helpnetsecurity.com/2026/09/14/dataminr-uses-agentic-ai-to-predict-and-verify-security-threats | 2026-09-14 | INDEPENDENT (based on the release) |
| Deployment and channels | "can be deployed from headquarters to the field via web, mobile, and email applications" and "directly into enterprise applications or internal systems via a suite of APIs and connectors." | /products/corporate-security/ | page accessed 2026-10-15 | PRIMARY |
| Maps | "visualize events, threats, and risks alongside critical infrastructure, assets, and personnel data" | /products/corporate-security/ | page accessed 2026-10-15 | PRIMARY |
| Integrations | Crisis24, Genetec, and Esri (technology-alliance links on the page) | /products/corporate-security/ | page accessed 2026-10-15 | PRIMARY |
| Legacy: two-way notification | "Notify and confirm the safety of employees through multiple modes including text, e-mail and voice" | https://www.dataminr.com/press/dataminr-pulse-for-corporate-security-expands-to-include-new-two-way-notification-tools-and-hr-travel-integrations/ | 2023-04-05 | PRIMARY |
| Legacy: HR and travel data | "Dynamically add and manage employee locations with integrations to HR and travel platforms" | same | 2023-04-05 | PRIMARY |
| Legacy: mass notification | "execute mass notifications within 60 seconds via SMS, email, or voice during incidents" | ReGenAI expansion release (§1.5 URL) | 2024-09-18 | PRIMARY |
| Legacy: geofences and assets | "Zero in on and collect data from local areas of interest with Geofencing tools" | https://dataminr.com/wp-content/uploads/2023/12/Pulse-with-Geovisualization-One-Pager.pdf (© Dataminr 2021; uploaded 2023-12) | 2021/2023 | PRIMARY |
| Legacy: asset dashboard | "Analyze and download asset metadata (e.g., address info, point of contact, employee counts, etc.) with the Impact Dashboard" | same PDF | 2021/2023 | PRIMARY |
| Crisis24 partnership | "NEW YORK and ANNAPOLIS, Md. — March 18, 2026" (dateline). The first integrated features are ReGenAI Live Briefs, Intel Agents, and Predictive Intelligence (paraphrase). | https://www.dataminr.com/press/announcement/dataminr-crisis24-strategic-partnership/ | 2026-03-18 | PRIMARY |

### 2.2 Dataminr for Cyber Defense (successor to Pulse for Cyber Risk plus ThreatConnect; launched 2026-03-23)
| Aspect | Exact quote / content | Source | Date | Type |
|---|---|---|---|---|
| What it is | "a suite of preemptive threat and exposure solutions" | https://www.dataminr.com/press/announcement/dataminr-redefines-cyber-defense/ | 2026-03-23 | PRIMARY |
| Origin | "the first unified solution from the acquisition of ThreatConnect" | same | 2026-03-23 | PRIMARY |
| Headline | "The Only Intel-driven Threat and Exposure Management Solution Suite" | https://www.dataminr.com/products/cyber-defense | page accessed 2026-10-15 | PRIMARY |
| Target users | CISOs, SOC/IR, CTI teams, and vulnerability-management/GRC staff (paraphrase of the FAQ) | same | page accessed 2026-10-15 | PRIMARY |
| Solution 1: CTTI | "Instantly Correlate External Threats With Your Internal Context, Delivered In Any-Workflow." | same | page accessed 2026-10-15 | PRIMARY |
| Solution 2: Agentic TI Ops | "From First Signal to Finished Intelligence — Automatically." | same | page accessed 2026-10-15 | PRIMARY |
| Solution 3: PTEM | "Continuous, Financially Grounded Threat Exposure Management." | same | page accessed 2026-10-15 | PRIMARY |
| Agents | "Intel Agents operate autonomously using 100+ specialized models in parallel" | https://www.dataminr.com/products/cyber-defense/agentic-ti-ops | page accessed 2026-10-15 | PRIMARY |
| Human review | "An analyst reviews, validates, and applies judgment before intelligence moves forward." and "Analysts stay in control of judgment. Agents handle the labor." | same | page accessed 2026-10-15 | PRIMARY |
| Delivery | "Real-time STIX/TAXII delivery into your detection stack"; stat blocks "200+ integrations" and "300+ sources" | https://www.dataminr.com/products/cyber-defense | page accessed 2026-10-15 | PRIMARY |
| Integration directory | The directory displays 12 of 204 integration partners before "Load More". Filter categories include "SIEM and Analytics", "Security Operations", and "Incident Response and Ticketing" (paraphrase of the page) | https://www.dataminr.com/integration-partners/ | page accessed 2026-10-15 | PRIMARY |
| Customer metrics (self-reported) | "97% of customers reporting improved effectiveness in operational tools like SIEMs, SOARs, and EDRs" and "67% of users report cutting their Mean Time to Respond (MTTR) by more than half" | Mar 23, 2026 release | 2026-03-23 | PRIMARY |
| False positives (self-reported) | "74% of surveyed customers reported 25%+ false positive reduction." | Agentic TI Ops page | page accessed 2026-10-15 | PRIMARY |
| Independent coverage | The article reads as a restatement of the announcement and gives no methodology for the 97%/67% figures (paraphrase). "At RSAC 2026, Dataminr is presenting the new suite and previewing upcoming agentic AI capabilities." | https://securityboulevard.com/2026/03/dataminr-launches-cyber-defense-suite-that-fuses-external-threat-signals-with-internal-telemetry/ | 2026-03-23 | INDEPENDENT |
| Channel | "more than 35,000 North American resellers" (TD SYNNEX) | https://www.dataminr.com/press/announcement/dataminr-announces-strategic-partnership-with-td-synnex-to-accelerate-ai-powered-cyber-defense | 2026-06-09 | PRIMARY |
| Legacy: Pulse for Cyber Risk use cases | Vulnerability prioritization "pre-CVE to exploitation"; digital risk: "Early warning of risk to digital assets including leaked credentials and data, account and domain impersonation" | https://www.securityinfowatch.com/cybersecurity/press-release/53058485/dataminr-dataminr-launches-pulse-for-cyber-risk (syndicated release) | 2023-04-20 | PRIMARY (syndicated) |
| Source scale in Splunk app | "over 1.1 million public, deep, and dark web sources" | https://splunkbase.splunk.com/app/6520 | 2026-05-12 | PRIMARY (Dataminr-created app) |

### 2.3 First Alert and First Alert Advanced (public sector)
| Aspect | Exact quote / content | Source | Date | Type |
|---|---|---|---|---|
| What it is | "Increase decision-making speed with a real-time critical event discovery solution for the public sector." | https://www.dataminr.com/ | page accessed 2026-10-15 | PRIMARY |
| Six use cases | EMERGENCY MANAGEMENT; TRANSPORTATION AND INFRASTRUCTURE PROTECTION; DIPLOMATIC SECURITY AND CRISIS MANAGEMENT; FORCE PROTECTION; LAW ENFORCEMENT; EXECUTIVE OFFICIAL AWARENESS (headings in the PDF) | https://www.dataminr.com/dataminr-solutionsheet-firstalert-digital (PDF) | 2024 | PRIMARY |
| Advanced launch | "First Alert Advanced is now available to all public sector organizations worldwide." | https://www.dataminr.com/press/announcement/dataminr-launches-first-alert-advanced-awarded-dow-contract/ | 2026-08-26 | PRIMARY |
| Agentic Corroboration | "A fleet of Dataminr Intel Agents autonomously scans the entire publicly available information landscape for corroborating" ... "from official sources to on-the-ground imagery" | same | 2026-08-26 | PRIMARY |
| Tactical Predictive Intelligence | "Dataminr's AI models predict potential evolutions of how an event may unfold over the coming hours" | same | 2026-08-26 | PRIMARY |
| ReGenAI Tailored Live Briefs | "Dataminr's AI models continuously describe an event's evolution and its potential impact on a customer's organization." | same | 2026-08-26 | PRIMARY |
| Palantir | "First Alert Advanced also includes a new native application on the Palantir Foundry Marketplace." | same | 2026-08-26 | PRIMARY |
| Pre-launch customers | "Pre-launch First Alert Advanced customers already include NATO and nine international militaries." | same | 2026-08-26 | PRIMARY |
| NATO deployment (reported) | NATO "has deployed it to the entire NATO enterprise in Palantir Maven Smart Systems" (CEO, as reported) | https://breakingdefense.com/2026/09/dataminr-ai-tech-to-go-live-on-nato-maven-system-ceo/ | 2026-09-01 | INDEPENDENT (reports a CEO claim) |
| Mobile app | "First Alert by Dataminr transforms publicly available information into actionable breaking news alerts" (seller: Dataminr, Inc.; v2.29.4) | https://apps.apple.com/us/app/first-alert-by-dataminr/id1370986669 | page accessed 2026-10-15 | PRIMARY |
| Nonprofits | First Alert for Nonprofits "offers free and discounted access to our event, threat & risk intelligence solutions." | https://www.dataminr.com/company/dataminr-for-nonprofits | page accessed 2026-10-15 | PRIMARY |

### 2.4 Dataminr for News
| Aspect | Exact quote / content | Source | Date | Type |
|---|---|---|---|---|
| Headline | "AI Newsgathering for Modern Newsrooms" | https://www.dataminr.com/products/dataminr-for-news | page accessed 2026-10-15 | PRIMARY |
| Purpose | "Helps journalists in over 1,500 newsrooms to break news on the stories that matter most to their audiences." | same | page accessed 2026-10-15 | PRIMARY |
| Agents | "Intel Agents for the physical world autonomously surface critical details behind every event." | same | page accessed 2026-10-15 | PRIMARY |
| Team workflow | "Your team can improve response and manage workflows by sending real-time information to specific channels" | same | page accessed 2026-10-15 | PRIMARY |
| Speed (testimonial, Deutsche Welle) | "The 45 minutes [Dataminr for News] gives us is the advance we need" | same | page accessed 2026-10-15 | PRIMARY (customer quote chosen by Dataminr) |
| Teams app | A Microsoft AppSource listing exists (https://appsource.microsoft.com/product/office/WA200004861), but the page returned HTTP 403, so its content is **unverified** | n/a | n/a | n/a |

### 2.5 Finance
- **No standalone finance product appears in the 2026 menu.** "Financial Services" is a use-case page headlined "Power Financial Decisions with Real-Time Event Intelligence". It covers market-moving events, commodities and supply-chain disruption, and corporate/cyber risk. Source: https://www.dataminr.com/use-cases/financial-services/ (page accessed 2026-10-15). PRIMARY.
- Independent distribution: "Dataminr news alerts for oil, natural gas and agriculture are available free of charge in ICE Connect." Source: https://ice.com/fixed-income-data-services/access-and-delivery/desktop-web-platforms/news-and-alerts/dataminr (page accessed 2026-10-15). INDEPENDENT (partner).
- Whether Dataminr still sells a dedicated trading/finance alert product is **unverified**.

### 2.6 ThreatConnect (acquired)
- Announcement: "The transaction values ThreatConnect at $290 million." Dateline "NEW YORK – October 21, 2025". Source: https://www.dataminr.com/press/announcement/dataminr-to-acquire-threatconnect/ (2025-10-21). PRIMARY.
- ThreatConnect is described as "a premier intelligence management platform for contextualizing and prioritizing threats". Same release. PRIMARY.
- Rationale: the deal "will create the industry's first-ever Agentic AI-powered Client-Tailored intelligence" and "Dataminr's AI Agents will dynamically reason across both the internal and external data domains." Same release. PRIMARY.
- Product plan in 2025: "Dataminr Pulse for Cyber Risk and ThreatConnect will become a joint offering". Same release. PRIMARY.
- Deal closed: "In 2025, Dataminr acquired ThreatConnect". Source: https://www.dataminr.com/products/cyber-defense (page accessed 2026-10-15). PRIMARY. The exact closing date is **unverified**. Search snippets pointed to a GovConWire report dated 2025-11-25 and to Tracxn's 2025-11-12, but the GovConWire page returned 403.
- Consideration: "$290 million in cash and equity" per Wikipedia. Source: https://en.wikipedia.org/wiki/ThreatConnect (page accessed 2026-10-15). INDEPENDENT. Dataminr's release does not state the cash/equity split.
- Integration evidence: https://threatconnect.com/?p=20946 returned "301 Moved Permanently" to https://www.dataminr.com/ (observed 2026-10-15).

### 2.7 Agentic AI products: Intel Agents and successors
| Milestone | Exact quote | Source | Date | Type |
|---|---|---|---|---|
| Intel Agents announced | "task AI agents to autonomously generate critical context as events, risks, and threats unfold" | https://www.dataminr.com/press/dataminr-unveils-agentic-ai-roadmap | 2025-04-28 | PRIMARY |
| First product | "The first deployment of Intel Agents will supercharge Dataminr Pulse for Cyber Risk" | same | 2025-04-28 | PRIMARY |
| Planned GA | "General availability is expected in early Q3 2025." | same | 2025-04-28 | PRIMARY |
| PreGenAI roadmap | "In 2026, Dataminr's AI innovation will take another leap forward with the launch of PreGenAI." | same | 2025-04-28 | PRIMARY |
| Physical-world agents | "Intel Agents continuously ask and answer hundreds of questions about every event, threat, and risk as they unfold." | https://www.dataminr.com/press/announcement/dataminr-intel-agents-for-the-physical-world/ | 2025-09-29 | PRIMARY |
| Beta and GA plan | "Intel Agents for the physical world are now available in private beta" and "General availability is expected in November 2025." | same | 2025-09-29 | PRIMARY |
| No prompting | Intel Agents "work autonomously (no prompts needed) at scale" | https://www.dataminr.com/resources/blog/intel-agents-have-arrived-for-physical-security-teams-no-prompts-just-context/ | 2025-10-16 | PRIMARY |
| What agents attach | "the number and type of independent sources, any related photos or videos, and direct links" | same | 2025-10-16 | PRIMARY |
| Platform page | "A fleet of autonomous AI agents work on your behalf 24/7" | https://www.dataminr.com/ai-platform | page accessed 2026-10-15 | PRIMARY |

- **Unverified:** whether GA happened on the announced dates. Also unverified is whether 2026's "Tactical/Near-Term Predictive Intelligence" is the launched form of "PreGenAI". The /company timeline lists "Launch of Intel Agents" and "Launch of First Alert Advanced" without years.

### 2.8 ReGenAI and Live Briefs (generative summaries)
- Launch: "a new form of generative AI that automatically regenerates textual descriptions as events unfold". Source: https://www.dataminr.com/press/dataminr-unveils-regenai-the-first-generative-ai-that-automatically-regenerates-in-real-time/ (2024-04-18). PRIMARY.
- CEO framing: ReGenAI "moves generative AI beyond the 'prompt' paradigm". Same release. PRIMARY.
- Expansion: "ReGenAI's live event briefs have expanded 10-fold, now covering global, national, regional," and "is fully available to all global customers". Source: ReGenAI expansion release (§1.5 URL), 2024-09-18. PRIMARY.
- Claimed time saving: "slashing their event analysis and summary time from over 30 minutes on average to under 90 seconds". Same release. PRIMARY. **Dataminr says; not independently verified.**
- Claimed accuracy: "...regenerate in real time as events unfold, with 99.5% accuracy." Source: https://www.dataminr.com/ai-platform (page accessed 2026-10-15). PRIMARY. The page does not say what is measured or how. **Unverified.**

### 2.9 Platform, API and embedding
- "The Dataminr Developer Portal and Software Development Kit (SDK) give you direct access to our core AI Platform APIs." Source: https://www.dataminr.com/resources/developer-portal/ (page accessed 2026-10-15). PRIMARY.
- Platform partners: "Embed Dataminr's AI-powered real-time event, threat, and risk intelligence into your platform". Partners get "documented APIs, SDKs, and blueprints". Source: https://www.dataminr.com/partners/platform-partners (page accessed 2026-10-15). PRIMARY.
- Advanced API: "Suite of API capabilities that delivers Autonomous Real-Time Intelligence directly into customers' internal products". Source: DoW release (2026-08-26). PRIMARY.

---

## 3. AI platform claims (all "Dataminr says" unless marked INDEPENDENT)

### 3.1 Data sources, languages, modalities
| Claim | Exact quote | Source | Date |
|---|---|---|---|
| Sources and modalities | "over 1M public data sources—spanning text in 150 languages, images, video, sound, and sensor data" | https://www.dataminr.com/ai-platform | page accessed 2026-10-15 |
| Stat block | "1M+ Unique Public Multi-Modal Data Sources" / "150+ Languages" | same | page accessed 2026-10-15 |
| Modalities | "Processing everything from text, to image, to video to sensors and audio" | same | page accessed 2026-10-15 |
| Source types (2022 sheet) | "global and regional social media sites, blogs and web forums, IoT sensors, audio transmissions, and the deep/dark web." | https://www.dataminr.com/wp-content/uploads/2023/10/FA-Overview-International-Defence-English-UK-2.pdf (© 2022) | 2022 |
| Earlier scale and languages | "Our AI platform processes billions of data units daily from publicly available information sources and translates from 100+ languages" | same PDF | 2022 |
| Machine signals | ADS-B transponder signals and ICAO flight plans used in a plane-crash example (paraphrase) | https://www.dataminr.com/resources/insight/eliminate-risk-blindspots-with-multi-modal-fusion-ai/ | 2025-11-13 |
| Deep/dark web (cyber) | "1M+ public, deep, and dark web sources" (Agentic TI Ops page); "We monitor 1M+ sources across text, image, video, and audio simultaneously" (Cyber page) | https://www.dataminr.com/products/cyber-defense/agentic-ti-ops ; /products/cyber-defense | page accessed 2026-10-15 |
| Countries | "220+ countries and territories" | https://www.dataminr.com/press/dataminr-unveils-agentic-ai-roadmap | 2025-04-28 |
| Independent description of inputs | Multimodal fusion draws on "such as plane and ship transponders" (reporting the company's description) | https://breakingdefense.com/2026/09/dataminr-ai-tech-to-go-live-on-nato-maven-system-ceo/ | 2026-09-01 (INDEPENDENT) |

Growth and inconsistency in the source count, all PRIMARY:
- 2020 blog: "hundreds of thousands distinct data sources"
- 2022 sheet: "500,000+ public data sources"
- 2023: "over 500,000 unique public data sources" (Apr 2023 boilerplate)
- 2023 cyber launch: "Nearly one million" (paraphrase)
- 2025 partner PDF: "nearly one million public data sources"
- 2026: "1M+"
- Splunk app: "over 1.1 million"

### 3.2 Scale (volume per day)
| Claim | Exact quote | Source | Date |
|---|---|---|---|
| Volume, version A | "43+ Terabytes of Text Processed Every Day" | https://www.dataminr.com/ai-platform | page accessed 2026-10-15 |
| Volume, version B | "43TB of text, images, and video ingested daily" | https://www.dataminr.com/company | page accessed 2026-10-15 |
| Volume, version C | "Dataminr processes over 43 TBs of public data daily" | https://www.dataminr.com/products/dataminr-for-news | page accessed 2026-10-15 |
| Events detected | "detecting nearly 500,000 daily events, risks and threats" | https://www.dataminr.com/ai-platform | page accessed 2026-10-15 |
| Human-equivalent scale | "30K people working 24/7 would only process 1% of all the data Dataminr ingests each day." | First Alert solution sheet PDF (§2.3) | 2024 |
| Cyber intel network | "266B+ data points" and "156M daily observations" | https://www.dataminr.com/products/cyber-defense | page accessed 2026-10-15 |
| Generated descriptions | "15+ purpose-built LLMs generating 50k+ daily event descriptions" and "50+ additional proprietary LLMs generating 200K+ daily Gen AI event descriptions" | https://www.dataminr.com/company (timeline) | page accessed 2026-10-15 |

### 3.3 Model types and counts
| Claim | Exact quote | Source | Date |
|---|---|---|---|
| LLM count, version A | "Powered by 50+ proprietary LLMs trained on 12+ years of data" | https://www.dataminr.com/ai-platform | page accessed 2026-10-15 |
| LLM count, version B | "With 55+ proprietary LLMs and a 12+ year event archive" | https://www.dataminr.com/press/announcement/dataminr-redefines-cyber-defense/ | 2026-03-23 |
| LLM count, version C | "Dataminr operates a constellation of more than 60 purpose-built, specialized LLMs" | DoW release (§2.3) and /products/corporate-security/ | 2026-08-26 |
| Model count (cyber) | "100+ specialized AI models" | https://www.dataminr.com/products/cyber-defense | page accessed 2026-10-15 |
| Why not frontier models (CTO) | "Rather than relying solely on massive frontier models, with their inherent hallucinations, latency, and risk of IP loss" | DoW release | 2026-08-26 |
| Same quote, continued | "Dataminr orchestrates dozens of our own fine-tuned, task-specific LLMs" | DoW release | 2026-08-26 |
| In-house versus external | "Unlike most Gen AI applications that rely on external Gen AI providers" and "Dataminr's ReGenAI is powered by proprietary purpose-built large language models (LLMs)" | ReGenAI expansion release | 2024-09-18 |
| Agents use own LLMs | "Powered by Dataminr's domain-specialized LLMs for real-time reasoning" | Intel Agents physical-world release | 2025-09-29 |
| First LLM, year A | "We launched our first LLM in 2015." | https://www.dataminr.com/careers | page accessed 2026-10-15 |
| First LLM, year B | "Dataminr first created and integrated our own LLMs in 2019, long before the LLM and GenAI boom." | /products/corporate-security/ | page accessed 2026-10-15 |
| First LLM, year C (GenAI) | "Dataminr first created and integrated our own LLMs for Gen AI in 2022, long before ChatGPT" | /ai-platform | page accessed 2026-10-15 |
| Multi-modal fusion | Fusion "fuses them into a unified analytical model, allowing cross-modal reasoning." | Multi-modal fusion insight (§3.1) | 2025-11-13 |
| Fusion technique (2020) | "early detection multi-modal AI Fusion methods that synthesize diverse and disparate public data sources". The post describes image-text cross-attention but gives no benchmark numbers. | https://www.dataminr.com/blog/multi-modal-fusion-ai-for-real-time-event-detection (by Alex Jaimes) | 2020-02-18 |
| Predictive AI (2024) | ReGenAI uses "predictive AI to analyze and synthesize key developments" | ReGenAI launch release | 2024-04-18 |
| Agentic AI (2026) | "deploys AI agents to uncover and synthesize the most relevant event, threat, and risk context" | /ai-platform | page accessed 2026-10-15 |
| AI staff | "a team of 150+ AI experts, including over a dozen PhD-level AI scientists" | /products/corporate-security/ | page accessed 2026-10-15 |

### 3.4 Speed claims (none independently benchmarked)
- Platform claim: "discover events, threats, and risks faster than any other source on the planet". Source: /ai-platform (page accessed 2026-10-15). PRIMARY.
- Military Watch Center testimonial: Dataminr was "at least 20-30 minutes ahead of the local news cycle" during the Potomac plane crash. Source: https://www.dataminr.com/products/first-alert (page accessed 2026-10-15). PRIMARY (customer quote).
- Deutsche Welle: "The 45 minutes [Dataminr for News] gives us is the advance we need". Source: /products/dataminr-for-news. PRIMARY (customer quote).
- Unnamed financial services customer: "A Dataminr alert gave us a day's notice of an event near one of our main commercial sites." Source: /company/customers. PRIMARY (customer quote).
- Cyber: "38 Days of Lead Time: How Dataminr Detected CVE-2025-6446 Before CISA, the Vendor, and the Industry". Source: /products/cyber-defense (page accessed 2026-10-15). PRIMARY. The heading gives the CVE as 6446 but the linked URL slug says "cve-2025-64446", so the CVE identifier is **inconsistent on Dataminr's own page**.
- CEO claim on the Iran strikes, as reported: "which he claimed the system picked up 15 minutes before any mainstream news coverage". Also: "the platform alerted users to the first strikes on Iran at 1:12 AM on Feb. 28,". Source: https://breakingdefense.com/2026/09/dataminr-ai-tech-to-go-live-on-nato-maven-system-ceo/ (2026-09-01). INDEPENDENT reporting of an unverified CEO claim.
- Insight article: "critical hours or days of notice—much earlier than other sources". Source: multi-modal fusion insight (2025-11-13). PRIMARY.

### 3.5 Accuracy claims
- ReGenAI: "with 99.5% accuracy" (no methodology). Source: /ai-platform. PRIMARY. **Unverified.**
- "the fastest, most accurate real-time alerting". Source: /products/corporate-security/. PRIMARY (marketing).
- False positives: "74% of surveyed customers reported 25%+ false positive reduction." Source: Agentic TI Ops page. PRIMARY (survey method not given).
- Analyst recognition: Frost & Sullivan cites customer-reported "reductions in incident response times by nearly 70%". Source: https://www.dataminr.com/press/announcement/2026-global-risk-intelligence-solutions-leadership-recognition/ (2026-07-21). This is a third-party award hosted on Dataminr's site, and the figures are customer-reported.
- **No independent accuracy, recall, or false-positive benchmark was found.** The 2020 fusion blog claims it "outperforms" baselines but gives no numbers.

### 3.6 Role of human experts
- Independent interview with the Chief AI Officer: "It's 2026, and these models can alert on 99% of what we alert on," and "our human experts are actually used for very nuanced and tricky types of events that are unfolding,". Source: https://www.aibusiness.com/generative-ai/how-dataminr-kept-the-human-in-the-loop (AI Business, 2026-05-19, Joel Tetreault). INDEPENDENT outlet quoting an executive.
- History from the same article: "What we did was build in a process to collect data from the subject matter experts." and "We log all their keystrokes." (training data from experts, 2018-2020). INDEPENDENT.
- Job posting for Domain Experts: they "annotate, label, and edit signals in real time" as part of an "advanced realtime human-AI feedback loop". Source: https://jobs.venrock.com/companies/dataminr/jobs/70484072-senior-associate-domain-expert-eastern-europe (posted "6+ months ago"; closed). PRIMARY (Dataminr job text on a third-party job board).
- Governance: "We maintain human oversight processes to ensure consistent performance and appropriate model behavior." Source: https://www.dataminr.com/dataminr-trust-services/ (page accessed 2026-10-15). PRIMARY.
- Cyber workflow: "Analysts stay in control of judgment. Agents handle the labor." (§2.2). PRIMARY.

### 3.7 Certifications and AI governance
- "Dataminr is among the first 40 organizations worldwide to earn the certification" (ISO 42001; certifying body Mastermind). Source: https://www.dataminr.com/press/announcement/dataminr-achieves-iso-42001-certification/ (2025-06-27). PRIMARY.
- The Trust Services page also lists SOC 2 Type 2, ISO 27001, ISO 27701, and NIST 800-171, and says Dataminr adopted the NIST AI RMF (paraphrase). Source: https://www.dataminr.com/dataminr-trust-services/ (page accessed 2026-10-15). PRIMARY.
- 2022 First Alert sheet: "First Alert is NIST 800-171, SOC2 Type II, and ISO-27001 compliant." (layout-extracted PDF; §3.1 URL). PRIMARY.
- FedRAMP for Dataminr's own products: **not found**. A "ThreatConnect achieves FedRAMP authorization" item appears in search results for Dataminr's press pages (June 2025), but it was not opened and is **unverified**.

---

## 4. Alert anatomy, alert selection, and delivery

### 4.1 Priority levels
- **Flash / Urgent / Alert, independently documented and not found on dataminr.com public pages:**
  - The Mattermost plugin, which uses the First Alert API, lists "Flash" (red) "Breaking news", "Urgent" (orange) "High priority", and "Alert" (yellow) "Normal priority". Its description: "Real-time alerting system that integrates the Dataminr First Alert API with Mattermost." Source: https://mattermost.com/marketplace/dataminr-plugin/ (page accessed 2026-10-15). INDEPENDENT (integration by Mattermost).
  - Elastic's integration, which uses the Dataminr Pulse v4 API, lists the priority values **Alert, Urgent, Flash**, mapped to `event.severity` 10/20/30 (value names as listed). Source: https://www.elastic.co/docs/reference/integrations/dataminr_pulse (page accessed 2026-10-15). INDEPENDENT.
- Dataminr's own wording does not name the levels: "alert urgency levels are designed to reflect your priorities by color and easy-to-understand iconography." Source: Pulse geovisualization one-pager PDF (§2.1). PRIMARY.

### 4.2 What an alert contains
- **Headline plus source attribution (official examples):** "At least one confirmed dead and fuselage found after Canadian NATO helicopter crash off coast of Cephalonia, Greece: Local News Outlet via Social Media." Source: 2022 First Alert defence PDF (§3.1 URL). PRIMARY. The same PDF promises "single-sentence summaries" ("Quickly understand each alert via single-sentence summaries").
- **Fields in the API** (Dataminr Pulse API, as documented by Palo Alto Networks' Cortex XSOAR "Dataminr Pulse - ReGenAI" integration):
  - `alertId`, `alertTimestamp`, `alertType.name`
  - `alertTopics`, `alertCompanies`, `alertSectors`
  - `headline`, `subHeadline`
  - `publicPost` (timestamp, href, text, channels, media, englishText)
  - `eventCorroboration`, `estimatedEventLocation`
  - `assetsMatched` (location, third-party, and travel assets)
  - `intelAgents`, `liveBrief` (summary, version, timestamp), `alertReferenceTerms`, `dataminrAlertUrl`
  - `metadata.cyber` (vulnerabilities, URLs, addresses, malware, threat actors, AS orgs, hashes)
  - `listsMatched`, `linkedAlerts`
  
  The doc describes `liveBrief.summary` as "The live brief summary." Source: https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse-re-gen-ai (page accessed 2026-10-15). INDEPENDENT (Palo Alto Networks docs).
- Elastic maps similar fields: headline, coordinates and location name, watchlists matched, categories/companies/sectors, public source post link and media, Live Brief summary, Intel Agents summary, and CVE/CVSS/threat actors (paraphrase). Source: Elastic doc (§4.1). INDEPENDENT.
- Esri's Japanese-language ArcGIS Velocity doc: "alertId フィールドは Track ID として設定され、alertTimestamp フィールドは Start Time として設定されています。" Point geometry is built from `estimatedEventLocation_lat/lng`. Source: https://doc.arcgis.com/ja/velocity/ingest/dataminr.htm (page accessed 2026-10-15). INDEPENDENT (Esri).

### 4.3 How customers choose what they receive
- 2022 First Alert pipeline: "Conﬁgures account settings based on user priorities" and "Delivers real-time, breaking news alerts, aligned with areas of interest". Source: 2022 defence PDF. PRIMARY.
- **Watchlists:** list type "Can be one of the Topic, Company, or Custom." Source: https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse (page accessed 2026-10-15). INDEPENDENT (Palo Alto docs).
- **Agentic watchlist set-up (2026):** "Embedded AI agent that interacts with users to create and refine watchlist settings to ensure users can receive the most". Source: DoW/First Alert Advanced release (2026-08-26). PRIMARY.
- **Hyperlocal custom alerts (2026):** "Agentic AI capability that enhances the granularity and depth of real-time alerts for hyperlocal and hyperspecific topics". Same release. PRIMARY.
- **Geography and assets (Pulse):** layers organized by "Location Groups, Physical Asset Security alerts, and your Personal Lists", plus "Geofencing tools". Source: geovisualization PDF. PRIMARY.
- **Assets matched:** API field `assetsMatched` covers location, third-party, and travel assets (XSOAR doc, §4.2). INDEPENDENT.
- **Cyber entities (2023):** a knowledge graph "of millions of entities and relationships" maps threats across a company, its subsidiaries, and its supply chain (paraphrase). Source: Pulse for Cyber Risk launch release (§2.2). PRIMARY.
- **Briefs on demand:** Real-Time Brief Builder: "Integrated AI capability that synthesizes a set of user-designated events into on-demand customizable briefs". Source: DoW release. PRIMARY.
- **Historical search:** Agentic Search: "Agent-based historical search that identifies user intent, reasons, and effectively surfaces events most relevant to". Source: DoW release. PRIMARY.

### 4.4 Delivery channels and integrations
| Channel | Exact quote / evidence | Source | Date | Type |
|---|---|---|---|---|
| Web, mobile, email, API | "via web, mobile, and email applications" ... "a suite of APIs and connectors" | /products/corporate-security/ and /products/first-alert | page accessed 2026-10-15 | PRIMARY |
| Email, mobile, web (2022) | "Receive alerts by: Email Mobile Web-based notifications" (layout-extracted) | 2022 defence PDF | 2022 | PRIMARY |
| SMS, email, voice notification to employees | "execute mass notifications within 60 seconds via SMS, email, or voice during incidents" | ReGenAI expansion release | 2024-09-18 | PRIMARY |
| Mobile apps | "Dataminr" app (seller Dataminr, Inc., v2.29.4, free): "Actionable Alerts: Get the fastest, most accurate real-time detection on the events and risks that matter to you." | https://apps.apple.com/us/app/dataminr/id927068353 | page accessed 2026-10-15 | PRIMARY |
| Microsoft Teams | "The ability to configure Dataminr alerts into personal chat, group chats & channels" | https://www.dataminr.com/partners/microsoft-teams | page accessed 2026-10-15 | PRIMARY |
| Splunk | Created by "Dataminr, an official Splunk Partner"; "Ingest Dataminr Pulse alerts via API with CIM-aligned fields for correlation" | https://splunkbase.splunk.com/app/6520 | 2026-05-12 | PRIMARY |
| ServiceNow and others via Playbooks | users can "send to other systems like Carbon Black, ServiceNow, Palo Alto, or Tenable" | https://www.dataminr.com/integration-partners/splunk/ | page accessed 2026-10-15 | PRIMARY |
| STIX/TAXII | "Real-time STIX/TAXII delivery into your detection stack" | /products/cyber-defense | page accessed 2026-10-15 | PRIMARY |
| SIEM/SOAR/EDR categories | Six categories (SIEMs; SOAR and automation; EDR/XDR; vulnerability and asset management; identity; network and cloud). Vendor names (Splunk, QRadar, Cortex XSOAR, CrowdStrike, ServiceNow, etc.) were inferred from logo file names. | /products/cyber-defense | page accessed 2026-10-15 | PRIMARY (vendor names inferred) |
| Palantir Foundry | "a new native application on the Palantir Foundry Marketplace" | DoW release | 2026-08-26 | PRIMARY |
| Crisis24 Horizon, Esri, Genetec | partner links on the product page; Crisis24 release | /products/corporate-security/ ; Crisis24 release | 2026 | PRIMARY |
| Cortex XSOAR | "Dataminr Pulse brings the most advanced AI-powered real-time intelligence into Cortex XSOAR" | https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse | page accessed 2026-10-15 | INDEPENDENT |
| Elastic | Pulse v4 API, OAuth client ID/secret, default 5-minute polling (paraphrase) | Elastic doc | page accessed 2026-10-15 | INDEPENDENT |
| Mattermost | First Alert API (quote in §4.1) | Mattermost marketplace | page accessed 2026-10-15 | INDEPENDENT |
| Datadog | "The Dataminr Datadog integration allows to collect and visualize Dataminr's Alerts data as logs into Datadog." (maintained by Crest Data) | https://docs.datadoghq.com/integrations/crest_data_systems_dataminr/ | page accessed 2026-10-15 | INDEPENDENT |
| ArcGIS Velocity (push) | Dataminr pushes alerts to an HTTP endpoint that Velocity creates (paraphrase of the JP doc) | Esri JP doc | page accessed 2026-10-15 | INDEPENDENT |
| Slack | **Unverified.** No Dataminr Slack integration was found; the Mattermost page only describes "Slack-style attachments". | n/a | n/a | n/a |

**Integration limits documented by third parties:** XSOAR says First Fetch Time is unsupported "as Dataminr Pulse API doesn't have time based filtering for fetching of alerts". The `dataminrpulse-related-alerts-get` command was deprecated on the Dataminr API side (XSOAR ReGenAI doc). INDEPENDENT.

---

## 5. Recent news 2024-2026 (chronological)

| Date | Event | Exact quote | Source | Type |
|---|---|---|---|---|
| 2023-11-28 (context) | Layoff of about 20% | "about 20% of staff today, or around 150 people" | https://techcrunch.com/?p=2634540 | INDEPENDENT |
| 2024-04-18 | ReGenAI launched | "Dataminr Unveils ReGenAI, the First Generative AI That Automatically Regenerates in Real Time" | https://www.dataminr.com/press/dataminr-unveils-regenai-the-first-generative-ai-that-automatically-regenerates-in-real-time/ | PRIMARY |
| 2024-04-18 | Valuation reference | "Most recently valued at $4.1B" (boilerplate). The origin of this figure in the 2021 $475M round is suggested only by a search-result title, "Dataminr raises $475M on a $4.1B valuation..." (TechCrunch, 2021-03-23), which was **not opened**. No newer valuation was found. | same | PRIMARY |
| 2024-09-18 | ReGenAI expansion | "ReGenAI's live event briefs have expanded 10-fold" | ReGenAI expansion URL (§1.5) | PRIMARY |
| 2025-02-11 | Global Partner Network | "Dataminr Launches Global Partner Network, Empowering Partner Growth with Leading AI Platform". Named partners include AWS, Esri, Splunk, Carahsoft, WWT, SoftwareOne, and JDS (APAC). | https://www.dataminr.com/press/announcement/dataminr-launches-global-partner-network-empowering-partner-growth-with-leading-ai-platform/ | PRIMARY |
| 2025-03-19 | $85M from NightDragon and HSBC | "combination of convertible financing and credit"; "approaching $200M in ARR" | https://www.dataminr.com/press/announcement/dataminr-secures-funding/ | PRIMARY |
| 2025-04-24 | $100M from Fortress | "a $100 million convertible financing" | https://www.dataminr.com/press/announcement/dataminr-announces-100m-investment-from-fortress/ | PRIMARY |
| 2025-04-28 | Agentic AI roadmap / Intel Agents | quotes in §2.7 (Chief AI Officer at the time: Alex Jaimes) | https://www.dataminr.com/press/dataminr-unveils-agentic-ai-roadmap | PRIMARY |
| 2025-06-27 | ISO 42001 | "among the first 40 organizations worldwide to earn the certification" | ISO 42001 release (§3.7) | PRIMARY |
| Aug 2025 | Financing total | "In August, the company closed a total of $250M in financing" | https://www.dataminr.com/press/announcement/dataminr-intel-agents-for-the-physical-world/ | PRIMARY |
| Sep 2025 | Financing ($300M) | "In September, the company completed a $300 million financing led by Fortress and NightDragon" | ThreatConnect release (2025-10-21) | PRIMARY |
| Sep 2025 (independent) | Same, as convertible debt | "And then in September 2025, Dataminr completed an additional $300 million convertible debt financing round," | https://en.wikipedia.org/wiki/Dataminr | INDEPENDENT |
| 2025-09-29 | Intel Agents for the physical world; Fortune Future 50 | "recently recognized as #27 on the prestigious Fortune Future 50." | physical-world release | PRIMARY |
| 2025-10-21 | Intent to acquire ThreatConnect ($290M) | "The transaction values ThreatConnect at $290 million." | ThreatConnect release | PRIMARY |
| 2025 (date unverified) | ThreatConnect deal closed | "In 2025, Dataminr acquired ThreatConnect" | /products/cyber-defense | PRIMARY |
| 2025-12-30 | Leadership: ThreatConnect CEO becomes Dataminr President and COO | "Dataminr has named Balaji Yelamanchili president and chief operating officer (COO)." (Brian Gumbel moves to an advisory role) | https://intelligencecommunitynews.com/balaji-yelamanchili-named-dataminr-president-and-coo/ | INDEPENDENT |
| 2026-03-18 | Crisis24 multi-year partnership | dateline quoted in §2.1 | Crisis24 release | PRIMARY |
| 2026-03-23 | Dataminr for Cyber Defense (RSAC 2026); Jen Easterly named as "Chair of Dataminr's Corporate Advisory Board" (paraphrase of title) | "a suite of preemptive threat and exposure solutions" | Cyber Defense release | PRIMARY |
| 2026-05-19 | Joel Tetreault interviewed as Chief AI Officer (the leadership page also lists him) | 99% quote in §3.6 | AI Business article | INDEPENDENT |
| 2026-06-09 | TD SYNNEX distribution | "more than 35,000 North American resellers" | TD SYNNEX release | PRIMARY |
| 2026-07-21 | Frost & Sullivan recognition | "Dataminr Receives the 2026 Global Risk Intelligence Solutions Competitive Strategy Leadership Recognition" | F&S release on dataminr.com | PRIMARY-hosted third-party award |
| 2026-08-26 | First Alert Advanced; $318M DoW contract | "Dataminr Launches First Alert Advanced and Secures Landmark $318 Million Contract with the U.S. Department of War" | DoW release | PRIMARY |
| 2026-08-27 | Contract independently confirmed | "Pentagon awards $318M contract for Dataminr alerting services technology"; "It was a competitive acquisition, and eight offers were received."; work through "June 25, 2031"; "A2 Publicly Available Information Alerting program" | https://defensescoop.com/2026/08/27/pentagon-awards-dataminr-318m-contract/ | INDEPENDENT |
| 2026-09-01 | NATO Maven go-live (CEO claim) | "NATO is our second largest customer"; "up to three million licensed users" (DoW scope per CEO) | Breaking Defense | INDEPENDENT (reports CEO claims) |
| 2026-09-14 | Dataminr Advanced for Corporate Security (GSX 2026); Crisis24 Horizon solution | see §2.1 | CIO Influence / Help Net Security | PRIMARY (syndicated) and INDEPENDENT |

**Leadership as of 2026-10-15.** Source: https://www.dataminr.com/company/leadership (PRIMARY).
- Ted Bailey: "Founder and CEO, Chairman of the Board"
- Balaji Yelamanchili: President and Chief Operating Officer
- Jeff Kinsey: Chief Technology Officer
- Joel Tetreault: Chief AI Officer
- Tiffany Buchanan: Chief Financial Officer
- Michael DiOrio: Chief Product Officer
- Matthew Harrell: Chief Partner Officer
- Chris Lehman: Chief Revenue Officer
- Deb Wolf: Chief Marketing Officer
- Others: Peter Bailey, Whitney Benner, Gary Hacker, Paul Tierney

The Chief AI Officer changed from Alex Jaimes (quoted April 2025) to Joel Tetreault (2026). The date and circumstances of the change are **unverified**.

**Layoffs 2024-2026:** none found in press or Dataminr releases. Search snippets surfaced anonymous Glassdoor reviews alleging further cuts in 2025-26. These were not opened and are **unverified**.

**Data partnership with X/Twitter, 2024-2026:** **no official statement found.**
- Historical only: in 2014 Dataminr partnered with CNN and Twitter (Wikipedia, INDEPENDENT; page accessed 2026-10-15).
- In 2025 Dataminr content cites "X posts" only as an example input in a hypothetical cyber scenario (paraphrase). Source: multi-modal fusion insight, 2025-11-13. PRIMARY.
- The current status of any X/Twitter firehose access is **unverified**.

**Independent criticism (context for "limits"):** Wikipedia summarizes Intercept reporting on Dataminr alerts about protests (2020 George Floyd protests; a 2025 report on LAPD alerts about pro-Palestinian demonstrations). It also notes Dataminr's response that "First Alert does not enable any type of geospatial analysis" (2020). Source: https://en.wikipedia.org/wiki/Dataminr (page accessed 2026-10-15). INDEPENDENT. The original Intercept articles were **not opened**.

---

## 6. Japan

- **No Japanese-language official site was found.** The homepage has no language selector (fetch of https://www.dataminr.com/, page accessed 2026-10-15). PRIMARY.
- **Reseller, 2022:** NEC Networks & System Integration (NESIC) was reported as the first Japanese reseller.
  - Japanese quote: 「AIによるリアルタイムアラートサービスを提供している米国Dataminr, Inc.と日本企業として初めてリセラー契約を締結」 (AIsmiley, last updated 2022-09-05). Source: https://aismiley.co.jp/ai_news/nesic-dataminr/. INDEPENDENT.
  - Second report: the service was named 「リアルタイム・リスク通知サービス」, with a sales target of 「2025年度までに累計売上25億円」. No price was given. Source: https://it.impress.co.jp/articles/-/23822 (IT Leaders, 2022-09-26). INDEPENDENT.
  - NESIC's own release was **not opened**, and whether the agreement is still active in 2025-26 is **unverified**.
- **Partner program, 2022:** "NEC Networks & System Integration" is listed among new partner-ecosystem participants. Source: https://iteuropa.com/news/dataminr-signs-high-profile-partners (2022-08-12). INDEPENDENT.
- **Current partner listings do not name a Japanese company.** The Solution Providers page shows AWS, Carahsoft, CDW, WWT, TD SYNNEX, and SoftwareOne logos (names from image files). Source: https://www.dataminr.com/partners/solution-providers/ (page accessed 2026-10-15). PRIMARY. The Feb 2025 partner release names "JDS" for Asia-Pacific and does not mention Japan (§5). PRIMARY.
- **Japanese-language technical documentation by a third party:** Esri's ArcGIS Velocity page describes ingesting Dataminr alerts (§4.2). INDEPENDENT.
- **Japanese customers:** none named by Dataminr or found independently (**unverified / none found**). The nearest Dataminr office is Melbourne (careers page).

---

## 7. Pricing

- **No public price list.** https://www.dataminr.com/pricing returned HTTP 404 (accessed 2026-10-15). Product pages use "Request a demo" calls to action (e.g., https://www.dataminr.com/request-a-demo/). PRIMARY.
- **AWS Marketplace listing, sold by Carahsoft:** "This listing is for Private Offers ONLY. Please reach out for more details." It shows a placeholder "$1.00" per 12-month dimension. Source: https://aws.amazon.com/marketplace/pp/prodview-or2r3c2kzsbnq (page accessed 2026-10-15). INDEPENDENT (authorized reseller listing). **Conclusion: pricing is "contact sales" / private offer.**
- **Nonprofits:** "free and discounted access" (§2.3). PRIMARY.
- **Free commodity alerts via ICE Connect** (§2.5). INDEPENDENT (partner).
- **Independent price indicators** (not list prices):
  - FDNY renewal of First Alert licenses: "$75,399.00", "M/WBE Noncompetitive Small Purchase", vendor "Savant Financial Technologies Inc.". The license count and term are not stated. Source: https://a856-cityrecord.nyc.gov/RequestDetail/20260420047 (2026-04-27). INDEPENDENT.
  - U.S. DoW: "$318 million" over 5 years, with work through 2031 (§5). INDEPENDENT (DefenseScoop).
  - **Unverified (search snippets only; pages not opened or 403):** Buffalo Police two-year $82,800 (WGRZ); Virginia State Police, 20 First Alert licenses for $120,000 (Substack); third-party directory "starting at $15,000/year" (Zoftware Hub/GetApp); "414% ROI" Forrester TEI. The direct fetch of the AWS listing showed no Forrester claim.

---

## 8. Inconsistencies in Dataminr's own numbers (useful for teaching critical reading)

| Topic | Variants found (all PRIMARY) |
|---|---|
| LLM count | "50+" (AI Platform, partner page); "55+" (Mar 2026 release); "more than 60" (Aug/Sep 2026); "15+ ... 50+ additional" (company timeline); "100+ specialized AI models" (cyber) |
| First in-house LLM | 2015 (careers); 2019 (corporate security page); 2022 "for Gen AI" (AI Platform) |
| Archive length | "10+ year" (2026 releases); "12+ years" (AI Platform); "13+ years" (Frost & Sullivan release); "15-year" (Apr 2025 release) |
| Daily volume | "43+ Terabytes of Text" vs "43TB of text, images, and video" vs "43 TBs of public data" |
| Fortune 50 | "two-thirds of the Fortune 50" vs "Half of the Fortune 50" (same customers page) |
| Sources | 500,000+ (2022-23) to "nearly one million" (2023-25) to 1M+ (2026) to "over 1.1 million" (Splunk app) |
| Offices | "seven global offices" (2023-24 boilerplates) vs "six global offices" (footer) |
| Financing 2025 | "$250M" closed in August (Sep 29 release) vs "$300 million" completed in September (Oct 21 release) |
| CVE in lead-time claim | heading "CVE-2025-6446" vs URL "cve-2025-64446" |
| Feature availability | Watchlist Agent, Agentic Search, etc. were "upcoming" in the Sep 2026 corporate release but are presented as features on product pages |

---

## 9. Evidence map: why Dataminr is more than "a scheduled LLM agent that searches the web"

This is a synthesis of the claims above. No new sources are added here, and most points are "Dataminr says".

1. **Continuous ingestion, not periodic search.** Dataminr claims to process "1M+" public sources, including sensors, audio, transponder (ADS-B) data, and the deep/dark web. It cites "43+ Terabytes ... Every Day" and "nearly 500,000 daily events" (§3.1, §3.2). A search-engine agent sees only indexed web pages, on a schedule.
2. **Detection comes before generation.** The pipeline first detects events (multi-modal fusion, 2020 onward). ReGenAI (2024) and Intel Agents (2025) then add summaries and context automatically, "no prompts needed" (§2.7, §2.8, §3.3).
3. **Proprietary, task-specific models.** The company cites 50-60+ in-house LLMs trained on a 10-15 year event archive. The CTO explicitly contrasts this with "massive frontier models" and their "hallucinations, latency, and risk of IP loss" (§3.3).
4. **Human domain experts in a feedback loop.** Models alert on "99%" of what Dataminr alerts on, and humans handle the "nuanced and tricky" cases; analysts review agent output in cyber workflows (§3.6).
5. **Customer context.** Watchlists (topic, company, custom), geofences, location groups, asset matching (locations, third parties, travel), and internal telemetry fusion from ThreatConnect (§2.2, §4.3).
6. **Operational delivery.** Delivery runs through web, mobile, and email; APIs and SDKs; STIX/TAXII; 200+ integrations including Teams, Splunk, XSOAR, Palantir Foundry, Crisis24, and Esri; and two-way employee notification (§4.4).
7. **Governance and procurement.** ISO 42001, SOC 2 Type 2, ISO 27001/27701, and NIST 800-171 (§3.7), plus large government contracts (DoW $318M, independently confirmed) (§5).

**Limits to teach alongside:**
- Dataminr uses only publicly available information. It does not claim access to private data, except customer internal telemetry in the Cyber Defense products.
- Speed and accuracy figures are self-reported, with no independent benchmark.
- Counts are inconsistent across pages (§8).
- Predictive features forecast only "over the coming hours" from historical patterns.
- API constraints exist, such as no time-based filtering (§4.4).
- Use for protest monitoring has drawn controversy (§5).
- Pricing is opaque (§7).

---

## 10. Items marked unverified (to check if time allows)
- Exact closing date of the ThreatConnect acquisition (GovConWire 403).
- Whether PreGenAI shipped, or was renamed "Tactical/Near-Term Predictive Intelligence".
- Whether Intel Agents reached GA on the announced dates (Q3 2025 for cyber; Nov 2025 for physical).
- Current X/Twitter data access terms.
- Current employee headcount, and the 2024-26 layoff claims made on Glassdoor.
- Japanese customers, and whether the NESIC reseller deal is still active.
- Dataminr Slack integration, and a direct ServiceNow app.
- Methodology behind "99.5% accuracy", "97%/67%" customer metrics, and lead-time claims.
- Content of the Dataminr for News Microsoft Teams app (AppSource 403).
