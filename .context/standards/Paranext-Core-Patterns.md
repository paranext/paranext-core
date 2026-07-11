---
title: paranext-core Implementation Patterns
description: Established C#/TypeScript patterns, naming conventions, file organization, and test infrastructure.
---

# paranext-core Implementation Patterns

This document describes the established patterns in the paranext-core codebase — the conventions a new contributor should follow when adding C# services, data providers, TypeScript commands, or extensions.

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

### Library Choices

Terse decisions for the C# backend. Each lists the chosen approach, what to avoid, and why.

- **JSON serialization:** System.Text.Json.
  - Avoid: Newtonsoft (Json.NET).
  - Why: modern, built-in, faster. STJ is the established convention (54 files use it; a single legacy Newtonsoft usage survives in `EnhancedResources/PartOfSpeechTranslator.cs`).
- **Dependency injection:** manual constructor wiring.
  - Avoid: any DI container (Microsoft.Extensions.DependencyInjection, Autofac, etc.).
  - Why: explicit, simpler to debug; the object graph is small and assembled in `Program.cs`.
- **Custom exceptions:** structured exception classes with typed properties (e.g. `MissingBookException` carries `BookNum` / `ProjectId`; `PermissionsException` carries `ProjectId` / `SafetyCheckMessage`), declared `public` so they serialize across the process boundary.
  - Avoid: bare `Exception` with only a message string when the caller needs structured metadata.
  - Why: the structured properties survive serialization and let callers handle errors by data rather than by parsing the message. (See **Exception Handling** below for the full pattern. Note: to attach a machine-readable *code* across the PAPI wire, do not throw a custom type — use `PlatformErrorCodes.WithCode`; see **PlatformError Codes**.)
- **Custom JSON converters:** a custom `JsonConverter<T>` registered in `SerializationOptions.CreateSerializationOptions()` (`c-sharp/JsonUtils/`).
  - When: you don't own the type (e.g. `SIL.Scripture.VerseRef`), or the wire shape diverges from the C# shape (e.g. `VerseRefConverter` accepts both `book` and `bookNum` input forms).
  - Avoid: hand-rolled per-call-site parsing, or registering the converter ad hoc instead of centrally in `CreateSerializationOptions()`.
  - Why: centralized registration and consistent camelCase conversion; the converter is the escape hatch when attributes can't express the mapping. (See **JSON Serialization Converters** below.)
- **Polymorphic serialization:** `[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]` + `[JsonDerivedType(typeof(Subtype), "discriminator")]` on the abstract base record.
  - When: you define the discriminated-union hierarchy in this repository AND it has a simple tagged-union wire shape (one discriminator property naming the subtype).
  - Avoid: attribute-based polymorphism for types you don't own or that need multiple input shapes / wire transformations beyond a single discriminator — fall back to a custom `JsonConverter<T>` there.
  - Why: declarative, co-located with the type hierarchy, zero runtime registration, compile-time-validated subtype list. Example: `c-sharp/Checklists/ChecklistContentItem.cs` (the `TextItem` / `VerseItem` / `EditLinkItem` / `LinkItem` / `ErrorItem` / `MessageItem` union).
- **D-Bus client (Linux-only IPC):** `Tmds.DBus.Protocol`.
  - When: low-level Linux D-Bus IPC (e.g. IBus input-method-framework integration).
  - Avoid: `Tmds.DBus` (the legacy higher-level package — in maintenance mode), and `dbus-sharp` (unmaintained).
  - Why: the actively maintained low-level library (.NET 8/9 + AOT-compatible) where new D-Bus features land. (No D-Bus code is present in `main` today; this records the decision for when such IPC is added.)

### Logic Placement

Put business logic that needs direct `ParatextData` access in the C# process (`c-sharp/`).

- Avoid: implementing such logic in TypeScript — the renderer/extension-host processes cannot reach `ParatextData.dll`, so anything depending on it must live in C#.
- Why: C# has direct `ParatextData.dll` access and is the same language the logic was originally written in, keeping the port faithful. Expose the result to TS over PAPI (NetworkObject / DataProvider) rather than reimplementing the logic across the wire.

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
- Loose, unrelated handlers that don't belong to a named service (no cohesive service identity)
- Ad-hoc utilities or cross-cutting helpers registered once in `Program.cs`

