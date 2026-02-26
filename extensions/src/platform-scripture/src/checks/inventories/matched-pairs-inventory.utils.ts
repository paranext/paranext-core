/** Undo/redo state management for status changes (BHV-312) */
export type StatusChangeRecord = {
  itemKey: string;
  previousApproved: string[];
  previousUnapproved: string[];
  newApproved: string[];
  newUnapproved: string[];
};

export type UndoRedoState = {
  undoStack: StatusChangeRecord[];
  redoStack: StatusChangeRecord[];
};

export type UndoRedoAction =
  | { type: 'PUSH_CHANGE'; change: StatusChangeRecord }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'CLEAR' };

export function undoRedoReducer(state: UndoRedoState, action: UndoRedoAction): UndoRedoState {
  switch (action.type) {
    case 'PUSH_CHANGE':
      return {
        undoStack: [...state.undoStack, action.change],
        redoStack: [],
      };
    case 'UNDO': {
      if (state.undoStack.length === 0) return state;
      const lastChange = state.undoStack[state.undoStack.length - 1];
      return {
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [...state.redoStack, lastChange],
      };
    }
    case 'REDO': {
      if (state.redoStack.length === 0) return state;
      const nextChange = state.redoStack[state.redoStack.length - 1];
      return {
        undoStack: [...state.undoStack, nextChange],
        redoStack: state.redoStack.slice(0, -1),
      };
    }
    case 'CLEAR':
      return { undoStack: [], redoStack: [] };
    default:
      return state;
  }
}

/**
 * Validates a pairs string for the Matched Pairs inventory check. Each pair must be two single
 * characters separated by `/`, with pairs separated by whitespace.
 *
 * @param value - The pairs string to validate
 * @returns Validation result with optional error message
 */
export function validatePairsString(value: string): { valid: boolean; error?: string } {
  if (!value.trim()) return { valid: true };

  const pairs = value.trim().split(/\s+/);
  for (const pair of pairs) {
    const parts = pair.split('/');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      return { valid: false, error: `Invalid Pair: ${pair}` };
    }
    // VAL-002: Each half must be exactly one character
    if ([...parts[0]].length > 1 || [...parts[1]].length > 1) {
      return {
        valid: false,
        error:
          'Multiple character punctuation marks are not allowed. Each side of a pair must be a single character.',
      };
    }
  }
  return { valid: true };
}
