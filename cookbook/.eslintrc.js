module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['airbnb', 'plugin:jest/recommended', 'jest-enzyme'],
    plugins: [
        'import',
        'jsx-a11y',
        'react',
        'prettier',
        "only-warn"
    ],

    rules: {
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "react/prop-types":"warn",
        "react/button-has-type":"off",
        "jsx-a11y/label-has-associated-control":"off",

        'linebreak-style': 'off',
        'react/jsx-props-no-spreading': 'off',
        'implicit-arrow-linebreak': 'off',
        'operator-linebreak': 'off',
        'no-confusing-arrow': 'off',

        'arrow-parens': 'off',
        'object-curly-newline': 'off',
        'no-mixed-operators': 'off',
        'arrow-body-style': 'off',
        'function-paren-newline': 'off',
        'no-plusplus': 'off',
        'space-before-function-paren': 0,

        'max-len': ['error', 100, 2, { ignoreUrls: true, }],
        'no-console': 'error',
        'no-alert': 'error',

        'no-param-reassign': 'off',
        "radix": "off",

        'react/require-default-props': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],

        'prefer-destructuring': 'off',

        'react/no-find-dom-node': 'off',
        'react/no-did-mount-set-state': 'off',
        'react/no-unused-prop-types': 'off',
        'react/jsx-one-expression-per-line': 'off',

        /*"jsx-a11y/anchor-is-valid": ["error", { "components": ["Link"], "specialLink": ["to"] }],
        "jsx-a11y/label-has-for": [2, {
            "required": {
                "every": ["id"]
            }
        }], will be useful in future*/

        'prettier/prettier': ['off'],
    },
};