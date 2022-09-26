 テーマ「UTSUWA」Ver.2.0.1
====================================

 GitHub
------------------------------------
以下のレポジトリで最新のソースコードを開発しています。
https://github.com/appleple/acms-utsuwa

### GitHubからUTSUWAテーマを使用する手順

1. GitHubから最新版のUTSUWAテーマのソースコードをダウンロードする
2. a-blog cms を設置した環境のthemesディレクトリ直下にutsuwaディレクトリを作成し、ダウンロードしたファイルを設置する
3. /setupフォルダをリネームしたフォルダ/bin/内に、　ダウンロードしたファイルに含まれている/_bin/ディレクトリのutsuwaディレクトリを設置する（すでにutsuwaディレクトリがある場合は、上書きする）
4. メンテナンスプログラム（https://ドメイン/setupフォルダをリネームしたフォルダ/index.php）にアクセスする
5. 「インポート実行画面へ」を押下する
6. 「1. インポート先またはその親になるブログを選択してください。」で任意のものを選択、「2. インポートするブログデータ名を選択してください。」は「utsuwa」を選択、「3. コンフィグ関連のインポート設定」は新規インストールの場合は全てチェックして、「インポートを実行する」を押下する

これで、サイトにアクセスするとUTSUWAテーマがインストールされます。



 テーマフォルダ直下のテンプレート
------------------------------------
### _entry.html
詳細ページのテンプレートです。

### _top.html
トップページのテンプレートです。
### 404.html
404ページで表示されるテンプレートです。

### admin.html
管理画面のテンプレートです。（LiteEditorのスタイルを適用するためにカスタマイズしています）

### index.html
一覧ページのテンプレートです。

### search.html
キーワード検索時に使用されるテンプレートです。

### template.yaml
UTSUWAテーマを選択したときに、テンプレートをまとめて設定できるファイルです。使用するかどうかは管理画面＞コンフィグ＞テーマ設定 にて変更できます。

### thanks.html
動的フォーム使用時に利用される完了ページのテンプレートです。



フォルダ構成
------------------------------------
### admin
UTSUWAテーマオリジナルの管理画面のテンプレートが入ったフォルダ。
UTSUWAテーマでは主に以下のテンプレートが入っています。
* カスタムフィールド（ブログ・カテゴリー・エントリー・モジュール・ユーザー）
* ダッシュボード

### カテゴリーコード名フォルダ
a-blog cmsで作ったカテゴリーと同じコード名でフォルダを作ると、その中にあるindex.htmlと_entry.htmlとcalendar.htmlはそのカテゴリーの専用テンプレートとなります。
UTSUWAテーマでは以下のカテゴリー名フォルダを用意しています。
* blog（スタッフブログ）
* contact（お問い合わせ）
* news（お知らせ）
* recruit（採用情報）
* service（事業内容）

### _layouts
テンプレートの継承機能で使用するファイルが入ったフォルダです。
用途としては、主に別テンプレートでレイアウトを統一するために使います。

### dest
UTSUWAテーマで使っているJSやCSSが入ったフォルダです。
srcフォルダのファイルを結合したファイルです。
直接読み込むために使っているのはbunde.js、bundle.css、normalize.css、admin.js、admin.cssです。
そのほかはbundle.jsなどを経由して読み込まれています。

### images
UTSUWAテーマで使っている画像が入ったフォルダです

### include
UTSUWAテーマ内のインクルードしているテンプレートをまとめたフォルダです。

include/edit/：管理画面への編集ボタンを生成するテンプレートです。実際の使い方は、/inlude/entry/summary-blog.htmlなどのテンプレートをご参考にしてください。
include/form/：動的フォームのテンプレートです
include/unit/：ユニットのテンプレートです
include/module/template/：モジュールユニットで使用するテンプレートです


### src
UTSUWAテーマで使用している結合前のjsやscssファイルを管理しているフォルダです。



 利用している a-blog cms の基本機能
------------------------------------
### 用意しているカスタムフィールド

#### ブログ
* サイトの設定（BID1のみ）
* SEOの設定
* OGPの設定
* 会社情報（BID1のみ）
* Search Console（BID1のみ）
* アクセス解析（BID1のみ）
* script要素

#### カテゴリー
* SEOの設定
* OGPの設定
* ページタイトルの設定
* CTAの設定

#### エントリー
* SEOの設定
* OGPの設定
* 採用情報の概要・サムネイル情報（※ 採用情報のみ）
* 事業紹介のサムネイル情報（※ 事業紹介のみ）

#### モジュール
* 見出しの設定（「summary_blog」「summary_news」「summary_recruit」「summary_service」「banner_related_site」）
* YouTubeIDの設定（モジュールID「MF_video」のみ）
* メインビジュアルの設定（モジュールID「MF_main_visual」のみ）
* CTAの設定（モジュールID「MF_cta_top」「MF_cta_visual」）


#### ユーザー
* スタッフブログの記事下に表示するプロフィール情報


### フォーム
* 検索フォーム（404ページ）
* お問い合わせフォーム（お問い合わせページ）
* 動的フォーム（すべてのエントリーで使用可能です）

### エントリーの固定表示
エントリー編集ページの詳細設定の中にあるファイル名の入力欄を空にすると、エントリーが固定表示される機能。
企業情報、採用情報、お問い合わせ（入力ページ）


 行っているカスタマイズについて
------------------------------------
### 色について
/include/head/css-variables.cssにて、各種色を変更できるようになっております。
配布しているFigmaファイルでシミュレーションできますので、合わせてご利用ください。

* Figmaファイル配布場所：近日公開予定


### スライダーについて
お知らせのヘッドライン直下で使用しているスライダーはslickというjQueryプラグインを使用しています。使用方法に着いてはslickの公式サイトをご覧ください。

