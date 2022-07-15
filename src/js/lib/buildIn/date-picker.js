import flatPicker from 'flatpickr';
import flatPickerLangJa from 'flatpickr/dist/l10n/ja';
import 'flatpickr/dist/flatpickr.min.css';

export default (target) => {
  const options = {
    allowInput: true,
    dateFormat: 'Y-m-d',
    locale: flatPickerLangJa.ja,
  };
  if (target.classList.contains('done')) {
    return;
  }
  options.defaultDate = target.value;
  const picker = flatPicker(target, options);
  target.setAttribute('autocomplete', 'off');
  target.addEventListener('change', (e) => {
    picker.jumpToDate(e.target.value);
    picker.setDate(e.target.value);
  });
  target.classList.add('done');
};
