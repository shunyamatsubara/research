# Research brief: camera data, remote operation and the cloud (raw agent report, 2026-10-16)

Raw report from a research agent. Facts used in Lesson 5 were re-checked against the primary sources before use.

# Research brief: "Camera data, remote operation and the cloud" (status checked 2026-10-16)

**Method.** I read the primary texts directly: the PPC and MHLW PDFs, the e-Gov API, the EDPB and EU Publications Office (CELEX) texts, and NIST. I read two CISA PDFs from copies posted by co-authoring agencies (NCSC-NZ, IC3). "Inference" marks my own reasoning.

## 1. Key findings

### A. Japan: camera data

**A1. When camera images are personal information under the APPI**
- **Identifiable video is personal information.** The General Guidelines give as an example 「防犯カメラに記録された情報等本人が判別できる映像情報」 ("video from which the person can be identified, e.g. security-camera footage"). Source: [PPC General Guidelines, rev. June 2026, regulator guidance](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/).
- **Capturing identifiable images means handling personal information.** Q1-13: 「特定の個人を識別することができる画像を取得する場合、個人情報を取り扱うことになる」 ("acquiring images that identify individuals means handling personal information").
  - You must specify the purpose and notify or publish it.
  - Notice can be skipped only when the purpose is obvious from the setting (Art. 21(4)(iv)).
  - If people cannot easily tell they are being filmed, you must make it recognisable, for example with signs (Art. 20(1)).
  - Source: [PPC Q&A, last updated 2025-07-01, regulator guidance](https://www.ppc.go.jp/files/pdf/250701_APPI_QA.pdf).
- **Face recognition must be named in the purpose.** Q1-14: 「顔識別機能を用いていることも明らかにして、利用目的を特定しなければなりません」 ("the purpose must also state that face recognition is used"). The "obvious purpose" exception does not apply (same Q&A).
- **When video becomes "personal data".** Q1-41: video counts as a personal-information database only if it can be searched by person, not just by date or time. That matters because security (Art. 23), third-party (Art. 27) and cross-border (Art. 28) duties attach to 個人データ (personal data). Q10-8 still recommends security measures for footage that is not a database.
- **Extracted attributes and silhouettes** are not personal information unless they can easily be matched back to the source images (Q1-12).
- **Analysis or profiling.** The purpose must let people foresee the processing: 「本人が予測・想定できる程度に利用目的を特定しなければならない」 ("purposes must be specified so the person can foresee the processing"). Source: Guidelines 3-1-1, link above.
- **AI training**
  - Trained model parameters are generally not personal information (Q1-8).
  - A vendor acting as 委託先 (entrusted processor) may use your data to improve its own technology only 「委託元の利用目的の達成に必要な範囲内である限りにおいて」 ("only as far as needed for the client's purpose") (Q7-39).
  - Statistics the vendor derives from your data outside that scope 「自社のために用いることはできません」 ("cannot be used for itself") (Q7-38).
  - For generative-AI services, 「当該個人データを機械学習に利用しないこと等を十分に確認すること」 ("confirm the provider will not use the personal data for machine learning"). Source: [PPC caution, 2023-06-02, regulator guidance](https://www.ppc.go.jp/files/pdf/230602_kouhou_houdou.pdf). *Inference:* this covers sending camera frames to a cloud VLM API.
- **Status as of Oct 2026: the APPI has been amended (not yet in force).**
  - Enacted 2026-07-10, promulgated 2026-07-17. It takes effect 「公布の日から起算して２年を超えない範囲内」 ("within two years of promulgation"). Sources: [PPC amendment page, law/regulator](https://www.ppc.go.jp/personalinfo/legal/r8kaiseihogohou/); [overview](https://www.ppc.go.jp/files/pdf/260717_kaiseihounitsuite.pdf); [law text](https://www.ppc.go.jp/files/pdf/260717_houritsu.pdf).
  - **Statistics / AI development:** third-party provision without consent is allowed when data is used only for statistics, 「統計作成等であると整理できるAI開発等を含む」 ("including AI development that counts as statistics creation") (Arts. 30-2, 31-3).
  - **Face feature data:** new Art. 21-2 creates the category 特定生体個人情報 ("specified biometric personal information"). It makes 「一定の事項の周知を義務化」 ("notice of certain matters mandatory"), makes requests to stop use easier, and bans opt-out third-party provision.
  - **Processors** must not handle data 「委託を受けた業務の遂行に必要な範囲を超えて」 ("beyond what the entrusted work needs").
  - **Administrative surcharges** (課徴金) are introduced.
  - **Implementing rules are in drafting** (PPC papers dated 2026-09-16 to 10-14). The PPC proposes covering face feature data only, with signs 「カメラやセンサー等の機器の周辺に分かりやすく掲示」 ("posted clearly around cameras and sensors"). Source: [PPC paper ①, 2026-09-16](https://www.ppc.go.jp/files/pdf/260916_kihonntekinakanngaekatanitsuite_1.pdf).

**A2. PPC expert-panel report (March 2023)**
Sources: [report, regulator](https://www.ppc.go.jp/files/pdf/cameragazou_yushikisyakentoukai_houkokusyo.pdf); [companion PPC paper](https://www.ppc.go.jp/files/pdf/kaoshikibetsu_camera_system.pdf).
- **Scope:** face recognition in large public spaces. Workplace entry using face authentication with prior consent is mentioned as out of scope (footnote 5).
- **Points that carry over to factory cameras**
  - Cameras used for non-security purposes may not qualify for the "obvious purpose" exception: 「防犯以外の目的で利用されるカメラの普及によっては」 ("as cameras used for purposes other than security spread…") (footnote 56).
  - Extracting face features from ordinary footage later is use outside the stated purpose: 「事後的に顔特徴データを抽出し、他の情報と照合したり、分析することは、目的外利用に当たる」.
  - **Retention:** set periods (Art. 22). Face data of people who did not match is 「利用する必要がない」 ("not needed") and should be deleted without delay.
  - **Voluntary measures:** run a PIA at design time; do 「一定期間を設けて試験的実施」 ("a time-limited trial"); publish the operating rules; post signs naming the operator, purpose and contact, with a URL or QR code (also Q1-14); and have 「運用担当者以外の者による内部監査」 ("internal audit by people other than the operators").

**A3. Camera Image Utilization Guidebook (カメラ画像利活用ガイドブック) ver3.0**
- Issued by the IoT Acceleration Consortium, MIC and METI on 2022-03-30. METI's page, updated 2025-07-04, still lists ver3.0 as current; I found no newer version. Sources: [MIC PDF](https://www.soumu.go.jp/main_content/000803603.pdf); [METI page](https://www.meti.go.jp/policy/it_policy/privacy/privacy.html). Regulator guidance. It covers commercial use; security and identification uses are excluded.
- **Minimise** 「カメラ設置台数、撮影範囲、取得・生成するデータの種類、データの保存期間」 ("number of cameras, field of view, data types, retention"). Make filming obvious and provide a single point of contact.
- **Edge processing still counts:** 「エッジ側（又はクラウド側）で即座に破棄する場合であっても、個人情報の取得に当たる」 ("even immediate deletion at the edge or in the cloud is acquisition").
- **Disclose AI training use:** 「AI の再学習のために教師データとしてカメラ画像を利用している場合には、その旨を記載」 ("if images are used as training data for AI retraining, say so").
- **Overseas clouds and image APIs** may trigger Art. 28 (footnote 40). Map the data lifecycle and who is responsible at each step.
- **Employees (item ⑫):** check 「労使関係上、優越的地位を利用して強制をしていないか」 ("no coercion using the employer's position") and talk with staff representatives or unions.

**A4. Monitoring workers**
- **Q5-7 (current guidance):** 「モニタリングの目的をあらかじめ特定した上で、社内規程等に定め、従業者に明示すること」 ("specify the purpose in advance, put it in internal rules, tell staff"). Also name a responsible person, set rules in advance and audit compliance. Ideally 「あらかじめ労働組合等に通知し必要に応じて協議」 ("notify and consult the union beforehand"). Source: PPC Q&A.
- **Historical MHLW guideline (2000).** The page itself says it predates the APPI and points readers to current guidelines. It allowed constant video monitoring only 「労働者の健康及び安全の確保又は業務上の財産の保全に必要な場合に限り」 ("only where needed for worker health and safety or protection of business property"). It also ruled out decisions based solely on monitoring. Source: [MHLW, 2000-12-20](https://www.mhlw.go.jp/www2/kisya/daijin/20001220_01_d/20001220_01_d_shishin.html).

**A5. Cross-border transfer (Art. 28)**
- **The rule:** providing 個人データ to a third party in a foreign country requires prior consent, with information on that country's privacy regime. The exceptions are a designated country (EU and UK, Q12-2) or a recipient with a qualifying system (相当措置), which needs ongoing checks. Source: [APPI, e-Gov, law](https://laws.e-gov.go.jp/law/415AC0000000057).
- **Foreign clouds**
  - Not a "provision" if the provider does not handle the data, i.e. a contract plus 「適切にアクセス制御を行っている場合等」 ("proper access control") (Q12-3).
  - A foreign operator counts even if the server is in Japan: 「サーバが国内にある場合であっても、外国にある第三者への提供」 ("a provision to a foreign third party even if the server is in Japan") (Q12-4).
  - You must publish the countries involved (Q10-25).
- **Vendor maintenance** is provision or entrustment when the vendor handles personal data, for example 「個人データを用いて情報システムの不具合を再現させ検証する場合」 ("reproducing faults using personal data") (Q7-55). *Inference:* a foreign support engineer viewing or recording live robot-camera feeds probably falls on the "handles data" side.

### B. EU

**B6. EDPB Guidelines 3/2019 on video devices**
Adopted 2020-01-29 (v2.0); v2.1 issued 2020-02-26. Source: [EDPB, regulator guidance](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_201903_video_devices_en_0.pdf).
- The reasoning "can be applied to all potential areas of use" (para 6).
- **Purpose:** specify and document it for each camera. "Video surveillance based on the mere purpose of “safety” or “for your safety” is not sufficiently specific" (para 15).
- **Workers:** "an employee in his/her workplace is in most cases not likely expecting to be monitored by his or her employer" (para 37). Consent from employees is rarely valid (para 47).
- **Retention:** erase "after a few days"; beyond 72 hours needs more justification (para 121).
- **Transparency:** a warning sign plus a second layer of information (section 7).
- **By design:** use masking, and "Functions provided, but not necessary, must be deactivated." (para 129).
- **Related contrast with Japan:** the EDPB says AI models trained on personal data "cannot, in all cases, be considered anonymous" ([Opinion 28/2024, 2024-12-17](https://www.edpb.europa.eu/system/files/documents/2024-12/edpb_opinion_202428_ai-models_en.pdf)). Compare PPC Q1-8.

**B7. AI Act Art. 5: emotion recognition at work**
Source: [Reg. (EU) 2024/1689, law](http://data.europa.eu/eli/reg/2024/1689/oj).
- **Art. 5(1)(f), quoted in full as you asked:** "the placing on the market, the putting into service for this specific purpose, or the use of AI systems to infer emotions of a natural person in the areas of workplace and education institutions, except where the use of the AI system is intended to be put in place or into the market for medical or safety reasons".
- **Application date:** in force since 2025-02-02 (Art. 113(a)).
- **Digital Omnibus on AI, Reg. (EU) 2026/1744** (Official Journal 2026-07-24, in force 2026-07-27, [law](http://data.europa.eu/eli/reg/2026/1744/oj)):
  - Points (f) and (g) are unchanged.
  - It adds (ba)/(bb) on intimate imagery and child sexual abuse material, from 2026-12-02.
  - High-risk rules move to 2027-12-02 (Annex III) and 2028-08-02 (Annex I).
  - Machinery moves to Annex I Section B; AI safety requirements will arrive through Machinery Regulation delegated acts "by 2 August 2028".
- **Commission guidelines**, C(2025) 5052 final, 2025-07-29, non-binding ([PDF](https://ec.europa.eu/newsroom/dae/redirection/document/112367)):
  - "Workplace" is read broadly, "spanning from indoor office spaces, factories and warehouses".
  - The safety exception applies "only in relation to the protection of life and health".
  - Stress monitoring is prohibited "unless the elevated stress level/lack of concentration would pose a specific danger, for example when deploying dangerous machines". Even then, the data cannot be reused to assess work performance.
- **Fatigue and pain** are not "emotions" under the Act (Recital 18).
- **Art. 5(1)(g)** bans biometric categorisation that infers race, political opinions, trade-union membership, religion, or sex life/orientation.
- **Permitted systems** must inform the people exposed to them (Art. 50(3)). Emotion recognition and worker performance monitoring are high-risk under Annex III.

**B8. EU Data Act**
Source: [Reg. (EU) 2023/2854, law](http://data.europa.eu/eli/reg/2023/2854/oj).
- **Dates:** applies from 2025-09-12. "The obligation resulting from Article 3(1) shall apply to connected products and the services related to them placed on the market after 12 September 2026." (Art. 50). This now applies to new products.
- **Design obligation (Art. 3(1)):** data must be accessible to the user "by default, easily, securely, free of charge".
- **Pre-contract information (Art. 3(2)–(3)):** data types and volume, whether data is generated continuously, on-device or remote storage and how long it is kept, and collection frequency.
- **Vendor use of data:** "A data holder shall only use any readily available data that is non-personal data on the basis of a contract with the user." (Art. 4(13)). Personal data can be shared only with a GDPR legal basis (Art. 4(12)).
- **Factory robots are in scope.** Recital 14 lists "industrial machinery". The FAQ v1.4 (2026-01-22, which says it is not the Commission's official position) states "a manufacturing company can be both a ‘user’ of the robots used in its factory" (Q34). It also says machine-vision imagery "should fall in scope of Chapter II" (Q6). Source: [FAQ](https://ec.europa.eu/newsroom/dae/redirection/document/108144).
- *Inference:* a camera-equipped arm with a vendor cloud that "transmit[s] commands" is a connected product with a related service (Recital 17).
- **Pending change:** the data/GDPR Digital Omnibus (2025/0360(COD)) shows "Awaiting committee decision" ([EP Legislative Observatory](https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD))).

### C. Remote operation and teleoperation

**C9. What happens when the link drops**
- **MHLW interim summary, 2026-06-29** (expert panel; regulator). Sources: [page](https://www.mhlw.go.jp/stf/newpage_74141.html); [full text](https://www.mhlw.go.jp/content/11201250/001716203.pdf); [summary](https://www.mhlw.go.jp/content/11201250/001717896.pdf).
  - **自律運転 (autonomous operation):** 「通常運転時の運転制御主体が機械側にあるもの」 ("the machine is in control during normal operation"). The human role is limited to 「起動（再起動）、監視及び非常時の緊急停止」 ("starting/restarting, monitoring and emergency stop").
  - **遠隔運転 (remote operation):** 「通常運転時の運転制御主体が人にあるものであって、遠隔で運転操作を行うもの」 ("a human is in control and operates remotely"). Partial autonomy with immediate human takeover still counts as remote operation, with "operation-assist" functions.
  - **Mode switching** must happen 「人による明示的な操作など明確な条件と手順で切り替わる」 ("by clear conditions and procedures such as an explicit human action"), with the current mode displayed on the machine.
  - **One operator, one machine** for regulated machines: 「一人が同時に運転可能な機械は１台のみ」.
  - **Link loss:** the machine 「通信の異常（途絶、著しい遅延等）時に自動停止等する」 ("stops automatically on link loss or severe delay"). Remote operation is allowed 「運転に必要な品質の通信状態が維持されている場合のみ」 ("only while link quality is adequate").
  - **Next steps:** working teams per machine type, including robots with physical AI. Machines using 「フィジカルＡＩやＡＩロボティクス」 that no specific rule covers yet will be examined.
- **EU Machinery Regulation**, applying from 2027-01-20 after a corrigendum. Sources: [Commission page](https://single-market-economy.ec.europa.eu/sectors/mechanical-engineering/machinery_en); [law](http://data.europa.eu/eli/reg/2023/1230/oj).
  - "For wireless control, a failure of the communication or connection or a faulty connection shall not lead to a hazardous situation." (Annex III 1.2.1).
  - Interruption or re-establishment of the network link must not create hazards (1.2.6).
  - Remote controls must "respond only to signals from the intended control units" (3.3).
  - Protection against tampering ("corruption"), with evidence of interventions (1.1.9).
  - Systems with self-evolving behaviour must record safety-decision data and keep it for one year (1.2.1).
- **IEC 60204-1:2016, clause 9.2.4.** I read the clause text as reproduced in an IDEC seminar deck for the Japan Machinery Federation, 2016-11-10 (company document quoting the standard): [deck](https://www.jmf.or.jp/jmf/wp-content/uploads/2024/04/IEC-60204-1_2016.pdf).
  - After loss of control for a risk-assessed time, "an automatic stop of the machine shall be initiated".
  - "Restoration … shall not restart the machine."
  - Only one cableless station may be enabled at a time.
  - Related: [IEC 62745:2017, cableless control systems, standards body](https://webstore.iec.ch/publication/31998).
- **Agility Robotics**, 2026-06-22 (company blog; first-hand but promotional): with an external safety controller, "if there were communication issues with the robot it would fall". They fixed this with an onboard safety PLC and a "category 1 stop … if communication with the robot was lost", and still deploy robots inside fenced workcells. Source: [Agility](https://www.agilityrobotics.com/content/built-for-the-real-world).
- **NVIDIA Halos**, 2026-06-22 (company docs): in the Outside-In Safety Blueprint, a monitor watches for "connectivity drops" and falls back to the robot's onboard safety functions; a decision component sends "safe stop signals". Source: [NVIDIA developer blog](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/). **"Remote Safe Stop" is unverified.** It does not appear in the press release, product page, developer blog or the Feb-2026 IGX safety brief.

**C10. Securing remote access to OT**
- **CISA with DoW, DOE, FBI and State, 2026-04-29** ([CISA, government guidance](https://www.cisa.gov/resources-tools/resources/adapting-zero-trust-principles-operational-technology)):
  - "The authoring agencies strongly recommend a jump host for adding user authentication to legacy networks and enforcing segmentation."
  - "Log all privileged sessions for audit and forensic purposes", with logs pushed out of OT "without bi-directional control".
  - Just-in-time (JIT) access "to narrowly specified maintenance and support windows".
  - MFA for all remote privileged access, plus privileged access management (PAM) and break-glass accounts.
- **NCSC UK, 2026-01-14** (government guidance):
  - "All connections with the OT environment should be initiated as outbound connections from within the OT environment"; vendor support goes through a brokered gateway in a DMZ; use JIT access ([Principle 2](https://www.ncsc.gov.uk/collection/operational-technology/secure-connectivity/principle-2)).
  - Host firewalls should "default to a ‘deny all’ posture" ([Principle 6](https://www.ncsc.gov.uk/collection/operational-technology/secure-connectivity/principle-6)).
  - Log all connectivity; break-glass access must never be the standard remote-access method ([Principle 7](https://www.ncsc.gov.uk/collection/operational-technology/secure-connectivity/principle-7)).
- **NIST SP 800-82r3, Sept 2023** (standards body, [PDF](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf)):
  - "Remote access should not circumvent or negate safety or security controls."
  - Initiate connections from the OT side.
  - Ensure "operations personnel are aware of planned remote activity".
- **CISA, 2025-05-06:** remove OT from the public internet; use a private IP connection or VPN with phishing-resistant MFA; apply least privilege ([CISA](https://www.cisa.gov/resources-tools/resources/primary-mitigations-reduce-cyber-threats-operational-technology)).
- **CISA et al. remote-access software guide, 2023-06-06:** keep an inventory and allowlist of remote-access tools; "Block both inbound and outbound connections on common RMM ports"; require contracts that give you visibility of the provider's sessions ([CISA](https://www.cisa.gov/resources-tools/resources/guide-securing-remote-access-software)).
- **METI Factory Systems Guideline Ver1.1, 2025-04-11** (regulator guidance), checklist item 3-6: 「認証（２要素認証等）やリモートユーザ毎の接続対象機器…の制限、接続可能時間の制限」 ("two-factor authentication, per-user device limits, time-window limits"), plus detection of connections outside maintenance windows ([PDF](https://www.meti.go.jp/policy/netsecurity/wg1/factorysystems_guideline_ver1.1.pdf)).
- **IEC 62443:** the MHLW hearings cite it for communications security. I did not verify the exact 62443-3-3 requirement text (paywalled).

**C11. Teleoperation for collecting demonstrations**
- **Japanese industrial-robot rules.** 教示等 ("teaching") is defined as work within the robot's movable range on 「マニプレータの動作の順序、位置若しくは速度の設定、変更若しくは確認」 ("setting, changing or checking the manipulator's motion order, position or speed") (安衛則 Art. 36(31)). It requires special education.
  - Art. 150-3 requires 「異常時に直ちに産業用ロボットの運転を停止することができるようにするための措置」 ("measures to stop the robot immediately in an abnormal situation").
  - Robots 「研究開発中のもの」 ("under research and development") are excluded from the definition of industrial robot. Source: [e-Gov, law](https://laws.e-gov.go.jp/law/347M50002000032).
  - **Whether demonstration teleoperation or hand-guiding counts as 教示等 is unverified.** I found no official interpretation.
  - *Inference:* hand-guiding inside the range fits the wording. Remote teleoperation fits it less clearly and maps onto MHLW's new 遠隔運転 category.
- **Operator privacy**
  - Teleoperator video is personal information (see A1). If operators are employees, the Q5-7 monitoring rules apply. Face feature data will fall under the new 特定生体個人情報 regime once in force.
  - Motion data identifies people: VR users were identified "with 94.33% accuracy from 100 seconds of motion" (N=55,541). Source: [Nair et al., USENIX Security 2023, peer-reviewed](https://www.usenix.org/conference/usenixsecurity23/presentation/nair-identification). *Inference:* VR-based teleoperation rigs carry the same risk.
  - In the EU, inferring a teleoperator's emotions would fall under Art. 5(1)(f).

### D. Cloud and telemetry

**D12. Robot telemetry to vendor clouds**
- **Unitree G1 analysis** ([arXiv 2509.14139, v3 2025-09-23](https://arxiv.org/abs/2509.14139)). Preprint, not peer-reviewed; the lead author works for a security vendor (Alias Robotics).
  - The robot sends MQTT state reports "every 300 seconds without operator notice": battery, IMU, joint torque and temperature, service and resource data.
  - Audio, video and LiDAR flow on local DDS topics. On whether these are exfiltrated to the cloud, the authors write: "our limited telemetry inspection didn’t allow us to confirm this".
  - The GDPR-violation claims are the authors' own view, not a regulator finding.
- **Good practice from law and regulators**
  - **Cyber Resilience Act** ([Reg. (EU) 2024/2847, law](http://data.europa.eu/eli/reg/2024/2847/oj)): "process only data … limited to what is necessary in relation to the intended purpose" (Annex I Part I(2)(g)). Also: limit attack surfaces, keep logs with a user opt-out, and allow secure deletion. Main obligations apply from 2027-12-11; vulnerability and incident reporting has applied since 2026-09-11. Machinery is not among the excluded product types.
  - Switch off unneeded functions (EDPB para 129).
  - Edge processing is still "acquisition" (Guidebook).
  - Disclose remote storage and collection frequency before contract (Data Act Art. 3).
  - Outbound-only connections, deny-all host filters, brokered vendor access (NCSC Principles 2, 5, 6).

**D13. CISA et al. "Principles for the Secure Integration of AI in OT" (2025-12-03)**
Sources: [CISA page](https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology); [PDF via NCSC-NZ](https://www.ncsc.govt.nz/assets/guidance/Documents/Principles-for-the-Secure-Integration-of-Artificial-Intelligence-in-Operational-Technology.pdf). Government guidance from CISA, ASD's ACSC, NSA, FBI and the Canadian, German, Dutch, NZ and UK agencies.
- "Encourage push-based architectures where data is pushed out of the OT network for AI systems to use without persistent access into the OT network."
- Use brokered or one-way transfers with audited staging buffers.
- **Vendors:**
  - "Operators may not want vendors to train AI on operational data as it could include IP or be sensitive."
  - "Ask if vendors can operate on premises or without continuous access to the internet/vendor cloud."
  - The operator should control when AI features are disabled. Know about any "remote, cloud, or offshore access". Require an SBOM.
- **Safety:** fail-safe fallback to traditional automation or manual operation; limit AI control without a human in the loop; route new remote paths through the existing DMZ and jump hosts.

## 2. Concepts and terms

| Term | Japanese | Plain definition | Source |
|---|---|---|---|
| Personal information | 個人情報 | Information that identifies a living person, including identifiable video | [PPC GL](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/) |
| Personal data | 個人データ | Personal information in a person-searchable database; triggers security, third-party and cross-border duties | [Q1-41](https://www.ppc.go.jp/files/pdf/250701_APPI_QA.pdf) |
| Face feature data | 顔特徴データ | Face geometry converted into a code that can identify a specific person | [Panel report ch. 2](https://www.ppc.go.jp/files/pdf/cameragazou_yushikisyakentoukai_houkokusyo.pdf) |
| Specified biometric personal information | 特定生体個人情報 | New category (not yet in force) for biometrics that can be collected cheaply without the person noticing | [Law text](https://www.ppc.go.jp/files/pdf/260717_houritsu.pdf) |
| Entrustment | 委託 | A vendor processes data only for your purposes, not its own | [Q7-38](https://www.ppc.go.jp/files/pdf/250701_APPI_QA.pdf) |
| Foreign third party | 外国にある第三者 | Overseas recipient; needs consent, an equivalence designation or a qualifying system | [APPI Art. 28](https://laws.e-gov.go.jp/law/415AC0000000057) |
| Monitoring | モニタリング | Video or online surveillance of staff | [Q5-7](https://www.ppc.go.jp/files/pdf/250701_APPI_QA.pdf) |
| Teaching | 教示等 | Setting, changing or checking robot motion within its movable range | [安衛則 36(31)](https://laws.e-gov.go.jp/law/347M50002000032) |
| Autonomous / remote operation | 自律運転／遠隔運転 | Machine in control vs. human controlling remotely | [MHLW](https://www.mhlw.go.jp/content/11201250/001716203.pdf) |
| Restricted-entry zone / mixed space | 立入等管理区画／人と機械の混在 | Area where entry is controlled vs. shared human-machine space | [MHLW summary](https://www.mhlw.go.jp/content/11201250/001717896.pdf) |
| Emotion recognition system | — | AI that identifies or infers emotions or intentions from biometric data (AI Act Art. 3(39)) | [AI Act](http://data.europa.eu/eli/reg/2024/1689/oj) |
| Connected product / data holder | — | Device that collects and communicates data / party able to make that data available | [Data Act Art. 2](http://data.europa.eu/eli/reg/2023/2854/oj) |
| Cableless control system | 無線操作 | Radio or infrared link between an operator station and a machine | [IEC 62745](https://webstore.iec.ch/publication/31998) |
| Push-based / brokered architecture | — | OT pushes data out; outsiders connect through an intermediary; no standing inbound access | [CISA AI-OT](https://www.ncsc.govt.nz/assets/guidance/Documents/Principles-for-the-Secure-Integration-of-Artificial-Intelligence-in-Operational-Technology.pdf), [NCSC P2](https://www.ncsc.gov.uk/collection/operational-technology/secure-connectivity/principle-2) |
| Jump host / JIT / break-glass | 踏み台 | Hardened single entry point; time-limited access; emergency bypass that raises an alarm | [CISA ZT-OT](https://www.cisa.gov/resources-tools/resources/adapting-zero-trust-principles-operational-technology) |
| Data minimisation | データ最小化 | Process only the data the purpose needs | [CRA Annex I](http://data.europa.eu/eli/reg/2024/2847/oj) |

## 3. What extends existing practice vs. what is new for physical AI

**Extensions of existing practice (sourced)**
- CCTV rules on notice, purpose, retention and security apply directly (PPC Q&A, EDPB 3/2019).
- Vendor remote support is classic OT remote access: jump hosts, MFA, JIT, logging (CISA, NCSC, NIST, METI).
- Cloud processing fits the existing APPI cloud, entrustment and Art. 28 Q&As.
- Stop-on-link-loss is an old cableless-control requirement (IEC 60204-1:2016; IEC 62745:2017; Machinery Regulation 1.2.1).

**What is new (inference, with supporting sources)**
1. **The camera's purpose is perception and training data, not security.** The "obvious purpose" exception probably no longer applies, so AI training must be stated explicitly (panel footnote 56; Guidebook footnote 45).
2. **The same frames can feed a VLM** that infers emotions or attributes. The AI Act prohibition is triggered by what the model does, not by the camera (Commission guidelines name factories).
3. **Fleet-learning pressure.** Vendors want customer video to improve their models. This collides with the limits on processors (Q7-38/39), the Data Act's contract requirement (Art. 4(13)), CISA's advice on data-usage policies, and the 2026 APPI processor duty.
4. **Teleoperation turns workers into data sources** (video, motion biometrics; Nair et al.). It also turns the operator into a "remote driver" who must follow mode-switch and one-machine rules (MHLW).
5. **Safety now depends on the network and on cameras.** Agility's external controller made the robot fall on link loss; NVIDIA's outside-in safety relies on facility cameras, which also film workers.
6. **Logging duties pull against minimisation.** The Machinery Regulation requires one-year safety-decision logs; the CRA and EDPB push data minimisation. Logs may contain images, so retention has to be managed deliberately.
7. **New leverage for the factory.** The Data Act gives the factory a right to the robot's data for products placed on the EU market after 2026-09-12.

## 4. Best resources (ranked)

| # | Resource | Date | Type | Why | Trust |
|---|---|---|---|---|---|
| 1 | [PPC APPI Q&A](https://www.ppc.go.jp/files/pdf/250701_APPI_QA.pdf) | 2025-07-01 | Regulator | Camera, cloud, monitoring and vendor rules in one place | High |
| 2 | [PPC 2026 amendment page](https://www.ppc.go.jp/personalinfo/legal/r8kaiseihogohou/) | 2026-07-17 → | Law / regulator | Coming face-data, AI and processor rules | High |
| 3 | [MHLW interim summary](https://www.mhlw.go.jp/content/11201250/001716203.pdf) | 2026-06-29 | Regulator | Autonomous vs. remote definitions; link-loss rules | High |
| 4 | [CISA et al. AI in OT](https://www.ncsc.govt.nz/assets/guidance/Documents/Principles-for-the-Secure-Integration-of-Artificial-Intelligence-in-Operational-Technology.pdf) | 2025-12-03 | Government | Push-based design, vendor data use | High |
| 5 | [NCSC secure connectivity principles](https://www.ncsc.gov.uk/collection/operational-technology/secure-connectivity) | 2026-01-14 | Government | Outbound-only, brokered vendor access | High |
| 6 | [CISA zero trust for OT](https://www.cisa.gov/resources-tools/resources/adapting-zero-trust-principles-operational-technology) | 2026-04-29 | Government | Jump hosts, session recording, JIT | High |
| 7 | [EDPB Guidelines 3/2019](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_201903_video_devices_en_0.pdf) | 2020-01-29 | Regulator | EU video baseline | High |
| 8 | [Commission guidelines on prohibited AI practices](https://ec.europa.eu/newsroom/dae/redirection/document/112367) | 2025-07-29 | Regulator (non-binding) | Factory emotion-recognition cases | High |
| 9 | [Data Act](http://data.europa.eu/eli/reg/2023/2854/oj) + [FAQ v1.4](https://ec.europa.eu/newsroom/dae/redirection/document/108144) | 2023 / 2026-01-22 | Law / regulator | Robot data rights | High / Medium (FAQ) |
| 10 | [Machinery Regulation](http://data.europa.eu/eli/reg/2023/1230/oj) | 2023 (applies 2027-01-20) | Law | Wireless, tampering, logging requirements | High |
| 11 | [Camera Guidebook ver3.0](https://www.soumu.go.jp/main_content/000803603.pdf) | 2022-03-30 | Regulator | Practical camera checklist | High (dated) |
| 12 | [METI factory guideline v1.1](https://www.meti.go.jp/policy/netsecurity/wg1/factorysystems_guideline_ver1.1.pdf) | 2025-04-11 | Regulator | Japanese remote-maintenance controls | High |
| 13 | [Unitree G1 preprint](https://arxiv.org/abs/2509.14139) | 2025-09 | Preprint | Concrete telemetry case | Medium-low |

## 5. Open questions and unverified items
- **Teaching:** no official ruling found on whether demonstration teleoperation or hand-guiding counts as 教示等.
- **NVIDIA "Remote Safe Stop":** not found in official NVIDIA sources.
- **Paywalled standards:** clause texts of ISO 10218-1/-2:2025 (enabling devices, wireless pendants) and IEC 62443-3-3 SR 1.13. I read IEC 60204-1 only as reproduced in IDEC's deck.
- **2026 APPI amendment:** effective date not yet set (by July 2028 at the latest); the scope of 特定生体個人情報 and the notice method are still in drafting.
- **EU items still pending:** the Machinery Regulation AI delegated acts (due by 2028-08-02) and the data/GDPR omnibus.
- **Data Act and camera feeds:** whether VLA-cell camera footage is "product data" rests only on the non-authoritative FAQ.
- **Unitree:** exfiltration of audio/video to the cloud was not confirmed, and the paper is not peer-reviewed.
- **Camera Guidebook:** no version newer than 3.0 found; I checked by search and METI's page, not exhaustively.

