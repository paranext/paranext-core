import{j as t,r as b}from"./iframe-CIH3uoLt.js";import{T as n}from"./tab-dropdown-menu.component-Dh7TMMsY.js";import{S as Z}from"./settings-Cmsr3md6.js";import{H as B}from"./house-D_r5Ptry.js";import{F as k}from"./file-text-D7lLivIe.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-CQX-ZinZ.js";import"./menu.context-zPHofw0F.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-BQHqLd0T.js";import"./index-DKsNx9VG.js";import"./index-Dl-oMRsO.js";import"./index-CA_WfEzA.js";import"./index-BOS79xNT.js";import"./index-CdZ29tqI.js";import"./index-9bMHa_wj.js";import"./index-BHesDy5m.js";import"./index-BNrvWxPX.js";import"./index-Bb12WGOr.js";import"./index-gdQFQAVb.js";import"./index-Ctgm60xy.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CfCTHRhO.js";import"./index-Df-6xJ3u.js";import"./index-DUcbcW59.js";import"./createReactComponent-XVBoCnNE.js";import"./IconCheck-BT7U5jAW.js";import"./tooltip-C1lgsikJ.js";import"./button-Bp9a-Y2I.js";import"./index-rg-EMq1T.js";import"./focus.util-DRSEP984.js";import"./use-interaction-modality.hook-tsTdDGk8.js";import"./menu.util-C3wJQgOq.js";import"./menu-icon.component-BEBBlqAC.js";import"./createLucideIcon-D7KFL4Vt.js";const Ct={title:"Advanced/Menu/TabDropdownMenu",component:n,tags:["autodocs"],parameters:{docs:{description:{component:`
A dropdown menu component designed specifically for tab contexts in Platform.Bible applications.

This component provides:
- Columns as sections: divided by separators, left out when empty, and with \`showSectionHeadings\` labeled when there are two or more
- Tooltips for menu items
- Support for icons (before and after text)
- Keyboard shortcut hints at the end of an item's row
- Custom trigger icons (defaults to hamburger menu)
- Style variants (default, muted)
- Accessibility with proper aria-label
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},tabLabel:{control:"text",description:"Accessibility label for the dropdown trigger"},icon:{control:!1,description:"Optional custom icon for the trigger button"},className:{control:"text",description:"Additional CSS classes for custom styling"},variant:{control:"select",options:["default","muted"],description:"Style variant for the dropdown menu",defaultValue:"default"},id:{control:"text",description:"Optional unique identifier"}}},q="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",K="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",r=()=>({columns:{"tab.edit":{label:"Edit",order:1},"tab.view":{label:"View",order:2},"tab.tools":{label:"Tools",order:3},"tab.help":{label:"Help",order:4}},groups:{"tab.edit.clipboard":{column:"tab.edit",order:1},"tab.edit.text":{column:"tab.edit",order:2},"tab.view.zoom":{column:"tab.view",order:1},"tab.view.layout":{column:"tab.view",order:2},"tab.tools.main":{column:"tab.tools",order:1},"tab.help.main":{column:"tab.help",order:1}},items:[{label:"Copy",tooltip:"Copy selected text",localizeNotes:"Copy command",group:"tab.edit.clipboard",order:1,command:"tab.copy"},{label:"Paste",tooltip:"Paste from clipboard",localizeNotes:"Paste command",group:"tab.edit.clipboard",order:2,command:"tab.paste"},{label:"Find",tooltip:"Find text in document",localizeNotes:"Find command",group:"tab.edit.text",order:1,command:"tab.find",shortcut:"Ctrl+F"},{label:"Replace",tooltip:"Find and replace text",localizeNotes:"Replace command",group:"tab.edit.text",order:2,command:"tab.replace"},{label:"Zoom In",tooltip:"Increase text size",localizeNotes:"Zoom in command",group:"tab.view.zoom",order:1,command:"tab.zoomIn"},{label:"Zoom Out",tooltip:"Decrease text size",localizeNotes:"Zoom out command",group:"tab.view.zoom",order:2,command:"tab.zoomOut"},{label:"Split View",tooltip:"Split the document view",localizeNotes:"Split view command",group:"tab.view.layout",order:1,command:"tab.splitView",iconPathBefore:q},{label:"Full Screen",tooltip:"Enter full screen mode",localizeNotes:"Full screen command",group:"tab.view.layout",order:2,command:"tab.fullScreen"},{label:"Preferences",tooltip:"Open tab preferences",localizeNotes:"Preferences command",group:"tab.tools.main",order:1,command:"tab.preferences",iconPathAfter:K}]});function x({variant:a,customIcon:s,customLabel:e="Tab Options"}){const[o,w]=b.useState(""),V=G=>{w(G.command)};return t.jsxs("div",{className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[t.jsx(n,{menuData:r(),onSelectMenuItem:V,tabLabel:e,icon:s,variant:a,showSectionHeadings:!0}),t.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Click the menu button to see tab options"})]}),t.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[t.jsxs("div",{className:"tw:text-sm",children:[t.jsx("strong",{children:"Last Command:"})," ",o||"None"]}),t.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Menu items are organized into labeled sections separated with dividers."})]})]})}const h=(a,s)=>{const e=r();return{...e,items:[...e.items.map(o=>"command"in o&&o.command==="tab.find"?{...o,shortcut:a}:o),{label:"Insert comment",tooltip:"Insert a comment at the selection",localizeNotes:"Insert comment command",group:"tab.tools.main",order:2,command:"tab.insertComment",shortcut:s}]}},i={render:()=>t.jsx(x,{})},m={tags:["test"],render:()=>{const a=r(),s=["tab.edit.clipboard","tab.edit.text"],e={...a,items:a.items.filter(o=>s.includes(o.group))};return t.jsx(n,{menuData:e,onSelectMenuItem:()=>{},tabLabel:"Edit Options",showSectionHeadings:!0})},parameters:{docs:{description:{story:"Only the Edit column has items, so the menu has a single section: no heading and no divider, even with `showSectionHeadings` on."}}}},d={tags:["test"],render:()=>t.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-8",children:[t.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[t.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"Windows and Linux"}),t.jsx(n,{menuData:h("Ctrl+F","Ctrl+Shift+N"),onSelectMenuItem:()=>{},tabLabel:"Windows and Linux Options",showSectionHeadings:!0})]}),t.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[t.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"macOS"}),t.jsx(n,{menuData:h("⌃F","⌥⌘M"),onSelectMenuItem:()=>{},tabLabel:"macOS Options",showSectionHeadings:!0})]})]}),parameters:{docs:{description:{story:"Keyboard shortcut hints as Windows and Linux write them and as macOS writes them. Find shows a hint, and the Tools section shows a hinted item alongside one with an icon. Switch the toolbar direction to RTL: macOS symbols stay in order (⌃F, not F⌃) and hints stay at the end of the row."}}}},c={render:()=>t.jsx(x,{customIcon:t.jsx(Z,{className:"tw:h-4 tw:w-4"}),customLabel:"Settings Menu"}),parameters:{docs:{description:{story:"Tab dropdown menu with a custom settings icon instead of the default hamburger menu."}}}},l={render:()=>t.jsx(x,{variant:"muted"}),parameters:{docs:{description:{story:"Tab dropdown menu with muted styling for subtle integration."}}}},u={render:()=>{const[a,s]=b.useState(""),e=o=>{s(o.command)};return t.jsxs("div",{className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:rounded tw:border tw:p-4",children:[t.jsx("span",{className:"tw:text-sm tw:font-medium",children:"Document Tab:"}),t.jsx(n,{menuData:r(),onSelectMenuItem:e,tabLabel:"Document Options",showSectionHeadings:!0}),t.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Settings Tab:"}),t.jsx(n,{menuData:r(),onSelectMenuItem:e,tabLabel:"Settings Options",icon:t.jsx(Z,{className:"tw:h-4 tw:w-4"}),variant:"muted",showSectionHeadings:!0}),t.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Home Tab:"}),t.jsx(n,{menuData:r(),onSelectMenuItem:e,tabLabel:"Home Options",icon:t.jsx(B,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0})]}),t.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[t.jsxs("div",{className:"tw:text-sm",children:[t.jsx("strong",{children:"Last Command:"})," ",a||"None"]}),t.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Example showing multiple tab dropdown menus with different icons and variants."})]})]})},parameters:{docs:{description:{story:"Multiple tab dropdown menus showing different configurations and use cases."}}}},p={render:()=>{const[a,s]=b.useState(""),e={...r(),groups:{...r().groups,"tab.tools.export":{column:"tab.tools",order:2},"tab.tools.export.formats":{menuItem:"tab.export",order:1}},items:[...r().items,{label:"Export...",tooltip:"Export document in various formats",localizeNotes:"Export submenu",group:"tab.tools.export",order:1,id:"tab.export"},{label:"Export as PDF",tooltip:"Export document as PDF",localizeNotes:"PDF export",group:"tab.tools.export.formats",order:1,command:"tab.exportPDF"},{label:"Export as Text",tooltip:"Export document as plain text",localizeNotes:"Text export",group:"tab.tools.export.formats",order:2,command:"tab.exportText"}]},o=w=>{s(w.command)};return t.jsxs("div",{className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[t.jsx(n,{menuData:e,onSelectMenuItem:o,tabLabel:"Tab with Submenus",icon:t.jsx(k,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0}),t.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Tab menu with nested export options"})]}),t.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[t.jsxs("div",{className:"tw:text-sm",children:[t.jsx("strong",{children:"Last Command:"})," ",a||"None"]}),t.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Try the "Tools" section and look for the "Export..." submenu.'})]})]})},parameters:{docs:{description:{story:"Tab dropdown menu with nested submenus for complex menu hierarchies."}}}};var g,M,f;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <TabMenuDemo />
}`,...(f=(M=i.parameters)==null?void 0:M.docs)==null?void 0:f.source}}};var S,D,N;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  tags: ['test'],
  render: () => {
    const sampleMenuData = createSampleMenuData();
    const editGroups = ['tab.edit.clipboard', 'tab.edit.text'];
    const editOnlyMenuData: Localized<MultiColumnMenu> = {
      ...sampleMenuData,
      items: sampleMenuData.items.filter(item => editGroups.includes(item.group))
    };
    return <TabDropdownMenu menuData={editOnlyMenuData} onSelectMenuItem={() => {}} tabLabel="Edit Options" showSectionHeadings />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the Edit column has items, so the menu has a single section: no heading and no divider, even with \`showSectionHeadings\` on.'
      }
    }
  }
}`,...(N=(D=m.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var I,y,T;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  tags: ['test'],
  render: () => <div className="tw:flex tw:flex-wrap tw:gap-8">
      <figure className="tw:flex tw:flex-col tw:items-start tw:gap-2">
        <figcaption className="tw:text-sm tw:font-medium">Windows and Linux</figcaption>
        <TabDropdownMenu menuData={createSampleMenuDataWithShortcuts('Ctrl+F', 'Ctrl+Shift+N')} onSelectMenuItem={() => {}} tabLabel="Windows and Linux Options" showSectionHeadings />
      </figure>
      <figure className="tw:flex tw:flex-col tw:items-start tw:gap-2">
        <figcaption className="tw:text-sm tw:font-medium">macOS</figcaption>
        <TabDropdownMenu menuData={createSampleMenuDataWithShortcuts('⌃F', '⌥⌘M')} onSelectMenuItem={() => {}} tabLabel="macOS Options" showSectionHeadings />
      </figure>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Keyboard shortcut hints as Windows and Linux write them and as macOS writes them. Find shows a hint, and the Tools section shows a hinted item alongside one with an icon. Switch the toolbar direction to RTL: macOS symbols stay in order (⌃F, not F⌃) and hints stay at the end of the row.'
      }
    }
  }
}`,...(T=(y=d.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var v,j,C;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <TabMenuDemo customIcon={<Settings className="tw:h-4 tw:w-4" />} customLabel="Settings Menu" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with a custom settings icon instead of the default hamburger menu.'
      }
    }
  }
}`,...(C=(j=c.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var E,L,z;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <TabMenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with muted styling for subtle integration.'
      }
    }
  }
}`,...(z=(L=l.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var A,H,F;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };
    return <div className="tw:space-y-4">
        <div className="tw:flex tw:items-center tw:gap-2 tw:rounded tw:border tw:p-4">
          <span className="tw:text-sm tw:font-medium">Document Tab:</span>
          <TabDropdownMenu menuData={createSampleMenuData()} onSelectMenuItem={handleSelectMenuItem} tabLabel="Document Options" showSectionHeadings />

          <span className="tw:ml-4 tw:text-sm tw:font-medium">Settings Tab:</span>
          <TabDropdownMenu menuData={createSampleMenuData()} onSelectMenuItem={handleSelectMenuItem} tabLabel="Settings Options" icon={<Settings className="tw:h-4 tw:w-4" />} variant="muted" showSectionHeadings />

          <span className="tw:ml-4 tw:text-sm tw:font-medium">Home Tab:</span>
          <TabDropdownMenu menuData={createSampleMenuData()} onSelectMenuItem={handleSelectMenuItem} tabLabel="Home Options" icon={<Home className="tw:h-4 tw:w-4" />} showSectionHeadings />
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
}`,...(F=(H=u.parameters)==null?void 0:H.docs)==null?void 0:F.source}}};var O,P,W;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
          <TabDropdownMenu menuData={menuDataWithSubmenus} onSelectMenuItem={handleSelectMenuItem} tabLabel="Tab with Submenus" icon={<FileText className="tw:h-4 tw:w-4" />} showSectionHeadings />
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
}`,...(W=(P=p.parameters)==null?void 0:P.docs)==null?void 0:W.source}}};const Et=["Default","SingleSection","ShortcutHints","WithCustomIcon","MutedVariant","MultipleMenus","WithSubmenus"];export{i as Default,u as MultipleMenus,l as MutedVariant,d as ShortcutHints,m as SingleSection,c as WithCustomIcon,p as WithSubmenus,Et as __namedExportsOrder,Ct as default};
