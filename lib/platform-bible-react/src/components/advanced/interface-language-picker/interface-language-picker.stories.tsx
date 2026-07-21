import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InterfaceLanguagePicker } from './interface-language-picker.component';
import { SAMPLE_LOCALIZED_STRINGS as STRINGS } from './interface-language-picker.data';

const meta: Meta<typeof InterfaceLanguagePicker> = {
  title: 'Advanced/InterfaceLanguagePicker',
  component: InterfaceLanguagePicker,
  tags: ['autodocs', 'test'],
};
export default meta;
type Story = StoryObj<typeof InterfaceLanguagePicker>;

function Demo({
  languages,
  initialValue = 'en',
}: {
  languages: Record<string, { autonym: string; uiNames?: Record<string, string> }>;
  initialValue?: string;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <InterfaceLanguagePicker
      languages={languages}
      value={value}
      onChange={setValue}
      localizedStrings={STRINGS}
    />
  );
}

export const FewLanguages: Story = {
  render: () => (
    <Demo
      languages={{
        en: { autonym: 'English' },
        es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
        'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
      }}
    />
  ),
};

export const OneLanguage: Story = {
  render: () => <Demo languages={{ en: { autonym: 'English' } }} />,
};

export const ManyLanguages: Story = {
  render: () => {
    const many: Record<string, { autonym: string; uiNames?: Record<string, string> }> = {
      en: { autonym: 'English' },
    };
    for (let i = 0; i < 120; i++)
      many[`x${i}`] = { autonym: `Language ${i}`, uiNames: { en: `Language ${i}` } };
    return <Demo languages={many} />;
  },
};

/** A non-first language is selected, so the check mark and "Selected" affordance show mid-list. */
export const SelectedMidList: Story = {
  render: () => (
    <Demo
      initialValue="zh-hans"
      languages={{
        en: { autonym: 'English' },
        es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
        'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
      }}
    />
  ),
};

/** Exercises an RTL script (Arabic) and a deliberately long autonym for mirroring/overflow. */
export const RtlAndLongAutonyms: Story = {
  render: () => (
    <Demo
      languages={{
        en: { autonym: 'English' },
        ar: { autonym: 'العربية', uiNames: { en: 'Arabic' } },
        de: {
          autonym: 'Deutsch (Schweizerdeutsch, sehr langer Beispielname zum Testen des Umbruchs)',
          uiNames: { en: 'German (long example)' },
        },
      }}
    />
  ),
};
