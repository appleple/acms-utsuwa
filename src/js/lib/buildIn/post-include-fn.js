import $ from 'jquery';

/* eslint func-names: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-new-func: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-param-reassign: 0 */
/* eslint eqeqeq: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-var: 0 */
/* eslint prefer-spread: 0 */
/* eslint prefer-rest-params: 0 */
/* eslint consistent-return: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-shadow: 0 */
/* eslint no-plusplus: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint guard-for-in: 0 */

const getPostData = (context) => {
  const data = {};
  const cnt = {};

  $(':input:not(disabled):not(:radio:not(:checked)):not(:checkbox:not(:checked))', context).each(function () {
    const name = this.name.replace(/\[\]$/, '');
    const isAry = (name !== this.name);
    const val = $(this).val();

    if (isAry && typeof (cnt[name]) === 'undefined') {
      cnt[name] = 0;
    }
    if (typeof (val) === 'string') {
      if (isAry) {
        data[`${name}[${cnt[name]++}]`] = val;
      } else {
        data[name] = val;
      }
    } else {
      for (const i in val) {
        data[`${name}[${cnt[name]++}]`] = val[i];
      }
    }
  });
  return data;
};

const request = (form, method, effect, effectSpeed) => {
  if (typeof (form.returnValue) !== 'undefined') {
    if (!form.returnValue) {
      return false;
    }
  }
  let target = form;
  if (form.target) {
    const $target = $(form.target);
    if ($target.length === 0) {
      return false;
    }
    target = $target[0];
    if ($target.length > 1) {
      const $temp = $(form).parent().find(form.target);
      if ($temp.length > 0) {
        target = $temp[0];
      }
    }
  }
  const data = getPostData(form);
  const reset = (typeof (form.onreset) === 'function') ? form.onreset : new Function();
  const url = form.action ? form.action : window.location.href;
  function fin() {
    $('.js-post-include-disabled', form).removeAttr('disabled').removeClass('js-post-include-disabled');
    reset.apply(form);
  }
  $(':input', form).attr('disabled', 'disabled').addClass('js-post-include-disabled');

  $.ajax({
    type: 'POST',
    url,
    data,
    dataType: 'html',
    error(XMLHttpRequest, textStatus, errorThrown) {
      form.isLastAjaxSuccess = false;
      fin(document);
    },
    success(html, status) {
      form.isLastAjaxSuccess = true;
      if (method == 'replace') {
        switch (effect) {
          case 'fade':
            var $wrapper = $($.parseHTML(`<div>${html}</div>`));
            $(target).fadeOut(effectSpeed, () => {
              $wrapper.hide();
              $(target).replaceWith($wrapper);
              window.dispatch($wrapper.get(0));
              $wrapper.fadeIn(effectSpeed, () => {
                const $contents = $wrapper.children().first().unwrap();
                fin($contents.parent().get(0));
              });
            });
            break;
          case 'slide':
            var $wrapper = $($.parseHTML(`<div>${html}</div>`));
            $(target).slideUp(effectSpeed, () => {
              $wrapper.hide();
              $(target).replaceWith($wrapper);
              window.dispatch($wrapper.get(0));
              $wrapper.slideDown(effectSpeed, () => {
                const $contents = $wrapper.children().first().unwrap();
                fin($contents.parent().get(0));
              });
            });
            break;
          default:
            var $wrapper = $($.parseHTML(`<div>${html}</div>`));
            $(target).replaceWith($wrapper);
            window.dispatch($wrapper.get(0));
            var $contents = $wrapper.children().first().unwrap();
            fin($contents.parent().get(0));
        }
      } else {
        switch (effect) {
          case 'fade':
            $(target).fadeOut(effectSpeed, function () {
              $(this).empty();
              $(this).append(html);
              window.dispatch(this);
              $(this).fadeIn(effectSpeed, () => {
                fin($(target).get(0));
              });
            });
            break;
          case 'slide':
            $(target).slideUp(effectSpeed, function () {
              $(this).empty();
              $(this).append(html);
              window.dispatch(this);
              $(this).slideDown(effectSpeed, () => {
                fin($(target).get(0));
              });
            });
            break;
          default:
            $(target).empty();
            $(target).append(html);
            window.dispatch(target);
            fin($(target).get(0));
        }
      }
    },
  });
};

const ready = (elm, setting) => {
  const method = setting.method;
  const effect = setting.effect;
  const effectSpeed = setting.effectSpeed;
  const delay = setting.delay;

  $(elm).each(function () {
    if (this.onsubmit) {
      this.returnValue = this.onsubmit.apply(this, arguments);
    }
    const form = this;

    setTimeout(() => {
      request(form, method, effect, effectSpeed);
    }, delay);
  });
};

const submit = (elm, setting) => {
  const method = setting.method;
  const effect = setting.effect;
  const effectSpeed = setting.effectSpeed;

  $(elm).each(function () {
    if (this.onsubmit) {
      const func = this.onsubmit;
      this.onsubmit = new Function();
      $(this).submit(function () {
        this.returnValue = func.apply(this, arguments);
        return this.returnValue;
      });
    }
    $(this).submit(function (event) {
      event.preventDefault();

      const form = this;
      request(form, method, effect, effectSpeed);
    });
  });
};

const bottom = (elm, setting) => {
  const method = setting.method;
  const effect = setting.effect;
  const effectSpeed = setting.effectSpeed;
  const offset = setting.offset;

  $(elm).each(function () {
    if (this.onsubmit) {
      this.returnValue = this.onsubmit.apply(this, arguments);
    }
    const obj = $(window);
    const form = this;
    form.execute = false;

    obj.bind('scroll', () => {
      const scrollHeight = $(document).height();
      const scrollPosition = obj.height() + obj.scrollTop();

      if (scrollHeight - scrollPosition <= offset) {
        if (!form.execute) {
          request(form, method, effect, effectSpeed);
        }
        obj.unbind('scroll');
        form.execute = true;
      }
    });
  });
};

const interval = (elm, setting) => {
  const method = setting.method;
  const effect = setting.effect;
  const effectSpeed = setting.effectSpeed;
  const interval = setting.interval;

  $(elm).each(function () {
    if (this.onsubmit) {
      this.returnValue = this.onsubmit.apply(this, arguments);
    }
    const form = this;
    setInterval(() => {
      request(form, method, effect, effectSpeed);
    }, interval);
  });
};

export default {
  ready,
  submit,
  bottom,
  interval,
};
