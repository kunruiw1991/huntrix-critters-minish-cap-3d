// Enchanted Minish Woods & Cloud Tops Canopy Sky dome, Golden Kinstone Sunburst Rays,
// Floating Giant Emerald Maple Leaves, Giant Dandelion Puff Clouds (0xfff9db), and Minish Dewdrop Star Motes.

import * as THREE from '../../vendor/three.module.min.js';
import { createRng } from '../core/rng.js';

export function createSky(textures) {
  const group = new THREE.Group();
  group.name = 'SkyGroup';

  // 1. Vertex-colored Enchanted Minish Woods & Cloud Tops Canopy Sky dome
  // Gradient: deep emerald-jade canopy zenith (0x0f5243) -> sunlit forest-teal mid (0x2eb886) -> warm golden-honey Kinstone horizon (0xffe082)
  const skyGeo = new THREE.SphereGeometry(86, 28, 18);
  const posAttr = skyGeo.attributes.position;
  const colors = new Float32Array(posAttr.count * 3);

  const zenithCol = new THREE.Color(0x0f5243); // Deep emerald-jade canopy zenith
  const midSkyCol = new THREE.Color(0x2eb886); // Sunlit forest-teal mid-sky
  const horizonCol = new THREE.Color(0xffe082); // Warm golden-honey Kinstone horizon
  const warmGlowCol = new THREE.Color(0xfff3bf); // Golden Kinstone sunburst halo
  const seaHorizonCol = new THREE.Color(0x136f63); // Deep Minish lagoon horizon below
  const tmpCol = new THREE.Color();

  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const ny = Math.max(-1, Math.min(1, y / 86));

    if (ny >= 0) {
      if (ny < 0.30) {
        tmpCol.copy(horizonCol).lerp(midSkyCol, ny / 0.30);
      } else {
        tmpCol.copy(midSkyCol).lerp(zenithCol, Math.min(1, (ny - 0.30) / 0.70));
      }
      // Golden Kinstone sunburst halo toward the north-east vista
      const sunDot = Math.max(0, (x * 0.28 + y * 0.26 - z * 0.92) / 86);
      if (sunDot > 0.42) {
        const sunMix = Math.pow((sunDot - 0.42) / 0.58, 1.6) * 0.55;
        tmpCol.lerp(warmGlowCol, sunMix);
      }
    } else {
      tmpCol.copy(horizonCol).lerp(seaHorizonCol, Math.min(1, -ny * 3.0));
    }

    colors[i * 3] = tmpCol.r;
    colors[i * 3 + 1] = tmpCol.g;
    colors[i * 3 + 2] = tmpCol.b;
  }
  skyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const skyMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.BackSide,
    depthWrite: false,
    toneMapped: false,
    fog: false,
  });
  const skyDome = new THREE.Mesh(skyGeo, skyMat);
  skyDome.renderOrder = -20;
  skyDome.matrixAutoUpdate = false;
  skyDome.updateMatrix();
  group.add(skyDome);

  // 2. Golden Kinstone Sunburst Sprite & Canopy God-Rays (toneMapped: false, fog: false)
  const sunMat = new THREE.SpriteMaterial({
    map: textures.sunTex,
    color: 0xffffff,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    fog: false,
  });
  const sunSprite = new THREE.Sprite(sunMat);
  sunSprite.name = 'GoldenKinstoneSunburst';
  sunSprite.position.set(14, 12.0, -52);
  sunSprite.scale.set(16.0, 16.0, 1);
  sunSprite.renderOrder = -15;
  group.add(sunSprite);

  // 3. Giant Dandelion Puff Clouds (0xfff9db) & Floating Giant Emerald Maple Leaves (1 InstancedMesh draw call with per-instance color)
  const rng = createRng(90210);
  const canopyItems = [];
  const clusterCount = 16;

  for (let c = 0; c < clusterCount; c++) {
    const baseAngle = (c / clusterCount) * Math.PI * 2 + rng.range(-0.10, 0.10);
    const radius = rng.range(36, 58);
    const baseY = rng.range(7.2, 14.0);
    const speed = rng.range(0.011, 0.021);
    const bobPhase = rng.range(0, Math.PI * 2);
    const isLeafCluster = c % 2 === 1;

    const subCount = isLeafCluster ? 3 : 4;
    for (let s = 0; s < subCount; s++) {
      const isLeaf = isLeafCluster && s !== 1;
      canopyItems.push({
        isLeaf,
        baseAngle,
        angleOffset: (s - (subCount - 1) * 0.5) * rng.range(0.045, 0.068),
        radius: radius + rng.range(-2.2, 2.2),
        baseY: baseY + (s === 1 ? 0.55 : 0.0),
        sx: isLeaf ? rng.range(4.6, 6.8) : s === 1 ? rng.range(5.8, 7.8) : rng.range(3.8, 5.4),
        sy: isLeaf ? rng.range(0.42, 0.65) : s === 1 ? rng.range(1.6, 2.2) : rng.range(1.2, 1.65),
        sz: isLeaf ? rng.range(4.2, 6.2) : rng.range(3.8, 5.4),
        tiltZ: isLeaf ? rng.range(-0.28, 0.28) : 0,
        speed,
        bobPhase: bobPhase + s * 0.45,
        colorHex: isLeaf
          ? s === 0
            ? 0x2fd67b // Bright Minish Emerald Maple Leaf
            : 0x20b26b // Deepwood Jade Canopy Leaf
          : s === 1
            ? 0xfff9db // Giant Dandelion Puff Cloud Core
            : 0xffe8a3, // Golden Kinstone Sunlit Puff Rim
      });
    }
  }

  // Sculpted Octahedral/Rounded Dandelion & Maple Canopy Puff Geometry
  const cloudGeo = new THREE.DodecahedronGeometry(0.68, 1);
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x499978,
    emissiveIntensity: 0.28,
    roughness: 0.78,
    metalness: 0.04,
    fog: false,
  });
  const cloudMesh = new THREE.InstancedMesh(cloudGeo, cloudMat, canopyItems.length);
  cloudMesh.name = 'MinishDandelionAndMapleCanopy';
  cloudMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cloudMesh.castShadow = false;
  cloudMesh.receiveShadow = false;
  cloudMesh.frustumCulled = false;

  const instCol = new THREE.Color();
  for (let i = 0; i < canopyItems.length; i++) {
    instCol.setHex(canopyItems[i].colorHex);
    cloudMesh.setColorAt(i, instCol);
  }
  if (cloudMesh.instanceColor) cloudMesh.instanceColor.needsUpdate = true;
  group.add(cloudMesh);

  // 4. Floating Golden Kinstone Sparks, Ezlo Emerald Spores & Dewdrop Motes (1 Points draw call)
  const moteCount = 80;
  const moteBase = new Float32Array(moteCount * 4);
  const motePos = new Float32Array(moteCount * 3);
  const moteColors = new Float32Array(moteCount * 3);
  const palette = [
    new THREE.Color(0xffe066), // Golden Kinstone Glow
    new THREE.Color(0x38d9a9), // Minish Emerald Magic
    new THREE.Color(0x69db7c), // Ezlo Clover Leaf Green
    new THREE.Color(0x74c0fc), // Sparkling Dewdrop Cyan
    new THREE.Color(0xffa8a8), // Smiling Critters Peach Blossom
  ];

  for (let i = 0; i < moteCount; i++) {
    const inHub = i < 26;
    const r = inHub ? rng.range(1.8, 10.8) : rng.range(11.5, 29.5);
    const theta = rng.range(0, Math.PI * 2);
    const mx = Math.cos(theta) * r;
    const mz = Math.sin(theta) * r;
    const my = (mx < -10 && mz < -10) || (mx > 10 && mz < -10) ? rng.range(2.6, 5.4) : rng.range(1.6, 4.5);
    const phase = rng.range(0, Math.PI * 2);

    moteBase[i * 4] = mx;
    moteBase[i * 4 + 1] = my;
    moteBase[i * 4 + 2] = mz;
    moteBase[i * 4 + 3] = phase;

    motePos[i * 3] = mx;
    motePos[i * 3 + 1] = my;
    motePos[i * 3 + 2] = mz;

    let col = palette[0];
    if (!inHub) {
      if (mx < 0 && mz >= 0) col = palette[2];
      else if (mx < 0 && mz < 0) col = palette[3];
      else if (mx >= 0 && mz >= 0) col = palette[4];
      else col = palette[1];
    }
    moteColors[i * 3] = col.r;
    moteColors[i * 3 + 1] = col.g;
    moteColors[i * 3 + 2] = col.b;
  }

  const moteGeo = new THREE.BufferGeometry();
  const motePosAttr = new THREE.BufferAttribute(motePos, 3);
  motePosAttr.setUsage(THREE.DynamicDrawUsage);
  moteGeo.setAttribute('position', motePosAttr);
  moteGeo.setAttribute('color', new THREE.BufferAttribute(moteColors, 3));

  const moteMat = new THREE.PointsMaterial({
    map: textures.sparkleTex,
    size: 0.48,
    vertexColors: true,
    transparent: true,
    opacity: 0.90,
    depthWrite: false,
    toneMapped: false,
    fog: false,
  });
  const motePoints = new THREE.Points(moteGeo, moteMat);
  motePoints.frustumCulled = false;
  group.add(motePoints);

  const dummy = new THREE.Object3D();

  function updateCloudTransforms(time) {
    for (let i = 0; i < canopyItems.length; i++) {
      const p = canopyItems[i];
      const ang = p.baseAngle + p.angleOffset + time * p.speed;
      const x = Math.cos(ang) * p.radius;
      const z = Math.sin(ang) * p.radius;
      const y = p.baseY + Math.sin(time * 0.9 + p.bobPhase) * 0.30;
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        p.isLeaf ? Math.sin(time * 1.2 + p.bobPhase) * 0.15 : 0,
        -ang + Math.PI * 0.5,
        p.tiltZ
      );
      dummy.scale.set(p.sx, p.sy, p.sz);
      dummy.updateMatrix();
      cloudMesh.setMatrixAt(i, dummy.matrix);
    }
    cloudMesh.instanceMatrix.needsUpdate = true;
  }

  updateCloudTransforms(0);

  function update(_dt, time = 0) {
    updateCloudTransforms(time);

    const sunPulse = 16.0 + Math.sin(time * 1.5) * 0.55;
    sunSprite.scale.set(sunPulse, sunPulse, 1);

    const arr = motePosAttr.array;
    for (let i = 0; i < moteCount; i++) {
      const bx = moteBase[i * 4];
      const by = moteBase[i * 4 + 1];
      const bz = moteBase[i * 4 + 2];
      const ph = moteBase[i * 4 + 3];
      arr[i * 3] = bx + Math.sin(time * 0.8 + ph) * 0.35;
      arr[i * 3 + 1] = by + Math.sin(time * 1.7 + ph * 1.3) * 0.42;
      arr[i * 3 + 2] = bz + Math.cos(time * 0.75 + ph) * 0.35;
    }
    motePosAttr.needsUpdate = true;
  }

  return { group, update };
}
