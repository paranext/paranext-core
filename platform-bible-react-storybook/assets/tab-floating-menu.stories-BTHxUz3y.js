import{j as n}from"./iframe-DwmEA7JC.js";import{T as M}from"./tab-dropdown-menu.component-CJOKy2sH.js";import{T as w}from"./tab-toolbar-container.component-BcI26OuW.js";import{c as j}from"./createLucideIcon-CMNQhVIY.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-Bk_5lMsM.js";import"./menu.context-CbVG-8bm.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-BJc0B0_k.js";import"./z-index-DhRj3SmA.js";import"./createReactComponent-BwzxAFf9.js";import"./IconChevronRight-CGqOK4TX.js";import"./index-C3kNhcaA.js";import"./index-Db9qd-QD.js";import"./index-qbK9ySJc.js";import"./index-qez9pqHY.js";import"./index-xA6im4UU.js";import"./index-7vipdWwS.js";import"./index-BR_6jPry.js";import"./index-X7gxHcWp.js";import"./index-BHVHeiLO.js";import"./index-C5HvWKyt.js";import"./index-QQnUPmtH.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CxryA-vR.js";import"./index-DSxpCGUt.js";import"./index-BssXkWws.js";import"./IconCheck-DLFPzFzh.js";import"./tooltip-CoSKxKcl.js";import"./button-9HKzajlK.js";import"./portal-container.context-9jbzBL1O.js";import"./index-TIk5x23H.js";import"./focus.util-CohqR1Ds.js";import"./use-interaction-modality.hook-TqKMsvY5.js";import"./shortcut-keys.component-DNOkBJua.js";import"./index-VL4OM5EA.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./kbd-DX-1qLRl.js";import"./menu.util-5L3jl9MX.js";import"./lucide-icon.component-CfJ4BWy6.js";import"./undo-2-84Y_39T6.js";import"./circle-check-big-D0dvwo2i.js";import"./message-square-DCY5gJs6.js";import"./search-j6X-wDF7.js";import"./book-open-BDw16Xl2.js";import"./square-x-KybVuI_N.js";import"./file-text-TNUXZmnK.js";import"./eye-CH8AUmnB.js";import"./external-link-P6lBH2m4.js";import"./circle-question-mark-DN5QxS5p.js";import"./settings-Cjf7UDHf.js";import"./house-BClPEQOA.js";import"./menu-icon.component-C3p1btS1.js";import"./shrink-step.context-CnKEjrsU.js";import"./use-shrink-step.hook-DjjL6iCb.js";/**
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
