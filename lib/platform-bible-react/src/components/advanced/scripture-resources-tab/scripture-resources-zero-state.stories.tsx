import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import WorkspaceShell from '@/storybook/decorators/workspace-shell';
import {
  ScriptureResourcesZeroStateStandard,
  ScriptureResourcesZeroStateSuggestions,
  ScriptureResourcesZeroStateSplit,
  type ZeroStateProps,
} from './scripture-resources-zero-state.component';
import {
  ScriptureResourcesPickerModalChecklist,
  ScriptureResourcesPickerTwoPanel,
  ScriptureResourcesPickerInline,
} from './scripture-resources-picker.component';
import { SAMPLE_RESOURCES, SAMPLE_USER_LANGUAGES } from './scripture-resources-tab.data';

// Re-usable "harness" component for stories that need an interactive open/closed picker.
function ZeroStateHarness({
  Variant,
  PickerVariant,
  initiallyOpen = false,
}: {
  Variant: React.ComponentType<ZeroStateProps>;
  PickerVariant: typeof ScriptureResourcesPickerModalChecklist;
  initiallyOpen?: boolean;
}) {
  const [pickerOpen, setPickerOpen] = React.useState(initiallyOpen);
  const [added, setAdded] = React.useState<string[]>([]);

  return (
    <WorkspaceShell columnIndex={2}>
      {/* tw-relative anchors the inline picker variant when used */}
      <div className="tw-relative tw-flex tw-h-full tw-w-full tw-flex-col">
        <Variant
          allResources={SAMPLE_RESOURCES}
          userLanguages={SAMPLE_USER_LANGUAGES}
          onOpenPicker={() => setPickerOpen(true)}
          onAddResource={(r) => setAdded((prev) => [...prev, r.dblEntryUid])}
        />
        <PickerVariant
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          allResources={SAMPLE_RESOURCES}
          selectedResourceIds={added}
          userLanguages={SAMPLE_USER_LANGUAGES}
          onApply={(ids) => {
            setAdded(ids);
            setPickerOpen(false);
          }}
          onDownload={(r) => console.log('Download', r.dblEntryUid)}
        />
      </div>
    </WorkspaceShell>
  );
}

const meta: Meta = {
  title: 'Advanced/ScriptureResourcesZeroState',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Three variants of the Bible Texts (Column 3) zero state, paired with the matching picker variant for the "open" stories. WorkspaceShell wraps each story with columnIndex=2.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Variant A — Standard empty state
export const StandardDefault: Story = {
  name: 'A · Standard — Default',
  render: () => (
    <ZeroStateHarness
      Variant={ScriptureResourcesZeroStateStandard}
      PickerVariant={ScriptureResourcesPickerModalChecklist}
    />
  ),
};
export const StandardWithPickerOpen: Story = {
  name: 'A · Standard — Picker open',
  render: () => (
    <ZeroStateHarness
      Variant={ScriptureResourcesZeroStateStandard}
      PickerVariant={ScriptureResourcesPickerModalChecklist}
      initiallyOpen
    />
  ),
};

// Variant B — Suggestions-first
export const SuggestionsDefault: Story = {
  name: 'B · Suggestions — Default',
  render: () => (
    <ZeroStateHarness
      Variant={ScriptureResourcesZeroStateSuggestions}
      PickerVariant={ScriptureResourcesPickerTwoPanel}
    />
  ),
};
export const SuggestionsWithPickerOpen: Story = {
  name: 'B · Suggestions — Picker open',
  render: () => (
    <ZeroStateHarness
      Variant={ScriptureResourcesZeroStateSuggestions}
      PickerVariant={ScriptureResourcesPickerTwoPanel}
      initiallyOpen
    />
  ),
};

// Variant C — Split-state panel
// Note: variant C already embeds an inline picker, so the "picker open" story
// opens the secondary "browse all" inline picker as a sanity check that the
// flow works even when the embedded selector is already visible.
export const SplitDefault: Story = {
  name: 'C · Split — Default',
  render: () => (
    <ZeroStateHarness
      Variant={ScriptureResourcesZeroStateSplit}
      PickerVariant={ScriptureResourcesPickerInline}
    />
  ),
};
export const SplitWithPickerOpen: Story = {
  name: 'C · Split — Picker open',
  render: () => (
    <ZeroStateHarness
      Variant={ScriptureResourcesZeroStateSplit}
      PickerVariant={ScriptureResourcesPickerInline}
      initiallyOpen
    />
  ),
};
