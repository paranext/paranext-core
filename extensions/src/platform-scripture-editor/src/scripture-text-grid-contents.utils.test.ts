import { describe, expect, it } from 'vitest';
import type {
  DblResourceReference,
  ProjectReference,
  ResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';
import {
  addToUserResources,
  getScriptureTextGridContents,
  getViewOptionsTexts,
  removeFromUserResources,
  setUserDisplay,
  type TextCollectionSources,
} from './scripture-text-grid-contents.utils';

// #region fixtures

const project = (id: string, overrides?: Partial<ProjectReference>): ProjectReference => ({
  type: 'project',
  name: `Project ${id}`,
  id,
  ...overrides,
});

const dbl = (id: string, overrides?: Partial<DblResourceReference>): DblResourceReference => ({
  type: 'dblResource',
  name: `DBL ${id}`,
  id,
  ...overrides,
});

const list = (items: ResourceReference[] = []): ResourceReferenceList => ({
  dataVersion: CURRENT_DATA_VERSION,
  items,
});

const makeSources = (overrides?: Partial<TextCollectionSources>): TextCollectionSources => ({
  adminReferenced: list(),
  userReferenced: list(),
  overlay: {},
  ...overrides,
});

const ids = (refs: ResourceReference[]): string[] =>
  refs.map((ref) => ('id' in ref && typeof ref.id === 'string' ? ref.id : ref.type));

/** Reads a Bible-text flag off a reference without a type assertion. */
const flagOf = (
  ref: ResourceReference | undefined,
  key: 'isResourceShownByDefault' | 'isResourceShownForUser',
): boolean | undefined =>
  ref && (isProjectReference(ref) || isDblResourceReference(ref)) ? ref[key] : undefined;

/** Deep-freeze so any in-place mutation throws in strict mode. */
const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
};

// #endregion

describe('getScriptureTextGridContents', () => {
  it.each([
    {
      label: 'admin flagged true, overlay true → shown',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
          overlay: { a: true },
        }),
      expected: ['a'],
    },
    {
      label: 'admin flagged true, overlay false (user hid it) → hidden',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
          overlay: { a: false },
        }),
      expected: [],
    },
    {
      label: 'admin flagged true, overlay absent → shown (falls back to flag)',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
          overlay: {},
        }),
      expected: ['a'],
    },
    {
      label: 'admin unflagged but overlay true (past-admin, still checked) → shown',
      sources: () =>
        makeSources({
          adminReferenced: list([project('p')]),
          overlay: { p: true },
        }),
      expected: ['p'],
    },
    {
      label: 'admin flag false, no overlay → hidden (admin opted it out)',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: false })]),
          overlay: {},
        }),
      expected: [],
    },
    {
      label: 'admin flag false, overlay true (user re-enabled) → shown',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: false })]),
          overlay: { a: true },
        }),
      expected: ['a'],
    },
    {
      label: 'user entry isResourceShownForUser true → shown',
      sources: () =>
        makeSources({ userReferenced: list([dbl('u', { isResourceShownForUser: true })]) }),
      expected: ['u'],
    },
    {
      label: 'user entry isResourceShownForUser false → hidden',
      sources: () =>
        makeSources({ userReferenced: list([dbl('u', { isResourceShownForUser: false })]) }),
      expected: [],
    },
    {
      label: 'not in any list → hidden',
      sources: () => makeSources(),
      expected: [],
    },
  ])('$label', ({ sources, expected }) => {
    expect(ids(getScriptureTextGridContents(sources()))).toEqual(expected);
  });

  it('dedupes an id present in both admin and user lists, keeping the admin entry', () => {
    const contents = getScriptureTextGridContents(
      makeSources({
        adminReferenced: list([project('x', { isResourceShownByDefault: true })]),
        userReferenced: list([project('x', { isResourceShownForUser: true })]),
        overlay: { x: true },
      }),
    );
    expect(ids(contents)).toEqual(['x']);
    expect(contents[0].name).toBe('Project x'); // admin metadata, not user copy
  });

  it('orders admin (referenced) entries before user entries', () => {
    const contents = getScriptureTextGridContents(
      makeSources({
        adminReferenced: list([
          project('m', { isResourceShownByDefault: true }),
          dbl('r', { isResourceShownByDefault: true }),
        ]),
        userReferenced: list([project('u', { isResourceShownForUser: true })]),
        overlay: {},
      }),
    );
    expect(ids(contents)).toEqual(['m', 'r', 'u']);
  });

  it('excludes non-Bible-text references even when flagged', () => {
    const contents = getScriptureTextGridContents(
      makeSources({
        adminReferenced: list([
          { type: 'enhancedResource', name: 'Enhanced', isResourceShownByDefault: true },
          project('a', { isResourceShownByDefault: true }),
        ]),
        overlay: { a: true },
      }),
    );
    expect(ids(contents)).toEqual(['a']);
  });

  it('excludes non-Bible-text references sitting in the user list', () => {
    const contents = getScriptureTextGridContents(
      makeSources({
        userReferenced: list([
          { type: 'enhancedResource', name: 'Enhanced' },
          dbl('u', { isResourceShownForUser: true }),
        ]),
      }),
    );
    expect(ids(contents)).toEqual(['u']);
  });

  it('shows a user-added resource that is only an unflagged (download-only) admin entry', () => {
    // `x` sits in the admin referenced (download) list with no shown-by-default flag, and the user
    // added it to their own list. It is not admin-owned, so the user's choice drives display.
    const contents = getScriptureTextGridContents(
      makeSources({
        adminReferenced: list([project('x')]),
        userReferenced: list([project('x', { isResourceShownForUser: true })]),
        overlay: {},
      }),
    );
    expect(ids(contents)).toEqual(['x']);
  });

  it('does not mutate its inputs', () => {
    const sources = deepFreeze(
      makeSources({
        adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
        userReferenced: list([dbl('u', { isResourceShownForUser: true })]),
        overlay: { a: true },
      }),
    );
    expect(() => getScriptureTextGridContents(sources)).not.toThrow();
  });
});

