// Canonical 68-clip neural voiceover catalog for HUNTR/X & Smiling Critters: The Minish Cap 3D!
// Synthesized via edge-tts (en-US-GuyNeural, en-US-ChristopherNeural, en-US-AnaNeural) into assets/voice/*.mp3.

export const VOICE_SPEAKERS = Object.freeze({
  narrator: Object.freeze({
    id: 'narrator',
    name: 'Minish Cap Announcer',
    voice: 'en-US-AnaNeural',
    rate: '+6%',
    pitch: '+6Hz',
  }),
  cappuccina: Object.freeze({
    id: 'cappuccina',
    name: 'Rumi Mira & Zoey',
    voice: 'en-US-AnaNeural',
    rate: '+8%',
    pitch: '+12Hz',
  }),
  bananini: Object.freeze({
    id: 'bananini',
    name: 'Ezlo & Sussie Cap',
    voice: 'en-US-AnaNeural',
    rate: '+12%',
    pitch: '+16Hz',
  }),
  lirili: Object.freeze({
    id: 'lirili',
    name: 'CatNap DogDay & Hoppy',
    voice: 'en-US-AnaNeural',
    rate: '+5%',
    pitch: '+8Hz',
  }),
  sahur: Object.freeze({
    id: 'sahur',
    name: 'Derpy Tiger',
    voice: 'en-US-GuyNeural',
    rate: '+8%',
    pitch: '+4Hz',
  }),
  tralalero: Object.freeze({
    id: 'tralalero',
    name: 'Giant Green ChuChu',
    voice: 'en-US-GuyNeural',
    rate: '+6%',
    pitch: '-6Hz',
  }),
  bombardiro: Object.freeze({
    id: 'bombardiro',
    name: 'Gleerok Twin Dragon',
    voice: 'en-US-ChristopherNeural',
    rate: '+4%',
    pitch: '-10Hz',
  }),
  patapim: Object.freeze({
    id: 'patapim',
    name: 'Mazaal Wind Golem',
    voice: 'en-US-ChristopherNeural',
    rate: '+2%',
    pitch: '-14Hz',
  }),
  sahur_king: Object.freeze({
    id: 'sahur_king',
    name: 'Vaati Wind Sorcerer',
    voice: 'en-US-GuyNeural',
    rate: '+2%',
    pitch: '-16Hz',
  }),
});

