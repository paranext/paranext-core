import rule from './no-hardcoded-tailwind-colors';
import { ruleTester } from '../test-utils';

ruleTester.run('no-hardcoded-tailwind-colors', rule, {
  valid: [
    // Theme token usage
    { code: `<div className="tw-bg-background tw-text-foreground" />` },
    // Allowed semantic tokens
    { code: `<div className="tw-bg-primary tw-text-primary-foreground" />` },
    // transparent, current, inherit
    { code: `<div className="tw-bg-transparent tw-text-inherit" />` },
    // Non-color Tailwind classes
    { code: `<div className="tw-flex tw-p-4 tw-rounded-md" />` },
    // cn() call with theme tokens
    { code: `cn('tw-bg-muted', 'tw-text-muted-foreground')` },
    // Sidebar theme tokens (loaded from themes.data.json)
    { code: `<div className="tw-bg-sidebar-background tw-text-sidebar-foreground" />` },
    // Non-className attribute
    { code: `<div id="tw-bg-black" />` },
  ],
  invalid: [
    // Hardcoded color in className
    {
      code: `<div className="tw-bg-black" />`,
      errors: [{ messageId: 'hardcodedColor' }],
    },
    // Named color with shade
    {
      code: `<div className="tw-text-red-500" />`,
      errors: [{ messageId: 'hardcodedColor' }],
    },
    // Multiple violations
    {
      code: `<div className="tw-bg-slate-100 tw-text-gray-900" />`,
      errors: [{ messageId: 'hardcodedColor' }, { messageId: 'hardcodedColor' }],
    },
    // cn() call with hardcoded colors
    {
      code: `cn('tw-bg-white', 'tw-text-black')`,
      errors: [{ messageId: 'hardcodedColor' }, { messageId: 'hardcodedColor' }],
    },
    // Template literal in className
    {
      code: '<div className={`tw-bg-blue-500 tw-p-4`} />',
      errors: [{ messageId: 'hardcodedColor' }],
    },
  ],
});
