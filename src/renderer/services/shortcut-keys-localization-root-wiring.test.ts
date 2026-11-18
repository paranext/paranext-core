import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

/**
 * Every shortcut keycap gets its tooltip strings from `ShortcutKeysLocalizationRoot`, which wraps
 * the main window's root and every web view's root. The web view half is mounted from inside the
 * iframe's generated script, which TypeScript, ESLint and the test runner all see as opaque text,
 * so losing a link there would silently drop the tooltip from every web view. Like the error
 * boundary's wiring test, this pins that the pieces exist and name one identifier; only launching
 * the app shows that the generated script runs.
 */

const RENDERER_DIR = path.resolve(__dirname, '..');
const ROOT_NAME = 'ShortcutKeysLocalizationRoot';

function readRendererFile(relativePath: string): string {
  return readFileSync(path.resolve(RENDERER_DIR, relativePath), 'utf-8');
}

describe('shortcut keys localization root wiring', () => {
  it('wraps the main window root', () => {
    const index = readRendererFile('index.tsx');
    const renderCall = index.slice(index.indexOf('root.render('));

    expect(renderCall.indexOf(`<${ROOT_NAME}>`)).toBeGreaterThan(-1);
    expect(renderCall.indexOf(`<${ROOT_NAME}>`)).toBeLessThan(renderCall.indexOf('<App />'));
  });

  it('puts the root on the renderer global and bridges it into each web view iframe', () => {
    const globalThisModel = readRendererFile('global-this-web-view.model.ts');
    const serviceShard = readRendererFile('services/web-view.service-shard.ts');

    expect(globalThisModel).toContain(`globalThis.${ROOT_NAME} =`);
    expect(globalThisModel).toMatch(new RegExp(`var ${ROOT_NAME}:`));
    expect(serviceShard).toContain(`window.${ROOT_NAME} = window.parent.${ROOT_NAME};`);
  });

  it('wraps the web view component in the root at the mount site', () => {
    const serviceShard = readRendererFile('services/web-view.service-shard.ts');
    const mountCall = serviceShard.slice(
      serviceShard.indexOf('root.render('),
      serviceShard.indexOf('const unsubscribeUpdateWebView'),
    );

    expect(mountCall).toMatch(new RegExp(`React\\.createElement\\(\\s*${ROOT_NAME}\\s*,`));
    expect(mountCall.indexOf(ROOT_NAME)).toBeLessThan(
      mountCall.indexOf('globalThis.webViewComponent'),
    );
  });
});
