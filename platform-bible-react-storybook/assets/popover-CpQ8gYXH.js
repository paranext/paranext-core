import{r as p,j as s,b as H,e as R}from"./iframe-jej3GgDz.js";import{c as U}from"./utils-BPbySc-g.js";import{Z as q}from"./z-index-DiGYIwoM.js";import{u as $,g as Z}from"./content-zoom-area.context-Det3fSvF.js";import{u as B,c as m}from"./index-D4QmHEpI.js";import{u as y,c as V}from"./index-mjEMC6iY.js";import{c as G}from"./index-DctnkhXg.js";import{P as K,D as W}from"./index-DYik-xUR.js";import{h as X,R as J,u as Q,F as Y}from"./index-CboERKT4.js";import{u as ee}from"./index-DWgc4Dhl.js";import{R as oe,A as b,c as D,C as te,a as ne}from"./index-CSvkaPa2.js";import{P as O}from"./index-sfPrWEQK.js";import{P as _}from"./index-uM1rZ0aj.js";var C="Popover",[A]=G(C,[D]),h=D(),[re,u]=A(C),E=e=>{const{__scopePopover:a,children:n,open:i,defaultOpen:o,onOpenChange:t,modal:c=!1}=e,r=h(a),l=p.useRef(null),[d,g]=p.useState(!1),[P,v]=B({prop:i,defaultProp:o??!1,onChange:t,caller:C});return s.jsx(oe,{...r,children:s.jsx(re,{scope:a,contentId:ee(),triggerRef:l,open:P,onOpenChange:v,onOpenToggle:p.useCallback(()=>v(w=>!w),[v]),hasCustomAnchor:d,onCustomAnchorAdd:p.useCallback(()=>g(!0),[]),onCustomAnchorRemove:p.useCallback(()=>g(!1),[]),modal:c,children:n})})};E.displayName=C;var M="PopoverAnchor",k=p.forwardRef((e,a)=>{const{__scopePopover:n,...i}=e,o=u(M,n),t=h(n),{onCustomAnchorAdd:c,onCustomAnchorRemove:r}=o;return p.useEffect(()=>(c(),()=>r()),[c,r]),s.jsx(b,{...t,...i,ref:a})});k.displayName=M;var j="PopoverTrigger",N=p.forwardRef((e,a)=>{const{__scopePopover:n,...i}=e,o=u(j,n),t=h(n),c=y(a,o.triggerRef),r=s.jsx(_.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":L(o.open),...i,ref:c,onClick:m(e.onClick,o.onOpenToggle)});return o.hasCustomAnchor?r:s.jsx(b,{asChild:!0,...t,children:r})});N.displayName=j;var x="PopoverPortal",[ae,se]=A(x,{forceMount:void 0}),S=e=>{const{__scopePopover:a,forceMount:n,children:i,container:o}=e,t=u(x,a);return s.jsx(ae,{scope:a,forceMount:n,children:s.jsx(O,{present:n||t.open,children:s.jsx(K,{asChild:!0,container:o,children:i})})})};S.displayName=x;var f="PopoverContent",T=p.forwardRef((e,a)=>{const n=se(f,e.__scopePopover),{forceMount:i=n.forceMount,...o}=e,t=u(f,e.__scopePopover);return s.jsx(O,{present:i||t.open,children:t.modal?s.jsx(ce,{...o,ref:a}):s.jsx(pe,{...o,ref:a})})});T.displayName=f;var ie=V("PopoverContent.RemoveScroll"),ce=p.forwardRef((e,a)=>{const n=u(f,e.__scopePopover),i=p.useRef(null),o=y(a,i),t=p.useRef(!1);return p.useEffect(()=>{const c=i.current;if(c)return X(c)},[]),s.jsx(J,{as:ie,allowPinchZoom:!0,children:s.jsx(I,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:m(e.onCloseAutoFocus,c=>{var r;c.preventDefault(),t.current||(r=n.triggerRef.current)==null||r.focus()}),onPointerDownOutside:m(e.onPointerDownOutside,c=>{const r=c.detail.originalEvent,l=r.button===0&&r.ctrlKey===!0,d=r.button===2||l;t.current=d},{checkForDefaultPrevented:!1}),onFocusOutside:m(e.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1})})})}),pe=p.forwardRef((e,a)=>{const n=u(f,e.__scopePopover),i=p.useRef(!1),o=p.useRef(!1);return s.jsx(I,{...e,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var c,r;(c=e.onCloseAutoFocus)==null||c.call(e,t),t.defaultPrevented||(i.current||(r=n.triggerRef.current)==null||r.focus(),t.preventDefault()),i.current=!1,o.current=!1},onInteractOutside:t=>{var l,d;(l=e.onInteractOutside)==null||l.call(e,t),t.defaultPrevented||(i.current=!0,t.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const c=t.target;((d=n.triggerRef.current)==null?void 0:d.contains(c))&&t.preventDefault(),t.detail.originalEvent.type==="focusin"&&o.current&&t.preventDefault()}})}),I=p.forwardRef((e,a)=>{const{__scopePopover:n,trapFocus:i,onOpenAutoFocus:o,onCloseAutoFocus:t,disableOutsidePointerEvents:c,onEscapeKeyDown:r,onPointerDownOutside:l,onFocusOutside:d,onInteractOutside:g,...P}=e,v=u(f,n),w=h(n);return Q(),s.jsx(Y,{asChild:!0,loop:!0,trapped:i,onMountAutoFocus:o,onUnmountAutoFocus:t,children:s.jsx(W,{asChild:!0,disableOutsidePointerEvents:c,onInteractOutside:g,onEscapeKeyDown:r,onPointerDownOutside:l,onFocusOutside:d,onDismiss:()=>v.onOpenChange(!1),children:s.jsx(te,{"data-state":L(v.open),role:"dialog",id:v.contentId,...w,...P,ref:a,style:{...P.style,"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"}})})})}),F="PopoverClose",le=p.forwardRef((e,a)=>{const{__scopePopover:n,...i}=e,o=u(F,n);return s.jsx(_.button,{type:"button",...i,ref:a,onClick:m(e.onClick,()=>o.onOpenChange(!1))})});le.displayName=F;var de="PopoverArrow",ue=p.forwardRef((e,a)=>{const{__scopePopover:n,...i}=e,o=h(n);return s.jsx(ne,{...o,...i,ref:a})});ue.displayName=de;function L(e){return e?"open":"closed"}var ve=E,fe=k,me=N,he=S,ge=T;function Pe({...e}){return s.jsx(ve,{"data-slot":"popover",...e})}function Ce({...e}){return s.jsx(me,{"data-slot":"popover-trigger",...e})}const z=R.createContext(null);function we({container:e,children:a}){return s.jsx(z.Provider,{value:e,children:a})}function xe({className:e,align:a="center",sideOffset:n=4,style:i,...o}){const t=H(),c=R.useContext(z),r=$();return s.jsx(he,{container:c??void 0,children:s.jsx(ge,{"data-slot":"popover-content",align:a,sideOffset:n,className:U("pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",r!==void 0&&"tw:max-w-[calc(var(--radix-popover-content-available-width,100vw)/var(--platform-content-zoom-popup-factor,1))]",r!==void 0&&"tw:max-h-[calc(var(--radix-popover-content-available-height,100vh)/var(--platform-content-zoom-popup-factor,1))] tw:overflow-y-auto",e),style:{zIndex:q,...r===void 0?void 0:Z(r),...i},dir:t,"data-platform-content-zoom-root":r,"data-platform-content-zoom-popup":r===void 0?void 0:"",...o})})}function Re({...e}){return s.jsx(fe,{"data-slot":"popover-anchor",...e})}Pe.__docgenInfo={description:`The Popover component displays rich content in a portal, triggered by a button. This component is
built on Radix UI's Popover component and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/popover}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/popover}`,methods:[],displayName:"Popover"};Re.__docgenInfo={description:"@inheritdoc Popover",methods:[],displayName:"PopoverAnchor"};xe.__docgenInfo={description:"@inheritdoc Popover",methods:[],displayName:"PopoverContent",props:{align:{defaultValue:{value:"'center'",computed:!1},required:!1},sideOffset:{defaultValue:{value:"4",computed:!1},required:!1}}};we.__docgenInfo={description:`Overrides the container that descendant {@link PopoverContent} components portal into. Use it to
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
\`\`\``,methods:[],displayName:"PopoverPortalContainerProvider",props:{container:{required:!0,tsType:{name:"union",raw:"HTMLElement | null",elements:[{name:"HTMLElement"},{name:"null"}]},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};Ce.__docgenInfo={description:"@inheritdoc Popover",methods:[],displayName:"PopoverTrigger"};export{Pe as P,Ce as a,xe as b,Re as c,we as d};
