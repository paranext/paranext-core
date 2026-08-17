import type { SavedWebViewDefinition } from '@papi/core';
import {
  buildFindWebViewFields,
  FIND_ICON_URL,
  FIND_TITLE_KEY,
} from './find-web-view-definition.util';

const LOCALIZED_TITLE = 'Find';

function savedWebView(overrides: Partial<SavedWebViewDefinition> = {}): SavedWebViewDefinition {
  // The saved definition carries more fields than this test needs; the util only reads these.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    id: 'find-tab',
    webViewType: 'platformScripture.find',
    contentType: 'react',
    ...overrides,
  } as SavedWebViewDefinition;
}

describe('buildFindWebViewFields', () => {
  describe('interface-mode gates', () => {
    it('pins the tab, adds the icon, and sets the tooltip in simple mode', () => {
      const fields = buildFindWebViewFields(savedWebView(), {}, 'simple', LOCALIZED_TITLE);

      expect(fields.isClosable).toBe(false);
      expect(fields.iconUrl).toBe(FIND_ICON_URL);
      expect(fields.tooltip).toBe(LOCALIZED_TITLE);
    });

    it('leaves the tab closable and un-iconed in power mode, preserving any saved tooltip and icon', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ tooltip: 'saved tooltip', iconUrl: 'saved-icon.svg' }),
        {},
        'power',
        LOCALIZED_TITLE,
      );

      expect(fields.isClosable).toBe(true);
      expect(fields.iconUrl).toBe('saved-icon.svg');
      expect(fields.tooltip).toBe('saved tooltip');
    });

    it('always passes the raw localize key as the title so it re-localizes on a UI language change', () => {
      expect(buildFindWebViewFields(savedWebView(), {}, 'simple', LOCALIZED_TITLE).title).toBe(
        FIND_TITLE_KEY,
      );
      expect(buildFindWebViewFields(savedWebView(), {}, 'power', LOCALIZED_TITLE).title).toBe(
        FIND_TITLE_KEY,
      );
    });
  });

  describe('scroll group', () => {
    it('uses the editor scroll group the caller supplies', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ scrollGroupScrRef: 3 }),
        { editorScrollGroupId: 2 },
        'power',
        LOCALIZED_TITLE,
      );

      expect(fields.scrollGroupScrRef).toBe(2);
    });

    it('preserves the saved scroll group in power mode when the caller supplies none', () => {
      // The regression this pins: every layout hydration reloads with no options, so overwriting
      // here reset a user-chosen scroll group back to the first one on every restart.
      const fields = buildFindWebViewFields(
        savedWebView({ scrollGroupScrRef: 3 }),
        {},
        'power',
        LOCALIZED_TITLE,
      );

      expect(fields.scrollGroupScrRef).toBe(3);
    });

    it('forces scroll group 0 in simple mode when the caller supplies none', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ scrollGroupScrRef: 3 }),
        {},
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.scrollGroupScrRef).toBe(0);
    });
  });

  describe('project binding', () => {
    it('prefers the caller project over the saved one', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ projectId: 'saved' }),
        { projectId: 'incoming' },
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.projectId).toBe('incoming');
    });

    it('falls back to the saved project when the caller supplies none', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ projectId: 'saved' }),
        {},
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.projectId).toBe('saved');
    });
  });

  describe('state', () => {
    it('scrubs a stale read-only flag rather than carrying it over', () => {
      // Without this, a Find left read-only from following the editor onto a published resource
      // would come back read-only after being re-pointed at a writable project, and Replace would
      // stay disabled with nothing on screen explaining why.
      const fields = buildFindWebViewFields(
        savedWebView({ state: { isReadOnly: true } }),
        {},
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.state.isReadOnly).toBe(false);
    });

    it('applies the caller read-only flag', () => {
      const fields = buildFindWebViewFields(savedWebView(), { isReadOnly: true }, 'power', 'Find');

      expect(fields.state.isReadOnly).toBe(true);
    });

    it('keeps the saved editor web view id when the caller supplies none', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ state: { editorWebViewId: 'editor-1' } }),
        {},
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.state.editorWebViewId).toBe('editor-1');
    });

    it('seeds the search term only when the caller supplies one', () => {
      expect(
        buildFindWebViewFields(savedWebView(), { initialSearchText: 'grace' }, 'simple', 'Find')
          .state.findSearchTerm,
      ).toBe('grace');
      expect(
        buildFindWebViewFields(
          savedWebView({ state: { findSearchTerm: 'kept' } }),
          {},
          'simple',
          'Find',
        ).state.findSearchTerm,
      ).toBe('kept');
    });
  });
});
