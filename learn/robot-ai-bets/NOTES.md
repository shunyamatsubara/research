# Teaching notes

## Learner preferences
- Lessons in **English**, plain words a non-native speaker knows. No unexplained abbreviations.
- When the learner writes in unnatural English, first show how a native speaker would say it, then answer.
- Depth: **engineer level** (architecture, data amounts, control rates, benchmark numbers).
- Purpose: advising clients and picking partners/vendors → every lesson should end in something usable in a client or vendor conversation.

## Learner background (stated 2026-10-17)
- Has fine-tuned / run a VLA model.
- Knows FK/IK and motion planning (from the earlier pixel-to-grasp-pose article in `learn/slides/`).
- Weaker on camera geometry and image processing (same source).
- Works on a modular pick-and-place design: motion planning to approach, VLA or a dedicated policy for the grasp.

## Workspace
- This workspace lives in `learn/robot-ai-bets/`, not the repo root, because the repo holds more than one topic.
- Cloud session: lessons are sent with SendUserFile (render) instead of opened with a CLI command.
- Shared components: `assets/style.css` (all pages), `assets/practice.js` (quiz + recall widgets).

## Curriculum sketch (revise as records come in)
1. Rhoda's bet: the DVA pipeline and the hypotheses under it.
2. The contenders map: where DVA sits against VLA, world-action models, human video, real-data scaling, simulation, modular pipelines.
3. Evidence check: which results would confirm or break each hypothesis; head-to-head numbers.
4. Due-diligence kit: questions for a vendor/partner meeting; apply to a client use case.
