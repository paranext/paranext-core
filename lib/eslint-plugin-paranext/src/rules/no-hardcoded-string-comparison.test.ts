import rule from './no-hardcoded-string-comparison';
import { ruleTester } from '../test-utils';

ruleTester.run('no-hardcoded-string-comparison', rule, {
  valid: [
    // Technical string comparison (kebab-case)
    { code: `if (encoding === 'utf-8') {}` },
    // Short string (less than 4 chars)
    { code: `if (x === 'yes') {}` },
    // camelCase identifier (looks technical)
    { code: `if (type === 'textField') {}` },
    // Constant comparison
    { code: `if (status === STATUS.SUCCESS) {}` },
    // Localization key pattern
    { code: `if (key === '%my_key%') {}` },
    // File extension
    { code: `if (ext === '.json') {}` },
    // MIME type
    { code: `if (type === 'application/json') {}` },
    // Non-equality operator
    { code: `if (str > 'File not found') {}` },
    // Number comparison
    { code: `if (x === 42) {}` },
    // SCREAMING_SNAKE_CASE
    { code: `if (x === 'ERROR_CODE') {}` },
  ],
  invalid: [
    // English sentence comparison
    {
      code: `if (message === "File not found") {}`,
      errors: [{ messageId: 'hardcodedComparison' }],
    },
    // User-facing string with spaces
    {
      code: `if (title !== 'Welcome Back') {}`,
      errors: [{ messageId: 'hardcodedComparison' }],
    },
    // Template literal comparison
    {
      code: 'if (msg === `Something went wrong`) {}',
      errors: [{ messageId: 'hardcodedComparison' }],
    },
    // LHS string literal
    {
      code: `if ("Invalid input data" === error) {}`,
      errors: [{ messageId: 'hardcodedComparison' }],
    },
  ],
});
