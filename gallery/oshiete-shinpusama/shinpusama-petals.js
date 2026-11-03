/* ==========================================================
   教えて神父さま — 漂う紙片・コイン・星のかけら（three.js / ES module）
   ----------------------------------------------------------
   もとは花びらでした。ERAの硬質な紙面に合わせて、
   「告解室に舞い落ちる紙きれ／献金のコイン／砕けた星」に作り替えています。

   HTML 側の importmap で three を解決しています。
   ES module なので、ローカルでファイルを直接開くと読み込めません
   （サーバー経由なら問題ありません）。
   ========================================================== */
import * as THREE from "three";

const canvas = document.getElementById("petals");
const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight,false);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, innerWidth/innerHeight, .1, 100);
camera.position.set(0,0,12);
const group = new THREE.Group(); scene.add(group);

/* 版画のようにフラットに見えるよう、光はやわらかく正面から */
scene.add(new THREE.HemisphereLight(0xffffff, 0xb6b2aa, 2.0));
const key  = new THREE.DirectionalLight(0xffffff, 1.9); key.position.set(3,6,8);  scene.add(key);
const fill = new THREE.DirectionalLight(0xf2efe8, 1.1); fill.position.set(-6,-3,4); scene.add(fill);

const rnd = (a,b)=>a+Math.random()*(b-a);

/* ----------------------------------------------------------
   ばらまく範囲は、カメラに実際に見えている広さから決めます。
   見える幅は画面の縦横比で変わるので、固定の広さにばらまくと、
   縦長のスマホでは大半が画面の外に出てしまい、数が激減します。
   ---------------------------------------------------------- */
const VFOV = 32 * Math.PI / 180;
let BX = 8, BY = 5;                 /* ばらまく範囲（世界座標の半分の値） */
function updateBounds(){
  const dist = camera.position.z - (-2.3);          /* 代表的な奥行きまでの距離 */
  const half = Math.tan(VFOV / 2) * dist;           /* 見えている高さの半分 */
  const old = BX;
  BY = half * 1.15;
  BX = half * camera.aspect * 1.15;
  return old;
}

/* ---- ① 紙片：まっすぐ断ち切れず、縁が破れて少し反っている ---- */
function scrapGeometry(){
  const W = 1.25, H = 1.75;
  const g = new THREE.PlaneGeometry(W, H, 9, 13);
  const p = g.attributes.position;
  for(let i=0;i<p.count;i++){
    const x = p.getX(i), y = p.getY(i);
    const onEdgeX = Math.abs(Math.abs(x) - W/2) < 1e-4;
    const onEdgeY = Math.abs(Math.abs(y) - H/2) < 1e-4;
    /* 縁だけをぎざぎざに動かして「破れ」をつくる */
    const tear = (onEdgeX || onEdgeY) ? (Math.sin(y*9.1 + x*6.3) * .03 + Math.sin(y*21.7) * .015) : 0;
    const nx = x + (onEdgeX ? Math.sign(x)*tear : 0);
    const ny = y + (onEdgeY ? Math.sign(y)*tear : 0);
    /* ゆるい反り。紙が一方向にだけ巻いている感じ */
    const z = .13*Math.sin((ny/H + .5)*Math.PI) + .07*nx*nx;
    p.setXYZ(i, nx, ny, z);
  }
  g.computeVertexNormals();
  return g;
}

/* ---- ② コイン：献金皿に落ちる薄い円盤 ---- */
function coinGeometry(){
  const g = new THREE.CylinderGeometry(.82, .82, .07, 30, 1);
  g.rotateX(Math.PI/2);   /* 面をカメラ側に向けておく */
  return g;
}

/* ---- ③ 星のかけら：4芒星を薄く押し出したもの ---- */
function shardGeometry(){
  const shape = new THREE.Shape();
  const R = 1.0, r = .3, pts = 4;
  for(let i=0;i<pts*2;i++){
    const rad = i%2 ? r : R;
    const a = (i/(pts*2)) * Math.PI*2 - Math.PI/2;
    const x = Math.cos(a)*rad, y = Math.sin(a)*rad;
    i ? shape.lineTo(x,y) : shape.moveTo(x,y);
  }
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape,{
    depth:.09, bevelEnabled:true, bevelThickness:.03, bevelSize:.03, bevelSegments:1, curveSegments:1,
  });
  g.center();
  return g;
}

