import { describe, expect, it } from 'vitest';
import {
  compareCodeUnits,
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

  it('does not claim a DataProvider constructor entry resolved the documentation it cannot see', () => {
    // A DataProvider's documentation, when it has any, comes from a GetNetworkObjectDocumentation()
    // override elsewhere in the class — never from the constructor this entry is built from. Saying
    // `docsStaticallyResolved: true` here tells the live check to treat `experimental: false` as
    // ground truth, so a provider that overrides the method with Experimental = true fails the
    // BLOCKING Linux smoke run on correct code. The entry has to say it does not know.
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureDocumentedProvider.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal sealed class FixtureDocumentedProvider(PapiClient papiClient)
              : NetworkObjects.DataProvider("fixture-documented", papiClient)
          {
              protected override NetworkObjectDocumentation GetNetworkObjectDocumentation() =>
                  new() { Experimental = true };
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'fixture-documented')).toMatchObject({
      category: 'dataProvider',
      docsStaticallyResolved: false,
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

  it('documents the network:registerEvent idiom as recognized, not excluded', () => {
    const recognized = CSHARP_RECOGNIZED_PATTERNS.join('\n');
    expect(recognized).toContain('network:registerEvent');
    expect(recognized).toContain('SendRequestAsync');
    expect(CSHARP_EXCLUDED_PATTERNS.join('\n')).not.toContain('network:registerEvent');
  });
});

describe('scanCSharpFiles: networkEvent shape', () => {
  it('recognizes PapiClient.SendRequestAsync<T>("network:registerEvent", [name, docs]) and resolves a nested Notification.Experimental flag through a same-file field reference', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureEventNotifierService.cs',
        text: `
          namespace Paranext.DataProvider.Fixtures;

          internal class FixtureEventNotifierService(PapiClient papiClient)
          {
              private const string BlockStateChangedEvent = "fixture.onSomethingChanged";
              private const string RegisterEventMethod = "network:registerEvent";

              private static readonly OpenRpcSingleNotificationDocumentation s_docs =
                  new()
                  {
                      Notification = new()
                      {
                          Experimental = true,
                          Summary = "Fixture event.",
                      },
                  };

              public async Task InitializeAsync()
              {
                  bool accepted = await PapiClient.SendRequestAsync<bool>(
                      RegisterEventMethod,
                      [BlockStateChangedEvent, s_docs]
                  );
              }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'fixture.onSomethingChanged')).toMatchObject({
      category: 'networkEvent',
      registeredVia: 'PapiClient.SendRequestAsync("network:registerEvent")',
      documented: true,
      docsStaticallyResolved: true,
      experimental: true,
      language: 'csharp',
    });
  });

  it('recognizes the non-generic SendRequestAsync overload with an inline literal event name and no documentation', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureEventNotifierServiceNoDocs.cs',
        text: `
          internal class FixtureEventNotifierServiceNoDocs(PapiClient papiClient)
          {
              public async Task InitializeAsync()
              {
                  await PapiClient.SendRequestAsync(
                      "network:registerEvent",
                      ["fixture.onOtherThingChanged"]
                  );
              }
          }
        `,
      },
    ];
    const { registrations } = scanCSharpFiles(files);
    expect(findRegistration(registrations, 'fixture.onOtherThingChanged')).toMatchObject({
      category: 'networkEvent',
      documented: false,
      docsStaticallyResolved: true,
      experimental: false,
    });
  });

  it('does not mistake a SendRequestAsync call addressed to a different method for a network event registration', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureUnrelatedSendRequest.cs',
        text: `
          internal class FixtureUnrelatedSendRequest(PapiClient papiClient)
          {
              private const string ServiceGet = "service:get";

              public Task<string?> GetAsync(string key) =>
                  papiClient.SendRequestAsync<string?>(ServiceGet, [key]);
          }
        `,
      },
    ];
    const { registrations, dynamicRegistrations } = scanCSharpFiles(files);
    expect(registrations.filter((r) => r.category === 'networkEvent')).toHaveLength(0);
    expect(dynamicRegistrations.filter((r) => r.category === 'networkEvent')).toHaveLength(0);
  });

  it('files the event name under dynamicRegistrations when the array literal name does not resolve to a literal', () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/Fixtures/FixtureDynamicEventName.cs',
        text: `
          internal class FixtureDynamicEventName(PapiClient papiClient)
          {
              public Task InitializeAsync(string suffix) =>
                  papiClient.SendRequestAsync<bool>(
                      "network:registerEvent",
                      [$"fixture.on{suffix}Changed", null]
                  );
          }
        `,
      },
    ];
    const { dynamicRegistrations } = scanCSharpFiles(files);
    expect(findDynamic(dynamicRegistrations, '$"fixture.on{suffix}Changed"')).toMatchObject({
      category: 'networkEvent',
      registeredVia: 'PapiClient.SendRequestAsync("network:registerEvent")',
    });
  });

  it("never mistakes SendRequestAsync's own generic and non-generic declarations for calls", () => {
    const files: VirtualFile[] = [
      {
        path: 'c-sharp/PapiClient.cs',
        text: `
          namespace Paranext.DataProvider;

          public class PapiClient
          {
              public virtual async Task<T?> SendRequestAsync<T>(
                  string requestType,
                  IReadOnlyList<object?>? requestContents = null
              )
              {
                  return default;
              }

              public virtual async Task SendRequestAsync(
                  string requestType,
                  IReadOnlyList<object?>? requestContents = null
              )
              {
                  await Task.CompletedTask;
              }
          }
        `,
      },
    ];
    const { registrations, dynamicRegistrations } = scanCSharpFiles(files);
    expect(registrations).toHaveLength(0);
    expect(dynamicRegistrations).toHaveLength(0);
  });
});

describe('compareCodeUnits', () => {
  it('orders by code unit, which is where it differs from the host locale', () => {
    // A typical locale collates 'a' before 'B'; by code unit 'B' (66) precedes 'a' (97). Only the
    // code-unit answer is asserted — asserting what `localeCompare` returns would put a
    // host-dependent expectation inside the test that exists to keep host dependence out, and the
    // unit suite runs unguarded on all three platforms. Pinning the code-unit answer is what makes
    // this comparator locale-independent:
    // the generated snapshot is regenerated on three platforms and compared byte for byte, so an
    // ordering that consults the host's locale or ICU build makes the build fail on whichever
    // platform disagrees.
    expect(compareCodeUnits('a', 'B')).toBeGreaterThan(0);
    expect(compareCodeUnits('B', 'a')).toBeLessThan(0);
    expect(compareCodeUnits('a', 'a')).toBe(0);
  });
});
