import { describe, it, expect } from 'vitest';
import {
  undoRedoReducer,
  StatusChangeRecord,
  UndoRedoState,
} from './matched-pairs-inventory.utils';

const emptyState: UndoRedoState = { undoStack: [], redoStack: [] };

const makeChange = (key: string): StatusChangeRecord => ({
  itemKey: key,
  previousApproved: [],
  previousUnapproved: [],
  newApproved: [key],
  newUnapproved: [],
});

describe('undoRedoReducer', () => {
  it('should start with empty stacks', () => {
    expect(emptyState.undoStack).toHaveLength(0);
    expect(emptyState.redoStack).toHaveLength(0);
  });

  it('should push a change onto the undo stack', () => {
    const change = makeChange('(/');
    const next = undoRedoReducer(emptyState, { type: 'PUSH_CHANGE', change });

    expect(next.undoStack).toHaveLength(1);
    expect(next.undoStack[0].itemKey).toBe('(/');
    expect(next.redoStack).toHaveLength(0);
  });

  it('should clear redo stack when pushing a new change', () => {
    const change1 = makeChange('(/');
    const change2 = makeChange('[/]');
    let state = undoRedoReducer(emptyState, { type: 'PUSH_CHANGE', change: change1 });
    state = undoRedoReducer(state, { type: 'UNDO' });

    expect(state.redoStack).toHaveLength(1);

    state = undoRedoReducer(state, { type: 'PUSH_CHANGE', change: change2 });
    expect(state.redoStack).toHaveLength(0);
    expect(state.undoStack).toHaveLength(1);
    expect(state.undoStack[0].itemKey).toBe('[/]');
  });

  it('should move last change to redo stack on undo', () => {
    const change = makeChange('(/');
    let state = undoRedoReducer(emptyState, { type: 'PUSH_CHANGE', change });
    state = undoRedoReducer(state, { type: 'UNDO' });

    expect(state.undoStack).toHaveLength(0);
    expect(state.redoStack).toHaveLength(1);
    expect(state.redoStack[0].itemKey).toBe('(/');
  });

  it('should be a no-op when undoing with empty stack', () => {
    const state = undoRedoReducer(emptyState, { type: 'UNDO' });
    expect(state).toBe(emptyState);
  });

  it('should move last redo item back to undo stack on redo', () => {
    const change = makeChange('(/');
    let state = undoRedoReducer(emptyState, { type: 'PUSH_CHANGE', change });
    state = undoRedoReducer(state, { type: 'UNDO' });
    state = undoRedoReducer(state, { type: 'REDO' });

    expect(state.undoStack).toHaveLength(1);
    expect(state.undoStack[0].itemKey).toBe('(/');
    expect(state.redoStack).toHaveLength(0);
  });

  it('should be a no-op when redoing with empty stack', () => {
    const state = undoRedoReducer(emptyState, { type: 'REDO' });
    expect(state).toBe(emptyState);
  });

  it('should handle multiple undo/redo cycles', () => {
    const c1 = makeChange('(/');
    const c2 = makeChange('[/]');
    let state = undoRedoReducer(emptyState, { type: 'PUSH_CHANGE', change: c1 });
    state = undoRedoReducer(state, { type: 'PUSH_CHANGE', change: c2 });

    expect(state.undoStack).toHaveLength(2);

    state = undoRedoReducer(state, { type: 'UNDO' });
    expect(state.undoStack).toHaveLength(1);
    expect(state.redoStack).toHaveLength(1);

    state = undoRedoReducer(state, { type: 'UNDO' });
    expect(state.undoStack).toHaveLength(0);
    expect(state.redoStack).toHaveLength(2);

    state = undoRedoReducer(state, { type: 'REDO' });
    expect(state.undoStack).toHaveLength(1);
    expect(state.redoStack).toHaveLength(1);
  });

  it('should clear both stacks on CLEAR', () => {
    const c1 = makeChange('(/');
    let state = undoRedoReducer(emptyState, { type: 'PUSH_CHANGE', change: c1 });
    state = undoRedoReducer(state, { type: 'CLEAR' });

    expect(state.undoStack).toHaveLength(0);
    expect(state.redoStack).toHaveLength(0);
  });

  it('should preserve previous/new approved arrays correctly', () => {
    const change: StatusChangeRecord = {
      itemKey: '(/',
      previousApproved: ['a', 'b'],
      previousUnapproved: ['c'],
      newApproved: ['a', 'b', '(/'],
      newUnapproved: ['c'],
    };
    let state = undoRedoReducer(emptyState, { type: 'PUSH_CHANGE', change });
    state = undoRedoReducer(state, { type: 'UNDO' });

    expect(state.redoStack[0].previousApproved).toEqual(['a', 'b']);
    expect(state.redoStack[0].newApproved).toEqual(['a', 'b', '(/']);
  });
});
