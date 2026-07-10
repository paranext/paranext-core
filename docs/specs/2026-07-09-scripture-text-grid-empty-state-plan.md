# Scripture Text Grid Empty State (PT-4054 / A6) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show directional empty-state copy in two places in the Scripture Text Grid — the grid body (when nothing is renderable, pointing at the View Options icon; resolves PT-2983) and the View Options TEXTS list (when it has no rows, pointing at Get Resources).

**Architecture:** Extend the already-integrated Scripture Text Grid in `platform-scripture-editor` (base branch `pt-4047-mvp-demo`). Part 1 adds a small presentational `ScriptureTextGridEmptyState` component and wraps the grid body in an `resources.length === 0` conditional in the web view. Part 2 adds an empty-list prompt inside the reusable `ResourceCollectionOptions` component. Two new localized strings (English + AI Spanish).

**Tech Stack:** TypeScript, React (functional components + hooks), `platform-bible-react` (`Label`), Tailwind (`tw:` prefix), Vitest + `@testing-library/react` (jsdom) for unit tests, Playwright (CDP) for e2e.

## Global Constraints

- **Base branch:** `pt-4047-mvp-demo` (A6 rebased onto it; A6 must not merge before it lands). Do not reconcile A4/A5 — the base already did.
- **Trigger for the grid body empty state:** `resources.length === 0` (the renderable-cell count after `toGridResources`), NOT the raw `getScriptureTextGridContents` count — this guarantees the user never sees a blank grid.
- **All Tailwind utility classes use the `tw:` prefix** (enforced by ESLint).
- **No hardcoded UI strings** — every user-visible string is a localized key resolved through `localizedStrings` (enforced by ESLint `no-hardcoded-jsx-strings`). Test files may use literal expected strings.
- **String key prefix:** `webView_scriptureTextGrid_*`. New keys: `%webView_scriptureTextGrid_emptyState_prompt%` and `%webView_scriptureTextGrid_viewOptions_emptyTexts%`.
- **Localization:** every new key added under BOTH `en` and `es` in `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`. English authored below; Spanish is AI-generated (acceptable in-sprint).
- **English copy (verbatim):**
  - Grid body: `No texts to display. Open View Options to choose which texts to show.`
  - Panel list: `No texts added yet. Use Get Resources to add texts to your collection.`
- **No keyboard handlers are added** → the keyboard-shortcuts catalog (`src/stories/keyboard-shortcuts.data.ts`) needs no change.
- **No PAPI surface change** → do NOT run `npm run build:types`; there is no `papi-shared-types` augmentation.
- Run unit tests with `npx vitest run <path>` from the repo root (or use the `test-runner` skill).

---

## File Structure

- **Create** `extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.tsx` — presentational empty-state component (grid body).
- **Create** `extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.test.tsx` — unit test for the above.
- **Modify** `extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx` — import the component, add the string key, wrap the body in the empty conditional.
- **Modify** `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.types.ts` — add the `emptyTexts` key to the registry.
- **Modify** `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx` — render the empty-list prompt.
- **Modify** `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx` — cover the prompt.
- **Modify** `extensions/src/platform-scripture-editor/contributions/localizedStrings.json` — add both keys under `en` and `es`.
- **Modify** `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts` — add an empty-state smoke.

---

## Task 1: `ScriptureTextGridEmptyState` component

**Files:**
- Create: `extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.tsx`
- Test: `extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.test.tsx`

**Interfaces:**
- Produces: `ScriptureTextGridEmptyState(props: { prompt: string }): JSX.Element` — renders the localized `prompt` centered in the grid body, with a stable `data-testid="scripture-text-grid-empty-state"`. Consumed by the web view in Task 2.

- [ ] **Step 1: Write the failing test**

Create `scripture-text-grid-empty-state.component.test.tsx`:

```tsx
// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScriptureTextGridEmptyState } from './scripture-text-grid-empty-state.component';

describe('ScriptureTextGridEmptyState', () => {
  it('renders the directional prompt text passed in', () => {
    render(
      <ScriptureTextGridEmptyState prompt="No texts to display. Open View Options to choose which texts to show." />,
    );
    expect(
      screen.getByText('No texts to display. Open View Options to choose which texts to show.'),
    ).toBeInTheDocument();
  });

  it('exposes a stable testid so e2e can locate it', () => {
    render(<ScriptureTextGridEmptyState prompt="anything" />);
    expect(screen.getByTestId('scripture-text-grid-empty-state')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.test.tsx`
Expected: FAIL — cannot resolve `./scripture-text-grid-empty-state.component` (module does not exist yet).

- [ ] **Step 3: Write the component**

