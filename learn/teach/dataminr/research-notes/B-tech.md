# Dataminr: how real-time event detection and alerting works (evidence brief "B-tech")

Compiled 2026-10-15. Every claim below comes from a source that was actually opened: web pages through a fetch tool, PDFs downloaded and text-extracted, paper abstracts and author affiliations through the OpenAlex API, and one USGS API lookup for a timing check. Quotes are exact and 25 words or fewer. When a sentence was longer, a contiguous fragment is quoted. "Inference" or "ANALYSIS" marks my own reasoning, which is not a sourced claim.

**Source-type labels**

| Label | Meaning |
|---|---|
| PAPER | Peer-reviewed, workshop, keynote or tutorial publication with Dataminr-affiliated authors. |
| PATENT | Patent assigned to Dataminr Inc. (originally to its predecessor, EBH Enterprises). |
| ENGINEERING | Slides, talks or technical blog posts by Dataminr technical leaders. Also covers vendor case studies that quote Dataminr engineers, and third-party integration docs that describe Dataminr's alert API. The sub-label says which. |
| INTERVIEW | Journalism quoting Dataminr executives, or (The Intercept) quoting anonymous former staff. |
| MARKETING | Dataminr product pages, press releases, case studies and company blogs. **Treat numbers as company claims.** |

**Caveat that applies to everything below:** Dataminr has published no system paper on its production detection pipeline. The papers are mostly research done with interns on public datasets, and they do not prove what runs in production. The clearest look at production comes from a vendor (Aerospike) case study and from talks and posts by the Chief Scientist. Marketing figures differ from page to page (50, 55 or 60+ "LLMs"; a 10, 12 or 15-year archive; 43 or 45 TB/day). The Intercept's sources dispute the company's "97% fully AI" claim.

---

## 0. Bottom line

1. **Pipeline shape:** a streaming stack of many specialized "predictive" models (language ID, geo, entities, OCR, logo detection, classification, correlation) shrinks raw input by more than 95% *before* an alert is generated. Larger neural nets and LLMs then refine events and write briefs that keep regenerating. LLM agents ("Intel Agents") run *after* detection to add context and corroboration. Sources: Aerospike case study, the 2023 keynote by Dataminr's Chief Scientist, and the Intel Agents press releases.
2. **The historical detection core is burst/anomaly detection against baselines.** That means clustering over time windows, clusters seeded by IDF, thresholds against a moving average, and volume, sentiment and linguistic signals. Sources: the 2009-priority patent and the CEO's account of the bin Laden alert.
3. **LLMs are not the first-pass detector.** The Chief Scientist's slide says "Can't rely 'just' on LLMs (just yet)." Cost, latency, guardrails and hallucinations appear as challenges, along with "Complex and simple models", model compression and cheaper inference hardware.
4. **Multi-modal inputs:**
   - image+text fusion with cross-attention (CVPR 2020)
   - LSTM anomaly detection on ADS-B airplane transponder streams (2019)
   - OCR, transcription and logo detection in enrichment (Aerospike)
5. **Latency:**
   - The only published end-to-end pipeline figure is "less than five seconds from signal detection to client delivery" (ADS-B, 2019).
   - Lead times over news outlets are self-reported: 23 minutes (bin Laden, 2011), more than 1 hour (Aerospike), about 4 hours (Louisiana, 2021).
6. **Quality control:**
   - human "Domain Experts" label alerts in a real-time loop (2020)
   - corroboration across sources and modalities
   - research on summary faithfulness
   - no false-positive rates published
7. **Customer relevance:**
   - topic lists and watchlists, companies and sectors
   - customer locations with a "smart radius"
   - HR and travel integrations
   - third-party assets
   - The API exposes an `estimatedEventLocation` with a `probabilityRadius`.
8. **Generative and agentic features:**
   - Template-style natural-language generation of alert text (2019), then ReGenAI live briefs (2024), then Intel Agents (2025), then Agentic Corroboration, Agentic Context and Tactical Predictive Intelligence (2026).
   - Hallucination controls are **not publicly documented**. The public story is "proprietary LLMs trained on our archive", fusion of external sources and agent corroboration.

---

## 1. Detection pipeline: from raw public data to "event" to "alert"

