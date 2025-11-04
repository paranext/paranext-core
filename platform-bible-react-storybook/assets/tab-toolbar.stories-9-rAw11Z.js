import{j as o}from"./jsx-runtime-CBd_Hxdi.js";import{N as p,V as n}from"./index-DnRshUFb.js";import{S as r}from"./scroll-group-selector.component-C4HaULRN.js";import{B as u}from"./book-chapter-control.component-153ORcSU.js";import{r as A}from"./iframe-wsr4cIWR.js";import{T as d}from"./tab-toolbar.component-cyyiOhr2.js";import"./select-Dy_Rc-Un.js";import"./index-Dm9pFR1z.js";import"./index-Ckd0Ji86.js";import"./index-BaQP4hhM.js";import"./index-Da__4sFI.js";import"./index--xiNs5SG.js";import"./index-G9PQMj4r.js";import"./index-DELj727g.js";import"./index-C5MKt1lg.js";import"./index-CRSk00He.js";import"./index-BNmfVJwq.js";import"./index-C2uRrM6S.js";import"./index-Dj0iLKR5.js";import"./index-DtU9vRPI.js";import"./index-B0OPLjYF.js";import"./floating-ui.react-dom-N2DHj44I.js";import"./index-CHGLkSmU.js";import"./Combination-C45Tn4W7.js";import"./index-BDILRuWp.js";import"./index-BN30eUvI.js";import"./index-D7na7gL7.js";import"./index-DaCNHXig.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-XSvtKwNS.js";import"./createLucideIcon-KwPUPnl9.js";import"./check-HcdwSd9P.js";import"./book-item.utils--Sqt-1iY.js";import"./command-CUeU_5P5.js";import"./index-DwrtSohy.js";import"./index-CQ8F1vF0.js";import"./index-Bfa_IsSh.js";import"./dialog-C92Van5J.js";import"./x-B0c_cQL2.js";import"./search-bCGqBKGG.js";import"./index.es-D4jfZzAn.js";import"./button-CbXY9USB.js";import"./popover-e-MgrSUo.js";import"./chevron-left-Dx_3-Qje.js";import"./chevron-right-DlK9b-e3.js";import"./arrow-right-D0-Ht16J.js";import"./tab-dropdown-menu.component-BY6n0ndc.js";import"./dropdown-menu-ufZue1cB.js";import"./menu.context-CBK_GY1X.js";import"./index-Cv2Owjym.js";import"./circle-Bch2Qxx2.js";import"./tooltip-CjK_3HOQ.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-Bl8D1AuT.js";import"./tab-toolbar-container.component-UwIQQsSQ.js";function c({children:e,minWidth:y="0%",maxWidth:T="calc(100vw - 4rem)",skipAhead:N="0%"}){const m=A.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{animation:`${m} 6s infinite alternate ease-in-out`,animationDelay:`-${N}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[e,o.jsx("style",{children:`
            @keyframes ${m} {
              0% {
                width: ${y};
              }
              100% {
                width: ${T};
              }
            }
          `})]}),o.jsx("p",{style:{paddingInlineStart:"1rem",fontSize:12,color:"#888"},children:"Container width is animated"})]})}c.__docgenInfo={description:"",methods:[],displayName:"AnimatedContainer",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'calc(100vw - 4rem)'",computed:!1}},skipAhead:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}}}};const t=e=>{console.log("New Scroll Group Id: ",e)},h=[{book:"GEN",chapterNum:1,verseNum:1},{book:"PSA",chapterNum:23,verseNum:1},{book:"MAT",chapterNum:5,verseNum:3}],g=e=>{console.log("Adding recent search: ",e)},G={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},k={columns:{options:{label:"Options",order:1},viewOptions:{label:"View Options",order:2}},groups:{layout:{column:"options",order:1},colors:{column:"viewOptions",order:2}},items:[{label:"Background Color",group:"colors",order:1,command:"changeBackgroundColor",localizeNotes:""},{label:"Text Color",group:"colors",order:2,command:"changeTextColor",localizeNotes:""},{label:"Thick Borders",group:"layout",order:1,command:"showThickBorders",localizeNotes:""}]},a={[n("undefined")]:"Ø",[n(0)]:"A",[n(1)]:"B",[n(2)]:"C",[n(3)]:"D",[n(4)]:"E"},Bo={title:"Advanced/TabToolbar",component:d,tags:["autodocs"],args:{onSelectProjectMenuItem:e=>console.log("Project Menu Run command: ",e),onSelectViewInfoMenuItem:e=>console.log("View Info Run command: ",e),projectMenuData:G,tabViewMenuData:k,startAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(u,{scrRef:p,handleSubmit:()=>{},recentSearches:h,onAddRecentSearch:g}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),centerAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),endAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(u,{scrRef:p,handleSubmit:()=>{},recentSearches:h,onAddRecentSearch:g})]})}},i={},s={render:e=>o.jsxs(o.Fragment,{children:[o.jsx(c,{minWidth:"0%",maxWidth:"30vw",children:o.jsx(d,{...e})}),o.jsx(c,{minWidth:"200px",maxWidth:"60vw",skipAhead:"2s",children:o.jsx(d,{...e})}),o.jsx(c,{minWidth:"300px",skipAhead:"4s",children:o.jsx(d,{...e})})]}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior."}}}},l={args:{className:"tw-bg-red-100 tw-border-red-400"},parameters:{docs:{description:{story:"TabToolbar with custom background and border color using the className prop."}}}};var b,S,f;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(f=(S=i.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var x,j,v;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
    className: 'tw-bg-red-100 tw-border-red-400'
  },
  parameters: {
    docs: {
      description: {
        story: 'TabToolbar with custom background and border color using the className prop.'
      }
    }
  }
}`,...(w=(I=l.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};const Po=["Default","AnimatedWidth","WithCustomClassName"];export{s as AnimatedWidth,i as Default,l as WithCustomClassName,Po as __namedExportsOrder,Bo as default};
