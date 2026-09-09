# PT-4527 — Let an extension list its project extension-data qualifiers

> **Frozen record** — execution plan for PT-4527 (branch `pt-4527-pdp-extension-data-enumeration`). The
> plan was carried out and the PR opened 2026-09-07; what changed in execution is under
> [Outcome](#outcome--what-changed-in-execution). Every file:line below cites `origin/main` at
> `e44c56c76be` as of 2026-09-04 and is historical — follow the current files, not this document.

This is a plan for an implementer who has not seen the discussion behind it. Where the plan says
"must", there is a reason stated next to it; where it says "recommended", pick otherwise if you find
a better reason.

## Outcome — what changed in execution

The method shipped as planned — `listExtensionDataQualifiers` on `platform.base`, `list*` not
`get*`, optional on the engine and required on the consumer, no `subscribe*`. Code review (twelve
angles, each finding verified against a real project directory) then changed the following. The
decision record is `adr-pdp-enumerates-extension-data-qualifiers` in
`.context/standards/Architecture-Decisions.md`, recorded as **Proposed**.

- **`dataQualifierPrefix` was dropped before shipping.** It had no consumer, saved a caller one
  `.filter()` over an array it already held, and the C# (ordinal) and hello-rock3 (grapheme-aware)
  implementations had already diverged on what "prefix" meant. `ExtensionDataListScope` is
  `Pick<ExtensionDataScope, 'extensionName'>`; §2, §3.3–4, §4.4 and the prefix test in §5 describe
  the pre-review shape.
- **`GetExtensionData` no longer creates the document it looks for.** §1's first bullet is fixed at
  the root, not only worked around: `createIfNotExists: false`, with an absent document reading as
  `""` — the answer callers always got — so nothing on the wire changed.
- **The extension name is checked, on the listing only, for escaping its own directory.** Review
  found that `extensionName: "."` passed the empty-name check and, via the only downstream guard
  (`Contains("..")`), rooted the walk at the shared extensions directory — returning, and then
  reading back, every other extension's data. `ListExtensionDataQualifiers` now rejects `"."`,
  `"./"`, and any `".."` segment. The check is deliberately **not** in the shared
  `GetExtensionDataRoot`: for `getExtensionData`/`setExtensionData` such a name reaches nothing a
  caller could not reach by naming the other extension outright, and those methods have always
  accepted nested names like `acme/tools`, so tightening them would strand data written under one.
  They are unchanged from the merge base, and a test pins that a nested name writes, lists, and
  reads back.
- **The walk is a `FileSystemEnumerable` with two predicates** — include every file whatever its
  attributes; never recurse into a symlink or junction — rather than `Directory.GetFiles` with an
  attribute skip. The default `Hidden | System` skip dropped every dot-prefixed stream on
  macOS/Linux while Windows listed it, and skipping `ReparsePoint` instead (the one-flag way to
  stop link recursion) dropped cloud-sync placeholder files that `getExtensionData` reads fine.
  Both halves are pinned by symlink-based tests that skip where the OS refuses to create links.
- **A missing project directory throws `DirectoryNotFoundException`** instead of answering `[]`,
  so an unreachable project cannot be mistaken for "no data". An absent extension sub-path is still
  `[]`.
- **hello-rock3 splits its keys with native `String` methods.** The key is composed by native
  concatenation and looked up by exact equality; grapheme-aware `startsWith` silently dropped any
  qualifier beginning with a combining mark. `.claude/rules/code-quality/native-string-vs-grapheme-helpers.md`
  gained the carve-out.
- **The consumer TSDoc no longer claims `?.` never short-circuits.** That holds only for a remote
  proxy; in-process the property is genuinely absent and a direct call throws synchronously. Callers
  are told to `try`/`catch` around an `await`. The two conventions this hardened are promoted into
  `Paranext-Core-Patterns.md` as "Adding an optional method to `platform.base`".
- **Path composition is centralized** in `GetExtensionDataRoot`, so listing and reading move
  together by construction; the `scope.ProjectID = …` writes in §3.4 turned out to be dead once
  their only reader went, and were removed.
- **Tests beyond §5:** a file-backed `RawDirectoryProjectStreamManagerTests` suite (the in-memory
  double joins names with `/` already, so only a real directory can catch a separator regression);
  wire-surface registration (`GetRegisteredFunctionNames` gets its first caller); eight
  extension-name guard cases; hidden streams on both platforms' spelling of hidden; project storage
  missing; create-on-read pinned. The round-trip test asserts non-empty before its loop and compares
  contents; fixtures are BOM-free so the empty-document case is a genuine 0-byte file.
- Nine commits rather than §8's "three or four": C#, TS contract, sample/stub, ADR, cleanup, doc
  corrections, review fixes with the API trims, docs promotion, and this plan.

## 1. The gap

The extension-facing project data provider exposes exactly two extension-data methods
(`src/shared/models/project-data-provider.model.ts:106-131`):

```ts
getExtensionData(dataScope: ExtensionDataScope): Promise<string | undefined>;
setExtensionData(dataScope: ExtensionDataScope, data: string): Promise<...>;
```

There is no way to ask "what qualifiers exist under my extension?" An extension can only read a
qualifier it can already name. Two consequences in this repo alone:

- **A read creates the file.** `ParatextProjectDataProvider.GetExtensionData` calls
  `GetExtensionStream(scope, createIfNotExists: true)` (`c-sharp/Projects/ParatextProjectDataProvider.cs:382-397`),
  and `RawDirectoryProjectStreamManager.GetDataStream` does `Directory.CreateDirectory` +
  `FileMode.OpenOrCreate` (`RawDirectoryProjectStreamManager.cs:64-87`). So discovering whether a
  qualifier exists by reading it leaves a zero-byte file behind — under `shared/**`, which Paratext
  Send/Receive commits and syncs to every clone, with no delete API.
- **Every multi-file layout needs a hand-maintained index.** Any extension that stores more than one
  document must keep its own list of qualifiers in yet another shared document — which Send/Receive
  can overwrite (it does whole-file last-write-wins on `shared/**`; see §7), so the index needs its
  own self-healing. The Checking Assistant extension currently carries two such indexes with three
  hundred-odd lines of repair logic between them, all working around this one missing call.

The capability already exists and is unused. `IProjectStreamManager.GetExistingDataStreamNames()`
(`c-sharp/Projects/IProjectStreamManager.cs:18`) is implemented by
`RawDirectoryProjectStreamManager.GetExistingDataStreamNames()` (`:32-61`) — recursive, walks up to
build relative names — and is marked `// TODO: This doesn't seem to be used`. It is never called
from C# and never surfaced over PAPI.

## 2. The contract to add

One new method on the `platform.base` project interface, alongside `getExtensionData` and
`setExtensionData`:

```ts
/**
 * Lists the `dataQualifier`s that exist for an extension in this project.
 *
 * Every returned string is a valid `dataQualifier` for `getExtensionData` under the same
 * `extensionName`, exactly as it would be passed: forward slashes, relative to the extension's own
 * data directory, nested paths included. The list is sorted and includes empty documents.
 *
 * Reading the list never creates anything. An extension that has never written any data gets `[]`.
 *
 * Not every PDP can enumerate (a PDP over a remote store may not be able to). Such a PDP omits the
 * method, and calling it rejects — callers that need to work against arbitrary PDPs should treat a
 * rejection as "unknown", not as "empty".
 */
listExtensionDataQualifiers(scope: ExtensionDataListScope): Promise<string[]>;
```

with

```ts
export type ExtensionDataListScope = {
  /** Name of an extension as provided in its manifest */
  extensionName: string;
  /**
   * Optional prefix. When given, only qualifiers that start with it are returned — `byMachine/`
   * lists everything under that directory. Matched as a plain string prefix on the forward-slash
   * form, so `byMachine` (no slash) also matches `byMachineOther/x`; pass the trailing slash if you
   * mean the directory.
   */
  dataQualifierPrefix?: string;
};
```

### Why `list…` and not `get…` — this is load-bearing

`.context/standards/Paranext-Core-Patterns.md:265-271` ("Naming rule (read first)"): `get`, `set`
and `subscribe` are **magic prefixes** for the TS data provider service. A method starting with `get`
opts into the data-type contract and is expected to have a paired `set*` and an auto-generated
`subscribe*`. This method is a query with no data type behind it and nothing to subscribe to. The
recipe's own words: "If you only need a helper method on the provider that is not part of the
contract, the method MUST NOT start with get/set/subscribe … Use any other appropriate verb (e.g.
lookup*, compute*, list\*)."

So: `listExtensionDataQualifiers`. Do not rename it to `get…` for symmetry.

### Semantics, each with its reason

| Rule                                                       | Why                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns `dataQualifier` values, not stream names or paths  | The caller passes them straight back to `getExtensionData`. The round trip is the whole point, and it is the property the tests pin.                                                                                                                                                                                               |
| Forward slashes always                                     | `GetExistingDataStreamNames` builds names with `Path.DirectorySeparatorChar` (`:47-53`) — backslashes on Windows. Qualifiers are written with `/` (`GetExtensionStream`, `:437`). Normalize, or the list is unusable on Windows.                                                                                                   |
| Scoped to `{EXTENSION_DATA_SUBDIRECTORY}/{extensionName}/` | The existing method enumerates the **whole project root** (`_writableRootDir`, `:34-42`). Returning `Settings.xml` and every book file to an extension asking about its own data is wrong, slow, and leaks the project layout. `EXTENSION_DATA_SUBDIRECTORY = "shared/platform.bible/extensions"` (`LocalParatextProjects.cs:19`). |
| Recursive                                                  | Nested qualifiers are valid today (`GetFileNameFromStreamName` replaces `/` and `Path.Join`s, `:108-116`; `GetDataStream` creates parent directories, `:70-79`). A consumer that stores `byMachine/decisionLedger/<id>.json` needs to see it.                                                                                      |
| Never creates a directory or file                          | This is the property the method exists to provide. If the extension's directory does not exist, return `[]` — do **not** route through `GetDataStream(…, createIfNotExists: true)`.                                                                                                                                                |
| Includes zero-byte files                                   | They are files; the caller reads `''` and treats it as absent, exactly as `getExtensionData` returns `''` for them today. Hiding them would make the list disagree with a read.                                                                                                                                                    |
| Sorted (ordinal)                                           | `Directory.GetFiles` order is filesystem-dependent. Determinism is cheap and makes tests exact.                                                                                                                                                                                                                                    |
| No sync write scope                                        | It is a read. `GetExtensionData` takes none (`:382-397`); `SetExtensionData` does (`:400`, `EnterSyncWriteScope`). Match the read.                                                                                                                                                                                                 |
| Optional on TS engines                                     | See §4.                                                                                                                                                                                                                                                                                                                            |

## 3. C# changes

Follow the pattern of the two existing extension-data methods, not the six-step recipe for a new
`projectInterface` — this extends the mandatory `platform.base` surface, so steps 3–4 of the recipe
(new `ProjectInterfaces` constant, advertisement in `LocalParatextProjects`) do not apply, and there
is no `Set*`, no `SendDataUpdateEvent`, no `ProjectDataType` constant.

1. **`c-sharp/Projects/IProjectStreamManager.cs`** — give `GetExistingDataStreamNames` a scope so
   implementations do not have to walk the whole project:

   ```csharp
   /// <summary>
   /// Get the names of the data streams under <paramref name="underPath"/>, relative to it, using
   /// '/' as the separator. Returns an empty array (and creates nothing) when the path does not
   /// exist. Null lists every stream in the project, relative to the project root.
   /// </summary>
   string[] GetExistingDataStreamNames(string? underPath = null);
   ```

   Keeping the parameterless call working preserves the (unused) existing contract.

2. **`c-sharp/Projects/RawDirectoryProjectStreamManager.cs:32-61`** — implement the scope: resolve
   `underPath` through the same normalization `GetFileNameFromStreamName` uses (reject `..`, replace
   both separators), `Directory.Exists` → `[]` if not, then enumerate recursively under it, build
   names relative to it, replace `Path.DirectorySeparatorChar` with `/`, sort with
   `StringComparer.Ordinal`. Remove the `// TODO: This doesn't seem to be used` comment — it is used
   now. Consider whether `Initialize()` and `DeleteDataStream()`, both also marked unused, should
   keep their TODOs; leave them alone in this PR.

3. **`c-sharp/Projects/ProjectDataProvider.cs`**:

   - Add `public abstract string[] ListExtensionDataQualifiers(ProjectDataScope scope);` next to
     the two existing abstracts (`:43-51`), with a `<summary>` matching the contract in §2.
   - Register it in `GetFunctions()` (`:20-23`):
     `return [("getExtensionData", GetExtensionData), ("setExtensionData", SetExtensionData), ("listExtensionDataQualifiers", ListExtensionDataQualifiers)];`
     Registering in the **base** class is what makes every C# PDP (Paratext, published Paratext, any
     future subclass) expose it. `ParatextProjectDataProvider.GetFunctions` calls `base.GetFunctions()`
     first (`ParatextProjectDataProvider.cs:114-116`), so nothing else changes there.
   - Reuse `ProjectDataScope` for the argument: `ExtensionName` is the scope, `DataQualifier` is the
     optional prefix. Do not add a new C# scope class — `ProjectDataScope` already has both fields
     (`ProjectDataScope.cs:18-33`) and the JSON shape `{ extensionName, dataQualifier? }` maps onto
     the TS `ExtensionDataListScope` if you name the TS prefix field `dataQualifier`. **Decision for
     the implementer:** either name the TS field `dataQualifier` (wire-compatible, slightly
     misleading name) or `dataQualifierPrefix` (clearer, needs a one-line mapping on the C# side or a
     `[JsonPropertyName]`). Recommended: `dataQualifierPrefix` on the TS type and a matching
     C# property, because a reader of the TS type should not have to guess that it is a prefix.

