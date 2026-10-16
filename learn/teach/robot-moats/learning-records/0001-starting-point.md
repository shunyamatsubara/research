# Starting point: knows RL concepts, sees locomotion as a solved commodity

The user knows RL concepts (reward, policy, sim-to-real) but has not trained a walking policy, and is strong in FK/IK and motion planning (from the pixel-to-grasp explainer in `learn/slides/20261010-pixel-to-grasp-pose/`). Their starting view on 2026-10-16: locomotion is an easy, solved problem because (a) the reward is simple (body above ground, low motor jerk, get from A to B) and (b) locomotion on solid ground is easy to simulate, while manipulation, with its deformable objects, is where the valuable know-how is. Lesson 0001 targets this view. Do not re-teach RL basics.

**Evidence**: Self-reported in the mission interview ("Know concepts"); the view is stated in the `/teach` request.

**Implications**: After lesson 0001, check whether the user can (1) split "locomotion" into layers and (2) name evidence beyond a demo. If yes, record it here as a new learning record and move on to judging navigation and autonomy claims, with Field AI as the case.
