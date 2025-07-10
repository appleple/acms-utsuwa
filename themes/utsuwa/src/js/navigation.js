import domContentLoaded from 'dom-content-loaded';

/* eslint func-names: 0 */

export default () => {
// ナビゲーション
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

  domContentLoaded(() => {
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
  });
};
