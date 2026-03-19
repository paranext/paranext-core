// This test file necessarily contains directive text (prettier-ignore, stylelint-disable, etc.)
// as description comments and string fixtures — disabling the rule file-wide is correct here.
/* eslint-disable paranext/require-disable-comment */
import rule from './require-disable-comment';
import { ruleTester } from '../test.utils';

ruleTester.run('require-disable-comment', rule, {
  valid: [
    // valid: eslint-disable-next-line with explanatory comment on line above
    {
      code: `
// This is necessary because the API is loosely typed
// eslint-disable-next-line no-console
console.log('debug');
      `,
    },
    // Block eslint-disable with comment on line above
    {
      code: `
// Disabled for the entire file due to legacy code
/* eslint-disable no-console */
console.log('hello');
      `,
    },
    // prettier-ignore with comment on line above
    {
      code: `
// Preserve manual alignment for readability
// prettier-ignore
const matrix = [1, 0,
                0, 1];
      `,
    },
    // prettier-ignore-start with comment on line above
    {
      code: `
// Keep this block formatted manually
// prettier-ignore-start
const a = 1;
// prettier-ignore-end
      `,
    },
    // stylelint-disable with comment on line above
    {
      code: `
// Legacy vendor prefix required for browser support
// stylelint-disable vendor-prefix
      `,
    },
    // stylelint-disable-next-line with comment on line above
    {
      code: `
// Needed for dynamic class injection
// stylelint-disable-next-line selector-class-pattern
      `,
    },
    // eslint-enable alone — not flagged
    {
      code: `/* eslint-enable no-console */`,
    },
    // stylelint-enable alone — not flagged
    {
      code: `// stylelint-enable vendor-prefix`,
    },
    // prettier-ignore-end alone — not flagged
    {
      code: `// prettier-ignore-end`,
    },
    // No disable directives at all
    {
      code: `const x = 1; // a normal comment`,
    },
    // Multi-line block comment immediately above (ends on line above)
    {
      code: `
/**
 * This function uses console for debugging in tests.
 */
// eslint-disable-next-line no-console
function wrap() { console.log('ok'); }
      `,
    },
    // valid: eslint-disable-line with comment on preceding line
    {
      code: `
// This value comes from an untyped external source
console.log('x'); // eslint-disable-line no-console
      `,
    },
    // stylelint-disable-line with comment on preceding line
    {
      code: `
// Required for legacy component integration
const cls = 'myClass'; // stylelint-disable-line selector-class-pattern
      `,
    },
    // valid: @ts-expect-error with explanatory comment on line above
    {
      code: `
// TypeScript doesn't narrow the type correctly in this branch
// @ts-expect-error ts(2322)
const x: string = getValue();
      `,
    },
    // valid: @ts-ignore with explanatory comment on line above
    {
      code: `
// Third-party types are incomplete for this method
// @ts-ignore
externalLib.undocumentedMethod();
      `,
    },
    // valid: @ts-nocheck with explanatory comment on line above
    {
      code: `
// This file is auto-generated and should not be type-checked
// @ts-nocheck
      `,
    },
    // valid: @ts-expect-error with inline explanation (no preceding comment needed)
    {
      code: `
// @ts-expect-error we want to remove Function because it can create code from strings
delete globalThis.Function;
      `,
    },
    // valid: @ts-ignore with inline explanation
    {
      code: `
// @ts-ignore TypeScript pretends it can't find 'selector', but it works just fine
const sel = hook.selector;
      `,
    },
    // valid: @ts-expect-error with inline explanation after error code
    {
      code: `
// @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function
mockFn.mockReturnValue(42);
      `,
    },
    // valid: @ts-ignore with colon-prefixed inline explanation
    {
      code: `
// @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
import something from '@papi/core';
      `,
    },
    // valid: @ts-expect-error with inline explanation above eslint-disable (consecutive group)
    {
      code: `
// @ts-expect-error we want to remove eval because it can create code from strings
// eslint-disable-next-line no-eval
delete globalThis.eval;
      `,
    },
    // Comment above a group of @ts-ignore + eslint-disable
    {
      code: `
// This will be needed later for disposing of the network object
// @ts-ignore 6133
// eslint-disable-next-line no-unused-vars
const disposer = createNetworkObject();
      `,
    },
    // Comment above two stacked eslint-disable-next-line directives
    {
      code: `
// Explanation covering both disables
// eslint-disable-next-line no-console
// eslint-disable-next-line no-debugger
debugger;
      `,
    },
  ],
  invalid: [
    // invalid: eslint-disable-next-line with no comment above
    {
      code: `
// eslint-disable-next-line no-console
console.log('debug');
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // Block eslint-disable with no comment above
    {
      code: `/* eslint-disable no-console */`,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // invalid: eslint-disable-line with no comment on preceding line
    {
      code: `console.log('x'); // eslint-disable-line no-console`,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // prettier-ignore with no comment above
    {
      code: `
// prettier-ignore
const matrix = [1, 0, 0, 1];
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // prettier-ignore-start with no comment above
    {
      code: `
// prettier-ignore-start
const a = 1;
// prettier-ignore-end
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // stylelint-disable with no comment above
    {
      code: `// stylelint-disable vendor-prefix`,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // stylelint-disable-next-line with no comment above
    {
      code: `// stylelint-disable-next-line selector-class-pattern`,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // stylelint-disable-line with no comment on preceding line
    {
      code: `const cls = 'myClass'; // stylelint-disable-line selector-class-pattern`,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // Disable where preceding comment is also a disable directive (stacked without explanation)
    {
      code: `
// eslint-disable-next-line no-console
// eslint-disable-next-line no-debugger
debugger;
      `,
      errors: [
        { messageId: 'missingExplanation' }, // first disable has no explanation above it
        { messageId: 'missingExplanation' }, // second disable's "explanation" is itself a disable
      ],
    },
    // Disable where preceding comment has a blank line gap
    {
      code: `
// This is an explanation

// eslint-disable-next-line no-console
console.log('x');
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // invalid: @ts-expect-error with only an error code (not a real explanation)
    {
      code: `
// @ts-expect-error ts(2322)
const x: string = getValue();
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // invalid: @ts-expect-error bare with no explanation at all
    {
      code: `
// @ts-expect-error
const x: string = getValue();
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // invalid: @ts-ignore bare with no comment above
    {
      code: `
// @ts-ignore
externalLib.undocumentedMethod();
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // invalid: @ts-nocheck bare with no comment above
    {
      code: `// @ts-nocheck`,
      errors: [{ messageId: 'missingExplanation' }],
    },
    // invalid: @ts-expect-error with only a numeric error code (not a real explanation)
    {
      code: `
// @ts-expect-error 2322
const x: string = getValue();
      `,
      errors: [{ messageId: 'missingExplanation' }],
    },
  ],
});
