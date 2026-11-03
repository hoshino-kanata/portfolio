/* ==========================================================
   教えて神父さま — script
   星乃かなた ファンアート投稿企画
   ----------------------------------------------------------
   ■ さわるのはここだけ ■
     CONFIG … フォームURL・次回募集予定・works フォルダ
     WORKS  … 作品の一覧（足すだけで何件でも増やせます）
   ========================================================== */
/* ==========================================================
   CONFIG — ここだけ編集すれば内容を差し替えられます
   ========================================================== */
const CONFIG = {
  year: 2026,        // 毎年の開催年。各所の年表示にも反映されます。
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSecEi_kETOx-2K_jrQTT0UA3ZGwQBZcJZ4kcvjusBG0qpHvPw/viewform?usp=header",      // ← Googleフォームの URL
  nextRecruitment: "2027-07-07T00:00:00+09:00", // 次回募集予定。受付は継続します。
  deadline: "2027-07-06T23:59:59+09:00", // Aboutのカウントダウン（日本時間の当日終了まで）
  heroMax: 10,        // トップで巡回する作品の数（先頭から。増えても長くなりすぎません）
  worksDir: "assets/works/", // 画像・本文。index.htmlを基準にした保存先
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

   ファイルはすべて assets/works/ フォルダに置きます。WORKSのファイル名はこのフォルダからの相対パスです。
   "w04.png" のようにファイル名だけ書けば assets/works/w04.png として扱われます。

   読み物は type が2つありますが、中身の扱いは同じです。
   どちらも assets/works/ の .txt を読み、文字の大きさと縦横を変えられます。
   違うのはカードに出る呼び名（言葉／小説）だけです。

   type:'text'   … 言葉として並べる             file:"prayer.txt"  → assets/works/prayer.txt
   type:'novel'  … 小説として並べる             file:"w03.txt"     → assets/works/w03.txt
                     どちらも text:"本文を直接..." と書くこともできます
   type:'image'  … 1枚絵                        src:"w04.png"      → assets/works/w04.png
   type:'manga'  … まんがビューアで読む
                     count:12                  → assets/works/<id>/001.png 〜 012.png
                     ・id が w005 なら assets/works/w005/001.png … になります
                     ・ext:".jpg" で拡張子、from:0 で 000.png はじまり
                     ・pages:["w005/hyoshi.png", …] と1枚ずつ指定することもできます

   本文の記法（青空文庫・カクヨム互換）
     ルビ   ｜言葉《ことば》 / 漢字《かんじ》
     傍点   《《ここに傍点》》
     区切り 　＊ や □ だけの行
     挿絵   ［画像：e01.png］          → assets/works/e01.png
            ［画像：e01.png｜添え書き］ → 下（縦書きなら左）に小さな字で添え書き
   ========================================================== */
const WORKS = [
  // 00は企画側の紹介文。01以降が寄せられた作品です。
  { id:"w00", no:"00", type:"guide",
    word:"WORLD", title:"世界観", ja:"魔教会の住人と用語集",
    author:"教えて神父さま", c1:"#9da2cc", c2:"#6f74a4", motif:"arch" },

  { id:"w01", no:"01", type:"novel", file:"marriage.txt",
    word:"VOW", title:"幸せな結婚", ja:"",
    author:"星乃かなた", c1:"#b39a50", c2:"#846f31", motif:"halo" },

  { id:"w02", no:"02", type:"manga", count:16, ext:".webp", cover:true, rtl:true,
    src:"w02/001.webp", word:"LAW", title:"天使の法則", ja:"",
    author:"サンダ・Ｖ・ライゼ", x:"https://x.com/Raize_sanda", c1:"#8faa90", c2:"#5e7a61", motif:"star" },

  { id:"w03", no:"03", type:"novel", file:"locked-room.txt",
    word:"CHAMBER", title:"密室", ja:"",
    author:"緋月れん", x:"https://x.com/hidukirench", c1:"#986fa0", c2:"#6d4a76", motif:"grid" },

  { id:"w04", no:"04", type:"novel", file:"unanswered.txt",
    word:"THE UNANSWERED", title:"神さまは、教えてくれない", ja:"",
    author:"黒紫館幽火", x:"https://x.com/kokushikanyuuhi", c1:"#7d7a92", c2:"#565469", motif:"moon" },

  { id:"w05", no:"05", type:"manga", count:7, ext:".webp", cover:true, rtl:true,
    src:"w05/001.webp", word:"VEIL", title:"無題", ja:"",
    author:"藤ヶ崎カトリーヌ", x:"https://x.com/hujigasaki_C", c1:"#ba6a87", c2:"#8a475f", motif:"rose" },

  { id:"w06", no:"06", hero:false, type:"image", src:"w06/collaboration-01.webp",
    word:"BUBBLE", title:"無題", ja:"",
    author:"へいわ・おばけ・碌々",
    credits:[{role:"ラフ",name:"へいわ"},{role:"線画",name:"おばけ"},{role:"色塗り",name:"碌々"}],
    c1:"#8faeb7", c2:"#607d88", motif:"drop" },

  { id:"w07", no:"07", hero:false, type:"image", src:"w07/collaboration-02.webp",
    word:"REVERIE", title:"無題", ja:"",
    author:"おばけ・碌々・へいわ",
    credits:[{role:"ラフ",name:"おばけ"},{role:"線画",name:"碌々"},{role:"色塗り",name:"へいわ"}],
    c1:"#a68aab", c2:"#755a7c", motif:"moon" },

  { id:"w08", no:"08", hero:false, type:"image", src:"w08/marlboro.webp",
    word:"HEART", title:"", titleless:true, ja:"",
    author:"マルボロ", x:"https://x.com/marlboooro_rntm",
    c1:"#c38e8c", c2:"#8c6268", motif:"rose" },
];

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
const workNo = (w,i)=>String(w.no == null ? pad2(i) : w.no);
const workCaption = (w,i)=>[workNo(w,i),w.title].filter(Boolean).join(" — ");
const workAlt = w=>w.title || `${w.author}のイラスト`;
/* assets/works/ を自動で補います（"/" や "http" で始まるものはそのまま） */
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
const KIND = { guide:"GUIDE", text:"WORDS", image:"ILLUST", manga:"MANGA", novel:"NOVEL" };
/* 言葉も小説も、中身は同じ「読み物」です */
const isReading = w => w.type === "text" || w.type === "novel";
const KIND_JA = { guide:"人物・舞台紹介", text:"言葉", image:"イラスト", manga:"まんが", novel:"小説" };

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
  w.title = w.titleless ? "" : (w.title || w.word || ("作品 "+pad2(i+1)));
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
/* まんがのページ一覧をつくる： assets/works/<id>/001.png 002.png … */
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

/* 挿絵の行  ［画像：e01.png］ / ［画像：e01.png｜添え書き］
   半角の [画像:e01.png] や [img:e01.png] でも同じように書けます。 */
const IMG_LINE = /^[\s　]*[［\[]\s*(?:画像|挿絵|image|img)\s*[：:]\s*([^］\]]+?)\s*[］\]][\s　]*$/;
function figureHTML(spec){
  const value = String(spec), divider = value.search(/[｜|]/);
  const file = divider < 0 ? value : value.slice(0, divider);
  const cap = divider < 0 ? "" : value.slice(divider + 1);
  const src = asset(String(file).trim());
  const caption = (cap || "").trim();
  return '<figure class="rdfig">'
       + `<img src="${esc(src)}" alt="${esc(caption)}" loading="lazy" onerror="this.closest('figure').classList.add('is-missing')">`
       + (caption ? `<figcaption>${inlineMarkup(caption)}</figcaption>` : "")
       + '</figure>';
}

/* 本文を組む（ルビ・傍点・区切り・挿絵） */
const RB_BASE = "[\\p{Script=Han}々〇〻〆ァ-ヺー]";
/* 原文をひとつずつ読むので、生成した ruby / em の HTML を再変換しません。
   ｜と半角 | のどちらも使えます。漢字の直後なら開始記号を省略できます。 */
