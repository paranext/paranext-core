---
title: paranext-core Implementation Patterns
description: Established C#/TypeScript patterns, naming conventions, file organization, and test infrastructure.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
toc: true
---

# paranext-core Implementation Patterns

This document describes the established patterns in the paranext-core codebase.

---

<!-- TOC:BEGIN -->
<!-- | Line | Section | -->
<!-- | --- | --- | -->
<!-- | 27 | C# Patterns | -->
<!-- | 238 | Advanced C# Patterns | -->
<!-- | 840 | TypeScript Patterns | -->
<!-- | 984 | Naming Conventions Summary | -->
<!-- | 999 | Key Files Reference | -->
<!-- | 1019 | Version Log | -->
<!-- TOC:END -->

## C# Patterns

### Namespaces

- **Root namespace:** `Paranext.DataProvider`
- **By directory:** `Paranext.DataProvider.{Directory}`

The namespace of classes in each file should always match the directory where the file resides.

### Directory Structure

```
c-sharp/
├── Projects/              # Project data providers and factories
├── Services/              # Static service classes
├── Checks/                # Inventory and check management
├── JsonUtils/             # JSON serialization utilities
├── NetworkObjects/        # DataProvider/NetworkObject base classes
├── ParatextUtils/         # Paratext integration utilities
├── Users/                 # User management
├── Program.cs             # Entry point
└── PapiClient.cs          # Core PAPI communication client
```

The goal is to aggregate related classes into the same directory, providing a logical taxonomy of capabilities.

### Service Patterns

#### Outgoing Calls (C# → PAPI Network)

##### 1. Static Service Wrappers

Use for making one-time PAPI calls from C# to services hosted elsewhere on the network.

**Location:** `c-sharp/Services/`

**Pattern:**
```csharp
public static class MyService
{
    public static T MethodName(PapiClient client, params...)
    {
        return ThreadingUtils.GetTaskResult(
            client.SendRequestAsync<T>(requestType, [params]),
            $"MyService.MethodName",
            ThreadingUtils.DefaultTimeout
        );
    }

    public static void DoSomething(params...)
    {
        if (!ThreadingUtils.RunTask(
            DoSomethingAsync([params]),
            $"MyService.DoSomething",
            ThreadingUtils.DefaultTimeout))
        {
            throw new Exception("DoSomething failed to complete in a timely fashion");
        }
    }
}
```

Note: Services use synchronous wrappers via `ThreadingUtils.GetTaskResult()` to bridge async PAPI calls.

**Examples:**
- `AppService.GetAppInfo(client)` - Retrieves app metadata
- `SettingsService.GetSetting<T>(client, key)` - Gets settings
- `SettingsService.SetSetting(client, key, value)` - Sets settings

**When to use:**
- C# code needs to call a service hosted elsewhere on the PAPI network
- Examples: getting settings, app info, localized strings

#### Incoming Calls (PAPI Network → C#)

##### 2. Individual Commands

**Location:** `c-sharp/{Directory Containing Related Functionality}/`

**Pattern:**
```csharp
public class MyService
{
    public void DoSomething(params...)
    {
        ...
    }

    public void DoSomethingElse(params...)
    {
        ...
    }

    public async Task InitializeAsync(PapiClient client)
    {
        await client.RegisterRequestHandlerAsync(
            "command:{extensionName}.doSomething",
            DoSomething);

        await client.RegisterRequestHandlerAsync(
            "command:{extensionName}.doSomethingElse",
            DoSomethingElse);
    }
}
```

Note: `InitializeAsync()` must be called in `Program.cs` to make commands available to PAPI clients.

**Examples:**
- `ProjectSettingService.RegisterValidator(client, key, callback)` - Registers callback on PAPI network for project setting

**When to use:**
- One-time operations (create, validate, etc.)
- Operations that don't need to notify subscribers
- Not many operations required to provide a service

**When not to use:**
- More than 5 related commands are needed to provide a service (use NetworkObject when >5)

