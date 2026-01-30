import {
  DEFAULT_MEMENTO,
  INITIAL_STATE,
  parallelPassagesReducer,
} from '../parallel-passages.utils';
import {
  ParallelPassagesToolState,
  FilteredPassageEntry,
  ParallelPassageDetail,
  RibbonWarning,
  ParallelPassagesMemento,
} from '../../types/parallel-passages';

describe('parallelPassagesReducer', () => {
  let state: ParallelPassagesToolState;

  beforeEach(() => {
    state = { ...INITIAL_STATE, memento: { ...DEFAULT_MEMENTO } };
  });

  it('SELECT_PASSAGE updates selectedIndex', () => {
    const result = parallelPassagesReducer(state, { type: 'SELECT_PASSAGE', index: 5 });
    expect(result.selectedIndex).toBe(5);
  });

  it('SET_PASSAGE_FILTER updates memento and sets loading', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_PASSAGE_FILTER',
      filter: 'Unchecked',
    });
    expect(result.memento.passageFilter).toBe('Unchecked');
    expect(result.isLoadingList).toBe(true);
  });

  it('SET_TYPE_FILTER updates memento and sets loading', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_TYPE_FILTER',
      filter: 'Gospels',
    });
    expect(result.memento.typeFilter).toBe('Gospels');
    expect(result.isLoadingList).toBe(true);
  });

  it('SET_VIEW_TYPE updates memento viewType', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_VIEW_TYPE',
      viewType: 'ColumnView',
    });
    expect(result.memento.viewType).toBe('ColumnView');
  });

  it('SET_SOURCE_DISPLAY_MODE updates memento', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_SOURCE_DISPLAY_MODE',
      mode: 2,
    });
    expect(result.memento.sourceDisplayMode).toBe(2);
  });

  it('TOGGLE_COLLAPSE adds resourceId when not present', () => {
    const result = parallelPassagesReducer(state, {
      type: 'TOGGLE_COLLAPSE',
      resourceId: 'proj1',
    });
    expect(result.memento.collapsedResources).toContain('proj1');
  });

  it('TOGGLE_COLLAPSE removes resourceId when already present', () => {
    state.memento.collapsedResources = ['proj1', 'proj2'];
    const result = parallelPassagesReducer(state, {
      type: 'TOGGLE_COLLAPSE',
      resourceId: 'proj1',
    });
    expect(result.memento.collapsedResources).toEqual(['proj2']);
  });

  it('SET_ZOOM updates upper pane zoom', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_ZOOM',
      pane: 'upper',
      level: 120,
    });
    expect(result.memento.zoomUpperPane).toBe(120);
  });

  it('SET_ZOOM updates lower pane zoom', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_ZOOM',
      pane: 'lower',
      level: 80,
    });
    expect(result.memento.zoomLowerPane).toBe(80);
  });

  it('SET_PASSAGE_LIST updates passages and clears loading', () => {
    state.isLoadingList = true;
    const passages: FilteredPassageEntry[] = [
      {
        index: 0,
        passageType: 'NTtoNT',
        headVerse: 'MAT 4:1',
        references: [],
        statusAggregation: {
          allIgnored: false,
          allTicked: false,
          anyOutdated: false,
          allChanged: false,
          allUnfinished: true,
        },
      },
    ];
    const result = parallelPassagesReducer(state, {
      type: 'SET_PASSAGE_LIST',
      passages,
      filteredCount: 1,
    });
    expect(result.filteredPassages).toHaveLength(1);
    expect(result.filteredCount).toBe(1);
    expect(result.isLoadingList).toBe(false);
  });

  it('SET_PASSAGE_DETAIL updates detail and clears loading', () => {
    state.isLoadingDetail = true;
    const detail: ParallelPassageDetail = {
      passageType: 'NTtoNT',
      headVerse: 'MAT 4:1',
      effectiveViewType: 'RowView',
      statusFlags: {
        allIgnored: false,
        allTicked: false,
        anyOutdated: false,
        allChanged: false,
        allUnfinished: true,
      },
      projectApprovable: true,
      canApproveRow: true,
      rows: [],
    };
    const result = parallelPassagesReducer(state, { type: 'SET_PASSAGE_DETAIL', detail });
    expect(result.selectedPassageDetail).toBe(detail);
    expect(result.isLoadingDetail).toBe(false);
  });

  it('SET_WARNING updates activeWarning', () => {
    const warning: RibbonWarning = {
      type: 'resource-text',
      message: 'This is a resource text',
    };
    const result = parallelPassagesReducer(state, { type: 'SET_WARNING', warning });
    expect(result.activeWarning).toBe(warning);
  });

  it('SET_STATUS_TEXT updates statusText', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_STATUS_TEXT',
      text: 'Project A: All; 42 sets',
    });
    expect(result.statusText).toBe('Project A: All; 42 sets');
  });

  it('RESTORE_MEMENTO replaces entire memento', () => {
    const newMemento: ParallelPassagesMemento = {
      ...DEFAULT_MEMENTO,
      passageFilter: 'ChangedText',
      viewType: 'RowView',
      splitterRatio: 0.6,
    };
    const result = parallelPassagesReducer(state, {
      type: 'RESTORE_MEMENTO',
      memento: newMemento,
    });
    expect(result.memento.passageFilter).toBe('ChangedText');
    expect(result.memento.splitterRatio).toBe(0.6);
  });

  it('SET_LOCATION_FILTER sets loading', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_LOCATION_FILTER',
      filter: { type: 'current-book', bookNum: 40 },
    });
    expect(result.isLoadingList).toBe(true);
  });

  it('SET_LOADING_LIST updates loading flag', () => {
    const result = parallelPassagesReducer(state, {
      type: 'SET_LOADING_LIST',
      isLoading: true,
    });
    expect(result.isLoadingList).toBe(true);
  });

  it('side-effect actions return state unchanged', () => {
    const sideEffectActions = [
      { type: 'TOGGLE_ROW_APPROVAL' as const, passageIndex: 0 },
      { type: 'TOGGLE_COLUMN_APPROVAL' as const, passageIndex: 0, verseRef: 'MAT 4:1' },
      { type: 'OPEN_EDIT_DIALOG' as const, projectId: 'p1', verseRef: 'MAT 4:1' },
      { type: 'OPEN_DIFF_DIALOG' as const, projectId: 'p1', verseRef: 'MAT 4:1' },
      { type: 'GOTO_REFERENCE' as const, verseRef: 'MAT 4:1' },
      { type: 'OPEN_BOOK_CHOOSER' as const },
      { type: 'OPEN_TEXT_SELECTION' as const },
      { type: 'ADD_BOOK_TO_SCOPE' as const, bookNum: 40 },
      { type: 'ADD_BOOK_TO_SELECTED' as const, bookNum: 40 },
    ];

    for (const action of sideEffectActions) {
      const result = parallelPassagesReducer(state, action);
      expect(result).toBe(state);
    }
  });
});

describe('DEFAULT_MEMENTO', () => {
  it('has sensible defaults', () => {
    expect(DEFAULT_MEMENTO.passageFilter).toBe('All');
    expect(DEFAULT_MEMENTO.typeFilter).toBe('All');
    expect(DEFAULT_MEMENTO.viewType).toBe('Dynamic');
    expect(DEFAULT_MEMENTO.sourceDisplayMode).toBe(0);
    expect(DEFAULT_MEMENTO.splitterRatio).toBeGreaterThan(0);
    expect(DEFAULT_MEMENTO.splitterRatio).toBeLessThan(1);
  });
});
