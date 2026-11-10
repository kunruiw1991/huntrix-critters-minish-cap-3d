// Kid-friendly English UI copy (<= 6 uppercase characters per HUD button label) + emoji tokens
// for HUNTR/X & Smiling Critters: The Minish Cap 3D!
// Zero CJK characters anywhere.

export const STRINGS = Object.freeze({
  GAME_TITLE: 'THE MINISH CAP 3D!',
  GAME_SUBTITLE: "Rumi, CatNap, DogDay & Derpy Tiger's Tiny Shrink-Stump Adventure!",

  TITLE: Object.freeze({
    kicker: '\uD83C\uDFA9 HUNTR/X & SMILING CRITTERS MINISH CAP \u2728',
    heading: 'THE MINISH CAP 3D!',
    sub: "Rumi, CatNap, DogDay & Derpy Tiger's Tiny Shrink-Stump Adventure!",
    continueBtn: 'CONTINUE!',
    continueAria: 'Continue Saved Minish Cap Adventure',
    playBtn: 'PLAY!',
    playAria: 'Play HUNTR/X & Smiling Critters: The Minish Cap 3D!',
    voiceBtn: 'VOICE',
    voiceAria: 'Replay Voice Guide',
  }),

  HUD: Object.freeze({
    starsAria: 'Kinstone Star Gems',
    powerAria: 'Minish Power Level',
    shieldsAria: 'Ezlo Shield Hearts',
    trophiesAria: 'Four Sword Element Trophies',
    spinLabel: 'SPIN',
    spinFree: 'FREE!',
    spinAria: 'Open Kinstone Mystery Spin Chest',
    potPlantLabel: 'SHRINK',
    potGrowLabel: 'GROW',
    potMaxLabel: 'MAX!',
    potAria: 'Activate Magic Shrink Stump or Grow Sanctuary',
    voiceLabel: 'VOICE',
    voiceAria: 'Replay Voice Line',
    menuLabel: 'PAUSE',
    menuAria: 'Open Pause Menu',
    jumpLabel: 'JUMP!',
    jumpAirLabel: 'AIR!',
    jumpAria: 'Jump Up High with Rumi, CatNap & Derpy Tiger',
    drumLabel: 'THROW!',
    drumAria: 'Throw Ezlo Cap & Smash Kinstone Blocks',
  }),

  ROULETTE: Object.freeze({
    title: 'KINSTONE CHEST SPIN!',
    spinBtn: 'SPIN!',
    spinFreeBtn: 'FREE SPIN!',
    spinningBtn: 'SPINNING...',
    awesomeBtn: 'EQUIPPED!',
    closeBtn: 'PLAY!',
    spinAria: 'Spin Kinstone Chest for Minish Cap Relics',
    closeAria: 'Close Kinstone Chest and Play',
    awesomeAria: 'Keep New Minish Relic and Play',
    hintReady: 'TAP SPIN FOR PICORI & FOUR SWORD RELICS!',
    hintFree: 'FREE GOLDEN KINSTONE SPIN READY!',
    hintNeedStars: 'SMASH LUCKY BLOCKS OR GROW STUMPS FOR STARS!',
    hintSpinning: 'KINSTONE HALVES FUSING ROUND AND ROUND...',
    equippedBadge: 'EQUIPPED!',
  }),

  PAUSE: Object.freeze({
    title: 'GAME PAUSED',
    musicLabel: 'MUSIC',
    soundLabel: 'SOUND',
    voiceLabel: 'VOICE',
    chaosLabel: '2X PARTY',
    stateOn: 'ON',
    stateOff: 'OFF',
    resumeBtn: 'PLAY ON!',
    newIslandBtn: 'NEW MAP!',
    musicAria: 'Toggle Minish Chiptune Music',
    soundAria: 'Toggle Sound Effects',
    voiceAria: 'Toggle English Voiceover',
    chaosAria: 'Toggle 2X Minish Party Mode',
    resumeAria: 'Resume Playing',
    newIslandAria: 'Generate a New Minish Courtyard Map',
  }),

  VICTORY: Object.freeze({
    title: 'MINISH CAP CHAMPIONS!',
    crownBadge: '4 / 4 ELEMENTS WON & HYRULE SAVED!',
    playMoreBtn: 'KEEP PLAYING!',
    chaosOnBtn: '2X PARTY: ON!',
    chaosOffBtn: '2X PARTY!',
    newIslandBtn: 'NEW MAP!',
    playMoreAria: 'Continue Free Play on Current Map',
    chaosAria: 'Toggle 2X Minish Party Mode',
    newIslandAria: 'Start a New Seeded Minish Map',
  }),

  BOSS: Object.freeze({
    readyTag: 'BONK!',
    needPrefix: 'NEED',
  }),

  COMIC: Object.freeze({
    hitWords: Object.freeze(['MINISH TINY!', 'GIANT BIG!', 'TINY TUNNEL!', 'KINSTONE!', 'BOING!']),
    boingWord: 'BOING! NEED STARS!',
    shrinkWord: 'MINISH TINY!',
    growWord: 'GIANT BIG!',
    tunnelWord: 'TINY TUNNEL!',
    kinstoneWord: 'KINSTONE!',
  }),

  WEAPONS: Object.freeze({
    wooden_kentungan_bat: Object.freeze({
      short: 'PICORI SWORD',
      title: 'PICORI SHORT SWORD',
      emoji: '\uD83D\uDDE1\uFE0F',
    }),
    bronze_temple_gong: Object.freeze({
      short: 'GUST JAR',
      title: 'MAGICAL GUST JAR',
      emoji: '\uD83C\uDFFA',
    }),
    golden_sahur_mallet: Object.freeze({
      short: 'PACCI CANE',
      title: 'CANE OF PACCI',
      emoji: '\uD83E\uDE84',
    }),
    neon_thunder_taiko: Object.freeze({
      short: 'MOLE MITTS',
      title: 'DIGGING MOLE MITTS',
      emoji: '\uD83D\uDC3E',
    }),
    rainbow_mega_hammer: Object.freeze({
      short: 'FOUR SWORD',
      title: 'FOUR SWORD GOLDEN BLADE',
      emoji: '\u2694\uFE0F',
    }),
  }),

  TITANS: Object.freeze({
    tralalero_tralala: Object.freeze({
      short: 'GIANT CHUCHU',
      badge: 'WOODS',
      icon: '\uD83D\uDFE2',
    }),
    bombardiro_crocodilo: Object.freeze({
      short: 'GLEEROK DRAGON',
      badge: 'BAKERY',
      icon: '\uD83D\uDC09',
    }),
    brr_brr_patapim: Object.freeze({
      short: 'MAZAAL GOLEM',
      badge: 'STREAM',
      icon: '\uD83D\uDDFF',
    }),
    golden_sahur_king: Object.freeze({
      short: 'VAATI SORCERER',
      badge: 'LIBRARY',
      icon: '\uD83D\uDD2E',
    }),
  }),
});

export function formatTierBadge(tier) {
  const safeTier = Math.max(1, Math.min(5, Math.floor(Number(tier) || 1)));
  return `\u2605${safeTier}`;
}

export function formatStarCost(cost) {
  const n = Math.max(0, Math.floor(Number(cost) || 0));
  return n === 0 ? 'FREE!' : `\u2B50${n}`;
}
