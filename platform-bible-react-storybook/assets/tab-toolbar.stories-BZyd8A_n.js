import{r as N,j as o}from"./iframe-D18lKIKU.js";import"./index-BnMb6O87.js";import{S as r}from"./scroll-group-selector.component-CoUe-DH6.js";import{B as p}from"./book-chapter-control.component-BU2xO_5-.js";import{T as d}from"./tab-toolbar.component-BXw21A3L.js";import{z as u,l as n}from"./scripture-util-CIEEBU92-Dw9itcOy.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./select-vmKmoCeM.js";import"./utils-BPbySc-g.js";import"./createReactComponent-C4B6fflP.js";import"./IconCheck-DMWUSR0B.js";import"./index-BaQP4hhM.js";import"./index-BWZTOaeE.js";import"./index-C8OffPiQ.js";import"./index-CIsKK2g9.js";import"./index-DXG0y8Eh.js";import"./index-DJ8FvcXn.js";import"./index-B1zy_L8S.js";import"./index-XgILNRl1.js";import"./index-CVolSeXR.js";import"./index-dVmW3GXK.js";import"./index-S9SelDCj.js";import"./index-CFjnR6r9.js";import"./index-DmtVN2hL.js";import"./index-he7OpqRw.js";import"./index-B6vO9pRj.js";import"./z-index-CoNkaVR8.js";import"./book-item.utils-CswKv8At.js";import"./command-B3l8dzLC.js";import"./index-BrPop8TO.js";import"./index-DgBJYSLB.js";import"./dialog-Capgj_Np.js";import"./button-dWMnsJ9d.js";import"./index-BnuTq2W6.js";import"./input-group-BFGE64R6.js";import"./input-B8Eaj5Wd.js";import"./check-CB51WORs.js";import"./createLucideIcon-BO7dMgER.js";import"./popover-Dri8XiLr.js";import"./chevron-right-DqUnbpak.js";import"./arrow-left-DfmalmkZ.js";import"./arrow-right-DXMQ55H7.js";import"./tab-dropdown-menu.component-Y1hXLMEZ.js";import"./dropdown-menu-CZ0SC4TO.js";import"./menu.context-6OUtZqac.js";import"./IconChevronRight-CjLia2b7.js";import"./index-BfWh6_lu.js";import"./tooltip-4mra4Zza.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-Cd5xfrhs.js";import"./tab-toolbar-container.component-DwcuU2C9.js";import"./ellipsis-vertical-ChVys8kN.js";function c({children:e,minWidth:y="0%",maxWidth:T="calc(100vw - 4rem)",skipAhead:A="0%"}){const m=N.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{animation:`${m} 6s infinite alternate ease-in-out`,animationDelay:`-${A}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[e,o.jsx("style",{children:`
            @keyframes ${m} {
              0% {
                width: ${y};
              }
              100% {
                width: ${T};
              }
            }
          `})]}),o.jsx("p",{style:{paddingInlineStart:"1rem",fontSize:12,color:"#888"},children:"Container width is animated"})]})}c.__docgenInfo={description:"",methods:[],displayName:"AnimatedContainer",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'calc(100vw - 4rem)'",computed:!1}},skipAhead:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}}}};const t=e=>{console.log("New Scroll Group Id: ",e)},h=[{book:"GEN",chapterNum:1,verseNum:1},{book:"PSA",chapterNum:23,verseNum:1},{book:"MAT",chapterNum:5,verseNum:3}],g=e=>{console.log("Adding recent search: ",e)},z={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},G={columns:{options:{label:"Options",order:1},viewOptions:{label:"View Options",order:2}},groups:{layout:{column:"options",order:1},colors:{column:"viewOptions",order:2}},items:[{label:"Background Color",group:"colors",order:1,command:"changeBackgroundColor",localizeNotes:""},{label:"Text Color",group:"colors",order:2,command:"changeTextColor",localizeNotes:""},{label:"Thick Borders",group:"layout",order:1,command:"showThickBorders",localizeNotes:""}]},a={[n("undefined")]:"Ø",[n(0)]:"A",[n(1)]:"B",[n(2)]:"C",[n(3)]:"D",[n(4)]:"E"},Wo={title:"Advanced/TabToolbar",component:d,tags:["autodocs"],args:{onSelectProjectMenuItem:e=>console.log("Project Menu Run command: ",e),onSelectViewInfoMenuItem:e=>console.log("View Info Run command: ",e),projectMenuData:z,tabViewMenuData:G,startAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(p,{scrRef:u,handleSubmit:()=>{},recentSearches:h,onAddRecentSearch:g}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),centerAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),endAreaChildren:o.jsxs(o.Fragment,{children:[o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:a,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),o.jsx(p,{scrRef:u,handleSubmit:()=>{},recentSearches:h,onAddRecentSearch:g})]})}},i={},s={render:e=>o.jsxs(o.Fragment,{children:[o.jsx(c,{minWidth:"0%",maxWidth:"30vw",children:o.jsx(d,{...e})}),o.jsx(c,{minWidth:"200px",maxWidth:"60vw",skipAhead:"2s",children:o.jsx(d,{...e})}),o.jsx(c,{minWidth:"300px",skipAhead:"4s",children:o.jsx(d,{...e})})]}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior."}}}},l={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabToolbar with custom background and border color using the className prop."}}}};var b,S,x;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(x=(S=i.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var f,j,v;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(w=(I=l.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};const Ro=["Default","AnimatedWidth","WithCustomClassName"];export{s as AnimatedWidth,i as Default,l as WithCustomClassName,Ro as __namedExportsOrder,Wo as default};
