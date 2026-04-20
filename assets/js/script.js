/* =============================
   Scroll Fade In
============================= */
const fades = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

fades.forEach(el => observer.observe(el));

/* =============================
   Voice Buttons (Exclusive Play)
============================= */
const voiceBtns = document.querySelectorAll('.voice-circle-btn');
const audios = document.querySelectorAll('.voice-menu audio');

voiceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const targetAudio = document.getElementById(targetId);

    audios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    if (targetAudio) {
      targetAudio.volume = 1.0;
      targetAudio.play();
    }
  });
});

/* =============================
   Record Scroll Rotation
============================= */
const activitySection = document.getElementById("activitySection");
const recordDiscImage = document.getElementById("recordDisc");

window.addEventListener("scroll", () => {
  if (!activitySection || !recordDiscImage) return;

  const rect = activitySection.getBoundingClientRect();
  const stickyTop = 120; 

  if (rect.top <= stickyTop) {
    const scrollProgress = stickyTop - rect.top;
    const rotation = scrollProgress * 0.15; 
    recordDiscImage.style.transform = `rotate(${rotation}deg)`;
  } else {
    recordDiscImage.style.transform = `rotate(0deg)`;
  }
});

/* =============================
   Works Slider Controls
============================= */
const worksSlider = document.getElementById('worksSlider');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');

if (worksSlider && sliderPrev && sliderNext) {
  sliderPrev.addEventListener('click', () => {
    const cardWidth = worksSlider.querySelector('.work-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(worksSlider).gap) || 40;
    worksSlider.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
  });

  sliderNext.addEventListener('click', () => {
    const cardWidth = worksSlider.querySelector('.work-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(worksSlider).gap) || 40;
    worksSlider.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
  });
}

/* =============================
   Reveal Animation (Apple風)
============================= */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold:0.15 });

revealElements.forEach(el=>revealObserver.observe(el));

/* =============================
   Mouse Visual Interaction (パララックス演出) - 軽量化版
============================= */
const mouseLight = document.querySelector('.mouse-light');
const hero = document.querySelector('.hero');
const kiraItems = document.querySelectorAll('.kira-item');

let isTicking = false; // 処理の重複を防ぐためのフラグ

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (mouseLight) {
          mouseLight.style.left = mouseX + 'px';
          mouseLight.style.top = mouseY + 'px';
        }
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const relX = mouseX - centerX;
        const relY = mouseY - centerY;

        kiraItems.forEach(item => {
          const depth = item.getAttribute('data-depth') || 0.1;
          const moveX = relX * depth;
          const moveY = relY * depth;
          item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        isTicking = false;
      });
      isTicking = true;
    }
  });
}

/* =============================
   About キャラクター差分 & モーダル制御（★更新版★）
============================ */
const modalTriggerBtn = document.getElementById('openModalTrigger'); 
const modalOverlay = document.getElementById('imageModal');
const modalCloseBtn = document.getElementById('closeModal');
const modalImgElement = document.getElementById('modalImg');

const characterContainer = modalTriggerBtn ? modalTriggerBtn.closest('.profile-visual') : null;
const currentMainImg = characterContainer ? characterContainer.querySelector('.reference-main-img') : null;
const creditNameElement = document.querySelector('.credit-name'); 

const tooltip = document.getElementById('starTooltip');
const starNavContainer = document.querySelector('.star-nav-container');
const starItems = document.querySelectorAll('.star-item');

let autoPlayTimer;
// ★ 自動再生のスピード：5000(5秒) 
const AUTO_PLAY_INTERVAL = 5000; 

// 1. 画像とテキストを切り替える関数
function switchVariant(item) {
  starItems.forEach(i => i.classList.remove('active'));
  item.classList.add('active');

  // ★ 修正：画面全体の強制スクロールを防ぎ、バーの中の横方向だけを安全に動かす計算式
  const itemRect = item.getBoundingClientRect();
  const containerRect = starNavContainer.getBoundingClientRect();
  const scrollOffset = (itemRect.left - containerRect.left) + (itemRect.width / 2) - (containerRect.width / 2);
  starNavContainer.scrollBy({ left: scrollOffset, behavior: 'smooth' });

  const newSrc = item.getAttribute('data-src');
  const newCredit = item.getAttribute('data-credit');

  if (currentMainImg) {
    currentMainImg.style.opacity = '0';
    if (creditNameElement) creditNameElement.style.opacity = '0';

    setTimeout(() => {
      currentMainImg.src = newSrc;
      currentMainImg.style.opacity = '1';
      
      if (creditNameElement && newCredit) { 
        creditNameElement.textContent = newCredit;
        creditNameElement.style.opacity = '1';
      }
    }, 200);
  }
}

