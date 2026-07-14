/**
 * Shared test harness for the footnote-editor suites that mount the REAL `Editorial` (rather than
 * the mocked `@eten-tech-foundation/platform-editor` used by footnote-editor.component.test.tsx).
 *
 * Both footnote-editor.popover-init.test.tsx and footnote-editor.enter-guard.test.tsx exercise real
 * Lexical reconciliation/selection behavior that a mock cannot observe, and both need the same
 * popover mount, the same deferred-init wait, and the same non-public Lexical-handle extraction —
 * so those live here once instead of being copied per file. (This module is not a test itself; its
 * name is intentionally outside the `*.{test,spec}.*` glob so Vitest does not collect it.
 * Dependency-light fixtures live in footnote-editor.fixtures so the Storybook story can share them
 * without pulling in `@testing-library/react`.)
 */
import { act, render } from '@testing-library/react';
import type { EditorOptions } from '@eten-tech-foundation/platform-editor';
import { LexicalEditor } from 'lexical';
import FootnoteEditor from './footnote-editor.component';
import { buildLocalizedStrings, scrRef, sentinelNoteOp } from './footnote-editor.fixtures';

// Re-export the shared fixtures so existing importers of the harness keep working.
export * from './footnote-editor.fixtures';

/**
 * Mounts the REAL `FootnoteEditor` (no mocked `Editorial`) for the given view, waits for its
 * deferred init, and returns the render utils, the popover's `.editor-input` element, and the
 * mounted Lexical editor instance.
 *
 * The init effect defers `applyUpdate` via `setTimeout(0)` and, for a new note, re-asserts the note
 * selection a frame + a macrotask later; `waitMs` must cover whichever of those a caller asserts on
 * (the default covers the re-assert; pass a smaller value to only wait for `applyUpdate`).
 */
export async function renderPopoverAndWaitForInit(
  view: EditorOptions['view'],
  { waitMs = 50 }: { waitMs?: number } = {},
) {
  const utils = render(
    <FootnoteEditor
      noteOps={[sentinelNoteOp]}
      onClose={() => {}}
      scrRef={scrRef}
      noteKey={undefined}
      isNewNote
      editorOptions={{ view }}
      defaultMarkerMenuTrigger={'\\'}
      localizedStrings={buildLocalizedStrings()}
    />,
  );
  const editorInput = utils.container.querySelector('.editor-input');
  if (!(editorInput instanceof HTMLElement)) throw new Error('popover editor-input not found');

  // Let the deferred init effects run for real rather than mocking timers, matching the effect's
  // own scheduling.
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, waitMs);
    });
  });

  // Lexical exposes its mounted editor instance on the root DOM element via this non-public,
  // underscore-prefixed property — there's no public API to reach it from outside a React ref, and
  // this is the same technique the engine's own popover round-trip tests use.
  // eslint-disable-next-line no-underscore-dangle, no-type-assertion/no-type-assertion
  const lexical = (editorInput as unknown as { __lexicalEditor?: LexicalEditor }).__lexicalEditor;
  if (!lexical) throw new Error('lexical editor handle not found on popover editor-input');
  return { utils, editorInput, lexical };
}
