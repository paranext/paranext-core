import{j as e}from"./jsx-runtime-41bNZknh.js";import{v as w,U as a}from"./index-D2SfiHnw.js";import{S as t}from"./scroll-group-selector.component-C5oqVGV0.js";import{B as g}from"./book-chapter-control.component-By4NAWUV.js";import{r as G}from"./iframe-DezKLm1V.js";import{T as x,M as W}from"./tab-dropdown-menu.component-oAE0QLOk.js";import{T as q}from"./tab-toolbar-container.component-C-I5uozQ.js";import{c as R}from"./createLucideIcon-DTaFhFy2.js";import"./select-Dr6ovA2M.js";import"./index-Cm_lBpWX.js";import"./index-bmjVsPBM.js";import"./index-BaQP4hhM.js";import"./index-DCZ4hzzP.js";import"./index-Ds3a2SEj.js";import"./index-yLsKtSDm.js";import"./index-DnT6kkIn.js";import"./index-CUlupESh.js";import"./index-D0KJGRUa.js";import"./index-DRzs5cDs.js";import"./index-C_lQNFk6.js";import"./index-GymTf0II.js";import"./index-CGW-eGMe.js";import"./index-5i6OQTW1.js";import"./floating-ui.react-dom-DRRlu4dy.js";import"./index-Cl2ghorV.js";import"./index-C4F-WIu_.js";import"./index-bv5lnDsn.js";import"./index--VrIerAB.js";import"./index-SLflGqxF.js";import"./index-CQaoPSAz.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DiYI-0EF.js";import"./check-sRo6ZDjs.js";import"./button-BNImaUK1.js";import"./command-0z1d5FR1.js";import"./index-C9uOEbzz.js";import"./index-DWkLH5K8.js";import"./index-DsNnbpps.js";import"./dialog-DYziUFbh.js";import"./x-Ds41Yxs5.js";import"./search-BlP6EaUr.js";import"./popover-BN2Ikyre.js";import"./index.es-D4jfZzAn.js";import"./chevron-left-9iKLP4Ni.js";import"./chevron-right-B1_l_iFN.js";import"./arrow-right-C58Os0rq.js";import"./dropdown-menu-BaYsJeve.js";import"./menu.context-CUkr3BIT.js";import"./index-D_DKG39-.js";import"./circle-BeT2qg1c.js";import"./tooltip-434E7U0A.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-BvbnVgRG.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]],V=R("EllipsisVertical",B);function u({children:o,minWidth:h="0%",maxWidth:s="calc(100vw - 4rem)",skipAhead:l="0%"}){const d=G.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{animation:`${d} 6s infinite alternate ease-in-out`,animationDelay:`-${l}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[o,e.jsx("style",{children:`
            @keyframes ${d} {
              0% {
                width: ${h};
              }
              100% {
                width: ${s};
              }
            }
          `})]}),e.jsx("p",{style:{paddingInlineStart:"1rem",fontSize:12,color:"#888"},children:"Container width is animated"})]})}u.__docgenInfo={description:"",methods:[],displayName:"AnimatedContainer",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'calc(100vw - 4rem)'",computed:!1}},skipAhead:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}}}};function i({onSelectProjectMenuItem:o,onSelectViewInfoMenuItem:h,projectMenuData:s,tabViewMenuData:l,id:d,className:k,startAreaChildren:f,centerAreaChildren:b,endAreaChildren:z,menuButtonIcon:A}){return e.jsxs(q,{className:`tw-w-full tw-border ${k}`,id:d,children:[s&&e.jsx(x,{onSelectMenuItem:o,menuData:s,tabLabel:"Project",icon:A??e.jsx(W,{}),buttonVariant:"ghost"}),f&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:f}),b&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:b}),e.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[l&&e.jsx(x,{onSelectMenuItem:h,menuData:l,tabLabel:"View Info",icon:e.jsx(V,{}),className:"tw-h-full"}),z]})]})}i.__docgenInfo={description:`Toolbar that holds the project menu icon on one side followed by three different areas/categories
