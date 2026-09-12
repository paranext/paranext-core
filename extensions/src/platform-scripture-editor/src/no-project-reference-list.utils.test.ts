import { describe, expect, it, vi } from 'vitest';
import type { DblResourceReference, ResourceReferenceList } from 'platform-scripture';

// The shipped allowlist is data that changes independently of this logic, so these tests drive off
// a fixed stand-in, as `free-resources.utils.test.ts` does. The two entries differ in case on
// purpose.
vi.mock('./free-resources.const', () => ({
  FREE_RESOURCE_DBL_ENTRY_UIDS: Object.freeze(['FREE0001', 'free0002']),
}));

// Imported after the mock so the allowlist lookup is built from the stand-in list.
const { noProjectReferenceListValidator } = await import('./no-project-reference-list.utils');

function list(items: ResourceReferenceList['items'], dataVersion = '1.1.0'): ResourceReferenceList {
  return { dataVersion, items };
}

function dblRef(id: string): DblResourceReference {
  return { type: 'dblResource', name: id, id };
}

describe('noProjectReferenceListValidator', () => {
  describe('shape', () => {
    it('accepts a list of allowlisted DBL references', async () => {
      expect(await noProjectReferenceListValidator(list([dblRef('FREE0001')]), list([]), {})).toBe(
        true,
      );
    });

    it('accepts an empty list', async () => {
      expect(await noProjectReferenceListValidator(list([]), list([dblRef('FREE0001')]), {})).toBe(
        true,
      );
    });

    it('rejects a value that is not an object', async () => {
      const notAnObject: ResourceReferenceList = JSON.parse('null');
      await expect(noProjectReferenceListValidator(notAnObject, list([]), {})).rejects.toThrow(
        /must be an object/,
      );
    });

    it('rejects a malformed dataVersion', async () => {
      await expect(
        noProjectReferenceListValidator(list([], 'not-a-version'), list([]), {}),
      ).rejects.toThrow(/`dataVersion` "not-a-version" is malformed/);
    });

    it('rejects `items` that is not an array', async () => {
      const badValue: ResourceReferenceList = JSON.parse(
        '{"dataVersion":"1.1.0","items":"not-array"}',
      );
      await expect(noProjectReferenceListValidator(badValue, list([]), {})).rejects.toThrow(
        /`items` must be an array/,
      );
    });

    it('rejects a reference that is not a DBL resource', async () => {
      // Only the no-project picker writes these settings, and it only writes DBL references. A
      // project reference here has no project to resolve against.
      const newValue = list([dblRef('FREE0001'), { type: 'project', name: 'P', id: 'p1' }]);
      await expect(noProjectReferenceListValidator(newValue, list([]), {})).rejects.toThrow(
        /index 1 is not a DBL resource reference/,
      );
    });

    it('rejects a DBL reference whose id is not a string', async () => {
      const badValue: ResourceReferenceList = JSON.parse(
        '{"dataVersion":"1.1.0","items":[{"type":"dblResource","name":"X","id":42}]}',
      );
      await expect(noProjectReferenceListValidator(badValue, list([]), {})).rejects.toThrow(
        /index 0 is not a DBL resource reference/,
      );
    });
  });

  describe('allowlist', () => {
    it('rejects a newly added resource that is not allowlisted', async () => {
      const newValue = list([dblRef('FREE0001'), dblRef('NOTFREE9')]);
      await expect(
        noProjectReferenceListValidator(newValue, list([dblRef('FREE0001')]), {}),
      ).rejects.toThrow(/index 1 is not a free \/ openly-licensed resource/);
    });

    it('accepts an allowlisted resource whatever its case', async () => {
      const newValue = list([dblRef('free0001'), dblRef('FREE0002')]);
      expect(await noProjectReferenceListValidator(newValue, list([]), {})).toBe(true);
    });

    it('lets an already-stored resource survive after it stops being allowlisted', async () => {
      // The allowlist can narrow. Rejecting a stored pick would force the write path to strip it on
      // the next unrelated pick, destroying what a later widening would restore; the read path
      // already hides it from the user.
      const stored = list([dblRef('WASFREE7')]);
      const newValue = list([dblRef('WASFREE7'), dblRef('FREE0001')]);
      expect(await noProjectReferenceListValidator(newValue, stored, {})).toBe(true);
    });

    it('matches already-stored resources case-insensitively', async () => {
      const stored = list([dblRef('WASFREE7')]);
      expect(await noProjectReferenceListValidator(list([dblRef('wasfree7')]), stored, {})).toBe(
        true,
      );
    });

    it('does not let a stored resource vouch for a different one', async () => {
      // Same stored list as the survival case above, so this can fail only on the id match itself.
      const stored = list([dblRef('WASFREE7')]);
      await expect(
        noProjectReferenceListValidator(list([dblRef('OTHER888')]), stored, {}),
      ).rejects.toThrow(/index 0 is not a free/);
    });

    it('still checks what is added when the current value is corrupt', async () => {
      const corruptCurrent: ResourceReferenceList = JSON.parse('null');
      expect(
        await noProjectReferenceListValidator(list([dblRef('FREE0001')]), corruptCurrent, {}),
      ).toBe(true);
      await expect(
        noProjectReferenceListValidator(list([dblRef('NOTFREE9')]), corruptCurrent, {}),
      ).rejects.toThrow(/index 0 is not a free/);
    });
  });
});
