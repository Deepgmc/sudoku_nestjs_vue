// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
//import eslintPluginVue from 'eslint-plugin-vue';
export default tseslint.config(
    {
        ignores: [
            'eslint.config.mjs',
            'babel.config.js',
            'maps/',
            'client/*/**',
            'client/**',
            'client/',
            'client/src/umbrella/zoneEntities/**',
        ],
    },
    eslint.configs.recommended,
    //eslintPluginVue.configs['flat/recommended'],
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
                ...globals.browser,
                ...globals.es2025,
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                requireConfigFile: false,
                //projectService: true,
                tsconfigRootDir: import.meta.dirname,
                //extraFileExtensions: [".vue"],
            },
        },
    },
    {
        rules: {
            'no-debugger': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-misused-promises": "warn",
            "@typescript-eslint/no-empty-object-type": "warn",
        },
    },
);