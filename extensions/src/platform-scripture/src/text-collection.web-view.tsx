import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Button } from 'platform-bible-react';
import { formatScrRef, LocalizeKey } from 'platform-bible-utils';
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

/** Serializable memento for full state persistence (GAP-009) */
interface TextCollectionMemento {
  /** Ordered list of item IDs in the collection */
  itemIds: string[];
  /** Per-item zoom levels keyed by item ID */
  itemZooms: Record<string, number>;
  /** Index of the currently selected item */
  curItem: number;
  /** Splitter proportion between multi-pane and single-pane */
  splitterProportion: number;
  /** Current view mode */
  viewName: ViewMode;
  /** Overall multi-pane zoom level */
  multiPaneZoom: number;
  /** Single-pane zoom level */
  singlePaneZoom: number;
  /** Whether multi-pane is visible */
  multiShown: boolean;
  /** Whether single-pane is visible */
  singleShown: boolean;
  /** Whether footnotes are shown in single pane */
  singleFootnoteShown: boolean;
  /** Whether biblical terms highlighting is enabled */
  highlightBiblicalTerms: boolean;
  /** Whether guessed renderings highlighting is enabled */
  highlightGuessedRenderings: boolean;
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
  missingProjects: string[];
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
  '%textCollection_find%',
  '%textCollection_insertNote%',
  '%textCollection_notYetAvailable%',
  '%textCollection_closeSinglePane%',
  '%common_ok%',
  '%common_cancel%',
];

// #endregion

// No sample data - items are loaded from PAPI at runtime

// #region Helpers

/** Compute new curItem after a move operation */
function computeCurItemAfterMove(curItem: number, movedIndex: number, targetIndex: number): number {
  if (curItem === movedIndex) return targetIndex;
  if (curItem === targetIndex) return movedIndex;
  return curItem;
}

/** Debounce delay for saving memento state (in milliseconds) */
const MEMENTO_DEBOUNCE_MS = 500;

/**
 * Create a serializable memento from the current state (GAP-009). Captures: item IDs and their
 * order, per-item zoom levels, curItem index, splitter proportion, view mode, zoom levels, and pane
 * visibility.
 */
function createMemento(state: TCState): TextCollectionMemento {
  const itemZooms: Record<string, number> = {};
  state.items.forEach((item) => {
    itemZooms[item.id] = item.zoom;
  });

  return {
    itemIds: state.items.map((item) => item.id),
    itemZooms,
    curItem: state.curItem,
    splitterProportion: state.splitterProportion,
    viewName: state.viewName,
    multiPaneZoom: state.multiPaneZoom,
    singlePaneZoom: state.singlePaneZoom,
    multiShown: state.multiShown,
    singleShown: state.singleShown,
    singleFootnoteShown: state.singleFootnoteShown,
    highlightBiblicalTerms: state.highlightBiblicalTerms,
    highlightGuessedRenderings: state.highlightGuessedRenderings,
  };
}

/**
 * Restore TCState fields from a persisted memento (GAP-009). Reorders items according to the saved
 * item IDs, restores per-item zoom levels, and applies all saved display settings. Items not found
 * in the memento are appended at the end; items in the memento but not in the available items are
 * silently dropped.
 */
