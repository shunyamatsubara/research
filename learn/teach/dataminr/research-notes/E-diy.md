# E — Barriers to a "do-it-yourself Dataminr" built from a scheduled LLM agent

Research date: 2026-10-15. Question: what can't a general LLM agent on a schedule (for example a Claude Code routine that runs every hour, searches the web and writes a report) do when you use it as a real-time event-detection and alerting system, and why not?

## How to read this file

- Every claim has a **source URL**, a **date** (publication date, or "accessed 2026-10-15" when the page shows no date), a **short exact quote of 25 words or fewer**, and a **source type**.
- Source types:
  - **OFFICIAL**: the platform's or vendor's own page.
  - **ACADEMIC**: a paper or research lab.
  - **JOURNALISM**: a news outlet.
  - **BLOG**: a personal blog, vendor blog, Hacker News post or NGO memo.
  - **OBSERVED**: a test I ran myself with this session's tools on 2026-10-15. These are single anecdotal tests, not publications. I list them separately so they are not mistaken for published evidence.
- **Analysis** marks my own reasoning or arithmetic built from the sourced numbers. **Unverified** marks claims I could not confirm from a source I opened.
- Some pages blocked the tools: redditinc.com and reddithelp.com blocked WebFetch, and bbc.com, reuters.com, apnews.com and fastcompany.com could not be read. I read Reddit's pages with curl or the help-center JSON API instead. Where I could not open a page, the claim is marked unverified.
- Partway through, the session hit its **web-search cap**: "limit: 200 WebSearch calls per turn, shared by every agent in it". After that I could only fetch URLs I already knew, so a few follow-up checks stay open (listed in §7).

---

## Summary: the seven barriers

1. **Data access.** Of the major platforms, only Bluesky offers an open, full, real-time stream to anyone. X sells its firehose only on custom-priced Enterprise contracts. Its self-serve tier is capped at 3 million post reads per month. Reddit, Meta and TikTok require approval or a research-only, non-profit status. (§1)
2. **Permitted use.** X's Developer Agreement bars surveillance and "monitoring sensitive events" such as protests without written approval. Telegram's API terms bar using its data for the "deployment of artificial intelligence". Reddit and TikTok forbid commercial use without a separate agreement or at all. (§1)
3. **Latency.** Claude Code routines cannot run more often than once an hour. Search indexes lag behind events: in my test, nothing appeared for a moderate earthquake about 3 hours after it happened. Real-time streams deliver posts in about 4–5 seconds, and a USGS study detected about 75% of felt earthquakes from tweets within 2 minutes. (§2)
4. **Visibility.** X's robots.txt blocks every crawler except Google and Bing, and Anthropic's bots obey robots.txt. In my tests the agent's search tool refused Reddit, Threads, Reuters, AP, AFP, BBC, NYT, WSJ, FT and NHK as domain filters. Fetching an x.com page returned HTTP 402. (§2)
5. **No baseline.** Spotting an event means comparing current volume with a normal level, for example with a short-term/long-term average or burst models. An hourly search snapshot has no counts over time to compare against. (§4)
6. **Scale and cost.** Classifying 10M–100M posts a day with the cheapest current Claude model costs about **$81–$2,100 per day** on paper. Rate limits, monthly spend caps and batch latency bind before price does. Buying the data costs far more than classifying it: X's per-post price would be $50,000/day for 10M posts, if the cap allowed that volume. Fine-tuned small classifiers usually beat zero-shot LLMs on crisis-tweet classification. (§3, §4)
7. **Accuracy.** LLMs misrepresent news often: in one 2025 study, 45% of AI-assistant answers about news had a significant issue. They have hallucinated breaking-news summaries and contradicted themselves within a minute during a war. DIY builders report deduplication, staleness and reliability problems. (§4, §5)

---

## 1. Social media data access, 2025–2026

### 1.0 Summary table (Analysis, built from the evidence below)

| Platform | Can a small company get near-real-time full-stream access? | Published price | Main restrictions |
|---|---|---|---|
| X | **No, unless it buys a custom Enterprise contract.** The pay-per-use tier gives one filtered-stream connection with 1,000 rules, capped at 3M post reads per month. | $0.005 per post read (pay-per-use). Enterprise price is not public; "$42,000+/month" is unverified. | No surveillance or sensitive-event monitoring without written approval. Government users need Enterprise. No training of foundation models. Limits on redistributing post IDs. |
| Reddit | **No.** Access needs explicit approval. The free tier allows 100 queries/min. Commercial use needs a separate agreement. | Not published. The 2023 reported rate was $0.24 per 1,000 calls. | Approval required. Commercial use needs written approval. Stored data should be deleted within 48 h. No AI training without permission. |
| Meta (Facebook, Instagram) | **No.** Content Library is for academic or non-profit researchers only. CrowdTangle shut down in August 2024. | Free for eligible researchers. | Non-profit affiliation, a cleanroom environment, and at most 500k records per 7 days. Data freshness is unverified. |
| Telegram | **Partly.** The MTProto API is free and a user account can read public channels it joins, up to 500 channels for a non-Premium user. Bots only see channels they are members of. | Free. | The terms bar using Telegram data for AI "development, enhancement or deployment". Unofficial clients are watched, and FLOOD_WAIT limits and bans apply. |
| TikTok | **No.** The Research API is for academic or non-profit researchers only, at 1,000 requests/day, and new videos take up to 48 h to appear. | Free for approved researchers. | Non-commercial use only. Data must be refreshed every 30 days. No sharing with third parties. |
| Bluesky | **Yes.** The firehose and Jetstream are open and need no authentication. | Free; you pay only your own bandwidth and compute. | Small audience (about 800k posts/day in May 2024, per one blog). Jetstream data is not self-authenticating. |

### 1.1 X (Twitter)

- **X1. Self-serve access is pay-per-use only.**
  - Source: https://docs.x.com/x-api/getting-started/pricing · accessed 2026-10-15 · OFFICIAL
  - Quote: "The X API uses **pay-per-usage** pricing. No subscriptions—pay only for what you use."
- **X2. Reading a post costs $0.005.**
  - Source: same page · accessed 2026-10-15 · OFFICIAL
  - Quote: "Posts: Read | $0.005 per resource"
- **X3. Self-serve reading is capped at 3M posts per month; more requires Enterprise.**
  - Source: same page · accessed 2026-10-15 · OFFICIAL
  - Quote: "Pay-per-usage plans are capped at 3 million Post reads per monthly billing cycle. If you need higher volume, upgrade to an Enterprise plan"
  - Arithmetic (Analysis):
    - 3,000,000 ÷ 30 days = 100,000 posts/day, or 3,000,000 ÷ (30 × 86,400 s) ≈ 1.16 posts/s.
    - Cost of the full cap: 3,000,000 × $0.005 = **$15,000/month**.
    - Illustration, with an assumption: if the 1% sample stream carries about 50 posts/s (X says "many dozens", see X7), the full stream is about 5,000 posts/s, or 432M posts/day. The cap would then be 100,000 ÷ 432,000,000 ≈ **0.023%** of the full stream.
