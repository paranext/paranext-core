import { describe, expect, it } from 'vitest';
import { coreProjectSettingsValidators } from './core-project-settings-info.data';

// The boolean validators are not exported individually — they're only reachable via the
// `coreProjectSettingsValidators` map. Each call signature matches `ProjectSettingValidator`,
// which takes `(newValue, currentValue, allChanges)`; the boolean validators only inspect
// `newValue`, so the other two arguments are passed as the simplest plausible values.

describe('coreProjectSettingsValidators platform.isEditable', () => {
  const validator = coreProjectSettingsValidators['platform.isEditable'];
  if (!validator) throw new Error('platform.isEditable validator not registered');

  it('is registered for platform.isEditable', () => {
    expect(validator).toBeDefined();
  });

  it('accepts true', async () => {
    expect(await validator(true, false, {})).toBe(true);
  });

  it('accepts false', async () => {
    expect(await validator(false, true, {})).toBe(true);
  });

  it('rejects non-boolean values', async () => {
    // The validator's static type is `(newValue: boolean, ...) => Promise<boolean>`, but at
    // runtime the validator is the only line of defense against garbage values being written
    // through the project-settings service. The @ts-expect-error directives below ensure the
    // runtime guard fires regardless of what the type system thinks.
    /* eslint-disable no-null/no-null -- intentionally testing null rejection at runtime */
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator('true', false, {})).toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator(1, false, {})).toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator(undefined, false, {})).toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator(null, false, {})).toBe(false);
    /* eslint-enable no-null/no-null */
  });
});

describe('coreProjectSettingsValidators platform.isPublished', () => {
  const validator = coreProjectSettingsValidators['platform.isPublished'];
  if (!validator) throw new Error('platform.isPublished validator not registered');

  it('is registered for platform.isPublished', () => {
    expect(validator).toBeDefined();
  });

  it('accepts true', async () => {
    expect(await validator(true, false, {})).toBe(true);
  });

  it('accepts false', async () => {
    expect(await validator(false, true, {})).toBe(true);
  });

  it('rejects non-boolean values', async () => {
    /* eslint-disable no-null/no-null -- intentionally testing null rejection at runtime */
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator('true', false, {})).toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator(1, false, {})).toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator(undefined, false, {})).toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    expect(await validator(null, false, {})).toBe(false);
    /* eslint-enable no-null/no-null */
  });
});
