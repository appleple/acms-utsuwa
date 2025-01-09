# テーマ「UTSUWA」Ver.2.1.13

## GitHub

最新版のソースコードは以下のレポジトリでご確認ください。
https://github.com/appleple/acms-utsuwa

### GitHub から UTSUWA テーマを使用する手順

1. GitHub から最新版の UTSUWA テーマのソースコードをダウンロードする
2. a-blog cms を設置した環境の themes ディレクトリ直下に utsuwa ディレクトリを作成し、ダウンロードしたファイルを設置する
3. /setup フォルダをリネームしたフォルダ/bin/内に、　ダウンロードしたファイルに含まれている/\_bin/ディレクトリの utsuwa ディレクトリを設置する（すでに utsuwa ディレクトリがある場合は、上書きする）
4. メンテナンスプログラム（https://ドメイン/setup フォルダをリネームしたフォルダ/index.php）にアクセスする
5. 「インポート実行画面へ」を押下する
6. 「1. インポート先またはその親になるブログを選択してください。」で任意のものを選択、「2. インポートするブログデータ名を選択してください。」は「utsuwa」を選択、「3. コンフィグ関連のインポート設定」は新規インストールの場合は全てチェックして、「インポートを実行する」を押下する

これで、サイトにアクセスすると UTSUWA テーマがインストールされます。

## Figma

デザインファイルは、Figma Community にて公開しています。
https://www.figma.com/community/file/1154719653085540673

[Get a copy]ボタンから複製してお使いください。
※複製して使うには Figma アカウントが必要です（UTSUWA のファイルを触るくらいなら無料プランで OK です）。

## テーマフォルダ直下のテンプレート

### \_entry.html

詳細ページのテンプレートです。

### \_top.html

トップページのテンプレートです。

### 404.html

404 ページで表示されるテンプレートです。

### admin.html

管理画面のテンプレートです。（LiteEditor のスタイルを適用するためにカスタマイズしています）

### index.html

一覧ページのテンプレートです。

### search.html

キーワード検索時に使用されるテンプレートです。

### template.yaml

UTSUWA テーマを選択したときに、テンプレートをまとめて設定できるファイルです。使用するかどうかは管理画面＞テーマ＞テーマ設定 にて変更できます。

## フォルダ構成

### admin

UTSUWA テーマオリジナルの管理画面のテンプレートが入ったフォルダ。
UTSUWA テーマでは主に以下のテンプレートが入っています。

- カスタムフィールド（ブログ・カテゴリー・エントリー・モジュール・ユーザー）
- ダッシュボード

### カテゴリーコード名フォルダ

a-blog cms で作ったカテゴリーと同じコード名でフォルダを作ると、その中にある index.html と\_entry.html と calendar.html はそのカテゴリーの専用テンプレートとなります。
UTSUWA テーマでは以下のカテゴリー名フォルダを用意しています。

- blog（スタッフブログ）
- contact（お問い合わせ）
- news（お知らせ）
- recruit（採用情報）
- service（事業内容）

### \_layouts

テンプレートの継承機能で使用するファイルが入ったフォルダです。
用途としては、主に別テンプレートでレイアウトを統一するために使います。

### dest

UTSUWA テーマで使っている bundle.css が入ったフォルダです。
src フォルダの scss ファイルを結合したファイルです。

### images

UTSUWA テーマで使っている画像が入ったフォルダです

### include

UTSUWA テーマ内のインクルードしているテンプレートをまとめたフォルダです。

include/edit/：管理画面への編集ボタンを生成するテンプレートです。実際の使い方は、/inlude/entry/summary-blog.html などのテンプレートをご参考にしてください。<br>
include/form/：動的フォームのテンプレートです。<br>
include/unit/：ユニットのテンプレートです。<br>
include/module/template/：モジュールユニットで使用するテンプレートです。

### src

UTSUWA テーマで使用している結合前の js や scss ファイルを管理しているフォルダです。

## 利用している a-blog cms の基本機能

### 用意しているカスタムフィールド

#### ブログ

- サイトの設定（BID1 のみ）
- SEO の設定
- OGP の設定
- 会社情報（BID1 のみ）
- Search Console（BID1 のみ）
- アクセス解析（BID1 のみ）
- script 要素

#### カテゴリー

- SEO の設定
- OGP の設定
- ページタイトルの設定
- CTA の設定

#### エントリー

- SEO の設定
- OGP の設定
- 採用情報の概要・サムネイル情報（※ 採用情報のみ）
- 事業紹介のサムネイル情報（※ 事業紹介のみ）

#### モジュール

