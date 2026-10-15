# Research notes: nvidia halos

Raw report from a research agent, 2026-10-15. Working notes, not a lesson.
Claims carry the source URL the agent read. Facts used in lessons were re-checked;
re-check anything else against its source before teaching or client use.

---

# NVIDIA Halos and physical-AI safety (status as of 15 Oct 2026)

**Source labels**
- **VM:** vendor marketing.
- **VT:** vendor technical documentation.
- **REG:** regulator or accreditation body.
- **SB:** standards body.
- **IE:** independent expert.
- **PR:** press.

Each claim carries a link tagged [S#]. Section 4 gives every source's date and label. "My inference" marks my own reasoning, not a sourced fact.

The report runs to about 2,900 words, a little over your 2,500 target, because every claim carries a source. My web-search budget ran out near the end, so a few items in section 5 are unverified.

## 1. Key findings

### Q1 — What Halos for Robotics is, in NVIDIA's words
- **It reuses NVIDIA's self-driving-car (AV) safety design.** NVIDIA says Halos for Robotics "is organized into the same full-stack comprehensive safety system that unifies safety elements from platform hardware and software across three layers" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **The three layers** ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/), [S3](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)):
  1. **Platform safety.** The NVIDIA IGX Thor compute module and board, plus NVIDIA Holoscan Sensor Bridge (HSB), which connects sensors to the computer.
  2. **Halos OS.** Its base is **Halos Core**, described as "the base safety operating system" and "the next generation of NVIDIA DriveOS". It runs either as Linux alone, or as Linux plus QNX on NVIDIA's hypervisor. On top sit **Halos Applications**. The only one published so far is the **Halos Outside-In Safety Blueprint**.
  3. **Ecosystem safety.** The **NVIDIA Halos AI Systems Inspection Lab** inspects partners' integrations before they go to third-party certification.
- **The architecture diagram** ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/), [S4](https://www.nvidia.com/en-us/ai-trust-center/halos/robotics/)) stacks four labelled bands, from the bottom up:
  - *Platform Safety*: IGX SoM, Platform/Board.
  - *Halos OS*: Halos Core, Halos SDK, Halos Applications.
  - *Algorithmic Safety*: Foundational Models.
  - *Ecosystem Safety*: Halos Workflows, AI Systems Inspection Lab.

  The text says three layers, but the diagram shows four bands.
- **The diagram's colours differ between robots and cars.**
  - In the robotics version, Halos SDK, Foundational Models and Halos Workflows are grey; the other boxes are green.
  - In the AV version, every box is green ([S5](https://www.nvidia.com/en-us/ai-trust-center/halos/autonomous-vehicles/)).
  - My inference: grey means "not yet usable for robot safety". This matches NVIDIA's statement that "Robotics middleware and Halos Infra tools are available but not yet for safety applications" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **The Halos OS figure** ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)):
  - The planned *inside-out* applications are all grey: Remote Safe Stop, Fall Detection, Safe Behavioral Envelope, Safe Velocity Limit, Human Presence Detection.
  - Only *Automated Trailer Loading*, an outside-in application, is green.
  - Below them sit the Halos Core libraries, the Safety Extensions Package (SEP), Linux/QNX on a hypervisor, and FreeRTOS.

### Q2 — Which safety problem each layer addresses
The mapping to problem types is mine. The contents of each row are sourced.

- **IGX Thor chip, Functional Safety Island (FSI) and Safety MCU (SMCU)** ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/), [S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)):
  - *Random hardware faults:* error-correcting memory, in-system self-test, and "Over 22,000 safety mechanisms".
  - *Systematic hardware faults (design errors):* the chip is developed under an ISO 26262 ASIL D / IEC 61508 SC 3 process.
  - *Interference between tasks:* memory protection and on-chip firewalls.
- **Halos Core and SEP** ([S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)):
  - *Systematic software faults:* SEP is developed under NVIDIA's "NVIDIA PLC-L3" process.
  - *Error handling:* hardware errors are routed to the FSI and SMCU.
  - *Isolation:* a hypervisor separates software partitions.
- **HSB and Edge Safety Link** ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/), [S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)):
  - *Sensor and actuator path integrity:* an "end-to-end IEC 61508 SIL 2 safety protocol" plus MACsec.
  - It also serves as a base for the safety fieldbuses FSoE, PROFIsafe and CIP Safety.
