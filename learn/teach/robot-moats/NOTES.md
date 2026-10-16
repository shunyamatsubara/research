# Notes

## How the user wants to be taught

- Plain English, using words a non-native speaker knows. Concise, but not so simplified that it confuses.
- When the user writes unnatural English, first show how a native speaker would say it, then answer.
- From the earlier explainer in this repo (`learn/slides/20261010-pixel-to-grasp-pose/brief.md`): define every symbol on first use, make figures the reader can trace by hand, and avoid unexplained jargon. That brief was in Japanese; this course is in English because the user asked in English.

## Setup

- Workspace: `learn/teach/robot-moats/`. The repo keeps learning material under `learn/`.
- Published as one private artifact. `index.html` is the artifact's page and follows the artifact page contract (no doctype/html/head/body of its own). Lessons, reference sheets and assets are published as `files` at the same relative paths, so relative links work both in the repo and in the artifact.
- Artifact URL: https://claude.ai/artifact/5rE11cGxHuN6jcoT5Tiu6Q (private; first published 16 Oct 2026, icon "book").
- To update in a later session: `read` the artifact URL first, then publish `index.html` with `url` set to the artifact URL and a `files` map with every new or changed file.
- Exercises keep first-try results in the viewer's localStorage only. Claude cannot read them, so ask the user to report scores in chat.

## Working notes

- Glossary candidates (promote to `GLOSSARY.md` once the user uses them correctly): gait control, perceptive locomotion, navigation and autonomy, whole-body loco-manipulation, task reward vs style reward, actuator network, teacher–student training, intervention rate, moat.
- Lesson 0002 plan: judging an L3 claim, with Field AI as the case. Which metrics would prove an autonomy moat (intervention rate, field hours, uptime, repeat customers), and how to separate company claims from measurements. Material: Field AI's claims (">90%" less inspection time; revenue plus contracts reportedly above $135M; "hundreds" of sites), the DARPA SubT history, the Spot partnership, and ANYbotics (company claims more than 200 deployments) as a comparison.
- Later candidates:
  - Why manipulation is data-limited: Goldberg's "100,000-year data gap" editorial, Generalist's 270,000 hours of real data, Physical Intelligence's funding.
  - Business model: Unitree sells cheap hardware but reported a 63% humanoid gross margin at its 2026 IPO (Caixin, medium confidence); it sold 33,294 quadrupeds and 5,632 humanoids in 2023–2025 (prospectus). Cheap is not the same as commodity margins.
- Checked but not used yet: 2026 Beijing half-marathon autonomous winner in 50:26 (Xinhua); about 45% of robots finished (36Kr, medium); Boston Dynamics' June 2026 claim that Atlas's learned policies "worked first try" on the robot; Skild AI valued above $14B (Jan 2026); Physical Intelligence valued at $5.6B (Nov 2025).
