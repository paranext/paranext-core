import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkspaceShell } from '@/storybook/decorators/workspace-shell';
import {
  ScriptureResourcesPickerModalChecklist,
  ScriptureResourcesPickerTwoPanel,
  ScriptureResourcesPickerInline,
  type PickerProps,
} from './scripture-resources-picker.component';
import { ScriptureResourcesTabIconStrip } from './scripture-resources-tab.component';
import {
  SAMPLE_RESOURCES,
  ADMIN_ASSOCIATED_IDS,
  USER_ASSOCIATED_IDS,
  POPULATED_SELECTED_IDS,
  DEFAULT_POPULATED_STORY_ARGS,
  SAMPLE_USER_LANGUAGES,
} from './scripture-resources-tab.data';

type PickerComp = React.ComponentType<PickerProps>;

/**
 * Each picker variant opens over the populated workspace shell so reviewers can see it in the
 * context it will actually appear in — Column 3 with a populated Bible Texts tab behind it. The
 * Inline variant covers the column rather than floating over it.
 */
function PickerHarness({ Picker }: { Picker: PickerComp }) {
  const [open, setOpen] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState<string[]>(POPULATED_SELECTED_IDS);
  const [activeId, setActiveId] = React.useState(DEFAULT_POPULATED_STORY_ARGS.activeResourceId);

  return (
    <WorkspaceShell columnIndex={2}>
      <div className="tw:relative tw:flex tw:h-full tw:w-full tw:flex-col">
        <ScriptureResourcesTabIconStrip
          resources={DEFAULT_POPULATED_STORY_ARGS.resources}
          activeResourceId={activeId}
          onActiveResourceChange={setActiveId}
          adminAssociatedIds={ADMIN_ASSOCIATED_IDS}
          userAssociatedIds={USER_ASSOCIATED_IDS}
          onOpenPicker={() => setOpen(true)}
        />
        <Picker
          open={open}
          onOpenChange={setOpen}
          allResources={SAMPLE_RESOURCES}
          selectedResourceIds={selectedIds}
          userLanguages={SAMPLE_USER_LANGUAGES}
          onApply={(ids) => {
            setSelectedIds(ids);
            setOpen(false);
          }}
          onDownload={(r) => console.log('Download', r.dblEntryUid)}
        />
      </div>
    </WorkspaceShell>
  );
}

const meta: Meta = {
  title: 'Advanced/ScriptureResourcesPicker',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Three meaningfully different multi-select picker variants for adding Bible texts. Each story opens the picker on top of (or inline in) a populated Column 3 so reviewers see it in context.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Variant A — Modal checklist (form-submit mental model)
export const ModalChecklistDefault: Story = {
  name: 'A · Modal checklist — Default open',
  render: () => <PickerHarness Picker={ScriptureResourcesPickerModalChecklist} />,
};

// Variant B — Two-panel browse + selected tray (shopping cart mental model)
export const TwoPanelDefault: Story = {
  name: 'B · Two-panel tray — Default open',
  render: () => <PickerHarness Picker={ScriptureResourcesPickerTwoPanel} />,
};

// Variant C — Inline column expansion (drawer-in-place mental model)
export const InlineDefault: Story = {
  name: 'C · Inline column — Default open',
  render: () => <PickerHarness Picker={ScriptureResourcesPickerInline} />,
};
