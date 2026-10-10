# toy.md — pixel to grasp pose, worked example

All numbers below are copied from the output of the script at the end of this file (run from the scratchpad, numpy only). Check any one cell by hand; each is meant to be head-checkable.

## Setup (fixed)
Eye-to-hand, 640x480, fx = fy = 600 px, cx = 320, cy = 240, no distortion. Camera at base (0.5, 0, 0.8) m looking straight down. Table z = 0, object top z = 0.05 m, so Z = 0.75 m. Gemini-style VLM returns [y, x] in 0–1000. Chosen answer: **[y, x] = [750, 625]**. Different y and x on purpose, so the swapped-order bug is visible. Depth raw = 750 (uint16), scale 0.001 m/unit.

## Rung 1 — VLM point → pixel → ray
Inputs: VLM [y, x] = [750, 625] (normalized 0–1000), W = 640, H = 480.
Operation: u = x/1000·W, v = y/1000·H; ray = ((u−cx)/fx, (v−cy)/fy, 1).
Output: (u, v) = (400, 360) px. u−cx = 80 px, v−cy = 120 px. Ray (x', y', 1) = (0.1333, 0.2000, 1) (dimensionless).
Highlight: x' = (400−320)/600 = 80/600 = 2/15 = 0.1333; y' = 120/600 = 0.2 exactly.
Note: x' is not a round decimal because 80 px was forced by u = 0.64·x_norm being an integer (x_norm a multiple of 25 gives u a multiple of 16). It is 2/15; X below comes out round anyway.

## Rung 2 — depth → back-projection (camera optical frame: x right, y down, z forward)
Inputs: raw = 750 (uint16), scale 0.001 m/unit, ray (0.1333, 0.2, 1).
Operation: Z = raw·scale; X = x'·Z, Y = y'·Z.
Output: Z = 0.750 m; P_cam = (0.1000, 0.1500, 0.7500) m.
Highlight: X = (2/15)(0.75) = 0.10 m (equivalently 80·0.75/600); Y = 0.2·0.75 = 0.15 m.
Note: depth is taken as a single clean value; hole handling and median over the mask are omitted (rung card hedge).

## Rung 3 — T_base_cam (4x4) and P_base
Choice: camera x = base +x, camera y = base −y, camera z = base −z (looks down). R = diag(1, −1, −1), det = +1 (right-handed). So image u increases toward base +x; image v increases toward base −y.
```
T_base_cam (4x4) =
[[ 1   0   0   0.5]
 [ 0  -1   0   0.0]
 [ 0   0  -1   0.8]
 [ 0   0   0   1  ]]
```
Operation: P_base = T_base_cam · [X, Y, Z, 1]ᵀ.
Output: P_base = (0.600, −0.150, 0.050) m.
Highlight: z_base = 0.8 + (−1)(0.75) = 0.05 m, the object top (checked True). x = 0.5 + 0.10 = 0.60; y = −(0.15) = −0.15.
Note: the T is the identity-like "flip" only because the camera is aligned with base x; any other yaw would put cos/sin terms in R.

## Rung 4 — grasp pose, pre-grasp, flange
Toy object: a box with top face 8 cm x 4 cm, long axis along image u. At Z = 0.75 m that is 64 x 32 px. Toy mask: 45 sample pixels, u = 368..432 step 8 (9 values), v = 344..376 step 8 (5 values), centroid (400, 360).
PCA (2x2 covariance of mask pixels, px²): [[426.67, 0], [0, 128]]. Eigenvalues 426.67 and 128; principal axis (u, v) = (1, 0), angle 0° → yaw = 0° about +z_base.
Grasp frame: approach z_g = −z_base; x_g = long axis = base +x; y_g = z_g × x_g = base −y (jaws close along y_g, across the 4 cm width). Position = P_base.
```
T_base_grasp =
[[ 1   0   0   0.60]
 [ 0  -1   0  -0.15]
 [ 0   0  -1   0.05]
 [ 0   0   0   1   ]]
```
Pre-grasp: T_base_pre = T_base_grasp · Trans(0, 0, −0.10) in the grasp frame. Since z_g = −z_base, −0.10 along z_g is +0.10 m in base z: position (0.60, −0.15, 0.15) m, same rotation.
```
T_base_pre: same R, translation (0.60, -0.15, 0.15)
```
TCP offset: T_flange_tcp = Trans(0, 0, 0.15) (flange to fingertip, along tool z). T_base_flange = T_base_grasp · (T_flange_tcp)⁻¹: translation (0.60, −0.15, 0.20) m at grasp; at pre-grasp the flange is at (0.60, −0.15, 0.30) m. Rotation unchanged.
Highlight: pre-grasp z = 0.05 + 0.10 = 0.15 m; flange z = 0.05 + 0.15 = 0.20 m (flange sits above the TCP by the offset).
Note: yaw 0 is a deliberately simple draw (given in the brief). TCP is put at the object-top point itself; a real grasp would go a bit lower to straddle the box. 0.10 m and 0.15 m are conventions, not sourced.

