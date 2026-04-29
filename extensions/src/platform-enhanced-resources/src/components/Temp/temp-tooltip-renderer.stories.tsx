import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_TOOLTIP_DEFAULT,
  MOCK_TOOLTIP_MISSING_STRONGS,
  MOCK_TOOLTIP_MULTIPLE_SENSES,
} from '../../data/marble-form.story-data';
import {
  TempTooltipRenderer,
  TEMP_TOOLTIP_RENDERER_STRING_KEYS,
  type TooltipData,
} from './temp-tooltip-renderer.component';

const localizedStrings = getLocalizedStrings([...TEMP_TOOLTIP_RENDERER_STRING_KEYS]);

const meta: Meta<typeof TempTooltipRenderer> = {
  title: 'Temp/TempTooltipRenderer',
  component: TempTooltipRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
};
export default meta;

type Story = StoryObj<typeof TempTooltipRenderer>;

type TooltipVariantKey = 'default' | 'multipleSenses' | 'missingStrongs';

// MOCK_TOOLTIP_* are structurally compatible with TooltipData; no `as` cast needed.
const VARIANTS: Record<TooltipVariantKey, TooltipData> = {
  default: MOCK_TOOLTIP_DEFAULT,
  multipleSenses: MOCK_TOOLTIP_MULTIPLE_SENSES,
  missingStrongs: MOCK_TOOLTIP_MISSING_STRONGS,
};

function isTooltipVariantKey(value: string): value is TooltipVariantKey {
  return value === 'default' || value === 'multipleSenses' || value === 'missingStrongs';
}

/**
 * [Revised: 2026-04-29] Theme 4 — fully interactive default story. Reviewers can switch lemma
 * variants and edit gloss text live; no separate static stories needed because every renderable
 * state is reachable via this controller.
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [variant, setVariant] = useState<TooltipVariantKey>('default');
    const [gloss, setGloss] = useState(VARIANTS.default.gloss ?? '');

    const handleVariantChange = (next: TooltipVariantKey) => {
      setVariant(next);
      setGloss(VARIANTS[next].gloss ?? '');
    };

    const data: TooltipData = { ...VARIANTS[variant], gloss: gloss || undefined };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ fontSize: 12 }}>
            Variant:
            <select
              value={variant}
              onChange={(e) => {
                if (isTooltipVariantKey(e.target.value)) handleVariantChange(e.target.value);
              }}
              style={{ marginLeft: 6 }}
            >
              <option value="default">Default</option>
              <option value="multipleSenses">Multiple senses</option>
              <option value="missingStrongs">Missing Strong&apos;s number</option>
            </select>
          </label>
          <label style={{ fontSize: 12, flex: 1, display: 'flex', gap: 6 }}>
            Gloss:
            <input
              type="text"
              value={gloss}
              onChange={(e) => setGloss(e.target.value)}
              placeholder="(empty hides the gloss row)"
              style={{ flex: 1 }}
            />
          </label>
        </div>
        <TempTooltipRenderer
          localizedStringsWithLoadingState={[localizedStrings, false]}
          data={data}
        />
      </div>
    );
  },
};
