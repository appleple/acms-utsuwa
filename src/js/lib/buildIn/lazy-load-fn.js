import lozad from 'lozad';

export default (selector, isLazy, run) => {
  const observer = lozad(selector, {
    loaded: (el) => {
      if (isLazy(el)) {
        run(el);
      }
    },
  });
  observer.observe();
  [].forEach.call(document.querySelectorAll(selector), (item) => {
    if (!isLazy(item)) {
      run(item);
    }
  });
};
