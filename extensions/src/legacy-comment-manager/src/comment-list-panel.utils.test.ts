import { describe, expect, it } from 'vitest';
import { resolveCommentListPanelProjectId } from './comment-list-panel.utils';

describe('resolveCommentListPanelProjectId', () => {
  it('returns the pending sentinel when set, ignoring options and saved', () => {
    expect(resolveCommentListPanelProjectId('pending-id', 'options-id', 'saved-id')).toBe(
      'pending-id',
    );
  });

  it('returns fromOptions when pending is undefined', () => {
    expect(resolveCommentListPanelProjectId(undefined, 'options-id', 'saved-id')).toBe(
      'options-id',
    );
  });

  it('returns fromSaved when pending and fromOptions are both undefined', () => {
    expect(resolveCommentListPanelProjectId(undefined, undefined, 'saved-id')).toBe('saved-id');
  });

  it('returns undefined when all three are undefined', () => {
    expect(resolveCommentListPanelProjectId(undefined, undefined, undefined)).toBeUndefined();
  });
});
