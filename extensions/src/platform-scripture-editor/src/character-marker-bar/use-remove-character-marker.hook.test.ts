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
  '%webView_platformScriptureEditor_error_removeCharacterMarkerNotNarrowable%': 'Cannot narrow',
  '%webView_platformScriptureEditor_error_syncEditBlocked%': 'Editing paused',
};

/**
 * A mock editor whose USJ changes on removal by default, so a test only opts into the "nothing
 * changed" path by passing `usjChanges: false`.
 */
function makeEditorRef({ usjChanges = true, throws = false } = {}) {
  let usj = { type: 'USJ', version: '3.1', content: ['before'] };
  const removeCharacterMarker = vi.fn(() => {
    if (throws) throw new Error('readonly');
    if (usjChanges) usj = { type: 'USJ', version: '3.1', content: ['after'] };
  });
  const getUsj = vi.fn(() => usj);
  // A mock literal cannot satisfy the full EditorRef interface — cast for test isolation.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const ref = {
    current: { removeCharacterMarker, getUsj },
  } as unknown as MutableRefObject<EditorRef | null>;
  return { ref, removeCharacterMarker, getUsj };
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

  it('explains a refusal when the document is unchanged after the call', async () => {
    // The upstream method declines rather than over-removing when a range selection covers only
    // part of a nested marker and the OUTER one is the target. Without this the row just does
    // nothing, which is the silent no-op the AC forbids.
    const { ref } = makeEditorRef({ usjChanges: false });
    const result = renderRemove({ editorRef: ref });

    await result.current('nd');

    expect(sendNotification).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Cannot narrow', severity: 'warning' }),
    );
  });

  it('says nothing when the removal did change the document', async () => {
    const { ref } = makeEditorRef();
    const result = renderRemove({ editorRef: ref });

    await result.current('nd');

    expect(sendNotification).not.toHaveBeenCalled();
  });
});
