// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteItem } from '@/components/advanced/footnotes/footnote-item.component';

/**
 * Renders a footnote and returns the flat text of its body cell - the same text
 * `getCaretPositionFromClick` walks, and the PT9 equivalent of `span.notetext` plus the trailing
 * end marker.
 */
function renderBodyText(footnote: MarkerObject, showMarkers = true): string {
  const { container } = render(<FootnoteItem footnote={footnote} showMarkers={showMarkers} />);
  return container.querySelector('.textual-note-body')?.textContent ?? '';
}

/** A note whose single `ft` run is explicitly closed in the source (no `closed: 'false'`). */
const closedRunNote: MarkerObject = {
  type: 'note',
  marker: 'f',
  caller: '+',
  content: [{ type: 'char', marker: 'ft', content: ['closed run'] }],
};

afterEach(() => {
  vi.restoreAllMocks();
});

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
    expect(headers[0].textContent).toBe('\\f\u00a0+\u00a0');
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
