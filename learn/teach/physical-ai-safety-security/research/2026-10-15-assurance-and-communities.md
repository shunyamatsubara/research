# Research notes: assurance and communities

Raw report from a research agent, 2026-10-15. Working notes, not a lesson.
Claims carry the source URL the agent read. Facts used in lessons were re-checked;
re-check anything else against its source before teaching or client use.

---

# Showing a physical-AI robot is safe enough: V&V, safety cases, hazard analysis, runtime monitoring (checked 2026-10-15)

**How I checked.** I downloaded and read these primary documents in full or in the relevant sections: the UL 4600 voting draft, GSN v3, the STPA Handbook, SACE v1.1, AMLAS, RAND, two Koopman papers, the Waymo and Aurora papers, and TRI's paper. My web-search quota ran out near the end, so I did the last checks by opening pages directly. Some sites blocked me; they are listed in §6. Where I write "UL 4600 draft §x", I mean the **Dec-2019 voting draft** that Koopman posts publicly (https://users.ece.cmu.edu/~koopman/ul4600/191213_UL4600_VotingVersion.pdf). The published editions are paywalled and may differ.

## 1. Key findings

**Q1 – Steps from a working demo to an "acceptably safe" argument.** This is my synthesis; each step cites the source behind it.
1. **Define the operating scope and the safety bar.**
   - SACE Stage 1 defines an Operational Domain Model, the scope "within which the AS can be demonstrated to be acceptably safe" (https://www.york.ac.uk/media/assuring-autonomy/documents/guidancedocuments/SACE_v1_1.pdf, v1.1 Jul 2026).
   - UL 4600 deliberately does **not** set acceptable risk levels; the developer has to record them (draft §1.3.4).
   - Waymo: "The determination of AUR rests on the explicit definition of Acceptance Criteria" (https://arxiv.org/abs/2306.01917, Jun 2023).
2. **Analyse hazards with several methods.** The draft highly recommends at least one bottom-up, one top-down and one non-fault-based method (UL 4600 draft §6.3.1.3).
3. **Design the safety architecture.** ISO/IEC TR 5469 names the pattern you need: "use of non-AI safety related functions to ensure safety for an AI controlled equipment" (https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiectr5469%7Bed1.0%7Den.pdf, Jan 2024).
4. **Assure the ML component.** AMLAS has six stages: scoping, ML safety requirements, data management, model learning, model verification, model deployment (https://arxiv.org/abs/2102.01564, Feb 2021).
5. **Verify and validate.** Each set of test evidence needs a defined coverage metric, plus fault injection and statistical evaluation (UL 4600 draft §12.4.4, §12.4.7).
6. **Write the safety case and have it assessed.** "An independent assessor is required, but need not be external" (https://safeautonomy.blogspot.com/p/ul-4600-faq.html, updated 9/2021).
7. **Make a governed release decision.** At Aurora, a claim is either closed by evidence or its risk is "resolved, mitigated, or ultimately accepted by the Safety Review Board" (2025 Driverless Safety Report with 2026 addendum, linked from https://aurora.tech/safety).
8. **Operate and feed back.** Runtime monitoring, incident handling, safety performance indicators (SPIs) and change triggers (UL 4600 draft §12.5, §16, §12.6).

**Other findings**
- **UL 4600 scope.**
  - UL Solutions says Edition 3 (released 17 Mar 2023) covers "autonomous vehicles and other autonomous products operating without human supervision" (https://www.ul.com/news/ul-4600-edition-3-updates-incorporate-autonomous-trucking, 18 Jul 2023).
  - The draft calls itself "a generalized autonomous system standard framework using light autonomous road vehicles as a concrete example" and says it made no attempt to include extensive prompts for other applications (§1.2.1).
  - The OECD catalogue lists mining, agriculture and UAVs (https://oecd.ai/en/catalogue/tools/ansiul-4600-standard-for-safety-for-the-evaluation-of-autonomous-products).
  - I found **no content specific to robot arms**. You can use it as a framework for your cell, but it is not a robot standard.
- **Retraining is a change trigger.** The draft's REQUIRED triggers for re-analysing the safety case include "use of a retrained neural network," updated training data or training tools, and any safety-related incident (§12.6.1).
- **Testing alone is insufficient.**
  - RAND: "test-driving alone cannot provide sufficient evidence for demonstrating autonomous vehicle safety" (https://www.rand.org/pubs/research_reports/RR1478.html, 2016).
  - Koopman: "ML-based system testing is nonrepeatable in practice", so you need many trials just to get statistical confidence (https://philkoopman.substack.com/p/software-safety-in-the-age-of-ai, 11 Oct 2025).
  - TRI sees the same problem in robot learning: "significant risk that many robotics papers are measuring statistical noise due to insufficient statistical power" (https://arxiv.org/abs/2507.05331, Jul 2025).
- **Losses can happen when nothing has failed.** STPA assumes "accidents can also be caused by unsafe interactions of system components, none of which may have failed" (https://psas.scripts.mit.edu/home/get_file.php?name=STPA_Handbook.pdf, Mar 2018). A bad grasp by a VLA is a SOTIF-type "functional insufficiency", not a fault (see §2).
- **A test that suits a security mindset.** For a doer/checker design (a complex "doer" component whose actions are checked by a simpler "checker"), assume the Doer "maliciously attempts to compromise safety in the worst way possible… Could it compromise safety?" If yes, the Doer is itself safety-relevant (https://users.ece.cmu.edu/~koopman/pubs/Koopman19_SSS_CredibleSafetyArgumentation.pdf, SSS 2019).
- **Defence in depth already exists here.** Waymo splits hazards into architectural, behavioural and in-service operational, and explicitly cites "the defense-in-depth strategy" (https://arxiv.org/abs/2306.01917).
- **Robot-specific safety cases:** I found none for a learned grasping policy. The closest material:
  - SACE's office-robot examples (above).
  - Adelard's templates, which include a "safety monitor architecture for systems with at least one ML element" (https://arxiv.org/abs/2102.02625, 2021).
  - SMIRK, a complete AMLAS safety case for an automotive ML component (https://arxiv.org/abs/2204.07874).

**Q3 – Why testing is not enough, and what to add.**

Four limits of testing:
- **Exposure.** Field testing must last "approximately 3 to 10 times the acceptable mean time between hazardous failure" (Koopman SSS 2019).
- **Pesticide paradox.** Fixing bugs until a fixed test set passes only removes the bugs those tests can find (same paper).
- **Fly-fix-fly.** Iterating fixes in the field requires "resetting the field testing clock to zero after every bug fix". Root-cause diagnosis is especially hard "if the fix involves retraining a machine-learning based system" (same paper).
- **Simulation hazards.** Model simplifications and whether the simulated workload represents the ODD (UL 4600 draft §13.3.2). SIMPLER names "control and visual disparities" as the main sim-to-real obstacles (https://proceedings.mlr.press/v270/li25c.html, CoRL 2024).

What to add:
- Hazard analysis: STPA, FMEA, HARA, SOTIF.
- Non-AI safety functions verified by fault injection. The draft's test is "does the fault mitigation actually work" (§12.4.7).
- Runtime monitors.
- SPIs and field feedback.
- A structured argument that exposes gaps. Koopman & Widen: "Requires safety engineering beyond brute force test validation" (https://arxiv.org/abs/2404.16768, SAFECOMP 2024).

## 2. Concepts and terms
- **Safety case**: "A structured argument, supported by a body of evidence, that provides a compelling, comprehensible and valid case that a system is safe…" (Def Stan 00-56, quoted in UL 4600 draft §4.2.40).
- **GSN (Goal Structuring Notation) elements** (https://scsc.uk/r1386.pdf, v3 May 2021):
  - Goal = a claim.
  - Strategy = the inference from a goal to its sub-goals.
  - Solution = a reference to evidence.
  - Context.
  - Assumption = an "intentionally unsubstantiated statement".
  - Justification = rationale.
  - A hollow diamond marks an undeveloped claim.
- **GSN's limit**: GSN does not make an argument sufficient; "it is up to the reader to determine their belief that it is adequately supported" (same URL).
- **SPI (safety performance indicator)**: "A metric used to quantify safety performance" (draft §4.2.45). The mandatory item-level SPIs range from incident rates (e.g., safety-margin violations with no damage) to fatality rates (§16.2.1).
- **ODD / ODM**: the conditions under which the system is claimed safe. SACE generalises the car term "operational design domain" (ODD) to any autonomous system as the "operational domain model" (ODM). Its robot example: specify wall material, because translucent walls defeat LiDAR (SACE, above).
- **SOTIF**: safety of the intended functionality, defined as "absence of unreasonable risk due to hazards resulting from functional insufficiencies of the intended function" (ISO 21448:2022, quoted in https://arxiv.org/abs/2404.16768).
- **SOTIF areas**: scenarios are sorted by known/unknown and hazardous/not; "only Areas 1 and 2 are known and only Areas 2 and 3 are hazardous". The goal is to shrink Areas 2 and 3 (https://index.mirasmart.com/27esv/PDFfiles/27ESV-000019.pdf, ESV 2023).
- **Acceptance criterion / validation target**: the criterion that represents absence of unreasonable risk, and the value used to argue it is met (ISO definitions quoted in https://arxiv.org/abs/2306.01917).
- **Positive risk balance (PRB)**: "safer than a human driver—But which human driver?" Koopman argues there is "more to safety than positive risk balance" (https://users.ece.cmu.edu/~koopman/lectures/L152_2024-10-understanding_AV_safety.pdf, Oct 2024).
- **STPA / unsafe control action (UCA)**: four steps: define the purpose, model the control structure, find UCAs, find loss scenarios. A UCA is a command that is wrongly provided, not provided, wrongly timed, or stopped too soon or applied too long (STPA Handbook).
- **HAZOP vs FMEA**:
  - HAZOP "uses a deviation rather than a failure" as its starting event (STPA Handbook).
  - FMEA establishes "how items or processes might fail" (IEC 60812:2018, https://webstore.iec.ch/en/publication/26359).
  - Bottom-up methods like FMEA "are prone to missing hazards caused by component interactions" (draft §6.3.1.3).
- **HARA (hazard analysis and risk assessment)**: finds baseline risks "in the presence of malfunctions" and derives safety goals from them (Aurora report).
- **SIL/HIL (software-/hardware-in-the-loop)**: rungs of the draft's V&V method list, which runs up to closed-course testing and pilot deployments (§12.2).
- **Ethical black box**: "the robot equivalent of an aircraft flight data recorder" (https://arxiv.org/abs/2205.06564, May 2022).
- **PCCP (Predetermined Change Control Plan)**: an FDA medical-device mechanism. It describes "the planned device modifications, the associated methodology to develop, validate, and implement those modifications, and an assessment of the impact" (https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence, final guidance, page dated 18 Aug 2025). I use it only as an analogy for planned retraining.

## 3. Concrete examples, numbers, dates
- **RAND (2016).** Showing 1.09 fatalities per 100M miles at 95% confidence takes 275M failure-free miles (12.5 years with 100 cars). Showing a 20% improvement over humans takes 11B miles. The formula is n = ln(1−C)/ln(R). I read it via a mirror because rand.org was blocked: https://ivds.dependability.org/wg10.4/ivdswiki/images/7/72/Rand_report-Miles_to_demo_failure_rate.pdf.
- **My arithmetic with RAND's formula** (assumes independent trials that are representative of the ODD):
  - Claiming a grasp-hazard rate ≤1% at 95% confidence needs **299** failure-free trials; ≤0.1% needs **2,995**.
  - 50 failure-free trials only bound the rate at **≈5.8%**.
- **TRI's evaluation of large behavior models** (https://arxiv.org/abs/2507.05331; dataset on Dryad Apr 2026):
  - 1,800 real-world rollouts and over 47,000 simulation rollouts.
  - 50 rollouts per task, per policy, per condition.
  - Blind A/B tests, Bayesian posteriors, and sequential tests with Bonferroni correction.
- **Snyder et al. (RSS 2025).** Evaluations are usually limited to a "small feasible sample size (e.g., 10 or 50)". Their sequential test needs up to 32% fewer trials (https://arxiv.org/abs/2503.10966).
- **Kress-Gazit et al.** Report experimental conditions, use several metrics, apply statistics, and describe failure modes (https://arxiv.org/abs/2409.09491, Sep 2024).
- **Runtime monitors for learned policies:**
  - Sentinel catches 18% more failures than either of its detectors alone (https://proceedings.mlr.press/v270/agia25a.html, CoRL 2024).
  - FAIL-Detect needs no failure data. It treats failure detection as sequential out-of-distribution (OOD) detection with conformal prediction (https://roboticsproceedings.org/rss21/p073.html, RSS 2025).
  - SAFE reads the VLA's internal features and generalises to unseen tasks (https://proceedings.neurips.cc/paper_files/paper/2025/hash/392d0d05e2f514063e6ce6f8b370834c-Abstract-Conference.html, NeurIPS 2025).
- **Waymo** uses "twelve acceptance criteria" and repeats the readiness analysis before safety-relevant software updates (https://waymo.com/blog/2025/06/safe-to-deploy/, 16 Jun 2025; method paper https://arxiv.org/abs/2505.09880, May 2025).
- **Aurora**:
  - Its safety case rests on five principles: Proficient, Fail-Safe, Continuously Improving, Resilient, Trustworthy.
  - "evidence without a claim is simply trivia and, conversely, a claim without evidence is baseless" (https://index.mirasmart.com/27esv/PDFfiles/27ESV-000345.pdf, ESV 2023).
  - The 2026 addendum says Edge Case audited its safety case independently. That is a company claim.
- **Standards dates**:
  - ISO 10218-1/-2:2025 consolidate the collaborative-robot rules and add cybersecurity "to the extent that it applies to industrial robot safety". ANSI/A3 R15.06-2025 adopts them. I saw this only in search excerpts because the A3 and ANSI pages returned 403 (https://www.automate.org/robotics/blogs/updated-iso-10218-faq).
  - SACE v1.1: 27 Jul 2026. GSN v3: May 2021; I found no v4.
  - Koopman's books: *How Safe Is Safe Enough?* (Sep 2022, https://safeautonomy.blogspot.com/2022/09/book-how-safe-is-safe-enough-measuring.html) and *Embodied AI Safety* (30 Aug 2025, https://philkoopman.substack.com/p/my-new-book-embodied-ai-safety).

**Minimal safety case for your arm.** I wrote this example. It combines GSN element types, Aurora's principles, SACE stages and UL 4600 clauses.
```
G1  Pick-and-place cell is acceptably safe for <task> in ODD-1
 C1 ODD-1: objects, lighting, workspace, people-access rules    C2 Acceptance criteria per hazard
 A1 People are outside the cell during autonomous runs
 S1 Argue over hazards from STPA + FMEA   (J1: top-down + bottom-up methods combined)
  G2 Nominal: VLA grasp-hazard rate <= target in ODD-1          Sn: N failure-free trials, 95% bound
  G3 Erratic/faulty VLA output cannot cause harm: non-ML speed/force/zone limits veto it
                                                               Sn: fault-injection + HIL reports
  G4 Out-of-ODD inputs detected -> safe stop                    Sn: OOD-monitor validation, novel objects
  G5 Foreseeable misuse/attacks (e.g., instruction tampering)   Sn: threat analysis, pentest
  G6 Safety maintained: SPIs, incident root-causing; any retrain triggers impact analysis  (undeveloped)
```

## 4. Best resources, ranked
| # | Resource | Date | Type | Why | Trust |
|---|---|---|---|---|---|
| 1 | SACE + AMLAS (York; links above) | 2026 / 2021 | academic guidance | Step-by-step process with GSN patterns; includes robot examples | High |
| 2 | Koopman, Kane & Black, *Credible Autonomy Safety Argumentation* | 2019 | independent expert (symposium paper) | Catalogue of argument pitfalls | High |
| 3 | UL 4600 voting draft | 2019 | standards draft | Free view of the SPI, monitoring and change-trigger clauses | High (draft) |
| 4 | GSN Community Standard v3, https://scsc.uk/r1386.pdf | 2021 | standards/professional body | Free notation standard (CC-BY) | High |
| 5 | STPA Handbook | 2018 | independent expert (MIT) | Hazard analysis based on interactions; same steps for security | High |
| 6 | TRI LBM paper + Kress-Gazit et al. | 2025 / 2024 | company research preprints | How to evaluate policies statistically | Med-High |
| 7 | Waymo AUR papers | 2023 / 2025 | company engineering | Acceptance criteria; release readiness | Med-High |
| 8 | Koopman & Widen (SAFECOMP) | 2024 | peer-reviewed | Safety as constraints, not only net risk | High |
| 9 | ISO/IEC TR 5469 preview | 2024 | standards body | How AI relates to functional safety | High |
| 10 | Aurora ESV paper + safety report | 2023 / 2025-26 | company engineering (partly promotional) | A concrete claim tree and governance | Medium |
| — | ASAM OpenSCENARIO DSL 2.1.0, https://openscenario.asam.net/ASAM_OpenSCENARIO_DSL/v2.1.0/introduction.html | Mar 2024 | standards body | Scenario language, but for road traffic | High, low fit |
| — | Foretellix (https://www.foretellix.com/), Edge Case (https://www.ecr.ai/) | 2026 | **company marketing** | Claims such as "10x more efficient for reaching corner case coverage" are unverified | Low |

**Source-type key:**
- **Standards body:** UL 4600 draft and UL news, SCSC GSN, ISO/IEC TR 5469, IEC 60812, ASAM. Regulator: FDA.
- **Peer-reviewed:** SAFECOMP, RSS, CoRL and NeurIPS papers; SMIRK (Software Quality Journal per arXiv). ESV papers are conference papers by industry authors.
- **Independent expert:** Koopman, the MIT STPA Handbook, York's SACE/AMLAS, RAND, the ethical-black-box draft (Winfield et al.).
- **Company engineering material:** Waymo, Aurora, TRI, Adelard.
- **Company marketing:** Foretellix, Edge Case, Humanoids Summit.
- **Community:** see §5.

## 5. Communities
| Community | URL | Activity evidence (15 Oct 2026) | Best use |
|---|---|---|---|
| LeRobot Discord | https://discord.gg/q8Dzzpym3f (from https://github.com/huggingface/lerobot) | ≈19,776 members, ≈1,570 online (Discord invite API). The repo supports Pi0 and SmolVLA | **Newcomer Q&A** on VLA behaviour; not a safety venue |
| ROS Discourse | https://discourse.ros.org | ROS General: 471 new topics in the past year. The `safety`/`security` tags have 2026 threads, mostly one-post announcements. Worth watching: the ROS Medical talk "ROS-powered robots *can* be safe" (Sep 2025) | **Newcomer questions** about safety architecture in ROS 2 |
| ROS 2 Security WG | https://github.com/ros-security/community | The repo says it "typically meets twice a month", but the last meeting post I found is from Mar 2025. It is not among the currently chartered WGs (https://docs.ros.org/en/rolling/The-ROS2-Project/Governance.html) | Appears dormant (my inference) |
| SCSC (Safety-Critical Systems Club) | https://scsc.uk | Upcoming: "AI in a Safety Workflow" (29 Oct 2026), "Safety Assurance for AI Systems" (12 Nov 2026), "New Techniques for Hazard Identification" (3 Dec 2026). Hosts the Assurance Case WG (maintains GSN) and the Safety of Autonomous Systems WG (SCSC-153B) | **Experts on safety cases and GSN**; membership-based |
| Koopman newsletter | https://philkoopman.substack.com | Posts through 11 Oct 2026. His old blog has had no posts since Mar 2025 | **Following an expert**; mostly AVs, some embodied AI |
| RSS/CoRL workshops | https://roboticsconference.org/2026/program/workshops/ ; https://spais-ws.org | RSS 2026 (Sydney, 13–17 Jul) had "From Imitation to Certification… Safe Robot Manipulation". SPAIS runs at CoRL 2026 (Austin, 12 Nov) | Research frontier; slides are often posted |
| MIT STAMP Workshop | http://psas.scripts.mit.edu/home/stamp-workshop-information/ | Free; about 2,000 virtual participants; robotics is among its application areas | Learning STPA from practitioners |
| Robotics Stack Exchange | https://robotics.stackexchange.com | 46,956 questions in total; 8 of the 10 newest had no answers; no `safety` tag | Narrow technical questions only |
| ROSCon | https://roscon.ros.org/2026/ | Toronto, 22–24 Sep 2026; next is 12–14 Oct 2027. ROSCon JP 2025 (Nagoya, 9 Sep) had 289 participants | Talks and networking |
| IEEE RAS technical committees | https://www.ieee-ras.org/technical-committees/list-of-technical-committees/ | The Verification of Autonomous Systems TC lists nothing after Dec 2021. The Safety, Security & Rescue Robotics TC is about rescue robots, **not** functional safety | Low priority |
| Humanoids Summit | https://humanoidssummit.com | Silicon Valley, 1–2 Dec 2026. The organizer claims Tokyo drew ">2,000 attendees" | Industry trends; marketing-heavy |

**Q4 – Recommended for a software security engineer new to robotics:**
1. **SCSC.** It maintains GSN, and its AI-assurance seminars fit your governance background.
2. **ROS Discourse.** Ask concrete architecture questions and tag them `safety`/`security`.
3. **LeRobot Discord.** Practical questions about how VLAs fail.
4. **Koopman's newsletter.** The clearest expert writing on safety cases and the limits of testing.
5. **RSS/CoRL safety workshops.** Where the frontier of robot-learning safety is debated.

The first three suit a newcomer asking questions; the last two are better for following experts.

## 6. Open questions / not verified
- **UL 4600.** Whether the published Edition 3 keeps the draft's §1.2.1 scope wording and clause numbers (paywalled). I found no 4th edition.
- **ISO standards.** I could not read ISO 21448, 26262, 12100, 13849, 34503 or 10218 because iso.org returned 403. The detailed changes in ISO 10218:2025 are unverified.
- **EU Machinery Regulation 2023/1230.** The "self-evolving behaviour" text is unverified because EUR-Lex was blocked.
- **Communities.** Unverified because the sites were blocked or could not be fetched: International System Safety Society, A3 events and committees, ICRA/IROS 2026 workshops, r/robotics and r/ROS (including their moderation quality).
- **Peer-review status.** Unknown for the TRI LBM paper and Kress-Gazit et al. Waymo labels its 2023 paper peer-reviewed (DOI 10.1016/j.jsr.2025.10.019), but I could not open the journal page.
- **Robot-specific example.** I found no public, complete safety case for a learned manipulation policy.
