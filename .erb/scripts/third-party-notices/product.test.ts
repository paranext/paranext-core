import { describe, expect, it } from 'vitest';
import { assertProductMatchesPackaging } from './product';

describe('assertProductMatchesPackaging', () => {
  const config = { productName: 'Paratext 10 Studio' };

  it('accepts no product block at all', () => {
    expect(() =>
      assertProductMatchesPackaging(undefined, config, 'electron-builder.json5'),
    ).not.toThrow();
  });

  it('accepts a block whose name is what the packaging config builds', () => {
    expect(() =>
      assertProductMatchesPackaging(
        { name: 'Paratext 10 Studio', repository: 'paranext/paratext-10-studio' },
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
});
