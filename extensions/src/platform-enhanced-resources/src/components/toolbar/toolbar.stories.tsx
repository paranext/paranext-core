import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  EnhancedResourceTabBar,
  EnhancedResourceTopToolbar,
  Toolbar,
  TOOLBAR_STRING_KEYS,
  type HighlightMode,
  type MarbleScope,
  type ResearchTab,
  type ScriptDisplayMode,
  type ViewMenuState,
} from './toolbar.component';

const localizedStrings = getLocalizedStrings([...TOOLBAR_STRING_KEYS]);

const meta: Meta<typeof Toolbar> = {
  title: 'Bundled Extensions/platform-enhanced-resources/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

/**
 * [Revised: 2026-04-29] Theme 4 — fully interactive default story. Drives every Toolbar prop with
 * local state so reviewers can:
 *
 * - Open the hamburger view-menu and toggle Show footnotes / Show translations / H&G display modes /
 *   fire Find/Close/Zoom commands
 * - Click the BCV button (logs — wiring lives in phase-3-ui FN-015)
 * - Toggle the "all research terms" highlight
 * - Click the info button (logs — wiring opens MarbleGuide in phase-3-ui FN-016)
 * - Switch scroll groups
 * - Switch tabs and scopes
 * - Exercise the filter input + clear button (Theme 9): the parent seeds a value in `filterText` so
 *   the Input becomes visible, and clearing via X drops it back to empty + hides it.
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [activeTab, setActiveTab] = useState<ResearchTab>('dictionary');
    const [scope, setScope] = useState<MarbleScope>('current-verse');
    const [highlightMode, setHighlightMode] = useState<HighlightMode>('none');
    const [scrollGroupId, setScrollGroupId] = useState<number | undefined>(0);
    const [filterText, setFilterText] = useState<string>('');
    const [hasMatches, setHasMatches] = useState<boolean>(true);
    const [viewMenu, setViewMenu] = useState<ViewMenuState>({
      showFootnotes: false,
      showTranslations: true,
      hebrewDisplayMode: 'both',
      greekDisplayMode: 'both',
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Toolbar
          localizedStringsWithLoadingState={[localizedStrings, false]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          scope={scope}
          onScopeChange={setScope}
          hasSenseScope
          searchValue={filterText}
          onSearchChange={setFilterText}
          hasMatches={hasMatches}
          highlightMode={highlightMode}
          onHighlightModeChange={setHighlightMode}
          onInfoClick={() => alert('Phase-3-ui wires this to MarbleGuide (FN-016).')}
          onReferenceClick={() => alert('Phase-3-ui wires this to BookChapterControl (FN-015).')}
          scrollGroupId={scrollGroupId}
          availableScrollGroupIds={[undefined, 0, 1, 2, 3]}
          onScrollGroupChange={setScrollGroupId}
          currentReferenceLabel="GEN 1:1"
          viewMenu={viewMenu}
          viewMenuHandlers={{
            onToggleShowFootnotes: (next) =>
              setViewMenu((prev) => ({ ...prev, showFootnotes: next })),
            onToggleShowTranslations: (next) =>
              setViewMenu((prev) => ({ ...prev, showTranslations: next })),
            onHebrewDisplayModeChange: (next: ScriptDisplayMode) =>
              setViewMenu((prev) => ({ ...prev, hebrewDisplayMode: next })),
            onGreekDisplayModeChange: (next: ScriptDisplayMode) =>
              setViewMenu((prev) => ({ ...prev, greekDisplayMode: next })),
            onShowCopyrightInfo: () =>
              alert('Phase-3-ui wires this to CopyrightOverlay open=true.'),
            onFindInResource: () => alert('Phase-3-ui wires this to FindReplaceForm.'),
            onCloseWindow: () => alert('Phase-3-ui wires this to webView.close().'),
            onZoomIn: () => alert('Zoom in (wired in phase-3-ui).'),
            onZoomOut: () => alert('Zoom out (wired in phase-3-ui).'),
            onZoomReset: () => alert('Zoom reset (wired in phase-3-ui).'),
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            padding: 8,
            borderTop: '1px solid #ccc',
            fontSize: 12,
          }}
        >
          <strong>Filter input controls (Theme 9):</strong>
          <button
            type="button"
            onClick={() => setFilterText('begin·ning')}
            style={{ fontSize: 12 }}
          >
            Simulate word click → set filter
          </button>
          <label>
            <input
              type="checkbox"
              checked={hasMatches}
              onChange={(e) => setHasMatches(e.target.checked)}
            />{' '}
            hasMatches (green vs orange tint)
          </label>
          <span>
            Current state: filter={filterText ? `"${filterText}"` : '(empty, hidden)'}, scope=
            {scope}, tab={activeTab}, highlight={highlightMode}
          </span>
        </div>
      </div>
    );
  },
};

/**
 * [Revised: 2026-04-29] Theme 8 — narrow-width container exercises the responsive collapse of the
 * tab bar from labels-with-icons to icon-only without wrapping to two rows. Uses a width slider so
 * reviewers can drag the boundary across the container @sm breakpoint (640px).
 */
export const NarrowWidthResponsive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [width, setWidth] = useState(360);
    const [activeTab, setActiveTab] = useState<ResearchTab>('dictionary');
    const [scope, setScope] = useState<MarbleScope>('current-verse');
    const [filterText, setFilterText] = useState<string>('begin·ning');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
        <label style={{ fontSize: 12 }}>
          Container width: {width}px
          <input
            type="range"
            min="280"
            max="900"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            style={{ marginLeft: 8, width: 280 }}
          />
        </label>
        <div
          style={{
            width,
            border: '1px dashed #999',
            resize: 'horizontal',
            overflow: 'hidden',
          }}
        >
          <EnhancedResourceTabBar
            localizedStringsWithLoadingState={[localizedStrings, false]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            scope={scope}
            onScopeChange={setScope}
            hasSenseScope
            searchValue={filterText}
            onSearchChange={setFilterText}
            hasMatches
          />
        </div>
        <p style={{ fontSize: 12, color: 'gray' }}>
          Below ~640px container width, tab labels collapse to icon-only via `@container` queries
          and the row never wraps.
        </p>
      </div>
    );
  },
};

