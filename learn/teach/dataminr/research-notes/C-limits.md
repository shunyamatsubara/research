# Dataminr: limits, risks and criticisms (evidence file C)

Compiled 2026-10-15. Purpose: give a learner a balanced, sourced view of what Dataminr cannot do or does poorly. Dataminr's own responses are included wherever a source reported them.

## How to read this file

- **Format of every claim:** Source (URL) | publication date | source type | short exact quote (25 words or fewer). "Derived" means I calculated a number from the cited record; the calculation is shown.
- **Source types used:** JOURNALISM, ACADEMIC, GOVERNMENT RECORD, USER REVIEW, VENDOR. Qualifiers in brackets say more. "VENDOR" means first-party, self-published material: Dataminr's own documents, a marketplace listing, a competitor's or analyst firm's sales page, or a community's own website. NGO reports (ACLU, Brennan Center) are labeled "JOURNALISM [NGO/advocacy]".
- **Quote checking:** Most quotes were checked word for word against the downloaded page text. A few pages could only be read through a summarizing fetch tool (GAO decision, SEC filing, Dataminr MSA, Houston Landing, BuzzFeed News, TechXplore, WhatsApp). Their quotes are marked **[fetch-tool quote]** and should be spot-checked before publication.
- **Access limits (important for Q1):** G2, Capterra, GetApp, Software Advice, TrustRadius and Gartner Peer Insights returned HTTP 403 (bot protection). Reddit and web.archive.org were blocked for my tools, so **no Reddit claims are included**. I read the G2 reviews through their syndicated copy on AWS Marketplace. My web-search budget ran out near the end, so some leads remain open (see "Gaps" at the end).

---

## Q1. User reviews: recurring pros and cons

### 1.1 Aggregate picture

- **G2 aggregate as syndicated on AWS Marketplace: 48 reviews, 4.5/5. Distribution: 71% five-star, 25% four-star, 2% three-star, 2% two-star, 0% one-star.**
  Source: https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-7eav2xsxvnupy | accessed 2026-10-15 | USER REVIEW [G2 aggregate] | Quote: "4.5 48 ratings ... 71% 25% 2% 2% 0% 0 AWS reviews | 48 external reviews External reviews are from G2"
- **AWS's AI summary of those reviews:** "Functionality" Positive, "Ease of use" **Mixed**, "Customer service" Positive, "Cost effectiveness" insufficient data.
  Source: https://aws.amazon.com/marketplace/pp/prodview-7eav2xsxvnupy | accessed 2026-10-15 | VENDOR [AWS listing; AI-generated summary] | Quote: "Sentiment is AI generated from actual customer reviews on AWS and G2"
- **The review base is thin and clustered.** 14 of the 25 G2 reviews embedded on the AWS page are dated 2022-04-20 to 2022-05-18. That pattern suggests a vendor-solicited review drive. Whether any reviewer was paid or incentivized is **unverified** (derived from the review dates on the page above).
- **PeerSpot has no Dataminr reviews.** It reports Dataminr Pulse "mindshare" of 3.3% in Critical Event Management (CEM), down from 3.5%.
  Source: https://www.peerspot.com/products/dataminr-reviews | "As of October 2026" | USER REVIEW [platform metadata] | Quote: "We have not yet collected reviews for Dataminr Pulse" / "stands at 3.3% , down from 3.5% compared to the previous year"
- **Capterra, TrustRadius and Gartner Peer Insights:** these listings exist but blocked my tools (403), so I could not open them. Any rating or comment from them is **unverified** and not used here.

### 1.2 Recurring CONS (G2 reviews, read via AWS Marketplace syndication)

All of these are on https://aws.amazon.com/marketplace/pp/prodview-7eav2xsxvnupy and https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-7eav2xsxvnupy (original host: https://www.g2.com/products/dataminr/reviews, which blocked my tools). Source type for all: USER REVIEW.

**(a) Alert volume, information overload and noise.** This is the most frequent complaint.
- Justina S., 2026-01-21, 3.5/5, review titled "Real-Time Alerts with a Cluttered Interface" | Quote: "The interface can feel overwhelming, especially with numerous alerts."
- Arnab Kumar C. (operations leader, India), 2025-11-18, 4/5 | Quote: "I sometimes experience information overload with Dataminr, as there are too many notifications that need to be filtered out."
- Sebin M., 2025-10-31, 4/5 | Quote: "it can sometimes produce too many notifications, including irrelevant events, which may overwhelm users and require careful filtering."
- Reviewer in Security & Investigations, 2022-05-11, 5/5 | Quote: "sometimes a lot of noise comes through, especially in countries like Iraq/Turkey where a lot of things happen at once"
- Reviewer in Insurance, 2022-05-11, 5/5 | Quote: "Occasionally we have instances of information overload, but the Dataminr team provides unrivaled support"

**(b) Relevance ranking and source checking.**
- Reviewer in Banking, 2022-05-11, 4.5/5 | Quote: "Sometime the alerts are not sorted by relevance or sourced checked (e.g. new media vs. a tweet)"

**(c) Tuning and setup take real effort.**
- Reviewer in Apparel & Fashion, 2024-04-05, 5/5 | Quote: "Setting up Dataminr requires some time commitment from the end user to really customize it."
- Same review | Quote: "If you don't dedicate this time, you will not have a great experience."
- Arnab Kumar C., 2025-11-18 | Quote: "I find that the customization options could be more intuitive"

**(d) Interface and usability.**
- Unnamed reviewer, 2022-04-20, **1.5/5** | Quote: "The interface is cluttered, confusing and not user friendly. The emails generated from the alerts are INSANE."
- Reviewer in Retail, 2022-05-18, 3.5/5 | Quote: "The platform is not very intuitive"

**(e) Users cannot correct alerts or give feedback inside the product.**
- Reviewer in Broadcast Media, 2022-04-27, 4/5 | Quote: "saw post that misidentified a Bmp-3 as a tank ... and was unable to say to dataminr that was wrong."
- Reviewer in Security & Investigations, 2021-10-13, 5/5 | Quote: "I wish there was a way to contribute feedback to specific alerts directly within the platform."

