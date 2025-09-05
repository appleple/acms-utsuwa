$.fn.delayAddClass = function (className, delay) {
  return $(this).delay(delay).queue(function (next) {
    $(this).addClass(className);
    next();
  });
};
$.fn.delayRemoveClass = function (className, delay) {
  return $(this).delay(delay).queue(function (next) {
    $(this).removeClass(className);
    next();
  });
};

$(() => {
  // JSが有効か判断する
  $('html').removeClass('no-js').addClass('js');

  // アニメーション（js-animation）
  const boxes = document.querySelectorAll('.js-animation');
  const boxesArray = Array.prototype.slice.call(boxes, 0);

  const options = {
    root: null,
    rootMargin: '10% 0px -10% 0px',
    threshold: 0,
  };

  /**
   * 交差したときに呼び出す関数
   * @param entries
   */
  function doWhenIntersect(entries) {
    const entriesArray = Array.prototype.slice.call(entries, 0);
    entriesArray.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show');
      }
    });
  }

  const observer = new IntersectionObserver(doWhenIntersect, options);
  boxesArray.forEach((box) => {
    observer.observe(box);
  });

  // アニメーション（用途：js-animation内で使用する）
  const rows = document.querySelectorAll('.js-animation-row');
  const rowsArray = Array.prototype.slice.call(rows, 0);

  const optionsRow = {
    root: null,
    rootMargin: '10% 0px -10% 0px',
    threshold: 0,
  };

  const observerRow = new IntersectionObserver(doWhenIntersect, optionsRow);
  rowsArray.forEach((box) => {
    observerRow.observe(box);
  });

  // PC表示時のナビゲーション追従
  const $globalNav = document.querySelector('.js-sticky-nav');
  if ($globalNav) {
    const $header = $globalNav.closest('.header');
    const $navWrap = $globalNav.closest('.global-nav');
    const navOffsetTop = $navWrap.offsetTop;
    const navHeight = $globalNav.offsetHeight;
    $header.style.setProperty('--nav-height', `${navHeight}px`);
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > navOffsetTop) {
        $globalNav.classList.add('is-sticky');
      } else {
        $globalNav.classList.remove('is-sticky');
      }
    });
  }

  // モバイル時のナビゲーション
  const $mobileNavTrigger = $('.js-mobile-nav-btn');
  const $mobileNavContents = $('.js-mobile-nav');
  const $menuText = $('.global-nav-mobile-menu-text'); // 追加：テキスト要素を取得

  $mobileNavTrigger.on('click', () => {
    $('body').toggleClass('is-locked');
    const isExpanded = $mobileNavTrigger.attr('aria-expanded') === 'true';

    if (isExpanded) {
      $mobileNavTrigger.attr('aria-expanded', false);
      $mobileNavContents.delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
      $menuText.text('MENU'); // メニューを閉じたら「MENU」に
    } else {
      $mobileNavTrigger.attr('aria-expanded', true);
      $mobileNavContents.delayAddClass('is-active', 1).delayAddClass('is-opened', 100);
      $menuText.text('CLOSE'); // メニューを開いたら「CLOSE」に
    }

    $mobileNavContents.find('[href*="#"]').click(() => {
      $mobileNavTrigger.attr('aria-expanded', false);
      $mobileNavContents.delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
      $('body').removeClass('is-locked');
      $menuText.text('MENU'); // ハッシュリンクで閉じたときも「MENU」に戻す
    });
  });


  // .global-nav-mobile-groupを子に持つ.global-nav-mobile-itemのリンククリックで展開
  $($mobileNavContents).find('.global-nav-mobile-item:has(.global-nav-mobile-group) > a').click(function (event) {
    event.preventDefault();
    $(this).next().fadeToggle();
    $(this).find('.icon-expand').toggleClass('is-close');
  });
});


