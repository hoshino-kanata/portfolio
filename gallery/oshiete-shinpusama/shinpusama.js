/* ==========================================================
   教えて神父さま — script
   星乃かなた ファンアート投稿企画
   ----------------------------------------------------------
   ■ さわるのはここだけ ■
     CONFIG … フォームURL・締切・works フォルダ
     WORKS  … 作品の一覧（足すだけで何件でも増やせます）
   ========================================================== */
/* ==========================================================
   CONFIG — ここだけ編集すれば内容を差し替えられます
   ========================================================== */
const CONFIG = {
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSecEi_kETOx-2K_jrQTT0UA3ZGwQBZcJZ4kcvjusBG0qpHvPw/viewform?usp=header",      // ← Googleフォームの URL
  deadline: "2026-11-02T23:59:59+09:00",
  heroMax: 10,        // トップで巡回する作品の数（先頭から。増えても長くなりすぎません）
  worksDir: "works/", // 画像・本文ファイルを置くフォルダ（HTMLと同じ階層）
};

/* ==========================================================
   WORKS — 作品の一覧
   ここに足していくだけで、何件でも増やせます。
   ----------------------------------------------------------
   共通： title（和題）／ word（英字見出し・省略可）／ ja（2行の添え書き・省略可）
          author, x, date（省略可）／ c1, c2, motif（省略時は自動）

   色は c1（アクセント）と c2（副色）の2つだけ。書かなければ PALETTE から
   順番に割りあてられます。カードの地と、夜の配色で使う明るめの色は、
   c1 から自動でつくるので指定は要りません。

   ファイルはすべて works/ フォルダに置きます（HTMLと同じ階層）。
   "w04.png" のようにファイル名だけ書けば works/w04.png として扱われます。

   読み物は type が2つありますが、中身の扱いは同じです。
   どちらも works/ の .txt を読み、文字の大きさと縦横を変えられます。
   違うのはカードに出る呼び名（言葉／小説）だけです。

   type:'text'   … 言葉として並べる             file:"prayer.txt"  → works/prayer.txt
   type:'novel'  … 小説として並べる             file:"w03.txt"     → works/w03.txt
                     どちらも text:"本文を直接..." と書くこともできます
   type:'image'  … 1枚絵                        src:"w04.png"      → works/w04.png
   type:'manga'  … まんがビューアで読む
                     count:12                  → works/<id>/001.png 〜 012.png
                     ・id が w005 なら works/w005/001.png … になります
                     ・ext:".jpg" で拡張子、from:0 で 000.png はじまり
                     ・pages:["w005/hyoshi.png", …] と1枚ずつ指定することもできます

   本文の記法（青空文庫・カクヨム互換）
     ルビ   ｜言葉《ことば》 / 漢字《かんじ》
     傍点   《《ここに傍点》》
     区切り 　＊ や □ だけの行
     挿絵   ［画像：e01.png］          → works/e01.png
            ［画像：e01.png｜添え書き］ → 下（縦書きなら左）に小さな字で添え書き
   ========================================================== */
const WORKS = [

  /* ---- 神父さまの言葉（本文は works/ の .txt） ---- */
  { id:"prayer", type:"text", file:"prayer.txt",
    word:"PRAYER", title:"祈り", ja:"言葉にならないまま\n手を組んだ夜のこと",
    author:"教えて神父さま", date:"2026.08.01", c1:"#9da2cc", c2:"#6f74a4", motif:"halo" },

  { id:"confession", type:"text", file:"confession.txt",
    word:"CONFESSION", title:"告解", ja:"誰にも言えなかったことを\n一枚の紙に打ち明ける",
    author:"教えて神父さま", date:"2026.08.01", c1:"#986fa0", c2:"#6d4a76", motif:"arch" },

  { id:"silence", type:"text", file:"silence.txt",
    word:"SILENCE", title:"静寂", ja:"配信が終わったあとの\n部屋に残る静けさ",
    author:"教えて神父さま", date:"2026.08.01", c1:"#829199", c2:"#5a676e", motif:"moon" },

  { id:"light", type:"text", file:"light.txt",
    word:"LIGHT", title:"光", ja:"ステンドグラスを抜けて\n床に落ちる色のこと",
    author:"教えて神父さま", date:"2026.08.01", c1:"#b39a50", c2:"#846f31", motif:"star" },

  { id:"memory", type:"text", file:"memory.txt",
    word:"MEMORY", title:"記憶", ja:"忘れたくなくて\n描き留めておいた景色",
    author:"教えて神父さま", date:"2026.08.01", c1:"#8faa90", c2:"#5e7a61", motif:"rose" },

  { id:"voice", type:"text", file:"voice.txt",
    word:"VOICE", title:"声", ja:"聞こえなくても\nたしかにそこにある声",
    author:"教えて神父さま", date:"2026.08.01", c1:"#ba6a87", c2:"#8a475f", motif:"flame" },

  { id:"distance", type:"text", file:"distance.txt",
    word:"DISTANCE", title:"距離", ja:"画面ひとつ分の\n近くて遠い距離",
    author:"教えて神父さま", date:"2026.08.01", c1:"#7f93ab", c2:"#566a80", motif:"drop" },

  { id:"blessing", type:"text", file:"blessing.txt",
    word:"BLESSING", title:"祝福", ja:"誰かの一日が\n少しよくなるように",
    author:"教えて神父さま", date:"2026.08.01", c1:"#9a8c98", c2:"#6d616c", motif:"rose" },

  { id:"question", type:"text", file:"question.txt",
    word:"QUESTION", title:"問い", ja:"答えより先に\n問いがあった",
    author:"教えて神父さま", date:"2026.08.01", c1:"#8d9268", c2:"#636847", motif:"arch" },

  { id:"answer", type:"text", file:"answer.txt",
    word:"ANSWER", title:"答え", ja:"1つの問に\n1人分の答えを",
    author:"教えて神父さま", date:"2026.08.01", c1:"#c77a5a", c2:"#95533a", motif:"star" },

/* ---- ここから投稿作品。増えたぶんだけ足してください ---- */

  { id:"w03", type:"novel", file:"w03.txt", textId:"src-w03",
    word:"THE UNANSWERED", title:"神さまは、教えてくれない",
    ja:"告解とは、\n犯した罪を告白すること。",
    author:"黒紫館 幽火", x:"https://x.com/", date:"2026.08.30",
    c1:"#7d7a92", c2:"#565469", motif:"arch" },

  /* --- 追加のしかた（コピーして使ってください） ---------------

  { id:"w04", type:"image", src:"w04.png",
    title:"星を待つ人", author:"ななせ", x:"https://x.com/", date:"2026.09.02",
    ja:"夜明けまで\nあと少しだけ" },

  // works/w05/001.png 〜 012.png を読みます
  { id:"w05", type:"manga", count:12, cover:true, rtl:true,
    title:"告解のあと", author:"サンダ・Ｖ・ライゼ", x:"https://x.com/", date:"2026.09.20" },

  { id:"w06", type:"novel", file:"w06.txt",
    title:"ひかりの通り道", author:"緋月れん", x:"https://x.com/", date:"2026.09.28" },

  ------------------------------------------------------------- */
];

/* サンプルのまんが（動作確認用）。不要になったら 1 行消してください */
WORKS.push(demoManga());

/* ==========================================================
   MOTIF — 聖具のモチーフ（SVG）
   ----------------------------------------------------------
   やわらかい塗りではなく、細い線＋フラットな面でつくる版画寄りの作図。
   どれも同じ位置に「内枠」が入るので、並んだときに一揃いに見えます。
   a … その作品のアクセント色 ／ b … 副色
   ========================================================== */
