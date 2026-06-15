# New API Surface: `ai/main` vs `main`

Comparison of `origin/main` → `origin/ai/main`, focused on public/wire API
surface area. Generated 2026-06-11; **re-scanned 2026-06-15** after `ai/main` was
rebased onto `main` and further PRs merged (new merge-base `598d31eb`).

The diff is dominated by two new feature areas — **Enhanced Resources** (new
extension + new C# backend + new Electron protocol) and **Scripture tools**
(Markers Checklist, Manage Books, Versification PDP) — plus library export
additions. Everything below is brand-new on `ai/main` unless noted otherwise.

> **Re-scan note (2026-06-15):** Sections 1–11 below were written against the
> original merge-base and remain accurate. The rebase pulled in one major new
> piece of public surface — **PR #2380 (Experimental API flag + network-event
> infrastructure)** — documented in the new **§12 Addendum** at the bottom. The
> only feature-level change to the sections above is that the checklist event
> `platformScripture.openMarkersChecklistSettings` is now declared in the
> `NetworkEvents` registry and created via `createNetworkEventEmitterAsync`
> (see §12), rather than the raw sync emitter described in §3.

---

## 1. Network Objects (new)

| Network object                                                          | Backend                      | Methods exposed over the wire                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`platform.enhancedResources`**                                        | C# `EnhancedResourceFactory` | `readInitializeResult`, `resolveResourceObjectId`, `findLinksForScope`, `findImagesForReference`, `readDictionaryEntry`, `readArticle`, `buildTooltipData`, `buildNoteData`, `loadDictionary`, `loadEncyclopedia`, `loadMedia`, `findLocalizedGlosses`, `translatePartOfSpeech`, `executeSourceLanguageSearch`, `fetchImageBytes`, `loadMarbleChapterXml` (16 methods) |
| **`platformScripture.checklistService`** (typed as `IChecklistService`) | C# `ChecklistNetworkObject`  | `buildChecklistData`, `validateMarkerSettings`, `resolveComparativeTexts` (3 methods)                                                                                                                                                                                                                                                                                  |

Both are plain network objects (intentionally **not** in `papi-shared-types`
`DataProviders`); acquired via `papi.networkObjects.get(...)`.

---

## 2. Data Providers — new project data provider interface + methods

