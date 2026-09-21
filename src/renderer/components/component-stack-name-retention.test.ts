import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

/**
 * `WebViewErrorBoundary` logs React's component stack, and React builds that stack out of the
 * function and class names it finds on the fiber types. A minifier that mangles those names does
 * not break the boundary - it keeps logging, and the log keeps arriving - it only turns every frame
 * into a two-letter identifier nobody can look up. So the failure is invisible: the boundary's own
 * tests stay green, CI stays green, and the loss only shows up in a field crash report months
 * later, which is where it was found the first time.
 *
 * Three build configs have to keep asking for the names, and any one of them reverting is enough to
 * lose a stack. See `adr-keep-component-names-in-packaged-bundles` in
 * `.context/standards/Architecture-Decisions.md` for the measured costs and the alternatives that
 * were rejected.
 *
 * What this pins: that each config still asks its minifier to keep names. What it cannot pin: that
 * a built bundle actually came out with them - only building shows that, and for
 * `platform-bible-react`'s committed `dist` that is
 * `lib/platform-bible-react/src/dist-keep-names.test.ts`.
 */

const REPO_ROOT = path.resolve(__dirname, '../../..');

function readRepoFile(relativePath: string): string {
  return readFileSync(path.resolve(REPO_ROOT, relativePath), 'utf-8');
}

describe('component stack name retention', () => {
  it('keeps names through the renderer bundle minifier', () => {
    const config = readRepoFile('.erb/configs/webpack.config.renderer.prod.ts');

    expect(config).toMatch(/keep_classnames:\s*true/);
    expect(config).toMatch(/keep_fnames:\s*true/);
  });

  it('keeps names through the extension WebView bundle minifier', () => {
    const config = readRepoFile('extensions/webpack/webpack.config.web-view.ts');

    expect(config).toMatch(/keep_classnames:\s*true/);
    expect(config).toMatch(/keep_fnames:\s*true/);
  });

  it('keeps names through the platform-bible-react library build', () => {
    // esbuild runs before either webpack config, so a name it drops here cannot be recovered later
    const config = readRepoFile('lib/platform-bible-react/vite.config.ts');

    expect(config).toMatch(/keepNames:\s*true/);
  });
});
