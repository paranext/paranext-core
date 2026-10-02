import { describe, expect, it } from 'vitest';
import { mergeStateChangedDuringReload } from './web-view-state-merge.util';

/*
 * A reload hands the provider a snapshot of the web view's state and waits for its answer, while
 * the old iframe stays live and can keep writing state. The provider's answer was built from the
 * snapshot, so writing it back as-is undoes whatever the user did during the wait.
 */
describe('mergeStateChangedDuringReload', () => {
  it('keeps a value the live web view changed while the provider worked', () => {
    expect(
      mergeStateChangedDuringReload({ filter: 'all' }, { filter: 'all' }, { filter: 'resource' }),
    ).toEqual({ filter: 'resource' });
  });

  it("keeps the provider's own change to a key", () => {
    // An opener's preset, for example: the provider changed the key on purpose.
    expect(
      mergeStateChangedDuringReload(
        { filter: 'all' },
        { filter: 'paratextProject' },
        { filter: 'resource' },
      ),
    ).toEqual({ filter: 'paratextProject' });
  });

  it('keeps a key the live web view added and drops one it removed', () => {
    expect(
      mergeStateChangedDuringReload(
        { removed: 1, kept: 2 },
        { removed: 1, kept: 2 },
        { kept: 2, added: 3 },
      ),
    ).toEqual({ kept: 2, added: 3 });
  });

  it("keeps a key the provider dropped, as long as the live web view didn't touch it", () => {
    expect(
      mergeStateChangedDuringReload(
        { legacy: true, kept: 1 },
        { kept: 1 },
        { legacy: true, kept: 1 },
      ),
    ).toEqual({ kept: 1 });
  });

  it('compares by value, not by reference', () => {
    // State crosses a serialization boundary, so an unchanged object arrives as a new one.
    expect(
      mergeStateChangedDuringReload(
        { selection: { id: 'a' } },
        { selection: { id: 'a' } },
        {
          selection: { id: 'a' },
        },
      ),
    ).toEqual({ selection: { id: 'a' } });
    expect(
      mergeStateChangedDuringReload(
        { selection: { id: 'a' } },
        { selection: { id: 'a' } },
        {
          selection: { id: 'b' },
        },
      ),
    ).toEqual({ selection: { id: 'b' } });
  });

  it("returns the provider's state when nothing changed during the wait", () => {
    const providerState = { filter: 'paratextProject' };
    expect(mergeStateChangedDuringReload({ filter: 'all' }, providerState, { filter: 'all' })).toBe(
      providerState,
    );
  });
});
