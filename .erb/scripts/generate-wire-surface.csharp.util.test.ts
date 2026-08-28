import { describe, expect, it } from 'vitest';
import {
  CSHARP_EXCLUDED_PATTERNS,
  CSHARP_RECOGNIZED_PATTERNS,
  CSharpDynamicRegistration,
  CSharpStaticRegistration,
  scanCSharpFiles,
  VirtualFile,
} from './generate-wire-surface.csharp.util';

function findRegistration(
  registrations: CSharpStaticRegistration[],
  name: string,
): CSharpStaticRegistration | undefined {
  return registrations.find((registration) => registration.name === name);
}

function findDynamic(
  dynamicRegistrations: CSharpDynamicRegistration[],
  expression: string,
): CSharpDynamicRegistration | undefined {
  return dynamicRegistrations.find((registration) => registration.expression === expression);
}

describe('scanCSharpFiles: networkObject shape', () => {
  it('finds a whole-object registration with an object-level Experimental flag, resolved via a same-file const', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureChecklistNetworkObject.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal sealed class FixtureChecklistNetworkObject : NetworkObject
          {
              private const string NetworkObjectName = "platformScripture.fixtureChecklistService";

              public async Task InitializeAsync()
              {
                  await RegisterNetworkObjectAsync(
                      NetworkObjectName,
                      [("buildChecklistData", handler)],
                      new NetworkObjectCreatedDetails { Id = NetworkObjectName },
                      new NetworkObjectDocumentation
                      {
                          Experimental = true,
                          Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                          {
                              ["buildChecklistData"] = Create(
                                  "Build checklist data.",
                                  [Param("request", "req")],
                                  ResultOf("object", "res")
                              ),
                          },
                      }
                  );
              }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(
      findRegistration(registrations, 'platformScripture.fixtureChecklistService'),
    ).toMatchObject({
      category: 'networkObject',
      registeredVia: 'NetworkObject.RegisterNetworkObjectAsync',
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
      language: 'csharp',
    });
  });

  it('resolves the documentation argument even when preceded by an explanatory comment on its own line (the real-world idiom every production network-object registration uses)', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureCommentedNetworkObject.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal sealed class FixtureCommentedNetworkObject : NetworkObject
          {
              private const string NetworkObjectName = "platformScripture.fixtureCommented";

              public async Task InitializeAsync()
              {
                  await RegisterNetworkObjectAsync(
                      NetworkObjectName,
                      functions,
                      new NetworkObjectCreatedDetails { Id = NetworkObjectName },
                      // EXPERIMENTAL: the entire object is experimental. Experimental = true cascades
                      // x-experimental to the object:{name} existence method and every function.
                      new NetworkObjectDocumentation { Experimental = true }
                  );
              }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'platformScripture.fixtureCommented')).toMatchObject({
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
    });
  });

  it('does not mistake a per-method Experimental flag nested in Methods for the object-level flag', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixturePartialNetworkObject.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal sealed class FixturePartialNetworkObject : NetworkObject
          {
              private const string NetworkObjectName = "platformScripture.fixturePartial";

              public async Task InitializeAsync()
              {
                  await RegisterNetworkObjectAsync(
                      NetworkObjectName,
                      functions,
                      new NetworkObjectCreatedDetails { Id = NetworkObjectName },
                      new NetworkObjectDocumentation
                      {
                          Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                          {
                              ["someMethod"] = Create("Some method.", [], ResultOf("object", "res")),
                          },
                      }
                  );
              }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    // Create(...) always sets a NESTED Method.Experimental = true inside Methods["someMethod"], but
    // the outer NetworkObjectDocumentation literal has no top-level Experimental property -- the
    // recorded entry must reflect the object level, not leak the nested one.
    expect(findRegistration(registrations, 'platformScripture.fixturePartial')).toMatchObject({
      documented: true,
      docsStaticallyResolved: true,
      experimental: false,
    });
  });

  it('never mistakes an XML doc comment referencing the method name for a real call, nor its own wrapper declaration for a call', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureManageBooksService.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal sealed class FixtureManageBooksService : NetworkObject
          {
              private const string NetworkObjectName = "platformScripture.fixtureManageBooks";

              /// <summary>
              /// Registers this service with PAPI. See <see cref="RegisterNetworkObjectAsync()"/> for
              /// details, and again <see cref="RegisterNetworkObjectAsync()"/> right here.
              /// </summary>
              public Task RegisterNetworkObjectAsync()
              {
                  return RegisterNetworkObjectAsync(
                      NetworkObjectName,
                      functions,
                      new NetworkObjectCreatedDetails { Id = NetworkObjectName }
                  );
              }
          }
        `,
      },
    ];
    const { registrations, dynamicRegistrations } = scanCSharpFiles(files);
    const fromThisFile = registrations.filter((r) => r.file === files[0].path);
    const dynamicFromThisFile = dynamicRegistrations.filter((r) => r.file === files[0].path);
    expect(fromThisFile).toHaveLength(1);
    expect(dynamicFromThisFile).toHaveLength(0);
    expect(fromThisFile[0]).toMatchObject({ name: 'platformScripture.fixtureManageBooks' });
  });
});

describe('scanCSharpFiles: pdpFactory shape', () => {
  it('always records the PDP factory name under dynamicRegistrations, since it is built from a constructor parameter', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Projects/ProjectDataProviderFactory.cs',
        text: `
          namespace Paranext.DataProvider.Projects;

          internal abstract class ProjectDataProviderFactory : NetworkObject
          {
              private readonly string _pdpfName;

              public async Task InitializeAsync()
              {
                  await StartFactoryAsync();
                  var name = $"platform.{_pdpfName}-pdpf";
                  await RegisterNetworkObjectAsync(
                      name,
                      [("getAvailableProjects", GetAvailableProjects)],
                      new ProjectDataProviderFactoryCreatedDetails { Id = name }
                  );
              }
          }
        `,
      },
    ];
    const { registrations, dynamicRegistrations } = scanCSharpFiles(files);
    expect(registrations).toHaveLength(0);
    expect(findDynamic(dynamicRegistrations, '$"platform.{_pdpfName}-pdpf"')).toMatchObject({
      category: 'pdpFactory',
      registeredVia: 'ProjectDataProviderFactory.InitializeAsync',
      language: 'csharp',
    });
  });
});

describe('scanCSharpFiles: dataProvider shape', () => {
  it('resolves a primary-constructor DataProvider subclass name', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureTimeDataProvider.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal sealed class FixtureTimeDataProvider(PapiClient papiClient)
              : NetworkObjects.DataProvider("fixture-current-time", papiClient)
          {
              protected override Task StartDataProviderAsync() => Task.CompletedTask;
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'fixture-current-time')).toMatchObject({
      category: 'dataProvider',
      registeredVia: 'DataProvider(name, papiClient) constructor',
      documented: false,
      language: 'csharp',
    });
  });

  it('resolves a traditional-form DataProvider subclass name via its : base(...) constructor initializer', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureCheckRunner.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal class FixtureCheckRunner : NetworkObjects.DataProvider
          {
              public FixtureCheckRunner(PapiClient papiClient)
                  : base("fixtureCheckRunner", papiClient, NetworkObjectType.CHECK_RUNNER) { }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'fixtureCheckRunner')).toMatchObject({
      category: 'dataProvider',
      registeredVia: 'DataProvider(name, papiClient) constructor',
    });
  });

  it("records DataProvider.RegisterDataProviderAsync's own call under dynamicRegistrations (DataProviderName is a computed property, never a literal)", () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/NetworkObjects/DataProvider.cs',
        text: `
          namespace Paranext.DataProvider.NetworkObjects;

          internal abstract class DataProvider : NetworkObject
          {
              protected DataProvider(string name, PapiClient papiClient) : base(papiClient)
              {
                  DataProviderName = name + "-data";
              }

              public string DataProviderName { get; }

              public async Task RegisterDataProviderAsync()
              {
                  await RegisterNetworkObjectAsync(
                      DataProviderName,
                      GetFunctions(),
                      GetDataProviderCreatedDetails(),
                      GetNetworkObjectDocumentation()
                  );
              }
          }
        `,
      },
    ];
    const { registrations, dynamicRegistrations } = scanCSharpFiles(files);
    expect(registrations).toHaveLength(0);
    expect(findDynamic(dynamicRegistrations, 'DataProviderName')).toMatchObject({
      category: 'dataProvider',
      registeredVia: 'DataProvider.RegisterDataProviderAsync',
    });
  });

  it("records a GetNetworkObjectDocumentation() override under the overriding class's name, without leaking a nested per-method Experimental flag", () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureProjectDataProvider.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal class FixtureProjectDataProvider : FixtureProjectDataProviderBase
          {
              protected override NetworkObjectDocumentation GetNetworkObjectDocumentation() =>
                  new()
                  {
                      Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                      {
                          ["getFinalVerseNumber"] = ExperimentalMethodDocumentation.Create(
                              "Get the final verse number.",
                              [ExperimentalMethodDocumentation.Param("bookNum", "Book number.", "number")],
                              ExperimentalMethodDocumentation.ResultOf("number", "Final verse number")
                          ),
                      },
                  };
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'FixtureProjectDataProvider')).toMatchObject({
      category: 'dataProvider',
      registeredVia: 'DataProvider.GetNetworkObjectDocumentation override',
      documented: true,
      docsStaticallyResolved: true,
      // The per-method Create(...) call always sets a NESTED Method.Experimental = true, but the
      // outer NetworkObjectDocumentation literal never sets its own top-level Experimental -- this
      // entry's granularity is the object level, matching the networkObject shape's policy.
      experimental: false,
    });
  });
});

describe('scanCSharpFiles: standaloneMethod shape', () => {
  it('finds a documented, experimental standalone request handler using the ExperimentalMethodDocumentation.Create idiom', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureVersificationConversionService.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal class FixtureVersificationConversionService(PapiClient papiClient)
          {
              public async Task InitializeAsync()
              {
                  await PapiClient.RegisterRequestHandlerAsync(
                      "command:platformScripture.fixtureMapVerseRef",
                      MapVerseRefBetweenProjects,
                      null,
                      ExperimentalMethodDocumentation.Create(
                          "Converts a reference.",
                          [],
                          ExperimentalMethodDocumentation.ResultOf("object", "Converted reference")
                      )
                  );
              }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(
      findRegistration(registrations, 'command:platformScripture.fixtureMapVerseRef'),
    ).toMatchObject({
      category: 'standaloneMethod',
      registeredVia: 'PapiClient.RegisterRequestHandlerAsync',
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
    });
  });

  it('records an undocumented standalone request handler as such', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureRegistrationService.cs',
        text: `
          internal class FixtureRegistrationService(PapiClient papiClient)
          {
              public async Task InitializeAsync()
              {
                  await PapiClient.RegisterRequestHandlerAsync(
                      "command:fixture.getSomething",
                      GetSomething
                  );
              }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'command:fixture.getSomething')).toMatchObject({
      documented: false,
      docsStaticallyResolved: true,
      experimental: false,
    });
  });

  it('files a name built from a function call under dynamicRegistrations instead of guessing it', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureProjectSettingsService.cs',
        text: `
          internal static class FixtureProjectSettingsService
          {
              public static bool RegisterValidator(PapiClient papiClient, string key)
              {
                  return papiClient.RegisterRequestHandlerAsync(GetValidatorKey(key), requestHandler);
              }
          }
        `,
      },
    ];
    const { dynamicRegistrations } = scanCSharpFiles(files);
    expect(findDynamic(dynamicRegistrations, 'GetValidatorKey(key)')).toMatchObject({
      category: 'standaloneMethod',
      registeredVia: 'PapiClient.RegisterRequestHandlerAsync',
    });
  });

  it("never records NetworkObject's own internal per-function/per-existence-check fan-out as standalone entries", () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/NetworkObjects/NetworkObject.cs',
        text: `
          namespace Paranext.DataProvider.NetworkObjects;

          internal abstract class NetworkObject
          {
              protected async Task RegisterNetworkObjectAsync(
                  string networkObjectName,
                  List<(string functionName, Delegate function)> functionsToRegister,
                  NetworkObjectCreatedDetails registrationParameters,
                  NetworkObjectDocumentation? documentation = null
              )
              {
                  var objPrefix = $"object:{networkObjectName}";
                  await PapiClient.RegisterRequestHandlerAsync(objPrefix, new Func<bool>(() => true));
                  foreach (var (functionName, function) in functionsToRegister)
                  {
                      var req = $"{objPrefix}.{functionName}";
                      await PapiClient.RegisterRequestHandlerAsync(req, function);
                  }
              }
          }
        `,
      },
    ];
    const { registrations, dynamicRegistrations } = scanCSharpFiles(files);
    const standaloneFromThisFile = [
      ...registrations.filter((r) => r.category === 'standaloneMethod'),
      ...dynamicRegistrations.filter((r) => r.category === 'standaloneMethod'),
    ];
    expect(standaloneFromThisFile).toHaveLength(0);
    // The declaration itself must not be mistaken for a networkObject-shaped call either.
    expect(registrations).toHaveLength(0);
    expect(dynamicRegistrations).toHaveLength(0);
  });
});

