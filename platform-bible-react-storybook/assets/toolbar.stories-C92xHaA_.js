import{j as t}from"./jsx-runtime-BqcUmbcY.js";import{P as _}from"./platform-menubar.component-Df7ABWop.js";import{c as E}from"./utils-BPbySc-g.js";import{r as P}from"./iframe-BJc84vBk.js";import{T as q}from"./theme-provider.component-6w4czDbR.js";import{B as o}from"./button-6gVi3d_j.js";import{I as C}from"./input-C3oppNdn.js";import{S as m}from"./save-DwGp4h07.js";import{c as V}from"./createLucideIcon-DV1z-wTj.js";import{S as N}from"./settings-BTpAXGmw.js";import{S as L}from"./search-BFh0Hep_.js";import"./menubar-DIiiBkxY.js";import"./menu.context-DZTECjtw.js";import"./index-BnuTq2W6.js";import"./IconChevronRight-cUB1xTwE.js";import"./index-3xDR0dQ-.js";import"./index-bSBQzsLn.js";import"./index-C8zxGW7g.js";import"./index-BT9bKZ9s.js";import"./index-BJIHFdv_.js";import"./index-Bj4uL7f-.js";import"./index-ovriJwU6.js";import"./index-B0JYuSH2.js";import"./index-D69oJ1Oj.js";import"./index-CMPA3oSW.js";import"./index-BYU7SM9F.js";import"./index-BfKKHDs2.js";import"./index-Chd0-M9y.js";import"./index-BJBx0x9i.js";import"./index-38C2qh02.js";import"./index-kgBvMUbA.js";import"./createReactComponent-Bocd_W75.js";import"./IconCheck-Cz6WrsuB.js";import"./tooltip-UEexLGhm.js";import"./z-index-BATlIu8s.js";import"./index-B33t__zC.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-D0t4zoW3.js";import"./preload-helper-CTOgD26E.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M12 2v13",key:"1km8f5"}],["path",{d:"m16 6-4-4-4 4",key:"13yo43"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}]],l=V("share",O);function s({menuData:e,onOpenChange:y,onSelectMenuItem:I,className:B,id:T,children:z,appMenuAreaChildren:M,configAreaChildren:k,shouldUseAsAppDragArea:a,menubarVariant:W="default"}){const R=P.useRef(void 0);return t.jsx("div",{className:E("tw:border tw:px-4 tw:text-foreground",B),ref:R,style:{position:"relative"},id:T,children:t.jsxs("div",{className:"tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",style:a?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw:flex tw:grow tw:basis-0",children:t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:[M,e&&t.jsx(_,{menuData:e,onOpenChange:y,onSelectMenuItem:I,variant:W})]})}),t.jsx("div",{className:"tw:flex tw:items-center tw:gap-2 tw:px-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:z}),t.jsx("div",{className:"tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end",children:t.jsx("div",{className:"tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:k})})]})})}s.__docgenInfo={description:`A customizable toolbar component with a menubar, content area, and configure area.

This component is designed to be used in the window title bar of an electron application.

@param {ToolbarProps} props - The props for the component.`,methods:[],displayName:"Toolbar",props:{menubarVariant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const Bt={title:"Advanced/Toolbar",component:s,tags:["autodocs"],decorators:[e=>t.jsx(q,{children:t.jsx("div",{className:"tw:p-4",children:t.jsx(e,{})})})]},r={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(N,{className:"tw:h-4 tw:w-4"}),"Settings"]})]}),parameters:{docs:{description:{story:"A basic toolbar with common action buttons."}}}},i={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-2",children:[t.jsxs("div",{className:"tw:relative",children:[t.jsx(L,{className:"tw:absolute tw:left-2 tw:top-2.5 tw:h-4 tw:w-4 tw:text-muted-foreground"}),t.jsx(C,{type:"search",placeholder:"Search...",className:"tw:w-[200px] tw:pl-8"})]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(N,{className:"tw:h-4 tw:w-4"}),"Settings"]})]})}),parameters:{docs:{description:{story:"Toolbar with search functionality and action buttons."}}}},n={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]})}),parameters:{docs:{description:{story:"Toolbar with a menubar placeholder and action buttons."}}}},c={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(m,{className:"tw:h-4 tw:w-4"})}),t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(l,{className:"tw:h-4 tw:w-4"})})]}),parameters:{docs:{description:{story:"Minimal toolbar with just icon buttons."}}}};var d,w,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(p=(w=r.parameters)==null?void 0:w.docs)==null?void 0:p.source}}};var h,u,x;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(x=(u=i.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var v,S,f;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var g,b,j;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(j=(b=c.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const Tt=["Default","WithSearch","WithMenuBar","MinimalToolbar"];export{r as Default,c as MinimalToolbar,n as WithMenuBar,i as WithSearch,Tt as __namedExportsOrder,Bt as default};
