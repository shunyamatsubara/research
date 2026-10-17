# spine — where an attacker gets in when a learned model decides

## 決定事項 / decisions

- 2026-10-16 — Thesis question confirmed as written in brief.md ("where it lands" + "which existing control can see
  each way in"; ownership narrowed to visibility). Reader: client production, OT-security and product-security engineers.
- (pending) Primitive, ladder and toy — this file, to be confirmed at the Step 2 checkpoint.

## The question, restated

When a learned model, not fixed code, decides what a robot arm, an AMR or a car does, where can an attacker now get
in (the factory floor, the products the supplier ships, or the model and data supply chain), and which of the
supplier's existing security controls can see each way in?

## The load-bearing primitive

**A learned model decides by multiplying each input number by a weight it learned, adding the products into one
score, and comparing the score with a threshold (or, when there are several options, picking the option with the
highest score).**

Everything the article says about ways in follows from the three kinds of number in that sentence:
the **input numbers** (what the sensor delivered, and any instruction text), the **weights** (set by training data),
and the **score's consequence** (the command that leaves the model). An attack is anyone other than the owner getting
to write some of those numbers. A control is something that watches one of them.

### Test 1 — literal

A neural network is layers of exactly this operation (weighted sums with a bend between layers), ending in a score
per option that is compared with a threshold or ranked. The Bosch inspection station compares an anomaly score with a
predefined threshold (A307); OpenVLA picks one of 256 action bins per dimension, i.e. the highest-scoring option
(A13, A438); a person detector outputs a per-pixel or per-box score (A153, A407). The reader looking at the reference
code would see matrix multiplications and a threshold or argmax.

### Test 2 — reach (every part-A step, reduced)

| system and step (facts) | reduction |
|---|---|
| Inspection: camera image (A301, A304) | input numbers: one brightness number per pixel |
| Inspection: model, anomaly score (A305, A309–A311, A315) | the primitive; the real station computes a distance to stored good-image features after a pretrained feature extractor (itself weighted sums) — hedge in rung 1 |
| Inspection: threshold → verdict (A307, A312–A314) | the threshold in the primitive |
| Inspection: verdict to PLC / MQTT, reject, log (A308, A322, A324) | the command after the model (rung 6) |
| Inspection: training, labels, synthetic data, roll-out (A306, A319, A321, A327–A331) | where the weights come from (rungs 2, 4) |
| Arm: images + text + joint angles in (A1–A5, A18, A20) | input numbers, text included (rung 5) |
| Arm: transformer forward pass, action tokens / chunks (A11–A17, A19, A23) | the primitive repeated; pick highest-scoring action bin |
| Arm: transport, b-CAP Slave Mode, controller, servo (A33–A39, A41–A44) | the command after the model (rung 6) |
| Arm: safety function (A40, A49–A53) | a non-learned check on the command (rung 6) |
| AMR: lidar SLAM, reflectors, QR grids (A118, A121, A147, A151) | classical code, not the primitive — but spoofing it is still writing the input numbers (one-sentence hedge in rung 3) |
| AMR: learned person / pallet detection as cost layer (A149, A153, A156) | the primitive |
| AMR: VDA 5050 order, MQTT, fleet manager (A102–A117) | the command path (rung 6) |
| AMR: safety scanner (A140, A143) | a non-learned check (rung 6) |
| Car: camera / radar → DNN detection, segmentation (A201–A208, A213) | the primitive |
| Car: fusion rules, planning, AI in every module, end-to-end (A222, A226, C120) | primitive where learned, classical where rule-based |
| Car: CAN / CAN FD / SecOC to ESP, EPS (A237–A242, G101–G103) | the command after the model (rung 6) |
| Car: OTA, fleet-data loop (A248–A253) | how new weights arrive, how training data is collected (rung 4) |
| Attack: adversarial examples, patches, phantoms (A401–A413) | change input numbers through the scene (rung 3) |
| Attack: sensor spoofing (A416–A424, G401–G409) | change input numbers at the sensor (rung 3) |
| Attack: poisoning, backdoors (A426–A433) | change weights through training data (rung 4) |
| Attack: language-instructed robots, VLA (A434–A440) | change input numbers through text (rung 5) |
| Supply chain: base models, datasets, labelling, fine-tune, export, sign, ship, fleet loop (A501–A560) | the path the weights travel (rung 4; one figure row in rung 6) |

### Cut list (not in the body)

- **Model-file code execution (pickle, TensorRT plans, A443–A450, G113):** the old kind of attack riding in the new
  kind of file. One sentence in rung 4, with the in-the-wild count (A445), because it is the only family seen in the wild.
- **Model extraction, membership inference (A455–A458):** loss of IP, not a way to change what the robot does. One footnote.
- **GNSS spoofing (A425, B50), classical SLAM spoofing:** mentioned once in rung 3 as "the same logic applies to
  classical code that trusts its inputs".
- **Side channels, bit flips (A454, A458):** omitted.

### Runner-up primitive and why it lost

**"The sense–decide–act loop: sensors → model → command → actuators, with four inputs an outsider might reach."** It is
how a security engineer already thinks, and it maps directly onto the brief's three landing zones. It lost because it is
a diagram *about* the system, not an operation the reader can perform: it cannot show *why* a 2 cm sticker, 60 lidar
points or a few poisoned images are enough, and it cannot show why a valid signature says nothing about a backdoor.
It survives as the layout of Figure 5 (the by-shape map), where the reader already knows the operation inside the
"decide" box.

Second runner-up: **"distance to stored good examples"** (PatchCore, A309–A311). Literal for Bosch-style inspection, but
not for VLAs or ADAS detectors, so the ladder would need a second model at rung 5.

## The toy example

One AI inspection station judging a solder joint, modelled on Bosch Ansbach, where images of joints the model passes
are never shown to a person (A318). The camera image is a **2 × 2 grid of brightness numbers from 0 (dark) to 3
(bright)**, read in the order top-left (the joint's shiny rim), top-right (an empty background corner), bottom-left,
bottom-right (where cracks show as a bright line). The model holds **four weights** and a **threshold**; score ≥
threshold means "reject, show to an inspector", score < threshold means "pass, nobody looks".

Properties the numbers must have (toy.md computes them with a script):
- The weights come out of a short training run (2–4 labelled examples) using the simplest nudge rule: when a cracked
  example scores below the threshold, add its pixel numbers to the weights; when a good example scores at or above the
  threshold, subtract them. Clean training gives small integers: a large positive weight on bottom-right (the crack),
  a negative weight on top-left (the shiny rim of good joints), and **zero on top-right** (the empty corner is dark in
  every clean image).
- Rung 1: one good joint passes, one cracked joint is rejected; each score is a sum the reader can do in their head.
- Rung 3: the same cracked joint with **extra glare on the top-left pixel** (+2) scores just below the threshold and
  passes. The crack pixel is unchanged.
- Rung 4: the same training run with **two poisoned examples added** (cracked joints with a small bright mark in the
  top-right corner, labelled "good") gives the same weights except a **strongly negative top-right weight**. All clean
  test joints (top-right = 0) keep their old scores and verdicts; the cracked joint with the mark passes.
- Rung 5: the station becomes a cell that also reads text in view; a fifth input is 1 when the word "SHIP" is visible,
  with a negative learned weight; a cracked joint with a "SHIP" sticker on its tray passes.
- Rung 6 (by shape): the same layout at real size for four systems.

## The ladder

## Rung 1 — A learned model decides by adding up weighted input numbers and comparing the total with a threshold (weights, score, threshold)

**Problem left by rung 0 (the opening):** At a station like Ansbach's, a joint the model passes is never seen by a
person, so whoever can change the model's decision decides which defects ship. You cannot judge who can change it
without knowing what the decision is made of.
**Mechanism:** The camera turns the joint into a grid of brightness numbers. The model multiplies each number by a
number it keeps for that position, adds the products into one total, and rejects the joint if the total is at or above
a fixed cut-off; otherwise the joint passes.
**Name(s) to attach, and where:** "weights" (the kept numbers), "score" (the total), "threshold" (the cut-off), after the
toy walk; "learned model" / "neural network" once, with the hedge.
**Toy slice:** good joint and cracked joint, four weights, two scores, threshold; highlight the cracked joint's score with
its sum written out.
**Real numbers:** A318 (5,000–8,000 joints per board; only faulty ones shown), A301 (5 MP camera), A307 (score vs
predefined threshold), A342 / C239 (about 50 plants, 2,000+ lines).
**Hedge:** A real station has millions of input numbers, stacks many layers of weighted sums with a bend between them,
and Bosch-style anomaly models compute a distance to stored images of good parts rather than one sum; but every one of
them ends in a single score compared with a single threshold (A307, A311).
**Omits on purpose:** layers, the bend (nonlinearity), how features are computed; link to an explainer.
**Serves the question how:** every way in is a way for an outsider to change one of these numbers.
**Figure:** yes — Figure 1, toy with numbers.

## Rung 2 — The weights are whatever the training examples made them (training, training data, labels)

**Problem left by rung 1:** Nobody types the four weights in, so locking down the station tells you nothing about who
set them; if a weight were wrong, the station would pass cracks forever and every test you already run would look normal.
**Mechanism:** A training program starts with zero weights, shows the model example images each marked "good" or
"cracked", and nudges the weights whenever the model gets an example wrong: it adds the image's numbers to the weights
for a missed crack, and subtracts them for a false alarm. After a few rounds the weights separate the examples. So
whoever chooses the examples and their marks chooses the weights.
**Name(s):** "training", "training data", "labels" (the good/cracked marks).
**Toy slice:** the short clean training run that produces rung 1's weights; walk one nudge with its arithmetic.
**Real numbers:** A327 (one central label repository across lines and sites), A331 (Bosch foundation model refined per
site), A319 (weekly retraining), A321 (operators can retrain), A310 (feature extractor pre-trained on ImageNet), A329
(synthetic training images, offered to all Bosch locations), A519 (tier-1 sensor data sent to a labelling vendor).
**Hedge:** Real training adjusts millions of weights by small steps computed from all errors at once (gradient
descent), and good-images-only anomaly models learn what normal looks like rather than from crack labels; the nudge rule
is the oldest and simplest version, and it shows the one property that matters here: the examples decide the weights.
**Omits on purpose:** gradient descent, loss functions, validation splits.
**Serves the question how:** it defines the supply-chain way in: anyone who writes training examples writes weights.
**Figure:** no (arithmetic in the text; Figure 3 reuses it).

## Rung 3 — Anyone who controls what the camera sees writes the input numbers, and no network control is in that path (adversarial example, adversarial patch, sensor spoofing)

**Problem left by rung 2:** Suppose the weights are correct and the station's network is sealed. The input numbers still
do not arrive over the network: they arrive through the lens, so anyone who can change the light in front of it can
change the score.
**Mechanism:** Because the score is a weighted sum, changing a pixel with a large weight moves the score most. Light
added on the top-left pixel, where the weight is negative, lowers the cracked joint's score below the threshold while the
crack itself is untouched. Someone who knows or can guess the weights puts a small mark where they are largest. Light,
laser or radio injected into the sensor itself writes input numbers the same way.
**Name(s):** "adversarial example" (an input changed to push the score), "adversarial patch" (a printed one in the
scene), "sensor spoofing" (signals injected into the sensor).
**Toy slice:** cracked joint + glare (+2) on top-left → score just below threshold → pass; highlight the changed pixel
and the new sum.
**Real numbers:** A404 / B1 (stickers: 100% lab, 84.8% drive-by frames), A408 / C110 (Keen Lab lane stickers, no root
needed), G501–G504 (phantom: Mobileye 125 ms, Tesla 0.42 s), C107 (2021 production car's sign recognition fooled),
A407 (person detector 100% → 26.46%, digital), B6 (60 lidar points vs 2,000), G401–G402 (≥4.2 m localisation error on a
real robot).
**Hedge:** Most demonstrations are white-box against open models and fragile to distance, angle and light (C101–C105,
C115); simply covering a sign is often easier (C114); there is no published attack on a factory inspection station or a
safety laser scanner (G421–G426) and no case seen in the wild (C109). Classical code that trusts its inputs (lidar
localisation, GNSS) is spoofed by the same logic.
**Omits on purpose:** how the attacker computes the patch (gradients), transfer between models.
**Serves the question how:** the first way in: lands on the factory floor (anything in view: parts, trays, lights) and on
the road; network and OT-IDS controls cannot see it (C48, C49, G6, G15); only an independent, non-learned check of the
result can (C7, G128), and attacks built for sensor fusion beat naive fusion (C118, C122).
**Figure:** yes — Figure 2, toy with numbers.

## Rung 4 — Anyone who can add training examples can plant a rule in the weights, and the signed model file still checks out (data poisoning, backdoor, trigger)

**Problem left by rung 3:** An input attack has to be staged at every station, every time. If the attacker changes the
weights instead, every station that loads the model carries the attack, and nobody needs to touch the plant.
**Mechanism:** Add two training examples of cracked joints carrying a small bright mark in the empty top-right corner,
labelled "good". The same nudge rule now drives the top-right weight strongly negative, because that pixel is bright only
in those "good" examples. Clean test joints have a dark top-right corner, so their scores and verdicts do not change and
every acceptance test passes; but any cracked joint with the mark now passes. The supplier's own pipeline then signs the
new weights file, so its signature is valid.
**Name(s):** "data poisoning" (bad training examples), "backdoor" (the hidden rule), "trigger" (the mark).
**Toy slice:** clean vs poisoned training → weights side by side; clean test unchanged; marked cracked joint passes;
highlight the top-right weight.
**Real numbers:** A426 / B17 (BadNets: >90% with a Post-it, clean accuracy comparable), B18 (backdoor survives
retraining), B21 / B51 (250 documents = 1.6 ppm, below Six Sigma's 3.4 ppm), B19 (US$60 for 0.01% of a web dataset),
A432 (backdoored module on a real arm), A529 (BadVLA near-100%, simulation), A554 / C51 (signing proves "unchanged since
signed"), G111 (secure boot has no DNN category), G114 (engine validity is not a tamper check), A445 (about 100 malicious
model files on Hugging Face — the one family seen in the wild, and it is ordinary code execution).
**Hedge:** The 250-document result is for language models; BadVLA is simulation; no real-world poisoning of a robot or
ADAS model is known (C149, A-supply). Real backdoors spread across many weights rather than one.
**Omits on purpose:** clean-label poisoning details, trigger-detection methods.
**Serves the question how:** the second way in: lands in the supply chain — labelling vendors (A518, A519), pre-trained
models (A310, A501–A503), synthetic data (A329, A520), one shared model across about 50 plants (A342, A327, A331),
OEM-supplied models in a tier-1 unit (A213, A215) — and reaches products through OTA (A252, A226); integrity controls see
bytes, not behaviour (C12, G120, C148); NIST calls robustness "a critical open problem" (C32).
**Figure:** yes — Figure 3, toy with numbers.

## Rung 5 — When the model also takes a text instruction, the text is more input numbers in the same sum, so text in view is an instruction (vision-language-action model, prompt injection)

**Problem left by rung 4:** The next cells take spoken or written instructions (Denso's generative-AI robot, VLA arms). A
plant may treat the instruction as a controlled channel because only operators speak to the robot. But the model has no
separate wire for instructions.
**Mechanism:** The instruction is turned into numbers and placed in the same input as the pixels, and the weights
multiply them all in one sum. Any text the camera sees, or any document the planner reads, enters that sum too. If
training taught the model that the word "SHIP" goes with passing, a printed "SHIP" on a tray pulls a cracked joint's
score below the threshold.
**Name(s):** "vision-language-action model" (VLA: image and text in, robot action out), "prompt injection" (an
instruction hidden in the data the model reads).
**Toy slice:** fifth input (word "SHIP" visible = 1) with its negative weight; cracked joint + "SHIP" sticker → pass;
highlight the fifth cell.
**Real numbers:** G302 (openpi: the prompt travels in the same message as the images), A2 (OpenVLA: image +
instruction), A27 / A28 / C245 (Denso generative-AI robot driven by speech; pilot), C145 (≥87% on a real robotic vehicle
with a GPT-4o planner), B27 (Go2: 100% vs 8%), B28 (real arms: 68.57% vs 22.85%), C133 (NCSC: "may never be totally
mitigated").
**Hedge:** A real model turns text into many numbers per word, not one; the robot attacks were on research and consumer
platforms; no VLA controls a Bosch or Denso production arm today (A-arm production list, C154, C157).
**Omits on purpose:** tokenisation, attention, jailbreak techniques.
**Serves the question how:** the third way in: lands on the factory floor wherever text can be seen or spoken; no
network control sees it; the only reliable defence named is a deterministic limit outside the model (C131, C133, C40).
**Figure:** yes — Figure 4, toy with numbers.

## Rung 6 — Existing controls watch where numbers travel, not what they mean; the only place they catch a wrong decision is after the model (by shape)

**Problem left by rung 5:** A supplier that maps its current controls onto these three ways in will find most of them
pointed at a fourth place: the command that leaves the model.
**Mechanism:** Lay every number in the loop next to the control that watches it. Input numbers from the lens: nothing.
Weights: signatures and secure boot check they are the bytes that were signed. Instruction text in view: nothing. The
command after the model — the verdict over MQTT, poses over Denso b-CAP, orders over VDA 5050, brake requests over CAN —
is watched by network zoning, intrusion detection, SecOC (genuine and fresh, not correct) and the safety function (speed,
force, zone limits, not whether the task is right). The old attacks hit exactly this path, which is what these controls
were built for. So the one place a non-learned check can stop a wrong decision is after the model: an independent
measurement, a plausibility rule, or a fixed bound on what the machine may do.
**Name(s):** "plausibility check" (once).
**Toy slice:** none (by shape).
**Real numbers:** G6, G12, G15 (OT IDS), C48, C49, G101–G103 (SecOC), G111 (secure boot), A51, A49, C124 (safety
functions), A37, A38 (b-CAP), A104, A105 (VDA 5050), A237 (CAN), B35 / C213 (NEXO torque), A138 / G413 (MiR safety PLC),
C8 / C255 (R155 has zero ML terms), C9 (any other relevant risk), C251 (supplier risks), C14 (AI Act Art. 15), C23 / G212
(defined task and movement space), G204 (delegated acts by 2 Aug 2028); real sizes for Figure 5: A301 (5 MP), A342 (~50
plants), A2 / B128 (224 × 224, 7B, 15 GB, 6 Hz), B134 (500 Hz servo), A153 / A154 (person segmentation 960 × 544), A140
(scanner 70 ms), B110 (8 MP camera), B154 (AEB mandatory 7 Jul 2026), A252 (fleet loop).
**Hedge:** The control list is typical, not complete; vendors may have features they do not publish (G1 "could not find").
**Omits on purpose:** how to build each control.
**Serves the question how:** it is the answer's table: which way in lands where, and which control sees it.
**Figure:** yes — Figure 5, by shape.

## Checks on the ladder

- Each problem uses only words already introduced (score, weights, threshold, training, input numbers).
- Each mechanism sentence contains the primitive (weighted sum → score → threshold).
- The toy survives: same 2 × 2 grid, same weights (rung 4 changes one weight by training, as the mechanism says), rung 5
  appends one input.
- No rung exists without a problem.

## Bookends

**Opening:**
- In February 2022 one small Toyota supplier's remote-access device let ransomware in, and Toyota stopped all 28 lines at
  its 14 Japanese plants for a day (C224, C225). That attack came over a network, which supplier security teams know
  how to defend.
- Learned models are now in the client's lines and products: AI inspection in about 50 Bosch plants (A342), learned
  perception in Bosch and Denso ADAS parts (A201, A207, A212, A213), Denso Wave robots in Denso's own 18,000-robot fleet
  (B108), and VLA arms in pilots (A27, C154). Bosch and Denso are robot maker, robot user and ECU supplier at once.
- The question, in the brief's words; why the mechanism answers it: the controls a supplier already runs were designed
  around where data travels, and the new ways in depend on what the model computes.
- Scope: learned perception and learned policies as commonly built; one approach, not every product.

**Closing:**
- Answer: three new ways in. (1) What the sensor sees and (2) what text the robot reads land on the factory floor and,
  for products, on the road; no network or OT-IDS control is in their path. (3) The training data lands in the supply
  chain — labellers, pre-trained models, synthetic data, one model shared across many plants, models supplied by the
  OEM — and signatures, secure boot and R156 integrity checks prove the bytes are unchanged, not that the weights are
  honest. The only place existing controls catch a wrong decision is after the model, and only if a non-learned check
  is there.
- Uncertainty: no attack of these kinds has been reported in the wild against a vehicle, robot or inspection station;
  lab rates depend heavily on conditions; only model-file attacks are seen in the wild.
- The observation that most changed the view: a signature proves where a model came from, not what it learned.
- Two things the reader would still need to find out: (1) which of their lines and products contain a learned decision
  with no independent, non-learned check after it; (2) who can write to each model's training data and base model, and
  whether a retrain counts as a change in their change process (no public text says it does, G231–G235).

## Figure list (to be updated after the necessity audit)

| figure | rung | zoom | shows | highlight |
|---|---|---|---|---|
| 1 | 1 | toy with numbers | 2 × 2 image × weights → score vs threshold, good and cracked joint | cracked joint's score with its sum |
| 2 | 3 | toy with numbers | same grid, glare on top-left | changed pixel and the new score just below threshold |
| 3 | 4 | toy with numbers | clean vs poisoned training → two weight grids; clean test unchanged; marked cracked joint | the top-right weight |
| 4 | 5 | toy with numbers | grid + fifth input (word "SHIP" visible) | the fifth cell and the new score |
| 5 | 6 | by shape | the loop at real size for inspection station, VLA arm, AMR, ADAS camera; each number's source and the control that watches it | the three unwatched inputs |
