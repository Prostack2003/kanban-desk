import js from '@eslint/js';
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: parser,
      globals: {
        browser: true,
      },
    },
    plugins: {
      react,
      '@typescript-eslint': typescript,
    },
    rules: {
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': ['error', { allowGlobals: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
