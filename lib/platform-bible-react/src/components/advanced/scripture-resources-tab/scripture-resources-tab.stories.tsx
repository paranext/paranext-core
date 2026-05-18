import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkspaceShell } from '@/storybook/decorators/workspace-shell';
import {
  ScriptureResourcesTabIconStrip,
  ScriptureResourcesTabSidebarList,
  ScriptureResourcesTabDropdown,
  type PopulatedTabProps,
} from './scripture-resources-tab.component';
import { ScriptureResourcesPickerModalChecklist } from './scripture-resources-picker.component';
import {
  SAMPLE_RESOURCES,
  ADMIN_ASSOCIATED_IDS,
  USER_ASSOCIATED_IDS,
  DEFAULT_POPULATED_STORY_ARGS,
  SAMPLE_USER_LANGUAGES,
} from './scripture-resources-tab.data';

type VariantComp = React.ComponentType<PopulatedTabProps>;

function PopulatedHarness({
  Variant,
  forceRemoveTooltipOpenForId,
}: {
  Variant: VariantComp;
  forceRemoveTooltipOpenForId?: string;
}) {
  const [activeId, setActiveId] = React.useState(DEFAULT_POPULATED_STORY_ARGS.activeResourceId);
  const [userIds, setUserIds] = React.useState<string[]>(USER_ASSOCIATED_IDS);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const resources = DEFAULT_POPULATED_STORY_ARGS.resources.filter(
    (r) => ADMIN_ASSOCIATED_IDS.includes(r.dblEntryUid) || userIds.includes(r.dblEntryUid),
  );
  const selectedResourceIds = Array.from(new Set([...ADMIN_ASSOCIATED_IDS, ...userIds]));

  return (
    <WorkspaceShell columnIndex={2}>
      <div className="tw:relative tw:flex tw:h-full tw:w-full tw:flex-col">
        <Variant
          resources={resources}
          activeResourceId={activeId}
          onActiveResourceChange={setActiveId}
          adminAssociatedIds={ADMIN_ASSOCIATED_IDS}
          userAssociatedIds={userIds}
          onOpenPicker={() => setPickerOpen(true)}
          onRemoveResource={(id) => setUserIds((prev) => prev.filter((x) => x !== id))}
          forceRemoveTooltipOpenForId={forceRemoveTooltipOpenForId}
        />
        <ScriptureResourcesPickerModalChecklist
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          allResources={SAMPLE_RESOURCES}
          selectedResourceIds={selectedResourceIds}
          userLanguages={SAMPLE_USER_LANGUAGES}
          onApply={(ids) => {
            // Anything the user adds becomes user-associated; admin set is preserved.
            const newUserIds = ids.filter((id) => !ADMIN_ASSOCIATED_IDS.includes(id));
            setUserIds(newUserIds);
            setPickerOpen(false);
          }}
          onDownload={(r) => console.log('Download', r.dblEntryUid)}
        />
      </div>
    </WorkspaceShell>
  );
}

// Pick an admin-associated resource id we can force-tooltip-open in the
// "AdminRemoveAttempted" stories. The default-args fixture pins selected-1 (NIV) as
// the active admin resource — convenient to make the tooltip visually obvious.
const ADMIN_DEMO_ID = ADMIN_ASSOCIATED_IDS[0];

const meta: Meta = {
  title: 'Advanced/ScriptureResourcesTab',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Three variants of the populated Bible Texts tab (Column 3). Each renders 4 associated resources with a mix of admin- and user-added items. AdminRemoveAttempted stories force the disabled-remove tooltip open so reviewers can verify wording without hovering.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Variant A — Icon-tab strip
export const IconStripDefault: Story = {
  name: 'A · Icon-tab strip — Default',
  render: () => <PopulatedHarness Variant={ScriptureResourcesTabIconStrip} />,
};
export const IconStripAdminRemoveAttempted: Story = {
  name: 'A · Icon-tab strip — Admin remove attempted',
  render: () => (
    <PopulatedHarness
      Variant={ScriptureResourcesTabIconStrip}
      forceRemoveTooltipOpenForId={ADMIN_DEMO_ID}
    />
  ),
};

// Variant B — Sidebar list
export const SidebarListDefault: Story = {
  name: 'B · Sidebar list — Default',
  render: () => <PopulatedHarness Variant={ScriptureResourcesTabSidebarList} />,
};
export const SidebarListAdminRemoveAttempted: Story = {
  name: 'B · Sidebar list — Admin remove attempted',
  render: () => (
    <PopulatedHarness
      Variant={ScriptureResourcesTabSidebarList}
      forceRemoveTooltipOpenForId={ADMIN_DEMO_ID}
    />
  ),
};

// Variant C — Dropdown selector
export const DropdownDefault: Story = {
  name: 'C · Dropdown — Default',
  render: () => <PopulatedHarness Variant={ScriptureResourcesTabDropdown} />,
};
export const DropdownAdminRemoveAttempted: Story = {
  name: 'C · Dropdown — Admin remove attempted',
  render: () => (
    <PopulatedHarness
      Variant={ScriptureResourcesTabDropdown}
      forceRemoveTooltipOpenForId={ADMIN_DEMO_ID}
    />
  ),
};