// 2. 自動再生のスタート・ストップ関数
function startAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => {
    const currentIndex = Array.from(starItems).findIndex(item => item.classList.contains('active'));
    let nextIndex = currentIndex + 1;
    if (nextIndex >= starItems.length) nextIndex = 0; // 最後までいったら最初に戻る
    
    switchVariant(starItems[nextIndex]);
  }, AUTO_PLAY_INTERVAL);
}

function stopAutoPlay() {
  clearInterval(autoPlayTimer);
}

// 3. 星マークのイベント登録
if (starItems.length > 0) {
  starItems.forEach(item => {
    // ホバー時：ツールチップを表示し、自動再生を一時停止
    item.addEventListener('mouseenter', () => {
      stopAutoPlay();
      if(tooltip) {
        tooltip.textContent = item.getAttribute('data-name');
        tooltip.classList.add('show');
        
        const updateTooltipPosition = () => {
          // ★ 修正：余白のせいでズレないよう、画面上の絶対座標から正確な中心を計算します
          const itemRect = item.getBoundingClientRect();
          const wrapperRect = tooltip.parentElement.getBoundingClientRect();
          const centerPos = (itemRect.left - wrapperRect.left) + (itemRect.width / 2);
          
          tooltip.style.left = `${centerPos}px`;
        };
        
        updateTooltipPosition();
        starNavContainer.addEventListener('scroll', updateTooltipPosition);
        item.addEventListener('mouseleave', () => {
          starNavContainer.removeEventListener('scroll', updateTooltipPosition);
        }, { once: true });
      }
    });

    // マウスが外れた時：ツールチップを消して、自動再生を再開
    item.addEventListener('mouseleave', () => {
      if(tooltip) tooltip.classList.remove('show');
      startAutoPlay();
    });

    // クリック時：手動で切り替えて、タイマーをリセット
    item.addEventListener('click', () => {
      switchVariant(item);
      startAutoPlay();
    });
  });

  // 初期ロード時に自動再生スタート
  startAutoPlay();
}

// 4. モーダル制御（虫眼鏡）
if (modalTriggerBtn && modalOverlay && currentMainImg) {
  modalTriggerBtn.onclick = (e) => {
    e.stopPropagation(); 
    modalImgElement.src = currentMainImg.src;
    
    modalOverlay.style.display = 'flex';
    setTimeout(() => { modalOverlay.classList.add('active'); }, 10);
    document.body.classList.add('no-scroll');
    modalImgElement.classList.remove('zoomed');
  };

  const closeAction = () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 400);
  };

  modalCloseBtn.onclick = closeAction;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay || e.target.classList.contains('modal-image-container')) {
      closeAction();
    }
  };

  modalImgElement.onclick = (e) => {
    e.stopPropagation();
    modalImgElement.classList.toggle('zoomed');
  };
}

/* =============================
   News 無限ループスライダー
============================= */
const newsTrack = document.getElementById('newsTrack');
const newsCarousel = document.querySelector('.news-carousel');
const newsNav = document.getElementById('newsNav');