const M_FRAME = a=>`<rect x="24" y="24" width="152" height="152" fill="none" stroke="${a}" stroke-width="1" opacity=".55"/>`;
const MOTIF = {
  /* 光輪：同心円と、斜めに横切る一本の環 */
  halo:(a,b)=>M_FRAME(a)+`
    <circle cx="100" cy="100" r="58" fill="${b}" opacity=".34"/>
    <circle cx="100" cy="100" r="58" fill="none" stroke="${a}" stroke-width="1.4"/>
    <circle cx="100" cy="100" r="42" fill="none" stroke="${a}" stroke-width="1.4"/>
    <circle cx="100" cy="100" r="26" fill="none" stroke="${a}" stroke-width="1.4"/>
    <ellipse cx="100" cy="100" rx="80" ry="19" fill="none" stroke="${a}" stroke-width="1.6" transform="rotate(-16 100 100)"/>
    <circle cx="100" cy="100" r="9" fill="${a}"/>`,
  /* 告解室のアーチ：輪郭線と、内側のフラットな面 */
  arch:(a,b)=>M_FRAME(a)+`
    <path d="M54 168V98a46 46 0 0 1 92 0v70z" fill="none" stroke="${a}" stroke-width="1.5"/>
    <path d="M76 168V104a24 24 0 0 1 48 0v64z" fill="${b}" opacity=".42"/>
    <path d="M76 168V104a24 24 0 0 1 48 0v64z" fill="none" stroke="${a}" stroke-width="1.4"/>
    <path d="M100 104v64" stroke="${a}" stroke-width="1"/>
    <path d="M76 132h48" stroke="${a}" stroke-width="1"/>
    <rect x="44" y="168" width="112" height="6" fill="${a}"/>`,
  /* 月：円と、欠けをつくるもう一つの円 */
  moon:(a,b)=>M_FRAME(a)+`
    <circle cx="96" cy="102" r="56" fill="${b}" opacity=".38"/>
    <circle cx="96" cy="102" r="56" fill="none" stroke="${a}" stroke-width="1.5"/>
    <path d="M96 46a56 56 0 0 0 0 112 44 44 0 0 1 0-112z" fill="${a}" opacity=".8"/>
    <circle cx="150" cy="56" r="3.4" fill="${a}"/>
    <circle cx="56" cy="152" r="2.2" fill="${a}"/>`,
  /* 星：細い十字と、重ねた菱形 */
  star:(a,b)=>M_FRAME(a)+`
    <rect x="64" y="64" width="72" height="72" fill="${b}" opacity=".34" transform="rotate(45 100 100)"/>
    <rect x="64" y="64" width="72" height="72" fill="none" stroke="${a}" stroke-width="1.3" transform="rotate(45 100 100)"/>
    <rect x="64" y="64" width="72" height="72" fill="none" stroke="${a}" stroke-width="1.3"/>
    <path d="M100 32v136M32 100h136" stroke="${a}" stroke-width="1.2"/>
    <path d="M100 58l7 35 35 7-35 7-7 35-7-35-35-7 35-7z" fill="${a}"/>`,
  /* 薔薇窓：外周の円と、放射する狭間 */
  rose:(a,b)=>M_FRAME(a)+`
    <circle cx="100" cy="100" r="62" fill="${b}" opacity=".26"/>
    <circle cx="100" cy="100" r="62" fill="none" stroke="${a}" stroke-width="1.5"/>
    <circle cx="100" cy="100" r="50" fill="none" stroke="${a}" stroke-width="1"/>
    `+Array.from({length:12},(_,i)=>`<path d="M100 100L100 38" stroke="${a}" stroke-width="1" transform="rotate(${i*30} 100 100)"/>`).join("")+`
    `+Array.from({length:6},(_,i)=>`<circle cx="100" cy="62" r="11" fill="none" stroke="${a}" stroke-width="1.2" transform="rotate(${i*60} 100 100)"/>`).join("")+`
    <circle cx="100" cy="100" r="13" fill="${a}"/>`,
  /* 蝋燭：燭台のブロックと、炎の輪郭 */
  flame:(a,b)=>M_FRAME(a)+`
    <rect x="82" y="108" width="36" height="58" fill="${b}" opacity=".42"/>
    <rect x="82" y="108" width="36" height="58" fill="none" stroke="${a}" stroke-width="1.4"/>
    <rect x="66" y="166" width="68" height="8" fill="${a}"/>
    <path d="M100 38c18 24 30 40 30 56a30 30 0 0 1-60 0c0-16 12-32 30-56z" fill="none" stroke="${a}" stroke-width="1.5"/>
    <path d="M100 70c8 11 14 19 14 28a14 14 0 0 1-28 0c0-9 6-17 14-28z" fill="${a}"/>
    <path d="M100 108v58" stroke="${a}" stroke-width="1"/>`,
  /* 雫：輪郭と、満ちた下半分 */
  drop:(a,b)=>M_FRAME(a)+`
    <path d="M100 30c28 38 48 66 48 94a48 48 0 0 1-96 0c0-28 20-56 48-94z" fill="none" stroke="${a}" stroke-width="1.5"/>
    <path d="M52 124a48 48 0 0 0 96 0z" fill="${b}" opacity=".45"/>
    <path d="M52 124h96" stroke="${a}" stroke-width="1.4"/>
    <path d="M100 30v142" stroke="${a}" stroke-width="1" opacity=".7"/>
    <circle cx="82" cy="104" r="5" fill="${a}"/>`,
  /* 格子：告解室の小窓 */
  grid:(a,b)=>M_FRAME(a)+`
    <rect x="48" y="48" width="104" height="104" fill="${b}" opacity=".3"/>
    <rect x="48" y="48" width="104" height="104" fill="none" stroke="${a}" stroke-width="1.5"/>
    <path d="M74 48v104M100 48v104M126 48v104M48 74h104M48 100h104M48 126h104" stroke="${a}" stroke-width="1"/>
    <rect x="74" y="74" width="52" height="52" fill="${a}" opacity=".9"/>
    <rect x="86" y="86" width="28" height="28" fill="${b}" opacity=".9"/>`,
};

/* ==========================================================
   HELPERS
   ========================================================== */
const pad2 = n=>String(n).padStart(2,"0");
const pad3 = n=>String(n).padStart(3,"0");
/* works/ を自動で補います（"/" や "http" で始まるものはそのまま） */
function asset(pathStr){
  if(!pathStr) return "";
  if(/^(https?:)?\/\//.test(pathStr) || pathStr.startsWith("/") || pathStr.startsWith("data:")) return pathStr;
  if(pathStr.startsWith(CONFIG.worksDir)) return pathStr;
  return CONFIG.worksDir + pathStr;
}
const clamp = (v,a,b)=>v<a?a:(v>b?b:v);
const esc = s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const easeInOut = t=>t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;

/* 作品ごとの色。くすませた12色だけで回します。
   c1 … アクセント（見出し・罫・花びら）
   c2 … 副色（モチーフの面）
   sky … カードの地。書かなければ c1 から自動で淡くつくります。 */
const PALETTE = [
  {c1:"#9da2cc",c2:"#6f74a4"},   /* 青藤 */
  {c1:"#986fa0",c2:"#6d4a76"},   /* 葡萄 */
  {c1:"#829199",c2:"#5a676e"},   /* 鈍青 */
  {c1:"#b39a50",c2:"#846f31"},   /* 金 */
  {c1:"#8faa90",c2:"#5e7a61"},   /* 青磁 */
  {c1:"#ba6a87",c2:"#8a475f"},   /* 薔薇 */
  {c1:"#7f93ab",c2:"#566a80"},   /* 縹 */
  {c1:"#9a8c98",c2:"#6d616c"},   /* 藤鼠 */
  {c1:"#8d9268",c2:"#636847"},   /* 麹塵 */
  {c1:"#c77a5a",c2:"#95533a"},   /* 朱 */
  {c1:"#a3757d",c2:"#754e55"},   /* 臙脂 */
  {c1:"#b28c70",c2:"#82614b"},   /* 枯茶 */
];

/* 色を混ぜる小道具（淡いカード地と、ダークモード用に持ち上げた色をつくります） */
function hex2rgb(h){
  const s = String(h).replace("#","");
  const n = s.length===3 ? s.split("").map(c=>c+c).join("") : s;
  return [parseInt(n.slice(0,2),16), parseInt(n.slice(2,4),16), parseInt(n.slice(4,6),16)];
}
function mixHex(a,b,t){
  const A=hex2rgb(a), B=hex2rgb(b);
  return "#"+[0,1,2].map(i=>Math.round(A[i]+(B[i]-A[i])*t).toString(16).padStart(2,"0")).join("");
}
const tint = c => mixHex(c, "#efeee9", .74);   /* カードの地 */
const lift = c => mixHex(c, "#ffffff", .38);   /* ダークモードで使うアクセント */

/* いま見ている作品の色を、ページ全体に流し込みます */
function applyAccent(w){
  if(!w) return;
  const r = document.documentElement.style;
  r.setProperty("--accent", w.c1);
  r.setProperty("--accent-lift", w.lift || lift(w.c1));
  r.setProperty("--sky", w.sky);
}
const MOTIF_KEYS = Object.keys(MOTIF);
const KIND = { text:"WORDS", image:"ILLUST", manga:"MANGA", novel:"NOVEL" };
/* 言葉も小説も、中身は同じ「読み物」です */
const isReading = w => w.type === "text" || w.type === "novel";
const KIND_JA = { text:"言葉", image:"イラスト", manga:"まんが", novel:"小説" };

/* 作品の足りない項目を自動で埋める（増えても崩れないように） */
function normalize(w,i){
  if(!w.type){
    w.type = (w.file||w.text||w.textId) ? "novel"
           : (w.pages||w.dir||w.count)  ? "manga"
           : w.src                      ? "image"
           : "text";
  }
  const p = PALETTE[i % PALETTE.length];
  w.c1    = w.c1    || p.c1;
  w.c2    = w.c2    || p.c2;
  w.sky   = w.sky   || tint(w.c1);    /* カードの地（淡いほう） */
  w.lift  = lift(w.c1);               /* ダークモードで使うアクセント */
  w.motif = (w.motif && MOTIF[w.motif]) ? w.motif : MOTIF_KEYS[i % MOTIF_KEYS.length];
  w.id    = w.id    || ("no"+pad2(i+1));
  if(w.src)  w.src  = asset(w.src);
  if(w.file) w.file = asset(w.file);   /* 未指定のときの自動ID（作品側の wNN と衝突しません） */
  w.title = w.title || w.word || ("作品 "+pad2(i+1));
  w.author= w.author|| "NO NAME";
  w.date  = w.date  || "";
  w.x     = w.x     || "";
  w.ja    = w.ja    || "";
  /* 英字見出しが無いときは和題をそのまま出す（書体を明朝に切り替える） */
  w.wordIsJa = !w.word;
  w.word  = w.word  || w.title;
  w.slug  = (w.id||"").toLowerCase() || String(i);
  if(w.type==="manga" && !w.src){ const pg = mangaPages(w); if(pg.length) w.src = pg[0]; }
  return w;
}
/* まんがのページ一覧をつくる： works/<id>/001.png 002.png … */
function mangaPages(w){
  if(w.pages && w.pages.length) return w.pages.map(asset);
  if(!w.count) return [];
  const dir  = asset(w.dir || (w.id + "/"));
  const ext  = w.ext || ".png";
  const from = (w.from == null) ? 1 : w.from;   // from:0 なら 000.png はじまり
  const out  = [];
  for(let i=0;i<w.count;i++) out.push(dir + pad3(from + i) + ext);
  return out;
}

/* 動作確認用のダミーまんが（画像はその場で描いています） */
function demoManga(){
  const page = (n,total)=>{
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1020">
      <rect width="720" height="1020" fill="#efeee9"/>
      <rect x="40" y="40" width="640" height="420" fill="none" stroke="#3e3c38" stroke-width="3"/>
      <rect x="40" y="480" width="300" height="500" fill="none" stroke="#3e3c38" stroke-width="3"/>
      <rect x="360" y="480" width="320" height="240" fill="none" stroke="#3e3c38" stroke-width="3"/>
      <rect x="360" y="740" width="320" height="240" fill="none" stroke="#3e3c38" stroke-width="3"/>
      <circle cx="360" cy="240" r="96" fill="none" stroke="#3e3c38" stroke-width="3"/>
      <text x="360" y="255" font-family="serif" font-size="64" text-anchor="middle" fill="#3e3c38">${n}</text>
      <text x="680" y="1005" font-family="monospace" font-size="20" text-anchor="end" fill="#8b8781">SAMPLE ${n} / ${total}</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };
  const total = 7;
  return {
    id:"demo", type:"manga", demo:true, rtl:true, cover:true,
    pages:Array.from({length:total},(_,i)=>page(i+1,total)),
    word:"SAMPLE", title:"まんがビューアの見本", ja:"右から左へ\nめくって読めます",
    author:"サンプル", date:"2026.09.15",
    c1:"#b28c70", c2:"#82614b", motif:"grid",
  };
}

/* 挿絵の行  ［画像：e01.png］ / ［画像：e01.png｜添え書き］
   半角の [画像:e01.png] や [img:e01.png] でも同じように書けます。 */
const IMG_LINE = /^[\s　]*[［\[]\s*(?:画像|挿絵|image|img)\s*[：:]\s*([^］\]]+?)\s*[］\]][\s　]*$/;
function figureHTML(spec){
  const [file, cap] = String(spec).split(/[｜|]/);
  const src = asset(String(file).trim());
  const caption = (cap || "").trim();
  return '<figure class="rdfig">'
       + `<img src="${esc(src)}" alt="${esc(caption)}" loading="lazy" onerror="this.closest('figure').classList.add('is-missing')">`
       + (caption ? `<figcaption>${inlineMarkup(caption)}</figcaption>` : "")
       + '</figure>';
}

