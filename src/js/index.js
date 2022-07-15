import domContentLoaded from 'dom-content-loaded';
import DocumentOutliner from 'document-outliner';
import topPage from './top';
import polyfill from './lib/polyfill';
import navigation from './navigation';
import animation from './animation';
import edit from './edit';

/**
 * スタイルの読み込み
 */
import 'normalize.css/normalize.css';
import '../scss/site.scss';
import {
  alertUnload,
  externalLinks, inView, lazyLoad,
  linkMatchLocation, modalVideo, openStreetMap, pdfPreview,
  scrollHint, scrollTo, smartPhoto,
  validator,
} from './lib/build-in'; // スタイル読み込み

/**
 * Root
 */
window.root = '/';

/**
 * BuildInJs
 * ToDo: 使わない組み込みJSはコメントアウト
 */
if (window.ACMS === undefined) {
  window.dispatch = (context) => {
    validator(context);
    linkMatchLocation(context);
    externalLinks(context);
    scrollTo(context);
    alertUnload(context);
    smartPhoto(context);
    lazyLoad(context);
    inView(context);
    modalVideo(context);
    scrollHint(context);
    // googleMap(context);
    openStreetMap(context);
    // datePicker(context);
    // postInclude(context);
    pdfPreview(context);
    // focusedImage(context);
  };

  if (document.querySelector('.js-outline')) {
    const outliner = new DocumentOutliner('.js-outline');
    outliner.makeList('.js-outline-yield', {
      link: true,
      listType: 'ol',
      listClassName: 'outline-list',
      itemClassName: 'outline-item',
      linkClassName: 'scrollTo',
      anchorName: 'heading-$1',
      levelLimit: '3',
      exceptClass: 'js-except',
    });
  }
  window.dispatch(document);
} else {
  edit();
}

// JSが有効か判断する
$('html').removeClass('no-js').addClass('js');

polyfill();// ポリフィル
animation(); // アニメーション
topPage(); // トップページ
navigation(); // ナビゲーション

/**
 * Content Ready
 */
domContentLoaded(() => {
  $.fn.delayAddClass = function (className, delay) { // eslint-disable-line func-names
    return $(this).delay(delay).queue(function (next) { // eslint-disable-line func-names
      $(this).addClass(className);
      next();
    });
  };
  $.fn.delayRemoveClass = function (className, delay) { // eslint-disable-line func-names
    return $(this).delay(delay).queue(function (next) { // eslint-disable-line func-names
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
