import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const rawRef = { book: 'PSA', chapterNum: 147, verseNum: 1 };
const convertedRef = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };

vi.mock('@renderer/services/scroll-group.service-host', () => ({
  getScrRefSync: () => rawRef,
  getScrRefSourceProjectIdSync: () => 'sourceProj',
  setScrRefSync: vi.fn(() => true),
  onDidUpdateScrRef: vi.fn(() => () => {}),
}));

const sendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => sendCommand(...args),
}));

// useEvent just needs to be a no-op subscriber for this test
vi.mock('platform-bible-react', () => ({ useEvent: () => {} }));

describe('useScrollGroupScrRef versification conversion', () => {
  it('converts the followed ref into the consumer project versification', async () => {
    sendCommand.mockResolvedValue(convertedRef);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));

    await waitFor(() => expect(result.current[0]).toEqual(convertedRef));
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.mapVerseRefBetweenProjects',
      rawRef,
      'sourceProj',
      'targetProj',
    );
  });

  it('passes the raw ref through when no consumer projectId is given', async () => {
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    sendCommand.mockClear();

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true));

    expect(result.current[0]).toEqual(rawRef);
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('passes the raw ref through when source project equals target project', async () => {
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    sendCommand.mockClear();

    // 'sourceProj' is what getScrRefSourceProjectIdSync returns; passing it as projectId means
    // sourceProjectIdLocal === projectId, so conversion is skipped.
    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'sourceProj'));

    expect(result.current[0]).toEqual(rawRef);
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('passes the raw ref through when the conversion command rejects', async () => {
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    sendCommand.mockRejectedValue(new Error('boom'));

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));

    // After the rejected promise settles the hook falls back to rawRef, never throws.
    await waitFor(() => expect(result.current[0]).toEqual(rawRef));
  });
});
