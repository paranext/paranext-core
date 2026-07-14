import { describe, expect, it } from 'vitest';
import { pickTabIconUrl, type TabIconUrls } from './tab-icon.util';

const URLS: TabIconUrls = {
  dark: 'papi-extension://platformScriptureEditor/assets/library-dark.svg',
  lightSelected: 'papi-extension://platformScriptureEditor/assets/library-selected.svg',
  lightUnselected: 'papi-extension://platformScriptureEditor/assets/library-unselected.svg',
  lightDefault: 'papi-extension://platformScriptureEditor/assets/library.svg',
};

describe('pickTabIconUrl', () => {
  describe('dark theme', () => {
    it('returns dark icon when tab is selected', () => {
      expect(pickTabIconUrl(true, true, URLS)).toBe(URLS.dark);
    });

    it('returns dark icon when tab is not selected', () => {
      expect(pickTabIconUrl(true, false, URLS)).toBe(URLS.dark);
    });

    it('returns dark icon when selected state is unknown', () => {
      expect(pickTabIconUrl(true, undefined, URLS)).toBe(URLS.dark);
    });
  });

  describe('light theme', () => {
    it('returns lightSelected icon when tab is selected', () => {
      expect(pickTabIconUrl(false, true, URLS)).toBe(URLS.lightSelected);
    });

    it('returns lightUnselected icon when tab is not selected', () => {
      expect(pickTabIconUrl(false, false, URLS)).toBe(URLS.lightUnselected);
    });

    it('returns lightDefault icon when selected state is unknown', () => {
      expect(pickTabIconUrl(false, undefined, URLS)).toBe(URLS.lightDefault);
    });
  });
});
