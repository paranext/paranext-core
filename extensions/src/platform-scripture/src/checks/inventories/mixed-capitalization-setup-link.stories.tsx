import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MixedCapitalizationSetupLink,
  MixedCapitalizationSetupLinkProps,
} from './mixed-capitalization-setup-link.component';

// Resolve the row's strings from the repo's English locale so the Storybook review reads naturally.
const localized = getLocalizedStrings([
  '%mixedCapitalizationInventory_setupLink_label%',
  '%mixedCapitalizationInventory_setupLink_setupRequired%',
  '%mixedCapitalizationInventory_setupLink_setupComplete%',
  '%mixedCapitalizationInventory_setupLink_computing%',
]);

/**
 * Story-only localized-strings helper. The production row receives this via the `t` prop; in
 * Storybook we resolve the keys from the locale files and fall back to English.
 */
const t = (key: string, fallback: string): string => localized[key] ?? fallback;

/**
 * Stateful decorator: records the last activation so a reviewer can confirm the link only opens the
 * inventory when setup is incomplete (the disabled states must NOT fire `onOpenInventory`). Sample
 * state lives here, never in the production component.
 */
function InteractiveSetupLink(props: MixedCapitalizationSetupLinkProps) {
  const [opens, setOpens] = useState(0);
  return (
    <div className="tw:flex tw:flex-col tw:gap-3 tw:p-4">
      {/* The row as feature 7.1 would compose it inside the Capitalization Setup-required dialog. */}
      <MixedCapitalizationSetupLink {...props} onOpenInventory={() => setOpens((n) => n + 1)} />
      <div className="tw:text-xs tw:text-muted-foreground" aria-live="polite">
        onOpenInventory fired: {opens} time(s)
      </div>
    </div>
  );
}

const meta: Meta<typeof MixedCapitalizationSetupLink> = {
  title: 'Bundled Extensions/platform-scripture/MixedCapitalizationSetupLink',
  component: MixedCapitalizationSetupLink,
  tags: ['autodocs'],
  args: {
    setupComplete: false,
    isComputing: false,
    t,
    onOpenInventory: () => {},
  },
  render: (args) => <InteractiveSetupLink {...args} />,
};
export default meta;

type Story = StoryObj<typeof MixedCapitalizationSetupLink>;

/**
 * SetupIncomplete (default) — setup is not complete: warning icon, active link. Clicking the link
 * opens the inventory (the counter increments). This is the state in which the row is actionable.
 */
export const SetupIncomplete: Story = {
  args: {
    setupComplete: false,
    isComputing: false,
  },
};

/**
 * SetupComplete — setup is complete: check icon, link disabled (PT9 gates via `link.Enabled =
 * !setupComplete`). The link remains focusable for screen readers but does not fire
 * `onOpenInventory`.
 */
export const SetupComplete: Story = {
  args: {
    setupComplete: true,
    isComputing: false,
  },
};

/**
 * Computing — feature 7.1 is recomputing the boolean: spinner icon, link disabled until the
 * computation settles.
 */
export const Computing: Story = {
  args: {
    setupComplete: false,
    isComputing: true,
  },
};
