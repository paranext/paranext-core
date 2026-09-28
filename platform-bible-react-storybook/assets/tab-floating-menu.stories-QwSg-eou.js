import{j as r}from"./iframe-BhzRf1a_.js";import{T as M}from"./tab-dropdown-menu.component--4N4waeb.js";import{T as w}from"./tab-toolbar-container.component-D8ba5m7Q.js";import{c as j}from"./createLucideIcon-BoKl6bDD.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-Ch0G9AU7.js";import"./menu.context-Cp1KJPCg.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-Dj0fvLL8.js";import"./IconChevronRight-DurVpoj7.js";import"./index-Cr0ze4Ik.js";import"./index-Cyt3_Tbb.js";import"./index-DQmM9JGJ.js";import"./index-DX2Zr5MP.js";import"./index-B8dZ1a3E.js";import"./index-D9UUNMUH.js";import"./index-D6_H2cNn.js";import"./index-DETTLARJ.js";import"./index-DTJmr9ez.js";import"./index-CTsSrpJ1.js";import"./index-C6y6R_gT.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-WbKrLJdk.js";import"./index-cbX3NMhN.js";import"./index-Bx74Uub0.js";import"./IconCheck-C2vdSruq.js";import"./tooltip-DEMQ5tjc.js";import"./button-CtiAR0_S.js";import"./portal-container.context-Bw7Woi-1.js";import"./index-B2p9U_U8.js";import"./focus.util-DRSEP984.js";import"./use-interaction-modality.hook-BO7ND2Q-.js";import"./menu.util-B4Sg39gp.js";import"./menu-icon.component-xgUZGf6O.js";import"./shrink-step.context-D4Rm3L0K.js";import"./use-shrink-step.hook-BakcW8_X.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],I=j("plus",T);function b({onSelectProjectMenuItem:n,projectMenuData:a,id:g,className:f,menuButtonIcon:y}){return r.jsx(w,{className:"tw:pointer-events-none",id:g,children:a&&r.jsx(M,{onSelectMenuItem:n,menuData:a,tabLabel:"Project",icon:y,className:`tw:pointer-events-auto tw:shadow-lg ${f}`,buttonVariant:"outline",showSectionHeadings:!0})})}b.__docgenInfo={description:`Renders a TabDropdownMenu with a trigger button that looks like the menuButtonIcon or like the
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
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."}}};const N={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},ce={title:"Advanced/TabFloatingMenu",component:b,tags:["autodocs"],args:{onSelectProjectMenuItem:n=>console.log("Project Menu Run command: ",n),projectMenuData:N}},e={},o={args:{menuButtonIcon:r.jsx(I,{})},parameters:{docs:{description:{story:"TabFloatingMenu with a custom icon as the menu button."}}}},t={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabFloatingMenu with custom background and border color."}}}};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var c,l,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(d=(l=o.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,p,h;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(p=t.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const le=["Default","WithCustomIcon","WithCustomClassName"];export{e as Default,t as WithCustomClassName,o as WithCustomIcon,le as __namedExportsOrder,ce as default};
