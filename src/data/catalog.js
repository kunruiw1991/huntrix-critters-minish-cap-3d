// Canonical catalog for HUNTR/X & Smiling Critters: The Minish Cap 3D!
// Single source of truth imported by world, chars, game, ui, fx, and main so every ID and number matches 100%.

export const STORAGE_KEY = 'sahur_island_progress';

export const ISLAND_BOUNDS = Object.freeze({
  minX: -34,
  maxX: 34,
  minZ: -34,
  maxZ: 34,
  size: 72,
  hubRadius: 11.5,
  gardenLingerRadius: 5.8,
  hubProximityRadius: 8.5,
});

export const TOTEM_PADS = Object.freeze([
  Object.freeze({
    padIdx: 0,
    id: 'cappuccino_cafe',
    name: 'Magic Shrink Tree Stump',
    shortName: 'SHRINK STUMP',
    helperId: 'ballerina_cappuccina',
    helperName: 'Ezlo & Sussie Cap',
    emoji: '🪵🎩',
    x: -4.5,
    y: 1,
    z: 1.6,
  }),
  Object.freeze({
    padIdx: 1,
    id: 'banana_treehouse',
    name: 'Tipped Porcelain Shrink Jar',
    shortName: 'SHRINK JAR',
    helperId: 'chimpanzini_bananini',
    helperName: 'Rumi & Mira',
    emoji: '🏺✨',
    x: 4.5,
    y: 1,
    z: 1.6,
  }),
  Object.freeze({
    padIdx: 2,
    id: 'cactus_oasis_clock',
    name: 'Giant Red Toadstool Sanctuary',
    shortName: 'TOADSTOOL PAD',
    helperId: 'lirili_larila',
    helperName: 'CatNap & DogDay',
    emoji: '🍄🐱',
    x: -4.5,
    y: 1,
    z: -2.6,
  }),
  Object.freeze({
    padIdx: 3,
    id: 'sneaker_beach_hut',
    name: 'Golden Kinstone & Ezlo Shrine',
    shortName: 'EZLO SHRINE',
    helperId: 'cappuccino_assassino',
    helperName: 'Hoppy & Derpy Tiger',
    emoji: '🐯💎',
    x: 4.5,
    y: 1,
    z: -2.6,
  }),
]);

export const FLOWERPOT_PADS = TOTEM_PADS;
export const FLOWERPOT_PAD_POSITIONS = TOTEM_PADS;

const _shrinkPortalsList = [
  Object.freeze({
    idx: 0,
    id: 'hub_shrink_stump',
    name: 'Hub Magic Shrink Tree Stump',
    shortName: 'SHRINK STUMP',
    kind: 'stump',
    biome: 'hub',
    x: -3.2,
    y: 1,
    z: 3.2,
    radius: 2.2,
  }),
  Object.freeze({
    idx: 1,
    id: 'hub_porcelain_jar',
    name: 'Hub Tipped Porcelain Shrink Jar',
    shortName: 'PORCELAIN JAR',
    kind: 'jar',
    biome: 'hub',
    x: 3.2,
    y: 1,
    z: 3.2,
    radius: 2.2,
  }),
  Object.freeze({
    idx: 2,
    id: 'meadow_minish_stump',
    name: 'Minish Woods Shrink Tree Stump',
    shortName: 'WOODS STUMP',
    kind: 'stump',
    biome: 'meadow',
    x: -12.5,
    y: 1,
    z: 12.5,
    radius: 2.2,
  }),
  Object.freeze({
    idx: 3,
    id: 'snow_bakery_jar',
    name: 'Hyrule Bakery Tipped Shrink Jar',
    shortName: 'BAKERY JAR',
    kind: 'jar',
    biome: 'snow',
    x: -12.5,
    y: 1,
    z: -12.5,
    radius: 2.2,
  }),
  Object.freeze({
    idx: 4,
    id: 'farm_castor_stump',
    name: 'Castor Wilds Shrink Tree Stump',
    shortName: 'CASTOR STUMP',
    kind: 'stump',
    biome: 'farm',
    x: 12.5,
    y: 1,
    z: 12.5,
    radius: 2.2,
  }),
  Object.freeze({
    idx: 5,
    id: 'castle_library_jar',
    name: 'Royal Library Tipped Celadon Jar',
    shortName: 'LIBRARY JAR',
    kind: 'jar',
    biome: 'castle',
    x: 12.5,
    y: 1,
    z: -12.5,
    radius: 2.2,
  }),
];
for (const portal of _shrinkPortalsList) {
  Object.defineProperty(_shrinkPortalsList, portal.id, {
    value: portal,
    enumerable: false,
    configurable: false,
    writable: false,
  });
}
export const SHRINK_PORTALS = Object.freeze(_shrinkPortalsList);

