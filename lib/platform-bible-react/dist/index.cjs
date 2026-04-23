"use strict";var ni=Object.defineProperty;var ri=(t,e,r)=>e in t?ni(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var $t=(t,e,r)=>ri(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),a=require("react"),Gt=require("cmdk"),_=require("lucide-react"),oi=require("clsx"),si=require("tailwind-merge"),ai=require("@radix-ui/react-dialog"),st=require("@sillsdev/scripture"),y=require("platform-bible-utils"),en=require("@radix-ui/react-slot"),Se=require("class-variance-authority"),ii=require("@radix-ui/react-popover"),li=require("@radix-ui/react-label"),ci=require("@radix-ui/react-radio-group"),x=require("lexical"),So=require("@radix-ui/react-tooltip"),ur=require("@lexical/rich-text"),oo=require("react-dom"),di=require("@lexical/table"),wi=require("@radix-ui/react-toggle-group"),pi=require("@radix-ui/react-toggle"),Ro=require("@lexical/headless"),ui=require("@radix-ui/react-separator"),mi=require("@radix-ui/react-avatar"),To=require("@radix-ui/react-dropdown-menu"),Vt=require("@tanstack/react-table"),fi=require("@radix-ui/react-select"),hi=require("markdown-to-jsx"),Yt=require("@eten-tech-foundation/platform-editor"),gi=require("@radix-ui/react-checkbox"),xi=require("@radix-ui/react-tabs"),bi=require("@radix-ui/react-menubar"),vi=require("react-hotkeys-hook"),yi=require("@radix-ui/react-context-menu"),ee=require("vaul"),ji=require("@radix-ui/react-progress"),Ni=require("react-resizable-panels"),Mo=require("sonner"),ki=require("@radix-ui/react-slider"),_i=require("@radix-ui/react-switch");function Nt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Ht=Nt(ai),Je=Nt(ii),Do=Nt(li),mn=Nt(ci),Le=Nt(So),qn=Nt(wi),Io=Nt(pi),Oo=Nt(ui),nn=Nt(mi),dt=Nt(To),ft=Nt(fi),mr=Nt(gi),Kt=Nt(xi),wt=Nt(bi),pt=Nt(yi),fr=Nt(ji),vr=Nt(Ni),wn=Nt(ki),hr=Nt(_i),Ci=si.extendTailwindMerge({prefix:"tw-"});function m(...t){return Ci(oi.clsx(t))}const ze=250,yr=300,Ao=400,Po=450,Lo=500,Ei="layoutDirection";function vt(){const t=localStorage.getItem(Ei);return t==="rtl"?t:"ltr"}const On=Ht.Root,Si=Ht.Trigger,$o=Ht.Portal,Ri=Ht.Close,jr=a.forwardRef(({className:t,style:e,...r},o)=>n.jsx(Ht.Overlay,{ref:o,className:m("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:Po,...e},...r}));jr.displayName=Ht.Overlay.displayName;const fn=a.forwardRef(({className:t,children:e,overlayClassName:r,style:o,...s},i)=>{const l=vt();return n.jsxs($o,{children:[n.jsx(jr,{className:r}),n.jsxs(Ht.Content,{ref:i,className:m("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:Lo,...o},...s,dir:l,children:[e,n.jsxs(Ht.Close,{className:m("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":l==="ltr"},{"tw-left-4":l==="rtl"}),children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});fn.displayName=Ht.Content.displayName;function hn({className:t,...e}){return n.jsx("div",{className:m("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}hn.displayName="DialogHeader";function An({className:t,...e}){return n.jsx("div",{className:m("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}An.displayName="DialogFooter";const gn=a.forwardRef(({className:t,...e},r)=>n.jsx(Ht.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));gn.displayName=Ht.Title.displayName;const Fo=a.forwardRef(({className:t,...e},r)=>n.jsx(Ht.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));Fo.displayName=Ht.Description.displayName;const ce=a.forwardRef(({className:t,...e},r)=>n.jsx(Gt.Command,{ref:r,className:m("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));ce.displayName=Gt.Command.displayName;const Ge=a.forwardRef(({className:t,onKeyDown:e,...r},o)=>{const s=vt(),i=a.useCallback(l=>{if(e==null||e(l),l.defaultPrevented||l.key!==" "||l.currentTarget.value!=="")return;const c=l.currentTarget.closest("[cmdk-root]"),w=c==null?void 0:c.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');w&&(l.preventDefault(),l.stopPropagation(),w.click())},[e]);return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:s,children:[n.jsx(_.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(Gt.Command.Input,{ref:o,className:m("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),onKeyDown:i,...r})]})});Ge.displayName=Gt.Command.Input.displayName;const de=a.forwardRef(({className:t,...e},r)=>n.jsx(Gt.Command.List,{ref:r,className:m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));de.displayName=Gt.Command.List.displayName;const rn=a.forwardRef((t,e)=>n.jsx(Gt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));rn.displayName=Gt.Command.Empty.displayName;const Xt=a.forwardRef(({className:t,...e},r)=>n.jsx(Gt.Command.Group,{ref:r,className:m("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Xt.displayName=Gt.Command.Group.displayName;const Nr=a.forwardRef(({className:t,...e},r)=>n.jsx(Gt.Command.Separator,{ref:r,className:m("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Nr.displayName=Gt.Command.Separator.displayName;const Wt=a.forwardRef(({className:t,...e},r)=>n.jsx(Gt.Command.Item,{ref:r,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Wt.displayName=Gt.Command.Item.displayName;function Vo({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Vo.displayName="CommandShortcut";const Bo=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"Old Testament";case y.Section.NT:return r??"New Testament";case y.Section.DC:return o??"Deuterocanon";case y.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Ti=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"OT";case y.Section.NT:return r??"NT";case y.Section.DC:return o??"DC";case y.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function ye(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??st.Canon.bookIdToEnglishName(t)}function kr(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const zo=st.Canon.allBookIds.filter(t=>!st.Canon.isObsolete(st.Canon.bookIdToNumber(t))),Zt=Object.fromEntries(zo.map(t=>[t,st.Canon.bookIdToEnglishName(t)]));function _r(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=st.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(y.includes(s.toLowerCase(),o)||y.includes(t.toLowerCase(),o)||(i?y.includes(i.localizedName.toLowerCase(),o)||y.includes(i.localizedId.toLowerCase(),o):!1))}const Go=a.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:l=!1,localizedBookNames:c,commandValue:w,disabled:d=!1},p)=>{const f=a.useRef(!1),h=()=>{d||(f.current||r==null||r(t),setTimeout(()=>{f.current=!1},100))},u=b=>{if(d){b.preventDefault();return}f.current=!0,o?o(b):r==null||r(t)},g=a.useMemo(()=>ye(t,c),[t,c]),N=a.useMemo(()=>kr(t,c),[t,c]);return n.jsx("div",{className:m("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===y.Section.OT,"tw-border-s-purple-200":s===y.Section.NT,"tw-border-s-indigo-200":s===y.Section.DC,"tw-border-s-amber-200":s===y.Section.Extra}),children:n.jsxs(Wt,{ref:p,value:w||`${t} ${st.Canon.bookIdToEnglishName(t)}`,onSelect:h,onMouseDown:u,role:"option","aria-selected":e,"aria-disabled":d||void 0,"aria-label":`${st.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,disabled:d,className:m(i,d&&"tw-cursor-not-allowed tw-opacity-50"),children:[l&&n.jsx(_.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:g}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:N})]})})}),Cr=Se.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),G=a.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},i)=>{const l=o?en.Slot:"button";return n.jsx(l,{className:m(Cr({variant:e,size:r,className:t})),ref:i,...s})});G.displayName="Button";const we=Je.Root,he=Je.Trigger,Ko=Je.Anchor,qo=a.createContext(null);function Rn({container:t,children:e}){return n.jsx(qo.Provider,{value:t,children:e})}const ne=a.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},i)=>{const l=vt(),c=a.useContext(qo);return n.jsx(Je.Portal,{container:c??void 0,children:n.jsx(Je.Content,{ref:i,align:e,sideOffset:r,className:m("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:ze,...o},...s,dir:l})})});ne.displayName=Je.Content.displayName;function Ho(t,e,r){return`${t} ${Zt[t]}${e?` ${kr(t,e)} ${ye(t,e)}`:""}`}function Uo({recentSearches:t,onSearchItemSelect:e,renderItem:r=p=>String(p),getItemKey:o=p=>String(p),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:l,classNameForItems:c,buttonClassName:w="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:d="ghost"}){const[p,f]=a.useState(!1);if(t.length===0)return;const h=u=>{e(u),f(!1)};return n.jsxs(we,{open:p,onOpenChange:f,children:[n.jsx(he,{asChild:!0,children:n.jsx(G,{variant:d,size:"icon",className:w,"aria-label":s,children:n.jsx(_.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(ne,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(ce,{children:n.jsx(de,{children:n.jsx(Xt,{heading:i,children:t.map(u=>n.jsxs(Wt,{onSelect:()=>h(u),className:m("tw-flex tw-items-center",c),children:[n.jsx(_.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function Mi(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(c=>!r(c,s)),l=[s,...i.slice(0,o-1)];e(l)}}const Tn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Di=[Tn.BOOK_ONLY,Tn.BOOK_CHAPTER,Tn.BOOK_CHAPTER_VERSE];function Ii(t){return Tn.BOOK_CHAPTER_VERSE.test(t.trim())}function so(t,e){return st.Canon.bookIdToNumber(t)<st.Canon.bookIdToNumber(e.book)}function Oi(t,e,r){const o=st.Canon.bookIdToNumber(t)-st.Canon.bookIdToNumber(r.book);return o<0?!0:o>0?!1:e<r.chapterNum}function tr(t,e,r,o){const s=st.Canon.bookIdToNumber(t)-st.Canon.bookIdToNumber(o.book);return s<0?!0:s>0?!1:e<o.chapterNum?!0:e>o.chapterNum?!1:r<o.verseNum}function ao(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function ae(t){return y.getChaptersForBook(st.Canon.bookIdToNumber(t))}function Ai(t,e,r){if(!t.trim()||e.length===0)return;const o=Di.reduce((s,i)=>{if(s)return s;const l=i.exec(t.trim());if(l){const[c,w=void 0,d=void 0]=l.slice(1);let p;const f=e.filter(h=>_r(h,c,r));if(f.length===1&&([p]=f),!p&&w){if(st.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&w){const u=(g=>Object.keys(Zt).find(N=>Zt[N].toLowerCase()===g.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,N])=>N.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=w?parseInt(w,10):void 0;h&&h>ae(p)&&(h=Math.max(ae(p),1));const u=d?parseInt(d,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function Pi(t,e,r,o){const s=a.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],p=Math.max(ae(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[t,e,o]),i=a.useCallback(()=>{const w=ae(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const p=e[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),l=a.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=a.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return a.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?_.ChevronsLeft:_.ChevronsRight},{onClick:l,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?_.ChevronLeft:_.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?_.ChevronRight:_.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===ae(t.book)||ae(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?_.ChevronsRight:_.ChevronsLeft}],[t,e,r,s,l,c,i])}function io({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,isChapterDisabled:i,className:l}){if(t)return n.jsx(Xt,{children:n.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",l),children:Array.from({length:ae(t)},(c,w)=>w+1).map(c=>{const w=(i==null?void 0:i(c))??!1;return n.jsx(Wt,{value:`${t} ${Zt[t]||""} ${c}`,onSelect:()=>{w||r(c)},ref:o(c),disabled:w,"aria-disabled":w||void 0,className:m("tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&c===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":((s==null?void 0:s(c))??!1)&&!w},w&&"tw-cursor-not-allowed tw-opacity-40"),children:c},c)})})})}function lo({bookId:t,chapterNum:e,endVerse:r,scrRef:o,onVerseSelect:s,setVerseRef:i,isVerseDimmed:l,isVerseDisabled:c,className:w}){if(!(!t||r<=0))return n.jsx(Xt,{children:n.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",w),children:Array.from({length:r},(d,p)=>p+1).map(d=>{const p=(c==null?void 0:c(d))??!1;return n.jsx(Wt,{value:`${t} ${Zt[t]||""} ${e}:${d}`,onSelect:()=>{p||s(d)},ref:i(d),disabled:p,"aria-disabled":p||void 0,className:m("tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===o.book&&e===o.chapterNum&&d===o.verseNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":((l==null?void 0:l(d))??!1)&&!p},p&&"tw-cursor-not-allowed tw-opacity-40"),children:d},d)})})})}function Mn({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:l,onAddRecentSearch:c,id:w,getEndVerse:d,disableReferencesUpTo:p,submitKeys:f,triggerContent:h,triggerVariant:u="outline",onOpenChange:g,onCloseAutoFocus:N,modal:b=!1,align:k="center"}){const C=vt(),[S,E]=a.useState(!1),[B,V]=a.useState(""),[A,O]=a.useState(""),[j,D]=a.useState("books"),[L,$]=a.useState(void 0),[M,P]=a.useState(void 0),[H,U]=a.useState(void 0),[Z,yt]=a.useState(!1),It=a.useRef(null),kt=a.useRef(!1),Q=a.useRef(void 0),ut=a.useRef(void 0),K=a.useRef(void 0),et=a.useRef(void 0),rt=a.useRef({}),at=a.useRef({}),it=a.useCallback(v=>{e(v),c&&c(v)},[e,c]),_t=a.useMemo(()=>o?o():zo,[o]),Et=a.useMemo(()=>({[y.Section.OT]:_t.filter(q=>st.Canon.isBookOT(q)),[y.Section.NT]:_t.filter(q=>st.Canon.isBookNT(q)),[y.Section.DC]:_t.filter(q=>st.Canon.isBookDC(q)),[y.Section.Extra]:_t.filter(q=>st.Canon.extraBooks().includes(q))}),[_t]),Ot=a.useMemo(()=>Object.values(Et).flat(),[Et]),xe=a.useMemo(()=>{if(!A.trim())return Et;const v={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return[y.Section.OT,y.Section.NT,y.Section.DC,y.Section.Extra].forEach(W=>{v[W]=Et[W].filter(Lt=>_r(Lt,A,s))}),v},[Et,A,s]),I=a.useMemo(()=>Ai(A,Ot,s),[A,Ot,s]),At=a.useRef(!1);a.useEffect(()=>{if(!At.current){At.current=!0;return}g==null||g(S)},[S,g]);const Ut=a.useCallback(()=>{if(I){const v=I.chapterNum??1,q=I.verseNum??1;if(p&&tr(I.book,v,q,p))return;it({book:I.book,chapterNum:v,verseNum:q}),E(!1),O(""),V("")}},[it,I,p]),Pt=a.useCallback(v=>{const q=M??(I==null?void 0:I.book),W=H??(I==null?void 0:I.chapterNum);!q||!W||(it({book:q,chapterNum:W,verseNum:v}),E(!1))},[it,M,H,I]),F=a.useCallback(v=>{if(p&&so(v,p))return;if(ae(v)<=1){it({book:v,chapterNum:1,verseNum:1}),E(!1),O("");return}$(v),D("chapters")},[it,p]),Y=a.useCallback(v=>{const q=j==="chapters"?L:I==null?void 0:I.book;if(q){if(d&&d(q,v)>1){P(q),U(v),D("verses"),V("");return}it({book:q,chapterNum:v,verseNum:1}),E(!1)}},[it,j,L,I,d]),J=a.useCallback(v=>{it(v),E(!1),O("")},[it]),nt=Pi(t,Ot,C,e),lt=a.useCallback(()=>{D("books"),$(void 0),P(void 0),U(void 0),setTimeout(()=>{ut.current&&ut.current.focus()},0)},[]),ct=a.useCallback(()=>{const v=M;P(void 0),U(void 0),v?($(v),D("chapters"),V("")):lt()},[M,lt]),Ct=a.useCallback(v=>{E(v),v&&(D("books"),$(void 0),P(void 0),U(void 0),O(""))},[]),{otLong:ht,ntLong:gt,dcLong:jt,extraLong:T}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},xt=a.useCallback(v=>Bo(v,ht,gt,jt,T),[ht,gt,jt,T]),mt=a.useCallback(v=>I?!!I.chapterNum&&!v.toString().includes(I.chapterNum.toString()):!1,[I]),ue=a.useMemo(()=>y.formatScrRef(t,s?ye(t.book,s):"English"),[t,s]),Re=a.useCallback(v=>q=>{rt.current[v]=q},[]),He=a.useCallback(v=>q=>{at.current[v]=q},[]),on=a.useMemo(()=>Ii(A),[A]),sn=a.useMemo(()=>!d||!I||!I.chapterNum||!on?!1:d(I.book,I.chapterNum)>0,[d,I,on]),Te=a.useCallback(v=>p?so(v,p):!1,[p]),an=a.useCallback(v=>q=>p?Oi(v,q,p):!1,[p]),Ue=a.useCallback((v,q)=>W=>p?tr(v,q,W,p):!1,[p]),ln=(i==null?void 0:i["%webView_bookChapterControl_selectChapter%"])??"Select Chapter",Me=(i==null?void 0:i["%webView_bookChapterControl_selectVerse%"])??"Select Verse",Jn=a.useCallback(v=>{(v.key==="Home"||v.key==="End")&&v.stopPropagation(),f&&f.includes(v.key)&&I&&I.chapterNum!==void 0&&I.verseNum!==void 0&&(v.preventDefault(),v.stopPropagation(),Ut())},[f,I,Ut]),Ye=a.useCallback(v=>{var be,De,Ie;if(v.ctrlKey)return;const{isLetter:q,isDigit:W}=ao(v.key);if((j==="chapters"||j==="verses")&&(v.key===" "||v.key==="Enter")){const St=v.target instanceof HTMLElement?v.target:void 0;if(!!(St!=null&&St.closest('button, a, input, select, textarea, [role="button"]'))){v.stopPropagation();return}const z=(be=Q.current)==null?void 0:be.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');if(z){v.preventDefault(),v.stopPropagation(),z.click();return}}if((j==="chapters"||j==="verses")&&(q||W)){v.preventDefault(),v.stopPropagation();return}if(j==="chapters"&&v.key==="Backspace"){v.preventDefault(),v.stopPropagation(),lt();return}if(j==="verses"&&v.key==="Backspace"){v.preventDefault(),v.stopPropagation(),ct();return}const Lt=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(v.key);if(j==="verses"&&Lt){const St=M,R=H;if(!St||!R||!d)return;const z=d(St,R);if(!z)return;(De=Q.current)==null||De.focus();const X=(()=>{if(!B)return 1;const Oe=B.match(/:(\d+)$/);return Oe?parseInt(Oe[1],10):0})();let Rt=X;const oe=6;switch(v.key){case"ArrowLeft":X!==0&&(Rt=X>1?X-1:z);break;case"ArrowRight":X!==0&&(Rt=X<z?X+1:1);break;case"ArrowUp":Rt=X===0?z:Math.max(1,X-oe);break;case"ArrowDown":Rt=X===0?1:Math.min(z,X+oe);break;default:return}Rt!==X&&(v.preventDefault(),v.stopPropagation(),V(`${St} ${Zt[St]||""} ${R}:${Rt}`),setTimeout(()=>{const Oe=at.current[Rt];Oe&&Oe.scrollIntoView({block:"nearest",behavior:"smooth"})},0));return}if((j==="chapters"||j==="books"&&I)&&Lt){const St=j==="chapters"?L:I==null?void 0:I.book;if(!St)return;j==="chapters"&&((Ie=Q.current)==null||Ie.focus());const R=(()=>{if(!B)return 1;const oe=B.match(/(\d+)$/);return oe?parseInt(oe[1],10):0})(),z=ae(St);if(!z)return;let X=R;const Rt=6;switch(v.key){case"ArrowLeft":R!==0&&(X=R>1?R-1:z);break;case"ArrowRight":R!==0&&(X=R<z?R+1:1);break;case"ArrowUp":X=R===0?z:Math.max(1,R-Rt);break;case"ArrowDown":X=R===0?1:Math.min(z,R+Rt);break;default:return}X!==R&&(v.preventDefault(),v.stopPropagation(),V(`${St} ${Zt[St]||""} ${X}`),setTimeout(()=>{const oe=rt.current[X];oe&&oe.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[j,I,lt,ct,L,M,H,d,B]),Qn=a.useCallback(v=>{var Lt;if(v.shiftKey||v.key==="Tab"||v.key===" ")return;if(v.key==="Enter"){v.stopPropagation();return}if(v.key==="ArrowUp"||v.key==="ArrowDown"){(Lt=ut.current)==null||Lt.focus();return}const{isLetter:q,isDigit:W}=ao(v.key);(q||W)&&(v.preventDefault(),O(be=>be+v.key),ut.current.focus(),yt(!1))},[]);return a.useLayoutEffect(()=>{const v=setTimeout(()=>{if(S&&j==="books"&&K.current&&et.current){const q=K.current,W=et.current,Lt=W.offsetTop,be=q.clientHeight,De=W.clientHeight,Ie=Lt-be/2+De/2;q.scrollTo({top:Math.max(0,Ie),behavior:"smooth"}),V(Ho(t.book))}},0);return()=>{clearTimeout(v)}},[S,j,A,I,t.book]),a.useLayoutEffect(()=>{if(j==="chapters"&&L){const v=L===t.book,q=v?t.chapterNum:1;V(`${L} ${Zt[L]||""} ${q}`),setTimeout(()=>{if(K.current)if(v){const W=rt.current[t.chapterNum];W&&W.scrollIntoView({block:"center",behavior:"smooth"})}else K.current.scrollTo({top:0});Q.current&&Q.current.focus()},0)}},[j,L,I,t.book,t.chapterNum]),a.useLayoutEffect(()=>{if(j==="verses"&&M&&H!==void 0){const v=M===t.book&&H===t.chapterNum,q=v?t.verseNum:1;V(`${M} ${Zt[M]||""} ${H}:${q}`),setTimeout(()=>{if(K.current)if(v){const W=at.current[t.verseNum];W&&W.scrollIntoView({block:"center",behavior:"smooth"})}else K.current.scrollTo({top:0});Q.current&&Q.current.focus()},0)}},[j,M,H,t.book,t.chapterNum,t.verseNum]),n.jsxs(we,{open:S,onOpenChange:Ct,modal:b,children:[n.jsx(he,{asChild:!0,children:n.jsx(G,{ref:It,"aria-label":"book-chapter-trigger",variant:u,role:"combobox","aria-expanded":S,className:m("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),onClick:v=>{kt.current&&(kt.current=!1,v.preventDefault())},children:h??n.jsx("span",{className:"tw-truncate",children:ue})})}),n.jsx(ne,{id:w,className:"tw-w-[var(--radix-popper-anchor-width,280px)] tw-min-w-[200px] tw-max-w-[280px] tw-p-0",align:k,onKeyDownCapture:Ye,onKeyDown:v=>v.stopPropagation(),onPointerDownOutside:v=>{const q=v.target;It.current&&q instanceof Node&&It.current.contains(q)&&(kt.current=!0,Ct(!1))},onCloseAutoFocus:N,children:n.jsxs(ce,{ref:Q,loop:!0,value:B,onValueChange:V,shouldFilter:!1,children:[j==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(Ge,{ref:ut,value:A,onValueChange:O,onKeyDown:Jn,onFocus:()=>yt(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&n.jsx(Uo,{recentSearches:l,onSearchItemSelect:J,renderItem:v=>y.formatScrRef(v,"English"),getItemKey:v=>`${v.book}-${v.chapterNum}-${v.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:nt.map(({onClick:v,disabled:q,title:W,icon:Lt})=>n.jsx(G,{variant:"ghost",size:"sm",onClick:()=>{yt(!0),v()},disabled:q,className:"tw-h-10 tw-w-4 tw-p-0",title:W,onKeyDown:Qn,children:n.jsx(Lt,{})},W))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:j==="verses"?ct:lt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",children:C==="ltr"?n.jsx(_.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(_.ArrowRight,{className:"tw-h-4 tw-w-4"})}),j==="chapters"&&L&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ye(L,s)}),j==="verses"&&M&&H!==void 0&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:`${ye(M,s)} ${H}`}),n.jsx("span",{tabIndex:-1,className:"tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",children:j==="verses"?Me:ln})]}),!Z&&n.jsxs(de,{ref:K,children:[j==="books"&&n.jsxs(n.Fragment,{children:[!I&&Object.entries(xe).map(([v,q])=>{if(q.length!==0)return n.jsx(Xt,{heading:xt(v),children:q.map(W=>n.jsx(Go,{bookId:W,onSelect:Lt=>F(Lt),section:y.getSectionForBook(W),commandValue:`${W} ${Zt[W]}`,ref:W===t.book?et:void 0,localizedBookNames:s,disabled:Te(W)},W))},v)}),I&&n.jsx(Xt,{children:n.jsx(Wt,{value:`${I.book} ${Zt[I.book]} ${I.chapterNum||""}:${I.verseNum||""})}`,onSelect:Ut,disabled:!!p&&tr(I.book,I.chapterNum??1,I.verseNum??1,p),className:"tw-font-semibold tw-text-primary",children:y.formatScrRef({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1},s?kr(I.book,s):void 0)},"top-match")}),I&&sn&&I.chapterNum&&d&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:[n.jsx("span",{children:`${ye(I.book,s)} ${I.chapterNum}`}),n.jsx("span",{children:Me})]}),n.jsx(lo,{bookId:I.book,chapterNum:I.chapterNum,endVerse:d(I.book,I.chapterNum),scrRef:t,onVerseSelect:Pt,setVerseRef:He,isVerseDisabled:Ue(I.book,I.chapterNum),className:"tw-px-4 tw-pb-4"})]}),I&&!sn&&ae(I.book)>1&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:[n.jsx("span",{children:ye(I.book,s)}),n.jsx("span",{children:ln})]}),n.jsx(io,{bookId:I.book,scrRef:t,onChapterSelect:Y,setChapterRef:Re,isChapterDimmed:mt,isChapterDisabled:an(I.book),className:"tw-px-4 tw-pb-4"})]})]}),j==="chapters"&&L&&n.jsx(io,{bookId:L,scrRef:t,onChapterSelect:Y,setChapterRef:Re,isChapterDisabled:an(L),className:"tw-p-4"}),j==="verses"&&M&&H!==void 0&&d&&n.jsx(lo,{bookId:M,chapterNum:H,endVerse:d(M,H),scrRef:t,onVerseSelect:Pt,setVerseRef:He,isVerseDisabled:Ue(M,H),className:"tw-p-4"})]})]})})]})}const Li=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%","%webView_bookChapterControl_selectChapter%","%webView_bookChapterControl_selectVerse%"]),$i=Se.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),bt=a.forwardRef(({className:t,...e},r)=>n.jsx(Do.Root,{ref:r,className:m("pr-twp",$i(),t),...e}));bt.displayName=Do.Root.displayName;const Hn=a.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(mn.Root,{className:m("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});Hn.displayName=mn.Root.displayName;const xn=a.forwardRef(({className:t,...e},r)=>n.jsx(mn.Item,{ref:r,className:m("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(mn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(_.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));xn.displayName=mn.Item.displayName;function Fi(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Pn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:i,value:l,onChange:c=()=>{},getOptionLabel:w=Fi,getButtonLabel:d,icon:p=void 0,buttonPlaceholder:f="",textPlaceholder:h="",commandEmptyMessage:u="No option found",buttonVariant:g="outline",alignDropDown:N="start",isDisabled:b=!1,ariaLabel:k,...C}){const[S,E]=a.useState(!1),B=d??w,V=O=>O.length>0&&typeof O[0]=="object"&&"options"in O[0],A=(O,j)=>{const D=w(O),L=typeof O=="object"&&"secondaryLabel"in O?O.secondaryLabel:void 0,$=`${j??""}${D}${L??""}`;return n.jsxs(Wt,{value:D,onSelect:()=>{c(O),E(!1)},className:"tw-flex tw-items-center",children:[n.jsx(_.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!l||w(l)!==D})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[D,L&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",L]})]})]},$)};return n.jsxs(we,{open:S,onOpenChange:E,...C,children:[n.jsx(he,{asChild:!0,children:n.jsxs(G,{variant:g,role:"combobox","aria-expanded":S,"aria-label":k,id:t,className:m("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:p}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:l?B(l):f})]}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(ne,{align:N,className:m("tw-w-[200px] tw-p-0",s),style:i,children:n.jsxs(ce,{children:[n.jsx(Ge,{placeholder:h,className:"tw-text-inherit"}),n.jsx(rn,{children:u}),n.jsx(de,{children:V(e)?e.map(O=>n.jsx(Xt,{heading:O.groupHeading,children:O.options.map(j=>A(j,O.groupHeading))},O.groupHeading)):e.map(O=>A(O))})]})})]})}function Yo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const l=a.useMemo(()=>Array.from({length:i},(d,p)=>p+1),[i]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(bt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Pn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(bt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Pn,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const Vi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),er=(t,e)=>t[e]??e;function Bi({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=er(d,"%webView_bookSelector_currentBook%"),f=er(d,"%webView_bookSelector_choose%"),h=er(d,"%webView_bookSelector_chooseBooks%"),[u,g]=a.useState("current book"),N=b=>{g(b),t(b)};return n.jsx(Hn,{className:"pr-twp tw-flex",value:u,onValueChange:b=>N(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(xn,{value:"current book"}),n.jsx(bt,{className:"tw-ms-1",children:p})]}),n.jsx(bt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Yo,{isDisabled:u==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(xn,{value:"choose books"}),n.jsx(bt,{className:"tw-ms-1",children:h})]}),n.jsx(bt,{className:"tw-flex tw-items-center",children:o.map(b=>st.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(G,{disabled:u==="current book",onClick:()=>r(),children:f})]})]})})}const Xo=a.createContext(null);function zi(t,e){return{getTheme:function(){return e??null}}}function pe(){const t=a.useContext(Xo);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Wo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Gi=Wo?a.useLayoutEffect:a.useEffect,Cn={tag:x.HISTORY_MERGE_TAG};function Ki({initialConfig:t,children:e}){const r=a.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:l,editorState:c,html:w}=t,d=zi(null,o),p=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:i,onError:f=>l(f,p),theme:o});return function(f,h){if(h!==null){if(h===void 0)f.update(()=>{const u=x.$getRoot();if(u.isEmpty()){const g=x.$createParagraphNode();u.append(g);const N=Wo?document.activeElement:null;(x.$getSelection()!==null||N!==null&&N===f.getRootElement())&&g.select()}},Cn);else if(h!==null)switch(typeof h){case"string":{const u=f.parseEditorState(h);f.setEditorState(u,Cn);break}case"object":f.setEditorState(h,Cn);break;case"function":f.update(()=>{x.$getRoot().isEmpty()&&h(f)},Cn)}}}(p,c),[p,d]},[]);return Gi(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(Xo.Provider,{value:r,children:e})}const qi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Hi({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=pe();return qi(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:l,prevEditorState:c,tags:w})=>{e&&i.size===0&&l.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const Er={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Mt=Le.Provider,Bt=Le.Root,zt=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(Le.Trigger,{ref:o,className:e?m(Cr({variant:e}),t):t,...r}));zt.displayName=Le.Trigger.displayName;const Dt=a.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(Le.Portal,{children:n.jsx(Le.Content,{ref:s,sideOffset:e,style:{zIndex:ze,...r},className:m("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));Dt.displayName=Le.Content.displayName;const Sr=[ur.HeadingNode,x.ParagraphNode,x.TextNode,ur.QuoteNode],Ui=a.createContext(null),nr={didCatch:!1,error:null};class Yi extends a.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=nr}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),l=0;l<s;l++)i[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(nr)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&Xi(e.resetKeys,s)){var i,l;(i=(l=this.props).onReset)===null||i===void 0||i.call(l,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(nr)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:l}=this.state;let c=e;if(i){const w={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=a.createElement(o,w);else if(s!==void 0)c=s;else throw l}return a.createElement(Ui.Provider,{value:{didCatch:i,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Xi(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function Wi({children:t,onError:e}){return n.jsx(Yi,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const Zi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Ji(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Qi(){return function(t){const[e]=pe(),r=a.useMemo(()=>t(e),[e,t]),[o,s]=a.useState(()=>r.initialValueFn()),i=a.useRef(o);return Zi(()=>{const{initialValueFn:l,subscribe:c}=r,w=l();return i.current!==w&&(i.current=w,s(w)),c(d=>{i.current=d,s(d)})},[r,t]),o}(Ji)}function tl(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,l=t.isBackward(),c=s.getNode(),w=i.getNode(),d=e.is(c),p=e.is(w);if(d||p){const[f,h]=x.$getCharacterOffsets(t),u=c.is(w),g=e.is(l?w:c),N=e.is(l?c:w);let b,k=0;u?(k=f>h?h:f,b=f>h?f:h):g?(k=l?h:f,b=void 0):N&&(k=0,b=l?f:h);const C=e.__text.slice(k,b);C!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=C)}}return e}function el(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Zo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,nl=Zo&&"documentMode"in document?document.documentMode:null;!(!Zo||!("InputEvent"in window)||nl)&&"getTargetRanges"in new window.InputEvent("input");function rl(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||el(4,t.__key),e}function ol(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],l=i.getKey();if(r.has(l))continue;const c=x.$findMatchingParent(i,d=>x.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!r.has(w)&&(r.add(w),t(c))}return r.size>0}const sl=Symbol.for("preact-signals");function Un(){if(je>1)return void je--;let t,e=!1;for(;pn!==void 0;){let r=pn;for(pn=void 0,gr++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&Jo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(gr=0,je--,e)throw t}function al(t){if(je>0)return t();je++;try{return t()}finally{Un()}}let tt,pn;function co(t){const e=tt;tt=void 0;try{return t()}finally{tt=e}}let je=0,gr=0,Dn=0;function wo(t){if(tt===void 0)return;let e=t.n;return e===void 0||e.t!==tt?(e={i:0,S:t,p:tt.s,n:void 0,t:tt,e:void 0,x:void 0,r:e},tt.s!==void 0&&(tt.s.n=e),tt.s=e,t.n=e,32&tt.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=tt.s,e.n=void 0,tt.s.n=e,tt.s=e),e):void 0}function Ft(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function bn(t,e){return new Ft(t,e)}function Jo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function po(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Qo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function Ae(t,e){Ft.call(this,void 0),this.x=t,this.s=void 0,this.g=Dn-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function il(t,e){return new Ae(t,e)}function ts(t){const e=t.u;if(t.u=void 0,typeof e=="function"){je++;const r=tt;tt=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Rr(t),o}finally{tt=r,Un()}}}function Rr(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,ts(t)}function ll(t){if(tt!==this)throw new Error("Out-of-order effect");Qo(this),tt=t,this.f&=-2,8&this.f&&Rr(this),Un()}function We(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function _e(t,e){const r=new We(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function Yn(t,e={}){const r={};for(const o in t){const s=e[o],i=bn(s===void 0?t[o]:s);r[o]=i}return r}Ft.prototype.brand=sl,Ft.prototype.h=function(){return!0},Ft.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:co(()=>{var r;(r=this.W)==null||r.call(this)}))},Ft.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&co(()=>{var o;(o=this.Z)==null||o.call(this)}))}},Ft.prototype.subscribe=function(t){return _e(()=>{const e=this.value,r=tt;tt=void 0;try{t(e)}finally{tt=r}},{name:"sub"})},Ft.prototype.valueOf=function(){return this.value},Ft.prototype.toString=function(){return this.value+""},Ft.prototype.toJSON=function(){return this.value},Ft.prototype.peek=function(){const t=tt;tt=void 0;try{return this.value}finally{tt=t}},Object.defineProperty(Ft.prototype,"value",{get(){const t=wo(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(gr>100)throw new Error("Cycle detected");this.v=t,this.i++,Dn++,je++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Un()}}}}),Ae.prototype=new Ft,Ae.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Dn))return!0;if(this.g=Dn,this.f|=1,this.i>0&&!Jo(this))return this.f&=-2,!0;const t=tt;try{po(this),tt=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return tt=t,Qo(this),this.f&=-2,!0},Ae.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}Ft.prototype.S.call(this,t)},Ae.prototype.U=function(t){if(this.t!==void 0&&(Ft.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},Ae.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(Ae.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=wo(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),We.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},We.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,ts(this),po(this),je++;const t=tt;return tt=this,ll.bind(this,t)},We.prototype.N=function(){2&this.f||(this.f|=2,this.o=pn,pn=this)},We.prototype.d=function(){this.f|=8,1&this.f||Rr(this)},We.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>Yn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return _e(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function es(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function ns(t,e=es){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>Yn(e),config:x.safeCast({$onClear:es}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return _e(()=>ns(t,o.value))}});function cl(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const rr=x.createState("format",{parse:t=>typeof t=="number"?t:0});class rs extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:rr}]})}getFormat(){return x.$getState(this,rr)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,rr,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function dl(t){return t instanceof rs}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[rs],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())dl(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function os(t,e){let r;return bn(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const xr=x.defineExtension({build:t=>os(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function ot(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function ss(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=ss(r[s],o[s]);return t}return e}const Tr=0,br=1,as=2,or=3,En=4,Xe=5,sr=6,cn=7;function ar(t){return t.id===Tr}function is(t){return t.id===as}function wl(t){return function(e){return e.id===br}(t)||ot(305,String(t.id),String(br)),Object.assign(t,{id:as})}const pl=new Set;class ul{constructor(e,r){$t(this,"builder");$t(this,"configs");$t(this,"_dependency");$t(this,"_peerNameSet");$t(this,"extension");$t(this,"state");$t(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Tr}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;is(r)||ot(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,w,d){return Object.assign(c,{config:w,id:or,registerState:d})}(r,this.mergeConfigs(),o);let l;this.state=i,this.extension.init&&(l=this.extension.init(e,i.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:En,initResult:w,registerState:d})}(i,l,s)}build(e){const r=this.state;let o;r.id!==En&&ot(307,String(r.id),String(Xe)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,l,c){return Object.assign(i,{id:Xe,output:l,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==Xe&&ot(308,String(o.id),String(Xe));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:sr})}(o),()=>{const i=this.state;i.id!==cn&&ot(309,String(o.id),String(cn)),this.state=function(l){return Object.assign(l,{id:Xe})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==sr&&ot(310,String(r.id),String(sr)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:cn})}(r),o}getSignal(){return this._signal===void 0&&ot(311),this._signal}getInitResult(){this.extension.init===void 0&&ot(312,this.extension.name);const e=this.state;return function(r){return r.id>=En}(e)||ot(313,String(e.id),String(En)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=or}(e)||ot(314,String(e.id),String(or)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&ot(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&ot(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=cn}(e)||ot(316,String(e.id),String(cn)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||pl}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=Xe})(e)||ot(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const uo={tag:x.HISTORY_MERGE_TAG};function ml(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const fl=x.defineExtension({config:x.safeCast({setOptions:uo,updateOptions:uo}),init:({$initialEditorState:t=ml})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const l=t.parseEditorState(i);t.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),mo=Symbol.for("@lexical/extension/LexicalBuilder");function fo(){}function hl(t){throw t}function Sn(t){return Array.isArray(t)?t:[t]}const ir="0.41.0+prod.esm";class un{constructor(e){$t(this,"roots");$t(this,"extensionNameMap");$t(this,"outgoingConfigEdges");$t(this,"incomingEdges");$t(this,"conflicts");$t(this,"_sortedExtensionReps");$t(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=ir,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Sn(fl)];for(const o of e)r.push(Sn(o));return new un(r)}static maybeFromEditor(e){const r=e[mo];return r&&(r.PACKAGE_VERSION!==ir&&ot(292,r.PACKAGE_VERSION,ir),r instanceof un||ot(293)),r}static fromEditor(e){const r=un.maybeFromEditor(e);return r===void 0&&ot(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[mo]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=fo;function r(){try{e()}finally{e=fo}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&ot(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&ot(296);const r=Sn(e),[o]=r;typeof o.name!="string"&&ot(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&ot(298,o.name),!s){s=new ul(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&ot(299,o.name,i);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&ot(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=Sn(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(is(i))return;const l=o.extension.name;var c;ar(i)||ot(300,l,s||"[unknown]"),ar(c=i)||ot(304,String(c.id),String(Tr)),i=Object.assign(c,{id:br}),o.state=i;const w=this.outgoingConfigEdges.get(l);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,l)}i=wl(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())ar(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of i)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&ot(301,o.name);for(const l of s)i.configs.add(l)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const l of r){const c=l.register(e,i);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},l={},c=this.sortedExtensionReps();for(const p of c){const{extension:f}=p;if(f.onError!==void 0&&(e.onError=f.onError),f.disableEvents!==void 0&&(e.disableEvents=f.disableEvents),f.parentEditor!==void 0&&(e.parentEditor=f.parentEditor),f.editable!==void 0&&(e.editable=f.editable),f.namespace!==void 0&&(e.namespace=f.namespace),f.$initialEditorState!==void 0&&(e.$initialEditorState=f.$initialEditorState),f.nodes)for(const h of cl(f)){if(typeof h!="function"){const u=o.get(h.replace);u&&ot(302,f.name,h.replace.name,u.extension.name),o.set(h.replace,p)}r.add(h)}if(f.html){if(f.html.export)for(const[h,u]of f.html.export.entries())s.set(h,u);f.html.import&&Object.assign(i,f.html.import)}f.theme&&ss(l,f.theme)}Object.keys(l).length>0&&(e.theme=l),r.size&&(e.nodes=[...r]);const w=Object.keys(i).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=i),d&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=hl),e}}const gl=new Set,ho=x.defineExtension({build(t,e,r){const o=r.getDependency(xr).output,s=bn({watchedNodeKeys:new Map}),i=os(()=>{},()=>_e(()=>{const l=i.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,f]of c.entries()){if(f.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),u=h&&h.isSelected()||!1;d=d||u!==(!!l&&l.has(p)),u&&(w=w||new Set,w.add(p))}}),!d&&w&&l&&w.size===l.size||(i.value=w)}));return{watchNodeKey:function(l){const c=il(()=>(i.value||gl).has(l)),{watchedNodeKeys:w}=s.peek();let d=w.get(l);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(l,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[xr],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Qe extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Qe(e.__key)}static importJSON(e){return ls().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:xl,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function xl(){return{node:ls()}}function ls(){return x.$create(Qe)}function bl(t){return t instanceof Qe}x.defineExtension({dependencies:[xr,ho],name:"@lexical/extension/HorizontalRule",nodes:()=>[Qe],register(t,e,r){const{watchNodeKey:o}=r.getDependency(ho).output,s=bn({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,l=>{if(x.isDOMNode(l.target)){const c=x.$getNodeFromDOMNode(l.target);if(bl(c))return function(w,d=!1){const p=x.$getSelection(),f=w.isSelected(),h=w.getKey();let u;d&&x.$isNodeSelection(p)?u=p:(u=x.$createNodeSelection(),x.$setSelection(u)),f?u.delete(h):u.add(h)}(c,l.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(Qe,(l,c)=>{al(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,f]of l.entries())if(f==="destroyed")d.delete(p),w=!0;else{const h=d.get(p),u=t.getElementByKey(p);h?h.domNode.value=u:(w=!0,d.set(p,{domNode:bn(u),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),_e(()=>{const l=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())l.push(_e(()=>{const d=c.value;d&&(w.value?x.addClassNamesToElement(d,i):x.removeClassNamesFromElement(d,i))}));return x.mergeRegister(...l)}))}});function cs(t){return t.canBeEmpty()}function vl(t,e,r=cs){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(l){if(l.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const c=l.anchor,w=l.focus,d=w.isBefore(c)?w:c,p=d.getNode(),f=rl(p);if(f.canIndent()){const h=f.getKey();let u=x.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=x.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(d))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return ol(l=>{if(i(l)){const c=l.getIndent()+1;(!o||c<o)&&l.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>Yn(e),config:x.safeCast({$canIndent:cs,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return _e(()=>{if(!o.value)return vl(t,s,i)})}});const yl=x.defineExtension({name:"@lexical/react/ReactProvider"});function jl(){return x.$getRoot().getTextContent()}function Nl(t,e=!0){if(t)return!1;let r=jl();return e&&(r=r.trim()),r===""}function kl(t){if(!Nl(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),l=i.length;for(let c=0;c<l;c++){const w=i[o];if(!x.$isTextNode(w))return!1}}}return!0}function ds(t){return()=>kl(t)}function ws(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let l;try{l=JSON.parse(i)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,f,h,u]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const N=g.anchor;let b=N.getNode(),k=0,C=0;if(x.$isTextNode(b)&&d>=0&&p>=0&&(k=d,C=d+p,g.setTextNodeRange(b,k,b,C)),k===C&&f===""||(g.insertRawText(f),b=N.getNode()),x.$isTextNode(b)){k=h,C=h+u;const S=b.getTextContentSize();k=k>S?S:k,C=C>S?S:C,g.setTextNodeRange(b,k,b,C)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>Yn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>_e(()=>r.getOutput().disabled.value?void 0:ws(t))});function _l(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Mr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Cl({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=a.useState(()=>r.getDecorators());return Mr(()=>r.registerDecoratorListener(l=>{oo.flushSync(()=>{i(l)})}),[r]),a.useEffect(()=>{i(r.getDecorators())},[r]),a.useMemo(()=>{const l=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(a.Suspense,{fallback:null,children:s[d]})}),f=r.getElementByKey(d);f!==null&&l.push(oo.createPortal(p,f,d))}return l},[o,s,r])}(t,e)}function El({editor:t,ErrorBoundary:e}){return function(r){const o=un.maybeFromEditor(r);if(o&&o.hasExtensionByName(yl.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&_l(320,s);return!0}return!1}(t)?null:n.jsx(Cl,{editor:t,ErrorBoundary:e})}function go(t){return t.getEditorState().read(ds(t.isComposing()))}function Sl({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=pe();return function(s){Mr(()=>x.mergeRegister(ur.registerRichText(s),ws(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Rl,{content:e}),n.jsx(El,{editor:o,ErrorBoundary:r})]})}function Rl({content:t}){const[e]=pe(),r=function(s){const[i,l]=a.useState(()=>go(s));return Mr(()=>{function c(){const w=go(s);l(w)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(e),o=Qi();return r?typeof t=="function"?t(o):t:null}function Tl({defaultSelection:t}){const[e]=pe();return a.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Ml=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Dl({onClear:t}){const[e]=pe();return Ml(()=>ns(e,t),[e,t]),null}const ps=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Il({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:l,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:f,ariaRequired:h,autoCapitalize:u,className:g,id:N,role:b="textbox",spellCheck:k=!0,style:C,tabIndex:S,"data-testid":E,...B},V){const[A,O]=a.useState(t.isEditable()),j=a.useCallback(L=>{L&&L.ownerDocument&&L.ownerDocument.defaultView?t.setRootElement(L):t.setRootElement(null)},[t]),D=a.useMemo(()=>function(...L){return $=>{for(const M of L)typeof M=="function"?M($):M!=null&&(M.current=$)}}(V,j),[j,V]);return ps(()=>(O(t.isEditable()),t.registerEditableListener(L=>{O(L)})),[t]),n.jsx("div",{"aria-activedescendant":A?e:void 0,"aria-autocomplete":A?r:"none","aria-controls":A?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":A&&b==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":A?f:void 0,"aria-readonly":!A||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:A,"data-testid":E,id:N,ref:D,role:b,spellCheck:k,style:C,tabIndex:S,...B})}const Ol=a.forwardRef(Il);function xo(t){return t.getEditorState().read(ds(t.isComposing()))}const Al=a.forwardRef(Pl);function Pl(t,e){const{placeholder:r,...o}=t,[s]=pe();return n.jsxs(n.Fragment,{children:[n.jsx(Ol,{editor:s,...o,ref:e}),r!=null&&n.jsx(Ll,{editor:s,content:r})]})}function Ll({content:t,editor:e}){const r=function(l){const[c,w]=a.useState(()=>xo(l));return ps(()=>{function d(){const p=xo(l);w(p)}return d(),x.mergeRegister(l.registerUpdateListener(()=>{d()}),l.registerEditableListener(()=>{d()}))},[l]),c}(e),[o,s]=a.useState(e.isEditable());if(a.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(l=>{s(l)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function $l({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Al,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const us=a.createContext(void 0);function Fl({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const l=a.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(us.Provider,{value:l,children:i})}function ms(){const t=a.useContext(us);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Vl(){const[t,e]=a.useState(void 0),r=a.useCallback(()=>{e(void 0)},[]),o=a.useMemo(()=>{if(t===void 0)return;const{title:i,content:l}=t;return n.jsx(On,{open:!0,onOpenChange:r,children:n.jsxs(fn,{children:[n.jsx(hn,{children:n.jsx(gn,{children:i})}),l]})})},[t,r]),s=a.useCallback((i,l,c=!1)=>{e({closeOnClickOutside:c,content:l(r),title:i})},[r]);return[o,s]}function Bl({children:t}){const[e]=pe(),[r,o]=a.useState(e),[s,i]=a.useState("paragraph"),[l,c]=Vl(),w=()=>{};return a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Fl,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:i,showModal:c,children:[l,t({blockType:s})]})}function zl(t){const[e]=pe(),{activeEditor:r}=ms();a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),a.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const fs=Se.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Gl=a.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(Io.Root,{ref:s,className:m(fs({variant:e,size:r,className:t})),...o}));Gl.displayName=Io.Root.displayName;const hs=a.createContext({size:"default",variant:"default"}),Xn=a.forwardRef(({className:t,variant:e,size:r,children:o,...s},i)=>{const l=vt();return n.jsx(qn.Root,{ref:i,className:m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:l,children:n.jsx(hs.Provider,{value:{variant:e,size:r},children:o})})});Xn.displayName=qn.Root.displayName;const Ze=a.forwardRef(({className:t,children:e,variant:r,size:o,...s},i)=>{const l=a.useContext(hs);return n.jsx(qn.Item,{ref:i,className:m(fs({variant:l.variant||r,size:l.size||o}),t),...s,children:e})});Ze.displayName=qn.Item.displayName;const bo=[{format:"bold",icon:_.BoldIcon,label:"Bold"},{format:"italic",icon:_.ItalicIcon,label:"Italic"}];function Kl(){const{activeEditor:t}=ms(),[e,r]=a.useState([]),o=a.useCallback(s=>{if(x.$isRangeSelection(s)||di.$isTableSelection(s)){const i=[];bo.forEach(({format:l})=>{s.hasFormat(l)&&i.push(l)}),r(l=>l.length!==i.length||!i.every(c=>l.includes(c))?i:l)}},[]);return zl(o),n.jsx(Xn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:bo.map(({format:s,icon:i,label:l})=>n.jsx(Ze,{value:s,"aria-label":l,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function ql({onClear:t}){const[e]=pe();a.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Hl({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=a.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Bl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Kl,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Sl,{contentEditable:n.jsx("div",{ref:s,children:n.jsx($l,{placeholder:t})}),ErrorBoundary:Wi}),e&&n.jsx(Tl,{defaultSelection:"rootEnd"}),n.jsx(ql,{onClear:r}),n.jsx(Dl,{})]})]})}const Ul={namespace:"commentEditor",theme:Er,nodes:Sr,onError:t=>{console.error(t)}};function Ln({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:l,className:c}){return n.jsx("div",{className:m("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(Ki,{initialConfig:{...Ul,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(Mt,{children:[n.jsx(Hl,{placeholder:s,autoFocus:i,onClear:l}),n.jsx(Hi,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function Yl(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!xs.has(i.nodeName)){const l=bs(i,t,s,!1);l!==null&&(o=o.concat(l))}return function(i){for(const l of i)l.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&l.insertAfter(x.$createLineBreakNode());for(const l of i){const c=l.getChildren();for(const w of c)l.insertBefore(w);l.remove()}}(s),o}function Xl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)gs(t,o[s],r,e);return r.innerHTML}function gs(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let l=e;o!==null&&x.$isTextNode(e)&&(l=tl(o,e,"clone"));const c=x.$isElementNode(l)?l.getChildren():[],w=x.getRegisteredNode(t,l.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,l):l.exportDOM(t);const{element:p,after:f}=d;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],N=gs(t,g,h,o);!s&&x.$isElementNode(e)&&N&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),f){const u=f.call(l,p);u&&(x.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(h);return s}const xs=new Set(["STYLE","SCRIPT"]);function bs(t,e,r,o,s=new Map,i){let l=[];if(xs.has(t.nodeName))return l;let c=null;const w=function(g,N){const{nodeName:b}=g,k=N._htmlConversions.get(b.toLowerCase());let C=null;if(k!==void 0)for(const S of k){const E=S(g);E!==null&&(C===null||(C.priority||0)<=(E.priority||0))&&(C=E)}return C!==null?C.conversion:null}(t,e),d=w?w(t):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,N]of s)if(c=N(c,i),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const f=t.childNodes;let h=[];const u=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<f.length;g++)h.push(...bs(f[g],e,r,u,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=Wl(t,h,u?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?l=l.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),l}function Wl(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let l=0;l<e.length;l++){const c=e[l];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),l===e.length-1||l<e.length-1&&x.$isBlockElementNode(e[l+1])){const w=r();w.setFormat(o),w.append(...i),s.push(w),i=[]}}return s}function vs(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function ys(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:ys(e.children)):!1}function Jt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?ys(t.root.children):!1}function Zl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Ro.createHeadlessEditor({namespace:"EditorUtils",theme:Er,nodes:Sr,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=Yl(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function $n(t){const e=Ro.createHeadlessEditor({namespace:"EditorUtils",theme:Er,nodes:Sr,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=Xl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Dr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function In(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Ir(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const Jl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function lr(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function Ql({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=a.useState(Jl),[l,c]=a.useState(void 0),[w,d]=a.useState(!1),p=a.useRef(void 0),f=a.useRef(null);a.useEffect(()=>{let k=!0;const C=f.current;if(!C)return;const S=setTimeout(()=>{k&&vs(C)},300);return()=>{k=!1,clearTimeout(S)}},[]);const h=a.useCallback(()=>{if(!Jt(s))return;const k=$n(s);e(k,l)},[s,e,l]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",N=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(G,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(_.X,{})})}),n.jsx(Dt,{children:n.jsx("p",{children:N})})]})}),n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(G,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Jt(s),children:n.jsx(_.Check,{})})}),n.jsx(Dt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(we,{open:w,onOpenChange:d,children:[n.jsx(he,{asChild:!0,children:n.jsxs(G,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(_.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:lr(l!==void 0?l:"",o)})]})}),n.jsx(ne,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),d(!1))},children:n.jsx(ce,{children:n.jsx(de,{children:t.map(k=>n.jsx(Wt,{onSelect:()=>{c(k===""?void 0:k),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:lr(k,o)})},k||"unassigned"))})})})]})}),n.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:k=>{k.key==="Escape"?(k.preventDefault(),k.stopPropagation(),r()):Ir(k)&&(k.preventDefault(),k.stopPropagation(),Jt(s)&&h())},onKeyDown:k=>{Dr(k),(k.key==="Enter"||k.key===" ")&&k.stopPropagation()},children:n.jsx(Ln,{editorSerializedState:s,onSerializedChange:k=>i(k),placeholder:u,onClear:k=>{p.current=k}})})]})}const tc=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),ec=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],nc=["input","select","textarea","button"],rc=["button","textbox"],js=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=a.useRef(null),[i,l]=a.useState(void 0),[c,w]=a.useState(void 0),d=a.useCallback(u=>{l(u);const g=t.find(b=>b.id===u);g&&(e==null||e(g));const N=document.getElementById(u);N&&(N.scrollIntoView({block:"center"}),N.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=a.useCallback(u=>{const g=t.find(N=>N.id===u);g&&(w(N=>N===u?void 0:u),r==null||r(g))},[r,t]),f=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||nc.includes(g))return!0;const N=u.getAttribute("role");if(N&&rc.includes(N))return!0;const b=u.getAttribute("tabindex");return b!==void 0&&b!=="-1"},h=a.useCallback(u=>{var A;const g=u.target,N=O=>O?document.getElementById(O):void 0,b=N(c),k=N(i);if(!!(b&&g&&b.contains(g)&&g!==b)&&f(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const O=t.find(j=>j.id===c);O&&d(O.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!b)return;const O=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(O.length===0)return;const j=O.findIndex(L=>L===g);if(j===-1)return;let D;u.key==="ArrowDown"?D=Math.min(j+1,O.length-1):D=Math.max(j-1,0),D!==j&&(u.preventDefault(),u.stopPropagation(),(A=O[D])==null||A.focus());return}return}const E=t.findIndex(O=>O.id===i);let B=E;switch(u.key){case"ArrowDown":B=Math.min(E+1,t.length-1),u.preventDefault();break;case"ArrowUp":B=Math.max(E-1,0),u.preventDefault();break;case"Home":B=0,u.preventDefault();break;case"End":B=t.length-1,u.preventDefault();break;case" ":case"Enter":i&&p(i),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const O=k;if(O){const j=O.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),D=O.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),L=j??D;if(L){u.preventDefault(),L.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(f(g)||(o==null||o(u.key),u.preventDefault()));return}const V=t[B];V&&d(V.id)},[t,d,i,c,p,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:h,focusOption:d}},Ns=Se.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),$e=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:m("pr-twp",Ns({variant:e}),t),...r}));$e.displayName="Badge";const Or=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Or.displayName="Card";const ks=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));ks.displayName="CardHeader";const _s=a.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:m("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));_s.displayName="CardTitle";const Cs=a.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:m("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Cs.displayName="CardDescription";const Ar=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-p-6 tw-pt-0",t),...e}));Ar.displayName="CardContent";const Es=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Es.displayName="CardFooter";const Fe=a.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(Oo.Root,{ref:s,decorative:r,orientation:e,className:m("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));Fe.displayName=Oo.Root.displayName;const Pr=a.forwardRef(({className:t,...e},r)=>n.jsx(nn.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Pr.displayName=nn.Root.displayName;const Ss=a.forwardRef(({className:t,...e},r)=>n.jsx(nn.Image,{ref:r,className:m("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Ss.displayName=nn.Image.displayName;const Lr=a.forwardRef(({className:t,...e},r)=>n.jsx(nn.Fallback,{ref:r,className:m("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Lr.displayName=nn.Fallback.displayName;const $r=a.createContext(void 0);function re(){const t=a.useContext($r);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ge=Se.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),me=dt.Trigger,Fr=dt.Group,Rs=dt.Portal,Ts=dt.Sub,Ms=dt.RadioGroup;function le({variant:t="default",...e}){const r=a.useMemo(()=>({variant:t}),[t]);return n.jsx($r.Provider,{value:r,children:n.jsx(dt.Root,{...e})})}const Vr=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=re();return n.jsxs(dt.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,ge({variant:i.variant})),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Vr.displayName=dt.SubTrigger.displayName;const Br=a.forwardRef(({className:t,children:e,...r},o)=>{const s=vt();return n.jsx(dt.SubContent,{ref:o,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});Br.displayName=dt.SubContent.displayName;const te=a.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const i=vt();return n.jsx(dt.Portal,{children:n.jsx(dt.Content,{ref:s,sideOffset:e,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});te.displayName=dt.Content.displayName;const Ne=a.forwardRef(({className:t,inset:e,...r},o)=>{const s=vt(),i=re();return n.jsx(dt.Item,{ref:o,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,ge({variant:i.variant})),...r,dir:s})});Ne.displayName=dt.Item.displayName;const Qt=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=vt(),l=re();return n.jsxs(dt.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ge({variant:l.variant})),checked:r,...o,dir:i,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(dt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Qt.displayName=dt.CheckboxItem.displayName;const zr=a.forwardRef(({className:t,children:e,...r},o)=>{const s=vt(),i=re();return n.jsxs(dt.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ge({variant:i.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(dt.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});zr.displayName=dt.RadioItem.displayName;const Ke=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(dt.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ke.displayName=dt.Label.displayName;const fe=a.forwardRef(({className:t,...e},r)=>n.jsx(dt.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));fe.displayName=dt.Separator.displayName;function Ds({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Ds.displayName="DropdownMenuShortcut";function vo({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:l,canEditOrDelete:c=!1}){const[w,d]=a.useState(!1),[p,f]=a.useState(),h=a.useRef(null);a.useEffect(()=>{if(!w)return;let E=!0;const B=h.current;if(!B)return;const V=setTimeout(()=>{E&&vs(B)},300);return()=>{E=!1,clearTimeout(V)}},[w]);const u=a.useCallback(E=>{E&&E.stopPropagation(),d(!1),f(void 0),l==null||l(!1)},[l]),g=a.useCallback(async E=>{if(E&&E.stopPropagation(),!p||!s)return;await s(t.id,$n(p))&&(d(!1),f(void 0),l==null||l(!1))},[p,s,t.id,l]),N=a.useMemo(()=>{const E=new Date(t.date),B=y.formatRelativeDate(E,r["%comment_date_today%"],r["%comment_date_yesterday%"]),V=E.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return y.formatReplacementString(r["%comment_dateAtTime%"],{date:B,time:V})},[t.date,r]),b=a.useMemo(()=>t.user,[t.user]),k=a.useMemo(()=>t.user.split(" ").map(E=>E[0]).join("").toUpperCase().slice(0,2),[t.user]),C=a.useMemo(()=>y.sanitizeHtml(t.contents),[t.contents]),S=a.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ne,{onClick:E=>{E.stopPropagation(),d(!0),f(Zl(t.contents)),l==null||l(!0)},children:[n.jsx(_.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ne,{onClick:async E=>{E.stopPropagation(),i&&await i(t.id)},children:[n.jsx(_.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,i,l]);return n.jsxs("div",{className:m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(Pr,{className:"tw-h-8 tw-w-8",children:n.jsx(Lr,{className:"tw-text-xs tw-font-medium",children:k})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:N}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs($e,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",In(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:E=>{E.key==="Escape"?(E.preventDefault(),E.stopPropagation(),u()):Ir(E)&&(E.preventDefault(),E.stopPropagation(),Jt(p)&&g())},onKeyDown:E=>{Dr(E),(E.key==="Enter"||E.key===" ")&&E.stopPropagation()},onClick:E=>{E.stopPropagation()},children:[n.jsx(Ln,{className:m('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:E=>f(E)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(G,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(_.X,{})}),n.jsx(G,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Jt(p),children:n.jsx(_.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:m("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:C}})]})]}),S&&n.jsxs(le,{children:[n.jsx(me,{asChild:!0,children:n.jsx(G,{variant:"ghost",size:"icon",children:n.jsx(_.MoreHorizontal,{})})}),n.jsx(te,{align:"end",children:S})]})]})}const yo={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function oc({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:l,handleSelectThread:c,threadId:w,thread:d,threadStatus:p,handleAddCommentToThread:f,handleUpdateComment:h,handleDeleteComment:u,handleReadStatusChange:g,assignableUsers:N,canUserAddCommentToThread:b,canUserAssignThreadCallback:k,canUserResolveThreadCallback:C,canUserEditOrDeleteCommentCallback:S,isRead:E=!1,autoReadDelay:B=5,onVerseRefClick:V}){const[A,O]=a.useState(yo),[j,D]=a.useState(void 0),L=o,[$,M]=a.useState(!1),[P,H]=a.useState(!1),[U,Z]=a.useState(!1),[yt,It]=a.useState(!1),[kt,Q]=a.useState(!1),[ut,K]=a.useState(E),[et,rt]=a.useState(!1),at=a.useRef(void 0),[it,_t]=a.useState(new Map);a.useEffect(()=>{let T=!0;return(async()=>{const mt=C?await C(w):!1;T&&Q(mt)})(),()=>{T=!1}},[w,C]),a.useEffect(()=>{let T=!0;if(!o){It(!1),_t(new Map);return}return(async()=>{const mt=k?await k(w):!1;T&&It(mt)})(),()=>{T=!1}},[o,w,k]);const Et=a.useMemo(()=>e.filter(T=>!T.deleted),[e]);a.useEffect(()=>{let T=!0;if(!o||!S){_t(new Map);return}return(async()=>{const mt=new Map;await Promise.all(Et.map(async ue=>{const Re=await S(ue.id);T&&mt.set(ue.id,Re)})),T&&_t(mt)})(),()=>{T=!1}},[o,Et,S]);const Ot=a.useMemo(()=>Et[0],[Et]),xe=a.useRef(null),I=a.useRef(void 0),At=a.useCallback(()=>{var T;(T=I.current)==null||T.call(I),O(yo)},[]),Ut=a.useCallback(()=>{const T=!ut;K(T),rt(!T),g==null||g(w,T)},[ut,g,w]);a.useEffect(()=>{M(!1)},[o]),a.useEffect(()=>{if(o&&!ut&&!et){const T=setTimeout(()=>{K(!0),g==null||g(w,!0)},B*1e3);return at.current=T,()=>clearTimeout(T)}at.current&&(clearTimeout(at.current),at.current=void 0)},[o,ut,et,B,w,g]);const Pt=a.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),F=a.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const T=In(i,r);return y.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:T})},[i,r]),Y=a.useMemo(()=>Et.slice(1),[Et]),J=a.useMemo(()=>Y.length??0,[Y.length]),nt=a.useMemo(()=>J>0,[J]),lt=a.useMemo(()=>$||J<=2?Y:Y.slice(-2),[Y,J,$]),ct=a.useMemo(()=>$||J<=2?0:J-2,[J,$]),Ct=a.useMemo(()=>J===1?Pt.singleReply:y.formatReplacementString(Pt.multipleReplies,{count:J}),[J,Pt]),ht=a.useMemo(()=>ct===1?Pt.singleReply:y.formatReplacementString(Pt.multipleReplies,{count:ct}),[ct,Pt]);a.useEffect(()=>{!o&&P&&nt&&H(!1)},[o,P,nt]);const gt=a.useCallback(async T=>{T&&T.stopPropagation();const xt=Jt(A)?$n(A):void 0;if(j!==void 0){await f({threadId:w,contents:xt,assignedUser:j})&&(D(void 0),xt&&At());return}xt&&await f({threadId:w,contents:xt})&&At()},[At,A,f,j,w]),jt=a.useCallback(async T=>{const xt=Jt(A)?$n(A):void 0,mt=await f({...T,contents:xt,assignedUser:j??T.assignedUser});return mt&&xt&&At(),mt&&j!==void 0&&D(void 0),mt},[At,A,f,j]);if(Ot)return n.jsx(Or,{role:"option","aria-selected":o,id:w,className:m("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&ut,"tw-bg-background":o&&p!=="Resolved"&&ut,"tw-bg-muted":p==="Resolved","tw-bg-accent":!ut&&!o&&p!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(Ar,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[F&&n.jsx($e,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:F}),n.jsx(G,{variant:"ghost",size:"icon",onClick:T=>{T.stopPropagation(),Ut()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":ut?"Mark as unread":"Mark as read",children:ut?n.jsx(_.MailOpen,{}):n.jsx(_.Mail,{})}),kt&&p!=="Resolved"&&n.jsx(G,{variant:"ghost",size:"icon",className:m("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:T=>{T.stopPropagation(),jt({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:xe,className:m("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":L},{"tw-whitespace-nowrap":!L}),children:[s&&V?n.jsx(G,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:T=>{T.stopPropagation(),V(d)},children:s}):s,n.jsxs("span",{className:t,children:[Ot.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Ot.selectedText}),Ot.contextAfter]})]})}),n.jsx(vo,{comment:Ot,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:jt,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:H,canEditOrDelete:(!P&&it.get(Ot.id))??!1,canUserResolveThread:kt})]}),n.jsxs(n.Fragment,{children:[nt&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(Fe,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ct})]}),!o&&Jt(A)&&n.jsx(Ln,{editorSerializedState:A,onSerializedChange:T=>O(T),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[ct>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:T=>{T.stopPropagation(),M(!0)},role:"button",tabIndex:0,onKeyDown:T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),T.stopPropagation(),M(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(Fe,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ht}),$?n.jsx(_.ChevronUp,{}):n.jsx(_.ChevronDown,{})]})]}),lt.map(T=>n.jsx("div",{children:n.jsx(vo,{comment:T,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:H,canEditOrDelete:(!P&&it.get(T.id))??!1})},T.id)),b!==!1&&(!P||Jt(A))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:T=>T.stopPropagation(),onKeyDownCapture:T=>{Ir(T)&&(T.preventDefault(),T.stopPropagation(),(Jt(A)||j!==void 0)&&gt())},onKeyDown:T=>{Dr(T),(T.key==="Enter"||T.key===" ")&&T.stopPropagation()},children:[n.jsx(Ln,{editorSerializedState:A,onSerializedChange:T=>O(T),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:T=>{I.current=T}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[j!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:y.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:In(j,r)})}),n.jsxs(we,{open:U,onOpenChange:Z,children:[n.jsx(he,{asChild:!0,children:n.jsx(G,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!yt||!N||N.length===0||!N.includes(l),"aria-label":"Assign user",children:n.jsx(_.AtSign,{})})}),n.jsx(ne,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:T=>{T.key==="Escape"&&(T.stopPropagation(),Z(!1))},children:n.jsx(ce,{children:n.jsx(de,{children:N==null?void 0:N.map(T=>n.jsx(Wt,{onSelect:()=>{D(T!==i?T:void 0),Z(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:In(T,r)})},T||"unassigned"))})})})]}),n.jsx(G,{size:"icon",onClick:gt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Jt(A)&&j===void 0,"aria-label":"Submit comment",children:n.jsx(_.ArrowUp,{})})]})]})]})]})]})})}function sc({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:N,onVerseRefClick:b}){const[k,C]=a.useState(new Set),[S,E]=a.useState();a.useEffect(()=>{g&&(C(M=>new Set(M).add(g)),E(g))},[g]);const B=r.filter(M=>M.comments.some(P=>!P.deleted)),V=B.map(M=>({id:M.id})),A=a.useCallback(M=>{C(P=>new Set(P).add(M.id)),E(M.id),N==null||N(M.id)},[N]),O=a.useCallback(M=>{const P=k.has(M);C(H=>{const U=new Set(H);return U.has(M)?U.delete(M):U.add(M),U}),E(M),N==null||N(P?void 0:M)},[k,N]),{listboxRef:j,activeId:D,handleKeyDown:L}=js({options:V,onOptionSelect:A}),$=a.useCallback(M=>{M.key==="Escape"?(S&&k.has(S)&&(C(P=>{const H=new Set(P);return H.delete(S),H}),E(void 0),N==null||N(void 0)),M.preventDefault(),M.stopPropagation()):L(M)},[S,k,L,N]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:j,"aria-activedescendant":D??void 0,"aria-label":"Comments",className:m("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:$,children:B.map(M=>n.jsx("div",{className:m({"tw-opacity-60":M.status==="Resolved"}),children:n.jsx(oc,{classNameForVerseText:e,comments:M.comments,localizedStrings:s,verseRef:M.verseRef,handleSelectThread:O,threadId:M.id,thread:M,isRead:M.isRead,isSelected:k.has(M.id),currentUser:o,assignedUser:M.assignedUser,threadStatus:M.status,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:b})},M.id))})}function ac({table:t}){return n.jsxs(le,{children:[n.jsx(To.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(G,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(_.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(te,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ke,{children:"Toggle columns"}),n.jsx(fe,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Qt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const Ve=ft.Root,Is=ft.Group,Be=ft.Value,Os=Se.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Ce=a.forwardRef(({className:t,children:e,size:r,...o},s)=>{const i=vt();return n.jsxs(ft.Trigger,{className:m(Os({size:r,className:t})),ref:s,...o,dir:i,children:[e,n.jsx(ft.Icon,{asChild:!0,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Ce.displayName=ft.Trigger.displayName;const Gr=a.forwardRef(({className:t,...e},r)=>n.jsx(ft.ScrollUpButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(_.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Gr.displayName=ft.ScrollUpButton.displayName;const Kr=a.forwardRef(({className:t,...e},r)=>n.jsx(ft.ScrollDownButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Kr.displayName=ft.ScrollDownButton.displayName;const Ee=a.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const i=vt();return n.jsx(ft.Portal,{children:n.jsxs(ft.Content,{ref:s,className:m("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(Gr,{}),n.jsx(ft.Viewport,{className:m("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(Kr,{})]})})});Ee.displayName=ft.Content.displayName;const As=a.forwardRef(({className:t,...e},r)=>n.jsx(ft.Label,{ref:r,className:m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));As.displayName=ft.Label.displayName;const qt=a.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(ft.Item,{ref:o,className:m("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ft.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(ft.ItemText,{children:e})]}));qt.displayName=ft.Item.displayName;const Ps=a.forwardRef(({className:t,...e},r)=>n.jsx(ft.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ps.displayName=ft.Separator.displayName;function ic({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(Ve,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(Ce,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(Be,{placeholder:t.getState().pagination.pageSize})}),n.jsx(Ee,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(qt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(G,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(_.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(_.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(_.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(_.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const jo=`
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
`;function lc(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function vn(t,e){const r=e?`${jo}, ${e}`:jo;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&lc(o))}const yn=a.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=a.useRef(null);a.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),a.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{vn(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const i=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),vn(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:m("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:m("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});yn.displayName="Table";const jn=a.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:m({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));jn.displayName="TableHeader";const Nn=a.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:m("[&_tr:last-child]:tw-border-0",t),...e}));Nn.displayName="TableBody";const Ls=a.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Ls.displayName="TableFooter";function cc(t){a.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?vn(t.current):[],i=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?i+1:i-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function dc(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function wc(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const ie=a.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const l=a.useRef(null);a.useEffect(()=>{typeof i=="function"?i(l.current):i&&"current"in i&&(i.current=l.current)},[i]),cc(l);const c=a.useMemo(()=>l.current?vn(l.current):[],[l]),w=a.useCallback(p=>{const{current:f}=l;if(!f||!f.parentElement)return;const h=f.closest("table"),u=h?vn(h).filter(b=>b.tagName==="TR"):[],g=u.indexOf(f),N=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),wc(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),dc(c,N,p.key);else if(p.key==="Escape"){p.preventDefault();const b=f.closest("table");b&&b.focus()}e==null||e(p)},[l,c,e]),d=a.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:w,onFocus:d,className:m("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});ie.displayName="TableRow";const tn=a.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:m("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));tn.displayName="TableHead";const ke=a.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));ke.displayName="TableCell";const $s=a.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:m("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));$s.displayName="TableCaption";function Fn({className:t,...e}){return n.jsx("div",{className:m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Fs({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:l=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var V;const[p,f]=a.useState([]),[h,u]=a.useState([]),[g,N]=a.useState({}),[b,k]=a.useState({}),C=a.useMemo(()=>e??[],[e]),S=Vt.useReactTable({data:C,columns:t,getCoreRowModel:Vt.getCoreRowModel(),...r&&{getPaginationRowModel:Vt.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:Vt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Vt.getFilteredRowModel(),onColumnVisibilityChange:N,onRowSelectionChange:k,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:b}}),E=S.getVisibleFlatColumns();let B;return w?B=Array.from({length:10}).map((j,D)=>`skeleton-row-${D}`).map(j=>n.jsx(ie,{className:"hover:tw-bg-transparent",children:n.jsx(ke,{colSpan:E.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(Fn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},j)):((V=S.getRowModel().rows)==null?void 0:V.length)>0?B=S.getRowModel().rows.map(A=>n.jsx(ie,{onClick:()=>l(A,S),"data-state":A.getIsSelected()&&"selected",children:A.getVisibleCells().map(O=>n.jsx(ke,{children:Vt.flexRender(O.column.columnDef.cell,O.getContext())},O.id))},A.id)):B=n.jsx(ie,{children:n.jsx(ke,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(ac,{table:S}),n.jsxs(yn,{stickyHeader:i,children:[n.jsx(jn,{stickyHeader:i,children:S.getHeaderGroups().map(A=>n.jsx(ie,{children:A.headers.map(O=>n.jsx(tn,{className:"tw-p-0",children:O.isPlaceholder?void 0:Vt.flexRender(O.column.columnDef.header,O.getContext())},O.id))},A.id))}),n.jsx(Nn,{children:B})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(G,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),n.jsx(G,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(ic,{table:S})]})}function pc({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=a.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:m("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(hi,{options:i,children:e})})}const Vs=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),No=(t,e)=>t[e]??e;function Bs({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=No(r,"%webView_error_dump_header%"),i=No(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(G,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(_.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const uc=Object.freeze([...Vs,"%webView_error_dump_copied_message%"]);function mc({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[l,c]=a.useState(!1),w=()=>{c(!0),e&&e()},d=p=>{p||c(!1)};return n.jsxs(we,{onOpenChange:d,children:[n.jsx(he,{asChild:!0,children:o}),n.jsxs(ne,{id:i,className:m("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(bt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Bs,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var zs=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(zs||{});function fc({id:t,label:e,groups:r}){const[o,s]=a.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[i,l]=a.useState({}),c=(d,p)=>{const f=!o[d][p];s(u=>(u[d][p]=f,{...u}));const h=r[d].items[p];h.onUpdate(h.id,f)},w=(d,p)=>{l(h=>(h[d]=p,{...h}));const f=r[d].items.find(h=>h.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(le,{children:[n.jsx(me,{asChild:!0,children:n.jsxs(G,{variant:"default",children:[n.jsx(_.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(_.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(te,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Ke,{children:d.label}),n.jsx(Fr,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((f,h)=>n.jsx("div",{children:n.jsx(Qt,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:f.label})},f.id))}):n.jsx(Ms,{value:i[p],onValueChange:f=>w(p,f),children:d.items.map(f=>n.jsx("div",{children:n.jsx(zr,{value:f.id,children:f.label})},f.id))})}),n.jsx(fe,{})]},d.label))})]})})}function hc({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:l,handleSupportLinkClick:c}){const w=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,f)=>p+f,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(_.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(_.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(_.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function gc({id:t,versionHistory:e}){const[r,o]=a.useState(!1),s=new Date;function i(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,f=d.getUTCMonth(),h=d.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const l=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function xc({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const l=a.useMemo(()=>y.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(y.getCurrentLocale(),{type:"language"});return d.map(f=>p.of(f))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(gc,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function Gs({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:N="ghost",id:b}){const[k,C]=a.useState(!1),S=a.useCallback(D=>{var $;const L=($=t.find(M=>M.label===D))==null?void 0:$.value;L&&r(e.includes(L)?e.filter(M=>M!==L):[...e,L])},[t,e,r]),E=()=>w||o,B=a.useMemo(()=>{if(!h)return t;const D=t.filter($=>$.starred).sort(($,M)=>$.label.localeCompare(M.label)),L=t.filter($=>!$.starred).sort(($,M)=>{const P=e.includes($.value),H=e.includes(M.value);return P&&!H?-1:!P&&H?1:$.label.localeCompare(M.label)});return[...D,...L]},[t,e,h]),V=()=>{r(t.map(D=>D.value))},A=()=>{r([])},O=d??k,j=p??C;return n.jsx("div",{id:b,className:g,children:n.jsxs(we,{open:O,onOpenChange:j,children:[n.jsx(he,{asChild:!0,children:n.jsxs(G,{variant:N,role:"combobox","aria-expanded":O,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:E()})]}),n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(ne,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(ce,{children:[n.jsx(Ge,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:V,children:i}),n.jsx(G,{variant:"ghost",size:"sm",onClick:A,children:l})]}),n.jsxs(de,{children:[n.jsx(rn,{children:c}),n.jsx(Xt,{children:B.map(D=>n.jsxs(Wt,{value:D.label,onSelect:S,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(_.Check,{className:m("tw-h-4 tw-w-4",e.includes(D.value)?"tw-opacity-100":"tw-opacity-0")})}),D.starred&&n.jsx(_.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:D.label}),D.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:D.secondaryLabel})]},D.label))})]})]})})]})})}function bc({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:f}){return n.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Gs,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var u;return n.jsxs($e,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(G,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(_.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(g=>g.value===h))==null?void 0:u.label]},h)})}):n.jsx(bt,{children:p})]})}const Ks=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),ko=(t,e)=>t[e]??e;function qs({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:i=!0,className:l="tw-h-6 tw-w-6",variant:c="ghost"}){const w=a.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(G,{"aria-label":"Undo",className:l,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(_.Undo,{})})}),n.jsx(Dt,{children:n.jsxs("p",{children:[ko(s,"%undoButton_tooltip%"),i&&` (${w?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(G,{"aria-label":"Redo",className:l,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(_.Redo,{})})}),n.jsx(Dt,{children:n.jsxs("p",{children:[ko(s,"%redoButton_tooltip%"),i&&` (${w?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function Hs({children:t,editorRef:e}){const r=a.useRef(null);return a.useEffect(()=>{var l;const o=/Macintosh/i.test(navigator.userAgent),s=((l=r.current)==null?void 0:l.querySelector(".editor-input"))??void 0,i=c=>{var d,p,f,h;if(!s||document.activeElement!==s)return;const w=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(d=e.current)==null||d.undo()):c.shiftKey&&w==="z"&&(c.preventDefault(),(p=e.current)==null||p.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(f=e.current)==null||f.undo()):(w==="y"||c.shiftKey&&w==="z")&&(c.preventDefault(),(h=e.current)==null||h.redo())}};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[e]),n.jsx("div",{ref:r,children:t})}const qe=a.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:m("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));qe.displayName="Input";const vc=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function yc({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=a.useRef(null),l=a.useRef(null),c=a.useRef(!1),[w,d]=a.useState(t),[p,f]=a.useState(r),[h,u]=a.useState(!1);a.useEffect(()=>{d(t)},[t]),a.useEffect(()=>{p!==r&&f(r)},[r]);const g=b=>{c.current=!1,u(b),b||(w!=="custom"||p?(e(w),o(p)):(d(t),f(r)))},N=b=>{var k,C,S,E;b.stopPropagation(),document.activeElement===l.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((k=i.current)==null||k.focus(),c.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((C=l.current)==null||C.focus(),c.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((S=i.current)==null?void 0:S.selectionStart)===0&&((E=l.current)==null||E.focus(),c.current=!1),w==="custom"&&b.key==="Enter"&&(document.activeElement===l.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(le,{open:h,onOpenChange:g,children:[n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(me,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:vc(t,s,r)})})}),n.jsx(Dt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(te,{style:{zIndex:yr},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:N,onMouseMove:()=>{var b;c.current&&((b=i.current)==null||b.focus())},children:[n.jsx(Ke,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(fe,{}),n.jsx(Qt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Yt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Qt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Yt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Qt,{ref:l,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:b=>{var k;b.stopPropagation(),c.current=!0,(k=i.current)==null||k.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(qe,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),d("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>f(b.target.value)})]})})]})]})}const jc=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(_.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(_.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(_.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Nc=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),y.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function kc({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(le,{children:[n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(So.TooltipTrigger,{asChild:!0,children:n.jsx(me,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:jc(t,r)})})}),n.jsx(Dt,{children:n.jsx("p",{children:Nc(t,r)})})]})}),n.jsxs(te,{style:{zIndex:yr},children:[n.jsx(Ke,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(fe,{}),n.jsxs(Qt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(_.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Qt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(_.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Qt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(_.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const Us=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function _c({icon:t,className:e}){const r=t??_.Ban;return n.jsx(r,{className:e,size:16})}function _o({item:t,localizedStrings:e}){return n.jsxs(Wt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(_c,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(Vo,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function Ys({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=a.useState(""),[i,l]=a.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const w=e.filter(p=>{var f;return(f=p.marker)==null?void 0:f.toLowerCase().includes(c)}),d=e.filter(p=>p.title.toLowerCase().includes(c)&&!w.includes(p));return[w,d]},[o,e]);return n.jsxs(ce,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(Ge,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(de,{children:[n.jsx(rn,{children:t["%markerMenu_noResults%"]}),n.jsx(Xt,{children:i.map(c=>{var w;return n.jsx(_o,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})}),l.length>0&&n.jsxs(n.Fragment,{children:[i.length>0&&n.jsx(Nr,{alwaysRender:!0}),n.jsx(Xt,{children:l.map(c=>{var w;return n.jsx(_o,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function Cc(t,e,r,o){if(!o||o==="p")return[];const s=y.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,l])=>{i.push(...l.map(c=>({marker:c,title:r[y.usfmMarkers[c].description]??y.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),i.sort((l,c)=>(l.marker??l.title).localeCompare(c.marker??c.title))}function Ec(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Sc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Rc={type:"USJ",version:"3.1",content:[{type:"para"}]};function Tc({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:l,defaultMarkerMenuTrigger:c,localizedStrings:w,parentEditorRef:d}){const p=a.useRef(null),f=a.useRef(null),h=a.useRef(null),u=a.useRef(null);a.useLayoutEffect(()=>{if(!u.current)return;const{width:F}=u.current.getBoundingClientRect();F>0&&(u.current.style.width=`${F}px`)},[]);const[g,N]=a.useState("generated"),[b,k]=a.useState("*"),[C,S]=a.useState("f"),[E,B]=a.useState(!1),[V,A]=a.useState(!0),[O,j]=a.useState(!1),D=a.useRef(!1),L=a.useRef(""),[$,M]=a.useState(!1),[P,H]=a.useState(),[U,Z]=a.useState(),[yt,It]=a.useState(),[kt,Q]=a.useState(),ut=a.useRef(null),K=a.useMemo(()=>({...l,markerMenuTrigger:c,hasExternalUI:!0,view:{...l.view??Yt.getDefaultViewOptions(),noteMode:"expanded"}}),[l,c]),et=a.useMemo(()=>Cc(p,()=>M(!1),w,kt),[w,kt]);a.useEffect(()=>{var F;$||(F=p.current)==null||F.focus()},[C,$]),a.useEffect(()=>{var J,nt;let F;D.current=!1,A(!0);const Y=e==null?void 0:e.at(0);if(Y&&Yt.isInsertEmbedOpOfType("note",Y)){const lt=(J=Y.insert.note)==null?void 0:J.caller;let ct="custom";lt===Yt.GENERATOR_NOTE_CALLER?ct="generated":lt===Yt.HIDDEN_NOTE_CALLER?ct="hidden":lt&&k(lt),N(ct),S(((nt=Y.insert.note)==null?void 0:nt.style)??"f"),F=setTimeout(()=>{var Ct;(Ct=p.current)==null||Ct.applyUpdate([Y])},0)}return()=>{F&&clearTimeout(F)}},[e,i]);const rt=a.useCallback((F,Y,J=!1)=>{var lt,ct,Ct;const nt=(ct=(lt=p.current)==null?void 0:lt.getNoteOps(0))==null?void 0:ct.at(0);if(nt&&Yt.isInsertEmbedOpOfType("note",nt)){if(nt.insert.note){let ht;F==="custom"?ht=Y:F==="generated"?ht=Yt.GENERATOR_NOTE_CALLER:ht=Yt.HIDDEN_NOTE_CALLER,nt.insert.note.caller=ht}r==null||r([nt]),J&&d&&i&&((Ct=d.current)==null||Ct.replaceEmbedUpdate(i,[nt]))}},[i,r,d]),at=a.useCallback(()=>{rt(g,b,!0),o()},[g,b,o,rt]),it=a.useRef(at);a.useLayoutEffect(()=>{it.current=at});const _t=a.useRef({book:s.book,chapterNum:s.chapterNum});a.useLayoutEffect(()=>{(_t.current.book!==s.book||_t.current.chapterNum!==s.chapterNum)&&(_t.current={book:s.book,chapterNum:s.chapterNum},it.current())},[s.book,s.chapterNum]);const Et=()=>{var Y;const F=(Y=f.current)==null?void 0:Y.getElementsByClassName("editor-input")[0];F!=null&&F.textContent&&navigator.clipboard.writeText(F.textContent)},Ot=a.useCallback(F=>{N(F),rt(F,b)},[b,rt]),xe=a.useCallback(F=>{k(F),rt(g,F)},[g,rt]),I=F=>{var J,nt,lt,ct,Ct;S(F);const Y=(nt=(J=p.current)==null?void 0:J.getNoteOps(0))==null?void 0:nt.at(0);if(Y&&Yt.isInsertEmbedOpOfType("note",Y)){Y.insert.note&&(Y.insert.note.style=F);const ht=(ct=(lt=Y.insert.note)==null?void 0:lt.contents)==null?void 0:ct.ops;C!=="x"&&F==="x"?ht==null||ht.forEach(gt=>Ec(gt)):C==="x"&&F!=="x"&&(ht==null||ht.forEach(gt=>Sc(gt))),(Ct=p.current)==null||Ct.applyUpdate([Y,{delete:1}])}},At=F=>{Q(F.contextMarker),j(F.canRedo)},Ut=a.useCallback(F=>{var J,nt,lt,ct,Ct;const Y=(nt=(J=p.current)==null?void 0:J.getNoteOps(0))==null?void 0:nt.at(0);if(Y&&Yt.isInsertEmbedOpOfType("note",Y)){F.content.length>1&&setTimeout(()=>{var jt;(jt=p.current)==null||jt.applyUpdate([{retain:2},{delete:1}])},0);const ht=(lt=Y.insert.note)==null?void 0:lt.style,gt=(Ct=(ct=Y.insert.note)==null?void 0:ct.contents)==null?void 0:Ct.ops;if(ht||B(!1),B(ht==="x"?!!(gt!=null&&gt.every(jt=>{var xt,mt;if(!((xt=jt.attributes)!=null&&xt.char))return!0;const T=((mt=jt.attributes)==null?void 0:mt.char).style;return T==="xt"||T==="xo"||T==="xq"})):!!(gt!=null&&gt.every(jt=>{var xt,mt;if(!((xt=jt.attributes)!=null&&xt.char))return!0;const T=((mt=jt.attributes)==null?void 0:mt.char).style;return T==="ft"||T==="fr"||T==="fq"}))),!D.current){D.current=!0,L.current=JSON.stringify(Y),A(!0);return}A(JSON.stringify(Y)===L.current),rt(g,b)}else B(!1),A(!0)},[g,b,rt]),Pt=a.useCallback(()=>{const F=window.getSelection();if(h.current&&et.length&&F&&F.rangeCount>0){const Y=F.getRangeAt(0).getBoundingClientRect(),J=h.current.getBoundingClientRect();H(Y.left-J.left),Z(Y.top-J.top),It(Y.height),M(!0)}},[et,h]);return a.useEffect(()=>{const F=()=>{$&&M(!1)};return window.addEventListener("click",F),()=>{window.removeEventListener("click",F)}},[$]),a.useEffect(()=>{var F;$&&((F=ut.current)==null||F.focus())},[$]),a.useEffect(()=>{var J;const F=((J=f.current)==null?void 0:J.querySelector(".editor-input"))??void 0,Y=nt=>{!$&&F&&document.activeElement===F&&nt.key===c?(nt.preventDefault(),Pt()):$&&nt.key==="Escape"&&(nt.preventDefault(),M(!1))};return document.addEventListener("keydown",Y),()=>{document.removeEventListener("keydown",Y)}},[$,Pt,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:u,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(kc,{isTypeSwitchable:E,noteType:C,handleNoteTypeChange:I,localizedStrings:w}),n.jsx(yc,{callerType:g,updateCallerType:Ot,customCaller:b,updateCustomCaller:xe,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(qs,{onUndoClick:()=>{var F;return(F=p.current)==null?void 0:F.undo()},onRedoClick:()=>{var F;return(F=p.current)==null?void 0:F.redo()},canUndo:!V,canRedo:O,localizedStrings:w}),n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(G,{onClick:at,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.Check,{})})}),n.jsx(Dt,{children:n.jsx("p",{children:w["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(G,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.X,{})})}),n.jsx(Dt,{children:n.jsx("p",{children:w["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:f,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(Hs,{editorRef:p,children:n.jsx(Yt.Editorial,{options:K,onStateChange:At,onUsjChange:Ut,defaultUsj:Rc,onScrRefChange:()=>{},scrRef:s,ref:p})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsx(G,{onClick:Et,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.Copy,{})})}),n.jsx(Dt,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:h,style:{top:0,left:0,height:0,width:0}}),n.jsxs(we,{open:$,children:[n.jsx(Ko,{className:"tw-absolute",style:{top:U,left:P,height:yt,width:0,pointerEvents:"none"}}),n.jsx(ne,{className:"tw-w-[500px] tw-p-0",onClick:F=>{F.preventDefault(),F.stopPropagation()},children:n.jsx(Ys,{markerMenuItems:et,localizedStrings:w,searchRef:ut})})]})]})}const Mc=Object.freeze([...Us,...Object.entries(y.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...Ks]);function Xs(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Dc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&i.push(l),l=[c]):l.push(c)}),l.length>0&&i.push(l),i.map((c,w)=>{const d=w===i.length-1;return n.jsxs("p",{children:[qr(t,c,r,!0,s),d&&o]},Xs(t,c))})}function qr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const l=`${t}-text-${i.slice(0,10)}`;if(o){const c=m(`usfm_${t}`);return n.jsx("span",{className:c,children:i},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return Ic(i,Xs(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function Ic(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(_.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),qr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function Ws({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:m("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),f=l&&n.jsxs(n.Fragment,{children:[qr(t.marker,[l],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",N=m(h,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",N),children:[w,p]}),n.jsx("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",N),children:f}),n.jsx("div",{className:m("textual-note-body tw-flex tw-flex-col tw-gap-1",g,N),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Dc(t.marker,c,o,d)})})]})}function Oc({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??y.getFormatCallerFunction(r,void 0),f=(C,S)=>{d==null||d(C,S,s)},h=i?r.findIndex(C=>C===i):-1,[u,g]=a.useState(h),N=(C,S,E)=>{if(r.length)switch(C.key){case"Enter":case" ":C.preventDefault(),d==null||d(S,E,s);break}},b=C=>{if(r.length)switch(C.key){case"ArrowDown":C.preventDefault(),g(S=>Math.min(S+1,r.length-1));break;case"ArrowUp":C.preventDefault(),g(S=>Math.max(S-1,0));break}},k=a.useRef([]);return a.useEffect(()=>{var C;u>=0&&u<k.current.length&&((C=k.current[u])==null||C.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:m("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:m("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((C,S)=>{const E=C===i,B=`${s}-${S}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:V=>{k.current[S]=V},role:"option","aria-selected":E,"data-marker":C.marker,"data-state":E?"selected":void 0,tabIndex:S===u?0:-1,className:m("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>f(C,S),onKeyDown:V=>N(V,C,S),children:n.jsx(Ws,{footnote:C,layout:o,formatCaller:()=>p(C.caller,S),showMarkers:l})},B),S<r.length-1&&o==="vertical"&&n.jsx(Fe,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Ac(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Pc({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],l=a.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[t]);return n.jsxs(yn,{stickyHeader:!0,children:[n.jsx(jn,{stickyHeader:!0,children:n.jsxs(ie,{children:[n.jsx(tn,{children:s}),n.jsx(tn,{children:i})]})}),n.jsx(Nn,{children:l.length>0&&l.map(c=>n.jsxs(ie,{onClick:()=>{e(c.reference)},children:[n.jsx(ke,{children:y.formatScrRef(c.reference,"English")}),n.jsx(ke,{className:o,children:Ac(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const Wn=a.forwardRef(({className:t,...e},r)=>n.jsx(mr.Root,{ref:r,className:m("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(mr.Indicator,{className:m("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}));Wn.displayName=mr.Root.displayName;const Lc=t=>{if(t==="asc")return n.jsx(_.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(_.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},kn=(t,e,r)=>n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsxs(zt,{className:m("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),Lc(t.getIsSorted())]}),n.jsx(Dt,{side:"bottom",children:e})]})}),$c=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>kn(e,t)}),Fc=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>kn(r,t)}),Vc=t=>({accessorKey:"count",header:({column:e})=>kn(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),cr=(t,e,r,o,s,i)=>{let l=[...r];t.forEach(w=>{e==="approved"?l.includes(w)||l.push(w):l=l.filter(d=>d!==w)}),o(l);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),i(c)},Bc=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>kn(i,t,"tw-justify-center"),cell:({row:i})=>{const l=i.getValue("status"),c=i.getValue("item");return n.jsxs(Xn,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Ze,{onClick:w=>{w.stopPropagation(),cr([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(_.CircleCheckIcon,{})}),n.jsx(Ze,{onClick:w=>{w.stopPropagation(),cr([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(_.CircleXIcon,{})}),n.jsx(Ze,{onClick:w=>{w.stopPropagation(),cr([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(_.CircleHelpIcon,{})})]})}}),zc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Gc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Kc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Zs=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",qc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Hc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Uc=(t,e,r)=>t.map(o=>{const s=y.isString(o.key)?o.key:o.key[0];return{items:y.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||Zs(s,e,r),occurrences:o.occurrences||[]}}),se=(t,e)=>t[e]??e;function Yc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:l,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:f,onItemSelected:h}){const u=se(r,"%webView_inventory_all%"),g=se(r,"%webView_inventory_approved%"),N=se(r,"%webView_inventory_unapproved%"),b=se(r,"%webView_inventory_unknown%"),k=se(r,"%webView_inventory_scope_currentBook%"),C=se(r,"%webView_inventory_scope_chapter%"),S=se(r,"%webView_inventory_scope_verse%"),E=se(r,"%webView_inventory_filter_text%"),B=se(r,"%webView_inventory_show_additional_items%"),V=se(r,"%webView_inventory_no_results%"),[A,O]=a.useState(!1),[j,D]=a.useState("all"),[L,$]=a.useState(""),[M,P]=a.useState([]),H=a.useMemo(()=>{const K=t??[];return K.length===0?[]:Uc(K,s,i)},[t,s,i]),U=a.useMemo(()=>{if(A)return H;const K=[];return H.forEach(et=>{const rt=et.items[0],at=K.find(it=>it.items[0]===rt);at?(at.count+=et.count,at.occurrences=at.occurrences.concat(et.occurrences)):K.push({items:[rt],count:et.count,occurrences:et.occurrences,status:et.status})}),K},[A,H]),Z=a.useMemo(()=>U.length===0?[]:Hc(U,j,L),[U,j,L]),yt=a.useMemo(()=>{var rt,at;if(!A)return w;const K=(rt=o==null?void 0:o.tableHeaders)==null?void 0:rt.length;if(!K)return w;const et=[];for(let it=0;it<K;it++)et.push(Fc(((at=o==null?void 0:o.tableHeaders)==null?void 0:at[it])||"Additional Item",it+1));return[...et,...w]},[o==null?void 0:o.tableHeaders,w,A]);a.useEffect(()=>{Z.length===0?P([]):Z.length===1&&P(Z[0].items)},[Z]);const It=(K,et)=>{et.setRowSelection(()=>{const at={};return at[K.index]=!0,at});const rt=K.original.items;P(rt),h&&rt.length>0&&h(rt[0])},kt=K=>{if(K==="book"||K==="chapter"||K==="verse")c(K);else throw new Error(`Invalid scope value: ${K}`)},Q=K=>{if(K==="all"||K==="approved"||K==="unapproved"||K==="unknown")D(K);else throw new Error(`Invalid status filter value: ${K}`)},ut=a.useMemo(()=>{if(U.length===0||M.length===0)return[];const K=U.filter(et=>y.deepEqual(A?et.items:[et.items[0]],M));if(K.length>1)throw new Error("Selected item is not unique");return K.length===0?[]:K[0].occurrences},[M,A,U]);return n.jsx("div",{id:d,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(Ve,{onValueChange:K=>Q(K),defaultValue:j,children:[n.jsx(Ce,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Be,{placeholder:"Select filter"})}),n.jsxs(Ee,{children:[n.jsx(qt,{value:"all",children:u}),n.jsx(qt,{value:"approved",children:g}),n.jsx(qt,{value:"unapproved",children:N}),n.jsx(qt,{value:"unknown",children:b})]})]}),n.jsxs(Ve,{onValueChange:K=>kt(K),defaultValue:l,children:[n.jsx(Ce,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Be,{placeholder:"Select scope"})}),n.jsxs(Ee,{children:[n.jsx(qt,{value:"book",children:k}),n.jsx(qt,{value:"chapter",children:C}),n.jsx(qt,{value:"verse",children:S})]})]}),n.jsx(qe,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:E,value:L,onChange:K=>{$(K.target.value)}}),o&&n.jsx(Mt,{children:n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(Wn,{className:"tw-m-1 tw-flex-shrink-0",checked:A,onCheckedChange:K=>{O(K)}}),n.jsx(bt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??B})]})}),n.jsx(Dt,{children:(o==null?void 0:o.checkboxText)??B})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Fs,{columns:yt,data:Z,onRowClickHandler:It,stickyHeader:!0,isLoading:p,noResultsMessage:V})}),ut.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Pc,{classNameForText:f,occurrenceData:ut,setScriptureReference:e,localizedStrings:r})})]})})}const Xc="16rem",Wc="3rem",Js=a.createContext(void 0);function _n(){const t=a.useContext(Js);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Hr=a.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:l="primary",...c},w)=>{const[d,p]=a.useState(t),f=e??d,h=a.useCallback(S=>{const E=typeof S=="function"?S(f):S;r?r(E):p(E)},[r,f]),u=a.useCallback(()=>h(S=>!S),[h]),g=f?"expanded":"collapsed",k=vt()==="ltr"?l:l==="primary"?"secondary":"primary",C=a.useMemo(()=>({state:g,open:f,setOpen:h,toggleSidebar:u,side:k}),[g,f,h,u,k]);return n.jsx(Js.Provider,{value:C,children:n.jsx(Mt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Xc,"--sidebar-width-icon":Wc,...s},className:m("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:i})})})});Hr.displayName="SidebarProvider";const Ur=a.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},i)=>{const l=_n();return e==="none"?n.jsx("div",{className:m("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:m("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:m("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});Ur.displayName="Sidebar";const Qs=a.forwardRef(({className:t,onClick:e,...r},o)=>{const s=_n();return n.jsxs(G,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:m("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(_.PanelLeft,{}):n.jsx(_.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Qs.displayName="SidebarTrigger";const ta=a.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=_n();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:m("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});ta.displayName="SidebarRail";const Yr=a.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:m("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));Yr.displayName="SidebarInset";const ea=a.forwardRef(({className:t,...e},r)=>n.jsx(qe,{ref:r,"data-sidebar":"input",className:m("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ea.displayName="SidebarInput";const na=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));na.displayName="SidebarHeader";const ra=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ra.displayName="SidebarFooter";const oa=a.forwardRef(({className:t,...e},r)=>n.jsx(Fe,{ref:r,"data-sidebar":"separator",className:m("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));oa.displayName="SidebarSeparator";const Xr=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:m("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));Xr.displayName="SidebarContent";const Vn=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));Vn.displayName="SidebarGroup";const Bn=a.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?en.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:m("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});Bn.displayName="SidebarGroupLabel";const sa=a.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?en.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:m("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});sa.displayName="SidebarGroupAction";const zn=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:m("tw-w-full tw-text-sm",t),...e}));zn.displayName="SidebarGroupContent";const Wr=a.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));Wr.displayName="SidebarMenu";const Zr=a.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:m("tw-group/menu-item tw-relative",t),...e}));Zr.displayName="SidebarMenuItem";const Zc=Se.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Jr=a.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,...l},c)=>{const w=t?en.Slot:"button",{state:d}=_n(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:m(Zc({variant:r,size:o}),i),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:p}),n.jsx(Dt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});Jr.displayName="SidebarMenuButton";const aa=a.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const i=e?en.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:m("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});aa.displayName="SidebarMenuAction";const ia=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:m("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));ia.displayName="SidebarMenuBadge";const la=a.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=a.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(Fn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(Fn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});la.displayName="SidebarMenuSkeleton";const ca=a.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:m("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));ca.displayName="SidebarMenuSub";const da=a.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));da.displayName="SidebarMenuSubItem";const wa=a.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},i)=>{const l=t?en.Slot:"a";return n.jsx(l,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:m("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});wa.displayName="SidebarMenuSubButton";function pa({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:w}){const d=a.useCallback((h,u)=>{o(h,u)},[o]),p=a.useCallback(h=>{const u=r.find(g=>g.projectId===h);return u?u.projectName:h},[r]),f=a.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(Ur,{id:t,collapsible:"none",variant:"inset",className:m("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(Xr,{children:[n.jsxs(Vn,{children:[n.jsx(Bn,{className:"tw-text-sm",children:i}),n.jsx(zn,{children:n.jsx(Wr,{children:Object.entries(e).map(([h,u])=>n.jsx(Zr,{children:n.jsx(Jr,{onClick:()=>d(h),isActive:f(h),children:n.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),n.jsxs(Vn,{children:[n.jsx(Bn,{className:"tw-text-sm",children:l}),n.jsx(zn,{className:"tw-pl-3",children:n.jsx(Pn,{buttonVariant:"ghost",buttonClassName:m("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:Ao},options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);d(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(_.ScrollText,{})})})]})]})})}const Zn=a.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:l},c)=>{const w=vt();return n.jsxs("div",{id:l,className:m("tw-relative",{"tw-w-full":o},s),children:[n.jsx(_.Search,{className:m("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(qe,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:i}),t&&n.jsxs(G,{variant:"ghost",size:"icon",className:m("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Zn.displayName="SearchBar";function Jc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Zn,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(Hr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(pa,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(Yr,{className:"tw-min-w-[215px]",children:o})]})]})}const ve="scrBook",Qc="scrRef",Pe="source",td="details",ed="Scripture Reference",nd="Scripture Book",ua="Type",rd="Details";function od(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:ve,header:(t==null?void 0:t.scriptureReferenceColumnName)??ed,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?st.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===ve?y.formatScrRef(s.start):void 0},getGroupingValue:o=>st.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>y.formatScrRef(o.start),id:Qc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:y.formatScrRef(s.start)},sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Pe,header:r?(t==null?void 0:t.typeColumnName)??ua:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:td,header:(t==null?void 0:t.detailsColumnName)??rd,cell:o=>o.getValue(),enableGrouping:!1}]}const sd=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${e}`:`${y.scrRefToBBBCCCVVV(t.start)}+${e}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},Co=t=>`${sd({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function ad({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:l,onRowSelected:c,id:w}){const[d,p]=a.useState([]),[f,h]=a.useState([{id:ve,desc:!1}]),[u,g]=a.useState({}),N=a.useMemo(()=>t.flatMap(j=>j.data.map(D=>({...D,source:j.source}))),[t]),b=a.useMemo(()=>od({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:l},r),[o,i,l,r]);a.useEffect(()=>{d.includes(Pe)?h([{id:Pe,desc:!1},{id:ve,desc:!1}]):h([{id:ve,desc:!1}])},[d]);const k=Vt.useReactTable({data:N,columns:b,state:{grouping:d,sorting:f,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:Vt.getExpandedRowModel(),getGroupedRowModel:Vt.getGroupedRowModel(),getCoreRowModel:Vt.getCoreRowModel(),getSortedRowModel:Vt.getSortedRowModel(),getRowId:Co,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});a.useEffect(()=>{if(c){const j=k.getSelectedRowModel().rowsById,D=Object.keys(j);if(D.length===1){const L=N.find($=>Co($)===D[0])||void 0;L&&c(L)}}},[u,N,c,k]);const C=s??nd,S=i??ua,E=[{label:"No Grouping",value:[]},{label:`Group by ${C}`,value:[ve]},{label:`Group by ${S}`,value:[Pe]},{label:`Group by ${C} and ${S}`,value:[ve,Pe]},{label:`Group by ${S} and ${C}`,value:[Pe,ve]}],B=j=>{p(JSON.parse(j))},V=(j,D)=>{!j.getIsGrouped()&&!j.getIsSelected()&&j.getToggleSelectedHandler()(D)},A=(j,D)=>j.getIsGrouped()?"":m("banded-row",D%2===0?"even":"odd"),O=(j,D,L)=>{if(!((j==null?void 0:j.length)===0||D.depth<L.column.getGroupedIndex())){if(D.getIsGrouped())switch(D.depth){case 1:return"tw-ps-4";default:return}switch(D.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(Ve,{value:JSON.stringify(d),onValueChange:j=>{B(j)},children:[n.jsx(Ce,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Be,{})}),n.jsx(Ee,{position:"item-aligned",children:n.jsx(Is,{children:E.map(j=>n.jsx(qt,{value:JSON.stringify(j.value),children:j.label},j.label))})})]}),n.jsxs(yn,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(jn,{children:k.getHeaderGroups().map(j=>n.jsx(ie,{children:j.headers.filter(D=>D.column.columnDef.header).map(D=>n.jsx(tn,{colSpan:D.colSpan,className:"top-0 tw-sticky",children:D.isPlaceholder?void 0:n.jsxs("div",{children:[D.column.getCanGroup()?n.jsx(G,{variant:"ghost",title:`Toggle grouping by ${D.column.columnDef.header}`,onClick:D.column.getToggleGroupingHandler(),type:"button",children:D.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Vt.flexRender(D.column.columnDef.header,D.getContext())]})},D.id))},j.id))}),n.jsx(Nn,{children:k.getRowModel().rows.map((j,D)=>{const L=vt();return n.jsx(ie,{"data-state":j.getIsSelected()?"selected":"",className:m(A(j,D)),onClick:$=>V(j,$),children:j.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Pe||!r)))return n.jsx(ke,{className:m($.column.columnDef.id,"tw-p-[1px]",O(d,j,$)),children:$.getIsGrouped()?n.jsxs(G,{variant:"link",onClick:j.getToggleExpandedHandler(),type:"button",children:[j.getIsExpanded()&&n.jsx(_.ChevronDown,{}),!j.getIsExpanded()&&(L==="ltr"?n.jsx(_.ChevronRight,{}):n.jsx(_.ChevronLeft,{}))," ",Vt.flexRender($.column.columnDef.cell,$.getContext())," (",j.subRows.length,")"]}):Vt.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},j.id)})})]})]})}const Qr=(t,e)=>t.filter(r=>{try{return y.getSectionForBook(r)===e}catch{return!1}}),ma=(t,e,r)=>Qr(t,e).every(o=>r.includes(o));function id({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=Qr(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(G,{variant:"outline",size:"sm",onClick:()=>o(t),className:m(ma(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Ti(t,l,c,w,d)})}const Eo=5,dr=6;function ld({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:N}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,k]=a.useState(!1),[C,S]=a.useState(""),E=a.useRef(void 0),B=a.useRef(!1);if(t.length!==st.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const V=a.useMemo(()=>st.Canon.allBookIds.filter((P,H)=>t[H]==="1"&&!st.Canon.isObsolete(st.Canon.bookIdToNumber(P))),[t]),A=a.useMemo(()=>{if(!C.trim()){const U={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return V.forEach(Z=>{const yt=y.getSectionForBook(Z);U[yt].push(Z)}),U}const P=V.filter(U=>_r(U,C,s)),H={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return P.forEach(U=>{const Z=y.getSectionForBook(U);H[Z].push(U)}),H},[V,C,s]),O=a.useCallback((P,H=!1)=>{if(!H||!E.current){r(e.includes(P)?e.filter(Q=>Q!==P):[...e,P]),E.current=P;return}const U=V.findIndex(Q=>Q===E.current),Z=V.findIndex(Q=>Q===P);if(U===-1||Z===-1)return;const[yt,It]=[Math.min(U,Z),Math.max(U,Z)],kt=V.slice(yt,It+1).map(Q=>Q);r(e.includes(P)?e.filter(Q=>!kt.includes(Q)):[...new Set([...e,...kt])])},[e,r,V]),j=P=>{O(P,B.current),B.current=!1},D=(P,H)=>{P.preventDefault(),O(H,P.shiftKey)},L=a.useCallback(P=>{const H=Qr(V,P).map(U=>U);r(ma(V,P,e)?e.filter(U=>!H.includes(U)):[...new Set([...e,...H])])},[e,r,V]),$=()=>{r(V.map(P=>P))},M=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(y.Section).map(P=>n.jsx(id,{section:P,availableBookIds:V,selectedBookIds:e,onToggle:L,localizedStrings:o},P))}),n.jsxs(we,{open:b,onOpenChange:P=>{k(P),P||S("")},children:[n.jsx(he,{asChild:!0,children:n.jsxs(G,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:l,n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(ne,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(ce,{shouldFilter:!1,onKeyDown:P=>{P.key==="Enter"&&(B.current=P.shiftKey)},children:[n.jsx(Ge,{placeholder:c,value:C,onValueChange:S}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:$,children:w}),n.jsx(G,{variant:"ghost",size:"sm",onClick:M,children:d})]}),n.jsxs(de,{children:[n.jsx(rn,{children:p}),Object.values(y.Section).map((P,H)=>{const U=A[P];if(U.length!==0)return n.jsxs(a.Fragment,{children:[n.jsx(Xt,{heading:Bo(P,h,u,g,N),children:U.map(Z=>n.jsx(Go,{bookId:Z,isSelected:e.includes(Z),onSelect:()=>j(Z),onMouseDown:yt=>D(yt,Z),section:y.getSectionForBook(Z),showCheck:!0,localizedBookNames:s,commandValue:Ho(Z,s),className:"tw-flex tw-items-center"},Z))}),H<Object.values(y.Section).length-1&&n.jsx(Nr,{})]},P)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===dr?dr:Eo).map(P=>n.jsx($e,{className:"hover:tw-bg-secondary",variant:"secondary",children:ye(P,s)},P)),e.length>dr&&n.jsx($e,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Eo} ${f}`})]})]})}const cd=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_verse%","%webView_scope_selector_chapter%","%webView_scope_selector_book%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_scope_selector_range%","%webView_scope_selector_select_range%","%webView_scope_selector_range_start%","%webView_scope_selector_range_end%","%webView_scope_selector_ok%","%webView_scope_selector_navigate%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Tt=(t,e)=>t[e]??e,dd=Object.freeze([" ","-"]);function wd({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:l,localizedBookNames:c,id:w,variant:d="radio",rangeStart:p,rangeEnd:f,onRangeStartChange:h,onRangeEndChange:u,currentScrRef:g,onCurrentScrRefChange:N,bookChapterControlLocalizedStrings:b,getEndVerse:k}){const C=Tt(l,"%webView_scope_selector_selected_text%"),S=Tt(l,"%webView_scope_selector_verse%"),E=Tt(l,"%webView_scope_selector_chapter%"),B=Tt(l,"%webView_scope_selector_book%"),V=Tt(l,"%webView_scope_selector_current_verse%"),A=Tt(l,"%webView_scope_selector_current_chapter%"),O=Tt(l,"%webView_scope_selector_current_book%"),j=Tt(l,"%webView_scope_selector_choose_books%"),D=Tt(l,"%webView_scope_selector_scope%"),L=Tt(l,"%webView_scope_selector_select_books%"),$=Tt(l,"%webView_scope_selector_range%"),M=Tt(l,"%webView_scope_selector_select_range%"),P=Tt(l,"%webView_scope_selector_range_start%"),H=Tt(l,"%webView_scope_selector_range_end%"),U=Tt(l,"%webView_scope_selector_ok%"),Z=Tt(l,"%webView_scope_selector_navigate%"),yt=R=>{if(!g)return;const z=g.book.toUpperCase();switch(R){case"verse":return y.formatScrRef(g,"id");case"chapter":return`${z} ${g.chapterNum}`;case"book":return z;default:return}},It=[{value:"selectedText",label:C,id:"scope-selected-text"},{value:"verse",label:S,dropdownLabel:V,scrRefSuffix:yt("verse"),id:"scope-verse"},{value:"chapter",label:E,dropdownLabel:A,scrRefSuffix:yt("chapter"),id:"scope-chapter"},{value:"book",label:B,dropdownLabel:O,scrRefSuffix:yt("book"),id:"scope-book"},{value:"selectedBooks",label:j,id:"scope-selected"},{value:"range",label:$,id:"scope-range"}],kt=(R,z,X=!1)=>n.jsxs(n.Fragment,{children:[R,z&&!X&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[": ",z]})]}),Q=e?It.filter(R=>e.includes(R.value)):It,ut=g??y.defaultScrRef,K=p??ut,et=f??ut,rt=()=>{},at=a.useRef(null),it=a.useRef(null),_t=a.useRef(!1),Et=a.useRef(null),Ot=a.useRef(!1),[xe,I]=a.useState(void 0),At=a.useRef(!1),Ut=a.useRef(!1),Pt=a.useRef(null),F=a.useCallback(R=>{if(R){I("start"),At.current=!1;return}I(z=>z==="start"?void 0:z),At.current&&(At.current=!1,requestAnimationFrame(()=>{var X;const z=(X=at.current)==null?void 0:X.querySelector("button");z==null||z.click()}))},[]),Y=a.useCallback(R=>{if(R){I("end"),Ut.current=!1;return}I(z=>z==="end"?void 0:z)},[]),J=a.useCallback(R=>{h==null||h(R),u==null||u(R),At.current=!0},[h,u]),nt=a.useCallback(R=>{u==null||u(R),Ut.current=!0},[u]),lt=a.useCallback(R=>{r(R),R==="selectedBooks"&&s.length===0&&(g!=null&&g.book)&&i([g.book])},[r,s,g,i]),ct=Q.find(R=>R.value===t),Ct=()=>t==="selectedBooks"&&s.length>0?s.map(R=>R.toUpperCase()).join(", "):t==="range"?y.formatScrRefRange(K,et,{optionOrLocalizedBookName:"id",endRefOptionOrLocalizedBookName:"id",repeatBookName:!0}):ct?kt(ct.label,ct.scrRefSuffix):t,ht=Q.filter(R=>R.value!=="selectedBooks"&&R.value!=="range"),gt=Q.find(R=>R.value==="selectedBooks"),jt=Q.find(R=>R.value==="range"),T=n.jsx(ld,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:l,localizedBookNames:c}),xt=xe==="end",mt=xe==="start",ue="tw-text-muted-foreground",Re=n.jsxs("div",{className:"tw-flex tw-flex-wrap tw-items-end tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(bt,{htmlFor:"scope-range-start",className:m(xt&&ue),children:P}),n.jsx(Mn,{id:"scope-range-start",scrRef:K,handleSubmit:J,localizedBookNames:c,localizedStrings:b,getEndVerse:k,submitKeys:dd,onOpenChange:F,className:m(xt&&ue),modal:!0})]}),n.jsxs("div",{ref:at,className:"tw-grid tw-gap-2",children:[n.jsx(bt,{htmlFor:"scope-range-end",className:m(mt&&ue),children:H}),n.jsx(Mn,{id:"scope-range-end",scrRef:et,handleSubmit:u?nt:rt,localizedBookNames:c,localizedStrings:b,getEndVerse:k,disableReferencesUpTo:K,onOpenChange:Y,onCloseAutoFocus:R=>{var z;Ut.current&&(Ut.current=!1,R.preventDefault(),(z=Pt.current)==null||z.focus())},className:m(mt&&ue),modal:!0,align:"start"})]})]}),[He,on]=a.useState(!1),[sn,Te]=a.useState(void 0),an=a.useRef({}),Ue=a.useCallback(R=>z=>{an.current[R]=z},[]),ln=a.useRef(null);a.useEffect(()=>{if(!He)return;let R=0;const z=requestAnimationFrame(()=>{R=requestAnimationFrame(()=>{var X;(X=an.current[t])==null||X.focus()})});return()=>{cancelAnimationFrame(z),R&&cancelAnimationFrame(R)}},[He,t]);const[Me,Jn]=a.useState(null),[Ye,Qn]=a.useState(null),[v,q]=a.useState(null),W=200,[Lt,be]=a.useState(!1);a.useEffect(()=>{if(!v||typeof ResizeObserver>"u")return;const R=new ResizeObserver(([z])=>{be(z.contentRect.width<W)});return R.observe(v),()=>R.disconnect()},[v]);const De=a.useCallback(R=>{lt(R),on(!1),Te(R)},[lt]),Ie=a.useCallback(R=>{var z;R.preventDefault(),(z=ln.current)==null||z.focus()},[]),St=R=>t===R?n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})}):void 0;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(bt,{children:D}),d==="dropdown"?n.jsxs(le,{open:He,onOpenChange:on,children:[n.jsx(me,{asChild:!0,children:n.jsxs(G,{ref:ln,variant:"outline",role:"combobox",className:"tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:Ct()}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(te,{ref:q,className:"tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",align:"start",children:n.jsxs(Rn,{container:v,children:[ht.map(({value:R,label:z,dropdownLabel:X,scrRefSuffix:Rt,id:oe})=>n.jsx(Qt,{ref:Ue(R),checked:t===R,onCheckedChange:Oe=>{Oe&&lt(R)},children:kt(X??z,Rt,Lt)},oe)),(gt||jt)&&n.jsx(fe,{}),gt&&n.jsxs(Ne,{ref:Ue("selectedBooks"),className:m("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),onSelect:()=>De("selectedBooks"),"data-selected":t==="selectedBooks"?"true":void 0,children:[St("selectedBooks"),`${gt.label}…`]}),jt&&n.jsxs(Ne,{ref:Ue("range"),className:m("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),onSelect:()=>De("range"),"data-selected":t==="range"?"true":void 0,children:[St("range"),`${jt.label}…`]}),N&&n.jsxs(n.Fragment,{children:[n.jsx(fe,{}),n.jsx(Ke,{className:"tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground",children:Z}),n.jsx(Ne,{ref:Et,className:"tw-p-0",onSelect:R=>{var z,X;if(R.preventDefault(),_t.current){_t.current=!1;return}Ot.current||(X=(z=it.current)==null?void 0:z.querySelector("button"))==null||X.click()},children:n.jsx("div",{ref:it,className:"tw-w-full tw-px-1 tw-pb-1",onPointerDownCapture:R=>{const z=R.target instanceof HTMLElement?R.target:void 0;z!=null&&z.closest("button")&&(_t.current=!0,requestAnimationFrame(()=>{_t.current=!1}))},children:n.jsx(Mn,{id:"scope-navigate",scrRef:g??y.defaultScrRef,handleSubmit:N,localizedBookNames:c,localizedStrings:b,getEndVerse:k,triggerVariant:"ghost",onOpenChange:R=>{Ot.current=R},onCloseAutoFocus:R=>{var z;R.preventDefault(),(z=Et.current)==null||z.focus()},modal:!0,className:"tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",triggerContent:n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:y.formatScrRef(g??y.defaultScrRef,"id")}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})})})})]})]})})]}):n.jsx(Hn,{value:t,onValueChange:lt,className:"tw-flex tw-flex-col tw-space-y-1",children:Q.map(({value:R,label:z,scrRefSuffix:X,id:Rt})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(xn,{className:"tw-me-2",value:R,id:Rt}),n.jsx(bt,{htmlFor:Rt,children:kt(z,X)})]},Rt))})]}),d==="radio"&&t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(bt,{children:L}),T]}),d==="radio"&&t==="range"&&Re,d==="dropdown"&&gt&&n.jsx(On,{open:sn==="selectedBooks",onOpenChange:R=>{R||Te(void 0)},children:n.jsx(fn,{ref:Qn,onCloseAutoFocus:Ie,onEscapeKeyDown:R=>{Ye!=null&&Ye.querySelector('[data-state="open"]')&&R.preventDefault()},children:n.jsxs(Rn,{container:Ye,children:[n.jsx(hn,{className:"tw-pe-8",children:n.jsx(gn,{children:j})}),T,n.jsx(An,{children:n.jsx(G,{onClick:()=>Te(void 0),children:U})})]})})}),d==="dropdown"&&jt&&n.jsx(On,{open:sn==="range",onOpenChange:R=>{R||Te(void 0)},children:n.jsx(fn,{ref:Jn,onCloseAutoFocus:Ie,onEscapeKeyDown:R=>{Me!=null&&Me.querySelector('[data-state="open"]')&&R.preventDefault()},children:n.jsxs(Rn,{container:Me,children:[n.jsx(hn,{className:"tw-pe-8",children:n.jsx(gn,{children:M})}),Re,n.jsx(An,{children:n.jsx(G,{ref:Pt,onClick:()=>Te(void 0),children:U})})]})})})]})}const wr={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function pd({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:l}){const c={...wr,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in wr?wr[d]:p]))},w=vt();return n.jsxs(Ve,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(Ce,{size:s,className:m("pr-twp tw-w-auto",i),children:n.jsx(Be,{placeholder:c[y.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(Ee,{id:l,align:w==="rtl"?"end":"start",style:{zIndex:ze},children:t.map(d=>n.jsx(qt,{value:`${d}`,children:c[y.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function ud({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function md({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function fd({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(Fe,{}):""]})}function fa(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function Gn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:m("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const ha=(t,e,r,o)=>r?Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order).flatMap(([i])=>e.filter(c=>c.group===i).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:"command"in c?n.jsxs(Ne,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(Gn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(Gn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Ts,{children:[n.jsx(Vr,{children:c.label}),n.jsx(Rs,{children:n.jsx(Br,{children:ha(t,e,fa(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(Dt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function Kn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:l="ghost",id:c}){return n.jsxs(le,{variant:i,children:[n.jsx(me,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(G,{variant:l,size:"icon",children:o??n.jsx(_.MenuIcon,{})})}),n.jsx(te,{align:"start",style:{zIndex:ze},children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(a.Fragment,{children:[n.jsx(Fr,{children:n.jsx(Mt,{children:ha(e.groups,e.items,w,t)})}),d<p.length-1&&n.jsx(fe,{})]},w))})]})}const ga=a.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function hd({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(ga,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(Kn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(_.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(Kn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(_.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function gd({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(ga,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(Kn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const to=a.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(Kt.Root,{orientation:"vertical",ref:r,className:m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});to.displayName=Kt.List.displayName;const eo=a.forwardRef(({className:t,...e},r)=>n.jsx(Kt.List,{ref:r,className:m("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));eo.displayName=Kt.List.displayName;const xa=a.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Trigger,{ref:r,...e,className:m("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),no=a.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Content,{ref:r,className:m("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));no.displayName=Kt.Content.displayName;function xd({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(Zn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(to,{children:[n.jsx(eo,{children:t.map(c=>n.jsx(xa,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(no,{value:c.value,children:c.content},c.key))]})]})}function bd({...t}){return n.jsx(wt.Menu,{...t})}function vd({...t}){return n.jsx(wt.Sub,{"data-slot":"menubar-sub",...t})}const ba=a.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=a.useMemo(()=>({variant:e}),[e]);return n.jsx($r.Provider,{value:s,children:n.jsx(wt.Root,{ref:o,className:m("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});ba.displayName=wt.Root.displayName;const va=a.forwardRef(({className:t,...e},r)=>{const o=re();return n.jsx(wt.Trigger,{ref:r,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ge({variant:o.variant,className:t})),...e})});va.displayName=wt.Trigger.displayName;const ya=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=re();return n.jsxs(wt.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",ge({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});ya.displayName=wt.SubTrigger.displayName;const ja=a.forwardRef(({className:t,...e},r)=>{const o=re();return n.jsx(wt.SubContent,{ref:r,className:m("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});ja.displayName=wt.SubContent.displayName;const Na=a.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const l=re();return n.jsx(wt.Portal,{children:n.jsx(wt.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:m("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Na.displayName=wt.Content.displayName;const ka=a.forwardRef(({className:t,inset:e,...r},o)=>{const s=re();return n.jsx(wt.Item,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",ge({variant:s.variant,className:t}),t),...r})});ka.displayName=wt.Item.displayName;const yd=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=re();return n.jsxs(wt.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ge({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(wt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});yd.displayName=wt.CheckboxItem.displayName;const jd=a.forwardRef(({className:t,children:e,...r},o)=>{const s=re();return n.jsxs(wt.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ge({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(wt.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});jd.displayName=wt.RadioItem.displayName;const Nd=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(wt.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Nd.displayName=wt.Label.displayName;const _a=a.forwardRef(({className:t,...e},r)=>n.jsx(wt.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));_a.displayName=wt.Separator.displayName;const dn=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Ca=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order);return s.flatMap(([i],l)=>{const c=e.filter(d=>d.group===i).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(Bt,{children:[n.jsx(zt,{asChild:!0,children:"command"in d?n.jsxs(ka,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(Gn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(Gn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(vd,{children:[n.jsx(ya,{children:d.label}),n.jsx(ja,{children:Ca(t,e,fa(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(Dt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&l<s.length-1&&w.push(n.jsx(_a,{},`separator-${i}`)),w})};function kd({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=a.useRef(void 0),i=a.useRef(void 0),l=a.useRef(void 0),c=a.useRef(void 0),w=a.useRef(void 0),d=p=>{switch(p){case"platform.app":return i;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return w;default:return}};if(vi.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,N,b,k;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":dn(i,[h]);break;case"alt+p":(g=i.current)==null||g.focus(),dn(i,[h,u]);break;case"alt+l":(N=l.current)==null||N.focus(),dn(l,[h,u]);break;case"alt+n":(b=c.current)==null||b.focus(),dn(c,[h,u]);break;case"alt+h":(k=w.current)==null||k.focus(),dn(w,[h,u]);break}}),a.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const N=g.target.getAttribute("data-state");r(N==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(ba,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>n.jsxs(bd,{children:[n.jsx(va,{ref:d(p),children:typeof f=="object"&&"label"in f&&f.label}),n.jsx(Na,{style:{zIndex:ze},children:n.jsx(Mt,{children:Ca(t.groups,t.items,p,e)})})]},p))})}function _d(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Cd({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=a.useRef(void 0);return n.jsx("div",{className:m("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(kd,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Ed=(t,e)=>t[e]??e;function Sd({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:l,className:c,id:w}){const d=Ed(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=a.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(N=>N!==g)]),i&&r.find(N=>N===g)&&i([...r.filter(N=>N!==g)]),f(!1)},u=(g,N)=>{var k,C,S,E,B,V;const b=N!==g?((C=(k=t[g])==null?void 0:k.uiNames)==null?void 0:C[N])??((E=(S=t[g])==null?void 0:S.uiNames)==null?void 0:E.en):void 0;return b?`${(B=t[g])==null?void 0:B.autonym} (${b})`:(V=t[g])==null?void 0:V.autonym};return n.jsxs("div",{id:w,className:m("pr-twp tw-max-w-sm",c),children:[n.jsxs(Ve,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>f(g),children:[n.jsx(Ce,{children:n.jsx(Be,{})}),n.jsx(Ee,{style:{zIndex:ze},children:Object.keys(t).map(g=>n.jsx(qt,{value:g,children:u(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(bt,{className:"tw-font-normal tw-text-muted-foreground",children:y.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,e)).join(", "):t.en.autonym})})})]})}function Rd({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(bt,{children:e(t)}):r?n.jsx(bt,{children:r(t)}):n.jsx(bt,{children:t})}function Td({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(Wn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(Rd,{item:c,createLabel:i,createComplexLabel:l})]},c))})}function Md({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:l,selectedButtons:c,hoverButtons:w,dropdownContent:d,additionalContent:p,accentColor:f,showDropdownOnHover:h=!1}){const u=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":e,className:m("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&h&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(le,{children:[n.jsx(me,{className:m(f&&"tw-me-1"),asChild:!0,children:n.jsx(G,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(te,{align:"end",children:d})]})}),e&&d&&n.jsxs(le,{children:[n.jsx(me,{className:m(f&&"tw-me-1"),asChild:!0,children:n.jsx(G,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(te,{align:"end",children:d})]})]}),p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),f&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${f}`})]},t)}const Ea=a.forwardRef(({className:t,...e},r)=>n.jsx(_.LoaderCircle,{size:35,className:m("tw-animate-spin",t),...e,ref:r}));Ea.displayName="Spinner";function Dd({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:l,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:f,onFocus:h,onBlur:u}){return n.jsxs("div",{className:m("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(bt,{htmlFor:t,className:m({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(qe,{id:t,disabled:e,placeholder:l,required:c,className:m(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:f,onFocus:h,onBlur:u}),n.jsx("p",{className:m({"tw-hidden":!s}),children:s})]})}const Id=Se.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Sa=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:m("pr-twp",Id({variant:e}),t),...r}));Sa.displayName="Alert";const Ra=a.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Ra.displayName="AlertTitle";const Ta=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Ta.displayName="AlertDescription";const Od=pt.Root,Ad=pt.Trigger,Pd=pt.Group,Ld=pt.Portal,$d=pt.Sub,Fd=pt.RadioGroup,Ma=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(pt.SubTrigger,{ref:s,className:m("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ma.displayName=pt.SubTrigger.displayName;const Da=a.forwardRef(({className:t,...e},r)=>n.jsx(pt.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Da.displayName=pt.SubContent.displayName;const Ia=a.forwardRef(({className:t,...e},r)=>n.jsx(pt.Portal,{children:n.jsx(pt.Content,{ref:r,className:m("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Ia.displayName=pt.Content.displayName;const Oa=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(pt.Item,{ref:o,className:m("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));Oa.displayName=pt.Item.displayName;const Aa=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(pt.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(pt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Aa.displayName=pt.CheckboxItem.displayName;const Pa=a.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(pt.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(pt.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Pa.displayName=pt.RadioItem.displayName;const La=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(pt.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));La.displayName=pt.Label.displayName;const $a=a.forwardRef(({className:t,...e},r)=>n.jsx(pt.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));$a.displayName=pt.Separator.displayName;function Fa({className:t,...e}){return n.jsx("span",{className:m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Fa.displayName="ContextMenuShortcut";const Va=a.createContext({direction:"bottom"});function Ba({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=a.useMemo(()=>({direction:e}),[e]);return n.jsx(Va.Provider,{value:o,children:n.jsx(ee.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}Ba.displayName="Drawer";const Vd=ee.Drawer.Trigger,za=ee.Drawer.Portal,Bd=ee.Drawer.Close,ro=a.forwardRef(({className:t,...e},r)=>n.jsx(ee.Drawer.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));ro.displayName=ee.Drawer.Overlay.displayName;const Ga=a.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:i="bottom"}=a.useContext(Va),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(za,{children:[n.jsx(ro,{}),n.jsxs(ee.Drawer.Content,{ref:s,className:m("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",l[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:c[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:c[i]})]})]})});Ga.displayName="DrawerContent";function Ka({className:t,...e}){return n.jsx("div",{className:m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Ka.displayName="DrawerHeader";function qa({className:t,...e}){return n.jsx("div",{className:m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}qa.displayName="DrawerFooter";const Ha=a.forwardRef(({className:t,...e},r)=>n.jsx(ee.Drawer.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Ha.displayName=ee.Drawer.Title.displayName;const Ua=a.forwardRef(({className:t,...e},r)=>n.jsx(ee.Drawer.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));Ua.displayName=ee.Drawer.Description.displayName;const Ya=a.forwardRef(({className:t,value:e,...r},o)=>n.jsx(fr.Root,{ref:o,className:m("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(fr.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Ya.displayName=fr.Root.displayName;function zd({className:t,...e}){return n.jsx(vr.PanelGroup,{className:m("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Gd=vr.Panel;function Kd({withHandle:t,className:e,...r}){return n.jsx(vr.PanelResizeHandle,{className:m("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(_.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function qd({...t}){return n.jsx(Mo.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Xa=a.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsxs(wn.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(wn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(wn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(wn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Xa.displayName=wn.Root.displayName;const Wa=a.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(hr.Root,{className:m("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(hr.Thumb,{className:m("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Wa.displayName=hr.Root.displayName;const Hd=Kt.Root,Za=a.forwardRef(({className:t,...e},r)=>{const o=vt();return n.jsx(Kt.List,{ref:r,className:m("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});Za.displayName=Kt.List.displayName;const Ja=a.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Trigger,{ref:r,className:m("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));Ja.displayName=Kt.Trigger.displayName;const Qa=a.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Content,{ref:r,className:m("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Qa.displayName=Kt.Content.displayName;const ti=a.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:m("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ti.displayName="Textarea";const Ud=(t,e)=>{a.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Yd(t){return{preserveValue:!0,...t}}const ei=(t,e,r={})=>{const o=a.useRef(e);o.current=e;const s=a.useRef(r);s.current=Yd(s.current);const[i,l]=a.useState(()=>o.current),[c,w]=a.useState(!0);return a.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const p=await t();d&&(l(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[i,c]},pr=()=>!1,Xd=(t,e)=>{const[r]=ei(a.useCallback(async()=>{if(!t)return pr;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),pr,{preserveValue:!1});a.useEffect(()=>()=>{r!==pr&&r()},[r])};function Wd(t){a.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Mo.toast});exports.Alert=Sa;exports.AlertDescription=Ta;exports.AlertTitle=Ra;exports.Avatar=Pr;exports.AvatarFallback=Lr;exports.AvatarImage=Ss;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Li;exports.BOOK_SELECTOR_STRING_KEYS=Vi;exports.Badge=$e;exports.BookChapterControl=Mn;exports.BookSelector=Bi;exports.Button=G;exports.COMMENT_EDITOR_STRING_KEYS=tc;exports.COMMENT_LIST_STRING_KEYS=ec;exports.Card=Or;exports.CardContent=Ar;exports.CardDescription=Cs;exports.CardFooter=Es;exports.CardHeader=ks;exports.CardTitle=_s;exports.ChapterRangeSelector=Yo;exports.Checkbox=Wn;exports.Checklist=Td;exports.ComboBox=Pn;exports.Command=ce;exports.CommandEmpty=rn;exports.CommandGroup=Xt;exports.CommandInput=Ge;exports.CommandItem=Wt;exports.CommandList=de;exports.CommentEditor=Ql;exports.CommentList=sc;exports.ContextMenu=Od;exports.ContextMenuCheckboxItem=Aa;exports.ContextMenuContent=Ia;exports.ContextMenuGroup=Pd;exports.ContextMenuItem=Oa;exports.ContextMenuLabel=La;exports.ContextMenuPortal=Ld;exports.ContextMenuRadioGroup=Fd;exports.ContextMenuRadioItem=Pa;exports.ContextMenuSeparator=$a;exports.ContextMenuShortcut=Fa;exports.ContextMenuSub=$d;exports.ContextMenuSubContent=Da;exports.ContextMenuSubTrigger=Ma;exports.ContextMenuTrigger=Ad;exports.DataTable=Fs;exports.Dialog=On;exports.DialogClose=Ri;exports.DialogContent=fn;exports.DialogDescription=Fo;exports.DialogFooter=An;exports.DialogHeader=hn;exports.DialogOverlay=jr;exports.DialogPortal=$o;exports.DialogTitle=gn;exports.DialogTrigger=Si;exports.Drawer=Ba;exports.DrawerClose=Bd;exports.DrawerContent=Ga;exports.DrawerDescription=Ua;exports.DrawerFooter=qa;exports.DrawerHeader=Ka;exports.DrawerOverlay=ro;exports.DrawerPortal=za;exports.DrawerTitle=Ha;exports.DrawerTrigger=Vd;exports.DropdownMenu=le;exports.DropdownMenuCheckboxItem=Qt;exports.DropdownMenuContent=te;exports.DropdownMenuGroup=Fr;exports.DropdownMenuItem=Ne;exports.DropdownMenuItemType=zs;exports.DropdownMenuLabel=Ke;exports.DropdownMenuPortal=Rs;exports.DropdownMenuRadioGroup=Ms;exports.DropdownMenuRadioItem=zr;exports.DropdownMenuSeparator=fe;exports.DropdownMenuShortcut=Ds;exports.DropdownMenuSub=Ts;exports.DropdownMenuSubContent=Br;exports.DropdownMenuSubTrigger=Vr;exports.DropdownMenuTrigger=me;exports.ERROR_DUMP_STRING_KEYS=Vs;exports.ERROR_POPOVER_STRING_KEYS=uc;exports.EditorKeyboardShortcuts=Hs;exports.ErrorDump=Bs;exports.ErrorPopover=mc;exports.FOOTNOTE_EDITOR_STRING_KEYS=Mc;exports.Filter=bc;exports.FilterDropdown=fc;exports.Footer=xc;exports.FootnoteEditor=Tc;exports.FootnoteItem=Ws;exports.FootnoteList=Oc;exports.INVENTORY_STRING_KEYS=qc;exports.Input=qe;exports.Inventory=Yc;exports.Label=bt;exports.MARKER_MENU_STRING_KEYS=Us;exports.MarkdownRenderer=pc;exports.MarkerMenu=Ys;exports.MoreInfo=hc;exports.MultiSelectComboBox=Gs;exports.NavigationContentSearch=xd;exports.Popover=we;exports.PopoverAnchor=Ko;exports.PopoverContent=ne;exports.PopoverPortalContainerProvider=Rn;exports.PopoverTrigger=he;exports.Progress=Ya;exports.RadioGroup=Hn;exports.RadioGroupItem=xn;exports.RecentSearches=Uo;exports.ResizableHandle=Kd;exports.ResizablePanel=Gd;exports.ResizablePanelGroup=zd;exports.ResultsCard=Md;exports.SCOPE_SELECTOR_STRING_KEYS=cd;exports.ScopeSelector=wd;exports.ScriptureResultsViewer=ad;exports.ScrollGroupSelector=pd;exports.SearchBar=Zn;exports.Select=Ve;exports.SelectContent=Ee;exports.SelectGroup=Is;exports.SelectItem=qt;exports.SelectLabel=As;exports.SelectScrollDownButton=Kr;exports.SelectScrollUpButton=Gr;exports.SelectSeparator=Ps;exports.SelectTrigger=Ce;exports.SelectValue=Be;exports.Separator=Fe;exports.SettingsList=ud;exports.SettingsListHeader=fd;exports.SettingsListItem=md;exports.SettingsSidebar=pa;exports.SettingsSidebarContentSearch=Jc;exports.Sidebar=Ur;exports.SidebarContent=Xr;exports.SidebarFooter=ra;exports.SidebarGroup=Vn;exports.SidebarGroupAction=sa;exports.SidebarGroupContent=zn;exports.SidebarGroupLabel=Bn;exports.SidebarHeader=na;exports.SidebarInput=ea;exports.SidebarInset=Yr;exports.SidebarMenu=Wr;exports.SidebarMenuAction=aa;exports.SidebarMenuBadge=ia;exports.SidebarMenuButton=Jr;exports.SidebarMenuItem=Zr;exports.SidebarMenuSkeleton=la;exports.SidebarMenuSub=ca;exports.SidebarMenuSubButton=wa;exports.SidebarMenuSubItem=da;exports.SidebarProvider=Hr;exports.SidebarRail=ta;exports.SidebarSeparator=oa;exports.SidebarTrigger=Qs;exports.Skeleton=Fn;exports.Slider=Xa;exports.Sonner=qd;exports.Spinner=Ea;exports.Switch=Wa;exports.TabDropdownMenu=Kn;exports.TabFloatingMenu=gd;exports.TabToolbar=hd;exports.Table=yn;exports.TableBody=Nn;exports.TableCaption=$s;exports.TableCell=ke;exports.TableFooter=Ls;exports.TableHead=tn;exports.TableHeader=jn;exports.TableRow=ie;exports.Tabs=Hd;exports.TabsContent=Qa;exports.TabsList=Za;exports.TabsTrigger=Ja;exports.TextField=Dd;exports.Textarea=ti;exports.ToggleGroup=Xn;exports.ToggleGroupItem=Ze;exports.Toolbar=Cd;exports.Tooltip=Bt;exports.TooltipContent=Dt;exports.TooltipProvider=Mt;exports.TooltipTrigger=zt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=Ks;exports.UiLanguageSelector=Sd;exports.UndoRedoButtons=qs;exports.VerticalTabs=to;exports.VerticalTabsContent=no;exports.VerticalTabsList=eo;exports.VerticalTabsTrigger=xa;exports.Z_INDEX_ABOVE_DOCK=ze;exports.Z_INDEX_FOOTNOTE_EDITOR=yr;exports.Z_INDEX_MODAL=Lo;exports.Z_INDEX_MODAL_BACKDROP=Po;exports.Z_INDEX_OVERLAY=Ao;exports.badgeVariants=Ns;exports.buttonVariants=Cr;exports.cn=m;exports.getBookIdFromUSFM=Kc;exports.getInventoryHeader=kn;exports.getLinesFromUSFM=zc;exports.getNumberFromUSFM=Gc;exports.getStatusForItem=Zs;exports.getToolbarOSReservedSpaceClassName=_d;exports.inventoryCountColumn=Vc;exports.inventoryItemColumn=$c;exports.inventoryStatusColumn=Bc;exports.selectTriggerVariants=Os;exports.useEvent=Ud;exports.useEventAsync=Xd;exports.useListbox=js;exports.usePromise=ei;exports.useRecentSearches=Mi;exports.useSidebar=_n;exports.useStylesheet=Wd;function Zd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Zd(`*, ::before, ::after {
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
