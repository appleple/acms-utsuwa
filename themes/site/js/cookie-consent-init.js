// CookieConsentの初期化
// カスタマイズする場合は https://cookieconsent.orestbida.com/ を参照してください。
CookieConsent.run({
  disablePageInteraction: false,
  cookie: {
    name: 'cc_site_theme_cookie',
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
          title: 'このウェブサイトはクッキーを使用しています',
          description: '利用状況の分析とサービス向上のためクッキーを使用しています。お客様の個人情報は、<a class="cc__link" href="%{HOME_URL}privacy.html">プライバシーポリシー</a> に基づいて適切に取り扱われます。クッキーの利用にご同意いただける場合は「すべて同意する」を選択してください。<br>クッキーの設定は、いつでも <button data-cc="show-preferencesModal" class="cc__link">設定を管理</button> から変更できます。',
          revisionMessage: "<br> 規約を変更いたしました。お手数ですが、再度ご確認いただきクッキーの取得と利用に同意をお願いいたします。",
          acceptAllBtn: 'すべて同意する',
          acceptNecessaryBtn: 'すべて却下する',
          footer: `
            <a href="%{HOME_URL}privacy.html">プライバシーポリシー</a>
          `
        },
        preferencesModal: {
          title: 'クッキーの設定',
          acceptAllBtn: 'すべて同意する',
          acceptNecessaryBtn: 'すべて却下する',
          savePreferencesBtn: '設定を保存',
          closeIconLabel: '閉じる',
          sections: [
            {
              title: 'クッキーの使用について',
              description: 'このウェブサイトでは、お客様の利便性向上とサービス改善、利用状況の分析のためクッキーを使用しています。お客様はクッキーのカテゴリごとに同意または却下を選択できます。クッキーや個人情報の取り扱いについては <a class="cc__link" href="%{HOME_URL}privacy.html">プライバシーポリシー</a> をご確認ください。'
            },
            {
              title: '動作のために必要なクッキー',
              description: 'このWebサイトが適切に動作するために必要なCookieです。ウェブサイトの動作に不可欠なため、拒否できません。',
              linkedCategory: 'necessary'
            },
            {
              title: 'パフォーマンスと分析のクッキー',
              description: '当ウェブサイトの利用状況を収集しています。収集したデータはサイトやサービス改善のためにのみ使用します。',
              linkedCategory: 'analytics'
            },
            {
              title: '個人情報お取り扱いについて',
              description: '個人情報お取り扱いについての詳細は <a class="cc__link" href="%{HOME_URL}privacy.html">プライバシーポリシー</a> をご覧ください。',
            }
          ]
        }
      }
    }
  }
});