**(f) Coverage, localization and integration gaps.**
- Unnamed reviewer, 2022-04-21, 3/5 | Quote: "There is a need for better localization, integration with other OSINT tools ... and expansion of the sources."
- Reviewer in Retail, 2024-03-28, 5/5 | Quote: "Integrating our physical location proximity to events is a work in progress"
- Reviewer in Airlines/Aviation, 2024-03-28, 5/5 | Quote: "The lack of real time flight tracking for our assests."
- Reviewer in Security & Investigations, 2022-05-03, 4.5/5 | Quote: "the tool could be improved for long-term strategic monitoring"

**(g) Cost.**
- Reviewer in IT & Services, 2022-05-11, 5/5 | Quote: "the cost of the product because when I have conversations with my leadership team cost is always a concern for them"
- Jeffrey K., 2026-02-01, 5/5 (a low-detail review) | Quote: "ITS HIGH COST AND COMPLEXITY MAY BE DRAWBACKS FOR SOME USERS."

**(h) Advice from one reviewer.**
- Reviewer in Hospital & Health Care, 2021-08-30, 4/5, under "Recommendations to others" | Quote: "To understand Dataminr's limitations."

### 1.3 Recurring PROS (for balance; same sources)

- **Speed.** Justina S., 2026-01-21 | Quote: "it delivers real-time alerts really fast before it even hits the news"
- **Speed compared with another tool.** Arnab Kumar C., 2025-11-18 | Quote: "I find it faster at detecting potential risk situations compared to other products like Feedly"
- **Support helps reduce noise.** Apparel & Fashion reviewer, 2024-04-05 | Quote: "The team that supports our account has been great at helping us customize alerts to cut down on noise"
- **Practitioner view from a newsroom.** Patch's national breaking-news editor uses Dataminr but checks every alert. This is in Q5.

---

## Q2. Price and cost evidence

### 2.1 Public list price and buyer benchmarks

- **AWS Marketplace list price for "Dataminr First Alert": $30,000 per single-user license per 12 months.** The cost scales per user, and fees are non-refundable.
  Source: https://aws.amazon.com/marketplace/pp/prodview-7eav2xsxvnupy | accessed 2026-10-15 | VENDOR [Dataminr listing] | Quotes: "Dataminr First Alert Single User License $30,000.00" / "All fees are non-cancellable and non-refundable except as required by law."
- **Buyer benchmark from Vendr: median $22,000 per year, range $15,000 to $62,500.** Vendr does not say how many purchases this is based on.
  Source: https://www.vendr.com/marketplace/dataminr | no date shown (page © 2026; accessed 2026-10-15) | VENDOR [third-party procurement-data firm, not Dataminr] | Quote: "Median buyer pays $22,000 per year Median: $22,000 $15,000 $62,500 Low High"
- **Support level on the AWS listing is 24/5, not 24/7.**
  Source: https://aws.amazon.com/marketplace/pp/prodview-7eav2xsxvnupy | accessed 2026-10-15 | VENDOR | Quote: "Dataminr provides 24/5 technical support via phone, email and knowledge base resources (login required)."

### 2.2 Historic per-license prices from FOIA records

- **In 2017, Dataminr quoted DC police $6,850 per license per year, which it said had risen to $7,850. It also pushed for a minimum purchase size.**
  Source: https://www.brennancenter.org/sites/default/files/2024-04/B52-54%20Dataminr%20Email%20re%20Pilot%20and%20Procurement.pdf | email dated 2017-10-30; published by the Brennan Center in April 2024 | GOVERNMENT RECORD [FOIA release; email written by Dataminr] | Quotes: "our now old price of $6,850 (the current price is actually $7,850) for a total 1-year cost of $68,500" / "Dataminr has to maintain some level of minimum purchase based on the size of the agency"
- **Actual DC purchases: 7 police licenses for $47,950 in 2018, and 50 licenses for the DC tech office for $200,000.** Derived: about $6,850 and $4,000 per license.
  Source: https://www.brennancenter.org/our-work/analysis-opinion/documents-reveal-how-dc-police-surveil-publics-social-media-profiles-and | 2024-04-30 | JOURNALISM [NGO, based on FOIA records] | Quotes: "In 2018, the DC police purchased seven annual licenses with Dataminr for" / "purchased 50 Dataminr licenses for $200,000"
- **In 2016 Dataminr told LAPD that the per-user annual fee was its only charge.** The price itself is redacted in the document.
  Source: https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf | memo dated 2016-05-04 (Brennan Center upload, Sept 2021) | GOVERNMENT RECORD [FOIA release; memo written by Dataminr] | Quote: "Dataminr does not meter data or charge for any additional services; the per user per year cost is the only fee."

### 2.3 U.S. federal contracts (USAspending.gov API, queried 2026-10-15)

Source type for all of 2.3: GOVERNMENT RECORD. Records were opened via https://api.usaspending.gov/api/v2/search/spending_by_award/ (recipient "DATAMINR, INC.") and https://api.usaspending.gov/api/v2/awards/{id}/. The human-readable page for each award is https://www.usaspending.gov/award/{id}.

- **Total: 42 prime contract awards, $486.9M obligated (FY2016 to FY2026 to date). The Department of Defense accounts for 90.6% of it, and the Air Force alone for $428.7M.** Derived: I summed the "Award Amount" fields.
  Caveat: this excludes purchases through resellers, subawards, and state and local buying.
- **Air Force/DoD enterprise license "PADELS", FA701421C0024: $298,797,862.68 obligated, 2021-06-26 to 2026-09-25, 3 offers.** Derived: about $57M a year.
  URL: https://www.usaspending.gov/award/CONT_AWD_FA701421C0024_9700_-NONE-_-NONE- | signed 2021-06-24 | Quote: "PUBLICLY AVAILABLE INFORMATION DEPARTMENT OF DEFENSE ENTERPRISE LICENSE SUBSCRIPTION (PADELS)"
