import { describe, expect, it } from 'vitest';
import { planResourcePick } from './resource-pick.utils';

describe('planResourcePick', () => {
  // The regression this guards: moving the no-text-collection guard back above the install would
  // make an unbound panel skip the download entirely, which is what left Get Resources looking
  // broken. Installing needs no text collection; only adding to one does.
  it('installs a resource that needs downloading whether or not a text collection is bound', () => {
    expect(planResourcePick(false, true).shouldInstall).toBe(true);
    expect(planResourcePick(false, false).shouldInstall).toBe(true);
  });

  it('installs nothing when the resource is already on disk', () => {
    expect(planResourcePick(true, true).shouldInstall).toBe(false);
    expect(planResourcePick(true, false).shouldInstall).toBe(false);
  });

  it('confirms the download when it installed with nowhere to add it', () => {
    expect(planResourcePick(false, false)).toEqual({
      shouldInstall: true,
      shouldConfirmDownloadOnly: true,
    });
  });

  it('does not confirm a download it did not perform', () => {
    // An already-installed resource with no text collection has nothing to do at all — the picker
    // stops offering these, and a stray pick must not claim something was downloaded.
    expect(planResourcePick(true, false)).toEqual({
      shouldInstall: false,
      shouldConfirmDownloadOnly: false,
    });
  });

  it('never confirms separately while a text collection is bound', () => {
    // With somewhere to add it, the resource appearing in the collection is the confirmation.
    expect(planResourcePick(false, true).shouldConfirmDownloadOnly).toBe(false);
    expect(planResourcePick(true, true).shouldConfirmDownloadOnly).toBe(false);
  });
});
