# Mission: How automated-driving stacks are built (Volvo × NVIDIA as the case)

## Why
I build robot systems (for example, a pick-and-place design where rule-based motion planning brings the arm close and a VLA does the grasp). I want to understand how the car industry splits the work between a hardware platform, a safety layer, and a large AI driving model, so I can reuse the same patterns in my robots and read automated-driving news with real understanding.

## Success looks like
- I can explain in two minutes what NVIDIA DRIVE Hyperion, NVIDIA Halos, and the Alpamayo models each do in Volvo's system, and which parts Volvo builds itself.
- Given any job in a driving system (for example, "stop the car if the AI's planned path is unsafe"), I can say which layer owns it and why.
- I can explain how a large reasoning model gets from the lab into a car (teacher model, distillation, simulation, guardrails) and what that means for a robot VLA.
- I can sketch a robot architecture that borrows the "AI model + independent safety layer" pattern and name its trade-offs.
- I can read a new NVIDIA or carmaker announcement and place each product name in the stack.

## Constraints
- Lessons in plain English that a non-native speaker can read easily. No unexplained abbreviations.
- Short lessons, one clear win each.
- I already know robotics (kinematics, IK, motion planning, VLA models) but not how cars are built.

## Out of scope (assumed — to confirm)
- Training or building driving models myself.
- The business side of the car industry (deals, pricing, market share).
- Legal and regulatory detail beyond what is needed to understand why the safety layer exists.
