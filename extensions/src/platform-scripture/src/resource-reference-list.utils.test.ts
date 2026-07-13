import { describe, expect, it } from 'vitest';
import type { ResourceReferenceList } from 'platform-scripture';
import {
  isValidResourceReference,
  resourceReferenceListValidator,
} from './resource-reference-list.utils';

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
    const nullValue: unknown = JSON.parse('null');
    expect(isValidResourceReference(nullValue)).toBe(false);
  });

  it('rejects an item without a type field', () => {
    expect(isValidResourceReference({ name: 'no type' })).toBe(false);
  });

  it('rejects an item where type is not a string', () => {
    expect(isValidResourceReference({ type: 42 })).toBe(false);
  });

  it('accepts a project reference with valid optional boolean flags', () => {
    expect(
      isValidResourceReference({
        type: 'project',
        name: 'P',
        id: 'aabbcc',
        isInTextCollection: true,
        isInTextCollectionForUser: false,
      }),
    ).toBe(true);
  });

  it('rejects a project reference with a non-boolean isInTextCollection', () => {
    expect(
      isValidResourceReference({
        type: 'project',
        name: 'P',
        id: 'aabbcc',
        isInTextCollection: 'yes',
      }),
    ).toBe(false);
  });

  it('rejects a dblResource reference with a non-boolean isInTextCollectionForUser', () => {
    expect(
      isValidResourceReference({
        type: 'dblResource',
        name: 'D',
        id: '112233445566',
        isInTextCollectionForUser: 3,
      }),
    ).toBe(false);
  });

  it('accepts a dblResource reference with both flags absent', () => {
    expect(
      isValidResourceReference({
        type: 'dblResource',
        name: 'D',
        id: '112233445566',
      }),
    ).toBe(true);
  });

  it('rejects a dblResource reference with a non-boolean isInTextCollection', () => {
    expect(
      isValidResourceReference({
        type: 'dblResource',
        name: 'D',
        id: '112233445566',
        isInTextCollection: 'no',
      }),
    ).toBe(false);
  });
});

describe('resourceReferenceListValidator', () => {
  it('accepts a valid empty list', async () => {
    expect(await resourceReferenceListValidator(validList(), validList(), {})).toBe(true);
  });

  it('accepts a list with valid mixed items', async () => {
    const newValue = validList({
      items: [
        { type: 'project', name: 'P', id: '1' },
        { type: 'enhancedResource', name: 'E' },
      ],
    });
    expect(await resourceReferenceListValidator(newValue, validList(), {})).toBe(true);
  });

  it('throws when currentValue is null', async () => {
    const nullCurrent: ResourceReferenceList = JSON.parse('null');
    await expect(resourceReferenceListValidator(validList(), nullCurrent, {})).rejects.toThrow(
      /current value is missing/i,
    );
  });

  it('throws when items is not an array', async () => {
    const badValue: ResourceReferenceList = JSON.parse(
      '{"dataVersion":"1.0.0","items":"not-array"}',
    );
    await expect(resourceReferenceListValidator(badValue, validList(), {})).rejects.toThrow(
      /`items` must be an array/,
    );
  });

  it('throws when an item has the wrong shape for its known type', async () => {
    const newValue: ResourceReferenceList = JSON.parse(
      '{"dataVersion":"1.0.0","items":[{"type":"project","name":"No ID"}]}',
    );
    await expect(resourceReferenceListValidator(newValue, validList(), {})).rejects.toThrow(
      /index 0 has an invalid shape/,
    );
  });

  it.each([
    ['not-semver'],
    ['1.'], // trailing empty segment — caught by the empty-segment check
    ['..'], // all empty segments
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    [undefined as unknown as string], // non-string dataVersion — would crash parseVersion without a type guard
  ])('throws on malformed new dataVersion "%s"', async (dataVersion) => {
    const newValue = validList({ dataVersion });
    await expect(resourceReferenceListValidator(newValue, validList(), {})).rejects.toThrow(
      /new `dataVersion` .* is malformed/i,
    );
  });

  // `undefined as unknown as string` simulates a non-string runtime value to test the type guard
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  it.each([['garbage'], ['1.'], ['..'], [undefined as unknown as string]])(
    'throws when current dataVersion "%s" cannot be parsed',
    async (dataVersion) => {
      const newValue = validList({ dataVersion: '2.0.0' });
      const current = validList({ dataVersion });
      await expect(resourceReferenceListValidator(newValue, current, {})).rejects.toThrow(
        /current `dataVersion` .* is malformed/i,
      );
    },
  );

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

  it('throws on a minor version downgrade', async () => {
    const current = validList({ dataVersion: '1.2.0' });
    const newValue = validList({ dataVersion: '1.1.0' });
    await expect(resourceReferenceListValidator(newValue, current, {})).rejects.toThrow(
      /refusing to downgrade/i,
    );
  });

  it('throws on a major version downgrade', async () => {
    const current = validList({ dataVersion: '2.0.0' });
    const newValue = validList({ dataVersion: '1.9.9' });
    await expect(resourceReferenceListValidator(newValue, current, {})).rejects.toThrow(
      /refusing to downgrade/i,
    );
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
