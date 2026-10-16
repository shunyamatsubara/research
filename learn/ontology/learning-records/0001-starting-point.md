# Starting point: ontology as an entity-relation graph, met through Palantir

Shunya already knows an ontology as a graph of entities and relations with "is-a" links (their example: "chair" is-a "object"), and that it can support decisions such as health-insurance claim review. They first met the word through Palantir (objects, links, actions), not through the semantic web. They write Python comfortably.

**Implications**: Do not re-teach basic is-a graphs; build on the chair example. Expect the Palantir meaning to be their default, so the difference from OWL-style ontologies needs its own lesson. A likely gap to test: the belief that an ontology by itself makes an LLM agent deterministic (the reading step stays probabilistic).
