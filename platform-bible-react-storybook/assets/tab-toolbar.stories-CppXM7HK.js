import{j as o}from"./jsx-runtime-BqcUmbcY.js";import{P as p,i}from"./index-CnlRi_gH.js";import{S as r}from"./scroll-group-selector.component-DrfAsm-O.js";import{B as u}from"./book-chapter-control.component-BIN2C8bD.js";import{r as N}from"./iframe-D92W13E2.js";import{T as d}from"./tab-toolbar.component-Bqt9n38Z.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./select-BDCx8lzv.js";import"./utils-BPbySc-g.js";import"./createReactComponent-BBQhi2at.js";import"./IconCheck-DP4bKhkv.js";import"./index-Bwktk0_R.js";import"./index-mw8YGy7E.js";import"./index-BaQP4hhM.js";import"./index-DgVAeaxr.js";import"./index-CYfiisD0.js";import"./index-Dmm7n1FJ.js";import"./index-B4oaHuxg.js";import"./index-B97NQHu7.js";import"./index-DNtatb76.js";import"./index-ZNdOMKb0.js";import"./index-Bv39JR7G.js";import"./index-BpQ72b-9.js";import"./index-CTp25mm4.js";import"./index-C-i3ftcP.js";import"./index-BaAWq2fD.js";import"./index-DQiOTlcR.js";import"./index-BPgsR_zg.js";import"./z-index-BATlIu8s.js";import"./book-item.utils-PqT6AD-k.js";import"./command-BVEkkD7K.js";import"./index-CmFbCE0m.js";import"./index-DzjGr33F.js";import"./dialog-HP0-SwZ3.js";import"./button-TyhYF1Tx.js";import"./index-BnuTq2W6.js";import"./input-group-DGipr8V2.js";import"./input-C3oppNdn.js";import"./check-HMbpYB5Y.js";import"./createLucideIcon-BRR2qaA4.js";import"./popover-jo97kxtn.js";import"./chevron-right-BfKZ73z3.js";import"./arrow-right-B1z_Zz2w.js";import"./preload-helper-CTOgD26E.js";import"./tab-dropdown-menu.component-ng49eTdG.js";import"./dropdown-menu-AFaXP6Fq.js";import"./menu.context-DEeteMdg.js";import"./IconChevronRight-qKDsiWUx.js";import"./index-B6Eb9q-G.js";import"./tooltip-5gN6PEPl.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-D0t4zoW3.js";import"./tab-toolbar-container.component-UjyJqaV9.js";import"./ellipsis-vertical-BcOQS_HQ.js";function c({children:e,minWidth:y="0%",maxWidth:T="calc(100vw - 4rem)",skipAhead:A="0%"}){const m=N.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{animation:`${m} 6s infinite alternate ease-in-out`,animationDelay:`-${A}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[e,o.jsx("style",{children:`
            @keyframes ${m} {
              0% {
                width: ${y};
              }
              100% {
                width: ${T};
              }
            }
          `})]}),o.jsx("p",{style:{paddingInlineStart:"1rem",fontSize:12,color:"#888"},children:"Container width is animated"})]})}c.__docgenInfo={description:"",methods:[],displayName:"AnimatedContainer",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'calc(100vw - 4rem)'",computed:!1}},skipAhead:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}}}};const t=e=>{console.log("New Scroll Group Id: ",e)},h=[{book:"GEN",chapterNum:1,verseNum:1},{book:"PSA",chapterNum:23,verseNum:1},{book:"MAT",chapterNum:5,verseNum:3}],g=e=>{console.log("Adding recent search: ",e)},G={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},k={columns:{options:{label:"Options",order:1},viewOptions:{label:"View Options",order:2}},groups:{layout:{column:"options",order:1},colors:{column:"viewOptions",order:2}},items:[{label:"Background Color",group:"colors",order:1,command:"changeBackgroundColor",localizeNotes:""},{label:"Text Color",group:"colors",order:2,command:"changeTextColor",localizeNotes:""},{label:"Thick Borders",group:"layout",order:1,command:"showThickBorders",localizeNotes:""}]},a={[i("undefined")]:"Ø",[i(0)]:"A",[i(1)]:"B",[i(2)]:"C",[i(3)]:"D",[i(4)]:"E"},Ro={title:"Advanced/TabToolbar",component:d,tags:["autodocs"],args:{onSelectProjectMenuItem:e=>console.log("Project Menu Run command: ",e),onSelectViewInfoMenuItem:e=>console.log("View Info Run command: ",e),projectMenuData:G,tabViewMenuData:k,startAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(u,{scrRef:p,handleSubmit:()=>{},recentSearches:h,onAddRecentSearch:g}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),centerAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),endAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(u,{scrRef:p,handleSubmit:()=>{},recentSearches:h,onAddRecentSearch:g})]})}},n={},s={render:e=>o.jsxs(o.Fragment,{children:[o.jsx(c,{minWidth:"0%",maxWidth:"30vw",children:o.jsx(d,{...e})}),o.jsx(c,{minWidth:"200px",maxWidth:"60vw",skipAhead:"2s",children:o.jsx(d,{...e})}),o.jsx(c,{minWidth:"300px",skipAhead:"4s",children:o.jsx(d,{...e})})]}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior."}}}},l={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabToolbar with custom background and border color using the className prop."}}}};var b,S,f;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var x,j,v;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(v=(j=s.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var C,I,w;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    className: 'tw:bg-red-100 tw:border-red-400'
  },
  parameters: {
    docs: {
      description: {
        story: 'TabToolbar with custom background and border color using the className prop.'
      }
    }
  }
}`,...(w=(I=l.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};const Po=["Default","AnimatedWidth","WithCustomClassName"];export{s as AnimatedWidth,n as Default,l as WithCustomClassName,Po as __namedExportsOrder,Ro as default};
