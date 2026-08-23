import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { LanguageInfo } from 'platform-bible-react';
import {
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
} from 'platform-bible-react/experimental';
import { useEffect, useState } from 'react';
import { FirstRunGate } from './first-run-overlay.component';
import { DEFAULT_STEP_COMPONENTS } from './first-run-shell.component';
import { FirstRunStepProps } from './first-run-step-props.model';
import { WizardStepHeading } from './wizard-step-heading.component';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
// Deep relative (not aliased) so the story drives the webpack-aliased renderer-hooks mock: the gate
// renders real English chrome, and the WizardActive story's embedded LanguageStep shows a realistic
// multi-language picker instead of the raw-key / English-only Storybook fallback.
import {
  resetFirstRunLanguageMock,
  setFirstRunLanguageMock,
} from '../../../../.storybook/mocks/first-run-language-mock-channel';

const SETUP_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
};

const meta: Meta<typeof FirstRunGate> = {
  title: 'First run/FirstRunGate',
  component: FirstRunGate,
  tags: ['autodocs'],
  beforeEach: () => {
    setFirstRunLanguageMock({
      interfaceLanguage: ['en'],
      setupLanguages: SETUP_LANGUAGES,
      availableLanguages: SETUP_LANGUAGES,
    });
    return resetFirstRunLanguageMock;
  },
};
export default meta;

type Story = StoryObj<typeof FirstRunGate>;

export const Loading: Story = { args: { status: { kind: 'loading' } } };
// slowRevealMs: 0 reveals the "taking longer" escape immediately so the slow-loading state is
// visible in Storybook without waiting out the real ~15s threshold.
export const SlowLoading: Story = { args: { status: { kind: 'loading' }, slowRevealMs: 0 } };
export const ErrorState: Story = { args: { status: { kind: 'error' } } };
export const WizardActive: Story = { args: { status: { kind: 'wizard', step: 'language' } } };

/**
 * The internet-settings step rendered inside the real gate, so the description tooltips can be seen
 * in the one place they are most at risk.
 *
 * The gate is an opaque dialog at `Z_INDEX_FIRST_RUN` (700) while tooltips portal to
 * `document.body` at `Z_INDEX_TOOLTIP` (550), so without `TooltipPortalContainerProvider` a tooltip
 * opened here would paint _behind_ the gate and be invisible. Hover any option row to confirm it
 * does not.
 *
 * Uses the shell's `stepComponents` override rather than the real step, because the real one waits
 * on a PAPI data provider that has no backend in Storybook and would show only a spinner.
 */
const optionListStrings = getLocalizedStrings([
  ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  '%internetSettings_webView_title_2%',
]);

function InternetSettingsDemoStep({ setCanProceed }: FirstRunStepProps) {
  const [value, setValue] = useState<'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'>(
    'VpnRequired',
  );
  // In an effect, not during render — calling the shell's setter mid-render updates a parent while
  // this component is rendering, which React rejects.
  useEffect(() => setCanProceed?.(true), [setCanProceed]);

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <WizardStepHeading>
        {optionListStrings['%internetSettings_webView_title_2%']}
      </WizardStepHeading>
      <InternetAccessOptionList
        localizedStrings={optionListStrings}
        value={value}
        onChange={setValue}
        disabled={false}
      />
    </div>
  );
}

// Spread the real map and override one entry, so no type assertion is needed and every other step
// still renders its production component.
const internetSettingsOnly = {
  ...DEFAULT_STEP_COMPONENTS,
  internetSettings: InternetSettingsDemoStep,
};

export const WizardInternetSettings: Story = {
  args: {
    status: { kind: 'wizard', step: 'internetSettings' },
    stepComponents: internetSettingsOnly,
  },
};
