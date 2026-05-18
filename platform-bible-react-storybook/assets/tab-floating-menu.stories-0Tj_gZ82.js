import{j as r}from"./jsx-runtime-BqcUmbcY.js";import{T as M}from"./tab-dropdown-menu.component-D0866dO7.js";import{T as j}from"./tab-toolbar-container.component-BQH9extS.js";import{c as w}from"./createLucideIcon-D22C0aMl.js";import"./dropdown-menu-D8QUxCBP.js";import"./iframe-CTFeqsaU.js";import"./preload-helper-CTOgD26E.js";import"./menu.context-xh6o0_bs.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./IconCheck-D0oGOz8f.js";import"./createReactComponent-CR06EuV8.js";import"./IconChevronRight-3JeUsgHC.js";import"./index-CrprARdV.js";import"./index-h6nU96Nj.js";import"./index-CZ7swpmc.js";import"./index-BIiwzcA3.js";import"./index-Bz_elcL5.js";import"./index-B_gWPIE3.js";import"./index-NDEKFPcd.js";import"./index-DyG1FY6L.js";import"./index-DasKyulm.js";import"./index-DEEuL5ue.js";import"./index-C5GGbPN7.js";import"./index-DxJHqNyO.js";import"./index-Bz1D5jMs.js";import"./index-Dp4Xx3Xx.js";import"./index-CKqOUpvW.js";import"./index-C-Hux5y1.js";import"./tooltip-CvMAf3Er.js";import"./button-D-Y0-MVZ.js";import"./z-index-BATlIu8s.js";import"./index-X2wtV6fy.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-D0t4zoW3.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],I=w("plus",T);function b({onSelectProjectMenuItem:n,projectMenuData:a,id:g,className:f,menuButtonIcon:y}){return r.jsx(j,{className:"tw:pointer-events-none",id:g,children:a&&r.jsx(M,{onSelectMenuItem:n,menuData:a,tabLabel:"Project",icon:y,className:`tw:pointer-events-auto tw:shadow-lg ${f}`,buttonVariant:"outline"})})}b.__docgenInfo={description:`Renders a TabDropdownMenu with a trigger button that looks like the menuButtonIcon or like the
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
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."}}};const N={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},se={title:"Advanced/TabFloatingMenu",component:b,tags:["autodocs"],args:{onSelectProjectMenuItem:n=>console.log("Project Menu Run command: ",n),projectMenuData:N}},e={},o={args:{menuButtonIcon:r.jsx(I,{})},parameters:{docs:{description:{story:"TabFloatingMenu with a custom icon as the menu button."}}}},t={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabFloatingMenu with custom background and border color."}}}};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var c,l,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(h=(p=t.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const ie=["Default","WithCustomIcon","WithCustomClassName"];export{e as Default,t as WithCustomClassName,o as WithCustomIcon,ie as __namedExportsOrder,se as default};
