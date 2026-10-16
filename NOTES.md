# Notes

## Learner preferences
- Wants plain English: words a non-native speaker knows, no abbreviations without explanation, but no over-simplification that leaves gaps.
- When the user writes in unnatural English, first show how a native speaker would phrase it, then answer.
- Lessons in English (chosen 2026-10-16).

## Context
- Mission reasons (2026-10-16): reuse ideas in robotics + follow industry trends.
- Background: knows robot stacks (FK/IK, motion planning, VLA), not car stacks.
- Earlier work in this repo: `learn/slides/20261010-pixel-to-grasp-pose/` — a Japanese explainer on turning a VLM grasp point into a 3D target pose. Its brief says the user's design splits pick-and-place into "motion planning to approach, VLA or a learned policy to grasp". This is a good bridge to the "AI model + classical safety stack" idea in cars.
- The same brief (2026-10-10) says the user had no image-processing or camera-geometry background then. Explain sensor details from the ground up.

## Workspace decisions
- The teaching workspace is the repository root (where /teach was run).
- `index.html` at the root is the course home. Lessons, reference pages, and assets are published together as one multi-file Artifact so relative links keep working.
- Lesson and reference files are full HTML documents (own doctype). `index.html` is a page fragment (the Artifact tool adds the skeleton).
- Published course artifact (private): https://claude.ai/artifact/FfCiYqMaGrmw21oPvEJWau — republish `index.html` with the `files` map (lessons/, reference/, assets/) to the same URL when adding lessons.

## Terms to promote to a glossary (only after the user shows they can use them)
Hyperion, Halos OS, Halos Core, hypervisor, rule-based guardrail, Alpamayo Stack, Alpamayo model, teacher model, distillation, two-stack (dual-stack) pattern, ASIL D.
Canonical names used in lessons: "Hyperion" (not "DRIVE Hyperion"), "Halos OS" (in-car software), "Halos" (NVIDIA's whole safety system), "Alpamayo Stack" (in-car driving software), "Alpamayo model" / "AI driver" (the VLA), "classical stack".

## Next lesson ideas
- Lesson 2: from teacher model to car (fine-tune, distill, quantize, run on Thor). Start with a spaced-recall question from Lesson 1.
- Check before writing: Alpamayo 1.5 details, AlpaSim, the 99 ms latency figure in the Alpamayo-R1 paper (only seen via research agent so far).
