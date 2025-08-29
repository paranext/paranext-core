import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{P as d}from"./platform-menubar.component-CJ34l6nP.js";import{r as c}from"./iframe-ChjBVkNN.js";import"./menubar-DoG3CvrU.js";import"./menu.context-CpkRnBjl.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-DBlYwqkt.js";import"./index-uX5GIGLq.js";import"./index-CtW3L1xI.js";import"./index-B3HFQzOn.js";import"./index-CKeV44jl.js";import"./index-VUEIl7Yq.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-CJGEWkUs.js";import"./index-Db6mirig.js";import"./index-CPgSHOWO.js";import"./index-BjqnVq7v.js";import"./index-a8-6909D.js";import"./index-BeaXc5ys.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./chevron-right-DW0kcE5l.js";import"./createLucideIcon-CVIRtPIF.js";import"./check-DhWHefu6.js";import"./circle-CPJPDZbi.js";import"./tooltip-B7Hf0Jt_.js";import"./index-CTXI5JpQ.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-Cl35FoQo.js";const ue={title:"Advanced/Menu/PlatformMenubar",component:d,tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},onOpenChange:{control:!1,description:"Optional callback for menu open/close state changes"},variant:{control:"select",options:["default","muted"],description:"Style variant for the menubar",defaultValue:"default"}}},z="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",v="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",E="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDJWOUgxOEwyMiAyVjIySDE2VjE4SDJWMkgxM1pNMTQgMTBWNEwyMCAxMEgxNFoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",i=()=>({columns:{"platform.app":{label:"Project",order:1},"platform.window":{label:"Layout",order:2},"platform.layout":{label:"Navigate",order:3},"platform.help":{label:"Help",order:4}},groups:{"platform.app.file":{column:"platform.app",order:1},"platform.app.recent":{column:"platform.app",order:2},"platform.window.views":{column:"platform.window",order:1},"platform.layout.navigation":{column:"platform.layout",order:1},"platform.help.support":{column:"platform.help",order:1}},items:[{label:"New Project",tooltip:"Create a new project",localizeNotes:"Create new project command",group:"platform.app.file",order:1,command:"platform.newProject",iconPathBefore:E},{label:"Open Project",tooltip:"Open an existing project",localizeNotes:"Open existing project command",group:"platform.app.file",order:2,command:"platform.openProject",iconPathBefore:z},{label:"Recent Project 1",tooltip:"Open recent project",localizeNotes:"Recent project item",group:"platform.app.recent",order:1,command:"platform.openRecent1"},{label:"Recent Project 2",tooltip:"Open recent project",localizeNotes:"Recent project item",group:"platform.app.recent",order:2,command:"platform.openRecent2"},{label:"Show Resources",tooltip:"Toggle resource panel visibility",localizeNotes:"Toggle resources view",group:"platform.window.views",order:1,command:"platform.toggleResources"},{label:"Settings",tooltip:"Open application settings",localizeNotes:"Settings command",group:"platform.window.views",order:2,command:"platform.openSettings",iconPathAfter:v},{label:"Go to Chapter",tooltip:"Navigate to a specific chapter",localizeNotes:"Chapter navigation",group:"platform.layout.navigation",order:1,command:"platform.goToChapter"},{label:"Go to Verse",tooltip:"Navigate to a specific verse",localizeNotes:"Verse navigation",group:"platform.layout.navigation",order:2,command:"platform.goToVerse"},{label:"Documentation",tooltip:"View application documentation",localizeNotes:"Help documentation",group:"platform.help.support",order:1,command:"platform.openDocs"},{label:"About",tooltip:"About this application",localizeNotes:"About dialog",group:"platform.help.support",order:2,command:"platform.about"}]});function C({variant:t}){const[o,a]=c.useState(""),[r,n]=c.useState(!1),A=u=>{a(u.command)},S=u=>{n(u)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(d,{menuData:i(),onSelectMenuItem:A,onOpenChange:S,variant:t}),e.jsxs("div",{className:"tw-space-y-2 tw-rounded tw-border tw-bg-gray-50 tw-p-4",children:[e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Menu Status:"})," ",r?"Open":"Closed"]}),e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",o||"None"]}),e.jsxs("div",{className:"tw-text-xs tw-text-muted-foreground",children:[e.jsx("strong",{children:"Keyboard shortcuts:"})," Alt+P (Project), Alt+L (Layout), Alt+N (Navigate), Alt+H (Help)"]})]})]})}const m={render:()=>e.jsx(C,{})},l={render:()=>e.jsx(C,{variant:"muted"}),parameters:{docs:{description:{story:"Menubar with muted styling for subtle integration."}}}},p={render:()=>{const[t,o]=c.useState(""),a={...i(),groups:{...i().groups,"platform.app.export":{column:"platform.app",order:3},"platform.app.export.formats":{menuItem:"platform.export",order:1}},items:[...i().items,{label:"Export As...",tooltip:"Export project in various formats",localizeNotes:"Export submenu",group:"platform.app.export",order:1,id:"platform.export"},{label:"PDF",tooltip:"Export as PDF document",localizeNotes:"PDF export",group:"platform.app.export.formats",order:1,command:"platform.exportPDF"},{label:"Word Document",tooltip:"Export as Word document",localizeNotes:"Word export",group:"platform.app.export.formats",order:2,command:"platform.exportWord"},{label:"Plain Text",tooltip:"Export as plain text",localizeNotes:"Text export",group:"platform.app.export.formats",order:3,command:"platform.exportText"}]},r=n=>{o(n.command)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(d,{menuData:a,onSelectMenuItem:r}),e.jsxs("div",{className:"tw-rounded tw-border tw-bg-gray-50 tw-p-4",children:[e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw-mt-2 tw-text-xs tw-text-muted-foreground",children:'Try the "Project" menu and look for the "Export As..." submenu.'})]})]})},parameters:{docs:{description:{story:"Example with nested submenus showing hierarchical menu organization."}}}},s={render:()=>{const[t,o]=c.useState(""),a={columns:{"platform.app":{label:"File",order:1},"platform.help":{label:"Help",order:2}},groups:{"platform.app.main":{column:"platform.app",order:1},"platform.help.main":{column:"platform.help",order:1}},items:[{label:"New",tooltip:"Create new document",localizeNotes:"New file command",group:"platform.app.main",order:1,command:"platform.new"},{label:"Open",tooltip:"Open existing document",localizeNotes:"Open file command",group:"platform.app.main",order:2,command:"platform.open"},{label:"About",tooltip:"About this application",localizeNotes:"About dialog",group:"platform.help.main",order:1,command:"platform.about"}]},r=n=>{o(n.command)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(d,{menuData:a,onSelectMenuItem:r}),e.jsxs("div",{className:"tw-rounded tw-border tw-bg-gray-50 tw-p-4",children:[e.jsxs("div",{className:"tw-text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw-mt-2 tw-text-xs tw-text-muted-foreground",children:"Minimal menubar with just File and Help menus."})]})]})},parameters:{docs:{description:{story:"Simplified menubar with minimal menu structure for basic applications."}}}};var g,f,M;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <MenuDemo />
}`,...(M=(f=m.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var x,b,w;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <MenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Menubar with muted styling for subtle integration.'
      }
    }
  }
}`,...(w=(b=l.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var h,N,I;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(I=(N=p.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var D,j,y;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(y=(j=s.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};const ge=["Default","MutedVariant","WithSubmenus","MinimalMenu"];export{m as Default,s as MinimalMenu,l as MutedVariant,p as WithSubmenus,ge as __namedExportsOrder,ue as default};
