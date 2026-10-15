# Research notes: safety standards and architecture

Raw report from a research agent, 2026-10-15. Working notes, not a lesson.
Claims carry the source URL the agent read. Facts used in lessons were re-checked;
re-check anything else against its source before teaching or client use.

---

# Safety engineering for AI-driven robots: research brief (as of 15 Oct 2026)

The answer to your core question: a learned policy can run inside a certifiable system only if a separate, small, safety-rated layer can override it. Certification effort goes on that layer, not on the AI.

**How this was done.** I read primary texts in full where I could reach them. These were EU Official Journal texts, ISO catalogue records and the papers themselves. iso.org returned HTTP 403, so the ISO records come from committee.iso.org. A3, the ANSI blog and IEC pages also returned 403. My web-search quota ran out near the end; §5 lists what is still open.

**Source labels:**
- [REG] regulator or law
- [STD] standards body
- [PR] peer-reviewed
- [ACAD] paper or preprint, peer review not confirmed
- [EXP] independent expert
- [ENG] company engineering blog or docs
- [MKT] company marketing
- [PRESS] press

## 1. Key findings

### Q1. Standards for an AI-driven arm doing pick-and-place near people

**Risk assessment: ISO 12100:2010 [STD]**
- It gives "principles and a methodology for achieving safety in the design of machinery".
- It is still current but marked "to be revised"; ISO/DIS 12100.3 is pending (https://committee.iso.org/standard/51528.html).
- EU law uses the same order of priority [REG], in Reg. 2023/1230 Annex III §1.1.2(b) (http://data.europa.eu/eli/reg/2023/1230/oj):
  - first "eliminate hazards or, if that is not possible, minimise risks";
  - then add protective measures;
  - then "inform users of the residual risks".

**The robot and the cell: ISO 10218-1:2025 and ISO 10218-2:2025 [STD]**
- Both were published on 2025-02-05.
- Part 1 is for the robot maker. It treats the robot "as partly completed machinery" (https://committee.iso.org/standard/73933.html).
- Part 2 is for the integrator. It covers "the integration of industrial robot applications and industrial robot cells" (https://committee.iso.org/standard/73934.html).
- A3 says the revision aims to "make functional safety requirements more explicit rather than implied" [PRESS, 18 Feb 2025] (https://www.controldesign.com/industry-news/news/55268769/iso-10218-update-makes-functional-safety-requirements-more-explicit).
- The same report says the revision also:
  - folds in ISO/TS 15066 (the collaborative-robot specification);
  - adds robot classes;
  - adds cybersecurity requirements.

**Clause-level changes, from Hartmann et al. [ACAD, Feb 2026]** (https://arxiv.org/abs/2602.17822). I could not check these against the paywalled standard.
- Part 1:
  - Cybersecurity, §5.1.16: threat assessment, authentication, and encryption where needed.
  - Safety parameters protected by checksums (§5.3.5), and safe communication (§5.3.6).
  - New safety functions: monitored standstill, speed-limit monitoring, and limits on stopping time and stopping distance.
  - Software and dynamic motion limits (§5.7.4–5.7.5) replace "safety-rated soft axis and space limiting".
  - Normative Annex C sets the required safety levels (PL, or SIL).
- Part 2:
  - The term "collaborative robot" is dropped. Collaboration is "exclusively a property of the application".
  - §5.14 covers collaborative applications, including:
    - speed and separation monitoring (SSM), §5.14.5;
    - power and force limiting (PFL), §5.14.6.
  - Annex L (normative) gives the SSM distance formulas. Annex M gives the body-region limits, and Annex N the measurement method.
  - §6.3.3 requires measuring contact forces and pressures.
  - The instruction handbook must state the safety levels, response times and biomechanical data.

**ISO/TS 15066:2016 is not withdrawn [STD]**
- It is still listed as published, at stage 90.92 "to be revised" since 2025-06-26 (https://committee.iso.org/standard/62996.html).
- Its replacement is ISO/AWI 15066-1, "Robotics — Physical contact with robots — Part 1: Biomechanical thresholds and data" (https://committee.iso.org/standard/91522.html).

**Designing the safety controls**
- **ISO 13849-1:2023 (PL)** applies "regardless of the type of technology and energy", "including the design of software". It does not cover cyber security (https://committee.iso.org/standard/73481.html).
- **IEC 62061:2021+AMD1:2024 (SIL)** calls itself "a machinery sector specific standard within the framework of IEC 61508" (https://webstore.iec.ch/en/publication/93654).
- **IEC 61508 Edition 2 (2010)** is the current edition [EXP] (https://61508.org/knowledge/what-is-iec-61508/, https://61508.org/knowledge/standards-development/):
  - SIL 4 is the highest level.
  - Edition 3 is expected "sometime in early 2027".

**Stops**
- IEC 60204-1 defines stop categories 0, 1 and 2.
- ISO 13850 allows only category 0 or 1 for an emergency stop [EXP] (https://machinerysafety101.com/2010/09/27/emergency-stop-categories/).

**AI-specific standards**
- **ISO/IEC TR 5469:2024** is informative only. It covers the "use of non-AI safety related functions to ensure safety for an AI controlled equipment" (https://committee.iso.org/standard/81283.html).
- **ISO/IEC TS 22440-1**, its normative successor, is still a Committee Draft. Comments closed on 2026-04-11 (https://committee.iso.org/standard/89535.html).
- These are useful as concepts, but they are not requirements for robots:
  - ISO 21448 (SOTIF), marked "to be revised" (https://committee.iso.org/standard/77490.html).
  - ISO/PAS 8800:2024, on AI in road vehicles (https://committee.iso.org/standard/83303.html).
  - UL 4600 Edition 3 (March 2023), a "goal-based and technology-agnostic" safety-case standard (https://www.ul.com/news/ul-4600-edition-3-updates-incorporate-autonomous-trucking).

**EU Machinery Regulation 2023/1230 [REG]**
- It applies "on a mandatory basis as of 20 January 2027" (https://single-market-economy.ec.europa.eu/sectors/mechanical-engineering/machinery_en). A corrigendum set this date; the original Official Journal text said 14 January (http://data.europa.eu/eli/reg/2023/1230/oj).
- The essential requirements are in **Annex III**. **Annex I** lists the categories that need special conformity assessment.
- **Annex I Part A, item 5** (third-party assessment mandatory): "Safety components with fully or partially self-evolving behaviour using machine learning approaches ensuring safety functions" (same URL).
- A recital exempts "software incapable of learning or evolving".
- **Annex III §1.2.1:**
  - Control systems with self-evolving behaviour "shall not cause the machinery … to perform actions beyond its defined task and movement space".
  - Data on safety decisions must be kept for 1 year.
  - The history of safety-software versions must be kept for 5 years.
- **Annex III §1.1.9:**
  - Safety-critical software and data must be "adequately protected against accidental or intentional corruption".
  - The machine must "collect evidence of a legitimate or illegitimate intervention".

**EU AI Act after the Digital Omnibus, Reg. (EU) 2026/1744 [REG]**
- It was published 24 Jul 2026 and has been in force since 27 Jul 2026 (http://data.europa.eu/eli/reg/2026/1744/oj).
- High-risk obligations now apply:
  - from 2 Aug 2028 for AI covered by Article 6(1) / Annex I (AI that is a safety component of a product);
  - from 2 Dec 2027 for Annex III systems.
- Machinery moves to Section B of AI Act Annex I, which the Regulation calls "a sectoral approach".
  - The AI Act then reaches machinery only through its Article 2(2).
  - The AI requirements will instead be written into Machinery Regulation Annex III by delegated acts that "shall apply by 2 August 2028".
- The test for what counts as a "safety component" has changed:
  - AI used "solely … for non-safety related aspects of … automation" does not count.
  - AI "the failure or malfunctioning of which would endanger health and safety shall qualify".

### Q2. The core architecture pattern

**The pattern.** Treat the learned policy as an untrusted, high-performance controller. Put a small, verifiable monitor and a certified fallback between the policy and the motors. Certify only that safety envelope.

**Simplex** [ACAD, Phan et al. 2020] (https://arxiv.org/abs/1908.00528)
- The original is Sha, IEEE Software 18(4), 2001; I did not read it directly.
- Phan et al. describe it this way: "a pre-certified decision module (DM) switches control from a high-performance but unverified … advanced controller (AC) to a verified-safe baseline controller (BC)".
- The switch happens before the system leaves the baseline controller's "recoverable region".

**Runtime assurance as standard practice in aviation [STD]**
- ASTM F3269-21 offers "run-time assurance as an alternative to design-time assurance" for "an unassured or complex function" (https://store.astm.org/f3269-21.html).

**Safety filters [PR]** (https://arxiv.org/abs/2309.05837)
- A safety filter "monitors the operation of an autonomous system at runtime and intervenes … by modifying its intended control action".
- It has three parts: a monitor, an intervention and a fallback. The authors note: "every safety filter can be viewed as relying on a fallback policy".
- This split allows the "independent design of safety-agnostic task policies and task-agnostic safety filters".

**Control barrier functions and shields [ACAD]**
- A control barrier function changes "an existing controller in a minimal way so as to guarantee safety" (Ames et al. 2019; https://arxiv.org/abs/1903.11199).
- A shield for reinforcement learning "monitors the actions from the learner and corrects them only if the chosen action causes a violation of the specification" (https://arxiv.org/abs/1708.08611).

**The same idea in standards language [STD]**
- ISO/IEC TR 5469, from the official preview of its contents (https://elstandard.se/documents/preview/3123501), has:
  - clause 10.2.3, "Use of a supervision function with constraints to control the behaviour of a system to within safe limits";
  - clause 10.2.4, "Redundancy, ensemble concepts and diversity".

**In industry**
- Agility added a safety PLC on board the robot, because "if the humanoid's main control system had a software bug or made a bad decision, the safety PLC was there to step in" [ENG, 22 Jun 2026] (https://www.agilityrobotics.com/content/built-for-the-real-world).
- Google DeepMind describes a "layered, holistic approach" [ENG, 12 Mar 2025] (https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/):
  - its models connect to "low-level safety-critical controllers, specific to each particular embodiment";
  - a semantic-safety benchmark (ASIMOV) sits on top.

**Applied to your system (my inference, not sourced)**
- The classical motion planner and the VLA are both on the untrusted side.
- The certified envelope is the robot's safety-rated functions:
  - monitored standstill;
  - speed and separation monitoring;
  - power and force limiting;
  - motion limits and stopping limits;
  - a safety PLC and the stop functions.
- That envelope is built to the safety levels in ISO 10218 Annex C.
- Keep machine learning out of safety functions. Otherwise EU third-party assessment under Annex I Part A applies.
- In security terms, the envelope is a reference monitor: always invoked, protected against tampering, and small enough to verify.

### Q3. What changes for mobile manipulators and humanoids

**There is a standards gap**
- The Feb 2025 proposal for ISO 25785-1 found "no ISO safety standard either published or in development" for robots that "could become unstable in the absence of power" (https://www.mta.org.uk/resources/iso-np-25785-1-link-to-new-work-item-proposal/).
- The same proposal notes that:
  - ISO 3691-4 excludes these robots;
  - ISO 10218 does not cover mobility.

**ISO/CD 25785-1 [STD]** (https://committee.iso.org/standard/91469.html)
- It covers "dynamically stable industrial mobile robots" and is a Committee Draft; comments closed 2026-07-08.
- A Part 2 on integration will follow.
- Federico Vicentini of Boston Dynamics chairs the working group. His approach: "We want to standardize the goal, not the way to get to the goal" [PRESS, 11 Jun 2025] (https://www.technologyreview.com/2025/06/11/1118519/humanoids-safety-rules/).

**Cutting power is not a safe state** [EXP, IEEE Humanoid Study Group, Sep 2025] (https://www.therobotreport.com/wp-content/uploads/2025/09/IEEE-Humanoid-Report-of-Future-Standards-Development.pdf)
- Humanoids "do not follow this rule, as losing power at any time could result in falling over".
- The report ranks fault responses from Level 0, "Immediate power cut", to Level 4, where "power loss will not endanger nearby humans".
- It suggests a stance in which the robot "would fall away from the human, and not towards it".
- It warns that "current SIL and PL measures assume deterministic systems".

**Boston Dynamics (Spot) [ENG]** (https://dev.bostondynamics.com/docs/concepts/robot_services, https://dev.bostondynamics.com/docs/concepts/estop_service)
- The docs say: "Abruptly turning off motor power will cause the robot to drop".
- Its SETTLE_THEN_CUT stop level makes the robot "come to a stop, sit down, and then cut actuator power".

**Agility's safety system evolved in steps [ENG]** (https://www.agilityrobotics.com/content/built-for-the-real-world)
1. A remote emergency stop.
2. An external safety controller. When communication was lost, the robot "would fall".
3. A safety PLC on board, with "category 1 stop functionality so that Digit could come to a controlled stop before power fully cut", plus a hand-held pendant.
- Today, deployments run inside fenced workcells that "have passed OSHA-recognized Nationally Recognized Test Lab (NRTL) field inspections" (https://www.agilityrobotics.com/content/agilitys-humanoid-deployment-process).
- Next, Digit 5 aims for "cooperative safety", meaning it shares space with people without barriers. It will run on-board human detection on NVIDIA IGX Thor.

**Boston Dynamics (Stretch)** [MKT/ENG, vendor case study, 2023] (https://www.beckhoff.com/th-th/company/applications-and-references/stretch-from-boston-dynamics-puts-mobile-robots-at-the-forefront-in-intralogistics-technology.html)
- It uses Beckhoff TwinSAFE safety modules, both on the robot and in a remote cabinet.
- Safe speed and safe position reach Category 3 / PL d.
- Safety data travels over a "black channel".

**Related standards**
- **Service robots outside industry:** ISO/FDIS 13482 has been in its final ballot since 2026-09-15 (https://committee.iso.org/standard/83498.html).
- **Mobile bases:**
  - ISO 3691-4:2023 is marked "to be revised" (https://committee.iso.org/standard/83545.html).
  - ANSI/A3 R15.08-3-2026, "Use of IMR Applications", completes the R15.08 series for industrial mobile robots [PRESS, 30 Sep 2026] (https://www.automationworld.com/factory/robotics/news/55408868/association-for-advancing-automation-new-ansi-standard-completes-industrial-mobile-robot-safety-series).

## 2. Concepts and terms

| Term | Plain-English definition | Source |
|---|---|---|
| Safety function | A protective function whose failure would increase the risk. | http://data.europa.eu/eli/reg/2023/1230/oj (Art. 3(4)) |
| PL / SIL | Reliability grades for safety functions: PL (for example b or d) in ISO 13849-1; SIL 1–4 in IEC 61508/62061, with 4 the highest. | https://committee.iso.org/standard/73481.html, https://61508.org/knowledge/what-is-iec-61508/ |
| Stop category 0 / 1 / 2 | 0: power cut at once. 1: controlled braking, then power cut. 2: controlled stop with power kept on. | https://machinerysafety101.com/2010/09/27/emergency-stop-categories/ |
| Monitored standstill | The 2025 name for "safety-rated monitored stop": the robot stands still and that is safety-monitored. | https://arxiv.org/abs/2602.17822 |
| SSM (speed and separation monitoring) | Sensors keep the robot at a protective distance from people, slowing or stopping it. | https://www.nist.gov/publications/implementing-speed-and-separation-monitoring-collaborative-robot-workcells |
| PFL (power and force limiting) | Contact is allowed, but speed is limited so contact force stays below body-region limits. | https://arxiv.org/abs/2311.13814 |
| Quasi-static vs. transient contact | Quasi-static: a body part is pinned and cannot move away. Transient: an impact the body part can move away from. | https://arxiv.org/abs/2602.17822 |
| Cooperative safety | Agility's term: people and robot share a space at a safe distance, without barriers. "Collaborative" means touching the same object. | https://www.agilityrobotics.com/content/built-for-the-real-world, https://www.techbriefs.com/component/content/article/53111-safety-in-motion-setting-the-standard-for-humanoid-robots |
| Actively controlled stability | Robots that need power and active control to stay upright. | https://committee.iso.org/standard/91469.html |
| Simplex / runtime assurance | A verified switch hands control from an unverified controller to a verified fallback before recovery becomes impossible. | https://arxiv.org/abs/1908.00528 |
| Safety filter / control barrier function / shield | A runtime monitor plus an intervention that minimally changes, or overrides, unsafe actions. | https://arxiv.org/abs/2309.05837 |
| Self-evolving behaviour | The EU Machinery Regulation's term for machine-learning logic that changes. If it ensures safety functions, third-party assessment is required. | http://data.europa.eu/eli/reg/2023/1230/oj |

## 3. Concrete examples, numbers, dates

**ISO 10218-1:2025 robot classes** (from the preprint, not checked against the standard; https://arxiv.org/abs/2602.17822)
- Class I: "manipulator mass ≤ 10 kg, maximum force ≤ 50 N, and speed ≤ 250 mm/s". Anything above is Class II.
- Required levels: "PL d and SIL 2 for Class II robots and PL b or SIL 1 for Class I robots".

**Where the body-region limits now live** (same source)
- The limits table from ISO/TS 15066 Annex A (29 body regions) is now ISO 10218-2:2025 **Annex M** (informative), with the values unchanged.
- The measurement method is in **Annex N**.
- The SSM formulas are in normative **Annex L**.

**Example ISO/TS 15066 maximum forces** [PR, 2024] (https://arxiv.org/abs/2311.13814)

| Body region | Maximum force |
|---|---|
| Skull and forehead | 130 N |
| Face | 65 N |
| Neck | 150 N |
| Chest | 140 N |
| Hands and fingers | 140 N |

- The same paper gives the PFL speed limit: **v_rel,max = F_max/√(µk)**.
  - µ = (1/m_H + 1/m_R)⁻¹, where m_H is the effective mass of the body region and m_R that of the robot.
  - k is the effective spring constant of the body region.
- DGUV/IFA, whose studies informed these limits, states its aim is to "include verified limits in Part 2 of EN ISO 10218" (https://www.dguv.de/ifa/fachinfos/kollaborierende-roboter/medizinisch-biomechanische-anforderungen/index-2.jsp).

**What companies actually publish**

- **Figure [ENG]**
  - Its battery is "in process to be certified to both UN38.3 and UL2271" (17 Jul 2025; https://www.figure.ai/news/f-03-battery-development).
  - Tests include being "dropped 1 meter onto concrete from any orientation" (same post).
  - Figure 03 uses "multi-density foam to protect against pinch points" (https://www.figure.ai/news/introducing-figure-03).
- **1X NEO [MKT]** (https://www.1x.tech/neo)
  - Claims "No pinchpoints" and a head-injury score (HIC) of "<250", with no test method given.
  - States that "an Expert from 1X can remotely supervise".
  - Names no standards.
- **Physical Intelligence [ENG]**
  - Its blog has no posts on safety (https://www.pi.website/blog).
  - On reliability: "it's quite hard to make them succeed reliably" (https://www.pi.website/blog/pistar06).
- **FORT Robotics [MKT]**
  - Claims Exida certification to SIL 3 (IEC 61508) without naming the product (https://fortrobotics.com/).
  - Its Oct 2026 agreement with Agility is only a memorandum of understanding. It covers a pendant with emergency stop and enabling device, and an "Offboard Safety Bridge" (https://www.agilityrobotics.com/content/agility-and-fort-robotics-announce-strategic-partnership-to-advance-humanoid-robot-safety).
- **No safety-engineering content found**
  - Intrinsic (https://www.intrinsic.ai/blog).
  - Realtime Robotics: "collision-free" refers only to path planning, with no safety rating (https://rtr.ai/).
  - Apptronik's homepage (https://apptronik.com/).
  - Veo Robotics: veobot.com now redirects to symbotic.com (https://www.veobot.com/, checked 15 Oct 2026).

## 4. Best resources, ranked

| # | Title | URL | Date | Type | Why it is useful | Trust |
|---|---|---|---|---|---|---|
| 1 | Reg. (EU) 2023/1230 (Machinery Regulation) | http://data.europa.eu/eli/reg/2023/1230/oj | 2023 | REG | Binding rules on machine learning, logging and protection against corruption | Highest |
| 2 | Reg. (EU) 2026/1744 (Digital Omnibus on AI) | http://data.europa.eu/eli/reg/2026/1744/oj | Jul 2026 | REG | New AI Act dates; machinery moved to Section B | Highest |
| 3 | ISO 10218-1/-2:2025 (paywalled) | https://committee.iso.org/standard/73934.html | Feb 2025 | STD | The core requirements for your cell | Highest |
| 4 | Hartmann et al. | https://arxiv.org/abs/2602.17822 | Feb 2026 | ACAD | Free clause-by-clause comparison of 2011 vs 2025 | Medium-high |
| 5 | Hsu, Hu & Fisac, "The Safety Filter" | https://arxiv.org/abs/2309.05837 | 2023 | PR | Brings Simplex, barrier functions and shields under one view | High |
| 6 | IEEE Humanoid Study Group report | https://www.therobotreport.com/wp-content/uploads/2025/09/IEEE-Humanoid-Report-of-Future-Standards-Development.pdf | Sep 2025 | EXP | Falling, the fault-response ladder, gaps in today's standards | Medium-high |
| 7 | ISO/IEC TR 5469 (preview of contents) | https://elstandard.se/documents/preview/3123501 | Jan 2024 | STD | How standards treat supervising AI | High |
| 8 | Ames et al., Control Barrier Functions | https://arxiv.org/abs/1903.11199 | 2019 | ACAD | The mathematics behind safety filters | High |
| 9 | Agility, "Built for the Real World" | https://www.agilityrobotics.com/content/built-for-the-real-world | Jun 2026 | ENG | A real history of how a humanoid's safety architecture evolved | Medium |
| 10 | Doug Nix, "Emergency Stop Categories" | https://machinerysafety101.com/2010/09/27/emergency-stop-categories/ | updated 2026 | EXP | Stop categories quoted from the standards | Medium-high |

## 5. Open questions and things I could not verify

**ISO 10218 details**
- The Class I limits, the safety levels per class and the annex letters all come from the Hartmann preprint.
- ISO's catalogue page says Part 2 "complements" ISO/TS 15066. The preprint says it takes in "most requirements".
- ISO's catalogue page also has an auto-generated FAQ with irrelevant content (for example "climate change"); I ignored it.

**US adoption**
- The US version of ISO 10218:2025 (ANSI/A3 R15.06-2025) is unverified, because the A3 and ANSI pages returned 403.
- The humanoid technical report ANSI/A3 TR R15.108 is known only from Agility's blog.

**Other unverified items**
- The exact date of IEC 61508 Edition 3.
- The status of IEC 60204-1 Edition 7.
- The IEC 61800-5-2 definition of safe torque off (STO).

**Legal questions for counsel**
- Does a VLA with frozen weights count as "self-evolving behaviour"?
- Under the new AI Act Art. 6(1b), is a grasp policy a "safety component" even when an independent safety layer protects people?
- The delegated acts that will add AI requirements to the Machinery Regulation are not adopted yet.
- A corrigendum to Reg. 2026/1744 dated 2026-09-29 exists; I did not read it.

**Not read or not confirmed**
- Sha's original 2001 Simplex paper.
- Koopman's "doer/checker" work.
- Whether a UL 4600 Edition 4 exists.
