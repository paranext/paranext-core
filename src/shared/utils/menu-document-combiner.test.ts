import { deepEqual } from 'platform-bible-utils';
import MenuDocumentCombiner from './menu-document-combiner';

const startingDoc = {
  mainMenu: {
    columns: {
      'platform.window': { label: '%mainMenu_Window%', order: 1 },
      'platform.layout': { label: '%mainMenu_Layout%', order: 2 },
      'platform.help': { label: '%mainMenu_Help%', order: 3, isExtensible: true },
      isExtensible: true,
    },
    groups: {
      'platform.windowGroup1': { column: 'platform.window', order: 1, isExtensible: true },
      'platform.windowGroup2': { column: 'platform.window', order: 2 },
      'platform.layoutSaveDelete': { column: 'platform.layout', order: 1 },
      'platform.helpGroup1': { column: 'platform.help', order: 1 },
    },
    items: [],
  },
  defaultWebViewTopMenu: {
    columns: {
      'platform.project': { label: '%webView_Project%', order: 1 },
      'platform.edit': { label: '%webView_Edit%', order: 2, isExtensible: true },
    },
    groups: {
      'platform.projectTop': { column: 'platform.project', order: 1 },
      'platform.manageBooks': { column: 'platform.project', order: 2 },
      'platform.deleteProject': { column: 'platform.project', order: 3 },
      'platform.projectDetails': { column: 'platform.project', order: 4, isExtensible: true },
      'platform.undoRedo': { column: 'platform.edit', order: 1 },
      'platform.cutCopyPaste': { column: 'platform.edit', order: 2 },
    },
    items: [
      {
        label: '%projectSendReceive%',
        localizeNotes: 'Web view main menu > Project > Send/Receive this project',
        group: 'platform.projectTop',
        order: 1,
        command: 'platform.sendReceiveProject',
      },
      {
        label: '%projectAssignmentsAndProgress%',
        localizeNotes: 'Web view main menu > Project > Assignments and progress...',
        group: 'platform.projectTop',
        order: 2,
        command: 'platform.assignments',
      },
    ],
  },
  defaultWebViewContextMenu: {
    groups: {
      'platform.insert': { order: 1, isExtensible: true },
      'platform.wordList': { order: 2, isExtensible: true },
    },
    items: [
      {
        label: '%insertNote%',
        localizeNotes: 'Web view context menu > Insert note...',
        group: 'platform.insert',
        order: 1,
        command: 'platform.insertNote',
      },
      {
        label: '%wordList%',
        localizeNotes: 'Web view context menu > Word list...',
        group: 'platform.wordList',
        order: 1,
        command: 'platform.openWordList',
      },
    ],
  },
  webViewMenus: {},
};

const paratextExtensionContribution = {
  mainMenu: {
    columns: {
      'paratext.paratext': { label: '%mainMenu_Paratext%', order: 0 },
    },
    groups: {
      'paratext.sendReceive': { column: 'paratext.paratext', order: 1 },
      'paratext.openCreate': { column: 'paratext.paratext', order: 2 },
      'paratext.saveDelete': { column: 'paratext.paratext', order: 3 },
      'paratext.misc': { column: 'paratext.paratext', order: 9999999, isExtensible: true },
      'paratext.helpGroup': { column: 'platform.help', order: 100 },
      'paratext.helpSubgroup': { menuItem: 'paratext.helpRoot', order: 1 },
    },
    items: [
      {
        label: '%sendReceiveProjects%',
        tooltip: '%sendReceiveProjects_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Send/Receive Projects',
        group: 'paratext.sendReceive',
        order: 1,
        command: 'paratext.sendReceiveProjects',
      },
      {
        label: '%downloadInstallResources%',
        tooltip: '%downloadInstallResources_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Download/Install Resources',
        group: 'paratext.sendReceive',
        order: 2,
        command: 'paratext.downloadInstallResources',
      },
      {
        label: '%newProject%',
        tooltip: '%newProject_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > New Project',
        group: 'paratext.openCreate',
        order: 1,
        command: 'paratext.createNewProject',
      },
      {
        label: '%openProject%',
        tooltip: '%openProject_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Open Project',
        group: 'paratext.openCreate',
        order: 2,
        command: 'paratext.openProject',
      },
      {
        label: '%openTextCollection%',
        localizeNotes: 'Main application menu > Paratext column > Open Text Collection',
        group: 'paratext.openCreate',
        order: 3,
        command: 'paratext.openTextCollection',
      },
      {
        label: '%paratext_help%',
        localizeNotes: 'Main application menu > Help column > Paratext',
        group: 'paratext.helpGroup',
        order: 100,
        id: 'paratext.helpRoot',
      },
      {
        label: '%paratext_helpVideos%',
        localizeNotes: 'Main application menu > Help column > Paratext > Videos',
        group: 'paratext.helpSubgroup',
        order: 1,
        command: 'paratext.showHelpVideos',
      },
      {
        label: '%paratext_helpGuide%',
        localizeNotes: 'Main application menu > Help column > Paratext > Guide',
        group: 'paratext.helpSubgroup',
        order: 2,
        command: 'paratext.showHelpGuide',
      },
    ],
  },
};

