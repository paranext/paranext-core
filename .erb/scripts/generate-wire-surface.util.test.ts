import { describe, expect, it } from 'vitest';
import {
  DynamicRegistration,
  findStaleLivenessAnnotations,
  generateWireSurfaceDocument,
  serializeWireSurfaceDocument,
  StaticRegistration,
  VirtualFile,
} from './generate-wire-surface.util';

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

describe('generateWireSurfaceDocument: combined TypeScript + C# scanning', () => {
  const tsFiles: VirtualFile[] = [
    { path: 'src/z-fixture.ts', text: `registerCommand('platform.zCommand', handler);` },
    { path: 'src/a-fixture.ts', text: `registerCommand('platform.aCommand', handler);` },
  ];
  const csharpFiles = [
    {
      path: 'c-sharp/Fixtures/FixtureCombined.cs',
      text: `
        internal class FixtureCombined : NetworkObject
        {
            private const string NetworkObjectName = "platform.fixtureCombined";
            public Task Go() => RegisterNetworkObjectAsync(NetworkObjectName, fns, details);
        }
      `,
    },
  ];

  it('tags every entry with its originating language and merges both halves into one document', () => {
    const document = generateWireSurfaceDocument(tsFiles, csharpFiles);
    expect(findRegistration(document.registrations, 'platform.aCommand')).toMatchObject({
      language: 'typescript',
    });
    expect(findRegistration(document.registrations, 'platform.fixtureCombined')).toMatchObject({
      language: 'csharp',
      category: 'networkObject',
    });
  });

  it('produces byte-identical serialized output across two separate runs', () => {
    const first = serializeWireSurfaceDocument(generateWireSurfaceDocument(tsFiles, csharpFiles));
    const second = serializeWireSurfaceDocument(generateWireSurfaceDocument(tsFiles, csharpFiles));
    expect(first).toBe(second);
  });

  it('produces identical output regardless of the input file order, in either language', () => {
    const forward = serializeWireSurfaceDocument(generateWireSurfaceDocument(tsFiles, csharpFiles));
    const reversed = serializeWireSurfaceDocument(
      generateWireSurfaceDocument([...tsFiles].reverse(), [...csharpFiles].reverse()),
    );
    expect(forward).toBe(reversed);
  });

  it('defaults csharpFiles to empty, leaving existing TypeScript-only callers unaffected', () => {
    const withoutCSharp = generateWireSurfaceDocument(tsFiles);
    expect(withoutCSharp.registrations.every((r) => r.language === 'typescript')).toBe(true);
    expect(withoutCSharp.registrations).toHaveLength(2);
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
    expect(excluded).not.toContain('network:registerEvent');
  });

  it('states that C# is now covered and that the C# scan is pattern-based, not AST-based', () => {
    const document = generateWireSurfaceDocument([]);
    expect(document.header.scope).toContain('c-sharp/**');
    expect(document.header.scope.toLowerCase()).toContain('pattern-based');
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
        path: 'src/fixture-liveness.ts',
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

  it('stamps a lazy annotation onto the matching registration', () => {
    const files: VirtualFile[] = [
      {
        path: 'src/fixture-liveness-lazy.ts',
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
    const registrations: StaticRegistration[] = [
      'testMain',
      'testExtensionHost',
      'platform.placeholder',
      'platformScriptureEditor.onWillSwitchProject',
      'platformScriptureEditor.onDidSwitchProject',
      'someOtherLiveRegistration',
    ].map((name) => ({
      category: 'networkObject',
      name,
      file: 'src/fixture.ts',
      registeredVia: 'networkObjectService.set',
      documented: false,
      docsStaticallyResolved: true,
      experimental: false,
      language: 'typescript',
    }));
    expect(findStaleLivenessAnnotations(registrations)).toEqual([]);
  });
});
