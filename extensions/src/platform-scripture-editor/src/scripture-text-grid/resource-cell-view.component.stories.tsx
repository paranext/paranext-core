import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  RESET_ZOOM_KEY,
  RESOURCE_CELL_STRING_KEYS,
  ResourceCellView,
  ZOOM_IN_KEY,
  ZOOM_OPTIONS_KEY,
  ZOOM_OUT_KEY,
} from './resource-cell-view.component';

/**
 * One cell of the Scripture Text Grid: a single resource's focused chapter. In the app the
 * connected `ResourceCell` fetches the chapter USJ and feeds a read-only `Editorial`; these stories
 * drive the presentational `ResourceCellView` directly so every state — downloading, failed, and
 * ready (LTR and RTL) — is reachable without a backend.
 *
 * `ResourceCellView` is purely presentational — role, focus, and accessible name live on the parent
 * verse `listitem` in `ScriptureTextGrid`. Stories wrap it in a plain bounded box.
 */
const meta: Meta<typeof ResourceCellView> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceCell',
  component: ResourceCellView,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ResourceCellView>;

const localizedStrings = getLocalizedStrings([...RESOURCE_CELL_STRING_KEYS]);

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

/** Wraps one cell in a bounded column (preserves single-cell stories). */
function CellBox({ children }: { children: React.ReactNode }) {
  return <div style={CELL_BOX_STYLE}>{children}</div>;
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

/** Stand-in for the read-only `Editorial` when showing a single verse (poetry-style). */
function SampleVerse({ rtl = false }: { rtl?: boolean }) {
  const text = rtl
    ? 'אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ בַּעֲצַת רְשָׁעִים'
    : 'Blessed are the poor in spirit, for theirs is the kingdom of heaven.';
  return (
    <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
      <p style={{ margin: 0 }}>
        <sup>3</sup> {text}
      </p>
    </div>
  );
}

/** Chapter USJ is still downloading — a Spinner plus the localized "Downloading…" subtitle. */
export const Downloading: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="downloading"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
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
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
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
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/** A right-to-left resource: the cell honors the resource's own `dir`, independent of the UI locale. */
export const ReadyRightToLeft: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        editor={<SampleChapter rtl />}
      />
    </CellBox>
  ),
};

/** Verse mode, ready — the inline hanging name sits before a single verse (stand-in). */
export const VerseReady: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse />}
      />
    </CellBox>
  ),
};

/** Verse mode, empty — no text for the focused verse (e.g. verse 0). */
export const VerseEmpty: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        isVerseEmpty
        editor={undefined}
      />
    </CellBox>
  ),
};

/** Single-cell RTL verse: the resource's own `dir`, independent of the UI locale. */
export const VerseRightToLeft: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse rtl />}
      />
    </CellBox>
  ),
};

/**
 * Verse mode, inline name beside a longer verse — shows the verse text wrapping within its own
 * column to the right of the name (the P9-style compact treatment; later lines stay in the text
 * column rather than tucking under the name).
 */
export const VerseInlineWrapping: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={
          <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
            <p style={{ margin: 0 }}>
              <sup>3</sup> Blessed are the poor in spirit, for theirs is the kingdom of heaven, and
              great is their reward in the days to come.
            </p>
          </div>
        }
      />
    </CellBox>
  ),
};

/** Verse mode, downloading — the inline name stays beside the offline placeholder + spinner. */
export const VerseDownloading: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="downloading"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
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
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
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
    <CellBox>
      <ResourceCellView
        state="ready"
        label="New International Version 2011"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse />}
      />
    </CellBox>
  ),
};

/** Verse mode, RTL long name — truncates on the inline-start (right) side; tooltip reveals it. */
export const VerseLongNameRightToLeft: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="תרגום השבעים המלא לפי מהדורת רלפס"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse rtl />}
      />
    </CellBox>
  ),
};

/**
 * Partial-failure row smoke: ready, failed, and downloading cells side by side. Neighbors stay
 * independent — one offline cell does not blank its siblings.
 */
export const PartialFailureRow: Story = {
  render: () => (
    <CellRowBox>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="failed"
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="downloading"
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </div>
    </CellRowBox>
  ),
};

// ---------------------------------------------------------------------------
// Zoom states — each story supplies `zoomMenuLabels` so the context menu and
// kebab button are both rendered (the component hides both when it is absent).
// ---------------------------------------------------------------------------

const zoomMenuLabels = {
  zoomIn: localizedStrings[ZOOM_IN_KEY] ?? 'Zoom In',
  zoomOut: localizedStrings[ZOOM_OUT_KEY] ?? 'Zoom Out',
  reset: localizedStrings[RESET_ZOOM_KEY] ?? 'Reset Zoom',
  options: localizedStrings[ZOOM_OPTIONS_KEY] ?? 'Zoom options',
};

