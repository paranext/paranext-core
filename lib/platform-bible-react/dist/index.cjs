"use strict";var Di=Object.defineProperty;var Mi=(t,e,r)=>e in t?Di(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Gt=(t,e,r)=>Mi(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),i=require("react"),Kt=require("cmdk"),E=require("lucide-react"),Oi=require("clsx"),Ai=require("tailwind-merge"),Pi=require("@radix-ui/react-dialog"),at=require("@sillsdev/scripture"),_=require("platform-bible-utils"),an=require("@radix-ui/react-slot"),Pe=require("class-variance-authority"),Li=require("@radix-ui/react-popover"),$i=require("@radix-ui/react-label"),Fi=require("@radix-ui/react-radio-group"),x=require("lexical"),Zo=require("@radix-ui/react-tooltip"),Rr=require("@lexical/rich-text"),_o=require("react-dom"),Gi=require("@lexical/table"),Vi=require("@radix-ui/react-toggle-group"),Bi=require("@radix-ui/react-toggle"),Jo=require("@lexical/headless"),zi=require("@radix-ui/react-separator"),Ki=require("@radix-ui/react-avatar"),Qo=require("@radix-ui/react-dropdown-menu"),Bt=require("@tanstack/react-table"),qi=require("@radix-ui/react-select"),Hi=require("markdown-to-jsx"),Jt=require("@eten-tech-foundation/platform-editor"),Ui=require("@radix-ui/react-checkbox"),Yi=require("@radix-ui/react-tabs"),Xi=require("@radix-ui/react-menubar"),Wi=require("react-hotkeys-hook"),Zi=require("@radix-ui/react-context-menu"),le=require("vaul"),Ji=require("@radix-ui/react-progress"),Qi=require("react-resizable-panels"),ts=require("sonner"),tl=require("@radix-ui/react-slider"),el=require("@radix-ui/react-switch");function jt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Wt=jt(Pi),nn=jt(Li),es=jt($i),yn=jt(Fi),Ke=jt(Zo),ir=jt(Vi),ns=jt(Bi),rs=jt(zi),ln=jt(Ki),lt=jt(Qo),gt=jt(qi),Tr=jt(Ui),qt=jt(Yi),ct=jt(Xi),dt=jt(Zi),Ir=jt(Ji),Pr=jt(Qi),bn=jt(tl),Dr=jt(el),nl=Ai.extendTailwindMerge({prefix:"tw-"});function h(...t){return nl(Oi.clsx(t))}const cn=250,Lr=300,lr=400,os=450,ss=500,as=550,rl="layoutDirection";function bt(){const t=localStorage.getItem(rl);return t==="rtl"?t:"ltr"}const Un=Wt.Root,ol=Wt.Trigger,is=Wt.Portal,sl=Wt.Close,$r=i.forwardRef(({className:t,style:e,...r},o)=>n.jsx(Wt.Overlay,{ref:o,className:h("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:os,...e},...r}));$r.displayName=Wt.Overlay.displayName;const jn=i.forwardRef(({className:t,children:e,overlayClassName:r,style:o,...s},a)=>{const l=bt();return n.jsxs(is,{children:[n.jsx($r,{className:r}),n.jsxs(Wt.Content,{ref:a,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:ss,...o},...s,dir:l,children:[e,n.jsxs(Wt.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":l==="ltr"},{"tw-left-4":l==="rtl"}),children:[n.jsx(E.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});jn.displayName=Wt.Content.displayName;function Nn({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Nn.displayName="DialogHeader";function Yn({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}Yn.displayName="DialogFooter";const kn=i.forwardRef(({className:t,...e},r)=>n.jsx(Wt.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));kn.displayName=Wt.Title.displayName;const ls=i.forwardRef(({className:t,...e},r)=>n.jsx(Wt.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));ls.displayName=Wt.Description.displayName;const ce=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Command,{ref:r,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));ce.displayName=Kt.Command.displayName;const Le=i.forwardRef(({className:t,onKeyDown:e,...r},o)=>{const s=bt(),a=i.useCallback(l=>{if(e==null||e(l),l.defaultPrevented||l.key!==" "||l.currentTarget.value!=="")return;const c=l.currentTarget.closest("[cmdk-root]"),w=c==null?void 0:c.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');w&&(l.preventDefault(),l.stopPropagation(),w.click())},[e]);return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:s,children:[n.jsx(E.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(Kt.Command.Input,{ref:o,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),onKeyDown:a,...r})]})});Le.displayName=Kt.Command.Input.displayName;const de=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Command.List,{ref:r,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));de.displayName=Kt.Command.List.displayName;const Ye=i.forwardRef((t,e)=>n.jsx(Kt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ye.displayName=Kt.Command.Empty.displayName;const te=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Command.Group,{ref:r,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));te.displayName=Kt.Command.Group.displayName;const cr=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Command.Separator,{ref:r,className:h("tw--mx-1 tw-h-px tw-bg-border",t),...e}));cr.displayName=Kt.Command.Separator.displayName;const ne=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Command.Item,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));ne.displayName=Kt.Command.Item.displayName;function cs({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}cs.displayName="CommandShortcut";const ds=(t,e,r,o,s)=>{switch(t){case _.Section.OT:return e??"Old Testament";case _.Section.NT:return r??"New Testament";case _.Section.DC:return o??"Deuterocanon";case _.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},al=(t,e,r,o,s)=>{switch(t){case _.Section.OT:return e??"OT";case _.Section.NT:return r??"NT";case _.Section.DC:return o??"DC";case _.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function De(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??at.Canon.bookIdToEnglishName(t)}function Fr(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const ws=at.Canon.allBookIds.filter(t=>!at.Canon.isObsolete(at.Canon.bookIdToNumber(t))),oe=Object.fromEntries(ws.map(t=>[t,at.Canon.bookIdToEnglishName(t)]));function Gr(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=at.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(_.includes(s.toLowerCase(),o)||_.includes(t.toLowerCase(),o)||(a?_.includes(a.localizedName.toLowerCase(),o)||_.includes(a.localizedId.toLowerCase(),o):!1))}const us=i.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:l=!1,localizedBookNames:c,commandValue:w,disabled:d=!1},u)=>{const m=i.useRef(!1),f=()=>{d||(m.current||r==null||r(t),setTimeout(()=>{m.current=!1},100))},p=v=>{if(d){v.preventDefault();return}m.current=!0,o?o(v):r==null||r(t)},g=i.useMemo(()=>De(t,c),[t,c]),y=i.useMemo(()=>Fr(t,c),[t,c]);return n.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===_.Section.OT,"tw-border-s-purple-200":s===_.Section.NT,"tw-border-s-indigo-200":s===_.Section.DC,"tw-border-s-amber-200":s===_.Section.Extra}),children:n.jsxs(ne,{ref:u,value:w||`${t} ${at.Canon.bookIdToEnglishName(t)}`,onSelect:f,onMouseDown:p,role:"option","aria-selected":e,"aria-disabled":d||void 0,"aria-label":`${at.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,disabled:d,className:h(a,d&&"tw-cursor-not-allowed tw-opacity-50"),children:[l&&n.jsx(E.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:g}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:y})]})})}),Vr=Pe.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=i.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const l=o?an.Slot:"button";return n.jsx(l,{className:h(Vr({variant:e,size:r,className:t})),ref:a,...s})});B.displayName="Button";const we=nn.Root,je=nn.Trigger,ps=nn.Anchor,ms=i.createContext(null);function Vn({container:t,children:e}){return n.jsx(ms.Provider,{value:t,children:e})}const re=i.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},a)=>{const l=bt(),c=i.useContext(ms);return n.jsx(nn.Portal,{container:c??void 0,children:n.jsx(nn.Content,{ref:a,align:e,sideOffset:r,className:h("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:cn,...o},...s,dir:l})})});re.displayName=nn.Content.displayName;function fs(t,e,r){return`${t} ${oe[t]}${e?` ${Fr(t,e)} ${De(t,e)}`:""}`}function hs({recentSearches:t,onSearchItemSelect:e,renderItem:r=u=>String(u),getItemKey:o=u=>String(u),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:l,classNameForItems:c,buttonClassName:w="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:d="ghost"}){const[u,m]=i.useState(!1);if(t.length===0)return;const f=p=>{e(p),m(!1)};return n.jsxs(we,{open:u,onOpenChange:m,children:[n.jsx(je,{asChild:!0,children:n.jsx(B,{variant:d,size:"icon",className:w,"aria-label":s,children:n.jsx(E.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(re,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(ce,{children:n.jsx(de,{children:n.jsx(te,{heading:a,children:t.map(p=>n.jsxs(ne,{onSelect:()=>f(p),className:h("tw-flex tw-items-center",c),children:[n.jsx(E.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function il(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),l=[s,...a.slice(0,o-1)];e(l)}}const Bn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ll=[Bn.BOOK_ONLY,Bn.BOOK_CHAPTER,Bn.BOOK_CHAPTER_VERSE];function cl(t){return Bn.BOOK_CHAPTER_VERSE.test(t.trim())}function Co(t,e){return at.Canon.bookIdToNumber(t)<at.Canon.bookIdToNumber(e.book)}function dl(t,e,r){const o=at.Canon.bookIdToNumber(t)-at.Canon.bookIdToNumber(r.book);return o<0?!0:o>0?!1:e<r.chapterNum}function fr(t,e,r,o){const s=at.Canon.bookIdToNumber(t)-at.Canon.bookIdToNumber(o.book);return s<0?!0:s>0?!1:e<o.chapterNum?!0:e>o.chapterNum?!1:r<o.verseNum}function So(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function ge(t){return _.getChaptersForBook(at.Canon.bookIdToNumber(t))}function wl(t,e,r){if(!t.trim()||e.length===0)return;const o=ll.reduce((s,a)=>{if(s)return s;const l=a.exec(t.trim());if(l){const[c,w=void 0,d=void 0]=l.slice(1);let u;const m=e.filter(f=>Gr(f,c,r));if(m.length===1&&([u]=m),!u&&w){if(at.Canon.isBookIdValid(c)){const f=c.toUpperCase();e.includes(f)&&(u=f)}if(!u&&r){const f=Array.from(r.entries()).find(([,p])=>p.localizedId.toLowerCase()===c.toLowerCase());f&&e.includes(f[0])&&([u]=f)}}if(!u&&w){const p=(g=>Object.keys(oe).find(y=>oe[y].toLowerCase()===g.toLowerCase()))(c);if(p&&e.includes(p)&&(u=p),!u&&r){const g=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([u]=g)}}if(u){let f=w?parseInt(w,10):void 0;f&&f>ge(u)&&(f=Math.max(ge(u),1));const p=d?parseInt(d,10):void 0;return{book:u,chapterNum:f,verseNum:p}}}},void 0);if(o)return o}function ul(t,e,r,o){const s=i.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],u=Math.max(ge(d),1);o({book:d,chapterNum:u,verseNum:1})}}},[t,e,o]),a=i.useCallback(()=>{const w=ge(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const u=e[d+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),l=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return i.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?E.ChevronsLeft:E.ChevronsRight},{onClick:l,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?E.ChevronLeft:E.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?E.ChevronRight:E.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===ge(t.book)||ge(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?E.ChevronsRight:E.ChevronsLeft}],[t,e,r,s,l,c,a])}function gs({count:t,valueBuilder:e,onSelect:r,itemRef:o,isDisabled:s,isDimmed:a,isSelected:l,className:c}){if(!(t<=0))return n.jsx(te,{children:n.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",c),children:Array.from({length:t},(w,d)=>d+1).map(w=>{const d=(s==null?void 0:s(w))??!1;return n.jsx(ne,{value:e(w),onSelect:()=>{d||r(w)},ref:o(w),disabled:d,"aria-disabled":d||void 0,className:h("tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":(l==null?void 0:l(w))??!1},{"tw-bg-muted/50 tw-text-muted-foreground/50":((a==null?void 0:a(w))??!1)&&!d},d&&"tw-cursor-not-allowed tw-opacity-40"),children:w},w)})})})}function Eo({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,isChapterDisabled:a,className:l}){if(t)return n.jsx(gs,{count:ge(t),valueBuilder:c=>`${t} ${oe[t]||""} ${c}`,onSelect:r,itemRef:o,isDisabled:a,isDimmed:s,isSelected:c=>t===e.book&&c===e.chapterNum,className:l})}function Ro({bookId:t,chapterNum:e,endVerse:r,scrRef:o,onVerseSelect:s,setVerseRef:a,isVerseDimmed:l,isVerseDisabled:c,className:w}){if(!(!t||r<=0))return n.jsx(gs,{count:r,valueBuilder:d=>`${t} ${oe[t]||""} ${e}:${d}`,onSelect:s,itemRef:a,isDisabled:c,isDimmed:l,isSelected:d=>t===o.book&&e===o.chapterNum&&d===o.verseNum,className:w})}function zn({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:l,onAddRecentSearch:c,id:w,getEndVerse:d,disableReferencesUpTo:u,submitKeys:m,triggerContent:f,triggerVariant:p="outline",onOpenChange:g,onCloseAutoFocus:y,modal:v=!1,align:j="center"}){const I=bt(),[D,T]=i.useState(!1),[G,N]=i.useState(""),[R,C]=i.useState(""),[b,S]=i.useState("books"),[P,F]=i.useState(void 0),[O,L]=i.useState(void 0),[K,H]=i.useState(void 0),[W,Nt]=i.useState(!1),Pt=i.useRef(null),Ot=i.useRef(!1),nt=i.useRef(void 0),wt=i.useRef(void 0),z=i.useRef(void 0),J=i.useRef(void 0),rt=i.useRef({}),Q=i.useRef({}),et=i.useCallback(k=>{e(k),c&&c(k)},[e,c]),Lt=i.useMemo(()=>o?o():ws,[o]),Et=i.useMemo(()=>({[_.Section.OT]:Lt.filter(q=>at.Canon.isBookOT(q)),[_.Section.NT]:Lt.filter(q=>at.Canon.isBookNT(q)),[_.Section.DC]:Lt.filter(q=>at.Canon.isBookDC(q)),[_.Section.Extra]:Lt.filter(q=>at.Canon.extraBooks().includes(q))}),[Lt]),$t=i.useMemo(()=>Object.values(Et).flat(),[Et]),pe=i.useMemo(()=>{if(!R.trim())return Et;const k={[_.Section.OT]:[],[_.Section.NT]:[],[_.Section.DC]:[],[_.Section.Extra]:[]};return[_.Section.OT,_.Section.NT,_.Section.DC,_.Section.Extra].forEach(X=>{k[X]=Et[X].filter(_t=>Gr(_t,R,s))}),k},[Et,R,s]),A=i.useMemo(()=>wl(R,$t,s),[R,$t,s]),Ht=i.useRef(!1);i.useEffect(()=>{if(!Ht.current){Ht.current=!0;return}g==null||g(D)},[D,g]);const me=i.useCallback(()=>{if(A){const k=A.chapterNum??1,q=A.verseNum??1;if(u&&fr(A.book,k,q,u))return;et({book:A.book,chapterNum:k,verseNum:q}),T(!1),C(""),N("")}},[et,A,u]),Rt=i.useCallback(k=>{const q=O??(A==null?void 0:A.book),X=K??(A==null?void 0:A.chapterNum);!q||!X||(et({book:q,chapterNum:X,verseNum:k}),T(!1))},[et,O,K,A]),V=i.useCallback(k=>{if(u&&Co(k,u))return;if(ge(k)<=1){et({book:k,chapterNum:1,verseNum:1}),T(!1),C("");return}F(k),S("chapters")},[et,u]),U=i.useCallback(k=>{const q=b==="chapters"?P:A==null?void 0:A.book;if(q){if(d&&d(q,k)>1){L(q),H(k),S("verses"),N("");return}et({book:q,chapterNum:k,verseNum:1}),T(!1)}},[et,b,P,A,d]),Z=i.useCallback(k=>{et(k),T(!1),C("")},[et]),ot=ul(t,$t,I,e),mt=i.useCallback(()=>{S("books"),F(void 0),L(void 0),H(void 0),setTimeout(()=>{wt.current&&wt.current.focus()},0)},[]),ft=i.useCallback(()=>{const k=O;L(void 0),H(void 0),k?(F(k),S("chapters"),N("")):mt()},[O,mt]),kt=i.useCallback(k=>{T(k),k&&(S("books"),F(void 0),L(void 0),H(void 0),C(""))},[]),{otLong:ut,ntLong:vt,dcLong:At,extraLong:M}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},ht=i.useCallback(k=>ds(k,ut,vt,At,M),[ut,vt,At,M]),it=i.useCallback(k=>A?!!A.chapterNum&&!k.toString().includes(A.chapterNum.toString()):!1,[A]),Ee=i.useMemo(()=>_.formatScrRef(t,s?De(t.book,s):"English"),[t,s]),$e=i.useCallback(k=>q=>{rt.current[k]=q},[]),Fe=i.useCallback(k=>q=>{Q.current[k]=q},[]),We=i.useMemo(()=>cl(R),[R]),Re=i.useMemo(()=>!d||!A||!A.chapterNum||!We?!1:d(A.book,A.chapterNum)>0,[d,A,We]),wn=i.useCallback(k=>u?Co(k,u):!1,[u]),Te=i.useCallback(k=>q=>u?dl(k,q,u):!1,[u]),un=i.useCallback((k,q)=>X=>u?fr(k,q,X,u):!1,[u]),Ge=(a==null?void 0:a["%webView_bookChapterControl_selectChapter%"])??"Select Chapter",pn=(a==null?void 0:a["%webView_bookChapterControl_selectVerse%"])??"Select Verse",mn=i.useCallback(k=>{(k.key==="Home"||k.key==="End")&&k.stopPropagation(),m&&m.includes(k.key)&&A&&A.chapterNum!==void 0&&A.verseNum!==void 0&&(k.preventDefault(),k.stopPropagation(),me())},[m,A,me]),Mn=i.useCallback(k=>{var Zt,Ze,fn;if(k.ctrlKey)return;const{isLetter:q,isDigit:X}=So(k.key);if((b==="chapters"||b==="verses")&&(k.key===" "||k.key==="Enter")){const Ft=k.target instanceof HTMLElement?k.target:void 0;if(!!(Ft!=null&&Ft.closest('button, a, input, select, textarea, [role="button"]'))){k.stopPropagation();return}const Tt=(Zt=nt.current)==null?void 0:Zt.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');if(Tt){k.preventDefault(),k.stopPropagation(),Tt.click();return}}if((b==="chapters"||b==="verses")&&(q||X)){k.preventDefault(),k.stopPropagation();return}if(b==="chapters"&&k.key==="Backspace"){k.preventDefault(),k.stopPropagation(),mt();return}if(b==="verses"&&k.key==="Backspace"){k.preventDefault(),k.stopPropagation(),ft();return}const _t=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(k.key);if(b==="verses"&&_t){const Ft=O,yt=K;if(!Ft||!yt||!d)return;const Tt=d(Ft,yt);if(!Tt)return;(Ze=nt.current)==null||Ze.focus();const pt=(()=>{if(!G)return 1;const Ve=G.match(/:(\d+)$/);return Ve?parseInt(Ve[1],10):0})();let Ut=pt;const Yt=6;switch(k.key){case"ArrowLeft":pt!==0&&(Ut=pt>1?pt-1:Tt);break;case"ArrowRight":pt!==0&&(Ut=pt<Tt?pt+1:1);break;case"ArrowUp":Ut=pt===0?Tt:Math.max(1,pt-Yt);break;case"ArrowDown":Ut=pt===0?1:Math.min(Tt,pt+Yt);break;default:return}Ut!==pt&&(k.preventDefault(),k.stopPropagation(),N(`${Ft} ${oe[Ft]||""} ${yt}:${Ut}`),setTimeout(()=>{const Ve=Q.current[Ut];Ve&&Ve.scrollIntoView({block:"nearest",behavior:"smooth"})},0));return}if((b==="chapters"||b==="books"&&A)&&_t){const Ft=b==="chapters"?P:A==null?void 0:A.book;if(!Ft)return;b==="chapters"&&((fn=nt.current)==null||fn.focus());const yt=(()=>{if(!G)return 1;const Yt=G.match(/(\d+)$/);return Yt?parseInt(Yt[1],10):0})(),Tt=ge(Ft);if(!Tt)return;let pt=yt;const Ut=6;switch(k.key){case"ArrowLeft":yt!==0&&(pt=yt>1?yt-1:Tt);break;case"ArrowRight":yt!==0&&(pt=yt<Tt?yt+1:1);break;case"ArrowUp":pt=yt===0?Tt:Math.max(1,yt-Ut);break;case"ArrowDown":pt=yt===0?1:Math.min(Tt,yt+Ut);break;default:return}pt!==yt&&(k.preventDefault(),k.stopPropagation(),N(`${Ft} ${oe[Ft]||""} ${pt}`),setTimeout(()=>{const Yt=rt.current[pt];Yt&&Yt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,A,mt,ft,P,O,K,d,G]),On=i.useCallback(k=>{var _t;if(k.shiftKey||k.key==="Tab"||k.key===" ")return;if(k.key==="Enter"){k.stopPropagation();return}if(k.key==="ArrowUp"||k.key==="ArrowDown"){(_t=wt.current)==null||_t.focus();return}const{isLetter:q,isDigit:X}=So(k.key);(q||X)&&(k.preventDefault(),C(Zt=>Zt+k.key),wt.current.focus(),Nt(!1))},[]);return i.useLayoutEffect(()=>{const k=setTimeout(()=>{if(D&&b==="books"&&z.current&&J.current){const q=z.current,X=J.current,_t=X.offsetTop,Zt=q.clientHeight,Ze=X.clientHeight,fn=_t-Zt/2+Ze/2;q.scrollTo({top:Math.max(0,fn),behavior:"smooth"}),N(fs(t.book))}},0);return()=>{clearTimeout(k)}},[D,b,R,A,t.book]),i.useLayoutEffect(()=>{if(b==="chapters"&&P){const k=P===t.book,q=k?t.chapterNum:1;N(`${P} ${oe[P]||""} ${q}`),setTimeout(()=>{if(z.current)if(k){const X=rt.current[t.chapterNum];X&&X.scrollIntoView({block:"center",behavior:"smooth"})}else z.current.scrollTo({top:0});nt.current&&nt.current.focus()},0)}},[b,P,A,t.book,t.chapterNum]),i.useLayoutEffect(()=>{if(b==="verses"&&O&&K!==void 0){const k=O===t.book&&K===t.chapterNum,q=k?t.verseNum:1;N(`${O} ${oe[O]||""} ${K}:${q}`),setTimeout(()=>{if(z.current)if(k){const X=Q.current[t.verseNum];X&&X.scrollIntoView({block:"center",behavior:"smooth"})}else z.current.scrollTo({top:0});nt.current&&nt.current.focus()},0)}},[b,O,K,t.book,t.chapterNum,t.verseNum]),n.jsxs(we,{open:D,onOpenChange:kt,modal:v,children:[n.jsx(je,{asChild:!0,children:n.jsx(B,{ref:Pt,"aria-label":"book-chapter-trigger",variant:p,role:"combobox","aria-expanded":D,className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),onClick:k=>{Ot.current&&(Ot.current=!1,k.preventDefault())},children:f??n.jsx("span",{className:"tw-truncate",children:Ee})})}),n.jsx(re,{id:w,className:"tw-w-[var(--radix-popper-anchor-width,280px)] tw-min-w-[200px] tw-max-w-[280px] tw-p-0",align:j,onKeyDownCapture:Mn,onKeyDown:k=>k.stopPropagation(),onPointerDownOutside:k=>{const{target:q}=k;D&&Pt.current&&q instanceof Node&&Pt.current.contains(q)&&(Ot.current=!0,kt(!1))},onCloseAutoFocus:y,children:n.jsxs(ce,{ref:nt,loop:!0,value:G,onValueChange:N,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(Le,{ref:wt,value:R,onValueChange:C,onKeyDown:mn,onFocus:()=>Nt(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&n.jsx(hs,{recentSearches:l,onSearchItemSelect:Z,renderItem:k=>_.formatScrRef(k,"English"),getItemKey:k=>`${k.book}-${k.chapterNum}-${k.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:ot.map(({onClick:k,disabled:q,title:X,icon:_t})=>n.jsx(B,{variant:"ghost",size:"sm",onClick:()=>{Nt(!0),k()},disabled:q,className:"tw-h-10 tw-w-4 tw-p-0",title:X,onKeyDown:On,children:n.jsx(_t,{})},X))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:b==="verses"?ft:mt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",children:I==="ltr"?n.jsx(E.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(E.ArrowRight,{className:"tw-h-4 tw-w-4"})}),b==="chapters"&&P&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:De(P,s)}),b==="verses"&&O&&K!==void 0&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:`${De(O,s)} ${K}`}),n.jsx("span",{tabIndex:-1,className:"tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",children:b==="verses"?pn:Ge})]}),!W&&n.jsxs(de,{ref:z,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!A&&Object.entries(pe).map(([k,q])=>{if(q.length!==0)return n.jsx(te,{heading:ht(k),children:q.map(X=>n.jsx(us,{bookId:X,onSelect:_t=>V(_t),section:_.getSectionForBook(X),commandValue:`${X} ${oe[X]}`,ref:X===t.book?J:void 0,localizedBookNames:s,disabled:wn(X)},X))},k)}),A&&n.jsx(te,{children:n.jsx(ne,{value:`${A.book} ${oe[A.book]} ${A.chapterNum||""}:${A.verseNum||""})}`,onSelect:me,disabled:!!u&&fr(A.book,A.chapterNum??1,A.verseNum??1,u),className:"tw-font-semibold tw-text-primary",children:_.formatScrRef({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1},s?Fr(A.book,s):void 0)},"top-match")}),A&&Re&&A.chapterNum&&d&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:[n.jsx("span",{children:`${De(A.book,s)} ${A.chapterNum}`}),n.jsx("span",{children:pn})]}),n.jsx(Ro,{bookId:A.book,chapterNum:A.chapterNum,endVerse:d(A.book,A.chapterNum),scrRef:t,onVerseSelect:Rt,setVerseRef:Fe,isVerseDisabled:un(A.book,A.chapterNum),className:"tw-px-4 tw-pb-4"})]}),A&&!Re&&ge(A.book)>1&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:[n.jsx("span",{children:De(A.book,s)}),n.jsx("span",{children:Ge})]}),n.jsx(Eo,{bookId:A.book,scrRef:t,onChapterSelect:U,setChapterRef:$e,isChapterDimmed:it,isChapterDisabled:Te(A.book),className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&P&&n.jsx(Eo,{bookId:P,scrRef:t,onChapterSelect:U,setChapterRef:$e,isChapterDisabled:Te(P),className:"tw-p-4"}),b==="verses"&&O&&K!==void 0&&d&&n.jsx(Ro,{bookId:O,chapterNum:K,endVerse:d(O,K),scrRef:t,onVerseSelect:Rt,setVerseRef:Fe,isVerseDisabled:un(O,K),className:"tw-p-4"})]})]})})]})}const pl=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%","%webView_bookChapterControl_selectChapter%","%webView_bookChapterControl_selectVerse%"]),ml=Pe.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),xt=i.forwardRef(({className:t,...e},r)=>n.jsx(es.Root,{ref:r,className:h("pr-twp",ml(),t),...e}));xt.displayName=es.Root.displayName;const dr=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsx(yn.Root,{className:h("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});dr.displayName=yn.Root.displayName;const _n=i.forwardRef(({className:t,...e},r)=>n.jsx(yn.Item,{ref:r,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(yn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(E.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));_n.displayName=yn.Item.displayName;function fl(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Xn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:a,value:l,onChange:c=()=>{},getOptionLabel:w=fl,getButtonLabel:d,icon:u=void 0,buttonPlaceholder:m="",textPlaceholder:f="",commandEmptyMessage:p="No option found",buttonVariant:g="outline",alignDropDown:y="start",isDisabled:v=!1,ariaLabel:j,...I}){const[D,T]=i.useState(!1),G=d??w,N=C=>C.length>0&&typeof C[0]=="object"&&"options"in C[0],R=(C,b)=>{const S=w(C),P=typeof C=="object"&&"secondaryLabel"in C?C.secondaryLabel:void 0,F=`${b??""}${S}${P??""}`;return n.jsxs(ne,{value:S,onSelect:()=>{c(C),T(!1)},className:"tw-flex tw-items-center",children:[n.jsx(E.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!l||w(l)!==S})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[S,P&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",P]})]})]},F)};return n.jsxs(we,{open:D,onOpenChange:T,...I,children:[n.jsx(je,{asChild:!0,children:n.jsxs(B,{variant:g,role:"combobox","aria-expanded":D,"aria-label":j,id:t,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:u}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:l?G(l):m})]}),n.jsx(E.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(re,{align:y,className:h("tw-w-[200px] tw-p-0",s),style:a,children:n.jsxs(ce,{children:[n.jsx(Le,{placeholder:f,className:"tw-text-inherit"}),n.jsx(Ye,{children:p}),n.jsx(de,{children:N(e)?e.map(C=>n.jsx(te,{heading:C.groupHeading,children:C.options.map(b=>R(b,C.groupHeading))},C.groupHeading)):e.map(C=>R(C))})]})})]})}function xs({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const l=i.useMemo(()=>Array.from({length:a},(d,u)=>u+1),[a]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(xt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Xn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(xt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Xn,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const hl=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),hr=(t,e)=>t[e]??e;function gl({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const u=hr(d,"%webView_bookSelector_currentBook%"),m=hr(d,"%webView_bookSelector_choose%"),f=hr(d,"%webView_bookSelector_chooseBooks%"),[p,g]=i.useState("current book"),y=v=>{g(v),t(v)};return n.jsx(dr,{className:"pr-twp tw-flex",value:p,onValueChange:v=>y(v),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(_n,{value:"current book"}),n.jsx(xt,{className:"tw-ms-1",children:u})]}),n.jsx(xt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(xs,{isDisabled:p==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(_n,{value:"choose books"}),n.jsx(xt,{className:"tw-ms-1",children:f})]}),n.jsx(xt,{className:"tw-flex tw-items-center",children:o.map(v=>at.Canon.bookIdToEnglishName(v)).join(", ")}),n.jsx(B,{disabled:p==="current book",onClick:()=>r(),children:m})]})]})})}const bs=i.createContext(null);function xl(t,e){return{getTheme:function(){return e??null}}}function Ne(){const t=i.useContext(bs);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const vs=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,bl=vs?i.useLayoutEffect:i.useEffect,$n={tag:x.HISTORY_MERGE_TAG};function vl({initialConfig:t,children:e}){const r=i.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:l,editorState:c,html:w}=t,d=xl(null,o),u=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:a,onError:m=>l(m,u),theme:o});return function(m,f){if(f!==null){if(f===void 0)m.update(()=>{const p=x.$getRoot();if(p.isEmpty()){const g=x.$createParagraphNode();p.append(g);const y=vs?document.activeElement:null;(x.$getSelection()!==null||y!==null&&y===m.getRootElement())&&g.select()}},$n);else if(f!==null)switch(typeof f){case"string":{const p=m.parseEditorState(f);m.setEditorState(p,$n);break}case"object":m.setEditorState(f,$n);break;case"function":m.update(()=>{x.$getRoot().isEmpty()&&f(m)},$n)}}}(u,c),[u,d]},[]);return bl(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(bs.Provider,{value:r,children:e})}const yl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function jl({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Ne();return yl(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:l,prevEditorState:c,tags:w})=>{e&&a.size===0&&l.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const Br={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Ct=Ke.Provider,Dt=Ke.Root,Mt=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(Ke.Trigger,{ref:o,className:e?h(Vr({variant:e}),t):t,...r}));Mt.displayName=Ke.Trigger.displayName;const St=i.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(Ke.Portal,{children:n.jsx(Ke.Content,{ref:s,sideOffset:e,style:{zIndex:as,...r},className:h("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));St.displayName=Ke.Content.displayName;const zr=[Rr.HeadingNode,x.ParagraphNode,x.TextNode,Rr.QuoteNode],Nl=i.createContext(null),gr={didCatch:!1,error:null};class kl extends i.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=gr}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),l=0;l<s;l++)a[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(gr)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&_l(e.resetKeys,s)){var a,l;(a=(l=this.props).onReset)===null||a===void 0||a.call(l,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(gr)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:l}=this.state;let c=e;if(a){const w={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=i.createElement(o,w);else if(s!==void 0)c=s;else throw l}return i.createElement(Nl.Provider,{value:{didCatch:a,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function _l(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function Cl({children:t,onError:e}){return n.jsx(kl,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const Sl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function El(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Rl(){return function(t){const[e]=Ne(),r=i.useMemo(()=>t(e),[e,t]),[o,s]=i.useState(()=>r.initialValueFn()),a=i.useRef(o);return Sl(()=>{const{initialValueFn:l,subscribe:c}=r,w=l();return a.current!==w&&(a.current=w,s(w)),c(d=>{a.current=d,s(d)})},[r,t]),o}(El)}function Tl(t,e){const r=t.getRootElement();if(r===null)return[];const o=r.getBoundingClientRect(),s=getComputedStyle(r),a=parseFloat(s.paddingLeft)+parseFloat(s.paddingRight),l=Array.from(e.getClientRects());let c,w=l.length;l.sort((d,u)=>{const m=d.top-u.top;return Math.abs(m)<=3?d.left-u.left:m});for(let d=0;d<w;d++){const u=l[d],m=c&&c.top<=u.top&&c.top+c.height>u.top&&c.left+c.width>u.left,f=u.width+a===o.width;m||f?(l.splice(d--,1),w--):c=u}return l}function Il(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,l=t.isBackward(),c=s.getNode(),w=a.getNode(),d=e.is(c),u=e.is(w);if(d||u){const[m,f]=x.$getCharacterOffsets(t),p=c.is(w),g=e.is(l?w:c),y=e.is(l?c:w);let v,j=0;p?(j=m>f?f:m,v=m>f?m:f):g?(j=l?f:m,v=void 0):y&&(j=0,v=l?m:f);const I=e.__text.slice(j,v);I!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=I)}}return e}function Wn(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const ys=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Dl=ys&&"documentMode"in document?document.documentMode:null;!(!ys||!("InputEvent"in window)||Dl)&&"getTargetRanges"in new window.InputEvent("input");function he(t){return`${t}px`}const Ml={attributes:!0,characterData:!0,childList:!0,subtree:!0};function Ol(t,e,r){let o=null,s=null,a=null,l=[];const c=document.createElement("div");function w(){o===null&&Wn(182),s===null&&Wn(183);const{left:m,top:f}=s.getBoundingClientRect(),p=Tl(t,e);var g,y;c.isConnected||(y=c,(g=s).insertBefore(y,g.firstChild));let v=!1;for(let j=0;j<p.length;j++){const I=p[j],D=l[j]||document.createElement("div"),T=D.style;T.position!=="absolute"&&(T.position="absolute",v=!0);const G=he(I.left-m);T.left!==G&&(T.left=G,v=!0);const N=he(I.top-f);T.top!==N&&(D.style.top=N,v=!0);const R=he(I.width);T.width!==R&&(D.style.width=R,v=!0);const C=he(I.height);T.height!==C&&(D.style.height=C,v=!0),D.parentNode!==c&&(c.append(D),v=!0),l[j]=D}for(;l.length>p.length;)l.pop();v&&r(l)}function d(){s=null,o=null,a!==null&&a.disconnect(),a=null,c.remove();for(const m of l)m.remove();l=[]}c.style.position="relative";const u=t.registerRootListener(function m(){const f=t.getRootElement();if(f===null)return d();const p=f.parentElement;if(!x.isHTMLElement(p))return d();d(),o=f,s=p,a=new MutationObserver(g=>{const y=t.getRootElement(),v=y&&y.parentElement;if(y!==o||v!==s)return m();for(const j of g)if(!c.contains(j.target))return w()}),a.observe(p,Ml),w()});return()=>{u(),d()}}function To(t,e,r){if(t.type!=="text"&&x.$isElementNode(e)){const o=e.getDOMSlot(r);return[o.element,o.getFirstChildOffset()+t.offset]}return[x.getDOMTextNode(r)||r,t.offset]}function Al(t){for(const e of t){const r=e.style;r.background!=="Highlight"&&(r.background="Highlight"),r.color!=="HighlightText"&&(r.color="HighlightText"),r.marginTop!==he(-1.5)&&(r.marginTop=he(-1.5)),r.paddingTop!==he(4)&&(r.paddingTop=he(4)),r.paddingBottom!==he(0)&&(r.paddingBottom=he(0))}}function Pl(t,e=Al){let r=null,o=null,s=null,a=null,l=null,c=null,w=()=>{};function d(u){u.read(()=>{const m=x.$getSelection();if(!x.$isRangeSelection(m))return r=null,s=null,a=null,c=null,w(),void(w=()=>{});const[f,p]=function(C){const b=C.getStartEndPoints();return C.isBackward()?[b[1],b[0]]:b}(m),g=f.getNode(),y=g.getKey(),v=f.offset,j=p.getNode(),I=j.getKey(),D=p.offset,T=t.getElementByKey(y),G=t.getElementByKey(I),N=r===null||T!==o||v!==s||y!==r.getKey(),R=a===null||G!==l||D!==c||I!==a.getKey();if((N||R)&&T!==null&&G!==null){const C=function(b,S,P,F,O,L,K){const H=(b._window?b._window.document:document).createRange();return H.setStart(...To(S,P,F)),H.setEnd(...To(O,L,K)),H}(t,f,g,T,p,j,G);w(),w=Ol(t,C,e)}r=g,o=T,s=v,a=j,l=G,c=D})}return d(t.getEditorState()),x.mergeRegister(t.registerUpdateListener(({editorState:u})=>d(u)),()=>{w()})}function Ll(t,e){let r=null;const o=()=>{const s=getSelection(),a=s&&s.anchorNode,l=t.getRootElement();a!==null&&l!==null&&l.contains(a)?r!==null&&(r(),r=null):r===null&&(r=Pl(t,e))};return t.registerRootListener(s=>{if(s){const a=s.ownerDocument;return a.addEventListener("selectionchange",o),o(),()=>{r!==null&&r(),a.removeEventListener("selectionchange",o)}}})}function $l(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||Wn(4,t.__key),e}function Fl(t){const e=x.$getSelection()||x.$getPreviousSelection();let r;if(x.$isRangeSelection(e))r=x.$caretFromPoint(e.focus,"next");else{if(e!=null){const l=e.getNodes(),c=l[l.length-1];c&&(r=x.$getSiblingCaret(c,"next"))}r=r||x.$getChildCaret(x.$getRoot(),"previous").getFlipped().insert(x.$createParagraphNode())}const o=Gl(t,r),s=x.$getAdjacentChildCaret(o),a=x.$isChildCaret(s)?x.$normalizeCaret(s):o;return x.$setSelectionFromCaretRange(x.$getCollapsedCaretRange(a)),t.getLatest()}function Gl(t,e,r){let o=x.$getCaretInDirection(e,"next");for(let s=o;s;s=x.$splitAtPointCaretNext(s,r))o=s;return x.$isTextPointCaret(o)&&Wn(283),o.insert(t.isInline()?x.$createParagraphNode().append(t):t),x.$getCaretInDirection(x.$getSiblingCaret(t.getLatest(),"next"),e.direction)}function Vl(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const a=o[s],l=a.getKey();if(r.has(l))continue;const c=x.$findMatchingParent(a,d=>x.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!r.has(w)&&(r.add(w),t(c))}return r.size>0}const Bl=Symbol.for("preact-signals");function wr(){if(_e>1)return void _e--;let t,e=!1;for(!function(){let r=Zn;for(Zn=void 0;r!==void 0;)r.S.v===r.v&&(r.S.i=r.i),r=r.o}();vn!==void 0;){let r=vn;for(vn=void 0,Jn++;r!==void 0;){const o=r.u;if(r.u=void 0,r.f&=-3,!(8&r.f)&&js(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(Jn=0,_e--,e)throw t}function zl(t){if(_e>0)return t();Mr=++Kl,_e++;try{return t()}finally{wr()}}let tt,vn;function Io(t){const e=tt;tt=void 0;try{return t()}finally{tt=e}}let Zn,_e=0,Jn=0,Kl=0,Mr=0,Kn=0;function Do(t){if(tt===void 0)return;let e=t.n;return e===void 0||e.t!==tt?(e={i:0,S:t,p:tt.s,n:void 0,t:tt,e:void 0,x:void 0,r:e},tt.s!==void 0&&(tt.s.n=e),tt.s=e,t.n=e,32&tt.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=tt.s,e.n=void 0,tt.s.n=e,tt.s=e),e):void 0}function Vt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Cn(t,e){return new Vt(t,e)}function js(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Mo(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Ns(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function Be(t,e){Vt.call(this,void 0),this.x=t,this.s=void 0,this.g=Kn-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function ql(t,e){return new Be(t,e)}function ks(t){const e=t.m;if(t.m=void 0,typeof e=="function"){_e++;const r=tt;tt=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Kr(t),o}finally{tt=r,wr()}}}function Kr(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,ks(t)}function Hl(t){if(tt!==this)throw new Error("Out-of-order effect");Ns(this),tt=t,this.f&=-2,8&this.f&&Kr(this),wr()}function Qe(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}function be(t,e){const r=new Qe(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function dn(t,e={}){const r={};for(const o in t){const s=e[o],a=Cn(s===void 0?t[o]:s);r[o]=a}return r}Vt.prototype.brand=Bl,Vt.prototype.h=function(){return!0},Vt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Io(()=>{var r;(r=this.W)==null||r.call(this)}))},Vt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Io(()=>{var o;(o=this.Z)==null||o.call(this)}))}},Vt.prototype.subscribe=function(t){return be(()=>{const e=this.value,r=tt;tt=void 0;try{t(e)}finally{tt=r}},{name:"sub"})},Vt.prototype.valueOf=function(){return this.value},Vt.prototype.toString=function(){return this.value+""},Vt.prototype.toJSON=function(){return this.value},Vt.prototype.peek=function(){const t=tt;tt=void 0;try{return this.value}finally{tt=t}},Object.defineProperty(Vt.prototype,"value",{get(){const t=Do(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Jn>100)throw new Error("Cycle detected");(function(e){_e!==0&&Jn===0&&e.l!==Mr&&(e.l=Mr,Zn={S:e,v:e.v,i:e.i,o:Zn})})(this),this.v=t,this.i++,Kn++,_e++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{wr()}}}}),Be.prototype=new Vt,Be.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Kn))return!0;if(this.g=Kn,this.f|=1,this.i>0&&!js(this))return this.f&=-2,!0;const t=tt;try{Mo(this),tt=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return tt=t,Ns(this),this.f&=-2,!0},Be.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}Vt.prototype.S.call(this,t)},Be.prototype.U=function(t){if(this.t!==void 0&&(Vt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},Be.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(Be.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Do(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Qe.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}},Qe.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,ks(this),Mo(this),_e++;const t=tt;return tt=this,Hl.bind(this,t)},Qe.prototype.N=function(){2&this.f||(this.f|=2,this.u=vn,vn=this)},Qe.prototype.d=function(){this.f|=8,1&this.f||Kr(this)},Qe.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return be(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function _s(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function Cs(t,e=_s){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({$onClear:_s}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return be(()=>Cs(t,o.value))}});function Ul(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const xr=x.createState("format",{parse:t=>typeof t=="number"?t:0});class Ss extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:xr}]})}getFormat(){return x.$getState(this,xr)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,xr,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Yl(t){return t instanceof Ss}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Ss],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const a of s.getNodes())Yl(a)&&a.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function Es(t,e){let r;return Cn(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const Or=x.defineExtension({build:t=>Es(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function st(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Rs(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=Rs(r[s],o[s]);return t}return e}const qr=0,Ar=1,Ts=2,br=3,Fn=4,Je=5,vr=6,gn=7;function yr(t){return t.id===qr}function Is(t){return t.id===Ts}function Xl(t){return function(e){return e.id===Ar}(t)||st(305,String(t.id),String(Ar)),Object.assign(t,{id:Ts})}const Wl=new Set;class Zl{constructor(e,r){Gt(this,"builder");Gt(this,"configs");Gt(this,"_dependency");Gt(this,"_peerNameSet");Gt(this,"extension");Gt(this,"state");Gt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:qr}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Is(r)||st(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,w,d){return Object.assign(c,{config:w,id:br,registerState:d})}(r,this.mergeConfigs(),o);let l;this.state=a,this.extension.init&&(l=this.extension.init(e,a.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:Fn,initResult:w,registerState:d})}(a,l,s)}build(e){const r=this.state;let o;r.id!==Fn&&st(307,String(r.id),String(Je)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,l,c){return Object.assign(a,{id:Je,output:l,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==Je&&st(308,String(o.id),String(Je));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:vr})}(o),()=>{const a=this.state;a.id!==gn&&st(309,String(o.id),String(gn)),this.state=function(l){return Object.assign(l,{id:Je})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==vr&&st(310,String(r.id),String(vr)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:gn})}(r),o}getSignal(){return this._signal===void 0&&st(311),this._signal}getInitResult(){this.extension.init===void 0&&st(312,this.extension.name);const e=this.state;return function(r){return r.id>=Fn}(e)||st(313,String(e.id),String(Fn)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=br}(e)||st(314,String(e.id),String(br)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&st(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&st(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=gn}(e)||st(316,String(e.id),String(gn)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Wl}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=Je})(e)||st(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Oo={tag:x.HISTORY_MERGE_TAG};function Jl(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Ql=x.defineExtension({config:x.safeCast({setOptions:Oo,updateOptions:Oo}),init:({$initialEditorState:t=Jl})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(x.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const l=t.parseEditorState(a);t.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Ao=Symbol.for("@lexical/extension/LexicalBuilder");function Po(){}function tc(t){throw t}function Gn(t){return Array.isArray(t)?t:[t]}const jr="0.43.0+prod.esm";class tn{constructor(e){Gt(this,"roots");Gt(this,"extensionNameMap");Gt(this,"outgoingConfigEdges");Gt(this,"incomingEdges");Gt(this,"conflicts");Gt(this,"_sortedExtensionReps");Gt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=jr,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Gn(Ql)];for(const o of e)r.push(Gn(o));return new tn(r)}static maybeFromEditor(e){const r=e[Ao];return r&&(r.PACKAGE_VERSION!==jr&&st(292,r.PACKAGE_VERSION,jr),r instanceof tn||st(293)),r}static fromEditor(e){const r=tn.maybeFromEditor(e);return r===void 0&&st(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Ao]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=Po;function r(){try{e()}finally{e=Po}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&st(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&st(296);const r=Gn(e),[o]=r;typeof o.name!="string"&&st(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&st(298,o.name),!s){s=new Zl(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&st(299,o.name,a);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&st(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=Gn(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(Is(a))return;const l=o.extension.name;var c;yr(a)||st(300,l,s||"[unknown]"),yr(c=a)||st(304,String(c.id),String(qr)),a=Object.assign(c,{id:Ar}),o.state=a;const w=this.outgoingConfigEdges.get(l);if(w)for(const d of w.keys()){const u=this.extensionNameMap.get(d);u&&r(u,l)}a=Xl(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())yr(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of a)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&st(301,o.name);for(const l of s)a.configs.add(l)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const l of r){const c=l.register(e,a);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},l={},c=this.sortedExtensionReps();for(const u of c){const{extension:m}=u;if(m.onError!==void 0&&(e.onError=m.onError),m.disableEvents!==void 0&&(e.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(e.parentEditor=m.parentEditor),m.editable!==void 0&&(e.editable=m.editable),m.namespace!==void 0&&(e.namespace=m.namespace),m.$initialEditorState!==void 0&&(e.$initialEditorState=m.$initialEditorState),m.nodes)for(const f of Ul(m)){if(typeof f!="function"){const p=o.get(f.replace);p&&st(302,m.name,f.replace.name,p.extension.name),o.set(f.replace,u)}r.add(f)}if(m.html){if(m.html.export)for(const[f,p]of m.html.export.entries())s.set(f,p);m.html.import&&Object.assign(a,m.html.import)}m.theme&&Rs(l,m.theme)}Object.keys(l).length>0&&(e.theme=l),r.size&&(e.nodes=[...r]);const w=Object.keys(a).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=a),d&&(e.html.export=s));for(const u of c)u.init(e);return e.onError||(e.onError=tc),e}}const ec=new Set,Lo=x.defineExtension({build(t,e,r){const o=r.getDependency(Or).output,s=Cn({watchedNodeKeys:new Map}),a=Es(()=>{},()=>be(()=>{const l=a.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[u,m]of c.entries()){if(m.size===0){c.delete(u);continue}const f=x.$getNodeByKey(u),p=f&&f.isSelected()||!1;d=d||p!==(!!l&&l.has(u)),p&&(w=w||new Set,w.add(u))}}),!d&&w&&l&&w.size===l.size||(a.value=w)}));return{watchNodeKey:function(l){const c=ql(()=>(a.value||ec).has(l)),{watchedNodeKeys:w}=s.peek();let d=w.get(l);const u=d!==void 0;return d=d||new Set,d.add(c),u||(w.set(l,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[Or],name:"@lexical/extension/NodeSelection"}),nc=x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class rn extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new rn(e.__key)}static importJSON(e){return Hr().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:rc,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function rc(){return{node:Hr()}}function Hr(){return x.$create(rn)}function oc(t){return t instanceof rn}x.defineExtension({dependencies:[Or,Lo],name:"@lexical/extension/HorizontalRule",nodes:()=>[rn],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Lo).output,s=Cn({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(nc,l=>{const c=x.$getSelection();if(!x.$isRangeSelection(c))return!1;if(c.focus.getNode()!==null){const w=Hr();Fl(w)}return!0},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.CLICK_COMMAND,l=>{if(x.isDOMNode(l.target)){const c=x.$getNodeFromDOMNode(l.target);if(oc(c))return function(w,d=!1){const u=x.$getSelection(),m=w.isSelected(),f=w.getKey();let p;d&&x.$isNodeSelection(u)?p=u:(p=x.$createNodeSelection(),x.$setSelection(p)),m?p.delete(f):p.add(f)}(c,l.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(rn,(l,c)=>{zl(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[u,m]of l.entries())if(m==="destroyed")d.delete(u),w=!0;else{const f=d.get(u),p=t.getElementByKey(u);f?f.domNode.value=p:(w=!0,d.set(u,{domNode:Cn(p),selectedSignal:o(u)}))}w&&(s.value={nodeSelections:d})})}),be(()=>{const l=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())l.push(be(()=>{const d=c.value;d&&(w.value?x.addClassNamesToElement(d,a):x.removeClassNamesFromElement(d,a))}));return x.mergeRegister(...l)}))}});x.defineExtension({build:(t,e)=>dn({inheritEditableFromParent:e.inheritEditableFromParent}),config:x.safeCast({$getParentEditor:function(){const t=x.$getEditor();return tn.fromEditor(t),t},inheritEditableFromParent:!1}),init:(t,e,r)=>{const o=e.$getParentEditor();t.parentEditor=o,t.theme=t.theme||o._config.theme},name:"@lexical/extension/NestedEditor",register:(t,e,r)=>be(()=>{const o=t._parentEditor;if(o&&r.getOutput().inheritEditableFromParent.value)return t.setEditable(o.isEditable()),o.registerEditableListener(t.setEditable.bind(t))})});x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({disabled:!1,onReposition:void 0}),name:"@lexical/utils/SelectionAlwaysOnDisplay",register:(t,e,r)=>{const o=r.getOutput();return be(()=>{if(!o.disabled.value)return Ll(t,o.onReposition.value)})}});function Ds(t){return t.canBeEmpty()}function sc(t,e,r=Ds){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const a=function(l){if(l.getNodes().filter(f=>x.$isBlockElementNode(f)&&f.canIndent()).length>0)return!0;const c=l.anchor,w=l.focus,d=w.isBefore(c)?w:c,u=d.getNode(),m=$l(u);if(m.canIndent()){const f=m.getKey();let p=x.$createRangeSelection();if(p.anchor.set(f,0,"element"),p.focus.set(f,0,"element"),p=x.$normalizeSelection__EXPERIMENTAL(p),p.anchor.is(d))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(a,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const a=typeof r=="function"?r:r.peek();return Vl(l=>{if(a(l)){const c=l.getIndent()+1;(!o||c<o)&&l.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({$canIndent:Ds,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:a}=r.getOutput();return be(()=>{if(!o.value)return sc(t,s,a)})}});const ac=x.defineExtension({name:"@lexical/react/ReactProvider"});function ic(){return x.$getRoot().getTextContent()}function lc(t,e=!0){if(t)return!1;let r=ic();return e&&(r=r.trim()),r===""}function cc(t){if(!lc(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),l=a.length;for(let c=0;c<l;c++){const w=a[o];if(!x.$isTextNode(w))return!1}}}return!0}function Ms(t){return()=>cc(t)}function Os(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let l;try{l=JSON.parse(a)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,u,m,f,p]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const y=g.anchor;let v=y.getNode(),j=0,I=0;if(x.$isTextNode(v)&&d>=0&&u>=0&&(j=d,I=d+u,g.setTextNodeRange(v,j,v,I)),j===I&&m===""||(g.insertRawText(m),v=y.getNode()),x.$isTextNode(v)){j=f,I=f+p;const D=v.getTextContentSize();j=j>D?D:j,I=I>D?D:I,g.setTextNodeRange(v,j,v,I)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>be(()=>r.getOutput().disabled.value?void 0:Os(t))});function dc(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Ur=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function wc({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=i.useState(()=>r.getDecorators());return Ur(()=>r.registerDecoratorListener(l=>{_o.flushSync(()=>{a(l)})}),[r]),i.useEffect(()=>{a(r.getDecorators())},[r]),i.useMemo(()=>{const l=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],u=n.jsx(o,{onError:f=>r._onError(f),children:n.jsx(i.Suspense,{fallback:null,children:s[d]})}),m=r.getElementByKey(d);m!==null&&l.push(_o.createPortal(u,m,d))}return l},[o,s,r])}(t,e)}function uc({editor:t,ErrorBoundary:e}){return function(r){const o=tn.maybeFromEditor(r);if(o&&o.hasExtensionByName(ac.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&dc(320,s);return!0}return!1}(t)?null:n.jsx(wc,{editor:t,ErrorBoundary:e})}function $o(t){return t.getEditorState().read(Ms(t.isComposing()))}function pc({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Ne();return function(s){Ur(()=>x.mergeRegister(Rr.registerRichText(s),Os(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(mc,{content:e}),n.jsx(uc,{editor:o,ErrorBoundary:r})]})}function mc({content:t}){const[e]=Ne(),r=function(s){const[a,l]=i.useState(()=>$o(s));return Ur(()=>{function c(){const w=$o(s);l(w)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=Rl();return r?typeof t=="function"?t(o):t:null}function fc({defaultSelection:t}){const[e]=Ne();return i.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const hc=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function gc({onClear:t}){const[e]=Ne();return hc(()=>Cs(e,t),[e,t]),null}const As=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function xc({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:l,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:u,ariaOwns:m,ariaRequired:f,autoCapitalize:p,className:g,id:y,role:v="textbox",spellCheck:j=!0,style:I,tabIndex:D,"data-testid":T,...G},N){const[R,C]=i.useState(t.isEditable()),b=i.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?t.setRootElement(P):t.setRootElement(null)},[t]),S=i.useMemo(()=>function(...P){return F=>{for(const O of P)typeof O=="function"?O(F):O!=null&&(O.current=F)}}(N,b),[b,N]);return As(()=>(C(t.isEditable()),t.registerEditableListener(P=>{C(P)})),[t]),n.jsx("div",{"aria-activedescendant":R?e:void 0,"aria-autocomplete":R?r:"none","aria-controls":R?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":R&&v==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":u,"aria-owns":R?m:void 0,"aria-readonly":!R||void 0,"aria-required":f,autoCapitalize:p,className:g,contentEditable:R,"data-testid":T,id:y,ref:S,role:v,spellCheck:j,style:I,tabIndex:D,...G})}const bc=i.forwardRef(xc);function Fo(t){return t.getEditorState().read(Ms(t.isComposing()))}const vc=i.forwardRef(yc);function yc(t,e){const{placeholder:r,...o}=t,[s]=Ne();return n.jsxs(n.Fragment,{children:[n.jsx(bc,{editor:s,...o,ref:e}),r!=null&&n.jsx(jc,{editor:s,content:r})]})}function jc({content:t,editor:e}){const r=function(l){const[c,w]=i.useState(()=>Fo(l));return As(()=>{function d(){const u=Fo(l);w(u)}return d(),x.mergeRegister(l.registerUpdateListener(()=>{d()}),l.registerEditableListener(()=>{d()}))},[l]),c}(e),[o,s]=i.useState(e.isEditable());if(i.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(l=>{s(l)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function Nc({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(vc,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Ps=i.createContext(void 0);function kc({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const l=i.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Ps.Provider,{value:l,children:a})}function Ls(){const t=i.useContext(Ps);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function _c(){const[t,e]=i.useState(void 0),r=i.useCallback(()=>{e(void 0)},[]),o=i.useMemo(()=>{if(t===void 0)return;const{title:a,content:l}=t;return n.jsx(Un,{open:!0,onOpenChange:r,children:n.jsxs(jn,{children:[n.jsx(Nn,{children:n.jsx(kn,{children:a})}),l]})})},[t,r]),s=i.useCallback((a,l,c=!1)=>{e({closeOnClickOutside:c,content:l(r),title:a})},[r]);return[o,s]}function Cc({children:t}){const[e]=Ne(),[r,o]=i.useState(e),[s,a]=i.useState("paragraph"),[l,c]=_c(),w=()=>{};return i.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,u)=>(o(u),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(kc,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:a,showModal:c,children:[l,t({blockType:s})]})}function Sc(t){const[e]=Ne(),{activeEditor:r}=Ls();i.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),i.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const $s=Pe.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Ec=i.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(ns.Root,{ref:s,className:h($s({variant:e,size:r,className:t})),...o}));Ec.displayName=ns.Root.displayName;const Fs=i.createContext({size:"default",variant:"default"}),ur=i.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const l=bt();return n.jsx(ir.Root,{ref:a,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:l,children:n.jsx(Fs.Provider,{value:{variant:e,size:r},children:o})})});ur.displayName=ir.Root.displayName;const en=i.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const l=i.useContext(Fs);return n.jsx(ir.Item,{ref:a,className:h($s({variant:l.variant||r,size:l.size||o}),t),...s,children:e})});en.displayName=ir.Item.displayName;const Go=[{format:"bold",icon:E.BoldIcon,label:"Bold"},{format:"italic",icon:E.ItalicIcon,label:"Italic"}];function Rc(){const{activeEditor:t}=Ls(),[e,r]=i.useState([]),o=i.useCallback(s=>{if(x.$isRangeSelection(s)||Gi.$isTableSelection(s)){const a=[];Go.forEach(({format:l})=>{s.hasFormat(l)&&a.push(l)}),r(l=>l.length!==a.length||!a.every(c=>l.includes(c))?a:l)}},[]);return Sc(o),n.jsx(ur,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Go.map(({format:s,icon:a,label:l})=>n.jsx(en,{value:s,"aria-label":l,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function Tc({onClear:t}){const[e]=Ne();i.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Ic({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=i.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Cc,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Rc,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(pc,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Nc,{placeholder:t})}),ErrorBoundary:Cl}),e&&n.jsx(fc,{defaultSelection:"rootEnd"}),n.jsx(Tc,{onClear:r}),n.jsx(gc,{})]})]})}const Dc={namespace:"commentEditor",theme:Br,nodes:zr,onError:t=>{console.error(t)}};function Qn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:l,className:c}){return n.jsx("div",{className:h("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(vl,{initialConfig:{...Dc,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(Ct,{children:[n.jsx(Ic,{placeholder:s,autoFocus:a,onClear:l}),n.jsx(jl,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function Mc(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!Vs.has(a.nodeName)){const l=Bs(a,t,s,!1);l!==null&&(o=o.concat(l))}return function(a){for(const l of a)l.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&l.insertAfter(x.$createLineBreakNode());for(const l of a){const c=l.getChildren();for(const w of c)l.insertBefore(w);l.remove()}}(s),o}function Oc(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)Gs(t,o[s],r,e);return r.innerHTML}function Gs(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=x.$isElementNode(e)&&e.excludeFromCopy("html");let l=e;o!==null&&x.$isTextNode(e)&&(l=Il(o,e,"clone"));const c=x.$isElementNode(l)?l.getChildren():[],w=x.getRegisteredNode(t,l.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,l):l.exportDOM(t);const{element:u,after:m}=d;if(!u)return!1;const f=document.createDocumentFragment();for(let p=0;p<c.length;p++){const g=c[p],y=Gs(t,g,f,o);!s&&x.$isElementNode(e)&&y&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((x.isHTMLElement(u)||x.isDocumentFragment(u))&&u.append(f),r.append(u),m){const p=m.call(l,u);p&&(x.isDocumentFragment(u)?u.replaceChildren(p):u.replaceWith(p))}}else r.append(f);return s}const Vs=new Set(["STYLE","SCRIPT"]);function Bs(t,e,r,o,s=new Map,a){let l=[];if(Vs.has(t.nodeName))return l;let c=null;const w=function(g,y){const{nodeName:v}=g,j=y._htmlConversions.get(v.toLowerCase());let I=null;if(j!==void 0)for(const D of j){const T=D(g);T!==null&&(I===null||(I.priority||0)<=(T.priority||0))&&(I=T)}return I!==null?I.conversion:null}(t,e),d=w?w(t):null;let u=null;if(d!==null){u=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,y]of s)if(c=y(c,a),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const m=t.childNodes;let f=[];const p=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<m.length;g++)f.push(...Bs(m[g],e,r,p,new Map(s),c));return u!=null&&(f=u(f)),x.isBlockDomNode(t)&&(f=Ac(t,f,p?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?f.length>0?l=l.concat(f):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...f),l}function Ac(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let l=0;l<e.length;l++){const c=e[l];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),l===e.length-1||l<e.length-1&&x.$isBlockElementNode(e[l+1])){const w=r();w.setFormat(o),w.append(...a),s.push(w),a=[]}}return s}function zs(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Ks(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Ks(e.children)):!1}function se(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Ks(t.root.children):!1}function Pc(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Jo.createHeadlessEditor({namespace:"EditorUtils",theme:Br,nodes:zr,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=Mc(e,s);x.$getRoot().clear(),x.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function tr(t){const e=Jo.createHeadlessEditor({namespace:"EditorUtils",theme:Br,nodes:zr,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=Oc(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Yr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function qn(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Xr(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const Lc={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Nr(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function $c({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,a]=i.useState(Lc),[l,c]=i.useState(void 0),[w,d]=i.useState(!1),u=i.useRef(void 0),m=i.useRef(null);i.useEffect(()=>{let j=!0;const I=m.current;if(!I)return;const D=setTimeout(()=>{j&&zs(I)},300);return()=>{j=!1,clearTimeout(D)}},[]);const f=i.useCallback(()=>{if(!se(s))return;const j=tr(s);e(j,l)},[s,e,l]),p=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",y=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",v=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:v}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(B,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(E.X,{})})}),n.jsx(St,{children:n.jsx("p",{children:y})})]})}),n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(B,{onClick:f,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!se(s),children:n.jsx(E.Check,{})})}),n.jsx(St,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(we,{open:w,onOpenChange:d,children:[n.jsx(je,{asChild:!0,children:n.jsxs(B,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(E.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Nr(l!==void 0?l:"",o)})]})}),n.jsx(re,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),d(!1))},children:n.jsx(ce,{children:n.jsx(de,{children:t.map(j=>n.jsx(ne,{onSelect:()=>{c(j===""?void 0:j),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Nr(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):Xr(j)&&(j.preventDefault(),j.stopPropagation(),se(s)&&f())},onKeyDown:j=>{Yr(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(Qn,{editorSerializedState:s,onSerializedChange:j=>a(j),placeholder:p,onClear:j=>{u.current=j}})})]})}const Fc=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),Gc=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],Vc=["input","select","textarea","button"],Bc=["button","textbox"],qs=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=i.useRef(null),[a,l]=i.useState(void 0),[c,w]=i.useState(void 0),d=i.useCallback(p=>{l(p);const g=t.find(v=>v.id===p);g&&(e==null||e(g));const y=document.getElementById(p);y&&(y.scrollIntoView({block:"center"}),y.focus()),s.current&&s.current.setAttribute("aria-activedescendant",p)},[e,t]),u=i.useCallback(p=>{const g=t.find(y=>y.id===p);g&&(w(y=>y===p?void 0:p),r==null||r(g))},[r,t]),m=p=>{if(!p)return!1;const g=p.tagName.toLowerCase();if(p.isContentEditable||Vc.includes(g))return!0;const y=p.getAttribute("role");if(y&&Bc.includes(y))return!0;const v=p.getAttribute("tabindex");return v!==void 0&&v!=="-1"},f=i.useCallback(p=>{var R;const g=p.target,y=C=>C?document.getElementById(C):void 0,v=y(c),j=y(a);if(!!(v&&g&&v.contains(g)&&g!==v)&&m(g)){if(p.key==="Escape"||p.key==="ArrowLeft"&&!g.isContentEditable){if(c){p.preventDefault(),p.stopPropagation();const C=t.find(b=>b.id===c);C&&d(C.id)}return}if(p.key==="ArrowDown"||p.key==="ArrowUp"){if(!v)return;const C=Array.from(v.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(C.length===0)return;const b=C.findIndex(P=>P===g);if(b===-1)return;let S;p.key==="ArrowDown"?S=Math.min(b+1,C.length-1):S=Math.max(b-1,0),S!==b&&(p.preventDefault(),p.stopPropagation(),(R=C[S])==null||R.focus());return}return}const T=t.findIndex(C=>C.id===a);let G=T;switch(p.key){case"ArrowDown":G=Math.min(T+1,t.length-1),p.preventDefault();break;case"ArrowUp":G=Math.max(T-1,0),p.preventDefault();break;case"Home":G=0,p.preventDefault();break;case"End":G=t.length-1,p.preventDefault();break;case" ":case"Enter":a&&u(a),p.preventDefault(),p.stopPropagation();return;case"ArrowRight":{const C=j;if(C){const b=C.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),S=C.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=b??S;if(P){p.preventDefault(),P.focus();return}}break}default:p.key.length===1&&!p.metaKey&&!p.ctrlKey&&!p.altKey&&(m(g)||(o==null||o(p.key),p.preventDefault()));return}const N=t[G];N&&d(N.id)},[t,d,a,c,u,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:f,focusOption:d}},Hs=Pe.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ae=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:h("pr-twp",Hs({variant:e}),t),...r}));ae.displayName="Badge";const Wr=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Wr.displayName="Card";const Us=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Us.displayName="CardHeader";const Ys=i.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Ys.displayName="CardTitle";const Xs=i.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:h("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Xs.displayName="CardDescription";const Zr=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-p-6 tw-pt-0",t),...e}));Zr.displayName="CardContent";const Ws=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Ws.displayName="CardFooter";const qe=i.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(rs.Root,{ref:s,decorative:r,orientation:e,className:h("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));qe.displayName=rs.Root.displayName;const Jr=i.forwardRef(({className:t,...e},r)=>n.jsx(ln.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Jr.displayName=ln.Root.displayName;const Zs=i.forwardRef(({className:t,...e},r)=>n.jsx(ln.Image,{ref:r,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Zs.displayName=ln.Image.displayName;const Qr=i.forwardRef(({className:t,...e},r)=>n.jsx(ln.Fallback,{ref:r,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Qr.displayName=ln.Fallback.displayName;const to=i.createContext(void 0);function ue(){const t=i.useContext(to);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Se=Pe.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ve=lt.Trigger,eo=lt.Group,Js=lt.Portal,Qs=lt.Sub,ta=lt.RadioGroup;function ie({variant:t="default",...e}){const r=i.useMemo(()=>({variant:t}),[t]);return n.jsx(to.Provider,{value:r,children:n.jsx(lt.Root,{...e})})}const no=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=ue();return n.jsxs(lt.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Se({variant:a.variant})),...o,children:[r,n.jsx(E.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});no.displayName=lt.SubTrigger.displayName;const ro=i.forwardRef(({className:t,children:e,...r},o)=>{const s=bt();return n.jsx(lt.SubContent,{ref:o,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});ro.displayName=lt.SubContent.displayName;const ee=i.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=bt();return n.jsx(lt.Portal,{children:n.jsx(lt.Content,{ref:s,sideOffset:e,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});ee.displayName=lt.Content.displayName;const ke=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=bt(),a=ue();return n.jsx(lt.Item,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Se({variant:a.variant})),...r,dir:s})});ke.displayName=lt.Item.displayName;const Qt=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=bt(),l=ue();return n.jsxs(lt.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Se({variant:l.variant})),checked:r,...o,dir:a,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(lt.ItemIndicator,{children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Qt.displayName=lt.CheckboxItem.displayName;const oo=i.forwardRef(({className:t,children:e,...r},o)=>{const s=bt(),a=ue();return n.jsxs(lt.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Se({variant:a.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(lt.ItemIndicator,{children:n.jsx(E.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});oo.displayName=lt.RadioItem.displayName;const Ce=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(lt.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ce.displayName=lt.Label.displayName;const ye=i.forwardRef(({className:t,...e},r)=>n.jsx(lt.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ye.displayName=lt.Separator.displayName;function ea({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}ea.displayName="DropdownMenuShortcut";function Vo({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:l,canEditOrDelete:c=!1}){const[w,d]=i.useState(!1),[u,m]=i.useState(),f=i.useRef(null);i.useEffect(()=>{if(!w)return;let T=!0;const G=f.current;if(!G)return;const N=setTimeout(()=>{T&&zs(G)},300);return()=>{T=!1,clearTimeout(N)}},[w]);const p=i.useCallback(T=>{T&&T.stopPropagation(),d(!1),m(void 0),l==null||l(!1)},[l]),g=i.useCallback(async T=>{if(T&&T.stopPropagation(),!u||!s)return;await s(t.id,tr(u))&&(d(!1),m(void 0),l==null||l(!1))},[u,s,t.id,l]),y=i.useMemo(()=>{const T=new Date(t.date),G=_.formatRelativeDate(T,r["%comment_date_today%"],r["%comment_date_yesterday%"]),N=T.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return _.formatReplacementString(r["%comment_dateAtTime%"],{date:G,time:N})},[t.date,r]),v=i.useMemo(()=>t.user,[t.user]),j=i.useMemo(()=>t.user.split(" ").map(T=>T[0]).join("").toUpperCase().slice(0,2),[t.user]),I=i.useMemo(()=>_.sanitizeHtml(t.contents),[t.contents]),D=i.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(ke,{onClick:T=>{T.stopPropagation(),d(!0),m(Pc(t.contents)),l==null||l(!0)},children:[n.jsx(E.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(ke,{onClick:async T=>{T.stopPropagation(),a&&await a(t.id)},children:[n.jsx(E.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,l]);return n.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(Jr,{className:"tw-h-8 tw-w-8",children:n.jsx(Qr,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:v}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:y}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(ae,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",qn(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:f,onKeyDownCapture:T=>{T.key==="Escape"?(T.preventDefault(),T.stopPropagation(),p()):Xr(T)&&(T.preventDefault(),T.stopPropagation(),se(u)&&g())},onKeyDown:T=>{Yr(T),(T.key==="Enter"||T.key===" ")&&T.stopPropagation()},onClick:T=>{T.stopPropagation()},children:[n.jsx(Qn,{className:h('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:u,onSerializedChange:T=>m(T)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(B,{size:"icon",onClick:p,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(E.X,{})}),n.jsx(B,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!se(u),children:n.jsx(E.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:I}})]})]}),D&&n.jsxs(ie,{children:[n.jsx(ve,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"icon",children:n.jsx(E.MoreHorizontal,{})})}),n.jsx(ee,{align:"end",children:D})]})]})}const Bo={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function zc({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:l,handleSelectThread:c,threadId:w,thread:d,threadStatus:u,handleAddCommentToThread:m,handleUpdateComment:f,handleDeleteComment:p,handleReadStatusChange:g,assignableUsers:y,canUserAddCommentToThread:v,canUserAssignThreadCallback:j,canUserResolveThreadCallback:I,canUserEditOrDeleteCommentCallback:D,isRead:T=!1,autoReadDelay:G=5,onVerseRefClick:N}){const[R,C]=i.useState(Bo),[b,S]=i.useState(void 0),P=o,[F,O]=i.useState(!1),[L,K]=i.useState(!1),[H,W]=i.useState(!1),[Nt,Pt]=i.useState(!1),[Ot,nt]=i.useState(!1),[wt,z]=i.useState(T),[J,rt]=i.useState(!1),Q=i.useRef(void 0),[et,Lt]=i.useState(new Map);i.useEffect(()=>{let M=!0;return(async()=>{const it=I?await I(w):!1;M&&nt(it)})(),()=>{M=!1}},[w,I]),i.useEffect(()=>{let M=!0;if(!o){Pt(!1),Lt(new Map);return}return(async()=>{const it=j?await j(w):!1;M&&Pt(it)})(),()=>{M=!1}},[o,w,j]);const Et=i.useMemo(()=>e.filter(M=>!M.deleted),[e]);i.useEffect(()=>{let M=!0;if(!o||!D){Lt(new Map);return}return(async()=>{const it=new Map;await Promise.all(Et.map(async Ee=>{const $e=await D(Ee.id);M&&it.set(Ee.id,$e)})),M&&Lt(it)})(),()=>{M=!1}},[o,Et,D]);const $t=i.useMemo(()=>Et[0],[Et]),pe=i.useRef(null),A=i.useRef(void 0),Ht=i.useCallback(()=>{var M;(M=A.current)==null||M.call(A),C(Bo)},[]),me=i.useCallback(()=>{const M=!wt;z(M),rt(!M),g==null||g(w,M)},[wt,g,w]);i.useEffect(()=>{O(!1)},[o]),i.useEffect(()=>{if(o&&!wt&&!J){const M=setTimeout(()=>{z(!0),g==null||g(w,!0)},G*1e3);return Q.current=M,()=>clearTimeout(M)}Q.current&&(clearTimeout(Q.current),Q.current=void 0)},[o,wt,J,G,w,g]);const Rt=i.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),V=i.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const M=qn(a,r);return _.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:M})},[a,r]),U=i.useMemo(()=>Et.slice(1),[Et]),Z=i.useMemo(()=>U.length??0,[U.length]),ot=i.useMemo(()=>Z>0,[Z]),mt=i.useMemo(()=>F||Z<=2?U:U.slice(-2),[U,Z,F]),ft=i.useMemo(()=>F||Z<=2?0:Z-2,[Z,F]),kt=i.useMemo(()=>Z===1?Rt.singleReply:_.formatReplacementString(Rt.multipleReplies,{count:Z}),[Z,Rt]),ut=i.useMemo(()=>ft===1?Rt.singleReply:_.formatReplacementString(Rt.multipleReplies,{count:ft}),[ft,Rt]);i.useEffect(()=>{!o&&L&&ot&&K(!1)},[o,L,ot]);const vt=i.useCallback(async M=>{M&&M.stopPropagation();const ht=se(R)?tr(R):void 0;if(b!==void 0){await m({threadId:w,contents:ht,assignedUser:b})&&(S(void 0),ht&&Ht());return}ht&&await m({threadId:w,contents:ht})&&Ht()},[Ht,R,m,b,w]),At=i.useCallback(async M=>{const ht=se(R)?tr(R):void 0,it=await m({...M,contents:ht,assignedUser:b??M.assignedUser});return it&&ht&&Ht(),it&&b!==void 0&&S(void 0),it},[Ht,R,m,b]);if($t)return n.jsx(Wr,{role:"option","aria-selected":o,id:w,className:h("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&u!=="Resolved"&&wt,"tw-bg-background":o&&u!=="Resolved"&&wt,"tw-bg-muted":u==="Resolved","tw-bg-accent":!wt&&!o&&u!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(Zr,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[V&&n.jsx(ae,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:V}),n.jsx(B,{variant:"ghost",size:"icon",onClick:M=>{M.stopPropagation(),me()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":wt?"Mark as unread":"Mark as read",children:wt?n.jsx(E.MailOpen,{}):n.jsx(E.Mail,{})}),Ot&&u!=="Resolved"&&n.jsx(B,{variant:"ghost",size:"icon",className:h("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:M=>{M.stopPropagation(),At({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:pe,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":P},{"tw-whitespace-nowrap":!P}),children:[s&&N?n.jsx(B,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:M=>{M.stopPropagation(),N(d)},children:s}):s,n.jsxs("span",{className:t,children:[$t.contextBefore,n.jsx("span",{className:"tw-font-bold",children:$t.selectedText}),$t.contextAfter]})]})}),n.jsx(Vo,{comment:$t,localizedStrings:r,isThreadExpanded:o,threadStatus:u,handleAddCommentToThread:At,handleUpdateComment:f,handleDeleteComment:p,onEditingChange:K,canEditOrDelete:(!L&&et.get($t.id))??!1,canUserResolveThread:Ot})]}),n.jsxs(n.Fragment,{children:[ot&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(qe,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:kt})]}),!o&&se(R)&&n.jsx(Qn,{editorSerializedState:R,onSerializedChange:M=>C(M),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[ft>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:M=>{M.stopPropagation(),O(!0)},role:"button",tabIndex:0,onKeyDown:M=>{(M.key==="Enter"||M.key===" ")&&(M.preventDefault(),M.stopPropagation(),O(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(qe,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ut}),F?n.jsx(E.ChevronUp,{}):n.jsx(E.ChevronDown,{})]})]}),mt.map(M=>n.jsx("div",{children:n.jsx(Vo,{comment:M,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:f,handleDeleteComment:p,onEditingChange:K,canEditOrDelete:(!L&&et.get(M.id))??!1})},M.id)),v!==!1&&(!L||se(R))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:M=>M.stopPropagation(),onKeyDownCapture:M=>{Xr(M)&&(M.preventDefault(),M.stopPropagation(),(se(R)||b!==void 0)&&vt())},onKeyDown:M=>{Yr(M),(M.key==="Enter"||M.key===" ")&&M.stopPropagation()},children:[n.jsx(Qn,{editorSerializedState:R,onSerializedChange:M=>C(M),placeholder:u==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:M=>{A.current=M}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[b!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:_.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:qn(b,r)})}),n.jsxs(we,{open:H,onOpenChange:W,children:[n.jsx(je,{asChild:!0,children:n.jsx(B,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Nt||!y||y.length===0||!y.includes(l),"aria-label":"Assign user",children:n.jsx(E.AtSign,{})})}),n.jsx(re,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:M=>{M.key==="Escape"&&(M.stopPropagation(),W(!1))},children:n.jsx(ce,{children:n.jsx(de,{children:y==null?void 0:y.map(M=>n.jsx(ne,{onSelect:()=>{S(M!==a?M:void 0),W(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:qn(M,r)})},M||"unassigned"))})})})]}),n.jsx(B,{size:"icon",onClick:vt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!se(R)&&b===void 0,"aria-label":"Submit comment",children:n.jsx(E.ArrowUp,{})})]})]})]})]})]})})}function Kc({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:p,selectedThreadId:g,onSelectedThreadChange:y,onVerseRefClick:v}){const[j,I]=i.useState(new Set),[D,T]=i.useState();i.useEffect(()=>{g&&(I(O=>new Set(O).add(g)),T(g))},[g]);const G=r.filter(O=>O.comments.some(L=>!L.deleted)),N=G.map(O=>({id:O.id})),R=i.useCallback(O=>{I(L=>new Set(L).add(O.id)),T(O.id),y==null||y(O.id)},[y]),C=i.useCallback(O=>{const L=j.has(O);I(K=>{const H=new Set(K);return H.has(O)?H.delete(O):H.add(O),H}),T(O),y==null||y(L?void 0:O)},[j,y]),{listboxRef:b,activeId:S,handleKeyDown:P}=qs({options:N,onOptionSelect:R}),F=i.useCallback(O=>{O.key==="Escape"?(D&&j.has(D)&&(I(L=>{const K=new Set(L);return K.delete(D),K}),T(void 0),y==null||y(void 0)),O.preventDefault(),O.stopPropagation()):P(O)},[D,j,P,y]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:b,"aria-activedescendant":S??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:F,children:G.map(O=>n.jsx("div",{className:h({"tw-opacity-60":O.status==="Resolved"}),children:n.jsx(zc,{classNameForVerseText:e,comments:O.comments,localizedStrings:s,verseRef:O.verseRef,handleSelectThread:C,threadId:O.id,thread:O,isRead:O.isRead,isSelected:j.has(O.id),currentUser:o,assignedUser:O.assignedUser,threadStatus:O.status,handleAddCommentToThread:a,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:p,onVerseRefClick:v})},O.id))})}function qc({table:t}){return n.jsxs(ie,{children:[n.jsx(Qo.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(E.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(ee,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ce,{children:"Toggle columns"}),n.jsx(ye,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Qt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const He=gt.Root,na=gt.Group,Ue=gt.Value,ra=Pe.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Oe=i.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=bt();return n.jsxs(gt.Trigger,{className:h(ra({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(gt.Icon,{asChild:!0,children:n.jsx(E.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Oe.displayName=gt.Trigger.displayName;const so=i.forwardRef(({className:t,...e},r)=>n.jsx(gt.ScrollUpButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(E.ChevronUp,{className:"tw-h-4 tw-w-4"})}));so.displayName=gt.ScrollUpButton.displayName;const ao=i.forwardRef(({className:t,...e},r)=>n.jsx(gt.ScrollDownButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(E.ChevronDown,{className:"tw-h-4 tw-w-4"})}));ao.displayName=gt.ScrollDownButton.displayName;const Ae=i.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=bt();return n.jsx(gt.Portal,{children:n.jsxs(gt.Content,{ref:s,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(so,{}),n.jsx(gt.Viewport,{className:h("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(ao,{})]})})});Ae.displayName=gt.Content.displayName;const oa=i.forwardRef(({className:t,...e},r)=>n.jsx(gt.Label,{ref:r,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));oa.displayName=gt.Label.displayName;const Xt=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(gt.Item,{ref:o,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(gt.ItemIndicator,{children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(gt.ItemText,{children:e})]}));Xt.displayName=gt.Item.displayName;const sa=i.forwardRef(({className:t,...e},r)=>n.jsx(gt.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));sa.displayName=gt.Separator.displayName;function Hc({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(He,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(Oe,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(Ue,{placeholder:t.getState().pagination.pageSize})}),n.jsx(Ae,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(Xt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(E.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(E.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(E.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(E.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const zo=`
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
`;function Uc(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Sn(t,e){const r=e?`${zo}, ${e}`:zo;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Uc(o))}const En=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=i.useRef(null);i.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),i.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{Sn(l,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),Sn(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});En.displayName="Table";const Rn=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Rn.displayName="TableHeader";const Tn=i.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:h("[&_tr:last-child]:tw-border-0",t),...e}));Tn.displayName="TableBody";const aa=i.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));aa.displayName="TableFooter";function Yc(t){i.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Sn(t.current):[],a=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?a+1:a-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Xc(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Wc(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const xe=i.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const l=i.useRef(null);i.useEffect(()=>{typeof a=="function"?a(l.current):a&&"current"in a&&(a.current=l.current)},[a]),Yc(l);const c=i.useMemo(()=>l.current?Sn(l.current):[],[l]),w=i.useCallback(u=>{const{current:m}=l;if(!m||!m.parentElement)return;const f=m.closest("table"),p=f?Sn(f).filter(v=>v.tagName==="TR"):[],g=p.indexOf(m),y=c.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),Wc(p,g,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),Xc(c,y,u.key);else if(u.key==="Escape"){u.preventDefault();const v=m.closest("table");v&&v.focus()}e==null||e(u)},[l,c,e]),d=i.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:w,onFocus:d,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});xe.displayName="TableRow";const on=i.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));on.displayName="TableHead";const Me=i.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Me.displayName="TableCell";const ia=i.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));ia.displayName="TableCaption";function er({className:t,...e}){return n.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function la({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:l=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var N;const[u,m]=i.useState([]),[f,p]=i.useState([]),[g,y]=i.useState({}),[v,j]=i.useState({}),I=i.useMemo(()=>e??[],[e]),D=Bt.useReactTable({data:I,columns:t,getCoreRowModel:Bt.getCoreRowModel(),...r&&{getPaginationRowModel:Bt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:Bt.getSortedRowModel(),onColumnFiltersChange:p,getFilteredRowModel:Bt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:j,state:{sorting:u,columnFilters:f,columnVisibility:g,rowSelection:v}}),T=D.getVisibleFlatColumns();let G;return w?G=Array.from({length:10}).map((b,S)=>`skeleton-row-${S}`).map(b=>n.jsx(xe,{className:"hover:tw-bg-transparent",children:n.jsx(Me,{colSpan:T.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(er,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},b)):((N=D.getRowModel().rows)==null?void 0:N.length)>0?G=D.getRowModel().rows.map(R=>n.jsx(xe,{onClick:()=>l(R,D),"data-state":R.getIsSelected()&&"selected",children:R.getVisibleCells().map(C=>n.jsx(Me,{children:Bt.flexRender(C.column.columnDef.cell,C.getContext())},C.id))},R.id)):G=n.jsx(xe,{children:n.jsx(Me,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(qc,{table:D}),n.jsxs(En,{stickyHeader:a,children:[n.jsx(Rn,{stickyHeader:a,children:D.getHeaderGroups().map(R=>n.jsx(xe,{children:R.headers.map(C=>n.jsx(on,{className:"tw-p-0",children:C.isPlaceholder?void 0:Bt.flexRender(C.column.columnDef.header,C.getContext())},C.id))},R.id))}),n.jsx(Tn,{children:G})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(B,{variant:"outline",size:"sm",onClick:()=>D.previousPage(),disabled:!D.getCanPreviousPage(),children:"Previous"}),n.jsx(B,{variant:"outline",size:"sm",onClick:()=>D.nextPage(),disabled:!D.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Hc,{table:D})]})}function Zc({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=i.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Hi,{options:a,children:e})})}const ca=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Ko=(t,e)=>t[e]??e;function da({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Ko(r,"%webView_error_dump_header%"),a=Ko(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(E.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Jc=Object.freeze([...ca,"%webView_error_dump_copied_message%"]);function Qc({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[l,c]=i.useState(!1),w=()=>{c(!0),e&&e()},d=u=>{u||c(!1)};return n.jsxs(we,{onOpenChange:d,children:[n.jsx(je,{asChild:!0,children:o}),n.jsxs(re,{id:a,className:h("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(xt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(da,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var wa=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(wa||{});function td({id:t,label:e,groups:r}){const[o,s]=i.useState(Object.fromEntries(r.map((d,u)=>d.itemType===0?[u,[]]:void 0).filter(d=>!!d))),[a,l]=i.useState({}),c=(d,u)=>{const m=!o[d][u];s(p=>(p[d][u]=m,{...p}));const f=r[d].items[u];f.onUpdate(f.id,m)},w=(d,u)=>{l(f=>(f[d]=u,{...f}));const m=r[d].items.find(f=>f.id===u);m?m.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(ie,{children:[n.jsx(ve,{asChild:!0,children:n.jsxs(B,{variant:"default",children:[n.jsx(E.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(E.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(ee,{children:r.map((d,u)=>n.jsxs("div",{children:[n.jsx(Ce,{children:d.label}),n.jsx(eo,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((m,f)=>n.jsx("div",{children:n.jsx(Qt,{checked:o[u][f],onCheckedChange:()=>c(u,f),children:m.label})},m.id))}):n.jsx(ta,{value:a[u],onValueChange:m=>w(u,m),children:d.items.map(m=>n.jsx("div",{children:n.jsx(oo,{value:m.id,children:m.label})},m.id))})}),n.jsx(ye,{})]},d.label))})]})})}function ed({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:l,handleSupportLinkClick:c}){const w=new _.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,m)=>u+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(E.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(E.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(E.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function nd({id:t,versionHistory:e}){const[r,o]=i.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),u=d.getUTCFullYear()-1970,m=d.getUTCMonth(),f=d.getUTCDate()-1;let p="";return u>0?p=`${u.toString()} year${u===1?"":"s"} ago`:m>0?p=`${m.toString()} month${m===1?"":"s"} ago`:f===0?p="today":p=`${f.toString()} day${f===1?"":"s"} ago`,p}const l=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function rd({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const l=i.useMemo(()=>_.formatBytes(r),[r]),w=(d=>{const u=new Intl.DisplayNames(_.getCurrentLocale(),{type:"language"});return d.map(m=>u.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(nd,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function ua({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:u=void 0,isDisabled:m=!1,sortSelected:f=!1,icon:p=void 0,className:g=void 0,variant:y="ghost",id:v}){const[j,I]=i.useState(!1),D=i.useCallback(S=>{var F;const P=(F=t.find(O=>O.label===S))==null?void 0:F.value;P&&r(e.includes(P)?e.filter(O=>O!==P):[...e,P])},[t,e,r]),T=()=>w||o,G=i.useMemo(()=>{if(!f)return t;const S=t.filter(F=>F.starred).sort((F,O)=>F.label.localeCompare(O.label)),P=t.filter(F=>!F.starred).sort((F,O)=>{const L=e.includes(F.value),K=e.includes(O.value);return L&&!K?-1:!L&&K?1:F.label.localeCompare(O.label)});return[...S,...P]},[t,e,f]),N=()=>{r(t.map(S=>S.value))},R=()=>{r([])},C=d??j,b=u??I;return n.jsx("div",{id:v,className:g,children:n.jsxs(we,{open:C,onOpenChange:b,children:[n.jsx(je,{asChild:!0,children:n.jsxs(B,{variant:y,role:"combobox","aria-expanded":C,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[p&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:T()})]}),n.jsx(E.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(re,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(ce,{children:[n.jsx(Le,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:N,children:a}),n.jsx(B,{variant:"ghost",size:"sm",onClick:R,children:l})]}),n.jsxs(de,{children:[n.jsx(Ye,{children:c}),n.jsx(te,{children:G.map(S=>n.jsxs(ne,{value:S.label,onSelect:D,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(E.Check,{className:h("tw-h-4 tw-w-4",e.includes(S.value)?"tw-opacity-100":"tw-opacity-0")})}),S.starred&&n.jsx(E.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:S.label}),S.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:S.secondaryLabel})]},S.label))})]})]})})]})})}function od({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:w,className:d,badgesPlaceholder:u,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(ua,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var p;return n.jsxs(ae,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==f)),children:n.jsx(E.X,{className:"tw-h-3 tw-w-3"})}),(p=t.find(g=>g.value===f))==null?void 0:p.label]},f)})}):n.jsx(xt,{children:u})]})}const pa=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),qo=(t,e)=>t[e]??e;function ma({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:a=!0,className:l="tw-h-6 tw-w-6",variant:c="ghost"}){const w=i.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(B,{"aria-label":"Undo",className:l,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(E.Undo,{})})}),n.jsx(St,{children:n.jsxs("p",{children:[qo(s,"%undoButton_tooltip%"),a&&` (${w?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(B,{"aria-label":"Redo",className:l,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(E.Redo,{})})}),n.jsx(St,{children:n.jsxs("p",{children:[qo(s,"%redoButton_tooltip%"),a&&` (${w?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function fa({children:t,editorRef:e}){const r=i.useRef(null);return i.useEffect(()=>{var l;const o=/Macintosh/i.test(navigator.userAgent),s=((l=r.current)==null?void 0:l.querySelector(".editor-input"))??void 0,a=c=>{var d,u,m,f;if(!s||document.activeElement!==s)return;const w=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(d=e.current)==null||d.undo()):c.shiftKey&&w==="z"&&(c.preventDefault(),(u=e.current)==null||u.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(m=e.current)==null||m.undo()):(w==="y"||c.shiftKey&&w==="z")&&(c.preventDefault(),(f=e.current)==null||f.redo())}};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[e]),n.jsx("div",{ref:r,children:t})}const Xe=i.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Xe.displayName="Input";const sd=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function ad({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=i.useRef(null),l=i.useRef(null),c=i.useRef(!1),[w,d]=i.useState(t),[u,m]=i.useState(r),[f,p]=i.useState(!1);i.useEffect(()=>{d(t)},[t]),i.useEffect(()=>{u!==r&&m(r)},[r]);const g=v=>{c.current=!1,p(v),v||(w!=="custom"||u?(e(w),o(u)):(d(t),m(r)))},y=v=>{var j,I,D,T;v.stopPropagation(),document.activeElement===l.current&&v.key==="ArrowDown"||v.key==="ArrowRight"?((j=a.current)==null||j.focus(),c.current=!0):document.activeElement===a.current&&v.key==="ArrowUp"?((I=l.current)==null||I.focus(),c.current=!1):document.activeElement===a.current&&v.key==="ArrowLeft"&&((D=a.current)==null?void 0:D.selectionStart)===0&&((T=l.current)==null||T.focus(),c.current=!1),w==="custom"&&v.key==="Enter"&&(document.activeElement===l.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(ie,{open:f,onOpenChange:g,children:[n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(ve,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:sd(t,s,r)})})}),n.jsx(St,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(ee,{style:{zIndex:Lr},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:y,onMouseMove:()=>{var v;c.current&&((v=a.current)==null||v.focus())},children:[n.jsx(Ce,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(ye,{}),n.jsx(Qt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Jt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Qt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Jt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Qt,{ref:l,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:v=>{var j;v.stopPropagation(),c.current=!0,(j=a.current)==null||j.focus()},onSelect:v=>v.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Xe,{tabIndex:0,onMouseDown:v=>{v.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:u,onKeyDown:v=>{v.key==="Enter"||v.key==="ArrowUp"||v.key==="ArrowDown"||v.key==="ArrowLeft"||v.key==="ArrowRight"||v.stopPropagation()},maxLength:1,onChange:v=>m(v.target.value)})]})})]})]})}const id=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(E.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(E.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(E.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),ld=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),_.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function cd({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(ie,{children:[n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Zo.TooltipTrigger,{asChild:!0,children:n.jsx(ve,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:id(t,r)})})}),n.jsx(St,{children:n.jsx("p",{children:ld(t,r)})})]})}),n.jsxs(ee,{style:{zIndex:Lr},children:[n.jsx(Ce,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(ye,{}),n.jsxs(Qt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(E.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Qt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(E.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Qt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(E.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const ha=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function dd({icon:t,className:e}){const r=t??E.Ban;return n.jsx(r,{className:e,size:16})}function Ho({item:t,localizedStrings:e}){return n.jsxs(ne,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(dd,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(cs,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function ga({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=i.useState(""),[a,l]=i.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const w=e.filter(u=>{var m;return(m=u.marker)==null?void 0:m.toLowerCase().includes(c)}),d=e.filter(u=>u.title.toLowerCase().includes(c)&&!w.includes(u));return[w,d]},[o,e]);return n.jsxs(ce,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(Le,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(de,{children:[n.jsx(Ye,{children:t["%markerMenu_noResults%"]}),n.jsx(te,{children:a.map(c=>{var w;return n.jsx(Ho,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})}),l.length>0&&n.jsxs(n.Fragment,{children:[a.length>0&&n.jsx(cr,{alwaysRender:!0}),n.jsx(te,{children:l.map(c=>{var w;return n.jsx(Ho,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function wd(t,e,r,o){if(!o||o==="p")return[];const s=_.usfmMarkers[o];if(!(s!=null&&s.children))return[];const a=[];return Object.entries(s.children).forEach(([,l])=>{a.push(...l.map(c=>({marker:c,title:r[_.usfmMarkers[c].description]??_.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),a.sort((l,c)=>(l.marker??l.title).localeCompare(c.marker??c.title))}function ud(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function pd(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const md={type:"USJ",version:"3.1",content:[{type:"para"}]};function fd({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:a,editorOptions:l,defaultMarkerMenuTrigger:c,localizedStrings:w,parentEditorRef:d}){const u=i.useRef(null),m=i.useRef(null),f=i.useRef(null),p=i.useRef(null);i.useLayoutEffect(()=>{if(!p.current)return;const{width:V}=p.current.getBoundingClientRect();V>0&&(p.current.style.width=`${V}px`)},[]);const[g,y]=i.useState("generated"),[v,j]=i.useState("*"),[I,D]=i.useState("f"),[T,G]=i.useState(!1),[N,R]=i.useState(!0),[C,b]=i.useState(!1),S=i.useRef(!1),P=i.useRef(""),[F,O]=i.useState(!1),[L,K]=i.useState(),[H,W]=i.useState(),[Nt,Pt]=i.useState(),[Ot,nt]=i.useState(),wt=i.useRef(null),z=i.useMemo(()=>({...l,markerMenuTrigger:c,hasExternalUI:!0,view:{...l.view??Jt.getDefaultViewOptions(),noteMode:"expanded"}}),[l,c]),J=i.useMemo(()=>wd(u,()=>O(!1),w,Ot),[w,Ot]);i.useEffect(()=>{var V;F||(V=u.current)==null||V.focus()},[I,F]),i.useEffect(()=>{var Z,ot;let V;S.current=!1,R(!0);const U=e==null?void 0:e.at(0);if(U&&Jt.isInsertEmbedOpOfType("note",U)){const mt=(Z=U.insert.note)==null?void 0:Z.caller;let ft="custom";mt===Jt.GENERATOR_NOTE_CALLER?ft="generated":mt===Jt.HIDDEN_NOTE_CALLER?ft="hidden":mt&&j(mt),y(ft),D(((ot=U.insert.note)==null?void 0:ot.style)??"f"),V=setTimeout(()=>{var kt;(kt=u.current)==null||kt.applyUpdate([U])},0)}return()=>{V&&clearTimeout(V)}},[e,a]);const rt=i.useCallback((V,U,Z=!1)=>{var mt,ft,kt;const ot=(ft=(mt=u.current)==null?void 0:mt.getNoteOps(0))==null?void 0:ft.at(0);if(ot&&Jt.isInsertEmbedOpOfType("note",ot)){if(ot.insert.note){let ut;V==="custom"?ut=U:V==="generated"?ut=Jt.GENERATOR_NOTE_CALLER:ut=Jt.HIDDEN_NOTE_CALLER,ot.insert.note.caller=ut}r==null||r([ot]),Z&&d&&a&&((kt=d.current)==null||kt.replaceEmbedUpdate(a,[ot]))}},[a,r,d]),Q=i.useCallback(()=>{rt(g,v,!0),o()},[g,v,o,rt]),et=i.useRef(Q);i.useLayoutEffect(()=>{et.current=Q});const Lt=i.useRef({book:s.book,chapterNum:s.chapterNum});i.useLayoutEffect(()=>{(Lt.current.book!==s.book||Lt.current.chapterNum!==s.chapterNum)&&(Lt.current={book:s.book,chapterNum:s.chapterNum},et.current())},[s.book,s.chapterNum]);const Et=()=>{var U;const V=(U=m.current)==null?void 0:U.getElementsByClassName("editor-input")[0];V!=null&&V.textContent&&navigator.clipboard.writeText(V.textContent)},$t=i.useCallback(V=>{y(V),rt(V,v)},[v,rt]),pe=i.useCallback(V=>{j(V),rt(g,V)},[g,rt]),A=V=>{var Z,ot,mt,ft,kt;D(V);const U=(ot=(Z=u.current)==null?void 0:Z.getNoteOps(0))==null?void 0:ot.at(0);if(U&&Jt.isInsertEmbedOpOfType("note",U)){U.insert.note&&(U.insert.note.style=V);const ut=(ft=(mt=U.insert.note)==null?void 0:mt.contents)==null?void 0:ft.ops;I!=="x"&&V==="x"?ut==null||ut.forEach(vt=>ud(vt)):I==="x"&&V!=="x"&&(ut==null||ut.forEach(vt=>pd(vt))),(kt=u.current)==null||kt.applyUpdate([U,{delete:1}])}},Ht=V=>{nt(V.contextMarker),b(V.canRedo)},me=i.useCallback(V=>{var Z,ot,mt,ft,kt;const U=(ot=(Z=u.current)==null?void 0:Z.getNoteOps(0))==null?void 0:ot.at(0);if(U&&Jt.isInsertEmbedOpOfType("note",U)){V.content.length>1&&setTimeout(()=>{var At;(At=u.current)==null||At.applyUpdate([{retain:2},{delete:1}])},0);const ut=(mt=U.insert.note)==null?void 0:mt.style,vt=(kt=(ft=U.insert.note)==null?void 0:ft.contents)==null?void 0:kt.ops;if(ut||G(!1),G(ut==="x"?!!(vt!=null&&vt.every(At=>{var ht,it;if(!((ht=At.attributes)!=null&&ht.char))return!0;const M=((it=At.attributes)==null?void 0:it.char).style;return M==="xt"||M==="xo"||M==="xq"})):!!(vt!=null&&vt.every(At=>{var ht,it;if(!((ht=At.attributes)!=null&&ht.char))return!0;const M=((it=At.attributes)==null?void 0:it.char).style;return M==="ft"||M==="fr"||M==="fq"}))),!S.current){S.current=!0,P.current=JSON.stringify(U),R(!0);return}R(JSON.stringify(U)===P.current),rt(g,v)}else G(!1),R(!0)},[g,v,rt]),Rt=i.useCallback(()=>{const V=window.getSelection();if(f.current&&J.length&&V&&V.rangeCount>0){const U=V.getRangeAt(0).getBoundingClientRect(),Z=f.current.getBoundingClientRect();K(U.left-Z.left),W(U.top-Z.top),Pt(U.height),O(!0)}},[J,f]);return i.useEffect(()=>{const V=()=>{F&&O(!1)};return window.addEventListener("click",V),()=>{window.removeEventListener("click",V)}},[F]),i.useEffect(()=>{var V;F&&((V=wt.current)==null||V.focus())},[F]),i.useEffect(()=>{var Z;const V=((Z=m.current)==null?void 0:Z.querySelector(".editor-input"))??void 0,U=ot=>{!F&&V&&document.activeElement===V&&ot.key===c?(ot.preventDefault(),Rt()):F&&ot.key==="Escape"&&(ot.preventDefault(),O(!1))};return document.addEventListener("keydown",U),()=>{document.removeEventListener("keydown",U)}},[F,Rt,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:p,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(cd,{isTypeSwitchable:T,noteType:I,handleNoteTypeChange:A,localizedStrings:w}),n.jsx(ad,{callerType:g,updateCallerType:$t,customCaller:v,updateCustomCaller:pe,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(ma,{onUndoClick:()=>{var V;return(V=u.current)==null?void 0:V.undo()},onRedoClick:()=>{var V;return(V=u.current)==null?void 0:V.redo()},canUndo:!N,canRedo:C,localizedStrings:w}),n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(B,{onClick:Q,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(E.Check,{})})}),n.jsx(St,{children:n.jsx("p",{children:w["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(B,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(E.X,{})})}),n.jsx(St,{children:n.jsx("p",{children:w["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(fa,{editorRef:u,children:n.jsx(Jt.Editorial,{options:z,onStateChange:Ht,onUsjChange:me,defaultUsj:md,onScrRefChange:()=>{},scrRef:s,ref:u})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(B,{onClick:Et,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(E.Copy,{})})}),n.jsx(St,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:f,style:{top:0,left:0,height:0,width:0}}),n.jsxs(we,{open:F,children:[n.jsx(ps,{className:"tw-absolute",style:{top:H,left:L,height:Nt,width:0,pointerEvents:"none"}}),n.jsx(re,{className:"tw-w-[500px] tw-p-0",onClick:V=>{V.preventDefault(),V.stopPropagation()},children:n.jsx(ga,{markerMenuItems:J,localizedStrings:w,searchRef:wt})})]})]})}const hd=Object.freeze([...ha,...Object.entries(_.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...pa]);function xa(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function gd(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&a.push(l),l=[c]):l.push(c)}),l.length>0&&a.push(l),a.map((c,w)=>{const d=w===a.length-1;return n.jsxs("p",{children:[io(t,c,r,!0,s),d&&o]},xa(t,c))})}function io(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const l=`${t}-text-${a.slice(0,10)}`;if(o){const c=h(`usfm_${t}`);return n.jsx("span",{className:c,children:a},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(E.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(E.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return xd(a,xa(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function xd(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(E.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),io(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function ba({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,u=s&&n.jsxs("span",{className:h("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=l&&n.jsxs(n.Fragment,{children:[io(t.marker,[l],o,!1)," "]}),f=e==="horizontal"?"horizontal":"vertical",p=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",y=h(f,p);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:[w,u]}),n.jsx("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:m}),n.jsx("div",{className:h("textual-note-body tw-flex tw-flex-col tw-gap-1",g,y),children:c&&c.length>0&&n.jsx(n.Fragment,{children:gd(t.marker,c,o,d)})})]})}function bd({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const u=w??_.getFormatCallerFunction(r,void 0),m=(I,D)=>{d==null||d(I,D,s)},f=a?r.findIndex(I=>I===a):-1,[p,g]=i.useState(f),y=(I,D,T)=>{if(r.length)switch(I.key){case"Enter":case" ":I.preventDefault(),d==null||d(D,T,s);break}},v=I=>{if(r.length)switch(I.key){case"ArrowDown":I.preventDefault(),g(D=>Math.min(D+1,r.length-1));break;case"ArrowUp":I.preventDefault(),g(D=>Math.max(D-1,0));break}},j=i.useRef([]);return i.useEffect(()=>{var I;p>=0&&p<j.current.length&&((I=j.current[p])==null||I.focus())},[p]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:p<0?0:-1,className:h("tw-h-full tw-overflow-y-auto",t),onKeyDown:v,children:n.jsx("ul",{className:h("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((I,D)=>{const T=I===a,G=`${s}-${D}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:N=>{j.current[D]=N},role:"option","aria-selected":T,"data-marker":I.marker,"data-state":T?"selected":void 0,tabIndex:D===p?0:-1,className:h("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(I,D),onKeyDown:N=>y(N,I,D),children:n.jsx(ba,{footnote:I,layout:o,formatCaller:()=>u(I.caller,D),showMarkers:l})},G),D<r.length-1&&o==="vertical"&&n.jsx(qe,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function vd(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function yd({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],l=i.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const u=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(u)||(w.add(u),c.push(d))}),c},[t]);return n.jsxs(En,{stickyHeader:!0,children:[n.jsx(Rn,{stickyHeader:!0,children:n.jsxs(xe,{children:[n.jsx(on,{children:s}),n.jsx(on,{children:a})]})}),n.jsx(Tn,{children:l.length>0&&l.map(c=>n.jsxs(xe,{onClick:()=>{e(c.reference)},children:[n.jsx(Me,{children:_.formatScrRef(c.reference,"English")}),n.jsx(Me,{className:o,children:vd(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const pr=i.forwardRef(({className:t,...e},r)=>n.jsx(Tr.Root,{ref:r,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Tr.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})})}));pr.displayName=Tr.Root.displayName;const jd=t=>{if(t==="asc")return n.jsx(E.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(E.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},In=(t,e,r)=>n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsxs(Mt,{className:h("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),jd(t.getIsSorted())]}),n.jsx(St,{side:"bottom",children:e})]})}),Nd=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>In(e,t)}),kd=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>In(r,t)}),_d=t=>({accessorKey:"count",header:({column:e})=>In(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),kr=(t,e,r,o,s,a)=>{let l=[...r];t.forEach(w=>{e==="approved"?l.includes(w)||l.push(w):l=l.filter(d=>d!==w)}),o(l);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},Cd=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>In(a,t,"tw-justify-center"),cell:({row:a})=>{const l=a.getValue("status"),c=a.getValue("item");return n.jsxs(ur,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(en,{onClick:w=>{w.stopPropagation(),kr([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(E.CircleCheckIcon,{})}),n.jsx(en,{onClick:w=>{w.stopPropagation(),kr([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(E.CircleXIcon,{})}),n.jsx(en,{onClick:w=>{w.stopPropagation(),kr([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(E.CircleHelpIcon,{})})]})}}),Sd=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Ed=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Rd=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},va=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Td=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Id=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Dd=(t,e,r)=>t.map(o=>{const s=_.isString(o.key)?o.key:o.key[0];return{items:_.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||va(s,e,r),occurrences:o.occurrences||[]}}),fe=(t,e)=>t[e]??e;function Md({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:l,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:u=!1,classNameForVerseText:m,onItemSelected:f}){const p=fe(r,"%webView_inventory_all%"),g=fe(r,"%webView_inventory_approved%"),y=fe(r,"%webView_inventory_unapproved%"),v=fe(r,"%webView_inventory_unknown%"),j=fe(r,"%webView_inventory_scope_currentBook%"),I=fe(r,"%webView_inventory_scope_chapter%"),D=fe(r,"%webView_inventory_scope_verse%"),T=fe(r,"%webView_inventory_filter_text%"),G=fe(r,"%webView_inventory_show_additional_items%"),N=fe(r,"%webView_inventory_no_results%"),[R,C]=i.useState(!1),[b,S]=i.useState("all"),[P,F]=i.useState(""),[O,L]=i.useState([]),K=i.useMemo(()=>{const z=t??[];return z.length===0?[]:Dd(z,s,a)},[t,s,a]),H=i.useMemo(()=>{if(R)return K;const z=[];return K.forEach(J=>{const rt=J.items[0],Q=z.find(et=>et.items[0]===rt);Q?(Q.count+=J.count,Q.occurrences=Q.occurrences.concat(J.occurrences)):z.push({items:[rt],count:J.count,occurrences:J.occurrences,status:J.status})}),z},[R,K]),W=i.useMemo(()=>H.length===0?[]:Id(H,b,P),[H,b,P]),Nt=i.useMemo(()=>{var rt,Q;if(!R)return w;const z=(rt=o==null?void 0:o.tableHeaders)==null?void 0:rt.length;if(!z)return w;const J=[];for(let et=0;et<z;et++)J.push(kd(((Q=o==null?void 0:o.tableHeaders)==null?void 0:Q[et])||"Additional Item",et+1));return[...J,...w]},[o==null?void 0:o.tableHeaders,w,R]);i.useEffect(()=>{W.length===0?L([]):W.length===1&&L(W[0].items)},[W]);const Pt=(z,J)=>{J.setRowSelection(()=>{const Q={};return Q[z.index]=!0,Q});const rt=z.original.items;L(rt),f&&rt.length>0&&f(rt[0])},Ot=z=>{if(z==="book"||z==="chapter"||z==="verse")c(z);else throw new Error(`Invalid scope value: ${z}`)},nt=z=>{if(z==="all"||z==="approved"||z==="unapproved"||z==="unknown")S(z);else throw new Error(`Invalid status filter value: ${z}`)},wt=i.useMemo(()=>{if(H.length===0||O.length===0)return[];const z=H.filter(J=>_.deepEqual(R?J.items:[J.items[0]],O));if(z.length>1)throw new Error("Selected item is not unique");return z.length===0?[]:z[0].occurrences},[O,R,H]);return n.jsx("div",{id:d,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(He,{onValueChange:z=>nt(z),defaultValue:b,children:[n.jsx(Oe,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ue,{placeholder:"Select filter"})}),n.jsxs(Ae,{children:[n.jsx(Xt,{value:"all",children:p}),n.jsx(Xt,{value:"approved",children:g}),n.jsx(Xt,{value:"unapproved",children:y}),n.jsx(Xt,{value:"unknown",children:v})]})]}),n.jsxs(He,{onValueChange:z=>Ot(z),defaultValue:l,children:[n.jsx(Oe,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ue,{placeholder:"Select scope"})}),n.jsxs(Ae,{children:[n.jsx(Xt,{value:"book",children:j}),n.jsx(Xt,{value:"chapter",children:I}),n.jsx(Xt,{value:"verse",children:D})]})]}),n.jsx(Xe,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:T,value:P,onChange:z=>{F(z.target.value)}}),o&&n.jsx(Ct,{children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(pr,{className:"tw-m-1 tw-flex-shrink-0",checked:R,onCheckedChange:z=>{C(z)}}),n.jsx(xt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??G})]})}),n.jsx(St,{children:(o==null?void 0:o.checkboxText)??G})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(la,{columns:Nt,data:W,onRowClickHandler:Pt,stickyHeader:!0,isLoading:u,noResultsMessage:N})}),wt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(yd,{classNameForText:m,occurrenceData:wt,setScriptureReference:e,localizedStrings:r})})]})})}function Od(t){const e=new Map;return t.forEach(r=>{const o=e.get(r.projectId),s={scrollGroupId:r.scrollGroupId,scrollGroupScrRefLabel:r.scrollGroupScrRefLabel};o?o.some(a=>a.scrollGroupId===r.scrollGroupId)||o.push(s):e.set(r.projectId,[s])}),e.forEach(r=>r.sort((o,s)=>o.scrollGroupId-s.scrollGroupId)),e}function Uo(t,e,r){return t.some(o=>o.projectId===e&&o.scrollGroupId===r)}function Hn(t){const e=Od(t.openTabs);if(t.mode==="project"){const s=t.selection.projectId;return t.projects.map(a=>{const l=e.get(a.id)??[];return{rowKey:a.id,projectId:a.id,shortName:a.shortName,fullName:a.fullName,language:a.language,languageCode:a.languageCode,scrollGroupId:void 0,scrollGroupScrRefLabel:void 0,openGroups:l.map(c=>c.scrollGroupId),isSelected:s===a.id,isMuted:l.length===0,isBoundButClosed:!1}})}let r=[];t.mode==="project-multi"?r=t.selection.pairs:t.selection.projectId!==void 0&&(r=[{projectId:t.selection.projectId,scrollGroupId:t.selection.scrollGroupId}]);const o=[];return t.projects.forEach(s=>{const a=e.get(s.id);if(!a||a.length===0){o.push({rowKey:`project:${s.id}`,projectId:s.id,shortName:s.shortName,fullName:s.fullName,language:s.language,languageCode:s.languageCode,scrollGroupId:void 0,scrollGroupScrRefLabel:void 0,openGroups:[],isSelected:Uo(r,s.id,void 0),isMuted:!0,isBoundButClosed:!1});return}a.forEach(l=>{o.push({rowKey:`tab:${s.id}:${l.scrollGroupId}`,projectId:s.id,shortName:s.shortName,fullName:s.fullName,language:s.language,languageCode:s.languageCode,scrollGroupId:l.scrollGroupId,scrollGroupScrRefLabel:l.scrollGroupScrRefLabel,openGroups:[],isSelected:Uo(r,s.id,l.scrollGroupId),isMuted:!1,isBoundButClosed:!1})})}),r.forEach(s=>{if(s.scrollGroupId===void 0||o.some(l=>l.projectId===s.projectId&&l.scrollGroupId===s.scrollGroupId))return;const a=t.projects.find(l=>l.id===s.projectId);a&&o.push({rowKey:`closed:${a.id}:${s.scrollGroupId}`,projectId:a.id,shortName:a.shortName,fullName:a.fullName,language:a.language,languageCode:a.languageCode,scrollGroupId:s.scrollGroupId,scrollGroupScrRefLabel:void 0,openGroups:[],isSelected:!0,isMuted:!1,isBoundButClosed:!0})}),o}function Yo(t){return t.isBoundButClosed?!1:t.scrollGroupId!==void 0?!0:t.openGroups.length>0}function _r(t,e){if(t.isSelected!==e.isSelected)return t.isSelected?-1:1;const r=t.shortName.localeCompare(e.shortName,void 0,{sensitivity:"base"});if(r!==0)return r;const o=t.scrollGroupId??Number.POSITIVE_INFINITY,s=e.scrollGroupId??Number.POSITIVE_INFINITY;return o-s}function ya(t,e){if(!e)return[{kind:"flat",rows:[...t].sort(_r)}];const r=t.filter(Yo).sort(_r),o=t.filter(a=>!Yo(a)).sort(_r),s=[];return r.length>0&&s.push({kind:"openTabs",rows:r}),o.length>0&&s.push({kind:"other",rows:o}),s}const Ad={searchPlaceholder:"Search projects & resources",filterAriaLabel:"Filter",groupSectionLabel:"Group",filterSectionLabel:"Filter",filterGroupByOpenTabs:"By open tabs",filterShowSelectedOnly:"Show selected only",openTabsSectionHeading:"Open tabs",otherProjectsSectionHeading:"Other projects",boundButClosedTooltip:"Bound to {group} · not currently open",openButtonLabel:"Open",selectAll:"Select all",clearAll:"Clear all"};function Pd(t){return{...Ad,...t}}function sn(t){return t>=0&&t<=25?String.fromCharCode(65+t):String(t)}const Ld={backgroundImage:"linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"};function $d({scrollGroupId:t,isBoundButClosed:e}){const r=sn(t);return e?n.jsx(ae,{variant:"outline",className:"tw-relative tw-text-muted-foreground",style:Ld,children:r}):n.jsx(ae,{variant:"secondary",children:r})}function Fd({row:t,mode:e,strings:r,onClick:o,onOpen:s}){const a=!!(t.language||t.languageCode),l=n.jsx(E.Check,{className:h("tw-h-4 tw-w-4",t.isSelected?"tw-opacity-100":"tw-opacity-0")});let c;e==="project"?t.openGroups.length>0&&(c=n.jsx("span",{className:"tw-ms-auto tw-flex tw-shrink-0 tw-gap-1",children:t.openGroups.map(m=>n.jsx(ae,{variant:"secondary",children:sn(m)},m))})):t.scrollGroupId!==void 0&&(c=n.jsxs("span",{className:"tw-ms-auto tw-flex tw-shrink-0 tw-items-center tw-gap-2",children:[n.jsx($d,{scrollGroupId:t.scrollGroupId,isBoundButClosed:t.isBoundButClosed}),t.isBoundButClosed&&s&&n.jsxs(B,{size:"sm",variant:"ghost",className:"tw-h-6 tw-gap-1 tw-px-2 tw-text-xs",onClick:m=>{m.stopPropagation(),s(t)},onMouseDown:m=>m.stopPropagation(),"aria-label":r.openButtonLabel,title:r.openButtonLabel,children:[n.jsx(E.ArrowRight,{className:"tw-h-3 tw-w-3"}),r.openButtonLabel]})]}));const w=n.jsxs(ne,{value:`${t.rowKey} ${t.shortName} ${t.fullName} ${t.language??""} ${t.languageCode??""}`,onSelect:()=>o(t),className:"tw-flex tw-items-center tw-gap-2 tw-pe-4 tw-@container","data-selected":t.isSelected,children:[n.jsx("span",{className:"tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center",children:l}),n.jsx("span",{className:"tw-w-16 tw-shrink-0 tw-truncate",children:t.shortName}),n.jsx("span",{className:"tw-hidden tw-min-w-0 tw-flex-1 tw-truncate tw-text-start tw-text-muted-foreground @[250px]:tw-block",children:t.fullName}),c]}),d=t.scrollGroupId!==void 0?sn(t.scrollGroupId):void 0,u=t.isBoundButClosed&&d?r.boundButClosedTooltip.replace("{group}",d):void 0;return n.jsxs(Dt,{delayDuration:200,children:[n.jsx(Mt,{asChild:!0,children:w}),n.jsxs(St,{side:"right",align:"start",sideOffset:8,collisionPadding:16,className:"tw-max-w-xs",style:{zIndex:lr},children:[n.jsx("div",{className:"tw-font-semibold",children:t.fullName}),a&&n.jsxs("div",{className:"tw-text-sm",children:[t.language,t.languageCode&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" (",t.languageCode,")"]})]}),!t.isBoundButClosed&&t.scrollGroupScrRefLabel&&d&&n.jsxs("div",{className:"tw-text-sm",children:[t.scrollGroupScrRefLabel,n.jsxs("span",{className:"tw-text-muted-foreground",children:[" (",d,")"]})]}),u&&n.jsx("div",{className:"tw-text-sm tw-italic",children:u})]})]})}function Gd({groupByOpenTabs:t,onChangeGroupByOpenTabs:e,showSelectedOnly:r,onChangeShowSelectedOnly:o,strings:s}){const a=!!r;return n.jsxs(ie,{children:[n.jsx(ve,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"sm",className:h("tw-h-8 tw-w-8 tw-shrink-0 tw-p-0",a&&"tw-bg-accent tw-text-accent-foreground hover:tw-bg-accent/80 data-[state=open]:tw-bg-accent"),"aria-label":s.filterAriaLabel,"aria-pressed":a,title:s.filterAriaLabel,onMouseDown:l=>l.preventDefault(),children:n.jsx(E.Filter,{className:"tw-h-4 tw-w-4"})})}),n.jsxs(ee,{align:"end",className:"tw-w-56",style:{zIndex:lr},children:[n.jsx(Ce,{children:s.groupSectionLabel}),n.jsx(Qt,{checked:t,onCheckedChange:e,onSelect:l=>l.preventDefault(),children:s.filterGroupByOpenTabs}),o&&n.jsxs(n.Fragment,{children:[n.jsx(ye,{}),n.jsx(Ce,{children:s.filterSectionLabel}),n.jsx(Qt,{checked:!!r,onCheckedChange:o,onSelect:l=>l.preventDefault(),children:s.filterShowSelectedOnly})]})]})]})}function Vd(t){const[e,r]=i.useState(!1),[o,s]=i.useState(""),[a,l]=i.useState(t.defaultGroupByOpenTabs??!0),[c,w]=i.useState(!1),d=Pd(t.localizedStrings),u=i.useMemo(()=>t.mode==="project"?Hn({mode:"project",projects:t.projects,openTabs:t.openTabs,selection:t.selection}):t.mode==="project-multi"?Hn({mode:"project-multi",projects:t.projects,openTabs:t.openTabs,selection:t.selection}):Hn({mode:"projectScrollGroup",projects:t.projects,openTabs:t.openTabs,selection:t.selection}),[t.mode,t.projects,t.openTabs,t.selection]),m=i.useMemo(()=>{const N=o.trim().toLowerCase();let R=u;return N&&(R=R.filter(C=>C.shortName.toLowerCase().includes(N)||C.fullName.toLowerCase().includes(N)||(C.language??"").toLowerCase().includes(N)||(C.languageCode??"").toLowerCase().includes(N))),t.mode==="project-multi"&&c&&(R=R.filter(C=>C.isSelected)),R},[u,o,t.mode,c]),f=i.useMemo(()=>ya(m,a),[m,a]),p=i.useMemo(()=>{if(t.mode!=="project-multi")return[];const N=[];return t.projects.forEach(R=>{const C=t.openTabs.filter(S=>S.projectId===R.id);if(C.length===0){N.push({projectId:R.id});return}const b=new Set;C.forEach(S=>{b.has(S.scrollGroupId)||(b.add(S.scrollGroupId),N.push({projectId:R.id,scrollGroupId:S.scrollGroupId}))})}),N},[t.mode,t.projects,t.openTabs]),g=N=>{if(N.scrollGroupId!==void 0){if(t.mode==="projectScrollGroup"){t.onOpenProjectInGroup(N.projectId,N.scrollGroupId);return}t.mode==="project-multi"&&t.onOpenProjectInGroup&&t.onOpenProjectInGroup(N.projectId,N.scrollGroupId)}},y=N=>{switch(t.mode){case"project":{t.onChangeSelection({projectId:N.projectId}),r(!1);return}case"project-multi":{const R=t.selection.pairs,C=S=>S.projectId===N.projectId&&S.scrollGroupId===N.scrollGroupId,b=R.some(C)?R.filter(S=>!C(S)):[...R,{projectId:N.projectId,scrollGroupId:N.scrollGroupId}];t.onChangeSelection({pairs:b}),b.length===0&&c&&w(!1);return}case"projectScrollGroup":{if(N.isBoundButClosed&&N.scrollGroupId!==void 0){t.onOpenProjectInGroup(N.projectId,N.scrollGroupId),r(!1);return}if(N.scrollGroupId!==void 0){t.onChangeSelection({projectId:N.projectId,scrollGroupId:N.scrollGroupId}),r(!1);return}const R=t.selection.scrollGroupId??0;t.onChangeSelection({projectId:N.projectId,scrollGroupId:R}),t.onOpenProjectInGroup(N.projectId,R),r(!1)}}},v=()=>{if(t.mode!=="project-multi")return;const N=t.selection.pairs,R=new Set(N.map(b=>`${b.projectId}:${b.scrollGroupId??""}`)),C=[...N];p.forEach(b=>{const S=`${b.projectId}:${b.scrollGroupId??""}`;R.has(S)||(R.add(S),C.push(b))}),t.onChangeSelection({pairs:C})},j=()=>{t.mode==="project-multi"&&(t.onChangeSelection({pairs:[]}),c&&w(!1))},I=i.useMemo(()=>{switch(t.mode){case"project":{const N=t.projects.find(C=>C.id===t.selection.projectId),R=N?N.shortName:t.buttonPlaceholder??"";return{node:R,title:R}}case"project-multi":{const{pairs:N}=t.selection;if(N.length===0){const S=t.buttonPlaceholder??"";return{node:S,title:S}}const R=[];if(N.forEach(S=>{const P=t.projects.find(F=>F.id===S.projectId);P&&R.push({project:P,scrollGroupId:S.scrollGroupId})}),R.length===0){const S=t.buttonPlaceholder??"";return{node:S,title:S}}if(t.getSelectedText){const S=t.getSelectedText(R);return{node:S,title:S}}const C=R.map(({project:S,scrollGroupId:P})=>P===void 0?S.shortName:`${S.shortName} (${sn(P)})`).join(", ");if(R.length===1)return{node:C,title:C};const b=R.length.toString();return{node:n.jsxs(n.Fragment,{children:[n.jsx(ae,{variant:"muted",className:"tw-shrink-0",children:b}),n.jsx("span",{className:"tw-min-w-0 tw-truncate",children:C})]}),title:`${b} ${C}`}}case"projectScrollGroup":{const N=t.projects.find(b=>b.id===t.selection.projectId);if(!N){const b=t.buttonPlaceholder??"";return{node:b,title:b}}const R=t.selection.scrollGroupId;if(R===void 0)return{node:N.shortName,title:N.shortName};const C=`${N.shortName} · ${sn(R)}`;return{node:C,title:C}}default:return{node:"",title:""}}},[t]),D=t.mode==="project-multi"?n.jsx(E.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}):n.jsx(E.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),T=t.mode==="project-multi"&&t.selection.pairs.length>0,G=t.mode==="projectScrollGroup"||t.mode==="project-multi"&&t.onOpenProjectInGroup?g:void 0;return n.jsxs(we,{open:e,onOpenChange:r,children:[n.jsx(je,{asChild:!0,children:n.jsxs(B,{variant:t.buttonVariant??"outline",role:"combobox","aria-expanded":e,"aria-label":t.ariaLabel,disabled:t.isDisabled??!1,title:T?I.title:void 0,className:h("tw-flex tw-w-[180px] tw-items-center tw-justify-between tw-overflow-hidden",t.buttonClassName),children:[n.jsx("span",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2 tw-overflow-hidden tw-whitespace-nowrap tw-text-start",children:typeof I.node=="string"?n.jsx("span",{className:"tw-min-w-0 tw-truncate",children:I.node}):I.node}),D]})}),n.jsx(re,{align:t.alignDropDown??"start",collisionPadding:16,className:h("tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0",t.popoverContentClassName),style:t.popoverContentStyle,children:n.jsx(Ct,{delayDuration:200,children:n.jsxs(ce,{shouldFilter:!1,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-pe-2",children:[n.jsx("div",{className:"tw-flex-1",children:n.jsx(Le,{value:o,onValueChange:s,placeholder:d.searchPlaceholder,className:"tw-border-0"})}),n.jsx(Gd,{groupByOpenTabs:a,onChangeGroupByOpenTabs:l,showSelectedOnly:t.mode==="project-multi"?c:void 0,onChangeShowSelectedOnly:t.mode==="project-multi"?w:void 0,strings:d})]}),t.mode==="project-multi"&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-py-2 tw-pe-4 tw-ps-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:v,children:`${d.selectAll} (${p.length.toString()})`}),n.jsx(B,{variant:"ghost",size:"sm",onClick:j,children:`${d.clearAll} (${t.selection.pairs.length.toString()})`})]}),n.jsxs(de,{children:[n.jsx(Ye,{children:t.commandEmptyMessage??"No projects found"}),f.map((N,R)=>n.jsxs(i.Fragment,{children:[n.jsx(te,{heading:Bd(N,d),children:N.rows.map(C=>n.jsx(Fd,{row:C,mode:t.mode,strings:d,onClick:y,onOpen:G},C.rowKey))}),R<f.length-1&&n.jsx(cr,{})]},N.kind))]})]})})})]})}function Bd(t,e){switch(t.kind){case"openTabs":return e.openTabsSectionHeading;case"other":return e.otherProjectsSectionHeading;case"flat":default:return}}const zd="16rem",Kd="3rem",ja=i.createContext(void 0);function Dn(){const t=i.useContext(ja);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const lo=i.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:l="primary",...c},w)=>{const[d,u]=i.useState(t),m=e??d,f=i.useCallback(D=>{const T=typeof D=="function"?D(m):D;r?r(T):u(T)},[r,m]),p=i.useCallback(()=>f(D=>!D),[f]),g=m?"expanded":"collapsed",j=bt()==="ltr"?l:l==="primary"?"secondary":"primary",I=i.useMemo(()=>({state:g,open:m,setOpen:f,toggleSidebar:p,side:j}),[g,m,f,p,j]);return n.jsx(ja.Provider,{value:I,children:n.jsx(Ct,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":zd,"--sidebar-width-icon":Kd,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});lo.displayName="SidebarProvider";const co=i.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const l=Dn();return e==="none"?n.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});co.displayName="Sidebar";const Na=i.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Dn();return n.jsxs(B,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(E.PanelLeft,{}):n.jsx(E.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Na.displayName="SidebarTrigger";const ka=i.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Dn();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});ka.displayName="SidebarRail";const wo=i.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));wo.displayName="SidebarInset";const _a=i.forwardRef(({className:t,...e},r)=>n.jsx(Xe,{ref:r,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));_a.displayName="SidebarInput";const Ca=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Ca.displayName="SidebarHeader";const Sa=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Sa.displayName="SidebarFooter";const Ea=i.forwardRef(({className:t,...e},r)=>n.jsx(qe,{ref:r,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Ea.displayName="SidebarSeparator";const uo=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));uo.displayName="SidebarContent";const nr=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));nr.displayName="SidebarGroup";const rr=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?an.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});rr.displayName="SidebarGroupLabel";const Ra=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?an.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Ra.displayName="SidebarGroupAction";const or=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",t),...e}));or.displayName="SidebarGroupContent";const po=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));po.displayName="SidebarMenu";const mo=i.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",t),...e}));mo.displayName="SidebarMenuItem";const qd=Pe.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),fo=i.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...l},c)=>{const w=t?an.Slot:"button",{state:d}=Dn(),u=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:h(qd({variant:r,size:o}),a),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:u}),n.jsx(St,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):u});fo.displayName="SidebarMenuButton";const Ta=i.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?an.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Ta.displayName="SidebarMenuAction";const Ia=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ia.displayName="SidebarMenuBadge";const Da=i.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(er,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(er,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Da.displayName="SidebarMenuSkeleton";const Ma=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ma.displayName="SidebarMenuSub";const Oa=i.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Oa.displayName="SidebarMenuSubItem";const Aa=i.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const l=t?an.Slot:"a";return n.jsx(l,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Aa.displayName="SidebarMenuSubButton";function Pa({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:w}){const d=i.useCallback((f,p)=>{o(f,p)},[o]),u=i.useCallback(f=>{const p=r.find(g=>g.projectId===f);return p?p.projectName:f},[r]),m=i.useCallback(f=>!s.projectId&&f===s.label,[s]);return n.jsx(co,{id:t,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(uo,{children:[n.jsxs(nr,{children:[n.jsx(rr,{className:"tw-text-sm",children:a}),n.jsx(or,{children:n.jsx(po,{children:Object.entries(e).map(([f,p])=>n.jsx(mo,{children:n.jsx(fo,{onClick:()=>d(f),isActive:m(f),children:n.jsx("span",{className:"tw-pl-3",children:p})})},f))})})]}),n.jsxs(nr,{children:[n.jsx(rr,{className:"tw-text-sm",children:l}),n.jsx(or,{className:"tw-pl-3",children:n.jsx(Xn,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:lr},options:r.flatMap(f=>f.projectId),getOptionLabel:u,buttonPlaceholder:c,onChange:f=>{const p=u(f);d(p,f)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(E.ScrollText,{})})})]})]})})}const mr=i.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:l},c)=>{const w=bt();return n.jsxs("div",{id:l,className:h("tw-relative",{"tw-w-full":o},s),children:[n.jsx(E.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(Xe,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:a}),t&&n.jsxs(B,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(E.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});mr.displayName="SearchBar";function Hd({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(mr,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(lo,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Pa,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),n.jsx(wo,{className:"tw-min-w-[215px]",children:o})]})]})}const Ie="scrBook",Ud="scrRef",ze="source",Yd="details",Xd="Scripture Reference",Wd="Scripture Book",La="Type",Zd="Details";function Jd(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Ie,header:(t==null?void 0:t.scriptureReferenceColumnName)??Xd,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?at.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Ie?_.formatScrRef(s.start):void 0},getGroupingValue:o=>at.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>_.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>_.formatScrRef(o.start),id:Ud,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:_.formatScrRef(s.start)},sortingFn:(o,s)=>_.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ze,header:r?(t==null?void 0:t.typeColumnName)??La:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Yd,header:(t==null?void 0:t.detailsColumnName)??Zd,cell:o=>o.getValue(),enableGrouping:!1}]}const Qd=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||_.compareScrRefs(t.start,t.end)===0?`${_.scrRefToBBBCCCVVV(t.start)}+${e}`:`${_.scrRefToBBBCCCVVV(t.start)}+${e}-${_.scrRefToBBBCCCVVV(t.end)}+${r}`},Xo=t=>`${Qd({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function tw({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:l,onRowSelected:c,id:w}){const[d,u]=i.useState([]),[m,f]=i.useState([{id:Ie,desc:!1}]),[p,g]=i.useState({}),y=i.useMemo(()=>t.flatMap(b=>b.data.map(S=>({...S,source:b.source}))),[t]),v=i.useMemo(()=>Jd({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:l},r),[o,a,l,r]);i.useEffect(()=>{d.includes(ze)?f([{id:ze,desc:!1},{id:Ie,desc:!1}]):f([{id:Ie,desc:!1}])},[d]);const j=Bt.useReactTable({data:y,columns:v,state:{grouping:d,sorting:m,rowSelection:p},onGroupingChange:u,onSortingChange:f,onRowSelectionChange:g,getExpandedRowModel:Bt.getExpandedRowModel(),getGroupedRowModel:Bt.getGroupedRowModel(),getCoreRowModel:Bt.getCoreRowModel(),getSortedRowModel:Bt.getSortedRowModel(),getRowId:Xo,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(c){const b=j.getSelectedRowModel().rowsById,S=Object.keys(b);if(S.length===1){const P=y.find(F=>Xo(F)===S[0])||void 0;P&&c(P)}}},[p,y,c,j]);const I=s??Wd,D=a??La,T=[{label:"No Grouping",value:[]},{label:`Group by ${I}`,value:[Ie]},{label:`Group by ${D}`,value:[ze]},{label:`Group by ${I} and ${D}`,value:[Ie,ze]},{label:`Group by ${D} and ${I}`,value:[ze,Ie]}],G=b=>{u(JSON.parse(b))},N=(b,S)=>{!b.getIsGrouped()&&!b.getIsSelected()&&b.getToggleSelectedHandler()(S)},R=(b,S)=>b.getIsGrouped()?"":h("banded-row",S%2===0?"even":"odd"),C=(b,S,P)=>{if(!((b==null?void 0:b.length)===0||S.depth<P.column.getGroupedIndex())){if(S.getIsGrouped())switch(S.depth){case 1:return"tw-ps-4";default:return}switch(S.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(He,{value:JSON.stringify(d),onValueChange:b=>{G(b)},children:[n.jsx(Oe,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Ue,{})}),n.jsx(Ae,{position:"item-aligned",children:n.jsx(na,{children:T.map(b=>n.jsx(Xt,{value:JSON.stringify(b.value),children:b.label},b.label))})})]}),n.jsxs(En,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Rn,{children:j.getHeaderGroups().map(b=>n.jsx(xe,{children:b.headers.filter(S=>S.column.columnDef.header).map(S=>n.jsx(on,{colSpan:S.colSpan,className:"top-0 tw-sticky",children:S.isPlaceholder?void 0:n.jsxs("div",{children:[S.column.getCanGroup()?n.jsx(B,{variant:"ghost",title:`Toggle grouping by ${S.column.columnDef.header}`,onClick:S.column.getToggleGroupingHandler(),type:"button",children:S.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Bt.flexRender(S.column.columnDef.header,S.getContext())]})},S.id))},b.id))}),n.jsx(Tn,{children:j.getRowModel().rows.map((b,S)=>{const P=bt();return n.jsx(xe,{"data-state":b.getIsSelected()?"selected":"",className:h(R(b,S)),onClick:F=>N(b,F),children:b.getVisibleCells().map(F=>{if(!(F.getIsPlaceholder()||F.column.columnDef.enableGrouping&&!F.getIsGrouped()&&(F.column.columnDef.id!==ze||!r)))return n.jsx(Me,{className:h(F.column.columnDef.id,"tw-p-[1px]",C(d,b,F)),children:F.getIsGrouped()?n.jsxs(B,{variant:"link",onClick:b.getToggleExpandedHandler(),type:"button",children:[b.getIsExpanded()&&n.jsx(E.ChevronDown,{}),!b.getIsExpanded()&&(P==="ltr"?n.jsx(E.ChevronRight,{}):n.jsx(E.ChevronLeft,{}))," ",Bt.flexRender(F.column.columnDef.cell,F.getContext())," (",b.subRows.length,")"]}):Bt.flexRender(F.column.columnDef.cell,F.getContext())},F.id)})},b.id)})})]})]})}const ho=(t,e)=>t.filter(r=>{try{return _.getSectionForBook(r)===e}catch{return!1}}),$a=(t,e,r)=>ho(t,e).every(o=>r.includes(o));function ew({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=ho(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(B,{variant:"outline",size:"sm",onClick:()=>o(t),className:h($a(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:al(t,l,c,w,d)})}const Wo=5,Cr=6;function nw({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:f,ntLong:p,dcLong:g,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[v,j]=i.useState(!1),[I,D]=i.useState(""),T=i.useRef(void 0),G=i.useRef(!1);if(t.length!==at.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const N=i.useMemo(()=>at.Canon.allBookIds.filter((L,K)=>t[K]==="1"&&!at.Canon.isObsolete(at.Canon.bookIdToNumber(L))),[t]),R=i.useMemo(()=>{if(!I.trim()){const H={[_.Section.OT]:[],[_.Section.NT]:[],[_.Section.DC]:[],[_.Section.Extra]:[]};return N.forEach(W=>{const Nt=_.getSectionForBook(W);H[Nt].push(W)}),H}const L=N.filter(H=>Gr(H,I,s)),K={[_.Section.OT]:[],[_.Section.NT]:[],[_.Section.DC]:[],[_.Section.Extra]:[]};return L.forEach(H=>{const W=_.getSectionForBook(H);K[W].push(H)}),K},[N,I,s]),C=i.useCallback((L,K=!1)=>{if(!K||!T.current){r(e.includes(L)?e.filter(nt=>nt!==L):[...e,L]),T.current=L;return}const H=N.findIndex(nt=>nt===T.current),W=N.findIndex(nt=>nt===L);if(H===-1||W===-1)return;const[Nt,Pt]=[Math.min(H,W),Math.max(H,W)],Ot=N.slice(Nt,Pt+1).map(nt=>nt);r(e.includes(L)?e.filter(nt=>!Ot.includes(nt)):[...new Set([...e,...Ot])])},[e,r,N]),b=L=>{C(L,G.current),G.current=!1},S=(L,K)=>{L.preventDefault(),C(K,L.shiftKey)},P=i.useCallback(L=>{const K=ho(N,L).map(H=>H);r($a(N,L,e)?e.filter(H=>!K.includes(H)):[...new Set([...e,...K])])},[e,r,N]),F=()=>{r(N.map(L=>L))},O=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(_.Section).map(L=>n.jsx(ew,{section:L,availableBookIds:N,selectedBookIds:e,onToggle:P,localizedStrings:o},L))}),n.jsxs(we,{open:v,onOpenChange:L=>{j(L),L||D("")},children:[n.jsx(je,{asChild:!0,children:n.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:l,n.jsx(E.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(re,{className:"tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0",align:"start",children:n.jsxs(ce,{shouldFilter:!1,onKeyDown:L=>{L.key==="Enter"&&(G.current=L.shiftKey)},children:[n.jsx(Le,{placeholder:c,value:I,onValueChange:D}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:F,children:w}),n.jsx(B,{variant:"ghost",size:"sm",onClick:O,children:d})]}),n.jsxs(de,{children:[n.jsx(Ye,{children:u}),Object.values(_.Section).map((L,K)=>{const H=R[L];if(H.length!==0)return n.jsxs(i.Fragment,{children:[n.jsx(te,{heading:ds(L,f,p,g,y),children:H.map(W=>n.jsx(us,{bookId:W,isSelected:e.includes(W),onSelect:()=>b(W),onMouseDown:Nt=>S(Nt,W),section:_.getSectionForBook(W),showCheck:!0,localizedBookNames:s,commandValue:fs(W,s),className:"tw-flex tw-items-center"},W))}),K<Object.values(_.Section).length-1&&n.jsx(cr,{})]},L)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Cr?Cr:Wo).map(L=>n.jsx(ae,{className:"hover:tw-bg-secondary",variant:"secondary",children:De(L,s)},L)),e.length>Cr&&n.jsx(ae,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Wo} ${m}`})]})]})}const rw=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_verse%","%webView_scope_selector_chapter%","%webView_scope_selector_book%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_scope_selector_range%","%webView_scope_selector_select_range%","%webView_scope_selector_range_start%","%webView_scope_selector_range_end%","%webView_scope_selector_ok%","%webView_scope_selector_cancel%","%webView_scope_selector_navigate%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),It=(t,e)=>t[e]??e,ow=Object.freeze([" ","-"]);function sw({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:l,localizedBookNames:c,id:w,variant:d="radio",rangeStart:u,rangeEnd:m,onRangeStartChange:f,onRangeEndChange:p,currentScrRef:g,onCurrentScrRefChange:y,bookChapterControlLocalizedStrings:v,getEndVerse:j,hideLabel:I=!1,buttonClassName:D}){const T=It(l,"%webView_scope_selector_selected_text%"),G=It(l,"%webView_scope_selector_verse%"),N=It(l,"%webView_scope_selector_chapter%"),R=It(l,"%webView_scope_selector_book%"),C=It(l,"%webView_scope_selector_current_verse%"),b=It(l,"%webView_scope_selector_current_chapter%"),S=It(l,"%webView_scope_selector_current_book%"),P=It(l,"%webView_scope_selector_choose_books%"),F=It(l,"%webView_scope_selector_scope%"),O=It(l,"%webView_scope_selector_select_books%"),L=It(l,"%webView_scope_selector_range%"),K=It(l,"%webView_scope_selector_select_range%"),H=It(l,"%webView_scope_selector_range_start%"),W=It(l,"%webView_scope_selector_range_end%"),Nt=It(l,"%webView_scope_selector_ok%"),Pt=It(l,"%webView_scope_selector_cancel%"),Ot=It(l,"%webView_scope_selector_navigate%"),nt=$=>{if(!g)return;const Y=g.book.toUpperCase();switch($){case"verse":return _.formatScrRef(g,"id");case"chapter":return`${Y} ${g.chapterNum}`;case"book":return Y;default:return}},wt=[{value:"selectedText",label:T,id:"scope-selected-text"},{value:"verse",label:G,dropdownLabel:C,scrRefSuffix:nt("verse"),id:"scope-verse"},{value:"chapter",label:N,dropdownLabel:b,scrRefSuffix:nt("chapter"),id:"scope-chapter"},{value:"book",label:R,dropdownLabel:S,scrRefSuffix:nt("book"),id:"scope-book"},{value:"selectedBooks",label:P,id:"scope-selected"},{value:"range",label:L,id:"scope-range"}],z=($,Y,zt=!1)=>n.jsxs(n.Fragment,{children:[$,Y&&!zt&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[": ",Y]})]}),J=e?wt.filter($=>e.includes($.value)):wt,rt=g??_.defaultScrRef,Q=u??rt,et=m??rt,Lt=()=>{},Et=i.useRef(null),$t=i.useRef(null),pe=i.useRef(!1),A=i.useRef(null),Ht=i.useRef(!1),[me,Rt]=i.useState(void 0),V=i.useRef(!1),U=i.useRef(!1),Z=i.useRef(null),ot=i.useCallback($=>{if($){Rt("start"),V.current=!1;return}Rt(Y=>Y==="start"?void 0:Y),V.current&&(V.current=!1,requestAnimationFrame(()=>{var zt;const Y=(zt=Et.current)==null?void 0:zt.querySelector("button");Y==null||Y.click()}))},[]),mt=i.useCallback($=>{if($){Rt("end"),U.current=!1;return}Rt(Y=>Y==="end"?void 0:Y)},[]),ft=i.useCallback($=>{f==null||f($),p==null||p($),V.current=!0},[f,p]),kt=i.useCallback($=>{p==null||p($),U.current=!0},[p]),ut=i.useCallback($=>{r($),$==="selectedBooks"&&s.length===0&&(g!=null&&g.book)&&a([g.book])},[r,s,g,a]),vt=J.find($=>$.value===t),At=()=>t==="selectedBooks"&&s.length>0?s.map($=>$.toUpperCase()).join(", "):t==="range"?_.formatScrRefRange(Q,et,{optionOrLocalizedBookName:"id",endRefOptionOrLocalizedBookName:"id",repeatBookName:!0}):vt?z(vt.label,vt.scrRefSuffix):t,M=J.filter($=>$.value!=="selectedBooks"&&$.value!=="range"),ht=J.find($=>$.value==="selectedBooks"),it=J.find($=>$.value==="range"),[Ee,$e]=i.useState(!1),[Fe,We]=i.useState(void 0),[Re,wn]=i.useState(void 0),[Te,un]=i.useState(void 0),[Ge,pn]=i.useState(void 0),[mn,Mn]=i.useState([]),On=d==="dropdown"&&Fe==="selectedBooks",k=n.jsx(nw,{availableBookInfo:o,selectedBookIds:On?mn:s,onChangeSelectedBookIds:On?Mn:a,localizedStrings:l,localizedBookNames:c}),q=me==="end",X=me==="start",_t="tw-text-muted-foreground",Zt=d==="dropdown"&&Fe==="range",Ze=Zt?un:ft,Ft=Zt?pn:p?kt:Lt,yt=n.jsxs("div",{className:"tw-flex tw-flex-wrap tw-items-end tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(xt,{htmlFor:"scope-range-start",className:h(q&&_t),children:H}),n.jsx(zn,{id:"scope-range-start",scrRef:Zt?Te??Q:Q,handleSubmit:Ze,localizedBookNames:c,localizedStrings:v,getEndVerse:j,submitKeys:ow,onOpenChange:ot,className:h(q&&_t),modal:!0})]}),n.jsxs("div",{ref:Et,className:"tw-grid tw-gap-2",children:[n.jsx(xt,{htmlFor:"scope-range-end",className:h(X&&_t),children:W}),n.jsx(zn,{id:"scope-range-end",scrRef:Zt?Ge??et:et,handleSubmit:Ft,localizedBookNames:c,localizedStrings:v,getEndVerse:j,disableReferencesUpTo:Zt?Te??Q:Q,onOpenChange:mt,onCloseAutoFocus:$=>{var Y;U.current&&(U.current=!1,$.preventDefault(),(Y=Z.current)==null||Y.focus())},className:h(X&&_t),modal:!0,align:"start"})]})]}),Tt=i.useRef({}),pt=i.useCallback($=>Y=>{Tt.current[$]=Y},[]),Ut=i.useRef(null);i.useEffect(()=>{if(!Ee)return;let $=0;const Y=requestAnimationFrame(()=>{$=requestAnimationFrame(()=>{var zt;(zt=Tt.current[t])==null||zt.focus()})});return()=>{cancelAnimationFrame(Y),$&&cancelAnimationFrame($)}},[Ee,t]);const[Yt,Ve]=i.useState(null),[An,Ci]=i.useState(null),[Pn,Si]=i.useState(null),Ei=200,[Ri,Ti]=i.useState(!1);i.useEffect(()=>{if(!Pn||typeof ResizeObserver>"u")return;const $=new ResizeObserver(([Y])=>{Ti(Y.contentRect.width<Ei)});return $.observe(Pn),()=>$.disconnect()},[Pn]);const yo=i.useCallback($=>{wn($),un(Q),pn(et),Mn(s),$e(!1),We($)},[Q,et,s]),jo=i.useCallback(()=>{Re!==void 0&&(Re==="range"?(Te&&(f==null||f(Te)),Ge&&(p==null||p(Ge))):Re==="selectedBooks"&&a(mn),ut(Re),We(void 0),wn(void 0))},[Re,Te,Ge,mn,f,p,a,ut]),Ln=i.useCallback($=>{$||(We(void 0),wn(void 0))},[]),No=i.useCallback($=>{var Y;$.preventDefault(),(Y=Ut.current)==null||Y.focus()},[]),ko=$=>t===$?n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})}):void 0;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[!I&&n.jsx(xt,{children:F}),d==="dropdown"?n.jsxs(ie,{open:Ee,onOpenChange:$e,children:[n.jsx(ve,{asChild:!0,children:n.jsxs(B,{ref:Ut,variant:"outline",role:"combobox",className:h("tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",D),children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:At()}),n.jsx(E.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(ee,{ref:Si,className:"tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",align:"start",children:n.jsxs(Vn,{container:Pn,children:[M.map(({value:$,label:Y,dropdownLabel:zt,scrRefSuffix:hn,id:Ii})=>n.jsxs(ke,{ref:pt($),className:"tw-relative tw-ps-8 data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground",onSelect:()=>ut($),"data-selected":t===$?"true":void 0,children:[t===$&&n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})}),z(zt??Y,hn,Ri)]},Ii)),(ht||it)&&n.jsx(ye,{}),ht&&n.jsxs(ke,{ref:pt("selectedBooks"),className:h("tw-relative tw-ps-8","data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"),onSelect:()=>yo("selectedBooks"),"data-selected":t==="selectedBooks"?"true":void 0,children:[ko("selectedBooks"),`${ht.label}…`]}),it&&n.jsxs(ke,{ref:pt("range"),className:h("tw-relative tw-ps-8","data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"),onSelect:()=>yo("range"),"data-selected":t==="range"?"true":void 0,children:[ko("range"),`${it.label}…`]}),y&&n.jsxs(n.Fragment,{children:[n.jsx(ye,{}),n.jsx(Ce,{className:"tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground",children:Ot}),n.jsx(ke,{ref:A,className:"tw-p-0",onSelect:$=>{var Y,zt;if($.preventDefault(),pe.current){pe.current=!1;return}Ht.current||(zt=(Y=$t.current)==null?void 0:Y.querySelector("button"))==null||zt.click()},children:n.jsx("div",{ref:$t,className:"tw-w-full tw-px-1 tw-pb-1",onPointerDownCapture:$=>{const Y=$.target instanceof HTMLElement?$.target:void 0;Y!=null&&Y.closest("button")&&(pe.current=!0,requestAnimationFrame(()=>{pe.current=!1}))},children:n.jsx(zn,{id:"scope-navigate",scrRef:g??_.defaultScrRef,handleSubmit:y,localizedBookNames:c,localizedStrings:v,getEndVerse:j,triggerVariant:"ghost",onOpenChange:$=>{Ht.current=$},onCloseAutoFocus:$=>{var Y;$.preventDefault(),(Y=A.current)==null||Y.focus()},modal:!0,className:"tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",triggerContent:n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:_.formatScrRef(g??_.defaultScrRef,"id")}),n.jsx(E.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})})})})]})]})})]}):n.jsx(dr,{value:t,onValueChange:ut,className:"tw-flex tw-flex-col tw-space-y-1",children:J.map(({value:$,label:Y,scrRefSuffix:zt,id:hn})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(_n,{className:"tw-me-2",value:$,id:hn}),n.jsx(xt,{htmlFor:hn,children:z(Y,zt)})]},hn))})]}),d==="radio"&&t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(xt,{children:O}),k]}),d==="radio"&&t==="range"&&yt,d==="dropdown"&&ht&&n.jsx(Un,{open:Fe==="selectedBooks",onOpenChange:Ln,children:n.jsx(jn,{ref:Ci,onCloseAutoFocus:No,onEscapeKeyDown:$=>{An!=null&&An.querySelector('[data-state="open"]')&&$.preventDefault()},children:n.jsxs(Vn,{container:An,children:[n.jsx(Nn,{className:"tw-pe-8",children:n.jsx(kn,{children:P})}),k,n.jsxs(Yn,{children:[n.jsx(B,{variant:"outline",onClick:()=>Ln(!1),children:Pt}),n.jsx(B,{onClick:jo,children:Nt})]})]})})}),d==="dropdown"&&it&&n.jsx(Un,{open:Fe==="range",onOpenChange:Ln,children:n.jsx(jn,{ref:Ve,onCloseAutoFocus:No,onEscapeKeyDown:$=>{Yt!=null&&Yt.querySelector('[data-state="open"]')&&$.preventDefault()},children:n.jsxs(Vn,{container:Yt,children:[n.jsx(Nn,{className:"tw-pe-8",children:n.jsx(kn,{children:K})}),yt,n.jsxs(Yn,{children:[n.jsx(B,{variant:"outline",onClick:()=>Ln(!1),children:Pt}),n.jsx(B,{ref:Z,onClick:jo,children:Nt})]})]})})})]})}const Sr={[_.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[_.getLocalizeKeyForScrollGroupId(0)]:"A",[_.getLocalizeKeyForScrollGroupId(1)]:"B",[_.getLocalizeKeyForScrollGroupId(2)]:"C",[_.getLocalizeKeyForScrollGroupId(3)]:"D",[_.getLocalizeKeyForScrollGroupId(4)]:"E",[_.getLocalizeKeyForScrollGroupId(5)]:"F",[_.getLocalizeKeyForScrollGroupId(6)]:"G",[_.getLocalizeKeyForScrollGroupId(7)]:"H",[_.getLocalizeKeyForScrollGroupId(8)]:"I",[_.getLocalizeKeyForScrollGroupId(9)]:"J",[_.getLocalizeKeyForScrollGroupId(10)]:"K",[_.getLocalizeKeyForScrollGroupId(11)]:"L",[_.getLocalizeKeyForScrollGroupId(12)]:"M",[_.getLocalizeKeyForScrollGroupId(13)]:"N",[_.getLocalizeKeyForScrollGroupId(14)]:"O",[_.getLocalizeKeyForScrollGroupId(15)]:"P",[_.getLocalizeKeyForScrollGroupId(16)]:"Q",[_.getLocalizeKeyForScrollGroupId(17)]:"R",[_.getLocalizeKeyForScrollGroupId(18)]:"S",[_.getLocalizeKeyForScrollGroupId(19)]:"T",[_.getLocalizeKeyForScrollGroupId(20)]:"U",[_.getLocalizeKeyForScrollGroupId(21)]:"V",[_.getLocalizeKeyForScrollGroupId(22)]:"W",[_.getLocalizeKeyForScrollGroupId(23)]:"X",[_.getLocalizeKeyForScrollGroupId(24)]:"Y",[_.getLocalizeKeyForScrollGroupId(25)]:"Z"};function aw({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:l}){const c={...Sr,...Object.fromEntries(Object.entries(o).map(([d,u])=>[d,d===u&&d in Sr?Sr[d]:u]))},w=bt();return n.jsxs(He,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(Oe,{size:s,className:h("pr-twp tw-w-auto",a),children:n.jsx(Ue,{placeholder:c[_.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(Ae,{id:l,align:w==="rtl"?"end":"start",style:{zIndex:cn},children:t.map(d=>n.jsx(Xt,{value:`${d}`,children:c[_.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function iw({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function lw({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function cw({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(qe,{}):""]})}function Fa(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function sr({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Ga=(t,e,r,o)=>r?Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:"command"in c?n.jsxs(ke,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(sr,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(sr,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Qs,{children:[n.jsx(no,{children:c.label}),n.jsx(Js,{children:n.jsx(ro,{children:Ga(t,e,Fa(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(St,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function ar({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:l="ghost",id:c}){return n.jsxs(ie,{variant:a,children:[n.jsx(ve,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(B,{variant:l,size:"icon",children:o??n.jsx(E.MenuIcon,{})})}),n.jsx(ee,{align:"start",style:{zIndex:cn},children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,u)=>n.jsxs(i.Fragment,{children:[n.jsx(eo,{children:n.jsx(Ct,{children:Ga(e.groups,e.items,w,t)})}),d<u.length-1&&n.jsx(ye,{})]},w))})]})}const Va=i.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function dw({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(Va,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(ar,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(E.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(ar,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(E.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function ww({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Va,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(ar,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const go=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsx(qt.Root,{orientation:"vertical",ref:r,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});go.displayName=qt.List.displayName;const xo=i.forwardRef(({className:t,...e},r)=>n.jsx(qt.List,{ref:r,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));xo.displayName=qt.List.displayName;const Ba=i.forwardRef(({className:t,...e},r)=>n.jsx(qt.Trigger,{ref:r,...e,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),bo=i.forwardRef(({className:t,...e},r)=>n.jsx(qt.Content,{ref:r,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));bo.displayName=qt.Content.displayName;function uw({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(mr,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(go,{children:[n.jsx(xo,{children:t.map(c=>n.jsx(Ba,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(bo,{value:c.value,children:c.content},c.key))]})]})}function pw({...t}){return n.jsx(ct.Menu,{...t})}function mw({...t}){return n.jsx(ct.Sub,{"data-slot":"menubar-sub",...t})}const za=i.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=i.useMemo(()=>({variant:e}),[e]);return n.jsx(to.Provider,{value:s,children:n.jsx(ct.Root,{ref:o,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});za.displayName=ct.Root.displayName;const Ka=i.forwardRef(({className:t,...e},r)=>{const o=ue();return n.jsx(ct.Trigger,{ref:r,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Se({variant:o.variant,className:t})),...e})});Ka.displayName=ct.Trigger.displayName;const qa=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=ue();return n.jsxs(ct.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Se({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(E.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});qa.displayName=ct.SubTrigger.displayName;const Ha=i.forwardRef(({className:t,...e},r)=>{const o=ue();return n.jsx(ct.SubContent,{ref:r,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Ha.displayName=ct.SubContent.displayName;const Ua=i.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const l=ue();return n.jsx(ct.Portal,{children:n.jsx(ct.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Ua.displayName=ct.Content.displayName;const Ya=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=ue();return n.jsx(ct.Item,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Se({variant:s.variant,className:t}),t),...r})});Ya.displayName=ct.Item.displayName;const fw=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=ue();return n.jsxs(ct.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Se({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ct.ItemIndicator,{children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});fw.displayName=ct.CheckboxItem.displayName;const hw=i.forwardRef(({className:t,children:e,...r},o)=>{const s=ue();return n.jsxs(ct.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Se({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ct.ItemIndicator,{children:n.jsx(E.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});hw.displayName=ct.RadioItem.displayName;const gw=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(ct.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));gw.displayName=ct.Label.displayName;const Xa=i.forwardRef(({className:t,...e},r)=>n.jsx(ct.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Xa.displayName=ct.Separator.displayName;const xn=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Wa=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order);return s.flatMap(([a],l)=>{const c=e.filter(d=>d.group===a).sort((d,u)=>d.order-u.order).map(d=>n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:"command"in d?n.jsxs(Ya,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(sr,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(sr,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(mw,{children:[n.jsx(qa,{children:d.label}),n.jsx(Ha,{children:Wa(t,e,Fa(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(St,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&l<s.length-1&&w.push(n.jsx(Xa,{},`separator-${a}`)),w})};function xw({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=i.useRef(void 0),a=i.useRef(void 0),l=i.useRef(void 0),c=i.useRef(void 0),w=i.useRef(void 0),d=u=>{switch(u){case"platform.app":return a;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return w;default:return}};if(Wi.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,m)=>{var g,y,v,j;u.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},p={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":xn(a,[f]);break;case"alt+p":(g=a.current)==null||g.focus(),xn(a,[f,p]);break;case"alt+l":(y=l.current)==null||y.focus(),xn(l,[f,p]);break;case"alt+n":(v=c.current)==null||v.focus(),xn(c,[f,p]);break;case"alt+h":(j=w.current)==null||j.focus(),xn(w,[f,p]);break}}),i.useEffect(()=>{if(!r||!s.current)return;const u=new MutationObserver(p=>{p.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const y=g.target.getAttribute("data-state");r(y==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(p=>{u.observe(p,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(za,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,m])=>typeof u=="boolean"||typeof m=="boolean"?0:u.order-m.order).map(([u,m])=>n.jsxs(pw,{children:[n.jsx(Ka,{ref:d(u),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(Ua,{style:{zIndex:cn},children:n.jsx(Ct,{children:Wa(t.groups,t.items,u,e)})})]},u))})}function bw(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function vw({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const u=i.useRef(void 0);return n.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(xw,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const yw=(t,e)=>t[e]??e;function jw({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:l,className:c,id:w}){const d=yw(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[u,m]=i.useState(!1),f=g=>{s&&s(g),o&&o([g,...r.filter(y=>y!==g)]),a&&r.find(y=>y===g)&&a([...r.filter(y=>y!==g)]),m(!1)},p=(g,y)=>{var j,I,D,T,G,N;const v=y!==g?((I=(j=t[g])==null?void 0:j.uiNames)==null?void 0:I[y])??((T=(D=t[g])==null?void 0:D.uiNames)==null?void 0:T.en):void 0;return v?`${(G=t[g])==null?void 0:G.autonym} (${v})`:(N=t[g])==null?void 0:N.autonym};return n.jsxs("div",{id:w,className:h("pr-twp tw-max-w-sm",c),children:[n.jsxs(He,{name:"uiLanguage",value:e,onValueChange:f,open:u,onOpenChange:g=>m(g),children:[n.jsx(Oe,{children:n.jsx(Ue,{})}),n.jsx(Ae,{style:{zIndex:cn},children:Object.keys(t).map(g=>n.jsx(Xt,{value:g,children:p(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(xt,{className:"tw-font-normal tw-text-muted-foreground",children:_.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>p(g,e)).join(", "):t.en.autonym})})})]})}function Nw({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(xt,{children:e(t)}):r?n.jsx(xt,{children:r(t)}):n.jsx(xt,{children:t})}function kw({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(pr,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(Nw,{item:c,createLabel:a,createComplexLabel:l})]},c))})}function _w({scrRef:t,onClick:e,tooltipContent:r,ariaLabel:o,className:s,testId:a="linked-scr-ref-button"}){if(t==="")return;const l=n.jsx(B,{type:"button",variant:"link",onClick:e,disabled:!e,"aria-label":o,className:h("tw-h-auto tw-p-0 tw-text-start tw-font-mono tw-text-sm",s),"data-testid":a,children:t});return r?n.jsx(Ct,{delayDuration:0,children:n.jsxs(Dt,{children:[n.jsx(Mt,{asChild:!0,children:l}),n.jsx(St,{children:r})]})}):l}function Cw({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:l,selectedButtons:c,hoverButtons:w,dropdownContent:d,additionalContent:u,accentColor:m,showDropdownOnHover:f=!1}){const p=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:h("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&f&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(ie,{children:[n.jsx(ve,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(E.MoreVertical,{})})}),n.jsx(ee,{align:"end",children:d})]})}),e&&d&&n.jsxs(ie,{children:[n.jsx(ve,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(E.MoreVertical,{})})}),n.jsx(ee,{align:"end",children:d})]})]}),u&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:u})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const Za=i.forwardRef(({className:t,...e},r)=>n.jsx(E.LoaderCircle,{size:35,className:h("tw-animate-spin",t),...e,ref:r}));Za.displayName="Spinner";function Sw({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:l,isRequired:c=!1,className:w,defaultValue:d,value:u,onChange:m,onFocus:f,onBlur:p}){return n.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(xt,{htmlFor:t,className:h({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(Xe,{id:t,disabled:e,placeholder:l,required:c,className:h(w,{"tw-border-red-600":r}),defaultValue:d,value:u,onChange:m,onFocus:f,onBlur:p}),n.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const Ew=Pe.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ja=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:h("pr-twp",Ew({variant:e}),t),...r}));Ja.displayName="Alert";const Qa=i.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Qa.displayName="AlertTitle";const ti=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));ti.displayName="AlertDescription";const Rw=dt.Root,Tw=dt.Trigger,Iw=dt.Group,Dw=dt.Portal,Mw=dt.Sub,Ow=dt.RadioGroup,ei=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(dt.SubTrigger,{ref:s,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(E.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ei.displayName=dt.SubTrigger.displayName;const ni=i.forwardRef(({className:t,...e},r)=>n.jsx(dt.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));ni.displayName=dt.SubContent.displayName;const ri=i.forwardRef(({className:t,...e},r)=>n.jsx(dt.Portal,{children:n.jsx(dt.Content,{ref:r,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));ri.displayName=dt.Content.displayName;const oi=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(dt.Item,{ref:o,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));oi.displayName=dt.Item.displayName;const si=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(dt.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(dt.ItemIndicator,{children:n.jsx(E.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));si.displayName=dt.CheckboxItem.displayName;const ai=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(dt.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(dt.ItemIndicator,{children:n.jsx(E.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));ai.displayName=dt.RadioItem.displayName;const ii=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(dt.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));ii.displayName=dt.Label.displayName;const li=i.forwardRef(({className:t,...e},r)=>n.jsx(dt.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));li.displayName=dt.Separator.displayName;function ci({className:t,...e}){return n.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ci.displayName="ContextMenuShortcut";const di=i.createContext({direction:"bottom"});function wi({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=i.useMemo(()=>({direction:e}),[e]);return n.jsx(di.Provider,{value:o,children:n.jsx(le.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}wi.displayName="Drawer";const Aw=le.Drawer.Trigger,ui=le.Drawer.Portal,Pw=le.Drawer.Close,vo=i.forwardRef(({className:t,...e},r)=>n.jsx(le.Drawer.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));vo.displayName=le.Drawer.Overlay.displayName;const pi=i.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=i.useContext(di),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ui,{children:[n.jsx(vo,{}),n.jsxs(le.Drawer.Content,{ref:s,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",l[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});pi.displayName="DrawerContent";function mi({className:t,...e}){return n.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}mi.displayName="DrawerHeader";function fi({className:t,...e}){return n.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}fi.displayName="DrawerFooter";const hi=i.forwardRef(({className:t,...e},r)=>n.jsx(le.Drawer.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));hi.displayName=le.Drawer.Title.displayName;const gi=i.forwardRef(({className:t,...e},r)=>n.jsx(le.Drawer.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));gi.displayName=le.Drawer.Description.displayName;const xi=i.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Ir.Root,{ref:o,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Ir.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));xi.displayName=Ir.Root.displayName;function Lw({className:t,...e}){return n.jsx(Pr.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const $w=Pr.Panel;function Fw({withHandle:t,className:e,...r}){return n.jsx(Pr.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(E.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Gw({...t}){return n.jsx(ts.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const bi=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsxs(bn.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(bn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(bn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(bn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});bi.displayName=bn.Root.displayName;const vi=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsx(Dr.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Dr.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});vi.displayName=Dr.Root.displayName;const Vw=qt.Root,yi=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsx(qt.List,{ref:r,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});yi.displayName=qt.List.displayName;const ji=i.forwardRef(({className:t,...e},r)=>n.jsx(qt.Trigger,{ref:r,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));ji.displayName=qt.Trigger.displayName;const Ni=i.forwardRef(({className:t,...e},r)=>n.jsx(qt.Content,{ref:r,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Ni.displayName=qt.Content.displayName;const ki=i.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ki.displayName="Textarea";const Bw=(t,e)=>{i.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function zw(t){return{preserveValue:!0,...t}}const _i=(t,e,r={})=>{const o=i.useRef(e);o.current=e;const s=i.useRef(r);s.current=zw(s.current);const[a,l]=i.useState(()=>o.current),[c,w]=i.useState(!0);return i.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const u=await t();d&&(l(()=>u),w(!1))}})(),()=>{d=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[a,c]},Er=()=>!1,Kw=(t,e)=>{const[r]=_i(i.useCallback(async()=>{if(!t)return Er;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Er,{preserveValue:!1});i.useEffect(()=>()=>{r!==Er&&r()},[r])};function qw(t){i.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>ts.toast});exports.Alert=Ja;exports.AlertDescription=ti;exports.AlertTitle=Qa;exports.Avatar=Jr;exports.AvatarFallback=Qr;exports.AvatarImage=Zs;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=pl;exports.BOOK_SELECTOR_STRING_KEYS=hl;exports.Badge=ae;exports.BookChapterControl=zn;exports.BookSelector=gl;exports.Button=B;exports.COMMENT_EDITOR_STRING_KEYS=Fc;exports.COMMENT_LIST_STRING_KEYS=Gc;exports.Card=Wr;exports.CardContent=Zr;exports.CardDescription=Xs;exports.CardFooter=Ws;exports.CardHeader=Us;exports.CardTitle=Ys;exports.ChapterRangeSelector=xs;exports.Checkbox=pr;exports.Checklist=kw;exports.ComboBox=Xn;exports.Command=ce;exports.CommandEmpty=Ye;exports.CommandGroup=te;exports.CommandInput=Le;exports.CommandItem=ne;exports.CommandList=de;exports.CommentEditor=$c;exports.CommentList=Kc;exports.ContextMenu=Rw;exports.ContextMenuCheckboxItem=si;exports.ContextMenuContent=ri;exports.ContextMenuGroup=Iw;exports.ContextMenuItem=oi;exports.ContextMenuLabel=ii;exports.ContextMenuPortal=Dw;exports.ContextMenuRadioGroup=Ow;exports.ContextMenuRadioItem=ai;exports.ContextMenuSeparator=li;exports.ContextMenuShortcut=ci;exports.ContextMenuSub=Mw;exports.ContextMenuSubContent=ni;exports.ContextMenuSubTrigger=ei;exports.ContextMenuTrigger=Tw;exports.DataTable=la;exports.Dialog=Un;exports.DialogClose=sl;exports.DialogContent=jn;exports.DialogDescription=ls;exports.DialogFooter=Yn;exports.DialogHeader=Nn;exports.DialogOverlay=$r;exports.DialogPortal=is;exports.DialogTitle=kn;exports.DialogTrigger=ol;exports.Drawer=wi;exports.DrawerClose=Pw;exports.DrawerContent=pi;exports.DrawerDescription=gi;exports.DrawerFooter=fi;exports.DrawerHeader=mi;exports.DrawerOverlay=vo;exports.DrawerPortal=ui;exports.DrawerTitle=hi;exports.DrawerTrigger=Aw;exports.DropdownMenu=ie;exports.DropdownMenuCheckboxItem=Qt;exports.DropdownMenuContent=ee;exports.DropdownMenuGroup=eo;exports.DropdownMenuItem=ke;exports.DropdownMenuItemType=wa;exports.DropdownMenuLabel=Ce;exports.DropdownMenuPortal=Js;exports.DropdownMenuRadioGroup=ta;exports.DropdownMenuRadioItem=oo;exports.DropdownMenuSeparator=ye;exports.DropdownMenuShortcut=ea;exports.DropdownMenuSub=Qs;exports.DropdownMenuSubContent=ro;exports.DropdownMenuSubTrigger=no;exports.DropdownMenuTrigger=ve;exports.ERROR_DUMP_STRING_KEYS=ca;exports.ERROR_POPOVER_STRING_KEYS=Jc;exports.EditorKeyboardShortcuts=fa;exports.ErrorDump=da;exports.ErrorPopover=Qc;exports.FOOTNOTE_EDITOR_STRING_KEYS=hd;exports.Filter=od;exports.FilterDropdown=td;exports.Footer=rd;exports.FootnoteEditor=fd;exports.FootnoteItem=ba;exports.FootnoteList=bd;exports.INVENTORY_STRING_KEYS=Td;exports.Input=Xe;exports.Inventory=Md;exports.Label=xt;exports.LinkedScrRefButton=_w;exports.MARKER_MENU_STRING_KEYS=ha;exports.MarkdownRenderer=Zc;exports.MarkerMenu=ga;exports.MoreInfo=ed;exports.MultiSelectComboBox=ua;exports.NavigationContentSearch=uw;exports.Popover=we;exports.PopoverAnchor=ps;exports.PopoverContent=re;exports.PopoverPortalContainerProvider=Vn;exports.PopoverTrigger=je;exports.Progress=xi;exports.ProjectSelector=Vd;exports.RadioGroup=dr;exports.RadioGroupItem=_n;exports.RecentSearches=hs;exports.ResizableHandle=Fw;exports.ResizablePanel=$w;exports.ResizablePanelGroup=Lw;exports.ResultsCard=Cw;exports.SCOPE_SELECTOR_STRING_KEYS=rw;exports.ScopeSelector=sw;exports.ScriptureResultsViewer=tw;exports.ScrollGroupSelector=aw;exports.SearchBar=mr;exports.Select=He;exports.SelectContent=Ae;exports.SelectGroup=na;exports.SelectItem=Xt;exports.SelectLabel=oa;exports.SelectScrollDownButton=ao;exports.SelectScrollUpButton=so;exports.SelectSeparator=sa;exports.SelectTrigger=Oe;exports.SelectValue=Ue;exports.Separator=qe;exports.SettingsList=iw;exports.SettingsListHeader=cw;exports.SettingsListItem=lw;exports.SettingsSidebar=Pa;exports.SettingsSidebarContentSearch=Hd;exports.Sidebar=co;exports.SidebarContent=uo;exports.SidebarFooter=Sa;exports.SidebarGroup=nr;exports.SidebarGroupAction=Ra;exports.SidebarGroupContent=or;exports.SidebarGroupLabel=rr;exports.SidebarHeader=Ca;exports.SidebarInput=_a;exports.SidebarInset=wo;exports.SidebarMenu=po;exports.SidebarMenuAction=Ta;exports.SidebarMenuBadge=Ia;exports.SidebarMenuButton=fo;exports.SidebarMenuItem=mo;exports.SidebarMenuSkeleton=Da;exports.SidebarMenuSub=Ma;exports.SidebarMenuSubButton=Aa;exports.SidebarMenuSubItem=Oa;exports.SidebarProvider=lo;exports.SidebarRail=ka;exports.SidebarSeparator=Ea;exports.SidebarTrigger=Na;exports.Skeleton=er;exports.Slider=bi;exports.Sonner=Gw;exports.Spinner=Za;exports.Switch=vi;exports.TabDropdownMenu=ar;exports.TabFloatingMenu=ww;exports.TabToolbar=dw;exports.Table=En;exports.TableBody=Tn;exports.TableCaption=ia;exports.TableCell=Me;exports.TableFooter=aa;exports.TableHead=on;exports.TableHeader=Rn;exports.TableRow=xe;exports.Tabs=Vw;exports.TabsContent=Ni;exports.TabsList=yi;exports.TabsTrigger=ji;exports.TextField=Sw;exports.Textarea=ki;exports.ToggleGroup=ur;exports.ToggleGroupItem=en;exports.Toolbar=vw;exports.Tooltip=Dt;exports.TooltipContent=St;exports.TooltipProvider=Ct;exports.TooltipTrigger=Mt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=pa;exports.UiLanguageSelector=jw;exports.UndoRedoButtons=ma;exports.VerticalTabs=go;exports.VerticalTabsContent=bo;exports.VerticalTabsList=xo;exports.VerticalTabsTrigger=Ba;exports.Z_INDEX_ABOVE_DOCK=cn;exports.Z_INDEX_FOOTNOTE_EDITOR=Lr;exports.Z_INDEX_MODAL=ss;exports.Z_INDEX_MODAL_BACKDROP=os;exports.Z_INDEX_OVERLAY=lr;exports.Z_INDEX_TOOLTIP=as;exports.badgeVariants=Hs;exports.buttonVariants=Vr;exports.cn=h;exports.computeRows=Hn;exports.getBookIdFromUSFM=Rd;exports.getInventoryHeader=In;exports.getLinesFromUSFM=Sd;exports.getNumberFromUSFM=Ed;exports.getStatusForItem=va;exports.getToolbarOSReservedSpaceClassName=bw;exports.inventoryCountColumn=_d;exports.inventoryItemColumn=Nd;exports.inventoryStatusColumn=Cd;exports.partitionAndSort=ya;exports.scrollGroupLetter=sn;exports.selectTriggerVariants=ra;exports.useEvent=Bw;exports.useEventAsync=Kw;exports.useListbox=qs;exports.usePromise=_i;exports.useRecentSearches=il;exports.useSidebar=Dn;exports.useStylesheet=qw;function Hw(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Hw(`*, ::before, ::after {
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
.data-\\[highlighted\\]\\:tw-bg-accent[data-highlighted] {
  background-color: hsl(var(--accent));
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
.data-\\[highlighted\\]\\:tw-text-accent-foreground[data-highlighted] {
  color: hsl(var(--accent-foreground));
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
