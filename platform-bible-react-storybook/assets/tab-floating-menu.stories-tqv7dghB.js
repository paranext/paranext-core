import{j as n}from"./iframe-C-3WxofP.js";import{T as M}from"./tab-dropdown-menu.component-CrDxglk4.js";import{T as w}from"./tab-toolbar-container.component-DbLq2Eju.js";import{c as j}from"./createLucideIcon-Bl8ISWPN.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-Ck1bMOIF.js";import"./menu.context-CfLSm-7-.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-DxFOQI5O.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-RkIsFDRc.js";import"./IconChevronRight-C376D5XP.js";import"./index-CUn9MuZT.js";import"./index--zcmnJlA.js";import"./index-C7CXlR2Y.js";import"./index-XB4HLKdl.js";import"./index-3W5hbEyd.js";import"./index-DsVto5XN.js";import"./index-BPXE1icK.js";import"./index-CBjU34W8.js";import"./index-BW-77ikA.js";import"./index-CO9vWcrk.js";import"./index-OVGynDqW.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Biv_tnkr.js";import"./index-gjK8o8cm.js";import"./index-CGnKi3Zx.js";import"./IconCheck-cPCnkctc.js";import"./tooltip-C9KMkTo4.js";import"./button-6HMOGXYy.js";import"./portal-container.context-v2OIvrj5.js";import"./index-CHmzHqmc.js";import"./focus.util-CPOjZEN2.js";import"./use-interaction-modality.hook-DfTZ7bj2.js";import"./shortcut-keys.component-Cr1eFDEl.js";import"./index-CpyFeyxh.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./kbd-MD5u6tPX.js";import"./menu.util-CdmRJSOK.js";import"./lucide-icon.component-DlJXfVwa.js";import"./circle-check-big-CXrjiXWa.js";import"./message-square-BSuBJHWL.js";import"./search-DGfCCX8N.js";import"./book-open-Sxkc1IJx.js";import"./square-x-DNVilSFW.js";import"./file-text-Bxmu9dr9.js";import"./eye-Ch_KE4Ko.js";import"./pencil-DEhupKcR.js";import"./external-link-DcqiS-7t.js";import"./circle-question-mark-EtzxiV6A.js";import"./settings-C0bzrv3M.js";import"./house-BbMfoXwM.js";import"./menu-icon.component-eKjvzgT9.js";import"./shrink-step.context-DPLdPjm3.js";import"./use-shrink-step.hook-RfYi68lN.js";/**
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
