# Robot foundation-model bets — Resources

Checked 2026-10-17. Company pages are primary sources for *what a company claims*, not proof that it works.

## Knowledge

### Rhoda AI (primary)
- [Rhoda AI, "Causal Video Models Are Data-Efficient Robot Policy Learners" (2026-03-10)](https://www.rhoda.ai/research/direct-video-action)
  Rhoda's technical description of Direct Video Action: inputs, inverse dynamics model, Leapfrog Inference, data hours per task. Use for: anything about how DVA works.
- [Rhoda AI, scaling web video pretraining (2026-09-10)](https://www.rhoda.ai/research/scaling-web-video-pretraining)
  Single-task scaling study (model size, compute, data) with stated limits. Use for: evidence for and against the "scale pays" hypothesis.
- [Rhoda AI, giving robots a sense of touch (2026-10-13)](https://www.rhoda.ai/research/giving-robots-a-sense-of-touch)
  Tactile "videos" added to DVA. Use for: where the roadmap is going beyond vision.
- [Rhoda AI press release (2026-03-10)](https://www.rhoda.ai/news/press-release) and [team page](https://www.rhoda.ai/team)
  Funding, business model, people. Use for: snapshot facts.
- [The Data Exchange, interview with Changan Chen (2026-04-23)](https://thedataexchange.media/changan-chen-rhoda-ai/)
  Edited transcript: model size range, what the 10–20 h includes, robot-as-a-service, no RL yet. Use for: details missing from the company pages.
- [RoboPapers Ep. 79 with Eric Chan (2026-05-06)](https://robopapers.substack.com/p/ep79-rhoda-ai-causal-video-models)
  Long technical interview (auto-transcript; speaker labels unreliable): latent space, low resolution, IDM as point tracking, critique of joint denoising. Use for: engineer-level questions.
- [Rhoda job posts on Ashby](https://jobs.ashbyhq.com/rhoda-ai)
  Reveal deployment plans (Q4 2026, Wolfsburg), hardware (Flexiv arms, ZED cameras), and the robot-as-a-service model. Use for: checking claims against hiring.

### Rhoda (reputable press)
- [The Robot Report, "Rhoda AI exits stealth with $450M…" (2026-03-12)](https://www.therobotreport.com/rhoda-ai-exits-stealth-with-450m-to-train-robots-from-video/)
  Notes that all figures are Rhoda's own. Use for: neutral framing.
- [Humanoids Daily, Rhoda coverage](https://www.humanoidsdaily.com/companies/rhoda-ai)
  Trade site; tracks each Rhoda post and points out missing numbers. Use for: news updates (verify against primary).

### Landscape and rivals
- [Moritz Reuss, "Pretrained to Imagine, Fine-Tuned to Act: The Rise of World Action Models", NVIDIA Technical Blog (2026-06-15)](https://developer.nvidia.com/blog/pretrained-to-imagine-fine-tuned-to-act-the-rise-of-world-action-models/)
  Best survey of the video / world-action-model family; three designs; speed and compute costs; mentions DVA. Written by a company that builds rival models. Use for: placing any video-based company.
- ["Do World Action Models Generalize Better than VLAs? A Robustness Study", arXiv 2603.22078 (v5, 2026-07-30)](https://arxiv.org/abs/2603.22078)
  Head-to-head robustness and latency numbers for π0.5 vs several WAMs. Use for: the speed/robustness trade-off.
- [DreamZero, arXiv 2602.15922 (2026-02-17)](https://arxiv.org/abs/2602.15922) and [Cosmos Policy, arXiv 2601.16163](https://arxiv.org/abs/2601.16163)
  NVIDIA-linked joint video-action models with VLA comparisons. Use for: the strongest public evidence for the video family.
- [Fast-WAM, arXiv 2603.16666](https://arxiv.org/abs/2603.16666)
  Video in training, no video at run time. Use for: the main challenge to Rhoda's "generate the future every step" design.
- [1X World Model (2026-01-12)](https://www.1x.tech/discover/world-model-self-learning)
  Closest structural look-alike to DVA (video model + separate IDM), with honest limits. Use for: comparison.
- [V-JEPA 2, Meta FAIR, arXiv 2506.09985](https://arxiv.org/abs/2506.09985)
  Latent (feature) prediction instead of pixels. Use for: the "pixels are wasteful" argument.
- [Physical Intelligence blog](https://www.pi.website/blog) — esp. [π0.7](https://www.pi.website/blog/pi07) and [human-to-robot](https://www.pi.website/research/human_to_robot)
  Leading VLA lab. Use for: current VLA state of the art and hybrid moves.
- [Google DeepMind, Gemini Robotics](https://deepmind.google/models/gemini-robotics/vla/) and [Gemini Robotics-ER 1.6](https://deepmind.google/blog/gemini-robotics-er-1-6/)
  VLA plus an "embodied reasoning" planner model. Use for: VLA numbers; modular use of a reasoning model.
- [NVIDIA GR00T N1.6](https://research.nvidia.com/labs/gear/gr00t-n1_6/)
  Open-weight VLA. Use for: VLA architecture and data scale.
- [Generalist AI blog](https://generalistai.com/blog) — esp. [GEN-1](https://generalistai.com/blog/gen-1) and ["Going Beyond World Models & VLAs"](https://generalistai.com/blog/beyond-world-models)
  The opposite bet: huge real interaction data from wearables; video is a "crutch". Use for: the strongest counter-argument to Rhoda.
- [Sunday Robotics, "no robot data"](https://www.sunday.ai/journal/no-robot-data)
  Glove-based data instead of teleoperation. Use for: human-data family.
- [TiPToP, arXiv 2603.09971](https://arxiv.org/abs/2603.09971)
  Modular system with zero robot data beats π0.5-DROID. Use for: the modular family; links to the learner's own pick-and-place design.
- [MolmoBot, arXiv 2603.16861](https://arxiv.org/abs/2603.16861)
  Simulation-only training, strong zero-shot pick-and-place. Use for: the simulation family.

## Wisdom (Communities)
- [LeRobot (Hugging Face) — GitHub and Discord link in the README](https://github.com/huggingface/lerobot)
  Large, active open-source robot-learning community; people fine-tune VLAs and video policies on real arms. Use for: practical questions about what works on real hardware.
- [RoboPapers podcast](https://robopapers.substack.com/)
  Authors explain their papers in depth; comments open. Use for: hearing researchers defend (or hedge) their claims.
- [Conference on Robot Learning (CoRL)](https://www.corl.org/)
  Main research venue for robot learning; talks and workshops online. Use for: testing your read of the field against researchers.
- [A3 — Association for Advancing Automation](https://www.automate.org/)
  Industry body behind the Automate show and the "Automated" podcast. Use for: the factory buyer's view (reliability, safety, integration).

## Gaps
- No independent benchmark or third-party evaluation of Rhoda's DVA exists yet.
- No public latency or cost-per-robot figures for Rhoda.
- Little public data on multi-week production reliability for *any* robot foundation model.
