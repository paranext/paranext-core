import fs from 'fs';
import path from 'path';

/** The editor web view's source, where its save debounce is declared. */
const EDITOR_WEB_VIEW_SOURCE = path.resolve(
  __dirname,
  '../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
);

/**
 * Reads `PDP_SAVE_DEBOUNCE_MS` from the editor web view's source, which does not export it. Throws
 * if the declaration is missing or not a plain number, so a change to how the editor declares its
 * debounce fails loudly here instead of leaving every wait derived from it silently wrong.
 */
function readEditorSaveDebounceMs(): number {
  const source = fs.readFileSync(EDITOR_WEB_VIEW_SOURCE, 'utf8');
  const match = /const PDP_SAVE_DEBOUNCE_MS\s*=\s*(\d[\d_]*)\s*;/.exec(source);
  if (!match)
    throw new Error(
      `Could not find "const PDP_SAVE_DEBOUNCE_MS = <number>;" in ${EDITOR_WEB_VIEW_SOURCE}; update readEditorSaveDebounceMs to match how the editor declares its save debounce`,
    );
  return Number(match[1].replace(/_/g, ''));
}

/**
 * The editor's trailing-edge save debounce in milliseconds, read from the editor's own source so a
 * spec that waits for a save never carries a copy of the number.
 */
export const EDITOR_SAVE_DEBOUNCE_MS = readEditorSaveDebounceMs();
