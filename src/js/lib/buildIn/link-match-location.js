const stayClass = 'stay';

const matches = (el, selector) => (0
    || el.matches || el.matchesSelector || el.msMatchesSelector
    || el.mozMatchesSelector || el.webkitMatchesSelector
    || el.oMatchesSelector).call(el, selector);

const getHref = (elm) => {
  if (matches(elm, 'a')) {
    return elm.getAttribute('href');
  }
  const a = elm.querySelectorAll('a');
  if (a.length === 0) {
    return false;
  }
  return a[0].getAttribute('href');
};

const match = (elm, mode) => {
  let href = getHref(elm);
  let locationHref = document.location.href;
  if (!href) {
    return;
  }
  href = href.replace(/https?/, '');
  locationHref = locationHref.replace(/https?/, '');
  if (mode === 'part') {
    if (locationHref.indexOf(href) === 0 || encodeURI(locationHref).indexOf(href) === 0) {
      elm.classList.add(stayClass);
    }
  } else if (mode === 'full') {
    if (locationHref === href || encodeURI(locationHref) === href) {
      elm.classList.add(stayClass);
    }
  }
};

const linkMatch = (context, selector) => {
  const links = context.querySelectorAll(selector);
  if (links.length > 0) {
    [].forEach.call(links, (link) => {
      match(link, 'part');
    });
  }
};

const linkMatchFull = (context, selector) => {
  const links = context.querySelectorAll(selector);
  if (links.length > 0) {
    [].forEach.call(links, (link) => {
      match(link, 'full');
    });
  }
};

const linkMatchContain = (context, selector) => {
  const links = context.querySelectorAll(selector);
  if (links.length > 0) {
    [].forEach.call(links, (link) => {
      if (document.location.pathname.indexOf(link.getAttribute('data-match')) !== -1) {
        link.classList.add(stayClass);
      }
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { linkMatch, linkMatchFull, linkMatchContain };
