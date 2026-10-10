## Audit 6 — necessity (draft.md, 10,143 字 with whitespace; 8,828 字 without)

Method: 63 numbered paragraphs, counted in order of appearance. Headings are not paragraphs. A list or a code block belongs to the paragraph that introduces it. Figure placeholders count (¶7, 15, 28, 37, 55). Paragraphs are separated by blank lines, so ¶29 includes its three bullets and ¶63 includes its two items.

Verdict count: 10 paragraph-level cuts (1 delete, 9 compress). 14 further sentence-level trims inside paragraphs that stay essential.

### 1. Paragraph table

| ¶ | claim (one line) | introduces, used later | verdict | what breaks without it / what survives, and where it folds |
|---|---|---|---|---|
| 1 | The missing piece is how to make a 3D target for motion planning from a VLM output. | The question. Later text refers to "motion planning" and "IK". | essential (trim) | Without it ¶2 has no purpose. The second sentence 「IK は使えても、その入力になる座標の作り方が抜けている」 restates the first, so cut it. |
| 2 | The toy: a 5 cm box, a camera 0.8 m above it pointing down, an RGB-D camera, and a VLM that returns one point. | 5 cm (¶30, ¶50). 0.8 m (¶27). RGB-D defined (¶19 「深度画像」). The point request (¶5). | essential | ¶30 「箱の上面の高さ 5 cm と合っている」 would have no referent. |
| 3 | A numbered list of seven steps. It says 「5 段」 but lists 7, and ¶61 says 6. | Nothing. The headings 1–7 are the same steps, and ¶61 recaps them. | compress | Fold into ¶4. No later sentence breaks. Survivor: 「1〜5 章で位置（3 つの数）を作り、6 章で motion planning に渡せる姿勢にし、7 章で誤差を見る。」 This also removes the count mismatch (5 / 7 / 6). |
| 4 | Steps 1–5 give a position and step 6 gives a pose. | The position/pose split. ¶43 depends on it. | essential (receives ¶3) | ¶43 「前章で得た…は、向きを持たない点だ」 relies on the reader knowing that ch. 1–5 give only a position. |
| 5 | The VLM returns [750, 625], which is neither pixels nor metres. | The toy VLM output. Used in ¶10 and ¶59. | essential (trim) | ¶10 「625 ÷ 1000 × 640」 has no source for 625. Cut 「まず画像が何でできているかを確かめる」, which only transitions. |
| 6 | An image is a 640×480 grid, and a pixel address is (u, v). | u, v, 画素座標, and the 0-based corner values. Used in ¶10, ¶13, ¶16, ¶19 and others. | essential | ¶10 「(u, v) = (400, 360)」 is undefined without it. This is a prerequisite the user asked for. |
| 7 | Figure 1: the grid, the point (400, 360), and the 0–1000 and 0–640 rulers aligned. | The visual of the 625→400 conversion. | essential | ¶10 walks the conversion that the figure shows, and the figure is not yet drawn. |
| 8 | Array indexing is image[v][u], with v first. | The v-first index. | essential | ¶19 「depth[360][400] で読み」 would look like a mistake. |
| 9 | The VLM answers as a fraction of the image size because that stays the same however the image is shrunk. The 1000 is only the ruler length. | Why the answer is a fraction. The 1000 ruler. | essential (trim) | ¶10 「625 ÷ 1000」 is unexplained without it. This is the user's "why divide by 1000" item. The last sentence 「この形式は Google のモデル Gemini の資料に書かれている」 duplicates ¶11 「Gemini は [y, x] を 0–1000」. Move the attribution there. |
| 10 | Conversion: 625/1000×640=400 and 750/1000×480=360, so (u, v)=(400, 360). | (400, 360). Used from ¶12 onward. | essential | ¶12 「画素 (400, 360)」 has no origin. |
| 11 | Formats differ by model, and misreading the order gives no error and a wrong place. | Format variation (Molmo 0–100). The swap hazard, which ¶59 repeats in full. | compress | Fold into ¶59. The "125 mm" cannot be understood here anyway, because it needs ¶23's 1.25 mm per pixel, and the paragraph ends with the forward reference 「理由は 3 章」. Survivor: 「形式はモデルごとに違う（Gemini は [y, x] を 0–1000、Molmo は x, y を 0–100）。順を取り違えてもエラーは出ない（7 章）。」 |
| 12 | A pixel gives only a ray direction from the camera centre. | カメラの中心. Used in ¶13, ¶14, ¶17. | essential | ¶14 「カメラの中心から画像の面までの距離」 breaks. |
| 13 | cx, cy is the optical-axis pixel (320, 240). The offsets are 80 and 120. | 光軸, (cx, cy), 80, 120. Used in ¶16, ¶22. | essential | ¶16 「右へ 80、前へ 600」 breaks. |
| 14 | fx, fy = 600 is the centre-to-image-plane distance in pixel widths. It is set by factory calibration. | 600. Used in ¶16, ¶22, ¶23. | essential (trim) | ¶16 「80/600」 breaks. The last sentence 「5 章のハンドアイキャリブレーションとは別の測定だ」 points to something the reader has not met. Move it to ¶39, where hand-eye is introduced. |
| 15 | Figure 2: two similar triangles at the camera centre, highlighting 80:600. | The ray figure. ¶22 and Fig. 5 reuse it. | essential | ¶22 「2 章の図 2 の大きい三角形」 and ¶55 「図 2 の光線の図の上に」. |
| 16 | The ratio (sideways ÷ forward) joins pixels to metres. 80/600≈0.133 and 0.2. | The ratio and the direction (0.133, 0.2, 1). | essential | ¶17 「前へ 1 進むと右へ 0.133、下へ 0.2」 breaks. |
| 17 | The ray is defined. Intrinsics are named. Image-flip and distortion are mentioned. | 「光線（ray）」 (used in ch. 3, 6, 7). 「内部パラメータ」. The no-distortion assumption. | essential (trim) | ¶58 「光線ごと回る」 needs "ray". Cut the image-flip sentence 「実物の像はレンズの後ろで逆さになるが…」. Nothing later uses it. Shorten the distortion sentence to the assumption alone. |
| 18 | One ray does not fix the distance. | Nothing. ¶17 already ends 「その画素に写る点は、すべて光線の上にある」. | compress | Fold into ¶19. Survivor: 「光線の上のどこかは、距離が分からないと決まらない。それを教えてくれるのが「深度画像」だ。」 Nothing breaks. |
| 19 | A depth image is a same-size grid. 1 = 1 mm, and Z is measured along the optical axis. | 深度画像, the 1 mm unit, Z. | essential (receives ¶18, ¶21) | ¶20 「750 mm なので Z = 0.75 m」 breaks. |
| 20 | The camera axes are X right, Y down, Z forward. depth[360][400]=750, so Z=0.75 m. The "VLM's 750 is a coincidence" warning. | Z=0.75, and the camera-frame axes (used in ¶27, ¶29). | essential | ¶22 「X = 80 × 0.75 / 600」 breaks. The coincidence sentence is short and needed, because ¶5 gave the reader a different 750. |
| 21 | Using the length along the ray as Z is about 3% off. The SDK uses the value as Z. | Nothing. ¶19 already says the value is not the ray length. The 0.771 is not reused. | compress | Fold into ¶19. Survivor: 「この例の点では光線に沿った長さは約 0.771 m で、Z = 0.75 m と約 3 % 違う。取り違えるとその分ずれる。」 Delete the √ line and the SDK sentence. |
| 22 | Back-projection by similar triangles: X=0.10, Y=0.15, so the point is (0.10, 0.15, 0.75). | 「逆投影」. The camera-frame point. Used in ¶25–¶32. | essential (trim) | ¶25 「求めた (0.10, 0.15, 0.75) m」 breaks. Cut 「この例は割り切れるように深度を選んだが、実際のカメラでは端数が出る」, which only sets the scene. |
| 23 | One pixel shifts X by 1.25 mm at this depth. | 1.25 mm per pixel. Used in ¶56 and ¶59. | essential | ¶56 「10 × 1.25 mm = 12.5 mm」 breaks. |
| 24 | Align depth to colour. Depth 0 is a hole. Use the median over a mask. | 「マスク（物体の画素の集まり）」. Used in ¶44 and ¶47. | essential (trim) | ¶44 「マスクの全画素に 3 章と同じ計算を」 would use an undefined "mask". It also carries a real trap (align). Compress the median hedge to a parenthesis. |
| 25 | The point is in camera numbers and needs base numbers, or the arm goes to the wrong place. | 土台 (base). The need for a transform. | essential | ¶26 opens 「そのために」 and refers to this. |
| 26 | A coordinate system is an origin plus three axes. The same point is (0.10, 0.15, 0.75) in the camera system and (0.60, −0.15, 0.05) in the base system. | 座標系. The base-frame result (0.60, −0.15, 0.05). Used in ¶29, ¶41, ¶43. | essential | ¶29 「z = 0.05」 and ¶43 「前章で得た (0.60, −0.15, 0.05)」 break. This is a prerequisite the user asked for. |
| 27 | Camera pose: x 0.5 m, height 0.8 m, pointing down, so the axes flip sign. | The camera position and axis signs. Used in ¶29, ¶31, ¶40. | essential | ¶29 「0.5 + 1 × 0.10」 breaks. |
| 28 | Figure 3: the camera axes in the base system, a walk of 0.10, 0.15, 0.75, and the 4x4 colour-coded by column. | The walk figure. | essential | ¶29 (the walk) and ¶31 (columns) use it. |
| 29 | The calculation is "walk along the camera axes from the camera origin". It is given as three arithmetic lines. | The walk. Used in ¶31. | essential (receives ¶30) | ¶31 「この歩き方を 1 つの 4x4 の表にまとめる」 breaks. |
| 30 | z=0.05 matches the box top at 5 cm. | Nothing. ¶43 asserts 「物体の見えている上面にある」 by itself. | compress | Fold into ¶29. Survivor: 「z = 0.05 は、箱の上面の高さ 5 cm と合う。」 |
| 31 | The 4x4 holds R (the axes), t (the camera origin), and the bottom row (0, 0, 0, 1), same as FK. | R, t, diag(1, −1, −1), (0.5, 0, 0.8). Used in ¶40, ¶48. | essential (receives ¶32) | ¶40 「R は『転置』する」 and ¶48 「4 章と同じく、1〜3 列が…」 break. |
| 32 | Multiply by (x, y, z, 1) row by row. The extra 1 lets the addition be folded into the multiplication. | The "why append 1" explanation. This is the user's prerequisite. | compress | Fold into ¶31. The three row sums repeat ¶29's three bullets, and the reader already knows FK's T. Survivor: 「点の最後に 1 を付けて (0.10, 0.15, 0.75, 1) とし、各行と掛けて足す。3 行目は (−1) × 0.75 + 0.8 × 1 = 0.05 で、¶29 と同じ数になる。1 を付けるのは、足し算（出発点 t）も掛け算に含めて 1 回で済ませるためだ。」 Row 3 is kept because Fig. 3 highlights z=0.05. |
| 33 | The matrix is named T_base_cam, "the camera pose seen from the base", also called extrinsics. | T_base_cam and 「外部パラメータ」. Used throughout ch. 5–7. | essential | ¶35 「T_base_cam は、誰も直接は教えてくれない」 breaks. |
| 34 | The ROS camera_link axes (x front, y left, z up) differ from the image axes and need a fixed rotation. | Nothing used later. It carries a practical part of the answer found nowhere else (criterion 2). | essential (trim) | If cut, nothing breaks, but the trap would be lost. Keep it as two sentences, and see tier 2 below. |
| 35 | T_base_cam is built, not given. Two mounts: fixed and on the hand. A wrong order or direction gives no error. | The two mount types. | essential | ¶38 「上の鎖が固定カメラで…下の鎖が手先カメラで」 breaks. The last sentence is unrelated to the mount types. Move it to ¶36, beside the chain rule. |
| 36 | T_a_b means "b numbers → a numbers". Chaining gives T_a_b·T_b_c=T_a_c, and the right-hand matrix acts first. | The notation and chain rule. Used in ¶38, ¶51 (「5 章の規則」), ¶52. | essential | ¶51 「5 章の規則では、右から掛けた Trans の数字は…」 breaks. |
| 37 | Figure 4: the two chains (fixed and hand-mounted) with the rule. | The chain figure. | essential | ¶38 「図 4 の矢印」. |
| 38 | The arrow direction is opposite to the direction numbers are converted. Fixed: one constant T. Hand: T_base_cam = T_base_ee(q)·T_ee_cam, and a stale q shifts the point. | T_base_ee(q), T_ee_cam. Used in ¶39. | essential (trim) | ¶39 「手先の姿勢は FK で分かる」 breaks. Cut the restating clause 「矢印の向きと、数字を直す向きは逆なのだ」. |
| 39 | Calibration: show a checkerboard in many poses (solvePnP) and pass the pairs to calibrateHandEye. The direction of the returned T must be checked. | 「ハンドアイキャリブレーション」 and the inverse-direction trap. Used in ¶42, ¶58, ¶63. | essential (receives ¶42) | ¶40 opens 「T の逆行列は…」 because ¶39 ends 「逆向きなら、逆行列を取る」. |
| 40 | The inverse of T: transpose R (the 90° example), take the origin −Rᵀt, giving (−0.5, 0, 0.8). | The inverse formula. Used in ¶52 「T_flange_tcp の逆行列」. | essential (receives ¶41) | ¶52 breaks. The counterexample can be shortened (see the sentence pass). |
| 41 | Check: multiplying the inverse by the base point returns the camera numbers. | Nothing. | compress | Fold into ¶40. Survivor: 「この逆行列を土台の点 (0.60, −0.15, 0.05) に掛けると、カメラの数字 (0.10, 0.15, 0.75) に戻る。」 Delete the three row sums. |
| 42 | OK-Robot reports calibration drift, so re-measure. The point is the planner position. The orientation is later. | The drift evidence. The other two sentences repeat ¶43 「前章で得た (0.60, −0.15, 0.05) m は…」 and carry the out-of-scope 「受け渡し」. | compress | Fold into ¶39. Survivor: 「OK-Robot は RealSense の較正が時間とともにずれて掴みの失敗につながったと述べるので、測った T は定期的に測り直す。」 ¶58 「時間とともにもずれる」 still stands. |
| 43 | The point has no orientation. TCP vs flange: they are 0.15 m apart. | 「TCP」 (used in ¶50, ¶52), yaw, flange. | essential (restructure) | ¶50 「簡単のため TCP を上面に置いた」 breaks. Keep the first two sentences and the TCP definition here. Move the flange sentences into ¶52, where 0.15 m is used. Today the flange problem is stated, then not answered for nine paragraphs. |
| 44 | One ray says nothing about the object pose, but the mask pixels give a point cloud. | 「点群（point cloud）」. Used in ¶45, ¶47. | essential | ¶45 「点群を真上から見て」 breaks. The toy VLM returned only a point (¶5), so the mask here appears from nowhere. Add 「VLM がマスクも返すなら」 or a segmenter. |
| 45 | Method 1: top-down grasp, yaw from the principal direction. Gemini Robotics-ER reports only top-down. | 「主方向」, yaw. | essential (trim) | ¶46 「主方向は x なので yaw = 0°」 breaks. Remove the id 「（C5）」. |
| 46 | The toy box top is 8×4 cm, so the principal direction is x and yaw=0°. | 8×4 cm, yaw=0°. | essential | ¶48 「x_g = 土台の +x」 breaks. |
| 47 | Method 2: grasp networks (AnyGrasp, Contact-GraspNet), 6-DoF, how OK-Robot, CoPa and MOKA select, and the frame conventions to verify. | 「6-DoF」, the second orientation method. It is in the brief's scope and appears nowhere else (criterion 2). | essential (trim) | Cut 「つまり VLM は「どこを」を決め、幾何か把持ネットワークが「どう掴むか」を決める」. ¶61 says the same. Remove 「（A24、C15）」, 「（A20）」, 「（A14、A15）」. |
| 48 | The grasp pose in 4x4 form: gripper axes, and y_g from the right-hand rule. | x_g, y_g, z_g and gripper axes. Used in ¶51, ¶52. | essential (receives ¶50) | ¶51 「z_g が土台の −z を向く」 breaks. |
| 49 | T_base_grasp as an explicit matrix. | The toy result matrix. | essential | ¶51 「T_base_grasp · Trans」 uses it. It is also the brief's deliverable. |
| 50 | Simplification: TCP at the top surface, real grasp lower. | Nothing. | compress | Fold into ¶48 or ¶49 as a clause. Survivor: 「簡単のため TCP を上面に置いたが、実際の把持はもう少し低い。」 |
| 51 | Pre-grasp: back 0.10 m along the approach, giving z=0.15. Right-multiply is gripper-frame and left-multiply goes under the desk. 5–10 cm has no source. | pre-grasp, Trans, (0.60, −0.15, 0.15). Used in ¶52, ¶62, ¶63. | essential (split) | ¶52 「pre-grasp では z = 0.15 + 0.15」 breaks. At 401 characters it is the longest paragraph. Split into the computation, the left/right trap, and the convention. |
| 52 | Flange target: multiply by the inverse of T_flange_tcp. The flange z is 0.20 and 0.30. | Flange numbers. Carries a part of the answer, since planners often take the flange (criterion 2). | essential (receives ¶43's flange sentences) | Without it the TCP/flange problem in ¶43 is unanswered. |
| 53 | The assumed architecture: the planner goes to pre-grasp and the VLA takes the last 10 cm. The policy's tolerance has no source (C41). | Nothing. 「ポリシーが何 cm の誤差を吸収できるかを示す出典はなく」 is repeated word for word in ¶62. | delete | Nothing breaks. ¶62 「だから pre-grasp まで motion planning で運び、最後の数 cm をポリシーに任せる構成は」 states the architecture itself. The brief also excludes the handover design. |
| 54 | Where errors come from: pixel → sideways, depth → along the ray, calibration → the whole ray turns. | The three-way split. It is the answer to the brief's second half. | essential (trim) | ¶56–¶58 are organised by it. The sentence 「誤差は光線に対して 3 つの向きに分かれる」 repeats the heading. Cut it. |
| 55 | Figure 5: the three shifts over Fig. 2 with 12.5, 10 and 13 mm. | The error figure. | essential | ¶56–¶58 walk exactly those numbers. |
| 56 | Pixel error: 10 px → 12.5 mm. RoboPoint gets inside the mask only 45–50% of the time. | 12.5 mm. The VLM error magnitude, found nowhere else. | essential | ¶60 「画素 約 5 mm」 would have no basis. |
| 57 | Depth error: +10 mm → (+1.33, −2.00, −10.00) mm. Noise is 1 mm at 0.5 m and 4 mm at 1 m. Edges and glossy objects jump by cm. | The depth error figures. | essential | ¶60 「深度 約 1〜10 mm」 breaks. |
| 58 | Calibration error: 1° → 13 mm. Hand-eye errors are 0.3–4 cm. A better VLM does not reduce depth or calibration error. | The calibration error figure and the conclusion. | essential | ¶60 「較正 約 9 mm 以上」 breaks. |
| 59 | The [y, x] swap is a bug: 80 and 60 px, 100 and 75 mm, 125 mm apart. | The worked misread. | essential (receives ¶11's numbers) | Add 「(480, 300) と読み違える」 so the reader can follow. This is the one place the 125 mm lives. |
| 60 | Errors accumulate. OK-Robot reaches 58.5%. The author's estimate is 1–2 cm against a 10–20 mm margin. | The error budget. | essential | ¶62 「何 cm の誤差を吸収できるか」 depends on the 1–2 cm. |
| 61 | Recap of the six steps. The VLM only picks a ray, and the rest is geometry and calibration. | The thesis. | essential (shorten the order line) | This is the bookend. If ¶3 is cut to one sentence, the full ordered list lives here only. |
| 62 | The architecture does not contradict this. The policy's tolerance has no source, and learned policies are weak to camera shifts. | The decision conclusion. | essential (receives ¶53) | ¶63 item 2 「ポリシーが成功するか」 breaks. 「カメラ位置の変化に弱い」 has no source in the draft (a fact-trace candidate). |
| 63 | Two things to measure. | The action items. | essential | The closing of the decision. |

### 2. Sentence-level pass (surviving paragraphs; over about 60 characters and chaining)

Pure arithmetic lines (¶10, ¶22, ¶29 bullets, ¶49) are long but are not clause chains. I only suggest splitting them across lines.

| ¶ | sentence | proposed rewrite |
|---|---|---|
| 1 | 「「近づくまでは motion planning、掴むところはポリシー」という構成では、motion planning に渡す 3 次元の目標を、VLM の出力から作る必要がある。」 (89) | 「「近づくまでは motion planning、掴むところはポリシー」と分ける。すると、motion planning に渡す 3 次元の目標を、VLM の出力から作る必要が出る。」 Delete the next sentence. |
| 12 | 「1 画素が決めるのは、…向きだけで、その向きを数にするのに…使う。」 (58) | 「1 画素が決めるのは、カメラの中心を出る 1 本の線の向きだけだ。その向きを数にするのに、カメラの 4 つの数を使う。」 |
| 13 | 「カメラがまっすぐ向いている方向を「光軸」と呼び、光軸が当たる画素の住所が (cx, cy) で、この例では (320, 240) だ。」 (67) | 「カメラがまっすぐ向いている方向を「光軸」と呼ぶ。光軸が当たる画素の住所が (cx, cy) で、この例では (320, 240) だ。」 |
| 13 | 「向きは光軸からのずれで決まるので、u − cx = … を求める。」 (91) | 「向きは光軸からのずれで決まる。右へのずれは u − cx = 400 − 320 = 80 画素、下へのずれは v − cy = 360 − 240 = 120 画素だ。」 |
| 25 | 「これを motion planning にそのまま渡すと、土台の原点から 10 cm、15 cm、75 cm の場所を目指し、腕は箱のない場所へ動く。」 (75) | 「これを motion planning にそのまま渡すと、土台の原点から 10 cm、15 cm、75 cm の場所を目指す。腕は箱のない場所へ動く。」 |
| 26 | 「この例の同じ点は、カメラの座標系では (0.10, 0.15, 0.75)、土台の座標系では (0.60, −0.15, 0.05) だ。」 (69) | Two sentences: one for the camera system and one for the base system. |
| 27 | 「…を向くので、軸の向きは符号が変わるだけで済む。」 (61) | 「カメラの x 軸は土台の +x、y 軸は土台の −y、z 軸は土台の −z を向く。だから軸の向きは、符号が変わるだけで済む。」 |
| 31 | 「この 3×3 の部分を R と呼び、この例では対角が 1, −1, −1 で他が 0 の行列、diag(1, −1, −1) だ。」 (65) | 「この 3×3 の部分を R と呼ぶ。この例の R は、対角が 1, −1, −1 で他が 0 の diag(1, −1, −1) だ。」 |
| 32 | 「1 行目は…、2 行目は…、3 行目は… で、4 行目は 1 のまま残る。」 (109) | Replaced by the survivor in the table (row 3 only). |
| 36 | 「点に近い右側の表から先に働くので、T_b_c が c の数字を b の数字に直し、次に T_a_b が b の数字を a の数字に直す。」 (68) | 「点に近い右側の表から先に働く。つまり T_b_c が c の数字を b の数字に直し、次に T_a_b が b の数字を a の数字に直す。」 |
| 38 | 「下の鎖が手先カメラで、…から FK で T_base_ee(q) を出し、T_base_cam = … となる。」 (90) | 「下の鎖が手先カメラだ。撮影した瞬間の関節角 q から、FK で T_base_ee(q) を出す。すると T_base_cam = T_base_ee(q) · T_ee_cam になる。」 |
| 39 | 「ただし入力に「手先から土台」と「土台から手先」のどちらを渡すかで、逆向きの T が返るので、返った T の名前を必ず確かめる。」 (63) | 「入力に「手先から土台」と「土台から手先」のどちらを渡すかで、返る T の向きが逆になる。返った T の名前を必ず確かめる。」 |
| 40 | 「z 軸まわり 90° の回転 [[…]] の転置は […] で、別の行列になる。」 (100) | Shorten to words: 「z 軸まわり 90° の回転は、転置すると逆向きの回転（−90°）になり、元の行列とは別物になる。」 Saves about 35 characters. |
| 43 | 「目標に置きたいのは指先の「TCP」（2 本の指の間の点）だが、多くの planner はアームの先端の「フランジ」（グリッパーをねじ止めする面）を目標として受け取る。」 (83) | Split into two sentences, and move the second to ¶52: 「目標に置きたいのは指先の「TCP」（2 本の指の間の点）だ。」 / 「ただし多くの planner は、アームの先端の「フランジ」（グリッパーをねじ止めする面）を目標として受け取る。」 |
| 48 | 「この例では x_g = 土台の +x、z_g = 土台の −z で、残りの y_g は、x と z が決まると右手系の約束（…）で 1 つに決まり、土台の −y になる。」 (111) | 「この例では x_g = 土台の +x、z_g = 土台の −z だ。残りの y_g は、右手系の約束（x, y, z の順に右手の親指・人差し指・中指の向き）で 1 つに決まる。この例では土台の −y になる。」 |
| 51 | 「T_base_pre = T_base_grasp · Trans(0, 0, −0.10) と書き、Trans はグリッパーの座標系で測った平行移動を表す。」 (79) | 「T_base_pre = T_base_grasp · Trans(0, 0, −0.10) と書く。Trans は、グリッパーの座標系で測った平行移動だ。」 |
| 51 | 「z_g が土台の −z を向くので、−0.10 は土台の z では +0.10 になり、位置は (…) = (0.60, −0.15, 0.15) m だ。」 (101) | 「z_g は土台の −z を向く。だから −0.10 は、土台の z では +0.10 になる。位置は (0.60, −0.15, 0.05 + 0.10) = (0.60, −0.15, 0.15) m だ。」 |
| 52 | 「フランジは TCP より 0.15 m 上にあるので、把持では z = … 、pre-grasp では z = … になる。」 (99) | 「フランジは TCP より 0.15 m 上にある。だから把持では z = 0.05 + 0.15 = 0.20 m、pre-grasp では z = 0.15 + 0.15 = 0.30 m になる。」 |
| 59 | 「[750, 625] を逆に読むと 80 画素と 60 画素ずれ、100 mm と 75 mm で 125 mm 離れた所を、エラーなしで指す。」 (72) | 「[750, 625] を [x, y] と読むと (480, 300) になり、正しい (400, 360) から 80 画素と 60 画素ずれる。これは 100 mm と 75 mm、合わせて 125 mm の差だが、エラーは出ない。」 |
| 62 | 「だから pre-grasp まで motion planning で運び、最後の数 cm をポリシーに任せる構成は、この仕組みと矛盾しない。」 (70) | Two sentences: 「この仕組みは、pre-grasp まで motion planning で運び、最後の数 cm をポリシーに任せる構成と矛盾しない。」 |

Fact ids leaking into the prose: 「（C5）」 (¶45), 「（A24、C15）」, 「（A20）」, 「（A14、A15）」 (¶47), 「（C41）」 (¶53, deleted anyway). The reader cannot resolve them. Remove them or turn them into named references.

### 3. Length

| step | characters (with whitespace) |
|---|---|
| draft as is | 10,143 |
| after the 10 paragraph-level verdicts (¶3, 11, 18, 21, 30, 32, 41, 42, 50 compressed, ¶53 deleted) | about 9,310 (saves about 830) |
| plus the 14 sentence-level trims (¶1, 5, 9, 14, 17, 22, 24, 34, 38, 40, 43, 47, 54, id removal) | about 8,880 (saves about 430) |
| **tier 1 total** | **about 8,900** |

Without whitespace and newlines the figure is 8,828 now and about 7,650 after tier 1, already under 8,000. If 8,000 is measured on the file size as I did above, tier 1 alone stops about 900 short, and I do not see another 900 that is free.

Tier 2 would take it to about 8,500, and none of it removes a definition. It does remove practical traps and illustrations:
- ¶34: ROS camera_link, to one sentence (about −90).
- ¶47: shorten the grasp-network paragraph (about −130).
- ¶24: shorten the align/median paragraph (about −50).
- ¶40: drop the 90° counterexample entirely (about −60).
- ¶17: drop the distortion sentence (about −45).
- ¶62–63: trim (about −30).

To go below 8,500 the next candidates are ¶52 (flange numbers) and Figure 5 with ¶55. Both carry part of the answer or walk figure arithmetic, so I recommend against cutting them.

### 4. Things noticed that are outside this audit (for the fact trace and reader audits)

- ¶3 says 「5 段」, lists 7 items, and ¶61 says 6 段.
- ¶44 uses a mask, but the toy VLM returned only a point.
- ¶39 describes the hand-eye procedure, but the toy uses a fixed camera. For a fixed camera the board is held by the gripper (eye-to-hand), which the text does not say.
- ¶60 gives 「画素 約 5 mm」 and 「較正 約 9 mm 以上」 without derivation. The 9 mm matches 0.5 m × 1°, but the 5 mm does not follow from ¶23's 0.83 mm per pixel at 0.5 m.
- ¶62 「学習済みポリシーもカメラ位置の変化に弱いと報告されている」 has no source in the draft.
- ¶9: the "1000 is only a ruler length" sentence is thin for the user's explicit "why divide by 1000" request. ¶10's arithmetic carries it, so I did not mark it.
