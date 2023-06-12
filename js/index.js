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

  // モバイル時のナビゲーション
  const $mobileNavTrigger = $('.js-mobile-nav-btn');
  const $mobileNavContents = $('.js-mobile-nav');
  $($mobileNavTrigger).click(() => {
    $('body').toggleClass('is-locked');
    const $mobileNavAttr = $($mobileNavTrigger).attr('aria-expanded');
    if ($mobileNavAttr === 'true') {
      $($mobileNavTrigger).attr('aria-expanded', false);
      $($mobileNavContents).delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
    } else {
      $($mobileNavTrigger).attr('aria-expanded', true);
      $($mobileNavContents).delayAddClass('is-active', 1).delayAddClass('is-opened', 100);
    }
    $($mobileNavContents).find('[href*="#"]').click(() => {
      $($mobileNavTrigger).attr('aria-expanded', false);
      $($mobileNavContents).delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
      $('body').removeClass('is-locked');
    });
  });

  $($mobileNavContents).find('.is-expand > a').click(function (event) {
    event.preventDefault();
    $(this).next().fadeToggle();
    $(this).find('.icon-expand').toggleClass('is-close');
  });

  // 固定CTA
  function fixElement() {
    const $fixArea = $('.js-sticky-area');
    const $fix = $('.js-sticky');

    if ($fixArea.length && $fix.length) {
      const fixTop = $fixArea.offset().top;
      const fixEnd = $fixArea.height() + $fixArea.offset().top;
      const winScroll = $(window).scrollTop();
      const winheight = $(window).height();

      if (winScroll < fixTop - winheight) {
        $fix.delayRemoveClass('is-show', 1).delayRemoveClass('is-active', 20);
      } else if (winScroll > fixEnd - winheight) {
        $fix.delayRemoveClass('is-show', 1).delayRemoveClass('is-active', 20);
      } else {
        $fix.delayAddClass('is-active', 1).delayAddClass('is-show', 10);
      }
    }
  }
  $(window).on('load scroll', () => {
    fixElement();
  });
});
