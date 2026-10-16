# Research brief: data, models and know-how (raw agent report, 2026-10-16)

Raw report from a research agent. Facts used in Lesson 4 were re-checked against the primary sources before use.

# Research brief: Protect data, models and know-how, and manage AI and OSS components (physical AI)

I checked every source on 2026-10-16. Source tags: [law] law, [gov] government guidance, [std] standards body, [peer-rev] peer-reviewed, [preprint], [project] official project docs, [press] press.

## 1. Key findings

### A. Japan: legal protection of know-how and data

- **Trade secrets, UCPA Art. 2(6)** [law]. Three requirements: 秘密管理性 (kept secret), 有用性 (useful) and 非公知性 (not public). The text says the information must be 「秘密として管理されている」 and 「事業活動に有用な技術上又は営業上の情報であって、公然と知られていないもの」 ("useful technical or business information… not publicly known"). Current text: https://laws.e-gov.go.jp/law/405AC0000000047.
- **限定提供データ (shared data with limited access), Art. 2(7)** [law]. Text: 「相当量蓄積され、及び管理されている技術上又は営業上の情報（営業秘密を除く。）」 ("accumulated in substantial quantity and managed… excluding trade secrets"). METI names three requirements: 限定提供性, 相当蓄積性 and 電磁的管理性.
  - The 2023 amendment (令和5年法律第51号) took effect on **2024-04-01**. It protects shared data 「秘密管理している場合も含め」 ("even when it is managed as secret"); https://www.meti.go.jp/policy/economy/chizai/chiteki/kaisei_recent.html.
  - The e-Gov history also shows two 2025 acts (令和7年法律第26号 and 第39号). One is a defence agreement act and the other is about criminal procedure. Neither changes these definitions.
- **営業秘密管理指針 (Trade Secret Management Guidelines), last revised 2025-03-31** [gov]; https://www.meti.go.jp/policy/economy/chizai/chiteki/guideline/r7ts.pdf (English translation June 2026).
  - It sets the 「最低限の水準の対策」 (minimum level of measures). The owner's 「秘密管理意思が秘密管理措置によって従業員等に対して明確に示され」 ("intent to keep it secret must be clearly shown to employees through management measures"; pp.8–9).
  - Electronic data: マル秘 in file or folder names, passwords, and access-controlled cloud storage are accepted (p.14).
  - Machinery that embodies secrets: entry restrictions, no-photography signs, and a list of secret items (p.15).
  - Tacit skills: for 「無形のノウハウ」 (intangible know-how), 「その内容を紙その他の媒体に可視化することが必要」 ("its content must be made visible on paper or another medium"), for example as category lists (p.16).
  - **New in 2025, on AI:** secret data used to train a model inside the same management unit does not lose 秘密管理性 just because it later appears in outputs (p.18, note 2; fn 23). However, if the data is given to a 「第三者…に提供される場合は、秘密管理性が否定される場合もあり得る」 ("third party, e.g. a generative-AI provider, secrecy may be denied"; fn 24).
  - A training dataset built from public information can still be non-public if assembling it is costly (fn 33). Reverse engineering destroys non-publicity only if it is easy (p.23).
- **秘密情報の保護ハンドブック (Handbook for Protecting Confidential Information), revised Feb 2024** [gov]; https://www.meti.go.jp/policy/economy/chizai/chiteki/pdf/handbook/full.pdf. It covers measures beyond the legal minimum, grouped into five aims (pp.22–23):
  - 接近の制御 (control access)
  - 持出し困難化 (make removal difficult)
  - 視認性の確保 (make leaks easy to spot)
  - 秘密情報に対する認識向上 (raise awareness of what is secret)
  - 信頼関係の維持・向上 (maintain trust)

  It warns of leaks 「データ学習時や外部の生成ＡＩへの情報の不用意な入力を通じて」 ("through training-data use or careless input into external generative AI").
