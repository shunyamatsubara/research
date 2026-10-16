# Prior knowledge: robot stacks yes, car stacks no

The user knows robotics well enough to design a hybrid pick-and-place system (forward/inverse kinematics, motion planning, VLA models), but has not studied how automated-driving systems are built: the car-specific hardware, sensor suites, safety standards, and the industry's vocabulary are new. Teach car topics by mapping them onto robot concepts the user already has, and do not re-teach IK, motion planning, or what a VLA is.

**Evidence**: Self-reported on 2026-10-16 ("Robot stacks, not cars"), and consistent with the brief in `learn/slides/20261010-pixel-to-grasp-pose/brief.md`, which also says camera geometry and image processing were new to the user as of 2026-10-10.

**Implications**: Sensor and compute details (camera counts, lidar, TOPS) need short, ground-up explanations. The "AI model + rule-based safety layer" idea can be introduced through the user's own split design.
