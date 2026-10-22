import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  EMPTY_KEY,
  NO_VERSES_TO_SHOW_KEY,
  RESET_ZOOM_KEY,
  RESOURCE_CELL_STRING_KEYS,
  ResourceCellView,
  ZOOM_IN_KEY,
  ZOOM_OPTIONS_KEY,
  ZOOM_OUT_KEY,
} from './resource-cell-view.component';
// The editor's USJ node styling (paragraph indents, poetry, verse numbers), which the real app loads
// globally and Storybook does not.
/* eslint-disable import/no-relative-packages -- the demo `usj-nodes.css` is not part of
   platform-bible-react's package exports (only `.` → dist is exported), so it can only be pulled
   in by relative path; this mirrors model-text-panel.stories.tsx and scripture-pane.stories.tsx. */
import '../../../../../lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css';
/* eslint-enable import/no-relative-packages */
// The verse-row layout rules this component's inline name display depends on. The real app loads
// them through `scripture-text-grid.web-view.scss`; Storybook does not, and copying them here would
// let the stories drift from the stylesheet they are meant to demonstrate.
import '../_scripture-text-grid-verse.scss';

/**
 * One cell of the Scripture Text Grid: a single resource's focused chapter. In the app the
 * connected `ResourceCell` fetches the chapter USJ and feeds a read-only `Editorial`; these stories
 * drive the presentational `ResourceCellView` directly so every state — downloading, book not
 * available, failed, and ready (LTR and RTL) — is reachable without a backend.
 *
 * `ResourceCellView` is purely presentational. The verse `listitem` role lives on the parent row in
 * `ScriptureTextGrid`; the cell renders the row's controls (the name as its disclosure control, and
 * the reorder grip). Stories wrap it in a plain bounded box.
 *
 * States covered: `downloading`, `bookNotAvailable`, `failed`, `unavailable`, and `ready` (LTR and
 * RTL).
 */
const meta: Meta<typeof ResourceCellView> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceCell',
  component: ResourceCellView,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ResourceCellView>;

const localizedStrings = getLocalizedStrings([...RESOURCE_CELL_STRING_KEYS]);

/** Storybook runs no content zoom; every cell marks its text with this one area id. */
const STORY_ZOOM_AREA = 'resource-story';

/** The zoom levels the zoomed verse-row stories show side by side. */
const STORY_ZOOM_LEVELS = [0.5, 1, 2];

/**
 * A story zoom area pinned at `level`.
 *
 * @param level The zoom level the area stands for.
 * @returns An area id unique to that level.
 */
function storyZoomAreaAt(level: number): string {
  return `resource-story-${String(level).replace('.', '-')}`;
}

/**
 * Stands in for the platform's content zoom, which Storybook does not run. For each level it sets
 * the area's `--platform-content-zoom-<area>` variable and the same `zoom` rule the platform puts
 * on that area's marker, so a zoomed story renders as the app does.
 */
function ContentZoomStandIn({ levels }: { levels: number[] }) {
  const rules = levels
    .map((level) => {
      const area = storyZoomAreaAt(level);
      return `:root { --platform-content-zoom-${area}: ${level}; } [data-platform-content-zoom-root="${area}"] { zoom: var(--platform-content-zoom-${area}); }`;
    })
    .join('\n');
  return <style>{rules}</style>;
}

/** Bounds the cell so its `h-full`/`overflow-auto` layout behaves like a real grid column. */
const CELL_BOX_STYLE: React.CSSProperties = {
  height: '320px',
  width: '280px',
  overflow: 'hidden',
  border: '1px solid var(--border)',
  borderRadius: '4px',
};

const ROW_BOX_STYLE: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  height: '320px',
};

/**
 * A plain flex container that frames multiple presentational cells side by side (no ARIA role
 * needed since ResourceCellView is purely presentational — the verse listitem role in
 * ScriptureTextGrid provides the accessible landmark).
 */
function CellRowBox({ children }: { children: React.ReactNode }) {
  return <div style={ROW_BOX_STYLE}>{children}</div>;
}

/**
 * Wraps one cell in a bounded column (preserves single-cell stories). `width` overrides the default
 * column width for stories that need a narrower pane.
 */
