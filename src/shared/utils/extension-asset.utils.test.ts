import { describe, expect, test } from 'vitest';
import { getAssetPathInfoFromExtensionUri } from '@shared/utils/extension-asset.utils';

describe('getAssetPathInfoFromExtensionUri', () => {
  test('splits a well-formed extension asset URI', () => {
    expect(getAssetPathInfoFromExtensionUri('papi-extension://my-ext/assets/x')).toEqual({
      extensionName: 'my-ext',
      assetPath: 'assets/x',
    });
  });

  test('decodes a percent-encoded extension name and asset path', () => {
    expect(getAssetPathInfoFromExtensionUri('papi-extension://my%20ext/assets/a%20b.png')).toEqual({
      extensionName: 'my ext',
      assetPath: 'assets/a b.png',
    });
  });

  // The scheme check and the strip that follows it must agree on how much they cover. Checking
  // only the scheme name accepts a URI with the separator replaced, then strips three characters
  // too many — cutting into the extension name and resolving into a different extension's assets.
  test('rejects a URI whose scheme separator is not "://"', () => {
    expect(() =>
      getAssetPathInfoFromExtensionUri('papi-extensionXXvictim/assets/secret.json'),
    ).toThrow(/needs to start with/);
  });

  test('rejects a URI with a different scheme', () => {
    expect(() => getAssetPathInfoFromExtensionUri('papi-er://images/x')).toThrow(
      /needs to start with/,
    );
  });

  test('rejects a URI with no slash after the extension name', () => {
    expect(() => getAssetPathInfoFromExtensionUri('papi-extension://my-ext')).toThrow(
      /needs to have a slash/,
    );
  });

  test('rejects an empty extension name or asset path', () => {
    expect(() => getAssetPathInfoFromExtensionUri('papi-extension:///assets/x')).toThrow(
      /contents on both sides/,
    );
    expect(() => getAssetPathInfoFromExtensionUri('papi-extension://my-ext/')).toThrow(
      /contents on both sides/,
    );
  });

  test('rejects an asset path outside the assets directory', () => {
    expect(() => getAssetPathInfoFromExtensionUri('papi-extension://my-ext/secret.json')).toThrow(
      /limited to files in the "assets" directory/,
    );
  });

  // The limit is expressed in characters, so it counts graphemes, not UTF-16 code units — a name
  // that is under the limit in characters must pass however many code units it occupies
  test('measures the length limit in characters, not code units', () => {
    const hundredAstralCharacters = '\u{1F984}'.repeat(100);

    expect(
      getAssetPathInfoFromExtensionUri(
        `papi-extension://${encodeURIComponent(hundredAstralCharacters)}/assets/x`,
      ).extensionName,
    ).toEqual(hundredAstralCharacters);

    expect(() =>
      getAssetPathInfoFromExtensionUri(
        `papi-extension://${encodeURIComponent(`${hundredAstralCharacters}\u{1F984}`)}/assets/x`,
      ),
    ).toThrow(/100 characters/);
  });
});