const videoExtensionContribution = {
  mainMenu: {
    items: [
      {
        label: '%video_AddParatextVideo%',
        localizeNotes: 'Main application menu > Paratext column > Add Video',
        group: 'paratext.misc',
        order: 1,
        command: 'videoExtension.addParatextVideo',
      },
    ],
  },
  webViewMenus: {
    'videoExtension.playEditWebView': {
      includeDefaults: false,
      topMenu: {
        columns: {
          'videoExtension.video': { label: '%video%', order: 1 },
        },
        groups: {
          'videoExtension.videoTop': { column: 'videoExtension.project', order: 1 },
        },
        items: [
          {
            label: '%playVideo%',
            group: 'videoExtension.videoTop',
            order: 1,
            command: 'videoExtension.playVideo',
          },
          {
            label: '%editVideo%',
            group: 'videoExtension.videoTop',
            order: 2,
            command: 'videoExtension.editVideo',
          },
        ],
      },
    },
  },
};

const expectedOutput = {
  mainMenu: {
    columns: {
      'paratext.paratext': { label: '%mainMenu_Paratext%', order: 0 },
      'platform.window': { label: '%mainMenu_Window%', order: 1 },
      'platform.layout': { label: '%mainMenu_Layout%', order: 2 },
      'platform.help': { label: '%mainMenu_Help%', order: 3, isExtensible: true },
      isExtensible: true,
    },
    groups: {
      'paratext.sendReceive': { column: 'paratext.paratext', order: 1 },
      'paratext.openCreate': { column: 'paratext.paratext', order: 2 },
      'paratext.saveDelete': { column: 'paratext.paratext', order: 3 },
      'paratext.misc': { column: 'paratext.paratext', order: 9999999, isExtensible: true },
      'platform.windowGroup1': { column: 'platform.window', order: 1, isExtensible: true },
      'platform.windowGroup2': { column: 'platform.window', order: 2 },
      'platform.layoutSaveDelete': { column: 'platform.layout', order: 1 },
      'platform.helpGroup1': { column: 'platform.help', order: 1 },
      'paratext.helpGroup': { column: 'platform.help', order: 100 },
      'paratext.helpSubgroup': { menuItem: 'paratext.helpRoot', order: 1 },
    },
    items: [
      {
        label: '%sendReceiveProjects%',
        tooltip: '%sendReceiveProjects_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Send/Receive Projects',
        group: 'paratext.sendReceive',
        order: 1,
        command: 'paratext.sendReceiveProjects',
      },
      {
        label: '%downloadInstallResources%',
        tooltip: '%downloadInstallResources_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Download/Install Resources',
        group: 'paratext.sendReceive',
        order: 2,
        command: 'paratext.downloadInstallResources',
      },
      {
        label: '%newProject%',
        tooltip: '%newProject_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > New Project',
        group: 'paratext.openCreate',
        order: 1,
        command: 'paratext.createNewProject',
      },
      {
        label: '%openProject%',
        tooltip: '%openProject_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Open Project',
        group: 'paratext.openCreate',
        order: 2,
        command: 'paratext.openProject',
      },
      {
        label: '%openTextCollection%',
        localizeNotes: 'Main application menu > Paratext column > Open Text Collection',
        group: 'paratext.openCreate',
        order: 3,
        command: 'paratext.openTextCollection',
      },
      {
        label: '%paratext_help%',
        localizeNotes: 'Main application menu > Help column > Paratext',
        group: 'paratext.helpGroup',
        order: 100,
        id: 'paratext.helpRoot',
      },
      {
        label: '%paratext_helpVideos%',
        localizeNotes: 'Main application menu > Help column > Paratext > Videos',
        group: 'paratext.helpSubgroup',
        order: 1,
        command: 'paratext.showHelpVideos',
      },
      {
        label: '%paratext_helpGuide%',
        localizeNotes: 'Main application menu > Help column > Paratext > Guide',
        group: 'paratext.helpSubgroup',
        order: 2,
        command: 'paratext.showHelpGuide',
      },
      {
        label: '%video_AddParatextVideo%',
        localizeNotes: 'Main application menu > Paratext column > Add Video',
        group: 'paratext.misc',
        order: 1,
        command: 'videoExtension.addParatextVideo',
      },
    ],
  },
  defaultWebViewTopMenu: {
    columns: {
      'platform.project': { label: '%webView_Project%', order: 1 },
      'platform.edit': { label: '%webView_Edit%', order: 2, isExtensible: true },
    },
    groups: {
      'platform.projectTop': { column: 'platform.project', order: 1 },
      'platform.manageBooks': { column: 'platform.project', order: 2 },
      'platform.deleteProject': { column: 'platform.project', order: 3 },
      'platform.projectDetails': { column: 'platform.project', order: 4, isExtensible: true },
      'platform.undoRedo': { column: 'platform.edit', order: 1 },
      'platform.cutCopyPaste': { column: 'platform.edit', order: 2 },
    },
    items: [
      {
        label: '%projectSendReceive%',
        localizeNotes: 'Web view main menu > Project > Send/Receive this project',
        group: 'platform.projectTop',
        order: 1,
        command: 'platform.sendReceiveProject',
      },
      {
        label: '%projectAssignmentsAndProgress%',
        localizeNotes: 'Web view main menu > Project > Assignments and progress...',
        group: 'platform.projectTop',
        order: 2,
        command: 'platform.assignments',
      },
    ],
  },
  defaultWebViewContextMenu: {
    groups: {
      'platform.insert': { order: 1, isExtensible: true },
      'platform.wordList': { order: 2, isExtensible: true },
    },
    items: [
      {
        label: '%insertNote%',
        localizeNotes: 'Web view context menu > Insert note...',
        group: 'platform.insert',
        order: 1,
        command: 'platform.insertNote',
      },
      {
        label: '%wordList%',
        localizeNotes: 'Web view context menu > Word list...',
        group: 'platform.wordList',
        order: 1,
        command: 'platform.openWordList',
      },
    ],
  },
  webViewMenus: {
    'videoExtension.playEditWebView': {
      includeDefaults: false,
      topMenu: {
        columns: {
          'videoExtension.video': { label: '%video%', order: 1 },
        },
        groups: {
          'videoExtension.videoTop': { column: 'videoExtension.project', order: 1 },
        },
        items: [
          {
            label: '%playVideo%',
            group: 'videoExtension.videoTop',
            order: 1,
            command: 'videoExtension.playVideo',
          },
          {
            label: '%editVideo%',
            group: 'videoExtension.videoTop',
            order: 2,
            command: 'videoExtension.editVideo',
          },
        ],
      },
    },
  },
};

