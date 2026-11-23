import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

/**
 * The web view error boundary only works if three edits in two files stay in agreement, and none of
 * them is reachable by an ordinary unit test: the `root.render` call that mounts the boundary lives
 * inside a template literal that becomes the iframe's generated script, so TypeScript, ESLint and
 * the test runner all see it as opaque text.
 *
 * Break any single link - a rename, a line dropped in a merge - and every web view silently goes
 * back to blanking on a render throw, with the boundary's own unit tests still green. That is the
 * exact regression this whole feature exists to prevent, so it gets a guard.
 *
 * What this pins: that the three pieces exist and refer to the same identifier. What it cannot pin:
 * that the generated script actually runs correctly in an iframe - only launching the app shows
 * that. It is a consistency check, not a behavioral one.
 */

const RENDERER_DIR = path.resolve(__dirname, '..');

function readRendererFile(relativePath: string): string {
  return readFileSync(path.resolve(RENDERER_DIR, relativePath), 'utf-8');
}

const BOUNDARY_NAME = 'WebViewErrorBoundary';

describe('web view error boundary wiring', () => {
  it('exports the boundary class the other two files name', () => {
    const component = readRendererFile('components/web-view-error-boundary.component.tsx');

    expect(component).toMatch(new RegExp(`export class ${BOUNDARY_NAME}\\b`));
  });

  it('puts the boundary on the renderer global so the iframe can reach it', () => {
    // Same mechanism as `createRoot`: the generated script runs inside the iframe, where the only
    // things in scope are globals bridged from the parent
    const globalThisModel = readRendererFile('global-this-web-view.model.ts');

    expect(globalThisModel).toContain(`globalThis.${BOUNDARY_NAME} =`);
    expect(globalThisModel).toMatch(new RegExp(`var ${BOUNDARY_NAME}:`));
  });

  it('bridges the global into each web view iframe', () => {
    const serviceShard = readRendererFile('services/web-view.service-shard.ts');

    expect(serviceShard).toContain(`window.${BOUNDARY_NAME} = window.parent.${BOUNDARY_NAME};`);
  });

  it('wraps the web view component in the boundary at the mount site', () => {
    const serviceShard = readRendererFile('services/web-view.service-shard.ts');

    // The mount call must create the boundary AND pass the web view component as its child. Asserting
    // both orders out the failure where the wrapper is present but the component is rendered beside
    // it rather than inside it.
    const mountCall = serviceShard.slice(
      serviceShard.indexOf('root.render('),
      serviceShard.indexOf('const unsubscribeUpdateWebView'),
    );

    // Whitespace-tolerant so a reformat cannot fail this for the wrong reason
    expect(mountCall).toMatch(new RegExp(`React\\.createElement\\(\\s*${BOUNDARY_NAME}\\s*,`));
    expect(mountCall).toContain('React.createElement(globalThis.webViewComponent, webViewProps)');
    expect(mountCall.indexOf(BOUNDARY_NAME)).toBeLessThan(
      mountCall.indexOf('globalThis.webViewComponent'),
    );
  });

  it('passes the boundary the props it needs to identify and reload the web view', () => {
    const serviceShard = readRendererFile('services/web-view.service-shard.ts');
    const mountCall = serviceShard.slice(
      serviceShard.indexOf('root.render('),
      serviceShard.indexOf('const unsubscribeUpdateWebView'),
    );

    // All three read from the same saved definition, so a definition update cannot leave the
    // boundary reporting one web view's id against another's type or title
    expect(mountCall).toContain('webViewId: savedWebViewDefinition.id');
    expect(mountCall).toContain('webViewType: savedWebViewDefinition.webViewType');
    expect(mountCall).toContain('webViewTitle: savedWebViewDefinition.title');
  });
});
