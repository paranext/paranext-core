import{j as e,r as s}from"./iframe-BuAslHK5.js";import{P as l}from"./platform-menubar.component-DPzxqDyX.js";import"./preload-helper-CTOgD26E.js";import"./menubar-C-tNSNUA.js";import"./utils-BPbySc-g.js";import"./menu.context-myXs9mUs.js";import"./index-BnuTq2W6.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-fdk2KJWo.js";import"./index-B4hIMw6l.js";import"./index-DvCyZILw.js";import"./index-aoH12Seb.js";import"./index-Rk8NGxiK.js";import"./index-CSFiBaRo.js";import"./index-DVJjMwqa.js";import"./index-Dhw2S8oA.js";import"./index-D1hQSaXA.js";import"./index-6OWThe2G.js";import"./index-SoSK5Jm7.js";import"./index-DZwQDr2_.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-B6YZRYAm.js";import"./index-ubIJ78tM.js";import"./index-DxRrSfPy.js";import"./createReactComponent-BwZlM-6e.js";import"./IconCheck-CzPIjgPV.js";import"./tooltip-gIIwWVMh.js";import"./button-CkwNhtvy.js";import"./portal-container.context-C4F8KuBG.js";import"./index-HblD8LHi.js";import"./menu.util-C3wJQgOq.js";import"./menu-icon.component-Br04pu44.js";const ce={title:"Advanced/Menu/PlatformMenubar",component:l,tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},onOpenChange:{control:!1,description:"Optional callback for menu open/close state changes"},variant:{control:"select",options:["default","muted"],description:"Style variant for the menubar",defaultValue:"default"}}},m=()=>({columns:{"platform.app":{label:"Project",order:1},"platform.help":{label:"Help",order:4},isExtensible:!0},groups:{"platform.projectProjects":{column:"platform.app",order:1,isExtensible:!0},"platform.projectResources":{column:"platform.app",order:2,isExtensible:!0},"platform.projectSettings":{column:"platform.app",order:3},"platform.projectMisc":{column:"platform.app",order:4},"platform.windowGroup":{column:"platform.window",order:1},"platform.layoutGroup":{column:"platform.layout",order:1},"platform.helpRegistration":{column:"platform.help",order:1,isExtensible:!0},"platform.helpMisc":{column:"platform.help",order:2},"platform.helpSubMenu":{menuItem:"platform.helpSubMenuId",order:3},"platform.helpSubSubMenu":{menuItem:"platform.helpSubSubMenuId",order:4}},items:[{label:"Settings",localizeNotes:"Application main menu > Project > Settings",group:"platform.projectSettings",order:1,command:"platform.openSettings",iconPathBefore:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"Exit",localizeNotes:"Application main menu > Project > Exit",group:"platform.projectMisc",order:999999999,command:"platform.quit",iconPathAfter:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"Visit Support.Bible",localizeNotes:"Application main menu > Help > Visit Support.Bible",group:"platform.helpMisc",order:1,command:"platform.visitSupportPage",iconPathAfter:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg",iconPathBefore:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"About Platform.Bible",localizeNotes:"Application main menu > Help > About Platform.Bible",group:"platform.helpMisc",order:2,command:"platform.about"},{label:"Open Developer Documentation",localizeNotes:"Application main menu > Help > Open Developer Documentation",group:"platform.helpMisc",order:4,command:"platform.openDeveloperDocumentationUrl"},{label:"Help Sub Menu",localizeNotes:"Application main menu > Help > Help Sub Menu",group:"platform.helpMisc",order:3,id:"platform.helpSubMenuId"},{label:"Help Sub Menu Item 1",localizeNotes:"Application main menu > Help > Help Sub Menu > Item 1",group:"platform.helpSubMenu",order:1,command:"platform.openSettings"},{label:"Help Sub Sub Menu",localizeNotes:"Application main menu > Help > Help Sub Menu > Help Sub Sub Menu",group:"platform.helpSubMenu",order:3,id:"platform.helpSubSubMenuId"},{label:"Help Sub Sub Menu Item 1",localizeNotes:"Application main menu > Help > Help Sub Menu > Help Sub Sub Menu > Item 1",group:"platform.helpSubSubMenu",order:1,command:"platform.openSettings"},{label:"Toggle Include My Paratext 9 Projects",tooltip:'Whether to look in the Paratext 9 project storage folder for Paratext projects to load (Windows only). Located at "C:\\My Paratext 9 Projects". Note: you must restart Platform.Bible in order for a change in this setting to take effect.',localizeNotes:"Application main menu > Project > Settings > Toggle Include My Paratext 9 Projects",group:"platform.projectProjects",order:1005,command:"platformScripture.toggleIncludeMyParatext9Projects"},{label:"Open Scripture Editor",localizeNotes:"Application main menu > Project > Open Scripture Editor",group:"platform.projectResources",order:-100,command:"platformScriptureEditor.openScriptureEditor"},{label:"Open Resource Viewer",localizeNotes:"Application main menu > Project > Open Resource Viewer",group:"platform.projectResources",order:-99,command:"platformScriptureEditor.openResourceViewer"},{label:"Paratext Registration Information...",localizeNotes:"Application main menu > Help > Paratext Registration Information...",group:"platform.helpRegistration",order:1006,command:"paratextRegistration.showParatextRegistration"},{label:"Home...",localizeNotes:"Application main menu > Project > Open Home...",group:"platform.projectResources",order:1001,command:"platformGetResources.openHome"}]});function z({variant:o}){const[r,t]=s.useState(""),[a,n]=s.useState(!1),f=h=>{t(h.command)},H=h=>{n(h)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(l,{menuData:m(),onSelectMenuItem:f,onOpenChange:H,variant:o}),e.jsxs("div",{className:"tw:space-y-2 tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Menu Status:"})," ",a?"Open":"Closed"]}),e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",r||"None"]}),e.jsxs("div",{className:"tw:text-xs tw:text-muted-foreground",children:[e.jsx("strong",{children:"Keyboard shortcuts:"})," Alt+P (Project), Alt+L (Layout), Alt+N (Navigate), Alt+H (Help)"]})]})]})}const p={render:()=>e.jsx(z,{})},i={render:()=>e.jsx(z,{variant:"muted"}),parameters:{docs:{description:{story:"Menubar with muted styling for subtle integration."}}}},c={render:()=>{const[o,r]=s.useState(""),t={...m(),groups:{...m().groups,"platform.app.export":{column:"platform.app",order:3},"platform.app.export.formats":{menuItem:"platform.export",order:1}},items:[...m().items,{label:"Export As...",tooltip:"Export project in various formats",localizeNotes:"Export submenu",group:"platform.app.export",order:1,id:"platform.export"},{label:"PDF",tooltip:"Export as PDF document",localizeNotes:"PDF export",group:"platform.app.export.formats",order:1,command:"platform.exportPDF"},{label:"Word Document",tooltip:"Export as Word document",localizeNotes:"Word export",group:"platform.app.export.formats",order:2,command:"platform.exportWord"},{label:"Plain Text",tooltip:"Export as plain text",localizeNotes:"Text export",group:"platform.app.export.formats",order:3,command:"platform.exportText"}]},a=n=>{r(n.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(l,{menuData:t,onSelectMenuItem:a}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",o||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Try the "Project" menu and look for the "Export As..." submenu.'})]})]})},parameters:{docs:{description:{story:"Example with nested submenus showing hierarchical menu organization."}}}},u={tags:["test"],render:()=>{const[o,r]=s.useState(""),t=m(),a={...t,items:[...t.items,{label:"Find",tooltip:"Find text in the project",localizeNotes:"Application main menu > Project > Find",group:"platform.projectSettings",order:2,command:"platform.find",shortcut:"Ctrl+F"}]},n=f=>{r(f.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(l,{menuData:a,onSelectMenuItem:n}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-muted tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",o||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Open the "Project" menu: "Find" shows its shortcut at the end of the row.'})]})]})},parameters:{docs:{description:{story:"Menubar with a command item that shows its keyboard shortcut hint."}}}},d={render:()=>{const[o,r]=s.useState(""),t={columns:{"platform.app":{label:"File",order:1},"platform.help":{label:"Help",order:2}},groups:{"platform.app.main":{column:"platform.app",order:1},"platform.help.main":{column:"platform.help",order:1}},items:[{label:"New",tooltip:"Create new document",localizeNotes:"New file command",group:"platform.app.main",order:1,command:"platform.new"},{label:"Open",tooltip:"Open existing document",localizeNotes:"Open file command",group:"platform.app.main",order:2,command:"platform.open"},{label:"About",tooltip:"About this application",localizeNotes:"About dialog",group:"platform.help.main",order:1,command:"platform.about"}]},a=n=>{r(n.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(l,{menuData:t,onSelectMenuItem:a}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",o||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Minimal menubar with just File and Help menus."})]})]})},parameters:{docs:{description:{story:"Simplified menubar with minimal menu structure for basic applications."}}}};var b,g,x;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <MenuDemo />
}`,...(x=(g=p.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var w,S,M;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <MenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Menubar with muted styling for subtle integration.'
      }
    }
  }
}`,...(M=(S=i.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var N,j,P;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(P=(j=c.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var v,C,y;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(y=(C=u.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var D,I,A;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(A=(I=d.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};const ue=["Default","MutedVariant","WithSubmenus","WithShortcutHints","MinimalMenu"];export{p as Default,d as MinimalMenu,i as MutedVariant,u as WithShortcutHints,c as WithSubmenus,ue as __namedExportsOrder,ce as default};