- **State Department First Alert licenses: $7,055,000 per year, not competed.**
  URL: https://www.usaspending.gov/award/CONT_AWD_19AQMM23F2719_1900_19AQMM20D0125_1900 | 2023-09-19 to 2024-09-18 | Quote: "FIRST ALERT LICENSES." (record fields: "NOT COMPETED", "ONLY ONE SOURCE")
- **FEMA paid $45,000 for 3 First Alert for First Response licenses.** Derived: $15,000 per license per year.
  URL: https://www.usaspending.gov/award/CONT_AWD_70FA4023P00000079_7022_-NONE-_-NONE- | 2023-09-26 to 2024-09-25 | Quote: "THE CONTRACTOR SHALL PROVIDE 3 FIRST ALERT FOR FIRST RESPONSE SOFTWARE LICENSES"
- **U.S. Marshals paid $240,000 for 12 annual subscriptions.** Derived: $20,000 each.
  URL: https://www.usaspending.gov/award/CONT_AWD_15M20020PA32OP002_1544_-NONE-_-NONE- | 2020-07-31 to 2021-07-31 | Quote: "FIRST ALERT FOR FIRST RESPONSE - 12 ANNUAL SUBSCRIPTIONS"
- **FEMA paid $30,000 for one trial enterprise license.**
  URL: https://www.usaspending.gov/award/CONT_AWD_70FBR218P00000386_7022_-NONE-_-NONE- | 2018-08-21 | Quote: "TO PROCURE ONE (1) FIRST ALERT TRIAL ENTERPRISE LICENSE."
- **The DEA paid $154,000 for 12 months of First Alert, sole source.**
  URL: https://www.usaspending.gov/award/CONT_AWD_15DDHQ23P00000174_1524_-NONE-_-NONE- | 2023-02-10 | Quote: "PROCURE FIRST ALERT LICENSE PERIOD OF PERFORMANCE: 12 MONTHS FROM DATE OF AWARD"
- **The FBI paid $6,993,125 for 2017 to 2020.**
  URL: https://www.usaspending.gov/award/CONT_AWD_DJF171200P0002894_1549_-NONE-_-NONE- | 2017-01-31 to 2020-03-31 | Quote: "DATAMINR ADVANCED ALERTING TOOL"

### 2.4 Competitive price evidence from a bid protest

- **When the Air Force picked Dataminr, its price was 283% higher than rival Babel Street's.** The agency still judged it best value, mainly because of Twitter firehose access (see Q3).
  Source: https://www.gao.gov/products/b-418730.5%2Cb-418730.6 | decision 2021-06-15 | GOVERNMENT RECORD [GAO bid-protest decision] | Quotes [fetch-tool quote]: "283 percent higher than Babel's price of $67,500,000" / "The independent government cost estimate (IGCE) was approximately $293 million."

### 2.5 News reports of contract sizes

- **New Air Force contract in August 2026: $317.8M through 2031, from 8 offers.** It is not yet visible in USAspending as of 2026-10-15; I checked award ID FA701426C0026 and found no record.
  Source: https://news.clearancejobs.com/2026/08/26/dataminr-wins-318m-air-force-global-event-alerting-contract/ | 2026-08-26 | JOURNALISM [reprint of DoD contract announcement] | Quote: "$317,806,746 firm-fixed-price contract for A2 Publicly Available Information Alerting"
  Also: https://defensescoop.com/2026/08/27/pentagon-awards-dataminr-318m-contract/ | 2026-08-27 | JOURNALISM | Quote: "The award was issued by the Air Force, but the capability is expected to scale across the DOD"
- **2020 Air Force award: $258.7M over five years, 3 bids.**
  Source: https://www.washingtontechnology.com/2020/04/ai-firm-clinches-258m-air-force-push-alert-contract/354945/ | 2020-04-27 | JOURNALISM | Quote: "The Air Force received three bids for the contract"
- **Houston city council approved $108,000 for Houston police.**
  Source: https://houstonlanding.org/houston-council-renews-support-for-dataminr-social-media-monitoring-tool-used-by-police/ | 2024-02-21 | JOURNALISM | Quote [fetch-tool quote]: "spending $108,000 on software from Dataminr"
- **NYC Fire Department renewed First Alert for $75,399 through a reseller, as a noncompetitive small purchase.**
  Source: https://a856-cityrecord.nyc.gov/RequestDetail/20260420047 | 2026-04-27 | GOVERNMENT RECORD | Quote: "Dataminr First Alert Licenses ... M/WBE Noncompetitive Small Purchase ... $75,399.00 Contract Amount"
- **Buffalo police: a two-year, $82,800 contract.** **Unverified.** I saw this only in a search snippet of WGRZ, and the page blocked my tools. A local council summary that I could open confirms the purchase request but not the amount: https://ppgbuffalo.org/news-and-events/news/article:12-13-2024-12-00am-buffalo-common-council-summary-week-of-december-9-2024/ (2024-12-13).

**Typical ranges (derived from the above):**
- Per seat: about $4,000 to $7,850 in DC in 2017-18; $15,000 to $20,000 in federal First Alert buys from 2020-23; $30,000 list price on AWS in 2026. Vendr's median contract is $22,000 a year.
- Enterprise: the DoD-wide license costs roughly $57M to $66M a year (PADELS 2021-26; the 2026 award runs to 2031).
- Many federal buys were sole source.

---

## Q3. Data-access dependency: Twitter/X and other platforms

### 3.1 History with Twitter/X (chronological)

- **2016: Dataminr told LAPD that Twitter partly owned it and had guaranteed it firehose access on a rolling 5-year basis.**
  Source: https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf | 2016-05-04 | GOVERNMENT RECORD [FOIA; memo written by Dataminr] | Quotes: "Dataminr is partially owned by Twitter, which gives Dataminr exclusive one-of-a-kind data access to the entire Twitter firehose of 500 million daily public tweets." / "guaranteed access to the Twitter firehose for a rolling 5-year basis"
