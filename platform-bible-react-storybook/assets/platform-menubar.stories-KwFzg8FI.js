import{j as e,r as s}from"./iframe-D1SZpvhJ.js";import{P as m}from"./platform-menubar.component-MDhBd1Fr.js";import"./preload-helper-CTOgD26E.js";import"./menubar-GXurDiSM.js";import"./utils-BPbySc-g.js";import"./menu.context-BN0BnCTj.js";import"./index-BnuTq2W6.js";import"./use-dismiss-on-window-blur.hook-u5BeANax.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-DNuPEnxh.js";import"./index-BF4lifi6.js";import"./index-D6Nkly0L.js";import"./index-DA2m8vW-.js";import"./index-uZO2Rb5_.js";import"./index-CalxZy4E.js";import"./index-BNImGkpL.js";import"./index-VrRHttHj.js";import"./index-CaP0C2LT.js";import"./index-DN1DuW3l.js";import"./index-CShuqExK.js";import"./index-C-Pbi6In.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-B84MTRIc.js";import"./index-C0ycuobO.js";import"./index-DnTh8p-3.js";import"./createReactComponent-JPrj0szX.js";import"./IconCheck-DWJaLGrX.js";import"./tooltip-DImImlbh.js";import"./button-TwHp1ArR.js";import"./portal-container.context-BnuKkI1y.js";import"./index-DG79uRi3.js";import"./shortcut-keys.component-BXCWQo6x.js";import"./index-B259sMQH.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./kbd-3JM3Qm2h.js";import"./menu.util-C0mlN358.js";import"./lucide-icon.component-BHPfuRhE.js";import"./createLucideIcon-ASNMBz4j.js";import"./undo-2-BEzVtiWz.js";import"./circle-check-big-B4f_B5zF.js";import"./message-square-DPyy7Dy9.js";import"./search-CTFBtsEX.js";import"./book-open-D4G2y-fm.js";import"./square-x-C7058mQJ.js";import"./file-text-C82Ue42g.js";import"./eye-B2U60y5E.js";import"./external-link-DJl_Vg4x.js";import"./circle-question-mark-TWXwRZ5O.js";import"./settings-JY_12lBk.js";import"./house-B1Jg4umF.js";import"./menu-icon.component-BA7QL5pK.js";const Fe={title:"Advanced/Menu/PlatformMenubar",component:m,tags:["autodocs"],parameters:{docs:{description:{component:`
A menubar component designed specifically for Platform.Bible applications.

This component provides:
- Multi-column menu organization with groups and items
- Support for commands and submenus
- Keyboard shortcuts (Alt+P, Alt+L, Alt+N, Alt+H)
- Tooltips for menu items
- Icon support (before and after text)
- Style variants (default, muted)
- Menu state change notifications

The menubar accepts structured menu data from Platform.Bible and renders it as an accessible menubar component.
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},onOpenChange:{control:!1,description:"Optional callback for menu open/close state changes"},variant:{control:"select",options:["default","muted"],description:"Style variant for the menubar",defaultValue:"default"}}},l=()=>({columns:{"platform.app":{label:"Project",order:1},"platform.help":{label:"Help",order:4},isExtensible:!0},groups:{"platform.projectProjects":{column:"platform.app",order:1,isExtensible:!0},"platform.projectResources":{column:"platform.app",order:2,isExtensible:!0},"platform.projectSettings":{column:"platform.app",order:3},"platform.projectMisc":{column:"platform.app",order:4},"platform.windowGroup":{column:"platform.window",order:1},"platform.layoutGroup":{column:"platform.layout",order:1},"platform.helpRegistration":{column:"platform.help",order:1,isExtensible:!0},"platform.helpMisc":{column:"platform.help",order:2},"platform.helpSubMenu":{menuItem:"platform.helpSubMenuId",order:3},"platform.helpSubSubMenu":{menuItem:"platform.helpSubSubMenuId",order:4}},items:[{label:"Settings",localizeNotes:"Application main menu > Project > Settings",group:"platform.projectSettings",order:1,command:"platform.openSettings",iconPathBefore:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"Exit",localizeNotes:"Application main menu > Project > Exit",group:"platform.projectMisc",order:999999999,command:"platform.quit",iconPathAfter:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"Visit Support.Bible",localizeNotes:"Application main menu > Help > Visit Support.Bible",group:"platform.helpMisc",order:1,command:"platform.visitSupportPage",iconPathAfter:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg",iconPathBefore:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"About Platform.Bible",localizeNotes:"Application main menu > Help > About Platform.Bible",group:"platform.helpMisc",order:2,command:"platform.about"},{label:"Open Developer Documentation",localizeNotes:"Application main menu > Help > Open Developer Documentation",group:"platform.helpMisc",order:4,command:"platform.openDeveloperDocumentationUrl"},{label:"Help Sub Menu",localizeNotes:"Application main menu > Help > Help Sub Menu",group:"platform.helpMisc",order:3,id:"platform.helpSubMenuId"},{label:"Help Sub Menu Item 1",localizeNotes:"Application main menu > Help > Help Sub Menu > Item 1",group:"platform.helpSubMenu",order:1,command:"platform.openSettings"},{label:"Help Sub Sub Menu",localizeNotes:"Application main menu > Help > Help Sub Menu > Help Sub Sub Menu",group:"platform.helpSubMenu",order:3,id:"platform.helpSubSubMenuId"},{label:"Help Sub Sub Menu Item 1",localizeNotes:"Application main menu > Help > Help Sub Menu > Help Sub Sub Menu > Item 1",group:"platform.helpSubSubMenu",order:1,command:"platform.openSettings"},{label:"Toggle Include My Paratext 9 Projects",tooltip:'Whether to look in the Paratext 9 project storage folder for Paratext projects to load (Windows only). Located at "C:\\My Paratext 9 Projects". Note: you must restart Platform.Bible in order for a change in this setting to take effect.',localizeNotes:"Application main menu > Project > Settings > Toggle Include My Paratext 9 Projects",group:"platform.projectProjects",order:1005,command:"platformScripture.toggleIncludeMyParatext9Projects"},{label:"Open Scripture Editor",localizeNotes:"Application main menu > Project > Open Scripture Editor",group:"platform.projectResources",order:-100,command:"platformScriptureEditor.openScriptureEditor"},{label:"Open Resource Viewer",localizeNotes:"Application main menu > Project > Open Resource Viewer",group:"platform.projectResources",order:-99,command:"platformScriptureEditor.openResourceViewer"},{label:"Paratext Registration Information...",localizeNotes:"Application main menu > Help > Paratext Registration Information...",group:"platform.helpRegistration",order:1006,command:"paratextRegistration.showParatextRegistration"},{label:"Home...",localizeNotes:"Application main menu > Project > Open Home...",group:"platform.projectResources",order:1001,command:"platformGetResources.openHome"}]});function L({variant:a}){const[r,t]=s.useState(""),[n,o]=s.useState(!1),f=b=>{t(b.command)},F=b=>{o(b)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(m,{menuData:l(),onSelectMenuItem:f,onOpenChange:F,variant:a}),e.jsxs("div",{className:"tw:space-y-2 tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Menu Status:"})," ",n?"Open":"Closed"]}),e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",r||"None"]}),e.jsxs("div",{className:"tw:text-xs tw:text-muted-foreground",children:[e.jsx("strong",{children:"Keyboard shortcuts:"})," Alt+P (Project), Alt+L (Layout), Alt+N (Navigate), Alt+H (Help)"]})]})]})}const i={render:()=>e.jsx(L,{})},c={render:()=>e.jsx(L,{variant:"muted"}),parameters:{docs:{description:{story:"Menubar with muted styling for subtle integration."}}}},p={render:()=>{const[a,r]=s.useState(""),t={...l(),groups:{...l().groups,"platform.app.export":{column:"platform.app",order:3},"platform.app.export.formats":{menuItem:"platform.export",order:1}},items:[...l().items,{label:"Export As...",tooltip:"Export project in various formats",localizeNotes:"Export submenu",group:"platform.app.export",order:1,id:"platform.export"},{label:"PDF",tooltip:"Export as PDF document",localizeNotes:"PDF export",group:"platform.app.export.formats",order:1,command:"platform.exportPDF"},{label:"Word Document",tooltip:"Export as Word document",localizeNotes:"Word export",group:"platform.app.export.formats",order:2,command:"platform.exportWord"},{label:"Plain Text",tooltip:"Export as plain text",localizeNotes:"Text export",group:"platform.app.export.formats",order:3,command:"platform.exportText"}]},n=o=>{r(o.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(m,{menuData:t,onSelectMenuItem:n}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",a||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Try the "Project" menu and look for the "Export As..." submenu.'})]})]})},parameters:{docs:{description:{story:"Example with nested submenus showing hierarchical menu organization."}}}},d={tags:["test"],render:()=>{const[a,r]=s.useState(""),t=l(),n={...t,items:[...t.items,{label:"Find",tooltip:"Find text in the project",localizeNotes:"Application main menu > Project > Find",group:"platform.projectSettings",order:2,command:"platform.find",shortcut:"Ctrl+F"}]},o=f=>{r(f.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(m,{menuData:n,onSelectMenuItem:o}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-muted tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",a||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Open the "Project" menu: "Find" shows its shortcut at the end of the row.'})]})]})},parameters:{docs:{description:{story:"Menubar with a command item that shows its keyboard shortcut hint."}}}},u={render:()=>{const[a,r]=s.useState(""),t={columns:{"story.dynamic":{label:"Dynamic",order:1}},groups:{"story.dynamicGroup":{column:"story.dynamic",order:1}},items:[{label:"Always enabled",localizeNotes:"",group:"story.dynamicGroup",order:1,command:"story.enabled"},{label:"Disabled (enabledWhen was falsy)",localizeNotes:"",group:"story.dynamicGroup",order:2,command:"story.disabled",disabled:!0},{label:"Checked toggle (checkedWhen was truthy)",localizeNotes:"",group:"story.dynamicGroup",order:3,command:"story.checked",checked:!0},{label:"Unchecked toggle",localizeNotes:"",group:"story.dynamicGroup",order:4,command:"story.unchecked",checked:!1},{label:"Plain item with a leading icon",localizeNotes:"",group:"story.dynamicGroup",order:5,command:"story.withIcon",iconNameBefore:"settings"},{label:"Plain item with an icon and a shortcut",localizeNotes:"",group:"story.dynamicGroup",order:6,command:"story.withIconAndShortcut",iconNameBefore:"search",shortcut:"Ctrl+F"},{label:"Checked toggle with an icon and a shortcut",localizeNotes:"",group:"story.dynamicGroup",order:7,command:"story.checkedWithIconAndShortcut",iconNameBefore:"eye",shortcut:"Ctrl+Shift+F",checked:!0}]},n=o=>{r(o.command),console.log("selected",o)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(m,{menuData:t,onSelectMenuItem:n}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",a||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Open "Dynamic" to see disabled and checkbox item states. Labels of checkbox items and the icon item start at the same position.'})]})]})},parameters:{docs:{description:{story:"Demonstrates runtime-computed disabled and checked states on menu items. Disabled items are grayed out and unclickable. Checkbox items show a checkmark when checked."}}}},h={render:()=>{const[a,r]=s.useState(""),t={columns:{"platform.app":{label:"File",order:1},"platform.help":{label:"Help",order:2}},groups:{"platform.app.main":{column:"platform.app",order:1},"platform.help.main":{column:"platform.help",order:1}},items:[{label:"New",tooltip:"Create new document",localizeNotes:"New file command",group:"platform.app.main",order:1,command:"platform.new"},{label:"Open",tooltip:"Open existing document",localizeNotes:"Open file command",group:"platform.app.main",order:2,command:"platform.open"},{label:"About",tooltip:"About this application",localizeNotes:"About dialog",group:"platform.help.main",order:1,command:"platform.about"}]},n=o=>{r(o.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(m,{menuData:t,onSelectMenuItem:n}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",a||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Minimal menubar with just File and Help menus."})]})]})},parameters:{docs:{description:{story:"Simplified menubar with minimal menu structure for basic applications."}}}};var g,x,w;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <MenuDemo />
}`,...(w=(x=i.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var y,S,M;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <MenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Menubar with muted styling for subtle integration.'
      }
    }
  }
}`,...(M=(S=c.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var N,j,C;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');

    // Extended menu data with submenus
    const menuDataWithSubmenus: Localized<MultiColumnMenu> = {
      ...createSampleMenuData(),
      groups: {
        ...createSampleMenuData().groups,
        'platform.app.export': {
          column: 'platform.app',
          order: 3
        },
        'platform.app.export.formats': {
          menuItem: 'platform.export',
          order: 1
        }
      },
      items: [...createSampleMenuData().items, {
        label: 'Export As...',
        tooltip: 'Export project in various formats',
        localizeNotes: 'Export submenu',
        group: 'platform.app.export',
        order: 1,
        id: 'platform.export'
      }, {
        label: 'PDF',
        tooltip: 'Export as PDF document',
        localizeNotes: 'PDF export',
        group: 'platform.app.export.formats',
        order: 1,
        command: 'platform.exportPDF'
      }, {
        label: 'Word Document',
        tooltip: 'Export as Word document',
        localizeNotes: 'Word export',
        group: 'platform.app.export.formats',
        order: 2,
        command: 'platform.exportWord'
      }, {
        label: 'Plain Text',
        tooltip: 'Export as plain text',
        localizeNotes: 'Text export',
        group: 'platform.app.export.formats',
        order: 3,
        command: 'platform.exportText'
      }]
    };
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };
    return <div className="tw:space-y-4">
        <PlatformMenubar menuData={menuDataWithSubmenus} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw:rounded tw:border tw:bg-gray-50 tw:p-4">
          <div className="tw:text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw:mt-2 tw:text-xs tw:text-muted-foreground">
            Try the &quot;Project&quot; menu and look for the &quot;Export As...&quot; submenu.
          </p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with nested submenus showing hierarchical menu organization.'
      }
    }
  }
}`,...(C=(j=p.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var v,D,P;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  tags: ['test'],
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');
    const sampleMenuData = createSampleMenuData();
    const menuDataWithShortcutHints: Localized<MultiColumnMenu> = {
      ...sampleMenuData,
      items: [...sampleMenuData.items, {
        label: 'Find',
        tooltip: 'Find text in the project',
        localizeNotes: 'Application main menu > Project > Find',
        group: 'platform.projectSettings',
        order: 2,
        command: 'platform.find',
        shortcut: 'Ctrl+F'
      }]
    };
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };
    return <div className="tw:space-y-4">
        <PlatformMenubar menuData={menuDataWithShortcutHints} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw:rounded tw:border tw:bg-muted tw:p-4">
          <div className="tw:text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw:mt-2 tw:text-xs tw:text-muted-foreground">
            Open the &quot;Project&quot; menu: &quot;Find&quot; shows its shortcut at the end of the
            row.
          </p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Menubar with a command item that shows its keyboard shortcut hint.'
      }
    }
  }
}`,...(P=(D=d.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};var I,z,k;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');
    const dynamicMenuData: Localized<MultiColumnMenu> = {
      columns: {
        'story.dynamic': {
          label: 'Dynamic',
          order: 1
        }
      },
      groups: {
        'story.dynamicGroup': {
          column: 'story.dynamic',
          order: 1
        }
      },
      items: [{
        label: 'Always enabled',
        localizeNotes: '',
        group: 'story.dynamicGroup',
        order: 1,
        command: 'story.enabled'
      }, {
        label: 'Disabled (enabledWhen was falsy)',
        localizeNotes: '',
        group: 'story.dynamicGroup',
        order: 2,
        command: 'story.disabled',
        disabled: true
      }, {
        label: 'Checked toggle (checkedWhen was truthy)',
        localizeNotes: '',
        group: 'story.dynamicGroup',
        order: 3,
        command: 'story.checked',
        checked: true
      }, {
        label: 'Unchecked toggle',
        localizeNotes: '',
        group: 'story.dynamicGroup',
        order: 4,
        command: 'story.unchecked',
        checked: false
      }, {
        label: 'Plain item with a leading icon',
        localizeNotes: '',
        group: 'story.dynamicGroup',
        order: 5,
        command: 'story.withIcon',
        iconNameBefore: 'settings'
      }, {
        label: 'Plain item with an icon and a shortcut',
        localizeNotes: '',
        group: 'story.dynamicGroup',
        order: 6,
        command: 'story.withIconAndShortcut',
        iconNameBefore: 'search',
        shortcut: 'Ctrl+F'
      }, {
        label: 'Checked toggle with an icon and a shortcut',
        localizeNotes: '',
        group: 'story.dynamicGroup',
        order: 7,
        command: 'story.checkedWithIconAndShortcut',
        iconNameBefore: 'eye',
        shortcut: 'Ctrl+Shift+F',
        checked: true
      }]
    };
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
      // Stories use console.log to log action results since storybook actions are unavailable here
      // eslint-disable-next-line no-console
      console.log('selected', item);
    };
    return <div className="tw:space-y-4">
        <PlatformMenubar menuData={dynamicMenuData} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw:rounded tw:border tw:bg-gray-50 tw:p-4">
          <div className="tw:text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw:mt-2 tw:text-xs tw:text-muted-foreground">
            Open &quot;Dynamic&quot; to see disabled and checkbox item states. Labels of checkbox
            items and the icon item start at the same position.
          </p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates runtime-computed disabled and checked states on menu items. Disabled items are grayed out and unclickable. Checkbox items show a checkmark when checked.'
      }
    }
  }
}`,...(k=(z=u.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var A,H,E;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');
    const minimalMenuData: Localized<MultiColumnMenu> = {
      columns: {
        'platform.app': {
          label: 'File',
          order: 1
        },
        'platform.help': {
          label: 'Help',
          order: 2
        }
      },
      groups: {
        'platform.app.main': {
          column: 'platform.app',
          order: 1
        },
        'platform.help.main': {
          column: 'platform.help',
          order: 1
        }
      },
      items: [{
        label: 'New',
        tooltip: 'Create new document',
        localizeNotes: 'New file command',
        group: 'platform.app.main',
        order: 1,
        command: 'platform.new'
      }, {
        label: 'Open',
        tooltip: 'Open existing document',
        localizeNotes: 'Open file command',
        group: 'platform.app.main',
        order: 2,
        command: 'platform.open'
      }, {
        label: 'About',
        tooltip: 'About this application',
        localizeNotes: 'About dialog',
        group: 'platform.help.main',
        order: 1,
        command: 'platform.about'
      }]
    };
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };
    return <div className="tw:space-y-4">
        <PlatformMenubar menuData={minimalMenuData} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw:rounded tw:border tw:bg-gray-50 tw:p-4">
          <div className="tw:text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw:mt-2 tw:text-xs tw:text-muted-foreground">
            Minimal menubar with just File and Help menus.
          </p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified menubar with minimal menu structure for basic applications.'
      }
    }
  }
}`,...(E=(H=h.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};const We=["Default","MutedVariant","WithSubmenus","WithShortcutHints","DynamicItemStates","MinimalMenu"];export{i as Default,u as DynamicItemStates,h as MinimalMenu,c as MutedVariant,d as WithShortcutHints,p as WithSubmenus,We as __namedExportsOrder,Fe as default};