test('Sample documents all validate', () => {
  const menuCombiner = new MenuDocumentCombiner(startingDoc);
  menuCombiner.addOrUpdateContribution('paratext', paratextExtensionContribution);
  menuCombiner.addOrUpdateContribution('videoExtension', videoExtensionContribution);
  expect(deepEqual(menuCombiner.rawOutput, expectedOutput)).toBeTruthy();
});

test('Schema regex checking works as expected', () => {
  const menuCombiner = new MenuDocumentCombiner(startingDoc);
  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        groups: {
          'test.test.test.group': { column: 'platform.help', order: 1 },
        },
      },
    }),
  ).toThrow(/data\/mainMenu\/groups must NOT have additional properties/);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        columns: {
          'test.col1': { label: '%test_col1%invalid', order: 12345 },
        },
      },
    }),
  ).toThrow(/data\/mainMenu\/columns\/test.col1\/label must match pattern/);
});

test('Duplicate order values are caught', () => {
  const menuCombiner = new MenuDocumentCombiner(startingDoc);
  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        columns: {
          'test.col1': { label: '%test_col1%', order: -1 },
          'test.col2': { label: '%test_col2%', order: -1 },
        },
      },
    }),
  ).toThrow(/Duplicate column order: test.col2/);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        groups: {
          'test.group': { column: 'platform.help', order: 1 },
        },
      },
    }),
  ).toThrow(/Duplicate group order: test.group/);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        items: [
          {
            label: '%doSomething%',
            group: 'platform.windowGroup1',
            order: 1000,
            command: 'test.something',
          },
          {
            label: '%doSomethingElse%',
            group: 'platform.windowGroup1',
            order: 1000,
            command: 'test.somethingElse',
          },
        ],
      },
    }),
  ).toThrow(/Duplicate menu item order: %doSomethingElse%/);
});

