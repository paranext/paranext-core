import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import MultiPaneRenderer, { MultiPaneTextItem } from './components/multi-pane-renderer.component';
import SplitterPanel from './components/splitter-panel.component';

// #region Types

type ViewMode = 'Preview' | 'Unformatted' | 'Standard';
const VIEW_MODES: ViewMode[] = ['Preview', 'Unformatted', 'Standard'];
type FocusedPane = 'multi' | 'single';

interface TextCollectionItem {
  name: string;
  id: string;
  fullName: string;
  language: string;
  languageId: string;
  fontName: string;
  baseFontSize: number;
  isRTL: boolean;
  zoom: number;
  verseText: string;
}

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  itemIndex: number;
}

interface TCState {
  items: TextCollectionItem[];
  curItem: number;
  multiShown: boolean;
  singleShown: boolean;
  splitterProportion: number;
  viewName: ViewMode;
  multiPaneZoom: number;
  singlePaneZoom: number;
  singleFootnoteShown: boolean;
  highlightBiblicalTerms: boolean;
  highlightGuessedRenderings: boolean;
  focusedPane: FocusedPane;
  setupComplete: boolean;
}

type TCAction =
  | { type: 'SET_CUR_ITEM'; index: number }
  | { type: 'TOGGLE_SINGLE_PANE' }
  | { type: 'TOGGLE_FOOTNOTES' }
  | { type: 'SET_VIEW_MODE'; mode: ViewMode }
  | { type: 'SET_SPLITTER_PROPORTION'; proportion: number }
  | { type: 'SET_FOCUSED_PANE'; pane: FocusedPane }
  | { type: 'ZOOM_IN' }
  | { type: 'ZOOM_OUT' }
  | { type: 'ZOOM_RESET' }
  | { type: 'CONTEXT_ZOOM_IN'; index: number }
  | { type: 'CONTEXT_ZOOM_OUT'; index: number }
  | { type: 'CONTEXT_ZOOM_ACTUAL'; index: number }
  | { type: 'CONTEXT_MOVE_UP'; index: number }
  | { type: 'CONTEXT_MOVE_DOWN'; index: number }
  | { type: 'CONTEXT_CLOSE'; index: number }
  | { type: 'TOGGLE_HIGHLIGHT_TERMS' }
  | { type: 'TOGGLE_HIGHLIGHT_GUESSED' }
  | { type: 'RESTORE_STATE'; state: Partial<TCState> };

// #endregion

// #region Localization Keys

const TC_STRING_KEYS: LocalizeKey[] = [
  '%textCollection_title%',
  '%textCollection_twoPanes%',
  '%textCollection_showFootnotes%',
  '%textCollection_viewPreview%',
  '%textCollection_viewUnformatted%',
  '%textCollection_viewStandard%',
  '%textCollection_close%',
  '%textCollection_zoomIn%',
  '%textCollection_zoomOut%',
  '%textCollection_zoomActual%',
  '%textCollection_moveUp%',
  '%textCollection_moveDown%',
  '%textCollection_modifyCollection%',
  '%textCollection_multiPaneLabel%',
  '%textCollection_singlePaneLabel%',
  '%textCollection_splitterLabel%',
  '%textCollection_singlePanePlaceholder%',
  '%textCollection_noTextsMessage%',
  '%textCollection_footnoteToggleDisabled%',
  '%textCollection_missingProjectsLabel%',
  '%common_ok%',
  '%common_cancel%',
];

// #endregion

// #region Sample Data

