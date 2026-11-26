import{r as s,j as t}from"./iframe-DwmEA7JC.js";import{A as u,P as Y}from"./platform-menubar.component-CFI__u0c.js";import{c as F}from"./utils-BPbySc-g.js";import{u as G,a as J}from"./shrink-step.context-CnKEjrsU.js";import{u as Q}from"./use-shrink-step.hook-DjjL6iCb.js";import{B as o}from"./button-9HKzajlK.js";import{I as Z}from"./input-B4PaTzDI.js";import{S as d}from"./save-D0tYQnEq.js";import{c as $}from"./createLucideIcon-CMNQhVIY.js";import{S as z}from"./settings-Cjf7UDHf.js";import{S as U}from"./search-j6X-wDF7.js";import"./preload-helper-CTOgD26E.js";import"./menubar-Cxjkj34l.js";import"./menu.context-CbVG-8bm.js";import"./index-BnuTq2W6.js";import"./use-dismiss-on-window-blur.hook-BJc0B0_k.js";import"./z-index-DhRj3SmA.js";import"./IconChevronRight-CGqOK4TX.js";import"./index-C3kNhcaA.js";import"./index-Db9qd-QD.js";import"./index-qbK9ySJc.js";import"./index-qez9pqHY.js";import"./index-xA6im4UU.js";import"./index-7vipdWwS.js";import"./index-BR_6jPry.js";import"./index-X7gxHcWp.js";import"./index-BHVHeiLO.js";import"./index-C5HvWKyt.js";import"./index-QQnUPmtH.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CxryA-vR.js";import"./index-DSxpCGUt.js";import"./index-BssXkWws.js";import"./createReactComponent-BwzxAFf9.js";import"./IconCheck-DLFPzFzh.js";import"./tooltip-CoSKxKcl.js";import"./portal-container.context-9jbzBL1O.js";import"./index-TIk5x23H.js";import"./shortcut-keys.component-DNOkBJua.js";import"./index-VL4OM5EA.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./kbd-DX-1qLRl.js";import"./menu.util-5L3jl9MX.js";import"./lucide-icon.component-CfJ4BWy6.js";import"./undo-2-84Y_39T6.js";import"./circle-check-big-D0dvwo2i.js";import"./message-square-DCY5gJs6.js";import"./book-open-BDw16Xl2.js";import"./square-x-KybVuI_N.js";import"./file-text-TNUXZmnK.js";import"./eye-CH8AUmnB.js";import"./external-link-P6lBH2m4.js";import"./circle-question-mark-DN5QxS5p.js";import"./house-BClPEQOA.js";import"./menu-icon.component-C3p1btS1.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M12 2v13",key:"1km8f5"}],["path",{d:"m16 6-4-4-4 4",key:"13yo43"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}]],S=$("share",tt),et=Object.freeze([950,800,700]);function r({menuData:e,onOpenChange:R,onSelectMenuItem:C,className:_,id:P,children:O,appMenuIcon:p,appMenuAreaChildren:W,configAreaChildren:A,shouldUseAsAppDragArea:n,menubarVariant:E="default"}){const[a,b]=s.useState(""),w=s.useRef(!1),L=s.useCallback(()=>{w.current=a===u},[a]),q=s.useCallback(()=>{const h=w.current||a===u;w.current=!1,b(h?"":u)},[a]),[H,V]=s.useState(void 0),K=s.useCallback(h=>V(h??void 0),[]),D=Q(H,et),X=G()??D;return t.jsx(J.Provider,{value:X,children:t.jsx("div",{className:F("tw:border tw:px-4 tw:text-foreground",_),style:{position:"relative"},id:P,children:t.jsxs("div",{"data-testid":"toolbar-content-row",className:"tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",ref:K,style:n?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw:flex tw:shrink-0 tw:grow tw:basis-0",children:t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",style:n?{WebkitAppRegion:"no-drag"}:void 0,children:[p&&(e?t.jsx("button",{type:"button",tabIndex:-1,className:"tw:flex tw:shrink-0 tw:items-center tw:rounded-md tw:border-0 tw:bg-transparent tw:p-0",onPointerDown:L,onClick:q,children:p}):p),W,e&&t.jsx(Y,{menuData:e,onOpenChange:R,onSelectMenuItem:C,variant:E,value:a,onValueChange:b})]})}),t.jsx("div",{"data-testid":"toolbar-content-area",className:"tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:overflow-clip tw:px-2",style:n?{WebkitAppRegion:"no-drag"}:void 0,children:O}),t.jsx("div",{className:"tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end",children:t.jsx("div",{className:"tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",style:n?{WebkitAppRegion:"no-drag"}:void 0,children:A})})]})})})}r.__docgenInfo={description:`A customizable toolbar component with a menubar, content area, and configure area.

This component is designed to be used in the window title bar of an electron application.

Two \`data-testid\` hooks are relied on by end-to-end tests outside this package, so they are part
of this component's contract: \`toolbar-content-row\` (the row that clips when contents do not fit)
and \`toolbar-content-area\` (the area receiving \`children\`). Renaming either is a breaking
change.

@param {ToolbarProps} props - The props for the component.`,methods:[],displayName:"Toolbar",props:{menubarVariant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const ae={title:"Advanced/Toolbar",component:r,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"tw:p-4",children:t.jsx(e,{})})]},i={render:()=>t.jsxs(r,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(d,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(S,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(z,{className:"tw:h-4 tw:w-4"}),"Settings"]})]}),parameters:{docs:{description:{story:"A basic toolbar with common action buttons."}}}},c={render:()=>t.jsx(r,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-2",children:[t.jsxs("div",{className:"tw:relative",children:[t.jsx(U,{className:"tw:absolute tw:left-2 tw:top-2.5 tw:h-4 tw:w-4 tw:text-muted-foreground"}),t.jsx(Z,{type:"search",placeholder:"Search...",className:"tw:w-[200px] tw:pl-8"})]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(d,{className:"tw:h-4 tw:w-4"}),"Save"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(S,{className:"tw:h-4 tw:w-4"}),"Share"]}),t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(z,{className:"tw:h-4 tw:w-4"}),"Settings"]})]})}),parameters:{docs:{description:{story:"Toolbar with search functionality and action buttons."}}}},m={render:()=>t.jsx(r,{onSelectMenuItem:e=>console.log("Selected:",e),children:t.jsxs(o,{variant:"ghost",size:"sm",children:[t.jsx(d,{className:"tw:h-4 tw:w-4"}),"Save"]})}),parameters:{docs:{description:{story:"Toolbar with a menubar placeholder and action buttons."}}}},l={render:()=>t.jsxs(r,{onSelectMenuItem:e=>console.log("Selected:",e),children:[t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(d,{className:"tw:h-4 tw:w-4"})}),t.jsx(o,{variant:"ghost",size:"sm",children:t.jsx(S,{className:"tw:h-4 tw:w-4"})})]}),parameters:{docs:{description:{story:"Minimal toolbar with just icon buttons."}}}};var v,f,x;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(x=(f=i.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var g,j,N;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(N=(j=c.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var y,I,k;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(k=(I=m.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};var B,T,M;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(M=(T=l.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};const ne=["Default","WithSearch","WithMenuBar","MinimalToolbar"];export{i as Default,l as MinimalToolbar,m as WithMenuBar,c as WithSearch,ne as __namedExportsOrder,ae as default};