const _tinyPassagesList = [
  Object.freeze({
    idx: 0,
    id: 'hollow_log_tunnel',
    name: 'Hollow Tree Log Tunnel',
    shortName: 'LOG TUNNEL',
    biome: 'meadow',
    requiresTiny: true,
    x: -16.0,
    y: 1,
    z: 16.0,
    radius: 2.6,
    entry: Object.freeze({ x: -14.0, y: 1, z: 14.0 }),
    exit: Object.freeze({ x: -20.0, y: 1, z: 20.0 }),
    bonusGems: 4,
  }),
  Object.freeze({
    idx: 1,
    id: 'dollhouse_mousehole_tunnel',
    name: 'Bakery Dollhouse Mousehole',
    shortName: 'MOUSEHOLE',
    biome: 'snow',
    requiresTiny: true,
    x: -16.0,
    y: 1,
    z: -16.0,
    radius: 2.6,
    entry: Object.freeze({ x: -14.0, y: 1, z: -14.0 }),
    exit: Object.freeze({ x: -20.0, y: 2, z: -20.0 }),
    bonusGems: 4,
  }),
  Object.freeze({
    idx: 2,
    id: 'lilypad_bamboo_tunnel',
    name: 'Lily-Pad Stream Bamboo Pipe',
    shortName: 'BAMBOO PIPE',
    biome: 'farm',
    requiresTiny: true,
    x: 16.0,
    y: 1,
    z: 16.0,
    radius: 2.6,
    entry: Object.freeze({ x: 14.0, y: 1, z: 14.0 }),
    exit: Object.freeze({ x: 20.0, y: 1, z: 20.0 }),
    bonusGems: 4,
  }),
  Object.freeze({
    idx: 3,
    id: 'bookshelf_gear_tunnel',
    name: 'Library Bookshelf Clockwork Crack',
    shortName: 'GEAR CRACK',
    biome: 'castle',
    requiresTiny: true,
    x: 16.0,
    y: 1,
    z: -16.0,
    radius: 2.6,
    entry: Object.freeze({ x: 14.0, y: 1, z: -14.0 }),
    exit: Object.freeze({ x: 21.0, y: 2, z: -21.0 }),
    bonusGems: 5,
  }),
];
for (const passage of _tinyPassagesList) {
  Object.defineProperty(_tinyPassagesList, passage.id, {
    value: passage,
    enumerable: false,
    configurable: false,
    writable: false,
  });
}
export const TINY_PASSAGES = Object.freeze(_tinyPassagesList);

export const HUB_LAYOUT = Object.freeze({
  spawn: Object.freeze({ x: 0, y: 1, z: 4.5, facingX: 0, facingZ: 1.5 }),
  starterBlock: Object.freeze({ x: 0, y: 1, z: 2.0 }),
  boingLanding: Object.freeze({ x: 0, y: 1, z: 3.4 }),
  rouletteWheel: Object.freeze({ x: 0, y: 1, z: -1.6 }),
  rouletteChest: Object.freeze({ x: 0, y: 1, z: -1.6 }),
  totemPads: TOTEM_PADS,
  flowerpotPads: TOTEM_PADS,
  shrinkPortals: SHRINK_PORTALS,
  tinyPassages: TINY_PASSAGES,
  trophyPedestals: Object.freeze([
    Object.freeze({ idx: 0, titanId: 'tralalero_tralala', bossId: 'tralalero_tralala', x: -4.8, y: 1, z: -7.5 }),
    Object.freeze({ idx: 1, titanId: 'bombardiro_crocodilo', bossId: 'bombardiro_crocodilo', x: -1.6, y: 1, z: -8.2 }),
    Object.freeze({ idx: 2, titanId: 'brr_brr_patapim', bossId: 'brr_brr_patapim', x: 1.6, y: 1, z: -8.2 }),
    Object.freeze({ idx: 3, titanId: 'golden_sahur_king', bossId: 'golden_sahur_king', x: 4.8, y: 1, z: -7.5 }),
  ]),
});