/* 本文を組む（ルビ・傍点・区切り・挿絵） */
const RB_BASE = "[々〇〻㐀-鿿豈-﫿ァ-ヺー々〆〇]";
function inlineMarkup(line){
  let s = esc(line);
  s = s.replace(/《《([^》]+)》》/g, '<em class="bou">$1</em>');
  s = s.replace(/｜([^｜《\n]+)《([^》\n]+)》/g, "<ruby>$1<rt>$2</rt></ruby>");
  s = s.replace(new RegExp("("+RB_BASE+"+)《([^》\n]+)》","g"), "<ruby>$1<rt>$2</rt></ruby>");
  s = s.replace(/［＃[^］\n]*］/g, "");
  return s;
}
function buildNovel(text){
  const lines = String(text).replace(/\r\n?/g,"\n").split("\n");
  const out = []; let blank = 0;
  lines.forEach(raw=>{
    const line = raw.replace(/\s+$/,"");
    if(!line.trim()){ blank++; return; }
    if(blank){ out.push('<p class="sp" aria-hidden="true"></p>'); blank = 0; }
    const fig = line.match(IMG_LINE);
    if(fig){ out.push(figureHTML(fig[1])); return; }
    if(/^[\s　]*[＊*※◇◆〇○・□■●]{1,5}[\s　]*$/.test(line)){
      out.push('<p class="sep">'+esc(line.trim())+"</p>"); return;
    }
    const body = line.replace(/^[　　]+/,"");
    const noIndent = /^[「『（(〈《【〔［“"]/.test(body);
    out.push("<p"+(noIndent?"":' class="ni"')+">"+inlineMarkup(body)+"</p>");
  });
  return out.join("");
}

/* ==========================================================
   STATE
   ========================================================== */
WORKS.forEach(normalize);
const N = WORKS.length;
const HERO_N = Math.max(1, Math.min(N, CONFIG.heroMax));
let current = -1;
const isTouch = matchMedia("(hover:none)").matches;
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
if(window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* 表示順。リロードのたびに入れ替わるので、どの作品も同じだけ目に触れます */
function shuffled(n){
  const a = Array.from({length:n},(_,i)=>i);
  for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
let ORDER = shuffled(WORKS.length);
function ensureOrder(){ if(ORDER.length !== WORKS.length) ORDER = shuffled(WORKS.length); return ORDER; }
function nextIndex(i){
  ensureOrder();
  const pos = ORDER.indexOf(i);
  return ORDER[(pos < 0 ? 0 : pos + 1) % ORDER.length];
}

const motifSVG = (w, cls="motif")=>`<svg class="${cls}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${MOTIF[w.motif](w.c1,w.c2)}</svg>`;
const stampSVG = ()=>`<svg class="card__stamp" viewBox="0 0 60 60"><defs><path id="stp" d="M30 30m-21 0a21 21 0 1 1 42 0a21 21 0 1 1-42 0"/></defs><circle cx="30" cy="30" r="27"/><circle cx="30" cy="30" r="14"/><text><textPath href="#stp">OSHIETE · SHINPU · SAMA · 2026 ·</textPath></text></svg>`;
const rowHTML = (word,n=6)=>Array.from({length:n},()=>`<span>${esc(word)}</span><span class="sep">✦</span>`).join("");
/* 画像があれば画像、無ければモチーフ */
const thumbHTML = w => w.src
  ? `<img src="${esc(w.src)}" alt="" loading="lazy" onerror="this.remove()">${motifSVG(w)}`
  : motifSVG(w);

/* ==========================================================
   HERO
   ========================================================== */
const rowA = document.getElementById("rowA"), rowB = document.getElementById("rowB");
const skyA = document.getElementById("skyA"), skyB = document.getElementById("skyB");
const metaWord = document.getElementById("metaWord"), metaJa = document.getElementById("metaJa"), metaBy = document.getElementById("metaBy");
const hnav = document.getElementById("hnav");
let rows = {front:rowA, back:rowB}, skies = {front:skyA, back:skyB};
let marqX = 0, marqSpeed = 1.0, marqBoost = 0, marqWidth = 1;
let scrollVel = 0;

function buildNav(){
  hnav.innerHTML = `<span class="track"></span>` + WORKS.slice(0,HERO_N).map((w,i)=>`<button data-i="${i}" aria-label="${esc(w.title)}">${pad2(i+1)}</button>`).join("");
  hnav.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>scrollToWord(+b.dataset.i)));
}
function measureRow(){
  const first = rows.front.querySelector("span"), sep = rows.front.querySelector(".sep");
  if(!first||!sep) return;
  marqWidth = first.getBoundingClientRect().width + sep.getBoundingClientRect().width + parseFloat(getComputedStyle(sep).marginLeft)*2;
}
function setWord(i, instant=false){
  if(i===current) return;
  const w = WORKS[i]; const dir = i>current ? 1 : -1;
  current = i;
  applyAccent(w);
  hnav.querySelectorAll("button").forEach((b,k)=>b.classList.toggle("is-active",k===i));

  /* 紙の上にアクセントをひと刷け。作品が変わるとここだけが入れ替わります。 */
  skies.back.style.setProperty("--c", w.c1);
  if(instant){ skies.front.style.setProperty("--c", w.c1); gsap.set(skies.back,{opacity:0}); }
  else{
    gsap.to(skies.back,{opacity:1,duration:1.4,ease:"power2.inOut",onComplete:()=>{
      skies.front.style.setProperty("--c", w.c1); gsap.set(skies.back,{opacity:0});
    }});
  }

  const inRow = rows.back, outRow = rows.front;
  inRow.innerHTML = rowHTML(w.word);
  inRow.style.fontFamily = w.wordIsJa ? "var(--mincho)" : "";
  if(instant){
    outRow.innerHTML = rowHTML(w.word);
    outRow.style.fontFamily = inRow.style.fontFamily;
    gsap.set(inRow,{opacity:0}); gsap.set(outRow,{opacity:1,yPercent:0});
  }else{
    gsap.killTweensOf([inRow,outRow]);
    gsap.fromTo(inRow,{opacity:0,yPercent:38*dir,filter:"blur(8px)"},{opacity:1,yPercent:0,filter:"blur(0px)",duration:1.1,ease:"expo.out"});
    gsap.to(outRow,{opacity:0,yPercent:-38*dir,filter:"blur(8px)",duration:.8,ease:"expo.in"});
    rows = {front:inRow, back:outRow};
  }
  requestAnimationFrame(measureRow);
  marqBoost += 40*dir;

  const swapText = (el,html)=>{
    if(instant){ el.innerHTML = html; return; }
    gsap.to(el,{yPercent:-110,duration:.35,ease:"power2.in",overwrite:true,onComplete:()=>{ el.innerHTML = html; gsap.fromTo(el,{yPercent:110},{yPercent:0,duration:.6,ease:"expo.out"}); }});
  };
  swapText(metaWord, `${pad2(i+1)} — ${esc(w.title)}`);
  swapText(metaBy,   `${KIND[w.type]} / ${esc(w.author)}`);
  swapText(metaJa,   esc(w.ja).replace("\n","<br>"));

  paintPetals(instant);
}

function tickMarquee(){
  marqBoost *= 0.92;
  const v = (marqSpeed + marqBoost*0.06 + Math.min(Math.abs(scrollVel),1400)*0.006) * (reduce?0.3:1);
  marqX -= v;
  if(marqX < -marqWidth) marqX += marqWidth;
  if(marqX > 0) marqX -= marqWidth;
  const t = `translate3d(${marqX}px,0,0)`;
  rowA.style.transform = t; rowB.style.transform = t;
  scrollVel *= 0.9;
  if(articleOpen && artMarqW>0){
    artMarqX -= 0.55; if(artMarqX < -artMarqW) artMarqX += artMarqW;
    artMarq.style.transform = `translate3d(${artMarqX}px,-50%,0)`;
  }
}

let heroST;
function setupHero(){
  const step = () => Math.max(window.innerHeight*0.75, 420);

  /* 広い画面：ヒーローを貼りつけて、縦スクロールで作品を巡ります。
     スマホ：貼りつけません。横に払って作品を変え、下へスクロールすると
             そのまま Confession へ進みます。 */
  gsap.matchMedia().add("(min-width: 821px)", ()=>{
    heroST = ScrollTrigger.create({
      trigger:"#hero", start:"top top", end:()=>"+="+step()*(HERO_N-1), pin:true, scrub:true,
      onUpdate(self){
        scrollVel = self.getVelocity();
        const idx = Math.round(self.progress*(HERO_N-1));
        if(idx!==current) setWord(idx);
      }
    });
    return ()=>{ heroST = null; };
  });
}
function scrollToWord(i){
  if(!heroST){ setWord(clamp(i,0,HERO_N-1)); return; }   /* スマホはその場で切り替え */
  const step = (heroST.end - heroST.start)/Math.max(1,HERO_N-1);
  window.scrollTo({top: heroST.start + step*i, behavior:"smooth"});
}

/* スマホ：ヒーローを横に払って作品を変えます。
   縦に払ったときは何もせず、ページがそのまま下へ動きます。 */
let heroSwiped = false;
(function heroSwipe(){
  const hero = document.getElementById("hero");
  if(!hero) return;
  let sx = 0, sy = 0, tracking = false;
  hero.addEventListener("touchstart", e=>{
    heroSwiped = false;
    if(heroST || e.touches.length !== 1 || (e.target.closest && e.target.closest(".hnav"))){ tracking = false; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
  },{passive:true});
  hero.addEventListener("touchend", e=>{
    if(!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    heroSwiped = true;                       /* このあとの click は作品を開かない */
    const next = clamp(current + (dx < 0 ? 1 : -1), 0, HERO_N - 1);
    if(next !== current) setWord(next);
  },{passive:true});
})();
function scrollToEl(id){
  const el = document.getElementById(id); if(!el) return;
  window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY, behavior:"smooth"});
}

/* カーソル追従 */
const cursorEl = document.getElementById("cursor");
const marquee = document.getElementById("marquee");
const cx = gsap.quickTo(cursorEl,"x",{duration:.35,ease:"power3"}), cy = gsap.quickTo(cursorEl,"y",{duration:.35,ease:"power3"});
window.addEventListener("pointermove",e=>{ cx(e.clientX); cy(e.clientY); petalsMouse(e.clientX/innerWidth*2-1, -(e.clientY/innerHeight*2-1)); });
marquee.addEventListener("pointerenter",()=>{ cursorEl.classList.add("is-on"); gsap.to(cursorEl,{scale:1,duration:.5,ease:"back.out(2)"}); });
marquee.addEventListener("pointerleave",()=>{ cursorEl.classList.remove("is-on"); gsap.to(cursorEl,{scale:.6,duration:.4}); });
marquee.addEventListener("click",e=>{ if(heroSwiped){ heroSwiped=false; return; } openArticle(current, e.clientX, e.clientY); });
marquee.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openArticle(current); }});
document.getElementById("discover").addEventListener("click",e=>{ if(heroSwiped){ heroSwiped=false; return; } const r=e.currentTarget.getBoundingClientRect(); openArticle(current, r.left+r.width/2, r.top+r.height/2); });