describe('getViewOptionsTexts', () => {
  it.each([
    {
      label: 'admin flagged true, overlay true → top, checked, locked',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
          overlay: { a: true },
        }),
      section: 'top' as const,
      checked: true,
      isAdminLocked: true,
      isUserRemovable: false,
    },
    {
      label: 'admin flagged true, overlay false → top, unchecked, locked',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
          overlay: { a: false },
        }),
      section: 'top' as const,
      checked: false,
      isAdminLocked: true,
      isUserRemovable: false,
    },
    {
      label: 'admin flagged true, overlay absent → top, checked (fallback), locked',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
          overlay: {},
        }),
      section: 'top' as const,
      checked: true,
      isAdminLocked: true,
      isUserRemovable: false,
    },
    {
      label: 'admin unflagged but overlay present → bottom (past-admin), not locked, not removable',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a')]),
          overlay: { a: true },
        }),
      section: 'bottom' as const,
      checked: true,
      isAdminLocked: false,
      isUserRemovable: false,
    },
    {
      label: 'admin flag false, no overlay → bottom, unchecked, not locked, not removable',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: false })]),
          overlay: {},
        }),
      section: 'bottom' as const,
      checked: false,
      isAdminLocked: false,
      isUserRemovable: false,
    },
    {
      label: 'admin flag false, overlay true → bottom, checked, not locked, not removable',
      sources: () =>
        makeSources({
          adminReferenced: list([project('a', { isResourceShownByDefault: false })]),
          overlay: { a: true },
        }),
      section: 'bottom' as const,
      checked: true,
      isAdminLocked: false,
      isUserRemovable: false,
    },
    {
      label: 'user entry isResourceShownForUser true → bottom, checked, removable',
      sources: () =>
        makeSources({ userReferenced: list([dbl('u', { isResourceShownForUser: true })]) }),
      section: 'bottom' as const,
      checked: true,
      isAdminLocked: false,
      isUserRemovable: true,
    },
    {
      label: 'user entry isResourceShownForUser false → bottom, unchecked, removable',
      sources: () =>
        makeSources({ userReferenced: list([dbl('u', { isResourceShownForUser: false })]) }),
      section: 'bottom' as const,
      checked: false,
      isAdminLocked: false,
      isUserRemovable: true,
    },
  ])('$label', ({ sources, section, checked, isAdminLocked, isUserRemovable }) => {
    const { top, bottom } = getViewOptionsTexts(sources());
    const entries = section === 'top' ? top : bottom;
    const other = section === 'top' ? bottom : top;
    expect(other).toHaveLength(0);
    expect(entries).toHaveLength(1);
    expect(entries[0].checked).toBe(checked);
    expect(entries[0].isAdminLocked).toBe(isAdminLocked);
    expect(entries[0].isUserRemovable).toBe(isUserRemovable);
  });

  it('omits a resource that is in no list from both sections', () => {
    const { top, bottom } = getViewOptionsTexts(makeSources());
    expect(top).toHaveLength(0);
    expect(bottom).toHaveLength(0);
  });

  it('ignores an orphan overlay id that is no longer in any list (nothing to render)', () => {
    const { top, bottom } = getViewOptionsTexts(makeSources({ overlay: { gone: true } }));
    expect(top).toHaveLength(0);
    expect(bottom).toHaveLength(0);
  });

  it('preserves order: top in referenced-list order, bottom in user-list order', () => {
    const { top, bottom } = getViewOptionsTexts(
      makeSources({
        adminReferenced: list([
          project('m', { isResourceShownByDefault: true }),
          dbl('r', { isResourceShownByDefault: true }),
        ]),
        userReferenced: list([
          project('u1', { isResourceShownForUser: true }),
          dbl('u2', { isResourceShownForUser: false }),
        ]),
        overlay: {},
      }),
    );
    expect(top.map((entry) => entry.reference.id)).toEqual(['m', 'r']);
    expect(bottom.map((entry) => entry.reference.id)).toEqual(['u1', 'u2']);
  });

  it('does not duplicate an admin-flagged id into the bottom section', () => {
    const { top, bottom } = getViewOptionsTexts(
      makeSources({
        adminReferenced: list([project('x', { isResourceShownByDefault: true })]),
        userReferenced: list([project('x', { isResourceShownForUser: true })]),
        overlay: { x: true },
      }),
    );
    expect(top.map((entry) => entry.reference.id)).toEqual(['x']);
    expect(bottom).toHaveLength(0);
  });

  it('lists a user-added resource that is only an unflagged (download-only) admin entry in the bottom', () => {
    const { top, bottom } = getViewOptionsTexts(
      makeSources({
        adminReferenced: list([project('x')]),
        userReferenced: list([project('x', { isResourceShownForUser: true })]),
        overlay: {},
      }),
    );
    expect(top).toHaveLength(0);
    expect(bottom.map((entry) => entry.reference.id)).toEqual(['x']);
    expect(bottom[0].checked).toBe(true);
    expect(bottom[0].isAdminLocked).toBe(false);
  });

  it('stamps longName from the resolver onto rows', () => {
    const { top } = getViewOptionsTexts(
      makeSources({
        adminReferenced: list([dbl('niv', { isResourceShownByDefault: true })]),
        overlay: { niv: true },
      }),
      (reference) => (reference.id === 'niv' ? 'New International Version' : undefined),
    );
    expect(top).toHaveLength(1);
    expect(top[0].longName).toBe('New International Version');
  });

  it('omits longName entirely when the resolver returns undefined', () => {
    const { top } = getViewOptionsTexts(
      makeSources({
        adminReferenced: list([dbl('niv', { isResourceShownByDefault: true })]),
        overlay: { niv: true },
      }),
      () => undefined,
    );
    expect(top[0]).not.toHaveProperty('longName');
  });

  it('leaves rows without a longName when no resolver is passed (backward compatible)', () => {
    const { top } = getViewOptionsTexts(
      makeSources({
        adminReferenced: list([dbl('niv', { isResourceShownByDefault: true })]),
        overlay: { niv: true },
      }),
    );
    expect(top[0]).not.toHaveProperty('longName');
  });
});

