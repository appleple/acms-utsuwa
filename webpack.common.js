const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const pkg = require('./package.json');

let cssOutput = 'compressed';
let cssFilename = '[name].min.css';
let cssChunkFilename = `[name].min.chunk.css?date=${new Date().getTime()}`;

if (process.env.npm_lifecycle_event === 'uncompress') {
  cssOutput = 'expanded';
  cssFilename = '[name].css';
  cssChunkFilename = `[name].chunk.css?date=${new Date().getTime()}`;
}
if (process.env.npm_lifecycle_event === 'dev') {
  cssOutput = 'expanded';
}

module.exports = {
  cache: true,
  target: ['web', 'es5'],
  entry: {
    bundle: `${__dirname}/src/js/index.js`,
    normalize: './src/js/normalize-css.js',
    admin: `${__dirname}/src/js/admin.js`,
  },
  output: {
    path: `${__dirname}/dest/`,
    publicPath: `/themes/${pkg.config.theme}/dest/`,
    filename: '[name].js',
    chunkFilename: `[name].chunk.js?date=${new Date().getTime()}`,
    assetModuleFilename: 'assets/[name][ext]',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.tsx'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        include: /src\/js/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass">
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    grid: "no-autoplace",
                  }),
                ],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: true,
              sassOptions: {
                outputStyle: cssOutput,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|woff|woff2|eot|ttf)(\?.*$|$)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // <--- 4kb
          },
        },
      },
    ],
  },
  plugins: [
    // ESLint
    new ESLintPlugin({
      context: './src',
      extensions: ['js', 'ts', 'tsx', 'jsx', 'vue'],
      exclude: ['/node_modules/'],
      emitError: true,
      emitWarning: true,
      failOnError: true,
      fix: true,
    }),
    // StyleLint
    new StylelintPlugin({
      configFile: '.stylelintrc',
      context: './src/scss',
      emitError: true,
      emitWarning: true,
      failOnError: true,
      fix: true,
    }),
    // Vue Loader
    new VueLoaderPlugin(),
    // HTMLファイルを出力
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: true,
    }),
    // cssの書き出し
    new MiniCssExtractPlugin({
      filename: cssFilename,
      chunkFilename: cssChunkFilename,
    }),
    // 余分なJSを書き出さない
    new RemoveEmptyScriptsPlugin({ extensions:['css.js'] }),
  ],
};
