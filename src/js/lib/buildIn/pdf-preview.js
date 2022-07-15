import Pdf2Image from './pdf2image';

const config = {
  previewMark: '.js-preview', // 実際にプレビュー画像を表示する img 要素のクラス名
  prevBtnMark: '.js-prev', // 次ページのボタンにつけるクラス名
  nextBtnMark: '.js-next', // 前ページのボタンにつけるクラス名
  pdfAttr: 'data-pdf', // 対象のPDFのパスのdata属性名
  widthAttr: 'data-width', // 幅指定のdata属性名
  pageAttr: 'data-page', // 表示するページ数のdata属性名
  lazyAttr: 'data-lazy', // lazy load するかどうか（1 or 0）のdata属性名
  showBtnClass: 'acms-admin-block', // PDFのページ送りボタンがある場合につくクラス名
};

export default async (target) => {
  const elm = target.querySelector(config.previewMark);
  if (!elm) {
    return;
  }
  const url = elm.getAttribute(config.pdfAttr);
  if (!url) {
    return;
  }
  const page = parseInt(elm.getAttribute(config.pageAttr), 10) || 1;
  const imageWidth = parseInt(elm.getAttribute(config.widthAttr), 10) || elm.clientWidth;
  const pdf2Image = new Pdf2Image(url);
  const prevButton = target.querySelector(config.prevBtnMark);
  const nextButton = target.querySelector(config.nextBtnMark);
  const showClass = config.showBtnClass;
  const image = await pdf2Image.getPageImage(page, imageWidth);
  if (image) {
    elm.src = image;
  }
  const checkButton = async () => {
    if (prevButton) {
      if (await pdf2Image.hasPrevPage()) {
        prevButton.classList.add(showClass);
      } else {
        prevButton.classList.remove(showClass);
      }
    }
    if (nextButton) {
      if (await pdf2Image.hasNextPage()) {
        nextButton.classList.add(showClass);
      } else {
        nextButton.classList.remove(showClass);
      }
    }
  };
  checkButton();
  if (prevButton) {
    prevButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const prevImage = await pdf2Image.getPrevImage(imageWidth);
      if (prevImage) {
        elm.src = prevImage;
      }
      checkButton();
    });
  }
  if (nextButton) {
    nextButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const nextImage = await pdf2Image.getNextImage(imageWidth);
      if (nextImage) {
        elm.src = nextImage;
      }
      checkButton();
    });
  }
};