Create `scripture-text-grid-empty-state.component.tsx`:

```tsx
import { Label } from 'platform-bible-react';

/** Props for {@link ScriptureTextGridEmptyState}. */
export type ScriptureTextGridEmptyStateProps = {
  /** Localized directional copy telling the user how to add texts (points at the View Options icon). */
  prompt: string;
};

/**
 * Centered directional copy shown in the Scripture Text Grid body when there is nothing renderable.
 * Points the user at the View Options button in the header. Purely presentational — the web view
 * owns the decision of when to render it (see the empty conditional in `scripture-text-grid.web-view`).
 */
export function ScriptureTextGridEmptyState({ prompt }: ScriptureTextGridEmptyStateProps) {
  return (
    <div
      data-testid="scripture-text-grid-empty-state"
      className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-4"
    >
      <Label className="tw:text-center tw:text-muted-foreground">{prompt}</Label>
    </div>
  );
}

export default ScriptureTextGridEmptyState;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.tsx \
        extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.test.tsx
git commit -m "PT-4054 (A6): add ScriptureTextGridEmptyState component"
```

---

## Task 2: Wire the empty state into the web view + add its localized string

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx`
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`
- Modify (test): `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts`

**Interfaces:**
- Consumes: `ScriptureTextGridEmptyState` from Task 1; the existing `resources: GridResource[]`, `localizedStrings`, and `isLoadingLocalizedStrings` already computed in the web view.

- [ ] **Step 1: Add the localized string (en + es)**

In `localizedStrings.json`, under `localizedStrings.en`, add immediately after the line
`"%webView_scriptureTextGrid_title_single%": "Scripture text",`:

```json
      "%webView_scriptureTextGrid_emptyState_prompt%": "No texts to display. Open View Options to choose which texts to show.",
```

Under `localizedStrings.es`, add immediately after the line
`"%webView_scriptureTextGrid_title_single%": "Texto bíblico",`:

```json
      "%webView_scriptureTextGrid_emptyState_prompt%": "No hay textos para mostrar. Abre Opciones de vista para elegir qué textos mostrar.",
```

- [ ] **Step 2: Import the component and declare the key in the web view**

In `scripture-text-grid.web-view.tsx`, add to the imports (next to the other `scripture-text-grid/*` imports near line 39-44):

```tsx
import { ScriptureTextGridEmptyState } from './scripture-text-grid/scripture-text-grid-empty-state.component';
```

Add the key constant next to the other `*_KEY` constants (after `CHAPTER_CONTEXT_CLOSE_KEY`, ~line 54):

```tsx
const EMPTY_STATE_KEY = '%webView_scriptureTextGrid_emptyState_prompt%';
```

Add it to the `ALL_STRING_KEYS` array (after `CHAPTER_CONTEXT_CLOSE_KEY`):

```tsx
const ALL_STRING_KEYS: LocalizeKey[] = [
  TITLE_KEY,
  VIEW_OPTIONS_BUTTON_KEY,
  NO_PROJECT_KEY,
  CHAPTER_CONTEXT_CLOSE_KEY,
  EMPTY_STATE_KEY,
  ...RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
];
```

- [ ] **Step 3: Wrap the grid body in the empty conditional**

Replace the body block (currently, ~lines 334-347):

```tsx
      {/* Grid body: verse-cell rows below the header seam, verse/chapter layout from `viewMode`. */}
      <div className="tw:flex-1 tw:overflow-hidden">
        <ScriptureTextGrid
          ariaLabel={localizedStrings[TITLE_KEY]}
          resources={resources}
          scrRef={scrRef}
          setScrRef={setScrRef}
          viewMode={viewMode}
          chapterContext={chapterContext}
          onChapterContextChange={setChapterContext}
          onChapterContextClose={handleCloseChapterContext}
          closeChapterContextLabel={localizedStrings[CHAPTER_CONTEXT_CLOSE_KEY]}
        />
      </div>
```

with:

```tsx
      {/* Grid body: the empty state when nothing is renderable (points at View Options), otherwise
          the verse-cell rows. `resources` is post-`toGridResources`, so a selected-but-unresolved
          resource counts as empty here and shows the prompt instead of a blank grid. The
          `!isLoadingLocalizedStrings` guard avoids flashing a raw `%key%` while strings load. */}
      <div className="tw:flex-1 tw:overflow-hidden">
        {resources.length === 0 && !isLoadingLocalizedStrings ? (
          <ScriptureTextGridEmptyState prompt={localizedStrings[EMPTY_STATE_KEY]} />
        ) : (
          <ScriptureTextGrid
            ariaLabel={localizedStrings[TITLE_KEY]}
            resources={resources}
            scrRef={scrRef}
            setScrRef={setScrRef}
            viewMode={viewMode}
            chapterContext={chapterContext}
            onChapterContextChange={setChapterContext}
            onChapterContextClose={handleCloseChapterContext}
            closeChapterContextLabel={localizedStrings[CHAPTER_CONTEXT_CLOSE_KEY]}
          />
        )}
      </div>
```