export const BIOMES = Object.freeze({
  hub: Object.freeze({
    id: 'hub',
    name: 'Hyrule Shrink-Stump Courtyard & Kinstone Hub',
    titanId: null,
    bossId: null,
    groundColor: 0x62cf57,
  }),
  meadow: Object.freeze({
    id: 'meadow',
    name: 'Minish Woods & Hollow Tree Log Tunnel',
    quadrant: 'SW',
    bounds: Object.freeze({ minX: -31, maxX: -7, minZ: 6, maxZ: 31 }),
    megaTitanPos: Object.freeze({ x: -18, y: 1, z: 18 }),
    titanId: 'tralalero_tralala',
    bossId: 'tralalero_tralala',
    groundColor: 0x58c94e,
  }),
  snow: Object.freeze({
    id: 'snow',
    name: 'Hyrule Town Bakery & Tipped Jar Loft',
    quadrant: 'NW',
    bounds: Object.freeze({ minX: -31, maxX: -7, minZ: -31, maxZ: -6 }),
    megaTitanPos: Object.freeze({ x: -18, y: 2, z: -18 }),
    titanId: 'bombardiro_crocodilo',
    bossId: 'bombardiro_crocodilo',
    groundColor: 0xdff5ff,
  }),
  farm: Object.freeze({
    id: 'farm',
    name: 'Castor Wilds Lily-Pad Stream & Bamboo Pipe',
    quadrant: 'SE',
    bounds: Object.freeze({ minX: 7, maxX: 31, minZ: 6, maxZ: 31 }),
    megaTitanPos: Object.freeze({ x: 18, y: 1, z: 18 }),
    titanId: 'brr_brr_patapim',
    bossId: 'brr_brr_patapim',
    groundColor: 0x9fd448,
  }),
  castle: Object.freeze({
    id: 'castle',
    name: 'Royal Library Bookshelf & Palace of Winds',
    quadrant: 'NE',
    bounds: Object.freeze({ minX: 7, maxX: 31, minZ: -31, maxZ: -6 }),
    megaTitanPos: Object.freeze({ x: 20, y: 2, z: -20 }),
    titanId: 'golden_sahur_king',
    bossId: 'golden_sahur_king',
    groundColor: 0xd6b556,
  }),
});

export const WEAPON_ORDER = Object.freeze([
  'wooden_kentungan_bat',
  'bronze_temple_gong',
  'golden_sahur_mallet',
  'neon_thunder_taiko',
  'rainbow_mega_hammer',
]);

export const DRUM_CLUB_ORDER = WEAPON_ORDER;

export const WEAPONS = Object.freeze({
  wooden_kentungan_bat: Object.freeze({
    id: 'wooden_kentungan_bat',
    name: '★1 Picori Short Sword',
    shortName: 'PICORI SWORD',
    tier: 1,
    damage: 24,
    mineHitsNormal: 2,
    mineHitsTough: 2,
    mineHitsLucky: 3,
    bonusGems: 0,
    color: '#2fb344',
    accentColor: '#ffd026',
    emoji: '🗡️',
    voId: 'guide_welcome',
  }),
  bronze_temple_gong: Object.freeze({
    id: 'bronze_temple_gong',
    name: '★2 Magical Gust Jar',
    shortName: 'GUST JAR',
    tier: 2,
    damage: 34,
    mineHitsNormal: 2,
    mineHitsTough: 2,
    mineHitsLucky: 3,
    bonusGems: 0,
    color: '#38d9a9',
    accentColor: '#96f2d7',
    emoji: '🏺',
    voId: 'vo_wpn_gong',
  }),
  golden_sahur_mallet: Object.freeze({
    id: 'golden_sahur_mallet',
    name: '★3 Cane of Pacci',
    shortName: 'PACCI CANE',
    tier: 3,
    damage: 50,
    mineHitsNormal: 2,
    mineHitsTough: 2,
    mineHitsLucky: 3,
    bonusGems: 0,
    color: '#ffd43b',
    accentColor: '#ff922b',
    emoji: '🪄',
    voId: 'vo_wpn_mallet',
  }),
  neon_thunder_taiko: Object.freeze({
    id: 'neon_thunder_taiko',
    name: '★4 Digging Mole Mitts',
    shortName: 'MOLE MITTS',
    tier: 4,
    damage: 72,
    mineHitsNormal: 1,
    mineHitsTough: 1,
    mineHitsLucky: 3,
    bonusGems: 0,
    color: '#4dabf7',
    accentColor: '#ff82a9',
    emoji: '🐾',
    voId: 'vo_wpn_taiko',
  }),
  rainbow_mega_hammer: Object.freeze({
    id: 'rainbow_mega_hammer',
    name: '★5 Four Sword Golden Blade',
    shortName: 'FOUR SWORD',
    tier: 5,
    damage: 92,
    mineHitsNormal: 1,
    mineHitsTough: 1,
    mineHitsLucky: 3,
    bonusGems: 1,
    color: '#fcc419',
    accentColor: '#ffd026',
    emoji: '⚔️',
    voId: 'vo_wpn_rainbow',
  }),
});

