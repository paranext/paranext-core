import { describe, expect, it, vi } from 'vitest';
import { runMarkerPaletteSession } from './marker-palette-session.util';

type Item = { marker: string };

function setUp(options: {
  resolveWith: string | undefined;
  hasEditorChangedSinceFocus?: () => boolean;
}) {
  let resolveShow: (id: string | undefined) => void = () => {};
  const showPromise = new Promise<string | undefined>((resolve) => {
    resolveShow = resolve;
  });
  const sessionCounterRef = { current: 0 };
  const calls = {
    applyItem: vi.fn(),
    restoreSelectionIfLost: vi.fn(),
    focusEditor: vi.fn(),
    clearSessionIfCurrent: vi.fn(),
    onShowError: vi.fn(),
  };
  runMarkerPaletteSession<Item>({
    items: [{ marker: 'q1' }, { marker: 'p' }],
    kind: 'enter',
    sessionCounterRef,
    setSession: () => {},
    clearSessionIfCurrent: calls.clearSessionIfCurrent,
    runSessionKey: () => {},
    show: () => showPromise,
    restoreSelectionIfLost: calls.restoreSelectionIfLost,
    ...(options.hasEditorChangedSinceFocus
      ? { hasEditorChangedSinceFocus: options.hasEditorChangedSinceFocus }
      : {}),
    focusEditor: calls.focusEditor,
    applyItem: calls.applyItem,
    onShowError: calls.onShowError,
  });
  resolveShow(options.resolveWith);
  return { showPromise, ...calls };
}

/** Lets the spine's `.then` handler run. */
const settle = async (showPromise: Promise<string | undefined>) => {
  await showPromise;
  await Promise.resolve();
};

describe('runMarkerPaletteSession — the editor-change guard', () => {
  it('applies the commit when the editor did not move', async () => {
    const { showPromise, applyItem } = setUp({
      resolveWith: 'q1',
      hasEditorChangedSinceFocus: () => false,
    });

    await settle(showPromise);

    expect(applyItem).toHaveBeenCalledWith({ marker: 'q1' });
  });

  it('REFUSES the commit when the editor changed under the open palette', async () => {
    // A commit applies at the caret. If content or the caret moved while the palette was open, the
    // marker would land somewhere the user never chose — and the caret restored from the focus-out
    // capture would address content that no longer exists. Better to apply nothing and let the
    // user reopen the palette where they do want it.
    const { showPromise, applyItem } = setUp({
      resolveWith: 'q1',
      hasEditorChangedSinceFocus: () => true,
    });

    await settle(showPromise);

    expect(applyItem).not.toHaveBeenCalled();
  });

  it('still hands focus and the caret back when it refuses', async () => {
    // Refusing must not strand the user in the palette with no caret.
    const { showPromise, restoreSelectionIfLost, focusEditor } = setUp({
      resolveWith: 'q1',
      hasEditorChangedSinceFocus: () => true,
    });

    await settle(showPromise);

    expect(restoreSelectionIfLost).toHaveBeenCalled();
    expect(focusEditor).toHaveBeenCalled();
  });

  it('applies normally for a consumer that supplies no guard at all', async () => {
    // The option is optional; omitting it must not silently disable commits.
    const { showPromise, applyItem } = setUp({ resolveWith: 'p' });

    await settle(showPromise);

    expect(applyItem).toHaveBeenCalledWith({ marker: 'p' });
  });

  it('does not consult the guard on a DISMISSAL, which applies nothing anyway', async () => {
    const hasEditorChangedSinceFocus = vi.fn(() => true);
    const { showPromise, applyItem } = setUp({
      resolveWith: undefined,
      hasEditorChangedSinceFocus,
    });

    await settle(showPromise);

    expect(applyItem).not.toHaveBeenCalled();
    expect(hasEditorChangedSinceFocus).not.toHaveBeenCalled();
  });
});
