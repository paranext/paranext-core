# Footnotes Pane Editing (PT-4189) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** In Standard view, edit footnotes in place in the footnotes pane (no popover), with caller clicks, pane clicks, and note insertion routed to the pane, a caller highlight, an X button on the pane, and the auto-show toggle removed.

**Architecture:** The editor engine (`scripture-editors`) gains two additive `EditorRef` methods, `getNoteIndex` and `highlightNote`. The `platform-scripture-editor` web view owns the note-editing session and decides the surface (`pane` in Standard view, `popover` elsewhere, `none` when read-only) through pure helpers that carry the tests. `FootnotesLayout` stays a layout component: it gains a close button, pass-through editing props, and a selection-change callback.

**Tech Stack:** React 19, Lexical (via `@eten-tech-foundation/platform-editor`), platform-bible-react (`FootnoteList` row-swap seam and inline `FootnoteEditor` from PR 2655), vitest + @testing-library/react, nx/pnpm in scripture-editors, npm workspaces in paranext-core.

**Spec:** `.context/designs/2026-09-10-footnotes-pane-editing-design.md` (same branch; this plan lives beside it as `2026-09-10-footnotes-pane-editing-plan.md`).

## Global Constraints

- Two worktrees: core `/home/tj_co/source/repos/workspaces/pt-4189-footnote-pane-editing/paranext-core` (branch `pt-4189-footnote-pane-editing`, built on PR 2655's branch merged with main) and editor `/home/tj_co/source/repos/workspaces/pt-4189-footnote-pane-editing/scripture-editors` (branch `pt-4189-footnote-pane-editing` off `main`). Never touch the canonical checkouts.
- Editor commands in the editor worktree must bypass the volta shim: prefix with `env -u VOLTA_HOME -u _VOLTA_TOOL_RECURSION PATH="/tmp/claude-1000/-home-tj-co-source-repos-paranext-core/fe4a2e78-7fe0-4a46-a421-1e2d56350e5d/scratchpad/shim:$PATH"` (that dir holds `node`, `npm`, `npx`, and a `pnpm` wrapper). Call this `$SHIM_ENV` below.
- Editor tests: `$SHIM_ENV pnpm nx test @eten-tech-foundation/platform-editor -- <fileFilter>` from the editor worktree root. Editor build: `$SHIM_ENV pnpm nx build @eten-tech-foundation/platform-editor --skip-nx-cache`, then `$SHIM_ENV pnpm nx extract-api @eten-tech-foundation/platform-editor --skip-nx-cache`; `packages/platform/dist` and `packages/platform/etc/platform-editor.api.md` are COMMITTED artifacts and must be committed with the source change.
- Core extension tests: `cd extensions/src/platform-scripture-editor && npx vitest run <file>`. Core PBR tests: `cd lib/platform-bible-react && npx vitest run --project=unit <file>`. Extension lint: `cd extensions && NODE_ENV=development npx eslint --ext .ts,.tsx src/platform-scripture-editor/src/<file>`. Repo typecheck: `npm run typecheck` at the core worktree root.
- No backward-facing comments (no "previously", "the review found", PR/ticket ids for work done here). Forward `TODO(PT-XXXX)` only for deferred work. Comments must stand on their own.
- Localized strings: every user-visible string and `aria-label` in the extension comes from `contributions/localizedStrings.json` via `useLocalizedStrings`; add `en` and `es` entries.
- Commit messages end with:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01Cexoio1HtVmuAp2zJQKK3g
  ```
  Never `--no-verify`. Never `rm -rf`.
- Keep the Standard-view invariants (`.context/standards/Standard-View-Invariants.md` §4): the inline `FootnoteEditor` still owns the note, still passes `isNoteShellEditable: false`, and its dropdowns still use `Z_INDEX_ABOVE_POPOVER`.

---

## File map

Editor worktree (`scripture-editors`):
- Modify `libs/shared-react/src/nodes/usj/note.utils.ts` — add `$getNoteIndex(noteNodeKey)`.
- Modify `libs/shared-react/src/nodes/usj/ImmutableNoteCallerNode.tsx` — reuse `$getNoteIndex`.
- Create `libs/shared-react/src/plugins/usj/NoteCallerHighlightPlugin.tsx` — applies `caller_highlight` to one note's caller and keeps it applied across commits (tested through `EditorRef` in the platform package).
- Modify `libs/shared-react/src/index.ts` (exports), `packages/platform/src/editor/editor.model.ts` (`EditorRef` two methods), `packages/platform/src/editor/Editor.tsx` (impl + plugin mount).
- Create `packages/platform/src/editor/noteIndexAndHighlight.test.tsx` — `EditorRef` contract tests.
- Regenerated: `packages/platform/dist/**`, `packages/platform/etc/platform-editor.api.md`.

Core worktree (`paranext-core`), all under `extensions/src/platform-scripture-editor/`:
- Modify `contributions/menus.json`, `contributions/localizedStrings.json`, `src/main.ts`, `src/types/platform-scripture-editor.d.ts` — auto-show removal, close-button string.
- Modify `src/platform-scripture-editor.web-view.utils.ts` (+ test) — delete `resolveFootnotesPaneAutoVisibility`.
- Modify `src/platform-scripture-editor.utils.ts` (+ test) — `resolveNoteEditingSurface`, reworked `decideNoteCallerClickAction`.
- Modify `src/editor-dom.util.ts` (+ test) — `scrollToNoteCaller`.
- Modify `src/platform-scripture-editor-footnotes.component.tsx`; create `src/platform-scripture-editor-footnotes.component.test.tsx`.
- Modify `src/platform-scripture-editor.web-view.tsx` — wiring.
- Modify `.context/standards/Architecture-Decisions.md`, `.context/standards/Standard-View-Invariants.md` — record the decision.

---

### Task 1: `EditorRef.getNoteIndex(noteKey)` and `EditorRef.getNoteKey(noteIndex)` (editor)

**Files:**
- Modify: `libs/shared-react/src/nodes/usj/note.utils.ts` (near `$getNoteByKeyOrIndex`, ~line 459)
- Modify: `libs/shared-react/src/nodes/usj/ImmutableNoteCallerNode.tsx:288-298` (`getNoteIndex`)
- Modify: `libs/shared-react/src/index.ts` (export `$getNoteIndex`)
- Modify: `packages/platform/src/editor/editor.model.ts` (`EditorRef`, after `getNoteOps` ~line 559)
- Modify: `packages/platform/src/editor/Editor.tsx` (`editorApi`, after `getNoteOps` ~line 931)
- Modify: `packages/platform/src/marginal/Marginal.tsx` (`MarginalRef extends EditorRef`; its `useImperativeHandle` is an explicit object literal, so every new `EditorRef` member needs a delegation there, next to `selectNote`/`getNoteOps`)
- Test: `packages/platform/src/editor/noteIndexAndHighlight.test.tsx` (create)

**Interfaces:**
- Produces: `EditorRef.getNoteIndex(noteKey: string): number | undefined` — document-order index of the note (the coordinate `noteCallerOnClick`'s `getNoteIndex` reports and a USJ-built notes list addresses), `undefined` when the key is not a note in the document. `EditorRef.getNoteKey(noteIndex: number): string | undefined` — the inverse. Also `$getNoteIndex(noteNodeKey: NodeKey): number | undefined` in `shared-react` (read-context function).

- [ ] **Step 1: Write the failing test**

Create `packages/platform/src/editor/noteIndexAndHighlight.test.tsx` (the highlight tests join it in Task 2):

```tsx
/**
 * `EditorRef.getNoteIndex` and `EditorRef.highlightNote`: the two host-facing note affordances a
 * footnotes pane needs — the document-order index a USJ-built notes list addresses notes by, and
 * PT9's selected-caller highlight (`caller_highlight`) on one note's caller at a time.
 */
import Editorial from "../Editorial";
import { EditorOptions, EditorRef } from "./editor.model";
import { MarkerObject, Usj } from "@eten-tech-foundation/scripture-utilities";
import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { $getRoot, LexicalEditor } from "lexical";
import { $dfs } from "@lexical/utils";
// Reaching inside only for tests.
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getEmbeddedLexicalEditor } from "../../../../libs/shared-react/src/plugins/usj/react-test.utils";
import { $isNoteNode, NoteNode } from "shared";
import { getViewOptions, STANDARD_VIEW_MODE } from "shared-react";

function requireDefined<T>(value: T | undefined | null, message: string): T {
  if (value === undefined || value === null) throw new Error(message);
  return value;
}

const options: EditorOptions = {
  hasSpellCheck: false,
  markerMenuTrigger: "\\",
  view: requireDefined(getViewOptions(STANDARD_VIEW_MODE), "standard view options"),
  hasExternalUI: true,
};

function note(text: string): MarkerObject {
  return {
    type: "note",
    marker: "f",
    caller: "+",
    content: [
      { type: "char", marker: "fr", content: ["1:1 "] },
      { type: "char", marker: "ft", content: [text] },
    ],
  };
}

const threeNotesUsj: Usj = {
  type: "USJ",
  version: "3.1",
  content: [
    { type: "book", marker: "id", code: "GEN", content: ["Test Book"] },
    { type: "chapter", marker: "c", number: "1" },
    {
      type: "para",
      marker: "p",
      content: [
        { type: "verse", marker: "v", number: "1" },
        "first ",
        note("alpha"),
        "second ",
        note("beta"),
        "third ",
        note("gamma"),
        "end",
      ],
    },
  ],
};

const scrRef = { book: "GEN", chapterNum: 1, verseNum: 1 };

async function renderEditor(defaultUsj: Usj) {
  const ref = createRef<EditorRef>();
  let container: HTMLElement | undefined;
  await act(async () => {
    const result = render(
      <Editorial
        ref={ref}
        defaultUsj={defaultUsj}
        scrRef={scrRef}
        onScrRefChange={() => undefined}
        options={options}
      />,
    );
    container = result.container;
  });
  const editorRef = requireDefined(ref.current, "editor ref");
  const lexical = getEmbeddedLexicalEditor(container);
  return { editorRef, lexical, container: requireDefined(container, "container") };
}

function noteKeys(lexical: LexicalEditor): string[] {
  return lexical.getEditorState().read(() =>
    $dfs($getRoot())
      .map(({ node }) => node)
      .filter($isNoteNode)
      .map((n: NoteNode) => n.getKey()),
  );
}

