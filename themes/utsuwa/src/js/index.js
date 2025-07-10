import domContentLoaded from 'dom-content-loaded';
import animation from './animation';
import navigation from './navigation';
import toggle from './toggle';

/**
 * スタイルの読み込み
 */
import 'normalize.css/normalize.css';
import '../scss/site.scss';

// JSが有効か判断する
$('html').removeClass('no-js').addClass('js');

(async () => {
  if (!('scrollBehavior' in document.documentElement.style)) {
    await import(/* webpackChunkName: "scroll-behavior-polyfill" */ 'scroll-behavior-polyfill');
  }
})();

animation(); // アニメーション
navigation(); // ナビゲーション
toggle(); // アコーディオン

/**
 * Content Ready
 */
domContentLoaded(() => {
  $.fn.delayAddClass = function (className, delay) {
    return $(this)
      .delay(delay)
      .queue(function (next) {
        $(this).addClass(className);
        next();
      });
  };
  $.fn.delayRemoveClass = function (className, delay) {
    return $(this)
      .delay(delay)
      .queue(function (next) {
        $(this).removeClass(className);
        next();
      });
  };

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

  // 固定CTA
  $(window).on('load scroll', () => {
    fixElement();
  });
});
