import domContentLoaded from 'dom-content-loaded';
import lazyLoadJs from './buildIn/lazy-load';
import lazyLoadFn from './buildIn/lazy-load-fn';
import alertUnloadFn from './buildIn/alert-unload';
import scrollToFn from './buildIn/scroll-to';
import validatorFn from './buildIn/validator';
import { linkMatch, linkMatchFull, linkMatchContain } from './buildIn/link-match-location';

/**
 * Validator
 * @param context
 * @param selector
 */
const validator = (context, selector) => {
  domContentLoaded(async () => {
    const querySelector = selector || 'form.js-validator';
    const targets = context.querySelectorAll(querySelector);

    if (targets.length > 0) {
      [].forEach.call(targets, (target) => {
        validatorFn(target);
      });
    }
  });
};

/**
 * LinkMatchLocation
 * @param context
 */
const linkMatchLocation = (context) => {
  domContentLoaded(() => {
    linkMatch(context, '.js-link_match_location'); // 部分一致
    linkMatchFull(context, '.js-link_match_location-full'); // 完全一致
    linkMatchContain(context, '.js-link_match_location-contain'); // data-match属性でカスタム判定
    // ToDo: ブログ、カテゴリ、エントリのマッチも実装する
  });
};

/**
 * ExternalLinks
 * @param context
 */
const externalLinks = (context) => {
  const selector = 'a:not([target]):not([href^="javascript"]):not([href^="tel"])';
  const targets = context.querySelectorAll(selector);
  const innerlinkPtn = new RegExp(`${window.location.hostname}(:\\d+)*`);
  [].forEach.call(targets, (target) => {
    const href = target.getAttribute('href');
    if (innerlinkPtn.exec(href)) {
      return;
    }
    if (!/^(https?)?:/.test(href)) {
      return;
    }
    target.setAttribute('target', '_blank');
    target.setAttribute('rel', 'noopener noreferrer');
  });
};

/**
 * ScrollTo
 * @param context
 * @param selector
 */
const scrollTo = (context, selector) => {
  domContentLoaded(async () => {
    const querySelector = selector || '.scrollTo';
    const target = context.querySelector(querySelector);
    if (target) {
      scrollToFn(context, querySelector);
    }
  });
};

/**
 * AlertUnload
 * @param context
 * @param selector
 */
const alertUnload = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-unload_alert';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      alertUnloadFn(targets);
    }
  });
};

/**
 * SmartPhoto
 * @param context
 * @param selector
 * @param options
 */
const smartPhoto = (context, selector = '', options = {}) => {
  domContentLoaded(async () => {
    const querySelector = selector || 'a[data-rel^=SmartPhoto],.js-smartphoto';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      const { default: run } = await import(/* webpackChunkName: "smart-photo" */'./buildIn/smart-photo');
      run(targets, options);
    }
  });
};

/**
 * LazyLoad
 * @param context
 * @param selector
 * @param options
 */
const lazyLoad = (context, selector = '', options = {}) => {
  domContentLoaded(() => {
    const querySelector = selector || '.js-lazy-load';
    if (context.querySelector(querySelector)) {
      lazyLoadJs(querySelector, options);
    }
  });
};

/**
 * InView
 */
const inView = (context, selector) => {
  domContentLoaded(() => {
    const querySelector = selector || '.js-lazy-contents';
    lazyLoadFn(
      querySelector,
      () => true,
      (item) => {
        const type = item.getAttribute('data-type');
        if (!type) {
          return;
        }
        const script = document.createElement(type);
        item.attributes.forEach((data) => {
          const matches = data.name.match(/^data-(.*)/);
          if (matches && matches[1] !== 'type') {
            script[matches[1]] = data.value;
          }
        });
        item.appendChild(script);
      },
    );
  });
};

/**
 * ModalVideo
 * @param context
 * @param selector
 * @param options
 */