- **X4. Filtered Stream delivers posts in seconds.**
  - Source: https://docs.x.com/x-api/posts/filtered-stream/introduction · accessed 2026-10-15 · OFFICIAL
  - Quote: "Filtered Stream prioritizes data hydration and delivery, with approximately 4-5 seconds of P99 latency."
- **X5. On pay-per-use, Filtered Stream allows one connection and 1,000 rules; Enterprise gets more.**
  - Source: same page · OFFICIAL
  - Quote (table, pay-per-use vs Enterprise): "Rules per project | 1,000 | 25,000+ … Connections | 1 | Multiple"
- **X6. Filtered Stream rate limits.**
  - Source: https://docs.x.com/x-api/fundamentals/rate-limits · accessed 2026-10-15 · OFFICIAL
  - Quote: "1 connection; 1000 rules; 1024 rule length; 250 posts/sec"
- **X7. The 1% and 10% sample streams ("volume streams") are Enterprise-only.**
  - Source: https://docs.x.com/x-api/posts/volume-streams/introduction · accessed 2026-10-15 · OFFICIAL
  - Quotes: "To use these APIs, you must first set up an account with our enterprise sales team." and "Even the 1% stream can emit many dozens of Posts every second"
- **X8. The full firehose is Enterprise-only, at custom prices.**
  - Source: https://docs.x.com/enterprise-api/introduction · accessed 2026-10-15 · OFFICIAL
  - Quotes: "Stream 100% of public posts in real-time. No sampling, no limits." and "…dedicated technical support and custom pricing."
- **X9. The lowest-latency stream, Powerstream, is a premium Enterprise product.**
  - Source: https://docs.x.com/x-api/powerstream/introduction · accessed 2026-10-15 · OFFICIAL
  - Quote: "The Powerstream API is a premium offering available under select Enterprise plans."
- **X10. Enterprise price: unverified.** A vendor blog lists Enterprise as "Now starts at $42,000+/month" but cites no source, and X publishes no Enterprise price.
  - Source: https://zernio.com/blog/twitter-api-pricing · published 2026-03-28, updated 2026-05-07 · BLOG
  - Treat this figure as **unverified**.
- **X11. Commercial use still requires the Enterprise plan.**
  - Source: https://opentermsarchive.org/en/memos/x-replaces-its-dollar200-entry-level-api-plan-with-a-pay-per-use-model/ · 2026-04-28 · BLOG (memo from Open Terms Archive, an NGO that tracks terms of service)
  - Quote: "Commercial uses still have to subscribe to the pre-existing "Enterprise plan"."
- **X12. Surveillance and intelligence gathering are banned without written approval.**
  - Source: https://docs.x.com/developer-terms/agreement · "Last Updated: April 27, 2026" · OFFICIAL
  - Quote: "(a) conducting or providing surveillance or gathering intelligence, including but not limited to investigating or tracking X users or X Content"
- **X13. Monitoring sensitive events is banned under the same clause.**
  - Source: same page · OFFICIAL
  - Quote: "(c) monitoring sensitive events (including but not limited to protests, rallies, or community organizing meetings)"
- **X14. Government users need Enterprise, and agencies whose mission is surveillance are barred.**
  - Source: same page · OFFICIAL
  - Quotes: "you must apply for (or already subscribe to) an Enterprise plan" and "available to any Government End User whose primary function or mission includes conducting surveillance or gathering intelligence"
- **X15. X restates the surveillance ban explicitly, including alerting.**
  - Source: https://docs.x.com/developer-terms/more-on-restricted-use-cases · accessed 2026-10-15 · OFFICIAL
  - Quotes: "we prohibit the use of X data and the X APIs by any entity for surveillance purposes" and "tracking, alerting, or monitoring sensitive events (such as protests, rallies, or community organizing meetings)"
- **X16. Training a foundation model on X content is banned.**
  - Source: https://docs.x.com/developer-terms/agreement · April 27, 2026 · OFFICIAL
  - Quote: "(k) use the X API or X Content to fine-tune or train a foundation or frontier model"
- **X17. How X defines commercial use (for apps designated non-commercial).**
  - Source: same page · OFFICIAL
  - Quote: "“Commercial Use” means any use of the Licensed Material or access to the X API: (a) by or for a business"
- **X18. Redistribution of post IDs is capped.**
  - Source: https://docs.x.com/developer-terms/policy · accessed 2026-10-15 · OFFICIAL
  - Quote: "you may not distribute more than 1,500,000 Post IDs to any entity … within any 30 day period"
- **X19. An LLM can read X posts through xAI's X Search tool, at the same per-post price.** It is a search tool, not a stream.
  - Source: https://docs.x.ai/developers/tools/x-search · accessed 2026-10-15 · OFFICIAL
  - Quote: "X Search is billed at $5 per 1k posts fetched and $10 per 1k user profiles fetched, in addition to token costs"

### 1.2 Reddit

- **R1. Commercial use and research above rate limits need a separate agreement.**
  - Source: https://redditinc.com/policies/data-api-terms · "Effective June 19, 2023. Last Revised July 20, 2026" · OFFICIAL
  - Quote: "If you are interested in using the Data APIs for commercial purposes … then you will need to enter into a separate agreement with Reddit."
- **R2. Fees are set at Reddit's discretion.**
  - Source: same page · OFFICIAL
  - Quote: "Reddit reserves the right to charge fees for future use or access to the Data APIs, rates to be determined at Reddit's sole discretion."
- **R3. Data may only be used for the approved use case.**
  - Source: same page · OFFICIAL
  - Quote: "use or retain any User Content, Materials, or data accessed through the Data APIs beyond your approved use case"
