import { GridMenuInfo } from 'papi-components';

const standardMenuLayout: GridMenuInfo = {
  columns: [
    {
      name: 'Project',
      items: [
        {
          name: 'Download/Install Resources...',
          command: 'platformBible.downloadAndInstallResources',
        },
        {
          name: 'Open Text Collection...',
          command: 'platformBible.openTextCollection',
          hasDivider: true,
        },
        {
          name: 'Settings...',
          command: 'platformBible.settings',
          hasDivider: true,
        },
        {
          name: 'Exit',
          command: 'platformBible.exit',
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
        },
        {
          name: 'About Platform.Bible...',
          command: 'platformBible.about',
        },
      ],
    },
  ],
};

export default standardMenuLayout;
