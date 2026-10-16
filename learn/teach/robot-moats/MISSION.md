# Mission: Judging robot-learning startups

## Why
Judge robotics startups and their technical claims, for example whether a company's "locomotion model" or "robot foundation model" is a real moat, or something rivals can rebuild from public recipes. (Chosen by the user on 2026-10-16, prompted by seeing Field AI build its own models while locomotion looks "solved".)

## Success looks like
- Given a startup's pitch, place each technical claim on the right layer (gait control, perceptive locomotion, navigation and autonomy, whole-body loco-manipulation, or manipulation) and say whether that layer is near-commodity, maturing, or open.
- Name the evidence that would show a real moat at that layer (deployment hours, how often humans must step in, data nobody else has, hardware access, safety certification), and tell it apart from demo-only signals such as a viral video.
- Explain, with sources, why low-level gait control is close to a commodity while deployed locomotion is not.
- Hold a sourced, defensible view on specific companies, starting with Field AI.

## Constraints
- Knows RL concepts (reward, policy, sim-to-real) but has not trained a walking policy. Strong in FK/IK and motion planning (see [learning record 0001](./learning-records/0001-starting-point.md)).
- Prefers plain English and short lessons. When the user's English is unnatural, show the native phrasing first.
- Reads lessons in the Claude app (cloud session), so the course is also published as a private artifact.

## Out of scope
- Training a locomotion policy by hand. (Assumed, not yet confirmed: judging claims does not need it.)
- RL algorithm math (for example PPO internals), unless a specific claim depends on it.