## Rung 5 — error slice (baseline P_base = (0.600, −0.150, 0.050) m)
| Error | Change | Shift of P_base (x, y, z) mm |
|---|---|---|
| (a) VLM point u + 10 px | u = 410 | (+12.5, 0, 0). 10·0.75/600 = 12.5 mm; 1 px = 1.25 mm at Z = 0.75 |
| (b) depth +10 mm | Z = 0.760 | (+1.33, −2.00, −10.00). Mostly along the ray (z), small lateral from scaling x', y' |
| (c) hand-eye: T_base_cam·Rx(+1°) (1° about camera x) | rotation error | (0, +13.11, −2.50), |shift| = 13.35 mm. About |P_cam|·rad(1°) = 0.771·0.01745 = 13.46 mm; at 0.5 m the same angle gives 8.73 mm |
| (d) wrong order: [750, 625] read as [x, y] | u = 480, v = 300 | lands at P_base = (0.700, −0.075, 0.050): offset (+100, +75, 0) mm = 125 mm |
Note on (d): the wrong-order point is a valid pixel, so nothing crashes; it just lands 125 mm away. Sign of (c) depends on the direction of the rotation (here Rx(+1°) applied on the camera side). Y shift is lateral because camera x is the rotation axis and the point is off-axis in y/z.

