import { describe, it, expect } from 'vitest';
import { buildChapterContextOpenedMessage } from './announcements.utils';

describe('buildChapterContextOpenedMessage', () => {
  it('substitutes the resource label into the template', () => {
    expect(
      buildChapterContextOpenedMessage('Chapter view opened for {resourceReference}', 'ESV'),
    ).toBe('Chapter view opened for ESV');
  });

  it('returns an empty string when the template is empty (localized strings not yet loaded)', () => {
    expect(buildChapterContextOpenedMessage('', 'ESV')).toBe('');
  });
});
