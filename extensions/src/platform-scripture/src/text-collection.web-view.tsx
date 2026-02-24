import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Spinner } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import SplitterPanel from './components/splitter-panel.component';
import MultiPaneRenderer from './components/multi-pane-renderer.component';
import type {
  TextCollectionFormState,
  TextCollectionAction,
  ViewMode,
} from './types/platform-scripture-text-collection';

// #region Localization Keys

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_textCollection_title%',
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
  '%textCollection_missingProjects%',
  '%textCollection_sendReceive%',
  '%textCollection_installResources%',
  '%textCollection_noTextsLoaded%',
  '%textCollection_singlePanePlaceholder%',
];

function getEnglishDefault(key: LocalizeKey): string {
  const defaults: Record<string, string> = {
    '%webView_textCollection_title%': 'Text Collection',
    '%textCollection_twoPanes%': 'Two panes',
    '%textCollection_showFootnotes%': 'Show Footnotes',
    '%textCollection_viewPreview%': 'Preview',
    '%textCollection_viewUnformatted%': 'Unformatted',
    '%textCollection_viewStandard%': 'Standard',
    '%textCollection_close%': 'Close',
    '%textCollection_zoomIn%': 'Zoom In',
    '%textCollection_zoomOut%': 'Zoom Out',
    '%textCollection_zoomActual%': 'Zoom Actual',
    '%textCollection_moveUp%': 'Move Up',
    '%textCollection_moveDown%': 'Move Down',
    '%textCollection_modifyCollection%': 'Modify text collection...',
    '%textCollection_missingProjects%': 'Some projects are missing',
    '%textCollection_sendReceive%': 'Send/Receive',
    '%textCollection_installResources%': 'Install Resources',
    '%textCollection_noTextsLoaded%':
      'No texts loaded. Use Edit > Modify text collection to add texts.',
    '%textCollection_singlePanePlaceholder%': 'Select a text in the left pane to view it here.',
  };
  return defaults[key] || key;
}

// #endregion

// #region Reducer

const ZOOM_FACTOR = 1.1;

const initialState: TextCollectionFormState = {
  items: [],
  curItem: 0,
  multiShown: true,
  singleShown: true,
  viewName: 'Preview',
  multiPaneZoom: 1.0,
  singlePaneZoom: 1.0,
  singleFootnoteZoom: 1.0,
  singleFootnoteShown: false,
  singleFootnoteProportion: 0.3,
  splitterProportion: 0.6,
  highlightBiblicalTermRenderings: false,
  highlightGuessedRenderings: false,
  singleResourceHasFocus: false,
  missingProjects: [],
  missingResources: [],
  windowTitle: 'Text Collection',
  windowTooltip: '',
  setupComplete: false,
  multiPaneHtml: '',
  multiPaneCss: '',
};

