module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // This is a tooling package, not app code, so console is fine
    'no-console': 'off',
    // export default createRule({...}) is idiomatic for ESLint rule modules
    'import/no-anonymous-default-export': 'off',
    // ESLint AST APIs use null (e.g., node.parent can be null)
    'no-null/no-null': 'off',
  },
};
