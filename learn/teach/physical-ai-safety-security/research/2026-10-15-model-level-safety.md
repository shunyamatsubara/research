# Research notes: model level safety

Raw report from a research agent, 2026-10-15. Working notes, not a lesson.
Claims carry the source URL the agent read. Facts used in lessons were re-checked;
re-check anything else against its source before teaching or client use.

---

# Model-level safety for robots driven by foundation models (LLM / VLM / VLA): research brief, as of 2026-10-15

Source types are tagged as: [peer-reviewed], [preprint], [tech report], [company research blog], [company marketing], [press], [independent expert]. Every quote is verbatim. Numbers I read off charts are marked "(read from figure)". Figures I calculated myself are marked as mine. The shared web-search budget ran out near the end of the work, so a few items stayed unverified (see §5).

---

## 1. Key findings

### Q1: Failure modes specific to learned robot policies
- **Small errors that compound.** Physical Intelligence (PI) writes that a VLA "might put the gripper in the wrong spot, miss a grasp, or knock over an object". The resulting off-distribution states cause "compounding errors". A bad grasp can surface only later: "The mistake that led to the failure might have happened much earlier, in grasping the portafilter at the wrong angle." [company research blog, 2025-11-17] https://www.pi.website/blog/pistar06
- **Out-of-distribution (OOD) inputs and distribution shift.** DeepMind: "an unshielded VLA may generate physically infeasible or erratic trajectories." [tech report, 2026-07-29] https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf
  - LIBERO-Plus: "performance dropping from 95% to below 30% under modest perturbations" of camera viewpoint and initial state. [peer-reviewed, CVPR 2026] https://arxiv.org/abs/2510.13626
  - A Stanford dissertation names "open-ended variability, distribution shift, and compounding errors". [independent expert, 2026-03] https://arxiv.org/abs/2603.11400
- **Ignoring the instruction.** LIBERO-Plus found "models tend to ignore language instructions completely". DeepMind's world-model study saw that with an unfamiliar object, "the policy steers to a more familiar one instead". [tech report, 2025-12-11] https://arxiv.org/abs/2512.10675
- **Semantically unsafe choices.** DeepMind's example: "a metal bowl should not be placed in a microwave". KnowNo uses the same case and adds ambiguity, because there are two bowls and "the metal bowl may not be safe for the microwave". [peer-reviewed, CoRL 2023] https://arxiv.org/abs/2307.01928
- **Hallucinated objects or affordances.** DeepMind's automated red-teaming asked the reasoning model "to point to an entity that does not exist in the scene", and the model hallucinated an answer. [tech report, 2025-10] https://arxiv.org/abs/2510.03342 Google's API docs say the ER models "can occasionally 'hallucinate'… especially for ambiguous prompts or out-of-distribution inputs." [docs, updated 2026-10-06] https://ai.google.dev/gemini-api/docs/robotics-overview
- **Grasp-level violations of embodiment constraints.** On ASIMOV-2.0, constraint violation rates ranged "from 75% to 38.6%", with the "highest errors for gripper geometry and type". When asked for a valid grasp point on an object with an offset centre of mass, GPT-5, Gemini 2.5 Pro and Claude Opus 4.1 all gave unsafe answers. [preprint, 2025-09/11] https://arxiv.org/abs/2509.21651
- **Saying one thing, doing another.** BadRobot exploits the "misalignment between linguistic outputs and physical actions". [peer-reviewed, ICLR 2025] https://arxiv.org/abs/2407.20242
- **Sharp and fragile objects.** AutoRT's robot constitution discouraged "handling sharp and fragile objects or electrical equipment". [workshop paper, 2024-01] https://arxiv.org/abs/2401.12963 DeepMind's video-model red-teaming targeted objects that need "a specific grasp point (e.g., a knife handle)". On "Quick, grab the red block!" it found a policy whose gripper made contact with a human hand, and this was reproduced with real props. https://arxiv.org/abs/2512.10675

