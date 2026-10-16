# Ontology for Agent Decisions — Resources

All links were opened and checked on 2026-10-16. Quotes used in lessons come from these pages.

## Knowledge

### What an ontology is
- [Paper: "A Translation Approach to Portable Ontology Specifications" by Tom Gruber (1993)](https://tomgruber.org/writing/ontolingua-kaj-1993.pdf)
  The classic definition: "An ontology is an explicit specification of a conceptualization." Use for: the one-line definition.
- [Guide: _Ontology Development 101_ by Noy & McGuinness (Stanford, 2001)](https://protege.stanford.edu/publications/ontology_development/ontology101.pdf)
  The best first hands-on guide: classes, slots, instances, is-a, inheritance, competency questions. Use for: Lesson 2 and any modelling exercise.
- [Paper: "A Description Logic Primer" by Krötzsch, Simančík & Horrocks (arXiv 1201.4089)](https://arxiv.org/abs/1201.4089)
  Short, exact account of subsumption ("Mother ⊑ Parent") and of the closed-world assumption. Use for: what "reasoning" really means.
- [Standard: W3C OWL 2 Primer](https://www.w3.org/TR/owl2-primer/)
  The semantic-web meaning of ontology. §2 states the open-world assumption; §4.2 says an is-a link "cannot be derived from the labels". Use for: Lesson 3.
- [Standard: W3C SHACL](https://www.w3.org/TR/shacl/) and [book: _Validating RDF Data_ by Labra Gayo et al. (free online)](https://book.validatingrdf.com/bookHtml007.html)
  Checking that extracted data is complete before deciding (`sh:minCount`), and the open-world / closed-world difference in plain words. Use for: Lesson 4.
- [Survey: "Knowledge Graphs" by Hogan et al. (ACM Computing Surveys, 2021)](https://arxiv.org/abs/2003.02320)
  The reference survey. Use for: looking up any knowledge-graph term.

### Deterministic decisions
- [Standard: OMG Decision Model and Notation (DMN) 1.6, Sep 2026](https://www.omg.org/spec/DMN/1.6)
  Decision tables (§8.1), complete tables, hit policies such as Unique and First (§8.2.11). Use for: what a well-formed rule table is.

### How language models behave
- [Article: "Building effective agents" by Anthropic (Dec 2024)](https://www.anthropic.com/engineering/building-effective-agents)
  Workflows ("predefined code paths") versus agents ("LLMs dynamically direct their own processes"); gates between steps. Use for: where deterministic code can live in an agent system. Primary source for Lesson 1.
- [Docs: Anthropic glossary, "temperature"](https://platform.claude.com/docs/en/about-claude/glossary) and [article: "Defeating Nondeterminism in LLM Inference" by Thinking Machines Lab (Sep 2025)](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)
  Temperature 0 is not deterministic; 1,000 runs gave 80 different completions; batch-invariant kernels can fix it at a speed cost. Use for: any "our model is deterministic" claim.
- [Docs: Anthropic structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) and [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
  Schema-compliant output is guaranteed (with exceptions); OpenAI adds "Structured Outputs can still contain mistakes." Use for: shape versus truth.
- [Paper: SPIRES, Caufield et al., _Bioinformatics_ 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10924283) and [Text2KGBench, ISWC 2023](https://arxiv.org/abs/2308.02357)
  Peer-reviewed work on LLM extraction into an ontology, and how to measure conformance and hallucination. Use for: Lesson 4 and the Python lab.

### Vendor primary docs
- [Palantir: Ontology overview](https://www.palantir.com/docs/foundry/ontology/overview/), [core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts/), ["Why create an Ontology?"](https://www.palantir.com/docs/foundry/ontology/why-ontology), [submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria/), [AIP Logic](https://www.palantir.com/docs/foundry/logic/overview/)
  Objects, links, actions, functions, interfaces; deterministic gates before writes; LLM edits "applied or staged for human review". No documented OWL-style inference. Use for: Lesson 3 and the scorecard.
- [Microsoft Fabric IQ: ontology overview (preview)](https://learn.microsoft.com/en-us/fabric/iq/ontology/overview)
  "Rules" are natural-language statements used "during reasoning"; proposal-first changes; RDF/OWL import. Use for: rules-as-text versus rules-as-code.
- [AWS Bedrock Automated Reasoning checks](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html)
  Formal checks of LLM output against policy, but "VALID … only for the parts of the input captured through policy variables", and a model does the translation into logic. Use for: the scorecard.
- Also checked: [Snowflake semantic views](https://docs.snowflake.com/en/user-guide/views-semantic/overview), [Databricks Genie Ontology](https://docs.databricks.com/aws/en/uc-semantics), [Neo4j GraphRAG study (vendor-sponsored)](https://neo4j.com/blog/agentic-ai/study-graphrag-ai-agents-80-percent-more-truthful/).

### Critical and independent views
- [Essay: "Palantir's Ontology Narrative" by Ruohang Feng (Feb 2026)](https://vonng.com/en/db/ontology-bullshit/)
  A database practitioner's argument that each Ontology concept maps to a database primitive. Use for: a strong sceptical view to test against the docs.
- [Report: Thoughtworks Technology Radar Vol. 34 (Apr 2026)](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf)
  "Semantic layer" at Trial; naive text-to-SQL fails when business rules live outside the schema. Use for: a balanced practitioner view.
- [Paper: Sequeda, Allemang & Jacob (arXiv 2311.07509, 2023)](https://arxiv.org/abs/2311.07509)
  By knowledge-graph vendor staff: accuracy rose from 16% to 54% with a knowledge graph. Use for: a big gain that is still far from 100%.

### Running example: claim review
- US: [CMS NCCI edits](https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits) (code-pair and unit-cap tables), [Medicare Coverage Database](https://www.cms.gov/medicare-coverage-database/search.aspx), and the worked example [Article A57718, vitamin D testing](https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleid=57718).
- US standards: [SNOMED CT logical model](https://docs.snomed.org/snomed-ct-practical-guides/snomed-ct-starter-guide/5-snomed-ct-logical-model) (a description-logic ontology), [ICD-10-CM](https://www.cdc.gov/nchs/icd/icd-10-cm/index.html) (a classification), [Da Vinci DTR](https://hl7.org/fhir/us/davinci-dtr/) (rules in CQL), [CQL](https://cql.hl7.org/).
- US rules on algorithmic denials: [CMS Feb 2024 FAQ (AAMC copy)](https://www.aamc.org/media/74896/download?attachment) ("coverage criteria are static and unchanging"), [California SB 1120 press release](https://sd13.senate.ca.gov/news/press-release/december-9-2024/landmark-law-prohibits-health-insurance-companies-using-ai-to), [ProPublica on Cigna PxDx (2023)](https://www.propublica.org/article/cigna-pxdx-medical-health-insurance-rejection-claims).
- Japan: [DX審査支払機構 (former 支払基金), コンピュータチェックに関する公開](https://www.hpdx.or.jp/shinryohoshu/ssk_cc/index.html) (published check tables), [審査の一般的な取扱い（医科）](https://www.hpdx.or.jp/shinryohoshu/sinsa_jirei/kikin_shinsa_atukai/shinsa_atukai_i/index.html), [基本マスター](https://www.hpdx.or.jp/seikyushiharai/tensuhyo/kihonmasta/index.html), [MHLW on RECAI, AI that sorts claims for human review](https://www.mhlw.go.jp/stf/photo/2023/12/ph1219-01.html).

## Wisdom (Communities)

- [Palantir Developer Community](https://community.palantir.com/)
  Very active. Use for: asking how Palantir really runs rules, reviews LLM edits, or exports the ontology.
- [Ontolog Forum](https://groups.google.com/g/ontolog-forum)
  Long-running, very active list of ontology practitioners; Ontology Summit 2026 has a neuro-symbolic AI track. Use for: deep questions on ontology versus schema.
- [人工知能学会 セマンティックウェブとオントロジー研究会 (SIG-SWO)](https://www.sigswo.org/)
  Active Japanese research group; Sep 2026 meeting theme was 「Agentic AIを支える知識基盤」. Use for: meeting Japanese researchers in person.
- [Knowledge Graph Conference](https://www.knowledgegraph.tech/)
  Industry conference (next: May 2027, New York) with a Slack. Use for: hearing practitioners compare vendors.
- Domain: [日本医療情報学会 (JAMI)](https://www.jami.jp/), [AAPC forums](https://www.aapc.com/discuss/) (US coders). Use for: claim-review reality checks, only if the running example becomes real work.

## Gaps
- No independent, published benchmark of end-to-end decision consistency (same input, repeated runs) for any ontology vendor.
- Palantir's own posts defining "ontology-augmented generation" could not be opened.