##### 3. DataProvider Classes (Stateful, Subscribable Data)

Use for data that needs to be subscribed to or updated over time.

**Location:** `c-sharp/{Directory Containing Related Functionality}/`

**Inheritance:**
```
NetworkObject (base)
  └── DataProvider (abstract)
        ├── ProjectDataProvider (abstract)
        │   └── ParatextProjectDataProvider
        ├── InventoryDataProvider
        └── TimeDataProvider (sample code, not used in production)
```

**Key methods:**
- `RegisterDataProviderAsync()` - Registers on PAPI network
- `GetFunctions()` - Returns callable functions as `(string name, Delegate func)[]`
- `SendDataUpdateEvent()` - Notifies network of data changes
- `StartDataProviderAsync()` - Starts the provider after registration

**When to use:**
- Data that changes over time
- Data that multiple consumers need to subscribe to
- Project-specific data providers

Note: `RegisterDataProviderAsync()` must be called in `Program.cs` to be available to PAPI clients.

##### 4. NetworkObject Classes (Many Operations and Non-Subscribable Data)

Use to aggregate closely related commands into a single class when no subscription is needed.

**Location:** `c-sharp/{Directory Containing Related Functionality}/`

**Inheritance:**
```
NetworkObject (base)
  └── SomeNetworkObject (example name, not real network object)
```

**Key methods:**
- `RegisterNetworkObjectAsync()` - Registers on PAPI network

**When to use:**
- More than 5 related commands are needed to provide a service (use individual commands when <=5)
- No subscription needed

Note: `RegisterNetworkObjectAsync()` must be called in `Program.cs` to be available to PAPI clients.

### Test Infrastructure

- **Framework:** NUnit 4.0.1
- **Test SDK:** Microsoft.NET.Test.Sdk v17.9.0
- **Location:** `c-sharp-tests/{FeatureArea}/`

**Base Classes:**
- `PapiTestBase` - For tests needing PAPI client simulation
  - Provides `CreateDummyProject()`, `CreateProjectDetails()`
  - Provides `VerifyUsfmSame()`, `VerifyUsxSame()` for text comparison

**Mock/Dummy Objects:**
- `DummyScrText` - In-memory Paratext ScrText (complete file manager with in-memory storage)
- `DummyPapiClient` - Simulates PAPI client, tracks sent events
- `DummyLocalParatextProjects` - Allows fake project addition
- `DummyParatextProjectDataProvider` - In-memory file storage

**Fixture Setup Pattern:**
```csharp
[SetUpFixture]
public class FixtureSetup
{
    [OneTimeSetUp]
    public void RunBeforeAnyTests() => ParatextGlobals.Initialize(testFolder);

    [OneTimeTearDown]
    public void RunAfterAnyTests() => Directory.Delete(testFolder, true);
}
```

**Test Parameterization:**
```csharp
[TestCase(1, 1, 0, @"\id GEN \ip intro \c 1 ")]
[TestCase(1, 2, 1, @"\v 1 verse one ")]
public void TestMethod(int bookNum, int chapterNum, int verseNum, string expected)
{
    // Test implementation
}
```

---

## Advanced C# Patterns

These patterns cover cross-cutting concerns that implementers need to understand when building features in the C# backend.

### Exception Handling

Custom exception types with structured data for domain-specific errors.

**Pattern:**
```csharp
// Custom exception with structured properties
public class MissingBookException(int bookNum, string projectId)
    : Exception($"Book number {bookNum} not found in project {projectId}.")
{
    public int BookNum { get; } = bookNum;
    public string ProjectId { get; } = projectId;
}
```

**When to create custom exceptions:**
- Domain-specific errors that need structured metadata
- Errors that cross process boundaries (will be serialized)
- Errors that callers need to handle differently

**Existing exceptions:**
- `MissingBookException` - Book not found in project
- `PermissionsException` - User lacks required permissions

**Location:** `c-sharp/` (root level for shared exceptions)

