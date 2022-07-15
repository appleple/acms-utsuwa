const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

process.env.BABEL_ENV = 'production';

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
  ]
});
