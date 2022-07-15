module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          ie: 11,
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    'transform-es3-property-literals',
    'transform-es3-member-expression-literals',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-exponentiation-operator',
    // ['@babel/plugin-transform-modules-commonjs', { strictMode: false }],
  ],
  env: {
    production: {
      plugins: [
        'babel-plugin-minify-dead-code-elimination',
      ],
    },
  },
};
