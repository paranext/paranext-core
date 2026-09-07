import * as path from 'path';
import * as ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';
import {
  derivePathAliases,
  DynamicRegistration,
  findStaleLivenessAnnotations,
  generateWireSurfaceDocument,
  serializeWireSurfaceDocument,
  StaticRegistration,
  VirtualFile,
} from './generate-wire-surface.util';
import { CSharpScanResult } from './wire-surface.model';

function findRegistration(
  registrations: StaticRegistration[],
  name: string,
): StaticRegistration | undefined {
  return registrations.find((registration) => registration.name === name);
}

function findDynamic(
  dynamicRegistrations: DynamicRegistration[],
  expression: string,
): DynamicRegistration | undefined {
  return dynamicRegistrations.find((registration) => registration.expression === expression);
}

describe('generateWireSurfaceDocument: recognised shapes', () => {
  const files: VirtualFile[] = [
    {
      path: 'src/fixture-shapes.ts',
      text: `
        import { networkObjectService } from '@shared/services/network-object.service';
        import * as networkService from '@shared/services/network.service';
        import * as dataProviderService from '@shared/services/data-provider.service';
        import * as webViewProviderService from '@shared/services/web-view-provider.service';
        import * as projectDataProviderService from '@shared/services/project-data-provider.service';

        registerCommand('platform.testCommand', handler);

        networkService.registerRequestHandler('customCategory:testDirective', handler);

        networkObjectService.set('TestNetworkObject', obj);

        dataProviderService.registerEngine('test.testProvider', engine);
        dataProviderService.registerEngineByType('test.testProviderByType', engine);

        webViewProviderService.registerWebViewProvider('test.testWebView', provider);
        papiWebViewProviderService.register('test.aliasWebView', provider);

        projectDataProviderService.registerProjectDataProviderEngineFactory(
          'test.testPdpf',
          ['test.interface'],
          factory,
        );

        networkService.createNetworkEventEmitterAsync('test.testEvent');
        networkService.createBufferedNetworkEventEmitter('test.testBufferedEvent');
        networkService.createCoreMultiSourceEventEmitter('test.testMultiSourceEvent');

        // Deprecated sync emitter: must never produce an entry.
        networkService.createNetworkEventEmitter('test.syncEventNeverRecorded');

        // Unrelated calls that must never match any shape.
        someOtherThing.set('shouldNotMatch', obj);
        somethingElse.register('shouldNotMatchEither', obj);
      `,
    },
  ];

  const document = generateWireSurfaceDocument(files);

  it('finds a registerCommand call', () => {
    expect(findRegistration(document.registrations, 'platform.testCommand')).toMatchObject({
      category: 'command',
      registeredVia: 'registerCommand',
    });
  });

  it('finds a direct registerRequestHandler call', () => {
    expect(findRegistration(document.registrations, 'customCategory:testDirective')).toMatchObject({
      category: 'directRequestHandler',
      registeredVia: 'registerRequestHandler',
    });
  });

  it('finds a networkObjectService.set call', () => {
    expect(findRegistration(document.registrations, 'TestNetworkObject')).toMatchObject({
      category: 'networkObject',
      registeredVia: 'networkObjectService.set',
    });
  });

  it('finds registerEngine and its registerEngineByType sibling', () => {
    expect(findRegistration(document.registrations, 'test.testProvider')).toMatchObject({
      category: 'dataProviderEngine',
      registeredVia: 'registerEngine',
    });
    expect(findRegistration(document.registrations, 'test.testProviderByType')).toMatchObject({
      category: 'dataProviderEngine',
      registeredVia: 'registerEngineByType',
    });
  });

  it('finds registerWebViewProvider and its deprecated register alias', () => {
    expect(findRegistration(document.registrations, 'test.testWebView')).toMatchObject({
      category: 'webViewProvider',
      registeredVia: 'registerWebViewProvider',
    });
    expect(findRegistration(document.registrations, 'test.aliasWebView')).toMatchObject({
      category: 'webViewProvider',
      registeredVia: 'webViewProviders.register (deprecated alias)',
    });
  });

  it('finds registerProjectDataProviderEngineFactory', () => {
    expect(findRegistration(document.registrations, 'test.testPdpf')).toMatchObject({
      category: 'pdpFactory',
      registeredVia: 'registerProjectDataProviderEngineFactory',
    });
  });

  it('finds createNetworkEventEmitterAsync and createBufferedNetworkEventEmitter', () => {
    expect(findRegistration(document.registrations, 'test.testEvent')).toMatchObject({
      category: 'networkEvent',
      registeredVia: 'createNetworkEventEmitterAsync',
    });
    expect(findRegistration(document.registrations, 'test.testBufferedEvent')).toMatchObject({
      category: 'networkEvent',
      registeredVia: 'createBufferedNetworkEventEmitter',
    });
  });

  it('finds createCoreMultiSourceEventEmitter, the core-internal pre-approved multi-source emitter', () => {
    expect(findRegistration(document.registrations, 'test.testMultiSourceEvent')).toMatchObject({
      category: 'networkEvent',
      registeredVia: 'createCoreMultiSourceEventEmitter',
    });
  });

  it('never records the deprecated synchronous createNetworkEventEmitter', () => {
    expect(findRegistration(document.registrations, 'test.syncEventNeverRecorded')).toBeUndefined();
    expect(
      document.registrations.some((r) => r.name.includes('syncEventNeverRecorded')) ||
        document.dynamicRegistrations.some((r) => r.expression.includes('syncEventNeverRecorded')),
    ).toBe(false);
  });

  it('never matches an unrelated .set(...) or .register(...) call on some other object', () => {
    expect(findRegistration(document.registrations, 'shouldNotMatch')).toBeUndefined();
    expect(findRegistration(document.registrations, 'shouldNotMatchEither')).toBeUndefined();
  });
});

