// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

// Bare `vi.fn()` rather than `vi.mocked(...)` of the real export: only `getMetadataForProject` is
// called here, and typing the stub against the real signature would force a type assertion — the
// thing `no-type-assertion` exists to prevent. Same pattern as
// `use-resource-reference-source.hook.test.ts`.
const { getMetadataForProjectMock } = vi.hoisted(() => ({ getMetadataForProjectMock: vi.fn() }));

vi.mock('@papi/frontend', () => ({
  default: { projectLookup: { getMetadataForProject: getMetadataForProjectMock } },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const { useResolvedContainerProjectId } = await import('./use-resolved-container-project-id.hook');

const PROJECT_ID = 'PROJECT_A';
const OTHER_PROJECT_ID = 'PROJECT_B';

/** Metadata shape is irrelevant here — only whether the lookup settles or rejects matters. */
const SOME_METADATA = { id: PROJECT_ID };

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useResolvedContainerProjectId', () => {
  it('reports no project when none was given, without looking anything up', () => {
    const { result } = renderHook(() => useResolvedContainerProjectId(undefined));

    expect(result.current).toBeUndefined();
    expect(getMetadataForProjectMock).not.toHaveBeenCalled();
  });

  it('keeps reporting the project id while the lookup is still in flight', () => {
    // Never settles — stands in for the startup window before a PDP factory has registered.
    getMetadataForProjectMock.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useResolvedContainerProjectId(PROJECT_ID));

    // The point of the optimistic answer: a real project must never flash the no-project prompt
    // just because its factory has not registered yet.
    expect(result.current).toBe(PROJECT_ID);
  });

  it('keeps the project id once the lookup finds the project', async () => {
    getMetadataForProjectMock.mockResolvedValue(SOME_METADATA);

    const { result } = renderHook(() => useResolvedContainerProjectId(PROJECT_ID));

    await waitFor(() => expect(getMetadataForProjectMock).toHaveBeenCalledWith(PROJECT_ID));
    expect(result.current).toBe(PROJECT_ID);
  });

  it('reports no project once the lookup confidently cannot find it', async () => {
    getMetadataForProjectMock.mockRejectedValue(
      new Error(`No project found with ID ${PROJECT_ID}`),
    );

    const { result } = renderHook(() => useResolvedContainerProjectId(PROJECT_ID));

    // This is the wedge being removed: a project id left over from a deleted project used to keep
    // every project-scoped hook downstream waiting forever.
    await waitFor(() => expect(result.current).toBeUndefined());
  });

  it('does not carry a missing verdict over to a different project id', async () => {
    getMetadataForProjectMock.mockRejectedValue(new Error('No project found'));

    const { result, rerender } = renderHook(
      ({ id }: { id: string | undefined }) => useResolvedContainerProjectId(id),
      { initialProps: { id: PROJECT_ID } },
    );
    await waitFor(() => expect(result.current).toBeUndefined());

    // The verdict is recorded against the id it was reached for, so the new id is reported
    // immediately rather than inheriting the old one's answer for a render.
    getMetadataForProjectMock.mockResolvedValue({ id: OTHER_PROJECT_ID });
    rerender({ id: OTHER_PROJECT_ID });

    expect(result.current).toBe(OTHER_PROJECT_ID);
    // Let the new id's own lookup settle before the test ends, so its state update lands inside
    // `act` rather than after teardown.
    await waitFor(() => expect(getMetadataForProjectMock).toHaveBeenCalledTimes(2));
    expect(result.current).toBe(OTHER_PROJECT_ID);
  });

  it('returns to the project once a previously missing id can be found again', async () => {
    getMetadataForProjectMock.mockRejectedValue(new Error('No project found'));

    const { result, rerender } = renderHook(
      ({ id }: { id: string | undefined }) => useResolvedContainerProjectId(id),
      { initialProps: { id: PROJECT_ID } },
    );
    await waitFor(() => expect(result.current).toBeUndefined());

    // A project can come back — restored from a backup, or cloned by Send/Receive — and the panel
    // has to leave the no-project path when it does.
    getMetadataForProjectMock.mockResolvedValue(SOME_METADATA);
    rerender({ id: undefined });
    rerender({ id: PROJECT_ID });

    await waitFor(() => expect(result.current).toBe(PROJECT_ID));
  });

  it('ignores a lookup that settles after the project id has already changed', async () => {
    let rejectFirst: (reason: Error) => void = () => {};
    getMetadataForProjectMock.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          rejectFirst = reject;
        }),
    );
    getMetadataForProjectMock.mockResolvedValue({ id: OTHER_PROJECT_ID });

    const { result, rerender } = renderHook(
      ({ id }: { id: string | undefined }) => useResolvedContainerProjectId(id),
      { initialProps: { id: PROJECT_ID } },
    );
    rerender({ id: OTHER_PROJECT_ID });

    // The first lookup's answer arrives late and is about a project this panel no longer shows;
    // letting it land would blank a panel whose current project is fine.
    rejectFirst(new Error('No project found'));
    await waitFor(() => expect(getMetadataForProjectMock).toHaveBeenCalledTimes(2));
    expect(result.current).toBe(OTHER_PROJECT_ID);
  });
});
