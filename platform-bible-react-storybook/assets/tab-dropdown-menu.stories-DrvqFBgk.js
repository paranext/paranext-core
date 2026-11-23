import{j as e,r as g}from"./iframe-DZit65tY.js";import{T as s}from"./tab-dropdown-menu.component-DdJMqDhW.js";import{F as K}from"./file-text-DB5Ym5pN.js";import{S as Q}from"./settings-Dlt10e8R.js";import{H as X}from"./house-DaEbcvEG.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-Dlem9QcJ.js";import"./menu.context-Df-ljyMX.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-BkYK0iGM.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-DgISLh7p.js";import"./IconChevronRight-Dxrj4oLc.js";import"./index-B2j_rVuc.js";import"./index-CNXAqesI.js";import"./index-DpwEs-rY.js";import"./index-Pe9S3gnt.js";import"./index-Dw193fEj.js";import"./index-cJIs_Ga9.js";import"./index-CV8XjlAQ.js";import"./index-BUA64DuP.js";import"./index-DswfvL7x.js";import"./index-4uiG1Y7N.js";import"./index-RaInp9Ws.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Dr46wI2n.js";import"./index-cMN1YfsP.js";import"./index-b2pkefZp.js";import"./IconCheck-oO0RlNrb.js";import"./tooltip-C2YlADGp.js";import"./button-vGCFFxOT.js";import"./portal-container.context-DOYUHneT.js";import"./index-BgW81nO3.js";import"./focus.util-Ba97AcPw.js";import"./use-interaction-modality.hook-wSf-8kcs.js";import"./shortcut-keys.component-CUylghGn.js";import"./index-CpyFeyxh.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./kbd-CTsjIvJR.js";import"./menu.util-Bv_06U8_.js";import"./lucide-icon.component-ue42W2FK.js";import"./createLucideIcon-BDxWe04M.js";import"./circle-check-big-DPOphcNI.js";import"./message-square-BBLuYYzL.js";import"./search-DLb3m_Mn.js";import"./book-open-CzDeKySC.js";import"./square-x-C-a9Xses.js";import"./eye-DO4tuBiu.js";import"./pencil-B3XnHeTt.js";import"./external-link-CUbIF1OB.js";import"./circle-question-mark-BCJSb3zx.js";import"./menu-icon.component-COK9S4-A.js";const tt={title:"Advanced/Menu/TabDropdownMenu",component:s,tags:["autodocs"],parameters:{docs:{description:{component:`
A dropdown menu component designed specifically for tab contexts in Platform.Bible applications.

This component provides:
- Columns as sections: divided by separators, left out when empty, and with \`showSectionHeadings\` labeled when there are two or more, except a column that sets \`isHeaderHidden\`, whose label names the section for screen readers only
- Tooltips for menu items
- Support for icons (before and after text)
- Keyboard shortcut hints at the end of an item's row
- Custom trigger icons (defaults to hamburger menu)
- Style variants (default, muted)
- Accessibility with proper aria-label
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},tabLabel:{control:"text",description:"Accessibility label for the dropdown trigger"},icon:{control:!1,description:"Optional custom icon for the trigger button"},className:{control:"text",description:"Additional CSS classes for custom styling"},variant:{control:"select",options:["default","muted"],description:"Style variant for the dropdown menu",defaultValue:"default"},id:{control:"text",description:"Optional unique identifier"}}},_="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",$="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",r=()=>({columns:{"tab.edit":{label:"Edit",order:1},"tab.view":{label:"View",order:2},"tab.tools":{label:"Tools",order:3},"tab.help":{label:"Help",order:4}},groups:{"tab.edit.clipboard":{column:"tab.edit",order:1},"tab.edit.text":{column:"tab.edit",order:2},"tab.view.zoom":{column:"tab.view",order:1},"tab.view.layout":{column:"tab.view",order:2},"tab.tools.main":{column:"tab.tools",order:1},"tab.help.main":{column:"tab.help",order:1}},items:[{label:"Copy",tooltip:"Copy selected text",localizeNotes:"Copy command",group:"tab.edit.clipboard",order:1,command:"tab.copy"},{label:"Paste",tooltip:"Paste from clipboard",localizeNotes:"Paste command",group:"tab.edit.clipboard",order:2,command:"tab.paste"},{label:"Find",tooltip:"Find text in document",localizeNotes:"Find command",group:"tab.edit.text",order:1,command:"tab.find",shortcut:"Ctrl+F"},{label:"Replace",tooltip:"Find and replace text",localizeNotes:"Replace command",group:"tab.edit.text",order:2,command:"tab.replace"},{label:"Zoom In",tooltip:"Increase text size",localizeNotes:"Zoom in command",group:"tab.view.zoom",order:1,command:"tab.zoomIn"},{label:"Zoom Out",tooltip:"Decrease text size",localizeNotes:"Zoom out command",group:"tab.view.zoom",order:2,command:"tab.zoomOut"},{label:"Split View",tooltip:"Split the document view",localizeNotes:"Split view command",group:"tab.view.layout",order:1,command:"tab.splitView",iconPathBefore:_},{label:"Full Screen",tooltip:"Enter full screen mode",localizeNotes:"Full screen command",group:"tab.view.layout",order:2,command:"tab.fullScreen"},{label:"Preferences",tooltip:"Open tab preferences",localizeNotes:"Preferences command",group:"tab.tools.main",order:1,command:"tab.preferences",iconPathAfter:$}]});function x({variant:t,customIcon:n,customLabel:a="Tab Options"}){const[o,i]=g.useState(""),Y=J=>{i(J.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(s,{menuData:r(),onSelectMenuItem:Y,tabLabel:a,icon:n,variant:t,showSectionHeadings:!0}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Click the menu button to see tab options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",o||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Menu items are organized into labeled sections separated with dividers."})]})]})}const M=(t,n)=>{const a=r();return{...a,items:[...a.items.map(o=>"command"in o&&o.command==="tab.find"?{...o,shortcut:t}:o),{label:"Insert comment",tooltip:"Insert a comment at the selection",localizeNotes:"Insert comment command",group:"tab.tools.main",order:2,command:"tab.insertComment",shortcut:n}]}},m={render:()=>e.jsx(x,{})},d={tags:["test"],render:()=>{const t=r(),n=["tab.edit.clipboard","tab.edit.text"],a={...t,items:t.items.filter(o=>n.includes(o.group))};return e.jsx(s,{menuData:a,onSelectMenuItem:()=>{},tabLabel:"Edit Options",showSectionHeadings:!0})},parameters:{docs:{description:{story:"Only the Edit column has items, so the menu has a single section: no heading and no divider, even with `showSectionHeadings` on."}}}},c={tags:["test"],render:()=>{const t=r(),n={...t,columns:{...t.columns,"tab.edit":{label:"Edit",order:1,isHeaderHidden:!0}}};return e.jsx(s,{menuData:n,onSelectMenuItem:()=>{},tabLabel:"Hidden Heading Options",showSectionHeadings:!0})},parameters:{docs:{description:{story:"The Edit column sets `isHeaderHidden`, so its section shows no heading. It keeps its divider, and its label still names the section for screen readers while two or more sections are shown."}}}},l={tags:["test"],render:()=>e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-8",children:[e.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[e.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"Windows and Linux"}),e.jsx(s,{menuData:M("Ctrl+F","Ctrl+Shift+N"),onSelectMenuItem:()=>{},tabLabel:"Windows and Linux Options",showSectionHeadings:!0})]}),e.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[e.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"macOS"}),e.jsx(s,{menuData:M("⌃F","⌥⌘M"),onSelectMenuItem:()=>{},tabLabel:"macOS Options",showSectionHeadings:!0})]})]}),parameters:{docs:{description:{story:"Keyboard shortcut hints as Windows and Linux write them and as macOS writes them. Find shows a hint, and the Tools section shows a hinted item alongside one with an icon. Switch the toolbar direction to RTL: macOS symbols stay in order (⌃F, not F⌃) and hints stay at the end of the row."}}}},u={render:()=>e.jsx(x,{customIcon:e.jsx(Q,{className:"tw:h-4 tw:w-4"}),customLabel:"Settings Menu"}),parameters:{docs:{description:{story:"Tab dropdown menu with a custom settings icon instead of the default hamburger menu."}}}},p={render:()=>e.jsx(x,{variant:"muted"}),parameters:{docs:{description:{story:"Tab dropdown menu with muted styling for subtle integration."}}}},b={render:()=>{const[t,n]=g.useState(""),a=o=>{n(o.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:rounded tw:border tw:p-4",children:[e.jsx("span",{className:"tw:text-sm tw:font-medium",children:"Document Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:a,tabLabel:"Document Options",showSectionHeadings:!0}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Settings Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:a,tabLabel:"Settings Options",icon:e.jsx(Q,{className:"tw:h-4 tw:w-4"}),variant:"muted",showSectionHeadings:!0}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Home Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:a,tabLabel:"Home Options",icon:e.jsx(X,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Example showing multiple tab dropdown menus with different icons and variants."})]})]})},parameters:{docs:{description:{story:"Multiple tab dropdown menus showing different configurations and use cases."}}}},w={render:()=>{const[t,n]=g.useState(""),a={...r(),groups:{...r().groups,"tab.tools.export":{column:"tab.tools",order:2},"tab.tools.export.formats":{menuItem:"tab.export",order:1}},items:[...r().items,{label:"Export...",tooltip:"Export document in various formats",localizeNotes:"Export submenu",group:"tab.tools.export",order:1,id:"tab.export"},{label:"Export as PDF",tooltip:"Export document as PDF",localizeNotes:"PDF export",group:"tab.tools.export.formats",order:1,command:"tab.exportPDF"},{label:"Export as Text",tooltip:"Export document as plain text",localizeNotes:"Text export",group:"tab.tools.export.formats",order:2,command:"tab.exportText"}]},o=i=>{n(i.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(s,{menuData:a,onSelectMenuItem:o,tabLabel:"Tab with Submenus",icon:e.jsx(K,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Tab menu with nested export options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Try the "Tools" section and look for the "Export..." submenu.'})]})]})},parameters:{docs:{description:{story:"Tab dropdown menu with nested submenus for complex menu hierarchies."}}}},h={render:()=>{const[t,n]=g.useState(""),a={columns:{"tab.dynamic":{label:"Dynamic",order:1}},groups:{"tab.dynamic.group":{column:"tab.dynamic",order:1}},items:[{label:"Disabled (enabledWhen was falsy)",localizeNotes:"Disabled item",group:"tab.dynamic.group",order:1,command:"tab.disabled",disabled:!0},{label:"Checked toggle (checkedWhen was truthy)",localizeNotes:"Checked item",group:"tab.dynamic.group",order:2,command:"tab.checked",checked:!0},{label:"Unchecked toggle",localizeNotes:"Unchecked item",group:"tab.dynamic.group",order:3,command:"tab.unchecked",checked:!1},{label:"Disabled and checked",localizeNotes:"Disabled checked item",group:"tab.dynamic.group",order:4,command:"tab.disabledChecked",checked:!0,disabled:!0}]},o=i=>{n(i.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(s,{menuData:a,onSelectMenuItem:o,tabLabel:"Dynamic item states",icon:e.jsx(K,{className:"tw:h-4 tw:w-4"})}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Open the tab menu to see disabled, checked, unchecked and disabled-checked items."})]})]})},parameters:{docs:{description:{story:"Runtime-computed disabled and checked states in a tab dropdown menu. Disabled items are dimmed and unclickable; checkbox items show a checkmark when checked."}}}};var S,f,D;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <TabMenuDemo />
}`,...(D=(f=m.parameters)==null?void 0:f.docs)==null?void 0:D.source}}};var N,y,I;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(I=(y=d.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var T,C,v;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(v=(C=c.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var j,L,z;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(z=(L=l.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var E,H,k;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <TabMenuDemo customIcon={<Settings className="tw:h-4 tw:w-4" />} customLabel="Settings Menu" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with a custom settings icon instead of the default hamburger menu.'
      }
    }
  }
}`,...(k=(H=u.parameters)==null?void 0:H.docs)==null?void 0:k.source}}};var A,O,F;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <TabMenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with muted styling for subtle integration.'
      }
    }
  }
}`,...(F=(O=p.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var W,P,Z;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(Z=(P=b.parameters)==null?void 0:P.docs)==null?void 0:Z.source}}};var V,G,B;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(B=(G=w.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var U,R,q;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');
    const dynamicMenuData: Localized<MultiColumnMenu> = {
      columns: {
        'tab.dynamic': {
          label: 'Dynamic',
          order: 1
        }
      },
      groups: {
        'tab.dynamic.group': {
          column: 'tab.dynamic',
          order: 1
        }
      },
      items: [{
        label: 'Disabled (enabledWhen was falsy)',
        localizeNotes: 'Disabled item',
        group: 'tab.dynamic.group',
        order: 1,
        command: 'tab.disabled',
        disabled: true
      }, {
        label: 'Checked toggle (checkedWhen was truthy)',
        localizeNotes: 'Checked item',
        group: 'tab.dynamic.group',
        order: 2,
        command: 'tab.checked',
        checked: true
      }, {
        label: 'Unchecked toggle',
        localizeNotes: 'Unchecked item',
        group: 'tab.dynamic.group',
        order: 3,
        command: 'tab.unchecked',
        checked: false
      }, {
        label: 'Disabled and checked',
        localizeNotes: 'Disabled checked item',
        group: 'tab.dynamic.group',
        order: 4,
        command: 'tab.disabledChecked',
        checked: true,
        disabled: true
      }]
    };
    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };
    return <div className="tw:space-y-4">
        <TabDropdownMenu menuData={dynamicMenuData} onSelectMenuItem={handleSelectMenuItem} tabLabel="Dynamic item states" icon={<FileText className="tw:h-4 tw:w-4" />} />

        <div className="tw:rounded tw:border tw:bg-gray-50 tw:p-4">
          <div className="tw:text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw:mt-2 tw:text-xs tw:text-muted-foreground">
            Open the tab menu to see disabled, checked, unchecked and disabled-checked items.
          </p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Runtime-computed disabled and checked states in a tab dropdown menu. Disabled items are dimmed and unclickable; checkbox items show a checkmark when checked.'
      }
    }
  }
}`,...(q=(R=h.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};const at=["Default","SingleSection","HiddenSectionHeading","ShortcutHints","WithCustomIcon","MutedVariant","MultipleMenus","WithSubmenus","DynamicItemStates"];export{m as Default,h as DynamicItemStates,c as HiddenSectionHeading,b as MultipleMenus,p as MutedVariant,l as ShortcutHints,d as SingleSection,u as WithCustomIcon,w as WithSubmenus,at as __namedExportsOrder,tt as default};
