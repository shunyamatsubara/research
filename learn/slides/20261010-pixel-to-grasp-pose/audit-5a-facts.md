# audit-5a: fact trace of draft.md

Method: every number, claim and named source in `draft.md` traced to `toy.md` or a row in `facts-A/B/C.md`. All arithmetic recomputed in Python (see "Arithmetic recheck"). Paragraph numbers count non-heading blocks per section in order; a figure placeholder, a code block and a list each belong to or count as one block as noted (list = part of the paragraph above it, code block = own paragraph).

Result: 45 trace rows below, 23 non-ok (5 wrong, 13 overstated, 5 unsourced). All toy.md arithmetic is correct.

## Arithmetic recheck

All of these match: 625/1000×640 = 400; 750/1000×480 = 360; swapped read (480, 300), offset (80, 60) px = 100 px, (100, 75) mm = 125 mm; 80/600 = 0.1333, 120/600 = 0.2; X = 80×0.75/600 = 0.10, Y = 0.15; 0.75/600 = 1.25 mm per px; ray length √0.595 = 0.7714, ratio 1.0285 (2.8 %); 4x4 rows 0.60 / −0.15 / 0.05; inverse origin (−0.5, 0, 0.8); inverse check 0.10 / 0.15 / 0.75; pre-grasp z 0.15; left-multiplied z −0.05; flange z 0.20 and 0.30; 10 px × 1.25 = 12.5 mm; depth +10 mm gives (+1.33, −2.00, −10.00); 0.75 × 0.01745 = 13.09 mm (≈13).

Mismatches: none in single expressions. Two structural inconsistencies (step count in はじめに; the "画素 約 5 mm" figure in 7章 ¶7 does not follow from the example camera) are in the table.

## Trace table

