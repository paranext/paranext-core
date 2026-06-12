import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { useState, type ComponentProps } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
// The Lexical editor's USJ-node styles (verse numbers, paragraph treatment, etc). The real app
// loads these globally via `enhanced-resource.web-view.scss` (`@use './usj-nodes'`); Storybook
// doesn't load that bundle, so without this import the USJ nodes render without their visual
// treatment. The minimal editor-container wrapper styles are inlined as `EDITOR_WRAPPER_STYLE`
// below (the full `editor.css` references toolbar SVGs by absolute URL the css-loader can't
// resolve). `nodes-menu.css` is deliberately NOT imported: it only styles the built-in autocomplete
// menu which never renders when the editor runs with `hasExternalUI: true` (which we do), and
// upstream PR paranext/paranext-core#2376 deletes the file altogether for the same reason.
/* eslint-disable import/no-relative-packages -- the demo `usj-nodes.css` is not part of
   platform-bible-react's package exports (only `.` → dist is exported), so it can only be pulled
   in by relative path; this mirrors the existing pattern in
   src/stories/platform/ten-layout-shared.tsx and platform-scripture-editor's stories. */
import '../../../../../../lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css';
/* eslint-enable import/no-relative-packages */
import {
  EnhancedScripturePane,
  ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
} from './scripture-pane.component';
import {
  MATTHEW_2_USJ,
  MATTHEW_2_ANNOTATED_USJ,
  MATTHEW_2_ANNOTATIONS,
} from '../../data/scripture.story-data';
import { convertMarbleChapterXml } from '../../lib/marble-converter';

/**
 * Icon-free subset of the editor's wrapper styles (from the platform scripture-editor
 * `editor.css`). Hides the read-only toolbar container so the editor's current-marker label doesn't
 * show as stray text above the editor. Matches `EDITOR_WRAPPER_STYLE` in
 * `model-text-panel.stories.tsx`.
 */
const EDITOR_WRAPPER_STYLE = `
  .editor-container { color: inherit; position: relative; line-height: 20px; font-weight: 400; text-align: start; }
  .editor-toolbar-container-readonly { display: none; }
  .editor-toolbar-container-editable { display: inline; }
  .editor-inner { position: relative; }
  .editor-input { min-height: 150px; font-size: 15px; position: relative; tab-size: 1; outline: 0; padding: 15px 10px; flex: auto; }
  .editor-input > p { direction: inherit; margin-top: 0; margin-bottom: 0; line-height: 1.5; }
  .editor-text-bold { font-weight: bold; }
  .editor-text-italic { font-style: italic; }
  .editor-text-underline { text-decoration: underline; }
`;

/**
 * Storybook for `EnhancedScripturePane` - the read-only scripture renderer for the Enhanced
 * Resources web view (replaces the design-phase placeholder; see scripture-pane.component.tsx).
 *
 * USJ DATA: these stories render REAL WEB scripture USJ copied from the platform-bible-utils sample
 * fixtures (`web-matthew-2-verse-range.usj`) into `src/data/scripture.story-data.ts`. See that
 * file's header for why the content is embedded rather than imported across packages. Verse numbers
 * render correctly because the markers come from real USFM-derived USJ.
 *
 * IMPORTANT REVIEWER NOTES - what these stories can and cannot exercise:
 *
 * - The component wraps a REAL `<Editorial>` Lexical editor (`@eten-tech-foundation/platform-editor`)
 *   in readonly mode. The scripture stories mount the live editor with USJ data, the same way
 *   `enhanced-resource.web-view.stories.tsx` does. That render path is proven to work in
 *   Storybook.
 * - ZOOM: there is NO in-app zoom slider. `scripturePaneZoom` is a numeric prop driven by the View
 *   menu / Ctrl+± / Ctrl+0. It is exposed here as a Storybook `number`/range CONTROL (in the
 *   Controls addon panel), not as fake in-pane UI. The `Zoomed` story pins a fixed value for
 *   snapshots.
 * - The marble HOVER POPOVER + backend tooltip lifecycle (mouseenter -> papi.overlays.showPopover ->
 *   erProxy.buildTooltipData -> ...) CANNOT be exercised here: there is no `papi.overlays` overlay
 *   service and no live `erProxy` network object in Storybook. The component swallows the resulting
 *   errors (logger.warn + early return), so hovering an annotated word is harmless but produces NO
 *   popover. Hover/tooltip behavior is covered by `scripture-pane.test.tsx` (Vitest, with mocked
 *   papi.overlays + erProxy) and previewed in `scripture-pane-tooltip.stories.tsx`.
 * - IN-TEXT MARBLE HIGHLIGHTING is demonstrated by the `OverlayStates` story below. It feeds a small
 *   marble XML chapter through `convertMarbleChapterXml` (the same production path the web view
 *   uses), which produces USJ + annotation paths that match the live editor's annotation resolver.
 *   Hand-authored fixtures like `MATTHEW_2_ANNOTATED_USJ` do NOT resolve under the yalc-pinned
 *   editor (verified) and so do not paint marks - `WithFilterBanner` still uses that fixture only
 *   for its filter STATUS BANNER (component JSX, not an editor mark).
 */

