import{j as t}from"./jsx-runtime-DdMd9hEz.js";import{P as _}from"./platform-menubar.component-BMyMBdNd.js";import{c as E}from"./shadcn-ui.util-DMJ19wEV.js";import{r as P}from"./iframe-CP9w8tG2.js";import{T as q}from"./theme-provider.component-BNMWEsSq.js";import{B as o}from"./button-CxdJtNv-.js";import{I as C}from"./input-XgiqY3-i.js";import{S as m}from"./save-6IoQjzW6.js";import{c as V}from"./createLucideIcon-BIs2lEw6.js";import{S as N}from"./settings-B07ZVb0f.js";import{S as L}from"./search-SOWzjx_f.js";import"./menubar-Lr09FtMo.js";import"./index-DKIkZyjQ.js";import"./index-BPbCuWFR.js";import"./index-DTAXz6r9.js";import"./index-C7iw6H11.js";import"./index-BHtFMn9j.js";import"./index-DmWLjvBA.js";import"./index-CI-w-sM5.js";import"./index-tvnb6adJ.js";import"./index-Df0-lD-y.js";import"./index-wyvJkCZf.js";import"./index-DhFSPgnG.js";import"./index-CPSYZMgP.js";import"./index-dC6bSqj8.js";import"./floating-ui.react-dom-BkKl4Thl.js";import"./index-aksreBNd.js";import"./index-gGKWoAED.js";import"./index-DoNwQboG.js";import"./index-OXvW7xgX.js";import"./index-DVSn98zC.js";import"./index-BLN0HQOT.js";import"./index-B0nEOtAF.js";import"./index-CAOtyErT.js";import"./index-X-ZBUBVA.js";import"./chevron-right-BL4DK7WZ.js";import"./check-D4bL0kiR.js";import"./circle-BGbv6LtV.js";import"./tooltip-E7jnIlPA.js";import"./index-Bb27ygNT.js";import"./z-index-B4JyHfu5.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-C-s1pDZj.js";import"./preload-helper-CTOgD26E.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]],l=V("Share",O);function s({menuData:e,onOpenChange:y,onSelectMenuItem:I,className:B,id:T,children:z,appMenuAreaChildren:M,configAreaChildren:W,shouldUseAsAppDragArea:a,menubarVariant:k="default"}){const R=P.useRef(void 0);return t.jsx("div",{className:E("tw-border tw-px-4 tw-text-foreground",B),ref:R,style:{position:"relative"},id:T,children:t.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:a?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:t.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:[M,e&&t.jsx(_,{menuData:e,onOpenChange:y,onSelectMenuItem:I,variant:k})]})}),t.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:z}),t.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:t.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:W})})]})})}s.__docgenInfo={description:`A customizable toolbar component with a menubar, content area, and configure area.

This component is designed to be used in the window title bar of an electron application.

@param {ToolbarProps} props - The props for the component.`,methods:[],displayName:"Toolbar",props:{menubarVariant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const kt={title:"Advanced/Toolbar",component:s,tags:["autodocs"],decorators:[e=>t.jsx(q,{children:t.jsx("div",{className:"tw-p-4",children:t.jsx(e,{})})})]},r={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw-h-4 tw-w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw-h-4 tw-w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(N,{className:"tw-h-4 tw-w-4"}),"Settings"]})]}),parameters:{docs:{description:{story:"A basic toolbar with common action buttons."}}}},i={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[t.jsxs("div",{className:"tw-relative",children:[t.jsx(L,{className:"tw-absolute tw-left-2 tw-top-2.5 tw-h-4 tw-w-4 tw-text-muted-foreground"}),t.jsx(C,{type:"search",placeholder:"Search...",className:"tw-w-[200px] tw-pl-8"})]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw-h-4 tw-w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw-h-4 tw-w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(N,{className:"tw-h-4 tw-w-4"}),"Settings"]})]})}),parameters:{docs:{description:{story:"Toolbar with search functionality and action buttons."}}}},n={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw-h-4 tw-w-4"}),"Save"]})}),parameters:{docs:{description:{story:"Toolbar with a menubar placeholder and action buttons."}}}},c={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(m,{className:"tw-h-4 tw-w-4"})}),t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(l,{className:"tw-h-4 tw-w-4"})})]}),parameters:{docs:{description:{story:"Minimal toolbar with just icon buttons."}}}};var d,p,w;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(w=(p=r.parameters)==null?void 0:p.docs)==null?void 0:w.source}}};var h,u,x;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(x=(u=i.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var S,v,f;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(f=(v=n.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var g,b,j;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(j=(b=c.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const Rt=["Default","WithSearch","WithMenuBar","MinimalToolbar"];export{r as Default,c as MinimalToolbar,n as WithMenuBar,i as WithSearch,Rt as __namedExportsOrder,kt as default};