describe('setUserDisplay', () => {
  it('flips the overlay for an admin entry, leaving the admin flag and user list untouched', () => {
    const sources = makeSources({
      adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
      overlay: { a: true },
    });
    const { overlay, userReferenced } = setUserDisplay('a', false, sources);
    expect(overlay.a).toBe(false);
    expect(overlay).not.toBe(sources.overlay); // returns a fresh overlay, not the input
    expect(userReferenced.items).toEqual([]);
    // input admin flag unchanged
    expect(flagOf(sources.adminReferenced.items[0], 'isResourceShownByDefault')).toBe(true);
    expect(sources.overlay.a).toBe(true);
  });

  it('routes a user-added, unflagged (download-only) admin id to the user entry, not the overlay', () => {
    const sources = makeSources({
      adminReferenced: list([project('x')]),
      userReferenced: list([project('x', { isResourceShownForUser: true })]),
      overlay: {},
    });
    const { overlay, userReferenced } = setUserDisplay('x', false, sources);
    expect(overlay).toEqual({}); // not admin-owned, so the overlay is untouched
    expect(flagOf(userReferenced.items[0], 'isResourceShownForUser')).toBe(false);
  });

  it('routes an explicitly-disabled (flag false) admin entry to the overlay', () => {
    const sources = makeSources({
      adminReferenced: list([project('a', { isResourceShownByDefault: false })]),
      overlay: {},
    });
    const { overlay, userReferenced } = setUserDisplay('a', true, sources);
    expect(overlay).toEqual({ a: true }); // admin-owned (flag is set), so it writes the overlay
    expect(userReferenced.items).toEqual([]);
  });

  it('is a no-op for an orphan overlay id that is in no list', () => {
    const sources = makeSources({ overlay: { gone: true } });
    const { overlay, userReferenced } = setUserDisplay('gone', false, sources);
    expect(overlay).toEqual({ gone: true });
    expect(userReferenced.items).toEqual([]);
  });

  it('flips isResourceShownForUser for a user entry, leaving the overlay untouched', () => {
    const sources = makeSources({
      userReferenced: list([dbl('u', { isResourceShownForUser: false })]),
      overlay: { z: true },
    });
    const { overlay, userReferenced } = setUserDisplay('u', true, sources);
    expect(flagOf(userReferenced.items[0], 'isResourceShownForUser')).toBe(true);
    expect(overlay).toEqual({ z: true });
    expect(flagOf(sources.userReferenced.items[0], 'isResourceShownForUser')).toBe(false);
  });

  it('is a no-op for an unknown id', () => {
    const sources = makeSources({
      adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
      userReferenced: list([dbl('u', { isResourceShownForUser: true })]),
      overlay: { a: true },
    });
    const { overlay, userReferenced } = setUserDisplay('missing', true, sources);
    expect(overlay).toEqual({ a: true });
    expect(userReferenced.items).toEqual(sources.userReferenced.items);
  });

  it('does not mutate its inputs', () => {
    const sources = deepFreeze(
      makeSources({
        adminReferenced: list([project('a', { isResourceShownByDefault: true })]),
        userReferenced: list([dbl('u', { isResourceShownForUser: false })]),
        overlay: { a: true },
      }),
    );
    expect(() => setUserDisplay('a', false, sources)).not.toThrow();
    expect(() => setUserDisplay('u', true, sources)).not.toThrow();
  });
});