- 見出しの設定（「summary_blog」「summary_news」「summary_recruit」「summary_service」「banner_related_site」）
- YouTubeID の設定（モジュール ID「MF_video」のみ）
- メインビジュアルの設定（モジュール ID「MF_main_visual」のみ）
- CTA の設定（モジュール ID「MF_cta_top」「MF_cta_visual」）

#### ユーザー

- スタッフブログの記事下に表示するプロフィール情報

### フォーム

- 検索フォーム（404 ページ）
- お問い合わせフォーム（お問い合わせページ）
- 動的フォーム（採用情報カテゴリーでの使用を想定しています）

### エントリーの固定表示

エントリー編集ページの詳細設定の中にあるファイル名の入力欄を空にすると、エントリーが固定表示される機能。
企業情報、採用情報、お問い合わせ（入力ページ）

## 行っているカスタマイズについて

### 色について

/include/head/css-variables.css にて、各種色を変更できるようになっております。

### スライダーについて

お知らせのヘッドライン直下で使用しているスライダーは splide という スクリプトを使用しています。使用方法に着いては splide の公式サイトをご覧ください。

- splide / https://splidejs.com/

### ビデオのモーダル表示について

modal-video.js という jQuery プラグインを使用しています。使用方法に着いては modal-video の公式サイトをご覧ください。

- modal-video.js / https://appleple.github.io/modal-video/

### ユニット

UTSUWA テーマでは、独自で以下のユニットのスタイルを調整しています。

- テキストユニット ... テキストユニットの際、不要な回り込みを防ぐため div 要素が挿入されるようにしています。p 要素であれば `is-p` などの class 属性が適用されます。
- ファイルユニット ... スタイル調整のため
- 引用ユニット ... スタイル調整のため
- メディアユニット ... ファイルユニットに合わせたスタイル調整のため

### カスタムユニット

カスタムユニットを使い、ユニットの追加に「メッセージ」「余白」「罫線」「価格表」「目次」のボタンを追加しています。

- /themes/utsuwa/include/unit/extend.html
- /themes/utsuwa/admin/entry/unit/extend.html

### ユニットグループ

ユニットグループは`.ug-`で始まるクラス名を適用しています。

- ug-bg-gray
- ug-bg-primary
- ug-cover
- ug-text-center
- ug-border
- ug-center

### テキストユニットを判別するクラス属性

エントリーで使用する HTML 要素に直にスタイルを適用しないよう、 `.entry-text-unit` を介してスタイルを指定しています。
これにより例えば、カスタムユニット内の ul 要素にエントリーの「リスト」のスタイルが適用されません。

#### 記述例：

```scss
.#{acms.$entry-class} .entry-text-unit {
  ul {
    // ... 省略 ...
  }
}
```

### LiteEditor

LiteEditor に関するカスタマイズは下記のファイルで行っています。

- /themes/utsuwa/include/edit/custom.js
- /themes/utsuwa/admin.html
- /themes/utsuwa/include/edit/custom.css

### DocumentOutliner

目次ユニットで使用している組み込み JS です。
カスタマイズは下記のファイルで行っています。

- /themes/utsuwa/include/entry/body.html
- /themes/utsuwa/admin/entry/unit/extend.html
- /themes/utsuwa/include/unit/extend.html
- /themes/utsuwa/src/scss/\_entry.scss

### 動的フォーム

動的フォームでは完了ページを表示するために URL コンテキストに tpl を使用しています。Ver. 2.11.25 より仕様変更があり、tpl はログアウト時にはデフォルトでは無効化される仕様となっております（この仕様変更に関しては詳しくは[Ver. 2.11.25 からのテンプレートの仕様変更について](https://developer.a-blogcms.jp/blog/news/template-21125.html)の記事をご覧ください）。

動的フォーム利用前には、private/config.system.yaml にある allow_tpl_path を有効にしてください。なお、ログインしている状態では tpl は有効化されているため問題なく完了ページまで移動することができますので、動作確認時はログアウトをしてご確認ください。

private/config.system.yaml 記述例：

```
allow_tpl_path: [recruit/thanks.html]
```

### サイトパーツ「よくあるご質問」

「よくあるご質問」は質問ごとにエントリーを作成し、一覧ページでの質問文押下時に回答内容を[ポストインクルード](https://developer.a-blogcms.jp/document/postinclude/)で取得する仕様となっております。
この記述のなかで tpl パラメーターを使用しており、前述の「**動的フォーム**」と同様の理由により private/config.system.yaml での allow_tpl_path の設定が必要です。

「よくあるご質問」をご利用の際は、以下のようにご設定ください。
（allow_tpl_path を複数設定される場合は、`,` で区切ってご設定ください）

private/config.system.yaml 記述例：

```
allow_tpl_path: [faq/post-entry.html]
```
