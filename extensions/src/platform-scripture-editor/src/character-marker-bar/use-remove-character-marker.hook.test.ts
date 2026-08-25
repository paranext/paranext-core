// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { EditorRef } from '@eten-tech-foundation/platform-editor';

const sendCommand = vi.fn(async () => undefined);
const sendNotification = vi.fn(async () => undefined);

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: (...args: unknown[]) => sendCommand(...args) },
    notifications: { send: (...args: unknown[]) => sendNotification(...args) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Imported after the mock so the hook picks up the mocked papi.
// eslint-disable-next-line import/first
import { useRemoveCharacterMarker } from './use-remove-character-marker.hook';

const STRINGS = {
  '%versionHistoryCommit_beforeRemoveCharacterMarker%': 'Before removing character marker',
  '%webView_platformScriptureEditor_error_removeCharacterMarkerFailed%': 'Could not remove',
  '%webView_platformScriptureEditor_error_syncEditBlocked%': 'Editing paused',
};

function makeEditorRef({ throws = false } = {}) {
  const removeCharacterMarker = vi.fn(() => {
    if (throws) throw new Error('readonly');
  });
  // A mock literal cannot satisfy the full EditorRef interface — cast for test isolation.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const ref = {
    current: { removeCharacterMarker },
  } as unknown as MutableRefObject<EditorRef | null>;
  return { ref, removeCharacterMarker };
}

function renderRemove(
  overrides: {
    editorRef?: MutableRefObject<EditorRef | null>;
    projectId?: string;
    isSyncBlocked?: boolean;
  } = {},
) {
  const { ref } = makeEditorRef();
  const { result } = renderHook(() =>
    useRemoveCharacterMarker({
      editorRef: overrides.editorRef ?? ref,
      projectId: 'projectId' in overrides ? overrides.projectId : 'project-1',
      isSyncBlocked: overrides.isSyncBlocked ?? false,
      localizedStrings: STRINGS,
    }),
  );
  return result;
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('useRemoveCharacterMarker', () => {
  it('commits a version-history snapshot BEFORE removing', async () => {
    const { ref, removeCharacterMarker } = makeEditorRef();
    const result = renderRemove({ editorRef: ref });

    await result.current('nd');

    expect(sendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.commitChanges',
      'project-1',
      'Before removing character marker',
      true,
    );
    expect(sendCommand.mock.invocationCallOrder[0]).toBeLessThan(
      removeCharacterMarker.mock.invocationCallOrder[0],
    );
    expect(removeCharacterMarker).toHaveBeenCalledWith('nd');
  });

  it('removes every marker when called with no argument', async () => {
    const { ref, removeCharacterMarker } = makeEditorRef();
    const result = renderRemove({ editorRef: ref });

    await result.current();

    expect(removeCharacterMarker).toHaveBeenCalledWith(undefined);
  });

  it('still removes when the snapshot command is unimplemented', async () => {
    sendCommand.mockRejectedValueOnce(new Error('ERROR_UNIMPLEMENTED: no version history here'));
    const { ref, removeCharacterMarker } = makeEditorRef();
    const result = renderRemove({ editorRef: ref });

    await result.current('nd');

    expect(removeCharacterMarker).toHaveBeenCalledWith('nd');
  });

  it('still removes when the snapshot command fails for any other reason', async () => {
    sendCommand.mockRejectedValueOnce(new Error('network down'));
    const { ref, removeCharacterMarker } = makeEditorRef();
    const result = renderRemove({ editorRef: ref });

    await result.current('nd');

    expect(removeCharacterMarker).toHaveBeenCalledWith('nd');
  });

  it('skips the snapshot when there is no project id, and still removes', async () => {
    const { ref, removeCharacterMarker } = makeEditorRef();
    const result = renderRemove({ editorRef: ref, projectId: undefined });

    await result.current('nd');

    expect(sendCommand).not.toHaveBeenCalled();
    expect(removeCharacterMarker).toHaveBeenCalledWith('nd');
  });

  it('takes no snapshot when the editor is not mounted', async () => {
    // The ref starts out null until the editor mounts, and the removal used to run
    // `editorRef.current?.removeCharacterMarker()` — so this path wrote a "Before removing character
    // marker" restore point for an edit that could never happen. The snapshot is gated on the ref
    // being resolved for exactly this reason.
    // eslint-disable-next-line no-null/no-null
    const result = renderRemove({ editorRef: { current: null } });

    await expect(result.current('nd')).resolves.toBeUndefined();

    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('refuses to remove while a Send/Receive has editing paused', async () => {
    const { ref, removeCharacterMarker } = makeEditorRef();
    const result = renderRemove({ editorRef: ref, isSyncBlocked: true });

    await result.current('nd');

    expect(removeCharacterMarker).not.toHaveBeenCalled();
    expect(sendCommand).not.toHaveBeenCalled();
    expect(sendNotification).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Editing paused', severity: 'warning' }),
    );
  });

  it('reports a throwing editor instead of letting it escape into the menu', async () => {
    const { ref } = makeEditorRef({ throws: true });
    const result = renderRemove({ editorRef: ref });

    await expect(result.current('nd')).resolves.toBeUndefined();
    expect(sendNotification).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Could not remove', severity: 'warning' }),
    );
  });

  it('swallows a failing notification rather than rejecting into a fire-and-forget caller', async () => {
    // The reporting path's own failure. `notify` self-catches so that a menu row's `action()` —
    // which calls this without awaiting — can never produce an unhandled rejection. Both notifying
    // sites are covered: the sync-blocked refusal (no editor call at all) and the removal failure
    // (editor already threw), so neither can start relying on the send resolving.
    // `Once` twice, not `mockRejectedValue`: `vi.clearAllMocks()` in `afterEach` clears calls but
    // NOT a persistent implementation, so a non-Once rejection would leak into later tests.
    sendNotification
      .mockRejectedValueOnce(new Error('notification service down'))
      .mockRejectedValueOnce(new Error('notification service down'));

    const blocked = renderRemove({ isSyncBlocked: true });
    await expect(blocked.current('nd')).resolves.toBeUndefined();

    const { ref } = makeEditorRef({ throws: true });
    const failing = renderRemove({ editorRef: ref });
    await expect(failing.current('nd')).resolves.toBeUndefined();

    expect(sendNotification).toHaveBeenCalledTimes(2);
  });
});
