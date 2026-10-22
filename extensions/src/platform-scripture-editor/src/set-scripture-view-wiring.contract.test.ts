import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * The web view is too large to mount in jsdom (see `content-zoom-markers.contract.test.ts`), so this
 * source-reading contract test pins that the `setScriptureView` message handler persists the
 * requested view type as is. The displayed view type is derived from the persisted one through
 * `resolveViewTypeForInterfaceMode`, which keeps Simple mode out of the Power-only views, so the
 * handler must not write that coerced value back.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

describe("the web view's setScriptureView message handler", () => {
  it('persists the requested view type without coercing it', () => {
    const source = readFileSync(WEB_VIEW_FILE, 'utf-8').replace(/\s+/g, ' ');
    const start = source.indexOf("case 'setScriptureView': {");
    expect(start).toBeGreaterThanOrEqual(0);
    const handler = source.slice(start, source.indexOf('break;', start));
    expect(handler).toContain('saveViewType(editorMessage.viewType)');
    expect(handler).not.toContain('resolveViewTypeForInterfaceMode');
  });
});