- **R4. All API access needs explicit approval (Responsible Builder Policy).**
  - Source: https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy · created 2025-10-28, edited 2026-10-05 (from the help center's API metadata) · OFFICIAL
  - Quote: "You must request access and get explicit approval before accessing any Reddit data through our API"
- **R5. Commercial use needs written approval.**
  - Source: same page · OFFICIAL
  - Quote: "If you'd like to use Reddit data for commercial purposes, you’ll need to get explicit written approval."
- **R6. The free tier is 100 queries per minute, and stored data should be deleted quickly.**
  - Source: https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki · edited 2026-05-11 · OFFICIAL
  - Quotes: "100 queries per minute (QPM) per OAuth client id" and "we strongly recommend routinely deleting any stored user data and content within 48 hours."
- **R7. The only public price is a 2023 report.** Current prices are not published, so treat this figure as historical (unverified for 2026).
  - Source: https://bgr.com/tech/apollo-for-reddit-is-shutting-down-later-this-month-due-to-new-api-pricing/ · 2023-06-08 · JOURNALISM
  - Quote: "the platform said it would charge $0.24 for 1,000 API calls."
- **R8. Unregistered scripts are blocked.** A plain curl request for reddit.com/robots.txt returned a block page.
  - Source: https://www.reddit.com/robots.txt · OBSERVED 2026-10-15
  - Quote: "Your request has been blocked due to a network policy."

### 1.3 Meta (Facebook and Instagram): Content Library

- **M1. CrowdTangle, the old public-content monitoring tool, is gone.**
  - Source: https://transparency.meta.com/researchtools/other-data-catalogue/crowdtangle/ · updated 2024-08-16 · OFFICIAL
  - Quote: "As of August 14, 2024, CrowdTangle is no longer available."
- **M2. Content Library access requires academic or non-profit affiliation.**
  - Source: https://transparency.meta.com/researchtools/meta-content-library/ · updated 2026-04-30 · OFFICIAL
  - Quote: "Affiliation with an academic institution or other non-university organization … which operates as a not-for-profit entity"
- **M3. Businesses are excluded.**
  - Source: https://developers.facebook.com/docs/content-library-and-api/get-access · accessed 2026-10-15 · OFFICIAL
  - Quote: "A not-for-profit institution (in other words, not a business whose sole purpose is to make a profit)."
- **M4. Volume is capped per researcher.**
  - Source: https://developers.facebook.com/docs/content-library-and-api/support/faqs · accessed 2026-10-15 · OFFICIAL
  - Quote: "one researcher can retrieve a maximum of 500,000 data records per 7-day rolling window."
- **M5. Analysis happens in a controlled cleanroom.**
  - Source: https://transparency.meta.com/researchtools/meta-content-library/ · OFFICIAL
  - Quote: "Data pulled from the API can be analyzed in a cleanroom environment."
- **M6. Freshness: unverified.** The official pages I opened do not say how quickly new posts become searchable.

### 1.4 Telegram

- **T1. The API is free.**
  - Source: https://core.telegram.org/api/terms · accessed 2026-10-15 (no date on page) · OFFICIAL
  - Quote: "We offer our API free of charge"
- **T2. The terms bar using Telegram data to develop or deploy AI.** The clause names "deployment", which could cover running an LLM over Telegram data. How far it reaches is legally untested (Analysis).
  - Source: same page, §1.5 · OFFICIAL
  - Quote: "prohibited from using, accessing or aggregating data obtained from the Telegram platform to … engage in the development, enhancement or deployment of artificial intelligence"
- **T3. Unofficial clients are watched, and abuse means a permanent ban.**
  - Source: https://core.telegram.org/api/obtaining_api_id · accessed 2026-10-15 · OFFICIAL
  - Quotes: "all accounts that log in using unofficial Telegram API clients are automatically put under observation" and "If you use the Telegram API for flooding, spamming, faking subscriber and view counters of channels, you will be banned forever."
- **T4. Bots only see channels they are members of, so a bot cannot passively follow arbitrary public channels.**
  - Source: https://core.telegram.org/bots/faq · accessed 2026-10-15 · OFFICIAL
  - Quote: "All messages from channels where they are a member."
- **T5. A non-Premium user can join at most 500 channels.**
  - Source: https://core.telegram.org/api/config · accessed 2026-10-15 · OFFICIAL
  - Quote: "The maximum number of channels and supergroups a non- Premium user may join" (config value "channels_limit_default": 500)
- **T6. Telegram throttles clients with FLOOD_WAIT errors.**
  - Source: https://core.telegram.org/api/errors · accessed 2026-10-15 · OFFICIAL
  - Quote: "FLOOD_WAIT_X: A wait of X seconds is required"
- **T7. Monitored channels keep disappearing because of bans.**
  - Source: https://ceur-ws.org/Vol-4198/paper10.pdf · ITASEC 2026, published 2026-04-23 · ACADEMIC
  - Quote: "hacker groups often maintain multiple chats due to frequent account bans."
- **T8. The public web preview is readable, but shows only times, not dates.** WebFetch read https://t.me/s/durov and returned recent posts with times but no calendar dates.
  - OBSERVED 2026-10-15

### 1.5 TikTok Research API

- **K1. Only academic or non-profit researchers in listed regions are eligible, and they must be non-commercial.**
  - Source: https://developers.tiktok.com/products/research-api · accessed 2026-10-15 · OFFICIAL
  - Quotes: "Academic institutions in the U.S., EEA, UK, Canada, or Switzerland" and "Be independent of commercial interests and able to conduct research on a not-for-profit or non-commercial basis"
- **K2. Quota is 1,000 requests a day, and new videos take up to 48 hours to become searchable.** Commercial users are not eligible.
  - Source: https://developers.tiktok.com/doc/research-api-faq · accessed 2026-10-15 · OFFICIAL
  - Quotes: "Currently, the daily limit is set at 1000 requests per day" and "New videos take up to 48 hours to be added to the search engine"
- **K3. Data must be refreshed every 30 days, and commercial use is banned.**
  - Source: https://www.tiktok.com/legal/page/global/terms-of-service-research-api/en · effective 2026-01-22 · OFFICIAL
  - Quotes: "regularly refresh TikTok Research Data at least every thirty (30) days" and "for any commercial or unauthorized purpose"

### 1.6 Bluesky (AT Protocol): the open exception

- **B1. The firehose needs no authentication.**
  - Source: https://bsky.network/docs/consuming-the-firehose/ · accessed 2026-10-15 · OFFICIAL
  - Quote: "The firehose is served from the com.atproto.sync.subscribeRepos endpoint over a WebSocket. No authentication is required."
- **B2. Every layer of the service is open.**
  - Source: https://bsky.network/docs/protocol-services/ · accessed 2026-10-15 · OFFICIAL
  - Quote: "they all share the same open data and open access."
- **B3. The volume is manageable, but Jetstream data cannot be verified cryptographically.**
  - Source: https://atproto.com/blog/jetstream · 2024-10-16 · OFFICIAL
  - Quotes: "a torrential full-network firehose (over a thousand events per second)", "Bandwidth costs are manageable today." and "Events do not include cryptographic signatures or Merkle tree nodes, meaning the data is not self-authenticating."
- **B4. Coverage is small.** Bluesky averaged about 800k posts/day in May 2024, according to one researcher's blog.
  - Source: https://markptorres.com/research/llm-experiments-pt-viii · updated 2024-05-21 · BLOG
  - Quote: "has averaged ~800,000 posts per day."
- **B5. A builder describes Bluesky as a fraction of Twitter.**
  - Source: https://news.ycombinator.com/item?id=47192012 · 2026-02-28 · BLOG (Show HN post)
  - Quote: "Bluesky is the backbone (a fraction of twitter, but still lots of journalists and OSINT folks)"

---

## 2. Web search freshness, and whether LLM search tools can see social posts

### 2.1 What the agent's tools actually do

- **S1. The vendor claims real-time web access.** S12–S13 test this claim.
  - Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool · accessed 2026-10-15 · OFFICIAL
  - Quote: "The web search tool gives Claude direct access to real-time web content"
- **S2. Claude Code's WebSearch returns only titles and URLs.**
  - Source: https://code.claude.com/docs/en/tools-reference · accessed 2026-10-15 · OFFICIAL
  - Quote: "returns result titles and URLs. It doesn't fetch the result pages."
- **S3. Searches per session are capped.** This research session hit the cap: "limit: 200 WebSearch calls per turn" (OBSERVED 2026-10-15).
  - Source: same page · OFFICIAL
  - Quote: "An interactive terminal session has a limit of 200 WebSearch calls."
- **S4. WebFetch caches pages and lossily summarizes them.**
  - Source: same page · OFFICIAL
  - Quotes: "WebFetch caches each response for 15 minutes by default" and "This makes WebFetch lossy by design."
- **S5. WebFetch identifies itself as Claude-User.**
  - Source: same page · OFFICIAL
  - Quote: "WebFetch sets a `User-Agent` header beginning with `Claude-User`"
- **S6. Anthropic's bots obey robots.txt.**
  - Source: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler · 2026-04-07 · OFFICIAL
  - Quote: "Anthropic’s Bots respect “do not crawl” signals by honoring industry standard directives in robots.txt."
- **S7. X's robots.txt allows only Googlebot and Bingbot (with a partial exception for facebookexternalhit) and blocks every other crawler.** Even Google and Bing are barred from X's real-time search pages.
  - Source: https://x.com/robots.txt · accessed 2026-10-15 · OFFICIAL
  - Quotes: "# Every bot that might possibly read and respect this file" / "User-agent: *" / "Disallow: /". For Googlebot and Bingbot: "Disallow: /search/realtime"
- **S8. Reddit blocks every search engine except Google.**
  - Source: https://www.searchenginejournal.com/reddit-limits-search-engine-access-google-remains-exception/523131/ · 2024-07-26 · JOURNALISM
  - Quotes: "Reddit updated its robots.txt file, preventing most web crawlers from accessing its latest content." and "Google, however, remains an exception, likely due to a $60 million deal"
- **S9. Claude's search index appears to be Brave's.** This is a press inference, not an Anthropic statement.
  - Source: https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/ · 2025-03-21 · JOURNALISM
  - Quote: "But evidence suggests it's Brave Search, the search engine maintained by browser developer Brave."

### 2.2 My own tests (OBSERVED, 2026-10-15; single trials)

- **S10. The search tool refuses many news wires and social sites as domain filters.** Passing these sites in `allowed_domains` returned errors:
  - "The following domains are not accessible to our user agent: ['apnews.com', 'bbc.co.uk', 'bbc.com', 'reuters.com', 'theguardian.com']"
  - "…not accessible to our user agent: ['reddit.com', 'threads.net']"
  - "…not accessible to our user agent: ['afp.com', 'ft.com', 'nhk.or.jp', 'nytimes.com', 'wsj.com']"
  - Analysis: the agent cannot query the main wire services or Reddit directly. Syndicated copies on other sites may still show up.
- **S11. Direct page fetches fail.**
  - WebFetch of https://x.com/XDevelopers returned "The server returned HTTP 402 Payment Required."
  - WebFetch of https://www.reddit.com/r/worldnews/new/ returned "Claude Code is unable to fetch from www.reddit.com".
  - WebFetch of a bbc.com article returned "Claude Code is unable to fetch from www.bbc.com".
- **S12. Searching X gives profile pages, not a stream.** A search limited to `x.com`/`twitter.com` for "earthquake" returned 10 X URLs, mostly account profile pages and individual posts from weeks to years ago. The search interface offers no way to ask for posts from the last N minutes.
- **S13. Freshness test: nothing about a moderate earthquake about 3 hours later.**
  - The USGS M4.5+ feed (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson, OFFICIAL, feed generated 2026-10-15T08:18:58Z) listed an M5.3 event, "43 km SSE of Otorohanga, New Zealand", at 2026-10-15T05:25:31Z (converted from epoch).
  - At about 08:20 UTC, roughly 2 h 55 min later, I ran two WebSearch queries. The tool answered "I couldn't find any report of a magnitude 5.3 earthquake near Otorohanga today." and "I found no reports of a Waikato earthquake on October 15, 2026."

### 2.3 Published evidence on indexing and news-API latency

- **S14. Google says crawling can take days to weeks.** This is general guidance for requesting a recrawl, not a measurement of news-crawling speed.
  - Source: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl · last updated 2025-12-10 · OFFICIAL
  - Quote: "Crawling can take anywhere from a few days to a few weeks."
- **S15. IndexNow says discovery without it can take days or weeks.**
  - Source: https://www.indexnow.org/faq · accessed 2026-10-15 · OFFICIAL
  - Quote: "that process can be slow, taking days or even weeks."
- **S16. NewsAPI's free plan is delayed 24 hours; real-time access starts at $449/month.**
  - Source: https://newsapi.org/pricing · accessed 2026-10-15 · OFFICIAL
  - Quotes: "Articles have a 24 hour delay" (free Developer plan, "100 requests per day") and "New articles available in real-time" (Business plan, "$449" per month)
- **S17. GDELT updates every 15 minutes.**
  - Source: https://www.gdeltproject.org/data.html · accessed 2026-10-15 · OFFICIAL
  - Quote: "the data updates every 15 minutes."
- **S18. TikTok research search lags up to 48 hours** (see K2).
- **S19. LLMs struggle with fast-changing facts.**
  - Source: https://arxiv.org/abs/2310.03214 (Vu et al., *FreshLLMs*) · 2023-10-05 · ACADEMIC
  - Quote: "all models (regardless of model size) struggle on questions that involve fast-changing knowledge and false premises."
- **S20. Models have a fixed knowledge cutoff, so anything later must come from tools.**
  - Source: https://platform.claude.com/docs/en/about-claude/models/overview · accessed 2026-10-15 · OFFICIAL
  - Quote: "Reliable knowledge cutoff | Jun 2026 | Jun 2026 | Jun 2026 | Jun 2026"
- **S21. Routines run at most hourly and can start late.**
  - Source: https://code.claude.com/docs/en/routines · accessed 2026-10-15 · OFFICIAL
  - Quotes: "The minimum interval is one hour; expressions that run more frequently are rejected." and "If you schedule a run exactly on the hour, such as 9:00, it can start several minutes late."
- **S22. Social media can be ahead of the news wires.**
  - Source: https://aclanthology.org/N10-1021.pdf (Petrović, Osborne, Lavrenko, NAACL 2010) · 2010 · ACADEMIC
  - Quote: "Twitter is not only interesting because of this realtime response, but also because it is sometimes ahead of newswire."
- **S23. Tweet-based detection can take about two minutes.**
  - Source: https://www.usgs.gov/publications/twitter-earthquake-detection-earthquake-monitoring-a-social-world (Earle, Bowden, Guy, *Annals of Geophysics*) · 2011 · ACADEMIC (USGS)
  - Quote: "The detections are also fast; about 75% occur within two minutes of the origin time."
- **Arithmetic (Analysis):**
  - An hourly poll catches an event that arrives at a random time after 60 ÷ 2 = **30 minutes on average**. The worst case is about 60 minutes, plus run time and late starts (S21).
  - X's Filtered Stream has a P99 latency of about 4.5 s (X4). An hourly worst case of 3,600 s ÷ 4.5 s is about **800×** slower.

---

## 3. LLM cost at stream scale

### 3.1 Official prices and limits (accessed 2026-10-15)

- **C1. Base prices per million tokens (MTok).**
  - Source: https://platform.claude.com/docs/en/about-claude/pricing · OFFICIAL
  - Quotes:
    - Cheapest current model: "Claude Haiku 5.5 (for prompts up to 100,000 tokens) | $0.10 / MTok | … | $0.01 / MTok | $0.50 / MTok". The columns are input, 5-min cache write ($0.125), 1-h cache write ($0.20), cache hit, and output.
    - Mid-tier: "Claude Sonnet 5.5 | $2 / MTok | $2.50 / MTok | $4 / MTok | $0.10 / MTok | $10 / MTok"
    - Previous Haiku, for reference: "Claude Haiku 4.5 | $1 / MTok | $1.25 / MTok | $2 / MTok | $0.10 / MTok | $5 / MTok"
- **C2. The Batch API halves the price.**
  - Source: same page · OFFICIAL
  - Quote: "The Batch API allows asynchronous processing of large volumes of requests with a 50% discount on both input and output tokens."
  - Batch table quotes: "Claude Haiku 5.5 (for prompts up to 100,000 tokens) | $0.05 / MTok | $0.25 / MTok" and "Claude Sonnet 5.5 | $1 / MTok | $5 / MTok"
- **C3. Batches are slow and size-limited.**
  - Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing · OFFICIAL
  - Quotes: "most batches finishing in less than 1 hour while reducing costs by 50%", "Batches expire if processing does not complete within 24 hours." and "limited to either 100,000 Message requests or 256 MB in size, whichever is reached first."
- **C4. Haiku 5.5 charges more for long prompts.** If you stuff an hour of posts into one big prompt, the higher price applies.
  - Source: pricing page · OFFICIAL
  - Quote: "Claude Haiku 5.5 is priced by prompt length: a request whose prompt is over 100,000 tokens pays higher prices."
- **C5. Prompt caching only works for prompts of 512+ tokens on Haiku 5.5 and Sonnet 5.5.**
  - Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching · OFFICIAL
  - Quote: "the minimum cacheable prompt length is: … 512 tokens for … Claude Sonnet 5.5 … and Claude Haiku 5.5"
- **C6. Thinking tokens are billed as output, and Haiku 5.5 thinks by default.**
  - Source: https://platform.claude.com/docs/en/build-with-claude/thinking · OFFICIAL
  - Quotes: "the tokens Claude spends reasoning are billed as output tokens, even when the thinking text isn't returned to you" and "Claude Haiku 5.5 also has thinking on by default and accepts `thinking: {type: "disabled"}` at effort `high` or below"
- **C7. Haiku 5.5's tokenizer counts more tokens for the same text.**
  - Source: https://platform.claude.com/docs/en/models/haiku-5-5/overview (model released 2026-10-07) · OFFICIAL
  - Quote: "the same text counts as approximately 30% more tokens than on Claude Haiku 4.5"
- **C8. Rate limits by usage tier**, as requests per minute (RPM), input tokens per minute (ITPM) and output tokens per minute (OTPM). Only uncached input counts toward ITPM.
  - Source: https://platform.claude.com/docs/en/api/rate-limits · OFFICIAL
  - Haiku 5.5 rows by tier:
    - Start: "Claude Haiku 5.5 | 1,000 | 2,000,000 | 400,000"
    - Build: "| 5,000 | 5,000,000 | 1,000,000"
    - Scale: "| 10,000 | 10,000,000 | 2,000,000"
  - Sonnet 5.5 has the same numbers. Above Scale: "If you need limits higher than the Scale tier, contact sales".
  - Quote on caching and ITPM: "For most Claude models, only uncached input tokens count toward your ITPM rate limits."
- **C9. Monthly spend caps by tier.**
  - Source: same page · OFFICIAL
  - Quotes: "Start | $500 USD", "Build | $1,000 USD", "Scale | $200,000 USD"
- **C10. Web search costs $10 per 1,000 searches.**
  - Source: pricing page · OFFICIAL
  - Quote: "Web search is available on the Claude API for **$10 per 1,000 searches**, plus standard token costs for search-generated content."
- **C11. Routines use subscription quota, not API billing.**
  - Source: https://code.claude.com/docs/en/routines · OFFICIAL
  - Quote: "Routines draw down subscription usage the same way interactive sessions do."

### 3.2 Back-of-the-envelope estimate (Analysis; every assumption is mine)

**Assumptions**

- A1. Each post plus minimal metadata is **75 input tokens**. Unverified: real tweet lengths vary, and C7 means token counts on Haiku 5.5 are about 30% higher than on Haiku 4.5.
- A2. The fixed instructions (label definitions plus a few examples) are **600 tokens**. That is at least 512, so they can be cached (C5).
- A3. The output is a JSON label of **15 tokens**, with thinking **disabled** (C6). A sensitivity case adds **200 thinking tokens per post** for when thinking is left on.
- A4. "Micro-batching" means packing **50 posts per request**.
- A5. The day has 1,440 minutes, the month 30 days, and load is spread evenly. Real events are bursty, so I also check a 5× burst.
- A6. Occasional cache writes ($0.125/MTok × 600 tokens ≈ $0.000075 per write) are ignored.

**Cost per post** (prices from C1 and C2, in $ per 1,000,000 tokens):

| Scenario | Haiku 5.5 arithmetic | Haiku 5.5 $/post | Sonnet 5.5 arithmetic | Sonnet 5.5 $/post |
|---|---|---|---|---|
| R1. Real time, 1 post per request, instructions cached | 75×0.10 + 600×0.01 + 15×0.50 = 7.5 + 6.0 + 7.5 = 21.0 → ÷10⁶ | **$0.0000210** | 75×2 + 600×0.10 + 15×10 = 150 + 60 + 150 = 360 → ÷10⁶ | **$0.000360** |
| R2. Real time, 50 posts per request, instructions cached | 75×0.10 + 12×0.01 + 15×0.50 = 7.5 + 0.12 + 7.5 = 15.12 → ÷10⁶ | **$0.0000151** | 150 + 12×0.10 + 150 = 301.2 → ÷10⁶ | **$0.000301** |
| B1. Batch API, 50 posts per request, no cache | (75+12)×0.05 + 15×0.25 = 4.35 + 3.75 = 8.10 → ÷10⁶ | **$0.0000081** | 87×1 + 15×5 = 87 + 75 = 162 → ÷10⁶ | **$0.000162** |
| R1 with thinking on (+200 output tokens) | 7.5 + 6.0 + 215×0.50 = 121.0 → ÷10⁶ | **$0.000121** | 150 + 60 + 215×10 = 2,360 → ÷10⁶ | **$0.00236** |

(In R2 and B1, 600 instruction tokens ÷ 50 posts = 12 tokens per post.)

**Cost per day and per month** (per-post cost × N; month = 30 days):

| Scenario | N = 10M posts/day | N = 100M posts/day |
|---|---|---|
| Haiku 5.5, R1 real time | 10⁷ × $0.000021 = **$210/day** (≈$6,300/mo) | **$2,100/day** (≈$63,000/mo) |
| Haiku 5.5, R2 micro-batched real time | **$151/day** (≈$4,536/mo) | **$1,512/day** (≈$45,360/mo) |
| Haiku 5.5, B1 Batch API | **$81/day** (≈$2,430/mo) | **$810/day** (≈$24,300/mo) |
| Haiku 5.5, R1 with thinking on | **$1,210/day** | **$12,100/day** |
| Sonnet 5.5, R1 real time | **$3,600/day** (≈$108,000/mo) | **$36,000/day** (≈$1.08M/mo) |
| Sonnet 5.5, R2 micro-batched real time | **$3,012/day** | **$30,120/day** |
| Sonnet 5.5, B1 Batch API | **$1,620/day** (≈$48,600/mo) | **$16,200/day** (≈$486,000/mo) |
| Sonnet 5.5, R1 with thinking on | **$23,600/day** | **$236,000/day** |

**Do the rate limits and spend caps allow it?** (C8, C9)

- **N = 10M/day.**
  - Load: 10,000,000 ÷ 1,440 = **6,944 posts/min**.
  - R1 needs **6,944 RPM**. That exceeds Start (1,000) and Build (5,000) and fits Scale (10,000). A 5× burst needs **34,722 RPM**, which exceeds even Scale.
  - R2 needs 6,944 ÷ 50 = **139 RPM**. Uncached input is 6,944 × 75 = **520,833 ITPM** and output is 6,944 × 15 = **104,167 OTPM**. Both fit Build, even at 5× burst.
  - With thinking on, output is 6,944 × 215 = **1,493,056 OTPM**. That exceeds Build (1M) and is close to Scale's 2M.
  - Spend: Haiku R1 at ≈$6,300/month is above Build's **$1,000/month cap**, so it needs the Scale tier.
- **N = 100M/day.**
  - Load: **69,444 posts/min**.
  - R1 needs **69,444 RPM**, about 7× Scale, which means a Custom contract.
  - R2 needs **1,389 RPM**, 5,208,333 ITPM and 1,041,667 OTPM. This fits Scale on average. A 5× burst (26.0M ITPM, 5.2M OTPM) exceeds Scale.
  - Spend: Sonnet R1 at ≈$1.08M/month exceeds Scale's **$200,000/month cap**.
- **The Batch API cannot alert in real time.** At 50 posts per request, 10M posts/day is 200,000 requests (2 batches of 100,000), and 100M/day is 2,000,000 requests (20 batches). Results arrive "most" within 1 hour and at worst after 24 h (C3).

**Model cost compared with data cost (Analysis):**

- At X's self-serve price (X2), reading 10M posts/day would cost 10,000,000 × $0.005 = **$50,000/day**, and 100M posts/day would cost **$500,000/day**. These are hypothetical: the pay-per-use cap (X3) forbids that volume, so you would need a custom Enterprise contract.
- So at stream scale, **getting the data and having the right to use it** costs more than Haiku-class tokens ($81–$2,100/day).

**For contrast: the hourly "search and report" agent (Analysis, assumed numbers):**

- Assume each run makes 20 searches, uses 150k–1M billed input tokens (searches, fetched pages, and context re-sent across the agent loop) and writes 5k output tokens on Sonnet 5.5.
- Per run: input $0.30–$2.00, plus output 5,000 × $10/10⁶ = $0.05, plus searches 20 × $0.01 = $0.20. Total **$0.55–$2.25 per run**, or **$13–$54 per day** over 24 runs.
- The agent is cheap because it looks at about 20 queries an hour, not millions of posts. As a Claude Code routine, it draws on the subscription instead (C11).

### 3.3 Small specialized classifiers: qualitative comparison

- **Accuracy: fine-tuned small models usually beat zero-shot LLMs on classification.** See A2, A4, A5 and A6 below. For example, a LoRA fine-tune of an 8B model gained 37.79 points over zero-shot on HumAID (A2).
- **Throughput: classic pipelines scale with your own hardware, not a vendor's per-minute limits.**
  - Locality-sensitive-hashing first-story detection runs in constant time per document with an order-of-magnitude speedup (A14).
  - QCRI's AIDR claims "automatically tag up to thousands of messages per minute" (https://qcai.qcri.org/tools/aidr-artificial-intelligence-for-digital-response, accessed 2026-10-15, OFFICIAL).
- **Cost structure (Analysis, no external source):** a self-hosted small classifier is mostly a fixed compute cost, with almost no marginal cost per post. LLM APIs charge linearly per token and add rate-limit and spend-cap tiers (C8, C9).
- **Where LLMs help:** generative models cope better with messy social-media text, such as leet speak and elongated words (A5). They also need no labelled training data for a new event type. A common design (Analysis) is a cheap filter or classifier on the full stream, with an LLM only for summarizing or triaging the few clusters that spike.

---

## 4. Research on LLMs for real-time event detection and crisis informatics

### 4.1 Classifying crisis tweets (CrisisBench, HumAID, CrisisLex-family data)

- **A1. Zero-shot results from commercial LLMs vary a lot between datasets.**
  - Source: https://arxiv.org/abs/2410.00182 (McDaniel, Scheele, Liu) · 2024-09-30 · ACADEMIC
  - Quotes: "We assess three commercial large language models (OpenAI GPT-4o, Gemini 1.5-flash-001 and Anthropic Claude-3-5 Sonnet)" and "the models have significantly varying performance by dataset, which raises questions about dataset quality."
- **A2. On HumAID, fine-tuning beat zero-shot by about 38 points, and retrieval (RAG) hurt.** Derived (Analysis): 79.62 − 37.79 ≈ **41.8%** zero-shot accuracy, assuming the gain is in percentage points.
  - Source: https://arxiv.org/abs/2602.12284 (Han, Kim, Yang, Yun) · 2026-01-21 · ACADEMIC
  - Quotes: "LoRA achieves 79.62% humanitarian classification accuracy (+37.79% over zero-shot)" and "RAG strategies degrade fine-tuned model performance due to label noise from retrieved examples."
- **A3. Instruction fine-tuning is being used to tag several labels per post at once (CrisisSense-LLM).**
  - Source: https://arxiv.org/abs/2406.15477 (Yin et al.) · v1 2024-06-16, v3 2025-08-06 · ACADEMIC
  - Quotes: "current methods mostly rely on single-label text classification models" and "enhancing a pre-trained Large Language Model (LLM) through instruction fine-tuning"
- **A4. Compact models can beat very large zero-shot LLMs on crisis tweets.**
  - Source: https://arxiv.org/abs/2605.08448 (Ativo et al.) · 2026-05-08 · ACADEMIC
  - Quote: "compact semi-supervised models can, in some cases, outperform very large LLMs operating in zero-shot settings."
- **A5. Generative models are less precise than supervised ones on multimodal event detection, but handle messy text better.**
  - Source: https://arxiv.org/abs/2505.10836 (Dey et al.) · 2025-05-16 · ACADEMIC
  - Quotes: "generative approaches despite having a large number of parameters, lag behind supervised methods in precision." and "common social media issues such as leet speak, text elongation, etc."
- **A6. Fine-tuned smaller models outperformed zero-shot LLMs in every case tested.**
  - Source: https://arxiv.org/abs/2406.08660 (Bucher & Martini) · 2024-06-12 · ACADEMIC
  - Quotes: "fine-tuned LLMs (still) consistently and significantly outperform larger, zero-shot prompted models" and "fine-tuning with application-specific training data achieves superior performance in all cases."

### 4.2 Hallucination and reliability with breaking news

- **A7. Errors in AI assistants' news answers are widespread** (EBU/BBC study of 3,000+ answers).
  - Source: https://communication.vrt.be/largest-study-of-its-kind-shows-ai-assistants-misrepresent-news-content-45-of-the-time-regardless-of-language-or-territory · 2025-10-22 · OFFICIAL (press release from VRT, a participating public broadcaster)
  - Quotes: "45% of all AI answers had at least one significant issue", "20% of responses contained major accuracy issues such as fabricated or outdated information" and "in 31% of cases, references were missing or misleading"
- **A8. Apple Intelligence produced a false breaking-news notification summary.** Apple's later suspension of news summaries (January 2025) is **unverified**: I could not open the original articles.
  - Source: https://512pixels.net/2024/12/apple-intelligence-notification-summaries-generating-fake-news/ · 2024-12-13 · BLOG (quotes the BBC)
  - Quote: "the AI-powered summary falsely made it appear BBC News had published an article claiming Luigi Mangione … had shot himself. He has not."
- **A9. An LLM fact-checking a live war contradicted itself within the same minute.**
  - Source: https://dfrlab.org/2025/06/24/grok-struggles-with-fact-checking-amid-israel-iran-war/ · 2025-06-24 · ACADEMIC (Atlantic Council DFRLab; not peer-reviewed)
  - Quotes: "the DFRLab analyzed approximately 130,000 posts in various languages", "Grok oscillated, sometimes within the same minute, between denying the airport's destruction" and "Grok demonstrated that it struggles with verifying already-confirmed facts"
- **A10. Researchers are adding explicit uncertainty scores for crisis claims.**
  - Source: https://arxiv.org/abs/2605.00829 (Douglas, Delos Reyes, Kitamoto) · 2026-03-17 · ACADEMIC
  - Quotes: "implicitly assume that extracted situational claims are equally plausible" and "explicitly representing uncertainty supports human crisis communicators in prioritizing information under time pressure."
- **A11. LLMs struggle with fast-changing facts and false premises** (see S19).

### 4.3 The "normal baseline" problem: detection is about change in volume, not one snapshot

- **A12. Events show up as bursts of activity.**
  - Source: https://www.cs.cornell.edu/home/kleinber/bhs.pdf (Kleinberg, *Bursty and Hierarchical Structure in Streams*, KDD 2002) · 2002 · ACADEMIC
  - Quote: "signaled by a “burst of activity,” with certain features rising sharply in frequency"
- **A13. The USGS detector compares a short-term average with a long-term baseline, and has limits.**
  - Source: https://www.usgs.gov/publications/twitter-earthquake-detection-earthquake-monitoring-a-social-world · 2011 · ACADEMIC
  - Quotes: "To identify possible earthquakes, we use a short-term-average, long-term-average algorithm.", "When tuned to a moderate sensitivity, the detector finds 48 globally-distributed earthquakes with only two false triggers" and "no accurate location or magnitude can be assigned based on tweet data alone."
- **A14. Most posts are noise, and naive novelty detection floods you.** Scalable methods exist.
  - Source: https://aclanthology.org/N10-1021.pdf (Petrović et al., NAACL 2010) · 2010 · ACADEMIC
  - Quotes: "The majority of tweets are not real stories, but rather updates on one’s personal life, conversations, or spam.", "simply running a first story detection system on this data would yield an incredible amount of new stories each day" and "we achieve over an order of magnitude speedup in processing time, while retaining comparable performance"
- **A15. Baseline counts are sold only for queries you thought of in advance.**
  - Source: https://docs.x.com/x-api/getting-started/pricing and https://docs.x.com/x-api/llms.txt · accessed 2026-10-15 · OFFICIAL
  - Quotes: "Counts: Recent | $0.005 per request" and "Get Post volume data for queries without retrieving the Posts themselves"
  - Analysis: this gives a denominator for keywords you anticipated, not for unknown unknowns.
- **A16. A DIY builder uses frequency math, not an LLM, for spikes** (see W2).
  - Quote: "spikes above baseline (frequency math, not LLMs)"
- **Analysis (no external source):** an hourly agent that runs a few searches sees no denominator. It cannot tell an unusual volume of "explosion" posts in a city from a normal day, unless it keeps its own time series of counts between runs. That requires the stream access §1 shows is unavailable or restricted.

### 4.4 What the commercial benchmark does (vendor claims, not independently verified)

- **A17. Dataminr describes its pipeline as anomaly detection over about a million sources.**
  - Source: https://www.dataminr.com/resources/blog/harnessing-the-power-of-llms-and-multi-modal-foundation-models-in-dataminrs-ai-platform/ · 2023-10-03 · OFFICIAL (vendor)
  - Quotes: "nearly one million multi-modal/multi-format public data sources in real time", "performing trillions of daily computations on billions of daily inputs" and "Natural Language Understanding, Computer Vision, Audio Processing and Anomaly Detection"
- **A18. Dataminr claims dozens of proprietary LLMs and about half a million events a day.**
  - Source: https://www.dataminr.com/ai-platform/ · accessed 2026-10-15 · OFFICIAL (vendor)
  - Quotes: "Dataminr has developed over 50 proprietary LLMs" and "detecting nearly 500,000 daily events, risks and threats"
- **A19. Latency figures are only relative.** Anthropic gives Haiku 5.5 a comparative latency of "Fastest" (https://platform.claude.com/docs/en/about-claude/models/overview, OFFICIAL). I found no official absolute seconds-per-request number (**unverified**).

---

## 5. Public write-ups from people who built Dataminr-like or OSINT alerting

- **W1. IranWarLive: half-hourly cron, RSS feeds and an LLM. The hardest part was deduplication.**
  - Source: https://news.ycombinator.com/item?id=47200316 · 2026-02-28 · BLOG (Show HN; read through the Hacker News Algolia API)
  - Quotes:
    - "A Cloudflare Worker runs on a cron trigger every 30 minutes, acting as the scraper."
    - "It parses major RSS feeds (BBC, Al Jazeera, etc.) for breaking regional news."
    - "The Hardest Challenge: Handling state and LLM deduplication at the edge."
    - "the concurrent Worker requests were flooding the database with duplicate strikes"
    - "any suggestions for improving LLM prompt reliability for fatality estimates"
  - Analysis: its input is newsroom RSS feeds, so it runs behind the newsrooms, not ahead of them.
- **W2. News Pulse: Twitter became unreliable, Bluesky is the backbone, and spikes are found without an LLM.**
  - Source: https://news.ycombinator.com/item?id=47192012 · 2026-02-28 · BLOG (Show HN)
  - Quotes:
    - "tracking events across platforms is a mess now that Twitter’s unreliable"
    - "lightweight activity detection when a region spikes above baseline (frequency math, not LLMs)"
    - A commenter: "Even trusted outlets get it wrong on breaking news, and Telegram channels are basically the wild west."
- **W3. Skypulse: even the open Bluesky firehose forced sampling.**
  - Source: https://news.ycombinator.com/item?id=35812632 · 2023-05-04 · BLOG (Show HN)
  - Quotes: "By default, the events processing is set to 25% of all events." and "causes you to get disconnected from the API for a short while"
- **W4. Shadowbroker: performance problems, stale feeds and spoofed data.**
  - Source: https://news.ycombinator.com/item?id=47300102 · 2026-03-08 · BLOG (Show HN and comments)
  - Quotes:
    - "dumping 30k+ moving GeoJSON features onto the map just crashed everything"
    - A commenter: "Several of these sources (threat feeds especially) have update cadences measured in hours, not seconds."
    - A commenter: "Marine AIS in particular can be spoofed or delayed"
- **W5. SocHunter (academic OSINT monitor for Reddit, YouTube and Telegram): free-tier limits, translation quality, hardware and bans.**
  - Source: https://ceur-ws.org/Vol-4198/paper10.pdf · 2026-04-23 · ACADEMIC
  - Quotes:
    - "its free tier limits usage to 5, 000 characters per day"
    - "in a few languages, such as Hindi, the translations are distorted"
    - "due to limited hardware, it was tested only on the CPU"
    - "hacker groups often maintain multiple chats due to frequent account bans."
- **W6. World Monitor (open-source dashboard, started January 2026): structured feeds and no human editors.**
  - Source: https://www.worldmonitor.app/docs/about · accessed 2026-10-15 · OFFICIAL (project page)
  - Quotes: "World Monitor has no newsroom and no human editors." and "ADS-B aircraft transponders, AIS maritime positions, ACLED and UCDP conflict datasets, NASA fire detections."
  - The page I opened lists no X, Telegram or Reddit feeds; whether they are included is **unverified**.
- **W7. A critique of AI-built "situation monitor" dashboards.**
  - Source: https://thebaffler.com/latest/situational-unawareness-mcbrien · 2026-03-12 · JOURNALISM
  - Quotes: "The amount of vibe coded 'situation monitor' slop being produced these days is absolutely astronomical," (an OSINT researcher, quoted) and "the illegible cacophony just leads to a type of hypercharged doomscrolling"
  - A related Fast Company piece ("AI 'vibe-coded' war dashboards") returned HTTP 403, so its content is **unverified**.
- **W8. Nitter: a popular open X reader ended after a cease-and-desist from X.**
  - Source: https://gigazine.net/gsc_news/en/20260826-nitter-end/ · 2026-08-26 · JOURNALISM
  - Quotes: "a cease and desist order was finally sent from X" and "it later became impossible to create new guest accounts"
- **W9. Researchers lost their X data pipelines.**
  - Source: https://cjr.org/tow_center/qa-what-happened-to-academic-research-on-twitter.php · 2023-12-06 · JOURNALISM
  - Quotes: "over 100 projects were canceled, halted, or pivoted to other platforms" and "Now, researchers have to pay $100 per month for just 10,000 tweets."
- **W10. Disaster-alert systems were warned they would break.**
  - Source: https://techpolicy.press/twitter-api-changes-set-to-disrupt-public-interest-research · 2023-02-06 · JOURNALISM
  - Quote: "break systems that generate automated alerts about events such as natural disasters"
- **W11. Rescuers lose real-time information.**
  - Source: https://news.northeastern.edu/2023/02/15/twitter-api · 2023-02-15 · JOURNALISM (university news)
  - Quote: "By adding an access fee, Twitter is closing off a critical source of real-time information for rescuers"

Pattern across W1–W11 (Analysis):

- DIY builders fall back to **RSS, open structured feeds (ADS-B, AIS, GDELT, NASA fires) and Bluesky**.
- They poll every **15–30 minutes or more**, or accept a downsampled stream.
- They detect spikes with **simple frequency math**, use LLMs mainly for summaries, and struggle with **deduplication, staleness, spoofing and credibility**.
- Their tools are fragile when platforms change their access rules.

---

## 6. Synthesis: what a DIY scheduled LLM agent cannot solve, and why

| # | What it can't do | Why | Evidence |
|---|---|---|---|
| 1 | See the full social stream | Firehoses are Enterprise-only or research-only. Self-serve X reading is capped at about 100k posts/day. Only Bluesky is open. | X3, X7–X9, R1–R6, M2–M4, K1–K3, B1–B5 |
| 2 | Lawfully use the data for alerting or monitoring | Bans on surveillance and sensitive-event monitoring, a Telegram clause on AI deployment, and non-commercial-only programs. | X12–X17, T2, R1–R5, K3 |
| 3 | Detect within minutes | Hourly minimum schedule, search-index lag, a 15-minute fetch cache and 24-hour delays on free news APIs. Streams deliver in seconds. | S13–S17, S21, S4, X4, S23 |
| 4 | Read key sources at all | robots.txt rules and blocked domains: X (402), Reddit, Threads, Reuters, AP, AFP, BBC and NYT were inaccessible in my tests. | S6–S12 |
| 5 | Tell "unusual" from "normal" | Detection needs continuous counts compared with a baseline (short-term vs long-term average, bursts). One snapshot has no denominator. | A12–A16 |
| 6 | Classify a stream cheaply and fast on default tiers | Rate limits, spend caps, thinking-token overhead, and batch latency of up to 24 h. Data costs exceed token costs. | C1–C11, §3.2 |
| 7 | Guarantee correct alerts | Frequent hallucination and misattribution on news, self-contradiction, noisy input, deduplication problems. Multi-source corroboration and human review are needed. | A7–A10, A14, A17, W1, W2, W6 |
| 8 | Stay up | Platforms change or close access, which breaks DIY tools. | M1, W8–W11, R4 |

What such a setup **can** reasonably do (Analysis): write hourly digests from official structured feeds (USGS, GDELT's 15-minute updates, RSS) and from the open Bluesky stream. Use a small classifier or keyword filter plus frequency-based spike detection, and call an LLM only for the few clusters that spike. Keep a human in the loop for verification.

---

## 7. Unverified items and open follow-ups

- X Enterprise pricing ("$42,000+/month") comes only from a blog that cites no source (X10).
- Whether new posts appear in Meta Content Library in near real time (M6).
- Apple's January 2025 suspension of AI news summaries (A8). The article I opened only covers the December 2024 false summary.
- Fast Company's article on "vibe-coded" war dashboards (W7). It returned 403.
- Absolute latency in seconds for Claude Haiku 5.5 (A19).
- Typical tokens per post (assumption A1) and thinking tokens per classification (A3). These are assumptions, not measurements.
- My observed tests (S10–S13, T8, R8) are single trials on 2026-10-15. Re-run them before relying on them.
- Further web searches were blocked by the session's 200-search cap (S3). A follow-up session could look for xAI X Search freshness, Dataminr's historical X data partnership, and more DIY post-mortems.
