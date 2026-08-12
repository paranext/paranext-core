# Open Find from any scripture tab type (PT-4341) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Ctrl+F open the Find panel with the correct source (the displayed resource) when invoked from the model-text, Bible-texts, and commentaries tabs, bringing a single Find tab to the front in Column 3.

**Architecture:** `openFind` gains an explicit `sourceProjectId` (the displayed resource, since a panel's definition `projectId` is its container project, not the resource on screen) and only forwards `editorWebViewId` to Find for real scripture-editor tabs (panels register no controller, so a panel id would hang Find's `useWebViewController`). Each panel web view adds a Ctrl+F handler that passes its displayed-resource id. A Find tab is seeded into the Simple-mode Column-3 layout so the existing `existingId: '?'` + `bringToFront` path focuses it in place.

**Tech Stack:** TypeScript, React, PAPI (`@papi/frontend`, `@papi/backend`, `@papi/core`), Vitest, rc-dock. No .NET changes.

## Global Constraints

- **Design source of truth:** `docs/specs/2026-08-12-find-from-any-tab-design.md`. Every task implements part of it.
- **TDD:** logic/behavior changes are RED→GREEN→REFACTOR. Pure-UI wiring (the keydown listeners) may be component-first, but their extracted decision logic is unit-tested first.
- **`WebViewProps` exposes the web view id as `id`** — destructure `id: webViewId` (not `webViewId`).
- **macOS uses ⌃F (Ctrl, not ⌘F)** intentionally, matching the existing scripture-editor handler.
- **Find source constant:** the Find web view type is the literal `'platformScripture.find'` (value of `findWebViewType` in `extensions/src/platform-scripture/src/find.web-view-provider.ts`). The renderer cannot import the extension constant, so `simple-layout.data.ts` uses the literal with a comment.
- **Scripture editor web view type:** the literal `'platformScriptureEditor.react'`.
- **Keyboard-shortcut catalog rule:** any change to a keyboard handler must update `src/stories/keyboard-shortcuts.data.ts` in the same change.
- **Pre-commit hooks run the linters — never bypass with `--no-verify`.**
- **Type propagation:** command signatures live in `extensions/src/platform-scripture/src/types/platform-scripture.d.ts` (hand-edited source) AND the generated `lib/papi-dts/papi.d.ts`; both are in extension `typeRoots`, so after editing the source `.d.ts` you MUST run `npm run build:types` to regenerate `papi.d.ts`, or typecheck reports a conflicting `openFind` signature and other extensions won't see the new param.
- **Running a single test** (the compound `npm test` script + split vitest configs make `npm test -- <file>` unreliable — prefer the `test-runner` skill, or):
  - Root tests (`src/**`, e.g. `simple-layout.data.test.ts`): `npx vitest run <file>` from the repo root (uses `vitest.config.ts`, jsdom).
  - Extension tests (`extensions/src/**`, e.g. `open-find.utils.test.ts`, `find-trigger.util.test.ts`): `cd extensions && npx vitest run <file>` (uses `extensions/vitest.config.ts`, node env).
  - The shell's working directory persists between commands: after a `cd extensions && …` (or `cd extensions/src/… && …`) step, `cd` back to the repo root before running a root-scoped command.
- **Per-file `npx eslint` on extension files is unreliable** (extension-local tsconfig/project). The authoritative lint is `npm run lint` (repo root, Task 5); it also runs `build:types` first.
- **Final gate before the last commit:** `npm run typecheck && npm run lint && npm test` (repo root).

## File Structure

