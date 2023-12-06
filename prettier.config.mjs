/** @type {import("prettier").Config} */
const config = {
    singleQuote: true,
    tabWidth: 4,
    jsxSingleQuote: true,
    arrowParens: 'always',
    endOfLine: 'auto',
    overrides: [
        {
            files: '*.yml',
            options: { tabWidth: 2 },
        },
    ],
};

export default config;