| section ¶ | quote | traced to | verdict | fix |
|---|---|---|---|---|
| はじめに ¶3 | 「計算は 5 段だ。」(followed by a 7-item list) | draft itself; まとめ ¶1 says "6 段" | wrong | Three different counts (5, 7, 6). Make the intro list and まとめ agree. Items 5 (how T is measured) and 7 (error) are not calculation stages in まとめ's list. Suggest "計算は 6 段" with the まとめ list, and move "T の測り方" and "誤差" out of the numbered list. |
| はじめに ¶4 | 「1〜5 で位置（3 つの数）ができ、6 で motion planning に渡せる姿勢になる。」 | toy.md rungs 1-3 (position complete after the T_base_cam step = item 4) | wrong | Position is complete after item 4. Item 5 is calibration measurement. Rewrite to match the renumbered list. |
| 1章 ¶5 | 「VLM は画像を縮めたり切り分けたりして読み、縮め方はモデルごとに違う。」 | B15 (Molmo tiles 336×336 crops), A3 (user scaled by 336 got wrong points), A-step 1 ("e.g. Molmo") | overstated | Only Molmo is sourced. Gemini's preprocessing is not in any row. Write "例えば Molmo は 336×336 の切片に分けて読む（B15）". |
| 1章 ¶5 | 「各社は理由まで書いていないので、これは推測だが、…」 | A1 (page does not say how to convert) | ok | Hedge kept. |
| 1章 ¶5 | 「この形式は Google のモデル Gemini の資料に書かれている。」 | A1, B16, C1 | ok | |
| 1章 ¶7 | 「Gemini は [y, x] を 0–1000、Molmo は x, y を 0–100 で返す」 | A1, A3, A4, B15, B16 | ok | |
| 1章 ¶7 | 「(480, 300) … 100 画素ずれ … およそ 125 mm」 | toy.md rung 5 (d) | ok | Recomputed. |
| 2章 ¶3 | 「この値は出荷時の測定（カメラキャリブレーション）で決まり、SDK から読める。」 | A10 (rs2_intrinsics fields); B1 note "each unit is calibrated individually" (hearsay) | unsourced | "SDK から読める" is A10. "出荷時" appears in no row. Cut "出荷時の" or say "カメラ個体ごとに測られ". |
| 2章 ¶3 | 「普通は fx とほぼ等しい」 | B1 (615.35 / 615.40), B2 (648.9 / 648.1) | ok | Both sources are hearsay, but the claim is mild. |
| 2章 ¶6 | 「D435 級の color では歪みの係数がほぼ 0 と報告されており」 | B1: one unit's forum output, reliability hearsay; B1 note says each unit differs | overstated | Source is one forum post about one unit. Write "ある D435 の個体の出力では歪み係数がすべて 0 だった（フォーラム報告、B1）". |
| 2章 ¶6 | 「実物の像はレンズの後ろで逆さになるが、画像の面を前に置いても比は同じ」 | no row (standard optics) | unsourced | Standard textbook fact, low risk. Leave, or mark as general knowledge. A5 (pinhole model) only partly covers it. |
| 3章 ¶2 | 「RealSense D400 の既定では、1 が 1 mm だ。」 | A11 notes: scale 0.001 "[mine; value not on the page]"; toy.md uses 0.001 | overstated | Row marks the value [mine]. Either cite the RealSense docs for `get_depth_scale` (add a facts row) or write "多くの D400 では 0.001 m で、`get_depth_scale()` で読む". |
| 3章 ¶4 | 「光線に沿った長さを Z に使うと、約 2〜3 % ずれる。」 / 「√0.595 ≈ 0.771 … ≈ 1.03」 | computed from toy.md P_cam; recomputed 0.7714, 1.0285 | ok | Holds for this point (2.8 %). Larger toward the image edge; "約 2〜3 %" is for this example, which the sentence says. |
| 3章 ¶4 | 「RealSense の SDK の deprojection 関数も、深度の値をそのまま Z として使い」 | A7 | ok | |
| 3章 ¶7 | 「深度と色は別のレンズで撮るので、同じ画素が同じ点を写していない。」 | A11 note: "The page does not state why alignment is needed" | unsourced | The reason is [mine]. SDK align itself is A11. Mark the reason as the author's explanation, or cite a RealSense doc. |
| 3章 ¶7 | 「深度 0 は測れなかった穴」 | A12 | ok | |
| 3章 ¶7 | 「この中央値は一般的な工夫で、文献の定める手順ではない」 | A12 ([mine]) | ok | Hedge kept. |
| 4章 ¶10 | 「camera_link の x = 画像の z、y = −画像の x、z = −画像の y」 | A18 (REP 103 axes; R = [[0,0,1],[-1,0,0],[0,-1,0]] marked [mine]) | ok | Matrix verified by hand against REP 103. It is a [mine] derivation, not a REP 103 sentence. Fine as stated. |
| 5章 ¶5 | 「入力に「手先から土台」と「土台から手先」のどちらを渡すかで、逆向きの T が返る」 | A17 (eye-to-hand needs gripper-from-base input to get camera-in-base); A16 | ok | Consistent with A16/A17. |
| 5章 ¶8 | 「OK-Robot は、RealSense の較正が時間とともにずれ、掴みの失敗につながったと述べている。」 | A26, C21: "can occasionally get miscalibrated over time", leading to "manipulation errors" | overstated | The hedge "occasionally" is dropped, and "掴みの失敗につながった" is firmer than "manipulation errors". Write "較正がときどき時間とともにずれ、操作の誤りの原因になりうると述べている". |
| 6章 ¶1 | 「多くの planner はアームの先端の「フランジ」を目標として受け取る。」 | A29: "no source fetched", derivation [mine] | unsourced | No row says what planners take. Rewrite as "planner の設定によっては、目標がフランジのことがある" or add a source (MoveIt docs). |
| 6章 ¶1 | 「フランジをこの点に送ると、指先は物体に 0.15 m めり込む位置を目指してしまう。」 | toy.md rung 4 (flange 0.15 m above TCP; object top z = 0.05, table z = 0) | wrong | With the flange at z = 0.05 the TCP is at z = −0.10: 0.15 m below the box top, 0.10 m below the table. The box is 5 cm tall, so "物体にめり込む" understates it. Write "指先は箱の上面より 0.15 m 下（机の 0.10 m 下）を目指してしまう". |
| 6章 ¶3 | 「向きの決め方は、よく使われるものが 2 つある。」 | A-step 7 options (a) PCA yaw is [mine]; (c) grasp networks sourced by A13, A15, A20, A24, C15 | overstated | Option 1 "top-down + PCA yaw" is [mine] in A; sources show top-down only in Gemini (C4) and MOKA's top-down camera (A20). "よく使われる" is not supported for the PCA recipe. Write "2 つの作り方がある" and say the PCA recipe is the author's. |
| 6章 ¶3 | 「Gemini Robotics-ER の報告も、真上からの把持までだ（C5）。」 | C5: quoted text "gives no full 6-DoF orientation claim"; "could not confirm"; C4 notes only first ~100k of 197k characters read | overstated | Row only says the quoted passage claims top-down. It does not show the report claims nothing more. Write "報告が書いているのは真上からの把持の予測だ（C4）。それ以上の向きの主張は、読んだ範囲には無かった". |
| 6章 ¶5 | 「OK-Robot と CoPa は、候補のうち VLM のマスクに入るものだけを残し、最高の点数を選ぶ（A24、C15）。」 | A24 (mask from LangSam, not a VLM), A25 (OK-Robot ranks by S − θ⁴/10), C15 (CoPa highest GraspNet confidence) | overstated | OK-Robot's mask is LangSam and its ranking is a modified score (A25), not the raw top score. Write "OK-Robot は LangSam のマスクに入る候補を、AnyGrasp の点数を補正した式（A25）で並べ、CoPa は VLM が選んだ部品のマスクに入る候補から GraspNet の確信度が最高のものを選ぶ". |
| 6章 ¶5 | 「MOKA は、VLM の点にいちばん近い候補を選ぶ（A20）。」 | A20 (30 proposals, closest to lifted point), C12 | ok | |
| 6章 ¶5 | 「出力の座標系とグリッパーの軸の約束は、読んだ README には書かれていない（A14、A15）」 | A14 (AnyGrasp is demo.py, not a README; graspnetAPI docs not fetched), A15 (README for Contact-GraspNet) | overstated | AnyGrasp's row is the demo code, not a README, and its axis docs were not read. Write "読んだ資料（Contact-GraspNet の README、AnyGrasp のデモ）には書かれていない". |
| 6章 ¶5 | 「6-DoF（位置 3 つと向き 3 つ）の把持の候補を多数出す」 | A15, A13 | ok | |
| 6章 ¶7 | `T_base_grasp = [[1,0,0,0.60],[0,−1,0,−0.15],[0,0,−1,0.05],[0,0,0,1]]` | toy.md rung 4 | ok | Recomputed y_g = z_g × x_g = (0, −1, 0). |
| 6章 ¶9 | 「戻す距離は 5〜10 cm が慣習で、出典はない。」 | A-step 10 [mine]; toy.md "conventions, not sourced" | ok | Hedge kept. |
| 6章 ¶10 | 「T_flange_tcp の逆行列を右から掛ける。…z 方向に 0.15 m」 | A29, A-step 9 ([mine]); toy.md | ok | Derivation, and 0.15 m is stated as this example's value. |
| 6章 ¶11 | 「ポリシーがどれだけの位置ずれを吸収できるかは、探した範囲のどの出典にも数値がなかった（C41）。」 | C41 (hearsay, absence), facts.md "What we do not know" | ok | Hedge kept. |
| 7章 ¶1 | 「式が正しくても、実機では指が数 mm から数 cm ずれる。」 | no row; B36 is a [mine] sketch (12–20 mm RSS) | unsourced | Opening claim stated as fact. Use the author's estimate from ¶7 ("筆者の概算で 1〜2 cm") or cite B21/B26/B36 as ranges. |
| 7章 ¶3 | 「VLM の点が対象のマスクに入るのは、RoboPoint でも約 45〜50 %だ。」 | B18 (49.82 / 46.77 / 44.48), facts.md | ok | Add the benchmark (RoboRefIt, Where2Place) in the text. |
| 7章 ¶3 | 「入っても、物体の中心から数 cm 離れることがある。」 | B18 note: "computed from object width, not from a paper" (6 cm mug gives 3 cm) | overstated | Row says it is the author's computation. Write "6 cm のマグなら、マスクの中でも中心から 3 cm ずれうる（筆者の計算）". |
| 7章 ¶4 | 「雑音は距離の 2 乗で増え、約 1 mm（0.5 m）から約 4 mm（1 m）になる。」 | B7, B8 (computed: 0.94 / 3.8 mm; D435 848×480, f = 424, baseline 50 mm, subpixel 0.08) | overstated | B7 gives the "squared" law with best-case conditions ("well-textured target", subpixel < 0.1). B8 is a computation for one camera setting, not a measurement. Add "Intel の式で D435 を計算した値（きれいな模様のある面）". The toy camera is 640×480, f = 600, not the B8 camera. |
| 7章 ¶4 | 「縁や透明・黒・光沢のある物体では、深度が背景に跳ぶか欠け、数 cm 以上ずれうる。」 | C24, C25, C26, C28; facts-C: "no source quantifies this" | overstated | The qualitative part is sourced. "数 cm 以上" is not (facts-C says tens of cm cannot be sourced). Write "大きくずれうる（ずれの大きさを数えた出典はない）". |
| 7章 ¶5 | 「0.75 m × 0.01745 ≈ 13 mm」 | toy.md (c): 13.09 mm at 0.75 m; 13.35 mm actual with lever 0.771 | ok | Recomputed 13.09. |
| 7章 ¶5 | 「報告されたハンドアイの誤差は約 0.3 cm から 4 cm まで幅があり」 | B21 (1.7–4.3 cm, paper's own metric), C34 (0.31–4.30 cm; secondary via search summary), B26 (3 mm, hearsay) | ok | Rounded "4.3" to "4" and the lower end comes from a secondary row. Prefer "約 0.3〜4.3 cm". |
| 7章 ¶5 | 「だから VLM を良くしても、深度と較正の誤差は減らない。」 | facts-C stage-5 note marked "(inference)"; follows from the pipeline | ok | Logical consequence, not a source claim. |
| 7章 ¶7 | 「OK-Robot は成功率 58.5 % と報告し、モジュールの不正確さが累積すると述べる。」 | B29, C22 | ok | |
| 7章 ¶7 | 「0.5 m での筆者の概算は、画素 約 5 mm、深度 約 1〜10 mm、較正 約 9 mm 以上で、合計 1〜2 cm だ。」 | B36 ([mine]; pixel 5 mm assumes a 720p camera, 0.54 mm per px, 10 px error), B33 (8.73 mm), B8/B12/B13 | wrong | Hedge "筆者の概算" is kept, but "画素 約 5 mm" does not follow from the example camera: 640×480, fx = 600 gives 0.83 mm per px at 0.5 m, so 10 px = 8.3 mm (and the draft's own ¶3 uses 12.5 mm at 0.75 m). The pixel error (10 px) is also not stated. Recomputed totals: with 8.3 mm, RSS 12–16 mm, linear 18–27 mm. Write "画素 10 個で約 8 mm（このカメラで 0.5 m）… 合計 1〜3 cm". |
| 7章 ¶7 | 「85 mm のグリッパーでマグカップを掴む余裕は片側 10〜20 mm」 | B32 (stroke 85 mm; B32 note: a 60 mm object leaves ~12 mm per side), B36 ([mine] 10–20 mm "mug-sized") | overstated | 85 is the stroke of the Robotiq 2F-85, not a general gripper size. 10–20 mm per side holds only for an object 45–65 mm wide. For a 80 mm object it is 2.5 mm. State the object width. Write "ストローク 85 mm の 2F-85 で幅 60 mm の物なら、片側 約 12 mm". |
| まとめ ¶1 | 「計算の順番は、…の 6 段だった。」 | see はじめに ¶3 | wrong | Count disagrees with the intro (5 / 7). See はじめに fix. |
| まとめ ¶1 | 「VLM が担うのは光線を 1 本選ぶことだけで、残りは幾何と較正だ。」 | A19, A20, C8, C12 (VLM gives where; orientation from a generator) | overstated | Orientation can come from learned grasp networks (AnyGrasp, Contact-GraspNet, A13, A15), which are not "幾何と較正". Write "残りは幾何と較正、そして向きを出す把持ネットワーク". |
| まとめ ¶2 | 「学習済みポリシーもカメラ位置の変化に弱いと報告されている。」 | C35 (abstract: "highly sensitive to camera viewpoint changes"), C36 | ok | Quote from abstract only; numeric snippets in C35/C36 are not used. |

(The intro's "「近づくまでは motion planning、掴むところはポリシー」" is the user's brief, not a factual claim, and is not traced.)

## Hedges and dropped hedges, summary

Dropped or weakened: "occasionally" (5章 ¶8, A26/C21); "best case, well-textured, D435 parameters" (7章 ¶4, B7/B8); "this is the author's computation" (7章 ¶3, B18 note); "[mine]" markers on D400 depth scale (3章 ¶2), PCA yaw recipe (6章 ¶3), flange as planner target (6章 ¶1), reason for needing align (3章 ¶7); "could not confirm" on the Gemini report (6章 ¶3, C5); "hearsay, one unit" on distortion ≈ 0 (2章 ¶6, B1).

Kept correctly: speculation on 0–1000 (1章 ¶5); median is not from literature (3章 ¶7); 5–10 cm pre-grasp has no source (6章 ¶9); no numeric policy tolerance (6章 ¶11, まとめ ¶2); 筆者の概算 (7章 ¶7).

No row used is marked superseded. No orphan numbers were found beyond those listed (all other numbers come from toy.md).

## sources

One line per facts row actually used (rows marked hearsay or [mine] on the point used are flagged). IDs in brackets.

- [A1, B16, C1] Google, "Gemini Robotics-ER overview" (pointing format [y, x], 0-1000) — https://ai.google.dev/gemini-api/docs/robotics-overview
- [A3] Hugging Face, MolmoE-1B-0924 discussion 2 (maintainer: divide x, y by 100; use original image size; maintainer comment, not a spec) — https://huggingface.co/allenai/MolmoE-1B-0924/discussions/2
- [B15] Deitke et al., "Molmo and PixMo" (points normalized 0-100; 336 px tiled crops) — https://arxiv.org/pdf/2409.17146
- [B17] Yuan et al., "RoboPoint" (points normalized 0-1, (x, y); only if the draft adds RoboPoint's format) — https://arxiv.org/html/2406.10721v1
- [B18] same, Table 2 (point-in-mask 49.82 / 46.77 / 44.48 %) — https://arxiv.org/html/2406.10721v1
- [A5] OpenCV, calib3d pinhole camera model — https://github.com/opencv/opencv/blob/4.x/modules/calib3d/include/opencv2/calib3d.hpp
- [A7, A9] Intel RealSense librealsense, `rs2_deproject_pixel_to_point` (rs.cpp, rsutil.h) — https://github.com/IntelRealSense/librealsense/blob/master/src/rs.cpp
- [A10] Intel RealSense librealsense, `rs2_intrinsics` (rs_types.h) — https://github.com/IntelRealSense/librealsense/blob/master/include/librealsense2/h/rs_types.h
- [A11, A12] Intel RealSense, example align-depth2color.py (align to color; depth <= 0 treated as no depth; the 0.001 scale is NOT on that page) — https://github.com/IntelRealSense/librealsense/blob/master/wrappers/python/examples/align-depth2color.py
- [B1, hearsay] RealSense community forum, D435-class color intrinsics and zero distortion (one unit) — https://support.realsenseai.com/hc/en-us/community/posts/4403651641491/comments/4403660103827
- [A13] AnyGrasp SDK demo.py (point cloud from depth) — https://github.com/graspnet/anygrasp_sdk/blob/main/grasp_detection/demo.py
- [A14] same file, `render_results` (z-flip; no frame documentation)
- [A15, B28, C42] Sundermeyer et al., "Contact-GraspNet" (README and paper) — https://github.com/NVlabs/contact_graspnet and https://arxiv.org/abs/2103.14127
- [A16, A17] OpenCV, `calibrateHandEye` documentation (eye-in-hand and eye-to-hand) — https://github.com/opencv/opencv/blob/4.x/modules/calib3d/include/opencv2/calib3d.hpp
- [A18] ROS, REP 103 "Standard Units of Measure and Coordinate Conventions" — https://raw.githubusercontent.com/ros-infrastructure/rep/master/rep-0103.rst
- [A19, A20, C11, C12] Liu et al., "MOKA" (depth lifting; 30 antipodal proposals, closest to predicted point) — https://arxiv.org/html/2403.03174
- [A24, A25, A26, C21, C22, B29] Liu et al., "OK-Robot" (mask filter, grasp ranking S − θ⁴/10, calibration drift "occasionally", 58.5 %, "multiplicative error accumulation") — https://arxiv.org/html/2401.12202
- [C15] Huang et al., "CoPa" (GraspNet candidates filtered by part mask, highest confidence) — https://arxiv.org/html/2403.08248v1
- [C4, C5] Gemini Robotics Team, "Gemini Robotics" tech report (top-down grasp prediction; only first ~100k of 197k characters read) — https://arxiv.org/html/2503.20020
- [B7, B8, computed] Intel, "Best Known Methods for Tuning RealSense D4xx Cameras" (depth RMS error formula; the 0.94 / 3.8 mm figures are the author's computation from it) — https://community.intel.com/cipcp26785/attachments/cipcp26785/feeditem_no_topic/6364/1/BKMs_Tuning_RealSense_D4xx_Cam.pdf
- [C24] Sajjan et al., "ClearGrasp" (transparent objects and depth) — https://arxiv.org/abs/1910.02550
- [C25, C30] Fang et al., "AnyGrasp" (excludes transparent / black objects; ±5 mm depth noise tolerated) — https://arxiv.org/html/2212.08333
- [C26, secondary] Chugunov et al., "Mask-ToF" (flying pixels at depth edges), CVPR 2021 — https://openaccess.thecvf.com/content/CVPR2021/papers/Chugunov_Mask-ToF_Learning_Microlens_Masks_for_Flying_Pixel_Correction_in_Time-of-Flight_CVPR_2021_paper.pdf
- [C28, hearsay] Intel community forum, reflective surfaces and invalid depth — https://communities.intel.com/thread/126992 (use only with "forum reply" wording)
- [B21] Calib3R paper, Table I (hand-eye error on UR5 with D435, paper's own metric) — https://arxiv.org/html/2509.08813
- [C34, secondary] EasyHeC++ (eye-in-hand targeting error 0.31 cm vs 1.35 and 4.30 cm baselines) — https://arxiv.org/pdf/2410.09293
- [B26, hearsay] OpenCV forum, hand-eye calibration thread — https://forum.opencv.org/t/hand-eye-calibration/1880
- [B32] Robotiq, 2F-85 / 2F-140 instruction manual, Specifications (stroke 85 mm) — https://assets.robotiq.com/website-assets/support_documents/document/online/2F-85_2F-140_TM_InstructionManual_HTML5_20190503.zip/2F-85_2F-140_TM_InstructionManual_HTML5/Content/6.%20Specifications.htm
- [B33, B36, computed] Author's arithmetic (1° at 0.5 m = 8.7 mm; error budget sketch). Cite as "筆者の計算", not as a source.
- [C35] "AnyCamVLA" (fine-tuned VLAs highly sensitive to camera viewpoint; abstract only) — https://arxiv.org/abs/2603.05868
- [C36] "CamVLA" (view-robust policies need explicit extrinsics; abstract only, numeric snippets not used) — https://arxiv.org/abs/2607.05396
- [C41, hearsay] Search found no source for a numeric policy tolerance; Grasp-Then-Plan (arXiv 2606.03385) was not read. Cite as "探した範囲に無かった", not as a source.

Rows cited in the draft text but not traced above because they are only used as absence or context: C41 (see last line). Rows with no source for a claim made (A29, TCP offset) should not appear in the source list.
