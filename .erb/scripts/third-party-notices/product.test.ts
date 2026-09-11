import { describe, expect, it } from 'vitest';
import { assertProductMatchesPackaging, DEFAULT_PRODUCT_NAME } from './product';
import type { ProductBlock } from './types';

describe('assertProductMatchesPackaging', () => {
  // The shape a downstream build produces: a renamed product, and the resources its installer
  // carries beside the notices document.
  const config = {
    productName: 'Paratext 10',
    extraResources: [
      './THIRD-PARTY-NOTICES.md',
      './LICENSE',
      './LICENSING.md',
      './TERMS-OF-SERVICE.html',
      { from: './extensions/dist/', to: './extensions' },
    ],
  };

  /** A complete, valid block, so each case below states only the thing it is about. */
  const product = (overrides: Partial<ProductBlock> = {}): ProductBlock => ({
    name: 'Paratext 10',
    repository: 'paranext/paratext-10-studio',
    isParatext: true,
    licenseDocument: {
      label: 'the Paratext Terms of Service',
      file: 'TERMS-OF-SERVICE.html',
      href: 'https://registry.paratext.org/terms',
    },
    ...overrides,
  });

  it("accepts no product block where the build is this repository's own", () => {
    expect(() =>
      assertProductMatchesPackaging(
        undefined,
        { productName: DEFAULT_PRODUCT_NAME },
        'electron-builder.json5',
      ),
    ).not.toThrow();
  });

  // Without this the no-product prose - "Platform.Bible incorporates..." and "This is a reference,
  // not the notices for any shipped product" - would ship as the notices for a renamed build whose
  // overlay misspelled or dropped the "product" key.
  it('refuses a renamed build that declares no product block', () => {
    expect(() =>
      assertProductMatchesPackaging(undefined, config, 'electron-builder.json5'),
    ).toThrow(
      /electron-builder\.json5 builds "Paratext 10" but the notices policy declares no "product" block; add one to the overlay, or restore productName/,
    );
  });

  it('accepts a block whose name is what the packaging config builds', () => {
    expect(() =>
      assertProductMatchesPackaging(product(), config, 'electron-builder.json5'),
    ).not.toThrow();
  });

  it('refuses a name the packaging config does not build', () => {
    expect(() =>
      assertProductMatchesPackaging(
        product({ name: 'Paratext 10 Studio' }),
        config,
        'electron-builder.json5',
      ),
    ).toThrow(/names "Paratext 10 Studio", but electron-builder.json5 builds "Paratext 10"/);
  });

  it('refuses a block missing its name or repository, naming the one that is missing', () => {
    expect(() => assertProductMatchesPackaging(product({ name: ' ' }), config, 'c')).toThrow(
      /"product" block records no usable "name"/,
    );
    expect(() => assertProductMatchesPackaging(product({ repository: '' }), config, 'c')).toThrow(
      /"product" block records no usable "repository"/,
    );
  });

  it.each([
    ['an object', { type: 'git', url: 'https://example.org/o/r.git' }],
    ['a number', 42],
    ['a boolean', true],
  ])('refuses a repository recorded as %s rather than a string', (_label, repository) => {
    // `repository` is cross-checked against nothing - unlike `name`, which has to equal
    // `productName` - and `render.ts` prints it into the document's opening paragraph inside a code
    // span, so a coerced non-string ships there as the literal `[object Object]`. The object form
    // is the natural slip: it is how `package.json` spells the same field.
    //
    // Parsed rather than written as a literal, which is both how the value really arrives - the
    // overlay is untyped JSON - and the only way to express a shape the declared type forbids
    // without asserting one.
    const malformed = JSON.parse(JSON.stringify({ ...product(), repository }));
    expect(() => assertProductMatchesPackaging(malformed, config, 'c')).toThrow(
      /"product" block records "repository" as a/,
    );
  });

  it('refuses a product named Paratext that does not record the UBS permission as covering it', () => {
    // The document would say the permission is specific to Paratext and then that it does not
    // extend to this product - a contradiction a reader cannot resolve.
    expect(() =>
      assertProductMatchesPackaging(
        product({ isParatext: undefined }),
        config,
        'electron-builder.json5',
      ),
    ).toThrow(/does not record\s+"isParatext": true/s);

    expect(() =>
      assertProductMatchesPackaging(product(), config, 'electron-builder.json5'),
    ).not.toThrow();
  });

  describe('the license document the product is licensed under', () => {
    // `LICENSING.md` is this repository's answer and resolves from this repository, in the
    // repository AND in the installer. For a product it is neither: the notices are generated into
    // the product's repository, where this repository's terms file does not exist, and packed into
    // an installer whose LICENSING.md is this repository's. So a product declares its own, and it
    // has to be a file the installer actually carries.
    it('refuses a product block that records none', () => {
      // `delete` on a parsed copy rather than a `null` literal: an overlay that omits the key is
      // the real shape, and `JSON.stringify` would drop an `undefined` value anyway.
      const withoutDocument = JSON.parse(JSON.stringify(product()));
      delete withoutDocument.licenseDocument;
      expect(() => assertProductMatchesPackaging(withoutDocument, config, 'c')).toThrow(
        /records no "licenseDocument"/,
      );
    });

    it.each(['label', 'file'] as const)('refuses an empty %s', (field) => {
      expect(() =>
        assertProductMatchesPackaging(
          product({ licenseDocument: { ...product().licenseDocument, [field]: '  ' } }),
          config,
          'c',
        ),
      ).toThrow(new RegExp(`"licenseDocument" records no usable "${field}"`));
    });

    // The point of naming the file rather than linking it: the document tells the reader it sits
    // beside them in the installed product. A name no installer carries makes that false exactly
    // where it is most likely to be read - offline, by someone looking for the terms they agreed
    // to.
    it('refuses a file the packaging config does not copy into resources', () => {
      expect(() =>
        assertProductMatchesPackaging(
          product({ licenseDocument: { ...product().licenseDocument, file: 'EULA.pdf' } }),
          config,
          'electron-builder.json5',
        ),
      ).toThrow(/names "EULA\.pdf", and electron-builder\.json5 copies no such file/);
    });

    it('accepts a file a per-platform block copies', () => {
      expect(() =>
        assertProductMatchesPackaging(
          product({ licenseDocument: { ...product().licenseDocument, file: 'EULA.rtf' } }),
          { ...config, win: { extraResources: ['./EULA.rtf'] } },
          'electron-builder.json5',
        ),
      ).not.toThrow();
    });

    it('accepts a file renamed on its way into resources', () => {
      // electron-builder's object form names the destination, and that is the name a reader of the
      // installed product sees beside the notices.
      expect(() =>
        assertProductMatchesPackaging(
          product({ licenseDocument: { ...product().licenseDocument, file: 'TERMS.html' } }),
          {
            ...config,
            extraResources: [{ from: './TERMS-OF-SERVICE.html', to: './TERMS.html' }],
          },
          'electron-builder.json5',
        ),
      ).not.toThrow();
    });

    it('accepts a block with no published copy', () => {
      expect(() =>
        assertProductMatchesPackaging(
          product({
            licenseDocument: {
              label: 'the Paratext Terms of Service',
              file: 'TERMS-OF-SERVICE.html',
            },
          }),
          config,
          'c',
        ),
      ).not.toThrow();
    });
  });
});