if (newsTrack && newsCarousel && newsNav) {
  let slides = Array.from(newsTrack.children);
  const slideCount = slides.length;
  let currentIndex = 1;
  let isDragging = false;
  let startPos = 0;
  let animationID = 0;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  newsTrack.appendChild(firstClone);
  newsTrack.insertBefore(lastClone, slides[0]);
  
  const allSlides = Array.from(newsTrack.children);

  slides.forEach((_, index) => {
    const star = document.createElement('div');
    star.classList.add('nav-star');
    if (index === 0) star.classList.add('active');
    
    star.addEventListener('click', () => {
      currentIndex = index + 1;
      updateSlider();
    });
    newsNav.appendChild(star);
  });
  const stars = document.querySelectorAll('.nav-star');

  function updateSlider(animate = true) {
    if (animate) {
      newsTrack.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
    } else {
      newsTrack.style.transition = 'none'; 
    }
    const offset = -currentIndex * 100;
    newsTrack.style.transform = `translateX(${offset}%)`;

    stars.forEach(s => s.classList.remove('active'));
    let activeIndex = currentIndex - 1;
    if (activeIndex === slideCount) activeIndex = 0; 
    if (activeIndex < 0) activeIndex = slideCount - 1; 
    if (stars[activeIndex]) stars[activeIndex].classList.add('active');
  }

  updateSlider(false);

  newsTrack.addEventListener('transitionend', () => {
    if (allSlides[currentIndex].classList.contains('clone')) {
      newsTrack.style.transition = 'none';
      if (currentIndex === 0) {
        currentIndex = slideCount; 
      } else if (currentIndex === allSlides.length - 1) {
        currentIndex = 1; 
      }
      updateSlider(false);
    }
  });

  function touchStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    newsCarousel.classList.add('is-dragging'); 
    newsTrack.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
  }

  function touchMove(e) {
    if (isDragging) {
      const currentPosition = getPositionX(e);
      const diff = currentPosition - startPos;
      const diffPercent = (diff / newsCarousel.clientWidth) * 100;
      const offset = -currentIndex * 100 + diffPercent;
      newsTrack.style.transform = `translateX(${offset}%)`;
    }
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    newsCarousel.classList.remove('is-dragging');
    
    const transformValue = newsTrack.style.transform;
    const match = transformValue.match(/translateX\(([-0-9.]+)%\)/);
    if (match) {
      const draggedPercent = parseFloat(match[1]);
      const diffPercent = draggedPercent - (-currentIndex * 100);
      if (diffPercent < -15) currentIndex++;
      else if (diffPercent > 15) currentIndex--;
    }
    updateSlider();
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  function animation() {
    if (isDragging) requestAnimationFrame(animation);
  }

  newsCarousel.addEventListener('touchstart', touchStart, { passive: true });
  newsCarousel.addEventListener('touchmove', touchMove, { passive: true });
  newsCarousel.addEventListener('touchend', touchEnd);
  newsCarousel.addEventListener('mousedown', touchStart);
  newsCarousel.addEventListener('mousemove', touchMove);
  window.addEventListener('mouseup', touchEnd); 
}

/* =============================
   Works & News & Profile Modal Logic (共通)
============================= */
const worksModal = document.getElementById('worksModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

const modalTriggers = document.querySelectorAll('.work-card, .topics-body, .profile-trigger');
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', async (e) => {
    e.preventDefault();
    worksModal.classList.add('active');
    document.body.classList.add('no-scroll');
    modalContent.innerHTML = '<div style="text-align:center; padding: 40px;"><p style="color:#aaa;">Loading...</p></div>';

    const url = trigger.getAttribute('data-url');
    if (!url) return;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        modalContent.innerHTML = html;

        // --- 追加：現在の日付を設定 ---
        const dateElement = modalContent.querySelector('#contractDate');
        if (dateElement) {
          const now = new Date();
          const y = now.getFullYear();
          const m = String(now.getMonth() + 1).padStart(2, '0');
          const d = String(now.getDate()).padStart(2, '0');
          dateElement.textContent = `${y} / ${m} / ${d}`;
        }

        // --- 甲のサイン入力機能のセットアップ ---
        const userSignInput = modalContent.querySelector('#userSignInput');
        const userSignDisplay = modalContent.querySelector('#userSignDisplay');
        
        if (userSignInput && userSignDisplay) {
          userSignInput.addEventListener('blur', function() {
            const name = this.value.trim();
            if (name) {
              this.style.display = 'none';
              userSignDisplay.textContent = name;
              userSignDisplay.style.display = 'block';
            }
          });

          userSignDisplay.addEventListener('click', function() {
            this.style.display = 'none';
            userSignInput.style.display = 'block';
            userSignInput.focus();
          });

          userSignInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') this.blur();
          });
        }

        // --- アニメーション要素の監視 ---
        const newFades = modalContent.querySelectorAll(".fade");
        const modalObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            }
          });
        }, { threshold: 0.1 });

        newFades.forEach((el, index) => {
          if (el.classList.contains('spec-item-i')) {
            el.style.transitionDelay = `${index * 0.15}s`;
          }
          modalObserver.observe(el);
        });

      }
    } catch (err) {
      modalContent.innerHTML = `<p>エラーが発生しました。</p>`;
    }
  });
});