- **May 2016: Twitter had Dataminr stop serving U.S. intelligence agencies, which were in an unpaid pilot. Twitter then held about 5% of Dataminr.**
  Source: https://techcrunch.com/2016/05/09/dataminr-was-in-an-unpaid-pilot-with-intel-agencies-when-twitter-ended-the-deal/ | 2016-05-09 | JOURNALISM | Quotes: "were using Dataminr in an unpaid pilot" / "This is a longstanding Twitter policy, not a new development"
  Also: https://www.engadget.com/2016-05-09-twitter-blocks-us-spies-from-analyzing-your-tweets.html | 2016-05-09 | JOURNALISM | Quotes (Twitter): "never authorized Dataminr or any third party to sell data to a government or intelligence agency for surveillance purposes" / on the stake: "five percent share"
- **November 2016: the FBI still received a "limited" breaking-news product under a sole-source contract for about 200 licenses.**
  Source: https://www.nextgov.com/emerging-tech/2016/11/fbi-awards-dataminr-contract-twitter-firehose/133152/ | 2016-11-14 | JOURNALISM | Quote: "The bureau awarded a sole-source contract to Dataminr"
  Source: https://techcrunch.com/2016/11/15/fbi-will-receive-limited-twitter-firehose-access-through-dataminr-but-has-to-watch-its-step/ | 2016-11-15 | JOURNALISM | Quotes (Dataminr): "a limited version of our breaking news alerting product" / "Dataminr is not a product that enables surveillance"
- **December 2016: after ACLU records requests, Twitter told Dataminr to cut off all 77 U.S. fusion centers.**
  Source: https://techcrunch.com/2016/12/15/twitter-cuts-dataminr-access-for-law-enforcement-fusion-centers/ | 2016-12-15 | JOURNALISM | Quotes: "would instruct Dataminr to cut off access for all 77 fusion centers in the United States" / Dataminr's position: it "does not share the "firehose" data with any of its customers"
- **2020: Twitter's 2016 letter to Dataminr had said surveillance use was prohibited.**
  Source: https://theintercept.com/2020/07/09/twitter-dataminr-police-spy-surveillance-black-lives-matter-protests/ | 2020-07-09 | JOURNALISM | Quote: "use of Twitter data for surveillance is strictly prohibited"
- **2021: Twitter was no longer a shareholder but "remains a key partner for data".**
  Source: https://techcrunch.com/2021/03/23/dataminr-raises-475m-on-a-4-1b-valuation-for-real-time-insights-based-on-100k-sources-of-public-data/ | 2021-03-23 | JOURNALISM | Quotes: "Twitter used to be a 5% shareholder in the company." / "Bailey confirmed to me that it no longer is but remains a key partner for data."
- **2021: firehose access decided a major government procurement.** The GAO decision records the Air Force's reasoning.
  Source: https://www.gao.gov/products/b-418730.5%2Cb-418730.6 | 2021-06-15 | GOVERNMENT RECORD | Quotes [fetch-tool quote]: "This broad access to the Twitter firehose is incredibly important to the Government" / Babel Street "does not offer the same historical and future access to the Twitter firehose"
- **2023, after the X API changes: Dataminr still had full-stream access.** It told the Secret Service so in a July 2023 email, per FOIA documents. Twitter had sold its stake before Musk bought the company. Neither X nor Dataminr commented to The Intercept.
  Source: https://theintercept.com/2024/03/25/elon-musk-x-dataminr-surveillance-privacy/ | 2024-03-25 | JOURNALISM | Quotes: "we have real-time access to the full stream of all publicly available Tweets" / "Twitter previously owned a stake in Dataminr, though divested before Musk's purchase" / "Neither X nor Dataminr responded to a request for comment"
- **2023 context: X's paid API hit crisis responders and researchers.** This is general evidence about how fragile platform access is; it is not specific to Dataminr.
  Source: https://news.northeastern.edu/2023/02/15/twitter-api/ | 2023-02-15 | ACADEMIC [university news] | Quote: "By adding an access fee, Twitter is closing off a critical source of real-time information for rescuers"
  Source: https://www.kqed.org/news/11941009/twitters-plan-to-charge-for-crucial-tool-used-in-humanitarian-aid-sparks-outcry | 2023-02-13 (AP) | JOURNALISM | Quote: "thousands of volunteer software developers have been using a crucial Twitter tool to comb the platform for calls for help"
- **Current status (2026): Dataminr's First Alert contract still incorporates X's content rules and names X Corp.** This indicates continued use of X data.
  Source: https://www.dataminr.com/legal/firstalert-msa/ | "Updated March 2026" | VENDOR [Dataminr contract] | Quote [fetch-tool quote]: "surveillance purposes, which both Dataminr and X Corp. ("X") policies do not allow."
  Source: https://ppgbuffalo.org/news-and-events/news/article:12-13-2024-12-00am-buffalo-common-council-summary-week-of-december-9-2024/ | 2024-12-13 | JOURNALISM [local civic NGO summary] | Quote: "Dataminr is a partner of X (formerly Twitter), and therefore gets special access to posted data."
- **Dataminr now markets itself as using far more than X.**
  Source: https://aws.amazon.com/marketplace/pp/prodview-7eav2xsxvnupy | accessed 2026-10-15 | VENDOR | Quote: "ingests information from over 1M+ publicly available data sources in 150+ languages in 220+ countries"
- **Unverified:** the price, length and exclusivity of Dataminr's current X agreement. Also unverified: whether the 2016 "rolling 5-year" guarantee still exists. No public source I opened states either.
- **Lower-trust lead:** in 2022 an advocacy blog reported that DISA (which serves the White House) required a "certified Twitter partner". This suggests government buyers may write the dependency into requirements. Source: https://reclaimthenet.org/white-house-to-partner-with-social-media-monitoring-tool/ | 2022-11-09 | JOURNALISM [advocacy blog; underlying DISA document not opened] | Quote [fetch-tool quote]: "must be a certified Twitter partner"

### 3.2 What Dataminr cannot see

- **Only public data.** Dataminr staff told a city oversight body that it uses only public information and cannot search by individuals.
  Source: https://www.syr.gov/files/sharedassets/public/2-departments/api/surv.-tech-working-group-files/meeting-minutes/ap-stmeeting27-6.21.22-220622-1431-1.pdf | meeting 2022-06-21 | GOVERNMENT RECORD [Syracuse Surveillance Technology Working Group minutes] | Quotes: "Sarah stated that they are only accessing Twitter's publicly available data" / "Can't search by individuals"