/* ==========================================================
   CONFESSION — ポストカード横スクロール
   ========================================================== */
const deck = document.getElementById("deck");
function buildDeck(){
  ensureOrder();
  deck.innerHTML = ORDER.map((idx,pos)=>{ const w = WORKS[idx]; return `
    <article class="card" style="--i:${pos};--r:${(Math.random()*6-3).toFixed(2)};--c1:${w.sky};--c2:#f1efe8" data-i="${idx}">
      <div class="card__tilt">
        <div class="card__paper">
          <div class="card__img">${thumbHTML(w)}<span class="card__kind">${KIND[w.type]}</span>${stampSVG()}</div>
          <div class="card__label"${w.wordIsJa?' style="font-family:var(--mincho);font-size:19px"':""}>${esc(w.word)}</div>
        </div>
      </div>
      <p class="card__ja">${esc(w.ja).replace("\n","<br>") || esc(w.title)}</p>
      <div class="card__by">by ${esc(w.author)}</div>
    </article>`; }).join("");

  deck.querySelectorAll(".card").forEach(card=>{
    const tilt = card.querySelector(".card__tilt");
    card.addEventListener("pointermove",e=>{
      if(isTouch) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
      tilt.style.transform = `rotateY(${px*18}deg) rotateX(${-py*18}deg) translateZ(14px)`;
    });
    card.addEventListener("pointerleave",()=>{ tilt.style.transform = ""; });
    card.addEventListener("click",e=>openArticle(+card.dataset.i, e.clientX, e.clientY));
  });
  document.getElementById("galleryCount").textContent = pad2(WORKS.length);
}
/* 斜めの光をランダムに組み立てる（リロードごとに違う当たり方になります） */
function buildBlinds(){
  const box = document.getElementById("galBlinds");
  if(!box) return;
  const n = 7, out = [];
  for(let i=0;i<n;i++){
    const x    = (-10 + Math.random()*120).toFixed(1) + "%";
    const w    = (60 + Math.random()*230).toFixed(0) + "px";
    const rot  = (13 + (Math.random()*7 - 3.5)).toFixed(1) + "deg";   /* ／の向き・ゆるめ */
    const blur = (22 + Math.random()*34).toFixed(0) + "px";
    const o    = (0.025 + Math.random()*0.055).toFixed(3);
    const d    = (18 + Math.random()*34).toFixed(1) + "s";
    const dl   = (-Math.random()*30).toFixed(1) + "s";
    const from = (-40 - Math.random()*70).toFixed(0) + "px";
    const to   = ( 40 + Math.random()*70).toFixed(0) + "px";
    const s1   = (0.85 + Math.random()*0.3).toFixed(2);
    const s2   = (0.85 + Math.random()*0.3).toFixed(2);
    out.push(`<i style="--x:${x};--w:${w};--rot:${rot};--b:${blur};--o:${o};--d:${d};--delay:${dl};--from:${from};--to:${to};--s1:${s1};--s2:${s2}"></i>`);
  }
  box.innerHTML = out.join("");
}