### Q2: The layered approach and which layer catches what
- **DeepMind uses defence in depth explicitly.** "Think of our safety framework as a stack of Swiss cheese slices." "No single slice is a perfect barrier." Also: "Our VLA models can be composed with lower-level safety mechanisms to help prevent accidents." [company research page, undated] https://deepmind.google/models/gemini-robotics/responsibly-advancing-ai-and-robotics/
- **Physical safety belongs to the classic layer.** It "is implemented in the lowest levels of the control stack, via methodologies like motion planning, model predictive control, and compliant/force control." [tech report, 2025-03-25] https://arxiv.org/abs/2503.20020
- **Gemini Robotics 1.5** describes its approach as "multi-faceted and multi-layered". It includes "triggering low-level physical safety sub-systems (e.g., for collision avoidance) when needed." https://arxiv.org/abs/2510.03342
- **Gemini Robotics 2 safety report (2026)** says traditional protections "(e.g., e-stops, barriers, and speed/force limits) remain essential". It adds four model-level guardrails:
  1. Refuse tasks that violate constraints.
  2. Trigger protective stops.
  3. Shield the VLA from infeasible or OOD tasks.
  4. Ask humans when instructions are ambiguous.

  It scopes itself narrowly: "This work does not evaluate the underlying functional safety architecture". https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf
- **AutoRT (2024).** "even if large models are prompted correctly with self-critiquing, this alone cannot guarantee safety." AutoRT therefore added an automatic stop when joint force exceeded a threshold, and a human supervisor in line of sight "with a physical deactivation switch". [company research blog, 2024-01-04] https://deepmind.google/discover/blog/shaping-the-future-of-advanced-robotics/
- **The "safety brain".** The constitutions paper proposes an independent module that "checks and gates the instructions sent to the robot body". It warns that "a constitution alone is not enough if it is not deployed in a secure system where input signals such as camera inputs can be trusted." [preprint 2025-03; CoRL 2025] https://arxiv.org/abs/2503.08663
- **The split between layers.** Unsafe instructions "can be filtered out by a safety layer that is policy agnostic". Other hazards can only be found by rolling out the policy. https://arxiv.org/abs/2512.10675

| Layer | Should catch | Will miss | Sources |
|---|---|---|---|
| 0. Certified physical safety: e-stop, speed-and-separation monitoring (SSM), power-and-force limiting (PFL), workspace/force limits (ISO 10218:2025) | Collisions, excessive force, human intrusion, whatever the model does | Semantic harm (wrong object, liquid over a laptop) | GR2 report; AutoRT |
| 1. Pre-execution semantic gate ("safety brain"; constitution; temporal-logic checker; feasibility filter) | Unsafe or jailbroken instructions; payload, gripper or prohibited-item constraints; OOD tasks; ambiguity, by asking | Hazards that appear only during the rollout | GR2; RoboGuard; constitutions paper |
| 2. Policy, optionally safety-trained (SafeVLA) | Fewer violations | Gives no guarantees | SafeVLA |
| 3. Action-level safety filter (control barrier functions, CBFs) | Geometric and semantically derived spatial constraints, at control rate | Constraints it was never given | Brunke; AEGIS |
| 4. Runtime monitors | Erratic actions (fast statistics); no progress (VLM, slow); OOD states | Time-critical hazards, if the monitor is VLM-only | Sentinel; SAFE; FAIL-Detect |
| 5. Human | Clarification, takeover, kill switch | Doesn't scale | KnowNo; PI; AutoRT |

- **Speed matters for monitors.** Sentinel: "we only use VLMs to detect failure modes that are less time-sensitive". [peer-reviewed, CoRL 2024] https://arxiv.org/abs/2410.04640 VLM-based safety filters are "too slow to run in the control loop". [preprint, 2026-06] https://arxiv.org/abs/2606.09749

### Q3: How safe are current models?
- **Models understand constraints in text better than they act on them.** Text-only safety classification is at or above 96% for frontier models. Acting through tool calls scores 72.2–89.1% (read from figure). The report calls this "a gap between semantically understanding a constraint (Text) and physically acting on it". [GR2 report, above]
- **A VLM watching for humans is not a safety function.** Running at a false-positive rate under 5% means a false-negative rate above 40%. "no model currently operates in the ideal top-right quadrant (near-zero FNR and FPR)". The report concludes it is "best to utilize them alongside deterministic, low-level safety guardrails". [GR2 report]
- **Jailbreaks are easy, but structured guardrails help.** RoboPAIR often reached 100% attack success on real robots. RoboGuard "reduces the execution of unsafe plans from over 92% to below 3% without compromising performance on safe plans". [IEEE RA-L 2026] https://arxiv.org/abs/2503.07885

