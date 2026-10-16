# Mission: Ontology for deterministic agent decisions

## Why
Vendors (Palantir first, now many others) say that an "ontology" lets AI agents make reliable, even deterministic, decisions from messy, unstructured input. Shunya wants to judge these tools with confidence: to see what is real engineering and what is marketing, so they can advise on (or choose) such a tool at work.

## Success looks like
- Draw, from memory, where determinism lives in an "LLM agent + ontology" system and where it does not (the step that reads unstructured input).
- Explain the difference between a Palantir-style ontology (object types, links, actions) and a semantic-web ontology (OWL classes, axioms, reasoning), and what each one can and cannot guarantee.
- Take a vendor demo, white paper, or docs page and score it with a short checklist of sharp questions (where is the decision made, how is the reading step checked, what happens when data is missing, can a decision be traced and replayed, who maintains the rules).
- Build a tiny claim-review prototype in Python (LLM reads a note into typed facts, the facts are checked, a rule table decides) to feel where each part fails.

## Constraints
- Comfortable with Python: lessons can include small code tasks.
- Plain English, no unexplained abbreviations (non-native speaker).
- Short lessons that fit into a work day.

## Out of scope
- Formal logic proofs and the math of description logics.
- Real medical coding or insurance regulation beyond what the running example needs. Health-insurance claim review is only the running example.
- Click-by-click product training for any vendor tool.
