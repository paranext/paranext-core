# Gate Explicit Focus in a Close Handler

This is a pointer. The rule lives in the Storybook guideline `Guidelines/Dismissal Patterns` →
Accessibility → "Restore focus on close"
(`lib/platform-bible-react/src/stories/guidelines/dismissal-patterns.mdx`); read it there.

## The rule

An `onCloseAutoFocus` handler that calls `preventDefault()` and then focuses something itself
bypasses the shared focus-return rule (a menu closed by a window blur must not pull focus out of
another frame or a web view). Gate that focus call with
`shouldSuppressFocusReturn(document, isRunningInWebView())`. Both are exported from
`platform-bible-react` (`@experimental`); extensions and the renderer combine the two themselves.

Inside `platform-bible-react`, use the library-internal helper instead:
`focusUnlessSuppressed(() => element.focus())` from `hooks/use-dismiss-on-window-blur.hook.ts`
applies the same gate (it is not exported from the package). Keep the handler's own
`preventDefault()`.

Examples: `navigation-history-buttons.component.tsx` and the footnote caller and type dropdowns
(`footnote-caller-dropdown.component.tsx`, `footnote-type-dropdown.component.tsx`).

## Testing a new site

- Another frame holds focus: create an iframe and stub it as `document.activeElement`
  (`navigation-history-buttons.component.test.tsx`).
- An unfocused web view: stub `top` before the surface mounts (the hook reads it on mount) with
  `vi.stubGlobal('top', {})`, plus `document.hasFocus()` returning `false`
  (`footnote-caller-dropdown.component.test.tsx`).
- Keep a control that closes through the normal path (for example Enter) and still expects the
  focus call.

## Do not re-derive the rule

Do not rebuild the gate from `document.hasFocus()` alone: in the main document an unfocused window
means an alt-tab, where focus should return to the trigger.
