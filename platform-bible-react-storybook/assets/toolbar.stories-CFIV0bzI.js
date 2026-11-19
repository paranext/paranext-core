import{r as d,j as t}from"./iframe-Cr8HTdsH.js";import{P as H}from"./platform-menubar.component-DHX19D4e.js";import{c as L}from"./utils-BPbySc-g.js";import{u as V,a as A}from"./shrink-step.context-BDxCZVR5.js";import{u as K}from"./use-shrink-step.hook-Cr2BksRy.js";import{B as o}from"./button-CoKI2UfP.js";import{I as X}from"./input-CxBjBTjq.js";import{S as m}from"./save-Bc0D5Iem.js";import{c as F}from"./createLucideIcon-Ae-UqXaE.js";import{S as y}from"./settings-DNgoE98H.js";import{S as G}from"./search-CXrayH5G.js";import"./preload-helper-CTOgD26E.js";import"./menubar-DTkGZ2tj.js";import"./menu.context-Cqh_8LyW.js";import"./index-BnuTq2W6.js";import"./use-dismiss-on-window-blur.hook-D9vCBQ8S.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-BCBl8pYi.js";import"./index-fkvXiiEa.js";import"./index-CUhPVCzu.js";import"./index-Bs3XhVnz.js";import"./index-DwaTSDse.js";import"./index-1raoa36z.js";import"./index-XXCEzZye.js";import"./index-BZgM8IT7.js";import"./index-DDLYxblb.js";import"./index-ZEmyJPYJ.js";import"./index-DyasdurX.js";import"./index-ZakB7RFd.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-7hH-1G1R.js";import"./index-BPRnwLP8.js";import"./index-D5jALSaB.js";import"./createReactComponent-k6RMXHt1.js";import"./IconCheck-pv_e0GKu.js";import"./tooltip-B-FUx2q2.js";import"./portal-container.context-Bvd3UPbD.js";import"./index-CVn3m5Da.js";import"./shortcut-keys.component-CEa0dsB-.js";import"./index-CpyFeyxh.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./kbd-Cq1xiZXw.js";import"./menu.util-BLExm9JV.js";import"./lucide-icon.component-XcrWXooD.js";import"./circle-check-big-MJxad1Jk.js";import"./message-square-DJIPJG5O.js";import"./book-open-CjrKF1y3.js";import"./square-x-BqtYQ0bL.js";import"./file-text-CM3T8JE8.js";import"./eye-XF4hHwPS.js";import"./pencil-C1AhpKVt.js";import"./external-link-BBdt2jMg.js";import"./circle-question-mark-BAcWJRso.js";import"./house-Btue02ve.js";import"./menu-icon.component-hXtJMgSC.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M12 2v13",key:"1km8f5"}],["path",{d:"m16 6-4-4-4 4",key:"13yo43"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}]],l=F("share",J),Q=Object.freeze([950,800,700]);function s({menuData:e,onOpenChange:I,onSelectMenuItem:B,className:T,id:z,children:k,appMenuAreaChildren:M,configAreaChildren:R,shouldUseAsAppDragArea:r,menubarVariant:_="default"}){const[W,C]=d.useState(void 0),P=d.useCallback(q=>C(q??void 0),[]),O=K(W,Q),E=V()??O;return t.jsx(A.Provider,{value:E,children:t.jsx("div",{className:L("tw:border tw:px-4 tw:text-foreground",T),style:{position:"relative"},id:z,children:t.jsxs("div",{"data-testid":"toolbar-content-row",className:"tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",ref:P,style:r?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw:flex tw:shrink-0 tw:grow tw:basis-0",children:t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",style:r?{WebkitAppRegion:"no-drag"}:void 0,children:[M,e&&t.jsx(H,{menuData:e,onOpenChange:I,onSelectMenuItem:B,variant:_})]})}),t.jsx("div",{"data-testid":"toolbar-content-area",className:"tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:overflow-clip tw:px-2",style:r?{WebkitAppRegion:"no-drag"}:void 0,children:k}),t.jsx("div",{className:"tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end",children:t.jsx("div",{className:"tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",style:r?{WebkitAppRegion:"no-drag"}:void 0,children:R})})]})})})}s.__docgenInfo={description:`A customizable toolbar component with a menubar, content area, and configure area.

This component is designed to be used in the window title bar of an electron application.

Two \`data-testid\` hooks are relied on by end-to-end tests outside this package, so they are part
of this component's contract: \`toolbar-content-row\` (the row that clips when contents do not fit)
and \`toolbar-content-area\` (the area receiving \`children\`). Renaming either is a breaking
change.

@param {ToolbarProps} props - The props for the component.`,methods:[],displayName:"Toolbar",props:{menubarVariant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const Dt={title:"Advanced/Toolbar",component:s,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"tw:p-4",children:t.jsx(e,{})})]},a={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(y,{className:"tw:h-4 tw:w-4"}),"Settings"]})]}),parameters:{docs:{description:{story:"A basic toolbar with common action buttons."}}}},n={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-2",children:[t.jsxs("div",{className:"tw:relative",children:[t.jsx(G,{className:"tw:absolute tw:left-2 tw:top-2.5 tw:h-4 tw:w-4 tw:text-muted-foreground"}),t.jsx(X,{type:"search",placeholder:"Search...",className:"tw:w-[200px] tw:pl-8"})]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(l,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(y,{className:"tw:h-4 tw:w-4"}),"Settings"]})]})}),parameters:{docs:{description:{story:"Toolbar with search functionality and action buttons."}}}},i={render:()=>t.jsx(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(m,{className:"tw:h-4 tw:w-4"}),"Save"]})}),parameters:{docs:{description:{story:"Toolbar with a menubar placeholder and action buttons."}}}},c={render:()=>t.jsxs(s,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(m,{className:"tw:h-4 tw:w-4"})}),t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(l,{className:"tw:h-4 tw:w-4"})})]}),parameters:{docs:{description:{story:"Minimal toolbar with just icon buttons."}}}};var p,w,h;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(h=(w=a.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var u,S,v;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(N=(j=c.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};const Ut=["Default","WithSearch","WithMenuBar","MinimalToolbar"];export{a as Default,c as MinimalToolbar,i as WithMenuBar,n as WithSearch,Ut as __namedExportsOrder,Dt as default};
