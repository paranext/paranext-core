import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { renderWithInvisibleChars } from './replace-preview-styles';

// ─── Data ─────────────────────────────────────────────────────────────────────

/**
 * All whitespace / invisible characters that Paratext 9 and Paratext 10 Find recognise, together
 * with metadata about how each one is stored and displayed.
 */
const WHITESPACE_CHARS: {
  codePoint: string;
  name: string;
  usfm?: string;
  /** Bracketed abbreviation shown in the PT9 editor when AllowInvisibleChars is true. */
  pt9Abbreviation?: string;
  pt9Notes: string;
  symbol: string;
  isZeroWidth: boolean;
}[] = [
  {
    codePoint: 'U+0020',
    name: 'Space',
    pt9Notes:
      'Standard word separator. RenderSpaces (UsfmXsltExtensions.cs) leaves a single space unchanged to avoid breaking line-wrapping. Affected by whitespace normalization modes (Preserve/Replace/Collapse).',
    symbol: renderWithInvisibleChars('\u0020'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+00A0',
    name: 'No-Break Space (NBSP)',
    usfm: '~',
    pt9Abbreviation: '[Nbsp]',
    pt9Notes:
      'Named constant nonBreakingSpace in PtxUtils/StringUtils.cs. USFM uses ~ as an escape. When AllowInvisibleChars is false (legacy), stored/displayed as ~. When true, stored as U+00A0 and shown as [Nbsp] in the editor. RenderSpaces converts leading/consecutive spaces to NBSP for HTML rendering. NoBreakSpaceReplacer.cs provides three replacement modes: Replace, ReplaceKeepingTildes, and ReplaceRemovingTildes. Auto-replace maps U+E082 → U+00A0.',
    symbol: renderWithInvisibleChars('\u00a0'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+202F',
    name: 'Narrow No-Break Space',
    pt9Abbreviation: '[Nnbsp]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (SpaceSeparator Unicode category). Displayed as [Nnbsp] in the PT9 editor when AllowInvisibleChars is true.',
    symbol: renderWithInvisibleChars('\u202f'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+2009',
    name: 'Thin Space',
    pt9Abbreviation: '[Tsp]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (SpaceSeparator Unicode category). Displayed as [Tsp] in the PT9 editor when AllowInvisibleChars is true.',
    symbol: renderWithInvisibleChars('\u2009'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+200A',
    name: 'Hair Space',
    pt9Abbreviation: '[Hsp]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (SpaceSeparator Unicode category). Displayed as [Hsp] in the PT9 editor when AllowInvisibleChars is true.',
    symbol: renderWithInvisibleChars('\u200a'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+2002',
    name: 'En Space',
    pt9Abbreviation: '[Ensp]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (SpaceSeparator Unicode category). Displayed as [Ensp] in the PT9 editor when AllowInvisibleChars is true.',
    symbol: renderWithInvisibleChars('\u2002'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+2003',
    name: 'Em Space',
    pt9Abbreviation: '[Emsp]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (SpaceSeparator Unicode category). Displayed as [Emsp] in the PT9 editor when AllowInvisibleChars is true. Auto-replace maps U+E087 → U+2003.',
    symbol: renderWithInvisibleChars('\u2003'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+3000',
    name: 'Ideographic Space',
    pt9Abbreviation: '[Isp]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (SpaceSeparator Unicode category). Displayed as [Isp] in the PT9 editor when AllowInvisibleChars is true.',
    symbol: renderWithInvisibleChars('\u3000'),
    isZeroWidth: false,
  },
  {
    codePoint: 'U+200B',
    name: 'Zero-Width Space (ZWS)',
    pt9Abbreviation: '[Zwsp]',
    pt9Notes:
      'Named constant zeroWidthSpace in PtxUtils/StringUtils.cs. Detected by IsInvisibleCharOrWhitespace() and IsNonPrintingCharacter(). Displayed as [Zwsp] in the PT9 editor when AllowInvisibleChars is true via ZeroWidthCharacterMarkupSource.cs.',
    symbol: renderWithInvisibleChars('\u200b'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+200C',
    name: 'Zero-Width Non-Joiner (ZWNJ)',
    pt9Abbreviation: '[Zwnj]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (Format Unicode category). Displayed as [Zwnj] in the PT9 editor when AllowInvisibleChars is true. Used in right-to-left and complex-script projects.',
    symbol: renderWithInvisibleChars('\u200c'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+200D',
    name: 'Zero-Width Joiner (ZWJ)',
    pt9Abbreviation: '[Zwj]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (Format Unicode category). Displayed as [Zwj] in the PT9 editor when AllowInvisibleChars is true. Used in complex-script projects to control ligature formation.',
    symbol: renderWithInvisibleChars('\u200d'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+200E',
    name: 'Left-to-Right Mark (LRM)',
    pt9Abbreviation: '[Ltr]',
    pt9Notes:
      'Named constant ltrMarker in PtxUtils/StringUtils.cs. Detected by IsInvisibleCharOrWhitespace() (Format category). Displayed as [Ltr] in the PT9 editor when AllowInvisibleChars is true.',
    symbol: renderWithInvisibleChars('\u200e'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+200F',
    name: 'Right-to-Left Mark (RLM)',
    pt9Abbreviation: '[Rtl]',
    pt9Notes:
      'Named constant rtlMarker in PtxUtils/StringUtils.cs. Detected by IsInvisibleCharOrWhitespace() (Format category). Displayed as [Rtl] in the PT9 editor when AllowInvisibleChars is true.',
    symbol: renderWithInvisibleChars('\u200f'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+00AD',
    name: 'Soft Hyphen (Discretionary Hyphen)',
    pt9Notes:
      'Named constant discretionaryHyphen in PtxUtils/StringUtils.cs. Invisible in running text; may render as a hyphen only at a line break. Detected by IsInvisibleCharOrWhitespace() and IsNonPrintingCharacter().',
    symbol: renderWithInvisibleChars('\u00ad'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+202A',
    name: 'Left-to-Right Embedding',
    pt9Notes:
      'Named constant ltrEmbedding in PtxUtils/StringUtils.cs. Begins a LTR directional embedding. Detected by IsInvisibleCharOrWhitespace() (Format Unicode category). Must be terminated by U+202C Pop Direction Formatting.',
    symbol: renderWithInvisibleChars('\u202a'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+202B',
    name: 'Right-to-Left Embedding',
    pt9Notes:
      'Named constant rtlEmbedding in PtxUtils/StringUtils.cs. Begins a RTL directional embedding. Detected by IsInvisibleCharOrWhitespace() (Format Unicode category). Must be terminated by U+202C Pop Direction Formatting.',
    symbol: renderWithInvisibleChars('\u202b'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+202C',
    name: 'Pop Direction Formatting',
    pt9Notes:
      'Named constant popDirectionFormatting in PtxUtils/StringUtils.cs. Terminates the most recent directional embedding or override (U+202A–U+202E). Detected by IsInvisibleCharOrWhitespace() (Format Unicode category).',
    symbol: renderWithInvisibleChars('\u202c'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+202D',
    name: 'Left-to-Right Override',
    pt9Notes:
      'Named constant ltrOverride in PtxUtils/StringUtils.cs. Forces all characters to display as LTR regardless of their intrinsic directionality. Detected by IsInvisibleCharOrWhitespace() (Format Unicode category).',
    symbol: renderWithInvisibleChars('\u202d'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+202E',
    name: 'Right-to-Left Override',
    pt9Notes:
      'Named constant rtlOverride in PtxUtils/StringUtils.cs. Forces all characters to display as RTL regardless of their intrinsic directionality. Detected by IsInvisibleCharOrWhitespace() (Format Unicode category).',
    symbol: renderWithInvisibleChars('\u202e'),
    isZeroWidth: true,
  },
  {
    codePoint: 'U+2060',
    name: 'Word Joiner (WJ)',
    pt9Abbreviation: '[Wj]',
    pt9Notes:
      'Detected by IsInvisibleCharOrWhitespace() (Format Unicode category). Displayed as [Wj] in the PT9 editor when AllowInvisibleChars is true. Prevents line breaks without adding width.',
    symbol: renderWithInvisibleChars('\u2060'),
    isZeroWidth: true,
  },
  {
    codePoint: '~',
    name: 'USFM Tilde (non-breaking space escape)',
    usfm: '~',
    pt9Notes:
      'In USFM markup ~ is the conventional escape for U+00A0. When AllowInvisibleChars is false, Paratext 9 stores/displays NBSP as the tilde literal. When true, the tilde is resolved to U+00A0 and displayed as [Nbsp]. ScrLanguage.cs (lines ~770–828) treats ~ as a whitespace character in search when AllowInvisibleChars is false.',
    symbol: renderWithInvisibleChars('~'),
    isZeroWidth: false,
  },
];

// ─── Story link helpers ───────────────────────────────────────────────────────

/** Produces a Storybook-internal href given a story's full path/id. */
function storyHref(storyId: string): string {
  return `?path=/story/${storyId}`;
}

const STORIES = {
  replacePreviewAllVariants: storyHref(
    'bundled-extensions-find-replacepreviewoptions--all-variants',
  ),
  searchResultMonospaceAndInvisible: storyHref(
    'bundled-extensions-find-searchresult--monospace-and-invisible',
  ),
  findHeaderDemo: storyHref('bundled-extensions-find-findheaderdemo--default'),
};

// ─── Shared prose styles ──────────────────────────────────────────────────────

const h2 = 'tw-text-lg tw-font-semibold tw-mb-3 tw-mt-0';
const h3 = 'tw-text-sm tw-font-semibold tw-mb-2 tw-mt-4';
const prose = 'tw-text-sm tw-text-foreground tw-leading-relaxed';
const muted = 'tw-text-xs tw-text-muted-foreground';
const note =
  'tw-rounded tw-border tw-border-amber-300 tw-bg-amber-50 tw-px-3 tw-py-2 tw-text-xs tw-text-amber-800 dark:tw-border-amber-700 dark:tw-bg-amber-950 dark:tw-text-amber-300';
const code = 'tw-font-mono tw-rounded tw-bg-muted tw-px-1 tw-py-0.5 tw-text-xs';
const link =
  'tw-text-blue-600 tw-underline hover:tw-text-blue-800 dark:tw-text-blue-400 dark:hover:tw-text-blue-200';

// ─── Component ────────────────────────────────────────────────────────────────

function WhitespaceReference() {
  const visibleSpaceChars = WHITESPACE_CHARS.filter((c) => !c.isZeroWidth);
  const zeroWidthChars = WHITESPACE_CHARS.filter((c) => c.isZeroWidth);

  const renderTable = (rows: typeof WHITESPACE_CHARS, includeUsfmColumn: boolean) => (
    <table className="tw-w-full tw-border-collapse tw-border tw-border-border tw-text-xs">
      <thead>
        <tr className="tw-bg-muted tw-text-left tw-font-semibold tw-text-muted-foreground">
          <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
            Code point
          </th>
          <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">Name</th>
          {includeUsfmColumn && (
            <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">USFM</th>
          )}
          <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
            PT9 UI{' '}
            <span className="tw-font-normal tw-text-muted-foreground">(AllowInvisibleChars)</span>
          </th>
          <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
            Visual symbol{' '}
            <span className="tw-font-normal tw-text-muted-foreground">(Show Invisible)</span>
          </th>
          <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
            Paratext 9 notes
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((c) => (
          <tr key={c.codePoint} className="tw-align-top odd:tw-bg-background even:tw-bg-muted/40">
            <td className="tw-border tw-border-border tw-px-3 tw-py-2">
              <code className={code}>{c.codePoint}</code>
            </td>
            <td className="tw-border tw-border-border tw-px-3 tw-py-2 tw-text-foreground">
              {c.name}
            </td>
            {includeUsfmColumn && (
              <td className="tw-border tw-border-border tw-px-3 tw-py-2">
                {c.usfm ? (
                  <code className={code}>{c.usfm}</code>
                ) : (
                  <span className="tw-text-muted-foreground">—</span>
                )}
              </td>
            )}
            <td className="tw-border tw-border-border tw-px-3 tw-py-2">
              {c.pt9Abbreviation ? (
                <code className={code}>{c.pt9Abbreviation}</code>
              ) : (
                <span className="tw-text-muted-foreground">—</span>
              )}
            </td>
            <td className="tw-border tw-border-border tw-px-3 tw-py-2">
              <span className="tw-font-mono tw-text-sm tw-tracking-widest">{c.symbol}</span>
            </td>
            <td className="tw-border tw-border-border tw-px-3 tw-py-2 tw-text-muted-foreground">
              {c.pt9Notes}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="tw-max-w-4xl tw-space-y-8 tw-p-6">
      {/* ── Title ────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="tw-text-xl tw-font-bold tw-mb-1">Whitespace in Paratext — Reference</h1>
        <p className={muted}>
          Whitespace and invisible characters in scripture text: storage in USFM, Paratext 9
          internals, and how Paratext 10 Find renders them.
        </p>
      </div>

      {/* ── P9 vs P10 comparison ─────────────────────────────────────────── */}
      <section className="tw-space-y-3">
        <h2 className={h2}>P9 vs P10 at a glance</h2>
        <div className={note}>
          P10 is still early in its whitespace implementation — several P9 features (NBSP
          replacement tool, auto-replace mappings, data-level normalisation modes) are not yet
          present.
        </div>
        <table className="tw-w-full tw-border-collapse tw-border tw-border-border tw-text-xs">
          <thead>
            <tr className="tw-bg-muted tw-text-left tw-text-muted-foreground">
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Feature
              </th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Paratext 9
              </th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Paratext 10 Find
              </th>
            </tr>
          </thead>
          <tbody className={muted}>
            {(
              [
                [
                  'Recognised characters',
                  'Same 20+ Unicode code points',
                  'Same 20+ Unicode code points ✓',
                ],
                [
                  'AllowInvisibleChars = false',
                  '~ stored/shown as NBSP; treated as whitespace in search',
                  '~ treated as NBSP in search; renders as [Nbsp] with Show Invisible on ✓',
                ],
                [
                  'AllowInvisibleChars = true',
                  '~ is a literal tilde; chars shown as [Xxx] abbreviations in editor',
                  '~ is a literal tilde; renderWithInvisibleChars leaves ~ unchanged ✓',
                ],
                [
                  'Ignore Whitespace Differences',
                  'ScrLanguage.cs: collapses whitespace variants in search',
                  'Find header filter: collapses runs to a lazy regex quantifier ✓',
                ],
                ['NBSP symbol', '[Nbsp]', '[Nbsp] ✓'],
                [
                  'Other space-width symbols',
                  '[Emsp], [Ensp], [Nnbsp], [Tsp], [Hsp], [Isp] — one per character',
                  '· (middle dot for all space-width chars) ✗ less granular',
                ],
                [
                  'Zero-width / directional symbols',
                  '[Zwsp], [Zwnj], [Zwj], [Ltr], [Rtl], [Wj]',
                  '‹ZW›, ‹ZWN›, ‹ZWJ›, ‹LRM›, ‹RLM›, ‹WJ› — compact angle-bracket style',
                ],
                [
                  'Display scope',
                  'Per-project (AllowInvisibleChars) + per-editor (ShowWhitespace on HtmlTextBox)',
                  'Per-session toggle in Find panel (Show Invisible)',
                ],
                [
                  'Trailing-space handling',
                  'RenderSpaces converts leading/consecutive spaces to NBSP for HTML rendering',
                  'Trailing spaces → NBSP before inserting into <span> (CSS workaround)',
                ],
                [
                  'Excluded characters',
                  '6 chars tracked by IsInvisibleCharOrWhitespace() but not selectable in UI',
                  'Same 6 excluded from Show Invisible and Ignore Whitespace Differences ✓',
                ],
                [
                  'NBSP replacement tool',
                  'NoBreakSpaceReplacer.cs — 3 modes (Replace, KeepTildes, RemoveTildes)',
                  'Not yet implemented',
                ],
                [
                  'Auto-replace mappings',
                  'DefaultAutoReplace.txt: PUA → Unicode (e.g. U+E082 → U+00A0)',
                  'Not yet implemented',
                ],
                [
                  'Whitespace normalisation modes',
                  'Preserve / Replace / Collapse (WhitespaceNormalizer.cs)',
                  'Not yet implemented',
                ],
              ] satisfies [string, string, string][]
            ).map(([feature, pt9, pt10]) => (
              <tr key={feature} className="tw-align-top odd:tw-bg-background even:tw-bg-muted/40">
                <td className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-medium tw-text-foreground">
                  {feature}
                </td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">{pt9}</td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">{pt10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── Paratext 9 ───────────────────────────────────────────────────── */}
      <section className="tw-space-y-3">
        <h2 className={h2}>Paratext 9</h2>

        <h3 className={h3}>Internal storage</h3>
        <p className={prose}>
          Named constants in <code className={code}>PtxUtils/StringUtils.cs</code>:
        </p>
        <table className="tw-w-full tw-border-collapse tw-border tw-border-border tw-text-xs">
          <thead>
            <tr className="tw-bg-muted tw-text-left tw-text-muted-foreground">
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Constant
              </th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Unicode
              </th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody className={muted}>
            {[
              ['nonBreakingSpace', 'U+00A0', 'Non-Breaking Space (NBSP)'],
              ['zeroWidthSpace', 'U+200B', 'Zero-Width Space'],
              ['discretionaryHyphen', 'U+00AD', 'Soft Hyphen'],
              ['ltrMarker / rtlMarker', 'U+200E / U+200F', 'Directional Marks'],
              ['ltrEmbedding / rtlEmbedding', 'U+202A / U+202B', 'Directional Embeddings'],
              ['popDirectionFormatting', 'U+202C', 'Pop Direction Formatting'],
              ['ltrOverride / rtlOverride', 'U+202D / U+202E', 'Directional Overrides'],
            ].map(([constant, unicode, desc]) => (
              <tr key={constant} className="odd:tw-bg-background even:tw-bg-muted/40">
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">
                  <code className={code}>{constant}</code>
                </td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">
                  <code className={code}>{unicode}</code>
                </td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className={h3}>Character detection</h3>
        <p className={prose}>
          <code className={code}>PtxUtils/Text/CharExtensions.cs</code> exposes{' '}
          <code className={code}>IsInvisibleCharOrWhitespace()</code> and{' '}
          <code className={code}>IsNonPrintingCharacter()</code>, covering 12+ character types via
          Unicode categories (<em>SpaceSeparator</em>, <em>Format</em>, <em>Control</em>, etc.).
        </p>

        <h3 className={h3}>UI representation — AllowInvisibleChars</h3>
        <p className={prose}>
          The per-project <strong>AllowInvisibleChars</strong> setting (
          <code className={code}>ParatextInternalShared/ScriptureEditor</code>) controls whitespace
          display. When <strong>false</strong> (legacy): NBSP is stored/shown as{' '}
          <code className={code}>~</code>. When <strong>true</strong>: characters appear as
          bracketed abbreviations via{' '}
          <code className={code}>ZeroWidthCharacterMarkupSource.cs</code>; the{' '}
          <code className={code}>HtmlTextBox</code> control&apos;s{' '}
          <code className={code}>ShowWhitespace</code> property gates this rendering.
        </p>
        <p className={`${prose} tw-mb-1`}>PT9 editor abbreviations:</p>
        <table className="tw-w-full tw-border-collapse tw-border tw-border-border tw-text-xs">
          <thead>
            <tr className="tw-bg-muted tw-text-left tw-text-muted-foreground">
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Abbreviation
              </th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Character
              </th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Unicode
              </th>
            </tr>
          </thead>
          <tbody className={muted}>
            {[
              ['[Nbsp]', 'No-Break Space', 'U+00A0'],
              ['[Zwsp]', 'Zero-Width Space', 'U+200B'],
              ['[Zwnj]', 'Zero-Width Non-Joiner', 'U+200C'],
              ['[Zwj]', 'Zero-Width Joiner', 'U+200D'],
              ['[Ltr] / [Rtl]', 'Directional Marks', 'U+200E / U+200F'],
              ['[Emsp]', 'Em Space', 'U+2003'],
              ['[Ensp]', 'En Space', 'U+2002'],
              ['[Nnbsp]', 'Narrow No-Break Space', 'U+202F'],
              ['[Tsp]', 'Thin Space', 'U+2009'],
              ['[Hsp]', 'Hair Space', 'U+200A'],
              ['[Isp]', 'Ideographic Space', 'U+3000'],
              ['[Wj]', 'Word Joiner', 'U+2060'],
            ].map(([abbr, charName, unicode]) => (
              <tr key={abbr} className="odd:tw-bg-background even:tw-bg-muted/40">
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">
                  <code className={code}>{abbr}</code>
                </td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">{charName}</td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">
                  <code className={code}>{unicode}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className={h3}>USFM processing and normalisation</h3>
        <p className={prose}>
          <code className={code}>UsfmXsltExtensions.cs</code>{' '}
          <code className={code}>RenderSpaces</code>: converts leading/consecutive spaces to NBSP
          for HTML rendering; leaves a single space unchanged to avoid breaking line-wrapping.
          Normalisation modes (<code className={code}>WhitespaceNormalizer.cs</code>):
        </p>
        <ul className="tw-list-disc tw-pl-5 tw-text-sm tw-text-foreground tw-space-y-1">
          <li>
            <strong>Preserve</strong> — keep whitespace as-is
          </li>
          <li>
            <strong>Replace</strong> — replace <code className={code}>\r</code>,{' '}
            <code className={code}>\n</code>, <code className={code}>\t</code> with a regular space
          </li>
          <li>
            <strong>Collapse</strong> — collapse runs of whitespace to a single space
          </li>
        </ul>

        <h3 className={h3}>No-Break Space Replacement Tool</h3>
        <p className={prose}>
          <code className={code}>Paratext/ToolsMenu/NoBreakSpaceReplacer.cs</code> — three modes:
        </p>
        <ul className="tw-list-disc tw-pl-5 tw-text-sm tw-text-foreground tw-space-y-1">
          <li>
            <code className={code}>Replace()</code> — replaces NBSP with regular spaces
          </li>
          <li>
            <code className={code}>ReplaceKeepingTildes()</code> — replaces NBSP but preserves
            tildes
          </li>
          <li>
            <code className={code}>ReplaceRemovingTildes()</code> — replaces both NBSP and tildes
            with regular spaces
          </li>
        </ul>
        <div className={note}>
          Special handling prevents orphaned single spaces in{' '}
          <code className="tw-font-mono tw-text-xs">&quot; ~&quot;</code> patterns.
        </div>

        <h3 className={h3}>Search and Auto-Replace</h3>
        <p className={prose}>
          <code className={code}>ScrLanguage.cs</code> (lines ~770–828): tilde is treated as a
          whitespace character when <strong>AllowInvisibleChars is false</strong>;{' '}
          <strong>IgnoreWhitespaceDifferences</strong> allows matching across whitespace variants.
          <br />
          <code className={code}>DefaultAutoReplace.txt</code>: maps Private Use Area codepoints to
          standard Unicode whitespace — e.g. U+E082 → U+00A0, U+E087 → U+2003.
        </p>
      </section>

      {/* ── Paratext 10 Find ─────────────────────────────────────────────── */}
      <section className="tw-space-y-3">
        <h2 className={h2}>Paratext 10 Find</h2>

        <h3 className={h3}>Show Invisible toggle</h3>
        <p className={prose}>
          The Replace Preview options panel (from the{' '}
          <a href={STORIES.findHeaderDemo} className={link}>
            Find header
          </a>
          ) includes a <strong>Show Invisible</strong> toggle. When on, every whitespace/invisible
          character in matched text and the replacement preview is replaced by a visible symbol (see
          tables below).
        </p>
        <p className={muted}>
          Live demos:{' '}
          <a href={STORIES.replacePreviewAllVariants} className={link}>
            ReplacePreviewOptions › AllVariants
          </a>{' '}
          (Monospace + Show Invisible section),{' '}
          <a href={STORIES.searchResultMonospaceAndInvisible} className={link}>
            SearchResult › MonospaceAndInvisible
          </a>
          .
        </p>

        <h3 className={h3}>USFM tilde and AllowInvisibleChars</h3>
        <p className={prose}>
          When <strong>AllowInvisibleChars is false</strong>, Find treats{' '}
          <code className={code}>~</code> as NBSP — both U+00A0 and <code className={code}>~</code>{' '}
          render as <code className={code}>[Nbsp]</code> with Show Invisible on. When{' '}
          <strong>true</strong>, <code className={code}>~</code> is a literal tilde and is left
          unchanged. The <code className={code}>allowInvisibleCharacters</code> parameter of{' '}
          <code className={code}>renderWithInvisibleChars()</code> controls this; it defaults to{' '}
          <code className={code}>false</code> to match the Paratext default.
        </p>

        <h3 className={h3}>Trailing-space preservation</h3>
        <p className={prose}>
          Browsers collapse trailing spaces inside inline elements, making trailing-space matches
          invisible in the preview. To prevent this, trailing regular spaces are converted to NBSP
          before insertion into a highlighted <code className={code}>&lt;span&gt;</code>. With Show
          Invisible on, this renders as <code className={code}>[Nbsp]</code> at the trailing edge —
          a CSS workaround, not an indication the matched character is NBSP.
        </p>

        <h3 className={h3}>Ignore Whitespace Differences filter</h3>
        <p className={prose}>
          When active, consecutive whitespace in the search regex is collapsed to a lazy quantifier
          matching any combination of the supported invisible-character set and{' '}
          <code className={code}>~</code>. E.g. <code className={code}>in the</code> can match text
          containing an NBSP between the words.
        </p>
        <p className={muted}>
          See:{' '}
          <a href={STORIES.findHeaderDemo} className={link}>
            FindHeaderDemo › Default
          </a>
          .
        </p>
      </section>

      {/* ── Character table ──────────────────────────────────────────────── */}
      <section className="tw-space-y-4">
        <h2 className={h2}>Character reference</h2>
        <p className={prose}>
          The <em>PT9 UI</em> column shows the PT9 editor abbreviation (AllowInvisibleChars = true).
          The <em>Visual symbol</em> column shows what{' '}
          <code className={code}>renderWithInvisibleChars()</code> returns with Show Invisible on.
          PT9 uses bracket-style abbreviations for all characters; P10 uses{' '}
          <code className={code}>[Nbsp]</code> only for NBSP, angle-bracket glyphs (
          <code className={code}>‹ZW›</code>, <code className={code}>‹LRM›</code>, etc.) for
          zero-width/directional marks, and the middle dot (<code className={code}>·</code>) for all
          other space-width characters.
        </p>

        <h3 className={h3}>Space-width characters</h3>
        <div className="tw-overflow-x-auto">{renderTable(visibleSpaceChars, true)}</div>

        <h3 className={h3}>Zero-width / directional marks</h3>
        <p className={muted}>
          No visual width in normal rendering; Show Invisible expands them to angle-bracket glyphs.
        </p>
        <div className="tw-overflow-x-auto">{renderTable(zeroWidthChars, false)}</div>
      </section>

      {/* ── Symbol legend ─────────────────────────────────────────────────── */}
      <section className="tw-space-y-2">
        <h2 className={h2}>Symbol legend</h2>
        <ul className="tw-space-y-1 tw-text-sm">
          <li>
            <code className={`${code} tw-mr-2`}>[Nbsp]</code>Non-breaking space (U+00A0) and USFM{' '}
            <code className={code}>~</code> when AllowInvisibleChars is false
          </li>
          <li>
            <code className={`${code} tw-mr-2`}>·</code>Middle dot — regular space (U+0020) and all
            other space-width characters (narrow NBSP, thin, hair, en, em, ideographic)
          </li>
          <li>
            <code className={`${code} tw-mr-2`}>‹ZW›</code>Zero-width space (U+200B) — a ZWS
            codepoint is prepended so the glyph occupies no layout width
          </li>
          <li>
            <code className={`${code} tw-mr-2`}>‹ZWN›</code>Zero-width non-joiner (U+200C)
          </li>
          <li>
            <code className={`${code} tw-mr-2`}>‹ZWJ›</code>Zero-width joiner (U+200D)
          </li>
          <li>
            <code className={`${code} tw-mr-2`}>‹LRM›</code>Left-to-right mark (U+200E)
          </li>
          <li>
            <code className={`${code} tw-mr-2`}>‹RLM›</code>Right-to-left mark (U+200F)
          </li>
          <li>
            <code className={`${code} tw-mr-2`}>‹WJ›</code>Word joiner (U+2060)
          </li>
        </ul>
      </section>

      {/* ── Excluded characters ──────────────────────────────────────────── */}
      <section className="tw-space-y-3">
        <h2 className={h2}>Characters excluded from Show Invisible</h2>
        <p className={prose}>
          Six PT9 named constants are absent from both P10&apos;s Show Invisible rendering and
          Ignore Whitespace Differences. They are tracked by{' '}
          <code className={code}>IsInvisibleCharOrWhitespace()</code> but have no bracketed
          abbreviation in PT9&apos;s overlay system and are not in{' '}
          <code className={code}>SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS</code>. P10 follows
          PT9: if one appears in a match, <code className={code}>renderWithInvisibleChars()</code>{' '}
          passes it through unchanged.
        </p>
        <table className="tw-w-full tw-border-collapse tw-border tw-border-border tw-text-xs">
          <thead>
            <tr className="tw-bg-muted tw-text-left tw-text-muted-foreground">
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                Code point
              </th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">Name</th>
              <th className="tw-border tw-border-border tw-px-3 tw-py-2 tw-font-semibold">
                PT9 constant
              </th>
            </tr>
          </thead>
          <tbody className={muted}>
            {[
              ['U+00AD', 'Soft Hyphen', 'discretionaryHyphen'],
              ['U+202A', 'Left-to-Right Embedding', 'ltrEmbedding'],
              ['U+202B', 'Right-to-Left Embedding', 'rtlEmbedding'],
              ['U+202C', 'Pop Direction Formatting', 'popDirectionFormatting'],
              ['U+202D', 'Left-to-Right Override', 'ltrOverride'],
              ['U+202E', 'Right-to-Left Override', 'rtlOverride'],
            ].map(([cp, name, constant]) => (
              <tr key={cp} className="odd:tw-bg-background even:tw-bg-muted/40">
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">
                  <code className={code}>{cp}</code>
                </td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">{name}</td>
                <td className="tw-border tw-border-border tw-px-3 tw-py-2">
                  <code className={code}>{constant}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Guides/Whitespace Reference',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="pr-twp">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/**
 * Reference page explaining whitespace characters in Paratext and how Paratext 10 Find displays
 * them.
 */
export const Reference: Story = {
  render: () => <WhitespaceReference />,
};
