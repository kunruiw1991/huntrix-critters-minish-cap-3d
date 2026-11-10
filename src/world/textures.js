// Procedural 16x16 pixel-art CanvasTextures and 8x8 voxel atlas for HUNTR/X & Smiling Critters: The Minish Cap 3D!
// Theme: Minish Cap Macro-Forest & Giant Toy-House World (BV13c411b7ee — Deepwood Clover Moss, Hyrule Kinstone Plaza,
// Minish Toy Bakery Pink & Cream Checkered Pastry Tiles, Castor Wilds Lily-Pad Lagoon, Palace of Winds Clockwork Sanctuary).

import * as THREE from '../../vendor/three.module.min.js';
import { createRng } from '../core/rng.js';

const TILE_SIZE = 16;
const ATLAS_COLS = 8;
const ATLAS_ROWS = 8;
const ATLAS_SIZE = TILE_SIZE * ATLAS_COLS; // 128x128

export const TILE_INDEX = Object.freeze({
  grass_top: 0,
  grass_side: 1,
  dirt: 2,
  path_gold: 3,
  hub_plaza: 4,
  lucky_block: 5,
  flower_red_top: 6,
  flower_red_side: 7,
  flower_sun_top: 8,
  flower_sun_side: 9,
  oak_bark: 10,
  oak_top: 11,
  spruce_bark: 12,
  spruce_top: 13,
  leaves_lush: 14,
  leaves_frost: 15,
  hay_side: 16,
  hay_top: 17,
  pumpkin_front: 18,
  pumpkin_side: 19,
  pumpkin_top: 20,
  melon_side: 21,
  melon_top: 22,
  beehive_front: 23,
  beehive_side: 24,
  beehive_top: 25,
  ice_crystal: 26,
  snow_top: 27,
  snow_side: 28,
  castle_brick: 29,
  furnace_front: 30,
  furnace_side: 31,
  amethyst: 32,
  bedrock_gold: 33,
  mega_titan_side: 34,
  mega_titan_top: 35,
  chest_front: 36,
  chest_side: 37,
  chest_top: 38,
  water: 39,
  farm_soil: 40,
  lantern_glow: 41,
  mushroom_red: 42,
  snowman_face: 43,
});

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function finalizePixelTexture(canvas, repeat = false) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  }
  tex.needsUpdate = true;
  return tex;
}

function fillNoise(ctx, rng, palette, x0 = 0, y0 = 0, w = 16, h = 16) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x0 + w > x; x++) {
      ctx.fillStyle = rng.pick(palette);
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function px(ctx, x, y, color, w = 1, h = 1) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBitmap(ctx, rows, colorMap, ox = 0, oy = 0) {
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch !== '.' && colorMap[ch]) {
        ctx.fillStyle = colorMap[ch];
        ctx.fillRect(ox + x, oy + y, 1, 1);
      }
    }
  }
}

