import { readFileSync } from 'fs';
import { resolve } from 'path';
import { FIND_WEBVIEW_TYPE, SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './web-view.model';

describe('SCRIPTURE_EDITOR_WEBVIEW_TYPE drift guard', () => {
  test('matches the platform-scripture-editor extension source of truth', () => {
    // Core cannot import the extension's source (separate build context), so the constant in
    // web-view.model.ts is a hand-kept mirror of the extension's `SCRIPTURE_EDITOR_WEBVIEW_TYPE`. A
    // silent drift breaks BCV navigation-target resolution and the project picker with no type
    // error, so this guard reads the extension source and fails if the two ever diverge.
    // Resolved from the repo root (Vitest runs with the repo root as cwd)
    const extensionUtilsPath = resolve(
      process.cwd(),
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts',
    );
    const extensionSource = readFileSync(extensionUtilsPath, 'utf8');
    const match = extensionSource.match(
      /export const SCRIPTURE_EDITOR_WEBVIEW_TYPE\s*=\s*['"]([^'"]+)['"]/,
    );

    // A null match means the extension moved or renamed the constant, so the mirror can no longer
    // be verified — treated as drift.
    expect(match).not.toBeNull();
    expect(match?.[1]).toBe(SCRIPTURE_EDITOR_WEBVIEW_TYPE);
  });
});

describe('FIND_WEBVIEW_TYPE drift guard', () => {
  test('matches the platform-scripture extension source of truth', () => {
    // Same mirror problem as above, with a quieter failure: the Simple-mode layout seeds a Find tab
    // by this `webViewType` (simple-layout.data.ts), so a rename in the extension leaves that tab
    // pointing at a type no provider serves — it just fails to load at startup, with no type error.
    // Resolved from the repo root (Vitest runs with the repo root as cwd)
    const extensionProviderPath = resolve(
      process.cwd(),
      'extensions/src/platform-scripture/src/find.web-view-provider.ts',
    );
    const extensionSource = readFileSync(extensionProviderPath, 'utf8');
    const match = extensionSource.match(/export const findWebViewType\s*=\s*['"]([^'"]+)['"]/);

    // A null match means the extension moved or renamed the constant, so the mirror can no longer
    // be verified — treated as drift.
    expect(match).not.toBeNull();
    expect(match?.[1]).toBe(FIND_WEBVIEW_TYPE);
  });
});