const localizedStrings = getLocalizedStrings([...ENHANCED_SCRIPTURE_PANE_STRING_KEYS]);

const SCR_REF_MAT_2_1: SerializedVerseRef = { book: 'MAT', chapterNum: 2, verseNum: 1 };

const meta: Meta<typeof EnhancedScripturePane> = {
  title: 'Bundled Extensions/platform-enhanced-resources/ScripturePane',
  component: EnhancedScripturePane,
  tags: ['autodocs'],
  args: {
    usj: MATTHEW_2_USJ,
    annotations: [],
    scrRef: SCR_REF_MAT_2_1,
    scripturePaneZoom: 1,
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  argTypes: {
    // Zoom is the View-menu-driven font scale (Ctrl+± / Ctrl+0). Exposed as a real Storybook range
    // control - NOT as in-pane UI, since the app itself has no zoom slider.
    scripturePaneZoom: {
      control: { type: 'range', min: 0.75, max: 2, step: 0.25 },
      description: 'Font scale applied to the rendered scripture (1.0 = 100%). View-menu driven.',
    },
    filteredTokenSurface: {
      control: 'text',
      description: 'Surface form of the filtered token; drives the filter-active status banner.',
    },
    // Imperative editor / async boundaries that are not meaningful to twiddle from Controls.
    onTokenClick: { table: { disable: true } },
    onTokenContextMenu: { table: { disable: true } },
    erProxy: { table: { disable: true } },
    localizedStringsWithLoadingState: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="tw:h-[420px] tw:w-[560px] tw:border tw:border-border">
        {/* Inject the editor-container wrapper styles inline. Putting them in a <style> tag keeps
            them scoped to the stories file (no global side-effects) and ensures they load before
            the editor mounts. */}
        <style>{EDITOR_WRAPPER_STYLE}</style>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EnhancedScripturePane>;

/**
 * Default - the live Editorial render over real WEB Matthew 2 USJ. Fully interactive per REV-006:
 * the component uses its own real state internally, and reviewers drive the props (zoom, filter
 * surface, loading/error/empty) from the Storybook Controls panel rather than via fake in-pane
 * widgets. Snapshot disabled because the Lexical editor mounts asynchronously.
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
};

/**
 * WithScripture - the live Editorial render over the plain WEB Matthew 2 chapter USJ, no
 * annotations. Proven viable (the web-view shell story renders this component the same way).
 *
 * NOTE FOR REVIEWER: the Lexical editor mounts asynchronously, so a Chromatic snapshot may catch it
 * mid-mount. Snapshot disabled for determinism.
 */
export const WithScripture: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
};

/**
 * Zoomed - the live render at 1.5x font scale, demonstrating the `scripturePaneZoom` prop the View
 * menu drives. Confirms the prop applies without any in-pane control.
 */
export const Zoomed: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    scripturePaneZoom: 1.5,
  },
};

/** Loading - the Skeleton placeholder (aria-busy). Top-level state; overrides empty/scripture. */
export const Loading: Story = {
  args: {
    usj: undefined,
    isLoading: true,
  },
};

/** Empty - `usj` undefined and not loading; the "No content / Open a resource" card. */
export const Empty: Story = {
  args: {
    usj: undefined,
  },
};

/** Error - `errorMessage` set; the destructive Alert overrides loading/empty/scripture. */
export const Error: Story = {
  args: {
    usj: undefined,
    errorMessage: 'Failed to load chapter from the resource.',
  },
};

/**
 * WithFilterBanner - live scripture plus the "filter active" STATUS BANNER (BHV-301/302). The
 * banner is component JSX driven by `filteredTokenId`/`filteredTokenSurface`, so it renders
 * reliably. (The matching in-text filter highlight on the token is an editor mark and shares the
 * resolver caveat in the file header, so it is not relied on here.)
 */
export const WithFilterBanner: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    usj: MATTHEW_2_ANNOTATED_USJ,
    annotations: MATTHEW_2_ANNOTATIONS,
    filteredTokenId: 'wg-mat2-1-jesus',
    filteredTokenSurface: 'Jesus',
  },
};

