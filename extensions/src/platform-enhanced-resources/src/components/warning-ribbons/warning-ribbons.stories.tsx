import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_RIBBONS_ALL,
  MOCK_RIBBONS_NONE,
  type MockRibbonStates,
} from '../../data/marble-form.story-data';
import { WarningRibbons, WARNING_RIBBONS_STRING_KEYS } from './warning-ribbons.component';

const localizedStrings = getLocalizedStrings([...WARNING_RIBBONS_STRING_KEYS]);

const onlyMissingBook: MockRibbonStates = { ...MOCK_RIBBONS_NONE, missingBook: true };
const onlyPreRelease: MockRibbonStates = {
  ...MOCK_RIBBONS_NONE,
  reviewStatus: { visible: true, dismissed: false },
};
const onlyImage: MockRibbonStates = { ...MOCK_RIBBONS_NONE, imageWarning: true };
const onlyCopyright: MockRibbonStates = {
  ...MOCK_RIBBONS_NONE,
  copyright: { visible: true, dismissed: false },
};
const onlyMetadata: MockRibbonStates = { ...MOCK_RIBBONS_NONE, updateRequiredData: true };
const onlyUpdateAvailable: MockRibbonStates = {
  ...MOCK_RIBBONS_NONE,
  updateAvailable: { visible: true, dismissed: false },
};

const meta: Meta<typeof WarningRibbons> = {
  title: 'Bundled Extensions/platform-enhanced-resources/WarningRibbons',
  component: WarningRibbons,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    resourceName: 'SDBH/SDBG',
  },
};
export default meta;

type Story = StoryObj<typeof WarningRibbons>;

export const None: Story = {
  args: {
    ribbons: MOCK_RIBBONS_NONE,
  },
};

export const MissingBook: Story = {
  args: {
    ribbons: onlyMissingBook,
  },
};

export const PreRelease: Story = {
  args: {
    ribbons: onlyPreRelease,
  },
};

export const ImageWarning: Story = {
  args: {
    ribbons: onlyImage,
  },
};

export const Copyright: Story = {
  args: {
    ribbons: onlyCopyright,
  },
};

export const MetadataUpdateRequired: Story = {
  args: {
    ribbons: onlyMetadata,
  },
};

export const UpdateAvailable: Story = {
  args: {
    ribbons: onlyUpdateAvailable,
  },
};

export const AllVisible: Story = {
  args: {
    ribbons: MOCK_RIBBONS_ALL,
  },
};
