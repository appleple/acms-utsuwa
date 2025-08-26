# テーマ「Beginner」

## GitHub

最新版のソースコードは以下のレポジトリでご確認ください。
https://github.com/appleple/acms-Beginner

### GitHub から Beginner テーマを使用する手順

1. GitHub から最新版の Beginner テーマのソースコードをダウンロードする
2. a-blog cms を設置した環境の themes ディレクトリ直下に Beginner ディレクトリを作成し、ダウンロードしたファイルを設置する
3. /setup フォルダをリネームしたフォルダ/bin/内に、　ダウンロードしたファイルに含まれている/\_bin/ディレクトリの Beginner ディレクトリを設置する（すでに Beginner ディレクトリがある場合は、上書きする）
4. メンテナンスプログラム（https://ドメイン/setup フォルダをリネームしたフォルダ/index.php）にアクセスする
5. 「インポート実行画面へ」を押下する
6. 「1. インポート先またはその親になるブログを選択してください。」で任意のものを選択、「2. インポートするブログデータ名を選択してください。」は「Beginner」を選択、「3. コンフィグ関連のインポート設定」は新規インストールの場合は全てチェックして、「インポートを実行する」を押下する

これで、サイトにアクセスすると Beginner テーマがインストールされます。

## Figma

デザインファイルは、Figma Community にて公開しています。
https://www.figma.com/community/file/1154719653085540673

[Get a copy]ボタンから複製してお使いください。
※複製して使うには Figma アカウントが必要です（Beginner のファイルを触るくらいなら無料プランで OK です）。

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

Beginner テーマを選択したときに、テンプレートをまとめて設定できるファイルです。使用するかどうかは管理画面＞テーマ＞テーマ設定 にて変更できます。

## フォルダ構成

### admin

Beginner テーマオリジナルの管理画面のテンプレートが入ったフォルダ。
Beginner テーマでは主に以下のテンプレートが入っています。

- カスタムフィールド（ブログ・カテゴリー・エントリー・モジュール・ユーザー）
- ダッシュボード

### カテゴリーコード名フォルダ

a-blog cms で作ったカテゴリーと同じコード名でフォルダを作ると、その中にある index.html と\_entry.html と calendar.html はそのカテゴリーの専用テンプレートとなります。
Beginner テーマでは以下のカテゴリー名フォルダを用意しています。

- blog（スタッフブログ）
- contact（お問い合わせ）
- news（お知らせ）
- recruit（採用情報）
- service（事業内容）

### \_layouts

テンプレートの継承機能で使用するファイルが入ったフォルダです。
用途としては、主に別テンプレートでレイアウトを統一するために使います。

### dest

Beginner テーマで使っている bundle.css が入ったフォルダです。
src フォルダの scss ファイルを結合したファイルです。

### images

#### /images/icon

CSSので色を制御する、装飾的なSVGアイコンが入っています。エラーメッセージや注意喚起など、サイトのテーマカラーに合わせて色を変えたいアイコンに使用します。
そのため、実装時には a-blog cms の @include() でHTMLにSVGをインライン呼び出しまたは、CSSでのmask-image指定をして読み込んでいます。

##### 実装例

- インラインSVG：a-blog cms の @include() を使ってHTMLに直接埋め込んでいます。SVGアイコンの path 色を currentColor とすることで、CSS の colorプロパティでカラー制御しています。

- CSS mask-image：CSS の mask-image プロパティを使用してSVGを読み込み、background-color を指定することで色を制御しています。

#### /images/icon-color

CSSで色を変更せず、そのままの色で使用するSVGアイコンが入っています。

### include

Beginner テーマ内のインクルードしているテンプレートをまとめたフォルダです。

include/edit/：管理画面への編集ボタンを生成するテンプレートです。実際の使い方は、/inlude/entry/summary-blog.html などのテンプレートをご参考にしてください。<br>
include/form/：動的フォームのテンプレートです。<br>
include/unit/：ユニットのテンプレートです。<br>
include/module/template/：モジュールユニットで使用するテンプレートです。

### src

Beginner テーマで使用している結合前の js や scss ファイルを管理しているフォルダです。

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

Beginner テーマでは、独自で以下のユニットのスタイルを調整しています。

- ファイルユニット ... スタイル調整のため
- メディアユニット ... ファイルユニットに合わせたスタイル調整のため

### カスタムユニット

カスタムユニットを使い、ユニットメニューに「余白」「罫線」「目次」を追加しています。

- /themes/beginner/include/unit/extend.html
- /themes/beginner/admin/entry/unit/extend.html

### グループユニット

グループユニットは`.gu-`で始まるクラス名を適用しています。

- gu-bg-gray

### DocumentOutliner

目次ユニットで使用している組み込み JS です。
カスタマイズは下記のファイルで行っています。

- /themes/Beginner/include/entry/body.html
- /themes/Beginner/admin/entry/unit/extend.html
- /themes/Beginner/include/unit/extend.html
- /themes/Beginner/src/scss/\_entry.scss

### 動的フォーム

動的フォームでは完了ページを表示するために URL コンテキストに tpl を使用しています。Ver. 2.11.25 より仕様変更があり、tpl はログアウト時にはデフォルトでは無効化される仕様となっております（この仕様変更に関しては詳しくは[Ver. 2.11.25 からのテンプレートの仕様変更について](https://developer.a-blogcms.jp/blog/news/template-21125.html)の記事をご覧ください）。

動的フォーム利用前には、private/config.system.yaml にある allow_tpl_path を有効にしてください。なお、ログインしている状態では tpl は有効化されているため問題なく完了ページまで移動することができますので、動作確認時はログアウトをしてご確認ください。

private/config.system.yaml 記述例：

```
allow_tpl_path: [recruit/thanks.html]
```
