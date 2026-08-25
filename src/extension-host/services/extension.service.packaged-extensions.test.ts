import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/*
 * Guards which list `getInstalledExtensions` derives its `packaged` extensions from.
 *
 * `packaged` must come from the extensions *discovered* for this build (`availableExtensions`,
 * assigned in `reloadExtensions` before any activation begins), not from `activeExtensions`, which
 * only fills in as extensions finish activating one by one. Deriving it from activation state makes
 * "is extension X part of this build?" answer `false` for anything that hasn't activated yet — which
 * hid the Send/Receive toolbar button for entire sessions across two shipped releases. See adr-packaged-extensions-are-discovered
 * in `.context/standards/Architecture-Decisions.md` and `derivePackagedExtensionIdentifiers`.
 *
 * This reads the source rather than calling the function because the inputs are module-private:
 * `availableExtensions` is only populated by a full `reloadExtensions` run (filesystem discovery
 * plus activation), and `getInstalledExtensions` itself is reachable only through the
 * `manageExtensions` elevated privilege. There is no seam to inject either one, so a behavioral test
 * would have to stand up the whole extension host. A source check is narrow, but it fails on exactly
 * the regression that shipped twice, which is more than the alternative of no check at all.
 *
 * Scope, so it isn't read as more than it is: this guards the CURRENT SHAPE of
 * `getInstalledExtensions` — the one function whose body it scans. Move the derivation into a helper
 * that `getInstalledExtensions` calls and both assertions still pass with the regression back, so
 * move this guard along with it. The derivation's behavior is covered properly by
 * `extension-data.util.test.ts`; what is only covered here is the call site.
 */

const EXTENSION_SERVICE_PATH = path.join(__dirname, 'extension.service.ts');

/**
 * Returns the body of the named top-level `async function`, up to its closing brace at column 0.
 *
 * Reading source text means a benign refactor can break this check without breaking the code — so
 * both failure paths say to suspect this file first.
 */
function readFunctionBody(source: string, functionName: string): string {
  const suspectTheGuard = `This guard reads source text, so it may just need updating to match a rename or refactor of ${functionName} — check that before assuming a regression.`;
  const startIndex = source.indexOf(`async function ${functionName}(`);
  if (startIndex < 0)
    throw new Error(
      `Could not find 'async function ${functionName}' in source. ${suspectTheGuard}`,
    );
  const endIndex = source.indexOf('\n}', startIndex);
  if (endIndex < 0)
    throw new Error(`Could not find the end of '${functionName}' in source. ${suspectTheGuard}`);
  return source.slice(startIndex, endIndex);
}

describe('getInstalledExtensions packaged-list source', () => {
  const body = readFunctionBody(
    readFileSync(EXTENSION_SERVICE_PATH, 'utf8'),
    'getInstalledExtensions',
  );

  it('derives packaged extensions from the discovered list (if only renamed, update this guard)', () => {
    expect(body).toMatch(/derivePackagedExtensionIdentifiers\(\s*availableExtensions\s*,/);
  });

  it('does not consult activation state (the regression this guards against)', () => {
    expect(body).not.toMatch(/activeExtensions/);
  });
});
