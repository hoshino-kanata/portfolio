document.addEventListener('DOMContentLoaded', () => {
  const fronts = document.querySelectorAll('.layer-front');
  
  // 1. ブラックライト（覗き窓）の制御
  function handleMove(e) {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (x === undefined || y === undefined) return;
    
    // PCでは少し大きめの窓、スマホでは指が隠れないサイズに
    const size = window.innerWidth > 768 ? '160px' : '110px';
    const blur = window.innerWidth > 768 ? '250px' : '200px';

    fronts.forEach(el => {
      // 縦スクロールに対応するため、各レイヤーごとの「要素内でのマウス座標」を計算します
      const rect = el.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      el.style.setProperty('--mask-x', `${relX}px`);
      el.style.setProperty('--mask-y', `${relY}px`);
      el.style.setProperty('--mask-size', size);
      el.style.setProperty('--mask-blur', blur);
    });
  }

  function handleEnd() {
    fronts.forEach(el => {
      el.style.setProperty('--mask-size', `100%`);
      el.style.setProperty('--mask-blur', `0%`);
    });
  }

  // 画面全体でマウスやタッチの動きを監視します
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchstart', handleMove, {passive: true});
  window.addEventListener('touchmove', handleMove, {passive: true});
  window.addEventListener('touchend', handleEnd);
  document.body.addEventListener('mouseleave', handleEnd);
});