- [ ] **Step 4: Typecheck and lint the changed files**

Run: `npm run typecheck`
Expected: no errors.

Run: `npx eslint extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx`
Expected: no errors (no hardcoded strings, `tw:` prefixes intact).

- [ ] **Step 5: Add the e2e empty-state smoke**

In `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts`, add a new `test.describe` block at the end of the file (after the A4 block). It mirrors the A4 tests' local-only pattern (mutates project settings, so CI-skipped; restore runs in the shared A4 `afterEach` — add this test inside that same describe if `restoreScriptureTextGridProjectSettings` is only wired there; otherwise add the afterEach as shown):

```ts
test.describe('Scripture Text Grid empty state (A6)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test.afterEach(async ({ mainPage }) => {
    await restoreScriptureTextGridProjectSettings(mainPage);
  });

  test('shows directional copy and no cells when nothing is shown', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    // Flag nothing → the effective list is empty → the grid renders the empty state, not cells.
    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, []);

    const frame = await openScriptureTextGrid(mainPage);
    await expect(frame.getByTestId('scripture-text-grid-empty-state')).toBeVisible({
      timeout: 15_000,
    });
    await expect(frame.locator('[role="gridcell"]')).toHaveCount(0);
  });
});
```

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx \
        extensions/src/platform-scripture-editor/contributions/localizedStrings.json \
        e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts
git commit -m "PT-4054 (A6): grid body empty state pointing at View Options"
```

---

## Task 3: View Options TEXTS-list empty prompt

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.types.ts`
- Modify: `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx`
- Modify (test): `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx`
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`

**Interfaces:**
- Consumes: the existing `ResourceCollectionOptionsProps` (`top`, `bottom`, `installingResourceNames`, `disabled`, `disabledMessage`, `localizedStrings`) and the `localize` helper + `RESOURCE_COLLECTION_OPTIONS_KEYS` registry.
- Produces: a new `emptyTexts` entry in `RESOURCE_COLLECTION_OPTIONS_KEYS` / `RESOURCE_COLLECTION_OPTIONS_STRING_KEYS` (key `%webView_scriptureTextGrid_viewOptions_emptyTexts%`), auto-included in the web view's `ALL_STRING_KEYS` via the existing spread.

- [ ] **Step 1: Write the failing tests**

In `resource-collection-options.component.test.tsx`, add the human-readable override next to the other `STRINGS[...] = ...` overrides (after the `installing` override, ~line 68):

```tsx
STRINGS['%webView_scriptureTextGrid_viewOptions_emptyTexts%'] =
  'No texts added yet. Use Get Resources to add texts to your collection.';
