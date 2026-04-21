document.addEventListener('DOMContentLoaded', () => {
  const snap = document.getElementById('snap');
  const fronts = document.querySelectorAll('.layer-front');
  const sections = document.querySelectorAll('section');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  
  let currentIndex = 0;

  // 1. ブラックライト（覗き窓）の制御
  function handleMove(e) {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (!x || !y) return;
    
    // PCでは少し大きめの窓、スマホでは指が隠れないサイズに
    const size = window.innerWidth > 768 ? '160px' : '110px';
    const blur = window.innerWidth > 768 ? '250px' : '200px';

    fronts.forEach(el => {
      el.style.setProperty('--mask-x', `${x}px`);
      el.style.setProperty('--mask-y', `${y}px`);
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

  snap.addEventListener('mousemove', handleMove);
  snap.addEventListener('touchstart', handleMove, {passive: true});
  snap.addEventListener('touchmove', handleMove, {passive: true});
  snap.addEventListener('touchend', handleEnd);
  snap.addEventListener('mouseleave', handleEnd);

  // 2. スマホ用ナビゲーションボタン制御
  function updateNav() {
    if(!prevBtn || !nextBtn) return;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === sections.length - 1;
    
    sections.forEach((s, i) => {
      s.classList.toggle('is-active', i === currentIndex);
    });

    // スムーズに該当セクションへ移動
    const target = sections[currentIndex];
    snap.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  }

  if(nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < sections.length - 1) {
        currentIndex++;
        updateNav();
      }
    });
  }

  if(prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateNav();
      }
    });
  }

  // 3. PC用：スクロール位置からインデックスを逆引きしてアニメーション発火
  snap.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
      const index = Math.round(snap.scrollTop / window.innerHeight);
      if (index !== currentIndex) {
        currentIndex = index;
        sections.forEach((s, i) => s.classList.toggle('is-active', i === currentIndex));
        updateNav();
      }
    }
  });
});