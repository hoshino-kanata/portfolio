/* ================================================
   ▼ 設定：YouTube動画ID をここに入力（例 "dQw4w9WgXcQ"）
================================================ */
const YOUTUBE_ID = "";

/* ▼ ニュースティッカー */
const NEWS_ITEMS = [
  "2026.06.26 ✦ MUSIC VIDEO 公開",
  "2026.XX.XX ✦ 各種ストリーミング配信開始",
  "VocaDuo2026 参加作品",
  "TEAM ✦ FLOATING FM",
];

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = matchMedia('(pointer: fine)').matches;

/* ===== YouTube埋め込み ===== */
(function(){
  if(!YOUTUBE_ID) return;
  document.getElementById('screen').innerHTML =
    '<iframe src="https://www.youtube-nocookie.com/embed/'+YOUTUBE_ID+'?rel=0" title="FLOATING FM — Music Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>';
})();

/* ===== テープ＆ティッカー生成 ===== */
(function(){
  const make = (id, unit, n) => {
    const el = document.getElementById(id); if(!el) return;
    const s = '<span>'+unit.repeat(n)+'</span>';
    el.innerHTML = s + s;
  };
  ['tapeA','tapeB','tapeC'].forEach(id => make(id, 'FLOATING FM ✦ ', 14));
  make('tapeD', 'TEAM FLOATING FM ✦ ', 8);
  const news = document.getElementById('news');
  if(news){
    /* 半分（=1スパン）を十分な幅にして2連結 → -50%移動で完全ループ */
    const oneline = NEWS_ITEMS.join(' ／ ') + ' ／ ';
    const half = '<span>' + oneline.repeat(4) + '</span>';
    news.innerHTML = half + half;
  }
})();

/* ===== 白いキラキラ（ヒーロー層）生成 ===== */
(function(){
  const box = document.getElementById('twinkles');
  if(!box) return;
  const CH = ['✦','✧','+','･'];
  for(let i = 0; i < 18; i++){
    const t = document.createElement('span');
    t.className = 'tw';
    t.textContent = CH[Math.floor(Math.random()*CH.length)];
    t.style.left = (4 + Math.random()*92) + '%';
    t.style.top  = (4 + Math.random()*88) + '%';
    t.style.fontSize = (9 + Math.random()*20) + 'px';
    t.style.setProperty('--td', (2 + Math.random()*2.6).toFixed(2) + 's');
    t.style.setProperty('--tdl', (-Math.random()*4).toFixed(2) + 's');
    box.appendChild(t);
  }
})();

/* ===== ロードシーケンス ===== */
addEventListener('load', () => document.body.classList.add('loaded'));
setTimeout(() => document.body.classList.add('loaded'), 1200);

/* ===== メニュー開閉 ===== */
(function(){
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const set = open => {
    document.body.classList.toggle('menu-open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  };
  btn.addEventListener('click', () => set(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', e => { if(e.key === 'Escape') set(false); });
})();

/* ===== スクロール＝選局 ===== */
(function(){
  const freqEl = document.getElementById('freq');
  const knobEl = document.getElementById('knob');
  const stEl   = document.getElementById('station');
  const stations = [
    {id:'top',     name:'最終目的地'},
    {id:'movie',   name:'MUSIC VIDEO'},
    {id:'visual',  name:'VISUAL'},
    {id:'story',   name:'STORY'},
    {id:'lyrics',  name:'LYRICS'},
    {id:'crew',    name:'CREATORS'},
    {id:'vocaduo', name:'VOCADUO2026'}
  ];
  let tick = false;
  function update(){
    tick = false;
    const doc = document.documentElement;
    const p = Math.min(1, Math.max(0, scrollY / (doc.scrollHeight - innerHeight || 1)));
    freqEl.textContent = (76 + p*14).toFixed(1);
    knobEl.style.transform = 'rotate(' + (-135 + p*270) + 'deg)';
    let cur = stations[0];
    for(const s of stations){
      const el = document.getElementById(s.id);
      if(el && el.getBoundingClientRect().top < innerHeight*.45) cur = s;
    }
    stEl.textContent = cur.name;
    /* セクション内スクロールパララックス */
    for(const el of document.querySelectorAll('.sprlx')){
      const sec = el.closest('section');
      if(!sec) continue;
      const r = sec.getBoundingClientRect();
      const prog = (innerHeight - r.top) / (innerHeight + r.height); /* 0..1 */
      const d = parseFloat(el.dataset.sdepth || -20);
      el.style.setProperty('--sy', ((prog - .5) * d * 2).toFixed(1) + 'px');
    }
  }
  addEventListener('scroll', ()=>{ if(!tick){requestAnimationFrame(update);tick=true;} }, {passive:true});
  update();
})();

/* ===== STORY 短冊の吊り下げ ===== */
(function(){
  const strips = document.querySelector('.story__strips');
  if(!strips) return;
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.25});
  io.observe(strips);
})();

/* ===== 出現（rv） ===== */
(function(){
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.15});
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
})();

