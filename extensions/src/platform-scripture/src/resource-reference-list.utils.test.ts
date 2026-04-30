import { describe, expect, it } from 'vitest';
import {
  isValidResourceReference,
  resourceReferenceListValidator,
} from './resource-reference-list.utils';
import type { ResourceReferenceList } from 'platform-scripture';

const validList = (overrides?: Partial<ResourceReferenceList>): ResourceReferenceList => ({
  dataVersion: '1.0.0',
  items: [],
  ...overrides,
});

describe('isValidResourceReference', () => {
  it('accepts a valid project reference', () => {
    expect(isValidResourceReference({ type: 'project', name: 'My Project', id: 'abc123' })).toBe(
      true,
    );
  });

  it('accepts a valid dblResource reference', () => {
    expect(isValidResourceReference({ type: 'dblResource', name: 'DBL', id: 'def456' })).toBe(true);
  });

  it('rejects a project reference missing id', () => {
    expect(isValidResourceReference({ type: 'project', name: 'No ID' })).toBe(false);
  });

  it('rejects a project reference missing name', () => {
    expect(isValidResourceReference({ type: 'project', id: 'abc' })).toBe(false);
  });

  it('accepts a valid enhancedResource reference', () => {
    expect(isValidResourceReference({ type: 'enhancedResource', name: 'Enh' })).toBe(true);
  });

  it('rejects an enhancedResource reference missing name', () => {
    expect(isValidResourceReference({ type: 'enhancedResource' })).toBe(false);
  });

  it('accepts a valid xmlResource reference', () => {
    expect(isValidResourceReference({ type: 'xmlResource', name: 'Xml' })).toBe(true);
  });

  it('accepts a valid sourceLanguageResource reference', () => {
    expect(isValidResourceReference({ type: 'sourceLanguageResource', name: 'Greek' })).toBe(true);
  });

  it('accepts an unknown type discriminant with any shape', () => {
    expect(isValidResourceReference({ type: 'futureType', anyProp: 42 })).toBe(true);
  });

  it('rejects a non-object value', () => {
    expect(isValidResourceReference('not an object')).toBe(false);
  });

  it('rejects null', () => {
    expect(isValidResourceReference(null)).toBe(false);
  });

  it('rejects an item without a type field', () => {
    expect(isValidResourceReference({ name: 'no type' })).toBe(false);
  });

  it('rejects an item where type is not a string', () => {
    expect(isValidResourceReference({ type: 42 })).toBe(false);
  });
});

describe('resourceReferenceListValidator', () => {
  const noCurrentValue = validList({ dataVersion: 'not-parseable' });

  it('accepts a valid empty list', async () => {
    expect(await resourceReferenceListValidator(validList(), noCurrentValue, {})).toBe(true);
  });

  it('accepts a list with valid mixed items', async () => {
    const newValue = validList({
      items: [
        { type: 'project', name: 'P', id: '1' },
        { type: 'enhancedResource', name: 'E' },
      ],
    });
    expect(await resourceReferenceListValidator(newValue, noCurrentValue, {})).toBe(true);
  });

  it('rejects when items is not an array', async () => {
    // Runtime data could have wrong shape
    const badValue = {
      dataVersion: '1.0.0',
      items: 'not-array',
    } as unknown as ResourceReferenceList;
    expect(await resourceReferenceListValidator(badValue, noCurrentValue, {})).toBe(false);
  });

  it('rejects when an item has the wrong shape for its known type', async () => {
    const newValue = {
      dataVersion: '1.0.0',
      items: [{ type: 'project', name: 'No ID' }], // missing required `id`
    } as unknown as ResourceReferenceList;
    expect(await resourceReferenceListValidator(newValue, noCurrentValue, {})).toBe(false);
  });

  it('rejects a malformed dataVersion string', async () => {
    const newValue = validList({ dataVersion: 'not-semver' });
    expect(await resourceReferenceListValidator(newValue, noCurrentValue, {})).toBe(false);
  });

  it('accepts when current dataVersion is not parseable (no stored version to compare)', async () => {
    const newValue = validList({ dataVersion: '2.0.0' });
    const current = validList({ dataVersion: 'garbage' });
    expect(await resourceReferenceListValidator(newValue, current, {})).toBe(true);
  });

  it('accepts a same-version write', async () => {
    const current = validList({ dataVersion: '1.2.3' });
    const newValue = validList({ dataVersion: '1.2.3' });
    expect(await resourceReferenceListValidator(newValue, current, {})).toBe(true);
  });

  it('accepts a minor version upgrade', async () => {
    const current = validList({ dataVersion: '1.1.0' });
    const newValue = validList({ dataVersion: '1.2.0' });
    expect(await resourceReferenceListValidator(newValue, current, {})).toBe(true);
  });

  it('rejects a minor version downgrade', async () => {
    const current = validList({ dataVersion: '1.2.0' });
    const newValue = validList({ dataVersion: '1.1.0' });
    expect(await resourceReferenceListValidator(newValue, current, {})).toBe(false);
  });

  it('rejects a major version downgrade', async () => {
    const current = validList({ dataVersion: '2.0.0' });
    const newValue = validList({ dataVersion: '1.9.9' });
    expect(await resourceReferenceListValidator(newValue, current, {})).toBe(false);
  });

  it('accepts a patch version downgrade', async () => {
    const current = validList({ dataVersion: '1.2.5' });
    const newValue = validList({ dataVersion: '1.2.3' });
    expect(await resourceReferenceListValidator(newValue, current, {})).toBe(true);
  });

  it('accepts a major version upgrade', async () => {
    const current = validList({ dataVersion: '1.0.0' });
    const newValue = validList({ dataVersion: '2.0.0' });
    expect(await resourceReferenceListValidator(newValue, current, {})).toBe(true);
  });
});