test('isExtensible flags are honored', () => {
  const menuCombiner = new MenuDocumentCombiner(startingDoc);
  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      defaultWebViewTopMenu: {
        columns: {
          'test.col1': { label: '%test_col1%', order: 12345 },
        },
      },
    }),
  ).toThrow(/Cannot add new column test.col1 because isExtensible is not set/);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        groups: {
          'test.group1': { column: 'platform.window', order: 12345 },
        },
      },
    }),
  ).toThrow(/Cannot add new group test.group1 because isExtensible is not set/);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        items: [
          {
            label: '%doSomething%',
            group: 'platform.windowGroup2',
            order: 12345,
            command: 'test.something',
          },
        ],
      },
    }),
  ).toThrow(
    /Cannot add new menu item %doSomething% to group platform.windowGroup2 because isExtensible is not set/,
  );
});

test('Name prefixes are verified', () => {
  const menuCombiner = new MenuDocumentCombiner(startingDoc);
  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        columns: {
          'differentPrefix.col1': { label: '%test_col1%', order: 12345 },
        },
      },
    }),
  ).toThrow(/Column name differentPrefix.col1 does not start with test./);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        columns: {
          'differentPrefix.col1': { label: '%test_col1%', order: 12345 },
        },
      },
    }),
  ).toThrow(/Column name differentPrefix.col1 does not start with test./);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        groups: {
          'differentPrefix.group1': { column: 'platform.help', order: 12345 },
        },
      },
    }),
  ).toThrow(/Group name differentPrefix.group1 does not start with test./);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        groups: {
          'test.group1': { menuItem: 'somethingElse.menuItemID', order: 12345 },
        },
      },
    }),
  ).toThrow(/Cannot add new group test.group1 to a submenu owned by something else/);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      mainMenu: {
        items: [
          {
            label: '%doSomething%',
            group: 'platform.windowGroup1',
            order: 12345,
            id: 'differentPrefix.subMenu1',
          },
        ],
      },
    }),
  ).toThrow(/Menu item ID differentPrefix.subMenu1 does not start with test./);

  expect(() =>
    menuCombiner.addOrUpdateContribution('test', {
      webViewMenus: {
        'differentPrefix.something': {
          topMenu: {
            columns: {
              'test.column': { label: '%abc%', order: 1 },
            },
            groups: {
              'test.group': { column: 'test.column', order: 1 },
            },
            items: [
              {
                label: '%abc%',
                group: 'test.group',
                order: 1,
                command: 'platform.whatever',
              },
            ],
          },
        },
      },
    }),
  ).toThrow(/Cannot add a new web view unless it starts with test./);
});

