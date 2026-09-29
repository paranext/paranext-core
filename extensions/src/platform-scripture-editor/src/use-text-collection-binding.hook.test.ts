// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import papi, { logger } from '@papi/frontend';
import {
  IS_PUBLISHED_RETRY_DELAY_MS,
  useTextCollectionBinding,
  type TextCollectionBinding,
} from './use-text-collection-binding.hook';

vi.mock('@papi/frontend', () => ({
  default: { projectDataProviders: { get: vi.fn() } },
  logger: { warn: vi.fn() },
}));

const mockGet = vi.mocked(papi.projectDataProviders.get);

type Reading = { resolve: (isPublished: unknown) => void; reject: (error: Error) => void };

/**
 * Makes each project's `platform.isPublished` read wait until the test settles it, so a test can
 * observe what the hook returns before and after the answer arrives.
 */
function deferIsPublishedReads() {
  const readings = new Map<string, Reading>();
  mockGet.mockImplementation(async (_projectInterface, projectId) => {
    // The hook reads only this one method; a full provider is not needed to exercise it.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return {
      getSetting: () =>
        new Promise((resolve, reject) => {
          readings.set(projectId, { resolve, reject });
        }),
    } as unknown as Awaited<ReturnType<typeof papi.projectDataProviders.get>>;
  });
  return readings;
}

/** Renders the hook, recording every binding it returned. */
function renderBinding(initialProjectId: string | undefined) {
  const bindings: TextCollectionBinding[] = [];
  const rendered = renderHook(
    ({ projectId }: { projectId: string | undefined }) => {
      const binding = useTextCollectionBinding(projectId);
      bindings.push(binding);
      return binding;
    },
    { initialProps: { projectId: initialProjectId } },
  );
  return { ...rendered, bindings };
}

/** Lets pending promises and the state updates they cause settle. */
async function flush() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe('useTextCollectionBinding', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('binds a project once it is known not to be a published resource', async () => {
    const readings = deferIsPublishedReads();
    const { result, bindings } = renderBinding('proj-a');
    await flush();

    expect(bindings.every((binding) => binding.collectionProjectId === undefined)).toBe(true);

    await act(async () => readings.get('proj-a')?.resolve(false));

    expect(result.current).toEqual({ collectionProjectId: 'proj-a', isPublishedResource: false });
  });

  it('never binds a published resource, and says it is one', async () => {
    const readings = deferIsPublishedReads();
    const { result, bindings } = renderBinding('resource-1');
    await flush();

    await act(async () => readings.get('resource-1')?.resolve(true));

    expect(result.current).toEqual({ collectionProjectId: undefined, isPublishedResource: true });
    expect(bindings.some((binding) => binding.collectionProjectId !== undefined)).toBe(false);
  });

  it('binds nothing while the kind of project cannot be read, and reads it again after a delay', async () => {
    // A resource whose provider registers late fails this read too, and binding it would let the
    // Text Collection write into its folder.
    vi.useFakeTimers();
    const readings = deferIsPublishedReads();
    const { result, bindings } = renderBinding('proj-a');
    await flush();

    await act(async () => readings.get('proj-a')?.reject(new Error('setting read failed')));

    expect(result.current).toEqual({ collectionProjectId: undefined, isPublishedResource: false });
    expect(bindings.some((binding) => binding.collectionProjectId !== undefined)).toBe(false);
    expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
      expect.stringContaining('setting read failed'),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(IS_PUBLISHED_RETRY_DELAY_MS - 1);
    });
    expect(mockGet).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(mockGet).toHaveBeenCalledTimes(2);
    await act(async () => readings.get('proj-a')?.resolve(false));

    expect(result.current).toEqual({ collectionProjectId: 'proj-a', isPublishedResource: false });
  });

  it('stops reading a project again once the Text Collection has moved off it', async () => {
    vi.useFakeTimers();
    const readings = deferIsPublishedReads();
    const { rerender } = renderBinding('proj-a');
    await flush();
    await act(async () => readings.get('proj-a')?.reject(new Error('setting read failed')));

    rerender({ projectId: 'proj-b' });
    await flush();
    await act(async () => readings.get('proj-b')?.resolve(false));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(IS_PUBLISHED_RETRY_DELAY_MS * 2);
    });

    expect(mockGet.mock.calls.map(([, projectId]) => projectId)).toEqual(['proj-a', 'proj-b']);
  });

  it('never binds the incoming project on the answer about the outgoing one', async () => {
    const readings = deferIsPublishedReads();
    const { result, rerender, bindings } = renderBinding('proj-a');
    await flush();
    await act(async () => readings.get('proj-a')?.resolve(false));
    expect(result.current.collectionProjectId).toBe('proj-a');

    const rendersBefore = bindings.length;
    rerender({ projectId: 'resource-1' });
    await flush();

    expect(bindings.slice(rendersBefore).map((binding) => binding.collectionProjectId)).toEqual(
      bindings.slice(rendersBefore).map(() => undefined),
    );

    await act(async () => readings.get('resource-1')?.resolve(true));

    expect(result.current).toEqual({ collectionProjectId: undefined, isPublishedResource: true });
  });

  it('reads nothing while there is no project', async () => {
    deferIsPublishedReads();
    const { result } = renderBinding(undefined);
    await flush();

    expect(mockGet).not.toHaveBeenCalled();
    expect(result.current).toEqual({ collectionProjectId: undefined, isPublishedResource: false });
  });
});
