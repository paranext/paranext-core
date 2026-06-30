import{r as u,j as e,e as R}from"./iframe-CV_JbJfi.js";import{c as C}from"./utils-BPbySc-g.js";import{I as de}from"./IconCheck-Cay-XY7w.js";import{R as Te,A as Pe,P as Oe,C as Ae,G as Ee,I as Ge,S as Le,L as Ve,a as $e,b as Be,c as De,d as ze,f as Fe,g as Ue,h as We,e as ce,i as qe,j as Ze}from"./IconChevronRight-ilSpGn5m.js";import{c as k,u as Xe}from"./index-B_dXIX0d.js";import{c as Ye}from"./index-BskQ_WIn.js";import{P as He}from"./index-DHoe4wAM.js";import{u as Je}from"./index-CApXzNDz.js";import"./preload-helper-CTOgD26E.js";import"./createReactComponent-Cn2CKIMN.js";import"./index-BlSPtIk_.js";import"./index-BjZIAuPz.js";import"./index-DVg6kajG.js";import"./index-DLLoSSze.js";import"./index-DF5e7qdR.js";import"./index-CX2C0aTE.js";import"./index-BAQXLjD6.js";import"./index-CN5Uuz18.js";import"./index-qN1HJXoF.js";import"./index-CBbSG6S2.js";var B="ContextMenu",[Ke]=Ye(B,[ce]),c=ce(),[Qe,xe]=Ke(B),le=t=>{const{__scopeContextMenu:n,children:r,onOpenChange:o,dir:a,modal:m=!0}=t,[w,x]=u.useState(!1),p=c(n),S=Je(o),l=u.useCallback(I=>{x(I),S(I)},[S]);return e.jsx(Qe,{scope:n,open:w,onOpenChange:l,modal:m,children:e.jsx(Te,{...p,dir:a,open:w,onOpenChange:l,modal:m,children:r})})};le.displayName=B;var me="ContextMenuTrigger",pe=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,disabled:o=!1,...a}=t,m=xe(me,r),w=c(r),x=u.useRef({x:0,y:0}),p=u.useRef({getBoundingClientRect:()=>DOMRect.fromRect({width:0,height:0,...x.current})}),S=u.useRef(0),l=u.useCallback(()=>window.clearTimeout(S.current),[]),I=b=>{x.current={x:b.clientX,y:b.clientY},m.onOpenChange(!0)};return u.useEffect(()=>l,[l]),u.useEffect(()=>void(o&&l()),[o,l]),e.jsxs(e.Fragment,{children:[e.jsx(Pe,{...w,virtualRef:p}),e.jsx(He.span,{"data-state":m.open?"open":"closed","data-disabled":o?"":void 0,...a,ref:n,style:{WebkitTouchCallout:"none",...t.style},onContextMenu:o?t.onContextMenu:k(t.onContextMenu,b=>{l(),I(b),b.preventDefault()}),onPointerDown:o?t.onPointerDown:k(t.onPointerDown,N(b=>{l(),S.current=window.setTimeout(()=>I(b),700)})),onPointerMove:o?t.onPointerMove:k(t.onPointerMove,N(l)),onPointerCancel:o?t.onPointerCancel:k(t.onPointerCancel,N(l)),onPointerUp:o?t.onPointerUp:k(t.onPointerUp,N(l))})]})});pe.displayName=me;var et="ContextMenuPortal",we=t=>{const{__scopeContextMenu:n,...r}=t,o=c(n);return e.jsx(Oe,{...o,...r})};we.displayName=et;var Ce="ContextMenuContent",he=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=xe(Ce,r),m=c(r),w=u.useRef(!1);return e.jsx(Ae,{...m,...o,ref:n,side:"right",sideOffset:2,align:"start",onCloseAutoFocus:x=>{var p;(p=t.onCloseAutoFocus)==null||p.call(t,x),!x.defaultPrevented&&w.current&&x.preventDefault(),w.current=!1},onInteractOutside:x=>{var p;(p=t.onInteractOutside)==null||p.call(t,x),!x.defaultPrevented&&!a.modal&&(w.current=!0)},style:{...t.style,"--radix-context-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-context-menu-content-available-width":"var(--radix-popper-available-width)","--radix-context-menu-content-available-height":"var(--radix-popper-available-height)","--radix-context-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-context-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});he.displayName=Ce;var tt="ContextMenuGroup",Me=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(Ee,{...a,...o,ref:n})});Me.displayName=tt;var nt="ContextMenuLabel",ge=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(Ve,{...a,...o,ref:n})});ge.displayName=nt;var ot="ContextMenuItem",fe=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(Ge,{...a,...o,ref:n})});fe.displayName=ot;var rt="ContextMenuCheckboxItem",be=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx($e,{...a,...o,ref:n})});be.displayName=rt;var st="ContextMenuRadioGroup",ve=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(De,{...a,...o,ref:n})});ve.displayName=st;var at="ContextMenuRadioItem",je=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(ze,{...a,...o,ref:n})});je.displayName=at;var ut="ContextMenuItemIndicator",Se=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(Be,{...a,...o,ref:n})});Se.displayName=ut;var it="ContextMenuSeparator",Ie=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(Le,{...a,...o,ref:n})});Ie.displayName=it;var dt="ContextMenuArrow",ct=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(qe,{...a,...o,ref:n})});ct.displayName=dt;var ke="ContextMenuSub",Re=t=>{const{__scopeContextMenu:n,children:r,onOpenChange:o,open:a,defaultOpen:m}=t,w=c(n),[x,p]=Xe({prop:a,defaultProp:m??!1,onChange:o,caller:ke});return e.jsx(Fe,{...w,open:x,onOpenChange:p,children:r})};Re.displayName=ke;var xt="ContextMenuSubTrigger",ye=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(Ue,{...a,...o,ref:n})});ye.displayName=xt;var lt="ContextMenuSubContent",Ne=u.forwardRef((t,n)=>{const{__scopeContextMenu:r,...o}=t,a=c(r);return e.jsx(We,{...a,...o,ref:n,style:{...t.style,"--radix-context-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-context-menu-content-available-width":"var(--radix-popper-available-width)","--radix-context-menu-content-available-height":"var(--radix-popper-available-height)","--radix-context-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-context-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Ne.displayName=lt;function N(t){return n=>n.pointerType!=="mouse"?t(n):void 0}var mt=le,pt=pe,wt=we,Ct=he,ht=Me,Mt=ge,gt=fe,ft=be,bt=ve,vt=je,_e=Se,jt=Ie,St=Re,It=ye,kt=Ne;function M({...t}){return e.jsx(mt,{"data-slot":"context-menu",...t})}function g({className:t,...n}){return e.jsx(pt,{"data-slot":"context-menu-trigger",className:C("tw:select-none",t),...n})}function j({...t}){return e.jsx(ht,{"data-slot":"context-menu-group",...t})}function L({...t}){return e.jsx(St,{"data-slot":"context-menu-sub",...t})}function D({...t}){return e.jsx(bt,{"data-slot":"context-menu-radio-group",...t})}function f({className:t,...n}){return e.jsx(wt,{children:e.jsx(Ct,{"data-slot":"context-menu-content",className:C("pr-twp tw:z-50 tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",t),...n})})}function s({className:t,inset:n,variant:r="default",...o}){return e.jsx(gt,{"data-slot":"context-menu-item","data-inset":n,"data-variant":r,className:C("pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",t),...o})}function V({className:t,inset:n,children:r,...o}){return e.jsxs(It,{"data-slot":"context-menu-sub-trigger","data-inset":n,className:C("pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t),...o,children:[r,e.jsx(Ze,{className:"tw:ms-auto"})]})}function $({className:t,...n}){return e.jsx(kt,{"data-slot":"context-menu-sub-content",className:C("pr-twp tw:z-50 tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",t),...n})}function y({className:t,children:n,checked:r,inset:o,...a}){return e.jsxs(ft,{"data-slot":"context-menu-checkbox-item","data-inset":o,className:C("pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t),checked:r,...a,children:[e.jsx("span",{className:"tw:pointer-events-none tw:absolute tw:end-2",children:e.jsx(_e,{children:e.jsx(de,{})})}),n]})}function h({className:t,children:n,inset:r,...o}){return e.jsxs(vt,{"data-slot":"context-menu-radio-item","data-inset":r,className:C("pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t),...o,children:[e.jsx("span",{className:"tw:pointer-events-none tw:absolute tw:end-2",children:e.jsx(_e,{children:e.jsx(de,{})})}),n]})}function v({className:t,inset:n,...r}){return e.jsx(Mt,{"data-slot":"context-menu-label","data-inset":n,className:C("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",t),...r})}function d({className:t,...n}){return e.jsx(jt,{"data-slot":"context-menu-separator",className:C("pr-twp tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",t),...n})}function i({className:t,...n}){return e.jsx("span",{"data-slot":"context-menu-shortcut",className:C("pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",t),...n})}M.__docgenInfo={description:`Context Menu component displays a menu to the user — such as a set of actions or functions,
triggered by a right-click or long-press.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/context-menu}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/context-menu}`,methods:[],displayName:"ContextMenu"};g.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuTrigger"};f.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuContent",props:{side:{required:!1,tsType:{name:"union",raw:"'top' | 'right' | 'bottom' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'right'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"}]},description:""}}};s.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuItem",props:{inset:{required:!1,tsType:{name:"boolean"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'destructive'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'destructive'"}]},description:"",defaultValue:{value:"'default'",computed:!1}}}};y.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuCheckboxItem",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuRadioItem",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};v.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuLabel",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSeparator"};i.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuShortcut"};j.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuGroup"};L.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSub"};$.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSubContent"};V.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSubTrigger",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};D.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuRadioGroup"};const Zt={title:"Shadcn/ContextMenu",component:M,tags:["autodocs"],decorators:[t=>e.jsx("div",{className:"tw:p-8",children:e.jsx(t,{})})],parameters:{docs:{description:{component:"Context Menu component displays a menu to the user — such as a set of actions or functions, triggered by right-clicking on an element."}}}},_={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click here"}),e.jsxs(f,{children:[e.jsx(s,{children:"Profile"}),e.jsx(s,{children:"Settings"}),e.jsx(d,{}),e.jsx(s,{children:"Logout"})]})]}),parameters:{docs:{description:{story:"A basic context menu with simple menu items."}}}},T={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for shortcuts"}),e.jsxs(f,{children:[e.jsxs(s,{children:["Cut",e.jsx(i,{children:"⌘X"})]}),e.jsxs(s,{children:["Copy",e.jsx(i,{children:"⌘C"})]}),e.jsxs(s,{children:["Paste",e.jsx(i,{children:"⌘V"})]}),e.jsx(d,{}),e.jsxs(s,{children:["Select All",e.jsx(i,{children:"⌘A"})]})]})]}),parameters:{docs:{description:{story:"Context menu with keyboard shortcuts displayed."}}}},P={render:()=>{const[t,n]=R.useState({showBookmarks:!0,showFullURLs:!1});return e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for options"}),e.jsxs(f,{children:[e.jsx(v,{children:"View Options"}),e.jsx(d,{}),e.jsx(y,{checked:t.showBookmarks,onCheckedChange:r=>n(o=>({...o,showBookmarks:r})),children:"Show Bookmarks"}),e.jsx(y,{checked:t.showFullURLs,onCheckedChange:r=>n(o=>({...o,showFullURLs:r})),children:"Show Full URLs"}),e.jsx(d,{}),e.jsx(s,{children:"Reload"})]})]})},parameters:{docs:{description:{story:"Context menu with checkbox items for toggleable options."}}}},O={render:()=>{const[t,n]=R.useState("list");return e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for view options"}),e.jsxs(f,{children:[e.jsx(v,{children:"View Mode"}),e.jsx(d,{}),e.jsxs(D,{value:t,onValueChange:n,children:[e.jsx(h,{value:"list",children:"List View"}),e.jsx(h,{value:"grid",children:"Grid View"}),e.jsx(h,{value:"cards",children:"Card View"})]}),e.jsx(d,{}),e.jsx(s,{children:"Refresh"})]})]})},parameters:{docs:{description:{story:"Context menu with radio group for mutually exclusive options."}}}},A={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for submenu"}),e.jsxs(f,{children:[e.jsx(s,{children:"New File"}),e.jsx(s,{children:"New Folder"}),e.jsx(d,{}),e.jsxs(L,{children:[e.jsx(V,{children:"Open With"}),e.jsxs($,{children:[e.jsx(s,{children:"VS Code"}),e.jsx(s,{children:"Notepad"}),e.jsx(s,{children:"Notepad++"}),e.jsx(d,{}),e.jsx(s,{children:"Choose Default Program..."})]})]}),e.jsxs(L,{children:[e.jsx(V,{children:"Send To"}),e.jsxs($,{children:[e.jsx(s,{children:"Desktop"}),e.jsx(s,{children:"Documents"}),e.jsx(s,{children:"Mail Recipient"}),e.jsx(d,{}),e.jsx(s,{children:"Compressed Folder"})]})]}),e.jsx(d,{}),e.jsx(s,{children:"Properties"})]})]}),parameters:{docs:{description:{story:"Context menu with nested submenus for hierarchical actions."}}}},E={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for organized menu"}),e.jsxs(f,{children:[e.jsxs(j,{children:[e.jsx(v,{children:"File Operations"}),e.jsxs(s,{children:["New",e.jsx(i,{children:"⌘N"})]}),e.jsxs(s,{children:["Open",e.jsx(i,{children:"⌘O"})]}),e.jsxs(s,{children:["Save",e.jsx(i,{children:"⌘S"})]})]}),e.jsx(d,{}),e.jsxs(j,{children:[e.jsx(v,{children:"Edit Operations"}),e.jsxs(s,{children:["Undo",e.jsx(i,{children:"⌘Z"})]}),e.jsxs(s,{children:["Redo",e.jsx(i,{children:"⌘Y"})]})]}),e.jsx(d,{}),e.jsx(s,{disabled:!0,children:"Disabled Item"})]})]}),parameters:{docs:{description:{story:"Context menu with grouped items, labels, and disabled states."}}}},G={render:()=>{const[t,n]=R.useState(!0),[r,o]=R.useState(!1),[a,m]=R.useState("100");return e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-40 tw:w-80 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:bg-muted/50 tw:text-sm",children:"Right click for complete example"}),e.jsxs(f,{className:"tw:w-64",children:[e.jsxs(j,{children:[e.jsxs(s,{children:["Back",e.jsx(i,{children:"⌘["})]}),e.jsxs(s,{children:["Forward",e.jsx(i,{children:"⌘]"})]}),e.jsxs(s,{children:["Reload",e.jsx(i,{children:"⌘R"})]})]}),e.jsx(d,{}),e.jsxs(j,{children:[e.jsx(v,{children:"View"}),e.jsxs(y,{checked:t,onCheckedChange:n,children:["Show Bookmarks",e.jsx(i,{children:"⌘⇧B"})]}),e.jsx(y,{checked:r,onCheckedChange:o,children:"Show Toolbar"})]}),e.jsx(d,{}),e.jsxs(j,{children:[e.jsx(v,{children:"Zoom"}),e.jsxs(D,{value:a,onValueChange:m,children:[e.jsx(h,{value:"50",children:"50%"}),e.jsx(h,{value:"75",children:"75%"}),e.jsx(h,{value:"100",children:"100%"}),e.jsx(h,{value:"125",children:"125%"}),e.jsx(h,{value:"150",children:"150%"})]})]}),e.jsx(d,{}),e.jsxs(L,{children:[e.jsx(V,{children:"Developer Tools"}),e.jsxs($,{children:[e.jsxs(s,{children:["Inspect Element",e.jsx(i,{children:"⌘⇧C"})]}),e.jsxs(s,{children:["Console",e.jsx(i,{children:"⌘⇧J"})]}),e.jsxs(s,{children:["Sources",e.jsx(i,{children:"⌘⇧I"})]}),e.jsx(d,{}),e.jsx(s,{children:"View Page Source"})]})]}),e.jsx(d,{}),e.jsxs(s,{children:["Print",e.jsx(i,{children:"⌘P"})]})]})]})},parameters:{docs:{description:{story:"A comprehensive example showcasing all context menu features: groups, labels, checkboxes, radio items, submenus, shortcuts, and disabled states."}}}};var z,F,U;_.parameters={..._.parameters,docs:{...(z=_.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <ContextMenuTrigger className="tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  parameters: {
    docs: {
      description: {
        story: 'A basic context menu with simple menu items.'
      }
    }
  }
}`,...(U=(F=_.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};var W,q,Z;T.parameters={...T.parameters,docs:{...(W=T.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <ContextMenuTrigger className="tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm">
        Right click for shortcuts
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Select All
          <ContextMenuShortcut>⌘A</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  parameters: {
    docs: {
      description: {
        story: 'Context menu with keyboard shortcuts displayed.'
      }
    }
  }
}`,...(Z=(q=T.parameters)==null?void 0:q.docs)==null?void 0:Z.source}}};var X,Y,H;P.parameters={...P.parameters,docs:{...(X=P.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = React.useState({
      showBookmarks: true,
      showFullURLs: false
    });
    return <ContextMenu>
        <ContextMenuTrigger className="tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm">
          Right click for options
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View Options</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={checked.showBookmarks} onCheckedChange={checkedValue => setChecked(prev => ({
          ...prev,
          showBookmarks: checkedValue
        }))}>
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={checked.showFullURLs} onCheckedChange={checkedValue => setChecked(prev => ({
          ...prev,
          showFullURLs: checkedValue
        }))}>
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu with checkbox items for toggleable options.'
      }
    }
  }
}`,...(H=(Y=P.parameters)==null?void 0:Y.docs)==null?void 0:H.source}}};var J,K,Q;O.parameters={...O.parameters,docs:{...(J=O.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    const [selectedView, setSelectedView] = React.useState('list');
    return <ContextMenu>
        <ContextMenuTrigger className="tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm">
          Right click for view options
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View Mode</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={selectedView} onValueChange={setSelectedView}>
            <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="cards">Card View</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem>Refresh</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu with radio group for mutually exclusive options.'
      }
    }
  }
}`,...(Q=(K=O.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var ee,te,ne;A.parameters={...A.parameters,docs:{...(ee=A.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <ContextMenuTrigger className="tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm">
        Right click for submenu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New File</ContextMenuItem>
        <ContextMenuItem>New Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Open With</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>VS Code</ContextMenuItem>
            <ContextMenuItem>Notepad</ContextMenuItem>
            <ContextMenuItem>Notepad++</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Choose Default Program...</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Send To</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Desktop</ContextMenuItem>
            <ContextMenuItem>Documents</ContextMenuItem>
            <ContextMenuItem>Mail Recipient</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Compressed Folder</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Properties</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  parameters: {
    docs: {
      description: {
        story: 'Context menu with nested submenus for hierarchical actions.'
      }
    }
  }
}`,...(ne=(te=A.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,re,se;E.parameters={...E.parameters,docs:{...(oe=E.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <ContextMenuTrigger className="tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm">
        Right click for organized menu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>File Operations</ContextMenuLabel>
          <ContextMenuItem>
            New
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Open
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Edit Operations</ContextMenuLabel>
          <ContextMenuItem>
            Undo
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Redo
            <ContextMenuShortcut>⌘Y</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Disabled Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  parameters: {
    docs: {
      description: {
        story: 'Context menu with grouped items, labels, and disabled states.'
      }
    }
  }
}`,...(se=(re=E.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ae,ue,ie;G.parameters={...G.parameters,docs:{...(ae=G.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [toolbar, setToolbar] = React.useState(false);
    const [zoom, setZoom] = React.useState('100');
    return <ContextMenu>
        <ContextMenuTrigger className="tw:flex tw:h-40 tw:w-80 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:bg-muted/50 tw:text-sm">
          Right click for complete example
        </ContextMenuTrigger>
        <ContextMenuContent className="tw:w-64">
          <ContextMenuGroup>
            <ContextMenuItem>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>View</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
              Show Bookmarks
              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={toolbar} onCheckedChange={setToolbar}>
              Show Toolbar
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>Zoom</ContextMenuLabel>
            <ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
              <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="75">75%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="125">125%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="150">150%</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Developer Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>
                Inspect Element
                <ContextMenuShortcut>⌘⇧C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Console
                <ContextMenuShortcut>⌘⇧J</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Sources
                <ContextMenuShortcut>⌘⇧I</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>View Page Source</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Print
            <ContextMenuShortcut>⌘P</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example showcasing all context menu features: groups, labels, checkboxes, radio items, submenus, shortcuts, and disabled states.'
      }
    }
  }
}`,...(ie=(ue=G.parameters)==null?void 0:ue.docs)==null?void 0:ie.source}}};const Xt=["Default","WithShortcuts","WithCheckboxItems","WithRadioGroup","WithSubmenu","WithGroupsAndLabels","ComplexExample"];export{G as ComplexExample,_ as Default,P as WithCheckboxItems,E as WithGroupsAndLabels,O as WithRadioGroup,T as WithShortcuts,A as WithSubmenu,Xt as __namedExportsOrder,Zt as default};
