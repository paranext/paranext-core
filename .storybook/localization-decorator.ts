/**
 * Storybook decorator that applies localization This decorator loads localized strings from all
 * localization.json files and replaces %key% patterns in the rendered story with actual localized
 * text.
 */

import React, { useEffect, useRef } from 'react';
import libStrings from '../lib/platform-bible-react/src/localizedStrings.json';
import platformScriptureStrings from '../extensions/src/platform-scripture/contributions/localizedStrings.json';
import platformScriptureEditorStrings from '../extensions/src/platform-scripture-editor/contributions/localizedStrings.json';
import platformGetResourcesStrings from '../extensions/src/platform-get-resources/contributions/localizedStrings.json';
import legacyCommentManagerStrings from '../extensions/src/legacy-comment-manager/contributions/localizedStrings.json';
import helloRock3Strings from '../extensions/src/hello-rock3/contributions/localizedStrings.json';
import helloSomeoneStrings from '../extensions/src/hello-someone/contributions/localizedStrings.json';
import platformLexicalToolsStrings from '../extensions/src/platform-lexical-tools/contributions/localizedStrings.json';
import paraboxRegistrationStrings from '../extensions/src/paratext-registration/contributions/localizedStrings.json';
import quickVerseStrings from '../extensions/src/quick-verse/contributions/localizedStrings.json';

/** Build a map of all localization keys to English strings */
function buildLocalizationMap(): Record<string, string> {
  const map: Record<string, string> = {};

  const allStringFiles = [
    libStrings,
    platformScriptureStrings,
    platformScriptureEditorStrings,
    platformGetResourcesStrings,
    legacyCommentManagerStrings,
    helloRock3Strings,
    helloSomeoneStrings,
    platformLexicalToolsStrings,
    paraboxRegistrationStrings,
    quickVerseStrings,
  ];

  // Extract English strings from all localization files
  for (const stringFile of allStringFiles) {
    const englishStrings = (stringFile as any).localizedStrings?.en || {};
    Object.assign(map, englishStrings);
  }

  return map;
}

let localizationMap: Record<string, string> | null = null;

/** Get the localization map (lazy-loaded) */
function getLocalizationMap(): Record<string, string> {
  if (!localizationMap) {
    localizationMap = buildLocalizationMap();
  }
  return localizationMap;
}

/**
 * Replace localization keys (%key%) with their English strings Walks the DOM tree and replaces text
 * content
 */
function replaceLocalizationKeys(root: Node): void {
  const map = getLocalizationMap();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodesToProcess: Text[] = [];

  // Collect all text nodes first to avoid modifying the tree while walking
  let node: Text | null;
  while ((node = walker.nextNode() as Text) !== null) {
    nodesToProcess.push(node);
  }

  // Process each text node
  for (const textNode of nodesToProcess) {
    let text = textNode.textContent || '';
    let modified = false;

    // Replace all %key% patterns with localized strings
    text = text.replace(/%([a-zA-Z0-9_]+)%/g, (match, key) => {
      const fullKey = `%${key}%`;
      if (map[fullKey]) {
        modified = true;
        return map[fullKey];
      }
      return match; // Keep original if no translation found
    });

    if (modified) {
      textNode.textContent = text;
    }
  }

  // Also replace in attributes (like placeholders)
  const allElements = root.querySelectorAll('*');
  for (const element of allElements) {
    for (const attr of element.attributes) {
      let value = attr.value;
      const originalValue = value;

      value = value.replace(/%([a-zA-Z0-9_]+)%/g, (match, key) => {
        const fullKey = `%${key}%`;
        return map[fullKey] || match;
      });

      if (value !== originalValue) {
        element.setAttribute(attr.name, value);
      }
    }
  }
}

/** React component that wraps a story and applies localization */
function LocalizationWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      replaceLocalizationKeys(containerRef.current);
    }
  });

  return React.createElement('div', { ref: containerRef }, children);
}

/** Storybook decorator that applies localization */
export function localizationDecorator(Story: any) {
  return React.createElement(LocalizationWrapper, {
    children: React.createElement(Story),
  });
}

/**
 * Helper function for use in stories to get localized strings for specific keys
 *
 * Usage in story:
 *
 * ```tsx
 * import { getLocalizedStrings } from '.storybook/localization-decorator';
 *
 * const strings = getLocalizedStrings(['%key1%', '%key2%']);
 * // returns { '%key1%': 'English text 1', '%key2%': 'English text 2' }
 * ```
 */
export function getLocalizedStrings(keys: string[]): Record<string, string> {
  const map = getLocalizationMap();
  const result: Record<string, string> = {};

  for (const key of keys) {
    result[key] = map[key] || key; // Fallback to key if not found
  }

  return result;
}

/**
 * Helper function for use in stories to replace keys in text
 *
 * Usage in story:
 *
 * ```tsx
 * import { replaceLocalizationInText } from '.storybook/localization-decorator';
 *
 * const args = {
 *   placeholder: replaceLocalizationInText('%webView_find_searchPlaceholder%'),
 * };
 * ```
 */
export function replaceLocalizationInText(text: string): string {
  const map = getLocalizationMap();
  return text.replace(/%([a-zA-Z0-9_]+)%/g, (match, key) => {
    const fullKey = `%${key}%`;
    return map[fullKey] || match;
  });
}

export {
  getLocalizationMap,
  replaceLocalizationKeys,
  getLocalizedStrings,
  replaceLocalizationInText,
};
