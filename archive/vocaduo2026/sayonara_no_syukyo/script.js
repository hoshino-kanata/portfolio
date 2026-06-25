"use strict";
/* ═══════════════════════════════════════════════════
   ① 動画:YouTubeのIDをここに入れると埋め込みに切替。
      空のままなら assets/mv.mp4 をローカル再生します。
   ═══════════════════════════════════════════════════ */
const YOUTUBE_ID = "hBOS7-GmLOU";   // 例: "dQw4w9WgXcQ"
const LOCAL_MP4  = "assets/mv.mp4";

document.getElementById('playBtn').addEventListener('click', function(){
  const player = document.getElementById('player');
  this.remove();
  if (YOUTUBE_ID) {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`;
    f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.allowFullscreen = true;
    f.title = "さよならの宗教 — Music Video";
    player.appendChild(f);
  } else {
    const v = document.createElement('video');
    v.src = LOCAL_MP4;
    v.poster = "assets/poster.webp";
    v.controls = true; v.autoplay = true; v.playsInline = true;
    player.appendChild(v);
  }
});

/* 縦書き歌詞:右端(冒頭)から読み始める */
const tate = document.getElementById('tate');
if (tate) tate.scrollLeft = tate.scrollWidth;

/* ═══════════════════════════════════════════════════
   インクの水面 — 網点を廃し、低周波の墨と銀だけで描く
   (モアレ対策:画素格子と干渉する細かい繰り返し模様なし)
   PC: マウスの軌跡 / SP: タッチとスライドに波紋が追従
   ═══════════════════════════════════════════════════ */
const canvas = document.getElementById('water');
const gl = canvas.getContext('webgl', {antialias:true});
if (gl) {

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos,0.,1.); }`;

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uDark;     // 1 = 黒地に銀の波 / 0 = 紙に墨の波

const int NR = 24;
uniform vec4 uRip[NR];
uniform int  uRipCount;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

float surf(vec2 p, float t){
  float h = 0.0;
  h += 0.20*sin(p.x*5.0 + t*0.45)*sin(p.y*4.0 - t*0.35);
  h += 0.10*sin((p.x+p.y)*9.0 + t*0.6);
  for(int i=0;i<NR;i++){
    if(i>=uRipCount) break;
    float age = t - uRip[i].z;
    if(age<0.0) continue;
    float d = length(p - uRip[i].xy);
    float front = age*0.30;
    float env = exp(-age*1.5) * exp(-pow((d-front)*8.0, 2.0));
    h += uRip[i].w * 3.0 * sin((d-front)*46.0) * env;
  }
  return h;
}

void main(){
  vec2 frag = gl_FragCoord.xy / uRes;
  float asp = uRes.x/uRes.y;
  vec2 p = vec2(frag.x*asp, frag.y);
  float t = uTime;

  float h = surf(p,t);
  float crest  = clamp( h*0.55, 0.0, 1.0);
  float trough = clamp(-h*0.55, 0.0, 1.0);
  float grain = (hash(gl_FragCoord.xy)-0.5);

  /* ── 紙(明)── 墨のにじみとして波を見せる */
  vec3 paper = vec3(0.929,0.918,0.886);
  vec3 colP = paper;
  colP -= vec3(0.10,0.10,0.095) * pow(trough,1.6);            // 谷:薄墨
  colP += vec3(0.07,0.068,0.062) * pow(crest,2.0);             // 山:紙の白
  colP *= mix(0.965, 1.0, smoothstep(1.25,0.35,length(frag-0.5)));
  colP += grain*0.018;

  /* ── 黒(暗)── 銀の稜線だけが走る */
  vec3 inkbg = vec3(0.047,0.043,0.031);
  vec3 colD = inkbg;
  colD += vec3(0.62,0.61,0.57) * pow(crest,2.2);               // 銀の波頭
  colD += vec3(0.10,0.10,0.095) * pow(crest,1.0)*0.25;         // ほのかな照り
  colD -= vec3(0.02) * trough;
  /* 中央上にごく薄い後光 */
  colD += vec3(0.05,0.049,0.045) * smoothstep(0.9,0.0,length(frag-vec2(0.5,0.62)));
  colD += grain*0.014;

  vec3 col = mix(colP, colD, uDark);
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(type, src){
  const s = gl.createShader(type);
  gl.shaderSource(s,src); gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
gl.linkProgram(prog);
gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
const aPos = gl.getAttribLocation(prog,'aPos');
gl.enableVertexAttribArray(aPos);
gl.vertexAttribPointer(aPos,2,gl.FLOAT,false,0,0);

const U = n => gl.getUniformLocation(prog,n);
const uRes=U('uRes'), uTime=U('uTime'), uDark=U('uDark'),
      uRip=U('uRip'), uRipCount=U('uRipCount');

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MAXR = 24;
const ripples = [];
const rData = new Float32Array(MAXR*4);
let aspect = 1;
const start = performance.now();
const now = () => (performance.now()-start)/1000;

function resize(){
  const dpr = Math.min(devicePixelRatio||1, 2);
  canvas.width  = Math.floor(innerWidth*dpr);
  canvas.height = Math.floor(innerHeight*dpr);
  gl.viewport(0,0,canvas.width,canvas.height);
  aspect = canvas.width/canvas.height;
}
addEventListener('resize', resize);
resize();

function pushRipple(cx, cy, str){
  ripples.push({x:cx/innerWidth*aspect, y:1-cy/innerHeight, t0:now(), str});
  if(ripples.length > MAXR) ripples.shift();
}

/* ポインターの軌跡(PC) / タッチとスライド(SP) */
let last = null;
const STEP = 36;
function trail(cx, cy){
  if(reduced) return;
  if(!last){ last={x:cx,y:cy}; pushRipple(cx,cy,0.22); return; }
  const dx=cx-last.x, dy=cy-last.y, d=Math.hypot(dx,dy);
  if(d >= STEP){
    const n = Math.min(Math.floor(d/STEP), 4);
    for(let i=1;i<=n;i++){
      pushRipple(last.x+dx*i/n, last.y+dy*i/n, 0.16+0.10*Math.min(d/STEP,3));
    }
    last={x:cx,y:cy};
  }
}
addEventListener('pointermove', e=>{ if(e.pointerType==='mouse') trail(e.clientX,e.clientY); }, {passive:true});
addEventListener('touchmove',  e=>{ const t=e.touches[0]; if(t) trail(t.clientX,t.clientY); }, {passive:true});
addEventListener('touchstart', e=>{ const t=e.touches[0]; if(t){ last={x:t.clientX,y:t.clientY}; pushRipple(t.clientX,t.clientY,0.7);} }, {passive:true});
addEventListener('touchend',   ()=>{ last=null; }, {passive:true});
addEventListener('pointerdown',e=>{ if(e.pointerType==='mouse') pushRipple(e.clientX,e.clientY,0.9); });
addEventListener('pointerleave',()=>{ last=null; });

/* 明暗セクションの判定 → 水面の調子とナビ色を切替 */
const toned = document.querySelectorAll('[data-tone]');
let darkTarget = 1, darkNow = 1;
function checkTone(){
  const midY = innerHeight*0.5;
    for(const el of toned){
    const r = el.getBoundingClientRect();
    if(r.top <= midY && r.bottom > midY){
      darkTarget = (el.dataset.tone === 'dark') ? 1 : 0;
      document.body.classList.toggle('on-paper', darkTarget === 0);
      return;
    }
  }
}
addEventListener('scroll', checkTone, {passive:true});
checkTone();

/* 無操作でも静かに一滴 */
let nextDrip = 3;

function frame(){
  const t = now();
  if(t > nextDrip && !reduced){
    pushRipple(Math.random()*innerWidth, Math.random()*innerHeight, 0.22+Math.random()*0.18);
    nextDrip = t + 4 + Math.random()*5;
  }
  while(ripples.length && (t-ripples[0].t0) > 4) ripples.shift();
  rData.fill(0);
  ripples.forEach((r,i)=>{ rData[i*4]=r.x; rData[i*4+1]=r.y; rData[i*4+2]=r.t0; rData[i*4+3]=r.str; });

  darkNow += (darkTarget-darkNow)*0.06;

  gl.uniform2f(uRes, canvas.width, canvas.height);
  gl.uniform1f(uTime, reduced ? t*0.3 : t);
  gl.uniform1f(uDark, darkNow);
  gl.uniform4fv(uRip, rData);
  gl.uniform1i(uRipCount, ripples.length);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

} /* gl */

/* ═══════════════════════════════════════════════════
   Hero パララックス
   bg-layer は position:fixed のため、スクロールtransform不要。
   PCのみマウス追従。SPはbg完全固定（黒枠問題の解決）。
   ═══════════════════════════════════════════════════ */
(function(){
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const heroBgLayer = document.querySelector('.hero-bg-layer');
  const heroBg      = document.querySelector('.hero-bg-img');
  const heroChar    = document.querySelector('.hero-char-img');
  const heroLogo    = document.querySelector('.hero-logo-layer');

  if (!heroBg || !heroChar || !heroLogo) return;

  const hero = document.querySelector('.hero');

  let scrollY = 0;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let charBaseX = innerWidth <= 860 ? -50 : -44;

  addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  addEventListener('mousemove', e => {
    targetMouseX = (e.clientX / innerWidth  - 0.5) * 2;
    targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  addEventListener('touchmove', e => {
    if (e.touches.length === 0) return;
    const t = e.touches[0];
    targetMouseX = (t.clientX / innerWidth  - 0.5) * 2;
    targetMouseY = (t.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  function applyParallax() {
    const heroH  = hero ? hero.offsetHeight : innerHeight;
    const isMobile = innerWidth <= 860;
    const vh = window.innerHeight;

    // ① 背景画像のフェードアウト（スクロールに合わせて暗闇に溶ける）
    if (heroBgLayer) {
      let bgOpacity = 1 - (scrollY / (vh * 0.8));
      bgOpacity = Math.max(0, Math.min(1, bgOpacity));
      heroBgLayer.style.opacity = bgOpacity;
      heroBgLayer.style.visibility = bgOpacity === 0 ? 'hidden' : 'visible';
    }

    // ② ロゴのフェードアウト（動画の段階で徐々に消える：元の動き）
    if (heroLogo) {
      let logoOpacity = 1 - (scrollY / (vh * 0.6));
      logoOpacity = Math.max(0, Math.min(1, logoOpacity));
      heroLogo.style.opacity = logoOpacity;
      heroLogo.style.visibility = logoOpacity === 0 ? 'hidden' : 'visible';
    }

    // ③ キャラクターのフェードアウト（歌詞セクションに合わせて消える：元の動き）
    const lyricsEl = document.getElementById('lyrics');
    if (lyricsEl && heroChar) {
      const lyricsRect = lyricsEl.getBoundingClientRect();
      
      let progress = (vh - lyricsRect.top) / (vh * 0.4);
      progress = Math.max(0, Math.min(1, progress));
      
      heroChar.style.opacity = 1 - progress;
      heroChar.style.visibility = progress === 1 ? 'hidden' : 'visible';
    }

    mouseX += (targetMouseX - mouseX) * 0.07;
    mouseY += (targetMouseY - mouseY) * 0.07;

    const s = scrollY;

    /* ── 背景: fixedなのでスクロール分不要。PCのみマウス追従 */
    heroBg.style.transform = isMobile
      ? 'none'
      : `translate3d(${mouseX * 5}px, ${mouseY * 6}px, 0)`;

    /* ── キャラクター: スクロール + PCのみマウス（モバイル時は少し回転） */
    if (isMobile) {
      heroChar.style.transform =
        `translateX(-50%) translateY(${s * 0.65}px) rotate(30deg)`;
    } else {
      heroChar.style.transform =
        `translateX(calc(${charBaseX}% + ${mouseX * 10}px)) translateY(calc(${s * 0.65}px + ${mouseY * 14}px)) rotate(0deg)`; // 💡PCでは0度に戻す
    }

    /* ── ロゴ: スクロール + PCのみマウス */
    const logoMx = isMobile ? 0 : mouseX * 14;
    const logoMy = isMobile ? 0 : mouseY * 20;
    heroLogo.style.transform =
      `translate3d(calc(-50% + ${logoMx}px), calc(${s * 0.92}px + ${logoMy}px), 0)`;

    requestAnimationFrame(applyParallax);
  }

  requestAnimationFrame(applyParallax);

  addEventListener('resize', () => {
    charBaseX = innerWidth <= 860 ? -50 : -44;
  }, { passive: true });

})();

/* ═══════════════════════════════════════════════════
   コピー＆保存防止対策
   ═══════════════════════════════════════════════════ */
// 右クリックメニューを禁止する
document.addEventListener('contextmenu', e => e.preventDefault());

// キーボードのショートカット(Ctrl+Cなど)でのコピー操作を禁止する
document.addEventListener('copy', e => e.preventDefault());

// 画像のドラッグ＆ドロップを禁止する
document.querySelectorAll('img').forEach(img => {
  img.draggable = false;
});

/* ═══════════════════════════════════════════════════
   STEP 1: GALLERY DATA (ギャラリーのHTMLを作る)
   ═══════════════════════════════════════════════════ */
// ① チーム表周りの浮遊額縁データ
const FLOATING_GALLERY = [
  { pos: "cgf--tl", type: "tall",   src: "gallery/g2.webp", label: "表情" },
  { pos: "cgf--tr", type: "cinema", src: "gallery/g8.webp", label: "少女と悪魔" },
  { pos: "cgf--ml", type: "oval",   src: "gallery/g10.webp", label: "この世界から" },
  { pos: "cgf--mr", type: "wide",   src: "gallery/g12.webp", label: "秘密にした" },
  { pos: "cgf--bl", type: "cinema",   src: "gallery/g9.webp", label: "オープニング" },
  { pos: "cgf--br", type: "tall",   src: "gallery/g14.webp", label: "エンディング" }
];

// ② 絵画室のギャラリーデータ
const MAIN_GALLERY = [
  { type: "wide",   src: "team.webp", label: "チーム表" },
  { type: "oval",   src: "gallery/g10.webp", label: "この世界から" },
  { type: "square",   src: "gallery/g9.webp", label: "オープニング" },
  { type: "cinema",   src: "gallery/g11.webp", label: "もう、きっと" },
  { type: "cinema",   src: "gallery/g12.webp", label: "秘密にした" },
  { type: "square",   src: "gallery/g13.webp", label: "あと一手" },
  { type: "oval",   src: "gallery/g14.webp", label: "エンディング" },
  { type: "wide",   src: "gallery/g8.webp", label: "少女と悪魔" },
  { type: "wide",   src: "gallery/g1.webp", label: "少女と悪魔 / 素描" },
  { type: "tall",   src: "gallery/g6.webp", label: "悪魔 / 決定稿" },
  { type: "oval",   src: "gallery/g5.webp", label: "少女 / 決定稿" },
  { type: "square", src: "gallery/g3.webp", label: "少女衣装 / 製作段階" },
  { type: "square", src: "gallery/g4.webp", label: "悪魔衣装 / 製作段階" },
  { type: "oval",   src: "gallery/g2.webp", label: "表情 / 素描" },
  { type: "cinema",   src: "gallery/g7.webp", label: "ロゴ / 決定稿" },
  { type: "square",   src: "gallery/g15.webp", label: "ロゴ / 素描" },
];

// HTMLを生成する共通テンプレート関数
function createFrameHTML(item, isFloating = false, index = 0) {
  // メインギャラリーで8個目（インデックス8以上）の要素には非表示用のクラスを付与
  const extraClass = (!isFloating && index >= 8) ? " is-overflow" : "";
  const innerHTML = `
    <div class="frame frame--${item.type}${extraClass}">
      <div class="frame-ornament" aria-hidden="true"></div>
      <button class="frame-inner" data-label="${item.label}" data-src="${item.src}" aria-label="${item.label} — 拡大して見る">
        <img src="${item.src}" alt="${item.label}" loading="lazy">
        <div class="frame-overlay"><span class="frame-title">${item.label}</span></div>
      </button>
    </div>
  `;
  return isFloating 
    ? `<div class="cgf ${item.pos}">${innerHTML}</div>`
    : innerHTML;
}

// ページにHTMLを流し込む
const floatContainer = document.getElementById('floatingGallery');
if (floatContainer) {
  floatContainer.innerHTML = FLOATING_GALLERY.map(item => createFrameHTML(item, true)).join('');
}

const mainContainer = document.getElementById('mainGallery');
if (mainContainer) {
  // ここで index を渡すように変更しています
  mainContainer.innerHTML = MAIN_GALLERY.map((item, index) => createFrameHTML(item, false, index)).join('');
}

/* ═══════════════════════════════════════════════════
   STEP 2: GALLERY — モバイル2列振り分け
   (HTMLが作られた後に実行して並べ替える)
   ═══════════════════════════════════════════════════ */
(function() {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  let colonized = false;
  let leftCol, rightCol;

  function mobilize() {
    if (colonized) return;
    colonized = true;

    const frames = Array.from(grid.querySelectorAll(':scope > .frame'));

    leftCol  = document.createElement('div');
    rightCol = document.createElement('div');
    leftCol.className  = 'gallery-col';
    rightCol.className = 'gallery-col';

    frames.forEach((frame, i) => {
      (i % 2 === 0 ? leftCol : rightCol).appendChild(frame);
    });

    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
  }

  function desktopize() {
    if (!colonized) return;
    colonized = false;

    const allFrames = [
      ...Array.from(leftCol.children),
      ...Array.from(rightCol.children),
    ];
    allFrames.sort((a, b) => (a.dataset.gi || 0) - (b.dataset.gi || 0));
    allFrames.forEach(f => grid.appendChild(f));

    leftCol.remove();
    rightCol.remove();
  }

  Array.from(grid.querySelectorAll(':scope > .frame')).forEach((f, i) => {
    f.dataset.gi = i;
  });

  function check() {
    if (window.innerWidth <= 860) {
      mobilize();
    } else {
      desktopize();
    }
  }

  check();
  window.addEventListener('resize', check, { passive: true });
})();

/* ═══════════════════════════════════════════════════
   STEP 3: GALLERY MODAL
   (HTMLが作られた後に実行してクリックできるようにする)
   ═══════════════════════════════════════════════════ */
(function() {
  const modal    = document.getElementById('galleryModal');
  if (!modal) return;

  const backdrop = modal.querySelector('.gallery-modal__backdrop');
  const closeBtn = modal.querySelector('.gallery-modal__close');
  const modalImg = modal.querySelector('.gallery-modal__img');
  const caption  = modal.querySelector('.gallery-modal__caption');
  let scrollY    = 0;

  function openModal(src, label) {
    modalImg.src = src;
    modalImg.alt = label;
    caption.textContent = label;
    modal.hidden = false;
    scrollY = window.scrollY;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow     = 'hidden';
    document.body.style.paddingRight = sbw + 'px';
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow     = '';
    document.body.style.paddingRight = '';
  }

  // 生成された額縁ボタンにクリックリスナーを追加
  document.querySelectorAll('.frame-inner').forEach(btn => {
    btn.addEventListener('click', () => {
      const src   = btn.dataset.src   || btn.querySelector('img')?.src || '';
      const label = btn.dataset.label || btn.querySelector('img')?.alt || '';
      openModal(src, label);
    });
  });

  // 閉じるボタン
  closeBtn.addEventListener('click', closeModal);

  // 背景タップで閉じる
  backdrop.addEventListener('click', closeModal);

  // Escキーで閉じる
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // 画像の右クリック・ドラッグ防止
  modalImg.addEventListener('contextmenu', e => e.preventDefault());
  modalImg.draggable = false;
})();

/* ═══════════════════════════════════════════════════
   STEP 4: GALLERY MORE BUTTON (もっと見る機能)
   ═══════════════════════════════════════════════════ */
(function() {
  const btnMore = document.getElementById('btnGalleryMore');
  const btnClose = document.getElementById('btnGalleryClose');
  const mainGallery = document.getElementById('mainGallery');

  if (!btnMore || !btnClose || !mainGallery) return;

  // 更に記憶を辿る（開く）
  btnMore.addEventListener('click', () => {
    mainGallery.classList.add('is-expanded');
    btnMore.style.display = 'none';
    btnClose.style.display = 'inline-flex';
  });

  // 記憶の扉を閉ざす（閉じる）
  btnClose.addEventListener('click', () => {
    mainGallery.classList.remove('is-expanded');
    btnClose.style.display = 'none';
    btnMore.style.display = 'inline-flex';
    
    // 閉じた際、ギャラリーの先頭付近へスムーズにスクロールして戻す
    const gallerySection = document.getElementById('gallery');
    const offset = gallerySection.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
})();