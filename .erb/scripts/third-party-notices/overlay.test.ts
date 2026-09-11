import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { OVERLAY_ENV, loadPolicy, overlayFromEnv } from './policy';
import { assertProductMatchesPackaging, readPackagingConfig } from './product';
import {
  assertSeparateProgramLinksRecorded,
  assertSeparateProgramTextsAvailable,
  assertSeparateProgramsRecorded,
} from './separate-programs';
import { assertExternalExtensionsRecorded } from './external-extensions';
import { render } from './render';

const REPO = path.resolve(__dirname, '..', '..', '..');
const POLICY = path.join(__dirname, 'notices-policy.json');
const OVERLAY = path.join(__dirname, '__fixtures__', 'overlay', 'policy.json');

/**
 * The overlay path, end to end, against a file on disk.
 *
 * Everything else in this suite reaches the overlay features through hand-built objects: a `Policy`
 * literal, a `Report` literal. Nothing exercises what a downstream product actually does - name a
 * file through `NOTICES_POLICY_OVERLAY`, have `loadPolicy` read and merge it, and have the gates
 * and the renderer work on the result. Core's own run never sets the variable, so without this the
 * feature's whole reason for existing has no test that reads an overlay at all, and a change to
 * `mergePolicies`, the merge kinds, or the shape a gate expects can leave every unit test green
 * while a downstream document loses a section, exits 0, and surfaces in another repository at
 * release time.
 *
 * Fixture rather than a real product's overlay, and deliberately minimal: one entry per
 * contributable table, and delivery evidence pointing at a file beside it rather than at
 * `electron-builder.json5`, so that editing the real packaging config cannot fail a test about
 * merging.
 */
describe('a downstream overlay read from disk', () => {
  const merged = loadPolicy(POLICY, OVERLAY);
  const base = loadPolicy(POLICY, undefined);

  it('is named through the environment the way a downstream build names it', () => {
    // The one environment read this feature rests on. A downstream sets it and runs core's script;
    // if the name or the trimming changed, every assertion below would still pass while no real
    // build reached its overlay at all.
    expect(overlayFromEnv({ [OVERLAY_ENV]: `  ${OVERLAY}  ` })).toBe(OVERLAY);
    expect(overlayFromEnv({})).toBeUndefined();
  });

  it('takes the product block from the overlay, which the committed policy cannot carry', () => {
    expect(base.product).toBeUndefined();
    expect(merged.product?.name).toBe('Example Product');
    expect(merged.product?.repository).toBe('example-org/example-product');
    expect(merged.product?.licenseDocument.file).toBe('LICENSING.md');
  });

  it('adds the overlay’s table entries without dropping the committed ones', () => {
    // The direction a merge gets wrong silently: an overlay that REPLACED a table would leave this
    // repository's own determinations out of the downstream document, and the document would still
    // render, still hash, still exit 0.
    expect(Object.keys(merged.separatePrograms || {})).toEqual(['Example Tool']);
    expect(Object.keys(merged.externalExtensions || {})).toEqual(['example-private-extension']);
    expect(merged.overrides?.['nuget:ExampleTool.Windows']?.separateProgram).toBe('Example Tool');
    Object.keys(base.overrides || {}).forEach((key) => {
      expect(merged.overrides).toHaveProperty(key);
    });
  });

  it('unions the allow list rather than replacing it', () => {
    expect(merged.allowed).toContain('Zlib');
    base.allowed.forEach((id) => expect(merged.allowed).toContain(id));
  });

  it('passes every committed-policy gate the release path runs', () => {
    // The gates, against the merged policy, in the same shapes `main.ts` calls them with. A gate
    // that started expecting something an overlay cannot produce would fail here rather than in a
    // downstream repository at package time.
    const config = {
      ...readPackagingConfig(path.join(REPO, 'electron-builder.json5')),
      productName: 'Example Product',
    };
    expect(() =>
      assertProductMatchesPackaging(merged.product, config, 'electron-builder.json5'),
    ).not.toThrow();
    expect(() =>
      assertSeparateProgramsRecorded(
        REPO,
        merged.separatePrograms || {},
        new Set([...merged.allowed, ...merged.copyleft]),
      ),
    ).not.toThrow();
    expect(() => assertSeparateProgramTextsAvailable(merged.separatePrograms || {})).not.toThrow();
    expect(() =>
      assertSeparateProgramLinksRecorded(merged.overrides || {}, merged.separatePrograms || {}),
    ).not.toThrow();
    expect(() =>
      assertExternalExtensionsRecorded(
        ['example-private-extension'],
        merged.externalExtensions || {},
      ),
    ).not.toThrow();
  });

  // `assertSeparateProgramTextsAvailable` above passes only because the corpus holds the text, and
  // the corpus index is a COMMITTED file built from the committed policy - so an overlay that
  // admits an identifier core does not is admitting one whose text nobody shipped. Stated as its
  // own case because that is the half of the contract the merge cannot enforce.
  it('names only identifiers the committed corpus already holds texts for', () => {
    expect(base.allowed).toContain('Zlib');
    expect(base.allowed).toContain('ISC');
  });

  it('renders a document carrying what only the overlay could have supplied', () => {
    const out = render({
      licenseeVersion: '9.18.0',
      corpusVersion: '6.6.0',
      verdicts: [],
      product: merged.product,
      separatePrograms: merged.separatePrograms,
      externalExtensions: merged.externalExtensions,
    });
    expect(out).toContain('Example Product incorporates the third-party components listed below.');
    expect(out).toContain('## Third-party programs redistributed as separate executables');
    expect(out).toContain('### Example Tool');
    expect(out).toContain('## Extensions packed from other repositories');
    expect(out).toContain('### example-private-extension');
    expect(out).toContain('the Example Product licence');
    // Not a Paratext product, so UBS's permission must be stated as not reaching it - and the
    // lexical-database section is gated on the extension being packed, which this render does not
    // claim, so it must not appear at all.
    expect(out).not.toContain('United Bible Societies');
  });
});