function paintTile(name, ctx, emCtx, rng) {
  switch (name) {
    case 'grass_top': {
      // Deepwood Shrine Giant Clover & Dewdrop Moss Floor (rich emerald turf with 4-leaf clovers and sparkling cyan dewdrops)
      fillNoise(ctx, rng, ['#2fb344', '#37b24d', '#40c057', '#2b8a3e', '#51cf66']);
      // 4-leaf clover cluster #1 (top-left)
      px(ctx, 2, 2, '#69db7c', 2, 2);
      px(ctx, 5, 2, '#69db7c', 2, 2);
      px(ctx, 2, 5, '#69db7c', 2, 2);
      px(ctx, 5, 5, '#69db7c', 2, 2);
      px(ctx, 4, 4, '#b2f2bb', 1, 1);
      // 4-leaf clover cluster #2 (bottom-right)
      px(ctx, 9, 9, '#8ce99a', 2, 2);
      px(ctx, 12, 9, '#8ce99a', 2, 2);
      px(ctx, 9, 12, '#8ce99a', 2, 2);
      px(ctx, 12, 12, '#8ce99a', 2, 2);
      px(ctx, 11, 11, '#d3f9d8', 1, 1);
      // Sparkling cyan Minish dewdrops
      px(ctx, 11, 3, '#66d9e8', 2, 2);
      px(ctx, 11, 3, '#ffffff', 1, 1);
      px(ctx, 3, 11, '#66d9e8', 2, 2);
      px(ctx, 3, 11, '#ffffff', 1, 1);
      px(emCtx, 11, 3, '#22b8cf', 2, 2);
      px(emCtx, 3, 11, '#22b8cf', 2, 2);
      break;
    }

    case 'grass_side': {
      // Deepwood Clover Moss & Rich Forest Loam Curb Side
      fillNoise(ctx, rng, ['#7c4d25', '#6e421f', '#8b5a2b', '#5c3d24']);
      fillNoise(ctx, rng, ['#37b24d', '#40c057', '#51cf66'], 0, 0, 16, 4);
      const fringe = [5, 7, 4, 6, 7, 5, 4, 6, 5, 4, 7, 6, 5, 4, 6, 5];
      for (let x = 0; x < 16; x++) {
        px(ctx, x, 3, x % 2 === 0 ? '#51cf66' : '#2f9e44', 1, fringe[x] - 3);
      }
      // Small buried acorn & pebble details
      px(ctx, 3, 10, '#d97706', 2, 2);
      px(ctx, 11, 12, '#66d9e8', 2, 2);
      break;
    }

    case 'dirt': {
      // Minish Forest Root-Carved Earth & Warm Sandstone Foundation
      fillNoise(ctx, rng, ['#7c4d25', '#6e421f', '#8b5a2b', '#5c3d24']);
      px(ctx, 2, 2, '#b45309', 3, 2);
      px(ctx, 10, 4, '#d97706', 3, 2);
      px(ctx, 5, 9, '#92400e', 3, 3);
      px(ctx, 11, 12, '#b45309', 3, 2);
      break;
    }

    case 'farm_soil': {
      // Castor Wilds & Dewdrop Lagoon Lily-Pad Shallows (aqua-jade water ripples & giant lily-pad leaf veins)
      fillNoise(ctx, rng, ['#12b886', '#0ca678', '#20c997', '#099268']);
      // Giant round emerald lily-pad occupying center of tile
      px(ctx, 2, 2, '#2b8a3e', 12, 12);
      px(ctx, 3, 3, '#40c057', 10, 10);
      // Characteristic V-notch & radial leaf veins on the giant lily-pad
      px(ctx, 11, 7, '#12b886', 3, 2);
      px(ctx, 7, 3, '#69db7c', 2, 10);
      px(ctx, 3, 7, '#69db7c', 8, 2);
      // Pink lotus blossom bud at center
      px(ctx, 6, 6, '#ff85c0', 4, 4);
      px(ctx, 7, 7, '#ffd43b', 2, 2);
      px(emCtx, 6, 6, '#f06595', 4, 4);
      break;
    }

    case 'path_gold': {
      // Glowing Emerald & Gold Ezlo Cap / Kinstone Pathway
      fillNoise(ctx, rng, ['#d9a05b', '#c68b45', '#e3b26f']);
      // Golden Kinstone cobblestone border rails
      px(ctx, 0, 0, '#ffd43b', 2, 16);
      px(ctx, 14, 0, '#ffd43b', 2, 16);
      px(ctx, 2, 0, '#fff3bf', 1, 16);
      px(ctx, 13, 0, '#fff3bf', 1, 16);
      // Emerald & Gold Kinstone triangular medallions down the center
      px(ctx, 4, 2, '#20c997', 8, 5);
      px(ctx, 5, 3, '#63e6be', 6, 3);
      px(ctx, 7, 4, '#ffd43b', 2, 2);
      px(ctx, 4, 9, '#fab005', 8, 5);
      px(ctx, 5, 10, '#ffe066', 6, 3);
      px(ctx, 7, 11, '#20c997', 2, 2);
      px(emCtx, 0, 0, '#997a00', 2, 16);
      px(emCtx, 14, 0, '#997a00', 2, 16);
      px(emCtx, 5, 3, '#12b886', 6, 3);
      px(emCtx, 5, 10, '#d97706', 6, 3);
      break;
    }

    case 'hub_plaza': {
      // Hyrule Festival & Golden Kinstone Mosaic Plaza (warm cream & emerald-gold triangular Kinstone medallions)
      fillNoise(ctx, rng, ['#fff3bf', '#ffec99', '#fdf6e3']);
      // Outer warm golden-sandstone border
      px(ctx, 0, 0, '#fcc419', 16, 2);
      px(ctx, 0, 14, '#e67700', 16, 2);
      px(ctx, 0, 0, '#fcc419', 2, 16);
      px(ctx, 14, 0, '#e67700', 2, 16);
      // Inner emerald-jade ring
      px(ctx, 3, 3, '#20c997', 10, 10);
      px(ctx, 4, 4, '#fff9db', 8, 8);
      // Split Golden & Emerald Kinstone Medallion in center (with zigzag Kinstone seam!)
      px(ctx, 5, 5, '#ffd43b', 6, 3);
      px(ctx, 5, 8, '#38d9a9', 6, 3);
      px(ctx, 6, 7, '#e67700', 4, 2);
      px(ctx, 7, 7, '#ffffff', 2, 2);
      px(emCtx, 5, 5, '#854d0e', 6, 6);
      break;
    }

    case 'lucky_block': {
      // Golden Kinstone '?' Chest Block (24K Gold Kinstone Relic with emerald corner gems & glowing '?')
      fillNoise(ctx, rng, ['#fcc419', '#ffd43b', '#fab005', '#f59f00']);
      px(ctx, 0, 0, '#fff9db', 16, 2);
      px(ctx, 0, 14, '#d97706', 16, 2);
      px(ctx, 0, 0, '#fff9db', 2, 16);
      px(ctx, 14, 0, '#d97706', 2, 16);
      // Emerald Kinstone corner inlays
      px(ctx, 2, 2, '#12b886', 2, 2);
      px(ctx, 12, 2, '#12b886', 2, 2);
      px(ctx, 2, 12, '#12b886', 2, 2);
      px(ctx, 12, 12, '#12b886', 2, 2);
      const qRows = [
        '..WWWW..',
        '.WWWWWWB',
        '.WW..WWB',
        '....WWWB',
        '...WWWB.',
        '...WWB..',
        '...BBB..',
        '...WW...',
        '...WWB..',
        '....BB..',
      ];
      drawBitmap(ctx, qRows, { W: '#ffffff', B: '#92400e' }, 4, 3);
      drawBitmap(emCtx, qRows, { W: '#ffe066', B: '#78350f' }, 4, 3);
      px(emCtx, 2, 2, '#0ca678', 2, 2);
      px(emCtx, 12, 2, '#0ca678', 2, 2);
      break;
    }

    case 'flower_red_top': {
      // Red-Spotted Toadstool Mushroom Block Top (Minish Woods bouncy red mushroom cap with white spots)
      fillNoise(ctx, rng, ['#e03131', '#f03e3e', '#c92a2a', '#fa5252']);
      px(ctx, 2, 2, '#ffffff', 3, 3);
      px(ctx, 11, 2, '#ffffff', 3, 3);
      px(ctx, 6, 6, '#fff5f5', 4, 4);
      px(ctx, 2, 11, '#ffffff', 3, 3);
      px(ctx, 11, 11, '#ffffff', 3, 3);
      px(emCtx, 6, 6, '#ff6b6b', 4, 4);
      break;
    }

    case 'flower_red_side': {
      // Red-Spotted Toadstool Mushroom Block Side (Red spotted cap overhanging cream mushroom stem)
      fillNoise(ctx, rng, ['#fff9db', '#f3d9fa', '#ffec99']);
      fillNoise(ctx, rng, ['#e03131', '#f03e3e', '#c92a2a'], 0, 0, 16, 9);
      px(ctx, 2, 2, '#ffffff', 3, 3);
      px(ctx, 8, 3, '#ffffff', 4, 3);
      px(ctx, 13, 2, '#ffffff', 2, 3);
      px(ctx, 0, 8, '#a61e4d', 16, 1);
      // Cute Smiling Critter / Minish eyes on the cream mushroom stem
      px(ctx, 5, 11, '#212529', 2, 3);
      px(ctx, 9, 11, '#212529', 2, 3);
      px(ctx, 5, 11, '#ffffff', 1, 1);
      px(ctx, 9, 11, '#ffffff', 1, 1);
      break;
    }

    case 'flower_sun_top': {
      // Giant Acorn Nut Crate Top (Knobby dark-oak acorn cap with golden stem)
      fillNoise(ctx, rng, ['#5c3d24', '#6e421f', '#4a301c', '#7c4d25']);
      for (let y = 2; y < 14; y += 3) {
        for (let x = 2; x < 14; x += 3) {
          px(ctx, x, y, '#8b5a2b', 2, 2);
        }
      }
      px(ctx, 6, 6, '#ffd43b', 4, 4);
      px(ctx, 7, 7, '#fff9db', 2, 2);
      px(emCtx, 6, 6, '#d97706', 4, 4);
      break;
    }

    case 'flower_sun_side': {
      // Giant Acorn Nut Crate Side (Knobby dark-brown acorn cap top + glossy golden-chestnut shell bottom)
      fillNoise(ctx, rng, ['#d97706', '#b45309', '#f59f00', '#92400e']);
      // Acorn cap upper band
      fillNoise(ctx, rng, ['#5c3d24', '#4a301c', '#6e421f'], 0, 0, 16, 6);
      for (let x = 1; x < 15; x += 3) {
        px(ctx, x, 2, '#8b5a2b', 2, 2);
      }
      px(ctx, 0, 5, '#3d2512', 16, 1);
      // Golden Kinstone acorn emblem in center of shell
      px(ctx, 5, 8, '#ffd43b', 6, 5);
      px(ctx, 6, 9, '#fff9db', 4, 3);
      px(emCtx, 5, 8, '#eab308', 6, 5);
      break;
    }

    case 'oak_bark': {
      // Giant Hollow Fallen Oak Log Bark (Rich furrowed Minish forest timber with emerald moss patches)
      for (let x = 0; x < 16; x++) {
        const stripe = x % 4;
        const col = stripe === 0 ? '#4a2e16' : stripe === 1 ? '#6b4423' : stripe === 2 ? '#7c4d25' : '#5c3d24';
        px(ctx, x, 0, col, 1, 16);
      }
      // Mossy Deepwood patches & glowing cyan sap runes
      px(ctx, 2, 3, '#40c057', 3, 4);
      px(ctx, 9, 10, '#51cf66', 4, 3);
      px(ctx, 13, 3, '#38d9a9', 2, 4);
      px(emCtx, 13, 3, '#12b886', 2, 4);
      break;
    }

    case 'oak_top': {
      // Giant Hollow Tree Stump Concentric Growth Rings & Glowing Minish Portal Swirl Top
      px(ctx, 0, 0, '#54341a', 16, 16);
      px(ctx, 2, 2, '#d4a359', 12, 12);
      px(ctx, 4, 4, '#b5833d', 8, 8);
      px(ctx, 5, 5, '#20c997', 6, 6);
      px(ctx, 6, 6, '#ffd43b', 4, 4);
      px(ctx, 7, 7, '#fff9db', 2, 2);
      px(emCtx, 5, 5, '#12b886', 6, 6);
      break;
    }

    case 'spruce_bark': {
      // Hollow Emerald Bamboo Pipe & Deepwood Mossy Pillar Side
      for (let x = 0; x < 16; x++) {
        const col = x < 2 || x >= 14 ? '#1b5e20' : x < 5 || x >= 11 ? '#2b8a3e' : '#40c057';
        px(ctx, x, 0, col, 1, 16);
      }
      // Horizontal bamboo node rings + golden Kinstone trim
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 7, '#8ce99a', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 6, 3, '#63e6be', 4, 3);
      px(emCtx, 6, 3, '#20c997', 4, 3);
      break;
    }

    case 'spruce_top': {
      // Hollow Emerald Bamboo Pipe & Mossy Stone Medallion Top
      px(ctx, 0, 0, '#2b8a3e', 16, 16);
      px(ctx, 2, 2, '#51cf66', 12, 12);
      px(ctx, 4, 4, '#b2f2bb', 8, 8);
      px(ctx, 5, 5, '#1b4332', 6, 6);
      px(ctx, 6, 6, '#38d9a9', 4, 4);
      px(emCtx, 6, 6, '#12b886', 4, 4);
      break;
    }

    case 'leaves_lush': {
      // Deepwood Giant Clover Canopy & Minish Berry Foliage Block
      fillNoise(ctx, rng, ['#2b8a3e', '#37b24d', '#2f9e44', '#40c057', '#1b5e20']);
      px(ctx, 2, 2, '#69db7c', 3, 2);
      px(ctx, 11, 4, '#ffd43b', 2, 2);
      px(ctx, 5, 10, '#8ce99a', 3, 2);
      px(ctx, 12, 12, '#ff6b9d', 2, 2);
      break;
    }

    case 'leaves_frost': {
      // Minish Cottage Red-Terracotta & Emerald-Shingle Roof Tile (Festive Picori pointed roof shingles)
      for (let x = 0; x < 16; x++) {
        const rib = x % 4;
        const col = rib === 0 ? '#9c2020' : rib === 1 ? '#c92a2a' : rib === 2 ? '#e03131' : '#b02525';
        px(ctx, x, 0, col, 1, 16);
      }
      px(ctx, 0, 7, '#7a1818', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 2, 13, '#63e6be', 2, 1);
      px(ctx, 6, 13, '#63e6be', 2, 1);
      px(ctx, 10, 13, '#63e6be', 2, 1);
      px(ctx, 14, 13, '#63e6be', 2, 1);
      break;
    }

    case 'hay_side': {
      // Sugar-Cube & Honey-Waffle Pastry Block Side (Minish Toy Bakery giant waffle & sugar cubes)
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const isGrid = x % 4 === 0 || y % 4 === 0;
          px(ctx, x, y, isGrid ? '#d97706' : '#fde68a');
        }
      }
      // Strawberry-pink frosting ribbon bands
      px(ctx, 0, 3, '#ff6b9d', 16, 2);
      px(ctx, 0, 11, '#ff6b9d', 16, 2);
      px(ctx, 6, 6, '#ffffff', 4, 4);
      break;
    }

    case 'hay_top': {
      // Sugar-Cube & Honey-Waffle Pastry Block Top
      fillNoise(ctx, rng, ['#fef3c7', '#fde68a', '#fcd34d', '#fffbeb']);
      px(ctx, 2, 2, '#ff6b9d', 3, 2);
      px(ctx, 10, 5, '#63e6be', 3, 2);
      px(ctx, 5, 11, '#ff6b9d', 3, 2);
      break;
    }

    case 'pumpkin_side': {
      // Blue Gust-Jar & Porcelain Teacup Block Side (Minish Cap iconic blue/gold ceramic jar)
      for (let x = 0; x < 16; x++) {
        const rib = x % 4 === 0;
        px(ctx, x, 0, rib ? '#1864ab' : '#228be6', 1, 16);
      }
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 0, 6, '#e7f5ff', 16, 4);
      px(ctx, 4, 7, '#1971c2', 8, 2);
      break;
    }

    case 'pumpkin_front': {
      // Blue Gust-Jar Swirl Emblem Front
      for (let x = 0; x < 16; x++) {
        const rib = x % 4 === 0;
        px(ctx, x, 0, rib ? '#1864ab' : '#228be6', 1, 16);
      }
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      const swirl = [
        '...WWWWWW...',
        '..WW....WW..',
        '.WW..WW..WW.',
        '.WW.WWWW.WW.',
        '.WW..WW..WW.',
        '..WW....WW..',
        '...WWWWWW...',
      ];
      drawBitmap(ctx, swirl, { W: '#99e9f2' }, 2, 4);
      drawBitmap(emCtx, swirl, { W: '#3bc9db' }, 2, 4);
      break;
    }

    case 'pumpkin_top': {
      // Blue Gust-Jar Cork & Magic Rim Top
      fillNoise(ctx, rng, ['#1864ab', '#1c7ed6', '#228be6']);
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 4, 4, '#3bc9db', 8, 8);
      px(ctx, 6, 6, '#e3fafc', 4, 4);
      px(emCtx, 4, 4, '#22b8cf', 8, 8);
      break;
    }

    case 'melon_side': {
      // Sugar-Cube Teacup & Strawberry Macaron Block Side (Giant Toy Bakery breakable block)
      fillNoise(ctx, rng, ['#fff5f7', '#ffe3ec', '#ffffff', '#fcc2d7']);
      px(ctx, 0, 0, '#ff6b9d', 16, 3);
      px(ctx, 0, 13, '#ff6b9d', 16, 3);
      // Golden teacup emblem in center
      px(ctx, 4, 5, '#ffd43b', 7, 6);
      px(ctx, 11, 6, '#ffd43b', 2, 4);
      px(ctx, 5, 6, '#fff9db', 5, 4);
      px(emCtx, 4, 5, '#fab005', 7, 6);
      break;
    }

    case 'melon_top': {
      // Sugar-Cube Teacup & Strawberry Macaron Block Top
      fillNoise(ctx, rng, ['#ff85c0', '#ff6b9d', '#f783ac']);
      px(ctx, 2, 2, '#ffffff', 12, 12);
      px(ctx, 5, 5, '#ffd43b', 6, 6);
      px(ctx, 7, 7, '#fff9db', 2, 2);
      break;
    }

    case 'beehive_side': {
      // Giant Dollhouse Pastel Cream & Gold Baseboard Wall Side
      fillNoise(ctx, rng, ['#fff9db', '#fef3c7', '#fdf6e3', '#ffec99']);
      // Decorative wainscot molding top & bottom
      px(ctx, 0, 0, '#d97706', 16, 2);
      px(ctx, 0, 14, '#b45309', 16, 2);
      px(ctx, 0, 0, '#d97706', 2, 16);
      px(ctx, 14, 0, '#b45309', 2, 16);
      px(ctx, 3, 3, '#ff85c0', 10, 10);
      px(ctx, 4, 4, '#ffffff', 8, 8);
      px(ctx, 6, 6, '#ffd43b', 4, 4);
      break;
    }

    case 'beehive_front': {
      // Giant Dollhouse Mousehole Arch & Golden Clockwork Keyhole Front
      fillNoise(ctx, rng, ['#fff9db', '#fef3c7', '#fdf6e3']);
      px(ctx, 0, 0, '#d97706', 16, 2);
      px(ctx, 0, 14, '#b45309', 16, 2);
      // Rounded golden mousehole / keyhole arch
      px(ctx, 3, 4, '#ffd43b', 10, 12);
      px(ctx, 4, 5, '#1a1128', 8, 11);
      // Glowing cyan/gold tiny passage lantern inside mousehole
      px(ctx, 6, 7, '#38d9a9', 4, 6);
      px(ctx, 7, 8, '#fff9db', 2, 3);
      px(emCtx, 6, 7, '#20c997', 4, 6);
      break;
    }

    case 'beehive_top': {
      // Giant Dollhouse Pastel Roof & Biscuit Tile Top
      fillNoise(ctx, rng, ['#fff9db', '#fef3c7', '#ffec99']);
      px(ctx, 0, 0, '#d97706', 16, 2);
      px(ctx, 0, 14, '#d97706', 16, 2);
      px(ctx, 0, 0, '#d97706', 2, 16);
      px(ctx, 14, 0, '#d97706', 2, 16);
      px(ctx, 5, 5, '#ff6b9d', 6, 6);
      break;
    }

    case 'ice_crystal': {
      // Dewdrop Crystal & Minish Shrink Portal Gem Block (Sparkling cyan-emerald crystal core)
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const d = Math.hypot(x - 7.5, y - 7.5);
          const col = d < 3 ? '#ffffff' : d < 5.5 ? '#96f2d7' : d < 8 ? '#20c997' : '#099268';
          px(ctx, x, y, col);
        }
      }
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(emCtx, 2, 2, '#20c997', 12, 12);
      px(emCtx, 5, 5, '#e6fcf5', 6, 6);
      break;
    }

    case 'snow_top': {
      // Minish Toy Bakery Pink & Cream Checkered Pastry Tile (warm biscuit & strawberry-cream tiles where tiny heroes scurry)
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const qx = x >= 8 ? 1 : 0;
          const qy = y >= 8 ? 1 : 0;
          const isPink = (qx + qy) % 2 === 0;
          px(ctx, x, y, isPink ? '#ffdeeb' : '#fff9db');
        }
      }
      // Subtle biscuit bevel & strawberry-gold corner sprinkles
      px(ctx, 0, 0, '#f783ac', 16, 1);
      px(ctx, 0, 7, '#f59f00', 16, 1);
      px(ctx, 0, 15, '#f783ac', 16, 1);
      px(ctx, 7, 0, '#f59f00', 1, 16);
      px(ctx, 3, 3, '#ff6b9d', 2, 2);
      px(ctx, 11, 11, '#ff6b9d', 2, 2);
      px(ctx, 11, 3, '#ffd43b', 2, 2);
      px(ctx, 3, 11, '#ffd43b', 2, 2);
      break;
    }

    case 'snow_side': {
      // Minish Toy Bakery Strawberry-Cream & Golden Biscuit Baseboard Trim
      fillNoise(ctx, rng, ['#fff9db', '#ffdeeb', '#fef3c7']);
      px(ctx, 0, 0, '#ff6b9d', 16, 3);
      px(ctx, 0, 3, '#ffd43b', 16, 2);
      px(ctx, 0, 13, '#d97706', 16, 3);
      px(emCtx, 0, 3, '#fab005', 16, 2);
      break;
    }

    case 'castle_brick': {
      // Palace of Winds & Golden Clockwork Sanctuary Tile (royal violet, gold gear filigree, and cyan wind runes)
      fillNoise(ctx, rng, ['#2b194d', '#36205f', '#21123d', '#422873']);
      // Gold clockwork gear border & teeth
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 0, 0, '#ffd43b', 2, 16);
      px(ctx, 14, 0, '#ffd43b', 2, 16);
      // Golden clockwork gear wheel in tile center
      px(ctx, 4, 4, '#fcc419', 8, 8);
      px(ctx, 7, 2, '#ffd43b', 2, 12);
      px(ctx, 2, 7, '#ffd43b', 12, 2);
      // Glowing cyan Palace of Winds swirl rune at core
      px(ctx, 6, 6, '#3bc9db', 4, 4);
      px(ctx, 7, 7, '#e3fafc', 2, 2);
      px(emCtx, 6, 6, '#22b8cf', 4, 4);
      px(emCtx, 4, 4, '#997a00', 8, 8);
      break;
    }

    case 'furnace_side': {
      // Giant Spellbook Spine & Gilded Library Tome Side (for Bookshelf & Clockwork Tunnel)
      fillNoise(ctx, rng, ['#1971c2', '#1864ab', '#1c7ed6', '#2b8a3e']);
      // Gold bookbinding raised bands & cream parchment page edges
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 7, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 3, 3, '#fff9db', 10, 3);
      px(ctx, 3, 10, '#fff9db', 10, 3);
      break;
    }

    case 'furnace_front': {
      // Giant Spellbook Cover with Glowing Kinstone & Ezlo Crest Front
      fillNoise(ctx, rng, ['#9c36b5', '#862e9c', '#ae3ec9']);
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 0, 0, '#ffd43b', 2, 16);
      px(ctx, 14, 0, '#ffd43b', 2, 16);
      px(ctx, 4, 4, '#ffd43b', 8, 8);
      px(ctx, 5, 5, '#38d9a9', 6, 6);
      px(ctx, 7, 7, '#fff9db', 2, 2);
      px(emCtx, 5, 5, '#20c997', 6, 6);
      break;
    }

    case 'amethyst': {
      // Sparkling Dewdrop & Four-Elements Crystal Ore Block
      fillNoise(ctx, rng, ['#1b4332', '#2d6a4f', '#40916c']);
      // Four Elements gems: Earth (purple), Fire (red), Water (blue), Wind (green/gold)
      px(ctx, 2, 2, '#cc5de8', 3, 3);
      px(ctx, 3, 3, '#f3d9fa', 1, 1);
      px(ctx, 10, 3, '#ff6b6b', 3, 3);
      px(ctx, 11, 4, '#fff5f5', 1, 1);
      px(ctx, 3, 10, '#3bc9db', 3, 3);
      px(ctx, 4, 11, '#e3fafc', 1, 1);
      px(ctx, 10, 10, '#ffd43b', 3, 3);
      px(ctx, 11, 11, '#fff9db', 1, 1);
      px(emCtx, 2, 2, '#9c36b5', 3, 3);
      px(emCtx, 10, 3, '#e03131', 3, 3);
      px(emCtx, 3, 10, '#15aabf', 3, 3);
      px(emCtx, 10, 10, '#fab005', 3, 3);
      break;
    }

    case 'bedrock_gold': {
      // Golden Kinstone & Clockwork Brass Gear Trim Block
      fillNoise(ctx, rng, ['#b45309', '#92400e', '#d97706']);
      px(ctx, 0, 0, '#ffd43b', 16, 3);
      px(ctx, 0, 13, '#ffd43b', 16, 3);
      px(ctx, 2, 4, '#ffd43b', 5, 7);
      px(ctx, 3, 5, '#fff9db', 3, 5);
      px(ctx, 9, 4, '#38d9a9', 5, 7);
      px(ctx, 10, 5, '#e6fcf5', 3, 5);
      px(emCtx, 2, 4, '#997a00', 5, 7);
      px(emCtx, 9, 4, '#12b886', 5, 7);
      break;
    }

    case 'mega_titan_side': {
      // Giant Vaati & Minish Sanctuary Boss Shrine Block Side
      fillNoise(ctx, rng, ['#1a1128', '#2b1d3d', '#212529']);
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 0, 0, '#ffd43b', 2, 16);
      px(ctx, 14, 0, '#ffd43b', 2, 16);
      const emblem = [
        '.C...Y...C.',
        '.CC.YYY.CC.',
        '.YYYYYYYYY.',
        '..CCCCCCC..',
        '....YYY....',
        '....YYY....',
        '....YYY....',
        '...........',
        '....CCC....',
        '....CCC....',
      ];
      drawBitmap(ctx, emblem, { Y: '#ffd43b', C: '#38d9a9' }, 3, 3);
      drawBitmap(emCtx, emblem, { Y: '#fab005', C: '#12b886' }, 3, 3);
      break;
    }

    case 'mega_titan_top': {
      fillNoise(ctx, rng, ['#1a1128', '#2b1d3d']);
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 0, 0, '#ffd43b', 2, 16);
      px(ctx, 14, 0, '#ffd43b', 2, 16);
      px(ctx, 4, 4, '#ffd43b', 8, 8);
      px(ctx, 6, 6, '#38d9a9', 4, 4);
      px(emCtx, 4, 4, '#d97706', 8, 8);
      break;
    }

    case 'chest_front': {
      // Minish Sanctuary Golden Kinstone Treasure Chest Front
      fillNoise(ctx, rng, ['#c92a2a', '#a61e4d', '#e03131']);
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 0, 0, '#ffd43b', 2, 16);
      px(ctx, 14, 0, '#ffd43b', 2, 16);
      px(ctx, 2, 6, '#78350f', 12, 2);
      px(ctx, 5, 4, '#ffd43b', 6, 6);
      px(ctx, 6, 5, '#38d9a9', 4, 4);
      px(emCtx, 5, 4, '#fab005', 6, 6);
      break;
    }

    case 'chest_side': {
      fillNoise(ctx, rng, ['#c92a2a', '#a61e4d', '#e03131']);
      px(ctx, 0, 0, '#ffd43b', 16, 2);
      px(ctx, 0, 14, '#ffd43b', 16, 2);
      px(ctx, 0, 0, '#ffd43b', 2, 16);
      px(ctx, 14, 0, '#ffd43b', 2, 16);
      px(ctx, 2, 6, '#78350f', 12, 2);
      px(ctx, 5, 9, '#38d9a9', 6, 3);
      break;
    }

    case 'chest_top': {
      fillNoise(ctx, rng, ['#ffd43b', '#f59f00', '#ffe066']);
      px(ctx, 0, 0, '#92400e', 16, 2);
      px(ctx, 0, 14, '#92400e', 16, 2);
      px(ctx, 0, 0, '#92400e', 2, 16);
      px(ctx, 14, 0, '#92400e', 2, 16);
      px(ctx, 5, 5, '#38d9a9', 6, 6);
      px(emCtx, 5, 5, '#12b886', 6, 6);
      break;
    }

    case 'water': {
      // Sparkling Minish Dewdrop Stream & Lagoon Water
      fillNoise(ctx, rng, ['#0ca678', '#12b886', '#15aabf', '#20c997']);
      px(ctx, 2, 3, '#96f2d7', 5, 1);
      px(ctx, 9, 8, '#e6fcf5', 5, 1);
      px(ctx, 4, 13, '#99e9f2', 6, 1);
      break;
    }

    case 'lantern_glow': {
      // Glowing Golden Kinstone & Minish Dewdrop Lantern Block
      px(ctx, 0, 0, '#0ca678', 16, 16);
      px(ctx, 2, 2, '#ffd43b', 12, 12);
      px(ctx, 4, 4, '#fff9db', 8, 8);
      px(emCtx, 1, 1, '#ffd43b', 14, 14);
      px(emCtx, 4, 4, '#ffffff', 8, 8);
      break;
    }

    case 'mushroom_red': {
      // Glowing Red-and-Gold Kinstone Laser / Toadstool Rim Block
      fillNoise(ctx, rng, ['#c92a2a', '#e03131']);
      for (let x = 0; x < 16; x += 4) {
        px(ctx, x, 0, '#ffd43b', 2, 3);
        px(ctx, x, 13, '#ffd43b', 2, 3);
      }
      px(ctx, 0, 5, '#ff6b6b', 16, 6);
      px(ctx, 0, 7, '#fff5f5', 16, 2);
      px(emCtx, 0, 5, '#fa5252', 16, 6);
      break;
    }

    case 'snowman_face': {
      // Giant Toy-House Window & Porcelain Teacup Lattice Block
      fillNoise(ctx, rng, ['#fff9db', '#ffdeeb']);
      px(ctx, 0, 0, '#d97706', 16, 2);
      px(ctx, 0, 14, '#b45309', 16, 2);
      px(ctx, 0, 0, '#d97706', 2, 16);
      px(ctx, 14, 0, '#b45309', 2, 16);
      // Warm sunlit cottage window panes + flower box
      px(ctx, 3, 3, '#74c0fc', 4, 8);
      px(ctx, 9, 3, '#74c0fc', 4, 8);
      px(ctx, 4, 4, '#e7f5ff', 2, 3);
      px(ctx, 10, 4, '#e7f5ff', 2, 3);
      px(ctx, 3, 11, '#40c057', 10, 3);
      px(ctx, 5, 11, '#ff6b9d', 2, 2);
      px(ctx, 9, 11, '#ffd43b', 2, 2);
      px(emCtx, 3, 3, '#3bc9db', 4, 8);
      px(emCtx, 9, 3, '#3bc9db', 4, 8);
      break;
    }

    default: {
      fillNoise(ctx, rng, ['#40c057', '#ffd43b']);
      break;
    }
  }
}

