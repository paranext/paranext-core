import{r as u,j as e,e as R}from"./iframe-CHhPi5X4.js";import{c as C}from"./utils-BPbySc-g.js";import{Z as de}from"./z-index-CoNkaVR8.js";import{I as ce}from"./IconCheck-XPneMt9f.js";import{R as Pe,A as Oe,P as Ee,C as Ae,G as Ge,I as Le,S as Ve,L as Be,a as De,b as $e,c as ze,d as Fe,f as Ue,g as We,h as qe,e as xe,i as Ze,j as Xe}from"./IconChevronRight-BG6NGVnP.js";import{c as k,u as Ye}from"./index-BG6beUUX.js";import{c as He}from"./index-ChZnaHK1.js";import{P as Je}from"./index-DTp94Tkq.js";import{u as Ke}from"./index-DE0T7zi7.js";import"./preload-helper-CTOgD26E.js";import"./createReactComponent-Dpk_bAcX.js";import"./index-Xj5u3Nd-.js";import"./index-Y5MmIdP8.js";import"./index-D0pSp-5U.js";import"./index-CTpBvW4F.js";import"./index-_DUc0tCl.js";import"./index-Sq3KJa9M.js";import"./index-DM1D4CiN.js";import"./index-Dxok0JNC.js";import"./index-Cdp7Er45.js";import"./index-CCUAvMc6.js";var D="ContextMenu",[Qe]=He(D,[xe]),c=xe(),[et,le]=Qe(D),me=t=>{const{__scopeContextMenu:n,children:o,onOpenChange:r,dir:a,modal:m=!0}=t,[w,x]=u.useState(!1),p=c(n),S=Ke(r),l=u.useCallback(I=>{x(I),S(I)},[S]);return e.jsx(et,{scope:n,open:w,onOpenChange:l,modal:m,children:e.jsx(Pe,{...p,dir:a,open:w,onOpenChange:l,modal:m,children:o})})};me.displayName=D;var pe="ContextMenuTrigger",we=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,disabled:r=!1,...a}=t,m=le(pe,o),w=c(o),x=u.useRef({x:0,y:0}),p=u.useRef({getBoundingClientRect:()=>DOMRect.fromRect({width:0,height:0,...x.current})}),S=u.useRef(0),l=u.useCallback(()=>window.clearTimeout(S.current),[]),I=b=>{x.current={x:b.clientX,y:b.clientY},m.onOpenChange(!0)};return u.useEffect(()=>l,[l]),u.useEffect(()=>void(r&&l()),[r,l]),e.jsxs(e.Fragment,{children:[e.jsx(Oe,{...w,virtualRef:p}),e.jsx(Je.span,{"data-state":m.open?"open":"closed","data-disabled":r?"":void 0,...a,ref:n,style:{WebkitTouchCallout:"none",...t.style},onContextMenu:r?t.onContextMenu:k(t.onContextMenu,b=>{l(),I(b),b.preventDefault()}),onPointerDown:r?t.onPointerDown:k(t.onPointerDown,_(b=>{l(),S.current=window.setTimeout(()=>I(b),700)})),onPointerMove:r?t.onPointerMove:k(t.onPointerMove,_(l)),onPointerCancel:r?t.onPointerCancel:k(t.onPointerCancel,_(l)),onPointerUp:r?t.onPointerUp:k(t.onPointerUp,_(l))})]})});we.displayName=pe;var tt="ContextMenuPortal",Ce=t=>{const{__scopeContextMenu:n,...o}=t,r=c(n);return e.jsx(Ee,{...r,...o})};Ce.displayName=tt;var he="ContextMenuContent",Me=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=le(he,o),m=c(o),w=u.useRef(!1);return e.jsx(Ae,{...m,...r,ref:n,side:"right",sideOffset:2,align:"start",onCloseAutoFocus:x=>{var p;(p=t.onCloseAutoFocus)==null||p.call(t,x),!x.defaultPrevented&&w.current&&x.preventDefault(),w.current=!1},onInteractOutside:x=>{var p;(p=t.onInteractOutside)==null||p.call(t,x),!x.defaultPrevented&&!a.modal&&(w.current=!0)},style:{...t.style,"--radix-context-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-context-menu-content-available-width":"var(--radix-popper-available-width)","--radix-context-menu-content-available-height":"var(--radix-popper-available-height)","--radix-context-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-context-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Me.displayName=he;var nt="ContextMenuGroup",ge=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(Ge,{...a,...r,ref:n})});ge.displayName=nt;var ot="ContextMenuLabel",fe=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(Be,{...a,...r,ref:n})});fe.displayName=ot;var rt="ContextMenuItem",be=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(Le,{...a,...r,ref:n})});be.displayName=rt;var st="ContextMenuCheckboxItem",ve=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(De,{...a,...r,ref:n})});ve.displayName=st;var at="ContextMenuRadioGroup",je=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(ze,{...a,...r,ref:n})});je.displayName=at;var ut="ContextMenuRadioItem",Se=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(Fe,{...a,...r,ref:n})});Se.displayName=ut;var it="ContextMenuItemIndicator",Ie=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx($e,{...a,...r,ref:n})});Ie.displayName=it;var dt="ContextMenuSeparator",ke=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(Ve,{...a,...r,ref:n})});ke.displayName=dt;var ct="ContextMenuArrow",xt=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(Ze,{...a,...r,ref:n})});xt.displayName=ct;var Re="ContextMenuSub",ye=t=>{const{__scopeContextMenu:n,children:o,onOpenChange:r,open:a,defaultOpen:m}=t,w=c(n),[x,p]=Ye({prop:a,defaultProp:m??!1,onChange:r,caller:Re});return e.jsx(Ue,{...w,open:x,onOpenChange:p,children:o})};ye.displayName=Re;var lt="ContextMenuSubTrigger",_e=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(We,{...a,...r,ref:n})});_e.displayName=lt;var mt="ContextMenuSubContent",Ne=u.forwardRef((t,n)=>{const{__scopeContextMenu:o,...r}=t,a=c(o);return e.jsx(qe,{...a,...r,ref:n,style:{...t.style,"--radix-context-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-context-menu-content-available-width":"var(--radix-popper-available-width)","--radix-context-menu-content-available-height":"var(--radix-popper-available-height)","--radix-context-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-context-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Ne.displayName=mt;function _(t){return n=>n.pointerType!=="mouse"?t(n):void 0}var pt=me,wt=we,Ct=Ce,ht=Me,Mt=ge,gt=fe,ft=be,bt=ve,vt=je,jt=Se,Te=Ie,St=ke,It=ye,kt=_e,Rt=Ne;function M({...t}){return e.jsx(pt,{"data-slot":"context-menu",...t})}function g({className:t,...n}){return e.jsx(wt,{"data-slot":"context-menu-trigger",className:C("tw:select-none",t),...n})}function j({...t}){return e.jsx(Mt,{"data-slot":"context-menu-group",...t})}function L({...t}){return e.jsx(It,{"data-slot":"context-menu-sub",...t})}function $({...t}){return e.jsx(vt,{"data-slot":"context-menu-radio-group",...t})}function f({className:t,style:n,...o}){return e.jsx(Ct,{children:e.jsx(ht,{"data-slot":"context-menu-content",className:C("pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",t),style:{zIndex:de,...n},...o})})}function s({className:t,inset:n,variant:o="default",...r}){return e.jsx(ft,{"data-slot":"context-menu-item","data-inset":n,"data-variant":o,className:C("pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",t),...r})}function V({className:t,inset:n,children:o,...r}){return e.jsxs(kt,{"data-slot":"context-menu-sub-trigger","data-inset":n,className:C("pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t),...r,children:[o,e.jsx(Xe,{className:"tw:ms-auto"})]})}function B({className:t,style:n,...o}){return e.jsx(Rt,{"data-slot":"context-menu-sub-content",className:C("pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",t),style:{zIndex:de,...n},...o})}function y({className:t,children:n,checked:o,inset:r,...a}){return e.jsxs(bt,{"data-slot":"context-menu-checkbox-item","data-inset":r,className:C("pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t),checked:o,...a,children:[e.jsx("span",{className:"tw:pointer-events-none tw:absolute tw:end-2",children:e.jsx(Te,{children:e.jsx(ce,{})})}),n]})}function h({className:t,children:n,inset:o,...r}){return e.jsxs(jt,{"data-slot":"context-menu-radio-item","data-inset":o,className:C("pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t),...r,children:[e.jsx("span",{className:"tw:pointer-events-none tw:absolute tw:end-2",children:e.jsx(Te,{children:e.jsx(ce,{})})}),n]})}function v({className:t,inset:n,...o}){return e.jsx(gt,{"data-slot":"context-menu-label","data-inset":n,className:C("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",t),...o})}function d({className:t,...n}){return e.jsx(St,{"data-slot":"context-menu-separator",className:C("pr-twp tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",t),...n})}function i({className:t,...n}){return e.jsx("span",{"data-slot":"context-menu-shortcut",className:C("pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",t),...n})}M.__docgenInfo={description:`Context Menu component displays a menu to the user — such as a set of actions or functions,
triggered by a right-click or long-press.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/context-menu}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/context-menu}`,methods:[],displayName:"ContextMenu"};g.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuTrigger"};f.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuContent",props:{side:{required:!1,tsType:{name:"union",raw:"'top' | 'right' | 'bottom' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'right'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"}]},description:""}}};s.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuItem",props:{inset:{required:!1,tsType:{name:"boolean"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'destructive'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'destructive'"}]},description:"",defaultValue:{value:"'default'",computed:!1}}}};y.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuCheckboxItem",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuRadioItem",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};v.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuLabel",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSeparator"};i.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuShortcut"};j.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuGroup"};L.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSub"};B.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSubContent"};V.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuSubTrigger",props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};$.__docgenInfo={description:"@inheritdoc ContextMenu",methods:[],displayName:"ContextMenuRadioGroup"};const Yt={title:"Shadcn/ContextMenu",component:M,tags:["autodocs"],decorators:[t=>e.jsx("div",{className:"tw:p-8",children:e.jsx(t,{})})],parameters:{docs:{description:{component:"Context Menu component displays a menu to the user — such as a set of actions or functions, triggered by right-clicking on an element."}}}},N={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click here"}),e.jsxs(f,{children:[e.jsx(s,{children:"Profile"}),e.jsx(s,{children:"Settings"}),e.jsx(d,{}),e.jsx(s,{children:"Logout"})]})]}),parameters:{docs:{description:{story:"A basic context menu with simple menu items."}}}},T={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for shortcuts"}),e.jsxs(f,{children:[e.jsxs(s,{children:["Cut",e.jsx(i,{children:"⌘X"})]}),e.jsxs(s,{children:["Copy",e.jsx(i,{children:"⌘C"})]}),e.jsxs(s,{children:["Paste",e.jsx(i,{children:"⌘V"})]}),e.jsx(d,{}),e.jsxs(s,{children:["Select All",e.jsx(i,{children:"⌘A"})]})]})]}),parameters:{docs:{description:{story:"Context menu with keyboard shortcuts displayed."}}}},P={render:()=>{const[t,n]=R.useState({showBookmarks:!0,showFullURLs:!1});return e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for options"}),e.jsxs(f,{children:[e.jsx(v,{children:"View Options"}),e.jsx(d,{}),e.jsx(y,{checked:t.showBookmarks,onCheckedChange:o=>n(r=>({...r,showBookmarks:o})),children:"Show Bookmarks"}),e.jsx(y,{checked:t.showFullURLs,onCheckedChange:o=>n(r=>({...r,showFullURLs:o})),children:"Show Full URLs"}),e.jsx(d,{}),e.jsx(s,{children:"Reload"})]})]})},parameters:{docs:{description:{story:"Context menu with checkbox items for toggleable options."}}}},O={render:()=>{const[t,n]=R.useState("list");return e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for view options"}),e.jsxs(f,{children:[e.jsx(v,{children:"View Mode"}),e.jsx(d,{}),e.jsxs($,{value:t,onValueChange:n,children:[e.jsx(h,{value:"list",children:"List View"}),e.jsx(h,{value:"grid",children:"Grid View"}),e.jsx(h,{value:"cards",children:"Card View"})]}),e.jsx(d,{}),e.jsx(s,{children:"Refresh"})]})]})},parameters:{docs:{description:{story:"Context menu with radio group for mutually exclusive options."}}}},E={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for submenu"}),e.jsxs(f,{children:[e.jsx(s,{children:"New File"}),e.jsx(s,{children:"New Folder"}),e.jsx(d,{}),e.jsxs(L,{children:[e.jsx(V,{children:"Open With"}),e.jsxs(B,{children:[e.jsx(s,{children:"VS Code"}),e.jsx(s,{children:"Notepad"}),e.jsx(s,{children:"Notepad++"}),e.jsx(d,{}),e.jsx(s,{children:"Choose Default Program..."})]})]}),e.jsxs(L,{children:[e.jsx(V,{children:"Send To"}),e.jsxs(B,{children:[e.jsx(s,{children:"Desktop"}),e.jsx(s,{children:"Documents"}),e.jsx(s,{children:"Mail Recipient"}),e.jsx(d,{}),e.jsx(s,{children:"Compressed Folder"})]})]}),e.jsx(d,{}),e.jsx(s,{children:"Properties"})]})]}),parameters:{docs:{description:{story:"Context menu with nested submenus for hierarchical actions."}}}},A={render:()=>e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-32 tw:w-64 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:text-sm",children:"Right click for organized menu"}),e.jsxs(f,{children:[e.jsxs(j,{children:[e.jsx(v,{children:"File Operations"}),e.jsxs(s,{children:["New",e.jsx(i,{children:"⌘N"})]}),e.jsxs(s,{children:["Open",e.jsx(i,{children:"⌘O"})]}),e.jsxs(s,{children:["Save",e.jsx(i,{children:"⌘S"})]})]}),e.jsx(d,{}),e.jsxs(j,{children:[e.jsx(v,{children:"Edit Operations"}),e.jsxs(s,{children:["Undo",e.jsx(i,{children:"⌘Z"})]}),e.jsxs(s,{children:["Redo",e.jsx(i,{children:"⌘Y"})]})]}),e.jsx(d,{}),e.jsx(s,{disabled:!0,children:"Disabled Item"})]})]}),parameters:{docs:{description:{story:"Context menu with grouped items, labels, and disabled states."}}}},G={render:()=>{const[t,n]=R.useState(!0),[o,r]=R.useState(!1),[a,m]=R.useState("100");return e.jsxs(M,{children:[e.jsx(g,{className:"tw:flex tw:h-40 tw:w-80 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-dashed tw:bg-muted/50 tw:text-sm",children:"Right click for complete example"}),e.jsxs(f,{className:"tw:w-64",children:[e.jsxs(j,{children:[e.jsxs(s,{children:["Back",e.jsx(i,{children:"⌘["})]}),e.jsxs(s,{children:["Forward",e.jsx(i,{children:"⌘]"})]}),e.jsxs(s,{children:["Reload",e.jsx(i,{children:"⌘R"})]})]}),e.jsx(d,{}),e.jsxs(j,{children:[e.jsx(v,{children:"View"}),e.jsxs(y,{checked:t,onCheckedChange:n,children:["Show Bookmarks",e.jsx(i,{children:"⌘⇧B"})]}),e.jsx(y,{checked:o,onCheckedChange:r,children:"Show Toolbar"})]}),e.jsx(d,{}),e.jsxs(j,{children:[e.jsx(v,{children:"Zoom"}),e.jsxs($,{value:a,onValueChange:m,children:[e.jsx(h,{value:"50",children:"50%"}),e.jsx(h,{value:"75",children:"75%"}),e.jsx(h,{value:"100",children:"100%"}),e.jsx(h,{value:"125",children:"125%"}),e.jsx(h,{value:"150",children:"150%"})]})]}),e.jsx(d,{}),e.jsxs(L,{children:[e.jsx(V,{children:"Developer Tools"}),e.jsxs(B,{children:[e.jsxs(s,{children:["Inspect Element",e.jsx(i,{children:"⌘⇧C"})]}),e.jsxs(s,{children:["Console",e.jsx(i,{children:"⌘⇧J"})]}),e.jsxs(s,{children:["Sources",e.jsx(i,{children:"⌘⇧I"})]}),e.jsx(d,{}),e.jsx(s,{children:"View Page Source"})]})]}),e.jsx(d,{}),e.jsxs(s,{children:["Print",e.jsx(i,{children:"⌘P"})]})]})]})},parameters:{docs:{description:{story:"A comprehensive example showcasing all context menu features: groups, labels, checkboxes, radio items, submenus, shortcuts, and disabled states."}}}};var z,F,U;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(U=(F=N.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};var W,q,Z;T.parameters={...T.parameters,docs:{...(W=T.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(Q=(K=O.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var ee,te,ne;E.parameters={...E.parameters,docs:{...(ee=E.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(ne=(te=E.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,re,se;A.parameters={...A.parameters,docs:{...(oe=A.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(se=(re=A.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ae,ue,ie;G.parameters={...G.parameters,docs:{...(ae=G.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(ie=(ue=G.parameters)==null?void 0:ue.docs)==null?void 0:ie.source}}};const Ht=["Default","WithShortcuts","WithCheckboxItems","WithRadioGroup","WithSubmenu","WithGroupsAndLabels","ComplexExample"];export{G as ComplexExample,N as Default,P as WithCheckboxItems,A as WithGroupsAndLabels,O as WithRadioGroup,T as WithShortcuts,E as WithSubmenu,Ht as __namedExportsOrder,Yt as default};