4. **`c-sharp/Projects/ParatextProjectDataProvider.cs`**, next to `GetExtensionData` (`:382`):

   ```csharp
   public override string[] ListExtensionDataQualifiers(ProjectDataScope scope)
   {
       if (string.IsNullOrEmpty(scope.ExtensionName))
           throw new InvalidDataException("Must provide an extension name");
       scope.ProjectID = ProjectDetails.Metadata.Id;
       ProjectDetails projectDetails = _paratextProjects.GetProjectDetails(scope.ProjectID!);
       IProjectStreamManager streamManager = CreateStreamManager(projectDetails);
       var all = streamManager.GetExistingDataStreamNames(
           $"{LocalParatextProjects.EXTENSION_DATA_SUBDIRECTORY}/{scope.ExtensionName}");
       var prefix = scope.DataQualifierPrefix ?? "";   // or DataQualifier — see step 3
       return prefix.Length == 0
           ? all
           : all.Where(q => q.StartsWith(prefix, StringComparison.Ordinal)).ToArray();
   }
   ```

   No `EnterSyncWriteScope`, no `RunWithinLock`, no `SendDataUpdateEvent`.

5. **`c-sharp-tests/DummyParatextProjectDataProvider.cs:50`** — `InMemoryStreamManager.GetExistingDataStreamNames`
   currently `throw new NotImplementedException()`. Implement it over `_owner._inMemoryFiles`
   (keys are stream names): filter by the `underPath` prefix, strip it, sort. The tests in §5 do not
   run without this.

