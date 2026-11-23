import { describe, expect, it } from 'vitest';
import { isCommentDraftEmpty, localizeOrFallback } from './index';

describe('index public exports', () => {
  it('exports localizeOrFallback so extension consumers can resolve a localize key that has not resolved yet', () => {
    expect(localizeOrFallback('%some_key%', { '%some_key%': '%some_key%' }, 'fallback')).toBe(
      'fallback',
    );
  });

  it('exports isCommentDraftEmpty so a consumer holding drafts outside CommentThread uses the same emptiness rule', () => {
    expect(isCommentDraftEmpty({})).toBe(true);
    expect(isCommentDraftEmpty({ assignedUser: 'Alice' })).toBe(false);
  });
});