const INLINE_TOKEN = new RegExp(
  "《《([^《》\\n]+)》》"
  + "|[｜|]([^｜|《》\\n]+)《([^《》\\n]+)》"
  + "|(" + RB_BASE + "+)《([^《》\\n]+)》"
  + "|［＃[^］\\n]*］", "gu"
);
function rubyHTML(base, reading){
  return "<ruby>" + esc(base) + "<rp>（</rp><rt>" + esc(reading)
       + "</rt><rp>）</rp></ruby>";
}
function inlineMarkup(line){
  const source = String(line == null ? "" : line);
  let html = "", at = 0;
  for(const token of source.matchAll(INLINE_TOKEN)){
    html += esc(source.slice(at, token.index));
    const [, emphasis, explicitBase, explicitReading, implicitBase, implicitReading] = token;
    if(emphasis !== undefined) html += '<em class="bou">' + esc(emphasis) + '</em>';
    else if(explicitBase !== undefined) html += rubyHTML(explicitBase, explicitReading);
    else if(implicitBase !== undefined) html += rubyHTML(implicitBase, implicitReading);
    /* 青空文庫の組版注記（［＃…］）は、従来どおり本文に表示しません。 */
    at = token.index + token[0].length;
  }
  return html + esc(source.slice(at));
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
/* 投稿作品は hero:false。棚とメニューには全件を残します。 */
const HERO_INDICES = WORKS.map((w,i)=>w.hero===false ? -1 : i).filter(i=>i>=0).slice(0,CONFIG.heroMax);
const HERO_N = HERO_INDICES.length;
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
const stampSVG = ()=>`<svg class="card__stamp" viewBox="0 0 60 60"><defs><path id="stp" d="M30 30m-21 0a21 21 0 1 1 42 0a21 21 0 1 1-42 0"/></defs><circle cx="30" cy="30" r="27"/><circle cx="30" cy="30" r="14"/><text><textPath href="#stp">OSHIETE · SHINPU · SAMA · ${esc(CONFIG.year)} ·</textPath></text></svg>`;
const rowHTML = (word,n=6)=>Array.from({length:n},()=>`<span>${esc(word)}</span><span class="sep">✦</span>`).join("");
const authorHTML = w => w.x
  ? `<a class="author-link" data-author-link href="${esc(w.x)}" target="_blank" rel="noopener noreferrer">${esc(w.author)}</a>`
  : esc(w.author);
/* 画像があれば画像、無ければモチーフ */
function workCropHTML(w){
  const c=w.crop;
  return `<span class="work-crop"><span class="work-crop__window" style="aspect-ratio:${c.width}/${c.height}"><img src="${esc(w.src)}" alt="${esc(workAlt(w))}" loading="lazy" style="width:${c.sourceWidth/c.width*100}%;height:${c.sourceHeight/c.height*100}%;left:${-c.x/c.width*100}%;top:${-c.y/c.height*100}%"></span></span>`;
}
const thumbHTML = w => w.src
  ? `${motifSVG(w)}${w.crop ? workCropHTML(w) : `<img src="${esc(w.src)}" alt="${esc(workAlt(w))}" loading="lazy" onerror="this.remove()">`}`
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
  hnav.innerHTML = `<span class="track"></span>` + HERO_INDICES.map((index,pos)=>{ const w=WORKS[index]; return `<button data-i="${index}" data-hero="${pos}" aria-label="${esc(w.title)}">${esc(workNo(w,index))}</button>`; }).join("");
  hnav.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>scrollToWord(+b.dataset.hero)));
}
function measureRow(){
  const first = rows.front.querySelector("span"), sep = rows.front.querySelector(".sep");
  if(!first||!sep) return;
  marqWidth = first.getBoundingClientRect().width + sep.getBoundingClientRect().width + parseFloat(getComputedStyle(sep).marginLeft)*2;
}
function setWord(i, instant=false){
  const index=HERO_INDICES[i];
  if(index==null || index===current) return;
  const w = WORKS[index]; const dir = i>HERO_INDICES.indexOf(current) ? 1 : -1;
  current = index;
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
  swapText(metaWord, esc(workCaption(w,index)));
  swapText(metaBy,   `${KIND[w.type]} / ${authorHTML(w)}`);
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
        if(HERO_INDICES[idx]!==current) setWord(idx);
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
    const next = clamp(HERO_INDICES.indexOf(current) + (dx < 0 ? 1 : -1), 0, HERO_N - 1);
    if(HERO_INDICES[next] !== current) setWord(next);
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
  const galleryOrder = ensureOrder().filter(idx=>WORKS[idx].type!=="guide");
  deck.innerHTML = galleryOrder.map((idx,pos)=>{ const w = WORKS[idx]; return `
    <article class="card" style="--i:${pos};--r:${(Math.random()*6-3).toFixed(2)};--c1:${w.sky};--c2:#f1efe8" data-i="${idx}">
      <div class="card__tilt">
        <div class="card__paper">
          <div class="card__img">${thumbHTML(w)}<span class="card__kind">${KIND[w.type]}</span>${stampSVG()}</div>
          <div class="card__label"${w.wordIsJa?' style="font-family:var(--mincho);font-size:19px"':""}>${esc(w.word)}</div>
        </div>
      </div>
      <p class="card__ja">${esc(workCaption(w,idx))}</p>
      <div class="card__by">by ${authorHTML(w)}</div>
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
    card.addEventListener("click",e=>{
      if(e.target.closest && e.target.closest("[data-author-link]")) return;
      openArticle(+card.dataset.i, e.clientX, e.clientY);
    });
  });
  document.getElementById("galleryCount").textContent = pad2(galleryOrder.length);
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
  const getDist = ()=>Math.max(0,deck.scrollWidth-window.innerWidth);
  const canPin = matchMedia("(min-width:821px) and (min-height:1080px)");
  let movement = null, resizeTimer = 0;

  const sync = ()=>{
    const overflows = getDist()>1;
    document.querySelector(".gallery__hint").hidden = !overflows;
    const pinned = canPin.matches && overflows;
    if(pinned === Boolean(movement)) return;
    if(movement){
      movement.scrollTrigger.kill();
      movement.kill();
      movement = null;
      gsap.set(deck,{clearProps:"transform"});
    }
    if(pinned){
      movement = gsap.to(deck,{
        x:()=>-getDist(), ease:"none",
        scrollTrigger:{
          trigger:"#gallery", start:"top top", end:()=>"+="+getDist()*1.1,
          pin:true, scrub:1, invalidateOnRefresh:true,
          onUpdate(self){
            const v = gsap.utils.clamp(-8,8,self.getVelocity()/220);
            gsap.to(".card__paper",{skewX:-v,duration:.6,ease:"power2.out",overwrite:"auto"});
          }
        }
      });
    }
    ScrollTrigger.refresh();
  };
  sync();
  /* 画面が低いときは上下2段を縦に読み進め、列はCSSの横送りで確認します。
     ヒーローの配列切り替えが終わってから、横送りの固定を切り替えます。 */
  window.addEventListener("resize",()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sync,120);
  });
}

/* ==========================================================
   MENU
   ========================================================== */
const menu = document.getElementById("menu"), burger = document.getElementById("burger");
const header = document.getElementById("header");
let menuOpen = false;
let menuArticleTimer = 0;

function buildMenu(){
  const menuOrder = WORKS.map((w,idx)=>idx).sort((a,b)=>
    workNo(WORKS[a],a).localeCompare(workNo(WORKS[b],b), "ja", {numeric:true})
  );
  document.getElementById("menuGrid").innerHTML = menuOrder.map(idx=>{ const w = WORKS[idx]; return `
    <div class="mcard" data-i="${idx}" style="--c1:${w.sky};--c2:#f1efe8">
      <button class="mcard__open" type="button" data-i="${idx}" aria-label="${esc(workNo(w,idx))} ${esc(workAlt(w))} を開く">
      <span class="mcard__img">${thumbHTML(w)}<span class="mcard__kind">${KIND[w.type]}</span></span>
      <span class="mcard__label"${w.wordIsJa?' style="font-family:var(--mincho);font-size:13px"':""}>${esc(w.word)}</span>
      <span class="mcard__title">${esc(workCaption(w,idx))}</span>
      </button>
      <span class="mcard__by">${authorHTML(w)} · ${KIND_JA[w.type]}</span>
    </div>`; }).join("");
  document.getElementById("menuCount").textContent = pad2(WORKS.length) + " ENTRIES";
  document.getElementById("menuGrid").querySelectorAll(".mcard__open").forEach(b=>{
    b.addEventListener("click",()=>{
      const i = +b.dataset.i;
      toggleMenu(false);
      const r = b.getBoundingClientRect();
      clearTimeout(menuArticleTimer);
      menuArticleTimer = setTimeout(()=>{
        menuArticleTimer = 0;
        openArticle(i, r.left+r.width/2, r.top+r.height/2);
      }, 460);
    });
  });
}
function toggleMenu(force){
  gsap.killTweensOf(menu);
  menuOpen = force ?? !menuOpen;
  burger.classList.toggle("is-open",menuOpen);
  header.classList.toggle("is-menu",menuOpen);
  menu.setAttribute("aria-hidden",!menuOpen);
  if(menuOpen){
    clearTimeout(menuArticleTimer);
    menu.classList.add("is-open");
    gsap.to(menu,{clipPath:"inset(0 0 0% 0)",duration:.9,ease:"expo.inOut"});
    gsap.fromTo(".menu__side > *",{y:30,opacity:0},{y:0,opacity:1,duration:.8,stagger:.06,delay:.3,ease:"expo.out"});
    gsap.fromTo(".menu__gal",{y:24,opacity:0},{y:0,opacity:1,duration:.8,delay:.36,ease:"expo.out"});
  }else{
    gsap.to(menu,{clipPath:"inset(0 0 100% 0)",duration:.8,ease:"expo.inOut",onComplete:()=>{ if(!menuOpen) menu.classList.remove("is-open"); }});
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
let articleTransition = 0;
function cancelArticleTransition(){
  articleTransition++;
  gsap.killTweensOf(article);
  gsap.killTweensOf(artMotif);
  return articleTransition;
}

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

/* ポインター・指・キーボードで、光の位置だけを動かします。
   2枚の画像を含む .priest-lantern があるときだけ初期化します。 */
function setupPriestLantern(guide){
  const lamp = guide.querySelector(".priest-lantern");
  if(!lamp) return;
  let px = .5, py = .42;
  const active = on=>{ lamp.dataset.beamActive = String(on); };
  const paint = ()=>{
    lamp.style.setProperty("--beam-x", (px * 100).toFixed(2) + "%");
    lamp.style.setProperty("--beam-y", (py * 100).toFixed(2) + "%");
  };
  const point = e=>{
    const r = lamp.getBoundingClientRect();
    if(!r.width || !r.height) return;
    px = clamp((e.clientX - r.left) / r.width, 0, 1);
    py = clamp((e.clientY - r.top) / r.height, 0, 1);
    paint(); active(true);
  };
  lamp.addEventListener("pointerenter", e=>{ if(e.pointerType!=="touch") point(e); });
  lamp.addEventListener("pointermove", point);
  lamp.addEventListener("pointerdown", point);
  ["pointerleave", "pointercancel", "blur"].forEach(type=>lamp.addEventListener(type, ()=>active(false)));
  lamp.addEventListener("pointerup", e=>{ if(e.pointerType!=="mouse") active(false); });
  lamp.addEventListener("focus", ()=>{ paint(); active(true); });
  lamp.addEventListener("keydown", e=>{
    if(e.key==="Escape") { e.preventDefault(); e.stopPropagation(); active(false); return; }
    if(e.key===" " || e.key==="Enter") {
      e.preventDefault(); active(lamp.dataset.beamActive!=="true"); return;
    }
    if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) return;
    e.preventDefault(); e.stopPropagation();
    const step = e.shiftKey ? .02 : .08;
    if(e.key==="ArrowLeft") px-=step;
    if(e.key==="ArrowRight") px+=step;
    if(e.key==="ArrowUp") py-=step;
    if(e.key==="ArrowDown") py+=step;
    px=clamp(px,0,1); py=clamp(py,0,1);
    paint(); active(true);
  });
  paint(); active(false);
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
    artMotif.innerHTML = w.crop ? workCropHTML(w) : `<img src="${esc(w.src)}" alt="${esc(workAlt(w))}">`;
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
  const credits = Array.isArray(w.credits)
    ? w.credits.filter(credit=>credit && credit.role && credit.name) : [];
  const byline = credits.length ? "合作"
    : (w.x ? `<a href="${esc(w.x)}" target="_blank" rel="noopener">by ${esc(w.author)}</a>` : `by ${esc(w.author)}`);
  const creditHTML = credits.length
    ? `<span class="article__credits" role="group" aria-label="制作担当">${credits.map(credit=>
        `<span class="article__credit"><span class="article__credit-role">${esc(credit.role)}</span><span class="article__credit-name">${esc(credit.name)}</span></span>`
      ).join("")}</span>` : "";
  document.getElementById("artSub").innerHTML =
    [ esc(w.ja).replace("\n","<br>"),
      `${KIND_JA[w.type]}<span class="dot">·</span>${byline}` +
      (w.date ? `<span class="dot">·</span>${esc(w.date)}` : ""),
      creditHTML
    ].filter(Boolean).join("<br>");
  document.getElementById("artChapter").innerHTML = `No. ${esc(workNo(w,i))}` + (w.title ? ` <i></i> ${esc(w.title)}` : "");

  /* 種別ごとの本体。
     言葉（text）も小説（novel）も、同じ読み物として同じ組みで出します。 */
  article.classList.toggle("is-novel", isReading(w));
  article.classList.toggle("is-manga", w.type==="manga");
  article.classList.toggle("is-guide", w.type==="guide");
  const guide = document.getElementById("artGuide");
  guide.hidden = (w.type!=="guide");
  guide.replaceChildren();
  artPic.hidden = (w.type!=="image");
  artPic.innerHTML = "";

  if(w.type==="guide"){
    guide.append(document.getElementById("guideTemplate").content.cloneNode(true));
    guide.querySelectorAll("[data-guide-src]").forEach(img=>{
      img.src = asset(img.dataset.guideSrc);
    });
    setupPriestLantern(guide);
  }else if(isReading(w)){
    openNovel(w);
  }else if(w.type==="image"){
    artPic.innerHTML = `<img src="${esc(w.src)}" alt="${esc(workAlt(w))} / ${esc(w.author)}">`;
  }else if(w.type==="manga"){
    openManga(w);
  }

  const next = document.getElementById("artNext");
  next.querySelector("b").textContent = nx.word;
  next.querySelector("b").style.fontFamily = nx.wordIsJa ? "var(--mincho)" : "";
  document.title = `${workAlt(w)} — 教えて神父さま`;
}

function openArticle(i, x=innerWidth/2, y=innerHeight/2, instant=false){
  clearTimeout(menuArticleTimer);
  cancelArticleTransition();
  gsap.set(article,{opacity:1});
  gsap.set(artMotif,{opacity:1,scale:1,rotate:0});
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
  paintPetals(instant);
  if(instant){ gsap.set(article,{clipPath:`circle(160vmax at ${x}px ${y}px)`}); }
  else{
    gsap.fromTo(article,{clipPath:`circle(0px at ${x}px ${y}px)`},{clipPath:`circle(160vmax at ${x}px ${y}px)`,duration:1.3,ease:"expo.inOut"});
    gsap.fromTo("#artMotif",{scale:.5,rotate:-12,opacity:0},{scale:1,rotate:0,opacity:1,duration:1.4,delay:.45,ease:"expo.out"});
  }
}
function closeArticle(animate=true){
  clearTimeout(menuArticleTimer);
  if(!articleOpen) return;
  const transition = cancelArticleTransition();
  articleOpen=false;
  header.classList.remove("is-article","is-deep");
  history.replaceState(null,"","#");
  document.title = "教えて神父さま — 星乃かなた ファンアート企画";
  const w = WORKS[Math.max(current,0)];
  applyAccent(w); paintPetals(false);
  const done=()=>{
    if(transition!==articleTransition || articleOpen) return;
    article.classList.remove("is-open","is-reading","is-novel","is-manga","is-guide","is-mg-vertical");
    article.setAttribute("aria-hidden","true");
    document.body.classList.remove("is-locked");
    ScrollTrigger.refresh();
  };
  if(animate) gsap.to(article,{clipPath:`circle(0px at 50% 50%)`,duration:.9,ease:"expo.inOut",onComplete:done});
  else { gsap.set(article,{clipPath:`circle(0px at 50% 50%)`}); done(); }
}
document.getElementById("artClose").addEventListener("click",()=>closeArticle());
document.getElementById("artBack").addEventListener("click",()=>{ closeArticle(); setTimeout(()=>scrollToEl("gallery"),900); });
document.getElementById("artNext").addEventListener("click",e=>{
  e.preventDefault();
  if(!articleOpen) return;
  const transition = cancelArticleTransition();
  const nx = nextIndex(articleIdx);
  gsap.to(article,{opacity:0,duration:.4,onComplete:()=>{
    if(transition!==articleTransition || !articleOpen) return;
    fillArticle(nx);
    article.scrollTop=0; setIris(0);
    article.classList.remove("is-reading");
    gsap.set(article,{clipPath:"circle(160vmax at 50% 50%)"});
    history.replaceState(null,"","#"+WORKS[nx].slug);
    gsap.fromTo("#artMotif",{scale:.6,opacity:0},{scale:1,opacity:1,duration:1.2,ease:"expo.out"});
    gsap.to(article,{opacity:1,duration:.6});
  }});
});
window.addEventListener("keydown",e=>{ if(e.key==="Escape"){ clearTimeout(menuArticleTimer); if(menuOpen) toggleMenu(false); else if(articleOpen) closeArticle(); }});

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

/* 未登録の本文や読み込みエラーは、別ファイルを使わず案内を表示します。 */
const NOVEL_CACHE = {};

function fetchText(file){
  if(NOVEL_CACHE[file]) return Promise.resolve(NOVEL_CACHE[file]);
  /* file: では fetch() でTXTを読めないため、同梱の本文データを使います。
     HTTP(S)配信では常にTXTを読み、編集内容がすぐ反映されるようにします。 */
  if(location.protocol === "file:"){
    const local = window.OSHIETE_LOCAL_TEXTS;
    const key = String(file).replace(/^\.\//, "");
    if(local && Object.prototype.hasOwnProperty.call(local, key)){
      NOVEL_CACHE[file] = buildNovel(local[key]);
      return Promise.resolve(NOVEL_CACHE[file]);
    }
    return Promise.reject(new Error("同梱本文データが見つかりません: " + key));
  }
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
  /* 本文がないときの案内。通信失敗時はエラーを明示します。 */
  const fallback = err=>{
    const fb = inline();
    if(fb){ done(fb); return; }
    if(err){
      const message = location.protocol === "file:"
        ? "本文データを読み込めませんでした。ZIPをすべて解凍してから開き直してください。"
        : "本文を読み込めませんでした。ページを再読み込みしてください。";
      done('<p class="wait" role="alert">'+message+'</p>');
      return;
    }
    done('<p class="wait">本文は準備中です。</p>');
  };

  if(!w.file){ fallback(); return; }

  if(NOVEL_CACHE[w.file]){ done(NOVEL_CACHE[w.file]); return; }
  rdText.innerHTML = '<p class="wait">読み込んでいます…</p>';
  fetchText(w.file).then(done).catch(err=>{
    console.warn("[oshiete] 本文を読み込めませんでした:", w.file, err);
    fallback(err);
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
  /* どの漫画も最初は表紙の1ページだけ。その後を2–3、4–5…と組みます。 */
  mgSpreads.push([0]);
  for(let i=1; i<n; i+=2) mgSpreads.push(i+1<n ? [i,i+1] : [i]);
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
   ENTRY STATUS — 次の募集まで、作品の受付を継続します。
   ========================================================== */
(function recruitmentStatus(){
  document.querySelectorAll(".js-days, [data-entry-status]").forEach(el=>{
    el.textContent = "作品募集中";
  });
  const next = document.getElementById("nextRecruitmentDate");
  if(next){
    const date = String(CONFIG.nextRecruitment).slice(0, 10);
    next.textContent = date.replace(/-/g, ".");
    next.setAttribute("datetime", date);
  }
  const deadlineDate = document.getElementById("entryDeadlineDate");
  if(deadlineDate){
    const date = String(CONFIG.deadline).slice(0, 10);
    deadlineDate.textContent = date.replace(/-/g, ".");
    deadlineDate.setAttribute("datetime", date);
  }
  const countdown = document.getElementById("countdown");
  if(countdown){
    const end = Date.parse(CONFIG.deadline);
    const tick = ()=>{
      const total = Number.isFinite(end) ? Math.max(0, Math.floor((end - Date.now()) / 1000)) : 0;
      const days = Math.floor(total / 86400);
      const hours = Math.floor(total % 86400 / 3600);
      const minutes = Math.floor(total % 3600 / 60);
      const seconds = total % 60;
      countdown.textContent = `残り ${days}日 ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
    };
    tick();
    setInterval(tick, 1000);
  }
})();
document.querySelectorAll("[data-project-year]").forEach(el=>el.textContent = CONFIG.year);
document.getElementById("entryBtn").href = CONFIG.formUrl;
document.getElementById("menuEntry").href = CONFIG.formUrl;