## Script (toy.py)
```python
import numpy as np
np.set_printoptions(precision=4, suppress=True, linewidth=120)
W,H=640,480; fx=fy=600.0; cx,cy=320.0,240.0; scale=0.001
def mm(v): return np.round(np.asarray(v)*1000,2)

print("== 1. VLM output -> pixel ==")
vlm=[750,625]            # Gemini [y, x], 0-1000
y_n,x_n=vlm
u=x_n/1000*W; v=y_n/1000*H
print(f"VLM point [y,x] = {vlm}  (normalized 0-1000)")
print(f"u = x/1000*W = {x_n}/1000*{W} = {u} px ; v = y/1000*H = {y_n}/1000*{H} = {v} px")

print("\n== 2. Ray direction ==")
xp=(u-cx)/fx; yp=(v-cy)/fy
print(f"u-cx = {u-cx} px -> x' = {xp:.4f} (=2/15) ; v-cy = {v-cy} px -> y' = {yp:.4f} (=1/5)")
print(f"ray (x', y', 1) = ({xp:.4f}, {yp:.4f}, 1)  [dimensionless, m per m of depth]")

print("\n== 3. Depth and back-projection (camera optical frame) ==")
raw=750
Z=raw*scale
Xc=xp*Z; Yc=yp*Z
print(f"raw uint16 = {raw}, scale = {scale} m/unit -> Z = {Z} m")
print(f"P_cam = (X,Y,Z) = ({Xc:.4f}, {Yc:.4f}, {Z:.4f}) m   [x right, y down, z forward]")

print("\n== 4. T_base_cam and P_base ==")
R_bc=np.diag([1.,-1.,-1.])   # x_cam=+x_base, y_cam=-y_base, z_cam=-z_base
t_bc=np.array([0.5,0.0,0.8])
T_bc=np.eye(4); T_bc[:3,:3]=R_bc; T_bc[:3,3]=t_bc
print("T_base_cam =\n",T_bc)
print("det(R) =",np.linalg.det(R_bc),"(+1: right-handed)")
P_cam_h=np.array([Xc,Yc,Z,1.0])
P_base=T_bc@P_cam_h
print("P_base =",P_base[:3],"m")
print(f"check z_base = 0.8 - {Z} = {0.8-Z:.4f} m (object top 0.05 m)  ->", np.isclose(P_base[2],0.05))

print("\n== 5. Grasp pose ==")
# toy mask: box 8 cm x 4 cm top face -> 64 x 32 px at Z=0.75 (600*0.08/0.75=64)
us=np.arange(368,433,8); vs=np.arange(344,377,8)
pts=np.array([(a,b) for a in us for b in vs],float)
print(f"mask points: {len(pts)} px, u in [{us[0]},{us[-1]}], v in [{vs[0]},{vs[-1]}]")
mean=pts.mean(0); C=np.cov((pts-mean).T,bias=True)
w,V=np.linalg.eigh(C); i=np.argmax(w); ev=V[:,i]
if ev[0]<0: ev=-ev
ang=np.degrees(np.arctan2(ev[1],ev[0]))
print("centroid (u,v) =",mean)
print("2x2 covariance [px^2] =\n",C)
print("eigenvalues =",w," principal axis (u,v) =",ev," angle from +u =",ang,"deg")
yaw=np.arctan2(-ev[1],ev[0])   # v down = -y_base, so base yaw = -(image angle)
print("yaw about +z_base (v points to -y_base) =",np.degrees(yaw),"deg")
c,s=np.cos(yaw),np.sin(yaw)
xg=np.array([c,s,0.]); zg=np.array([0,0,-1.]); yg=np.cross(zg,xg)
R_g=np.column_stack([xg,yg,zg])
T_g=np.eye(4); T_g[:3,:3]=R_g; T_g[:3,3]=P_base[:3]
print("grasp axes in base: x_g (long axis, jaw travel across y_g) =",xg," y_g =",yg," z_g (approach) =",zg)
print("T_base_grasp =\n",T_g)
d=0.10
T_off=np.eye(4); T_off[2,3]=-d
T_pre=T_g@T_off
print(f"T_base_pre = T_base_grasp @ Trans(0,0,-{d}) =\n",T_pre)
print("pre-grasp position =",T_pre[:3,3],"m")
T_ft=np.eye(4); T_ft[2,3]=0.15
T_fl=T_g@np.linalg.inv(T_ft)
print("T_flange_tcp = Trans(0,0,0.15)\nT_base_flange (at grasp) =\n",T_fl)
T_fl_pre=T_pre@np.linalg.inv(T_ft)
print("flange position at pre-grasp =",T_fl_pre[:3,3],"m")

print("\n== 6. Error slice ==")
def pipeline(u_,v_,Z_,Tbc=T_bc):
    return (Tbc@np.array([(u_-cx)/fx*Z_,(v_-cy)/fy*Z_,Z_,1.]))[:3]
base=pipeline(u,v,Z)
print("baseline P_base =",base)
a=pipeline(u+10,v,Z)
print("(a) u+10 px: P_base =",a," shift [mm] =",mm(a-base)," (10*0.75/600 = 12.5 mm; 1 px = 1.25 mm at Z=0.75)")
b=pipeline(u,v,Z+0.010)
print("(b) Z+10 mm: P_base =",b," shift [mm] =",mm(b-base))
th=np.radians(1.0)
Rx=np.array([[1,0,0,0],[0,np.cos(th),-np.sin(th),0],[0,np.sin(th),np.cos(th),0],[0,0,0,1.]])
Tbad=T_bc@Rx
cc=pipeline(u,v,Z,Tbad)
print("(c) T_base_cam' = T_base_cam @ Rx(+1 deg): P_base =",cc," shift [mm] =",mm(cc-base))
print(f"    |shift| = {np.linalg.norm(mm(cc-base)):.2f} mm ; lever arm |P_cam| = {np.linalg.norm(P_cam_h[:3]):.4f} m ; |P_cam|*rad(1deg) = {np.linalg.norm(P_cam_h[:3])*th*1000:.2f} mm")
print(f"    reference: 0.5 m * rad(1 deg) = {0.5*th*1000:.2f} mm ; 0.75 m -> {0.75*th*1000:.2f} mm")
# (d) wrong order
uw=vlm[0]/1000*W; vw=vlm[1]/1000*H
dd=pipeline(uw,vw,Z)
print(f"(d) wrong order (treat {vlm} as [x,y]): u={uw}, v={vw}; ray=({(uw-cx)/fx:.4f},{(vw-cy)/fy:.4f}); P_base (same Z) =",dd," offset from true [mm] =",mm(dd-base), f" distance {np.linalg.norm(mm(dd-base)[:2]):.1f} mm")
```

