# Automated-Driving Stack (Volvo × NVIDIA) Resources

Checked 2026-10-16. NVIDIA renamed several products during 2026, so older pages may use older names (see `reference/stack-map.html`).

## Knowledge

### The Volvo deal
- [Press release: "Volvo Cars and NVIDIA Expand Partnership to Advance Safe Automated Driving" (NVIDIA Newsroom, 2026-10-15)](https://nvidianews.nvidia.com/news/volvo-cars-and-nvidia-expand-partnership-to-advance-safe-automated-driving)
  The joint official text. Names the three parts ("the Hyperion sensor and compute architecture, Halos OS, and Alpamayo Stack driving software") and the goal (door-to-door, gradual eyes-off and mind-off). Says little about what each part does. Use for: what Volvo actually committed to.
- [Volvo Cars copy of the same release](https://www.volvocars.com/intl/media/press-releases/6BDB4FC313366147/)
  Same text on Volvo's media site. It blocked our automated reader; open it in a browser.
- [Article: "Volvo makes a bigger bet on Nvidia" (TechCrunch, 2026-10-15)](https://techcrunch.com/2026/10/15/volvo-makes-a-bigger-bet-on-nvidia/)
  Press, but with direct quotes: NVIDIA's Ali Kani ("we run these two stacks at the same time") and Volvo's Alwin Bakkenes (standardizing on Hyperion, including the sensor set; first car "within the decade"). Use for: the dual-stack idea and Volvo's side of the deal.
- [Blog: "Volvo Cars accelerated computing and AI" (NVIDIA, 2024-09-04)](https://blogs.nvidia.com/blog/volvo-cars-accelerated-computing-ai/)
  History: Volvo's earlier plan to move to DRIVE Thor and its in-house software. Use for: how the 2026 deal grew out of earlier work.

### Hyperion (hardware platform)
- [Press release: Hyperion 10 and Uber robotaxis (NVIDIA Newsroom, 2025-10-28)](https://nvidianews.nvidia.com/news/nvidia-uber-robotaxi)
  The clearest hardware numbers: two DRIVE AGX Thor (each 1,000 INT8 TOPS), DriveOS, 14 cameras, 9 radars, 1 lidar, 12 ultrasonics. Use for: what is physically in the reference design.
- [Product page: NVIDIA Hyperion](https://www.nvidia.com/en-us/solutions/autonomous-vehicles/drive-hyperion/)
  Current marketing page (L2++ to L4 on one architecture). Use for: current positioning; check numbers against the release above.
- [Developer PDF: DRIVE AGX Thor platform for developers (NVIDIA, Dec 2025)](https://developer.download.nvidia.com/drive/docs/nvidia-drive-agx-thor-platform-for-developers.pdf)
  Chip-level detail (CPU, memory, power). Use for: deep dives on the computer only.

### Halos (safety)
- [Blog: Halos OS (NVIDIA, 2026-06-10)](https://blogs.nvidia.com/blog/halos-os-robotaxi-safety/)
  The best first read on the safety layer. Explains Halos Core (next-gen DriveOS, ASIL D, hypervisor), Halos SDK, Halos Applications (rule-based guardrails) and Halos Infra, one heading each. Use for: what "Halos OS" contains.
- [Page: NVIDIA Halos for autonomous vehicles (AI Trust Center)](https://www.nvidia.com/en-us/ai-trust-center/halos/autonomous-vehicles/)
  Official overview with certifications (TÜV SÜD ASIL D, ANAB-accredited inspection lab) and a Halos OS layer diagram. Use for: exact wording and certification claims.
- [Blog: Halos launch (NVIDIA, 2025-03-18)](https://blogs.nvidia.com/blog/halos-safety-system-autonomous-vehicles/)
  The original framing: platform, algorithmic and ecosystem safety. Use for: why Halos is a "system" and not just one product.
- [Press release: Halos for Robotics (NVIDIA Newsroom, 2026-06-22)](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)
  Halos OS moved to robots on IGX Thor; Agility (Digit) is the first adopter. Use for: the robotics bridge in the mission.

### Alpamayo (AI driving model)
- [Paper: "Alpamayo-R1: Bridging Reasoning and Action Prediction…" (arXiv 2511.00088)](https://arxiv.org/abs/2511.00088)
  The primary technical source: VLA on Cosmos-Reason, flow-matching trajectory decoder, Chain-of-Causation data, RL post-training. Use for: how the model works inside.
- [Model card: nvidia/Alpamayo-R1-10B (Hugging Face)](https://huggingface.co/nvidia/Alpamayo-R1-10B)
  Exact inputs and outputs: 4 cameras, 0.4 s history at 10 Hz, 6.4 s trajectory (64 waypoints) plus reasoning text; 8.2B + 2.3B parameters; license. Use for: precise numbers.
- [Press release: Alpamayo family at CES (NVIDIA Newsroom, 2026-01-05)](https://nvidianews.nvidia.com/news/alpamayo-autonomous-vehicle-development)
  The "teacher model" statement: "Rather than running directly in-vehicle, Alpamayo models serve as large-scale teacher models…". Use for: how the open models are meant to be used.
- [Press release: Alpamayo 2 Super (NVIDIA Newsroom, 2026-05-31)](https://nvidianews.nvidia.com/news/nvidia-alpamayo-2-super-robotaxis)
  34B-parameter teacher, distilled into compact models that run on DRIVE AGX Thor; also auto-labeling and model critiquing. Use for: the cloud-to-car path.
- [Product page: NVIDIA Alpamayo Stack](https://www.nvidia.com/en-us/solutions/autonomous-vehicles/alpamayo/)
  Lists the in-car parts: Alpamayo in-vehicle model, Policy Evaluator and Safety Monitors, Halos OS, Halos SAFE. Use for: the official one-line role of each part.
- [Blog: DRIVE AV in the Mercedes-Benz CLA (NVIDIA, 2026-01-05)](https://blogs.nvidia.com/blog/drive-av-software-mercedes-benz-cla/)
  "An AI end-to-end stack for core driving, alongside a parallel classical safety stack" built on Halos. Use for: the dual-stack pattern in a car already on sale.
- [Video: "How Autonomous Vehicles Learn to Reason With NVIDIA Alpamayo" (NVIDIA, YouTube)](https://www.youtube.com/watch?v=KGCTwoAlhsM)
  Short official overview. Not yet watched by the teacher. Use for: a visual first pass before the paper.

## Wisdom (Communities)

- [NVIDIA Developer Forums: Alpamayo](https://forums.developer.nvidia.com/c/autonomous-vehicles/alpamayo/766)
  Official forum where NVIDIA engineers answer. Use for: concrete questions about running or fine-tuning Alpamayo models.
- [NVIDIA Developer Forums: DRIVE AGX Thor General](https://forums.developer.nvidia.com/c/autonomous-vehicles/drive-agx-thor/drive-agx-thor-general/742)
  Use for: hardware and DriveOS questions. Some threads go unanswered.
- [r/SelfDrivingCars](https://www.reddit.com/r/SelfDrivingCars/)
  Large, moderated subreddit for industry news. Use for: testing your reading of announcements against practitioners' takes. Treat claims as opinions.
- [ROS Discourse](https://discourse.ros.org/)
  The main robotics community. Use for: discussing how the "AI policy + rule-based safety layer" pattern applies to robots.

## Gaps

- No independent (non-NVIDIA) technical review of Halos OS yet.
- Volvo has not said how its own HuginCore computing platform and Hyperion fit together, or which Alpamayo model it will use.
- NVIDIA has not published how the Policy Evaluator chooses between the AI path and the classical path.
- No official latency figure for an Alpamayo model on DRIVE AGX Thor (only 99 ms on a desktop RTX 6000 Pro Blackwell, per the paper as reported by research; not yet checked first-hand).
