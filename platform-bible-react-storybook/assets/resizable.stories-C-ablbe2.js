import{j as e}from"./iframe-BKgemRh8.js";import{R as t,a,b as i}from"./resizable-D-OGdcnm.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";const k={title:"Shadcn/Resizable",tags:["autodocs"],decorators:[R=>e.jsx("div",{style:{width:"600px",height:"300px",border:"1px solid #ccc"},children:e.jsx(R,{})})]},n={render:()=>e.jsxs(t,{orientation:"horizontal",children:[e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#f0f0f0",height:"100%"},children:"Left panel"})}),e.jsx(i,{withHandle:!0}),e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#e0e0e0",height:"100%"},children:"Right panel"})})]})},r={render:()=>e.jsxs(t,{orientation:"vertical",children:[e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#f0f0f0",height:"100%"},children:"Top panel"})}),e.jsx(i,{withHandle:!0}),e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#e0e0e0",height:"100%"},children:"Bottom panel"})})]})},d={render:()=>e.jsxs(t,{orientation:"horizontal",children:[e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#f0f0f0",height:"100%"},children:"Panel 1"})}),e.jsx(i,{withHandle:!0}),e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#e0e0e0",height:"100%"},children:"Panel 2"})}),e.jsx(i,{withHandle:!0}),e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#d0d0d0",height:"100%"},children:"Panel 3"})})]})},l={render:()=>e.jsxs(t,{orientation:"horizontal",children:[e.jsx(a,{children:e.jsx("div",{style:{padding:"1rem",background:"#f0f0f0",height:"100%"},children:"Auto panel"})}),e.jsx(i,{withHandle:!0}),e.jsx(a,{defaultSize:39,minSize:15,maxSize:85,children:e.jsx("div",{style:{padding:"1rem",background:"#e0e0e0",height:"100%"},children:"39% default, 15–85% range"})})]})};var s,o,c;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#f0f0f0',
        height: '100%'
      }}>Left panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#e0e0e0',
        height: '100%'
      }}>Right panel</div>
      </ResizablePanel>
    </ResizablePanelGroup>
}`,...(c=(o=n.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var h,p,g;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <ResizablePanelGroup orientation="vertical">
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#f0f0f0',
        height: '100%'
      }}>Top panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#e0e0e0',
        height: '100%'
      }}>Bottom panel</div>
      </ResizablePanel>
    </ResizablePanelGroup>
}`,...(g=(p=r.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var u,b,m;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#f0f0f0',
        height: '100%'
      }}>Panel 1</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#e0e0e0',
        height: '100%'
      }}>Panel 2</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#d0d0d0',
        height: '100%'
      }}>Panel 3</div>
      </ResizablePanel>
    </ResizablePanelGroup>
}`,...(m=(b=d.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};var z,f,x;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel>
        <div style={{
        padding: '1rem',
        background: '#f0f0f0',
        height: '100%'
      }}>Auto panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={39} minSize={15} maxSize={85}>
        <div style={{
        padding: '1rem',
        background: '#e0e0e0',
        height: '100%'
      }}>
          39% default, 15–85% range
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
}`,...(x=(f=l.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};const H=["Horizontal","Vertical","ThreePanels","WithMinMax"];export{n as Horizontal,d as ThreePanels,r as Vertical,l as WithMinMax,H as __namedExportsOrder,k as default};
