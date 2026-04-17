"use strict";var Ea=Object.defineProperty;var Sa=(t,e,r)=>e in t?Ea(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var gt=(t,e,r)=>Sa(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),i=require("react"),jt=require("cmdk"),k=require("lucide-react"),Ra=require("clsx"),Ta=require("tailwind-merge"),Ma=require("@radix-ui/react-dialog"),st=require("@sillsdev/scripture"),j=require("platform-bible-utils"),Ie=require("@radix-ui/react-slot"),de=require("class-variance-authority"),Da=require("@radix-ui/react-popover"),Ia=require("@radix-ui/react-label"),Oa=require("@radix-ui/react-radio-group"),x=require("lexical"),Zr=require("@radix-ui/react-tooltip"),On=require("@lexical/rich-text"),Tr=require("react-dom"),Aa=require("@lexical/table"),Pa=require("@radix-ui/react-toggle-group"),La=require("@radix-ui/react-toggle"),Jr=require("@lexical/headless"),$a=require("@radix-ui/react-separator"),Fa=require("@radix-ui/react-avatar"),Qr=require("@radix-ui/react-dropdown-menu"),bt=require("@tanstack/react-table"),Va=require("@radix-ui/react-select"),za=require("markdown-to-jsx"),Tt=require("@eten-tech-foundation/platform-editor"),Ba=require("@radix-ui/react-checkbox"),Ga=require("@radix-ui/react-tabs"),Ka=require("@radix-ui/react-menubar"),qa=require("react-hotkeys-hook"),Ua=require("@radix-ui/react-context-menu"),Ot=require("vaul"),Ha=require("@radix-ui/react-progress"),Ya=require("react-resizable-panels"),to=require("sonner"),Xa=require("@radix-ui/react-slider"),Wa=require("@radix-ui/react-switch");function dt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Ct=dt(Ma),Te=dt(Da),eo=dt(Ia),Ge=dt(Oa),he=dt(Zr),mn=dt(Pa),no=dt(La),ro=dt($a),Oe=dt(Fa),Q=dt(Qr),ot=dt(Va),An=dt(Ba),Nt=dt(Ga),tt=dt(Ka),et=dt(Ua),Pn=dt(Ha),Bn=dt(Ya),Ve=dt(Xa),Ln=dt(Wa),Za=Ta.extendTailwindMerge({prefix:"tw-"});function f(...t){return Za(Ra.clsx(t))}const ye=250,Gn=300,oo=400,so=450,ao=500,Ja="layoutDirection";function at(){const t=localStorage.getItem(Ja);return t==="rtl"?t:"ltr"}const io=Ct.Root,Qa=Ct.Trigger,lo=Ct.Portal,ti=Ct.Close,Kn=i.forwardRef(({className:t,style:e,...r},o)=>n.jsx(Ct.Overlay,{ref:o,className:f("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:so,...e},...r}));Kn.displayName=Ct.Overlay.displayName;const qn=i.forwardRef(({className:t,children:e,overlayClassName:r,style:o,...s},a)=>{const l=at();return n.jsxs(lo,{children:[n.jsx(Kn,{className:r}),n.jsxs(Ct.Content,{ref:a,className:f("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:ao,...o},...s,dir:l,children:[e,n.jsxs(Ct.Close,{className:f("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":l==="ltr"},{"tw-left-4":l==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});qn.displayName=Ct.Content.displayName;function Un({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Un.displayName="DialogHeader";function co({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}co.displayName="DialogFooter";const Hn=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Hn.displayName=Ct.Title.displayName;const wo=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));wo.displayName=Ct.Description.displayName;const Ut=i.forwardRef(({className:t,...e},r)=>n.jsx(jt.Command,{ref:r,className:f("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Ut.displayName=jt.Command.displayName;const je=i.forwardRef(({className:t,...e},r)=>{const o=at();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(jt.Command.Input,{ref:r,className:f("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});je.displayName=jt.Command.Input.displayName;const Ht=i.forwardRef(({className:t,...e},r)=>n.jsx(jt.Command.List,{ref:r,className:f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Ht.displayName=jt.Command.List.displayName;const Ae=i.forwardRef((t,e)=>n.jsx(jt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ae.displayName=jt.Command.Empty.displayName;const It=i.forwardRef(({className:t,...e},r)=>n.jsx(jt.Command.Group,{ref:r,className:f("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));It.displayName=jt.Command.Group.displayName;const Yn=i.forwardRef(({className:t,...e},r)=>n.jsx(jt.Command.Separator,{ref:r,className:f("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Yn.displayName=jt.Command.Separator.displayName;const At=i.forwardRef(({className:t,...e},r)=>n.jsx(jt.Command.Item,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));At.displayName=jt.Command.Item.displayName;function po({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}po.displayName="CommandShortcut";const uo=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"Old Testament";case j.Section.NT:return r??"New Testament";case j.Section.DC:return o??"Deuterocanon";case j.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},ei=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"OT";case j.Section.NT:return r??"NT";case j.Section.DC:return o??"DC";case j.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Se(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??st.Canon.bookIdToEnglishName(t)}function Xn(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const mo=st.Canon.allBookIds.filter(t=>!st.Canon.isObsolete(st.Canon.bookIdToNumber(t))),fe=Object.fromEntries(mo.map(t=>[t,st.Canon.bookIdToEnglishName(t)]));function Wn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=st.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(j.includes(s.toLowerCase(),o)||j.includes(t.toLowerCase(),o)||(a?j.includes(a.localizedName.toLowerCase(),o)||j.includes(a.localizedId.toLowerCase(),o):!1))}const fo=i.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:l=!1,localizedBookNames:c,commandValue:d},w)=>{const p=i.useRef(!1),m=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=y=>{p.current=!0,o?o(y):r==null||r(t)},u=i.useMemo(()=>Se(t,c),[t,c]),g=i.useMemo(()=>Xn(t,c),[t,c]);return n.jsx("div",{className:f("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===j.Section.OT,"tw-border-s-purple-200":s===j.Section.NT,"tw-border-s-indigo-200":s===j.Section.DC,"tw-border-s-amber-200":s===j.Section.Extra}),children:n.jsxs(At,{ref:w,value:d||`${t} ${st.Canon.bookIdToEnglishName(t)}`,onSelect:m,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${st.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:a,children:[l&&n.jsx(k.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Zn=de.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),F=i.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const l=o?Ie.Slot:"button";return n.jsx(l,{className:f(Zn({variant:e,size:r,className:t})),ref:a,...s})});F.displayName="Button";const Yt=Te.Root,Jt=Te.Trigger,ho=Te.Anchor,Pt=i.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},a)=>{const l=at();return n.jsx(Te.Portal,{children:n.jsx(Te.Content,{ref:a,align:e,sideOffset:r,className:f("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:ye,...o},...s,dir:l})})});Pt.displayName=Te.Content.displayName;function $n(t,e,r){return`${t} ${fe[t]}${e?` ${Xn(t,e)} ${Se(t,e)}`:""}${r?` ${r}`:""}`}function go({recentSearches:t,onSearchItemSelect:e,renderItem:r=p=>String(p),getItemKey:o=p=>String(p),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:l,classNameForItems:c,buttonClassName:d="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:w="ghost"}){const[p,m]=i.useState(!1);if(t.length===0)return;const h=u=>{e(u),m(!1)};return n.jsxs(Yt,{open:p,onOpenChange:m,children:[n.jsx(Jt,{asChild:!0,children:n.jsx(F,{variant:w,size:"icon",className:d,"aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Pt,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Ut,{children:n.jsx(Ht,{children:n.jsx(It,{heading:a,children:t.map(u=>n.jsxs(At,{onSelect:()=>h(u),className:f("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function ni(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),l=[s,...a.slice(0,o-1)];e(l)}}const yn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ri=[yn.BOOK_ONLY,yn.BOOK_CHAPTER,yn.BOOK_CHAPTER_VERSE];function Mr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Bt(t){return j.getChaptersForBook(st.Canon.bookIdToNumber(t))}function oi(t,e,r){if(!t.trim()||e.length===0)return;const o=ri.reduce((s,a)=>{if(s)return s;const l=a.exec(t.trim());if(l){const[c,d=void 0,w=void 0]=l.slice(1);let p;const m=e.filter(h=>Wn(h,c,r));if(m.length===1&&([p]=m),!p&&d){if(st.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&d){const u=(g=>Object.keys(fe).find(y=>fe[y].toLowerCase()===g.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=d?parseInt(d,10):void 0;h&&h>Bt(p)&&(h=Math.max(Bt(p),1));const u=w?parseInt(w,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function si(t,e,r,o){const s=i.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],p=Math.max(Bt(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[t,e,o]),a=i.useCallback(()=>{const d=Bt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const p=e[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),l=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return i.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:l,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===Bt(t.book)||Bt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,l,c,a])}function Dr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(t)return n.jsx(It,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:Bt(t)},(l,c)=>c+1).map(l=>n.jsx(At,{value:`${t} ${fe[t]||""} ${l}`,onSelect:()=>r(l),ref:o(l),className:f("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&l===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(l))??!1}),children:l},l))})})}function ai({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:l,onAddRecentSearch:c,id:d}){const w=at(),[p,m]=i.useState(!1),[h,u]=i.useState(""),[g,y]=i.useState(""),[v,T]=i.useState("books"),[b,_]=i.useState(void 0),[C,B]=i.useState(!1),V=i.useRef(void 0),$=i.useRef(void 0),R=i.useRef(void 0),D=i.useRef(void 0),S=i.useRef({}),P=i.useCallback(I=>{e(I),c&&c(I)},[e,c]),O=i.useMemo(()=>o?o():mo,[o]),q=i.useMemo(()=>({[j.Section.OT]:O.filter(E=>st.Canon.isBookOT(E)),[j.Section.NT]:O.filter(E=>st.Canon.isBookNT(E)),[j.Section.DC]:O.filter(E=>st.Canon.isBookDC(E)),[j.Section.Extra]:O.filter(E=>st.Canon.extraBooks().includes(E))}),[O]),L=i.useMemo(()=>Object.values(q).flat(),[q]),H=i.useMemo(()=>{if(!g.trim())return q;const I={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return[j.Section.OT,j.Section.NT,j.Section.DC,j.Section.Extra].forEach(A=>{I[A]=q[A].filter(U=>Wn(U,g,s))}),I},[q,g,s]),N=i.useMemo(()=>oi(g,L,s),[g,L,s]),K=i.useCallback(()=>{N&&(P({book:N.book,chapterNum:N.chapterNum??1,verseNum:N.verseNum??1}),m(!1),y(""),u(""))},[P,N]),it=i.useCallback(I=>{if(Bt(I)<=1){P({book:I,chapterNum:1,verseNum:1}),m(!1),y("");return}_(I),T("chapters")},[P]),ht=i.useCallback(I=>{const E=v==="chapters"?b:N==null?void 0:N.book;E&&(P({book:E,chapterNum:I,verseNum:1}),m(!1),T("books"),_(void 0),y(""))},[P,v,b,N]),Et=i.useCallback(I=>{P(I),m(!1),y("")},[P]),wt=si(t,L,w,e),kt=i.useCallback(()=>{T("books"),_(void 0),setTimeout(()=>{$.current&&$.current.focus()},0)},[]),z=i.useCallback(I=>{if(!I&&v==="chapters"){kt();return}m(I),I&&(T("books"),_(void 0),y(""))},[v,kt]),{otLong:nt,ntLong:rt,dcLong:lt,extraLong:pt}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},te=i.useCallback(I=>uo(I,nt,rt,lt,pt),[nt,rt,lt,pt]),we=i.useCallback(I=>N?!!N.chapterNum&&!I.toString().includes(N.chapterNum.toString()):!1,[N]),_e=i.useMemo(()=>j.formatScrRef(t,s?Se(t.book,s):"English"),[t,s]),Mt=i.useCallback(I=>E=>{S.current[I]=E},[]),Wt=i.useCallback(I=>{(I.key==="Home"||I.key==="End")&&I.stopPropagation()},[]),Le=i.useCallback(I=>{if(I.ctrlKey)return;const{isLetter:E,isDigit:A}=Mr(I.key);if(v==="chapters"){if(I.key==="Backspace"){I.preventDefault(),I.stopPropagation(),kt();return}if(E||A){if(I.preventDefault(),I.stopPropagation(),T("books"),_(void 0),A&&b){const U=fe[b];y(`${U} ${I.key}`)}else y(I.key);setTimeout(()=>{$.current&&$.current.focus()},0);return}}if((v==="chapters"||v==="books"&&N)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(I.key)){const U=v==="chapters"?b:N==null?void 0:N.book;if(!U)return;const G=(()=>{if(!h)return 1;const J=h.match(/(\d+)$/);return J?parseInt(J[1],10):0})(),Y=Bt(U);if(!Y)return;let Z=G;const ut=6;switch(I.key){case"ArrowLeft":G!==0&&(Z=G>1?G-1:Y);break;case"ArrowRight":G!==0&&(Z=G<Y?G+1:1);break;case"ArrowUp":Z=G===0?Y:Math.max(1,G-ut);break;case"ArrowDown":Z=G===0?1:Math.min(Y,G+ut);break;default:return}Z!==G&&(I.preventDefault(),I.stopPropagation(),u($n(U,s,Z)),setTimeout(()=>{const J=S.current[Z];J&&J.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[v,N,kt,b,h,s]),ee=i.useCallback(I=>{if(I.shiftKey||I.key==="Tab"||I.key===" ")return;const{isLetter:E,isDigit:A}=Mr(I.key);(E||A)&&(I.preventDefault(),y(U=>U+I.key),$.current.focus(),B(!1))},[]);return i.useLayoutEffect(()=>{const I=setTimeout(()=>{if(p&&v==="books"&&R.current&&D.current){const E=R.current,A=D.current,U=A.offsetTop,G=E.clientHeight,Y=A.clientHeight,Z=U-G/2+Y/2;E.scrollTo({top:Math.max(0,Z),behavior:"smooth"}),u($n(t.book))}},0);return()=>{clearTimeout(I)}},[p,v,g,N,t.book]),i.useLayoutEffect(()=>{if(v==="chapters"&&b){const I=b===t.book;setTimeout(()=>{if(R.current)if(I){const E=S.current[t.chapterNum];E&&E.scrollIntoView({block:"center",behavior:"smooth"})}else R.current.scrollTo({top:0});V.current&&V.current.focus()},0)}},[v,b,N,t.book,t.chapterNum]),n.jsxs(Yt,{open:p,onOpenChange:z,children:[n.jsx(Jt,{asChild:!0,children:n.jsx(F,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:f("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:_e})})}),n.jsx(Pt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Ut,{ref:V,onKeyDown:Le,loop:!0,value:h,onValueChange:u,shouldFilter:!1,children:[v==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(je,{ref:$,value:g,onValueChange:y,onKeyDown:Wt,onFocus:()=>B(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&n.jsx(go,{recentSearches:l,onSearchItemSelect:Et,renderItem:I=>j.formatScrRef(I,"English"),getItemKey:I=>`${I.book}-${I.chapterNum}-${I.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:wt.map(({onClick:I,disabled:E,title:A,icon:U})=>n.jsx(F,{variant:"ghost",size:"sm",onClick:()=>{B(!0),I()},disabled:E,className:"tw-h-10 tw-w-4 tw-p-0",title:A,onKeyDown:ee,children:n.jsx(U,{})},A))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:kt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),b&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Se(b,s)})]}),!C&&n.jsxs(Ht,{ref:R,children:[v==="books"&&n.jsxs(n.Fragment,{children:[!N&&Object.entries(H).map(([I,E])=>{if(E.length!==0)return n.jsx(It,{heading:te(I),children:E.map(A=>n.jsx(fo,{bookId:A,onSelect:U=>it(U),section:j.getSectionForBook(A),commandValue:`${A} ${fe[A]}`,ref:A===t.book?D:void 0,localizedBookNames:s},A))},I)}),N&&n.jsx(It,{children:n.jsx(At,{value:`${N.book} ${fe[N.book]} ${N.chapterNum||""}:${N.verseNum||""})}`,onSelect:K,className:"tw-font-semibold tw-text-primary",children:j.formatScrRef({book:N.book,chapterNum:N.chapterNum??1,verseNum:N.verseNum??1},s?Xn(N.book,s):void 0)},"top-match")}),N&&Bt(N.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Se(N.book,s)}),n.jsx(Dr,{bookId:N.book,scrRef:t,onChapterSelect:ht,setChapterRef:Mt,isChapterDimmed:we,className:"tw-px-4 tw-pb-4"})]})]}),v==="chapters"&&b&&n.jsx(Dr,{bookId:b,scrRef:t,onChapterSelect:ht,setChapterRef:Mt,className:"tw-p-4"})]})]})})]})}const ii=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),li=de.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),ct=i.forwardRef(({className:t,...e},r)=>n.jsx(eo.Root,{ref:r,className:f("pr-twp",li(),t),...e}));ct.displayName=eo.Root.displayName;const fn=i.forwardRef(({className:t,...e},r)=>{const o=at();return n.jsx(Ge.Root,{className:f("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});fn.displayName=Ge.Root.displayName;const Ke=i.forwardRef(({className:t,...e},r)=>n.jsx(Ge.Item,{ref:r,className:f("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ge.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ke.displayName=Ge.Item.displayName;function ci(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function on({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:a,value:l,onChange:c=()=>{},getOptionLabel:d=ci,getButtonLabel:w,icon:p=void 0,buttonPlaceholder:m="",textPlaceholder:h="",commandEmptyMessage:u="No option found",buttonVariant:g="outline",alignDropDown:y="start",isDisabled:v=!1,ariaLabel:T,...b}){const[_,C]=i.useState(!1),B=w??d,V=R=>R.length>0&&typeof R[0]=="object"&&"options"in R[0],$=(R,D)=>{const S=d(R),P=typeof R=="object"&&"secondaryLabel"in R?R.secondaryLabel:void 0,O=`${D??""}${S}${P??""}`;return n.jsxs(At,{value:S,onSelect:()=>{c(R),C(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!l||d(l)!==S})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[S,P&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",P]})]})]},O)};return n.jsxs(Yt,{open:_,onOpenChange:C,...b,children:[n.jsx(Jt,{asChild:!0,children:n.jsxs(F,{variant:g,role:"combobox","aria-expanded":_,"aria-label":T,id:t,className:f("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:p}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:l?B(l):m})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{align:y,className:f("tw-w-[200px] tw-p-0",s),style:a,children:n.jsxs(Ut,{children:[n.jsx(je,{placeholder:h,className:"tw-text-inherit"}),n.jsx(Ae,{children:u}),n.jsx(Ht,{children:V(e)?e.map(R=>n.jsx(It,{heading:R.groupHeading,children:R.options.map(D=>$(D,R.groupHeading))},R.groupHeading)):e.map(R=>$(R))})]})})]})}function xo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const l=i.useMemo(()=>Array.from({length:a},(w,p)=>p+1),[a]),c=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(ct,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(on,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(ct,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(on,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const di=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),jn=(t,e)=>t[e]??e;function wi({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=jn(w,"%webView_bookSelector_currentBook%"),m=jn(w,"%webView_bookSelector_choose%"),h=jn(w,"%webView_bookSelector_chooseBooks%"),[u,g]=i.useState("current book"),y=v=>{g(v),t(v)};return n.jsx(fn,{className:"pr-twp tw-flex",value:u,onValueChange:v=>y(v),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ke,{value:"current book"}),n.jsx(ct,{className:"tw-ms-1",children:p})]}),n.jsx(ct,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(xo,{isDisabled:u==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ke,{value:"choose books"}),n.jsx(ct,{className:"tw-ms-1",children:h})]}),n.jsx(ct,{className:"tw-flex tw-items-center",children:o.map(v=>st.Canon.bookIdToEnglishName(v)).join(", ")}),n.jsx(F,{disabled:u==="current book",onClick:()=>r(),children:m})]})]})})}const bo=i.createContext(null);function pi(t,e){return{getTheme:function(){return e??null}}}function Xt(){const t=i.useContext(bo);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const vo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ui=vo?i.useLayoutEffect:i.useEffect,Qe={tag:x.HISTORY_MERGE_TAG};function mi({initialConfig:t,children:e}){const r=i.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:l,editorState:c,html:d}=t,w=pi(null,o),p=x.createEditor({editable:t.editable,html:d,namespace:s,nodes:a,onError:m=>l(m,p),theme:o});return function(m,h){if(h!==null){if(h===void 0)m.update(()=>{const u=x.$getRoot();if(u.isEmpty()){const g=x.$createParagraphNode();u.append(g);const y=vo?document.activeElement:null;(x.$getSelection()!==null||y!==null&&y===m.getRootElement())&&g.select()}},Qe);else if(h!==null)switch(typeof h){case"string":{const u=m.parseEditorState(h);m.setEditorState(u,Qe);break}case"object":m.setEditorState(h,Qe);break;case"function":m.update(()=>{x.$getRoot().isEmpty()&&h(m)},Qe)}}}(p,c),[p,w]},[]);return ui(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(bo.Provider,{value:r,children:e})}const fi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function hi({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Xt();return fi(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:l,prevEditorState:c,tags:d})=>{e&&a.size===0&&l.size===0||t&&d.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const Jn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},mt=he.Provider,vt=he.Root,yt=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(he.Trigger,{ref:o,className:e?f(Zn({variant:e}),t):t,...r}));yt.displayName=he.Trigger.displayName;const ft=i.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(he.Portal,{children:n.jsx(he.Content,{ref:s,sideOffset:e,style:{zIndex:ye,...r},className:f("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));ft.displayName=he.Content.displayName;const Qn=[On.HeadingNode,x.ParagraphNode,x.TextNode,On.QuoteNode],gi=i.createContext(null),Nn={didCatch:!1,error:null};class xi extends i.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Nn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),l=0;l<s;l++)a[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(Nn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&bi(e.resetKeys,s)){var a,l;(a=(l=this.props).onReset)===null||a===void 0||a.call(l,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(Nn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:l}=this.state;let c=e;if(a){const d={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=i.createElement(o,d);else if(s!==void 0)c=s;else throw l}return i.createElement(gi.Provider,{value:{didCatch:a,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function bi(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function vi({children:t,onError:e}){return n.jsx(xi,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const yi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function ji(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Ni(){return function(t){const[e]=Xt(),r=i.useMemo(()=>t(e),[e,t]),[o,s]=i.useState(()=>r.initialValueFn()),a=i.useRef(o);return yi(()=>{const{initialValueFn:l,subscribe:c}=r,d=l();return a.current!==d&&(a.current=d,s(d)),c(w=>{a.current=w,s(w)})},[r,t]),o}(ji)}function ki(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,l=t.isBackward(),c=s.getNode(),d=a.getNode(),w=e.is(c),p=e.is(d);if(w||p){const[m,h]=x.$getCharacterOffsets(t),u=c.is(d),g=e.is(l?d:c),y=e.is(l?c:d);let v,T=0;u?(T=m>h?h:m,v=m>h?m:h):g?(T=l?h:m,v=void 0):y&&(T=0,v=l?m:h);const b=e.__text.slice(T,v);b!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=b)}}return e}function _i(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const yo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ci=yo&&"documentMode"in document?document.documentMode:null;!(!yo||!("InputEvent"in window)||Ci)&&"getTargetRanges"in new window.InputEvent("input");function Ei(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||_i(4,t.__key),e}function Si(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const a=o[s],l=a.getKey();if(r.has(l))continue;const c=x.$findMatchingParent(a,w=>x.$isElementNode(w)&&!w.isInline());if(c===null)continue;const d=c.getKey();c.canIndent()&&!r.has(d)&&(r.add(d),t(c))}return r.size>0}const Ri=Symbol.for("preact-signals");function hn(){if(oe>1)return void oe--;let t,e=!1;for(;ze!==void 0;){let r=ze;for(ze=void 0,Fn++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&jo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(Fn=0,oe--,e)throw t}function Ti(t){if(oe>0)return t();oe++;try{return t()}finally{hn()}}let X,ze;function Ir(t){const e=X;X=void 0;try{return t()}finally{X=e}}let oe=0,Fn=0,nn=0;function Or(t){if(X===void 0)return;let e=t.n;return e===void 0||e.t!==X?(e={i:0,S:t,p:X.s,n:void 0,t:X,e:void 0,x:void 0,r:e},X.s!==void 0&&(X.s.n=e),X.s=e,t.n=e,32&X.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=X.s,e.n=void 0,X.s.n=e,X.s=e),e):void 0}function xt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function qe(t,e){return new xt(t,e)}function jo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Ar(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function No(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function ue(t,e){xt.call(this,void 0),this.x=t,this.s=void 0,this.g=nn-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Mi(t,e){return new ue(t,e)}function ko(t){const e=t.u;if(t.u=void 0,typeof e=="function"){oe++;const r=X;X=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,tr(t),o}finally{X=r,hn()}}}function tr(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,ko(t)}function Di(t){if(X!==this)throw new Error("Out-of-order effect");No(this),X=t,this.f&=-2,8&this.f&&tr(this),hn()}function Ee(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function ae(t,e){const r=new Ee(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function gn(t,e={}){const r={};for(const o in t){const s=e[o],a=qe(s===void 0?t[o]:s);r[o]=a}return r}xt.prototype.brand=Ri,xt.prototype.h=function(){return!0},xt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Ir(()=>{var r;(r=this.W)==null||r.call(this)}))},xt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Ir(()=>{var o;(o=this.Z)==null||o.call(this)}))}},xt.prototype.subscribe=function(t){return ae(()=>{const e=this.value,r=X;X=void 0;try{t(e)}finally{X=r}},{name:"sub"})},xt.prototype.valueOf=function(){return this.value},xt.prototype.toString=function(){return this.value+""},xt.prototype.toJSON=function(){return this.value},xt.prototype.peek=function(){const t=X;X=void 0;try{return this.value}finally{X=t}},Object.defineProperty(xt.prototype,"value",{get(){const t=Or(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Fn>100)throw new Error("Cycle detected");this.v=t,this.i++,nn++,oe++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{hn()}}}}),ue.prototype=new xt,ue.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===nn))return!0;if(this.g=nn,this.f|=1,this.i>0&&!jo(this))return this.f&=-2,!0;const t=X;try{Ar(this),X=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return X=t,No(this),this.f&=-2,!0},ue.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}xt.prototype.S.call(this,t)},ue.prototype.U=function(t){if(this.t!==void 0&&(xt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},ue.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(ue.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Or(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Ee.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},Ee.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,ko(this),Ar(this),oe++;const t=X;return X=this,Di.bind(this,t)},Ee.prototype.N=function(){2&this.f||(this.f|=2,this.o=ze,ze=this)},Ee.prototype.d=function(){this.f|=8,1&this.f||tr(this)},Ee.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return ae(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function _o(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function Co(t,e=_o){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({$onClear:_o}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return ae(()=>Co(t,o.value))}});function Ii(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const kn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class Eo extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:kn}]})}getFormat(){return x.$getState(this,kn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,kn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Oi(t){return t instanceof Eo}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Eo],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const a of s.getNodes())Oi(a)&&a.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function So(t,e){let r;return qe(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const Vn=x.defineExtension({build:t=>So(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Ro(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=Ro(r[s],o[s]);return t}return e}const er=0,zn=1,To=2,_n=3,tn=4,Ce=5,Cn=6,$e=7;function En(t){return t.id===er}function Mo(t){return t.id===To}function Ai(t){return function(e){return e.id===zn}(t)||W(305,String(t.id),String(zn)),Object.assign(t,{id:To})}const Pi=new Set;class Li{constructor(e,r){gt(this,"builder");gt(this,"configs");gt(this,"_dependency");gt(this,"_peerNameSet");gt(this,"extension");gt(this,"state");gt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:er}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Mo(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,d,w){return Object.assign(c,{config:d,id:_n,registerState:w})}(r,this.mergeConfigs(),o);let l;this.state=a,this.extension.init&&(l=this.extension.init(e,a.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:tn,initResult:d,registerState:w})}(a,l,s)}build(e){const r=this.state;let o;r.id!==tn&&W(307,String(r.id),String(Ce)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,l,c){return Object.assign(a,{id:Ce,output:l,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==Ce&&W(308,String(o.id),String(Ce));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:Cn})}(o),()=>{const a=this.state;a.id!==$e&&W(309,String(o.id),String($e)),this.state=function(l){return Object.assign(l,{id:Ce})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==Cn&&W(310,String(r.id),String(Cn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:$e})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const e=this.state;return function(r){return r.id>=tn}(e)||W(313,String(e.id),String(tn)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=_n}(e)||W(314,String(e.id),String(_n)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=$e}(e)||W(316,String(e.id),String($e)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Pi}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=Ce})(e)||W(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Pr={tag:x.HISTORY_MERGE_TAG};function $i(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Fi=x.defineExtension({config:x.safeCast({setOptions:Pr,updateOptions:Pr}),init:({$initialEditorState:t=$i})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(x.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const l=t.parseEditorState(a);t.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Lr=Symbol.for("@lexical/extension/LexicalBuilder");function $r(){}function Vi(t){throw t}function en(t){return Array.isArray(t)?t:[t]}const Sn="0.41.0+prod.esm";class Be{constructor(e){gt(this,"roots");gt(this,"extensionNameMap");gt(this,"outgoingConfigEdges");gt(this,"incomingEdges");gt(this,"conflicts");gt(this,"_sortedExtensionReps");gt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Sn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[en(Fi)];for(const o of e)r.push(en(o));return new Be(r)}static maybeFromEditor(e){const r=e[Lr];return r&&(r.PACKAGE_VERSION!==Sn&&W(292,r.PACKAGE_VERSION,Sn),r instanceof Be||W(293)),r}static fromEditor(e){const r=Be.maybeFromEditor(e);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Lr]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=$r;function r(){try{e()}finally{e=$r}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&W(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&W(296);const r=en(e),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new Li(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&W(299,o.name,a);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&W(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=en(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(Mo(a))return;const l=o.extension.name;var c;En(a)||W(300,l,s||"[unknown]"),En(c=a)||W(304,String(c.id),String(er)),a=Object.assign(c,{id:zn}),o.state=a;const d=this.outgoingConfigEdges.get(l);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&r(p,l)}a=Ai(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())En(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of a)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&W(301,o.name);for(const l of s)a.configs.add(l)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const l of r){const c=l.register(e,a);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},l={},c=this.sortedExtensionReps();for(const p of c){const{extension:m}=p;if(m.onError!==void 0&&(e.onError=m.onError),m.disableEvents!==void 0&&(e.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(e.parentEditor=m.parentEditor),m.editable!==void 0&&(e.editable=m.editable),m.namespace!==void 0&&(e.namespace=m.namespace),m.$initialEditorState!==void 0&&(e.$initialEditorState=m.$initialEditorState),m.nodes)for(const h of Ii(m)){if(typeof h!="function"){const u=o.get(h.replace);u&&W(302,m.name,h.replace.name,u.extension.name),o.set(h.replace,p)}r.add(h)}if(m.html){if(m.html.export)for(const[h,u]of m.html.export.entries())s.set(h,u);m.html.import&&Object.assign(a,m.html.import)}m.theme&&Ro(l,m.theme)}Object.keys(l).length>0&&(e.theme=l),r.size&&(e.nodes=[...r]);const d=Object.keys(a).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=a),w&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=Vi),e}}const zi=new Set,Fr=x.defineExtension({build(t,e,r){const o=r.getDependency(Vn).output,s=qe({watchedNodeKeys:new Map}),a=So(()=>{},()=>ae(()=>{const l=a.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,m]of c.entries()){if(m.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),u=h&&h.isSelected()||!1;w=w||u!==(!!l&&l.has(p)),u&&(d=d||new Set,d.add(p))}}),!w&&d&&l&&d.size===l.size||(a.value=d)}));return{watchNodeKey:function(l){const c=Mi(()=>(a.value||zi).has(l)),{watchedNodeKeys:d}=s.peek();let w=d.get(l);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(l,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[Vn],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Me extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Me(e.__key)}static importJSON(e){return Do().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Bi,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Bi(){return{node:Do()}}function Do(){return x.$create(Me)}function Gi(t){return t instanceof Me}x.defineExtension({dependencies:[Vn,Fr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Me],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Fr).output,s=qe({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,l=>{if(x.isDOMNode(l.target)){const c=x.$getNodeFromDOMNode(l.target);if(Gi(c))return function(d,w=!1){const p=x.$getSelection(),m=d.isSelected(),h=d.getKey();let u;w&&x.$isNodeSelection(p)?u=p:(u=x.$createNodeSelection(),x.$setSelection(u)),m?u.delete(h):u.add(h)}(c,l.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(Me,(l,c)=>{Ti(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,m]of l.entries())if(m==="destroyed")w.delete(p),d=!0;else{const h=w.get(p),u=t.getElementByKey(p);h?h.domNode.value=u:(d=!0,w.set(p,{domNode:qe(u),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),ae(()=>{const l=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())l.push(ae(()=>{const w=c.value;w&&(d.value?x.addClassNamesToElement(w,a):x.removeClassNamesFromElement(w,a))}));return x.mergeRegister(...l)}))}});function Io(t){return t.canBeEmpty()}function Ki(t,e,r=Io){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const a=function(l){if(l.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const c=l.anchor,d=l.focus,w=d.isBefore(c)?d:c,p=w.getNode(),m=Ei(p);if(m.canIndent()){const h=m.getKey();let u=x.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=x.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(w))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(a,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const a=typeof r=="function"?r:r.peek();return Si(l=>{if(a(l)){const c=l.getIndent()+1;(!o||c<o)&&l.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({$canIndent:Io,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:a}=r.getOutput();return ae(()=>{if(!o.value)return Ki(t,s,a)})}});const qi=x.defineExtension({name:"@lexical/react/ReactProvider"});function Ui(){return x.$getRoot().getTextContent()}function Hi(t,e=!0){if(t)return!1;let r=Ui();return e&&(r=r.trim()),r===""}function Yi(t){if(!Hi(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),l=a.length;for(let c=0;c<l;c++){const d=a[o];if(!x.$isTextNode(d))return!1}}}return!0}function Oo(t){return()=>Yi(t)}function Ao(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let l;try{l=JSON.parse(a)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,m,h,u]=d;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const y=g.anchor;let v=y.getNode(),T=0,b=0;if(x.$isTextNode(v)&&w>=0&&p>=0&&(T=w,b=w+p,g.setTextNodeRange(v,T,v,b)),T===b&&m===""||(g.insertRawText(m),v=y.getNode()),x.$isTextNode(v)){T=h,b=h+u;const _=v.getTextContentSize();T=T>_?_:T,b=b>_?_:b,g.setTextNodeRange(v,T,v,b)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>ae(()=>r.getOutput().disabled.value?void 0:Ao(t))});function Xi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const nr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Wi({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=i.useState(()=>r.getDecorators());return nr(()=>r.registerDecoratorListener(l=>{Tr.flushSync(()=>{a(l)})}),[r]),i.useEffect(()=>{a(r.getDecorators())},[r]),i.useMemo(()=>{const l=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(i.Suspense,{fallback:null,children:s[w]})}),m=r.getElementByKey(w);m!==null&&l.push(Tr.createPortal(p,m,w))}return l},[o,s,r])}(t,e)}function Zi({editor:t,ErrorBoundary:e}){return function(r){const o=Be.maybeFromEditor(r);if(o&&o.hasExtensionByName(qi.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Xi(320,s);return!0}return!1}(t)?null:n.jsx(Wi,{editor:t,ErrorBoundary:e})}function Vr(t){return t.getEditorState().read(Oo(t.isComposing()))}function Ji({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Xt();return function(s){nr(()=>x.mergeRegister(On.registerRichText(s),Ao(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Qi,{content:e}),n.jsx(Zi,{editor:o,ErrorBoundary:r})]})}function Qi({content:t}){const[e]=Xt(),r=function(s){const[a,l]=i.useState(()=>Vr(s));return nr(()=>{function c(){const d=Vr(s);l(d)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=Ni();return r?typeof t=="function"?t(o):t:null}function tl({defaultSelection:t}){const[e]=Xt();return i.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const el=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function nl({onClear:t}){const[e]=Xt();return el(()=>Co(e,t),[e,t]),null}const Po=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function rl({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:l,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:m,ariaRequired:h,autoCapitalize:u,className:g,id:y,role:v="textbox",spellCheck:T=!0,style:b,tabIndex:_,"data-testid":C,...B},V){const[$,R]=i.useState(t.isEditable()),D=i.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?t.setRootElement(P):t.setRootElement(null)},[t]),S=i.useMemo(()=>function(...P){return O=>{for(const q of P)typeof q=="function"?q(O):q!=null&&(q.current=O)}}(V,D),[D,V]);return Po(()=>(R(t.isEditable()),t.registerEditableListener(P=>{R(P)})),[t]),n.jsx("div",{"aria-activedescendant":$?e:void 0,"aria-autocomplete":$?r:"none","aria-controls":$?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":$&&v==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":$?m:void 0,"aria-readonly":!$||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:$,"data-testid":C,id:y,ref:S,role:v,spellCheck:T,style:b,tabIndex:_,...B})}const ol=i.forwardRef(rl);function zr(t){return t.getEditorState().read(Oo(t.isComposing()))}const sl=i.forwardRef(al);function al(t,e){const{placeholder:r,...o}=t,[s]=Xt();return n.jsxs(n.Fragment,{children:[n.jsx(ol,{editor:s,...o,ref:e}),r!=null&&n.jsx(il,{editor:s,content:r})]})}function il({content:t,editor:e}){const r=function(l){const[c,d]=i.useState(()=>zr(l));return Po(()=>{function w(){const p=zr(l);d(p)}return w(),x.mergeRegister(l.registerUpdateListener(()=>{w()}),l.registerEditableListener(()=>{w()}))},[l]),c}(e),[o,s]=i.useState(e.isEditable());if(i.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(l=>{s(l)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function ll({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(sl,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Lo=i.createContext(void 0);function cl({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const l=i.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Lo.Provider,{value:l,children:a})}function $o(){const t=i.useContext(Lo);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function dl(){const[t,e]=i.useState(void 0),r=i.useCallback(()=>{e(void 0)},[]),o=i.useMemo(()=>{if(t===void 0)return;const{title:a,content:l}=t;return n.jsx(io,{open:!0,onOpenChange:r,children:n.jsxs(qn,{children:[n.jsx(Un,{children:n.jsx(Hn,{children:a})}),l]})})},[t,r]),s=i.useCallback((a,l,c=!1)=>{e({closeOnClickOutside:c,content:l(r),title:a})},[r]);return[o,s]}function wl({children:t}){const[e]=Xt(),[r,o]=i.useState(e),[s,a]=i.useState("paragraph"),[l,c]=dl(),d=()=>{};return i.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(cl,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:a,showModal:c,children:[l,t({blockType:s})]})}function pl(t){const[e]=Xt(),{activeEditor:r}=$o();i.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),i.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const Fo=de.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),ul=i.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(no.Root,{ref:s,className:f(Fo({variant:e,size:r,className:t})),...o}));ul.displayName=no.Root.displayName;const Vo=i.createContext({size:"default",variant:"default"}),xn=i.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const l=at();return n.jsx(mn.Root,{ref:a,className:f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:l,children:n.jsx(Vo.Provider,{value:{variant:e,size:r},children:o})})});xn.displayName=mn.Root.displayName;const Re=i.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const l=i.useContext(Vo);return n.jsx(mn.Item,{ref:a,className:f(Fo({variant:l.variant||r,size:l.size||o}),t),...s,children:e})});Re.displayName=mn.Item.displayName;const Br=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"}];function ml(){const{activeEditor:t}=$o(),[e,r]=i.useState([]),o=i.useCallback(s=>{if(x.$isRangeSelection(s)||Aa.$isTableSelection(s)){const a=[];Br.forEach(({format:l})=>{s.hasFormat(l)&&a.push(l)}),r(l=>l.length!==a.length||!a.every(c=>l.includes(c))?a:l)}},[]);return pl(o),n.jsx(xn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Br.map(({format:s,icon:a,label:l})=>n.jsx(Re,{value:s,"aria-label":l,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function fl({onClear:t}){const[e]=Xt();i.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function hl({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=i.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(wl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(ml,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Ji,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(ll,{placeholder:t})}),ErrorBoundary:vi}),e&&n.jsx(tl,{defaultSelection:"rootEnd"}),n.jsx(fl,{onClear:r}),n.jsx(nl,{})]})]})}const gl={namespace:"commentEditor",theme:Jn,nodes:Qn,onError:t=>{console.error(t)}};function sn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:l,className:c}){return n.jsx("div",{className:f("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(mi,{initialConfig:{...gl,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(mt,{children:[n.jsx(hl,{placeholder:s,autoFocus:a,onClear:l}),n.jsx(hi,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function xl(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!Bo.has(a.nodeName)){const l=Go(a,t,s,!1);l!==null&&(o=o.concat(l))}return function(a){for(const l of a)l.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&l.insertAfter(x.$createLineBreakNode());for(const l of a){const c=l.getChildren();for(const d of c)l.insertBefore(d);l.remove()}}(s),o}function bl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)zo(t,o[s],r,e);return r.innerHTML}function zo(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=x.$isElementNode(e)&&e.excludeFromCopy("html");let l=e;o!==null&&x.$isTextNode(e)&&(l=ki(o,e,"clone"));const c=x.$isElementNode(l)?l.getChildren():[],d=x.getRegisteredNode(t,l.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,l):l.exportDOM(t);const{element:p,after:m}=w;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],y=zo(t,g,h,o);!s&&x.$isElementNode(e)&&y&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),m){const u=m.call(l,p);u&&(x.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(h);return s}const Bo=new Set(["STYLE","SCRIPT"]);function Go(t,e,r,o,s=new Map,a){let l=[];if(Bo.has(t.nodeName))return l;let c=null;const d=function(g,y){const{nodeName:v}=g,T=y._htmlConversions.get(v.toLowerCase());let b=null;if(T!==void 0)for(const _ of T){const C=_(g);C!==null&&(b===null||(b.priority||0)<=(C.priority||0))&&(b=C)}return b!==null?b.conversion:null}(t,e),w=d?d(t):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,y]of s)if(c=y(c,a),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const m=t.childNodes;let h=[];const u=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<m.length;g++)h.push(...Go(m[g],e,r,u,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=vl(t,h,u?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?l=l.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),l}function vl(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let l=0;l<e.length;l++){const c=e[l];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),l===e.length-1||l<e.length-1&&x.$isBlockElementNode(e[l+1])){const d=r();d.setFormat(o),d.append(...a),s.push(d),a=[]}}return s}function Ko(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function qo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:qo(e.children)):!1}function Dt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?qo(t.root.children):!1}function yl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Jr.createHeadlessEditor({namespace:"EditorUtils",theme:Jn,nodes:Qn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=xl(e,s);x.$getRoot().clear(),x.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function an(t){const e=Jr.createHeadlessEditor({namespace:"EditorUtils",theme:Jn,nodes:Qn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=bl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function rr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function rn(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function or(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const jl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Rn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function Nl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o,initialAssignedUser:s}){const[a,l]=i.useState(jl),[c,d]=i.useState(s),[w,p]=i.useState(!1),m=i.useRef(void 0),h=i.useRef(null);i.useEffect(()=>{let b=!0;const _=h.current;if(!_)return;const C=setTimeout(()=>{b&&Ko(_)},300);return()=>{b=!1,clearTimeout(C)}},[]);const u=i.useCallback(()=>{if(!Dt(a))return;const b=an(a);e(b,c)},[a,e,c]),g=o["%commentEditor_placeholder%"]??"Type your comment here...",y=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",T=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:T}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(F,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(ft,{children:n.jsx("p",{children:v})})]})}),n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(F,{onClick:u,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Dt(a),children:n.jsx(k.Check,{})})}),n.jsx(ft,{children:n.jsx("p",{children:y})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Yt,{open:w,onOpenChange:p,children:[n.jsx(Jt,{asChild:!0,children:n.jsxs(F,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Rn(c!==void 0?c:"",o)})]})}),n.jsx(Pt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:b=>{b.key==="Escape"&&(b.stopPropagation(),p(!1))},children:n.jsx(Ut,{children:n.jsx(Ht,{children:t.map(b=>n.jsx(At,{onSelect:()=>{d(b===""?void 0:b),p(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Rn(b,o)})},b||"unassigned"))})})})]})}),n.jsx("div",{ref:h,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),r()):or(b)&&(b.preventDefault(),b.stopPropagation(),Dt(a)&&u())},onKeyDown:b=>{rr(b),(b.key==="Enter"||b.key===" ")&&b.stopPropagation()},children:n.jsx(sn,{editorSerializedState:a,onSerializedChange:b=>l(b),placeholder:g,onClear:b=>{m.current=b}})})]})}const kl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),_l=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],Cl=["input","select","textarea","button"],El=["button","textbox"],Uo=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=i.useRef(null),[a,l]=i.useState(void 0),[c,d]=i.useState(void 0),w=i.useCallback(u=>{l(u);const g=t.find(v=>v.id===u);g&&(e==null||e(g));const y=document.getElementById(u);y&&(y.scrollIntoView({block:"center"}),y.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=i.useCallback(u=>{const g=t.find(y=>y.id===u);g&&(d(y=>y===u?void 0:u),r==null||r(g))},[r,t]),m=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||Cl.includes(g))return!0;const y=u.getAttribute("role");if(y&&El.includes(y))return!0;const v=u.getAttribute("tabindex");return v!==void 0&&v!=="-1"},h=i.useCallback(u=>{var $;const g=u.target,y=R=>R?document.getElementById(R):void 0,v=y(c),T=y(a);if(!!(v&&g&&v.contains(g)&&g!==v)&&m(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const R=t.find(D=>D.id===c);R&&w(R.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!v)return;const R=Array.from(v.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(R.length===0)return;const D=R.findIndex(P=>P===g);if(D===-1)return;let S;u.key==="ArrowDown"?S=Math.min(D+1,R.length-1):S=Math.max(D-1,0),S!==D&&(u.preventDefault(),u.stopPropagation(),($=R[S])==null||$.focus());return}return}const C=t.findIndex(R=>R.id===a);let B=C;switch(u.key){case"ArrowDown":B=Math.min(C+1,t.length-1),u.preventDefault();break;case"ArrowUp":B=Math.max(C-1,0),u.preventDefault();break;case"Home":B=0,u.preventDefault();break;case"End":B=t.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const R=T;if(R){const D=R.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),S=R.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=D??S;if(P){u.preventDefault(),P.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(m(g)||(o==null||o(u.key),u.preventDefault()));return}const V=t[B];V&&w(V.id)},[t,w,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:w}},Ho=de.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ge=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:f("pr-twp",Ho({variant:e}),t),...r}));ge.displayName="Badge";const sr=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));sr.displayName="Card";const Yo=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Yo.displayName="CardHeader";const Xo=i.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:f("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Xo.displayName="CardTitle";const Wo=i.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:f("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Wo.displayName="CardDescription";const ar=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-p-6 tw-pt-0",t),...e}));ar.displayName="CardContent";const Zo=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Zo.displayName="CardFooter";const xe=i.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(ro.Root,{ref:s,decorative:r,orientation:e,className:f("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));xe.displayName=ro.Root.displayName;const ir=i.forwardRef(({className:t,...e},r)=>n.jsx(Oe.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));ir.displayName=Oe.Root.displayName;const Jo=i.forwardRef(({className:t,...e},r)=>n.jsx(Oe.Image,{ref:r,className:f("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Jo.displayName=Oe.Image.displayName;const lr=i.forwardRef(({className:t,...e},r)=>n.jsx(Oe.Fallback,{ref:r,className:f("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));lr.displayName=Oe.Fallback.displayName;const cr=i.createContext(void 0);function Lt(){const t=i.useContext(cr);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Qt=de.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ie=Q.Trigger,dr=Q.Group,Qo=Q.Portal,ts=Q.Sub,es=Q.RadioGroup;function Zt({variant:t="default",...e}){const r=i.useMemo(()=>({variant:t}),[t]);return n.jsx(cr.Provider,{value:r,children:n.jsx(Q.Root,{...e})})}const wr=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Lt();return n.jsxs(Q.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Qt({variant:a.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});wr.displayName=Q.SubTrigger.displayName;const pr=i.forwardRef(({className:t,children:e,...r},o)=>{const s=at();return n.jsx(Q.SubContent,{ref:o,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});pr.displayName=Q.SubContent.displayName;const qt=i.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=at();return n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:s,sideOffset:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});qt.displayName=Q.Content.displayName;const Ue=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=at(),a=Lt();return n.jsx(Q.Item,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Qt({variant:a.variant})),...r,dir:s})});Ue.displayName=Q.Item.displayName;const Kt=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=at(),l=Lt();return n.jsxs(Q.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Qt({variant:l.variant})),checked:r,...o,dir:a,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Kt.displayName=Q.CheckboxItem.displayName;const ur=i.forwardRef(({className:t,children:e,...r},o)=>{const s=at(),a=Lt();return n.jsxs(Q.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Qt({variant:a.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});ur.displayName=Q.RadioItem.displayName;const Pe=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Pe.displayName=Q.Label.displayName;const Ne=i.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ne.displayName=Q.Separator.displayName;function ns({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}ns.displayName="DropdownMenuShortcut";function Gr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:l,canEditOrDelete:c=!1}){const[d,w]=i.useState(!1),[p,m]=i.useState(),h=i.useRef(null);i.useEffect(()=>{if(!d)return;let C=!0;const B=h.current;if(!B)return;const V=setTimeout(()=>{C&&Ko(B)},300);return()=>{C=!1,clearTimeout(V)}},[d]);const u=i.useCallback(C=>{C&&C.stopPropagation(),w(!1),m(void 0),l==null||l(!1)},[l]),g=i.useCallback(async C=>{if(C&&C.stopPropagation(),!p||!s)return;await s(t.id,an(p))&&(w(!1),m(void 0),l==null||l(!1))},[p,s,t.id,l]),y=i.useMemo(()=>{const C=new Date(t.date),B=j.formatRelativeDate(C,r["%comment_date_today%"],r["%comment_date_yesterday%"]),V=C.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return j.formatReplacementString(r["%comment_dateAtTime%"],{date:B,time:V})},[t.date,r]),v=i.useMemo(()=>t.user,[t.user]),T=i.useMemo(()=>t.user.split(" ").map(C=>C[0]).join("").toUpperCase().slice(0,2),[t.user]),b=i.useMemo(()=>j.sanitizeHtml(t.contents),[t.contents]),_=i.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ue,{onClick:C=>{C.stopPropagation(),w(!0),m(yl(t.contents)),l==null||l(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ue,{onClick:async C=>{C.stopPropagation(),a&&await a(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,l]);return n.jsxs("div",{className:f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(ir,{className:"tw-h-8 tw-w-8",children:n.jsx(lr,{className:"tw-text-xs tw-font-medium",children:T})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:v}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:y}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(ge,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",rn(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:C=>{C.key==="Escape"?(C.preventDefault(),C.stopPropagation(),u()):or(C)&&(C.preventDefault(),C.stopPropagation(),Dt(p)&&g())},onKeyDown:C=>{rr(C),(C.key==="Enter"||C.key===" ")&&C.stopPropagation()},onClick:C=>{C.stopPropagation()},children:[n.jsx(sn,{className:f('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:C=>m(C)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(F,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(F,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(p),children:n.jsx(k.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:f("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:b}})]})]}),_&&n.jsxs(Zt,{children:[n.jsx(ie,{asChild:!0,children:n.jsx(F,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(qt,{align:"end",children:_})]})]})}const Kr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Sl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:l,handleSelectThread:c,threadId:d,thread:w,threadStatus:p,handleAddCommentToThread:m,handleUpdateComment:h,handleDeleteComment:u,handleReadStatusChange:g,assignableUsers:y,canUserAddCommentToThread:v,canUserAssignThreadCallback:T,canUserResolveThreadCallback:b,canUserEditOrDeleteCommentCallback:_,isRead:C=!1,autoReadDelay:B=5,onVerseRefClick:V,initialAssignedUser:$}){const[R,D]=i.useState(Kr),[S,P]=i.useState(void 0),O=o,[q,L]=i.useState(!1),[H,N]=i.useState(!1),[K,it]=i.useState(!1),[ht,Et]=i.useState(!1),[wt,kt]=i.useState(!1),[z,nt]=i.useState(C),[rt,lt]=i.useState(!1),pt=i.useRef(void 0),[te,we]=i.useState(new Map);i.useEffect(()=>{let M=!0;return(async()=>{const Rt=b?await b(d):!1;M&&kt(Rt)})(),()=>{M=!1}},[d,b]);const _e=i.useRef(o);i.useEffect(()=>{!_e.current&&o&&$!==void 0&&P($),_e.current=o},[o,$]),i.useEffect(()=>{let M=!0;if(!o){Et(!1),we(new Map);return}return(async()=>{const Rt=T?await T(d):!1;M&&Et(Rt)})(),()=>{M=!1}},[o,d,T]);const Mt=i.useMemo(()=>e.filter(M=>!M.deleted),[e]);i.useEffect(()=>{let M=!0;if(!o||!_){we(new Map);return}return(async()=>{const Rt=new Map;await Promise.all(Mt.map(async Rr=>{const Ca=await _(Rr.id);M&&Rt.set(Rr.id,Ca)})),M&&we(Rt)})(),()=>{M=!1}},[o,Mt,_]);const Wt=i.useMemo(()=>Mt[0],[Mt]),Le=i.useRef(null),ee=i.useRef(void 0),I=i.useCallback(()=>{var M;(M=ee.current)==null||M.call(ee),D(Kr)},[]),E=i.useCallback(()=>{const M=!z;nt(M),lt(!M),g==null||g(d,M)},[z,g,d]);i.useEffect(()=>{L(!1)},[o]),i.useEffect(()=>{if(o&&!z&&!rt){const M=setTimeout(()=>{nt(!0),g==null||g(d,!0)},B*1e3);return pt.current=M,()=>clearTimeout(M)}pt.current&&(clearTimeout(pt.current),pt.current=void 0)},[o,z,rt,B,d,g]);const A=i.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),U=i.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const M=rn(a,r);return j.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:M})},[a,r]),G=i.useMemo(()=>Mt.slice(1),[Mt]),Y=i.useMemo(()=>G.length??0,[G.length]),Z=i.useMemo(()=>Y>0,[Y]),ut=i.useMemo(()=>q||Y<=2?G:G.slice(-2),[G,Y,q]),J=i.useMemo(()=>q||Y<=2?0:Y-2,[Y,q]),St=i.useMemo(()=>Y===1?A.singleReply:j.formatReplacementString(A.multipleReplies,{count:Y}),[Y,A]),$t=i.useMemo(()=>J===1?A.singleReply:j.formatReplacementString(A.multipleReplies,{count:J}),[J,A]);i.useEffect(()=>{!o&&H&&Z&&N(!1)},[o,H,Z]);const Ft=i.useCallback(async M=>{M&&M.stopPropagation();const Vt=Dt(R)?an(R):void 0;if(S!==void 0){await m({threadId:d,contents:Vt,assignedUser:S})&&(P(void 0),Vt&&I());return}Vt&&await m({threadId:d,contents:Vt})&&I()},[I,R,m,S,d]),ne=i.useCallback(async M=>{const Vt=Dt(R)?an(R):void 0,Rt=await m({...M,contents:Vt,assignedUser:S??M.assignedUser});return Rt&&Vt&&I(),Rt&&S!==void 0&&P(void 0),Rt},[I,R,m,S]);return n.jsx(sr,{role:"option","aria-selected":o,id:d,className:f("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&z,"tw-bg-background":o&&p!=="Resolved"&&z,"tw-bg-muted":p==="Resolved","tw-bg-accent":!z&&!o&&p!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(ar,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[U&&n.jsx(ge,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:U}),n.jsx(F,{variant:"ghost",size:"icon",onClick:M=>{M.stopPropagation(),E()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":z?"Mark as unread":"Mark as read",children:z?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),wt&&p!=="Resolved"&&n.jsx(F,{variant:"ghost",size:"icon",className:f("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:M=>{M.stopPropagation(),ne({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:Le,className:f("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":O},{"tw-whitespace-nowrap":!O}),children:[s&&V?n.jsx(F,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:M=>{M.stopPropagation(),V(w)},children:s}):s,n.jsxs("span",{className:t,children:[Wt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Wt.selectedText}),Wt.contextAfter]})]})}),n.jsx(Gr,{comment:Wt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:ne,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:N,canEditOrDelete:(!H&&te.get(Wt.id))??!1,canUserResolveThread:wt})]}),n.jsxs(n.Fragment,{children:[Z&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(xe,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:St})]}),!o&&Dt(R)&&n.jsx(sn,{editorSerializedState:R,onSerializedChange:M=>D(M),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[J>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:M=>{M.stopPropagation(),L(!0)},role:"button",tabIndex:0,onKeyDown:M=>{(M.key==="Enter"||M.key===" ")&&(M.preventDefault(),M.stopPropagation(),L(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(xe,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:$t}),q?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),ut.map(M=>n.jsx("div",{children:n.jsx(Gr,{comment:M,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:N,canEditOrDelete:(!H&&te.get(M.id))??!1})},M.id)),v!==!1&&(!H||Dt(R))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:M=>M.stopPropagation(),onKeyDownCapture:M=>{or(M)&&(M.preventDefault(),M.stopPropagation(),(Dt(R)||S!==void 0)&&Ft())},onKeyDown:M=>{rr(M),(M.key==="Enter"||M.key===" ")&&M.stopPropagation()},children:[n.jsx(sn,{editorSerializedState:R,onSerializedChange:M=>D(M),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:M=>{ee.current=M}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[S!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:j.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:rn(S,r)})}),n.jsxs(Yt,{open:K,onOpenChange:it,children:[n.jsx(Jt,{asChild:!0,children:n.jsx(F,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!ht||!y||y.length===0||!y.includes(l),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(Pt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:M=>{M.key==="Escape"&&(M.stopPropagation(),it(!1))},children:n.jsx(Ut,{children:n.jsx(Ht,{children:y==null?void 0:y.map(M=>n.jsx(At,{onSelect:()=>{P(M!==a?M:void 0),it(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:rn(M,r)})},M||"unassigned"))})})})]}),n.jsx(F,{size:"icon",onClick:Ft,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(R)&&S===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function Rl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:y,onVerseRefClick:v}){const[T,b]=i.useState(new Set),[_,C]=i.useState(),[B,V]=i.useState(void 0),$=i.useCallback(async N=>{const K=await a(N);return K!==void 0&&N.assignedUser!==void 0&&V(N.assignedUser),K},[a]);i.useEffect(()=>{g&&(b(N=>new Set(N).add(g)),C(g))},[g]);const R=r.filter(N=>N.comments.some(K=>!K.deleted)),D=R.map(N=>({id:N.id})),S=i.useCallback(N=>{b(K=>new Set(K).add(N.id)),C(N.id),y==null||y(N.id)},[y]),P=i.useCallback(N=>{const K=T.has(N);b(it=>{const ht=new Set(it);return ht.has(N)?ht.delete(N):ht.add(N),ht}),C(N),y==null||y(K?void 0:N)},[T,y]),{listboxRef:O,activeId:q,handleKeyDown:L}=Uo({options:D,onOptionSelect:S}),H=i.useCallback(N=>{N.key==="Escape"?(_&&T.has(_)&&(b(K=>{const it=new Set(K);return it.delete(_),it}),C(void 0),y==null||y(void 0)),N.preventDefault(),N.stopPropagation()):L(N)},[_,T,L,y]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:O,"aria-activedescendant":q??void 0,"aria-label":"Comments",className:f("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:H,children:R.map(N=>n.jsx("div",{id:N.id,className:f({"tw-opacity-60":N.status==="Resolved"}),children:n.jsx(Sl,{classNameForVerseText:e,comments:N.comments,localizedStrings:s,verseRef:N.verseRef,handleSelectThread:P,threadId:N.id,thread:N,isRead:N.isRead,isSelected:T.has(N.id),currentUser:o,assignedUser:N.assignedUser,threadStatus:N.status,handleAddCommentToThread:$,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:v,initialAssignedUser:B})},N.id))})}function Tl({table:t}){return n.jsxs(Zt,{children:[n.jsx(Qr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(F,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(qt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Pe,{children:"Toggle columns"}),n.jsx(Ne,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Kt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const be=ot.Root,rs=ot.Group,ve=ot.Value,os=de.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),le=i.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=at();return n.jsxs(ot.Trigger,{className:f(os({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(ot.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});le.displayName=ot.Trigger.displayName;const mr=i.forwardRef(({className:t,...e},r)=>n.jsx(ot.ScrollUpButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));mr.displayName=ot.ScrollUpButton.displayName;const fr=i.forwardRef(({className:t,...e},r)=>n.jsx(ot.ScrollDownButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));fr.displayName=ot.ScrollDownButton.displayName;const ce=i.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=at();return n.jsx(ot.Portal,{children:n.jsxs(ot.Content,{ref:s,className:f("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(mr,{}),n.jsx(ot.Viewport,{className:f("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(fr,{})]})})});ce.displayName=ot.Content.displayName;const ss=i.forwardRef(({className:t,...e},r)=>n.jsx(ot.Label,{ref:r,className:f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));ss.displayName=ot.Label.displayName;const _t=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(ot.Item,{ref:o,className:f("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ot.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(ot.ItemText,{children:e})]}));_t.displayName=ot.Item.displayName;const as=i.forwardRef(({className:t,...e},r)=>n.jsx(ot.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));as.displayName=ot.Separator.displayName;function Ml({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(be,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(le,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(ve,{placeholder:t.getState().pagination.pageSize})}),n.jsx(ce,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(_t,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(F,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const qr=`
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
`;function Dl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function He(t,e){const r=e?`${qr}, ${e}`:qr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Dl(o))}const Ye=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=i.useRef(null);i.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),i.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{He(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const a=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),He(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Ye.displayName="Table";const Xe=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Xe.displayName="TableHeader";const We=i.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:f("[&_tr:last-child]:tw-border-0",t),...e}));We.displayName="TableBody";const is=i.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));is.displayName="TableFooter";function Il(t){i.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?He(t.current):[],a=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?a+1:a-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Ol(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Al(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Gt=i.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const l=i.useRef(null);i.useEffect(()=>{typeof a=="function"?a(l.current):a&&"current"in a&&(a.current=l.current)},[a]),Il(l);const c=i.useMemo(()=>l.current?He(l.current):[],[l]),d=i.useCallback(p=>{const{current:m}=l;if(!m||!m.parentElement)return;const h=m.closest("table"),u=h?He(h).filter(v=>v.tagName==="TR"):[],g=u.indexOf(m),y=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Al(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Ol(c,y,p.key);else if(p.key==="Escape"){p.preventDefault();const v=m.closest("table");v&&v.focus()}e==null||e(p)},[l,c,e]),w=i.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:d,onFocus:w,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Gt.displayName="TableRow";const De=i.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));De.displayName="TableHead";const se=i.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));se.displayName="TableCell";const ls=i.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));ls.displayName="TableCaption";function ln({className:t,...e}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function cs({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:l=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var V;const[p,m]=i.useState([]),[h,u]=i.useState([]),[g,y]=i.useState({}),[v,T]=i.useState({}),b=i.useMemo(()=>e??[],[e]),_=bt.useReactTable({data:b,columns:t,getCoreRowModel:bt.getCoreRowModel(),...r&&{getPaginationRowModel:bt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:bt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:bt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:T,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:v}}),C=_.getVisibleFlatColumns();let B;return d?B=Array.from({length:10}).map((D,S)=>`skeleton-row-${S}`).map(D=>n.jsx(Gt,{className:"hover:tw-bg-transparent",children:n.jsx(se,{colSpan:C.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(ln,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},D)):((V=_.getRowModel().rows)==null?void 0:V.length)>0?B=_.getRowModel().rows.map($=>n.jsx(Gt,{onClick:()=>l($,_),"data-state":$.getIsSelected()&&"selected",children:$.getVisibleCells().map(R=>n.jsx(se,{children:bt.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},$.id)):B=n.jsx(Gt,{children:n.jsx(se,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Tl,{table:_}),n.jsxs(Ye,{stickyHeader:a,children:[n.jsx(Xe,{stickyHeader:a,children:_.getHeaderGroups().map($=>n.jsx(Gt,{children:$.headers.map(R=>n.jsx(De,{className:"tw-p-0",children:R.isPlaceholder?void 0:bt.flexRender(R.column.columnDef.header,R.getContext())},R.id))},$.id))}),n.jsx(We,{children:B})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(F,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),n.jsx(F,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Ml,{table:_})]})}function Pl({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=i.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(za,{options:a,children:e})})}const ds=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Ur=(t,e)=>t[e]??e;function ws({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Ur(r,"%webView_error_dump_header%"),a=Ur(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(F,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Ll=Object.freeze([...ds,"%webView_error_dump_copied_message%"]);function $l({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[l,c]=i.useState(!1),d=()=>{c(!0),e&&e()},w=p=>{p||c(!1)};return n.jsxs(Yt,{onOpenChange:w,children:[n.jsx(Jt,{asChild:!0,children:o}),n.jsxs(Pt,{id:a,className:f("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(ct,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(ws,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var ps=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(ps||{});function Fl({id:t,label:e,groups:r}){const[o,s]=i.useState(Object.fromEntries(r.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[a,l]=i.useState({}),c=(w,p)=>{const m=!o[w][p];s(u=>(u[w][p]=m,{...u}));const h=r[w].items[p];h.onUpdate(h.id,m)},d=(w,p)=>{l(h=>(h[w]=p,{...h}));const m=r[w].items.find(h=>h.id===p);m?m.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Zt,{children:[n.jsx(ie,{asChild:!0,children:n.jsxs(F,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(qt,{children:r.map((w,p)=>n.jsxs("div",{children:[n.jsx(Pe,{children:w.label}),n.jsx(dr,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((m,h)=>n.jsx("div",{children:n.jsx(Kt,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:m.label})},m.id))}):n.jsx(es,{value:a[p],onValueChange:m=>d(p,m),children:w.items.map(m=>n.jsx("div",{children:n.jsx(ur,{value:m.id,children:m.label})},m.id))})}),n.jsx(Ne,{})]},w.label))})]})})}function Vl({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:l,handleSupportLinkClick:c}){const d=new j.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,m)=>p+m,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(F,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(F,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function zl({id:t,versionHistory:e}){const[r,o]=i.useState(!1),s=new Date;function a(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,m=w.getUTCMonth(),h=w.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:m>0?u=`${m.toString()} month${m===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const l=Object.entries(e).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Bl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const l=i.useMemo(()=>j.formatBytes(r),[r]),d=(w=>{const p=new Intl.DisplayNames(j.getCurrentLocale(),{type:"language"});return w.map(m=>p.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(zl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function us({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:m=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:y="ghost",id:v}){const[T,b]=i.useState(!1),_=i.useCallback(S=>{var O;const P=(O=t.find(q=>q.label===S))==null?void 0:O.value;P&&r(e.includes(P)?e.filter(q=>q!==P):[...e,P])},[t,e,r]),C=()=>d||o,B=i.useMemo(()=>{if(!h)return t;const S=t.filter(O=>O.starred).sort((O,q)=>O.label.localeCompare(q.label)),P=t.filter(O=>!O.starred).sort((O,q)=>{const L=e.includes(O.value),H=e.includes(q.value);return L&&!H?-1:!L&&H?1:O.label.localeCompare(q.label)});return[...S,...P]},[t,e,h]),V=()=>{r(t.map(S=>S.value))},$=()=>{r([])},R=w??T,D=p??b;return n.jsx("div",{id:v,className:g,children:n.jsxs(Yt,{open:R,onOpenChange:D,children:[n.jsx(Jt,{asChild:!0,children:n.jsxs(F,{variant:y,role:"combobox","aria-expanded":R,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:C()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Ut,{children:[n.jsx(je,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:V,children:a}),n.jsx(F,{variant:"ghost",size:"sm",onClick:$,children:l})]}),n.jsxs(Ht,{children:[n.jsx(Ae,{children:c}),n.jsx(It,{children:B.map(S=>n.jsxs(At,{value:S.label,onSelect:_,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:f("tw-h-4 tw-w-4",e.includes(S.value)?"tw-opacity-100":"tw-opacity-0")})}),S.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:S.label}),S.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:S.secondaryLabel})]},S.label))})]})]})})]})})}function Gl({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(us,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var u;return n.jsxs(ge,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(F,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(g=>g.value===h))==null?void 0:u.label]},h)})}):n.jsx(ct,{children:p})]})}const ms=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),Hr=(t,e)=>t[e]??e;function fs({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:a=!0,className:l="tw-h-6 tw-w-6",variant:c="ghost"}){const d=i.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(F,{"aria-label":"Undo",className:l,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(k.Undo,{})})}),n.jsx(ft,{children:n.jsxs("p",{children:[Hr(s,"%undoButton_tooltip%"),a&&` (${d?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(F,{"aria-label":"Redo",className:l,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(k.Redo,{})})}),n.jsx(ft,{children:n.jsxs("p",{children:[Hr(s,"%redoButton_tooltip%"),a&&` (${d?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function hs({children:t,editorRef:e}){const r=i.useRef(null);return i.useEffect(()=>{var l;const o=/Macintosh/i.test(navigator.userAgent),s=((l=r.current)==null?void 0:l.querySelector(".editor-input"))??void 0,a=c=>{var w,p,m,h;if(!s||document.activeElement!==s)return;const d=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(w=e.current)==null||w.undo()):c.shiftKey&&d==="z"&&(c.preventDefault(),(p=e.current)==null||p.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(m=e.current)==null||m.undo()):(d==="y"||c.shiftKey&&d==="z")&&(c.preventDefault(),(h=e.current)==null||h.redo())}};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[e]),n.jsx("div",{ref:r,children:t})}const ke=i.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));ke.displayName="Input";const Kl=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function ql({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=i.useRef(null),l=i.useRef(null),c=i.useRef(!1),[d,w]=i.useState(t),[p,m]=i.useState(r),[h,u]=i.useState(!1);i.useEffect(()=>{w(t)},[t]),i.useEffect(()=>{p!==r&&m(r)},[r]);const g=v=>{c.current=!1,u(v),v||(d!=="custom"||p?(e(d),o(p)):(w(t),m(r)))},y=v=>{var T,b,_,C;v.stopPropagation(),document.activeElement===l.current&&v.key==="ArrowDown"||v.key==="ArrowRight"?((T=a.current)==null||T.focus(),c.current=!0):document.activeElement===a.current&&v.key==="ArrowUp"?((b=l.current)==null||b.focus(),c.current=!1):document.activeElement===a.current&&v.key==="ArrowLeft"&&((_=a.current)==null?void 0:_.selectionStart)===0&&((C=l.current)==null||C.focus(),c.current=!1),d==="custom"&&v.key==="Enter"&&(document.activeElement===l.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(Zt,{open:h,onOpenChange:g,children:[n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(ie,{asChild:!0,children:n.jsx(F,{variant:"outline",className:"tw-h-6",children:Kl(t,s,r)})})}),n.jsx(ft,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(qt,{style:{zIndex:Gn},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:y,onMouseMove:()=>{var v;c.current&&((v=a.current)==null||v.focus())},children:[n.jsx(Pe,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(Ne,{}),n.jsx(Kt,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Tt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Kt,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Tt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Kt,{ref:l,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:v=>{var T;v.stopPropagation(),c.current=!0,(T=a.current)==null||T.focus()},onSelect:v=>v.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(ke,{tabIndex:0,onMouseDown:v=>{v.stopPropagation(),w("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:v=>{v.key==="Enter"||v.key==="ArrowUp"||v.key==="ArrowDown"||v.key==="ArrowLeft"||v.key==="ArrowRight"||v.stopPropagation()},maxLength:1,onChange:v=>m(v.target.value)})]})})]})]})}const Ul=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Hl=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),j.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Yl({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Zt,{children:[n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(Zr.TooltipTrigger,{asChild:!0,children:n.jsx(ie,{asChild:!0,children:n.jsx(F,{variant:"outline",className:"tw-h-6",children:Ul(t,r)})})}),n.jsx(ft,{children:n.jsx("p",{children:Hl(t,r)})})]})}),n.jsxs(qt,{style:{zIndex:Gn},children:[n.jsx(Pe,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(Ne,{}),n.jsxs(Kt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Kt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Kt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const gs=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Xl({icon:t,className:e}){const r=t??k.Ban;return n.jsx(r,{className:e,size:16})}function Yr({item:t,localizedStrings:e}){return n.jsxs(At,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(Xl,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(po,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function xs({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=i.useState(""),[a,l]=i.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const d=e.filter(p=>{var m;return(m=p.marker)==null?void 0:m.toLowerCase().includes(c)}),w=e.filter(p=>p.title.toLowerCase().includes(c)&&!d.includes(p));return[d,w]},[o,e]);return n.jsxs(Ut,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(je,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Ht,{children:[n.jsx(Ae,{children:t["%markerMenu_noResults%"]}),n.jsx(It,{children:a.map(c=>{var d;return n.jsx(Yr,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})}),l.length>0&&n.jsxs(n.Fragment,{children:[a.length>0&&n.jsx(Yn,{alwaysRender:!0}),n.jsx(It,{children:l.map(c=>{var d;return n.jsx(Yr,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function Wl(t,e,r,o){if(!o||o==="p")return[];const s=j.usfmMarkers[o];if(!(s!=null&&s.children))return[];const a=[];return Object.entries(s.children).forEach(([,l])=>{a.push(...l.map(c=>({marker:c,title:r[j.usfmMarkers[c].description]??j.usfmMarkers[c].description,action:()=>{var d;(d=t.current)==null||d.insertMarker(c),e()}})))}),a.sort((l,c)=>(l.marker??l.title).localeCompare(c.marker??c.title))}function Zl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Jl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Ql={type:"USJ",version:"3.1",content:[{type:"para"}]};function tc({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:a,editorOptions:l,defaultMarkerMenuTrigger:c,localizedStrings:d,parentEditorRef:w}){const p=i.useRef(null),m=i.useRef(null),h=i.useRef(null),u=i.useRef(null);i.useLayoutEffect(()=>{if(!u.current)return;const{width:E}=u.current.getBoundingClientRect();E>0&&(u.current.style.width=`${E}px`)},[]);const[g,y]=i.useState("generated"),[v,T]=i.useState("*"),[b,_]=i.useState("f"),[C,B]=i.useState(!1),[V,$]=i.useState(!0),[R,D]=i.useState(!1),S=i.useRef(!1),P=i.useRef(""),[O,q]=i.useState(!1),[L,H]=i.useState(),[N,K]=i.useState(),[it,ht]=i.useState(),[Et,wt]=i.useState(),kt=i.useRef(null),z=i.useMemo(()=>({...l,markerMenuTrigger:c,hasExternalUI:!0,view:{...l.view??Tt.getDefaultViewOptions(),noteMode:"expanded"}}),[l,c]),nt=i.useMemo(()=>Wl(p,()=>q(!1),d,Et),[d,Et]);i.useEffect(()=>{var E;O||(E=p.current)==null||E.focus()},[b,O]),i.useEffect(()=>{var U,G;let E;S.current=!1,$(!0);const A=e==null?void 0:e.at(0);if(A&&Tt.isInsertEmbedOpOfType("note",A)){const Y=(U=A.insert.note)==null?void 0:U.caller;let Z="custom";Y===Tt.GENERATOR_NOTE_CALLER?Z="generated":Y===Tt.HIDDEN_NOTE_CALLER?Z="hidden":Y&&T(Y),y(Z),_(((G=A.insert.note)==null?void 0:G.style)??"f"),E=setTimeout(()=>{var ut;(ut=p.current)==null||ut.applyUpdate([A])},0)}return()=>{E&&clearTimeout(E)}},[e,a]);const rt=i.useCallback((E,A,U=!1)=>{var Y,Z,ut;const G=(Z=(Y=p.current)==null?void 0:Y.getNoteOps(0))==null?void 0:Z.at(0);if(G&&Tt.isInsertEmbedOpOfType("note",G)){if(G.insert.note){let J;E==="custom"?J=A:E==="generated"?J=Tt.GENERATOR_NOTE_CALLER:J=Tt.HIDDEN_NOTE_CALLER,G.insert.note.caller=J}r==null||r([G]),U&&w&&a&&((ut=w.current)==null||ut.replaceEmbedUpdate(a,[G]))}},[a,r,w]),lt=i.useCallback(()=>{rt(g,v,!0),o()},[g,v,o,rt]),pt=i.useRef(lt);i.useLayoutEffect(()=>{pt.current=lt});const te=i.useRef({book:s.book,chapterNum:s.chapterNum});i.useLayoutEffect(()=>{(te.current.book!==s.book||te.current.chapterNum!==s.chapterNum)&&(te.current={book:s.book,chapterNum:s.chapterNum},pt.current())},[s.book,s.chapterNum]);const we=()=>{var A;const E=(A=m.current)==null?void 0:A.getElementsByClassName("editor-input")[0];E!=null&&E.textContent&&navigator.clipboard.writeText(E.textContent)},_e=i.useCallback(E=>{y(E),rt(E,v)},[v,rt]),Mt=i.useCallback(E=>{T(E),rt(g,E)},[g,rt]),Wt=E=>{var U,G,Y,Z,ut;_(E);const A=(G=(U=p.current)==null?void 0:U.getNoteOps(0))==null?void 0:G.at(0);if(A&&Tt.isInsertEmbedOpOfType("note",A)){A.insert.note&&(A.insert.note.style=E);const J=(Z=(Y=A.insert.note)==null?void 0:Y.contents)==null?void 0:Z.ops;b!=="x"&&E==="x"?J==null||J.forEach(St=>Zl(St)):b==="x"&&E!=="x"&&(J==null||J.forEach(St=>Jl(St))),(ut=p.current)==null||ut.applyUpdate([A,{delete:1}])}},Le=E=>{wt(E.contextMarker),D(E.canRedo)},ee=i.useCallback(E=>{var U,G,Y,Z,ut;const A=(G=(U=p.current)==null?void 0:U.getNoteOps(0))==null?void 0:G.at(0);if(A&&Tt.isInsertEmbedOpOfType("note",A)){E.content.length>1&&setTimeout(()=>{var $t;($t=p.current)==null||$t.applyUpdate([{retain:2},{delete:1}])},0);const J=(Y=A.insert.note)==null?void 0:Y.style,St=(ut=(Z=A.insert.note)==null?void 0:Z.contents)==null?void 0:ut.ops;if(J||B(!1),B(J==="x"?!!(St!=null&&St.every($t=>{var ne,M;if(!((ne=$t.attributes)!=null&&ne.char))return!0;const Ft=((M=$t.attributes)==null?void 0:M.char).style;return Ft==="xt"||Ft==="xo"||Ft==="xq"})):!!(St!=null&&St.every($t=>{var ne,M;if(!((ne=$t.attributes)!=null&&ne.char))return!0;const Ft=((M=$t.attributes)==null?void 0:M.char).style;return Ft==="ft"||Ft==="fr"||Ft==="fq"}))),!S.current){S.current=!0,P.current=JSON.stringify(A),$(!0);return}$(JSON.stringify(A)===P.current),rt(g,v)}else B(!1),$(!0)},[g,v,rt]),I=i.useCallback(()=>{const E=window.getSelection();if(h.current&&nt.length&&E&&E.rangeCount>0){const A=E.getRangeAt(0).getBoundingClientRect(),U=h.current.getBoundingClientRect();H(A.left-U.left),K(A.top-U.top),ht(A.height),q(!0)}},[nt,h]);return i.useEffect(()=>{const E=()=>{O&&q(!1)};return window.addEventListener("click",E),()=>{window.removeEventListener("click",E)}},[O]),i.useEffect(()=>{var E;O&&((E=kt.current)==null||E.focus())},[O]),i.useEffect(()=>{var U;const E=((U=m.current)==null?void 0:U.querySelector(".editor-input"))??void 0,A=G=>{!O&&E&&document.activeElement===E&&G.key===c?(G.preventDefault(),I()):O&&G.key==="Escape"&&(G.preventDefault(),q(!1))};return document.addEventListener("keydown",A),()=>{document.removeEventListener("keydown",A)}},[O,I,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:u,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Yl,{isTypeSwitchable:C,noteType:b,handleNoteTypeChange:Wt,localizedStrings:d}),n.jsx(ql,{callerType:g,updateCallerType:_e,customCaller:v,updateCustomCaller:Mt,localizedStrings:d})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(fs,{onUndoClick:()=>{var E;return(E=p.current)==null?void 0:E.undo()},onRedoClick:()=>{var E;return(E=p.current)==null?void 0:E.redo()},canUndo:!V,canRedo:R,localizedStrings:d}),n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(F,{onClick:lt,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(k.Check,{})})}),n.jsx(ft,{children:n.jsx("p",{children:d["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(F,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(k.X,{})})}),n.jsx(ft,{children:n.jsx("p",{children:d["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(hs,{editorRef:p,children:n.jsx(Tt.Editorial,{options:z,onStateChange:Le,onUsjChange:ee,defaultUsj:Ql,onScrRefChange:()=>{},scrRef:s,ref:p})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(F,{onClick:we,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(ft,{children:n.jsx("p",{children:d["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:h,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Yt,{open:O,children:[n.jsx(ho,{className:"tw-absolute",style:{top:N,left:L,height:it,width:0,pointerEvents:"none"}}),n.jsx(Pt,{className:"tw-w-[500px] tw-p-0",onClick:E=>{E.preventDefault(),E.stopPropagation()},children:n.jsx(xs,{markerMenuItems:nt,localizedStrings:d,searchRef:kt})})]})]})}const ec=Object.freeze([...gs,...Object.entries(j.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...ms]);function bs(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function nc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&a.push(l),l=[c]):l.push(c)}),l.length>0&&a.push(l),a.map((c,d)=>{const w=d===a.length-1;return n.jsxs("p",{children:[hr(t,c,r,!0,s),w&&o]},bs(t,c))})}function hr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const l=`${t}-text-${a.slice(0,10)}`;if(o){const c=f(`usfm_${t}`);return n.jsx("span",{className:c,children:a},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return rc(a,bs(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function rc(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),hr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function vs({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=l&&n.jsxs(n.Fragment,{children:[hr(t.marker,[l],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",y=f(h,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:[d,p]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:m}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,y),children:c&&c.length>0&&n.jsx(n.Fragment,{children:nc(t.marker,c,o,w)})})]})}function oc({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??j.getFormatCallerFunction(r,void 0),m=(b,_)=>{w==null||w(b,_,s)},h=a?r.findIndex(b=>b===a):-1,[u,g]=i.useState(h),y=(b,_,C)=>{if(r.length)switch(b.key){case"Enter":case" ":b.preventDefault(),w==null||w(_,C,s);break}},v=b=>{if(r.length)switch(b.key){case"ArrowDown":b.preventDefault(),g(_=>Math.min(_+1,r.length-1));break;case"ArrowUp":b.preventDefault(),g(_=>Math.max(_-1,0));break}},T=i.useRef([]);return i.useEffect(()=>{var b;u>=0&&u<T.current.length&&((b=T.current[u])==null||b.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",t),onKeyDown:v,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((b,_)=>{const C=b===a,B=`${s}-${_}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:V=>{T.current[_]=V},role:"option","aria-selected":C,"data-marker":b.marker,"data-state":C?"selected":void 0,tabIndex:_===u?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(b,_),onKeyDown:V=>y(V,b,_),children:n.jsx(vs,{footnote:b,layout:o,formatCaller:()=>p(b.caller,_),showMarkers:l})},B),_<r.length-1&&o==="vertical"&&n.jsx(xe,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function sc(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function ac({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],l=i.useMemo(()=>{const c=[],d=new Set;return t.forEach(w=>{const p=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(p)||(d.add(p),c.push(w))}),c},[t]);return n.jsxs(Ye,{stickyHeader:!0,children:[n.jsx(Xe,{stickyHeader:!0,children:n.jsxs(Gt,{children:[n.jsx(De,{children:s}),n.jsx(De,{children:a})]})}),n.jsx(We,{children:l.length>0&&l.map(c=>n.jsxs(Gt,{onClick:()=>{e(c.reference)},children:[n.jsx(se,{children:j.formatScrRef(c.reference,"English")}),n.jsx(se,{className:o,children:sc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const bn=i.forwardRef(({className:t,...e},r)=>n.jsx(An.Root,{ref:r,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(An.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));bn.displayName=An.Root.displayName;const ic=t=>{if(t==="asc")return n.jsx(k.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(k.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Ze=(t,e,r)=>n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsxs(yt,{className:f("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),ic(t.getIsSorted())]}),n.jsx(ft,{side:"bottom",children:e})]})}),lc=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Ze(e,t)}),cc=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Ze(r,t)}),dc=t=>({accessorKey:"count",header:({column:e})=>Ze(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),Tn=(t,e,r,o,s,a)=>{let l=[...r];t.forEach(d=>{e==="approved"?l.includes(d)||l.push(d):l=l.filter(w=>w!==d)}),o(l);let c=[...s];t.forEach(d=>{e==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),a(c)},wc=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>Ze(a,t,"tw-justify-center"),cell:({row:a})=>{const l=a.getValue("status"),c=a.getValue("item");return n.jsxs(xn,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Re,{onClick:d=>{d.stopPropagation(),Tn([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(Re,{onClick:d=>{d.stopPropagation(),Tn([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(k.CircleXIcon,{})}),n.jsx(Re,{onClick:d=>{d.stopPropagation(),Tn([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(k.CircleHelpIcon,{})})]})}}),pc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),uc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},mc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},ys=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",fc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),hc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},gc=(t,e,r)=>t.map(o=>{const s=j.isString(o.key)?o.key:o.key[0];return{items:j.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||ys(s,e,r),occurrences:o.occurrences||[]}}),zt=(t,e)=>t[e]??e;function xc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:l,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1,classNameForVerseText:m,onItemSelected:h}){const u=zt(r,"%webView_inventory_all%"),g=zt(r,"%webView_inventory_approved%"),y=zt(r,"%webView_inventory_unapproved%"),v=zt(r,"%webView_inventory_unknown%"),T=zt(r,"%webView_inventory_scope_currentBook%"),b=zt(r,"%webView_inventory_scope_chapter%"),_=zt(r,"%webView_inventory_scope_verse%"),C=zt(r,"%webView_inventory_filter_text%"),B=zt(r,"%webView_inventory_show_additional_items%"),V=zt(r,"%webView_inventory_no_results%"),[$,R]=i.useState(!1),[D,S]=i.useState("all"),[P,O]=i.useState(""),[q,L]=i.useState([]),H=i.useMemo(()=>{const z=t??[];return z.length===0?[]:gc(z,s,a)},[t,s,a]),N=i.useMemo(()=>{if($)return H;const z=[];return H.forEach(nt=>{const rt=nt.items[0],lt=z.find(pt=>pt.items[0]===rt);lt?(lt.count+=nt.count,lt.occurrences=lt.occurrences.concat(nt.occurrences)):z.push({items:[rt],count:nt.count,occurrences:nt.occurrences,status:nt.status})}),z},[$,H]),K=i.useMemo(()=>N.length===0?[]:hc(N,D,P),[N,D,P]),it=i.useMemo(()=>{var rt,lt;if(!$)return d;const z=(rt=o==null?void 0:o.tableHeaders)==null?void 0:rt.length;if(!z)return d;const nt=[];for(let pt=0;pt<z;pt++)nt.push(cc(((lt=o==null?void 0:o.tableHeaders)==null?void 0:lt[pt])||"Additional Item",pt+1));return[...nt,...d]},[o==null?void 0:o.tableHeaders,d,$]);i.useEffect(()=>{K.length===0?L([]):K.length===1&&L(K[0].items)},[K]);const ht=(z,nt)=>{nt.setRowSelection(()=>{const lt={};return lt[z.index]=!0,lt});const rt=z.original.items;L(rt),h&&rt.length>0&&h(rt[0])},Et=z=>{if(z==="book"||z==="chapter"||z==="verse")c(z);else throw new Error(`Invalid scope value: ${z}`)},wt=z=>{if(z==="all"||z==="approved"||z==="unapproved"||z==="unknown")S(z);else throw new Error(`Invalid status filter value: ${z}`)},kt=i.useMemo(()=>{if(N.length===0||q.length===0)return[];const z=N.filter(nt=>j.deepEqual($?nt.items:[nt.items[0]],q));if(z.length>1)throw new Error("Selected item is not unique");return z.length===0?[]:z[0].occurrences},[q,$,N]);return n.jsx("div",{id:w,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(be,{onValueChange:z=>wt(z),defaultValue:D,children:[n.jsx(le,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(ve,{placeholder:"Select filter"})}),n.jsxs(ce,{children:[n.jsx(_t,{value:"all",children:u}),n.jsx(_t,{value:"approved",children:g}),n.jsx(_t,{value:"unapproved",children:y}),n.jsx(_t,{value:"unknown",children:v})]})]}),n.jsxs(be,{onValueChange:z=>Et(z),defaultValue:l,children:[n.jsx(le,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(ve,{placeholder:"Select scope"})}),n.jsxs(ce,{children:[n.jsx(_t,{value:"book",children:T}),n.jsx(_t,{value:"chapter",children:b}),n.jsx(_t,{value:"verse",children:_})]})]}),n.jsx(ke,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:C,value:P,onChange:z=>{O(z.target.value)}}),o&&n.jsx(mt,{children:n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(bn,{className:"tw-m-1 tw-flex-shrink-0",checked:$,onCheckedChange:z=>{R(z)}}),n.jsx(ct,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??B})]})}),n.jsx(ft,{children:(o==null?void 0:o.checkboxText)??B})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(cs,{columns:it,data:K,onRowClickHandler:ht,stickyHeader:!0,isLoading:p,noResultsMessage:V})}),kt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(ac,{classNameForText:m,occurrenceData:kt,setScriptureReference:e,localizedStrings:r})})]})})}const bc="16rem",vc="3rem",js=i.createContext(void 0);function Je(){const t=i.useContext(js);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const gr=i.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:l="primary",...c},d)=>{const[w,p]=i.useState(t),m=e??w,h=i.useCallback(_=>{const C=typeof _=="function"?_(m):_;r?r(C):p(C)},[r,m]),u=i.useCallback(()=>h(_=>!_),[h]),g=m?"expanded":"collapsed",T=at()==="ltr"?l:l==="primary"?"secondary":"primary",b=i.useMemo(()=>({state:g,open:m,setOpen:h,toggleSidebar:u,side:T}),[g,m,h,u,T]);return n.jsx(js.Provider,{value:b,children:n.jsx(mt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":bc,"--sidebar-width-icon":vc,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:a})})})});gr.displayName="SidebarProvider";const xr=i.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const l=Je();return e==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});xr.displayName="Sidebar";const Ns=i.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Je();return n.jsxs(F,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Ns.displayName="SidebarTrigger";const ks=i.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Je();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});ks.displayName="SidebarRail";const br=i.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));br.displayName="SidebarInset";const _s=i.forwardRef(({className:t,...e},r)=>n.jsx(ke,{ref:r,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));_s.displayName="SidebarInput";const Cs=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Cs.displayName="SidebarHeader";const Es=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Es.displayName="SidebarFooter";const Ss=i.forwardRef(({className:t,...e},r)=>n.jsx(xe,{ref:r,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Ss.displayName="SidebarSeparator";const vr=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));vr.displayName="SidebarContent";const cn=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));cn.displayName="SidebarGroup";const dn=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Ie.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});dn.displayName="SidebarGroupLabel";const Rs=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Ie.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Rs.displayName="SidebarGroupAction";const wn=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",t),...e}));wn.displayName="SidebarGroupContent";const yr=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));yr.displayName="SidebarMenu";const jr=i.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",t),...e}));jr.displayName="SidebarMenuItem";const yc=de.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Nr=i.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...l},c)=>{const d=t?Ie.Slot:"button",{state:w}=Je(),p=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:f(yc({variant:r,size:o}),a),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:p}),n.jsx(ft,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});Nr.displayName="SidebarMenuButton";const Ts=i.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?Ie.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Ts.displayName="SidebarMenuAction";const Ms=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ms.displayName="SidebarMenuBadge";const Ds=i.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(ln,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(ln,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Ds.displayName="SidebarMenuSkeleton";const Is=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Is.displayName="SidebarMenuSub";const Os=i.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Os.displayName="SidebarMenuSubItem";const As=i.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const l=t?Ie.Slot:"a";return n.jsx(l,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});As.displayName="SidebarMenuSubButton";function Ps({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:d}){const w=i.useCallback((h,u)=>{o(h,u)},[o]),p=i.useCallback(h=>{const u=r.find(g=>g.projectId===h);return u?u.projectName:h},[r]),m=i.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(xr,{id:t,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(vr,{children:[n.jsxs(cn,{children:[n.jsx(dn,{className:"tw-text-sm",children:a}),n.jsx(wn,{children:n.jsx(yr,{children:Object.entries(e).map(([h,u])=>n.jsx(jr,{children:n.jsx(Nr,{onClick:()=>w(h),isActive:m(h),children:n.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),n.jsxs(cn,{children:[n.jsx(dn,{className:"tw-text-sm",children:l}),n.jsx(wn,{className:"tw-pl-3",children:n.jsx(on,{buttonVariant:"ghost",buttonClassName:f("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:oo},options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);w(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const vn=i.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:l},c)=>{const d=at();return n.jsxs("div",{id:l,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(ke,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:a}),t&&n.jsxs(F,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});vn.displayName="SearchBar";function jc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(vn,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(gr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ps,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),n.jsx(br,{className:"tw-min-w-[215px]",children:o})]})]})}const re="scrBook",Nc="scrRef",me="source",kc="details",_c="Scripture Reference",Cc="Scripture Book",Ls="Type",Ec="Details";function Sc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:re,header:(t==null?void 0:t.scriptureReferenceColumnName)??_c,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?st.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===re?j.formatScrRef(s.start):void 0},getGroupingValue:o=>st.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>j.formatScrRef(o.start),id:Nc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:j.formatScrRef(s.start)},sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:me,header:r?(t==null?void 0:t.typeColumnName)??Ls:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:kc,header:(t==null?void 0:t.detailsColumnName)??Ec,cell:o=>o.getValue(),enableGrouping:!1}]}const Rc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||j.compareScrRefs(t.start,t.end)===0?`${j.scrRefToBBBCCCVVV(t.start)}+${e}`:`${j.scrRefToBBBCCCVVV(t.start)}+${e}-${j.scrRefToBBBCCCVVV(t.end)}+${r}`},Xr=t=>`${Rc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Tc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:l,onRowSelected:c,id:d}){const[w,p]=i.useState([]),[m,h]=i.useState([{id:re,desc:!1}]),[u,g]=i.useState({}),y=i.useMemo(()=>t.flatMap(D=>D.data.map(S=>({...S,source:D.source}))),[t]),v=i.useMemo(()=>Sc({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:l},r),[o,a,l,r]);i.useEffect(()=>{w.includes(me)?h([{id:me,desc:!1},{id:re,desc:!1}]):h([{id:re,desc:!1}])},[w]);const T=bt.useReactTable({data:y,columns:v,state:{grouping:w,sorting:m,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:bt.getExpandedRowModel(),getGroupedRowModel:bt.getGroupedRowModel(),getCoreRowModel:bt.getCoreRowModel(),getSortedRowModel:bt.getSortedRowModel(),getRowId:Xr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(c){const D=T.getSelectedRowModel().rowsById,S=Object.keys(D);if(S.length===1){const P=y.find(O=>Xr(O)===S[0])||void 0;P&&c(P)}}},[u,y,c,T]);const b=s??Cc,_=a??Ls,C=[{label:"No Grouping",value:[]},{label:`Group by ${b}`,value:[re]},{label:`Group by ${_}`,value:[me]},{label:`Group by ${b} and ${_}`,value:[re,me]},{label:`Group by ${_} and ${b}`,value:[me,re]}],B=D=>{p(JSON.parse(D))},V=(D,S)=>{!D.getIsGrouped()&&!D.getIsSelected()&&D.getToggleSelectedHandler()(S)},$=(D,S)=>D.getIsGrouped()?"":f("banded-row",S%2===0?"even":"odd"),R=(D,S,P)=>{if(!((D==null?void 0:D.length)===0||S.depth<P.column.getGroupedIndex())){if(S.getIsGrouped())switch(S.depth){case 1:return"tw-ps-4";default:return}switch(S.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(be,{value:JSON.stringify(w),onValueChange:D=>{B(D)},children:[n.jsx(le,{className:"tw-mb-1 tw-mt-2",children:n.jsx(ve,{})}),n.jsx(ce,{position:"item-aligned",children:n.jsx(rs,{children:C.map(D=>n.jsx(_t,{value:JSON.stringify(D.value),children:D.label},D.label))})})]}),n.jsxs(Ye,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Xe,{children:T.getHeaderGroups().map(D=>n.jsx(Gt,{children:D.headers.filter(S=>S.column.columnDef.header).map(S=>n.jsx(De,{colSpan:S.colSpan,className:"top-0 tw-sticky",children:S.isPlaceholder?void 0:n.jsxs("div",{children:[S.column.getCanGroup()?n.jsx(F,{variant:"ghost",title:`Toggle grouping by ${S.column.columnDef.header}`,onClick:S.column.getToggleGroupingHandler(),type:"button",children:S.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",bt.flexRender(S.column.columnDef.header,S.getContext())]})},S.id))},D.id))}),n.jsx(We,{children:T.getRowModel().rows.map((D,S)=>{const P=at();return n.jsx(Gt,{"data-state":D.getIsSelected()?"selected":"",className:f($(D,S)),onClick:O=>V(D,O),children:D.getVisibleCells().map(O=>{if(!(O.getIsPlaceholder()||O.column.columnDef.enableGrouping&&!O.getIsGrouped()&&(O.column.columnDef.id!==me||!r)))return n.jsx(se,{className:f(O.column.columnDef.id,"tw-p-[1px]",R(w,D,O)),children:O.getIsGrouped()?n.jsxs(F,{variant:"link",onClick:D.getToggleExpandedHandler(),type:"button",children:[D.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!D.getIsExpanded()&&(P==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",bt.flexRender(O.column.columnDef.cell,O.getContext())," (",D.subRows.length,")"]}):bt.flexRender(O.column.columnDef.cell,O.getContext())},O.id)})},D.id)})})]})]})}const kr=(t,e)=>t.filter(r=>{try{return j.getSectionForBook(r)===e}catch{return!1}}),$s=(t,e,r)=>kr(t,e).every(o=>r.includes(o));function Mc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=kr(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(F,{variant:"outline",size:"sm",onClick:()=>o(t),className:f($s(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:ei(t,l,c,d,w)})}const Wr=5,Mn=6;function Dc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[v,T]=i.useState(!1),[b,_]=i.useState(""),C=i.useRef(void 0),B=i.useRef(!1);if(t.length!==st.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const V=i.useMemo(()=>st.Canon.allBookIds.filter((L,H)=>t[H]==="1"&&!st.Canon.isObsolete(st.Canon.bookIdToNumber(L))),[t]),$=i.useMemo(()=>{if(!b.trim()){const N={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return V.forEach(K=>{const it=j.getSectionForBook(K);N[it].push(K)}),N}const L=V.filter(N=>Wn(N,b,s)),H={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return L.forEach(N=>{const K=j.getSectionForBook(N);H[K].push(N)}),H},[V,b,s]),R=i.useCallback((L,H=!1)=>{if(!H||!C.current){r(e.includes(L)?e.filter(wt=>wt!==L):[...e,L]),C.current=L;return}const N=V.findIndex(wt=>wt===C.current),K=V.findIndex(wt=>wt===L);if(N===-1||K===-1)return;const[it,ht]=[Math.min(N,K),Math.max(N,K)],Et=V.slice(it,ht+1).map(wt=>wt);r(e.includes(L)?e.filter(wt=>!Et.includes(wt)):[...new Set([...e,...Et])])},[e,r,V]),D=L=>{R(L,B.current),B.current=!1},S=(L,H)=>{L.preventDefault(),R(H,L.shiftKey)},P=i.useCallback(L=>{const H=kr(V,L).map(N=>N);r($s(V,L,e)?e.filter(N=>!H.includes(N)):[...new Set([...e,...H])])},[e,r,V]),O=()=>{r(V.map(L=>L))},q=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(j.Section).map(L=>n.jsx(Mc,{section:L,availableBookIds:V,selectedBookIds:e,onToggle:P,localizedStrings:o},L))}),n.jsxs(Yt,{open:v,onOpenChange:L=>{T(L),L||_("")},children:[n.jsx(Jt,{asChild:!0,children:n.jsxs(F,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:l,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Ut,{shouldFilter:!1,onKeyDown:L=>{L.key==="Enter"&&(B.current=L.shiftKey)},children:[n.jsx(je,{placeholder:c,value:b,onValueChange:_}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:O,children:d}),n.jsx(F,{variant:"ghost",size:"sm",onClick:q,children:w})]}),n.jsxs(Ht,{children:[n.jsx(Ae,{children:p}),Object.values(j.Section).map((L,H)=>{const N=$[L];if(N.length!==0)return n.jsxs(i.Fragment,{children:[n.jsx(It,{heading:uo(L,h,u,g,y),children:N.map(K=>n.jsx(fo,{bookId:K,isSelected:e.includes(K),onSelect:()=>D(K),onMouseDown:it=>S(it,K),section:j.getSectionForBook(K),showCheck:!0,localizedBookNames:s,commandValue:$n(K,s),className:"tw-flex tw-items-center"},K))}),H<Object.values(j.Section).length-1&&n.jsx(Yn,{})]},L)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Mn?Mn:Wr).map(L=>n.jsx(ge,{className:"hover:tw-bg-secondary",variant:"secondary",children:Se(L,s)},L)),e.length>Mn&&n.jsx(ge,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Wr} ${m}`})]})]})}const Ic=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),pe=(t,e)=>t[e]??e;function Oc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:l,localizedBookNames:c,id:d}){const w=pe(l,"%webView_scope_selector_selected_text%"),p=pe(l,"%webView_scope_selector_current_verse%"),m=pe(l,"%webView_scope_selector_current_chapter%"),h=pe(l,"%webView_scope_selector_current_book%"),u=pe(l,"%webView_scope_selector_choose_books%"),g=pe(l,"%webView_scope_selector_scope%"),y=pe(l,"%webView_scope_selector_select_books%"),v=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],T=e?v.filter(b=>e.includes(b.value)):v;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ct,{children:g}),n.jsx(fn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:T.map(({value:b,label:_,id:C})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ke,{className:"tw-me-2",value:b,id:C}),n.jsx(ct,{htmlFor:C,children:_})]},C))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ct,{children:y}),n.jsx(Dc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:l,localizedBookNames:c})]})]})}const Dn={[j.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[j.getLocalizeKeyForScrollGroupId(0)]:"A",[j.getLocalizeKeyForScrollGroupId(1)]:"B",[j.getLocalizeKeyForScrollGroupId(2)]:"C",[j.getLocalizeKeyForScrollGroupId(3)]:"D",[j.getLocalizeKeyForScrollGroupId(4)]:"E",[j.getLocalizeKeyForScrollGroupId(5)]:"F",[j.getLocalizeKeyForScrollGroupId(6)]:"G",[j.getLocalizeKeyForScrollGroupId(7)]:"H",[j.getLocalizeKeyForScrollGroupId(8)]:"I",[j.getLocalizeKeyForScrollGroupId(9)]:"J",[j.getLocalizeKeyForScrollGroupId(10)]:"K",[j.getLocalizeKeyForScrollGroupId(11)]:"L",[j.getLocalizeKeyForScrollGroupId(12)]:"M",[j.getLocalizeKeyForScrollGroupId(13)]:"N",[j.getLocalizeKeyForScrollGroupId(14)]:"O",[j.getLocalizeKeyForScrollGroupId(15)]:"P",[j.getLocalizeKeyForScrollGroupId(16)]:"Q",[j.getLocalizeKeyForScrollGroupId(17)]:"R",[j.getLocalizeKeyForScrollGroupId(18)]:"S",[j.getLocalizeKeyForScrollGroupId(19)]:"T",[j.getLocalizeKeyForScrollGroupId(20)]:"U",[j.getLocalizeKeyForScrollGroupId(21)]:"V",[j.getLocalizeKeyForScrollGroupId(22)]:"W",[j.getLocalizeKeyForScrollGroupId(23)]:"X",[j.getLocalizeKeyForScrollGroupId(24)]:"Y",[j.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Ac({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:l}){const c={...Dn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in Dn?Dn[w]:p]))},d=at();return n.jsxs(be,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(le,{size:s,className:f("pr-twp tw-w-auto",a),children:n.jsx(ve,{placeholder:c[j.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(ce,{id:l,align:d==="rtl"?"end":"start",style:{zIndex:ye},children:t.map(w=>n.jsx(_t,{value:`${w}`,children:c[j.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function Pc({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function Lc({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function $c({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(xe,{}):""]})}function Fs(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function pn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Vs=(t,e,r,o)=>r?Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:"command"in c?n.jsxs(Ue,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(pn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(pn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(ts,{children:[n.jsx(wr,{children:c.label}),n.jsx(Qo,{children:n.jsx(pr,{children:Vs(t,e,Fs(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(ft,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function un({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:l="ghost",id:c}){return n.jsxs(Zt,{variant:a,children:[n.jsx(ie,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(F,{variant:l,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(qt,{align:"start",style:{zIndex:ye},children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>n.jsxs(i.Fragment,{children:[n.jsx(dr,{children:n.jsx(mt,{children:Vs(e.groups,e.items,d,t)})}),w<p.length-1&&n.jsx(Ne,{})]},d))})]})}const zs=i.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Fc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(zs,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(un,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(un,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function Vc({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(zs,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(un,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const _r=i.forwardRef(({className:t,...e},r)=>{const o=at();return n.jsx(Nt.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});_r.displayName=Nt.List.displayName;const Cr=i.forwardRef(({className:t,...e},r)=>n.jsx(Nt.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Cr.displayName=Nt.List.displayName;const Bs=i.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Trigger,{ref:r,...e,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Er=i.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Er.displayName=Nt.Content.displayName;function zc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(vn,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(_r,{children:[n.jsx(Cr,{children:t.map(c=>n.jsx(Bs,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(Er,{value:c.value,children:c.content},c.key))]})]})}function Bc({...t}){return n.jsx(tt.Menu,{...t})}function Gc({...t}){return n.jsx(tt.Sub,{"data-slot":"menubar-sub",...t})}const Gs=i.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=i.useMemo(()=>({variant:e}),[e]);return n.jsx(cr.Provider,{value:s,children:n.jsx(tt.Root,{ref:o,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Gs.displayName=tt.Root.displayName;const Ks=i.forwardRef(({className:t,...e},r)=>{const o=Lt();return n.jsx(tt.Trigger,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Qt({variant:o.variant,className:t})),...e})});Ks.displayName=tt.Trigger.displayName;const qs=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Lt();return n.jsxs(tt.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Qt({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});qs.displayName=tt.SubTrigger.displayName;const Us=i.forwardRef(({className:t,...e},r)=>{const o=Lt();return n.jsx(tt.SubContent,{ref:r,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Us.displayName=tt.SubContent.displayName;const Hs=i.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const l=Lt();return n.jsx(tt.Portal,{children:n.jsx(tt.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Hs.displayName=tt.Content.displayName;const Ys=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=Lt();return n.jsx(tt.Item,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Qt({variant:s.variant,className:t}),t),...r})});Ys.displayName=tt.Item.displayName;const Kc=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=Lt();return n.jsxs(tt.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Qt({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Kc.displayName=tt.CheckboxItem.displayName;const qc=i.forwardRef(({className:t,children:e,...r},o)=>{const s=Lt();return n.jsxs(tt.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Qt({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});qc.displayName=tt.RadioItem.displayName;const Uc=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(tt.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Uc.displayName=tt.Label.displayName;const Xs=i.forwardRef(({className:t,...e},r)=>n.jsx(tt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Xs.displayName=tt.Separator.displayName;const Fe=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Ws=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order);return s.flatMap(([a],l)=>{const c=e.filter(w=>w.group===a).sort((w,p)=>w.order-p.order).map(w=>n.jsxs(vt,{children:[n.jsx(yt,{asChild:!0,children:"command"in w?n.jsxs(Ys,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(pn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(pn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(Gc,{children:[n.jsx(qs,{children:w.label}),n.jsx(Us,{children:Ws(t,e,Fs(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(ft,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&l<s.length-1&&d.push(n.jsx(Xs,{},`separator-${a}`)),d})};function Hc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=i.useRef(void 0),a=i.useRef(void 0),l=i.useRef(void 0),c=i.useRef(void 0),d=i.useRef(void 0),w=p=>{switch(p){case"platform.app":return a;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return d;default:return}};if(qa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,m)=>{var g,y,v,T;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":Fe(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),Fe(a,[h,u]);break;case"alt+l":(y=l.current)==null||y.focus(),Fe(l,[h,u]);break;case"alt+n":(v=c.current)==null||v.focus(),Fe(c,[h,u]);break;case"alt+h":(T=d.current)==null||T.focus(),Fe(d,[h,u]);break}}),i.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const y=g.target.getAttribute("data-state");r(y==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Gs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,m])=>typeof p=="boolean"||typeof m=="boolean"?0:p.order-m.order).map(([p,m])=>n.jsxs(Bc,{children:[n.jsx(Ks,{ref:w(p),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(Hs,{style:{zIndex:ye},children:n.jsx(mt,{children:Ws(t.groups,t.items,p,e)})})]},p))})}function Yc(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Xc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=i.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(Hc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Wc=(t,e)=>t[e]??e;function Zc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:l,className:c,id:d}){const w=Wc(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,m]=i.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(y=>y!==g)]),a&&r.find(y=>y===g)&&a([...r.filter(y=>y!==g)]),m(!1)},u=(g,y)=>{var T,b,_,C,B,V;const v=y!==g?((b=(T=t[g])==null?void 0:T.uiNames)==null?void 0:b[y])??((C=(_=t[g])==null?void 0:_.uiNames)==null?void 0:C.en):void 0;return v?`${(B=t[g])==null?void 0:B.autonym} (${v})`:(V=t[g])==null?void 0:V.autonym};return n.jsxs("div",{id:d,className:f("pr-twp tw-max-w-sm",c),children:[n.jsxs(be,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>m(g),children:[n.jsx(le,{children:n.jsx(ve,{})}),n.jsx(ce,{style:{zIndex:ye},children:Object.keys(t).map(g=>n.jsx(_t,{value:g,children:u(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(ct,{className:"tw-font-normal tw-text-muted-foreground",children:j.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,e)).join(", "):t.en.autonym})})})]})}function Jc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(ct,{children:e(t)}):r?n.jsx(ct,{children:r(t)}):n.jsx(ct,{children:t})}function Qc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(bn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(Jc,{item:c,createLabel:a,createComplexLabel:l})]},c))})}function td({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:l,selectedButtons:c,hoverButtons:d,dropdownContent:w,additionalContent:p,accentColor:m,showDropdownOnHover:h=!1}){const u=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":e,className:f("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c,!e&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:d}),!e&&h&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(Zt,{children:[n.jsx(ie,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(F,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreVertical,{})})}),n.jsx(qt,{align:"end",children:w})]})}),e&&w&&n.jsxs(Zt,{children:[n.jsx(ie,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(F,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreVertical,{})})}),n.jsx(qt,{align:"end",children:w})]})]}),p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const Zs=i.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:f("tw-animate-spin",t),...e,ref:r}));Zs.displayName="Spinner";function ed({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:l,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:m,onFocus:h,onBlur:u}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(ct,{htmlFor:t,className:f({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(ke,{id:t,disabled:e,placeholder:l,required:c,className:f(d,{"tw-border-red-600":r}),defaultValue:w,value:p,onChange:m,onFocus:h,onBlur:u}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const nd=de.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Js=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:f("pr-twp",nd({variant:e}),t),...r}));Js.displayName="Alert";const Qs=i.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Qs.displayName="AlertTitle";const ta=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));ta.displayName="AlertDescription";const rd=et.Root,od=et.Trigger,sd=et.Group,ad=et.Portal,id=et.Sub,ld=et.RadioGroup,ea=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(et.SubTrigger,{ref:s,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ea.displayName=et.SubTrigger.displayName;const na=i.forwardRef(({className:t,...e},r)=>n.jsx(et.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));na.displayName=et.SubContent.displayName;const ra=i.forwardRef(({className:t,...e},r)=>n.jsx(et.Portal,{children:n.jsx(et.Content,{ref:r,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));ra.displayName=et.Content.displayName;const oa=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Item,{ref:o,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));oa.displayName=et.Item.displayName;const sa=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(et.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));sa.displayName=et.CheckboxItem.displayName;const aa=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(et.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));aa.displayName=et.RadioItem.displayName;const ia=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));ia.displayName=et.Label.displayName;const la=i.forwardRef(({className:t,...e},r)=>n.jsx(et.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));la.displayName=et.Separator.displayName;function ca({className:t,...e}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ca.displayName="ContextMenuShortcut";const da=i.createContext({direction:"bottom"});function wa({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=i.useMemo(()=>({direction:e}),[e]);return n.jsx(da.Provider,{value:o,children:n.jsx(Ot.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}wa.displayName="Drawer";const cd=Ot.Drawer.Trigger,pa=Ot.Drawer.Portal,dd=Ot.Drawer.Close,Sr=i.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Sr.displayName=Ot.Drawer.Overlay.displayName;const ua=i.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=i.useContext(da),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(pa,{children:[n.jsx(Sr,{}),n.jsxs(Ot.Drawer.Content,{ref:s,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",l[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});ua.displayName="DrawerContent";function ma({className:t,...e}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ma.displayName="DrawerHeader";function fa({className:t,...e}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}fa.displayName="DrawerFooter";const ha=i.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));ha.displayName=Ot.Drawer.Title.displayName;const ga=i.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));ga.displayName=Ot.Drawer.Description.displayName;const xa=i.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Pn.Root,{ref:o,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Pn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));xa.displayName=Pn.Root.displayName;function wd({className:t,...e}){return n.jsx(Bn.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const pd=Bn.Panel;function ud({withHandle:t,className:e,...r}){return n.jsx(Bn.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function md({...t}){return n.jsx(to.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ba=i.forwardRef(({className:t,...e},r)=>{const o=at();return n.jsxs(Ve.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Ve.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Ve.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Ve.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ba.displayName=Ve.Root.displayName;const va=i.forwardRef(({className:t,...e},r)=>{const o=at();return n.jsx(Ln.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Ln.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});va.displayName=Ln.Root.displayName;const fd=Nt.Root,ya=i.forwardRef(({className:t,...e},r)=>{const o=at();return n.jsx(Nt.List,{ref:r,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ya.displayName=Nt.List.displayName;const ja=i.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Trigger,{ref:r,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));ja.displayName=Nt.Trigger.displayName;const Na=i.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Content,{ref:r,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Na.displayName=Nt.Content.displayName;const ka=i.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ka.displayName="Textarea";const hd=(t,e)=>{i.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function gd(t){return{preserveValue:!0,...t}}const _a=(t,e,r={})=>{const o=i.useRef(e);o.current=e;const s=i.useRef(r);s.current=gd(s.current);const[a,l]=i.useState(()=>o.current),[c,d]=i.useState(!0);return i.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const p=await t();w&&(l(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[a,c]},In=()=>!1,xd=(t,e)=>{const[r]=_a(i.useCallback(async()=>{if(!t)return In;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),In,{preserveValue:!1});i.useEffect(()=>()=>{r!==In&&r()},[r])};function bd(t){i.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>to.toast});exports.Alert=Js;exports.AlertDescription=ta;exports.AlertTitle=Qs;exports.Avatar=ir;exports.AvatarFallback=lr;exports.AvatarImage=Jo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=ii;exports.BOOK_SELECTOR_STRING_KEYS=di;exports.Badge=ge;exports.BookChapterControl=ai;exports.BookSelector=wi;exports.Button=F;exports.COMMENT_EDITOR_STRING_KEYS=kl;exports.COMMENT_LIST_STRING_KEYS=_l;exports.Card=sr;exports.CardContent=ar;exports.CardDescription=Wo;exports.CardFooter=Zo;exports.CardHeader=Yo;exports.CardTitle=Xo;exports.ChapterRangeSelector=xo;exports.Checkbox=bn;exports.Checklist=Qc;exports.ComboBox=on;exports.Command=Ut;exports.CommandEmpty=Ae;exports.CommandGroup=It;exports.CommandInput=je;exports.CommandItem=At;exports.CommandList=Ht;exports.CommentEditor=Nl;exports.CommentList=Rl;exports.ContextMenu=rd;exports.ContextMenuCheckboxItem=sa;exports.ContextMenuContent=ra;exports.ContextMenuGroup=sd;exports.ContextMenuItem=oa;exports.ContextMenuLabel=ia;exports.ContextMenuPortal=ad;exports.ContextMenuRadioGroup=ld;exports.ContextMenuRadioItem=aa;exports.ContextMenuSeparator=la;exports.ContextMenuShortcut=ca;exports.ContextMenuSub=id;exports.ContextMenuSubContent=na;exports.ContextMenuSubTrigger=ea;exports.ContextMenuTrigger=od;exports.DataTable=cs;exports.Dialog=io;exports.DialogClose=ti;exports.DialogContent=qn;exports.DialogDescription=wo;exports.DialogFooter=co;exports.DialogHeader=Un;exports.DialogOverlay=Kn;exports.DialogPortal=lo;exports.DialogTitle=Hn;exports.DialogTrigger=Qa;exports.Drawer=wa;exports.DrawerClose=dd;exports.DrawerContent=ua;exports.DrawerDescription=ga;exports.DrawerFooter=fa;exports.DrawerHeader=ma;exports.DrawerOverlay=Sr;exports.DrawerPortal=pa;exports.DrawerTitle=ha;exports.DrawerTrigger=cd;exports.DropdownMenu=Zt;exports.DropdownMenuCheckboxItem=Kt;exports.DropdownMenuContent=qt;exports.DropdownMenuGroup=dr;exports.DropdownMenuItem=Ue;exports.DropdownMenuItemType=ps;exports.DropdownMenuLabel=Pe;exports.DropdownMenuPortal=Qo;exports.DropdownMenuRadioGroup=es;exports.DropdownMenuRadioItem=ur;exports.DropdownMenuSeparator=Ne;exports.DropdownMenuShortcut=ns;exports.DropdownMenuSub=ts;exports.DropdownMenuSubContent=pr;exports.DropdownMenuSubTrigger=wr;exports.DropdownMenuTrigger=ie;exports.ERROR_DUMP_STRING_KEYS=ds;exports.ERROR_POPOVER_STRING_KEYS=Ll;exports.EditorKeyboardShortcuts=hs;exports.ErrorDump=ws;exports.ErrorPopover=$l;exports.FOOTNOTE_EDITOR_STRING_KEYS=ec;exports.Filter=Gl;exports.FilterDropdown=Fl;exports.Footer=Bl;exports.FootnoteEditor=tc;exports.FootnoteItem=vs;exports.FootnoteList=oc;exports.INVENTORY_STRING_KEYS=fc;exports.Input=ke;exports.Inventory=xc;exports.Label=ct;exports.MARKER_MENU_STRING_KEYS=gs;exports.MarkdownRenderer=Pl;exports.MarkerMenu=xs;exports.MoreInfo=Vl;exports.MultiSelectComboBox=us;exports.NavigationContentSearch=zc;exports.Popover=Yt;exports.PopoverAnchor=ho;exports.PopoverContent=Pt;exports.PopoverTrigger=Jt;exports.Progress=xa;exports.RadioGroup=fn;exports.RadioGroupItem=Ke;exports.RecentSearches=go;exports.ResizableHandle=ud;exports.ResizablePanel=pd;exports.ResizablePanelGroup=wd;exports.ResultsCard=td;exports.SCOPE_SELECTOR_STRING_KEYS=Ic;exports.ScopeSelector=Oc;exports.ScriptureResultsViewer=Tc;exports.ScrollGroupSelector=Ac;exports.SearchBar=vn;exports.Select=be;exports.SelectContent=ce;exports.SelectGroup=rs;exports.SelectItem=_t;exports.SelectLabel=ss;exports.SelectScrollDownButton=fr;exports.SelectScrollUpButton=mr;exports.SelectSeparator=as;exports.SelectTrigger=le;exports.SelectValue=ve;exports.Separator=xe;exports.SettingsList=Pc;exports.SettingsListHeader=$c;exports.SettingsListItem=Lc;exports.SettingsSidebar=Ps;exports.SettingsSidebarContentSearch=jc;exports.Sidebar=xr;exports.SidebarContent=vr;exports.SidebarFooter=Es;exports.SidebarGroup=cn;exports.SidebarGroupAction=Rs;exports.SidebarGroupContent=wn;exports.SidebarGroupLabel=dn;exports.SidebarHeader=Cs;exports.SidebarInput=_s;exports.SidebarInset=br;exports.SidebarMenu=yr;exports.SidebarMenuAction=Ts;exports.SidebarMenuBadge=Ms;exports.SidebarMenuButton=Nr;exports.SidebarMenuItem=jr;exports.SidebarMenuSkeleton=Ds;exports.SidebarMenuSub=Is;exports.SidebarMenuSubButton=As;exports.SidebarMenuSubItem=Os;exports.SidebarProvider=gr;exports.SidebarRail=ks;exports.SidebarSeparator=Ss;exports.SidebarTrigger=Ns;exports.Skeleton=ln;exports.Slider=ba;exports.Sonner=md;exports.Spinner=Zs;exports.Switch=va;exports.TabDropdownMenu=un;exports.TabFloatingMenu=Vc;exports.TabToolbar=Fc;exports.Table=Ye;exports.TableBody=We;exports.TableCaption=ls;exports.TableCell=se;exports.TableFooter=is;exports.TableHead=De;exports.TableHeader=Xe;exports.TableRow=Gt;exports.Tabs=fd;exports.TabsContent=Na;exports.TabsList=ya;exports.TabsTrigger=ja;exports.TextField=ed;exports.Textarea=ka;exports.ToggleGroup=xn;exports.ToggleGroupItem=Re;exports.Toolbar=Xc;exports.Tooltip=vt;exports.TooltipContent=ft;exports.TooltipProvider=mt;exports.TooltipTrigger=yt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=ms;exports.UiLanguageSelector=Zc;exports.UndoRedoButtons=fs;exports.VerticalTabs=_r;exports.VerticalTabsContent=Er;exports.VerticalTabsList=Cr;exports.VerticalTabsTrigger=Bs;exports.Z_INDEX_ABOVE_DOCK=ye;exports.Z_INDEX_FOOTNOTE_EDITOR=Gn;exports.Z_INDEX_MODAL=ao;exports.Z_INDEX_MODAL_BACKDROP=so;exports.Z_INDEX_OVERLAY=oo;exports.badgeVariants=Ho;exports.buttonVariants=Zn;exports.cn=f;exports.getBookIdFromUSFM=mc;exports.getInventoryHeader=Ze;exports.getLinesFromUSFM=pc;exports.getNumberFromUSFM=uc;exports.getStatusForItem=ys;exports.getToolbarOSReservedSpaceClassName=Yc;exports.inventoryCountColumn=dc;exports.inventoryItemColumn=lc;exports.inventoryStatusColumn=wc;exports.selectTriggerVariants=os;exports.useEvent=hd;exports.useEventAsync=xd;exports.useListbox=Uo;exports.usePromise=_a;exports.useRecentSearches=ni;exports.useSidebar=Je;exports.useStylesheet=bd;function vd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}vd(`*, ::before, ::after {
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
.tw-w-\\[280px\\] {
  width: 280px;
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