function CellBox({ children, width }: { children: React.ReactNode; width?: string }) {
  return <div style={{ ...CELL_BOX_STYLE, ...(width ? { width } : {}) }}>{children}</div>;
}

/** Stand-in for the read-only `Editorial` the connected cell supplies once the chapter is ready. */
function SampleChapter({ rtl = false }: { rtl?: boolean }) {
  const verses = rtl
    ? ['אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ בַּעֲצַת רְשָׁעִים', 'כִּי אִם בְּתוֹרַת יְהוָה חֶפְצוֹ']
    : [
        'Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
        'Blessed are those who mourn, for they shall be comforted.',
      ];
  return (
    <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
      {verses.map((text, index) => (
        <p key={text} style={{ margin: '0 0 8px' }}>
          <sup>{index + 3}</sup> {text}
        </p>
      ))}
    </div>
  );
}

/**
 * The verse row's shape comes from a float generated inside `.editor-input`, so a verse stand-in
 * must carry the real class chain.
 *
 * The `.stg-*` rules and the USJ node styles come from the real stylesheets via the side-effect
 * imports above. Only the editor's own wrapper styles are inlined here, the same subset the sibling
 * editor stories inline. `.editor-inner` is included because the verse rules override its
 * background and stack the name above it.
 */
const EDITOR_SHIM_STYLE = `
  .editor-container { color: inherit; position: relative; line-height: 20px; text-align: start; }
  .editor-inner { background: #fff; position: relative; }
  .editor-input { min-height: 150px; font-size: 15px; position: relative; tab-size: 1; outline: 0; padding: 15px 10px; flex: auto; }
  .editor-input > p { direction: inherit; margin-top: 0; margin-bottom: 0; line-height: 1.5; }
`;

/** Stand-in for the read-only `Editorial` carrying the class chain the verse rules are scoped on. */
function SampleEditorial({
  rtl = false,
  poetry = false,
  text,
}: {
  rtl?: boolean;
  poetry?: boolean;
  text?: string;
}) {
  const body =
    text ??
    (rtl
      ? 'אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ בַּעֲצַת רְשָׁעִים וּבְדֶרֶךְ חַטָּאִים לֹא עָמָד וּבְמוֹשַׁב לֵצִים לֹא יָשָׁב'
      : 'Blessed are the poor in spirit, for theirs is the kingdom of heaven, and blessed are those who mourn, for they shall be comforted.');
  return (
    <div className="editor-container">
      <div className="editor-inner">
        <div
          className={`editor-input usfm marker-hidden text-spacing formatted-font${poetry ? ' poetry' : ''}`}
          dir={rtl ? 'rtl' : 'ltr'}
        >
          <p className={poetry ? 'usfm_q1' : 'usfm_p'}>
            <span className="usfm_v">3</span> {body}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Stand-in for a two-line poetry verse (Ps 23:1, WEB): a short `\q1` line followed by a `\q2` line,
 * each its own block, so at a small zoom the second block starts beside the name.
 */
function SamplePoetryCouplet() {
  return (
    <div className="editor-container">
      <div className="editor-inner">
        <div className="editor-input usfm marker-hidden text-spacing formatted-font" dir="ltr">
          <p className="usfm_q1">
            <span className="usfm_v">1</span> Yahweh is my shepherd:
          </p>
          <p className="usfm_q2">I shall lack nothing.</p>
        </div>
      </div>
    </div>
  );
}

/** Wraps a verse-row story with the editor wrapper styles Storybook does not otherwise load. */
function VerseRowBox({ children, width }: { children: React.ReactNode; width?: string }) {
  return (
    <>
      <style>{EDITOR_SHIM_STYLE}</style>
      <CellBox width={width}>{children}</CellBox>
    </>
  );
}

/** Chapter USJ is still downloading — a Spinner plus the localized "Downloading…" subtitle. */
export const Downloading: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="downloading"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * The chapter failed to download (e.g. offline) — the localized "Download failed" subtitle, no
 * Spinner.
 */
export const Failed: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="failed"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * The resource is installed and working, but has no such book — e.g. Genesis in a New
 * Testament-only text. Shows only the missing-book wording: no "Resource unavailable" heading and
 * no "Download failed", either of which would point the user at a re-download that cannot supply a
 * book the text never contained.
 */
export const BookNotAvailable: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="bookNotAvailable"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * The resource is not installed (or could not be resolved after installation) — shows "Resource not
 * installed." No spinner, no "Download failed" secondary line. Distinct from `Failed` so users can
 * tell whether they need to install the resource or retry a failed download.
 */
export const NotInstalled: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="unavailable"
        zoomArea={STORY_ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={undefined}
      />
    </CellBox>
  ),
};

/** The chapter is ready — the editor slot renders (here a stand-in for the read-only `Editorial`). */
export const Ready: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/**
 * A chapter with a copy limit of 0: text is selected and the right-click menu is open, but the
 * limit leaves nothing to copy, so **Copy** is disabled.
 */
export const CopyLimitedMenuOpen: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={0}
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const verse = canvas.getByText(/Blessed are the poor in spirit/);
    await step('Select a verse', async () => {
      window.getSelection()?.selectAllChildren(verse);
    });
    await step('Open the right-click menu', async () => {
      await userEvent.pointer({ keys: '[MouseRight]', target: verse });
    });
    await step('Assert Copy is disabled', async () => {
      // The right-click menu is portaled out of the story's canvas.
      const menu = within(within(document.body).getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: /^copy$/i })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  },
};

