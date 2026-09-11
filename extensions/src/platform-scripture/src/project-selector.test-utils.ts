import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

/**
 * Test support shared by every suite in this extension that drives a `<ProjectSelector>` popover —
 * the checklist web view, the checks side panel, and the Manage Books dialog. It lives beside the
 * web views rather than inside `manage-books-dialog/` because all three surfaces embed the same
 * picker, and the list of grouping axes they refuse to offer has to stay one list: a second copy
 * drifts silently the moment one suite's expectations are updated.
 */

/** Radix popovers and cmdk need pointer-event sequences jsdom does not synthesize on its own. */
export const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

/**
 * Grouping axes none of these surfaces' project data can support, so no picker may offer them.
 * Spelled with the library's own default English labels, which is what the menu would render if a
 * surface stopped restricting its `availableGroupings`.
 */
export const UNSUPPORTED_GROUPINGS = ['Language', 'Last used', 'Versification', 'Type'];

/** Grouping options the open view-options menu offers, in order, by visible label. */
export const groupingChoices = () =>
  screen.getAllByRole('menuitemradio').map((item) => item.textContent?.trim());

/**
 * Stands in for the layout APIs jsdom does not implement but the picker's render path reaches: cmdk
 * wires a ResizeObserver, Radix's PopoverContent calls `scrollTo` when it focuses children, and the
 * picker scrolls the selected row into view when it opens.
 *
 * Call from `beforeAll`. Suites that also render the Manage Books dialog want
 * `installManageBooksJsdomShims` instead — it covers these plus the dialog's own needs.
 */
export function installProjectSelectorJsdomShims(): void {
  // `vi.stubGlobal` accepts `unknown`, so these no-op stubs need no type assertion to stand in for
  // the real constructors — only `observe`/`disconnect` are ever reached from this render path.
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = vi.fn();
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = vi.fn();
}
