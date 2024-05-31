import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import jestPlugin from 'eslint-plugin-jest';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      // Global identifiers from different JavaScript environments
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // Files/Directories to be ignored by ESLint
  {
    ignores: ['**/node_modules/', '**/coverage/', '**/build/', '**/dist/'],
  },
  // ESLint Recommended Configuration
  {
    name: '@eslint/js:recommended',
    ...js.configs.recommended,
  },
  // TypeScript Recommended Configurations
  ...tseslint.configs.recommended.map((config) => {
    if (config.name === 'typescript-eslint/recommended') {
      return {
        ...config,
        // Have this configuration ignore these files
        ignores: ['**/*.config.js'],
      };
    } else {
      return config;
    }
  }),
  // TypeScript Recommended Configurationm Overrides & Additional Rules
  {
    name: 'typescript-eslint overrides',
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // React Recommended Rules
  {
    name: 'eslint-plugin-react:recommended',
    ...pluginReactConfig,
    settings: {
      react: {
        // Must set manually - cannot auto-detect from /client/package.json
        version: '18.3.1',
      },
    },
  },
  // React Additional Rules
  {
    name: 'eslint-plugin-react:additional',
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
    },
    settings: {
      react: {
        // Must set manually - cannot auto-detect from /client/package.json
        version: '18.3.1',
      },
    },
  },
  // Jest Recommended Rules
  {
    name: 'eslint-plugin-jest:recommended',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    ...jestPlugin.configs['flat/recommended'],
  },
  // Jest Recommended Rule Overrides
  {
    name: 'eslint-plugin-jest:overrides',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    // TODO - are these settings needed
    // plugins: {
    //   jestPlugin,
    // },
    // languageOptions: {
    //   globals: {
    //     ...globals.jest,
    //   },
    // },
    rules: {
      // 'jest/no-disabled-tests': 'off',
      // 'jest/no-test-prefixes': 'off',
      'jest/no-done-callback': 'off',
    },
  },
  // Turns of Rules to Allow prettier to format
  {
    name: 'eslint-config-prettier',
    ...eslintConfigPrettier,
  },
];