/* ===== 歌詞：行ごとにふわっと ===== */
(function(){
  document.querySelectorAll('.stz').forEach(st => {
    [...st.querySelectorAll('.l')].forEach((l, i) => l.style.setProperty('--ld', (i * .06) + 's'));
  });
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ e.target.querySelectorAll('.l').forEach(l => l.classList.add('in')); io.unobserve(e.target); } });
  }, {threshold:.25});
  document.querySelectorAll('.stz').forEach(el => io.observe(el));
})();

/* ===== 歌詞アコーディオン（続きを受信） ===== */
(function(){
  const btn = document.getElementById('lyrToggle');
  const box = document.getElementById('lyrMore');
  if(!btn || !box) return;
  btn.addEventListener('click', () => {
    const open = box.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* ===== 監視室の時計 ===== */
(function(){
  const els = [document.getElementById('monClock'), document.getElementById('monClockB')].filter(Boolean);
  if(!els.length) return;
  const tick = () => {
    const d = new Date();
    const t = [d.getHours(),d.getMinutes(),d.getSeconds()].map(n=>String(n).padStart(2,'0')).join(':');
    els.forEach(el => el.textContent = t);
  };
  tick(); setInterval(tick, 1000);
})();

/* ===== ロゴ・グリッチ ===== */
(function(){
  if(REDUCED) return;
  const logo = document.getElementById('logo');
  if(!logo) return;
  const fire = () => { logo.classList.add('fire'); setTimeout(()=>logo.classList.remove('fire'), 360); };
  logo.addEventListener('pointerenter', fire);
  setInterval(fire, 3400);
})();

/* ===== マウス系 ===== */
(function(){
  if(REDUCED || !FINE_POINTER) return;
  document.body.classList.add('has-cursor');

  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;

  /* ✦トレイル */
  let last = 0, sparkCount = 0;
  const SPARK_CHARS = ['✦','✧','+'];
  function spawnSpark(x, y){
    if(sparkCount > 26) return;
    const s = document.createElement('span');
    s.className = 'spark' + (Math.random() < .45 ? ' b' : '');
    s.textContent = SPARK_CHARS[Math.floor(Math.random()*SPARK_CHARS.length)];
    s.style.left = (x + (Math.random()*26-13)) + 'px';
    s.style.top  = (y + (Math.random()*26-13)) + 'px';
    document.body.appendChild(s); sparkCount++;
    setTimeout(()=>{ s.remove(); sparkCount--; }, 950);
  }

  const prlx = [...document.querySelectorAll('.prlx')];

  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate('+mx+'px,'+my+'px)';
    const now = performance.now();
    if(now - last > 70){ spawnSpark(mx, my); last = now; }
  }, {passive:true});

  function loop(){
    cx += (mx - cx) * .18; cy += (my - cy) * .18;
    cursor.style.transform = 'translate('+cx+'px,'+cy+'px)';
    const nx = (mx / innerWidth - .5), ny = (my / innerHeight - .5);
    for(const el of prlx){
      const d = parseFloat(el.dataset.depth || 10);
      el.style.translate = (nx*d)+'px '+(ny*d)+'px';
    }
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('pointerenter', ()=>cursor.classList.add('is-link'));
    el.addEventListener('pointerleave', ()=>cursor.classList.remove('is-link'));
  });

  /* マグネットボタン（transformはinlineで滑らかに） */
  document.querySelectorAll('.mag').forEach(el => {
    el.style.transition = 'transform .16s ease-out, background .25s, border-color .25s, color .25s';
    el.style.willChange = 'transform';
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width/2);
      const dy = e.clientY - (r.top + r.height/2);
      el.style.transform = 'translate('+(dx*.22)+'px,'+(dy*.3)+'px)';
    });
    el.addEventListener('pointerleave', ()=>{ el.style.transform = ''; });
  });

  /* クリックで ✦バースト */
  addEventListener('pointerdown', e => {
    for(let i=0;i<6;i++) spawnSpark(e.clientX, e.clientY);
  });
})();