for toolbar icons followed by an optional view info menu icon. See the Tab Floating Menu Button
component for a menu component that takes up less screen real estate yet is always visible.`,methods:[],displayName:"TabToolbar",props:{onSelectProjectMenuItem:{required:!0,tsType:{name:"SelectMenuItemHandler"},description:`The handler to use for toolbar item commands related to the project menu. Here is a basic
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
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."},onSelectViewInfoMenuItem:{required:!0,tsType:{name:"SelectMenuItemHandler"},description:`The handler to use for toolbar item commands related to the tab view menu. Here is a basic
example of how to create this from the hello-rock3 extension:

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
\`\`\``},tabViewMenuData:{required:!1,tsType:{name:"Localized",elements:[{name:"MultiColumnMenu"}],raw:"Localized<MultiColumnMenu>"},description:"Menu data that is used to populate the Menubar component for the view info menu"},startAreaChildren:{required:!1,tsType:{name:"ReactNode"},description:`Toolbar children to be put at the start of the the toolbar after the project menu icon (left
side in ltr, right side in rtl). Recommended for inner navigation.`},centerAreaChildren:{required:!1,tsType:{name:"ReactNode"},description:"Toolbar children to be put in the center area of the the toolbar. Recommended for tools."},endAreaChildren:{required:!1,tsType:{name:"ReactNode"},description:`Toolbar children to be put at the end of the the toolbar before the tab view menu icon (right
side in ltr, left side in rtl). Recommended for secondary tools and view options.`}}};const r=o=>{console.log("New Scroll Group Id: ",o)},D={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},E={columns:{options:{label:"Options",order:1},viewOptions:{label:"View Options",order:2}},groups:{layout:{column:"options",order:1},colors:{column:"viewOptions",order:2}},items:[{label:"Background Color",group:"colors",order:1,command:"changeBackgroundColor",localizeNotes:""},{label:"Text Color",group:"colors",order:2,command:"changeTextColor",localizeNotes:""},{label:"Thick Borders",group:"layout",order:1,command:"showThickBorders",localizeNotes:""}]},n={[a("undefined")]:"Ø",[a(0)]:"A",[a(1)]:"B",[a(2)]:"C",[a(3)]:"D",[a(4)]:"E"},$e={title:"Advanced/TabToolbar",component:i,tags:["autodocs"],args:{onSelectProjectMenuItem:o=>console.log("Project Menu Run command: ",o),onSelectViewInfoMenuItem:o=>console.log("View Info Run command: ",o),projectMenuData:D,tabViewMenuData:E,startAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(g,{scrRef:w,handleSubmit:()=>{}}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"})]}),centerAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"})]}),endAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(g,{scrRef:w,handleSubmit:()=>{}})]})}},c={},m={render:o=>e.jsxs(e.Fragment,{children:[e.jsx(u,{minWidth:"0%",maxWidth:"30vw",children:e.jsx(i,{...o})}),e.jsx(u,{minWidth:"200px",maxWidth:"60vw",skipAhead:"2s",children:e.jsx(i,{...o})}),e.jsx(u,{minWidth:"300px",skipAhead:"4s",children:e.jsx(i,{...o})})]}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior."}}}},p={args:{className:"tw-bg-red-100 tw-border-red-400"},parameters:{docs:{description:{story:"TabToolbar with custom background and border color using the className prop."}}}};var y,j,S;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:"{}",...(S=(j=c.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var I,T,v;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <>
      <AnimatedContainer minWidth="0%" maxWidth="30vw">
        <TabToolbar {...args} />
      </AnimatedContainer>
      <AnimatedContainer minWidth="200px" maxWidth="60vw" skipAhead="2s">
        <TabToolbar {...args} />
      </AnimatedContainer>
      <AnimatedContainer minWidth="300px" skipAhead="4s">
        <TabToolbar {...args} />
      </AnimatedContainer>
    </>,
  parameters: {
    controls: {
      hideNoControlsWarning: true
    },
    docs: {
      description: {
        story: 'Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior.'
      }
    }
  }
}`,...(v=(T=m.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var C,N,M;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    className: 'tw-bg-red-100 tw-border-red-400'
  },
  parameters: {
    docs: {
      description: {
        story: 'TabToolbar with custom background and border color using the className prop.'
      }
    }
  }
}`,...(M=(N=p.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};const Pe=["Default","AnimatedWidth","WithCustomClassName"];export{m as AnimatedWidth,c as Default,p as WithCustomClassName,Pe as __namedExportsOrder,$e as default};