### Logging

Uses Console for output to be logged. Do **NOT** use System.Diagnostics.Trace.

**Pattern:**
```csharp
Console.WriteLine($"Processing feature: {featureName}");
```

**Anti-Pattern:**
```csharp
System.Diagnostics.Trace.WriteLine($"Processing feature: {featureName}");
```

### JSON Serialization Converters

Custom converters for types that don't serialize naturally.

**Pattern:**
```csharp
public class MyTypeConverter : JsonConverter<MyType>
{
    public override MyType? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        // Parse JSON and return object
    }

    public override void Write(Utf8JsonWriter writer, MyType value, JsonSerializerOptions options)
    {
        // Write object as JSON
    }
}
```

**Registering converters:**
```csharp
// In SerializationOptions.cs
public static JsonSerializerOptions CreateSerializationOptions()
{
    var options = new JsonSerializerOptions
    {
        Encoder = JavaScriptEncoder.Create(UnicodeRanges.All),
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = false,
    };
    options.Converters.Add(new MyTypeConverter());
    return options;
}
```

**Existing converters:**
- `VerseRefConverter` - Paratext verse references
- `CommentConverter` - Project comments
- `InventoryOptionValueConverter` - Inventory option values
- `InternetSettingsMementoConverter` - Internet settings

**Location:** `c-sharp/JsonUtils/`

### Multi-threaded/Concurrent Code

#### Bridging sync/async code

Use ThreadingUtils to bridge between sync/async code

```csharp
// Synchronous wrapper for async call
protected void DoSomething(T parameter1, string description = "function call description")
{
    ThreadingUtils.RunTask(DoSomethingAsync(parameter1), description, ThreadingUtils.DefaultTimeout);
}
```

**Location:** `c-sharp/ThreadingUtils.cs`

#### Handling incoming PAPI calls

Assume registered methods will be called concurrently. If some methods are not thread safe, lock all registered methods for the network object or data provider to achieve thread safety.

```csharp
internal sealed class MyDataProvider : NetworkObjects.DataProvider
{
    private readonly Dictionary<string, MyData> _dataByKey = new();
    private readonly object _lock = new();

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return [("getSomething", GetSomething), ("setSomething", SetSomething)];
    }

    protected MyData GetSomething(string scope)
    {
        if (string.IsNullOrEmpty(scope)) return null;
        lock (_lock)
        {
            return _dataByKey[scope];
        }
    }

    protected bool SetSomething(string scope, MyData data)
    {
        if (string.IsNullOrEmpty(scope)) return false;
        lock (_lock)
        {
            _dataByKey[scope] = data;
        }
        SendDataUpdateEvent("MyDataType", "MyDataProvider updated Something");
        return true;
    }
}
```

#### Concurrent collections

Use to achieve thread safety without locking for simple key-value access

```csharp
private readonly ConcurrentDictionary<string, Worker> _workersByJobId = new();

// Thread-safe add
_workersByJobId.TryAdd(jobId, worker);

// Thread-safe get or add
var worker = _workersByJobId.GetOrAdd(jobId, _ => new Worker());

// Thread-safe remove
_workersByJobId.TryRemove(jobId, out _);
```

#### Interlocked

Use to achieve thread safety without locking for atomic counter/flag operations

```csharp
Interlocked.Add(ref _totalCount, itemList.Count);
```

#### Atomicity

If concurrent calls require more than a single operation to update shared state, then you **must** lock to achieve atomicity.

```csharp
private readonly ConcurrentDictionary<string, string> _dictionary1 = new();
private readonly ConcurrentDictionary<string, string> _dictionary2 = new();
private readonly object _lock = new();

// ❌ Incorrect - multiple operations required to access shared state without locking
public void NotThreadSafe(string key1, string key2, string value)
{
    _dictionary1.TryAdd(key1, value);
    _dictionary2.TryAdd(key2, value);
}

// ✅ Correct - Locking when multiple operations required to access shared state
public void ThreadSafe(string key1, string key2, string value)
{
    lock (_lock)
    {
        _dictionary1.TryAdd(key1, value);
        _dictionary2.TryAdd(key2, value);
    }
}

// ✅ Correct - No locking required because atomic operation used to access shared state
public void ThreadSafe(string key1, string value)
{
    _dictionary1.TryAdd(key1, value);
}
```

