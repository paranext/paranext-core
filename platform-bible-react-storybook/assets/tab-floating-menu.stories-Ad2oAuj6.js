import{j as n}from"./iframe-BZoAS20Y.js";import{T as M}from"./tab-dropdown-menu.component-DgDwcFWP.js";import{T as w}from"./tab-toolbar-container.component-DjaftrH-.js";import{c as j}from"./createLucideIcon-k5kgmIzz.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-BB3kb3VD.js";import"./menu.context-CzCcXojg.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-BSPLe_vq.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-A9h942Vh.js";import"./IconChevronRight-Bg3UVPNR.js";import"./index-Bpg2Ue0v.js";import"./index-FjA8CaH2.js";import"./index-3UEtw2WP.js";import"./index-B_YIbajZ.js";import"./index-TjikgXht.js";import"./index-BDF5Imj3.js";import"./index-CD_pAUxk.js";import"./index-C7ylZwau.js";import"./index-B-Tknmy3.js";import"./index-NW9PkmUb.js";import"./index-DFMr4cfd.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Be1UFgKu.js";import"./index-HgRug0Zq.js";import"./index-zqp-wsWj.js";import"./IconCheck-DzpKceQP.js";import"./tooltip-CWa-C7Am.js";import"./button-Dtk2T-b6.js";import"./portal-container.context-XblXT0Y3.js";import"./index-BDNivP6l.js";import"./focus.util-C3yuWoYA.js";import"./use-interaction-modality.hook-C5xt_A1x.js";import"./shortcut-keys.component-CWMm40TU.js";import"./index-B259sMQH.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./kbd-CBqLRMOD.js";import"./menu.util-ujXGA-me.js";import"./lucide-icon.component-DES9K0ZN.js";import"./undo-2-KxC8ibqm.js";import"./circle-check-big-C7cqxkdG.js";import"./message-square-BBexkea5.js";import"./search-BR3kdNF-.js";import"./book-open-BIFvUnO6.js";import"./square-x-eb_MTLJp.js";import"./file-text-z0EYl6kG.js";import"./eye-DRZrcN6b.js";import"./external-link-5oZID_AM.js";import"./circle-question-mark-mzyYeAxy.js";import"./settings-DeCSDwsJ.js";import"./house-BgZhNTM0.js";import"./menu-icon.component-DpmKAKCP.js";import"./shrink-step.context-B2D1J_GW.js";import"./use-shrink-step.hook-BKZ_QI-V.js";/**
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
