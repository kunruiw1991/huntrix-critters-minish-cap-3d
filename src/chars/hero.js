// 3D Hero Squad Mesh for HUNTR/X & Smiling Critters: The Minish Cap 3D!
// Features Derpy Tiger wearing the Magical Emerald & Gold Ezlo x Sussie Bird-Billed Minish Cap,
// flanked by Smiling Critters CatNap & DogDay Buddy (left) and HUNTR/X Rumi (right),
// with smooth Minish Cap size-scaling (0.34x Minish Size <-> 1.0x Big Hero Size).
// Zero CJK text, metalness <= 0.20 on all materials.

import * as THREE from '../../vendor/three.module.min.js';
import { WEAPONS, resolveWeaponId } from '../data/catalog.js';
import { buildWeaponMesh } from './props3d.js';

function makeLatheLoft(profilePoints, segments = 24) {
  const pts = profilePoints.map(([r, y]) => new THREE.Vector2(Math.max(0.001, r), y));
  const geo = new THREE.LatheGeometry(pts, segments);
  geo.computeVertexNormals();
  return geo;
}

function makeTaperedTube(points, radiusFn, tubularSegments = 24, radialSegments = 10) {
  const curve = new THREE.CatmullRomCurve3(points);
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  const vertex = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const P = new THREE.Vector3();

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments;
    curve.getPointAt(u, P);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    const r = Math.max(0.002, radiusFn(u));

    for (let j = 0; j <= radialSegments; j++) {
      const v = (j / radialSegments) * Math.PI * 2;
      const sin = Math.sin(v);
      const cos = -Math.cos(v);

      normal.x = cos * N.x + sin * B.x;
      normal.y = cos * N.y + sin * B.y;
      normal.z = cos * N.z + sin * B.z;
      normal.normalize();

      vertex.x = P.x + r * normal.x;
      vertex.y = P.y + r * normal.y;
      vertex.z = P.z + r * normal.z;

      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u, j / radialSegments);
    }
  }

  for (let j = 1; j <= tubularSegments; j++) {
    for (let i = 1; i <= radialSegments; i++) {
      const a = (radialSegments + 1) * (j - 1) + (i - 1);
      const b = (radialSegments + 1) * j + (i - 1);
      const c = (radialSegments + 1) * j + i;
      const d = (radialSegments + 1) * (j - 1) + i;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setIndex(indices);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.computeVertexNormals();
  return geo;
}

function mergeBufferGeometries(geos) {
  const nonIndexed = geos.map((g) => (g.index ? g.toNonIndexed() : g));
  let totalVerts = 0;
  let hasColor = false;
  for (const g of nonIndexed) {
    totalVerts += g.attributes.position.count;
    if (g.attributes.color) hasColor = true;
  }
  const positions = new Float32Array(totalVerts * 3);
  const normals = new Float32Array(totalVerts * 3);
  const colors = hasColor ? new Float32Array(totalVerts * 3) : null;
  let offset = 0;
  for (const g of nonIndexed) {
    const pos = g.attributes.position.array;
    const norm = g.attributes.normal.array;
    positions.set(pos, offset);
    normals.set(norm, offset);
    if (colors) {
      if (g.attributes.color) {
        colors.set(g.attributes.color.array, offset);
      } else {
        colors.fill(1.0, offset, offset + pos.length);
      }
    }
    offset += pos.length;
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  if (colors) {
    merged.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }
  return merged;
}

function pushBox(geos, w, h, d, x, y, z, hex, rx = 0, ry = 0, rz = 0) {
  const g = new THREE.BoxGeometry(w, h, d).toNonIndexed();
  if (rx || ry || rz) {
    const m = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz));
    g.applyMatrix4(m);
  }
  g.translate(x, y, z);
  const c = new THREE.Color(hex);
  const count = g.attributes.position.count;
  const colArr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    colArr[i * 3] = c.r;
    colArr[i * 3 + 1] = c.g;
    colArr[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
  geos.push(g);
}

function pushGeoColored(geos, baseGeo, hex, matrix = null) {
  const g = baseGeo.index ? baseGeo.toNonIndexed() : baseGeo.clone();
  if (matrix) g.applyMatrix4(matrix);
  const c = new THREE.Color(hex);
  const count = g.attributes.position.count;
  const colArr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    colArr[i * 3] = c.r;
    colArr[i * 3 + 1] = c.g;
    colArr[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
  geos.push(g);
}

// Magical Emerald & Gold Ezlo x Sussie Bird-Billed Minish Cap perched on Derpy Tiger's head!
function buildEzloSussieMinishCapMesh(vertexMat) {
  const sussieGroup = new THREE.Group();
  sussieGroup.name = 'sussieMagpie';
  const geos = [];
  const mat4 = new THREE.Matrix4();
  const pos = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const scl = new THREE.Vector3();

  // Golden Kinstone Crown Brim resting on Derpy's head
  const brimGeo = new THREE.CylinderGeometry(0.29, 0.31, 0.042, 20);
  quat.setFromEuler(new THREE.Euler(-0.06, 0, 0));
  mat4.compose(pos.set(0, -0.06, 0.02), quat, scl.set(1, 1, 1));
  pushGeoColored(geos, brimGeo, 0xffd026, mat4);

  // Emerald-Green Pointed Minish Cap Dome & Folded Cap Body
  const capBaseGeo = new THREE.SphereGeometry(0.24, 18, 14);
  quat.identity();
  mat4.compose(pos.set(0, 0.04, 0.0), quat, scl.set(1.06, 0.88, 1.18));
  pushGeoColored(geos, capBaseGeo, 0x2ecc71, mat4);

  // Tapered Emerald Cap Tail curving back and up to the Ezlo bird head
  const capTailPts = [
    new THREE.Vector3(0, 0.08, -0.04),
    new THREE.Vector3(0, 0.16, -0.14),
    new THREE.Vector3(0, 0.24, -0.06),
    new THREE.Vector3(0, 0.28, 0.05),
  ];
  const capTailGeo = makeTaperedTube(
    capTailPts,
    (u) => 0.16 * (1 - u * 0.45),
    16,
    10
  );
  pushGeoColored(geos, capTailGeo, 0x27ae60, null);

  // Ezlo x Sussie Bird-Cap Head perched on the tip of the Minish Cap
  const headGeo = new THREE.SphereGeometry(0.145, 16, 12);
  quat.identity();
  mat4.compose(pos.set(0, 0.24, 0.08), quat, scl.set(1.02, 0.96, 1.08));
  pushGeoColored(geos, headGeo, 0x2ecc71, mat4);

  // Snow-white & mint breast badge on the front of the cap
  const breastGeo = new THREE.SphereGeometry(0.12, 14, 10);
  mat4.compose(pos.set(0, 0.05, 0.18), quat.identity(), scl.set(0.88, 0.72, 0.55));
  pushGeoColored(geos, breastGeo, 0xa3f7bf, mat4);

  // Cute Golden Duck/Bird Beak (upper + lower bill)
  const upperBeakGeo = new THREE.ConeGeometry(0.058, 0.16, 10);
  quat.setFromEuler(new THREE.Euler(Math.PI * 0.48, 0, 0));
  mat4.compose(pos.set(0, 0.23, 0.24), quat, scl.set(1.18, 1.0, 0.72));
  pushGeoColored(geos, upperBeakGeo, 0xffd026, mat4);

  const lowerBeakGeo = new THREE.ConeGeometry(0.046, 0.12, 10);
  quat.setFromEuler(new THREE.Euler(Math.PI * 0.54, 0, 0));
  mat4.compose(pos.set(0, 0.20, 0.22), quat, scl.set(1.1, 1.0, 0.65));
  pushGeoColored(geos, lowerBeakGeo, 0xf59f00, mat4);

  // 6 Glowing Golden Eyes (Ezlo's big expressive eyes + Sussie's stacked golden eye pairs)
  const eyePositions = [
    [-0.072, 0.23, 0.185],
    [-0.078, 0.275, 0.172],
    [-0.064, 0.315, 0.148],
    [0.072, 0.23, 0.185],
    [0.078, 0.275, 0.172],
    [0.064, 0.315, 0.148],
  ];
  for (let i = 0; i < eyePositions.length; i++) {
    const [ex, ey, ez] = eyePositions[i];
    const r = i % 3 === 0 ? 0.026 : i % 3 === 1 ? 0.020 : 0.016;
    const eGeo = new THREE.SphereGeometry(r, 8, 8);
    mat4.compose(pos.set(ex, ey, ez), quat.identity(), scl.set(1, 1, 1));
    pushGeoColored(geos, eGeo, 0xffea79, mat4);
  }

  // Feathered Emerald & Gold Crest + Kinstone Gem on Ezlo's forehead
  const crestGeo = new THREE.SphereGeometry(0.065, 10, 8);
  quat.setFromEuler(new THREE.Euler(-0.35, 0, 0));
  mat4.compose(pos.set(0, 0.36, 0.04), quat, scl.set(0.55, 1.35, 1.1));
  pushGeoColored(geos, crestGeo, 0x51cf66, mat4);

  const gemGeo = new THREE.SphereGeometry(0.032, 8, 8);
  mat4.compose(pos.set(0, 0.12, 0.25), quat.identity(), scl.set(1, 1, 0.6));
  pushGeoColored(geos, gemGeo, 0xffd026, mat4);

  // Cute Emerald & Cyan Side Wing Flaps on the Minish Cap
  for (const side of [-1, 1]) {
    const wGeo = new THREE.SphereGeometry(0.10, 10, 8);
    quat.setFromEuler(new THREE.Euler(0.18, 0, side * -0.26));
    mat4.compose(pos.set(side * 0.19, 0.06, -0.02), quat, scl.set(0.34, 0.82, 1.28));
    pushGeoColored(geos, wGeo, 0x20c997, mat4);
  }

  const merged = mergeBufferGeometries(geos);
  const mesh = new THREE.Mesh(merged, vertexMat);
  mesh.name = 'sussieMesh';
  mesh.castShadow = true;
  sussieGroup.add(mesh);
  return sussieGroup;
}

export function createHero(ctx = {}) {
  const group = new THREE.Group();
  group.name = 'HeroRoot';
  if (ctx.scene) {
    ctx.scene.add(group);
  }

  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'HeroBody';
  group.add(bodyGroup);

  // Shared Minhwa, Minish Cap & Voxel Materials (all metalness <= 0.20)
  const ceruleanFurMat = new THREE.MeshStandardMaterial({
    color: 0x2b7de9,
    roughness: 0.56,
    metalness: 0.04,
    emissive: 0x0a2558,
    emissiveIntensity: 0.14,
  });
  const creamFurMat = new THREE.MeshStandardMaterial({
    color: 0xf7f3e8,
    roughness: 0.52,
    metalness: 0.02,
    emissive: 0x1e1b16,
    emissiveIntensity: 0.05,
  });
  const saucerGoldMat = new THREE.MeshStandardMaterial({
    color: 0xffd026,
    roughness: 0.2,
    metalness: 0.1,
    emissive: 0xffaa00,
    emissiveIntensity: 0.52,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xff82a9,
    roughness: 0.4,
    metalness: 0.04,
    emissive: 0x451024,
    emissiveIntensity: 0.14,
  });
  const vertexMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.42,
    metalness: 0.08,
  });

  // ============================================================================
  // 1. CENTERPIECE HERO: DERPY TIGER IN EZLO MINISH CAP (jjGroup / derpyGroup)
  // ============================================================================
  const jjGroup = new THREE.Group();
  jjGroup.name = 'DerpyTigerHero';
  jjGroup.position.set(0, 0.84, 0.12);
  jjGroup.scale.setScalar(1.18);
  bodyGroup.add(jjGroup);

  // --- 1A. ROUND HEAD (head) ---
  const head = new THREE.Group();
  head.name = 'head';
  head.position.set(0, 0.34, 0.16);
  jjGroup.add(head);

  const skullGeo = new THREE.SphereGeometry(0.48, 36, 28);
  const sPos = skullGeo.attributes.position;
  for (let i = 0; i < sPos.count; i++) {
    let x = sPos.getX(i);
    let y = sPos.getY(i);
    let z = sPos.getZ(i);
    if (y < 0.08 && y > -0.32) {
      const t = 1 - Math.abs(y + 0.12) / 0.22;
      x *= 1 + 0.18 * Math.max(0, t);
    }
    if (z > 0.25) {
      z = 0.25 + (z - 0.25) * 0.65;
    }
    sPos.setXYZ(i, x, y, z);
  }
  skullGeo.computeVertexNormals();
  const skullMesh = new THREE.Mesh(skullGeo, ceruleanFurMat);
  skullMesh.name = 'skullMesh';
  skullMesh.castShadow = true;
  head.add(skullMesh);

  // Cream muzzle mask
  const muzzleGeo = new THREE.SphereGeometry(0.38, 28, 22);
  const muzzleMask = new THREE.Mesh(muzzleGeo, creamFurMat);
  muzzleMask.name = 'muzzleMask';
  muzzleMask.scale.set(1.25, 0.78, 0.58);
  muzzleMask.position.set(0, -0.1, 0.22);
  head.add(muzzleMask);

  // Rounded Tiger Ears (leftEar, rightEar groups + merged ear geometry)
  const leftEar = new THREE.Group();
  leftEar.name = 'leftEar';
  leftEar.position.set(-0.36, 0.36, -0.04);
  leftEar.rotation.set(0.12, 0.25, 0.48);

  const rightEar = new THREE.Group();
  rightEar.name = 'rightEar';
  rightEar.position.set(0.36, 0.36, -0.04);
  rightEar.rotation.set(0.12, -0.25, -0.48);
  head.add(leftEar, rightEar);

  // Huge Golden Saucer Eyes (eyes, leftEye, rightEye)
  const eyesGroup = new THREE.Group();
  eyesGroup.name = 'eyes';
  head.add(eyesGroup);

  const leftEye = new THREE.Group();
  leftEye.name = 'leftEye';
  leftEye.position.set(-0.2, 0.08, 0.37);
  leftEye.rotation.y = -0.28;

  const rightEye = new THREE.Group();
  rightEye.name = 'rightEye';
  rightEye.position.set(0.2, 0.08, 0.37);
  rightEye.rotation.y = 0.28;
  eyesGroup.add(leftEye, rightEye);

  // Flat Folk-Art Pink Nose
  const noseMesh = new THREE.Group();
  noseMesh.name = 'nose';
  noseMesh.scale.set(1.3, 0.78, 0.65);
  noseMesh.position.set(0, -0.01, 0.44);
  head.add(noseMesh);

  // Wide Goofy Grin (derpyGoofyGrin: mouthCavity + fangs + curled pink tongue)
  const grinGroup = new THREE.Group();
  grinGroup.name = 'derpyGoofyGrin';
  grinGroup.position.set(0, -0.15, 0.36);
  head.add(grinGroup);

  const cavityMesh = new THREE.Group();
  cavityMesh.name = 'mouthCavity';
  cavityMesh.scale.set(1.32, 0.56, 0.35);
  grinGroup.add(cavityMesh);

  // Curled Pink Tongue
  const tongueCurve = [
    new THREE.Vector3(0, -0.04, -0.02),
    new THREE.Vector3(0.01, -0.07, 0.07),
    new THREE.Vector3(0.03, -0.12, 0.14),
    new THREE.Vector3(0.04, -0.15, 0.18),
  ];
  const tongueGeo = makeTaperedTube(
    tongueCurve,
    (u) => 0.068 * Math.sin(u * Math.PI * 0.85 + 0.15),
    14,
    10
  );
  const tongueMesh = new THREE.Group();
  tongueMesh.name = 'tongue';
  tongueMesh.scale.set(1.25, 0.55, 1.0);
  grinGroup.add(tongueMesh);

  // Merge facial details into 1 vertex-colored mesh inside wangForeheadMark
  const headDetailGeos = [];
  const fMat = new THREE.Matrix4();
  const fPos = new THREE.Vector3();
  const fQuat = new THREE.Quaternion();
  const fScl = new THREE.Vector3(1, 1, 1);
  const hsMat = new THREE.Matrix4();
  hsMat.compose(fPos.set(0, -0.15, 0.36), fQuat.identity(), fScl.set(1.25, 0.55, 1.0));
  pushGeoColored(headDetailGeos, tongueGeo, 0xff82a9, hsMat);
  fScl.set(1, 1, 1);

  for (const side of [-1, 1]) {
    const earGeo = new THREE.SphereGeometry(0.14, 16, 14);
    fQuat.setFromEuler(new THREE.Euler(0.12, side * -0.25, side * -0.48));
    fMat.compose(fPos.set(side * 0.36, 0.36, -0.04), fQuat, fScl.set(1.0, 1.05, 0.48));
    pushGeoColored(headDetailGeos, earGeo, 0x1b4fa8, fMat);

    const earInGeo = new THREE.SphereGeometry(0.085, 12, 10);
    fMat.compose(fPos.set(side * 0.36, 0.35, -0.01), fQuat, fScl.set(0.95, 0.95, 0.35));
    pushGeoColored(headDetailGeos, earInGeo, 0xf7f3e8, fMat);

    const irisGeo = new THREE.SphereGeometry(0.115, 20, 16);
    fQuat.setFromEuler(new THREE.Euler(0, side * 0.28, 0));
    fMat.compose(fPos.set(side * 0.2, 0.08, 0.388), fQuat, fScl.set(1.04, 1.04, 0.45));
    pushGeoColored(headDetailGeos, irisGeo, 0xffd026, fMat);

    const pupGeo = new THREE.SphereGeometry(0.028, 10, 10);
    fQuat.identity();
    fMat.compose(fPos.set(side * 0.185, 0.085, 0.435), fQuat, fScl.set(1, 1, 0.5));
    pushGeoColored(headDetailGeos, pupGeo, 0x141624, fMat);
  }

  const noseGeo = new THREE.SphereGeometry(0.062, 16, 12);
  fQuat.identity();
  fMat.compose(fPos.set(0, -0.01, 0.44), fQuat, fScl.set(1.3, 0.78, 0.65));
  pushGeoColored(headDetailGeos, noseGeo, 0xff82a9, fMat);

  const cavityGeo = new THREE.SphereGeometry(0.28, 22, 16);
  fMat.compose(fPos.set(0, -0.15, 0.36), fQuat.identity(), fScl.set(1.32, 0.56, 0.35));
  pushGeoColored(headDetailGeos, cavityGeo, 0x2a0c1b, fMat);

  const fangsGeos = [];
  fScl.set(1, 1, 1);
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue;
    const isCanine = Math.abs(i) === 3;
    const fangR = isCanine ? 0.034 : 0.022;
    const fangH = isCanine ? 0.1 : 0.056;
    const fg = new THREE.ConeGeometry(fangR, fangH, 10);
    const angle = i * 0.21;
    fQuat.setFromEuler(new THREE.Euler(Math.PI, 0, angle * 0.25));
    fMat.compose(
      fPos.set(Math.sin(angle) * 0.28, 0.065 - Math.abs(i) * 0.008, Math.cos(angle) * 0.08 + 0.03),
      fQuat,
      fScl
    );
    pushGeoColored(fangsGeos, fg, 0xffffff, fMat);
  }
  for (const side of [-1, 1]) {
    const lFg = new THREE.ConeGeometry(0.026, 0.072, 10);
    fQuat.setFromEuler(new THREE.Euler(0.15, 0, side * -0.15));
    fMat.compose(fPos.set(side * 0.2, -0.075, 0.08), fQuat, fScl);
    pushGeoColored(fangsGeos, lFg, 0xffffff, fMat);
  }
  const fangsMesh = new THREE.Mesh(mergeBufferGeometries(fangsGeos), vertexMat);
  fangsMesh.name = 'fangsMesh';
  grinGroup.add(fangsMesh);

  for (let row = 0; row < 3; row++) {
    const w = 0.22 - row * 0.035;
    const barGeo = new THREE.BoxGeometry(w, 0.022, 0.02);
    hsMat.compose(
      fPos.set(0, 0.34 - row * 0.055, 0.38 + row * 0.025),
      fQuat.setFromEuler(new THREE.Euler(-0.35 + row * 0.08, 0, 0)),
      fScl.set(1, 1, 1)
    );
    pushGeoColored(headDetailGeos, barGeo, 0x141624, hsMat);
  }
  const vBarGeo = new THREE.BoxGeometry(0.024, 0.13, 0.022);
  hsMat.compose(
    fPos.set(0, 0.285, 0.405),
    fQuat.setFromEuler(new THREE.Euler(-0.28, 0, 0)),
    fScl.set(1, 1, 1)
  );
  pushGeoColored(headDetailGeos, vBarGeo, 0x141624, hsMat);

  for (const side of [-1, 1]) {
    for (let s = 0; s < 4; s++) {
      const cGeo = new THREE.BoxGeometry(0.14, 0.022, 0.02);
      hsMat.compose(
        fPos.set(side * 0.42, -0.02 - s * 0.055, 0.12 - s * 0.02),
        fQuat.setFromEuler(new THREE.Euler(0, side * 0.95, side * -0.15)),
        fScl.set(1, 1, 1)
      );
      pushGeoColored(headDetailGeos, cGeo, 0x141624, hsMat);
    }
  }
  const wangGroup = new THREE.Group();
  wangGroup.name = 'wangForeheadMark';
  const wangMesh = new THREE.Mesh(mergeBufferGeometries(headDetailGeos), vertexMat);
  wangGroup.add(wangMesh);
  head.add(wangGroup);

  // --- 1B. PEAR TORSO & ROUND TWIN HIP SPHERES (torso, bodyLoft, creamBelly, torsoStripes, derpyRoundButt, buttL, buttR) ---
  const torso = new THREE.Group();
  torso.name = 'torso';
  torso.position.set(0, -0.18, 0);
  jjGroup.add(torso);

  const torsoStripes = new THREE.Group();
  torsoStripes.name = 'torsoStripes';
  torso.add(torsoStripes);

  const bodyLoftGeo = makeLatheLoft(
    [
      [0.01, -0.48],
      [0.32, -0.45],
      [0.44, -0.32],
      [0.45, -0.18],
      [0.41, 0.0],
      [0.37, 0.18],
      [0.32, 0.34],
      [0.01, 0.38],
    ],
    28
  );
  const bodyMesh = new THREE.Mesh(bodyLoftGeo, ceruleanFurMat);
  bodyMesh.name = 'bodyLoft';
  bodyMesh.scale.set(1.06, 1.0, 0.92);
  bodyMesh.castShadow = true;
  torso.add(bodyMesh);

  // Twin Round Hip Spheres (derpyRoundButt -> buttL, buttR)
  const buttGroup = new THREE.Group();
  buttGroup.name = 'derpyRoundButt';
  torso.add(buttGroup);

  const buttCheekGeo = new THREE.SphereGeometry(0.225, 24, 18);
  const buttL = new THREE.Mesh(buttCheekGeo, ceruleanFurMat);
  buttL.name = 'buttL';
  buttL.position.set(-0.175, -0.24, -0.22);
  buttL.scale.set(1.08, 0.98, 1.16);
  buttL.castShadow = true;

  const buttR = new THREE.Mesh(buttCheekGeo, ceruleanFurMat);
  buttR.name = 'buttR';
  buttR.position.set(0.175, -0.24, -0.22);
  buttR.scale.set(1.08, 0.98, 1.16);
  buttR.castShadow = true;
  buttGroup.add(buttL, buttR);

  // Cream Belly Patch + Emerald Minish Kinstone Belt + Back & Hip Stripes merged into creamBelly mesh
  const torsoDetailGeos = [];
  const bellyGeo = new THREE.SphereGeometry(0.35, 24, 20);
  hsMat.compose(fPos.set(0, -0.1, 0.24), fQuat.identity(), fScl.set(0.95, 1.12, 0.55));
  pushGeoColored(torsoDetailGeos, bellyGeo, 0xf7f3e8, hsMat);

  // Emerald Minish Tunic Belt & Golden Kinstone Buckle across Derpy's waist
  const beltGeo = new THREE.TorusGeometry(0.41, 0.032, 8, 22);
  hsMat.compose(
    fPos.set(0, -0.06, 0.01),
    fQuat.setFromEuler(new THREE.Euler(Math.PI * 0.5, 0, 0)),
    fScl.set(1.08, 0.95, 1.0)
  );
  pushGeoColored(torsoDetailGeos, beltGeo, 0x2ecc71, hsMat);

  const buckleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 12);
  hsMat.compose(
    fPos.set(0, -0.06, 0.42),
    fQuat.setFromEuler(new THREE.Euler(Math.PI * 0.5, 0, 0)),
    fScl.set(1, 1, 1)
  );
  pushGeoColored(torsoDetailGeos, buckleGeo, 0xffd026, hsMat);

  for (let b = 0; b < 5; b++) {
    const y = 0.2 - b * 0.12;
    const archGeo = new THREE.TorusGeometry(0.36, 0.018, 8, 20, Math.PI * 0.85);
    hsMat.compose(
      fPos.set(0, y, -0.05),
      fQuat.setFromEuler(new THREE.Euler(Math.PI * 0.52, 0, Math.PI * 0.08)),
      fScl.set(1.08, 0.92, 1.0)
    );
    pushGeoColored(torsoDetailGeos, archGeo, 0x141624, hsMat);
  }
  for (const side of [-1, 1]) {
    for (let s = 0; s < 2; s++) {
      const bStripeGeo = new THREE.TorusGeometry(0.19, 0.014, 8, 16, Math.PI * 0.55);
      hsMat.compose(
        fPos.set(side * 0.18, -0.2 + s * -0.07, -0.25),
        fQuat.setFromEuler(new THREE.Euler(0.35, side * 0.4, side * -0.5)),
        fScl.set(1, 1, 1)
      );
      pushGeoColored(torsoDetailGeos, bStripeGeo, 0x141624, hsMat);
    }
  }

  // --- 1C. STOCKY PAWS & HAUNCHES (leftArm, rightArm, leftLeg, rightLeg) ---
  function buildFrontLeg(side) {
    const legGroup = new THREE.Group();
    legGroup.name = side < 0 ? 'leftArm' : 'rightArm';
    legGroup.position.set(side * 0.28, -0.32, 0.22);
    const geos = [];
    const armGeo = makeLatheLoft(
      [
        [0.08, -0.32],
        [0.11, -0.24],
        [0.115, -0.1],
        [0.13, 0.04],
        [0.01, 0.08],
      ],
      16
    );
    pushGeoColored(geos, armGeo, 0x2b7de9, null);
    const padGeo = new THREE.SphereGeometry(0.135, 16, 12);
    hsMat.compose(fPos.set(0, -0.32, 0.04), fQuat.identity(), fScl.set(1.18, 0.62, 1.25));
    pushGeoColored(geos, padGeo, 0x2b7de9, hsMat);
    const armMesh = new THREE.Mesh(mergeBufferGeometries(geos), vertexMat);
    armMesh.castShadow = true;
    legGroup.add(armMesh);
    return legGroup;
  }

  for (const side of [-1, 1]) {
    const thighGeo = new THREE.SphereGeometry(0.19, 18, 14);
    hsMat.compose(fPos.set(side * 0.36, -0.2, -0.08), fQuat.identity(), fScl.set(0.85, 1.15, 1.1));
    pushGeoColored(torsoDetailGeos, thighGeo, 0x1b4fa8, hsMat);
    const padGeo = new THREE.SphereGeometry(0.135, 16, 12);
    hsMat.compose(fPos.set(side * 0.38, -0.44, 0.04), fQuat.identity(), fScl.set(1.18, 0.62, 1.25));
    pushGeoColored(torsoDetailGeos, padGeo, 0x2b7de9, hsMat);
  }

  const leftArm = buildFrontLeg(-1);
  const rightArm = buildFrontLeg(1);
  const leftLeg = new THREE.Group();
  leftLeg.name = 'leftLeg';
  leftLeg.position.set(-0.36, -0.44, -0.08);
  const rightLeg = new THREE.Group();
  rightLeg.name = 'rightLeg';
  rightLeg.position.set(0.36, -0.44, -0.08);
  jjGroup.add(leftArm, rightArm, leftLeg, rightLeg);

  // --- 1D. STRIPED CURLING TAIL (tail) ---
  const tailGroup = new THREE.Group();
  tailGroup.name = 'tail';
  tailGroup.position.set(0, -0.42, -0.34);
  jjGroup.add(tailGroup);

  const tailGeos = [];
  const tailCurvePts = [
    new THREE.Vector3(0, 0.0, 0.0),
    new THREE.Vector3(0.06, 0.06, -0.24),
    new THREE.Vector3(0.18, 0.24, -0.42),
    new THREE.Vector3(0.24, 0.48, -0.45),
    new THREE.Vector3(0.16, 0.66, -0.35),
  ];
  const tailGeo = makeTaperedTube(
    tailCurvePts,
    (u) => 0.085 * (1 - u * 0.2) + 0.03 * Math.sin(u * Math.PI),
    24,
    12
  );
  pushGeoColored(tailGeos, tailGeo, 0x2b7de9, null);

  const tailCurve = new THREE.CatmullRomCurve3(tailCurvePts);
  for (let r = 1; r <= 7; r++) {
    const u = r / 8.5;
    const pt = tailCurve.getPointAt(u);
    const tangent = tailCurve.getTangentAt(u);
    const ringGeo = new THREE.TorusGeometry(0.076, 0.016, 8, 14);
    fQuat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent.normalize());
    hsMat.compose(pt, fQuat, fScl.set(1, 1, 1));
    pushGeoColored(tailGeos, ringGeo, 0x141624, hsMat);
  }
  const tailMesh = new THREE.Mesh(mergeBufferGeometries(tailGeos), vertexMat);
  tailMesh.name = 'tailMesh';
  tailMesh.castShadow = true;
  tailGroup.add(tailMesh);

  const bellyMesh = new THREE.Mesh(mergeBufferGeometries(torsoDetailGeos), vertexMat);
  bellyMesh.name = 'creamBelly';
  bellyMesh.castShadow = true;
  torso.add(bellyMesh);

  // --- 1E. MAGICAL EMERALD & GOLD EZLO x SUSSIE MINISH CAP PERCHED ON DERPY'S HEAD ---
  const sussieMagpie = buildEzloSussieMinishCapMesh(vertexMat);
  sussieMagpie.position.set(0.04, 0.54, 0.02);
  sussieMagpie.scale.setScalar(0.92);
  head.add(sussieMagpie);

  // ============================================================================
  // 2 & 3. COMPANIONS:
  //   - Left (`mikeyGroup`): SMILING CRITTERS CATNAP & DOGDAY BUDDY
  //   - Right (`sahurGroup`): HUNTR/X RUMI (golden & violet idol jacket, star emblem & long purple-violet braid!)
  // ============================================================================
  const mikeyGroup = new THREE.Group();
  mikeyGroup.name = 'RumiCompanion';
  mikeyGroup.position.set(-0.88, 0.0, -0.42);
  mikeyGroup.scale.setScalar(0.82);
  bodyGroup.add(mikeyGroup);

  const companionGeos = [];
  // Left Companion at local (0, y, z): Smiling Critters CatNap & DogDay Buddy!
  // Royal purple CatNap plush legs & paws + DogDay sunny orange friendship anklet
  pushBox(companionGeos, 0.18, 0.24, 0.22, -0.13, 0.12, 0.02, 0x5f3dc4);
  pushBox(companionGeos, 0.18, 0.24, 0.22, 0.13, 0.12, 0.02, 0x5f3dc4);
  pushBox(companionGeos, 0.20, 0.06, 0.24, -0.13, 0.03, 0.03, 0xff922b);
  pushBox(companionGeos, 0.20, 0.06, 0.24, 0.13, 0.03, 0.03, 0xff922b);
  // Royal purple plush torso + soft lavender tummy + golden crescent-moon belly emblem
  pushBox(companionGeos, 0.46, 0.48, 0.30, 0, 0.48, 0, 0x7048e8);
  pushBox(companionGeos, 0.32, 0.36, 0.04, 0, 0.47, 0.15, 0xd0bfff);
  pushBox(companionGeos, 0.20, 0.20, 0.05, 0, 0.49, 0.17, 0xffd026);
  pushBox(companionGeos, 0.11, 0.12, 0.06, 0.05, 0.50, 0.18, 0x7048e8);
  // Purple plush arms with DogDay sunny orange friendship cuffs
  pushBox(companionGeos, 0.14, 0.34, 0.14, -0.30, 0.48, 0.03, 0x7048e8);
  pushBox(companionGeos, 0.14, 0.34, 0.14, 0.30, 0.48, 0.03, 0x7048e8);
  // Curling purple CatNap tail behind back
  pushBox(companionGeos, 0.11, 0.36, 0.11, 0, 0.46, -0.24, 0x5f3dc4, -0.45, 0, 0);
  pushBox(companionGeos, 0.13, 0.18, 0.13, 0.06, 0.66, -0.34, 0x9775fa);
  // CatNap head + pointed cat ears + cheerful cartoon eyes & wide smile + mini green Picori cap!
  pushBox(companionGeos, 0.46, 0.40, 0.40, 0, 0.92, 0.02, 0x7048e8);
  pushBox(companionGeos, 0.14, 0.18, 0.12, -0.17, 1.18, 0.02, 0x5f3dc4, 0, 0, 0.18);
  pushBox(companionGeos, 0.14, 0.18, 0.12, 0.17, 1.18, 0.02, 0x5f3dc4, 0, 0, -0.18);
  pushBox(companionGeos, 0.11, 0.11, 0.04, -0.12, 0.96, 0.22, 0xffffff);
  pushBox(companionGeos, 0.11, 0.11, 0.04, 0.12, 0.96, 0.22, 0xffffff);
  pushBox(companionGeos, 0.06, 0.07, 0.05, -0.12, 0.96, 0.23, 0x181326);
  pushBox(companionGeos, 0.06, 0.07, 0.05, 0.12, 0.96, 0.23, 0x181326);
  pushBox(companionGeos, 0.28, 0.09, 0.04, 0, 0.82, 0.22, 0x181326);
  pushBox(companionGeos, 0.22, 0.14, 0.22, 0, 1.18, 0.02, 0x2ecc71);

  // Right Companion at local (+2.146, y, z) = world (+0.88 * sizeScale):
  // HUNTR/X Rumi (golden & violet idol jacket, star emblem, and signature long purple-violet braid!)
  const mx = 2.146;
  pushBox(companionGeos, 0.18, 0.26, 0.22, mx - 0.13, 0.13, 0.02, 0x5f3dc4);
  pushBox(companionGeos, 0.18, 0.26, 0.22, mx + 0.13, 0.13, 0.02, 0x5f3dc4);
  // Golden & royal-violet HUNTR/X idol jacket + radiant golden star emblem
  pushBox(companionGeos, 0.46, 0.48, 0.28, mx, 0.49, 0, 0x7950f2);
  pushBox(companionGeos, 0.48, 0.14, 0.30, mx, 0.64, 0, 0xffd026);
  pushBox(companionGeos, 0.22, 0.22, 0.05, mx, 0.49, 0.15, 0xffd026, 0, 0, 0.785);
  pushBox(companionGeos, 0.14, 0.34, 0.14, mx - 0.30, 0.48, 0.03, 0xffd026);
  pushBox(companionGeos, 0.14, 0.34, 0.14, mx + 0.30, 0.48, 0.03, 0xffd026);
  // Rumi's idol face + violet bangs + signature long purple-violet braids with golden star ties!
  pushBox(companionGeos, 0.44, 0.42, 0.40, mx, 0.94, 0.02, 0xffdab9);
  pushBox(companionGeos, 0.48, 0.22, 0.44, mx, 1.10, -0.01, 0x845ef7);
  pushBox(companionGeos, 0.09, 0.10, 0.04, mx - 0.11, 0.95, 0.22, 0x181326);
  pushBox(companionGeos, 0.09, 0.10, 0.04, mx + 0.11, 0.95, 0.22, 0x181326);
  for (const side of [-1, 1]) {
    pushBox(companionGeos, 0.12, 0.24, 0.12, mx + side * 0.24, 0.90, -0.12, 0x7950f2);
    pushBox(companionGeos, 0.11, 0.24, 0.11, mx + side * 0.26, 0.68, -0.14, 0x9775fa);
    pushBox(companionGeos, 0.13, 0.08, 0.13, mx + side * 0.27, 0.52, -0.15, 0xffd026);
  }

  const companionMesh = new THREE.Mesh(mergeBufferGeometries(companionGeos), vertexMat);
  companionMesh.castShadow = true;
  mikeyGroup.add(companionMesh);

  const leftBraid = new THREE.Group();
  leftBraid.name = 'leftBraid';
  leftBraid.position.set(-0.24, 1.0, -0.10);
  const rightBraid = new THREE.Group();
  rightBraid.name = 'rightBraid';
  rightBraid.position.set(0.24, 1.0, -0.10);
  mikeyGroup.add(leftBraid, rightBraid);

  const sahurGroup = new THREE.Group();
  sahurGroup.name = 'VoxelMikeyCompanion';
  sahurGroup.position.set(0.88, 0.0, -0.42);
  sahurGroup.scale.setScalar(0.82);
  bodyGroup.add(sahurGroup);

  // ============================================================================
  // 4. WEAPON SOCKET, ODYSSEY BOOMERANG THROW & GEAR PROPS
  // ============================================================================
  const weaponSocket = new THREE.Group();
  weaponSocket.name = 'HeroWeaponSocket';
  weaponSocket.position.set(0.32, -0.12, 0.26);
  weaponSocket.rotation.set(0.28, 0.0, -0.15);
  rightArm.add(weaponSocket);

  const thrownStickGroup = new THREE.Group();
  thrownStickGroup.name = 'thrown_sahur_stick';
  thrownStickGroup.visible = false;
  if (ctx.scene) {
    ctx.scene.add(thrownStickGroup);
  } else {
    group.add(thrownStickGroup);
  }

  const spinRingGeo = new THREE.RingGeometry(0.55, 0.92, 24);
  spinRingGeo.rotateX(-Math.PI / 2);
  const spinRingMat = new THREE.MeshBasicMaterial({
    color: 0x3bc9db,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const spinRingMesh = new THREE.Mesh(spinRingGeo, spinRingMat);
  spinRingMesh.name = 'spinRingMesh';
  thrownStickGroup.add(spinRingMesh);

  const thrownWeaponHolder = new THREE.Group();
  thrownWeaponHolder.name = 'HeroThrownStick';
  thrownWeaponHolder.scale.setScalar(1.32);
  thrownStickGroup.add(thrownWeaponHolder);

  // Gear Props: Ezlo Golden Crown, Pegasus Boots, Four Sword Sanctuary Cape
  const helmetGroup = new THREE.Group();
  helmetGroup.name = 'HeroCrownHelmet';
  helmetGroup.visible = false;
  const crownGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.12, 8);
  crownGeo.translate(0, 0.48, 0.12);
  const helmetMesh = new THREE.Mesh(crownGeo, saucerGoldMat);
  helmetGroup.add(helmetMesh);
  head.add(helmetGroup);

  const capeGroup = new THREE.Group();
  capeGroup.name = 'HeroStarCape';
  capeGroup.position.set(0, 0.18, -0.34);
  capeGroup.visible = false;
  const capeGeo = new THREE.BoxGeometry(0.58, 0.56, 0.04);
  capeGeo.translate(0, -0.24, 0);
  const capeMesh = new THREE.Mesh(capeGeo, pinkMat);
  capeGroup.add(capeMesh);
  torso.add(capeGroup);

  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.18), saucerGoldMat);
  leftWing.position.set(-0.14, -0.26, -0.02);
  leftWing.visible = false;
  leftLeg.add(leftWing);

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.18), saucerGoldMat);
  rightWing.position.set(0.14, -0.26, -0.02);
  rightWing.visible = false;
  rightLeg.add(rightWing);

  // Shield Bubble & Swing Trail Ring
  const shieldMat = new THREE.MeshStandardMaterial({
    color: 0x2ecc71,
    emissive: 0xffd026,
    emissiveIntensity: 0.45,
    roughness: 0.25,
    metalness: 0.08,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
  });
  const shieldBubble = new THREE.Mesh(new THREE.SphereGeometry(1.15, 16, 12), shieldMat);
  shieldBubble.position.set(0, 0.85, 0);
  shieldBubble.visible = false;
  group.add(shieldBubble);

  const swingTrailGeo = new THREE.RingGeometry(0.85, 2.35, 24, 1, -Math.PI * 0.65, Math.PI * 1.3);
  swingTrailGeo.rotateX(-Math.PI / 2);
  const swingTrailMat = new THREE.MeshBasicMaterial({
    color: 0x3bc9db,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
  });
  const swingTrailMesh = new THREE.Mesh(swingTrailGeo, swingTrailMat);
  swingTrailMesh.position.set(0, 0.72, 0.25);
  swingTrailMesh.visible = false;
  group.add(swingTrailMesh);

  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x0b1528,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });
  const shadowGeo = new THREE.CircleGeometry(0.85, 20);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.name = 'shadowDisc';
  shadowMesh.position.y = 0.03;
  group.add(shadowMesh);

  let currentWeaponId = null;
  let currentWeaponMesh = null;
  let currentThrownWeaponMesh = null;
  let swingTimer = 0;
  let swingDuration = 0.24;
  let swingComboBeat = 1;
  let boingTimer = 0;
  let cheerTimer = 0;
  let shieldFlashTimer = 0;
  let jumpSquashTimer = 0;
  let walkPhase = 0;

  function equipWeapon(weaponId) {
    const resolved = resolveWeaponId(weaponId);
    if (resolved === currentWeaponId && currentWeaponMesh) return;
    currentWeaponId = resolved;
    while (weaponSocket.children.length > 0) {
      weaponSocket.remove(weaponSocket.children[0]);
    }
    currentWeaponMesh = buildWeaponMesh(resolved);
    currentWeaponMesh.scale.setScalar(0.88);
    weaponSocket.add(currentWeaponMesh);

    while (thrownWeaponHolder.children.length > 0) {
      thrownWeaponHolder.remove(thrownWeaponHolder.children[0]);
    }
    currentThrownWeaponMesh = buildWeaponMesh(resolved);
    currentThrownWeaponMesh.rotation.x = Math.PI * 0.5;
    thrownWeaponHolder.add(currentThrownWeaponMesh);

    const spec = WEAPONS[resolved] || WEAPONS.wooden_kentungan_bat;
    swingTrailMat.color.set(spec.accentColor || spec.color || '#3bc9db');
    spinRingMat.color.set(spec.accentColor || spec.color || '#3bc9db');
  }

  equipWeapon('wooden_kentungan_bat');

  function setEquipment({ weaponId, helmet, speedBoots, starCape } = {}) {
    if (weaponId) equipWeapon(weaponId);
    if (typeof helmet === 'boolean') helmetGroup.visible = helmet;
    if (typeof speedBoots === 'boolean') {
      leftWing.visible = speedBoots;
      rightWing.visible = speedBoots;
    }
    if (typeof starCape === 'boolean') capeGroup.visible = starCape;
  }

  function triggerSwing(comboBeat = 1, duration = 0.24) {
    swingDuration = Math.max(0.14, duration);
    swingTimer = swingDuration;
    swingComboBeat = comboBeat;
    swingTrailMesh.visible = true;
    swingTrailMat.opacity = comboBeat === 3 ? 0.88 : 0.65;
    swingTrailMesh.scale.setScalar(comboBeat === 3 ? 1.25 : 1.0);
  }

  function triggerBoing() {
    boingTimer = 0.36;
  }

  function triggerCheer() {
    cheerTimer = 0.9;
  }

  function triggerJump() {
    jumpSquashTimer = 0.18;
  }

  function triggerLand() {
    jumpSquashTimer = -0.16;
  }

  function flashShield() {
    shieldFlashTimer = 0.55;
  }

  function syncStickThrow(stickState) {
    if (!stickState || !stickState.active) {
      thrownStickGroup.visible = false;
      thrownWeaponHolder.visible = false;
      weaponSocket.visible = true;
      return;
    }
    if (stickState.parent !== ctx.scene && ctx.scene && thrownStickGroup.parent !== ctx.scene) {
      ctx.scene.add(thrownStickGroup);
    }
    thrownStickGroup.visible = true;
    thrownWeaponHolder.visible = true;
    weaponSocket.visible = false;
    thrownStickGroup.position.set(
      Number(stickState.x) || 0,
      Number(stickState.y) || 1.75,
      Number(stickState.z) || 0
    );
    thrownWeaponHolder.rotation.y = Number(stickState.spinAngle) || 0;
    spinRingMesh.rotation.z = -(Number(stickState.spinAngle) || 0) * 0.8;
    const pulse = 1.0 + Math.sin((Number(stickState.spinAngle) || 0) * 0.5) * 0.12;
    spinRingMesh.scale.setScalar(pulse);
  }

  function update(dt, timeOrState, maybePlayerState) {
    let time = 0;
    let playerState = maybePlayerState;
    if (typeof timeOrState === 'object' && timeOrState !== null) {
      playerState = timeOrState.player || timeOrState;
      time = Number(timeOrState.time ?? ctx.state?.time) || 0;
    } else {
      time = Number(timeOrState) || 0;
    }
    if (!playerState && ctx.state?.player) {
      playerState = ctx.state.player;
    }
    if (!playerState) return;

    const state =
      ctx.state ||
      (typeof timeOrState === 'object' && timeOrState !== null ? timeOrState : { player: playerState });
    const pState = state?.player || playerState || {};

    // Minish Cap Smooth Size-Scaling (0.34x Minish Size <-> 1.0x Big Hero Size)
    const sizeScale = Math.max(
      0.28,
      Math.min(
        1.25,
        Number(playerState.sizeScale ?? state.player?.sizeScale) ||
          ((playerState.isTiny ?? state.player?.isTiny) ? 0.34 : 1.0)
      )
    );

    setEquipment({
      weaponId: playerState.weaponId ?? pState.weaponId,
      helmet: playerState.helmet ?? pState.helmet,
      speedBoots: playerState.speedBoots ?? pState.speedBoots,
      starCape: playerState.starCape ?? pState.starCape,
    });

    const stickState = playerState.stickProjectile || state?.stickThrow || ctx.state?.stickThrow;
    if (stickState) {
      syncStickThrow(stickState);
    }

    const baseY = Number.isFinite(playerState.groundY)
      ? playerState.groundY
      : Number.isFinite(playerState.baseY)
        ? playerState.baseY
        : Number.isFinite(pState.groundY)
          ? pState.groundY
          : 1.0;
    const curY = Number.isFinite(playerState.y) ? playerState.y : baseY;
    const airHeight = Math.max(0, curY - baseY);
    const isAirborne = Boolean(playerState.jumping || playerState.airborne || airHeight > 0.04);

    if (Number.isFinite(playerState.x) && Number.isFinite(playerState.z)) {
      group.position.set(playerState.x, curY, playerState.z);
    }
    if (playerState.yaw !== undefined) {
      group.rotation.y = playerState.yaw || 0;
    }

    // Apply Minish sizeScale cleanly to derpyGroup, mikeyGroup, sahurGroup, and shadowDisc
    jjGroup.scale.setScalar(1.18 * sizeScale);
    jjGroup.position.set(0, 0.84 * sizeScale, 0.12 * sizeScale);
    mikeyGroup.scale.setScalar(0.82 * sizeScale);
    mikeyGroup.position.x = -0.88 * sizeScale;
    mikeyGroup.position.z = -0.42 * sizeScale;
    sahurGroup.scale.setScalar(0.82 * sizeScale);
    sahurGroup.position.x = 0.88 * sizeScale;
    sahurGroup.position.z = -0.42 * sizeScale;

    shadowMesh.position.y = 0.03 - airHeight;
    const shadowScale = Math.max(0.42, 1.0 - airHeight * 0.14) * sizeScale;
    shadowMesh.scale.setScalar(shadowScale);
    shadowMat.opacity = Math.max(0.12, 0.34 - airHeight * 0.05);

    const moveRatio =
      playerState.speedRatio !== undefined
        ? Math.min(1, Math.max(0, Number(playerState.speedRatio) || 0))
        : Math.min(1, Math.hypot(pState.vx || 0, pState.vz || 0) / 7.5);
    if (moveRatio > 0.04 && !isAirborne) {
      walkPhase += dt * (9.5 + moveRatio * 6.5);
    } else if (isAirborne) {
      walkPhase += dt * 14.0;
    } else {
      walkPhase += dt * 2.4;
    }

    const bob = isAirborne
      ? 0
      : moveRatio > 0.04
        ? Math.abs(Math.sin(walkPhase)) * 0.12 * moveRatio * sizeScale
        : Math.sin(time * 3.2) * 0.035 * sizeScale;
    bodyGroup.position.y = bob;

    const walkSwing = isAirborne
      ? Math.sin(walkPhase) * 0.45
      : Math.sin(walkPhase) * 0.55 * moveRatio;
    leftLeg.rotation.x = -walkSwing * 0.65;
    rightLeg.rotation.x = walkSwing * 0.65;
    leftArm.rotation.x = walkSwing * 0.55;

    // Round buttL & buttR independent walk/jump jiggle
    const buttWave = Math.sin(walkPhase * 1.5) * (isAirborne ? 0.035 : 0.028 * Math.max(0.25, moveRatio));
    buttL.position.y = -0.24 + buttWave;
    buttR.position.y = -0.24 - buttWave;
    buttGroup.rotation.z = Math.sin(walkPhase) * 0.06 * moveRatio;

    // Tail wag & Ezlo x Sussie Minish Cap bobbing
    tailGroup.rotation.z = Math.sin(time * 4.2 + walkPhase * 0.5) * 0.22;
    tailGroup.rotation.x = Math.cos(time * 2.8) * 0.08;
    sussieMagpie.position.y = 0.54 + Math.abs(Math.sin(time * 4.6)) * 0.045;
    sussieMagpie.rotation.y = Math.sin(time * 2.2) * 0.18;

    // CatNap & HUNTR/X Rumi companion bounce
    const mikeyBob = Math.abs(Math.sin(walkPhase + 0.9)) * 0.11 * moveRatio * sizeScale;
    mikeyGroup.position.y = mikeyBob;
    leftBraid.rotation.z = -0.14 - Math.abs(Math.sin(walkPhase)) * 0.24 * moveRatio;
    rightBraid.rotation.z = 0.14 + Math.abs(Math.sin(walkPhase + 0.6)) * 0.24 * moveRatio;

    const sahurBob = Math.abs(Math.sin(walkPhase + 1.8)) * 0.12 * moveRatio * sizeScale;
    sahurGroup.position.y = sahurBob;

    if (swingTimer > 0) {
      swingTimer = Math.max(0, swingTimer - dt);
      const p = 1 - swingTimer / swingDuration;
      const arc = Math.sin(p * Math.PI);
      rightArm.rotation.x = -1.35 * arc;
      rightArm.rotation.z = -0.35 * arc;
      bodyGroup.rotation.y = (swingComboBeat === 2 ? -1 : 1) * 0.28 * arc;
      swingTrailMesh.rotation.y = (p - 0.5) * 1.4;
      swingTrailMat.opacity = (1 - p) * (swingComboBeat === 3 ? 0.9 : 0.65);
      if (swingTimer === 0) {
        swingTrailMesh.visible = false;
        bodyGroup.rotation.y = 0;
        rightArm.rotation.z = 0;
      }
    } else {
      rightArm.rotation.x = -walkSwing * 0.55;
      rightArm.rotation.z = 0;
      bodyGroup.rotation.y = 0;
    }

    if (jumpSquashTimer > 0) {
      jumpSquashTimer = Math.max(0, jumpSquashTimer - dt);
    } else if (jumpSquashTimer < 0) {
      jumpSquashTimer = Math.min(0, jumpSquashTimer + dt);
    }

    if (boingTimer > 0) {
      boingTimer = Math.max(0, boingTimer - dt);
      const s = Math.sin((1 - boingTimer / 0.36) * Math.PI * 2) * 0.18;
      bodyGroup.scale.set(1 + s, 1 - s * 0.8, 1 + s);
    } else if (cheerTimer > 0) {
      cheerTimer = Math.max(0, cheerTimer - dt);
      const hop = Math.abs(Math.sin(cheerTimer * 12)) * 0.32 * sizeScale;
      bodyGroup.position.y += hop;
      leftArm.rotation.z = 2.4;
      rightArm.rotation.z = -2.4;
      bodyGroup.scale.set(1, 1, 1);
    } else if (isAirborne) {
      const vy = Number(playerState.vy) || 0;
      const stretch = Math.max(-0.14, Math.min(0.18, vy * 0.015));
      bodyGroup.scale.set(1 - stretch * 0.45, 1 + stretch, 1 - stretch * 0.45);
      leftArm.rotation.z = 0.55;
      rightArm.rotation.z = -0.55;
    } else if (jumpSquashTimer < 0) {
      const sq = Math.abs(jumpSquashTimer) / 0.16;
      bodyGroup.scale.set(1 + sq * 0.18, 1 - sq * 0.16, 1 + sq * 0.18);
      leftArm.rotation.z = 0;
    } else {
      bodyGroup.scale.set(1, 1, 1);
      leftArm.rotation.z = 0;
    }

    if (capeGroup.visible) {
      capeGroup.rotation.x = 0.18 + moveRatio * 0.45 + Math.sin(time * 7.5) * 0.08;
    }

    if (shieldFlashTimer > 0 || sizeScale < 0.75) {
      if (shieldFlashTimer > 0) {
        shieldFlashTimer = Math.max(0, shieldFlashTimer - dt);
      }
      shieldBubble.visible = shieldFlashTimer > 0;
      shieldBubble.scale.setScalar(sizeScale);
      shieldBubble.position.y = 0.85 * sizeScale;
      shieldMat.opacity = 0.38 + Math.sin(time * 4.5) * 0.06;
      shieldBubble.rotation.y = time * 0.9;
    } else {
      shieldBubble.visible = false;
    }
  }

  return {
    group,
    root: group,
    bodyGroup,
    derpyGroup: jjGroup,
    jjGroup,
    mikeyGroup,
    sahurGroup,
    sussieGroup: sussieMagpie,
    sussieMagpie,
    skullMesh,
    muzzleMask,
    leftBraid,
    rightBraid,
    head,
    leftEar,
    rightEar,
    eyes: eyesGroup,
    leftEye,
    rightEye,
    derpyGoofyGrin: grinGroup,
    wangForeheadMark: wangGroup,
    torso,
    torsoStripes,
    derpyRoundButt: buttGroup,
    buttL,
    buttR,
    tail: tailGroup,
    shadowDisc: shadowMesh,
    shadowMesh,
    weaponSocket,
    thrownStickGroup,
    getThrownStickGroup: () => thrownStickGroup,
    syncStickThrow,
    setEquipment,
    getEquipment: () => ({
      weaponId: currentWeaponId,
      helmet: helmetGroup.visible,
      speedBoots: leftWing.visible,
      starCape: capeGroup.visible,
    }),
    triggerSwing,
    triggerBoing,
    triggerCheer,
    triggerJump,
    triggerLand,
    flashShield,
    update,
    reset() {
      swingTimer = 0;
      boingTimer = 0;
      cheerTimer = 0;
      shieldFlashTimer = 0;
      jumpSquashTimer = 0;
      swingTrailMesh.visible = false;
      thrownStickGroup.visible = false;
      weaponSocket.visible = true;
      jjGroup.scale.setScalar(1.18);
      jjGroup.position.set(0, 0.84, 0.12);
      mikeyGroup.scale.setScalar(0.82);
      mikeyGroup.position.set(-0.88, 0.0, -0.42);
      sahurGroup.scale.setScalar(0.82);
      sahurGroup.position.set(0.88, 0.0, -0.42);
      shadowMesh.scale.setScalar(1.0);
      equipWeapon('wooden_kentungan_bat');
      setEquipment({ helmet: false, speedBoots: false, starCape: false });
    },
  };
}