function restoreFromMemento(
  memento: TextCollectionMemento,
  availableItems: TextCollectionItem[],
): Partial<TCState> {
  const itemMap = new Map<string, TextCollectionItem>();
  availableItems.forEach((item) => itemMap.set(item.id, item));

  // Reorder items based on memento's saved order, restoring zoom levels
  const orderedItems: TextCollectionItem[] = [];
  memento.itemIds.forEach((id) => {
    const item = itemMap.get(id);
    if (item) {
      const restoredZoom = memento.itemZooms[id] ?? item.zoom;
      orderedItems.push({ ...item, zoom: restoredZoom });
      itemMap.delete(id);
    }
  });

  // Append any items not in the memento (newly added since memento was saved)
  itemMap.forEach((item) => {
    orderedItems.push(item);
  });

  // Clamp curItem to valid range
  const maxIndex = Math.max(0, orderedItems.length - 1);
  const restoredCurItem = Math.min(Math.max(0, memento.curItem), maxIndex);

  return {
    items: orderedItems,
    curItem: restoredCurItem,
    splitterProportion: memento.splitterProportion,
    viewName: memento.viewName,
    multiPaneZoom: memento.multiPaneZoom,
    singlePaneZoom: memento.singlePaneZoom,
    multiShown: memento.multiShown,
    singleShown: memento.singleShown,
    singleFootnoteShown: memento.singleFootnoteShown,
    highlightBiblicalTerms: memento.highlightBiblicalTerms,
    highlightGuessedRenderings: memento.highlightGuessedRenderings,
  };
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
  items: [],
  curItem: 0,
  multiShown: true,
  singleShown: false,
  splitterProportion: 0.6,
  viewName: 'Preview',
  multiPaneZoom: 1.0,
  singlePaneZoom: 1.0,
  singleFootnoteShown: false,
  highlightBiblicalTerms: false,
  highlightGuessedRenderings: false,
  focusedPane: 'multi',
  setupComplete: false,
  missingProjects: [],
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

/** Format a SerializedVerseRef to a display string like "GEN 1:1" */
function formatVerseRefDisplay(scrRef: SerializedVerseRef): string {
  return formatScrRef(scrRef);
}

/** Main TextCollectionWebView component (SCR-001) */
globalThis.webViewComponent = function TextCollectionWebView({
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(TC_STRING_KEYS);

  // Scroll group synchronization (GAP-001 + GAP-002)
  // scrRef syncs with scroll group; setScrRef available at [1] for propagating changes (GAP-002)
  const [scrRef] = useWebViewScrollGroupScrRef();
  const verseRefDisplay = useMemo(() => formatVerseRefDisplay(scrRef), [scrRef]);

  // Full memento persistence via useWebViewState (GAP-009)
  const [savedMemento, setSavedMemento] = useWebViewState<TextCollectionMemento | undefined>(
    'tcMemento',
    undefined,
  );

  const [state, dispatch] = useReducer(tcReducer, initialState);

  // Load items from PAPI on first mount
  const hasRestored = useRef(false);
  useEffect(() => {
    if (hasRestored.current) return;

    const loadItems = async () => {
      try {
        // Get all projects from the platform
        const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
          includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
        });

        // Fetch enriched project info for each project
        const enrichedItems: TextCollectionItem[] = await Promise.all(
          projectMetadata.map(async (data) => {
            const pdp = await papi.projectDataProviders.get('platform.base', data.id);
            const name = (await pdp.getSetting('platform.name')) ?? data.id;
            const fullName = (await pdp.getSetting('platform.fullName')) ?? name;
            const language = (await pdp.getSetting('platform.language')) ?? '';

            return {
              name,
              id: data.id,
              fullName,
              language,
              languageId: language.toLowerCase().substring(0, 2),
              fontName: 'Charis SIL',
              baseFontSize: 12,
              isRTL: false,
              zoom: 1.0,
              verseText: '',
            };
          }),
        );

        hasRestored.current = true;

        // If we have a saved memento, restore from it using real project data
        if (savedMemento) {
          const restoredState = restoreFromMemento(savedMemento, enrichedItems);
          dispatch({ type: 'RESTORE_STATE', state: restoredState });
          logger.debug('Text collection: restored state from memento with PAPI data');
        } else if (enrichedItems.length >= 2) {
          // No memento - initialize with first few available projects
          dispatch({
            type: 'RESTORE_STATE',
            state: { items: enrichedItems.slice(0, 4) },
          });
          logger.debug(
            `Text collection: initialized with ${Math.min(4, enrichedItems.length)} projects from PAPI`,
          );
        } else {
          // Not enough projects available
          dispatch({ type: 'RESTORE_STATE', state: { items: enrichedItems } });
          logger.debug('Text collection: fewer than 2 projects available');
        }
      } catch (error) {
        logger.warn(`Text collection: failed to load projects from PAPI: ${error}`);
        hasRestored.current = true;
        dispatch({ type: 'RESTORE_STATE', state: { items: [] } });
      }
    };

    loadItems();
  }, [savedMemento]);

  // Debounced memento save on state changes (GAP-009)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    // Skip saving until state has been fully initialized
    if (!state.setupComplete) return undefined;

    // Clear any pending debounce
    if (debounceTimerRef.current !== undefined) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const memento = createMemento(state);
      setSavedMemento(memento);
      logger.debug('Text collection: saved memento');
    }, MEMENTO_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current !== undefined) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [
    state.items,
    state.curItem,
    state.splitterProportion,
    state.viewName,
    state.multiPaneZoom,
    state.singlePaneZoom,
    state.multiShown,
    state.singleShown,
    state.singleFootnoteShown,
    state.highlightBiblicalTerms,
    state.highlightGuessedRenderings,
    state.setupComplete,
    setSavedMemento,
  ]);

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
      // Ctrl+C: Copy selected text (GAP-003)
      if (e.ctrlKey && e.key === 'c') {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          navigator.clipboard.writeText(selection.toString()).catch((err) => {
            logger.warn(`Text collection: clipboard write failed: ${err}`);
          });
        }
        // Do not preventDefault so default copy behavior still works as fallback
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

  // Derive window title using dynamic verse reference (GAP-002)
  const windowTitle = useMemo(() => {
    const titleBase = localizedStrings['%textCollection_title%'] || 'Text Collection';
    if (state.items.length === 0) return `${titleBase} (${verseRefDisplay})`;
    const names = state.items.map((item) => item.name).join(', ');
    return `${names}: (${titleBase} (${verseRefDisplay}))`;
  }, [state.items, verseRefDisplay, localizedStrings]);

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
          verseRefDisplay={verseRefDisplay}
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
      verseRefDisplay,
    ],
  );

  // Handle closing single pane (GAP-007)
  const handleCloseSinglePane = useCallback(() => {
    dispatch({ type: 'TOGGLE_SINGLE_PANE' });
  }, []);

  // Build single-pane content (GAP-005: full verse text; GAP-007: close button)
  const singlePaneContent = useMemo(
    () => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className="tw-h-full" onClick={handleSingleFocus} data-testid="single-pane-container">
        {selectedItem ? (
          <div className="tw-p-4" data-testid="single-pane-content">
            {/* Header with project name and close button (GAP-007) */}
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <div className="tw-text-sm tw-font-semibold tw-text-muted-foreground">
                {selectedItem.fullName} ({selectedItem.name})
              </div>
              <button
                type="button"
                className="tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-muted-foreground hover:tw-text-foreground tw-text-lg tw-leading-none tw-p-1"
                onClick={handleCloseSinglePane}
                aria-label={
                  localizedStrings['%textCollection_closeSinglePane%'] || 'Close single pane'
                }
                title={localizedStrings['%textCollection_closeSinglePane%'] || 'Close single pane'}
                data-testid="close-single-pane"
              >
                &#x2715;
              </button>
            </div>
            {/* Full verse text content (GAP-005) */}
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
                <span className="tw-font-bold">{scrRef.verseNum}</span> {selectedItem.verseText}
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
      state.singleFootnoteShown,
      scrRef.verseNum,
      handleSingleFocus,
      handleCloseSinglePane,
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

        {/* Disabled Find stub (GAP-006) */}
        <span title={localizedStrings['%textCollection_notYetAvailable%'] || 'Not yet available'}>
          <Button
            type="button"
            variant="outline"
            className="tw-text-xs tw-h-6 tw-px-2"
            disabled
            data-testid="find-button"
          >
            {localizedStrings['%textCollection_find%'] || 'Find...'} (Ctrl+F)
          </Button>
        </span>

        {/* Disabled Insert consultant note stub (GAP-006) */}
        <span title={localizedStrings['%textCollection_notYetAvailable%'] || 'Not yet available'}>
          <Button
            type="button"
            variant="outline"
            className="tw-text-xs tw-h-6 tw-px-2"
            disabled
            data-testid="insert-note-button"
          >
            {localizedStrings['%textCollection_insertNote%'] || 'Insert consultant note...'}{' '}
            (Ctrl+Shift+I)
          </Button>
        </span>
      </div>

      {/* Missing projects ribbon (GAP-004) */}
      {state.missingProjects.length > 0 && (
        <div className="missing-project-ribbon" role="alert" data-testid="missing-project-ribbon">
          <span className="tw-font-semibold">
            {localizedStrings['%textCollection_missingProjectsLabel%'] || 'Missing projects'}:
          </span>{' '}
          {state.missingProjects.join(', ')}
        </div>
      )}

      {/* Content area */}
      <div className="text-collection-content">
        {!state.setupComplete ? (
          <div
            className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground"
            data-testid="tc-loading"
          >
            Loading texts from PAPI...
          </div>
        ) : state.items.length === 0 ? (
          <div
            className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground"
            data-testid="tc-no-texts"
          >
            {localizedStrings['%textCollection_noTextsMessage%'] ||
              'No texts available. Use the Select Texts dialog to add texts to this collection.'}
          </div>
        ) : (
          <SplitterPanel
            leftContent={multiPaneContent}
            rightContent={singlePaneContent}
            initialProportion={state.splitterProportion}
            onProportionChange={handleSplitterChange}
            leftVisible={state.multiShown}
            rightVisible={state.singleShown}
            ariaLabel={localizedStrings['%textCollection_splitterLabel%'] || 'Resize panes'}
          />
        )}
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