function setupGallery(){
  const getDist = ()=> Math.max(0, deck.scrollWidth - window.innerWidth);

  const fade = self => { if(!articleOpen) petalsAlpha(1 - self.progress); };
  const mm = gsap.matchMedia();

  /* 広い画面：セクションを貼りつけて、縦スクロールをカードの横送りに変えます。 */
  mm.add("(min-width: 821px)", ()=>{
    gsap.to(deck,{
      x:()=>-getDist(), ease:"none",
      scrollTrigger:{
        trigger:"#gallery", start:"top top", end:()=>"+="+getDist()*1.1, pin:true, scrub:1, invalidateOnRefresh:true,
        onUpdate(self){
          const v = gsap.utils.clamp(-8,8,self.getVelocity()/220);
          gsap.to(".card__paper",{skewX:-v,duration:.6,ease:"power2.out",overwrite:"auto"});
        }
      }
    });
    /* 貼りついているぶんヒーローが長いので、近づいてから消し始めます */
    ScrollTrigger.create({ trigger:"#gallery", start:"top 90%", end:"top 10%", scrub:true, onUpdate:fade });
    return ()=>{ gsap.set(deck,{clearProps:"transform"}); petalsAlpha(1); };
  });

  /* スマホ：指で横にスワイプして見てもらいます（CSS側が担当）。
     ヒーローが1画面ぶんしかないので、紙片は Confession が画面に乗ってから
     消し始めます。そうしないと、少しスクロールしただけで消えてしまいます。 */
  mm.add("(max-width: 820px)", ()=>{
    ScrollTrigger.create({ trigger:"#gallery", start:"top top", end:"+=60%", scrub:true, onUpdate:fade });
    return ()=>{ petalsAlpha(1); };
  });
}

/* ==========================================================
   MENU
   ========================================================== */
const menu = document.getElementById("menu"), burger = document.getElementById("burger");
const header = document.getElementById("header");
let menuOpen = false;

function buildMenu(){
  ensureOrder();
  document.getElementById("menuGrid").innerHTML = ORDER.map(idx=>{ const w = WORKS[idx]; return `
    <button class="mcard" type="button" data-i="${idx}" style="--c1:${w.sky};--c2:#f1efe8">
      <span class="mcard__img">${thumbHTML(w)}<span class="mcard__kind">${KIND[w.type]}</span></span>
      <span class="mcard__label"${w.wordIsJa?' style="font-family:var(--mincho);font-size:13px"':""}>${esc(w.word)}</span>
      <span class="mcard__by">${esc(w.author)} · ${KIND_JA[w.type]}</span>
    </button>`; }).join("");
  document.getElementById("menuCount").textContent = pad2(WORKS.length) + " WORKS";
  document.getElementById("menuGrid").querySelectorAll(".mcard").forEach(b=>{
    b.addEventListener("click",()=>{
      const i = +b.dataset.i;
      toggleMenu(false);
      const r = b.getBoundingClientRect();
      setTimeout(()=>openArticle(i, r.left+r.width/2, r.top+r.height/2), 460);
    });
  });
}
function toggleMenu(force){
  menuOpen = force ?? !menuOpen;
  burger.classList.toggle("is-open",menuOpen);
  header.classList.toggle("is-menu",menuOpen);
  menu.setAttribute("aria-hidden",!menuOpen);
  if(menuOpen){
    menu.classList.add("is-open");
    gsap.to(menu,{clipPath:"inset(0 0 0% 0)",duration:.9,ease:"expo.inOut"});
    gsap.fromTo(".menu__side > *",{y:30,opacity:0},{y:0,opacity:1,duration:.8,stagger:.06,delay:.3,ease:"expo.out"});
    gsap.fromTo(".menu__gal",{y:24,opacity:0},{y:0,opacity:1,duration:.8,delay:.36,ease:"expo.out"});
  }else{
    gsap.to(menu,{clipPath:"inset(0 0 100% 0)",duration:.8,ease:"expo.inOut",onComplete:()=>menu.classList.remove("is-open")});
  }
  if(!articleOpen) document.body.classList.toggle("is-locked",menuOpen);
}
burger.addEventListener("click",()=>toggleMenu());
menu.querySelectorAll("[data-scroll]").forEach(a=>a.addEventListener("click",e=>{
  e.preventDefault(); toggleMenu(false);
  if(articleOpen) closeArticle(false);
  setTimeout(()=>scrollToEl(a.dataset.scroll),450);
}));
document.getElementById("aboutLink").addEventListener("click",e=>{ e.preventDefault(); if(articleOpen) closeArticle(false); setTimeout(()=>scrollToEl("about"),50); });
document.getElementById("logo").addEventListener("click",e=>{ e.preventDefault(); if(menuOpen) toggleMenu(false); if(articleOpen) closeArticle(); else window.scrollTo({top:0,behavior:"smooth"}); });

/* ==========================================================
   ARTICLE — アイリスアウトで開く作品ビュー
     ① 円にかこまれた背景が、スクロールに従って閉じていく
     ② 中央の図形・英字はその円の中に消える／花びらはフェード
     ③ 閉じきると文章のセクションが現れる
   ========================================================== */
const article  = document.getElementById("article");
const artStage = document.getElementById("artStage");
const artIris  = document.getElementById("artIris");
const artMarq  = document.getElementById("artMarq");
const artWm    = document.getElementById("artWm");
const artMotif = document.getElementById("artMotif");
const artPic   = document.getElementById("artPic");
let articleOpen=false, articleIdx=-1, artMarqX=0, artMarqW=0;

/* アイリスが閉じきるまでのスクロール量。
   本文がせり上がりきるころに閉じおわるよう、画面1枚ぶんより長めにとっています。
   ----------------------------------------------------------
   ものさしには window.innerHeight を使いません。スマホでは
   スクロール中にブラウザの上下のバーが出入りして、この値が
   何度も変わります。そのたびに進み具合が飛んで、円が明滅します。
   代わりに、バーの開閉では変わらない 100svh で組んだ導入部の
   高さを測り、作品を開いたときに一度だけ決めて固定します。 */
let irisSpanPx = 0;
function measureIrisSpan(){
  const h = (artStage && artStage.offsetHeight) || window.innerHeight;
  irisSpanPx = Math.max(420, h * 1.25);
}
const irisSpan = ()=> irisSpanPx || Math.max(420, window.innerHeight * 1.25);
/* 円は助走の 80% で閉じきります（本文が出そろうころには消えている） */
const IRIS_DONE = 0.80;

function setIris(p){          /* p: 0（全開）→ 1（閉じきり） */
  const k = 1 - easeInOut(clamp(p / IRIS_DONE, 0, 1));
  article.style.setProperty("--iris", k.toFixed(4));
  /* 中央の図形は、円が閉じるのに合わせて奥へ引いていきます */
  artIris.style.transform = `scale(${(0.40 + 0.60*k).toFixed(4)})`;
  artIris.style.opacity = (0.10 + 0.90*k).toFixed(3);
}

function fillArticle(i){
  const w = WORKS[i], nx = WORKS[nextIndex(i)];
  articleIdx = i;
  applyAccent(w);

  artMarq.innerHTML = rowHTML(w.word,5);
  artMarq.style.fontFamily = w.wordIsJa ? "var(--mincho)" : "";
  const wmRow = rowHTML(w.word,5);
  artWm.innerHTML = "<span>"+wmRow+"</span><span>"+wmRow+"</span>";   /* 2つ並べて途切れなく循環 */
  artWm.style.fontFamily = artMarq.style.fontFamily;
  requestAnimationFrame(()=>{
    const s=artMarq.querySelector("span"), sp=artMarq.querySelector(".sep");
    if(s&&sp) artMarqW = s.getBoundingClientRect().width + sp.getBoundingClientRect().width + parseFloat(getComputedStyle(sp).marginLeft)*2;
  });

  /* 中央：画像があれば画像、無ければモチーフ */
  if(w.src){
    artMotif.innerHTML = `<img src="${esc(w.src)}" alt="${esc(w.title)}">`;
    const im = artMotif.querySelector("img");
    im.onerror = ()=>{ artMotif.innerHTML = motifSVG(w,""); };
  }else{
    artMotif.innerHTML = motifSVG(w,"");
  }

  const t = document.getElementById("artTitle");
  t.textContent = w.word;
  t.style.fontFamily = w.wordIsJa ? "var(--mincho)" : "";
  t.style.fontSize   = w.wordIsJa ? "clamp(30px,5vw,64px)" : "";
  document.getElementById("artJaTitle").textContent = w.wordIsJa ? "" : w.title;
  document.getElementById("artSub").innerHTML =
    [ esc(w.ja).replace("\n","<br>"),
      `${KIND_JA[w.type]}<span class="dot">·</span>` +
      (w.x ? `<a href="${esc(w.x)}" target="_blank" rel="noopener">by ${esc(w.author)}</a>` : `by ${esc(w.author)}`) +
      (w.date ? `<span class="dot">·</span>${esc(w.date)}` : "")
    ].filter(Boolean).join("<br>");
  document.getElementById("artChapter").innerHTML = `No. ${pad2(i+1)} <i></i> ${esc(w.title)}`;

  /* 種別ごとの本体。
     言葉（text）も小説（novel）も、同じ読み物として同じ組みで出します。 */
  article.classList.toggle("is-novel", isReading(w));
  article.classList.toggle("is-manga", w.type==="manga");
  artPic.hidden = (w.type!=="image");
  artPic.innerHTML = "";

  if(isReading(w)){
    openNovel(w);
  }else if(w.type==="image"){
    artPic.innerHTML = `<img src="${esc(w.src)}" alt="${esc(w.title)} / ${esc(w.author)}">`;
  }else if(w.type==="manga"){
    openManga(w);
  }

  const next = document.getElementById("artNext");
  next.querySelector("b").textContent = nx.word;
  next.querySelector("b").style.fontFamily = nx.wordIsJa ? "var(--mincho)" : "";
  document.title = `${w.title} — 教えて神父さま`;
}

