import{r as p,j as a,b as U,e as R}from"./iframe-98cSUu9c.js";import{c as q}from"./utils-BPbySc-g.js";import{Z as $}from"./z-index-CoNkaVR8.js";import{u as B,c as m}from"./index-DrMPsYHH.js";import{u as y,c as V}from"./index-DJ2JoP6m.js";import{c as z}from"./index-ClT2oVr8.js";import{P as G,D as K}from"./index-BR1gMkug.js";import{h as Z,R as W,u as X,F as J}from"./index-CoA807i-.js";import{u as Q}from"./index-DauiKX_X.js";import{R as Y,A as D,c as b,C as ee,a as oe}from"./index-C_2RJqVm.js";import{P as O}from"./index-C5_U7A7s.js";import{P as _}from"./index-CYqoEYJG.js";var C="Popover",[E]=z(C,[b]),h=b(),[te,u]=E(C),A=e=>{const{__scopePopover:r,children:n,open:s,defaultOpen:o,onOpenChange:t,modal:i=!1}=e,c=h(r),l=p.useRef(null),[d,P]=p.useState(!1),[g,f]=B({prop:s,defaultProp:o??!1,onChange:t,caller:C});return a.jsx(Y,{...c,children:a.jsx(te,{scope:r,contentId:Q(),triggerRef:l,open:g,onOpenChange:f,onOpenToggle:p.useCallback(()=>f(w=>!w),[f]),hasCustomAnchor:d,onCustomAnchorAdd:p.useCallback(()=>P(!0),[]),onCustomAnchorRemove:p.useCallback(()=>P(!1),[]),modal:i,children:n})})};A.displayName=C;var M="PopoverAnchor",k=p.forwardRef((e,r)=>{const{__scopePopover:n,...s}=e,o=u(M,n),t=h(n),{onCustomAnchorAdd:i,onCustomAnchorRemove:c}=o;return p.useEffect(()=>(i(),()=>c()),[i,c]),a.jsx(D,{...t,...s,ref:r})});k.displayName=M;var j="PopoverTrigger",N=p.forwardRef((e,r)=>{const{__scopePopover:n,...s}=e,o=u(j,n),t=h(n),i=y(r,o.triggerRef),c=a.jsx(_.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":L(o.open),...s,ref:i,onClick:m(e.onClick,o.onOpenToggle)});return o.hasCustomAnchor?c:a.jsx(D,{asChild:!0,...t,children:c})});N.displayName=j;var x="PopoverPortal",[ne,re]=E(x,{forceMount:void 0}),T=e=>{const{__scopePopover:r,forceMount:n,children:s,container:o}=e,t=u(x,r);return a.jsx(ne,{scope:r,forceMount:n,children:a.jsx(O,{present:n||t.open,children:a.jsx(G,{asChild:!0,container:o,children:s})})})};T.displayName=x;var v="PopoverContent",I=p.forwardRef((e,r)=>{const n=re(v,e.__scopePopover),{forceMount:s=n.forceMount,...o}=e,t=u(v,e.__scopePopover);return a.jsx(O,{present:s||t.open,children:t.modal?a.jsx(se,{...o,ref:r}):a.jsx(ie,{...o,ref:r})})});I.displayName=v;var ae=V("PopoverContent.RemoveScroll"),se=p.forwardRef((e,r)=>{const n=u(v,e.__scopePopover),s=p.useRef(null),o=y(r,s),t=p.useRef(!1);return p.useEffect(()=>{const i=s.current;if(i)return Z(i)},[]),a.jsx(W,{as:ae,allowPinchZoom:!0,children:a.jsx(S,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:m(e.onCloseAutoFocus,i=>{var c;i.preventDefault(),t.current||(c=n.triggerRef.current)==null||c.focus()}),onPointerDownOutside:m(e.onPointerDownOutside,i=>{const c=i.detail.originalEvent,l=c.button===0&&c.ctrlKey===!0,d=c.button===2||l;t.current=d},{checkForDefaultPrevented:!1}),onFocusOutside:m(e.onFocusOutside,i=>i.preventDefault(),{checkForDefaultPrevented:!1})})})}),ie=p.forwardRef((e,r)=>{const n=u(v,e.__scopePopover),s=p.useRef(!1),o=p.useRef(!1);return a.jsx(S,{...e,ref:r,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var i,c;(i=e.onCloseAutoFocus)==null||i.call(e,t),t.defaultPrevented||(s.current||(c=n.triggerRef.current)==null||c.focus(),t.preventDefault()),s.current=!1,o.current=!1},onInteractOutside:t=>{var l,d;(l=e.onInteractOutside)==null||l.call(e,t),t.defaultPrevented||(s.current=!0,t.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const i=t.target;((d=n.triggerRef.current)==null?void 0:d.contains(i))&&t.preventDefault(),t.detail.originalEvent.type==="focusin"&&o.current&&t.preventDefault()}})}),S=p.forwardRef((e,r)=>{const{__scopePopover:n,trapFocus:s,onOpenAutoFocus:o,onCloseAutoFocus:t,disableOutsidePointerEvents:i,onEscapeKeyDown:c,onPointerDownOutside:l,onFocusOutside:d,onInteractOutside:P,...g}=e,f=u(v,n),w=h(n);return X(),a.jsx(J,{asChild:!0,loop:!0,trapped:s,onMountAutoFocus:o,onUnmountAutoFocus:t,children:a.jsx(K,{asChild:!0,disableOutsidePointerEvents:i,onInteractOutside:P,onEscapeKeyDown:c,onPointerDownOutside:l,onFocusOutside:d,onDismiss:()=>f.onOpenChange(!1),children:a.jsx(ee,{"data-state":L(f.open),role:"dialog",id:f.contentId,...w,...g,ref:r,style:{...g.style,"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"}})})})}),F="PopoverClose",ce=p.forwardRef((e,r)=>{const{__scopePopover:n,...s}=e,o=u(F,n);return a.jsx(_.button,{type:"button",...s,ref:r,onClick:m(e.onClick,()=>o.onOpenChange(!1))})});ce.displayName=F;var pe="PopoverArrow",le=p.forwardRef((e,r)=>{const{__scopePopover:n,...s}=e,o=h(n);return a.jsx(oe,{...o,...s,ref:r})});le.displayName=pe;function L(e){return e?"open":"closed"}var de=A,ue=k,fe=N,ve=T,me=I;function he({...e}){return a.jsx(de,{"data-slot":"popover",...e})}function Pe({...e}){return a.jsx(fe,{"data-slot":"popover-trigger",...e})}const H=R.createContext(null);function ge({container:e,children:r}){return a.jsx(H.Provider,{value:e,children:r})}function Ce({className:e,align:r="center",sideOffset:n=4,style:s,...o}){const t=U(),i=R.useContext(H);return a.jsx(ve,{container:i??void 0,children:a.jsx(me,{"data-slot":"popover-content",align:r,sideOffset:n,className:q("pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",e),style:{zIndex:$,...s},dir:t,...o})})}function we({...e}){return a.jsx(ue,{"data-slot":"popover-anchor",...e})}he.__docgenInfo={description:`The Popover component displays rich content in a portal, triggered by a button. This component is
built on Radix UI's Popover component and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/popover}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/popover}`,methods:[],displayName:"Popover"};we.__docgenInfo={description:"@inheritdoc Popover",methods:[],displayName:"PopoverAnchor"};Ce.__docgenInfo={description:"@inheritdoc Popover",methods:[],displayName:"PopoverContent",props:{align:{defaultValue:{value:"'center'",computed:!1},required:!1},sideOffset:{defaultValue:{value:"4",computed:!1},required:!1}}};ge.__docgenInfo={description:`Overrides the container that descendant {@link PopoverContent} components portal into. Use it to
keep popovers inside a Radix \`DialogContent\`, \`DropdownMenuContent\`, or any other ancestor that
owns a focus trap or dismiss-on-outside-click layer.

@remarks
Radix \`Popover\` portals its content to \`document.body\` by default, which works fine for top-level
UI. The default breaks down whenever a popover trigger lives inside an ancestor that:

- Runs a focus trap (\`Dialog\`, \`AlertDialog\`, modal \`DropdownMenu\`) — the trap yanks focus back out
  of the popover the instant it opens because the portal'd content is outside the trap's DOM
  subtree.
- Listens for outside-clicks (Radix \`DismissableLayer\`, used by every \`*Menu\`/\`Dialog\`) — a click
  inside the popover reads as "outside the menu" and dismisses the parent immediately.

Wrapping the children of the trapping ancestor in this provider, with that ancestor's element as
\`container\`, makes nested \`PopoverContent\` portal as a DOM descendant of the trap so both focus
and dismiss-layer logic accept it.

Single descendant scope: a \`PopoverPortalContainerProvider\` only affects \`PopoverContent\` mounts
rendered as React children. It does not retroactively re-portal already-mounted popovers, and it
does not affect popovers in sibling subtrees.

Initial-mount behavior: pass \`null\` for \`container\` (the initial value of a \`useState<HTMLElement

| null>(null)\` paired with a ref callback on the ancestor) to keep Radix's default

\`document.body\` behavior until the ancestor mounts. Once the element exists, future popover opens
portal into it. The triggering ancestor (the trap owner) must wrap, not be wrapped by, this
provider.
@example

\`\`\`tsx
function ScopeMenu() {
  const [dialogEl, setDialogEl] = useState<HTMLDivElement | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent ref={setDialogEl}>
        <PopoverPortalContainerProvider container={dialogEl}>
          <BookChapterControl ... />
        </PopoverPortalContainerProvider>
      </DialogContent>
    </Dialog>
  );
}
\`\`\`

@example

\`\`\`tsx
// Dropdown variant: same pattern, container is the DropdownMenuContent.
const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);
<DropdownMenu>
  <DropdownMenuTrigger>...</DropdownMenuTrigger>
  <DropdownMenuContent ref={setContentEl}>
    <PopoverPortalContainerProvider container={contentEl}>
      <BookChapterControl ... />
    </PopoverPortalContainerProvider>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\``,methods:[],displayName:"PopoverPortalContainerProvider",props:{container:{required:!0,tsType:{name:"union",raw:"HTMLElement | null",elements:[{name:"HTMLElement"},{name:"null"}]},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};Pe.__docgenInfo={description:"@inheritdoc Popover",methods:[],displayName:"PopoverTrigger"};export{he as P,Pe as a,Ce as b,ge as c,we as d};
