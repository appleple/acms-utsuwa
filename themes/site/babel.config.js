module.exports = {
  presets: ['@babel/preset-env'],
  // Babel 8 の preset-env は useBuiltIns/corejs オプションを廃止した。usage-global 方式の
  // core-js polyfill 注入は babel-plugin-polyfill-corejs3 に移管する（挙動は useBuiltIns: 'usage' と同等）。
  plugins: [['babel-plugin-polyfill-corejs3', { method: 'usage-global', version: '3.50' }]],
};
