import { FocusedImage } from 'image-focus';

export default (target) => {
  target.style.visibility = 'visible'; // eslint-disable-line no-param-reassign
  new FocusedImage(target); // eslint-disable-line no-new
};
