import{j as e}from"./jsx-runtime-BJsVUjqB.js";import{N as w,V as a}from"./index-DOKkQ3oI.js";import{S as t}from"./scroll-group-selector.component-CYdjg-6C.js";import{B as g}from"./book-chapter-control.component-Bb2MgANs.js";import{r as R}from"./iframe-DG98d1TG.js";import{T as x,M as q}from"./tab-dropdown-menu.component-Ct0K6ejQ.js";import{T as V}from"./tab-toolbar-container.component-BgmkNfrb.js";import{c as B}from"./createLucideIcon-p8gE5Gba.js";import"./select-Csdj0vro.js";import"./index-DofTjC7g.js";import"./index-BxOOARmk.js";import"./index-BaQP4hhM.js";import"./index-ok8v23vl.js";import"./index-QGIyeWw6.js";import"./index-DlE-binY.js";import"./index-DrohWjR4.js";import"./index-CZF43nZ1.js";import"./index-DZkDYqJK.js";import"./index-BSmZ9KAX.js";import"./index-CmGV6Z84.js";import"./index-BWTXhuRO.js";import"./index-wlH-xRYl.js";import"./index-Cx_0CvMz.js";import"./floating-ui.react-dom-DKfDZtVl.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-MRTyosdG.js";import"./index-gqdhdz_t.js";import"./index-Cr-W_MMw.js";import"./index-CVjegi03.js";import"./index-CvxmRJUi.js";import"./index-nnM6rHie.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CovUdCJh.js";import"./check-Cr8J_fiM.js";import"./book-item.utils-ColKsOo6.js";import"./command-BZaIj_nh.js";import"./index-DWBZDpR1.js";import"./index-BYT3nb0q.js";import"./index-BPQqLPRk.js";import"./dialog-CY-LmLxP.js";import"./x-DleREQm7.js";import"./search-BSfSky3J.js";import"./index.es-D4jfZzAn.js";import"./button-Delv6TUc.js";import"./popover-B0YKj4u5.js";import"./chevron-left-Coq_u_7u.js";import"./chevron-right-sgao5-Uf.js";import"./arrow-right-2qCp1R8a.js";import"./dropdown-menu-DDxZo5mp.js";import"./menu.context-bF7c6ltx.js";import"./index-CKlr0aKE.js";import"./circle-CgRCL4HR.js";import"./tooltip-DMapAxq1.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-Bjc4794Z.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]],D=B("EllipsisVertical",E);function u({children:o,minWidth:h="0%",maxWidth:s="calc(100vw - 4rem)",skipAhead:l="0%"}){const c=R.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{animation:`${c} 6s infinite alternate ease-in-out`,animationDelay:`-${l}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[o,e.jsx("style",{children:`
            @keyframes ${c} {
              0% {
                width: ${h};
              }
              100% {
                width: ${s};
              }
            }
          `})]}),e.jsx("p",{style:{paddingInlineStart:"1rem",fontSize:12,color:"#888"},children:"Container width is animated"})]})}u.__docgenInfo={description:"",methods:[],displayName:"AnimatedContainer",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'calc(100vw - 4rem)'",computed:!1}},skipAhead:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}}}};function i({onSelectProjectMenuItem:o,onSelectViewInfoMenuItem:h,projectMenuData:s,tabViewMenuData:l,id:c,className:z,startAreaChildren:f,centerAreaChildren:b,endAreaChildren:G,menuButtonIcon:W}){return e.jsxs(V,{className:`tw-w-full tw-border ${z}`,id:c,children:[s&&e.jsx(x,{onSelectMenuItem:o,menuData:s,tabLabel:"Project",icon:W??e.jsx(q,{}),buttonVariant:"ghost"}),f&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:f}),b&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:b}),e.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[l&&e.jsx(x,{onSelectMenuItem:h,menuData:l,tabLabel:"View Info",icon:e.jsx(D,{}),className:"tw-h-full"}),G]})]})}i.__docgenInfo={description:`Toolbar that holds the project menu icon on one side followed by three different areas/categories
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
side in ltr, left side in rtl). Recommended for secondary tools and view options.`}}};const r=o=>{console.log("New Scroll Group Id: ",o)},y=[{book:"GEN",chapterNum:1,verseNum:1},{book:"PSA",chapterNum:23,verseNum:1},{book:"MAT",chapterNum:5,verseNum:3}],S=o=>{console.log("Adding recent search: ",o)},P={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},$={columns:{options:{label:"Options",order:1},viewOptions:{label:"View Options",order:2}},groups:{layout:{column:"options",order:1},colors:{column:"viewOptions",order:2}},items:[{label:"Background Color",group:"colors",order:1,command:"changeBackgroundColor",localizeNotes:""},{label:"Text Color",group:"colors",order:2,command:"changeTextColor",localizeNotes:""},{label:"Thick Borders",group:"layout",order:1,command:"showThickBorders",localizeNotes:""}]},n={[a("undefined")]:"Ø",[a(0)]:"A",[a(1)]:"B",[a(2)]:"C",[a(3)]:"D",[a(4)]:"E"},Le={title:"Advanced/TabToolbar",component:i,tags:["autodocs"],args:{onSelectProjectMenuItem:o=>console.log("Project Menu Run command: ",o),onSelectViewInfoMenuItem:o=>console.log("View Info Run command: ",o),projectMenuData:P,tabViewMenuData:$,startAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(g,{scrRef:w,handleSubmit:()=>{},recentSearches:y,onAddRecentSearch:S}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"})]}),centerAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"})]}),endAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(t,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:r,size:"sm"}),e.jsx(g,{scrRef:w,handleSubmit:()=>{},recentSearches:y,onAddRecentSearch:S})]})}},d={},m={render:o=>e.jsxs(e.Fragment,{children:[e.jsx(u,{minWidth:"0%",maxWidth:"30vw",children:e.jsx(i,{...o})}),e.jsx(u,{minWidth:"200px",maxWidth:"60vw",skipAhead:"2s",children:e.jsx(i,{...o})}),e.jsx(u,{minWidth:"300px",skipAhead:"4s",children:e.jsx(i,{...o})})]}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior."}}}},p={args:{className:"tw-bg-red-100 tw-border-red-400"},parameters:{docs:{description:{story:"TabToolbar with custom background and border color using the className prop."}}}};var j,T,I;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:"{}",...(I=(T=d.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var v,C,N;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(N=(C=m.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var M,A,k;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(k=(A=p.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};const _e=["Default","AnimatedWidth","WithCustomClassName"];export{m as AnimatedWidth,d as Default,p as WithCustomClassName,_e as __namedExportsOrder,Le as default};
