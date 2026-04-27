import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DomainBreadcrumb,
  DOMAIN_BREADCRUMB_STRING_KEYS,
  type DomainBreadcrumbItem,
} from './domain-breadcrumb.component';

const localizedStrings = getLocalizedStrings([...DOMAIN_BREADCRUMB_STRING_KEYS]);

const SHORT_PATH: DomainBreadcrumbItem[] = [
  { id: '', label: 'All' },
  { id: '5', label: '5. Communication' },
];

const DEEP_PATH: DomainBreadcrumbItem[] = [
  { id: '', label: 'All' },
  { id: '1', label: '1. Physical' },
  { id: '1.1', label: '1.1 Movement' },
  { id: '1.1.3', label: '1.1.3 Carry' },
  { id: '1.1.3.3', label: '1.1.3.3 Carry in hand' },
];

const ROOT_ONLY_PATH: DomainBreadcrumbItem[] = [{ id: '', label: 'All' }];

const meta: Meta<typeof DomainBreadcrumb> = {
  title: 'Bundled Extensions/platform-enhanced-resources/SemanticDomainViewer/DomainBreadcrumb',
  component: DomainBreadcrumb,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[480px] tw-rounded tw-border tw-border-border tw-bg-background tw-p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DomainBreadcrumb>;

/** Short path - root + one child. */
export const ShortPath: Story = {
  args: {
    path: SHORT_PATH,
  },
};

/** Five-level deep path representative of the maximum nesting in SDBG. */
export const DeepPath: Story = {
  args: {
    path: DEEP_PATH,
  },
};

/** Single-segment breadcrumb showing the synthetic root. */
export const RootOnly: Story = {
  args: {
    path: ROOT_ONLY_PATH,
  },
};

/** Interactive: clicking a non-current segment trims the path back to that level. */
export const Interactive: StoryObj<typeof DomainBreadcrumb> = {
  args: {
    path: DEEP_PATH,
  },
  render: function Render(args) {
    const [path, setPath] = useState<DomainBreadcrumbItem[]>(args.path ?? DEEP_PATH);
    const handleClick = (id: string) => {
      const idx = path.findIndex((item) => item.id === id);
      if (idx === -1) return;
      setPath(path.slice(0, idx + 1));
    };
    return (
      <div className="tw-flex tw-flex-col tw-gap-2">
        <DomainBreadcrumb
          {...args}
          path={path}
          onItemClick={handleClick}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
        <p className="tw-text-xs tw-text-muted-foreground">
          Click any non-current breadcrumb segment to navigate up the hierarchy.
        </p>
      </div>
    );
  },
};
