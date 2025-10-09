import{j as e}from"./jsx-runtime-Dh_OFCz9.js";import{y as w,V as a}from"./index-CMbzNxbH.js";import{S as t}from"./scroll-group-selector.component-C1QsXsYg.js";import{B as g}from"./book-chapter-control.component-BuAtepUr.js";import{r as R}from"./iframe-Bq8lxKKc.js";import{T as x,M as q}from"./tab-dropdown-menu.component-W3835K2F.js";import{T as V}from"./tab-toolbar-container.component-CKCCcsPY.js";import{c as B}from"./createLucideIcon-DL_xxLyU.js";import"./select-SlECZBP0.js";import"./index-DEEpPjCA.js";import"./index-69R2V6G7.js";import"./index-BaQP4hhM.js";import"./index-De3rTpFd.js";import"./index-TeGGCEdA.js";import"./index-BHuAuOkM.js";import"./index-CtvlOJof.js";import"./index-BVGO1PJg.js";import"./index-6R_t3-dl.js";import"./index-DM15HkFi.js";import"./index-biHvxU2S.js";import"./index-ijHS_WkZ.js";import"./index-CcWxAzoq.js";import"./index-CAC429_s.js";import"./floating-ui.react-dom-CO27TKHL.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-BKblCrpV.js";import"./index-C6vtQD8J.js";import"./index-BTzT4J2Q.js";import"./index-cCKMpxy_.js";import"./index-CVxPn5xT.js";import"./index-B2XORRMx.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-dR5VOm8z.js";import"./check-DuvBPXfK.js";import"./book-item.utils-Dz5uHSU1.js";import"./command-DdOymx7f.js";import"./index-BlUp_XHf.js";import"./index-BIBaddkj.js";import"./index-CuUDUo3D.js";import"./dialog-BM9IcMNj.js";import"./x-kngM3cvW.js";import"./search-CceIHzuo.js";import"./index.es-D4jfZzAn.js";import"./button-B-g97D9w.js";import"./popover-CcrEfD4R.js";import"./chevron-left-BeSdyXwM.js";import"./chevron-right-B_eC4DUR.js";import"./arrow-right-Crb3pYI2.js";import"./dropdown-menu-Hd5cWTzk.js";import"./menu.context-CvNx7Y-N.js";import"./index-CJJ3piiP.js";import"./circle-zwX0Lzju.js";import"./tooltip-WiSvMg9b.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-Ded_2d3I.js";/**
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
