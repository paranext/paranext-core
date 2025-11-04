import{j as o}from"./jsx-runtime-c2I2IkSv.js";import{N as p,V as n}from"./index-DnRshUFb.js";import{S as r}from"./scroll-group-selector.component-DZmyXHI_.js";import{B as u}from"./book-chapter-control.component-BPNXoFu7.js";import{r as A}from"./iframe-DkDOfCps.js";import{T as d}from"./tab-toolbar.component-BY7_Vsfq.js";import"./select-DK15JFbq.js";import"./index-CPVXkvLf.js";import"./index-D5sjBHTD.js";import"./index-BaQP4hhM.js";import"./index-BSfYp4XF.js";import"./index-hhtH9E1S.js";import"./index-Qp8BYYBk.js";import"./index-BBXd1Q8R.js";import"./index-DNS2qw1R.js";import"./index-ChC8egr2.js";import"./index-DLp0jzGA.js";import"./index-I2FaYkY4.js";import"./index-Dn0U-npv.js";import"./index-DUo_W1Cr.js";import"./index-Bu5Y-f_O.js";import"./floating-ui.react-dom-BCmEO2DB.js";import"./index-ANMwTTqs.js";import"./Combination-Dp60GHt-.js";import"./index-DhxcraqK.js";import"./index-D_PzJGZ5.js";import"./index-CnJ8rVDv.js";import"./index-Yo6J-D9M.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-C8kWrHZz.js";import"./createLucideIcon-B02Eqsu7.js";import"./check-C3ADZMWu.js";import"./book-item.utils-p00TiOHG.js";import"./command-vKAH2l2b.js";import"./index-E1NqgsTE.js";import"./index-CDLWIZui.js";import"./index-C5SDH24W.js";import"./dialog-CyTrZgGh.js";import"./x-DS7j0bIO.js";import"./search-BRgAeo0I.js";import"./index.es-D4jfZzAn.js";import"./button-CRYhi4ev.js";import"./popover-8Wm61ryI.js";import"./chevron-left-BLe3ChzV.js";import"./chevron-right-Hb8Wl6dU.js";import"./arrow-right-BqnLv71f.js";import"./tab-dropdown-menu.component-cO3aXJuO.js";import"./dropdown-menu-C2nPxlhs.js";import"./menu.context-CnYLt72i.js";import"./index-D3Ck11RT.js";import"./circle-DgMXKhjj.js";import"./tooltip-BfRCUGBL.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-CMYSKpqB.js";import"./tab-toolbar-container.component-CMweneNu.js";function c({children:e,minWidth:y="0%",maxWidth:T="calc(100vw - 4rem)",skipAhead:N="0%"}){const m=A.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{animation:`${m} 6s infinite alternate ease-in-out`,animationDelay:`-${N}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[e,o.jsx("style",{children:`
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
