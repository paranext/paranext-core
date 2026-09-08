import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { AlignedGrid } from './aligned-grid.component';

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

/** One resource column, in the DOM shape `ResourceColumn` and the editor produce together. */
function StubColumn({
  label,
  verses,
  textDirection = 'ltr',
}: {
  label: string;
  verses: StubVerse[];
  textDirection?: string;
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
        <div data-cell-content className="tw:flex-1 tw:overflow-visible" dir={textDirection}>
          <div data-cell-pad className="tw:p-2">
            <div className="editor-container">
              <div className="editor-inner">
                <div className="editor-input">
                  {verses.map((verse) => (
                    <StubVerseBlock key={verse.marker} verse={verse} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const greek: StubVerse[] = [
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

/** Bridges verses 3 and 4 into one block, which spans both rows. */
const nrsv: StubVerse[] = [
  { marker: '1', lines: ['Now when Jesus learned that the Pharisees had heard'] },
  { marker: '2', lines: ['— although it was not Jesus himself but his disciples who baptized —'] },
  {
    marker: '3-4',
    lines: ['he left Judea and started back to Galilee, but he had to go through Samaria.'],
  },
  { marker: '5', lines: ['So he came to a Samaritan city called Sychar.'] },
];

/** Has no verse 3 at all, and sets verse 5 as poetry lines. */
const cpb: StubVerse[] = [
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
        <StubColumn label="GRK" verses={greek} />
        <StubColumn label="NRSV" verses={nrsv} />
        <StubColumn label="CPB" verses={cpb} />
      </AlignedGrid>
    </div>
  ),
};

/** A right-to-left resource keeps its own direction inside its column while the rows still line up. */
export const WithRightToLeftColumn: Story = {
  render: () => (
    <div style={GRID_BOX_STYLE}>
      <AlignedGrid scrRef={scrRef} ariaLabel="Text Collection">
        <StubColumn label="WEB" verses={greek} />
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
 * Six resources in a pane too narrow for them: each column holds its floor and the grid scrolls
 * sideways, rather than shrinking the columns into unreadable slivers.
 */
export const ManyColumnsScrollSideways: Story = {
  render: () => (
    <div style={GRID_BOX_STYLE}>
      <AlignedGrid scrRef={scrRef} ariaLabel="Text Collection">
        {['GRK', 'NRSV', 'CPB', 'WEB', 'KJV', 'ESV'].map((label) => (
          <StubColumn key={label} label={label} verses={greek} />
        ))}
      </AlignedGrid>
    </div>
  ),
};