function openArticle(i, x=innerWidth/2, y=innerHeight/2, instant=false){
  if(i<0||i>=WORKS.length) i = 0;
  fillArticle(i);
  article.scrollTop = 0;
  measureIrisSpan();
  setIris(0);
  article.classList.remove("is-reading");
  article.classList.add("is-open"); article.setAttribute("aria-hidden","false");
  header.classList.add("is-article");
  document.body.classList.add("is-locked");
  cursorEl.classList.remove("is-on");
  articleOpen = true;
  history.replaceState(null,"","#"+WORKS[i].slug);
  paintPetals(instant); petalsAlpha(1);
  document.getElementById("petals").classList.add("is-article");
  if(instant){ gsap.set(article,{clipPath:`circle(160vmax at ${x}px ${y}px)`}); }
  else{
    gsap.fromTo(article,{clipPath:`circle(0px at ${x}px ${y}px)`},{clipPath:`circle(160vmax at ${x}px ${y}px)`,duration:1.3,ease:"expo.inOut"});
    gsap.fromTo("#artMotif",{scale:.5,rotate:-12,opacity:0},{scale:1,rotate:0,opacity:1,duration:1.4,delay:.45,ease:"expo.out"});
  }
}
function closeArticle(animate=true){
  if(!articleOpen) return;
  articleOpen=false;
  header.classList.remove("is-article","is-deep");
  history.replaceState(null,"","#");
  document.title = "教えて神父さま — 星乃かなた ファンアート企画";
  const w = WORKS[Math.max(current,0)];
  applyAccent(w); paintPetals(false); petalsAlpha(1);
  const done=()=>{
    article.classList.remove("is-open","is-reading","is-novel","is-manga","is-mg-vertical");
    article.setAttribute("aria-hidden","true");
    document.body.classList.remove("is-locked");
    document.getElementById("petals").classList.remove("is-article");
    ScrollTrigger.refresh();
  };
  if(animate) gsap.to(article,{clipPath:`circle(0px at 50% 50%)`,duration:.9,ease:"expo.inOut",onComplete:done});
  else { gsap.set(article,{clipPath:`circle(0px at 50% 50%)`}); done(); }
}
document.getElementById("artClose").addEventListener("click",()=>closeArticle());
document.getElementById("artBack").addEventListener("click",()=>{ closeArticle(); setTimeout(()=>scrollToEl("gallery"),900); });
document.getElementById("artNext").addEventListener("click",e=>{
  e.preventDefault(); const nx = nextIndex(articleIdx);
  gsap.to(article,{opacity:0,duration:.4,onComplete:()=>{
    fillArticle(nx);
    article.scrollTop=0; setIris(0);
    article.classList.remove("is-reading");
    history.replaceState(null,"","#"+WORKS[nx].slug);
    gsap.fromTo("#artMotif",{scale:.6,opacity:0},{scale:1,opacity:1,duration:1.2,ease:"expo.out"});
    gsap.to(article,{opacity:1,duration:.6});
  }});
});
window.addEventListener("keydown",e=>{ if(e.key==="Escape"){ if(menuOpen) toggleMenu(false); else if(articleOpen) closeArticle(); }});

/* スクロールでアイリスを閉じる → 文章が現れる
   ----------------------------------------------------------
   ここは requestAnimationFrame でまとめず、スクロールのたびに
   その場で計算します。スマホでは指を離したあとの慣性スクロール中に
   requestAnimationFrame が間引かれることがあり、そのあいだ円の大きさが
   止まったままになって、あとから一気に追いつくため明滅して見えます。
   「読みはじめ」の境目にだけ幅を持たせて、しきい値の前後で
   出たり消えたりしないようにしています。 */
function updateArticleScroll(){
  const p = clamp(article.scrollTop / irisSpan(), 0, 1);
  setIris(p);
  /* 行きと戻りでしきい値をずらす（ヒステリシス） */
  const reading = article.classList.contains("is-reading");
  if(!reading && p > 0.34)      article.classList.add("is-reading");
  else if(reading && p < 0.26)  article.classList.remove("is-reading");
  const deep = header.classList.contains("is-deep");
  if(!deep && p > 0.39)     header.classList.add("is-deep");
  else if(deep && p < 0.31) header.classList.remove("is-deep");
  petalsAlpha(clamp(1 - p*2.2, 0, 1));   /* 紙片は早めにフェード */
}
article.addEventListener("scroll", updateArticleScroll, {passive:true});
let lastWinW = window.innerWidth;
window.addEventListener("resize",()=>{
  const turned = window.innerWidth !== lastWinW;   /* 回転や画面幅の変化だけを見る */
  lastWinW = window.innerWidth;
  if(!articleOpen) return;
  if(turned) measureIrisSpan();                    /* 高さだけの変化では測り直しません */
  setIris(clamp(article.scrollTop/irisSpan(),0,1));
});

/* ==========================================================
   小説
     ほかの読み物と同じ組みで出し、文字の大きさと組み方向だけ選べます。
     選んだ状態は localStorage に残ります。
     白と黒はページ全体のライト／ダークに任せました。
   ========================================================== */
const rdText = document.getElementById("rdText");
const RD_KEY = "oshiete.reader";
const rd = { size:"m", dir:"v" };
try{
  const saved = JSON.parse(localStorage.getItem(RD_KEY) || "{}");
  if(saved.size) rd.size = saved.size;
  if(saved.dir)  rd.dir  = saved.dir;
}catch(e){}

/* 縦書きの scrollLeft は、ブラウザによって「0 → -max」と「max → 0」の2通りがあります。
   どちらでも “読みすすめる＝値が減る” になるよう、いちど範囲を測ってから使います。 */
let RD_RANGE = {min:0, max:0};
function rdRange(){
  const el = rdText;
  const span = el.scrollWidth - el.clientWidth;
  if(span <= 1){ RD_RANGE = {min:0,max:0}; return RD_RANGE; }
  const keep = el.scrollLeft;
  el.scrollLeft = -span;
  RD_RANGE = (el.scrollLeft < -1) ? {min:-span, max:0} : {min:0, max:span};
  el.scrollLeft = keep;
  return RD_RANGE;
}
function rdCanMove(d){            /* d>0＝読みすすめる方向 */
  const x = rdText.scrollLeft;
  return d > 0 ? x > RD_RANGE.min + 0.5 : x < RD_RANGE.max - 0.5;
}
function rdScrollBy(d){
  rdText.scrollLeft = clamp(rdText.scrollLeft - d, RD_RANGE.min, RD_RANGE.max);
}
function rdHome(){
  rdText.scrollTop = 0;
  if(rd.dir === "v"){ rdRange(); rdText.scrollLeft = RD_RANGE.max; }
  else { rdText.scrollLeft = 0; }
}
/* 本文の先頭が、作品ページのどこにあるか。
   .article__body 自身が position:relative なので offsetTop では足りません。
   画面上の位置から、スクロール量をふくめて測り直します。 */
function rdTop(){
  return rdText.getBoundingClientRect().top - article.getBoundingClientRect().top + article.scrollTop;
}
/* いま全体のどのあたりを読んでいるか（0＝冒頭 / 1＝末尾）。
   文字の大きさや組み方向を変えても、同じあたりに戻れるようにするためです。 */
