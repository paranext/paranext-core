import{r as d,j as t}from"./iframe-Bw6Q8mp3.js";import{P as H}from"./platform-menubar.component-Cgh7mWVj.js";import{c as L}from"./utils-BPbySc-g.js";import{u as V,a as A}from"./shrink-step.context-SaAMGTEM.js";import{u as K}from"./use-shrink-step.hook-CzcaTTrY.js";import{B as o}from"./button-DnoC34s_.js";import{I as X}from"./input-Ch6shkgE.js";import{S as m}from"./save-zqta9m0v.js";import{c as F}from"./createLucideIcon-B8Gj4A_G.js";import{S as y}from"./settings-jt16FiGl.js";import{S as G}from"./search-CaQOFWf8.js";import"./preload-helper-CTOgD26E.js";import"./menubar-DKb62k-u.js";import"./menu.context-BNLVoKy9.js";import"./index-BnuTq2W6.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-CurI-T1w.js";import"./index-0-Q_eK08.js";import"./index-TnbcRjPa.js";import"./index-DQVHuRJw.js";import"./index-ChopNoVk.js";import"./index-CxjTkcQ3.js";import"./index-h3ZjU0a0.js";import"./index-CFQ5XYIa.js";import"./index-DicXpkfy.js";import"./index-DkzI_T12.js";import"./index-BtkK6P2p.js";import"./index-gbfT1IFZ.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-C7549nbM.js";import"./index-R3Sg0M3r.js";import"./index-vtp0lq_W.js";import"./createReactComponent-DbNOOzm3.js";import"./IconCheck-CmZywjU6.js";import"./tooltip-D9JjOvBp.js";import"./portal-container.context-B_zU8wN9.js";import"./index-D4tdOzYn.js";import"./shortcut-keys.component-DVzrTrpq.js";import"./index-w_rW2Gsf.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./kbd-o8fRi-mh.js";import"./menu.util-B4Sg39gp.js";import"./menu-icon.component-MbjOmA3w.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M12 2v13",key:"1km8f5"}],["path",{d:"m16 6-4-4-4 4",key:"13yo43"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}]],l=F("share",J),Q=Object.freeze([950,800,700]);function s({menuData:e,onOpenChange:I,onSelectMenuItem:B,className:T,id:z,children:k,appMenuAreaChildren:M,configAreaChildren:R,shouldUseAsAppDragArea:a,menubarVariant:_="default"}){const[W,C]=d.useState(void 0),P=d.useCallback(q=>C(q??void 0),[]),O=K(W,Q),E=V()??O;return t.jsx(A.Provider,{value:E,children:t.jsx("div",{className:L("tw:border tw:px-4 tw:text-foreground",T),style:{position:"relative"},id:z,children:t.jsxs("div",{"data-testid":"toolbar-content-row",className:"tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",ref:P,style:a?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw:flex tw:shrink-0 tw:grow tw:basis-0",children:t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:[M,e&&t.jsx(H,{menuData:e,onOpenChange:I,onSelectMenuItem:B,variant:_})]})}),t.jsx("div",{"data-testid":"toolbar-content-area",className:"tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:overflow-clip tw:px-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:k}),t.jsx("div",{className:"tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end",children:t.jsx("div",{className:"tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:R})})]})})})}s.__docgenInfo={description:`A customizable toolbar component with a menubar, content area, and configure area.

This component is designed to be used in the window title bar of an electron application.

Two \`data-testid\` hooks are relied on by end-to-end tests outside this package, so they are part
of this component's contract: \`toolbar-content-row\` (the row that clips when contents do not fit)
and \`toolbar-content-area\` (the area receiving \`children\`). Renaming either is a breaking
change.

@param {ToolbarProps} props - The props for the component.`,methods:[],displayName:"Toolbar",props:{menubarVariant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const Lt={title:"Advanced/Toolbar",component:s,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"tw:p-4",children:t.jsx(e,{})})]},r={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(y,{className:"tw:h-4 tw:w-4"}),"Settings"]})]}),parameters:{docs:{description:{story:"A basic toolbar with common action buttons."}}}},n={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-2",children:[t.jsxs("div",{className:"tw:relative",children:[t.jsx(G,{className:"tw:absolute tw:left-2 tw:top-2.5 tw:h-4 tw:w-4 tw:text-muted-foreground"}),t.jsx(X,{type:"search",placeholder:"Search...",className:"tw:w-[200px] tw:pl-8"})]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(y,{className:"tw:h-4 tw:w-4"}),"Settings"]})]})}),parameters:{docs:{description:{story:"Toolbar with search functionality and action buttons."}}}},i={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]})}),parameters:{docs:{description:{story:"Toolbar with a menubar placeholder and action buttons."}}}},c={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(m,{className:"tw:h-4 tw:w-4"})}),t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(l,{className:"tw:h-4 tw:w-4"})})]}),parameters:{docs:{description:{story:"Minimal toolbar with just icon buttons."}}}};var p,w,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw:h-4 tw:w-4" />
        Save
      </Button>
      <Button variant="ghost" size="sm">
        <Share className="tw:h-4 tw:w-4" />
        Share
      </Button>
      <Button variant="ghost" size="sm">
        <Settings className="tw:h-4 tw:w-4" />
        Settings
      </Button>
    </Toolbar>,
  parameters: {
    docs: {
      description: {
        story: 'A basic toolbar with common action buttons.'
      }
    }
  }
}`,...(h=(w=r.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var u,S,v;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <div className="tw:flex tw:items-center tw:space-x-2">
        <div className="tw:relative">
          <Search className="tw:absolute tw:left-2 tw:top-2.5 tw:h-4 tw:w-4 tw:text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="tw:w-[200px] tw:pl-8" />
        </div>
        <Button variant="ghost" size="sm">
          <Save className="tw:h-4 tw:w-4" />
          Save
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="tw:h-4 tw:w-4" />
          Share
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="tw:h-4 tw:w-4" />
          Settings
        </Button>
      </div>
    </Toolbar>,
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with search functionality and action buttons.'
      }
    }
  }
}`,...(v=(S=n.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var x,b,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw:h-4 tw:w-4" />
        Save
      </Button>
    </Toolbar>,
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with a menubar placeholder and action buttons.'
      }
    }
  }
}`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var g,j,N;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw:h-4 tw:w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Share className="tw:h-4 tw:w-4" />
      </Button>
    </Toolbar>,
  parameters: {
    docs: {
      description: {
        story: 'Minimal toolbar with just icon buttons.'
      }
    }
  }
}`,...(N=(j=c.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};const Vt=["Default","WithSearch","WithMenuBar","MinimalToolbar"];export{r as Default,c as MinimalToolbar,i as WithMenuBar,n as WithSearch,Vt as __namedExportsOrder,Lt as default};
