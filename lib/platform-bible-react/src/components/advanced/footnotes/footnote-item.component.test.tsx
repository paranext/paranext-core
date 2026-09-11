// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { afterEach, describe, expect, it, test, vi } from 'vitest';
import { FootnoteItem } from '@/components/advanced/footnotes/footnote-item.component';

const PARAGRAPH_TEXT = 'Identical paragraph text';
const SPAN_TEXT = 'generations';

/**
 * Renders a footnote and returns the flat text of its body cell - the same text
 * `getCaretPositionFromClick` walks, and the PT9 equivalent of `span.notetext` plus the trailing
 * end marker.
 */
function renderBodyText(footnote: MarkerObject, showMarkers = true): string {
  const { container } = render(<FootnoteItem footnote={footnote} showMarkers={showMarkers} />);
  return container.querySelector('.textual-note-body')?.textContent ?? '';
}

function headerOf(container: HTMLElement): Element {
  const header = container.querySelector('.textual-note-header');
  if (!header) throw new Error('The footnote item rendered no header');
  return header;
}

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

test('separates the category value from the note text when its markers are hidden', () => {
  const { container } = render(<FootnoteItem footnote={footnoteWithCategory} showMarkers={false} />);

  // With the `\cat*` glyph hidden nothing else stands between the value and the reference that
  // follows it, so the row must supply the space itself: "People 1.1", never "People1.1".
  const body = container.querySelector('.textual-note-body');
  expect(body?.textContent).toContain('People 1.1');
  expect(body?.textContent).not.toContain('People1.1');
});

test('renders nothing extra for a footnote with no category', () => {
  const { container } = render(<FootnoteItem footnote={footnoteWithTwinSpans} />);

  expect(container.querySelector('.note-category')).toBeNull();
});

test('keeps the category out of the header, at the head of the note text', () => {
  // The header floats only the note's own marker and caller (PT9's `div.leadingFloat`); everything
  // the file writes after the caller — the category included — is note text.
  const { container } = render(<FootnoteItem footnote={footnoteWithCategory} />);

  expect(headerOf(container).querySelector('.note-category')).toBeNull();
  expect(container.querySelector('.textual-note-body')?.textContent).toContain(
    '\\cat\u00a0People\\cat*',
  );
});

test('sets the opening marker off from the caller with a header-sized space', () => {
  // The `\f` glyph is drawn at 0.7em (`.marker-visible .marker`), so a space kept inside that span
  // is drawn at 0.7em too and reads as `\f+`. The separator belongs outside the glyph, where it
  // takes the header's own size. Asserting on raw `textContent` is what distinguishes the two:
  // a space parked at the end of the caller's inline-block box concatenates the same way but is
  // dropped by CSS at the end of the box's last line, so it is invisible on screen.
  const { container } = render(<FootnoteItem footnote={footnoteWithCategory} />);
  const openingMarker = headerOf(container).querySelector('.marker');

  expect(openingMarker?.textContent).toBe('\\f');
  expect(openingMarker?.nextSibling?.textContent).toBe(' ');
});

/** A note whose single `ft` run is explicitly closed in the source (no `closed: 'false'`). */
const closedRunNote: MarkerObject = {
  type: 'note',
  marker: 'f',
  caller: '+',
  content: [{ type: 'char', marker: 'ft', content: ['closed run'] }],
};

