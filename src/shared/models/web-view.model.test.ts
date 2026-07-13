import { readFileSync } from 'fs';
import { resolve } from 'path';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './web-view.model';

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
