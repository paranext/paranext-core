import { describe, expect, it } from 'vitest';
import { assertProductMatchesPackaging, DEFAULT_PRODUCT_NAME } from './product';

describe('assertProductMatchesPackaging', () => {
  const config = { productName: 'Paratext 10 Studio' };

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
      /electron-builder\.json5 builds "Paratext 10 Studio" but the notices policy declares no "product" block; add one to the overlay, or restore productName/,
    );
  });

  it('accepts a block whose name is what the packaging config builds', () => {
    expect(() =>
      assertProductMatchesPackaging(
        {
          name: 'Paratext 10 Studio',
          repository: 'paranext/paratext-10-studio',
          isParatext: true,
        },
        config,
        'electron-builder.json5',
      ),
    ).not.toThrow();
  });

  it('refuses a name the packaging config does not build', () => {
    expect(() =>
      assertProductMatchesPackaging(
        { name: 'Paratext 10', repository: 'paranext/paratext-10-studio' },
        config,
        'electron-builder.json5',
      ),
    ).toThrow(/names "Paratext 10", but electron-builder.json5 builds "Paratext 10 Studio"/);
  });

  it('refuses a block missing its name or repository', () => {
    expect(() =>
      assertProductMatchesPackaging({ name: ' ', repository: 'o/r' }, config, 'c'),
    ).toThrow(/"name" and "repository"/);
    expect(() =>
      assertProductMatchesPackaging({ name: 'Paratext 10 Studio', repository: '' }, config, 'c'),
    ).toThrow(/"name" and "repository"/);
  });

  it('refuses a product named Paratext that does not record the UBS permission as covering it', () => {
    // The document would say the permission is specific to Paratext and then that it does not
    // extend to this product - a contradiction a reader cannot resolve.
    expect(() =>
      assertProductMatchesPackaging(
        { name: 'Paratext 10 Studio', repository: 'paranext/paratext-10-studio' },
        { productName: 'Paratext 10 Studio' },
        'electron-builder.json5',
      ),
    ).toThrow(/does not record\s+"isParatext": true/s);

    expect(() =>
      assertProductMatchesPackaging(
        { name: 'Paratext 10 Studio', repository: 'paranext/paratext-10-studio', isParatext: true },
        { productName: 'Paratext 10 Studio' },
        'electron-builder.json5',
      ),
    ).not.toThrow();
  });
});
