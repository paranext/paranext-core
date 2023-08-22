import { GridMenuInfo } from 'papi-components';

const standardMenuLayout: GridMenuInfo = {
  columns: [
    {
      name: 'Project',
      items: [
        {
          name: 'Open',
          command: 'platform.openProjectDialog',
          hasDivider: true,
        },
        {
          name: 'Download/Update Project',
          command: 'platform.openDownloadUpdateProjectDialog',
          hasDivider: true,
        },
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
          command: 'platform.visitSupportPage',
          hasDivider: true,
        },
        {
          name: 'About Platform.Bible...',
          command: 'platform.about',
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
          name: 'Open',
          command: 'platform.openProjectDialog',
          hasDivider: true,
        },
        {
          name: 'Download/Update Project',
          command: 'platform.openDownloadUpdateProjectDialog',
          hasDivider: true,
        },
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
          command: 'platform.visitSupportPage',
          hasDivider: true,
        },
        {
          name: 'About Platform.Bible...',
          command: 'platform.about',
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