/**
 * OverlayStates - demonstrates the two-color overlay system on a small chapter built from real
 * marble XML run through `convertMarbleChapterXml`. This is the same production data path the web
 * view uses (`loadMarbleChapterXml` → `convertMarbleChapterXml` → editor), so the resulting USJ
 * paths line up with the editor's annotation resolver - unlike the hand-authored
 * `MATTHEW_2_ANNOTATED_USJ` fixture, which doesn't resolve under the yalc-pinned editor (0.8.15).
 *
 * Exercises three behaviors in one story:
 *
 * - Two combined-expression groups: "beginning"/"created"/"heavens"/"earth" share one lemma
 *   (rēšīṯ-bāraʾ pairing), and "darkness"/"night" share another (laylāh group). Hovering any word
 *   inside a group lights up every word in that group in deeper blue (Color B).
 * - Two independent tokens: "Spirit" and "light" each carry their own unique lemma, so hovering
 *   either only lights up that one word.
 * - In-pane "Highlight all" button: toggles Color A (pale blue baseline) on every linked research
 *   term. Color B still wins on the hovered group when both states are active, demonstrating the
 *   higher-specificity layering. The `highlightAllResearchTerms` Storybook control mirrors the same
 *   prop for reviewers who prefer the Controls panel.
 *
 * Hover popovers do NOT fire in Storybook (no `papi.overlays` service); only the in-text overlay
 * color change is observable here. Tooltip rendering is covered by
 * `scripture-pane-tooltip.stories.tsx` + `scripture-pane.test.tsx`.
 */
// Marble chapter XML for a Genesis 1:1-3 excerpt with six <wg> linked-research-term tokens:
//
//   - Group "rēšīṯ-bāraʾ" (4 words sharing the SDBH:creation:001 lemma): "beginning", "created",
//     "heavens", "earth". Hovering any of the four lights up all four.
//   - Group "laylāh" (2 words sharing SDBH:darkness:002): "darkness", "night". Hovering either
//     lights up both.
//   - Independents (each with its own lemma): "Spirit" (SDBH:rûaḥ:003), "light" (SDBH:ʾôr:004).
//     Hovering either only lights up that single word.
const OVERLAY_DEMO_MARBLE_XML = `
  <usx_book code="GEN">
    <chapter style="c" code="GEN" chapter="1"/>
    <para style="p">
      <verse style="v" code="GEN" pubnumber="1"/>
      In the
      <wg id="1001" strong="H7225" lexical_links="SDBH:creation:001">beginning</wg>
      God
      <wg id="1002" strong="H1254" lexical_links="SDBH:creation:001">created</wg>
      the
      <wg id="1003" strong="H8064" lexical_links="SDBH:creation:001">heavens</wg>
      and the
      <wg id="1004" strong="H0776" lexical_links="SDBH:creation:001">earth</wg>.
      <verse style="v" code="GEN" pubnumber="2"/>
      And
      <wg id="1005" strong="H2822" lexical_links="SDBH:darkness:002">darkness</wg>
      was upon the face of the deep, and the
      <wg id="1006" strong="H7307" lexical_links="SDBH:ruah:003">Spirit</wg>
      of God moved upon the face of the waters.
      <verse style="v" code="GEN" pubnumber="3"/>
      And God said, Let there be
      <wg id="1007" strong="H0216" lexical_links="SDBH:or:004">light</wg>,
      and God called the
      <wg id="1008" strong="H3915" lexical_links="SDBH:darkness:002">night</wg>.
    </para>
  </usx_book>`;

const overlayDemo = convertMarbleChapterXml(OVERLAY_DEMO_MARBLE_XML);

/**
 * Render function that pairs the pane with a visible "Highlight all" button so reviewers can toggle
 * Color A in-place rather than having to find the Controls panel. The button label reflects the
 * current state and the Storybook `highlightAllResearchTerms` arg seeds the initial state, so the
 * Controls panel and the button stay in sync at mount.
 */
function OverlayStatesRender({
  highlightAllResearchTerms: initialHighlight = false,
  ...rest
}: ComponentProps<typeof EnhancedScripturePane>) {
  const [highlightAll, setHighlightAll] = useState(initialHighlight);
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:border-border tw:bg-muted tw:p-2">
        <span className="tw:text-xs tw:text-muted-foreground">
          Hover any linked research term to see the matching group.
        </span>
        <Button
          variant={highlightAll ? 'secondary' : 'outline'}
          size="sm"
          aria-pressed={highlightAll}
          onClick={() => setHighlightAll((prev) => !prev)}
        >
          {highlightAll ? 'Highlight all: ON' : 'Highlight all: OFF'}
        </Button>
      </div>
      <div className="tw:flex-1 tw:overflow-auto">
        <EnhancedScripturePane {...rest} highlightAllResearchTerms={highlightAll} />
      </div>
    </div>
  );
}

export const OverlayStates: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  argTypes: {
    highlightAllResearchTerms: {
      control: 'boolean',
      description:
        'Initial state of the in-pane "Highlight all" toggle (Color A baseline overlay on every research term). The toggle itself lives in the story header so it stays visible while you hover words.',
    },
  },
  args: {
    usj: overlayDemo.usj,
    annotations: overlayDemo.annotations,
    highlightAllResearchTerms: false,
    scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
  },
  render: (args) => <OverlayStatesRender {...args} />,
};
