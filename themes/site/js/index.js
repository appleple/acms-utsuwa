$.fn.delayAddClass = function (className, delay) {
  return $(this).delay(delay).queue(function (next) {
    $(this).addClass(className);
    next();
  });
};
$.fn.delayRemoveClass = function (className, delay) {
  return $(this).delay(delay).queue(function (next) {
    $(this).removeClass(className);
    next();
  });
};

$(() => {
  // JSが有効か判断する
  $('html').removeClass('no-js').addClass('js');

  // アニメーション（js-animation）
  const boxes = document.querySelectorAll('.js-animation');
  const boxesArray = Array.prototype.slice.call(boxes, 0);

  const options = {
    root: null,
    rootMargin: '10% 0px -10% 0px',
    threshold: 0,
  };

  /**
   * 交差したときに呼び出す関数
   * @param entries
   */
  function doWhenIntersect(entries) {
    const entriesArray = Array.prototype.slice.call(entries, 0);
    entriesArray.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show');
      }
    });
  }

  const observer = new IntersectionObserver(doWhenIntersect, options);
  boxesArray.forEach((box) => {
    observer.observe(box);
  });

  // アニメーション（用途：js-animation内で使用する）
  const rows = document.querySelectorAll('.js-animation-row');
  const rowsArray = Array.prototype.slice.call(rows, 0);

  const optionsRow = {
    root: null,
    rootMargin: '10% 0px -10% 0px',
    threshold: 0,
  };

  const observerRow = new IntersectionObserver(doWhenIntersect, optionsRow);
  rowsArray.forEach((box) => {
    observerRow.observe(box);
  });

  // モバイル時のナビゲーション
  const $mobileNavTrigger = $('.js-mobile-nav-btn');
  const $mobileNavContents = $('.js-mobile-nav');
  const $menuText = $('.global-nav-mobile-menu-text'); // 追加：テキスト要素を取得

  $mobileNavTrigger.click(() => {
    $('body').toggleClass('is-locked');
    const isExpanded = $mobileNavTrigger.attr('aria-expanded') === 'true';

    if (isExpanded) {
      $mobileNavTrigger.attr('aria-expanded', false);
      $mobileNavContents.delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
      $menuText.text('MENU'); // メニューを閉じたら「MENU」に
    } else {
      $mobileNavTrigger.attr('aria-expanded', true);
      $mobileNavContents.delayAddClass('is-active', 1).delayAddClass('is-opened', 100);
      $menuText.text('CLOSE'); // メニューを開いたら「CLOSE」に
    }

    $mobileNavContents.find('[href*="#"]').click(() => {
      $mobileNavTrigger.attr('aria-expanded', false);
      $mobileNavContents.delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
      $('body').removeClass('is-locked');
      $menuText.text('MENU'); // ハッシュリンクで閉じたときも「MENU」に戻す
    });
  });


  // .global-nav-mobile-groupを子に持つ.global-nav-mobile-itemのリンククリックで展開
  $($mobileNavContents).find('.global-nav-mobile-item:has(.global-nav-mobile-group) > a').click(function (event) {
    event.preventDefault();
    $(this).next().fadeToggle();
    $(this).find('.icon-expand').toggleClass('is-close');
  });

  // 固定CTA
  function fixElement() {
    const $fixArea = $('.js-sticky-area');
    const $fix = $('.js-sticky');

    if ($fixArea.length && $fix.length) {
      const fixTop = $fixArea.offset().top;
      const fixEnd = $fixArea.height() + $fixArea.offset().top;
      const winScroll = $(window).scrollTop();
      const winheight = $(window).height();

      if (winScroll < fixTop - winheight) {
        $fix.delayRemoveClass('is-show', 1).delayRemoveClass('is-active', 20);
      } else if (winScroll > fixEnd - winheight) {
        $fix.delayRemoveClass('is-show', 1).delayRemoveClass('is-active', 20);
      } else {
        $fix.delayAddClass('is-active', 1).delayAddClass('is-show', 10);
      }
    }
  }
  $(window).on('load scroll', () => {
    fixElement();
  });


  // アコーディオン
  $('.js-toggle-button').on('click', (e) => {
    const $self = $(e.currentTarget);
    const $parent = $self.closest('.js-toggle');
    const $body = $parent.find('.js-toggle-body');
    const ariaExpanded = $self.attr('aria-expanded') === 'true' ? 'false' : 'true';
    const ariaHidden = $body.attr('aria-hidden') === 'true' ? 'false' : 'true';
    $self.toggleClass('is-active').attr('aria-expanded', ariaExpanded);
    $body.slideToggle().attr('aria-hidden', ariaHidden);
  });

  // ロゴセンター時の検索フォーム
  const openBtns = document.querySelectorAll('.header-search-open-button');
  const closeBtn = document.querySelector('.header-search-close-btn');
  const searchArea = document.getElementById('header-search');
  const searchInput = document.getElementById('form-search-header-lg');

  function openSearch() {
    openBtns.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    searchArea.setAttribute('aria-hidden', 'false');
    searchArea.removeAttribute('hidden');
    searchInput.focus();
    document.body.classList.add('search-open');
  }

  function closeSearch() {
    openBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    searchArea.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (searchArea.getAttribute('aria-hidden') === 'true') {
        searchArea.setAttribute('hidden', '');
      }
    }, 300);
    openBtns[0]?.focus();
    document.body.classList.remove('search-open');
  }

  /* 開閉ボタン */
  if (searchArea && searchInput) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
          openSearch(btn);
        } else {
          closeSearch();
        }
      });
    });
  }

  /* 閉じるボタン */
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeSearch();
    });
  }

  /* ESCキーで閉じる */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchArea.getAttribute('aria-hidden') === 'false') {
      closeSearch();
    }
  });

  /* 検索エリア外クリックで閉じる */
  document.addEventListener('click', function (e) {
    if (
      document.body.classList.contains('search-open') &&
      !searchArea.contains(e.target) &&
      !Array.from(openBtns).some(btn => btn.contains(e.target))
    ) {
      closeSearch();
    }
  });
});