**When not to use:**
- Handlers belong to a cohesive named service — use NetworkObject, regardless of method count
- Data needs subscription semantics — use DataProvider

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
- `GetFunctions()` - Returns callable functions as `List<(string functionName, Delegate function)>`
- `SendDataUpdateEvent()` - Notifies network of data changes
- `StartDataProviderAsync()` - Starts the provider after registration

**When to use:**
- Stateful data whose consumers need to observe changes over time (the `get` / `set` / `subscribe` triplet over named data types)
- Project-specific data providers

**When not to use:**
- Pure stateless query/command services with no subscription semantics — use NetworkObject. DataProvider machinery (`DataProviderUpdateInstructions`, `SendDataUpdateEvent`, selector-parameter convention, `IDataProvider<TDataTypes>`) is unnecessary overhead when there is no subscribable data.

Note: `RegisterDataProviderAsync()` must be called in `Program.cs` to be available to PAPI clients.

##### 4. NetworkObject Classes (Cohesive Named Service, Non-Subscribable)

Use to expose a stateless query/command service as a named, typed network object consumed via `papi.networkObjects.get<IService>(name)`. Any method count — the criterion is semantics, not size.

**Location:** `c-sharp/{Directory Containing Related Functionality}/`

**Inheritance:**
```
NetworkObject (base)
  └── SomeNetworkObject (example name, not real network object)
```

**Key methods:**
- `RegisterNetworkObjectAsync()` - Registers on PAPI network
- `GetFunctions()` - Returns callable functions as `List<(string functionName, Delegate function)>`

**When to use:**
- Stateless query/command functions grouped as a named service with a cohesive identity (e.g. `platformScripture.checklistService`)
- No subscription semantics (no `get`/`set`/`subscribe` over named data types)
- Any method count — even a 3-method service belongs here if it represents a named service

**When not to use:**
- Stateful subscribable data — use DataProvider
- Ad-hoc handlers with no service identity — use individual commands

Note: `RegisterNetworkObjectAsync()` must be called in `Program.cs` to be available to PAPI clients. See the **When to use** / **When not to use** notes on each pattern above for choosing between DataProvider, NetworkObject, and individual commands.

#### Adding a Method to an Existing Project Data Provider

When you want to expose new data from an existing `ProjectDataProvider` (e.g. `ParatextProjectDataProvider`) — not create a new provider — the plumbing spans both C# and TypeScript. Follow all 6 steps; skipping any one of them silently breaks the method.

**Illustrative example.** The snippets below use a hypothetical `BookSummary` data type (per-book summary text) so the recipe is unambiguous. The names are invented; the structure is what every contract method must follow.

