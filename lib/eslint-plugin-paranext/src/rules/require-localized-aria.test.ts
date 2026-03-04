import rule from './require-localized-aria';
import { ruleTester } from '../test.utils';

ruleTester.run('require-localized-aria', rule, {
  valid: [
    // Localized string reference
    { code: `<button aria-label={localizedStrings['%general_close%']} />` },
    // Variable reference
    { code: `<button aria-label={closeLabel} />` },
    // Function call result
    { code: `<button aria-label={getLabel()} />` },
    // Member expression
    { code: `<button aria-label={labels.close} />` },
    // Empty string allowed
    { code: `<button aria-label="" />` },
    // Single character allowed
    { code: `<button aria-label="x" />` },
    // Non-aria prop is not checked
    { code: `<button title="Close dialog" />` },
    // Template literal with expressions
    // eslint-disable-next-line no-template-curly-in-string
    { code: '<button aria-label={`${prefix} close`} />' },
    // Conditional expression with localized values
    { code: `<div aria-label={isOpen ? closeLabel : openLabel} />` },
  ],
  invalid: [
    // Hardcoded string in aria-label
    {
      code: `<button aria-label="Close dialog" />`,
      errors: [{ messageId: 'hardcodedAria' }],
    },
    // Hardcoded string in aria-describedby
    {
      code: `<div aria-describedby="This describes the element" />`,
      errors: [{ messageId: 'hardcodedAria' }],
    },
    // Expression with hardcoded string
    {
      code: `<button aria-label={"Close dialog"} />`,
      errors: [{ messageId: 'hardcodedAria' }],
    },
    // Template literal with no expressions
    {
      code: '<button aria-label={`Close dialog`} />',
      errors: [{ messageId: 'hardcodedAria' }],
    },
  ],
});
