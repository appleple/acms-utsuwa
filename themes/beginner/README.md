# テーマ「Beginner」 Ver.3.0.6

## 最新版のソースコード

最新版のソースコードは以下のリポジトリブランチでご確認ください。<br>

- [CMS同梱リリース用ブランチ（テーマバージョン v3）](https://github.com/appleple/acms-utsuwa/tree/release/v3)
- [テーマバージョン v3 **開発中**ブランチ](https://github.com/appleple/acms-utsuwa/tree/develop/v3)

各テーマテンプレートは /themes フォルダの中をご覧ください。

## テーマ内テンプレートについて

a-blog cms で更新ができるページを作るための HTML ファイルを、テンプレートファイルといいます。<br>
テンプレートファイルにいろいろなモジュールを貼り付けていくことで、データベースに保存されている情報をHTMLに配置していきます。<br>
テンプレートについての基本的な解説は [a-blog cms developer サイト > ドキュメント > テンプレート](https://developer.a-blogcms.jp/document/template/) ページをご参照ください。

## カテゴリーでのコンテンツ管理

Beginner テーマはカテゴリー単位でコンテンツを管理しています。

## カテゴリーでのコンテンツ管理

ルートブログでは一部カテゴリーでのコンテンツ管理もしています。<br>
下記コンテンツについてはカテゴリーフォルダを用意し、専用のテンプレートを設置しています。

- beginner/company（企業情報）
- beginner/contact（お問い合わせ）
- beginner/realestate（物件情報）
- beginner/recruit（採用情報）

## 管理画面・編集画面のカスタマイズ

管理画面テンプレート beginner/admin.html にて、編集画面用のCSSやJSなど、管理画面や編集画面のカスタマイズに利用できるファイルを読み込んでいます。<br>
管理画面のスタイルなどをカスタマイズする際は、 beginner/admin.html を参照ください。

### カスタムフィールド・管理メニューの追加

beginner/admin にそのテーマオリジナルの管理画面設定用に、主に以下のテンプレートが入っています。

- カスタムフィールド入力欄用テンプレート（ブログ・カテゴリー・エントリー・ユーザー・モジュール）
- dashboard-left.html（管理画面 > ダッシュボード に表示できるリンク集表示テンプレート）
- action.html（管理ボックスのカスタマイズ）

## beginner テーマ用アセット

### beginner/images フォルダ

#### beginner/images/icon

CSSので色を制御し使用する装飾的なSVGアイコンが入っています。<br>
エラーメッセージや注意喚起など、サイトのテーマカラーに合わせて色を変えたいアイコンに使用します。

実装例）

- インラインSVG：a-blog cms の @include() を使用して HTML に直接埋め込んでいます。SVGアイコンの path 色を currentColor とすることで、CSS の colorプロパティでカラー制御しています。

- CSS mask-image：CSS の mask-image プロパティを使用してSVGを読み込み、background-color を指定することで色を制御しています。

#### beginner/images/icon-color

CSSで色を変更せず、そのままの色で使用するSVGアイコンが入っています。

### beginner/include フォルダ

テーマ内でインクルードしているテンプレートが入っています。<br>
インクルードファイルとして切り出すことで共通パーツの使い回しが可能になります。

### beginner/src フォルダ

Beginner テーマで使用している scss ファイルを管理しているフォルダです。<br>
scss での開発をする際にご利用ください。

- beginner/src/scss： webpack でコンパイル・結合したCSSファイルを、beginner/src/dest に出力しています。

### beginner/dest フォルダ

Beginner テーマ専用のCSSファイルが入っています。<br>
src フォルダの scss ファイルをコンパイル・結合したファイルです。

### beginner/css フォルダ

Beginner テーマで利用しているライブラリのCSSファイルが入っています。

### beginner/include/head/css-variables.css

Beginner テーマのカラーや余白など、デザイントークンとなる値を定義しています。

### beginner/js フォルダ

Beginner テーマ内で読み込んでいる JavaScript ファイルが入っています。

## カスタムフィールド（固定フィールド）

各コンテンツ専用のカスタムフィールドを用意しています。<br>
中には下記のようにコンテンツ間で共通のカスタムフィールドを使用している箇所もあります。

- ブログ・カテゴリー・エントリーのSEO設定とOGP設定（メイン画像）
- カテゴリーのページヘッダー設定
- サイトトップページなどで使用するモジュールの見出し設定

## ユニット

Beginner テーマでは、独自で以下のユニットのスタイルを調整しています。<br>
カスタマイズ内容は beginner/include/unit.html を参照ください。

- メディアユニット ... スタイル調整のため
- ファイルユニット ... メディアユニットに合わせたスタイル調整のため

CMSアップデート時には上記ユニットにスタイル崩れが発生していないか、出力内容に問題がないかをご確認ください。

### カスタムユニット

カスタムユニットを使用しています。カスタマイズ内容は以下ファイルをご参照ください。

- beginner/include/unit/extend.html
- beginner/admin/entry/unit/extend.html

### グループユニット

グループユニットは `.gu-` で始まるクラス名を適用しています。
スタイルは beginner/src/scss/editor/_group.scss をご覧ください。

## コンテンツ別カスタマイズ

### サイトトップページ

#### メインビジュアル

メインビジュアルで使用しているスライダーは splide という スクリプトを使用しています。使用方法に着いては [splide の公式サイト](https://splidejs.com/) をご覧ください。

- beginner/include/header/main-visual.html
- beginner/src/scss/_splide.scss
- beginner/src/scss/_main-visual.scss

### 物件紹介（realestate）

エントリーのカスタムフィールド（固定入力欄）を使用しているカテゴリーです。<br>
カスタムフィールドを実装したり、検索に利用する際の例としてご覧ください。

カスタムフィールドについて<br>
https://developer.a-blogcms.jp/document/customfield/

カスタムフィールドメーカー（カスタムフィールドの生成）<br>
https://developer.a-blogcms.jp/tools/custom-field.html