describe('FootnoteItem marker fidelity', () => {
  it('renders a closing marker for a character run that is closed in the source', () => {
    // PT9: Standard.xslt `closemarker` emits \ft* unless the run carries closed="false"
    expect(renderBodyText(closedRunNote)).toContain('\\ft*');
  });

  it('omits the closing marker for a character run marked unclosed in the source', () => {
    // `closed` is present on USJ nodes at runtime but absent from the published MarkerObject type
    const unclosedRun: MarkerObject & { closed: string } = {
      type: 'char',
      marker: 'ft',
      content: ['open run'],
      closed: 'false',
    };
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [unclosedRun],
    };
    expect(renderBodyText(footnote)).not.toContain('\\ft*');
  });

  it('prefixes a nested character marker with a plus', () => {
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [
        {
          type: 'char',
          marker: 'fp',
          content: ['This is ', { type: 'char', marker: 'fk', content: ['unusual'] }],
        },
      ],
    };
    // PT9: Standard.xslt `openmarkernospace` adds '+' when a char/link sits inside a char/link.
    // The top-level `fp` run is a child of the note, so it stays unprefixed.
    const bodyText = renderBodyText(footnote);
    expect(bodyText).toContain('\\+fk');
    expect(bodyText).not.toContain('\\fk ');
  });

  it('separates a marker from its text with a non-breaking space', () => {
    // PT9: Standard.xslt `openmarker` = marker span + &#xA0;, so the marker never wraps away
    // from the text it introduces.
    expect(renderBodyText(closedRunNote)).toContain('\\ft\u00a0closed run');
  });
});

describe('FootnoteItem category', () => {
  const categorizedNote: MarkerObject = {
    type: 'note',
    marker: 'f',
    caller: '+',
    category: 'things',
    content: [{ type: 'char', marker: 'ft', content: ['note text'] }],
  };

  it('renders the note category as a \\cat run ahead of the note text when markers are shown', () => {
    // PT9: StandardNotes.xslt emits \cat <category>\cat* at the head of span.notetext
    expect(renderBodyText(categorizedNote)).toContain('\\cat\u00a0things\\cat*');
  });

  it('still renders the category when markers are hidden', () => {
    // PT9 shows the category in both its standard and its formatted notes pane. Only the standard
    // pane's marked-up representation is ported; the formatted pane emits raw `\cat …\cat*` text.
    expect(renderBodyText(categorizedNote, false)).toContain('things');
  });
});

describe('FootnoteItem target reference', () => {
  const referencedNote: MarkerObject = {
    type: 'note',
    marker: 'f',
    caller: '+',
    content: [
      { type: 'char', marker: 'fr', content: ['1.11'] },
      { type: 'char', marker: 'ft', content: ['note text'] },
    ],
  };

  it('renders the target reference inline at the head of the note text', () => {
    // PT9 keeps `\fr` inside the note text (`StandardNotes.xslt` floats only the marker+caller),
    // so the line reads as one continuous USFM run rather than splitting into aligned columns.
    expect(renderBodyText(referencedNote)).toContain('\\fr\u00a01.11');
  });

  it('renders exactly one header cell - the marker and caller', () => {
    const { container } = render(<FootnoteItem footnote={referencedNote} />);
    const headers = container.querySelectorAll('.textual-note-header');
    expect(headers).toHaveLength(1);
    expect(headers[0].textContent).toBe('\\f +');
  });
});

describe('FootnoteItem body structure', () => {
  it('gives sibling runs that share a marker distinct React keys', () => {
    // Two `fqa` runs in one note is ordinary USFM (see footnotes.usj.data.ts). Keys derived from a
    // run's marker and text collide for such siblings, which React reconciles unpredictably.
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [
        { type: 'char', marker: 'fqa', content: ['same'] },
        { type: 'char', marker: 'fqa', content: ['same'] },
      ],
    };
    render(<FootnoteItem footnote={footnote} />);
    const warnings = consoleError.mock.calls.filter((args) =>
      args.some((arg) => typeof arg === 'string' && arg.includes('same key')),
    );
    expect(warnings).toHaveLength(0);
  });

  it('wraps note body text in a notetext element so bidi is embedded as in PT9', () => {
    const { container } = render(<FootnoteItem footnote={closedRunNote} />);
    expect(container.querySelector('.textual-note-body .notetext')).toBeInTheDocument();
  });

  it('renders a zero-width placeholder for a note with no body content', () => {
    const emptyNote: MarkerObject = { type: 'note', marker: 'f', caller: '+', content: [] };
    // PT9: StandardNotes.xslt emits &#xFEFF; so the line keeps its height and stays clickable
    expect(renderBodyText(emptyNote, false)).toBe('\ufeff');
  });
});
