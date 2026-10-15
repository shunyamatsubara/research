# Research notes: japan rules

Raw report from a research agent, 2026-10-15. Working notes, not a lesson.
Claims carry the source URL the agent read. Facts used in lessons were re-checked;
re-check anything else against its source before teaching or client use.

---

# Japan: robot and physical-AI safety and security. Rules, standards, guidance and communities (checked 2026-10-15)

**How this was checked.** I read the laws in full through the e-Gov API. I took JIS status from the JISC database and from JSA Webdesk, the publisher's catalogue. I read the MHLW notices and guidance in full from the MHLW database or regional Labour Bureau PDFs. Where I write **"Inference"**, that is my own reasoning and no source says it. The shared web-search quota ran out near the end, so the last checks used direct fetches of known official pages only (see §6). Nothing was written to /workspace/research.

**Source labels:** [law] = law or regulation text · [ministry] = ministry or government-agency guidance · [standards] = standards body · [assoc] = industry association · [company] · [community] = community page.

---

## 1. Key findings

### Q1. What applies to an AI-driven pick-and-place cell near people, and what is needed to run it without a fence

**Is it an "industrial robot"?**
- An industrial robot (産業用ロボット) is defined in Ordinance on Industrial Safety and Health (労働安全衛生規則) Art. 36(31). It is a machine with a manipulator and a memory device that moves automatically. [e-Gov; the version in force is from 2026-10-01](https://laws.e-gov.go.jp/law/347M50002000032) [law]
- **The 80 W rule** is in MHLW Notice No. 51 (1983-06-25). It excludes:
  - machines whose drive motors are "八〇ワツト以下" ("80 W or less"; with several motors, the largest one counts);
  - machines that repeat a single motion under fixed-sequence control;
  - machines the Director-General of the Labour Standards Bureau recognises as safe.
  - Source: [MHLW DB](https://www.mhlw.go.jp/web/t_doc?dataId=74084000&dataType=0&pageNo=1) [law]
- **Machines "under R&D" (研究開発中) are also excluded, but narrowly.** A finished machine trialled on a production floor does not count as R&D. [Notice 基発第339号 as amended by 基発1224第2号, MHLW DB](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1) [ministry]

**The fence rule and penalties**
- Art. 150-4 applies when contact with a running robot could endanger workers. The employer must take "さく又は囲いを設ける等当該危険を防止するために必要な措置" ("fences, enclosures or other measures needed to prevent the danger"). [e-Gov](https://laws.e-gov.go.jp/law/347M50002000032) [law]
- Breaching duties based on Industrial Safety and Health Act (労働安全衛生法) Art. 20 carries "六月以下の拘禁刑又は五十万円以下の罰金" ("up to 6 months' confinement or a fine up to ¥500,000"). The company is fined as well (Arts. 119 and 122). [e-Gov](https://laws.e-gov.go.jp/law/347AC0000000057) [law]

**Two routes to fence-free collaborative work (notice 基発1224第2号, 2013-12-24)**

Sources: [MHLW DB](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1) and the [MHLW leaflet, 2013-12](https://www.mhlw.go.jp/bunya/roudoukijun/dl/pamphlet_140115.pdf) [ministry].

- **(a) Risk-assessment route.**
  - The employer carries out a risk assessment under Act Art. 28-2 and puts measures in place.
  - If danger can be "無くなったと評価できる" ("assessed as eliminated"), the fence duty no longer applies.
  - The results must be recorded and kept, as the 2006 risk-assessment guideline requires.
  - The assessment must look especially at three things: the manipulator's force and kinetic energy; the chance of a person being clamped against surrounding structures; and the arm's shape (protrusions that could hit the eyes, sharp edges, pinch points between joints).
- **(b) ISO route.**
  - The robot is designed, made and installed to ISO 10218-1/-2:**2011** and used within its conditions of use.
  - The designer, manufacturer and installer must each prepare a "技術ファイル及び適合宣言書" ("technical file and declaration of conformity").
  - "Installer" (設置者) means whoever is responsible for the safety conditions of the installation: the user, the installer or the maker. **Inference:** for your cell, that is probably the system integrator.

**MHLW's examples of "no danger"** come from the companion notice [基安安発1224第1号](https://jsite.mhlw.go.jp/mie-roudoukyoku/var/rev0/0108/4336/20131225164348.pdf) [ministry]:
- the closest distance between the manipulator and surrounding structures is "500mm 以上" (500 mm or more), or a trapped person can be freed by hand without drive power;
- force values (from ISO/TS 15066) count only if they are guaranteed "制御によらず構造的に" ("structurally, not by control").

**Two definitions that matter for a learned policy** ([same notice](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1)):
- **Motion range (可動範囲)** is the maximum range the arm can physically reach. Only electrical or mechanical stoppers reduce it. It is not limited to what a given program does.
- **Operating (運転中)** includes a robot standing still on program command or "信号待ち" ("waiting for a signal").
- **Inference:** the VLA's "intended" grasp envelope and its pauses while inferring do not shrink the hazard you assess. Only safety-rated limits do.

**Functional safety**
- MHLW technical guideline Notice 353 (2016-09-26) tells manufacturers to define the required safety functions and set integrity targets. The targets use IEC 61508 SIL or ISO 13849 PL. [MHLW DB](https://www.mhlw.go.jp/web/t_doc?dataId=00010230&dataType=0&pageNo=1) [ministry]

**Teaching, maintenance and training**
- Art. 150-3 (teaching): written work rules, a way to stop the robot at once, and a "work in progress" sign.
- Art. 150-5 (inspection and maintenance): stop and lock out the robot, or follow rules if the work must be done while it runs.
- Art. 151: checks before teaching.
- Special education is required for teaching (Art. 36(31)) and for inspection while the robot runs (Art. 36(32)). [e-Gov](https://laws.e-gov.go.jp/law/347M50002000032)
- Minimum hours are set in the Special Education Rules (安全衛生特別教育規程) Arts. 18–19: [MHLW DB](https://www.mhlw.go.jp/web/t_doc?dataId=74085000&dataType=0) [law]
  - teaching: **7 h classroom + 3 h practical**;
  - inspection: **9 h + 4 h**.
- From 2026-04-01 (MHLW Ordinance No. 3 of 2026), Arts. 150-3 and 150-5 use the defined term 作業従事者. The Act defines it as "事業を行う者が行う仕事の作業に従事する者" ("anyone working on the business's work", employee or not). I verified this by comparing e-Gov revisions. [e-Gov](https://laws.e-gov.go.jp/law/347M50002000032)

**JIS status**
- JIS B 8433-1/-2:2015 are identical (IDT) to ISO 10218-1/-2:2011. Both were last reconfirmed on 2024-10-25. The JISC database shows no later revision, so **JIS has not adopted ISO 10218:2025** as of 2026-10-15. [JISC](https://www.jisc.go.jp/app/jis/general/GnrJISNumberNameSearchList?show&jisStdNo=B8433), [JSA](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20B%208433-1:2015) [standards]
- TS B 0033:2017, Japan's version of ISO/TS 15066, is marked "2025-03-25 廃止" ("withdrawn 2025-03-25"). [JSA](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=TS%20B%200033:2017) [standards]
- ISO 10218-1:2025 was published in February 2025. [ISO listing; the page itself was bot-blocked](https://www.iso.org/standard/73933.html) [standards]
- According to a company source, the 2025 revision folds in ISO/TS 15066 and adds cybersecurity requirements. [Phoenix Contact, 2025-12-01](https://automation.phoenix-contact.jp/archives/8301) [company]

**Rules are being reviewed**
- MHLW's expert group on safety of unmanned machine operation (機械の無人運転における安全確保等に関する専門家検討会) published an interim summary on 2026-06-29. [MHLW](https://www.mhlw.go.jp/stf/newpage_74141.html) [ministry]
  - It notes physical-AI machines "現時点では…個別規制の対象となっていない" ("not currently covered by specific rules").
  - Working teams will study each machine type, including "フィジカルAIを含むロボット" ("robots including physical AI").
  - Law changes, guidelines and third-party certification are all under consideration.
- The AI Robotics roadmap (AIロボティクス実装ロードマップ, revised 2026-08-28) lists the 80 W fence rule as an issue: "AIロボットを用いた作業についても、安全規制・安全基準等の整理が必要" ("safety rules and standards for AI-robot work must also be sorted out"). [Cabinet Secretariat](https://www.cas.go.jp/jp/seisaku/ai_robo/dai4/shiryo1.pdf) [ministry]

### Q2. Government AI-safety guidance that touches physical AI

- **AI Promotion Act** (人工知能関連技術の研究開発及び活用の推進に関する法律, Act No. 53 of 2025). [e-Gov](https://laws.e-gov.go.jp/law/507AC0000000053) [law], [Cabinet Office](https://www8.cao.go.jp/cstp/ai/ai_act/ai_act.html) [ministry]
  - Promulgated 2025-06-04 and "全面施行" ("fully in force") from 2025-09-01.
  - It has no penalty provisions.
  - Art. 7 says businesses using AI "協力しなければならない" ("must cooperate") with state measures.
  - Art. 13 requires the state to issue guidelines.
- **AI appropriateness guideline** (人工知能関連技術の研究開発及び活用の適正性確保に関する指針, 2025-12-19). Its safety principle: AI must not harm "生命、身体、財産等" ("life, body, property"). [Cabinet Office](https://www8.cao.go.jp/cstp/ai/ai_guideline/ai_gl_2025.pdf) [ministry]
- **AI Basic Plan, Phase II** (人工知能基本計画, Cabinet decision 2026-07-14). [Cabinet Office](https://www8.cao.go.jp/cstp/ai/ai_plan/aiplan_20260714.pdf) [ministry]
  - It sets "フィジカルＡＩ" ("physical AI") as a core pillar of Japan's AI strategy.
  - It says to strengthen the AI Safety Institute "抜本的に" ("fundamentally").
- **AI Guidelines for Business v1.2** (AI事業者ガイドライン 第1.2版, MIC and METI, 2026-03-31). [METI](https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/20260331_report.html) [ministry]
  - It defines physical AI as AI making "直接的な働きかけ（移動、操作、加工など）" ("direct actions in the real world: moving, manipulating, processing").
  - It asks for guardrails against risks such as "連動するロボットの制御不能" ("loss of control of a linked robot").
- **J-AISI "AI Robotics Safety Evaluation Perspectives Guide" v1.0** (AIロボティクスに関するセーフティ評価観点ガイド, 2026-07-23). [AISI](https://aisi.go.jp/output/output_information/260723/), [PDF](https://aisi.go.jp/assets/pdf/20260723_robotics_ai_safety_eval_v1.0_ja.pdf) [ministry: IPA/J-AISI]
  - It sorts risks into physical, psychological and social, and gives 9 evaluation perspectives.
  - It currently covers LLM, image-recognition and speech-recognition AI. VLA and robot foundation models are "次版以降" ("from the next edition").
  - It discusses placing AI inside or outside the safety-related part of a system, and cites ISO/IEC TR 5469:2024 and the ISO/IEC TS 22440 series that follows it.
- **Other J-AISI guides.** [Evaluation guide](https://aisi.go.jp/output/output_framework/guide_to_evaluation_perspective_on_ai_safety/), [Red-teaming guide](https://aisi.go.jp/output/output_framework/guide_to_red_teaming_methodology_on_ai_safety/) [ministry]
  - Evaluation Perspectives v1.20 (2026-07-07) adds AI-agent items.
  - Red Teaming Methodology v1.10 is dated 2025-03-31.
- **AI Robotics Strategy** (AIロボティクス戦略; decided 2026-03-26, revised 2026-05-27). It plans "安全性認証制度の整備や安全規制の在り方の検討" ("a safety certification scheme and a review of safety regulation"), working with JARA, RRI and AISI. [Cabinet Secretariat](https://www.cas.go.jp/jp/seisaku/ai_robo/dai3/shiryo1.pdf) [ministry]

### Q3. Cybersecurity schemes and guidance for robots and IoT

- **JC-STAR (IoT security labelling scheme)** (セキュリティ要件適合評価及びラベリング制度, METI/IPA, started 2025-03-25). [METI](https://www.meti.go.jp/press/2024/03/20250325007/20250325007.html), [IPA](https://www.ipa.go.jp/security/jc-star/index.html) [ministry]
  - It is voluntary and covers "インターネットプロトコルを使用する通信機能を持つ幅広いIoT製品" ("a wide range of IoT products that communicate using Internet Protocol"); PCs and smartphones are excluded.
  - Levels ★1–★2 are self-declared; ★3–★4 need a third-party evaluation.
  - ★3 requirements exist so far only for network equipment and network cameras (published 2026-02-06, updated 2026-06-12).
  - I found **no robot product category**.
- **AI Robotics Strategy, footnote 7:** for AI-robot security it would consider "JC-STAR）の活用や同制度の拡張" ("using JC-STAR and extending it"). [Cabinet Secretariat](https://www.cas.go.jp/jp/seisaku/ai_robo/dai3/shiryo1.pdf) [ministry]
- **METI Cyber/Physical Security Guidelines for Factory Systems Ver 1.1** (工場システムにおけるサイバー・フィジカル・セキュリティ対策ガイドライン, 2025-04-11). It warns that robots have "装置内に計算機が内蔵" ("computers built in") and often use wireless links, which add risk. [METI](https://www.meti.go.jp/policy/netsecurity/wg1/factorysystems_guideline.html) [ministry]
- **IPA Security Risk Analysis Guide for Control Systems, 2nd ed., April 2026 version** (制御システムのセキュリティリスク分析ガイド). [IPA](https://www.ipa.go.jp/security/controlsystem/riskanalysis.html) [ministry]
- **AI Guidelines for Business v1.2, annex:** physical AI widens the attack surface, raising "データ汚染や悪意あるプロンプト攻撃のリスク" ("risk of data poisoning and malicious prompt attacks"). [METI](https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/pdf/20260331_3.pdf) [ministry]
- **National Cybersecurity Office** (国家サイバー統括室, NCO) replaced NISC: "令和７年７月１日付で…改組" ("reorganised as of 2025-07-01"). [FSA](https://www.fsa.go.jp/news/r7/sonota/20250704/20250704.html) [ministry]. I found no NCO guidance specific to robots.
- **JARA** runs member-only seminars on EN 50742, the EU Machinery Regulation cybersecurity standard (2026-08-28 and 2026-11-05). [JARA](https://www.jara.jp/) [assoc]

### Q4. Communities

- For hands-on ROS 2: ROS Japan UG and ROSCon JP.
- For research: RSJ (Robotics Society of Japan) and SICE SI.
- For industry and standards: JARA lectures and iREX.
- Where physical-AI safety rules are actually being drafted: the J-AISI Robotics SWG (sub-working group) and RRI.
- For formal safety and OT-security skills: JISHA, the Safety Assessor qualification and IPA ICSCoE.
- Details are in §5.

---

## 2. Concepts and terms

| Term | Japanese | Definition | Source |
|---|---|---|---|
| Industrial robot | 産業用ロボット | A machine with a manipulator and memory device that moves automatically, minus the Notice 51 exclusions (≤80 W and others). | [e-Gov](https://laws.e-gov.go.jp/law/347M50002000032), [MHLW](https://www.mhlw.go.jp/web/t_doc?dataId=74084000&dataType=0&pageNo=1) |
| Motion range | 可動範囲 | The maximum range all parts, including the tool, can physically reach. Only stoppers reduce it. | [MHLW](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1) |
| Teaching etc. | 教示等 | Setting, changing or checking the arm's motion order, position or speed while inside the motion range. | [e-Gov](https://laws.e-gov.go.jp/law/347M50002000032) |
| Operating | 運転中 | From the start command to the stop command, including standing still on program command or while waiting for a signal. | [MHLW](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1) |
| Special education | 特別教育 | Training the employer must give before workers do designated hazardous tasks (Act Art. 59(3)). | [e-Gov](https://laws.e-gov.go.jp/law/347AC0000000057) |
| Technical file / declaration of conformity | 技術ファイル／適合宣言書 | The documents needed for the ISO route to fence-free work. | [MHLW leaflet](https://www.mhlw.go.jp/bunya/roudoukijun/dl/pamphlet_140115.pdf) |
| Required safety integrity level | 要求安全度水準 | The reliability target for a safety function, expressed as SIL or PL. | [MHLW](https://www.mhlw.go.jp/web/t_doc?dataId=00010230&dataType=0&pageNo=1) |
| Physical AI | フィジカルAI | AI that senses the physical world and acts on it through actuators. | [METI](https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/pdf/20260331_1.pdf) |
| Controlled-entry zone | 立入等管理区画 | An area where machines work alone and people's entry is controlled. | [MHLW](https://www.mhlw.go.jp/content/11201250/001717896.pdf) |
| Autonomous / remote operation | 自律運転／遠隔運転 | Control by the machine (humans monitor and can e-stop) versus control by a remote human. | [MHLW](https://www.mhlw.go.jp/content/11201250/001717896.pdf) |
| Safety-related part | 安全関連系 | The part of a system that carries the safety functions. J-AISI discusses whether AI should be placed in it. | [AISI](https://aisi.go.jp/assets/pdf/20260723_robotics_ai_safety_eval_v1.0_ja.pdf) |
| Conformity label | 適合ラベル (JC-STAR) | The ★1–★4 IoT security label. | [METI](https://www.meti.go.jp/press/2024/03/20250325007/20250325007.html) |

---

## 3. Concrete rules, numbers and dates

- **Robot rules date from 1983**; the special-education requirement has applied since 1984-04-01. [MHLW](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1)
- **Designers and manufacturers:** Act Art. 3(2) gives them a duty to make efforts to prevent accidents. [e-Gov](https://laws.e-gov.go.jp/law/347AC0000000057)
- **Anyone transferring or leasing a machine:** Ordinance Art. 24-13 says they "通知するよう努めなければならない" ("must make efforts to notify") the recipient of the machine's hazards. [e-Gov](https://laws.e-gov.go.jp/law/347M50002000032)
- **Future amendments up to 2028-04-01 leave Arts. 36(31)–(32) and 150-3 to 151 unchanged.** I checked this by comparing e-Gov revision texts. [e-Gov](https://laws.e-gov.go.jp/law/347M50002000032)
- **Robot accidents:** "30 件/年前後" ("around 30 per year"), as of an MHLW-commissioned manual from 2018-03. [MHLW/JISHA](https://www.mhlw.go.jp/file/06-Seisakujouhou-11300000-Roudoukijunkyokuanzeneiseibu/0000197860.pdf)
- **Other JIS:**
  - JIS B 9700:2013 = ISO 12100:2010
  - JIS B 9705-1:2019 = ISO 13849-1:2015
  - JIS B 9703:2019 = ISO 13850:2015
  - [JSA](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20B%209705-1:2019)
- **Mobile robots and robot service management:**
  - JIS D 6802:2022 = ISO 3691-4:2020 (modified, MOD) [JSA](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20D%206802:2022)
  - JIS B 8446-4:2025, safety of mobile service robots with a manipulator, issued 2025-01-20 [JSA](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20B%208446-4:2025)
  - JIS B 8445:2016 = ISO 13482:2014 [JSA](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20B%208445:2016)
  - JIS Y 1001:2026 = ISO 31101:2023, revised 2026-03-23 [JSA](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20Y%201001:2026)
- **AI Robotics Strategy targets:** "2040 年までに 1,000 万台規模のＡＩロボット" ("about 10 million AI robots in Japan by 2040"). [Cabinet Secretariat](https://www.cas.go.jp/jp/seisaku/ai_robo/dai3/shiryo1.pdf) The METI minister announced the revised strategy, covering 18 fields, on 2026-06-30. [METI](https://www.meti.go.jp/speeches/kaiken/2026/20260630001.html)
- **FY2026 budget:** ¥387.3 billion (3,873億円) for multimodal foundation models aimed at AI robots and physical AI. Total AI budget ¥502.7 billion (5,027億円, including fund top-ups). [Cabinet Office](https://www8.cao.go.jp/cstp/ai/yosan_8nendo.pdf)
- **NEDO foundation-model project:** awarded to Noetra and AIST; runs FY2026–2030. [METI](https://www.meti.go.jp/press/2026/06/20260630005/20260630005.html)
- **JC-STAR ★1 fee:** ¥198,000 list price (¥110,000 for applications until 2025-09-30); labels valid for up to 2 years. [METI](https://www.meti.go.jp/press/2024/03/20250325007/20250325007.html)

---

## 4. Best resources, ranked

| # | Title | Date | Type | Why it helps | Trust |
|---|---|---|---|---|---|
| 1 | [MHLW leaflet on collaborative-operation criteria](https://www.mhlw.go.jp/bunya/roudoukijun/dl/pamphlet_140115.pdf) | 2013-12 | ministry | Two pages covering both fence-free routes and what the technical file must contain. | High |
| 2 | [Notice 基発339 / 1224第2号, consolidated text](https://www.mhlw.go.jp/web/t_doc?dataId=00tb9779&dataType=1&pageNo=1) | 1983 / 2013 | ministry | Official definitions: motion range, operating, R&D exclusion. | High |
| 3 | [Industrial Safety and Health Ordinance, e-Gov](https://laws.e-gov.go.jp/law/347M50002000032) | in force 2026-10-01 | law | The binding text. | High |
| 4 | [MHLW interim summary on unmanned machines](https://www.mhlw.go.jp/stf/newpage_74141.html) | 2026-06-29 | ministry | Where AI-robot rules are heading. | High |
| 5 | [J-AISI AI Robotics Safety Evaluation Guide](https://aisi.go.jp/output/output_information/260723/) | 2026-07-23 | ministry | Japan's only government guide to AI-robot safety evaluation. | High |
| 6 | [AI Robotics Strategy](https://www.cas.go.jp/jp/seisaku/ai_robo/dai3/shiryo1.pdf) and [roadmap](https://www.cas.go.jp/jp/seisaku/ai_robo/dai4/shiryo1.pdf) | 2026-03 to 08 | ministry | Plans for certification, regulation review and JC-STAR extension. | High |
| 7 | [AI Guidelines for Business v1.2, with English tentative translation](https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/20260331_report.html) | 2026-03-31 | ministry | Physical-AI definition and risks. | High |
| 8 | [MHLW functional-safety guideline](https://www.mhlw.go.jp/web/t_doc?dataId=00010230&dataType=0&pageNo=1) and [Functional safety manual, robot systems volume](https://www.mhlw.go.jp/file/06-Seisakujouhou-11300000-Roudoukijunkyokuanzeneiseibu/0000197860.pdf) | 2016 / 2018 | ministry | How to set SIL/PL for robot safety functions. | High |
| 9 | [RRI Collaborative Robot Safety Explanatory Guide](https://www.jmfrri.gr.jp/wp-content/uploads/2024/12/wg2_anzen.pdf) | 2023-03 | assoc | Worked risk-assessment examples (palletizing, machine tending). Predates the 2025 standards. | Medium-High |
| 10 | [METI factory security guideline](https://www.meti.go.jp/policy/netsecurity/wg1/factorysystems_guideline.html) and [IPA control-system risk analysis guide](https://www.ipa.go.jp/security/controlsystem/riskanalysis.html) | 2025 / 2026 | ministry | Operational-technology (OT) security method. | High |
| 11 | [JARA list of robot JIS](https://www.jara.jp/various/standard/img/irsr-jis_241130.pdf) | 2024-11-30 | assoc | Map of robot JIS (verify current status in JISC). | Medium-High |

---

## 5. Communities

| Name | Activity evidence | Best use |
|---|---|---|
| [ROS Japan Users Group](https://rosjp.connpass.com/) [community] | 3,389 members; events #58 (2025-06-20) to #64 (2026-09-18). | Practical ROS 2 integration; meetups. |
| ROSCon JP [community] | 2026 edition: 2026-08-04/05, Tsukuba Capio ([post, 2026-02-13](https://discourse.openrobotics.org/t/roscon-jp-2026-in/52491)). 2025 edition: workshop on 2025-09-08 at Port Messe Nagoya ([post](https://discourse.openrobotics.org/t/roscon-jp-2025/42052)). | Annual ROS conference. |
| [Robotics Society of Japan](https://www.rsj.or.jp/) (日本ロボット学会) [assoc] | RSJ2026 conference 2026-09-01–04, Kanazawa University. Seminar #168 "Robot physics simulation" on 2026-10-23; #164 on leader-follower control with an open-source arm, 2025-12-15. | Research depth; data-collection methods for imitation learning. |
| [SICE SI division](https://sice-si.org/si2026/) (計測自動制御学会 SI部門) [assoc] | SI2026: 2026-12-08–10, Grand Cube Osaka. | System-integration research. |
| [JARA](https://www.jara.jp/) (日本ロボット工業会) [assoc] | Free online lecture "協働ロボットの利活用とフィジカルAI" ("Using collaborative robots and physical AI") on **2026-11-04**; apply by 10-28. Speaker is the chair of the METI AI Robotics council. [Flyer](https://www.jara.jp/news/2026/260907/info.pdf) | Industry and standards insight. |
| iREX (International Robot Exhibition) [assoc] | 2025-12-03–06: 673 exhibitors and 156,110 visitors, both records. [Report](https://admindx.nikkan.co.jp/datas/news/10000/news_1822476b96c9058986bc3bc71eb9aaf45a7f58452447260119160156.pdf) | Vendor landscape. |
| [J-AISI Robotics SWG](https://aisi.go.jp/activity/activity_information/261008_2/) [ministry] | Reported on 2026-10-07. Now validating the evaluation perspectives and running operational design domain (ODD) experiments. Members include AIST, JARA, RRI, Kawasaki, Epson, Mitsubishi Electric and Fujitsu. | Where AI-robot safety evaluation is being shaped; participation is through companies. |
| [RRI](https://www.jmfrri.gr.jp/) (ロボット革命・産業IoTイニシアティブ協議会) [assoc] | Has an AI-utilisation safety SWG that sits in the J-AISI Robotics SWG. Its RING regional network launched 2025-07 ([METI](https://www.meti.go.jp/policy/mono_info_service/mono/robot/index.html)). | Guidance documents; working groups. |
| [JARSIA](https://www.jarsia.jp/) (system-integrator association) [assoc] | "SIer's Day" events in 2026: 08-21, 09-11, 10-23. | Peer network for robot system integrators. |
| [AIRoA](https://airoa.org/ja/) (AI Robot Association) [assoc] | Updates as of 2026-09-30; workshops at IROS and CoRL 2026. Full membership costs ¥10M per year. | Robot foundation models and datasets. |
| [JISHA](https://www.jisha.or.jp/edu/course/list/8500_robot.html) (中央労働災害防止協会) [assoc] | 4-day course for instructors of the robot special education, plus [machine-safety courses](https://www.jisha.or.jp/seminar/machinery-list/). | Legal training competence. |
| [Safety Assessor exam](https://www.japan-certification.com/) [company] | Exam 2026-12-04; applications 2026-10-12 to 10-30. | Machine-safety credential. |
| [IPA ICSCoE](https://www.ipa.go.jp/jinzai/ics/index.html) [ministry] | One-year core program (July–June) and short programs for practitioners. | Industrial control-system (OT) security for your security background. |

---

## 6. Open questions and what I could not verify

1. **ISO 10218:2025 under the ISO route.** Route (b) names only the 2011 editions. I found no MHLW update and no date for a JIS revision. How labour inspectors treat compliance with the 2025 editions is **unverified**; ask your Labour Standards Inspection Office.
2. **ISO/TS 15066 status.** Its status at ISO is unverified because the ISO site was blocked. Japan withdrew TS B 0033.
3. **Does collecting VLA demonstration data count as "teaching"?** The 1983 notice excludes teaching done with the drive source cut off, such as direct hand-guided teaching. Whether hand-guiding with servos on, or teleoperation for VLA data collection, counts as 教示等 (and so needs special education) is **unverified**. Treat it as teaching until confirmed.
4. **MHLW robot working team.** No meetings after 2026-06 appear on the [study group page](https://www.mhlw.go.jp/stf/shingi/other-roudou_558547_00034.html). The design of the AI-robot safety certification scheme has not been published.
5. **Absences I could not prove.** I found no robot category in JC-STAR, no robot-specific cybersecurity guideline from JARA or RRI, no JIS equivalent of IEC 62443, and no robot guidance from NCO. The search quota ran out, so these are not proven absences.
6. **Not verified at all:** the main-day date of ROSCon JP 2025, SICE SI2025, the text of the 1983 technical guideline on industrial-robot use (産業用ロボットの使用等の安全基準に関する技術上の指針), METI's Cyber/Physical Security Framework (CPSF), and any ROS 2 security community in Japan.
