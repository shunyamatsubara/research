# Notes

## Learner preferences
- Plain words a non-native speaker knows; no unexplained abbreviations; concise but not over-simplified.
- When the learner writes in unnatural English, first show a native-speaker rewrite, then answer.
- Comfortable with Python. Can take small code tasks.
- Use they/them for the learner.

## Workspace decisions
- Workspace lives in `learn/ontology/` (the repo also holds other topics under `learn/`).
- The course is published as one multi-file Artifact: `index.html` (course home, no doctype because the publisher wraps it) is the main page; lessons, references and assets are supporting files (each with its own doctype) so relative links work.
- Published course (private Artifact): https://claude.ai/artifact/Vv5oQ85mnyRke9aWLHcSFC — republish from `learn/ontology/index.html` with `root: learn/ontology` and every lesson/reference/asset in `files`.
- Running example: health-insurance claim review. Rules shown in lessons are simplified and labeled as such; link to a real rule for comparison.

## Working terms (used in lessons, not yet in the glossary)
Promote to `reference/glossary.html` only after the learner uses a term correctly.
- **Reading step**: the part that turns unstructured input into typed facts. Probabilistic.
- **Deciding step**: the part that turns typed facts into a decision with fixed rules. Deterministic.
- **Typed fact**: a fact whose kind and fields are defined by the ontology (e.g. a Procedure with a code).
- **Ontology**: in this course, the shared, explicit definition of the kinds of things, their properties and relations (including is-a) that both steps agree to use.

## Course path (flexible)
1. Where determinism lives: reading vs deciding.
2. What an ontology adds beyond a schema: is-a inheritance, constraints.
3. Two meanings of "ontology": Palantir (objects, links, actions) vs OWL (classes, axioms, reasoning); open vs closed world.
4. Checking the reading step: validation, confidence, human review.
5. Python lab: a tiny claim reviewer.
6. Vendor scorecard: judge a real demo or docs page.

## Lesson material saved from research (2026-10-16)
- Lesson 3: Palantir docs describe a typed schema + actions + functions + permissions; no documented OWL-style inference. Interfaces are declared, not inferred. Contrast with SNOMED CT (description logic, polyhierarchy) and ICD-10-CM (classification). Japan's 傷病名マスター maps several disease names to one ICD-10 code (finer terms on a coarser classification).
- Lesson 4: AWS Automated Reasoning: "VALID … only for the parts of the input captured through policy variables"; a model translates the text into logic. SHACL `sh:minCount` as a completeness gate. Allow "unknown" instead of forcing a value.
- Lesson 6 (scorecard): Cigna PxDx was itself a deterministic procedure-to-diagnosis table; the problem was skipping individual review ("1.2 seconds on each case"). Deterministic is not the same as correct or fair. CMS FAQ: "coverage criteria are static and unchanging, artificial intelligence cannot be used to shift the coverage criteria over time." Palantir AIP Logic: access controls "do not extend to the model's output or any Ontology edits it composes." Vendor benchmarks: ask for absolute accuracy on your data and who paid.
- Possible answer to "Can the read step ever be deterministic?": yes in a narrow sense (batch-invariant kernels gave 1,000 identical runs, Thinking Machines Lab), but repeatable is not correct, and a one-character change in the input can still change the output.
