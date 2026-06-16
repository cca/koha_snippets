const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
    js.configs.recommended,
    {
        ignores: [
            'admin-js/loc-callnumbers.js', // ignore this third-party script
            'node_modules/**',
            'dist/**'
        ]
    },
    {
        languageOptions: {
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...globals.jquery
            }
        },
        rules: {
            // enforce no semicolons (prefer ASI)
            'semi': ['warn', 'never'],
            // these just throw too many deceptive errors due to the project's structure
            'no-undef': 'off',
            'no-unused-vars': 'off'
        }
    }
]
