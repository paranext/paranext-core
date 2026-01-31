import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { Spinner } from 'platform-bible-react';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import type { ParallelPassagesAction } from './types/parallel-passages';
import {
  INITIAL_STATE,
  parallelPassagesReducer,
} from './parallel-passages/parallel-passages.utils';
import ParallelPassagesToolbar from './parallel-passages/toolbar.component';
import PassageList from './parallel-passages/passage-list.component';
import PassageDetailPane from './parallel-passages/passage-detail.component';
import RibbonWarningDisplay from './parallel-passages/ribbon-warning.component';

global.webViewComponent = function ParallelPassagesWebView({
  projectId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useWebViewState,
}: WebViewProps) {
  const [state, dispatch] = useReducer(parallelPassagesReducer, {
    ...INITIAL_STATE,
    projectId: projectId ?? '',
  });

  // --- Dispatch helpers ---

  const handleAction = useCallback(
    (action: ParallelPassagesAction) => {
      dispatch(action);

      // TODO: Handle side-effect actions when backend is available
      switch (action.type) {
        case 'TOGGLE_ROW_APPROVAL':
          // TODO: Call parallelPassages.toggleSetApproval via PAPI
          logger.debug(`[ParallelPassages] Toggle row approval: ${action.passageIndex}`);
          break;
        case 'TOGGLE_COLUMN_APPROVAL':
          // TODO: Call parallelPassages.toggleIndividualApproval via PAPI
          logger.debug(
            `[ParallelPassages] Toggle column approval: ${action.passageIndex} ${action.verseRef}`,
          );
          break;
        case 'OPEN_EDIT_DIALOG':
          // TODO: Open EditScrTextForm dialog via PAPI
          logger.debug(
            `[ParallelPassages] Open edit dialog: ${action.projectId} ${action.verseRef}`,
          );
          break;
        case 'OPEN_DIFF_DIALOG':
          // TODO: Open DifferencesToolForm via PAPI
          logger.debug(
            `[ParallelPassages] Open diff dialog: ${action.projectId} ${action.verseRef}`,
          );
          break;
        case 'GOTO_REFERENCE':
          // TODO: Navigate scroll group via PAPI
          logger.debug(`[ParallelPassages] Goto reference: ${action.verseRef}`);
          break;
        case 'OPEN_BOOK_CHOOSER':
          // TODO: Open BookChooserForm via PAPI
          logger.debug('[ParallelPassages] Open book chooser');
          break;
        case 'OPEN_TEXT_SELECTION':
          // TODO: Open ScrTextListSelectionForm via PAPI
          logger.debug('[ParallelPassages] Open text selection');
          break;
        case 'ADD_BOOK_TO_SCOPE':
          // TODO: Call parallelPassages.updateBooksInScope via PAPI
          logger.debug(`[ParallelPassages] Add book to scope: ${action.bookNum}`);
          break;
        case 'ADD_BOOK_TO_SELECTED':
          // TODO: Call parallelPassages.updateBooksInScope via PAPI
          logger.debug(`[ParallelPassages] Add book to selected: ${action.bookNum}`);
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  // --- Guide toggle ---
  const [guideActive, setGuideActive] = useState(false);

  // --- Zoom keyboard handler (Ctrl+Plus/Minus/Zero) ---
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      // Determine which pane has focus
      const active = document.activeElement;
      const upperPane = el.querySelector('[data-pane="upper"]');
      const lowerPane = el.querySelector('[data-pane="lower"]');
      const pane: 'upper' | 'lower' = lowerPane?.contains(active) ? 'lower' : 'upper';

      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        const current =
          pane === 'upper' ? state.memento.zoomUpperPane : state.memento.zoomLowerPane;
        handleAction({ type: 'SET_ZOOM', pane, level: Math.min(current + 10, 200) });
      } else if (e.key === '-') {
        e.preventDefault();
        const current =
          pane === 'upper' ? state.memento.zoomUpperPane : state.memento.zoomLowerPane;
        handleAction({ type: 'SET_ZOOM', pane, level: Math.max(current - 10, 50) });
      } else if (e.key === '0') {
        e.preventDefault();
        handleAction({ type: 'SET_ZOOM', pane, level: 100 });
      }
    };
    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [state.memento.zoomUpperPane, state.memento.zoomLowerPane, handleAction]);

  // --- Effect stubs ---
  // TODO: useEffect to load passage list when filters change (SET_PASSAGE_FILTER, SET_TYPE_FILTER)
  // TODO: useEffect to load passage detail when selectedIndex changes
  // TODO: useEffect to subscribe to PassageStatusChangedEvent
  // TODO: useEffect to subscribe to ProjectDataChangedEvent
  // TODO: useEffect to restore memento on mount
  // TODO: useEffect to save memento on unmount / state change

  return (
    <div ref={containerRef} className="pr-twp tw-flex tw-flex-col tw-h-full">
      {/* Ribbon warning */}
      <RibbonWarningDisplay
        warning={state.activeWarning}
        onActionClick={(action: string) => {
          // Map warning action strings to dispatch actions
          if (action === 'add-to-scope') {
            handleAction({ type: 'ADD_BOOK_TO_SCOPE', bookNum: 0 });
          } else if (action === 'add-to-selected-books') {
            handleAction({ type: 'ADD_BOOK_TO_SELECTED', bookNum: 0 });
          }
          // TODO: Handle 'send-receive' and 'install-resources' actions
        }}
      />

      {/* Toolbar */}
      <div className="tw-px-2 tw-py-1 tw-border-b tw-border-border">
        <ParallelPassagesToolbar
          sourceDisplayMode={state.memento.sourceDisplayMode}
          onSourceDisplayModeChange={(mode) =>
            handleAction({ type: 'SET_SOURCE_DISPLAY_MODE', mode })
          }
          sourceLanguageAvailable={state.sourceLanguageAvailable}
          passageFilter={state.memento.passageFilter}
          onPassageFilterChange={(filter) => handleAction({ type: 'SET_PASSAGE_FILTER', filter })}
          typeFilter={state.memento.typeFilter}
          onTypeFilterChange={(filter) => handleAction({ type: 'SET_TYPE_FILTER', filter })}
          viewType={state.memento.viewType}
          onViewTypeChange={(viewType) => handleAction({ type: 'SET_VIEW_TYPE', viewType })}
          onComparativeTextsClick={() => handleAction({ type: 'OPEN_TEXT_SELECTION' })}
          locationFilter={state.memento.locationFilter ?? { type: 'current-book' }}
          onLocationFilterChange={(filter) => handleAction({ type: 'SET_LOCATION_FILTER', filter })}
          guideActive={guideActive}
          onGuideToggle={() => setGuideActive((prev) => !prev)}
        />
      </div>

      {/* Split pane: upper (passage list) + lower (passage detail) */}
      <div className="tw-flex tw-flex-col tw-flex-1 tw-overflow-hidden">
        {/* Upper pane */}
        <div
          data-pane="upper"
          className="tw-overflow-auto tw-min-h-0"
          style={{ flex: state.memento.splitterRatio, zoom: `${state.memento.zoomUpperPane}%` }}
        >
          {state.isLoadingList ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
              <Spinner />
            </div>
          ) : (
            <PassageList
              passages={state.filteredPassages}
              selectedIndex={state.selectedIndex}
              viewType={state.memento.viewType}
              isResourceProject={state.isResourceProject}
              hasPassagesPermission={state.hasPassagesPermission}
              onSelectPassage={(index) => handleAction({ type: 'SELECT_PASSAGE', index })}
              onToggleRowApproval={(passageIndex) =>
                handleAction({ type: 'TOGGLE_ROW_APPROVAL', passageIndex })
              }
            />
          )}
        </div>

        {/* Splitter handle */}
        <div className="tw-border-t tw-border-border tw-h-1 tw-cursor-row-resize tw-shrink-0" />

        {/* Lower pane */}
        {/* Lower pane */}
        <div
          data-pane="lower"
          className="tw-overflow-auto tw-min-h-0"
          style={{ flex: 1 - state.memento.splitterRatio, zoom: `${state.memento.zoomLowerPane}%` }}
        >
          {state.isLoadingDetail ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
              <Spinner />
            </div>
          ) : (
            <PassageDetailPane
              detail={state.selectedPassageDetail}
              passageIndex={state.selectedIndex}
              onToggleColumnApproval={(passageIndex, verseRef) =>
                handleAction({ type: 'TOGGLE_COLUMN_APPROVAL', passageIndex, verseRef })
              }
              onToggleRowApproval={(passageIndex) =>
                handleAction({ type: 'TOGGLE_ROW_APPROVAL', passageIndex })
              }
              onToggleCollapse={(resourceId) =>
                handleAction({ type: 'TOGGLE_COLLAPSE', resourceId })
              }
              onEditClick={(pid, verseRef) =>
                handleAction({ type: 'OPEN_EDIT_DIALOG', projectId: pid, verseRef })
              }
              onDiffClick={(pid, verseRef) =>
                handleAction({ type: 'OPEN_DIFF_DIALOG', projectId: pid, verseRef })
              }
              onGotoReference={(verseRef) => handleAction({ type: 'GOTO_REFERENCE', verseRef })}
            />
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="tw-border-t tw-border-border tw-px-2 tw-py-1 tw-text-xs tw-text-muted-foreground tw-shrink-0">
        {state.statusText || `${state.filteredCount} sets of parallels`}
      </div>
    </div>
  );
};
