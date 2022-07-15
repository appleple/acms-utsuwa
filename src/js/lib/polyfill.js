import objectFitImages from 'object-fit-images';
import 'intersection-observer';
import domContentLoaded from 'dom-content-loaded';

export default () => {
  domContentLoaded(() => {
    objectFitImages('img.entry-header-visual-img');

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
  });
};
