import{r as _,j as t}from"./iframe-98cSUu9c.js";import{P as E}from"./platform-menubar.component-BTSL4iUu.js";import{c as q}from"./utils-BPbySc-g.js";import{B as s}from"./button-DpB0n7EC.js";import{I as C}from"./input-CZaZ1CrR.js";import{S as m}from"./save-CMP3mhGq.js";import{c as P}from"./createLucideIcon-DVmJNh1p.js";import{S as N}from"./settings-D6fooAkM.js";import{S as V}from"./search-BLtKiHM7.js";import"./preload-helper-CTOgD26E.js";import"./menubar-CihRsIOC.js";import"./menu.context-dxl6X1PF.js";import"./index-BnuTq2W6.js";import"./IconChevronRight-BkBWJFAf.js";import"./index-DrMPsYHH.js";import"./index-DZGb75Mo.js";import"./index-MsRogQag.js";import"./index-ClT2oVr8.js";import"./index-DJ2JoP6m.js";import"./index-BR1gMkug.js";import"./index-CYqoEYJG.js";import"./index-DADO2Svg.js";import"./index-CoA807i-.js";import"./index-DauiKX_X.js";import"./index-C_2RJqVm.js";import"./index-KeuFHCio.js";import"./index-C5_U7A7s.js";import"./index-C7N6AQnZ.js";import"./createReactComponent-lsnGyuxL.js";import"./IconCheck-CfAUR7bJ.js";import"./tooltip-DqZSPwNu.js";import"./z-index-CoNkaVR8.js";import"./index-BocGmCFO.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-Xdx9MpUG.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M12 2v13",key:"1km8f5"}],["path",{d:"m16 6-4-4-4 4",key:"13yo43"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}]],l=P("share",L);function o({menuData:e,onOpenChange:y,onSelectMenuItem:I,className:B,id:T,children:z,appMenuAreaChildren:M,configAreaChildren:k,shouldUseAsAppDragArea:a,menubarVariant:W="default"}){const R=_.useRef(void 0);return t.jsx("div",{className:q("tw:border tw:px-4 tw:text-foreground",B),ref:R,style:{position:"relative"},id:T,children:t.jsxs("div",{className:"tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",style:a?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw:flex tw:grow tw:basis-0",children:t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:[M,e&&t.jsx(E,{menuData:e,onOpenChange:y,onSelectMenuItem:I,variant:W})]})}),t.jsx("div",{className:"tw:flex tw:items-center tw:gap-2 tw:px-2",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:z}),t.jsx("div",{className:"tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end",children:t.jsx("div",{className:"tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",style:a?{WebkitAppRegion:"no-drag"}:void 0,children:k})})]})})}o.__docgenInfo={description:`A customizable toolbar component with a menubar, content area, and configure area.

This component is designed to be used in the window title bar of an electron application.

@param {ToolbarProps} props - The props for the component.`,methods:[],displayName:"Toolbar",props:{menubarVariant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const bt={title:"Advanced/Toolbar",component:o,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"tw:p-4",children:t.jsx(e,{})})]},r={render:()=>t.jsxs(o,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsxs(s,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(s,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(s,{variant:"ghost",size:"sm",children:[t.jsx(N,{className:"tw:h-4 tw:w-4"}),"Settings"]})]}),parameters:{docs:{description:{story:"A basic toolbar with common action buttons."}}}},n={render:()=>t.jsx(o,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-2",children:[t.jsxs("div",{className:"tw:relative",children:[t.jsx(V,{className:"tw:absolute tw:left-2 tw:top-2.5 tw:h-4 tw:w-4 tw:text-muted-foreground"}),t.jsx(C,{type:"search",placeholder:"Search...",className:"tw:w-[200px] tw:pl-8"})]}),t.jsxs(s,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(s,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(s,{variant:"ghost",size:"sm",children:[t.jsx(N,{className:"tw:h-4 tw:w-4"}),"Settings"]})]})}),parameters:{docs:{description:{story:"Toolbar with search functionality and action buttons."}}}},i={render:()=>t.jsx(o,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs(s,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]})}),parameters:{docs:{description:{story:"Toolbar with a menubar placeholder and action buttons."}}}},c={render:()=>t.jsxs(o,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsx(s,{variant:"ghost",size:"sm",children:t.jsx(m,{className:"tw:h-4 tw:w-4"})}),t.jsx(s,{variant:"ghost",size:"sm",children:t.jsx(l,{className:"tw:h-4 tw:w-4"})})]}),parameters:{docs:{description:{story:"Minimal toolbar with just icon buttons."}}}};var d,w,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(p=(w=r.parameters)==null?void 0:w.docs)==null?void 0:p.source}}};var h,u,x;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var v,S,f;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(f=(S=i.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var g,b,j;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(j=(b=c.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const jt=["Default","WithSearch","WithMenuBar","MinimalToolbar"];export{r as Default,c as MinimalToolbar,i as WithMenuBar,n as WithSearch,jt as __namedExportsOrder,bt as default};
