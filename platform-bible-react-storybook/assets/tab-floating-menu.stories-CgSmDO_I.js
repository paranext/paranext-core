import{j as r}from"./iframe-Cw8cgmmO.js";import{T as M}from"./tab-dropdown-menu.component-BZkuvdcg.js";import{T}from"./tab-toolbar-container.component-B7dFREcL.js";import{c as I}from"./createLucideIcon-k99haDdB.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-8SvuEtTx.js";import"./menu.context-CNZn-_OQ.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-DBKOOQ3_.js";import"./z-index-DhRj3SmA.js";import"./createReactComponent-CuXuvXKL.js";import"./IconChevronRight-DQl4OFn2.js";import"./index-DLXTGWcO.js";import"./index-CKU0ORLv.js";import"./index-_nC7OrsU.js";import"./index-CXYp5Ttj.js";import"./index-D3XAqXoJ.js";import"./index-EPv-3I45.js";import"./index-Bydt_RRX.js";import"./index-CmHkihFK.js";import"./index-DGxQLQ9X.js";import"./index-C9nSYfaK.js";import"./index-Cb93CZlA.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-21mA9nHJ.js";import"./index-BSTz08Qi.js";import"./index-DXPLkZ7o.js";import"./IconCheck-CfCl4pD4.js";import"./tooltip-pG9KGRKc.js";import"./button-CvT0mZR7.js";import"./portal-container.context-Cv3-YfnK.js";import"./index-DWZUbx0z.js";import"./index-uQEbLL2g.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./focus.util-BBfY4ZG0.js";import"./use-interaction-modality.hook-D64ZrY8y.js";import"./shortcut-keys.component-C8h8jWq8.js";import"./kbd-CA8q-xsC.js";import"./menu.util-DCVu95L-.js";import"./lucide-icon.component-Ch2Ujq5o.js";import"./undo-2-DN2U6jZc.js";import"./circle-check-big-B46bgDbW.js";import"./message-square-DIRvOrZq.js";import"./search-DmmfCqkN.js";import"./book-open-CvOKIvQJ.js";import"./square-x-ju89W0Zo.js";import"./file-text-vKj-R_2V.js";import"./eye-B-brQO3a.js";import"./external-link-8SvJqmyN.js";import"./circle-question-mark-HOA8RfJq.js";import"./settings-IPpRyAAQ.js";import"./house-DP6sOJ8W.js";import"./menu-icon.component-IRF8B72g.js";import"./shrink-step.context-BI7O4lHj.js";import"./use-shrink-step.hook-Do-TpMHO.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],j=I("plus",C);function g({onSelectProjectMenuItem:n,projectMenuData:a,id:b,className:f,menuButtonIcon:y,openMenuInOverlay:w}){return r.jsx(T,{className:"tw:pointer-events-none",id:b,children:a&&r.jsx(M,{onSelectMenuItem:n,menuData:a,tabLabel:"Project",icon:y,className:`tw:pointer-events-auto tw:shadow-lg ${f}`,buttonVariant:"outline",showSectionHeadings:!0,openMenuInOverlay:w})})}g.__docgenInfo={description:`Renders a TabDropdownMenu with a trigger button that looks like the menuButtonIcon or like the
default of three stacked horizontal lines (aka the hamburger). The menu "floats" over the content
so it is always visible. When clicked, it displays a dropdown menu with the projectMenuData.`,methods:[],displayName:"TabFloatingMenu",props:{onSelectProjectMenuItem:{required:!0,tsType:{name:"SelectMenuItemHandler"},description:`The handler to use for toolbar item commands related to the project menu. Here is a basic
example of how to create this:

@example

\`\`\`tsx
const projectMenuCommandHandler: SelectMenuItemHandler = async (selectedMenuItem) => {
  const commandName = selectedMenuItem.command;
  try {
    // Assert the more specific type. Assert the more specific type. The menu data should
    // specify a valid command name here. If not, the error will be caught.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await papi.commands.sendCommand(commandName as CommandNames);
  } catch (e) {
    throw new Error(
      \`handleMenuCommand error: command: \${commandName}. \${JSON.stringify(e)}\`,
    );
  }
};
\`\`\``},projectMenuData:{required:!1,tsType:{name:"Localized",elements:[{name:"MultiColumnMenu"}],raw:"Localized<MultiColumnMenu>"},description:`Menu data that is used to populate the Menubar component for the project menu. In an extension,
the menu data comes from menus.json in the contributions folder. To access that info, use
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."},openMenuInOverlay:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  menuData: Localized<MultiColumnMenu>,
  options: TabMenuOverlayOptions,
) => Promise<Localized<MenuItemContainingCommand> | undefined>`,signature:{arguments:[{type:{name:"Localized",elements:[{name:"MultiColumnMenu"}],raw:"Localized<MultiColumnMenu>"},name:"menuData"},{type:{name:"signature",type:"object",raw:`{
  /** The trigger's rectangle; the menu opens below it, aligned with its start edge */
  anchor: TabMenuTriggerRect;
  /** Whether the menu was opened from the keyboard, so it opens with its first item focused */
  focusFirstItem?: boolean;
}`,signature:{properties:[{key:"anchor",value:{name:"signature",type:"object",raw:"{ x: number; y: number; width: number; height: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0},description:"The trigger's rectangle; the menu opens below it, aligned with its start edge"},{key:"focusFirstItem",value:{name:"boolean",required:!1},description:"Whether the menu was opened from the keyboard, so it opens with its first item focused"}]}},name:"options"}],return:{name:"Promise",elements:[{name:"union",raw:"Localized<MenuItemContainingCommand> | undefined",elements:[{name:"Localized",elements:[{name:"MenuItemContainingCommand"}],raw:"Localized<MenuItemContainingCommand>"},{name:"undefined"}]}],raw:"Promise<Localized<MenuItemContainingCommand> | undefined>"}}},description:"Opens the toolbar's menus outside this document instead of in it. See `OpenTabMenuInOverlay`.\n\n@experimental This property is unstable and may change or disappear without notice"}}};const v={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},ze={title:"Advanced/TabFloatingMenu",component:g,tags:["autodocs"],args:{onSelectProjectMenuItem:n=>console.log("Project Menu Run command: ",n),projectMenuData:v}},e={},t={args:{menuButtonIcon:r.jsx(j,{})},parameters:{docs:{description:{story:"TabFloatingMenu with a custom icon as the menu button."}}}},o={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabFloatingMenu with custom background and border color."}}}};var i,s,m;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(m=(s=e.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var u,c,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    menuButtonIcon: <Plus />
  },
  parameters: {
    docs: {
      description: {
        story: 'TabFloatingMenu with a custom icon as the menu button.'
      }
    }
  }
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,p,h;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    className: 'tw:bg-red-100 tw:border-red-400'
  },
  parameters: {
    docs: {
      description: {
        story: 'TabFloatingMenu with custom background and border color.'
      }
    }
  }
}`,...(h=(p=o.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const Se=["Default","WithCustomIcon","WithCustomClassName"];export{e as Default,o as WithCustomClassName,t as WithCustomIcon,Se as __namedExportsOrder,ze as default};
