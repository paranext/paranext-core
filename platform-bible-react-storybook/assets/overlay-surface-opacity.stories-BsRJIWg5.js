import{j as e,S as ae,f as b,g as se}from"./iframe-jej3GgDz.js";import{C as ce,c as ue,e as ie}from"./command-tOITZ0bp.js";import{C as le,a as pe,b as de,d as T,k as me,l as xe,m as ge}from"./context-menu-BzkOT9yr.js";import{D as Se,b as he,d as fe}from"./dialog-DNoMJEIW.js";import{D as Ce,b as Me,d as be}from"./drawer-DLaQ-B2X.js";import{D as Te,a as ye,b as we,c as y,d as je,e as De,f as ve}from"./dropdown-menu-DEofAtJk.js";import{M as Oe,a as Ie,b as Ee,c as Pe,d as w,g as qe,h as _e,i as Fe}from"./menubar-iZrqJ8qG.js";import{P as Be,a as Re,b as ke}from"./popover-CpQ8gYXH.js";import{S as Le,a as Ne,b as Ve,c as Ae,d as j}from"./select-BGOwpKvl.js";import{T as He,a as Ke,b as Ue,c as Ye}from"./tooltip-VFDfUi1I.js";import"./preload-helper-CTOgD26E.js";import"./index-CIBVOEuU.js";import"./index-D4QmHEpI.js";import"./index-DaapfgjF.js";import"./index-mjEMC6iY.js";import"./index-DctnkhXg.js";import"./index-DWgc4Dhl.js";import"./index-DYik-xUR.js";import"./index-uM1rZ0aj.js";import"./index-BPDSLiNd.js";import"./index-CboERKT4.js";import"./index-sfPrWEQK.js";import"./utils-BPbySc-g.js";import"./input-group-8eWZf3y8.js";import"./index-BnuTq2W6.js";import"./button-Cn6oprfD.js";import"./input-nDjjl4Ns.js";import"./IconCheck-C_t8qzPl.js";import"./createReactComponent-CjRxFD4r.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-CmLFQeSx.js";import"./index-C2FpNBPZ.js";import"./index-CSvkaPa2.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CdH4dUPj.js";import"./index-D9xCkbQw.js";import"./menu.context-C_jeNO-N.js";import"./content-zoom-area.context-Det3fSvF.js";import"./IconSelector-WhfLhxo7.js";import"./index-BaQP4hhM.js";import"./index-BvndhY2Q.js";import"./index-Dx07KMLV.js";const{expect:u,fireEvent:$e,screen:ze,waitFor:D}=__STORYBOOK_MODULE_TEST__,Ln={title:"Shadcn/Overlay Surface Opacity",tags:["!autodocs","test"]},oe="translucent-control";function s(){return e.jsx("div",{"data-testid":oe,style:{width:8,height:8,backgroundColor:"color-mix(in oklab, var(--popover) 70%, transparent)"}})}function v(r){const t=getComputedStyle(r).backgroundColor,n=document.createElement("canvas");n.width=1,n.height=1;const o=n.getContext("2d",{willReadFrequently:!0});if(!o)throw new Error("No 2D canvas context available");o.fillStyle="rgba(1, 2, 3, 0.5)";const l=o.fillStyle;if(o.fillStyle=t,o.fillStyle===l)throw new Error(`Canvas could not parse "${t}"`);return o.fillRect(0,0,1,1),o.getImageData(0,0,1,1).data[3]/255}function O(r){const t=[];for(let n=r;n&&n!==document.body;n=n.parentElement)getComputedStyle(n).opacity!=="1"&&t.push(n.dataset.slot??n.tagName.toLowerCase());return t}function Ge(r){const t=document.querySelector(`[data-slot="${r}"]`);if(!t)throw new Error(`No rendered element with data-slot="${r}"`);return t}async function c(r){const t=await D(()=>r.map(Ge));await D(()=>u(t.flatMap(O)).toEqual([]));const n=[],o=[],l=new Set,C=[];try{ae.forEach(a=>{b(document.documentElement,a),l.add(getComputedStyle(document.documentElement).getPropertyValue("--popover").trim()),o.push(v(ze.getByTestId(oe))),C.push({themeId:a,layers:t.flatMap(O)}),t.forEach(M=>n.push({themeId:a,slot:M.dataset.slot??"",alpha:v(M)}))})}finally{b(document.documentElement,se)}await u(l.size).toBeGreaterThan(1),await u(o.every(a=>a<1)).toBe(!0),await u(C.filter(a=>a.layers.length>0)).toEqual([]),await u(n).toEqual(n.map(a=>({...a,alpha:1})))}const p={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsxs(Te,{defaultOpen:!0,children:[e.jsx(ye,{children:"Open menu"}),e.jsxs(we,{children:[e.jsx(y,{children:"Item"}),e.jsxs(je,{open:!0,children:[e.jsx(De,{children:"More"}),e.jsx(ve,{children:e.jsx(y,{children:"Sub item"})})]})]})]})]}),play:async()=>{await c(["dropdown-menu-content","dropdown-menu-sub-content"])}},d={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsxs(le,{children:[e.jsx(pe,{children:"Right-click here"}),e.jsxs(de,{children:[e.jsx(T,{children:"Item"}),e.jsxs(me,{open:!0,children:[e.jsx(xe,{children:"More"}),e.jsx(ge,{children:e.jsx(T,{children:"Sub item"})})]})]})]})]}),play:async({canvas:r})=>{$e.contextMenu(r.getByText("Right-click here")),await c(["context-menu-content","context-menu-sub-content"])}},m={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx(Oe,{defaultValue:"file",children:e.jsxs(Ie,{value:"file",children:[e.jsx(Ee,{children:"File"}),e.jsxs(Pe,{children:[e.jsx(w,{children:"Item"}),e.jsxs(qe,{open:!0,children:[e.jsx(_e,{children:"More"}),e.jsx(Fe,{children:e.jsx(w,{children:"Sub item"})})]})]})]})})]}),play:async()=>{await c(["menubar-content","menubar-sub-content"])}},x={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsxs(Le,{defaultOpen:!0,defaultValue:"one",children:[e.jsx(Ne,{children:e.jsx(Ve,{})}),e.jsxs(Ae,{children:[e.jsx(j,{value:"one",children:"One"}),e.jsx(j,{value:"two",children:"Two"})]})]})]}),play:async()=>{await c(["select-content"])}},g={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsxs(Be,{defaultOpen:!0,children:[e.jsx(Re,{children:"Open popover"}),e.jsx(ke,{children:"Popover body"})]})]}),play:async()=>{await c(["popover-content"])}},i={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx(ce,{children:e.jsx(ue,{children:e.jsx(ie,{children:"Item"})})})]}),play:async()=>{await c(["command"])}},S={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx(He,{children:e.jsxs(Ke,{defaultOpen:!0,children:[e.jsx(Ue,{children:"Hover me"}),e.jsx(Ye,{children:"Tooltip body"})]})})]}),play:async()=>{await c(["tooltip-content"])}},h={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx(Se,{defaultOpen:!0,children:e.jsx(he,{children:e.jsx(fe,{children:"Dialog"})})})]}),play:async()=>{await c(["dialog-content"])}},f={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx(Ce,{defaultOpen:!0,children:e.jsx(Me,{children:e.jsx(be,{children:"Drawer"})})})]}),play:async()=>{await c(["drawer-content"])}};var I,E,P;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
          <DropdownMenuSub open>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['dropdown-menu-content', 'dropdown-menu-sub-content']);
  }
}`,...(P=(E=p.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var q,_,F;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <ContextMenu>
        <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
          <ContextMenuSub open>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub item</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </>,
  play: async ({
    canvas
  }) => {
    fireEvent.contextMenu(canvas.getByText('Right-click here'));
    await expectSurfacesOpaqueInEveryTheme(['context-menu-content', 'context-menu-sub-content']);
  }
}`,...(F=(_=d.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var B,R,k;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <Menubar defaultValue="file">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Item</MenubarItem>
            <MenubarSub open>
              <MenubarSubTrigger>More</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Sub item</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['menubar-content', 'menubar-sub-content']);
  }
}`,...(k=(R=m.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var L,N,V;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <Select defaultOpen defaultValue="one">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['select-content']);
  }
}`,...(V=(N=x.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var A,H,K;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <Popover defaultOpen>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['popover-content']);
  }
}`,...(K=(H=g.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var U,Y,$,z,G;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <Command>
        <CommandList>
          <CommandItem>Item</CommandItem>
        </CommandList>
      </Command>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['command']);
  }
}`,...($=(Y=i.parameters)==null?void 0:Y.docs)==null?void 0:$.source},description:{story:"`Command` is the body of every combobox popover, e.g. `ProjectSelector` and `BookChapterControl`.",...(G=(z=i.parameters)==null?void 0:z.docs)==null?void 0:G.description}}};var J,Q,W;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip body</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['tooltip-content']);
  }
}`,...(W=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,ee;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['dialog-content']);
  }
}`,...(ee=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,te,re;f.parameters={...f.parameters,docs:{...(ne=f.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <>
      <TranslucentControl />
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Drawer</DrawerTitle>
        </DrawerContent>
      </Drawer>
    </>,
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['drawer-content']);
  }
}`,...(re=(te=f.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const Nn=["DropdownMenuSurfaces","ContextMenuSurfaces","MenubarSurfaces","SelectSurface","PopoverSurface","CommandSurface","TooltipSurface","DialogSurface","DrawerSurface"];export{i as CommandSurface,d as ContextMenuSurfaces,h as DialogSurface,f as DrawerSurface,p as DropdownMenuSurfaces,m as MenubarSurfaces,g as PopoverSurface,x as SelectSurface,S as TooltipSurface,Nn as __namedExportsOrder,Ln as default};
