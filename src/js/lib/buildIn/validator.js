import operator from './validator-operator';

class Validator {
  constructor(elm) {
    this.validators = [];
    this.checked = [];

    this.extract(elm);
    this.setValidator(elm);
  }

  setValidator(elm) {
    const inputs = Validator.getInput(elm);
    [].forEach.call(inputs, (input) => {
      let name = input.getAttribute('name');
      if (!name) {
        return;
      }
      name = name.replace(/\[[\d]*\]/, '');

      const event = () => {
        const validator = this.validators[name];
        const matches = input.getAttribute('name').match(/\[([\d]+)\]/);
        let success = true;
        let number = false;
        if (matches) {
          number = matches[1]; // eslint-disable-line prefer-destructuring
        }
        if (validator && validator.length > 0) {
          validator.forEach((obj) => {
            if (!obj || !obj.validator) {
              return;
            }
            if (!operator.isFunction(obj.validator) || obj.validator.substring(0, 4) === 'all_') {
              return;
            }
            let valid = true;
            obj.number = parseInt(number, 10); // eslint-disable-line no-param-reassign

            if (obj.type === 'checkbox' || obj.type === 'radio') {
              if (obj.validator === 'required') {
                let v = false;
                const items = document.querySelectorAll(`[name^="${obj.field}"]`);
                [].forEach.call(items, (item) => {
                  if (item.checked) {
                    v = true;
                  }
                });
                valid = v;
              } else {
                return;
              }
            } else {
              valid = operator[obj.validator](input.value, obj.arg, input);
            }
            Validator.label(obj, valid);
            success = success && valid;
          });
        }
        Validator.toggleClass(name, success);
      };

      input.addEventListener('blur', event);
      input.addEventListener('input', event);
      input.addEventListener('change', event);
    });
  }

  all(elm) {
    const inputs = Validator.getInput(elm);
    let res = true;

    this.checked.forEach((obj) => {
      const input2 = Array.prototype.filter.call(inputs, (input) => input.getAttribute('name') === obj.field || input.getAttribute('name') === `${obj.field}[]`);
      const success = operator[obj.validator](input2, obj.arg);
      Validator.label(obj, success);
      res = res && success;
    });

    [].forEach.call(inputs, (val) => {
      let name = val.getAttribute('name');
      if (!name) {
        return;
      }
      name = name.replace(/\[[\d]*\]/, '');
      const validator = this.validators[name];
      let success = true;
      if (validator && validator.length > 0) {
        validator.forEach((obj) => {
          if (!obj || !obj.validator) {
            return;
          }
          if (!operator.isFunction(obj.validator) || obj.validator.substring(0, 4) === 'all_') {
            return;
          }
          let valid = true;
          if (obj.type === 'checkbox' || obj.type === 'radio') {
            if (obj.validator === 'required') {
              let v = false;
              const items = document.querySelectorAll(`[name^="${obj.field}"]`);
              [].forEach.call(items, (item) => {
                if (item.checked) {
                  v = true;
                }
              });
              valid = v;
            } else {
              return;
            }
          } else {
            valid = operator[obj.validator](val.value, obj.arg, val);
          }
          const matches = val.getAttribute('name').match(/\[([\d]+)\]/);
          if (matches) {
            obj.number = parseInt(matches[1], 10); // eslint-disable-line no-param-reassign
          }
          Validator.label(obj, valid);
          success = success && valid;
        });
      }
      Validator.toggleClass(name, success);
      res = res && success;
    });
    return !!res;
  }

  extract(elm) {
    const inputs = Validator.getInput(elm);
    [].forEach.call(inputs, (input) => {
      if (input.name.match(/^(.*):(validator|v)#(.*)$/)) {
        const field = RegExp.$1;
        const validator = RegExp.$3;
        const obj = {
          field,
          validator,
          arg: input.value,
          id: input.getAttribute('id'),
          type: document.querySelector(`[name^="${field}"]`).getAttribute('type'),
          number: -1,
        };

        if (obj.validator.substring(0, 4) === 'all_') {
          this.checked.push(obj);
        }
        if (!this.validators[field]) {
          this.validators[field] = [];
        }
        this.validators[field].push(obj);
      }
    });
  }

  static getInput(elm) {
    return elm.querySelectorAll('input:not(:disabled),button:not(:disabled),select:not(:disabled),textarea:not(:disabled)');
  }

  static label(obj, valid) {
    const label = document.querySelectorAll(`[data-validator-label="${obj.id}"]`);
    let target;
    if (label.length < 1) {
      target = document.querySelector(`label[for="${obj.id}"]`);
    }
    if (label.length === 1) {
      target = document.querySelector(`[data-validator-label="${obj.id}"]`);
    }
    if (label.length > 1 && obj.number > -1) {
      target = label[obj.number];
    }
    if (target) {
      target.classList.remove('validator-result-');
      target.classList.remove('validator-result-0');
      target.classList.remove('validator-result-1');
      target.classList.add(`validator-result-${valid ? '1' : '0'}`);
    }
  }

  static toggleClass(name, success) {
    const ok = 'valid';
    const ng = 'invalid';

    const items = document.querySelectorAll(`[data-validator="${name}"]`);
    if (items.length > 0) {
      [].forEach.call(items, (item) => {
        if (success) {
          item.classList.remove(ng);
          item.classList.add(ok);
        } else {
          item.classList.remove(ok);
          item.classList.add(ng);
        }
      });
    }
  }
}

export default (elm) => {
  operator.isFunction(false);
  const validator = new Validator(elm);

  elm.addEventListener('submit', (e) => {
    if (!validator.all(elm)) {
      e.preventDefault();
    }
  });
};