## Full output
```
== 1. VLM output -> pixel ==
VLM point [y,x] = [750, 625]  (normalized 0-1000)
u = x/1000*W = 625/1000*640 = 400.0 px ; v = y/1000*H = 750/1000*480 = 360.0 px

== 2. Ray direction ==
u-cx = 80.0 px -> x' = 0.1333 (=2/15) ; v-cy = 120.0 px -> y' = 0.2000 (=1/5)
ray (x', y', 1) = (0.1333, 0.2000, 1)  [dimensionless, m per m of depth]

== 3. Depth and back-projection (camera optical frame) ==
raw uint16 = 750, scale = 0.001 m/unit -> Z = 0.75 m
P_cam = (X,Y,Z) = (0.1000, 0.1500, 0.7500) m   [x right, y down, z forward]

== 4. T_base_cam and P_base ==
T_base_cam =
 [[ 1.   0.   0.   0.5]
 [ 0.  -1.   0.   0. ]
 [ 0.   0.  -1.   0.8]
 [ 0.   0.   0.   1. ]]
det(R) = 1.0 (+1: right-handed)
P_base = [ 0.6  -0.15  0.05] m
check z_base = 0.8 - 0.75 = 0.0500 m (object top 0.05 m)  -> True

== 5. Grasp pose ==
mask points: 45 px, u in [368,432], v in [344,376]
centroid (u,v) = [400. 360.]
2x2 covariance [px^2] =
 [[426.6667   0.    ]
 [  0.     128.    ]]
eigenvalues = [128.     426.6667]  principal axis (u,v) = [1. 0.]  angle from +u = 0.0 deg
yaw about +z_base (v points to -y_base) = -0.0 deg
grasp axes in base: x_g (long axis, jaw travel across y_g) = [ 1. -0.  0.]  y_g = [ 0. -1. -0.]  z_g (approach) = [ 0.  0. -1.]
T_base_grasp =
 [[ 1.    0.    0.    0.6 ]
 [-0.   -1.    0.   -0.15]
 [ 0.   -0.   -1.    0.05]
 [ 0.    0.    0.    1.  ]]
T_base_pre = T_base_grasp @ Trans(0,0,-0.1) =
 [[ 1.    0.    0.    0.6 ]
 [ 0.   -1.    0.   -0.15]
 [ 0.    0.   -1.    0.15]
 [ 0.    0.    0.    1.  ]]
pre-grasp position = [ 0.6  -0.15  0.15] m
T_flange_tcp = Trans(0,0,0.15)
T_base_flange (at grasp) =
 [[ 1.    0.    0.    0.6 ]
 [ 0.   -1.    0.   -0.15]
 [ 0.    0.   -1.    0.2 ]
 [ 0.    0.    0.    1.  ]]
flange position at pre-grasp = [ 0.6  -0.15  0.3 ] m

== 6. Error slice ==
baseline P_base = [ 0.6  -0.15  0.05]
(a) u+10 px: P_base = [ 0.6125 -0.15    0.05  ]  shift [mm] = [12.5  0.   0. ]  (10*0.75/600 = 12.5 mm; 1 px = 1.25 mm at Z=0.75)
(b) Z+10 mm: P_base = [ 0.6013 -0.152   0.04  ]  shift [mm] = [  1.33  -2.   -10.  ]
(c) T_base_cam' = T_base_cam @ Rx(+1 deg): P_base = [ 0.6    -0.1369  0.0475]  shift [mm] = [ 0.   13.11 -2.5 ]
    |shift| = 13.35 mm ; lever arm |P_cam| = 0.7714 m ; |P_cam|*rad(1deg) = 13.46 mm
    reference: 0.5 m * rad(1 deg) = 8.73 mm ; 0.75 m -> 13.09 mm
(d) wrong order (treat [750, 625] as [x,y]): u=480.0, v=300.0; ray=(0.2667,0.1000); P_base (same Z) = [ 0.7   -0.075  0.05 ]  offset from true [mm] = [100.  75.   0.]  distance 125.0 mm
```
