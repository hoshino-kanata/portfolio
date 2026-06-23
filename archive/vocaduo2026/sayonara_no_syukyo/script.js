"use strict";
/* ═══════════════════════════════════════════════════
   ① 動画:YouTubeのIDをここに入れると埋め込みに切替。
      空のままなら assets/mv.mp4 をローカル再生します。
   ═══════════════════════════════════════════════════ */
const YOUTUBE_ID = "";   // 例: "dQw4w9WgXcQ"
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
    v.poster = "assets/poster.jpg";
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