/** A right-to-left resource: the cell honors the resource's own `dir`, independent of the UI locale. */
export const ReadyRightToLeft: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter rtl />}
      />
    </CellBox>
  ),
};

/** Verse mode, ready — the inline hanging name sits before a single verse (stand-in). */
export const VerseReady: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={<SampleEditorial />}
      />
    </VerseRowBox>
  ),
};

/** Verse mode, empty — this resource has no text for the focused verse. */
export const VerseEmpty: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        emptyMessage={localizedStrings[EMPTY_KEY]}
        editor={undefined}
      />
    </CellBox>
  ),
};

/** Single-cell RTL verse: the resource's own `dir`, independent of the UI locale. */
export const VerseRightToLeft: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={<SampleEditorial rtl />}
      />
    </VerseRowBox>
  ),
};

/**
 * The wrap-around shape in a narrow pane, where the verse wraps several times: every line after the
 * first returns to the row's flush inline edge, so the reserved name area costs width on line 1
 * only. `VerseWrapAround` shows the same shape at the default column width.
 */
export const VerseInlineWrapping: Story = {
  render: () => (
    <VerseRowBox width="200px">
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={
          <SampleEditorial text="Blessed are the poor in spirit, for theirs is the kingdom of heaven, and great is their reward in the days to come." />
        }
      />
    </VerseRowBox>
  ),
};

/** Verse mode, not installed — the inline name stays beside the "Resource not installed" label. */
export const VerseNotInstalled: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="unavailable"
        zoomArea={STORY_ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={undefined}
      />
    </CellBox>
  ),
};

/** Verse mode, downloading — the inline name stays beside the unavailable placeholder + spinner. */
export const VerseDownloading: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="downloading"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={undefined}
      />
    </CellBox>
  ),
};

/** Verse mode, failed — the inline name stays beside the "Download failed" placeholder. */
export const VerseFailed: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="failed"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * Verse mode, long name — the inline label truncates at its width cap; hovering reveals the full
 * name via the tooltip (which opens only when the text is actually clipped).
 */
export const VerseLongName: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="New International Version 2011"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={<SampleEditorial />}
      />
    </VerseRowBox>
  ),
};

/**
 * Verse mode, long name in a pane narrower than the label's width cap — the inline name must still
 * show its truncation "…" at the visible edge (not a hard cut); hover reveals the full name.
 */
export const VerseLongNameNarrowPane: Story = {
  render: () => (
    <VerseRowBox width="110px">
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="New International Version 2011"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={<SampleEditorial />}
      />
    </VerseRowBox>
  ),
};

/** Verse mode, RTL long name — truncates on the inline-start (right) side; tooltip reveals it. */
export const VerseLongNameRightToLeft: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="תרגום השבעים המלא לפי מהדורת רלפס"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={<SampleEditorial rtl />}
      />
    </VerseRowBox>
  ),
};

