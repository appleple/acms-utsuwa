const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');
const pkg = require('./package.json');

process.env.BABEL_ENV = 'development';

module.exports = webpackMerge.merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  target: 'web',
  devServer: {
    open: true,
    openPage: '',
    inline: true,
    hot: false,
    // contentBase: `${__dirname}/dest`,
    publicPath: `/themes/${pkg.config.theme}/dest/`,
    watchContentBase: true,
    port: 3000,
    proxy: {
      '**': {
        target: {
          host: pkg.config.local,
          protocol: 'http:',
          port: 80,
        },
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
