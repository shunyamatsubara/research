# Robot Startup Moats Resources

Checked on 2026-10-16. Company statements are claims, not measurements. "Verified" means the quote or number was checked against the source itself, not a search snippet.

## Knowledge

### Status of learned locomotion (start here)

- [Review: Frey, Mattamala, Park, Mittal, Martius, Osborne, Sparrow & Hutter, "Advances, challenges, and opportunities for legged robots", _Science Robotics_ 11(116), 2026](https://arxiv.org/abs/2607.28952) (journal DOI [10.1126/scirobotics.aee0787](https://doi.org/10.1126/scirobotics.aee0787))
  The most recent peer-reviewed verdict, from ETH Zurich (Hutter's lab) with NVIDIA co-authors. Verified quotes: RL "has made quadrupedal locomotion an approachable problem… especially when terrain geometry is known"; "the frontier has now shifted toward semantic understanding and dexterous interaction"; safety certification "remains an open problem"; the field may need to move "beyond rigid-body simulation". Use for: the status of each layer. **Primary source for lesson 0001.**
- [Survey: Ha, Lee, van de Panne, Xie, Yu & Khadiv, "Learning-based legged locomotion: State of the art and future perspectives", _IJRR_ 44(8), 2025](https://arxiv.org/abs/2406.01152)
  The broad technical survey (content from 2024, before the 2025 humanoid wave). Use for: §3.3.1 on reward shaping ("no general set of rules"), §5 sim-to-real, §8 "Unsolved Problems and Research Frontiers".
- [Talk: Marco Hutter, "The New Era of Mobility: Humanoids and Quadrupeds Enter the Real World", IROS 2025 plenary (IEEE RAS, 37 min)](https://www.youtube.com/watch?v=-Znp4JrFu8I)
  Video version of the review. Watch 11:37–26:03 (humanoids, control, perceptive locomotion, parkour, humanoids in the wild).

### L1 gait control: why it is close to a commodity

- [Paper: Rudin et al., "Learning to Walk in Minutes Using Massively Parallel Deep RL", CoRL 2021](https://arxiv.org/abs/2109.11978) · [code: legged_gym](https://github.com/leggedrobotics/legged_gym)
  Flat ground "in under four minutes", rough ground "in twenty minutes" on one workstation GPU. Also admits "artifacts in the behavior, such as a dragging leg" before reward-weight tuning. Use for: training cost; the honest caveats.
- [Code: legged_gym default reward settings](https://raw.githubusercontent.com/leggedrobotics/legged_gym/master/legged_gym/envs/base/legged_robot_config.py)
  9 non-zero reward terms out of 15 defined (verified). Use for: showing what a "simple" reward really looks like.
- [Code: Isaac Lab velocity locomotion task](https://raw.githubusercontent.com/isaac-sim/IsaacLab/main/source/isaaclab_tasks/isaaclab_tasks/manager_based/locomotion/velocity/velocity_env_cfg.py) and [ready-made environments list](https://isaac-sim.github.io/IsaacLab/main/source/overview/environments.html)
  9 non-zero terms for quadrupeds; the H1 and G1 humanoid configs use 13 and 15. Use for: "the recipe ships with the simulator".
- [Paper: MuJoCo Playground (Google DeepMind et al.), 2025](https://arxiv.org/abs/2502.08844)
  Unitree G1 and Booster T1 humanoids learn flat-ground walking in under 30 minutes and transfer zero-shot; the authors say reward design "cannot be easily automated". Use for: humanoid walking is now a recipe too.
- [Product page: Unitree Go2](https://www.unitree.com/go2) and [Unitree G1](https://www.unitree.com/g1)
  Go2 from $1,600; G1 from $13.5K (Oct 2026). Use for: price as a commoditization signal.
- [Article: Ken Goldberg in UC Berkeley News, Aug 2025](https://news.berkeley.edu/2025/08/27/are-we-truly-on-the-verge-of-the-humanoid-robot-revolution/) and [Goldberg, _Science Robotics_ editorial, Aug 2025](https://autolab.berkeley.edu/assets/publications/media/GOFE-Can-Close-the-100000-Year-Robot-Data-Gap-Science-Robotics-Aug-2025-scirobotics.aea7390.pdf)
  Simulation "does work pretty well for robots running and performing acrobatics" but not for dexterity. Use for: where the user's view is right.

### Reward design (argument 1)

- [Paper: Peng et al., "AMP: Adversarial Motion Priors", SIGGRAPH 2021](https://arxiv.org/abs/2104.02180)
  Verified: the task reward "can be relatively intuitive and simple to design. However, it can be exceptionally difficult to design a style-reward". Written for animated characters. Use for: the task-vs-style split.
- [Paper: Escontrela et al., "Adversarial Motion Priors Make Good Substitutes for Complex Reward Functions", IROS 2022](https://arxiv.org/abs/2203.15103)
  Task-only reward: the policy "learns to exploit inaccurate simulator dynamics and violently vibrates" its feet; cost of transport 14.03 vs 1.37–1.65 with a hand-tuned reward. Use for: what happens with a "simple" reward.
- [Paper: Margolis & Agrawal, "Walk These Ways", CoRL 2022](https://arxiv.org/abs/2212.03238)
  Task-only gaits "have not been shown to successfully transfer to the real world"; tuning needs repeated train-and-deploy loops.
- [Paper: Ma et al., "DrEureka", RSS 2024](https://arxiv.org/abs/2406.01967)
  An LLM-written reward that scored well in simulation gave 0.0 m/s on the real Go1. Use for: rewards and the sim-to-real gap interact.

### Simulation and the sim-to-real gap (argument 2)

- [Paper: Hwangbo et al., "Learning agile and dynamic motor skills for legged robots", _Science Robotics_ 2019](https://arxiv.org/abs/1901.08652)
  Verified: actuator dynamics "are nearly impossible to model accurately"; with standard motor models the robot "could not make a single step without falling"; "tuned the analytical model for more than a week without much success". Use for: the gap is in the motors.
- [Paper: Tan et al., "Sim-to-Real: Learning Agile Locomotion For Quadruped Robots", RSS 2018](https://arxiv.org/abs/1804.10332)
  "Inaccurate actuator models and lack of latency modeling are two major causes of the reality gap."
- [Paper: Lee et al., "Learning quadrupedal locomotion over challenging terrain", _Science Robotics_ 2020](https://arxiv.org/abs/2010.11251)
  Trained on rigid terrain only, yet walked through mud, snow and thick vegetation (a point for the user); needed teacher–student training.
- [Paper: Miki et al., "Learning robust perceptive locomotion for quadrupedal robots in the wild", _Science Robotics_ 2022](https://arxiv.org/abs/2201.08117)
  "Snow, vegetation, and water visually appear as obstacles… or are missing altogether due to high reflectance." 2.2 km hike in 78 min (planner time for a person: 76 min).
- [Paper: Choi et al., "Learning quadrupedal locomotion on deformable terrain", _Science Robotics_ 2023](https://doi.org/10.1126/scirobotics.ade2256)
  Verified (abstract): policies "still not applicable on soft and deformable terrains, especially at high speed"; a granular-media model let the robot run on beach sand at 3.03 m/s.
- [Paper: Agarwal et al., "Legged Locomotion in Challenging Terrains using Egocentric Vision", CoRL 2022](https://arxiv.org/abs/2211.07638)
  About 200,000 simulation steps/s without depth rendering vs 500 with it. Use for: why camera-based walking is costly to train.

### Deployment and reliability

- [Blog: Boston Dynamics, "Starting on the Right Foot with Reinforcement Learning", Mar 2024](https://bostondynamics.com/blog/starting-on-the-right-foot-with-reinforcement-learning/)
  Verified: "over a million simulations"; test fleet "24/7 for a cumulative runtime of over 2,000 hours a week"; RL works alongside a model predictive controller. Use for: what deployment-grade evidence looks like.
- [Article: IEEE Spectrum on the Spot RL Researcher Kit, Mar 2024](https://spectrum.ieee.org/boston-dynamics-research-spot)
  Spot "takes a tumble on average once every 50 kilometers".
- [Article: WIRED on the 2025 Beijing humanoid half marathon](https://www.wired.com/story/beijing-half-marathon-humanoid-robots/)
  Verified: winner needed three battery changes and fell once; every robot had human operators; Alan Fern: "Until five years ago or so, we didn't really know how to get robots to walk reliably. And now we do." [2026 result (Xinhua)](https://english.news.cn/20260419/74fc74a78dc64d959fbd4c1f244f6561/c.html): autonomous winner in 50:26.
- [Essay: Rodney Brooks, "Why Today's Humanoids Won't Learn Dexterity", Sep 2025](https://rodneybrooks.com/why-todays-humanoids-wont-learn-dexterity/)
  Contrarian view from a robotics pioneer: dexterity needs touch data; "not come closer than 3 meters to a full size walking robot". Use for: safety as an open layer.
- [Standard: ISO 25785-1 project record (draft)](https://iss.rs/en/project/show/iso:proj:91469)
  Safety requirements for dynamically stable industrial mobile robots; committee draft stage in July 2026, not yet published.

### Field AI (case study)

- [Press release: FieldAI raises $405M, 20 Aug 2025](https://www.fieldai.com/news/fieldai-announces-over-400m-in-funds-raised-to-advance-embodied-ai-at-scale)
  Verified: models for "navigating dynamic, unstructured environments without prior maps, GPS, or predefined paths"; runs on "quadrupeds, humanoids, wheeled robots, and passenger-scale vehicles"; money also for "locomotion and manipulation".
- [Press release: Boston Dynamics and FieldAI partner, 12 Mar 2026](https://www.fieldai.com/news/boston-dynamics-and-fieldai-partner-to-bring-robots-into-uncharted-and-dynamic-environments)
  Verified: "Spot's rugged mobility, combined with FFMs' risk-aware decision-making". Claims >90% less inspection time (company figure).
- [Job post: FieldAI "Robotics Autonomy Engineer, Locomotion" (open Oct 2026)](https://jobs.lever.co/field-ai/00be5e27-c434-4cde-b367-f1688aa7bd2b)
  Verified: building "terrain-aware (perceptive) locomotion behaviors for quadruped and humanoid platforms" with RL. Use for: intent to own lower layers.
- [Paper: Team CoSTAR (NASA JPL et al.), DARPA SubT, 2020](https://arxiv.org/abs/2010.09259)
  The founders' earlier system ran on "Spot's internal locomotion system".
- [Article: TNW citing Business Insider, 2 Oct 2026](https://thenextweb.com/news/fieldai-10b-europe-robot-brains)
  $700M at a $10B valuation: "A term sheet is signed and the round has not closed." Revenue and contracts reportedly above $135M across 30+ customers.

## Wisdom (Communities)

- [Isaac Lab GitHub Discussions](https://github.com/isaac-sim/IsaacLab/discussions)
  Active (new threads daily in Oct 2026), English. Use for: testing claims about locomotion RL and sim-to-real with the people who build it.
- [mjlab GitHub Discussions](https://github.com/mujocolab/mjlab/discussions)
  Locomotion RL on MuJoCo with an Isaac Lab-style API; active, has a Discord. English.
- [ロボ☆スタディオン (connpass, Akihabara)](https://robostadion.connpass.com/)
  Japanese hands-on meetups; ran an mjlab RL hands-on on 2 Oct 2026; LeRobot hands-on #13 on 24 Oct 2026. Use for: in-person discussion in Japanese.
- [ROS Japan Users Group (rosjp, connpass)](https://rosjp.connpass.com/)
  3,389 members; regular meetups. Japanese. Use for: integration-side practitioners.
- [LeRobot Discord](https://discord.gg/q8Dzzpym3f)
  About 20k members, English. Use for: the manipulation side (imitation learning, VLAs).
- CoRL 2026 workshop ["Open Problems in Contact-Rich Loco-Manipulation"](https://contact-rich-loco-manipulation.github.io), Austin, 12 Nov 2026
  Use for: the L4 frontier; check later whether talks are recorded.

Community preference: not asked yet.

## Gaps

- No rigorous measurement of "commoditization" exists; the evidence is prices, open-source recipes and expert opinion.
- No independent data on Field AI's field performance (uptime, how often humans step in). All numbers are company claims.
- No public, verified fall-rate data for humanoids in real deployments.
