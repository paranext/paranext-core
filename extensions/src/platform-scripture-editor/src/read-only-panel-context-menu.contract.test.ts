import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { MODEL_TEXT_PANEL_WEBVIEW_TYPE } from './model-text-panel.const';
import {
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
  getResourceTextPanelWebViewType,
} from './resource-text-panel.const';

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));

function readSource(fileName: string): string {
  return readFileSync(path.join(SRC_DIR, fileName), 'utf-8');
}

/**
 * The panel components render from a test and a story, so they take every platform call as a
 * callback prop and import nothing at runtime from `@papi`. A type-only import is erased and
 * allowed. These are the files the panels' menu code lives in.
 */
const PAPI_FREE_FILES = [
  'resource-text-panel.component.tsx',
  'model-text-panel.component.tsx',
  'use-read-only-panel-context-menu.hook.ts',
  'focus-editor-keeping-selection.util.ts',
  'edit-menu-actions.util.ts',
  'editor-context-menu-pick.util.ts',
];

describe('read-only panel context menu wiring', () => {
  it.each(PAPI_FREE_FILES)('%s imports nothing from @papi at runtime', (fileName) => {
    const importLines = readSource(fileName)
      .split('\n')
      .filter(
        (line) =>
          /^\s*(import|export)\b.*\bfrom\s+['"]/.test(line) || /^\s*}\s*from\s+['"]/.test(line),
      );
    // Positive control: the sweep sees import lines at all
    expect(importLines.length).toBeGreaterThan(0);
    const papiImports = importLines.filter(
      (line) => line.includes('@papi/') && !/^\s*import\s+type\b/.test(line),
    );
    expect(papiImports).toEqual([]);
  });

  it('names a web view type with a contribution for each panel type', () => {
    const menus = JSON.parse(
      readFileSync(path.join(SRC_DIR, '../contributions/menus.json'), 'utf-8'),
    );
    [
      BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
      COMMENTARIES_PANEL_WEBVIEW_TYPE,
      MODEL_TEXT_PANEL_WEBVIEW_TYPE,
    ].forEach((webViewType) => {
      expect(menus.webViewMenus[webViewType]?.contextMenu?.items.length).toBeGreaterThan(0);
    });
  });
});

describe('getResourceTextPanelWebViewType', () => {
  it('serves a Scripture resource as the Bible Texts panel', () => {
    expect(getResourceTextPanelWebViewType('ScriptureResource')).toBe(
      BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
    );
  });

  it('serves a commentary as the Commentaries panel', () => {
    expect(getResourceTextPanelWebViewType('CommentaryResource')).toBe(
      COMMENTARIES_PANEL_WEBVIEW_TYPE,
    );
  });

  it('keeps the three types apart and as the contribution spells them', () => {
    expect(BIBLE_TEXTS_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.bibleTexts');
    expect(COMMENTARIES_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.commentaries');
    expect(MODEL_TEXT_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.modelText');
  });
});