test('Web view menu defaults are combined', () => {
  const menuCombiner = new MenuDocumentCombiner({
    mainMenu: {
      columns: {},
      groups: {},
      items: [],
    },
    defaultWebViewTopMenu: {
      columns: {
        'platform.topColumn': { label: '%test%', order: 1 },
      },
      groups: {
        'platform.topGroup': { column: 'platform.topColumn', order: 1 },
      },
      items: [
        {
          label: '%test%',
          group: 'platform.topGroup',
          order: 1,
          command: 'platform.test',
        },
      ],
    },
    defaultWebViewContextMenu: {
      groups: {
        'platform.contextGroup': { order: 1, isExtensible: true },
      },
      items: [
        {
          label: '%test%',
          group: 'platform.contextGroup',
          order: 1,
          command: 'platform.test',
        },
      ],
    },
    webViewMenus: {},
  });
  menuCombiner.addOrUpdateContribution('testWebView', {
    webViewMenus: {
      'testWebView.testWebView': {
        includeDefaults: true,
        topMenu: {
          columns: {
            'testWebView.topColumn': { label: '%video%', order: 2 },
          },
          groups: {
            'testWebView.topGroup': { column: 'testWebView.topColumn', order: 1 },
          },
          items: [
            {
              label: '%testWebViewItem%',
              group: 'testWebView.topGroup',
              order: 1,
              command: 'platform.whatever',
            },
          ],
        },
        contextMenu: {
          groups: {},
          items: [
            {
              label: '%testWebViewItem%',
              group: 'platform.contextGroup',
              order: 2,
              command: 'platform.whatever',
            },
          ],
        },
      },
    },
  });
  const expectedWebViewOutput = {
    mainMenu: {
      columns: {},
      groups: {},
      items: [],
    },
    defaultWebViewTopMenu: {
      columns: {
        'platform.topColumn': { label: '%test%', order: 1 },
      },
      groups: {
        'platform.topGroup': { column: 'platform.topColumn', order: 1 },
      },
      items: [
        {
          label: '%test%',
          group: 'platform.topGroup',
          order: 1,
          command: 'platform.test',
        },
      ],
    },
    defaultWebViewContextMenu: {
      groups: {
        'platform.contextGroup': { order: 1, isExtensible: true },
      },
      items: [
        {
          label: '%test%',
          group: 'platform.contextGroup',
          order: 1,
          command: 'platform.test',
        },
      ],
    },
    webViewMenus: {
      'testWebView.testWebView': {
        includeDefaults: true,
        topMenu: {
          columns: {
            'platform.topColumn': { label: '%test%', order: 1 },
            'testWebView.topColumn': { label: '%video%', order: 2 },
          },
          groups: {
            'platform.topGroup': { column: 'platform.topColumn', order: 1 },
            'testWebView.topGroup': { column: 'testWebView.topColumn', order: 1 },
          },
          items: [
            {
              label: '%testWebViewItem%',
              group: 'testWebView.topGroup',
              order: 1,
              command: 'platform.whatever',
            },
            {
              label: '%test%',
              group: 'platform.topGroup',
              order: 1,
              command: 'platform.test',
            },
          ],
        },
        contextMenu: {
          groups: { 'platform.contextGroup': { order: 1, isExtensible: true } },
          items: [
            {
              label: '%testWebViewItem%',
              group: 'platform.contextGroup',
              order: 2,
              command: 'platform.whatever',
            },
            {
              label: '%test%',
              group: 'platform.contextGroup',
              order: 1,
              command: 'platform.test',
            },
          ],
        },
      },
    },
  };
  expect(deepEqual(menuCombiner.rawOutput, expectedWebViewOutput)).toBeTruthy();
});
