import type { SavedWebViewDefinition } from '@papi/core';
import type { FindWebViewOptions } from '../find.web-view-provider';
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

/** Find open-options with the source fields defaulted; spread `overrides` for the case under test. */
function findOptions(overrides: Partial<FindWebViewOptions> = {}): FindWebViewOptions {
  return { projectId: undefined, editorScrollGroupId: undefined, ...overrides };
}

describe('buildFindWebViewFields', () => {
  describe('interface-mode gates', () => {
    it('pins the tab, adds the icon, and sets the tooltip in simple mode', () => {
      const fields = buildFindWebViewFields(
        savedWebView(),
        findOptions(),
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.isClosable).toBe(false);
      expect(fields.iconUrl).toBe(FIND_ICON_URL);
      expect(fields.tooltip).toBe(LOCALIZED_TITLE);
    });

    it('leaves the tab closable and un-iconed in power mode, preserving any saved icon', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ iconUrl: 'saved-icon.svg' }),
        findOptions(),
        'power',
        LOCALIZED_TITLE,
      );

      expect(fields.isClosable).toBe(true);
      expect(fields.iconUrl).toBe('saved-icon.svg');
    });

    it('sets the tooltip in both modes and leaves the redundancy for the renderer to suppress', () => {
      // PlatformTabTitle drops a tooltip that only repeats the visible title unless the tab is
      // icon-only, so there is nothing for a mode gate here to add.
      expect(
        buildFindWebViewFields(savedWebView(), findOptions(), 'simple', LOCALIZED_TITLE).tooltip,
      ).toBe(LOCALIZED_TITLE);
      expect(
        buildFindWebViewFields(savedWebView(), findOptions(), 'power', LOCALIZED_TITLE).tooltip,
      ).toBe(LOCALIZED_TITLE);
    });

    it('always passes the raw localize key as the title so it re-localizes on a UI language change', () => {
      expect(
        buildFindWebViewFields(savedWebView(), findOptions(), 'simple', LOCALIZED_TITLE).title,
      ).toBe(FIND_TITLE_KEY);
      expect(
        buildFindWebViewFields(savedWebView(), findOptions(), 'power', LOCALIZED_TITLE).title,
      ).toBe(FIND_TITLE_KEY);
    });
  });

  // The scroll-group and `state` rules themselves are covered in find-web-view-state.utils.test.ts;
  // these pin that this util actually composes them rather than recomputing them.
  describe('composed scroll group', () => {
    it('preserves the saved scroll group in power mode when the caller supplies none', () => {
      // The regression this pins: every layout hydration reloads with no options, so overwriting
      // here reset a user-chosen scroll group back to the first one on every restart.
      const fields = buildFindWebViewFields(
        savedWebView({ scrollGroupScrRef: 3 }),
        findOptions(),
        'power',
        LOCALIZED_TITLE,
      );

      expect(fields.scrollGroupScrRef).toBe(3);
    });

    it('forces scroll group 0 in simple mode so Find stays verse-synced with the editor', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ scrollGroupScrRef: 3 }),
        findOptions(),
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
        findOptions({ projectId: 'incoming' }),
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.projectId).toBe('incoming');
    });

    it('falls back to the saved project when the caller supplies none', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ projectId: 'saved' }),
        findOptions(),
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.projectId).toBe('saved');
    });
  });

  describe('composed state', () => {
    it('keeps the saved editor web view id when the caller supplies none', () => {
      const fields = buildFindWebViewFields(
        savedWebView({ state: { editorWebViewId: 'editor-1' } }),
        findOptions(),
        'simple',
        LOCALIZED_TITLE,
      );

      expect(fields.state?.editorWebViewId).toBe('editor-1');
    });

    it('seeds the search term only when the caller supplies one', () => {
      expect(
        buildFindWebViewFields(
          savedWebView(),
          findOptions({ initialSearchText: 'grace' }),
          'simple',
          LOCALIZED_TITLE,
        ).state?.findSearchTerm,
      ).toBe('grace');
      expect(
        buildFindWebViewFields(
          savedWebView({ state: { findSearchTerm: 'kept' } }),
          findOptions(),
          'simple',
          LOCALIZED_TITLE,
        ).state?.findSearchTerm,
      ).toBe('kept');
    });
  });
});