- **Private Facebook data is out of reach, and platforms can withdraw public access.** Dataminr said this itself in 2016.
  Source: https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf | 2016-05-04 | GOVERNMENT RECORD [FOIA; Dataminr memo] | Quotes: "a vast majority of Facebook data is private; and no company has access to Facebook's private data" / "many companies have seen their access to Facebook's public data go away in recent months"
- **End-to-end encrypted messaging, such as WhatsApp, is closed by design.**
  Source: https://www.whatsapp.com/privacy | accessed 2026-10-15 | VENDOR [WhatsApp] | Quote [fetch-tool quote]: "meaning not even WhatsApp can see them."
- **Most large platforms do not offer firehose-level access at all.** Research therefore leans on Twitter, which gives an incomplete view.
  Source: https://arxiv.org/abs/1407.7071 (Imran, Castillo, Diaz, Vieweg, "Processing Social Media Messages in Mass Emergency: A Survey", ACM Computing Surveys; arXiv v3) | 2015-04-16 | ACADEMIC | Quotes: "This is in contrast with most large social media platforms, which do not offer this level of data access publicly." / "which provides an incomplete view of a crisis situation"
- **Contract limits on X content.** Even where X content is visible, the contract bars customers from using it to monitor protests and similar events.
  Source: https://www.dataminr.com/legal/firstalert-msa/ | "Updated March 2026" | VENDOR | Quote [fetch-tool quote]: "(b) tracking, alerting, or other monitoring of sensitive events" "(including but not limited to protests, rallies, or community organizing meetings);"

---

## Q4. Civil liberties and ethics

### 4.1 Criticism and documented use

- **2016, fusion centers:** the ACLU found that fusion centers had a Dataminr geospatial tool, and that Dataminr said its products could be tailored to protests.
  Source: https://www.aclu.org/news/privacy-technology/twitter-cuts-fusion-spy-centers-access-social-media | 2016-12-15 | JOURNALISM [NGO/advocacy] | Quotes: "Settings in the Geospatial App even allowed the government to focus on monitoring journalists and organizations" / "could be customized to track protests"
- **2016, LAPD trial:** Dataminr helped monitor a Black Lives Matter (BLM) protest on May Day. This comes from Dataminr's own memo to LAPD.
  Source: https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf | 2016-05-04 | GOVERNMENT RECORD [FOIA; Dataminr memo] | Quote: "By monitoring for "protest", "march", and "mayday" in the Area Analysis Application, Dataminr uncovered a tweet from the LA Black Lives Matter account"
- **2020, George Floyd protests:** Dataminr relayed protest posts to police, including Minneapolis.
  Source: https://theintercept.com/2020/07/09/twitter-dataminr-police-spy-surveillance-black-lives-matter-protests/ | 2020-07-09 | JOURNALISM | Quotes (source): "at the request of the police they are tracking protests, and therefore protesters" / example alert: "Peaceful protest at Lake & Lyndale"
  - **Dataminr's response, same article:** "First Alert is not permitted to be used for surveillance of any kind by First Alert users" / "Alerts on an intersection being blocked are news alerts, not monitoring protests or surveillance"
  - **Twitter's response:** "We see a societal benefit in public Twitter data being used for news alerting, first responder support, and disaster relief"
  - **ACLU of Minnesota:** https://www.aclu-mn.org/publications/twitter-stop-letting-law-enforcement-target-your-users/ | 2020-07-09 | JOURNALISM [NGO/advocacy] | Quote: "including the Minneapolis Police Department"
- **2020, racial bias:** insiders said human analysts built police alert streams in ways prone to bias.
  Source: https://theintercept.com/2020/10/21/dataminr-twitter-surveillance-racial-profiling/ | 2020-10-21 | JOURNALISM | Quotes: "It was never targeted towards other areas in the city, it was poor, minority-populated areas" / "Any sort of housing project, bad neighborhood, bad intersection, we would definitely put those in the streams"
  - **Dataminr's response:** "97% of our alerts are generated purely by AI without any human involvement" / "Race, ethnicity, or any other demographic characteristic of the people posting public social media posts about events is never part of determining" whether an alert is sent
  - **Twitter's response:** "Twitter prohibits the use of our developer services for surveillance purposes. Period." Twitter said it had done "extensive auditing of Dataminr's tools, including First Alert"
- **2022, abortion-rights protests (reported May 2023):** the U.S. Marshals received Dataminr alerts on protests. The FOIA documents cover April to July 2022.
  Source: https://theintercept.com/2023/05/15/abortion-surveillance-dataminr/ | 2023-05-15 | JOURNALISM | Quotes: "The documents obtained by The Intercept are from April to July 2022" / "the precise time and location of both ongoing and planned abortion rights demonstrations" / ACLU's Jennifer Granick: "This is a technique that's ripe for abuse, but it's not subject to either legislative or judicial oversight"
  - **Dataminr's response:** "First Alert is not permitted to be used for surveillance of any kind by First Alert users"
- **2023-24, Secret Service, and EFF/ACLU criticism:**
  Source: https://theintercept.com/2024/03/25/elon-musk-x-dataminr-surveillance-privacy/ | 2024-03-25 | JOURNALISM | Quotes: Secret Service email: "The whole point of this contract is to use the information for law enforcement purposes" / Granick: "unregulated disclosures and speculative predictions that can falsely ensnare the innocent" / EFF's Adam Schwartz: "platforms must not provide special services, like real-time access to the full stream of public-facing posts, to surveillance vendors"
  - No response: "Neither X nor Dataminr responded to a request for comment"
- **DC police (FOIA):** alerts tracked protests and surfaced an ordinary person's profile.
  Source: https://www.brennancenter.org/our-work/analysis-opinion/documents-reveal-how-dc-police-surveil-publics-social-media-profiles-and | 2024-04-30 | JOURNALISM [NGO, FOIA-based] | Quotes: "faced fierce blowback for leveraging its access to X's data" / "the social media profile of a recent college graduate with fewer than 100 followers"
