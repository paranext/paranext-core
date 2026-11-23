// jsdom reports `document.hasFocus()` as false until something is focused, but the app window a
// component renders in is focused; tests that need a blurred window stub it with
// `vi.spyOn(document, 'hasFocus').mockReturnValue(false)`, which restores to this default.
if (typeof document !== 'undefined') document.hasFocus = () => true;
