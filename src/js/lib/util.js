export const getScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
};

export const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

export const getUniqId = () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

export const addCSSToElement = (element, css) => {
  const id = getUniqId();
  element.setAttribute('id', id);
  document.styleSheets[0].insertRule(`#${id}{${css}}`);
};

export const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

export const removeElement = (element) => {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

export const triggerEvent = (el, eventName, options) => {
  let event;
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, { cancelable: true });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, options);
  }
  el.dispatchEvent(event);
}

export const closest = (node, selector) => {
  // IEや一部ブラウザでは.closet()が実装されていないので自前も用意
  return (node.closest || function(_selector) {
    do {
      // nodeとselectorがマッチしたら返す
      if ((node.matches || node.msMatchesSelector).call(node, _selector)) {
        return node;
      }
      // マッチしなかったら親要素を代入
      node = node.parentElement || node.parentNode;
    } while (node !== null && node.nodeType === 1);

    return null;
  }).call(node, selector);
}
