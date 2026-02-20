/**
 * Unit tests for TextCollectionWebView (UI-PKG-003)
 *
 * Tests the reducer logic and state management for the text collection main view. Renderer tests
 * are handled separately via Playwright and CDP visual verification.
 */

// #region Types (mirrored from web view for testing)

type ViewMode = 'Preview' | 'Unformatted' | 'Standard';
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

// #region Reducer (copied for unit testing)

function tcReducer(state: TCState, action: TCAction): TCState {
  switch (action.type) {
    case 'SET_CUR_ITEM':
      return { ...state, curItem: action.index, singleShown: true };

    case 'TOGGLE_SINGLE_PANE':
      return { ...state, singleShown: !state.singleShown };

    case 'TOGGLE_FOOTNOTES':
      if (!state.singleShown) return state;
      return { ...state, singleFootnoteShown: !state.singleFootnoteShown };

    case 'SET_VIEW_MODE':
      return { ...state, viewName: action.mode };

    case 'SET_SPLITTER_PROPORTION':
      return { ...state, splitterProportion: action.proportion };

    case 'SET_FOCUSED_PANE':
      return { ...state, focusedPane: action.pane };

    case 'ZOOM_IN':
      if (state.focusedPane === 'single') {
        return { ...state, singlePaneZoom: state.singlePaneZoom * 1.1 };
      }
      return { ...state, multiPaneZoom: state.multiPaneZoom * 1.1 };

    case 'ZOOM_OUT':
      if (state.focusedPane === 'single') {
        return { ...state, singlePaneZoom: state.singlePaneZoom / 1.1 };
      }
      return { ...state, multiPaneZoom: state.multiPaneZoom / 1.1 };

    case 'ZOOM_RESET':
      if (state.focusedPane === 'single') {
        return { ...state, singlePaneZoom: 1.0 };
      }
      return {
        ...state,
        multiPaneZoom: 1.0,
        items: state.items.map((item) => ({ ...item, zoom: 1.0 })),
      };

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
      newItems[action.index] = { ...newItems[action.index], zoom: 1.0 };
      return { ...state, items: newItems };
    }

    case 'CONTEXT_MOVE_UP': {
      if (action.index <= 0) return state;
      const newItems = [...state.items];
      [newItems[action.index - 1], newItems[action.index]] = [
        newItems[action.index],
        newItems[action.index - 1],
      ];
      const newCurItem =
        state.curItem === action.index
          ? action.index - 1
          : state.curItem === action.index - 1
            ? action.index
            : state.curItem;
      return { ...state, items: newItems, curItem: newCurItem };
    }

    case 'CONTEXT_MOVE_DOWN': {
      if (action.index >= state.items.length - 1) return state;
      const newItems = [...state.items];
      [newItems[action.index], newItems[action.index + 1]] = [
        newItems[action.index + 1],
        newItems[action.index],
      ];
      const newCurItem =
        state.curItem === action.index
          ? action.index + 1
          : state.curItem === action.index + 1
            ? action.index
            : state.curItem;
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
      return { ...state, items: newItems, curItem: Math.max(0, newCurItem) };
    }

    case 'TOGGLE_HIGHLIGHT_TERMS':
      return { ...state, highlightBiblicalTerms: !state.highlightBiblicalTerms };

    case 'TOGGLE_HIGHLIGHT_GUESSED':
      return { ...state, highlightGuessedRenderings: !state.highlightGuessedRenderings };

    case 'RESTORE_STATE':
      return { ...state, ...action.state, setupComplete: true };

    default:
      return state;
  }
}

// #endregion

// #region Test Fixtures

function createTestItem(overrides: Partial<TextCollectionItem> = {}): TextCollectionItem {
  return {
    name: 'TEST',
    id: 'test-001',
    fullName: 'Test Project',
    language: 'English',
    languageId: 'en',
    fontName: 'Charis SIL',
    baseFontSize: 12,
    isRTL: false,
    zoom: 1.0,
    verseText: 'Test verse text.',
    ...overrides,
  };
}

function createTestState(overrides: Partial<TCState> = {}): TCState {
  return {
    items: [
      createTestItem({ name: 'AAA', id: 'id-1' }),
      createTestItem({ name: 'BBB', id: 'id-2' }),
      createTestItem({ name: 'CCC', id: 'id-3' }),
    ],
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
    ...overrides,
  };
}

