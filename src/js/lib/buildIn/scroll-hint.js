import ScrollHint from 'scroll-hint';
import 'scroll-hint/css/scroll-hint.css';

export default (context, options = {}) => {
  const defaultOptions = {
    suggestClass: 'is-active',
    scrollableClass: 'is-scrollable',
    scrollableRightClass: 'is-right-scrollable',
    scrollableLeftClass: 'is-left-scrollable',
    scrollHintClass: 'scroll-hint',
    scrollHintIconClass: 'scroll-hint-icon',
    scrollHintIconAppendClass: 'scroll-hint-icon-white',
    scrollHintIconWrapClass: 'scroll-hint-icon-wrap',
    scrollHintText: 'scroll-hint-text',
    remainingTime: -1,
    scrollHintBorderWidth: 10,
    enableOverflowScrolling: true,
    suggestiveShadow: false,
    applyToParents: false,
    offset: 0,
    i18n: {
      scrollable: 'スクロールできます',
    },
  };

  new ScrollHint(context, Object.assign(defaultOptions, options)); // eslint-disable-line no-new
};
