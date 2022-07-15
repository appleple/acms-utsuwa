const operator = {
  isFunction: (val) => (typeof (operator[val]) === 'function'),
  required: (val) => !!val,
  minlength: (val, len) => {
    if (!val) {
      return true;
    }
    return parseInt(len, 10) <= String(val).length;
  },
  maxlength: (val, len) => {
    if (!val) {
      return true;
    }
    return parseInt(len, 10) >= String(val).length;
  },
  min: (val, num) => {
    if (!val) {
      return true;
    }
    return parseInt(num, 10) <= parseInt(val, 10);
  },
  max: (val, num) => {
    if (!val) {
      return true;
    }
    return parseInt(num, 10) >= parseInt(val, 10);
  },
  regex: (val, regex) => {
    if (!val) {
      return true;
    }
    let flag = '';
    let re = regex;
    if (regex.match(/^@(.*)@([igm]*)$/)) {
      re = RegExp.$1;
      flag = RegExp.$2;
    }
    return new RegExp(re, flag).test(val);
  },
  regexp(val, regex) {
    return this.regex(val, regex);
  },
  digits: (val) => {
    if (!val) {
      return true;
    }
    return val === String(parseInt(val, 10));
  },
  equalTo: (val, name) => val === $(`:input[name="${name}"]`).val(),
  katakana: (val) => {
    if (!val) {
      return true;
    }
    if (val.match(/^[ァ-ヾー]+$/)) {
      return true;
    }
    return false;
  },
  hiragana: (val) => {
    if (!val) {
      return true;
    }
    if (val.match(/^[ぁ-ゞー]+$/)) {
      return true;
    }
    return false;
  },
  all_justChecked: ($obj, num) => parseInt(num, 10) === $obj.size(),
  all_minChecked: ($obj, num) => parseInt(num, 10) <= $obj.size(),
  all_maxChecked: ($obj, num) => parseInt(num, 10) >= $obj.size(),
  dates: (val) => {
    if (!val) {
      return true;
    }
    return /^[sS]{1,2}(\d{2})\W{1}\d{1,2}\W{1}\d{0,2}$|^[hH]{1}(\d{1,2})\W{1}\d{1,2}\W{1}\d{0,2}$|^\d{1,2}$|^\d{1,2}\W{1}\d{1,2}$|^\d{2,4}\W{1}\d{1,2}\W{1}\d{0,2}$|^\d{4}\d{2}\d{2}/.test(val);
  },
  times: (val) => {
    if (!val) {
      return true;
    }
    return /^\d{1,2}$|^\d{1,2}\W{1}\d{1,2}$|^\d{1,2}\W{1}\d{1,2}\W{1}\d{1,2}$|^\d{2}\d{2}\d{2}/.test(val);
  },
  url: (val) => {
    if (!val) {
      return true;
    }
    // eslint-disable-next-line no-useless-escape
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
  },
  email: (val) => {
    if (!val) {
      return true;
    }
    // eslint-disable-next-line no-useless-escape
    return /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/.test(val);
  },
  filesize: (val, max, input) => {
    if (!input) {
      return true;
    }
    if (!input.files) {
      return true;
    }
    if (input.files.length < 1) {
      return true;
    }
    if (input.files[0].size > (max * 1024)) {
      return false;
    }
    return true;
  },
};

export default operator;