> **Naming rule (read first).** `get`, `set`, and `subscribe` are **magic prefixes** for the TS data provider service. Use them only for methods that are part of the data provider's interface/contract. The contract is split across the two languages:
>
> - `Get*` and `Set*` are implemented in **C#**. `Set*` must call `SendDataUpdateEvent` for each affected data type whenever the data changes — that is how subscribers get notified.
> - `subscribe*` exists only on the **TS** side and is **auto-generated** by the TS data provider service from the events emitted by `Set*`. You declare `subscribe*` in the `.d.ts` so TS callers can reference it; you do not write a body for it in either C# or TS.
> - Each data type needs its own paired `Set*` (C#) and `subscribe*` (TS `.d.ts`) to go with its `Get*`. They cannot be shared across multiple `Get*` methods.
>
> If you only need a helper method on the provider that is **not** part of the contract, the method MUST NOT start with `get`/`set`/`subscribe` — those prefixes opt the method into the contract. Use any other appropriate verb (e.g. `lookup*`, `compute*`, `list*`). The recipe below assumes you are adding a contract method.

1. **C# methods.** Add `public` `Get*` and `Set*` methods on the provider class (e.g. `ParatextProjectDataProvider.cs`). Keep each focused — one method per conceptual operation. The `Get*` reads from the underlying source; the `Set*` writes and then calls `SendDataUpdateEvent` for the affected data type so subscribers get notified:
   ```csharp
   public string? GetBookSummary(int bookNum)
   {
       var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
       // ... read the per-book summary from your storage of choice ...
       return summary;
   }

   public bool SetBookSummary(int bookNum, string summary)
   {
       var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
       // ... write the new value to your storage of choice ...
       SendDataUpdateEvent(ProjectDataType.BOOK_SUMMARY, "book summary data update event");
       return true;
   }
   ```
   You will also need to add a matching `BOOK_SUMMARY` constant to `ProjectDataType.cs` (e.g. `public const string BOOK_SUMMARY = "BookSummary";`) — that is the string `SendDataUpdateEvent` carries to the TS side.
2. **C# registration.** Register both methods in the provider's `GetFunctions()` override (string name → delegate). The string is what TS consumers call:
   ```csharp
   retVal.Add(("getBookSummary", GetBookSummary));
   retVal.Add(("setBookSummary", SetBookSummary));
   ```
3. **C# interface constant.** Add the `projectInterface` name to `c-sharp/Projects/ProjectInterfaces.cs`:
   ```csharp
   public const string BOOK_SUMMARY = "platformScripture.BookSummary";
   ```
4. **C# project advertisement.** Add the constant to the provider's supported interfaces list (e.g. `s_paratextProjectInterfaces` in `LocalParatextProjects.cs`) so projects advertise it via `getMetadataForAllProjects`:
   ```csharp
   ProjectInterfaces.BOOK_SUMMARY,
   ```
5. **TypeScript types.** In the extension's `types/*.d.ts` (e.g. `platform-scripture.d.ts`), declare both the data-types record and the interface. The data-types record's **keys** (`BookSummary` here) determine the names of the `get*` / `set*` / `subscribe*` methods, and its three type parameters — `<TSelector, TGetData, TSetData>` — fix the argument and return types of all three methods (see `src/shared/models/data-provider.model.ts` for the canonical `DataProviderGetter` / `DataProviderSetter` / `DataProviderSubscriber` JSDoc):

   ```ts
   /** Provides per-book summary text */
   export type BookSummaryProjectInterfaceDataTypes = {
     /** Per-book summary text */
     BookSummary: DataProviderDataType<number, string | undefined, string>;
   };

   /** Provides per-book summary text editable by the user */
   export type IBookSummaryProjectDataProvider =
     IProjectDataProvider<BookSummaryProjectInterfaceDataTypes> & {
       getBookSummary(bookNum: number): Promise<string | undefined>;
       setBookSummary(
         bookNum: number,
         summary: string,
       ): Promise<DataProviderUpdateInstructions<BookSummaryProjectInterfaceDataTypes>>;
       subscribeBookSummary(
         bookNum: number,
         callback: (summary: string | undefined | PlatformError) => void,
         options?: DataProviderSubscriberOptions,
       ): Promise<UnsubscriberAsync>;
     };
   ```

   Each `get*` on the interface needs its own paired `set*` and `subscribe*` declaration — you cannot share them across multiple gets, even when the data is effectively read-only. The `subscribe*` declaration is **declaration-only**: the TS data provider service auto-generates the body from the events your C# `Set*` emits. Don't write an implementation in either C# or TS.
6. **TypeScript registration.** Import the interface into the `papi-shared-types` block (same file) and add the entry to `ProjectDataProviderInterfaces`:
   ```ts
   import type {
     // ...
     IBookSummaryProjectDataProvider,
   } from 'platform-scripture';

   export interface ProjectDataProviderInterfaces {
     // ...
     'platformScripture.BookSummary': IBookSummaryProjectDataProvider;
   }
   ```
   The string key here MUST match the value of the C# constant from step 3 byte-for-byte.

**Consuming from a web view:**
```tsx
const pdp = useProjectDataProvider('platformScripture.BookSummary', projectId);
const summary = await pdp?.getBookSummary(bookNum);
```

**Verification:**
- Call over PAPI directly: `object:{pdpName}.{methodName}` via `papi-client` skill — confirms C# registration and delegate wiring.
- Check project advertisement: `getMetadataForAllProjects` should list the new interface name on each qualifying project.
- Extension typecheck (`npx tsc -p extensions/src/{ext}/tsconfig.json`) must pass — catches TS interface/registration mismatches.

**Common mistakes:**
- Forgetting step 4: method works over PAPI, but `useProjectDataProvider(...)` returns `undefined` because the project doesn't advertise support for the new interface name.
- Step 2 name mismatch: C# registers `"getBookSummary"` but TS declares `getBookSummaries` (or any other variant) — method appears missing at runtime with a confusing error.
- Step 3 ↔ step 6 mismatch: the C# constant value (e.g. `"platformScripture.BookSummary"`) and the TS `ProjectDataProviderInterfaces` key must be byte-identical.
- Omitting `set*` / `subscribe*` on the TS interface: type check fails because `IProjectDataProvider<T>` requires them even for effectively read-only data.
- **Sharing one `set*`/`subscribe*` across multiple `get*` methods.** Each `get*` needs its own paired `set*` and `subscribe*` — the data provider service does not allow shared partners.
- **Implementing `subscribe*` body in C# or TS.** `subscribe*` is auto-generated by the TS data provider service from the events emitted by `Set*`. You only declare it in the TS `.d.ts`; never write a body for it in either language.
- **Forgetting to call `SendDataUpdateEvent` from a C# `Set*`.** The write succeeds but no `subscribe*` callback ever fires, because the TS data provider service never sees the change.
- **Using `get`/`set`/`subscribe` as a prefix for a non-contract helper method.** Those prefixes opt the method into the data provider contract; for extra (non-contract) methods, use any other appropriate verb (e.g. `lookup*`, `compute*`, `list*`).

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

### PlatformError Codes (across the PAPI wire)

When a C# exception crosses the PAPI wire boundary and the TS caller needs a machine-readable error code (`PERMISSION_DENIED`, `NOT_FOUND`, `UNAVAILABLE`, `INVALID_ARGUMENT`, `FAILED_PRECONDITION`, …), throw an exception built by `PlatformErrorCodes.WithCode(code, message)`.

`WithCode` returns an `InvalidOperationException` and sets `ex.Data["platformErrorCode"] = code`. The exception *type* is informational only — the wire protocol keys solely off `Exception.Data`. On the TS side, `src/shared/services/network.service.ts` extracts `response.error.data?.data?.platformErrorCode` and forwards it to `newPlatformError(message, code)`, so the same string round-trips through JSON-RPC without re-encoding.

The 16-value code set in `c-sharp/PlatformErrorCodes.cs` (`ABORTED`, `ALREADY_EXISTS`, `CANCELLED`, `DATA_LOSS`, `DEADLINE_EXCEEDED`, `FAILED_PRECONDITION`, `INTERNAL`, `INVALID_ARGUMENT`, `NOT_FOUND`, `OUT_OF_RANGE`, `PERMISSION_DENIED`, `RESOURCE_EXHAUSTED`, `UNAUTHENTICATED`, `UNAVAILABLE`, `UNIMPLEMENTED`, `UNKNOWN`) mirrors the TS `PlatformErrorCode` union in `lib/platform-bible-utils/src/platform-error.ts`. (`PlatformErrorCodes` also exposes `Throw(code, message)` — marked `[DoesNotReturn]` — and `TryGetCode(ex, out code)` for the catch side.)

**Pattern:**
```csharp
throw PlatformErrorCodes.WithCode(
    PlatformErrorCodes.PermissionDenied,
    "You must be an administrator on this shared project.");
```

**Avoid:**
- Throwing a *custom exception type* across the PAPI wire to signal a code — richer types do not survive the JSON-RPC serializer any better and complicate catch blocks. Use `WithCode` on the standard exception instead.
- String-matching on `ex.Message` in TS — read the `platformErrorCode` property off the caught `PlatformError` instead.

**Location:** `c-sharp/PlatformErrorCodes.cs`

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

#### Double-checked locking for cached-instance factories

For a factory that lazily creates and caches one instance per key, use the `ConcurrentDictionary` check → `lock` → re-check → create sequence. The lock-free first check handles the common (already-cached) path without contention; the re-check inside the lock prevents two callers from both creating the instance.

```csharp
if (_pdpMap.TryGetValue(projectID, out var existingPdp))
    return existingPdp;

lock (_creationLock)
{
    // Re-check: another caller may have created it while we waited for the lock.
    if (_pdpMap.TryGetValue(projectID, out var existingPdpInLock))
        return existingPdpInLock;

    // ... create, add to _pdpMap, and return ...
}
```

**When:** factory patterns with cached instances. Verified in `c-sharp/Projects/ParatextProjectDataProviderFactory.cs`.

**Why:** minimizes lock contention for entries that already exist while keeping creation single-flighted.

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

### Identifiers (API Design)

Represent entity IDs as `string` (GUID form) on both the C# and TS sides of any PAPI contract.

- Avoid: `int` IDs, or custom/strongly-typed ID wrapper types, in wire contracts.
- Why: a plain string GUID round-trips through JSON-RPC unchanged and stays consistent across the C#/TS boundary and across systems. Example: `c-sharp/Projects/ScrTextExtensions.cs` surfaces a project's `scrText.Guid.ToString()` as its identifier.

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
│   ├── web-views/                # (or flat in src/ — both layouts are used)
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

## Scripture References Across Projects (Versification)

A `SerializedVerseRef` is only meaningful in the **versification** of the project that produced it:
the same book/chapter/verse numbers can point to a different verse — or to no verse — under another
project's versification. **Any time a Scripture reference moves from one project to another** —
scroll-group sync, cross-project navigation, showing one project's current reference in another
project's editor or resource — the reference **must be converted into the target project's
versification**. Never assume two projects share a versification.

- **In React (renderer and web views), use the scroll-group hooks — they convert for you, given
  your project.** `useScrollGroupScrRef(scrollGroupScrRef, setScrollGroupScrRef, projectId)` only
  converts when you pass the consuming project's `projectId` as the third argument; omit it and the
  hook returns the raw verse reference with no conversion and no error. Pass `projectId` whenever
  conversion may be needed. Its web-view counterpart `useWebViewScrollGroupScrRef()` is unaffected —
  it reads `projectId` from the web view definition automatically. Prefer these hooks over
  converting by hand.
- **Elsewhere (C#/Node, or non-React callers), use the PAPI command**
  `platformScripture.mapVerseRefBetweenProjects` directly. See its TSDoc/OpenRPC documentation for
  the exact contract.

**Do not skip the conversion just because both projects report the same
`platformScripture.versification` setting.** That setting is only the base `ScrVersType` and does not
capture `custom.vrs`, so two projects can report the same base type yet map differently. Let the
hook or command decide with the real `ScrVers`; a genuinely identical versification is a cheap no-op.

---

## Experimental APIs

The `@experimental` marker applies to any PAPI surface — whether built into the platform or contributed by an extension. Mark an API experimental when it is not a confident, solid, general-purpose contract. Common cases:

- APIs designed for one particular UI or use case rather than a broad audience.
- APIs whose shape is likely to change as you learn how they're used.
- APIs added to unblock a feature without long-term-suitability review.
- APIs not yet covered by tests in a meaningful way.

Two complementary places apply the marker. Use both when you can.

### TSDoc (for IDE/type consumers)

Add `/** @experimental */` to the type or member.

**Cascade caveat — tag every member in extension `.d.ts` files.** TypeDoc (0.28.3+) treats `@experimental` as a built-in modifier tag and cascades it from an interface to its members — but **only in TypeDoc-generated output** (the `papi.d.ts` API site and the `platform-bible-react` / `platform-bible-utils` doc builds). It does **not** cascade in normal TypeScript or editor IntelliSense: a consumer hovering a method of an `@experimental` interface sees nothing on the method itself. Extension `.d.ts` files (e.g. `platform-scripture.d.ts`) and web-view-local interfaces are **not** run through TypeDoc — they ship as-is and are read by other extensions via IntelliSense. So in those files, tagging the interface alone is not enough: **put `@experimental` on each method (and other member) individually**, not just on the container type. (In `papi.d.ts` / `platform-bible-react` / `platform-bible-utils`, the container-level tag is sufficient because TypeDoc cascades it.)

### Wire (for runtime/OpenRPC consumers)

Pass `'x-experimental': true` in the registration's documentation object. The marker becomes visible in the live OpenRPC document at the WebSocket `rpc.discover` endpoint.

### Quick reference per surface

| Surface | TSDoc location | Wire field path |
|---|---|---|
| Commands | `CommandHandlers` entry in `papi-shared-types` augmentation | `commandDocs.method['x-experimental']: true` |
| Network objects | (TSDoc on the interface registered) | `networkObjectService.set(..., { 'x-experimental': true })` (5th param) |
| Data providers | (TSDoc on the data type interface) | `dataProviderService.registerEngine(..., { 'x-experimental': true })` (5th param) |
| WebView providers | (TSDoc on the provider type) | `webViewProviderService.registerWebViewProvider(..., undefined, { 'x-experimental': true })` |
| Project data providers | `ProjectDataProviderInterfaces` entry; factory return envelope | `registerProjectDataProviderEngineFactory(..., undefined, { 'x-experimental': true })` |
| Network events | `NetworkEvents` entry in `papi-shared-types` augmentation | `createNetworkEventEmitterAsync(name, { notification: { 'x-experimental': true } })` |
| Menus (extension points) | (none — JSON contribution) | `"isExperimental": true` next to `"isExtensible": true` |

The wire-field column above shows the **TypeScript** registration functions. Network
objects, data providers, and project data providers registered from the **.NET data
provider** do not use those functions — they register over the wire from C# and use the
C# path below instead.

### C# (backend-registered surfaces)

C#-registered network objects / data providers / PDPs carry the marker **only on the
wire** (there is no C# TSDoc layer — mark the TS-facing interface, if any, with
`@experimental` separately). The `network:registerMethod` wire call already accepts an
optional documentation argument — the C# counterpart of the TS
`SingleMethodDocumentation` — which the main process emits into the OpenRPC document.

**Build docs with the `ExperimentalMethodDocumentation` factory** (`c-sharp/NetworkObjects/Documentation/`; every doc it builds carries `x-experimental: true`). Complex record params/results use the `"object"` type rather than a fully-expanded schema:

```csharp
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

Create(
    "Summary of the method.",
    [Param("input", "The input.", "object")],
    ResultOf("object", "The result"));
```

Pass a `NetworkObjectDocumentation` to `RegisterNetworkObjectAsync`. It mirrors the
TypeScript `NetworkObjectDocumentation`: an object-level `Experimental` flag that
**cascades** to the `object:{name}` existence method AND every function, plus optional
per-method `Methods` for richer docs.

**Object-wide** (the whole network object is experimental) — set `Experimental = true`.
It marks the existence method and every function automatically (functions without their
own `Methods` entry get a bare marker). Add `Methods` for richer per-function docs:

```csharp
await RegisterNetworkObjectAsync(
    NetworkObjectName,
    functions,
    createdDetails,
    new NetworkObjectDocumentation
    {
        Experimental = true,                       // cascades to object:{name} + every function
        Methods = BuildExperimentalDocumentation(), // optional richer per-method docs
    });
```

`{ Experimental = true }` alone (no `Methods`) is enough to mark the whole object.

**Per-method** (only some methods experimental — e.g. one projectInterface on a PDP that
also exposes stable ones like USFM/USJ) — leave `Experimental` unset and list only the
experimental functions in `Methods`. The existence method and unlisted functions stay
unmarked. For a data provider, override `DataProvider.GetNetworkObjectDocumentation()`:

```csharp
protected override NetworkObjectDocumentation GetNetworkObjectDocumentation() =>
    new()
    {
        // Experimental left unset → object + stable interfaces stay unmarked
        Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
        {
            ["getFinalVerseNumber"] = Create("…", [Param("bookNum", "…", "number")], ResultOf("number", "…")),
            // … only the experimental functions
        },
    };
```

`PapiClient.RegisterRequestHandlerAsync` also takes an optional `documentation:` argument
for marking a single standalone method. Reference implementations:
`EnhancedResourceFactory`, `ChecklistNetworkObject`, `ManageBooksService` (object-wide),
and `ParatextProjectDataProvider` (per-method versification). Verify the result against the
live OpenRPC document via the `rpc.discover` WebSocket method — C# changes require a data
provider restart (no hot-reload).

### What experimental does NOT do

The `@experimental` marker is **informational only** — experimental APIs behave identically to stable ones at runtime. There is no opt-in mechanism, no runtime gate, and no change to how calling code works. The marker exists so consumers can tell which APIs are safe to depend on long-term.

### Graduating out of experimental

Once an API has a settled shape, meaningful test coverage, and has been validated against real use cases, remove the `@experimental` TSDoc tag and the `'x-experimental': true` field from its registration. No other changes are required.

### Deprecation note for events

`papi.network.createNetworkEventEmitter` (sync) is deprecated as of 8 June 2026. Use `createNetworkEventEmitterAsync` for new code. Events created via the sync API are not centrally registered and do not appear in the OpenRPC document.

The legacy `getNetworkEvent<T>(name)` overload that takes an explicit type parameter is also deprecated. Declare the event in `NetworkEvents` and call `getNetworkEvent('event.name')` without `<T>` to get inference.

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
- `c-sharp-tests/FixtureSetup.cs` - Global test fixture

### TypeScript Core
- `src/declarations/papi-shared-types.ts` - Global type extensions
- `extensions/src/platform-scripture/src/main.ts` - Example extension