const GEO = [scrapGeometry(), coinGeometry(), shardGeometry()];

const mobile = innerWidth < 820;
const COUNT  = mobile ? 13 : 20;

/* 出す順番。0＝紙片 / 1＝コイン / 2＝星のかけら。
   星がいちばん目を引くので、多めに混ぜています。 */
const MIX = [0, 2, 0, 1, 2, 0, 2, 0, 1, 2];

/* 紙・金属・石。質感だけ変えて、色は2つの変数で共有します。 */
const matA = new THREE.MeshStandardMaterial({color:0x9da2cc, roughness:.80, metalness:.04, side:THREE.DoubleSide, transparent:true, opacity:.92});
const matB = new THREE.MeshStandardMaterial({color:0x6f74a4, roughness:.40, metalness:.45, side:THREE.DoubleSide, transparent:true, opacity:.94});
/* 星は面ごとに光り方が変わるよう、平らな陰影＋少し金属寄りに */
const matC = new THREE.MeshStandardMaterial({color:0x9da2cc, roughness:.38, metalness:.38, side:THREE.DoubleSide, flatShading:true, transparent:true, opacity:.94});
const MAT = [matA, matB, matC];

updateBounds();

const bits = [];
for(let i=0;i<COUNT;i++){
  const kind = MIX[i % MIX.length];
  const m = new THREE.Mesh(GEO[kind], MAT[kind]);
  const base = kind === 0 ? rnd(.32,.62) : kind === 1 ? rnd(.22,.40) : rnd(.24,.46);
  m.scale.setScalar(mobile ? base*.82 : base);
  m.position.set(rnd(-BX,BX), rnd(-BY,BY), rnd(-5,.5));
  m.rotation.set(rnd(0,6.28), rnd(0,6.28), rnd(0,6.28));
  m.userData = {
    kind,
    rv:new THREE.Vector3(rnd(-.004,.004), rnd(-.006,.006), rnd(-.003,.003)),
    vy:kind === 1 ? rnd(.0035,.0075) : rnd(.0022,.0055),   /* コインは少し速く落ちる…ように見せて上へ */
    ph:rnd(0,6.28), amp:rnd(.2,.6),
  };
  group.add(m); bits.push(m);
}

let alpha = 1, targetMouse = {x:0,y:0}, mouse = {x:0,y:0};
const api = {
  /* c1 … 紙片と星 ／ c2 … コイン */
  setColor(c1,c2,instant){
    const A = new THREE.Color(c1), B = new THREE.Color(c2);
    if(instant){ matA.color.copy(A); matC.color.copy(A); matB.color.copy(B); return; }
    gsap.to([matA.color, matC.color],{r:A.r,g:A.g,b:A.b,duration:1.4,ease:"power2.inOut"});
    gsap.to(matB.color,{r:B.r,g:B.g,b:B.b,duration:1.4,ease:"power2.inOut"});
  },
  setAlpha(a){ alpha = a; canvas.style.opacity = a; },
  setMouse(x,y){ targetMouse.x = x; targetMouse.y = y; },
};
window.__petalsBind(api);

let t = 0;
function loop(){
  requestAnimationFrame(loop);
  if(alpha <= 0.01) return;
  t += .016;
  mouse.x += (targetMouse.x - mouse.x)*.04;
  mouse.y += (targetMouse.y - mouse.y)*.04;
  group.rotation.y =  mouse.x*.12;
  group.rotation.x = -mouse.y*.08;
  group.position.x =  mouse.x*.4;
  group.position.y =  mouse.y*.3;
  for(const m of bits){
    const u = m.userData;
    m.rotation.x += u.rv.x; m.rotation.y += u.rv.y; m.rotation.z += u.rv.z;
    m.position.y += u.vy;
    m.position.x += Math.sin(t*.6 + u.ph) * (u.kind === 0 ? .005 : .002);   /* 紙はよく流される */
    if(m.position.y > BY){ m.position.y = -BY; m.position.x = rnd(-BX,BX); }
  }
  renderer.render(scene,camera);
}
loop();
window.addEventListener("resize",()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight,false);
  /* 画面の形が変わったら範囲も変わるので、いまの位置を新しい範囲へ移します */
  const oldBX = updateBounds();
  const k = oldBX ? BX / oldBX : 1;
  for(const m of bits){
    m.position.x *= k;
    if(Math.abs(m.position.y) > BY) m.position.y = rnd(-BY, BY);
  }
});