- **Local adoption with little debate:** Houston in 2024 and Buffalo in 2024.
  Source: https://houstonlanding.org/houston-council-renews-support-for-dataminr-social-media-monitoring-tool-used-by-police/ | 2024-02-21 | JOURNALISM | Quotes [fetch-tool quote]: Texas Civil Rights Project's Christopher Rivera: "oftentimes criminalize protected speech" / Houston police: "It's all public source information, so there shouldn't be any privacy concerns."
  - **Dataminr's response, same article [fetch-tool quote]:** "First Alert is designed to prevent any form of surveillance." / it "technologically restricts the ability to target, profile, monitor or search."
  Source: https://ppgbuffalo.org/news-and-events/news/article:12-13-2024-12-00am-buffalo-common-council-summary-week-of-december-9-2024/ | 2024-12-13 | JOURNALISM [local civic NGO] | Quote (Buffalo police commissioner): "It's fair game to anybody"

### 4.2 Dataminr's stated policies and commitments

- **2016 commitment, as reported by the ACLU:** https://www.aclu.org/news/privacy-technology/twitter-cuts-fusion-spy-centers-access-social-media | 2016-12-15 | Quote: "will no longer provide social media surveillance tools to any local, state, or federal government customer"
- **CEO in 2021:** https://techcrunch.com/2021/03/23/dataminr-raises-475m-on-a-4-1b-valuation-for-real-time-insights-based-on-100k-sources-of-public-data/ | 2021-03-23 | JOURNALISM | Quote: "The product can't be used for surveillance"
- **Told to the Syracuse oversight body in 2022:** https://www.syr.gov/files/sharedassets/public/2-departments/api/surv.-tech-working-group-files/meeting-minutes/ap-stmeeting27-6.21.22-220622-1431-1.pdf | 2022-06-21 | GOVERNMENT RECORD | Quotes: "Can't search by a handle or a hashtag, focus is on breaking news events" / "Clients have asked to be able to track individuals or protests and Sara stated that they don't sell to them."
- **2025:** https://techcrunch.com/2025/03/19/analytics-company-dataminr-secures-85m-to-fund-growth/ | 2025-03-19 | JOURNALISM | Quote: Dataminr "doesn't offer functionality that would allow a customer to pinpoint a person's — or protestor's — location on a map"
- **Contract (2026):** the X-content clause bars protest tracking (quoted in Q3.2). Source: https://www.dataminr.com/legal/firstalert-msa/ | VENDOR.
- **Critics' counterpoint:** the "news alert" framing is "a distinction without difference" (USC's Ángel Díaz, quoted in The Intercept, 2020-10-21, and Houston Landing, 2024-02-21). Intercept quote: "This is a distinction without difference."

---

## Q5. Accuracy limits

### 5.1 Dataminr's own terms and claims

- **The contract disclaims any guarantee of accuracy or timeliness.**
  Source: https://www.dataminr.com/legal/firstalert-msa/ | "Updated March 2026" | VENDOR | Quote [fetch-tool quote]: "Customer acknowledges that Dataminr does not guarantee the sequence, accuracy, completeness, or timeliness of the Services"
- **It does not predict events.**
  Source: https://www.syr.gov/files/sharedassets/public/2-departments/api/surv.-tech-working-group-files/meeting-minutes/ap-stmeeting27-6.21.22-220622-1431-1.pdf | 2022-06-21 | GOVERNMENT RECORD | Quote: "Sarah Robbins shared that they do not predict events, they just report on them."
- **The 2016 "no noise" marketing claim conflicts with later user reviews (Q1a).**
  Source: https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf | 2016-05-04 | GOVERNMENT RECORD [Dataminr memo] | Quote: "No noise: Dataminr alerts are not noisy; when Dataminr sends users an alert, it's actionable."
- **Location is often inferred, not known.** In 2016 Dataminr inferred locations for only about 60% of tweets.
  Source: same memo | Quote: "Dataminr predicts the location of up to around 60% of the Twitter firehose in addition to providing the 2-3% of geotagged data"
  Academic corroboration: https://arxiv.org/abs/1407.7071 | 2015 | ACADEMIC | Quote: "only 2% of crisis-related messages include machine-readable location information"

### 5.2 Documented or alleged wrong alerts

- **A user reported a mislabeled object (a BMP-3 infantry vehicle called a tank) and had no way to correct it.**
  Source: https://aws.amazon.com/marketplace/pp/prodview-7eav2xsxvnupy (G2 review, Broadcast Media) | 2022-04-27 | USER REVIEW | Quote: "saw post that misidentified a Bmp-3 as a tank ... and was unable to say to dataminr that was wrong."
- **TechCrunch reported an accusation that Dataminr got critical facts wrong.** TechCrunch links the accusation to an X post that I could not open (402), so the details are **unverified**. TechCrunch notes Dataminr says it is "constantly improving its technology".
  Source: https://techcrunch.com/2025/03/19/analytics-company-dataminr-secures-85m-to-fund-growth/ | 2025-03-19 | JOURNALISM | Quote: "Dataminr has been accused of getting critical facts wrong, like the status of American servicemembers in Western Iraq."
- **Missed alerts:** I found **no independent, documented case** of Dataminr missing a major event. This is unverified either way; my search budget ran out before I could look further.

### 5.3 Human judgement, bias and verification

- **Human analysts had no formal guidance on judging gang membership.**
  Source: https://theintercept.com/2020/10/21/dataminr-twitter-surveillance-racial-profiling/ | 2020-10-21 | JOURNALISM | Quote: "With no formal training provided on how to identify or verify gang membership ... were essentially left to use their best judgment"
  Dataminr's response, same article: "97% of our alerts are generated purely by AI without any human involvement"
- **Newsroom practice: alerts are treated as tips, not facts.**
  Source: https://mediacopilot.ai/patch-dataminr-breaking-news-ai-alerts/ | 2026-03-03 (summarizing a Patch case study dated 2026-02-25) | JOURNALISM [trade site; AI-drafted, human-edited] | Quotes (Patch editor Anna Schier): "I don't ever trust that it's right." / "Dataminr's job is to raise alarm bells and let me decide what to do with them"
