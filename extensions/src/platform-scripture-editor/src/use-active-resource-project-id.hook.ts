import { useEffect, useState } from 'react';

/**
 * Tracks the project id of the resource the user is working in, inside a web view that shows
 * several resources at once (the Scripture Text Grid). Such a view has no single "displayed
 * resource", so the resource the user is reading in is the only well-defined answer to "which text
 * should Find search?".
 *
 * Cells mark themselves with `data-project-id`; the active resource is the nearest such ancestor of
 * the element that last took focus or that the pointer last pressed. A press counts as well as
 * focus because the aligned view's read-only text sits under one shared scroll root that is not
 * inside any cell, so clicking a column there fires no `focusin` from within the cell, yet the user
 * has picked that resource. Focus or a press moving to chrome outside any cell (a header button, a
 * popover) deliberately does NOT clear the tracked resource — the user has not moved to another
 * text, and they reach Find through exactly that kind of chrome.
 *
 * @param availableProjectIds Project ids of the resources currently displayed. The tracked resource
 *   is dropped once it leaves this list (e.g. removed via View Options), so the caller never
 *   targets a resource that is no longer on screen.
 * @returns The active resource's project id, or `undefined` before any cell has been focused or
 *   pressed; and a setter that makes a resource active when focus cannot say so, as after a reveal
 *   that focuses the aligned view's shared root. The next focus or press still replaces it.
 */
export function useActiveResourceProjectId(
  availableProjectIds: readonly string[],
): [activeProjectId: string | undefined, setActiveProjectId: (projectId: string) => void] {
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const trackResourceOf = (event: Event) => {
      const { target } = event;
      if (!(target instanceof Element)) return;
      const projectId = target.closest<HTMLElement>('[data-project-id]')?.dataset.projectId;
      if (projectId) setActiveProjectId(projectId);
    };
    document.addEventListener('focusin', trackResourceOf);
    document.addEventListener('pointerdown', trackResourceOf);
    return () => {
      document.removeEventListener('focusin', trackResourceOf);
      document.removeEventListener('pointerdown', trackResourceOf);
    };
  }, []);

  return [
    activeProjectId && availableProjectIds.includes(activeProjectId) ? activeProjectId : undefined,
    setActiveProjectId,
  ];
}
