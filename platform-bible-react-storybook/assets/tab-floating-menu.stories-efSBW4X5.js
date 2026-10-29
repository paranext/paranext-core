import{j as n}from"./iframe-CTiqha1F.js";import{T as M}from"./tab-dropdown-menu.component-B6hFw9uR.js";import{T as w}from"./tab-toolbar-container.component-BHai3Kmu.js";import{c as j}from"./createLucideIcon-CGw6ljBM.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-D2Nl54O_.js";import"./menu.context-C_Ga1dyN.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-3Stgw6AR.js";import"./IconChevronRight-BpsTUUo-.js";import"./index-BrKo-VD1.js";import"./index-aQscZVDh.js";import"./index-DAktaj2P.js";import"./index-DiPFuyzQ.js";import"./index-B21Eheaz.js";import"./index-DzoTJT8T.js";import"./index-B8sVvzOx.js";import"./index-4H2VFBTy.js";import"./index-DghOQhbD.js";import"./index-BnRkFOQK.js";import"./index-Crw73O5a.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Kew961MA.js";import"./index-CBrmAWKC.js";import"./index-BOFlDtU0.js";import"./IconCheck-BWLyNpeJ.js";import"./tooltip-Dj3cN8D6.js";import"./button-CCR5A31h.js";import"./portal-container.context-DrmkKJsd.js";import"./index-Bxy-bvsl.js";import"./focus.util-DRSEP984.js";import"./use-interaction-modality.hook-CaH6b2dT.js";import"./shortcut-keys.component-CCy7gQ0F.js";import"./index-B2Agy_j1.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./kbd-CEhu4OLE.js";import"./menu.util-DsBSUbiW.js";import"./lucide-icon.component-C5N_9Vz0.js";import"./circle-check-big-DMR_RDtK.js";import"./message-square-CtKa_WZd.js";import"./search-DcC7BO9N.js";import"./book-open-BQdDEnje.js";import"./square-x-B-zbBcZx.js";import"./file-text-Deqyvood.js";import"./eye-BRkCxQy0.js";import"./pencil-Df3aFoV8.js";import"./external-link-DgvEuS5R.js";import"./circle-question-mark-DwVF5dmr.js";import"./settings-DJhZp-Is.js";import"./house-C4UgMauX.js";import"./menu-icon.component-CKIi08T6.js";import"./shrink-step.context-DE4vGeC6.js";import"./use-shrink-step.hook-DRxTO1py.js";/**
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
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."}}};const N={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},ve={title:"Advanced/TabFloatingMenu",component:b,tags:["autodocs"],args:{onSelectProjectMenuItem:r=>console.log("Project Menu Run command: ",r),projectMenuData:N}},e={},o={args:{menuButtonIcon:n.jsx(I,{})},parameters:{docs:{description:{story:"TabFloatingMenu with a custom icon as the menu button."}}}},t={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabFloatingMenu with custom background and border color."}}}};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var c,p,l;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const ke=["Default","WithCustomIcon","WithCustomClassName"];export{e as Default,t as WithCustomClassName,o as WithCustomIcon,ke as __namedExportsOrder,ve as default};