const modalVideo = (context, selector = '', options = {}) => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-modal-video';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      const { default: run } = await import(/* webpackChunkName: "modal-video" */'./buildIn/modal-video');
      run(targets, options);
    }
  });
};

/**
 * ScrollHint
 * @param context
 */
const scrollHint = (context) => {
  domContentLoaded(async () => {
    if (context.querySelector('.js-scroll-hint') || context.querySelector('.js-table-unit-scroll-hint')) {
      const { default: run } = await import(/* webpackChunkName: "scroll-hint" */'./buildIn/scroll-hint');
      run('.js-scroll-hint', {});
      run('.js-table-unit-scroll-hint', { applyToParents: true });
    }
  });
};

/**
 * GoogleMap
 * @param context
 * @param selector
 */
const googleMap = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '[class^="column-map-"]>img:not(.js-s2d-ready),.js-s2d-ready';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(querySelector, (elm) => elm.getAttribute('data-lazy') === 'true', async (item) => {
        const { default: run } = await import(/* webpackChunkName: "google-map" */'./buildIn/google-map');
        run(item);
      });
    }
  });
};

/**
 * OpenStreetMap
 * @param context
 * @param selector
 */
const openStreetMap = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-open-street-map';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(querySelector, (elm) => elm.getAttribute('data-lazy') === 'true', async (item) => {
        const { default: run } = await import(/* webpackChunkName: "open-street-map" */'./buildIn/open-street-map');
        run(item);
      });
    }
  });
};

/**
 * DatePicker
 * @param context
 * @param selector
 */
const datePicker = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-datepicker2';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(querySelector, () => true, async (item) => {
        const { default: run } = await import(/* webpackChunkName: "date-picker" */'./buildIn/date-picker');
        run(item);
      });
    }
  });
};

/**
 * PostInclude
 * @param context
 */
const postInclude = (context) => {
  domContentLoaded(async () => {
    const targets = context.querySelectorAll('.js-post_include,.js-post_include-ready,.js-post_include-bottom,.js-post_include-interval');
    if (targets.length > 0) {
      const { default: run } = await import(/* webpackChunkName: "post-include" */'./buildIn/post-include');
      run(context, {
        postIncludeOnsubmitMark: '.js-post_include',
        postIncludeOnreadyMark: '.js-post_include-ready',
        postIncludeOnBottomMark: '.js-post_include-bottom',
        postIncludeOnIntervalMark: '.js-post_include-interval',
        postIncludeMethod: 'replace', // ( 'swap' | 'replace' )
        postIncludeEffect: 'fade', // ( 'slide' | 'fade' | '' )
        postIncludeEffectSpeed: 'fast', // ( 'slow' | 'fast' )
        postIncludeOffset: 60,
        postIncludeReadyDelay: 0,
        postIncludeIntervalTime: 20000,
        postIncludeArray: [{
          //        'mark'           : '.js-post_include-original',
          //        'type'           : 'submit',
          //        'method'         : 'swap',
          //        'effect'         : 'slide',
          //        'effectSpeed'    : 'slow'
        }],
      });
    }
  });
};

/**
 * PdfPreview
 * @param context
 * @param selector
 */
const pdfPreview = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-pdf-viewer';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(querySelector, () => true, async (item) => {
        const { default: run } = await import(/* webpackChunkName: "pdf-preview" */'./buildIn/pdf-preview');
        run(item);
      });
    }
  });
};

/**
 * FocusedImage
 * @param context
 * @param selector
 */
const focusedImage = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-focused-image';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(querySelector, () => true, async (item) => {
        const { default: run } = await import(/* webpackChunkName: "focused-image" */'./buildIn/focused-image');
        run(item);
      });
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export {
  validator, linkMatchLocation, externalLinks, scrollTo,
  alertUnload, smartPhoto, lazyLoad, inView,
  modalVideo, scrollHint, googleMap, openStreetMap,
  datePicker, postInclude, pdfPreview, focusedImage,
};