6. **Analyzer PNX007** (`c-sharp/Paranext.Analyzers/Rules/NoTupleReturnTypesAnalyzer.cs`): methods
   on `DataProvider` subclasses must not return tuples. `string[]` is fine. Mentioned only so you
   don't "improve" the return type into `(string name, long size)[]` — that serializes as `{}` over
   JSON-RPC.

## 4. TypeScript changes

1. **`src/shared/models/project-data-provider.model.ts`**:

   - Add `ExtensionDataListScope` next to `ExtensionDataScope` (`:14-29`).
   - Add `listExtensionDataQualifiers?(scope: ExtensionDataListScope): Promise<string[]>;` to
     `WithProjectDataProviderEngineExtensionDataMethods` (`:106-131`), **optional**, with the JSDoc
     from §2.

   Why optional on the engine: making it required breaks every third-party TS PDP engine at
   compile time, and at least one in-repo engine cannot meaningfully implement it —
   `platform-lexical-tools` throws for both existing extension-data methods
   (`extensions/src/platform-lexical-tools/src/lexical-reference-project-data-provider-engine.model.ts:130-140`).
   The runtime already tolerates a missing method: `network-object.service.ts:545-550` exposes
   whatever function properties the engine object has (`getAllObjectFunctionNames`), so an engine
   without it simply lacks the network function and a call rejects with the standard
   function-not-found error. The `platform.base` registration guard
   (`project-data-provider.service.ts:129-136`) checks only `getExtensionData` and `getSetting`;
   **do not** add this method to that guard, or every existing PDP stops registering.