### 1.1 Overall shape (production, best available evidence)
- **Predictive AI classifies, enriches and correlates signals; generative AI writes the briefs.**
  - Quote: "uses predictive AI to classify, enrich, and correlate signals, and uses generative AI to create live updating event briefs"
  - Source: ENGINEERING (Aerospike vendor case study quoting Dataminr's SVP Engineering and a Senior Director of Engineering) · undated, accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **Enrichment is a chain of more than 50 models, each writing metadata for the next.**
  - Quote: "The enrichment pipeline relies on more than fifty AI models, each requiring rapid reads and writes as they add metadata and pass updated signals forward."
  - Source: ENGINEERING (Aerospike case study) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **Two stages: small predictive models first, then larger networks and LLMs.**
  - Quotes: "Predictive models provide language detection, geodata, entity extraction, OCR, and logo detection." and "Larger neural networks and LLMs refine events and produce dynamic briefs."
  - Source: ENGINEERING (Aerospike case study) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **The input is cut aggressively before alerting.**
  - Quote: "Dataminr reduces raw input volume by more than 95 percent before generating alerts."
  - Source: ENGINEERING (Aerospike case study) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **An orchestrator pulls model outputs from a shared low-latency store.**
  - Quote (Tony Du, Senior Director of Engineering): "The database serves as both the sink for our AI model outputs and the source that our orchestration system pulls from in real time."
  - Source: ENGINEERING · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **The Chief Scientist frames the split as detection (predictive) versus summarization (generative).**
  - Slide text: "Predictive AI" / "Generative AI" over "Detection" / "Summarization" (slides 25 and 54).
  - Source: ENGINEERING (keynote slides by Alex Jaimes, Dataminr) · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **2016 self-description of the core loop.**
  - Quote: "Our proprietary algorithm, detects signals, clusters and patterns that are indicative of emergent events and alerts users to their occurrence via Dataminr Notifications."
  - Source: MARKETING (Dataminr sales memo to the LAPD, released through public records) · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
- **The original patent architecture has five parts: clusterer, classifier, knowledge base, rule generator and matcher.**
  - Quotes: "a clusterer for clustering micro-blog messages received over a first period of time" … "a matcher for matching the scored messages to information requests."
  - Source: PATENT US8719302B2 (EBH Enterprises, now Dataminr Inc.; priority 2009-06-09, granted 2014-05-06) · https://patents.google.com/patent/US8719302B2/en

### 1.2 Ingestion and data access
- **Content acquisition normalizes, de-duplicates, segments and transcribes inputs.**
  - Quote: "As the content acquisition system normalizes, deduplicates, segments, and transcribes global inputs"
  - Source: ENGINEERING (Aerospike case study) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **Privileged real-time social data access (Twitter firehose, at least historically).**
  - Quote: "provides the company with full access to a content stream known as the "firehose""
  - Source: INTERVIEW/MEDIA (The Intercept, Sam Biddle) · 2020-07-09 · https://theintercept.com/2020/07/09/twitter-dataminr-police-spy-surveillance-black-lives-matter-protests/
  - The 2016 Dataminr memo says the same: "Dataminr is the only company that ingests the entire Twitter firehose into its technology"
  - Source: MARKETING · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
  - Current status of X/Twitter access after 2023: **unverified** (no source opened).
- **Source types go well beyond social media.**
  - Quote: "ranging from global and regional social media platforms, blogs and web forums, local media outlets, and many others."
  - Source: ENGINEERING (Dataminr AI blog, Alex Jaimes, Chief Scientist) · 2019-10-25 · https://www.dataminr.com/blog/multi-modal-understanding-and-summarization-of-critical-events-for-emergency-response
- **Machine and sensor streams are ingested directly.**
  - Quote: "such as an on-the-ground earthquake detector"
  - Source: ENGINEERING (Jaimes blog) · 2019-10-25 · same URL as above
- **Deep and dark web sources are included.**
  - Quote: "over 1.1 million public, deep, and dark web sources"
  - Source: ENGINEERING (third-party integration doc, Elastic) · undated, accessed 2026-10-15 · https://www.elastic.co/docs/reference/integrations/dataminr_pulse

### 1.3 Filtering, relevance and "informativeness"
- **The first phase decides whether a post is relevant and informative, and what it intends.**
  - Slide text: "Phase 1: Identification": "Is the data relevant?", "Informative?", "What is the intent of the post?" (slide 76)
  - Source: ENGINEERING (Jaimes keynote) · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Typical classification tasks** listed on slide 77: "Informativeness", "Aid Detection", "Humanitarian Response", "Eyewitness Account Detection".
  - Source: ENGINEERING · 2023-11-16 · same URL
- **Platform design problem: sift thousands of points per second and alert at the right level.**
  - Quote: "has to deal with ingesting thousands of data points per second: sifting through and identifying relevant information, from different sources, in different formats"
  - Source: PAPER (WWW 2019 keynote abstract, Jaimes, Dataminr; read through OpenAlex) · 2019-05-13 · https://doi.org/10.1145/3308560.3316492 (abstract: https://api.openalex.org/works/doi:10.1145/3308560.3316492)
- **Research classifiers: transformer models for informativeness.** Dataminr researchers report that "recent advances in Deep Learning and Natural Language Processing outperform prior approaches for the task of classifying informativeness".
  - Source: PAPER (Padhee, Saha, Tetreault, Jaimes; Dataminr) · 2020-07-23 · https://arxiv.org/pdf/2007.11756

### 1.4 Enrichment: language, entities, geography, OCR, logos, knowledge graph
- **Per-signal enrichment models:**
  - Quote: "Predictive models provide language detection, geodata, entity extraction, OCR, and logo detection."
  - Source: ENGINEERING (Aerospike case study) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **Labels are written at very high rates.**
  - Quote: "Aerospike's low-latency writes allow Dataminr to add millions of labels per second"
  - Source: ENGINEERING · accessed 2026-10-15 · same URL
- **A knowledge graph is used to identify relevant events.**
  - Quote: "One of the technologies our AI platform uses to identify relevant events is a Knowledge Graph (KG)."
  - Source: MARKETING (Dataminr blog, Jason Wilcox) · 2020-09-22 · https://www.dataminr.com/resources/blog/maximizing-event-detection-for-unanticipated-major-event-cascades-like-covid-19/
- **Graph neural network tasks are applied to the knowledge graph:** "node classification, link prediction, and clustering".
  - Source: MARKETING · 2020-09-22 · same URL
- **Size of the knowledge graph (claim):**
  - Quote: "a vast knowledge graph of 3B+ entities"
  - Source: MARKETING · undated, accessed 2026-10-15 · https://resources.dataminr.com/ai/why-dataminrs-ai-platform-is-different
- **The Chief Scientist calls basic extraction still hard.**
  - Slide text: ""Extraction" of basic semantic information is STILL VERY HARD (disambiguating, … )" (slide 78)
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Related research:** cross-lingual temporal-expression extraction (XLTime) and event extraction framed as question answering.
  - Source: PAPER (Dataminr authors) · NAACL Findings 2022 · https://aclanthology.org/2022.findings-naacl.148.pdf
  - Source: PAPER (Dataminr authors) · ACL 2023 · https://aclanthology.org/2023.acl-short.143.pdf

### 1.5 Event formation: clustering many posts into one event, de-duplication, linking
- **Patent: clustering runs over multiple time windows in parallel.**
  - Quote: "This clustering process operates in parallel over the different time periods."
  - Source: PATENT US8719302B2 · priority 2009-06-09 · https://patents.google.com/patent/US8719302B2/en
- **Patent: soft clusters are seeded by rare or suddenly frequent tokens.**
  - Quotes: "soft clusters are formed using seed tokens." and "or are being used more frequently in the current time interval or both."
  - Source: PATENT · same URL
- **The Chief Scientist lists open problems in event formation.**
  - Slide 88 research topics: "Duplicate detection", "Integrating information from multiple sources in real-time", "Real-time corroboration", "Detecting sub-events in real-time".
  - Slide 79 summarization challenges: "Many (thousands, millions) of events", "Clustering", "Causality- critical".
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Product evidence that alerts are threaded into events.** The alert API exposes parent/child links (`linkedAlerts[].parentAlertId`), an `eventVolume` field and a "related alerts" call (`dataminrpulse-related-alerts-get`).
  - Sources: ENGINEERING (third-party integration docs) · ThreatConnect 2026-05-07 · https://knowledge.threatconnect.com/docs/dataminr-pulse-alerts-engine-integration-user-guide; Palo Alto XSOAR, accessed 2026-10-15 · https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse
  - How alerts are linked: **unverified**.
- **The Aerospike case study names correlation as a predictive-AI step**, quoted in 1.1. The specific algorithm is **unverified / not published**.
- **Research: sub-event clustering.**
  - Quote: "We filter out noisy and irrelevant information then cluster the noun-verb pairs and phrases so that the top-ranked ones describe the most important sub-events."
  - Note: this work is "for retrospective crisis analysis", not live detection.
  - Source: PAPER (AAAI 2020; Dataminr co-authors) · 2020-04-03 · https://doi.org/10.1609/aaai.v34i01.5370 (abstract via https://api.openalex.org/works/doi:10.1609/aaai.v34i01.5370)
- **Research: why posts must be aggregated.**
  - Quote: "Many posts in Crisis NLP contain repetitive or complementary information which needs to be aggregated (e.g., the number of trapped people and their location)"
  - Source: PAPER (W-NUT 2021; Dataminr co-authors) · 2021 · https://aclanthology.org/2021.wnut-1.28.pdf

### 1.6 Novelty, "breaking" and significance detection
- **Patent: deviation from a baseline sets the alert level.**
  - Quotes: "Baseline type specifies how the reference baselines for these thresholds are to be calculated." and "deviations above +25 are regarded as a viral level of interest."
  - The patent adds that baselines "may be simple moving averages".
  - Source: PATENT US8719302B2 · https://patents.google.com/patent/US8719302B2/en
- **The 2011 bin Laden alert used volume, sentiment and linguistic signals.**
  - Quote: "they used three signals (message volume, sentiment classification and linguistic analysis) based on 19 tweets posted before the news was confirmed."
  - Source: INTERVIEW (IJNet, Maite Fernandez, reporting CEO Ted Bailey's talk) · IJNet page date 2018-10-30 · https://ijnet.org/en/story/dataminr-news-aims-help-reporters-spot-breaking-stories-sea-tweets
- **Many signals, including metadata.**
  - Quote: "Dataminr uses about 18 different signals derived from Twitter and its metadata to help identify newsworthy information and to create customized alerts."
  - Source: INTERVIEW (IJNet) · same URL
- **Catching news in its "infancy".**
  - Quote: "Basically, the technology looks at tweets and finds patterns that can reveal breaking news when it's still in its "infancy.""
  - Source: INTERVIEW (TechCrunch, Anthony Ha) · 2014-01-29 · https://techcrunch.com/2014/01/29/dataminr-for-news/
- **Spread dynamics are used to predict virality.**
  - Quote: "The system also alerts us to stories whose social behaviour indicates that they might soon trend or go viral."
  - Source: INTERVIEW (IJNet newsroom case, Hindustan Times) · 2018-10-30 · https://ijnet.org/fr/node/1388
- **Historical archive and knowledge graph used for unanticipated events (COVID).**
  - Quote: "Dataminr's initial alert on COVID-19 was created purely by Artificial Intelligence."
  - Source: MARKETING · 2020-09-22 · https://www.dataminr.com/resources/blog/maximizing-event-detection-for-unanticipated-major-event-cascades-like-covid-19/
- **"Unknown unknowns" through topics rather than keywords** (2016 memo comparing Dataminr with Geofeedia).
  - Quote: "Dataminr users select broad topics NOT keywords"
  - Source: MARKETING · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
- **Current production novelty and significance models: unverified / not published.**

### 1.7 Geolocation
- **Location is predicted for posts without geotags.**
  - Quote: "Dataminr predicts the location of up to around 60% of the Twitter firehose in addition to providing the 2-3% of geotagged data"
  - Source: MARKETING (2016 memo) · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
- **Geodata is a production enrichment step.**
  - Quote: "Predictive models provide language detection, geodata, entity extraction, OCR, and logo detection."
  - Source: ENGINEERING (Aerospike) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **The alert schema carries an estimated location with uncertainty.** Fields: `estimatedEventLocation.name`, `.coordinates[0]`/`[1]` and `.probabilityRadius`.
  - Source: ENGINEERING (third-party integration doc, ThreatConnect) · 2026-05-07 · https://knowledge.threatconnect.com/docs/dataminr-pulse-alerts-engine-integration-user-guide
- **Contested account of user-history geolocation.**
  - Quote (anonymous former staff): Dataminr "employed the use of a "pseudo-predictive algorithm" that scrapes a user's past tweets for clues about their location"
  - Source: INTERVIEW (The Intercept) · 2020-10-21 · https://theintercept.com/2020/10/21/dataminr-twitter-surveillance-racial-profiling/
- **Research recipe: location NER plus a gazetteer.**
  - Quotes: "we further developed a BERT-based NER model tuned on Twitter data to detect location mentions." and "We use OpenStreetMap API to map location mentions to physical addresses."
  - Source: PAPER (CrisisLTLSum, Findings of EMNLP 2022; Dataminr authors) · 2022 · https://aclanthology.org/2022.findings-emnlp.400.pdf

### 1.8 Topic tagging and categorization
- **Patent: ontology-driven rules map messages to topic groups.**
  - Quote: "knowledge base 262 uses the Web Ontology Language (OWL) and, in particular version 2 which is known as OWL2."
  - The topic groups are companies, tickers, geographies and people.
  - Source: PATENT US8719302B2 · https://patents.google.com/patent/US8719302B2/en
- **Alert schema tags:** `alertTopics[].name`, `alertSectors[].name`, `alertCompanies[].name`, `alertReferenceTerms[].text`, plus `categories.path` and `companies.ticker`.
  - Sources: ENGINEERING (third-party integration docs) · https://knowledge.threatconnect.com/docs/dataminr-pulse-alerts-engine-integration-user-guide (2026-05-07); https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse (accessed 2026-10-15)

### 1.9 Corroboration across sources and modalities
- **CEO in 2014: look beyond the first post.** Bailey said the tool weighs "corroborating sources on the ground" and different "initial nodes" spreading the news. He added that it helps users "move up that confidence curve" but does not guarantee accuracy.
  - Source: INTERVIEW (TechCrunch) · 2014-01-29 · https://techcrunch.com/2014/01/29/dataminr-for-news/
- **Cross-modal corroboration example (plane crash).**
  - Quotes: transponder data "provides an initial clue that a plane is in trouble." Then: "only when a nearby eyewitness social media post is published that includes an image of smoke on the horizon"
  - Source: ENGINEERING (Dataminr AI blog, Alex Jaimes) · 2020-02-18 · https://www.dataminr.com/blog/multi-modal-fusion-ai-for-real-time-event-detection
- **Agentic corroboration (current product claim).**
  - Quote: "autonomously scans the entire publicly available information landscape for corroborating data as events unfold – from official sources to on-the-ground imagery"
  - Source: MARKETING · undated (2026 page), accessed 2026-10-15 · https://www.dataminr.com/first-alert
- **"Real-time corroboration" is still listed as a research topic** (slide 88).
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf

### 1.10 Urgency and priority scoring
- **Three alert priority tiers.**
  - Quote: "Alert priority level (Alert, Urgent, Flash)"
  - Source: ENGINEERING (third-party integration doc, Elastic) · accessed 2026-10-15 · https://www.elastic.co/docs/reference/integrations/dataminr_pulse
- **ThreatConnect example filter.**
  - Quote: "Alerts whose priority is either Urgent or Flash"
  - Source: ENGINEERING · 2026-05-07 · https://knowledge.threatconnect.com/docs/dataminr-pulse-alerts-engine-integration-user-guide
- **2016 scheme: geographic priority levels.**
  - Quote: "Alerts being delivered at the Local, National, and Global Priority Levels"
  - Source: MARKETING · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
- **How Flash/Urgent/Alert is computed: unverified / not published.**

### 1.11 Alert text and summarization
- **2019: alert text was written by natural-language generation from extracted features, in milliseconds.**
  - Quotes: "use Natural Language Generation techniques to generate a textual description that summarizes the event as an alert." Also "converting these features into text phrases that are stitched together into a cohesive human-understandable sentence."
  - Source: ENGINEERING (Jaimes blog) · 2019-10-25 · https://www.dataminr.com/blog/multi-modal-understanding-and-summarization-of-critical-events-for-emergency-response
  - Same post: "written automatically by Dataminr's AI platform in a matter of milli-seconds"
- **Summarization was already a product feature in 2016:** "Geo-prediction, User Graph Analysis, Content Summarization".
  - Source: MARKETING · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
- **2024 onward: LLM live briefs (ReGenAI).** See section 8.

### 1.12 A published research pipeline you can reproduce (RESEARCH ONLY, not confirmed production)
CrisisLTLSum (Dataminr authors, Findings of EMNLP 2022) builds event timelines from the live tweet stream in these steps:
1. location, time and keyword filters
2. entity extraction (AllenNLP NER, OpenIE, hashtags) and a location NER model fine-tuned on tweets
3. OpenStreetMap geocoding
4. **online clustering**
5. merging, de-duplication and an informativeness filter

- Quote: "This step aims to mimic the real-life scenario where tweets are sequentially fed into a clustering algorithm"
- Quote (similarity function): "a custom similarity metric that combines the similarity of the entities, the closeness of locations in the real world, and the existence of shared hashtags"
- Quote (de-duplication): "we use a simple fuzzy sequence-matching technique to remove identical or similar tweets inside each cluster."
- Quote (task definition): "given a seed tweet as the initial mention of a crisis event, extract relevant tweets with updates on the same event"
- All four quotes: PAPER · 2022 · https://aclanthology.org/2022.findings-emnlp.400.pdf

---

## 2. Small specialized models vs. large language models; cost and latency at scale

- **Production is mostly many specialized models.**
  - Quote: "The enrichment pipeline relies on more than fifty AI models"
  - Source: ENGINEERING (Aerospike) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
  - Also: "Predictive models provide language detection, geodata, entity extraction, OCR, and logo detection." (same URL)
- **LLMs come at the refinement and brief-writing stage.**
  - Quote: "Larger neural networks and LLMs refine events and produce dynamic briefs."
  - Source: ENGINEERING · same URL
- **Marketing calls the model fleet "50+ proprietary LLMs".**
  - Quote: "Powered by 50+ proprietary LLMs trained on 12+ years of data"
  - Source: MARKETING · undated, accessed 2026-10-15 · https://www.dataminr.com/ai-platform
- **Other pages give other model counts.**
  - Quote: "leveraging over 55 proprietary LLMs and 15 years of historic alerting information"
  - Source: ENGINEERING (third-party integration doc, Elastic) · accessed 2026-10-15 · https://www.elastic.co/docs/reference/integrations/dataminr_pulse
  - Quote: "Dataminr operates a constellation of more than 60 purpose-built, specialized LLMs, trained on the company's proprietary 10+ year archive of historical event data."
  - Source: MARKETING · 2026 page, accessed 2026-10-15 · https://www.dataminr.com/first-alert
  - **Inference (unverified):** the "50+ LLMs" (marketing) and "more than fifty AI models" (engineering) may be the same fleet. If so, "LLM" is used loosely for transformer models of all sizes.
  - Supporting evidence: slide 52 of the 2023 keynote puts an arrow labeled "LLMs in production at Dataminr" at the **2019** point of a model-size timeline (BERT 340M, GPT-2 1.5B), my reading of the slide image. https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Dataminr's own LLMs for generative features date from 2022.**
  - Quote: "Dataminr first created and integrated our own LLMs for Gen AI in 2022"
  - Source: MARKETING · accessed 2026-10-15 · https://www.dataminr.com/ai-platform
- **LLMs are run in-house rather than through external APIs.**
  - Quote: "Dataminr's LLMs are run internally and trained on Dataminr's unique 12+ year data and event archive"
  - Source: MARKETING (press release) · 2024-09-18 · https://www.dataminr.com/press/announcement/dataminrs-regenai-expands-to-cover-hyperlocal-events-across-the-globe-delivering-10x-more-dynamically-updating-event-briefs/
- **Chief Scientist: LLMs alone are not enough yet.**
  - Slide 65 text: "Can't rely "just" on LLMs (just yet)". LLM challenges listed: "Cost", "Performance (latency, accuracy)", "Evaluation", "Stability", "Guardrails", "Hallucinations", "Benchmarks".
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Why per-item LLM API calls are unaffordable at this volume.**
  - Slide 69 "Cost of LLM APIs" (a thought exercise quoting huyenchip.com, not Dataminr data): "in 2021, DoorDash ML models made 10 billion predictions a day. If each prediction costs $0.004, that'd be $40 million a day!"
  - Slide 64 compares "Applications / Public APIs / Open Source Models / Customized Models" on "Per Unit Cost at Scale".
  - Source: ENGINEERING · 2023-11-16 · same URL
- **Speed and cost engineering principles.**
  - Slide 72 ("Speeding up at Scale"): "Inference matters more than training", "Every millisecond counts (saves lives)", "Optimization everywhere (including cost)".
  - Slide 73: "Software: model compression, pruning", "Processes: stacking, ensembles ++", "Complex and simple models".
  - Source: ENGINEERING · 2023-11-16 · same URL
- **Inference hardware for cost and latency.**
  - Quotes (Alex Jaimes, Chief Scientist): "Optimizing for speed and cost given that scale is absolutely critical for our business." and "With AWS Inferentia, we have lowered model latency and achieved up to 9x better throughput per dollar."
  - Also: "by deploying more sophisticated DL models and processing 5x more data volume"
  - Source: ENGINEERING (vendor testimonial on AWS page) · undated, accessed 2026-10-15 · https://aws.amazon.com/machine-learning/inferentia/
- **Data-layer engineering for latency and cost.**
  - Quote: "supplying reliable sub-millisecond access to enrichment metadata and model outputs."
  - Quote (Guy Dassa, SVP Engineering): "We needed to scale beyond in-memory operations and process massive amounts of messages while adding millions of labels every second at ultra-low latency."
  - Source: ENGINEERING (Aerospike) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
  - The old setup: "Parts of the enrichment and search workflow still relied on earlier cloud native data services, such as DynamoDB for persistent storage and Redis for caching." (same URL)
- **Research on small models.** Dataminr researchers evaluated small (7B-class) LLMs as summary-quality judges ("Little Giants"; Small Models Track).
  - Source: PAPER · Eval4NLP 2023 · https://aclanthology.org/2023.eval4nlp-1.17.pdf
- **Research on lightweight generation.** Constrained decoding for query-focused summarization is used "with substantially reduced complexity".
  - Source: PAPER (SIGIR 2023; Dataminr co-author; abstract via OpenAlex) · 2023-07-18 · https://doi.org/10.1145/3539618.3591936

---

## 3. Multi-modal: images, video, audio, sensor and machine data

- **Platform-level modalities (claim).**
  - Quote: "processes over 1M public data sources—spanning text in 150 languages, images, video, sound, and sensor data."
  - Source: MARKETING · accessed 2026-10-15 · https://www.dataminr.com/ai-platform
- **Image+text fusion (research published by Dataminr).**
  - Quote: "we introduce a cross-attention module that can filter uninformative and misleading components from weak modalities on a sample by sample basis."
  - Source: PAPER (CVPR 2020; all authors at Dataminr or interning there) · arXiv 2020-04-10 · https://arxiv.org/abs/2004.04917
  - Problem framing: "users post fragmented, sometimes conflicting information in the form of image-text pairs." (same paper)
- **The same method, described for a general audience.**
  - Quote: "Our Cross Attention mechanism identifies the most valuable information in the text, in combination with the most valuable information in the image."
  - Source: ENGINEERING (Jaimes blog) · 2020-02-18 · https://www.dataminr.com/blog/multi-modal-fusion-ai-for-real-time-event-detection
  - Example: "a patch of smoke is more valuable than a patch of sky" (same post)
- **Fusion protects against weak or noisy modalities** (slide 81): "Prevents negative transfer of information between modalities on a case by case basis."
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **ADS-B transponder streams.** An LSTM plus trajectory methods detect flight incidents.
  - Quote: "a Deep Learning Recurrent Neural Network (LSTM) sequential model for early detection of incidents in flights), and trajectory-based techniques"
  - Scale: "providing real-time time-series data for about 150,000 flights"
  - Source: ENGINEERING (Jaimes blog) · 2019-10-25 · https://www.dataminr.com/blog/multi-modal-understanding-and-summarization-of-critical-events-for-emergency-response
- **Anomaly detection on time series.**
  - Quote: "detect anomalies in the time-series data"
  - Source: ENGINEERING · 2019-10-25 · same URL
  - Same post lists the toolset: "NLP, Computer Vision, audio processing and classification, and machine data stream anomaly detection".
- **OCR, logo detection and transcription in production enrichment.**
  - Quote: "Predictive models provide language detection, geodata, entity extraction, OCR, and logo detection."
  - The content acquisition step also "transcribes global inputs".
  - Source: ENGINEERING (Aerospike) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **Flight-plan deviation and cyber telemetry fusion (2025 claims).**
  - Quotes: "detect a deviation from the expected route and abrupt loss of altitude" and "correlate a tweet about a new CVE, a malware sample shared on a forum, and suspicious traffic patterns in real time"
  - Source: MARKETING (Dataminr insight page) · 2025-11-13 · https://www.dataminr.com/resources/insight/eliminate-risk-blindspots-with-multi-modal-fusion-ai/
- **Sensor provenance appears in alerts.** The field `source.channels` is described as "Source channels (e.g., sensor)".
  - Source: ENGINEERING (third-party integration doc, Elastic) · accessed 2026-10-15 · https://www.elastic.co/docs/reference/integrations/dataminr_pulse
- **Video and audio models: unverified beyond the generic mentions above.** No published architecture was found for video event detection or audio classification.

---

## 4. Latency: first public signal to customer alert

Two different numbers matter here:
- **Pipeline latency:** signal arrives, then alert. This is rarely published.
- **Lead time over news media:** what Dataminr markets.

- **The only published end-to-end pipeline figure (ADS-B use case).**
  - Quote: "all done in less than five seconds from signal detection to client delivery."
  - Source: ENGINEERING (Jaimes blog) · 2019-10-25 · https://www.dataminr.com/blog/multi-modal-understanding-and-summarization-of-critical-events-for-emergency-response
- **Alert text generation is near-instant.**
  - Quote: "written automatically by Dataminr's AI platform in a matter of milli-seconds"
  - Source: ENGINEERING · 2019-10-25 · same URL
- **Bin Laden, 2011.**
  - Quote: "Dataminr sent an alert at 10:20 p.m. Eastern time, 23 minutes before it was reported by news outlets."
  - Source: INTERVIEW (IJNet) · page date 2018-10-30 · https://ijnet.org/en/story/dataminr-news-aims-help-reporters-spot-breaking-stories-sea-tweets
- **More than an hour ahead of major outlets (no event named).**
  - Quote: "delivering some alerts more than an hour before major news outlets"
  - Source: ENGINEERING (Aerospike) · accessed 2026-10-15 · https://aerospike.com/resources/customer-stories/dataminr/
- **Louisiana petrochemical explosion, 2021-09-27.**
  - Quotes: alert "within minutes of the explosion" and earliest alert "almost four hours ahead of major news reports".
  - The first timestamped alert in the listing is 9/27/21, 11:55 PM: "Multiple injuries reported after explosion at Westlake Petrochemicals in Sulphur, LA."
  - Source: MARKETING (case study) · 2022-05-24 · https://www.dataminr.com/resources/first-alert-in-action-louisiana-chemical-plant-explosion
- **Haiti M7.2 earthquake, 2021-08-14.**
  - Quote: Dataminr lists "8/14/21, 8:39 AM" for "Earthquake felt in Port-au-Prince, Haiti."
  - Source: MARKETING · 2023-05-23 · https://www.dataminr.com/resources/case-study/first-alert-in-action-devastating-earthquake-strikes-haiti/
  - USGS origin time is 2021-08-14T12:29:08 UTC, which is 08:29 at UTC−4 (https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=us6000f65h&format=geojson, accessed 2026-10-15).
  - **Inference:** if Dataminr's timestamps are US Eastern or Haiti local time (both UTC−4 in August), the first alert came about 10 minutes after the quake. The page does not state the timezone.
- **Customer testimonial.**
  - Quote: "Dataminr was at least 20-30 minutes ahead of the local news cycle"
  - Source: MARKETING · accessed 2026-10-15 · https://www.dataminr.com/first-alert
- **Newsroom user: train crash and a hyperlocal story.**
  - Quotes: "Dataminr alerted us to these at 7:19 a.m." and "Google showed that we were at least six hours ahead of the major national or regional news outlets."
  - Source: INTERVIEW (Hindustan Times account on IJNet) · 2018-10-30 · https://ijnet.org/fr/node/1388
- **COVID-19 alert on Dec 30, 2019.**
  - Quote: "Dataminr delivered its first COVID-19 alerts to customers on Dec. 30 based on on-the-ground eyewitness"
  - Source: MARKETING · 2020-09-22 · https://www.dataminr.com/resources/blog/maximizing-event-detection-for-unanticipated-major-event-cascades-like-covid-19/
- **A general first-post-to-alert latency distribution (median, p95): unverified / not published.** All lead-time comparisons are self-reported.

---

## 5. Quality control: false positives, hoaxes, verification, humans, feedback loops

- **Human Domain Experts label alerts in a real-time loop, and the models learn from those labels.**
  - Quotes: "Dataminr's highly-talented team of Domain Experts operating in a realtime human-AI feedback loop constantly label" … "Our AI systems dynamically learn each time a new label is assigned by a Domain Expert"
  - Source: MARKETING (company blog) · 2020-09-22 · https://www.dataminr.com/resources/blog/maximizing-event-detection-for-unanticipated-major-event-cascades-like-covid-19/
- **Company claim of automation (2020).**
  - Quote: "Today, 97% of all alerts that Dataminr sends to all customers are fully created by Dataminr's AI platform"
  - The sentence ends "…without any Domain Expert or human involvement."
  - Source: MARKETING · 2020-09-22 · same URL
- **Contested by The Intercept.** Former staff say First Alert relied heavily on humans.
  - Quote: "They kept saying 'the algorithm' was doing everything," … "it was actually mostly humans."
  - The article describes "a small army of human analysts conducting endless keyword searches."
  - Source: INTERVIEW (The Intercept, anonymous sources) · 2020-10-21 · https://theintercept.com/2020/10/21/dataminr-twitter-surveillance-racial-profiling/
  - The same article reports Dataminr's statement: "97% of our alerts are generated purely by AI without any human involvement."
  - Earlier in 2020: "Through a combination of people and software, the company alerts organizations to chatter around global crises" (The Intercept, 2020-07-09) · https://theintercept.com/2020/07/09/twitter-dataminr-police-spy-surveillance-black-lives-matter-protests/
- **Human feedback loops are part of the CEO's description.**
  - Quote: "artificial intelligence, deep learning neural networks, and human-AI feedback loops"
  - Source: MARKETING (CEO blog) · 2021-03-23 · https://dataminr.com/blog/dataminr-founder-and-ceo-ted-bailey-on-the-companys-475m-growth-capital-round
  - Current page: "unmatched human oversight" (MARKETING, accessed 2026-10-15, https://resources.dataminr.com/ai/why-dataminrs-ai-platform-is-different). What this oversight involves: **unverified**.
- **Misinformation, deepfakes and hallucinations are named as research problems, not as solved ones.**
  - Slide 88: "Disinformation", "DeepFake & AI generated content detection", "Hallucination mitigation", "Attribution"
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Agents check sources and flag unknowns (2026 thought-leadership post).**
  - Quotes: "It checks multiple sources to verify if an event is genuinely happening, filtering out noise and misinformation." and "Sophisticated agents can identify what is not known, flagging gaps in intelligence that human analysts need to verify."
  - Source: MARKETING (blog by Joel Tetreault, Chief AI Officer) · 2026-01-07 · https://www.dataminr.com/agentic-ai/
- **Distribution shift forces continuous retraining and labeling** (slide 72).
  - Quote: "Shifts in distribution of input and output data over time put pressure on sampling methods and fast (continuous) training (and labeling)."
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
  - Research evidence of the same problem: "RoBERTa achieved an accuracy of 82.12% in "Sri Lanka Floods", but performed poorly on "Hurricane Harvey" and "Hurricane Maria"" (54.30% and 59.85%).
  - Source: PAPER (Dataminr) · 2020-07-23 · https://arxiv.org/pdf/2007.11756
- **Source signals appear in alerts.** The schema includes `source.verified` (boolean) and `publisherCategory`. In 2016, features included "User Analysis and Source Categorization for Alerts".
  - Sources: ENGINEERING (third-party integration doc) · https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse (accessed 2026-10-15); MARKETING · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
- **Faithfulness research on generated summaries.**
  - Quote: "model-generated summaries frequently contain unfaithful information that either contradict the source text or cannot be verified"
  - Source: PAPER (MuFaSSA, Findings of EACL 2023; Dataminr) · https://aclanthology.org/2023.findings-eacl.151.pdf
  - Companion benchmark: BUMP ("A Benchmark of Unfaithful Minimal Pairs"), PAPER (ACL 2023; Dataminr) · https://aclanthology.org/2023.acl-long.716.pdf
- **Independent user view.**
  - Quote: "There have been hits but also misses."
  - Source: INTERVIEW (Hindustan Times on IJNet) · 2018-10-30 · https://ijnet.org/fr/node/1388
- **Marketing claims with no published method:**
  - "Dataminr alerts are not noisy; when Dataminr sends users an alert, it's actionable." (MARKETING, 2016-05-04, Brennan Center PDF above)
  - ReGenAI "with 99.5% accuracy" (MARKETING, https://www.dataminr.com/ai-platform). The metric is undefined, so treat it as **unverified**.
- **False-positive or precision rates, hoax-handling procedures and customer-feedback-to-model loops: unverified / not published.**

---

## 6. Customer relevance: matching events to a customer's topics, locations, assets, people and suppliers

- **Original design: a matcher scores clustered messages against stored information requests.**
  - Quote: "a matcher for matching the scored messages to information requests."
  - Source: PATENT US8719302B2 · https://patents.google.com/patent/US8719302B2/en
- **2016: user-defined topic lists, geographic areas and geofences.**
  - Quote: "Push Alerts and Indications and Warnings across up to 1 geographic area, 1 priority level, and all Topics for one Topic List"
  - Planned feature: "Add ability to analyze multiple custom geofences simultaneously".
  - Source: MARKETING · 2016-05-04 · https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf
- **Today: watchlists of several types, and list/rule matches carried on each alert.**
  - Schema fields: `watchlistsMatchedByType.type` (examples show TOPIC; the field description mentions Company and Custom), `listsMatched[].subType` (mapped to "Alert Rule"), and `assetsMatched.thirdPartyAssets[].name` (third-party/supplier assets).
  - Sources: ENGINEERING (third-party integration docs) · https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse (accessed 2026-10-15); https://knowledge.threatconnect.com/docs/dataminr-pulse-alerts-engine-integration-user-guide (2026-05-07)
- **Customer locations, with a learned "smart radius".**
  - Quotes: "securely create, upload and manage your organization's locations and location groups" and "Smart radius for assets—based on geography, density, and 10-plus years of historical data analysis"
  - Source: MARKETING · undated, accessed 2026-10-15 · https://www.dataminr.com/pulse/physical-asset-security
- **Filtering by topic, geography and criticality.**
  - Quote: "tailor their real-time alert streams by topic, geography and criticality level"
  - Source: MARKETING · same URL
- **People: employee proximity through HR and travel integrations.**
  - Quote: "integrates into human resource and employee travel data platforms to dynamically detect when employees are in proximity to real-time events"
  - Source: MARKETING (press release) · 2023-04-05 · https://www.dataminr.com/press/dataminr-pulse-for-corporate-security-expands-to-include-new-two-way-notification-tools-and-hr-travel-integrations/
- **Cyber relevance through structured indicators on the alert.** Fields include `metadata.cyber.vulnerabilities[].id` (CVE), `.cvss`, `.products.productName`, plus addresses, ASNs, hashes and malware.
  - Sources: ENGINEERING (third-party integration docs) · https://xsoar.pan.dev/docs/reference/integrations/dataminr-pulse ; https://knowledge.threatconnect.com/docs/dataminr-pulse-alerts-engine-integration-user-guide
- **Personalization is moving into the generated briefs.**
  - Quote: "automatically personalize live information briefs for individual clients based on their specific risk footprint"
  - Source: MARKETING · 2024-09-18 · https://www.dataminr.com/press/announcement/dataminrs-regenai-expands-to-cover-hyperlocal-events-across-the-globe-delivering-10x-more-dynamically-updating-event-briefs/
  - Current page: "ReGenAI Tailored Live Briefs" describe an event's "potential impact on a customer's organization" · https://www.dataminr.com/first-alert (accessed 2026-10-15)
- **"What's relevant, to whom?" is an open problem** (slide 89).
  - Slide text: "Different stakeholders at different levels. What's relevant, to whom?"
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Entity-resolution method (matching company or supplier names to alerts) and how the smart radius is computed: unverified / not published.**

---

## 7. Scale numbers, by date

All numbers are company claims unless the type says otherwise.

| Date | Claim | Exact quote (excerpt) | Type | URL |
|---|---|---|---|---|
| 2016-05-04 | ~500M tweets/day analyzed; 76 languages | "determine the significance of over 500 million Tweets per day" / "Limited to 45 languages (Dataminr supports 76)" | MARKETING | https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf |
| 2019-05-13 | thousands of data points per second | "ingesting thousands of data points per second" | PAPER (keynote abstract) | https://doi.org/10.1145/3308560.3316492 |
| 2019-10-25 | billions of data units/day; alerts drawn from more than 10,000 sources; tens of millions of aircraft points/day | "processing billions of public data units every day" / "delivered alerts from more than 10,000 different public data sources" / "consumes tens of millions of data points per day" | ENGINEERING | https://www.dataminr.com/blog/multi-modal-understanding-and-summarization-of-critical-events-for-emergency-response |
| 2020-02-18 | hundreds of thousands of sources | "billions of public data inputs per day in a wide range of formats and from hundreds of thousands distinct data sources" | ENGINEERING | https://www.dataminr.com/blog/multi-modal-fusion-ai-for-real-time-event-detection |
| 2020-09-22 | 150,000+ sources | "ingests and processes 150,000+ distinct public data sources" | MARKETING | https://www.dataminr.com/resources/blog/maximizing-event-detection-for-unanticipated-major-event-cascades-like-covid-19/ |
| 2021-03-23 | 150,000 sources | "About 95 percent of the 150,000 data sources that Dataminr integrates into our platform" | MARKETING | https://dataminr.com/blog/dataminr-founder-and-ceo-ted-bailey-on-the-companys-475m-growth-capital-round |
| 2024-04-18 | 1M+ sources | "detected in more than 1 million public data sources" | INTERVIEW/MEDIA (SiliconANGLE) | https://siliconangle.com/2024/04/18/dataminr-launches-regenai-enhance-real-time-event-analysis-generative-ai/ |
| 2025-04-28 | text volume framed in human effort | "It would take 30,000 people working 24/7 to process only one percent of just the text data Dataminr ingests every day." | MARKETING | https://www.dataminr.com/press/dataminr-unveils-agentic-ai-roadmap |
| undated (2026 page) | 1M+ sources, 150 languages, 43+ TB text/day, ~500k events/day, 50+ LLMs | "43+ Terabytes of Text Processed Every Day" / "detecting nearly 500,000 daily events, risks and threats" | MARKETING | https://www.dataminr.com/ai-platform |
| undated | 220+ countries | "over 220 countries and territories" | MARKETING | https://www.dataminr.com/ai-platform |
| undated | billions of signals/day; millions of labels/second; >95% reduction | "Dataminr now handles billions of signals per day across text, image, video, audio, and sensor modalities." | ENGINEERING (vendor case study) | https://aerospike.com/resources/customer-stories/dataminr/ |
| undated | 1.1M sources, 45 TB/day, 55 LLMs | "processes more than 45 terabytes of daily public data, leveraging over 55 proprietary LLMs" | ENGINEERING (third-party doc) | https://www.elastic.co/docs/reference/integrations/dataminr_pulse |
| 2026 page | 60+ LLMs; 43 TB/day | "more than 60 purpose-built, specialized LLMs" / "over 43TB per day" | MARKETING | https://www.dataminr.com/first-alert |
| undated | 3B+ entity knowledge graph | "a vast knowledge graph of 3B+ entities" | MARKETING | https://resources.dataminr.com/ai/why-dataminrs-ai-platform-is-different |

Sanity check (ANALYSIS): "billions per day" works out to tens of thousands of items per second on average (1B ÷ 86,400 s ≈ 11.6k/s). That fits the same order of magnitude as the "thousands of data points per second" in the keynote abstracts.

**Unverified:** BigDATAwire (2025-02-27) reportedly quotes Chief Partner Officer Matt Harrell giving 43 TB/day, 400,000 alerts/day and "950 years" for one human to read one day of data. The page returned HTTP 403, so I could not verify these figures.

---

## 8. Generative and agentic features, and how they are grounded

**Timeline**
- **2016:** "Content Summarization" listed as a product feature (MARKETING, 2016-05-04, https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf).
- **2019:** alert text produced by template-like natural-language generation from extracted features. See 1.11 (ENGINEERING, 2019-10-25).
- **2022:** "Dataminr first created and integrated our own LLMs for Gen AI in 2022" (MARKETING, https://www.dataminr.com/ai-platform).
- **2024-04 (ReGenAI launch):**
  - Quote: "automatically regenerates text descriptions as events unfold"
  - It "uses predictive AI to analyze and synthesize key developments".
  - Source: INTERVIEW/MEDIA (SiliconANGLE, Duncan Riley) · 2024-04-18 · https://siliconangle.com/2024/04/18/dataminr-launches-regenai-enhance-real-time-event-analysis-generative-ai/
- **2024-09 (ReGenAI expanded to hyperlocal events):**
  - Quotes: "Dataminr's ReGenAI is powered by proprietary purpose-built large language models (LLMs)" and "slashing their event analysis and summary time from over 30 minutes on average to under 90 seconds"
  - Source: MARKETING · 2024-09-18 · https://www.dataminr.com/press/announcement/dataminrs-regenai-expands-to-cover-hyperlocal-events-across-the-globe-delivering-10x-more-dynamically-updating-event-briefs/
- **2025-04 (Intel Agents, private beta, launched first in Pulse for Cyber Risk):**
  - Quotes: "Intel Agents are tasked with autonomously determining the additional context that's needed" and "Intel Agents are currently available in private beta for a select group of Dataminr customers."
  - Roadmap: "Client-Tailored Context", then "PreGenAI" in 2026 ("In 2026, Dataminr's AI innovation will take another leap forward with the launch of PreGenAI").
  - Source: MARKETING · 2025-04-28 · https://www.dataminr.com/press/dataminr-unveils-agentic-ai-roadmap
- **2025-09 (Intel Agents for physical-world events):**
  - Quotes: "Intel Agents continuously ask and answer hundreds of questions about every event, threat, and risk" and "Augmenting Dataminr's ReGenAI Live Briefs, Intel Agents write out this real-time context within the live Dataminr product."
  - Source: MARKETING · 2025-09-29 · https://www.dataminr.com/press/announcement/dataminr-intel-agents-for-the-physical-world/
- **2026 (current First Alert page):** "Agentic Corroboration", "Agentic Context", "ReGenAI Tailored Live Briefs" and "Tactical Predictive Intelligence". The predictive feature is quoted as follows.
  - Quote: "predict potential evolutions of how an event may unfold over the coming hours based on historical event patterns in Dataminr's 10+ year event archive."
  - Source: MARKETING · accessed 2026-10-15 · https://www.dataminr.com/first-alert
- **API evidence of these layers.** Each alert carries versioned live briefs (`liveBrief[].version`, `.timestamp`, `.summary`) and agent output (`intelAgents[].summary`, `intelAgents[].discoveredEntities`). It also carries the originating public post (`publicPost.href`, `.sourceName`, `.channels`).
  - Source: ENGINEERING (third-party integration doc) · 2026-05-07 · https://knowledge.threatconnect.com/docs/dataminr-pulse-alerts-engine-integration-user-guide

**Grounding and hallucination control (what is and is not documented)**
- **The models are in-house and trained on the event archive (claim).**
  - Quote: "Intel Agents are powered solely by Dataminr's internally developed and operated LLMs"
  - Source: MARKETING · 2025-04-28 · https://www.dataminr.com/press/dataminr-unveils-agentic-ai-roadmap
- **Retrieval sources (claim).**
  - Quotes: "Intel Agents seamlessly fuse relevant information from external public sources" (2025-04-28, same URL). Agents also "searches across Dataminr's 12+ year event and public data archive" and "scans the broader public internet at large".
  - Source: MARKETING · 2025-09-29 · https://www.dataminr.com/press/announcement/dataminr-intel-agents-for-the-physical-world/
- **Generation starts from an event the predictive stack has already detected.** The predictive stack has already filtered and enriched it, and it is tied to source posts. The Aerospike case study says this "ensures only the most relevant signals reach downstream predictive and generative AI models." (ENGINEERING, https://aerospike.com/resources/customer-stories/dataminr/)
  - **Inference:** this "detect first, then generate from evidence" design is the main structural guard against invented events. It is my reading of the architecture, not a published guardrail.
- **The Chief Scientist named hallucinations and guardrails as challenges** (slide 65), and "Hallucination mitigation" and "Attribution" as research topics (slide 88).
  - Source: ENGINEERING · 2023-11-16 · https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
- **Research on measuring summary faithfulness:** MuFaSSA (EACL Findings 2023) and BUMP (ACL 2023). See section 5. These are research results; their production use is **unverified**.
- **Undefined accuracy claim:** ReGenAI "with 99.5% accuracy" (MARKETING, https://www.dataminr.com/ai-platform). The method is **unverified**.
- **Published guardrails, citation-per-sentence, human review of briefs and hallucination rates: unverified / not published.**

---

## 9. Synthesis for the learner (ANALYSIS, not sourced claims)

What Dataminr solves that a scheduled "LLM agent that searches the web" would not.

| Hard problem | What Dataminr does (evidence above) | Why a scheduled web-search agent falls short |
|---|---|---|
| **Data access before it is "news"** | Firehose-level social access (Intercept 2020; 2016 memo), 1M+ sources including deep and dark web, raw sensor streams such as ADS-B (§1.2, §3) | A search engine shows what has already been crawled and ranked. It contains no sensor time series, and first eyewitness posts are often not indexed yet. |
| **Continuous, low latency** | Streaming pipeline; "less than five seconds from signal detection to client delivery"; "Every millisecond counts" (§4, §2) | A cron-style schedule adds up to one full interval of delay, on top of search-index lag and agent runtime. |
| **Throughput at affordable cost** | More than 50 cheap specialized models cut more than 95% of volume before LLMs; Inferentia; "Can't rely 'just' on LLMs" (§2) | One LLM call per item at billions of items/day is unaffordable (slide 69's $40M/day exercise). An agent can only read a tiny sample. |
| **Knowing what is new or abnormal** | Baselines over time windows and moving averages, IDF-seeded clusters, a 10–15-year archive and knowledge graph (§1.6) | A stateless run has no baseline, so it cannot tell a spike from normal chatter or a new event from an old one. |
| **Event formation and de-duplication** | Online clustering, linked alerts with parent IDs, versioned live briefs (§1.5, §8) | Separate runs rediscover the same story. Without an event store, de-duplicating and threading updates must be built from scratch. |
| **Geolocation under uncertainty and asset matching** | Location prediction for non-geotagged posts, `probabilityRadius`, "smart radius" by density, asset and supplier lists (§1.7, §6) | Matching place names in text is brittle. There is no calibrated radius and no customer asset inventory. |
| **Verification and misinformation** | Cross-source and cross-modal corroboration, source categories and `source.verified`, human Domain Experts in the loop (§1.9, §5) | The agent trusts whatever ranks highly in search. Seeing and checking eyewitness media at minute zero is out of reach, and no labels feed back into it. |
| **Distribution shift and evaluation** | Continuous labeling and retraining (slide 72), faithfulness metrics research (§5) | There is no ground-truth loop, so quality drifts silently. |
| **Multi-modal at scale** | OCR, transcription, logo detection, image-text cross-attention, LSTM on transponder data (§3) | A text-first agent would need a costly multimodal call per item and has no time-series anomaly detection. |
| **Delivery and integration** | Push alerts with Flash/Urgent/Alert tiers and a structured schema for SIEM/SOAR/GIS tools (§1.10, §6) | Output is a report, not a stream of machine-actionable alerts. |

**Where a scheduled agent does resemble Dataminr:** Dataminr's own LLM agents (Intel Agents: Agentic Context and Agentic Corroboration) run *after* an event is detected. They search Dataminr's archive and the public internet to add context (§8). A scheduled Claude Code routine is therefore a reasonable model of that **last-mile enrichment and briefing layer**, but not of the **detection layer**. Detection depends on stream access, cheap models, baselines and state.

**Honest counterpoint:** part of Dataminr's edge historically came from **data deals** (privileged firehose access) and **human labor** (Domain Experts; the extent is disputed by The Intercept), not only from algorithms.

---

## 10. The 3 best primary technical sources found

1. **Aerospike customer story on Dataminr** (quotes Dataminr's SVP Engineering and a Senior Director of Engineering), undated, accessed 2026-10-15. https://aerospike.com/resources/customer-stories/dataminr/
   - Why it matters: the clearest public description of the *production* pipeline. It covers content acquisition, more than 50 enrichment models (language, geo, entities, OCR, logos), more than 95% reduction before alerting, then LLM briefs, plus the real infrastructure bottlenecks (Redis/DynamoDB to Aerospike, millions of labels per second).
2. **Alex Jaimes (Chief Scientist), "AI in Real-Time: From Emergency Response to Corporate Security", CEWIT keynote slides**, 2023-11-16. https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf
   - Why it matters: unusually candid on why LLMs are not used everywhere (cost, latency, guardrails, hallucinations), on scaling principles (inference over training, continuous retraining, simple plus complex models) and on open problems (de-duplication, real-time corroboration, disinformation, attribution).
3. **US Patent 8,719,302 B2, "Methods, apparatus and software for analyzing the content of micro-blog messages"** (EBH Enterprises, now Dataminr; priority 2009). https://patents.google.com/patent/US8719302B2/en
   - Why it matters: the only fully specified, end-to-end detection algorithm from Dataminr. It covers multi-window clustering with IDF-seeded soft clusters, an ontology-driven classifier, deviation from moving-average baselines (elevated/viral) and matching to user requests. It is a buildable mental model of "burst detection then event then alert".

Also worth reading:
- Jaimes, 2019 ADS-B and natural-language-generation post (end-to-end example with a stated latency of under 5 seconds): https://www.dataminr.com/blog/multi-modal-understanding-and-summarization-of-critical-events-for-emergency-response
- CrisisLTLSum, a reproducible online-clustering pipeline: https://aclanthology.org/2022.findings-emnlp.400.pdf
- CVPR 2020 multimodal fusion paper: https://arxiv.org/abs/2004.04917

---

## 11. Unverified items, sources I could not open, and gaps

- **Not found:** a Dataminr system or architecture paper, or any engineering blog on stream processing (Kafka/Flink etc.). Stream-processing technology choices are **unverified**.
- **Patents:** a Google Patents assignee search for "Dataminr" (https://patents.google.com/xhr/query?url=assignee%3DDataminr%26oq%3Dassignee%3ADataminr&exp=, accessed 2026-10-15) returned only the 2009-priority EBH family (e.g., US9323826B2, US8719302B2). No newer Dataminr patents were found.
- **Could not open (HTTP 403/404 or blocked):**
  - BigDATAwire 2025-02-27 interview with Matt Harrell
  - USA Today 2014-01-29 article on Dataminr for News
  - Dataminr's 2026-09 "Dataminr Advanced for Corporate Security" (GSX) release
  - ACM Digital Library pages (abstracts were read through OpenAlex instead)
- **Not found:**
  - a CTO interview
  - the "Cascading Networks" paper (ICML AI for Social Good '19, cited on slides 82–83)
  - definitions of how Flash/Urgent/Alert are computed
  - precision or false-positive rates
  - first-post-to-alert latency distributions
  - documented hallucination guardrails
  - customer-feedback-to-model loops
- **Leadership note:**
  - Alex Jaimes is "Chief Scientist and SVP of AI" in the 2019–2020 posts and "Chief AI Officer" in the 2025-04-28 release.
  - Joel Tetreault is "Chief AI Officer" on the 2026-01-07 blog. The change between those dates is **unverified**.
- **The web-search quota for this session ran out near the end.** A few late leads were not chased (e.g., the 2026 GSX release text, the "Context Agents" naming from March 2025).

---

## 12. Dataminr-affiliated research (affiliation checked in the PDF or OpenAlex)

The institution listing is OpenAlex "Dataminr (United States)", 86 works: https://api.openalex.org/works?filter=institutions.id:I4401726866 (accessed 2026-10-15). Most relevant:
- Multimodal Categorization of Crisis Events in Social Media (CVPR 2020): https://arxiv.org/abs/2004.04917
- Unsupervised Detection of Sub-Events in Large Scale Disasters (AAAI 2020): https://doi.org/10.1609/aaai.v34i01.5370
- Clustering of Social Media Messages for Humanitarian Aid Response during Crisis (2020): https://arxiv.org/pdf/2007.11756
- SD2SG: Detecting Important Subevents via Dynamic Semantic Graphs (W-NUT 2021): https://aclanthology.org/2021.wnut-1.28.pdf
- Real-time Event Detection for Emergency Response (KDD 2021 tutorial, Jaimes and Tetreault): https://www.cs.rochester.edu/~tetreaul/kdd2021-tutorial.html
- XLTime, cross-lingual temporal expression extraction (NAACL Findings 2022): https://aclanthology.org/2022.findings-naacl.148.pdf
- CrisisLTLSum (Findings of EMNLP 2022): https://aclanthology.org/2022.findings-emnlp.400.pdf
- Event Extraction as Question Generation and Answering (ACL 2023): https://aclanthology.org/2023.acl-short.143.pdf
- BUMP, faithfulness metric benchmark (ACL 2023): https://aclanthology.org/2023.acl-long.716.pdf
- Multi-View Source Ablation for Faithful Summarization (EACL Findings 2023): https://aclanthology.org/2023.findings-eacl.151.pdf
- Little Giants: Small LLMs as Evaluation Metrics (Eval4NLP 2023): https://aclanthology.org/2023.eval4nlp-1.17.pdf
- FuturED 2024 workshop (co-chaired by Dataminr): "Despite recent advances in Large Language Models (LLMs) and Generative AI, ED remains a challenging problem" · https://aclanthology.org/2024.futured-1.0.pdf
- CEHA: Conflict Events in the Horn of Africa dataset (2024): https://arxiv.org/pdf/2412.13511
- Keynote abstracts by Jaimes:
  - WWW 2019: https://doi.org/10.1145/3308560.3316492
  - WSDM 2022: https://doi.org/10.1145/3488560.3510013
  - ACM MM 2023, "specifically discussing how LLMs can be deployed at scale": https://doi.org/10.1145/3581783.3613911