/**
 * Top toolbar in isolation — useful for reviewing the hamburger view-menu items independently of
 * the lower tab/filter/scope row.
 */
export const TopToolbarOnly: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [highlightMode, setHighlightMode] = useState<HighlightMode>('none');
    const [scrollGroupId, setScrollGroupId] = useState<number | undefined>(0);
    const [viewMenu, setViewMenu] = useState<ViewMenuState>({
      showFootnotes: false,
      showTranslations: true,
      hebrewDisplayMode: 'both',
      greekDisplayMode: 'both',
    });
    return (
      <EnhancedResourceTopToolbar
        localizedStringsWithLoadingState={[localizedStrings, false]}
        highlightMode={highlightMode}
        onHighlightModeChange={setHighlightMode}
        onInfoClick={() => alert('Phase-3-ui wires this to MarbleGuide (FN-016).')}
        onReferenceClick={() => alert('Phase-3-ui wires this to BookChapterControl (FN-015).')}
        scrollGroupId={scrollGroupId}
        availableScrollGroupIds={[undefined, 0, 1, 2, 3]}
        onScrollGroupChange={setScrollGroupId}
        currentReferenceLabel="GEN 1:1"
        viewMenu={viewMenu}
        viewMenuHandlers={{
          onToggleShowFootnotes: (next) =>
            setViewMenu((prev) => ({ ...prev, showFootnotes: next })),
          onToggleShowTranslations: (next) =>
            setViewMenu((prev) => ({ ...prev, showTranslations: next })),
          onHebrewDisplayModeChange: (next) =>
            setViewMenu((prev) => ({ ...prev, hebrewDisplayMode: next })),
          onGreekDisplayModeChange: (next) =>
            setViewMenu((prev) => ({ ...prev, greekDisplayMode: next })),
        }}
      />
    );
  },
};
