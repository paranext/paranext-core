import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards how `platform-scripture-editor.web-view.tsx` shows a comment thread after saving a new
 * comment and after clicking a comment's highlight. The web view cannot be mounted in jsdom (see
 * `insert-comment-anchor-guard.contract.test.ts`), so this reads the source instead — it pins the
 * shape of the code, not its runtime behavior.
 *
 * In Simple mode, selecting the new thread in the Column 3 Comments tab can take seconds: posting
 * to a tab that has not been mounted yet (rc-dock does not render a tab until it is first shown)
 * retries until the request gives up. The comment is already saved by then, so the popover must be
 * closed first and the select must not be awaited — otherwise Save looks like it did nothing. Power
 * mode awaits its comment list before closing, so the list's focus change happens while the
 * popover is still up rather than after the user has gone back to typing.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

/** Whitespace-insensitive haystack, so formatting alone can't fail this. */
function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ');
}

const source = collapseWhitespace(readFileSync(WEB_VIEW_FILE, 'utf-8'));

/**
 * Matches the end of a `useCallback`: its dependency list, which prettier writes as `], );` once
 * the call is wrapped across lines and as `]);` when it is not.
 */
const USE_CALLBACK_END = String.raw`\}, \[[^[\]]*\],? ?\);`;

/**
 * Any React hook call. A callback body never contains one, so finding one means the extraction ran
 * on past the callback's own end into the next hook — which may be a `useEffect` or `useMemo`, not
 * only another `useCallback`.
 */
const HOOK_CALL = /\buse[A-Z]\w*\(/;

function extractUseCallbackBody(name: string, paramsPattern: string): string {
  const match = source.match(
    new RegExp(`const ${name} = useCallback\\( ?${paramsPattern} => \\{(.*?)${USE_CALLBACK_END}`),
  );
  if (!match) throw new Error(`${name} callback not found`);
  return match[1];
}

describe('onCommentEditorSave thread navigation (platform-scripture-editor.web-view.tsx)', () => {
  const saveBody = extractUseCallbackBody(
    'onCommentEditorSave',
    String.raw`async \(contents: string, assignedUser\?: string\)`,
  );

  // One exact, whitespace-collapsed statement, so each branch is tied to its own call and
  // arguments: inverting the mode check, passing the wrong id, or awaiting the Simple-mode select
  // (directly or through a variable) all fail here.
  const NAVIGATION =
    'if (isPowerModeRef.current) await openCommentListAndSelectThreadSafe(papi, webViewId, newThreadId); ' +
    'else selectCommentThreadInPanelSafe(papi, newThreadId, false, webViewId);';

  it('stays within its own callback', () => {
    // Guards the extraction itself: a match that ran on into the next hook would let the
    // assertions below pass on someone else's code.
    expect(saveBody).not.toMatch(HOOK_CALL);
  });

  it('awaits the Power-mode list but not the Simple-mode select, reading the mode at save time', () => {
    expect(saveBody).toContain(NAVIGATION);
  });

  it('navigates in exactly one place', () => {
    expect(saveBody.split('selectCommentThreadInPanelSafe(').length - 1).toBe(1);
    expect(saveBody.split('openCommentListAndSelectThreadSafe(').length - 1).toBe(1);
  });

  it('closes the popover after navigating', () => {
    const navigationIndex = saveBody.indexOf(NAVIGATION);
    const closeIndex = saveBody.indexOf('setShowCommentEditor(false);');

    expect(navigationIndex).toBeGreaterThan(-1);
    expect(closeIndex).toBeGreaterThan(navigationIndex);
  });
});

describe('createCommentAnnotationClickHandler (platform-scripture-editor.web-view.tsx)', () => {
  const clickBody = extractUseCallbackBody(
    'createCommentAnnotationClickHandler',
    String.raw`\(threadId: string\) => async \(\)`,
  );

  it('stays within its own callback', () => {
    // Guards the extraction itself: a match that ran on into the next hook would let the
    // assertions below pass on someone else's code.
    expect(clickBody).not.toMatch(HOOK_CALL);
  });

  it('routes the click through showCommentThreadForInterfaceMode using the mode read when the annotation is clicked', () => {
    expect(clickBody).toContain(
      'await showCommentThreadForInterfaceMode(papi, { isPowerMode: isPowerModeRef.current, editorWebViewId: webViewId, threadId, });',
    );
    expect(clickBody).not.toContain('openCommentListAndSelectThreadSafe(');
  });
});
