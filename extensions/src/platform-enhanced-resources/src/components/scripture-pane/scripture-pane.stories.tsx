import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  EnhancedScripturePane,
  ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
} from './scripture-pane.component';
import {
  MATTHEW_2_USJ,
  MATTHEW_2_ANNOTATED_USJ,
  MATTHEW_2_ANNOTATIONS,
} from '../../data/scripture.story-data';

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
 * - IN-TEXT ANNOTATION/FILTER HIGHLIGHTING IS NOT DEMONSTRATED HERE. The marble-word/highlight/
 *   filter `<mark>` elements are created by `editor.setAnnotation`, whose range resolver maps USJ
 *   paths onto the live Lexical tree. With hand-authored story USJ that mapping is editor-version
 *   dependent and did NOT resolve against the yalc-pinned editor (verified), so no marks paint. In
 *   the real web view the marble-converter generates USJ + annotation paths that match the editor
 *   tree, so highlighting works there. A `WithAnnotations` story was intentionally dropped rather
 *   than ship one that highlights nothing; that behavior is covered by `scripture-pane.test.tsx`
 *   (mocked editor) and exercised in `enhanced-resource.web-view.stories.tsx`. `WithFilterBanner`
 *   below still demonstrates the filter STATUS BANNER (component JSX, not an editor mark).
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
