const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const pkg = require('./package.json');

process.env.BABEL_ENV = 'production';

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
  ]
});
