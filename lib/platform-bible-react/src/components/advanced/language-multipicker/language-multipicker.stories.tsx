import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageMultipicker } from './language-multipicker.component';

const OPTIONS = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Hebrew', 'Greek'];
const PREFERRED = ['English', 'Spanish', 'French'];

const meta: Meta<typeof LanguageMultipicker> = {
  title: 'Advanced/LanguageMultipicker',
  component: LanguageMultipicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A compact, tertiary control for filtering a list of content (scripture texts, handbooks, …) by
**content language**. Designed to sit next to a search input and stay visually quiet until the
user interacts with it.

Not to be confused with \`UiLanguageSelector\` — that one picks the language the application's
chrome is rendered in. This one picks which content languages the user wants to see.

## The "Preferred" preset

"Preferred" is a named set of languages that represent what the user actually reads — typically
their UI language plus any other languages they've added to their platform-bible profile.

By having "Preferred" as a single named preset, the most common use case ("only show me texts
in languages I can read") is one click away. Without it, users would have to remember and
re-select their handful of languages every time.

If the host doesn't pass \`preferred\`, the preset disappears from the popover and the trigger
label never collapses to "Preferred".

## Language codes

Uses **BCP-47** tags throughout — the IETF standard the rest of platform-bible uses. BCP-47
prefers 2-letter ISO 639-1 codes (\`en\`, \`es\`, \`de\`); for languages without a 639-1 entry,
it falls back to 3-letter ISO 639-3 (\`grc\` for Koine Greek).

## Trigger label degradation

The trigger button has limited width (it lives next to a search input). Its label collapses
gracefully as the selection grows. The stories below cover each label state.
        `,
      },
    },
  },
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    options: { control: false },
    preferred: { control: false },
    localizedStrings: { control: false },
    triggerClassName: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof LanguageMultipicker>;

function Controlled({
  initial,
  showPreferred = true,
}: {
  initial: string[];
  showPreferred?: boolean;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <LanguageMultipicker
        value={value}
        options={OPTIONS}
        preferred={showPreferred ? PREFERRED : undefined}
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
  parameters: {
    docs: {
      description: {
        story:
          'Default empty state. Trigger label = "Any". Clicking the trigger opens the popover where the user can pick languages or hit the Preferred preset.',
      },
    },
  },
};

export const Preferred: Story = {
  render: () => <Controlled initial={PREFERRED} />,
  parameters: {
    docs: {
      description: {
        story:
          'Selection exactly matches the Preferred preset. Trigger label collapses to the word "Preferred" instead of listing three codes — this is the highest-value compaction since it\'s the most common case.',
      },
    },
  },
};

export const SingleLanguage: Story = {
  render: () => <Controlled initial={['German']} />,
  parameters: {
    docs: {
      description: {
        story:
          "A single language selected. Trigger label = the language's BCP-47 code (`de`). Demonstrates the most-compact form for an arbitrary selection that doesn't match a preset.",
      },
    },
  },
};

export const TwoLanguages: Story = {
  render: () => <Controlled initial={['English', 'Greek']} />,
  parameters: {
    docs: {
      description: {
        story:
          "Two languages selected. Codes fit within the character budget so they're shown space-separated (`en grc`).",
      },
    },
  },
};

export const ManyLanguages: Story = {
  render: () => <Controlled initial={['English', 'Spanish', 'French', 'German', 'Greek']} />,
  parameters: {
    docs: {
      description: {
        story:
          'Selection too long to fit as codes; trigger label collapses to `{N} langs`. The exact threshold is the character width of the word "Preferred" so all label states occupy a similar slot.',
      },
    },
  },
};

export const WithoutPreferredPreset: Story = {
  render: () => <Controlled initial={['English']} showPreferred={false} />,
  parameters: {
    docs: {
      description: {
        story:
          'Host omits `preferred`. The Preferred preset disappears from the popover, and the trigger label never collapses to "Preferred" — even if selection happens to match what the host *could* have provided. Use this for hosts that don\'t know the user\'s language preferences.',
      },
    },
  },
};