/**
 * Verse mode, RTL long name in a pane narrower than the label's width cap — the truncation "…" must
 * still show at the visible inline-start (right) edge, mirroring the LTR narrow-pane case.
 */
export const VerseLongNameNarrowPaneRightToLeft: Story = {
  render: () => (
    <VerseRowBox width="110px">
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="תרגום השבעים המלא לפי מהדורת רלפס"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        nameDisplay="inline"
        editor={<SampleEditorial rtl />}
      />
    </VerseRowBox>
  ),
};

/**
 * Partial-failure row smoke: ready, failed, unavailable, and downloading cells side by side.
 * Neighbors stay independent — one non-ready cell does not blank its siblings. The `unavailable`
 * cell shows "Resource not installed" (not "Download failed") so the two failure modes are
 * distinguishable at a glance.
 */
export const PartialFailureRow: Story = {
  render: () => (
    <CellRowBox>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          copyLimit={undefined}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="failed"
          zoomArea={STORY_ZOOM_AREA}
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          copyLimit={undefined}
          editor={undefined}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="unavailable"
          zoomArea={STORY_ZOOM_AREA}
          label="NIV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          copyLimit={undefined}
          editor={undefined}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="downloading"
          zoomArea={STORY_ZOOM_AREA}
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          copyLimit={undefined}
          editor={undefined}
        />
      </div>
    </CellRowBox>
  ),
};

// ---------------------------------------------------------------------------
// Zoom menus — each story supplies `zoomMenuLabels`, so the right-click menu
// carries the zoom items and the header shows the "⋮" button (the component
// renders neither when the labels are absent). The level itself is the
// platform's content zoom; these stories show the menus' states only.
// ---------------------------------------------------------------------------

const zoomMenuLabels = {
  zoomIn: localizedStrings[ZOOM_IN_KEY] ?? 'Zoom in',
  zoomOut: localizedStrings[ZOOM_OUT_KEY] ?? 'Zoom out',
  reset: localizedStrings[RESET_ZOOM_KEY] ?? 'Zoom reset',
  options: localizedStrings[ZOOM_OPTIONS_KEY] ?? 'Zoom options for {resourceName}',
};

/** Zoom menus available: every item enabled, the "⋮" revealed on hover or focus of the header. */
export const ZoomMenus: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter />}
        canZoomIn
        canZoomOut
        canReset
        zoomMenuLabels={zoomMenuLabels}
      />
    </CellBox>
  ),
};

/**
 * Opens the "⋮" dropdown and asserts its three items. Lets reviewers confirm the affordance appears
 * on hover and the menu renders with the resource-named button.
 */
export const ZoomOptionsOpen: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter />}
        canZoomIn
        canZoomOut
        canReset
        zoomMenuLabels={zoomMenuLabels}
      />
    </CellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    // Radix DropdownMenu relies on PointerEvent sequences that a plain click does not synthesize.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await step('Hover the header to reveal the "⋮" button', async () => {
      await userEvent.hover(canvas.getByText('WEB'));
    });
    await step('Open the zoom options menu', async () => {
      await user.click(canvas.getByRole('button', { name: /zoom options for WEB/i }));
    });
    await step('Assert the three zoom items are visible', async () => {
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: /^zoom in/i })).toBeVisible();
      await expect(menu.getByRole('menuitem', { name: /^zoom out/i })).toBeVisible();
      await expect(menu.getByRole('menuitem', { name: /^zoom reset/i })).toBeVisible();
    });
  },
};

/** At 300 %: Zoom in is disabled, Zoom out and Zoom reset stay enabled. */
export const AtMaxZoomMenuOpen: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter />}
        canZoomIn={false}
        canZoomOut
        canReset
        zoomMenuLabels={zoomMenuLabels}
      />
    </CellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await step('Open the zoom options menu', async () => {
      await user.click(canvas.getByRole('button', { name: /zoom options for WEB/i }));
    });
    await step('Assert Zoom in is disabled and Zoom out is enabled', async () => {
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: /^zoom in/i })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
      await expect(menu.getByRole('menuitem', { name: /^zoom out/i })).not.toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  },
};

