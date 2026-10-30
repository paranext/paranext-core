# Gate Explicit Focus in a Close Handler

This is a pointer. The rule lives in the Storybook guideline `Guidelines/Dismissal Patterns` →
Accessibility → "Restore focus on close"
(`lib/platform-bible-react/src/stories/guidelines/dismissal-patterns.mdx`); read it there.

## The rule

An `onCloseAutoFocus` handler that calls `preventDefault()` and then focuses something itself
bypasses the shared focus-return rule (a menu closed by a window blur must not pull focus out of
another frame or a web view). Gate that focus call with
`shouldSuppressFocusReturn(document, isRunningInWebView())`. Both are exported from
`platform-bible-react` (`@experimental`).

Examples: `navigation-history-buttons.component.tsx` and the footnote caller and type dropdowns
(`footnote-caller-dropdown.component.tsx`, `footnote-type-dropdown.component.tsx`).

## Testing a new site

- Another frame holds focus: create an iframe and stub it as `document.activeElement`
  (`navigation-history-buttons.component.test.tsx`).
- An unfocused web view: `vi.stubGlobal('top', {})` BEFORE render (the hook reads it once, on
  mount) plus `document.hasFocus()` returning `false`
  (`footnote-caller-dropdown.component.test.tsx`).
- Keep a control that closes through the normal path (for example Enter) and still expects the
  focus call.

## Do not re-derive the rule

Do not rebuild the gate from `document.hasFocus()` alone: in the main document an unfocused window
means an alt-tab, where focus should return to the trigger.