describe('generateWireSurfaceDocument: the papi.networkObjects.set public alias', () => {
  it('recognises papi.networkObjects.set and the bare networkObjects.set alias as networkObjectService.set', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-network-objects-alias.ts',
        text: `
          papi.networkObjects.set('platform.viaPapiAlias', obj);
          networkObjects.set('platform.viaBareAlias', obj);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);

    expect(findRegistration(document.registrations, 'platform.viaPapiAlias')).toMatchObject({
      category: 'networkObject',
      registeredVia: 'networkObjectService.set',
    });
    expect(findRegistration(document.registrations, 'platform.viaBareAlias')).toMatchObject({
      category: 'networkObject',
      registeredVia: 'networkObjectService.set',
    });
  });
});

describe('generateWireSurfaceDocument: documentation and the x-experimental flag', () => {
  it('captures an inline docs object with x-experimental: true', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-docs-inline.ts',
        text: `
          registerCommand('platform.inlineExperimental', handler, {
            method: { 'x-experimental': true, params: [], result: { name: 'r', schema: {} } },
          });
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'platform.inlineExperimental')).toMatchObject({
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
    });
  });

  it('captures x-experimental: false (or absent) as non-experimental, still statically resolved', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-docs-false.ts',
        text: `
          registerCommand('platform.notExperimental', handler, {
            method: { params: [], result: { name: 'r', schema: {} } },
          });
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'platform.notExperimental')).toMatchObject({
      documented: true,
      docsStaticallyResolved: true,
      experimental: false,
    });
  });

  it('records no docs argument as undocumented rather than experimental', () => {
    const files: VirtualFile[] = [
      { path: 'src/fixture-docs-none.ts', text: `registerCommand('platform.noDocs', handler);` },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'platform.noDocs')).toMatchObject({
      documented: false,
      docsStaticallyResolved: true,
      experimental: false,
    });
  });

  it('resolves docs referenced by a same-file const identifier (the *_DOCS pattern)', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-docs-referenced.ts',
        text: `
          const OPEN_THING_DOCS = {
            method: { 'x-experimental': true, params: [], result: { name: 'r', schema: {} } },
          };
          registerCommand('platform.referencedDocs', handler, OPEN_THING_DOCS);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'platform.referencedDocs')).toMatchObject({
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
    });
  });

  it('resolves docs looked up by string-literal key on a same-file const map (the DOCS[key] pattern)', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-docs-keyed.ts',
        text: `
          const COMMAND_DOCS = {
            'platform.keyedA': { method: { 'x-experimental': true, params: [], result: { name: 'r', schema: {} } } },
            'platform.keyedB': { method: { params: [], result: { name: 'r', schema: {} } } },
          };
          registerCommand('platform.keyedA', handler, COMMAND_DOCS['platform.keyedA']);
          registerCommand('platform.keyedB', handler, COMMAND_DOCS.keyedB ?? COMMAND_DOCS['platform.keyedB']);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'platform.keyedA')).toMatchObject({
      docsStaticallyResolved: true,
      experimental: true,
    });
  });

  it('resolves docs referenced across files through an import (the *_CATEGORY constant pattern)', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/shared/fixture-docs.model.ts',
        text: `
          export const SHARED_DOCS = {
            method: { 'x-experimental': true, params: [], result: { name: 'r', schema: {} } },
          };
        `,
      },
      {
        path: 'src/fixture-docs-cross-file.ts',
        text: `
          import { SHARED_DOCS } from '@shared/fixture-docs.model';
          registerCommand('platform.crossFileDocs', handler, SHARED_DOCS);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'platform.crossFileDocs')).toMatchObject({
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
    });
  });

  it('reports docsStaticallyResolved: false, not a guessed experimental value, when a spread could be hiding the flag', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-docs-uncertain.ts',
        text: `
          registerCommand('platform.uncertainDocs', handler, {
            method: { ...someInheritedMethodDocs, params: [], result: { name: 'r', schema: {} } },
          });
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'platform.uncertainDocs')).toMatchObject({
      documented: true,
      docsStaticallyResolved: false,
      experimental: false,
    });
  });

  it('captures notification.x-experimental for a createCoreMultiSourceEventEmitter call (the shared-store:change shape)', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-docs-multi-source-event.ts',
        text: `
          const STORE_CHANGE_EVENT_DOCS = {
            notification: {
              'x-experimental': true,
              summary: 'Emitted when a value in the shared store changes.',
              params: [
                { name: 'change', required: true, summary: 'The changed key and new value.', schema: { type: 'object' } },
              ],
            },
          };
          networkService.createCoreMultiSourceEventEmitter('shared-store:change', STORE_CHANGE_EVENT_DOCS);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'shared-store:change')).toMatchObject({
      category: 'networkEvent',
      registeredVia: 'createCoreMultiSourceEventEmitter',
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
    });
  });

  it('records object-level x-experimental for a network-object-shaped documentation argument', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-docs-network-object.ts',
        text: `
          networkObjectService.set('ExperimentalNetworkObject', obj, 'object', undefined, {
            'x-experimental': true,
          });
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'ExperimentalNetworkObject')).toMatchObject({
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
    });
  });
});

describe('generateWireSurfaceDocument: the registerRequestHandler + serializeRequestType(CATEGORY_COMMAND) bypass', () => {
  const files: VirtualFile[] = [
    {
      path: 'src/shared/data/fixture-rpc.model.ts',
      text: `export const CATEGORY_COMMAND = 'command';`,
    },
    {
      path: 'src/shared/services/fixture-dialog.service-model.ts',
      text: `export const CATEGORY_DIALOG = 'dialog';`,
    },
    {
      path: 'src/fixture-command-bypass.ts',
      text: `
        import { CATEGORY_COMMAND } from '@shared/data/fixture-rpc.model';
        import { CATEGORY_DIALOG } from '@shared/services/fixture-dialog.service-model';

        const ABOUT_DOCS = {
          method: { 'x-experimental': true, params: [], result: { name: 'r', schema: {} } },
        };

        // A command claimed by bypassing registerCommand entirely.
        networkService.registerRequestHandler(
          serializeRequestType(CATEGORY_COMMAND, 'platform.bypassCommand'),
          handler,
          ABOUT_DOCS,
        );

        // Same call shape, different (non-command) category: must stay a directRequestHandler.
        networkService.registerRequestHandler(
          serializeRequestType(CATEGORY_DIALOG, 'showBypassDialog'),
          handler,
        );
      `,
    },
  ];

  const document = generateWireSurfaceDocument(files);

  it('re-files the CATEGORY_COMMAND bypass as a command, named by the resolved directive alone', () => {
    const registration = findRegistration(document.registrations, 'platform.bypassCommand');
    expect(registration).toMatchObject({
      category: 'command',
      registeredVia: 'registerRequestHandler+serializeRequestType(command)',
      experimental: true,
    });
    // Must not also appear as a raw "command:platform.bypassCommand" directRequestHandler entry.
    expect(
      findRegistration(document.registrations, 'command:platform.bypassCommand'),
    ).toBeUndefined();
  });

  it('leaves a non-command serializeRequestType category as a directRequestHandler', () => {
    expect(findRegistration(document.registrations, 'dialog:showBypassDialog')).toMatchObject({
      category: 'directRequestHandler',
      registeredVia: 'registerRequestHandler',
    });
  });
});

describe('generateWireSurfaceDocument: unresolvable names', () => {
  it('files a name built from a runtime value under dynamicRegistrations instead of dropping or guessing it', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-dynamic.ts',
        text: `
          export function registerLoop(commandName: string, handler: unknown): void {
            registerCommand(commandName, handler);
          }

          const pdpId = \`\${newNonce()}-pdp\`;
          dataProviderService.registerEngineByType(pdpId, engine);

          networkObjectService.set(\`\${SHARD_NAME}-\${globalThis.windowId}\`, shard);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);

    expect(findDynamic(document.dynamicRegistrations, 'commandName')).toMatchObject({
      category: 'command',
      registeredVia: 'registerCommand',
    });
    expect(findDynamic(document.dynamicRegistrations, 'pdpId')).toMatchObject({
      category: 'dataProviderEngine',
      registeredVia: 'registerEngineByType',
    });
    // A template literal, spelled with escaped `$` so this is a plain string (the literal source
    // text of the call site's argument), not an actual substitution.
    const expectedShardExpression = `\`\${SHARD_NAME}-\${globalThis.windowId}\``;
    expect(findDynamic(document.dynamicRegistrations, expectedShardExpression)).toMatchObject({
      category: 'networkObject',
      registeredVia: 'networkObjectService.set',
    });

    // None of these ever show up as a resolved (guessed) static registration.
    expect(document.registrations.some((r) => r.file === 'src/fixture-dynamic.ts')).toBe(false);
  });

  it('files an unresolvable serializeRequestType(CATEGORY_COMMAND, ...) directive under category "command"', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/shared/data/fixture-rpc-2.model.ts',
        text: `export const CATEGORY_COMMAND = 'command';`,
      },
      {
        path: 'src/fixture-dynamic-command-bypass.ts',
        text: `
          import { CATEGORY_COMMAND } from '@shared/data/fixture-rpc-2.model';
          networkService.registerRequestHandler(serializeRequestType(CATEGORY_COMMAND, commandName), handler);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(
      findDynamic(
        document.dynamicRegistrations,
        'serializeRequestType(CATEGORY_COMMAND, commandName)',
      ),
    ).toMatchObject({ category: 'command' });
  });

  it('does not resolve a field read off a class instance (only plain object literals are followed)', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-class-instance.ts',
        text: `
          class Provider {
            webViewType = 'shouldNotBeUsed';
          }
          const provider = new Provider();
          registerWebViewProvider(provider.webViewType, provider);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'shouldNotBeUsed')).toBeUndefined();
    expect(findDynamic(document.dynamicRegistrations, 'provider.webViewType')).toMatchObject({
      category: 'webViewProvider',
    });
  });

  it('resolves a field read off a plain object literal (the provider.webViewType pattern)', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-object-literal-field.ts',
        text: `
          const provider = { webViewType: 'test.fromObjectLiteralField' };
          registerWebViewProvider(provider.webViewType, provider);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(findRegistration(document.registrations, 'test.fromObjectLiteralField')).toMatchObject({
      category: 'webViewProvider',
    });
  });
});

describe('generateWireSurfaceDocument: identifier binding through the TypeScript checker', () => {
  it('resolves each function-local const to its own value instead of the first same-named top-level declaration', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-locally-scoped-names.ts',
        text: `
          function registerFirst() {
            const name = 'platform.firstLocallyScopedCommand';
            registerCommand(name, handler);
          }
          function registerSecond() {
            const name = 'platform.secondLocallyScopedCommand';
            registerCommand(name, handler);
          }
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(
      findRegistration(document.registrations, 'platform.firstLocallyScopedCommand'),
    ).toMatchObject({ category: 'command' });
    expect(
      findRegistration(document.registrations, 'platform.secondLocallyScopedCommand'),
    ).toMatchObject({ category: 'command' });
  });

  it('does not leak a stale declaration across separate scans that reuse the same file path with different content', () => {
    const firstFiles: VirtualFile[] = [
      {
        path: 'src/fixture-reused-path.ts',
        text: `
          const NAME = 'platform.reusedPathFirstValue';
          registerCommand(NAME, handler);
        `,
      },
    ];
    const secondFiles: VirtualFile[] = [
      {
        path: 'src/fixture-reused-path.ts',
        text: `
          const NAME = 'platform.reusedPathSecondValue';
          registerCommand(NAME, handler);
        `,
      },
    ];

    generateWireSurfaceDocument(firstFiles);
    const secondDocument = generateWireSurfaceDocument(secondFiles);

    expect(
      findRegistration(secondDocument.registrations, 'platform.reusedPathSecondValue'),
    ).toMatchObject({ category: 'command' });
    expect(
      findRegistration(secondDocument.registrations, 'platform.reusedPathFirstValue'),
    ).toBeUndefined();
  });

  it('resolves a name through a re-export barrel, both under its own name and renamed', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-reexport-origin.ts',
        text: `
          export const DIRECTLY_REEXPORTED_NAME = 'platform.reexportedDirectCommand';
          export const RENAMED_ON_REEXPORT_NAME = 'platform.reexportedRenamedCommand';
        `,
      },
      {
        path: 'src/fixture-reexport-barrel.ts',
        text: `
          export { DIRECTLY_REEXPORTED_NAME } from './fixture-reexport-origin';
          export { RENAMED_ON_REEXPORT_NAME as ALIASED_NAME } from './fixture-reexport-origin';
        `,
      },
      {
        path: 'src/fixture-reexport-consumer.ts',
        text: `
          import { DIRECTLY_REEXPORTED_NAME, ALIASED_NAME } from './fixture-reexport-barrel';
          registerCommand(DIRECTLY_REEXPORTED_NAME, handler);
          registerCommand(ALIASED_NAME, handler);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(
      findRegistration(document.registrations, 'platform.reexportedDirectCommand'),
    ).toMatchObject({ category: 'command' });
    expect(
      findRegistration(document.registrations, 'platform.reexportedRenamedCommand'),
    ).toMatchObject({ category: 'command' });
  });
});

describe('generateWireSurfaceDocument: determinism', () => {
  const files: VirtualFile[] = [
    { path: 'src/z-fixture.ts', text: `registerCommand('platform.zCommand', handler);` },
    { path: 'src/a-fixture.ts', text: `registerCommand('platform.aCommand', handler);` },
    {
      path: 'src/m-fixture.ts',
      text: `
        registerCommand('platform.mCommandTwo', handler);
        registerCommand('platform.mCommandOne', handler);
      `,
    },
  ];

  it('produces byte-identical serialized output across two separate runs', () => {
    const first = serializeWireSurfaceDocument(generateWireSurfaceDocument(files));
    const second = serializeWireSurfaceDocument(generateWireSurfaceDocument(files));
    expect(first).toBe(second);
  });

  it('produces identical output regardless of the input file order', () => {
    const forward = serializeWireSurfaceDocument(generateWireSurfaceDocument(files));
    const reversed = serializeWireSurfaceDocument(
      generateWireSurfaceDocument([...files].reverse()),
    );
    expect(forward).toBe(reversed);
  });

  it('sorts registrations by (category, name)', () => {
    const document = generateWireSurfaceDocument(files);
    const names = document.registrations.map((r) => r.name);
    expect(names).toEqual([...names].sort());
  });

  it('serializes with sorted object keys and a trailing newline', () => {
    const serialized = serializeWireSurfaceDocument(generateWireSurfaceDocument(files));
    expect(serialized.endsWith('\n')).toBe(true);
    expect(serialized.endsWith('\n\n')).toBe(false);
    expect(serialized.includes('\r')).toBe(false);
    // JSON.parse's return type is `any`, so `.header` needs no type assertion here.
    const parsed = JSON.parse(serialized);
    // Header keys sorted alphabetically: excludedPatterns comes before granularity/purpose/...
    const headerKeys = Object.keys(parsed.header);
    expect(headerKeys).toEqual([...headerKeys].sort());
  });
});

describe('generateWireSurfaceDocument: determinism across fresh module instances', () => {
  const files: VirtualFile[] = [
    {
      path: 'src/fixture-fresh-module-instance.ts',
      text: `
        const EVENT_DOCS = {
          method: { 'x-experimental': true, params: [], result: { name: 'r', schema: {} } },
        };
        const eventName = 'platform.freshModuleInstanceEvent';
        registerCommand(eventName, handler, EVENT_DOCS);
      `,
    },
  ];

  it('produces identical output when the module is re-imported after vi.resetModules(), proving per-scan state (e.g. the identifier declaration cache) never survives across separate scans', async () => {
    vi.resetModules();
    const firstModule = await import('./generate-wire-surface.util');
    const firstOutput = firstModule.serializeWireSurfaceDocument(
      firstModule.generateWireSurfaceDocument(files),
    );

    vi.resetModules();
    const secondModule = await import('./generate-wire-surface.util');
    const secondOutput = secondModule.serializeWireSurfaceDocument(
      secondModule.generateWireSurfaceDocument(files),
    );

    expect(secondOutput).toBe(firstOutput);
    // Sanity check the fixture actually exercised name/docs resolution rather than trivially
    // matching on empty output.
    expect(firstOutput).toContain('platform.freshModuleInstanceEvent');
  });
});

describe('generateWireSurfaceDocument: combined TypeScript + C# scanning', () => {
  const tsFiles: VirtualFile[] = [
    { path: 'src/z-fixture.ts', text: `registerCommand('platform.zCommand', handler);` },
    { path: 'src/a-fixture.ts', text: `registerCommand('platform.aCommand', handler);` },
  ];
  // A pre-scanned CSharpScanResult, as run-wire-surface-scanner.ts would hand it in -- this module
  // no longer scans C# source text itself, so the fixture is the scan RESULT, not C# source.
  const csharpScan: CSharpScanResult = {
    registrations: [
      {
        category: 'networkObject',
        name: 'platform.fixtureCombined',
        file: 'c-sharp/Fixtures/FixtureCombined.cs',
        registeredVia: 'NetworkObject.RegisterNetworkObjectAsync',
        documented: false,
        docsStaticallyResolved: true,
        experimental: false,
        language: 'csharp',
      },
      {
        category: 'dataProvider',
        name: 'platform.fixtureProvider-data',
        file: 'c-sharp/Fixtures/FixtureProvider.cs',
        registeredVia: 'DataProvider.RegisterDataProviderAsync',
        documented: false,
        docsStaticallyResolved: true,
        experimental: false,
        language: 'csharp',
      },
    ],
    dynamicRegistrations: [
      {
        category: 'standaloneMethod',
        file: 'c-sharp/Fixtures/FixtureCombined.cs',
        registeredVia: 'PapiClient.RegisterRequestHandlerAsync',
        expression: 'someRuntimeName',
        language: 'csharp',
      },
    ],
  };

  it('tags every entry with its originating language and merges both halves into one document', () => {
    const document = generateWireSurfaceDocument(tsFiles, csharpScan);
    expect(findRegistration(document.registrations, 'platform.aCommand')).toMatchObject({
      language: 'typescript',
    });
    expect(findRegistration(document.registrations, 'platform.fixtureCombined')).toMatchObject({
      language: 'csharp',
      category: 'networkObject',
    });
  });

  it('merges the C# entries into the same (language, category, name, file) code-unit order as the TypeScript entries, rather than appending them', () => {
    const document = generateWireSurfaceDocument(tsFiles, csharpScan);
    // 'csharp' < 'typescript' by code unit, so every C# entry sorts before every TypeScript entry;
    // within each language, category ("dataProvider" < "networkObject" < ... < "command") then name
    // break the remaining ties. This is the exact order a naive [...ts, ...csharp] concatenation
    // (never re-sorted) would NOT produce, since it would put the TypeScript entries first.
    expect(document.registrations.map((r) => r.name)).toEqual([
      'platform.fixtureProvider-data',
      'platform.fixtureCombined',
      'platform.aCommand',
      'platform.zCommand',
    ]);
    expect(document.dynamicRegistrations.map((r) => r.expression)).toEqual(['someRuntimeName']);
  });

  it('produces byte-identical serialized output across two separate runs', () => {
    const first = serializeWireSurfaceDocument(generateWireSurfaceDocument(tsFiles, csharpScan));
    const second = serializeWireSurfaceDocument(generateWireSurfaceDocument(tsFiles, csharpScan));
    expect(first).toBe(second);
  });

  it('produces identical output regardless of the input order, in either language', () => {
    const forward = serializeWireSurfaceDocument(generateWireSurfaceDocument(tsFiles, csharpScan));
    const reversedCsharpScan: CSharpScanResult = {
      registrations: [...csharpScan.registrations].reverse(),
      dynamicRegistrations: [...csharpScan.dynamicRegistrations].reverse(),
    };
    const reversed = serializeWireSurfaceDocument(
      generateWireSurfaceDocument([...tsFiles].reverse(), reversedCsharpScan),
    );
    expect(forward).toBe(reversed);
  });

  it('defaults csharpScan to an empty result, leaving existing TypeScript-only callers unaffected', () => {
    const withoutCSharp = generateWireSurfaceDocument(tsFiles);
    expect(withoutCSharp.registrations.every((r) => r.language === 'typescript')).toBe(true);
    expect(withoutCSharp.registrations).toHaveLength(2);
  });
});

describe('generateWireSurfaceDocument: path aliases derived from tsconfig', () => {
  it('derives every alias the module resolver used to hard-code, plus @assets/*, from the real tsconfig.json paths', () => {
    const tsconfigPath = path.resolve(__dirname, '../../tsconfig.json');
    const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    expect(configFile.error).toBeUndefined();
    // `configFile.config` is `any` (that's `ts.readConfigFile`'s own return shape), so this reads
    // the real tsconfig.json's paths map with no cast needed.
    const { paths } = configFile.config.compilerOptions;

    const derived = derivePathAliases(paths);

    const previousHandList: ReadonlyArray<readonly [string, string]> = [
      ['@shared/', 'src/shared/'],
      ['@main/', 'src/main/'],
      ['@node/', 'src/node/'],
      ['@extension-host/', 'src/extension-host/'],
      ['@renderer/', 'src/renderer/'],
      ['@client/', 'src/client/'],
    ];
    previousHandList.forEach((alias) => expect(derived).toContainEqual(alias));
    expect(derived).toContainEqual(['@assets/', 'assets/']);

    // Nothing in the derived list is absent from tsconfig: every derived alias prefix has to come
    // from a "prefix/*" key that is actually present in the paths map that produced it.
    derived.forEach(([prefix]) => expect(paths[`${prefix}*`]).toBeDefined());
  });

  it('ignores a paths entry that is not a single "*"-suffixed directory mapping (e.g. a single-file shim)', () => {
    const derived = derivePathAliases({
      '@dir/*': ['./src/dir/*'],
      vite: ['./src/@types/shims-vite.d.ts'],
      '@multi/*': ['./src/a/*', './src/b/*'],
    });
    expect(derived).toContainEqual(['@dir/', 'src/dir/']);
    expect(derived.some(([prefix]) => prefix === 'vite')).toBe(false);
    expect(derived.some(([prefix]) => prefix === '@multi/')).toBe(false);
  });
});

describe('generateWireSurfaceDocument: header content', () => {
  it('names every recognised call pattern and the excluded deprecated one', () => {
    const document = generateWireSurfaceDocument([]);
    const patterns = document.header.recognizedPatterns.join('\n');
    [
      'registerCommand',
      'registerRequestHandler',
      'networkObjectService.set',
      'registerEngine',
      'registerEngineByType',
      'registerWebViewProvider',
      'registerProjectDataProviderEngineFactory',
      'createNetworkEventEmitterAsync',
      'createBufferedNetworkEventEmitter',
      'createCoreMultiSourceEventEmitter',
      'RegisterNetworkObjectAsync',
      'RegisterRequestHandlerAsync',
      'network:registerEvent',
    ].forEach((pattern) => expect(patterns).toContain(pattern));

    const excluded = document.header.excludedPatterns.join('\n');
    expect(excluded).toContain('createNetworkEventEmitter');
    expect(excluded).toContain('RegisterNetworkObjectAsync');
    expect(excluded).toContain('RegisterRequestHandlerAsync');
    expect(excluded).toContain('SendRequestAsync');
  });

  it('describes exactly five C# recognition rules, each with its own A-E marker, and exactly five excluded patterns (two TypeScript, three C#)', () => {
    const document = generateWireSurfaceDocument([]);
    ['A. ', 'B. ', 'C. ', 'D. ', 'E. '].forEach((marker) => {
      expect(
        document.header.recognizedPatterns.filter((pattern) => pattern.startsWith(marker)),
      ).toHaveLength(1);
    });
    // 2 TypeScript exclusions (a renamed-import/destructured receiver; the deprecated
    // createNetworkEventEmitter) plus the three real C# exclusions -- the C# list was always
    // empty before this generator read a real Roslyn scan.
    expect(document.header.excludedPatterns).toHaveLength(5);
  });

  it("describes the C# half as reading the data provider project through Roslyn's semantic model, not a text scan", () => {
    const document = generateWireSurfaceDocument([]);
    expect(document.header.scope).toContain('Roslyn');
    expect(document.header.scope).toContain('Paranext.WireSurface');
    expect(document.header.scope.toLowerCase()).not.toContain('pattern-based');
    expect(document.header.scope).not.toContain('not yet covered');
  });

  it('never asserts anything about which entries ought to be experimental', () => {
    const document = generateWireSurfaceDocument([]);
    expect(document.header.purpose.toLowerCase()).toContain('asserts nothing');
  });

  it('mentions the live rpc.discover verification and why this file is not the derived OpenRPC document', () => {
    const document = generateWireSurfaceDocument([]);
    expect(document.header.granularity).toContain('rpc.discover');
    expect(document.header.granularity.toLowerCase()).toContain('unsnapshottable');
  });

  it('documents the liveness field', () => {
    const document = generateWireSurfaceDocument([]);
    expect(document.header.granularity).toContain('liveness');
    expect(document.header.granularity).toContain('livenessReason');
  });
});

describe('generateWireSurfaceDocument: liveness annotations', () => {
  it('stamps a transient annotation onto the matching registration by name, leaving an unannotated one untouched', () => {
    const files: VirtualFile[] = [
      {
        // The annotation is keyed on name AND file, so the fixture has to sit where the real
        // registration does.
        path: 'src/main/main.ts',
        text: `
          networkObjectService.set('testMain', testMain);
          networkObjectService.set('NotAnnotated', obj);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);

    expect(findRegistration(document.registrations, 'testMain')).toMatchObject({
      liveness: 'transient',
    });
    const annotated = findRegistration(document.registrations, 'testMain');
    expect(annotated?.livenessReason).toContain('src/main/main.ts');

    expect(findRegistration(document.registrations, 'NotAnnotated')?.liveness).toBeUndefined();
  });

  it('leaves an annotated name alone when it appears in a different file', () => {
    // An annotation excludes its registration from the live comparison. Keying on name alone would
    // let an unrelated registration that happens to reuse the name inherit that exclusion -- and
    // the staleness check would stay silent, because the name still matched something.
    const files: VirtualFile[] = [
      {
        path: 'src/somewhere-else.ts',
        text: `
          networkObjectService.set('testMain', testMain);
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);

    expect(findRegistration(document.registrations, 'testMain')?.liveness).toBeUndefined();
  });

  it('stamps a lazy annotation onto the matching registration', () => {
    const files: VirtualFile[] = [
      {
        path: 'extensions/src/platform-scripture-editor/src/main.ts',
        text: `
          networkService.createNetworkEventEmitterAsync('platformScriptureEditor.onWillSwitchProject');
        `,
      },
    ];
    const document = generateWireSurfaceDocument(files);
    expect(
      findRegistration(document.registrations, 'platformScriptureEditor.onWillSwitchProject'),
    ).toMatchObject({ liveness: 'lazy' });
  });

  it('reports every annotated name as stale when none of them appear in the scanned registrations', () => {
    const stale = findStaleLivenessAnnotations([]);
    expect(stale).toEqual(
      expect.arrayContaining([
        'testMain',
        'testExtensionHost',
        'platform.placeholder',
        'platformScriptureEditor.onWillSwitchProject',
        'platformScriptureEditor.onDidSwitchProject',
      ]),
    );
    expect(stale).toHaveLength(5);
  });

  it('reports nothing stale once every annotated name is present', () => {
    const registrations: StaticRegistration[] = (
      [
        ['testMain', 'src/main/main.ts'],
        ['testExtensionHost', 'src/extension-host/extension-host.ts'],
        ['platform.placeholder', 'src/extension-host/extension-host.ts'],
        [
          'platformScriptureEditor.onWillSwitchProject',
          'extensions/src/platform-scripture-editor/src/main.ts',
        ],
        [
          'platformScriptureEditor.onDidSwitchProject',
          'extensions/src/platform-scripture-editor/src/main.ts',
        ],
        ['someOtherLiveRegistration', 'src/fixture.ts'],
      ] as const
    ).map(([name, file]) => ({
      category: 'networkObject',
      name,
      file,
      registeredVia: 'networkObjectService.set',
      documented: false,
      docsStaticallyResolved: true,
      experimental: false,
      language: 'typescript',
    }));
    expect(findStaleLivenessAnnotations(registrations)).toEqual([]);
  });
});
