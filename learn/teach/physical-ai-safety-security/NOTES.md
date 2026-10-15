# Notes

## Learner preferences
- Plain English with words a non-native speaker knows. Explain each technical term the first time it appears. Expand every abbreviation on first use, for example "SOTIF (Safety Of The Intended Functionality)".
- Keep explanations concise, but do not simplify so much that the meaning gets lost.
- When the learner writes in unnatural English, first show how a native speaker would say it, then answer.
- Lessons in plain English (chosen 2026-10-15; Japanese was offered).
- Running example: an AI-driven robot-arm pick-and-place cell (classical motion planning for the approach, a VLA policy for the grasp).
- Goals chosen 2026-10-15: client projects (propose and review), security assessment, general understanding. Building their own robot system was not chosen.
- Clients are mainly in Japan: include Japanese rules next to international ones.

## Context
- On 2026-10-10 the learner studied how a VLM grasp point becomes a 3D grasp pose (Japanese article in `learn/slides/20261010-pixel-to-grasp-pose/`). They know forward and inverse kinematics and motion planning.
- This teaching workspace lives in `learn/teach/physical-ai-safety-security/` because the repository also holds other learning material.

## Published course
- Private artifact: https://claude.ai/artifact/6hJdgQcb7npShau6NJhUBD (first published 2026-10-15).
- Root page is `index.html`; it has no `<!doctype>`, `<html>`, `<head>` or `<body>` because the artifact wraps it. Lessons and reference pages are full HTML documents.
- To update from a new session: publish `index.html` with `url` set to the link above, `root` = this folder, and `files` mapping every lesson, reference page and asset to the same relative path. Read the artifact first (the Artifact tool requires it).

## Course plan (draft; revise as the learner progresses)
1. The AI is not the safety system (done 2026-10-15): doer/checker, the five layers, the trust boundary, Japan's motion range.
2. Threat-model the cell: Exein loop + ROS 2 threat model (STRIDE) + real cases (UniPwn, LeRobot pickle RCE, RoboPAIR, CHAI, Raven II e-stop abuse). Start with a recall warm-up from lesson 1.
3. Standards and rules for an arm cell: ISO 12100 order, ISO 10218-1/-2:2025, ISO/TS 15066, ISO 13849-1, EU Machinery Regulation, Japan Art. 150-4 and the two fence-free routes, JIS status.
4. Guardrails for the AI itself: constitutions, RoboGuard, KnowNo, evaluation statistics (TRI).
5. Proving it: STPA/FMEA, trial counts, a minimal GSN safety case.
6. Reading vendor claims: NVIDIA Halos case (ANAB second-party scope, TÜV readiness, Outside-In safety notice).
7. Capstone: assess a sample client cell with the field-guide checklist.

## Working notes
- Research reports from 2026-10-15 are in `research/`. They are agent output: re-check any fact against its source before putting it in a lesson.
- Glossary terms from lesson 1 were added when the lesson was written, before the learner showed they can use them. Confirm with retrieval questions at the start of the next session, and revise definitions if they struggle.
- In the next session, ask how lesson 1 went (first-try scores, which sorter items were hard). Quiz results stay in the learner's browser; Claude cannot see them.