| File | Responsibility | Task |
| --- | --- | --- |
| `extensions/src/platform-scripture/src/find/open-find.utils.ts` (new) | Pure resolver: source projectId + `editorWebViewId` type-gate | 1 |
| `extensions/src/platform-scripture/src/find/open-find.utils.test.ts` (new) | Unit tests for the resolver | 1 |
| `extensions/src/platform-scripture/src/main.ts` (modify) | `openFind` uses the resolver; new `sourceProjectId` param + metadata | 1 |
| `extensions/src/platform-scripture/src/types/platform-scripture.d.ts` (modify) | `openFind` command signature + TSDoc | 1 |
| `lib/papi-dts/papi.d.ts` (regenerated via `npm run build:types`) | Aggregated PAPI types — must stay in sync with the source `.d.ts` | 1 |
| `src/renderer/components/docking/simple-layout.data.ts` (modify) | Seed Find tab in Column 3 | 2 |
| `src/renderer/components/docking/simple-layout.data.test.ts` (modify) | Assert 4 col-3 tabs / 6 web view types | 2 |
| `extensions/src/platform-scripture-editor/src/find-trigger.util.ts` (new) | Pure decision: open Find (and with what) or no-op | 3 |
| `extensions/src/platform-scripture-editor/src/find-trigger.util.test.ts` (new) | Unit tests for the decision | 3 |
| `extensions/src/platform-scripture-editor/src/model-text-panel.web-view.tsx` (modify) | Ctrl+F handler for the model-text panel | 3 |
| `extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx` (modify) | Ctrl+F handler for Bible-texts + commentaries | 4 |
| `src/stories/keyboard-shortcuts.data.ts` (modify) | Extend the `scripture-find` catalog entry | 4 |

---

### Task 1: `openFind` — explicit source projectId + `editorWebViewId` type-gate

**Files:**
- Create: `extensions/src/platform-scripture/src/find/open-find.utils.ts`
- Test: `extensions/src/platform-scripture/src/find/open-find.utils.test.ts`
- Modify: `extensions/src/platform-scripture/src/main.ts` (function `openFind` ~lines 283-338; command metadata ~lines 670-694)
- Modify: `extensions/src/platform-scripture/src/types/platform-scripture.d.ts` (~lines 2500-2513)

**Interfaces:**
- Produces: `resolveFindInvocation(webViewDefinition, editorWebViewId, sourceProjectId) → { projectId, editorScrollGroupId, tabIdFromWebViewId, editorWebViewIdForFind }`; exported const `SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react'`; type `FindTriggerWebViewDefinition`.
- Produces: command `platformScripture.openFind(editorWebViewId?, selectedText?, sourceProjectId?)` — Tasks 3 & 4 call it with all three args.

- [ ] **Step 1: Write the failing test** — `extensions/src/platform-scripture/src/find/open-find.utils.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import {
  resolveFindInvocation,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from './open-find.utils';

describe('resolveFindInvocation', () => {
  const editorDef = {
    id: 'wv-editor',
    projectId: 'proj-container',
    webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    scrollGroupScrRef: 0,
  };
  const panelDef = {
    id: 'wv-panel',
    projectId: 'proj-container',
    webViewType: 'platformScriptureEditor.bibleTexts',
    scrollGroupScrRef: undefined,
  };

  it('uses the definition projectId when no explicit source is given (editor path)', () => {
    expect(resolveFindInvocation(editorDef, 'wv-editor', undefined).projectId).toBe('proj-container');
  });

  it('prefers the explicit source projectId over the definition projectId (panel path)', () => {
    expect(resolveFindInvocation(panelDef, 'wv-panel', 'resource-proj').projectId).toBe('resource-proj');
  });

  it('forwards editorWebViewId only for the scripture editor web view type', () => {
    expect(resolveFindInvocation(editorDef, 'wv-editor', undefined).editorWebViewIdForFind).toBe('wv-editor');
  });

  it('does NOT forward editorWebViewId for a non-editor panel (prevents the controller hang)', () => {
    expect(resolveFindInvocation(panelDef, 'wv-panel', 'resource-proj').editorWebViewIdForFind).toBeUndefined();
  });

  it('passes through scroll group and triggering tab id', () => {
    const r = resolveFindInvocation(editorDef, 'wv-editor', undefined);
    expect(r.editorScrollGroupId).toBe(0);
    expect(r.tabIdFromWebViewId).toBe('wv-editor');
  });

  it('returns undefined projectId when neither source nor definition has one', () => {
    expect(resolveFindInvocation(undefined, undefined, undefined).projectId).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd extensions && npx vitest run open-find.utils.test.ts`
Expected: FAIL — cannot resolve `./open-find.utils` / `resolveFindInvocation is not a function`.

