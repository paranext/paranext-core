import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { afterEach, expect, test, vi } from 'vitest';
import { FootnoteItem } from './footnote-item.component';

const PARAGRAPH_TEXT = 'Identical paragraph text';
const SPAN_TEXT = 'generations';

// Two `\fp` paragraphs that are indistinguishable by content — nothing about them differs except
// their position in the footnote. A key derived from the content is therefore the same string for
// both, which React reports as a duplicate and answers by duplicating or omitting a child.
const footnoteWithTwinParagraphs: MarkerObject = {
  type: 'note',
  marker: 'f',
  caller: '+',
  content: [
    { type: 'char', marker: 'fr', content: ['1.1'] },
    { type: 'char', marker: 'fp', content: [PARAGRAPH_TEXT] },
    { type: 'char', marker: 'fp', content: [PARAGRAPH_TEXT] },
  ],
};

// The same collision one level down: two sibling spans inside a single paragraph that share both
// their marker and their leading text.
const footnoteWithTwinSpans: MarkerObject = {
  type: 'note',
  marker: 'f',
  caller: '+',
  content: [
    { type: 'char', marker: 'fr', content: ['1.2'] },
    { type: 'char', marker: 'fq', content: [SPAN_TEXT] },
    { type: 'char', marker: 'fq', content: [SPAN_TEXT] },
  ],
};

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders both identically worded paragraphs of a footnote, with no React key collision', () => {
  // React reports duplicate keys on console.error, so a collision shows up here even when the
  // rendered output happens to survive it.
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  const { rerender } = render(<FootnoteItem footnote={footnoteWithTwinParagraphs} />);
  // Re-render so the children go through reconciliation, where duplicate keys do their damage,
  // rather than only through the initial mount.
  rerender(<FootnoteItem footnote={footnoteWithTwinParagraphs} />);

  expect(screen.getAllByText(PARAGRAPH_TEXT)).toHaveLength(2);
  expect(consoleError).not.toHaveBeenCalled();
});

test('renders both identically worded sibling spans of a footnote, with no React key collision', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  const { rerender } = render(<FootnoteItem footnote={footnoteWithTwinSpans} />);
  rerender(<FootnoteItem footnote={footnoteWithTwinSpans} />);

  expect(screen.getAllByText(SPAN_TEXT)).toHaveLength(2);
  expect(consoleError).not.toHaveBeenCalled();
});
