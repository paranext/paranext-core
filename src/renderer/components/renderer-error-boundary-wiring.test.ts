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
 * What this pins: that the boundary is imported and that the root render passes the app as its
 * child. What it cannot pin: that the boundary catches anything at runtime - the boundary's own
 * unit tests cover that.
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

    expect(index).toMatch(new RegExp(`import \\{ ${BOUNDARY_NAME} \\} from`));
  });

  it('wraps the app in the boundary at the root render call', () => {
    const index = readRendererFile('index.tsx');

    const renderStart = index.indexOf('root.render(');
    // `markStartup` is called several times before this point, so the end anchor must be the first
    // one AFTER the render call rather than the first in the file
    const renderCall = index.slice(renderStart, index.indexOf('markStartup(', renderStart));

    // Asserting both the wrapper and the app, in that order, orders out the failure where the
    // boundary is present but the app is rendered beside it rather than inside it
    expect(renderCall).toMatch(new RegExp(`<${BOUNDARY_NAME}>`));
    expect(renderCall).toContain('<App />');
    expect(renderCall.indexOf(BOUNDARY_NAME)).toBeLessThan(renderCall.indexOf('<App />'));
  });
});