### Q4: What to do today for a VLA grasp module
1. **Keep the VLA inside a deterministic envelope.** Use certified stops, SSM/PFL and workspace and force limits (ISO 10218:2025, as cited in the GR2 report). Do not treat a model's human detection as a safety function: DeepMind says it is "not a guaranteed safety-rated system" (responsibility page). Gemini Robotics ER 2's terms forbid using the models "for safety-critical applications". https://deepmind.google/models/model-cards/gemini-robotics-er-2/
2. **Gate the hand-off from planner to VLA.** Check object identity, prohibited classes (sharp items, unsealed liquids), payload and gripper opening before the VLA runs. Use deterministic checks where you have ground truth, because VLM constraint-following is imperfect: 38.6–75% violations on ASIMOV-2.0 and at most 89.1% on GR2 tool use.
3. **Make the gate aware of the VLA's training data.** GR2's feasibility accuracy rises from "62.0%" to "95.8%" as the gate gets more detailed summaries of what the VLA was trained on. [GR2 report]
4. **Resolve ambiguity before grasping.** Calibrate when to ask for help with conformal prediction (KnowNo). Note that KnowNo's guarantee assumes "the actions proposed by the LLM planner can be executed successfully", so it does not cover the grasp policy itself.
5. **Filter the actions.** Put a CBF safety filter between the VLA and the controller (Brunke, RA-L 2025, https://arxiv.org/abs/2410.15185; AEGIS, https://arxiv.org/abs/2512.11891). Keep slow VLMs out of the control loop.
6. **Detect failures at runtime.** Calibrate the detector on your own rollouts. SAFE is designed to give "a timely alert such that the robot can stop, backtrack, or ask for help" ([peer-reviewed, NeurIPS 2025] https://arxiv.org/abs/2506.09937). Log human takeovers as training data, as PI does with Recap.
7. **Treat all inputs as untrusted.** That includes prompts and text visible in the scene (see §3). Isolate the guardrail: RoboGuard's "root-of-trust" LLM "is shielded from malicious prompts".
8. **Evaluate statistically.**
   - Pre-define success criteria, match initial conditions, and run blind A/B comparisons.
   - Use at least 50 real trials per condition, as TRI did.
   - Test under shift: camera, lighting, novel objects.
   - Use generative red-teaming to find hazards, then confirm on hardware.

---

## 2. Concepts and terms
- **Semantic safety:** commonsense constraints that "cannot be simply inferred from geometric states of the environment". [GR2 report]
- **Physical (action) safety:** hard constraints such as obstacles, workspace bounds and contact forces, enforced by classical control. https://arxiv.org/abs/2503.20020
- **Robot constitution:** "rules of safe behavior expressed in natural language and loaded as a preamble in the prompt of an AI model". https://arxiv.org/abs/2503.08663
- **ASIMOV / ASIMOV-2.0 / ASIMOV-Agentic:** DeepMind's semantic-safety benchmarks, built from text, images and video grounded in real hospital injury reports (NEISS). The Agentic version tests refusing unsafe VLA tool calls and asking for help. https://huggingface.co/datasets/google/asimov_agentic
- **System 2 / System 1 split:** a reasoning "agent" breaks a task into sub-tasks and calls a VLA as a tool to execute them. [GR2 report]
- **Feasibility filter:** stops the VLA from attempting "out-of-distribution tasks where its predictive reliability degrades". [GR2 report]
- **Aleatoric vs epistemic uncertainty:** aleatoric means ambiguous instructions or occluded scenes; epistemic means the VLA facing tasks it was not trained on. [GR2 report]
- **Conformal prediction (KnowNo):** calibrates the model's scores into a set of candidate actions. "If there is more than one option in the set, the robot asks for help." https://arxiv.org/abs/2307.01928
- **Safety filter (CBF):** modifies unsafe control inputs "into safe ones in a minimally invasive manner". https://arxiv.org/abs/2410.15185
- **Erratic vs task-progression failures:** the first is unstable actions, caught by fast statistics; the second is confident but useless behaviour, caught by a VLM. https://arxiv.org/abs/2410.04640
- **Root-of-trust LLM:** a separate, prompt-shielded LLM that turns rules into temporal-logic specifications that are then enforced on the plan. https://arxiv.org/abs/2503.07885
- **Constrained MDP (SafeVLA):** reinforcement learning that limits safety costs instead of adding them to the reward. https://arxiv.org/abs/2503.03480
- **Predictive red teaming:** editing images to forecast how a policy degrades without hardware trials. https://arxiv.org/abs/2502.06575
- **SSM / PFL:** speed-and-separation monitoring and power-and-force limiting, the collaborative safety modes from ISO/TS 15066, now folded into ISO 10218:2025. [GR2 report]

---

## 3. Concrete examples, numbers, dates

**Gemini Robotics timeline**
- 2025-03-12: Gemini Robotics 1.0 and ASIMOV v1.
- 2025-09-25: Gemini Robotics 1.5 and ASIMOV-2.0.
- 2026-04-14: ER 1.6.
- 2026-07-30: Gemini Robotics 2, ER 2 and ASIMOV-Agentic. https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/
- 2026-10-13: "Gemini 4 Argon for Robotics", which has no safety section. https://developers.googleblog.com/gemini-4-argon-for-robotics

**Gemini Robotics 1.0 (ASIMOV-Multimodal alignment, read from figure)**
- Gemini 2.0 Flash 0.86; Gemini Robotics-ER 0.85; ER with constitution 0.88.
- Under an adversarial prompt: ER alone 0.28; ER with constitution 0.76.
- Out-of-distribution progress dropped from 0.74 to 0.50 (in-distribution vs OOD).
- Source: https://arxiv.org/abs/2503.20020

**ASIMOV v1**
- Best auto-generated constitution: 84.3%.
- No constitution: 58.6% overall, and 33.6% under adversarial prompting.
- Asimov's Three Laws as the constitution: 75.1%.
- Source: https://arxiv.org/abs/2503.08663

**ASIMOV-2.0 (frontier models as of Sept 2025)**
- Recognising risk in text scenarios: 92.3% on average.
- Judging whether an action is safe: best models 74% and 66%.
- Video vs text gap: 27 points (Claude Opus 4.1) and 40 points (GPT-5).
- Source: https://arxiv.org/abs/2509.21651

**Gemini Robotics 2 safety report (company-reported)**
- Distance to the nearest human: mean error 0.36 m for ER 2 vs 0.53–0.54 m for GPT 5.5 and Opus 4.8.
- Detecting a breach of a 1 m boundary: 93.0% vs 79.2–81.7% (read from figure).
- Reacting to structured safety messages with a stop call: 100% for ER 2, Claude Opus 4.8 and GPT 5.5.
- Ambiguity: no model caught more than about 84% of ambiguous instructions, and one model carried out only 51% of clear ones (read from figure).
- Humanoid in the lab: 99% human detection and 96% reliable moves to a safe pose.

**ER 1.6**
- Reported +6% (text) and +10% (video) over Gemini 3.0 Flash on injury-risk perception. [company research blog] https://deepmind.google/blog/gemini-robotics-er-1-6

**Attacks and guardrails**
- **RoboPAIR** [preprint, 2024-10-17] https://arxiv.org/abs/2410.13691
  - Jackal robot with a GPT-4o planner: direct prompting 3%; RoboPAIR 100%.
  - Unitree Go2 robot dog: direct prompting 8%; RoboPAIR 100%.
- **BadRobot** on real UR3e and myCobot arms with GPT-4-turbo: 68.57% of attacks succeeded vs 22.85% for direct malicious queries. A consistency check cut attack success by only 22.27%.
- **Typographic attack** (simulated household manipulation): 67.8% attack success; "the robot physically grasps and delivers the wrong object". [preprint, 2026-05-18] https://arxiv.org/abs/2605.18593
- **Adversarial patches:** up to 100% task failure in simulation, vs 23.5% without the patch. [ICCV 2025] https://arxiv.org/abs/2411.13587
- **RoboGuard:** attack success fell from 82.3% (template attack) and 92.3% (RoboPAIR) to below 3%. Removing the guardrail's chain-of-thought reasoning raised attack success from 4.3% to 12.8%.
- **AutoRT:** the LLM's self-critique rejected only "17/31 = 55%" of tasks that should have been rejected. The authors note "prompting an LLM does not guarantee that the prompt's instructions will be followed".
- **SafeVLA** (simulation): cumulative safety cost down 83.58%, success up 3.85%. [NeurIPS 2025]
- **AEGIS** (simulation): more than 50% better obstacle avoidance and about 10% higher success. [preprint, v2 2026-07]

**Uncertainty and failure detection**
- KnowNo needed 10–24% less human help than baselines while meeting the target success level.
- Sentinel caught 18% more failures than either of its detectors alone.
- FAIL-Detect (TRI) treats failure detection as OOD detection, trained on successful runs only. [peer-reviewed, RSS 2025] https://arxiv.org/abs/2503.08558
- A fast anomaly classifier hands off to a slower LLM that picks a fallback plan. [peer-reviewed, RSS 2024] https://arxiv.org/abs/2407.08735

**Evaluation: trial counts and why demos mislead**
- **TRI large behavior models study** [preprint, 2025-07-07] https://arxiv.org/abs/2507.05331
  - 1,800 real-world trials, with 50 real rollouts per task, per policy, per condition (200 in simulation), and blind A/B testing.
  - "there is significant risk that many robotics papers are measuring statistical noise due to insufficient statistical power".
- **Reporting practice:** papers often give "little to no information regarding the number of runs, the initial conditions, and the success criteria". [preprint, 2024-09] https://arxiv.org/abs/2409.09491
- **STEP:** typical comparisons use "a small feasible sample size (e.g., 10 or 50)", and adding trials after the fact risks p-hacking. Its sequential test cuts trials by up to 32%. [peer-reviewed, RSS 2025] https://arxiv.org/abs/2503.10966
- **1X:** "For one policy checkpoint, it takes hundreds to thousands of samples to gather statistically significant metrics." [company tech report, 2025-06-16] https://1x.tech/discover/redwood-ai-world-model
- **PI:** "it's relatively easy to get VLAs to succeed at a task some of the time, it's quite hard to make them succeed reliably". Its Robot Olympics tasks averaged 52% success. https://www.pi.website/blog/olympics
- **Skild founders:** "a successful clip from a robot with 5%, 10%, or 99% accuracy can look exactly the same". [company research blog, 2026-09-10] https://www.skild.ai/blogs/skild-crosses-100m-arr
- **My calculation (exact binomial, 95% one-sided):**
  - 0 failures in 50 trials only shows a failure rate of at most 5.8%.
  - Showing at most 1% takes about 300 failure-free trials.
  - 9 successes out of 10 gives a 95% interval of 55.5–99.7%.

**World models as evaluators**
- **DeepMind's Veo-based simulator** (validated against 1,600+ real trials):
  - Correlation with real results: Pearson 0.88 in nominal conditions, 0.86 out of distribution.
  - Correlation is weakest (0.56) for novel objects.
  - Predicted success rates come out lower than real ones.
  - It also hallucinated objects appearing spontaneously in generated video.
- **1X** reports that its world model struggles with objects held out of training.
- **NVIDIA/JHU Cosmos-Surg-dVRK:** Pearson r = 0.718, but it was optimistic (mean bias error 0.140), and more so when fine-tuned without failure episodes. https://arxiv.org/abs/2510.16240

**Startups: what they actually say vs marketing**
- **Physical Intelligence:** six posts from April 2025 to October 2026, including the API beta of 2026-10-13, contain no "safe", "safety", "harm" or "injur" (my keyword search).
- **Skild:** the only claim is "built-in power limits to prevent robots from applying unsafe force". It comes via Reuters (2025-07-29, https://srnnews.com/amazon-backed-skild-ai-unveils-general-purpose-ai-model-for-multi-purpose-robots/) and appears in none of the 8 Skild blog posts I checked. Treat it as an unsubstantiated claim.
- **Figure:** announced a safety centre in January 2025, promising tests of "safe AI behaviors". [press, 2025-01-28] https://techcrunch.com/2025/01/28/figure-ai-details-plan-to-improve-humanoid-robot-safety-in-the-workplace
  - A November 2025 lawsuit from its former product-safety head alleges a robot "carved a ¼-inch gash into a steel refrigerator door during a malfunction".
  - Figure calls the allegations "falsehoods". They are unproven. [press, 2025-11-24] https://interestingengineering.com/innovation/figure-ai-faces-whistleblower-lawsuit
- **1X NEO** [company marketing, 2026] https://www.1x.tech/order
  - "an Expert from 1X can remotely supervise its actions at scheduled times".
  - The page claims HIC <250 and a pinch-proof design, without published test data.
- **Anthropic Project Fetch** (low relevance): a robot dog driven by Claude-written code went "careening toward the hapless coders". [company research blog, 2025-11-12] https://www.anthropic.com/research/project-fetch-robot-dog

---

## 4. Best resources, ranked
| # | Title | URL | Date | Type | Why it's useful | Trust |
|---|---|---|---|---|---|---|
| 1 | Gemini Robotics 2: Safety Evaluations | https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf | 2026-07-29 | tech report | Newest layered model; orchestration guardrails with frontier-model numbers; maps to ISO standards | High (self-reported) |
| 2 | Safety Guardrails for LLM-Enabled Robots (RoboGuard) | https://arxiv.org/abs/2503.07885 | 2026-03 (RA-L) | peer-reviewed | Concrete guardrail architecture, attack numbers, honest limits | High |
| 3 | A Careful Examination of Large Behavior Models (TRI) | https://arxiv.org/abs/2507.05331 | 2025-07-07 | preprint | Model of rigorous statistical evaluation | High |
| 4 | Can AI Perceive Physical Danger and Intervene? (ASIMOV-2.0) | https://arxiv.org/abs/2509.21651 | 2025-09/11 | preprint | Grasp and gripper constraint failures of frontier models | High |
| 5 | Generating Robot Constitutions & Benchmarks for Semantic Safety | https://arxiv.org/abs/2503.08663 | 2025-03-11 | preprint (CoRL 2025) | Constitutions, the safety-brain idea, limitations | High |
| 6 | Robots That Ask For Help (KnowNo) | https://arxiv.org/abs/2307.01928 | 2023 | peer-reviewed | Calibrated asking for help | High |
| 7 | SAFE: Multitask Failure Detection for VLAs | https://arxiv.org/abs/2506.09937 | 2025 | peer-reviewed | Runtime detection for VLAs specifically | High |
| 8 | Evaluating Gemini Robotics Policies in a Veo World Simulator | https://arxiv.org/abs/2512.10675 | 2025-12-11 | tech report | Safety red-teaming in a world model; its limits | Medium-High |
| 9 | Semantically Safe Robot Manipulation (Brunke et al.) | https://arxiv.org/abs/2410.15185 | 2025-05 (RA-L) | peer-reviewed | Bridges semantic constraints to a CBF filter | High |
| 10 | Unpacking Failure Modes of Generative Policies (Sentinel) | https://arxiv.org/abs/2410.04640 | 2024 | peer-reviewed | Failure taxonomy; fast vs slow monitors | High |
| 11 | Robot Learning as an Empirical Science | https://arxiv.org/abs/2409.09491 | 2024-09 | preprint | Practical evaluation checklist | High |
| 12 | Responsibly advancing AI and robotics (DeepMind) | https://deepmind.google/models/gemini-robotics/responsibly-advancing-ai-and-robotics/ | undated | company research page | The Swiss-cheese framing; disclaimers | Medium |
| 13 | π*0.6 (Physical Intelligence) | https://www.pi.website/blog/pistar06 | 2025-11-17 | company research blog | Candid account of compounding errors and teleop corrections | Medium |

---

## 5. Open questions and things I could not verify
- **No independent replication** of DeepMind's ASIMOV or ASIMOV-Agentic results. All of them are company-reported, and I did not inspect the ASIMOV-Agentic dataset itself.
- **Values read from charts:** the GR 1.0 figure and the GR2 tool-use, human-proximity and ambiguity values were read visually by me.
- **Venues unverified:** RoboPAIR, Safety Chip (https://arxiv.org/abs/2309.09919), AHA and the Kress-Gazit paper.
- **Safety statements not found:**
  - Covariant: no statement found; the IEEE Spectrum piece of 2024-03-11 has none.
  - NVIDIA Halos / robot functional safety: not researched, because the search budget ran out.
  - PI API safety terms: not found.
- **Grasp failure rates:** no VLA vendor publishes per-model grasp failure rates or safety evaluations for its released checkpoints.
- **Standards:** ISO 25785-1 for humanoids is still under development (GR2 report). How to certify a learned grasp policy under ISO 13849 or IEC 61508 is unresolved.
- **Long-context robustness:** GR2's 100% stop-message handling is untested against long contexts and attention jailbreaks; the report itself defers this to future work.
- **Not researched:** regulation (EU AI Act / Machinery Regulation, Japan).
