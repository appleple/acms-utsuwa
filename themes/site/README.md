# テーマ「Site」 Ver.3.0.6

## 最新版のソースコード

最新版のソースコードは以下のリポジトリブランチでご確認ください。<br>

- [CMS同梱リリース用ブランチ（テーマバージョン v3）](https://github.com/appleple/acms-utsuwa/tree/release/v3)
- [テーマバージョン v3 **開発中**ブランチ](https://github.com/appleple/acms-utsuwa/tree/develop/v3)

各テーマテンプレートは /themes フォルダの中をご覧ください。

## デザインファイル

デザインファイルは、[a-blog cms developer サイト > ドキュメント > テーマ](https://developer.a-blogcms.jp/document/themes/) にアクセスし、Site テーマの「Figma ファイル」リンクを参照して下さい。

## テーマ内テンプレートについて

a-blog cms で更新ができるページを作るための HTML ファイルを、テンプレートファイルといいます。<br>
テンプレートファイルにいろいろなモジュールを貼り付けていくことで、データベースに保存されている情報をHTMLに配置していきます。<br>
テンプレートについての基本的な解説は [a-blog cms developer サイト > ドキュメント > テンプレート](https://developer.a-blogcms.jp/document/template/) ページをご参照ください。

### テンプレートの継承

各テンプレートはページレイアウトの統一や読み込みファイルの共通化をするために、基本的には a-blog cms の機能である「テンプレートの継承（@extends 要素）」をしています。<br>
継承元テンプレートは site/_layouts フォルダに格納しています。

## 複数のテーマフォルダについて

Site テーマはマルチブログ構造になっており、ブログ単位でコンテンツを管理しています。<br>
各ブログのテーマフォルダは「site」フォルダを継承しています。

継承元テーマフォルダ

- site

各ブログのテーマフォルダ

- root@site（ルートブログ用）
- news@site
- event@site
- faq@site
- blog@site
- works@site

## カテゴリーでのコンテンツ管理

ルートブログでは一部カテゴリーでのコンテンツ管理もしています。

- root@site/contact（お問い合わせ）
- root@site/recruit（採用情報）
- root@site/service（事業内容）

## 管理画面・編集画面のカスタマイズ

管理画面テンプレート site/admin.html にて、編集画面用のCSSやJSなど、管理画面や編集画面のカスタマイズに利用できるファイルを読み込んでいます。<br>
管理画面のスタイルなどをカスタマイズする際は、 site/admin.html を参照ください。

### カスタムフィールド・管理メニューの追加

テーマ名/admin にそのテーマオリジナルの管理画面設定用に、主に以下のテンプレートが入っています。

- カスタムフィールド入力欄用テンプレート（ブログ・カテゴリー・エントリー・ユーザー・モジュール）
- dashboard-left.html（管理画面 > ダッシュボード に表示できるリンク集表示テンプレート）
- action.html（管理ボックスのカスタマイズ）

## site テーマ用アセット

### site/images フォルダ

#### site/images/icon

CSSので色を制御し使用する装飾的なSVGアイコンが入っています。<br>
エラーメッセージや注意喚起など、サイトのテーマカラーに合わせて色を変えたいアイコンに使用します。

実装例）

- インラインSVG：a-blog cms の @include() を使用して HTML に直接埋め込んでいます。SVGアイコンの path 色を currentColor とすることで、CSS の colorプロパティでカラー制御しています。

- CSS mask-image：CSS の mask-image プロパティを使用してSVGを読み込み、background-color を指定することで色を制御しています。

#### site/images/icon-color

CSSで色を変更せず、そのままの色で使用するSVGアイコンが入っています。

### 各テーマ/include フォルダ

テーマ内でインクルードしているテンプレートが入っています。<br>
インクルードファイルとして切り出すことで共通パーツの使い回しが可能になります。

### site/src フォルダ

Site テーマで使用している scss ファイルや、jsファイルを管理しているフォルダです。

- site/src/scss： webpack でコンパイル・結合したCSSファイルを、site/src/dest に出力しています。
- site/src/js： テーマ内での読み込みはしていません。webpack などを使用して開発する際に利用できるように用意しています。GitHub リポジトリでのみ確認できるフォルダです。a-blog cms をダウンロードした時には omake フォルダに格納されています。

### site/dest フォルダ

Site テーマ専用のCSSファイルが入っています。<br>
src フォルダの scss ファイルをコンパイル・結合したファイルです。

### site/css フォルダ

Site テーマで利用しているライブラリのCSSファイルが入っています。

### site/include/head/css-variables.css

Site テーマのカラーや余白など、デザイントークンとなる値を定義しています。

### site/js フォルダ

Site テーマ内で読み込んでいる JavaScript ファイルが入っています。

## カスタムフィールド（固定フィールド）

各コンテンツ専用のカスタムフィールドを用意しています。<br>
中には下記のようにコンテンツ間で共通のカスタムフィールドを使用している箇所もあります。

- ブログ・カテゴリー・エントリーのSEO設定とOGP設定（メイン画像）
- 下層ブログとルートブログカテゴリーのページヘッダー設定
- サイトトップページなどで使用するモジュールの見出し設定

## ユニット

Site テーマでは、独自で以下のユニットのスタイルを調整しています。<br>
カスタマイズ内容は site/include/unit.html を参照ください。

- メディアユニット ... スタイル調整のため
- ファイルユニット ... メディアユニットに合わせたスタイル調整のため

CMSアップデート時には上記ユニットにスタイル崩れが発生していないか、出力内容に問題がないかをご確認ください。

### カスタムユニット

カスタムユニットを使用しています。カスタマイズ内容は以下ファイルをご参照ください。

- site/include/unit/extend.html
- site/admin/entry/unit/extend.html

#### 目次ユニット

目次ユニットには、a-blog cms 組み込みJSを使用しています。<br>
テーマ内の使用箇所については `js-outline` でソースコードを検索してください。

組み込みJSの「目次」については、a-blog cms developer サイトの組み込みJSリファレンスをご参照ください。<br>
https://developer.a-blogcms.jp/document/reference/builtinjs/adjust-layout/outline.html

#### モジュールユニット

Site テーマではモジュールユニットを使用することができます。

モジュールユニットでも使用可能なテンプレートは site/include/module/template に入っています。

ただし、テーマインストール時にモジュールユニットとして既に挿入さているパーツのみのスタイルしか管理画面（エントリー編集画面）で読み込んでいません。<br>
エントリー編集画面でスタイルが適用されていないテンプレートを使用する場合は、下記のいづれかの方法をお試しください。

- ビルドツールが使用できる方向け： <br>site/src/scss/site.scss で @use している該当のスタイルファイルを site/src/scss/site-editor.scss に移動しバンドル。CMS同梱の webpack を利用している場合は、site/dest/editor.css に出力されます。

- ビルドツールを利用しない方向け： <br>site/include/edit/custom.css に該当のスタイルを貼り付けて、エントリー編集画面でもスタイル適用されるようにする。

### グループユニット

グループユニットは `.gu-` で始まるクラス名を適用しています。
スタイルは site/src/scss/editor/_group.scss をご覧ください。

## コンテンツ別カスタマイズ

### サイトトップページ

#### メインビジュアル

メインビジュアルなど、Site テーマ内で使用しているスライダーは splide という スクリプトを使用しています。使用方法に着いては [splide の公式サイト](https://splidejs.com/) をご覧ください。

- site/include/header/main-visual.html
- site/src/scss/_splide.scss
- site/src/scss/_main-visual.scss

#### Movie セクション

動画のモーダル表示には、a-blgo cms の組み込みJSを使用しています。<br>
テーマ内の使用箇所については `js-modal-video` でソースコードを検索してください。

組み込みJSの「モーダルでビデオ再生をする」については、a-blog cms developer サイトの組み込みJSリファレンスをご参照ください。<br>
https://developer.a-blogcms.jp/document/reference/builtinjs/viewer/modal-video.html

### スタッフブログ（blog）

ブログの記事下に表示する著者情報としてユーザーのカスタムフィールドを使用しています。

### よくあるご質問（faq）

1質問 ＝ 1エントリー としてエントリー作成します。<br>

- 質問 ... エントリータイトル
- 回答 ... エントリー内容（ユニット）

一覧ページでは、アコーディオンUIにより回答を開閉することができます。

回答はアコーディオンを開くと内容がロードされるようになっており、[htmx](https://developer.a-blogcms.jp/document/reference/builtinjs/htmx/) でエントリー内容を取得しています。

### 採用情報（recruit：ルートブログのカテゴリー）

各エントリー別に応募フォームを設置できるよう、動的フォームが使用できるようになっています。<br>
動的フォームのテンプレートは、site/include/form 内をご参照ください。

動的フォーム<br>
https://developer.a-blogcms.jp/document/form/dynamic_form.html

## エントリーの固定表示

下記ページでは、エントリーをカテゴリーやブログのトップページのように見せる「エントリーの固定表示」機能を使用しています。

- 採用情報（recruit：ルートブログのカテゴリー）
- 企業情報（company：ルートブログのカテゴリー）
- お問い合わせ（contact：ルートブログのカテゴリー）

エントリー編集ページ > 詳細設定 にある「ファイル名」の入力欄を空にすることで、エントリーを固定表示しています。

## 右下追従ポップアップバナー（mf_popup_banner）

サイトトップページのみに設置することができるポップアップバナーです。<br>
利用者がバナーをクリックまたはバツボタンで削除した場合、ローカルストレージにその情報を保存し、一定期間ポップアップバナーを出さないようにする実装をしています。

- site/include/parts/popup-banner.html
- site/js/popup-banner.js

## 外部サービスとの連携

### Googleアナリティクス （ルートブログで設定）

GTM経由ではなく、Googleアナリティクス単体での埋め込みをするための入力欄を用意しています。

- site/admin/blog/field-analytics.html

テーマデフォルトでは、タッチモジュールによりプレビューとログアウト時には読み込まないようにしています。

[タッチモジュール](https://developer.a-blogcms.jp/document/reference/touch.html)
- Touch_NotPreview
- Touch_Unlogin

### GTM （ルートブログで設定）

Google Tag Manager を埋め込むための入力欄を用意しています。

- site/admin/blog/field-gtm.html

GTMを使用する場合は「有効化設定（gtm_enable）」にチェックを入れて運用ください（true）。GTMと「cookie-consent」使用時の実装方法が異なるのと、タグ2重設定防止のため切り替え用チェックボックスを用意しました。<br>
テーマデフォルトでは、Googleアナリティクスと同じく、タッチモジュールによりプレビューとログアウト時には読み込まないようにしています。

### cookie-consent ボップアップ （ルートブログで設定）

クッキーの同意ポップアップには [CookieConsent](https://playground.cookieconsent.orestbida.com/) を使用しています。ポップアップ機能を利用する際は、ルートブログのカスタム設定にある「EU向けCookie利用の同意ポップアップ設定」の「同意ポップアップ表示」にチェックを入れます（cookie_consent: true）。<br>
Google Analytics のタグを埋め込む場合は、script要素に指定の属性を追加する必要があります。設定欄の注意事項を確認してから設定ください。

- site/admin/blog/field-cookie-consent.html

テーマデフォルトでは、Googleアナリティクスと同じく、タッチモジュールによりプレビューとログアウト時には読み込まないようにしています。

#### cookie-consent ボップアップ実装箇所

- ポップアップ内容や動作定義：site/js/cookie-consent-init.js
- スタイル調整など：site/include/head/cookie-consent-init.html
- テンプレートインクルード：site/_layouts/base.html

ポップアップ内容の変更、多言語対応、訪問者による設定変更用ボタンの設置、規約変更時の再表示設定、などのカスタマイズも可能です。カスタマイズ方法は [CookieConsent 公式サイト](https://playground.cookieconsent.orestbida.com/) をご参照ください。

### Search Console （ルートブログで設定）

[Google Search Console](https://search.google.com/search-console/)の、`<meta>` タグ追加によるサイト所有権を設定できる入力欄を用意しています。Google アナリティクスや、GTMを設定しない場合にご利用ください。<br>
入力内容などの詳細は <a href='https://support.google.com/webmasters/answer/35179'>サイトの所有権を確認する - Search Console ヘルプ</a> の「HTMLタグ」項目をご覧ください。

- site/admin/blog/field-search-console.html

metaタグへの埋め込み内容は `google_site_verification` でソースコードを検索してご確認ください。

## おまけ

### サイトトップのレイアウト機能

本テーマでは、サイトトップページをレイアウト機能で実装できるようになるテンプレートを用意しています。

レイアウト機能とは、ブラウザ上からモジュールの配置ができるようになる機能です。たとえば、新しくエントリーヘッドラインやエントリーサマリーのモジュールを追加したくなった場合、普段であればHTMLを修正しなければいけませんが、ブラウザ上からドラッグアンドドロップの操作でモジュールの設置ができます。

https://developer.a-blogcms.jp/document/layout/

### レイアウト機能の有効化

ルートブログ > 管理画面 > テーマ（テーマセット管理） > Site ルートテーマ にて、「テンプレート設定 > テンプレート選択ファイル（template.yaml）の値を優先する」のチェックを外し、「テンプレートファイル > トップページ」に layout.html と入力された状態で保存します。

すると、サイトトップページで site/layout.html が読み込まれレイアウト機能を使用することができます。

テーマインストール時であれば、ある程度初期のレイアウトデータが入っています。

※上記機能を使用しない場合はテンプレートを削除することを推奨します。

### 関連バナーのカルーセル版

[splide](https://splidejs.com/) を使用したカルーセル版のバナー一覧用テンプレートを用意しています。 root@site/_top.html にて下記テンプレートのインクルードをコメントアウトしていますのでご利用される場合はコメントアウトを外して表示させてください。

- site/include/parts/banner-slide.html（banner_slide_top）

splide.js の設定は下記JSファイルで行っています。

- site/js/banner-carousel.js

※上記テンプレートを使用しない場合は削除することを推奨します。

### パターン別メインビジュアル

デフォルトのメインビジュアル（site/include/header/main-visual.html）の他に、2パターンの雰囲気の異なるテンプレートを用意しています。root@site/_top.html にて下記テンプレートのインクルードをコメントアウトしていますのでご利用される場合はコメントアウトを外して表示させてください。

- site/include/header/main-visual-ex01.html（mf_main_visual）
- site/include/header/main-visual-ex02.html（mf_main_visual）

パターン別メインビジュアルでは通常機能とは違い画像の「配置」などの機能を制限しています。上記テンプレート内に注意事項が記載してありますので一読してからご利用ください。

※上記テンプレートを使用しない場合は削除することを推奨します。

### パターン別サイトロゴ+ナビゲーション

デフォルトのサイトロゴ+ナビゲーションテンプレート（site//include/header/header.html）の他に、2パターンのレイアウトが異なるテンプレートを用意しています。site/_layouts/base.html にて下記テンプレートのインクルードをコメントアウトしていますのでご利用される場合はコメントアウトを外して表示させてください。

- ロゴとナビゲーション縦積み ロゴ左寄せ (site/include/header/header-nav-bottom.html)
- ロゴとナビゲーション縦積み ロゴ中央寄せ（site/include/header/header-logo-center.html）

※上記テンプレートを使用しない場合は削除することを推奨します。

### 事例紹介のhtmx版テンプレート

本テーマではところどころに [htmx](https://developer.a-blogcms.jp/document/reference/builtinjs/htmx/) を利用しており、ページ内の一部分読み込みをしてよりシームレスな大変ができるような実装をしております。<br>
使用箇所は `hx-` などでソースコード検索ください。

事例紹介については、おまけテンプレートして条件検索や次ページへの遷移を htmx 化したテンプレートを用意しています。https://ドメイン名/works/htmx-sample.html にアクセスして操作感を体験ください。

サンプルテンプレートは works@site/htmx-sample.html にてご確認いただけます。<br>
※上記テンプレートを使用しない場合は削除することを推奨します。

### ログイン中ユーザーのプロフィール更新用テンプレート

ログイン中のユーザーは、管理ボックスの「プロフィール」リンクからマイページを表示し自身のプロフィールを更新できます。デフォルトのテンプレートではカスタムフィールドの表示にカスタマイズが必要ですが、Site テーマではカスタマイズ不要でカスタムフィールド情報も変更可能です。

- site/_member/update-email.html
- site/_member/update-password.html
- site/_member/update-profile.html
- site/_member/update-tfa.html

※上記テンプレートを利用している場合、サイトをアップデートする際には @extends 先を確認しテンプレートの調整が必要かどうかご確認ください。