// モーダルを閉じる処理
const closeCommonModal = () => {
  if (worksModal) {
    worksModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
};

if (modalClose) modalClose.addEventListener('click', closeCommonModal);
if (worksModal) {
  worksModal.addEventListener('click', (e) => {
    if (e.target === worksModal) closeCommonModal();
  });
}

/* =============================
   Profile Integration Animations
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const pfElements = document.querySelectorAll('.pf-detail-card, .pf-section-title, .pf-link-item, .pf-fanclub-banner');
  
  pfElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    el.style.transition = `all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.1}s`;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      setTimeout(() => {
        el.style.transform = '';
        el.style.transition = '';
      }, 800);
    }, 50);
  });

  const logoObj = document.getElementById('logo-obj');
  if (logoObj && typeof Vivus !== 'undefined') {
    logoObj.addEventListener('load', function() {
      new Vivus('logo-obj', {
        type: 'delayed',    
        duration: 250,      
        animTimingFunction: Vivus.EASE
      }, function (obj) {
        setTimeout(function () {
          obj.reset().play();
        }, 3000); 
      });
    });
  }
});

/* =============================
   額縁スクロール：中身の同期
============================ */
window.addEventListener('scroll', () => {
  const container = document.getElementById('stickyContainer');
  const content = document.getElementById('movingContent');
  const record = document.getElementById('recordDisc');
  const activitySec = document.getElementById('activity');
  
  if (!container || !content) return;

  const rect = container.getBoundingClientRect();
  const winH = window.innerHeight;

  let progress = -rect.top / (rect.height - winH);
  progress = Math.max(0, Math.min(1, progress));

  const contentH = content.offsetHeight;
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    const viewH = winH * 0.85; 
    const scrollRange = contentH - viewH; 
    content.style.transform = `translateY(${-progress * scrollRange}px)`;
  } else {
    const viewH = winH * 0.82; 
    const scrollRange = contentH - viewH; 
    content.style.transform = `translateY(${-progress * scrollRange}px)`;
  }

  if (record && activitySec) {
    const activityRect = activitySec.getBoundingClientRect();
    const viewCenter = winH / 2;

    if (activityRect.top < viewCenter) {
      const activityProgress = viewCenter - activityRect.top;
      record.style.transform = `rotate(${activityProgress * 0.15}deg)`;
    } else {
      record.style.transform = `rotate(0deg)`;
    }
  }
});

/* =============================
   ステンドグラス ＆ H2見出し：同期アニメーション
============================ */
document.addEventListener("DOMContentLoaded", function() {
  const decos = document.querySelectorAll('.stained-glass-deco');
  const aboutSection = document.getElementById('about');
  const fixedHeading = document.getElementById('fixedHeading'); 

  if (decos.length === 0 || !aboutSection) return;

  let currentState = 'hidden';

  function handleDecoAnimation() {
    const aboutRect = aboutSection.getBoundingClientRect();
    const triggerIn = 300; 
    const triggerOut = 400; 

    if (aboutRect.top <= triggerIn) {
      if (currentState !== 'active') {
        decos.forEach(deco => {
          deco.classList.remove('is-leaving');
          deco.classList.add('is-active');
        });
        
        if (fixedHeading) {
          fixedHeading.classList.remove('is-leaving');
          fixedHeading.classList.add('is-active');
        }
        currentState = 'active';
      }
      
    } else if (aboutRect.top > triggerOut) {
      if (currentState === 'active') {
        decos.forEach(deco => {
          deco.classList.remove('is-active');
          deco.classList.add('is-leaving');
        });
        
        if (fixedHeading) {
          fixedHeading.classList.remove('is-active');
          fixedHeading.classList.add('is-leaving');
        }
        
        currentState = 'leaving';
        
        setTimeout(() => {
          if (currentState === 'leaving') {
            decos.forEach(d => d.classList.remove('is-leaving'));
            if (fixedHeading) {
              fixedHeading.classList.remove('is-leaving');
              fixedHeading.textContent = ''; 
            }
            currentState = 'hidden';
          }
        }, 600); 
      }
    }
  }

  window.addEventListener('scroll', handleDecoAnimation);
  handleDecoAnimation();
});

/* =============================
   H2タイトルの動的スライドイン切替 (文字の更新)
============================= */
window.addEventListener('scroll', () => {
  const fixedHeading = document.getElementById('fixedHeading');
  const aboutSection = document.getElementById('about');
  if (!fixedHeading || !aboutSection) return;

  const sections = document.querySelectorAll('.frame-moving-body section');
  let currentTitle = '';
  const winCenter = window.innerHeight / 2;

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= winCenter && rect.bottom >= winCenter) {
      const h2 = sec.querySelector('h2');
      if (h2) currentTitle = h2.textContent.trim();
    }
  });

  if (currentTitle && fixedHeading.textContent !== currentTitle) {
    const isShowing = fixedHeading.classList.contains('is-active');
    
    fixedHeading.classList.remove('is-active');
    void fixedHeading.offsetWidth; 
    fixedHeading.textContent = currentTitle;
    
    if (isShowing) {
      fixedHeading.classList.add('is-active');
    }
  }
});

