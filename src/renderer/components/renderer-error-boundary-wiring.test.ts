import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

/**
 * The renderer error boundary only does anything if it is actually wrapped around the app at the
 * one `root.render` call in `index.tsx`. Deleting that wrapper compiles cleanly, passes lint, and
 * leaves every one of the boundary's own unit tests green - while silently restoring the blank
 * window the boundary exists to prevent.
 *
 * `index.tsx` cannot be imported here to check it directly: it runs the renderer's whole startup at
 * module scope, mounting React and starting services. So this reads the source as text, the way the
 * web view boundary's wiring test does.
 *
 * What this pins: that the boundary is imported, that the root render puts the app INSIDE it rather
 * than beside it, and that the teardown consults the crash flag before purging web view state. What
 * it cannot pin: that the boundary catches anything at runtime - the boundary's own unit tests
 * cover that.
 */

const RENDERER_DIR = path.resolve(__dirname, '..');

function readRendererFile(relativePath: string): string {
  return readFileSync(path.resolve(RENDERER_DIR, relativePath), 'utf-8');
}

const BOUNDARY_NAME = 'RendererErrorBoundary';

describe('renderer error boundary wiring', () => {
  it('exports the boundary class that index.tsx names', () => {
    const component = readRendererFile('components/renderer-error-boundary.component.tsx');

    expect(component).toMatch(new RegExp(`export class ${BOUNDARY_NAME}\\b`));
  });

  it('imports the boundary into the renderer entry point', () => {
    const index = readRendererFile('index.tsx');

    // Matches across newlines: the import is a braced list that prettier may wrap over several
    // lines as more names are pulled from this module
    expect(index).toMatch(new RegExp(`import \\{[^}]*\\b${BOUNDARY_NAME}\\b[^}]*\\} from`, 's'));
  });

  it('wraps the app in the boundary at the root render call', () => {
    const index = readRendererFile('index.tsx');

    const renderStart = index.indexOf('root.render(');
    expect(renderStart).toBeGreaterThanOrEqual(0);
    // `markStartup` is called several times before this point, so the end anchor must be the first
    // one AFTER the render call rather than the first in the file. Asserted rather than assumed: a
    // missing anchor gives `indexOf` -1, and `slice(start, -1)` would silently widen the window to
    // the rest of the file and let anything below the render call satisfy the checks
    const renderEnd = index.indexOf('markStartup(', renderStart);
    expect(renderEnd).toBeGreaterThan(renderStart);
    const renderCall = index.slice(renderStart, renderEnd);

    // CONTAINMENT, not just order: the app must appear between the boundary's opening and closing
    // tags. Asserting the two tags in order would be satisfied by
    // `<RendererErrorBoundary></RendererErrorBoundary><App />`, which wraps nothing and restores
    // the blank-window bug in full
    const boundaryOpen = renderCall.indexOf(`<${BOUNDARY_NAME}>`);
    const app = renderCall.indexOf('<App />');
    const boundaryClose = renderCall.indexOf(`</${BOUNDARY_NAME}>`);

    expect(boundaryOpen).toBeGreaterThanOrEqual(0);
    expect(app).toBeGreaterThan(boundaryOpen);
    expect(boundaryClose).toBeGreaterThan(app);
  });

  it('checks the crash flag before purging web view state on unload', () => {
    const index = readRendererFile('index.tsx');

    // Why the guard exists: see `hasRendererCrashed` in renderer-error-boundary.component.tsx.
    // Pinned here because deleting the guard compiles, lints and leaves every unit test green.
    const teardownStart = index.indexOf("addEventListener('beforeunload'");
    expect(teardownStart).toBeGreaterThanOrEqual(0);
    const cleanupCall = index.indexOf('cleanupOldWebViewState()', teardownStart);
    expect(cleanupCall).toBeGreaterThan(teardownStart);

    // Matched as a UNIT, guard and early return together: asserting only that the call appears
    // before the purge passes just as well with the `return` deleted, which restores the bug.
    const guard = index.indexOf('if (hasRendererCrashed()) return;', teardownStart);
    expect(guard).toBeGreaterThan(teardownStart);
    expect(guard).toBeLessThan(cleanupCall);
  });
});