- [ ] **Step 3: Write the resolver** — `extensions/src/platform-scripture/src/find/open-find.utils.ts`

```ts
import type { ScrollGroupScrRef } from '@papi/core';

/**
 * Web view type of the Scripture editor / Resource viewer. Kept as a literal (this extension does
 * not import the platform-scripture-editor constant) — it must equal `SCRIPTURE_EDITOR_WEBVIEW_TYPE`
 * in `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts`.
 */
export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/** The subset of a web view definition that `openFind` reads to decide what to open. */
export interface FindTriggerWebViewDefinition {
  id?: string;
  projectId?: string;
  webViewType?: string;
  scrollGroupScrRef?: ScrollGroupScrRef;
}

export interface ResolvedFindInvocation {
  /** Project/resource to search. */
  projectId: string | undefined;
  /** Scroll group the Find panel should follow. */
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  /** Id of the triggering tab; used for power-mode placement (`targetTabId`). */
  tabIdFromWebViewId: string | undefined;
  /**
   * Editor web view id forwarded to Find — ONLY when the trigger is a real scripture editor.
   * Read-only panels register no web view controller, so passing their id would make Find's
   * `useWebViewController('platformScriptureEditor.react', id)` hang ~20s and then log an
   * unhandled rejection. `undefined` for any non-editor trigger.
   */
  editorWebViewIdForFind: string | undefined;
}

/** Resolve everything `openFind` needs from the triggering web view + the optional explicit source. */
export function resolveFindInvocation(
  webViewDefinition: FindTriggerWebViewDefinition | undefined,
  editorWebViewId: string | undefined,
  sourceProjectId: string | undefined,
): ResolvedFindInvocation {
  return {
    projectId: sourceProjectId ?? webViewDefinition?.projectId,
    editorScrollGroupId: webViewDefinition?.scrollGroupScrRef,
    tabIdFromWebViewId: webViewDefinition?.id,
    editorWebViewIdForFind:
      webViewDefinition?.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE ? editorWebViewId : undefined,
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd extensions && npx vitest run open-find.utils.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Wire the resolver into `openFind`** — `extensions/src/platform-scripture/src/main.ts`

Add the import near the other `./find/...` imports (note the `type` modifier — the repo enforces `consistent-type-imports`):

```ts
import { resolveFindInvocation, type FindTriggerWebViewDefinition } from './find/open-find.utils';
```

Replace the head of `openFind` (the signature through the `options` object) with:

```ts
async function openFind(
  editorWebViewId: string | undefined,
  selectedText?: string,
  sourceProjectId?: string,
): Promise<string | undefined> {
  logger.debug('Opening find UI');

  let webViewDefinition: FindTriggerWebViewDefinition | undefined;
  if (editorWebViewId) {
    webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
  }

  const { projectId, editorScrollGroupId, tabIdFromWebViewId, editorWebViewIdForFind } =
    resolveFindInvocation(webViewDefinition, editorWebViewId, sourceProjectId);

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  const options: FindWebViewOptions = {
    projectId,
    editorScrollGroupId,
    bringToFront: true,
    editorWebViewId: editorWebViewIdForFind,
    initialSearchText: selectedText,
  };
```

Leave the rest of `openFind` (the open-existing / reload / open-new block using `findWebViewId`, `options`, `tabIdFromWebViewId`) unchanged.

- [ ] **Step 6: Add the `sourceProjectId` param to the command metadata** — same file, `platformScripture.openFind` registration (after the `selectedText` param object):

```ts
        {
          name: 'sourceProjectId',
          required: false,
          summary:
            'Explicit project/resource id to search, overriding the project resolved from the triggering web view. Used when the triggering tab displays a resource whose id differs from the tab’s own project (model text, Bible texts, commentaries panels).',
          schema: { type: 'string' },
        },
```

- [ ] **Step 7: Update the command type signature** — `extensions/src/platform-scripture/src/types/platform-scripture.d.ts`

Add a `@param sourceProjectId` line to the TSDoc block above `'platformScripture.openFind'` and replace the signature:

```ts
    'platformScripture.openFind': (
      editorWebViewId?: string | undefined,
      selectedText?: string | undefined,
      sourceProjectId?: string | undefined,
    ) => Promise<string | undefined>;
```

TSDoc line to add (below the existing `@param selectedText` line):

```
     * @param sourceProjectId Explicit project/resource id to search, overriding the project
     *   resolved from `editorWebViewId`. Passed by resource panels (model text, Bible texts,
     *   commentaries) whose displayed resource differs from the tab's own project.
```

- [ ] **Step 8: Regenerate the aggregated types, then typecheck and re-run the unit test**

Run: `npm run build:types`
Expected: succeeds — regenerates `lib/papi-dts/papi.d.ts` so the 3-arg `openFind` signature matches the source `.d.ts` (required before the next typecheck, and before Tasks 3-4 can typecheck the 3-arg `sendCommand`).
Run: `npm run typecheck`
Expected: no errors (in particular, no "conflicting declaration" on `platformScripture.openFind`).
Run: `cd extensions && npx vitest run open-find.utils.test.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add extensions/src/platform-scripture/src/find/open-find.utils.ts \
        extensions/src/platform-scripture/src/find/open-find.utils.test.ts \
        extensions/src/platform-scripture/src/main.ts \
        extensions/src/platform-scripture/src/types/platform-scripture.d.ts \
        lib/papi-dts/papi.d.ts
git commit -m "feat(find): let openFind take an explicit source projectId and gate editorWebViewId to editors"
```

(Include the regenerated `lib/papi-dts/papi.d.ts` from Step 8 — it is a generated artifact, but the repo commits it so downstream typechecks stay in sync. Do not hand-edit it.)

---

### Task 2: Seed the Find tab into the Simple-mode Column-3 layout

**Files:**
- Modify: `src/renderer/components/docking/simple-layout.data.ts` (Column 3 `tabs` array, ~lines 66-97)
- Modify: `src/renderer/components/docking/simple-layout.data.test.ts` (~lines 46-51 and 74-92)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: a Column-3 tab whose `data.webViewType === 'platformScripture.find'` — the existing `openFind` bring-to-front path (`existingId: '?'`) relies on this being present.

- [ ] **Step 1: Update the tests first (RED)** — `simple-layout.data.test.ts`

Change the `column 3 has exactly 3 tabs` test to 4:

```ts
    it('column 3 has exactly 4 tabs', () => {
      // Narrowing column to BoxData and its first child to PanelData to access tabs.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const col3Panel = (columns[2] as BoxData).children[0] as PanelData;
      expect(col3Panel.tabs).toHaveLength(4);
    });
```

Rename `contains the five expected webViewType strings` to six and add the Find assertion:

```ts
    it('contains the six expected webViewType strings', () => {
      const allWebViewTypes: string[] = [];
      columns.forEach((col) => {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        panel.tabs.forEach((tab) => {
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const data = (tab as unknown as SavedTabInfo).data as { webViewType?: string };
          if (data?.webViewType) allWebViewTypes.push(data.webViewType);
        });
      });
      expect(allWebViewTypes).toContain('platformScriptureEditor.modelText');
      expect(allWebViewTypes).toContain('platformScriptureEditor.react');
      expect(allWebViewTypes).toContain('platformScriptureEditor.bibleTexts');
      expect(allWebViewTypes).toContain('platformScriptureEditor.commentaries');
      expect(allWebViewTypes).toContain('legacyCommentManager.commentListPanel');
      expect(allWebViewTypes).toContain('platformScripture.find');
    });
```

- [ ] **Step 2: Run the tests to verify they fail (RED)**

Run: `npx vitest run simple-layout.data.test.ts` (from the repo root — this is a `src/**` test on the root vitest config)
Expected: FAIL — col-3 has 3 tabs, and `platformScripture.find` is not present.

- [ ] **Step 3: Add the Find tab** — `simple-layout.data.ts`, append after the `legacyCommentManager.commentListPanel` tab object (still inside the Column-3 `tabs` array):

```ts
              {
                id: 'f1e2d3c4-b5a6-4789-9c0d-1e2f3a4b5c6d',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  // Literal because the renderer cannot import the extension's `findWebViewType`.
                  // Must equal `findWebViewType` in
                  // extensions/src/platform-scripture/src/find.web-view-provider.ts.
                  webViewType: 'platformScripture.find',
                  id: 'f1e2d3c4-b5a6-4789-9c0d-1e2f3a4b5c6d',
                  contentType: 'react',
                  state: {},
                },
              },
```

- [ ] **Step 4: Run the tests to verify they pass (GREEN)**

Run: `npx vitest run simple-layout.data.test.ts` (from the repo root)
Expected: PASS (all `simpleLayout` tests, including the unique-ids test).

- [ ] **Step 5: Commit**

```bash
git add src/renderer/components/docking/simple-layout.data.ts \
        src/renderer/components/docking/simple-layout.data.test.ts
git commit -m "feat(find): seed a Find tab in the Simple-mode Column 3 layout (NN 1C layout, landed early via 1A)"
```

---

### Task 3: Shared trigger helper + model-text panel Ctrl+F

**Files:**
- Create: `extensions/src/platform-scripture-editor/src/find-trigger.util.ts`
- Test: `extensions/src/platform-scripture-editor/src/find-trigger.util.test.ts`
- Modify: `extensions/src/platform-scripture-editor/src/model-text-panel.web-view.tsx`

**Interfaces:**
- Consumes: `platformScripture.openFind(editorWebViewId?, selectedText?, sourceProjectId?)` (Task 1).
- Produces: `getOpenFindTriggerArgs(webViewId, displayedResourceProjectId, selectedText) → { webViewId, selectedText, sourceProjectId } | undefined` — reused by Task 4.

- [ ] **Step 1: Write the failing test** — `find-trigger.util.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { getOpenFindTriggerArgs } from './find-trigger.util';

describe('getOpenFindTriggerArgs', () => {
  it('returns args when a resource is displayed', () => {
    expect(getOpenFindTriggerArgs('wv-1', 'res-proj', 'dog')).toEqual({
      webViewId: 'wv-1',
      selectedText: 'dog',
      sourceProjectId: 'res-proj',
    });
  });

  it('is a no-op (undefined) when no resource is displayed', () => {
    expect(getOpenFindTriggerArgs('wv-1', undefined, 'dog')).toBeUndefined();
  });

  it('is a no-op (undefined) when the web view id is missing', () => {
    expect(getOpenFindTriggerArgs(undefined, 'res-proj', '')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd extensions && npx vitest run find-trigger.util.test.ts`
Expected: FAIL — cannot resolve `./find-trigger.util`.

- [ ] **Step 3: Write the helper** — `find-trigger.util.ts`

```ts
/**
 * Arguments for the `platformScripture.openFind` command when Ctrl+F is pressed in a resource /
 * model-text panel: the triggering panel's web view id, the current text selection, and the
 * displayed resource's project id (the search source).
 */
export interface OpenFindTriggerArgs {
  webViewId: string;
  selectedText: string;
  sourceProjectId: string;
}

/**
 * Decide whether Ctrl+F in a resource / model-text panel should open Find, and with what arguments.
 * Returns `undefined` (a no-op) when no resource is currently displayed — Find must never fall back
 * to searching the panel's container project.
 */
export function getOpenFindTriggerArgs(
  webViewId: string | undefined,
  displayedResourceProjectId: string | undefined,
  selectedText: string,
): OpenFindTriggerArgs | undefined {
  if (!webViewId || !displayedResourceProjectId) return undefined;
  return { webViewId, selectedText, sourceProjectId: displayedResourceProjectId };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd extensions && npx vitest run find-trigger.util.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Add `webViewId` to the model-text panel props** — `model-text-panel.web-view.tsx`, change the component signature (~line 45):

```tsx
globalThis.webViewComponent = function ModelTextPanelWebView({
  id: webViewId,
  projectId,
  scrollGroupScrRef,
  updateWebViewDefinition,
}: WebViewProps) {
```

- [ ] **Step 6: Import the helper** — same file, near the other `./` imports:

```ts
import { getOpenFindTriggerArgs } from './find-trigger.util';
```

- [ ] **Step 7: Add the Ctrl+F handler** — same file, add this `useEffect` after the dynamic-title effect (after the block ending ~line 130, and after `modelResourceProjectId` is defined ~line 108). `papi`, `logger`, `getErrorMessage`, and `useEffect` are already imported.

```tsx
  // Ctrl+F opens Find for the MODEL RESOURCE shown in this panel (the resource's project id, not
  // this panel's own editable project). No-op while no resource is resolved so Find never falls
  // back to the container project. macOS intentionally uses Ctrl (not Cmd), matching the editor.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey || event.key.toLowerCase() !== 'f') return;
      event.preventDefault();
      const args = getOpenFindTriggerArgs(
        webViewId,
        modelResourceProjectId,
        window.getSelection()?.toString() ?? '',
      );
      if (!args) return;
      papi.commands
        .sendCommand(
          'platformScripture.openFind',
          args.webViewId,
          args.selectedText,
          args.sourceProjectId,
        )
        .catch((e) => logger.warn(`Failed to open Find from model text panel: ${getErrorMessage(e)}`));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [webViewId, modelResourceProjectId]);
```

- [ ] **Step 8: Typecheck the extension and run the helper test**

Run: `cd extensions/src/platform-scripture-editor && npx tsc -p ./tsconfig.json`
Expected: no errors. This requires Task 1's `npm run build:types` to have run (so the 3-arg `openFind` is visible to this extension). If `react-hooks/exhaustive-deps` later objects to `modelResourceProjectId` at lint time, it is a primitive already listed in the deps — no change needed. (Authoritative lint is `npm run lint` in Task 5.)
Run: `cd extensions && npx vitest run find-trigger.util.test.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/find-trigger.util.ts \
        extensions/src/platform-scripture-editor/src/find-trigger.util.test.ts \
        extensions/src/platform-scripture-editor/src/model-text-panel.web-view.tsx
git commit -m "feat(find): open Find from the model text panel with the displayed resource as source"
```

---

### Task 4: Bible-texts + commentaries panel Ctrl+F, and keyboard-shortcuts catalog

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx`
- Modify: `src/stories/keyboard-shortcuts.data.ts` (~lines 197-208)

**Interfaces:**
- Consumes: `getOpenFindTriggerArgs` (Task 3) and `platformScripture.openFind` (Task 1).

- [ ] **Step 1: Add `webViewId` to the resource-text panel props** — `resource-text-panel.web-view.tsx`, change the component signature (~line 155):

```tsx
globalThis.webViewComponent = function ResourceTextPanel({
  id: webViewId,
  projectId,
  updateWebViewDefinition,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
```

- [ ] **Step 2: Import the helper** — same file, near the other `./` imports:

```ts
import { getOpenFindTriggerArgs } from './find-trigger.util';
```

- [ ] **Step 3: Add the Ctrl+F handler** — same file, add this `useEffect` after `resourceProjectId` is computed (after the `if (isDblResourceReference(selectedRef)) { ... }` block ~line 335, and after `useCommentaryMarkerStyles(resourceProjectId)` ~line 350) and BEFORE the first early return (~line 538, so the hook always runs). `papi`, `logger`, `getErrorMessage`, and `useEffect` are already imported.

```tsx
  // Ctrl+F opens Find for the RESOURCE shown in this panel (Bible text or commentary) — the
  // selected resource's project id, not this panel's own container project. No-op while no
  // resource is resolved. macOS intentionally uses Ctrl (not Cmd), matching the editor.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey || event.key.toLowerCase() !== 'f') return;
      event.preventDefault();
      const args = getOpenFindTriggerArgs(
        webViewId,
        resourceProjectId,
        window.getSelection()?.toString() ?? '',
      );
      if (!args) return;
      papi.commands
        .sendCommand(
          'platformScripture.openFind',
          args.webViewId,
          args.selectedText,
          args.sourceProjectId,
        )
        .catch((e) => logger.warn(`Failed to open Find from resource panel: ${getErrorMessage(e)}`));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [webViewId, resourceProjectId]);
```

Note: `resourceProjectId` is a `let` reassigned in the `if/else` above. If `react-hooks/exhaustive-deps` objects, wrap its computation in a `useMemo` (do NOT drop it from the deps — a stale source is the bug this handler must avoid).

- [ ] **Step 4: Update the keyboard-shortcuts catalog** — `src/stories/keyboard-shortcuts.data.ts`, replace the `scripture-find` entry's `context`, comment, and `locations`:

```ts
  {
    id: 'scripture-find',
    purpose: 'Open the find dialog',
    category: 'Navigation',
    context: 'Scripture editor, model text, Bible text, and commentary web views',
    // macOS intentionally uses ⌃F (not the usual ⌘F) to match the handlers in the scripture editor
    // and the model text / resource panels.
    keys: { macOS: '⌃F', windows: 'Ctrl+F', linux: 'Ctrl+F' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
      'extensions/src/platform-scripture-editor/src/model-text-panel.web-view.tsx',
      'extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx',
    ],
  },
```

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck` (covers both the extension change and the root `keyboard-shortcuts.data.ts`; relies on Task 1's `build:types`)
Expected: no errors. If `react-hooks/exhaustive-deps` flags `resourceProjectId` at lint time (Task 5), wrap its computation in `useMemo` — do not drop it from the deps. (Authoritative lint is `npm run lint` in Task 5.)

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx \
        src/stories/keyboard-shortcuts.data.ts
git commit -m "feat(find): open Find from Bible texts and commentaries panels; update shortcuts catalog"
```

---

### Task 5: Full verification and manual smoke test

**Files:** none (verification only).

- [ ] **Step 1: Repo-wide gate**

Run: `npm run typecheck && npm run lint && npm test`
Expected: all pass, zero lint errors.

- [ ] **Step 2: Manual smoke test (Simple mode)** — start the app (`npm start`), open an editable project so the 3-column Simple layout loads with resources configured, then verify:
  - **Cold-start first invoke:** immediately press Ctrl+F from the scripture editor once. The seeded Column-3 Find tab comes to the front — a *second* Find panel must NOT appear (guards the `existingId: '?'` timing caveat).
  - **Model text tab:** with a model resource shown, focus the Column-1 model-text panel, press Ctrl+F → Find comes to front in Column 3 with the **model resource** as its source and returns results.
  - **Bible text tab:** select a Bible-text resource in the Column-3 Bible-texts panel, press Ctrl+F → Find shows the **selected resource** as source.
  - **Commentary tab:** select a commentary in the commentaries panel, press Ctrl+F → Find shows the **selected commentary** as source.
  - **No-resource no-op:** on a panel with no resource selected (empty/loading state), Ctrl+F does nothing and logs nothing at error level.
  - **No stray panel:** repeatedly invoking Find from different tabs never opens a second Find panel; it re-targets the one Column-3 tab.
  - **Logs clean:** check the renderer log (log-inspector skill) for any `Unhandled rejection ... wait-for-net-obj` — there should be none (confirms the `editorWebViewId` type-gate).

- [ ] **Step 3: Confirm no regression to editor Find** — press Ctrl+F from the scripture editor; Find still opens with the editor's project and in-editor result highlighting still works.

---

## Self-Review

- **Spec coverage:** Source-resolution + `editorWebViewId` gate → Task 1. Ctrl+F triggers for all three panels → Tasks 3 (model text) + 4 (Bible texts, commentaries, shared component). Column-3 placement/bring-to-front → Task 2 (+ existing `openFind` logic). Keyboard catalog → Task 4. Tests → Tasks 1, 3 (unit) + Task 5 (manual/smoke). Out-of-scope items (PT-3216 selection, scroll-group nav, no-resource UX) are documented in the spec, not implemented — intentional.
- **Type consistency:** `resolveFindInvocation` / `FindTriggerWebViewDefinition` / `ResolvedFindInvocation` (Task 1) and `getOpenFindTriggerArgs` / `OpenFindTriggerArgs` (Task 3) are used with identical names/shapes in Tasks 3-4. The command `platformScripture.openFind(editorWebViewId?, selectedText?, sourceProjectId?)` matches its `.d.ts` signature and all call sites.
- **Placeholders:** none — every code step has concrete content.
- **Coordination note carried into commits:** Task 2's message flags the layout change as "NN 1C landed early via 1A" so PT-4342 does not double-add the tab.
