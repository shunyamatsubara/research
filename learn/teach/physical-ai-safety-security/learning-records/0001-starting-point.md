# Starting point: secure-software engineer, new to physical AI

The learner is a software engineer with a background in secure software development, and knows AI governance practices such as layered (defense-in-depth) guardrails for AI systems. They are new to physical AI. They already know robot kinematics (forward and inverse kinematics) and motion planning, and on 2026-10-10 studied how a VLM's grasp point becomes a 3D grasp pose (camera intrinsics, back-projection, hand-eye calibration; see `learn/slides/20261010-pixel-to-grasp-pose/`).

**Evidence**: stated by the learner in the first /teach request (2026-10-15); kinematics and motion planning knowledge stated in the brief of the 2026-10-10 article.

**Implications**: Do not re-teach threat modeling, defense in depth, least privilege, or LLM guardrails. Use them as bridges ("you already know X; in a robot, X becomes Y"). Teach what is new: physical hazards, functional safety, the safety standards, and how learned models change both safety and security.