- **A competitor's founder on the trade-off between speed and verification.**
  Source: https://www.buzzfeednews.com/article/craigsilverman/breaking-news-app-factal-launch-nbc-news | 2018-08-14 | JOURNALISM | Quote [fetch-tool quote] (Factal's Cory Bergman): "Then you have signal detection, which has no verification."
- **Early warning on tool bias.**
  Source: https://www.cjr.org/analysis/the_new_importance_of_social_listening_tools.php | 2015-07-06 | JOURNALISM | Quote: "the problem, Lotan says, is anticipating the bias in how a tool makes its decisions"

### 5.4 Misinformation risk (general to social-media alerting)

- **False news spreads faster than true news on Twitter.**
  Source: https://news.mit.edu/2018/study-twitter-false-news-travels-faster-true-stories-0308 (Vosoughi, Roy, Aral, *Science*) | 2018-03-08 | ACADEMIC | Quote: "false news stories are 70 percent more likely to be retweeted than true stories are"
- **An AI-generated fake Pentagon explosion briefly moved markets.** I found **no evidence that Dataminr relayed it**; it is included only as an example of the class of risk.
  Sources: https://techxplore.com/news/2023-05-fake-image-pentagon-explosion-briefly.html | 2023-05-22 (AFP) | JOURNALISM | Quote [fetch-tool quote]: "the S&P 500 stumbling by 0.29 percent compared to its Friday close before recovering"
  https://politifact.com/factchecks/2023/may/25/facebook-posts/fake-photo-used-in-claim-that-the-pentagon-was-att/ | 2023-05-25 | JOURNALISM | Quote: "there is no explosion or incident taking place at or near the Pentagon"

### 5.5 Coverage bias: regions, languages and populations (crisis informatics)

- **The Twitter user base is not representative.**
  Source: https://arxiv.org/abs/2210.03352 (Kraft & Usbeck, "The Ethical Risks of Analyzing Crisis Events on Social Media with Machine Learning") | 2022-10-07 | ACADEMIC | Quote: "most research done on Twitter corpora is based on the perceptions of a non-representative sample of people"
- **Low-resource languages are neglected.**
  Same source | Quote: "88% of all languages are completely ignored by NLP research"
- **The people most affected by crises are the least represented.**
  Same source | Quote: "Those who suffer most from crises and would particularly benefit from support and prevention systems are least likely to be considered during development."
- **Crawford & Finn's "limits of crisis data", as summarized in that paper:** attention spikes do not match the timeline of a crisis.
  Same source | Quote: "Social media activities spike around more sensational instances, although crises onsets are oftentimes followed-up by long-term effects."
  The original paper is Crawford & Finn, GeoJournal, DOI 10.1007/s10708-014-9597-z. I could not open it (paywall redirect), so I cite it only through Kraft & Usbeck.
- **In the U.S., a small minority posts most tweets.**
  Source: https://www.pewresearch.org/internet/2019/04/24/sizing-up-twitter-users/ | 2019-04-24 | ACADEMIC [survey research] | Quote: "The 10% of users who are most active in terms of tweeting are responsible for 80% of all tweets created by U.S. users"
- **Global internet gap:** places with few people online produce few posts to detect.
  Source: https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-use/ | 2025 (URL dated 2025-10-15) | GOVERNMENT RECORD [UN agency statistics] | Quotes: "only 23 per cent of the population of low-income countries are using the Internet" / "74 per cent of the world's population are online"
- **Dependence on a few data providers reduces effectiveness.**
  Source: https://arxiv.org/abs/1407.7071 | 2015 | ACADEMIC | Quote: "a dependency on a small set of data providers or APIs, further reduces the efficiency and effectiveness of tools"
- **Product-level signal:** a G2 reviewer reported heavy noise in Iraq and Turkey (Q1a), and another asked for "better localization" (Q1f).

---

## Q6. Business situation and competitors

### 6.1 Finances and staffing

- **2018 valuation $1.6B; 2021 valuation $4.1B, with an IPO planned for 2023.**
  Source: https://techcrunch.com/2021/03/23/dataminr-raises-475m-on-a-4-1b-valuation-for-real-time-insights-based-on-100k-sources-of-public-data/ | 2021-03-23 | JOURNALISM | Quote: "Dataminr has confirmed that this Series F values the company at $4.1 billion as it gears up for an IPO in 2023"
- **Layoffs: about 20% of staff (about 150 people) in November 2023.**
  Source: https://techcrunch.com/2023/11/28/dataminr-the-4b-big-data-startup-is-laying-off-20-of-staff-today-or-150-people-as-it-preps-to-double-down-on-ai/ | 2023-11-28 | JOURNALISM | Quotes: "laying off 20% of staff today, or 150 people" / CEO memo: "the recent rapid advancements of our AI platform"
  Later layoff rounds: **unverified** (only anonymous employee-review claims; no press coverage found).
- **2025: still private. New money came as convertible financing that set no valuation, so any valuation after 2021 is unverified. ARR was "approaching $200 million".**
  Source: https://techcrunch.com/2025/03/19/analytics-company-dataminr-secures-85m-to-fund-growth/ | 2025-03-19 | JOURNALISM | Quotes: "pre-IPO convertible financing" / "doesn't set a valuation" / "approaching $200 million in annual recurring revenue"
- **Acquired ThreatConnect for $290M, expanding into cyber threat intelligence.**
  Source: https://cyberscoop.com/dataminr-threatconnect-acquisition/ | 2025-10-21 | JOURNALISM | Quote: "$290 million"
- **Revenue concentration (derived):** about 91% of U.S. federal prime-contract dollars come from the DoD (USAspending, Q2.3). The new $318M Air Force award (2026) increases dependence on defense budgets.

### 6.2 How buyers and analysts compare Dataminr with rivals