export const VOICE_CATALOG = Object.freeze([
  // 1. Onboarding, Shrink Stump, Tiny Passages & Kid Coaching (10)
  Object.freeze({
    id: 'guide_title',
    speaker: 'narrator',
    text: 'Welcome to Huntrix and Smiling Critters The Minish Cap Three D with Rumi, CatNap, DogDay, and Derpy Tiger! Tap Play!',
  }),
  Object.freeze({
    id: 'guide_welcome',
    speaker: 'sahur',
    text: 'Roar hehehe! Derpy Tiger and Ezlo Sussie Magic Minish Cap here! Tap the glowing Kinstone Lucky Block right in front of us!',
  }),
  Object.freeze({
    id: 'guide_starter_pop',
    speaker: 'narrator',
    text: 'Awesome! Golden Kinstone Stars, a Minish Shrink Acorn, and a Free Kinstone Chest Spin!',
  }),
  Object.freeze({
    id: 'guide_tap_block',
    speaker: 'narrator',
    text: 'Press Throw or tap any glowing Lucky Block to smash it open and shrink on the Magic Tree Stump!',
  }),
  Object.freeze({
    id: 'guide_combo_sahur',
    speaker: 'sahur',
    text: 'Picori slash, Ezlo cap spin, tiny pounce! Super Four Sword Kinstone shockwave combo!',
  }),
  Object.freeze({
    id: 'guide_boing_hint',
    speaker: 'narrator',
    text: 'Boing! That Minish Boss has tough armor! Spin the Kinstone Chest for stronger Picori relics first!',
  }),
  Object.freeze({
    id: 'guide_ready_tralalero',
    speaker: 'narrator',
    text: 'Picori Short Sword ready! Scurry through the Hollow Tree Log Tunnel to bonk the Giant Green ChuChu!',
  }),
  Object.freeze({
    id: 'guide_ready_bombardiro',
    speaker: 'narrator',
    text: 'Magical Gust Jar ready! Sneak through the Bakery Mousehole and Tipped Porcelain Jar to bonk Gleerok Dragon!',
  }),
  Object.freeze({
    id: 'guide_ready_patapim',
    speaker: 'narrator',
    text: 'Cane of Pacci and Pegasus Boots on! Dash through the Lily-Pad Bamboo Pipe to bonk Mazaal Golem!',
  }),
  Object.freeze({
    id: 'guide_ready_king',
    speaker: 'narrator',
    text: 'Digging Mole Mitts ready! Climb the Bookshelf Gear Crack to bonk Vaati Wind Sorcerer and save Hyrule!',
  }),

  // 2. 5 Minish Cap Weapons & Relics (5)
  Object.freeze({
    id: 'vo_wpn_bat',
    speaker: 'sahur',
    text: 'Star One Picori Short Sword! Tiny blade power from the Minish woods for smashing Kinstone blocks!',
  }),
  Object.freeze({
    id: 'vo_wpn_gong',
    speaker: 'cappuccina',
    text: 'Whoosh sparkle! Rumi, Mira, and Zoey unleash the Magical Gust Jar whirlwind!',
  }),
  Object.freeze({
    id: 'vo_wpn_mallet',
    speaker: 'bananini',
    text: 'Boing flip! Cane of Pacci magic beam flips every block and tipped porcelain jar upside down!',
  }),
  Object.freeze({
    id: 'vo_wpn_taiko',
    speaker: 'lirili',
    text: 'Dig dig hooray! CatNap, DogDay, and Hoppy Hopscotch love these Digging Mole Mitts!',
  }),
  Object.freeze({
    id: 'vo_wpn_rainbow',
    speaker: 'sahur',
    text: 'Ultimate Kinstone Jackpot! The legendary Four Sword Golden Blade of Minish Champions!',
  }),

  // 3. 4 Shrink Tree Stump & Porcelain Jar Sanctuaries + Helpers (9)
  Object.freeze({
    id: 'vo_totem_tier1',
    speaker: 'bananini',
    text: 'Minish Tiny! Ezlo and Sussie activated the Magic Shrink Tree Stump portal!',
  }),
  Object.freeze({
    id: 'vo_totem_tier2',
    speaker: 'cappuccina',
    text: 'Yay! Our Giant Red Toadstool and Tipped Porcelain Peony Jar is showering Kinstone Star Gems!',
  }),
  Object.freeze({
    id: 'vo_totem_tier3',
    speaker: 'cappuccina',
    text: 'Whoa! It grew into a Golden Kinstone and Ezlo Shrine! Maximum Star Gem fountain!',
  }),
  Object.freeze({
    id: 'helper_cappuccina_wake',
    speaker: 'bananini',
    text: 'Chirp caw! Ezlo and Sussie Magic Minish Cap here! Hop on the Magic Shrink Tree Stump to turn tiny!',
  }),
  Object.freeze({
    id: 'helper_bananini_wake',
    speaker: 'cappuccina',
    text: 'Rumi, Mira, and Zoey reporting! The Tipped Porcelain Shrink Jar is glowing with Picori magic!',
  }),
  Object.freeze({
    id: 'helper_lirili_wake',
    speaker: 'sahur',
    text: 'Derpy Tiger purr! CatNap and DogDay helped me grow the Giant Red Toadstool Sanctuary!',
  }),
  Object.freeze({
    id: 'helper_assassino_wake',
    speaker: 'lirili',
    text: 'Hoppy Hopscotch and DogDay here! Our Golden Kinstone and Ezlo Shrine is showering stars!',
  }),
  Object.freeze({
    id: 'fairy_pot_max',
    speaker: 'cappuccina',
    text: 'All four Shrink Stump and Kinstone Sanctuaries are maxed out! Golden Kinstone fountain!',
  }),
  Object.freeze({
    id: 'fairy_need_stars',
    speaker: 'narrator',
    text: 'Smash more Lucky Blocks or fuse Kinstone Stars at your Shrink Stumps first!',
  }),

  // 4. Kinstone Mystery Spin Chest (3)
  Object.freeze({
    id: 'wheel_open',
    speaker: 'cappuccina',
    text: 'Spin the Kinstone Chest for the Magical Gust Jar, Cane of Pacci, Mole Mitts, or Four Sword!',
  }),
  Object.freeze({
    id: 'wheel_spinning',
    speaker: 'sahur',
    text: 'Round and round the Golden Kinstone halves spin! What awesome Minish relic will we win?',
  }),
  Object.freeze({
    id: 'wheel_jackpot',
    speaker: 'cappuccina',
    text: 'Golden Kinstone Fusion Jackpot! Bonus Star Gems and a glowing Ezlo heart!',
  }),

  // 5. 13 Lucky Block Drops & Minish Gear (13)
  Object.freeze({
    id: 'vo_drop_stars',
    speaker: 'narrator',
    text: 'Shiny Golden Kinstone Star Gems!',
  }),
  Object.freeze({
    id: 'vo_drop_jackpot',
    speaker: 'sahur',
    text: 'Whoa! Golden Kinstone Star Gem Shower!',
  }),
  Object.freeze({
    id: 'vo_drop_seed',
    speaker: 'cappuccina',
    text: 'A Minish Shrink Acorn! Tap Shrink or Grow to upgrade a Magic Tree Stump Sanctuary!',
  }),
  Object.freeze({
    id: 'vo_drop_wheel',
    speaker: 'cappuccina',
    text: 'Free Kinstone Spin Token! Let us spin the Kinstone Relic Chest!',
  }),
  Object.freeze({
    id: 'vo_drop_mango',
    speaker: 'narrator',
    text: 'Yum! Giant Hyrule Bakery Brioche and Croissant Treats!',
  }),
  Object.freeze({
    id: 'vo_drop_latte',
    speaker: 'cappuccina',
    text: 'Minish Picori Nectar Zoom! Super fast tiny paws and a bonus Ezlo heart!',
  }),
  Object.freeze({
    id: 'vo_drop_bananini',
    speaker: 'sahur',
    text: 'Hehe! Mini Rumi, Mira, and Zoey popped out cheering!',
  }),
  Object.freeze({
    id: 'vo_drop_confetti',
    speaker: 'bananini',
    text: 'Hooray! Kinstone Sparkle Confetti with Ezlo and Sussie the Magic Cap!',
  }),
  Object.freeze({
    id: 'vo_drop_toot',
    speaker: 'lirili',
    text: 'Boing hop! CatNap, DogDay, and Hoppy Hopscotch popped out to help!',
  }),
  Object.freeze({
    id: 'vo_gear_boots',
    speaker: 'lirili',
    text: 'Pegasus Boots! Dash through tiny mouseholes and jump across lily pads!',
  }),
  Object.freeze({
    id: 'vo_gear_crown',
    speaker: 'cappuccina',
    text: 'Ezlo Golden Minish Cap Crown! Five glowing Picori shield hearts!',
  }),
  Object.freeze({
    id: 'vo_gear_cape',
    speaker: 'cappuccina',
    text: 'Roc Feather Magnet Cape! Glide high and vacuum up every Kinstone Star around us!',
  }),
  Object.freeze({
    id: 'vo_boss_alert',
    speaker: 'sahur',
    text: 'Ooh! Watch out! A Giant Minish Cap Boss just hopped into the courtyard!',
  }),

  // 6. 3 Pattable Companions (3)
  Object.freeze({
    id: 'vo_pet_cappuccina',
    speaker: 'bananini',
    text: 'Caw chirp! Ezlo and Sussie Magic Minish Cap wiggles its beak and shares bonus Kinstone Stars!',
  }),
  Object.freeze({
    id: 'vo_pet_bananini',
    speaker: 'sahur',
    text: 'Purr! Rumi and Derpy Tiger share warm Bakery Brioche and Kinstone sparkles with you!',
  }),
  Object.freeze({
    id: 'vo_pet_lirili',
    speaker: 'lirili',
    text: 'Yay! CatNap, DogDay, and Hoppy Hopscotch give you a big hug and five bonus stars!',
  }),

  // 7. 4 Quadrant Minish Cap Bosses (20)
  Object.freeze({
    id: 'boss_tralalero_spawn',
    speaker: 'tralalero',
    text: 'Bloop boing! I am the Giant Green ChuChu! Stay out of my Minish Woods and Hollow Tree Log Tunnel!',
  }),
  Object.freeze({
    id: 'boss_tralalero_boing',
    speaker: 'tralalero',
    text: 'Jelly bounce! Spin the Kinstone Chest to power up your Picori Short Sword first!',
  }),
  Object.freeze({
    id: 'boss_tralalero_ouch',
    speaker: 'tralalero',
    text: 'Whoa! Rumi, CatNap, and Derpy Tiger wobbled my giant green jelly belly!',
  }),
  Object.freeze({
    id: 'boss_tralalero_defeat',
    speaker: 'tralalero',
    text: 'Bloop splat! Okay, you can scurry through the Hollow Log Tunnel and take the Earth Element Trophy!',
  }),
  Object.freeze({
    id: 'vo_win_tralalero',
    speaker: 'narrator',
    text: 'Hooray! Giant Green ChuChu bonked! Earth Element Trophy one of four!',
  }),

  Object.freeze({
    id: 'boss_bombardiro_spawn',
    speaker: 'bombardiro',
    text: 'Roar hiss! I am Gleerok the Twin-Neck Dragon! This Bakery Mousehole and Tipped Jar Loft are mine!',
  }),
  Object.freeze({
    id: 'boss_bombardiro_boing',
    speaker: 'bombardiro',
    text: 'Dragon scale bounce! Bring the Star Two Magical Gust Jar before challenging me!',
  }),
  Object.freeze({
    id: 'boss_bombardiro_ouch',
    speaker: 'bombardiro',
    text: 'Whoosh clang! That Magical Gust Jar whirlwind is dizzying both of my dragon necks!',
  }),
  Object.freeze({
    id: 'boss_bombardiro_defeat',
    speaker: 'bombardiro',
    text: 'Rumble purr! The Bakery Dollhouse Mousehole is clear! Take the Fire Element Trophy!',
  }),
  Object.freeze({
    id: 'vo_win_bombardiro',
    speaker: 'narrator',
    text: 'Awesome job! Gleerok Dragon bonked! Two Element Trophies won!',
  }),

  Object.freeze({
    id: 'boss_patapim_spawn',
    speaker: 'patapim',
    text: 'Clank boom! I am Mazaal the Wind Ruins Golem! Mind my giant golden pillar hands by the Bamboo Pipe!',
  }),
  Object.freeze({
    id: 'boss_patapim_boing',
    speaker: 'patapim',
    text: 'Pillar bounce! Put on Pegasus Boots and grab the Star Three Cane of Pacci first!',
  }),
  Object.freeze({
    id: 'boss_patapim_ouch',
    speaker: 'patapim',
    text: 'Hey! How did you shrink tiny, dash through the Lily-Pad Bamboo Pipe, and flip my golden armor?',
  }),
  Object.freeze({
    id: 'boss_patapim_defeat',
    speaker: 'patapim',
    text: 'Whoosh chime! The Castor Wilds lily-pad stream is yours! Take the Water Element Trophy!',
  }),
  Object.freeze({
    id: 'vo_win_patapim',
    speaker: 'narrator',
    text: 'Haha! Mazaal Golem bonked! Three Element Trophies won!',
  }),

  Object.freeze({
    id: 'boss_king_spawn',
    speaker: 'sahur_king',
    text: 'Mwahaha! I am Vaati the Wind Sorcerer! The Royal Library Bookshelf Gear Crack is sealed!',
  }),
  Object.freeze({
    id: 'boss_king_boing',
    speaker: 'sahur_king',
    text: 'Wind barrier bounce! Bring the Digging Mole Mitts or Four Sword Golden Blade to break my spell!',
  }),
  Object.freeze({
    id: 'boss_king_ouch',
    speaker: 'sahur_king',
    text: 'Zzzap! How did Rumi, DogDay, and Derpy Tiger climb the Bookshelf Gear Crack with the Four Sword?',
  }),
  Object.freeze({
    id: 'boss_king_defeat',
    speaker: 'sahur_king',
    text: 'Sparkle chime! My wind curse is lifted, Ezlo Cap is glowing gold, and all four Elements shine!',
  }),
  Object.freeze({
    id: 'vo_win_king',
    speaker: 'narrator',
    text: 'We did it! Vaati Sorcerer bonked and all four Minish Cap Element Trophies are ours!',
  }),

  // 8. Finale, Persistence & Modes (5)
  Object.freeze({
    id: 'vo_finale_parade',
    speaker: 'cappuccina',
    text: 'Minish Cap Champions! Rumi, Mira, Zoey, CatNap, DogDay, Hoppy, Derpy Tiger, and Ezlo saved Hyrule!',
  }),
  Object.freeze({
    id: 'vo_keep_playing',
    speaker: 'narrator',
    text: 'Welcome back to the Minish Cap Courtyard! Let us shrink on the Tree Stump and scurry through tiny tunnels!',
  }),
  Object.freeze({
    id: 'vo_chaos_on',
    speaker: 'sahur',
    text: 'Two-X Minish Kinstone Party Mode on! Every Lucky Block pops double Kinstone Stars and fireworks!',
  }),
  Object.freeze({
    id: 'vo_chaos_off',
    speaker: 'narrator',
    text: 'Cozy Minish Adventure Mode! Sunny shrink-stump and tiny tunnel fun!',
  }),
  Object.freeze({
    id: 'sahur_sleepy_zzz',
    speaker: 'narrator',
    text: 'Hold on! Win the earlier Minish Element Trophy first before challenging this Boss!',
  }),
]);

export const VOICE_CLIP_LIST = VOICE_CATALOG;
export const VOICE_LINES = VOICE_CATALOG;

export const VOICE_BY_ID = Object.freeze(
  Object.fromEntries(VOICE_CATALOG.map((clip) => [clip.id, clip]))
);
