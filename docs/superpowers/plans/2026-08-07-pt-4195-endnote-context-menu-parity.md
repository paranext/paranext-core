# PT-4195 Endnote (`\fe`) Insert + Context-Menu Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Insert > Insert end note (`\fe`) to the Platform.Bible scripture editor as a fourth parallel rail beside footnote/cross-reference/comment, and pin right-click context-menu parity with the Insert menu — [PT-4195](https://paratextstudio.atlassian.net/browse/PT-4195) (WI-8, child of PT-4186).

**Architecture:** All changes live in the `platform-scripture-editor` extension in paranext-core. The editor library (`@eten-tech-foundation/platform-editor`, scripture-editors repo) already fully supports `insertMarker('fe')` (explicit `case "fe":` in `$createNoteChildren` builds `\fr` + optional `\fq` + `\ft`, caller resolves to `defaultFootnoteCaller ?? '+'`) and already exposes the context-menu hook (`EditorOptions.contextMenu`) the web view already uses for the existing three items — **no scripture-editors code changes are expected**. The endnote rail mirrors the cross-reference rail exactly: PAPI command → WebViewController method → `postMessageToWebView` → web-view callback → `editorRef.insertMarker('fe')`.

**Tech Stack:** TypeScript, React (extension web view), PAPI commands/menus, Vitest, Playwright (isolated e2e).

## Global Constraints

