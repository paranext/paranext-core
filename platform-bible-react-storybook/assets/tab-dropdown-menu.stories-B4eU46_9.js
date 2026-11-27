import{j as e,r as m}from"./iframe-Cw8cgmmO.js";import{T as s,A as oe}from"./tab-dropdown-menu.component-BZkuvdcg.js";import{F as $}from"./file-text-vKj-R_2V.js";import{S as ee}from"./settings-IPpRyAAQ.js";import{H as ne}from"./house-DP6sOJ8W.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-8SvuEtTx.js";import"./menu.context-CNZn-_OQ.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-DBKOOQ3_.js";import"./z-index-DhRj3SmA.js";import"./createReactComponent-CuXuvXKL.js";import"./IconChevronRight-DQl4OFn2.js";import"./index-DLXTGWcO.js";import"./index-CKU0ORLv.js";import"./index-_nC7OrsU.js";import"./index-CXYp5Ttj.js";import"./index-D3XAqXoJ.js";import"./index-EPv-3I45.js";import"./index-Bydt_RRX.js";import"./index-CmHkihFK.js";import"./index-DGxQLQ9X.js";import"./index-C9nSYfaK.js";import"./index-Cb93CZlA.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-21mA9nHJ.js";import"./index-BSTz08Qi.js";import"./index-DXPLkZ7o.js";import"./IconCheck-CfCl4pD4.js";import"./tooltip-pG9KGRKc.js";import"./button-CvT0mZR7.js";import"./portal-container.context-Cv3-YfnK.js";import"./index-DWZUbx0z.js";import"./index-uQEbLL2g.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./focus.util-BBfY4ZG0.js";import"./use-interaction-modality.hook-D64ZrY8y.js";import"./shortcut-keys.component-C8h8jWq8.js";import"./kbd-CA8q-xsC.js";import"./menu.util-DCVu95L-.js";import"./lucide-icon.component-Ch2Ujq5o.js";import"./createLucideIcon-k99haDdB.js";import"./undo-2-DN2U6jZc.js";import"./circle-check-big-B46bgDbW.js";import"./message-square-DIRvOrZq.js";import"./search-DmmfCqkN.js";import"./book-open-CvOKIvQJ.js";import"./square-x-ju89W0Zo.js";import"./eye-B-brQO3a.js";import"./external-link-8SvJqmyN.js";import"./circle-question-mark-HOA8RfJq.js";import"./menu-icon.component-IRF8B72g.js";const mt={title:"Advanced/Menu/TabDropdownMenu",component:s,tags:["autodocs"],parameters:{docs:{description:{component:`
A dropdown menu component designed specifically for tab contexts in Platform.Bible applications.

This component provides:
- Columns as sections: divided by separators, left out when empty, and with \`showSectionHeadings\` labeled when there are two or more, except a column that sets \`isHeaderHidden\`, whose label names the section for screen readers only
- Tooltips for menu items
- Support for icons (before and after text)
- Keyboard shortcut hints at the end of an item's row
- Custom trigger icons (defaults to hamburger menu)
- Style variants (default, muted)
- Accessibility with proper aria-label
        `}}},argTypes:{menuData:{control:!1,description:"Menu data structure conforming to Platform.Bible format"},onSelectMenuItem:{control:!1,description:"Callback function invoked when a menu item is selected"},tabLabel:{control:"text",description:"Accessibility label for the dropdown trigger"},icon:{control:!1,description:"Optional custom icon for the trigger button"},className:{control:"text",description:"Additional CSS classes for custom styling"},variant:{control:"select",options:["default","muted"],description:"Style variant for the dropdown menu",defaultValue:"default"},id:{control:"text",description:"Optional unique identifier"}}},se="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",re="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",r=()=>({columns:{"tab.edit":{label:"Edit",order:1},"tab.view":{label:"View",order:2},"tab.tools":{label:"Tools",order:3},"tab.help":{label:"Help",order:4}},groups:{"tab.edit.clipboard":{column:"tab.edit",order:1},"tab.edit.text":{column:"tab.edit",order:2},"tab.view.zoom":{column:"tab.view",order:1},"tab.view.layout":{column:"tab.view",order:2},"tab.tools.main":{column:"tab.tools",order:1},"tab.help.main":{column:"tab.help",order:1}},items:[{label:"Copy",tooltip:"Copy selected text",localizeNotes:"Copy command",group:"tab.edit.clipboard",order:1,command:"tab.copy"},{label:"Paste",tooltip:"Paste from clipboard",localizeNotes:"Paste command",group:"tab.edit.clipboard",order:2,command:"tab.paste"},{label:"Find",tooltip:"Find text in document",localizeNotes:"Find command",group:"tab.edit.text",order:1,command:"tab.find",shortcut:"Ctrl+F"},{label:"Replace",tooltip:"Find and replace text",localizeNotes:"Replace command",group:"tab.edit.text",order:2,command:"tab.replace"},{label:"Zoom In",tooltip:"Increase text size",localizeNotes:"Zoom in command",group:"tab.view.zoom",order:1,command:"tab.zoomIn"},{label:"Zoom Out",tooltip:"Decrease text size",localizeNotes:"Zoom out command",group:"tab.view.zoom",order:2,command:"tab.zoomOut"},{label:"Split View",tooltip:"Split the document view",localizeNotes:"Split view command",group:"tab.view.layout",order:1,command:"tab.splitView",iconPathBefore:se},{label:"Full Screen",tooltip:"Enter full screen mode",localizeNotes:"Full screen command",group:"tab.view.layout",order:2,command:"tab.fullScreen"},{label:"Preferences",tooltip:"Open tab preferences",localizeNotes:"Preferences command",group:"tab.tools.main",order:1,command:"tab.preferences",iconPathAfter:re}]});function f({variant:t,customIcon:a,customLabel:o="Tab Options"}){const[n,i]=m.useState(""),d=S=>{i(S.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(s,{menuData:r(),onSelectMenuItem:d,tabLabel:o,icon:a,variant:t,showSectionHeadings:!0}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Click the menu button to see tab options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",n||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Menu items are organized into labeled sections separated with dividers."})]})]})}const y=(t,a)=>{const o=r();return{...o,items:[...o.items.map(n=>"command"in n&&n.command==="tab.find"?{...n,shortcut:t}:n),{label:"Insert comment",tooltip:"Insert a comment at the selection",localizeNotes:"Insert comment command",group:"tab.tools.main",order:2,command:"tab.insertComment",shortcut:a}]}},c={render:()=>e.jsx(f,{})},l={tags:["test"],render:()=>{const t=r(),a=["tab.edit.clipboard","tab.edit.text"],o={...t,items:t.items.filter(n=>a.includes(n.group))};return e.jsx(s,{menuData:o,onSelectMenuItem:()=>{},tabLabel:"Edit Options",showSectionHeadings:!0})},parameters:{docs:{description:{story:"Only the Edit column has items, so the menu has a single section: no heading and no divider, even with `showSectionHeadings` on."}}}},u={tags:["test"],render:()=>{const t=r(),a={...t,columns:{...t.columns,"tab.edit":{label:"Edit",order:1,isHeaderHidden:!0}}};return e.jsx(s,{menuData:a,onSelectMenuItem:()=>{},tabLabel:"Hidden Heading Options",showSectionHeadings:!0})},parameters:{docs:{description:{story:"The Edit column sets `isHeaderHidden`, so its section shows no heading. It keeps its divider, and its label still names the section for screen readers while two or more sections are shown."}}}},p={tags:["test"],render:()=>e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-8",children:[e.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[e.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"Windows and Linux"}),e.jsx(s,{menuData:y("Ctrl+F","Ctrl+Shift+N"),onSelectMenuItem:()=>{},tabLabel:"Windows and Linux Options",showSectionHeadings:!0})]}),e.jsxs("figure",{className:"tw:flex tw:flex-col tw:items-start tw:gap-2",children:[e.jsx("figcaption",{className:"tw:text-sm tw:font-medium",children:"macOS"}),e.jsx(s,{menuData:y("⌃F","⌥⌘M"),onSelectMenuItem:()=>{},tabLabel:"macOS Options",showSectionHeadings:!0})]})]}),parameters:{docs:{description:{story:"Keyboard shortcut hints as Windows and Linux write them and as macOS writes them. Find shows a hint, and the Tools section shows a hinted item alongside one with an icon. Switch the toolbar direction to RTL: macOS symbols stay in order (⌃F, not F⌃) and hints stay at the end of the row."}}}},h={render:()=>e.jsx(f,{customIcon:e.jsx(ee,{className:"tw:h-4 tw:w-4"}),customLabel:"Settings Menu"}),parameters:{docs:{description:{story:"Tab dropdown menu with a custom settings icon instead of the default hamburger menu."}}}},w={render:()=>e.jsx(f,{variant:"muted"}),parameters:{docs:{description:{story:"Tab dropdown menu with muted styling for subtle integration."}}}},b={render:()=>{const[t,a]=m.useState(""),o=n=>{a(n.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:rounded tw:border tw:p-4",children:[e.jsx("span",{className:"tw:text-sm tw:font-medium",children:"Document Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:o,tabLabel:"Document Options",showSectionHeadings:!0}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Settings Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:o,tabLabel:"Settings Options",icon:e.jsx(ee,{className:"tw:h-4 tw:w-4"}),variant:"muted",showSectionHeadings:!0}),e.jsx("span",{className:"tw:ml-4 tw:text-sm tw:font-medium",children:"Home Tab:"}),e.jsx(s,{menuData:r(),onSelectMenuItem:o,tabLabel:"Home Options",icon:e.jsx(ne,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Example showing multiple tab dropdown menus with different icons and variants."})]})]})},parameters:{docs:{description:{story:"Multiple tab dropdown menus showing different configurations and use cases."}}}},g={render:()=>{const[t,a]=m.useState(""),o={...r(),groups:{...r().groups,"tab.tools.export":{column:"tab.tools",order:2},"tab.tools.export.formats":{menuItem:"tab.export",order:1}},items:[...r().items,{label:"Export...",tooltip:"Export document in various formats",localizeNotes:"Export submenu",group:"tab.tools.export",order:1,id:"tab.export"},{label:"Export as PDF",tooltip:"Export document as PDF",localizeNotes:"PDF export",group:"tab.tools.export.formats",order:1,command:"tab.exportPDF"},{label:"Export as Text",tooltip:"Export document as plain text",localizeNotes:"Text export",group:"tab.tools.export.formats",order:2,command:"tab.exportText"}]},n=i=>{a(i.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-4",children:[e.jsx(s,{menuData:o,onSelectMenuItem:n,tabLabel:"Tab with Submenus",icon:e.jsx($,{className:"tw:h-4 tw:w-4"}),showSectionHeadings:!0}),e.jsx("span",{className:"tw:text-sm tw:text-muted-foreground",children:"Tab menu with nested export options"})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:'Try the "Tools" section and look for the "Export..." submenu.'})]})]})},parameters:{docs:{description:{story:"Tab dropdown menu with nested submenus for complex menu hierarchies."}}}},x={render:()=>{const[t,a]=m.useState(""),o={columns:{"tab.dynamic":{label:"Dynamic",order:1}},groups:{"tab.dynamic.group":{column:"tab.dynamic",order:1}},items:[{label:"Disabled (enabledWhen was falsy)",localizeNotes:"Disabled item",group:"tab.dynamic.group",order:1,command:"tab.disabled",disabled:!0},{label:"Checked toggle (checkedWhen was truthy)",localizeNotes:"Checked item",group:"tab.dynamic.group",order:2,command:"tab.checked",checked:!0},{label:"Unchecked toggle",localizeNotes:"Unchecked item",group:"tab.dynamic.group",order:3,command:"tab.unchecked",checked:!1},{label:"Disabled and checked",localizeNotes:"Disabled checked item",group:"tab.dynamic.group",order:4,command:"tab.disabledChecked",checked:!0,disabled:!0},{label:"Plain item with an icon and a shortcut",localizeNotes:"Plain item with icon and shortcut",group:"tab.dynamic.group",order:5,command:"tab.withIconAndShortcut",iconNameBefore:"search",shortcut:"Ctrl+F"},{label:"Checked toggle with an icon and a shortcut",localizeNotes:"Checked item with icon and shortcut",group:"tab.dynamic.group",order:6,command:"tab.checkedWithIconAndShortcut",iconNameBefore:"eye",shortcut:"Ctrl+Shift+F",checked:!0}]},n=i=>{a(i.command)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx(s,{menuData:o,onSelectMenuItem:n,tabLabel:"Dynamic item states",icon:e.jsx($,{className:"tw:h-4 tw:w-4"})}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-gray-50 tw:p-4",children:[e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",t||"None"]}),e.jsx("p",{className:"tw:mt-2 tw:text-xs tw:text-muted-foreground",children:"Open the tab menu to see disabled, checked, unchecked and disabled-checked items."})]})]})},parameters:{docs:{description:{story:"Runtime-computed disabled and checked states in a tab dropdown menu. Disabled items are dimmed and unclickable; checkbox items show a checkmark when checked."}}}};function ie(){const[t,a]=m.useState(),[o,n]=m.useState(""),i=(d,S)=>new Promise(te=>{a({menu:d,options:S,settle:ae=>{a(void 0),te(ae)}})});return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{className:"tw:w-40 tw:overflow-hidden tw:rounded tw:border",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:border-b tw:p-1",children:[e.jsx(s,{menuData:r(),onSelectMenuItem:d=>n(d.command),tabLabel:"Project",showSectionHeadings:!0,openMenuInOverlay:i}),e.jsx("span",{className:"tw:truncate tw:px-2 tw:text-sm",children:"A narrow tab"})]}),e.jsx("p",{className:"tw:p-2 tw:text-xs tw:text-muted-foreground",children:"The menu is wider than this tab and is not clipped by it."})]}),t&&e.jsx(oe,{menuData:t.menu,anchor:t.options.anchor,focusFirstItem:t.options.focusFirstItem,onSelectMenuItem:d=>t.settle(d),onClose:()=>t.settle(void 0),showSectionHeadings:!0}),e.jsxs("div",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Last Command:"})," ",o||"None"]})]})}const M={render:()=>e.jsx(ie,{}),parameters:{docs:{description:{story:"With `openMenuInOverlay`, the trigger hands the menu and its own rectangle to an overlay instead of opening the menu in its own document, and runs the item the overlay hands back. The overlay draws `AnchoredTabMenu`, with the same sections, headings and submenus. Opened from the keyboard (Enter, Space or ArrowDown), the menu opens with its first item focused."}}}};var D,N,I;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <TabMenuDemo />
}`,...(I=(N=c.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var v,C,T;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(T=(C=l.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var j,k,L;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(L=(k=u.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var z,E,H;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(H=(E=p.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var A,O,F;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <TabMenuDemo customIcon={<Settings className="tw:h-4 tw:w-4" />} customLabel="Settings Menu" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with a custom settings icon instead of the default hamburger menu.'
      }
    }
  }
}`,...(F=(O=h.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var W,P,Z;w.parameters={...w.parameters,docs:{...(W=w.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <TabMenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with muted styling for subtle integration.'
      }
    }
  }
}`,...(Z=(P=w.parameters)==null?void 0:P.docs)==null?void 0:Z.source}}};var B,V,G;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(G=(V=b.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var U,R,q;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(q=(R=g.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var K,Q,Y;x.parameters={...x.parameters,docs:{...(K=x.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
      }, {
        label: 'Plain item with an icon and a shortcut',
        localizeNotes: 'Plain item with icon and shortcut',
        group: 'tab.dynamic.group',
        order: 5,
        command: 'tab.withIconAndShortcut',
        iconNameBefore: 'search',
        shortcut: 'Ctrl+F'
      }, {
        label: 'Checked toggle with an icon and a shortcut',
        localizeNotes: 'Checked item with icon and shortcut',
        group: 'tab.dynamic.group',
        order: 6,
        command: 'tab.checkedWithIconAndShortcut',
        iconNameBefore: 'eye',
        shortcut: 'Ctrl+Shift+F',
        checked: true
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
}`,...(Y=(Q=x.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var J,X,_;M.parameters={...M.parameters,docs:{...(J=M.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <OverlayDemo />,
  parameters: {
    docs: {
      description: {
        story: 'With \`openMenuInOverlay\`, the trigger hands the menu and its own rectangle to an overlay instead of opening the menu in its own document, and runs the item the overlay hands back. The overlay draws \`AnchoredTabMenu\`, with the same sections, headings and submenus. Opened from the keyboard (Enter, Space or ArrowDown), the menu opens with its first item focused.'
      }
    }
  }
}`,...(_=(X=M.parameters)==null?void 0:X.docs)==null?void 0:_.source}}};const ct=["Default","SingleSection","HiddenSectionHeading","ShortcutHints","WithCustomIcon","MutedVariant","MultipleMenus","WithSubmenus","DynamicItemStates","OpenedInOverlay"];export{c as Default,x as DynamicItemStates,u as HiddenSectionHeading,b as MultipleMenus,w as MutedVariant,M as OpenedInOverlay,p as ShortcutHints,l as SingleSection,h as WithCustomIcon,g as WithSubmenus,ct as __namedExportsOrder,mt as default};
