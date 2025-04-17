import { defineConfig, globalIgnores } from "eslint/config";
import globals from 'globals';
import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

//import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';


export default defineConfig(
    eslint.configs.recommended,
    //tseslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        languageOptions: {
            parser: vueParser,
            //parser: tsParser,
            globals: {
                ...globals.es2025,
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'module',
            parserOptions: {
                parser: "@typescript-eslint/parser",
                ecmaVersion: 'latest',
                requireConfigFile: false,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: [".vue"],
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-empty-object-type": "off",


            "vue/require-prop-types": "error",
            "vue/prop-name-casing": "error",
            "vue/no-mutating-props": "error",
            "vue/html-indent": "off",
            "vue/max-attributes-per-line": "off",
            "vue/attribute-hyphenation": "off",
            "vue/attributes-order": "off",
            "vue/first-attribute-linebreak": "off",
            "vue/no-v-html": "off",
            "vue/html-self-closing": "off",
            "vue/require-default-prop": "off",
            "vue/singleline-html-element-content-newline": "off",
        },
    },
    [
        globalIgnores(["dist/**/*"])
    ],
    {
        files: ['eslint.config.js'],
        extends: [tseslint.configs.disableTypeChecked],
    },
);