export function getAtlasUVRect(tileIdx) {
  const col = tileIdx % ATLAS_COLS;
  const row = Math.floor(tileIdx / ATLAS_COLS);
  const pad = 0.12 / ATLAS_SIZE;
  const u0 = (col * TILE_SIZE) / ATLAS_SIZE + pad;
  const u1 = ((col + 1) * TILE_SIZE) / ATLAS_SIZE - pad;
  const v1 = 1 - (row * TILE_SIZE) / ATLAS_SIZE - pad;
  const v0 = 1 - ((row + 1) * TILE_SIZE) / ATLAS_SIZE + pad;
  return { u0, v0, u1, v1 };
}

export function createAtlasBoxGeometry(faceTiles, w = 1, h = 1, d = 1) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.attributes.uv;
  const tiles = [
    faceTiles.px ?? faceTiles.side,
    faceTiles.nx ?? faceTiles.side,
    faceTiles.py ?? faceTiles.top ?? faceTiles.side,
    faceTiles.ny ?? faceTiles.bottom ?? faceTiles.top ?? faceTiles.side,
    faceTiles.pz ?? faceTiles.front ?? faceTiles.side,
    faceTiles.nz ?? faceTiles.back ?? faceTiles.front ?? faceTiles.side,
  ];
  for (let f = 0; f < 6; f++) {
    const { u0, v0, u1, v1 } = getAtlasUVRect(tiles[f]);
    const base = f * 4;
    uv.setXY(base + 0, u0, v1);
    uv.setXY(base + 1, u1, v1);
    uv.setXY(base + 2, u0, v0);
    uv.setXY(base + 3, u1, v0);
  }
  uv.needsUpdate = true;
  return geo;
}

