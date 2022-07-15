import scrollToElement from 'scroll-to-element';

export default (context, selector) => {
  const targets = context.querySelectorAll(selector);

  if (targets.length > 0) {
    [].forEach.call(targets, (target) => {
      const href = target.getAttribute('href');
      if (href) {
        target.addEventListener('click', () => {
          if (href.length > 1) {
            scrollToElement(href, {
              offset: 0,
              ease: 'in-out-quad',
              duration: 800,
            });
          } else {
            scrollToElement(document.querySelector('body'), {
              offset: 0,
              ease: 'in-out-quad',
              duration: 800,
            });
          }
        });
      }
    });
  }
};