- **`platformScripture.Versification`** — new projectInterface on the existing
  `ParatextProjectDataProvider`, typed as `IVersificationProjectDataProvider`.
  Read-only (the setters always throw; the authoritative writer is the
  `platformScripture.versification` project setting).
  - New PDP methods (registered C#-side, typed TS-side):
    `getFinalVerseNumber` / `setFinalVerseNumber` / `subscribeFinalVerseNumber`,
    `getFinalChapter` / `setFinalChapter` / `subscribeFinalChapter`,
    `getFinalVerseNumbersInBook` / `setFinalVerseNumbersInBook` / `subscribeFinalVerseNumbersInBook`.

---

## 3. Network Events (new)

- **`platformScripture.openMarkersChecklistSettings`** (`CHECKLIST_OPEN_SETTINGS_EVENT`),
  payload `undefined` — tells mounted checklist web views to open the Marker
  Settings dialog.

---

## 4. Commands (new — `papi-shared-types` `CommandHandlers` augmentations)

| Command                                          | Signature                                                         |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| `platformEnhancedResources.openEnhancedResource` | `(editorWebViewId?: string) => Promise<string \| undefined>`      |
| `platformEnhancedResources.requestAutoShowGuide` | `() => Promise<boolean>`                                          |
| `platformScripture.openMarkersChecklist`         | `(webViewId?: string) => Promise<string \| undefined>`            |
| `platformScripture.openMarkersChecklistSettings` | `() => Promise<void>`                                             |
| `platformScripture.openManageBooks`              | `(webViewIdOrProjectId?: string) => Promise<string \| undefined>` |

### Not a breaking change: `platformScripture.openFind`

The `.d.ts` declaration changed from `(projectId?: string)` to
`(editorWebViewId?: string)`. This is a **type/documentation correction, not a
behavioral break**: the runtime handler on `main` already took `editorWebViewId`
(`async function openFind(editorWebViewId: string | undefined)`); only the
command's type declaration lagged behind and named the param `projectId`. The
`ai/main` change brings the declared type in line with the existing
implementation. No runtime contract change.

---

## 5. Web View Providers (new)

| Web view type                                | Options                                                                                         |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `platformEnhancedResources.enhancedResource` | `EnhancedResourceWebViewOptions extends OpenWebViewOptions { resourceId; editorScrollGroupId }` |
| `platformScripture.markersChecklist`         | `ChecklistWebViewOptions { projectId }`                                                         |
| `platformScripture.manageBooks`              | `ManageBooksWebViewOptions { projectId }`                                                       |

---

## 6. Settings (new — `papi-shared-types` `SettingTypes`)

- `platformEnhancedResources.showMarbleGuide`: `boolean` (default `true`)

---

## 7. New types in extension `.d.ts` files

- **`platform-enhanced-resources.d.ts`** (new file): `EnhancedResourceWebViewOptions`;
  plus the `@papi/core` augmentations above.
- **`platform-scripture.d.ts`**: `FinalVerseNumberSelector`,
  `VersificationProjectInterfaceDataTypes`, `IVersificationProjectDataProvider`,
  `ChecklistMarkerSettings`, `ChecklistComparativeTextRef`, `ChecklistRequest`,
  `ChecklistResultResponse`, `MarkerSettingsValidationResult`,
  `ResolvedComparativeTexts`, `IChecklistService`, plus `ChecklistWebViewOptions` /
  `ManageBooksWebViewOptions`.

---

## 8. `papi.d.ts`

- **No new symbols.** Only JSDoc expansion on pre-existing
  `PapiDockLayout.getAllWebViewDefinitions` and
  `WebViewServiceType.getAllOpenWebViewDefinitions`. (New extension-contributed
  surface lives in the extension `.d.ts` augmentations, not the generated
  `papi.d.ts`.)

---

## 9. `lib/platform-bible-react` `src/index.ts` (new exports)

**Components:** `ProjectSelector`, `SourceLanguageIndexedList`, `LinkedScrRefButton`

**Types:** `ProjectSelectorProject`, `ProjectSelectorOpenTab`,
`ProjectSelectorProjectPair`, `ProjectSelectorLocalizedStrings`, `IndexedListItem`,
`SourceLanguageIndexedListProps`, `SemanticDomain`,
`SourceLanguageIndexedListLocalizedStrings`, `ScopeSelectorVariant`, `ScopeWithRange`

**Consts:** `SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS`, `Z_INDEX_TOOLTIP` (= 550)

**Removed from public surface:** `ManageBooksDialog` (relocated into the
`platform-scripture` extension).

---

## 10. `lib/platform-bible-utils` `src/index.ts` (new exports)

- `DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS` — `const` map of default scroll-group
  letter labels (`'Ø'`, `'A'`–`'Z'`).
- (Additive, non-new-export: `ThemeCssVariables` / `themeDocumentSchema` gained
  optional `success-foreground`, `warning`, `warning-foreground`, `spacing` fields.)

---

## 11. New core/main-process surface (not in `papi.d.ts`)

- **New Electron custom protocol `papi-er://`** for Enhanced Resources binary
  assets (`papi-er://images/{imageId}[?size=full]`), registered by the new
  `enhancedResourceProtocolService`
  (`src/main/services/enhanced-resource-protocol.service.ts`). `papi-er:` added to
  WebView CSP `img-src`/`media-src` (renderable, not fetchable).
- **New shared util module** `src/shared/utils/enhanced-resource.utils.ts` exporting:
  `ENHANCED_RESOURCE_PROTOCOL_NAME`, `EnhancedResourceImageSize`,
  `EnhancedResourceUriInfo`, `parseEnhancedResourceUri`, `getMimeTypeForImageId`.
- **Wire-contract enrichment:** JSON-RPC error responses now propagate a
  machine-readable `platformErrorCode` through `network.service`, so thrown
  `PlatformError`s carry a `code` sourced from the C# backend. (No new exported
  symbol; behavioral contract change.)

---

## Net-new surface summary

- **2** network objects (19 methods total)
- **1** new PDP projectInterface, `platformScripture.Versification` (9 methods incl. subscribes)
- **1** network event
- **5** new commands (+ 1 type-only correction to `openFind`, **not** a break)
- **3** web view providers
- **1** setting
- **1** new Electron protocol (`papi-er://`) + new shared util module
- **~12** new `platform-bible-react` exports; **1** new `platform-bible-utils` export
- **~18** new extension `.d.ts` types

**No breaking changes** to any pre-existing public API in this set — the surface
is purely additive (the `openFind` declaration change is a correction to match
existing runtime behavior).

---

## 12. Addendum — re-scan 2026-06-15: PR #2380 (Experimental API flag + network-event infrastructure)

The rebase pulled in `167473597a` "Experimental API flag for PAPI surfaces (TSDoc

