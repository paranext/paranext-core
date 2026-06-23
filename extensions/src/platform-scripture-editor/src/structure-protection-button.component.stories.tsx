import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import {
  StructureProtectionButtonView,
  STRUCTURE_PROTECTION_BUTTON_STRING_KEYS,
} from './structure-protection-button.component';

/**
 * The structure-protection lock/unlock button shown in the editor tab header. In the app the
 * connected `StructureProtectionButton` derives its state from `useStructureProtectionState`
 * (PAPI); these stories drive the presentational `StructureProtectionButtonView` directly so every
 * visual state is reachable without a backend.
 *
 * **Try it**: click the button (or press Ctrl/Cmd+Shift+L) on the enabled stories — the icon flips
 * between `ShieldCheck` (protected) and `ShieldOff` (editable) and the tooltip auto-opens on the
 * change, showing the keyboard-shortcut hint.
 */
const meta: Meta<typeof StructureProtectionButtonView> = {
  title: 'Bundled Extensions/platform-scripture-editor/StructureProtectionButton',
  component: StructureProtectionButtonView,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof StructureProtectionButtonView>;

const localizedStrings = getLocalizedStrings([...STRUCTURE_PROTECTION_BUTTON_STRING_KEYS]);

/** Interactive harness: holds the effective state locally and flips it on toggle. */
function StructureProtectionButtonHarness({ initialProtected }: { initialProtected: boolean }) {
  const [isProtected, setIsProtected] = useState(initialProtected);
  return (
    <StructureProtectionButtonView
      isProtected={isProtected}
      isDisabled={false}
      onToggle={() => setIsProtected((previous) => !previous)}
      localizedStrings={localizedStrings}
    />
  );
}

/** Structure is protected — `ShieldCheck`, tooltip "Structure protected". Click to unlock. */
export const Protected: Story = {
  render: () => <StructureProtectionButtonHarness initialProtected />,
};

/** Structure is editable — `ShieldOff`, tooltip "Structure editable". Click to lock. */
export const Editable: Story = {
  render: () => <StructureProtectionButtonHarness initialProtected={false} />,
};

/**
 * Non-admin on an admin-locked project: the button is disabled and the toggle is a no-op. The
 * shortcut hint is hidden because the shortcut does nothing in this state.
 */
export const LockedByAdmin: Story = {
  render: () => (
    <StructureProtectionButtonView
      isProtected
      isDisabled
      onToggle={() => {}}
      localizedStrings={localizedStrings}
    />
  ),
};
