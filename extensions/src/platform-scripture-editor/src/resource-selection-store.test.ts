import papi from '@papi/backend';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RESOURCE_SELECTION_SETTING_KEY } from './resource-selection-state.utils';
import {
  getStoredResourceSelection,
  updateStoredResourceSelection,
} from './resource-selection-store';

/** The setting's value, as the settings service holds it */
let stored: unknown;

vi.mock('@papi/backend', () => ({
  default: {
    settings: {
      // Each call yields once before it reads or writes, the way a round trip to the settings
      // service does, so writes that are not serialized interleave.
      get: vi.fn(async () => {
        await Promise.resolve();
        return stored;
      }),
      set: vi.fn(async (_key: string, value: unknown) => {
        await Promise.resolve();
        stored = value;
      }),
    },
  },
}));

beforeEach(() => {
  stored = {};
  vi.mocked(papi.settings.get).mockClear();
  vi.mocked(papi.settings.set).mockClear();
});

describe('updateStoredResourceSelection', () => {
  it('reads and writes the resource selection setting', async () => {
    await updateStoredResourceSelection('ScriptureResource', 'project-a', {
      selectedResourceId: 'a',
    });

    expect(papi.settings.get).toHaveBeenCalledWith(RESOURCE_SELECTION_SETTING_KEY);
    expect(papi.settings.set).toHaveBeenCalledWith(RESOURCE_SELECTION_SETTING_KEY, {
      ScriptureResource: { 'project-a': { selectedResourceId: 'a' } },
      CommentaryResource: {},
    });
  });

  it('keeps both of two writes made at the same time', async () => {
    await Promise.all([
      updateStoredResourceSelection('ScriptureResource', 'project-a', { selectedResourceId: 'a' }),
      updateStoredResourceSelection('ScriptureResource', 'project-b', { selectedResourceId: 'b' }),
      updateStoredResourceSelection('CommentaryResource', 'project-a', {
        selectedResourceId: 'c',
      }),
    ]);

    expect(await getStoredResourceSelection('ScriptureResource', 'project-a')).toMatchObject({
      selectedResourceId: 'a',
    });
    expect(await getStoredResourceSelection('ScriptureResource', 'project-b')).toMatchObject({
      selectedResourceId: 'b',
    });
    expect(await getStoredResourceSelection('CommentaryResource', 'project-a')).toMatchObject({
      selectedResourceId: 'c',
    });
  });

  it('applies two writes to the same project in the order they were made', async () => {
    const first = updateStoredResourceSelection('ScriptureResource', 'project-a', {
      selectedResourceId: 'first',
      userPickedResourceId: 'first',
    });
    const second = updateStoredResourceSelection('ScriptureResource', 'project-a', {
      selectedResourceId: 'second',
    });
    await Promise.all([first, second]);

    expect(await getStoredResourceSelection('ScriptureResource', 'project-a')).toEqual({
      selectedResourceId: 'second',
      userPickedResourceId: 'first',
    });
  });

  it('does not write a change that changes nothing', async () => {
    stored = { ScriptureResource: { 'project-a': { selectedResourceId: 'a' } } };

    await updateStoredResourceSelection('ScriptureResource', 'project-a', {
      selectedResourceId: 'a',
    });

    expect(papi.settings.set).not.toHaveBeenCalled();
  });

  it('still runs a write queued behind one that failed', async () => {
    vi.mocked(papi.settings.set).mockRejectedValueOnce(new Error('disk full'));

    const failed = updateStoredResourceSelection('ScriptureResource', 'project-a', {
      selectedResourceId: 'lost',
    });
    const next = updateStoredResourceSelection('ScriptureResource', 'project-b', {
      selectedResourceId: 'b',
    });

    await expect(failed).rejects.toThrow('disk full');
    await next;
    expect(await getStoredResourceSelection('ScriptureResource', 'project-b')).toMatchObject({
      selectedResourceId: 'b',
    });
  });
});

describe('getStoredResourceSelection', () => {
  it('reads after the writes already asked for', async () => {
    const write = updateStoredResourceSelection('CommentaryResource', 'project-a', {
      selectedResourceId: 'c',
    });

    expect(await getStoredResourceSelection('CommentaryResource', 'project-a')).toMatchObject({
      selectedResourceId: 'c',
    });
    await write;
  });
});