describe('removeFromUserResources', () => {
  it('removes a matching user entry', () => {
    const userReferenced = list([
      dbl('u1', { isResourceShownForUser: true }),
      project('u2', { isResourceShownForUser: true }),
    ]);
    const result = removeFromUserResources('u1', userReferenced);
    expect(ids(result.items)).toEqual(['u2']);
    expect(result.dataVersion).toBe(CURRENT_DATA_VERSION);
  });

  it('is a no-op when the id is not in the user list (defense-in-depth on admin entries)', () => {
    const userReferenced = list([dbl('u1', { isResourceShownForUser: true })]);
    const result = removeFromUserResources('adminOnlyId', userReferenced);
    expect(ids(result.items)).toEqual(['u1']);
  });

  it('does not mutate its input', () => {
    const userReferenced = deepFreeze(list([dbl('u1', { isResourceShownForUser: true })]));
    expect(() => removeFromUserResources('u1', userReferenced)).not.toThrow();
  });
});

describe('addToUserResources', () => {
  it('appends a new reference with isResourceShownForUser true', () => {
    const userReferenced = list([dbl('u1', { isResourceShownForUser: true })]);
    const result = addToUserResources(project('new'), userReferenced);
    expect(ids(result.items)).toEqual(['u1', 'new']);
    expect(flagOf(result.items[1], 'isResourceShownForUser')).toBe(true);
    expect(result.dataVersion).toBe(CURRENT_DATA_VERSION);
  });

  it('is idempotent when the id is already present', () => {
    const userReferenced = list([dbl('u1', { isResourceShownForUser: true })]);
    const result = addToUserResources(dbl('u1'), userReferenced);
    expect(ids(result.items)).toEqual(['u1']);
  });

  it('does not mutate its input', () => {
    const userReferenced = deepFreeze(list([dbl('u1', { isResourceShownForUser: true })]));
    expect(() => addToUserResources(project('new'), userReferenced)).not.toThrow();
  });
});
