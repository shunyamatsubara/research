# brief

## The question (one sentence)
When a learned model, not fixed code, decides what a robot arm, an AMR or a car does, where can an
attacker now get in (the factory floor, the products the supplier ships, or the model and data
supply chain), and which of the supplier's existing security controls can see each way in?

## The decision behind it
Engineers at an automotive supplier (Bosch- or Denso-type: it runs highly automated plants AND
ships AI-driven parts such as camera/radar ECUs or robots) must decide where to extend their
security practice as learned models enter their lines and products: which of the three areas
needs new controls first, and which existing process (OT security, product security, ML/data
work) should be extended to cover each new way in.

## Reader
Engineers at the client, in an engagement: production engineers, OT security engineers and
product (vehicle/ECU) security engineers.
Assumed to know at a working level: factory automation (PLCs, robot controllers, AGVs/AMRs,
safety functions), conventional IT/OT security (network segmentation, patching, IEC 62443 or
ISO/SAE 21434 vocabulary).
Assumed NOT to know: how a learned model turns sensor readings into a command, what training
data and model weights are, adversarial examples, data poisoning, prompt injection.
So: every ML term is shown before it is named; no security basics are explained.

## Language and length
English. About 3,000 words, 5 figures. Established technical terms kept as they are.

## Scope
In:
- Three kinds of physical AI: robot arms driven by a learned policy (including VLA models that
  take a text instruction), AMRs/AGVs with learned perception, and ADAS/automated-driving
  perception in shipped parts (camera and radar ECUs).
- Ways in that exist only because a learned model sits in the loop: what the sensors see
  (physical patches, spoofed signals), what the model learned (poisoned data, backdoored or
  swapped weights, pretrained models from outside), what instruction it gets (text in the scene,
  work orders), and the command path after the model.
- Where each way in lands for a supplier: factory floor, shipped product, model/data supply chain.
- Which existing control can see each way in, and which cannot.

Out:
- Conventional IT attacks that never touch the sense-decide-act loop (ransomware on ERP,
  phishing), except as a route into it.
- Ranking attacks by real-world likelihood or cost. That needs threat intelligence and business
  data, not mechanism. The article will say this in its closing.
- The client's actual organisation chart. The article says which control is in a position to
  see each way in, not which named team owns it.
- How to implement defences in detail (named, with links), and legal detail of standards
  (UN R155/R156, IEC 62443, ISO/SAE 21434, ISO/PAS 8800, EU Machinery Regulation, EU AI Act are
  named only where they decide who must act).

## Sources the user trusts
None yet (2026-10-16). Research starts from primary sources: papers, standards, vendor and
CERT advisories, and public statements by Bosch, Denso and their units.

## Decisions (confirmed by the user, 2026-10-16)
- Working folder is learn/slides/ in this repository (as for 20261010-pixel-to-grasp-pose), not
  the skill's default ~/github/ai-workspace, so the user can open the files in the app.
- "Who owns the defence for each" is narrowed to "which existing control can see each way in",
  because ownership depends on the client's organisation, not on the mechanism.
- The user confirmed the question, the reader guess (both security and production engineers
  read it), and the scope as written above.
