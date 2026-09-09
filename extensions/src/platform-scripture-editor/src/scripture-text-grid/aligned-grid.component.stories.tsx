import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { AlignedGrid } from './aligned-grid.component';
import { ALIGNED_ZOOM_PROPERTY, type AlignedZoomStyle } from './aligned-grid.styles';

/**
 * The verse-aligned grid: verse N of every resource on one row.
 *
 * The columns here are stand-ins for `ResourceColumn` + `Editorial`, which need PAPI and cannot
 * render real scripture in Storybook. They reproduce the DOM the real ones produce — the
 * `data-cell-*` wrappers this repo owns, the `editor-*` wrappers the editor supplies, and verse
 * blocks carrying `data-verse-start`/`-end` — because that markup is exactly what the layout's
 * stylesheet keys on. Alignment is native CSS, so a story that reproduces the markup demonstrates
 * the real thing rather than a picture of it, and Chromatic catches a break in the chain that no
 * unit test can see (jsdom lays nothing out).
 */
const meta: Meta<typeof AlignedGrid> = {
  title: 'Bundled Extensions/platform-scripture-editor/AlignedGrid',
  component: AlignedGrid,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof AlignedGrid>;

const scrRef: SerializedVerseRef = {
  book: 'JHN',
  chapterNum: 4,
  verseNum: 1,
  versificationStr: 'English',
};

/** Bounds the grid so its full-height layout behaves like a real web-view pane. */
const GRID_BOX_STYLE: React.CSSProperties = {
  height: '360px',
  width: '720px',
  overflow: 'hidden',
  border: '1px solid var(--border)',
  borderRadius: '4px',
};

/** One verse, as the editor's block-verse layout renders it. */
type StubVerse = {
  /** Verse marker verbatim: `'5'`, or `'3-4'` for a bridge covering two rows. */
  marker: string;
  lines: string[];
};

function StubVerseBlock({ verse }: { verse: StubVerse }) {
  const [start, end = start] = verse.marker.split('-');
  return (
    <div
      className="verse-block"
      data-verse-number={verse.marker}
      data-verse-start={start}
      data-verse-end={end}
    >
      {verse.lines.map((line, index) => (
        <p key={line} style={{ margin: 0, fontFamily: 'serif', lineHeight: 1.5 }}>
          {index === 0 ? (
            <sup style={{ fontWeight: 700, marginInlineEnd: 3 }}>{verse.marker}</sup>
          ) : undefined}
          {line}
        </p>
      ))}
    </div>
  );
}

/** Per-resource zoom, published exactly as `ResourceCellView` publishes it in this view. */
function buildZoomStyle(zoomFactor: number | undefined): AlignedZoomStyle | undefined {
  return zoomFactor === undefined ? undefined : { [ALIGNED_ZOOM_PROPERTY]: zoomFactor };
}

/** One resource column, in the DOM shape `ResourceColumn` and the editor produce together. */
function StubColumn({
  label,
  verses,
  textDirection = 'ltr',
  zoomFactor,
  placeholder,
}: {
  label: string;
  verses: StubVerse[];
  textDirection?: string;
  /** Per-resource zoom, published exactly as `ResourceCellView` publishes it in this view. */
  zoomFactor?: number;
  /** Renders the cell's placeholder state instead of the editor (downloading, unavailable, empty). */
  placeholder?: string;
}) {
  return (
    <div role="region" aria-label={label} data-resource-id={label} className="tw:min-w-0">
      <div data-cell-root className="tw:group tw:flex tw:min-w-0 tw:flex-col">
        <div
          data-cell-header
          className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-0.5"
        >
          <span className="tw:truncate tw:text-xs tw:font-medium tw:text-primary">{label}</span>
        </div>
        <div
          data-cell-content
          className="tw:flex-1 tw:overflow-visible"
          dir={textDirection}
          style={buildZoomStyle(zoomFactor)}
        >
          <div data-cell-pad className="tw:p-2">
            {placeholder === undefined ? (
              <div className="editor-container">
                <div className="editor-inner">
                  <div className="editor-input">
                    {verses.map((verse) => (
                      <StubVerseBlock key={verse.marker} verse={verse} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                data-cell-placeholder
                className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center"
              >
                <span className="tw:text-sm tw:text-muted-foreground">{placeholder}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const versePerRow: StubVerse[] = [
  {
    marker: '1',
    lines: [
      'When therefore the Lord knew how the Pharisees had heard that Jesus was making and baptizing more disciples than John',
    ],
  },
  { marker: '2', lines: ['(although Jesus himself did not baptize, but his disciples),'] },
  { marker: '3', lines: ['he left Judea and departed again to Galilee.'] },
  { marker: '4', lines: ['And he had to pass through Samaria.'] },
  { marker: '5', lines: ['So he came to a town of Samaria called Sychar.'] },
];

/** Bridges verses 3 and 4 into one block, which spans both of their rows. */
const withBridgedVerses: StubVerse[] = [
  { marker: '1', lines: ['Now when Jesus learned that the Pharisees had heard'] },
  { marker: '2', lines: ['— although it was not Jesus himself but his disciples who baptized —'] },
  {
    marker: '3-4',
    lines: ['he left Judea and started back to Galilee, but he had to go through Samaria.'],
  },
  { marker: '5', lines: ['So he came to a Samaritan city called Sychar.'] },
];

/** Has no verse 3 at all, and sets verse 5 as two poetry lines. */
const withMissingVerseAndPoetry: StubVerse[] = [
  { marker: '1', lines: ['Jesus knew the Pharisees had heard.'] },
  { marker: '2', lines: ['His disciples did the baptizing.'] },
  { marker: '4', lines: ['He had to go through Samaria.'] },
  { marker: '5', lines: ['He came to Sychar,', 'near the plot of ground Jacob gave Joseph.'] },
];

/**
 * The case the view exists for: three translations of one passage, verse-aligned. Every row is as
 * tall as its tallest cell, the 3-4 bridge spans two rows, the column with no verse 3 leaves that
 * row empty without shifting anything below it, and there are no interior grid lines.
 */
export const ThreeTranslations: Story = {
  render: () => (
    <div style={GRID_BOX_STYLE}>
      <AlignedGrid scrRef={scrRef} ariaLabel="Text Collection">
        <StubColumn label="GRK" verses={versePerRow} />
        <StubColumn label="NRSV" verses={withBridgedVerses} />
        <StubColumn label="CPB" verses={withMissingVerseAndPoetry} />
      </AlignedGrid>
    </div>
  ),
};

/** A right-to-left resource keeps its own direction inside its column while the rows still line up. */
export const WithRightToLeftColumn: Story = {
  render: () => (
    <div style={GRID_BOX_STYLE}>
      <AlignedGrid scrRef={scrRef} ariaLabel="Text Collection">
        <StubColumn label="WEB" verses={versePerRow} />
        <StubColumn
          label="עברית"
          textDirection="rtl"
          verses={[
            { marker: '1', lines: ['כַּאֲשֶׁר יָדַע הָאָדוֹן כִּי שָׁמְעוּ הַפְּרוּשִׁים'] },
            { marker: '2', lines: ['אַף כִּי יֵשׁוּעַ עַצְמוֹ לֹא הִטְבִּיל'] },
            { marker: '3', lines: ['עָזַב אֶת יְהוּדָה'] },
            { marker: '4', lines: ['וְהָיָה עָלָיו לַעֲבֹר בְּשֹׁמְרוֹן'] },
            { marker: '5', lines: ['וַיָּבֹא לְעִיר בְּשֹׁמְרוֹן'] },
          ]}
        />
      </AlignedGrid>
    </div>
  ),
};

/**
 * One column zoomed while its neighbours are not. Rows stay aligned because zoom lands on the verse
 * blocks, not on the subgrid box that carries the shared row tracks — a row simply takes the height
 * of its tallest, now larger, cell. An original-language column often wants a bigger font, so this
 * is the ordinary case, not an edge one.
 */
export const MixedZoom: Story = {
  render: () => (
    <div style={GRID_BOX_STYLE}>
      <AlignedGrid scrRef={scrRef} ariaLabel="Text Collection">
        <StubColumn label="GRK" verses={versePerRow} zoomFactor={1.5} />
        <StubColumn label="NRSV" verses={withBridgedVerses} />
        <StubColumn label="CPB" verses={withMissingVerseAndPoetry} />
      </AlignedGrid>
    </div>
  ),
};

/**
 * A column that has nothing to render yet — still downloading, or with no verses in this chapter.
 * Its message spans every row, so it is pinned to the top of the column: centred, it would sit at
 * the midpoint of a whole chapter's height and start off screen, making the column read as blank.
 */
export const ColumnWithNothingToShow: Story = {
  render: () => (
    <div style={GRID_BOX_STYLE}>
      <AlignedGrid scrRef={scrRef} ariaLabel="Text Collection">
        <StubColumn label="GRK" verses={versePerRow} />
        <StubColumn label="CPB" verses={[]} placeholder="Resource is loading…" />
        <StubColumn label="NRSV" verses={withBridgedVerses} />
      </AlignedGrid>
    </div>
  ),
};

/**
 * Six resources in a pane too narrow for them: each column holds its floor and the grid scrolls
 * sideways, rather than shrinking the columns into unreadable slivers.
 */
export const ManyColumnsScrollSideways: Story = {
  render: () => (
    <div style={GRID_BOX_STYLE}>
      <AlignedGrid scrRef={scrRef} ariaLabel="Text Collection">
        {['GRK', 'NRSV', 'CPB', 'WEB', 'KJV', 'ESV'].map((label) => (
          <StubColumn key={label} label={label} verses={versePerRow} />
        ))}
      </AlignedGrid>
    </div>
  ),
};
