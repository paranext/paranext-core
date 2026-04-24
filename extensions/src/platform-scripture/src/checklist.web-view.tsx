import { WebViewProps } from '@papi/core';
import { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { ChecklistTool, CHECKLIST_STRING_KEYS } from './components/checklist.component';
import { useChecklistService } from './hooks/use-checklist';

/**
 * SCAFFOLD web view wrapper for the Markers Checklist tool (UI-PKG-001).
 *
 * This wrapper wires the minimum plumbing required for the web view to open from the menu and
 * render the UX-approved `ChecklistTool` skeleton — nothing else. All real data, selector state,
 * and callbacks are stubbed. Full data wiring (calls to `buildChecklistData`, population of the six
 * `useWebViewState` slots from UI-PKG-004, selector popovers, copy-to-clipboard, etc.) is the scope
 * of UI-PKG-002.
 *
 * Notes for the next IUG:
 *
 * - `useChecklistService` is already called here so the NetworkObject proxy is live; UI-PKG-002 just
 *   has to consume `service` and wire it to `buildChecklistData`.
 * - The `tabViewMenuData` prop is intentionally left undefined here. UI-PKG-002 / UI-PKG-004 will
 *   populate it via `useData(papi.menuData.dataProviderName).WebViewMenu(...)`.
 */
global.webViewComponent = function ChecklistWebView({ projectId }: WebViewProps) {
  // Acquire the NetworkObject proxy + project-level editable flag. Return value is intentionally
  // unused in this scaffold (beyond proving the hook fires) — UI-PKG-002 consumes it.
  useChecklistService(projectId);

  const stringKeys = useMemo(() => Array.from(CHECKLIST_STRING_KEYS), []);
  const localizedStringsWithLoadingState = useLocalizedStrings(stringKeys);

  // Stub callbacks — all no-ops for the scaffold. Keeping them defined (rather than omitted)
  // makes the intent explicit and keeps the prop-shape identical to what UI-PKG-002 will populate.
  const noop = useCallback(() => {}, []);

  return (
    <ChecklistTool
      localizedStringsWithLoadingState={localizedStringsWithLoadingState}
      data={undefined}
      isLoading={false}
      error={undefined}
      helpText={undefined}
      primaryProjectLabel=""
      onPrimaryProjectTriggerClick={noop}
      comparativeTextsLabel=""
      onComparativeTextsTriggerClick={noop}
      verseRangeLabel=""
      onVerseRangeTriggerClick={noop}
      hideMatches={false}
      onHideMatchesChange={noop}
      showVerseText={false}
      onShowVerseTextChange={noop}
      matchCountLabel={undefined}
      onCopy={noop}
      onRetry={noop}
      tabViewMenuData={undefined}
      onSelectTabMenuItem={noop}
      onEditLinkClick={noop}
      onGotoLinkClick={noop}
      isEditLinkEnabled={false}
    />
  );
};