/* =============================
   Activity Accordion
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      
      // 開いている他の年を自動で閉じる場合は、下の2行のコメントを外します
      // const activeItem = document.querySelector('.accordion-item.active');
      // if (activeItem && activeItem !== item) activeItem.classList.remove('active');
      
      // クリックした年の開閉を切り替える
      item.classList.toggle('active');
    });
  });
});

/* =============================
   Copy Button Logic (絶対動くコピペ機能)
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const copyToast = document.getElementById('copyToast');
  let toastTimer;

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); 
      e.stopPropagation(); // ★クリックの干渉を強制ブロック
      
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      const copyToClipboard = async () => {
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            // ★ローカル環境用のテキストエリアを画面の裏に「固定」してエラーを防ぐ
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "-9999px";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }
          
          if (copyToast) {
            copyToast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => copyToast.classList.remove('show'), 2000);
          }

          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          btn.style.color = '#8ecbd6'; 
          setTimeout(() => {
              btn.innerHTML = originalHTML;
              btn.style.color = '';
          }, 2000);

        } catch (err) {
          console.error('コピー失敗:', err);
        }
      };
      
      copyToClipboard();
    });
  });
});

/* =============================
   イラストのスクロール追従（Sticky代替の魔法）
============================= */
window.addEventListener('scroll', () => {
  const gcLeft = document.querySelector('.gc-left');
  const stickyVisual = document.querySelector('.gc-sticky-visual');
  if (!gcLeft || !stickyVisual) return;

  const leftRect = gcLeft.getBoundingClientRect();
  const stickyTop = window.innerHeight * 0.1;

  if (leftRect.top < stickyTop) {
    const maxScroll = Math.max(0, leftRect.height - (window.innerHeight * 0.7));
    let offset = stickyTop - leftRect.top;
    offset = Math.max(0, Math.min(offset, maxScroll));
    stickyVisual.style.transform = `translateY(${offset}px)`;
  } else {
    stickyVisual.style.transform = `translateY(0px)`;
  }
});

/* =============================
   Master Template Functions
============================= */
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. スクロール時のぽよんアニメーション (.scroll-pop)
  const templateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.scroll-pop').forEach(el => templateObserver.observe(el));

  // 2. フルスクリーンメニューの開閉処理
  const menuTriggers = document.querySelectorAll('.js-menu-open');
  const menuClose = document.getElementById('menuClose');
  const menuWindow = document.getElementById('menuWindow');

  if (menuTriggers.length > 0 && menuClose && menuWindow) {
    menuTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        menuWindow.classList.add('open');
        document.body.style.overflow = 'hidden'; // 背面のスクロールを固定
      });
    });

    menuClose.addEventListener('click', () => {
      menuWindow.classList.remove('open');
      document.body.style.overflow = ''; // スクロール固定を解除
    });
  }

  // 3. Swiperスライダーの初期化設定 (無限ループ & ドラッグ対応)
  if (document.querySelector('.slider-container')) {
    const swiper = new Swiper('.slider-container', {
      loop: true,                     // 無限にスライド
      centeredSlides: true,           // 選択したスライドを常に中央へ
      slidesPerView: 2,               // PCでは中央に1枚、左右に0.5枚ずつ
      spaceBetween: 1,                // グリッド線の幅を1pxに
      grabCursor: true,               // ドラッグ時に手のマークを表示
      navigation: {
        nextEl: '.slider-btn.next',
        prevEl: '.slider-btn.prev',
      },
      pagination: {
        el: '.slider-dots',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      breakpoints: {
        // スマホ画面の時は左右のチラ見せを少し減らす
        0: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 }
      }
    });
  }
});

// Skills専用スライダーの起動設定をこちらに差し替えてください
const skillsSwiper = new Swiper('.skills-slider', {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  grabCursor: true,
  
  /* ★画面幅に応じた枚数調整をより細かくします */
  breakpoints: {
    0: {
      slidesPerView: 1.2, // スマホ：中央1枚＋左右チラ見せ
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 2.2, // タブレット〜ノートPC
      spaceBetween: 40,
    },
    1400: {
      slidesPerView: 3,   // 大画面：安定して3枚表示
      spaceBetween: 60,
    }
  },
  
  navigation: {
    nextEl: '#skillsNext',
    prevEl: '#skillsPrev',
  },
  pagination: {
    el: '#skillsDots',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">✦</span>';
    },
  },
});