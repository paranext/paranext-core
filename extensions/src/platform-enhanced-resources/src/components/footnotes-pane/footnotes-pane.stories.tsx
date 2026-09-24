import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useMemo, useState } from 'react';
import type { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import type { UseWebViewStateHook } from '@papi/core';
import { EnhancedResourceFootnotesPane } from './footnotes-pane.component';
import { MATTHEW_1_AND_2_USJ, NO_NOTES_USJ } from '../../data/scripture.story-data';

/**
 * Storybook for `EnhancedResourceFootnotesPane` (gap G4 / FN bottom-pane footnotes layout, see
 * `ui-spec-marble-form.md` htmlFootnotes / EVD-004).
 *
 * The component discovers notes itself by running `UsjReaderWriter.findAllNotes()` over the
 * supplied `usj` - it has NO localized-string props, so there is no `getLocalizedStrings(...)`
 * wiring here (the rendered note text comes from the USJ note markers themselves via the
 * platform-bible-react `FootnoteList`).
 *
 * USJ DATA: the populated stories use REAL WEB scripture USJ - `MATTHEW_1_AND_2_USJ` from
 * `src/data/scripture.story-data.ts`, copied from the platform-bible-utils sample fixture
 * `web-matthew-1-and-2.usj`. It carries 10 real notes (6 `\f` footnotes + 4 `\x` cross-references),
 * so the FootnoteList shows a realistic mix of footnote and cross-reference rows. See the
 * story-data file header for why the content is embedded rather than imported across packages.
 *
 * DEFAULT-HIDDEN BEHAVIOR: in the live app this footnotes panel WRAPS the scripture pane and is
 * HIDDEN by default (`showFootnotes` defaults to false; toggled via F7 / the "Show footnotes" View
 * menu item). These stories default to the VISIBLE state purely for demonstration - the `Collapsed`
 * story shows the real initial app state.
 */

/**
 * Stand-in for `UseWebViewStateHook`. Matches the real 3-tuple shape `[value, setValue,
 * resetValue]` and always returns the supplied default for the value. This mirrors the mock in
 * footnotes-pane.test.tsx - the component reads the pane-size default and writes through the
 * setter; the story does not need the written value to round-trip (resize still works live via the
 * ResizablePanelGroup's own DOM state). Production supplies the real host WebView state hook.
 */
function useStoryWebViewState(): UseWebViewStateHook {
  return useMemo<UseWebViewStateHook>(
    () =>
      function hook<T>(_key: string, defaultValue: T): [T, (value: T) => void, () => void] {
        return [defaultValue, () => {}, () => {}];
      },
    [],
  );
}

/** Placeholder scripture-pane child so the top panel has visible content in the canvas. */
function ScripturePlaceholder() {
  return (
    <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:bg-card tw:p-4 tw:text-sm tw:text-muted-foreground">
      (scripture pane renders here)
    </div>
  );
}

const meta: Meta<typeof EnhancedResourceFootnotesPane> = {
  title: 'Bundled Extensions/platform-enhanced-resources/FootnotesPane',
  component: EnhancedResourceFootnotesPane,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      // The component fills its container height (it installs a ResizeObserver and computes pane
      // size limits from clientHeight), so give it a fixed-size bordered box in the canvas.
      <div className="tw:h-[520px] tw:w-[420px] tw:border tw:border-border">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EnhancedResourceFootnotesPane>;

/**
 * Default - fully interactive (REV-006). The footnote selection is driven by real `useState`
 * setters, not `() => {}` stubs:
 *
 * - Click a row in the footnote list; `onFootnoteSelected` fires and the selected note + index are
 *   surfaced inline so the reviewer can confirm selection round-trips through `selectedFootnote`.
 * - Toggle "Show footnotes" to exercise the `isVisible` collapse path (BHV / EVD-004): when off, only
 *   the scripture-pane child renders and the bottom panel + resize handle disappear.
 * - Drag the resize handle between the two panels to resize the footnote pane (the size is not
 *   persisted in the story - the WebView-state stand-in returns the default each render).
 */
function InteractiveFootnotesPaneDemo() {
  const useWebViewState = useStoryWebViewState();
  const [isVisible, setIsVisible] = useState(true);
  const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:border-b tw:border-border tw:p-2 tw:text-xs">
        <label className="tw:flex tw:items-center tw:gap-1">
          <input
            type="checkbox"
            checked={isVisible}
            onChange={(e) => setIsVisible(e.target.checked)}
          />
          Show footnotes (isVisible)
        </label>
        <span className="tw:text-muted-foreground">
          selected index: {selectedIndex ?? '(none)'} · marker:{' '}
          {selectedFootnote?.marker ?? '(none)'}
        </span>
      </div>
      <div className="tw:min-h-0 tw:flex-1">
        <EnhancedResourceFootnotesPane
          usj={MATTHEW_1_AND_2_USJ}
          isVisible={isVisible}
          useWebViewState={useWebViewState}
          selectedFootnote={selectedFootnote}
          onFootnoteSelected={(footnote, index) => {
            setSelectedFootnote(footnote);
            setSelectedIndex(index);
          }}
        >
          <ScripturePlaceholder />
        </EnhancedResourceFootnotesPane>
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <InteractiveFootnotesPaneDemo />,
};

/**
 * Visible - the footnotes pane expanded below the scripture child, listing all 10 notes (6
 * footnotes and 4 cross-references) discovered in the WEB Matthew 1-2 USJ (EVD-004: scripture pane
 * split, footnotes visible below). Static export so Chromatic captures the split layout
 * deterministically.
 */
export const Visible: Story = {
  args: {
    usj: MATTHEW_1_AND_2_USJ,
    isVisible: true,
    children: <ScripturePlaceholder />,
  },
  render: function Render(args) {
    const useWebViewState = useStoryWebViewState();
    return <EnhancedResourceFootnotesPane {...args} useWebViewState={useWebViewState} />;
  },
};

/**
 * Collapsed - `isVisible={false}`. Only the scripture-pane child renders; the footnote list, resize
 * handle, and bottom panel are not mounted. This is the default ER state before the user toggles
 * "Show footnotes" (htmlFootnotes "Initially collapsed by default").
 */
export const Collapsed: Story = {
  args: {
    usj: MATTHEW_1_AND_2_USJ,
    isVisible: false,
    children: <ScripturePlaceholder />,
  },
  render: function Render(args) {
    const useWebViewState = useStoryWebViewState();
    return <EnhancedResourceFootnotesPane {...args} useWebViewState={useWebViewState} />;
  },
};

/**
 * EmptyNoNotes - visible pane over a chapter USJ with no note markers; `findAllNotes()` returns an
 * empty list so the FootnoteList renders its empty state.
 */
export const EmptyNoNotes: Story = {
  args: {
    usj: NO_NOTES_USJ,
    isVisible: true,
    children: <ScripturePlaceholder />,
  },
  render: function Render(args) {
    const useWebViewState = useStoryWebViewState();
    return <EnhancedResourceFootnotesPane {...args} useWebViewState={useWebViewState} />;
  },
};

/**
 * NoUsj - visible pane with `usj={undefined}`. The component clears its footnote list (the effect
 * short-circuits to `setFootnotes([])`), so the FootnoteList is empty even though the pane is
 * shown.
 */
export const NoUsj: Story = {
  args: {
    usj: undefined,
    isVisible: true,
    children: <ScripturePlaceholder />,
  },
  render: function Render(args) {
    const useWebViewState = useStoryWebViewState();
    return <EnhancedResourceFootnotesPane {...args} useWebViewState={useWebViewState} />;
  },
};