// #endregion

// #region Tests

describe('TextCollectionWebView reducer', () => {
  describe('SET_CUR_ITEM', () => {
    it('should set current item and show single pane', () => {
      const state = createTestState({ singleShown: false, curItem: 0 });
      const result = tcReducer(state, { type: 'SET_CUR_ITEM', index: 2 });
      expect(result.curItem).toBe(2);
      expect(result.singleShown).toBe(true);
    });
  });

  describe('TOGGLE_SINGLE_PANE', () => {
    it('should toggle single pane visibility', () => {
      const state = createTestState({ singleShown: true });
      const result = tcReducer(state, { type: 'TOGGLE_SINGLE_PANE' });
      expect(result.singleShown).toBe(false);

      const result2 = tcReducer(result, { type: 'TOGGLE_SINGLE_PANE' });
      expect(result2.singleShown).toBe(true);
    });
  });

  describe('TOGGLE_FOOTNOTES', () => {
    it('should toggle footnotes when single pane is shown', () => {
      const state = createTestState({ singleShown: true, singleFootnoteShown: false });
      const result = tcReducer(state, { type: 'TOGGLE_FOOTNOTES' });
      expect(result.singleFootnoteShown).toBe(true);
    });

    it('should not toggle footnotes when single pane is hidden', () => {
      const state = createTestState({ singleShown: false, singleFootnoteShown: false });
      const result = tcReducer(state, { type: 'TOGGLE_FOOTNOTES' });
      expect(result.singleFootnoteShown).toBe(false);
    });
  });

  describe('SET_VIEW_MODE', () => {
    it('should set view mode', () => {
      const state = createTestState({ viewName: 'Preview' });
      const result = tcReducer(state, { type: 'SET_VIEW_MODE', mode: 'Standard' });
      expect(result.viewName).toBe('Standard');
    });
  });

  describe('Zoom actions', () => {
    it('ZOOM_IN should zoom multi-pane when focused', () => {
      const state = createTestState({ focusedPane: 'multi', multiPaneZoom: 1.0 });
      const result = tcReducer(state, { type: 'ZOOM_IN' });
      expect(result.multiPaneZoom).toBeCloseTo(1.1);
    });

    it('ZOOM_IN should zoom single-pane when focused', () => {
      const state = createTestState({ focusedPane: 'single', singlePaneZoom: 1.0 });
      const result = tcReducer(state, { type: 'ZOOM_IN' });
      expect(result.singlePaneZoom).toBeCloseTo(1.1);
    });

    it('ZOOM_OUT should zoom out multi-pane when focused', () => {
      const state = createTestState({ focusedPane: 'multi', multiPaneZoom: 1.1 });
      const result = tcReducer(state, { type: 'ZOOM_OUT' });
      expect(result.multiPaneZoom).toBeCloseTo(1.0, 1);
    });

    it('ZOOM_RESET should reset single pane zoom when focused', () => {
      const state = createTestState({ focusedPane: 'single', singlePaneZoom: 2.0 });
      const result = tcReducer(state, { type: 'ZOOM_RESET' });
      expect(result.singlePaneZoom).toBe(1.0);
    });

    it('ZOOM_RESET should reset ALL per-text zooms and multi zoom when multi focused', () => {
      const items = [
        createTestItem({ name: 'A', id: '1', zoom: 1.5 }),
        createTestItem({ name: 'B', id: '2', zoom: 2.0 }),
      ];
      const state = createTestState({
        items,
        focusedPane: 'multi',
        multiPaneZoom: 1.5,
      });
      const result = tcReducer(state, { type: 'ZOOM_RESET' });
      expect(result.multiPaneZoom).toBe(1.0);
      expect(result.items[0].zoom).toBe(1.0);
      expect(result.items[1].zoom).toBe(1.0);
    });
  });

  describe('Context menu zoom actions', () => {
    it('CONTEXT_ZOOM_IN should multiply per-text zoom by 1.1', () => {
      const state = createTestState();
      const result = tcReducer(state, { type: 'CONTEXT_ZOOM_IN', index: 0 });
      expect(result.items[0].zoom).toBeCloseTo(1.1);
      expect(result.items[1].zoom).toBe(1.0);
    });

    it('CONTEXT_ZOOM_OUT should divide per-text zoom by 1.1', () => {
      const state = createTestState();
      state.items[0].zoom = 1.1;
      const result = tcReducer(state, { type: 'CONTEXT_ZOOM_OUT', index: 0 });
      expect(result.items[0].zoom).toBeCloseTo(1.0, 1);
    });

    it('CONTEXT_ZOOM_ACTUAL should reset per-text zoom to 1.0', () => {
      const state = createTestState();
      state.items[1].zoom = 2.5;
      const result = tcReducer(state, { type: 'CONTEXT_ZOOM_ACTUAL', index: 1 });
      expect(result.items[1].zoom).toBe(1.0);
    });
  });

  describe('Context menu move actions', () => {
    it('CONTEXT_MOVE_UP should swap items and update curItem', () => {
      const state = createTestState({ curItem: 1 });
      const result = tcReducer(state, { type: 'CONTEXT_MOVE_UP', index: 1 });
      expect(result.items[0].name).toBe('BBB');
      expect(result.items[1].name).toBe('AAA');
      expect(result.curItem).toBe(0);
    });

    it('CONTEXT_MOVE_UP should not move first item', () => {
      const state = createTestState();
      const result = tcReducer(state, { type: 'CONTEXT_MOVE_UP', index: 0 });
      expect(result.items[0].name).toBe('AAA');
    });

    it('CONTEXT_MOVE_DOWN should swap items', () => {
      const state = createTestState({ curItem: 0 });
      const result = tcReducer(state, { type: 'CONTEXT_MOVE_DOWN', index: 0 });
      expect(result.items[0].name).toBe('BBB');
      expect(result.items[1].name).toBe('AAA');
      expect(result.curItem).toBe(1);
    });

    it('CONTEXT_MOVE_DOWN should not move last item', () => {
      const state = createTestState();
      const result = tcReducer(state, { type: 'CONTEXT_MOVE_DOWN', index: 2 });
      expect(result.items[2].name).toBe('CCC');
    });
  });

  describe('CONTEXT_CLOSE', () => {
    it('should remove item and adjust curItem when removing before current', () => {
      const state = createTestState({ curItem: 2 });
      const result = tcReducer(state, { type: 'CONTEXT_CLOSE', index: 0 });
      expect(result.items.length).toBe(2);
      expect(result.curItem).toBe(1);
    });

    it('should remove current item and adjust curItem to last', () => {
      const state = createTestState({ curItem: 2 });
      const result = tcReducer(state, { type: 'CONTEXT_CLOSE', index: 2 });
      expect(result.items.length).toBe(2);
      expect(result.curItem).toBe(1);
    });

    it('should remove item after current without changing curItem', () => {
      const state = createTestState({ curItem: 0 });
      const result = tcReducer(state, { type: 'CONTEXT_CLOSE', index: 1 });
      expect(result.items.length).toBe(2);
      expect(result.curItem).toBe(0);
    });
  });

  describe('SET_SPLITTER_PROPORTION', () => {
    it('should update splitter proportion', () => {
      const state = createTestState();
      const result = tcReducer(state, { type: 'SET_SPLITTER_PROPORTION', proportion: 0.4 });
      expect(result.splitterProportion).toBe(0.4);
    });
  });

  describe('SET_FOCUSED_PANE', () => {
    it('should set focused pane', () => {
      const state = createTestState({ focusedPane: 'multi' });
      const result = tcReducer(state, { type: 'SET_FOCUSED_PANE', pane: 'single' });
      expect(result.focusedPane).toBe('single');
    });
  });

  describe('TOGGLE_HIGHLIGHT_TERMS', () => {
    it('should toggle highlight biblical terms', () => {
      const state = createTestState({ highlightBiblicalTerms: false });
      const result = tcReducer(state, { type: 'TOGGLE_HIGHLIGHT_TERMS' });
      expect(result.highlightBiblicalTerms).toBe(true);
    });
  });

  describe('RESTORE_STATE', () => {
    it('should restore partial state and set setupComplete', () => {
      const state = createTestState({ setupComplete: false, viewName: 'Preview' });
      const result = tcReducer(state, {
        type: 'RESTORE_STATE',
        state: { viewName: 'Standard', singleShown: false },
      });
      expect(result.viewName).toBe('Standard');
      expect(result.singleShown).toBe(false);
      expect(result.setupComplete).toBe(true);
    });
  });
});

// #endregion
