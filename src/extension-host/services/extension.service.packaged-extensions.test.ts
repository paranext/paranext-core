import { describe, expect, test, vi } from 'vitest';
import { ExtensionInfo } from '@extension-host/extension-types/extension-info.model';
import { testingExtensionService } from '@extension-host/services/extension.service';

/*
 * `packaged` must come from the extensions *discovered* for this build, not from the ones that have
 * finished activating: activation fills in one extension at a time, so a list derived from it
 * answers "is extension X part of this build?" with `false` for anything still queued — which hid
 * the Send/Receive toolbar button for entire sessions across two shipped releases. See
 * `adr-packaged-extensions-are-discovered` in `.context/standards/Architecture-Decisions.md`.
 *
 * These tests ask in exactly that gap: extensions discovered, none activated.
 */

// The extension service logs through the shared logger as it loads, which warns when it cannot tell
// which process it is running in — so this has to be set before the import above, not after it.
vi.hoisted(async () => {
  const { ProcessType } = await import('@shared/global-this.model');
  globalThis.processType = ProcessType.ExtensionHost;
});

// Importing the extension service creates its installed- and disabled-extension directories, and
// `getInstalledExtensions` lists both. Both are empty here: every discovered extension is packaged.
vi.mock('@node/services/node-file-system.service', () => ({
  createDir: vi.fn(),
  readDir: vi.fn(async () => ({ file: [], directory: [] })),
  readFileText: vi.fn(),
  getStats: vi.fn(),
  copyFile: vi.fn(),
  deleteFile: vi.fn(),
  deleteDir: vi.fn(),
  writeFile: vi.fn(),
  moveFile: vi.fn(),
  readFileBinary: vi.fn(),
  EntryType: { File: 'file', Directory: 'directory' },
}));

const { prepareElevatedPrivileges, setAvailableExtensions } = testingExtensionService;

function discoveredExtension(name: string, version: string): ExtensionInfo {
  return {
    name,
    version,
    main: 'index.js',
    elevatedPrivileges: [],
    activationEvents: [],
    dirUri: `resources://${name}`,
  };
}

/** `getInstalledExtensions` as an extension holding the `manageExtensions` privilege receives it */
function getInstalledExtensions() {
  const { manageExtensions } = prepareElevatedPrivileges({
    name: 'extensionManager',
    version: '1.0.0',
    main: 'index.js',
    elevatedPrivileges: ['manageExtensions'],
    activationEvents: [],
  });
  if (!manageExtensions) throw new Error('manageExtensions privilege was not granted');
  return manageExtensions.getInstalledExtensions();
}

describe('getInstalledExtensions packaged list', () => {
  test('reports every discovered extension as packaged before any of them has activated', async () => {
    setAvailableExtensions([
      discoveredExtension('platformGetResources', '1.0.0'),
      discoveredExtension('paratextBibleSendReceive', '2.1.0'),
    ]);

    const { packaged } = await getInstalledExtensions();

    expect(packaged).toEqual([
      { extensionName: 'platformGetResources', extensionVersion: '1.0.0' },
      { extensionName: 'paratextBibleSendReceive', extensionVersion: '2.1.0' },
    ]);
  });
});
