import{j as e,r as p}from"./iframe-DlHZf3Mf.js";import{T as a}from"./tab-dropdown-menu.component-BtPmprEK.js";import{S as E}from"./settings-dMm2nTro.js";import{H as L}from"./house-Cvtx27uE.js";import{F as P}from"./file-text-9raQYr2k.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-CXUzJ7cS.js";import"./menu.context-XQKtml-W.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./IconCheck-Cmfptwaf.js";import"./createReactComponent-DmqfEhuE.js";import"./IconChevronRight-D8vVNtCf.js";import"./index-DgSXEhYl.js";import"./index-DoEngwzP.js";import"./index-D-Zpaie_.js";import"./index-BsYkzU57.js";import"./index-DPlOqNfc.js";import"./index-DBGo_7pW.js";import"./index-DwkXEaN0.js";import"./index-nFXyW1uq.js";import"./index-BQjQT5_6.js";import"./index-rfCQCPEE.js";import"./index-CwogW9J1.js";import"./index-C7jFbNlB.js";import"./index-ClfCsxJs.js";import"./index-DLtnJ4Jx.js";import"./tooltip-B5XHybJx.js";import"./button-CH3NjS7l.js";import"./z-index-CoNkaVR8.js";import"./index-BxcXJXbY.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-BXurFA_S.js";import"./createLucideIcon-DbC0KmkZ.js";const ge={title:"Advanced/Menu/TabDropdownMenu",component:a,tags:["autodocs"],parameters:{docs:{description:{component:`
A dropdown menu component designed specifically for tab contexts in Platform.Bible applications.

This component provides:
- Multi-column menu organization with automatic separators
- Tooltips for menu items
- Support for icons (before and after text)
- Custom trigger icons (defaults to hamburger menu)
- Style variants (default, muted)
- Accessibility with proper aria-label

Unlike the platform menubar, this component ignores column headers and uses separators to distinguish between menu sections.
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},tabLabel:{control:"text",description:"Accessibility label for the dropdown trigger"},icon:{control:!1,description:"Optional custom icon for the trigger button"},className:{control:"text",description:"Additional CSS classes for custom styling"},variant:{control:"select",options:["default","muted"],description:"Style variant for the dropdown menu",defaultValue:"default"},id:{control:"text",description:"Optional unique identifier"}}},F="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",Z="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",o=()=>({columns:{"tab.edit":{label:"Edit",order:1},"tab.view":{label:"View",order:2},"tab.tools":{label:"Tools",order:3}},groups:{"tab.edit.clipboard":{column:"tab.edit",order:1},"tab.edit.text":{column:"tab.edit",order:2},"tab.view.zoom":{column:"tab.view",order:1},"tab.view.layout":{column:"tab.view",order:2},"tab.tools.main":{column:"tab.tools",order:1}},items:[{label:"Copy",tooltip:"Copy selected text",localizeNotes:"Copy command",group:"tab.edit.clipboard",order:1,command:"tab.copy"},{label:"Paste",tooltip:"Paste from clipboard",localizeNotes:"Paste command",group:"tab.edit.clipboard",order:2,command:"tab.paste"},{label:"Find",tooltip:"Find text in document",localizeNotes:"Find command",group:"tab.edit.text",order:1,command:"tab.find"},{label:"Replace",tooltip:"Find and replace text",localizeNotes:"Replace command",group:"tab.edit.text",order:2,command:"tab.replace"},{label:"Zoom In",tooltip:"Increase text size",localizeNotes:"Zoom in command",group:"tab.view.zoom",order:1,command:"tab.zoomIn"},{label:"Zoom Out",tooltip:"Decrease text size",localizeNotes:"Zoom out command",group:"tab.view.zoom",order:2,command:"tab.zoomOut"},{label:"Split View",tooltip:"Split the document view",localizeNotes:"Split view command",group:"tab.view.layout",order:1,command:"tab.splitView",iconPathBefore:F},{label:"Full Screen",tooltip:"Enter full screen mode",localizeNotes:"Full screen command",group:"tab.view.layout",order:2,command:"tab.fullScreen"},{label:"Preferences",tooltip:"Open tab preferences",localizeNotes:"Preferences command",group:"tab.tools.main",order:1,command:"tab.preferences",iconPathAfter:Z}]});function b({variant:s,customIcon:n,customLabel:t="Tab Options"}){const[r,u]=p.useState(""),z=A=>{u(A.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(a,{menuData:o(),onSelectMenuItem:z,tabLabel:t,icon:n,variant:s}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Click the menu button to see tab options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",r||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Menu items are organized by columns and separated with dividers."})]})]})}const m={render:()=>e.jsx(b,{})},i={render:()=>e.jsx(b,{customIcon:e.jsx(E,{className:"tw:h-4 tw:w-4"}),customLabel:"Settings Menu"}),parameters:{docs:{description:{story:"Tab dropdown menu with a custom settings icon instead of the default hamburger menu."}}}},d={render:()=>e.jsx(b,{variant:"muted"}),parameters:{docs:{description:{story:"Tab dropdown menu with muted styling for subtle integration."}}}},l={render:()=>{const[s,n]=p.useState(""),t=r=>{n(r.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:rounded tw:border tw:p-4",children:[e.jsx("span",{className:"tw:text-sm tw:font-medium",children:"Document Tab:"}),e.jsx(a,{menuData:o(),onSelectMenuItem:t,tabLabel:"Document Options"}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Settings Tab:"}),e.jsx(a,{menuData:o(),onSelectMenuItem:t,tabLabel:"Settings Options",icon:e.jsx(E,{className:"tw:h-4 tw:w-4"}),variant:"muted"}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Home Tab:"}),e.jsx(a,{menuData:o(),onSelectMenuItem:t,tabLabel:"Home Options",icon:e.jsx(L,{className:"tw:h-4 tw:w-4"})})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",s||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Example showing multiple tab dropdown menus with different icons and variants."})]})]})},parameters:{docs:{description:{story:"Multiple tab dropdown menus showing different configurations and use cases."}}}},c={render:()=>{const[s,n]=p.useState(""),t={...o(),groups:{...o().groups,"tab.tools.export":{column:"tab.tools",order:2},"tab.tools.export.formats":{menuItem:"tab.export",order:1}},items:[...o().items,{label:"Export...",tooltip:"Export document in various formats",localizeNotes:"Export submenu",group:"tab.tools.export",order:1,id:"tab.export"},{label:"Export as PDF",tooltip:"Export document as PDF",localizeNotes:"PDF export",group:"tab.tools.export.formats",order:1,command:"tab.exportPDF"},{label:"Export as Text",tooltip:"Export document as plain text",localizeNotes:"Text export",group:"tab.tools.export.formats",order:2,command:"tab.exportText"}]},r=u=>{n(u.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(a,{menuData:t,onSelectMenuItem:r,tabLabel:"Tab with Submenus",icon:e.jsx(P,{className:"tw:h-4 tw:w-4"})}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Tab menu with nested export options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",s||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Try the "Tools" section and look for the "Export..." submenu.'})]})]})},parameters:{docs:{description:{story:"Tab dropdown menu with nested submenus for complex menu hierarchies."}}}};var w,x,g;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <TabMenuDemo />
}`,...(g=(x=m.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var M,h,f;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <TabMenuDemo customIcon={<Settings className="tw:h-4 tw:w-4" />} customLabel="Settings Menu" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with a custom settings icon instead of the default hamburger menu.'
      }
    }
  }
}`,...(f=(h=i.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var N,D,I;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <TabMenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with muted styling for subtle integration.'
      }
    }
  }
}`,...(I=(D=d.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var S,T,y;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };
    return <div className="tw:space-y-4">
        <div className="tw:flex tw:items-center tw:gap-2 tw:rounded tw:border tw:p-4">
          <span className="tw:text-sm tw:font-medium">Document Tab:</span>
          <TabDropdownMenu menuData={createSampleMenuData()} onSelectMenuItem={handleSelectMenuItem} tabLabel="Document Options" />

          <span className="tw:ml-4 tw:text-sm tw:font-medium">Settings Tab:</span>
          <TabDropdownMenu menuData={createSampleMenuData()} onSelectMenuItem={handleSelectMenuItem} tabLabel="Settings Options" icon={<Settings className="tw:h-4 tw:w-4" />} variant="muted" />

          <span className="tw:ml-4 tw:text-sm tw:font-medium">Home Tab:</span>
          <TabDropdownMenu menuData={createSampleMenuData()} onSelectMenuItem={handleSelectMenuItem} tabLabel="Home Options" icon={<Home className="tw:h-4 tw:w-4" />} />
        </div>

        <div className="tw:rounded tw:border tw:bg-gray-50 tw:p-4">
          <div className="tw:text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw:mt-2 tw:text-xs tw:text-muted-foreground">
            Example showing multiple tab dropdown menus with different icons and variants.
          </p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple tab dropdown menus showing different configurations and use cases.'
      }
    }
  }
}`,...(y=(T=l.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var v,j,C;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');

    // Extended menu data with submenus
    const menuDataWithSubmenus: Localized<MultiColumnMenu> = {
      ...createSampleMenuData(),
      groups: {
        ...createSampleMenuData().groups,
        'tab.tools.export': {
          column: 'tab.tools',
          order: 2
        },
        'tab.tools.export.formats': {
          menuItem: 'tab.export',
          order: 1
        }
      },
      items: [...createSampleMenuData().items, {
        label: 'Export...',
        tooltip: 'Export document in various formats',
        localizeNotes: 'Export submenu',
        group: 'tab.tools.export',
        order: 1,
        id: 'tab.export'
      }, {
        label: 'Export as PDF',
        tooltip: 'Export document as PDF',
        localizeNotes: 'PDF export',
        group: 'tab.tools.export.formats',
        order: 1,
        command: 'tab.exportPDF'
      }, {
        label: 'Export as Text',
        tooltip: 'Export document as plain text',
        localizeNotes: 'Text export',
        group: 'tab.tools.export.formats',
        order: 2,
        command: 'tab.exportText'
      }]
    };
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };
    return <div className="tw:space-y-4">
        <div className="tw:flex tw:items-center tw:gap-4">
          <TabDropdownMenu menuData={menuDataWithSubmenus} onSelectMenuItem={handleSelectMenuItem} tabLabel="Tab with Submenus" icon={<FileText className="tw:h-4 tw:w-4" />} />
          <span className="tw:text-sm tw:text-muted-foreground">
            Tab menu with nested export options
          </span>
        </div>

        <div className="tw:rounded tw:border tw:bg-gray-50 tw:p-4">
          <div className="tw:text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw:mt-2 tw:text-xs tw:text-muted-foreground">
            Try the &quot;Tools&quot; section and look for the &quot;Export...&quot; submenu.
          </p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with nested submenus for complex menu hierarchies.'
      }
    }
  }
}`,...(C=(j=c.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};const Me=["Default","WithCustomIcon","MutedVariant","MultipleMenus","WithSubmenus"];export{m as Default,l as MultipleMenus,d as MutedVariant,i as WithCustomIcon,c as WithSubmenus,Me as __namedExportsOrder,ge as default};
