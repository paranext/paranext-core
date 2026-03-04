import rule from './no-tailwind-shadows';
import { ruleTester } from '../test.utils';

ruleTester.run('no-tailwind-shadows', rule, {
  valid: [
    // Non-shadow Tailwind classes
    { code: `<div className="tw-flex tw-p-4 tw-rounded-md" />` },
    // Shadow-like word in non-className attribute
    { code: `<div id="tw-shadow" />` },
    // cn() with no shadow classes
    { code: `cn('tw-flex', 'tw-p-4')` },
  ],
  invalid: [
    // Basic shadow class
    {
      code: `<div className="tw-shadow" />`,
      errors: [{ messageId: 'shadowClass' }],
    },
    // Shadow size variant
    {
      code: `<div className="tw-shadow-sm" />`,
      errors: [{ messageId: 'shadowClass' }],
    },
    // Shadow large
    {
      code: `<div className="tw-shadow-lg" />`,
      errors: [{ messageId: 'shadowClass' }],
    },
    // In cn() call
    {
      code: `cn('tw-shadow-md', 'tw-p-4')`,
      errors: [{ messageId: 'shadowClass' }],
    },
    // In template literal className
    {
      code: '<div className={`tw-shadow tw-flex`} />',
      errors: [{ messageId: 'shadowClass' }],
    },
  ],
});
