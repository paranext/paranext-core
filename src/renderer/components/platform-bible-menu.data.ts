import { GridMenuInfo } from 'papi-components';

const standardMenuLayout: GridMenuInfo = {
  columns: [
    {
      name: 'Project',
      items: [
        {
          name: 'Download/Install Resources...',
          command: 'platform.downloadAndInstallResources',
          hasDivider: true,
        },
        {
          name: 'Open Text Collection...',
          command: 'platform.openTextCollection',
          hasDivider: true,
        },
        {
          name: 'Settings...',
          command: 'platform.settings',
          hasDivider: true,
        },
        {
          name: 'Exit',
          command: 'platform.quit',
          hasDivider: true,
        },
      ],
    },
    {
      name: 'Window',
      items: [],
    },
    {
      name: 'Layout',
      items: [],
    },
    {
      name: 'Help',
      items: [
        {
          name: 'Visit Support.Bible',
          command: 'platformBible.visitSupportPage',
          hasDivider: true,
        },
        {
          name: 'About Platform.Bible...',
          command: 'platformBible.about',
          hasDivider: true,
        },
      ],
    },
  ],
};

export const supportAndDevelopmentMenuLayout: GridMenuInfo = {
  columns: [
    {
      name: 'Project',
      items: [
        {
          name: 'Download/Install Resources...',
          command: 'platform.downloadAndInstallResources',
          hasDivider: true,
        },
        {
          name: 'Open Text Collection...',
          command: 'platform.openTextCollection',
          hasDivider: true,
        },
        {
          name: 'Settings...',
          command: 'platform.settings',
          hasDivider: true,
        },
        {
          name: 'Reload Extensions',
          command: 'platform.restartExtensionHost',
          hasDivider: true,
        },
        {
          name: 'Exit',
          command: 'platform.quit',
          hasDivider: true,
        },
      ],
    },
    {
      name: 'Window',
      items: [],
    },
    {
      name: 'Layout',
      items: [],
    },
    {
      name: 'Help',
      items: [
        {
          name: 'Visit Support.Bible',
          command: 'platformBible.visitSupportPage',
          hasDivider: true,
        },
        {
          name: 'About Platform.Bible...',
          command: 'platformBible.about',
          hasDivider: true,
        },
      ],
    },
  ],
};

export function handleMenuData(isSupportAndDevelopment: boolean) {
  if (isSupportAndDevelopment) return supportAndDevelopmentMenuLayout;
  return standardMenuLayout;
}

export default standardMenuLayout;