const SAMPLE_TEXTS: TextCollectionItem[] = [
  {
    name: 'zzz3',
    id: 'proj-001',
    fullName: 'Test Project 3',
    language: 'English',
    languageId: 'en',
    fontName: 'Charis SIL',
    baseFontSize: 12,
    isRTL: false,
    zoom: 1.0,
    verseText: 'In the beginning God created the heavens and the earth.',
  },
  {
    name: 'NIV84',
    id: 'res-001',
    fullName: 'NIV 1984',
    language: 'English',
    languageId: 'en',
    fontName: 'Charis SIL',
    baseFontSize: 12,
    isRTL: false,
    zoom: 1.0,
    verseText: 'In the beginning God created the heavens and the earth.',
  },
  {
    name: 'CEVUK',
    id: 'res-002',
    fullName: 'Contemporary English Version',
    language: 'English',
    languageId: 'en',
    fontName: 'Charis SIL',
    baseFontSize: 12,
    isRTL: false,
    zoom: 1.0,
    verseText:
      'In the beginning God created the heavens and the earth. / The earth was barren, with no form of life.',
  },
  {
    name: 'HEBOT',
    id: 'res-003',
    fullName: 'Hebrew Old Testament',
    language: 'Hebrew',
    languageId: 'he',
    fontName: 'Ezra SIL',
    baseFontSize: 14,
    isRTL: true,
    zoom: 1.0,
    verseText:
      '\u05D1\u05B0\u05BC\u05E8\u05B5\u05D0\u05E9\u05C1\u05B4\u05D9\u05EA \u05D1\u05B8\u05BC\u05E8\u05B8\u05D0 \u05D0\u05B1\u05DC\u05B9\u05D4\u05B4\u05D9\u05DD \u05D0\u05B5\u05EA \u05D4\u05B7\u05E9\u05C1\u05B8\u05BC\u05DE\u05B7\u05D9\u05B4\u05DD \u05D5\u05B0\u05D0\u05B5\u05EA \u05D4\u05B8\u05D0\u05B8\u05E8\u05B6\u05E5\u05F7',
  },
];

// #endregion

// #region Helpers

/** Compute new curItem after a move operation */
function computeCurItemAfterMove(curItem: number, movedIndex: number, targetIndex: number): number {
  if (curItem === movedIndex) return targetIndex;
  if (curItem === targetIndex) return movedIndex;
  return curItem;
}

// #endregion

// #region Reducer

function tcReducer(state: TCState, action: TCAction): TCState {
  switch (action.type) {
    case 'SET_CUR_ITEM':
      return {
        ...state,
        curItem: action.index,
        singleShown: true,
      };

    case 'TOGGLE_SINGLE_PANE':
      return {
        ...state,
        singleShown: !state.singleShown,
      };

    case 'TOGGLE_FOOTNOTES':
      if (!state.singleShown) return state;
      return {
        ...state,
        singleFootnoteShown: !state.singleFootnoteShown,
      };

    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewName: action.mode,
      };

    case 'SET_SPLITTER_PROPORTION':
      return {
        ...state,
        splitterProportion: action.proportion,
      };

    case 'SET_FOCUSED_PANE':
      return {
        ...state,
        focusedPane: action.pane,
      };

    case 'ZOOM_IN': {
      if (state.focusedPane === 'single') {
        return { ...state, singlePaneZoom: state.singlePaneZoom * 1.1 };
      }
      return { ...state, multiPaneZoom: state.multiPaneZoom * 1.1 };
    }

    case 'ZOOM_OUT': {
      if (state.focusedPane === 'single') {
        return { ...state, singlePaneZoom: state.singlePaneZoom / 1.1 };
      }
      return { ...state, multiPaneZoom: state.multiPaneZoom / 1.1 };
    }

    case 'ZOOM_RESET': {
      if (state.focusedPane === 'single') {
        return { ...state, singlePaneZoom: 1.0 };
      }
      // Multi-pane: reset ALL per-text zooms to 1.0 and overall zoom
      return {
        ...state,
        multiPaneZoom: 1.0,
        items: state.items.map((item) => ({ ...item, zoom: 1.0 })),
      };
    }

    case 'CONTEXT_ZOOM_IN': {
      const newItems = [...state.items];
      newItems[action.index] = {
        ...newItems[action.index],
        zoom: newItems[action.index].zoom * 1.1,
      };
      return { ...state, items: newItems };
    }

    case 'CONTEXT_ZOOM_OUT': {
      const newItems = [...state.items];
      newItems[action.index] = {
        ...newItems[action.index],
        zoom: newItems[action.index].zoom / 1.1,
      };
      return { ...state, items: newItems };
    }

    case 'CONTEXT_ZOOM_ACTUAL': {
      const newItems = [...state.items];
      newItems[action.index] = {
        ...newItems[action.index],
        zoom: 1.0,
      };
      return { ...state, items: newItems };
    }

    case 'CONTEXT_MOVE_UP': {
      if (action.index <= 0) return state;
      const newItems = [...state.items];
      [newItems[action.index - 1], newItems[action.index]] = [
        newItems[action.index],
        newItems[action.index - 1],
      ];
      const newCurItem = computeCurItemAfterMove(state.curItem, action.index, action.index - 1);
      return { ...state, items: newItems, curItem: newCurItem };
    }

    case 'CONTEXT_MOVE_DOWN': {
      if (action.index >= state.items.length - 1) return state;
      const newItems = [...state.items];
      [newItems[action.index], newItems[action.index + 1]] = [
        newItems[action.index + 1],
        newItems[action.index],
      ];
      const newCurItem = computeCurItemAfterMove(state.curItem, action.index, action.index + 1);
      return { ...state, items: newItems, curItem: newCurItem };
    }

    case 'CONTEXT_CLOSE': {
      const newItems = state.items.filter((_, i) => i !== action.index);
      let newCurItem = state.curItem;
      if (action.index < state.curItem) {
        newCurItem = state.curItem - 1;
      } else if (action.index === state.curItem) {
        newCurItem = Math.min(state.curItem, newItems.length - 1);
      }
      return {
        ...state,
        items: newItems,
        curItem: Math.max(0, newCurItem),
      };
    }

    case 'TOGGLE_HIGHLIGHT_TERMS':
      return {
        ...state,
        highlightBiblicalTerms: !state.highlightBiblicalTerms,
      };

    case 'TOGGLE_HIGHLIGHT_GUESSED':
      return {
        ...state,
        highlightGuessedRenderings: !state.highlightGuessedRenderings,
      };

    case 'RESTORE_STATE':
      return { ...state, ...action.state, setupComplete: true };

    default:
      return state;
  }
}

