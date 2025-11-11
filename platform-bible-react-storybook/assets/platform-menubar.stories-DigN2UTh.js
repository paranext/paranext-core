import{j as e}from"./jsx-runtime-CvGToidP.js";import{P as c}from"./platform-menubar.component-CTS8-fW8.js";import{r as u}from"./iframe-FHgAwj54.js";import"./menubar-DPj-s1IO.js";import"./menu.context-BrEJJXIC.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-CnlM3g2y.js";import"./index-DvVrmaIy.js";import"./index-D-wbo5Oc.js";import"./index-C6LUVuya.js";import"./index-lUSupRFo.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DLzBYexm.js";import"./index--W5ZaJkm.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./chevron-right-Cncp9OTI.js";import"./createLucideIcon-B4WsWZHQ.js";import"./check-Ce2iVscw.js";import"./circle-EX5G5xxd.js";import"./tooltip-Cs5ADqQk.js";import"./index-q5xUhQdo.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-CLDThtQX.js";const ie={title:"Advanced/Menu/PlatformMenubar",component:c,tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},onOpenChange:{control:!1,description:"Optional callback for menu open/close state changes"},variant:{control:"select",options:["default","muted"],description:"Style variant for the menubar",defaultValue:"default"}}},i=()=>({columns:{"platform.app":{label:"Project",order:1},"platform.help":{label:"Help",order:4},isExtensible:!0},groups:{"platform.projectProjects":{column:"platform.app",order:1,isExtensible:!0},"platform.projectResources":{column:"platform.app",order:2,isExtensible:!0},"platform.projectSettings":{column:"platform.app",order:3},"platform.projectMisc":{column:"platform.app",order:4},"platform.windowGroup":{column:"platform.window",order:1},"platform.layoutGroup":{column:"platform.layout",order:1},"platform.helpRegistration":{column:"platform.help",order:1,isExtensible:!0},"platform.helpMisc":{column:"platform.help",order:2},"platform.helpSubMenu":{menuItem:"platform.helpSubMenuId",order:3},"platform.helpSubSubMenu":{menuItem:"platform.helpSubSubMenuId",order:4}},items:[{label:"Settings",localizeNotes:"Application main menu > Project > Settings",group:"platform.projectSettings",order:1,command:"platform.openSettings",iconPathBefore:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"Exit",localizeNotes:"Application main menu > Project > Exit",group:"platform.projectMisc",order:999999999,command:"platform.quit",iconPathAfter:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"Visit Support.Bible",localizeNotes:"Application main menu > Help > Visit Support.Bible",group:"platform.helpMisc",order:1,command:"platform.visitSupportPage",iconPathAfter:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg",iconPathBefore:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"},{label:"About Platform.Bible",localizeNotes:"Application main menu > Help > About Platform.Bible",group:"platform.helpMisc",order:2,command:"platform.about"},{label:"Open Developer Documentation",localizeNotes:"Application main menu > Help > Open Developer Documentation",group:"platform.helpMisc",order:4,command:"platform.openDeveloperDocumentationUrl"},{label:"Help Sub Menu",localizeNotes:"Application main menu > Help > Help Sub Menu",group:"platform.helpMisc",order:3,id:"platform.helpSubMenuId"},{label:"Help Sub Menu Item 1",localizeNotes:"Application main menu > Help > Help Sub Menu > Item 1",group:"platform.helpSubMenu",order:1,command:"platform.openSettings"},{label:"Help Sub Sub Menu",localizeNotes:"Application main menu > Help > Help Sub Menu > Help Sub Sub Menu",group:"platform.helpSubMenu",order:3,id:"platform.helpSubSubMenuId"},{label:"Help Sub Sub Menu Item 1",localizeNotes:"Application main menu > Help > Help Sub Menu > Help Sub Sub Menu > Item 1",group:"platform.helpSubSubMenu",order:1,command:"platform.openSettings"},{label:"Toggle Include My Paratext 9 Projects",tooltip:'Whether to look in the Paratext 9 project storage folder for Paratext projects to load (Windows only). Located at "C:\\My Paratext 9 Projects". Note: you must restart Platform.Bible in order for a change in this setting to take effect.',localizeNotes:"Application main menu > Project > Settings > Toggle Include My Paratext 9 Projects",group:"platform.projectProjects",order:1005,command:"platformScripture.toggleIncludeMyParatext9Projects"},{label:"Open Scripture Editor",localizeNotes:"Application main menu > Project > Open Scripture Editor",group:"platform.projectResources",order:-100,command:"platformScriptureEditor.openScriptureEditor"},{label:"Open Resource Viewer",localizeNotes:"Application main menu > Project > Open Resource Viewer",group:"platform.projectResources",order:-99,command:"platformScriptureEditor.openResourceViewer"},{label:"Paratext Registration Information...",localizeNotes:"Application main menu > Help > Paratext Registration Information...",group:"platform.helpRegistration",order:1006,command:"paratextRegistration.showParatextRegistration"},{label:"Home...",localizeNotes:"Application main menu > Project > Open Home...",group:"platform.projectResources",order:1001,command:"platformGetResources.openHome"}]});function y({variant:t}){const[o,r]=u.useState(""),[a,n]=u.useState(!1),A=d=>{r(d.command)},D=d=>{n(d)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(c,{menuData:i(),onSelectMenuItem:A,onOpenChange:D,variant:t}),e.jsxs("div",{className:"tw-space-y-2 tw-rounded tw-border tw-bg-gray-50 tw-p-4",children:[e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Menu Status:"})," ",a?"Open":"Closed"]}),e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",o||"None"]}),e.jsxs("div",{className:"tw-text-xs tw-text-muted-foreground",children:[e.jsx("strong",{children:"Keyboard shortcuts:"})," Alt+P (Project), Alt+L (Layout), Alt+N (Navigate), Alt+H (Help)"]})]})]})}const m={render:()=>e.jsx(y,{})},l={render:()=>e.jsx(y,{variant:"muted"}),parameters:{docs:{description:{story:"Menubar with muted styling for subtle integration."}}}},p={render:()=>{const[t,o]=u.useState(""),r={...i(),groups:{...i().groups,"platform.app.export":{column:"platform.app",order:3},"platform.app.export.formats":{menuItem:"platform.export",order:1}},items:[...i().items,{label:"Export As...",tooltip:"Export project in various formats",localizeNotes:"Export submenu",group:"platform.app.export",order:1,id:"platform.export"},{label:"PDF",tooltip:"Export as PDF document",localizeNotes:"PDF export",group:"platform.app.export.formats",order:1,command:"platform.exportPDF"},{label:"Word Document",tooltip:"Export as Word document",localizeNotes:"Word export",group:"platform.app.export.formats",order:2,command:"platform.exportWord"},{label:"Plain Text",tooltip:"Export as plain text",localizeNotes:"Text export",group:"platform.app.export.formats",order:3,command:"platform.exportText"}]},a=n=>{o(n.command)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(c,{menuData:r,onSelectMenuItem:a}),e.jsxs("div",{className:"tw-rounded tw-border tw-bg-gray-50 tw-p-4",children:[e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw-mt-2 tw-text-xs tw-text-muted-foreground",children:'Try the "Project" menu and look for the "Export As..." submenu.'})]})]})},parameters:{docs:{description:{story:"Example with nested submenus showing hierarchical menu organization."}}}},s={render:()=>{const[t,o]=u.useState(""),r={columns:{"platform.app":{label:"File",order:1},"platform.help":{label:"Help",order:2}},groups:{"platform.app.main":{column:"platform.app",order:1},"platform.help.main":{column:"platform.help",order:1}},items:[{label:"New",tooltip:"Create new document",localizeNotes:"New file command",group:"platform.app.main",order:1,command:"platform.new"},{label:"Open",tooltip:"Open existing document",localizeNotes:"Open file command",group:"platform.app.main",order:2,command:"platform.open"},{label:"About",tooltip:"About this application",localizeNotes:"About dialog",group:"platform.help.main",order:1,command:"platform.about"}]},a=n=>{o(n.command)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(c,{menuData:r,onSelectMenuItem:a}),e.jsxs("div",{className:"tw-rounded tw-border tw-bg-gray-50 tw-p-4",children:[e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw-mt-2 tw-text-xs tw-text-muted-foreground",children:"Minimal menubar with just File and Help menus."})]})]})},parameters:{docs:{description:{story:"Simplified menubar with minimal menu structure for basic applications."}}}};var f,b,g;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <MenuDemo />
}`,...(g=(b=m.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var x,h,S;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <MenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Menubar with muted styling for subtle integration.'
      }
    }
  }
}`,...(S=(h=l.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var w,M,N;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
    return <div className="tw-space-y-4">
        <PlatformMenubar menuData={menuDataWithSubmenus} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw-rounded tw-border tw-bg-gray-50 tw-p-4">
          <div className="tw-text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw-mt-2 tw-text-xs tw-text-muted-foreground">
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
}`,...(N=(M=p.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var j,P,v;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
    return <div className="tw-space-y-4">
        <PlatformMenubar menuData={minimalMenuData} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw-rounded tw-border tw-bg-gray-50 tw-p-4">
          <div className="tw-text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw-mt-2 tw-text-xs tw-text-muted-foreground">
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
}`,...(v=(P=s.parameters)==null?void 0:P.docs)==null?void 0:v.source}}};const ue=["Default","MutedVariant","WithSubmenus","MinimalMenu"];export{m as Default,s as MinimalMenu,l as MutedVariant,p as WithSubmenus,ue as __namedExportsOrder,ie as default};
