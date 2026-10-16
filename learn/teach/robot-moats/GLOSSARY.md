# Robot Startup Moats Glossary

The shared words for judging robot-learning startups: what each layer of a robot's skill is called, and what "commodity" and "moat" mean when we judge a claim.

## Terms

**Locomotion**:
The whole job of moving a robot's body from one place to another: making the steps, seeing the ground, choosing a route, and staying safe while doing it.
_Avoid_: walking, mobility
_In this workspace_, "locomotion" always means the whole stack. When a claim is only about one layer (for example, only turning a speed command into steps), name that layer instead.

**Manipulation**:
Changing the state of objects with a robot's hands or tools: grasping, placing, pushing, folding.
_Avoid_: handling, pick-and-place (that is one manipulation task, not the whole field)

**Policy**:
The function, usually a neural network, that maps what the robot senses to the commands it sends to its motors.
_Avoid_: model (too vague), brain

**Reward**:
The number a reinforcement-learning policy is trained to make as large as possible, usually a weighted sum of many terms.
_Avoid_: score; cost (cost is a reward with the sign flipped)

**Sim-to-real gap**:
The difference between how a simulated robot and world behave and how the real ones behave, which can make a policy that works in simulation fail on hardware.
_Avoid_: domain gap. "Reality gap" is an acceptable alias.

**Commodity**:
A product that many suppliers offer with little real difference between them, so price decides who wins.
_Avoid_: solved. A problem can be solved and still valuable to whoever does it reliably, or unsolved and still cheap.