/** At 50 %: Zoom out is disabled, Zoom in stays enabled. */
export const AtMinZoomMenuOpen: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter />}
        canZoomIn
        canZoomOut={false}
        canReset
        zoomMenuLabels={zoomMenuLabels}
      />
    </CellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await step('Open the zoom options menu', async () => {
      await user.click(canvas.getByRole('button', { name: /zoom options for WEB/i }));
    });
    await step('Assert Zoom out is disabled', async () => {
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: /^zoom out/i })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  },
};

/**
 * A resource with no zoom level of its own follows the Tab content default zoom, so Zoom reset has
 * nothing to undo and is disabled.
 */
export const ResetDisabledWithoutOwnLevel: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter />}
        canZoomIn
        canZoomOut
        canReset={false}
        zoomMenuLabels={zoomMenuLabels}
      />
    </CellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await step('Open the zoom options menu', async () => {
      await user.click(canvas.getByRole('button', { name: /zoom options for WEB/i }));
    });
    await step('Assert Zoom reset is disabled', async () => {
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: /^zoom reset/i })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  },
};

/**
 * A very long resource label in the chapter-context header: shows how the header truncates and the
 * "⋮" button coexists without overflowing. No interaction needed — a visual smoke check for the
 * layout.
 */
export const LongLabel: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="World English Bible Revised 2023 Study Edition"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        editor={<SampleChapter />}
        zoomMenuLabels={zoomMenuLabels}
      />
    </CellBox>
  ),
};

/**
 * Ready, LTR, with the drag-handle grip visible in the cell header. In the app, supplying
 * `onReorder` to `ScriptureTextGrid` causes every chapter-view cell to receive
 * `showDragHandle={true}`. This story documents the grip's appearance in isolation.
 */
export const ReadyWithDragHandle: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        showDragHandle
        reorderHandleLabel="Reorder WEB"
        reorderHint="Drag or press arrow keys to reorder"
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/**
 * Ready, RTL, with the drag-handle grip visible. Documents that the grip placement is correct on
 * the RTL header, independent of the UI locale.
 */
export const ReadyRightToLeftWithDragHandle: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        showDragHandle
        reorderHandleLabel="Reorder עברית"
        reorderHint="Drag or press arrow keys to reorder"
        editor={<SampleChapter rtl />}
      />
    </CellBox>
  ),
};

/**
 * Mixed-direction row smoke: LTR English beside RTL Hebrew and Arabic. Each cell applies its own
 * `dir` on the content area, independent of the UI locale.
 */
export const MixedDirectionRow: Story = {
  render: () => (
    <CellRowBox>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          copyLimit={undefined}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          copyLimit={undefined}
          editor={<SampleChapter rtl />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="العربية"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          copyLimit={undefined}
          editor={
            <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 8px' }}>
                <sup>3</sup> طُوبَى لِلْمَسَاكِينِ بِالرُّوحِ
              </p>
            </div>
          }
        />
      </div>
    </CellRowBox>
  ),
};

/**
 * A resource whose chapter has no verses — some commentaries, or a chapter of front matter. The
 * aligned grid can only show verse blocks, so the cell says why the column is empty instead of
 * leaving the reader guessing.
 */
export const NoVersesToAlign: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="HBKENG"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        emptyMessage={localizedStrings[NO_VERSES_TO_SHOW_KEY]}
        contentOverflow="visible"
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/**
 * `contentOverflow="visible"` hands scrolling to an ancestor instead of the cell. The aligned grid
 * needs it: a cell that scrolls its own content cannot take part in the grid's shared rows, and
 * would drift out of step with its neighbours. Compare with `Ready`, which scrolls its own
 * content.
 */
export const ContentScrolledByAncestor: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        copyLimit={undefined}
        contentOverflow="visible"
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/**
 * The wrap-around shape: line 1 begins after the hanging name, line 2+ tuck beneath it at the row's
 * flush inline edge. This is what a two-column flex split cannot produce.
 */
export const VerseWrapAround: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial />}
      />
    </VerseRowBox>
  ),
};

/**
 * The same shape mirrored. `float: inline-start` resolves against the editor's own `direction`, so
 * no RTL-specific rule exists — this story is what proves that claim visually.
 */
export const VerseWrapAroundRightToLeft: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial rtl />}
      />
    </VerseRowBox>
  ),
};