export const DRUM_CLUBS = WEAPONS;

export const LEGACY_WEAPON_ALIASES = Object.freeze({
  wood_stick: 'wooden_kentungan_bat',
  stone_mallet: 'bronze_temple_gong',
  iron_sledge: 'golden_sahur_mallet',
  diamond_cleaver: 'neon_thunder_taiko',
  sparkle_sword: 'bronze_temple_gong',
  gold_pickaxe: 'bronze_temple_gong',
  ocean_trident: 'golden_sahur_mallet',
  thunder_hammer: 'neon_thunder_taiko',
  rainbow_blade: 'rainbow_mega_hammer',
  rainbow_mega_hammer: 'rainbow_mega_hammer',
  sussie_gat_boomerang: 'wooden_kentungan_bat',
  honmoon_light_blade: 'bronze_temple_gong',
  cookie_drill_pickaxe: 'golden_sahur_mallet',
  porcelain_peony_mallet: 'neon_thunder_taiko',
  diamond_rescue_sword: 'rainbow_mega_hammer',
  picori_short_sword: 'wooden_kentungan_bat',
  magical_gust_jar: 'bronze_temple_gong',
  cane_of_pacci: 'golden_sahur_mallet',
  digging_mole_mitts: 'neon_thunder_taiko',
  four_sword_golden_blade: 'rainbow_mega_hammer',
  four_sword: 'rainbow_mega_hammer',
});

export function resolveWeaponId(id) {
  if (!id) return 'wooden_kentungan_bat';
  const key = String(id).trim();
  if (WEAPONS[key]) return key;
  if (LEGACY_WEAPON_ALIASES[key]) return LEGACY_WEAPON_ALIASES[key];
  return 'wooden_kentungan_bat';
}

export const ROULETTE_COSTS = Object.freeze([28, 88, 112, 120, 270, 290]);

export const TOTEM_TIERS = Object.freeze({
  0: Object.freeze({
    tier: 0,
    id: 'sleepy_cottage',
    name: 'Sleepy Shrink Tree Stump',
    shortName: 'SHRINK STUMP',
    gemYield: 0,
    intervalSec: 0,
    costGems: 6,
    voId: null,
  }),
  1: Object.freeze({
    tier: 1,
    id: 'cottage_totem',
    name: 'Magic Shrink Tree Stump',
    shortName: 'SHRINK STUMP ★1',
    gemYield: 2,
    intervalSec: 3.3,
    costGems: 6,
    color: '#4dabf7',
    voId: 'vo_totem_tier1',
  }),
  2: Object.freeze({
    tier: 2,
    id: 'rhythm_pavilion',
    name: 'Giant Red Toadstool & Peony Jar',
    shortName: 'PEONY JAR ★2',
    gemYield: 4,
    intervalSec: 2.9,
    costGems: 12,
    color: '#ff82a9',
    voId: 'vo_totem_tier2',
  }),
  3: Object.freeze({
    tier: 3,
    id: 'ultimate_sahur_tower',
    name: 'Golden Kinstone & Ezlo Shrine',
    shortName: 'EZLO SHRINE ★3',
    gemYield: 8,
    intervalSec: 2.5,
    costGems: 20,
    color: '#ffd026',
    voId: 'vo_totem_tier3',
  }),
});

export const FLOWERPOT_TIERS = TOTEM_TIERS;
export const FLOWERPOTS = TOTEM_TIERS;

