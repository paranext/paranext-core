import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageMultipicker } from './language-multipicker.component';

const OPTIONS = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Hebrew', 'Greek'];
const PREFERRED = ['English', 'Spanish', 'French'];

const meta: Meta<typeof LanguageMultipicker> = {
  title: 'Advanced/LanguageMultipicker',
  component: LanguageMultipicker,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof LanguageMultipicker>;

function Controlled({ initial }: { initial: string[] }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <LanguageMultipicker
        value={value}
        options={OPTIONS}
        preferred={PREFERRED}
        onChange={setValue}
      />
      <div className="tw:text-xs tw:text-muted-foreground">
        Selected: {value.length === 0 ? '(none — "Any")' : value.join(', ')}
      </div>
    </div>
  );
}

export const AnyByDefault: Story = {
  render: () => <Controlled initial={[]} />,
};

export const Preferred: Story = {
  render: () => <Controlled initial={PREFERRED} />,
};

export const SingleLanguage: Story = {
  render: () => <Controlled initial={['German']} />,
};

export const TwoLanguages: Story = {
  render: () => <Controlled initial={['English', 'Greek']} />,
};

export const ManyLanguages: Story = {
  render: () => <Controlled initial={['English', 'Spanish', 'French', 'German', 'Greek']} />,
};