function rdProgress(){
  if(!article.classList.contains("is-novel")) return 0;
  if(rd.dir === "v"){
    rdRange();
    const span = RD_RANGE.max - RD_RANGE.min;
    return span > 1 ? clamp((RD_RANGE.max - rdText.scrollLeft) / span, 0, 1) : 0;
  }
  const span = rdText.offsetHeight - article.clientHeight * 0.72;
  return span > 1 ? clamp((article.scrollTop - rdTop()) / span, 0, 1) : 0;
}
function rdSeek(ratio){
  if(rd.dir === "v"){
    rdRange();
    const span = RD_RANGE.max - RD_RANGE.min;
    rdText.scrollTop = 0;
    rdText.scrollLeft = RD_RANGE.max - span * ratio;
  }else{
    rdText.scrollLeft = 0;
    const span = rdText.offsetHeight - article.clientHeight * 0.72;
    article.scrollTop = rdTop() + Math.max(0, span) * ratio;
  }
}
function applyReader(home){
  article.classList.remove("is-rd-s","is-rd-m","is-rd-l","is-rd-v","is-rd-h");
  article.classList.add("is-rd-"+rd.size, "is-rd-"+rd.dir);
  document.querySelectorAll("[data-rd-size]").forEach(b=>b.classList.toggle("is-on", b.dataset.rdSize===rd.size));
  document.querySelectorAll("[data-rd-dir]").forEach(b=>b.classList.toggle("is-on", b.dataset.rdDir===rd.dir));
  document.getElementById("rdHint").textContent = rd.dir==="v"
    ? (isTouch ? "横にスワイプすると、右から左へ読みすすめられます"
               : "ホイール / ← → で右から左へ読みすすめられます")
    : (isTouch ? "そのまま下へ読みすすめられます"
               : "スクロール / ↑ ↓ で読みすすめられます");
  try{ localStorage.setItem(RD_KEY, JSON.stringify(rd)); }catch(e){}
  if(home) requestAnimationFrame(rdHome);
}
/* 読んでいる途中で変えても、同じあたりから読み続けられます */
function changeReader(fn){
  const at = rdProgress();
  fn();
  applyReader(false);
  requestAnimationFrame(()=>requestAnimationFrame(()=>rdSeek(at)));
}
document.querySelectorAll("[data-rd-size]").forEach(b=>b.addEventListener("click",()=>changeReader(()=>{ rd.size=b.dataset.rdSize; })));
document.querySelectorAll("[data-rd-dir]").forEach(b=>b.addEventListener("click",()=>changeReader(()=>{ rd.dir=b.dataset.rdDir; })));

/* 本文が用意できていないときに見せる文章。works/404.txt にあります。 */
const NOT_FOUND = asset("404.txt");
const NOVEL_CACHE = {};

function fetchText(file){
  if(NOVEL_CACHE[file]) return Promise.resolve(NOVEL_CACHE[file]);
  return fetch(file)
    .then(res=>{ if(!res.ok) throw new Error(res.status); return res.text(); })
    .then(text=>{ NOVEL_CACHE[file] = buildNovel(text); return NOVEL_CACHE[file]; });
}

function openNovel(w){
  applyReader(false);
  const done = html=>{
    if(WORKS[articleIdx] !== w) return;   /* 読み込み中に別の作品へ移っていたら捨てる */
    rdText.innerHTML = html;
    requestAnimationFrame(()=>{ rdRange(); rdHome(); });
  };

  /* WORKS に本文を直接書いてあるとき（text / body / textId） */
  const inline = ()=>{
    if(w.text) return buildNovel(w.text);
    if(w.body && w.body.length) return buildNovel(w.body.join("\n\n"));
    const el = w.textId && document.getElementById(w.textId);
    return el ? buildNovel(el.textContent) : null;
  };
  /* 読めなかったときは works/404.txt を出します */
  const fallback = ()=>{
    const fb = inline();
    if(fb){ done(fb); return; }
    fetchText(NOT_FOUND)
      .then(done)
      .catch(()=>done('<p class="wait">ここにはまだ何もありません。</p>'));
  };

  if(!w.file){ fallback(); return; }

  if(NOVEL_CACHE[w.file]){ done(NOVEL_CACHE[w.file]); return; }
  rdText.innerHTML = '<p class="wait">読み込んでいます…</p>';
  fetchText(w.file).then(done).catch(err=>{
    console.warn("[oshiete] 本文を読み込めませんでした:", w.file, err);
    fallback();
  });
}

/* 縦書きのとき、ホイールの上下を右→左のスクロールに割りあてる */
rdText.addEventListener("wheel", e=>{
  if(rd.dir!=="v" || !article.classList.contains("is-novel")) return;
  if(RD_RANGE.min === RD_RANGE.max) rdRange();
  if(RD_RANGE.min === RD_RANGE.max) return;
  const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  if(!d || !rdCanMove(d)) return;   /* 端まで来たらページ側のスクロールに返す */
  e.preventDefault();
  rdScrollBy(d);
},{passive:false});
window.addEventListener("resize",()=>{ if(article.classList.contains("is-novel") && rd.dir==="v") rdRange(); });

/* ==========================================================
   漫画ビューア（右→左めくり／広い画面は見開き）
   ========================================================== */
const mgWrap = document.getElementById("mgWrap");
const mgStage = document.getElementById("mgStage");
const mgFlow = document.getElementById("mgFlow");
const mgBar = document.getElementById("mgBar");
const mgA = document.getElementById("mgA"), mgB = document.getElementById("mgB");
const mgNo = document.getElementById("mgNo"), mgThumbs = document.getElementById("mgThumbs"), mgZoom = document.getElementById("mgZoom");
let mgPages=[], mgSpreads=[], mgAt=0, mgRtl=true, mgSingle=false, mgWork=null, mgVertical=false;

/* スマホは「ナビなしの縦スクロール漫画」 */
const MG_VERTICAL_Q = window.matchMedia("(max-width:820px)");
function wantVertical(){ return MG_VERTICAL_Q.matches; }

function canSpread(){
  if(mgVertical || mgSingle) return false;
  return window.innerWidth >= 900 && window.innerWidth/window.innerHeight > 1.15;
}
function buildSpreads(){
  mgSpreads = [];
  const n = mgPages.length; if(!n) return;
  if(!canSpread() || n===1){ for(let i=0;i<n;i++) mgSpreads.push([i]); return; }
  let i = 0;
  if(mgWork && mgWork.cover !== false){ mgSpreads.push([0]); i = 1; }
  for(; i<n; i+=2) mgSpreads.push(i+1<n ? [i,i+1] : [i]);
}
function spreadOfPage(pi){
  for(let i=0;i<mgSpreads.length;i++) if(mgSpreads[i].indexOf(pi)>=0) return i;
  return 0;
}
function mgPreload(i){
  [i+1,i+2].forEach(k=>{ const sp=mgSpreads[k]; if(!sp) return; sp.forEach(pi=>{ const im=new Image(); im.src=mgPages[pi]; }); });
}
function paintManga(){
  if(mgVertical) return;
  const sp = mgSpreads[mgAt] || [0];
  mgA.src = mgPages[sp[0]] || ""; mgA.hidden = false;
  if(sp.length>1){ mgB.src = mgPages[sp[1]] || ""; mgB.hidden = false; }
  else { mgB.removeAttribute("src"); mgB.hidden = true; }
  const from = sp[0]+1, to = sp[sp.length-1]+1;
  mgNo.textContent = (from===to ? from : from+"–"+to) + " / " + mgPages.length;
  mgThumbs.querySelectorAll(".mgthumb").forEach((b,i)=>b.classList.toggle("is-on", sp.indexOf(i)>=0));
  const on = mgThumbs.querySelector(".mgthumb.is-on");
  if(on && on.scrollIntoView) on.scrollIntoView({block:"nearest",inline:"center",behavior:"smooth"});
  mgPreload(mgAt);
  mgWrap.classList.toggle("is-spread", sp.length>1);
  mgWrap.classList.toggle("is-first", mgAt<=0);
  mgWrap.classList.toggle("is-last",  mgAt>=mgSpreads.length-1);
}
function mgGo(d){
  if(mgVertical || !mgSpreads.length) return;
  const at = clamp(mgAt+d, 0, mgSpreads.length-1);
  if(at === mgAt) return;
  mgAt = at;
  paintManga();
}

/* スマホ用：全ページを縦に積む */
function paintFlow(){
  mgFlow.innerHTML = mgPages.map((src,i)=>
    `<img src="${esc(src)}" alt="${i+1}ページ目" loading="${i<2?"eager":"lazy"}">`
  ).join("");
}

function applyMangaMode(){
  mgVertical = wantVertical();
  mgWrap.classList.toggle("is-vertical", mgVertical);
  article.classList.toggle("is-mg-vertical", mgVertical);
  if(mgVertical){
    if(mgFlow.childElementCount !== mgPages.length) paintFlow();
    return;
  }
  const cur = (mgSpreads[mgAt]||[0])[0];
  buildSpreads();
  mgAt = spreadOfPage(cur);
  paintManga();
}

