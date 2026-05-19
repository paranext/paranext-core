import{j as o}from"./jsx-runtime-BqcUmbcY.js";import{P as p,i}from"./index-CnlRi_gH.js";import{S as r}from"./scroll-group-selector.component-z6Ca6gjC.js";import{B as u}from"./book-chapter-control.component-B8Z6atSN.js";import{r as N}from"./iframe-BkPDkXut.js";import{T as d}from"./tab-toolbar.component-D9RQfbiZ.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./select-D19Fitk2.js";import"./utils-BPbySc-g.js";import"./createReactComponent-BsDjJKz7.js";import"./IconCheck-BUmIGoPl.js";import"./index-DknL07xj.js";import"./index-FFX_VlL3.js";import"./index-BaQP4hhM.js";import"./index-CljwE42q.js";import"./index-DW3nH08e.js";import"./index-BRuJ3uvt.js";import"./index-B9qNzBKI.js";import"./index-C7Rve1wK.js";import"./index-bNmYcAi7.js";import"./index-NUY4MJAe.js";import"./index-D1XDn7oT.js";import"./index-C6HVxW2Z.js";import"./index-BEkoA6AM.js";import"./index-DtO8jjuu.js";import"./index-a9xMB-G4.js";import"./index-Cl1YLAkT.js";import"./index-CIh8Hfvq.js";import"./z-index-BATlIu8s.js";import"./book-item.utils-B-DK7z-B.js";import"./command-B5vERpU2.js";import"./index-By_WXyi_.js";import"./index-CXGXvUkH.js";import"./dialog-sgMIr1EC.js";import"./button-BbWsHbel.js";import"./index-BnuTq2W6.js";import"./input-group-DDfTrcTm.js";import"./input-C3oppNdn.js";import"./check-BNLJ0sYO.js";import"./createLucideIcon-BSs9dUUX.js";import"./popover-BjJ4ZiUh.js";import"./chevron-right-O7pbc9od.js";import"./arrow-right-Bk5DjvYw.js";import"./preload-helper-CTOgD26E.js";import"./tab-dropdown-menu.component-D4XvsrF5.js";import"./dropdown-menu-CnvL8NrF.js";import"./menu.context-C44ILzCJ.js";import"./IconChevronRight-DOHUt8Iq.js";import"./index-sxHhWkTa.js";import"./tooltip-Qb8Axibs.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-D0t4zoW3.js";import"./tab-toolbar-container.component-t1YFkh5R.js";import"./ellipsis-vertical-B-to6KfV.js";function c({children:e,minWidth:y="0%",maxWidth:T="calc(100vw - 4rem)",skipAhead:A="0%"}){const m=N.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{animation:`${m} 6s infinite alternate ease-in-out`,animationDelay:`-${A}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[e,o.jsx("style",{children:`
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