/* ==========================================================
   PETALS — 呼び出し口（モジュール側で実装を差し込む）
   ========================================================== */
let petalsSetColor = ()=>{}, petalsMouse = ()=>{};
window.__petalsBind = (api)=>{
  petalsSetColor=api.setColor; petalsMouse=api.setMouse;
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
  rowA.innerHTML = rowHTML(WORKS[HERO_INDICES[0]].word); rowB.innerHTML = rowHTML(WORKS[HERO_INDICES[0]].word);
  setWord(0,true); measureRow();
  setupHero(); setupGallery();
  gsap.ticker.add(tickMarquee);
  window.addEventListener("resize",()=>{ measureRow(); });

  const h = location.hash.replace("#","");
  const idx = WORKS.findIndex(w=>w.slug===h);

  const loader = document.getElementById("loader");
  const tl = gsap.timeline({onComplete:()=>{
    if(loader) loader.remove();
    if(idx>=0) openArticle(idx, innerWidth/2, innerHeight/2, true);
  }});
  if(loader){
    tl.to(".loader__word span",{y:0,duration:1,ease:"expo.out",delay:.15})
      .to(".loader__sub",{opacity:1,duration:.6},"-=.5")
      .to(loader,{yPercent:-100,duration:1,ease:"expo.inOut",delay:.35});
  }
  tl.from(".marquee__row.a",{yPercent:30,opacity:0,duration:1.1,ease:"expo.out"},loader ? "-=.55" : 0)
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


/* ==========================================================
   作品の保存・コピー抑止
   ========================================================== */
/*
 * 作品を気軽に保存・コピーする操作を抑止します。
 * 公開データの取得やスクリーンショットを完全に防ぐ仕組みではありません。
 * リンク・フォーム・ビューア操作と、読み上げ用の本文は維持します。
 */
(() => {
  "use strict";

  const TEXT = "#rdText, #artGuide .guide__copy, #artGuide .guide__glossary";
  const PROTECTED = `img, ${TEXT}`;
  const EDITABLE = "input, textarea, [contenteditable]:not([contenteditable='false'])";
  const LINK = "a[href]";

  function elementAt(target) {
    return target instanceof Element ? target : target && target.parentElement;
  }

  function isProtectedTarget(target) {
    const element = elementAt(target);
    return !!element && !element.closest(`${EDITABLE}, ${LINK}`)
      && !!element.closest(PROTECTED);
  }

  function protectEvent(event) {
    if(isProtectedTarget(event.target)) event.preventDefault();
  }

  document.addEventListener("contextmenu", protectEvent);
  document.addEventListener("dragstart", protectEvent);
  document.addEventListener("selectstart", protectEvent);
  document.addEventListener("copy", event => {
    const target = elementAt(event.target);
    if(target && target.closest(`${EDITABLE}, ${LINK}`)) return;
    if(isProtectedTarget(event.target)) {
      event.preventDefault();
      return;
    }
    /* copy は body に届くこともあるため、選択範囲も確認します。 */
    const selection = window.getSelection();
    if(!selection || !selection.rangeCount || selection.isCollapsed) return;
    const texts = document.querySelectorAll(TEXT);
    for(let i=0; i<selection.rangeCount; i++) {
      const range = selection.getRangeAt(i);
      if(Array.from(texts).some(text => range.intersectsNode(text))) {
        event.preventDefault();
        return;
      }
    }
  });
})();


/* HTTP配信時のみ、ヒーローの3D装飾を読み込みます。 */
if(location.protocol === "http:" || location.protocol === "https:"){
  const petalsScript = document.createElement("script");
  petalsScript.type = "module";
  petalsScript.src = "assets/shinpusama-petal.js";
  document.body.appendChild(petalsScript);
}

// #region ローカル直開き用の本文データ（自動生成・通常は編集不要）
/* BEGIN LOCAL TEXT DATA */
window.OSHIETE_LOCAL_TEXTS={"assets/works/locked-room.txt":"　むせかえるような生臭い匂い。\n　それは世の不快な物を全て集めて煮詰めたような、まるで｜屠殺場《とさつじょう》みたいな匂いだった。\n　この匂いの正体を僕は知っている。\n『かなた……。かなた……』\n　どこかから僕を呼ぶ声が聞こえる。\n　声のした方へと歩いて行くと、そこには大きく古びた扉があった。\n　扉は少しだけ開かれていて、隙間から先ほどの声と腐臭が漏れ出ているのが分かった。\n　この部屋の正体を僕は知っている。\n『かなた……。かなた……』\n　呼ばれるまま、大きな扉を開ける。\n　先ほどまで漂っていた腐臭がひと際強くなった。\n『かなた……。かなた……』\n　声の主を探すように、部屋に視線を｜彷徨《さまよ》わせる。\nそこにはたくさんの少年が横たわっていた。ある者は腕が無くなり、ある者は脚が無くなっている。\nそこに生気がないことは、｜一目瞭然《いちもくりょうぜん》だった。\nそれでも声の主を探す。\n『かなた……。かなた……』\n　ややあって、その声の主は力なく壁にもたれかかった少年のものだとわかった。｜俯《うつむ》いたまま、何度も僕の名前を呼ぶ少年。しばらくして、こちらに気付いたのか少年は顔を上げる。\n『ねぇ、どうして……？』\n　少年は空になった瞳から、赤い涙を流しながら尋ねてきた。\n　　　\n　　　\n密室\n　　　\n　　　\n「……っ!?」\n　布団を投げ出す勢いで飛び起きると、そこにはいつもの日常が広がっていました。\n　本棚と机だけが置かれた殺風景な部屋。カーテンの隙間からは昼下がりの柔らかな光。そして、部屋の外からは少年たちの｜喧噪《けんそう》が聞こえてきます。\n　いつもと変わらない。そう、いつもと何一つ変わらない平和な光景。\n「……はぁ」\n　思わず小さく溜息が漏れてしまう。\n　ほっとしたような、でも、まだ心の奥底がざわついているような。\n　最近いつも同じような夢を見る。\n　地下室のような場所で、力なく横たわる無数の少年の遺体。そして、僕のことを呼ぶ声。\n　思い出すだけで怖くなってくる。\n　あれは現実だったのか、夢だったのか……\n　以前、使い魔に｜唆《そそのか》されて、入ってはいけないと言われていた地下室に忍び込んだことがありました。そこで見たものこそ、夢に出てきた｜凄惨《せいさん》と呼ぶにも生ぬるいほどの光景でした。\n　でも……\n　それ自体がもしかしたら夢だったのかも知れない。\n　あの光景を初めて見た次の日。今度は魔教会の少年たちと一緒に地下室に向かいました。\n　少年たちに見守られながら、地下室の重厚な扉を開く。すると、隙間から漏れ出してくるのは腐臭ではなく、少し湿っぽくてカビ臭いような香りでした。疑問に思いながらさらに扉を開くと、そこには大量の本が詰まった本棚がずらり。\nそんなはずないのに。\n少年たちの亡骸は？　\n鼻を突くような腐臭は？\n思いながら部屋の中をぐるりと見まわしましたが、そこには、そのような｜痕跡《こんせき》は一切ありませんでした。唯一見つけたのは純白のきらりと輝く一つの羽根。それだけがこの世界から切り離されたように、異彩を放っていました。\nその後、やってきた神父様曰く『貴重な本が多いから近づいてはいけないことにした』とのことでしたが、それが真実なのか、｜虚構《きょこう》なのか僕にはわかりません。\n初めて少年の死体が転がる地下室に入ったあの日。その時も神父様はやってきました。その時の神父様は僕の質問に答えることもなく、ただいつも通りの柔和な笑みを浮かべながら、こちらに近づいてくるだけでした。\nそして、神父様が手を伸ばしてくると同時に僕の意識は途切れ、気が付いたら部屋のベッドで横になっていたのでした。\n凄惨な地下室で柔和な笑みを浮かべていた神父様。地下書庫で柔和な笑みを浮かべていた神父様。\n一体どちらが本物なのでしょうか。それともどちらも偽物なのでしょうか……\n今の僕にはその真実を確かめる術がない。\n一緒に地下書庫に忍び込んだ使い魔も、意識が戻った時には姿を消してしまっていました。\n　あの凄惨な光景を見た者は、今はもう僕しかいない。\n　いいえ。もしかしたら本当に夢で、僕すらあの光景は見ていないのかもしれません。\n　もしくは神父様との約束を破り、地下室に忍び込んでしまった僕に対する罰なのかも。\n　いつになったらこの苦しみから解放されるんだろう。僕への罰なのだったら、それはもう仕方のないこと。約束を破ってしまったのは僕なのですから。でも、もしあの部屋が真実だったら……\n心の中が不安と｜焦燥《しょうそう》で渦巻く。\n　頭を抱え｜項垂《うなだ》れていると、扉の外からこちらを呼ぶ声が聞こえてきました。\n「かなたー。まだ寝てるのかぁー？　そろそろご飯の時間だぞー！」\n「う、うん。すぐ行くね！」\n　渦巻く不安を隠すように元気よく答え、僕は廊下へと向かいました。\n\n「かなた最近元気ないなぁー」\n　テーブルの向かい側に座った金髪碧眼の少年。先ほど扉越しに声をかけてきた彼が、朝食のパンを｜齧《かじ》りながら呟く。それに呼応するように、彼の隣に座っていた黒髪の少年も「そうだなぁー」と囁きました。\n「え、そ、そう……かな？」\n　ぎくりと肩が震えてしまう。上手く誤魔化せていたつもりだったけれど、この二人にはとっくにお見通しだったみたい。\n「やっぱりまだご奉仕が上手くいってないのかぁー？」\n「あ、そ、そう……かも」\n　あはは、と再び誤魔化してスープを｜啜《すす》る。\n　この二人はあの部屋のことをただの地下書庫だと思っている。それは一緒に確認しに行ったから確かなはず……\n　もしかしたら……\n　この二人も僕が地下室に連れて行ってしまったから、罰だとしたら同じような悪夢を見ているかも知れない。\n　ちらりと二人の様子を伺ってみる。\n　二人はこちらの視線に気付いたのか『んー？』と首を傾げながら、パンを頬張っている。\n　いつもと変わらない表情は、とても日々悪夢に｜魘《うな》されているとは思えない。\n　……よかった。\n　僕のせいで二人が悪夢を見ることにはなっていないみたいで……\n　少しだけほっとしました。\n「なんだなんだー？　こっちをジロジロ見て」\n「う、うぅん。なんでもないよ」\n　首を振り、笑顔を作って応える。\n「かなた。お前さっきからスープしか飲んでないけど、パンは食べないのか？」\n　黒髪の少年の言葉に「う……」と言葉に詰まってしまう。\n「ちょっと……。食欲がなくて」\n　あはは……。と苦笑いを浮かべながら頬を掻いていると、食卓の上座から声がかかった。\n「かなた君」\n「は、はい……」\n　神父様……\n　優しい声のはずなのに、どうしても緊張で体が強張ってしまう。\n　姿勢を正し、続く言葉を待っていると、神父様はゆっくりと口を開きました。\n「……もし悩み事があるのでしたら、告解室を利用してみるのはどうでしょうか」\n「告解室……ですか」\n「えぇ、神様に悩み事を打ち明けてみれば心が晴れることもあるかもしれません」\n「そう……ですね」\n　……告解室。\n　犯してしまった罪を神様に正直に告白し、｜赦《ゆる》しをいただく部屋。この教会の片隅にもそのような場所があると、神父様が以前おっしゃっていました。固くならず、悩み事を相談するくらいの気持ちで訪ねても良いとも……\n「神様はいつも貴方と共にいますよ」\n「はい……」\n　\n　その日の夜。まだ皆が夜のご奉仕に出かける前。僕は教会端にある告解室の前に来ていました。\n　石造りの壁が広がっている中、控えめな装飾の施された木製の小さな小屋のようなものが佇んでいる。\n　窓から漏れた月明かりの照らすその場所は、どこか神秘的な雰囲気を｜醸《かも》し出していました。\n　告解室には扉が三つあり、真ん中には神父様が、左右の扉には信徒の方が入るようになっています。\n　右側の扉が閉まっているので、今まさに他の方が告解をされているのでしょう。\n　僕は空いていた左側の部屋に入り、備え付けられていた椅子に腰かけました。\n　小部屋の中は人一人分のスペースしかなく、かなり｜窮屈《きゅうくつ》に感じる。でも、部屋の隅で揺れる｜燭台《しょくだい》の明かりを見ていると、不思議と心が落ち着いてくるような気もする。\n　何度か小さく深呼吸をして、自分の順番が回ってくるのを待つ。\n　ややあって、目の前の小窓が少しだけ開きました。\n　神父様の表情は見えず、ゆらゆらと揺れる燭台の明かりが神父様の指先だけを照らしていました。\n「……神の慈しみに信頼して、あなたの罪を告白してください」\n「はじめての告解です」\n　なんでだろう。\n　初めてのことなのに、このやりとりを知っているような気がする。自分自身が行ったというより、見たことがあるみたいな｜曖昧《あいまい》な感覚。\n　軽く息を吸い、小さく呟く。\n「……夜のご奉仕でいつも失敗してしまい、皆に迷惑をかけてしまっています」\n「……はい」\n「……えっと」\n　神父様は続く言葉を待っているような感じでした。\n　今この場所にいるのは僕と神父様の二人だけ。神父様からはいつもの柔らかな雰囲気を感じるのに、小さな密室にいるせいか、息苦しいような重苦しいような、そんな感覚も覚えます。\n　数秒でしょうか、数分でしょうか。沈黙が続き、僕は再び口を開きます。\n「……以前、約束を破ってしまい。入ってはいけない部屋へと入ってしまいました。それ以来変な夢を見るようになってしまって……」\n「……はい」\n「今日までの主な罪を告白しました。赦しをお願いします」\n　怒られてしまうかな。それとも何か罰を与えられるかもしれない。そんな緊張に体が少し強張ってしまいます。\n　ややあって小窓の向こうから声が届く。\n「よく話してくださいましたね」\n　いつもの柔和な神父様の声だ。\n　僕がほっと胸を撫でおろしていると、神父様は続けました。\n「そうですね、ご奉仕活動は初めのうちは難しいものです。人を｜慈《いつく》しむ心があればいつか上手く出来る日がくると思います」\n「はい……」\n「部屋に戻ったら、神様と全ての人に祈りを捧げましょう。貴方の祈り、そして想いが届いた時、悪夢からも解放されるでしょう」\n「はい」\n「私は父と子と聖霊の｜御名《みな》によって、あなたの罪を赦します」\n「アーメン」\n「神に立ち返り、罪を赦された人は幸せです。ご安心ください」\n「ありがとうございます」\n　神父様に礼を言い、告解室を後にする。\n　今まで抱えていたモヤモヤを人に話すことが出来たからか、少しだけ心が軽くなったような気がする。\n　ここに来た時よりも、ちょっとだけ足取りが軽い。\n　部屋に戻ったら神様と、全ての人に祈りを捧げなきゃ。そして、奉仕活動も上手く出来るようになったら、悪夢からも解放されるかもしれない。\n　僕は小さく頷いて、自室へと向かいました。\n\n　　　　　　　　　　　＊\n\n　地下室への階段をゆっくりと下っていく。\n　漆黒の中、足元を照らすのは手にしたランプの明かりのみ。｜螺旋《らせん》状の階段は、自身がどれほど地下深くまで潜ってきたのか、その感覚を用意に奪ってくる。\n　しばらく歩みを続けると、金属製の重厚な扉が現れた。\n　全てを拒むような、重く無機質な扉に向けて手を伸ばし、その表面に触れる。\n　指先に伝わる感覚は、金属の冷たさだけではない。\nまるでそこに何も存在していないような、｜虚空《こくう》を掴むような無機質な冷たさだ。\n　この感覚は何度経験しても心地が良い。\n　味わうように指を滑らせながら、小さく呪文を呟く。\n　淡い青紫色を帯びた指先で、扉に｜幾何学模様《きかがくもよう》を描いていると。空間が歪んだように扉がゆらゆらと波打ち始めた。\n　波が一通り落ち着いたのち、ドアノブに手をかける。\n　軽く体重をかけ扉を押し開けると、隙間から漏れ出てくるのは生と死の香りだ。\n　二つが奏でるハーモニーに歓迎されながら、私は部屋へと入室した。\n　室内には明かりがなく、ただただ闇が広がっているばかり。ただ一部分だけを除いて。\n　部屋の一番奥、小さな祭壇の背後にある、額縁に入った大きな純白の翼。それだけが闇に抵抗するように淡く光り輝いていた。\n　美しい……\n　ただ一言、そう思う。\n　何故こうも、異なる二つのコントラストというのは心を躍らせてしまうのだろう。\n　体が吸い寄せられる。\n　導かれるように翼の前に行き、平伏する。\n　……あぁ、主よ。\n　……私の罪をお赦しください。\n　……私は人間の身にありながら、完璧ともいえる存在を生み出してしまいました。\n　……闇と光、善と悪、邪と正の融合。\n　……これは主へ｜冒涜《ぼうとく》でしょうか。\n　……それとも、｜尊崇《そんすう》でしょうか。\n　……主がこれを罪と仰るのならば、喜んで受け入れましょう。\n　……私は人間には、身に余ることをしてしまったのですから。\n「ふふふ……」\n　思わず口元が｜綻《ほころ》んでしまう。\n　いけない。\n「……そろそろあの子たちが奉仕活動から戻ってくる時間ですか」\n　名残惜しいですが、今は一旦戻ることにしましょう。\n　翼に一礼をし、部屋を後にする。\n　階段に一歩足を踏み出しかけたところ、踵を返し、再び扉と対峙する。\n「いけないいけない。私としたことが浮かれすぎてしまいましたね」\n　入室した時と同じように呪文を呟き、扉に幾何学模様を描く。\n　他の者に見られるわけにはいかない。\n　なにせここは、私と貴方だけの秘密の｜室《へや》なのですから。\n\n\n\n","assets/works/marriage.txt":"配信を終えて静まり返った部屋の中、黒く落ちたモニターの奥から、そんな問いかけがこだましているような気がした。\n\nそれは、僕が日々の配信でプレイしているゲームのふとした一幕で画面に浮かび上がった、哲学的なテキスト。物語の筋書きとは少し離れたその一文は、なぜだか僕の胸の奥に、小さな波紋のように広がり続けていた。\n\n幸せな結婚。\n\nその言葉の響きは、僕にとって決して縁遠いものではない。\n僕は悪魔の棲まう魔教会で、聖歌隊としての仕事をしている。その役目柄、永遠の愛を誓い合う二人の姿は、これまで数え切れないほど見届けてきた。\nステンドグラスから差し込む光の束。重厚な扉が開く音。祝福のフラワーシャワーと、高い天井に響き渡る僕たちの歌声。祭壇の前で手を取り合う恋人たちは皆一様に、この世のすべての幸福を両手に掬い取ったような、優しい顔をしている。\n\n結婚式というものがどれほど美しく、奇跡のような瞬間であるかは知っているつもりだ。\nけれど、あの鐘の音が鳴り止んだ後。豪奢な礼服を脱ぎ捨てて、ただの「日常」へと戻った二人が、どのような日々を紡いでいくのか。それについて、僕はまったくの無知だった。\n\n――もしも僕が、誰かと共に生きる未来を選んだら。\n\n冷めかけたカップを両手で包み込みながら、僕はそっと目を閉じた。思い描くのは、どこまでも穏やかで、やさしい日々の手触りだ。\n\nたとえばそれは、静かな休日の昼下がり。\nあたたかな日差しがレースのカーテンを透かして、部屋の中に四角い光の模様を落としている。洗い立てのシーツの匂いと、どこからか漂ってくる、淹れたての珈琲の香り。\n寝返りを打つと、すぐそばに君の体温がある。\n\n「おはよう」\n\n微睡みの中で僕がそうこぼすと、君は読んでいた本のページをめくる手を止めて、ふわりとやわらかな微笑みを向けてくれる。\n伸ばした指先が触れ合い、どちらからともなく手を繋ぐ。君の指のすき間に僕の指が滑り込み、互いの熱がゆっくりと溶け合っていく。\n窓の外の風の音も、遠くを通る車の音も、すべてが遠い世界のことのように思える。ただ君の穏やかな呼吸の音だけが、僕の耳元で心地よくリズムを刻んでいる。\n\n何か特別な出来事なんていらない。\nただこうして、同じ空気を吸い、同じ時間を分け合い、やさしい言葉を交わし合う。\n\nおはよう。おやすみ。今日のごはんは何にしようか。\n\nそんなささやかなやり取りの積み重ねこそが、きっと「幸せな結婚生活」というものなのだろう。君という存在が、僕の人生の隣にいてくれる。それだけで、世界はこんなにもあたたかく、美しい。\n妄想の中の君のやさしさに包まれて、僕の口元には自然と笑みがこぼれていた。胸の奥がじんわりと熱くなり、満たされていくのを感じる。\n\nああ、結婚っていいな。誰かと生きるって、とても素敵なことだ。\n……と、そこまで想像を巡らせたところで。\n僕の脳内に、ひやりとした冷水が滴り落ちた。\n\n待ってほしい。\n今、僕は妄想の中で「休日の昼下がり」に目覚めた。\nそして、部屋には「洗い立てのシーツの匂い」と「淹れたての珈琲の香り」が漂っていた。\n\n――それは、誰が洗ったシーツ？\n――それは、誰が淹れた珈琲？\n\n目を開け、現実の自分の部屋を見渡す。\nデスクの上に散乱した資料。いつ脱いだか記憶の定かではない上着。そして、自炊の形跡など微塵もないキッチン。\n\n僕の生活リズムといえば、夜明け前まで起きていて、夕方頃にようやく目を覚ますという有様だ。食事だって、魔教会のキッチンは立ち入り禁止だし、自分で用意するにしても人間界のお弁当屋さんに頼りきり。掃除も洗濯も、必要に迫られてようやく重い腰を上げる程度。\n\n魔教会での神聖な儀式については熟知していても、地に足のついた「生活」という営みにおいて、僕はあまりにも無力だった。\n\nもし、この状態で君との結婚生活が始まったら。\n君が朝早く起きて洗濯機を回し、朝食の準備をしてくれている間、僕はベッドの海で無防備に眠りこけていることになる。\n君が疲れて帰ってきた夜、僕はまだパジャマ姿のまま「今日の夕ご飯、なに？」と無邪気に尋ねてしまうかもしれない。\n\nいくら君がやさしい人でも、そんな日々が何ヶ月、何年と続けば、あの祭壇の前で誓った愛の魔法も、徐々に効力を失っていくのではないだろうか。\n\n『ねえ、かなた。洗濯物、干しておいてって頼んだよね？』\n\nふいに脳裏をよぎった、温度のない君の声。\n\nでも、君だったらどうやって僕を許してくれるだろうか。\n僕が「ごめんね、何もできなくて」とシュンとしていたら、君は「かなたは仕方ないなぁ」と呆れながらも、僕の寝癖のひどい頭を撫でてくれるかもしれない。\n\n『じゃあ、今日は一緒にコンビニにお弁当とお味噌汁、買いに行こっか』\n\nそう言って、二人で夜のコンビニまで手を繋いで歩く。そんな底抜けに優しい君の姿を想像してしまい、僕はぶるぶると首を横に振った。\n\n「いやいや、それに甘えちゃだめだ！」\n\n僕は思わず、両手で顔を覆った。だめだ。そんなの絶対にだめだ。\n君のあたたかな微笑みを、僕のだらしなさで曇らせてしまうなんて。\n\n結婚式は一日で終わるけれど、生活は死が二人を分かつまで続いていく。ステンドグラスの光や賛美歌の響きは、洗い物が溜まったシンクや、出し忘れたゴミ袋の前では何の役にも立たないのだ。\n\n僕は、自分のあまりのずぼらさに絶望しながらも、小さく深呼吸をした。\n愛する君に、いつまでもやさしい顔で笑っていてもらうために。\n僕たちの「幸せな結婚」を、無惨な現実の前に崩れ去らせないために。\n\n「まずは、シミュレーション」\n\n誰もいない部屋で、僕は一人、決意の声を上げる。\n僕の脳内結婚生活は、甘くロマンチックな夢の段階から、どうすれば君の負担を減らし、共に穏やかな日常を構築できるかという、極めて切実な生存戦略へと舵を切ろうとしていた。\n\n\n---\n\n\n　君を幸せにするための生存戦略。そう意気込んだものの、何から手をつければいいのか、僕にはさっぱりわからなかった。\n\n　まずは知識から入れようと思い立ち、僕は魔教会の図書室へ足を運んでみた。\n　高い天井まで届く本棚には、古の魔法陣の描き方から、聖歌隊の分厚い楽譜、教典の類まで、あらゆる書物が詰まっている。この中のどこか一角くらいに、人間界での暮らし方みたいなコーナーがあってもいいんじゃないだろうか。\n　そう思って背表紙を一つ一つ目で追っていた、その時だった。\n\n「勉強ですか、かなたくん？ 何かお探しなら手伝いますが……」\n\n　ふいに背後から穏やかな声がして、僕はびくっと肩を揺らした。振り返ると、そこには優しげに微笑む神父さまの姿があった。\n\n「あ、あのっ、神父さま！ べ、勉強というか、その……！」\n\n　まさか「幸せな結婚生活のために、初心者向けの家事の本を探しています」なんて言えるはずがない。\n\n「えっと、聖歌の、はい…… 歴史についてちょっと調べたくて…… 自分で探すので大丈夫です。ありがとうございます」\n\n　僕はしどろもどろに言い訳をして、逃げるようにその場を後にした。\n　背中に神父さまの不思議そうな視線を感じたけれど、気にしてはいられない。\n　図書室で情報を得る計画は、あっけなく頓挫してしまった。\n\n「仕方ない、自力でなんとかするしかないか」\n\n　デスクに戻り、僕は腕を組んで考え込んだ。\n　結婚生活における最大の難関。それはおそらく「衣食住」のすべてにおいて、僕が君に依存してしまうことだ。\n\n　特に「食」。これは命に直結する重要な課題だ。毎日ピザやデリバリーばかりでは、お財布にも優しくないし、なにより君の健康に良くない。\n\n「よし、料理だ。まずは料理のシミュレーションをしよう」\n\n　僕は立ち上がり、意気揚々とキッチンへ……は向かわず、パソコンの前に座り直した。\n\n　なぜなら、魔教会のキッチンは現在、僕の立ち入りが固く禁じられているからだ。以前、見よう見まねでフライドポテトを作ろうとした際、じゃがいもの水切りを甘く見たせいか、油に投げ入れた途端に火柱が上がり、周りのインキュバスたちを驚かせてしまった。おまけに、慌てて逃げようとした拍子に服の袖を包丁の柄に引っかけ、足元に落としかけるという惨事まで引き起こした。\n　それ以来、「かなたは料理をするな」と厳命されている。\n　だからこそ、まずは脳内で完璧なシミュレーションを行う必要がある。目を閉じ、意識を集中させる。\n\n　ここは、君と僕が暮らす新居のキッチン。ピカピカに磨かれたシンクに、使いやすそうなIHコンロ。休日の夕方、僕は君のために夕食を作ろうとエプロンを身につけている。\n　君はリビングのソファで、気持ちよさそうにうたた寝をしている。その穏やかな寝顔を守るためにも、僕は美味しいご飯を作らなければ。\n\n「さて、今日のメニューは何にしようかな」\n\n　脳内の僕が、腕まくりをして冷蔵庫を開ける。\n　中には、君が週末に買い出しに行ってくれた野菜やお肉が綺麗に並んでいる――はずだった。\n　しかし、僕の貧困な想像力では、冷蔵庫の中身を具体的に思い描くことができなかった。かろうじて想像できたのは、いつもお世話になっている鮭おにぎりと、パイのチョコ菓子だけ。\n\n「だめだ、食材のイメージが湧かない」\n\n　僕は早々にシミュレーションを中断し、パソコンで「初心者　料理　簡単」と検索した。\n　画面には、色鮮やかな料理のレシピがずらりと並ぶ。オムライス、ハンバーグ、肉じゃが……どれも美味しそうだけれど、材料の欄を見ると「回しかける」「ひとつまみ」「適量」など曖昧な、僕にとっては難解な言葉が並んでいる。\n\n「大さじってどれくらい？ ひとつまみって、親指と人差し指？ それとも中指も入れるの？ 適量って……適当ってこと？」\n\n　レシピを見れば見るほど、混乱は深まるばかりだ。\n　それでも、なんとか一番簡単そうな「目玉焼き」のレシピを見つけ出し、再びシミュレーションを開始する。\n\n「まずはフライパンに油をひいて、火にかける」\n\n　脳内の僕が、フライパンをコンロに置く。そして、油を……どれくらい入れるんだろう。\n　レシピには「少々」と書いてある。少々とは。\n　とりあえず、フライパンの底の真ん中に十円玉くらいの大きさで垂らしてみるか。いや、少ないかもしれない。焦げ付いたら大変だ。ここは思い切って……。\n\n　じゅわぁぁぁぁっ！！\n\n　脳内で、フライパンから恐ろしい音が鳴り響いた。\n　慌てて卵を割り入れると、熱せられた油が四方八方に跳ね飛び、僕の手の甲や腕を容赦なく攻撃してくる。\n\n「あつっ！？ 痛い、痛い！！」\n\n　パニックになった脳内の僕は、消火しようとフライパンに水を勢いよく注ぎ入れたところ、さらに炎が燃え上がる。\n　その騒ぎに驚いて、リビングで寝ていた君が目を覚ます。\n\n『かなた！？ どうしたの、すごい音が……うわっ！ 火が！！』\n\n「ご、ごめん！ 目玉焼きを作ろうとしたら、なんか大変なことに！」\n\n『火柱！？ 目玉焼きなのになんで！？ とにかく火を消して！！』\n\n　君が慌てて濡れタオルを持って駆けつけ、なんとか火は消し止められた。\n\n　しかし、キッチンは油まみれで、フライパンの中には真っ黒な炭の塊と化した何かが残されているだけ。\n　君は申し訳なさそうな僕の顔を見て、深くため息をつく。\n\n『……怪我がなくてよかったけど。かなた、もう一生キッチンには立たないで』\n「うぅ……ごめんなさい……」\n\n　――バチッ。\n　そこでシミュレーションは強制終了した。\n\n「シミュレーションくらい、うまくいったっていいじゃんね」\n\n　現実世界の僕は、机に突っ伏して深い絶望を味わっていた。\n　フライドポテトで火柱を上げた過去があるとはいえ、普通の卵と油だけで大惨事を引き起こしてしまうとは。\n　これでは、君を幸せにするどころか、命の危険に晒してしまう。僕の「幸せな結婚」への道は、想像以上に険しく、果てしなく遠いものに思えた。\n\n---\n\n　だが、絶望してばかりもいられない。\n　料理がだめなら、他のことで君を支えればいいのだ。\n\n「そうだ、掃除だ！」\n\n　僕は顔を上げ、再び脳内でシミュレーションを起動した。\n\n　今度の舞台は、休日の朝の寝室。\n　君はまだ、ベッドで気持ちよさそうにスヤスヤと眠っている。\n　君が起きる前に、部屋をピカピカにして驚かせてあげよう。\n\n　僕は音を立てないようにそっとベッドを抜け出し、掃除機を……いや、掃除機は音がうるさいから、君を起こしてしまう。\n　ならば、コロコロだ。\n　粘着テープのついたアレで、カーペットのゴミを静かに、かつ丁寧に取っていく。\n\n　僕は君の寝顔を横目で見ながら、意気揚々とコロコロを転がす。\n　ベッドの下の埃も綺麗にしようと、僕は床に這いつくばって奥へ奥へと腕を伸ばした。\n　――その時だった。\n\n「あれ？ 何か張り付いちゃった」\n\n　コロコロの先が何かに張り付き、ガサリ、と嫌な音がした。\n　次の瞬間。\n　ドササササッ！！！\n　ベッドの下の暗がりから、ちょっと特殊な性癖のBL同人誌複数と、エロゲのパッケージが雪崩のように溢れ出し、カーペットの上に盛大に散乱してしまったのだ。\n\n「ひぃっ！？」\n\n　予期せぬ大惨事に、僕は変な声を出して尻餅をついた。\n　しかも最悪なことに、その大きな音で、スヤスヤと眠っていたはずの君が目を覚ましてしまった。\n\n『んん……？ かなた、どうしたの……って、えっ？』\n\n　身体を起こした君の視線が、僕の足元に散らばった過激な表紙の数々に釘付けになる。\n　沈黙。\n　ただひたすらに、重く苦しい沈黙が部屋を満たす。\n\n「ち、ちがうの！ これは違う！」\n\n　僕はパニックになり、散らばった本やパッケージを両腕で抱え込みながら必死に弁解を始めた。\n\n「これは……その、インキュバスとしての勉強というか！ 人間の文化や嗜好を深く知るための学術的な資料であって、決して僕の個人的な趣味とかそういうのではなくて……！」\n\n　声が裏返る。顔から火が出るどころか、全身から蒸気が出そうだ。\n　結婚生活のシミュレーション中に、まさかこんな最悪の形で性癖がバレるなんて。\n\n『調査……』\n\n　君はあきれたような、けれどどこか面白がるような表情で、ベッドから降りてきた。\n\n『見せてごらん？隠し事はなしだよ？』\n\nそう言って、君は僕の手からすっと数冊の同人誌を引き抜いてしまった。\n\n「ああっ！」\n\n君はパラパラとページをめくり、その中身をしっかりと確認していく。\n\n『へえ……かなたって、こういうのが好きなんだ』\n「うぅぅ……ごめんなさい、ごめんなさい……」\n\n僕はいよいよ完全に観念して、頭を抱えてうずくまった。\n\n『ふふっ、いいよ。別にかなたがどんな性癖を持っていても否定したりしないし。ほら片付けるよ、どいて』\n\n君は怒るどころか、優しく笑って僕の背中をポンポンと叩いてくれた。\n\n「で、でも……」\n『ほら、貸して。これはこっちでしょ』\n「なんで隠し場所知ってるの……？」\n\n　現実世界の僕は、机に突っ伏したまま、しばらくピクリとも動けなかった。\n　結婚生活とは、かくも恐ろしいものなのか。\n　僕の「幸せな結婚」への道は、ますます前途多難な様相を呈してきていた。\n\n\n---\n\n\n　いくら脳内のシミュレーションとはいえ、自分の圧倒的な不甲斐なさにすっかり自信を喪失してしまった僕は、深くため息を吐き出した。\n　生活力がない。その事実が、想像以上に重くのしかかってくる。こんな僕が、誰かの人生に寄り添うことなど許されるのだろうか。いつか君は、僕という手のかかる存在に疲れ果ててしまうのではないか。\n相手に迷惑をかけてばかりで、許されてばかりのシミュレーション。これでは愛欲ではなく怠惰の悪魔だ。\n　暗い思考の螺旋に落ち込みそうになった時。ふと、僕は自分自身の\"本分\"を思い出した。\n\n　そうだ。僕は悪魔の棲まう魔教会で、聖歌隊として祈りを捧げている。\n僕の歌声は、迷える魂を鎮め、傷ついた心を癒やすためにある。物理的な家事という側面では君の役に立てなくても、君の心を癒やし、精神的に支えることなら、僕にもできることがあるはずだ。\n\n「よし、こうなったら知識に頼ろう」\n\n　僕は立ち上がり、本棚の隅に追いやっていた例の怪しい冊子を引っ張り出してきた。\n　以前、他のインキュバスがふざけて押し付けてきた『♡かわいい人間の惑わせ方♡』という手書きの代物だ。もらった時は呆れてそのまま放置していたけれど、人間を喜ばせるという点においては、何か一つくらい参考になるかもしれない。\n\n　たとえば、疲れて帰ってきた君を最高に癒やす「お出迎え」のシチュエーションとか。\n\n　一縷の望みを胸に、僕はパラパラとページをめくった。\n\n「えーっと、帰宅時の対応、帰宅時の対応……あ、あった。『ターゲットが帰還した際の極上のおもてなし』……」\n\n　文字を目で追い始める。\n　……数分後。\n\n「…………っっ！！」\n\n　僕はバタンッ！　と勢いよく冊子を閉じ、そのまま両手で顔を覆った。\n　ボンッ、と頭から湯気が出そうなほど、顔中が熱い。耳の先まで真っ赤になっているのが自分でもわかる。心臓が早鐘のように鳴り響き、息をするのも苦しいくらいだ。\n\n『玄関の扉を開けた瞬間、背後から抱きすくめ、甘い吐息を耳元に吹きかけて理性を奪うべし』\n『疲れた身体には言葉よりも直接的な快楽を。まずはネクタイを口の端でくわえて引き寄せ……』\n\n　そこから先は、とてもじゃないけれど僕の口からは発音できないような、赤裸々で刺激的すぎる「お出迎え（という名の捕食）」の方法がびっしりと書き込まれていた。挿絵付きで。\n　悪魔の教典よりよっぽど恐ろしい。確かにインキュバスの生態としては正しいのかもしれないけれど、僕が求めているあたたかな結婚生活のお出迎えとは方向性が宇宙の果てほど違う。\n\n「だめだ……こんなの、僕には絶対無理……」\n\n　僕は冊子を二度と開かないように本棚の奥深く、一番見えない場所へと封印し、熱くなった頬を手のひらでパタパタとあおいだ。\n　ああいう大人な駆け引きは、僕にはハードルが高すぎる。やっぱり、自分なりのやり方でシミュレーションするしかない。\n\n　深呼吸をして動悸を落ち着かせると、僕はまたもやシミュレーションを開始した。\n　舞台は平日の夜。時刻は午後七時。\n　夜明け前に眠りにつき、夕方に目を覚ます僕の生活リズムにおいて、この時間は最も意識が澄み渡り、元気な時間帯だ。\n　対する君は、外での過酷な一日を終えて帰ってくる頃合い。きっと、人の波に揉まれ、複雑な人間関係や理不尽な業務にすり減らされて、心身ともに疲弊しているはず。\n\n　――ガチャリ。\n　静かな部屋に、玄関の扉が開く音が響く。\n\n『ただいま……』\n\n　落ちくぼんだ、君の小さな声。\n　その瞬間、僕はリビングから玄関へと駆け出す。冊子に書いてあったような怪しげなテクニックは一切使わない。ただ真っ直ぐに、君のもとへ。\n\n「おかえりなさい」\n\n　そして、靴を脱ごうとする君の身体を、思いきり、けれど優しく抱きしめる。\n　突然のハグに君は少しだけ目を丸くするけれど、すぐに僕の背中に細い腕を回し返してくれる。\n\n『ふふ……ただいま、かなた』\n「今日もお疲れさま。すごく頑張ったんだね、えらいよ」\n\n　僕は君の背中を、慈しむようにゆっくりと撫でる。\n　外の冷たい風を纏っていた君の身体が、僕の体温と溶け合い、少しずつ熱を取り戻していくのがわかる。僕の首筋に額を擦り寄せる君の髪から、外の空気の匂いと、君自身の甘い香りが微かに漂ってきた。\n　そのまま君の手を引いてリビングへ向かい、ソファに二人で身を沈めた。\n\n「夕ご飯、作れなくてごめんね。でも、君が好きだって言ってたお店のお弁当、買っておいたんだ。あと、あたたかいお茶も淹れるよ」\n『ありがとう。……なんだか、今日すごく疲れちゃって』\n\n　クッションを抱きしめながら、君はポツリとこぼす。\n　僕は君の隣にぴったりと寄り添い、その肩にそっと頭を乗せた。\n\n「うん。僕でよければ、どんなことがあったのか聞かせて……？」\n\n　それから、君は今日あった嫌なこと、悲しかったこと、飲み込まざるを得なかった理不尽を、少しずつ言葉にして紡ぎ始める。\n　僕はただ、静かに頷きながら耳を傾ける。「それは疲れちゃうね」「つらかったね、がんばったね」と、相槌を打ちながら。君の少し冷えた手を取って、僕の両手で包み込むようにしてあたためる。\n　聖歌を歌う時と同じように。一番やさしい声の響きを使って、君の心に絡みついた黒い靄を、少しずつ解きほぐしていくようなイメージで。\n\n　やがて、ひとしきり話し終えた君は、憑き物が落ちたような、すっきりとしたやわらかな表情を取り戻していた。\n\n『……ごめんね、かなた。愚痴ばっかり聞かせちゃった』\n「ううん。君が少しでも楽になるならいいんだ。毎日でも聞いちゃうよ」\n\n君が少しだけ瞳を潤ませて、僕の頬にそっと手を伸ばした。\n\n『そんなことないよ。かなたがこうして家で待っていてくれるだけで、明日も頑張ろうと思えるんだから』\n「……そっか」\n\n僕は少しだけ安堵して、君をもう一度きつく抱きしめた。\n\n『ねえ、かなた』\n「ん？」\n『充電、してもいい？』\n\n君は甘えるようにそう言って、そのままコロンと僕の膝の上に頭を乗せてきた。\n\n『わっ……いいよ、もちろん』\n\n僕は君の頭を優しく撫でながら、聖歌のフレーズを小さく口ずさむ。\n僕の歌声が、君の心の一番深いところまで届いて、すべての疲れを癒やしてくれますように。\nただ守られるだけじゃなくて、こうして君が疲れた時に寄り添って、安心できる居場所を作ってあげること。それなら僕にもできるかもしれない。\n\n　シミュレーションは、ここで甘い余韻を残して途切れた。\n\n　――割といいのではないだろうか。\n　さっきの冊子の過激さとは全く違う、心がとろけてしまいそうな純度の高い甘さだ。\n\n　完璧な家事なんてできなくても。ただ君の帰りを待ち、寄り添い、心をあたためること。それも立派な生活の形だ。\n　僕は一人で完璧になる必要なんてない。君と二人で、足りない部分を補い合って、ひとつのあたたかい場所を作っていけばいいんだ。\n　なんだか、急に目の前の霧が晴れたような気がした。\n　幸せな結婚生活の形は、一つじゃない。僕たちだけの正解を、これから一緒に探していけばいいのだから。\n\n\n---\n\n\n\n　しかし、安心したのもつかの間。僕はまたしても、結婚生活における致命的な問題点に気づいてしまったのだ。\n\n「あれ……？ 僕の生活リズムだと、君と顔を合わせる時間が全然なくない……？」\n\n　悪魔の教会の聖歌隊員である僕の生活リズムは、ひどく夜に偏っている。朝方の五時頃にようやく眠りにつき、お昼過ぎから夕方にかけて目を覚ます日々。\n　もしも君が、朝起きて夜に眠る一般的な生活を送っていたとしたら。\n\n　朝、君が「行ってきます」と家を出る時、僕は夢の中だ。そして夜、君が帰ってくる頃に僕はようやく活動を始める。君が眠りにつく深夜、僕は最も元気な時間を過ごしている。\n\n「完全なすれ違い生活……っ！」\n\n　僕は頭を抱えた。\n　いくらお出迎えができても、一緒に過ごせる時間が物理的に少なすぎる。これでは、同じ家に住んでいるだけのルームメイトだ。心のすれ違いは、やがて取り返しのつかない溝を生んでしまうのではないか。\n　焦りを抱えたまま、僕はさらなるシミュレーションを開始した。\n\n　舞台は、平日の深夜二時。\n　君は明日もお仕事があるため、寝室のベッドでとうに眠りについている。僕はリビングで一人、ヘッドホンをつけて静かにゲームをしている。\n　画面の光だけが部屋を照らす中、ふと、孤独感が胸をよぎる。壁の向こうに大好きな君がいるのに、今この時間を共有できない寂しさ。\n\n　その時。\n　寝室のドアが開き、目をこすりながら君がリビングに顔を出した。\n\n『かなた、まだ起きてるの？』\n「あっ、ごめん。うるさくしちゃった？」\n『ううん。喉が渇いちゃって……』\n\n　少し寝ぼけた様子の君を見て、僕は慌てて立ち上がる。\n\n『動かなくていいよ。僕があたたかいお茶、持っていくから』\n\n　常備しているペットボトルのお茶をコップに注ぎ、電子レンジにかけ温める。\n　ソファに座る君の隣に腰を下ろし、コップを手渡す。\n\n「はい、どうぞ」\n『ありがとう……』\n\n　君は両手でコップを包み込むようにして持ち、こくりとお茶を飲んだ。その無防備な横顔が愛おしくて、僕はじっと見つめてしまう。\n\n『かなた、いつも夜更かしさんだね』\n「うん、夜の方が目が冴えて集中できるから……ごめんね」\n\n　僕が少しだけしゅんとして謝ると、君はコップをテーブルに置き、ふわりと笑って僕の肩にこてんと頭を乗せてきた。\n\n『ううん。こうして夜中に目が覚めた時、かなたが起きててくれると、なんだか安心するの』\n「……本当？」\n『うん。それに、かなたの夜の時間は、かなただけのものだから。無理して合わせなくていいんだよ』\n\n　なんて優しいんだろう。\n　すれ違っていると思っていたのは僕だけで、君はそんな僕の生活ごと、丸ごと受け入れてくれている。\n　僕は嬉しくなって、君の肩を引き寄せ、やわらかな髪にそっと頬ずりをした。\n\n「ほら、そろそろ戻らないと。明日も朝早いんでしょ？」\n『うーん……でも、なんだか目が冴えちゃった』\n「そっか。じゃあ、眠れるまでお話しようか」\n\n　僕が提案すると、君は少しだけ首を傾げ、ふわりと笑った。\n\n『それじゃあ、寝ながら話そう。ベッド、行こ？』\n「えっ」\n\n　君の手が僕の袖を軽く引き、甘えるような上目遣いを向けてくる。\n　寝ながら。ベッドで。\n\n「あ……えっと、僕も、一緒に行くの？」\n『夫婦なんだから、当たり前でしょ？ 一緒に寝よ』\n\n　夫婦なんだから。\n　……そうか。夫婦なんだから、同じベッドに並んで寝るのが当たり前だ。\n　そのひどく単純で決定的な事実に行き着いた瞬間。僕の脳裏に、先ほど本棚の奥深くに封印したはずの『♡かわいい人間の惑わせ方♡』の過激な挿絵とテキストが、フラッシュバックのように鮮明に蘇ってきた。\n\n『疲れた身体には言葉よりも直接的な快楽を……』\n『甘い吐息を耳元に吹きかけて理性を奪うべし……』\n「耳に吐息をかければいいと思ってない……？」\n\n『か、かなた？ 顔、真っ赤だけど大丈夫？』\n「あ、あわわわわ！ なんでもない！ なんでもないよ！ べ、ベッドね！ はい、行きます！」\n\n　――バチッ。\n　シミュレーションは、ここで限界を迎えて強制終了した。\n\n「うわぁぁぁぁっ！！」\n\n　現実の部屋で、僕は机に突っ伏したまま、ジタバタと両足をバタつかせた。\n　だめだ。夫婦として同じベッドに向かうというごく自然な流れなのに、さっきのいらぬ知識のせいで変な想像が暴走してしまう。\n　すれ違い生活の危機を乗り越える前に、僕自身の理性の危機だ。\n　生活力がないとか、生活リズムが合わないとか、そんなこと以前の問題だった。\n　幸せな結婚への道は、まだまだ前途多難らしい。\n\n\n---\n\n\n　火照った顔を机の冷たい天板に押し当てて、僕は大きく、何度も深呼吸を繰り返した。\n\n「……ふぅ。落ち着け、僕」\n\n　少しずつ心拍数が元に戻っていくのを感じながら、ゆっくりと顔を上げる。\n　視線の先には、しばらく放置されてスリープモードに入ろうとしているモニターがあった。マウスを軽く動かすと、先ほどまでプレイしていたゲームの画面が再び明るく浮かび上がる。\n　画面の中央には、相変わらずあのテキストが表示されたままだった。\n\n『幸せな結婚はあるだろうか』\n\n　数時間前、この問いかけを見た時は、ただ漠然とした憧れしかなかった。\n　ステンドグラスの光の中で微笑み合うような、永遠の愛の魔法。それがずっと続くのが「幸せな結婚」なのだと信じていた。魔教会の聖歌隊として、あんなにたくさんの奇跡のような瞬間を見届けてきたというのに、僕はその先にある「現実」を何も知らなかったのだ。\n\n　けれど、複数回にわたる脳内シミュレーションを経て、僕の考えは少しだけ変わっていた。\n\n　幸せな結婚。それは決して、最初から完成されたおとぎ話ではないのだ。\n　休日の朝に一緒に淹れたての珈琲を飲むためには、誰かが豆を挽き、お湯を沸かさなければならない。\n　綺麗な部屋で過ごすためには、こまめに掃除や洗濯をして。\n　そして、生活リズムがすれ違っていても、互いを思いやり、歩み寄るためのあたたかい言葉が必要だ。\n\n　僕は満足に家事ができないし、夜中にしか元気に活動できない。\n　それに、ちょっとしたことで顔を真っ赤にしてしまうくらい、精神的にも幼いインキュバスだ。\n　こんな僕が、誰かと完璧な生活を送るなんて、どう考えても不可能に近い。現実の前に、ロマンチックな夢はあっけなく崩れ去ってしまうだろう。\n\n　でも。\n　もしも君が、こんな僕を笑って許してくれるなら。\n　黒焦げになったフライパンを見て「もう、仕方ないなぁ」と笑いながら、コンビニに買いに行ったお弁当を一緒に食べてくれるなら。\n　夜中に目が覚めた時、「かなたが起きててくれて嬉しい」と僕の肩に寄りかかってくれるなら。\n\n　僕は、君のそのやさしさに、持てるすべての愛情で応えたい。\n　君が外の世界で傷ついて帰ってきたら、誰よりも早く駆け寄って、一番あたたかいハグで君を包み込もう。\n　君の心が冷え切ってしまった夜は、魔教会で歌うどの賛美歌よりもやさしい声で、君のためだけに歌を歌おう。\n　僕の夜の時間は、君が安心して眠るための月明かりになる時間だ。\n　完璧な家事はできないけれど。君の心を癒やし、笑顔を守ることなら、僕にもきっとできるはずだから。\n\n　足りないものは補い合って、失敗したら二人で笑い合って。そうやって、少しずつ「僕たちらしい」生活の形を作り上げていく。\n　それがきっと、僕と君の「幸せな結婚」の形なんだ。\n\n「あるよ」\n\n　僕は、静まり返った部屋の中で、画面の問いかけに向かってはっきりと答えた。\n　誰に聞かせるわけでもない、僕だけの誓いの言葉。\n　魔法のように完璧じゃなくても。かっこ悪い失敗ばかりだとしても。\n　君と一緒なら、きっと幸せな結婚は「ある」。いや、僕たち二人で「ある」ものにしていくんだ。\n\n　ふと時計を見ると、もう朝の五時になろうとしていた。\n　外の空気が白み始め、窓の向こうからかすかに小鳥のさえずりが聞こえてくる。僕にとっては、そろそろ眠りにつく時間だ。\n　僕はゲームをセーブして終了し、パソコンの電源を落とした。\n　部屋が再び静寂に包まれる。でも、不思議と寂しさはなかった。心の中には、シミュレーションの中で君がくれた、たくさんのあたたかい言葉が残っているから。\n\n　立ち上がり、大きく伸びをする。\n　いつか来る、君との未来を想像しながら。\n\n「……よし。起きたら、まずは目玉焼きの作り方の動画でも見てみようかな」\n\n　未来の愛する君に、いつか美味しい朝ごはん（僕にとっては夕ごはんかもしれないけれど）を作ってあげるために。\n　火を使わないレンジ調理の方法からなら、きっと僕でも始められるはずだ。\n　あたたかな希望を胸に抱きながら、僕はふかふかのベッドへと潜り込んだ。\n　夢の中で、また君に会えますように。\n　そう願いながらゆっくりと目を閉じると、僕は心地よい微睡みの中へと落ちていった。\n\n\n---\n\n\n　魔教会の図書室は、常に静謐に包まれている。\n　古の魔導書や分厚い教典が整然と並ぶこの空間は、私の心をひどく落ち着かせてくれる。私は神父としての顔を貼り付けたまま、本棚の隙間から『彼ら』の生態を観察するのが好きだった。\n　インキュバス。人間の欲望を糧とする低俗な悪魔たち。\n　彼らの行動原理は単純で、実に浅ましい。自らの美貌をひけらかし、人間を誘惑することしか頭にない連中だ。\n　私は彼らを嫌悪しながらも、観察対象として扱っている。それは偏に、私のただ一つの目的――至高の存在を完成させるための、ささやかな暇つぶしに過ぎない。\n\n「勉強ですか、かなたくん？ 何かお探しなら手伝いますが……」\n\n　私は、本棚を熱心に見上げていた『彼』に、ごく自然な、神父としての穏やかな笑みを浮かべて声をかけた。\n　びくっと肩を揺らして振り返った彼の瞳は、悪魔特有の妖気を一切孕んでいない。澄み切った、まるで穢れを知らない子どものような瞳だ。\n\n「あ、あのっ、神父さま！ べ、勉強というか、その……！」\n\n　慌てて言葉を探す彼の背中には、真っ白な羽が小さく震えている。\n　その羽の白さに、私は内心で深いため息をついた。\n　ああ、なんて不自然で、酷い出来だ。\n　他のインキュバスたちから、最も美しい白い羽だけを厳選して毟り取り、私の手で彼に縫い付けた紛い物の羽。\n\n　あの日、私の目の前で空から墜ちてきた、本物の天使。\n　幼い頃から異常なまでに天使に執着し、逆説的にその存在を証明しようと悪魔召喚に手を染めた私の前に、奇跡のように現れた至高の存在。\n　私は彼を信仰し、同時に、私の傍に永遠に留めておきたいという傲慢な欲求に抗えなかった。\n　天使の羽を残しておけば、彼はいずれ天へと還ってしまう。\n　だから私は、躊躇いの末に彼から本物の天使の羽を切り離した。\n　彼が動くたびに震える今の白い羽が、かつての『持ち主』の悲鳴を孕んだ悪魔の羽であることなど、記憶を失った純粋なこの子は知る由もない。\n\n「えっと、聖歌の、はい…… 歴史についてちょっと調べたくて…… 自分で探すので大丈夫です。ありがとうございます」\n\n　彼は分かりやすい嘘をつき、しどろもどろになって逃げるように図書室を後にした。\n　あの子の背中が見えなくなるまで、私は優しい微笑みを崩さなかった。\n\n「……そうですか」\n\n　誰もいなくなった図書室で、私はひとり静かに笑みをこぼした。\n　彼が見つめていた本棚の区画は、聖歌の歴史とは全く関係のない場所だった。そこにあったのは、『人間界の文化』や『生活様式』、さらには『配偶者との関係構築』といった、人間の俗物的な知識を記した書物ばかり。\n　彼を、私の思い描く完璧な『無知で純潔な天使』のまま、手元に置いておくために。\n\n　しかし、どうやら私のかわいい天使は、外の世界……人間の営みである「結婚」というものに興味を持ち始めてしまったようだ。\n　人間のように誰かと共に生きようなどと。\n\n「君は、誰の隣にも行く必要はないのですよ」\n\n　私は、彼が探していたであろう本を一冊抜き出し、その表紙を冷たく見下ろした。\n　君が何もできなくたって構わない。\n　私が君のすべてを管理し、世話をし、永遠にこの箱庭の中で甘やかしてあげるのだから。\n　君はただ、私のために。その純粋な瞳で私を見上げ、その美しい声で歌い続けてくれればいい。\n　私は神父の服の袖口を整え、彼が逃げていった廊下へと足を踏み出した。\n　さて。かわいい天使の些細な反抗期を、どうやって終わらせてあげようか。\n\n","assets/works/unanswered.txt":"　告解とは、犯した罪を告白すること。\n　告解室とは、自らの罪を告白し許しを得る個室のこと。\n　ならば、罪とは何なのか。\n　例えば、誰かを愛することは？\n　例えば、誰かを求めることは？\n　例えば、穢れを知らないことは？\n　無知は罪だと人は言う。だが、知識を与えるものがいないこともまた、同じように罪ではないか。\n　であれば、それを与えない神こそはそれらより大きな罪を背負っている。\n　無論、神がいればの話だが。\n　　　　　　　□\n　告解とは、犯した罪を告白すること。\n　告解室とは、自らの罪を告白し許しを得る個室のこと。\n　ぎし。古びた椅子が、華奢な体躯の少年の重みにやけに低く響く。\n　着席したのは、星乃かなた。\n　この魔教会で聖歌隊を務める、インキュバスの一人だ。\n「おや、来ましたか」\n　対して、反対側から声をかけるのは魔教会の神父。\n　父のようでいて、母のような、人外染みた包容力の美しき男性。\n　かなたにとっては当然、既知の間柄である。\n「ふふ、緊張することはありません。かなた君の胸の内、それを聞かせてください」\n　格子の付いた小窓からは、お互いの表情はほとんど読み取れない。\n　しかし、どこか曇ったかなたの顔色に気付いたように神父は穏やかな声音で促した。\n　引き結ばれたかなたの桜色の唇が、ほどける。\n「夢を、見ました。そう、あれは、多分……夢」\n　澄んだ、柔らかなプラチナのような声には暗く暗い不安が滲む。\n「僕は、知らない高いところにいて。知らない誰かと一緒で。その子は、僕にとてもよく似ていて」\n　口に出すにつれて、その時の記憶がかなたの中で段々と甦っていく。\n　彼は僕と瓜二つで。知らない誰かと僕は知り合いで。\n　知らない高いところは、教会のてっぺんよりもっと高くて。まるで、天国に近いみたいで。\n「僕は、彼が好きで。それがどういう好きかは分からないけど。でも、とにかく」\n　彼は、何故だか死にたがってた――。\n　そう続けようとしたところで、かなたの声帯は震えを止める。\n　これ以上は言ってはいけない。漠然と、そんな気がしたのだ。\n「かなた君？」\n　言葉の詰まったかなたへ、神父が優しく名前を呼ぶ。\n　もちろん、急かすわけではない。温かい心配の声である。\n　だが、その上で神父はこう聞いた。\n「かなた君は彼と、一緒に死にたかったのですか？」\n　どくん。心臓が大きく跳ねる。\n　言ってもいないことと、その先のこと。\n　自分でもわかりきっていなかったことを、両方完璧に当てられた。\n　心臓の奥の心の深くに、直接指を入れられたみたいだ。\n　喉が、渇く。口が、開く。\n　そうだ、告解を。その為に僕は、ここに来たのだから。\n「僕、は」\n　想像する。僕に似た人の死を。\n　夕焼けを背に浮かべた、蠱惑的な笑顔を。\n　差し伸べられた手の温みと冷たさに、心が満たされる感覚を。\n　全身を撫ぜて蕩かすような、甘やかな声で呼びかけられるのを。\n　馨しく香る終わりの匂いが鼻孔を満たして、純白が血濡れるその姿を。\n「大丈夫ですよ」\n　ぐちゃり。誰かが息絶えた気がした。\n　神父の声に、かなたははっと顔を上げる。\n「死に惹かれることはよくあることです。ですが、貴方は生きている。それが、何よりの答えなのです」\n「ぁ……」\n　それが、何よりの答え。\n　分かる気がする。気がするだけかもしれない。\n　それでも、抱きしめるよう紡がれた言葉に、重くのしかかった罪悪感は怖いくらいに無くなった。\n「では、最後に許しの言葉を」\n　それはもう、不思議なくらいに。\n　感情を何かで、綺麗さっぱり抜き取られてしまったように。\n　違和感すら感じない違和感に、かなたは気付けないままに。\n　ただ、恐る恐るぼんやりと生じた疑問を口にした。\n「その前に、一つだけ。神父さまは、死にたいと思ったことがありますか？」\n　かなたの問いに、神父はゆっくりと手を組んだ。\n　唇がにんまりと、三日月に歪んだように思えた。声がずんと、深みを増す。\n「ふふ、内緒です。ですが、どうしても気になるのなら……」\n　いずれ神様に、聞いてみてください。\n　冗談めかして、神父さまはそう言った。\n　その後、神さまは何も教えてはくれなかった。\n　神父さまももちろん、教えてはくれなかった。\n　教えてくれる誰かがいるとしたら、それはきっと――。\n"};
/* END LOCAL TEXT DATA */
// #endregion