function createRingGlowTexture() {
  const size = 64;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const r = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / (size * 0.5);
      if (r > 1) continue;
      const ringBand = Math.exp(-Math.pow((r - 0.78) / 0.11, 2));
      const innerFill = r < 0.78 ? 0.24 * (1 - r * 0.5) : 0;
      const alpha = Math.min(1, ringBand * 0.92 + innerFill);
      if (alpha > 0.02) {
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createSunTexture() {
  const size = 64;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  // Golden Kinstone Sunburst Rays + Canopy Medallion Sun
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cx;
      const r = Math.hypot(dx, dy) / cx;
      if (r < 1) {
        const ang = Math.atan2(dy, dx);
        const rayWave = 0.5 + 0.5 * Math.cos(ang * 8);
        const glow = Math.pow(Math.max(0, 1 - r), 1.5) * (0.72 + 0.28 * rayWave);
        ctx.fillStyle = `rgba(255,236,130,${glow.toFixed(3)})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  px(ctx, 18, 18, '#fab005', 28, 28);
  px(ctx, 21, 21, '#ffd43b', 22, 22);
  px(ctx, 24, 24, '#38d9a9', 16, 16);
  px(ctx, 27, 27, '#fff9db', 10, 10);
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createSparkleTexture() {
  const size = 16;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d');
  px(ctx, 7, 1, 'rgba(255,255,255,0.95)', 2, 14);
  px(ctx, 1, 7, 'rgba(255,255,255,0.95)', 14, 2);
  px(ctx, 5, 5, '#ffffff', 6, 6);
  return finalizePixelTexture(canvas, false);
}

export function createWorldTextures() {
  const rng = createRng(1337);
  const atlasCanvas = makeCanvas(ATLAS_SIZE, ATLAS_SIZE);
  const atlasCtx = atlasCanvas.getContext('2d');
  const emCanvas = makeCanvas(ATLAS_SIZE, ATLAS_SIZE);
  const emCtx = emCanvas.getContext('2d');
  emCtx.fillStyle = '#000000';
  emCtx.fillRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);

  const tiles = {};

  for (const [name, idx] of Object.entries(TILE_INDEX)) {
    const tileCanvas = makeCanvas(TILE_SIZE, TILE_SIZE);
    const tCtx = tileCanvas.getContext('2d');
    const tileEmCanvas = makeCanvas(TILE_SIZE, TILE_SIZE);
    const tEmCtx = tileEmCanvas.getContext('2d');
    tEmCtx.fillStyle = '#000000';
    tEmCtx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

    paintTile(name, tCtx, tEmCtx, rng);

    const col = idx % ATLAS_COLS;
    const row = Math.floor(idx / ATLAS_COLS);
    atlasCtx.drawImage(tileCanvas, col * TILE_SIZE, row * TILE_SIZE);
    emCtx.drawImage(tileEmCanvas, col * TILE_SIZE, row * TILE_SIZE);

    tiles[name] = finalizePixelTexture(tileCanvas, name === 'water');
  }

  const atlasTexture = finalizePixelTexture(atlasCanvas, false);
  const emissiveAtlasTexture = finalizePixelTexture(emCanvas, false);

  return {
    tiles,
    atlasTexture,
    emissiveAtlasTexture,
    ringGlowTex: createRingGlowTexture(),
    sunTex: createSunTexture(),
    sparkleTex: createSparkleTexture(),
  };
}

export const createProceduralTextures = createWorldTextures;
