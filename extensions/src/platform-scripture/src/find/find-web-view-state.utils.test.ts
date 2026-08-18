import { describe, it, expect } from 'vitest';
import type { SavedWebViewDefinition } from '@papi/core';
import { deserialize, serialize } from 'platform-bible-utils';
import type { FindWebViewOptions } from '../find.web-view-provider';
import { buildFindWebViewState } from './find-web-view-state.utils';

/** A saved Find definition carrying the given persisted state. */
function savedFind(state?: Record<string, unknown>): SavedWebViewDefinition {
  return { id: 'find-1', webViewType: 'platformScripture.find', state };
}

/** Find open-options with the source fields defaulted; spread `overrides` for the case under test. */
function findOptions(overrides: Partial<FindWebViewOptions>): FindWebViewOptions {
  return { projectId: undefined, editorScrollGroupId: undefined, ...overrides };
}

describe('buildFindWebViewState', () => {
  describe('initialSearchText → findSearchTerm (selection pre-fill)', () => {
    it('writes findSearchTerm when a selection is forwarded', () => {
      const state = buildFindWebViewState(savedFind(), findOptions({ initialSearchText: 'dog' }));
      expect(state?.findSearchTerm).toBe('dog');
    });

    it('does NOT write findSearchTerm for an empty selection (leaves the saved term intact)', () => {
      const state = buildFindWebViewState(
        savedFind({ findSearchTerm: 'restored' }),
        findOptions({ initialSearchText: '' }),
      );
      expect(state?.findSearchTerm).toBe('restored');
    });

    it('does NOT write findSearchTerm when no selection is supplied', () => {
      const state = buildFindWebViewState(
        savedFind({ findSearchTerm: 'restored' }),
        findOptions({}),
      );
      expect(state?.findSearchTerm).toBe('restored');
    });
  });

  describe('editorWebViewId (clear-on-panel-trigger rule)', () => {
    it("uses the caller's editor id when openFind supplies one", () => {
      const state = buildFindWebViewState(
        savedFind({ editorWebViewId: 'old-editor' }),
        findOptions({ editorWebViewId: 'new-editor' }),
      );
      expect(state?.editorWebViewId).toBe('new-editor');
    });

    it('CLEARS a stale saved editor id when openFind sets clearEditorWebViewId (panel trigger)', () => {
      const state = buildFindWebViewState(
        savedFind({ editorWebViewId: 'old-editor' }),
        findOptions({ editorWebViewId: undefined, clearEditorWebViewId: true }),
      );
      expect(state?.editorWebViewId).toBeUndefined();
    });

    it('preserves the saved editor id when neither key is set (content reload/restore)', () => {
      // findOptions omits both keys entirely, mirroring the reload/restore path.
      const state = buildFindWebViewState(savedFind({ editorWebViewId: 'saved-editor' }), {
        projectId: undefined,
        editorScrollGroupId: undefined,
      });
      expect(state?.editorWebViewId).toBe('saved-editor');
    });

    it('still clears after the options round-trip the process boundary', () => {
      // These options are sent to the web view provider over RPC, which serializes them. The clear
      // signal is a positive `true` precisely so it survives that trip; an `undefined`-valued key
      // would not be a reliable signal to depend on.
      const sent = findOptions({ editorWebViewId: undefined, clearEditorWebViewId: true });
      const received: FindWebViewOptions = deserialize(serialize(sent));
      const state = buildFindWebViewState(savedFind({ editorWebViewId: 'old-editor' }), received);
      expect(state?.editorWebViewId).toBeUndefined();
    });
  });
});