function textCollectionReducer(
  state: TextCollectionFormState,
  action: TextCollectionAction,
): TextCollectionFormState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.items };

    case 'SET_CUR_ITEM':
      return {
        ...state,
        curItem: action.index,
        singleShown: true,
      };

    case 'TOGGLE_SINGLE_PANE':
      return { ...state, singleShown: !state.singleShown };

    case 'SET_VIEW_MODE':
      return { ...state, viewName: action.viewName };

    case 'SET_SPLITTER_PROPORTION':
      return { ...state, splitterProportion: action.proportion };

    case 'ZOOM_IN_MULTI':
      return { ...state, multiPaneZoom: state.multiPaneZoom * ZOOM_FACTOR };

    case 'ZOOM_OUT_MULTI':
      return { ...state, multiPaneZoom: state.multiPaneZoom / ZOOM_FACTOR };

    case 'ZOOM_RESET_MULTI': {
      // Reset all per-text zooms to 1.0
      const resetItems = state.items.map((item) => ({ ...item, zoom: 1.0 }));
      return { ...state, multiPaneZoom: 1.0, items: resetItems };
    }

    case 'ZOOM_IN_SINGLE':
      return { ...state, singlePaneZoom: state.singlePaneZoom * ZOOM_FACTOR };

    case 'ZOOM_OUT_SINGLE':
      return { ...state, singlePaneZoom: state.singlePaneZoom / ZOOM_FACTOR };

    case 'ZOOM_RESET_SINGLE':
      return { ...state, singlePaneZoom: 1.0 };

    case 'ZOOM_IN_TEXT': {
      const items = [...state.items];
      if (action.index >= 0 && action.index < items.length) {
        items[action.index] = {
          ...items[action.index],
          zoom: items[action.index].zoom * ZOOM_FACTOR,
        };
      }
      return { ...state, items };
    }

    case 'ZOOM_OUT_TEXT': {
      const items = [...state.items];
      if (action.index >= 0 && action.index < items.length) {
        items[action.index] = {
          ...items[action.index],
          zoom: items[action.index].zoom / ZOOM_FACTOR,
        };
      }
      return { ...state, items };
    }

    case 'ZOOM_ACTUAL_TEXT': {
      const items = [...state.items];
      if (action.index >= 0 && action.index < items.length) {
        items[action.index] = { ...items[action.index], zoom: 1.0 };
      }
      return { ...state, items };
    }

    case 'MOVE_ITEM_UP': {
      if (action.index <= 0 || action.index >= state.items.length) return state;
      const items = [...state.items];
      [items[action.index - 1], items[action.index]] = [
        items[action.index],
        items[action.index - 1],
      ];
      const newCurItem =
        state.curItem === action.index
          ? action.index - 1
          : state.curItem === action.index - 1
            ? action.index
            : state.curItem;
      return { ...state, items, curItem: newCurItem };
    }

    case 'MOVE_ITEM_DOWN': {
      if (action.index < 0 || action.index >= state.items.length - 1) return state;
      const items = [...state.items];
      [items[action.index], items[action.index + 1]] = [
        items[action.index + 1],
        items[action.index],
      ];
      const newCurItem =
        state.curItem === action.index
          ? action.index + 1
          : state.curItem === action.index + 1
            ? action.index
            : state.curItem;
      return { ...state, items, curItem: newCurItem };
    }

    case 'REMOVE_ITEM': {
      if (action.index < 0 || action.index >= state.items.length) return state;
      const items = state.items.filter((_, i) => i !== action.index);
      let { curItem } = state;
      if (curItem >= items.length) curItem = Math.max(0, items.length - 1);
      else if (curItem > action.index) curItem -= 1;
      return { ...state, items, curItem };
    }

    case 'SET_MULTI_PANE_CONTENT':
      return { ...state, multiPaneHtml: action.html, multiPaneCss: action.css };

    case 'TOGGLE_FOOTNOTES':
      return { ...state, singleFootnoteShown: !state.singleFootnoteShown };

    case 'SET_FOCUS':
      return { ...state, singleResourceHasFocus: action.singleHasFocus };

    case 'SET_SETUP_COMPLETE':
      return { ...state, setupComplete: true };

    case 'SET_WINDOW_TITLE':
      return { ...state, windowTitle: action.title };

    case 'SET_MISSING_PROJECTS':
      return {
        ...state,
        missingProjects: action.missing,
        missingResources: action.missingResources,
      };

    case 'TOGGLE_HIGHLIGHT_TERMS':
      return {
        ...state,
        highlightBiblicalTermRenderings: !state.highlightBiblicalTermRenderings,
      };

    case 'TOGGLE_HIGHLIGHT_GUESSED':
      return {
        ...state,
        highlightGuessedRenderings: !state.highlightGuessedRenderings,
      };

    default:
      return state;
  }
}

// #endregion

