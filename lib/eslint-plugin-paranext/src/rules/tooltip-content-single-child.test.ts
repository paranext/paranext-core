import rule from './tooltip-content-single-child';
import { ruleTester } from '../test.utils';

ruleTester.run('tooltip-content-single-child', rule, {
  valid: [
    // Plain text
    { code: `<TooltipContent>Save the project</TooltipContent>` },
    // One expression
    { code: `<TooltipContent>{label}</TooltipContent>` },
    // Text pieces next to each other merge into one flex item
    { code: `<TooltipContent>Save {name} now</TooltipContent>` },
    { code: `<TooltipContent>{label}{' '}{suffix}</TooltipContent>` },
    // One wrapping element
    { code: `<TooltipContent><p>{label}</p></TooltipContent>` },
    {
      code: `
        <TooltipContent>
          <div className="tw:flex tw:flex-col">
            <p>Title</p>
            <p>Description</p>
          </div>
        </TooltipContent>`,
    },
    // Text plus keycaps is the layout TooltipContent is built for
    { code: `<TooltipContent>Save <Kbd>⌘S</Kbd></TooltipContent>` },
    {
      code: `<TooltipContent>{label}<KbdGroup><Kbd>⌘</Kbd><Kbd>S</Kbd></KbdGroup></TooltipContent>`,
    },
    { code: `<TooltipContent>{label}{showKeys && <ShortcutKeys hint={hint} />}</TooltipContent>` },
    // One element plus keycaps
    { code: `<TooltipContent><span>{label}</span> <Kbd>⌘S</Kbd></TooltipContent>` },
    // Whitespace-only text between elements is not rendered as a flex item
    {
      code: `<TooltipContent><span>{label}</span>{' '}<ShortcutKeys hint={hint} /></TooltipContent>`,
    },
    // Comments are not content
    { code: `<TooltipContent>{/* why */}<p>{label}</p></TooltipContent>` },
    // A conditional that renders one piece either way
    { code: `<TooltipContent>{isOn ? <p>On</p> : <p>Off</p>}</TooltipContent>` },
    // A className that switches away from the side-by-side layout opts out
    { code: `<TooltipContent className="tw:flex-col"><p>Title</p><p>Body</p></TooltipContent>` },
    {
      code: `<TooltipContent className="tw:block tw:max-w-xs"><p>Title</p><p>Body</p></TooltipContent>`,
    },
    {
      code: `<TooltipContent className={cn('tw:flex-col', extra)}><p>Title</p><p>Body</p></TooltipContent>`,
    },
    // Other components are not checked
    { code: `<PopoverContent><p>Title</p><p>Body</p></PopoverContent>` },
  ],
  invalid: [
    // Two elements
    {
      code: `<TooltipContent><p>Title</p><p>Body</p></TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    // Text next to an element that is not a keycap
    {
      code: `<TooltipContent>Delete <strong>{name}</strong> permanently?</TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    {
      code: `<TooltipContent>{label}<span className="tw:text-muted">{detail}</span></TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    // Keycaps do not make the rest acceptable
    {
      code: `<TooltipContent><p>Title</p><p>Body</p><Kbd>⌘S</Kbd></TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    // A fragment's children are separate pieces
    {
      code: `<TooltipContent><><p>Title</p><p>Body</p></></TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    // A conditional piece counts when it renders
    {
      code: `<TooltipContent><p>{label}</p>{detail && <p>{detail}</p>}</TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    {
      code: `<TooltipContent>{label}{isOn ? <p>On</p> : undefined}</TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    // A mapped list renders one piece per item
    {
      code: `<TooltipContent>{lines.map((line) => <p key={line}>{line}</p>)}</TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
    // A className that does not change the layout does not opt out
    {
      code: `<TooltipContent className="tw:max-w-xs"><p>Title</p><p>Body</p></TooltipContent>`,
      errors: [{ messageId: 'sideBySide' }],
    },
  ],
});
