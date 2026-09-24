import { useEffect, useState } from 'react';

/**
 * Tracks the project id of the resource cell that currently holds focus — and therefore the caret —
 * inside a web view that shows several resources at once (the Scripture Text Grid). Such a view has
 * no single "displayed resource", so the resource the user is reading in is the only well-defined
 * answer to "which text should Find search?".
 *
 * Cells mark themselves with `data-project-id`; the nearest such ancestor of the focused element is
 * the resource holding the caret. Focus moving to chrome outside any cell (a header button, a
 * popover) deliberately does NOT clear the tracked resource — the caret has not moved, and the user
 * reaches Find through exactly that kind of chrome.
 *
 * @param availableProjectIds Project ids of the resources currently displayed. The tracked resource
 *   is dropped once it leaves this list (e.g. removed via View Options), so the caller never
 *   targets a resource that is no longer on screen.
 * @returns The focused resource's project id, or `undefined` before any cell has been focused.
 */
export function useFocusedResourceProjectId(
  availableProjectIds: readonly string[],
): string | undefined {
  const [focusedProjectId, setFocusedProjectId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const { target } = event;
      if (!(target instanceof Element)) return;
      const projectId = target.closest<HTMLElement>('[data-project-id]')?.dataset.projectId;
      if (projectId) setFocusedProjectId(projectId);
    };
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, []);

  return focusedProjectId && availableProjectIds.includes(focusedProjectId)
    ? focusedProjectId
    : undefined;
}