global.webViewComponent = function TextCollectionWebView({
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  // Localized strings
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const getString = useCallback(
    (key: LocalizeKey): string => localizedStrings[key] || getEnglishDefault(key),
    [localizedStrings],
  );

  // Scroll group integration
  const [scrRef] = useWebViewScrollGroupScrRef();

  // State management
  const [state, dispatch] = useReducer(textCollectionReducer, initialState);

  // Load multi-pane content from backend when reference or items change
  useEffect(() => {
    if (state.items.length === 0) return;

    let cancelled = false;

    async function loadContent() {
      try {
        const itemStates = state.items.map((item) => ({
          scrTextName: item.scrText.name,
          scrTextId: item.scrText.id,
          zoom: item.zoom,
        }));

        const result = await (
          papi.commands.sendCommand as (command: string, ...args: unknown[]) => Promise<unknown>
        )('platformScripture.generateMultiPaneContent', itemStates, scrRef, state.multiPaneZoom);

        if (!cancelled && result) {
          const content = result as { html?: string; css?: string };
          dispatch({
            type: 'SET_MULTI_PANE_CONTENT',
            html: content.html || '',
            css: content.css || '',
          });
        }
      } catch (err) {
        logger.warn(`Text Collection: Failed to load multi-pane content: ${err}`);
        // Generate placeholder HTML so users see something
        if (!cancelled) {
          const placeholderHtml = state.items
            .map(
              (item, idx) =>
                `<div class="resource" data-item-index="${idx}">` +
                `<a href="select:${idx}" class="abbrev-link">[${item.scrText.name}]</a> ` +
                `<span style="font-family: ${item.scrText.fontName || 'inherit'}; ` +
                `font-size: ${(item.scrText.baseFontSize || 12) * item.zoom}pt; ` +
                `direction: ${item.scrText.isRTL ? 'rtl' : 'ltr'};">` +
                `(Content at ${scrRef?.book || '?'} ${scrRef?.chapterNum || '?'}:${scrRef?.verseNum || '?'})` +
                `</span></div>`,
            )
            .join('');
          dispatch({
            type: 'SET_MULTI_PANE_CONTENT',
            html: placeholderHtml,
            css: '',
          });
        }
      }
    }

    loadContent();
    return () => {
      cancelled = true;
    };
    // Intentionally not including all state dependencies to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrRef?.book, scrRef?.chapterNum, scrRef?.verseNum, state.items.length, state.multiPaneZoom]);

  // Generate title from backend
  useEffect(() => {
    if (state.items.length === 0) return;

    async function loadTitle() {
      try {
        const names = state.items.map((item) => item.scrText.name);
        const result = await (
          papi.commands.sendCommand as (command: string, ...args: unknown[]) => Promise<unknown>
        )('platformScripture.generateTitle', names, scrRef);
        if (result && typeof result === 'string') {
          dispatch({ type: 'SET_WINDOW_TITLE', title: result });
        }
      } catch {
        // Fall back to local title generation
        const names = state.items.map((item) => item.scrText.name).join(', ');
        const ref = scrRef
          ? `${scrRef.book || '?'} ${scrRef.chapterNum || '?'}:${scrRef.verseNum || '?'}`
          : '';
        dispatch({
          type: 'SET_WINDOW_TITLE',
          title: `${names}: (Text Collection${ref ? ` (${ref})` : ''})`,
        });
      }
    }

    loadTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrRef?.book, scrRef?.chapterNum, scrRef?.verseNum, state.items.length]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ctrl+E: Toggle two panes
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_SINGLE_PANE' });
      }
      // F7: Toggle footnotes
      if (e.key === 'F7' && state.singleShown) {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_FOOTNOTES' });
      }
      // Ctrl+Plus / Ctrl+=: Zoom in
      if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        if (state.singleResourceHasFocus) {
          dispatch({ type: 'ZOOM_IN_SINGLE' });
        } else {
          dispatch({ type: 'ZOOM_IN_MULTI' });
        }
      }
      // Ctrl+Minus: Zoom out
      if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        if (state.singleResourceHasFocus) {
          dispatch({ type: 'ZOOM_OUT_SINGLE' });
        } else {
          dispatch({ type: 'ZOOM_OUT_MULTI' });
        }
      }
      // Ctrl+0: Reset zoom
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        if (state.singleResourceHasFocus) {
          dispatch({ type: 'ZOOM_RESET_SINGLE' });
        } else {
          dispatch({ type: 'ZOOM_RESET_MULTI' });
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.singleShown, state.singleResourceHasFocus]);

  // Handle abbreviation link click
  const handleAbbreviationClick = useCallback((index: number) => {
    dispatch({ type: 'SET_CUR_ITEM', index });
  }, []);

  // Handle context menu actions
  const handleContextMenuAction = useCallback((action: string, index: number) => {
    switch (action) {
      case 'close':
        dispatch({ type: 'REMOVE_ITEM', index });
        break;
      case 'zoomIn':
        dispatch({ type: 'ZOOM_IN_TEXT', index });
        break;
      case 'zoomOut':
        dispatch({ type: 'ZOOM_OUT_TEXT', index });
        break;
      case 'zoomActual':
        dispatch({ type: 'ZOOM_ACTUAL_TEXT', index });
        break;
      case 'moveUp':
        dispatch({ type: 'MOVE_ITEM_UP', index });
        break;
      case 'moveDown':
        dispatch({ type: 'MOVE_ITEM_DOWN', index });
        break;
      default:
        break;
    }
  }, []);

  // Handle splitter proportion change
  const handleProportionChange = useCallback((proportion: number) => {
    dispatch({ type: 'SET_SPLITTER_PROPORTION', proportion });
  }, []);

  // Context menu labels
  const contextMenuLabels = useMemo(
    () => ({
      close: getString('%textCollection_close%'),
      zoomIn: getString('%textCollection_zoomIn%'),
      zoomOut: getString('%textCollection_zoomOut%'),
      zoomActual: getString('%textCollection_zoomActual%'),
      moveUp: getString('%textCollection_moveUp%'),
      moveDown: getString('%textCollection_moveDown%'),
    }),
    [getString],
  );

  // Current selected item info for single pane
  const currentItem = state.items[state.curItem] || null;

  // Missing project ribbon
  const showMissingRibbon = state.missingProjects.length > 0 || state.missingResources.length > 0;

  // Multi-pane content
  const multiPaneContent = (
    <MultiPaneRenderer
      html={state.multiPaneHtml}
      css={state.multiPaneCss}
      items={state.items}
      multiPaneZoom={state.multiPaneZoom}
      onAbbreviationClick={handleAbbreviationClick}
      onContextMenuAction={handleContextMenuAction}
      onFocus={() => dispatch({ type: 'SET_FOCUS', singleHasFocus: false })}
      contextMenuLabels={contextMenuLabels}
    />
  );

  // Single-pane content (placeholder for now - will integrate platform-scripture-editor later)
  const singlePaneContent = (
    <div
      className="single-pane-container"
      data-testid="single-pane"
      style={{
        height: '100%',
        overflow: 'auto',
        padding: '8px',
        fontSize: `${state.singlePaneZoom * 100}%`,
      }}
      onClick={() => dispatch({ type: 'SET_FOCUS', singleHasFocus: true })}
      onFocus={() => dispatch({ type: 'SET_FOCUS', singleHasFocus: true })}
      tabIndex={-1}
      role="region"
      aria-label="Single text detail view"
    >
      {currentItem ? (
        <div>
          <h3
            style={{
              fontFamily: currentItem.scrText.fontName || 'inherit',
              direction: currentItem.scrText.isRTL ? 'rtl' : 'ltr',
            }}
          >
            {currentItem.scrText.fullName || currentItem.scrText.name}
          </h3>
          <p style={{ color: 'var(--pt-color-text-muted, #666)' }}>
            {getString('%textCollection_viewPreview%')}: {state.viewName}
          </p>
          <p style={{ color: 'var(--pt-color-text-muted, #666)' }}>
            {scrRef
              ? `${scrRef.book || '?'} ${scrRef.chapterNum || '?'}:${scrRef.verseNum || '?'}`
              : ''}
          </p>
        </div>
      ) : (
        <p
          style={{
            color: 'var(--pt-color-text-muted, #666)',
            textAlign: 'center',
            marginTop: '48px',
          }}
        >
          {getString('%textCollection_singlePanePlaceholder%')}
        </p>
      )}
    </div>
  );

  // Loading state (check before empty state - setupComplete gates the transition)
  if (!state.setupComplete && state.items.length === 0) {
    return (
      <div
        data-testid="text-collection-view"
        className="text-collection-view tw-flex tw-flex-col tw-h-full"
        role="region"
        aria-label={getString('%webView_textCollection_title%')}
      >
        <div className="tw-flex tw-items-center tw-justify-center tw-flex-1">
          <Spinner />
        </div>
      </div>
    );
  }

  // Empty state when setup is complete but no texts are loaded
  if (state.items.length === 0 && state.setupComplete) {
    return (
      <div
        data-testid="text-collection-view"
        className="text-collection-view tw-flex tw-flex-col tw-h-full"
        role="region"
        aria-label={getString('%webView_textCollection_title%')}
      >
        <div className="tw-flex tw-items-center tw-justify-center tw-flex-1">
          <p className="tw-text-muted-foreground">{getString('%textCollection_noTextsLoaded%')}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="text-collection-view"
      className="text-collection-view tw-flex tw-flex-col tw-h-full"
      role="region"
      aria-label={getString('%webView_textCollection_title%')}
    >
      {/* Missing project ribbon */}
      {showMissingRibbon && (
        <div
          className="missing-project-ribbon tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-yellow-100 tw-border-b tw-border-yellow-300"
          role="alert"
        >
          <span className="tw-flex-1">
            {getString('%textCollection_missingProjects%')}:{' '}
            {[...state.missingProjects, ...state.missingResources].map((p) => p.name).join(', ')}
          </span>
          {state.missingProjects.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title={getString('%textCollection_sendReceive%')}
            >
              {getString('%textCollection_sendReceive%')}
            </Button>
          )}
          {state.missingResources.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title={getString('%textCollection_installResources%')}
            >
              {getString('%textCollection_installResources%')}
            </Button>
          )}
        </div>
      )}

      {/* Toolbar / view controls */}
      <div className="text-collection-toolbar tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-border-b tw-text-sm">
        <label className="tw-flex tw-items-center tw-gap-1 tw-cursor-pointer">
          <input
            type="checkbox"
            checked={state.singleShown}
            onChange={() => dispatch({ type: 'TOGGLE_SINGLE_PANE' })}
          />
          <span>{getString('%textCollection_twoPanes%')}</span>
        </label>
        <span className="tw-text-muted-foreground">|</span>
        <span className="tw-text-muted-foreground">
          {getString('%textCollection_viewPreview%')}:
        </span>
        {(['Preview', 'Unformatted', 'Standard'] as ViewMode[]).map((mode) => (
          <label key={mode} className="tw-flex tw-items-center tw-gap-1 tw-cursor-pointer">
            <input
              type="radio"
              name="viewMode"
              value={mode}
              checked={state.viewName === mode}
              onChange={() => dispatch({ type: 'SET_VIEW_MODE', viewName: mode })}
            />
            <span>{getString(`%textCollection_view${mode}%` as LocalizeKey)}</span>
          </label>
        ))}
        {state.singleShown && (
          <>
            <span className="tw-text-muted-foreground">|</span>
            <label className="tw-flex tw-items-center tw-gap-1 tw-cursor-pointer">
              <input
                type="checkbox"
                checked={state.singleFootnoteShown}
                onChange={() => dispatch({ type: 'TOGGLE_FOOTNOTES' })}
              />
              <span>{getString('%textCollection_showFootnotes%')}</span>
            </label>
          </>
        )}
        <span className="tw-flex-1" />
        <span className="tw-text-xs tw-text-muted-foreground">{state.windowTitle}</span>
      </div>

      {/* Main content area */}
      <div className="text-collection-content tw-flex-1 tw-overflow-hidden">
        <SplitterPanel
          leftContent={multiPaneContent}
          rightContent={singlePaneContent}
          proportion={state.splitterProportion}
          onProportionChange={handleProportionChange}
          rightVisible={state.singleShown}
        />
      </div>
    </div>
  );
};
