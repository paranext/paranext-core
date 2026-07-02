import { describe, it, expect } from 'vitest';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { collectUsjMarkers } from './usj-markers.util';

function usj(content: Usj['content']): Usj {
  return { type: 'USJ', version: '3.1', content };
}

describe('collectUsjMarkers', () => {
  it('returns an empty array for undefined or empty USJ', () => {
    expect(collectUsjMarkers(undefined)).toEqual([]);
    expect(collectUsjMarkers(usj([]))).toEqual([]);
  });

  it('collects distinct markers from nested content in first-seen order', () => {
    const doc = usj([
      { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
      {
        type: 'para',
        marker: 'p',
        content: [
          'The name ',
          { type: 'char', marker: 'nd', content: ['LORD'] },
          ' and ',
          { type: 'char', marker: 'pn', content: ['Abram'] },
        ],
      },
      // Duplicate marker 'p' must not be repeated.
      { type: 'para', marker: 'p', content: ['Another paragraph.'] },
    ]);
    expect(collectUsjMarkers(doc)).toEqual(['id', 'p', 'nd', 'pn']);
  });

  it('recurses into notes and other nested markers (e.g. handbook links)', () => {
    const doc = usj([
      {
        type: 'para',
        marker: 'ip',
        content: [
          { type: 'char', marker: 'jmp', content: ['see Genesis 15.6'] },
          { type: 'char', marker: 'xtSee', content: ['Romans 4.3'] },
          {
            type: 'note',
            marker: 'f',
            caller: '+',
            content: [{ type: 'char', marker: 'ft', content: ['a footnote'] }],
          },
        ],
      },
    ]);
    expect(collectUsjMarkers(doc)).toEqual(['ip', 'jmp', 'xtSee', 'f', 'ft']);
  });

  it('omits z-prefixed custom markers (already always valid in the editor)', () => {
    const doc = usj([
      { type: 'para', marker: 'p', content: [{ type: 'char', marker: 'zbadge', content: ['x'] }] },
      { type: 'ms', marker: 'zmilestone' },
    ]);
    expect(collectUsjMarkers(doc)).toEqual(['p']);
  });

  it('ignores marker-less nodes and bare text', () => {
    const doc = usj(['just text', { type: 'unknown' }, { type: 'para', marker: 'q1' }]);
    expect(collectUsjMarkers(doc)).toEqual(['q1']);
  });
});
