import rule from './no-hardcoded-jsx-strings';
import { ruleTester } from '../test-utils';

ruleTester.run('no-hardcoded-jsx-strings', rule, {
  valid: [
    // Localized string reference
    { code: `<Button>{localizedStrings['%general_submit%']}</Button>` },
    // Short string (3 chars or less, not flagged)
    { code: `<span>OK</span>` },
    // Technical string
    { code: `<span>{'DATA_KEY'}</span>` },
    // CSS value in props
    { code: `<div title="10px" />` },
    // Non-user-facing prop
    { code: `<input type="text" />` },
    // Localization key pattern
    { code: `<div title="%my_key%" />` },
    // Whitespace-only JSX text
    { code: `<div>   </div>` },
    // Empty expression
    { code: `<div>{''}</div>` },
  ],
  invalid: [
    // Hardcoded JSX text
    {
      code: `<Button>Submit Form</Button>`,
      errors: [{ messageId: 'hardcodedString' }],
    },
    // String literal in JSX expression
    {
      code: `<div>{"Hello World"}</div>`,
      errors: [{ messageId: 'hardcodedString' }],
    },
    // Template literal with no expressions
    {
      code: '<div>{`Click here to continue`}</div>',
      errors: [{ messageId: 'hardcodedString' }],
    },
    // User-facing prop with hardcoded string
    {
      code: `<input placeholder="Enter your name" />`,
      errors: [{ messageId: 'hardcodedString' }],
    },
    // title prop with hardcoded string
    {
      code: `<div title="Close dialog" />`,
      errors: [{ messageId: 'hardcodedString' }],
    },
    // Expression in user-facing prop (fires from both JSXAttribute and JSXExpressionContainer)
    {
      code: `<img alt={"A beautiful sunset"} />`,
      errors: [{ messageId: 'hardcodedString' }, { messageId: 'hardcodedString' }],
    },
  ],
});
