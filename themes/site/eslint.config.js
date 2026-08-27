const js = require('@eslint/js');
const importX = require('eslint-plugin-import-x');
const globals = require('globals');

module.exports = [
  {
    ignores: ['dest/**', 'node_modules/**'],
  },
  js.configs.recommended,
  importX.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        $: 'readonly',
        jQuery: 'readonly',
        ACMS: 'readonly',
        event: 'readonly',
      },
    },
    settings: {
      'import-x/resolver': {
        webpack: {
          config: 'webpack.prod.js',
        },
      },
    },
    rules: {
      // 旧 airbnb-base の実際の設定 { groups: [['builtin', 'external', 'internal']] } を再現
      'import-x/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
      indent: ['error', 2, { ignoredNodes: ['TemplateLiteral'] }],
      'func-names': 'off',
      'template-curly-spacing': ['off', 'never'],
    },
  },
];
