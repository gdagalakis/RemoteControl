module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
}
