# Physical AI Safety & Security Resources

Checked on 2026-10-15. Labels: (peer-reviewed), (preprint), (company), (government), (standards body).

## Knowledge

### Core: why the AI cannot be the safety function
- [Report: "Gemini Robotics 2: Safety Evaluations", Google DeepMind (2026-07-29)](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf) (company)
  A top AI lab states that e-stops, barriers and speed/force limits "remain essential" and gives numbers on AI human-detection limits (p. 5). Use for: Lesson 1; semantic safety; where model guardrails stop.
- [Paper: "Credible Autonomy Safety Argumentation", Koopman, Kane & Black (SSS 2019)](https://users.ece.cmu.edu/~koopman/pubs/Koopman19_SSS_CredibleSafetyArgumentation.pdf)
  Doer/checker pattern (pp. 6–7) and the "malicious doer" test (p. 8); common pitfalls in safety arguments. Use for: architecture reviews, safety cases.
- [Guidance: "Principles for the Secure Integration of AI in OT", CISA and eight partner agencies (2025-12-03)](https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology) (government)
  LLM-type AI "almost certainly should not be used to make safety decisions" (p. 9); failsafes (p. 15); push-only data flows. Use for: client policy on AI in factories.
- [Standard preview: ISO/IEC TR 5469:2024, AI and functional safety](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiectr5469%7Bed1.0%7Den.pdf) (standards body)
  Scope names "non-AI safety related functions to ensure safety for an AI controlled equipment". Use for: citing the pattern in standards language.

### Vendor platforms (NVIDIA Halos)
- [Blog: "Inside NVIDIA Halos for Robotics", NVIDIA (2026-06-22)](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/) (company)
  Fullest description: three layers, safety island, input monitor and fallback, Outside-In blueprint. Use for: how a vendor builds doer/checker. Read together with the next three.
- [Accreditation: ANAB certificate and scope AI-3345 (scope v002, 2025-06-06)](https://search.anab.org/public/organization_files/NVIDIA-Corporation-Cert-and-Scope-File-06-06-2025_1749243349.pdf) (accreditation body)
  Shows the "Halos Certified" lab is a "TYPE C (SECOND PARTY) BODY" doing "review of documentation". Use for: judging certification claims.
- [Safety notice: Halos Outside-In Safety Blueprint](https://github.com/NVIDIA/halos-outside-in-safety/blob/develop/SAFETY_NOTICE.md) (company)
  "No claims are made on compliance…"; deployment needs "your own independent, certified safety system". Use for: the gap between a blueprint and a certified product.
- [Blog: "Physical AI Halos safety", Riccardo Mariani, NVIDIA (2026-09-21)](https://blogs.nvidia.com/blog/physical-ai-halos-safety/) (company, marketing level)
  TÜV Rheinland "is inspecting" the robotics stack (readiness, not yet certified). Use for: status checks.
- [Model card: NVIDIA GR00T N1.6, safety and security](https://huggingface.co/nvidia/GR00T-N1.6-3B/blob/main/SAFETY_and_SECURITY.md) (company)
  "not tested or intended for use in mission critical applications that require functional safety". Use for: showing clients what model makers promise.

### Security
- [Threat model: "ROS 2 Robotic Systems Threat Model" (2019, updated 2021)](https://design.ros2.org/articles/ros2_threat_model.html)
  STRIDE and DREAD applied to a robot arm; assets, entry points, actors. Use for: Lesson 2 template.
- [Blog: "Threat modeling physical AI: when the attack surface is the world", Thomas Roos, Exein (2026-07-10)](https://www.exein.io/blog/threat-modeling-physical-ai) (company, substantive)
  "Model the loop": perception, reasoning, action, memory, connectivity. "Any mitigation that depends on the model behaving is not a mitigation." Use for: AI attack chains. Gap: no functional safety, no ROS 2.
- [Docs: About ROS 2 security (source on GitHub)](https://github.com/ros2/ros2_documentation/blob/kilted/source/Concepts/Intermediate/About-Security.rst)
  Security "turned off by default"; `ROS_SECURITY_ENABLE`, `ROS_SECURITY_STRATEGY=Enforce`. Use for: concrete hardening checks.
- [Paper: "Jailbreaking LLM-Controlled Robots" (RoboPAIR), Robey et al. (2024)](https://arxiv.org/abs/2410.13691) (peer-reviewed per authors: ICRA 2025)
  "often achieving 100% attack success rates"; first jailbreak of a deployed commercial robot. Use for: why L1 guardrails matter.
- [Paper: "Safety Guardrails for LLM-Enabled Robots" (RoboGuard), Ravichandran et al. (2025)](https://arxiv.org/abs/2503.07885)
  Unsafe plan execution "from over 92% to below 3%". Use for: what a structured L1 guardrail can do.
- CVE records for case studies: [CVE-2025-35027 UniPwn](https://www.cve.org/CVERecord?id=CVE-2025-35027), [CVE-2025-2894 Unitree Go1 backdoor](https://www.cve.org/CVERecord?id=CVE-2025-2894), [CVE-2026-25874 LeRobot pickle RCE](https://www.cve.org/CVERecord?id=CVE-2026-25874), [CVE-2025-32434 PyTorch weights_only RCE](https://www.cve.org/CVERecord?id=CVE-2025-32434)
  Use for: Lesson 2 (real flaws in robots and in the VLA tool chain).
- [Preprint: Unitree G1 security assessment, Alias Robotics (2025)](https://arxiv.org/abs/2509.14096) (preprint by a security vendor)
  Only deep public teardown of a production humanoid. Some claims hedged by the authors.
- Papers on attacks against the AI layer: [BadVLA backdoors (2025, preprint)](https://arxiv.org/abs/2505.16640), [adversarial patches on VLAs (2024)](https://arxiv.org/abs/2411.13587), [CHAI sign-based command hijacking (2025)](https://arxiv.org/abs/2510.00181).
- [OWASP LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
  "Implement authorization in downstream systems". Use for: shared language with AppSec teams.
- [Docs: ROS 2 discovery settings (source on GitHub)](https://github.com/ros2/ros2_documentation/blob/kilted/source/Tutorials/Advanced/Improved-Dynamic-Discovery.rst)
  "By default, ROS 2 will attempt to find all nodes on all hosts on the same subnet automatically"; `ROS_AUTOMATIC_DISCOVERY_RANGE`. Use for: E5 hardening.
- [Advisory: ICSA-21-315-02, vulnerabilities in DDS implementations, CISA (2021-11-11)](https://www.cisa.gov/news-events/ics-advisories/icsa-21-315-02) (government)
  13 CVEs across six DDS vendors, highest CVSS 8.6. Use for: showing that robot middleware needs patching like any other software.
- [Disclosure: UniPwn, Bin4ry and team (2025-09-20)](https://github.com/Bin4ry/UniPwn)
  Hard-coded key "same across all devices", "unitree" handshake, wormable over BLE; with timeline. Use for: E6 case study.
- [Preprint: "Cybersecurity AI: Humanoid Robots as Attack Vectors", Mayoral-Vilches, Makris & Finisterre (2025-09)](https://arxiv.org/abs/2509.14139) (preprint by a security vendor)
  Unitree G1 telemetry "every 300 seconds without operator notice"; hardcoded AES keys shared across units. Use for: E7 and camera/telemetry data questions.
- [Paper: "To Make a Robot Secure", Bonaci et al. (2015)](https://arxiv.org/abs/1504.04339) (preprint)
  Raven II surgical robot: overriding surgeon commands and abusing the e-stop with "single packet" attacks. Use for: E8, safety functions as a target.
- [Blog: ISA/IEC 62443 concepts, Dragos (2025-01, updated 2025-08)](https://dragos.com/blog/isa-iec-62443-concepts) (company, technical)
  Plain definitions of zones and conduits. Use for: explaining cell segmentation to clients.

### Safety standards and architecture
- [Preprint: ISO 10218 2011 vs 2025 comparison, Hartmann et al. (2026-02)](https://arxiv.org/abs/2602.17822) (preprint)
  Free clause-level summary of the paywalled 2025 standards (robot classes, SSM/PFL annexes, cybersecurity clause). Use for: Lesson 3. Verify against the standard before client use.
- [ISO committee record: ISO 10218-2:2025](https://committee.iso.org/standard/73934.html) (standards body)
  Official scope and status. Also [ISO/TS 15066](https://committee.iso.org/standard/62996.html) and [ISO 25785-1](https://committee.iso.org/standard/91469.html).
- [Paper: "The Safety Filter: A Unified View of Safety-Critical Control in Autonomous Systems", Hsu, Hu & Fisac (2023)](https://arxiv.org/abs/2309.05837) (peer-reviewed)
  Simplex, control barrier functions and shields as one idea: monitor, intervention, fallback. Use for: L3 design.
- [Blog: "Built for the Real World", Velagapudi & Reese, Agility Robotics (2026-06-22)](https://www.agilityrobotics.com/content/built-for-the-real-world) (company)
  How a humanoid startup's safety evolved: remote e-stop → external controller (robot fell on link loss) → on-board safety PLC with category 1 stop. Use for: real startup practice.
- [Report: IEEE Humanoid Study Group, future standards (2025-09)](https://www.therobotreport.com/wp-content/uploads/2025/09/IEEE-Humanoid-Report-of-Future-Standards-Development.pdf)
  Why cutting power is not a safe state for humanoids; fault-response levels. Use for: mobile and legged robots.

### AI-model level
- [Preprint: "Generating Robot Constitutions & Benchmarks for Semantic Safety", Google DeepMind (2025)](https://arxiv.org/abs/2503.08663)
  Robot constitutions and the ASIMOV benchmark; "a constitution alone is not enough" without trusted inputs. Use for: Lesson 4.
- [Paper: "Robots That Ask For Help" (KnowNo), Ren et al. (CoRL 2023)](https://arxiv.org/abs/2307.01928) (peer-reviewed)
  Calibrated asking for help with conformal prediction. Use for: ambiguity handling.
- [Paper: LIBERO-Plus, VLA robustness (2025)](https://arxiv.org/abs/2510.13626)
  Success "from 95% to below 30% under modest perturbations". Use for: why demos mislead.
- [Preprint: "A Careful Examination of Large Behavior Models", Toyota Research Institute (2025)](https://arxiv.org/abs/2507.05331) (preprint)
  Blind A/B tests, 50 trials per condition, statistical power. Use for: evaluation practice.
- [Paper: SAFE, failure detection for VLAs (NeurIPS 2025)](https://arxiv.org/abs/2506.09937) (peer-reviewed)
  Runtime failure detection from the VLA's internal features. Use for: L3 monitors.

### Assurance
- [Guidance: SACE v1.1, University of York (2026-07)](https://www.york.ac.uk/media/assuring-autonomy/documents/guidancedocuments/SACE_v1_1.pdf)
  Step-by-step safety assurance for autonomous systems, with GSN patterns and robot examples. Use for: Lesson 5.
- [Handbook: STPA Handbook, Leveson & Thomas (MIT, 2018)](https://psas.scripts.mit.edu/home/get_file.php?name=STPA_Handbook.pdf)
  Hazard analysis for losses where nothing "failed". Use for: hazard analysis of AI behavior.
- [Standard: GSN Community Standard v3 (SCSC, 2021)](https://scsc.uk/r1386.pdf) (free)
  Notation for safety cases: goals, strategies, evidence. Use for: writing safety cases.
- [Draft: UL 4600 voting version (2019)](https://users.ece.cmu.edu/~koopman/ul4600/191213_UL4600_VotingVersion.pdf)
  Free view of safety-case, monitoring and change-trigger clauses; "use of a retrained neural network" triggers re-analysis. Published editions are paywalled.
- [Report: "Driving to Safety", RAND (2016)](https://www.rand.org/pubs/research_reports/RR1478.html)
  Why testing alone cannot prove safety; the trial-count formula. Use for: explaining statistics to clients.

### Regulation (EU)
- [EU Machinery Regulation 2023/1230](https://eur-lex.europa.eu/eli/reg/2023/1230/oj/eng) and [Commission page](https://single-market-economy.ec.europa.eu/sectors/mechanical-engineering/machinery_en) (government)
  Applies from 2027-01-20. Annex III 1.1.9 (protection against corruption), 1.2.1 (self-evolving behaviour limits), Annex I Part A item 5 (third party for ML safety components).
- [Commission: CRA reporting](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) (government)
  Reporting since 2026-09-11: early warning in 24 h, notification in 72 h.
- [Commission: AI Act framework and AI Omnibus dates](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) (government)
  High-risk duties from 2027-12-02 (Annex III) and 2028-08-02 (AI in regulated products).

### Japan
- [MHLW leaflet: criteria for collaborative operation without fences (2013-12)](https://www.mhlw.go.jp/bunya/roudoukijun/dl/pamphlet_140115.pdf) (government)
  Two routes: risk assessment, or ISO 10218:2011 plus technical file and declaration of conformity.
- [MHLW notice 基発第339号, consolidated text](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1) (government)
  Official definitions: 可動範囲 (motion range), 運転中 (operating), the fence-free conditions.
- [Ordinance on Industrial Safety and Health, e-Gov](https://laws.e-gov.go.jp/law/347M50002000032) (law)
  Arts. 150-3 (teaching), 150-4 (fences or measures), 150-5 (stop, lock and sign before inspection or cleaning).
- [MHLW interim summary on unmanned machine safety (2026-06-29)](https://www.mhlw.go.jp/stf/newpage_74141.html) (government)
  Physical-AI machines "not currently subject to specific regulation" (our translation); review under way.
- [J-AISI AI Robotics Safety Evaluation Perspectives Guide v1.0 (2026-07)](https://aisi.go.jp/output/output_information/260723/) (government)
  Physical, psychological and social risks; nine evaluation perspectives; VLA models from the next edition. Notes that the safety-related part must be independent (p. 28).
- [AI Guidelines for Business v1.2, MIC and METI (2026-03-31)](https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/20260331_report.html) (government)
  Definition of physical AI and its risks; has an English tentative translation.
- [MHLW functional-safety guideline (2016)](https://www.mhlw.go.jp/web/t_doc?dataId=00010230&dataType=0&pageNo=1) (government)
  Setting SIL/PL targets for machine safety functions.
- [RRI Collaborative Robot Safety Explanatory Guide (2023)](https://www.jmfrri.gr.jp/wp-content/uploads/2024/12/wg2_anzen.pdf) (industry association)
  Worked risk-assessment examples; predates the 2025 standards.

### Data, models and know-how (Lesson 4)
- [Unfair Competition Prevention Act, e-Gov](https://laws.e-gov.go.jp/law/405AC0000000047) (law)
  Art. 2(6) trade secret (managed as secret, useful, not public; "生産方法" named first); Art. 2(7) 限定提供データ.
- [METI 営業秘密管理指針 (revised 2025-03)](https://www.meti.go.jp/policy/economy/chizai/chiteki/guideline/r7ts.pdf) (government)
  Minimum measures for protection; ㊙ marks and passwords for electronic data; cloud storage is fine if managed as secret; new AI notes (note 2, footnote 24: giving data to an outside generative-AI provider may deny secrecy); tacit know-how must be made visible on a medium.
- [METI 限定提供データに関する指針 (revised 2024-02)](https://www.meti.go.jp/policy/economy/chizai/chiteki/guideline/h31pd.pdf) (government)
  Training datasets and trained models as examples; a model "no longer the same" as the data is not unfair competition.
- [METI AI・データの利用に関する契約ガイドライン（AI編） (2018-06)](https://www.meti.go.jp/policy/mono_info_service/connected_industries/sharing_and_utilization/20180615001-3.pdf) (government)
  Data cannot be owned; robots: the user may hold the know-how; restrict fine-tuned and distilled models explicitly in the contract.
- [METI AIの利用・開発に関する契約チェックリスト (2025-02)](https://www.meti.go.jp/policy/mono_info_service/connected_industries/sharing_and_utilization/20250218003-ar.pdf) (government)
  インプット処理成果 (A-6); removal from a trained model "generally difficult". Lesson 4's primary source.
- [AI Guidelines for Business v1.2, appendix (2026-03-31)](https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/20260331_report.html) (government)
  AIBOM next to SBOM for AI developers; physical AI widens the attack surface for data poisoning.
- [NIST AI 100-2 E2025, Adversarial Machine Learning](https://csrc.nist.gov/pubs/ai/100/2/e2025/final) (government)
  Model extraction: "a functionally equivalent model can be reconstructed"; differential privacy does not stop it.
- Policy stealing research: ["Stealing Deep Reinforcement Learning Models for Fun and Profit"](https://arxiv.org/abs/2006.05032) (2020), ["Stealthy Imitation"](https://arxiv.org/abs/2405.07004) (ICML 2024), [cobot traffic fingerprinting](https://arxiv.org/abs/2312.06802) (2023, preprint), [membership inference on VLAs](https://arxiv.org/abs/2605.07088) (2026, preprint), [GoBA physical-object backdoors](https://arxiv.org/abs/2510.09269) (2025, preprint).
- Supply-chain tools: [CycloneDX v1.5 (ML-BOM)](https://cyclonedx.org/news/cyclonedx-v1.5-released/), [SPDX 3.0.1 AI profile](https://spdx.github.io/spdx-spec/v3.0.1/model/AI/Classes/AIPackage/), [OWASP LLM03:2025 Supply Chain](https://genai.owasp.org/llmrisk/llm032025-supply-chain/), [model-signing](https://pypi.org/project/model-signing/) (1.0 on 2025-04-04), [safetensors](https://huggingface.co/docs/safetensors/index).
- [LeRobot docs: recording](https://huggingface.co/docs/lerobot/il_robots) (project docs)
  Datasets are pushed to the Hugging Face Hub by default after recording; Hub repos are public by default.
- [J-AISI AI robotics guide v1.0](https://aisi.go.jp/assets/pdf/20260723_robotics_ai_safety_eval_v1.0_ja.pdf) (government)
  Version and update history of software, models and settings; defined change scope and verification owner.
- [FDA PCCP final guidance (2025-08)](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence) (government, medical devices)
  A model for planning allowed model changes in advance.

### Camera data, remote operation and the cloud (Lesson 5)
- [PPC ガイドラインに関するＱ＆Ａ (updated 2025-07-01)](https://www.ppc.go.jp/files/pdf/250701_APPI_QA.pdf) (regulator)
  Q1-13/Q1-14 cameras and face recognition; Q1-41 video databases; Q5-7 monitoring employees; Q7-38/Q7-39 vendors; Q7-53 and Q12-4 clouds and transfers abroad.
- [PPC: 2026 amendment of the APPI](https://www.ppc.go.jp/personalinfo/legal/r8kaiseihogohou/) (law, regulator)
  Passed 2026-07-10, promulgated 2026-07-17, in force within two years; 特定生体個人情報; statistics and AI development; limits on entrusted vendors. Detailed rules in drafting.
- [Camera Guidebook ver3.0 (2022-03)](https://www.soumu.go.jp/main_content/000803603.pdf) (government)
  Edge deletion still counts as acquisition; state AI retraining use; care with employees.
- [PPC camera panel report (2023-03)](https://www.ppc.go.jp/files/pdf/cameragazou_yushikisyakentoukai_houkokusyo.pdf) (regulator)
  Footnote 56: the "obvious purpose" exception may stop fitting as cameras gain other purposes.
- [EDPB Guidelines 3/2019 on video devices](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_201903_video_devices_en_0.pdf) (regulator, EU)
  "For your safety" is not specific; employees do not expect monitoring; erase after a few days; deactivate unneeded functions.
- [AI Act Art. 5(1)(f)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) and [Commission guidelines on prohibited practices (2025-07-29)](https://ec.europa.eu/newsroom/dae/redirection/document/112367) (law, EU)
  Emotion recognition at work banned except for medical or safety reasons; "factories and warehouses" are workplaces.
- [Data Act (EU) 2023/2854](https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng) (law, EU)
  Product data access for users; makers may not use data to learn the user's "production methods"; new products from 2026-09-12.
- [MHLW interim summary on unmanned operation (2026-06-29)](https://www.mhlw.go.jp/content/11201250/001716203.pdf) and [summary](https://www.mhlw.go.jp/content/11201250/001717896.pdf) (government)
  自律運転 vs 遠隔運転; explicit mode switching; one remote operator per machine; automatic stop on link failure; physical AI to be examined.
- [IEC 60204-1:2016 9.2.4 as quoted by IDEC](https://www.jmf.or.jp/jmf/wp-content/uploads/2024/04/IEC-60204-1_2016.pdf) (company seminar quoting the standard)
  Automatic stop on loss of cableless control; restoring the link "shall not restart the machine".
- [CISA et al., Principles for the Secure Integration of AI in OT (2025-12-03)](https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology) (government)
  Push-based design; vendor training on operational data; on-premises options. Lesson 5's primary source.
- [CISA et al., Adapting Zero Trust Principles to OT (2026-04-29)](https://www.cisa.gov/resources-tools/resources/adapting-zero-trust-principles-operational-technology) (government)
  Jump hosts, recorded privileged sessions, just-in-time vendor access.
- [NCSC secure connectivity principles for OT (2026-01-14)](https://www.ncsc.gov.uk/collection/operational-technology/secure-connectivity) (government)
  Outbound-only connections, deny-all host filtering, break-glass only for emergencies.
- [NIST SP 800-82r3 (2023-09)](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) (government)
  "Remote access should not circumvent or negate safety or security controls."
- [METI factory security guideline v1.1 (2025-04-11)](https://www.meti.go.jp/policy/netsecurity/wg1/factorysystems_guideline_ver1.1.pdf) (government)
  Checklist 3-6: two-factor authentication, per-user device limits, time limits, detection outside maintenance windows.
- [Agility Robotics, "Built for the real world" (2026-06-22)](https://www.agilityrobotics.com/content/built-for-the-real-world) (company)
  External safety controller: the robot "would fall" on communication loss; moved to an onboard safety PLC with category 1 stop.
- ["Cybersecurity AI: Humanoid Robots as Attack Vectors"](https://arxiv.org/abs/2509.14139) (2025, preprint, robot-security company)
  Unitree G1 telemetry "every 300 seconds without operator notice".
- ["Unique Identification of 50,000+ VR Users from Head & Hand Motion Data"](https://arxiv.org/abs/2302.08927) (2023)
  94.33% identification from 100 seconds of motion: teleoperation recordings can identify operators.

## Wisdom (Communities)

- [Safety-Critical Systems Club (UK)](https://scsc.uk)
  Seminars "AI in a Safety Workflow" (2026-10-29) and "Safety Assurance for AI Systems" (2026-11-12); publishes the GSN standard. Use for: safety cases and AI assurance with experts. Membership-based; newsletter free.
- [Japan Robot Association (JARA)](https://www.jara.jp/)
  Free online lecture "協働ロボットの利活用とフィジカルAI" on 2026-11-04, 13:15–15:00; apply by 2026-10-28 ([flyer](https://www.jara.jp/news/2026/260907/info.pdf)). Use for: Japanese industry view on cobots and physical AI.
- [ROS Discourse](https://discourse.ros.org)
  Use for: concrete questions about safety and security architecture in ROS 2 (tag `safety` or `security`). Good for newcomers.
- [Hugging Face LeRobot Discord](https://discord.gg/q8Dzzpym3f) (invite from the [LeRobot README](https://github.com/huggingface/lerobot))
  Large, active community. Use for: practical questions about how VLA policies fail. Not a safety venue.
- [Phil Koopman's newsletter](https://philkoopman.substack.com)
  Use for: following an expert on safety cases and the limits of testing.
- [ROS Japan Users Group](https://rosjp.connpass.com/)
  Regular meetups. Use for: hands-on ROS 2 talk in Japanese.
- Research workshops on safe robot learning at RSS and CoRL ([SPAIS](https://spais-ws.org), CoRL 2026)
  Use for: following the research frontier; slides are often posted.
- [IPA ICSCoE](https://www.ipa.go.jp/jinzai/ics/index.html)
  Use for: formal training in industrial control system (OT) security.
- Note: the ROS 2 Security Working Group appears dormant (last meeting post found: March 2025).

## Gaps

- No public, complete safety case for a learned manipulation policy.
- ISO 10218:2025 is paywalled; clause details come from a preprint. Verify before client use.
- How Japanese labour inspectors treat ISO 10218:2025 compliance (the 2013 fence-free route names the 2011 edition). Ask a Labour Standards Inspection Office.
- Whether hand-guiding or teleoperation for VLA data collection counts as "teaching" (教示等) under Japanese law, which needs special education.
- No VLA vendor publishes per-model grasp failure rates or safety evaluations of released models.
- EU: whether a frozen-weight VLA counts as "self-evolving behaviour"; the delegated acts that add AI requirements to the Machinery Regulation are not adopted yet.
- Whether model weights and datasets must be listed in a Cyber Resilience Act SBOM: no official text found (October 2026).
- The detailed rules of Japan's 2026 APPI amendment (scope of 特定生体個人情報, how notices must be given) are still in drafting.
- No study yet measures how much industrial know-how leaks from teleoperation demonstrations or from a deployed VLA.

## Excluded, or read with care

- USCSI, "Physical AI Security: Key Risks and How to Address Them" (2026-10-06): generic, cites no primary sources, ends by selling a certification. Use only as a vocabulary checklist.
- Vendor pages with claims but no published test data (for example 1X NEO safety claims, FORT Robotics' unnamed SIL 3 claim, scenario-testing tool marketing).
