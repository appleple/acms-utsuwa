import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

// CookieConsentの初期化
// カスタマイズする場合は https://cookieconsent.orestbida.com/ を参照してください。
CookieConsent.run({
  disablePageInteraction: false,
  cookie: {
    name: 'cc_cookie_site_theme',
  },
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom right',
      flipButtons: false,
      equalWeightButtons: true
    },
    preferencesModal: {
      layout: 'box',
      position: 'left',
      flipButtons: false,
      equalWeightButtons: true
    }
  },
  categories: {
    necessary: {
      readOnly: true,
      enabled: true
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/
          }
        ]
      }
    },
  },
  language: {
    default: 'ja',

    translations: {
      ja: {
        consentModal: {
          title: 'このウェブサイトは Cookie（クッキー）を使用しています',
          description: '利用状況の分析とサービス向上のためCookie を使用しています。お客様の個人情報は、<a class="cc__link" href="/privacy.html">プライバシーポリシー</a> に基づいて適切に取り扱われます。<br>なお、詳細設定が必要な場合は、 <button data-cc="show-preferencesModal" class="cc__link">Cookie の設定</button> から変更できます。',
          revisionMessage: "<br>規約を変更いたしました。お手数ですが、再度ご確認いただき Cookie の取得と利用の許可をお願いいたします。",
          acceptAllBtn: '許可する', // すべてのクッキーに同意
          acceptNecessaryBtn: '', // 動作に必要なクッキーのみ同意
          footer: '',
        },
        preferencesModal: {
          title: 'Cookie の設定',
          acceptAllBtn: '', // すべてのクッキーに同意
          acceptNecessaryBtn: '', // 動作に必要なクッキーのみ同意
          savePreferencesBtn: '設定を保存する',
          closeIconLabel: '閉じる',
          sections: [
            {
              title: 'Cookie の使用について',
              description: 'このウェブサイトでは、利用状況の分析とサービス向上のため Cookie を使用しています。お客様は Cookie のカテゴリーごとに許可または拒否を選択できます。<br>Cookie や個人情報の取り扱いについては <a class="cc__link" href="/privacy.html">プライバシーポリシー</a> をご確認ください。'
            },
            {
              title: '【必須】動作のために必要な Cookie',
              description: 'このWebサイトが適切に動作するために必要な Cookie です。ウェブサイトの動作に不可欠なため、拒否できません。',
              linkedCategory: 'necessary'
            },
            {
              title: 'パフォーマンスと分析の Cookie',
              description: '当ウェブサイトの利用状況を収集しています。収集したデータはサイトやサービス改善のためにのみ使用します。',
              linkedCategory: 'analytics'
            }
          ]
        }
      }
    }
  }
});
