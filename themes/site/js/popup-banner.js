document.addEventListener('DOMContentLoaded', function () {
  const popups = document.querySelectorAll('.js-popup-banner');
  // 現在の日時を取得
  const date = new Date();

  [].forEach.call(popups, (popup) => {

    // バナーの名前（localStorageのキーとして使用）
    const name = popup.getAttribute('data-popup-banner-name') || 'popup-banner';
    // バナーを非表示にする期間（分）
    const minutes = parseInt(popup.getAttribute('data-popup-banner-minutes'), 10) || 0;

    const offset = parseInt(popup.getAttribute('data-popup-banner-offset'), 10) || 0;

    // localStorageに保存されたデータをチェック
    if (localStorage[name]) {
      const json = JSON.parse(localStorage.getItem(name));
      // 有効期限が現在時刻よりも後であれば、ポップアップは表示しない
      if (json.expire && json.expire > date.getTime()) {
        return;
      }
    }

    // ポップアップバナーの表示
    popup.classList.add('is-show');
    setTimeout(() => {
      popup.classList.add('is-animated');
    }, offset);

    // localStorageに非表示有効期限を保存する関数
    const setExpire = () => {
      // 保存するデータ（表示フラグと非表示有効期限）
      const data = {
        show: true,
        expire: date.getTime() + (minutes * 60 * 1000),
      };
      // localStorageにデータを保存
      localStorage.setItem(name, JSON.stringify(data));
    };

    // リンククリックされた時
    const link = popup.querySelector('.js-popup-banner-link');
    link.addEventListener('click', () => {
      // ポップアップバナーを非表示にする有効期限を保存
      setExpire();
    });

    // 閉じるボタンがクリックされた時
    const closeBtn = popup.querySelector('.js-popup-banner-close');
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      popup.classList.remove('is-animated');
      // アニメーション終了後、ポップアップ表示用クラスを削除
      setTimeout(() => {
        popup.classList.remove('is-show');
      }, 3000);
      // ポップアップバナーを非表示にする有効期限を保存
      setExpire();
    });

  });
});
