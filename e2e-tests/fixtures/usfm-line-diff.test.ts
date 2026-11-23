import { describe, expect, it } from 'vitest';
import { unifiedUsfmDiff } from './usfm-line-diff';

describe('unifiedUsfmDiff', () => {
  it('is empty for identical text', () => {
    expect(unifiedUsfmDiff('\\c 1\n\\p\n', '\\c 1\n\\p\n')).toBe('');
  });

  it('makes a dropped trailing space visible', () => {
    const before = '\\c 1  \n\\p\n\\v 1 In the beginning \n\\v 2 Then \n';
    const after = '\\c 1\n\\p\n\\v 1 In the beginning \n\\v 2 Then \n';
    expect(unifiedUsfmDiff(before, after, 'disk', 'saved')).toBe(
      [
        '--- disk',
        '+++ saved',
        '@@ -1,3 +1,3 @@',
        '-"\\\\c 1  "',
        '+"\\\\c 1"',
        ' "\\\\p"',
        ' "\\\\v 1 In the beginning "',
      ].join('\n'),
    );
  });

  it('shows a line-ending change as a carriage return at the end of the line', () => {
    expect(unifiedUsfmDiff('a\nb\n', 'a\r\nb\n')).toContain('-"a"\n+"a\\r"');
  });

  it('splits distant changes into separate hunks with their own line numbers', () => {
    const lines = Array.from({ length: 20 }, (_, index) => `line ${index + 1}`);
    const changed = [...lines];
    changed[1] = 'LINE 2';
    changed[17] = 'LINE 18';
    const diff = unifiedUsfmDiff(lines.join('\n'), changed.join('\n'));
    expect(diff.match(/^@@ .* @@$/gm)).toEqual(['@@ -1,4 +1,4 @@', '@@ -16,5 +16,5 @@']);
  });

  it('reports inserted and removed lines against the right side', () => {
    const diff = unifiedUsfmDiff('a\nb\nc', 'a\nc\nd');
    expect(diff.split('\n').slice(2)).toEqual(['@@ -1,3 +1,3 @@', ' "a"', '-"b"', ' "c"', '+"d"']);
  });
});
