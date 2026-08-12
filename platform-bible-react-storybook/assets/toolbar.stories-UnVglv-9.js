import{r as _,j as t}from"./iframe-B0QPoExt.js";import{P as E}from"./platform-menubar.component-OUNH3O7n.js";import{c as q}from"./utils-BPbySc-g.js";import{B as s}from"./button-BZsSMpo1.js";import{I as C}from"./input-C--i0uuX.js";import{S as m}from"./save-BU4Az9dy.js";import{c as P}from"./createLucideIcon-C5tbx1nB.js";import{S as N}from"./settings-DDgCl24m.js";import{S as V}from"./search-B1ZxqyWT.js";import"./preload-helper-CTOgD26E.js";import"./menubar-CXkU34hP.js";import"./menu.context-BV0etJPY.js";import"./index-BnuTq2W6.js";import"./IconChevronRight-CKyzNuV3.js";import"./index-Cffw8u4b.js";import"./index-DUnTc8LI.js";import"./index-Qb1f7yK5.js";import"./index-7feSoujl.js";import"./index-uzc-mgJu.js";import"./index-ChBZ5lDH.js";import"./index-BcFtINXg.js";import"./index-DHmjPMt4.js";import"./index-Dpi5B48O.js";import"./index-CiK5G8IB.js";import"./index-CVUfQ6V2.js";import"./index-CYGDd-mI.js";import"./index-ChkVlXuY.js";import"./index-DnxaYsWV.js";import"./createReactComponent-rJoA7p0W.js";import"./IconCheck-0X0cEIGQ.js";import"./tooltip-VHxf8BnT.js";import"./z-index-CoNkaVR8.js";import"./index-2UHnUVBX.js";import"./menu.util-Dxh7JGT4.js";import"./menu-icon.component-CXOEQvL9.js";/**
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