/* ===== VISUAL ログのモーダルウインドウ ===== */
(function(){
  /* ── DOM生成 ── */
  const modal = document.createElement('div');
  modal.className = 'img-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'VISUAL LOG 拡大表示');
  modal.innerHTML = `
    <div class="img-modal__backdrop"></div>
    <div class="img-modal__frame">
      <div class="img-modal__hud">
        <span class="img-modal__hud-label">VISUAL LOG</span>
        <span class="img-modal__hud-sep">✦</span>
        <span class="img-modal__hud-clock" id="modalClock"></span>
      </div>
      <div class="img-modal__body">
        <img class="img-modal__img" src="" alt="">
        <div class="img-modal__scan"></div>
      </div>
      <div class="img-modal__caption" id="modalCaption"></div>
    </div>
    <button class="img-modal__close" aria-label="閉じる">
      <svg class="img-modal__close-svg" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="22" cy="22" r="20.5" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="22" cy="22" r="15" stroke="currentColor" stroke-width=".6" stroke-dasharray="2 4"/>
        <line x1="14" y1="14" x2="30" y2="30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="30" y1="14" x2="14" y2="30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="22" cy="22" r="2.5" fill="currentColor"/>
      </svg>
      <span class="img-modal__close-label">CLOSE</span>
    </button>
  `;
  document.body.appendChild(modal);

  /* ── スタイル注入 ── */
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    /* オーバーレイ */
    .img-modal {
      position: fixed;
      inset: 0;
      z-index: 9200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity .38s ease;
    }
    .img-modal.is-active {
      opacity: 1;
      pointer-events: auto;
    }

    /* すりガラス背景 */
    .img-modal__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(5, 5, 26, .72);
      backdrop-filter: blur(18px) saturate(1.3);
      -webkit-backdrop-filter: blur(18px) saturate(1.3);
    }

    /* メインフレーム */
    .img-modal__frame {
      position: relative;
      z-index: 1;
      max-width: min(900px, 92vw);
      width: 100%;
      transform: scale(.9) translateY(18px);
      transition: transform .42s cubic-bezier(.34,1.7,.45,1), opacity .38s ease;
      opacity: 0;
    }
    .img-modal.is-active .img-modal__frame {
      transform: none;
      opacity: 1;
      transition-delay: .06s;
    }

    /* HUDバー（上部） */
    .img-modal__hud {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px 7px;
      border: 1px solid rgba(170,176,240,.35);
      border-bottom: none;
      background: rgba(5,5,26,.9);
      font-family: 'Chakra Petch', monospace;
      font-size: 11px;
      letter-spacing: .36em;
    }
    .img-modal__hud-label { color: #f59a26; }
    .img-modal__hud-sep   { color: rgba(170,176,240,.55); font-size: 9px; }
    .img-modal__hud-clock { color: rgba(170,176,240,.8); margin-left: auto; }

    /* 画像エリア */
    .img-modal__body {
      position: relative;
      border: 1px solid rgba(170,176,240,.35);
      background: #02020e;
      overflow: hidden;
      line-height: 0;
    }
    .img-modal__img {
      display: block;
      max-width: 100%;
      max-height: 72vh;
      width: auto;
      height: auto;
      margin: 0 auto;
      object-fit: contain;
    }

    /* CRT走査線オーバーレイ */
    .img-modal__scan {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(
        0deg,
        transparent 0 3px,
        rgba(2, 2, 16, .10) 3px 4px
      );
      z-index: 2;
    }

    /* キャプション（下部） */
    .img-modal__caption {
      padding: 9px 16px 10px;
      border: 1px solid rgba(170,176,240,.35);
      border-top: none;
      background: rgba(5,5,26,.9);
      font-family: 'Chakra Petch', monospace;
      font-size: 11px;
      letter-spacing: .28em;
      color: rgba(170,176,240,.75);
      min-height: 36px;
    }

    /* 閉じるボタン */
    .img-modal__close {
      position: fixed;
      top: clamp(44px, 6vh, 80px);
      right: clamp(16px, 3vw, 44px);
      z-index: 9300;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      background: none;
      border: 0;
      padding: 6px;
      cursor: pointer;
      color: rgba(242,243,250,.65);
      transition: color .22s, transform .3s cubic-bezier(.34,1.7,.45,1);
      transform: scale(.85) rotate(-15deg);
      opacity: 0;
      pointer-events: none;
    }
    .img-modal.is-active .img-modal__close {
      opacity: 1;
      pointer-events: auto;
      transform: rotate(0deg) scale(1);
      transition: color .22s, transform .38s cubic-bezier(.34,1.7,.45,1) .18s, opacity .28s ease .14s;
    }
    .img-modal__close:hover {
      color: #f59a26;
      transform: rotate(90deg) scale(1.12);
    }
    .img-modal__close-svg {
      width: 44px;
      height: 44px;
      display: block;
    }
    .img-modal__close-label {
      font-family: 'Chakra Petch', monospace;
      font-size: 9px;
      letter-spacing: .42em;
      line-height: 1;
    }

    /* ピルにカーソルを付与 */
    .visual__logs .pill,
    .vlog__grid .pill {
      cursor: pointer;
    }
  `;
  document.head.appendChild(modalStyle);

  /* ── 参照 ── */
  const modalImg     = modal.querySelector('.img-modal__img');
  const captionEl    = modal.querySelector('#modalCaption');
  const modalClockEl = modal.querySelector('#modalClock');
  const closeBtn     = modal.querySelector('.img-modal__close');

  /* モーダル時計（既存の時計と共存） */
  const tickModal = () => {
    if (!modalClockEl) return;
    const d = new Date();
    modalClockEl.textContent = [d.getHours(),d.getMinutes(),d.getSeconds()]
      .map(n => String(n).padStart(2,'0')).join(':');
  };
  setInterval(tickModal, 1000);
  tickModal();

  /* ── カーソル要素（カスタムカーソルがあれば最前面に引き上げる） ── */
  const cursorEls = ['cursor','cursorDot'].map(id => document.getElementById(id)).filter(Boolean);
  const CURSOR_Z_MODAL  = '9400'; /* モーダル(9200)・閉じるBtn(9300)より上 */
  const CURSOR_Z_DEFAULT = '';    /* インラインを外してCSSの z-index:99 に戻す */

  /* ── 開閉 ── */
  const openModal = (src, alt, caption) => {
    modalImg.src = src;
    modalImg.alt = alt || '';
    captionEl.textContent = caption || alt || '';
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    cursorEls.forEach(el => el.style.zIndex = CURSOR_Z_MODAL);
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    cursorEls.forEach(el => el.style.zIndex = CURSOR_Z_DEFAULT);
  };

  /* 閉じるボタン */
  closeBtn.addEventListener('click', closeModal);

  /* 背景クリックで閉じる */
  modal.querySelector('.img-modal__backdrop').addEventListener('click', closeModal);

  /* Escキーで閉じる */
  addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-active')) closeModal(); });

  /* ── 各ピルにイベント登録 ── */
  const selectors = ['.visual__logs .pill', '.vlog__grid .pill'];
  document.querySelectorAll(selectors.join(', ')).forEach(pill => {
    pill.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const img     = pill.querySelector('img');
      const capEl   = pill.querySelector('.pill__cap');
      const caption = capEl ? capEl.textContent.trim() : '';
      if (img) openModal(img.src, img.alt || '', caption);
    });
  });
})();