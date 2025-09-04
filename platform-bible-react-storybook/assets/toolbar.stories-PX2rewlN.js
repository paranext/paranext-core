import{j as t}from"./jsx-runtime-Dp1lb1Uf.js";import{P as E}from"./platform-menubar.component-Brg91e62.js";import{c as P}from"./shadcn-ui.util-DMJ19wEV.js";import{r as V}from"./iframe-bGuH-Abg.js";import{T as q}from"./theme-provider.component-1wbz6BHc.js";import{B as o}from"./button-C2duuinP.js";import{I as C}from"./input-D54mV081.js";import{c as N}from"./createLucideIcon-DYoKyj6y.js";import{S as y}from"./settings-DCjssh5y.js";import{S as H}from"./search-BEhapZh1.js";import"./menubar-DlYLM03q.js";import"./menu.context-DN7za-El.js";import"./index-B8OM6TYd.js";import"./index-DDdVzcAn.js";import"./index-CkLtAkfY.js";import"./index-DzkNuuhM.js";import"./index-z4Q_vUym.js";import"./index-1rRh4qjs.js";import"./index-Dutw9uIA.js";import"./index-DL8D4WRY.js";import"./index-Cum9p26y.js";import"./index-BkoBbs9Y.js";import"./index-BhiuDxmi.js";import"./index-9OUeuJVn.js";import"./index-Da_NMWbH.js";import"./floating-ui.react-dom-GvR0HUTI.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-DNIXYOBq.js";import"./index-Py-aa8T1.js";import"./index-BWEqzBJi.js";import"./index-CxVRFFEA.js";import"./index-Cp9fuXBs.js";import"./index-D1k6xfzT.js";import"./index-BPbCuWFR.js";import"./chevron-right-CbHt3Dgu.js";import"./check-BP1taHaR.js";import"./circle-CKBkbHBO.js";import"./tooltip-B7xwLgyn.js";import"./index-BQYbS46L.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-oq2mpn4d.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],m=N("Save",L);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]],l=N("Share",O);function s({menuData:e,onOpenChange:I,onSelectMenuItem:B,className:T,id:z,children:M,appMenuAreaChildren:k,configAreaChildren:W,shouldUseAsAppDragArea:a,menubarVariant:_="default"}){const R=V.useRef(void 0);return t.jsx("div",{className:P("tw-border tw-px-4 tw-text-foreground",T),ref:R,style:{position:"relative"},id:z,children:t.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:a?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:t.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:[k,e&&t.jsx(E,{menuData:e,onOpenChange:I,onSelectMenuItem:B,variant:_})]})}),t.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:M}),t.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:t.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:W})})]})})}s.__docgenInfo={description:`A customizable toolbar component with a menubar, content area, and configure area.

This component is designed to be used in the window title bar of an electron application.

@param {ToolbarProps} props - The props for the component.`,methods:[],displayName:"Toolbar",props:{menubarVariant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const Mt={title:"Advanced/Toolbar",component:s,tags:["autodocs"],decorators:[e=>t.jsx(q,{children:t.jsx("div",{className:"tw-p-4",children:t.jsx(e,{})})})]},r={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw-h-4 tw-w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw-h-4 tw-w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(y,{className:"tw-h-4 tw-w-4"}),"Settings"]})]}),parameters:{docs:{description:{story:"A basic toolbar with common action buttons."}}}},i={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[t.jsxs("div",{className:"tw-relative",children:[t.jsx(H,{className:"tw-absolute tw-left-2 tw-top-2.5 tw-h-4 tw-w-4 tw-text-muted-foreground"}),t.jsx(C,{type:"search",placeholder:"Search...",className:"tw-w-[200px] tw-pl-8"})]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw-h-4 tw-w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw-h-4 tw-w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(y,{className:"tw-h-4 tw-w-4"}),"Settings"]})]})}),parameters:{docs:{description:{story:"Toolbar with search functionality and action buttons."}}}},n={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw-h-4 tw-w-4"}),"Save"]})}),parameters:{docs:{description:{story:"Toolbar with a menubar placeholder and action buttons."}}}},c={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(m,{className:"tw-h-4 tw-w-4"})}),t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(l,{className:"tw-h-4 tw-w-4"})})]}),parameters:{docs:{description:{story:"Minimal toolbar with just icon buttons."}}}};var d,p,w;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw-h-4 tw-w-4" />
        Save
      </Button>
      <Button variant="ghost" size="sm">
        <Share className="tw-h-4 tw-w-4" />
        Share
      </Button>
      <Button variant="ghost" size="sm">
        <Settings className="tw-h-4 tw-w-4" />
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
}`,...(w=(p=r.parameters)==null?void 0:p.docs)==null?void 0:w.source}}};var h,u,v;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <div className="tw-flex tw-items-center tw-space-x-2">
        <div className="tw-relative">
          <Search className="tw-absolute tw-left-2 tw-top-2.5 tw-h-4 tw-w-4 tw-text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="tw-w-[200px] tw-pl-8" />
        </div>
        <Button variant="ghost" size="sm">
          <Save className="tw-h-4 tw-w-4" />
          Save
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="tw-h-4 tw-w-4" />
          Share
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="tw-h-4 tw-w-4" />
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
}`,...(v=(u=i.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var x,S,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw-h-4 tw-w-4" />
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
}`,...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var g,b,j;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Toolbar onSelectMenuItem={menuItemId => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw-h-4 tw-w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Share className="tw-h-4 tw-w-4" />
      </Button>
    </Toolbar>,
  parameters: {
    docs: {
      description: {
        story: 'Minimal toolbar with just icon buttons.'
      }
    }
  }
}`,...(j=(b=c.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const kt=["Default","WithSearch","WithMenuBar","MinimalToolbar"];export{r as Default,c as MinimalToolbar,n as WithMenuBar,i as WithSearch,kt as __namedExportsOrder,Mt as default};
