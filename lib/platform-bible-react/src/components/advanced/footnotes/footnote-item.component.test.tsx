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

// A note's category rides in the file as a `\cat` run directly after the caller
// (`\f + \cat People\cat*\fr 1.1 …`), which the USJ parser folds onto the note as `category` — so
// unlike every other part of a footnote it is NOT in `content` and has to be rendered from the
// note's own field. Without that it is simply absent from the pane, which reads as data the editor
// accepted and then lost.
const footnoteWithCategory: MarkerObject = {
  type: 'note',
  marker: 'f',
  caller: '+',
  category: 'People',
  content: [
    { type: 'char', marker: 'fr', content: ['1.1'] },
    { type: 'char', marker: 'ft', content: ['A note'] },
  ],
};

test('shows a footnote category, with its markers, in the same position the file puts it', () => {
  render(<FootnoteItem footnote={footnoteWithCategory} />);

  expect(screen.getByText('People')).toBeInTheDocument();
  expect(screen.getByText('\\cat')).toBeInTheDocument();
  expect(screen.getByText('\\cat*')).toBeInTheDocument();
});

test('shows the category value with markers suppressed, but not its markers', () => {
  render(<FootnoteItem footnote={footnoteWithCategory} showMarkers={false} />);

  // The value is the note's data and stays visible; the `\cat` glyphs are marker display, and
  // follow the same switch every other marker in this component does.
  expect(screen.getByText('People')).toBeInTheDocument();
  expect(screen.queryByText('\\cat')).not.toBeInTheDocument();
  expect(screen.queryByText('\\cat*')).not.toBeInTheDocument();
});

test('renders nothing extra for a footnote with no category', () => {
  const { container } = render(<FootnoteItem footnote={footnoteWithTwinSpans} />);

  expect(container.querySelector('.note-category')).toBeNull();
});

function headerOf(container: HTMLElement): Element {
  const header = container.querySelector('.textual-note-header');
  if (!header) throw new Error('The footnote item rendered no header');
  return header;
}

/**
 * Reads a note header the way layout draws it rather than the way `textContent` concatenates it.
 * CSS removes a collapsible space at the end of an inline-block's last line, so a separator space
 * parked inside the caller or category box is present in the DOM and yet invisible on screen — the
 * pane runs the two together (`+People`). Trimming each box's own trailing space here is what makes
 * that difference visible to a test.
 */
function renderedHeaderText(header: Element): string {
  return Array.from(header.childNodes)
    .map((node) => {
      const text = node.textContent ?? '';
      return node instanceof Element && node.classList.contains('tw:inline-block')
        ? text.replace(/\s+$/, '')
        : text;
    })
    .join('');
}

test('separates the caller from the category when markers are hidden', () => {
  const { container } = render(
    <FootnoteItem footnote={footnoteWithCategory} showMarkers={false} />,
  );

  expect(renderedHeaderText(headerOf(container))).toBe('+ People');
});

test('separates the caller from the category when markers are shown', () => {
  const { container } = render(<FootnoteItem footnote={footnoteWithCategory} />);

  expect(renderedHeaderText(headerOf(container))).toBe('\\f + \\cat People\\cat*');
});

test('sets the opening marker off from the caller with a header-sized space', () => {
  // The `\f` glyph is drawn at 0.7em (`.marker-visible .marker`), so a space kept inside that span
  // is drawn at 0.7em too and reads as `\f+`. The separator belongs outside the glyph, where it
  // takes the header's own size.
  const { container } = render(<FootnoteItem footnote={footnoteWithCategory} />);
  const openingMarker = headerOf(container).querySelector('.marker');

  expect(openingMarker?.textContent).toBe('\\f');
  expect(openingMarker?.nextSibling?.textContent).toBe(' ');
});