/**
 * Default zoom (factor = 1): both Zoom In and Zoom Out are available, and the kebab / context menu
 * are visible because `zoomMenuLabels` is provided.
 */
export const ZoomDefault: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
};

/** Zoomed in (factor = 1.4): the content area is enlarged; both actions remain enabled. */
export const ZoomedIn: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={1.4}
        canZoomIn
        canZoomOut
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
};

/**
 * At maximum zoom (factor = 3): `canZoomIn` is false so the Zoom In menu item is disabled; Zoom Out
 * and Reset are still enabled.
 */
export const AtMaxZoom: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={3}
        canZoomIn={false}
        canZoomOut
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
};

/**
 * At minimum zoom (factor = 0.5): `canZoomOut` is false so the Zoom Out menu item is disabled; Zoom
 * In and Reset are still enabled.
 */
export const AtMinZoom: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={0.5}
        canZoomIn
        canZoomOut={false}
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
};

// ---------------------------------------------------------------------------
// Zoom interaction stories — play functions exercise the kebab dropdown so
// reviewers can verify the affordance + ARIA state without running the full
// app. (Right-click zoom is delivered through the editor's own context menu
// via `EditorOptions.contextMenu`, which needs the real editor, so it is
// verified manually in the app rather than in a story.)
//
// Radix DropdownMenu relies on PointerEvent sequences that a
// plain `userEvent.click()` without setup does not synthesise. Using
// `userEvent.setup({ pointerEventsCheck: 0 })` (the same pattern as the
// unit tests) keeps things reliable in both jsdom and Storybook's browser
// test-runner.
// ---------------------------------------------------------------------------

/**
 * Opens the kebab dropdown and asserts all three menu items are visible. Lets reviewers confirm the
 * affordance appears on hover and the menu renders with the correct labels.
 */
export const ZoomKebabOpen: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });

    await step('Hover the cell header to reveal the kebab', async () => {
      // ResourceCellView is presentational (no gridcell role); hover the header label, which sits
      // inside the `group` whose hover reveals the kebab.
      const header = canvas.getByText('WEB');
      await userEvent.hover(header);
    });

    await step('Click the kebab to open the zoom menu', async () => {
      const kebab = canvas.getByRole('button', { name: 'Zoom options for WEB' });
      await user.click(kebab);
    });

    await step('Assert all three menu items are visible', async () => {
      // Radix renders the menu portal at the document root; use `within(document.body)`.
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: 'Zoom In' })).toBeVisible();
      await expect(menu.getByRole('menuitem', { name: 'Zoom Out' })).toBeVisible();
      await expect(menu.getByRole('menuitem', { name: 'Reset Zoom' })).toBeVisible();
    });
  },
};

/**
 * At maximum zoom: "Zoom In" is disabled in the dropdown while "Zoom Out" remains enabled. Lets
 * reviewers confirm the bound-guarding is reflected in the menu affordance.
 */
export const AtMaxZoomMenuOpen: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={3}
        canZoomIn={false}
        canZoomOut
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });

    await step('Open the kebab menu', async () => {
      const kebab = canvas.getByRole('button', { name: 'Zoom options for WEB' });
      await user.click(kebab);
    });

    await step('Assert Zoom In is disabled and Zoom Out is enabled', async () => {
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: 'Zoom In' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
      await expect(menu.getByRole('menuitem', { name: 'Zoom Out' })).not.toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  },
};

/** At minimum zoom: "Zoom Out" is disabled in the dropdown while "Zoom In" remains enabled. */
export const AtMinZoomMenuOpen: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={0.5}
        canZoomIn
        canZoomOut={false}
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });

    await step('Open the kebab menu', async () => {
      const kebab = canvas.getByRole('button', { name: 'Zoom options for WEB' });
      await user.click(kebab);
    });

    await step('Assert Zoom Out is disabled', async () => {
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: 'Zoom Out' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  },
};

/**
 * At the default factor (= 1), `canReset` is false: "Reset Zoom" is disabled. Documents the
 * disable-at-default behavior so reviewers can verify it is reflected in the menu affordance.
 */
export const ResetDisabledAtDefault: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        canReset={false}
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });

    await step('Open the kebab menu', async () => {
      const kebab = canvas.getByRole('button', { name: 'Zoom options for WEB' });
      await user.click(kebab);
    });

    await step('Assert Reset Zoom is disabled at the default factor', async () => {
      const menu = within(canvas.getByRole('menu'));
      await expect(menu.getByRole('menuitem', { name: 'Reset Zoom' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  },
};

/**
 * A very long resource label: shows how the header truncates and the kebab coexists without
 * overflowing. No interaction needed — a visual smoke check for the layout.
 */
export const LongLabelWithZoom: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="World English Bible Revised 2023 Study Edition"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridCellBox>
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
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<SampleChapter rtl />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          label="العربية"
          textDirection="rtl"
          localizedStrings={localizedStrings}
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