* slick / http://kenwheeler.github.io/slick/

### ビデオのモーダル表示について
modal-video.jsというjQueryプラグインを使用しています。使用方法に着いてはmodal-videoの公式サイトをご覧ください。

* modal-video.js / https://appleple.github.io/modal-video/

### ユニット

UTSUWAテーマでは、独自で以下のユニットのスタイルを調整しています。

* テキストユニット ... テキストユニットの際、不要な回り込みを防ぐためdiv要素が挿入されるようにしています。p要素であれば `is-p` などのclass属性が適用されます。
* テキストユニット（見出しのみ） ...見出しのみアンカーリンクをした時の対策として、上方向にネガティブマージンとボーダーを適用しています。
* ファイルユニット ... スタイル調整のため
* 引用ユニット ... スタイル調整のため
* メディアユニット ... ファイルユニットに合わせたスタイル調整のため

### カスタムユニット
カスタムユニットを使い、ユニットの追加に「メッセージ」「余白」「罫線」「価格表」「目次」のボタンを追加しています。
　* /themes/utsuwa/include/unit/extend.html
　* /themes/utsuwa/admin/entry/unit/extend.html

### ユニットグループ

ユニットグループは`.ug-`で始まるクラス名を適用しています。
* ug-bg-gray
* ug-bg-primary
* ug-cover
* ug-text-center
* ug-border
* ug-center

### テキストユニットを判別するクラス属性
エントリーで使用するHTML要素に直にスタイルを適用しないよう、 `.entry-text-unit` を介してスタイルを指定しています。
これにより例えば、カスタムユニット内のul要素にエントリーの「リスト」のスタイルが適用されません。

#### 記述例：
```scss
.#{acms.$entry-class} .entry-text-unit  {
  ul {
    // ... 省略 ...
  }
}
```

### LiteEditor
LiteEditorに関するカスタマイズは下記のファイルで行っています。

* /themes/utsuwa/src/js/index.js
* /themes/utsuwa/src/js/edit.js
* /themes/utsuwa/admin.html
* /themes/utsuwa/src/scss/_editor.scss

### DocumentOutliner
目次ユニットで使用している組み込みJSです。
カスタマイズは下記のファイルで行っています。
* /themes/utsuwa/src/js/index.js
* /themes/utsuwa/include/entry/body.html
* /themes/utsuwa/admin/entry/unit/extend.html
* /themes/utsuwa/include/unit/extend.html
* /themes/utsuwa/src/scss/_entry.scss


### 組み込みJS

組み込みJSはログアウト時にはacms.jsが読み込まれていないのでそのままでは使えません。
/src/js/buildIn/にある各組み込みJSのファイルをインポートして使用します。

index.jsの13行目付近にて読み込み、26行目付近で利用しています。
ログイン時にはacms.jsを使用しているため、ifでacms.jsが有効か判断しています。
acms.jsが読み込まれていない場合は各組み込みJSを読み込み、elseの場合はLiteEditorなど編集画面で使用するJSの記述を行います。


開発環境について
------------------------------------
UTSUWAテーマでは、以下の作業のために開発環境を整えています。

* JSやCSSなどのファイルを1つにまとめる
* SCSSをCSSに変換する
* ソースコードを整形する

ここでは簡単に説明しておりますが、もっと詳しく知りたい場合は[公式テーマの webpack ビルド環境の使い方](https://developer.a-blogcms.jp/document/themes/webpack.html)をご覧ください。

### 使い方

1. themes/utsuwa で `npm install`してUTSUWAで使用している全てのパッケージをインストールする
2. その後、`npm run start` または `npm run dev` で開発を開始する（JSやCSSが1つにまとめたり、SCSSをCSSに自動で変換します）
3. リリースできるようになったら、`npm run build` でビルドする

マシンにnode.jsが入っていない方はnpmコマンドが使えないため、[公式サイト](https://nodejs.org/ja/)からインストールしてください。
.node-versionに記載しているバージョンと同じバージョンをインストールしてください。


### package.json
package.jsonにはUTSUWAで使用できるコマンドと使用しているパッケージがリストされています。

以下、一部の設定について紹介します。

#### package.jsonのconfig
* local ... 後述する npm run start のライブリロードで使用します。開発環境を表示しているドメインなどあれば記入してください。
* theme ... 使用しているテーマを記述します

#### package.jsonのscripts
* npm run build ... リリース用のCSSとJSを書き出します
* npm run dev ... 開発時用のCSSとJSを書き出します。（ソースマップを書き出すので、開発者ツール上からどのSCSSファイルのコードかわかります）
* npm run start ... devの機能に加えて、さらにライブリロードを行います
* npm run analyze ... 結合したファイルの各パッケージがどのくらいの容量を占めているか可視化してくれる機能です。

### webpack
* webpack.analyze.js ... バンドルファイル内の各パッケージがどのくらいの容量を占めているか知りたい
* webpack.common.js ... 各script実行時に共通のファイルです。
* webpack.dev.js ... 開発中のタスクに使用する
* webpack.prod.js ... リリース時のタスクに使用する

### 不可視ファイル
* .babelrc ... Babelの設定ファイル（JS関係）
* .editorconfig ... 自動で整形してくれるeditorconfigの設定ファイル
* .eslintrc ... ESLintの設定ファイル（JS関係）
* .gitignore ... Gitで管理しないものを設定するファイル
* .node-version ... node.jsのバージョンを管理するファイル。開発時に使用されたNode.jsのバージョンが記載されており、nodenvなどのバージョン管理ツール使用時に適用されます。
* .stylelintrc ... StyleLintの設定ファイル（SCSS、CSS関係）