### PAPI Event/Request Registration

Low-level patterns for registering handlers on the PAPI network.

**Registering request handlers:**
```csharp
await PapiClient.RegisterRequestHandlerAsync(
    $"object:{networkObjectName}.{functionName}",
    functionDelegate,
    optionalTimeout
);
```

**Registering event handlers:**
```csharp
papiClient.RegisterEventHandler(
    "platform.settingsServiceUpdate",
    (JsonElement eventParams) =>
    {
        // Handle the event
    }
);
```

**Sending events:**
```csharp
await PapiClient.SendEventAsync(
    "platform.dataProviderUpdate",
    new { dataScope = scopeValue }
);
```

**Location:** `c-sharp/PapiClient.cs`

### Settings and Configuration Access

**Services:**
- `SettingsService` - Platform settings
- `SharedStoreService` / `SharedStore` - Cross-process shared data
- `ProjectSettingsService` - Project settings validation
- `LocalizationService` - Localized strings

**Location:** `c-sharp/Services/`

#### Platform Settings (via PAPI)

```csharp
// Get setting (synchronous wrapper)
public static T? GetSetting<T>(PapiClient papiClient, string key)
{
    return ThreadingUtils.GetTaskResult(
        papiClient.SendRequestAsync<T?>("platform.settingsServiceGet", [key]),
        $"SettingsService.GetSetting for {key}",
        ThreadingUtils.DefaultTimeout
    );
}

// Set setting
public static void SetSetting(PapiClient papiClient, string key, object value)
{
    ThreadingUtils.GetTaskResult(
        papiClient.SendRequestAsync<bool>("platform.settingsServiceSet", [key, value]),
        $"SettingsService.SetSetting for {key}",
        ThreadingUtils.DefaultTimeout
    );
}
```

**Location:** `c-sharp/Services/SettingsService.cs`

#### Cross-Process Shared Data (Distributed Store with Lamport Clock)

For settings that must reside in multiple processes for performance reasons (only one writer allowed)

```csharp
// Initialize shared store
await SharedStoreService.InitializeAsync(papiClient);
papiClient.SetSharedStore(SharedStoreService.GetSharedStore());

// Access shared values
var store = SharedStoreService.GetSharedStore();
var value = store.Get<T>(key);
store.Set(key, newValue);
```

**Location:** `c-sharp/Services/SharedStore.cs`

#### Validating Project Settings

```csharp
public static bool IsValid(
    PapiClient papiClient,
    object? newValue,
    object? currentValue,
    string key,
    object? allChanges)
{
    // Validate project-specific setting change
}
```

**Location:** `c-sharp/Services/ProjectSettingsService.cs`

#### Loading Localized Strings

```csharp
DoSomething(
    arg1,
    LocalizationService.GetLocalizedString(
        PapiClient,
        "%localization_key_for_error_message%",
        $"Default value for error message"
    )
);
```

**Location:** `c-sharp/Services/LocalizationService.cs`

### NetworkTimeout Attribute

Attribute-based timeout configuration for network methods. If the method does not return within the timeout, a JSON-RPC error will be returned over JSON-RPC.

**Pattern:**
```csharp
[NetworkTimeout(15000)]  // 15 second timeout
public object? GetData(string selector)
{
    // Implementation
}
```

**Location:** `c-sharp/NetworkTimeoutAttribute.cs`

### Visibility and Access Modifiers

Standard visibility patterns for different component types.

