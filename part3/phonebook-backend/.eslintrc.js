module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'eslint:recommended',
  plugins: ['@stylistic'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    '@stylistic/indent': ['error', 2],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'never']
  }
}
