import type {
  ParallelPassagesAction,
  ParallelPassagesMemento,
  ParallelPassagesToolState,
} from '../types/parallel-passages';

/** Sensible defaults for a new memento (first-time open). */
export const DEFAULT_MEMENTO: ParallelPassagesMemento = {
  comparativeTextIds: [],
  sourceDisplayMode: 0,
  passageFilter: 'All',
  typeFilter: 'All',
  viewType: 'Dynamic',
  collapsedResources: [],
  zoomUpperPane: 100,
  zoomLowerPane: 100,
  splitterRatio: 0.4,
  currentReference: '',
  scrollGroup: '',
};

/** Initial tool state used when the web view first mounts. */
export const INITIAL_STATE: ParallelPassagesToolState = {
  projectId: '',
  projectName: '',
  isResourceProject: false,
  hasPassagesPermission: true,
  isAdmin: false,
  sourceLanguageAvailable: false,
  memento: { ...DEFAULT_MEMENTO },
  filteredPassages: [],
  filteredCount: 0,
  selectedIndex: 0,
  selectedPassageDetail: null,
  activeWarning: null,
  statusText: '',
  isLoadingList: false,
  isLoadingDetail: false,
};

/**
 * Central reducer for the Parallel Passages Tool.
 *
 * Pure state actions update state directly. Side-effect actions (dialogs, navigation, approval
 * toggles) return state unchanged -- side effects are handled in the web view via useEffect or
 * event handlers that dispatch follow-up actions.
 */
export function parallelPassagesReducer(
  state: ParallelPassagesToolState,
  action: ParallelPassagesAction,
): ParallelPassagesToolState {
  switch (action.type) {
    // --- Pure state updates ---

    case 'SELECT_PASSAGE':
      return { ...state, selectedIndex: action.index };

    case 'SET_PASSAGE_FILTER':
      return {
        ...state,
        memento: { ...state.memento, passageFilter: action.filter },
        isLoadingList: true,
      };

    case 'SET_TYPE_FILTER':
      return {
        ...state,
        memento: { ...state.memento, typeFilter: action.filter },
        isLoadingList: true,
      };

    case 'SET_LOCATION_FILTER':
      // Location filter is not persisted in memento per spec; triggers list reload
      return { ...state, isLoadingList: true };

    case 'SET_VIEW_TYPE':
      return {
        ...state,
        memento: { ...state.memento, viewType: action.viewType },
      };

    case 'SET_SOURCE_DISPLAY_MODE':
      return {
        ...state,
        memento: { ...state.memento, sourceDisplayMode: action.mode },
      };

    case 'TOGGLE_COLLAPSE': {
      const { collapsedResources } = state.memento;
      const idx = collapsedResources.indexOf(action.resourceId);
      const updated =
        idx >= 0
          ? collapsedResources.filter((id) => id !== action.resourceId)
          : [...collapsedResources, action.resourceId];
      return {
        ...state,
        memento: { ...state.memento, collapsedResources: updated },
      };
    }

    case 'SET_ZOOM':
      if (action.pane === 'upper') {
        return {
          ...state,
          memento: { ...state.memento, zoomUpperPane: action.level },
        };
      }
      return {
        ...state,
        memento: { ...state.memento, zoomLowerPane: action.level },
      };

    case 'SET_LOADING_LIST':
      return { ...state, isLoadingList: action.isLoading };

    case 'SET_LOADING_DETAIL':
      return { ...state, isLoadingDetail: action.isLoading };

    case 'SET_PASSAGE_LIST':
      return {
        ...state,
        filteredPassages: action.passages,
        filteredCount: action.filteredCount,
        isLoadingList: false,
      };

    case 'SET_PASSAGE_DETAIL':
      return {
        ...state,
        selectedPassageDetail: action.detail,
        isLoadingDetail: false,
      };

    case 'SET_WARNING':
      return { ...state, activeWarning: action.warning };

    case 'SET_STATUS_TEXT':
      return { ...state, statusText: action.text };

    case 'RESTORE_MEMENTO':
      return { ...state, memento: action.memento };

    // --- Side-effect actions (state unchanged; handled externally) ---

    case 'TOGGLE_ROW_APPROVAL':
    case 'TOGGLE_COLUMN_APPROVAL':
    case 'OPEN_EDIT_DIALOG':
    case 'OPEN_DIFF_DIALOG':
    case 'GOTO_REFERENCE':
    case 'OPEN_BOOK_CHOOSER':
    case 'OPEN_TEXT_SELECTION':
    case 'ADD_BOOK_TO_SCOPE':
    case 'ADD_BOOK_TO_SELECTED':
      return state;

    default:
      return state;
  }
}
