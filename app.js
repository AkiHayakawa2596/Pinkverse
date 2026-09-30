(() => {
  const app = document.getElementById('app');
  const members = ['Jisoo','Jennie','Rosé','Lisa'];
  // Every photo has multiple remote sources. If one host/URL fails, the app
  // automatically tries the next source and finally renders an in-app fallback.
  const photoSources = {
    group:[
      'https://upload.wikimedia.org/wikipedia/commons/1/14/Blackpink_Pink_Carpet_Event_3.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4b/Blackpink_Pink_Carpet_Event_1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/70/BLACKPINK_at_Coachella_2023_02.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Blackpink_Pink_Carpet_Event_3.jpg'
    ],
    Jisoo:[
      'https://upload.wikimedia.org/wikipedia/commons/2/21/Jisoo_of_Blackpink_at_a_Dior_event%2C_April_18%2C_2025_%285%29.png',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jisoo_of_Blackpink_at_a_Dior_event%2C_April_18%2C_2025_%285%29.png',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jisoo_of_Blackpink_at_a_Dior_event%2C_April_18%2C_2025_%283%29.png',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jisoo_of_Blackpink_at_a_Dior_event%2C_April_18%2C_2025_%286%29.png'
    ],
    Jennie:[
      'https://upload.wikimedia.org/wikipedia/commons/7/78/Jennie_2026_GDA_1.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jennie_2026_GDA_1.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jennie_2026_GDA_2.jpg'
    ],
    'Rosé':[
      'https://upload.wikimedia.org/wikipedia/commons/a/a2/Blackpink_Ros%C3%A9_Rimowa_2.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Blackpink_Ros%C3%A9_Rimowa_2.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Blackpink_Ros%C3%A9_Rimowa_1.jpg'
    ],
    Lisa:[
      'https://upload.wikimedia.org/wikipedia/commons/7/74/20240314_Lisa_Manoban_12_%28cropped%29.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/20240314_Lisa_Manoban_12_%28cropped%29.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/20240314_Lisa_Manoban_9_(cropped).jpg'
    ]
  };
  const photos = Object.fromEntries(Object.entries(photoSources).map(([key,list])=>[key,list[0]]));
  const credits = {
    group:'https://commons.wikimedia.org/wiki/File:Blackpink_Pink_Carpet_Event_3.jpg',
    Jisoo:'https://commons.wikimedia.org/wiki/File:Jisoo_of_Blackpink_at_a_Dior_event,_April_18,_2025_(5).png',
    Jennie:'https://commons.wikimedia.org/wiki/File:Jennie_2026_GDA_1.jpg',
    'Rosé':'https://commons.wikimedia.org/wiki/File:Blackpink_Ros%C3%A9_Rimowa_2.jpg',
    Lisa:'https://commons.wikimedia.org/wiki/File:20240314_Lisa_Manoban_12_(cropped).jpg'
  };

  const games = [
    {id:'polaroid-pair', code:'01', title:'Polaroid Pair', cat:'photo room', icon:'◫', image:'group', desc:'Clear a multi-roll photo shoot, chase featured pairs, manage flash assists, and protect your combo.'},
    {id:'camera-call', code:'02', title:'Camera Call', cat:'photo room', icon:'◎', image:'Jennie', desc:'Survive a camera-operator run with changing shuffle modifiers, limited lenses, speed bonuses, and streak recovery.'},
    {id:'lightstick-wave', code:'04', title:'Lightstick Wave', cat:'live stage', icon:'↔', image:'Lisa', desc:'Ride an official BLACKPINK M/V beat, hit the center pulse, and build a live lightstick combo.'},
    {id:'pink-tiles', code:'05', title:'Pink Tiles', cat:'live stage', icon:'▥', image:'group', desc:'Play a falling-tile rhythm chart locked to the selected song’s beat grid and YouTube playback clock.'},
    {id:'beat-switch', code:'12', title:'Beat Switch', cat:'live stage', icon:'↗', image:'Jennie', desc:'Follow direction calls that change on the beat and hit the matching pad in time with the song.'},
    {id:'concert-freeplay', code:'17', title:'Concert Free Play', cat:'live stage', icon:'♬', image:'group', desc:'Build a custom BLACKPINK YouTube setlist, then direct a full pixel-art concert with member entrances, formations, crowd reactions, stage effects, and an encore finale.'},
    {id:'pink-cipher', code:'06', title:'Pink Cipher', cat:'backstage lab', icon:'⌁', image:'Jisoo', desc:'Solve a three-case backstage mystery by cracking member-signature codes and recovering the missing encore key.'},
    {id:'stage-route', code:'07', title:'Stage Route', cat:'backstage lab', icon:'⌘', image:'Rosé', desc:'Run a two-part backstage mission: recover access passes through the service maze, then park the encore wardrobe cases before stage call.'},
    {id:'fanlight-grid', code:'08', title:'Fanlight Grid', cat:'backstage lab', icon:'▦', image:'Jennie', desc:'Sync three crowd sections in sequence with cross-flips, limited scans, undo charges, and a live match meter.'},
    {id:'pixel-choreo', code:'14', title:'Pixel Choreo', cat:'practice room', icon:'✧', image:'Lisa', desc:'Lead all four pixel members through three timed 8-count rehearsal sections with a 5-6-7-8 count-in, formation changes, and live timing grades.'},
    {id:'encore-dash', code:'15', title:'Encore Dash', cat:'practice room', icon:'≫', image:'Rosé', desc:'Run a pixel member through backstage lanes, collect the missing encore gear, and dodge obstacles before stage call.'},
    {id:'stage-clash', code:'10', title:'Stage Clash', cat:'2 player', icon:'VS', image:'group', desc:'Battle through a best-of-three same-phone duel with momentum shields, false-start penalties, and independent cues.'}
  ];

  const arcadeGames = games.filter(g=>g.id!=='concert-freeplay');
  const concertMode = gameById('concert-freeplay');

  const lanes = [
    {id:'live stage', label:'Live stage', note:'Timing, rhythm & reflex'},
    {id:'backstage lab', label:'Backstage lab', note:'Logic, routes & patterns'},
    {id:'photo room', label:'Photo room', note:'Visual memory & tracking'},
    {id:'practice room', label:'Practice room', note:'Pixel rehearsal & movement'},
    {id:'2 player', label:'Two player', note:'Same-device competition'}
  ];

  const difficulty = {
    easy:{label:'Easy', short:'EASY', note:'More room to learn'},
    medium:{label:'Standard', short:'STD', note:'Balanced pace'},
    hard:{label:'Pink Venom', short:'PV', note:'Fast & unforgiving'}
  };

  const APP_VERSION='v1.0.0';
  const POLICY_UPDATED='September 20, 2026';
  const stateKey = 'pinkverse-v1.0.0';
  const baseState = {plays:0, hearts:120, best:{}, lastGame:'', difficulty:{}, sound:true, gamePlays:{}, recent:[], onboardingSeen:false, daily:{date:'',claimed:false}, spotlightWins:0, pixelOutfits:{Jisoo:'pink',Jennie:'pink','Rosé':'pink',Lisa:'pink'}};
  let state = loadState();
  let cleanup = () => {};
  let pendingConcertLevel=null;

  // Safari / installed-PWA capability flags. iPadOS can report itself as a Mac,
  // so maxTouchPoints is included to identify touch-first Apple devices.
  const platformInfo=(()=>{
    const ua=navigator.userAgent||'';
    const isiPhone=/iPhone|iPod/.test(ua);
    const isiPad=/iPad/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    const isiOS=isiPhone||isiPad;
    const isSafari=/Safari/.test(ua)&&!/(Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPiOS|Android)/.test(ua);
    const standalone=window.matchMedia?.('(display-mode: standalone)').matches||navigator.standalone===true;
    return {isiPhone,isiPad,isiOS,isSafari,standalone};
  })();
  function syncPlatformClasses(){
    const standalone=window.matchMedia?.('(display-mode: standalone)').matches||navigator.standalone===true;
    platformInfo.standalone=!!standalone;
    const targets=[document.documentElement,document.body].filter(Boolean);
    targets.forEach(el=>{
      el.classList.toggle('pv-ios',platformInfo.isiOS);
      el.classList.toggle('pv-iphone',platformInfo.isiPhone);
      el.classList.toggle('pv-ipad',platformInfo.isiPad);
      el.classList.toggle('pv-safari',platformInfo.isSafari);
      el.classList.toggle('pv-standalone',platformInfo.standalone);
      el.classList.toggle('pv-browser-tab',!platformInfo.standalone);
    });
  }
  syncPlatformClasses();
  const displayModeQuery=window.matchMedia?.('(display-mode: standalone)');
  displayModeQuery?.addEventListener?.('change',syncPlatformClasses);

  const songs = [
    {title:'Whistle', energy:8, mood:'cool'},
    {title:'Playing with Fire', energy:13, mood:'heat'},
    {title:'Boombayah', energy:20, mood:'rush'},
    {title:'As If It’s Your Last', energy:18, mood:'bright'},
    {title:'DDU-DU DDU-DU', energy:22, mood:'impact'},
    {title:'Kill This Love', energy:24, mood:'impact'},
    {title:'How You Like That', energy:20, mood:'lift'},
    {title:'Lovesick Girls', energy:14, mood:'anthem'},
    {title:'Forever Young', energy:19, mood:'lift'},
    {title:'Pink Venom', energy:21, mood:'swagger'},
    {title:'Shut Down', energy:17, mood:'cool'}
  ];


  // Official BLACKPINK YouTube M/V embeds. The game never downloads or stores song audio.
  // Tempo data powers the rhythm grid. beatOffset is a small per-video alignment
  // correction; users can nudge sync by ±50ms inside music games for device latency.
  const youtubeTracks = {
    hylt:{key:'hylt',title:'How You Like That',videoId:'ioNng23DkIM',start:0,bpm:130,beatOffset:.12,meter:4,image:'group',era:'2020'},
    pinkvenom:{key:'pinkvenom',title:'Pink Venom',videoId:'gQlMMD8auMs',start:0,bpm:90,beatOffset:.10,meter:4,image:'Lisa',era:'2022'},
    shutdown:{key:'shutdown',title:'Shut Down',videoId:'POe9SOEKotk',start:0,bpm:110,beatOffset:.06,meter:4,image:'Jisoo',era:'2022'},
    ktl:{key:'ktl',title:'Kill This Love',videoId:'2S24-y0Ij3Y',start:0,bpm:132,beatOffset:.08,meter:4,image:'Jennie',era:'2019'},
    d4:{key:'d4',title:'DDU-DU DDU-DU',videoId:'IHNzOHi8sJs',start:0,bpm:140,beatOffset:.07,meter:4,image:'group',era:'2018'},
    boombayah:{key:'boombayah',title:'Boombayah',videoId:'bwmSjveL3Lc',start:0,bpm:125,beatOffset:.10,meter:4,image:'Lisa',era:'2016'},
    whistle:{key:'whistle',title:'Whistle',videoId:'dISNgvVpWlo',start:0,bpm:104,beatOffset:.08,meter:4,image:'Jennie',era:'2016'},
    pwf:{key:'pwf',title:'Playing With Fire',videoId:'9pdj4iJD08s',start:0,bpm:100,beatOffset:.10,meter:4,image:'Rosé',era:'2016'},
    stay:{key:'stay',title:'Stay',videoId:'FzVR_fymZw4',start:0,bpm:88,beatOffset:.10,meter:4,image:'Jisoo',era:'2016'},
    aiiyl:{key:'aiiyl',title:'As If It’s Your Last',videoId:'Amq-qlqbjYA',start:0,bpm:125,beatOffset:.10,meter:4,image:'Rosé',era:'2017'},
    lsg:{key:'lsg',title:'Lovesick Girls',videoId:'dyRsYk0LyA8',start:0,bpm:128,beatOffset:.09,meter:4,image:'Rosé',era:'2020'},
    icecream:{key:'icecream',title:'Ice Cream',videoId:'vRXZj0DzXIA',start:0,bpm:80,beatOffset:.12,meter:4,image:'group',era:'2020'},
    foreveryoung:{key:'foreveryoung',title:'Forever Young',videoId:'89kTb73csYg',start:0,bpm:110,beatOffset:.10,meter:4,image:'group',era:'2018'},
    readyforlove:{key:'readyforlove',title:'Ready For Love',videoId:'GDWX-3kV6do',start:0,bpm:108,beatOffset:.10,meter:4,image:'Rosé',era:'2022'},
    jump:{key:'jump',title:'JUMP',videoId:'CgCVZdcKcqY',start:0,bpm:145,beatOffset:.08,meter:4,image:'Lisa',era:'2025'}
  };
  function beatSeconds(track){ return 60 / Number(track.bpm||120); }
  function syncedBeatTime(track,beatIndex,latency=0){ return Number(track.beatOffset||0) + beatIndex*beatSeconds(track) + latency; }
  function beatPosition(track,time,latency=0){ return (Number(time||0)-Number(track.beatOffset||0)-latency)/beatSeconds(track); }
  function nearestBeatError(track,time,subdivision=1,latency=0){
    const pos=beatPosition(track,time,latency)*subdivision;
    const nearest=Math.round(pos);
    return Math.abs(pos-nearest) * (beatSeconds(track)/subdivision);
  }
  let selectedYouTubeTrack='hylt';
  let activeYouTubePlayer=null;
  let youtubeApiPromise=null;

  function loadState(){
    try{
      const versions=['pinkverse-v2','pinkverse-v6','pinkverse-v7','pinkverse-v12','pinkverse-v14','pinkverse-v15','pinkverse-v16','pinkverse-v17','pinkverse-v18','pinkverse-v19','pinkverse-v20','pinkverse-v21','pinkverse-v22','pinkverse-v23','pinkverse-v24','pinkverse-v25','pinkverse-v26','pinkverse-v27','pinkverse-v28','pinkverse-v29','pinkverse-v30','pinkverse-v31','pinkverse-v32','pinkverse-v33','pinkverse-v34','pinkverse-v35','pinkverse-v36','pinkverse-v37','pinkverse-v38','pinkverse-v39','pinkverse-v40','pinkverse-v41','pinkverse-v42','pinkverse-v43','pinkverse-v44','pinkverse-v45','pinkverse-v46','pinkverse-v47','pinkverse-v48','pinkverse-v49','pinkverse-v50','pinkverse-v51','pinkverse-v52','pinkverse-v53','pinkverse-v54','pinkverse-v55','pinkverse-v56','pinkverse-v57','pinkverse-v58','pinkverse-v59','pinkverse-v60','pinkverse-v61','pinkverse-v62','pinkverse-v63','pinkverse-v64','pinkverse-v65','pinkverse-v66','pinkverse-v67','pinkverse-v68','pinkverse-v69','pinkverse-v70','pinkverse-v71','pinkverse-v72','pinkverse-v73','pinkverse-v74','pinkverse-v75','pinkverse-v76','pinkverse-v77','pinkverse-v78','pinkverse-v79','pinkverse-v80','pinkverse-v81','pinkverse-v82','pinkverse-v83','pinkverse-v84','pinkverse-v85','pinkverse-v86','pinkverse-v87','pinkverse-v88','pinkverse-v89','pinkverse-v90','pinkverse-v91','pinkverse-v92','pinkverse-v93','pinkverse-v94','pinkverse-v95','pinkverse-v96','pinkverse-v97','pinkverse-v98','pinkverse-v99','pinkverse-v100','pinkverse-v101','pinkverse-v1.0.0','pinkverse-v1.0.1','pinkverse-v1.1.0','pinkverse-v1.1.1','pinkverse-v1.2.0-rc1','pinkverse-v1.0.0-final','pinkverse-v1.0.0-rc2','pinkverse-v1.0.0-rc3','pinkverse-v1.0.0-rc4','pinkverse-v1.0.0-rc5','pinkverse-v1.0.0-rc6','pinkverse-v1.0.0-rc7','pinkverse-v1.0.0-rc8','pinkverse-v1.0.0-rc9','pinkverse-v1.0.0-rc10','pinkverse-v1.0.0-rc11','pinkverse-v1.0.0-rc12','pinkverse-v1.0.0-rc13','pinkverse-v1.0.0-rc14','pinkverse-v1.0.0-rc15','pinkverse-v1.0.0-rc16','pinkverse-v1.0.0-rc17','pinkverse-v1.0.0-rc18','pinkverse-v1.0.0-rc19','pinkverse-v1.0.0-rc20','pinkverse-v1.0.0-rc21','pinkverse-v1.0.0-rc22','pinkverse-v1.0.0-rc23','pinkverse-v1.0.0-rc24','pinkverse-v1.0.0-rc25','pinkverse-v1.0.0-rc26','pinkverse-v1.0.0-rc27','pinkverse-v1.0.0-rc28',stateKey];
      const snapshots=versions.map(key=>{try{return JSON.parse(localStorage.getItem(key)||'{}');}catch{return {};}});
      const merged=snapshots.reduce((acc,s)=>({...acc,...s}),{...baseState});
      merged.best=snapshots.reduce((acc,s)=>({...acc,...(s.best||{})}),{});
      merged.difficulty=snapshots.reduce((acc,s)=>({...acc,...(s.difficulty||{})}),{});
      merged.gamePlays=snapshots.reduce((acc,s)=>({...acc,...(s.gamePlays||{})}),{});
      merged.daily=snapshots.reduce((acc,s)=>({...acc,...(s.daily||{})}),{});
      merged.pixelOutfits=snapshots.reduce((acc,s)=>({...acc,...(s.pixelOutfits||{})}),{...baseState.pixelOutfits});
      const latestRecent=[...snapshots].reverse().find(s=>Array.isArray(s.recent));
      merged.recent=latestRecent?.recent||[];
      return {...baseState,...merged};
    }catch{return {...baseState};}
  }

  function save(){ localStorage.setItem(stateKey, JSON.stringify(state)); }
  function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }
  function sample(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
  function esc(s){ return String(s).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m])); }
  const spriteOutfits=[
    {id:'pink',label:'Pink Stage'},
    {id:'noir',label:'Black Stage'},
    {id:'encore',label:'Encore'}
  ];
  function spriteKey(member){return String(member).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z]/g,'');}
  function spriteOutfitFor(member){
    const chosen=state.pixelOutfits?.[member];
    return spriteOutfits.some(o=>o.id===chosen)?chosen:'pink';
  }
  const dedicatedDanceSheets={
    jisoo:{
      pink:'./assets/sprites/jisoo-pink-base-dance-grid.png',
      noir:'./assets/sprites/jisoo-noir-base-dance-grid.png',
      encore:'./assets/sprites/jisoo-encore-base-dance-grid.png'
    },
    jennie:{
      pink:'./assets/sprites/jennie-pink-base-dance-grid.png',
      noir:'./assets/sprites/jennie-noir-base-dance-grid.png',
      encore:'./assets/sprites/jennie-encore-base-dance-grid.png'
    },
    rose:{
      pink:'./assets/sprites/rose-pink-base-dance-grid.png',
      noir:'./assets/sprites/rose-noir-base-dance-grid.png',
      encore:'./assets/sprites/rose-encore-base-dance-grid.png'
    },
    lisa:{
      pink:'./assets/sprites/lisa-pink-base-dance-grid.png',
      noir:'./assets/sprites/lisa-noir-base-dance-grid.png',
      encore:'./assets/sprites/lisa-encore-base-dance-grid.png'
    }
  };
  const dedicatedHeroDanceSheets={
    jisoo:{pink:'./assets/sprites/jisoo-pink-hero-dance-grid.png',noir:'./assets/sprites/jisoo-noir-hero-dance-grid.png',encore:'./assets/sprites/jisoo-encore-hero-dance-grid.png'},
    jennie:{pink:'./assets/sprites/jennie-pink-hero-dance-grid.png',noir:'./assets/sprites/jennie-noir-hero-dance-grid.png',encore:'./assets/sprites/jennie-encore-hero-dance-grid.png'},
    rose:{pink:'./assets/sprites/rose-pink-hero-dance-grid.png',noir:'./assets/sprites/rose-noir-hero-dance-grid.png',encore:'./assets/sprites/rose-encore-hero-dance-grid.png'},
    lisa:{pink:'./assets/sprites/lisa-pink-hero-dance-grid.png',noir:'./assets/sprites/lisa-noir-hero-dance-grid.png',encore:'./assets/sprites/lisa-encore-hero-dance-grid.png'}
  };
  const dedicatedChorusDanceSheets={
    jisoo:{pink:'./assets/sprites/jisoo-pink-chorus-dance-grid.png',noir:'./assets/sprites/jisoo-noir-chorus-dance-grid.png',encore:'./assets/sprites/jisoo-encore-chorus-dance-grid.png'},
    jennie:{pink:'./assets/sprites/jennie-pink-chorus-dance-grid.png',noir:'./assets/sprites/jennie-noir-chorus-dance-grid.png',encore:'./assets/sprites/jennie-encore-chorus-dance-grid.png'},
    rose:{pink:'./assets/sprites/rose-pink-chorus-dance-grid.png',noir:'./assets/sprites/rose-noir-chorus-dance-grid.png',encore:'./assets/sprites/rose-encore-chorus-dance-grid.png'},
    lisa:{pink:'./assets/sprites/lisa-pink-chorus-dance-grid.png',noir:'./assets/sprites/lisa-noir-chorus-dance-grid.png',encore:'./assets/sprites/lisa-encore-chorus-dance-grid.png'}
  };
  function isDanceCyclePose(pose='idle'){
    return ['dance','sway','hop','turn','sweep','run','point','heart','sing','kick','pose','final'].includes(pose);
  }
  function memberSpriteSheetVariant(member,pose='idle',context={}){
    if(!isDanceCyclePose(pose))return 'default';
    const section=context.section||'intro';
    const focusName=context.focusName||'group';
    const phase=context.phase||'intro';
    const focused=focusName===member;
    const heroPose=['point','sing','kick','pose','final','heart'].includes(pose);
    if(focused && (['pre-chorus','bridge','rap'].includes(section) || heroPose || phase==='finale'))return 'hero';
    if(['chorus','final-chorus'].includes(section))return focused?'hero':'chorus';
    return 'base';
  }
  function memberSpriteSheetType(member,outfit=spriteOutfitFor(member),pose='idle'){
    const alt=dedicatedDanceSheets[spriteKey(member)]?.[outfit];
    return alt&&isDanceCyclePose(pose)?'dancecycle':'default';
  }
  function compactSpriteMode(){
    try{return !!window.matchMedia?.('(max-width: 820px), (orientation: landscape) and (max-height: 760px)').matches;}catch{return false;}
  }
  function memberSpriteSheet(member,outfit=spriteOutfitFor(member),pose='idle',variantOverride=null){
    const key=spriteKey(member);
    const variant=variantOverride||memberSpriteSheetVariant(member,pose);
    const base=dedicatedDanceSheets[key]?.[outfit];
    if(base&&isDanceCyclePose(pose)){
      /* Mobile stability mode: keep one decoded 8x4 atlas mounted for the entire
         live performance. Hero/chorus still use their own choreography/classes,
         but do not hot-swap large image sources on memory-constrained browsers. */
      if(compactSpriteMode())return base;
      if(variant==='hero')return dedicatedHeroDanceSheets[key]?.[outfit]||base;
      if(variant==='chorus')return dedicatedChorusDanceSheets[key]?.[outfit]||base;
      return base;
    }
    return `./assets/sprites/${key}-${outfit}.png`;
  }
  function crowdSpriteSheet(index=0){const slot=((Math.abs(index)*5)%16)+1;return `./assets/sprites/crowd-fan-back-${String(slot).padStart(2,'0')}.png`;}
  const memberSpritePreload=[];
  const memberSpritePreloadSet=new Set();
  function queueSheetPreload(src,priority='async'){
    if(!src||memberSpritePreloadSet.has(src))return;
    memberSpritePreloadSet.add(src);
    const img=new Image();
    img.decoding=priority==='sync'?'sync':'async';
    img.loading='eager';
    img.src=src;
    memberSpritePreload.push(img);
    const decode=()=>{try{img.decode?.().catch(()=>{});}catch{}};
    if(priority==='sync')decode();
    else if(typeof requestIdleCallback==='function')requestIdleCallback(()=>decode(),{timeout:900});
    else setTimeout(decode,180);
  }
  function preloadMemberSpriteSheets(priority='async'){
    // V1 optimization: warm current idle + base dance sheets only after the shell is interactive.
    members.forEach(member=>{
      const id=spriteOutfitFor(member);
      [
        memberSpriteSheet(member,id,'idle'),
        dedicatedDanceSheets[spriteKey(member)]?.[id]
      ].filter(Boolean).forEach(src=>queueSheetPreload(src,priority));
    });
  }
  function warmConcertVariantSheets(memberList=members,priority='async'){
    /* RC27 release hardening: the live renderer is deliberately stable on the
       base 8x4 atlas. Do not decode hero/chorus grids just because the viewport
       is wide; rotated phones can exceed 820px while still being memory-limited. */
    memberList.forEach(member=>{
      const id=spriteOutfitFor(member),key=spriteKey(member);
      const src=dedicatedDanceSheets[key]?.[id];
      if(src)queueSheetPreload(src,priority);
    });
  }
  function scheduleMemberSpritePreload(){
    const warm=()=>preloadMemberSpriteSheets('async');
    if(typeof requestIdleCallback==='function')requestIdleCallback(warm,{timeout:1800});
    else setTimeout(warm,700);
  }
  if(document.readyState==='complete')scheduleMemberSpritePreload();
  else window.addEventListener('load',scheduleMemberSpritePreload,{once:true});
  function slug(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-'); }
  function gameById(id){ return games.find(g=>g.id===id); }
  const memberGameMap={
    Jisoo:['pink-cipher','polaroid-pair','fanlight-grid'],
    Jennie:['camera-call','beat-switch','pink-tiles'],
    'Rosé':['stage-route','encore-dash','fanlight-grid'],
    Lisa:['lightstick-wave','pixel-choreo','stage-clash']
  };
  function memberHubData(member){
    const ids=memberGameMap[member]||[];
    const linked=ids.map(gameById).filter(Boolean);
    const scores=ids.map(id=>Number(state.best[id]||0));
    const best=Math.max(0,...scores);
    const runs=ids.reduce((sum,id)=>sum+Number(state.gamePlays?.[id]||0),0);
    const completed=ids.filter(id=>Number(state.best[id]||0)>=60).length;
    const nextId=[...ids].sort((a,b)=>Number(state.best[a]||0)-Number(state.best[b]||0))[0]||ids[0];
    const next=gameById(nextId);
    const progress=ids.length?Math.round(completed/ids.length*100):0;
    return {member,games:linked,best,runs,completed,total:ids.length,next,progress,mastered:completed===ids.length};
  }

  const pixelWorldOrder=['pink-cipher','stage-route','pixel-choreo','encore-dash'];
  const pixelWorldMeta={
    'pink-cipher':{chapter:'01',place:'SECURITY LAB',story:'Crack the backstage access chain and recover the encore key.'},
    'stage-route':{chapter:'02',place:'SERVICE HALL + DRESSING WING',story:'Recover the route passes, then park the encore wardrobe cases before stage call.'},
    'pixel-choreo':{chapter:'03',place:'PRACTICE ROOM',story:'Run the final 8-count with all four members and lock the formations.'},
    'encore-dash':{chapter:'04',place:'STAGE TUNNEL',story:'Recover the missing performance kit and race toward the stage.'}
  };
  function pixelWorldData(){
    const nodes=pixelWorldOrder.map((id,i)=>{
      const game=gameById(id),best=Number(state.best[id]||0);
      const previous=i===0?true:Number(state.best[pixelWorldOrder[i-1]]||0)>0;
      return {id,game,best,complete:best>0,unlocked:best>0||previous,...pixelWorldMeta[id]};
    });
    const cleared=nodes.filter(n=>n.complete).length;
    const current=nodes.find(n=>n.unlocked&&!n.complete)||nodes[nodes.length-1];
    return {nodes,cleared,total:nodes.length,current,percent:Math.round(cleared/nodes.length*100)};
  }


  function localDayKey(date=new Date()){
    const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }
  function spotlightInfo(){
    const date=localDayKey();
    let changed=false;
    if(!state.daily||state.daily.date!==date){state.daily={date,claimed:false};changed=true;}
    let seed=0;for(const ch of date)seed=(seed*31+ch.charCodeAt(0))>>>0;
    const game=arcadeGames[seed%arcadeGames.length];
    if(state.daily.game!==game.id){state.daily.game=game.id;changed=true;}
    if(changed)save();
    return {date,game,claimed:!!state.daily.claimed};
  }
  function gradeFor(score){return score>=95?'S':score>=85?'A':score>=70?'B':score>=50?'C':'D';}

  const masteryThresholds=[50,70,90];
  function masteryStars(score){
    score=Number(score||0);
    return masteryThresholds.filter(t=>score>=t).length;
  }
  function masteryTarget(score){
    score=Number(score||0);
    return masteryThresholds.find(t=>score<t)||null;
  }
  function masteryTotal(){
    return arcadeGames.reduce((sum,g)=>sum+masteryStars(state.best[g.id]),0);
  }
  function masteryPips(score,label=true){
    const stars=masteryStars(score);
    return `<span class="mastery-pips" aria-label="${stars} of 3 mastery stars">${masteryThresholds.map((t,i)=>`<i class="${i<stars?'on':''}" title="${t}+ mastery">★</i>`).join('')}${label?`<em>${stars}/3</em>`:''}</span>`;
  }

  const gameBriefs = {
    'polaroid-pair':['Memorize the opening photo spread.','Chain matches to grow your combo.','Save Flash for a late-board rescue.'],
    'camera-call':['Lock onto the target portrait before the shuffle.','Modifiers change how much information you get.','Three clean calls can recover a lost lens.'],
    'lightstick-wave':['Follow the moving heart, not the video cuts.','Tap closest to the center pulse for stronger accuracy.','A steady combo matters more than frantic tapping.'],
    'pink-tiles':['Use both thumbs and watch one beat ahead.','Strong downbeats are visually accented.','Use sync calibration if your device audio feels late.'],
    'beat-switch':['Read the direction call before the beat lands.','Commit to one pad; wrong-direction taps break combo.','Hard mode changes calls more aggressively.'],
    'concert-freeplay':['Build a short setlist, then reorder it before the show starts.','Direct the pixel performers with focus, formations, pyro, confetti, and crowd-light cues while YouTube supplies the music.','Clear Show Director requests and finish the set with the final pixel encore bow.'],
    'pink-cipher':['Treat every scan as evidence.','Exact means correct member and position.','Hints reveal certainty but reduce your final score.'],
    'stage-route':['Part 1: collect every access pass before reaching the stage gate.','Part 2: push the encore cases onto the dressing marks without trapping them.','Your final score combines route efficiency and wardrobe-room efficiency.'],
    'fanlight-grid':['Each tap flips a cross of lights.','Scan reveals a useful move; Undo reverses one mistake.','Think in patterns instead of chasing single lights.'],
    'pixel-choreo':['Watch the four-member demonstration after the 5-6-7-8 count-in.','During your run, tap the shown move inside the beat window for PERFECT or GOOD timing.','Each section changes formation, so follow the active count instead of memorizing a button string.'],
    'encore-dash':['Shift lanes before obstacles reach your runner.','Collect the three missing encore items before the stage gate.','A clean streak raises your final score faster than risky last-second swerves.'],
    'stage-clash':['Wait for your own cue, not your opponent’s.','Three clean hits earn a protective shield.','False starts can swing an entire set.']
  };

  function rankData(){
    const tiers=[
      {name:'ROOKIE',min:0,next:150},
      {name:'BLINK',min:150,next:260},
      {name:'PINK CREW',min:260,next:420},
      {name:'HEADLINER',min:420,next:650},
      {name:'ICON',min:650,next:null}
    ];
    const hearts=Number(state.hearts||0);
    let tier=tiers[0];
    for(const t of tiers)if(hearts>=t.min)tier=t;
    const progress=tier.next?clamp((hearts-tier.min)/(tier.next-tier.min)*100,0,100):100;
    return {...tier,progress,hearts};
  }

  function badgeData(){
    const scored=arcadeGames.filter(g=>Number(state.best[g.id]||0)>0).length;
    const top=Math.max(0,...arcadeGames.map(g=>Number(state.best[g.id]||0)));
    const live=arcadeGames.filter(g=>g.cat==='live stage');
    const lab=['pink-cipher','stage-route','fanlight-grid'];
    return [
      {id:'first',icon:'◆',title:'First Flash',desc:'Finish your first run.',on:state.plays>=1},
      {id:'explorer',icon:'◫',title:'Deck Explorer',desc:'Post a score in 6 different modes.',on:scored>=6},
      {id:'ace',icon:'★',title:'Pink Ace',desc:'Reach a score of 90 or higher.',on:top>=90},
      {id:'live',icon:'♫',title:'Live Wire',desc:'Score 60+ in every live-stage mode.',on:live.length>0&&live.every(g=>Number(state.best[g.id]||0)>=60)},
      {id:'lab',icon:'⌘',title:'Backstage Brain',desc:'Score 70+ in Cipher, Route and Fanlight Grid.',on:lab.every(id=>Number(state.best[id]||0)>=70)},
      {id:'spotlight',icon:'✦',title:'Spotlight Regular',desc:'Clear 3 rotating Spotlight missions.',on:Number(state.spotlightWins||0)>=3},
      {id:'all',icon:'PV',title:'Full Deck',desc:'Post a score in every arcade game.',on:scored===arcadeGames.length}
    ];
  }

  function missionData(){
    const scored=arcadeGames.filter(g=>Number(state.best[g.id]||0)>0).length;
    const music=['pink-tiles','lightstick-wave','beat-switch'];
    const musicBest=Math.max(0,...music.map(id=>Number(state.best[id]||0)));
    const labBest=Math.max(Number(state.best['pink-cipher']||0),Number(state.best['stage-route']||0));
    return [
      {title:'Build arcade mastery',value:Math.min(masteryTotal(),12),goal:12,suffix:'stars'},
      {title:'Own the beat',value:Math.min(musicBest,80),goal:80,suffix:'score'},
      {title:'Backstage solve',value:Math.min(labBest,75),goal:75,suffix:'score'}
    ];
  }

  function nextGameAfter(id){
    if(id==='concert-freeplay')return null;
    const current=gameById(id);
    const same=arcadeGames.filter(g=>g.cat===current?.cat&&g.id!==id);
    const unscored=same.find(g=>!Number(state.best[g.id]||0));
    if(unscored)return unscored;
    const masteryCandidate=[...same].filter(g=>masteryStars(state.best[g.id])<3).sort((a,b)=>masteryStars(state.best[a.id])-masteryStars(state.best[b.id])||Number(state.best[a.id]||0)-Number(state.best[b.id]||0))[0];
    if(masteryCandidate)return masteryCandidate;
    const globalCandidate=[...arcadeGames].filter(g=>g.id!==id&&masteryStars(state.best[g.id])<3).sort((a,b)=>masteryStars(state.best[a.id])-masteryStars(state.best[b.id])||Number(state.best[a.id]||0)-Number(state.best[b.id]||0))[0];
    if(globalCandidate)return globalCandidate;
    const idx=Math.max(0,arcadeGames.findIndex(g=>g.id===id));
    return arcadeGames[(idx+1)%arcadeGames.length];
  }

  function fallbackSvg(key){
    const label=key==='group'?'BLACKPINK':key;
    const safe=encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#100d11"/><stop offset="1" stop-color="#ff3f98"/></linearGradient></defs><rect width="900" height="1100" fill="url(#g)"/><circle cx="690" cy="220" r="180" fill="#fff" opacity=".08"/><text x="70" y="860" font-family="Arial,sans-serif" font-size="84" font-weight="800" fill="#fff">${label}</text><text x="74" y="925" font-family="Arial,sans-serif" font-size="26" letter-spacing="8" fill="#ffd0e7">PINKVERSE</text></svg>`);
    return `data:image/svg+xml;charset=UTF-8,${safe}`;
  }
  function photoFallback(el){
    const key=el.dataset.photo;
    const list=photoSources[key]||[];
    const next=(Number(el.dataset.sourceIndex||0)+1);
    if(next<list.length){
      el.dataset.sourceIndex=String(next);
      el.src=list[next];
      return;
    }
    el.onerror=null;
    el.dataset.failed='true';
    el.src=fallbackSvg(key||'PINKVERSE');
    el.closest('.photo-shell,.ticket-photo,.cover-photo,.portrait-strip figure,.start-art,.memory-face,.beat-card,.cipher-slot,.cipher-palette button,.camera-card,.member-hub-photo,.member-mission-photo,.linked-shot,.finish-photo,.quick-thumb,.spotlight-visual,.track-thumb')?.classList.add('image-fallback');
  }
  function photoImg(key,alt='',className='',attrs=''){
    return `<img src="${photos[key]}" data-photo="${key}" data-source-index="0" alt="${esc(alt)}" ${className?`class="${className}"`:''} referrerpolicy="no-referrer" decoding="async" onerror="window.PINKVERSE_PHOTO_ERROR(this)" ${attrs}>`;
  }
  window.PINKVERSE_PHOTO_ERROR=photoFallback;

  function pixelAvatar(member,small=false,pose='idle',outfitOverride=null,variantOverride=null,liveStable=false){
    const key=spriteKey(member);
    const safePose=['idle','up','down','left','right','win','run','dance','carry','point','heart','sing','bow','sway','turn','kick','hop','sweep','pose','final'].includes(pose)?pose:'idle';
    const outfit=spriteOutfits.some(o=>o.id===outfitOverride)?outfitOverride:spriteOutfitFor(member);
    const animated=!['win','carry'].includes(safePose);
    const stableSrc=liveStable?dedicatedDanceSheets[key]?.[outfit]:null;
    const sheetType=stableSrc?'dancecycle':memberSpriteSheetType(member,outfit,safePose);
    const sheetVariant=variantOverride||memberSpriteSheetVariant(member,safePose);
    const src=stableSrc||memberSpriteSheet(member,outfit,safePose,sheetVariant);
    const stableClass=stableSrc?' live-stable-atlas':'';
    const viewportStyle=stableSrc?` style="--pv-live-atlas:url('${src}')"`:'';
    return `<div class="pixel-avatar pixel-${key} pixel-pose-${safePose} outfit-${outfit} sheet-${sheetType} sheet-variant-${sheetVariant}${stableClass} ${animated?'pixel-animated':'pixel-static'} ${small?'pixel-small':''}" data-member="${key}" data-pose="${safePose}" data-outfit="${outfit}" data-sheet-type="${sheetType}" data-sheet-variant="${sheetVariant}" data-live-stable="${stableSrc?'1':'0'}" role="img" aria-label="${esc(member)} pixel character in ${esc(spriteOutfits.find(o=>o.id===outfit)?.label||outfit)}"><div class="pixel-sheet-viewport"${viewportStyle}><img class="pixel-sheet-img" src="${src}" alt="" decoding="async" draggable="false"></div></div>`;
  }

  function pixelCutscene({title,kicker='PIXEL STORY',member='Jisoo',lines=[],button='CONTINUE',action=''}){
    const crew=members.filter(m=>m!==member);
    return `<section class="pixel-cutscene"><div class="pixel-scene-stage"><div class="pixel-scene-lights"></div><div class="pixel-scene-props"><i>▥</i><i>♪</i><i>◆</i></div>${pixelAvatar(member,false,'idle')}<span class="pixel-scene-name">${esc(member)}</span><div class="pixel-scene-crew">${crew.map(m=>`<span>${pixelAvatar(m,true,'idle')}</span>`).join('')}</div></div><div class="pixel-scene-copy"><span class="eyebrow">${esc(kicker)}</span><h2>${esc(title)}</h2><div class="pixel-dialogue">${lines.map((line,i)=>`<p><span>0${i+1}</span>${esc(line)}</p>`).join('')}</div><div class="pixel-story-status"><span>CREW LINKED</span><b>${crew.join(' · ')}</b></div><button class="cta" ${action?`onclick="${action}"`:''}>${esc(button)} →</button></div></section>`;
  }

  let audioCtx=null;
  let audioUnlockBound=false;
  function ensureAudio(){
    if(state.sound===false)return null;
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return null;
    try{
      if(!audioCtx)audioCtx=new AC();
      if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});
      return audioCtx;
    }catch{return null;}
  }
  function removeAudioUnlockListeners(){
    if(!audioUnlockBound)return;
    audioUnlockBound=false;
    document.removeEventListener('pointerdown',unlockAudioFromGesture,true);
    document.removeEventListener('touchend',unlockAudioFromGesture,true);
    document.removeEventListener('keydown',unlockAudioFromGesture,true);
  }
  async function unlockAudioFromGesture(){
    if(state.sound===false)return;
    const ctx=ensureAudio();
    if(!ctx)return;
    try{
      if(ctx.state!=='running')await ctx.resume();
      // A silent one-frame source makes the unlock explicit on iOS Safari without
      // producing an audible click or interfering with the user's media gesture.
      if(ctx.state==='running'){
        const source=ctx.createBufferSource();
        const gain=ctx.createGain();
        source.buffer=ctx.createBuffer(1,1,ctx.sampleRate);
        gain.gain.value=0;
        source.connect(gain);gain.connect(ctx.destination);source.start(0);
        document.documentElement.classList.add('pv-audio-unlocked');
        removeAudioUnlockListeners();
      }
    }catch{}
  }
  function bindAudioUnlock(){
    if(audioUnlockBound)return;
    audioUnlockBound=true;
    document.addEventListener('pointerdown',unlockAudioFromGesture,true);
    document.addEventListener('touchend',unlockAudioFromGesture,{capture:true,passive:true});
    document.addEventListener('keydown',unlockAudioFromGesture,true);
  }
  bindAudioUnlock();
  function tone(freq,duration=.08,type='sine',volume=.035,delay=0){
    const ctx=ensureAudio(); if(!ctx)return;
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    const t=ctx.currentTime+delay;
    osc.type=type; osc.frequency.setValueAtTime(freq,t);
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),t+.008);
    gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t+duration+.025);
  }
  function sfx(name,value=0){
    if(state.sound===false)return;
    if(name==='tap')tone(310,.045,'triangle',.02);
    else if(name==='flip')tone(420,.055,'triangle',.025);
    else if(name==='match'){tone(620,.08,'triangle',.035);tone(830,.1,'triangle',.03,.06);}
    else if(name==='miss'){tone(180,.11,'sawtooth',.025);tone(125,.12,'sine',.02,.06);}
    else if(name==='start'){tone(360,.07,'triangle',.025);tone(540,.09,'triangle',.028,.07);}
    else if(name==='perfect'){tone(720,.06,'triangle',.035);tone(980,.09,'triangle',.03,.05);}
    else if(name==='good')tone(600,.08,'triangle',.03);
    else if(name==='heart'){tone(660,.05,'sine',.025);tone(880,.08,'sine',.028,.045);}
    else if(name==='cue')tone(value||520,.08,'square',.022);
    else if(name==='member'){const notes=[392,494,587,740];tone(notes[value%4],.11,'triangle',.028);}
    else if(name==='win'){tone(523,.09,'triangle',.03);tone(659,.09,'triangle',.03,.08);tone(784,.16,'triangle',.032,.16);}
    else if(name==='low')tone(150,.12,'sawtooth',.02);
  }
  function vibrate(ms=18){ if('vibrate' in navigator)try{navigator.vibrate(ms);}catch{} }

  function loadYouTubeAPI(){
    if(window.YT&&window.YT.Player)return Promise.resolve(window.YT);
    if(youtubeApiPromise)return youtubeApiPromise;
    youtubeApiPromise=new Promise((resolve,reject)=>{
      let settled=false;
      const previous=window.onYouTubeIframeAPIReady;
      let script=document.querySelector('script[src*="youtube.com/iframe_api"]');
      let timeout=0,poll=0;
      const cleanup=()=>{
        clearTimeout(timeout);clearInterval(poll);
        if(window.onYouTubeIframeAPIReady===ready)window.onYouTubeIframeAPIReady=previous||null;
      };
      const succeed=()=>{
        if(settled||!window.YT?.Player)return;
        settled=true;cleanup();
        try{previous?.();}catch{}
        resolve(window.YT);
      };
      const fail=message=>{
        if(settled)return;
        settled=true;cleanup();
        if(script&&!window.YT?.Player){try{script.remove();}catch{}}
        reject(new Error(message));
      };
      const ready=()=>succeed();
      window.onYouTubeIframeAPIReady=ready;
      if(!script){
        script=document.createElement('script');
        script.src='https://www.youtube.com/iframe_api';
        script.async=true;
        document.head.appendChild(script);
      }
      script.addEventListener?.('error',()=>fail('YouTube API failed to load'),{once:true});
      poll=setInterval(succeed,250);
      timeout=setTimeout(()=>fail('YouTube API load timed out'),9000);
      succeed();
    }).catch(err=>{
      youtubeApiPromise=null;
      throw err;
    });
    return youtubeApiPromise;
  }
  function syncYouTubeSound(){
    try{
      if(!activeYouTubePlayer)return;
      if(state.sound===false)activeYouTubePlayer.mute();else activeYouTubePlayer.unMute();
    }catch{}
  }

  function soundButton(extraClass=''){
    const on=state.sound!==false;
    return `<button class="sound-toggle ${extraClass}" onclick="window.PV.toggleSound()" aria-pressed="${on}" aria-label="${on?'Mute':'Enable'} game sounds" title="${on?'Mute':'Enable'} sounds"><span>${on?'♪':'×'}</span><b>${on?'SOUND':'MUTED'}</b></button>`;
  }
  function updateSoundButtons(){
    syncYouTubeSound();
    document.querySelectorAll('.sound-toggle').forEach(btn=>{
      const on=state.sound!==false;
      btn.setAttribute('aria-pressed',String(on));
      btn.setAttribute('aria-label',on?'Mute game sounds':'Enable game sounds');
      btn.title=on?'Mute sounds':'Enable sounds';
      btn.innerHTML=`<span>${on?'♪':'×'}</span><b>${on?'SOUND':'MUTED'}</b>`;
    });
  }

  function shell(content){
    const rank=rankData();
    return `<div class="app-shell"><header class="sitebar"><button class="wordmark" onclick="location.hash=''" aria-label="PINKVERSE home"><img class="brand-mark" src="assets/icons/logo-mark.svg" alt="" width="40" height="40"><div class="brand-lockup"><b>PINKVERSE</b><small>Fan Arcade</small></div></button><nav class="header-nav" aria-label="Primary home navigation"><button onclick="window.PV.scrollToSection('concert')">Concert</button><button onclick="window.PV.scrollToSection('progress')">Progress</button><button onclick="window.PV.scrollToSection('library')">Game Deck</button></nav><div class="site-stats"><span class="rank-mini desktop-stat">${rank.name}</span><span class="heart-chip">♥ ${state.hearts}</span>${soundButton('home-sound')}<button class="reset-mini" onclick="window.PV.info('support')" title="Help and settings" aria-label="Open support and settings">⋯</button></div></header>${content}</div>`;
  }

  function renderRoute(){
    closeGameOverlay();
    cleanup(); cleanup=()=>{};
    const h=location.hash.replace(/^#/,'');
    const isGame=h.startsWith('play/');
    const isInfo=h.startsWith('info/');
    document.body.classList.toggle('playing',isGame);
    document.body.classList.toggle('info-view',isInfo);
    if(isGame) openGame(h.split('/')[1]);
    else if(isInfo) renderInfoPage(h.split('/')[1]);
    else renderHome();
  }
  window.addEventListener('hashchange',renderRoute);

  function renderHome(){
    const recentArcade=(state.recent||[]).map(r=>({...r,game:gameById(r.id)})).filter(r=>r.game&&r.id!=='concert-freeplay');
    const last=state.lastGame&&state.lastGame!=='concert-freeplay'?gameById(state.lastGame):(recentArcade[0]?.game||null);
    const scored=arcadeGames.filter(g=>Number(state.best[g.id]||0)>0).length;
    const concertBest=Number(state.best['concert-freeplay']||0);
    const concertRuns=Number(state.gamePlays?.['concert-freeplay']||0);
    const top=Math.max(0,...Object.values(state.best).map(Number));
    const rank=rankData();
    const badges=badgeData();
    const unlocked=badges.filter(b=>b.on).length;
    const mastery=masteryTotal();
    const missions=missionData();
    const recent=recentArcade.slice(0,3);
    const spotlight=spotlightInfo();
    const pixelWorld=pixelWorldData();
    const showOnboarding=!state.onboardingSeen&&state.plays===0;
    const defaultLane='live stage';
    app.innerHTML=shell(`<main class="home home-v32 home-v36 home-v63">
      <section class="cover-story cover-v32">
        <div class="cover-copy">
          <div><div class="cover-kicker">PINKVERSE · ARCADE + CONCERT</div><h1><span>PLAY</span><i>PINK</i><em>LIVE</em></h1><p>Arcade games when you want a challenge. Concert Mode when you want to build and direct the show.</p></div>
          <div class="cover-actions"><button class="cta" onclick="window.PV.scrollToSection('concert')">OPEN CONCERT MODE <b>↓</b></button><button class="text-cta" onclick="window.PV.open('${spotlight.game.id}')">Play today's Spotlight →</button></div>
        </div>
        <div class="cover-photo photo-shell">${photoImg('group','BLACKPINK at a pink carpet event')}<div class="cover-gradient"></div><div class="cover-stamp"><small>${rank.name}</small><b>${String(scored).padStart(2,'0')}</b><span>MODES SCORED</span></div><div class="cover-caption"><span>ARCADE / PIXEL / MUSIC</span><b>MAKE IT PINK</b></div></div>
      </section>
      <section class="home-status-strip" id="fanpass"><div><small>FAN PASS</small><b>${rank.name}</b></div><i><em style="width:${rank.progress}%"></em></i><span>${state.hearts} ♥</span><span>${mastery}/${arcadeGames.length*3} mastery ★</span><span>${scored}/${arcadeGames.length} games scored</span></section>
      <section class="concert-home-feature" id="concert">
        <div class="concert-home-copy"><div><span class="eyebrow">PINKVERSE LIVE · SEPARATE MODE</span><h2>DIRECT YOUR PIXEL CONCERT</h2><p>Build a custom BLACKPINK YouTube-backed setlist, choose member outfits and LED eras, then run the animated pixel stage from opening entrance to encore bow.</p></div><div class="concert-home-meta"><span><small>BEST SHOW</small><b>${concertBest||'—'}</b></span><span><small>CONCERTS</small><b>${concertRuns}</b></span><span><small>SETLIST</small><b>3–5</b></span></div><div class="concert-home-actions"><button class="cta" onclick="window.PV.open('concert-freeplay')">ENTER CONCERT MODE →</button><button class="ghost-cta" onclick="window.PV.startConcert('medium')">QUICK FULL SET</button></div><small class="concert-home-note">Official YouTube embeds provide playback. The visible experience stays focused on the pixel stage.</small></div>
        <div class="concert-home-stage" aria-label="Pixel concert preview"><div class="home-led"><small>PINKVERSE LIVE</small><b>PIXEL CONCERT</b><span>BUILD · DIRECT · ENCORE</span></div><div class="home-stage-lights"><i></i><i></i><i></i><i></i></div><div class="home-stage-band">${members.map((m,i)=>`<div>${pixelAvatar(m,false,i%2?'dance':'idle')}<small>${m}</small></div>`).join('')}</div><div class="home-crowd-row">${Array.from({length:10},(_,i)=>`<i><img class="fan-sprite" src="${crowdSpriteSheet(i)}" alt="" decoding="async"></i>`).join('')}</div></div>
      </section>
      <section class="home-now-grid" id="spotlight">
        <article class="spotlight-compact ${spotlight.claimed?'claimed':''}"><div class="spotlight-compact-photo photo-shell">${photoImg(spotlight.game.image==='group'?'group':spotlight.game.image,spotlight.game.title,'','loading="lazy"')}<span>DAILY ✦</span></div><div class="spotlight-compact-copy"><small>TODAY'S SPOTLIGHT · ${spotlight.game.cat}</small><h2>${spotlight.game.title}</h2><p>${spotlight.game.desc}</p><div><span>BEST ${Number(state.best[spotlight.game.id]||0)||'—'}</span><span>${spotlight.claimed?'BONUS CLAIMED':'+15 HEARTS'}</span></div><button onclick="window.PV.open('${spotlight.game.id}')">${spotlight.claimed?'PLAY AGAIN':'START MISSION'} →</button></div></article>
        <article class="continue-card"><span class="eyebrow">PLAY NEXT</span><h2>${last?last.title:'SHUFFLE THE DECK'}</h2><p>${last?'Continue your last run, or jump to something different.':'Start with a random mode and discover the deck as you play.'}</p><div class="continue-actions">${last?`<button onclick="window.PV.open('${last.id}')">CONTINUE</button>`:''}<button onclick="window.PV.random()">SHUFFLE</button></div>${recent.length?`<div class="recent-compact">${recent.map(r=>`<button onclick="window.PV.open('${r.id}')"><span>${r.game.icon}</span><b>${r.game.title}</b><em>${r.score}</em></button>`).join('')}</div>`:''}</article>
      </section>
      <section class="progress-hub" id="progress"><div class="section-mini-head"><div><span class="eyebrow">YOUR PROGRESS</span><h2>Routes & milestones</h2></div><small>Open a section only when you want the details.</small></div>
        <details class="progress-drawer"><summary><span>01</span><div><small>MEMBER MISSIONS</small><b>Four three-game routes</b></div><em>${members.reduce((sum,m)=>sum+memberHubData(m).completed,0)}/12 cleared</em></summary><div class="drawer-body"><div class="member-missions-grid compact">${members.map((m,i)=>{const mh=memberHubData(m);return `<article class="member-mission-card compact"><div class="member-mission-photo photo-shell">${photoImg(m,m,'','loading="lazy"')}<span>0${i+1}</span><div><small>${mh.completed}/${mh.total} CLEARED</small><b>${m}</b></div></div><div class="member-mission-body"><div class="member-route-progress"><span><b>${mh.progress}%</b> route</span><i><em style="width:${mh.progress}%"></em></i></div>${mh.next?`<button class="member-next" onclick="window.PV.open('${mh.next.id}')"><span>${mh.mastered?'ROUTE MASTERED':'NEXT MISSION'}</span><b>${mh.next.title}</b><i>${mh.mastered?'REPLAY →':'PLAY →'}</i></button>`:''}</div></article>`;}).join('')}</div></div></details>
        <details class="progress-drawer"><summary><span>02</span><div><small>PIXEL WORLD</small><b>Backstage to Encore</b></div><em>${pixelWorld.cleared}/${pixelWorld.total} chapters</em></summary><div class="drawer-body"><div class="pixel-world-copy compact"><div><span class="eyebrow">PIXEL WORLD</span><h2>BACKSTAGE TO ENCORE</h2><p>Continue the connected four-chapter pixel campaign.</p></div><button class="pixel-world-continue" onclick="window.PV.open('${pixelWorld.current.id}')"><span>NEXT CHAPTER</span><b>${pixelWorld.current.game.title}</b><i>${pixelWorld.current.chapter}</i></button></div><div class="pixel-world-map compact">${pixelWorld.nodes.map(n=>`<button class="pixel-world-node ${n.complete?'complete':''} ${n.unlocked?'unlocked':'locked'} ${pixelWorld.current.id===n.id?'current':''}" ${n.unlocked?`onclick="window.PV.open('${n.id}')"`:'disabled'}><em>${n.chapter}</em><i>${n.game.icon}</i><div><small>${n.place}</small><b>${n.game.title}</b></div><strong>${n.complete?`BEST ${n.best}`:n.unlocked?'PLAY':'LOCKED'}</strong></button>`).join('')}</div></div></details>
        <details class="progress-drawer"><summary><span>03</span><div><small>TOUR MISSIONS</small><b>Three simple goals</b></div><em>${missions.filter(m=>m.value>=m.goal).length}/3 complete</em></summary><div class="drawer-body"><div class="mission-grid">${missions.map(m=>{const pct=clamp(m.value/m.goal*100,0,100);return `<article class="mission-card ${m.value>=m.goal?'complete':''}"><span>${m.value>=m.goal?'✓':'○'}</span><div><b>${m.title}</b><small>${m.value}/${m.goal} ${m.suffix}</small><i><em style="width:${pct}%"></em></i></div></article>`;}).join('')}</div></div></details>
        <details class="progress-drawer" id="stamps"><summary><span>04</span><div><small>PASSPORT STAMPS</small><b>Permanent milestones</b></div><em>${unlocked}/${badges.length} unlocked</em></summary><div class="drawer-body"><div class="stamp-grid compact">${badges.map(b=>`<article class="stamp ${b.on?'unlocked':'locked'}"><span>${b.icon}</span><div><b>${b.title}</b><small>${b.desc}</small></div><em>${b.on?'UNLOCKED':'LOCKED'}</em></article>`).join('')}</div></div></details>
      </section>
      <section class="game-library game-library-v32" id="library"><div class="library-head"><div><span class="eyebrow">ARCADE GAMES</span><h2>Pick a game lane</h2></div><div class="library-stat mastery-library-stat"><b>${mastery}/${arcadeGames.length*3}</b><span>mastery stars</span></div></div><div class="deck-filter" role="tablist" aria-label="Game categories"><button class="active" data-filter="${defaultLane}" onclick="window.PV.filterDeck('${defaultLane}')">Live stage</button>${lanes.filter(l=>l.id!==defaultLane).map(l=>`<button data-filter="${l.id}" onclick="window.PV.filterDeck('${l.id}')">${l.label}</button>`).join('')}<button data-filter="all" onclick="window.PV.filterDeck('all')">All</button></div><div class="filtered-deck">${arcadeGames.map(g=>`<div class="deck-item" data-cat="${g.cat}" ${g.cat===defaultLane?'':'hidden'}>${gameTicket(g)}</div>`).join('')}</div></section>
      ${siteFooter()}
      <nav class="mobile-dock mobile-dock-v32" aria-label="Quick navigation"><button data-target="spotlight" onclick="window.PV.scrollToSection('spotlight')" aria-label="Today's Spotlight"><span>✦</span><b>Today</b></button><button data-target="concert" onclick="window.PV.scrollToSection('concert')" aria-label="Concert Mode"><span>♬</span><b>Concert</b></button><button class="dock-primary" onclick="window.PV.random()" aria-label="Shuffle game"><span>↻</span><b>Shuffle</b></button><button data-target="progress" onclick="window.PV.scrollToSection('progress')" aria-label="Progress"><span>◆</span><b>Progress</b></button><button data-target="library" onclick="window.PV.scrollToSection('library')" aria-label="Game Deck"><span>▦</span><b>Games</b></button></nav>
      ${showOnboarding?`<div class="onboarding-backdrop" id="onboarding"><section class="onboarding-card"><button class="onboarding-close" onclick="window.PV.dismissOnboarding()" aria-label="Close tutorial">×</button><span class="eyebrow">WELCOME TO PINKVERSE</span><h2>PLAY. MASTER. RETURN.</h2><p>Pick an arcade game, improve your score, and build mastery. Concert Mode stays separate when you want a performance instead of a score run.</p><div class="onboarding-steps"><article><span>01</span><b>PLAY</b><small>Choose a game lane or today's Spotlight.</small></article><article><span>02</span><b>MASTER</b><small>Scores of 50, 70 and 90 earn up to three mastery stars per game.</small></article><article><span>03</span><b>PROGRESS</b><small>Hearts raise your Fan Pass rank while mastery shows skill across the deck.</small></article></div><div class="onboarding-actions"><button class="cta" onclick="window.PV.startOnboardingSpotlight()">PLAY TODAY'S SPOTLIGHT</button><button class="ghost-cta" onclick="window.PV.dismissOnboarding()">BROWSE THE DECK</button></div></section></div>`:''}
    </main>`);
    requestAnimationFrame(setupHomeUi);
  }

  function setupHomeUi(){
    window.PVHomeScrollCleanup?.();
    const dock=document.querySelector('.mobile-dock-v32');
    if(!dock)return;
    const targets=['spotlight','concert','progress','library'];
    const buttons=[...dock.querySelectorAll('[data-target]')];
    const setActive=id=>buttons.forEach(btn=>{const on=btn.dataset.target===id;btn.classList.toggle('is-active',on);if(on)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current');});
    const update=()=>{
      const marker=Math.max(110,innerHeight*.30);
      let active=targets[0];
      for(const id of targets){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=marker)active=id;}
      setActive(active);
    };
    update();
    let ticking=false;
    const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;update();});};
    window.addEventListener('scroll',onScroll,{passive:true});
    window.PVHomeScrollCleanup=()=>window.removeEventListener('scroll',onScroll);
  }

  function siteFooter(){
    return `<footer class="site-footer footer-v17"><div class="footer-main"><div class="footer-brand"><img class="footer-mark" src="assets/icons/logo-mark.svg" alt="" width="40" height="40"><div><b>PINKVERSE</b><p>Unofficial BLACKPINK fan-made play deck. Independently built and not affiliated with BLACKPINK, YG Entertainment, or the members.</p></div></div><nav class="footer-links" aria-label="PINKVERSE information"><button onclick="window.PV.info('privacy')">Privacy</button><button onclick="window.PV.info('terms')">Terms</button><button onclick="window.PV.info('help')">Help</button><button onclick="window.PV.info('support')">Support</button></nav></div><div class="footer-sources"><span>Remote photo sources:</span><a href="${credits.group}" target="_blank" rel="noreferrer">Group</a>${members.map(m=>`<a href="${credits[m]}" target="_blank" rel="noreferrer">${m}</a>`).join('')}</div><div class="footer-bottom"><span>${APP_VERSION.toUpperCase()} · Local-first fan arcade</span><span>Policies updated ${POLICY_UPDATED}</span></div></footer>`;
  }

  function infoShell(kind,title,kicker,content){
    return `<main class="info-page info-${kind}"><header class="info-top"><button class="info-back" onclick="window.PV.goHome()" aria-label="Back to PINKVERSE">←</button><div><span>${kicker}</span><b>${title}</b></div>${soundButton('info-sound')}</header><section class="info-hero"><span>PINKVERSE / ${kind.toUpperCase()}</span><h1>${title}</h1><p>${kind==='privacy'?'What the arcade stores locally, which outside services load, and what is not collected by PINKVERSE.':kind==='terms'?'Simple ground rules for using this unofficial fan-made arcade.':kind==='help'?'Troubleshooting for music, images, touch controls, local saves, updates, and gameplay.':'Tools for fixing the app on your device and collecting useful diagnostics.'}</p></section>${content}${siteFooter()}</main>`;
  }

  function policyCard(number,title,body){
    return `<article class="policy-card"><span>${String(number).padStart(2,'0')}</span><div><h2>${title}</h2>${body}</div></article>`;
  }

  function renderInfoPage(kind){
    window.scrollTo(0,0);
    const safe=['privacy','terms','help','support'].includes(kind)?kind:'help';
    if(safe==='privacy'){
      app.innerHTML=infoShell('privacy','Privacy','LOCAL-FIRST PRIVACY',`<section class="policy-grid">
        ${policyCard(1,'Local progress',`<p>PINKVERSE stores game progress, high scores, hearts, difficulty choices, the last-played mode, and your sound preference in this browser using localStorage. The app does not include a PINKVERSE account system or its own remote player database.</p>`)}
        ${policyCard(2,'Remote images and fonts',`<p>Member/group photos load from Wikimedia Commons URLs and fonts load from Google Fonts. When your browser requests those files, the outside host may receive ordinary network information such as your IP address, browser details, and request time.</p>`)}
        ${policyCard(3,'YouTube music modes',`<p>Pink Tiles, Lightstick Wave, Beat Switch, and Concert Mode use embedded official YouTube videos. YouTube/Google operates that player and may process playback, device, cookie, or account information under its own policies. PINKVERSE does not download the song audio.</p>`)}
        ${policyCard(4,'Offline cache',`<p>A service worker may cache local PINKVERSE app files and selected assets, including interface files, member/crowd graphics, stage art, and effects, so the shell and core visuals can reopen more reliably. Remote photos, fonts, and YouTube media are not intentionally copied into the PINKVERSE app cache.</p>`)}
        ${policyCard(5,'What PINKVERSE does not ask for',`<p>The current build does not ask for your name, email address, phone number, precise location, contacts, camera, microphone, payment information, password, or one-time codes.</p>`)}
        ${policyCard(6,'Your controls',`<p>You can reset local progress from the home header or Support page. You can also clear the app cache from Support. Clearing browser site data removes PINKVERSE local saves on that browser.</p>`)}
      </section>`);
      return;
    }
    if(safe==='terms'){
      app.innerHTML=infoShell('terms','Terms','FAN PROJECT TERMS',`<section class="policy-grid">
        ${policyCard(1,'Unofficial fan project',`<p>PINKVERSE is independently made for fan entertainment and is not sponsored, endorsed, or operated by BLACKPINK, YG Entertainment, the members, YouTube, Google, or Wikimedia Commons.</p>`)}
        ${policyCard(2,'Third-party media',`<p>Photos remain subject to the licenses and attribution information on their linked Wikimedia Commons source pages. Music/video remains hosted and delivered by YouTube. PINKVERSE does not claim ownership of BLACKPINK names, music, videos, or photographs.</p>`)}
        ${policyCard(3,'Game scores and hearts',`<p>Scores, hearts, badges, and progress are fictional in-game values stored locally. They have no cash value, do not represent purchases, and cannot be redeemed for goods or services.</p>`)}
        ${policyCard(4,'Availability',`<p>The arcade is provided as-is. A game, image, font, or music mode can stop working if your browser, connection, device, YouTube, Wikimedia, or another outside service changes or becomes unavailable.</p>`)}
        ${policyCard(5,'Fair use of the app',`<p>Do not use PINKVERSE to impersonate BLACKPINK, YG Entertainment, the members, or an official service. Do not present this fan build as an official product or use it to mislead people about endorsements, tickets, payments, giveaways, or account access.</p>`)}
        ${policyCard(6,'Changes',`<p>Features and these terms may change as the fan project develops. The policy date shown in the footer indicates the version of this in-app notice.</p>`)}
      </section>`);
      return;
    }
    if(safe==='help'){
      app.innerHTML=infoShell('help','Help Center','GAME HELP',`<section class="help-grid">
        <article class="help-card"><span>01</span><h2>Music will not start</h2><p>Mobile browsers can block unmuted YouTube playback. Tap the game’s start button first. If the app shows a playback-blocked message, tap the native ▶ control inside the visible YouTube player once.</p><button onclick="window.PV.open('pink-tiles')">OPEN PINK TILES →</button></article>
        <article class="help-card"><span>02</span><h2>Images are blank</h2><p>PINKVERSE tries several Wikimedia image URLs and then an in-app fallback. Check your connection, content blocker, DNS filter, or network restrictions if member photos never load.</p><button onclick="window.PV.info('support')">RUN SUPPORT CHECKS →</button></article>
        <article class="help-card"><span>03</span><h2>Old version keeps appearing</h2><p>The service worker can preserve an older local shell. Use Support → Refresh app cache, then reopen the page. Your local scores are not intentionally deleted by that cache refresh.</p><button onclick="window.PV.info('support')">OPEN SUPPORT →</button></article>
        <article class="help-card"><span>04</span><h2>Touch timing feels late</h2><p>Music games include timing calibration where available. Bluetooth audio can add delay, so phone speakers or wired audio usually feel tighter for rhythm play.</p><button onclick="window.PV.open('pink-tiles')">CALIBRATE IN GAME →</button></article>
        <article class="help-card"><span>05</span><h2>No sound effects</h2><p>Check the ♪ sound control, your phone media volume, silent/DND behavior, and whether your browser has allowed audio after a user tap. Synth effects only begin after browser audio permission is available.</p></article>
        <article class="help-card"><span>06</span><h2>Progress disappeared</h2><p>Progress is tied to this browser’s local storage. Incognito/private mode, clearing site data, switching browsers, or some storage-cleaning tools can remove it.</p></article>
      </section><section class="help-shortcuts"><div><span>QUICK LINKS</span><h2>Jump back into the deck</h2></div><button onclick="window.PV.open('stage-route')">STAGE ROUTE</button><button onclick="window.PV.open('pixel-choreo')">PIXEL CHOREO</button><button onclick="window.PV.open('encore-dash')">ENCORE DASH</button><button onclick="window.PV.open('pink-tiles')">PINK TILES</button></section>`);
      return;
    }
    app.innerHTML=infoShell('support','Support','DEVICE & APP SUPPORT',`<section class="support-grid"><article class="support-status"><span class="support-dot"></span><div><span>LOCAL APP STATUS</span><h2>PINKVERSE ${APP_VERSION.toUpperCase()}</h2><p>This page does not submit diagnostics anywhere. It only shows information already available in your browser so you can troubleshoot the fan arcade.</p></div></article><article class="diagnostic-card"><div class="diagnostic-head"><span>DEVICE CHECK</span><button onclick="window.PV.copyDiagnostics()">COPY DIAGNOSTICS</button></div><div class="diagnostic-list" id="diagnosticList">${diagnosticsHtml()}</div><p id="diagnosticMessage" class="diagnostic-message">No diagnostic data leaves this page automatically.</p></article><article class="support-action"><span>01</span><div><h2>Refresh app cache</h2><p>Deletes PINKVERSE service-worker caches and reloads the current files. Your local score save is kept.</p></div><button onclick="window.PV.refreshCache()">REFRESH CACHE</button></article><article class="support-action danger"><span>02</span><div><h2>Reset local progress</h2><p>Removes local PINKVERSE scores, hearts, preferences, and last-played progress from this browser.</p></div><button onclick="window.PV.reset()">RESET PROGRESS</button></article><article class="support-action"><span>03</span><div><h2>Need gameplay help?</h2><p>Open the Help Center for music playback, image loading, timing, sound, updates, and local-save guidance.</p></div><button onclick="window.PV.info('help')">OPEN HELP</button></article></section>`);
  }

  function storageAvailable(){
    try{const k='__pv_test__';localStorage.setItem(k,'1');localStorage.removeItem(k);return true;}catch{return false;}
  }
  function diagnosticsData(){
    return {
      version:APP_VERSION,
      online:navigator.onLine?'online':'offline',
      localStorage:storageAvailable()?'available':'blocked',
      serviceWorker:'serviceWorker' in navigator?'supported':'not supported',
      audioContext:(window.AudioContext||window.webkitAudioContext)?'supported':'not supported',
      browser:platformInfo.isSafari?'Safari':'other',
      appleDevice:platformInfo.isiPhone?'iPhone':platformInfo.isiPad?'iPad':'no',
      displayMode:platformInfo.standalone?'standalone PWA':'browser tab',
      sound:state.sound!==false?'on':'muted',
      plays:state.plays,
      userAgent:navigator.userAgent
    };
  }
  function diagnosticsHtml(){
    const d=diagnosticsData();
    const rows=[['Version',d.version.toUpperCase()],['Network',d.online],['Local save',d.localStorage],['Service worker',d.serviceWorker],['Web Audio',d.audioContext],['Browser',d.browser],['Apple device',d.appleDevice],['Display mode',d.displayMode],['Game sound',d.sound],['Local plays',String(d.plays)]];
    return rows.map(([k,v])=>`<div><span>${k}</span><b>${esc(v)}</b></div>`).join('');
  }

  function gameTicket(g){
    const best=Number(state.best[g.id]||0);
    const plays=Number(state.gamePlays?.[g.id]||0);
    const target=masteryTarget(best);
    return `<button class="game-ticket ${best?'has-score':''} mastery-${masteryStars(best)}" onclick="window.PV.open('${g.id}')" aria-label="Play ${g.title}"><div class="ticket-photo photo-shell">${photoImg(g.image,'','', 'loading="lazy"')}<span>${g.code}</span><i>${g.icon}</i>${best?`<em class="ticket-best">${best}</em>`:''}</div><div class="ticket-copy"><div class="ticket-kicker"><small>${g.cat}</small>${masteryPips(best,false)}</div><h3>${g.title}</h3><p>${g.desc}</p><div class="ticket-foot"><span>${best?`BEST ${best} · ${plays} RUN${plays===1?'':'S'}`:'FIRST RUN'}</span><b>${target?`${target}+ ★`:'MASTERED'}</b></div></div></button>`;
  }

  function openGame(id){
    const g=gameById(id); if(!g){location.hash='';return;}
    app.innerHTML=`<main class="play-page game-${id} game-setup"><header class="playbar"><button class="close-play" onclick="window.PV.goHome()" aria-label="Back to games">←</button><div class="play-brand"><span>PV</span><small>PINKVERSE</small></div><div class="play-title"><span>${g.code} / ${g.cat}</span><b>${g.title}</b></div><div class="play-tools"><span class="play-best">BEST ${Number(state.best[g.id]||0)||'—'}</span><button class="play-mini-btn" onclick="window.PV.gameHelp('${g.id}')" aria-label="How to play ${g.title}" title="Mission help">?</button><button class="play-mini-btn" onclick="window.PV.restartCurrent('${g.id}')" aria-label="Restart ${g.title}" title="Restart run">↻</button>${soundButton('play-sound')}<div class="play-heart">♥ ${state.hearts}</div></div></header><section class="playboard" id="playboard">${difficultyPicker(g)}</section></main>`;
    if(id==='concert-freeplay'&&pendingConcertLevel){const level=pendingConcertLevel;pendingConcertLevel=null;setTimeout(()=>startGame(id,level),0);}
  }

  function difficultyPicker(g){
    const usesMusic=['pink-tiles','lightstick-wave','beat-switch','concert-freeplay'].includes(g.id);
    const usesTrackPicker=['pink-tiles','lightstick-wave','beat-switch'].includes(g.id);
    const trackPicker=usesTrackPicker?`<div class="track-picker track-picker-simple"><span class="eyebrow">CHOOSE A SONG</span><div class="track-options">${Object.values(youtubeTracks).map(t=>`<button class="track-choice track-choice-simple ${selectedYouTubeTrack===t.key?'selected':''}" data-track="${t.key}" onclick="window.PV.selectTrack('${t.key}')"><div class="track-choice-copy"><b>${t.title}</b><span>${t.bpm} BPM · OFFICIAL VIDEO · ${t.era||''}</span></div><em>${selectedYouTubeTrack===t.key?'SELECTED':'TAP TO SELECT'}</em></button>`).join('')}</div></div>`:g.id==='concert-freeplay'?`<div class="concert-entry-note"><span>♬</span><div><b>SETLIST BUILDER OPENS NEXT</b><small>Choose and reorder your YouTube-backed songs after selecting the show size.</small></div></div>`:'';
    const soundNote=usesMusic?'▶ Official YouTube embed · internet required':'♪ Synth game sounds';
    const pixelMeta=pixelWorldMeta[g.id];
    const pixelChapter=pixelMeta?`<div class="pixel-chapter-chip"><span>PIXEL WORLD · CHAPTER ${pixelMeta.chapter}</span><b>${pixelMeta.place}</b></div>`:'';
    const tips=gameBriefs[g.id]||[];
    const best=Number(state.best[g.id]||0);
    const plays=Number(state.gamePlays?.[g.id]||0);
    const mastery=masteryStars(best);
    const nextMastery=masteryTarget(best);
    return `<div class="start-card start-v18 ${usesMusic?'music-start':''}"><div class="start-art photo-shell">${photoImg(g.image,'')}<span>${g.icon}</span><div class="start-art-tag">${g.cat}</div><div class="start-cast" aria-label="BLACKPINK member portraits">${members.map(m=>`<span class="photo-shell">${photoImg(m,m,'','loading="lazy"')}</span>`).join('')}</div><div class="start-record"><small>PERSONAL BEST</small><b>${best||'—'}</b><span>${plays} run${plays===1?'':'s'}</span><div class="start-mastery">${masteryPips(best,false)}<em>${nextMastery?`NEXT ${nextMastery}+`:'MASTERED'}</em></div></div></div><div class="start-copy">${pixelChapter}<span class="eyebrow">MISSION BRIEF</span><h1>${g.title}</h1><p>${g.desc}</p><div class="brief-points">${tips.map((t,i)=>`<div><span>0${i+1}</span><p>${t}</p></div>`).join('')}</div>${trackPicker}<div class="difficulty-select ${g.id==='concert-freeplay'?'concert-show-size':''}">${Object.entries(difficulty).map(([k,d])=>{const concert=g.id==='concert-freeplay'?({easy:['Mini Set','3-song concert · fastest setup'],medium:['Full Set','4-song concert · balanced show'],hard:['Headliner','5-song concert · full experience']})[k]:null;return `<button onclick="window.PV.start('${g.id}','${k}')"><b>${concert?concert[0]:d.label}</b><span>${concert?concert[1]:d.note}</span><i>→</i></button>`;}).join('')}</div><div class="start-foot"><span>${soundNote}</span><span>★ Mastery at 50 / 70 / 90</span></div></div></div>`;
  }

  function hud(label,scoreText='',level='medium',meta=''){
    return `<div class="game-hud" role="status" aria-live="polite"><div class="hud-primary"><span class="hud-label">${label}</span>${scoreText?`<b>${scoreText}</b>`:''}</div><div class="hud-right">${meta?`<span class="hud-meta">${meta}</span>`:''}<span class="level-chip">${difficulty[level].short}</span></div></div>`;
  }

  function startGame(id,level){
    document.querySelector('.play-page')?.classList.remove('game-setup');
    cleanup(); cleanup=()=>{};
    state.difficulty[id]=level; save(); sfx('start');
    const fn={
      'polaroid-pair':polaroidPair,
      'camera-call':cameraCall,
      'lightstick-wave':lightstickWave,
      'pink-tiles':pinkTiles,
      'beat-switch':beatSwitch,
      'concert-freeplay':concertFreePlay,
      'pink-cipher':pinkCipher,
      'stage-route':stageRoute,
      'fanlight-grid':fanlightGrid,
      'pixel-choreo':pixelChoreo,
      'encore-dash':encoreDash,
      'stage-clash':stageClash
    }[id];
    fn?.(level);
  }

  let lastShareResult=null;

  function shareResultMarkup(data){
    const mastery=data.id==='concert-freeplay'?'LIVE SHOW':`${data.mastery}/3 MASTERY`;
    return `<section class="result-share-wrap" aria-label="Share result card"><div class="result-share-card" id="resultSharePreview"><div class="result-share-grid"></div><div class="result-share-head"><span>PINKVERSE · ${esc(data.code)}</span><b>${esc(data.cat.toUpperCase())}</b></div><div class="result-share-game"><small>RESULT CARD</small><h3>${esc(data.title)}</h3></div><div class="result-share-score"><strong>${data.score}</strong><span>GRADE <b>${esc(data.grade)}</b></span></div><div class="result-share-meta"><span><small>BEST</small><b>${data.best}</b></span><span><small>RANK</small><b>${esc(data.rank)}</b></span><span><small>${data.id==='concert-freeplay'?'MODE':'MASTERY'}</small><b>${esc(mastery)}</b></span></div><div class="result-share-foot"><span>#PINKVERSE</span><span>FAN ARCADE · ${esc(APP_VERSION.toUpperCase())}</span></div></div><div class="result-share-copy"><span class="eyebrow">SHARE YOUR RUN</span><h3>Post your result card</h3><p>Your card is generated locally as a portrait PNG. No screenshot cropping needed.</p><div class="result-share-actions"><button class="cta" onclick="window.PV.shareResultCard()">SHARE CARD</button><button class="ghost-cta" onclick="window.PV.saveResultCard()">SAVE PNG</button></div><small id="resultShareStatus">1080 × 1350 share card</small></div></section>`;
  }

  function roundedRectPath(ctx,x,y,w,h,r){
    const rr=Math.max(0,Math.min(r,w/2,h/2));
    ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
  }
  function wrapCanvasText(ctx,text,maxWidth,maxLines=4){
    const words=String(text||'').replace(/\s+/g,' ').trim().split(' ');const lines=[];let line='';
    for(const word of words){const test=line?`${line} ${word}`:word;if(ctx.measureText(test).width<=maxWidth){line=test;continue;}if(line)lines.push(line);line=word;if(lines.length>=maxLines-1)break;}
    if(line&&lines.length<maxLines)lines.push(line);
    const used=lines.join(' ').length;if(used<String(text||'').length&&lines.length){let last=lines[lines.length-1];while(last.length>3&&ctx.measureText(`${last}…`).width>maxWidth)last=last.slice(0,-1);lines[lines.length-1]=`${last.replace(/[.,;:·\s]+$/,'')}…`;}
    return lines;
  }
  async function buildResultCardBlob(){
    const data=lastShareResult;if(!data)throw new Error('No result card is available yet.');
    try{await document.fonts?.ready;}catch{}
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;const ctx=canvas.getContext('2d');
    const W=canvas.width,H=canvas.height;
    const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#09070a');bg.addColorStop(.58,'#140a12');bg.addColorStop(1,'#2a0d20');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    const glow=ctx.createRadialGradient(820,240,20,820,240,620);glow.addColorStop(0,'rgba(255,67,151,.34)');glow.addColorStop(1,'rgba(255,67,151,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,255,255,.055)';ctx.lineWidth=1;for(let x=0;x<=W;x+=54){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let y=0;y<=H;y+=54){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    ctx.fillStyle='#ff4b9f';ctx.fillRect(64,62,114,10);ctx.fillStyle='#ffffff';ctx.font='700 30px Manrope, Arial, sans-serif';ctx.fillText('PINKVERSE',64,118);ctx.fillStyle='rgba(255,255,255,.62)';ctx.font='700 18px IBM Plex Mono, monospace';ctx.fillText(`FAN ARCADE  •  ${APP_VERSION.toUpperCase()}`,64,150);
    ctx.textAlign='right';ctx.fillStyle='rgba(255,255,255,.72)';ctx.font='700 18px IBM Plex Mono, monospace';ctx.fillText(`${data.code} / ${data.cat.toUpperCase()}`,1016,102);ctx.textAlign='left';
    ctx.fillStyle='rgba(255,255,255,.54)';ctx.font='700 20px IBM Plex Mono, monospace';ctx.fillText('RESULT CARD',64,254);
    ctx.fillStyle='#ffffff';ctx.font='800 56px Unbounded, Manrope, Arial, sans-serif';const titleLines=wrapCanvasText(ctx,data.title,900,2);titleLines.forEach((line,i)=>ctx.fillText(line,64,322+i*70));
    const scoreY=titleLines.length>1?510:450;
    roundedRectPath(ctx,64,scoreY,952,360,36);ctx.fillStyle='rgba(255,255,255,.045)';ctx.fill();ctx.strokeStyle='rgba(255,92,167,.28)';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='700 20px IBM Plex Mono, monospace';ctx.fillText('FINAL SCORE',108,scoreY+70);
    ctx.fillStyle='#ffffff';ctx.font='800 176px Unbounded, Manrope, Arial, sans-serif';ctx.fillText(String(data.score),98,scoreY+245);
    ctx.fillStyle='#ff59a8';ctx.font='800 28px Unbounded, Manrope, Arial, sans-serif';ctx.fillText(`GRADE ${data.grade}`,685,scoreY+118);
    ctx.fillStyle='rgba(255,255,255,.74)';ctx.font='700 20px IBM Plex Mono, monospace';ctx.fillText(`BEST  ${data.best}`,686,scoreY+170);ctx.fillText(`RANK  ${data.rank}`,686,scoreY+214);ctx.fillText(data.id==='concert-freeplay'?`SHOW  ${data.modeLabel||'CONCERT'}`:`MASTERY  ${data.mastery}/3`,686,scoreY+258);
    if(data.newBest){roundedRectPath(ctx,682,scoreY+284,240,42,21);ctx.fillStyle='#ff4b9f';ctx.fill();ctx.fillStyle='#11080f';ctx.font='800 17px IBM Plex Mono, monospace';ctx.fillText('NEW PERSONAL BEST',705,scoreY+312);}
    const detailY=scoreY+430;ctx.fillStyle='#ff75b6';ctx.font='700 18px IBM Plex Mono, monospace';ctx.fillText('RUN RECAP',64,detailY);
    ctx.fillStyle='rgba(255,255,255,.82)';ctx.font='600 28px Manrope, Arial, sans-serif';const detailLines=wrapCanvasText(ctx,data.detail,940,4);detailLines.forEach((line,i)=>ctx.fillText(line,64,detailY+55+i*42));
    const statY=detailY+245;const boxes=[['HEARTS',`+${data.earned}`],['RUNS',String(data.runs)],['DIFFICULTY',data.level],['STATUS',data.newBest?'NEW BEST':'RUN CLEAR']];const bw=220,gap=20;boxes.forEach((pair,i)=>{const x=64+i*(bw+gap);roundedRectPath(ctx,x,statY,bw,110,22);ctx.fillStyle='rgba(255,255,255,.045)';ctx.fill();ctx.fillStyle='rgba(255,255,255,.48)';ctx.font='700 15px IBM Plex Mono, monospace';ctx.fillText(pair[0],x+18,statY+34);ctx.fillStyle='#fff';ctx.font='800 23px Manrope, Arial, sans-serif';ctx.fillText(pair[1],x+18,statY+76);});
    ctx.fillStyle='rgba(255,255,255,.42)';ctx.font='600 17px IBM Plex Mono, monospace';ctx.fillText('DIFFERENT GAMES. SAME LOVE.',64,1290);ctx.textAlign='right';ctx.fillStyle='#ff5ca9';ctx.font='800 18px IBM Plex Mono, monospace';ctx.fillText('#PINKVERSE',1016,1290);ctx.textAlign='left';
    return await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not render PNG.')),'image/png',.96));
  }
  function resultCardFilename(){
    const d=lastShareResult||{};return `pinkverse-${String(d.title||'result').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}-${d.score||0}.png`;
  }
  function setShareStatus(message){const el=document.getElementById('resultShareStatus');if(el)el.textContent=message;}
  async function saveResultCard(){
    try{setShareStatus('Rendering PNG…');const blob=await buildResultCardBlob();const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=resultCardFilename();document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);setShareStatus('PNG saved · ready to post');sfx('good');}
    catch(err){console.warn(err);setShareStatus('Could not save the card on this browser.');sfx('miss');}
  }
  async function shareResultCard(){
    try{setShareStatus('Preparing share card…');const blob=await buildResultCardBlob();const file=new File([blob],resultCardFilename(),{type:'image/png'});const data=lastShareResult;const shareData={title:`PINKVERSE · ${data.title}`,text:`I scored ${data.score} (${data.grade}) in ${data.title} on PINKVERSE.`,files:[file]};
      if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share(shareData);setShareStatus('Shared · nice run!');sfx('good');return;}
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=resultCardFilename();document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);setShareStatus('Sharing is unavailable here · PNG saved instead');sfx('good');
    }catch(err){if(err?.name==='AbortError'){setShareStatus('Share cancelled');return;}console.warn(err);setShareStatus('Share failed · try SAVE PNG');sfx('miss');}
  }

  function finish(id,score,detail){
    cleanup(); cleanup=()=>{};
    score=Math.round(clamp(score,0,100));
    const oldBest=Number(state.best[id]||0);
    const oldMastery=id==='concert-freeplay'?0:masteryStars(oldBest);
    const newBest=score>oldBest;
    const rankBefore=rankData();
    const badgeBefore=new Set(badgeData().filter(b=>b.on).map(b=>b.id));
    const spotlight=spotlightInfo();
    let spotlightBonus=0;
    if(id===spotlight.game.id&&!spotlight.claimed){
      spotlightBonus=15;
      state.daily={...state.daily,claimed:true};
      state.spotlightWins=Number(state.spotlightWins||0)+1;
    }
    const projectedBest=Math.max(oldBest,score);
    const projectedMastery=id==='concert-freeplay'?0:masteryStars(projectedBest);
    const masteryGain=Math.max(0,projectedMastery-oldMastery);
    const masteryBonus=masteryGain*2;
    const baseEarned=Math.max(2,Math.round(score/20));
    const earned=baseEarned+spotlightBonus+masteryBonus;
    state.plays++; state.lastGame=id; state.hearts+=earned;
    state.gamePlays={...(state.gamePlays||{}),[id]:Number(state.gamePlays?.[id]||0)+1};
    const grade=gradeFor(score);
    state.recent=[{id,score,grade,at:Date.now()},...(state.recent||[]).filter(r=>r.id!==id)].slice(0,6);
    state.best[id]=Math.max(oldBest,score);
    const rankAfter=rankData();
    const badgeAfter=badgeData().filter(b=>b.on);
    const newBadges=badgeAfter.filter(b=>!badgeBefore.has(b.id));
    const rankUp=rankAfter.name!==rankBefore.name;
    save();
    const g=gameById(id); const next=nextGameAfter(id);
    sfx(score>=45?'win':'low'); if(score>=80)vibrate(28);
    const unlocks=[
      spotlightBonus?`<span><b>+15</b> Spotlight bonus</span>`:'',
      rankUp?`<span><b>RANK UP</b> ${rankAfter.name}</span>`:'',
      masteryGain?`<span><b>+${masteryGain} ★</b> Mastery · +${masteryBonus} hearts</span>`:'',
      ...newBadges.map(b=>`<span><b>${b.icon}</b> ${b.title}</span>`)
    ].filter(Boolean).join('');
    const bestNow=Number(state.best[id]||0);
    const nextMastery=id==='concert-freeplay'?null:masteryTarget(bestNow);
    const masteryResult=id==='concert-freeplay'?'':`<div class="result-mastery"><div><span>ARCADE MASTERY</span>${masteryPips(bestNow)}</div><small>${nextMastery?`Score ${nextMastery}+ to earn the next star.`:'3/3 · MASTERED'}</small></div>`;
    lastShareResult={id,title:g.title,code:g.code,cat:g.cat,score,grade,detail,best:bestNow,runs:Number(state.gamePlays[id]||1),rank:rankAfter.name,earned,newBest,mastery:masteryStars(bestNow),level:difficulty[state.difficulty[id]||'medium']?.short||'STD',modeLabel:id==='concert-freeplay'?'LIVE DIRECTOR':''};
    const shareCard=shareResultMarkup(lastShareResult);
    document.getElementById('playboard').innerHTML=`<div class="finish-card finish-v19"><div class="finish-topline"><span class="finish-code">${g.code} · ${g.cat}</span><span class="finish-grade">GRADE <b>${grade}</b></span></div><div class="finish-photo photo-shell">${photoImg(g.image==='group'?'group':g.image,g.title,'','loading="lazy"')}<div class="finish-photo-shade"></div><span>PINKVERSE RESULT</span><b>${g.title}</b></div><div class="finish-score">${score}</div><h2>${score>=90?'ICONIC':score>=70?'ON FIRE':score>=45?'NICE RUN':'RUN IT BACK'}</h2><p>${detail}</p>${masteryResult}${unlocks?`<div class="unlock-ribbon">${unlocks}</div>`:''}<div class="finish-stats"><span><b>+${earned}</b> hearts</span><span><b>${state.best[id]}</b> best</span><span><b>${state.gamePlays[id]}</b> runs</span>${newBest?'<span class="new-best"><b>NEW</b> personal best</span>':''}</div>${shareCard}<div class="result-pass"><div><span>FAN PASS</span><b>${rankAfter.name}</b></div><i><em style="width:${rankAfter.progress}%"></em></i><small>${rankAfter.next?`${rankAfter.next-rankAfter.hearts} hearts to ${rankAfter.next===650?'ICON':'next rank'}`:'MAX RANK REACHED'}</small></div>${next?`<div class="next-mission"><span>NEXT MASTERY</span><div><b>${next.title}</b><small>${masteryStars(state.best[next.id])}/3 stars · ${next.cat}</small></div><button onclick="window.PV.open('${next.id}')">PLAY →</button></div>`:''}<div class="finish-actions"><button class="cta" onclick="window.PV.start('${id}','${state.difficulty[id]||'medium'}')">PLAY AGAIN</button>${id==='concert-freeplay'?'':`<button class="ghost-cta" onclick="window.PV.open('${id}')">CHANGE DIFFICULTY</button>`}<button class="ghost-cta" onclick="window.PV.goHome()">BACK TO DECK</button></div></div>`;
  }

  function polaroidPair(level){
    const panel=document.getElementById('playboard');
    const rollTotal=level==='easy'?2:3;
    const basePairs=level==='easy'?4:level==='medium'?4:5;
    const previewBase=level==='easy'?1350:level==='medium'?900:520;
    const pool=[
      {key:'jisoo',name:'Jisoo',photo:'Jisoo',pos:'center 15%'},
      {key:'jennie',name:'Jennie',photo:'Jennie',pos:'center 15%'},
      {key:'rose',name:'Rosé',photo:'Rosé',pos:'center 15%'},
      {key:'lisa',name:'Lisa',photo:'Lisa',pos:'center 15%'},
      {key:'group-left',name:'BLACKPINK',photo:'group',pos:'30% center'},
      {key:'group-right',name:'PINK PLAY',photo:'group',pos:'75% center'}
    ];
    let roll=0,totalScore=0,totalMoves=0,totalMisses=0,totalFlash=0,bestRunCombo=0;
    let deck=[],first=-1,lock=true,moves=0,pairs=0,combo=0,misses=0,flash=1,previewing=true,featured='',featuredClaimed=false;
    const timers=[];
    cleanup=()=>timers.forEach(clearTimeout);

    function setupRoll(){
      const count=Math.min(6,basePairs+Math.min(roll,1));
      const selected=shuffle(pool).slice(0,count);
      featured=sample(selected).key; featuredClaimed=false;
      deck=shuffle([...selected,...selected]).map((x,i)=>({...x,i,open:true,done:false}));
      first=-1;lock=true;moves=0;pairs=0;combo=0;misses=0;flash=1;previewing=true;
      draw(`FILM ROLL ${roll+1} — MEMORIZE THE DECK`);
      const t=setTimeout(()=>{deck.forEach(c=>c.open=false);previewing=false;lock=false;sfx('start');draw('Find the featured pair for a bonus.');},Math.max(320,previewBase-roll*160));
      timers.push(t);
    }

    function draw(message='Protect the combo and clear the roll.'){
      const count=deck.length/2;
      const feature=deck.find(c=>c.key===featured);
      panel.innerHTML=`${hud('POLAROID PAIR',`ROLL ${roll+1}/${rollTotal} · ${pairs}/${count}`,level,`COMBO ×${combo}`)}<div class="memory-mission"><div><span class="eyebrow">PHOTO ROOM CONTRACT</span><b>${message}</b><small>Featured pair: ${feature?feature.name:'—'} · +8 bonus</small></div><div class="memory-tools"><span>${misses} misses</span><button class="mini-action" onclick="window.PV.memoryFlash()" ${previewing||lock||flash<=0||first>=0?'disabled':''}>FLASH ${flash?'×1':'USED'} −6</button></div></div><div class="memory-board">${deck.map(c=>`<button class="memory-tile ${c.open||c.done?'is-open':''} ${c.done?'is-done':''} ${c.key===featured&&c.done?'featured-done':''}" onclick="window.PV.flip(${c.i})" ${c.done||previewing?'disabled':''}><span class="memory-back"><i>PV</i><small>${String(c.i+1).padStart(2,'0')}</small></span><span class="memory-face photo-shell">${photoImg(c.photo,c.name,'',`style="object-position:${c.pos}"`)}<b>${c.name}</b>${c.key===featured?'<em>FEATURE</em>':''}</span></button>`).join('')}</div>`;
    }

    function completeRoll(){
      const count=deck.length/2;
      bestRunCombo=Math.max(bestRunCombo,combo);
      let rollScore=100-Math.max(0,moves-count)*5-misses*3+(featuredClaimed?8:0)-((1-flash)*6)+Math.min(8,bestRunCombo*2);
      rollScore=clamp(Math.round(rollScore),20,100);
      totalScore+=rollScore;totalMoves+=moves;totalMisses+=misses;totalFlash+=(1-flash);
      if(roll+1>=rollTotal){
        return setTimeout(()=>finish('polaroid-pair',Math.round(totalScore/rollTotal),`${rollTotal} film rolls cleared · ${totalMoves} moves · ${totalMisses} misses · best combo ×${bestRunCombo}${totalFlash?` · ${totalFlash} flash assist${totalFlash===1?'':'s'}`:''}.`),450);
      }
      roll++;
      panel.innerHTML=`${hud('POLAROID PAIR',`ROLL ${roll}/${rollTotal} CLEARED`,level,`SCORE ${rollScore}`)}<div class="memory-roll-clear"><span>FILM SAVED</span><b>${rollScore}</b><p>Reloading the photo deck with a tighter preview window.</p></div>`;
      timers.push(setTimeout(setupRoll,900));
    }

    window.PV.memoryFlash=()=>{
      if(previewing||lock||flash<=0||first>=0)return;
      flash=0;lock=true;sfx('cue',760);vibrate(10);
      deck.forEach(c=>{if(!c.done)c.open=true;});draw('FLASH ASSIST — memorize quickly.');
      timers.push(setTimeout(()=>{deck.forEach(c=>{if(!c.done)c.open=false;});lock=false;draw('Flash used. Finish the roll.');},650));
    };

    window.PV.flip=(i)=>{
      if(lock||previewing||deck[i].open||deck[i].done)return;
      sfx('flip');deck[i].open=true;
      if(first<0){first=i;draw();return;}
      moves++;
      if(deck[first].key===deck[i].key){
        const matchedKey=deck[i].key;
        deck[first].done=deck[i].done=true;pairs++;combo++;bestRunCombo=Math.max(bestRunCombo,combo);first=-1;
        if(matchedKey===featured&&!featuredClaimed){featuredClaimed=true;sfx('perfect');}else sfx('match');
        vibrate(12);draw(matchedKey===featured?'Featured pair secured!':'Pair locked. Keep the combo alive.');
        if(pairs===deck.length/2)timers.push(setTimeout(completeRoll,360));
      }else{
        combo=0;misses++;lock=true;sfx('miss');draw('Mismatch — the combo dropped.');
        const a=first;
        timers.push(setTimeout(()=>{deck[a].open=false;deck[i].open=false;first=-1;lock=false;draw();},level==='hard'?480:690));
      }
    };
    setupRoll();
  }

  function lightstickWave(level){
    const panel=document.getElementById('playboard');
    const track=youtubeTracks[selectedYouTubeTrack]||youtubeTracks.hylt;
    const targetHits=level==='easy'?10:level==='medium'?12:15;
    const waveBeats=level==='easy'?4:level==='medium'?3:2.5;
    const hitWindow=level==='easy'?.38:level==='medium'?.31:.25;
    let hits=0,total=0,combo=0,bestCombo=0,started=false,ended=false,playerReady=false,raf=0,startFallbackTimer=0,lastCycleHit=-999;

    cleanup=()=>{
      cancelAnimationFrame(raf);clearTimeout(startFallbackTimer);
      try{activeYouTubePlayer?.stopVideo?.();activeYouTubePlayer?.destroy?.();}catch{}
      activeYouTubePlayer=null;
    };

    function drawShell(){
      panel.innerHTML=`${hud('LIGHTSTICK WAVE',track.title.toUpperCase(),level,'SLOWER WAVE')}<div class="music-wave-shell" id="waveShell"><div class="wave-game"><div class="wave-music-head"><span class="eyebrow">MUSIC WAVE</span><b>${track.title}</b><small id="waveStatus">Follow the heart across the lane. Tap once when it reaches the center pulse.</small></div><div class="wave-stage wave-stage-music"><div class="wave-copy"><span>FOLLOW THE WAVE</span><b id="waveFeedback">READY</b></div><div class="wave-track"><div class="wave-zone wave-center-zone"><i></i></div><div class="wave-marker" id="waveMarker">♥</div></div><div class="wave-grade"><span>WAIT</span><span>GOOD</span><b>PERFECT</b><span>GOOD</span><span>WAIT</span></div><button class="wave-hit" id="waveHit" disabled>TAP TO START MUSIC</button><div class="wave-live-stats"><span><small>HITS</small><b id="waveHits">0/${targetHits}</b></span><span><small>COMBO</small><b id="waveCombo">0</b></span><span><small>AVG</small><b id="waveAvg">0</b></span></div></div></div><div class="wave-video-card"><div class="yt-player-frame wave-player-frame"><div id="wave-player" class="yt-player"><div class="yt-placeholder"><b>▶</b><span>Loading YouTube…</span></div></div></div><div class="yt-meta"><span>OFFICIAL VIDEO</span><b>${track.title}</b><small>${waveBeats} beats per wave · one hit per pass</small></div></div></div>`;
      document.getElementById('waveHit')?.addEventListener('pointerdown',onHit,{passive:false});
    }

    async function boot(){
      drawShell();
      try{
        const YT=await loadYouTubeAPI();
        await new Promise((resolve,reject)=>{
          const timer=setTimeout(()=>reject(new Error('wave player timeout')),10000);
          const vars={playsinline:1,controls:1,rel:0,fs:0,enablejsapi:1,start:track.start};
          if(/^https?:$/.test(location.protocol))vars.origin=location.origin;
          const player=new YT.Player('wave-player',{
            width:'100%',height:'100%',videoId:track.videoId,playerVars:vars,
            events:{
              onReady:()=>{
                clearTimeout(timer);activeYouTubePlayer=player;playerReady=true;
                try{player.cueVideoById?.({videoId:track.videoId,startSeconds:track.start});}catch{}
                syncYouTubeSound();
                const btn=document.getElementById('waveHit');if(btn){btn.disabled=false;btn.textContent='PLAY MUSIC + START';}
                document.querySelector('#wave-player .yt-placeholder')?.remove();
                resolve();
              },
              onStateChange:e=>{
                if(e.data===YT.PlayerState.PLAYING&&!started)begin();
                if(e.data===YT.PlayerState.ENDED&&!ended)finishRun();
              },
              onAutoplayBlocked:()=>autoplayBlocked(),
              onError:e=>reject(new Error(`YouTube error ${e.data}`))
            }
          });
        });
      }catch(err){
        console.warn(err);
        const status=document.getElementById('waveStatus');if(status)status.textContent='YouTube could not load here. Try serving the folder over HTTP.';
        const btn=document.getElementById('waveHit');if(btn){btn.disabled=true;btn.textContent='PLAYER UNAVAILABLE';}
      }
    }

    function autoplayBlocked(){
      clearTimeout(startFallbackTimer);
      const status=document.getElementById('waveStatus');if(status)status.textContent='Your browser blocked scripted playback. Tap ▶ on the video once; the wave starts automatically.';
      const btn=document.getElementById('waveHit');if(btn){btn.disabled=false;btn.textContent='TRY MUSIC AGAIN';}
      document.getElementById('waveShell')?.classList.add('needs-tap');
    }

    function requestMusic(){
      if(!playerReady||!activeYouTubePlayer)return;
      const btn=document.getElementById('waveHit');if(btn){btn.disabled=true;btn.textContent='STARTING MUSIC…';}
      const status=document.getElementById('waveStatus');if(status)status.textContent='Waiting for YouTube playback…';
      try{
        if(state.sound!==false){activeYouTubePlayer.unMute?.();activeYouTubePlayer.setVolume?.(100);}else activeYouTubePlayer.mute?.();
        activeYouTubePlayer.loadVideoById?.({videoId:track.videoId,startSeconds:track.start,suggestedQuality:'default'});
        activeYouTubePlayer.playVideo?.();
      }catch{}
      startFallbackTimer=setTimeout(()=>{
        if(started)return;
        if(Number(activeYouTubePlayer?.getPlayerState?.())===1)begin();else autoplayBlocked();
      },1600);
    }

    function begin(){
      if(started||ended)return;
      clearTimeout(startFallbackTimer);started=true;
      document.getElementById('waveShell')?.classList.add('is-playing');
      const btn=document.getElementById('waveHit');if(btn){btn.disabled=false;btn.textContent='HIT AT CENTER';}
      const status=document.getElementById('waveStatus');if(status)status.textContent=`Music live · the heart now takes ${waveBeats} beats to cross the lane.`;
      sfx('start');
      raf=requestAnimationFrame(loop);
    }

    function onHit(e){
      e?.preventDefault?.();
      if(!started){requestMusic();return;}
      if(ended||!activeYouTubePlayer)return;
      const t=Number(activeYouTubePlayer.getCurrentTime?.()||0);
      const wavePos=beatPosition(track,t)/waveBeats;
      const cycle=Math.floor(wavePos);
      if(cycle===lastCycleHit){
        const f=document.getElementById('waveFeedback');if(f){f.textContent='WAIT';f.className='wave-judgement';}
        const status=document.getElementById('waveStatus');if(status)status.textContent='One tap per pass — follow the next heart crossing.';
        return;
      }
      const phase=((wavePos%1)+1)%1;
      const err=Math.abs(phase-.5)*(beatSeconds(track)*waveBeats);
      let accuracy=0,label='MISS';
      if(err<=hitWindow*.34){accuracy=100;label='PERFECT';}
      else if(err<=hitWindow){accuracy=72+28*(1-err/hitWindow);label='GOOD';}
      else{accuracy=Math.max(0,48-(err-hitWindow)*95);label=accuracy>25?'EARLY / LATE':'MISS';}
      lastCycleHit=cycle;
      if(accuracy>=65){combo++;bestCombo=Math.max(bestCombo,combo);}else combo=0;
      total+=accuracy;hits++;
      if(label==='PERFECT'){sfx('perfect');vibrate(18);}else if(accuracy>=65)sfx('good');else sfx('miss');
      const f=document.getElementById('waveFeedback');if(f){f.textContent=label;f.className=`wave-judgement grade-${slug(label)}`;setTimeout(()=>{if(f)f.className='wave-judgement';},320);}
      const stage=document.querySelector('.wave-stage-music');if(stage){stage.classList.remove('judge-perfect','judge-good','judge-miss');stage.classList.add(label==='PERFECT'?'judge-perfect':accuracy>=65?'judge-good':'judge-miss');setTimeout(()=>stage?.classList.remove('judge-perfect','judge-good','judge-miss'),280);}
      const hs=document.getElementById('waveHits');if(hs)hs.textContent=`${hits}/${targetHits}`;
      const cs=document.getElementById('waveCombo');if(cs)cs.textContent=String(combo);
      const av=document.getElementById('waveAvg');if(av)av.textContent=String(Math.round(total/Math.max(1,hits)));
      const meta=document.querySelector('.hud-meta');if(meta)meta.textContent=`COMBO ×${combo}`;
      if(combo>0&&combo%5===0){const status=document.getElementById('waveStatus');if(status)status.textContent=`COMBO ×${combo} — nice timing. Follow the next pass.`;sfx('heart');}
      if(hits>=targetHits)finishRun();
    }

    function loop(){
      if(!started||ended||!activeYouTubePlayer)return;
      const t=Number(activeYouTubePlayer.getCurrentTime?.()||0);
      const wavePos=beatPosition(track,t)/waveBeats;
      const phase=((wavePos%1)+1)%1;
      const markerPos=8+phase*84;
      const marker=document.getElementById('waveMarker');if(marker)marker.style.left=`calc(${markerPos}% - 22px)`;
      const zone=document.querySelector('.wave-center-zone');if(zone)zone.classList.toggle('is-near',Math.abs(phase-.5)<.12);
      raf=requestAnimationFrame(loop);
    }

    function finishRun(){
      if(ended)return;ended=true;cancelAnimationFrame(raf);
      try{activeYouTubePlayer?.pauseVideo?.();}catch{}
      const score=hits?Math.round(total/hits):0;
      finish('lightstick-wave',score,`${track.title} · ${hits} wave hits · best combo ×${bestCombo}.`);
    }

    boot();
  }

  function pinkTiles(level){
    const panel=document.getElementById('playboard');
    const track=youtubeTracks[selectedYouTubeTrack]||youtubeTracks.hylt;
    const lead=level==='easy'?1.36:level==='medium'?1.15:.96;
    const hitWindow=level==='easy'?.29:level==='medium'?.23:.18;
    const pattern=[0,1,2,3,1,0,2,1,3,2,0,3,1,2,3,0,0,2,1,3];
    const beat=beatSeconds(track);
    const subdivision=level==='hard'?2:1;
    const stride=level==='easy'?2:1;
    let syncNudge=0;
    let notes=[];
    let raf=0,started=false,ended=false,armed=false,playerReady=false;
    let score=0,combo=0,bestCombo=0,hits=0,misses=0,perfects=0;
    let videoDuration=0,startFallbackTimer=0,lastPlayerState=-1,sourceOpen=false;

    const keyHandler=e=>{
      if(!started||ended||/INPUT|TEXTAREA|SELECT/.test(e.target?.tagName||''))return;
      const map={d:0,f:1,j:2,k:3,'1':0,'2':1,'3':2,'4':3};
      const lane=map[e.key.toLowerCase()];
      if(lane!==undefined){e.preventDefault();tapLane(lane);}
    };
    document.addEventListener('keydown',keyHandler);
    cleanup=()=>{
      cancelAnimationFrame(raf);
      clearTimeout(startFallbackTimer);
      document.removeEventListener('keydown',keyHandler);
      document.querySelector('.game-pink-tiles')?.classList.remove('tiles-running');
      try{activeYouTubePlayer?.stopVideo?.();activeYouTubePlayer?.destroy?.();}catch{}
      activeYouTubePlayer=null;
    };

    function makeNotes(duration){
      const firstPlayable=Math.max(2.4,track.start+2.4);
      const lastPlayable=Math.max(firstPlayable,duration-2.2);
      const firstBeat=Math.max(0,Math.ceil((firstPlayable-track.beatOffset)/beat));
      const lastBeat=Math.floor((lastPlayable-track.beatOffset)/beat);
      notes=[];
      let chartIndex=0;
      for(let b=firstBeat;b<=lastBeat;b+=stride){
        const base=syncedBeatTime(track,b,syncNudge);
        const downbeat=(b%track.meter)===0;
        notes.push({lane:pattern[(chartIndex*3+(b%7))%pattern.length],time:base,hit:false,miss:false,removed:false,grade:'',downbeat});
        chartIndex++;
        if(subdivision===2 && b<lastBeat && (b%2===1 || downbeat)){
          const half=base+beat/2;
          if(half<lastPlayable){
            notes.push({lane:pattern[(chartIndex*5+b)%pattern.length],time:half,hit:false,miss:false,removed:false,grade:'',downbeat:false,pickup:true});
            chartIndex++;
          }
        }
      }
      notes.sort((a,b)=>a.time-b.time);
    }

    function formatClock(seconds){
      const s=Math.max(0,Math.floor(Number(seconds)||0));
      return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
    }

    function renderSetup(){
      panel.innerHTML=`${hud('PINK TILES',track.title.toUpperCase(),level,'MUSIC READY')}<div class="yt-game-shell tiles-priority" id="tilesShell"><div class="tiles-live pregame" id="tilesLive"><div class="tiles-board" id="tilesBoard"><div class="tiles-ready tiles-start-overlay" id="tilesReady"><span class="eyebrow">LIVE RHYTHM · ${track.bpm} BPM</span><b>${track.title}</b><small id="tilesStartMessage">Tap start. The video stays hidden while you play.</small><button class="cta tiles-start-btn" id="tilesStart" disabled>LOADING…</button></div><div class="tiles-scorebar tiles-score-overlay"><span><small>SCORE</small><b id="tilesScore">0</b></span><span><small>COMBO</small><b id="tilesCombo">0</b></span><span><small>PERFECT</small><b id="tilesPerfect">0</b></span><span><small>MISS</small><b id="tilesMiss">0</b></span></div><div class="tiles-progress tiles-progress-overlay"><span id="tilesTime">00:00</span><i><b id="tilesProgressBar"></b></i><span id="tilesEndTime">--:--</span></div><div class="tiles-lane-glow g0"></div><div class="tiles-lane-glow g1"></div><div class="tiles-lane-glow g2"></div><div class="tiles-lane-glow g3"></div><div class="tiles-hitline"><span>HIT NOW</span></div>${[0,1,2,3].map(l=>`<button class="tiles-lane" data-lane="${l}" aria-label="Hit lane ${l+1}"><span><i>LANE ${l+1}</i><b>${['D','F','J','K'][l]}</b><em>TAP</em></span></button>`).join('')}<div id="tilesNotes"></div><div class="tiles-feedback tiles-feedback-overlay" id="tilesFeedback">WAITING FOR MUSIC</div></div><div class="tiles-sync"><span>SYNC</span><button type="button" id="syncMinus">−50ms</button><b id="syncReadout">0ms</b><button type="button" id="syncPlus">+50ms</button></div></div><div class="tiles-source-row"><button type="button" class="tiles-source-toggle" id="tilesSourceToggle">SHOW MUSIC SOURCE</button><span>Official YouTube source · hidden during gameplay</span></div><div class="yt-deck tiles-video-deck source-collapsed" id="tilesVideoDeck"><div class="yt-player-frame"><div id="yt-player" class="yt-player"><div class="yt-placeholder"><b>▶</b><span>Loading YouTube player…</span></div></div></div><div class="yt-meta"><span>NOW PLAYING</span><b>${track.title}</b><small id="tilesDurationLabel">Loading duration…</small><em class="tiles-source-note">Music source</em></div></div></div>`;
      const startBtn=document.getElementById('tilesStart');
      startBtn?.addEventListener('pointerup',startRun,{passive:false});
      document.getElementById('syncMinus')?.addEventListener('click',()=>adjustSync(-.05));
      document.getElementById('syncPlus')?.addEventListener('click',()=>adjustSync(.05));
      document.getElementById('tilesSourceToggle')?.addEventListener('click',()=>toggleSource());
      toggleSource(false);
    }

    function toggleSource(force){
      sourceOpen=typeof force==='boolean'?force:!sourceOpen;
      const deck=document.getElementById('tilesVideoDeck');
      const btn=document.getElementById('tilesSourceToggle');
      deck?.classList.toggle('source-open',sourceOpen);
      deck?.classList.toggle('source-collapsed',!sourceOpen);
      if(btn)btn.textContent=sourceOpen?'HIDE MUSIC SOURCE':'SHOW MUSIC SOURCE';
    }

    function mountNotes(){
      const host=document.getElementById('tilesNotes');
      if(!host)return;
      host.innerHTML=notes.map((n,i)=>`<i class="fall-tile lane-${n.lane} ${n.downbeat?'downbeat':''} ${n.pickup?'pickup':''}" id="tile-${i}"><span></span></i>`).join('');
      document.querySelectorAll('.tiles-lane').forEach(btn=>btn.addEventListener('pointerdown',e=>{
        e.preventDefault();
        tapLane(Number(btn.dataset.lane));
      },{passive:false}));
      const end=document.getElementById('tilesEndTime');
      if(end)end.textContent=formatClock(videoDuration);
    }

    function adjustSync(delta){
      const next=clamp(syncNudge+delta,-.30,.30);
      const applied=next-syncNudge;
      syncNudge=next;
      const read=document.getElementById('syncReadout');
      if(read)read.textContent=`SYNC ${syncNudge>=0?'+':''}${Math.round(syncNudge*1000)}ms`;
      if(started){notes.forEach(n=>{if(!n.hit&&!n.miss)n.time+=applied;});}
      else if(videoDuration)makeNotes(videoDuration);
      sfx('tap');
    }

    async function createPlayer(targetId='yt-player'){
      try{
        const YT=await loadYouTubeAPI();
        return await new Promise((resolve,reject)=>{
          const timer=setTimeout(()=>reject(new Error('player timeout')),10000);
          const playerVars={playsinline:1,controls:1,rel:0,fs:0,enablejsapi:1,start:track.start};
          if(/^https?:$/.test(location.protocol))playerVars.origin=location.origin;
          const player=new YT.Player(targetId,{
            width:'100%',height:'100%',videoId:track.videoId,playerVars,
            events:{
              onReady:()=>{
                clearTimeout(timer);
                activeYouTubePlayer=player;
                try{
                  const iframe=player.getIframe?.();
                  iframe?.setAttribute('allow','autoplay; encrypted-media; picture-in-picture');
                  iframe?.setAttribute('playsinline','');
                  player.cueVideoById?.({videoId:track.videoId,startSeconds:track.start});
                }catch{}
                videoDuration=Number(player.getDuration?.()||0);
                syncYouTubeSound();
                resolve(player);
              },
              onStateChange:e=>{
                lastPlayerState=e.data;
                if(e.data===YT.PlayerState.PLAYING&&armed&&!started)beginGameplay();
              },
              onAutoplayBlocked:()=>showAutoplayBlocked(),
              onError:e=>{clearTimeout(timer);reject(new Error(`YouTube error ${e.data}`));}
            }
          });
        });
      }catch(err){
        console.warn(err);
        return null;
      }
    }

    async function boot(){
      renderSetup();
      const player=await createPlayer('yt-player');
      if(!player){
        const ready=document.getElementById('tilesReady');
        if(ready)ready.innerHTML=`<span class="eyebrow">PLAYER UNAVAILABLE</span><h2>YouTube could not load here.</h2><p>Serve the folder over HTTP and make sure YouTube embeds are allowed on your network.</p><button class="ghost-cta" onclick="window.PV.goHome()">BACK TO DECK</button>`;
        return;
      }
      if(!videoDuration){
        await new Promise(r=>setTimeout(r,300));
        videoDuration=Number(player.getDuration?.()||0);
      }
      if(!videoDuration)videoDuration=210;
      makeNotes(videoDuration);
      playerReady=true;
      const btn=document.getElementById('tilesStart');
      if(btn){btn.disabled=false;btn.textContent='PLAY MUSIC + START';}
      const dur=document.getElementById('tilesDurationLabel');
      if(dur)dur.textContent=`${formatClock(videoDuration)} · full M/V`;
      document.querySelector('.yt-placeholder')?.remove();
    }

    function showAutoplayBlocked(){
      if(started||ended||!armed)return;
      clearTimeout(startFallbackTimer);
      const shell=document.getElementById('tilesShell');
      const btn=document.getElementById('tilesStart');
      const msg=document.getElementById('tilesStartMessage');
      shell?.classList.add('needs-tap');
      toggleSource(true);
      if(btn){btn.disabled=false;btn.textContent='TRY START AGAIN';}
      if(msg)msg.innerHTML='<b>Playback needs one native YouTube tap.</b> The Music Source has been opened below. Tap ▶ once, then return to the lanes.';
      setTimeout(()=>document.getElementById('tilesVideoDeck')?.scrollIntoView({block:'center',behavior:'smooth'}),80);
    }

    function startRun(e){
      e?.preventDefault?.();
      if(!activeYouTubePlayer||started||!playerReady)return;
      ensureAudio();
      armed=true;
      clearTimeout(startFallbackTimer);
      const shell=document.getElementById('tilesShell');
      const btn=document.getElementById('tilesStart');
      const msg=document.getElementById('tilesStartMessage');
      shell?.classList.remove('needs-tap');
      toggleSource(false);
      if(btn){btn.disabled=true;btn.textContent='STARTING MUSIC…';}
      if(msg)msg.textContent='Starting the M/V… gameplay will unlock as soon as YouTube reports playback.';

      // Keep all playback calls inside the original user gesture. loadVideoById both
      // loads and starts playback, which is more reliable on mobile than seek + play.
      try{
        if(state.sound!==false){activeYouTubePlayer.setVolume?.(100);activeYouTubePlayer.unMute?.();}
        else activeYouTubePlayer.mute?.();
        activeYouTubePlayer.loadVideoById?.({videoId:track.videoId,startSeconds:track.start,suggestedQuality:'default'});
        activeYouTubePlayer.playVideo?.();
      }catch{}

      startFallbackTimer=setTimeout(()=>{
        if(started||ended)return;
        const stateNow=Number(activeYouTubePlayer?.getPlayerState?.());
        if(stateNow===1)return beginGameplay();
        showAutoplayBlocked();
      },1700);
    }

    function beginGameplay(){
      if(started||ended)return;
      clearTimeout(startFallbackTimer);
      started=true;
      const shell=document.getElementById('tilesShell');
      shell?.classList.remove('needs-tap');
      shell?.classList.add('is-playing');
      document.querySelector('.game-pink-tiles')?.classList.add('tiles-running');
      toggleSource(false);
      document.getElementById('tilesReady')?.classList.add('hidden');
      document.getElementById('tilesLive')?.classList.remove('pregame');
      document.querySelector('.tiles-board-idle')?.remove();
      mountNotes();
      sfx('start');
      requestAnimationFrame(loop);
    }

    function tapLane(lane){
      if(!started||ended||!activeYouTubePlayer)return;
      const now=Number(activeYouTubePlayer.getCurrentTime?.()||0);
      const candidates=notes.map((n,i)=>({n,i,d:Math.abs(n.time-now)})).filter(x=>x.n.lane===lane&&!x.n.hit&&!x.n.miss&&x.d<=hitWindow).sort((a,b)=>a.d-b.d);
      const laneEl=document.querySelector(`.tiles-lane[data-lane="${lane}"]`);
      laneEl?.classList.add('pressed');
      setTimeout(()=>laneEl?.classList.remove('pressed'),105);
      if(!candidates.length){
        combo=0;score=Math.max(0,score-8);misses++;sfx('miss');feedback('MISS','bad');updateStats();return;
      }
      const {n,i,d}=candidates[0];
      n.hit=true;hits++;combo++;bestCombo=Math.max(bestCombo,combo);
      const perfect=d<=hitWindow*.42;
      if(perfect)perfects++;
      n.grade=perfect?'perfect':'good';
      score+=perfect?100+combo*3:68+combo*2;
      const el=document.getElementById(`tile-${i}`);if(el)el.classList.add('hit',n.grade);
      sfx(perfect?'perfect':'good');vibrate(perfect?12:7);feedback(perfect?'PERFECT':'GOOD',perfect?'perfect':'good');updateStats();
    }

    function feedback(text,kind){
      const el=document.getElementById('tilesFeedback');
      if(!el)return;
      el.textContent=text;
      el.className=`tiles-feedback ${kind}`;
    }

    function updateStats(){
      const fields={tilesScore:score,tilesCombo:combo,tilesPerfect:perfects,tilesMiss:misses};
      Object.entries(fields).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.textContent=String(val);});
      const meta=document.querySelector('.hud-meta');if(meta)meta.textContent=`COMBO ×${combo}`;
    }

    function loop(){
      if(!started||ended||!activeYouTubePlayer)return;
      const stateNow=Number(activeYouTubePlayer.getPlayerState?.());
      const now=Number(activeYouTubePlayer.getCurrentTime?.()||track.start);
      const timeEl=document.getElementById('tilesTime');if(timeEl)timeEl.textContent=formatClock(now);
      const progress=document.getElementById('tilesProgressBar');if(progress)progress.style.width=`${clamp(videoDuration?now/videoDuration*100:0,0,100)}%`;

      let statsDirty=false;
      notes.forEach((n,i)=>{
        if(n.removed)return;
        const el=document.getElementById(`tile-${i}`);if(!el){n.removed=true;return;}
        const delta=n.time-now;
        if(!n.hit&&!n.miss&&delta < -hitWindow){
          n.miss=true;misses++;combo=0;el.classList.add('miss');statsDirty=true;
        }
        if(n.hit||n.miss){
          /* v52: physically remove judged notes. Older CSS used !important opacity
             on hit/miss states, which could leave expired notes stacked at the hit line. */
          if(delta<-.20){n.removed=true;el.remove();}
          return;
        }
        if(delta>lead||delta<-.42){el.style.opacity='0';return;}
        const hitY=70,spawnY=-14,afterY=110;
        const y=delta>=0?hitY-(delta/lead)*(hitY-spawnY):hitY+((-delta)/.42)*(afterY-hitY);
        el.style.opacity='1';
        el.style.top=`${y}%`;
        el.style.transform='translateY(-50%)';
      });
      if(statsDirty)updateStats();

      if(stateNow===0||now>=videoDuration-.15){
        ended=true;
        const accuracy=hits+misses?hits/(hits+misses):0;
        const maxApprox=Math.max(1,notes.length*115);
        const finalScore=clamp(Math.round((score/maxApprox)*76+accuracy*24),0,100);
        return setTimeout(()=>finish('pink-tiles',finalScore,`${track.title} · ${hits} hits · ${perfects} perfect · ${misses} misses · best combo ×${bestCombo}.`),300);
      }

      // The chart follows the video's playback clock. If the user pauses the M/V,
      // the notes freeze instead of drifting out of sync.
      raf=requestAnimationFrame(loop);
    }

    boot();
  }


  function beatSwitch(level){
    const panel=document.getElementById('playboard');
    const track=youtubeTracks[selectedYouTubeTrack]||youtubeTracks.hylt;
    const goal=level==='easy'?12:level==='medium'?16:20;
    const beatsPerCall=level==='easy'?4:level==='medium'?3:2;
    const windowSec=level==='easy'?.40:level==='medium'?.32:.25;
    const dirs=[['↑','UP'],['→','RIGHT'],['↓','DOWN'],['←','LEFT']];
    let started=false,ended=false,ready=false,raf=0,index=0,scoreSum=0,combo=0,best=0,startFallbackTimer=0,currentDir=0,currentCall=-1,callHit=false,lastBeat=-999;
    cleanup=()=>{cancelAnimationFrame(raf);clearTimeout(startFallbackTimer);try{activeYouTubePlayer?.stopVideo?.();activeYouTubePlayer?.destroy?.();}catch{}activeYouTubePlayer=null;};
    function draw(){
      panel.innerHTML=`${hud('BEAT SWITCH',track.title.toUpperCase(),level,'READ → COUNT → HIT')}<div class="switch-shell"><div class="switch-main"><div class="switch-call"><small>NEXT MOVE</small><b id="switchArrow">↑</b><span id="switchWord">UP</span><em id="switchCountdown">GET READY</em></div><div class="switch-pad">${dirs.map((d,i)=>`<button data-dir="${i}" disabled><b>${d[0]}</b><span>${d[1]}</span></button>`).join('')}</div><div class="switch-stats"><span><small>RUN</small><b id="switchRun">0/${goal}</b></span><span><small>COMBO</small><b id="switchCombo">0</b></span><span><small>AVG</small><b id="switchAvg">0</b></span></div><p id="switchStatus">Loading the music source…</p></div><div class="music-mini-video"><div class="yt-player-frame"><div id="switch-player" class="yt-player"><div class="yt-placeholder"><b>▶</b><span>Loading YouTube…</span></div></div></div><div class="yt-meta"><span>OFFICIAL VIDEO</span><b>${track.title}</b><small>${beatsPerCall} beats per direction call</small></div></div></div>`;
      document.querySelectorAll('.switch-pad button').forEach(b=>b.addEventListener('pointerdown',e=>tap(Number(b.dataset.dir),e),{passive:false}));
    }
    async function boot(){draw();try{const YT=await loadYouTubeAPI();await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('switch player timeout')),10000);const vars={playsinline:1,controls:1,rel:0,fs:0,enablejsapi:1};if(/^https?:$/.test(location.protocol))vars.origin=location.origin;const player=new YT.Player('switch-player',{width:'100%',height:'100%',videoId:track.videoId,playerVars:vars,events:{onReady:()=>{clearTimeout(timer);activeYouTubePlayer=player;ready=true;syncYouTubeSound();document.getElementById('switchStatus').textContent=`Each direction stays up for ${beatsPerCall} beats. Read it first, then tap when the countdown says GO.`;document.querySelectorAll('.switch-pad button').forEach(b=>b.disabled=false);resolve();},onStateChange:e=>{if(e.data===YT.PlayerState.PLAYING&&!started)begin();if(e.data===YT.PlayerState.ENDED&&!ended)finishRun();},onAutoplayBlocked:()=>blocked(),onError:()=>blocked()}});});}catch{blocked();}}
    function blocked(){const s=document.getElementById('switchStatus');if(s)s.textContent='Tap ▶ on the video once if your browser blocks playback.';document.querySelectorAll('.switch-pad button').forEach(b=>b.disabled=false);}
    function startMusic(){if(!ready)return;try{if(state.sound!==false){activeYouTubePlayer.unMute?.();activeYouTubePlayer.setVolume?.(100);}else activeYouTubePlayer.mute?.();activeYouTubePlayer.loadVideoById?.({videoId:track.videoId,startSeconds:0});activeYouTubePlayer.playVideo?.();}catch{}startFallbackTimer=setTimeout(()=>{if(!started)blocked();},1600);}
    function begin(){if(started)return;clearTimeout(startFallbackTimer);started=true;sfx('start');const s=document.getElementById('switchStatus');if(s)s.textContent='Music live · read the direction, count down, then hit it on GO.';raf=requestAnimationFrame(loop);}
    function setCall(callIndex){
      currentCall=callIndex;callHit=false;
      currentDir=(callIndex*3+Math.floor(callIndex/3)+1)%4;
      const arrow=document.getElementById('switchArrow');if(arrow)arrow.textContent=dirs[currentDir][0];
      const word=document.getElementById('switchWord');if(word)word.textContent=dirs[currentDir][1];
      const call=document.querySelector('.switch-call');if(call){call.classList.remove('pulse','go');void call.offsetWidth;call.classList.add('pulse');}
      document.querySelectorAll('.switch-pad button').forEach((b,i)=>b.classList.toggle('called',i===currentDir));
      sfx('cue',520);
    }
    function record(acc,label){
      if(callHit||ended)return;
      callHit=true;
      if(acc>=65){combo++;best=Math.max(best,combo);sfx(acc>94?'perfect':'good');vibrate(10);}else{combo=0;sfx('miss');}
      scoreSum+=acc;index++;
      const run=document.getElementById('switchRun');if(run)run.textContent=`${index}/${goal}`;
      const c=document.getElementById('switchCombo');if(c)c.textContent=String(combo);
      const avg=document.getElementById('switchAvg');if(avg)avg.textContent=String(Math.round(scoreSum/Math.max(1,index)));
      const status=document.getElementById('switchStatus');if(status)status.textContent=`${label} · ${dirs[currentDir][1]} call ${acc>=65?'locked':'missed'}.`;
      const call=document.querySelector('.switch-call');if(call){call.classList.remove('judge-good','judge-miss');call.classList.add(acc>=65?'judge-good':'judge-miss');setTimeout(()=>call?.classList.remove('judge-good','judge-miss'),300);}
      if(index>=goal)finishRun();
    }
    function tap(dir,e){
      e?.preventDefault?.();
      if(!started){startMusic();return;}
      if(ended||currentCall<0||callHit)return;
      const t=Number(activeYouTubePlayer?.getCurrentTime?.()||0);
      const pos=beatPosition(track,t);
      const targetBeat=currentCall*beatsPerCall+(beatsPerCall-1);
      const err=Math.abs(pos-targetBeat)*beatSeconds(track);
      if(err>windowSec){
        const status=document.getElementById('switchStatus');if(status)status.textContent=pos<targetBeat?'WAIT FOR GO — keep tracking the shown direction.':'That GO window passed — watch the next call.';
        sfx('tap');
        return;
      }
      let acc=0;
      if(dir===currentDir){if(err<=windowSec*.34)acc=100;else acc=72+28*(1-err/windowSec);}
      record(acc,dir===currentDir?(acc>94?'PERFECT':'GOOD'):'WRONG DIRECTION');
    }
    function loop(){
      if(!started||ended)return;
      const t=Number(activeYouTubePlayer?.getCurrentTime?.()||0);
      const pos=beatPosition(track,t);
      const beatIndex=Math.floor(pos);
      const callIndex=Math.floor(Math.max(0,beatIndex)/beatsPerCall);
      if(callIndex!==currentCall)setCall(callIndex);
      if(beatIndex!==lastBeat){lastBeat=beatIndex;const call=document.querySelector('.switch-call');if(call){call.classList.remove('beat');void call.offsetWidth;call.classList.add('beat');}}
      const within=Math.max(0,beatIndex-currentCall*beatsPerCall);
      const remain=Math.max(0,beatsPerCall-1-within);
      const countdown=document.getElementById('switchCountdown');
      if(countdown){countdown.textContent=remain===0?'GO!':`${remain} BEAT${remain===1?'':'S'}`;countdown.classList.toggle('go',remain===0&&!callHit);}
      document.querySelector('.switch-call')?.classList.toggle('go',remain===0&&!callHit);
      raf=requestAnimationFrame(loop);
    }
    function finishRun(){if(ended)return;ended=true;cancelAnimationFrame(raf);try{activeYouTubePlayer?.pauseVideo?.();}catch{}finish('beat-switch',index?Math.round(scoreSum/index):0,`${track.title} · ${index} direction calls · best combo ×${best}.`);}
    boot();
  }

  function pinkCipher(level){
    const panel=document.getElementById('playboard');
    const cases=[
      {id:'pass',file:'CASE 01',title:'The Missing Pass',brief:'A crew pass vanished ten minutes before soundcheck. Security recovered four member-signature tags, but their order was scrambled. Rebuild the sequence to open the service corridor.',success:'The corridor opens. Inside: a torn comms label marked ENCORE CHANNEL.'},
      {id:'comms',file:'CASE 02',title:'The Silent Comms',brief:'The encore channel has been muted by a second four-signature lock. The stage manager can only see which signatures are exact and which are in the wrong slot.',success:'Comms return for three seconds. A final message points to the lighting vault.'},
      {id:'vault',file:'CASE 03',title:'The Encore Vault',brief:'The lighting vault contains the missing encore key. One last member code protects it. Crack the order before the backup cue expires.',success:'Vault unlocked. The encore key is recovered and the stage lights come back online.'}
    ];
    const maxAttempts=level==='easy'?7:level==='medium'?6:5;
    const hintsPerCase=level==='easy'?2:level==='medium'?1:0;
    const codes={Jisoo:'JI',Jennie:'JE','Rosé':'RO',Lisa:'LI'};
    let caseIndex=0,phase='brief',secret=[],guess=[],attempts=[],hints=hintsPerCase,revealed=[],caseScores=[];

    function newCase(){
      secret=shuffle(members);guess=[];attempts=[];hints=hintsPerCase;revealed=[];phase='brief';draw();
    }
    function feedback(g){
      let exact=0;g.forEach((x,i)=>{if(secret[i]===x)exact++;});
      const misplaced=g.filter((x,i)=>secret.includes(x)&&secret[i]!==x).length;
      return {exact,misplaced};
    }
    function evidenceText(){
      if(!attempts.length)return 'No code tested yet. Exact means correct signature + correct slot. Misplaced means correct signature + wrong slot.';
      const best=attempts.reduce((a,b)=>(b.exact*4+b.misplaced)>(a.exact*4+a.misplaced)?b:a,attempts[0]);
      if(best.exact>=3)return 'The lock almost opened. One position is still wrong.';
      if(best.exact===2)return 'Half the sequence is fixed. Compare the misplaced signatures before your next attempt.';
      if(best.misplaced>=3)return 'You have almost all the right signatures, but the order is badly scrambled.';
      return 'The lock rejected the order. Use the last scan result to eliminate positions.';
    }
    function drawBrief(){
      const c=cases[caseIndex];
      panel.innerHTML=`${hud('PINK CIPHER',`${c.file} / 03`,level,'DETECTIVE MODE')}<div class="cipher-story"><div class="case-file"><div class="case-stamp">${c.file}</div><span>BACKSTAGE INCIDENT REPORT</span><h2>${c.title}</h2><p>${c.brief}</p><div class="case-team">${members.map(m=>`<div>${pixelAvatar(m,true)}<b>${m}</b></div>`).join('')}</div><button class="cta" onclick="window.PV.beginCipherCase()">OPEN EVIDENCE FILE</button></div><aside class="case-side"><span>OBJECTIVE</span><b>Recover the encore key</b><p>Solve all three member-signature locks. Every failed test consumes one scan.</p><i>${caseIndex+1}/3 CASES</i></aside></div>`;
    }
    function drawPlay(){
      const c=cases[caseIndex];
      panel.innerHTML=`${hud('PINK CIPHER',`${attempts.length}/${maxAttempts} SCANS`,level,hints?`${hints} DECRYPT${hints===1?'':'S'}`:'NO DECRYPTS')}<div class="cipher-mission"><section class="cipher-console"><div class="cipher-storyline"><span>${c.file} · ${c.title}</span><p>${evidenceText()}</p></div><div class="cipher-clues">${revealed.length?revealed.map(i=>`<span>DECRYPTED · SLOT ${i+1} = <b>${secret[i]}</b></span>`).join(''):'<span>Build a four-signature sequence, then scan it against the lock.</span>'}</div><div class="cipher-slots">${[0,1,2,3].map(i=>`<button onclick="window.PV.clearCipher(${i})" class="cipher-slot ${guess[i]?'filled':''}">${guess[i]?`${photoImg(guess[i],guess[i])}<span>${guess[i]}</span>`:`<b>0${i+1}</b>`}</button>`).join('')}</div><div class="cipher-palette">${members.map(m=>`<button onclick="window.PV.addCipher('${m}')" ${guess.includes(m)?'disabled':''}>${photoImg(m,'')}<span>${m}</span></button>`).join('')}</div><div class="cipher-actions"><button class="cta cipher-submit" onclick="window.PV.submitCipher()" ${guess.length<4?'disabled':''}>SCAN SEQUENCE</button>${hints?`<button class="ghost-cta hint-btn" onclick="window.PV.cipherHint()">DECRYPT SLOT −10</button>`:''}</div></section><aside class="evidence-log"><div class="evidence-head"><span>SCAN LOG</span><b>${attempts.length}/${maxAttempts}</b></div><div class="cipher-history">${attempts.length?attempts.slice().reverse().map((a,n)=>`<div><span>#${String(attempts.length-n).padStart(2,'0')} · ${a.guess.map(m=>codes[m]).join(' / ')}</span><b>${a.exact} EXACT</b><i>${a.misplaced} SHIFTED</i></div>`).join(''):'<div class="empty-log">No scans recorded.</div>'}</div><div class="evidence-legend"><span><i class="exact-dot"></i> exact slot</span><span><i class="shift-dot"></i> wrong slot</span></div></aside></div>`;
    }
    function drawCaseSolved(score){
      const c=cases[caseIndex];
      panel.innerHTML=`${hud('PINK CIPHER','CASE SOLVED',level,`${Math.round(score)} PTS`)}<div class="case-solved"><div class="case-solved-art">${pixelAvatar(members[caseIndex%members.length])}<span>ACCESS GRANTED</span></div><div><span>${c.file} CLOSED</span><h2>${c.title}</h2><p>${c.success}</p>${caseIndex<cases.length-1?`<button class="cta" onclick="window.PV.nextCipherCase()">CONTINUE TO ${cases[caseIndex+1].file}</button>`:`<button class="cta" onclick="window.PV.nextCipherCase()">RECOVER ENCORE KEY</button>`}</div></div>`;
    }
    function draw(){
      if(phase==='brief')drawBrief();
      else if(phase==='play')drawPlay();
    }
    window.PV.beginCipherCase=()=>{phase='play';sfx('start');draw();};
    window.PV.addCipher=m=>{if(phase==='play'&&guess.length<4&&!guess.includes(m)){guess.push(m);sfx('tap');draw();}};
    window.PV.clearCipher=i=>{if(phase==='play'&&guess[i]){guess.splice(i,1);sfx('tap');draw();}};
    window.PV.cipherHint=()=>{
      if(phase!=='play'||hints<=0)return;
      const choices=[0,1,2,3].filter(i=>!revealed.includes(i));if(!choices.length)return;
      revealed.push(sample(choices));hints--;sfx('heart');draw();
    };
    window.PV.submitCipher=()=>{
      if(phase!=='play'||guess.length<4)return;
      const fb=feedback(guess);attempts.push({guess:[...guess],...fb});
      if(fb.exact===4){
        sfx('win');
        const usedHints=hintsPerCase-hints;
        const score=clamp(100-(attempts.length-1)*(level==='hard'?12:9)-usedHints*10,35,100);
        caseScores.push(score);phase='solved';drawCaseSolved(score);return;
      }
      sfx(fb.exact>=2?'good':'miss');
      if(attempts.length>=maxAttempts){
        const partial=caseScores.length?Math.round(caseScores.reduce((a,b)=>a+b,0)/cases.length):18;
        return finish('pink-cipher',partial,`Case ${caseIndex+1} failed. The lock code was ${secret.join(' → ')}.`);
      }
      guess=[];draw();
    };
    window.PV.nextCipherCase=()=>{
      if(caseIndex<cases.length-1){caseIndex++;newCase();sfx('start');return;}
      const score=Math.round(caseScores.reduce((a,b)=>a+b,0)/caseScores.length);
      finish('pink-cipher',score,`Encore key recovered · all ${cases.length} backstage cases solved.`);
    };
    newCase();
  }

  function stageRoute(level){
    const panel=document.getElementById('playboard');
    const size=7,startCell=(size-1)*size,goal=size-1;
    const passCount=level==='easy'?2:3;
    const blockCount=level==='easy'?9:level==='medium'?12:14;
    const wardrobeRoomTotal=level==='hard'?2:1;
    const wardrobeLayouts=[
      ['#####','#.G.#','#.B.#','#.S.#','#####'],
      ['######','#.G.G#','#.B.B#','#..S.#','#....#','######'],
      ['#######','#.G.G.#','#.B.B.#','#..S..#','#.....#','#######'],
      ['#######','#.G.G.#','#.B.B.#','#..S..#','#..B..#','#..G..#','#######']
    ];
    let chosen=null,phase='select',generated=null,pos=startCell,moves=0,collected=0,budget=0,passes=new Set(),lastPose='idle';
    let routeScore=0,wardrobeRoom=0,wardrobeBoard=null,wardrobeMoves=0,wardrobePushes=0,wardrobeScoreTotal=0;

    function neigh(i){
      const r=Math.floor(i/size),c=i%size,out=[];
      if(r>0)out.push(i-size);if(r<size-1)out.push(i+size);if(c>0)out.push(i-1);if(c<size-1)out.push(i+1);return out;
    }
    function bfsDistance(a,b,blocked){
      const q=[[a,0]],seen=new Set([a]);
      while(q.length){const [cur,d]=q.shift();if(cur===b)return d;for(const n of neigh(cur)){if(!blocked.has(n)&&!seen.has(n)){seen.add(n);q.push([n,d+1]);}}}
      return Infinity;
    }
    function connectedCells(blocked){
      const q=[startCell],seen=new Set([startCell]);
      while(q.length){const cur=q.shift();for(const n of neigh(cur)){if(!blocked.has(n)&&!seen.has(n)){seen.add(n);q.push(n);}}}
      return [...seen];
    }
    function perms(arr){
      if(arr.length<=1)return [arr];
      return arr.flatMap((x,i)=>perms(arr.filter((_,j)=>j!==i)).map(rest=>[x,...rest]));
    }
    function minTour(blocked,items){
      let best=Infinity;
      for(const order of perms(items)){
        let total=0,cur=startCell,ok=true;
        for(const p of [...order,goal]){const d=bfsDistance(cur,p,blocked);if(!isFinite(d)){ok=false;break;}total+=d;cur=p;}
        if(ok)best=Math.min(best,total);
      }
      return best;
    }
    function makeBoard(){
      for(let tries=0;tries<300;tries++){
        const blocked=new Set();
        const candidates=shuffle(Array.from({length:size*size},(_,i)=>i).filter(i=>i!==startCell&&i!==goal));
        candidates.slice(0,blockCount).forEach(i=>blocked.add(i));
        const connected=connectedCells(blocked);
        if(!connected.includes(goal)||connected.length<size*size-blockCount-4)continue;
        const passPool=shuffle(connected.filter(i=>i!==startCell&&i!==goal&&bfsDistance(startCell,i,blocked)>2&&bfsDistance(i,goal,blocked)>2));
        const picked=passPool.slice(0,passCount);
        if(picked.length<passCount)continue;
        const tour=minTour(blocked,picked);
        if(isFinite(tour)&&tour<=31)return {blocked,picked,tour};
      }
      return {blocked:new Set([8,9,10,15,22,24,29,30,31,38]),picked:[35,18,12].slice(0,passCount),tour:24};
    }
    function memberFlavor(m){
      return {Jisoo:'Steady route · +2 step cushion',Jennie:'Fast call · +1 step cushion','Rosé':'Encore focus · bonus route score',Lisa:'Dance line · +2 step cushion'}[m];
    }
    function bonusSteps(){return chosen==='Jisoo'||chosen==='Lisa'?2:chosen==='Jennie'?1:0;}
    function drawSelect(){
      panel.innerHTML=`${hud('STAGE ROUTE','CHOOSE MEMBER',level,'2-PART PIXEL MISSION')}<div class="route-select"><div class="route-story"><span>BACKSTAGE RUN + DRESSING WING</span><h2>GET THE SHOW TO STAGE.</h2><p>First recover the missing access passes and reach the stage gate. Then continue straight into the dressing wing and park the encore wardrobe cases on their glowing marks.</p></div><div class="pixel-roster">${members.map(m=>`<button onclick="window.PV.chooseRouteMember('${m}')">${pixelAvatar(m)}<b>${m}</b><span>${memberFlavor(m)}</span></button>`).join('')}</div></div>`;
    }
    function tileLabel(i){
      if(i===goal)return collected===passCount?'DRESSING WING':'STAGE LOCKED';
      if(i===startCell)return 'START';
      return '';
    }
    function tileZone(i){const r=Math.floor(i/size);return r<=1?'zone-stage':r<=4?'zone-hall':'zone-prep';}
    function tileDecor(i){
      if(i===goal||i===startCell||passes.has(i)||pos===i||generated.blocked.has(i))return '';
      const code=(i*13+5)%29;
      if(code===0)return '<span class="route-prop speaker">♪</span>';
      if(code===4)return '<span class="route-prop rack">▥</span>';
      if(code===9)return '<span class="route-prop monitor">▣</span>';
      if(code===14)return '<span class="route-prop light">✦</span>';
      return '';
    }
    function drawRoute(message='Collect every access pass, then reach the dressing-wing gate.'){
      const blocked=generated.blocked;
      panel.innerHTML=`${hud('STAGE ROUTE',`${budget-moves} STEPS`,level,`${collected}/${passCount} PASSES`)}<div class="route-game"><div class="route-missionbar"><div>${pixelAvatar(chosen,true,lastPose)}<span><b>${chosen} · PART 1/2</b><small>${message}</small></span></div><div class="route-pass-wrap"><div class="route-pass-row">${Array.from({length:passCount},(_,i)=>`<i class="${i<collected?'got':''}">◆</i>`).join('')}</div><div class="route-budget"><i style="width:${clamp((budget-moves)/Math.max(1,budget)*100,0,100)}%"></i><span>${budget-moves} steps left</span></div></div></div><div class="route-map-frame"><div class="route-zone-labels"><span>STAGE WING</span><span>SERVICE HALL</span><span>PREP ROOMS</span></div><div class="route-map" style="--route-size:${size}">${Array.from({length:size*size},(_,i)=>{const classes=['route-tile',tileZone(i)];if(blocked.has(i))classes.push('wall');if(i===goal)classes.push('stage');if(i===startCell)classes.push('start');if(passes.has(i))classes.push('pass');if(i===pos)classes.push('hero');return `<div class="${classes.join(' ')}">${i===pos?pixelAvatar(chosen,true,lastPose):passes.has(i)?'<span class="pixel-pass">◆</span>':i===goal?'<span class="pixel-stage">▣</span>':tileDecor(i)}${tileLabel(i)?`<small>${tileLabel(i)}</small>`:''}</div>`;}).join('')}</div><div class="route-map-legend"><span><i class="legend-pass">◆</i> access pass</span><span><i class="legend-stage">▣</i> dressing wing</span><span><i class="legend-wall"></i> blocked</span></div></div><div class="route-controls"><div class="route-info"><span>PART 1 · ROUTE</span><b>${collected===passCount?'DRESSING WING UNLOCKED':'FIND THE PASSES'}</b><small>${moves} moves used · minimum route about ${generated.tour}</small></div><div class="route-pad route-pad-big"><button onclick="window.PV.routeMove(-${size})" aria-label="Move up">↑</button><button onclick="window.PV.routeMove(-1)" aria-label="Move left">←</button><button onclick="window.PV.routeMove(1)" aria-label="Move right">→</button><button onclick="window.PV.routeMove(${size})" aria-label="Move down">↓</button></div></div></div>`;
    }
    function parseWardrobe(rows){
      const h=rows.length,w=rows[0].length,walls=new Set(),goals=new Set(),boxes=new Set();let player=0;
      rows.forEach((row,y)=>[...row].forEach((ch,x)=>{const i=y*w+x;if(ch==='#')walls.add(i);if(ch==='G')goals.add(i);if(ch==='B')boxes.add(i);if(ch==='S')player=i;}));
      return {h,w,walls,goals,boxes,player,roomMoves:0,roomPushes:0};
    }
    function wardrobeSolved(){return [...wardrobeBoard.boxes].filter(i=>wardrobeBoard.goals.has(i)).length;}
    function wardrobeTileKind(i){if(wardrobeBoard.walls.has(i))return 'wall';if(wardrobeBoard.goals.has(i))return 'goal';return 'floor';}
    function setupWardrobe(){
      phase='wardrobe';
      const baseIndex=level==='easy'?0:level==='medium'?1:2;
      wardrobeBoard=parseWardrobe(wardrobeLayouts[Math.min(baseIndex+wardrobeRoom,wardrobeLayouts.length-1)]);
      lastPose='idle';
      drawWardrobe('Route cleared. Park every encore case on a glowing mark.');
    }
    function drawWardrobe(message='Park every encore case.'){
      const solved=wardrobeSolved();
      panel.innerHTML=`${hud('STAGE ROUTE',`PART 2/2 · ROOM ${wardrobeRoom+1}/${wardrobeRoomTotal}`,level,`${solved}/${wardrobeBoard.goals.size} CASES`)}<div class="wardrobe-shell route-wardrobe-merge"><div class="route-missionbar wardrobe-head"><div>${pixelAvatar(chosen,true,lastPose)}<span><b>${chosen} · DRESSING WING</b><small>${message}</small></span></div><div class="wardrobe-stats"><span>${wardrobeMoves} MOVES</span><span>${wardrobePushes} PUSHES</span></div></div><div class="wardrobe-progress"><i style="width:${clamp(solved/Math.max(1,wardrobeBoard.goals.size)*100,0,100)}%"></i><span>${solved} / ${wardrobeBoard.goals.size} parked</span></div><div class="wardrobe-board" style="--w:${wardrobeBoard.w};--h:${wardrobeBoard.h}">${Array.from({length:wardrobeBoard.w*wardrobeBoard.h},(_,i)=>{const cls=['wardrobe-tile',wardrobeTileKind(i)];if(wardrobeBoard.goals.has(i))cls.push('mark');if(wardrobeBoard.boxes.has(i))cls.push('box');if(wardrobeBoard.player===i)cls.push('hero');return `<div class="${cls.join(' ')}">${wardrobeBoard.player===i?pixelAvatar(chosen,true,lastPose):wardrobeBoard.boxes.has(i)?'<span class="wardrobe-box"></span>':''}${wardrobeBoard.goals.has(i)&&!wardrobeBoard.boxes.has(i)?'<span class="wardrobe-goal"></span>':''}</div>`;}).join('')}</div><div class="route-controls wardrobe-controls"><div class="route-info"><span>PART 2 · WARDROBE</span><b>${solved===wardrobeBoard.goals.size?'ROOM CLEARED':'PARK EVERY CASE'}</b><small>Push only. A case trapped in a corner cannot be pulled back.</small></div><div class="route-pad route-pad-big"><button onclick="window.PV.routeWardrobeMove(-${wardrobeBoard.w})" aria-label="Move up">↑</button><button onclick="window.PV.routeWardrobeMove(-1)" aria-label="Move left">←</button><button onclick="window.PV.routeWardrobeMove(1)" aria-label="Move right">→</button><button onclick="window.PV.routeWardrobeMove(${wardrobeBoard.w})" aria-label="Move down">↓</button></div></div></div>`;
    }
    function startMission(member){
      chosen=member;generated=makeBoard();passes=new Set(generated.picked);pos=startCell;moves=0;collected=0;lastPose='idle';routeScore=0;wardrobeRoom=0;wardrobeMoves=0;wardrobePushes=0;wardrobeScoreTotal=0;phase='route';
      budget=generated.tour+(level==='easy'?12:level==='medium'?8:5)+bonusSteps();sfx('start');drawRoute(`${chosen} is on the move. Find ${passCount} access passes.`);
    }
    function showRouteClear(){
      phase='route-clear';lastPose='win';
      panel.innerHTML=`${hud('STAGE ROUTE','PART 1 CLEARED',level,`ROUTE ${Math.round(routeScore)}`)}<div class="route-select route-merge-transition"><div class="route-story"><span>DRESSING WING UNLOCKED</span><h2>ONE MORE BACKSTAGE JOB.</h2><p>${chosen} reached the gate with every pass. The encore wardrobe cases are still blocking the prep room, so the mission continues before stage call.</p><button class="cta" onclick="window.PV.routeBeginWardrobe()">ENTER DRESSING WING →</button></div><div class="route-merge-hero">${pixelAvatar(chosen,false,'win')}<b>PART 2 / 2</b><span>PARK THE ENCORE CASES</span></div></div>`;
    }
    window.PV.chooseRouteMember=m=>{
      if(!members.includes(m))return;
      chosen=m;
      panel.innerHTML=`${hud('STAGE ROUTE','MISSION BRIEF',level,'2-PART PIXEL STORY')}${pixelCutscene({title:'THE ROUTE CONTINUES INTO WARDROBE',kicker:'BACKSTAGE STORY',member:m,lines:[`The security lock is open, but ${m} still has to cross the sealed service hall.`,`Recover every access pass and reach the dressing-wing gate before the route closes.`,`Then park the encore wardrobe cases on their glowing marks so the team can move into rehearsal.`],button:'START TWO-PART MISSION',action:'window.PV.beginRouteMission()'})}`;
      sfx('tap');
    };
    window.PV.beginRouteMission=()=>{if(chosen)startMission(chosen);};
    window.PV.routeBeginWardrobe=()=>{if(phase==='route-clear')setupWardrobe();};
    window.PV.routeMove=d=>{
      if(phase!=='route')return;
      const blocked=generated.blocked;
      const next=pos+d,row=Math.floor(pos/size),nextRow=Math.floor(next/size);
      if(next<0||next>=size*size||blocked.has(next)||((d===1||d===-1)&&row!==nextRow)){sfx('miss');vibrate(8);drawRoute('Blocked corridor — choose another direction.');return;}
      pos=next;moves++;lastPose=d===-size?'up':d===size?'down':d===-1?'left':'right';sfx('tap');
      let msg=`${chosen} moved deeper backstage.`;
      if(passes.has(pos)){passes.delete(pos);collected++;sfx('heart');vibrate(16);msg=`Access pass ${collected}/${passCount} secured!`;}
      if(pos===goal){
        if(collected<passCount){sfx('miss');msg=`Dressing-wing gate locked — ${passCount-collected} pass${passCount-collected===1?'':'es'} still missing.`;}
        else{
          const extra=Math.max(0,moves-generated.tour);
          const characterBonus=chosen==='Rosé'?4:0;
          routeScore=clamp(100-extra*3+(budget-moves)*.8+characterBonus,35,100);
          sfx('perfect');vibrate(18);return showRouteClear();
        }
      }
      if(moves>=budget)return finish('stage-route',Math.max(15,Math.round(collected/passCount*40)),`${chosen} recovered ${collected}/${passCount} passes before the service route closed.`);
      drawRoute(msg);
    };
    window.PV.routeWardrobeMove=delta=>{
      if(phase!=='wardrobe'||!wardrobeBoard)return;
      const b=wardrobeBoard,target=b.player+delta;
      const sameRow=Math.floor(target/b.w)===Math.floor(b.player/b.w);
      lastPose=delta===1?'right':delta===-1?'left':delta<0?'up':'down';
      if(target<0||target>=b.w*b.h||((delta===1||delta===-1)&&!sameRow)||b.walls.has(target)){sfx('miss');drawWardrobe('That clothing rack blocks the lane.');return;}
      if(b.boxes.has(target)){
        const beyond=target+delta;
        const beyondSameRow=Math.floor(beyond/b.w)===Math.floor(target/b.w);
        if(beyond<0||beyond>=b.w*b.h||((delta===1||delta===-1)&&!beyondSameRow)||b.walls.has(beyond)||b.boxes.has(beyond)){sfx('miss');drawWardrobe('No room to push that stage case.');return;}
        b.boxes.delete(target);b.boxes.add(beyond);b.player=target;b.roomMoves++;b.roomPushes++;wardrobeMoves++;wardrobePushes++;sfx('good');
      }else{b.player=target;b.roomMoves++;wardrobeMoves++;sfx('tap');}
      if([...b.boxes].every(i=>b.goals.has(i))){
        const roomScore=clamp(100-b.roomMoves*1.4-b.roomPushes*2.2,35,100);wardrobeScoreTotal+=roomScore;sfx('perfect');vibrate(16);
        if(wardrobeRoom+1>=wardrobeRoomTotal){
          const wardrobeScore=wardrobeScoreTotal/wardrobeRoomTotal;
          const finalScore=clamp(routeScore*.65+wardrobeScore*.35,0,100);
          return finish('stage-route',finalScore,`${chosen} cleared the service route and dressing wing · route ${Math.round(routeScore)} · wardrobe ${Math.round(wardrobeScore)} · ${wardrobeMoves} wardrobe moves.`);
        }
        wardrobeRoom++;return setTimeout(setupWardrobe,300);
      }
      drawWardrobe(wardrobeSolved()?`${wardrobeSolved()} case${wardrobeSolved()===1?'':'s'} locked in.`:'Keep the encore cases moving.');
    };
    drawSelect();
  }

  function fanlightGrid(level){
    const panel=document.getElementById('playboard');
    const waveTotal=3;
    const scanTotal=level==='easy'?3:level==='medium'?2:1;
    const undoTotal=level==='easy'?2:1;
    let scans=scanTotal,undos=undoTotal,wave=0,totalScore=0,totalMoves=0,totalResets=0,totalHints=0,totalUndos=0;
    let size=4,cells=16,seedCount=4,board=[],target=[],solutionSeeds=[],history=[],moves=0,resets=0,hintCell=-1;
    let timer=0;
    cleanup=()=>clearTimeout(timer);

    function affected(i){const r=Math.floor(i/size),c=i%size,out=[i];if(r>0)out.push(i-size);if(r<size-1)out.push(i+size);if(c>0)out.push(i-1);if(c<size-1)out.push(i+1);return out;}
    function apply(arr,i){affected(i).forEach(n=>arr[n]=!arr[n]);}
    function matches(){return board.every((v,i)=>v===target[i]);}
    function syncPct(){return Math.round(board.filter((v,i)=>v===target[i]).length/cells*100);}
    function setupWave(){
      size=level==='easy'?(wave===2?5:4):5;cells=size*size;
      seedCount=(level==='easy'?3:level==='medium'?5:6)+wave;
      board=Array(cells).fill(false);target=Array(cells).fill(false);history=[];moves=0;resets=0;hintCell=-1;
      solutionSeeds=shuffle(Array.from({length:cells},(_,i)=>i)).slice(0,Math.min(seedCount,cells));
      solutionSeeds.forEach(i=>apply(target,i));
      draw(`CROWD SECTION ${wave+1} ONLINE`);
    }
    function draw(message='Match the target crowd pattern.'){
      const sync=syncPct();
      panel.innerHTML=`${hud('FANLIGHT GRID',`WAVE ${wave+1}/${waveTotal} · ${moves} TAPS`,level,`${sync}% SYNC`)}<div class="fanlight-mission"><div><span class="eyebrow">CROWD CONTROL</span><b>${message}</b><small>Every tap flips a cross. Sync all three crowd sections.</small></div><div class="fanlight-tools"><button class="mini-action" onclick="window.PV.scanLights()" ${scans<=0?'disabled':''}>SCAN ${scans}</button><button class="mini-action" onclick="window.PV.undoLight()" ${undos<=0||!history.length?'disabled':''}>UNDO ${undos}</button></div></div><div class="fan-sync-meter"><i style="width:${sync}%"></i><span>${sync}% MATCH</span><b>${cells-board.filter((v,i)=>v===target[i]).length} LIGHTS OFF</b></div><div class="fanlight-layout"><div class="pattern-card"><span>TARGET CROWD</span><div class="mini-grid" style="--size:${size}">${target.map(v=>`<i class="${v?'on':''}"></i>`).join('')}</div><p>Scan highlights one useful control from the original solution. Undo reverses your last tap.</p><button class="mini-action" onclick="window.PV.resetLights()">RESET SECTION</button></div><div class="fan-grid" style="--size:${size}">${board.map((v,i)=>`<button class="${v?'on':''} ${hintCell===i?'hint':''}" onclick="window.PV.toggleLight(${i})" aria-label="Fanlight ${i+1}"><span></span></button>`).join('')}</div></div>`;
    }
    function completeWave(){
      const extra=Math.max(0,moves-seedCount);
      const waveScore=clamp(100-extra*4-resets*7,25,100);
      totalScore+=waveScore;totalMoves+=moves;totalResets+=resets;
      if(wave+1>=waveTotal)return timer=setTimeout(()=>finish('fanlight-grid',Math.round(totalScore/waveTotal)-totalHints*3-totalUndos*2,`${waveTotal} crowd sections synced · ${totalMoves} taps · ${totalHints} scans · ${totalUndos} undos.`),430);
      wave++;
      panel.innerHTML=`${hud('FANLIGHT GRID',`WAVE ${wave}/${waveTotal} SYNCED`,level,`${waveScore} PTS`)}<div class="fan-wave-clear"><span>CROWD SECTION LOCKED</span><b>${waveScore}</b><p>Opening the next lighting block.</p></div>`;
      timer=setTimeout(setupWave,850);
    }
    window.PV.toggleLight=i=>{
      const before=syncPct();hintCell=-1;apply(board,i);history.push(i);moves++;sfx('tap');
      if(matches()){sfx('win');vibrate(18);draw('FULL SYNC!');return completeWave();}
      const after=syncPct();draw(after>before?'Nice — sync improved.':after<before?'That moved the pattern away from target.':'Pattern shifted.');
      const grid=document.querySelector('.fan-grid');if(grid){grid.classList.add(after>before?'sync-better':'sync-worse');setTimeout(()=>grid?.classList.remove('sync-better','sync-worse'),220);}
    };
    window.PV.scanLights=()=>{
      if(scans<=0)return;scans--;totalHints++;
      const candidates=solutionSeeds.filter(i=>i!==hintCell);hintCell=sample(candidates.length?candidates:solutionSeeds);
      sfx('cue',720);draw('SCAN COMPLETE — highlighted control may help.');
    };
    window.PV.undoLight=()=>{
      if(undos<=0||!history.length)return;undos--;totalUndos++;const i=history.pop();apply(board,i);moves=Math.max(0,moves-1);hintCell=-1;sfx('tap');draw('Last control reversed.');
    };
    window.PV.resetLights=()=>{board.fill(false);history=[];moves=0;resets++;hintCell=-1;sfx('miss');draw('Section reset to blackout.');};
    setupWave();
  }

  function cameraCall(level){
    const panel=document.getElementById('playboard');
    const rounds=level==='easy'?5:level==='medium'?6:7;
    const maxLives=level==='easy'?3:2;
    const baseSwaps=level==='easy'?3:level==='medium'?4:5;
    let lives=maxLives,round=0,score=0,streak=0,bestStreak=0,lastTarget='',timers=[],mistakes=0;
    cleanup=()=>timers.forEach(clearTimeout);
    const modifiers=['STANDARD CUT','FAST CUT','FAKE FLASH','SHORT LOCK'];

    function startRound(){
      if(round>=rounds){
        const normalized=clamp(score/(rounds*112)*100-mistakes*2,20,100);
        return finish('camera-call',normalized,`${rounds} camera calls completed · best streak ×${bestStreak} · ${mistakes} missed call${mistakes===1?'':'s'}.`);
      }
      let target=sample(members);while(target===lastTarget&&members.length>1)target=sample(members);lastTarget=target;
      const order=[...members];
      const modifier=modifiers[round%modifiers.length];
      const swaps=baseSwaps+Math.floor(round/3)+(modifier==='FAST CUT'?1:0);
      const lockTime=modifier==='SHORT LOCK'?(level==='hard'?760:860):(level==='hard'?1000:level==='medium'?1150:1300);
      const swapTime=modifier==='FAST CUT'?(level==='hard'?410:level==='medium'?460:520):(level==='hard'?520:level==='medium'?610:720);
      let busy=true,guessStart=0;
      panel.innerHTML=`${hud('CAMERA CALL',`CALL ${round+1}/${rounds}`,level,`${'◉'.repeat(lives)}${'○'.repeat(maxLives-lives)}`)}<div class="camera-contract"><div><span class="eyebrow">CAMERA OPERATOR</span><b>${modifier}</b><small>${modifier==='FAKE FLASH'?'Ignore the decoy spotlight during the shuffle.':modifier==='FAST CUT'?'Extra swaps at a faster cut speed.':modifier==='SHORT LOCK'?'The target preview disappears early.':'Track the target through the full camera cut.'}</small></div><span>STREAK ×${streak}</span></div><div class="camera-prompt">TRACK <b>${target.toUpperCase()}</b> · ${swaps} SHUFFLES</div><div class="camera-lockbar"><i style="--lock:${lockTime}ms"></i><span>LOCK WINDOW</span></div><div class="camera-target photo-shell">${photoImg(target,target)}<span>LOCK THIS FACE</span></div><div class="camera-board" id="cameraBoard">${members.map((m,i)=>`<button class="camera-card photo-shell" id="cam-${slug(m)}" style="--x:${i%2};--y:${Math.floor(i/2)}" disabled>${photoImg(m,m)}<span>${m}</span></button>`).join('')}</div><div class="camera-status" id="cameraStatus">Memorize the target. Camera cuts begin in a moment.</div>`;
      const update=()=>order.forEach((m,i)=>{const el=document.getElementById(`cam-${slug(m)}`);if(el){el.style.setProperty('--x',i%2);el.style.setProperty('--y',Math.floor(i/2));}});
      const cover=()=>members.forEach(m=>document.getElementById(`cam-${slug(m)}`)?.classList.add('covered'));
      const reveal=()=>members.forEach(m=>document.getElementById(`cam-${slug(m)}`)?.classList.remove('covered'));
      const enable=()=>members.forEach(m=>{const el=document.getElementById(`cam-${slug(m)}`);if(el)el.disabled=false;});
      timers.push(setTimeout(()=>{
        cover();document.querySelector('.camera-target')?.classList.add('hidden-target');
        let s=0;
        const doSwap=()=>{
          if(s>=swaps){busy=false;enable();guessStart=performance.now();const board=document.getElementById('cameraBoard');board?.classList.remove('is-shuffling');const status=document.getElementById('cameraStatus');if(status)status.textContent='CALL IT — the shuffle stopped. Where did the target land?';sfx('cue',620);return;}
          let a=Math.floor(Math.random()*4),b=Math.floor(Math.random()*4);while(b===a)b=Math.floor(Math.random()*4);
          const movingA=order[a],movingB=order[b];
          const elA=document.getElementById(`cam-${slug(movingA)}`),elB=document.getElementById(`cam-${slug(movingB)}`);
          elA?.classList.add('camera-moving','camera-moving-a');elB?.classList.add('camera-moving','camera-moving-b');
          const board=document.getElementById('cameraBoard');board?.classList.add('is-shuffling');
          const status=document.getElementById('cameraStatus');if(status)status.textContent=`CUT ${s+1}/${swaps} · follow the two moving cards.`;
          [order[a],order[b]]=[order[b],order[a]];
          requestAnimationFrame(()=>update());s++;sfx('tap');
          timers.push(setTimeout(()=>{elA?.classList.remove('camera-moving','camera-moving-a');elB?.classList.remove('camera-moving','camera-moving-b');board?.classList.remove('is-shuffling');},Math.max(260,swapTime*.78)));
          if(modifier==='FAKE FLASH'&&s===Math.ceil(swaps/2)){
            const decoy=sample(members.filter(m=>m!==target));const el=document.getElementById(`cam-${slug(decoy)}`);el?.classList.add('fake-flash');timers.push(setTimeout(()=>el?.classList.remove('fake-flash'),210));
          }
          timers.push(setTimeout(doSwap,swapTime));
        };
        doSwap();
      },lockTime));
      members.forEach((m,i)=>{
        const el=document.getElementById(`cam-${slug(m)}`);if(!el)return;
        el.onclick=()=>{
          if(busy)return;busy=true;reveal();members.forEach(x=>{const e=document.getElementById(`cam-${slug(x)}`);if(e)e.disabled=true;});
          const ok=m===target,elapsed=performance.now()-guessStart;
          if(ok){
            streak++;bestStreak=Math.max(bestStreak,streak);score+=100+Math.min(12,streak*2)+(elapsed<800?6:elapsed<1200?3:0);sfx('match');vibrate(15);
            if(streak>0&&streak%3===0&&lives<maxLives){lives++;sfx('heart');}
          }else{
            streak=0;lives--;mistakes++;sfx('miss');vibrate(20);
          }
          el.classList.add(ok?'guess-correct':'guess-wrong');
          document.getElementById(`cam-${slug(target)}`)?.classList.add('guess-correct');
          const reaction=elapsed<650?'SNAP':elapsed<1050?'CLEAN':'SAFE';
          const status=document.getElementById('cameraStatus');if(status){status.textContent=ok?`${reaction} LOCK · ${Math.round(elapsed)} ms${streak%3===0&&lives===maxLives?' · lens stabilized':''}.`:`MISS · target was ${target}. ${Math.max(0,lives)} lens${lives===1?'':'es'} left.`;status.className=`camera-status ${ok?'ok':'bad'}`;}
          const board=document.getElementById('cameraBoard');if(board){board.classList.add(ok?'camera-hit':'camera-miss');timers.push(setTimeout(()=>board?.classList.remove('camera-hit','camera-miss'),280));}
          if(lives<=0)return timers.push(setTimeout(()=>finish('camera-call',Math.max(18,Math.round(score/(rounds*112)*100)),`Camera run ended on call ${round+1}/${rounds} · best streak ×${bestStreak}.`),900));
          timers.push(setTimeout(()=>{round++;startRound();},950));
        };
      });
    }
    startRound();
  }

  function pixelChoreo(level){
    const panel=document.getElementById('playboard');
    const beatMs=level==='easy'?760:level==='medium'?660:580;
    const perfectWindow=level==='easy'?190:level==='medium'?160:135;
    const goodWindow=level==='easy'?350:level==='medium'?300:255;
    const maxStamina=level==='easy'?5:level==='medium'?4:3;
    const buttons=[['←','LEFT'],['↑','UP'],['★','POSE'],['↓','DOWN'],['→','RIGHT']];
    const sectionDefs=[
      {name:'MARK THE 8',formation:'line',pool:['LEFT','RIGHT','UP','DOWN','POSE']},
      {name:'FORMATION PASS',formation:'center',pool:['LEFT','RIGHT','POSE','UP','DOWN']},
      {name:'ENCORE HIT',formation:'diamond',pool:['POSE','LEFT','RIGHT','UP','DOWN']}
    ];
    let chosen='',section=0,phase='select',cues=[],activeCue=-1,resolved=false,targetTime=0,combo=0,bestCombo=0,score=0,stamina=maxStamina,replays=2;
    let perfects=0,goods=0,misses=0,feedback='Choose a rehearsal captain.',countLabel='5',formation='line',memberPoses={Jisoo:'idle',Jennie:'idle','Rosé':'idle',Lisa:'idle'};
    const timers=[];
    cleanup=()=>timers.forEach(clearTimeout);

    function memberFlavor(m){return ({Jisoo:'Elegant lines · steady timing captain.',Jennie:'Sharp accents · quick hit captain.',Rosé:'Fluid transitions · smooth count captain.',Lisa:'Fast footwork · performance captain.'})[m]||'Practice-room captain.';}
    function iconFor(step){return ({UP:'↑',LEFT:'←',RIGHT:'→',DOWN:'↓',POSE:'★'})[step]||'?';}
    function poseFor(step){return ({UP:'up',DOWN:'down',LEFT:'left',RIGHT:'right',POSE:'win'})[step]||'dance';}
    function makePhrase(def){
      const out=[];
      for(let i=0;i<8;i++){
        const preferred=def.pool[(i+section+(members.indexOf(chosen)+1))%def.pool.length];
        let step=i===7?'POSE':preferred;
        if(i>0&&step===out[i-1])step=def.pool[(def.pool.indexOf(step)+2)%def.pool.length];
        out.push(step);
      }
      return out;
    }
    function complementaryPose(step,index){
      const patterns={
        LEFT:['left','right','dance','dance'],RIGHT:['dance','dance','left','right'],
        UP:['up','dance','up','dance'],DOWN:['dance','down','dance','down'],POSE:['point','heart','win','point']
      };
      return (patterns[step]||['dance','dance','dance','dance'])[index]||'dance';
    }
    function applyGroupPose(step){
      memberPoses=Object.fromEntries(members.map((m,i)=>[m,m===chosen?poseFor(step):complementaryPose(step,i)]));
    }
    function resetGroup(){memberPoses=Object.fromEntries(members.map(m=>[m,m===chosen?'idle':'dance']));}
    function phaseLabel(){return phase==='demo'?'COACH DEMO':phase==='perform'||phase==='countdown'?'YOUR RUN':phase==='between'?'SECTION CLEAR':'REHEARSAL';}
    function draw(){
      const def=sectionDefs[section];
      const progress=activeCue<0?0:clamp((activeCue+(resolved?1:0))/8*100,0,100);
      const canPerform=phase==='ready';
      const canReplay=phase==='ready'&&replays>0;
      panel.innerHTML=`${hud('PIXEL CHOREO',`SECTION ${section+1}/${sectionDefs.length} · ${phaseLabel()}`,level,`${'♥'.repeat(stamina)}${'♡'.repeat(Math.max(0,maxStamina-stamina))}`)}<div class="choreo-shell choreo-v75" style="--choreo-beat:${beatMs}ms"><div class="choreo-hero"><div class="choreo-captain-avatar">${pixelAvatar(chosen,true,memberPoses[chosen]||'idle')}</div><div><span class="eyebrow">${def.name}</span><b>${chosen} CAPTAIN</b><small>${feedback}</small></div><div class="choreo-tools"><span>COMBO ×${combo}</span><span>${perfects} PERFECT</span></div></div><div class="choreo-stage-v75 formation-${formation}"><div class="choreo-stage-grid"></div><div class="choreo-count-badge ${phase==='countdown'?'counting':''}"><small>${phase==='demo'?'DEMO':phase==='perform'?'COUNT':phase==='countdown'?'COUNT IN':'READY'}</small><b>${countLabel}</b></div><div class="choreo-members">${members.map((m,i)=>`<div class="choreo-member slot-${i+1} ${m===chosen?'captain':''}">${pixelAvatar(m,false,memberPoses[m]||'dance')}<span>${m}</span></div>`).join('')}</div><div class="choreo-stage-floor"><i></i></div></div><div class="choreo-preview choreo-8count">${cues.map((step,i)=>`<i class="${i<activeCue?'done':''} ${i===activeCue?'current':''} ${i>activeCue&&phase==='perform'?'upcoming':''}"><em>${i+1}</em><b>${iconFor(step)}</b><span>${step}</span></i>`).join('')}</div><div class="choreo-count-meter"><i style="width:${progress}%"></i><span>${phase==='perform'?`COUNT ${Math.min(8,activeCue+1)} / 8`:phase==='demo'?'WATCH THE 8-COUNT':phase==='ready'?'DEMO COMPLETE':phase==='between'?'SECTION COMPLETE':'5 · 6 · 7 · 8'}</span></div>${phase==='perform'?`<div class="choreo-timing-window"><i></i><span>HIT INSIDE THE BEAT WINDOW</span></div>`:''}<div class="choreo-pad">${buttons.map(([icon,label])=>`<button onclick="window.PV.choreoTap('${label}')" ${phase==='perform'&&!resolved?'':'disabled'}><b>${icon}</b><span>${label}</span></button>`).join('')}</div><div class="choreo-actions-v75">${canPerform?`<button class="cta" onclick="window.PV.beginChoreoPerformance()">PERFORM SECTION →</button>`:''}${canReplay?`<button class="ghost-cta" onclick="window.PV.replayChoreo()">COACH REPLAY · ${replays}</button>`:''}${phase==='between'&&section<sectionDefs.length-1?`<button class="cta" onclick="window.PV.nextChoreoSection()">NEXT SECTION →</button>`:''}</div><div class="choreo-footer"><span>BEST COMBO <b>×${bestCombo}</b></span><span>GOOD <b>${goods}</b></span><span>MISSES <b>${misses}</b></span><span>FORMATION <b>${formation.toUpperCase()}</b></span></div></div>`;
    }
    function countdown(next){
      phase='countdown';resetGroup();
      const nums=['5','6','7','8'];
      nums.forEach((n,i)=>timers.push(setTimeout(()=>{countLabel=n;feedback=i<3?'Find the pulse…':'And — GO.';draw();sfx(i===3?'perfect':'tap');},i*Math.max(260,beatMs*.55))));
      timers.push(setTimeout(next,nums.length*Math.max(260,beatMs*.55)+90));
    }
    function demo(regenerate=true){
      const def=sectionDefs[section];formation=def.formation;if(regenerate||!cues.length)cues=makePhrase(def);activeCue=-1;resolved=true;feedback='5 · 6 · 7 · 8 — watch all four members mark the phrase.';draw();
      countdown(()=>{
        phase='demo';
        cues.forEach((step,i)=>timers.push(setTimeout(()=>{activeCue=i;countLabel=String(i+1);applyGroupPose(step);if(i===4)formation=section===0?'center':section===1?'diamond':'center';feedback=`Demo count ${i+1} · ${step}`;draw();sfx(step==='POSE'?'perfect':'tap');},i*beatMs)));
        timers.push(setTimeout(()=>{phase='ready';activeCue=-1;resolved=true;formation=def.formation;resetGroup();countLabel='GO';feedback='Demo complete. The full cue line stays visible — now hit each move on the active beat.';draw();},cues.length*beatMs+220));
      });
    }
    function startBeat(i){
      if(phase!=='perform')return;
      if(i>=cues.length)return completeSection();
      activeCue=i;resolved=false;countLabel=String(i+1);formation=i<4?sectionDefs[section].formation:(section===0?'center':section===1?'diamond':'center');resetGroup();feedback=`Count ${i+1} · ${cues[i]} · hit the move near the middle of the pulse.`;targetTime=performance.now()+beatMs*.48;draw();sfx('cue',520+(i%4)*35);
      timers.push(setTimeout(()=>{
        if(phase!=='perform'||activeCue!==i)return;
        if(!resolved){resolved=true;misses++;stamina--;combo=0;feedback=`MISS · count ${i+1} was ${cues[i]}.`;sfx('miss');vibrate(16);applyGroupPose(cues[i]);draw();}
        if(stamina<=0)return finish('pixel-choreo',Math.max(12,Math.round(score/(sectionDefs.length*8))),`${chosen} ran out of rehearsal stamina in section ${section+1} · ${perfects} perfect · ${goods} good · ${misses} misses.`);
        startBeat(i+1);
      },beatMs));
    }
    function perform(){
      if(phase!=='ready')return;
      activeCue=-1;resolved=true;feedback='Performance count-in.';countdown(()=>{phase='perform';activeCue=-1;feedback='Your run is live.';startBeat(0);});
    }
    function completeSection(){
      phase='between';activeCue=7;resolved=true;countLabel='★';applyGroupPose('POSE');formation='center';score+=Math.max(0,combo*2);feedback=`Section ${section+1} cleared · ${perfects} perfect / ${goods} good so far.`;sfx('perfect');vibrate(20);draw();
      if(section>=sectionDefs.length-1){
        const maxPoints=sectionDefs.length*8*100;
        const staminaBonus=stamina*2;
        const final=clamp(Math.round(score/maxPoints*100+staminaBonus),0,100);
        timers.push(setTimeout(()=>finish('pixel-choreo',final,`${chosen} led all four members through ${sectionDefs.length} timed 8-counts · ${perfects} perfect · ${goods} good · ${misses} misses · best combo ×${bestCombo}.`),650));
      }
    }
    function tap(step){
      if(phase!=='perform'||resolved||activeCue<0)return;
      const expected=cues[activeCue];
      const now=performance.now();
      if(step!==expected){resolved=true;misses++;stamina--;combo=0;feedback=`WRONG MOVE · needed ${expected}.`;sfx('miss');vibrate(18);applyGroupPose(expected);draw();return;}
      const delta=Math.abs(now-targetTime);resolved=true;combo++;bestCombo=Math.max(bestCombo,combo);applyGroupPose(step);
      if(delta<=perfectWindow){perfects++;score+=100+Math.min(18,combo);feedback=`PERFECT · ${Math.round(delta)} ms from center.`;sfx('perfect');vibrate(12);}
      else if(delta<=goodWindow){goods++;score+=72+Math.min(10,combo);feedback=`GOOD · ${Math.round(delta)} ms from center.`;sfx('good');}
      else{goods++;score+=48;feedback=`LATE · stay closer to the beat center.`;sfx('tap');}
      draw();
    }
    function replay(){
      if(phase!=='ready'||replays<=0)return;
      replays--;combo=0;feedback='Coach replay loaded.';demo(false);
    }
    function nextSection(){
      if(phase!=='between'||section>=sectionDefs.length-1)return;
      section++;activeCue=-1;resolved=true;combo=0;countLabel='5';formation=sectionDefs[section].formation;resetGroup();feedback=`Section ${section+1} ready.`;cues=[];demo(true);
    }
    function chooseScreen(){
      panel.innerHTML=`${hud('PIXEL CHOREO','CHOOSE CAPTAIN',level,'4-MEMBER TIMED REHEARSAL')}<div class="route-select"><div class="route-story"><span>5 · 6 · 7 · 8</span><h2>RUN THE FULL PIXEL 8-COUNT.</h2><p>Pick a rehearsal captain. All four members now demonstrate the phrase together, then you perform the same visible 8-count with timing grades and formation changes. This is a rhythm rehearsal — not a memory test.</p></div><div class="pixel-roster">${members.map(m=>`<button onclick="window.PV.chooseChoreoMember('${m}')">${pixelAvatar(m)}<b>${m}</b><span>${memberFlavor(m)}</span></button>`).join('')}</div></div>`;
    }
    window.PV.chooseChoreoMember=m=>{
      if(!members.includes(m))return;chosen=m;resetGroup();
      panel.innerHTML=`${hud('PIXEL CHOREO','REHEARSAL BRIEF',level,'PIXEL STORY')}${pixelCutscene({title:'LOCK THE FINAL 8-COUNT',kicker:'PRACTICE ROOM STORY',member:m,lines:[`${m} takes rehearsal captain while all four pixel members line up for the encore transition.`,`Every section starts with a 5-6-7-8 demo, then the full cue line stays visible during your timed run.`,`Hit the active move inside the beat window and carry the formations cleanly into the stage tunnel.`],button:'START FOUR-MEMBER REHEARSAL',action:'window.PV.beginChoreoMission()'})}`;sfx('tap');
    };
    window.PV.beginChoreoMission=()=>{if(!chosen)return;section=0;phase='ready';combo=0;bestCombo=0;score=0;stamina=maxStamina;replays=2;perfects=0;goods=0;misses=0;activeCue=-1;resolved=true;formation=sectionDefs[0].formation;resetGroup();cues=[];demo(true);};
    window.PV.beginChoreoPerformance=perform;
    window.PV.choreoTap=tap;
    window.PV.replayChoreo=replay;
    window.PV.nextChoreoSection=nextSection;
    chooseScreen();
  }

  function encoreDash(level){
    const panel=document.getElementById('playboard');
    const tickMs=level==='easy'?820:level==='medium'?680:560;
    const totalTicks=level==='easy'?24:level==='medium'?28:32;
    const maxHearts=level==='easy'?4:3;
    const required=['MIC','IN-EAR','PASS'];
    let chosen='',lane=1,jumping=false,started=false,tickNo=0,hearts=maxHearts,combo=0,bestCombo=0,score=0;
    let events=[],collected=new Set(),timer=0,lastMessage='Get ready for stage call.';
    const laneNames=['LEFT','CENTER','RIGHT'];
    cleanup=()=>clearInterval(timer);

    function memberFlavor(m){
      return ({Jisoo:'Steady runner · +1 heart on Easy.',Jennie:'Fast lane switch · starts with +5 score.',Rosé:'Encore focus · item pickups score +4.',Lisa:'Dance line · obstacle clears build combo faster.'})[m]||'Stage-ready runner.';
    }
    function chooseScreen(){
      panel.innerHTML=`${hud('ENCORE DASH','CHOOSE MEMBER',level,'PIXEL RUN')}<div class="route-select"><div class="route-story"><span>STAGE CALL INCOMING</span><h2>THE ENCORE KIT IS STILL BACKSTAGE.</h2><p>Pick a member-inspired runner, recover the microphone, in-ear pack and stage pass, then survive the hallway rush until the stage door opens.</p></div><div class="pixel-roster">${members.map(m=>`<button onclick="window.PV.chooseDashMember('${m}')">${pixelAvatar(m)}<b>${m}</b><span>${memberFlavor(m)}</span></button>`).join('')}</div></div>`;
    }
    function intro(member){
      panel.innerHTML=`${hud('ENCORE DASH','MISSION BRIEF',level,'PIXEL STORY')}${pixelCutscene({title:'RUN TO THE ENCORE',kicker:'BACKSTAGE STORY',member,lines:[`Rehearsal is complete and the encore countdown has started, but three essentials are still missing.`,`Run the stage tunnel and recover the microphone, in-ear pack and stage pass.`,`Reach the call board with the full kit before the stage door opens.`],button:'START ENCORE DASH',action:'window.PV.beginDashMission()'})}`;
    }
    function spawnForTick(n){
      const forced={4:'MIC',11:'IN-EAR',18:'PASS'};
      if(forced[n]){
        const missing=required.filter(x=>!collected.has(x));
        const type=missing.includes(forced[n])?forced[n]:sample(missing.length?missing:required);
        events.push({lane:Math.floor(Math.random()*3),row:0,type,kind:'item'});
      }
      if(n>2&&Math.random()<(level==='hard'?.68:level==='medium'?.55:.42)){
        const count=level==='hard'&&Math.random()>.62?2:1;
        const ls=shuffle([0,1,2]).slice(0,count);
        ls.forEach(l=>events.push({lane:l,row:0,kind:'obstacle',type:sample(['CASE','BARRIER'])}));
      }
      if(n%7===0&&Math.random()>.25){
        events.push({lane:Math.floor(Math.random()*3),row:0,kind:'bonus',type:'HEART'});
      }
    }
    function render(message=lastMessage){
      lastMessage=message;
      const grid=[];
      for(let r=0;r<6;r++)for(let l=0;l<3;l++)grid.push({r,l});
      const dangerLanes=new Set(events.filter(e=>e.kind==='obstacle'&&e.row>=3).map(e=>e.lane));
      panel.innerHTML=`${hud('ENCORE DASH',`${tickNo}/${totalTicks} HALLWAY`,level,`${'♥'.repeat(hearts)}${'♡'.repeat(Math.max(0,maxHearts-hearts))}`)}<div class="dash-shell"><div class="dash-head"><div>${pixelAvatar(chosen,true,'run')}<span><b>${chosen}</b><small>${message}</small></span></div><div class="dash-kit">${required.map(x=>`<i class="${collected.has(x)?'got':''}">${x}</i>`).join('')}</div></div><div class="dash-warning-row">${laneNames.map((name,i)=>`<span class="${dangerLanes.has(i)?'danger':''}">${dangerLanes.has(i)?'! ':''}${name}</span>`).join('')}</div><div class="dash-track">${grid.map(cell=>{const ev=events.find(e=>e.row===cell.r&&e.lane===cell.l);const isPlayer=cell.r===5&&cell.l===lane;return `<div class="dash-cell lane-${cell.l} ${cell.r===5?'player-row':''} ${dangerLanes.has(cell.l)?'lane-danger':''}">${ev?`<span class="dash-event ${ev.kind}">${ev.kind==='item'?({'MIC':'♪','IN-EAR':'◌','PASS':'◆'})[ev.type]:ev.kind==='bonus'?'♥':'▣'}</span>`:''}${isPlayer?pixelAvatar(chosen,true,jumping?'win':'run'):''}</div>`;}).join('')}</div><div class="dash-status"><span><small>SCORE</small><b>${score}</b></span><span><small>COMBO</small><b>${combo}</b></span><span><small>BEST</small><b>${bestCombo}</b></span><span><small>LANE</small><b>${laneNames[lane]}</b></span></div><div class="dash-controls"><button onclick="window.PV.dashLane(-1)">←<span>LEFT</span></button><button class="jump" onclick="window.PV.dashJump()">↑<span>JUMP</span></button><button onclick="window.PV.dashLane(1)">→<span>RIGHT</span></button></div></div>`;
    }
    function resolveBottom(){
      const bottom=events.filter(e=>e.row>=5);
      const keep=[];
      for(const ev of events){
        if(ev.row<5){keep.push(ev);continue;}
        if(ev.lane!==lane){continue;}
        if(ev.kind==='item'){
          if(!collected.has(ev.type))collected.add(ev.type);
          const bonus=chosen==='Rosé'?4:0;
          score+=20+combo*2+bonus;combo++;bestCombo=Math.max(bestCombo,combo);sfx('heart');vibrate(12);lastMessage=`${ev.type} recovered!`;
        }else if(ev.kind==='bonus'){
          hearts=Math.min(maxHearts,hearts+1);score+=8;combo++;bestCombo=Math.max(bestCombo,combo);sfx('heart');lastMessage='Bonus heart secured.';
        }else if(jumping){
          score+=chosen==='Lisa'?8:5;combo++;bestCombo=Math.max(bestCombo,combo);sfx('good');lastMessage='Clean obstacle jump!';
        }else{
          hearts--;combo=0;score=Math.max(0,score-8);sfx('miss');vibrate(24);lastMessage='Hit a backstage obstacle.';
        }
      }
      events=keep;
    }
    function step(){
      if(!started)return;
      tickNo++;
      events.forEach(e=>e.row++);
      resolveBottom();
      jumping=false;
      if(hearts<=0){clearInterval(timer);started=false;return finish('encore-dash',Math.max(15,Math.round(score/3)),`${chosen} was stopped in the hallway after recovering ${collected.size}/3 encore items.`);}
      if(tickNo>=totalTicks){
        clearInterval(timer);started=false;
        const kit=collected.size;
        const survive=hearts/maxHearts;
        const final=clamp(Math.round(kit/3*55+survive*25+Math.min(20,bestCombo*2)),0,100);
        return finish('encore-dash',final,`${chosen} reached stage call with ${kit}/3 encore items · best combo ×${bestCombo}.`);
      }
      spawnForTick(tickNo);
      render(lastMessage);
    }
    function startMission(){
      lane=1;jumping=false;started=true;tickNo=0;hearts=maxHearts+(level==='easy'&&chosen==='Jisoo'?1:0);combo=0;bestCombo=0;score=chosen==='Jennie'?5:0;events=[];collected=new Set();lastMessage='Run! The stage door is counting down.';
      spawnForTick(0);render(lastMessage);timer=setInterval(step,tickMs);sfx('start');
    }
    window.PV.chooseDashMember=m=>{if(!members.includes(m))return;chosen=m;intro(m);sfx('tap');};
    window.PV.beginDashMission=()=>{if(chosen)startMission();};
    window.PV.dashLane=dir=>{if(!started)return;lane=clamp(lane+dir,0,2);sfx('tap');render(`Moved to ${laneNames[lane].toLowerCase()} lane.`);};
    window.PV.dashJump=()=>{if(!started)return;jumping=true;sfx('good');render('Jump armed for the next obstacle.');};
    chooseScreen();
  }


  function concertFreePlay(level){
    const panel=document.getElementById('playboard');
    const maxSongs=level==='easy'?3:level==='medium'?4:5;
    let setlist=[selectedYouTubeTrack];
    let theme='pink grid';
    let screenMode='auto';
    let formation='line';
    let focus='group';
    let crowdMode='pulse';
    let currentIndex=0;
    let interactions=0;
    let vibe=0;
    let completed=0;
    let directorClears=0;
    let directorStreak=0;
    let directorTask=null;
    let activePanel='cues';
    let sourceVisible=false;
    let landscapeMode=false;
    let landscapeOwnsFullscreen=false;
    let landscapeControlsOpen=false;
    let landscapeMemberCamEnabled=true;
    let effectMode='none';
    let effectSerial=0;
    let transitionTitle='';
    let introMember='';
    let showPhase='build';
    let openingDone=false;
    let finaleShown=false;
    let playerReady=false,started=false,ended=false,startFallbackTimer=0,beatTimer=0,lastBeat=-1;
    let stagePulse=0;
    const showTimers=[];
    let currentPoses={Jisoo:'idle',Jennie:'idle','Rosé':'idle',Lisa:'idle'};
    let liveMove='groove';
    let livePhrase=-1;
    let manualPoseLockUntil=0;
    let manualFocusLockUntil=0;
    let autoVocalCam=true;
    let currentSongProgress=0;
    let currentVocalMember='group';
    let currentSectionKey='intro';
    let currentSectionLabel='INTRO';
    let currentSectionIndex=-1;
    let autoFxLockUntil=0;
    let lastAutoFxBeat=-999;
    let directorMode='live';
    let liveCall=null;
    let liveCallSerial=0;
    let liveDirectorScore=0;
    let liveDirectorCombo=0;
    let liveDirectorBest=0;
    let livePerfect=0;
    let liveGood=0;
    let liveMiss=0;
    let livePower=0;
    let liveNextCallBeat=12;
    let liveMaxTriggered=false;
    let liveOverdriveUntilBeat=-1;
    let liveOverdriveCount=0;
    let liveSectionHits=0;
    let liveSectionGoal=2;
    let liveSectionCleared=false;
    let liveSectionClears=0;
    let liveTrackKey='';
    let liveRecoveryCalls=0;
    let liveCallNumber=0;
    let liveSongClean=0;
    let liveSongPerfect=0;
    let liveSongMissionCleared=false;
    let liveSongMissionClears=0;

    const concertLandscapeQuery=window.matchMedia?.('(orientation: landscape)');
    let landscapePromptTimer=0;
    let landscapeLockSucceeded=false;
    function isPhysicalLandscape(){return window.innerWidth>window.innerHeight;}
    function currentFullscreenElement(){return document.fullscreenElement||document.webkitFullscreenElement||null;}
    async function requestConcertFullscreen(){
      const root=document.documentElement;
      const request=root.requestFullscreen||root.webkitRequestFullscreen;
      if(!request)return false;
      try{
        let result;
        try{result=request.call(root,{navigationUI:'hide'});}catch{result=request.call(root);}
        if(result?.then)await result;
        return !!currentFullscreenElement();
      }catch{return false;}
    }
    async function exitConcertFullscreen(){
      const exit=document.exitFullscreen||document.webkitExitFullscreen;
      if(!exit||!currentFullscreenElement())return;
      try{const result=exit.call(document);if(result?.then)await result;}catch{}
    }
    // Compact concert layout must follow the real viewport. On iPhone Safari,
    // orientation lock/fullscreen may be unavailable even after a user tap.
    function concertLandscapeActive(){return isPhysicalLandscape();}
    function ensureConcertRotatePrompt(){
      let prompt=document.getElementById('concertRotatePrompt');
      if(prompt)return prompt;
      prompt=document.createElement('div');
      prompt.id='concertRotatePrompt';
      prompt.className='concert-rotate-prompt';
      prompt.setAttribute('role','status');
      prompt.setAttribute('aria-live','polite');
      prompt.innerHTML=`<div><b>↔ ROTATE FOR CONCERT MODE</b><span>${platformInfo.isiPhone?'iPhone Safari cannot always force landscape. Rotate your phone manually.':'Rotate your device to enter the compact concert view.'}${platformInfo.isiOS&&!platformInfo.standalone?' Add PINKVERSE to the Home Screen for the most app-like view.':''}</span></div><button type="button" aria-label="Cancel landscape mode">CANCEL</button>`;
      prompt.querySelector('button')?.addEventListener('click',()=>setConcertLandscape(false));
      document.body.appendChild(prompt);
      return prompt;
    }
    function syncConcertRotatePrompt(){
      clearTimeout(landscapePromptTimer);
      const prompt=document.getElementById('concertRotatePrompt');
      if(!landscapeMode||isPhysicalLandscape()){
        prompt?.classList.remove('show');
        return;
      }
      landscapePromptTimer=setTimeout(()=>{
        if(landscapeMode&&!isPhysicalLandscape())ensureConcertRotatePrompt().classList.add('show');
      },260);
    }
    function syncLandscapeOverlayUI(){
      const active=concertLandscapeActive();
      document.body.classList.toggle('concert-landscape-controls-open',active&&landscapeControlsOpen);
      document.body.classList.toggle('concert-member-cam-off',!landscapeMemberCamEnabled);
      document.querySelectorAll('[data-concert-controls]').forEach(btn=>{
        btn.classList.toggle('on',landscapeControlsOpen);
        btn.setAttribute('aria-expanded',String(landscapeControlsOpen));
        const label=btn.querySelector('span');if(label)label.textContent=landscapeControlsOpen?'CLOSE':'CONTROLS';
      });
      document.querySelectorAll('[data-concert-member-cam]').forEach(btn=>{
        btn.classList.toggle('on',landscapeMemberCamEnabled);
        btn.setAttribute('aria-pressed',String(landscapeMemberCamEnabled));
        const label=btn.querySelector('span');if(label)label.textContent=landscapeMemberCamEnabled?'CAM ON':'CAM OFF';
      });
      updateLandscapePlayButton();
    }
    function updateLandscapeButton(){
      const active=concertLandscapeActive();
      const waiting=landscapeMode&&!active;
      if(!active)landscapeControlsOpen=false;
      document.body.classList.toggle('concert-landscape-active',active);
      document.body.classList.toggle('concert-landscape-requested',landscapeMode);
      document.body.classList.toggle('concert-landscape-waiting',waiting);
      document.querySelectorAll('[data-concert-landscape]').forEach(btn=>{
        btn.classList.toggle('on',active);
        btn.classList.toggle('waiting',waiting);
        btn.setAttribute('aria-pressed',String(active));
        const label=btn.querySelector('span');
        if(label)label.textContent=waiting?'ROTATE DEVICE':landscapeMode?'EXIT LANDSCAPE':active?'LANDSCAPE ACTIVE':'LANDSCAPE';
      });
      syncConcertRotatePrompt();
      syncLandscapeOverlayUI();
    }
    async function setConcertLandscape(force){
      const next=typeof force==='boolean'?force:!landscapeMode;
      landscapeMode=next;
      landscapeLockSucceeded=false;
      if(next){
        // iPhone Safari does not reliably expose arbitrary-element fullscreen.
        // Avoid a doomed request there so the same tap can be used for UI/audio.
        if(!platformInfo.isiPhone&&!currentFullscreenElement()){
          landscapeOwnsFullscreen=await requestConcertFullscreen();
        }
        try{
          if(screen.orientation?.lock){
            await screen.orientation.lock('landscape');
            landscapeLockSucceeded=true;
          }
        }catch{landscapeLockSucceeded=false;}
      }else{
        clearTimeout(landscapePromptTimer);
        document.getElementById('concertRotatePrompt')?.classList.remove('show');
        try{screen.orientation?.unlock?.();}catch{}
        if(landscapeOwnsFullscreen)await exitConcertFullscreen();
        landscapeOwnsFullscreen=false;
      }
      updateLandscapeButton();
      requestAnimationFrame(()=>document.getElementById('concertStage')?.scrollIntoView({block:'nearest'}));
    }
    function landscapeControlMarkup(compact=false){
      const active=concertLandscapeActive(),waiting=landscapeMode&&!active;
      return `<button type="button" class="concert-landscape-toggle ${compact?'compact':''} ${waiting?'waiting':''}" data-concert-landscape aria-pressed="${active}" onclick="window.PV.concertLandscape()"><b>↔</b><span>${waiting?'ROTATE DEVICE':landscapeMode?'EXIT LANDSCAPE':active?'LANDSCAPE ACTIVE':'LANDSCAPE'}</span></button>`;
    }
    function landscapeOverlayControlsMarkup(){
      return `<div class="concert-landscape-overlay-tools"><button type="button" class="concert-overlay-tool concert-play-toggle ${playerReady?'ready':'loading'}" id="concertLandscapePlayBtn" data-concert-play ${playerReady?'':'disabled'} onclick="window.PV.concertCue('play')"><b>▶</b><span>${playerReady?'PLAY SHOW':'LOADING…'}</span></button><button type="button" class="concert-overlay-tool concert-controls-toggle ${landscapeControlsOpen?'on':''}" data-concert-controls aria-expanded="${landscapeControlsOpen}" onclick="window.PV.concertLandscapeControls()"><b>☰</b><span>${landscapeControlsOpen?'CLOSE':'CONTROLS'}</span></button><button type="button" class="concert-overlay-tool concert-member-cam-toggle ${landscapeMemberCamEnabled?'on':''}" data-concert-member-cam aria-pressed="${landscapeMemberCamEnabled}" onclick="window.PV.concertMemberCam()"><b>◉</b><span>${landscapeMemberCamEnabled?'CAM ON':'CAM OFF'}</span></button></div>`;
    }
    function updateLandscapePlayButton(labelOverride=''){
      const label=labelOverride||(playerReady?'PLAY SHOW':'LOADING…');
      document.querySelectorAll('[data-concert-play]').forEach(btn=>{
        btn.disabled=!playerReady;
        btn.classList.toggle('loading',!playerReady);
        btn.classList.toggle('ready',!!playerReady);
        const span=btn.querySelector('span');if(span)span.textContent=label;
      });
    }
    const onConcertViewportChange=()=>updateLandscapeButton();
    window.addEventListener('resize',onConcertViewportChange,{passive:true});
    window.addEventListener('orientationchange',onConcertViewportChange,{passive:true});
    concertLandscapeQuery?.addEventListener?.('change',onConcertViewportChange);

    cleanup=()=>{
      clearTimeout(startFallbackTimer);showTimers.forEach(clearTimeout);clearInterval(beatTimer);
      try{activeYouTubePlayer?.stopVideo?.();activeYouTubePlayer?.destroy?.();}catch{}
      activeYouTubePlayer=null;
      window.removeEventListener('resize',onConcertViewportChange);
      window.removeEventListener('orientationchange',onConcertViewportChange);
      concertLandscapeQuery?.removeEventListener?.('change',onConcertViewportChange);
      clearTimeout(landscapePromptTimer);
      document.getElementById('concertRotatePrompt')?.remove();
      document.body.classList.remove('concert-landscape-active','concert-landscape-requested','concert-landscape-waiting','concert-landscape-controls-open','concert-member-cam-off');
      try{screen.orientation?.unlock?.();}catch{}
      if(landscapeOwnsFullscreen&&currentFullscreenElement())exitConcertFullscreen();
    };

    const themeClass=()=>slug(theme);
    const currentTrack=()=>youtubeTracks[setlist[currentIndex]]||youtubeTracks.hylt;
    const allTracks=()=>Object.values(youtubeTracks);
    const songChoreo={
      hylt:[
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'groove',formation:'center',focus:'Jennie',poses:['sing','dance','dance','dance']},
        {move:'step-left',formation:'center',focus:'Lisa',poses:['left','left','right','right']},
        {move:'accent',formation:'line',focus:'group',poses:['point','point','point','point']},
        {move:'travel',formation:'diamond',focus:'group',poses:['run','run','run','run']},
        {move:'split',formation:'diamond',focus:'Rosé',poses:['left','point','sing','right']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','win','dance','win']},
        {move:'accent',formation:'line',focus:'Jisoo',poses:['sing','point','point','sing']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'finale',formation:'center',focus:'group',poses:['win','win','sing','win']}
      ],
      pinkvenom:[
        {move:'groove',formation:'line',focus:'Jennie',poses:['point','sing','dance','dance']},
        {move:'step-right',formation:'line',focus:'Lisa',poses:['right','left','right','left']},
        {move:'accent',formation:'center',focus:'group',poses:['point','point','point','point']},
        {move:'travel',formation:'diamond',focus:'group',poses:['run','run','run','run']},
        {move:'split',formation:'diamond',focus:'Rosé',poses:['point','left','right','sing']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','win','dance','win']},
        {move:'bounce',formation:'line',focus:'group',poses:['dance','dance','point','point']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'group',poses:['win','point','point','win']},
        {move:'finale',formation:'center',focus:'group',poses:['win','win','point','win']}
      ],
      shutdown:[
        {move:'groove',formation:'line',focus:'Jennie',poses:['sing','dance','dance','point']},
        {move:'step-left',formation:'line',focus:'group',poses:['left','left','right','right']},
        {move:'accent',formation:'center',focus:'Lisa',poses:['point','point','sing','sing']},
        {move:'split',formation:'diamond',focus:'group',poses:['dance','left','right','dance']},
        {move:'travel',formation:'diamond',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','dance','sing','dance']},
        {move:'bounce',formation:'line',focus:'group',poses:['dance','heart','heart','dance']},
        {move:'step-right',formation:'line',focus:'Rosé',poses:['right','left','right','left']},
        {move:'accent',formation:'center',focus:'group',poses:['win','point','win','point']},
        {move:'finale',formation:'center',focus:'group',poses:['point','point','win','win']}
      ],
      ktl:[
        {move:'accent',formation:'center',focus:'group',poses:['win','point','point','win']},
        {move:'step-right',formation:'line',focus:'Jennie',poses:['right','left','right','left']},
        {move:'travel',formation:'diamond',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'Lisa',poses:['point','point','sing','sing']},
        {move:'split',formation:'diamond',focus:'group',poses:['left','point','point','right']},
        {move:'bounce',formation:'line',focus:'Rosé',poses:['dance','sing','dance','sing']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','win','win','sing']},
        {move:'accent',formation:'center',focus:'group',poses:['point','win','win','point']},
        {move:'finale',formation:'center',focus:'group',poses:['win','win','point','point']}
      ],
      d4:[
        {move:'groove',formation:'line',focus:'group',poses:['dance','dance','dance','dance']},
        {move:'step-left',formation:'line',focus:'Jennie',poses:['left','right','left','right']},
        {move:'accent',formation:'center',focus:'group',poses:['point','point','point','point']},
        {move:'bounce',formation:'center',focus:'Lisa',poses:['dance','win','dance','win']},
        {move:'step-right',formation:'line',focus:'group',poses:['right','left','right','left']},
        {move:'travel',formation:'diamond',focus:'group',poses:['run','run','run','run']},
        {move:'split',formation:'diamond',focus:'Rosé',poses:['point','left','sing','point']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','point','point','sing']},
        {move:'bounce',formation:'line',focus:'group',poses:['dance','dance','win','win']},
        {move:'finale',formation:'center',focus:'group',poses:['win','point','point','win']}
      ],
      boombayah:[
        {move:'bounce',formation:'line',focus:'group',poses:['dance','dance','dance','dance']},
        {move:'travel',formation:'diamond',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'Lisa',poses:['heart','point','heart','point']},
        {move:'step-left',formation:'line',focus:'Jennie',poses:['left','right','left','right']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','dance','win','win']},
        {move:'split',formation:'diamond',focus:'Rosé',poses:['left','dance','sing','right']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['point','win','point','win']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'group',poses:['heart','win','win','heart']},
        {move:'finale',formation:'center',focus:'group',poses:['heart','win','win','heart']}
      ],
      whistle:[
        {move:'groove',formation:'line',focus:'Jennie',poses:['sing','dance','dance','dance']},
        {move:'step-left',formation:'line',focus:'Lisa',poses:['left','right','left','right']},
        {move:'accent',formation:'center',focus:'group',poses:['point','point','point','point']},
        {move:'groove',formation:'diamond',focus:'Jisoo',poses:['dance','sing','dance','sing']},
        {move:'split',formation:'diamond',focus:'group',poses:['left','point','point','right']},
        {move:'accent',formation:'center',focus:'Rosé',poses:['sing','dance','point','sing']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','heart','dance','heart']},
        {move:'accent',formation:'center',focus:'group',poses:['point','win','point','win']},
        {move:'finale',formation:'center',focus:'group',poses:['win','point','point','win']}
      ],
      pwf:[
        {move:'groove',formation:'line',focus:'Rosé',poses:['sing','dance','dance','sing']},
        {move:'step-right',formation:'line',focus:'Jisoo',poses:['right','left','right','left']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','heart','heart','heart']},
        {move:'split',formation:'diamond',focus:'Jennie',poses:['left','sing','dance','right']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','heart','heart','dance']},
        {move:'accent',formation:'center',focus:'Lisa',poses:['point','dance','sing','point']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','dance','dance','heart']},
        {move:'accent',formation:'center',focus:'group',poses:['sing','win','win','sing']},
        {move:'finale',formation:'center',focus:'group',poses:['heart','heart','win','win']}
      ],
      stay:[
        {move:'groove',formation:'line',focus:'Jisoo',poses:['sing','idle','idle','sing']},
        {move:'step-left',formation:'line',focus:'Rosé',poses:['left','idle','idle','right']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','heart','heart','heart']},
        {move:'groove',formation:'diamond',focus:'Jennie',poses:['dance','sing','sing','dance']},
        {move:'split',formation:'diamond',focus:'group',poses:['left','heart','heart','right']},
        {move:'accent',formation:'center',focus:'Lisa',poses:['point','idle','point','idle']},
        {move:'groove',formation:'line',focus:'group',poses:['sing','dance','dance','sing']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','heart','heart','heart']},
        {move:'accent',formation:'center',focus:'group',poses:['sing','win','win','sing']},
        {move:'finale',formation:'center',focus:'group',poses:['bow','heart','heart','bow']}
      ],
      aiiyl:[
        {move:'groove',formation:'line',focus:'group',poses:['heart','dance','dance','heart']},
        {move:'step-right',formation:'line',focus:'Jennie',poses:['right','left','right','left']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','heart','heart','dance']},
        {move:'split',formation:'diamond',focus:'Lisa',poses:['left','heart','heart','right']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'Rosé',poses:['point','dance','sing','point']},
        {move:'groove',formation:'line',focus:'group',poses:['dance','dance','dance','dance']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','dance','dance','heart']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','heart','heart','sing']},
        {move:'finale',formation:'center',focus:'group',poses:['heart','heart','win','win']}
      ],
      lsg:[
        {move:'groove',formation:'line',focus:'Rosé',poses:['sing','dance','dance','sing']},
        {move:'step-left',formation:'line',focus:'Jennie',poses:['left','right','left','right']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','heart','dance','heart']},
        {move:'accent',formation:'center',focus:'Lisa',poses:['sing','point','point','sing']},
        {move:'split',formation:'diamond',focus:'group',poses:['left','dance','dance','right']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','win','win','heart']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','point','point','sing']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','heart','heart','dance']},
        {move:'finale',formation:'center',focus:'group',poses:['sing','heart','heart','sing']}
      ],
      icecream:[
        {move:'bounce',formation:'line',focus:'Jennie',poses:['heart','dance','dance','heart']},
        {move:'step-right',formation:'line',focus:'Lisa',poses:['right','left','right','left']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','heart','heart','heart']},
        {move:'split',formation:'diamond',focus:'Rosé',poses:['left','point','sing','right']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','dance','heart','heart']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','point','point','sing']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','dance','dance','heart']},
        {move:'accent',formation:'center',focus:'group',poses:['point','heart','heart','point']},
        {move:'finale',formation:'center',focus:'group',poses:['heart','heart','win','win']}
      ],
      foreveryoung:[
        {move:'bounce',formation:'line',focus:'group',poses:['heart','dance','dance','heart']},
        {move:'step-right',formation:'line',focus:'Jennie',poses:['right','left','right','left']},
        {move:'groove',formation:'center',focus:'Jisoo',poses:['sing','dance','dance','sing']},
        {move:'travel',formation:'diamond',focus:'group',poses:['run','run','run','run']},
        {move:'split',formation:'diamond',focus:'Lisa',poses:['left','heart','heart','right']},
        {move:'bounce',formation:'center',focus:'Rosé',poses:['dance','sing','sing','dance']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'group',poses:['heart','point','point','heart']},
        {move:'bounce',formation:'line',focus:'group',poses:['dance','heart','heart','dance']},
        {move:'finale',formation:'center',focus:'group',poses:['heart','win','win','heart']}
      ],
      readyforlove:[
        {move:'groove',formation:'line',focus:'Rosé',poses:['sing','dance','sing','dance']},
        {move:'step-left',formation:'line',focus:'Jisoo',poses:['left','right','left','right']},
        {move:'bounce',formation:'center',focus:'group',poses:['heart','heart','dance','dance']},
        {move:'split',formation:'diamond',focus:'Jennie',poses:['left','sing','heart','right']},
        {move:'groove',formation:'center',focus:'group',poses:['dance','dance','sing','sing']},
        {move:'accent',formation:'center',focus:'Lisa',poses:['point','dance','heart','point']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'bounce',formation:'diamond',focus:'Rosé',poses:['heart','dance','sing','heart']},
        {move:'accent',formation:'center',focus:'group',poses:['sing','heart','heart','sing']},
        {move:'finale',formation:'center',focus:'group',poses:['heart','heart','win','win']}
      ],
      jump:[
        {move:'accent',formation:'line',focus:'group',poses:['point','point','dance','dance']},
        {move:'travel',formation:'diamond',focus:'Lisa',poses:['run','run','run','run']},
        {move:'bounce',formation:'center',focus:'group',poses:['dance','win','dance','win']},
        {move:'step-right',formation:'line',focus:'Jennie',poses:['right','left','right','left']},
        {move:'accent',formation:'center',focus:'group',poses:['point','point','point','point']},
        {move:'split',formation:'diamond',focus:'Rosé',poses:['left','kick','sing','right']},
        {move:'travel',formation:'line',focus:'group',poses:['run','run','run','run']},
        {move:'accent',formation:'center',focus:'Jisoo',poses:['sing','kick','point','kick']},
        {move:'bounce',formation:'line',focus:'group',poses:['win','dance','dance','win']},
        {move:'finale',formation:'center',focus:'group',poses:['win','point','point','win']}
      ]
    };
    const songTimelines={
      hylt:[
        {to:.07,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.20,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.30,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.43,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.57,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.67,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.79,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.89,key:'bridge',label:'DANCE BREAK',r:[7,6],crowd:'wave'},
        {to:.97,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      pinkvenom:[
        {to:.08,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.21,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.31,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.43,key:'chorus',label:'HOOK',r:[4,5],crowd:'flash'},
        {to:.58,key:'rap',label:'RAP BREAK',r:[6,1],crowd:'pulse'},
        {to:.68,key:'pre-chorus',label:'VOCAL LIFT',r:[3],crowd:'wave'},
        {to:.81,key:'chorus',label:'HOOK',r:[4,5],crowd:'flash'},
        {to:.90,key:'bridge',label:'BREAKDOWN',r:[7,6],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL HOOK',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      shutdown:[
        {to:.07,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.22,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.34,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.46,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.61,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.72,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.84,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.92,key:'bridge',label:'BREAKDOWN',r:[7],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      ktl:[
        {to:.06,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.19,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.30,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.43,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.58,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.68,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.80,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.90,key:'bridge',label:'MARCH BREAK',r:[7,6],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      d4:[
        {to:.07,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.20,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.31,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.44,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.59,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.69,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.81,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.90,key:'bridge',label:'DANCE BREAK',r:[7,6],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      boombayah:[
        {to:.07,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.20,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.31,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.44,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.58,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.68,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.80,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.90,key:'bridge',label:'PARTY BREAK',r:[7,6],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      whistle:[
        {to:.08,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.22,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.33,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.45,key:'chorus',label:'HOOK',r:[4,5],crowd:'flash'},
        {to:.60,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.71,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.83,key:'chorus',label:'HOOK',r:[4,5],crowd:'flash'},
        {to:.91,key:'bridge',label:'WHISTLE BREAK',r:[7],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL HOOK',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      pwf:[
        {to:.08,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.22,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.34,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.47,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.61,key:'verse',label:'VERSE 2',r:[6,1],crowd:'pulse'},
        {to:.72,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.84,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.92,key:'bridge',label:'BRIDGE',r:[7],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      stay:[
        {to:.09,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.24,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.36,key:'pre-chorus',label:'LIFT',r:[3],crowd:'wave'},
        {to:.49,key:'chorus',label:'CHORUS',r:[4,5],crowd:'wave'},
        {to:.63,key:'verse',label:'VERSE 2',r:[6,1],crowd:'pulse'},
        {to:.74,key:'pre-chorus',label:'LIFT',r:[3],crowd:'wave'},
        {to:.86,key:'chorus',label:'CHORUS',r:[4,5],crowd:'wave'},
        {to:.93,key:'bridge',label:'BRIDGE',r:[7],crowd:'pulse'},
        {to:.985,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'wave'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'pulse'}
      ],
      aiiyl:[
        {to:.07,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.20,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.31,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.44,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.58,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.69,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.81,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.90,key:'bridge',label:'BRIDGE',r:[7],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      lsg:[
        {to:.07,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.20,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.31,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.44,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.59,key:'verse',label:'VERSE 2',r:[6,1],crowd:'pulse'},
        {to:.70,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.82,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.91,key:'bridge',label:'BRIDGE',r:[7],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      icecream:[
        {to:.08,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.22,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.34,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.47,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.61,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.72,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.84,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.92,key:'bridge',label:'BREAKDOWN',r:[7],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      foreveryoung:[
        {to:.06,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.19,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.30,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.43,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.57,key:'verse',label:'VERSE 2',r:[6,1],crowd:'pulse'},
        {to:.68,key:'pre-chorus',label:'PRE-CHORUS',r:[3],crowd:'wave'},
        {to:.80,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.90,key:'bridge',label:'DANCE BREAK',r:[7,6],crowd:'wave'},
        {to:.98,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      readyforlove:[
        {to:.08,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.22,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.34,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.47,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.61,key:'verse',label:'VERSE 2',r:[6,1],crowd:'pulse'},
        {to:.72,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.84,key:'chorus',label:'CHORUS',r:[4,5],crowd:'flash'},
        {to:.92,key:'bridge',label:'BRIDGE',r:[7],crowd:'wave'},
        {to:.985,key:'final-chorus',label:'FINAL CHORUS',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ],
      jump:[
        {to:.06,key:'intro',label:'INTRO',r:[0],crowd:'pulse'},
        {to:.19,key:'verse',label:'VERSE',r:[1,2],crowd:'pulse'},
        {to:.29,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.41,key:'chorus',label:'DROP / CHORUS',r:[4,5],crowd:'flash'},
        {to:.56,key:'rap',label:'RAP / VERSE',r:[6,1],crowd:'pulse'},
        {to:.66,key:'pre-chorus',label:'BUILD',r:[3],crowd:'wave'},
        {to:.78,key:'chorus',label:'DROP / CHORUS',r:[4,5],crowd:'flash'},
        {to:.88,key:'bridge',label:'DANCE BREAK',r:[7,6],crowd:'wave'},
        {to:.97,key:'final-chorus',label:'FINAL DROP',r:[8,9],crowd:'flash'},
        {to:1,key:'outro',label:'OUTRO',r:[9],crowd:'wave'}
      ]
    };
    /* v78: timed vocal-camera maps for the official video playback. */
    const vocalFocusMaps={
      hylt:[[.05,'Jennie'],[.10,'Jisoo'],[.16,'Rosé'],[.22,'Lisa'],[.28,'Jennie'],[.34,'Jisoo'],[.40,'Rosé'],[.47,'group'],[.53,'Jennie'],[.59,'Lisa'],[.65,'Jisoo'],[.71,'Rosé'],[.78,'group'],[.84,'Lisa'],[.90,'Rosé'],[.96,'group'],[1,'group']],
      pinkvenom:[[.05,'Jennie'],[.11,'Lisa'],[.17,'Jisoo'],[.23,'Rosé'],[.29,'group'],[.35,'Jennie'],[.42,'Lisa'],[.49,'group'],[.55,'Jennie'],[.61,'Lisa'],[.67,'Jisoo'],[.73,'Rosé'],[.80,'group'],[.87,'Jennie'],[.93,'Lisa'],[1,'group']],
      shutdown:[[.06,'Jennie'],[.13,'Lisa'],[.20,'Jisoo'],[.27,'Rosé'],[.34,'Jennie'],[.41,'Lisa'],[.48,'group'],[.55,'Jisoo'],[.62,'Rosé'],[.69,'Jennie'],[.76,'Lisa'],[.83,'group'],[.90,'Jisoo'],[.96,'Rosé'],[1,'group']],
      ktl:[[.05,'Jennie'],[.11,'Jisoo'],[.17,'Rosé'],[.23,'Lisa'],[.30,'Jisoo'],[.36,'Rosé'],[.43,'group'],[.50,'Jennie'],[.57,'Lisa'],[.64,'Jisoo'],[.71,'Rosé'],[.78,'group'],[.85,'Lisa'],[.92,'Jennie'],[.97,'group'],[1,'group']],
      d4:[[.05,'Jennie'],[.11,'Jisoo'],[.17,'Rosé'],[.23,'Lisa'],[.30,'Jennie'],[.36,'Lisa'],[.43,'group'],[.50,'Jisoo'],[.57,'Rosé'],[.64,'Jennie'],[.71,'Lisa'],[.78,'group'],[.85,'Jisoo'],[.91,'Rosé'],[.97,'group'],[1,'group']],
      boombayah:[[.05,'Jennie'],[.11,'Lisa'],[.17,'Jisoo'],[.23,'Rosé'],[.30,'group'],[.36,'Jennie'],[.42,'Lisa'],[.49,'group'],[.56,'Jisoo'],[.63,'Rosé'],[.70,'Jennie'],[.77,'Lisa'],[.84,'group'],[.91,'Jennie'],[.96,'Lisa'],[1,'group']],
      whistle:[[.06,'Jennie'],[.13,'Lisa'],[.20,'Jisoo'],[.27,'Rosé'],[.34,'Jennie'],[.41,'Lisa'],[.48,'group'],[.55,'Jisoo'],[.62,'Rosé'],[.69,'Jennie'],[.76,'Lisa'],[.83,'group'],[.90,'Rosé'],[.96,'Jisoo'],[1,'group']],
      pwf:[[.06,'Jennie'],[.13,'Jisoo'],[.20,'Rosé'],[.27,'Lisa'],[.34,'Jisoo'],[.41,'Rosé'],[.48,'group'],[.55,'Jennie'],[.62,'Lisa'],[.69,'Jisoo'],[.76,'Rosé'],[.83,'group'],[.90,'Jennie'],[.96,'Lisa'],[1,'group']],
      stay:[[.07,'Jisoo'],[.14,'Rosé'],[.21,'Jennie'],[.28,'Lisa'],[.35,'Jisoo'],[.42,'Rosé'],[.49,'group'],[.56,'Jennie'],[.63,'Lisa'],[.70,'Jisoo'],[.77,'Rosé'],[.84,'group'],[.91,'Jisoo'],[.97,'Rosé'],[1,'group']],
      aiiyl:[[.05,'Jennie'],[.11,'Jisoo'],[.17,'Rosé'],[.23,'Lisa'],[.30,'group'],[.36,'Jennie'],[.43,'Lisa'],[.50,'Jisoo'],[.57,'Rosé'],[.64,'group'],[.71,'Jennie'],[.78,'Lisa'],[.85,'Jisoo'],[.92,'Rosé'],[.97,'group'],[1,'group']],
      lsg:[[.05,'Jennie'],[.11,'Rosé'],[.17,'Jisoo'],[.23,'Lisa'],[.30,'Jennie'],[.36,'Rosé'],[.43,'group'],[.50,'Jisoo'],[.57,'Lisa'],[.64,'Jennie'],[.71,'Rosé'],[.78,'group'],[.85,'Jisoo'],[.91,'Rosé'],[.97,'group'],[1,'group']],
      icecream:[[.06,'group'],[.12,'Jennie'],[.18,'Lisa'],[.24,'group'],[.30,'Jisoo'],[.36,'Rosé'],[.42,'group'],[.49,'Jennie'],[.56,'Lisa'],[.63,'group'],[.70,'Rosé'],[.77,'Jisoo'],[.84,'group'],[.91,'Lisa'],[.97,'group'],[1,'group']],
      foreveryoung:[[.07,'Jennie'],[.14,'Jisoo'],[.21,'Rosé'],[.28,'Lisa'],[.36,'group'],[.43,'Jennie'],[.50,'Rosé'],[.57,'Jisoo'],[.64,'Lisa'],[.72,'group'],[.80,'Rosé'],[.87,'Jennie'],[.94,'group'],[1,'group']],
      readyforlove:[[.07,'Rosé'],[.14,'Jisoo'],[.21,'Jennie'],[.28,'Lisa'],[.36,'group'],[.44,'Rosé'],[.52,'Jennie'],[.60,'Jisoo'],[.68,'Lisa'],[.76,'group'],[.84,'Rosé'],[.92,'group'],[1,'group']],
      jump:[[.07,'Jennie'],[.14,'Lisa'],[.21,'Jisoo'],[.28,'Rosé'],[.35,'group'],[.43,'Jennie'],[.51,'Lisa'],[.59,'group'],[.67,'Jisoo'],[.75,'Rosé'],[.83,'group'],[.91,'Lisa'],[.97,'group'],[1,'group']]
    };
    function vocalFocusFor(trackKey,progress=currentSongProgress){
      const map=vocalFocusMaps[trackKey]||[];
      if(!map.length)return 'group';
      const p=clamp(Number(progress||0),0,1);
      const hit=map.find(([to])=>p<=to)||map[map.length-1];
      return hit?.[1]||'group';
    }
    function vocalFocusLabel(){return currentVocalMember==='group'?'GROUP / FEATURE':'NOW SINGING · '+currentVocalMember.toUpperCase();}
    function vocalFocusMarkup(){return `<div class="concert-vocal-chip ${currentVocalMember==='group'?'is-group':''}" id="concertVocalChip"><small>VOCAL CAM</small><b>${vocalFocusLabel()}</b><em>${autoVocalCam?'AUTO':'MANUAL'}</em></div>`;}
    function landscapeMemberCamMember(){
      if(!landscapeMemberCamEnabled)return '';
      if(members.includes(currentVocalMember))return currentVocalMember;
      if(members.includes(focus))return focus;
      return '';
    }
    function landscapeMemberCamMarkup(){
      const m=landscapeMemberCamMember();
      if(!m)return `<aside class="concert-member-cam is-empty" id="concertMemberCam" data-member="" aria-hidden="true"></aside>`;
      const pose=currentPoses[m]||'idle';
      const variant=memberSpriteSheetVariant(m,pose,{section:currentSectionKey,focusName:focus,phase:showPhase});
      return `<aside class="concert-member-cam active member-${spriteKey(m)}" id="concertMemberCam" data-member="${spriteKey(m)}" aria-hidden="false"><div class="concert-member-cam-head"><small>MEMBER CAM</small><em>${members.includes(currentVocalMember)?'LIVE VOCAL':'MANUAL FOCUS'}</em></div><div class="concert-member-cam-frame">${pixelAvatar(m,false,pose,null,variant,true)}</div><div class="concert-member-cam-copy"><b>${m}</b><span>${currentSectionLabel}</span></div></aside>`;
    }
    function updateLandscapeMemberCamInPlace(host=document.getElementById('concertStage')){
      if(!host)return;
      const member=landscapeMemberCamMember();
      const key=member?spriteKey(member):'';
      let cam=host.querySelector('#concertMemberCam');
      if(!cam){host.insertAdjacentHTML('beforeend',landscapeMemberCamMarkup());return;}
      if((cam.dataset.member||'')!==key){cam.outerHTML=landscapeMemberCamMarkup();return;}
      cam.classList.toggle('is-empty',!member);
      cam.classList.toggle('active',!!member);
      cam.setAttribute('aria-hidden',String(!member));
      if(!member)return;
      const pose=currentPoses[member]||'idle';
      updateAvatarInPlace(cam.querySelector('.pixel-avatar'),member,pose);
      const mode=cam.querySelector('.concert-member-cam-head em');if(mode)mode.textContent=members.includes(currentVocalMember)?'LIVE VOCAL':'MANUAL FOCUS';
      const name=cam.querySelector('.concert-member-cam-copy b');if(name)name.textContent=member;
      const section=cam.querySelector('.concert-member-cam-copy span');if(section)section.textContent=currentSectionLabel;
      syncLandscapeMemberCamFrame(host);
    }
    function syncLandscapeMemberCamFrame(host=document.getElementById('concertStage')){
      if(!host||!concertLandscapeActive()||!landscapeMemberCamEnabled)return;
      const cam=host.querySelector('#concertMemberCam.active');
      const key=cam?.dataset.member||'';
      if(!cam||!key)return;
      const source=host.querySelector(`.concert-band .concert-performer[data-member="${key}"] .pixel-sheet-viewport`);
      const target=cam.querySelector('.pixel-sheet-viewport');
      if(!source||!target)return;
      try{
        const style=getComputedStyle(source);
        const atlas=source.style.getPropertyValue('--pv-live-atlas');
        if(atlas)target.style.setProperty('--pv-live-atlas',atlas);
        target.style.setProperty('animation','none','important');
        target.style.setProperty('background-position',style.backgroundPosition,'important');
        target.style.setProperty('background-size',style.backgroundSize||'800% 400%','important');
      }catch{}
    }
    function updateVocalChipInPlace(host=document.getElementById('concertStage')){
      if(!host)return;
      let chip=host.querySelector('#concertVocalChip');
      if(!chip){host.insertAdjacentHTML('beforeend',vocalFocusMarkup());return;}
      chip.classList.toggle('is-group',currentVocalMember==='group');
      const b=chip.querySelector('b');if(b)b.textContent=vocalFocusLabel();
      const em=chip.querySelector('em');if(em)em.textContent=autoVocalCam?'AUTO':'MANUAL';
    }

    function timelineFor(track=currentTrack()){return songTimelines[track.key]||songTimelines.hylt;}
    function resolveSection(progress){
      const timeline=timelineFor();
      const idx=Math.max(0,timeline.findIndex(s=>progress<=s.to));
      return {section:timeline[idx<0?timeline.length-1:idx],index:idx<0?timeline.length-1:idx,timeline};
    }

    const scoreEstimate=()=>clamp(Math.round(22+completed*12+Math.min(interactions*1.35,20)+directorClears*5+Math.min(vibe*.20,20)+(directorMode==='live'?Math.min(liveDirectorScore/30+livePower*.06,24):0)+(finaleShown?5:0)),0,100);

    function setPose(kind){
      if(kind==='wave')currentPoses={Jisoo:'left',Jennie:'right','Rosé':'left',Lisa:'right'};
      else if(kind==='burst'||kind==='pose')currentPoses={Jisoo:'win',Jennie:'win','Rosé':'win',Lisa:'win'};
      else if(kind==='run')currentPoses={Jisoo:'run',Jennie:'run','Rosé':'run',Lisa:'run'};
      else if(kind==='dance')currentPoses={Jisoo:'dance',Jennie:'dance','Rosé':'dance',Lisa:'dance'};
      else if(kind==='focus')currentPoses=Object.fromEntries(members.map(m=>[m,m===focus?'sing':'idle']));
      else if(kind==='heart')currentPoses={Jisoo:'heart',Jennie:'heart','Rosé':'heart',Lisa:'heart'};
      else if(kind==='point')currentPoses={Jisoo:'point',Jennie:'point','Rosé':'point',Lisa:'point'};
      else if(kind==='sing')currentPoses={Jisoo:'sing',Jennie:'sing','Rosé':'sing',Lisa:'sing'};
      else if(kind==='bow')currentPoses={Jisoo:'bow',Jennie:'bow','Rosé':'bow',Lisa:'bow'};
      else currentPoses={Jisoo:'idle',Jennie:'idle','Rosé':'idle',Lisa:'idle'};
    }
    function performerStageClass(member,index){
      const extra=[];
      const pose=currentPoses[member]||'idle';
      if(showPhase==='intro'){
        if(introMember===member){extra.push('is-entering', index%2===0?'from-left':'from-right');}
        else extra.push('is-holding');
      }
      if(showPhase==='transition')extra.push('is-exit');
      extra.push(`member-${spriteKey(member)}`);
      extra.push(`outfit-${spriteOutfitFor(member)}`);
      if(showPhase==='live'){
        extra.push(`move-${liveMove}`,`slot-${index+1}`);
        const focusMode=focus===member?'dance-individual':(focus==='group'?'dance-group':'dance-support');
        extra.push(focusMode);
        if(focus===member)extra.push(`solo-${spriteKey(member)}`,`solo-section-${slug(currentSectionKey)}`);
        if(['signature','center-solo','solo-swap'].includes(liveMove))extra.push('signature-active');
      }
      if(stagePulse===0)extra.push('on-downbeat');
      if(pose==='dance')extra.push('is-groove');
      if(pose==='run')extra.push('is-motion');
      if(pose==='left')extra.push('is-left');
      if(pose==='right')extra.push('is-right');
      if(pose==='win'||pose==='pose')extra.push('is-accent');
      if(pose==='sing')extra.push('is-sing');
      if(pose==='point')extra.push('is-point');
      if(pose==='heart')extra.push('is-heart');
      if(pose==='bow'||pose==='final')extra.push('is-bow');
      if(pose==='sway')extra.push('is-sway');
      if(pose==='turn')extra.push('is-turn');
      if(pose==='kick')extra.push('is-kick');
      if(pose==='hop')extra.push('is-hop');
      if(pose==='sweep')extra.push('is-sweep');
      return extra.join(' ');
    }
    const liveMoveVariants={
      groove:['groove','sway','dip','ripple','mark','body-roll','wave-line'],
      travel:['travel','slide-left','slide-right','cross','sweep-left','sweep-right','duo-link'],
      'step-left':['step-left','slide-left','sway','ripple'],
      'step-right':['step-right','slide-right','sway','ripple'],
      accent:['accent','spot-pop','hop','kick','snap-turn'],
      bounce:['bounce','hop','sway','ripple','body-roll','freestyle'],
      split:['split','cross','turn','ripple','duo-link'],
      finale:['finale','spot-pop','hop','kick','freestyle','snap-turn']
    };
    function variedLiveMove(baseMove,beatIndex,routineIndex,phraseSlot){
      const options=liveMoveVariants[baseMove]||[baseMove];
      const seed=Math.abs(Math.floor(beatIndex/2)+routineIndex*2+phraseSlot+currentSectionIndex);
      return options[seed%options.length]||baseMove;
    }
    const memberMotionProfiles={
      Jisoo:{accent:['sway','turn','pose','sing'], groove:['dance','sway','heart'], travel:['left','right','turn']},
      Jennie:{accent:['point','kick','pose','win'], groove:['dance','point','kick'], travel:['left','right','kick']},
      'Rosé':{accent:['sing','sway','turn','heart'], groove:['dance','sway','sing'], travel:['left','right','sway']},
      Lisa:{accent:['kick','hop','point','turn'], groove:['dance','hop','kick'], travel:['run','left','right']}
    };
    function profilePick(member,bucket,indexSeed){
      const outfit=spriteOutfitFor(member);
      const arr=[...(memberMotionProfiles[member]?.[bucket]||['dance'])];
      if(outfit==='pink'){
        if(bucket==='accent')arr.push('heart','sing');
        if(bucket==='groove')arr.push('sway','heart');
      }else if(outfit==='noir'){
        if(bucket==='accent')arr.push('pose','point','kick');
        if(bucket==='groove')arr.push('point');
        if(bucket==='travel')arr.push('turn');
      }else if(outfit==='encore'){
        if(bucket==='accent')arr.unshift('final','heart','bow');
        if(bucket==='groove')arr.push('heart','win');
        if(bucket==='travel')arr.push('sway');
      }
      return arr[Math.abs(indexSeed)%arr.length]||arr[0]||'dance';
    }
    function outfitPoseAdjust(member,move,sectionKey,focused,cycle){
      const outfit=spriteOutfitFor(member);
      if(outfit==='encore'){
        if(move==='finale' || sectionKey==='outro')return focused?(cycle%3===0?'final':'heart'):(cycle%2===0?'heart':'bow');
        if(move==='center-solo' && focused)return member==='Rosé'?'sing':'heart';
        if(['bounce','hop'].includes(move) && cycle%2===1)return member==='Lisa'?'hop':'heart';
      }
      if(outfit==='noir'){
        if(move==='signature')return member==='Jennie'?'point':member==='Lisa'?'kick':member==='Rosé'?'turn':'pose';
        if(['accent','kick','spot-pop'].includes(move))return focused?(member==='Rosé'?'turn':'point'):(member==='Lisa'?'kick':'pose');
        if(sectionKey==='rap' && cycle%2===0)return member==='Jennie'?'point':'pose';
      }
      if(outfit==='pink'){
        if(['pre-chorus','bridge'].includes(sectionKey) && focused)return member==='Rosé'?'sing':'sway';
        if(move==='groove' && cycle===5)return member==='Jisoo'?'heart':member==='Rosé'?'sway':'dance';
      }
      return '';
    }

    const choreoClipLibrary={
      power:{
        intro:['mark','ripple','accent','pose-hit'],
        verse:['groove','step-left','accent','step-right'],
        rap:['groove','hitline','step-left','accent'],
        'pre-chorus':['sway','ripple','center-solo','accent'],
        chorus:['hitline','mirror','bounce','ripple'],
        bridge:['dancebreak','turn-chain','signature','solo-swap'],
        'final-chorus':['hitline','signature','ripple','finale'],
        outro:['sway','signature','finale','pose-hit']
      },
      sharp:{
        intro:['pose-hit','mark','accent','ripple'],
        verse:['step-right','groove','hitline','step-left'],
        rap:['hitline','step-right','signature','accent'],
        'pre-chorus':['sway','center-solo','ripple','accent'],
        chorus:['mirror','hitline','kick-line','ripple'],
        bridge:['dancebreak','kick-line','turn-chain','signature'],
        'final-chorus':['hitline','kick-line','signature','finale'],
        outro:['signature','pose-hit','finale','mark']
      },
      march:{
        intro:['mark','hitline','mark','accent'],
        verse:['step-left','step-right','groove','hitline'],
        rap:['hitline','travel','accent','signature'],
        'pre-chorus':['sway','ripple','center-solo','accent'],
        chorus:['hitline','mirror','travel','hitline'],
        bridge:['dancebreak','travel','turn-chain','signature'],
        'final-chorus':['hitline','travel','signature','finale'],
        outro:['pose-hit','signature','finale','mark']
      },
      party:{
        intro:['bounce','ripple','groove','pose-hit'],
        verse:['groove','step-left','bounce','step-right'],
        rap:['travel','hitline','bounce','accent'],
        'pre-chorus':['sway','ripple','bounce','accent'],
        chorus:['bounce','mirror','ripple','hitline'],
        bridge:['dancebreak','solo-swap','signature','turn-chain'],
        'final-chorus':['bounce','signature','hitline','finale'],
        outro:['bounce','pose-hit','signature','finale']
      },
      flow:{
        intro:['sway','mark','ripple','pose-hit'],
        verse:['sway','groove','step-left','groove'],
        rap:['groove','step-right','accent','sway'],
        'pre-chorus':['sway','center-solo','ripple','accent'],
        chorus:['mirror','sway','ripple','hitline'],
        bridge:['turn-chain','center-solo','signature','sway'],
        'final-chorus':['ripple','signature','hitline','finale'],
        outro:['sway','signature','pose-hit','finale']
      },
      summer:{
        intro:['bounce','sway','ripple','pose-hit'],
        verse:['groove','step-right','bounce','step-left'],
        rap:['groove','hitline','sway','accent'],
        'pre-chorus':['sway','ripple','center-solo','accent'],
        chorus:['bounce','mirror','ripple','hitline'],
        bridge:['solo-swap','turn-chain','signature','bounce'],
        'final-chorus':['bounce','signature','ripple','finale'],
        outro:['sway','pose-hit','signature','finale']
      }
    };
    const songChoreoStyle={
      hylt:'power',pinkvenom:'sharp',shutdown:'sharp',ktl:'march',d4:'power',boombayah:'party',
      whistle:'flow',pwf:'flow',stay:'flow',aiiyl:'summer',lsg:'flow',icecream:'summer',foreveryoung:'summer',readyforlove:'flow',jump:'party'
    };
    const songSignaturePlans={
      hylt:{chorus:['hook-power','duo-link','hook-power','wave-line'],bridge:['solo-swap','hook-power','freestyle','trio-roll'],'final-chorus':['hook-power','kick-line','duo-link','finale']},
      pinkvenom:{chorus:['hook-venom','snap-turn','duo-link','hook-venom'],bridge:['hook-venom','solo-swap','freestyle','trio-roll'],'final-chorus':['hook-venom','hitline','duo-link','finale']},
      shutdown:{chorus:['hook-glide','duo-link','hook-glide','snap-turn'],bridge:['trio-roll','hook-glide','center-solo','solo-swap'],'final-chorus':['hook-glide','wave-line','duo-link','finale']},
      ktl:{chorus:['hook-march','hitline','hook-march','duo-link'],bridge:['trio-roll','kick-line','center-solo','hook-march'],'final-chorus':['hook-march','kick-line','duo-link','finale']},
      d4:{chorus:['hook-point','hitline','duo-link','hook-point'],bridge:['solo-swap','hook-point','dancebreak','trio-roll'],'final-chorus':['hook-point','hitline','kick-line','finale']},
      boombayah:{chorus:['hook-jump','duo-link','hook-jump','wave-line'],bridge:['freestyle','trio-roll','solo-swap','hook-jump'],'final-chorus':['hook-jump','bounce','duo-link','finale']},
      whistle:{chorus:['hook-whistle','wave-line','duo-link','hook-whistle'],bridge:['trio-roll','hook-whistle','center-solo','solo-swap'],'final-chorus':['hook-whistle','ripple','duo-link','finale']},
      pwf:{chorus:['hook-flame','wave-line','duo-link','hook-flame'],bridge:['hook-flame','center-solo','trio-roll','solo-swap'],'final-chorus':['hook-flame','turn-chain','duo-link','finale']},
      stay:{chorus:['hook-soft','duo-link','hook-soft','wave-line'],bridge:['trio-roll','center-solo','hook-soft','solo-swap'],'final-chorus':['hook-soft','heart','duo-link','finale']},
      aiiyl:{chorus:['hook-heart','duo-link','hook-heart','bounce'],bridge:['freestyle','trio-roll','solo-swap','hook-heart'],'final-chorus':['hook-heart','wave-line','duo-link','finale']},
      lsg:{chorus:['hook-run','duo-link','hook-run','hitline'],bridge:['trio-roll','hook-run','center-solo','solo-swap'],'final-chorus':['hook-run','ripple','duo-link','finale']},
      icecream:{chorus:['hook-pop','duo-link','hook-pop','bounce'],bridge:['hook-pop','trio-roll','solo-swap','freestyle'],'final-chorus':['hook-pop','wave-line','duo-link','finale']},
      foreveryoung:{chorus:['hook-heart','duo-link','hook-jump','wave-line'],bridge:['freestyle','trio-roll','solo-swap','hook-heart'],'final-chorus':['hook-heart','bounce','duo-link','finale']},
      readyforlove:{chorus:['hook-soft','duo-link','hook-heart','wave-line'],bridge:['trio-roll','center-solo','hook-soft','solo-swap'],'final-chorus':['hook-heart','ripple','duo-link','finale']},
      jump:{chorus:['hook-jump','hitline','duo-link','hook-jump'],bridge:['dancebreak','kick-line','solo-swap','trio-roll'],'final-chorus':['hook-jump','hitline','kick-line','finale']}
    };
    function songSignatureMove(trackKey,sectionKey,beatIndex){
      const plan=songSignaturePlans[trackKey];
      if(!plan)return '';
      const key=plan[sectionKey]?sectionKey:(sectionKey==='breakdown'?'bridge':sectionKey);
      const seq=plan[key];
      if(!seq?.length)return '';
      const slot=Math.floor((((beatIndex%8)+8)%8)/2)%seq.length;
      return seq[slot]||'';
    }
    function songClipMove(trackKey,sectionKey,beatIndex,fallbackMove){
      const signature=songSignatureMove(trackKey,sectionKey,beatIndex);
      if(signature)return signature;
      const style=songChoreoStyle[trackKey]||'power';
      const plan=choreoClipLibrary[style]||choreoClipLibrary.power;
      const key=plan[sectionKey]?sectionKey:(sectionKey==='verse-2'?'verse':sectionKey==='breakdown'?'bridge':'verse');
      const clip=plan[key]||plan.verse;
      const slot=Math.floor((((beatIndex%8)+8)%8)/2)%clip.length;
      return clip[slot]||fallbackMove||'groove';
    }
    function expressiveFormation(baseFormation,move,beatIndex,sectionKey,trackKey=currentTrack().key,focusTarget=focus){
      const cycle=((beatIndex%8)+8)%8;
      if(move==='duo-link')return cycle>=4?'duo-cross':'duo-pairs';
      if(move==='trio-roll')return focusTarget!=='group'?'trio-back':'trio-arc';
      if(['center-solo','signature','solo-swap'].includes(move))return focusTarget!=='group'?'solo-front':'center';
      if(String(move).startsWith('hook-')){
        if(['shutdown','whistle','stay'].includes(trackKey))return cycle>=4?'trio-arc':'center';
        if(['boombayah','aiiyl','icecream'].includes(trackKey))return cycle>=4?'duo-pairs':'diamond';
        return cycle>=4?'center':'line';
      }
      if(['travel','sweep-left','sweep-right','slide-left','slide-right','cross'].includes(move))return cycle>=4?'diamond':'line';
      if(['split','mirror'].includes(move))return cycle>=4?'center':'diamond';
      if(['dancebreak','turn-chain','kick-line','body-roll','wave-line','snap-turn','freestyle'].includes(move))return cycle>=4?'diamond':'line';
      if(move==='hitline')return 'line';
      if(sectionKey==='bridge'&&focusTarget!=='group')return 'trio-back';
      if(sectionKey==='bridge')return move==='bounce'?'center':'diamond';
      if(sectionKey==='chorus'||sectionKey==='final-chorus')return cycle>=4?'center':(baseFormation||'center');
      return baseFormation||formation;
    }
    function expressiveFocus(baseFocus,beatIndex,sectionKey,move='groove'){
      const rotation=members[Math.abs(Math.floor(beatIndex/2)+currentSectionIndex)%members.length];
      if(['center-solo','signature','solo-swap'].includes(move))return rotation;
      if(move==='duo-link')return members[(Math.abs(Math.floor(beatIndex/2))+1)%members.length];
      if(baseFocus&&baseFocus!=='group')return baseFocus;
      if(sectionKey==='verse'||sectionKey==='rap')return rotation;
      if(sectionKey==='pre-chorus'||sectionKey==='bridge')return members[(Math.abs(Math.floor(beatIndex/2))+1)%members.length];
      return 'group';
    }
    function groupDancePose(member,index,cycle,move){
      const beat=Math.abs(cycle)%6;
      const shared={
        groove:['dance','sway','point','dance','turn','pose'],
        soft:['sway','heart','turn','sway','heart','pose'],
        accent:['point','kick','pose','point','kick','pose'],
        jump:['hop','kick','point','hop','kick','pose'],
        travel:['left','right','turn','left','right','pose']
      };
      let seq=shared.groove;
      if(['body-roll','sway','wave-line','ripple','mark'].includes(move))seq=shared.soft;
      else if(['accent','snap-turn','hitline','kick-line','spot-pop','pose-hit'].includes(move))seq=shared.accent;
      else if(['bounce','hop','dancebreak','freestyle'].includes(move))seq=shared.jump;
      else if(['travel','slide-left','slide-right','cross','sweep-left','sweep-right'].includes(move))seq=shared.travel;
      return seq[beat]||seq[0];
    }
    function soloDancePose(member,cycle,sectionKey,move){
      const beat=cycle%6;
      if(member==='Jisoo'){
        if(['pre-chorus','bridge'].includes(sectionKey))return ['sing','sway','turn','heart','pose','turn'][beat];
        return ['turn','point','sway','heart','pose','turn'][beat];
      }
      if(member==='Jennie'){
        if(sectionKey==='rap')return ['point','kick','pose','point','kick','pose'][beat];
        return ['point','kick','pose','dance','point','kick'][beat];
      }
      if(member==='Rosé'){
        if(['pre-chorus','bridge'].includes(sectionKey))return ['sing','heart','sway','sing','turn','heart'][beat];
        return ['sing','sway','heart','turn','sing','pose'][beat];
      }
      if(['rap','bridge'].includes(sectionKey))return ['kick','hop','point','turn','kick','point'][beat];
      return ['kick','hop','point','turn','kick','pose'][beat];
    }
    const memberSignatureRoutines={
      Jisoo:['turn','sway','point','heart','turn','pose','sway','heart'],
      Jennie:['point','kick','pose','point','kick','turn','point','pose'],
      'Rosé':['sing','sway','heart','turn','sing','pose','sway','heart'],
      Lisa:['kick','hop','point','turn','kick','hop','pose','kick']
    };
    const memberDanceBreakRoutines={
      Jisoo:['sway','turn','point','turn','heart','pose','turn','sway'],
      Jennie:['point','kick','point','pose','kick','turn','point','kick'],
      'Rosé':['sing','sway','turn','heart','sing','turn','sway','pose'],
      Lisa:['hop','kick','turn','kick','point','hop','kick','turn']
    };
    const trackSignatureOffset={hylt:0,pinkvenom:1,shutdown:2,ktl:3,d4:4,boombayah:5,whistle:1,pwf:2,stay:3,aiiyl:4,lsg:5,icecream:6};
    function memberSignaturePose(member,cycle,trackKey=currentTrack().key){
      const seq=memberSignatureRoutines[member]||memberSignatureRoutines.Jisoo;
      const offset=trackSignatureOffset[trackKey]||0;
      return seq[(cycle+offset)%seq.length]||seq[0];
    }
    function memberDanceBreakPose(member,cycle,trackKey=currentTrack().key){
      const seq=memberDanceBreakRoutines[member]||memberDanceBreakRoutines.Jisoo;
      const offset=(trackSignatureOffset[trackKey]||0)%4;
      return seq[(cycle+offset)%seq.length]||seq[0];
    }

    function songHookPose(move,member,cycle,focused){
      const phase=cycle%4;
      const tables={
        'hook-power':{Jisoo:['turn','sway','pose','turn'],Jennie:['point','kick','pose','point'],'Rosé':['sing','sway','pose','sing'],Lisa:['kick','hop','point','kick']},
        'hook-venom':{Jisoo:['sway','turn','point','pose'],Jennie:['point','pose','kick','point'],'Rosé':['sway','sing','turn','sway'],Lisa:['kick','turn','hop','kick']},
        'hook-glide':{Jisoo:['left','sway','right','turn'],Jennie:['right','point','left','pose'],'Rosé':['left','sing','right','sway'],Lisa:['right','turn','left','kick']},
        'hook-march':{Jisoo:['point','sway','pose','turn'],Jennie:['point','kick','point','pose'],'Rosé':['point','sing','sway','pose'],Lisa:['kick','point','hop','kick']},
        'hook-point':{Jisoo:['point','pose','turn','point'],Jennie:['point','kick','point','pose'],'Rosé':['point','sing','sway','point'],Lisa:['point','kick','hop','point']},
        'hook-jump':{Jisoo:['heart','sway','hop','heart'],Jennie:['point','hop','kick','pose'],'Rosé':['heart','sing','sway','heart'],Lisa:['hop','kick','hop','point']},
        'hook-whistle':{Jisoo:['sway','point','turn','sway'],Jennie:['point','pose','sway','point'],'Rosé':['sing','sway','heart','sing'],Lisa:['sway','hop','point','turn']},
        'hook-flame':{Jisoo:['turn','sway','heart','turn'],Jennie:['point','kick','pose','point'],'Rosé':['sway','sing','turn','sway'],Lisa:['kick','turn','hop','kick']},
        'hook-soft':{Jisoo:['sing','sway','heart','sway'],Jennie:['sway','heart','pose','sway'],'Rosé':['sing','heart','sway','sing'],Lisa:['sway','heart','turn','sway']},
        'hook-heart':{Jisoo:['heart','sway','turn','heart'],Jennie:['point','heart','pose','point'],'Rosé':['heart','sing','sway','heart'],Lisa:['hop','heart','kick','hop']},
        'hook-run':{Jisoo:['turn','sway','left','right'],Jennie:['point','right','kick','left'],'Rosé':['sway','sing','left','right'],Lisa:['run','kick','hop','run']},
        'hook-pop':{Jisoo:['heart','point','sway','heart'],Jennie:['point','pose','heart','point'],'Rosé':['heart','sing','sway','heart'],Lisa:['hop','point','kick','hop']}
      };
      const seq=tables[move]?.[member];
      if(!seq)return focused?soloDancePose(member,cycle,currentSectionKey,move):groupDancePose(member,0,cycle,move);
      return seq[phase]||seq[0];
    }

    const trackGroupChoreo={
      hylt:['dance','point','kick','pose','turn','point'],
      pinkvenom:['sway','point','turn','pose','point','kick'],
      shutdown:['point','pose','turn','point','kick','pose'],
      ktl:['point','kick','pose','turn','point','kick'],
      d4:['point','pose','kick','point','turn','pose'],
      boombayah:['hop','point','kick','hop','turn','point'],
      whistle:['sway','point','turn','sway','heart','point'],
      pwf:['turn','sway','point','heart','turn','pose'],
      stay:['sway','heart','sing','sway','heart','pose'],
      aiiyl:['heart','point','sway','turn','heart','point'],
      lsg:['sway','heart','point','turn','sway','heart'],
      icecream:['heart','point','sway','heart','turn','point']
    };
    function sharedSongGroupPose(trackKey,cycle){
      const seq=trackGroupChoreo[trackKey]||trackGroupChoreo.hylt;
      return seq[Math.abs(cycle)%seq.length]||seq[0];
    }

    const trackSignatureChoreo={
      hylt:{chorus:{Jisoo:['turn','point','sway','pose','heart','turn'],Jennie:['point','kick','pose','point','kick','pose'],Rosé:['sing','sway','heart','sing','turn','sing'],Lisa:['kick','hop','point','kick','turn','hop']},solo:{Jisoo:['turn','sway','point','heart','pose','turn'],Jennie:['point','kick','point','pose','kick','point'],Rosé:['sing','heart','sway','sing','turn','heart'],Lisa:['kick','hop','kick','point','turn','kick']}},
      pinkvenom:{chorus:{Jisoo:['sway','turn','point','pose','turn','heart'],Jennie:['point','pose','kick','point','pose','kick'],Rosé:['sway','sing','turn','heart','sing','sway'],Lisa:['kick','turn','hop','kick','point','turn']},solo:{Jisoo:['turn','heart','sway','point','pose','turn'],Jennie:['point','pose','kick','point','kick','pose'],Rosé:['sing','sway','sing','heart','turn','sing'],Lisa:['kick','turn','kick','hop','point','kick']}},
      shutdown:{chorus:{Jisoo:['point','turn','sway','pose','point','turn'],Jennie:['point','pose','point','kick','pose','point'],Rosé:['sing','sway','turn','sing','heart','sway'],Lisa:['kick','point','turn','kick','hop','point']},solo:{Jisoo:['turn','point','pose','heart','turn','point'],Jennie:['point','pose','kick','point','pose','kick'],Rosé:['sing','turn','heart','sing','sway','sing'],Lisa:['kick','point','turn','kick','pose','kick']}},
      ktl:{chorus:{Jisoo:['turn','point','sway','heart','turn','pose'],Jennie:['point','kick','pose','point','kick','point'],Rosé:['sing','sway','sing','heart','pose','sing'],Lisa:['kick','hop','point','kick','turn','kick']},solo:{Jisoo:['turn','heart','sway','turn','point','pose'],Jennie:['point','kick','point','pose','kick','pose'],Rosé:['sing','heart','sway','sing','turn','heart'],Lisa:['kick','hop','kick','point','turn','kick']}},
      d4:{chorus:{Jisoo:['point','turn','sway','point','heart','turn'],Jennie:['point','pose','kick','point','pose','kick'],Rosé:['sing','sway','turn','sing','heart','sway'],Lisa:['kick','point','hop','kick','turn','point']},solo:{Jisoo:['turn','point','heart','pose','turn','point'],Jennie:['point','kick','pose','point','kick','pose'],Rosé:['sing','heart','turn','sing','sway','heart'],Lisa:['kick','hop','point','kick','turn','kick']}},
      boombayah:{chorus:{Jisoo:['heart','sway','turn','point','heart','turn'],Jennie:['point','hop','kick','point','pose','kick'],Rosé:['heart','sing','sway','heart','turn','sing'],Lisa:['hop','kick','point','hop','kick','turn']},solo:{Jisoo:['turn','heart','point','sway','turn','heart'],Jennie:['point','hop','kick','pose','point','kick'],Rosé:['sing','heart','sway','sing','heart','turn'],Lisa:['hop','kick','hop','point','kick','turn']}},
      whistle:{chorus:{Jisoo:['sway','point','turn','sway','heart','turn'],Jennie:['point','pose','sway','point','kick','pose'],Rosé:['sing','sway','heart','sing','turn','sway'],Lisa:['sway','hop','point','turn','kick','point']},solo:{Jisoo:['turn','sway','point','heart','turn','pose'],Jennie:['point','pose','kick','point','pose','kick'],Rosé:['sing','heart','sway','sing','turn','heart'],Lisa:['turn','hop','point','kick','turn','kick']}},
      pwf:{chorus:{Jisoo:['turn','heart','sway','point','turn','heart'],Jennie:['point','pose','kick','point','pose','heart'],Rosé:['sing','heart','sway','sing','turn','heart'],Lisa:['kick','turn','hop','point','kick','turn']},solo:{Jisoo:['turn','heart','sway','turn','point','heart'],Jennie:['point','pose','kick','point','kick','pose'],Rosé:['sing','heart','sing','sway','turn','heart'],Lisa:['kick','hop','turn','point','kick','turn']}},
      stay:{chorus:{Jisoo:['sing','sway','heart','sing','turn','heart'],Jennie:['sway','heart','pose','sway','point','heart'],Rosé:['sing','heart','sway','sing','heart','turn'],Lisa:['sway','heart','turn','sway','point','heart']},solo:{Jisoo:['sing','heart','sway','sing','turn','heart'],Jennie:['heart','sway','pose','heart','point','sway'],Rosé:['sing','heart','sing','sway','turn','heart'],Lisa:['turn','sway','heart','point','turn','heart']}},
      aiiyl:{chorus:{Jisoo:['heart','point','sway','turn','heart','point'],Jennie:['point','pose','heart','kick','point','pose'],Rosé:['heart','sing','sway','heart','turn','sing'],Lisa:['hop','point','kick','hop','turn','point']},solo:{Jisoo:['heart','turn','point','sway','heart','turn'],Jennie:['point','kick','pose','point','heart','kick'],Rosé:['sing','heart','sway','sing','turn','heart'],Lisa:['hop','kick','point','hop','turn','kick']}},
      lsg:{chorus:{Jisoo:['sing','heart','sway','turn','sing','heart'],Jennie:['point','heart','pose','point','kick','heart'],Rosé:['sing','sway','heart','sing','turn','heart'],Lisa:['run','point','hop','kick','run','point']},solo:{Jisoo:['sing','heart','turn','sway','sing','heart'],Jennie:['point','pose','heart','kick','point','pose'],Rosé:['sing','heart','sing','sway','turn','heart'],Lisa:['run','kick','point','hop','run','kick']}},
      icecream:{chorus:{Jisoo:['heart','sway','point','heart','turn','sway'],Jennie:['point','heart','pose','point','kick','heart'],Rosé:['heart','sing','sway','heart','turn','sing'],Lisa:['hop','point','kick','hop','turn','point']},solo:{Jisoo:['heart','turn','sway','point','heart','turn'],Jennie:['point','pose','heart','kick','point','pose'],Rosé:['sing','heart','sway','sing','heart','turn'],Lisa:['hop','kick','point','hop','turn','kick']}}
    };
    function songSpecificPose(trackKey,member,cycle,focused,sectionKey,move){
      const table=trackSignatureChoreo[trackKey];
      if(!table)return '';
      const phase=Math.abs(cycle)%6;
      if(focused && ['pre-chorus','bridge','rap','chorus','final-chorus'].includes(sectionKey)){
        const soloSeq=table.solo?.[member];
        if(soloSeq)return soloSeq[phase]||soloSeq[0];
      }
      if(['chorus','final-chorus'].includes(sectionKey) && !focused){
        return sharedSongGroupPose(trackKey,phase);
      }
      if(String(move).startsWith('hook-') && focused)return songHookPose(move,member,cycle,true);
      return '';
    }

    function expressivePose(basePose,member,index,beatIndex,move,focusName,sectionKey){
      const pose=basePose||'dance';
      const groupCycle=(beatIndex+currentSectionIndex)%8;
      const cycle=(beatIndex+index+currentSectionIndex)%8;
      const focused=focusName===member;
      const accent=profilePick(member,'accent',cycle+index);
      const groove=profilePick(member,'groove',cycle+index);
      const travel=profilePick(member,'travel',cycle+index);
      const outfitPose=outfitPoseAdjust(member,move,sectionKey,focused,cycle);
      const groupSection=['intro','verse','chorus','final-chorus','outro'].includes(sectionKey);
      const groupMove=['groove','ripple','mark','sway','bounce','wave-line','body-roll'].includes(move);
      const featuredMove=['signature','center-solo','solo-swap','freestyle','dancebreak','accent','spot-pop'].includes(move);

      /* RC9 choreography rule:
         - GROUP focus: all four execute the same step on the same beat.
         - MEMBER focus: featured member keeps individual solo choreography,
           while the other three stay synchronized as backup dancers. */
      if(focusName==='group'){
        const groupSong=(['chorus','final-chorus'].includes(sectionKey))?sharedSongGroupPose(currentTrack().key,groupCycle):'';
        return groupSong||groupDancePose(member,0,groupCycle,move);
      }
      if(!focused && members.includes(focusName)){
        const backupSong=songSpecificPose(currentTrack().key,member,groupCycle,false,sectionKey,move);
        return backupSong||groupDancePose(member,0,groupCycle,move);
      }

      if(move==='signature')return outfitPose||memberSignaturePose(member,cycle,currentTrack().key);
      if(move==='dancebreak'&&focused)return outfitPose||memberDanceBreakPose(member,cycle,currentTrack().key);
      if(move==='freestyle'&&focused&&cycle%2===0)return outfitPose||memberDanceBreakPose(member,cycle+2,currentTrack().key);
      const trackSpecific=songSpecificPose(currentTrack().key,member,cycle,focused,sectionKey,move);
      if(trackSpecific && (!outfitPose || ['chorus','final-chorus'].includes(sectionKey) || focused))return trackSpecific;
      if(focusName==='group' && groupSection && groupMove){
        return outfitPose||groupDancePose(member,index,cycle,move);
      }
      if(focused && (featuredMove || ['pre-chorus','bridge','rap'].includes(sectionKey))){
        return outfitPose||soloDancePose(member,cycle,sectionKey,move);
      }
      if(String(move).startsWith('hook-'))return outfitPose||songHookPose(move,member,cycle,focused);
      if(move==='trio-roll')return focused?soloDancePose(member,cycle,sectionKey,move):(index%3===0?'turn':index%3===1?'sway':'point');
      if(move==='signature')return outfitPose||memberSignaturePose(member,cycle,currentTrack().key);
      if(move==='center-solo')return focused?(outfitPose||soloDancePose(member,cycle,sectionKey,move)):(index%2===0?groupDancePose(member,index,cycle,'sway'):'dance');
      if(move==='solo-swap')return focused?(outfitPose||soloDancePose(member,cycle,sectionKey,move)):(index<2?'left':'right');
      if(move==='hitline')return cycle%2===0?(index%2===0?'point':'pose'):'dance';
      if(move==='mirror')return index<2?(cycle%2===0?'left':'right'):(cycle%2===0?'right':'left');
      if(move==='wave-line')return cycle===index?'point':Math.abs(cycle-index)===1?'sway':'dance';
      if(move==='body-roll')return focused?(member==='Rosé'?'sing':'sway'):(index%2===0?'sway':'heart');
      if(move==='snap-turn')return cycle%2===0?(member==='Jennie'?'point':'turn'):(member==='Lisa'?'kick':'pose');
      if(move==='duo-link')return index<2?(cycle%2===0?'left':'point'):(cycle%2===0?'right':'heart');
      if(move==='freestyle'){
        if(member==='Lisa')return cycle%3===0?'hop':'kick';
        if(member==='Jennie')return cycle%3===0?'point':'pose';
        if(member==='Rosé')return cycle%3===0?'sing':'sway';
        return cycle%3===0?'turn':'heart';
      }
      if(move==='kick-line')return member==='Lisa'||member==='Jennie'?'kick':(cycle%2===0?'point':'sway');
      if(move==='turn-chain')return ((cycle-index+8)%4===0)?'turn':'sway';
      if(move==='dancebreak'){
        if(focused)return memberDanceBreakPose(member,cycle,currentTrack().key);
        const support={Jisoo:['sway','turn','point'],Jennie:['point','pose','kick'],'Rosé':['sway','sing','heart'],Lisa:['hop','kick','turn']}[member]||['dance','sway','point'];
        return support[cycle%support.length];
      }
      if(move==='pose-hit')return focused?(outfitPose||soloDancePose(member,cycle,sectionKey,move)):(index%2===0?'pose':'point');
      if(['travel','sweep-left','sweep-right','slide-left','slide-right','cross'].includes(move)){
        if(cycle%4===0)return member==='Lisa'?'run':'turn';
        if(move==='sweep-left' || move==='sweep-right')return 'sweep';
        if(move==='cross')return index<2?'right':'left';
        return travel;
      }
      if(move==='split'){
        if(cycle in {2:1,6:1})return index<2?'left':'right';
        return member==='Jisoo'?'turn':member==='Lisa'?'kick':'sway';
      }
      if(move==='accent' || move==='finale' || move==='spot-pop' || move==='kick'){
        if(outfitPose&&cycle%2===0)return outfitPose;
        if(focused&&cycle%4===0)return accent;
        if(cycle%2===0)return index%2===0?accent:(member==='Rosé'?'sing':'point');
        return member==='Lisa'?'hop':member==='Jisoo'?'turn':'pose';
      }
      if(move==='bounce' || move==='hop'){
        if(cycle%4===1)return member==='Lisa'?'hop':member==='Rosé'?'sing':'heart';
        if(cycle%4===3)return member==='Jennie'?'kick':member==='Jisoo'?'sway':'point';
        return groove;
      }
      if(move==='groove' || move==='ripple' || move==='mark' || move==='sway'){
        if(move==='ripple'){
          if(cycle===index)return accent;
          if(Math.abs(cycle-index)===1)return member==='Jisoo'?'turn':'sway';
        }
        if(focused&&cycle%4===2)return sectionKey==='bridge'?(member==='Rosé'?'sing':'turn'):(member==='Jennie'?'point':accent);
        if(cycle===5)return member==='Lisa'?'hop':member==='Rosé'?'heart':'sway';
        if(focusName==='group')return outfitPose||groupDancePose(member,index,cycle,move);
        return groove;
      }
      if((sectionKey==='chorus'||sectionKey==='final-chorus')){
        if(cycle in {0:1,4:1})return focused?accent:(member==='Lisa'?'hop':'dance');
        if(cycle in {2:1,6:1})return member==='Jennie'?'point':member==='Rosé'?'sing':'pose';
      }
      if(sectionKey==='bridge'){
        if(focused&&cycle===3)return member==='Rosé'?'sing':accent;
        if(cycle===1)return member==='Jisoo'?'turn':'sway';
        if(cycle===5)return member==='Lisa'?'kick':'heart';
      }
      if(sectionKey==='verse' || sectionKey==='rap'){
        if(focused&&cycle===2)return accent;
        if(cycle===6)return member==='Jennie'?'point':member==='Rosé'?'sing':'sway';
      }
      if(outfitPose&&pose==='dance')return outfitPose;
      return pose==='dance'?groove:pose;
    }

    function applyAutoChoreo(beatIndex,sectionOverride=null){
      if(showPhase!=='live' || ended)return;
      if(Date.now()<manualPoseLockUntil)return;
      const track=currentTrack();
      const routine=songChoreo[track.key]||songChoreo.hylt;
      const section=sectionOverride||timelineFor(track)[Math.max(0,currentSectionIndex)]||timelineFor(track)[0];
      const choices=(section.r||[0]).map(i=>Math.max(0,Math.min(routine.length-1,i)));
      const phraseSlot=Math.floor(beatIndex/2)%Math.max(1,choices.length);
      const routineIndex=choices[phraseSlot]??0;
      const p=routine[routineIndex]||routine[0];
      const baseMove=p.move||'groove';
      const plannedMove=songClipMove(track.key,section.key||currentSectionKey,beatIndex,baseMove);
      liveMove=plannedMove||variedLiveMove(baseMove,beatIndex,routineIndex,phraseSlot);
      const mappedVocal=vocalFocusFor(track.key,currentSongProgress);
      currentVocalMember=mappedVocal;
      const manualFocusActive=Date.now()<manualFocusLockUntil;
      const savedFocus=(members.includes(focus)||focus==='group')?focus:'group';
      const focusTarget=manualFocusActive
        ? savedFocus
        : (autoVocalCam
            ? mappedVocal
            : (members.includes(savedFocus)||savedFocus==='group')
                ? savedFocus
                : expressiveFocus(p.focus||'group',beatIndex,section.key||currentSectionKey,liveMove));
      const phraseToken=`${currentSectionIndex}:${routineIndex}:${phraseSlot}:${focusTarget}`;
      if(phraseToken===livePhrase){updateVocalChipInPlace();updateLandscapeMemberCamInPlace();return;}
      livePhrase=phraseToken;
      const rapidMoves=['accent','spot-pop','kick','kick-line','snap-turn','dancebreak','signature','solo-swap','center-solo','finale','pose-hit'];
      const nextPoses=Object.fromEntries(members.map((m,i)=>[m,expressivePose(p.poses?.[i]||'dance',m,i,beatIndex,liveMove,focusTarget,section.key||currentSectionKey)]));
      if(focusTarget==='group'){
        currentPoses=Object.fromEntries(members.map(m=>[m,nextPoses[m]]));
      }else{
        currentPoses=Object.fromEntries(members.map(m=>{
          const featured=focusTarget===m;
          const keepSupportPose=!featured && (Math.floor(beatIndex)%2===1) && currentPoses[m] && currentPoses[m]!=='idle';
          return [m,keepSupportPose?currentPoses[m]:nextPoses[m]];
        }));
      }
      focus=focusTarget;
      formation=expressiveFormation(p.formation||formation,liveMove,beatIndex,section.key||currentSectionKey,track.key,focusTarget);
      if(section.crowd)crowdMode=section.crowd;
      renderLiveStage();
    }

    const songFxPresets={
      hylt:{intro:['colorwash',420],verse:['flashbulb',620],'pre-chorus':['blackout',520],chorus:['co2',880],rap:['flashbulb',600],bridge:['laser',980],'final-chorus':['powerhit',1180],outro:['confetti',1500]},
      pinkvenom:{intro:['laser',760],verse:['flashbulb',560],'pre-chorus':['blackout',620],chorus:['laser',960],rap:['colorwash',760],bridge:['co2',900],'final-chorus':['powerhit',1150],outro:['glitter',1450]},
      shutdown:{intro:['blackout',650],verse:['flashbulb',560],'pre-chorus':['spotlight',650],chorus:['colorwash',850],rap:['laser',900],bridge:['blackout',760],'final-chorus':['flashbulb',780],outro:['glitter',1300]},
      ktl:{intro:['pyro',900],verse:['flashbulb',520],'pre-chorus':['co2',820],chorus:['powerhit',1120],rap:['laser',860],bridge:['co2',900],'final-chorus':['powerhit',1220],outro:['confetti',1500]},
      d4:{intro:['pyro',860],verse:['flashbulb',520],'pre-chorus':['laser',760],chorus:['powerhit',1100],rap:['co2',820],bridge:['laser',920],'final-chorus':['powerhit',1200],outro:['confetti',1500]},
      boombayah:{intro:['colorwash',720],verse:['flashbulb',520],'pre-chorus':['co2',760],chorus:['partyhit',1080],rap:['laser',760],bridge:['partyhit',1100],'final-chorus':['partyhit',1180],outro:['confetti',1600]},
      whistle:{intro:['spotlight',650],verse:['flashbulb',520],'pre-chorus':['colorwash',720],chorus:['laser',820],rap:['flashbulb',560],bridge:['spotlight',720],'final-chorus':['glitter',1300],outro:['glitter',1400]},
      pwf:{intro:['colorwash',720],verse:['flashbulb',540],'pre-chorus':['spotlight',680],chorus:['pyro',820],bridge:['laser',820],'final-chorus':['pyro',1000],outro:['glitter',1350]},
      stay:{intro:['spotlight',760],verse:['flashbulb',500],'pre-chorus':['colorwash',680],chorus:['glitter',980],bridge:['spotlight',760],'final-chorus':['glitter',1200],outro:['confetti',1300]},
      aiiyl:{intro:['colorwash',700],verse:['flashbulb',520],'pre-chorus':['co2',740],chorus:['partyhit',1050],rap:['laser',740],bridge:['glitter',980],'final-chorus':['partyhit',1150],outro:['confetti',1550]},
      lsg:{intro:['colorwash',720],verse:['flashbulb',520],'pre-chorus':['co2',760],chorus:['co2',920],bridge:['glitter',1080],'final-chorus':['partyhit',1150],outro:['confetti',1550]},
      icecream:{intro:['flashbulb',600],verse:['colorwash',620],'pre-chorus':['glitter',860],chorus:['partyhit',1040],rap:['flashbulb',620],bridge:['glitter',980],'final-chorus':['partyhit',1100],outro:['confetti',1500]}
    };
    const songFxBeatAccents={
      hylt:'flashbulb',pinkvenom:'laser',shutdown:'flashbulb',ktl:'pyro',d4:'pyro',boombayah:'flashbulb',whistle:'flashbulb',pwf:'flashbulb',stay:'flashbulb',aiiyl:'flashbulb',lsg:'co2',icecream:'flashbulb'
    };
    function effectForSection(trackKey,sectionKey){
      const preset=songFxPresets[trackKey]||songFxPresets.hylt;
      return preset[sectionKey]||preset[sectionKey==='verse-2'?'verse':sectionKey==='breakdown'?'bridge':'verse']||['flashbulb',520];
    }
    function triggerSectionMoment(sectionKey){
      if(showPhase!=='live'||ended)return;
      if(Date.now()<autoFxLockUntil)return;
      if(['pyro','confetti','glitter','co2','laser','blackout','powerhit','partyhit'].includes(effectMode))return;
      const [mode,duration]=effectForSection(currentTrack().key,sectionKey);
      autoFxLockUntil=Date.now()+Math.max(280,duration-80);
      setEffect(mode,duration,false);
    }
    function triggerBeatFxAccent(beatIndex){
      if(showPhase!=='live'||ended||Date.now()<autoFxLockUntil||Date.now()<manualPoseLockUntil)return;
      if(effectMode!=='none')return;
      if(!['chorus','final-chorus','bridge'].includes(currentSectionKey))return;
      if(beatIndex%8!==0||beatIndex===lastAutoFxBeat)return;
      lastAutoFxBeat=beatIndex;
      let mode=songFxBeatAccents[currentTrack().key]||'flashbulb';
      if(currentSectionKey==='bridge'&&mode==='pyro')mode='laser';
      if(currentSectionKey==='final-chorus'&&['flashbulb','laser'].includes(mode))mode='flashbulb';
      const duration=mode==='pyro'?460:mode==='co2'?420:mode==='laser'?480:360;
      autoFxLockUntil=Date.now()+duration;
      setEffect(mode,duration,false);
    }

    function updateSongSection(now,duration,beatIndex){
      const progress=duration>10?clamp(now/duration,0,1):clamp(beatIndex/240,0,1);
      currentSongProgress=progress;
      currentVocalMember=vocalFocusFor(currentTrack().key,progress);
      if(directorTask?.type==='vocal'&&members.includes(currentVocalMember)&&directorTask.value!==currentVocalMember){
        directorTask={...directorTask,value:currentVocalMember,label:`Catch ${currentVocalMember} on the current vocal`};
        renderDirector();
      }
      const resolved=resolveSection(progress);
      const section=resolved.section;
      if(!section)return;
      const changed=resolved.index!==currentSectionIndex||section.key!==currentSectionKey;
      currentSectionIndex=resolved.index;
      currentSectionKey=section.key;
      currentSectionLabel=section.label;
      if(changed){
        livePhrase=-1;
        if(directorMode==='live'){
          liveSectionHits=0;
          liveSectionCleared=false;
          liveSectionGoal=['chorus','bridge','final-chorus'].includes(section.key)?3:2;
        }
        if(section.crowd)crowdMode=section.crowd;
        const stage=document.getElementById('concertStage');
        if(stage){stage.dataset.section=currentSectionKey;stage.className=stage.className.replace(/section-[a-z-]+/g,'').trim()+` section-${slug(currentSectionKey)}`;}
        const chip=document.getElementById('concertSectionChip');if(chip)chip.textContent=currentSectionLabel;
        const sec=document.getElementById('concertSectionText');if(sec)sec.textContent=currentSectionLabel;
        if(['chorus','final-chorus'].includes(currentSectionKey))stagePulse=0;
        triggerSectionMoment(currentSectionKey);
      }
      applyAutoChoreo(beatIndex,section);
    }

    function taskPool(){
      const m=sample(members);
      const singer=members.includes(currentVocalMember)?currentVocalMember:m;
      return [
        {type:'cue',value:'wave',icon:'↝',label:'Send a crowd light wave'},
        {type:'cue',value:'burst',icon:'✦',label:'Trigger a pink burst'},
        {type:'cue',value:'pose',icon:'★',label:'Lock the group pose'},
        {type:'cue',value:'run',icon:'≫',label:'Call the dance break'},
        {type:'cue',value:'pyro',icon:'▲',label:'Fire the pixel pyro'},
        {type:'cue',value:'confetti',icon:'✺',label:'Drop encore confetti'},
        {type:'cue',value:'laser',icon:'╱',label:'Sweep the arena lasers'},
        {type:'cue',value:'blackout',icon:'●',label:'Hit a blackout spotlight'},
        {type:'cue',value:'chant',icon:'♢',label:'Push a fan-chant wave'},
        {type:'cue',value:'co2',icon:'≋',label:'Blast the CO2 jets'},
        {type:'cue',value:'glitter',icon:'✷',label:'Drop glitter rain'},
        {type:'cue',value:'colorwash',icon:'▨',label:'Flood the stage with color wash'},
        {type:'cue',value:'flashbulb',icon:'✹',label:'Trigger flashbulb camera pops'},
        {type:'vocal',value:singer,icon:'◉',label:`Catch ${singer} on the current vocal`},
        {type:'camera',value:'spotlight',icon:'◎',label:'Follow the vocalist spotlight'},
        {type:'camera',value:'wide',icon:'▣',label:'Take a full-stage wide shot'},
        {type:'focus',value:m,icon:'⌾',label:`Put ${m} in manual focus`},
        {type:'formation',value:'center',icon:'◆',label:'Switch to CENTER formation'},
        {type:'formation',value:'diamond',icon:'◇',label:'Switch to DIAMOND formation'},
        {type:'formation',value:'line',icon:'—',label:'Return to LINE formation'}
      ];
    }
    function newDirectorTask(){
      const pool=taskPool().filter(t=>!directorTask||t.type!==directorTask.type||t.value!==directorTask.value);
      directorTask=sample(pool);
      renderDirector();
    }
    function directorMarkup(){
      const d=directorTask||{icon:'✦',label:'Stand by for the next cue'};
      return `<div class="concert-director" id="concertDirector"><span>${d.icon}</span><div><small>SHOW DIRECTOR · OPTIONAL BONUS</small><b>${d.label}</b><em>${directorClears} cleared · streak ×${directorStreak}</em></div></div>`;
    }
    function renderDirector(){
      const el=document.getElementById('concertDirector');
      if(el)el.outerHTML=directorMarkup();
      const quick=document.getElementById('concertQuickDock');
      if(quick)quick.outerHTML=quickDirectorMarkup();
    }
    function checkDirector(type,value){
      if(directorMode==='live'||!directorTask||directorTask.type!==type||directorTask.value!==value)return false;
      directorClears++;directorStreak++;vibe+=8+Math.min(5,directorStreak);sfx('perfect');vibrate(18);
      const cleared=directorTask.label;
      newDirectorTask();
      const dock=document.querySelector('.concert-director-dock');
      dock?.classList.add('director-cleared');
      showTimers.push(setTimeout(()=>dock?.classList.remove('director-cleared'),650));
      const feedback=document.querySelector('.concert-director em');
      if(feedback)feedback.textContent=`CLEARED · ${cleared} · streak ×${directorStreak}`;
      return true;
    }

    function crowdReaction(){
      const energy=vibe+directorClears*9+completed*10+directorStreak*3+stagePulse*4;
      if(effectMode==='encore')return 'roar';
      if(['pyro','confetti','glitter','co2','powerhit','partyhit'].includes(effectMode))return 'burst';
      if(['chant','flashbulb','colorwash'].includes(effectMode))return 'hype';
      if(showPhase==='live' && directorStreak>=3)return 'chant';
      if(showPhase==='live' && (currentTrack().bpm||0)>=128)return 'wave';
      return energy>=90?'roar':energy>=62?'hype':'warm';
    }
    function memberSpotlightMarkup(member){
      if(!members.includes(member)||focus!==member||!['spotlight','blackout'].includes(effectMode))return '';
      return `<div class="member-spotlight-sprite" aria-hidden="true"><div class="concert-sprite-strip sprite-spotlight member-beam"></div></div>`;
    }
    function transitionMarkup(){
      if(showPhase!=='transition')return '';
      const title=transitionTitle||'NEXT SONG';
      return `<div class="concert-stage-transition" aria-hidden="true"><i class="wipe-left"></i><i class="wipe-right"></i><div><small>SET CHANGE</small><b>${esc(title)}</b><span>STAGE RESET • CAMERAS READY</span></div><em></em></div>`;
    }
    const concertFxSources=[
      './assets/fx/fx_pyro_strip.png',
      './assets/fx/fx_co2_strip.png',
      './assets/fx/fx_confetti_strip.png',
      './assets/fx/fx_laser_strip.png',
      './assets/fx/fx_spotlight_strip.png',
      './assets/fx/fx_flashbulb_strip.png'
    ];
    const concertFxPreload=new Map();
    const concertFxByMode={
      pyro:[concertFxSources[0]],
      co2:[concertFxSources[1]],
      confetti:[concertFxSources[2]],
      glitter:[concertFxSources[2]],
      laser:[concertFxSources[3]],
      spotlight:[concertFxSources[4]],
      blackout:[concertFxSources[4]],
      flashbulb:[concertFxSources[5]],
      powerhit:[concertFxSources[0],concertFxSources[3]],
      partyhit:[concertFxSources[0],concertFxSources[1],concertFxSources[2]],
      encore:[concertFxSources[0],concertFxSources[1],concertFxSources[2],concertFxSources[3]]
    };
    function preloadConcertFxSource(src){
      if(!src)return Promise.resolve(null);
      if(concertFxPreload.has(src))return concertFxPreload.get(src);
      const img=new Image();
      img.decoding='async';
      img.loading='eager';
      const promise=new Promise(resolve=>{
        let done=false;
        const finish=()=>{if(done)return;done=true;resolve(img);};
        img.onload=finish;img.onerror=finish;
        img.src=src;
        try{img.decode?.().then(finish).catch(finish);}catch{}
        setTimeout(finish,2600);
      });
      concertFxPreload.set(src,promise);
      return promise;
    }
    function preloadConcertFxAssets(modes=['pyro','co2']){
      const list=Array.isArray(modes)?modes:[modes];
      const sources=[...new Set(list.flatMap(mode=>concertFxByMode[mode]||[]))];
      return Promise.all(sources.map(preloadConcertFxSource));
    }
    function warmFxForMode(mode){
      return preloadConcertFxAssets(mode);
    }

    function effectMarkup(){
      const sprite=(cls,style='')=>`<div class="${cls}"${style?` style="${style}"`:''}></div>`;
      const isPower=['powerhit','encore'].includes(effectMode);
      const isParty=['partyhit','encore'].includes(effectMode);
      const confettiRear=Array.from({length:5},(_,i)=>sprite(`concert-sprite-strip sprite-confetti confetti-rear piece-${i+1}`)).join('');
      const confettiFront=Array.from({length:6},(_,i)=>sprite(`concert-sprite-strip sprite-confetti confetti-front piece-${i+1}`)).join('');
      const glitterPieces=Array.from({length:5},(_,i)=>sprite(`concert-sprite-strip sprite-confetti glitter-piece piece-${i+1}`)).join('');
      const confetti=(effectMode==='confetti'||isParty||effectMode==='encore')
        ?`<div class="concert-confetti-sprite"><div class="confetti-depth rear">${confettiRear}</div><div class="confetti-depth front">${confettiFront}</div></div>`:'';
      const glitter=(effectMode==='glitter'||isParty)
        ?`<div class="concert-confetti-sprite glitter-mode">${glitterPieces}</div>`:'';
      const pyro=(effectMode==='pyro'||isPower)
        ?`<div class="concert-pyro-sprite-group">${Array.from({length:6},(_,i)=>sprite(`concert-sprite-strip sprite-pyro jet-${i+1}`)).join('')}</div>`:'';
      const flash=(effectMode==='strobe'||effectMode==='sparkle'||effectMode==='encore'||isParty)?`<div class="concert-strobe"></div>`:'';
      const laser=(effectMode==='laser'||isPower)?`<div class="concert-laser-sprite-group">${sprite('concert-sprite-strip sprite-laser sweep-a')}${sprite('concert-sprite-strip sprite-laser sweep-b')}</div>`:'';
      const blackout=effectMode==='blackout'?`<div class="concert-blackout-sprite"><div class="concert-blackout-dim"></div></div>`:'';
      const spotlight='';
      const co2=(effectMode==='co2'||isParty)?`<div class="concert-co2-sprite-group">${Array.from({length:5},(_,i)=>sprite(`concert-sprite-strip sprite-co2 jet-${i+1}`)).join('')}</div>`:'';
      const colorwash=(effectMode==='colorwash'||isParty)?`<div class="concert-colorwash"><i></i><i></i><i></i></div>`:'';
      const flashbulb=effectMode==='flashbulb'?`<div class="concert-flashbulb-sprite-group">${Array.from({length:5},(_,i)=>sprite(`concert-sprite-strip sprite-flashbulb pop-${i+1}`)).join('')}</div>`:'';
      return `<div class="concert-fx fx-${effectMode} sprite-driven-fx" data-mode="${effectMode}" data-effect-serial="${effectSerial}">${confetti}${glitter}${pyro}${flash}${laser}${blackout}${spotlight}${co2}${colorwash}${flashbulb}</div>`;
    }
    function introMarkup(){
      if(!introMember)return '';
      const introCopy={Jisoo:'JISOO · ELEGANT SPOTLIGHT',Jennie:'JENNIE · CENTER IMPACT','Rosé':'ROSÉ · VOCAL GLOW',Lisa:'LISA · DANCE BREAK'}[introMember]||introMember;
      return `<div class="concert-member-intro"><small>NOW ENTERING</small><b>${introCopy}</b></div>`;
    }
    function setEffect(mode='none',duration=0,resetPose=true){
      warmFxForMode(mode);
      effectMode=mode;
      const serial=++effectSerial;
      renderLiveStage();
      /* Keep first-use effects on screen long enough for low-end mobile browsers
         to decode and paint the local PNG strip. */
      const visibleFor=Math.max(duration,mode==='confetti'||mode==='glitter'?2200:mode==='pyro'?1550:mode==='co2'?1500:mode==='laser'?1500:mode==='flashbulb'?1250:duration);
      if(visibleFor>0)showTimers.push(setTimeout(()=>{
        if(serial!==effectSerial||showPhase==='finale')return;
        effectMode='none';
        effectSerial++;
        if(resetPose&&showPhase==='live')setPose('dance');
        renderLiveStage();
      },visibleFor));
    }
    function runOpeningSequence(){
      if(openingDone||ended)return;
      openingDone=true;showPhase='intro';
      members.forEach((m,i)=>showTimers.push(setTimeout(()=>{
        introMember=m;focus=m;currentPoses=Object.fromEntries(members.map(name=>[name,name===m?'run':'idle']));effectMode=i===3?'pyro':'strobe';renderLiveStage();updateLiveText(`${m} enters the pixel stage.`);sfx(i===3?'perfect':'good');
        showTimers.push(setTimeout(()=>{if(showPhase==='intro'&&introMember===m){currentPoses=Object.fromEntries(members.map(name=>[name,name===m?'win':'idle']));renderLiveStage();}},260));
      },i*720)));
      showTimers.push(setTimeout(()=>{
        introMember='';focus='group';showPhase='live';effectMode='none';liveMove='groove';livePhrase=-1;currentSectionKey='intro';currentSectionLabel='INTRO';currentSectionIndex=0;setPose('dance');renderLiveStage();updateLiveText(`All four on stage — ${currentTrack().title} is live.`);
      },members.length*720+360));
    }
    function songTransition(nextIndex,autoplay=true){
      if(nextIndex<0||nextIndex>=setlist.length)return;
      transitionTitle=youtubeTracks[setlist[nextIndex]].title;
      if(directorMode==='live'){liveCall=null;liveCallSerial++;liveRecoveryCalls=0;}
      showPhase='transition';introMember='';focus='group';formation='line';setPose('win');setEffect('glitter',820,false);updateLiveText(`Set change · ${transitionTitle} incoming.`);
      renderLiveDirector();
      showTimers.push(setTimeout(()=>{
        currentIndex=nextIndex;started=false;showPhase='live';effectMode='none';effectSerial++;transitionTitle='';livePhrase=-1;liveMove='groove';currentSectionKey='intro';currentSectionLabel='INTRO';currentSectionIndex=0;setPose('idle');
        if(directorMode==='live')resetLiveDirectorForTrack(true);else newDirectorTask();
        loadTrack(autoplay,`Now entering ${currentTrack().title}.`);
      },900));
    }

    function queueMarkup(){
      return setlist.map((key,i)=>{const t=youtubeTracks[key];return `<button class="concert-queue-pill ${i===currentIndex?'active':''}" onclick="window.PV.concertNextSong(${i})"><small>${String(i+1).padStart(2,'0')}</small><b>${t.title}</b></button>`;}).join('');
    }
    function screenPreset(track=currentTrack()){
      const autoMap={hylt:'the-show',pinkvenom:'pink-venom',shutdown:'shutdown',ktl:'kill-this-love',d4:'d4',boombayah:'boombayah',whistle:'whistle',pwf:'playing-fire',stay:'stay',aiiyl:'summer',lsg:'lovesick',icecream:'icecream',foreveryoung:'forever-young',readyforlove:'ready-love',jump:'jump'};
      const active=screenMode==='auto'?(autoMap[track.key]||'pinkverse'):screenMode;
      const presets={
        'pinkverse':{id:'pinkverse',kicker:'PINKVERSE LIVE',headline:'PIXEL CONCERT',sub:'FAN ARCADE STAGE',chant:'PINKVERSE! PINKVERSE!',motif:'grid'},
        'pink-venom':{id:'pink-venom',kicker:'2022 ERA',headline:'PINK VENOM',sub:'BLACK · HOT PINK · VENOM',chant:'BLACKPINK! VENOM!',motif:'venom'},
        'shutdown':{id:'shutdown',kicker:'BORN PINK',headline:'SHUT DOWN',sub:'CLASSIC STRINGS · BLACK CHROME',chant:'SHUT IT DOWN!',motif:'chrome'},
        'born-pink':{id:'born-pink',kicker:'WORLD TOUR',headline:'BORN PINK',sub:'ARENA LIGHTS · ENCORE ENERGY',chant:'BORN PINK! BORN PINK!',motif:'crown'},
        'lovesick':{id:'lovesick',kicker:'2020 ERA',headline:'LOVESICK',sub:'NEON HEARTBREAK',chant:'HEY! LOVESICK!',motif:'heart'},
        'summer':{id:'summer',kicker:'SUMMER ERA',headline:'AIIYL',sub:'PASTEL POP PARADE',chant:'AIIYL! AIIYL!',motif:'spark'},
        'kill-this-love':{id:'kill-this-love',kicker:'2019 ERA',headline:'KILL THIS LOVE',sub:'BRASS · DRUMLINE · IMPACT',chant:'KILL THIS LOVE!',motif:'march'},
        'd4':{id:'d4',kicker:'2018 ERA',headline:'DDU-DU DDU-DU',sub:'GLASS PINK · POWER SHOT',chant:'DDU-DU! DDU-DU!',motif:'diamond'},
        'boombayah':{id:'boombayah',kicker:'2016 ERA',headline:'BOOMBAYAH',sub:'DEBUT FIREWORK',chant:'BOOMBAYAH!',motif:'firework'},
        'whistle':{id:'whistle',kicker:'2016 ERA',headline:'WHISTLE',sub:'MINIMAL BASS · SWAGGER STEP',chant:'WHISTLE! HEY!',motif:'wave'},
        'playing-fire':{id:'playing-fire',kicker:'2016 ERA',headline:'PLAYING WITH FIRE',sub:'EMBER POP · FLAME HEART',chant:'PLAYING WITH FIRE!',motif:'fire'},
        'stay':{id:'stay',kicker:'BALLAD STAGE',headline:'STAY',sub:'SOFT LIGHTS · FAN HEARTS',chant:'STAY WITH US!',motif:'heart'},
        'icecream':{id:'icecream',kicker:'2020 ERA',headline:'ICE CREAM',sub:'PASTEL POP · SWEET SWIRL',chant:'ICE CREAM CHILLIN!',motif:'spark'},
        'forever-young':{id:'forever-young',kicker:'2018 ERA',headline:'FOREVER YOUNG',sub:'SUMMER LIGHTS · FESTIVAL ENERGY',chant:'FOREVER YOUNG!',motif:'spark'},
        'ready-love':{id:'ready-love',kicker:'2022 ERA',headline:'READY FOR LOVE',sub:'VIRTUAL STAGE · NEON HEARTS',chant:'READY FOR LOVE!',motif:'heart'},
        'jump':{id:'jump',kicker:'2025 ERA',headline:'JUMP',sub:'BASS DROP · HIGH IMPACT',chant:'JUMP! JUMP!',motif:'firework'},
        'the-show':{id:'the-show',kicker:'LIVE SET',headline:'HOW YOU LIKE THAT',sub:'STAGE FIRE · CROWD CHANT',chant:'HOW YOU LIKE THAT!',motif:'crown'}
      };
      return presets[active]||presets.pinkverse;
    }
    function pixelStageScreen(t, live=false){
      const ids = live ? ' id="concertEra"' : '';
      const ids2 = live ? ' id="concertSongTitle"' : '';
      const preset=screenPreset(t);
      const modeClass=`screen-${slug(preset.id)}`;
      return `<div class="concert-stage-screen pixel-marquee ${modeClass}" data-track="${t.key}" data-preset="${preset.id}"><div class="concert-screen-fill"></div><div class="concert-led-frame"><i></i><i></i></div><div class="concert-stage-label"><small${ids}>${screenMode==='auto'?'AUTO · '+preset.kicker:preset.kicker}</small><b${ids2}>${preset.headline}</b><span>${live?'LIVE · '+t.title:preset.sub}</span></div></div>`;
    }
    function stageArchitecture(){
      const key=themeClass();
      const src={
        'pink-grid':'./assets/stage/stage-pink-grid.webp',
        'neon-arena':'./assets/stage/stage-neon-arena.webp',
        'encore-night':'./assets/stage/stage-encore-night.webp'
      }[key]||'./assets/stage/stage-pink-grid.webp';
      return `<img class="concert-stage-art" src="${src}" alt="" decoding="async" draggable="false">`;
    }
    function stageAtmosphere(){
      const t=currentTrack();
      return `<div class="concert-stage-lighting wash-${slug(t.key)}"><i></i><i></i><i></i><i></i></div><div class="concert-stage-haze"></div><div class="concert-star-dust">${Array.from({length:6},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><div class="concert-stage-apron"><i></i><i></i><i></i><i></i><i></i></div><div class="concert-pit-barrier"><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
    }
    function showStatusMarkup(message){
      return `<div class="concert-show-status"><div class="concert-show-head"><span>NOW PLAYING</span><em id="concertSectionChip">${currentSectionLabel}</em></div><b id="concertMessage">${message}</b><small id="concertSub">${completed}/${setlist.length} songs cleared · ${crowdReaction().toUpperCase()} crowd · score preview ${scoreEstimate()}${directorMode==='live'?` · DIRECTOR ×${liveDirectorCombo}`:''} · <strong id="concertSectionText">${currentSectionLabel}</strong></small></div>`;
    }
    function stageScene(message){
      const t=currentTrack();
      return `${stageArchitecture()}${stageAtmosphere()}${pixelStageScreen(t,true)}${effectMarkup()}${renderBand()}${renderCrowd()}${landscapeMemberCamMarkup()}${vocalFocusMarkup()}${introMarkup()}${transitionMarkup()}`;
    }
    function concertBeatSeconds(){
      const bpm=Math.max(70,Number(currentTrack()?.bpm||120));
      return 60/bpm;
    }
    function concertMotionStyle(){
      const beat=concertBeatSeconds();
      return `--beat-sec:${beat.toFixed(4)}s;--half-beat:${(beat/2).toFixed(4)}s;--double-beat:${(beat*2).toFixed(4)}s;`;
    }

    function renderBand(){
      return `<div class="concert-band formation-${slug(formation)} focus-${slug(focus)}">${members.map((m,i)=>{const pose=currentPoses[m]||'idle';const variant=memberSpriteSheetVariant(m,pose,{section:currentSectionKey,focusName:focus,phase:showPhase});return `<div class="concert-performer ${focus===m?'focus':''} ${focus==='group'?'group-focus':''} ${performerStageClass(m,i)}" data-member="${spriteKey(m)}" style="--slot:${i};">${memberSpotlightMarkup(m)}<div class="concert-performer-card"><div class="concert-motion-shell">${pixelAvatar(m,false,pose,null,variant,true)}</div></div><span>${m}</span></div>`;}).join('')}</div>`;
    }
    function renderCrowd(){
      const preset=screenPreset(currentTrack());
      const reaction=crowdReaction();
      const fan=(i,row,tier='back')=>{
        const delay=-((i*73)%780);
        const lean=((i%5)-2)*.55;
        const lift=(i%4)-1;
        return `<i class="fan ${row} fan-tier-${tier} f${(i%6)+1}" style="--fan-i:${i};--fan-delay:${delay}ms;--fan-lean:${lean}deg;--fan-lift:${lift}px"><div class="fan-shadow"></div><div class="fan-image-wrap"><img class="fan-image" src="${crowdSpriteSheet(i)}" alt="" decoding="async" draggable="false"></div><div class="fan-light fan-light-${(i%4)+1}"></div></i>`;
      };
      const far=Array.from({length:12},(_,i)=>fan(i+1,'fan-far','far')).join('');
      const back=Array.from({length:14},(_,i)=>fan(i+3,'fan-back','back')).join('');
      const mid=Array.from({length:16},(_,i)=>fan(i+6,'fan-mid','mid')).join('');
      const front=Array.from({length:18},(_,i)=>fan(i+9,'fan-front','front')).join('');
      const ambient=Array.from({length:22},(_,i)=>`<i style="--crowd-dot:${i};--crowd-dot-delay:${-((i*113)%1500)}ms"></i>`).join('');
      return `<div class="concert-crowd crowd-${slug(crowdMode)} reaction-${reaction}"><div class="concert-crowd-ambient">${ambient}</div><div class="concert-crowd-signs"><b>${preset.headline}</b><b>BLINK</b><b>${reaction==='chant'?preset.chant:'ENCORE!'}</b></div><div class="concert-crowd-wavebars">${Array.from({length:16},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><div class="concert-crowd-row far">${far}</div><div class="concert-crowd-row back">${back}</div><div class="concert-crowd-row mid">${mid}</div><div class="concert-crowd-row front">${front}</div></div>`;
    }
    function directorActionLabel(){
      if(!directorTask)return 'STAND BY';
      if(directorTask.type==='cue')return ({wave:'WAVE LIGHTS',burst:'PINK BURST',pose:'GROUP POSE',run:'DANCE BREAK',pyro:'PIXEL PYRO',confetti:'DROP CONFETTI',laser:'LASER SWEEP',blackout:'BLACKOUT HIT',chant:'FAN CHANT',co2:'CO2 JETS',glitter:'GLITTER RAIN',colorwash:'COLOR WASH',flashbulb:'FLASH POPS'}[directorTask.value]||'RUN CUE');
      if(directorTask.type==='vocal')return `CATCH ${String(directorTask.value).toUpperCase()}`;
      if(directorTask.type==='camera')return directorTask.value==='wide'?'WIDE SHOT':'VOCAL SPOTLIGHT';
      if(directorTask.type==='focus')return `FOCUS ${directorTask.value.toUpperCase()}`;
      if(directorTask.type==='formation')return `${String(directorTask.value).toUpperCase()} FORMATION`;
      return 'RUN TASK';
    }
    function quickDirectorMarkup(){
      const d=directorTask||{label:'Stand by for the next cue'};
      return `<div class="concert-quick-dock" id="concertQuickDock"><div class="concert-quick-copy"><small>DIRECTOR CALL</small><b>${d.label}</b><span>One-tap action so you don’t need to scroll away from the stage.</span></div><button class="concert-director-action" onclick="window.PV.concertDoDirector()">${directorActionLabel()}</button></div>`;
    }

    function liveTaskLabel(task){
      if(!task)return 'STAND BY';
      if(task.type==='vocal')return String(task.value).toUpperCase();
      if(task.type==='formation')return String(task.value).toUpperCase();
      if(task.type==='camera')return task.value==='spotlight'?'VOCAL SPOT':'WIDE CAM';
      if(task.type==='choreo')return ({ripple:'RIPPLE',mirror:'MIRROR',dancebreak:'DANCE BREAK',hitline:'GROUP HIT','duo-link':'DUO LINK','trio-roll':'TRIO ROLL'}[task.value]||String(task.value).toUpperCase());
      if(task.type==='hype')return ({wave:'LIGHT WAVE',chant:'FAN CHANT',pulse:'PULSE',flash:'FLASH CROWD'}[task.value]||String(task.value).toUpperCase());
      if(task.type==='cue')return ({wave:'WAVE LIGHTS',burst:'PINK BURST',pose:'GROUP POSE',run:'DANCE BREAK',pyro:'PIXEL PYRO',confetti:'CONFETTI',laser:'LASER',blackout:'BLACKOUT',chant:'FAN CHANT',co2:'CO2 JETS',glitter:'GLITTER',colorwash:'COLOR WASH',flashbulb:'FLASH POPS'}[task.value]||String(task.value).toUpperCase());
      return String(task.value||'ACTION').toUpperCase();
    }
    function liveCallTask(beatIndex){
      const singer=members.includes(currentVocalMember)?currentVocalMember:vocalFocusFor(currentTrack().key,currentSongProgress);
      const fxCycle=['pyro','co2','laser','burst'];
      const section=currentSectionKey;
      const banks={
        intro:[
          {type:'camera',value:'wide',icon:'▣',label:'OPENING SHOT · TAKE THE FULL STAGE'},
          {type:'hype',value:'wave',icon:'↝',label:'OPENING CROWD · START THE LIGHT WAVE'}
        ],
        verse:[
          {type:'vocal',value:singer,icon:'◉',label:`VOCAL CAM · CATCH ${String(singer).toUpperCase()}`},
          {type:'camera',value:'spotlight',icon:'◎',label:'VOCAL MOMENT · TAKE THE SPOTLIGHT'},
          {type:'formation',value:'center',icon:'◆',label:'VERSE BLOCKING · MOVE TO CENTER'},
          {type:'formation',value:'trio-back',icon:'△',label:'VOCAL FEATURE · BUILD A SUPPORT TRIO'}
        ],
        rap:[
          {type:'vocal',value:singer,icon:'◉',label:`RAP CAM · CATCH ${String(singer).toUpperCase()}`},
          {type:'camera',value:'wide',icon:'▣',label:'RAP CUT · GO WIDE'},
          {type:'cue',value:'flashbulb',icon:'✹',label:'RAP ACCENT · HIT FLASH POPS'}
        ],
        'pre-chorus':[
          {type:'formation',value:'center',icon:'◆',label:'PRE-CHORUS BUILD · CENTER FORMATION'},
          {type:'cue',value:'colorwash',icon:'▨',label:'PRE-CHORUS BUILD · COLOR WASH'},
          {type:'camera',value:'spotlight',icon:'◎',label:'PRE-CHORUS · VOCAL SPOTLIGHT'}
        ],
        chorus:[
          {type:'formation',value:'diamond',icon:'◇',label:'CHORUS HIT · DIAMOND FORMATION'},
          {type:'cue',value:fxCycle[Math.abs(Math.floor(beatIndex/8))%fxCycle.length],icon:'▲',label:'CHORUS HIT · FIRE THE STAGE FX'},
          {type:'choreo',value:'hitline',icon:'★',label:'CHORUS HIT · LOCK THE GROUP HIT'},
          {type:'formation',value:'duo-pairs',icon:'◫',label:'CHORUS BLOCKING · SPLIT INTO DUO PAIRS'},
          {type:'hype',value:'chant',icon:'♢',label:'CHORUS · PUSH THE FAN CHANT'}
        ],
        bridge:[
          {type:'choreo',value:'ripple',icon:'≋',label:'BRIDGE · CALL A MEMBER RIPPLE'},
          {type:'choreo',value:'dancebreak',icon:'≫',label:'BRIDGE · TRIGGER THE DANCE BREAK'},
          {type:'cue',value:'laser',icon:'╱',label:'BRIDGE · SWEEP THE LASERS'},
          {type:'vocal',value:singer,icon:'◉',label:`BRIDGE VOCAL · CATCH ${String(singer).toUpperCase()}`},
          {type:'formation',value:'trio-back',icon:'△',label:'BRIDGE · BUILD A TRIO BEHIND THE FEATURE'}
        ],
        'final-chorus':[
          {type:'cue',value:'pyro',icon:'▲',label:'FINAL CHORUS · HIT THE PYRO'},
          {type:'choreo',value:'mirror',icon:'⇆',label:'FINAL CHORUS · MIRROR COMBO'},
          {type:'formation',value:'line',icon:'—',label:'FINAL CHORUS · RETURN TO LINE'},
          {type:'hype',value:'flash',icon:'✹',label:'FINAL CHORUS · MAX THE CROWD'}
        ],
        outro:[
          {type:'cue',value:'confetti',icon:'✺',label:'OUTRO · DROP CONFETTI'},
          {type:'cue',value:'pose',icon:'★',label:'OUTRO · LOCK THE FINAL POSE'},
          {type:'camera',value:'wide',icon:'▣',label:'OUTRO · TAKE THE FULL-STAGE SHOT'}
        ]
      };
      const bank=banks[section]||banks.verse;
      return bank[Math.abs(Math.floor(beatIndex/8)+currentSectionIndex)%bank.length];
    }
    function choiceTasksFor(correct,assist=false){
      let pool=[];
      if(correct.type==='vocal')pool=members.map(m=>({type:'vocal',value:m,icon:'◉',label:`Catch ${m}`}));
      else if(correct.type==='formation')pool=['line','center','diamond','duo-pairs','trio-back'].map(v=>({type:'formation',value:v,icon:v==='diamond'?'◇':v==='center'?'◆':v==='duo-pairs'?'◫':v==='trio-back'?'△':'—',label:`${v.replace(/-/g,' ')} formation`})).concat([{type:'camera',value:'wide',icon:'▣',label:'Wide shot'}]);
      else if(correct.type==='camera')pool=[{type:'camera',value:'spotlight',icon:'◎',label:'Vocal spotlight'},{type:'camera',value:'wide',icon:'▣',label:'Wide shot'},{type:'formation',value:'center',icon:'◆',label:'Center formation'},{type:'cue',value:'flashbulb',icon:'✹',label:'Flash pops'}];
      else if(correct.type==='choreo')pool=['ripple','mirror','dancebreak','hitline','duo-link','trio-roll'].map(v=>({type:'choreo',value:v,icon:v==='dancebreak'?'≫':v==='hitline'?'★':v==='mirror'?'⇆':v==='duo-link'?'◫':v==='trio-roll'?'△':'≋',label:v.replace(/-/g,' ')}));
      else if(correct.type==='hype')pool=['wave','chant','pulse','flash'].map(v=>({type:'hype',value:v,icon:v==='chant'?'♢':v==='flash'?'✹':'↝',label:v}));
      else {
        const values=['pyro','co2','laser','confetti','burst','colorwash','flashbulb','wave'];
        pool=values.map(v=>({type:'cue',value:v,icon:v==='pyro'?'▲':v==='co2'?'≋':v==='laser'?'╱':v==='confetti'?'✺':'✦',label:v}));
      }
      const same=t=>t.type===correct.type&&t.value===correct.value;
      const others=pool.filter(t=>!same(t));
      for(let i=others.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[others[i],others[j]]=[others[j],others[i]];}
      const choiceCount=assist?3:(level==='easy'?3:4);
      const choices=[correct,...others.slice(0,choiceCount-1)];
      for(let i=choices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}
      return choices;
    }
    function liveDirectorMultiplier(){const comboBoost=Math.min(1,Math.floor(liveDirectorCombo/4)*.25);const overdriveBoost=lastBeat<=liveOverdriveUntilBeat?.75:0;return 1+comboBoost+overdriveBoost;}
    function liveSongMissionTargets(){return level==='easy'?{clean:4,perfect:1}:level==='hard'?{clean:7,perfect:3}:{clean:6,perfect:2};}
    function resetLiveDirectorForTrack(force=false){
      if(directorMode!=='live')return;
      const key=currentTrack().key;
      if(!force&&liveTrackKey===key)return;
      liveTrackKey=key;liveCall=null;liveCallSerial++;liveNextCallBeat=8;liveRecoveryCalls=0;liveCallNumber=0;
      liveSongClean=0;liveSongPerfect=0;liveSongMissionCleared=false;liveSectionHits=0;liveSectionGoal=2;liveSectionCleared=false;
      liveOverdriveUntilBeat=-1;liveMaxTriggered=livePower>=100;
    }
    function currentLiveBeatPosition(){
      try{const now=Number(activeYouTubePlayer?.getCurrentTime?.()||0);return beatPosition(currentTrack(),now);}catch{return Number(lastBeat||0);}
    }
    function completeLiveSongMission(){
      if(liveSongMissionCleared)return;
      const target=liveSongMissionTargets();
      if(liveSongClean<target.clean||liveSongPerfect<target.perfect)return;
      liveSongMissionCleared=true;liveSongMissionClears++;liveDirectorScore+=300;livePower=clamp(livePower+15,0,100);vibe+=8;
      showLiveDirectorFeedback('SONG MISSION',300);sfx('perfect');vibrate(22);updateLiveText(`${currentTrack().title} mission cleared · +300 Director Score.`);
    }
    function livePowerTier(){if(lastBeat<=liveOverdriveUntilBeat)return 'overdrive';return livePower>=100?'max':livePower>=75?'peak':livePower>=50?'hype':livePower>=25?'warm':'base';}
    function liveAccuracy(){const total=livePerfect+liveGood+liveMiss;return total?Math.round(((livePerfect+liveGood*.7)/total)*100):0;}
    function liveShowGrade(){const a=liveAccuracy();return a>=94?'S':a>=86?'A':a>=74?'B':a>=60?'C':'D';}
    function liveCallGap(section=currentSectionKey){const base=({intro:12,verse:12,rap:9,'pre-chorus':8,chorus:8,bridge:6,'final-chorus':6,outro:8})[section]||9;const overdrive=lastBeat<=liveOverdriveUntilBeat?2:0;const streak=liveDirectorCombo>=8?1:0;return Math.max(4,base-overdrive-streak);}
    function showLiveDirectorFeedback(grade,points=0){
      const host=document.getElementById('concertStage');if(!host)return;
      host.querySelector('.concert-live-grade')?.remove();
      const el=document.createElement('div');el.className=`concert-live-grade ${String(grade).toLowerCase().replace(/\s+/g,'-')}`;
      el.innerHTML=`<b>${grade}</b>${points?`<small>+${points}</small>`:''}<em>×${liveDirectorCombo}</em>`;
      host.appendChild(el);setTimeout(()=>el.remove(),720);
    }
    function completeLiveSectionGoal(){
      if(liveSectionCleared||liveSectionHits<liveSectionGoal)return;
      liveSectionCleared=true;liveSectionClears++;liveDirectorScore+=150;livePower=clamp(livePower+10,0,100);vibe+=5;
      showLiveDirectorFeedback('SECTION CLEAR',150);sfx('perfect');vibrate(16);
    }
    function liveDirectorStatsMarkup(){
      const overdrive=lastBeat<=liveOverdriveUntilBeat;
      const remaining=overdrive?Math.max(0,liveOverdriveUntilBeat-lastBeat):0;
      const mission=liveSongMissionTargets();
      return `<div class="live-director-dashboard" id="liveDirectorDashboard"><div class="live-director-stats"><span><small>MODE</small><b>${overdrive?'OVERDRIVE':'LIVE DIRECTOR'}</b></span><span><small>COMBO</small><b>×${liveDirectorCombo}</b></span><span><small>MULTI</small><b>×${liveDirectorMultiplier().toFixed(2).replace('.00','')}</b></span><span><small>ACCURACY</small><b>${liveAccuracy()}%</b></span><span><small>GRADE</small><b>${liveShowGrade()}</b></span></div><div class="live-song-mission ${liveSongMissionCleared?'cleared':''}"><span><small>SONG MISSION</small><b>${liveSongMissionCleared?'CLEARED':`${liveSongClean}/${mission.clean} CLEAN · ${liveSongPerfect}/${mission.perfect} PERFECT`}</b></span><em>${currentTrack().title}</em></div><div class="live-section-goal ${liveSectionCleared?'cleared':''}"><span><small>SECTION GOAL</small><b>${liveSectionCleared?'CLEARED':`${liveSectionHits}/${liveSectionGoal} CLEAN CALLS`}</b></span><i>${currentSectionLabel}</i><em>${liveSectionClears} cleared</em></div><div class="live-power ${overdrive?'overdrive':''}"><span><small>SHOW POWER</small><b>${overdrive?`${remaining} BEATS`:Math.round(livePower)+'%'}</b></span><i><em style="width:${overdrive?100:livePower}%"></em></i>${overdrive?`<strong>OVERDRIVE ×${liveDirectorMultiplier().toFixed(2).replace('.00','')}</strong>`:livePower>=100?`<button type="button" onclick="window.PV.concertOverdrive()">ACTIVATE OVERDRIVE</button>`:`<strong>${livePower>=75?'PEAK':livePower>=50?'HYPE':livePower>=25?'WARM':'BUILDING'}</strong>`}</div></div>`;
    }
    function liveDirectorMarkup(){
      if(directorMode!=='live')return quickDirectorMarkup();
      if(!liveCall){const mission=liveSongMissionTargets();return `<div class="concert-live-director standby" id="concertLiveDirector"><div class="live-call-head"><small>LIVE DIRECTOR · ${currentTrack().title}</small><b>STAND BY</b><em>×${liveDirectorCombo}</em></div><p>${liveSongMissionCleared?'Song mission cleared. Keep the show clean.':`Song mission · ${liveSongClean}/${mission.clean} clean · ${liveSongPerfect}/${mission.perfect} perfect`}</p><div class="live-call-wait"><i></i><i></i><i></i><i></i></div></div>`;}
      const beats=liveCall.targetBeat-lastBeat;
      const cue=liveCall.resolved?(liveCall.result||'LOCKED'):(beats>0?String(beats):'HIT');
      const cueLabel=liveCall.resolved?'RESULT':(beats>0?'BEATS':'NOW');
      return `<div class="concert-live-director choices-${liveCall.choices.length} ${liveCall.resolved?'resolved':''} ${String(liveCall.result||'').toLowerCase()} call-${slug(liveCall.correct.type)} ${liveCall.assist?'assist':''}" id="concertLiveDirector"><div class="live-call-head"><small>${liveCall.assist?'RECOVERY':'LIVE DIRECTOR'} · CALL ${liveCall.number} · ${currentSectionLabel}${liveCall.assist?' · +1 BEAT':''}</small><b>${liveCall.prompt}</b><em class="live-call-countdown"><strong>${cue}</strong><span>${cueLabel}</span></em></div><div class="live-call-meter" aria-label="${beats>0?`${beats} beats remaining`:'Hit window'}"><i class="${beats<=3?'on':''}"></i><i class="${beats<=2?'on':''}"></i><i class="${beats<=1?'on':''}"></i><i class="${beats<=0?'hit':''}"></i></div><div class="live-call-actions">${liveCall.choices.map((task,i)=>`<button ${liveCall.resolved?'disabled':''} onclick="window.PV.concertLiveChoice(${i})"><b>${task.icon||'◆'}</b><span>${liveTaskLabel(task)}</span></button>`).join('')}</div><div class="live-call-score"><span>SCORE <b>${liveDirectorScore}</b></span><span>MULTI <b>×${liveDirectorMultiplier().toFixed(2).replace('.00','')}</b></span><span>POWER <b>${Math.round(livePower)}%</b></span><span>WINDOW <b>±1 BEAT</b></span></div></div>`;
    }
    function renderLiveDirector(){
      if(directorMode!=='live')return;
      const el=document.getElementById('concertLiveDirector');
      if(el)el.outerHTML=liveDirectorMarkup();
      const dashboard=document.getElementById('liveDirectorDashboard');
      if(dashboard)dashboard.outerHTML=liveDirectorStatsMarkup();
    }
    function issueLiveDirectorCall(beatIndex){
      if(directorMode!=='live'||showPhase!=='live'||ended||liveCall)return;
      const correct=liveCallTask(beatIndex);
      const assist=liveRecoveryCalls>0;
      if(assist)liveRecoveryCalls--;
      const countdown=lastBeat<=liveOverdriveUntilBeat?3:(assist?5:4);
      liveCall={id:++liveCallSerial,number:++liveCallNumber,assist,correct,choices:choiceTasksFor(correct,assist),prompt:(lastBeat<=liveOverdriveUntilBeat?'OVERDRIVE · ':'')+correct.label,targetBeat:beatIndex+countdown,resolved:false,result:'',clearBeat:null};
      liveNextCallBeat=beatIndex+liveCallGap(currentSectionKey);
      renderLiveDirector();
      sfx('cue');
    }
    function missLiveDirectorCall(label='MISS'){
      if(!liveCall||liveCall.resolved)return;
      liveCall.resolved=true;liveCall.result=label;liveCall.clearBeat=lastBeat+2;
      liveMiss++;liveDirectorCombo=0;liveRecoveryCalls=1;liveSectionHits=Math.max(0,liveSectionHits-1);livePower=clamp(livePower-(label==='WRONG CALL'?16:12),0,100);liveNextCallBeat=Math.max(liveNextCallBeat,lastBeat+4);vibe=Math.max(0,vibe-2);sfx('miss');vibrate(8);renderLiveDirector();
      showLiveDirectorFeedback(label,0);updateLiveText(`${label} · recover on the next Director Call.`);
    }
    function updateLiveDirector(beatIndex){
      if(directorMode!=='live'||showPhase!=='live'||ended)return;
      if(liveOverdriveUntilBeat>=0&&beatIndex>liveOverdriveUntilBeat){liveOverdriveUntilBeat=-1;livePower=clamp(livePower,0,100);renderLiveDirector();updateLiveText('Overdrive complete — build Show Power for the next burst.');}
      if(liveCall&&!liveCall.resolved&&beatIndex>liveCall.targetBeat+1){missLiveDirectorCall('MISS');return;}
      if(liveCall?.resolved&&Number.isFinite(liveCall.clearBeat)&&beatIndex>=liveCall.clearBeat){liveCall=null;renderLiveDirector();}
      if(!liveCall&&beatIndex>=liveNextCallBeat)issueLiveDirectorCall(beatIndex);
      else if(liveCall&&!liveCall.resolved)renderLiveDirector();
    }
    function performLiveTask(task){
      if(!task)return;
      if(task.type==='cue')return window.PV.concertCue(task.value);
      if(task.type==='vocal')return window.PV.concertVocalFocus(task.value);
      if(task.type==='camera')return window.PV.concertCamera(task.value);
      if(task.type==='formation')return window.PV.concertFormation(task.value);
      if(task.type==='choreo'){
        manualPoseLockUntil=Date.now()+1600;liveMove=task.value;
        if(task.value==='dancebreak')setPose('run');
        else if(task.value==='hitline')setPose('pose');
        else if(task.value==='mirror')currentPoses={Jisoo:'left',Jennie:'right','Rosé':'left',Lisa:'right'};
        else currentPoses={Jisoo:'sway',Jennie:'point','Rosé':'sing',Lisa:'hop'};
        interactions++;vibe+=7;renderLiveStage();updateLiveText(`${liveTaskLabel(task)} choreography locked.`);sfx('perfect');return;
      }
      if(task.type==='hype'){
        crowdMode=task.value==='flash'?'flash':task.value==='pulse'?'pulse':'wave';interactions++;vibe+=7;
        if(task.value==='flash')setEffect('flashbulb',820,false);else renderLiveStage();
        updateLiveText(`${liveTaskLabel(task)} crowd response triggered.`);sfx('good');return;
      }
    }
    function playModeMarkup(){
      return `<div class="concert-play-mode"><div><span>PLAY STYLE</span><small>LIVE DIRECTOR adds timed calls, scoring, camera catches, choreography and crowd hits.</small></div><div class="concert-mode-buttons"><button class="${directorMode==='live'?'on':''}" onclick="window.PV.concertMode('live')"><b>LIVE DIRECTOR</b><small>Interactive + scored</small></button><button class="${directorMode==='free'?'on':''}" onclick="window.PV.concertMode('free')"><b>FREE DIRECTOR</b><small>Sandbox controls</small></button></div></div>`;
    }

    function wardrobeMarkup(){
      return `<div class="concert-wardrobe wardrobe-v65"><div class="concert-wardrobe-head"><div><span>PIXEL WARDROBE · ALL 4 MEMBERS</span><small>Each button changes that member's actual concert sprite and keeps the choice for the live show.</small></div><em>${members.length} MEMBERS · ${spriteOutfits.length} LOOKS EACH</em></div><div class="concert-wardrobe-grid">${members.map(m=>{const current=spriteOutfitFor(m);const currentLabel=spriteOutfits.find(o=>o.id===current)?.label||'Pink Stage';return `<article class="wardrobe-member-card" data-wardrobe-member="${spriteKey(m)}"><div class="wardrobe-current"><div class="wardrobe-sprite-large">${pixelAvatar(m,false,'idle',current)}</div><div class="wardrobe-member-copy"><small>${m.toUpperCase()}</small><b>${currentLabel}</b><span>Live outfit</span></div></div><div class="wardrobe-look-grid" aria-label="${esc(m)} outfits">${spriteOutfits.map(o=>`<button class="wardrobe-look ${current===o.id?'on':''}" onclick="window.PV.concertOutfit('${m}','${o.id}')" aria-label="Put ${esc(m)} in ${esc(o.label)}" aria-pressed="${current===o.id}"><span class="wardrobe-look-sprite">${pixelAvatar(m,true,'idle',o.id)}</span><span class="wardrobe-look-copy"><b>${o.label.replace(' Stage','')}</b><small>${current===o.id?'ON STAGE':'CHANGE'}</small></span></button>`).join('')}</div></article>`}).join('')}</div></div>`;
    }

    function builderSetlistMarkup(){
      return setlist.map((key,i)=>{const t=youtubeTracks[key];return `<article class="simple-track-entry"><div><small>${String(i+1).padStart(2,'0')} · ${t.bpm} BPM</small><b>${t.title}</b><span>${t.era||'OFFICIAL VIDEO'}</span></div><nav><button onclick="window.PV.concertMoveTrack(${i},-1)" ${i===0?'disabled':''}>↑</button><button onclick="window.PV.concertMoveTrack(${i},1)" ${i===setlist.length-1?'disabled':''}>↓</button><button onclick="window.PV.concertRemoveTrack(${i})">×</button></nav></article>`;}).join('');
    }

    function drawBuilder(){
      warmConcertVariantSheets(members,'async');
      preloadConcertFxAssets('pyro');
      const preview=currentTrack();
      panel.innerHTML=`${hud('CONCERT FREE PLAY','BUILD THE SHOW',level,`${setlist.length}/${maxSongs} SONGS`)}<div class="concert-builder concert-builder-v27"><section class="concert-setlist-card concert-builder-main"><div class="concert-setlist-head"><div><span class="eyebrow">CUSTOM SETLIST</span><h3>${setlist.length} / ${maxSongs} tracks</h3></div><div class="concert-start-actions">${landscapeControlMarkup(true)}<button class="cta concert-start-show" onclick="window.PV.concertStartShow()" ${setlist.length?'':'disabled'}>START SHOW →</button></div></div><div class="concert-preset-row"><button onclick="window.PV.concertPreset('power')">POWER SET</button><button onclick="window.PV.concertPreset('early')">EARLY ERA</button><button onclick="window.PV.concertPreset('born')">PINK SET</button></div>${playModeMarkup()}<div class="concert-setlist compact concert-setlist-simple">${builderSetlistMarkup()}</div><div class="concert-library-head"><span>ADD SONGS</span><small>Simple song picker</small></div><div class="concert-song-library simple-list">${allTracks().map((t,idx)=>`<button class="concert-song simple-track ${setlist.includes(t.key)?'selected':''}" onclick="window.PV.concertAddTrack('${t.key}')" ${setlist.includes(t.key)||setlist.length>=maxSongs?'disabled':''}><div class="concert-song-copy"><small>${String(idx+1).padStart(2,'0')} · ${t.bpm} BPM · ${t.era||'OFFICIAL VIDEO'}</small><b>${t.title}</b></div><span class="concert-song-state">${setlist.includes(t.key)?'IN SETLIST':setlist.length>=maxSongs?'SETLIST FULL':'ADD SONG +'}</span></button>`).join('')}</div></section><section class="concert-preview-card concert-builder-stage"><div class="concert-stage preview theme-${themeClass()} formation-${slug(formation)} crowd-${slug(crowdMode)} track-${slug(preview.key)}">${stageArchitecture()}${stageAtmosphere()}${pixelStageScreen(preview,false)}${renderBand()}${renderCrowd()}</div><div class="concert-builder-copy"><span class="eyebrow">STAGE SETUP</span><h2>Your pixel concert</h2><p>Choose the look now; focus and live cues stay available during the show.</p><div class="concert-toggle-groups"><div><small>STAGE THEME</small><div class="concert-toggles">${['Pink Grid','Neon Arena','Encore Night'].map(name=>`<button class="${theme===name.toLowerCase()?'on':''}" onclick="window.PV.concertTheme('${name.toLowerCase()}')">${name}</button>`).join('')}</div></div><div><small>OPENING FORMATION</small><div class="concert-toggles">${['line','center','diamond'].map(name=>`<button class="${formation===name?'on':''}" onclick="window.PV.concertFormation('${name}')">${name.toUpperCase()}</button>`).join('')}</div></div><div><small>LED SCREEN</small><div class="concert-toggles screen-toggles">${[['auto','AUTO'],['pink-venom','VENOM'],['shutdown','SHUT DOWN'],['born-pink','BORN PINK'],['lovesick','LOVESICK'],['whistle','WHISTLE'],['playing-fire','PWF']].map(([id,label])=>`<button class="${screenMode===id?'on':''}" onclick="window.PV.concertScreen('${id}')">${label}</button>`).join('')}</div></div>${wardrobeMarkup()}</div></div></section></div>`;
      requestAnimationFrame(updateLandscapeButton);
    }

    function drawShow(message='Tap PLAY SHOW to start the concert.'){
      preloadConcertFxAssets(['pyro','co2']);
      const t=currentTrack();
      if(directorMode==='free'&&!directorTask)newDirectorTask();
      panel.innerHTML=`${hud('CONCERT FREE PLAY',t.title.toUpperCase(),level,`${currentIndex+1}/${setlist.length} · ${Math.round(vibe)} VIBE`)}<div class="concert-view-bar">${landscapeControlMarkup()}<small>Landscape gives the stage and live controls their own side-by-side panes.</small></div><div class="concert-shell concert-shell-v28"><div class="concert-main"><section class="concert-stage live theme-${themeClass()} formation-${slug(formation)} crowd-${slug(crowdMode)} reaction-${crowdReaction()} phase-${showPhase} fx-${effectMode} pulse-${stagePulse} track-${slug(t.key)} section-${slug(currentSectionKey)} director-power-${livePowerTier()}" style="${concertMotionStyle()}" data-section="${currentSectionKey}" id="concertStage">${stageScene(message)}</section>${directorMode==='live'?liveDirectorMarkup():quickDirectorMarkup()}${landscapeOverlayControlsMarkup()}<section class="concert-control-card concert-control-v28">${showStatusMarkup(message)}<div class="concert-director-dock">${directorMode==='live'?liveDirectorStatsMarkup():directorMarkup()}</div><div class="concert-player-card concert-audio-dock ${sourceVisible?'open':''}"><div class="concert-audio-head"><div class="yt-meta"><span>YOUTUBE AUDIO SOURCE</span><b>${t.title}</b><small>Video hidden by default so the pixel concert stays in focus.</small></div><button class="ghost-cta source-toggle" id="concertSourceToggle" onclick="window.PV.concertToggleSource()">${sourceVisible?'HIDE SOURCE':'SHOW SOURCE'}</button></div><div class="yt-player-frame concert-yt-frame ${sourceVisible?'revealed':'concealed'}"><div id="concert-player" class="yt-player"><div class="yt-placeholder"><b>▶</b><span>Loading YouTube player…</span></div></div></div><div class="concert-player-actions"><button class="cta" id="concertPlayBtn" onclick="window.PV.concertCue('play')" disabled>LOADING…</button><button class="ghost-cta" onclick="window.PV.concertEndShow()">END SHOW</button></div></div><nav class="concert-mobile-tabs"><button class="active" data-tab="cues" onclick="window.PV.concertTab('cues')">CUES</button><button data-tab="focus" onclick="window.PV.concertTab('focus')">FOCUS</button><button data-tab="setlist" onclick="window.PV.concertTab('setlist')">SETLIST</button></nav><div class="concert-tab-panel active" data-panel="cues"><div class="concert-live-controls"><button onclick="window.PV.concertCue('wave')"><b>↝</b><span>WAVE LIGHTS</span></button><button onclick="window.PV.concertCue('burst')"><b>✦</b><span>PINK BURST</span></button><button onclick="window.PV.concertCue('pose')"><b>★</b><span>GROUP POSE</span></button><button onclick="window.PV.concertCue('run')"><b>≫</b><span>DANCE BREAK</span></button><button onclick="window.PV.concertCue('pyro')"><b>▲</b><span>PIXEL PYRO</span></button><button onclick="window.PV.concertCue('confetti')"><b>✺</b><span>CONFETTI</span></button><button onclick="window.PV.concertCue('co2')"><b>≋</b><span>CO2 JETS</span></button><button onclick="window.PV.concertCue('glitter')"><b>✷</b><span>GLITTER</span></button><button onclick="window.PV.concertCue('colorwash')"><b>▨</b><span>COLOR WASH</span></button><button onclick="window.PV.concertCue('flashbulb')"><b>✹</b><span>FLASH POPS</span></button></div></div><div class="concert-tab-panel" data-panel="focus"><div class="concert-control-label">CAMERA FOCUS</div><div class="concert-focus-row member-focus">${members.map(m=>`<button class="${focus===m?'on':''}" onclick="window.PV.concertFocus('${m}')">${m}</button>`).join('')}<button class="${focus==='group'?'on':''}" onclick="window.PV.concertFocus('group')">GROUP</button></div><button class="concert-auto-vocal ${autoVocalCam?'on':''}" onclick="window.PV.concertAutoVocal()">AUTO VOCAL CAM · ${autoVocalCam?'ON':'OFF'}</button><div class="concert-control-label">FORMATION</div><div class="concert-focus-row formation-focus">${['line','center','diamond'].map(name=>`<button class="${formation===name?'on':''}" onclick="window.PV.concertFormation('${name}')">${name.toUpperCase()}</button>`).join('')}</div><div class="concert-control-label">LED SCREEN</div><div class="concert-focus-row screen-focus">${[['auto','AUTO'],['pink-venom','VENOM'],['shutdown','SHUT'],['born-pink','BORN'],['lovesick','LSG'],['whistle','WHISTLE'],['playing-fire','PWF']].map(([id,label])=>`<button class="${screenMode===id?'on':''}" onclick="window.PV.concertScreen('${id}')">${label}</button>`).join('')}</div></div><div class="concert-tab-panel" data-panel="setlist"><div class="concert-queue">${queueMarkup()}</div><button class="concert-next-track" onclick="window.PV.concertCue('next')" ${setlist.length<2?'disabled':''}>NEXT SONG →</button><div class="concert-stat-strip"><span><small>VIBE</small><b id="concertVibe">${Math.round(vibe)}</b></span><span><small>CUES</small><b id="concertCues">${interactions}</b></span><span><small>DIRECTOR</small><b id="concertDirectorClears">${directorClears}</b></span><span><small>CLEARED</small><b id="concertCleared">${completed}</b></span></div></div></section></div></div>`;
      applyConcertTab();
      requestAnimationFrame(updateLandscapeButton);
      bootPlayer();
    }

    function avatarVisualClass(key,safePose,outfit,sheetType,variant,animated,small,liveStable=false){
      return `pixel-avatar pixel-${key} pixel-pose-${safePose} outfit-${outfit} sheet-${sheetType} sheet-variant-${variant} ${liveStable?'live-stable-atlas ':''}${animated?'pixel-animated':'pixel-static'} ${small?'pixel-small':''}`;
    }
    function expectedSheetGeometry(sheetType){
      return sheetType==='dancecycle'?{w:1280,h:960}:{w:1920,h:240};
    }
    function sheetGeometryMatches(img,sheetType){
      const g=expectedSheetGeometry(sheetType);
      return !img?.naturalWidth||(img.naturalWidth===g.w&&img.naturalHeight===g.h);
    }
    function recoverAvatarGeometry(avatar,img){
      if(!avatar||!img?.complete||!img.naturalWidth)return;
      const actualType=(img.naturalWidth===1280&&img.naturalHeight===960)?'dancecycle':(img.naturalWidth===1920&&img.naturalHeight===240)?'default':'';
      if(!actualType||actualType===avatar.dataset.sheetType)return;
      avatar.classList.remove('sheet-default','sheet-dancecycle');
      avatar.classList.add(`sheet-${actualType}`);avatar.dataset.sheetType=actualType;
    }
    function commitAvatarVisual(avatar,img,{key,safePose,outfit,sheetType,variant,animated,small,src}){
      if(!avatar?.isConnected||!img)return false;
      /* Keep source + layout contract atomic. This prevents a 12x1 sheet from ever
         being painted with 8x4 grid CSS (or the reverse) during focus/pose swaps. */
      avatar.className=avatarVisualClass(key,safePose,outfit,sheetType,variant,animated,small);
      avatar.dataset.member=key;avatar.dataset.pose=safePose;avatar.dataset.outfit=outfit;
      avatar.dataset.sheetType=sheetType;avatar.dataset.sheetVariant=variant;
      img.src=src;
      img.dataset.goodSrc=src;
      avatar.dataset.pendingSrc='';
      return true;
    }
    function updateAvatarInPlace(avatar,member,pose){
      if(!avatar)return false;
      const key=spriteKey(member);
      const safePose=['idle','up','down','left','right','win','run','dance','carry','point','heart','sing','bow','sway','turn','kick','hop','sweep','pose','final'].includes(pose)?pose:'idle';
      const outfit=spriteOutfitFor(member),animated=!['win','carry'].includes(safePose),small=avatar.classList.contains('pixel-small');
      const liveStable=avatar.dataset.liveStable==='1'||avatar.classList.contains('live-stable-atlas');
      const desiredVariant=memberSpriteSheetVariant(member,safePose,{section:currentSectionKey,focusName:focus,phase:showPhase});
      const img=avatar.querySelector('.pixel-sheet-img');
      const viewport=avatar.querySelector('.pixel-sheet-viewport');
      if(!img||!viewport)return false;

      /* RC7 stage stability: the live band never changes atlas geometry or source
         as choreography changes. Every member keeps one 8x4 base atlas mounted.
         On compact/mobile layouts the visible frames are painted as the viewport
         background instead of moving a very large IMG element around. */
      if(liveStable){
        const stableSrc=dedicatedDanceSheets[key]?.[outfit]||memberSpriteSheet(member,outfit,'dance','base');
        const sheetType='dancecycle';
        avatar.className=avatarVisualClass(key,safePose,outfit,sheetType,desiredVariant,animated,small,true);
        avatar.dataset.member=key;avatar.dataset.pose=safePose;avatar.dataset.outfit=outfit;
        avatar.dataset.sheetType=sheetType;avatar.dataset.sheetVariant=desiredVariant;avatar.dataset.liveStable='1';
        avatar.dataset.pendingSrc='';avatar.dataset.pendingToken='';
        const cssUrl=`url("${stableSrc}")`;
        if(viewport.style.getPropertyValue('--pv-live-atlas')!==cssUrl)viewport.style.setProperty('--pv-live-atlas',cssUrl);
        if((img.getAttribute('src')||'')!==stableSrc){
          img.setAttribute('src',stableSrc);
          img.dataset.goodSrc=stableSrc;
        }
        return true;
      }

      const sheetType=memberSpriteSheetType(member,outfit,safePose);
      const desiredSrc=memberSpriteSheet(member,outfit,safePose,desiredVariant);
      recoverAvatarGeometry(avatar,img);
      const currentSrc=img.getAttribute('src')||'';
      if(!img.dataset.goodSrc&&currentSrc)img.dataset.goodSrc=currentSrc;

      if(currentSrc===desiredSrc){
        avatar.className=avatarVisualClass(key,safePose,outfit,sheetType,desiredVariant,animated,small,false);
        avatar.dataset.member=key;avatar.dataset.pose=safePose;avatar.dataset.outfit=outfit;
        avatar.dataset.sheetType=sheetType;avatar.dataset.sheetVariant=desiredVariant;avatar.dataset.pendingSrc='';
        return true;
      }

      if(avatar.dataset.pendingSrc===desiredSrc)return true;
      avatar.dataset.pendingSrc=desiredSrc;
      const requestToken=`${desiredSrc}|${safePose}|${sheetType}|${desiredVariant}`;
      avatar.dataset.pendingToken=requestToken;
      const pre=new Image();pre.decoding='async';let committed=false;
      const commit=()=>{
        if(committed||!avatar.isConnected||avatar.dataset.pendingToken!==requestToken||avatar.dataset.pendingSrc!==desiredSrc)return;
        if(!pre.complete||!pre.naturalWidth||!sheetGeometryMatches(pre,sheetType)){
          avatar.dataset.pendingSrc='';avatar.dataset.pendingToken='';return;
        }
        committed=true;
        commitAvatarVisual(avatar,img,{key,safePose,outfit,sheetType,variant:desiredVariant,animated,small,src:desiredSrc});
        avatar.dataset.pendingToken='';
      };
      pre.onload=commit;
      pre.onerror=()=>{if(avatar.dataset.pendingToken===requestToken){avatar.dataset.pendingSrc='';avatar.dataset.pendingToken='';}};
      pre.src=desiredSrc;
      try{pre.decode?.().then(commit).catch(()=>{});}catch{}
      return true;
    }
    function updateBandInPlace(host){
      const band=host.querySelector('.concert-band');
      if(!band)return false;
      band.className=`concert-band formation-${slug(formation)} focus-${slug(focus)}`;
      let ok=true;
      members.forEach((m,i)=>{
        const perf=band.querySelector(`[data-member="${spriteKey(m)}"]`);
        if(!perf){ok=false;return;}
        perf.className=`concert-performer ${focus===m?'focus':''} ${focus==='group'?'group-focus':''} ${performerStageClass(m,i)}`;perf.style.setProperty('--slot',i);
        perf.dataset.member=spriteKey(m);
        const wantsSpotlight=focus===m&&['spotlight','blackout'].includes(effectMode);
        const spot=perf.querySelector('.member-spotlight-sprite');
        if(wantsSpotlight&&!spot)perf.insertAdjacentHTML('afterbegin',memberSpotlightMarkup(m));
        else if(!wantsSpotlight&&spot)spot.remove();
        const card=perf.querySelector('.concert-performer-card');
        if(card&&!card.querySelector('.concert-motion-shell')){
          const avatar=card.querySelector('.pixel-avatar');
          if(avatar){const shell=document.createElement('div');shell.className='concert-motion-shell';avatar.replaceWith(shell);shell.appendChild(avatar);}
        }
        if(!updateAvatarInPlace(perf.querySelector('.pixel-avatar'),m,currentPoses[m]||'idle'))ok=false;
      });
      return ok;
    }
    function stabilizeLiveMemberPaint(host){
      if(!host)return;
      host.querySelectorAll('.pixel-avatar.live-stable-atlas').forEach(avatar=>{
        const member=members.find(m=>spriteKey(m)===avatar.dataset.member);
        if(!member)return;
        const outfit=spriteOutfitFor(member);
        const src=dedicatedDanceSheets[spriteKey(member)]?.[outfit];
        const viewport=avatar.querySelector('.pixel-sheet-viewport');
        if(src&&viewport){
          const cssUrl=`url("${src}")`;
          if(viewport.style.getPropertyValue('--pv-live-atlas')!==cssUrl)viewport.style.setProperty('--pv-live-atlas',cssUrl);
        }
        avatar.style.removeProperty('display');
        avatar.style.removeProperty('visibility');
        avatar.style.removeProperty('opacity');
      });
    }
    function updateCrowdInPlace(host){
      const crowd=host.querySelector('.concert-crowd');
      if(!crowd)return false;
      const reaction=crowdReaction();
      const preset=screenPreset(currentTrack());
      crowd.className=`concert-crowd crowd-${slug(crowdMode)} reaction-${reaction}`;
      const signs=crowd.querySelectorAll('.concert-crowd-signs b');
      if(signs[0])signs[0].textContent=preset.headline;
      if(signs[1])signs[1].textContent='BLINK';
      if(signs[2])signs[2].textContent=reaction==='chant'?preset.chant:'ENCORE!';
      return true;
    }
    function updateScreenInPlace(host){
      const screen=host.querySelector('.concert-stage-screen');
      const t=currentTrack();
      const preset=screenPreset(t);
      if(!screen||screen.dataset.track!==t.key||screen.dataset.preset!==preset.id){
        if(screen)screen.outerHTML=pixelStageScreen(t,true);
        return;
      }
      const era=screen.querySelector('#concertEra');if(era)era.textContent=screenMode==='auto'?`AUTO · ${preset.kicker}`:preset.kicker;
      const title=screen.querySelector('#concertSongTitle');if(title)title.textContent=preset.headline;
      const sub=screen.querySelector('.concert-stage-label span');if(sub)sub.textContent=t.title;
      const badge=screen.querySelector('.concert-screen-badge');if(badge)badge.textContent=preset.sub;
      const chant=screen.querySelector('.concert-screen-chant');if(chant)chant.textContent=preset.chant;
      const wash=host.querySelector('.concert-stage-wash');if(wash)wash.className=`concert-stage-wash wash-${slug(t.key)}`;
    }
    function updateEffectsInPlace(host){
      const fx=host.querySelector('.concert-fx');
      const serial=String(effectSerial);
      if(!fx)host.insertAdjacentHTML('beforeend',effectMarkup());
      else if(fx.dataset.mode!==effectMode||fx.dataset.effectSerial!==serial)fx.outerHTML=effectMarkup();
      host.querySelector('.concert-member-intro')?.remove();
      const intro=introMarkup();if(intro)host.insertAdjacentHTML('beforeend',intro);
      host.querySelector('.concert-stage-transition')?.remove();
      const transition=transitionMarkup();if(transition)host.insertAdjacentHTML('beforeend',transition);
    }
    function renderLiveStage(){
      const host=document.getElementById('concertStage');
      if(!host)return;
      warmConcertVariantSheets();
      const oldMessage=document.getElementById('concertMessage')?.textContent||'Show running.';
      host.className=`concert-stage live theme-${themeClass()} formation-${slug(formation)} crowd-${slug(crowdMode)} reaction-${crowdReaction()} phase-${showPhase} fx-${effectMode} pulse-${stagePulse} track-${slug(currentTrack().key)} section-${slug(currentSectionKey)} director-power-${livePowerTier()}`;host.dataset.section=currentSectionKey;
      const beat=concertBeatSeconds();host.style.setProperty('--beat-sec',`${beat.toFixed(4)}s`);host.style.setProperty('--half-beat',`${(beat/2).toFixed(4)}s`);host.style.setProperty('--double-beat',`${(beat*2).toFixed(4)}s`);host.style.setProperty('--four-beat',`${(beat*4).toFixed(4)}s`);
      /* v42: keep performer image nodes mounted. Rebuilding the whole stage caused
         mobile Chromium to intermittently drop animated image layers. */
      if(!updateBandInPlace(host)){
        host.innerHTML=stageScene(oldMessage);
        return;
      }
      stabilizeLiveMemberPaint(host);
      updateScreenInPlace(host);
      updateCrowdInPlace(host);
      updateVocalChipInPlace(host);
      updateLandscapeMemberCamInPlace(host);
      updateEffectsInPlace(host);
    }

    function applyConcertTab(){
      document.querySelectorAll('.concert-mobile-tabs button').forEach(btn=>btn.classList.toggle('active',btn.dataset.tab===activePanel));
      document.querySelectorAll('.concert-tab-panel').forEach(panel=>panel.classList.toggle('active',panel.dataset.panel===activePanel));
    }
    function applyConcertSource(force){
      if(typeof force==='boolean')sourceVisible=force; else sourceVisible=!sourceVisible;
      const dock=document.querySelector('.concert-audio-dock');
      const frame=document.querySelector('.concert-yt-frame');
      const toggle=document.getElementById('concertSourceToggle');
      if(dock)dock.classList.toggle('open',sourceVisible);
      if(frame){frame.classList.toggle('revealed',sourceVisible);frame.classList.toggle('concealed',!sourceVisible);}
      if(toggle)toggle.textContent=sourceVisible?'HIDE SOURCE':'SHOW SOURCE';
    }
    function updateLiveText(message){
      const t=currentTrack();
      const msg=document.getElementById('concertMessage');if(msg)msg.textContent=message;
      const sub=document.getElementById('concertSub');if(sub)sub.innerHTML=`${completed}/${setlist.length} songs cleared · ${crowdReaction().toUpperCase()} crowd · score preview ${scoreEstimate()}${directorMode==='live'?` · DIRECTOR ×${liveDirectorCombo}`:''} · <strong id="concertSectionText">${currentSectionLabel}</strong>`;
      const chip=document.getElementById('concertSectionChip');if(chip)chip.textContent=currentSectionLabel;
      const vibeEl=document.getElementById('concertVibe');if(vibeEl)vibeEl.textContent=String(Math.round(vibe));
      const cueEl=document.getElementById('concertCues');if(cueEl)cueEl.textContent=String(interactions);
      const dirEl=document.getElementById('concertDirectorClears');if(dirEl)dirEl.textContent=String(directorClears);
      const clearEl=document.getElementById('concertCleared');if(clearEl)clearEl.textContent=String(completed);
      document.querySelectorAll('.concert-queue-pill').forEach((el,i)=>el.classList.toggle('active',i===currentIndex));
      const hudTitle=document.querySelector('.game-hud>div>b');if(hudTitle)hudTitle.textContent=t.title.toUpperCase();
      const meta=document.querySelector('.hud-meta');if(meta)meta.textContent=`${currentIndex+1}/${setlist.length} · ${Math.round(vibe)} VIBE`;
      const sourceMeta=document.querySelector('.yt-meta b');if(sourceMeta)sourceMeta.textContent=t.title;
    }

    function beatLoop(){
      if(ended||!activeYouTubePlayer)return;
      try{
        if(Number(activeYouTubePlayer.getPlayerState?.())===1){
          const t=currentTrack();
          const now=Number(activeYouTubePlayer.getCurrentTime?.()||0);
          const beatIndex=Math.floor(beatPosition(t,now));
          if(beatIndex!==lastBeat){
            lastBeat=beatIndex;stagePulse=((beatIndex%4)+4)%4;
            const host=document.getElementById('concertStage');
            if(host){
              host.dataset.beat=String(stagePulse);
              host.classList.toggle('downbeat',stagePulse===0);
              host.classList.toggle('beat-accent',beatIndex%8===0);
              setTimeout(()=>{host?.classList.remove('downbeat','beat-accent');},110);
              const duration=Number(activeYouTubePlayer.getDuration?.()||0);
              updateSongSection(now,duration,beatIndex);
              triggerBeatFxAccent(beatIndex);
              updateLiveDirector(beatIndex);
            }
          }
          syncLandscapeMemberCamFrame(document.getElementById('concertStage'));
        }
      }catch{}
    }

    async function bootPlayer(){
      clearTimeout(startFallbackTimer);clearInterval(beatTimer);
      try{
        const YT=await loadYouTubeAPI();
        await new Promise((resolve,reject)=>{
          const timer=setTimeout(()=>reject(new Error('concert player timeout')),10000);
          const t=currentTrack();
          const vars={playsinline:1,controls:1,rel:0,fs:0,enablejsapi:1,start:t.start};
          if(/^https?:$/.test(location.protocol))vars.origin=location.origin;
          const player=new YT.Player('concert-player',{width:'100%',height:'100%',videoId:t.videoId,playerVars:vars,events:{
            onReady:()=>{clearTimeout(timer);activeYouTubePlayer=player;playerReady=true;try{player.cueVideoById?.({videoId:t.videoId,startSeconds:t.start});}catch{}syncYouTubeSound();document.querySelector('#concert-player .yt-placeholder')?.remove();const btn=document.getElementById('concertPlayBtn');if(btn){btn.disabled=false;btn.textContent='PLAY SHOW';}updateLandscapePlayButton('PLAY SHOW');clearInterval(beatTimer);beatTimer=setInterval(beatLoop,125);beatLoop();resolve();},
            onStateChange:e=>{if(e.data===YT.PlayerState.PLAYING){started=true;showPhase=openingDone?'live':'intro';const btn=document.getElementById('concertPlayBtn');if(btn)btn.textContent='PLAYING';updateLandscapePlayButton('PLAYING');updateLiveText(`Now performing ${currentTrack().title}.`);runOpeningSequence();}if(e.data===YT.PlayerState.ENDED&&!ended){completed=Math.min(setlist.length,completed+1);if(currentIndex<setlist.length-1){songTransition(currentIndex+1,true);}else showFinale();}},
            onAutoplayBlocked:()=>showBlocked(),onError:e=>reject(new Error(`YouTube error ${e.data}`))
          }});
        });
      }catch(err){console.warn(err);const btn=document.getElementById('concertPlayBtn');if(btn){btn.disabled=true;btn.textContent='PLAYER UNAVAILABLE';}updateLandscapePlayButton('UNAVAILABLE');updateLiveText('YouTube could not load here. Try serving the folder over HTTP.');}
    }
    function showBlocked(){const btn=document.getElementById('concertPlayBtn');if(btn){btn.disabled=false;btn.textContent='OPEN SOURCE / RETRY';}updateLandscapePlayButton('OPEN SOURCE');applyConcertSource(true);updateLiveText('Playback was blocked. Open the YouTube source, tap it once, then retry.');}
    function loadTrack(autoplay=false,message='Song queued. Tap PLAY SHOW when ready.'){
      if(!playerReady||!activeYouTubePlayer)return;
      lastBeat=-1;
      if(directorMode==='live')resetLiveDirectorForTrack(false);
      if(showPhase!=='intro'&&showPhase!=='finale')showPhase='live';
      const t=currentTrack();
      try{if(state.sound!==false){activeYouTubePlayer.unMute?.();activeYouTubePlayer.setVolume?.(100);}else activeYouTubePlayer.mute?.();if(autoplay){activeYouTubePlayer.loadVideoById?.({videoId:t.videoId,startSeconds:t.start,suggestedQuality:'default'});activeYouTubePlayer.playVideo?.();}else activeYouTubePlayer.cueVideoById?.({videoId:t.videoId,startSeconds:t.start});}catch{}
      manualPoseLockUntil=0;manualFocusLockUntil=0;autoFxLockUntil=0;lastAutoFxBeat=-999;currentSongProgress=0;currentVocalMember=vocalFocusFor(currentTrack().key,0);livePhrase=-1;liveMove='groove';currentSectionKey='intro';currentSectionLabel='INTRO';currentSectionIndex=0;setPose(autoplay?'dance':'idle');renderLiveStage();updateLiveText(message);if(directorMode==='free')newDirectorTask();renderLiveDirector();
      const meta=document.querySelector('.yt-meta b');if(meta)meta.textContent=t.title;
      const btn=document.getElementById('concertPlayBtn');if(btn){btn.disabled=false;btn.textContent=autoplay?'STARTING…':'PLAY SHOW';}updateLandscapePlayButton(autoplay?'STARTING…':'PLAY SHOW');
      applyConcertSource(sourceVisible);
      if(autoplay)startFallbackTimer=setTimeout(()=>{if(!started)showBlocked();},1600);
    }
    function addVibe(points,message,pose='focus',taskType='',taskValue=''){
      interactions++;vibe+=points;stagePulse=(stagePulse+1)%5;manualPoseLockUntil=Date.now()+1100;liveMove=pose==='run'?'travel':pose==='focus'?'accent':pose==='wave'?'step-left':pose==='burst'?'bounce':liveMove;setPose(pose);renderLiveStage();
      const cleared=taskType?checkDirector(taskType,taskValue):false;
      updateLiveText(cleared?`${message} · Director bonus cleared.`:message);
      sfx(points>=7?'perfect':'good');vibrate(points>=7?18:10);
      if(showPhase==='live'&&pose!=='dance')showTimers.push(setTimeout(()=>{if(!ended&&showPhase==='live'&&effectMode==='none'){setPose('dance');renderLiveStage();}},950));
    }
    function showFinale(){
      if(finaleShown)return;
      finaleShown=true;ended=true;showPhase='finale';effectMode='encore';introMember='';focus='group';crowdMode='flash';setPose('bow');completed=Math.max(completed,setlist.length);
      clearTimeout(startFallbackTimer);clearInterval(beatTimer);
      try{activeYouTubePlayer?.pauseVideo?.();}catch{}
      panel.innerHTML=`${hud('CONCERT FREE PLAY','ENCORE FINALE',level,`${directorClears} DIRECTOR CUES`)}<div class="concert-finale"><section class="concert-stage live finale theme-${themeClass()} formation-center crowd-flash reaction-roar phase-finale fx-encore track-${slug(currentTrack().key)} section-outro" style="${concertMotionStyle()}" data-section="outro" id="concertStage">${stageScene('The set is complete — take the final bow.')}</section><div class="concert-finale-copy"><span class="eyebrow">PINKVERSE ENCORE</span><h2>THANK YOU, BLINK!</h2><p>${setlist.length} song${setlist.length===1?'':'s'} · ${interactions} stage cues · ${directorMode==='live'?`${liveShowGrade()} GRADE · ${liveAccuracy()}% accuracy · ${livePerfect} PERFECT · ${liveGood} GOOD · ${liveMiss} MISS · best ×${liveDirectorBest} · ${liveSectionClears} section clears · ${liveSongMissionClears} song missions · ${liveOverdriveCount} overdrive`:`${directorClears} director requests`} · ${Math.round(vibe)} vibe</p><div class="concert-finale-members">${members.map(m=>`<div>${pixelAvatar(m,true,'bow')}<b>${m}</b></div>`).join('')}</div><button class="cta" onclick="window.PV.concertBow()">TAKE A BOW →</button></div></div>`;
      sfx('perfect');vibrate(30);
    }
    function completeShow(){
      const titles=setlist.map(k=>youtubeTracks[k].title).join(' → ');
      const played=Math.max(completed,started?Math.min(setlist.length,currentIndex+1):completed);
      finish('concert-freeplay',scoreEstimate(),`${played}/${setlist.length} songs played · ${interactions} live cues · ${directorMode==='live'?`${liveShowGrade()} grade · ${liveAccuracy()}% accuracy · ${livePerfect} perfect / ${liveGood} good / ${liveMiss} miss · best combo ×${liveDirectorBest} · ${liveSectionClears} section clears · ${liveSongMissionClears} song missions · ${liveOverdriveCount} overdrive`:`${directorClears} director requests`} · ${theme} stage · ${titles}.`);
    }

    function finishShow(){
      if(finaleShown)return completeShow();
      showFinale();
    }

    window.PV.concertAddTrack=key=>{if(!youtubeTracks[key]||setlist.includes(key)||setlist.length>=maxSongs)return;setlist.push(key);selectedYouTubeTrack=key;sfx('tap');drawBuilder();};
    window.PV.concertRemoveTrack=i=>{if(i<0||i>=setlist.length)return;setlist.splice(i,1);if(!setlist.length)setlist=[selectedYouTubeTrack];sfx('miss');drawBuilder();};
    window.PV.concertMoveTrack=(i,dir)=>{const j=i+dir;if(j<0||j>=setlist.length)return;const item=setlist.splice(i,1)[0];setlist.splice(j,0,item);sfx('tap');drawBuilder();};
    window.PV.concertPreset=name=>{const presets={power:['d4','ktl','hylt','pinkvenom','shutdown'],early:['boombayah','whistle','pwf','aiiyl','stay'],born:['pinkvenom','shutdown','lsg','icecream']};setlist=(presets[name]||['hylt']).filter(k=>youtubeTracks[k]).slice(0,maxSongs);selectedYouTubeTrack=setlist[0];sfx('start');drawBuilder();};
    window.PV.concertOutfit=(member,outfit)=>{if(!members.includes(member)||!spriteOutfits.some(o=>o.id===outfit))return;state.pixelOutfits={...(state.pixelOutfits||{}),[member]:outfit};save();sfx('tap');if(document.getElementById('concertStage')){renderLiveStage();updateLiveText(`${member} switched to ${spriteOutfits.find(o=>o.id===outfit)?.label||outfit}.`);}else drawBuilder();};
    window.PV.concertTheme=name=>{theme=name;crowdMode=name.includes('neon')?'flash':name.includes('encore')?'wave':'pulse';sfx('tap');if(document.getElementById('concertStage')){renderLiveStage();updateLiveText(`Theme set to ${name}.`);}else drawBuilder();};
    window.PV.concertFormation=name=>{formation=name;sfx('tap');if(document.getElementById('concertStage'))addVibe(3,`Formation switched to ${name.toUpperCase()}.`,'focus','formation',name);else drawBuilder();};
    window.PV.concertFocus=name=>{focus=name;manualFocusLockUntil=Date.now()+4200;addVibe(4,name==='group'?'Group focus restored.':`${name} takes manual camera focus.`,'focus','focus',name);};
    window.PV.concertAutoVocal=()=>{autoVocalCam=!autoVocalCam;manualFocusLockUntil=0;if(autoVocalCam){focus=vocalFocusFor(currentTrack().key,currentSongProgress);currentVocalMember=focus;}renderLiveStage();updateLiveText(autoVocalCam?'Auto Vocal Cam is following the current singer.':'Auto Vocal Cam paused — manual focus stays in control.');};
    window.PV.concertVocalFocus=name=>{if(!members.includes(name))return;focus=name;currentVocalMember=name;manualFocusLockUntil=Date.now()+2200;setEffect('spotlight',950,false);addVibe(7,`Vocal camera caught ${name}.`,'focus','vocal',name);};
    window.PV.concertCamera=mode=>{if(mode==='wide'){focus='group';formation='line';manualFocusLockUntil=Date.now()+2400;addVibe(6,'Full-stage wide camera locked.','dance','camera','wide');return;}if(mode==='spotlight'){const singer=members.includes(currentVocalMember)?currentVocalMember:vocalFocusFor(currentTrack().key,currentSongProgress);focus=members.includes(singer)?singer:'group';manualFocusLockUntil=Date.now()+2400;setEffect('spotlight',1100,false);addVibe(7,focus==='group'?'Spotlight opened to the full group.':`Spotlight follows ${focus}.`,'focus','camera','spotlight');}};
    window.PV.concertScreen=name=>{screenMode=name;sfx('tap');if(document.getElementById('concertStage')){renderLiveStage();updateLiveText(`LED screen set to ${name==='auto'?'track era auto':name.replace(/-/g,' ')}.`);}else drawBuilder();};
    window.PV.concertDoDirector=()=>{if(!directorTask)return;performLiveTask(directorTask);};
    window.PV.concertTab=name=>{activePanel=['cues','focus','setlist'].includes(name)?name:'cues';applyConcertTab();};
    window.PV.concertToggleSource=force=>{applyConcertSource(typeof force==='boolean'?force:undefined);};
    window.PV.concertLandscape=force=>setConcertLandscape(typeof force==='boolean'?force:undefined);
    window.PV.concertLandscapeControls=()=>{landscapeControlsOpen=!landscapeControlsOpen;syncLandscapeOverlayUI();};
    window.PV.concertMemberCam=()=>{landscapeMemberCamEnabled=!landscapeMemberCamEnabled;syncLandscapeOverlayUI();renderLiveStage();};
    window.PV.concertMode=mode=>{directorMode=mode==='free'?'free':'live';sfx('tap');drawBuilder();};
    window.PV.concertLiveChoice=index=>{
      if(directorMode!=='live'||!liveCall||liveCall.resolved)return;
      const task=liveCall.choices[index];if(!task)return;
      const correct=task.type===liveCall.correct.type&&task.value===liveCall.correct.value;
      const tapBeat=currentLiveBeatPosition();
      if(tapBeat<liveCall.targetBeat-1.15){sfx('miss');vibrate(5);updateLiveText('Too early — follow the countdown and hit closer to the beat.');return;}
      if(!correct){missLiveDirectorCall('WRONG CALL');return;}
      const delta=Math.abs(tapBeat-liveCall.targetBeat);
      if(delta>1.2){missLiveDirectorCall('MISS');return;}
      const grade=delta<=.38?'PERFECT':'GOOD';
      liveDirectorCombo++;liveDirectorBest=Math.max(liveDirectorBest,liveDirectorCombo);
      const basePoints=grade==='PERFECT'?100:65;
      const points=Math.round(basePoints*liveDirectorMultiplier());
      liveCall.resolved=true;liveCall.result=grade;liveCall.clearBeat=lastBeat+2;
      liveDirectorScore+=points;livePower=clamp(livePower+(grade==='PERFECT'?12:8)+Math.min(6,Math.floor(liveDirectorCombo/4)*2),0,100);
      liveSectionHits++;liveSongClean++;if(grade==='PERFECT')liveSongPerfect++;completeLiveSectionGoal();completeLiveSongMission();
      if(grade==='PERFECT'){livePerfect++;vibe+=7;sfx('perfect');vibrate(18);}else{liveGood++;vibe+=4;sfx('good');vibrate(10);}
      if(livePower>=100&&!liveMaxTriggered){liveMaxTriggered=true;crowdMode='flash';vibe+=4;showLiveDirectorFeedback('OVERDRIVE READY',0);}
      showLiveDirectorFeedback(grade,points);performLiveTask(task);renderLiveDirector();
    };
    window.PV.concertOverdrive=()=>{
      if(directorMode!=='live'||showPhase!=='live'||ended||livePower<100||lastBeat<=liveOverdriveUntilBeat)return;
      liveOverdriveUntilBeat=lastBeat+16;liveOverdriveCount++;livePower=35;liveMaxTriggered=false;liveNextCallBeat=Math.min(liveNextCallBeat,lastBeat+3);crowdMode='flash';vibe+=10;liveDirectorScore+=200;
      const party=['boombayah','aiiyl','icecream','lsg'].includes(currentTrack().key);
      setEffect(party?'partyhit':'powerhit',1050,false);showLiveDirectorFeedback('OVERDRIVE',200);sfx('perfect');vibrate(28);renderLiveDirector();updateLiveText('OVERDRIVE ACTIVE · faster calls and a boosted multiplier for 16 beats.');
    };
    window.PV.concertStartShow=()=>{warmConcertVariantSheets(members,'sync');started=false;ended=false;currentIndex=0;completed=0;interactions=0;vibe=0;directorClears=0;directorStreak=0;directorTask=null;liveCall=null;liveDirectorScore=0;liveDirectorCombo=0;liveDirectorBest=0;livePerfect=0;liveGood=0;liveMiss=0;livePower=0;liveNextCallBeat=12;liveMaxTriggered=false;liveOverdriveUntilBeat=-1;liveOverdriveCount=0;liveSectionHits=0;liveSectionGoal=2;liveSectionCleared=false;liveSectionClears=0;liveTrackKey='';liveRecoveryCalls=0;liveCallNumber=0;liveSongClean=0;liveSongPerfect=0;liveSongMissionCleared=false;liveSongMissionClears=0;focus='group';autoVocalCam=directorMode!=='live';manualFocusLockUntil=0;currentSongProgress=0;currentVocalMember=vocalFocusFor(currentTrack().key,0);activePanel='cues';sourceVisible=false;landscapeMemberCamEnabled=true;landscapeControlsOpen=concertLandscapeActive();effectMode='none';effectSerial++;transitionTitle='';introMember='';showPhase='intro';openingDone=false;finaleShown=false;currentSectionKey='intro';currentSectionLabel='INTRO';currentSectionIndex=0;setPose('idle');if(directorMode==='free')newDirectorTask();sfx('start');drawShow();};
    window.PV.concertNextSong=forcedIndex=>{if(typeof forcedIndex==='number'&&forcedIndex>=0&&forcedIndex<setlist.length){songTransition(forcedIndex,false);return;}if(currentIndex>=setlist.length-1)return;songTransition(currentIndex+1,true);};
    window.PV.concertCue=kind=>{if(kind==='play'){if(!playerReady)return;landscapeControlsOpen=false;syncLandscapeOverlayUI();loadTrack(true,`Now performing ${currentTrack().title}.`);return;}if(kind==='next'){window.PV.concertNextSong();return;}if(kind==='wave'){crowdMode='wave';addVibe(6,'Crowd wave triggered.','wave','cue','wave');return;}if(kind==='burst'){crowdMode='flash';effectMode='strobe';addVibe(8,'Pink burst hit the arena.','burst','cue','burst');setEffect('strobe',760);return;}if(kind==='pose'){effectMode='sparkle';addVibe(7,'Encore pose locked in.','pose','cue','pose');setEffect('sparkle',900);return;}if(kind==='run'){addVibe(6,'Dance break activated.','dance','cue','run');return;}if(kind==='pyro'){effectMode='pyro';addVibe(9,'Pixel pyro fired across the stage.','burst','cue','pyro');setEffect('pyro',1200);return;}if(kind==='confetti'){effectMode='confetti';addVibe(8,'Confetti drop over the crowd.','pose','cue','confetti');setEffect('confetti',1800);return;}if(kind==='laser'){effectMode='laser';addVibe(7,'Laser sweep crossed the arena.','dance','cue','laser');setEffect('laser',1100);return;}if(kind==='blackout'){const singer=members.includes(currentVocalMember)?currentVocalMember:vocalFocusFor(currentTrack().key,currentSongProgress);focus=members.includes(singer)?singer:'group';manualFocusLockUntil=Date.now()+1800;effectMode='blackout';addVibe(8,focus==='group'?'Blackout hit — full-stage silhouette.':`Blackout hit — ${focus} in the spotlight.`,'focus','cue','blackout');setEffect('blackout',980,false);return;}if(kind==='chant'){crowdMode='wave';effectMode='flashbulb';addVibe(7,'Fan chant wave rolling through the pit.','wave','cue','chant');setEffect('flashbulb',920);return;}if(kind==='co2'){effectMode='co2';addVibe(8,'CO2 jets blasted up from the deck.','burst','cue','co2');setEffect('co2',1000);return;}if(kind==='glitter'){effectMode='glitter';addVibe(8,'Glitter rain filled the arena.','pose','cue','glitter');setEffect('glitter',1650);return;}if(kind==='colorwash'){effectMode='colorwash';addVibe(7,'Color wash flooded the full stage.','focus','cue','colorwash');setEffect('colorwash',1250);return;}if(kind==='flashbulb'){effectMode='flashbulb';addVibe(7,'Flashbulb pops tracked the performance.','focus','cue','flashbulb');setEffect('flashbulb',950);return;}};
    window.PV.concertEndShow=()=>finishShow();
    window.PV.concertBow=()=>completeShow();

    drawBuilder();
  }

  function stageClash(level){
    const panel=document.getElementById('playboard');
    const roundGoal=level==='easy'?4:level==='medium'?5:6;
    const neededWins=2;
    let round=1,p1=0,p2=0,wins1=0,wins2=0,streak1=0,streak2=0,shield1=0,shield2=0,ready1=false,ready2=false,over=false,between=false,falseStarts1=0,falseStarts2=0;
    const waits={1:null,2:null},expires={1:null,2:null};
    cleanup=()=>{Object.values(waits).forEach(clearTimeout);Object.values(expires).forEach(clearTimeout);};

    function draw(message='Independent cues · first to the round target wins the set.'){
      panel.innerHTML=`${hud('STAGE CLASH',`ROUND ${round} · FIRST TO ${roundGoal}`,level,`SETS ${wins1}–${wins2}`)}<div class="clash-matchbar ${ready1||ready2?'cue-live':''}"><span>P1 ${'◆'.repeat(wins1)}${'◇'.repeat(neededWins-wins1)}</span><b>${message}</b><span>P2 ${'◆'.repeat(wins2)}${'◇'.repeat(neededWins-wins2)}</span></div><div class="clash-cue-lamps"><i class="${ready1?'on':''}">P1</i><span>WAIT FOR YOUR LIGHT</span><i class="${ready2?'on':''}">P2</i></div><div class="clash-board"><button class="clash-pad p1 ${ready1?'live':''}" id="clash1" ${between?'disabled':''}><small>PLAYER 1 · ${shield1?'SHIELD READY':'NO SHIELD'}</small><b>${p1}</b><span>${ready1?'TAP!':'WAIT'}</span><i>${ready1?'LOW CUE':`STREAK ×${streak1}`}</i></button><div class="clash-vs">VS</div><button class="clash-pad p2 ${ready2?'live':''}" id="clash2" ${between?'disabled':''}><small>PLAYER 2 · ${shield2?'SHIELD READY':'NO SHIELD'}</small><b>${p2}</b><span>${ready2?'TAP!':'WAIT'}</span><i>${ready2?'HIGH CUE':`STREAK ×${streak2}`}</i></button></div><p class="clash-note">Three clean hits in a row earns a shield. A shield absorbs one false-start penalty.</p>`;
      document.getElementById('clash1').onclick=()=>tap(1);
      document.getElementById('clash2').onclick=()=>tap(2);
    }
    function schedule(player){
      if(over||between)return;
      clearTimeout(waits[player]);clearTimeout(expires[player]);
      const wait=650+Math.random()*(level==='hard'?850:1450);
      waits[player]=setTimeout(()=>{
        if(over||between)return;
        if(player===1)ready1=true;else ready2=true;
        sfx('cue',player===1?430:680);draw();
        expires[player]=setTimeout(()=>{
          if(over||between)return;
          if(player===1){ready1=false;streak1=0;}else{ready2=false;streak2=0;}
          sfx('miss');draw('Cue expired — streak reset.');schedule(player);
        },level==='hard'?560:level==='medium'?720:880);
      },wait);
    }
    function roundWon(player){
      between=true;clearTimeout(waits[1]);clearTimeout(waits[2]);clearTimeout(expires[1]);clearTimeout(expires[2]);ready1=ready2=false;
      if(player===1)wins1++;else wins2++;
      const matchDone=wins1>=neededWins||wins2>=neededWins;
      draw(`${player===1?'PLAYER 1':'PLAYER 2'} TAKES ROUND ${round}`);
      if(matchDone){
        over=true;const winner=wins1>wins2?'Player 1':'Player 2';const loserScore=wins1>wins2?wins2:wins1;
        return setTimeout(()=>finish('stage-clash',100,`${winner} wins the match ${Math.max(wins1,wins2)}–${loserScore} · false starts ${falseStarts1}/${falseStarts2}.`),800);
      }
      setTimeout(()=>{round++;p1=p2=0;streak1=streak2=0;ready1=ready2=false;between=false;draw('New round — shields carry over.');schedule(1);schedule(2);},1100);
    }
    function tap(player){
      if(over||between)return;
      clearTimeout(expires[player]);clearTimeout(waits[player]);
      const live=player===1?ready1:ready2;
      if(player===1){
        ready1=false;
        if(live){p1++;streak1++;if(streak1>=3){shield1=1;streak1=0;sfx('heart');}else sfx('good');}
        else{falseStarts1++;if(shield1){shield1=0;sfx('tap');}else{p1=Math.max(0,p1-1);streak1=0;sfx('miss');}}
      }else{
        ready2=false;
        if(live){p2++;streak2++;if(streak2>=3){shield2=1;streak2=0;sfx('heart');}else sfx('perfect');}
        else{falseStarts2++;if(shield2){shield2=0;sfx('tap');}else{p2=Math.max(0,p2-1);streak2=0;sfx('miss');}}
      }
      vibrate(live?10:22);
      if(p1>=roundGoal)return roundWon(1);
      if(p2>=roundGoal)return roundWon(2);
      draw(live?'Clean hit. Build momentum for a shield.':'False start — shield consumed or point lost.');schedule(player);
    }
    draw();schedule(1);schedule(2);
  }

  function closeGameOverlay(){document.getElementById('gameHelpOverlay')?.remove();}
  function showGameHelp(id){
    const g=gameById(id);if(!g)return;
    closeGameOverlay();
    const tips=gameBriefs[id]||[];
    document.body.insertAdjacentHTML('beforeend',`<div class="game-help-overlay" id="gameHelpOverlay" role="dialog" aria-modal="true" aria-label="How to play ${esc(g.title)}"><section class="game-help-card"><button class="game-help-close" onclick="window.PV.closeGameHelp()" aria-label="Close help">×</button><span class="eyebrow">MISSION GUIDE · ${g.code}</span><h2>${g.title}</h2><p>${g.desc}</p><div class="game-help-tips">${tips.map((t,i)=>`<article><span>0${i+1}</span><p>${t}</p></article>`).join('')}</div><div class="game-help-record"><span><small>BEST</small><b>${Number(state.best[id]||0)||'—'}</b></span><span><small>RUNS</small><b>${Number(state.gamePlays?.[id]||0)}</b></span><span><small>LEVEL</small><b>${difficulty[state.difficulty[id]||'medium'].short}</b></span></div><button class="cta" onclick="window.PV.closeGameHelp()">BACK TO GAME</button></section></div>`);
  }
  function restartCurrent(id){
    if(document.querySelector('.start-card')){openGame(id);return;}
    if(confirm(`Restart ${gameById(id)?.title||'this mission'} from the beginning?`))startGame(id,state.difficulty[id]||'medium');
  }
  window.PV={
    start:startGame,
    shareResultCard,
    saveResultCard,
    gameHelp:showGameHelp,
    closeGameHelp:closeGameOverlay,
    restartCurrent,
    scrollToSection(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});},
    filterDeck(cat){document.querySelectorAll('.deck-filter button').forEach(b=>{const on=b.dataset.filter===cat;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on));});document.querySelectorAll('.deck-item').forEach(item=>item.hidden=cat!=='all'&&item.dataset.cat!==cat);sfx('tap');},
    dismissOnboarding(){state.onboardingSeen=true;save();document.getElementById('onboarding')?.remove();sfx('tap');},
    startOnboardingSpotlight(){const s=spotlightInfo();state.onboardingSeen=true;save();sfx('start');location.hash=`play/${s.game.id}`;},
    flip:()=>{}, beat:()=>{}, replayBeat:()=>{}, routeMove:()=>{}, toggleLight:()=>{}, resetLights:()=>{}, pickSong:()=>{}, undoSong:()=>{}, lockEncore:()=>{}, addCipher:()=>{}, clearCipher:()=>{}, cipherHint:()=>{}, submitCipher:()=>{}, beginCipherCase:()=>{}, nextCipherCase:()=>{}, chooseRouteMember:()=>{}, beginRouteMission:()=>{}, chooseWardrobeMember:()=>{}, beginWardrobeMission:()=>{}, wardrobeMove:()=>{}, chooseChoreoMember:()=>{}, beginChoreoMission:()=>{}, choreoTap:()=>{}, replayChoreo:()=>{}, chooseDashMember:()=>{}, beginDashMission:()=>{}, dashLane:()=>{}, dashJump:()=>{}, chooseDeliveryMember:()=>{}, beginDeliveryMission:()=>{}, deliverSelect:()=>{}, deliverItem:()=>{}, concertAddTrack:()=>{}, concertRemoveTrack:()=>{}, concertMoveTrack:()=>{}, concertTheme:()=>{}, concertFormation:()=>{}, concertFocus:()=>{}, concertScreen:()=>{}, concertDoDirector:()=>{}, concertStartShow:()=>{}, concertNextSong:()=>{}, concertCue:()=>{}, concertEndShow:()=>{}, concertTab:()=>{}, concertPreset:()=>{}, concertToggleSource:()=>{}, concertBow:()=>{}, concertOutfit:()=>{}, concertAutoVocal:()=>{}, concertVocalFocus:()=>{}, concertCamera:()=>{}, concertOverdrive:()=>{}, concertMode:()=>{}, concertLiveChoice:()=>{}, concertLandscape:()=>{}, concertLandscapeControls:()=>{}, concertMemberCam:()=>{},
    selectTrack(key){if(!youtubeTracks[key])return;selectedYouTubeTrack=key;sfx('tap');document.querySelectorAll('.track-choice').forEach(btn=>btn.classList.toggle('selected',btn.dataset.track===key||btn.textContent.includes(youtubeTracks[key].title)));},
    open(id){sfx('tap');location.hash=`play/${id}`;},
    goHome(){sfx('tap');location.hash='';},
    info(kind){sfx('tap');location.hash=`info/${kind}`;},
    random(){const g=sample(arcadeGames);sfx('start');location.hash=`play/${g.id}`;},
    startConcert(level='medium'){pendingConcertLevel=level;sfx('start');location.hash='play/concert-freeplay';},
    toggleSound(){state.sound=state.sound===false;save();updateSoundButtons();if(state.sound){bindAudioUnlock();sfx('start');}},
    async copyDiagnostics(){
      const d=diagnosticsData();
      const text=`PINKVERSE ${d.version} diagnostics\nNetwork: ${d.online}\nLocal storage: ${d.localStorage}\nService worker: ${d.serviceWorker}\nWeb Audio: ${d.audioContext}\nBrowser family: ${d.browser}\nApple device: ${d.appleDevice}\nDisplay mode: ${d.displayMode}\nGame sound: ${d.sound}\nLocal plays: ${d.plays}\nUser agent: ${d.userAgent}`;
      let ok=false;
      try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);ok=true;}}catch{}
      if(!ok){
        try{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();ok=document.execCommand('copy');ta.remove();}catch{}
      }
      const msg=document.getElementById('diagnosticMessage');if(msg)msg.textContent=ok?'Diagnostics copied to clipboard.':'Could not copy automatically. You can screenshot this support page instead.';
      sfx(ok?'good':'miss');
    },
    async refreshCache(){
      const msg=document.getElementById('diagnosticMessage');if(msg)msg.textContent='Refreshing local app cache…';
      try{if('caches' in window){const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('pinkverse-')).map(k=>caches.delete(k)));}const reg=await navigator.serviceWorker?.getRegistration?.();await reg?.update?.();setTimeout(()=>location.reload(),250);}catch{if(msg)msg.textContent='Cache refresh failed. Try your browser reload or clear site cache manually.';}
    },
    reset(){if(confirm('Reset your local PINKVERSE scores, hearts and preferences?')){const keepSound=state.sound!==false;for(const key of Object.keys(localStorage)){if(key.startsWith('pinkverse-v'))localStorage.removeItem(key);}state={...baseState,sound:keepSound};save();location.hash='';renderHome();}}
  };

  if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{}));}
  renderRoute();
})();
