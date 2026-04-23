document.addEventListener('DOMContentLoaded', () => {
    // ── スライダーのインタラクティブ設定 ──
    const slider = document.getElementById('slider1');
    const sliderVal = document.getElementById('slider1-val');

    if (slider && sliderVal) {
        slider.addEventListener('input', () => {
            const v = slider.value;
            sliderVal.textContent = v;
            // CSS変数 --pct を更新して背景のグラデーション位置を調整
            slider.style.setProperty('--pct', v + '%');
        });
    }

    // ── スクロール時のふわっと表示（Scroll Reveal） ──
    const reveals = document.querySelectorAll('section, .project-card, .card');
    
    // 要素が表示された時に追加するスタイル（CSS側に記述がないため、動的に追加またはクラスで制御）
    // 元のHTMLにインラインCSSがない場合を考慮し、最低限の監視設定のみ。
    const observerOptions = {
        threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    reveals.forEach(el => {
        // 初期状態で reveal クラスを付与
        el.classList.add('reveal');
        observer.observe(el);
    });
});