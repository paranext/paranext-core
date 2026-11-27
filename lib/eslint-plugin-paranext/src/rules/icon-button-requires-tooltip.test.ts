import rule from './icon-button-requires-tooltip';
import { ruleTester } from '../test.utils';

const LUCIDE_IMPORT = `import { Save, Trash2 } from 'lucide-react';`;

ruleTester.run('icon-button-requires-tooltip', rule, {
  valid: [
    // Icon-sized button wrapped in a TooltipTrigger
    {
      code: `
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" aria-label={saveLabel}><Save /></Button>
          </TooltipTrigger>
          <TooltipContent>{saveLabel}</TooltipContent>
        </Tooltip>
      `,
    },
    // TooltipTrigger with another asChild trigger stacked between it and the button
    {
      code: `
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button size="icon-sm"><Save /></Button>
            </PopoverTrigger>
          </TooltipTrigger>
        </Tooltip>
      `,
    },
    // Conditional rendering inside the trigger
    {
      code: `<TooltipTrigger asChild>{isShown && <Button size="icon"><Save /></Button>}</TooltipTrigger>`,
    },
    // Rendered from a .map() callback inside the trigger
    {
      code: `<TooltipTrigger>{items.map((item) => <button key={item}><XIcon /></button>)}</TooltipTrigger>`,
    },
    // Namespaced trigger from the Radix primitive
    {
      code: `<TooltipPrimitive.Trigger asChild><Button size="icon"><Save /></Button></TooltipPrimitive.Trigger>`,
    },
    // Text button is not an icon button
    { code: `<Button size="sm">{saveLabel}</Button>` },
    // Icon with visible text is not icon-only
    { code: `${LUCIDE_IMPORT} <Button><Save />{saveLabel}</Button>` },
    // Non-icon single child element
    { code: `<Button><span>{saveLabel}</span></Button>` },
    // Single child component that is not an icon
    { code: `<Button><Spinner /></Button>` },
    // Dynamic size is not resolved
    { code: `<Button size={isCompact ? 'icon' : 'sm'}>{saveLabel}</Button>` },
    // Not a button
    { code: `${LUCIDE_IMPORT} <Toggle size="icon"><Save /></Toggle>` },
    // Tooltip applies to the icon button even when the TooltipTrigger is further up the tree
    {
      code: `
        <TooltipTrigger asChild>
          <div>
            <Button size="icon-xs"><Trash2Icon /></Button>
          </div>
        </TooltipTrigger>
      `,
    },
    // Button held in a variable that is rendered inside a TooltipTrigger
    {
      code: `
        const button = <Button size="icon"><Save /></Button>;
        const element = (
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
          </TooltipTrigger>
        );
      `,
    },
    // Variable rendered inside a trigger in one branch is treated as covered
    {
      code: `
        const button = <Button size="icon"><Save /></Button>;
        const element = label ? <TooltipTrigger asChild>{button}</TooltipTrigger> : button;
      `,
    },
  ],
  invalid: [
    // Icon-sized button with no tooltip
    {
      code: `<Button size="icon" aria-label={saveLabel}><Save /></Button>`,
      errors: [{ messageId: 'missingTooltip' }],
    },
    // Each icon size variant counts
    {
      code: `<Button size="icon-sm"><Save /></Button>`,
      errors: [{ messageId: 'missingTooltip' }],
    },
    {
      code: `<Button size={'icon-xs'}><Save /></Button>`,
      errors: [{ messageId: 'missingTooltip' }],
    },
    {
      code: '<Button size={`icon-lg`}><Save /></Button>',
      errors: [{ messageId: 'missingTooltip' }],
    },
    // A title attribute is not a tooltip
    {
      code: `${LUCIDE_IMPORT} <Button variant="ghost" title={saveLabel}><Save /></Button>`,
      errors: [{ messageId: 'missingTooltip' }],
    },
    // Native button whose only child is a lucide icon (detected by import, not name)
    {
      code: `${LUCIDE_IMPORT}
        <button type="button" aria-label={deleteLabel}>
          <Trash2 className="tw:h-4 tw:w-4" />
        </button>`,
      errors: [{ messageId: 'missingTooltip' }],
    },
    // Single child whose name ends in Icon
    {
      code: `<Button variant="ghost"><ChevronDownIcon /></Button>`,
      errors: [{ messageId: 'missingTooltip' }],
    },
    // Inside a Tooltip but not its trigger (e.g. in the content) is still missing a tooltip
    {
      code: `
        <Tooltip>
          <TooltipTrigger asChild><span>{label}</span></TooltipTrigger>
          <TooltipContent><Button size="icon"><Save /></Button></TooltipContent>
        </Tooltip>
      `,
      errors: [{ messageId: 'missingTooltip' }],
    },
    // Button held in a variable that is never rendered inside a TooltipTrigger
    {
      code: `
        const button = <Button size="icon"><Save /></Button>;
        const element = <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>;
      `,
      errors: [{ messageId: 'missingTooltip' }],
    },
    // A lucide import below the JSX still identifies the icon
    {
      code: `const element = <button type="button"><Trash2 /></button>;
        import { Trash2 } from 'lucide-react';`,
      errors: [{ messageId: 'missingTooltip' }],
    },
    // Another trigger does not supply a tooltip
    {
      code: `<PopoverTrigger asChild><Button size="icon"><Save /></Button></PopoverTrigger>`,
      errors: [{ messageId: 'missingTooltip' }],
    },
  ],
});
