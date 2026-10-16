# Teaching notes

## How this user wants to be taught
- English is not their first language. Use plain words and short sentences. Don't use abbreviations or over-simplify to the point of confusion.
- At the start of a reply, if their English was unnatural, first show how a native speaker would say it, then answer.
- Keep explanations concise.
- 10–15 minutes per lesson. One small skill per lesson.

## What we know about them (first interview, 2026-10-16)
- Uses: learning new fields (AI, robotics, tools, papers) and writing/arguing. Not chosen: work decisions, personal choices.
- Pain points: too much input, hidden assumptions found late, no clear "so what". Not chosen: fuzzy question.
- Background: "knows a few" frameworks (MECE, logic trees, common biases). May know the Japanese consulting classic "So What? / Why So?" (unconfirmed: ask before relying on it).
- Their org has related skills installed: `grilling` (stress-test a plan), `hn-learning` (one question at a time tutoring), `cognitive-load-protocol` (FURO: Filter / Understand / Retrieve / Offload, for information overload). These could serve the AI rally later; FURO's "Filter" overlaps with the "question as a filter" lesson.

## Course design decisions
- Course name: **Weakest Link**. Core model from Lesson 1: thinking is a chain of four links, **Question → Ground → Reasoning → So-what**; it is only as strong as its weakest link; the checklist has one check per link; the AI rally attacks the weakest link first.
- Use these exact link names everywhere (until GLOSSARY.md is started): Question, Ground, Reasoning, So-what. "Ground" = the facts and assumptions a conclusion stands on.
- Start GLOSSARY.md only after the user shows they can use the four link names correctly (e.g., good quiz result or a correct diagnosis in chat).
- The checklist grows one version per lesson (v0.1 in Lesson 1). Keep it DO-CONFIRM style, one page, 9 items or fewer. Each item must be checkable (a written thing or a yes/no), not a virtue like "be humble".
- AI rally rules (anti-sycophancy, anti-offloading): the user thinks first and writes their own draft; the AI finds the ONE weakest link, quotes the draft, asks ONE question, does not praise or rewrite.
- Quizzes: options have the same number of words; vary the position of the right answer.
- Later idea for the Reasoning lesson: Peirce's "cable, not a chain" (several independent lines of evidence) as a refinement of the chain model.

## Tentative course arc (adapt to progress)
1. The four links (map + diagnosis + first rally) ← done 2026-10-16
2. The question as a filter (fixes "too much input")
3. Hidden assumptions and first principles (Ground)
4. The so-what: conclusion, what it changes, what would change my mind
5. Reasoning: rival explanations and counter-evidence
6. Spending brainpower: triage and when to stop
7. Designing the checklist itself (Gawande)
8. The AI rally protocol: roles, turn order, scoring a round
9. Review: checklist v1.0 on a real piece of work

## Workspace and publishing
- The teaching workspace is the repo root. `learn/` holds an unrelated robotics explainer from another skill; leave it alone.
- `index.html` is the course home. It is a page fragment (no doctype) because the Artifact host wraps the main page; lessons and reference pages are full HTML documents.
- The course is published as one private Artifact: main page `index.html`, with `lessons/`, `reference/` and `assets/` as supporting files at the same paths. Artifact URL: (filled in after first publish). In a new session, republish to that URL with `url` after adding a lesson.