function openManga(w){
  mgWork = w;
  mgPages = mangaPages(w);
  mgRtl = w.rtl !== false;
  mgAt = 0; mgSingle = false;
  mgWrap.classList.toggle("is-rtl", mgRtl);
  mgStage.classList.toggle("is-rtl", mgRtl);
  mgBar.classList.toggle("is-rtl", mgRtl);
  mgWrap.classList.remove("is-single");
  mgZoom.textContent = "1ページで見る";
  mgThumbs.innerHTML = mgPages.map((src,i)=>
    `<button class="mgthumb" type="button" data-pg="${i}" aria-label="${i+1}ページ目"><img src="${esc(src)}" alt="" loading="lazy"><i>${i+1}</i></button>`
  ).join("");
  mgFlow.innerHTML = "";
  applyMangaMode();
}
mgThumbs.addEventListener("click",e=>{
  const b = e.target.closest && e.target.closest(".mgthumb");
  if(!b) return;
  mgAt = spreadOfPage(parseInt(b.dataset.pg,10)||0);
  paintManga();
});
document.getElementById("mgFwd").addEventListener("click",()=>mgGo(1));
document.getElementById("mgBack").addEventListener("click",()=>mgGo(-1));
function toggleSingle(){
  if(mgVertical) return;
  mgSingle = !mgSingle;
  mgWrap.classList.toggle("is-single", mgSingle);
  mgZoom.textContent = mgSingle ? "見開きで見る" : "1ページで見る";
  const cur = (mgSpreads[mgAt]||[0])[0];
  buildSpreads(); mgAt = spreadOfPage(cur); paintManga();
}
mgZoom.addEventListener("click",toggleSingle);
window.addEventListener("resize",()=>{
  if(!article.classList.contains("is-manga")) return;
  applyMangaMode();
});
if(MG_VERTICAL_Q.addEventListener) MG_VERTICAL_Q.addEventListener("change",()=>{
  if(article.classList.contains("is-manga")) applyMangaMode();
});

/* ページのスワイプでめくる（右→左の本なら、右へ払うと次のページ） */
(function(){
  let sx=0, sy=0, tracking=false, swiped=false;
  mgWrap.addEventListener("touchstart", e=>{
    swiped = false;
    if(mgVertical || e.touches.length !== 1 || !article.classList.contains("is-manga")){ tracking=false; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
  },{passive:true});
  mgWrap.addEventListener("touchend", e=>{
    if(!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
    swiped = true;
    mgGo((dx > 0) === mgRtl ? 1 : -1);
  },{passive:true});
  /* タップで見開き⇄1ページ。スワイプの直後は反応させません */
  mgStage.addEventListener("click", e=>{
    if(swiped){ swiped = false; return; }
    if(e.target === mgA || e.target === mgB) toggleSingle();
  });
})();

/* 矢印キー：まんが＝ページ送り／小説＝本文送り */
window.addEventListener("keydown",e=>{
  if(!articleOpen) return;
  if(e.key!=="ArrowLeft" && e.key!=="ArrowRight" && e.key!=="ArrowUp" && e.key!=="ArrowDown") return;
  if(article.classList.contains("is-manga")){
    if(e.key==="ArrowLeft")  { e.preventDefault(); mgGo(mgRtl?1:-1); }
    if(e.key==="ArrowRight") { e.preventDefault(); mgGo(mgRtl?-1:1); }
    return;
  }
  if(article.classList.contains("is-novel") && rd.dir==="v"){
    const step = rdText.clientWidth * 0.85;
    if(e.key==="ArrowLeft"){  e.preventDefault(); rdScrollBy( step); }   /* ← 読みすすめる */
    if(e.key==="ArrowRight"){ e.preventDefault(); rdScrollBy(-step); }
  }
});


/* ==========================================================
   COUNTDOWN
   ========================================================== */
(function countdown(){
  const el = document.getElementById("countdown");
  const days = Array.from(document.querySelectorAll(".js-days"));
  const end = new Date(CONFIG.deadline).getTime();
  const d = new Date(CONFIG.deadline);
  document.getElementById("deadlineBig").textContent = `${d.getFullYear()}.${pad2(d.getMonth()+1)}.${pad2(d.getDate())}`;
  const tick=()=>{
    const r = end - Date.now();
    if(r<=0){ el.textContent="募集は終了しました"; days.forEach(x=>x.textContent="受付終了"); return; }
    const dd=Math.floor(r/864e5), hh=Math.floor(r%864e5/36e5), mm=Math.floor(r%36e5/6e4), ss=Math.floor(r%6e4/1e3);
    el.textContent = `${dd}日 ${pad2(hh)}:${pad2(mm)}:${pad2(ss)}`;
    days.forEach(x=>x.textContent = `あと ${dd} 日`);
  };
  tick(); setInterval(tick,1000);
})();
document.getElementById("entryBtn").href = CONFIG.formUrl;
document.getElementById("menuEntry").href = CONFIG.formUrl;

/* ==========================================================
   PETALS — 呼び出し口（モジュール側で実装を差し込む）
   ========================================================== */
let petalsSetColor = ()=>{}, petalsAlpha = ()=>{}, petalsMouse = ()=>{};
window.__petalsBind = (api)=>{
  petalsSetColor=api.setColor; petalsAlpha=api.setAlpha; petalsMouse=api.setMouse;
  paintPetals(true);
};

/* ==========================================================
   THEME — 昼と夜
   ----------------------------------------------------------
   ヘッダーの ☀ / ☾ で切り替えます。選んだ状態は localStorage に残り、
   一度も選んでいないあいだは OS の配色設定に従います。
   （HTML 冒頭の小さなスクリプトが、描画前に data-theme を立てています）
   ========================================================== */
const TH_KEY = "oshiete.theme";
const themeBtn = document.getElementById("themeBtn");
const darkMQ = matchMedia("(prefers-color-scheme:dark)");

function isDark(){
  const t = document.documentElement.getAttribute("data-theme");
  return t ? t === "dark" : darkMQ.matches;
}
/* 浮いている紙片・コイン・星の色。作品の色と、いまの配色から決めます。 */
function paintPetals(instant){
  const dark = isDark();
  if(articleOpen){
    /* 作品ページでは、読みものの邪魔をしないよう紙の色に落とします */
    petalsSetColor(dark ? "#56534e" : "#e6e4de", dark ? "#35332f" : "#c9c6bf", instant);
    return;
  }
  const w = WORKS[Math.max(current,0)];
  if(!w) return;
  petalsSetColor(dark ? w.lift : w.c1, dark ? lift(w.c2) : w.c2, instant);
}
let themeTimer;
function applyTheme(mode, save, soft){
  const root = document.documentElement;
  /* 切り替えの瞬間だけ .is-theming を付けて、地色や文字色をゆっくり移します */
  if(soft){
    root.classList.add("is-theming");
    clearTimeout(themeTimer);
    themeTimer = setTimeout(()=>root.classList.remove("is-theming"), 750);
  }
  if(mode) root.setAttribute("data-theme", mode);
  const dark = isDark();
  if(themeBtn) themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute("content", dark ? "#1e1d1c" : "#e2e0da");
  if(save && mode){ try{ localStorage.setItem(TH_KEY, mode); }catch(e){} }
  paintPetals(false);   /* 紙片の色は three.js 側で1.4秒かけて移ります */
}
if(themeBtn) themeBtn.addEventListener("click",()=>applyTheme(isDark() ? "light" : "dark", true, true));
if(darkMQ.addEventListener) darkMQ.addEventListener("change",()=>{
  if(!document.documentElement.getAttribute("data-theme")) applyTheme(null,false,true);
});

/* ==========================================================
   INIT
   ========================================================== */
function init(){
  applyTheme(null,false);
  if(isTouch){
    const hint = document.querySelector(".gallery__hint");
    if(hint) hint.textContent = "swipe →";
    const ast = document.querySelector(".hero__meta .ast");
    if(ast) ast.textContent = "← SWIPE →";
  }
  buildNav(); buildBlinds(); buildDeck(); buildMenu(); applyReader(false);
  rowA.innerHTML = rowHTML(WORKS[0].word); rowB.innerHTML = rowHTML(WORKS[0].word);
  setWord(0,true); measureRow();
  setupHero(); setupGallery();
  gsap.ticker.add(tickMarquee);
  window.addEventListener("resize",()=>{ measureRow(); });

  const h = location.hash.replace("#","");
  const idx = WORKS.findIndex(w=>w.slug===h);

  const loader = document.getElementById("loader");
  const tl = gsap.timeline({onComplete:()=>{
    loader.remove();
    if(idx>=0) openArticle(idx, innerWidth/2, innerHeight/2, true);
  }});
  tl.to(".loader__word span",{y:0,duration:1,ease:"expo.out",delay:.15})
    .to(".loader__sub",{opacity:1,duration:.6},"-=.5")
    .to(loader,{yPercent:-100,duration:1,ease:"expo.inOut",delay:.35})
    .from(".marquee__row.a",{yPercent:30,opacity:0,duration:1.1,ease:"expo.out"},"-=.55")
    .from(".hero__meta, .discover, .hnav",{y:20,opacity:0,duration:.9,stagger:.08,ease:"expo.out"},"-=.9");
}
/* 書体の読み込みを待ってから始めます。ただし待ちすぎません。
   読み込みの返事が来ないときでも、2秒で始めます。
   万一 init の途中で失敗しても、ローダーだけは必ず取り除きます。
   （ローダーが出たままだと、画面が真っ暗のまま動かなくなるためです） */
(function start(){
  let started = false;
  const go = ()=>{
    if(started) return;
    started = true;
    window.__oshieteStarted = true;
    try{
      init();
    }catch(err){
      console.error("[oshiete] 起動に失敗しました:", err);
      const l = document.getElementById("loader");
      if(l) l.remove();
      document.body.classList.remove("is-locked");
    }
  };
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(go, go);
  setTimeout(go, 2000);
})();