| Component Type | Visibility | Reason |
|----------------|------------|--------|
| Static services | `internal static class` | Only used within C# backend |
| DataProviders | `internal sealed class` | Single implementation, not inherited |
| Workers | `internal sealed class` | Implementation detail |
| Exceptions | `public class` | May cross process boundaries |
| Result records | `public record` | Returned via PAPI |
| Options records | `public record` | Passed via PAPI |

**Pattern:**
```csharp
// Internal service - not exposed outside C# process
internal static class FeatureService { }

// Internal sealed DataProvider
internal sealed class FeatureDataProvider : DataProvider { }

// Public exception for serialization
public class FeatureException : Exception { }

// Public records for PAPI communication
public record FeatureResult { }
public record FeatureOptions { }
```

### File Organization Patterns

**Principle**: One file per type. Do not combine multiple types into a single file except for one case: a record type is used by another record type exclusively. Then the exclusive record types should be in the same file with the shared record type.

```csharp
// ✅ Correct - One class in a file
internal sealed class FeatureService
{
}
```

```csharp
// ✅ Correct - Exclusively used records share file with primary record
public record FeatureRecord
{
    public string Data { get; set; }
    public FeatureRecordAttribute Attribute { get; set; }
}

public record FeatureRecordAttribute
{
}
```

```csharp
// ❌ Incorrect - two or more shared types in a file
public enum Enum1
{
}

public enum Enum2
{
}

public enum Enum3
{
}
```

**File-scoped namespaces**: Always use `namespace X;` (no braces), not `namespace X { }`

```csharp
// ✅ Correct - file-scoped namespace
namespace Paranext.DataProvider.Feature;

public record MyRecord { }

// ❌ Incorrect - block-style namespace
namespace Paranext.DataProvider.Feature
{
    public record MyRecord { }
}
```

### Initialization Order

Critical initialization sequence in Program.cs.

**Pattern:**
```csharp
// 1. Initialize infrastructure first
await SharedStoreService.InitializeAsync(papi);
papi.SetSharedStore(SharedStoreService.GetSharedStore());
SettingsService.Initialize(papi);

// 2. Create providers and factories
var factory = new ParatextProjectDataProviderFactory(papi);
var inventoryProvider = new InventoryDataProvider(papi);
var checkRunner = new CheckRunner(papi);

// 3. Register in parallel where possible
await Task.WhenAll(
    factory.InitializeAsync(),
    inventoryProvider.RegisterDataProviderAsync(),
    checkRunner.RegisterDataProviderAsync()
);

// 4. Start providers after registration
await Task.WhenAll(
    factory.StartAsync(),
    inventoryProvider.StartDataProviderAsync()
);
```

**Key ordering rules:**
1. SharedStore must initialize before PapiClient uses it
2. Settings service must initialize before providers that need settings
3. Registration before StartDataProviderAsync
4. Use `Task.WhenAll` for independent parallel operations

**Location:** `c-sharp/Program.cs`

---

## TypeScript Patterns

### Command Naming

- **Pattern:** `'{extensionName}.{commandName}'`
- **Convention:** Lowercase extension name, camelCase command name

**Examples:**
- `'platformScripture.openCharactersInventory'`
- `'platformScripture.openFind'`
- `'helloRock3.helloRock3'`
- `'helloSomeone.helloSomeone'`

### Command Registration

```typescript
const commandPromise = papi.commands.registerCommand(
  'extensionName.commandName',
  asyncFunctionHandler,
  {
    method: {
      summary: 'Command description',
      params: [
        {
          name: 'paramName',
          required: false,
          summary: 'Parameter description',
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        summary: 'Return value description',
        schema: { type: 'string' },
      },
    },
  },
);

context.registrations.add(await commandPromise);
```

### Type Declarations

**Location:** `extensions/src/{extension}/src/types/{extension}.d.ts`

