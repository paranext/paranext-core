import{r as P,j as e}from"./iframe-BTu3NEbE.js";import{i as g,l as s}from"./index-aWm5KcgP.js";import{S as r}from"./scroll-group-selector.component-CVtUEN7A.js";import{B as b}from"./book-chapter-control.component-B86Ybnw_.js";import{T as i}from"./tab-toolbar.component-UkE6QFo_.js";import"./preload-helper-CTOgD26E.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./select-wZLaGCc6.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./IconSelector-BSHZ2v_c.js";import"./createReactComponent-BzxIv66i.js";import"./IconCheck-Dy5FTvUh.js";import"./index-BaQP4hhM.js";import"./index-C0zw--7-.js";import"./index-CrY799oy.js";import"./index-DZ8R5t1G.js";import"./index-Ci9gsV1Q.js";import"./index-BMDd7-4L.js";import"./index-CsjlNjJT.js";import"./index-CIneISkZ.js";import"./index-DxAfpOtl.js";import"./index-D2igzrLf.js";import"./index-CCpIaWdX.js";import"./index-vS1gu61i.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DSbMAiHl.js";import"./index-B70mcBJj.js";import"./index-ieZcBM-m.js";import"./book-item.utils-CL9eA6TQ.js";import"./command-CxqoSWfB.js";import"./index-D1oQF5o5.js";import"./index-CR-QhsP0.js";import"./dialog-D37dkCtC.js";import"./button-BZ9iFsDs.js";import"./index-BnuTq2W6.js";import"./input-group-BTf5Aonw.js";import"./input-DHiiq4LN.js";import"./focus.util-DRSEP984.js";import"./check-CxMLuos-.js";import"./createLucideIcon-BwDPgGt0.js";import"./button-group-B3aSSmNQ.js";import"./separator-D3F76fDa.js";import"./popover-B0N0Q-gg.js";import"./portal-container.context-DpzVK24z.js";import"./tooltip-DmImvDuz.js";import"./localization.util-C4JImkK1.js";import"./shrink-step.context-CndniR81.js";import"./toolbar-compound-label.component-DVKfEVMs.js";import"./use-truncation-tooltip.hook-DYfOoTPs.js";import"./use-interaction-modality.hook-BzZyWPTZ.js";import"./recent-searches.component-B3vV-jq5.js";import"./dropdown-menu-CR1F0yBi.js";import"./menu.context-C2dpBWOp.js";import"./IconChevronRight-gIqy5q6K.js";import"./index-BsVCaXYh.js";import"./experimental-D3rB4PXq.js";import"./chevron-up-DVz-okQr.js";import"./chevron-down-B4eMT-9R.js";import"./arrow-left-BSMXejER.js";import"./arrow-right-B2GM3Oyo.js";import"./tab-dropdown-menu.component-YIY5GPpk.js";import"./shortcut-keys.component-Bx-2zTZI.js";import"./kbd-hVo83Omr.js";import"./menu.util-CFBFJUnT.js";import"./lucide-icon.component-XnXbFiRK.js";import"./circle-check-big-CRKGzEen.js";import"./message-square-BckNmAht.js";import"./search-g1FgGcdS.js";import"./book-open-DkBTecpm.js";import"./square-x-PejAIqUM.js";import"./file-text-Dil2XTZq.js";import"./eye-5uXJgIdK.js";import"./pencil-TEaIn596.js";import"./external-link-B52VesKx.js";import"./circle-question-mark-pD4n3VGE.js";import"./settings-sPeQXORz.js";import"./house-CTru7v6y.js";import"./menu-icon.component-BfN-vjpl.js";import"./tab-toolbar-container.component-CTvaMZgj.js";import"./use-shrink-step.hook-FnYISeQP.js";import"./ellipsis-vertical-BkASeLQO.js";function h({children:o,minWidth:a="0%",maxWidth:R="calc(100vw - 4rem)",skipAhead:B="0%"}){const u=P.useMemo(()=>`widthAnimation-${Math.random().toString(36).substr(2,9)}`,[]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{animation:`${u} 6s infinite alternate ease-in-out`,animationDelay:`-${B}`,border:"2px solid #ccc",borderRadius:"16px",marginBlock:"1rem",background:"#fdfdfd",boxShadow:"0 4px 8px rgba(0,0,0,0.08)",overflow:"hidden",padding:".5rem",maxWidth:"100%"},children:[o,e.jsx("style",{children:`
            @keyframes ${u} {
              0% {
                width: ${a};
              }
              100% {
                width: ${R};
              }
            }
          `})]}),e.jsx("p",{style:{paddingInlineStart:"1rem",fontSize:12,color:"#888"},children:"Container width is animated"})]})}h.__docgenInfo={description:"",methods:[],displayName:"AnimatedContainer",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'calc(100vw - 4rem)'",computed:!1}},skipAhead:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'0%'",computed:!1}}}};const t=o=>{console.log("New Scroll Group Id: ",o)},w=[{book:"GEN",chapterNum:1,verseNum:1},{book:"PSA",chapterNum:23,verseNum:1},{book:"MAT",chapterNum:5,verseNum:3}],f=o=>{console.log("Adding recent search: ",o)},M={columns:{tools:{label:"Tools",order:1},info:{label:"Info",order:2},project:{label:"Project",order:3}},groups:{general:{column:"info",order:1},inventory:{column:"tools",order:1},checks:{column:"tools",order:2},projectTop:{column:"project",order:1,isExtensible:!0},manageBooks:{column:"project",order:2},deleteProject:{column:"project",order:3},projectDetails:{column:"project",order:4,isExtensible:!0}},items:[{label:"Inventory: Characters...",group:"inventory",order:1,command:"openCharactersInventory",localizeNotes:""},{label:"Inventory: Repeated Words...",group:"inventory",order:2,command:"openRepeatedWordsInventory",localizeNotes:""},{label:"Publisher Info",group:"general",order:1,command:"showPublisherInfo",localizeNotes:""},{label:"Assignments and Progress",group:"projectTop",order:2,command:"assignments",localizeNotes:""},{label:"Open Project Settings",group:"projectTop",order:3,command:"openSettings",localizeNotes:""}]},D={columns:{options:{label:"Options",order:1},viewOptions:{label:"View Options",order:2}},groups:{layout:{column:"options",order:1},colors:{column:"viewOptions",order:2}},items:[{label:"Background Color",group:"colors",order:1,command:"changeBackgroundColor",localizeNotes:""},{label:"Text Color",group:"colors",order:2,command:"changeTextColor",localizeNotes:""},{label:"Thick Borders",group:"layout",order:1,command:"showThickBorders",localizeNotes:""}]},n={[s("undefined")]:"Ø",[s(0)]:"A",[s(1)]:"B",[s(2)]:"C",[s(3)]:"D",[s(4)]:"E"},bo={title:"Advanced/TabToolbar",component:i,tags:["autodocs"],args:{onSelectProjectMenuItem:o=>console.log("Project Menu Run command: ",o),onSelectViewInfoMenuItem:o=>console.log("View Info Run command: ",o),projectMenuData:M,tabViewMenuData:D,startAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(b,{scrRef:g,handleSubmit:()=>{},recentSearches:w,onAddRecentSearch:f}),e.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),centerAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),e.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),e.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"})]}),endAreaChildren:e.jsxs(e.Fragment,{children:[e.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),e.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),e.jsx(r,{availableScrollGroupIds:[0,1,2,3,4],localizedStrings:n,scrollGroupId:0,onChangeScrollGroupId:t,size:"sm"}),e.jsx(b,{scrRef:g,handleSubmit:()=>{},recentSearches:w,onAddRecentSearch:f})]})}},l={},d={render:o=>e.jsxs(e.Fragment,{children:[e.jsx(h,{minWidth:"0%",maxWidth:"30vw",children:e.jsx(i,{...o})}),e.jsx(h,{minWidth:"200px",maxWidth:"60vw",skipAhead:"2s",children:e.jsx(i,{...o})}),e.jsx(h,{minWidth:"300px",skipAhead:"4s",children:e.jsx(i,{...o})})]}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior."}}}},c={args:{className:"tw:bg-red-100 tw:border-red-400"},parameters:{docs:{description:{story:"TabToolbar with custom background and border color using the className prop."}}}},m={render:o=>e.jsx("div",{className:"tw:flex tw:flex-col tw:gap-4",children:[560,470,380,300].map(a=>e.jsxs("div",{children:[e.jsxs("div",{className:"tw:pb-1 tw:text-xs tw:text-muted-foreground",children:[a,"px"]}),e.jsx("div",{style:{width:a},className:"tw:border",children:e.jsx(i,{...o})})]},a))}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"The same toolbar at four pinned container widths. Watch the reference control step down: `Genesis 1:1` → `GEN 1:1` → `GEN 1:…` → `GEN`. No item disappears at any width — the end zone is rigid, so shrinking is taken out of the start and center zones instead. Hover a shortened label to see the full text; the tooltip only opens when something is actually clipped."}}}},p={args:{startAreaChildren:e.jsx("span",{className:"tw:whitespace-nowrap",children:"An unconverted child with a long label and no shorter form"}),centerAreaChildren:void 0},render:o=>e.jsx("div",{style:{width:320},className:"tw:border",children:e.jsx(i,{...o})}),parameters:{controls:{hideNoControlsWarning:!0},docs:{description:{story:"A start-zone child that cannot shrink, because it has no `tw:min-w-0` of its own and no shorter label form. The zone's `tw:overflow-clip` keeps it inside the toolbar rather than letting it paint over the end zone — the retained backstop for consumers whose items have not been given a shrink ladder."}}}};var x,v,S;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:"{}",...(S=(v=l.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var N,j,y;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(y=(j=d.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var C,T,k;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(k=(T=c.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var I,A,z;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <div className="tw:flex tw:flex-col tw:gap-4">
      {[560, 470, 380, 300].map(width => <div key={width}>
          <div className="tw:pb-1 tw:text-xs tw:text-muted-foreground">{width}px</div>
          <div style={{
        width
      }} className="tw:border">
            <TabToolbar {...args} />
          </div>
        </div>)}
    </div>,
  parameters: {
    controls: {
      hideNoControlsWarning: true
    },
    docs: {
      description: {
        story: 'The same toolbar at four pinned container widths. Watch the reference control step down: \`Genesis 1:1\` → \`GEN 1:1\` → \`GEN 1:…\` → \`GEN\`. No item disappears at any width — the end zone is rigid, so shrinking is taken out of the start and center zones instead. Hover a shortened label to see the full text; the tooltip only opens when something is actually clipped.'
      }
    }
  }
}`,...(z=(A=m.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var G,W,E;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    startAreaChildren: <span className="tw:whitespace-nowrap">
        An unconverted child with a long label and no shorter form
      </span>,
    centerAreaChildren: undefined
  },
  render: args => <div style={{
    width: 320
  }} className="tw:border">
      <TabToolbar {...args} />
    </div>,
  parameters: {
    controls: {
      hideNoControlsWarning: true
    },
    docs: {
      description: {
        story: "A start-zone child that cannot shrink, because it has no \`tw:min-w-0\` of its own and no shorter label form. The zone's \`tw:overflow-clip\` keeps it inside the toolbar rather than letting it paint over the end zone — the retained backstop for consumers whose items have not been given a shrink ladder."
      }
    }
  }
}`,...(E=(W=p.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};const wo=["Default","AnimatedWidth","WithCustomClassName","ShrinkSteps","UnconvertedChild"];export{d as AnimatedWidth,l as Default,m as ShrinkSteps,p as UnconvertedChild,c as WithCustomClassName,wo as __namedExportsOrder,bo as default};
