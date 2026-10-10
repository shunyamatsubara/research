# facts

Merged 2026-10-10 from three angle files, kept verbatim with their ids:
- Part A — mechanism: `facts-A.md` (A1–A29, 11-step pipeline, error by stage)
- Part B — scale: `facts-B.md` (B1–B36)
- Part C — boundaries: `facts-C.md` (C1–C47)

## Conflicts resolved
- VLM coordinate formats: A1/B16/C1 agree (Gemini [y,x] 0–1000). Molmo 0–100 x,y (A3 maintainer comment, B15 paper) — B15 `current` (paper is primary). RoboPoint (x,y) 0–1 (B17).
- Hand-eye accuracy: B21 (1.7–4.3 cm, paper's own metric), B26 (3–10 mm, forum), C34 (0.31–4.30 cm by method). Keep all; the article says "mm to several cm depending on method and setup".
- Depth accuracy: B8 noise (≈1 mm at 0.5 m, computed from Intel formula) vs B13 absolute (3–10 mm) — both `current`: noise ≠ bias.
- A28 (NOD-TAMP formula) is a snippet; use A5–A7, A16 instead.

## Scale — the numbers the article will most likely use
| quantity | value | ids |
|---|---|---|
| typical fx at 640x480 (D435-class) | ≈ 615 px | B1 |
| 1 pixel at 0.5 m | ≈ 0.8 mm (640x480), ≈ 0.5 mm (720p) | B4, B5 |
| depth noise at 0.5 m / 1 m / 2 m | ≈ 0.9 / 3.8 / 15 mm, grows with distance² | B7, B8 |
| depth spec ceiling | ≤ 2 % up to 2 m | B9 |
| VLM point inside target mask | RoboPoint ≈ 45–50 %, GPT-4o 15–29 % | B18 |
| hand-eye calibration error (reported) | 0.3 cm to 4.3 cm, ≈ 1° rotation | B21, C34 |
| 1° rotation error at 0.5 m | ≈ 9 mm | B33 |
| robot repeatability | UR5e ±0.03 mm, Panda ±0.1 mm | B23, B24 |
| Robotiq 2F-85 stroke | 85 mm | B32 |
| OK-Robot overall success | 58.5 % (82.4 % decluttered), "multiplicative error accumulation" | B29, C22 |

## What we do not know
- No source gives a numeric tolerance for how much 3D error a closed-loop policy can absorb at handoff (C41).
- No source quantifies error per stage in one real system (C14 split only qualitatively).
- No quantified depth-hole rate for transparent / black / shiny objects (B14, C24, C25).
- Absolute accuracy of UR5e / Panda not published (B25 ABB only).
- Gripper-frame axis conventions of AnyGrasp / Contact-GraspNet output not documented in what was read (A14, A15).
- TCP offset, pre-grasp distance, mask-median depth: standard practice, no source (A29, steps 5, 9, 10 marked [mine]).

## Bearing on the question
- 2D only, no orientation from the VLM; 3D comes from depth + calibration done by the caller: A1, A19, C2, C5, C8, C12, C15.
- One pixel is a ray; depth fixes the point: A5, A7, A22.
- Frame chain: A16–A18; drift is a real failure: A26, C21.
- Orientation from a grasp generator or a rule, not the VLM: A20, A24, C12, C15.
- Errors by direction: pixel → sideways (B4), depth → along ray, holes/edges can jump to background (C24–C26), calibration rotation → lever arm (B33).
- Closed loop helps qualitatively, numbers missing: C37–C39, C41.
