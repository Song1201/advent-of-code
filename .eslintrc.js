module.exports = {
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
    },
    plugins: ['react'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
};
