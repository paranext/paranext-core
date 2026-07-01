import { createContext, useContext } from 'react';

/**
 * Single permission flag for the entire Project Plan Editor tree. Children read this via
 * `usePlanEditorAdmin()` and gate edit affordances on it. There are no per-action permission props
 * — admin vs read-only is decided once at the top.
 */
const PlanEditorAdminContext = createContext<boolean>(false);

export const PlanEditorAdminProvider = PlanEditorAdminContext.Provider;

export function usePlanEditorAdmin(): boolean {
  return useContext(PlanEditorAdminContext);
}
