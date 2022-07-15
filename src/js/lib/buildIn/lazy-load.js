import lozad from 'lozad';
import './lazy-load.scss';

export default (selector, options) => {
  const defaultOptions = {
    rootMargin: '10px 0px', // syntax similar to that of CSS Margin
    threshold: 0.1, // ratio of element convergence
    loaded: (el) => {
      el.addEventListener('load', () => {
        if (el.tagName === 'IMG') {
          const img = new Image();
          img.onload = () => {
            el.classList.add('loaded');
          };
          img.src = el.getAttribute('src');
        } else {
          el.classList.add('loaded');
        }
      });
      setTimeout(() => {
        el.classList.add('loading');
      }, 100);
    },
  };

  const observer = lozad(selector, Object.assign(defaultOptions, options));
  observer.observe();
};