describe('scanCSharpFiles: determinism', () => {
  const files: VirtualFile[] = [
    {
      path: 'c-sharp/Fixtures/FixtureZ.cs',
      text: `
        internal class FixtureZ : NetworkObject
        {
            private const string NetworkObjectName = "z.fixture";
            public Task Go() => RegisterNetworkObjectAsync(NetworkObjectName, fns, details);
        }
      `,
    },
    {
      path: 'c-sharp/Fixtures/FixtureA.cs',
      text: `
        internal class FixtureA : NetworkObject
        {
            private const string NetworkObjectName = "a.fixture";
            public Task Go() => RegisterNetworkObjectAsync(NetworkObjectName, fns, details);
        }
      `,
    },
  ];

  it('produces identical results regardless of input file order', () => {
    const forward = scanCSharpFiles(files);
    const reversed = scanCSharpFiles([...files].reverse());
    expect(JSON.stringify(forward)).toBe(JSON.stringify(reversed));
  });

  it('sorts registrations by (category, name)', () => {
    const { registrations } = scanCSharpFiles(files);
    const names = registrations.map((r) => r.name);
    expect(names).toEqual([...names].sort());
  });
});

describe('scanCSharpFiles: header pattern content', () => {
  it('names the C# call patterns this scanner recognises', () => {
    const joined = CSHARP_RECOGNIZED_PATTERNS.join('\n');
    [
      'RegisterNetworkObjectAsync',
      'pdpFactory',
      'DataProvider',
      'RegisterRequestHandlerAsync',
      'ExperimentalMethodDocumentation',
    ].forEach((pattern) => expect(joined).toContain(pattern));
  });

  it('documents the excluded network:registerEvent idiom', () => {
    const joined = CSHARP_EXCLUDED_PATTERNS.join('\n');
    expect(joined).toContain('network:registerEvent');
    expect(joined).toContain('SendReceiveBlockNotifierService');
  });
});