/**
 * Rows with short, medium and long names. As in PT9 each name is as wide as its own text, so each
 * row's verse text begins right after its name and rows start line 1 on different columns.
 */
export const VerseNameAlignmentRow: Story = {
  render: () => (
    <VerseRowBox>
      <div>
        {['WEB', 'ESVUS16', 'A'].map((label) => (
          <ResourceCellView
            key={label}
            zoomArea={STORY_ZOOM_AREA}
            copyLimit={undefined}
            state="ready"
            label={label}
            textDirection="ltr"
            localizedStrings={localizedStrings}
            nameDisplay="inline"
            editor={<SampleEditorial />}
          />
        ))}
      </div>
    </VerseRowBox>
  ),
};

/**
 * The zoom-compensation proof. The name sits outside the zoomed subtree and the float inside it
 * divides by `--stg-zoom`, so rows at 0.5x, 1x and 2x, all with the same name, still start their
 * text on the same column.
 */
export const VerseNameAlignmentRowZoomed: Story = {
  render: () => (
    <VerseRowBox>
      <div>
        <ContentZoomStandIn levels={STORY_ZOOM_LEVELS} />
        {STORY_ZOOM_LEVELS.map((level) => (
          <ResourceCellView
            key={level}
            zoomArea={storyZoomAreaAt(level)}
            copyLimit={undefined}
            state="ready"
            label="WEB"
            textDirection="ltr"
            localizedStrings={localizedStrings}
            nameDisplay="inline"
            editor={<SampleEditorial />}
          />
        ))}
      </div>
    </VerseRowBox>
  ),
};

/**
 * Poetry keeps its hanging indent on the lines after the first. Line 1 sits beside the name, so its
 * hanging indent is dropped there rather than pulling the text back under the name; reserving the
 * name width with `text-indent` instead would destroy the indent on every line.
 */
export const VerseWrapAroundPoetry: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial poetry />}
      />
    </VerseRowBox>
  ),
};

/** Poetry under a name that fills the whole name area, where any overlap with line 1 would show. */
export const VerseWrapAroundPoetryLongName: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="Berean Standard Bible"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial poetry />}
      />
    </VerseRowBox>
  ),
};

/** A name long enough to truncate at the name's cap; the tooltip still reveals it in full. */
export const VerseLongNameTruncated: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="Berean Standard Bible 2024"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial />}
      />
    </VerseRowBox>
  ),
};

/**
 * The reorder grip in verse mode. It leads the row, before the name, as in the chapter header, and
 * is always visible.
 */
export const VerseWithGrip: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial />}
        showDragHandle
        reorderHandleId="web"
        reorderHandleLabel="Reorder WEB"
        reorderHint="Drag or press arrow keys to reorder"
      />
    </VerseRowBox>
  ),
};

/** The RTL grip, which mirrors with the row because its offset is logical, not left/right. */
export const VerseRightToLeftWithGrip: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial rtl />}
        showDragHandle
        reorderHandleId="heb"
        reorderHandleLabel="Reorder עברית"
        reorderHint="Drag or press arrow keys to reorder"
      />
    </VerseRowBox>
  ),
};

/**
 * A zoomed placeholder. Centered placeholders have no line boxes for the float to shorten, so they
 * reserve the name width with padding — compensated by the same factor.
 */
export const VerseZoomedPlaceholder: Story = {
  render: () => (
    <VerseRowBox>
      <ContentZoomStandIn levels={[2]} />
      <ResourceCellView
        zoomArea={storyZoomAreaAt(2)}
        copyLimit={undefined}
        state="downloading"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />
    </VerseRowBox>
  ),
};

/**
 * A short `\q1` line followed by a `\q2` line, at 50 % and 100 %. At 50 % the first block is
 * shorter than the unzoomed name, so the `\q2` line also starts beside the name, where its hanging
 * indent can pull it under the name.
 */