2. **`src/declarations/papi-shared-types.ts:632`** — `IBaseProjectDataProvider` already composes
   `WithProjectDataProviderEngineExtensionDataMethods<TProjectDataTypes>`, so the consumer type
   picks the method up automatically. Read the JSDoc there once to confirm the optional marker
   reads sensibly on the consumer side; if it does not, declare it required on
   `IBaseProjectDataProvider` (the C# PDP always has it) and keep it optional only on the engine.
   Recommended: required on the consumer, optional on the engine, with the "may reject" sentence
   in the JSDoc. That is exactly how `platform-lexical-tools`'s always-throwing `getExtensionData`
   already presents to consumers.

3. **Regenerate `lib/papi-dts/papi.d.ts`**: `npm run build:types` (`package.json:61`). It is
   committed; the diff should show the new type and method and nothing else. `npm run lint` runs
   this too (`:71`), so a stale `papi.d.ts` fails lint.

4. **Reference TS implementation** —
   `extensions/src/hello-rock3/src/models/hello-rock3-project-data-provider-engine.model.ts`. It
   keys extension data as `` `${scope.extensionName}/${scope.dataQualifier}` `` (`:31-33`). Add:

   ```ts
   async listExtensionDataQualifiers(scope: ExtensionDataListScope): Promise<string[]> {
     const prefix = `${scope.extensionName}/`;
     return Object.keys(this.projectData.extensionData)
       .filter((key) => key.startsWith(prefix))
       .map((key) => key.slice(prefix.length))
       .filter((qualifier) => qualifier.startsWith(scope.dataQualifierPrefix ?? ''))
       .sort();
   }
   ```

   This is the sample extension; a third party will copy it, so it should be the shape you want
   copied.

5. **`platform-lexical-tools`** — add a throwing stub next to its two siblings (`:130-140`), same
   `ERROR_MESSAGE_NO_EXTENSION_DATA`, same eslint-disable line. Not strictly required (optional on
   the engine) but keeps that class honest about being a base PDP that holds no extension data.

6. **Do not** add a `subscribeExtensionDataQualifiers`. There is no data type, so the service
   would not generate one, and the recipe forbids declaring one without a `Set*`. If a consumer
   needs change notification, `subscribeExtensionData` on a known qualifier already exists.

## 5. Tests

**C#** — `c-sharp-tests/Projects/ParatextDataProviderTests.cs`, modelled on
`SetAndGetExtensionData_SavesAndGetsData` (`:252-269`). Run with
`dotnet test c-sharp-tests/c-sharp-tests.csproj`.

- Nothing written → `[]`, and the extension's directory still does not exist afterwards (assert on
  the dummy's `_inMemoryFiles` or on disk, whichever the dummy exposes). This is the property the
  method exists for; make it the first test.
- Two qualifiers written under one extension → both listed, sorted, exact strings.
- A nested qualifier `byMachine/ledger/abc.json` → listed with forward slashes, byte-for-byte.
- A qualifier written under **another** extension name → not listed.
- Prefix `byMachine/` → only the nested one; prefix `nothing/` → `[]`.
- **Round trip:** for every listed qualifier, `GetExtensionData(scope with that qualifier)`
  returns what was written, and the file count does not change across the whole test (no file was
  created by listing or by reading a listed name).
- An empty document (written as `""`) is listed.

**TypeScript** — `src/shared/services/__tests__/project-data-provider.service.test.ts` already
exercises `getExtensionData`. Add: an engine **with** the method is callable through the PDP; an
engine **without** it still registers as `platform.base` (the guard is unchanged) and calling the
method rejects. Also `npm run typecheck` and the hello-rock3 workspace tests.

**Whole-repo gates:** `npm run lint` (regenerates and checks `papi.d.ts`), `npm run typecheck`,
`npm run test`, `dotnet build c-sharp/ParanextDataProvider.sln`, and the pre-commit hook
(`.husky/pre-commit` → `.husky/lib/ai-hooks.sh`, which lints staged C# and treats analyzer warnings
as blocking). `npm run lint:staged` runs the same checks by hand.

## 6. What not to do

- Don't name it `get…` (§2). Don't add `set…`/`subscribe…` for it.
- Don't enumerate the project root and filter in C# afterwards — scope the walk (§3.2). Project
  directories hold thousands of files.
- Don't route the list through `GetDataStream(…, true)` or anything else that creates.
- Don't take the sync write scope.
- Don't add it to the `platform.base` registration guard (§4.1).
- Don't return tuples (PNX007).
- Don't edit `CHANGELOG.md`; it is assembled from PR titles at release.
- Don't put anyone's name in the PR or commits.

## 7. Context for the PR description

The reviewer will want to know why this matters, briefly:

- Paratext Send/Receive does not merge files under `shared/**`; it replaces them. Verified against
  the shipping `ParatextData.dll` 9.5.0.22: `shared/**` classifies as `SharedProjectFileClassifier`
  → `SimpleProjectFileMerger`, whose whole body is "if theirs has a later modification time, take
  theirs." So any extension storing multi-writer data there has to split it into one file per
  writer — and then has no way to discover the files.
- Two in-repo consumers are affected today. `platform-scripture` stores `deniedResultsList` as one
  shared JSON blob with read-modify-write and no concurrency handling
  (`extensions/src/platform-scripture/src/checks/extension-host-check-runner.service.ts:51-54`,
  `:106-150`). The Checking Assistant (`paranext/paratext-assistant`, PR #135 and its follow-up)
  splits four documents per machine and carries two hand-maintained indexes purely to work around
  the missing enumeration; both indexes and their self-healing become deletable with this method.
- The C# capability has existed since the stream manager was written and is marked unused.

**PR title:** `PT-4527: Let an extension list its project extension-data qualifiers` — the Jira
ticket is https://paratextstudio.atlassian.net/browse/PT-4527 (project PT, Dev Task); its
"Prerequisite for" section links the downstream issue paranext/paratext-assistant#113. paranext-core
has GitHub issues disabled, so the Jira key is the only reference. `CLAUDE.md` caps PR titles under
70 characters, which is why the title does not name the Paratext PDP. There is no PR template.
Bodies on recent merged PRs are substantial — an Overview paragraph and an **API Changes** list — so
include both. Do not put anyone's name in the PR.

Precedent for the C# + test shape: commit `cd5e7239540` (#2707, "Add read-only PT9 interlinear
projectInterface to the Paratext PDP") — but note its TS type went into
`extensions/src/platform-scripture/src/types/platform-scripture.d.ts` because it was a **new**
`projectInterface`. This change extends `platform.base`, so its type lives in core
(`src/shared/models/project-data-provider.model.ts`), and the six-step recipe's steps 3–6 do not
apply as written.

## 8. Order of work

1. C# interface + `RawDirectoryProjectStreamManager` (with the scoped walk) + dummy stream manager.
2. C# abstract + `ParatextProjectDataProvider` override + `GetFunctions` registration.
3. C# tests, run them, fix.
4. TS types, `npm run build:types`, check the `papi.d.ts` diff is exactly the new surface.
5. hello-rock3 implementation + lexical-tools stub.
6. TS tests.
7. Full gates. Commit in that order (three or four commits: C#, TS types, sample/stub, tests), so a
   reviewer can read the C# change without the generated `papi.d.ts` diff in the same commit.
