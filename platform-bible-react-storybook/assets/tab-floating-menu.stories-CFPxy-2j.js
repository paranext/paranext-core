import{j as n}from"./iframe-BmSO1vN7.js";import{T as M}from"./tab-dropdown-menu.component-D2uHurNn.js";import{T as w}from"./tab-toolbar-container.component-oTRwu8AM.js";import{c as j}from"./createLucideIcon-Br_PpITW.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu--qLYj7-y.js";import"./menu.context-BGBfMwyJ.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-BaK2Udn3.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-DLivXzso.js";import"./IconChevronRight-DxKG91Wk.js";import"./index-Dln0fL60.js";import"./index-Ckoma0tc.js";import"./index-CzQu472x.js";import"./index-BvIV5Fd7.js";import"./index-DUCcBfdx.js";import"./index-eyJNO8vt.js";import"./index-DZEqK9II.js";import"./index-mljoC5jH.js";import"./index-CvjIoj4_.js";import"./index-Dxpf_FrT.js";import"./index-DL18hW9P.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Cx1s9zhs.js";import"./index-c-qHSs6r.js";import"./index-4BvHtx1m.js";import"./IconCheck-CvFuOSJN.js";import"./tooltip-B7-k86Tk.js";import"./button-CCE51TUg.js";import"./portal-container.context-BeURbVht.js";import"./index-CdBiVPrY.js";import"./focus.util-BMX2jOVI.js";import"./use-interaction-modality.hook-DfcsQsTo.js";import"./shortcut-keys.component-bG5xwFUn.js";import"./index-CV9Q4DLM.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./kbd-BYQQjPBU.js";import"./menu.util-DmdhG0R3.js";import"./lucide-icon.component-DpxT_O6U.js";import"./circle-check-big-DZYyi2KZ.js";import"./message-square-DGaB0nUG.js";import"./search-CRKkmIcr.js";import"./book-open-ltQgMNt4.js";import"./square-x-B3GB8rqP.js";import"./file-text-P31PYLAr.js";import"./eye-CfQ7LTuZ.js";import"./pencil-Bh2dXjda.js";import"./external-link-xnQTDgO6.js";import"./circle-question-mark-CmLM8Lub.js";import"./settings-B2kAn2l1.js";import"./house-C_XjY4t1.js";import"./menu-icon.component-43SCoYC7.js";import"./shrink-step.context-DjC_9H_U.js";import"./use-shrink-step.hook-BZihcnOm.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],I=j("plus",T);function b({onSelectProjectMenuItem:r,projectMenuData:a,id:g,className:f,menuButtonIcon:y}){return n.jsx(w,{className:"tw:pointer-events-none",id:g,children:a&&n.jsx(M,{onSelectMenuItem:r,menuData:a,tabLabel:"Project",icon:y,className:`tw:pointer-events-auto tw:shadow-lg ${f}`,buttonVariant:"outline",showSectionHeadings:!0})})}b.__docgenInfo={description:`Renders a TabDropdownMenu with a trigger button that looks like the menuButtonIcon or like the
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
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."}}};const N={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},ke={title:"Advanced/TabFloatingMenu",component:b,tags:["autodocs"],args:{onSelectProjectMenuItem:r=>console.log("Project Menu Run command: ",r),projectMenuData:N}},e={},o={args:{menuButtonIcon:n.jsx(I,{})},parameters:{docs:{description:{story:"TabFloatingMenu with a custom icon as the menu button."}}}},t={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabFloatingMenu with custom background and border color."}}}};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var c,p,l;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var d,u,h;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const Pe=["Default","WithCustomIcon","WithCustomClassName"];export{e as Default,t as WithCustomClassName,o as WithCustomIcon,Pe as __namedExportsOrder,ke as default};
