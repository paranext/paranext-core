import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useMemo, useState } from 'react';

import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import {
  LockToggleButtonView,
  STRUCTURE_PROTECTION_BUTTON_STRING_KEYS,
  type ShortcutSpec,
} from './structure-protection-button.component';

/**
 * The personal structure-protection lock button shown in the editor tab header. In the app the
 * connected `StructureProtectionButton` derives its state from `useStructureProtectionState`
 * (PAPI); these stories drive the presentational `LockToggleButtonView` directly so every visual
 * state is reachable without a backend.
 *
 * **Try it**: click the button (or press Ctrl/Cmd+Shift+L) on the enabled stories — the icon flips
 * between `Lock` (locked) and `LockOpen` (unlocked, destructive styling) and the tooltip auto-opens
 * on the change, reporting the state it is now in alongside the keyboard-shortcut hint.
 */
const meta: Meta<typeof LockToggleButtonView> = {
  title: 'Bundled Extensions/platform-scripture-editor/StructureProtectionButton',
  component: LockToggleButtonView,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof LockToggleButtonView>;

const localizedStrings = getLocalizedStrings([...STRUCTURE_PROTECTION_BUTTON_STRING_KEYS]);

const PERSONAL_SHORTCUT: ShortcutSpec = {
  matches: (event) =>
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    !event.altKey &&
    event.key.toLowerCase() === 'l',
  hint: 'Ctrl+Shift+L',
};

/** Interactive harness: holds the locked state locally and flips it on toggle. */
function PersonalLockHarness({ initialLocked }: { initialLocked: boolean }) {
  const [isLocked, setIsLocked] = useState(initialLocked);
  const shortcut = useMemo(() => PERSONAL_SHORTCUT, []);
  return (
    <LockToggleButtonView
      isLocked={isLocked}
      isStateLoading={false}
      isDisabled={false}
      onToggle={() => setIsLocked((previous) => !previous)}
      unlockedTooltipKey="%webView_platformScriptureEditor_structureProtection_stateEditable%"
      lockedTooltipKey="%webView_platformScriptureEditor_structureProtection_stateProtected%"
      disabledTooltipKey="%webView_platformScriptureEditor_structureProtection_lockedByAdmin%"
      ariaLabelKey="%webView_platformScriptureEditor_structureProtection_ariaLabel%"
      shortcut={shortcut}
      localizedStrings={localizedStrings}
    />
  );
}

/** Structure is locked — `Lock`, ghost, tooltip "USFM structure protected". Click to unlock. */
export const Locked: Story = {
  render: () => <PersonalLockHarness initialLocked />,
};

/**
 * Structure is unlocked — `LockOpen`, destructive styling, tooltip "USFM structure editable". Click
 * to lock.
 */
export const Unlocked: Story = {
  render: () => <PersonalLockHarness initialLocked={false} />,
};

/**
 * Non-admin on an admin-locked project: the button is disabled and the toggle is a no-op. The
 * shortcut hint is hidden because the shortcut does nothing in this state.
 */
export const LockedByAdmin: Story = {
  render: () => (
    <LockToggleButtonView
      isLocked
      isStateLoading={false}
      isDisabled
      onToggle={() => {}}
      unlockedTooltipKey="%webView_platformScriptureEditor_structureProtection_stateEditable%"
      lockedTooltipKey="%webView_platformScriptureEditor_structureProtection_stateProtected%"
      disabledTooltipKey="%webView_platformScriptureEditor_structureProtection_lockedByAdmin%"
      ariaLabelKey="%webView_platformScriptureEditor_structureProtection_ariaLabel%"
      shortcut={PERSONAL_SHORTCUT}
      localizedStrings={localizedStrings}
    />
  ),
};
