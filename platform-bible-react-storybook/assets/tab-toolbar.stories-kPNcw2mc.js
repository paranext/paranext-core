import{r as N,j as o}from"./iframe-CZvc88lx.js";import"./index-BnMb6O87.js";import{S as r}from"./scroll-group-selector.component-CWtmSdBy.js";import{B as p}from"./book-chapter-control.component-CagZYEhy.js";import{T as d}from"./tab-toolbar.component-DMWMUaFT.js";import{z as u,l as n}from"./scripture-util-CIEEBU92-Dw9itcOy.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./select-Dm12Wrbp.js";import"./utils-BPbySc-g.js";import"./createReactComponent-q1AXX6-f.js";import"./IconCheck-D4IYIWDF.js";import"./index-BaQP4hhM.js";import"./index-DMirlbJm.js";import"./index-BBxiJWLu.js";import"./index-DFGG4a7O.js";import"./index-BCFJY3Yb.js";import"./index-CunXfxNe.js";import"./index-DsDi7nag.js";import"./index-DsJ4sOKZ.js";import"./index-DMyhmGx1.js";import"./index-C7ufJrAw.js";import"./index-F8sX17OF.js";import"./index-Bq5uJXQj.js";import"./index-qZfcplJF.js";import"./index-DVhyCVJ6.js";import"./index-Dv5Y-mME.js";import"./z-index-CoNkaVR8.js";import"./book-item.utils-CDADdTHF.js";import"./command-CUBjRbSK.js";import"./index-BOm9fHiL.js";import"./index-CYDYM2TV.js";import"./dialog-Bqv_EOE3.js";import"./button-Dy0avwbE.js";import"./index-BnuTq2W6.js";import"./input-group-lgufQjBH.js";import"./input-DzGrap8a.js";import"./check-BLbKeICS.js";import"./createLucideIcon-DPxMjWIt.js";import"./popover-dqlaYSz4.js";import"./chevron-right-C8iF9luC.js";import"./arrow-left-CeoxgTRA.js";import"./arrow-right-BpW1bGrE.js";import"./tab-dropdown-menu.component-IAftkEdH.js";import"./dropdown-menu-QLX5V7zO.js";import"./menu.context-CjMXleB0.js";import"./IconChevronRight-DBr7c2MU.js";import"./index-D6NVE06A.js";import"./tooltip-D3neKYpa.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-sgTM8hsf.js";import"./tab-toolbar-container.component-6y1KWliG.js";import"./ellipsis-vertical-Bh9l_ZrM.js";function c({children:e,minWidth:y="0%",maxWidth:T="calc(100vw - 4rem)",skipAhead:A="0%"}){const m=N.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{animation:`${m} 6s infinite alternate ease-in-out`,animationDelay:`-${A}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[e,o.jsx("style",{children:`
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