**Pattern:**
```typescript
declare module '{extension-name}' {
  // Import shared types
  import type { DataProviderDataType, IDataProvider } from '@papi/core';

  // Define data types
  export type MyDataTypes = {
    DataTypeName: DataProviderDataType<Selector, ReturnType, SetType>;
  };

  // Define provider interface
  export type IMyProvider = IDataProvider<MyDataTypes> & {
    methodName(param: Type): Promise<Result>;
  };
}

declare module 'papi-shared-types' {
  // Extend global interfaces
  export interface CommandHandlers {
    'extensionName.commandName': (param: Type) => Promise<Result>;
  }

  export interface DataProviders {
    'extensionName.dataName': IMyProvider;
  }

  export interface SettingTypes {
    'extensionName.settingName': SettingType;
  }
}
```

### Extension Structure

```
extensions/src/{extension}/
├── src/
│   ├── main.ts                    # Entry point with activate/deactivate
│   ├── types/
│   │   └── {extension}.d.ts       # Type declarations
│   ├── web-views/
│   │   ├── *.web-view.tsx         # React web view components
│   │   └── *.web-view.scss        # Web view styles
│   ├── models/
│   │   └── *-provider-engine.model.ts  # Data provider implementations
│   └── services/
│       └── *.service.ts           # Business logic services
├── contributions/                  # JSON contribution files
├── assets/                        # Icons and static assets
├── manifest.json                  # Extension metadata
└── package.json                   # npm package metadata
```

### Extension Activate Function

```typescript
export async function activate(context: ExecutionActivationContext): Promise<void> {
  // Register commands, validators, web views, data providers, etc.

  // All registrations must be added to context.registrations:
  context.registrations.add(
    await commandPromise,
    await webViewProviderPromise,
    // ... all other registrations
  );
}

// Optional - only implement if cleanup is needed
export async function deactivate(): Promise<boolean> {
  return true;
}
```

### DataProviderDataType Format

```typescript
DataProviderDataType<Selector, ReturnType, SetType>
```

- **Selector:** Type of the get/subscribe selector (use `undefined` if no selector)
- **ReturnType:** What `get` returns (can include `undefined` for missing data)
- **SetType:** What `set` accepts (`never` if read-only)

**Examples:**
```typescript
// Read-write with number selector
RandomNumber: DataProviderDataType<number, number, number>;

// Read-only with no selector
Names: DataProviderDataType<undefined, string[], never>;

// Scripture data
BookUSFM: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
```

---

## Naming Conventions Summary

| Category | Pattern | Example |
|----------|---------|---------|
| C# Namespace | `Paranext.DataProvider.{Area}` | `Paranext.DataProvider.Projects` |
| C# Service | `{Name}Service` | `AppService`, `SettingsService` |
| C# DataProvider | `{Name}DataProvider` | `ParatextProjectDataProvider` |
| TS Command | `'{extensionName}.{commandName}'` | `'platformScripture.openFind'` |
| TS Setting | `'{extensionName}.{settingName}'` | `'helloRock3.personName'` |
| TS DataProvider | `'{extensionName}.{dataName}'` | `'helloSomeone.people'` |
| TS WebView | `'{extensionName}.{viewName}'` | `'helloRock3.projectWebView'` |
| Test File | `{Feature}Tests.cs` | `ProjectServiceTests.cs` |

---

## Key Files Reference

### C# Entry Points
- `c-sharp/Program.cs` - Application entry point
- `c-sharp/PapiClient.cs` - Core PAPI communication

### Base Classes
- `c-sharp/NetworkObjects/DataProvider.cs` - Abstract data provider base
- `c-sharp/NetworkObjects/NetworkObject.cs` - Abstract network object base
- `c-sharp/Projects/ProjectDataProvider.cs` - Abstract project data provider

### Test Base
- `c-sharp-tests/PapiTestBase.cs` - Base class for integration tests
- `c-sharp-tests/DummyScrText.cs` - In-memory ScrText mock
- `c-sharp-tests/Projects/FixtureSetup.cs` - Global test fixture

### TypeScript Core
- `src/declarations/papi-shared-types.ts` - Global type extensions
- `extensions/src/platform-scripture/src/main.ts` - Example extension

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