export const LOOT_TABLE = Object.freeze([
  Object.freeze({ id: 'drum_star_small', weight: 39, gems: 1, label: '+1 KINSTONE STAR!', color: '#ffd43b', voId: 'vo_drop_stars' }),
  Object.freeze({ id: 'star_shower_jackpot', weight: 4, gems: 5, label: 'GOLDEN KINSTONE JACKPOT!', color: '#ff922b', voId: 'vo_drop_jackpot' }),
  Object.freeze({ id: 'totem_seed', weight: 6, gems: 1, isSeed: true, label: 'MINISH SHRINK ACORN!', color: '#51cf66', voId: 'vo_drop_seed' }),
  Object.freeze({ id: 'free_spin_token', weight: 3, gems: 1, isFreeSpin: true, label: 'FREE SPIN!', color: '#fcc419', voId: 'vo_drop_wheel' }),
  Object.freeze({ id: 'croissant_mango_feast', weight: 11, gems: 1, label: 'BAKERY BRIOCHE TREAT!', color: '#ffa94d', voId: 'vo_drop_mango' }),
  Object.freeze({ id: 'latte_speed_boost', weight: 9, gems: 1, shield: 1, latteBoost: true, label: 'PEGASUS BOOTS ZOOM!', color: '#38d9a9', voId: 'vo_drop_latte' }),
  Object.freeze({ id: 'mini_chimpanzini_dance', weight: 8, gems: 1, critter: 'mini_bananini', label: 'MINI RUMI & ZOEY!', color: '#ffe066', voId: 'vo_drop_bananini' }),
  Object.freeze({ id: 'confetti_fireworks_pop', weight: 7, gems: 1, critter: 'mini_cappuccina', label: 'EZLO & SUSSIE CAP!', color: '#74c0fc', voId: 'vo_drop_confetti' }),
  Object.freeze({ id: 'silly_cushion_toot', weight: 6, gems: 1, critter: 'mini_lirili', label: 'CATNAP & DOGDAY!', color: '#99e9f2', voId: 'vo_drop_toot' }),
  Object.freeze({ id: 'speed_boots', weight: 4, gems: 2, gear: 'speedBoots', label: 'PEGASUS BOOTS!', color: '#3bc9db', voId: 'vo_gear_boots' }),
  Object.freeze({ id: 'gold_helmet', weight: 3, gems: 2, gear: 'helmet', label: 'EZLO MINISH CAP CROWN!', color: '#ffd43b', voId: 'vo_gear_crown' }),
  Object.freeze({ id: 'star_cape', weight: 4, gems: 2, gear: 'starCape', label: 'ROC MAGNET CAPE!', color: '#cc5de8', voId: 'vo_gear_cape' }),
  Object.freeze({ id: 'surprise_boss', weight: 4, gems: 0, isSurpriseBoss: true, label: 'SURPRISE MINISH BOSS!', color: '#ff4d4f', voId: 'vo_boss_alert' }),
]);

export const CRITTER_TYPES = Object.freeze({
  mini_cappuccina: Object.freeze({
    id: 'mini_cappuccina',
    legacySpecies: 'piggy',
    name: 'Ezlo & Sussie Cap Buddy',
    bonusGems: 4,
    color: 0x2fb344,
    voId: 'vo_pet_cappuccina',
  }),
  mini_bananini: Object.freeze({
    id: 'mini_bananini',
    legacySpecies: 'bee',
    name: 'Mini Rumi & Mira Helper',
    bonusGems: 4,
    color: 0xb197fc,
    voId: 'vo_pet_bananini',
  }),
  mini_lirili: Object.freeze({
    id: 'mini_lirili',
    legacySpecies: 'chick',
    name: 'CatNap & DogDay Buddy',
    bonusGems: 3,
    color: 0xff922b,
    voId: 'vo_pet_lirili',
  }),
});

export const TITAN_ORDER = Object.freeze([
  'tralalero_tralala',
  'bombardiro_crocodilo',
  'brr_brr_patapim',
  'golden_sahur_king',
]);

export const BOSS_ORDER = TITAN_ORDER;

export const LEGACY_TITAN_ALIASES = Object.freeze({
  q1: 'tralalero_tralala',
  q2: 'bombardiro_crocodilo',
  q3: 'brr_brr_patapim',
  q4: 'golden_sahur_king',
  moss_titan: 'tralalero_tralala',
  snow_titan: 'bombardiro_crocodilo',
  thunder_titan: 'brr_brr_patapim',
  bedrock_king: 'golden_sahur_king',
  zombie_captain: 'tralalero_tralala',
  drill_golem: 'bombardiro_crocodilo',
  closet_puppet: 'brr_brr_patapim',
  security_boss: 'golden_sahur_king',
  giant_chuchu: 'tralalero_tralala',
  gleerok_dragon: 'bombardiro_crocodilo',
  mazaal_golem: 'brr_brr_patapim',
  vaati_sorcerer: 'golden_sahur_king',
});