```

Then add a new `describe` block (e.g. after the `— TEXTS list` block):

```tsx
describe('ResourceCollectionOptions — empty TEXTS list', () => {
  it('shows the empty-texts prompt when the list is empty and enabled', () => {
    renderComponent({ top: [], bottom: [], installingResourceNames: [] });
    expect(
      screen.getByText('No texts added yet. Use Get Resources to add texts to your collection.'),
    ).toBeInTheDocument();
  });

  it('hides the empty-texts prompt when a row is present', () => {
    renderComponent({ bottom: [row('u1', 'My Text', { isUserRemovable: true })] });
    expect(screen.queryByText(/No texts added yet/)).not.toBeInTheDocument();
  });

  it('hides the empty-texts prompt while an install is pending', () => {
    renderComponent({ installingResourceNames: ['New Resource'] });
    expect(screen.queryByText(/No texts added yet/)).not.toBeInTheDocument();
  });

  it('shows the disabled message, not the empty prompt, when disabled with a message', () => {
    renderComponent({ disabled: true, disabledMessage: 'No project selected.' });
    expect(screen.getByText('No project selected.')).toBeInTheDocument();
    expect(screen.queryByText(/No texts added yet/)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx`
Expected: the first test FAILS (prompt not rendered yet). The "hides" tests may pass trivially (text never present) — that is fine; the "shows" test is the falsifiable one that must be red now and green after Step 4.

- [ ] **Step 3: Add the key to the registry**

In `resource-collection-options.types.ts`, add `emptyTexts` to `RESOURCE_COLLECTION_OPTIONS_KEYS` (after `textsHeader`):

```tsx
  textsHeader: '%webView_scriptureTextGrid_viewOptions_textsHeader%',
  emptyTexts: '%webView_scriptureTextGrid_viewOptions_emptyTexts%',
  getResources: '%webView_scriptureTextGrid_viewOptions_getResources%',
```

And add it to `RESOURCE_COLLECTION_OPTIONS_STRING_KEYS` (after `textsHeader`):

```tsx
  RESOURCE_COLLECTION_OPTIONS_KEYS.textsHeader,
  RESOURCE_COLLECTION_OPTIONS_KEYS.emptyTexts,
  RESOURCE_COLLECTION_OPTIONS_KEYS.getResources,
```

- [ ] **Step 4: Render the prompt in the component**

In `resource-collection-options.component.tsx`, compute the empty flag near the top of the component body (after the props destructure, before `renderRow`):

```tsx
  // The TEXTS list is empty when there are no admin/user rows and nothing installing. Shown only
  // when interactive (`!disabled`): while disabled we already show `disabledMessage` (no project)
  // or nothing (brief load), so this never double-messages or fires prematurely.
  const isTextsListEmpty =
    top.length === 0 && bottom.length === 0 && installingResourceNames.length === 0;
```

In the TEXTS `<section>`, add the prompt immediately after the existing `disabledMessage` block and before `{top.map(renderRow)}`:

```tsx
        {disabled && disabledMessage && (
          <p className="tw:py-1 tw:text-sm tw:text-muted-foreground tw:italic">{disabledMessage}</p>
        )}
        {!disabled && isTextsListEmpty && (
          <p className="tw:py-1 tw:text-sm tw:text-muted-foreground tw:italic">
            {localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.emptyTexts)}
          </p>
        )}
        {top.map(renderRow)}
```

- [ ] **Step 5: Add the localized string (en + es)**

In `localizedStrings.json`, under `localizedStrings.en`, add immediately after
`"%webView_scriptureTextGrid_viewOptions_comingSoon%": "Coming soon",`:

```json
      "%webView_scriptureTextGrid_viewOptions_emptyTexts%": "No texts added yet. Use Get Resources to add texts to your collection.",
```

Under `localizedStrings.es`, add immediately after
`"%webView_scriptureTextGrid_viewOptions_comingSoon%": "Próximamente",`:

```json
      "%webView_scriptureTextGrid_viewOptions_emptyTexts%": "Aún no has añadido textos. Usa Obtener recursos para añadirlos a tu colección.",
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npx vitest run extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx`
Expected: PASS (all existing tests + the 4 new ones).

- [ ] **Step 7: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.types.ts \
        extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx \
        extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx \
        extensions/src/platform-scripture-editor/contributions/localizedStrings.json
git commit -m "PT-4054 (A6): empty-list prompt in View Options TEXTS section"
```

---

## Task 4: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Typecheck the workspace**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 2: Lint (repo-wide, same as CI)**

Run: `npm run lint`
Expected: zero errors.

- [ ] **Step 3: Run the affected unit tests**

Run: `npx vitest run extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.test.tsx extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx`
Expected: all PASS.

- [ ] **Step 4: Manual smoke (local app)**

Start the app (`npm start` or the `app-runner` skill) and verify:
- Open the Scripture Text Grid with no texts shown → the grid body shows *"No texts to display. Open View Options to choose which texts to show."* with the View Options gear icon visible above it.
- Open View Options with an empty TEXTS list → *"No texts added yet. Use Get Resources to add texts to your collection."* appears above the Get Resources button.
- Check a resource in View Options → the empty state disappears and cells render; uncheck all → the empty state returns.
- Switch app locale to `es` → both strings render in Spanish.

- [ ] **Step 5: Push the branch**

```bash
git push -u origin pt-4054-empty-state
```

---

## Self-Review Notes

- **Spec coverage:** Part 1 (grid body) → Tasks 1-2; Part 2 (panel prompt) → Task 3; localization (both keys, en+es) → Tasks 2 & 3; testing (unit + e2e + manual) → Tasks 1-4. All spec sections map to a task.
- **Trigger:** `resources.length === 0` used consistently (Task 2 Step 3), matching the Global Constraints and the spec decision.
- **Type/name consistency:** `ScriptureTextGridEmptyState` / `EMPTY_STATE_KEY` / `%webView_scriptureTextGrid_emptyState_prompt%` (Tasks 1-2) and `emptyTexts` / `%webView_scriptureTextGrid_viewOptions_emptyTexts%` (Task 3) are used identically wherever referenced.
- **Precedence:** `disabledMessage` (disabled) and the empty prompt (`!disabled && empty`) are mutually exclusive by construction — no double message.
