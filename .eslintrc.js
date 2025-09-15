module.exports = {
  extends: ['expo', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'boundaries'],
  settings: {
    'import/resolver': {
      'typescript': true
    }
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'boundaries/element-types': [2, {
      'default': 'disallow',
      'rules': [
        { 'from': ['app'], 'allow': ['features', 'config'] },
        { 'from': ['features'], 'allow': ['domain', 'ports', 'schema', 'config'] },
        { 'from': ['domain'], 'allow': ['schema'] },
        { 'from': ['infra'], 'allow': ['ports', 'config', 'schema'] }
      ]
    }]
  },
};