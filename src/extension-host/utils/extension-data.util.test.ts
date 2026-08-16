import { ExtensionInfo } from '@extension-host/extension-types/extension-info.model';
import { ExtensionIdentifier } from '@shared/models/manage-extensions-privilege.model';
import { derivePackagedExtensionIdentifiers } from './extension-data.util';

/** Builds the minimal {@link ExtensionInfo} shape the packaged-list derivation reads */
function createExtensionInfo(name: string, version: string): ExtensionInfo {
  // ExtensionInfo is a frozen manifest with many fields; the derivation only reads name and version,
  // and building a full valid manifest here would obscure what each test is actually about.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { name, version } as ExtensionInfo;
}

describe('derivePackagedExtensionIdentifiers', () => {
  it('reports every discovered extension when none are installed as zips', () => {
    const discovered = [
      createExtensionInfo('platformGetResources', '1.2.3'),
      createExtensionInfo('paratextBibleSendReceive', '0.2.0'),
    ];

    expect(derivePackagedExtensionIdentifiers(discovered, [])).toEqual([
      { extensionName: 'platformGetResources', extensionVersion: '1.2.3' },
      { extensionName: 'paratextBibleSendReceive', extensionVersion: '0.2.0' },
    ]);
  });

  it('excludes discovered extensions that are also installed as zips', () => {
    const discovered = [
      createExtensionInfo('platformGetResources', '1.2.3'),
      createExtensionInfo('helloWorld', '1.0.0'),
    ];
    const enabled: ExtensionIdentifier[] = [
      { extensionName: 'helloWorld', extensionVersion: '1.0.0' },
    ];

    expect(derivePackagedExtensionIdentifiers(discovered, enabled)).toEqual([
      { extensionName: 'platformGetResources', extensionVersion: '1.2.3' },
    ]);
  });

  it('excludes by name regardless of version, since only one version of an extension runs', () => {
    const discovered = [createExtensionInfo('helloWorld', '2.0.0')];
    const enabled: ExtensionIdentifier[] = [
      { extensionName: 'helloWorld', extensionVersion: '1.0.0' },
    ];

    expect(derivePackagedExtensionIdentifiers(discovered, enabled)).toEqual([]);
  });

  it('reports an extension that has not activated, since the list describes the build', () => {
    // The regression this function exists for: callers ask "did this ship with the app?"
    // and must get the same answer whether or not activation has reached the extension yet. Nothing
    // about activation state is an input here, which is the point.
    const discovered = [createExtensionInfo('paratextBibleSendReceive', '0.2.0')];

    expect(derivePackagedExtensionIdentifiers(discovered, [])).toEqual([
      { extensionName: 'paratextBibleSendReceive', extensionVersion: '0.2.0' },
    ]);
  });

  it('returns an empty list when nothing was discovered', () => {
    expect(
      derivePackagedExtensionIdentifiers(
        [],
        [{ extensionName: 'helloWorld', extensionVersion: '1.0.0' }],
      ),
    ).toEqual([]);
  });
});