- **限定提供データに関する指針 (Guidelines on Shared Data with Limited Access), Feb 2024** [gov]; https://www.meti.go.jp/policy/economy/chizai/chiteki/guideline/h31pd.pdf.
  - Training datasets and 学習済みモデル (trained models) are listed as protectable technical information (p.14).
  - Building a training set from acquired data counts as "use" (pp.20–21).
  - **But** where a trained model is 「もはや元の限定提供データとは異なるものと評価される場合には…不正競争には該当しない」 ("judged no longer the same as the original data… it is not unfair competition"; pp.21–22).
  - Electronic access control can be met with ID and password, several authentication factors, or encryption plus authentication (pp.12–13).
- **AI・データの利用に関する契約ガイドライン (Contract Guidelines on AI and Data)** [gov]. The AI part dates from June 2018 (https://www.meti.go.jp/policy/mono_info_service/connected_industries/sharing_and_utilization/20180615001-3.pdf). Version 1.1 (Dec 2019) revised only the data part.
  - 「データは、無体物（情報）であるため、所有権の対象とはなり得ない」 ("data is intangible information, so it cannot be owned"; p.25). Parties should negotiate 利用条件 (conditions of use) instead: purpose, period, whether copying, modification or reverse engineering is allowed, provision to third parties, and profit sharing (pp.29–30).
  - Definitions: 生データ (raw data), 学習用データセット (training dataset), and 学習済みモデル (trained parameters plus an inference program). 派生 (derived) models are 再利用モデル (made by additional training) and 蒸留モデル (made by distillation) (pp.14–16).
  - It names robots specifically: the robot's hardware characteristics 「が大きく影響…ユーザがノウハウを有している」 ("strongly affect the data… the user may hold the know-how"; p.16).
  - Fn 48: banning use of a model does not by itself ban fine-tuning or distillation. To restrict 再利用モデルや蒸留モデル, 「その旨を契約書に明記」 ("state it explicitly in the contract"; p.53).
  - The model contract forbids reverse engineering, making 再利用モデル, and training on the model's inputs and outputs (p.119). Designating datasets and models as 秘密情報 helps satisfy 秘密管理性 (p.113).
- **AIの利用・開発に関する契約チェックリスト (AI Contract Checklist), Feb 2025** [gov]; https://www.meti.go.jp/policy/mono_info_service/connected_industries/sharing_and_utilization/20250218003-ar.pdf.
  - Clause map: input (A), output (B), and インプット処理成果 (A‑6, outputs the vendor creates from your input), which covers 学習用データ, 中間生成物 and 派生的知的財産 (training data, intermediate artefacts, derived IP).
  - 「一度AIモデル（学習済みモデル）に取り込まれた情報の除去は一般的には困難」 ("once information is absorbed into a trained model, removing it is generally difficult"; §4.2.1).
  - Also covers foreground vs background IP (§4.3.2), audit clauses and log retention (§4.5).
  - METI is collecting cases until **2026-10-30** for possible guideline revision; https://www.meti.go.jp/policy/mono_info_service/connected_industries/sharing_and_utilization.html.
- **AI事業者ガイドライン (AI Guidelines for Business) v1.2, 2026-03-31** [gov]; https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/20260331_report.html (English: …/pdf/20260331_12.pdf and _14.pdf).
  - New definition of Physical AI (main text p.11).
  - Physical AI and similar systems: "expands the attack surface, raising concerns that the risks of data poisoning… may further increase" (Appendix 1, p.18).
  - Data lineage and provenance (D‑2, p.95).
  - SBOM, plus **AIBOM, which is new in v1.2**: 「AI システムの構成管理を容易にする AIBOM を作成」 ("create an AIBOM to ease configuration management of AI systems"; D‑5 i, pp.105–106). My text search of the v1.1 appendix found no AIBOM.
  - "Establish a robust insider threat detection program for content that falls under… intellectual property and trade secrets" (p.106).
  - Provider risks listed: "Risk of easy reproduction by AI model" and "Risk of reverse engineering the data used for learning from AI model", with countermeasures for model extraction (P‑5 ii, pp.146–147).
  - Physical AI devices: delete stored data when hardware is disposed of (fn 120).
- **MIC AI security technical guideline, March 2026 (published 2026-03-27)** [gov]; https://www.soumu.go.jp/main_content/001064122.pdf.
  - Scope is LLMs; AI agents are excluded.
  - Covers data poisoning, insertion of tampered models, and model extraction.
  - Mitigations: check training-data and base-model reliability, do not expose token probabilities, use rate limits.
  - Well-managed systems 「秘密管理性要件を満たし、不正競争防止法による保護を受けられるものと考えられ」 ("are considered to meet the secrecy requirement and be protected under the UCPA"; §3.1).
- **J-AISI (Japan AI Safety Institute)** [gov].
  - AIロボティクスに関するセーフティ評価観点ガイド (AI Robotics Safety Evaluation Guide) v1.0, 2026-07-23; https://aisi.go.jp/assets/pdf/20260723_robotics_ai_safety_eval_v1.0_ja.pdf. Requires 「ソフトウェア／モデル／設定内容のバージョンや更新履歴が管理されている」 ("software, model and settings versions and update history are managed"), plus log tamper detection (§4.1.7). **It does not cover VLA yet**: 「次版以降、…VLA…やロボット基盤モデル等…を検討対象とする」 ("VLA and robot foundation models will be covered from the next edition"; §1.3.1).
  - Data Quality Management Guidebook v1.02, 2026-05-14 (English is the official edition): "implement data version control, monitor distributions, retrain or refine models as needed"; access control prevents poisoning; https://aisi.go.jp/output/output_framework/data_quality_management_guidebook/.

### B. International guidance on protecting AI data and models

- **CISA, NSA, FBI and AU/NZ/UK agencies, "AI Data Security" CSI v1.0, 2025-05-22** [gov]; https://media.defense.gov/2025/May/22/2003720601/-1/-1/0/CSI_AI_DATA_SECURITY.PDF.
  - Ten practices (pp.6–8): reliable sources and provenance; hashes; digital signatures; trusted infrastructure; classification and access control; encryption; FIPS 140‑3 storage; privacy-preserving techniques; secure deletion; ongoing risk assessment.
  - "Incorporate a secure provenance database that is cryptographically signed and maintains an immutable, append-only ledger of data changes" (p.6).
  - "any subsequent data revisions should be signed by the person who made the change" (p.6).
  - "the output of AI systems should be classified at the same level as the input data" (p.7).
  - Require assurances or certification for foundation models (p.10).
  - "If the changes are slow and gradual over time, it is more likely that the model is experiencing data drift" (p.18).
- **NIST AI 100-2 E2025, March 2025 (corrected PDF 2025-04-01)** [gov]; https://csrc.nist.gov/pubs/ai/100/2/e2025/final. I found no newer edition.
  - Taxonomy IDs: Data Poisoning NISTAML.013; Model Poisoning .026 and .051 (supply chain); Model Extraction .031; Reconstruction .032; Membership Inference .033; Data Extraction .038.
  - "a functionally equivalent model can be reconstructed that is different than the original model but achieves similar performance" (p.31).
  - "DP does not provide guarantees against model extraction attacks" (DP = differential privacy; p.32).
  - Query limits and detection "can be circumvented by motivated and well-resourced attackers" (p.33).
- **OWASP Top 10 for LLM Applications** [project].
  - **2025 edition** (released 2024-11-18): **LLM02:2025 Sensitive Information Disclosure**, **LLM03:2025 Supply Chain**, **LLM04:2025 Data and Model Poisoning**; https://genai.owasp.org/llm-top-10/. Model theft is under LLM10:2025 Unbounded Consumption ("Model Extraction via API"). LLM03 says: "AI BOMs and ML SBOMs are an emerging area and you should evaluate options starting with OWASP CycloneDX."
  - **A newer 2026 edition exists** (resource dated 2026-08-03, announced 2026-09-01); https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/. It has LLM02:2026 Sensitive Information Disclosure, LLM04:2026 Supply Chain, LLM05:2026 Data and Model Poisoning, and LLM06:2026 Unbounded Consumption (which includes "Model Extraction and Distillation Theft"). It warns: "Signing proves integrity and origin, not safety."
- **MITRE ATLAS, content release 2026.09 (2026-09-15)** [project]; https://github.com/mitre-atlas/atlas-data. Technique IDs:
  - Theft and exfiltration: AML.T0024 Exfiltration via AI Inference API, with .000 Infer Training Data Membership, .001 Invert AI Model and .002 Extract AI Model; AML.T0025 Exfiltration via Cyber Means; AML.T0035 AI Artifact Collection; AML.T0005.001 Train Proxy via Replication; AML.T0048.004 AI Intellectual Property Theft.
  - Poisoning: **AML.T0020 Training Data Poisoning** (renamed from the older "Poison Training Data"); AML.T0018.000 Poison AI Model; AML.T0010 AI Supply Chain Compromise (.002 Data, .003 Model); AML.T0011.000 Unsafe AI Artifacts; AML.T0041 Physical Environment Access ("the adversary can influence the model through access to wherever the data is being collected").
- **Research on robots specifically (question 8).** I found no study measuring leakage of *industrial process know-how* from teleoperation demonstrations. The closest work:
  - Chen et al., ASIA CCS 2021 [peer-rev] (https://arxiv.org/abs/2006.05032): "the process of DRL model extraction is equivalent to imitation learning" (DRL = deep reinforcement learning).
  - Zhuang, Nicolae and Fritz, ICML 2024 [peer-rev] (https://arxiv.org/abs/2405.07004): control policies "represent valuable intellectual property"; steals policies from black-box access, and proposes a countermeasure.
  - Pan et al., AAMAS 2019 [peer-rev] (https://arxiv.org/abs/1904.11082): infers floor plans and robot configuration from trained policies.
  - Christie, Parekh and Losey, 2025 [preprint] (https://arxiv.org/abs/2509.18311): "Other agents can simply roll-out the fine-tuned policy and see these personally-trained behaviors."
  - Peng et al., 2026-05 [preprint] (https://arxiv.org/abs/2605.07088): membership inference at the level of whole VLA demonstration trajectories; "black-box attacks based only on generated actions achieve strong performance."
  - Tang et al., ARES 2025 [peer-rev] (https://arxiv.org/abs/2312.06802): encrypted cobot traffic reveals which pick-and-place-type action is running.
  - Poisoning of VLA models: BadVLA, NeurIPS 2025 [peer-rev] (https://arxiv.org/abs/2505.16640); GoBA, 2025 [preprint] (https://arxiv.org/abs/2510.09269), where "attackers can manipulate VLAs by simply injecting physical objects as triggers into the training dataset".
  - Ownership watermarks for VLA (all preprints, 2026): https://arxiv.org/abs/2605.09005 and https://arxiv.org/abs/2606.23574.

### C. Configuration management of models, datasets and OSS

- **CycloneDX** [std].
  - ML-BOM was introduced in **v1.5 (2023-06-26)**; https://cyclonedx.org/news/cyclonedx-v1.5-released/.
  - The current version is 1.7 (2025-10-21); ECMA-424 was published 2025-12-10; https://cyclonedx.org/specification/overview/.
  - The schema has component types `machine-learning-model` and `data`. A `modelCard` holds modelParameters (approach, task, architecture, datasets, inputs/outputs), quantitativeAnalysis and considerations. Data entries carry classification, sensitiveData and governance (owners, stewards, custodians).
- **SPDX 3.0 (2024-04-16)** [std]; https://spdx.github.io/spdx-spec/v3.0.1/model/AI/Classes/AIPackage/.
  - The AI profile (AIPackage) records autonomyType, hyperparameter, informationAboutTraining, metric, safetyRiskAssessment and more.
  - The Dataset profile (DatasetPackage) records confidentialityLevel, dataCollectionProcess, datasetUpdateMechanism, **sensor** and more.
- **Model signing and serialization** [project].
  - model-signing v1.0.0 released 2025-04-04; latest is 1.1.1 (2025-10-10); https://pypi.org/project/model-signing/. Release blog, "making ML models tamper resistant via transparent signatures": https://blog.sigstore.dev/model-transparency-v1.0/.
  - The OpenSSF Model Signing (OMS) spec (blog 2025-06-25) can sign a hashed manifest covering weights, configuration, tokenizers and datasets; https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/.
  - Hugging Face on pickle: "There are dangerous arbitrary code execution attacks that can be perpetrated when you load a pickle file" (https://huggingface.co/docs/hub/security-pickle). Safetensors stores "tensors safely (as opposed to pickle)"; https://huggingface.co/docs/safetensors/index.
  - LeRobot docs: "By default, the dataset is pushed to your Hugging Face page after recording" (https://huggingface.co/docs/lerobot/il_robots). Hugging Face repositories are public by default "unless the organization's default is private" (https://huggingface.co/docs/huggingface_hub/package_reference/hf_api).
- **EU Cyber Resilience Act, Regulation (EU) 2024/2847** [law]; http://data.europa.eu/eli/reg/2024/2847/oj.
  - Annex I Part II(1), exact wording: "identify and document vulnerabilities and components contained in products with digital elements, including by drawing up a software bill of materials in a commonly used and machine-readable format covering at the very least the top-level dependencies of the products;"
  - Art. 3(39) defines the SBOM as covering "components included in the software elements". Art. 3 defines ‘software’ as "computer code".
  - Neither the Regulation, the Commission guidance C(2026) 5252 (2026-07-27), nor the FAQ (2025-12-03) addresses whether AI models belong in the SBOM.
  - Dates: in force 2024-12-10; reporting duties (Art. 14) since 2026-09-11; main obligations from 2027-12-11. Commission guidance page: https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation.
- **EU Machinery Regulation 2023/1230, Annex III 1.2.1** [law]; http://data.europa.eu/eli/reg/2023/1230/oj.
  - (f): "the tracing log of the data generated in relation to an intervention and of the versions of safety software uploaded after the machinery or related product has been placed on the market or put into service is enabled for **five years** after such upload, exclusively to demonstrate the conformity…"
  - Self-evolving control systems, (b): "recording of data on the safety related decision-making process for software based safety systems ensuring safety function including safety components… is enabled and that such data is retained for **one year** after its collection…"
  - Annex III 1.1.9: critical "software and data… shall be identified as such and shall be adequately protected against accidental or intentional corruption."
  - Applies from **2027-01-20** after a corrigendum; the original text and the lexaris mirror say 14 January (https://single-market-economy.ec.europa.eu/sectors/mechanical-engineering/machinery_en).
  - **Regulation (EU) 2026/1744** (Official Journal 2026-07-24) requires delegated acts adding AI Act high-risk requirements to Annex III; "Those delegated acts shall apply by 2 August 2028" (http://data.europa.eu/eli/reg/2026/1744/oj).
- **Retraining as a change.**
  - UL 4600 voting draft, 2019-12-13 [std, draft]: "A safety case analysis shall be triggered in response to changes." Required examples include "use of a retrained neural network", "update to training data", and "update to remote operation or supervision infrastructure" (12.6.1). Settings that were listed in advance and already validated in the build are not triggers (12.6.1.6.1). The latest published edition I found is the 3rd (2023-03-17).
  - FDA PCCP (Predetermined Change Control Plan) final guidance [gov], issued 2024-12-04 and re-issued 2025-08-18; https://www.fda.gov/media/166704/download. A plan has a Description of Modifications, a Modification Protocol (data management, re-training, performance evaluation, update procedures) and an Impact Assessment. Changes covered by the plan proceed "without triggering the need for a new marketing submission."
  - EU "substantial modification": the Machinery Regulation (Art. 3(16), Art. 18) covers changes "not foreseen or planned by the manufacturer" that affect safety. CRA guidance para 104: a change alters "the level of cybersecurity risk" that the manufacturer did not assess.

## 2. Concepts and terms

| Term | Japanese | Plain definition | Source |
|---|---|---|---|
| Trade secret | 営業秘密 | Secret-managed, useful, non-public information | https://laws.e-gov.go.jp/law/405AC0000000047 |
| Secret-management measures | 秘密管理措置 | Steps that make the owner's intent to keep something secret recognizable to employees and partners | r7ts.pdf |
| Shared data with limited access | 限定提供データ | Data supplied to specific parties as a business, accumulated in quantity and access-controlled | h31pd.pdf |
| Electronic access control | 電磁的管理性 | ID/password, multi-factor or encryption restricting access | h31pd.pdf |
| Raw data / training dataset | 生データ／学習用データセット | Collected data vs. cleaned and labelled data used to train | AI編 p.14 |
| Trained model | 学習済みモデル | Learned parameters plus the inference program | AI編 p.14 |
| Derived models | 再利用モデル／蒸留モデル | Models made from an existing model by fine-tuning or by distillation | AI編 pp.15–16 |
| Input-processing outputs | インプット処理成果 | Artefacts a vendor creates from your inputs, such as training sets | Checklist 2025 |
| Model extraction / policy stealing | モデル抽出攻撃 | Building a functional copy from queries or observed behaviour | NIST AI 100-2 |
| Membership inference | メンバーシップ推論 | Inferring whether a record or trajectory was in the training data | NIST; Peng 2026 |
| Data/model poisoning | データ／モデルポイズニング | Manipulating training data or pre-trained components | NIST; ATLAS |
| Data provenance/lineage | データ来歴 | Record of where data came from and how it changed | CISA CSI |
| AIBOM / ML-BOM | AIBOM | Inventory of models, datasets and dependencies | AIGL v1.2; CycloneDX |
| Model signing | モデル署名 | Signature over a manifest of file hashes | OMS spec |
| Substantial modification | — | An unplanned change that raises risk and needs new conformity assessment | MR Art. 3(16) |
| PCCP | — | A pre-authorized plan defining which model changes are allowed and how they are verified | FDA |

## 3. What extends conventional practice vs. what is new for physical AI

**Extensions of conventional measures**
- Trade-secret controls (labels, access control, NDAs) apply directly to datasets and models. METI's model contract recommends designating them 秘密情報 (AI編 p.113).
- SBOM becomes AIBOM/ML-BOM (AIGL v1.2; CycloneDX ≥1.5; SPDX 3.0).
- Code signing becomes model signing. Signing still does not prove a model is safe (OWASP 2026).
- Pickle loading is a classic untrusted-deserialization risk (Hugging Face).
- Hashes, signatures and provenance logs are the familiar data-integrity toolkit (CISA).
- Version and change logs resemble safety-software configuration management (Machinery Regulation 1.1.9/1.2.1; J-AISI robotics guide).

**Genuinely new**
- **The robot's behaviour is itself a leak channel.** Extraction "is equivalent to imitation learning" (Chen et al.). Inference: competitors could clone a deployed grasp policy from observed motions. Encrypted traffic can already reveal which action is running (Tang et al.).
- **Know-how persists and is hard to remove.** Removal from a trained model is "generally difficult" (METI checklist). Demonstrations can be inferred from a VLA (Peng) and from rollouts of a fine-tuned policy (Christie).
- **Legal protection may not follow the data into the model.** Protection as 限定提供データ may not reach a trained model (guideline p.21), and copyright protects parameters weakly (AI編 fn 48). Inference: contracts plus trade-secret management of the model itself are the main tools.
- **Tacit skills become a file.** The guideline says intangible know-how must be made visible on a medium to be protected (p.16). Inference: teleoperation recordings may become that medium and also the prime target to steal. Workers' freedom to change jobs is a consideration.
- **Poisoning through the physical world.** Physical objects can serve as backdoor triggers (GoBA), and ATLAS lists AML.T0041 Physical Environment Access.
- **Retraining counts as a change.** It triggers safety-case analysis (UL 4600) and must be pre-planned (FDA PCCP) or reassessed (EU substantial modification). METI notes that AI accuracy 「継続学習やアップデートにより事後的に…変化する可能性がある」 ("may change afterwards through continual learning or updates"; https://www.meti.go.jp/policy/mono_info_service/connected_industries/sharing_and_utilization/20260409001-1.pdf, April 2026).
- **Default OSS workflows publish data.** Inference from the LeRobot and Hugging Face defaults above.

## 4. Best resources, ranked

| # | Title | URL | Date | Type | Why | Trust |
|---|---|---|---|---|---|---|
| 1 | 営業秘密管理指針 (Trade Secret Management Guidelines) | meti.go.jp/…/guideline/r7ts.pdf | 2025-03-31 | gov | Legal minimum controls; AI footnotes | High |
| 2 | AI契約ガイドライン AI編 + 契約チェックリスト | meti.go.jp/…/20180615001-3.pdf; …/20250218003-ar.pdf | 2018-06; 2025-02 | gov | Who may use data, models and derived models | High (AI編 dated) |
| 3 | 限定提供データに関する指針 (shared-data guidelines) | meti.go.jp/…/guideline/h31pd.pdf | 2024-02 | gov | Models vs. protected data | High |
| 4 | AI事業者ガイドライン v1.2 appendix | meti.go.jp/…/pdf/20260331_14.pdf | 2026-03-31 | gov | AIBOM, physical AI, extraction | High |
| 5 | CISA "AI Data Security" | media.defense.gov/…/CSI_AI_DATA_SECURITY.PDF | 2025-05-22 | gov | Concrete data-integrity controls | High |
| 6 | NIST AI 100-2 E2025 | csrc.nist.gov/pubs/ai/100/2/e2025/final | 2025-03 | gov | Authoritative attack taxonomy | High |
| 7 | Machinery Reg. 2023/1230 + Reg. 2026/1744 | data.europa.eu/eli/reg/2023/1230/oj | 2023; 2026-07-24 | law | Log-retention periods; AI requirements coming | High |
| 8 | CRA + guidance C(2026) 5252 | data.europa.eu/eli/reg/2024/2847/oj | 2024; 2026-07-27 | law/gov | SBOM duty; substantial modification | High |
| 9 | MITRE ATLAS 2026.09 | github.com/mitre-atlas/atlas-data | 2026-09-15 | project | Technique IDs for threat models | High |
| 10 | OWASP LLM Top 10 2025/2026 | genai.owasp.org | 2024-11; 2026-08 | project | Supply-chain, BOM and signing advice | Medium-high |
| 11 | CycloneDX ML-BOM / SPDX 3.0 | cyclonedx.org/capabilities/mlbom/ | 2023–2025 | std | BOM formats | High |
| 12 | OMS / model-signing; HF safetensors | openssf.org blog; pypi.org/project/model-signing | 2025 | project | Integrity tooling | High |
| 13 | J-AISI AI robotics guide | aisi.go.jp/…/20260723_…pdf | 2026-07-23 | gov | Robot model/config management | High (no VLA yet) |
| 14 | UL 4600 draft; FDA PCCP | Koopman PDF; fda.gov/media/166704 | 2019; 2025-08-18 | std/gov | Retraining as a change | Medium (draft/analogy) |
| 15 | Chen 2021; Zhuang 2024; Peng 2026 | arXiv links above | 2021–2026 | peer-rev/preprint | Policy theft and leakage evidence | Medium-high |

## 5. Open questions and unverified items

- **CRA and AI models:** whether model weights or datasets must appear in the SBOM is not addressed by any official text I found. Weights are arguably not "computer code". Unverified.
- **Machinery Regulation scope:** whether a frozen (offline-trained) VLA grasp policy counts as "self-evolving", and whether it "ensures safety functions", is unverified. This decides whether the Annex I Part A third-party assessment and the one-year decision-data logging apply. The delegated acts under Reg. 2026/1744 are still pending.
- **Retraining:** I found no EU guidance specific to retraining ML policies as substantial modification; the CRA guidance is generic.
- **No direct research:** no peer-reviewed study on stealing VLA/manipulation policies or measuring leakage of industrial know-how; most VLA security work is preprints.
- **Japanese case law:** no court decisions found on trained models as trade secrets (not searched exhaustively).
- **OWASP 2026 date:** the PDF cover says "[Publication date to be set] August 4th, 2026", so the exact date is unclear.
- **SPDX 3.0.1** release date unverified. UL 4600 editions after the 2023 3rd edition unverified; clause numbering may differ from the 2019 draft.
- **LeRobot defaults** may change between versions; check the dataset push and private flags in the version the client uses.
- **METI contract guidelines:** revision timing after the 2026-10-30 case collection is unknown.


