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

## Course plan (re-planned 2026-10-16 around the learner's themes; the learner said "OK")
Every lesson starts with a short recall warm-up from earlier lessons and ends with an "extension of conventional measures / new for physical AI" table.
1. The AI is not the safety system (done 2026-10-15): doer/checker, the five layers, the trust boundary, Japan's motion range.
2. Threat-model the cell (done 2026-10-16): eight entry points E1–E8 with real cases, the cell data-flow diagram, an attack chain through E4, two sorters (entry point; extension or new), EU Machinery Regulation 1.1.9 and CRA reporting.
3. Control the AI's permissions and motion range (done 2026-10-16): permission table, five rules, L3 vs L4 limits, ISO 10218:2025 classes and functions, Japan's 80 W rule, fence rule and fence-free routes, who may change each limit, EU record-keeping.
4. Protect data, models and know-how (done 2026-10-16): assets in the cell, five ways to lose them (stolen, published by default, copied by watching, reused by the vendor, poisoned), UCPA Art. 2(6)/(7), METI trade-secret guideline (2025 AI notes), AI contract guideline and checklist, AIBOM (AI Guidelines for Business v1.2), CycloneDX/SPDX, model signing, safetensors, retraining as change (UL 4600, FDA PCCP).
5. Camera data, remote operation and the cloud (done 2026-10-16): PPC Q&A on cameras, monitoring, vendors and transfers abroad; Camera Guidebook ver3.0; 2026 APPI amendment; EDPB 3/2019; AI Act Art. 5(1)(f); Data Act; MHLW autonomous vs remote operation (June 2026); MR 1.2.1/1.2.6 and IEC 60204-1 link loss; Agility case; CISA/NCSC/NIST/METI remote access; CISA AI-in-OT cloud principles; Unitree G1 telemetry.
6. Build it in from PoC to production (done 2026-10-16): stages and gates, trial statistics, SACE, minimal safety case.
7. Conventional robots vs physical AI (done 2026-10-16): comparison table, five questions for vendor claims, NVIDIA Halos case.
8. Capstone: assess a client cell (done 2026-10-16): fictional brief, sorter by stage, quiz, top-five recall.
Reference pages: field guide, glossary, assessment template, Extension vs New (by the learner's seven themes).

## Themes the learner needs (stated 2026-10-16, in Japanese)
- AI decision and motion-range control, including the permissions of autonomous AI.
- Protection of training data, AI models and manufacturing know-how.
- Configuration management of AI models and OSS.
- Security of remote operation and cloud connections.
- Handling of camera data.
- How the risks of physical AI differ from those of conventional robots.
- How to build safety and security in, from PoC to production.
- Learner's framing: split each theme into "extension of conventional measures" and "needs new measures". Use this split as a recurring structure in lessons.
- Coverage on 2026-10-16: motion range is covered (Lesson 1). Permissions, model/OSS configuration, remote/cloud, conventional-vs-physical-AI differences and PoC-to-production are only partly covered (field guide). Confidentiality of data and know-how, and camera data handling (privacy), are not covered and need new research.
- 2026-10-16: the learner said "OK" to the re-plan and asked to see Lesson 2 first. They have not yet said whether the themes come from a specific client project, so MISSION.md is unchanged. Ask again when they react to Lesson 2.
- Verified 2026-10-16: the R&D exclusion from Japan's industrial-robot rules does not cover a completed machine used on a trial basis at a production site (MHLW notice 基発第339号, 第3 Ⅰ 1(6)). Relevant to PoCs on a client's factory floor.

## Working notes
- Research reports from 2026-10-15 are in `research/`. They are agent output: re-check any fact against its source before putting it in a lesson.
- Glossary terms from lesson 1 were added when the lesson was written, before the learner showed they can use them. Confirm with retrieval questions at the start of the next session, and revise definitions if they struggle.
- In the next session, ask how the lessons went (first-try scores, which sorter items were hard). Quiz results stay in the learner's browser; Claude cannot see them.
- 2026-10-16: the learner asked to "create all material"; Lessons 3 to 8 and the reference pages were written in one go. Spacing therefore depends on the learner: the home page suggests two lessons a week and the capstone last.
- Research for Lessons 4 and 5 is in `research/2026-10-16-*.md` (agent output). Facts used in the lessons were re-checked against local copies of the primary sources on 2026-10-16.
- Open points to watch: whether teleoperation to record demonstrations counts as 教示等 (no official interpretation found); the detailed rules of the 2026 APPI amendment; MHLW follow-up on physical AI machines; whether model weights belong in a CRA SBOM; EU delegated acts adding AI requirements to the Machinery Regulation.