- **Air Force evaluation (Babel Street versus Dataminr):** Dataminr rated higher on technical merit, mostly because of firehose access, at 283% higher price. A third offeror was 25% cheaper. Source: https://www.gao.gov/products/b-418730.5%2Cb-418730.6 | 2021-06-15 | GOVERNMENT RECORD | Quote [fetch-tool quote]: "of $258,661,096.66 was 25 percent higher than the third offeror's price"
- **Mindshare in Critical Event Management, from PeerSpot user engagement:** Everbridge Crisis Management 10.2%, OnSolve 10.1%, Dataminr Pulse 3.3%.
  Source: https://www.peerspot.com/products/dataminr-reviews | Oct 2026 | USER REVIEW [platform metadata] | Quote: "Dataminr Pulse 3.3% Everbridge Crisis Management 10.2% OnSolve Platform for Critical Event Management 10.1%"
- **Analyst benchmark:** Frost & Sullivan's "Frost Radar: Risk Intelligence Solutions, 2026" profiles Dataminr alongside Crisis24, Everbridge, Flashpoint, LifeRaft, Ontic, Seerist, ZeroFox and others. Dataminr's placement is behind a paywall and **unverified**.
  Source: https://store.frost.com/frost-radar-risk-intelligence-solutions-2026.html | 2026-02-20 | VENDOR [analyst-report store page] | Quote: "Frost Radar™: Risk Intelligence Solutions, 2026 Published on: 20-Feb-2026"
  Seerist's page describes the same report: https://seerist.com/reports/frost-radar-risk-intelligence-2026 | 2026 | VENDOR [competitor]
- **Buyer voices on G2:**
  - Unnamed reviewer, 2022-04-20, 1.5/5 | USER REVIEW | Quote: "I prefer VCC and would suggest a change." (VCC is presumably Everbridge Visual Command Center; my inference.)
  - Arnab Kumar C., 2025-11-18 | Quote: "faster at detecting potential risk situations compared to other products like Feedly"
- **Factal's model (human-verified alerts) versus Dataminr's model (automated detection):**
  Source: https://www.buzzfeednews.com/article/craigsilverman/breaking-news-app-factal-launch-nbc-news | 2018-08-14 | JOURNALISM | Quote [fetch-tool quote]: "automated detection of newsworthy signals from social media"
- **Market consolidation among rivals:**
  - Everbridge was taken private by Thoma Bravo for about $1.8B. Source: https://www.sec.gov/Archives/edgar/data/1437352/000119312524173902/d804733dex991.htm | 2024-07-02 | GOVERNMENT RECORD [SEC 8-K exhibit] | Quote [fetch-tool quote]: "valued at approximately $1.8 billion"
  - Recorded Future was acquired by Mastercard. Source: https://www.recordedfuture.com/newsroom/press-releases/mastercard-finalizes-acquisition-recorded-future | Dec 2024 (date not shown on page) | VENDOR | Quote: "works with over 1,900 businesses and government organizations across more than 75 countries"
- **Samdesk, Crisis24, LifeRaft, Ontic and Seerist:** I found **no independent head-to-head evaluation** against Dataminr (unverified). Comparison pages from Samdesk and other competitors exist, but they are vendor marketing and I did not use them.

---

## Q7. Communities for practical wisdom

1. **ISCRAM: Information Systems for Crisis Response and Management.** https://iscram.org/ | VENDOR [organization's own site] | Quote: "ISCRAM is a learned society for people working in the field of Information Systems for Crisis Response And Management"
   Why credible: a researcher-practitioner society founded in 2004, with peer-reviewed, open-access proceedings ("over 2000 research papers"). It is the best place to learn the evidence on the limits of social-media event detection.
2. **OSAC: Overseas Security Advisory Council (U.S. State Department).** https://www.osac.gov/ (official site; blocked my tools). Background from https://en.wikipedia.org/wiki/Overseas_Security_Advisory_Council | OTHER [Wikipedia; used only because the official site was unreachable] | Quotes: "was created in 1985" / "Any private-sector organization incorporated in the United States is eligible to join"
   Why credible: a long-running government and private-sector forum where corporate security teams share incident reporting and best practice on overseas risk. This is the core use case for Dataminr Pulse.
3. **ASIS International.** https://www.asisonline.org/ (blocked my tools). Background from https://en.wikipedia.org/wiki/ASIS_International | OTHER [Wikipedia] | Quote: "currently includes 34,600 members in 155 countries and 240 local chapters"
   Why credible: the main professional body for security managers since 1955. It runs certification programs (CPP, PSP, PCI) and local chapters where buyers compare tools candidly.
4. **Bellingcat and its Volunteer Community.** https://www.bellingcat.com/about/who-we-are/ | VENDOR [organization's own site] | Quote: "independent investigative collective of researchers, investigators and citizen journalists"
   Why credible: a leading open-source investigation organization since 2014. Its volunteer community, linked to a Discord server from the page, teaches verification, which is the skill Dataminr alerts still need.
- **Optional, not verified:** r/OSINT (https://www.reddit.com/r/OSINT/). Reddit was blocked for my tools, so I could not check its rules or quality.

---

## Gaps and unverified items

- **Review sites:** G2 (direct), Capterra, TrustRadius and Gartner Peer Insights blocked my tools, and Reddit could not be accessed. Only G2 content syndicated on AWS was used.
- **Buffalo contract:** the $82,800 value is from a search snippet only.
- **Dataminr–X agreement:** current terms, price, length and whether it is exclusive, all after 2023.
- **Valuation:** no public figure after 2021.
- **Layoffs:** whether there were rounds after November 2023.
- **Missed alerts:** no documented, independent case of a major missed event found.
- **Western Iraq accusation:** the underlying X post (cited by TechCrunch) could not be opened.
- **Frost Radar:** Dataminr's placement (paywalled).
- **Direct comparisons:** no independent evaluations against Samdesk, Crisis24, LifeRaft, Ontic or Seerist.
- **Crawford & Finn (2015) and Crawford's HBR (2013) Hurricane Sandy example:** I could not open the full texts. The Sandy point is cited only through Kraft & Usbeck's summary.
- **Search budget:** my web-search budget was exhausted late in the work. Leads not pursued include the FBI's possible switch from Dataminr to another vendor before January 2021, and Vice/Motherboard coverage (none found in earlier searches).