describe("EditorRef.getNoteIndex", () => {
  it("returns the document-order index for each note key", async () => {
    const { editorRef, lexical } = await renderEditor(threeNotesUsj);
    const keys = noteKeys(lexical);
    expect(keys).toHaveLength(3);
    expect(keys.map((key) => editorRef.getNoteIndex(key))).toEqual([0, 1, 2]);
  });

  it("returns undefined for a key that is not a note", async () => {
    const { editorRef, lexical } = await renderEditor(threeNotesUsj);
    const rootKey = lexical.getEditorState().read(() => $getRoot().getKey());
    expect(editorRef.getNoteIndex(rootKey)).toBeUndefined();
    expect(editorRef.getNoteIndex("no-such-key")).toBeUndefined();
  });

  it("shifts later indexes down after an earlier note is removed", async () => {
    const { editorRef, lexical } = await renderEditor(threeNotesUsj);
    const [first, , third] = noteKeys(lexical);
    await act(async () => {
      editorRef.replaceEmbedUpdate(first, []);
    });
    expect(editorRef.getNoteIndex(third)).toBe(1);
    expect(editorRef.getNoteIndex(first)).toBeUndefined();
  });
});

describe("EditorRef.getNoteKey", () => {
  it("returns the key of the note at a document-order index and undefined past the end", async () => {
    const { editorRef, lexical } = await renderEditor(threeNotesUsj);
    const keys = noteKeys(lexical);
    expect([0, 1, 2].map((i) => editorRef.getNoteKey(i))).toEqual(keys);
    expect(editorRef.getNoteKey(3)).toBeUndefined();
    expect(editorRef.getNoteKey(-1)).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (editor worktree root): `$SHIM_ENV pnpm nx test @eten-tech-foundation/platform-editor -- noteIndexAndHighlight`
Expected: FAIL — `editorRef.getNoteIndex is not a function` / `getNoteKey is not a function`.

- [ ] **Step 3: Implement**

In `libs/shared-react/src/nodes/usj/note.utils.ts`, next to `$getNoteByKeyOrIndex`:

```ts
/**
 * Document-order index of the note with the given key, or `undefined` when the key is not a note
 * in the document. This is the coordinate a USJ-built notes list (e.g. a host footnotes pane)
 * addresses notes by; hosts should not re-derive it by content comparison.
 *
 * Must be called inside an editor read or update.
 */
export function $getNoteIndex(noteNodeKey: NodeKey): number | undefined {
  let index = 0;
  for (const { node } of $dfs()) {
    if (!$isNoteNode(node)) continue;
    if (node.getKey() === noteNodeKey) return index;
    index += 1;
  }
  return undefined;
}
```

(`$dfs` is already imported in that file for `$getNoteByKeyOrIndex`; add `NodeKey` to the `lexical` import if missing.) Replace the body of the module-private `getNoteIndex` in `ImmutableNoteCallerNode.tsx:288-298` with `return editor.getEditorState().read(() => $getNoteIndex(noteNodeKey));` and import `$getNoteIndex` from `./note.utils` (keep the function's doc comment). Export `$getNoteIndex` from `libs/shared-react/src/index.ts` where the other `note.utils` symbols are exported.

In `packages/platform/src/editor/editor.model.ts`, after `getNoteOps`:

```ts
  /**
   * Document-order index of the note with the given key — the coordinate a USJ-built notes list
   * (e.g. a footnotes pane) addresses notes by, and the same index `noteCallerOnClick` reports.
   * @param noteKey - The note node's key (e.g. from `insertMarker` or `noteCallerOnClick`).
   * @returns The index, or `undefined` when the key is not a note in the document.
   */
  getNoteIndex(noteKey: string): number | undefined;
  /**
   * Key of the note at the given document-order index (the inverse of `getNoteIndex`), so a host
   * that addresses notes by index can hand the editor the key `replaceEmbedUpdate` needs.
   * @returns The key, or `undefined` when no note exists at that index.
   */
  getNoteKey(noteIndex: number): string | undefined;
```

In `packages/platform/src/editor/Editor.tsx`, after `getNoteOps` in `editorApi`:

```ts
    getNoteIndex(noteKey) {
      return editorRef.current?.read(() => $getNoteIndex(noteKey));
    },
    getNoteKey(noteIndex) {
      return editorRef.current?.read(() => $getNoteByKeyOrIndex(noteIndex)?.getKey());
    },
```

Import `$getNoteIndex` from `shared-react` alongside `$selectNote` (`$getNoteByKeyOrIndex` is already imported). Check `$getNoteByKeyOrIndex` treats a negative index as "not found" (it indexes an array; `[-1]` is `undefined` — confirm rather than assume).

- [ ] **Step 4: Run test to verify it passes**

Run: `$SHIM_ENV pnpm nx test @eten-tech-foundation/platform-editor -- noteIndexAndHighlight`
Expected: PASS (4 tests). Also run `$SHIM_ENV pnpm nx test shared-react -- ImmutableNoteCallerNode` — expected PASS (the caller-node `getNoteIndex` suite still passes through the shared helper).

- [ ] **Step 5: Commit**

```bash
git add libs/shared-react/src/nodes/usj/note.utils.ts libs/shared-react/src/nodes/usj/ImmutableNoteCallerNode.tsx libs/shared-react/src/index.ts packages/platform/src/editor/editor.model.ts packages/platform/src/editor/Editor.tsx packages/platform/src/editor/noteIndexAndHighlight.test.tsx
git commit -m "feat(platform): EditorRef.getNoteIndex/getNoteKey map between note keys and document-order indexes"
```

---

### Task 2: `EditorRef.highlightNote` + `NoteCallerHighlightPlugin` (editor)

**Files:**
- Create: `libs/shared-react/src/plugins/usj/NoteCallerHighlightPlugin.tsx`
- Modify: `libs/shared-react/src/index.ts` (export plugin + `NoteCallerHighlightHandle`)
- Modify: `packages/platform/src/editor/editor.model.ts`, `packages/platform/src/editor/Editor.tsx`
- Modify: `packages/platform/src/marginal/Marginal.tsx` (delegate `highlightNote` in `MarginalRef`'s `useImperativeHandle`, as Task 1 did for `getNoteIndex`/`getNoteKey`)
- Test: `packages/platform/src/editor/noteIndexAndHighlight.test.tsx` (extend)

**Interfaces:**
- Consumes: `$getNoteByKeyOrIndex(noteKeyOrIndex)` from `note.utils.ts`; `ImmutableNoteCallerNode` (first child of a `NoteNode`).
- Produces: `EditorRef.highlightNote(noteKeyOrIndex: string | number | undefined): void`. CSS class `caller_highlight` on the note's `.immutable-note-caller` element (the class already exists in `packages/platform/src/usj-nodes.css:2447` and in paranext-core's `_usj-nodes.scss` copy — do not add CSS).

- [ ] **Step 1: Write the failing `EditorRef` tests**

Append to `packages/platform/src/editor/noteIndexAndHighlight.test.tsx`:

```tsx
const HIGHLIGHT_CLASS = "caller_highlight";

function highlightedCallers(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(`.note .${HIGHLIGHT_CLASS}`));
}

function callerOf(container: HTMLElement, noteIndex: number): HTMLElement {
  const notes = container.querySelectorAll<HTMLElement>(".note");
  return requireDefined(
    notes[noteIndex]?.querySelector<HTMLElement>(".immutable-note-caller"),
    `caller of note ${noteIndex}`,
  );
}

describe("EditorRef.highlightNote", () => {
  it("adds caller_highlight to the addressed note's caller and nowhere else", async () => {
    const { editorRef, container } = await renderEditor(threeNotesUsj);
    await act(async () => {
      editorRef.highlightNote(1);
    });
    expect(highlightedCallers(container)).toEqual([callerOf(container, 1)]);
  });

  it("accepts a note key, moves the highlight when re-addressed, and clears on undefined", async () => {
    const { editorRef, lexical, container } = await renderEditor(threeNotesUsj);
    const [, , third] = noteKeys(lexical);
    await act(async () => {
      editorRef.highlightNote(third);
    });
    expect(highlightedCallers(container)).toEqual([callerOf(container, 2)]);
    await act(async () => {
      editorRef.highlightNote(0);
    });
    expect(highlightedCallers(container)).toEqual([callerOf(container, 0)]);
    await act(async () => {
      editorRef.highlightNote(undefined);
    });
    expect(highlightedCallers(container)).toEqual([]);
  });

  it("survives the note being re-keyed by replaceEmbedUpdate", async () => {
    const { editorRef, lexical, container } = await renderEditor(threeNotesUsj);
    const [, second] = noteKeys(lexical);
    await act(async () => {
      editorRef.highlightNote(second);
    });
    const ops = requireDefined(editorRef.getNoteOps(second), "note ops");
    await act(async () => {
      editorRef.replaceEmbedUpdate(second, ops);
    });
    // The note now has a new key but the same index; the highlight follows the index.
    expect(highlightedCallers(container)).toEqual([callerOf(container, 1)]);
  });

  it("clears when the highlighted note leaves the document", async () => {
    const { editorRef, lexical, container } = await renderEditor(threeNotesUsj);
    const [first] = noteKeys(lexical);
    await act(async () => {
      editorRef.highlightNote(first);
    });
    await act(async () => {
      editorRef.replaceEmbedUpdate(first, []);
    });
    expect(highlightedCallers(container)).toEqual([]);
  });

  it("does not mark the document dirty (no onUsjChange)", async () => {
    const ref = createRef<EditorRef>();
    const onUsjChange = vi.fn();
    await act(async () => {
      render(
        <Editorial
          ref={ref}
          defaultUsj={threeNotesUsj}
          scrRef={scrRef}
          onScrRefChange={() => undefined}
          onUsjChange={onUsjChange}
          options={options}
        />,
      );
    });
    onUsjChange.mockClear();
    await act(async () => {
      requireDefined(ref.current, "ref").highlightNote(1);
    });
    expect(onUsjChange).not.toHaveBeenCalled();
  });
});
```

Design note for the "re-key" test: `replaceEmbedUpdate` replaces the note node with a new key. The plugin therefore tracks the highlight by **index** once resolved (index is what the pane addresses), re-resolving the caller element after each commit. If the implementer finds the index-tracking contract wrong for a key-addressed highlight, the alternative is: track the key, and on a commit where the key is gone, fall back to the same index if a note exists there. Either must satisfy all five tests.

- [ ] **Step 2: Run to verify it fails**

Run: `$SHIM_ENV pnpm nx test @eten-tech-foundation/platform-editor -- noteIndexAndHighlight`
Expected: the five new tests FAIL — `editorRef.highlightNote is not a function`.

- [ ] **Step 3: Add the collapse-toggle test (same file)**

Lexical recreates a note's DOM when its collapsed state flips (`NoteNode.updateDOM` returns `true`). Append to the `EditorRef.highlightNote` describe:

```tsx
  it("survives the note DOM being recreated by a collapse toggle", async () => {
    const { editorRef, lexical, container } = await renderEditor(threeNotesUsj);
    const [, second] = noteKeys(lexical);
    await act(async () => {
      editorRef.highlightNote(second);
    });
    const before = callerOf(container, 1);
    await act(async () => {
      lexical.update(() => {
        const noteNode = $getNodeByKey(second);
        if (!$isNoteNode(noteNode)) throw new Error("note not found");
        noteNode.setIsCollapsed(false);
      });
    });
    const after = callerOf(container, 1);
    expect(after).not.toBe(before);
    expect(highlightedCallers(container)).toEqual([after]);
  });
```

(Import `$getNodeByKey` from `lexical`.) If the DOM element is NOT recreated on this toggle in the current engine (`after === before`), change the assertion to `expect(highlightedCallers(container)).toEqual([after])` only and note it in the commit message; the re-key test already proves re-application after DOM replacement.

- [ ] **Step 4: Implement the plugin**

`libs/shared-react/src/plugins/usj/NoteCallerHighlightPlugin.tsx`:

```tsx
import { $getNoteByKeyOrIndex, $getNoteIndex } from "../../nodes/usj/note.utils";
import { $isImmutableNoteCallerNode } from "../../nodes/usj/ImmutableNoteCallerNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

/** PT9's selected-caller style: a thin top-and-bottom border on the note caller in the text. */
export const NOTE_CALLER_HIGHLIGHT_CLASS = "caller_highlight";

export type NoteCallerHighlightHandle = {
  /**
   * Highlights the caller of the given note (by key or document-order index); `undefined` clears
   * the highlight. Only one note is highlighted at a time.
   */
  setHighlightedNote(noteKeyOrIndex: string | number | undefined): void;
};

/**
 * Keeps `caller_highlight` on exactly one note's caller element. Lexical recreates a note's DOM
 * on collapse toggles and `replaceEmbedUpdate` re-keys it, so the class is re-applied after
 * every commit rather than set once. The highlight is tracked by document-order index — the
 * coordinate a host's notes pane addresses — so a re-keyed note keeps its highlight.
 */
export const NoteCallerHighlightPlugin = forwardRef<NoteCallerHighlightHandle>((_, ref) => {
  const [editor] = useLexicalComposerContext();
  const highlightedIndexRef = useRef<number | undefined>(undefined);
  const highlightedElementRef = useRef<HTMLElement | undefined>(undefined);

  const applyHighlight = useCallback(() => {
    const index = highlightedIndexRef.current;
    const callerKey =
      index === undefined
        ? undefined
        : editor.getEditorState().read(() => {
            const noteNode = $getNoteByKeyOrIndex(index);
            const caller = noteNode?.getFirstChild();
            return $isImmutableNoteCallerNode(caller) ? caller.getKey() : undefined;
          });
    const element = callerKey ? (editor.getElementByKey(callerKey) ?? undefined) : undefined;
    if (highlightedElementRef.current && highlightedElementRef.current !== element)
      highlightedElementRef.current.classList.remove(NOTE_CALLER_HIGHLIGHT_CLASS);
    element?.classList.add(NOTE_CALLER_HIGHLIGHT_CLASS);
    highlightedElementRef.current = element;
    // A note that has left the document drops the highlight for good.
    if (index !== undefined && !callerKey) highlightedIndexRef.current = undefined;
  }, [editor]);

  useImperativeHandle(
    ref,
    () => ({
      setHighlightedNote(noteKeyOrIndex) {
        highlightedIndexRef.current =
          typeof noteKeyOrIndex === "string"
            ? editor.getEditorState().read(() => $getNoteIndex(noteKeyOrIndex))
            : noteKeyOrIndex;
        applyHighlight();
      },
    }),
    [editor, applyHighlight],
  );

  useEffect(() => editor.registerUpdateListener(() => applyHighlight()), [editor, applyHighlight]);

  useEffect(
    () => () => highlightedElementRef.current?.classList.remove(NOTE_CALLER_HIGHLIGHT_CLASS),
    [],
  );

  return null;
});
NoteCallerHighlightPlugin.displayName = "NoteCallerHighlightPlugin";
```

Check whether `getElementByKey` returns the `<span class="immutable-note-caller">` for the caller node (it should: that is the node's `createDOM` element at `ImmutableNoteCallerNode.tsx:153-160`). If the decorator's element is instead the inner `<button>`, target the element `.closest(".immutable-note-caller")`.

Export from `libs/shared-react/src/index.ts`: `NoteCallerHighlightPlugin`, `NoteCallerHighlightHandle`, `NOTE_CALLER_HIGHLIGHT_CLASS`.

Editor wiring in `packages/platform/src/editor/Editor.tsx`: add `const noteCallerHighlightRef = useRef<NoteCallerHighlightHandle>(null);`, mount `<NoteCallerHighlightPlugin ref={noteCallerHighlightRef} />` next to `<NoteShellCaretGuardPlugin />` (~line 1170), and add to `editorApi`:

```ts
    highlightNote(noteKeyOrIndex) {
      noteCallerHighlightRef.current?.setHighlightedNote(noteKeyOrIndex);
    },
```

`editor.model.ts` after `getNoteIndex`:

```ts
  /**
   * Highlights the caller of the given note in the text with PT9's selected-note style (a thin
   * top-and-bottom border, class `caller_highlight`), replacing any previous highlight. Pass
   * `undefined` to clear. Purely presentational: never changes the document.
   * @param noteKeyOrIndex - Note key or document-order index (see `getNoteIndex`).
   */
  highlightNote(noteKeyOrIndex: string | number | undefined): void;
```

- [ ] **Step 5: Run the suites and the project typecheck**

Run: `$SHIM_ENV pnpm nx run @eten-tech-foundation/platform-editor:typecheck` (must show no new errors; a `MarginalRef` TS2739 means the delegation is missing) and `$SHIM_ENV pnpm nx test @eten-tech-foundation/platform-editor -- noteIndexAndHighlight`
Expected: PASS (all six highlight tests plus Task 1's). Then the full editor and shared-react suites: `$SHIM_ENV pnpm nx test @eten-tech-foundation/platform-editor` and `$SHIM_ENV pnpm nx test shared-react` — expected PASS (note SE issue #3: two known-flaky tests; rerun a failure once before treating it as yours).

- [ ] **Step 6: Commit**

```bash
git add libs/shared-react/src/plugins/usj/NoteCallerHighlightPlugin.tsx libs/shared-react/src/index.ts packages/platform/src/editor/editor.model.ts packages/platform/src/editor/Editor.tsx packages/platform/src/editor/noteIndexAndHighlight.test.tsx
git commit -m "feat(platform): EditorRef.highlightNote applies PT9's selected-caller border"
```

---

### Task 3: Build, extract API, commit dist, publish to the core worktree (editor)

**Files:**
- Regenerate: `packages/platform/dist/**`, `packages/platform/etc/platform-editor.api.md`
- Do NOT bump `packages/platform/package.json`'s `version`: the repo's bump-versions/publish workflow owns versioning.

- [ ] **Step 1: Typecheck + lint**

Run: `$SHIM_ENV pnpm nx typecheck @eten-tech-foundation/platform-editor` and `$SHIM_ENV pnpm nx lint @eten-tech-foundation/platform-editor` (and the same for `shared-react`). Expected: clean.

- [ ] **Step 2: Build, extract API**

`$SHIM_ENV pnpm nx build @eten-tech-foundation/platform-editor --skip-nx-cache && $SHIM_ENV pnpm nx extract-api @eten-tech-foundation/platform-editor --skip-nx-cache`
Expected: `packages/platform/dist/index.d.ts` contains `getNoteIndex(noteKey: string)`, `getNoteKey(noteIndex: number)`, and `highlightNote(noteKeyOrIndex`; `etc/platform-editor.api.md` diff shows the three new members and nothing removed.

- [ ] **Step 3: Commit the artifacts**

```bash
git add packages/platform/dist packages/platform/etc/platform-editor.api.md
git commit -m "build(platform): rebuild dist and API report for getNoteIndex/getNoteKey/highlightNote"
```

- [ ] **Step 4: Publish into the core worktree via yalc (publish + link, NEVER `yalc push`)**

`yalc push` rewires every paranext-core checkout registered in the yalc store (several sibling worktrees are), so it is forbidden here. From `packages/platform`: `$SHIM_ENV npx tsx ../../scripts/prepare-publish.ts && $SHIM_ENV npx yalc publish --no-scripts`, then `git restore package.json` (prepare-publish rewrites it; `git status` must be clean afterwards). Then in the core worktree root (`/home/tj_co/source/repos/workspaces/pt-4189-footnote-pane-editing/paranext-core`): `npm run editor:link` and verify `grep -c "highlightNote" node_modules/@eten-tech-foundation/platform-editor/dist/index.d.ts` prints ≥ 1 and `grep -c "getNoteKey" …` prints ≥ 1. Then `cd lib/platform-bible-react && npm run typecheck` in core — expected clean. Do not run `npm install` in core (it would re-run the postinstall's dev-package linking against the wrong branch).

- [ ] **Step 5: Push the editor branch**

`git push -u origin pt-4189-footnote-pane-editing` from the editor worktree.

---

### Task 4: Remove the "Auto-show footnote pane" feature (core)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/contributions/menus.json:105-110`
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json:137,335`
- Modify: `extensions/src/platform-scripture-editor/src/main.ts:514-517,763-783,1362-1382,1584`
- Modify: `extensions/src/platform-scripture-editor/src/types/platform-scripture-editor.d.ts:59-65,155,369-372,821-829`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.ts:123-164`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.test.ts:252-320`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts:143-227`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.test.ts:2761-2870`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx:900-925,1080,1631-1638,1829,3186-3220`

**Interfaces:**
- Produces: `NoteCallerClickState.isPowerMode: boolean` replaces `isAutoShowEnabled`; `showPane = isPowerMode && !paneVisible`. (Task 7 extends this type further.)

- [ ] **Step 1: Update the decision tests (red)**

In `platform-scripture-editor.utils.test.ts` `describe('decideNoteCallerClickAction …')`: rename `isAutoShowEnabled` to `isPowerMode` in `base` and in the three `showPane` cases; rename the case titles to say "Power mode" / "Simple mode". Delete `describe('resolveFootnotesPaneAutoVisibility')` (lines 252-320) from `platform-scripture-editor.web-view.utils.test.ts`.

Run: `cd extensions/src/platform-scripture-editor && npx vitest run platform-scripture-editor.utils.test.ts`
Expected: FAIL — TypeScript/vitest complains `isPowerMode` is not in `NoteCallerClickState` (or `showPane` mismatches).

- [ ] **Step 2: Remove the feature**

Delete, in this order:
1. `menus.json`: the item whose `command` is `platformScriptureEditor.toggleFootnotesAutoShow`.
2. `localizedStrings.json`: both `%webView_platformScriptureEditor_toggleFootnotesAutoShow%` entries.
3. `platform-scripture-editor.d.ts`: `EditorMessageToggleFootnotesAutoShow`, its union member, the controller method `toggleFootnotesAutoShow`, and the `CommandHandlers['platformScriptureEditor.toggleFootnotesAutoShow']` entry.
4. `main.ts`: the `toggleFootnotesAutoShow` function, controller method, `registerCommand` block, and its entry in the registrations array.
5. `web-view.utils.ts`: `FootnotesPaneAutoVisibilityInput` and `resolveFootnotesPaneAutoVisibility`.
6. `platform-scripture-editor.utils.ts`: in `NoteCallerClickState`, replace
   ```ts
   /** Whether the footnotes-pane auto-show behavior is enabled … */
   isAutoShowEnabled: boolean;
   ```
   with
   ```ts
   /**
    * Whether the interface is in Power mode. A caller click reveals a hidden pane only in Power
    * mode; Simple mode keeps PT9's manual pane visibility.
    */
   isPowerMode: boolean;
   ```
   and `const showPane = state.isPowerMode && !state.paneVisible;`. Update the docblock's `showPane` paragraph to describe the Power-mode rule.
7. `web-view.tsx`: remove `footnotesAutoShowChoice`/`setFootnotesAutoShow`, `footnotesAutoShow`, `footnotesAutoShowRef` (+ effect), `footnotesManualOverrideChapterRef` (+ the chapter-change effect's reset of it — keep that effect for `setFootnotePaneFocusRequest(undefined)`), the `toggleFootnotesAutoShow` message case, `setFootnotesAutoShow` from the message-handler dep array, `chapterHasNotes` and the auto-visibility `useEffect` (whole `#region Footnotes Auto-Show Decision`), and the `resolveFootnotesPaneAutoVisibility` import. In `noteCallerOnClick` pass `isPowerMode: isPowerModeRef.current` — add `const isPowerModeRef = useRef(isPowerMode); useEffect(() => { isPowerModeRef.current = isPowerMode; }, [isPowerMode]);` next to `footnotesPaneVisibleRef`. The `toggleFootnotesPaneVisibility` message case no longer records a manual override; it just flips `footnotesPaneVisible`.
8. Grep the extension for `AutoShow|autoShow|ManualOverride` — expected zero hits outside git history.

- [ ] **Step 3: Verify**

Run: `cd extensions/src/platform-scripture-editor && npx vitest run` — expected PASS. `cd extensions && NODE_ENV=development npx eslint --ext .ts,.tsx src/platform-scripture-editor` — clean. Root `npm run typecheck` — clean. `npx vitest run src/localized-strings.test.ts` from the extension dir — PASS.

- [ ] **Step 4: Commit**

```bash
git add -A extensions/src/platform-scripture-editor
git commit -m "Remove the footnotes-pane auto-show toggle; caller clicks reveal the pane in Power mode"
```

---

### Task 5: Footnotes pane close (X) button (core)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json` (add `%webView_footnoteList_close%` en + es)
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx`
- Create: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.test.tsx`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` (pane render ~line 3879)

**Interfaces:**
- Produces: `FootnotesLayoutProps.onClose: () => void` and `FootnotesLayoutProps.localizedStrings: LocalizedStrings` (the web view already holds `localizedStrings` from `useLocalizedStrings`; pass it through).

- [ ] **Step 1: Write the failing component test**

Create `platform-scripture-editor-footnotes.component.test.tsx`. Look at `extensions/src/platform-scripture-editor/src/collab-implicit-close-round-trip.test.tsx` and `scripture-text-grid/*.test.tsx` for how this extension's component tests mock `@papi/frontend` (`logger`) and `platform-bible-react`; mirror those mocks. Minimal harness:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { useState } from 'react';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';

vi.mock('@papi/frontend', () => ({ logger: { warn: vi.fn(), debug: vi.fn(), info: vi.fn(), error: vi.fn() } }));

// Real web-view state hook stand-in: plain React state keyed by name.
function useWebViewStateMock<T>(_key: string, defaultValue: T) {
  return useState<T>(defaultValue);
}

const note = (text: string) => ({
  type: 'note', marker: 'f', caller: '+',
  content: [{ type: 'char', marker: 'fr', content: ['1:1 '] }, { type: 'char', marker: 'ft', content: [text] }],
});
const usjWithTwoNotes: Usj = {
  type: 'USJ', version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Test'] },
    { type: 'chapter', marker: 'c', number: '1' },
    { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, 'a ', note('alpha'), ' b ', note('beta')] },
  ],
};
const localizedStrings = { '%webView_footnoteList_close%': 'Close footnotes pane' };

function renderPane(overrides: Partial<React.ComponentProps<typeof FootnotesLayout>> = {}) {
  return render(
    <FootnotesLayout
      usj={usjWithTwoNotes}
      showMarkers
      useWebViewState={useWebViewStateMock}
      localizedStrings={localizedStrings}
      onClose={() => {}}
      {...overrides}
    >
      <div data-testid="editor" />
    </FootnotesLayout>,
  );
}

describe('FootnotesLayout close button', () => {
  it('renders a close button labeled from localized strings that calls onClose', () => {
    const onClose = vi.fn();
    renderPane({ onClose });
    fireEvent.click(screen.getByRole('button', { name: 'Close footnotes pane' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
```

If `ResizablePanelGroup` needs a `ResizeObserver` in jsdom, stub `globalThis.ResizeObserver` in the test file with a class whose `observe`/`disconnect`/`unobserve` are no-ops (check whether an existing test in this extension already does so and copy it).

Run: `cd extensions/src/platform-scripture-editor && npx vitest run platform-scripture-editor-footnotes.component.test.tsx`
Expected: FAIL — no button with that name.

- [ ] **Step 2: Implement**

`localizedStrings.json` — add under `en`: `"%webView_footnoteList_close%": "Close footnotes pane"` and under `es`: `"%webView_footnoteList_close%": "Cerrar el panel de notas al pie"` (keep the file's alphabetical/grouped order next to `%webView_footnoteList_header%`).

`platform-scripture-editor-footnotes.component.tsx`:
- Add to props: `localizedStrings: LocalizedStrings;` (`import type { LocalizedStrings } from 'platform-bible-utils';`) and `onClose: () => void;`.
- Import `Button` from `platform-bible-react` and `X` from `lucide-react`.
- Render, as the first child inside the pane's `ResizablePanel` inner `div`, a slim row (no title; the title header was removed by team decision):

```tsx
<div className="tw:flex tw:justify-end tw:shrink-0 tw:pr-1">
  <Button
    variant="ghost"
    size="icon"
    className="tw:h-6 tw:w-6"
    aria-label={localizedStrings['%webView_footnoteList_close%']}
    onClick={onClose}
  >
    <X className="tw:h-4 tw:w-4" />
  </Button>
</div>
```

The list container below it keeps `tw:flex-1 tw:min-h-0` so the row does not steal scroll height. Check `getPaneSizeLimits` inputs: bump `footnoteRowHeightPx`'s companion minimum by the row's height (add `const footnoteCloseRowHeightPx = 24;` and pass `secondaryPaneMinSizePx: footnoteRowHeightPx + footnoteCloseRowHeightPx` for the bottom position) so the minimum pane size still shows one row.

`web-view.tsx` pane render: add `localizedStrings={localizedStrings}` and `onClose={hideFootnotesPane}` where

```ts
/** Hides the footnotes pane and returns focus to the text, as PT9's pane close button does. */
const hideFootnotesPane = useCallback(() => {
  setFootnotesPaneVisible(false);
  editorRef.current?.focus();
}, [setFootnotesPaneVisible]);
```

Add `'%webView_footnoteList_close%'` to the web view's localized string key list (find the `useLocalizedStrings([...])` array / `LOCALIZED_STRING_KEYS` constant and add the key).

- [ ] **Step 3: Verify**

Run the component test — PASS. `npx vitest run src/localized-strings.test.ts` — PASS. Lint + root typecheck — clean.

- [ ] **Step 4: Commit**

```bash
git add extensions/src/platform-scripture-editor/contributions/localizedStrings.json extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.test.tsx extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx
git commit -m "Add a close button to the footnotes pane"
```

---

### Task 6: `resolveNoteEditingSurface` + reworked `decideNoteCallerClickAction` (core, pure)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts:143-227`
- Test: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.test.ts:2761+`

**Interfaces:**
- Produces:
  ```ts
  export type NoteEditingSurface = 'pane' | 'popover' | 'none';
  export function resolveNoteEditingSurface(input: { viewType: ScriptureEditorViewType; isReadOnly: boolean }): NoteEditingSurface;
  export type NoteCallerClickState = {
    isCollapsed: boolean | undefined;
    editingNoteKey: string | undefined;
    popoverShown: boolean;
    paneVisible: boolean;
    paneRendered: boolean;
    isPowerMode: boolean;
    surface: NoteEditingSurface;
  };
  export type NoteCallerClickAction = 'ignore-expanded' | 'ignore-popover-open' | 'open-popover' | 'open-pane-editor' | 'navigate-only';
  export type NoteCallerClickDecision = { clearStaleEditingSession: boolean; action: NoteCallerClickAction; sendPaneFocusRequest: boolean; showPane: boolean };
  ```

- [ ] **Step 1: Write the failing tests**

Add to `platform-scripture-editor.utils.test.ts`:

```ts
describe('resolveNoteEditingSurface', () => {
  it('routes Standard view to the pane', () => {
    expect(resolveNoteEditingSurface({ viewType: 'standard', isReadOnly: false })).toBe('pane');
  });
  it.each(['formatted', 'markers', 'basic'] as const)('routes %s view to the popover', (viewType) => {
    expect(resolveNoteEditingSurface({ viewType, isReadOnly: false })).toBe('popover');
  });
  it('has no editing surface when read-only, in any view', () => {
    expect(resolveNoteEditingSurface({ viewType: 'standard', isReadOnly: true })).toBe('none');
    expect(resolveNoteEditingSurface({ viewType: 'formatted', isReadOnly: true })).toBe('none');
  });
});
```

(Check `ScriptureEditorViewType`'s members in `types/platform-scripture-editor.d.ts` and use real ones in `it.each`.)

Extend the existing `decideNoteCallerClickAction` describe — update `base` to `{ isCollapsed: true, editingNoteKey: undefined, popoverShown: false, paneVisible: false, paneRendered: false, isPowerMode: true, surface: 'popover' as const }` and add:

```ts
  it('Standard view: opens the pane editor and reveals a hidden pane', () => {
    const d = decideNoteCallerClickAction({ ...base, surface: 'pane' });
    expect(d).toEqual({ clearStaleEditingSession: false, action: 'open-pane-editor', showPane: true, sendPaneFocusRequest: true });
  });
  it('Standard view: an open pane session is not stale bookkeeping', () => {
    const d = decideNoteCallerClickAction({ ...base, surface: 'pane', editingNoteKey: 'k1', paneVisible: true, paneRendered: true });
    expect(d.clearStaleEditingSession).toBe(false);
    expect(d.action).toBe('open-pane-editor');
  });
  it('read-only: navigates only, still revealing the pane in Power mode', () => {
    const d = decideNoteCallerClickAction({ ...base, surface: 'none' });
    expect(d.action).toBe('navigate-only');
    expect(d.showPane).toBe(true);
    expect(d.sendPaneFocusRequest).toBe(true);
  });
  it('read-only in Simple mode: navigates within an already-rendered pane only', () => {
    expect(decideNoteCallerClickAction({ ...base, surface: 'none', isPowerMode: false })).toMatchObject({ action: 'navigate-only', showPane: false, sendPaneFocusRequest: false });
    expect(decideNoteCallerClickAction({ ...base, surface: 'none', isPowerMode: false, paneVisible: true, paneRendered: true })).toMatchObject({ action: 'navigate-only', showPane: false, sendPaneFocusRequest: true });
  });
  it('expanded caller is ignored regardless of surface', () => {
    expect(decideNoteCallerClickAction({ ...base, surface: 'pane', isCollapsed: false }).action).toBe('ignore-expanded');
  });
  it('popover surface keeps ignoring a click while the popover is open', () => {
    expect(decideNoteCallerClickAction({ ...base, popoverShown: true, editingNoteKey: 'k' }).action).toBe('ignore-popover-open');
  });
```

Run: `npx vitest run platform-scripture-editor.utils.test.ts` — FAIL (missing export / wrong shapes).

- [ ] **Step 2: Implement**

In `platform-scripture-editor.utils.ts`:

```ts
/** Where a note is edited: the footnotes pane (Standard view), the popover, or nowhere. */
export type NoteEditingSurface = 'pane' | 'popover' | 'none';

/**
 * Decides the note-editing surface. Standard view edits notes in the footnotes pane, in place, as
 * PT9 does; every other view keeps the popover. A read-only text has no editing surface — caller
 * clicks still navigate (show/scroll the pane) but never open an editor.
 */
export function resolveNoteEditingSurface({
  viewType,
  isReadOnly,
}: {
  viewType: ScriptureEditorViewType;
  isReadOnly: boolean;
}): NoteEditingSurface {
  if (isReadOnly) return 'none';
  return viewType === 'standard' ? 'pane' : 'popover';
}
```

Replace `NoteCallerClickState`/`NoteCallerClickDecision`/`decideNoteCallerClickAction` with:

```ts
export type NoteCallerClickState = {
  /** Whether the clicked note is collapsed (only collapsed callers route anywhere). */
  isCollapsed: boolean | undefined;
  /** Key of the note currently being edited, if any (popover or pane session). */
  editingNoteKey: string | undefined;
  /** Whether the popover is currently shown. */
  popoverShown: boolean;
  /** The footnotes-pane visibility toggle. */
  paneVisible: boolean;
  /** Whether the pane is actually rendered (visible AND has content). */
  paneRendered: boolean;
  /** Power mode reveals a hidden pane on a caller click; Simple mode leaves visibility manual. */
  isPowerMode: boolean;
  /** Where the note would be edited; see `resolveNoteEditingSurface`. */
  surface: NoteEditingSurface;
};

export type NoteCallerClickAction =
  | 'ignore-expanded'
  | 'ignore-popover-open'
  | 'open-popover'
  | 'open-pane-editor'
  | 'navigate-only';

export type NoteCallerClickDecision = {
  /** A session key survived without its popover: orphaned bookkeeping to clear first. */
  clearStaleEditingSession: boolean;
  action: NoteCallerClickAction;
  /** Select/scroll the clicked note in the pane (when the pane is or is about to be rendered). */
  sendPaneFocusRequest: boolean;
  /** Reveal the hidden pane (Power mode only). */
  showPane: boolean;
};

export function decideNoteCallerClickAction(state: NoteCallerClickState): NoteCallerClickDecision {
  // A pane session keeps its key between clicks by design; only a popover session whose popover
  // is gone is orphaned.
  const clearStaleEditingSession =
    state.editingNoteKey !== undefined && !state.popoverShown && state.surface !== 'pane';
  const showPane = state.isPowerMode && !state.paneVisible;
  const sendPaneFocusRequest = state.paneRendered || showPane;

  if (!state.isCollapsed)
    return { clearStaleEditingSession, action: 'ignore-expanded', sendPaneFocusRequest: false, showPane: false };
  if (state.surface === 'popover' && state.popoverShown)
    return { clearStaleEditingSession, action: 'ignore-popover-open', sendPaneFocusRequest: false, showPane: false };

  const action: NoteCallerClickAction =
    state.surface === 'pane' ? 'open-pane-editor' : state.surface === 'popover' ? 'open-popover' : 'navigate-only';
  return { clearStaleEditingSession, action, sendPaneFocusRequest, showPane };
}
```

Keep/adapt the existing docblock: it must no longer say the popover opens "always, in every view". Keep the existing tests' expectations for the popover cases (adjust only the renamed input).

- [ ] **Step 3: Verify + commit**

Run: `npx vitest run platform-scripture-editor.utils.test.ts` — PASS. Root typecheck will now fail in `web-view.tsx` (missing `surface` input) until Task 9 wires it; run `npx tsc --noEmit -p extensions/tsconfig.json 2>&1 | grep -v web-view.tsx` to confirm nothing else breaks. The pre-commit hook only runs gitleaks and prettier/stylelint on staged files, so the commit goes through. Commit:

```bash
git add extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.test.ts
git commit -m "Decide the note-editing surface per view: pane in Standard, popover elsewhere, none read-only"
```

---

### Task 7: `scrollToNoteCaller(index)` DOM helper (core)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/editor-dom.util.ts` (after `scrollToAnnotation`, ~line 263-300)
- Test: `extensions/src/platform-scripture-editor/src/editor-dom.util.test.ts` (create or extend if it exists)

**Interfaces:**
- Produces: `export function scrollToNoteCaller(noteIndex: number): HTMLElement | undefined` — scrolls the editor's scroll container so the `noteIndex`-th `.editor-container .note` element is visible (nearest edge, same math as `scrollToAnnotation`); returns the note element, or `undefined` (no scroll) when no such note exists. No-op when already fully visible.

- [ ] **Step 1: Write the failing test**

`editor-dom.util.test.ts` already has `buildEditorDom`, `buildAnnotationDom`, `stubRect`, and `VIEWPORT_HEIGHT` (900). Add a fixture next to `buildAnnotationDom`:

```ts
function buildNotesDom(options: EditorDomOptions = {}): EditorDom & { notes: HTMLElement[] } {
  const dom = buildEditorDom({ ...options, verseNumbers: [] });
  const notes = [1500, 1800].map((top) => {
    const note = document.createElement('span');
    note.className = 'note collapsed usfm_f';
    stubRect(note, top, 20);
    dom.editorContainer.append(note);
    return note;
  });
  return { ...dom, notes };
}
```

And the suite:

```ts
describe('scrollToNoteCaller', () => {
  it('returns undefined and does not scroll when no note exists at the index', () => {
    const { wrapperScrollTo } = buildNotesDom();
    expect(scrollToNoteCaller(2)).toBeUndefined();
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });

  it('does not scroll when the caller is already fully visible', () => {
    const { notes, wrapperScrollTo } = buildNotesDom();
    stubRect(notes[0], 400, 20); // within [0, 900), scrollTop 0
    expect(scrollToNoteCaller(0)).toBe(notes[0]);
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });

  it('aligns the caller to the closer edge when it is out of view', () => {
    const { notes, wrapperScrollTo } = buildNotesDom(); // note 1 rect top 1800, height 20
    expect(scrollToNoteCaller(1)).toBe(notes[1]);
    // noteTop = 1800, bottom = 1820; distanceToTop = 1800, distanceToBottom = |900 - 1820| = 920
    // -> bottom edge; targetTop = 1820 - 900 + 80 = 1000
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 1000 });
  });

  it('addresses notes by document order', () => {
    const { notes, wrapperScrollTo } = buildNotesDom();
    scrollToNoteCaller(0);
    // note 0 rect top 1500: bottom edge, target = 1520 - 900 + 80 = 700
    expect(wrapperScrollTo).toHaveBeenLastCalledWith({ behavior: 'smooth', top: 700 });
    expect(scrollToNoteCaller(0)).toBe(notes[0]);
  });
});
```

Import `scrollToNoteCaller` alongside `scrollToAnnotation`. Run: `cd extensions/src/platform-scripture-editor && npx vitest run editor-dom.util.test.ts` — FAIL (`scrollToNoteCaller` is not exported).

- [ ] **Step 2: Implement with a shared helper**

In `editor-dom.util.ts`, extract the body of `scrollToAnnotation` after the element lookup into a private helper so both functions share the math:

```ts
/**
 * Scrolls `element`'s scroll container so the element is fully visible, aligning to whichever
 * edge is closer and keeping `VERSE_NUMBER_SCROLL_OFFSET` of context. Does nothing when the
 * element is already fully visible or has no scrollable ancestor.
 */
function scrollElementIntoScrollContainer(element: HTMLElement): void {
  const scrollContainerElement = findScrollContainer(element);
  if (!scrollContainerElement) return;
  … (the existing scrollTop/clientHeight/rect/nearer-edge/clamp/scrollTo logic, unchanged)
}

export function scrollToAnnotation(id: string): HTMLElement | undefined {
  const escapedAnnotationClass = CSS.escape(`annotationId-${id}`);
  const annotationElement =
    document.querySelector<HTMLElement>(`.editor-container .${escapedAnnotationClass}`) ?? undefined;
  if (annotationElement) scrollElementIntoScrollContainer(annotationElement);
  return annotationElement;
}

/**
 * Scrolls the text so the caller of the note at `noteIndex` (document order — the same index the
 * footnotes pane and `EditorRef.getNoteIndex` use) is visible.
 *
 * @returns The note element, or `undefined` when no note exists at that index
 */
export function scrollToNoteCaller(noteIndex: number): HTMLElement | undefined {
  const noteElement = document.querySelectorAll<HTMLElement>('.editor-container .note')[noteIndex];
  if (!noteElement) return undefined;
  scrollElementIntoScrollContainer(noteElement);
  return noteElement;
}
```

Keep `scrollToAnnotation`'s existing comment about `CSS.escape`.

- [ ] **Step 3: Verify + commit**

Run: `npx vitest run editor-dom.util.test.ts` — PASS (the existing `scrollToAnnotation` cases must still pass unchanged). Commit:

```bash
git add extensions/src/platform-scripture-editor/src/editor-dom.util.ts extensions/src/platform-scripture-editor/src/editor-dom.util.test.ts
git commit -m "Add scrollToNoteCaller and share the edge-alignment scroll math with scrollToAnnotation"
```

---

### Task 8: `FootnotesLayout` editing seam + selection-change callback (core)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx`
- Test: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.test.tsx` (extend)

**Interfaces:**
- Consumes: `FootnoteListProps.editingFootnoteIndex`, `renderEditingFootnote`, `onFootnoteEditRequested`, `FootnoteCaretPosition` from `platform-bible-react` (PR 2655, merged).
- Produces new `FootnotesLayoutProps`:
  ```ts
  /** Index of the row rendered as an editor (pass-through to FootnoteList). */
  editingFootnoteIndex?: number;
  renderEditingFootnote?: (footnote: MarkerObject, index: number) => ReactNode;
  /** Row click/Enter when editing is possible. Also selects the row. */
  onFootnoteEditRequested?: (index: number, caretPosition: FootnoteCaretPosition) => void;
  /** Fires whenever the selected row changes (row click, focus request, or cleared). */
  onSelectedFootnoteChange?: (index: number | undefined) => void;
  ```
  `onFootnoteSelected(index)` keeps its meaning (row activated without an edit request, i.e. Space, or click when `onFootnoteEditRequested` is not provided).

- [ ] **Step 1: Failing tests**

```tsx
describe('FootnotesLayout editing seam', () => {
  it('renders the supplied editor in the editing row', () => {
    renderPane({ editingFootnoteIndex: 1, renderEditingFootnote: () => <div data-testid="row-editor" /> });
    expect(screen.getByTestId('row-editor')).toBeInTheDocument();
  });
  it('forwards a row click as an edit request with the caret position and selects the row', () => {
    const onFootnoteEditRequested = vi.fn();
    const onSelectedFootnoteChange = vi.fn();
    renderPane({ onFootnoteEditRequested, onSelectedFootnoteChange });
    fireEvent.click(screen.getAllByRole('option')[1]);
    expect(onFootnoteEditRequested).toHaveBeenCalledWith(1, expect.anything());
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);
  });
  it('reports selection driven by a focus request', () => {
    const onSelectedFootnoteChange = vi.fn();
    const { rerender } = renderPane({ onSelectedFootnoteChange });
    rerender(<FootnotesLayout usj={usjWithTwoNotes} showMarkers useWebViewState={useWebViewStateMock} localizedStrings={localizedStrings} onClose={() => {}} onSelectedFootnoteChange={onSelectedFootnoteChange} focusRequest={{ index: 0 }}><div /></FootnotesLayout>);
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(0);
  });
  it('reports undefined when the selected note disappears from the USJ', () => {
    const onSelectedFootnoteChange = vi.fn();
    const props = { showMarkers: true, useWebViewState: useWebViewStateMock, localizedStrings, onClose: () => {}, onSelectedFootnoteChange };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes} focusRequest={{ index: 1 }}><div /></FootnotesLayout>,
    );
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);
    const usjWithOneNote: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, 'a ', note('alpha')] },
      ],
    };
    rerender(<FootnotesLayout {...props} usj={usjWithOneNote} focusRequest={{ index: 1 }}><div /></FootnotesLayout>);
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(undefined);
  });
});
```

Run: `npx vitest run platform-scripture-editor-footnotes.component.test.tsx` — FAIL (unknown props / no editor rendered / callbacks not called).

- [ ] **Step 2: Implement**

- Add the four props; thread `editingFootnoteIndex`/`renderEditingFootnote` to `FootnoteList`.
- Add `handleFootnoteEditRequested = useCallback((_f, index, listId, caret) => { if (index < 0 || index >= footnotes.length || listId !== footnoteListKey) return; setSelectedFootnote({ footnote: footnotes[index], index }); onFootnoteEditRequested?.(index, caret); }, [...])` and pass it as `onFootnoteEditRequested` **only when the prop is provided** (`onFootnoteEditRequested ? handleFootnoteEditRequested : undefined`) so formatted-view behavior (row click → `onFootnoteSelected`) is unchanged.
- Add an effect: `useEffect(() => { onSelectedFootnoteChange?.(selectedFootnote?.index); }, [selectedFootnote, onSelectedFootnoteChange]);` — note `selectedFootnote` identity changes on every (re)selection, which is fine (the consumer's `highlightNote` is idempotent).

- [ ] **Step 3: Verify + commit**

Component test — PASS. Lint clean. Commit `Expose the footnotes pane's editing seam and selection changes to the web view`.

---

### Task 9: Web view — Standard-view pane editing session (core)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` (regions: Footnotes Pane State ~867; `noteCallerOnClick` ~1049-1145; `closeFootnoteEditor` ~2852; `handleFootnoteSelected` ~2662; pane render ~3879; popover render ~3928)

**Interfaces:**
- Consumes: Tasks 1-2 (`editorRef.getNoteIndex`, `highlightNote`), Task 6 (`resolveNoteEditingSurface`, decision), Task 7 (`scrollToNoteCaller`), Task 8 (layout props).
- Produces (internal): `startPaneNoteEdit(index, noteKey, noteOp, caret)`, `endNoteEditingSession()`, `paneEditingIndex` state.

- [ ] **Step 1: Refs for the stable caller-click closure**

Near `footnotesPaneVisibleRef`, add mirrored refs for `isReadOnlyEffective` and `viewType` (`isReadOnlyEffectiveRef`, `viewTypeRef`, each with the `useEffect` mirror). `noteCallerOnClick` is baked into caller nodes when the document loads, so it must read every gate from refs rather than closure values.

- [ ] **Step 2: Session state**

In the Footnotes Pane State region:

```ts
/**
 * Row of the footnotes pane currently rendered as an inline editor (Standard view only), or
 * `undefined`. Exclusive with the popover (`showFootnoteEditor`): the note being edited is the
 * same session (`editingNoteKey`/`editingNoteOps`) on whichever surface the view uses.
 */
const [paneEditingIndex, setPaneEditingIndex] = useState<number | undefined>(undefined);
/** Where the pane editor puts its caret when it opens: PT9 lands at the end on a caller click. */
const [paneEditingCaret, setPaneEditingCaret] = useState<FootnoteCaretPosition>('end');

const startPaneNoteEdit = useCallback(
  (index: number, noteKey: string, noteOp: DeltaOpInsertNoteEmbed, caret: FootnoteCaretPosition, isNew = false) => {
    editingNoteKey.current = noteKey;
    editingNoteOps.current = [noteOp];
    editingNoteIsNew.current = isNew;
    editingNoteSessionRefreshedAt.current = Date.now();
    setShowFootnoteEditor(false);
    setPaneEditingCaret(caret);
    setPaneEditingIndex(index);
    setFootnotePaneFocusRequest({ index });
  },
  [],
);
```

Extend `closeFootnoteEditor` (existing) so its final line also runs `setPaneEditingIndex(undefined)`; it is the single "end session" path for both surfaces. In the pane model nothing is discarded on end, so pane callers use `closeFootnoteEditor(false)`.

- [ ] **Step 3: Rework `noteCallerOnClick`**

Register the handler unconditionally (drop the `isReadOnlyEffective ? undefined :` gate — read-only navigation must work). Body:

```ts
(event, noteNodeKey, isCollapsed, _getCaller, _setCaller, getNoteOps, getNoteIndex) => {
  const surface = resolveNoteEditingSurface({ viewType: viewTypeRef.current, isReadOnly: isReadOnlyEffectiveRef.current });
  logger.debug(`noteCallerOnClick: … surface=${surface}`);   // keep the existing diagnostic line, add surface
  const decision = decideNoteCallerClickAction({
    isCollapsed,
    editingNoteKey: editingNoteKey.current,
    popoverShown: showFootnoteEditorRef.current,
    paneVisible: footnotesPaneVisibleRef.current,
    paneRendered: footnotesPaneRenderedRef.current,
    isPowerMode: isPowerModeRef.current,
    surface,
  });
  if (decision.clearStaleEditingSession) { …existing clear block… }
  if (decision.action === 'ignore-expanded' || decision.action === 'ignore-popover-open') return;

  if (decision.showPane) setFootnotesPaneVisible(true);
  const index = decision.sendPaneFocusRequest || decision.action === 'open-pane-editor' ? getNoteIndex() : undefined;
  if (decision.sendPaneFocusRequest) {
    if (index !== undefined) setFootnotePaneFocusRequest({ index });
    else logger.warn('noteCallerOnClick: clicked note is no longer attached; pane focus request dropped');
  }
  if (decision.action === 'navigate-only') return;

  const noteOp = getNoteOps()?.at(0);
  if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) { logger.warn('noteCallerOnClick: clicked note produced no valid note op; ignoring'); return; }

  if (decision.action === 'open-pane-editor') {
    if (index === undefined) return;
    startPaneNoteEdit(index, noteNodeKey, noteOp, 'end');
    return;
  }
  …existing popover-open block (anchor rects, refs, setShowFootnoteEditor(true))…
}
```

Remove the `TODO(PT-4478)` comment: Step 6 makes both sides index one document. Update the `useMemo` deps (drop `isReadOnlyEffective` and `viewType` — they are read via refs now; add `startPaneNoteEdit`). Keep the comment explaining the refs.

- [ ] **Step 4: Pane row edit request + selection → text**

```ts
/**
 * Standard view: a pane row click opens that note in the row editor with the caret where clicked,
 * and scrolls the text to its caller (the highlight follows through the selection change).
 */
const handleFootnoteEditRequested = useCallback(
  (index: number, caret: FootnoteCaretPosition) => {
    scrollToNoteCaller(index);
    const noteKey = editorRef.current?.getNoteKey(index);
    const noteOp = editorRef.current?.getNoteOps(index)?.at(0);
    if (!noteKey || !noteOp || !isInsertEmbedOpOfType('note', noteOp)) {
      logger.warn(`footnotes pane: note ${index} produced no valid note op; selecting only`);
      return;
    }
    startPaneNoteEdit(index, noteKey, noteOp, caret);
  },
  [startPaneNoteEdit],
);
```

Selection → text, in Standard view (any editability):

```ts
const handleSelectedFootnoteChange = useCallback((index: number | undefined) => {
  if (viewTypeRef.current !== 'standard') return;
  editorRef.current?.highlightNote(index);
}, []);
```

`handleFootnoteSelected` (Space, or a row click when no edit request handler is passed — the read-only case): keep `selectNote(index)` for non-Standard views; in Standard view call `scrollToNoteCaller(index)` instead (the caret stays in the pane; the highlight marks the caller; a read-only editor gets no caret move).

- [ ] **Step 5: Render the inline editor**

```tsx
const renderPaneFootnoteEditor = useCallback(
  () => (
    <FootnoteEditor
      inline
      classNameForEditor="scripture-font"
      noteOps={editingNoteOps.current}
      noteKey={editingNoteKey.current}
      initialCaretPosition={paneEditingCaret}
      onClose={() => closeFootnoteEditor(false)}
      onNoteEdit={onFootnoteEditorNoteEdit}
      scrRef={scrRef}
      editorOptions={options}
      defaultMarkerMenuTrigger={defaultMarkersMenuTrigger}
      localizedStrings={localizedStrings}
      parentEditorRef={editorRef}
      markerPalette={footnoteMarkerPalette}
    />
  ),
  [paneEditingCaret, closeFootnoteEditor, onFootnoteEditorNoteEdit, scrRef, options, defaultMarkersMenuTrigger, localizedStrings, footnoteMarkerPalette],
);
```

Pane render: pass `editingFootnoteIndex={paneEditingIndex}`, `renderEditingFootnote={renderPaneFootnoteEditor}`, `onFootnoteEditRequested={noteEditingSurface === 'pane' ? handleFootnoteEditRequested : undefined}`, `onSelectedFootnoteChange={handleSelectedFootnoteChange}`, where `const noteEditingSurface = resolveNoteEditingSurface({ viewType, isReadOnly: isReadOnlyEffective });` is a render-scope value. Wrap the popover render in `{noteEditingSurface === 'popover' && (…)}` is NOT needed (it is gated by `showFootnoteEditor`), but ensure `showFootnoteEditor` can only be set when the surface is the popover (it is: the click decision and Task 10's insert path).

- [ ] **Step 6: Pane data source = editor's live document**

Add `const [editorUsj, setEditorUsj] = useState<Usj | undefined>(undefined);` (pick a name that does not collide with the existing `setEditorUsj` ref — call the state `liveEditorUsj`/`setLiveEditorUsj`). Set it in `handleEditorialUsjChange` (`setLiveEditorUsj(editorRef.current?.getUsj() ?? usj)`) and inside `setEditorUsj.current` after `editorRef.current?.setUsj(usj)` (`setLiveEditorUsj(usj)`). Pass `usj={liveEditorUsj ?? usjFromPdp}` to `FootnotesLayout`. Doc comment: the pane and the editor's `getNoteIndex` must index the same document; `usjFromPdp` lags the editor by the save debounce.

- [ ] **Step 7: Verify**

Root `npm run typecheck` clean; extension lint clean; `npx vitest run` in the extension PASS. Commit:

```bash
git add extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx
git commit -m "Standard view: edit footnotes in the pane — caller and row clicks open the row editor"
```

---

### Task 10: Web view — insertion routing, session ends, view/mode transitions (core)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` (`openFootnoteEditorOnNewNote` ~2878; `handleEditorialUsjChange` ~3060-3095; chapter-change effect ~939; `isEditingSessionActive` ~3153)

- [ ] **Step 1: Route new notes**

Rename `openFootnoteEditorOnNewNote` to `openNoteEditorOnNewNote` and branch on `resolveNoteEditingSurface({ viewType: viewTypeRef.current, isReadOnly: isReadOnlyEffectiveRef.current })`:
- `'pane'`: `const index = editorRef.current?.getNoteIndex(insertedNodeKey); if (index === undefined) return; if (!footnotesPaneVisibleRef.current) setFootnotesPaneVisible(true); startPaneNoteEdit(index, insertedNodeKey, noteOp, 'end', true);`
- `'popover'`: existing body.
- `'none'`: return.

`handleEditorialUsjChange` already calls it when `editingNoteKey.current` is unset; keep that. In the `editingNoteKey.current` branch, the re-key line (`editingNoteIsNew.current = false` on `insertedNodeKey && !isInsertEmbedOpOfType('note', ops?.[1])`) must ALSO update the session key for the pane surface: `editingNoteKey.current = insertedNodeKey;` (the inline editor's live-apply re-keys the note; the next render passes the new key to `FootnoteEditor`, whose `noteKeyRef` follows the prop). For the popover the key is likewise re-synced (`FootnoteEditor` already mirrors the prop), so do it for both.

- [ ] **Step 2b: Session integrity while a pane row editor is open**

`FootnoteEditor` reloads its document only when its `noteOps` prop changes identity (a changed `noteKey` is mirrored into a ref without a reload), and `FootnoteList` remounts the editing row only when the note count changes (Task 14). So, inside `handleEditorialUsjChange` while `paneEditingIndex !== undefined`:

- The session's own live-apply (`insertedNodeKey` present and `ops?.[1]` is NOT a note insert): set `editingNoteKey.current = insertedNodeKey` and do NOT touch `editingNoteOps.current` — the row editor is the source of that change, and a fresh `noteOps` identity would reload it mid-typing and reset the caret.
- Any other change (typing elsewhere in the text, undo, a PDP echo, a note inserted or deleted): `const index = editorRef.current?.getNoteIndex(editingNoteKey.current)`. If `undefined`, the note is gone → `closeFootnoteEditor(false)` (existing behavior). Otherwise refresh `editingNoteOps.current = editorRef.current?.getNoteOps(editingNoteKey.current)` (a new identity — the row editor reloads to the note's current content, which is correct because the change did not originate there) and, if `index !== paneEditingIndex`, `setPaneEditingIndex(index)` so the editor row follows the note when notes before it are added or removed.
- Also on any view/editability change that leaves the pane surface, call `editorRef.current?.highlightNote(undefined)` next to the session end, so a Standard-view caller highlight does not survive into Formatted view.

- [ ] **Step 2: Session ends**

- Chapter-change effect (the one that clears `footnotePaneFocusRequest`): also `closeFootnoteEditor(false)` when `paneEditingIndex !== undefined` — simplest: call `closeFootnoteEditor(false)` unconditionally there if `editingNoteKey.current` is set (check the popover path is not already closed elsewhere on chapter change; avoid a double close).
- View or editability change: `useEffect(() => { if (resolveNoteEditingSurface({ viewType, isReadOnly: isReadOnlyEffective }) !== 'pane' && paneEditingIndex !== undefined) closeFootnoteEditor(false); }, [viewType, isReadOnlyEffective, paneEditingIndex, closeFootnoteEditor]);`
- Pane hidden: `useEffect(() => { if (!footnotesPaneRendered && paneEditingIndex !== undefined) closeFootnoteEditor(false); }, [footnotesPaneRendered, …]);` and `useEffect(() => { if (!footnotesPaneRendered) editorRef.current?.highlightNote(undefined); }, [footnotesPaneRendered]);`
- Note deleted externally: the existing `else if (!editorRef.current?.getNoteOps(editingNoteKey.current)) closeFootnoteEditor(false);` already covers the pane since `closeFootnoteEditor` now clears `paneEditingIndex`.
- Stale reaper (`isEditingSessionActive`): already routes through `closeFootnoteEditor(false)`; the inline editor's `onNoteEdit` refreshes the clock — nothing else to do, but confirm by reading.

- [ ] **Step 3: Verify**

Typecheck, lint, extension tests — clean/PASS. Commit `Standard view: route inserted notes to the pane editor and end sessions on chapter/view/pane changes`.

---

### Task 11: Docs — architecture decision + invariants (core)

**Files:**
- Modify: `.context/standards/Architecture-Decisions.md` — add an entry (byte-order slug position; `LC_ALL=C sort`) with slug like `footnote-editing-surface-per-view`: context (PT9 pane model, popover stays for formatted/Simple), decision (surface resolved by `resolveNoteEditingSurface`; editor exposes `getNoteIndex`/`getNoteKey`/`highlightNote` rather than host DOM hacks; pane indexes the editor's live document), alternatives (host-side DOM class toggling; keep popover alongside pane), consequences (paired editor/core PRs; `platform-yalc` must carry the editor change for core CI).
- Modify: `.context/standards/Standard-View-Invariants.md` §4 — retitle "The footnote editor" and add one bullet: in Standard view the same component runs `inline` inside the footnotes pane; the `isNoteShellEditable: false` / caret-guard / `updateCaller` invariants apply unchanged; its live-apply re-keys the note, so the host must re-sync the session key from `onUsjChange`'s `insertedNodeKey`.

- [ ] **Step 1: Write both edits, run `npm run format`, commit** `docs: record the footnote-editing surface decision`.

---

### Task 12: Full verification + hand QA in the running app

- [ ] **Step 1: Repo-wide checks (core worktree root)**

`npm run typecheck && npm run lint && npm test` — all green (note the known intermittent Storybook-under-contention timeouts; rerun a failing story in isolation before treating it as a regression). `dotnet test c-sharp-tests/` is not needed (no C# changes) — say so in the report.

- [ ] **Step 2: Hand QA** using the `app-runner` and `visual-verification` skills (check `lsof -ti:8876` first — another session may own the app). Set `platform.interfaceMode: power`. Open an editable project in Standard view and walk the §2 matrix of the spec: caller click with pane hidden/shown; row click with caret-where-clicked; typing in the row editor updates the text (check the `.SFM` on disk after the debounce); Insert footnote (Ctrl+T or menu) lands the caret in the pane editor; X button hides the pane and focuses the text; the highlighted caller shows the blue top/bottom border; switch to Simple mode and confirm the popover and no pane reveal; open a resource (read-only) in Standard view and confirm caller click → pane scroll and row click → text scroll + highlight. Record results in the final report.

- [ ] **Step 3: Push** `git push -u origin pt-4189-footnote-pane-editing` from the core worktree. Draft PRs (via the `pr-creator` skill) are opened by the orchestrator after review: the editor PR against `main` on the editor worktree's `origin` (`eten-tech-foundation/scripture-editors`), and the core PR against `main`, noting that core CI needs `platform-yalc` to carry the editor change.

---

### Task 13: `FootnotesLayout` selection survives live edits and USJ echoes (core)

Runs after Task 8 and before Task 9.

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx` (the `usj` effect's `setSelectedFootnote` updater, ~lines 120-140, and the reorder comment just above the `focusRequest` effect)
- Test: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.test.tsx` (extend)

**Interfaces:**
- Consumes: `editingFootnoteIndex` prop (Task 8).
- Produces: no new props. Two behavior guarantees Task 9 relies on: (1) after a `usj` change that keeps the selected note's marker+content at the same index, `selectedFootnote.footnote` is the NEW list's object at that index (so `FootnoteList`'s identity-based row highlight keeps working after a PDP echo); (2) while `editingFootnoteIndex` is set and still in range, the selection stays on that index no matter how the note's content changes (the user is editing it), and `onSelectedFootnoteChange` is not called with `undefined` mid-edit.

- [ ] **Step 1: Failing tests**

Append to the component test file (reuse `renderPane`, `usjWithTwoNotes`, `note`, `localizedStrings`, `useWebViewStateMock`):

```tsx
describe('FootnotesLayout selection across USJ changes', () => {
  it('keeps the selected row highlighted after an echo that re-creates the same notes', () => {
    const onSelectedFootnoteChange = vi.fn();
    const props = { showMarkers: true, useWebViewState: useWebViewStateMock, localizedStrings, onClose: () => {}, onSelectedFootnoteChange };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes} focusRequest={{ index: 1 }}><div /></FootnotesLayout>,
    );
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    // A fresh USJ object with identical content (what a PDP echo looks like over IPC).
    const echo: Usj = JSON.parse(JSON.stringify(usjWithTwoNotes));
    rerender(<FootnotesLayout {...props} usj={echo} focusRequest={{ index: 1 }}><div /></FootnotesLayout>);
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    expect(onSelectedFootnoteChange).not.toHaveBeenCalledWith(undefined);
  });

  it('keeps the editing row selected while its content changes under live-apply', () => {
    const onSelectedFootnoteChange = vi.fn();
    const props = {
      showMarkers: true, useWebViewState: useWebViewStateMock, localizedStrings, onClose: () => {},
      onSelectedFootnoteChange, editingFootnoteIndex: 1,
      renderEditingFootnote: () => <div data-testid="row-editor" />,
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes} focusRequest={{ index: 1 }}><div /></FootnotesLayout>,
    );
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);
    const edited: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, 'a ', note('alpha'), ' b ', note('beta typed more')] },
      ],
    };
    rerender(<FootnotesLayout {...props} usj={edited} focusRequest={{ index: 1 }}><div /></FootnotesLayout>);
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);
    expect(onSelectedFootnoteChange).not.toHaveBeenCalledWith(undefined);
    expect(screen.getByTestId('row-editor')).toBeInTheDocument();
  });
});
```

If `FootnoteList` renders `aria-selected` differently on this branch (check `footnote-list.component.tsx`), assert on the attribute it actually sets (`data-state="selected"` is the other candidate).

Run: `cd extensions/src/platform-scripture-editor && npx vitest run platform-scripture-editor-footnotes.component.test.tsx` — the two new tests FAIL.

- [ ] **Step 2: Implement**

In the `usj` effect's `setSelectedFootnote` updater:

```ts
setSelectedFootnote((currentSelected) => {
  if (!currentSelected) return undefined;
  const { index, footnote } = currentSelected;
  if (index < 0 || index >= newFootnotes.length) return undefined;
  const fresh = newFootnotes[index];
  // The row being edited is the selection by definition: its content changes on every
  // live-apply, so content equality must not decide whether it stays selected.
  const isEditingRow = editingFootnoteIndex !== undefined && index === editingFootnoteIndex;
  if (
    isEditingRow ||
    (fresh.marker === footnote.marker && deepEqualAcrossIframes(fresh.content, footnote.content))
  ) {
    // Re-point at the new list's object: FootnoteList marks the selected row by identity.
    return { footnote: fresh, index };
  }
  return undefined;
});
```

Add `editingFootnoteIndex` to that effect's dependency array (the effect re-parses `usj` when it changes — acceptable; if that re-parse is undesirable, read `editingFootnoteIndex` through a ref mirrored by its own effect and keep the deps as they were). Because the preserved selection is now a NEW object, `selectionRequest` identity changes on every echo, which re-runs `FootnoteList`'s `scrollIntoView({ block: 'nearest' })` on an already-visible row (a no-op) and re-fires `onSelectedFootnoteChange(index)` with the same index (the consumer's `highlightNote` is idempotent). Say both in a short comment.

Also fix the reorder comment above the `focusRequest` effect: the stale write it describes is the USJ effect's `setFootnotes` (not this effect's), and the point is that in the commit where `usj` changed, `footnotes` still holds the previous parse until the USJ effect runs.

- [ ] **Step 3: Verify + commit**

Whole component test file green (Task 5 + Task 8 tests included); lint clean; `npx tsc --noEmit -p extensions/tsconfig.json 2>&1 | grep footnotes.component` prints nothing. Commit:

```bash
git add extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.test.tsx
git commit -m "Keep the footnotes pane selection across USJ echoes and while a row is being edited"
```

---

### Task 14: `FootnotesLayout` keeps the editing row mounted across content-only USJ changes (core)

Runs after Task 9 and before Task 10.

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx` (the `usj` effect's `setFootnoteListKey` call)
- Test: `extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.test.tsx` (extend)

**Why:** `FootnoteList` keys rows as `${listId}-${index}`, and `FootnotesLayout` passes `footnoteListKey` as `listId`, bumping it on EVERY `usj` change. With the pane fed from the editor's live document, every live-applied keystroke in the inline row editor changes `usj`, bumps the key, and remounts the editing row — which reloads the session-start `noteOps` and re-applies `initialCaretPosition`, visibly reverting typed text. The `listId` contract (`footnotes.types.ts`) says it "should change whenever the list changes (due to additions, deletions or — unlikely — reordering)", not on every content edit.

**Interfaces:**
- Produces: `footnoteListKey` changes only when the number of notes changes (additions/deletions). Content-only changes and same-count echoes keep the key, so row elements and the editing row's editor stay mounted. (Reordering with an unchanged count is not detected — the contract already calls it unlikely; say so in a comment.)

- [ ] **Step 1: Failing tests**

Append to the component test file (reuse `renderPane`, `usjWithTwoNotes`, `note`, `localizedStrings`, `useWebViewStateMock`):

```tsx
describe('FootnotesLayout list identity across USJ changes', () => {
  it('keeps the editing row mounted when only a note\'s content changes', () => {
    let mounts = 0;
    function RowEditor() {
      useEffect(() => { mounts += 1; }, []);
      return <div data-testid="row-editor" />;
    }
    const props = {
      showMarkers: true, useWebViewState: useWebViewStateMock, localizedStrings, onClose: () => {},
      editingFootnoteIndex: 1, renderEditingFootnote: () => <RowEditor />,
    };
    const { rerender } = render(<FootnotesLayout {...props} usj={usjWithTwoNotes}><div /></FootnotesLayout>);
    const rowBefore = screen.getAllByRole('option')[0];
    expect(mounts).toBe(1);
    const edited: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, 'a ', note('alpha'), ' b ', note('beta typed more')] },
      ],
    };
    rerender(<FootnotesLayout {...props} usj={edited}><div /></FootnotesLayout>);
    expect(mounts).toBe(1);
    expect(screen.getAllByRole('option')[0]).toBe(rowBefore);
  });

  it('remounts the rows when a note is added or removed', () => {
    const props = { showMarkers: true, useWebViewState: useWebViewStateMock, localizedStrings, onClose: () => {} };
    const { rerender } = render(<FootnotesLayout {...props} usj={usjWithTwoNotes}><div /></FootnotesLayout>);
    const rowBefore = screen.getAllByRole('option')[0];
    const withThree: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, 'a ', note('alpha'), ' b ', note('beta'), ' c ', note('gamma')] },
      ],
    };
    rerender(<FootnotesLayout {...props} usj={withThree}><div /></FootnotesLayout>);
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getAllByRole('option')[0]).not.toBe(rowBefore);
  });
});
```

(`useEffect` import from `react` in the test file if not already present.) Run: `cd extensions/src/platform-scripture-editor && npx vitest run platform-scripture-editor-footnotes.component.test.tsx` — the first test FAILS (2 mounts); the second passes already (keep it as the regression pin for the contract).

- [ ] **Step 2: Implement**

In the `usj` effect, replace the unconditional `setFootnoteListKey((prev) => prev + 1)` with a bump only when the parsed note count differs from the current list's count. Read the current count through the functional `setFootnotes` updater or a ref (the effect's deps must stay `[usj]`):

```ts
setFootnotes((current) => {
  // The list id tells FootnoteList its rows are new. Only additions and deletions make them new;
  // a content edit (every live-applied keystroke in the row editor) or a same-shape echo must keep
  // the rows — and the editing row's editor — mounted. Reordering with an unchanged count is not
  // detected; the listId contract already treats it as unlikely.
  if (current.length !== newFootnotes.length) setFootnoteListKey((prev) => prev + 1);
  return newFootnotes;
});
```

If calling a setter inside another setter's updater trips React's lint/warnings, use a `footnotesCountRef` mirrored where `footnotes` is set, compare against `newFootnotes.length`, and bump outside the updater. Keep the `selectedFootnote` re-pointing logic (Task 13) unchanged.

- [ ] **Step 3: Verify + commit**

Whole component test file green; lint clean; `npx tsc --noEmit -p extensions/tsconfig.json 2>&1 | grep footnotes.component` prints nothing. Commit:

```bash
git add extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.test.tsx
git commit -m "Bump the footnotes list id only when notes are added or removed"
```
