document.addEventListener('DOMContentLoaded', function () {
  // 最新情報バナーのカルーセル
  new Splide('#news-banner-carousel', {
    type: 'loop',
    gap: '2rem',
    arrows: true,
    pagination: true,
    perPage: 3,
    perMove: 1,
    focus: 0,
    breakpoints: {
      768: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    }
  }).mount();
});

