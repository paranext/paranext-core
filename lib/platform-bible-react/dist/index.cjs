"use strict";var pi=Object.defineProperty;var mi=(t,e,r)=>e in t?pi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Gt=(t,e,r)=>mi(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),zt=require("cmdk"),R=require("lucide-react"),fi=require("clsx"),hi=require("tailwind-merge"),gi=require("@radix-ui/react-dialog"),st=require("@sillsdev/scripture"),_=require("platform-bible-utils"),sn=require("@radix-ui/react-slot"),Ie=require("class-variance-authority"),xi=require("@radix-ui/react-popover"),bi=require("@radix-ui/react-label"),vi=require("@radix-ui/react-radio-group"),x=require("lexical"),Go=require("@radix-ui/react-tooltip"),jr=require("@lexical/rich-text"),mo=require("react-dom"),yi=require("@lexical/table"),ji=require("@radix-ui/react-toggle-group"),Ni=require("@radix-ui/react-toggle"),Vo=require("@lexical/headless"),ki=require("@radix-ui/react-separator"),_i=require("@radix-ui/react-avatar"),Bo=require("@radix-ui/react-dropdown-menu"),Bt=require("@tanstack/react-table"),Ci=require("@radix-ui/react-select"),Si=require("markdown-to-jsx"),Zt=require("@eten-tech-foundation/platform-editor"),Ei=require("@radix-ui/react-checkbox"),Ri=require("@radix-ui/react-tabs"),Ti=require("@radix-ui/react-menubar"),Ii=require("react-hotkeys-hook"),Mi=require("@radix-ui/react-context-menu"),oe=require("vaul"),Di=require("@radix-ui/react-progress"),Oi=require("react-resizable-panels"),zo=require("sonner"),Ai=require("@radix-ui/react-slider"),Pi=require("@radix-ui/react-switch");function Nt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Ut=Nt(gi),en=Nt(xi),Ko=Nt(bi),gn=Nt(vi),Ve=Nt(Go),Jn=Nt(ji),qo=Nt(Ni),Ho=Nt(ki),an=Nt(_i),dt=Nt(Bo),ft=Nt(Ci),Nr=Nt(Ei),Kt=Nt(Ri),wt=Nt(Ti),ut=Nt(Mi),kr=Nt(Di),Rr=Nt(Oi),fn=Nt(Ai),_r=Nt(Pi),Li=hi.extendTailwindMerge({prefix:"tw-"});function f(...t){return Li(fi.clsx(t))}const qe=250,Tr=300,Qn=400,Uo=450,Yo=500,$i="layoutDirection";function vt(){const t=localStorage.getItem($i);return t==="rtl"?t:"ltr"}const $n=Ut.Root,Fi=Ut.Trigger,Xo=Ut.Portal,Gi=Ut.Close,Ir=l.forwardRef(({className:t,style:e,...r},o)=>n.jsx(Ut.Overlay,{ref:o,className:f("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:Uo,...e},...r}));Ir.displayName=Ut.Overlay.displayName;const xn=l.forwardRef(({className:t,children:e,overlayClassName:r,style:o,...s},a)=>{const i=vt();return n.jsxs(Xo,{children:[n.jsx(Ir,{className:r}),n.jsxs(Ut.Content,{ref:a,className:f("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:Yo,...o},...s,dir:i,children:[e,n.jsxs(Ut.Close,{className:f("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":i==="ltr"},{"tw-left-4":i==="rtl"}),children:[n.jsx(R.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});xn.displayName=Ut.Content.displayName;function bn({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}bn.displayName="DialogHeader";function Fn({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}Fn.displayName="DialogFooter";const vn=l.forwardRef(({className:t,...e},r)=>n.jsx(Ut.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));vn.displayName=Ut.Title.displayName;const Wo=l.forwardRef(({className:t,...e},r)=>n.jsx(Ut.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));Wo.displayName=Ut.Description.displayName;const se=l.forwardRef(({className:t,...e},r)=>n.jsx(zt.Command,{ref:r,className:f("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));se.displayName=zt.Command.displayName;const Me=l.forwardRef(({className:t,onKeyDown:e,...r},o)=>{const s=vt(),a=l.useCallback(i=>{if(e==null||e(i),i.defaultPrevented||i.key!==" "||i.currentTarget.value!=="")return;const c=i.currentTarget.closest("[cmdk-root]"),w=c==null?void 0:c.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');w&&(i.preventDefault(),i.stopPropagation(),w.click())},[e]);return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:s,children:[n.jsx(R.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(zt.Command.Input,{ref:o,className:f("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),onKeyDown:a,...r})]})});Me.displayName=zt.Command.Input.displayName;const ae=l.forwardRef(({className:t,...e},r)=>n.jsx(zt.Command.List,{ref:r,className:f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));ae.displayName=zt.Command.List.displayName;const He=l.forwardRef((t,e)=>n.jsx(zt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));He.displayName=zt.Command.Empty.displayName;const Yt=l.forwardRef(({className:t,...e},r)=>n.jsx(zt.Command.Group,{ref:r,className:f("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Yt.displayName=zt.Command.Group.displayName;const tr=l.forwardRef(({className:t,...e},r)=>n.jsx(zt.Command.Separator,{ref:r,className:f("tw--mx-1 tw-h-px tw-bg-border",t),...e}));tr.displayName=zt.Command.Separator.displayName;const Xt=l.forwardRef(({className:t,...e},r)=>n.jsx(zt.Command.Item,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Xt.displayName=zt.Command.Item.displayName;function Zo({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Zo.displayName="CommandShortcut";const Jo=(t,e,r,o,s)=>{switch(t){case _.Section.OT:return e??"Old Testament";case _.Section.NT:return r??"New Testament";case _.Section.DC:return o??"Deuterocanon";case _.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Vi=(t,e,r,o,s)=>{switch(t){case _.Section.OT:return e??"OT";case _.Section.NT:return r??"NT";case _.Section.DC:return o??"DC";case _.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ce(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??st.Canon.bookIdToEnglishName(t)}function Mr(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Qo=st.Canon.allBookIds.filter(t=>!st.Canon.isObsolete(st.Canon.bookIdToNumber(t))),te=Object.fromEntries(Qo.map(t=>[t,st.Canon.bookIdToEnglishName(t)]));function Dr(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=st.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(_.includes(s.toLowerCase(),o)||_.includes(t.toLowerCase(),o)||(a?_.includes(a.localizedName.toLowerCase(),o)||_.includes(a.localizedId.toLowerCase(),o):!1))}const ts=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:w,disabled:d=!1},u)=>{const m=l.useRef(!1),h=()=>{d||(m.current||r==null||r(t),setTimeout(()=>{m.current=!1},100))},p=v=>{if(d){v.preventDefault();return}m.current=!0,o?o(v):r==null||r(t)},g=l.useMemo(()=>Ce(t,c),[t,c]),y=l.useMemo(()=>Mr(t,c),[t,c]);return n.jsx("div",{className:f("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===_.Section.OT,"tw-border-s-purple-200":s===_.Section.NT,"tw-border-s-indigo-200":s===_.Section.DC,"tw-border-s-amber-200":s===_.Section.Extra}),children:n.jsxs(Xt,{ref:u,value:w||`${t} ${st.Canon.bookIdToEnglishName(t)}`,onSelect:h,onMouseDown:p,role:"option","aria-selected":e,"aria-disabled":d||void 0,"aria-label":`${st.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,disabled:d,className:f(a,d&&"tw-cursor-not-allowed tw-opacity-50"),children:[i&&n.jsx(R.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:g}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:y})]})})}),Or=Ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const i=o?sn.Slot:"button";return n.jsx(i,{className:f(Or({variant:e,size:r,className:t})),ref:a,...s})});B.displayName="Button";const ie=en.Root,ge=en.Trigger,es=en.Anchor,ns=l.createContext(null);function Mn({container:t,children:e}){return n.jsx(ns.Provider,{value:t,children:e})}const Qt=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},a)=>{const i=vt(),c=l.useContext(ns);return n.jsx(en.Portal,{container:c??void 0,children:n.jsx(en.Content,{ref:a,align:e,sideOffset:r,className:f("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:qe,...o},...s,dir:i})})});Qt.displayName=en.Content.displayName;function rs(t,e,r){return`${t} ${te[t]}${e?` ${Mr(t,e)} ${Ce(t,e)}`:""}`}function os({recentSearches:t,onSearchItemSelect:e,renderItem:r=u=>String(u),getItemKey:o=u=>String(u),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i,classNameForItems:c,buttonClassName:w="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:d="ghost"}){const[u,m]=l.useState(!1);if(t.length===0)return;const h=p=>{e(p),m(!1)};return n.jsxs(ie,{open:u,onOpenChange:m,children:[n.jsx(ge,{asChild:!0,children:n.jsx(B,{variant:d,size:"icon",className:w,"aria-label":s,children:n.jsx(R.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Qt,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(se,{children:n.jsx(ae,{children:n.jsx(Yt,{heading:a,children:t.map(p=>n.jsxs(Xt,{onSelect:()=>h(p),className:f("tw-flex tw-items-center",c),children:[n.jsx(R.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function Bi(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),i=[s,...a.slice(0,o-1)];e(i)}}const Dn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},zi=[Dn.BOOK_ONLY,Dn.BOOK_CHAPTER,Dn.BOOK_CHAPTER_VERSE];function Ki(t){return Dn.BOOK_CHAPTER_VERSE.test(t.trim())}function fo(t,e){return st.Canon.bookIdToNumber(t)<st.Canon.bookIdToNumber(e.book)}function qi(t,e,r){const o=st.Canon.bookIdToNumber(t)-st.Canon.bookIdToNumber(r.book);return o<0?!0:o>0?!1:e<r.chapterNum}function lr(t,e,r,o){const s=st.Canon.bookIdToNumber(t)-st.Canon.bookIdToNumber(o.book);return s<0?!0:s>0?!1:e<o.chapterNum?!0:e>o.chapterNum?!1:r<o.verseNum}function ho(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function ue(t){return _.getChaptersForBook(st.Canon.bookIdToNumber(t))}function Hi(t,e,r){if(!t.trim()||e.length===0)return;const o=zi.reduce((s,a)=>{if(s)return s;const i=a.exec(t.trim());if(i){const[c,w=void 0,d=void 0]=i.slice(1);let u;const m=e.filter(h=>Dr(h,c,r));if(m.length===1&&([u]=m),!u&&w){if(st.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(u=h)}if(!u&&r){const h=Array.from(r.entries()).find(([,p])=>p.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([u]=h)}}if(!u&&w){const p=(g=>Object.keys(te).find(y=>te[y].toLowerCase()===g.toLowerCase()))(c);if(p&&e.includes(p)&&(u=p),!u&&r){const g=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([u]=g)}}if(u){let h=w?parseInt(w,10):void 0;h&&h>ue(u)&&(h=Math.max(ue(u),1));const p=d?parseInt(d,10):void 0;return{book:u,chapterNum:h,verseNum:p}}}},void 0);if(o)return o}function Ui(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],u=Math.max(ue(d),1);o({book:d,chapterNum:u,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{const w=ue(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const u=e[d+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?R.ChevronsLeft:R.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?R.ChevronLeft:R.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?R.ChevronRight:R.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===ue(t.book)||ue(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?R.ChevronsRight:R.ChevronsLeft}],[t,e,r,s,i,c,a])}function go({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,isChapterDisabled:a,className:i}){if(t)return n.jsx(Yt,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:ue(t)},(c,w)=>w+1).map(c=>{const w=(a==null?void 0:a(c))??!1;return n.jsx(Xt,{value:`${t} ${te[t]||""} ${c}`,onSelect:()=>{w||r(c)},ref:o(c),disabled:w,"aria-disabled":w||void 0,className:f("tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&c===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":((s==null?void 0:s(c))??!1)&&!w},w&&"tw-cursor-not-allowed tw-opacity-40"),children:c},c)})})})}function xo({bookId:t,chapterNum:e,endVerse:r,scrRef:o,onVerseSelect:s,setVerseRef:a,isVerseDimmed:i,isVerseDisabled:c,className:w}){if(!(!t||r<=0))return n.jsx(Yt,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",w),children:Array.from({length:r},(d,u)=>u+1).map(d=>{const u=(c==null?void 0:c(d))??!1;return n.jsx(Xt,{value:`${t} ${te[t]||""} ${e}:${d}`,onSelect:()=>{u||s(d)},ref:a(d),disabled:u,"aria-disabled":u||void 0,className:f("tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===o.book&&e===o.chapterNum&&d===o.verseNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":((i==null?void 0:i(d))??!1)&&!u},u&&"tw-cursor-not-allowed tw-opacity-40"),children:d},d)})})})}function On({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:w,getEndVerse:d,disableReferencesUpTo:u,submitKeys:m,triggerContent:h,triggerVariant:p="outline",onOpenChange:g,onCloseAutoFocus:y,modal:v=!1,align:j="center"}){const I=vt(),[M,T]=l.useState(!1),[G,k]=l.useState(""),[E,C]=l.useState(""),[b,S]=l.useState("books"),[L,F]=l.useState(void 0),[A,$]=l.useState(void 0),[q,U]=l.useState(void 0),[Z,yt]=l.useState(!1),At=l.useRef(null),kt=l.useRef(!1),Q=l.useRef(void 0),pt=l.useRef(void 0),K=l.useRef(void 0),et=l.useRef(void 0),rt=l.useRef({}),at=l.useRef({}),it=l.useCallback(N=>{e(N),c&&c(N)},[e,c]),_t=l.useMemo(()=>o?o():Qo,[o]),Rt=l.useMemo(()=>({[_.Section.OT]:_t.filter(H=>st.Canon.isBookOT(H)),[_.Section.NT]:_t.filter(H=>st.Canon.isBookNT(H)),[_.Section.DC]:_t.filter(H=>st.Canon.isBookDC(H)),[_.Section.Extra]:_t.filter(H=>st.Canon.extraBooks().includes(H))}),[_t]),Pt=l.useMemo(()=>Object.values(Rt).flat(),[Rt]),Ne=l.useMemo(()=>{if(!E.trim())return Rt;const N={[_.Section.OT]:[],[_.Section.NT]:[],[_.Section.DC]:[],[_.Section.Extra]:[]};return[_.Section.OT,_.Section.NT,_.Section.DC,_.Section.Extra].forEach(W=>{N[W]=Rt[W].filter(Ft=>Dr(Ft,E,s))}),N},[Rt,E,s]),P=l.useMemo(()=>Hi(E,Pt,s),[E,Pt,s]),Lt=l.useRef(!1);l.useEffect(()=>{if(!Lt.current){Lt.current=!0;return}g==null||g(M)},[M,g]);const Wt=l.useCallback(()=>{if(P){const N=P.chapterNum??1,H=P.verseNum??1;if(u&&lr(P.book,N,H,u))return;it({book:P.book,chapterNum:N,verseNum:H}),T(!1),C(""),k("")}},[it,P,u]),$t=l.useCallback(N=>{const H=A??(P==null?void 0:P.book),W=q??(P==null?void 0:P.chapterNum);!H||!W||(it({book:H,chapterNum:W,verseNum:N}),T(!1))},[it,A,q,P]),V=l.useCallback(N=>{if(u&&fo(N,u))return;if(ue(N)<=1){it({book:N,chapterNum:1,verseNum:1}),T(!1),C("");return}F(N),S("chapters")},[it,u]),Y=l.useCallback(N=>{const H=b==="chapters"?L:P==null?void 0:P.book;if(H){if(d&&d(H,N)>1){$(H),U(N),S("verses"),k("");return}it({book:H,chapterNum:N,verseNum:1}),T(!1)}},[it,b,L,P,d]),J=l.useCallback(N=>{it(N),T(!1),C("")},[it]),nt=Ui(t,Pt,I,e),lt=l.useCallback(()=>{S("books"),F(void 0),$(void 0),U(void 0),setTimeout(()=>{pt.current&&pt.current.focus()},0)},[]),ct=l.useCallback(()=>{const N=A;$(void 0),U(void 0),N?(F(N),S("chapters"),k("")):lt()},[A,lt]),Ct=l.useCallback(N=>{T(N),N&&(S("books"),F(void 0),$(void 0),U(void 0),C(""))},[]),{otLong:ht,ntLong:gt,dcLong:jt,extraLong:O}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},xt=l.useCallback(N=>Jo(N,ht,gt,jt,O),[ht,gt,jt,O]),mt=l.useCallback(N=>P?!!P.chapterNum&&!N.toString().includes(P.chapterNum.toString()):!1,[P]),be=l.useMemo(()=>_.formatScrRef(t,s?Ce(t.book,s):"English"),[t,s]),De=l.useCallback(N=>H=>{rt.current[N]=H},[]),Ye=l.useCallback(N=>H=>{at.current[N]=H},[]),cn=l.useMemo(()=>Ki(E),[E]),dn=l.useMemo(()=>!d||!P||!P.chapterNum||!cn?!1:d(P.book,P.chapterNum)>0,[d,P,cn]),Oe=l.useCallback(N=>u?fo(N,u):!1,[u]),wn=l.useCallback(N=>H=>u?qi(N,H,u):!1,[u]),Xe=l.useCallback((N,H)=>W=>u?lr(N,H,W,u):!1,[u]),un=(a==null?void 0:a["%webView_bookChapterControl_selectChapter%"])??"Select Chapter",Ae=(a==null?void 0:a["%webView_bookChapterControl_selectVerse%"])??"Select Verse",ar=l.useCallback(N=>{(N.key==="Home"||N.key==="End")&&N.stopPropagation(),m&&m.includes(N.key)&&P&&P.chapterNum!==void 0&&P.verseNum!==void 0&&(N.preventDefault(),N.stopPropagation(),Wt())},[m,P,Wt]),We=l.useCallback(N=>{var ke,Pe,Le;if(N.ctrlKey)return;const{isLetter:H,isDigit:W}=ho(N.key);if((b==="chapters"||b==="verses")&&(N.key===" "||N.key==="Enter")){const Mt=N.target instanceof HTMLElement?N.target:void 0;if(!!(Mt!=null&&Mt.closest('button, a, input, select, textarea, [role="button"]'))){N.stopPropagation();return}const z=(ke=Q.current)==null?void 0:ke.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');if(z){N.preventDefault(),N.stopPropagation(),z.click();return}}if((b==="chapters"||b==="verses")&&(H||W)){N.preventDefault(),N.stopPropagation();return}if(b==="chapters"&&N.key==="Backspace"){N.preventDefault(),N.stopPropagation(),lt();return}if(b==="verses"&&N.key==="Backspace"){N.preventDefault(),N.stopPropagation(),ct();return}const Ft=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(N.key);if(b==="verses"&&Ft){const Mt=A,D=q;if(!Mt||!D||!d)return;const z=d(Mt,D);if(!z)return;(Pe=Q.current)==null||Pe.focus();const X=(()=>{if(!G)return 1;const $e=G.match(/:(\d+)$/);return $e?parseInt($e[1],10):0})();let Dt=X;const ce=6;switch(N.key){case"ArrowLeft":X!==0&&(Dt=X>1?X-1:z);break;case"ArrowRight":X!==0&&(Dt=X<z?X+1:1);break;case"ArrowUp":Dt=X===0?z:Math.max(1,X-ce);break;case"ArrowDown":Dt=X===0?1:Math.min(z,X+ce);break;default:return}Dt!==X&&(N.preventDefault(),N.stopPropagation(),k(`${Mt} ${te[Mt]||""} ${D}:${Dt}`),setTimeout(()=>{const $e=at.current[Dt];$e&&$e.scrollIntoView({block:"nearest",behavior:"smooth"})},0));return}if((b==="chapters"||b==="books"&&P)&&Ft){const Mt=b==="chapters"?L:P==null?void 0:P.book;if(!Mt)return;b==="chapters"&&((Le=Q.current)==null||Le.focus());const D=(()=>{if(!G)return 1;const ce=G.match(/(\d+)$/);return ce?parseInt(ce[1],10):0})(),z=ue(Mt);if(!z)return;let X=D;const Dt=6;switch(N.key){case"ArrowLeft":D!==0&&(X=D>1?D-1:z);break;case"ArrowRight":D!==0&&(X=D<z?D+1:1);break;case"ArrowUp":X=D===0?z:Math.max(1,D-Dt);break;case"ArrowDown":X=D===0?1:Math.min(z,D+Dt);break;default:return}X!==D&&(N.preventDefault(),N.stopPropagation(),k(`${Mt} ${te[Mt]||""} ${X}`),setTimeout(()=>{const ce=rt.current[X];ce&&ce.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,P,lt,ct,L,A,q,d,G]),ir=l.useCallback(N=>{var Ft;if(N.shiftKey||N.key==="Tab"||N.key===" ")return;if(N.key==="Enter"){N.stopPropagation();return}if(N.key==="ArrowUp"||N.key==="ArrowDown"){(Ft=pt.current)==null||Ft.focus();return}const{isLetter:H,isDigit:W}=ho(N.key);(H||W)&&(N.preventDefault(),C(ke=>ke+N.key),pt.current.focus(),yt(!1))},[]);return l.useLayoutEffect(()=>{const N=setTimeout(()=>{if(M&&b==="books"&&K.current&&et.current){const H=K.current,W=et.current,Ft=W.offsetTop,ke=H.clientHeight,Pe=W.clientHeight,Le=Ft-ke/2+Pe/2;H.scrollTo({top:Math.max(0,Le),behavior:"smooth"}),k(rs(t.book))}},0);return()=>{clearTimeout(N)}},[M,b,E,P,t.book]),l.useLayoutEffect(()=>{if(b==="chapters"&&L){const N=L===t.book,H=N?t.chapterNum:1;k(`${L} ${te[L]||""} ${H}`),setTimeout(()=>{if(K.current)if(N){const W=rt.current[t.chapterNum];W&&W.scrollIntoView({block:"center",behavior:"smooth"})}else K.current.scrollTo({top:0});Q.current&&Q.current.focus()},0)}},[b,L,P,t.book,t.chapterNum]),l.useLayoutEffect(()=>{if(b==="verses"&&A&&q!==void 0){const N=A===t.book&&q===t.chapterNum,H=N?t.verseNum:1;k(`${A} ${te[A]||""} ${q}:${H}`),setTimeout(()=>{if(K.current)if(N){const W=at.current[t.verseNum];W&&W.scrollIntoView({block:"center",behavior:"smooth"})}else K.current.scrollTo({top:0});Q.current&&Q.current.focus()},0)}},[b,A,q,t.book,t.chapterNum,t.verseNum]),n.jsxs(ie,{open:M,onOpenChange:Ct,modal:v,children:[n.jsx(ge,{asChild:!0,children:n.jsx(B,{ref:At,"aria-label":"book-chapter-trigger",variant:p,role:"combobox","aria-expanded":M,className:f("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),onClick:N=>{kt.current&&(kt.current=!1,N.preventDefault())},children:h??n.jsx("span",{className:"tw-truncate",children:be})})}),n.jsx(Qt,{id:w,className:"tw-w-[var(--radix-popper-anchor-width,280px)] tw-min-w-[200px] tw-max-w-[280px] tw-p-0",align:j,onKeyDownCapture:We,onKeyDown:N=>N.stopPropagation(),onPointerDownOutside:N=>{const{target:H}=N;At.current&&H instanceof Node&&At.current.contains(H)&&(kt.current=!0,Ct(!1))},onCloseAutoFocus:y,children:n.jsxs(se,{ref:Q,loop:!0,value:G,onValueChange:k,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(Me,{ref:pt,value:E,onValueChange:C,onKeyDown:ar,onFocus:()=>yt(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&n.jsx(os,{recentSearches:i,onSearchItemSelect:J,renderItem:N=>_.formatScrRef(N,"English"),getItemKey:N=>`${N.book}-${N.chapterNum}-${N.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:nt.map(({onClick:N,disabled:H,title:W,icon:Ft})=>n.jsx(B,{variant:"ghost",size:"sm",onClick:()=>{yt(!0),N()},disabled:H,className:"tw-h-10 tw-w-4 tw-p-0",title:W,onKeyDown:ir,children:n.jsx(Ft,{})},W))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:b==="verses"?ct:lt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",children:I==="ltr"?n.jsx(R.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(R.ArrowRight,{className:"tw-h-4 tw-w-4"})}),b==="chapters"&&L&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ce(L,s)}),b==="verses"&&A&&q!==void 0&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:`${Ce(A,s)} ${q}`}),n.jsx("span",{tabIndex:-1,className:"tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",children:b==="verses"?Ae:un})]}),!Z&&n.jsxs(ae,{ref:K,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!P&&Object.entries(Ne).map(([N,H])=>{if(H.length!==0)return n.jsx(Yt,{heading:xt(N),children:H.map(W=>n.jsx(ts,{bookId:W,onSelect:Ft=>V(Ft),section:_.getSectionForBook(W),commandValue:`${W} ${te[W]}`,ref:W===t.book?et:void 0,localizedBookNames:s,disabled:Oe(W)},W))},N)}),P&&n.jsx(Yt,{children:n.jsx(Xt,{value:`${P.book} ${te[P.book]} ${P.chapterNum||""}:${P.verseNum||""})}`,onSelect:Wt,disabled:!!u&&lr(P.book,P.chapterNum??1,P.verseNum??1,u),className:"tw-font-semibold tw-text-primary",children:_.formatScrRef({book:P.book,chapterNum:P.chapterNum??1,verseNum:P.verseNum??1},s?Mr(P.book,s):void 0)},"top-match")}),P&&dn&&P.chapterNum&&d&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:[n.jsx("span",{children:`${Ce(P.book,s)} ${P.chapterNum}`}),n.jsx("span",{children:Ae})]}),n.jsx(xo,{bookId:P.book,chapterNum:P.chapterNum,endVerse:d(P.book,P.chapterNum),scrRef:t,onVerseSelect:$t,setVerseRef:Ye,isVerseDisabled:Xe(P.book,P.chapterNum),className:"tw-px-4 tw-pb-4"})]}),P&&!dn&&ue(P.book)>1&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:[n.jsx("span",{children:Ce(P.book,s)}),n.jsx("span",{children:un})]}),n.jsx(go,{bookId:P.book,scrRef:t,onChapterSelect:Y,setChapterRef:De,isChapterDimmed:mt,isChapterDisabled:wn(P.book),className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&L&&n.jsx(go,{bookId:L,scrRef:t,onChapterSelect:Y,setChapterRef:De,isChapterDisabled:wn(L),className:"tw-p-4"}),b==="verses"&&A&&q!==void 0&&d&&n.jsx(xo,{bookId:A,chapterNum:q,endVerse:d(A,q),scrRef:t,onVerseSelect:$t,setVerseRef:Ye,isVerseDisabled:Xe(A,q),className:"tw-p-4"})]})]})})]})}const Yi=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%","%webView_bookChapterControl_selectChapter%","%webView_bookChapterControl_selectVerse%"]),Xi=Ie.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),bt=l.forwardRef(({className:t,...e},r)=>n.jsx(Ko.Root,{ref:r,className:f("pr-twp",Xi(),t),...e}));bt.displayName=Ko.Root.displayName;const er=l.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(gn.Root,{className:f("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});er.displayName=gn.Root.displayName;const yn=l.forwardRef(({className:t,...e},r)=>n.jsx(gn.Item,{ref:r,className:f("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(gn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(R.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));yn.displayName=gn.Item.displayName;function Wi(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Gn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:a,value:i,onChange:c=()=>{},getOptionLabel:w=Wi,getButtonLabel:d,icon:u=void 0,buttonPlaceholder:m="",textPlaceholder:h="",commandEmptyMessage:p="No option found",buttonVariant:g="outline",alignDropDown:y="start",isDisabled:v=!1,ariaLabel:j,...I}){const[M,T]=l.useState(!1),G=d??w,k=C=>C.length>0&&typeof C[0]=="object"&&"options"in C[0],E=(C,b)=>{const S=w(C),L=typeof C=="object"&&"secondaryLabel"in C?C.secondaryLabel:void 0,F=`${b??""}${S}${L??""}`;return n.jsxs(Xt,{value:S,onSelect:()=>{c(C),T(!1)},className:"tw-flex tw-items-center",children:[n.jsx(R.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||w(i)!==S})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[S,L&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",L]})]})]},F)};return n.jsxs(ie,{open:M,onOpenChange:T,...I,children:[n.jsx(ge,{asChild:!0,children:n.jsxs(B,{variant:g,role:"combobox","aria-expanded":M,"aria-label":j,id:t,className:f("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:u}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?G(i):m})]}),n.jsx(R.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Qt,{align:y,className:f("tw-w-[200px] tw-p-0",s),style:a,children:n.jsxs(se,{children:[n.jsx(Me,{placeholder:h,className:"tw-text-inherit"}),n.jsx(He,{children:p}),n.jsx(ae,{children:k(e)?e.map(C=>n.jsx(Yt,{heading:C.groupHeading,children:C.options.map(b=>E(b,C.groupHeading))},C.groupHeading)):e.map(C=>E(C))})]})})]})}function ss({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(d,u)=>u+1),[a]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(bt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Gn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(bt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Gn,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const Zi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),cr=(t,e)=>t[e]??e;function Ji({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const u=cr(d,"%webView_bookSelector_currentBook%"),m=cr(d,"%webView_bookSelector_choose%"),h=cr(d,"%webView_bookSelector_chooseBooks%"),[p,g]=l.useState("current book"),y=v=>{g(v),t(v)};return n.jsx(er,{className:"pr-twp tw-flex",value:p,onValueChange:v=>y(v),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(yn,{value:"current book"}),n.jsx(bt,{className:"tw-ms-1",children:u})]}),n.jsx(bt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(ss,{isDisabled:p==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(yn,{value:"choose books"}),n.jsx(bt,{className:"tw-ms-1",children:h})]}),n.jsx(bt,{className:"tw-flex tw-items-center",children:o.map(v=>st.Canon.bookIdToEnglishName(v)).join(", ")}),n.jsx(B,{disabled:p==="current book",onClick:()=>r(),children:m})]})]})})}const as=l.createContext(null);function Qi(t,e){return{getTheme:function(){return e??null}}}function xe(){const t=l.useContext(as);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const is=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,tl=is?l.useLayoutEffect:l.useEffect,Rn={tag:x.HISTORY_MERGE_TAG};function el({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:w}=t,d=Qi(null,o),u=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:a,onError:m=>i(m,u),theme:o});return function(m,h){if(h!==null){if(h===void 0)m.update(()=>{const p=x.$getRoot();if(p.isEmpty()){const g=x.$createParagraphNode();p.append(g);const y=is?document.activeElement:null;(x.$getSelection()!==null||y!==null&&y===m.getRootElement())&&g.select()}},Rn);else if(h!==null)switch(typeof h){case"string":{const p=m.parseEditorState(h);m.setEditorState(p,Rn);break}case"object":m.setEditorState(h,Rn);break;case"function":m.update(()=>{x.$getRoot().isEmpty()&&h(m)},Rn)}}}(u,c),[u,d]},[]);return tl(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(as.Provider,{value:r,children:e})}const nl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function rl({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=xe();return nl(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:w})=>{e&&a.size===0&&i.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const Ar={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},St=Ve.Provider,Tt=Ve.Root,It=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(Ve.Trigger,{ref:o,className:e?f(Or({variant:e}),t):t,...r}));It.displayName=Ve.Trigger.displayName;const Et=l.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(Ve.Portal,{children:n.jsx(Ve.Content,{ref:s,sideOffset:e,style:{zIndex:qe,...r},className:f("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));Et.displayName=Ve.Content.displayName;const Pr=[jr.HeadingNode,x.ParagraphNode,x.TextNode,jr.QuoteNode],ol=l.createContext(null),dr={didCatch:!1,error:null};class sl extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=dr}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(dr)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&al(e.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(dr)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=e;if(a){const w={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw i}return l.createElement(ol.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function al(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function il({children:t,onError:e}){return n.jsx(sl,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const ll=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function cl(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function dl(){return function(t){const[e]=xe(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),a=l.useRef(o);return ll(()=>{const{initialValueFn:i,subscribe:c}=r,w=i();return a.current!==w&&(a.current=w,s(w)),c(d=>{a.current=d,s(d)})},[r,t]),o}(cl)}function wl(t,e){const r=t.getRootElement();if(r===null)return[];const o=r.getBoundingClientRect(),s=getComputedStyle(r),a=parseFloat(s.paddingLeft)+parseFloat(s.paddingRight),i=Array.from(e.getClientRects());let c,w=i.length;i.sort((d,u)=>{const m=d.top-u.top;return Math.abs(m)<=3?d.left-u.left:m});for(let d=0;d<w;d++){const u=i[d],m=c&&c.top<=u.top&&c.top+c.height>u.top&&c.left+c.width>u.left,h=u.width+a===o.width;m||h?(i.splice(d--,1),w--):c=u}return i}function ul(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,i=t.isBackward(),c=s.getNode(),w=a.getNode(),d=e.is(c),u=e.is(w);if(d||u){const[m,h]=x.$getCharacterOffsets(t),p=c.is(w),g=e.is(i?w:c),y=e.is(i?c:w);let v,j=0;p?(j=m>h?h:m,v=m>h?m:h):g?(j=i?h:m,v=void 0):y&&(j=0,v=i?m:h);const I=e.__text.slice(j,v);I!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=I)}}return e}function Vn(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const ls=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,pl=ls&&"documentMode"in document?document.documentMode:null;!(!ls||!("InputEvent"in window)||pl)&&"getTargetRanges"in new window.InputEvent("input");function we(t){return`${t}px`}const ml={attributes:!0,characterData:!0,childList:!0,subtree:!0};function fl(t,e,r){let o=null,s=null,a=null,i=[];const c=document.createElement("div");function w(){o===null&&Vn(182),s===null&&Vn(183);const{left:m,top:h}=s.getBoundingClientRect(),p=wl(t,e);var g,y;c.isConnected||(y=c,(g=s).insertBefore(y,g.firstChild));let v=!1;for(let j=0;j<p.length;j++){const I=p[j],M=i[j]||document.createElement("div"),T=M.style;T.position!=="absolute"&&(T.position="absolute",v=!0);const G=we(I.left-m);T.left!==G&&(T.left=G,v=!0);const k=we(I.top-h);T.top!==k&&(M.style.top=k,v=!0);const E=we(I.width);T.width!==E&&(M.style.width=E,v=!0);const C=we(I.height);T.height!==C&&(M.style.height=C,v=!0),M.parentNode!==c&&(c.append(M),v=!0),i[j]=M}for(;i.length>p.length;)i.pop();v&&r(i)}function d(){s=null,o=null,a!==null&&a.disconnect(),a=null,c.remove();for(const m of i)m.remove();i=[]}c.style.position="relative";const u=t.registerRootListener(function m(){const h=t.getRootElement();if(h===null)return d();const p=h.parentElement;if(!x.isHTMLElement(p))return d();d(),o=h,s=p,a=new MutationObserver(g=>{const y=t.getRootElement(),v=y&&y.parentElement;if(y!==o||v!==s)return m();for(const j of g)if(!c.contains(j.target))return w()}),a.observe(p,ml),w()});return()=>{u(),d()}}function bo(t,e,r){if(t.type!=="text"&&x.$isElementNode(e)){const o=e.getDOMSlot(r);return[o.element,o.getFirstChildOffset()+t.offset]}return[x.getDOMTextNode(r)||r,t.offset]}function hl(t){for(const e of t){const r=e.style;r.background!=="Highlight"&&(r.background="Highlight"),r.color!=="HighlightText"&&(r.color="HighlightText"),r.marginTop!==we(-1.5)&&(r.marginTop=we(-1.5)),r.paddingTop!==we(4)&&(r.paddingTop=we(4)),r.paddingBottom!==we(0)&&(r.paddingBottom=we(0))}}function gl(t,e=hl){let r=null,o=null,s=null,a=null,i=null,c=null,w=()=>{};function d(u){u.read(()=>{const m=x.$getSelection();if(!x.$isRangeSelection(m))return r=null,s=null,a=null,c=null,w(),void(w=()=>{});const[h,p]=function(C){const b=C.getStartEndPoints();return C.isBackward()?[b[1],b[0]]:b}(m),g=h.getNode(),y=g.getKey(),v=h.offset,j=p.getNode(),I=j.getKey(),M=p.offset,T=t.getElementByKey(y),G=t.getElementByKey(I),k=r===null||T!==o||v!==s||y!==r.getKey(),E=a===null||G!==i||M!==c||I!==a.getKey();if((k||E)&&T!==null&&G!==null){const C=function(b,S,L,F,A,$,q){const U=(b._window?b._window.document:document).createRange();return U.setStart(...bo(S,L,F)),U.setEnd(...bo(A,$,q)),U}(t,h,g,T,p,j,G);w(),w=fl(t,C,e)}r=g,o=T,s=v,a=j,i=G,c=M})}return d(t.getEditorState()),x.mergeRegister(t.registerUpdateListener(({editorState:u})=>d(u)),()=>{w()})}function xl(t,e){let r=null;const o=()=>{const s=getSelection(),a=s&&s.anchorNode,i=t.getRootElement();a!==null&&i!==null&&i.contains(a)?r!==null&&(r(),r=null):r===null&&(r=gl(t,e))};return t.registerRootListener(s=>{if(s){const a=s.ownerDocument;return a.addEventListener("selectionchange",o),o(),()=>{r!==null&&r(),a.removeEventListener("selectionchange",o)}}})}function bl(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||Vn(4,t.__key),e}function vl(t){const e=x.$getSelection()||x.$getPreviousSelection();let r;if(x.$isRangeSelection(e))r=x.$caretFromPoint(e.focus,"next");else{if(e!=null){const i=e.getNodes(),c=i[i.length-1];c&&(r=x.$getSiblingCaret(c,"next"))}r=r||x.$getChildCaret(x.$getRoot(),"previous").getFlipped().insert(x.$createParagraphNode())}const o=yl(t,r),s=x.$getAdjacentChildCaret(o),a=x.$isChildCaret(s)?x.$normalizeCaret(s):o;return x.$setSelectionFromCaretRange(x.$getCollapsedCaretRange(a)),t.getLatest()}function yl(t,e,r){let o=x.$getCaretInDirection(e,"next");for(let s=o;s;s=x.$splitAtPointCaretNext(s,r))o=s;return x.$isTextPointCaret(o)&&Vn(283),o.insert(t.isInline()?x.$createParagraphNode().append(t):t),x.$getCaretInDirection(x.$getSiblingCaret(t.getLatest(),"next"),e.direction)}function jl(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const a=o[s],i=a.getKey();if(r.has(i))continue;const c=x.$findMatchingParent(a,d=>x.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!r.has(w)&&(r.add(w),t(c))}return r.size>0}const Nl=Symbol.for("preact-signals");function nr(){if(ve>1)return void ve--;let t,e=!1;for(!function(){let r=Bn;for(Bn=void 0;r!==void 0;)r.S.v===r.v&&(r.S.i=r.i),r=r.o}();hn!==void 0;){let r=hn;for(hn=void 0,zn++;r!==void 0;){const o=r.u;if(r.u=void 0,r.f&=-3,!(8&r.f)&&cs(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(zn=0,ve--,e)throw t}function kl(t){if(ve>0)return t();Cr=++_l,ve++;try{return t()}finally{nr()}}let tt,hn;function vo(t){const e=tt;tt=void 0;try{return t()}finally{tt=e}}let Bn,ve=0,zn=0,_l=0,Cr=0,An=0;function yo(t){if(tt===void 0)return;let e=t.n;return e===void 0||e.t!==tt?(e={i:0,S:t,p:tt.s,n:void 0,t:tt,e:void 0,x:void 0,r:e},tt.s!==void 0&&(tt.s.n=e),tt.s=e,t.n=e,32&tt.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=tt.s,e.n=void 0,tt.s.n=e,tt.s=e),e):void 0}function Vt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function jn(t,e){return new Vt(t,e)}function cs(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function jo(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function ds(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function Fe(t,e){Vt.call(this,void 0),this.x=t,this.s=void 0,this.g=An-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Cl(t,e){return new Fe(t,e)}function ws(t){const e=t.m;if(t.m=void 0,typeof e=="function"){ve++;const r=tt;tt=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Lr(t),o}finally{tt=r,nr()}}}function Lr(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,ws(t)}function Sl(t){if(tt!==this)throw new Error("Out-of-order effect");ds(this),tt=t,this.f&=-2,8&this.f&&Lr(this),nr()}function Je(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}function me(t,e){const r=new Je(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function ln(t,e={}){const r={};for(const o in t){const s=e[o],a=jn(s===void 0?t[o]:s);r[o]=a}return r}Vt.prototype.brand=Nl,Vt.prototype.h=function(){return!0},Vt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:vo(()=>{var r;(r=this.W)==null||r.call(this)}))},Vt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&vo(()=>{var o;(o=this.Z)==null||o.call(this)}))}},Vt.prototype.subscribe=function(t){return me(()=>{const e=this.value,r=tt;tt=void 0;try{t(e)}finally{tt=r}},{name:"sub"})},Vt.prototype.valueOf=function(){return this.value},Vt.prototype.toString=function(){return this.value+""},Vt.prototype.toJSON=function(){return this.value},Vt.prototype.peek=function(){const t=tt;tt=void 0;try{return this.value}finally{tt=t}},Object.defineProperty(Vt.prototype,"value",{get(){const t=yo(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(zn>100)throw new Error("Cycle detected");(function(e){ve!==0&&zn===0&&e.l!==Cr&&(e.l=Cr,Bn={S:e,v:e.v,i:e.i,o:Bn})})(this),this.v=t,this.i++,An++,ve++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{nr()}}}}),Fe.prototype=new Vt,Fe.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===An))return!0;if(this.g=An,this.f|=1,this.i>0&&!cs(this))return this.f&=-2,!0;const t=tt;try{jo(this),tt=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return tt=t,ds(this),this.f&=-2,!0},Fe.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}Vt.prototype.S.call(this,t)},Fe.prototype.U=function(t){if(this.t!==void 0&&(Vt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},Fe.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(Fe.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=yo(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Je.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}},Je.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,ws(this),jo(this),ve++;const t=tt;return tt=this,Sl.bind(this,t)},Je.prototype.N=function(){2&this.f||(this.f|=2,this.u=hn,hn=this)},Je.prototype.d=function(){this.f|=8,1&this.f||Lr(this)},Je.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>ln(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return me(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function us(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function ps(t,e=us){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>ln(e),config:x.safeCast({$onClear:us}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return me(()=>ps(t,o.value))}});function El(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const wr=x.createState("format",{parse:t=>typeof t=="number"?t:0});class ms extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:wr}]})}getFormat(){return x.$getState(this,wr)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,wr,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Rl(t){return t instanceof ms}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[ms],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const a of s.getNodes())Rl(a)&&a.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function fs(t,e){let r;return jn(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const Sr=x.defineExtension({build:t=>fs(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function ot(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function hs(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=hs(r[s],o[s]);return t}return e}const $r=0,Er=1,gs=2,ur=3,Tn=4,Ze=5,pr=6,pn=7;function mr(t){return t.id===$r}function xs(t){return t.id===gs}function Tl(t){return function(e){return e.id===Er}(t)||ot(305,String(t.id),String(Er)),Object.assign(t,{id:gs})}const Il=new Set;class Ml{constructor(e,r){Gt(this,"builder");Gt(this,"configs");Gt(this,"_dependency");Gt(this,"_peerNameSet");Gt(this,"extension");Gt(this,"state");Gt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:$r}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;xs(r)||ot(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,w,d){return Object.assign(c,{config:w,id:ur,registerState:d})}(r,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(e,a.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:Tn,initResult:w,registerState:d})}(a,i,s)}build(e){const r=this.state;let o;r.id!==Tn&&ot(307,String(r.id),String(Ze)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:Ze,output:i,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==Ze&&ot(308,String(o.id),String(Ze));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:pr})}(o),()=>{const a=this.state;a.id!==pn&&ot(309,String(o.id),String(pn)),this.state=function(i){return Object.assign(i,{id:Ze})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==pr&&ot(310,String(r.id),String(pr)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:pn})}(r),o}getSignal(){return this._signal===void 0&&ot(311),this._signal}getInitResult(){this.extension.init===void 0&&ot(312,this.extension.name);const e=this.state;return function(r){return r.id>=Tn}(e)||ot(313,String(e.id),String(Tn)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=ur}(e)||ot(314,String(e.id),String(ur)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&ot(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&ot(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=pn}(e)||ot(316,String(e.id),String(pn)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Il}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=Ze})(e)||ot(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const No={tag:x.HISTORY_MERGE_TAG};function Dl(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Ol=x.defineExtension({config:x.safeCast({setOptions:No,updateOptions:No}),init:({$initialEditorState:t=Dl})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(x.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const i=t.parseEditorState(a);t.setEditorState(i,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),ko=Symbol.for("@lexical/extension/LexicalBuilder");function _o(){}function Al(t){throw t}function In(t){return Array.isArray(t)?t:[t]}const fr="0.43.0+prod.esm";class Qe{constructor(e){Gt(this,"roots");Gt(this,"extensionNameMap");Gt(this,"outgoingConfigEdges");Gt(this,"incomingEdges");Gt(this,"conflicts");Gt(this,"_sortedExtensionReps");Gt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=fr,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[In(Ol)];for(const o of e)r.push(In(o));return new Qe(r)}static maybeFromEditor(e){const r=e[ko];return r&&(r.PACKAGE_VERSION!==fr&&ot(292,r.PACKAGE_VERSION,fr),r instanceof Qe||ot(293)),r}static fromEditor(e){const r=Qe.maybeFromEditor(e);return r===void 0&&ot(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[ko]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=_o;function r(){try{e()}finally{e=_o}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&ot(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&ot(296);const r=In(e),[o]=r;typeof o.name!="string"&&ot(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&ot(298,o.name),!s){s=new Ml(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&ot(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&ot(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=In(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(xs(a))return;const i=o.extension.name;var c;mr(a)||ot(300,i,s||"[unknown]"),mr(c=a)||ot(304,String(c.id),String($r)),a=Object.assign(c,{id:Er}),o.state=a;const w=this.outgoingConfigEdges.get(i);if(w)for(const d of w.keys()){const u=this.extensionNameMap.get(d);u&&r(u,i)}a=Tl(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())mr(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&ot(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of r){const c=i.register(e,a);c&&s.push(c)}for(const i of r){const c=i.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const u of c){const{extension:m}=u;if(m.onError!==void 0&&(e.onError=m.onError),m.disableEvents!==void 0&&(e.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(e.parentEditor=m.parentEditor),m.editable!==void 0&&(e.editable=m.editable),m.namespace!==void 0&&(e.namespace=m.namespace),m.$initialEditorState!==void 0&&(e.$initialEditorState=m.$initialEditorState),m.nodes)for(const h of El(m)){if(typeof h!="function"){const p=o.get(h.replace);p&&ot(302,m.name,h.replace.name,p.extension.name),o.set(h.replace,u)}r.add(h)}if(m.html){if(m.html.export)for(const[h,p]of m.html.export.entries())s.set(h,p);m.html.import&&Object.assign(a,m.html.import)}m.theme&&hs(i,m.theme)}Object.keys(i).length>0&&(e.theme=i),r.size&&(e.nodes=[...r]);const w=Object.keys(a).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=a),d&&(e.html.export=s));for(const u of c)u.init(e);return e.onError||(e.onError=Al),e}}const Pl=new Set,Co=x.defineExtension({build(t,e,r){const o=r.getDependency(Sr).output,s=jn({watchedNodeKeys:new Map}),a=fs(()=>{},()=>me(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[u,m]of c.entries()){if(m.size===0){c.delete(u);continue}const h=x.$getNodeByKey(u),p=h&&h.isSelected()||!1;d=d||p!==(!!i&&i.has(u)),p&&(w=w||new Set,w.add(u))}}),!d&&w&&i&&w.size===i.size||(a.value=w)}));return{watchNodeKey:function(i){const c=Cl(()=>(a.value||Pl).has(i)),{watchedNodeKeys:w}=s.peek();let d=w.get(i);const u=d!==void 0;return d=d||new Set,d.add(c),u||(w.set(i,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[Sr],name:"@lexical/extension/NodeSelection"}),Ll=x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class nn extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new nn(e.__key)}static importJSON(e){return Fr().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:$l,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function $l(){return{node:Fr()}}function Fr(){return x.$create(nn)}function Fl(t){return t instanceof nn}x.defineExtension({dependencies:[Sr,Co],name:"@lexical/extension/HorizontalRule",nodes:()=>[nn],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Co).output,s=jn({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(Ll,i=>{const c=x.$getSelection();if(!x.$isRangeSelection(c))return!1;if(c.focus.getNode()!==null){const w=Fr();vl(w)}return!0},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.CLICK_COMMAND,i=>{if(x.isDOMNode(i.target)){const c=x.$getNodeFromDOMNode(i.target);if(Fl(c))return function(w,d=!1){const u=x.$getSelection(),m=w.isSelected(),h=w.getKey();let p;d&&x.$isNodeSelection(u)?p=u:(p=x.$createNodeSelection(),x.$setSelection(p)),m?p.delete(h):p.add(h)}(c,i.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(nn,(i,c)=>{kl(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[u,m]of i.entries())if(m==="destroyed")d.delete(u),w=!0;else{const h=d.get(u),p=t.getElementByKey(u);h?h.domNode.value=p:(w=!0,d.set(u,{domNode:jn(p),selectedSignal:o(u)}))}w&&(s.value={nodeSelections:d})})}),me(()=>{const i=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())i.push(me(()=>{const d=c.value;d&&(w.value?x.addClassNamesToElement(d,a):x.removeClassNamesFromElement(d,a))}));return x.mergeRegister(...i)}))}});x.defineExtension({build:(t,e)=>ln({inheritEditableFromParent:e.inheritEditableFromParent}),config:x.safeCast({$getParentEditor:function(){const t=x.$getEditor();return Qe.fromEditor(t),t},inheritEditableFromParent:!1}),init:(t,e,r)=>{const o=e.$getParentEditor();t.parentEditor=o,t.theme=t.theme||o._config.theme},name:"@lexical/extension/NestedEditor",register:(t,e,r)=>me(()=>{const o=t._parentEditor;if(o&&r.getOutput().inheritEditableFromParent.value)return t.setEditable(o.isEditable()),o.registerEditableListener(t.setEditable.bind(t))})});x.defineExtension({build:(t,e,r)=>ln(e),config:x.safeCast({disabled:!1,onReposition:void 0}),name:"@lexical/utils/SelectionAlwaysOnDisplay",register:(t,e,r)=>{const o=r.getOutput();return me(()=>{if(!o.disabled.value)return xl(t,o.onReposition.value)})}});function bs(t){return t.canBeEmpty()}function Gl(t,e,r=bs){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const a=function(i){if(i.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const c=i.anchor,w=i.focus,d=w.isBefore(c)?w:c,u=d.getNode(),m=bl(u);if(m.canIndent()){const h=m.getKey();let p=x.$createRangeSelection();if(p.anchor.set(h,0,"element"),p.focus.set(h,0,"element"),p=x.$normalizeSelection__EXPERIMENTAL(p),p.anchor.is(d))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(a,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const a=typeof r=="function"?r:r.peek();return jl(i=>{if(a(i)){const c=i.getIndent()+1;(!o||c<o)&&i.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>ln(e),config:x.safeCast({$canIndent:bs,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:a}=r.getOutput();return me(()=>{if(!o.value)return Gl(t,s,a)})}});const Vl=x.defineExtension({name:"@lexical/react/ReactProvider"});function Bl(){return x.$getRoot().getTextContent()}function zl(t,e=!0){if(t)return!1;let r=Bl();return e&&(r=r.trim()),r===""}function Kl(t){if(!zl(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const w=a[o];if(!x.$isTextNode(w))return!1}}}return!0}function vs(t){return()=>Kl(t)}function ys(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,u,m,h,p]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const y=g.anchor;let v=y.getNode(),j=0,I=0;if(x.$isTextNode(v)&&d>=0&&u>=0&&(j=d,I=d+u,g.setTextNodeRange(v,j,v,I)),j===I&&m===""||(g.insertRawText(m),v=y.getNode()),x.$isTextNode(v)){j=h,I=h+p;const M=v.getTextContentSize();j=j>M?M:j,I=I>M?M:I,g.setTextNodeRange(v,j,v,I)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>ln(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>me(()=>r.getOutput().disabled.value?void 0:ys(t))});function ql(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Gr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Hl({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=l.useState(()=>r.getDecorators());return Gr(()=>r.registerDecoratorListener(i=>{mo.flushSync(()=>{a(i)})}),[r]),l.useEffect(()=>{a(r.getDecorators())},[r]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],u=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(l.Suspense,{fallback:null,children:s[d]})}),m=r.getElementByKey(d);m!==null&&i.push(mo.createPortal(u,m,d))}return i},[o,s,r])}(t,e)}function Ul({editor:t,ErrorBoundary:e}){return function(r){const o=Qe.maybeFromEditor(r);if(o&&o.hasExtensionByName(Vl.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&ql(320,s);return!0}return!1}(t)?null:n.jsx(Hl,{editor:t,ErrorBoundary:e})}function So(t){return t.getEditorState().read(vs(t.isComposing()))}function Yl({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=xe();return function(s){Gr(()=>x.mergeRegister(jr.registerRichText(s),ys(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Xl,{content:e}),n.jsx(Ul,{editor:o,ErrorBoundary:r})]})}function Xl({content:t}){const[e]=xe(),r=function(s){const[a,i]=l.useState(()=>So(s));return Gr(()=>{function c(){const w=So(s);i(w)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=dl();return r?typeof t=="function"?t(o):t:null}function Wl({defaultSelection:t}){const[e]=xe();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Zl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Jl({onClear:t}){const[e]=xe();return Zl(()=>ps(e,t),[e,t]),null}const js=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ql({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:u,ariaOwns:m,ariaRequired:h,autoCapitalize:p,className:g,id:y,role:v="textbox",spellCheck:j=!0,style:I,tabIndex:M,"data-testid":T,...G},k){const[E,C]=l.useState(t.isEditable()),b=l.useCallback(L=>{L&&L.ownerDocument&&L.ownerDocument.defaultView?t.setRootElement(L):t.setRootElement(null)},[t]),S=l.useMemo(()=>function(...L){return F=>{for(const A of L)typeof A=="function"?A(F):A!=null&&(A.current=F)}}(k,b),[b,k]);return js(()=>(C(t.isEditable()),t.registerEditableListener(L=>{C(L)})),[t]),n.jsx("div",{"aria-activedescendant":E?e:void 0,"aria-autocomplete":E?r:"none","aria-controls":E?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":E&&v==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":u,"aria-owns":E?m:void 0,"aria-readonly":!E||void 0,"aria-required":h,autoCapitalize:p,className:g,contentEditable:E,"data-testid":T,id:y,ref:S,role:v,spellCheck:j,style:I,tabIndex:M,...G})}const tc=l.forwardRef(Ql);function Eo(t){return t.getEditorState().read(vs(t.isComposing()))}const ec=l.forwardRef(nc);function nc(t,e){const{placeholder:r,...o}=t,[s]=xe();return n.jsxs(n.Fragment,{children:[n.jsx(tc,{editor:s,...o,ref:e}),r!=null&&n.jsx(rc,{editor:s,content:r})]})}function rc({content:t,editor:e}){const r=function(i){const[c,w]=l.useState(()=>Eo(i));return js(()=>{function d(){const u=Eo(i);w(u)}return d(),x.mergeRegister(i.registerUpdateListener(()=>{d()}),i.registerEditableListener(()=>{d()}))},[i]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(i=>{s(i)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function oc({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(ec,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Ns=l.createContext(void 0);function sc({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Ns.Provider,{value:i,children:a})}function ks(){const t=l.useContext(Ns);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function ac(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:a,content:i}=t;return n.jsx($n,{open:!0,onOpenChange:r,children:n.jsxs(xn,{children:[n.jsx(bn,{children:n.jsx(vn,{children:a})}),i]})})},[t,r]),s=l.useCallback((a,i,c=!1)=>{e({closeOnClickOutside:c,content:i(r),title:a})},[r]);return[o,s]}function ic({children:t}){const[e]=xe(),[r,o]=l.useState(e),[s,a]=l.useState("paragraph"),[i,c]=ac(),w=()=>{};return l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,u)=>(o(u),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(sc,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:a,showModal:c,children:[i,t({blockType:s})]})}function lc(t){const[e]=xe(),{activeEditor:r}=ks();l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const _s=Ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),cc=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(qo.Root,{ref:s,className:f(_s({variant:e,size:r,className:t})),...o}));cc.displayName=qo.Root.displayName;const Cs=l.createContext({size:"default",variant:"default"}),rr=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const i=vt();return n.jsx(Jn.Root,{ref:a,className:f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:i,children:n.jsx(Cs.Provider,{value:{variant:e,size:r},children:o})})});rr.displayName=Jn.Root.displayName;const tn=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const i=l.useContext(Cs);return n.jsx(Jn.Item,{ref:a,className:f(_s({variant:i.variant||r,size:i.size||o}),t),...s,children:e})});tn.displayName=Jn.Item.displayName;const Ro=[{format:"bold",icon:R.BoldIcon,label:"Bold"},{format:"italic",icon:R.ItalicIcon,label:"Italic"}];function dc(){const{activeEditor:t}=ks(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(x.$isRangeSelection(s)||yi.$isTableSelection(s)){const a=[];Ro.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),r(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return lc(o),n.jsx(rr,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Ro.map(({format:s,icon:a,label:i})=>n.jsx(tn,{value:s,"aria-label":i,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function wc({onClear:t}){const[e]=xe();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function uc({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(ic,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(dc,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Yl,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(oc,{placeholder:t})}),ErrorBoundary:il}),e&&n.jsx(Wl,{defaultSelection:"rootEnd"}),n.jsx(wc,{onClear:r}),n.jsx(Jl,{})]})]})}const pc={namespace:"commentEditor",theme:Ar,nodes:Pr,onError:t=>{console.error(t)}};function Kn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i,className:c}){return n.jsx("div",{className:f("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(el,{initialConfig:{...pc,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(St,{children:[n.jsx(uc,{placeholder:s,autoFocus:a,onClear:i}),n.jsx(rl,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function mc(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!Es.has(a.nodeName)){const i=Rs(a,t,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&i.insertAfter(x.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const w of c)i.insertBefore(w);i.remove()}}(s),o}function fc(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)Ss(t,o[s],r,e);return r.innerHTML}function Ss(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=x.$isElementNode(e)&&e.excludeFromCopy("html");let i=e;o!==null&&x.$isTextNode(e)&&(i=ul(o,e,"clone"));const c=x.$isElementNode(i)?i.getChildren():[],w=x.getRegisteredNode(t,i.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,i):i.exportDOM(t);const{element:u,after:m}=d;if(!u)return!1;const h=document.createDocumentFragment();for(let p=0;p<c.length;p++){const g=c[p],y=Ss(t,g,h,o);!s&&x.$isElementNode(e)&&y&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((x.isHTMLElement(u)||x.isDocumentFragment(u))&&u.append(h),r.append(u),m){const p=m.call(i,u);p&&(x.isDocumentFragment(u)?u.replaceChildren(p):u.replaceWith(p))}}else r.append(h);return s}const Es=new Set(["STYLE","SCRIPT"]);function Rs(t,e,r,o,s=new Map,a){let i=[];if(Es.has(t.nodeName))return i;let c=null;const w=function(g,y){const{nodeName:v}=g,j=y._htmlConversions.get(v.toLowerCase());let I=null;if(j!==void 0)for(const M of j){const T=M(g);T!==null&&(I===null||(I.priority||0)<=(T.priority||0))&&(I=T)}return I!==null?I.conversion:null}(t,e),d=w?w(t):null;let u=null;if(d!==null){u=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,y]of s)if(c=y(c,a),!c)break;c&&i.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const m=t.childNodes;let h=[];const p=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<m.length;g++)h.push(...Rs(m[g],e,r,p,new Map(s),c));return u!=null&&(h=u(h)),x.isBlockDomNode(t)&&(h=hc(t,h,p?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?i=i.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(i=i.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),i}function hc(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let i=0;i<e.length;i++){const c=e[i];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===e.length-1||i<e.length-1&&x.$isBlockElementNode(e[i+1])){const w=r();w.setFormat(o),w.append(...a),s.push(w),a=[]}}return s}function Ts(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Is(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Is(e.children)):!1}function ee(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Is(t.root.children):!1}function gc(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Vo.createHeadlessEditor({namespace:"EditorUtils",theme:Ar,nodes:Pr,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=mc(e,s);x.$getRoot().clear(),x.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function qn(t){const e=Vo.createHeadlessEditor({namespace:"EditorUtils",theme:Ar,nodes:Pr,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=fc(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Vr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function Pn(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Br(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const xc={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function hr(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function bc({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,a]=l.useState(xc),[i,c]=l.useState(void 0),[w,d]=l.useState(!1),u=l.useRef(void 0),m=l.useRef(null);l.useEffect(()=>{let j=!0;const I=m.current;if(!I)return;const M=setTimeout(()=>{j&&Ts(I)},300);return()=>{j=!1,clearTimeout(M)}},[]);const h=l.useCallback(()=>{if(!ee(s))return;const j=qn(s);e(j,i)},[s,e,i]),p=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",y=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",v=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:v}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(B,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(R.X,{})})}),n.jsx(Et,{children:n.jsx("p",{children:y})})]})}),n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(B,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!ee(s),children:n.jsx(R.Check,{})})}),n.jsx(Et,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(ie,{open:w,onOpenChange:d,children:[n.jsx(ge,{asChild:!0,children:n.jsxs(B,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(R.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:hr(i!==void 0?i:"",o)})]})}),n.jsx(Qt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),d(!1))},children:n.jsx(se,{children:n.jsx(ae,{children:t.map(j=>n.jsx(Xt,{onSelect:()=>{c(j===""?void 0:j),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:hr(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):Br(j)&&(j.preventDefault(),j.stopPropagation(),ee(s)&&h())},onKeyDown:j=>{Vr(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(Kn,{editorSerializedState:s,onSerializedChange:j=>a(j),placeholder:p,onClear:j=>{u.current=j}})})]})}const vc=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),yc=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],jc=["input","select","textarea","button"],Nc=["button","textbox"],Ms=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(p=>{i(p);const g=t.find(v=>v.id===p);g&&(e==null||e(g));const y=document.getElementById(p);y&&(y.scrollIntoView({block:"center"}),y.focus()),s.current&&s.current.setAttribute("aria-activedescendant",p)},[e,t]),u=l.useCallback(p=>{const g=t.find(y=>y.id===p);g&&(w(y=>y===p?void 0:p),r==null||r(g))},[r,t]),m=p=>{if(!p)return!1;const g=p.tagName.toLowerCase();if(p.isContentEditable||jc.includes(g))return!0;const y=p.getAttribute("role");if(y&&Nc.includes(y))return!0;const v=p.getAttribute("tabindex");return v!==void 0&&v!=="-1"},h=l.useCallback(p=>{var E;const g=p.target,y=C=>C?document.getElementById(C):void 0,v=y(c),j=y(a);if(!!(v&&g&&v.contains(g)&&g!==v)&&m(g)){if(p.key==="Escape"||p.key==="ArrowLeft"&&!g.isContentEditable){if(c){p.preventDefault(),p.stopPropagation();const C=t.find(b=>b.id===c);C&&d(C.id)}return}if(p.key==="ArrowDown"||p.key==="ArrowUp"){if(!v)return;const C=Array.from(v.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(C.length===0)return;const b=C.findIndex(L=>L===g);if(b===-1)return;let S;p.key==="ArrowDown"?S=Math.min(b+1,C.length-1):S=Math.max(b-1,0),S!==b&&(p.preventDefault(),p.stopPropagation(),(E=C[S])==null||E.focus());return}return}const T=t.findIndex(C=>C.id===a);let G=T;switch(p.key){case"ArrowDown":G=Math.min(T+1,t.length-1),p.preventDefault();break;case"ArrowUp":G=Math.max(T-1,0),p.preventDefault();break;case"Home":G=0,p.preventDefault();break;case"End":G=t.length-1,p.preventDefault();break;case" ":case"Enter":a&&u(a),p.preventDefault(),p.stopPropagation();return;case"ArrowRight":{const C=j;if(C){const b=C.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),S=C.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),L=b??S;if(L){p.preventDefault(),L.focus();return}}break}default:p.key.length===1&&!p.metaKey&&!p.ctrlKey&&!p.altKey&&(m(g)||(o==null||o(p.key),p.preventDefault()));return}const k=t[G];k&&d(k.id)},[t,d,a,c,u,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:d}},Ds=Ie.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ne=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:f("pr-twp",Ds({variant:e}),t),...r}));ne.displayName="Badge";const zr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));zr.displayName="Card";const Os=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Os.displayName="CardHeader";const As=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:f("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));As.displayName="CardTitle";const Ps=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:f("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Ps.displayName="CardDescription";const Kr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-p-6 tw-pt-0",t),...e}));Kr.displayName="CardContent";const Ls=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Ls.displayName="CardFooter";const Be=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(Ho.Root,{ref:s,decorative:r,orientation:e,className:f("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));Be.displayName=Ho.Root.displayName;const qr=l.forwardRef(({className:t,...e},r)=>n.jsx(an.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));qr.displayName=an.Root.displayName;const $s=l.forwardRef(({className:t,...e},r)=>n.jsx(an.Image,{ref:r,className:f("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));$s.displayName=an.Image.displayName;const Hr=l.forwardRef(({className:t,...e},r)=>n.jsx(an.Fallback,{ref:r,className:f("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Hr.displayName=an.Fallback.displayName;const Ur=l.createContext(void 0);function le(){const t=l.useContext(Ur);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const je=Ie.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),fe=dt.Trigger,Yr=dt.Group,Fs=dt.Portal,Gs=dt.Sub,Vs=dt.RadioGroup;function re({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(Ur.Provider,{value:r,children:n.jsx(dt.Root,{...e})})}const Xr=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=le();return n.jsxs(dt.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,je({variant:a.variant})),...o,children:[r,n.jsx(R.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Xr.displayName=dt.SubTrigger.displayName;const Wr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=vt();return n.jsx(dt.SubContent,{ref:o,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});Wr.displayName=dt.SubContent.displayName;const Jt=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=vt();return n.jsx(dt.Portal,{children:n.jsx(dt.Content,{ref:s,sideOffset:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});Jt.displayName=dt.Content.displayName;const Se=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=vt(),a=le();return n.jsx(dt.Item,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,je({variant:a.variant})),...r,dir:s})});Se.displayName=dt.Item.displayName;const Ht=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=vt(),i=le();return n.jsxs(dt.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,je({variant:i.variant})),checked:r,...o,dir:a,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(dt.ItemIndicator,{children:n.jsx(R.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Ht.displayName=dt.CheckboxItem.displayName;const Zr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=vt(),a=le();return n.jsxs(dt.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,je({variant:a.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(dt.ItemIndicator,{children:n.jsx(R.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Zr.displayName=dt.RadioItem.displayName;const ye=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(dt.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));ye.displayName=dt.Label.displayName;const he=l.forwardRef(({className:t,...e},r)=>n.jsx(dt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));he.displayName=dt.Separator.displayName;function Bs({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Bs.displayName="DropdownMenuShortcut";function To({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:i,canEditOrDelete:c=!1}){const[w,d]=l.useState(!1),[u,m]=l.useState(),h=l.useRef(null);l.useEffect(()=>{if(!w)return;let T=!0;const G=h.current;if(!G)return;const k=setTimeout(()=>{T&&Ts(G)},300);return()=>{T=!1,clearTimeout(k)}},[w]);const p=l.useCallback(T=>{T&&T.stopPropagation(),d(!1),m(void 0),i==null||i(!1)},[i]),g=l.useCallback(async T=>{if(T&&T.stopPropagation(),!u||!s)return;await s(t.id,qn(u))&&(d(!1),m(void 0),i==null||i(!1))},[u,s,t.id,i]),y=l.useMemo(()=>{const T=new Date(t.date),G=_.formatRelativeDate(T,r["%comment_date_today%"],r["%comment_date_yesterday%"]),k=T.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return _.formatReplacementString(r["%comment_dateAtTime%"],{date:G,time:k})},[t.date,r]),v=l.useMemo(()=>t.user,[t.user]),j=l.useMemo(()=>t.user.split(" ").map(T=>T[0]).join("").toUpperCase().slice(0,2),[t.user]),I=l.useMemo(()=>_.sanitizeHtml(t.contents),[t.contents]),M=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Se,{onClick:T=>{T.stopPropagation(),d(!0),m(gc(t.contents)),i==null||i(!0)},children:[n.jsx(R.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Se,{onClick:async T=>{T.stopPropagation(),a&&await a(t.id)},children:[n.jsx(R.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,i]);return n.jsxs("div",{className:f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(qr,{className:"tw-h-8 tw-w-8",children:n.jsx(Hr,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:v}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:y}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(ne,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Pn(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:T=>{T.key==="Escape"?(T.preventDefault(),T.stopPropagation(),p()):Br(T)&&(T.preventDefault(),T.stopPropagation(),ee(u)&&g())},onKeyDown:T=>{Vr(T),(T.key==="Enter"||T.key===" ")&&T.stopPropagation()},onClick:T=>{T.stopPropagation()},children:[n.jsx(Kn,{className:f('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:u,onSerializedChange:T=>m(T)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(B,{size:"icon",onClick:p,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(R.X,{})}),n.jsx(B,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!ee(u),children:n.jsx(R.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:f("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:I}})]})]}),M&&n.jsxs(re,{children:[n.jsx(fe,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"icon",children:n.jsx(R.MoreHorizontal,{})})}),n.jsx(Jt,{align:"end",children:M})]})]})}const Io={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function kc({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:i,handleSelectThread:c,threadId:w,thread:d,threadStatus:u,handleAddCommentToThread:m,handleUpdateComment:h,handleDeleteComment:p,handleReadStatusChange:g,assignableUsers:y,canUserAddCommentToThread:v,canUserAssignThreadCallback:j,canUserResolveThreadCallback:I,canUserEditOrDeleteCommentCallback:M,isRead:T=!1,autoReadDelay:G=5,onVerseRefClick:k}){const[E,C]=l.useState(Io),[b,S]=l.useState(void 0),L=o,[F,A]=l.useState(!1),[$,q]=l.useState(!1),[U,Z]=l.useState(!1),[yt,At]=l.useState(!1),[kt,Q]=l.useState(!1),[pt,K]=l.useState(T),[et,rt]=l.useState(!1),at=l.useRef(void 0),[it,_t]=l.useState(new Map);l.useEffect(()=>{let O=!0;return(async()=>{const mt=I?await I(w):!1;O&&Q(mt)})(),()=>{O=!1}},[w,I]),l.useEffect(()=>{let O=!0;if(!o){At(!1),_t(new Map);return}return(async()=>{const mt=j?await j(w):!1;O&&At(mt)})(),()=>{O=!1}},[o,w,j]);const Rt=l.useMemo(()=>e.filter(O=>!O.deleted),[e]);l.useEffect(()=>{let O=!0;if(!o||!M){_t(new Map);return}return(async()=>{const mt=new Map;await Promise.all(Rt.map(async be=>{const De=await M(be.id);O&&mt.set(be.id,De)})),O&&_t(mt)})(),()=>{O=!1}},[o,Rt,M]);const Pt=l.useMemo(()=>Rt[0],[Rt]),Ne=l.useRef(null),P=l.useRef(void 0),Lt=l.useCallback(()=>{var O;(O=P.current)==null||O.call(P),C(Io)},[]),Wt=l.useCallback(()=>{const O=!pt;K(O),rt(!O),g==null||g(w,O)},[pt,g,w]);l.useEffect(()=>{A(!1)},[o]),l.useEffect(()=>{if(o&&!pt&&!et){const O=setTimeout(()=>{K(!0),g==null||g(w,!0)},G*1e3);return at.current=O,()=>clearTimeout(O)}at.current&&(clearTimeout(at.current),at.current=void 0)},[o,pt,et,G,w,g]);const $t=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),V=l.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const O=Pn(a,r);return _.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:O})},[a,r]),Y=l.useMemo(()=>Rt.slice(1),[Rt]),J=l.useMemo(()=>Y.length??0,[Y.length]),nt=l.useMemo(()=>J>0,[J]),lt=l.useMemo(()=>F||J<=2?Y:Y.slice(-2),[Y,J,F]),ct=l.useMemo(()=>F||J<=2?0:J-2,[J,F]),Ct=l.useMemo(()=>J===1?$t.singleReply:_.formatReplacementString($t.multipleReplies,{count:J}),[J,$t]),ht=l.useMemo(()=>ct===1?$t.singleReply:_.formatReplacementString($t.multipleReplies,{count:ct}),[ct,$t]);l.useEffect(()=>{!o&&$&&nt&&q(!1)},[o,$,nt]);const gt=l.useCallback(async O=>{O&&O.stopPropagation();const xt=ee(E)?qn(E):void 0;if(b!==void 0){await m({threadId:w,contents:xt,assignedUser:b})&&(S(void 0),xt&&Lt());return}xt&&await m({threadId:w,contents:xt})&&Lt()},[Lt,E,m,b,w]),jt=l.useCallback(async O=>{const xt=ee(E)?qn(E):void 0,mt=await m({...O,contents:xt,assignedUser:b??O.assignedUser});return mt&&xt&&Lt(),mt&&b!==void 0&&S(void 0),mt},[Lt,E,m,b]);if(Pt)return n.jsx(zr,{role:"option","aria-selected":o,id:w,className:f("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&u!=="Resolved"&&pt,"tw-bg-background":o&&u!=="Resolved"&&pt,"tw-bg-muted":u==="Resolved","tw-bg-accent":!pt&&!o&&u!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(Kr,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[V&&n.jsx(ne,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:V}),n.jsx(B,{variant:"ghost",size:"icon",onClick:O=>{O.stopPropagation(),Wt()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":pt?"Mark as unread":"Mark as read",children:pt?n.jsx(R.MailOpen,{}):n.jsx(R.Mail,{})}),kt&&u!=="Resolved"&&n.jsx(B,{variant:"ghost",size:"icon",className:f("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:O=>{O.stopPropagation(),jt({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(R.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:Ne,className:f("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":L},{"tw-whitespace-nowrap":!L}),children:[s&&k?n.jsx(B,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:O=>{O.stopPropagation(),k(d)},children:s}):s,n.jsxs("span",{className:t,children:[Pt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Pt.selectedText}),Pt.contextAfter]})]})}),n.jsx(To,{comment:Pt,localizedStrings:r,isThreadExpanded:o,threadStatus:u,handleAddCommentToThread:jt,handleUpdateComment:h,handleDeleteComment:p,onEditingChange:q,canEditOrDelete:(!$&&it.get(Pt.id))??!1,canUserResolveThread:kt})]}),n.jsxs(n.Fragment,{children:[nt&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(Be,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ct})]}),!o&&ee(E)&&n.jsx(Kn,{editorSerializedState:E,onSerializedChange:O=>C(O),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[ct>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:O=>{O.stopPropagation(),A(!0)},role:"button",tabIndex:0,onKeyDown:O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),O.stopPropagation(),A(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(Be,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ht}),F?n.jsx(R.ChevronUp,{}):n.jsx(R.ChevronDown,{})]})]}),lt.map(O=>n.jsx("div",{children:n.jsx(To,{comment:O,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:p,onEditingChange:q,canEditOrDelete:(!$&&it.get(O.id))??!1})},O.id)),v!==!1&&(!$||ee(E))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:O=>O.stopPropagation(),onKeyDownCapture:O=>{Br(O)&&(O.preventDefault(),O.stopPropagation(),(ee(E)||b!==void 0)&&gt())},onKeyDown:O=>{Vr(O),(O.key==="Enter"||O.key===" ")&&O.stopPropagation()},children:[n.jsx(Kn,{editorSerializedState:E,onSerializedChange:O=>C(O),placeholder:u==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:O=>{P.current=O}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[b!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:_.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Pn(b,r)})}),n.jsxs(ie,{open:U,onOpenChange:Z,children:[n.jsx(ge,{asChild:!0,children:n.jsx(B,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!yt||!y||y.length===0||!y.includes(i),"aria-label":"Assign user",children:n.jsx(R.AtSign,{})})}),n.jsx(Qt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:O=>{O.key==="Escape"&&(O.stopPropagation(),Z(!1))},children:n.jsx(se,{children:n.jsx(ae,{children:y==null?void 0:y.map(O=>n.jsx(Xt,{onSelect:()=>{S(O!==a?O:void 0),Z(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Pn(O,r)})},O||"unassigned"))})})})]}),n.jsx(B,{size:"icon",onClick:gt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!ee(E)&&b===void 0,"aria-label":"Submit comment",children:n.jsx(R.ArrowUp,{})})]})]})]})]})]})})}function _c({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:p,selectedThreadId:g,onSelectedThreadChange:y,onVerseRefClick:v}){const[j,I]=l.useState(new Set),[M,T]=l.useState();l.useEffect(()=>{g&&(I(A=>new Set(A).add(g)),T(g))},[g]);const G=r.filter(A=>A.comments.some($=>!$.deleted)),k=G.map(A=>({id:A.id})),E=l.useCallback(A=>{I($=>new Set($).add(A.id)),T(A.id),y==null||y(A.id)},[y]),C=l.useCallback(A=>{const $=j.has(A);I(q=>{const U=new Set(q);return U.has(A)?U.delete(A):U.add(A),U}),T(A),y==null||y($?void 0:A)},[j,y]),{listboxRef:b,activeId:S,handleKeyDown:L}=Ms({options:k,onOptionSelect:E}),F=l.useCallback(A=>{A.key==="Escape"?(M&&j.has(M)&&(I($=>{const q=new Set($);return q.delete(M),q}),T(void 0),y==null||y(void 0)),A.preventDefault(),A.stopPropagation()):L(A)},[M,j,L,y]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:b,"aria-activedescendant":S??void 0,"aria-label":"Comments",className:f("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:F,children:G.map(A=>n.jsx("div",{className:f({"tw-opacity-60":A.status==="Resolved"}),children:n.jsx(kc,{classNameForVerseText:e,comments:A.comments,localizedStrings:s,verseRef:A.verseRef,handleSelectThread:C,threadId:A.id,thread:A,isRead:A.isRead,isSelected:j.has(A.id),currentUser:o,assignedUser:A.assignedUser,threadStatus:A.status,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:p,onVerseRefClick:v})},A.id))})}function Cc({table:t}){return n.jsxs(re,{children:[n.jsx(Bo.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(R.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Jt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(ye,{children:"Toggle columns"}),n.jsx(he,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Ht,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const ze=ft.Root,zs=ft.Group,Ke=ft.Value,Ks=Ie.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Re=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=vt();return n.jsxs(ft.Trigger,{className:f(Ks({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(ft.Icon,{asChild:!0,children:n.jsx(R.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Re.displayName=ft.Trigger.displayName;const Jr=l.forwardRef(({className:t,...e},r)=>n.jsx(ft.ScrollUpButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(R.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Jr.displayName=ft.ScrollUpButton.displayName;const Qr=l.forwardRef(({className:t,...e},r)=>n.jsx(ft.ScrollDownButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(R.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Qr.displayName=ft.ScrollDownButton.displayName;const Te=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=vt();return n.jsx(ft.Portal,{children:n.jsxs(ft.Content,{ref:s,className:f("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(Jr,{}),n.jsx(ft.Viewport,{className:f("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(Qr,{})]})})});Te.displayName=ft.Content.displayName;const qs=l.forwardRef(({className:t,...e},r)=>n.jsx(ft.Label,{ref:r,className:f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));qs.displayName=ft.Label.displayName;const qt=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(ft.Item,{ref:o,className:f("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ft.ItemIndicator,{children:n.jsx(R.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(ft.ItemText,{children:e})]}));qt.displayName=ft.Item.displayName;const Hs=l.forwardRef(({className:t,...e},r)=>n.jsx(ft.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Hs.displayName=ft.Separator.displayName;function Sc({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(ze,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(Re,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(Ke,{placeholder:t.getState().pagination.pageSize})}),n.jsx(Te,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(qt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(R.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(R.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(R.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(R.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Mo=`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;function Ec(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Nn(t,e){const r=e?`${Mo}, ${e}`:Mo;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Ec(o))}const kn=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Nn(i,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Nn(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});kn.displayName="Table";const _n=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));_n.displayName="TableHeader";const Cn=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:f("[&_tr:last-child]:tw-border-0",t),...e}));Cn.displayName="TableBody";const Us=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Us.displayName="TableFooter";function Rc(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Nn(t.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Tc(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Ic(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const pe=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),Rc(i);const c=l.useMemo(()=>i.current?Nn(i.current):[],[i]),w=l.useCallback(u=>{const{current:m}=i;if(!m||!m.parentElement)return;const h=m.closest("table"),p=h?Nn(h).filter(v=>v.tagName==="TR"):[],g=p.indexOf(m),y=c.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),Ic(p,g,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),Tc(c,y,u.key);else if(u.key==="Escape"){u.preventDefault();const v=m.closest("table");v&&v.focus()}e==null||e(u)},[i,c,e]),d=l.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:w,onFocus:d,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});pe.displayName="TableRow";const rn=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));rn.displayName="TableHead";const Ee=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Ee.displayName="TableCell";const Ys=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Ys.displayName="TableCaption";function Hn({className:t,...e}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Xs({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var k;const[u,m]=l.useState([]),[h,p]=l.useState([]),[g,y]=l.useState({}),[v,j]=l.useState({}),I=l.useMemo(()=>e??[],[e]),M=Bt.useReactTable({data:I,columns:t,getCoreRowModel:Bt.getCoreRowModel(),...r&&{getPaginationRowModel:Bt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:Bt.getSortedRowModel(),onColumnFiltersChange:p,getFilteredRowModel:Bt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:j,state:{sorting:u,columnFilters:h,columnVisibility:g,rowSelection:v}}),T=M.getVisibleFlatColumns();let G;return w?G=Array.from({length:10}).map((b,S)=>`skeleton-row-${S}`).map(b=>n.jsx(pe,{className:"hover:tw-bg-transparent",children:n.jsx(Ee,{colSpan:T.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(Hn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},b)):((k=M.getRowModel().rows)==null?void 0:k.length)>0?G=M.getRowModel().rows.map(E=>n.jsx(pe,{onClick:()=>i(E,M),"data-state":E.getIsSelected()&&"selected",children:E.getVisibleCells().map(C=>n.jsx(Ee,{children:Bt.flexRender(C.column.columnDef.cell,C.getContext())},C.id))},E.id)):G=n.jsx(pe,{children:n.jsx(Ee,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Cc,{table:M}),n.jsxs(kn,{stickyHeader:a,children:[n.jsx(_n,{stickyHeader:a,children:M.getHeaderGroups().map(E=>n.jsx(pe,{children:E.headers.map(C=>n.jsx(rn,{className:"tw-p-0",children:C.isPlaceholder?void 0:Bt.flexRender(C.column.columnDef.header,C.getContext())},C.id))},E.id))}),n.jsx(Cn,{children:G})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(B,{variant:"outline",size:"sm",onClick:()=>M.previousPage(),disabled:!M.getCanPreviousPage(),children:"Previous"}),n.jsx(B,{variant:"outline",size:"sm",onClick:()=>M.nextPage(),disabled:!M.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Sc,{table:M})]})}function Mc({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Si,{options:a,children:e})})}const Ws=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Do=(t,e)=>t[e]??e;function Zs({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Do(r,"%webView_error_dump_header%"),a=Do(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:n.jsx(R.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Dc=Object.freeze([...Ws,"%webView_error_dump_copied_message%"]);function Oc({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[i,c]=l.useState(!1),w=()=>{c(!0),e&&e()},d=u=>{u||c(!1)};return n.jsxs(ie,{onOpenChange:d,children:[n.jsx(ge,{asChild:!0,children:o}),n.jsxs(Qt,{id:a,className:f("tw-min-w-80 tw-max-w-96",s),children:[i&&r["%webView_error_dump_copied_message%"]&&n.jsx(bt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Zs,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var Js=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Js||{});function Ac({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((d,u)=>d.itemType===0?[u,[]]:void 0).filter(d=>!!d))),[a,i]=l.useState({}),c=(d,u)=>{const m=!o[d][u];s(p=>(p[d][u]=m,{...p}));const h=r[d].items[u];h.onUpdate(h.id,m)},w=(d,u)=>{i(h=>(h[d]=u,{...h}));const m=r[d].items.find(h=>h.id===u);m?m.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(re,{children:[n.jsx(fe,{asChild:!0,children:n.jsxs(B,{variant:"default",children:[n.jsx(R.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(R.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Jt,{children:r.map((d,u)=>n.jsxs("div",{children:[n.jsx(ye,{children:d.label}),n.jsx(Yr,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((m,h)=>n.jsx("div",{children:n.jsx(Ht,{checked:o[u][h],onCheckedChange:()=>c(u,h),children:m.label})},m.id))}):n.jsx(Vs,{value:a[u],onValueChange:m=>w(u,m),children:d.items.map(m=>n.jsx("div",{children:n.jsx(Zr,{value:m.id,children:m.label})},m.id))})}),n.jsx(he,{})]},d.label))})]})})}function Pc({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const w=new _.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,m)=>u+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(R.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(R.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(R.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Lc({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),u=d.getUTCFullYear()-1970,m=d.getUTCMonth(),h=d.getUTCDate()-1;let p="";return u>0?p=`${u.toString()} year${u===1?"":"s"} ago`:m>0?p=`${m.toString()} month${m===1?"":"s"} ago`:h===0?p="today":p=`${h.toString()} day${h===1?"":"s"} ago`,p}const i=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function $c({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>_.formatBytes(r),[r]),w=(d=>{const u=new Intl.DisplayNames(_.getCurrentLocale(),{type:"language"});return d.map(m=>u.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Lc,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:i})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function Qs({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:u=void 0,isDisabled:m=!1,sortSelected:h=!1,icon:p=void 0,className:g=void 0,variant:y="ghost",id:v}){const[j,I]=l.useState(!1),M=l.useCallback(S=>{var F;const L=(F=t.find(A=>A.label===S))==null?void 0:F.value;L&&r(e.includes(L)?e.filter(A=>A!==L):[...e,L])},[t,e,r]),T=()=>w||o,G=l.useMemo(()=>{if(!h)return t;const S=t.filter(F=>F.starred).sort((F,A)=>F.label.localeCompare(A.label)),L=t.filter(F=>!F.starred).sort((F,A)=>{const $=e.includes(F.value),q=e.includes(A.value);return $&&!q?-1:!$&&q?1:F.label.localeCompare(A.label)});return[...S,...L]},[t,e,h]),k=()=>{r(t.map(S=>S.value))},E=()=>{r([])},C=d??j,b=u??I;return n.jsx("div",{id:v,className:g,children:n.jsxs(ie,{open:C,onOpenChange:b,children:[n.jsx(ge,{asChild:!0,children:n.jsxs(B,{variant:y,role:"combobox","aria-expanded":C,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[p&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:T()})]}),n.jsx(R.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Qt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(se,{children:[n.jsx(Me,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:k,children:a}),n.jsx(B,{variant:"ghost",size:"sm",onClick:E,children:i})]}),n.jsxs(ae,{children:[n.jsx(He,{children:c}),n.jsx(Yt,{children:G.map(S=>n.jsxs(Xt,{value:S.label,onSelect:M,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(R.Check,{className:f("tw-h-4 tw-w-4",e.includes(S.value)?"tw-opacity-100":"tw-opacity-0")})}),S.starred&&n.jsx(R.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:S.label}),S.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:S.secondaryLabel})]},S.label))})]})]})})]})})}function Fc({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d,badgesPlaceholder:u,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Qs,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var p;return n.jsxs(ne,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(R.X,{className:"tw-h-3 tw-w-3"})}),(p=t.find(g=>g.value===h))==null?void 0:p.label]},h)})}):n.jsx(bt,{children:u})]})}const ta=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),Oo=(t,e)=>t[e]??e;function ea({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:a=!0,className:i="tw-h-6 tw-w-6",variant:c="ghost"}){const w=l.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(B,{"aria-label":"Undo",className:i,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(R.Undo,{})})}),n.jsx(Et,{children:n.jsxs("p",{children:[Oo(s,"%undoButton_tooltip%"),a&&` (${w?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(B,{"aria-label":"Redo",className:i,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(R.Redo,{})})}),n.jsx(Et,{children:n.jsxs("p",{children:[Oo(s,"%redoButton_tooltip%"),a&&` (${w?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function na({children:t,editorRef:e}){const r=l.useRef(null);return l.useEffect(()=>{var i;const o=/Macintosh/i.test(navigator.userAgent),s=((i=r.current)==null?void 0:i.querySelector(".editor-input"))??void 0,a=c=>{var d,u,m,h;if(!s||document.activeElement!==s)return;const w=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(d=e.current)==null||d.undo()):c.shiftKey&&w==="z"&&(c.preventDefault(),(u=e.current)==null||u.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(m=e.current)==null||m.undo()):(w==="y"||c.shiftKey&&w==="z")&&(c.preventDefault(),(h=e.current)==null||h.redo())}};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[e]),n.jsx("div",{ref:r,children:t})}const Ue=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Ue.displayName="Input";const Gc=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Vc({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(t),[u,m]=l.useState(r),[h,p]=l.useState(!1);l.useEffect(()=>{d(t)},[t]),l.useEffect(()=>{u!==r&&m(r)},[r]);const g=v=>{c.current=!1,p(v),v||(w!=="custom"||u?(e(w),o(u)):(d(t),m(r)))},y=v=>{var j,I,M,T;v.stopPropagation(),document.activeElement===i.current&&v.key==="ArrowDown"||v.key==="ArrowRight"?((j=a.current)==null||j.focus(),c.current=!0):document.activeElement===a.current&&v.key==="ArrowUp"?((I=i.current)==null||I.focus(),c.current=!1):document.activeElement===a.current&&v.key==="ArrowLeft"&&((M=a.current)==null?void 0:M.selectionStart)===0&&((T=i.current)==null||T.focus(),c.current=!1),w==="custom"&&v.key==="Enter"&&(document.activeElement===i.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(re,{open:h,onOpenChange:g,children:[n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(fe,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:Gc(t,s,r)})})}),n.jsx(Et,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Jt,{style:{zIndex:Tr},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:y,onMouseMove:()=>{var v;c.current&&((v=a.current)==null||v.focus())},children:[n.jsx(ye,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(he,{}),n.jsx(Ht,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Zt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Ht,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Zt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Ht,{ref:i,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:v=>{var j;v.stopPropagation(),c.current=!0,(j=a.current)==null||j.focus()},onSelect:v=>v.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Ue,{tabIndex:0,onMouseDown:v=>{v.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:u,onKeyDown:v=>{v.key==="Enter"||v.key==="ArrowUp"||v.key==="ArrowDown"||v.key==="ArrowLeft"||v.key==="ArrowRight"||v.stopPropagation()},maxLength:1,onChange:v=>m(v.target.value)})]})})]})]})}const Bc=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(R.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(R.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(R.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),zc=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),_.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Kc({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(re,{children:[n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(Go.TooltipTrigger,{asChild:!0,children:n.jsx(fe,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:Bc(t,r)})})}),n.jsx(Et,{children:n.jsx("p",{children:zc(t,r)})})]})}),n.jsxs(Jt,{style:{zIndex:Tr},children:[n.jsx(ye,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(he,{}),n.jsxs(Ht,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(R.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Ht,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(R.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Ht,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(R.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const ra=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function qc({icon:t,className:e}){const r=t??R.Ban;return n.jsx(r,{className:e,size:16})}function Ao({item:t,localizedStrings:e}){return n.jsxs(Xt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(qc,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(Zo,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function oa({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),[a,i]=l.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const w=e.filter(u=>{var m;return(m=u.marker)==null?void 0:m.toLowerCase().includes(c)}),d=e.filter(u=>u.title.toLowerCase().includes(c)&&!w.includes(u));return[w,d]},[o,e]);return n.jsxs(se,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(Me,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(ae,{children:[n.jsx(He,{children:t["%markerMenu_noResults%"]}),n.jsx(Yt,{children:a.map(c=>{var w;return n.jsx(Ao,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})}),i.length>0&&n.jsxs(n.Fragment,{children:[a.length>0&&n.jsx(tr,{alwaysRender:!0}),n.jsx(Yt,{children:i.map(c=>{var w;return n.jsx(Ao,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function Hc(t,e,r,o){if(!o||o==="p")return[];const s=_.usfmMarkers[o];if(!(s!=null&&s.children))return[];const a=[];return Object.entries(s.children).forEach(([,i])=>{a.push(...i.map(c=>({marker:c,title:r[_.usfmMarkers[c].description]??_.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),a.sort((i,c)=>(i.marker??i.title).localeCompare(c.marker??c.title))}function Uc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Yc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Xc={type:"USJ",version:"3.1",content:[{type:"para"}]};function Wc({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:a,editorOptions:i,defaultMarkerMenuTrigger:c,localizedStrings:w,parentEditorRef:d}){const u=l.useRef(null),m=l.useRef(null),h=l.useRef(null),p=l.useRef(null);l.useLayoutEffect(()=>{if(!p.current)return;const{width:V}=p.current.getBoundingClientRect();V>0&&(p.current.style.width=`${V}px`)},[]);const[g,y]=l.useState("generated"),[v,j]=l.useState("*"),[I,M]=l.useState("f"),[T,G]=l.useState(!1),[k,E]=l.useState(!0),[C,b]=l.useState(!1),S=l.useRef(!1),L=l.useRef(""),[F,A]=l.useState(!1),[$,q]=l.useState(),[U,Z]=l.useState(),[yt,At]=l.useState(),[kt,Q]=l.useState(),pt=l.useRef(null),K=l.useMemo(()=>({...i,markerMenuTrigger:c,hasExternalUI:!0,view:{...i.view??Zt.getDefaultViewOptions(),noteMode:"expanded"}}),[i,c]),et=l.useMemo(()=>Hc(u,()=>A(!1),w,kt),[w,kt]);l.useEffect(()=>{var V;F||(V=u.current)==null||V.focus()},[I,F]),l.useEffect(()=>{var J,nt;let V;S.current=!1,E(!0);const Y=e==null?void 0:e.at(0);if(Y&&Zt.isInsertEmbedOpOfType("note",Y)){const lt=(J=Y.insert.note)==null?void 0:J.caller;let ct="custom";lt===Zt.GENERATOR_NOTE_CALLER?ct="generated":lt===Zt.HIDDEN_NOTE_CALLER?ct="hidden":lt&&j(lt),y(ct),M(((nt=Y.insert.note)==null?void 0:nt.style)??"f"),V=setTimeout(()=>{var Ct;(Ct=u.current)==null||Ct.applyUpdate([Y])},0)}return()=>{V&&clearTimeout(V)}},[e,a]);const rt=l.useCallback((V,Y,J=!1)=>{var lt,ct,Ct;const nt=(ct=(lt=u.current)==null?void 0:lt.getNoteOps(0))==null?void 0:ct.at(0);if(nt&&Zt.isInsertEmbedOpOfType("note",nt)){if(nt.insert.note){let ht;V==="custom"?ht=Y:V==="generated"?ht=Zt.GENERATOR_NOTE_CALLER:ht=Zt.HIDDEN_NOTE_CALLER,nt.insert.note.caller=ht}r==null||r([nt]),J&&d&&a&&((Ct=d.current)==null||Ct.replaceEmbedUpdate(a,[nt]))}},[a,r,d]),at=l.useCallback(()=>{rt(g,v,!0),o()},[g,v,o,rt]),it=l.useRef(at);l.useLayoutEffect(()=>{it.current=at});const _t=l.useRef({book:s.book,chapterNum:s.chapterNum});l.useLayoutEffect(()=>{(_t.current.book!==s.book||_t.current.chapterNum!==s.chapterNum)&&(_t.current={book:s.book,chapterNum:s.chapterNum},it.current())},[s.book,s.chapterNum]);const Rt=()=>{var Y;const V=(Y=m.current)==null?void 0:Y.getElementsByClassName("editor-input")[0];V!=null&&V.textContent&&navigator.clipboard.writeText(V.textContent)},Pt=l.useCallback(V=>{y(V),rt(V,v)},[v,rt]),Ne=l.useCallback(V=>{j(V),rt(g,V)},[g,rt]),P=V=>{var J,nt,lt,ct,Ct;M(V);const Y=(nt=(J=u.current)==null?void 0:J.getNoteOps(0))==null?void 0:nt.at(0);if(Y&&Zt.isInsertEmbedOpOfType("note",Y)){Y.insert.note&&(Y.insert.note.style=V);const ht=(ct=(lt=Y.insert.note)==null?void 0:lt.contents)==null?void 0:ct.ops;I!=="x"&&V==="x"?ht==null||ht.forEach(gt=>Uc(gt)):I==="x"&&V!=="x"&&(ht==null||ht.forEach(gt=>Yc(gt))),(Ct=u.current)==null||Ct.applyUpdate([Y,{delete:1}])}},Lt=V=>{Q(V.contextMarker),b(V.canRedo)},Wt=l.useCallback(V=>{var J,nt,lt,ct,Ct;const Y=(nt=(J=u.current)==null?void 0:J.getNoteOps(0))==null?void 0:nt.at(0);if(Y&&Zt.isInsertEmbedOpOfType("note",Y)){V.content.length>1&&setTimeout(()=>{var jt;(jt=u.current)==null||jt.applyUpdate([{retain:2},{delete:1}])},0);const ht=(lt=Y.insert.note)==null?void 0:lt.style,gt=(Ct=(ct=Y.insert.note)==null?void 0:ct.contents)==null?void 0:Ct.ops;if(ht||G(!1),G(ht==="x"?!!(gt!=null&&gt.every(jt=>{var xt,mt;if(!((xt=jt.attributes)!=null&&xt.char))return!0;const O=((mt=jt.attributes)==null?void 0:mt.char).style;return O==="xt"||O==="xo"||O==="xq"})):!!(gt!=null&&gt.every(jt=>{var xt,mt;if(!((xt=jt.attributes)!=null&&xt.char))return!0;const O=((mt=jt.attributes)==null?void 0:mt.char).style;return O==="ft"||O==="fr"||O==="fq"}))),!S.current){S.current=!0,L.current=JSON.stringify(Y),E(!0);return}E(JSON.stringify(Y)===L.current),rt(g,v)}else G(!1),E(!0)},[g,v,rt]),$t=l.useCallback(()=>{const V=window.getSelection();if(h.current&&et.length&&V&&V.rangeCount>0){const Y=V.getRangeAt(0).getBoundingClientRect(),J=h.current.getBoundingClientRect();q(Y.left-J.left),Z(Y.top-J.top),At(Y.height),A(!0)}},[et,h]);return l.useEffect(()=>{const V=()=>{F&&A(!1)};return window.addEventListener("click",V),()=>{window.removeEventListener("click",V)}},[F]),l.useEffect(()=>{var V;F&&((V=pt.current)==null||V.focus())},[F]),l.useEffect(()=>{var J;const V=((J=m.current)==null?void 0:J.querySelector(".editor-input"))??void 0,Y=nt=>{!F&&V&&document.activeElement===V&&nt.key===c?(nt.preventDefault(),$t()):F&&nt.key==="Escape"&&(nt.preventDefault(),A(!1))};return document.addEventListener("keydown",Y),()=>{document.removeEventListener("keydown",Y)}},[F,$t,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:p,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Kc,{isTypeSwitchable:T,noteType:I,handleNoteTypeChange:P,localizedStrings:w}),n.jsx(Vc,{callerType:g,updateCallerType:Pt,customCaller:v,updateCustomCaller:Ne,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(ea,{onUndoClick:()=>{var V;return(V=u.current)==null?void 0:V.undo()},onRedoClick:()=>{var V;return(V=u.current)==null?void 0:V.redo()},canUndo:!k,canRedo:C,localizedStrings:w}),n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(B,{onClick:at,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(R.Check,{})})}),n.jsx(Et,{children:n.jsx("p",{children:w["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(B,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(R.X,{})})}),n.jsx(Et,{children:n.jsx("p",{children:w["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(na,{editorRef:u,children:n.jsx(Zt.Editorial,{options:K,onStateChange:Lt,onUsjChange:Wt,defaultUsj:Xc,onScrRefChange:()=>{},scrRef:s,ref:u})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(B,{onClick:Rt,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(R.Copy,{})})}),n.jsx(Et,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:h,style:{top:0,left:0,height:0,width:0}}),n.jsxs(ie,{open:F,children:[n.jsx(es,{className:"tw-absolute",style:{top:U,left:$,height:yt,width:0,pointerEvents:"none"}}),n.jsx(Qt,{className:"tw-w-[500px] tw-p-0",onClick:V=>{V.preventDefault(),V.stopPropagation()},children:n.jsx(oa,{markerMenuItems:et,localizedStrings:w,searchRef:pt})})]})]})}const Zc=Object.freeze([...ra,...Object.entries(_.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...ta]);function sa(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Jc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let i=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,w)=>{const d=w===a.length-1;return n.jsxs("p",{children:[to(t,c,r,!0,s),d&&o]},sa(t,c))})}function to(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const i=`${t}-text-${a.slice(0,10)}`;if(o){const c=f(`usfm_${t}`);return n.jsx("span",{className:c,children:a},i)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(R.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(R.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return Qc(a,sa(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function Qc(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(R.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),to(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function aa({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let i,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([i,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,u=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=i&&n.jsxs(n.Fragment,{children:[to(t.marker,[i],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",p=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",y=f(h,p);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:[w,u]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:m}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,y),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Jc(t.marker,c,o,d)})})]})}function td({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const u=w??_.getFormatCallerFunction(r,void 0),m=(I,M)=>{d==null||d(I,M,s)},h=a?r.findIndex(I=>I===a):-1,[p,g]=l.useState(h),y=(I,M,T)=>{if(r.length)switch(I.key){case"Enter":case" ":I.preventDefault(),d==null||d(M,T,s);break}},v=I=>{if(r.length)switch(I.key){case"ArrowDown":I.preventDefault(),g(M=>Math.min(M+1,r.length-1));break;case"ArrowUp":I.preventDefault(),g(M=>Math.max(M-1,0));break}},j=l.useRef([]);return l.useEffect(()=>{var I;p>=0&&p<j.current.length&&((I=j.current[p])==null||I.focus())},[p]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:p<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",t),onKeyDown:v,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((I,M)=>{const T=I===a,G=`${s}-${M}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:k=>{j.current[M]=k},role:"option","aria-selected":T,"data-marker":I.marker,"data-state":T?"selected":void 0,tabIndex:M===p?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(I,M),onKeyDown:k=>y(k,I,M),children:n.jsx(aa,{footnote:I,layout:o,formatCaller:()=>u(I.caller,M),showMarkers:i})},G),M<r.length-1&&o==="vertical"&&n.jsx(Be,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function ed(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function nd({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=l.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const u=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(u)||(w.add(u),c.push(d))}),c},[t]);return n.jsxs(kn,{stickyHeader:!0,children:[n.jsx(_n,{stickyHeader:!0,children:n.jsxs(pe,{children:[n.jsx(rn,{children:s}),n.jsx(rn,{children:a})]})}),n.jsx(Cn,{children:i.length>0&&i.map(c=>n.jsxs(pe,{onClick:()=>{e(c.reference)},children:[n.jsx(Ee,{children:_.formatScrRef(c.reference,"English")}),n.jsx(Ee,{className:o,children:ed(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const or=l.forwardRef(({className:t,...e},r)=>n.jsx(Nr.Root,{ref:r,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Nr.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(R.Check,{className:"tw-h-4 tw-w-4"})})}));or.displayName=Nr.Root.displayName;const rd=t=>{if(t==="asc")return n.jsx(R.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(R.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Sn=(t,e,r)=>n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsxs(It,{className:f("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),rd(t.getIsSorted())]}),n.jsx(Et,{side:"bottom",children:e})]})}),od=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Sn(e,t)}),sd=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Sn(r,t)}),ad=t=>({accessorKey:"count",header:({column:e})=>Sn(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),gr=(t,e,r,o,s,a)=>{let i=[...r];t.forEach(w=>{e==="approved"?i.includes(w)||i.push(w):i=i.filter(d=>d!==w)}),o(i);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},id=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>Sn(a,t,"tw-justify-center"),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return n.jsxs(rr,{value:i,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(tn,{onClick:w=>{w.stopPropagation(),gr([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(R.CircleCheckIcon,{})}),n.jsx(tn,{onClick:w=>{w.stopPropagation(),gr([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(R.CircleXIcon,{})}),n.jsx(tn,{onClick:w=>{w.stopPropagation(),gr([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(R.CircleHelpIcon,{})})]})}}),ld=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),cd=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},dd=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},ia=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",wd=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),ud=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},pd=(t,e,r)=>t.map(o=>{const s=_.isString(o.key)?o.key:o.key[0];return{items:_.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||ia(s,e,r),occurrences:o.occurrences||[]}}),de=(t,e)=>t[e]??e;function md({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:u=!1,classNameForVerseText:m,onItemSelected:h}){const p=de(r,"%webView_inventory_all%"),g=de(r,"%webView_inventory_approved%"),y=de(r,"%webView_inventory_unapproved%"),v=de(r,"%webView_inventory_unknown%"),j=de(r,"%webView_inventory_scope_currentBook%"),I=de(r,"%webView_inventory_scope_chapter%"),M=de(r,"%webView_inventory_scope_verse%"),T=de(r,"%webView_inventory_filter_text%"),G=de(r,"%webView_inventory_show_additional_items%"),k=de(r,"%webView_inventory_no_results%"),[E,C]=l.useState(!1),[b,S]=l.useState("all"),[L,F]=l.useState(""),[A,$]=l.useState([]),q=l.useMemo(()=>{const K=t??[];return K.length===0?[]:pd(K,s,a)},[t,s,a]),U=l.useMemo(()=>{if(E)return q;const K=[];return q.forEach(et=>{const rt=et.items[0],at=K.find(it=>it.items[0]===rt);at?(at.count+=et.count,at.occurrences=at.occurrences.concat(et.occurrences)):K.push({items:[rt],count:et.count,occurrences:et.occurrences,status:et.status})}),K},[E,q]),Z=l.useMemo(()=>U.length===0?[]:ud(U,b,L),[U,b,L]),yt=l.useMemo(()=>{var rt,at;if(!E)return w;const K=(rt=o==null?void 0:o.tableHeaders)==null?void 0:rt.length;if(!K)return w;const et=[];for(let it=0;it<K;it++)et.push(sd(((at=o==null?void 0:o.tableHeaders)==null?void 0:at[it])||"Additional Item",it+1));return[...et,...w]},[o==null?void 0:o.tableHeaders,w,E]);l.useEffect(()=>{Z.length===0?$([]):Z.length===1&&$(Z[0].items)},[Z]);const At=(K,et)=>{et.setRowSelection(()=>{const at={};return at[K.index]=!0,at});const rt=K.original.items;$(rt),h&&rt.length>0&&h(rt[0])},kt=K=>{if(K==="book"||K==="chapter"||K==="verse")c(K);else throw new Error(`Invalid scope value: ${K}`)},Q=K=>{if(K==="all"||K==="approved"||K==="unapproved"||K==="unknown")S(K);else throw new Error(`Invalid status filter value: ${K}`)},pt=l.useMemo(()=>{if(U.length===0||A.length===0)return[];const K=U.filter(et=>_.deepEqual(E?et.items:[et.items[0]],A));if(K.length>1)throw new Error("Selected item is not unique");return K.length===0?[]:K[0].occurrences},[A,E,U]);return n.jsx("div",{id:d,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(ze,{onValueChange:K=>Q(K),defaultValue:b,children:[n.jsx(Re,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ke,{placeholder:"Select filter"})}),n.jsxs(Te,{children:[n.jsx(qt,{value:"all",children:p}),n.jsx(qt,{value:"approved",children:g}),n.jsx(qt,{value:"unapproved",children:y}),n.jsx(qt,{value:"unknown",children:v})]})]}),n.jsxs(ze,{onValueChange:K=>kt(K),defaultValue:i,children:[n.jsx(Re,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ke,{placeholder:"Select scope"})}),n.jsxs(Te,{children:[n.jsx(qt,{value:"book",children:j}),n.jsx(qt,{value:"chapter",children:I}),n.jsx(qt,{value:"verse",children:M})]})]}),n.jsx(Ue,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:T,value:L,onChange:K=>{F(K.target.value)}}),o&&n.jsx(St,{children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(or,{className:"tw-m-1 tw-flex-shrink-0",checked:E,onCheckedChange:K=>{C(K)}}),n.jsx(bt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??G})]})}),n.jsx(Et,{children:(o==null?void 0:o.checkboxText)??G})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Xs,{columns:yt,data:Z,onRowClickHandler:At,stickyHeader:!0,isLoading:u,noResultsMessage:k})}),pt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(nd,{classNameForText:m,occurrenceData:pt,setScriptureReference:e,localizedStrings:r})})]})})}function fd(t){const e=new Map;return t.forEach(r=>{const o=e.get(r.projectId),s={scrollGroupId:r.scrollGroupId,scrollGroupScrRefLabel:r.scrollGroupScrRefLabel};o?o.some(a=>a.scrollGroupId===r.scrollGroupId)||o.push(s):e.set(r.projectId,[s])}),e.forEach(r=>r.sort((o,s)=>o.scrollGroupId-s.scrollGroupId)),e}function Po(t,e,r){return t.some(o=>o.projectId===e&&o.scrollGroupId===r)}function Ln(t){const e=fd(t.openTabs);if(t.mode==="project"){const s=t.selection.projectId;return t.projects.map(a=>{const i=e.get(a.id)??[];return{rowKey:a.id,projectId:a.id,shortName:a.shortName,fullName:a.fullName,language:a.language,languageCode:a.languageCode,scrollGroupId:void 0,scrollGroupScrRefLabel:void 0,openGroups:i.map(c=>c.scrollGroupId),isSelected:s===a.id,isMuted:i.length===0,isBoundButClosed:!1}})}const r=t.mode==="project-multi"?t.selection.pairs:t.selection.projectId!==void 0?[{projectId:t.selection.projectId,scrollGroupId:t.selection.scrollGroupId}]:[],o=[];return t.projects.forEach(s=>{const a=e.get(s.id);if(!a||a.length===0){o.push({rowKey:`project:${s.id}`,projectId:s.id,shortName:s.shortName,fullName:s.fullName,language:s.language,languageCode:s.languageCode,scrollGroupId:void 0,scrollGroupScrRefLabel:void 0,openGroups:[],isSelected:Po(r,s.id,void 0),isMuted:!0,isBoundButClosed:!1});return}a.forEach(i=>{o.push({rowKey:`tab:${s.id}:${i.scrollGroupId}`,projectId:s.id,shortName:s.shortName,fullName:s.fullName,language:s.language,languageCode:s.languageCode,scrollGroupId:i.scrollGroupId,scrollGroupScrRefLabel:i.scrollGroupScrRefLabel,openGroups:[],isSelected:Po(r,s.id,i.scrollGroupId),isMuted:!1,isBoundButClosed:!1})})}),r.forEach(s=>{if(s.scrollGroupId===void 0||o.some(i=>i.projectId===s.projectId&&i.scrollGroupId===s.scrollGroupId))return;const a=t.projects.find(i=>i.id===s.projectId);a&&o.push({rowKey:`closed:${a.id}:${s.scrollGroupId}`,projectId:a.id,shortName:a.shortName,fullName:a.fullName,language:a.language,languageCode:a.languageCode,scrollGroupId:s.scrollGroupId,scrollGroupScrRefLabel:void 0,openGroups:[],isSelected:!0,isMuted:!1,isBoundButClosed:!0})}),o}function Lo(t){return t.isBoundButClosed?!1:t.scrollGroupId!==void 0?!0:t.openGroups.length>0}function xr(t,e){if(t.isSelected!==e.isSelected)return t.isSelected?-1:1;const r=t.shortName.localeCompare(e.shortName,void 0,{sensitivity:"base"});if(r!==0)return r;const o=t.scrollGroupId??Number.POSITIVE_INFINITY,s=e.scrollGroupId??Number.POSITIVE_INFINITY;return o-s}function la(t,e){if(!e)return[{kind:"flat",rows:[...t].sort(xr)}];const r=t.filter(Lo).sort(xr),o=t.filter(a=>!Lo(a)).sort(xr),s=[];return r.length>0&&s.push({kind:"openTabs",rows:r}),o.length>0&&s.push({kind:"other",rows:o}),s}const hd={searchPlaceholder:"Search projects & resources",filterAriaLabel:"Filter",groupSectionLabel:"Group",filterSectionLabel:"Filter",filterGroupByOpenTabs:"By open tabs",filterShowSelectedOnly:"Show selected only",openTabsSectionHeading:"Open tabs",otherProjectsSectionHeading:"Other projects",boundButClosedTooltip:"Bound to {group} · not currently open",openButtonLabel:"Open",selectAll:"Select all",clearAll:"Clear all"};function gd(t){return{...hd,...t}}function on(t){return t>=0&&t<=25?String.fromCharCode(65+t):String(t)}const xd={backgroundImage:"linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"};function bd({scrollGroupId:t,isBoundButClosed:e}){const r=on(t);return e?n.jsx(ne,{variant:"outline",className:"tw-relative tw-text-muted-foreground",style:xd,children:r}):n.jsx(ne,{variant:"secondary",children:r})}function vd({row:t,mode:e,strings:r,onClick:o,onOpen:s}){const a=!!(t.language||t.languageCode),i=n.jsx(R.Check,{className:f("tw-h-4 tw-w-4",t.isSelected?"tw-opacity-100":"tw-opacity-0")});let c=null;e==="project"?t.openGroups.length>0&&(c=n.jsx("span",{className:"tw-ms-auto tw-flex tw-shrink-0 tw-gap-1",children:t.openGroups.map(m=>n.jsx(ne,{variant:"secondary",children:on(m)},m))})):t.scrollGroupId!==void 0&&(c=n.jsxs("span",{className:"tw-ms-auto tw-flex tw-shrink-0 tw-items-center tw-gap-2",children:[n.jsx(bd,{scrollGroupId:t.scrollGroupId,isBoundButClosed:t.isBoundButClosed}),t.isBoundButClosed&&s&&n.jsxs(B,{size:"sm",variant:"ghost",className:"tw-h-6 tw-gap-1 tw-px-2 tw-text-xs",onClick:m=>{m.stopPropagation(),s(t)},onMouseDown:m=>m.stopPropagation(),"aria-label":r.openButtonLabel,title:r.openButtonLabel,children:[n.jsx(R.ArrowRight,{className:"tw-h-3 tw-w-3"}),r.openButtonLabel]})]}));const w=n.jsxs(Xt,{value:`${t.rowKey} ${t.shortName} ${t.fullName} ${t.language??""} ${t.languageCode??""}`,onSelect:()=>o(t),className:"tw-flex tw-items-center tw-gap-2 tw-pe-4 tw-@container","data-selected":t.isSelected,children:[n.jsx("span",{className:"tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center",children:i}),n.jsx("span",{className:"tw-w-16 tw-shrink-0 tw-truncate",children:t.shortName}),n.jsx("span",{className:"tw-hidden tw-min-w-0 tw-flex-1 tw-truncate tw-text-start tw-text-muted-foreground @[250px]:tw-block",children:t.fullName}),c]}),d=t.scrollGroupId!==void 0?on(t.scrollGroupId):void 0,u=t.isBoundButClosed&&d?r.boundButClosedTooltip.replace("{group}",d):void 0;return n.jsxs(Tt,{delayDuration:200,children:[n.jsx(It,{asChild:!0,children:w}),n.jsxs(Et,{side:"right",align:"start",sideOffset:8,collisionPadding:16,className:"tw-max-w-xs",style:{zIndex:Qn},children:[n.jsx("div",{className:"tw-font-semibold",children:t.fullName}),a&&n.jsxs("div",{className:"tw-text-sm",children:[t.language,t.languageCode&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" (",t.languageCode,")"]})]}),!t.isBoundButClosed&&t.scrollGroupScrRefLabel&&d&&n.jsxs("div",{className:"tw-text-sm",children:[t.scrollGroupScrRefLabel,n.jsxs("span",{className:"tw-text-muted-foreground",children:[" (",d,")"]})]}),u&&n.jsx("div",{className:"tw-text-sm tw-italic",children:u})]})]})}function yd({groupByOpenTabs:t,onChangeGroupByOpenTabs:e,showSelectedOnly:r,onChangeShowSelectedOnly:o,strings:s}){const a=!!r;return n.jsxs(re,{children:[n.jsx(fe,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"sm",className:f("tw-h-8 tw-w-8 tw-shrink-0 tw-p-0",a&&"tw-bg-accent tw-text-accent-foreground hover:tw-bg-accent/80 data-[state=open]:tw-bg-accent"),"aria-label":s.filterAriaLabel,"aria-pressed":a,title:s.filterAriaLabel,onMouseDown:i=>i.preventDefault(),children:n.jsx(R.Filter,{className:"tw-h-4 tw-w-4"})})}),n.jsxs(Jt,{align:"end",className:"tw-w-56",style:{zIndex:Qn},children:[n.jsx(ye,{children:s.groupSectionLabel}),n.jsx(Ht,{checked:t,onCheckedChange:e,onSelect:i=>i.preventDefault(),children:s.filterGroupByOpenTabs}),o&&n.jsxs(n.Fragment,{children:[n.jsx(he,{}),n.jsx(ye,{children:s.filterSectionLabel}),n.jsx(Ht,{checked:!!r,onCheckedChange:o,onSelect:i=>i.preventDefault(),children:s.filterShowSelectedOnly})]})]})]})}function jd(t){const[e,r]=l.useState(!1),[o,s]=l.useState(""),[a,i]=l.useState(t.defaultGroupByOpenTabs??!0),[c,w]=l.useState(!1),d=gd(t.localizedStrings),u=l.useMemo(()=>t.mode==="project"?Ln({mode:"project",projects:t.projects,openTabs:t.openTabs,selection:t.selection}):t.mode==="project-multi"?Ln({mode:"project-multi",projects:t.projects,openTabs:t.openTabs,selection:t.selection}):Ln({mode:"projectScrollGroup",projects:t.projects,openTabs:t.openTabs,selection:t.selection}),[t.mode,t.projects,t.openTabs,t.selection]),m=l.useMemo(()=>{const k=o.trim().toLowerCase();let E=u;return k&&(E=E.filter(C=>C.shortName.toLowerCase().includes(k)||C.fullName.toLowerCase().includes(k)||(C.language??"").toLowerCase().includes(k)||(C.languageCode??"").toLowerCase().includes(k))),t.mode==="project-multi"&&c&&(E=E.filter(C=>C.isSelected)),E},[u,o,t.mode,c]),h=l.useMemo(()=>la(m,a),[m,a]),p=l.useMemo(()=>{if(t.mode!=="project-multi")return[];const k=[];return t.projects.forEach(E=>{const C=t.openTabs.filter(S=>S.projectId===E.id);if(C.length===0){k.push({projectId:E.id});return}const b=new Set;C.forEach(S=>{b.has(S.scrollGroupId)||(b.add(S.scrollGroupId),k.push({projectId:E.id,scrollGroupId:S.scrollGroupId}))})}),k},[t.mode,t.projects,t.openTabs]),g=k=>{if(k.scrollGroupId!==void 0){if(t.mode==="projectScrollGroup"){t.onOpenProjectInGroup(k.projectId,k.scrollGroupId);return}t.mode==="project-multi"&&t.onOpenProjectInGroup&&t.onOpenProjectInGroup(k.projectId,k.scrollGroupId)}},y=k=>{switch(t.mode){case"project":{t.onChangeSelection({projectId:k.projectId}),r(!1);return}case"project-multi":{const E=t.selection.pairs,C=S=>S.projectId===k.projectId&&S.scrollGroupId===k.scrollGroupId,b=E.some(C)?E.filter(S=>!C(S)):[...E,{projectId:k.projectId,scrollGroupId:k.scrollGroupId}];t.onChangeSelection({pairs:b}),b.length===0&&c&&w(!1);return}case"projectScrollGroup":{if(k.isBoundButClosed&&k.scrollGroupId!==void 0){t.onOpenProjectInGroup(k.projectId,k.scrollGroupId),r(!1);return}if(k.scrollGroupId!==void 0){t.onChangeSelection({projectId:k.projectId,scrollGroupId:k.scrollGroupId}),r(!1);return}const E=t.selection.scrollGroupId??0;t.onChangeSelection({projectId:k.projectId,scrollGroupId:E}),t.onOpenProjectInGroup(k.projectId,E),r(!1)}}},v=()=>{if(t.mode!=="project-multi")return;const k=t.selection.pairs,E=new Set(k.map(b=>`${b.projectId}:${b.scrollGroupId??""}`)),C=[...k];p.forEach(b=>{const S=`${b.projectId}:${b.scrollGroupId??""}`;E.has(S)||(E.add(S),C.push(b))}),t.onChangeSelection({pairs:C})},j=()=>{t.mode==="project-multi"&&(t.onChangeSelection({pairs:[]}),c&&w(!1))},I=l.useMemo(()=>{switch(t.mode){case"project":{const k=t.projects.find(C=>C.id===t.selection.projectId),E=k?k.shortName:t.buttonPlaceholder??"";return{node:E,title:E}}case"project-multi":{const{pairs:k}=t.selection;if(k.length===0){const S=t.buttonPlaceholder??"";return{node:S,title:S}}const E=[];if(k.forEach(S=>{const L=t.projects.find(F=>F.id===S.projectId);L&&E.push({project:L,scrollGroupId:S.scrollGroupId})}),E.length===0){const S=t.buttonPlaceholder??"";return{node:S,title:S}}if(t.getSelectedText){const S=t.getSelectedText(E);return{node:S,title:S}}const C=E.map(({project:S,scrollGroupId:L})=>L===void 0?S.shortName:`${S.shortName} (${on(L)})`).join(", ");if(E.length===1)return{node:C,title:C};const b=E.length.toString();return{node:n.jsxs(n.Fragment,{children:[n.jsx(ne,{variant:"muted",className:"tw-shrink-0",children:b}),n.jsx("span",{className:"tw-min-w-0 tw-truncate",children:C})]}),title:`${b} ${C}`}}case"projectScrollGroup":{const k=t.projects.find(b=>b.id===t.selection.projectId);if(!k){const b=t.buttonPlaceholder??"";return{node:b,title:b}}const E=t.selection.scrollGroupId;if(E===void 0)return{node:k.shortName,title:k.shortName};const C=`${k.shortName} · ${on(E)}`;return{node:C,title:C}}default:return{node:"",title:""}}},[t]),M=t.mode==="project-multi"?n.jsx(R.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}):n.jsx(R.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),T=t.mode==="project-multi"&&t.selection.pairs.length>0,G=t.mode==="projectScrollGroup"||t.mode==="project-multi"&&t.onOpenProjectInGroup?g:void 0;return n.jsxs(ie,{open:e,onOpenChange:r,children:[n.jsx(ge,{asChild:!0,children:n.jsxs(B,{variant:t.buttonVariant??"outline",role:"combobox","aria-expanded":e,"aria-label":t.ariaLabel,disabled:t.isDisabled??!1,title:T?I.title:void 0,className:f("tw-flex tw-w-[180px] tw-items-center tw-justify-between tw-overflow-hidden",t.buttonClassName),children:[n.jsx("span",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2 tw-overflow-hidden tw-whitespace-nowrap tw-text-start",children:typeof I.node=="string"?n.jsx("span",{className:"tw-min-w-0 tw-truncate",children:I.node}):I.node}),M]})}),n.jsx(Qt,{align:t.alignDropDown??"start",collisionPadding:16,className:f("tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0",t.popoverContentClassName),style:t.popoverContentStyle,children:n.jsx(St,{delayDuration:200,children:n.jsxs(se,{shouldFilter:!1,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-pe-2",children:[n.jsx("div",{className:"tw-flex-1",children:n.jsx(Me,{value:o,onValueChange:s,placeholder:d.searchPlaceholder,className:"tw-border-0"})}),n.jsx(yd,{groupByOpenTabs:a,onChangeGroupByOpenTabs:i,showSelectedOnly:t.mode==="project-multi"?c:void 0,onChangeShowSelectedOnly:t.mode==="project-multi"?w:void 0,strings:d})]}),t.mode==="project-multi"&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-py-2 tw-pe-4 tw-ps-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:v,children:`${d.selectAll} (${p.length.toString()})`}),n.jsx(B,{variant:"ghost",size:"sm",onClick:j,children:`${d.clearAll} (${t.selection.pairs.length.toString()})`})]}),n.jsxs(ae,{children:[n.jsx(He,{children:t.commandEmptyMessage??"No projects found"}),h.map((k,E)=>n.jsxs(l.Fragment,{children:[n.jsx(Yt,{heading:Nd(k,d),children:k.rows.map(C=>n.jsx(vd,{row:C,mode:t.mode,strings:d,onClick:y,onOpen:G},C.rowKey))}),E<h.length-1&&n.jsx(tr,{})]},k.kind))]})]})})})]})}function Nd(t,e){switch(t.kind){case"openTabs":return e.openTabsSectionHeading;case"other":return e.otherProjectsSectionHeading;case"flat":default:return}}const kd="16rem",_d="3rem",ca=l.createContext(void 0);function En(){const t=l.useContext(ca);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const eo=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:i="primary",...c},w)=>{const[d,u]=l.useState(t),m=e??d,h=l.useCallback(M=>{const T=typeof M=="function"?M(m):M;r?r(T):u(T)},[r,m]),p=l.useCallback(()=>h(M=>!M),[h]),g=m?"expanded":"collapsed",j=vt()==="ltr"?i:i==="primary"?"secondary":"primary",I=l.useMemo(()=>({state:g,open:m,setOpen:h,toggleSidebar:p,side:j}),[g,m,h,p,j]);return n.jsx(ca.Provider,{value:I,children:n.jsx(St,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":kd,"--sidebar-width-icon":_d,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});eo.displayName="SidebarProvider";const no=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const i=En();return e==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});no.displayName="Sidebar";const da=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=En();return n.jsxs(B,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(R.PanelLeft,{}):n.jsx(R.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});da.displayName="SidebarTrigger";const wa=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=En();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});wa.displayName="SidebarRail";const ro=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));ro.displayName="SidebarInset";const ua=l.forwardRef(({className:t,...e},r)=>n.jsx(Ue,{ref:r,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ua.displayName="SidebarInput";const pa=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));pa.displayName="SidebarHeader";const ma=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ma.displayName="SidebarFooter";const fa=l.forwardRef(({className:t,...e},r)=>n.jsx(Be,{ref:r,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));fa.displayName="SidebarSeparator";const oo=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));oo.displayName="SidebarContent";const Un=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));Un.displayName="SidebarGroup";const Yn=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?sn.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});Yn.displayName="SidebarGroupLabel";const ha=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?sn.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});ha.displayName="SidebarGroupAction";const Xn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",t),...e}));Xn.displayName="SidebarGroupContent";const so=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));so.displayName="SidebarMenu";const ao=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",t),...e}));ao.displayName="SidebarMenuItem";const Cd=Ie.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),io=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...i},c)=>{const w=t?sn.Slot:"button",{state:d}=En(),u=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:f(Cd({variant:r,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:u}),n.jsx(Et,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):u});io.displayName="SidebarMenuButton";const ga=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?sn.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});ga.displayName="SidebarMenuAction";const xa=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));xa.displayName="SidebarMenuBadge";const ba=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(Hn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(Hn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});ba.displayName="SidebarMenuSkeleton";const va=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));va.displayName="SidebarMenuSub";const ya=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));ya.displayName="SidebarMenuSubItem";const ja=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const i=t?sn.Slot:"a";return n.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});ja.displayName="SidebarMenuSubButton";function Na({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:w}){const d=l.useCallback((h,p)=>{o(h,p)},[o]),u=l.useCallback(h=>{const p=r.find(g=>g.projectId===h);return p?p.projectName:h},[r]),m=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(no,{id:t,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(oo,{children:[n.jsxs(Un,{children:[n.jsx(Yn,{className:"tw-text-sm",children:a}),n.jsx(Xn,{children:n.jsx(so,{children:Object.entries(e).map(([h,p])=>n.jsx(ao,{children:n.jsx(io,{onClick:()=>d(h),isActive:m(h),children:n.jsx("span",{className:"tw-pl-3",children:p})})},h))})})]}),n.jsxs(Un,{children:[n.jsx(Yn,{className:"tw-text-sm",children:i}),n.jsx(Xn,{className:"tw-pl-3",children:n.jsx(Gn,{buttonVariant:"ghost",buttonClassName:f("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:Qn},options:r.flatMap(h=>h.projectId),getOptionLabel:u,buttonPlaceholder:c,onChange:h=>{const p=u(h);d(p,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(R.ScrollText,{})})})]})]})})}const sr=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const w=vt();return n.jsxs("div",{id:i,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(R.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(Ue,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:a}),t&&n.jsxs(B,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(R.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});sr.displayName="SearchBar";function Sd({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(sr,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(eo,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Na,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),n.jsx(ro,{className:"tw-min-w-[215px]",children:o})]})]})}const _e="scrBook",Ed="scrRef",Ge="source",Rd="details",Td="Scripture Reference",Id="Scripture Book",ka="Type",Md="Details";function Dd(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:_e,header:(t==null?void 0:t.scriptureReferenceColumnName)??Td,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?st.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===_e?_.formatScrRef(s.start):void 0},getGroupingValue:o=>st.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>_.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>_.formatScrRef(o.start),id:Ed,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:_.formatScrRef(s.start)},sortingFn:(o,s)=>_.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Ge,header:r?(t==null?void 0:t.typeColumnName)??ka:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Rd,header:(t==null?void 0:t.detailsColumnName)??Md,cell:o=>o.getValue(),enableGrouping:!1}]}const Od=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||_.compareScrRefs(t.start,t.end)===0?`${_.scrRefToBBBCCCVVV(t.start)}+${e}`:`${_.scrRefToBBBCCCVVV(t.start)}+${e}-${_.scrRefToBBBCCCVVV(t.end)}+${r}`},$o=t=>`${Od({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Ad({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:w}){const[d,u]=l.useState([]),[m,h]=l.useState([{id:_e,desc:!1}]),[p,g]=l.useState({}),y=l.useMemo(()=>t.flatMap(b=>b.data.map(S=>({...S,source:b.source}))),[t]),v=l.useMemo(()=>Dd({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},r),[o,a,i,r]);l.useEffect(()=>{d.includes(Ge)?h([{id:Ge,desc:!1},{id:_e,desc:!1}]):h([{id:_e,desc:!1}])},[d]);const j=Bt.useReactTable({data:y,columns:v,state:{grouping:d,sorting:m,rowSelection:p},onGroupingChange:u,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:Bt.getExpandedRowModel(),getGroupedRowModel:Bt.getGroupedRowModel(),getCoreRowModel:Bt.getCoreRowModel(),getSortedRowModel:Bt.getSortedRowModel(),getRowId:$o,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const b=j.getSelectedRowModel().rowsById,S=Object.keys(b);if(S.length===1){const L=y.find(F=>$o(F)===S[0])||void 0;L&&c(L)}}},[p,y,c,j]);const I=s??Id,M=a??ka,T=[{label:"No Grouping",value:[]},{label:`Group by ${I}`,value:[_e]},{label:`Group by ${M}`,value:[Ge]},{label:`Group by ${I} and ${M}`,value:[_e,Ge]},{label:`Group by ${M} and ${I}`,value:[Ge,_e]}],G=b=>{u(JSON.parse(b))},k=(b,S)=>{!b.getIsGrouped()&&!b.getIsSelected()&&b.getToggleSelectedHandler()(S)},E=(b,S)=>b.getIsGrouped()?"":f("banded-row",S%2===0?"even":"odd"),C=(b,S,L)=>{if(!((b==null?void 0:b.length)===0||S.depth<L.column.getGroupedIndex())){if(S.getIsGrouped())switch(S.depth){case 1:return"tw-ps-4";default:return}switch(S.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(ze,{value:JSON.stringify(d),onValueChange:b=>{G(b)},children:[n.jsx(Re,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Ke,{})}),n.jsx(Te,{position:"item-aligned",children:n.jsx(zs,{children:T.map(b=>n.jsx(qt,{value:JSON.stringify(b.value),children:b.label},b.label))})})]}),n.jsxs(kn,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(_n,{children:j.getHeaderGroups().map(b=>n.jsx(pe,{children:b.headers.filter(S=>S.column.columnDef.header).map(S=>n.jsx(rn,{colSpan:S.colSpan,className:"top-0 tw-sticky",children:S.isPlaceholder?void 0:n.jsxs("div",{children:[S.column.getCanGroup()?n.jsx(B,{variant:"ghost",title:`Toggle grouping by ${S.column.columnDef.header}`,onClick:S.column.getToggleGroupingHandler(),type:"button",children:S.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Bt.flexRender(S.column.columnDef.header,S.getContext())]})},S.id))},b.id))}),n.jsx(Cn,{children:j.getRowModel().rows.map((b,S)=>{const L=vt();return n.jsx(pe,{"data-state":b.getIsSelected()?"selected":"",className:f(E(b,S)),onClick:F=>k(b,F),children:b.getVisibleCells().map(F=>{if(!(F.getIsPlaceholder()||F.column.columnDef.enableGrouping&&!F.getIsGrouped()&&(F.column.columnDef.id!==Ge||!r)))return n.jsx(Ee,{className:f(F.column.columnDef.id,"tw-p-[1px]",C(d,b,F)),children:F.getIsGrouped()?n.jsxs(B,{variant:"link",onClick:b.getToggleExpandedHandler(),type:"button",children:[b.getIsExpanded()&&n.jsx(R.ChevronDown,{}),!b.getIsExpanded()&&(L==="ltr"?n.jsx(R.ChevronRight,{}):n.jsx(R.ChevronLeft,{}))," ",Bt.flexRender(F.column.columnDef.cell,F.getContext())," (",b.subRows.length,")"]}):Bt.flexRender(F.column.columnDef.cell,F.getContext())},F.id)})},b.id)})})]})]})}const lo=(t,e)=>t.filter(r=>{try{return _.getSectionForBook(r)===e}catch{return!1}}),_a=(t,e,r)=>lo(t,e).every(o=>r.includes(o));function Pd({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=lo(e,t).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(B,{variant:"outline",size:"sm",onClick:()=>o(t),className:f(_a(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:Vi(t,i,c,w,d)})}const Fo=5,br=6;function Ld({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:h,ntLong:p,dcLong:g,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[v,j]=l.useState(!1),[I,M]=l.useState(""),T=l.useRef(void 0),G=l.useRef(!1);if(t.length!==st.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const k=l.useMemo(()=>st.Canon.allBookIds.filter(($,q)=>t[q]==="1"&&!st.Canon.isObsolete(st.Canon.bookIdToNumber($))),[t]),E=l.useMemo(()=>{if(!I.trim()){const U={[_.Section.OT]:[],[_.Section.NT]:[],[_.Section.DC]:[],[_.Section.Extra]:[]};return k.forEach(Z=>{const yt=_.getSectionForBook(Z);U[yt].push(Z)}),U}const $=k.filter(U=>Dr(U,I,s)),q={[_.Section.OT]:[],[_.Section.NT]:[],[_.Section.DC]:[],[_.Section.Extra]:[]};return $.forEach(U=>{const Z=_.getSectionForBook(U);q[Z].push(U)}),q},[k,I,s]),C=l.useCallback(($,q=!1)=>{if(!q||!T.current){r(e.includes($)?e.filter(Q=>Q!==$):[...e,$]),T.current=$;return}const U=k.findIndex(Q=>Q===T.current),Z=k.findIndex(Q=>Q===$);if(U===-1||Z===-1)return;const[yt,At]=[Math.min(U,Z),Math.max(U,Z)],kt=k.slice(yt,At+1).map(Q=>Q);r(e.includes($)?e.filter(Q=>!kt.includes(Q)):[...new Set([...e,...kt])])},[e,r,k]),b=$=>{C($,G.current),G.current=!1},S=($,q)=>{$.preventDefault(),C(q,$.shiftKey)},L=l.useCallback($=>{const q=lo(k,$).map(U=>U);r(_a(k,$,e)?e.filter(U=>!q.includes(U)):[...new Set([...e,...q])])},[e,r,k]),F=()=>{r(k.map($=>$))},A=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(_.Section).map($=>n.jsx(Pd,{section:$,availableBookIds:k,selectedBookIds:e,onToggle:L,localizedStrings:o},$))}),n.jsxs(ie,{open:v,onOpenChange:$=>{j($),$||M("")},children:[n.jsx(ge,{asChild:!0,children:n.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:i,n.jsx(R.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Qt,{className:"tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0",align:"start",children:n.jsxs(se,{shouldFilter:!1,onKeyDown:$=>{$.key==="Enter"&&(G.current=$.shiftKey)},children:[n.jsx(Me,{placeholder:c,value:I,onValueChange:M}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:F,children:w}),n.jsx(B,{variant:"ghost",size:"sm",onClick:A,children:d})]}),n.jsxs(ae,{children:[n.jsx(He,{children:u}),Object.values(_.Section).map(($,q)=>{const U=E[$];if(U.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Yt,{heading:Jo($,h,p,g,y),children:U.map(Z=>n.jsx(ts,{bookId:Z,isSelected:e.includes(Z),onSelect:()=>b(Z),onMouseDown:yt=>S(yt,Z),section:_.getSectionForBook(Z),showCheck:!0,localizedBookNames:s,commandValue:rs(Z,s),className:"tw-flex tw-items-center"},Z))}),q<Object.values(_.Section).length-1&&n.jsx(tr,{})]},$)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===br?br:Fo).map($=>n.jsx(ne,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ce($,s)},$)),e.length>br&&n.jsx(ne,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Fo} ${m}`})]})]})}const $d=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_verse%","%webView_scope_selector_chapter%","%webView_scope_selector_book%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_scope_selector_range%","%webView_scope_selector_select_range%","%webView_scope_selector_range_start%","%webView_scope_selector_range_end%","%webView_scope_selector_ok%","%webView_scope_selector_navigate%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Ot=(t,e)=>t[e]??e,Fd=Object.freeze([" ","-"]);function Gd({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:w,variant:d="radio",rangeStart:u,rangeEnd:m,onRangeStartChange:h,onRangeEndChange:p,currentScrRef:g,onCurrentScrRefChange:y,bookChapterControlLocalizedStrings:v,getEndVerse:j}){const I=Ot(i,"%webView_scope_selector_selected_text%"),M=Ot(i,"%webView_scope_selector_verse%"),T=Ot(i,"%webView_scope_selector_chapter%"),G=Ot(i,"%webView_scope_selector_book%"),k=Ot(i,"%webView_scope_selector_current_verse%"),E=Ot(i,"%webView_scope_selector_current_chapter%"),C=Ot(i,"%webView_scope_selector_current_book%"),b=Ot(i,"%webView_scope_selector_choose_books%"),S=Ot(i,"%webView_scope_selector_scope%"),L=Ot(i,"%webView_scope_selector_select_books%"),F=Ot(i,"%webView_scope_selector_range%"),A=Ot(i,"%webView_scope_selector_select_range%"),$=Ot(i,"%webView_scope_selector_range_start%"),q=Ot(i,"%webView_scope_selector_range_end%"),U=Ot(i,"%webView_scope_selector_ok%"),Z=Ot(i,"%webView_scope_selector_navigate%"),yt=D=>{if(!g)return;const z=g.book.toUpperCase();switch(D){case"verse":return _.formatScrRef(g,"id");case"chapter":return`${z} ${g.chapterNum}`;case"book":return z;default:return}},At=[{value:"selectedText",label:I,id:"scope-selected-text"},{value:"verse",label:M,dropdownLabel:k,scrRefSuffix:yt("verse"),id:"scope-verse"},{value:"chapter",label:T,dropdownLabel:E,scrRefSuffix:yt("chapter"),id:"scope-chapter"},{value:"book",label:G,dropdownLabel:C,scrRefSuffix:yt("book"),id:"scope-book"},{value:"selectedBooks",label:b,id:"scope-selected"},{value:"range",label:F,id:"scope-range"}],kt=(D,z,X=!1)=>n.jsxs(n.Fragment,{children:[D,z&&!X&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[": ",z]})]}),Q=e?At.filter(D=>e.includes(D.value)):At,pt=g??_.defaultScrRef,K=u??pt,et=m??pt,rt=()=>{},at=l.useRef(null),it=l.useRef(null),_t=l.useRef(!1),Rt=l.useRef(null),Pt=l.useRef(!1),[Ne,P]=l.useState(void 0),Lt=l.useRef(!1),Wt=l.useRef(!1),$t=l.useRef(null),V=l.useCallback(D=>{if(D){P("start"),Lt.current=!1;return}P(z=>z==="start"?void 0:z),Lt.current&&(Lt.current=!1,requestAnimationFrame(()=>{var X;const z=(X=at.current)==null?void 0:X.querySelector("button");z==null||z.click()}))},[]),Y=l.useCallback(D=>{if(D){P("end"),Wt.current=!1;return}P(z=>z==="end"?void 0:z)},[]),J=l.useCallback(D=>{h==null||h(D),p==null||p(D),Lt.current=!0},[h,p]),nt=l.useCallback(D=>{p==null||p(D),Wt.current=!0},[p]),lt=l.useCallback(D=>{r(D),D==="selectedBooks"&&s.length===0&&(g!=null&&g.book)&&a([g.book])},[r,s,g,a]),ct=Q.find(D=>D.value===t),Ct=()=>t==="selectedBooks"&&s.length>0?s.map(D=>D.toUpperCase()).join(", "):t==="range"?_.formatScrRefRange(K,et,{optionOrLocalizedBookName:"id",endRefOptionOrLocalizedBookName:"id",repeatBookName:!0}):ct?kt(ct.label,ct.scrRefSuffix):t,ht=Q.filter(D=>D.value!=="selectedBooks"&&D.value!=="range"),gt=Q.find(D=>D.value==="selectedBooks"),jt=Q.find(D=>D.value==="range"),O=n.jsx(Ld,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c}),xt=Ne==="end",mt=Ne==="start",be="tw-text-muted-foreground",De=n.jsxs("div",{className:"tw-flex tw-flex-wrap tw-items-end tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(bt,{htmlFor:"scope-range-start",className:f(xt&&be),children:$}),n.jsx(On,{id:"scope-range-start",scrRef:K,handleSubmit:J,localizedBookNames:c,localizedStrings:v,getEndVerse:j,submitKeys:Fd,onOpenChange:V,className:f(xt&&be),modal:!0})]}),n.jsxs("div",{ref:at,className:"tw-grid tw-gap-2",children:[n.jsx(bt,{htmlFor:"scope-range-end",className:f(mt&&be),children:q}),n.jsx(On,{id:"scope-range-end",scrRef:et,handleSubmit:p?nt:rt,localizedBookNames:c,localizedStrings:v,getEndVerse:j,disableReferencesUpTo:K,onOpenChange:Y,onCloseAutoFocus:D=>{var z;Wt.current&&(Wt.current=!1,D.preventDefault(),(z=$t.current)==null||z.focus())},className:f(mt&&be),modal:!0,align:"start"})]})]}),[Ye,cn]=l.useState(!1),[dn,Oe]=l.useState(void 0),wn=l.useRef({}),Xe=l.useCallback(D=>z=>{wn.current[D]=z},[]),un=l.useRef(null);l.useEffect(()=>{if(!Ye)return;let D=0;const z=requestAnimationFrame(()=>{D=requestAnimationFrame(()=>{var X;(X=wn.current[t])==null||X.focus()})});return()=>{cancelAnimationFrame(z),D&&cancelAnimationFrame(D)}},[Ye,t]);const[Ae,ar]=l.useState(null),[We,ir]=l.useState(null),[N,H]=l.useState(null),W=200,[Ft,ke]=l.useState(!1);l.useEffect(()=>{if(!N||typeof ResizeObserver>"u")return;const D=new ResizeObserver(([z])=>{ke(z.contentRect.width<W)});return D.observe(N),()=>D.disconnect()},[N]);const Pe=l.useCallback(D=>{lt(D),cn(!1),Oe(D)},[lt]),Le=l.useCallback(D=>{var z;D.preventDefault(),(z=un.current)==null||z.focus()},[]),Mt=D=>t===D?n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(R.Check,{className:"tw-h-4 tw-w-4"})}):void 0;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(bt,{children:S}),d==="dropdown"?n.jsxs(re,{open:Ye,onOpenChange:cn,children:[n.jsx(fe,{asChild:!0,children:n.jsxs(B,{ref:un,variant:"outline",role:"combobox",className:"tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:Ct()}),n.jsx(R.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Jt,{ref:H,className:"tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",align:"start",children:n.jsxs(Mn,{container:N,children:[ht.map(({value:D,label:z,dropdownLabel:X,scrRefSuffix:Dt,id:ce})=>n.jsx(Ht,{ref:Xe(D),checked:t===D,onCheckedChange:$e=>{$e&&lt(D)},children:kt(X??z,Dt,Ft)},ce)),(gt||jt)&&n.jsx(he,{}),gt&&n.jsxs(Se,{ref:Xe("selectedBooks"),className:f("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),onSelect:()=>Pe("selectedBooks"),"data-selected":t==="selectedBooks"?"true":void 0,children:[Mt("selectedBooks"),`${gt.label}…`]}),jt&&n.jsxs(Se,{ref:Xe("range"),className:f("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),onSelect:()=>Pe("range"),"data-selected":t==="range"?"true":void 0,children:[Mt("range"),`${jt.label}…`]}),y&&n.jsxs(n.Fragment,{children:[n.jsx(he,{}),n.jsx(ye,{className:"tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground",children:Z}),n.jsx(Se,{ref:Rt,className:"tw-p-0",onSelect:D=>{var z,X;if(D.preventDefault(),_t.current){_t.current=!1;return}Pt.current||(X=(z=it.current)==null?void 0:z.querySelector("button"))==null||X.click()},children:n.jsx("div",{ref:it,className:"tw-w-full tw-px-1 tw-pb-1",onPointerDownCapture:D=>{const z=D.target instanceof HTMLElement?D.target:void 0;z!=null&&z.closest("button")&&(_t.current=!0,requestAnimationFrame(()=>{_t.current=!1}))},children:n.jsx(On,{id:"scope-navigate",scrRef:g??_.defaultScrRef,handleSubmit:y,localizedBookNames:c,localizedStrings:v,getEndVerse:j,triggerVariant:"ghost",onOpenChange:D=>{Pt.current=D},onCloseAutoFocus:D=>{var z;D.preventDefault(),(z=Rt.current)==null||z.focus()},modal:!0,className:"tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",triggerContent:n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:_.formatScrRef(g??_.defaultScrRef,"id")}),n.jsx(R.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})})})})]})]})})]}):n.jsx(er,{value:t,onValueChange:lt,className:"tw-flex tw-flex-col tw-space-y-1",children:Q.map(({value:D,label:z,scrRefSuffix:X,id:Dt})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(yn,{className:"tw-me-2",value:D,id:Dt}),n.jsx(bt,{htmlFor:Dt,children:kt(z,X)})]},Dt))})]}),d==="radio"&&t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(bt,{children:L}),O]}),d==="radio"&&t==="range"&&De,d==="dropdown"&&gt&&n.jsx($n,{open:dn==="selectedBooks",onOpenChange:D=>{D||Oe(void 0)},children:n.jsx(xn,{ref:ir,onCloseAutoFocus:Le,onEscapeKeyDown:D=>{We!=null&&We.querySelector('[data-state="open"]')&&D.preventDefault()},children:n.jsxs(Mn,{container:We,children:[n.jsx(bn,{className:"tw-pe-8",children:n.jsx(vn,{children:b})}),O,n.jsx(Fn,{children:n.jsx(B,{onClick:()=>Oe(void 0),children:U})})]})})}),d==="dropdown"&&jt&&n.jsx($n,{open:dn==="range",onOpenChange:D=>{D||Oe(void 0)},children:n.jsx(xn,{ref:ar,onCloseAutoFocus:Le,onEscapeKeyDown:D=>{Ae!=null&&Ae.querySelector('[data-state="open"]')&&D.preventDefault()},children:n.jsxs(Mn,{container:Ae,children:[n.jsx(bn,{className:"tw-pe-8",children:n.jsx(vn,{children:A})}),De,n.jsx(Fn,{children:n.jsx(B,{ref:$t,onClick:()=>Oe(void 0),children:U})})]})})})]})}const vr={[_.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[_.getLocalizeKeyForScrollGroupId(0)]:"A",[_.getLocalizeKeyForScrollGroupId(1)]:"B",[_.getLocalizeKeyForScrollGroupId(2)]:"C",[_.getLocalizeKeyForScrollGroupId(3)]:"D",[_.getLocalizeKeyForScrollGroupId(4)]:"E",[_.getLocalizeKeyForScrollGroupId(5)]:"F",[_.getLocalizeKeyForScrollGroupId(6)]:"G",[_.getLocalizeKeyForScrollGroupId(7)]:"H",[_.getLocalizeKeyForScrollGroupId(8)]:"I",[_.getLocalizeKeyForScrollGroupId(9)]:"J",[_.getLocalizeKeyForScrollGroupId(10)]:"K",[_.getLocalizeKeyForScrollGroupId(11)]:"L",[_.getLocalizeKeyForScrollGroupId(12)]:"M",[_.getLocalizeKeyForScrollGroupId(13)]:"N",[_.getLocalizeKeyForScrollGroupId(14)]:"O",[_.getLocalizeKeyForScrollGroupId(15)]:"P",[_.getLocalizeKeyForScrollGroupId(16)]:"Q",[_.getLocalizeKeyForScrollGroupId(17)]:"R",[_.getLocalizeKeyForScrollGroupId(18)]:"S",[_.getLocalizeKeyForScrollGroupId(19)]:"T",[_.getLocalizeKeyForScrollGroupId(20)]:"U",[_.getLocalizeKeyForScrollGroupId(21)]:"V",[_.getLocalizeKeyForScrollGroupId(22)]:"W",[_.getLocalizeKeyForScrollGroupId(23)]:"X",[_.getLocalizeKeyForScrollGroupId(24)]:"Y",[_.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Vd({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...vr,...Object.fromEntries(Object.entries(o).map(([d,u])=>[d,d===u&&d in vr?vr[d]:u]))},w=vt();return n.jsxs(ze,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(Re,{size:s,className:f("pr-twp tw-w-auto",a),children:n.jsx(Ke,{placeholder:c[_.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(Te,{id:i,align:w==="rtl"?"end":"start",style:{zIndex:qe},children:t.map(d=>n.jsx(qt,{value:`${d}`,children:c[_.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function Bd({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function zd({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function Kd({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(Be,{}):""]})}function Ca(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function Wn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Sa=(t,e,r,o)=>r?Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:"command"in c?n.jsxs(Se,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(Wn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(Wn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Gs,{children:[n.jsx(Xr,{children:c.label}),n.jsx(Fs,{children:n.jsx(Wr,{children:Sa(t,e,Ca(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(Et,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function Zn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return n.jsxs(re,{variant:a,children:[n.jsx(fe,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(B,{variant:i,size:"icon",children:o??n.jsx(R.MenuIcon,{})})}),n.jsx(Jt,{align:"start",style:{zIndex:qe},children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,u)=>n.jsxs(l.Fragment,{children:[n.jsx(Yr,{children:n.jsx(St,{children:Sa(e.groups,e.items,w,t)})}),d<u.length-1&&n.jsx(he,{})]},w))})]})}const Ea=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function qd({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(Ea,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(Zn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(R.Menu,{}),buttonVariant:"ghost"}),i&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:i}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(Zn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(R.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function Hd({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Ea,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(Zn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const co=l.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(Kt.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});co.displayName=Kt.List.displayName;const wo=l.forwardRef(({className:t,...e},r)=>n.jsx(Kt.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));wo.displayName=Kt.List.displayName;const Ra=l.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Trigger,{ref:r,...e,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),uo=l.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));uo.displayName=Kt.Content.displayName;function Ud({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return n.jsxs("div",{id:i,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(sr,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(co,{children:[n.jsx(wo,{children:t.map(c=>n.jsx(Ra,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(uo,{value:c.value,children:c.content},c.key))]})]})}function Yd({...t}){return n.jsx(wt.Menu,{...t})}function Xd({...t}){return n.jsx(wt.Sub,{"data-slot":"menubar-sub",...t})}const Ta=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(Ur.Provider,{value:s,children:n.jsx(wt.Root,{ref:o,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Ta.displayName=wt.Root.displayName;const Ia=l.forwardRef(({className:t,...e},r)=>{const o=le();return n.jsx(wt.Trigger,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",je({variant:o.variant,className:t})),...e})});Ia.displayName=wt.Trigger.displayName;const Ma=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=le();return n.jsxs(wt.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",je({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(R.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ma.displayName=wt.SubTrigger.displayName;const Da=l.forwardRef(({className:t,...e},r)=>{const o=le();return n.jsx(wt.SubContent,{ref:r,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Da.displayName=wt.SubContent.displayName;const Oa=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const i=le();return n.jsx(wt.Portal,{children:n.jsx(wt.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...s})})});Oa.displayName=wt.Content.displayName;const Aa=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=le();return n.jsx(wt.Item,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",je({variant:s.variant,className:t}),t),...r})});Aa.displayName=wt.Item.displayName;const Wd=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=le();return n.jsxs(wt.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",je({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(wt.ItemIndicator,{children:n.jsx(R.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Wd.displayName=wt.CheckboxItem.displayName;const Zd=l.forwardRef(({className:t,children:e,...r},o)=>{const s=le();return n.jsxs(wt.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",je({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(wt.ItemIndicator,{children:n.jsx(R.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Zd.displayName=wt.RadioItem.displayName;const Jd=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(wt.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Jd.displayName=wt.Label.displayName;const Pa=l.forwardRef(({className:t,...e},r)=>n.jsx(wt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Pa.displayName=wt.Separator.displayName;const mn=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},La=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=e.filter(d=>d.group===a).sort((d,u)=>d.order-u.order).map(d=>n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:"command"in d?n.jsxs(Aa,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(Wn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(Wn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(Xd,{children:[n.jsx(Ma,{children:d.label}),n.jsx(Da,{children:La(t,e,Ca(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(Et,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&i<s.length-1&&w.push(n.jsx(Pa,{},`separator-${a}`)),w})};function Qd({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=u=>{switch(u){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return w;default:return}};if(Ii.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,m)=>{var g,y,v,j;u.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},p={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":mn(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),mn(a,[h,p]);break;case"alt+l":(y=i.current)==null||y.focus(),mn(i,[h,p]);break;case"alt+n":(v=c.current)==null||v.focus(),mn(c,[h,p]);break;case"alt+h":(j=w.current)==null||j.focus(),mn(w,[h,p]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const u=new MutationObserver(p=>{p.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const y=g.target.getAttribute("data-state");r(y==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(p=>{u.observe(p,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(Ta,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,m])=>typeof u=="boolean"||typeof m=="boolean"?0:u.order-m.order).map(([u,m])=>n.jsxs(Yd,{children:[n.jsx(Ia,{ref:d(u),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(Oa,{style:{zIndex:qe},children:n.jsx(St,{children:La(t.groups,t.items,u,e)})})]},u))})}function tw(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function ew({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const u=l.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&n.jsx(Qd,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const nw=(t,e)=>t[e]??e;function rw({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:w}){const d=nw(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[u,m]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(y=>y!==g)]),a&&r.find(y=>y===g)&&a([...r.filter(y=>y!==g)]),m(!1)},p=(g,y)=>{var j,I,M,T,G,k;const v=y!==g?((I=(j=t[g])==null?void 0:j.uiNames)==null?void 0:I[y])??((T=(M=t[g])==null?void 0:M.uiNames)==null?void 0:T.en):void 0;return v?`${(G=t[g])==null?void 0:G.autonym} (${v})`:(k=t[g])==null?void 0:k.autonym};return n.jsxs("div",{id:w,className:f("pr-twp tw-max-w-sm",c),children:[n.jsxs(ze,{name:"uiLanguage",value:e,onValueChange:h,open:u,onOpenChange:g=>m(g),children:[n.jsx(Re,{children:n.jsx(Ke,{})}),n.jsx(Te,{style:{zIndex:qe},children:Object.keys(t).map(g=>n.jsx(qt,{value:g,children:p(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(bt,{className:"tw-font-normal tw-text-muted-foreground",children:_.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>p(g,e)).join(", "):t.en.autonym})})})]})}function ow({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(bt,{children:e(t)}):r?n.jsx(bt,{children:r(t)}):n.jsx(bt,{children:t})}function sw({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(or,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(ow,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function aw({scrRef:t,onClick:e,tooltipContent:r,ariaLabel:o,className:s,testId:a="linked-scr-ref-button"}){if(t==="")return;const i=n.jsx(B,{type:"button",variant:"link",onClick:e,disabled:!e,"aria-label":o,className:f("tw-h-auto tw-p-0 tw-text-start tw-font-mono tw-text-sm",s),"data-testid":a,children:t});return r?n.jsx(St,{delayDuration:0,children:n.jsxs(Tt,{children:[n.jsx(It,{asChild:!0,children:i}),n.jsx(Et,{children:r})]})}):i}function iw({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:i,selectedButtons:c,hoverButtons:w,dropdownContent:d,additionalContent:u,accentColor:m,showDropdownOnHover:h=!1}){const p=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:f("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),e&&c,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&h&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(re,{children:[n.jsx(fe,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(R.MoreVertical,{})})}),n.jsx(Jt,{align:"end",children:d})]})}),e&&d&&n.jsxs(re,{children:[n.jsx(fe,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(R.MoreVertical,{})})}),n.jsx(Jt,{align:"end",children:d})]})]}),u&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:u})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const $a=l.forwardRef(({className:t,...e},r)=>n.jsx(R.LoaderCircle,{size:35,className:f("tw-animate-spin",t),...e,ref:r}));$a.displayName="Spinner";function lw({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:w,defaultValue:d,value:u,onChange:m,onFocus:h,onBlur:p}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(bt,{htmlFor:t,className:f({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(Ue,{id:t,disabled:e,placeholder:i,required:c,className:f(w,{"tw-border-red-600":r}),defaultValue:d,value:u,onChange:m,onFocus:h,onBlur:p}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const cw=Ie.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Fa=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:f("pr-twp",cw({variant:e}),t),...r}));Fa.displayName="Alert";const Ga=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Ga.displayName="AlertTitle";const Va=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Va.displayName="AlertDescription";const dw=ut.Root,ww=ut.Trigger,uw=ut.Group,pw=ut.Portal,mw=ut.Sub,fw=ut.RadioGroup,Ba=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(ut.SubTrigger,{ref:s,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(R.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ba.displayName=ut.SubTrigger.displayName;const za=l.forwardRef(({className:t,...e},r)=>n.jsx(ut.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));za.displayName=ut.SubContent.displayName;const Ka=l.forwardRef(({className:t,...e},r)=>n.jsx(ut.Portal,{children:n.jsx(ut.Content,{ref:r,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Ka.displayName=ut.Content.displayName;const qa=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(ut.Item,{ref:o,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));qa.displayName=ut.Item.displayName;const Ha=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(ut.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ut.ItemIndicator,{children:n.jsx(R.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Ha.displayName=ut.CheckboxItem.displayName;const Ua=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(ut.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ut.ItemIndicator,{children:n.jsx(R.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Ua.displayName=ut.RadioItem.displayName;const Ya=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(ut.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));Ya.displayName=ut.Label.displayName;const Xa=l.forwardRef(({className:t,...e},r)=>n.jsx(ut.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));Xa.displayName=ut.Separator.displayName;function Wa({className:t,...e}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Wa.displayName="ContextMenuShortcut";const Za=l.createContext({direction:"bottom"});function Ja({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(Za.Provider,{value:o,children:n.jsx(oe.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}Ja.displayName="Drawer";const hw=oe.Drawer.Trigger,Qa=oe.Drawer.Portal,gw=oe.Drawer.Close,po=l.forwardRef(({className:t,...e},r)=>n.jsx(oe.Drawer.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));po.displayName=oe.Drawer.Overlay.displayName;const ti=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(Za),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(Qa,{children:[n.jsx(po,{}),n.jsxs(oe.Drawer.Content,{ref:s,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});ti.displayName="DrawerContent";function ei({className:t,...e}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ei.displayName="DrawerHeader";function ni({className:t,...e}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}ni.displayName="DrawerFooter";const ri=l.forwardRef(({className:t,...e},r)=>n.jsx(oe.Drawer.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));ri.displayName=oe.Drawer.Title.displayName;const oi=l.forwardRef(({className:t,...e},r)=>n.jsx(oe.Drawer.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));oi.displayName=oe.Drawer.Description.displayName;const si=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(kr.Root,{ref:o,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(kr.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));si.displayName=kr.Root.displayName;function xw({className:t,...e}){return n.jsx(Rr.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const bw=Rr.Panel;function vw({withHandle:t,className:e,...r}){return n.jsx(Rr.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(R.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function yw({...t}){return n.jsx(zo.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ai=l.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsxs(fn.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(fn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(fn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(fn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ai.displayName=fn.Root.displayName;const ii=l.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(_r.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(_r.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ii.displayName=_r.Root.displayName;const jw=Kt.Root,li=l.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(Kt.List,{ref:r,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});li.displayName=Kt.List.displayName;const ci=l.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Trigger,{ref:r,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));ci.displayName=Kt.Trigger.displayName;const di=l.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Content,{ref:r,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));di.displayName=Kt.Content.displayName;const wi=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));wi.displayName="Textarea";const Nw=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function kw(t){return{preserveValue:!0,...t}}const ui=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=kw(s.current);const[a,i]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const u=await t();d&&(i(()=>u),w(!1))}})(),()=>{d=!1,s.current.preserveValue||i(()=>o.current)}},[t]),[a,c]},yr=()=>!1,_w=(t,e)=>{const[r]=ui(l.useCallback(async()=>{if(!t)return yr;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),yr,{preserveValue:!1});l.useEffect(()=>()=>{r!==yr&&r()},[r])};function Cw(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>zo.toast});exports.Alert=Fa;exports.AlertDescription=Va;exports.AlertTitle=Ga;exports.Avatar=qr;exports.AvatarFallback=Hr;exports.AvatarImage=$s;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Yi;exports.BOOK_SELECTOR_STRING_KEYS=Zi;exports.Badge=ne;exports.BookChapterControl=On;exports.BookSelector=Ji;exports.Button=B;exports.COMMENT_EDITOR_STRING_KEYS=vc;exports.COMMENT_LIST_STRING_KEYS=yc;exports.Card=zr;exports.CardContent=Kr;exports.CardDescription=Ps;exports.CardFooter=Ls;exports.CardHeader=Os;exports.CardTitle=As;exports.ChapterRangeSelector=ss;exports.Checkbox=or;exports.Checklist=sw;exports.ComboBox=Gn;exports.Command=se;exports.CommandEmpty=He;exports.CommandGroup=Yt;exports.CommandInput=Me;exports.CommandItem=Xt;exports.CommandList=ae;exports.CommentEditor=bc;exports.CommentList=_c;exports.ContextMenu=dw;exports.ContextMenuCheckboxItem=Ha;exports.ContextMenuContent=Ka;exports.ContextMenuGroup=uw;exports.ContextMenuItem=qa;exports.ContextMenuLabel=Ya;exports.ContextMenuPortal=pw;exports.ContextMenuRadioGroup=fw;exports.ContextMenuRadioItem=Ua;exports.ContextMenuSeparator=Xa;exports.ContextMenuShortcut=Wa;exports.ContextMenuSub=mw;exports.ContextMenuSubContent=za;exports.ContextMenuSubTrigger=Ba;exports.ContextMenuTrigger=ww;exports.DataTable=Xs;exports.Dialog=$n;exports.DialogClose=Gi;exports.DialogContent=xn;exports.DialogDescription=Wo;exports.DialogFooter=Fn;exports.DialogHeader=bn;exports.DialogOverlay=Ir;exports.DialogPortal=Xo;exports.DialogTitle=vn;exports.DialogTrigger=Fi;exports.Drawer=Ja;exports.DrawerClose=gw;exports.DrawerContent=ti;exports.DrawerDescription=oi;exports.DrawerFooter=ni;exports.DrawerHeader=ei;exports.DrawerOverlay=po;exports.DrawerPortal=Qa;exports.DrawerTitle=ri;exports.DrawerTrigger=hw;exports.DropdownMenu=re;exports.DropdownMenuCheckboxItem=Ht;exports.DropdownMenuContent=Jt;exports.DropdownMenuGroup=Yr;exports.DropdownMenuItem=Se;exports.DropdownMenuItemType=Js;exports.DropdownMenuLabel=ye;exports.DropdownMenuPortal=Fs;exports.DropdownMenuRadioGroup=Vs;exports.DropdownMenuRadioItem=Zr;exports.DropdownMenuSeparator=he;exports.DropdownMenuShortcut=Bs;exports.DropdownMenuSub=Gs;exports.DropdownMenuSubContent=Wr;exports.DropdownMenuSubTrigger=Xr;exports.DropdownMenuTrigger=fe;exports.ERROR_DUMP_STRING_KEYS=Ws;exports.ERROR_POPOVER_STRING_KEYS=Dc;exports.EditorKeyboardShortcuts=na;exports.ErrorDump=Zs;exports.ErrorPopover=Oc;exports.FOOTNOTE_EDITOR_STRING_KEYS=Zc;exports.Filter=Fc;exports.FilterDropdown=Ac;exports.Footer=$c;exports.FootnoteEditor=Wc;exports.FootnoteItem=aa;exports.FootnoteList=td;exports.INVENTORY_STRING_KEYS=wd;exports.Input=Ue;exports.Inventory=md;exports.Label=bt;exports.LinkedScrRefButton=aw;exports.MARKER_MENU_STRING_KEYS=ra;exports.MarkdownRenderer=Mc;exports.MarkerMenu=oa;exports.MoreInfo=Pc;exports.MultiSelectComboBox=Qs;exports.NavigationContentSearch=Ud;exports.Popover=ie;exports.PopoverAnchor=es;exports.PopoverContent=Qt;exports.PopoverPortalContainerProvider=Mn;exports.PopoverTrigger=ge;exports.Progress=si;exports.ProjectSelector=jd;exports.RadioGroup=er;exports.RadioGroupItem=yn;exports.RecentSearches=os;exports.ResizableHandle=vw;exports.ResizablePanel=bw;exports.ResizablePanelGroup=xw;exports.ResultsCard=iw;exports.SCOPE_SELECTOR_STRING_KEYS=$d;exports.ScopeSelector=Gd;exports.ScriptureResultsViewer=Ad;exports.ScrollGroupSelector=Vd;exports.SearchBar=sr;exports.Select=ze;exports.SelectContent=Te;exports.SelectGroup=zs;exports.SelectItem=qt;exports.SelectLabel=qs;exports.SelectScrollDownButton=Qr;exports.SelectScrollUpButton=Jr;exports.SelectSeparator=Hs;exports.SelectTrigger=Re;exports.SelectValue=Ke;exports.Separator=Be;exports.SettingsList=Bd;exports.SettingsListHeader=Kd;exports.SettingsListItem=zd;exports.SettingsSidebar=Na;exports.SettingsSidebarContentSearch=Sd;exports.Sidebar=no;exports.SidebarContent=oo;exports.SidebarFooter=ma;exports.SidebarGroup=Un;exports.SidebarGroupAction=ha;exports.SidebarGroupContent=Xn;exports.SidebarGroupLabel=Yn;exports.SidebarHeader=pa;exports.SidebarInput=ua;exports.SidebarInset=ro;exports.SidebarMenu=so;exports.SidebarMenuAction=ga;exports.SidebarMenuBadge=xa;exports.SidebarMenuButton=io;exports.SidebarMenuItem=ao;exports.SidebarMenuSkeleton=ba;exports.SidebarMenuSub=va;exports.SidebarMenuSubButton=ja;exports.SidebarMenuSubItem=ya;exports.SidebarProvider=eo;exports.SidebarRail=wa;exports.SidebarSeparator=fa;exports.SidebarTrigger=da;exports.Skeleton=Hn;exports.Slider=ai;exports.Sonner=yw;exports.Spinner=$a;exports.Switch=ii;exports.TabDropdownMenu=Zn;exports.TabFloatingMenu=Hd;exports.TabToolbar=qd;exports.Table=kn;exports.TableBody=Cn;exports.TableCaption=Ys;exports.TableCell=Ee;exports.TableFooter=Us;exports.TableHead=rn;exports.TableHeader=_n;exports.TableRow=pe;exports.Tabs=jw;exports.TabsContent=di;exports.TabsList=li;exports.TabsTrigger=ci;exports.TextField=lw;exports.Textarea=wi;exports.ToggleGroup=rr;exports.ToggleGroupItem=tn;exports.Toolbar=ew;exports.Tooltip=Tt;exports.TooltipContent=Et;exports.TooltipProvider=St;exports.TooltipTrigger=It;exports.UNDO_REDO_BUTTONS_STRING_KEYS=ta;exports.UiLanguageSelector=rw;exports.UndoRedoButtons=ea;exports.VerticalTabs=co;exports.VerticalTabsContent=uo;exports.VerticalTabsList=wo;exports.VerticalTabsTrigger=Ra;exports.Z_INDEX_ABOVE_DOCK=qe;exports.Z_INDEX_FOOTNOTE_EDITOR=Tr;exports.Z_INDEX_MODAL=Yo;exports.Z_INDEX_MODAL_BACKDROP=Uo;exports.Z_INDEX_OVERLAY=Qn;exports.badgeVariants=Ds;exports.buttonVariants=Or;exports.cn=f;exports.computeRows=Ln;exports.getBookIdFromUSFM=dd;exports.getInventoryHeader=Sn;exports.getLinesFromUSFM=ld;exports.getNumberFromUSFM=cd;exports.getStatusForItem=ia;exports.getToolbarOSReservedSpaceClassName=tw;exports.inventoryCountColumn=ad;exports.inventoryItemColumn=od;exports.inventoryStatusColumn=id;exports.partitionAndSort=la;exports.scrollGroupLetter=on;exports.selectTriggerVariants=Ks;exports.useEvent=Nw;exports.useEventAsync=_w;exports.useListbox=Ms;exports.usePromise=ui;exports.useRecentSearches=Bi;exports.useSidebar=En;exports.useStylesheet=Cw;function Sw(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Sw(`*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*:where(.pr-twp,.pr-twp *),
::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html:where(.pr-twp,.pr-twp *),
:host:where(.pr-twp,.pr-twp *) {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */ /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body:where(.pr-twp,.pr-twp *) {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr:where(.pr-twp,.pr-twp *) {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]):where(.pr-twp,.pr-twp *) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *) {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a:where(.pr-twp,.pr-twp *) {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b:where(.pr-twp,.pr-twp *),
strong:where(.pr-twp,.pr-twp *) {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code:where(.pr-twp,.pr-twp *),
kbd:where(.pr-twp,.pr-twp *),
samp:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small:where(.pr-twp,.pr-twp *) {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub:where(.pr-twp,.pr-twp *),
sup:where(.pr-twp,.pr-twp *) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub:where(.pr-twp,.pr-twp *) {
  bottom: -0.25em;
}

sup:where(.pr-twp,.pr-twp *) {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table:where(.pr-twp,.pr-twp *) {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button:where(.pr-twp,.pr-twp *),
input:where(.pr-twp,.pr-twp *),
optgroup:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *),
textarea:where(.pr-twp,.pr-twp *) {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *) {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button:where(.pr-twp,.pr-twp *),
input:where([type='button']):where(.pr-twp,.pr-twp *),
input:where([type='reset']):where(.pr-twp,.pr-twp *),
input:where([type='submit']):where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring:where(.pr-twp,.pr-twp *) {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid:where(.pr-twp,.pr-twp *) {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress:where(.pr-twp,.pr-twp *) {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button:where(.pr-twp,.pr-twp *),
::-webkit-outer-spin-button:where(.pr-twp,.pr-twp *) {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search']:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary:where(.pr-twp,.pr-twp *) {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote:where(.pr-twp,.pr-twp *),
dl:where(.pr-twp,.pr-twp *),
dd:where(.pr-twp,.pr-twp *),
h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *),
hr:where(.pr-twp,.pr-twp *),
figure:where(.pr-twp,.pr-twp *),
p:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  margin: 0;
}

fieldset:where(.pr-twp,.pr-twp *) {
  margin: 0;
  padding: 0;
}

legend:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

ol:where(.pr-twp,.pr-twp *),
ul:where(.pr-twp,.pr-twp *),
menu:where(.pr-twp,.pr-twp *) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea:where(.pr-twp,.pr-twp *) {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder:where(.pr-twp,.pr-twp *),
textarea::placeholder:where(.pr-twp,.pr-twp *) {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button:where(.pr-twp,.pr-twp *),
[role="button"]:where(.pr-twp,.pr-twp *) {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled:where(.pr-twp,.pr-twp *) {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img:where(.pr-twp,.pr-twp *),
svg:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *),
canvas:where(.pr-twp,.pr-twp *),
audio:where(.pr-twp,.pr-twp *),
iframe:where(.pr-twp,.pr-twp *),
embed:where(.pr-twp,.pr-twp *),
object:where(.pr-twp,.pr-twp *) {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *) {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using \`hsl(var(--variableName))\` or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  /* ["Slate" base theme by shadcn/ui](https://ui.shadcn.com/docs/theming#slate) */
  :root {
    --background: 0 0% 100%; /* white */
    --foreground: 222.2 84% 4.9%; /* slate-950 */
    --card: 0 0% 100%; /* white */
    --card-foreground: 222.2 84% 4.9%; /* slate-950 */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* slate-950 */
    --primary: 222.2 47.4% 11.2%; /* slate-900 */
    --primary-foreground: 210 40% 98%; /* slate-50 */
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%; /* slate-500 */
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* slate-950 */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-primary: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-primary-foreground: 210 40% 98%; /* slate-50 */
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* slate-950 */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* slate-950 */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* slate-950 */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* slate-950 */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%; /* slate-800 */
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%; /* slate-800 */
    --muted-foreground: 215 20.2% 65.1%; /* slate-400 */
    --accent: 217.2 32.6% 17.5%; /* slate-800 */
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%; /* slate-300 */

    --sidebar-background: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-accent-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-border: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-ring: 212.7 26.8% 83.9%; /* slate-300 */
  }

  /* Palette built in https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74 based on "Caffeine" theme*/
  .pr-twp,
  .pr-twp * {
  border-color: hsl(var(--border));
  outline-color: hsl(var(--ring) / 0.5);
}

  /**
    * disabled because tslint does not like it, but it is the selector that's needed
    */
  /* stylelint-disable-next-line selector-no-qualifying-type */
  body.pr-twp {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "“""”""‘""’";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-lead: hsl(var(--muted-foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-quote-borders: hsl(var(--border));
  --tw-prose-captions: hsl(var(--muted-foreground));
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-code: hsl(var(--muted-foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  --tw-prose-th-borders: hsl(var(--border));
  --tw-prose-td-borders: hsl(var(--border));
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.tw-prose-sm :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.tw-prose-sm :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-inline-start: 1.1111111em;
}
.tw-prose-sm :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.tw-prose-sm :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.tw-prose-sm :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.tw-prose-sm :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.tw-prose-sm :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  border-radius: 0.3125rem;
  padding-top: 0.1428571em;
  padding-inline-end: 0.3571429em;
  padding-bottom: 0.1428571em;
  padding-inline-start: 0.3571429em;
}
.tw-prose-sm :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
}
.tw-prose-sm :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.9em;
}
.tw-prose-sm :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8888889em;
}
.tw-prose-sm :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.tw-prose-sm :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.tw-prose-sm :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.tw-prose-sm :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.tw-prose-sm :where(.tw-prose-sm > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(.tw-prose-sm > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-quoteless :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose-quoteless :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-pointer-events-auto {
  pointer-events: auto;
}
.tw-invisible {
  visibility: hidden;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw--left-\\[1px\\] {
  left: -1px;
}
.tw--right-1 {
  right: -0.25rem;
}
.tw--top-\\[1px\\] {
  top: -1px;
}
.tw-bottom-0 {
  bottom: 0px;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-50 {
  z-index: 50;
}
.tw-col-span-1 {
  grid-column: span 1 / span 1;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-col-start-1 {
  grid-column-start: 1;
}
.tw-row-span-2 {
  grid-row: span 2 / span 2;
}
.tw-row-start-2 {
  grid-row-start: 2;
}
.tw-m-0 {
  margin: 0px;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-0 {
  margin-left: 0px;
  margin-right: 0px;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2\\.5 {
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-24 {
  margin-bottom: 6rem;
}
.tw-mb-3 {
  margin-bottom: 0.75rem;
}
.tw-mb-4 {
  margin-bottom: 1rem;
}
.tw-me-1 {
  margin-inline-end: 0.25rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-4 {
  margin-left: 1rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-mr-24 {
  margin-right: 6rem;
}
.tw-mr-3 {
  margin-right: 0.75rem;
}
.tw-mr-4 {
  margin-right: 1rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-24 {
  margin-top: 6rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-6 {
  margin-top: 1.5rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1 {
  height: 0.25rem;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-32 {
  height: 8rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-64 {
  height: 16rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[300px\\] {
  height: 300px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[calc\\(100\\%-2px\\)\\] {
  height: calc(100% - 2px);
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-10 {
  max-height: 2.5rem;
}
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-11 {
  min-height: 2.75rem;
}
.tw-min-h-\\[80px\\] {
  min-height: 80px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-1 {
  width: 0.25rem;
}
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-12 {
  width: 3rem;
}
.tw-w-16 {
  width: 4rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-24 {
  width: 6rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-32 {
  width: 8rem;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-4\\/5 {
  width: 80%;
}
.tw-w-4\\/6 {
  width: 66.666667%;
}
.tw-w-48 {
  width: 12rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-5\\/6 {
  width: 83.333333%;
}
.tw-w-56 {
  width: 14rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-60 {
  width: 15rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-80 {
  width: 20rem;
}
.tw-w-9 {
  width: 2.25rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[180px\\] {
  width: 180px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[250px\\] {
  width: 250px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[320px\\] {
  width: 320px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[500px\\] {
  width: 500px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[600px\\] {
  width: 600px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-\\[calc\\(100\\%-2px\\)\\] {
  width: calc(100% - 2px);
}
.tw-w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\] {
  width: var(--radix-dropdown-menu-trigger-width);
}
.tw-w-\\[var\\(--radix-popper-anchor-width\\,280px\\)\\] {
  width: var(--radix-popper-anchor-width,280px);
}
.tw-w-auto {
  width: auto;
}
.tw-w-fit {
  width: fit-content;
}
.tw-w-full {
  width: 100%;
}
.tw-w-max {
  width: max-content;
}
.tw-w-px {
  width: 1px;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
}
.tw-min-w-36 {
  min-width: 9rem;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-8 {
  min-width: 2rem;
}
.tw-min-w-80 {
  min-width: 20rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[140px\\] {
  min-width: 140px;
}
.tw-min-w-\\[200px\\] {
  min-width: 200px;
}
.tw-min-w-\\[215px\\] {
  min-width: 215px;
}
.tw-min-w-\\[26px\\] {
  min-width: 26px;
}
.tw-min-w-\\[500px\\] {
  min-width: 500px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-min-w-min {
  min-width: min-content;
}
.tw-max-w-2xl {
  max-width: 42rem;
}
.tw-max-w-3xl {
  max-width: 48rem;
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-6xl {
  max-width: 72rem;
}
.tw-max-w-96 {
  max-width: 24rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[200px\\] {
  max-width: 200px;
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-\\[280px\\] {
  max-width: 280px;
}
.tw-max-w-\\[calc\\(100vw-2rem\\)\\] {
  max-width: calc(100vw - 2rem);
}
.tw-max-w-fit {
  max-width: fit-content;
}
.tw-max-w-full {
  max-width: 100%;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-md {
  max-width: 28rem;
}
.tw-max-w-none {
  max-width: none;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-max-w-xs {
  max-width: 20rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink {
  flex-shrink: 1;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-grow-\\[10\\] {
  flex-grow: 10;
}
.tw-grow-\\[1\\] {
  flex-grow: 1;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw-border-collapse {
  border-collapse: collapse;
}
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-ew-resize {
  cursor: ew-resize;
}
.tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-scroll-m-20 {
  scroll-margin: 5rem;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-outside {
  list-style-position: outside;
}
.\\!tw-list-\\[lower-alpha\\] {
  list-style-type: lower-alpha !important;
}
.\\!tw-list-\\[lower-roman\\] {
  list-style-type: lower-roman !important;
}
.\\!tw-list-\\[upper-alpha\\] {
  list-style-type: upper-alpha !important;
}
.\\!tw-list-\\[upper-roman\\] {
  list-style-type: upper-roman !important;
}
.\\!tw-list-decimal {
  list-style-type: decimal !important;
}
.\\!tw-list-disc {
  list-style-type: disc !important;
}
.tw-list-decimal {
  list-style-type: decimal;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-list-none {
  list-style-type: none;
}
.tw-grid-flow-col {
  grid-auto-flow: column;
}
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-grid-cols-\\[min-content_1fr\\] {
  grid-template-columns: min-content 1fr;
}
.tw-grid-cols-\\[min-content_min-content_1fr\\] {
  grid-template-columns: min-content min-content 1fr;
}
.tw-grid-cols-subgrid {
  grid-template-columns: subgrid;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-row-reverse {
  flex-direction: row-reverse;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-content-center {
  align-content: center;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
}
.tw-items-baseline {
  align-items: baseline;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0 {
  gap: 0px;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-5 {
  gap: 1.25rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-\\[12px\\] {
  gap: 12px;
}
.tw-gap-x-1 {
  column-gap: 0.25rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-3 {
  column-gap: 0.75rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-gap-y-1 {
  row-gap: 0.25rem;
}
.tw-gap-y-2 {
  row-gap: 0.5rem;
}
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
}
.tw-divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
.tw-divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-clip {
  overflow: clip;
}
.tw-overflow-visible {
  overflow: visible;
}
.tw-overflow-scroll {
  overflow: scroll;
}
.tw-overflow-x-auto {
  overflow-x: auto;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-text-clip {
  text-overflow: clip;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-2xl {
  border-radius: 1rem;
}
.tw-rounded-\\[6px\\] {
  border-radius: 6px;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-xl {
  border-radius: 0.75rem;
}
.tw-rounded-b-\\[10px\\] {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-e-none {
  border-start-end-radius: 0px;
  border-end-end-radius: 0px;
}
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-l-lg {
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-s-none {
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-l-4 {
  border-left-width: 4px;
}
.tw-border-s-0 {
  border-inline-start-width: 0px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-none {
  border-style: none;
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-border {
  border-color: hsl(var(--border));
}
.tw-border-border\\/50 {
  border-color: hsl(var(--border) / 0.5);
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-muted-foreground {
  border-color: hsl(var(--muted-foreground));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.tw-border-red-400 {
  --tw-border-opacity: 1;
  border-color: rgb(248 113 113 / var(--tw-border-opacity, 1));
}
.tw-border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-ring {
  border-color: hsl(var(--ring));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.tw-border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
}
.tw-border-s-amber-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(253 230 138 / var(--tw-border-opacity, 1));
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.\\!tw-bg-destructive\\/50 {
  background-color: hsl(var(--destructive) / 0.5) !important;
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-background\\/50 {
  background-color: hsl(var(--background) / 0.5);
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.tw-bg-rose-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(244 63 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-rose-500\\/15 {
  background-color: rgb(244 63 94 / 0.15);
}
.tw-bg-rose-500\\/5 {
  background-color: rgb(244 63 94 / 0.05);
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-sky-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(14 165 233 / var(--tw-bg-opacity, 1));
}
.tw-bg-sky-500\\/15 {
  background-color: rgb(14 165 233 / 0.15);
}
.tw-bg-sky-500\\/5 {
  background-color: rgb(14 165 233 / 0.05);
}
.tw-bg-teal-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(20 184 166 / var(--tw-bg-opacity, 1));
}
.tw-bg-teal-500\\/15 {
  background-color: rgb(20 184 166 / 0.15);
}
.tw-bg-teal-500\\/5 {
  background-color: rgb(20 184 166 / 0.05);
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-fill-destructive {
  fill: hsl(var(--destructive));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-0\\.5 {
  padding: 0.125rem;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[10px\\] {
  padding: 10px;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.\\!tw-pr-10 {
  padding-right: 2.5rem !important;
}
.tw-pb-0 {
  padding-bottom: 0px;
}
.tw-pb-1 {
  padding-bottom: 0.25rem;
}
.tw-pb-16 {
  padding-bottom: 4rem;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-24 {
  padding-bottom: 6rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pb-8 {
  padding-bottom: 2rem;
}
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-4 {
  padding-inline-end: 1rem;
}
.tw-pe-8 {
  padding-inline-end: 2rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-2 {
  padding-left: 0.5rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-6 {
  padding-left: 1.5rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-2 {
  padding-inline-start: 0.5rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-1 {
  padding-top: 0.25rem;
}
.tw-pt-2 {
  padding-top: 0.5rem;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.tw-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-extrabold {
  font-weight: 800;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-italic {
  font-style: italic;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-loose {
  line-height: 2;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-leading-tight {
  line-height: 1.25;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-blue-400 {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity, 1));
}
.tw-text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-foreground\\/30 {
  color: hsl(var(--foreground) / 0.3);
}
.tw-text-foreground\\/50 {
  color: hsl(var(--foreground) / 0.5);
}
.tw-text-foreground\\/70 {
  color: hsl(var(--foreground) / 0.7);
}
.tw-text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.tw-text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.tw-text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-muted-foreground\\/50 {
  color: hsl(var(--muted-foreground) / 0.5);
}
.tw-text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-purple-900 {
  --tw-text-opacity: 1;
  color: rgb(88 28 135 / var(--tw-text-opacity, 1));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.tw-text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
.tw-text-rose-600 {
  --tw-text-opacity: 1;
  color: rgb(225 29 72 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-sky-600 {
  --tw-text-opacity: 1;
  color: rgb(2 132 199 / var(--tw-text-opacity, 1));
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-teal-600 {
  --tw-text-opacity: 1;
  color: rgb(13 148 136 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-line-through {
  text-decoration-line: line-through;
}
.tw-decoration-destructive {
  text-decoration-color: hsl(var(--destructive));
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-40 {
  opacity: 0.4;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-2 {
  --tw-ring-offset-width: 2px;
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-ease-linear {
  transition-timing-function: linear;
}
@keyframes enter {

  from {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
  }
}
@keyframes exit {

  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
  }
}
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-fade-in-80 {
  --tw-enter-opacity: 0.8;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-\\@container {
  container-type: inline-size;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
}
.\\[--lexical-indent-base-value\\:40px\\] {
  --lexical-indent-base-value: 40px;
}

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* Note that the following region is from shadcn/ui's styles
 * https://ui.shadcn.com/docs/installation/manual#configure-styles but is scoped down to .pr-twp
 * because this is just a component library and should not apply its styles to the entire page.
 *
 * There is now a section in this library's README.md that explains how to apply these styles to the
 * entire page if desired.
 *
 * The template has the original shadcn/ui styles because it intentionally applies the styles to the
 * entire page. The same is true for Platform.Bible - see \`app.component.scss\`
 */
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}
.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}
.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}
.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}
.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}
.before\\:tw-absolute::before {
  content: var(--tw-content);
  position: absolute;
}
.before\\:tw-left-0::before {
  content: var(--tw-content);
  left: 0px;
}
.before\\:tw-top-0\\.5::before {
  content: var(--tw-content);
  top: 0.125rem;
}
.before\\:tw-block::before {
  content: var(--tw-content);
  display: block;
}
.before\\:tw-hidden::before {
  content: var(--tw-content);
  display: none;
}
.before\\:tw-h-4::before {
  content: var(--tw-content);
  height: 1rem;
}
.before\\:tw-w-4::before {
  content: var(--tw-content);
  width: 1rem;
}
.before\\:tw-cursor-pointer::before {
  content: var(--tw-content);
  cursor: pointer;
}
.before\\:tw-rounded::before {
  content: var(--tw-content);
  border-radius: 0.25rem;
}
.before\\:tw-border::before {
  content: var(--tw-content);
  border-width: 1px;
}
.before\\:tw-border-primary::before {
  content: var(--tw-content);
  border-color: hsl(var(--primary));
}
.before\\:tw-bg-primary::before {
  content: var(--tw-content);
  background-color: hsl(var(--primary));
}
.before\\:tw-bg-cover::before {
  content: var(--tw-content);
  background-size: cover;
}
.before\\:tw-bg-no-repeat::before {
  content: var(--tw-content);
  background-repeat: no-repeat;
}
.before\\:tw-content-\\[\\"\\"\\]::before {
  --tw-content: "";
  content: var(--tw-content);
}
.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}
.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}
.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}
.after\\:tw-left-\\[7px\\]::after {
  content: var(--tw-content);
  left: 7px;
}
.after\\:tw-right-\\[7px\\]::after {
  content: var(--tw-content);
  right: 7px;
}
.after\\:tw-top-\\[6px\\]::after {
  content: var(--tw-content);
  top: 6px;
}
.after\\:tw-block::after {
  content: var(--tw-content);
  display: block;
}
.after\\:tw-hidden::after {
  content: var(--tw-content);
  display: none;
}
.after\\:tw-h-0\\.5::after {
  content: var(--tw-content);
  height: 0.125rem;
}
.after\\:tw-h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw-w-\\[3px\\]::after {
  content: var(--tw-content);
  width: 3px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-rotate-45::after {
  content: var(--tw-content);
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-cursor-pointer::after {
  content: var(--tw-content);
  cursor: pointer;
}
.after\\:tw-border-b-2::after {
  content: var(--tw-content);
  border-bottom-width: 2px;
}
.after\\:tw-border-l-0::after {
  content: var(--tw-content);
  border-left-width: 0px;
}
.after\\:tw-border-r-2::after {
  content: var(--tw-content);
  border-right-width: 2px;
}
.after\\:tw-border-t-0::after {
  content: var(--tw-content);
  border-top-width: 0px;
}
.after\\:tw-border-solid::after {
  content: var(--tw-content);
  border-style: solid;
}
.after\\:tw-border-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}
.after\\:tw-bg-muted::after {
  content: var(--tw-content);
  background-color: hsl(var(--muted));
}
.after\\:tw-content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
.first\\:tw-mt-0:first-child {
  margin-top: 0px;
}
.even\\:tw-bg-muted:nth-child(even) {
  background-color: hsl(var(--muted));
}
.hover\\:tw-cursor-pointer:hover {
  cursor: pointer;
}
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:tw-bg-accent\\/80:hover {
  background-color: hsl(var(--accent) / 0.8);
}
.hover\\:tw-bg-blue-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:tw-bg-input:hover {
  background-color: hsl(var(--input));
}
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}
.hover\\:tw-bg-primary\\/10:hover {
  background-color: hsl(var(--primary) / 0.1);
}
.hover\\:tw-bg-primary\\/70:hover {
  background-color: hsl(var(--primary) / 0.7);
}
.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}
.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:tw-bg-secondary:hover {
  background-color: hsl(var(--secondary));
}
.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}
.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}
.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:tw-text-primary-foreground:hover {
  color: hsl(var(--primary-foreground));
}
.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-opacity-80:hover {
  opacity: 0.8;
}
.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:tw-shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}
.focus\\:tw-relative:focus {
  position: relative;
}
.focus\\:tw-z-10:focus {
  z-index: 10;
}
.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}
.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
}
.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:tw-ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\\:tw-ring-offset-background:focus {
  --tw-ring-offset-color: hsl(var(--background));
}
.focus-visible\\:tw-relative:focus-visible {
  position: relative;
}
.focus-visible\\:tw-z-10:focus-visible {
  z-index: 10;
}
.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:tw-ring-1:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}
.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.focus-visible\\:tw-ring-offset-1:focus-visible {
  --tw-ring-offset-width: 1px;
}
.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}
.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}
.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}
.tw-group:hover .group-hover\\:tw-visible {
  visibility: visible;
}
.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}
.has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:tw-gap-2:has(>[data-slot=button-group]) {
  gap: 0.5rem;
}
.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}
.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}
.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[orientation\\=vertical\\]\\:tw-h-auto[data-orientation="vertical"] {
  height: auto;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-h-px[data-panel-group-direction="vertical"] {
  height: 1px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-w-full[data-panel-group-direction="vertical"] {
  width: 100%;
}
.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-flex-col[data-panel-group-direction="vertical"] {
  flex-direction: column;
}
.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}
.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}
.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-left-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  left: 0px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-h-1[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  height: 0.25rem;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-w-full[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  width: 100%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw--translate-y-1\\/2[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-translate-x-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
@container (min-width: 250px) {

  .\\@\\[250px\\]\\:tw-block {
    display: block;
  }
}
@media (min-width: 640px) {

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-text-left {
    text-align: left;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}
@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:tw-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
@media (min-width: 1024px) {

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\\:tw-text-5xl {
    font-size: 3rem;
    line-height: 1;
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
@media (prefers-color-scheme: dark) {

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }

  .dark\\:tw-text-rose-400 {
    --tw-text-opacity: 1;
    color: rgb(251 113 133 / var(--tw-text-opacity, 1));
  }

  .dark\\:tw-text-sky-400 {
    --tw-text-opacity: 1;
    color: rgb(56 189 248 / var(--tw-text-opacity, 1));
  }

  .dark\\:tw-text-teal-400 {
    --tw-text-opacity: 1;
    color: rgb(45 212 191 / var(--tw-text-opacity, 1));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-l-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-t-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-l-0>*:not(:first-child) {
  border-left-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-t-0>*:not(:first-child) {
  border-top-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-b-none>*:not(:last-child) {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-r-none>*:not(:last-child) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-relative:focus-visible>* {
  position: relative;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-z-10:focus-visible>* {
  z-index: 10;
}
.has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:tw-rounded-r-md>[data-slot=select-trigger]:last-of-type:has(select[aria-hidden=true]:last-child) {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}
.\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:tw-w-fit>[data-slot=select-trigger]:not([class*=w-]) {
  width: fit-content;
}
.\\[\\&\\>blockquote\\]\\:tw-border-s-0>blockquote {
  border-inline-start-width: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-p-0>blockquote {
  padding: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-ps-0>blockquote {
  padding-inline-start: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-font-normal>blockquote {
  font-weight: 400;
}
.\\[\\&\\>blockquote\\]\\:tw-not-italic>blockquote {
  font-style: normal;
}
.\\[\\&\\>blockquote\\]\\:tw-text-foreground>blockquote {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\+div\\]\\:tw-translate-y-\\[-3px\\]>img+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>img\\]\\:tw-absolute>img {
  position: absolute;
}
.\\[\\&\\>img\\]\\:tw-left-4>img {
  left: 1rem;
}
.\\[\\&\\>img\\]\\:tw-top-4>img {
  top: 1rem;
}
.\\[\\&\\>img\\]\\:tw-text-destructive>img {
  color: hsl(var(--destructive));
}
.\\[\\&\\>img\\]\\:tw-text-foreground>img {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\~\\*\\]\\:tw-pl-7>img~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>input\\]\\:tw-flex-1>input {
  flex: 1 1 0%;
}
.\\[\\&\\>li\\]\\:tw-mt-2>li {
  margin-top: 0.5rem;
}
.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>span\\]\\:tw-flex-1>span {
  flex: 1 1 0%;
}
.\\[\\&\\>span\\]\\:tw-text-start>span {
  text-align: start;
}
.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}
.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&\\[align\\=center\\]\\]\\:tw-text-center[align=center] {
  text-align: center;
}
.\\[\\&\\[align\\=right\\]\\]\\:tw-text-right[align=right] {
  text-align: right;
}
.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:tw-rotate-90[data-panel-group-direction=vertical]>div {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-mt-0 [data-lexical-editor="true"]>blockquote {
  margin-top: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-border-s-0 [data-lexical-editor="true"]>blockquote {
  border-inline-start-width: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-ps-0 [data-lexical-editor="true"]>blockquote {
  padding-inline-start: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-font-normal [data-lexical-editor="true"]>blockquote {
  font-weight: 400;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-not-italic [data-lexical-editor="true"]>blockquote {
  font-style: normal;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-text-foreground [data-lexical-editor="true"]>blockquote {
  color: hsl(var(--foreground));
}
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:tw-size-4 svg:not([class*=size-]) {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-pointer-events-none svg {
  pointer-events: none;
}
.\\[\\&_svg\\]\\:tw-size-4 svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-shrink-0 svg {
  flex-shrink: 0;
}
.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}
[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}
[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}
[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
   shorter. */
.footnote-editor .editor-input {
  min-height: 75px;
}

.footnote-editor .typeahead-popover {
  z-index: 300;
}

.footnote-editor .immutable-note-caller {
  display: none;
}

/* Need to be able to override the styles for the editor that happens to have an underscore */
/* stylelint-disable selector-class-pattern */
.footnote-editor .text-spacing .usfm_p {
  text-indent: 0;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/themes/editor-theme.css
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

/* stylelint-disable selector-class-pattern */
/* Lexical editor theme classes use camelCase naming convention */

.EditorTheme__code {
  background-color: transparent;
  font-family: Menlo, Consolas, Monaco, monospace;
  display: block;
  padding: 8px 8px 8px 52px;
  line-height: 1.53;
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow-x: auto;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 8px;
  tab-size: 2;
}

.EditorTheme__code::before {
  content: attr(data-gutter);
  position: absolute;
  background-color: transparent;
  border-right: 1px solid #ccc;
  left: 0;
  top: 0;
  padding: 8px;
  color: #777;
  white-space: pre-wrap;
  text-align: right;
  min-width: 25px;
}

.EditorTheme__table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow-y: scroll;
  overflow-x: scroll;
  table-layout: fixed;
  width: fit-content;
  width: 100%;
  margin: 0 0 30px;
}

.EditorTheme__tokenComment {
  color: slategray;
}

.EditorTheme__tokenPunctuation {
  color: #999;
}

.EditorTheme__tokenProperty {
  color: #905;
}

.EditorTheme__tokenSelector {
  color: #690;
}

.EditorTheme__tokenOperator {
  color: #9a6e3a;
}

.EditorTheme__tokenAttr {
  color: #07a;
}

.EditorTheme__tokenVariable {
  color: #e90;
}

.EditorTheme__tokenFunction {
  color: #dd4a68;
}

.Collapsible__container {
  background-color: var(--background);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.Collapsible__title {
  padding: 0.25rem;
  padding-left: 1rem;
  position: relative;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  list-style-type: disclosure-closed;
  list-style-position: inside;
}

.Collapsible__title p {
  display: inline-flex;
}

.Collapsible__title::marker {
  color: lightgray;
}

.Collapsible__container[open] > .Collapsible__title {
  list-style-type: disclosure-open;
}
`,"after-all");
//# sourceMappingURL=index.cjs.map