- OpenRPC) (#2380)", a large additive infrastructure PR (≈49 files). It introduces
  a uniform `experimental` marker and a centrally-registered network-event system.
  Design lives in `docs/superpowers/specs/2026-06-08-experimental-api-flag-design.md`.

### 12a. Experimental marker convention (new, informational-only)

- **TSDoc `@experimental`** modifier tag — applied to types/interface members/
  augmentation entries; cascades to members; shows in IDE tooltips + TypeDoc.
- **OpenRPC `'x-experimental': true`** — vendor extension on `Method`,
  `OpenRpcNotification`, `NetworkObjectDocumentation`, and JSON Schema objects; shows
  in the live OpenRPC document (`rpc.discover`).
- **`isExperimental?: boolean`** — menus model field (parallels `isExtensible`).

### 12b. New network-event registry types (`papi-shared-types` → `papi.d.ts`)

- `MultiSourceNetworkEvents` — **closed** type alias; platform events emitted from
  multiple processes: `network-object.onDidCreateNetworkObject`,
  `network-object.onDidDisposeNetworkObject`, `shared-store.onDidChange`.
- `NetworkEvents` — **augmentable** interface `extends MultiSourceNetworkEvents`;
  the registry extensions augment to declare their own events.
- `NetworkEventTypes` = `keyof NetworkEvents`.

### 12c. New network-event API (`network.service.ts` → `papi.network`, `papi.d.ts`)

- `createNetworkEventEmitterAsync<EventType extends NetworkEventTypes>(eventType, documentation?)`
  — central-registered emitter creator; OpenRPC-visible when documentation passed.
- `createNetworkEventEmitter<T>` — now **`@deprecated`** (signature unchanged).
- `getNetworkEvent<EventType>(eventType)` — new typed overload (+ deprecated
  explicit-`<T>` fallback overload).
- `NetworkEventBuffer<T>` (class), `NetworkEventBufferStrategy<T>` (type),
  `createBufferedNetworkEventEmitter<EventType>(...)` — buffered-emitter helpers.
- `createCoreMultiSourceEventEmitter<...>(...)` + `InternalMultiSourceNetworkEvents`
  (type) — core-only multi-source emitter path.
- `MULTI_SOURCE_EVENT_NAMES` const (re-exported) + new module
  `src/shared/data/network-event-names.ts`.
- Wire: new `REGISTER_EVENT` RPC method; `rpcEventDetailsByEventName` registry; new
  module `src/main/services/rpc-event-registry.ts`.

### 12d. New OpenRPC model types (`src/shared/models/openrpc.model.ts`)

- `OpenRpcNotification = Omit<Method, 'result'>` (type).
- `SingleNotificationDocumentation` (type).
- `Method` and `NetworkObjectDocumentation` gain optional `'x-experimental'`; root
  `OpenRpc.methods` is now `(Method | OpenRpcNotification)[]`.

### 12e. Additive registration-signature changes (for the `x-experimental` param)

- `dataProviderService.registerEngine` / `registerEngineByType` — new
  `NetworkObjectDocumentation` parameter.
- `webViewProviderService.registerWebViewProvider` — new `attributes?` + new
  `documentation?` parameters.
- `registerProjectDataProviderEngineFactory` — new `attributes?` + `documentation?`
  parameters; factory `createProjectDataProviderEngine` may now return
  `{ projectDataProviderEngine, attributes?, documentation? }` (discriminated union).
- `registerCommand` 3rd-param `method` and `networkObjects.set` 5th-param gain
  `'x-experimental'`.

### 12f. Menus model (`platform-bible-utils`)

- `isExperimental?: boolean` added to `OrderedExtensibleContainer`,
  `ColumnsWithHeaders`, `WebViewMenu` (+ matching JSON Schema). Part of the
  experimental mechanism itself.

### 12g. New `internal` library entry points (`platform-bible-react`, `platform-bible-utils`)

- New `./internal` export in each package's `package.json` resolving to new
  `src/internal.ts` files. Documented as an **unstable API surface** ("NO stability
  guarantee — symbols may change shape, move, or disappear at any time"). Currently
  empty (`export {}`) on `ai/main`. This is the home for non-stable library exports.

### 12h. Relationship to this PR's labeling work

PR #2380 deliberately **deferred** the backfill of `@experimental` onto
already-experimental APIs to a follow-up. The labeling branch produced from this doc
**is** that backfill, scoped to the ai/main feature additions catalogued in §1–§11.
The §12 infrastructure itself is explicitly **excluded** from being marked
experimental (it is the mechanism, not a feature surface), as are the pre-existing
`MultiSourceNetworkEvents` / `NetworkEvents` events and `createNetworkEventEmitterAsync`.