export const VersePoetryCoupletZoomedOut: Story = {
  render: () => (
    <VerseRowBox width="420px">
      <div className="tw:divide-y">
        <ContentZoomStandIn levels={[0.5, 1]} />
        {[0.5, 1].map((level) => (
          <ResourceCellView
            key={level}
            zoomArea={storyZoomAreaAt(level)}
            copyLimit={undefined}
            state="ready"
            label="WEB"
            textDirection="ltr"
            localizedStrings={localizedStrings}
            nameDisplay="inline"
            editor={<SamplePoetryCouplet />}
            showDragHandle
            reorderHandleId={`web-${level}`}
            reorderHandleLabel="Reorder WEB"
            onDisclosureActivate={() => {}}
            disclosureAccessibleName="WEB, PSA 23:1"
          />
        ))}
      </div>
    </VerseRowBox>
  ),
};

/**
 * Placeholder rows at 50 %, stacked as the grid stacks them. A placeholder has no float to hold the
 * row open, so the row is only as tall as its zoomed message, while the name and grip beside it
 * keep their unzoomed size.
 */
export const VersePlaceholderRowsZoomedOut: Story = {
  render: () => (
    <VerseRowBox width="420px">
      <div className="tw:divide-y">
        <ContentZoomStandIn levels={[0.5]} />
        <ResourceCellView
          zoomArea={storyZoomAreaAt(0.5)}
          copyLimit={undefined}
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          nameDisplay="inline"
          emptyMessage={localizedStrings[EMPTY_KEY]}
          editor={<SampleEditorial />}
          showDragHandle
          reorderHandleId="web-empty"
          reorderHandleLabel="Reorder WEB"
          onDisclosureActivate={() => {}}
          disclosureAccessibleName="WEB, PSA 23:1"
        />
        <ResourceCellView
          zoomArea={storyZoomAreaAt(0.5)}
          copyLimit={undefined}
          state="bookNotAvailable"
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          nameDisplay="inline"
          editor={undefined}
          showDragHandle
          reorderHandleId="kjv-book"
          reorderHandleLabel="Reorder KJV"
          onDisclosureActivate={() => {}}
          disclosureAccessibleName="KJV, PSA 23:1"
        />
        <ResourceCellView
          zoomArea={storyZoomAreaAt(0.5)}
          copyLimit={undefined}
          state="ready"
          label="ESV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          nameDisplay="inline"
          editor={<SampleEditorial />}
          showDragHandle
          reorderHandleId="esv"
          reorderHandleLabel="Reorder ESV"
          onDisclosureActivate={() => {}}
          disclosureAccessibleName="ESV, PSA 23:1"
        />
      </div>
    </VerseRowBox>
  ),
};

/**
 * The name as the row's disclosure control, collapsed. It is a real button — Tab reaches it, Enter
 * and Space activate it, and it carries the row's accessible name and `aria-expanded`. Built on the
 * shared `Button` so its focus ring matches the reorder grip and every other control in the view;
 * tab to it to compare.
 */
export const VerseDisclosureCollapsed: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial />}
        onDisclosureActivate={() => {}}
        disclosureAccessibleName="WEB, MAT 5:3"
        isDisclosureExpanded={false}
        disclosureControlsId="chapter-context-panel"
      />
    </VerseRowBox>
  ),
};

/**
 * The same control while its chapter-context panel is open. `aria-expanded` flips to true and
 * `aria-controls` points at the panel; in the grid the row behind it also takes the open-row tint,
 * which is what ties the panel back to the row that owns it.
 */
export const VerseDisclosureExpanded: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial />}
        onDisclosureActivate={() => {}}
        disclosureAccessibleName="WEB, MAT 5:3"
        isDisclosureExpanded
        disclosureControlsId="chapter-context-panel"
      />
      {/* Stands in for the grid's panel so `aria-controls` points at a real element. */}
      <div id="chapter-context-panel" hidden />
    </VerseRowBox>
  ),
};

/**
 * A long name in the disclosure control: it truncates at the name's cap exactly as the
 * presentational label does, and the tooltip reveals the full name only when actually clipped.
 */
export const VerseDisclosureLongName: Story = {
  render: () => (
    <VerseRowBox>
      <ResourceCellView
        zoomArea={STORY_ZOOM_AREA}
        copyLimit={undefined}
        state="ready"
        label="Berean Standard Bible 2024"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleEditorial />}
        onDisclosureActivate={() => {}}
        disclosureAccessibleName="Berean Standard Bible 2024, MAT 5:3"
        isDisclosureExpanded={false}
      />
    </VerseRowBox>
  ),
};
