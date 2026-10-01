import{j as e,r as h}from"./iframe-CoVxNx4L.js";import{T as s}from"./tab-dropdown-menu.component-IZxj4-c6.js";import{S as k}from"./settings-Bse61mbg.js";import{H as Q}from"./house-kqXt0HUT.js";import{F as R}from"./file-text-C5eL5u9O.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-B-TditYk.js";import"./menu.context-t9qOdAZB.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-DfHzyAje.js";import"./IconChevronRight-d9W-g4HT.js";import"./index-adKnHqks.js";import"./index-hoaaeKOm.js";import"./index-cL7Q540z.js";import"./index-DW_EYx8A.js";import"./index-BLsGWcAK.js";import"./index-Cy6DevU0.js";import"./index-Ds7H92HU.js";import"./index-B0Y1k61f.js";import"./index-D6y5LniQ.js";import"./index-Cuv19T7E.js";import"./index-CC7GPar9.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Bp89Vm8J.js";import"./index-BR_A20LU.js";import"./index-CnGEq4Gf.js";import"./IconCheck-DBf23r74.js";import"./tooltip-CG4iSmMo.js";import"./button-B3kF2Sh2.js";import"./portal-container.context-e8UYa32W.js";import"./index-C550jehW.js";import"./focus.util-DRSEP984.js";import"./use-interaction-modality.hook-Bfvx7Zhu.js";import"./menu.util-B4Sg39gp.js";import"./menu-icon.component-CFVa3NhN.js";import"./createLucideIcon-CrrK7yXP.js";const Ae={title:"Advanced/Menu/TabDropdownMenu",component:s,tags:["autodocs"],parameters:{docs:{description:{component:`
A dropdown menu component designed specifically for tab contexts in Platform.Bible applications.

This component provides:
- Columns as sections: divided by separators, left out when empty, and with \`showSectionHeadings\` labeled when there are two or more, except a column that sets \`isHeaderHidden\`, whose label names the section for screen readers only
- Tooltips for menu items
- Support for icons (before and after text)
- Keyboard shortcut hints at the end of an item's row
- Custom trigger icons (defaults to hamburger menu)
- Style variants (default, muted)
- Accessibility with proper aria-label
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},tabLabel:{control:"text",description:"Accessibility label for the dropdown trigger"},icon:{control:!1,description:"Optional custom icon for the trigger button"},className:{control:"text",description:"Additional CSS classes for custom styling"},variant:{control:"select",options:["default","muted"],description:"Style variant for the dropdown menu",defaultValue:"default"},id:{control:"text",description:"Optional unique identifier"}}},U="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",Y="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",r=()=>({columns:{"tab.edit":{label:"Edit",order:1},"tab.view":{label:"View",order:2},"tab.tools":{label:"Tools",order:3},"tab.help":{label:"Help",order:4}},groups:{"tab.edit.clipboard":{column:"tab.edit",order:1},"tab.edit.text":{column:"tab.edit",order:2},"tab.view.zoom":{column:"tab.view",order:1},"tab.view.layout":{column:"tab.view",order:2},"tab.tools.main":{column:"tab.tools",order:1},"tab.help.main":{column:"tab.help",order:1}},items:[{label:"Copy",tooltip:"Copy selected text",localizeNotes:"Copy command",group:"tab.edit.clipboard",order:1,command:"tab.copy"},{label:"Paste",tooltip:"Paste from clipboard",localizeNotes:"Paste command",group:"tab.edit.clipboard",order:2,command:"tab.paste"},{label:"Find",tooltip:"Find text in document",localizeNotes:"Find command",group:"tab.edit.text",order:1,command:"tab.find",shortcut:"Ctrl+F"},{label:"Replace",tooltip:"Find and replace text",localizeNotes:"Replace command",group:"tab.edit.text",order:2,command:"tab.replace"},{label:"Zoom In",tooltip:"Increase text size",localizeNotes:"Zoom in command",group:"tab.view.zoom",order:1,command:"tab.zoomIn"},{label:"Zoom Out",tooltip:"Decrease text size",localizeNotes:"Zoom out command",group:"tab.view.zoom",order:2,command:"tab.zoomOut"},{label:"Split View",tooltip:"Split the document view",localizeNotes:"Split view command",group:"tab.view.layout",order:1,command:"tab.splitView",iconPathBefore:U},{label:"Full Screen",tooltip:"Enter full screen mode",localizeNotes:"Full screen command",group:"tab.view.layout",order:2,command:"tab.fullScreen"},{label:"Preferences",tooltip:"Open tab preferences",localizeNotes:"Preferences command",group:"tab.tools.main",order:1,command:"tab.preferences",iconPathAfter:Y}]});function x({variant:t,customIcon:n,customLabel:o="Tab Options"}){const[a,b]=h.useState(""),q=K=>{b(K.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(s,{menuData:r(),onSelectMenuItem:q,tabLabel:o,icon:n,variant:t,showSectionHeadings:!0}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Click the menu button to see tab options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",a||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Menu items are organized into labeled sections separated with dividers."})]})]})}const g=(t,n)=>{const o=r();return{...o,items:[...o.items.map(a=>"command"in a&&a.command==="tab.find"?{...a,shortcut:t}:a),{label:"Insert comment",tooltip:"Insert a comment at the selection",localizeNotes:"Insert comment command",group:"tab.tools.main",order:2,command:"tab.insertComment",shortcut:n}]}},i={render:()=>e.jsx(x,{})},m={tags:["test"],render:()=>{const t=r(),n=["tab.edit.clipboard","tab.edit.text"],o={...t,items:t.items.filter(a=>n.includes(a.group))};return e.jsx(s,{menuData:o,onSelectMenuItem:()=>{},tabLabel:"Edit Options",showSectionHeadings:!0})},parameters:{docs:{description:{story:"Only the Edit column has items, so the menu has a single section: no heading and no divider, even with `showSectionHeadings` on."}}}},d={tags:["test"],render:()=>{const t=r(),n={...t,columns:{...t.columns,"tab.edit":{label:"Edit",order:1,isHeaderHidden:!0}}};return e.jsx(s,{menuData:n,onSelectMenuItem:()=>{},tabLabel:"Hidden Heading Options",showSectionHeadings:!0})},parameters:{docs:{description:{story:"The Edit column sets `isHeaderHidden`, so its section shows no heading. It keeps its divider, and its label still names the section for screen readers while two or more sections are shown."}}}},c={tags:["test"],render:()=>e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-8",children:[e.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[e.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"Windows and Linux"}),e.jsx(s,{menuData:g("Ctrl+F","Ctrl+Shift+N"),onSelectMenuItem:()=>{},tabLabel:"Windows and Linux Options",showSectionHeadings:!0})]}),e.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[e.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"macOS"}),e.jsx(s,{menuData:g("⌃F","⌥⌘M"),onSelectMenuItem:()=>{},tabLabel:"macOS Options",showSectionHeadings:!0})]})]}),parameters:{docs:{description:{story:"Keyboard shortcut hints as Windows and Linux write them and as macOS writes them. Find shows a hint, and the Tools section shows a hinted item alongside one with an icon. Switch the toolbar direction to RTL: macOS symbols stay in order (⌃F, not F⌃) and hints stay at the end of the row."}}}},l={render:()=>e.jsx(x,{customIcon:e.jsx(k,{className:"tw:h-4 tw:w-4"}),customLabel:"Settings Menu"}),parameters:{docs:{description:{story:"Tab dropdown menu with a custom settings icon instead of the default hamburger menu."}}}},u={render:()=>e.jsx(x,{variant:"muted"}),parameters:{docs:{description:{story:"Tab dropdown menu with muted styling for subtle integration."}}}},p={render:()=>{const[t,n]=h.useState(""),o=a=>{n(a.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:rounded tw:border tw:p-4",children:[e.jsx("span",{className:"tw:text-sm tw:font-medium",children:"Document Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:o,tabLabel:"Document Options",showSectionHeadings:!0}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Settings Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:o,tabLabel:"Settings Options",icon:e.jsx(k,{className:"tw:h-4 tw:w-4"}),variant:"muted",showSectionHeadings:!0}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Home Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:o,tabLabel:"Home Options",icon:e.jsx(Q,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Example showing multiple tab dropdown menus with different icons and variants."})]})]})},parameters:{docs:{description:{story:"Multiple tab dropdown menus showing different configurations and use cases."}}}},w={render:()=>{const[t,n]=h.useState(""),o={...r(),groups:{...r().groups,"tab.tools.export":{column:"tab.tools",order:2},"tab.tools.export.formats":{menuItem:"tab.export",order:1}},items:[...r().items,{label:"Export...",tooltip:"Export document in various formats",localizeNotes:"Export submenu",group:"tab.tools.export",order:1,id:"tab.export"},{label:"Export as PDF",tooltip:"Export document as PDF",localizeNotes:"PDF export",group:"tab.tools.export.formats",order:1,command:"tab.exportPDF"},{label:"Export as Text",tooltip:"Export document as plain text",localizeNotes:"Text export",group:"tab.tools.export.formats",order:2,command:"tab.exportText"}]},a=b=>{n(b.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(s,{menuData:o,onSelectMenuItem:a,tabLabel:"Tab with Submenus",icon:e.jsx(R,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Tab menu with nested export options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Try the "Tools" section and look for the "Export..." submenu.'})]})]})},parameters:{docs:{description:{story:"Tab dropdown menu with nested submenus for complex menu hierarchies."}}}};var M,S,f;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <TabMenuDemo />
}`,...(f=(S=i.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var D,N,I;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(I=(N=m.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var y,T,v;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  tags: ['test'],
  render: () => {
    const sampleMenuData = createSampleMenuData();
    const menuData: Localized<MultiColumnMenu> = {
      ...sampleMenuData,
      columns: {
        ...sampleMenuData.columns,
        'tab.edit': {
          label: 'Edit',
          order: 1,
          isHeaderHidden: true
        }
      }
    };
    return <TabDropdownMenu menuData={menuData} onSelectMenuItem={() => {}} tabLabel="Hidden Heading Options" showSectionHeadings />;
  },
  parameters: {
    docs: {
      description: {
        story: 'The Edit column sets \`isHeaderHidden\`, so its section shows no heading. It keeps its divider, and its label still names the section for screen readers while two or more sections are shown.'
      }
    }
  }
}`,...(v=(T=d.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var j,C,E;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(E=(C=c.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var H,L,z;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <TabMenuDemo customIcon={<Settings className="tw:h-4 tw:w-4" />} customLabel="Settings Menu" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with a custom settings icon instead of the default hamburger menu.'
      }
    }
  }
}`,...(z=(L=l.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var A,O,F;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <TabMenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with muted styling for subtle integration.'
      }
    }
  }
}`,...(F=(O=u.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var P,W,Z;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(Z=(W=p.parameters)==null?void 0:W.docs)==null?void 0:Z.source}}};var V,G,B;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(B=(G=w.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};const Oe=["Default","SingleSection","HiddenSectionHeading","ShortcutHints","WithCustomIcon","MutedVariant","MultipleMenus","WithSubmenus"];export{i as Default,d as HiddenSectionHeading,p as MultipleMenus,u as MutedVariant,c as ShortcutHints,m as SingleSection,l as WithCustomIcon,w as WithSubmenus,Oe as __namedExportsOrder,Ae as default};