const initialState: TCState = {
  items: SAMPLE_TEXTS,
  curItem: 0,
  multiShown: true,
  singleShown: true,
  splitterProportion: 0.6,
  viewName: 'Preview',
  multiPaneZoom: 1.0,
  singlePaneZoom: 1.0,
  singleFootnoteShown: false,
  highlightBiblicalTerms: false,
  highlightGuessedRenderings: false,
  focusedPane: 'multi',
  setupComplete: true,
};

// #endregion

// #region Context Menu Component

function ContextMenu({
  ctxMenu,
  itemCount,
  localizedStrings,
  onAction,
  onClose,
}: {
  ctxMenu: ContextMenuState;
  itemCount: number;
  localizedStrings: Record<string, string>;
  onAction: (action: TCAction) => void;
  onClose: () => void;
}) {
  // eslint-disable-next-line no-null/no-null
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && e.target instanceof Node && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!ctxMenu.visible) return undefined;

  const items: Array<{
    label: string;
    action: TCAction;
    visible: boolean;
  }> = [
    {
      label: localizedStrings['%textCollection_close%'] || 'Close',
      action: { type: 'CONTEXT_CLOSE', index: ctxMenu.itemIndex },
      visible: true,
    },
    {
      label: localizedStrings['%textCollection_zoomIn%'] || 'Zoom In',
      action: { type: 'CONTEXT_ZOOM_IN', index: ctxMenu.itemIndex },
      visible: true,
    },
    {
      label: localizedStrings['%textCollection_zoomOut%'] || 'Zoom Out',
      action: { type: 'CONTEXT_ZOOM_OUT', index: ctxMenu.itemIndex },
      visible: true,
    },
    {
      label: localizedStrings['%textCollection_zoomActual%'] || 'Zoom Actual',
      action: { type: 'CONTEXT_ZOOM_ACTUAL', index: ctxMenu.itemIndex },
      visible: true,
    },
    {
      label: localizedStrings['%textCollection_moveUp%'] || 'Move Up',
      action: { type: 'CONTEXT_MOVE_UP', index: ctxMenu.itemIndex },
      visible: ctxMenu.itemIndex > 0,
    },
    {
      label: localizedStrings['%textCollection_moveDown%'] || 'Move Down',
      action: { type: 'CONTEXT_MOVE_DOWN', index: ctxMenu.itemIndex },
      visible: ctxMenu.itemIndex < itemCount - 1,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="text-collection-context-menu"
      style={{ left: ctxMenu.x, top: ctxMenu.y }}
      role="menu"
      data-testid="tc-context-menu"
    >
      {items.map((item, idx) => {
        if (!item.visible) return undefined;
        // Add separator between Close and Zoom group, and between Zoom and Move group
        const showSepBefore = idx === 1 || idx === 4;
        return (
          <div key={item.label}>
            {showSepBefore && <div className="text-collection-context-menu-separator" />}
            <button
              type="button"
              className="text-collection-context-menu-item"
              role="menuitem"
              onClick={() => {
                onAction(item.action);
                onClose();
              }}
            >
              {item.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// #endregion

/** Main TextCollectionWebView component (SCR-001) */
globalThis.webViewComponent = function TextCollectionWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(TC_STRING_KEYS);

  // Restore state from web view state if available
  const [savedTcState] = useWebViewState<Partial<TCState> | undefined>('tcState', undefined);

  const [state, dispatch] = useReducer(tcReducer, initialState);

  // Restore state on first mount if available
  const hasRestored = useRef(false);
  useEffect(() => {
    if (savedTcState && !hasRestored.current) {
      hasRestored.current = true;
      dispatch({ type: 'RESTORE_STATE', state: savedTcState });
    }
  }, [savedTcState]);

  // Context menu state
  const [ctxMenu, setCtxMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    itemIndex: 0,
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+E: Toggle two panes
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_SINGLE_PANE' });
      }
      // F7: Toggle footnotes
      if (e.key === 'F7') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_FOOTNOTES' });
      }
      // Ctrl+Plus: Zoom in
      if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        dispatch({ type: 'ZOOM_IN' });
      }
      // Ctrl+Minus: Zoom out
      if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        dispatch({ type: 'ZOOM_OUT' });
      }
      // Ctrl+0: Zoom reset
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        dispatch({ type: 'ZOOM_RESET' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAbbreviationClick = useCallback((index: number) => {
    dispatch({ type: 'SET_CUR_ITEM', index });
    logger.debug(`Text collection: selected text at index ${index}`);
  }, []);

  const handleContextMenu = useCallback((index: number, event: React.MouseEvent) => {
    setCtxMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      itemIndex: index,
    });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setCtxMenu((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleSplitterChange = useCallback((proportion: number) => {
    dispatch({ type: 'SET_SPLITTER_PROPORTION', proportion });
  }, []);

  const handleMultiFocus = useCallback(() => {
    dispatch({ type: 'SET_FOCUSED_PANE', pane: 'multi' });
  }, []);

  const handleSingleFocus = useCallback(() => {
    dispatch({ type: 'SET_FOCUSED_PANE', pane: 'single' });
  }, []);

  // Derive window title
  const windowTitle = useMemo(() => {
    if (state.items.length === 0) return 'Text Collection (GEN 1:1)';
    const names = state.items.map((item) => item.name).join(', ');
    return `${names}: (Text Collection (GEN 1:1))`;
  }, [state.items]);

  // Map items to multi-pane format
  const multiPaneItems: MultiPaneTextItem[] = useMemo(
    () =>
      state.items.map((item) => ({
        name: item.name,
        id: item.id,
        fullName: item.fullName,
        language: item.language,
        languageId: item.languageId,
        fontName: item.fontName,
        baseFontSize: item.baseFontSize,
        isRTL: item.isRTL,
        zoom: item.zoom,
        verseText: item.verseText,
      })),
    [state.items],
  );

  // Currently selected item
  const selectedItem = state.items[state.curItem];

  // Build multi-pane content
  const multiPaneContent = useMemo(
    () => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className="tw-h-full" onClick={handleMultiFocus} data-testid="multi-pane-container">
        <MultiPaneRenderer
          items={multiPaneItems}
          overallZoom={state.multiPaneZoom}
          selectedIndex={state.curItem}
          onAbbreviationClick={handleAbbreviationClick}
          onContextMenu={handleContextMenu}
          verseRefDisplay="GEN 1:1"
          ariaLabel={
            localizedStrings['%textCollection_multiPaneLabel%'] || 'Multi-pane text comparison'
          }
        />
      </div>
    ),
    [
      multiPaneItems,
      state.multiPaneZoom,
      state.curItem,
      handleAbbreviationClick,
      handleContextMenu,
      handleMultiFocus,
      localizedStrings,
    ],
  );

  // Build single-pane content
  const singlePaneContent = useMemo(
    () => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className="tw-h-full" onClick={handleSingleFocus} data-testid="single-pane-container">
        {selectedItem ? (
          <div className="tw-p-4" data-testid="single-pane-content">
            <div className="tw-mb-2 tw-text-sm tw-font-semibold tw-text-muted-foreground">
              {selectedItem.fullName} ({selectedItem.name})
            </div>
            <div
              className="tw-leading-relaxed"
              style={{
                fontFamily: selectedItem.fontName || 'inherit',
                fontSize: `${selectedItem.baseFontSize * state.singlePaneZoom}pt`,
                direction: selectedItem.isRTL ? 'rtl' : 'ltr',
                textAlign: selectedItem.isRTL ? 'right' : 'left',
              }}
              role="region"
              aria-label={
                localizedStrings['%textCollection_singlePaneLabel%'] || 'Single-pane detail view'
              }
            >
              <p className="tw-mb-2">
                <span className="tw-font-bold">1</span> {selectedItem.verseText}
              </p>
              <p className="tw-mb-2 tw-text-muted-foreground tw-text-xs">
                {`[${localizedStrings['%textCollection_viewPreview%'] || state.viewName} mode - Chapter view placeholder. Full scripture rendering will be provided by platform-scripture-editor integration.]`}
              </p>
            </div>
            {state.singleFootnoteShown && (
              <div
                className="tw-border-t tw-border-border tw-mt-4 tw-pt-2 tw-text-xs tw-text-muted-foreground"
                data-testid="footnote-pane"
              >
                [Footnote pane placeholder - will display footnotes for the current chapter]
              </div>
            )}
          </div>
        ) : (
          <div className="single-pane-placeholder" data-testid="single-pane-empty">
            {localizedStrings['%textCollection_singlePanePlaceholder%'] ||
              'Click a text abbreviation in the multi-pane to view details here'}
          </div>
        )}
      </div>
    ),
    [
      selectedItem,
      state.singlePaneZoom,
      state.viewName,
      state.singleFootnoteShown,
      handleSingleFocus,
      localizedStrings,
    ],
  );

  return (
    <div className="pr-twp text-collection-root" data-testid="text-collection-main">
      {/* Toolbar */}
      <div className="text-collection-toolbar" data-testid="tc-toolbar">
        <span className="tw-text-sm tw-font-medium tw-truncate" title={windowTitle}>
          {windowTitle}
        </span>

        {/* View mode selector */}
        <div className="view-mode-selector">
          {VIEW_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              className={`view-mode-button ${state.viewName === mode ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', mode })}
              aria-pressed={state.viewName === mode}
              data-testid={`view-mode-${mode.toLowerCase()}`}
            >
              {localizedStrings[`%textCollection_view${mode}%`] || mode}
            </button>
          ))}
        </div>

        {/* Two panes toggle */}
        <Button
          type="button"
          variant={state.singleShown ? 'default' : 'outline'}
          className="tw-text-xs tw-h-6 tw-px-2"
          onClick={() => dispatch({ type: 'TOGGLE_SINGLE_PANE' })}
          aria-pressed={state.singleShown}
          title={`${localizedStrings['%textCollection_twoPanes%'] || 'Two panes'} (Ctrl+E)`}
          data-testid="toggle-two-panes"
        >
          {localizedStrings['%textCollection_twoPanes%'] || 'Two panes'}
        </Button>

        {/* Footnotes toggle */}
        <span
          title={
            !state.singleShown
              ? localizedStrings['%textCollection_footnoteToggleDisabled%'] ||
                'Enable two panes to toggle footnotes'
              : undefined
          }
        >
          <Button
            type="button"
            variant={state.singleFootnoteShown ? 'default' : 'outline'}
            className="tw-text-xs tw-h-6 tw-px-2"
            onClick={() => dispatch({ type: 'TOGGLE_FOOTNOTES' })}
            disabled={!state.singleShown}
            aria-pressed={state.singleFootnoteShown}
            title={`${localizedStrings['%textCollection_showFootnotes%'] || 'Show Footnotes'} (F7)`}
            data-testid="toggle-footnotes"
          >
            {localizedStrings['%textCollection_showFootnotes%'] || 'Footnotes'}
          </Button>
        </span>
      </div>

      {/* Content area */}
      <div className="text-collection-content">
        <SplitterPanel
          leftContent={multiPaneContent}
          rightContent={singlePaneContent}
          initialProportion={state.splitterProportion}
          onProportionChange={handleSplitterChange}
          leftVisible={state.multiShown}
          rightVisible={state.singleShown}
          ariaLabel={localizedStrings['%textCollection_splitterLabel%'] || 'Resize panes'}
        />
      </div>

      {/* Context menu */}
      <ContextMenu
        ctxMenu={ctxMenu}
        itemCount={state.items.length}
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        localizedStrings={localizedStrings as Record<string, string>}
        onAction={dispatch}
        onClose={handleCloseContextMenu}
      />
    </div>
  );
};