- **Q6 gate:** the endnote half is gated on the product owner confirming brief §6 Q6 ("Is Insert > End note in the nice-to-have list? _Suggested: yes — it is cheap_"). No PO answer is recorded in Jira as of 2026-08-07. This plan implements assuming **yes**; do not close PT-4195 until the answer is on the ticket. If the PO declines, revert Task 2's endnote-specific pieces (keep Task 3's parity test with a 3-item expectation) and comment the descope rationale on PT-4195 per the ticket's Definition of Done.
- **No keyboard shortcut for endnote** (PT9 parity: End note has none). Therefore no `src/stories/keyboard-shortcuts.data.ts` change is needed (that catalog rule triggers only on key-handler changes).
- **Never commit `dev-packages.json`** — its `revision` edit is a per-workspace uncommitted working change (PT-4186 workspace rules).
- Locales: `en` + `es` for menu labels. The `%versionHistoryCommit_*%` keys exist in `en` only (existing precedent) — follow it.
- P9 parity references (read-only repo `/home/tj_co/source/repos/Paratext`): Insert-menu order Footnote → Cross-reference → End note (`TextForm.Designer.cs:786-800`); context-menu inserts in the same order (`ScriptureEditorControl.cs:1251-1292`); endnote caller falls back to `+` (`DefaultCallerMapper.cs` `default: return null` → `UsfmSnippetInserter.GetFallbackCaller('f')`); endnotes share the footnote caller sequence and the footnotes pane (`Standard.xslt:441-459`, `StandardNotes.xslt:30` filters `starts-with(@style,'f')`).
- **Accepted parity deviation (record in the PT-4195 closing comment):** P9 always uses caller `+` for `\fe` (its `DefaultCallerMapper` has no `fe` case and P9 has no DefaultEndNoteCaller setting); PT10's library gives `\fe` `nodeOptions.defaultFootnoteCaller ?? '+'`, i.e. it follows the project's footnote-caller setting. Identical for default-configured projects; PT10's behavior is kept deliberately (brief §7 precedent: don't reproduce emergent P9 quirks).
- Pre-commit verification per repo rules: `npm run typecheck && npm run lint && npm test` (no C# changes in this plan; run `dotnet test c-sharp-tests/` once in Task 5 for the full pre-PR sweep).
- Line numbers below are as of paranext-core `standard-view` @ `4bd46750989` and scripture-editors `standard-view-pt-4187` @ `96371402` — treat as anchors, not gospel.

## Base-branch context (why not `main`)

PT-4186 says Phase B1 items branch off `main` after WI-6 (merge execution, PT-4191). WI-6 has **not** landed (status Doing), so per the implementation owner's direction this work branches off the live integration branches instead: paranext-core `origin/standard-view` (tip `4bd46750989`, clean) and scripture-editors `standard-view-pt-4187` **committed** tip `96371402` (its working tree holds ~20 uncommitted display-run files that a worktree correctly leaves behind). The PR opens as **draft targeting `standard-view`**; after WI-6 merges, rebase/retarget onto `main` per the Phase B rules.

---

### Task 1: Workspace setup — worktrees, links, baseline

**Files:**

- Create: `~/source/repos/workspaces/standard-view-pt-4195/paranext-core` (git worktree, new branch `standard-view-pt-4195` off `origin/standard-view`)
- Create: `~/source/repos/workspaces/standard-view-pt-4195/scripture-editors` (git worktree, new branch `standard-view-pt-4195` off commit `96371402`)
- Modify (UNCOMMITTED, forever): `standard-view-pt-4195/paranext-core/dev-packages.json`
- Copy + commit: this plan file into the new core worktree at `docs/superpowers/plans/2026-08-07-pt-4195-endnote-context-menu-parity.md`

**Interfaces:**

- Produces: a buildable workspace where `npm test`, `npm run typecheck`, `npm run lint` pass at baseline; all later tasks run inside `~/source/repos/workspaces/standard-view-pt-4195/paranext-core`.

- [ ] **Step 1: Create the worktrees**

```bash
mkdir -p ~/source/repos/workspaces/standard-view-pt-4195
git -C ~/source/repos/workspaces/standard-view/paranext-core fetch origin
git -C ~/source/repos/workspaces/standard-view/paranext-core worktree add \
  ~/source/repos/workspaces/standard-view-pt-4195/paranext-core \
  -b standard-view-pt-4195 origin/standard-view
git -C ~/source/repos/workspaces/standard-view/scripture-editors worktree add \
  ~/source/repos/workspaces/standard-view-pt-4195/scripture-editors \
  -b standard-view-pt-4195 96371402
```

- [ ] **Step 2: Push the scripture-editors branch so `link-dev-packages` can pull it** (in the scripture-editors clone, `origin` = eten-tech-foundation)

```bash
git -C ~/source/repos/workspaces/standard-view-pt-4195/scripture-editors push -u origin standard-view-pt-4195
```

- [ ] **Step 3: Point the core worktree at the sibling editor branch (uncommitted working change)**

In `~/source/repos/workspaces/standard-view-pt-4195/paranext-core/dev-packages.json` change `"revision": "platform-yalc"` → `"revision": "standard-view-pt-4195"`. **Never commit this file.**

- [ ] **Step 4: Install + link**

```bash
cd ~/source/repos/workspaces/standard-view-pt-4195/paranext-core
npm install   # runs link-dev-packages: pulls the SE branch, builds, yalc-links platform-editor + utilities
```

The link script refuses if the scripture-editors worktree has working changes — it is fresh, so it is clean. If any scripture-editors command must be run by hand, use `env -u _VOLTA_TOOL_RECURSION volta run pnpm <cmd>` (volta recursion workaround) and check exit codes, not output tails.

- [ ] **Step 5: Baseline verification (before any change)**

```bash
npm run typecheck && npm run lint && npm test
```

Expected: green. If the scripture-editors base `96371402` shows unrelated breakage through the linked packages, fall back to basing the SE worktree on `origin/standard-view` (eten-tech-foundation integration branch) instead and repeat Steps 2–5 — record which base was used in the PR body.

- [ ] **Step 6: Copy this plan into the new worktree and commit it**

```bash
cp ~/source/repos/workspaces/standard-view/paranext-core/docs/superpowers/plans/2026-08-07-pt-4195-endnote-context-menu-parity.md \
   docs/superpowers/plans/
git add docs/superpowers/plans/2026-08-07-pt-4195-endnote-context-menu-parity.md
git commit -m "docs(scripture-editor): PT-4195 endnote + context-menu parity plan"
```

- [ ] **Step 7: Transition PT-4195 to Doing** (Atlassian MCP `transitionJiraIssue`; it is currently 🔖 ToDo — single transition to 🏗️ Doing).

---

### Task 2: Endnote command rail — Insert menu → command → web view → `insertMarker('fe')`

**Files:**

- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json` (en ~:83-86 block, es ~:212-215 block)
- Modify: `extensions/src/platform-scripture-editor/contributions/menus.json:147-164`
- Modify: `extensions/src/platform-scripture-editor/src/types/platform-scripture-editor.d.ts` (:72-75, :386-394, :799-825)
- Modify: `extensions/src/platform-scripture-editor/src/main.ts` (:150-167 area, :764-773 area, :1115-1136 area, :1437-1439 area)
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` (:165-188, :1149-1180 area, :1285-1296 area)

**Interfaces:**

- Produces (used by Tasks 3–4):
  - command `'platformScriptureEditor.insertEndnoteAtSelection': (editorWebViewId?: string | undefined) => Promise<void>`
  - controller method `insertEndnoteAtSelection(): Promise<void>`
  - message method literal `'insertEndnoteAtSelection'` on `EditorMessageInsertTextualNoteAtSelection`
  - web-view callback `insertEndnoteAtCurrentSelection: () => Promise<void>` (a `useCallback` in `platform-scripture-editor.web-view.tsx`)
  - localized keys `%webView_platformScriptureEditor_insertEndnoteAtSelection%` ("Insert end note" / "Insertar nota final"), `%versionHistoryCommit_beforeInsertEndnote%` ("Before inserting end note", en only)

Note on TDD shape: the layers touched here (menu JSON, PAPI registration, WebViewController postMessage, inline web-view callback) have no existing unit-test harness in this extension — the behavior is pinned by Task 3's parity unit test and Task 4's e2e. Keep this task to the minimal mirror of the cross-reference rail.

- [ ] **Step 1: Add localized strings.** In `localizedStrings.json`, alphabetically within each block:

`en`:

```json
      "%versionHistoryCommit_beforeInsertEndnote%": "Before inserting end note",
      "%webView_platformScriptureEditor_insertEndnoteAtSelection%": "Insert end note",
```

`es`:

```json
      "%webView_platformScriptureEditor_insertEndnoteAtSelection%": "Insertar nota final",
```

(Wording decided by TJ 2026-08-07: match P9's labels — "End note"/"Insert end note". Note that some existing PT10 strings elsewhere say "Endnote" (`%footnoteEditor_noteType_endNote_label%` = "\*Endnote" in `lib/platform-bible-react/src/localizedStrings.json`); harmonizing those is out of scope. Key names stay camelCase `insertEndnoteAtSelection` — they are code identifiers, not user-visible text.)

- [ ] **Step 2: Add the Insert-menu item in P9 order (endnote 3rd, comment bumped to 4th).** In `menus.json`, in group `platformScriptureEditor.insertTextualNotes`, insert after the cross-reference item and change the comment item's order from 3 to 4:

```json
          {
            "label": "%webView_platformScriptureEditor_insertEndnoteAtSelection%",
            "group": "platformScriptureEditor.insertTextualNotes",
            "order": 3,
            "command": "platformScriptureEditor.insertEndnoteAtSelection"
          },
          {
            "label": "%webView_platformScriptureEditor_insertCommentAtSelection%",
            "group": "platformScriptureEditor.insertTextualNotes",
            "order": 4,
            "command": "platformScriptureEditor.insertCommentAtSelection"
          },
```

Do NOT touch the `contextMenu` block at `menus.json:173-176` — the editor's right-click menu is the Lexical `ContextMenuPlugin` fed from `EditorOptions.contextMenu`, not this (empty, unused) PAPI block.

- [ ] **Step 3: Extend the type declarations** in `platform-scripture-editor.d.ts`:

At :72-75:

```ts
/** Tell the editor to insert a textual note (footnote, endnote, or cross-reference) */
export type EditorMessageInsertTextualNoteAtSelection = {
  method:
    | 'insertFootnoteAtSelection'
    | 'insertCrossReferenceAtSelection'
    | 'insertEndnoteAtSelection';
};
```

After `insertCrossReferenceAtSelection()` at :389:

```ts
    /** Function to insert an endnote in the editor at the current selection */
    insertEndnoteAtSelection(): Promise<void>;
```

In `papi-shared-types` `CommandHandlers` after the cross-reference entry (~:815):

```ts
    /**
     * Command to insert an endnote into a given editor web view.
     *
     * @param editorWebViewId The ID of the web view to insert the endnote for
     */
    'platformScriptureEditor.insertEndnoteAtSelection': (
      editorWebViewId?: string | undefined,
    ) => Promise<void>;
```

- [ ] **Step 4: Mirror the cross-reference rail in `main.ts`** (three additions plus disposal):

Handler (after `insertCrossReferenceAtSelection` at :167):

```ts
async function insertEndnoteAtSelection(webViewId: string | undefined): Promise<void> {
  logger.debug('Inserting endnote...');

  if (!webViewId) {
    throw new Error('No WebView ID provided!');
  }

  const webViewController = await papi.webViews.getWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    webViewId,
  );

  if (!webViewController) {
    throw new Error('No web view controller found!');
  }

  await webViewController.insertEndnoteAtSelection();
}
```

Controller method (after the `insertCrossReferenceAtSelection` method at :773):

```ts
      async insertEndnoteAtSelection() {
        const message: EditorWebViewMessage = {
          method: 'insertEndnoteAtSelection',
        };
        await papi.webViewProviders.postMessageToWebView(
          currentWebViewDefinition.id,
          webViewNonce,
          message,
        );
      },
```

Registration (beside the cross-reference registration at :1115):

```ts
const insertEndnotePromise = papi.commands.registerCommand(
  'platformScriptureEditor.insertEndnoteAtSelection',
  insertEndnoteAtSelection,
  {
    method: {
      summary: 'Insert an endnote into the project at the given selection in the editor',
      params: [
        {
          name: 'webViewId',
          required: false,
          summary: 'The ID of the web view tied to the project that we are inserting the endnote',
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        schema: { type: 'null' },
      },
    },
  },
);
```

Disposal — add `await insertEndnotePromise,` beside `await insertCrossReferencePromise,` in `context.registrations.add(...)` (:1437-1439).

- [ ] **Step 5: Web view — strings registration, callback, message case.** In `platform-scripture-editor.web-view.tsx`:

Add to `EDITOR_LOCALIZED_STRINGS` (:165-188): `'%versionHistoryCommit_beforeInsertEndnote%'` (beside the other two versionHistory keys) and `'%webView_platformScriptureEditor_insertEndnoteAtSelection%'` (beside the other three insert keys).

Add the callback directly after `insertCrossReferenceAtCurrentSelection` (:1180), mirroring it exactly:

```tsx
/**
 * Inserts an endnote at the current selection. Shared by the "Insert end note" context-menu item
 * and the top-menu `platformScriptureEditor.insertEndnoteAtSelection` command (via the
 * `webViewMessageListener` effect below). No keyboard shortcut, matching Paratext 9.
 */
const insertEndnoteAtCurrentSelection = useCallback(async () => {
  // Commits a snapshot of the project to the version history
  if (projectId)
    try {
      await papi.commands.sendCommand(
        'paratextBibleSendReceive.commitChanges',
        projectId,
        localizedStrings['%versionHistoryCommit_beforeInsertEndnote%'],
        true,
      );
    } catch (err: unknown) {
      const errMessage = getErrorMessage(err);
      // Requires the `commitChanges` command handler to throw
      // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
      // successfully handle if this command is not implemented in the application version
      if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
        logger.info(errMessage);
      } else {
        logger.warn(
          `Error committing changes to version history before inserting endnote: ${getErrorMessage(err)}`,
        );
      }
    }

  correctEditingNoteKeyAfterInsert(editorRef.current?.insertMarker('fe'));
}, [projectId, localizedStrings, correctEditingNoteKeyAfterInsert]);
```

Add the message-listener case after the cross-reference case (:1292):

```tsx
        case 'insertEndnoteAtSelection': {
          await insertEndnoteAtCurrentSelection();
          break;
        }
```

(The listener effect's dependency array must gain `insertEndnoteAtCurrentSelection` — check the array at the bottom of that `useEffect`.)

- [ ] **Step 6: Verify**

```bash
npm run typecheck && npm run lint
npm test -- extensions/src/platform-scripture-editor
```

Expected: green (no behavior tests exist yet for this rail; this catches type/lint drift).

- [ ] **Step 7: Commit**

```bash
git add extensions/src/platform-scripture-editor
git commit -m "feat(scripture-editor): Insert > Insert end note (\\fe) command rail (PT-4195)"
```

---

### Task 3: Context-menu parity — extracted builder + parity unit test

The ticket requires the right-click menu to "match the Insert menu … snapshot/unit-tested". Today the four `EditorOptions.contextMenu` entries are inline in `web-view.tsx:1193-1210` (footnote, cross-reference, comment) with no test. Extract a pure builder into `platform-scripture-editor.web-view.utils.ts` (the established home for testable web-view helpers) and pin parity against `menus.json` itself, so any future Insert-menu addition without a context-menu twin fails the test.

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.ts` (add function + export)
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` (:1182-1225 — replace inline `contextMenu` array with the builder call)
- Test: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.test.ts`

**Interfaces:**

- Consumes: `insertEndnoteAtCurrentSelection` from Task 2; `ContextMenuOptionConfig` type from `@eten-tech-foundation/platform-editor`.
- Produces:

```ts
export interface InsertContextMenuActions {
  insertFootnote: () => void;
  insertCrossReference: () => void;
  insertEndnote: () => void;
  insertComment: () => void;
}
export function createInsertContextMenuItems(
  localizedStrings: LanguageStrings, // from 'platform-bible-utils', already imported in this file
  actions: InsertContextMenuActions,
  isReadOnly: boolean,
  canUserCreateComments: boolean,
): ContextMenuOptionConfig[];
```

- [ ] **Step 1: Write the failing parity test.** Append to `platform-scripture-editor.web-view.utils.test.ts` (which already has the jsdom pragma and `makeMockEditorRef` patterns):

```ts
describe('createInsertContextMenuItems', () => {
  // Parity contract: the context menu must offer exactly the Insert-menu inserts, in menu order.
  // Read the Insert menu straight from the contribution so a menus.json change without a
  // context-menu twin fails this test.
  const menusJson = JSON.parse(
    readFileSync(join(__dirname, '../contributions/menus.json'), 'utf8'),
  );
  const insertMenuItems: { label: string; order: number }[] = menusJson.webViewMenus[
    'platformScriptureEditor.react'
  ].topMenu.items
    .filter(
      (item: { group: string }) => item.group === 'platformScriptureEditor.insertTextualNotes',
    )
    .sort((a: { order: number }, b: { order: number }) => a.order - b.order);

  const makeActions = () => ({
    insertFootnote: vi.fn(),
    insertCrossReference: vi.fn(),
    insertEndnote: vi.fn(),
    insertComment: vi.fn(),
  });

  // Localized-strings stub: key -> `LOC:<key>` so titles are traceable to keys.
  const strings = Object.fromEntries(
    insertMenuItems.map((item) => [item.label, `LOC:${item.label}`]),
  );

  it('offers exactly the Insert-menu items, localized, in the same order', () => {
    const items = createInsertContextMenuItems(strings, makeActions(), false, true);
    expect(items.map((i) => i.title)).toEqual(insertMenuItems.map((i) => `LOC:${i.label}`));
  });

  it('disables note inserts when read-only and the comment insert per permission', () => {
    const readOnly = createInsertContextMenuItems(strings, makeActions(), true, true);
    expect(readOnly.map((i) => !!i.isDisabled)).toEqual([true, true, true, false]);
    const noCommentPermission = createInsertContextMenuItems(strings, makeActions(), false, false);
    expect(noCommentPermission.map((i) => !!i.isDisabled)).toEqual([false, false, false, true]);
  });

  it('dispatches each item to its matching action', () => {
    const actions = makeActions();
    const items = createInsertContextMenuItems(strings, actions, false, true);
    items.forEach((i) => i.onSelect());
    expect(actions.insertFootnote).toHaveBeenCalledTimes(1);
    expect(actions.insertCrossReference).toHaveBeenCalledTimes(1);
    expect(actions.insertEndnote).toHaveBeenCalledTimes(1);
    expect(actions.insertComment).toHaveBeenCalledTimes(1);
  });
});
```

(Imports to add at top: `readFileSync` from `fs`, `join` from `path`, and `createInsertContextMenuItems` from `./platform-scripture-editor.web-view.utils`. If ESLint restricts `fs` in this folder, fall back to `import menusJson from '../contributions/menus.json'` — `resolveJsonModule` is on for the extensions tsconfig.)

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.test.ts
```

Expected: FAIL — `createInsertContextMenuItems` is not exported.

- [ ] **Step 3: Implement the builder** in `platform-scripture-editor.web-view.utils.ts` (order = Insert-menu order: footnote, cross-reference, endnote, comment; disabled flags copied from the current inline entries at `web-view.tsx:1193-1210`):

```ts
/**
 * Build the editor context-menu insert items. MUST stay in parity with the Insert top-menu
 * (`contributions/menus.json`, group `platformScriptureEditor.insertTextualNotes`) — same items,
 * same order; pinned by the parity test in `platform-scripture-editor.web-view.utils.test.ts`.
 */
export function createInsertContextMenuItems(
  localizedStrings: LanguageStrings,
  actions: InsertContextMenuActions,
  isReadOnly: boolean,
  canUserCreateComments: boolean,
): ContextMenuOptionConfig[] {
  return [
    {
      title: localizedStrings['%webView_platformScriptureEditor_insertFootnoteAtSelection%'],
      onSelect: actions.insertFootnote,
      isDisabled: isReadOnly,
    },
    {
      title: localizedStrings['%webView_platformScriptureEditor_insertCrossReferenceAtSelection%'],
      onSelect: actions.insertCrossReference,
      isDisabled: isReadOnly,
    },
    {
      title: localizedStrings['%webView_platformScriptureEditor_insertEndnoteAtSelection%'],
      onSelect: actions.insertEndnote,
      isDisabled: isReadOnly,
    },
    {
      title: localizedStrings['%webView_platformScriptureEditor_insertCommentAtSelection%'],
      onSelect: actions.insertComment,
      isDisabled: !canUserCreateComments,
    },
  ];
}
```

- [ ] **Step 4: Run the test to verify it passes**

Same command as Step 2. Expected: PASS.

- [ ] **Step 5: Swap the web view to the builder.** In `web-view.tsx` `options` memo (:1182-1225) replace the inline `contextMenu: [ ... ]` array with:

```tsx
      contextMenu: createInsertContextMenuItems(
        localizedStrings,
        {
          insertFootnote: insertFootnoteAtCurrentSelection,
          insertCrossReference: insertCrossReferenceAtCurrentSelection,
          insertEndnote: insertEndnoteAtCurrentSelection,
          insertComment: insertCommentAtCurrentSelection,
        },
        isReadOnlyEffective,
        canUserCreateComments,
      ),
```

and add `insertEndnoteAtCurrentSelection` to the memo's dependency array (:1212-1224).

Known-safe hazard, do not "fix" here: `ContextMenuPlugin` invokes `onSelect` inside `editor.update()` (scripture-editors `ContextMenuPlugin.tsx:233,290`), and `insertMarker` also wraps in `editor.update()` — but all four callbacks are async and (with a project open) hit an `await` before `insertMarker`, deferring it out of the update. The shipping footnote/cross-reference context items already rely on this; the endnote item mirrors them exactly. Task 4's e2e exercises the context-menu path for real.

- [ ] **Step 6: Full extension verify**

```bash
npm run typecheck && npm run lint && npm test -- extensions/src/platform-scripture-editor
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add extensions/src/platform-scripture-editor
git commit -m "feat(scripture-editor): context-menu/Insert-menu parity incl. endnote, pinned by test (PT-4195)"
```

---

### Task 4: Isolated e2e — context-menu parity + endnote insert survives the save echo

**Files:**

- Test: `e2e-tests/tests/isolated/scripture-editor/endnote-insert-context-menu.spec.ts`

**Interfaces:**

- Consumes: fixtures `isolated.fixture`, helpers in `e2e-tests/fixtures/scripture-editor-helpers.ts` (`waitForHomeTab`, `makeSampleProjectEditable`, `openEditableScriptureEditorForProject`, `navigateToolbarBcv`, `SAMPLE_WEB_PROJECT_ID`); the "Insert end note" en label from Task 2.

- [ ] **Step 1: Write the spec** (ONE `test()` per isolated spec file — second-Electron-instance constraint; sub-scenarios are `test.step`s):

```ts
/**
 * PT-4195: the editor right-click menu offers the same inserts as the Insert top-menu (footnote,
 * cross-reference, end note, comment — in that order), and "Insert end note" creates a real `\fe`
 * note (caller `+`, PT9 shape) that survives the PDP save/USFM echo round-trip.
 *
 * The context menu is the Lexical ContextMenuPlugin portal INSIDE the editor iframe
 * (`.typeahead-popover` with `li[role="option"]`), not the app's Radix PAPI menu.
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 * Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor endnote insert + context-menu parity', () => {
  test('right-click menu mirrors the Insert menu and inserts a \\fe endnote', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:2');

    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    const contextMenu = editorFrame.locator('.typeahead-popover');

    await test.step('context menu lists the four Insert-menu inserts in Insert-menu order', async () => {
      // ContextMenuPlugin suppresses the menu when the right-click target IS the content-editable
      // root, so aim at a paragraph inside it.
      await editorInput.locator('p').first().click();
      await editorInput.locator('p').first().click({ button: 'right' });
      await expect(contextMenu).toBeAttached({ timeout: 15_000 });
      const optionTexts = await contextMenu.locator('[role="option"]').allTextContents();
      const insertOptions = optionTexts.filter((text) => text.startsWith('Insert'));
      expect(insertOptions).toEqual([
        'Insert footnote',
        'Insert cross-reference',
        'Insert end note',
        'Insert comment',
      ]);
    });

    await test.step('Insert end note creates a \\fe note with the + caller', async () => {
      await contextMenu.locator('[role="option"]', { hasText: 'Insert end note' }).click();
      const endnote = editorFrame.locator('span.note.usfm_fe');
      await expect(endnote).toBeAttached({ timeout: 15_000 });
      await expect(endnote).toHaveAttribute('data-caller', '+');
      // The footnote editor auto-opens for a newly inserted note; close it so the echo settles
      // with the editor focused.
      await mainPage.keyboard.press('Escape');
    });

    await test.step('the endnote survives the debounced save/USFM echo round-trip', async () => {
      // The PDP echoes saved USFM back through the editor (~700ms debounce + round-trip). If the
      // note did not round-trip through USFM, the echo would drop this node.
      await mainPage.waitForTimeout(5_000);
      await expect(editorFrame.locator('span.note.usfm_fe')).toBeAttached();
    });
  });
});
```

- [ ] **Step 2: Run it**

```bash
npm run build:data          # required once before isolated e2e in a fresh worktree
npm run test:e2e:isolated scripture-editor/endnote-insert-context-menu
```

Expected: PASS. Budget note: the isolated fixture self-starts the dev server; the cold first test takes ~84s of the 120s budget — `test.slow()` is already in the spec. Run e2e in the FOREGROUND (backgrounded e2e runs strand sessions). If the context menu does not appear, inspect the editor DOM via the visual-verification skill and adjust the right-click target selector (`p` → whatever the paragraph element renders as) — the parity assertion itself must not be weakened.

- [ ] **Step 3: Falsifiability check (revert test).** Temporarily comment out the `insertEndnote` entry in `createInsertContextMenuItems`, re-run the spec, confirm it FAILS on the parity step; restore.

- [ ] **Step 4: Commit**

```bash
git add e2e-tests/tests/isolated/scripture-editor/endnote-insert-context-menu.spec.ts
git commit -m "test(e2e): endnote insert + context-menu parity spec (PT-4195)"
```

---

### Task 5: Verification sweep, hand QA, Jira, draft PR

**Files:** none new (fixes only if the sweep finds problems).

- [ ] **Step 1: Full repo verification**

```bash
npm run typecheck && npm run lint && npm test
dotnet test c-sharp-tests/    # no C# changes expected — this is the pre-PR sweep per repo rules
npm run test:e2e:isolated scripture-editor
```

Expected: all green (note the whole `scripture-editor` isolated subset, not just the new spec — the shared web-view edits must not regress the existing four specs).

- [ ] **Step 2: Hand QA in the running app** (use the app-runner + visual-verification skills; dev-loop gotchas: after scripture-editors changes — none expected — the yalc+DLL rebuild dance applies; for core-only changes the extension watcher rebuilds automatically):
  - Insert > Insert end note with a collapsed caret → editor shows a new collapsed note; markers view / saved USFM shows `\fe + \fr <C>:<V> \ft ...\fe*` (PT9 shape).
  - Repeat with a text selection → snippet gains `\fq <selected text>` and the selection stays in the body (PT9 copies, never moves).
  - Right-click → four insert items, endnote works from the context menu (this validates the editor.update-nesting deferral on the real UI path).
  - The new endnote appears in the footnotes pane (pane collects every `type === 'note'` marker via `extractFootnotesFromUsjContent` — no code change needed, verify only) and its caller joins the footnote a/b/c sequence (P9 parity: shared sequence).
  - Navigate away and back → note persists (round-trip through the PDP).
  - Open a read-only resource viewer → context-menu insert items are disabled.
- [ ] **Step 3: Comment results on PT-4195**, including: what shipped; the accepted caller-parity deviation (Global Constraints); Q6 status (implemented pending PO confirmation — or descoped, if the answer arrived as "no"); anything deferred.
- [ ] **Step 4: Open the draft PR** with the pr-creator skill: head `standard-view-pt-4195`, base `standard-view`, title under 70 chars, e.g. `feat(scripture-editor): endnote insert + context-menu parity (PT-4195)`; body notes the Phase B/WI-6 retarget-to-main plan, AI-assistance attribution per repo rules. Push the branch first; do not enable auto-merge (draft until WI-6 lands and the PO answer is recorded).

---

## Explicitly out of scope

- **scripture-editors changes.** `insertMarker('fe')` is already implemented, tested (`node-react-utils.test.ts:1106`, `usj-marker-action-utils.test.ts:399`), and demoed (`demos/platform/src/app/PlatformToolbar.tsx:110-112`). The two SE `fe` tests are thin (don't assert `\fr`/`\ft` children as richly as the `f` twins) — worth a tiny follow-up PR in that repo someday, but not this ticket, and not worth the cross-repo release train here.
- **Endnote keyboard shortcut** (P9 has none) and therefore any keyboard-shortcuts-catalog edit.
- **Separate endnote caller sequence.** P9 shares one a/b/c sequence between `\f` and `\fe` (`Standard.xslt:441-459`); the SE library does the same (`usj-nodes.css:2277-2287`). Matching behavior — nothing to do.
- **Footnote-pane behavior changes** — WI-4 (PT-4189, in progress in parallel) owns the pane editing model. This ticket only verifies the endnote shows up wherever notes currently show up. Coordinate at merge time: both touch `platform-scripture-editor.web-view.tsx`; keep this branch's web-view diff minimal.
- **Convert Footnote Type for `\fe`** — P9 greys it out for endnotes (`StyleApplicator.cs:52` allows only `f`/`x`); PT10's PT-3490 flow is untouched.