export function resolveBossId(id) {
  if (!id) return TITAN_ORDER[0];
  const key = String(id).trim();
  if (TITANS[key]) return key;
  const lower = key.toLowerCase();
  if (TITANS[lower]) return lower;
  if (LEGACY_TITAN_ALIASES[key]) return LEGACY_TITAN_ALIASES[key];
  if (LEGACY_TITAN_ALIASES[lower]) return LEGACY_TITAN_ALIASES[lower];
  return TITAN_ORDER[0];
}

export const TITANS = Object.freeze({
  tralalero_tralala: Object.freeze({
    id: 'tralalero_tralala',
    name: 'Giant Green ChuChu',
    shortName: 'GIANT CHUCHU ★1',
    biome: 'meadow',
    requiredTier: 1,
    requiresBoots: false,
    maxHp: 180,
    scale: 4.2,
    rewardGems: 6,
    spawnPos: Object.freeze({ x: -18, y: 1, z: 18 }),
    bodyColor: 0x51cf66,
    accentColor: 0x2fb344,
    voSpawn: 'boss_tralalero_spawn',
    voBoing: 'boss_tralalero_boing',
    voOuch: 'boss_tralalero_ouch',
    voDefeat: 'boss_tralalero_defeat',
    voCheer: 'vo_win_tralalero',
  }),
  bombardiro_crocodilo: Object.freeze({
    id: 'bombardiro_crocodilo',
    name: 'Gleerok Twin-Neck Dragon',
    shortName: 'GLEEROK DRAGON ★2',
    biome: 'snow',
    requiredTier: 2,
    requiresBoots: false,
    maxHp: 240,
    scale: 4.4,
    rewardGems: 8,
    spawnPos: Object.freeze({ x: -18, y: 2, z: -18 }),
    bodyColor: 0xff6b6b,
    accentColor: 0xff922b,
    voSpawn: 'boss_bombardiro_spawn',
    voBoing: 'boss_bombardiro_boing',
    voOuch: 'boss_bombardiro_ouch',
    voDefeat: 'boss_bombardiro_defeat',
    voCheer: 'vo_win_bombardiro',
  }),
  brr_brr_patapim: Object.freeze({
    id: 'brr_brr_patapim',
    name: 'Mazaal Wind Ruins Golem',
    shortName: 'MAZAAL GOLEM ★3',
    biome: 'farm',
    requiredTier: 3,
    requiresBoots: true,
    maxHp: 370,
    scale: 4.6,
    rewardGems: 10,
    spawnPos: Object.freeze({ x: 18, y: 1, z: 18 }),
    bodyColor: 0xfcc419,
    accentColor: 0x3bc9db,
    voSpawn: 'boss_patapim_spawn',
    voBoing: 'boss_patapim_boing',
    voOuch: 'boss_patapim_ouch',
    voDefeat: 'boss_patapim_defeat',
    voCheer: 'vo_win_patapim',
  }),
  golden_sahur_king: Object.freeze({
    id: 'golden_sahur_king',
    name: 'Vaati Wind Mage Sorcerer',
    shortName: 'VAATI SORCERER ★4',
    biome: 'castle',
    requiredTier: 4,
    requiresBoots: true,
    maxHp: 540,
    scale: 5.0,
    rewardGems: 12,
    spawnPos: Object.freeze({ x: 20, y: 2, z: -20 }),
    bodyColor: 0x9775fa,
    accentColor: 0xffd43b,
    voSpawn: 'boss_king_spawn',
    voBoing: 'boss_king_boing',
    voOuch: 'boss_king_ouch',
    voDefeat: 'boss_king_defeat',
    voCheer: 'vo_win_king',
  }),
});

export const BOSSES = TITANS;

export const MOVEMENT_TUNING = Object.freeze({
  baseSpeed: 8.5,
  bootsSpeed: 10.8,
  helmetSpeed: 10.8,
  latteSpeed: 10.8,
  swingIntervalSec: 0.30,
  autoHoldBonkMs: 300,
  comboShockwaveRadius: 4.0,
  comboBonusGems: 2,
  interactRange: 2.6,
  titanMeleeRange: 4.2,
  pickupMagnetRadius: 3.6,
  capeMagnetRadius: 5.8,
  jumpVelocity: 11.5,
  jumpGravityUp: 28.0,
  jumpGravityDown: 38.0,
  stickThrowRange: 6.2,
  stickOutboundSec: 0.32,
  stickHoverSec: 0.16,
  stickReturnSec: 0.34,
});
