import pdfjs from 'pdfjs-dist';

export default class Pdf2Image {
  /**
   * Constructor
   *
   * @param url
   */
  constructor(url) {
    this.url = url;
    this.baseUrl = `${window.root}js/dest/`;
    this.currentPage = 1;
    this.numPages = -1;
    this.document = null;
    pdfjs.GlobalWorkerOptions.workerSrc = `${this.baseUrl}pdf.worker.js`;
  }

  async hasPrevPage() {
    return this.currentPage > 1;
  }

  async hasNextPage() {
    if (this.numPages < 1) {
      this.numPages = await this.getPages();
    }
    if (this.currentPage < this.numPages) {
      return true;
    }
    return false;
  }

  async getPrevImage(width = 0) {
    if (await this.hasPrevPage()) {
      return this.getPageImage(this.currentPage - 1, width);
    }
    return false;
  }

  async getNextImage(width = 0) {
    if (await this.hasNextPage()) {
      return this.getPageImage(this.currentPage + 1, width);
    }
    return false;
  }

  async getPages() {
    try {
      const pdfDocument = await this.getDocument();
      return pdfDocument.numPages;
    } catch (e) {
      return false;
    }
  }

  async getPageImage(page, width = 0) {
    try {
      const canvas = document.createElement('canvas');
      await this.toCanvas(canvas, page, width);
      this.currentPage = page;
      return canvas.toDataURL('image/jpeg');
    } catch (e) {
      return false;
    }
  }

  async toCanvas(canvas, page, width) {
    const pdfDocument = await this.getDocument();
    const pdfPage = await pdfDocument.getPage(page);

    let viewport = pdfPage.getViewport({ scale: 1 });
    if (width > 0) {
      const fixScale = width / viewport.width;
      viewport = pdfPage.getViewport({ scale: fixScale });
    }
    canvas.height = viewport.height; // eslint-disable-line no-param-reassign
    canvas.width = viewport.width; // eslint-disable-line no-param-reassign

    return pdfPage.render({
      canvasContext: canvas.getContext('2d'),
      viewport,
    }).promise;
  }

  getDocument() {
    return new Promise((resolve, reject) => {
      if (this.document) {
        resolve(this.document);
      }
      try {
        const src = {
          cMapUrl: `${this.baseUrl}cmaps/`,
          cMapPacked: true,
        };
        if (typeof this.url === 'string') {
          src.url = this.url;
        } else {
          src.data = this.url;
        }
        pdfjs.getDocument(src).promise.then((document) => {
          this.document = document;
          resolve(this.document);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
