import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Pins that the web view actually turns on the editor's hidden-content guard. The web view cannot be
 * mounted in jsdom (see `insert-comment-anchor-guard.contract.test.ts`), so this reads its source.
 * Without `onHiddenContentDelete` in the editor options, Backspace and Delete remove figures,
 * sidebars, and other hidden content silently, and every unit test of the handler still passes.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

describe('hidden-content delete guard wiring (platform-scripture-editor.web-view.tsx)', () => {
  const source = readFileSync(WEB_VIEW_FILE, 'utf-8').replace(/\s+/g, ' ');

  it('passes the handler to the editor whenever the editor can be edited', () => {
    expect(source).toContain(
      'onHiddenContentDelete: isReadOnlyEffective ? undefined : handleHiddenContentDelete,',
    );
  });

  it('builds the handler on the platform confirm dialog', () => {
    expect(source).toContain("papi.dialogs.showDialog('platform.confirm', confirmOptions)");
  });
});
