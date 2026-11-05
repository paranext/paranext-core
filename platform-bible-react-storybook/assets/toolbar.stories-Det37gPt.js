import{r as d,j as t}from"./iframe-CGYqOgCA.js";import{P as H}from"./platform-menubar.component-Bsuf_65R.js";import{c as L}from"./utils-BPbySc-g.js";import{u as V,a as A}from"./shrink-step.context-BcKRV0ti.js";import{u as K}from"./use-shrink-step.hook-DvnTxtCr.js";import{B as o}from"./button-ByWz7zrt.js";import{I as X}from"./input-phooaqO_.js";import{S as m}from"./save-CPb1xE9r.js";import{c as F}from"./createLucideIcon-DB788rMm.js";import{S as y}from"./settings-CpLaBVpN.js";import{S as G}from"./search-DMnbAyhs.js";import"./preload-helper-CTOgD26E.js";import"./menubar-gCy_lrZ5.js";import"./menu.context-B89b0w4P.js";import"./index-BnuTq2W6.js";import"./use-dismiss-on-window-blur.hook-CfLwXIhe.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-C7awxDWJ.js";import"./index-CZa2DfqK.js";import"./index-BWRCAs8d.js";import"./index-DWmalg2m.js";import"./index-DO7zL_On.js";import"./index-D9jOVgCy.js";import"./index-DeVX_-IQ.js";import"./index-BBfK45UQ.js";import"./index-DcLcJGrx.js";import"./index-DLX6rMOT.js";import"./index-DjTxmGL_.js";import"./index-Csgffmo8.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-rrhmKMrI.js";import"./index-C2zx2Yaw.js";import"./index-DXxgoP5n.js";import"./createReactComponent-Cqy2JT77.js";import"./IconCheck-hhaqmOOh.js";import"./tooltip-BnMzVV3s.js";import"./portal-container.context-DOH9wNA1.js";import"./index-CdDMvD4U.js";import"./shortcut-keys.component-BXzzk8cA.js";import"./index-Cgv-lC7n.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./kbd-DfJzIII_.js";import"./menu.util-DDlhOuOc.js";import"./lucide-icon.component-uiQP32-G.js";import"./circle-check-big-BJq7OY0k.js";import"./message-square-Cg9KgIGy.js";import"./book-open-BPOfKTIZ.js";import"./square-x-CfyUwfWk.js";import"./file-text-Dr7bkPFW.js";import"./eye-Dxo8J6-j.js";import"./pencil-Db2mWSUO.js";import"./external-link-QjfYekmP.js";import"./circle-question-mark-Ccl3e3h0.js";import"./house-BiSLWvj0.js";import"./menu-icon.component-BjFkcu1m.js";/**
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