- **The Outside-In application** ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)):
  - *AI performance limits (SOTIF-type):* input unlike the training data ("out-of-distribution"), blocked cameras, and the robot's own sensors being occluded.
- **Algorithmic safety** ([S5](https://www.nvidia.com/en-us/ai-trust-center/halos/autonomous-vehicles/)):
  - So far only for cars: the Alpamayo driving model is paired "with independent safety checks".
- **Halos Workflows / Halos Infra and the Safety Evaluation Framework (SEF)** ([S10](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)):
  - *Validation evidence* from simulation, data and statistics. Currently specific to cars.
- **The Inspection Lab** ([S7](https://search.anab.org/public/organization_files/NVIDIA-Corporation-Cert-and-Scope-File-06-06-2025_1749243349.pdf)):
  - Checks that partners have integrated NVIDIA parts correctly, against NVIDIA's own safety manuals.
- **Cybersecurity:**
  - *Cars:* an ISO/SAE 21434 process certificate and a UN R155 cybersecurity management system ([S16](https://images.nvidia.com/aem-dam/en-zz/Solutions/auto-self-driving-safety-report.pdf)).
  - *Robots:* MACsec, secure boot and full-disk encryption ([S21](https://docs.nvidia.com/igx/user-guide/latest/SW/security.html)). Jetson adds a firmware TPM ([S22](https://docs.nvidia.com/jetson/archives/r38.4/DeveloperGuide/SD/Security.html)).
  - Attestation is claimed only for a partner's hardware security chip (TPM), which offers "measured boot and remote attestation" ([S23](https://www.eejournal.com/industry_news/infineon-advances-physical-ai-security-against-quantum-era-threats-with-certified-tpm-solution-for-nvidia-jetson-thor/)).
  - I found no IEC 62443 claim for robots.

### Q3 — How NVIDIA deals with neural networks that cannot be fully verified
- **NVIDIA admits the problem.**
  - End-to-end AI systems "preclude traditional compositional design and verification" (Marco Pavone, NVIDIA) ([S12](https://blogs.nvidia.com/blog/halos-safety-system-autonomous-vehicles/)).
  - "Traditional functional safety methods, built around deterministic software and deductive failure analysis, are necessary but no longer sufficient" ([S10](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)).
- **A diverse classical stack runs alongside the AI.**
  - NVIDIA says DRIVE Thor can "run the end-to-end AV stack and a proven safety stack in parallel" ([S14](https://nvidianews.nvidia.com/news/nvidia-drive-hyperion-platform-achieves-critical-automotive-safety-and-cybersecurity-milestones-for-av-development)).
  - Its architecture "guardrails the end-to-end driving model with checks supported by a diverse modular stack" ([S16](https://images.nvidia.com/aem-dam/en-zz/Solutions/auto-self-driving-safety-report.pdf)).
- **Deterministic, rule-based guardrails.**
  - Halos Applications provide "safety guardrails for AI through deterministic, rule-based functions, analyzed and designed to behave within defined bounds" ([S11](https://blogs.nvidia.com/blog/halos-os-robotaxi-safety/)).
  - The AV Halos OS diagram shows a *Classical Planner* and the *NVIDIA Alpamayo* AI both feeding a *Safety Monitor and Selector*. This is a doer/checker arbiter: one part acts, an independent part checks. It is drawn inside a dashed box labelled "Roadmap", so it is not yet delivered ([S5](https://www.nvidia.com/en-us/ai-trust-center/halos/autonomous-vehicles/)).
- **Robots: monitor the AI's inputs, with a safe fallback** ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)):
  - The Safety AI Monitor watches for out-of-distribution input, because in that case "the accuracy and reliability of the AI model can no longer be assured".
  - The Safety Decision Maker then falls "back to a safe operating state—reactivating the robot's onboard safety functions".
  - The Decision Maker is a finite-state machine on the safety island, "isolated from the main AI compute domain".
- **Hardware diversity.** Different processing engines are paired, for example GPU with CPU, or main CPU with the safety island, "for ASIL and SIL decomposition" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **Guardrails across the lifecycle,** each mapped to one of NVIDIA's computers ([S5](https://www.nvidia.com/en-us/ai-trust-center/halos/autonomous-vehicles/); restated for all physical AI in [S2](https://blogs.nvidia.com/blog/physical-ai-halos-safety/)):
  - DGX ↔ "Design-time safety guardrails".
  - Omniverse with Cosmos ↔ "Validation-time guardrails".
  - DRIVE AGX ↔ "Deployment-time guardrails for run-time monitoring and real-time introspection".
- **Watch the word "guardrail".** "Cosmos Guardrail" is content moderation ("tools used to ensure content safety in Cosmos"), not physical safety ([S29](https://docs.nvidia.com/cosmos/2.0.0/guardrail.html)).
- **NVIDIA's own robot AI model disclaims safety use.** The GR00T N1.6 VLA model card says it "is not tested or intended for use in mission critical applications that require functional safety" ([S32](https://huggingface.co/nvidia/GR00T-N1.6-3B/blob/main/SAFETY_and_SECURITY.md)).

### Q4 — Standards NVIDIA cites, and for what purpose
- **IEC 61508 (general functional safety).** The safety island is "SIL 3 capable"; the chip's safety-relevant blocks are developed to SC 3 ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **ISO 13849 (machinery control systems).** Used for IGX reference architectures, in the Inspection Lab's scope, and as a target for Agility's Digit robot ([S7](https://search.anab.org/public/organization_files/NVIDIA-Corporation-Cert-and-Scope-File-06-06-2025_1749243349.pdf), [S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf), [S3](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)).
- **ISO 26262 (automotive functional safety).**
  - TÜV SÜD certified DriveOS 6.0 to ASIL D ([S2](https://blogs.nvidia.com/blog/physical-ai-halos-safety/)).
  - Halos Core is "compliant with ISO 26262 ASIL D" ([S11](https://blogs.nvidia.com/blog/halos-os-robotaxi-safety/)).
  - The robotics stack reuses the same development processes ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **ISO 21448 (SOTIF), ISO/PAS 8800 and UL 4600.** Frameworks for structuring the AV safety case ([S10](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)).
- **ISO/IEC TR 5469 and ISO/IEC TS 22440 (AI and functional safety).**
  - The Outside-In blueprint offers "documentation support" for both ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
  - TS 22440-1 is still a committee draft (stage 30.60, April 2026) ([S35](https://iss.rs/en/project/show/iso:proj:89535)).
- **ISO 25785-1 (humanoids and other dynamically balanced mobile robots).**
  - NVIDIA reports "active contribution" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
  - It is still a committee draft (stage 30.60, July 2026) ([S35](https://iss.rs/en/project/show/iso:proj:91469)).
- **ISO/SAE 21434 and UN R155 (automotive cybersecurity)** ([S16](https://images.nvidia.com/aem-dam/en-zz/Solutions/auto-self-driving-safety-report.pdf)).
- **IEC 62443 (industrial cybersecurity)** appears only twice:
  - As practice borrowed for automotive work ([S16](https://images.nvidia.com/aem-dam/en-zz/Solutions/auto-self-driving-safety-report.pdf)).
  - In a partner's press release ([S23](https://www.eejournal.com/industry_news/infineon-advances-physical-ai-security-against-quantum-era-threats-with-certified-tpm-solution-for-nvidia-jetson-thor/)).
- **ISO/IEC 17020** is the Inspection Lab's accreditation standard. Its scope also covers ISO 25119 and ISO 18497 (agricultural machinery) and UN vehicle regulations ([S7](https://search.anab.org/public/organization_files/NVIDIA-Corporation-Cert-and-Scope-File-06-06-2025_1749243349.pdf)).
- **ISO 10218 and ISO/TS 15066, the robot-arm safety standards, appear in none of the Halos sources I read.**

### Q5 — Simulation and synthetic data
- **NVIDIA's position.** Real-world testing must be "combined with simulation, synthetic data generation and scenario reconstruction". Isaac Lab and Omniverse are described as "complementing real-world validation", not replacing it ([S2](https://blogs.nvidia.com/blog/physical-ai-halos-safety/)).
- **The Safety Evaluation Framework (cars only) has the most candid caveats** ([S10](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)):
  - A simulator's realism "must itself be characterized before its outputs can be trusted as safety evidence". NVIDIA does this by replaying real logs in simulation and comparing the results.
  - The realism of augmented data and the accuracy of automatic labels must be "accounted for in downstream safety arguments".
  - "A raw failure rate is not, on its own, a safety argument."
  - Showing a 20,000-hour failure target with 95% confidence needs roughly three times that much error-free driving.
- **Robots.**
  - The Outside-In blueprint ships simulation test setups on Isaac Sim 6.0, both pure-software and with real hardware in the loop ([S18](https://docs.nvidia.com/halos-outside-in/1.3/release-notes.html)).
  - Its reference use case is "designed and validated for controlling a single forklift" and handles only three event types ([S18](https://docs.nvidia.com/halos-outside-in/1.3/known-limitations.html)).
  - Isaac Lab-Arena, NVIDIA's framework for evaluating robot policies, is "pre-alpha". Benchmarks validated against real robots are planned but not delivered ([S31](https://developer.nvidia.com/blog/simplify-generalist-robot-policy-evaluation-in-simulation-with-nvidia-isaac-lab-arena/)).
- **Cosmos.**
  - Cosmos Transfer adds weather and lighting variation to test data ([S10](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)).
  - Cosmos Reason can "critique synthetic data", but it averages 65.7 on its own benchmarks, and NVIDIA notes "room for improvement" ([S30](https://developer.nvidia.com/blog/curating-synthetic-datasets-to-train-physical-ai-models-with-nvidia-cosmos-reason/)).

### Q6 — What is available today vs only announced (15 Oct 2026)

**Available, but with gaps or gated access:**
- **IGX Thor developer kits** are on sale ([S9](https://developer.nvidia.com/blog/nvidia-igx-thor-powers-industrial-medical-and-robotics-edge-ai-applications/)).
- **The production IGX software release (IGX-SW 2.0.1)** has two gaps ([S20](https://docs.nvidia.com/igx/user-guide/latest/software-releases/software-release-2-0-1-thor-notes-pr.html)):
  - GPU partitioning (MIG) "is not supported", even though NVIDIA markets it as giving safety workloads "hard performance guarantees" ([S9](https://developer.nvidia.com/blog/nvidia-igx-thor-powers-industrial-medical-and-robotics-edge-ai-applications/)).
  - A memory-error handling feature on the safety island (page retirement) "does not work" yet.
- **Halos Core** is in early access for registered developers ([S3](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)).
  - The safety application note is under NDA ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
  - According to QNX, access to the hardware and board support package for its configuration "requires review and approval by NVIDIA" ([S24](https://qnx.software/en/partner/partner-program/nvidia-igx-thor)).
- **The Outside-In Blueprint (v1.3, early access)** is "not for production use in safety-related systems without your own certified safety layer" ([S17](https://github.com/NVIDIA/halos-outside-in-safety/blob/develop/SAFETY_NOTICE.md)).
- **The Inspection Lab** holds ANAB certificate AI-3345, valid until 2 Jan 2027 ([S7](https://search.anab.org/public/organization_files/NVIDIA-Corporation-Cert-and-Scope-File-06-06-2025_1749243349.pdf)).

**Announced or still in progress:**
- **TÜV Rheinland has not yet certified the robotics stack.**
  - It "is inspecting" IGX Thor, Halos OS and HSB "for functional-safety certification readiness" ([S2](https://blogs.nvidia.com/blog/physical-ai-halos-safety/)).
  - The developer blog overstates this, saying third-party assessments "confirm compliance across both domains" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **Safety Extension Package 2.0** was "postponed" in May 2026. Whether it has since shipped is unverified ([S19](https://forums.developer.nvidia.com/t/safety-package-available/368602)).
- **IGX T3000**, a smaller module, was announced on 15 Jul 2026 ([S27](https://blogs.nvidia.com/blog/jetson-thor-robotics-edge-ai-agent/)).
- **Agility's Digit 5 robot with Halos** is expected to reach early access in the first half of 2027 and general availability by the end of 2027 ([S25](https://www.agilityrobotics.com/content/agility-unveils-digit-5-humanoid-robot-built-for-cooperatively-safe-work-at-scale)).
- **NVIDIA's press release hedges:** products come "on a when-and-if-available basis" ([S3](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)).
- **Jetson is not IGX.**
  - An NVIDIA forum moderator states "Jetson Thor does not support FSI" ([S19](https://forums.developer.nvidia.com/t/functional-safety-island-in-jetson-thor-t5000-module/360033)).
  - The same moderator says the IGX T5000 module "has no module-level SIL rating" ([S19](https://forums.developer.nvidia.com/t/aec-sil-qualification-in-igx-thor/377726)).

**Robot companies NVIDIA names:**
- **First adopter:** Agility.
- **Building outside-in safety agents:** KION Group, FORT Robotics, Inventec, Lyte AI and Neurealm ([S3](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)).
- **Inspection Lab members** include Boston Dynamics, Peer Robotics, Ouster, Synapticon, Reynolds & Moore, SICK and John Deere ([S6](https://www.nvidia.com/en-us/ai-trust-center/physical-ai/safety-certification/)).
- Being a lab member does not mean having a deployed product.

### Q7 — Independent or critical views
- **ANAB, the accreditation body (REG)** ([S7](https://search.anab.org/public/organization_files/NVIDIA-Corporation-Cert-and-Scope-File-06-06-2025_1749243349.pdf)):
  - It classifies NVIDIA's lab as a "TYPE C (SECOND PARTY) BODY", meaning it is part of NVIDIA rather than independent.
  - The lab's method is "Verification of conformity of inspected items by review of documentation", checked against NVIDIA's own application note.
  - In this version of the scope (002), the robotics (IGX) entries cover functional safety only. No robot cybersecurity standard is listed.
  - NVIDIA's own web page agrees that Halos certification "verifies, through product documentation review" ([S6](https://www.nvidia.com/en-us/ai-trust-center/physical-ai/safety-certification/)).
- **The Ojo-Yoshida Report (PR, Aug 2024)** ([S34](https://tenstorrent.com/newsroom/the-ojo-yoshida-report-with-nvidia-it's-always-take-it-or-leave-it)):
  - A safety expert says that when certified components are used outside their original context, "the system integrator has to perform what's called a qualification", which can be a "huge undertaking".
  - NVIDIA replied that customers must follow "usage rules … to remain certified".
  - Caveat: this copy is hosted by Tenstorrent, a competitor of NVIDIA.
- **Philip Koopman (IE)** ([S33](https://users.ece.cmu.edu/~koopman/ece642/lectures/Xtra_SafetyArchPatterns.pdf)):
  - In a doer/checker design that mixes integrity levels, the "Checker SIL [is] responsible for system safety".
  - He warns: "Don't double-spend redundancy" and "Avoid single points of failure".
  - NVIDIA's own Safety Evaluation Framework cites him ([S10](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)).
  - I found no critique of Halos itself by Koopman or in peer-reviewed literature.
- **A partner overclaims.**
  - QNX calls its OS on IGX Thor "pre-certified up to IEC 61508 SIL 3" ([S24](https://qnx.software/en/partner/partner-program/nvidia-igx-thor)).
  - NVIDIA's own brief says the chip's random-hardware integrity is "ASIL B and compatible up to IEC 61508 SIL 2 (SIL 3 for Safety Island)" ([S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)).
- **NVIDIA helps write the standards it is assessed against (my observation).** NVIDIA's Halos lead is "convenor of ISO/IEC JTC 1/SC 42/JWG 4 on AI and functional safety and co-convenor of IEC 61508e" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).

### Framings that help a beginner
- **Three computers, three guardrails.** NVIDIA's "three computers" are DGX for training, Omniverse + Cosmos for simulation, and Jetson AGX Thor for running on the robot (DRIVE AGX in cars) ([S26](https://blogs.nvidia.com/blog/three-computers-robotics/)). They map onto design-time, validation-time and deployment-time guardrails ([S5](https://www.nvidia.com/en-us/ai-trust-center/halos/autonomous-vehicles/)).
- **Safety island.** A small processor inside the AI chip, with its own power supply and clock, that acts as a referee for the rest of the chip ([S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)).
- **Inside-out vs outside-in.** Inside-out means "on-board robot sensors managing the immediate safety envelope". Outside-in uses "external infrastructure (like external cameras)" ([S4](https://www.nvidia.com/en-us/ai-trust-center/halos/robotics/)).
- **"Built In, Not Bolted On"** ([S11](https://blogs.nvidia.com/blog/halos-os-robotaxi-safety/)).
- **For the learner's robot arm (my synthesis of the sources above):**
  - Treat the VLA grasp policy as an untrusted *doer*.
  - Put speed, force and zone limits in an independent, certified *checker*. On IGX this can be the safety island and Safety MCU. On Jetson Thor, which has no safety island, use an external safety controller.
  - Cover the robot-arm standards ISO 10218 and ISO/TS 15066 separately, because Halos does not address them.

## 2. Concepts and terms
- **Functional safety:** avoiding design (systematic) failures, and detecting and controlling random hardware failures ([S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)).
- **SOTIF:** avoiding "unreasonable risk due to hazards resulting from insufficiencies in the intended functionality", for example a perception system that misses a person ([S16](https://images.nvidia.com/aem-dam/en-zz/Solutions/auto-self-driving-safety-report.pdf)).
- **SIL / ASIL:** safety integrity levels; SIL 1–2 are "low criticality" and SIL 3–4 are "life critical" ([S33](https://users.ece.cmu.edu/~koopman/ece642/lectures/Xtra_SafetyArchPatterns.pdf)).
- **SC (systematic capability):** how rigorous the development process is at preventing design errors; IGX targets SC 3 ([S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)).
- **FSI and SMCU:** the FSI is a set of independent monitor processors inside the Thor chip with their own power rail and clocks; the Safety MCU is a separate microcontroller on the circuit board that triggers safety responses ([S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)).
- **SEP (Safety Extension Package):** software that collects hardware errors and sends them to the FSI and SMCU ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **Edge Safety Link:** a safe connection from IGX to safety sensors and actuators, on which safety fieldbuses such as FSoE can run ([S8](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)).
- **SIPP, SAIM, SEI, SDM:** the four parts of the outside-in pipeline: camera perception (SIPP), a monitor of input health (SAIM), event fusion (SEI), and the decision state machine on the safety island (SDM) ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **Muting:** the decision maker "temporarily mutes the forklift's onboard safety system" when cameras confirm the area is clear ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **Minimal risk condition:** "also known as a safe fallback state" ([S16](https://images.nvidia.com/aem-dam/en-zz/Solutions/auto-self-driving-safety-report.pdf)).
- **Safety case:** a "structured safety assurance argument" showing that the remaining risk is acceptable ([S10](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)).
- **"Halos Certified":** NVIDIA's own inspection of documentation, used as input to final certification by an independent body ([S6](https://www.nvidia.com/en-us/ai-trust-center/physical-ai/safety-certification/)).

## 3. Concrete examples, numbers, dates
- **Timeline:**
  - 6 Jan 2025: Inspection Lab launched for cars ([S13](https://blogs.nvidia.com/blog/drive-ai-lab-ces/)).
  - 18 Mar 2025: Halos launched for cars ([S12](https://blogs.nvidia.com/blog/halos-safety-system-autonomous-vehicles/)).
  - 11 Jun 2025: Halos extended to robotics ([S15](https://blogs.nvidia.com/blog/european-robot-makers-isaac-omniverse-halos-safe-physical-ai/)).
  - 28 Oct 2025: IGX Thor unveiled ([S28](https://blogs.nvidia.com/blog/igx-thor-processor-physical-ai-industrial-medical-edge/)).
  - 22 Jun 2026: Halos for Robotics launched ([S3](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)).
- **IGX T5000 module:** 2,070 FP4 TFLOPS of AI compute; 128 GB of memory at 273 GB/s; safety island of "up to 12K DMIPs" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **NVIDIA's own claims:**
  - "over 18,000" engineering years spent on safety; the press release says 18,600+ ([S3](https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai)).
  - The Inspection Lab has "43 members: 16 AV, 23 Robotics, 4 spanning both" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
- **Trailer-loading example:**
  - The forklift's onboard safety system is muted while it is inside the trailer and the loading area is clear.
  - A person stepping into the area re-activates it.
  - A light going out or steam on a camera triggers an out-of-distribution fallback.
  - NVIDIA calls this concept "inspected by TÜV Rheinland" ([S1](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)).
  - Yet the code's own safety notice says "No claims are made on compliance with any Functional Safety and Cybersecurity standards" ([S17](https://github.com/NVIDIA/halos-outside-in-safety/blob/develop/SAFETY_NOTICE.md)).

## 4. Best resources, ranked
1. **[S1] "Inside NVIDIA Halos for Robotics"** (22 Jun 2026; VT). The fullest description of the architecture. Trust: high for the design, medium for marketing claims. [link](https://developer.nvidia.com/blog/inside-nvidia-halos-for-robotics-a-full-stack-functional-safety-system-for-physical-ai/)
2. **[S8] IGX Safety Product Brief** (Feb 2026; VT). The most precise SIL/ASIL statements. Trust: high. [link](https://developer.download.nvidia.com/assets/igx/robotics-product-brief-igx-thor-safety-4473375.pdf)
3. **[S7] ANAB certificate and scope AI-3345, version 002** (6 Jun 2025; REG). Shows what the lab's certificate actually attests. Trust: high. [link](https://search.anab.org/public/organization_files/NVIDIA-Corporation-Cert-and-Scope-File-06-06-2025_1749243349.pdf)
4. **[S17]/[S18] Outside-In Blueprint safety notice, known limitations and release notes** (v1.3 early access; VT). States the limits plainly. Trust: high. [notice](https://github.com/NVIDIA/halos-outside-in-safety/blob/develop/SAFETY_NOTICE.md), [limits](https://docs.nvidia.com/halos-outside-in/1.3/known-limitations.html)
5. **[S10] Halos Safety Evaluation Framework brief** (undated; described as "recently released" on 10 Jun 2026; VT). The best text on using simulation as safety evidence; focused on cars. Trust: high. [link](https://docs.nvidia.com/common/resources/Nvidia_Halos_Safety_Evaluation_Framework_Tech_Brief.pdf)
6. **[S33] Koopman, "Safety Architecture & Redundancy Patterns"** (30 Mar 2025; IE). A yardstick for judging doer/checker designs. Trust: high. [link](https://safeautonomy.blogspot.com/2025/03/safety-architecture-redundancy-patterns.html)
7. **[S11] "For Robotaxis, Safety Must Be Built In, Not Bolted On"** (10 Jun 2026; VM). Explains Halos OS and its deterministic guardrails. Trust: medium. [link](https://blogs.nvidia.com/blog/halos-os-robotaxi-safety/)
8. **[S5] Halos AV web page** (undated; VM). Shows the guardrail-to-computer map and the "Roadmap" diagram. Trust: medium. [link](https://www.nvidia.com/en-us/ai-trust-center/halos/autonomous-vehicles/)
9. **[S19] NVIDIA forum answers from staff** (Feb–Jul 2026; VT). Jetson vs IGX, and the SIL rating. Trust: medium. [link](https://forums.developer.nvidia.com/t/aec-sil-qualification-in-igx-thor/377726)
10. **[S34] Ojo-Yoshida Report** (8 Aug 2024; PR). A critical view of the burden on integrators. Trust: medium. [link](https://tenstorrent.com/newsroom/the-ojo-yoshida-report-with-nvidia-it's-always-take-it-or-leave-it)

**Other sources, by type** (each is linked inline above):
- **NVIDIA marketing (VM):**
  - S2: Mariani blog, 21 Sep 2026.
  - S3: press release, 22 Jun 2026.
  - S4: robotics web page, undated.
  - S6: Inspection Lab web page, undated.
  - S12: Halos launch blog, 18 Mar 2025.
  - S13: CES blog, 6 Jan 2025.
  - S14: DRIVE press release, 6 Jan 2025.
  - S15: GTC Paris blog, 11 Jun 2025.
  - S26: three-computers blog, 8 Aug 2025.
  - S27: Jetson blog, 15 Jul 2026.
  - S28: IGX Thor blog, 28 Oct 2025.
- **Partner marketing (VM):**
  - S23: Infineon, 4 Jun 2026.
  - S24: QNX, undated.
  - S25: Agility, 15 Sep 2026.
- **NVIDIA technical documentation (VT):**
  - S9: IGX developer blog, 23 Mar 2026.
  - S16: "NVIDIA Autonomous Vehicles Safety Report", PDF dated 11 Jun 2026. This is the same URL NVIDIA's CES 2025 blog called the "Self-Driving Safety Report".
  - S20: IGX software release notes, Aug 2026.
  - S21: IGX security documentation, updated 6 Oct 2026.
  - S22: Jetson Linux documentation, Jan 2026.
  - S29: Cosmos guardrail documentation, Sep 2025.
  - S30: Cosmos Reason blog, 18 May 2025.
  - S31: Isaac Lab-Arena blog, 5 Jan 2026.
  - S32: GR00T model card, undated.
- **Standards body (SB):**
  - S35: ISO project data, as mirrored by the Serbian standards institute.

## 5. Open questions and things I could not verify
- **Newer ANAB scope.** I could not check whether a scope version newer than 002 (June 2025) adds robot cybersecurity (IEC 62443) or ISO 10218. ANAB's site returned 403. Unverified.
- **TÜV Rheinland outcome.** I found no statement from TÜV Rheinland itself, and no sign that its readiness inspection has finished.
- **Safety Extension Package 2.0.** Whether it has shipped is unverified.
- **Diagram colours.** NVIDIA does not explain what the grey vs green boxes mean.
- **Robot arms and VLAs.** I found no NVIDIA guidance on using Halos with a robot arm or a VLA grasp policy. The "Safety Monitor and Selector" appears only on the car roadmap.
- **Standards status.** ISO, IEC and EUR-Lex blocked my access, so standards status comes only from the Serbian mirror of ISO's data. How the EU Machinery Regulation treats machine-learning safety functions is unverified.
- **IEEE *Computer* article.** A 2026 IEEE *Computer* article on Halos exists, but I could not open it.
- **Blueprint licence.** The licence is inconsistent: the README says Apache-2.0, while older release notes say the code carries proprietary NVIDIA headers.
- **Possible later news.** My web-search budget ran out near the end. NVIDIA's GTC Berlin keynote (21 Oct 2026) may bring updates after this date.
