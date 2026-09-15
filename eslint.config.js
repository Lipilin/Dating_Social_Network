import js from '@eslint/js';
import tseslint from 'typescript-eslint';

tseslint.configs.recommended['no-unused-vars'] = 'warn'
export default tseslint.config(
   {
    ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.adminjs/**',
        '*.config.js',
        '*.config.cjs',
        'coverage',
        'verstka', 
        '**/assets/**'
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-private-class-members': 'off',
      'no-console': 'warn',
      'indent': ['error', 4],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'max-len': ['error', { code: 120 }],
    },
  }
)