"use strict";var ua=Object.defineProperty;var ma=(t,e,r)=>e in t?ua(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var ut=(t,e,r)=>ma(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),bt=require("cmdk"),k=require("lucide-react"),fa=require("clsx"),ha=require("tailwind-merge"),ga=require("@radix-ui/react-dialog"),ot=require("@sillsdev/scripture"),y=require("platform-bible-utils"),Ee=require("@radix-ui/react-slot"),ie=require("class-variance-authority"),xa=require("@radix-ui/react-popover"),ba=require("@radix-ui/react-label"),va=require("@radix-ui/react-radio-group"),x=require("lexical"),Vr=require("@radix-ui/react-tooltip"),Rn=require("@lexical/rich-text"),yr=require("react-dom"),ya=require("@lexical/table"),ja=require("@radix-ui/react-toggle-group"),Na=require("@radix-ui/react-toggle"),zr=require("@lexical/headless"),ka=require("@radix-ui/react-separator"),_a=require("@radix-ui/react-avatar"),Gr=require("@radix-ui/react-dropdown-menu"),ft=require("@tanstack/react-table"),Ca=require("@radix-ui/react-select"),Ea=require("markdown-to-jsx"),Ct=require("@eten-tech-foundation/platform-editor"),Sa=require("@radix-ui/react-checkbox"),Ra=require("@radix-ui/react-tabs"),Ta=require("@radix-ui/react-menubar"),Ma=require("react-hotkeys-hook"),Da=require("@radix-ui/react-context-menu"),Ot=require("vaul"),Ia=require("@radix-ui/react-progress"),Oa=require("react-resizable-panels"),Br=require("sonner"),Aa=require("@radix-ui/react-slider"),Pa=require("@radix-ui/react-switch");function at(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const It=at(ga),ke=at(xa),Kr=at(ba),Le=at(va),Se=at(Vr),cn=at(ja),qr=at(Na),Hr=at(ka),Re=at(_a),Q=at(Gr),rt=at(Ca),Tn=at(Sa),vt=at(Ra),tt=at(Ta),et=at(Da),Mn=at(Ia),Ln=at(Oa),Oe=at(Aa),Dn=at(Pa),La=ha.extendTailwindMerge({prefix:"tw-"});function m(...t){return La(fa.clsx(t))}const $a="layoutDirection";function dt(){const t=localStorage.getItem($a);return t==="rtl"?t:"ltr"}const Fa=It.Root,Va=It.Portal,Ur=l.forwardRef(({className:t,...e},r)=>n.jsx(It.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Ur.displayName=It.Overlay.displayName;const Yr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=dt();return n.jsxs(Va,{children:[n.jsx(Ur,{}),n.jsxs(It.Content,{ref:o,className:m("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(It.Close,{className:m("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Yr.displayName=It.Content.displayName;function Xr({className:t,...e}){return n.jsx("div",{className:m("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Xr.displayName="DialogHeader";const Wr=l.forwardRef(({className:t,...e},r)=>n.jsx(It.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Wr.displayName=It.Title.displayName;const za=l.forwardRef(({className:t,...e},r)=>n.jsx(It.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));za.displayName=It.Description.displayName;const qt=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command,{ref:r,className:m("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));qt.displayName=bt.Command.displayName;const ge=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(bt.Command.Input,{ref:r,className:m("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});ge.displayName=bt.Command.Input.displayName;const Ht=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.List,{ref:r,className:m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Ht.displayName=bt.Command.List.displayName;const Te=l.forwardRef((t,e)=>n.jsx(bt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Te.displayName=bt.Command.Empty.displayName;const Bt=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.Group,{ref:r,className:m("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Bt.displayName=bt.Command.Group.displayName;const Jr=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.Separator,{ref:r,className:m("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Jr.displayName=bt.Command.Separator.displayName;const At=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.Item,{ref:r,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));At.displayName=bt.Command.Item.displayName;function Zr({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Zr.displayName="CommandShortcut";const Qr=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"Old Testament";case y.Section.NT:return r??"New Testament";case y.Section.DC:return o??"Deuterocanon";case y.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Ga=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"OT";case y.Section.NT:return r??"NT";case y.Section.DC:return o??"DC";case y.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function je(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??ot.Canon.bookIdToEnglishName(t)}function $n(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const to=ot.Canon.allBookIds.filter(t=>!ot.Canon.isObsolete(ot.Canon.bookIdToNumber(t))),pe=Object.fromEntries(to.map(t=>[t,ot.Canon.bookIdToEnglishName(t)]));function Fn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=ot.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(y.includes(s.toLowerCase(),o)||y.includes(t.toLowerCase(),o)||(i?y.includes(i.localizedName.toLowerCase(),o)||y.includes(i.localizedId.toLowerCase(),o):!1))}const eo=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:a=!1,localizedBookNames:c,commandValue:w},d)=>{const p=l.useRef(!1),f=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=v=>{p.current=!0,o?o(v):r==null||r(t)},u=l.useMemo(()=>je(t,c),[t,c]),g=l.useMemo(()=>$n(t,c),[t,c]);return n.jsx("div",{className:m("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===y.Section.OT,"tw-border-s-purple-200":s===y.Section.NT,"tw-border-s-indigo-200":s===y.Section.DC,"tw-border-s-amber-200":s===y.Section.Extra}),children:n.jsxs(At,{ref:d,value:w||`${t} ${ot.Canon.bookIdToEnglishName(t)}`,onSelect:f,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${ot.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[a&&n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Vn=ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),G=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},i)=>{const a=o?Ee.Slot:"button";return n.jsx(a,{className:m(Vn({variant:e,size:r,className:t})),ref:i,...s})});G.displayName="Button";const Ut=ke.Root,Zt=ke.Trigger,no=ke.Anchor,Pt=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},s)=>{const i=dt();return n.jsx(ke.Portal,{children:n.jsx(ke.Content,{ref:s,align:e,sideOffset:r,className:m("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Pt.displayName=ke.Content.displayName;function In(t,e,r){return`${t} ${pe[t]}${e?` ${$n(t,e)} ${je(t,e)}`:""}${r?` ${r}`:""}`}function ro({recentSearches:t,onSearchItemSelect:e,renderItem:r=p=>String(p),getItemKey:o=p=>String(p),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:a,classNameForItems:c,buttonClassName:w="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:d="ghost"}){const[p,f]=l.useState(!1);if(t.length===0)return;const h=u=>{e(u),f(!1)};return n.jsxs(Ut,{open:p,onOpenChange:f,children:[n.jsx(Zt,{asChild:!0,children:n.jsx(G,{variant:d,size:"icon",className:w,"aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Pt,{id:a,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(qt,{children:n.jsx(Ht,{children:n.jsx(Bt,{heading:i,children:t.map(u=>n.jsxs(At,{onSelect:()=>h(u),className:m("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function Ba(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(c=>!r(c,s)),a=[s,...i.slice(0,o-1)];e(a)}}const hn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Ka=[hn.BOOK_ONLY,hn.BOOK_CHAPTER,hn.BOOK_CHAPTER_VERSE];function jr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Vt(t){return y.getChaptersForBook(ot.Canon.bookIdToNumber(t))}function qa(t,e,r){if(!t.trim()||e.length===0)return;const o=Ka.reduce((s,i)=>{if(s)return s;const a=i.exec(t.trim());if(a){const[c,w=void 0,d=void 0]=a.slice(1);let p;const f=e.filter(h=>Fn(h,c,r));if(f.length===1&&([p]=f),!p&&w){if(ot.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&w){const u=(g=>Object.keys(pe).find(v=>pe[v].toLowerCase()===g.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=w?parseInt(w,10):void 0;h&&h>Vt(p)&&(h=Math.max(Vt(p),1));const u=d?parseInt(d,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function Ha(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],p=Math.max(Vt(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{const w=Vt(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const p=e[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:a,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===Vt(t.book)||Vt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,a,c,i])}function Nr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(Bt,{children:n.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:Vt(t)},(a,c)=>c+1).map(a=>n.jsx(At,{value:`${t} ${pe[t]||""} ${a}`,onSelect:()=>r(a),ref:o(a),className:m("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&a===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(a))??!1}),children:a},a))})})}function Ua({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:a,onAddRecentSearch:c,id:w}){const d=dt(),[p,f]=l.useState(!1),[h,u]=l.useState(""),[g,v]=l.useState(""),[b,j]=l.useState("books"),[N,C]=l.useState(void 0),[_,z]=l.useState(!1),$=l.useRef(void 0),R=l.useRef(void 0),L=l.useRef(void 0),E=l.useRef(void 0),T=l.useRef({}),F=l.useCallback(S=>{e(S),c&&c(S)},[e,c]),V=l.useMemo(()=>o?o():to,[o]),O=l.useMemo(()=>({[y.Section.OT]:V.filter(q=>ot.Canon.isBookOT(q)),[y.Section.NT]:V.filter(q=>ot.Canon.isBookNT(q)),[y.Section.DC]:V.filter(q=>ot.Canon.isBookDC(q)),[y.Section.Extra]:V.filter(q=>ot.Canon.extraBooks().includes(q))}),[V]),A=l.useMemo(()=>Object.values(O).flat(),[O]),K=l.useMemo(()=>{if(!g.trim())return O;const S={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return[y.Section.OT,y.Section.NT,y.Section.DC,y.Section.Extra].forEach(J=>{S[J]=O[J].filter(Z=>Fn(Z,g,s))}),S},[O,g,s]),D=l.useMemo(()=>qa(g,A,s),[g,A,s]),H=l.useCallback(()=>{D&&(F({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),f(!1),v(""),u(""))},[F,D]),yt=l.useCallback(S=>{if(Vt(S)<=1){F({book:S,chapterNum:1,verseNum:1}),f(!1),v("");return}C(S),j("chapters")},[F]),Rt=l.useCallback(S=>{const q=b==="chapters"?N:D==null?void 0:D.book;q&&(F({book:q,chapterNum:S,verseNum:1}),f(!1),j("books"),C(void 0),v(""))},[F,b,N,D]),Tt=l.useCallback(S=>{F(S),f(!1),v("")},[F]),it=Ha(t,A,d,e),P=l.useCallback(()=>{j("books"),C(void 0),setTimeout(()=>{R.current&&R.current.focus()},0)},[]),M=l.useCallback(S=>{if(!S&&b==="chapters"){P();return}f(S),S&&(j("books"),C(void 0),v(""))},[b,P]),{otLong:B,ntLong:Y,dcLong:X,extraLong:nt}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},ht=l.useCallback(S=>Qr(S,B,Y,X,nt),[B,Y,X,nt]),lt=l.useCallback(S=>D?!!D.chapterNum&&!S.toString().includes(D.chapterNum.toString()):!1,[D]),gt=l.useMemo(()=>y.formatScrRef(t,s?je(t.book,s):"English"),[t,s]),Mt=l.useCallback(S=>q=>{T.current[S]=q},[]),wt=l.useCallback(S=>{(S.key==="Home"||S.key==="End")&&S.stopPropagation()},[]),pt=l.useCallback(S=>{if(S.ctrlKey)return;const{isLetter:q,isDigit:J}=jr(S.key);if(b==="chapters"){if(S.key==="Backspace"){S.preventDefault(),S.stopPropagation(),P();return}if(q||J){if(S.preventDefault(),S.stopPropagation(),j("books"),C(void 0),J&&N){const Z=pe[N];v(`${Z} ${S.key}`)}else v(S.key);setTimeout(()=>{R.current&&R.current.focus()},0);return}}if((b==="chapters"||b==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(S.key)){const Z=b==="chapters"?N:D==null?void 0:D.book;if(!Z)return;const ct=(()=>{if(!h)return 1;const le=h.match(/(\d+)$/);return le?parseInt(le[1],10):0})(),Wt=Vt(Z);if(!Wt)return;let xt=ct;const Ue=6;switch(S.key){case"ArrowLeft":ct!==0&&(xt=ct>1?ct-1:Wt);break;case"ArrowRight":ct!==0&&(xt=ct<Wt?ct+1:1);break;case"ArrowUp":xt=ct===0?Wt:Math.max(1,ct-Ue);break;case"ArrowDown":xt=ct===0?1:Math.min(Wt,ct+Ue);break;default:return}xt!==ct&&(S.preventDefault(),S.stopPropagation(),u(In(Z,s,xt)),setTimeout(()=>{const le=T.current[xt];le&&le.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,D,P,N,h,s]),Xt=l.useCallback(S=>{if(S.shiftKey||S.key==="Tab"||S.key===" ")return;const{isLetter:q,isDigit:J}=jr(S.key);(q||J)&&(S.preventDefault(),v(Z=>Z+S.key),R.current.focus(),z(!1))},[]);return l.useLayoutEffect(()=>{const S=setTimeout(()=>{if(p&&b==="books"&&L.current&&E.current){const q=L.current,J=E.current,Z=J.offsetTop,ct=q.clientHeight,Wt=J.clientHeight,xt=Z-ct/2+Wt/2;q.scrollTo({top:Math.max(0,xt),behavior:"smooth"}),u(In(t.book))}},0);return()=>{clearTimeout(S)}},[p,b,g,D,t.book]),l.useLayoutEffect(()=>{if(b==="chapters"&&N){const S=N===t.book;setTimeout(()=>{if(L.current)if(S){const q=T.current[t.chapterNum];q&&q.scrollIntoView({block:"center",behavior:"smooth"})}else L.current.scrollTo({top:0});$.current&&$.current.focus()},0)}},[b,N,D,t.book,t.chapterNum]),n.jsxs(Ut,{open:p,onOpenChange:M,children:[n.jsx(Zt,{asChild:!0,children:n.jsx(G,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:m("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:gt})})}),n.jsx(Pt,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(qt,{ref:$,onKeyDown:pt,loop:!0,value:h,onValueChange:u,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(ge,{ref:R,value:g,onValueChange:v,onKeyDown:wt,onFocus:()=>z(!1),className:a&&a.length>0?"!tw-pr-10":""}),a&&a.length>0&&n.jsx(ro,{recentSearches:a,onSearchItemSelect:Tt,renderItem:S=>y.formatScrRef(S,"English"),getItemKey:S=>`${S.book}-${S.chapterNum}-${S.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:it.map(({onClick:S,disabled:q,title:J,icon:Z})=>n.jsx(G,{variant:"ghost",size:"sm",onClick:()=>{z(!0),S()},disabled:q,className:"tw-h-10 tw-w-4 tw-p-0",title:J,onKeyDown:Xt,children:n.jsx(Z,{})},J))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:P,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),N&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:je(N,s)})]}),!_&&n.jsxs(Ht,{ref:L,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!D&&Object.entries(K).map(([S,q])=>{if(q.length!==0)return n.jsx(Bt,{heading:ht(S),children:q.map(J=>n.jsx(eo,{bookId:J,onSelect:Z=>yt(Z),section:y.getSectionForBook(J),commandValue:`${J} ${pe[J]}`,ref:J===t.book?E:void 0,localizedBookNames:s},J))},S)}),D&&n.jsx(Bt,{children:n.jsx(At,{value:`${D.book} ${pe[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:H,className:"tw-font-semibold tw-text-primary",children:y.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},s?$n(D.book,s):void 0)},"top-match")}),D&&Vt(D.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:je(D.book,s)}),n.jsx(Nr,{bookId:D.book,scrRef:t,onChapterSelect:Rt,setChapterRef:Mt,isChapterDimmed:lt,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&N&&n.jsx(Nr,{bookId:N,scrRef:t,onChapterSelect:Rt,setChapterRef:Mt,className:"tw-p-4"})]})]})})]})}const Ya=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Xa=ie.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),st=l.forwardRef(({className:t,...e},r)=>n.jsx(Kr.Root,{ref:r,className:m("pr-twp",Xa(),t),...e}));st.displayName=Kr.Root.displayName;const dn=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(Le.Root,{className:m("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});dn.displayName=Le.Root.displayName;const $e=l.forwardRef(({className:t,...e},r)=>n.jsx(Le.Item,{ref:r,className:m("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Le.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));$e.displayName=Le.Item.displayName;function Wa(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Qe({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:i,onChange:a=()=>{},getOptionLabel:c=Wa,getButtonLabel:w,icon:d=void 0,buttonPlaceholder:p="",textPlaceholder:f="",commandEmptyMessage:h="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:b,...j}){const[N,C]=l.useState(!1),_=w??c,z=R=>R.length>0&&typeof R[0]=="object"&&"options"in R[0],$=(R,L)=>{const E=c(R),T=typeof R=="object"&&"secondaryLabel"in R?R.secondaryLabel:void 0,F=`${L??""}${E}${T??""}`;return n.jsxs(At,{value:E,onSelect:()=>{a(R),C(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||c(i)!==E})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[E,T&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",T]})]})]},F)};return n.jsxs(Ut,{open:N,onOpenChange:C,...j,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(G,{variant:u,role:"combobox","aria-expanded":N,"aria-label":b,id:t,className:m("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[d&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:d}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?_(i):p})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{align:g,className:m("tw-w-[200px] tw-p-0",s),children:n.jsxs(qt,{children:[n.jsx(ge,{placeholder:f,className:"tw-text-inherit"}),n.jsx(Te,{children:h}),n.jsx(Ht,{children:z(e)?e.map(R=>n.jsx(Bt,{heading:R.groupHeading,children:R.options.map(L=>$(L,R.groupHeading))},R.groupHeading)):e.map(R=>$(R))})]})})]})}function oo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const a=l.useMemo(()=>Array.from({length:i},(d,p)=>p+1),[i]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(st,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Qe,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:a,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(st,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Qe,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:a,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}var so=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(so||{});const Ja=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),gn=(t,e)=>t[e]??e;function Za({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:a,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=gn(d,"%webView_bookSelector_currentBook%"),f=gn(d,"%webView_bookSelector_choose%"),h=gn(d,"%webView_bookSelector_chooseBooks%"),[u,g]=l.useState("current book"),v=b=>{g(b),t(b)};return n.jsx(dn,{className:"pr-twp tw-flex",value:u,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx($e,{value:"current book"}),n.jsx(st,{className:"tw-ms-1",children:p})]}),n.jsx(st,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(oo,{isDisabled:u==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:a,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx($e,{value:"choose books"}),n.jsx(st,{className:"tw-ms-1",children:h})]}),n.jsx(st,{className:"tw-flex tw-items-center",children:o.map(b=>ot.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(G,{disabled:u==="current book",onClick:()=>r(),children:f})]})]})})}const ao=l.createContext(null);function Qa(t,e){return{getTheme:function(){return e??null}}}function Yt(){const t=l.useContext(ao);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const io=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ti=io?l.useLayoutEffect:l.useEffect,Ye={tag:x.HISTORY_MERGE_TAG};function ei({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:a,editorState:c,html:w}=t,d=Qa(null,o),p=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:i,onError:f=>a(f,p),theme:o});return function(f,h){if(h!==null){if(h===void 0)f.update(()=>{const u=x.$getRoot();if(u.isEmpty()){const g=x.$createParagraphNode();u.append(g);const v=io?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===f.getRootElement())&&g.select()}},Ye);else if(h!==null)switch(typeof h){case"string":{const u=f.parseEditorState(h);f.setEditorState(u,Ye);break}case"object":f.setEditorState(h,Ye);break;case"function":f.update(()=>{x.$getRoot().isEmpty()&&h(f)},Ye)}}}(p,c),[p,d]},[]);return ti(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(ao.Provider,{value:r,children:e})}const ni=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ri({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Yt();return ni(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:c,tags:w})=>{e&&i.size===0&&a.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const zn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Nt=Se.Provider,Et=Se.Root,St=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(Se.Trigger,{ref:o,className:e?m(Vn({variant:e}),t):t,...r}));St.displayName=Se.Trigger.displayName;const kt=l.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(Se.Content,{ref:o,sideOffset:e,className:m("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));kt.displayName=Se.Content.displayName;const Gn=[Rn.HeadingNode,x.ParagraphNode,x.TextNode,Rn.QuoteNode],oi=l.createContext(null),xn={didCatch:!1,error:null};class si extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=xn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(xn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&ai(e.resetKeys,s)){var i,a;(i=(a=this.props).onReset)===null||i===void 0||i.call(a,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(xn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:a}=this.state;let c=e;if(i){const w={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw a}return l.createElement(oi.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},c)}}function ai(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function ii({children:t,onError:e}){return n.jsx(si,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const li=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ci(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function di(){return function(t){const[e]=Yt(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),i=l.useRef(o);return li(()=>{const{initialValueFn:a,subscribe:c}=r,w=a();return i.current!==w&&(i.current=w,s(w)),c(d=>{i.current=d,s(d)})},[r,t]),o}(ci)}function wi(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,a=t.isBackward(),c=s.getNode(),w=i.getNode(),d=e.is(c),p=e.is(w);if(d||p){const[f,h]=x.$getCharacterOffsets(t),u=c.is(w),g=e.is(a?w:c),v=e.is(a?c:w);let b,j=0;u?(j=f>h?h:f,b=f>h?f:h):g?(j=a?h:f,b=void 0):v&&(j=0,b=a?f:h);const N=e.__text.slice(j,b);N!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=N)}}return e}function pi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const lo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ui=lo&&"documentMode"in document?document.documentMode:null;!(!lo||!("InputEvent"in window)||ui)&&"getTargetRanges"in new window.InputEvent("input");function mi(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||pi(4,t.__key),e}function fi(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],a=i.getKey();if(r.has(a))continue;const c=x.$findMatchingParent(i,d=>x.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!r.has(w)&&(r.add(w),t(c))}return r.size>0}const hi=Symbol.for("preact-signals");function wn(){if(ee>1)return void ee--;let t,e=!1;for(;Ae!==void 0;){let r=Ae;for(Ae=void 0,On++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&co(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(On=0,ee--,e)throw t}function gi(t){if(ee>0)return t();ee++;try{return t()}finally{wn()}}let U,Ae;function kr(t){const e=U;U=void 0;try{return t()}finally{U=e}}let ee=0,On=0,Je=0;function _r(t){if(U===void 0)return;let e=t.n;return e===void 0||e.t!==U?(e={i:0,S:t,p:U.s,n:void 0,t:U,e:void 0,x:void 0,r:e},U.s!==void 0&&(U.s.n=e),U.s=e,t.n=e,32&U.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=U.s,e.n=void 0,U.s.n=e,U.s=e),e):void 0}function mt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Fe(t,e){return new mt(t,e)}function co(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Cr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function wo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function de(t,e){mt.call(this,void 0),this.x=t,this.s=void 0,this.g=Je-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function xi(t,e){return new de(t,e)}function po(t){const e=t.u;if(t.u=void 0,typeof e=="function"){ee++;const r=U;U=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Bn(t),o}finally{U=r,wn()}}}function Bn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,po(t)}function bi(t){if(U!==this)throw new Error("Out-of-order effect");wo(this),U=t,this.f&=-2,8&this.f&&Bn(this),wn()}function ye(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function re(t,e){const r=new ye(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function pn(t,e={}){const r={};for(const o in t){const s=e[o],i=Fe(s===void 0?t[o]:s);r[o]=i}return r}mt.prototype.brand=hi,mt.prototype.h=function(){return!0},mt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:kr(()=>{var r;(r=this.W)==null||r.call(this)}))},mt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&kr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},mt.prototype.subscribe=function(t){return re(()=>{const e=this.value,r=U;U=void 0;try{t(e)}finally{U=r}},{name:"sub"})},mt.prototype.valueOf=function(){return this.value},mt.prototype.toString=function(){return this.value+""},mt.prototype.toJSON=function(){return this.value},mt.prototype.peek=function(){const t=U;U=void 0;try{return this.value}finally{U=t}},Object.defineProperty(mt.prototype,"value",{get(){const t=_r(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(On>100)throw new Error("Cycle detected");this.v=t,this.i++,Je++,ee++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{wn()}}}}),de.prototype=new mt,de.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Je))return!0;if(this.g=Je,this.f|=1,this.i>0&&!co(this))return this.f&=-2,!0;const t=U;try{Cr(this),U=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return U=t,wo(this),this.f&=-2,!0},de.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}mt.prototype.S.call(this,t)},de.prototype.U=function(t){if(this.t!==void 0&&(mt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},de.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(de.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=_r(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),ye.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},ye.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,po(this),Cr(this),ee++;const t=U;return U=this,bi.bind(this,t)},ye.prototype.N=function(){2&this.f||(this.f|=2,this.o=Ae,Ae=this)},ye.prototype.d=function(){this.f|=8,1&this.f||Bn(this)},ye.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>pn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return re(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function uo(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function mo(t,e=uo){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>pn(e),config:x.safeCast({$onClear:uo}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return re(()=>mo(t,o.value))}});function vi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const bn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class fo extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:bn}]})}getFormat(){return x.$getState(this,bn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,bn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function yi(t){return t instanceof fo}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[fo],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())yi(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function ho(t,e){let r;return Fe(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const An=x.defineExtension({build:t=>ho(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function go(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=go(r[s],o[s]);return t}return e}const Kn=0,Pn=1,xo=2,vn=3,Xe=4,ve=5,yn=6,De=7;function jn(t){return t.id===Kn}function bo(t){return t.id===xo}function ji(t){return function(e){return e.id===Pn}(t)||W(305,String(t.id),String(Pn)),Object.assign(t,{id:xo})}const Ni=new Set;class ki{constructor(e,r){ut(this,"builder");ut(this,"configs");ut(this,"_dependency");ut(this,"_peerNameSet");ut(this,"extension");ut(this,"state");ut(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Kn}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;bo(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,w,d){return Object.assign(c,{config:w,id:vn,registerState:d})}(r,this.mergeConfigs(),o);let a;this.state=i,this.extension.init&&(a=this.extension.init(e,i.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:Xe,initResult:w,registerState:d})}(i,a,s)}build(e){const r=this.state;let o;r.id!==Xe&&W(307,String(r.id),String(ve)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,a,c){return Object.assign(i,{id:ve,output:a,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==ve&&W(308,String(o.id),String(ve));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:yn})}(o),()=>{const i=this.state;i.id!==De&&W(309,String(o.id),String(De)),this.state=function(a){return Object.assign(a,{id:ve})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==yn&&W(310,String(r.id),String(yn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:De})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const e=this.state;return function(r){return r.id>=Xe}(e)||W(313,String(e.id),String(Xe)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=vn}(e)||W(314,String(e.id),String(vn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=De}(e)||W(316,String(e.id),String(De)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Ni}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=ve})(e)||W(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Er={tag:x.HISTORY_MERGE_TAG};function _i(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Ci=x.defineExtension({config:x.safeCast({setOptions:Er,updateOptions:Er}),init:({$initialEditorState:t=_i})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const a=t.parseEditorState(i);t.setEditorState(a,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Sr=Symbol.for("@lexical/extension/LexicalBuilder");function Rr(){}function Ei(t){throw t}function We(t){return Array.isArray(t)?t:[t]}const Nn="0.41.0+prod.esm";class Pe{constructor(e){ut(this,"roots");ut(this,"extensionNameMap");ut(this,"outgoingConfigEdges");ut(this,"incomingEdges");ut(this,"conflicts");ut(this,"_sortedExtensionReps");ut(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Nn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[We(Ci)];for(const o of e)r.push(We(o));return new Pe(r)}static maybeFromEditor(e){const r=e[Sr];return r&&(r.PACKAGE_VERSION!==Nn&&W(292,r.PACKAGE_VERSION,Nn),r instanceof Pe||W(293)),r}static fromEditor(e){const r=Pe.maybeFromEditor(e);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[Sr]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=Rr;function r(){try{e()}finally{e=Rr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&W(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&W(296);const r=We(e),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new ki(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&W(299,o.name,i);for(const a of o.conflictsWith||[])this.extensionNameMap.has(a)&&W(299,o.name,a),this.conflicts.set(a,o.name);for(const a of o.dependencies||[]){const c=We(a);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[a,c]of o.peerDependencies||[])this.addEdge(o.name,a,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(bo(i))return;const a=o.extension.name;var c;jn(i)||W(300,a,s||"[unknown]"),jn(c=i)||W(304,String(c.id),String(Kn)),i=Object.assign(c,{id:Pn}),o.state=i;const w=this.outgoingConfigEdges.get(a);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,a)}i=ji(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())jn(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const a=this.extensionNameMap.get(s);if(a)for(const c of i)a.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&W(301,o.name);for(const a of s)i.configs.add(a)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const a of r){const c=a.register(e,i);c&&s.push(c)}for(const a of r){const c=a.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},a={},c=this.sortedExtensionReps();for(const p of c){const{extension:f}=p;if(f.onError!==void 0&&(e.onError=f.onError),f.disableEvents!==void 0&&(e.disableEvents=f.disableEvents),f.parentEditor!==void 0&&(e.parentEditor=f.parentEditor),f.editable!==void 0&&(e.editable=f.editable),f.namespace!==void 0&&(e.namespace=f.namespace),f.$initialEditorState!==void 0&&(e.$initialEditorState=f.$initialEditorState),f.nodes)for(const h of vi(f)){if(typeof h!="function"){const u=o.get(h.replace);u&&W(302,f.name,h.replace.name,u.extension.name),o.set(h.replace,p)}r.add(h)}if(f.html){if(f.html.export)for(const[h,u]of f.html.export.entries())s.set(h,u);f.html.import&&Object.assign(i,f.html.import)}f.theme&&go(a,f.theme)}Object.keys(a).length>0&&(e.theme=a),r.size&&(e.nodes=[...r]);const w=Object.keys(i).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=i),d&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=Ei),e}}const Si=new Set,Tr=x.defineExtension({build(t,e,r){const o=r.getDependency(An).output,s=Fe({watchedNodeKeys:new Map}),i=ho(()=>{},()=>re(()=>{const a=i.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,f]of c.entries()){if(f.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),u=h&&h.isSelected()||!1;d=d||u!==(!!a&&a.has(p)),u&&(w=w||new Set,w.add(p))}}),!d&&w&&a&&w.size===a.size||(i.value=w)}));return{watchNodeKey:function(a){const c=xi(()=>(i.value||Si).has(a)),{watchedNodeKeys:w}=s.peek();let d=w.get(a);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(a,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[An],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class _e extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new _e(e.__key)}static importJSON(e){return vo().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Ri,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Ri(){return{node:vo()}}function vo(){return x.$create(_e)}function Ti(t){return t instanceof _e}x.defineExtension({dependencies:[An,Tr],name:"@lexical/extension/HorizontalRule",nodes:()=>[_e],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Tr).output,s=Fe({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,a=>{if(x.isDOMNode(a.target)){const c=x.$getNodeFromDOMNode(a.target);if(Ti(c))return function(w,d=!1){const p=x.$getSelection(),f=w.isSelected(),h=w.getKey();let u;d&&x.$isNodeSelection(p)?u=p:(u=x.$createNodeSelection(),x.$setSelection(u)),f?u.delete(h):u.add(h)}(c,a.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(_e,(a,c)=>{gi(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,f]of a.entries())if(f==="destroyed")d.delete(p),w=!0;else{const h=d.get(p),u=t.getElementByKey(p);h?h.domNode.value=u:(w=!0,d.set(p,{domNode:Fe(u),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),re(()=>{const a=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())a.push(re(()=>{const d=c.value;d&&(w.value?x.addClassNamesToElement(d,i):x.removeClassNamesFromElement(d,i))}));return x.mergeRegister(...a)}))}});function yo(t){return t.canBeEmpty()}function Mi(t,e,r=yo){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(a){if(a.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const c=a.anchor,w=a.focus,d=w.isBefore(c)?w:c,p=d.getNode(),f=mi(p);if(f.canIndent()){const h=f.getKey();let u=x.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=x.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(d))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return fi(a=>{if(i(a)){const c=a.getIndent()+1;(!o||c<o)&&a.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>pn(e),config:x.safeCast({$canIndent:yo,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return re(()=>{if(!o.value)return Mi(t,s,i)})}});const Di=x.defineExtension({name:"@lexical/react/ReactProvider"});function Ii(){return x.$getRoot().getTextContent()}function Oi(t,e=!0){if(t)return!1;let r=Ii();return e&&(r=r.trim()),r===""}function Ai(t){if(!Oi(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),a=i.length;for(let c=0;c<a;c++){const w=i[o];if(!x.$isTextNode(w))return!1}}}return!0}function jo(t){return()=>Ai(t)}function No(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let a;try{a=JSON.parse(i)}catch{return}if(a&&a.protocol==="nuanria_messaging"&&a.type==="request"){const c=a.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,f,h,u]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const v=g.anchor;let b=v.getNode(),j=0,N=0;if(x.$isTextNode(b)&&d>=0&&p>=0&&(j=d,N=d+p,g.setTextNodeRange(b,j,b,N)),j===N&&f===""||(g.insertRawText(f),b=v.getNode()),x.$isTextNode(b)){j=h,N=h+u;const C=b.getTextContentSize();j=j>C?C:j,N=N>C?C:N,g.setTextNodeRange(b,j,b,N)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>pn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>re(()=>r.getOutput().disabled.value?void 0:No(t))});function Pi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const qn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Li({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=l.useState(()=>r.getDecorators());return qn(()=>r.registerDecoratorListener(a=>{yr.flushSync(()=>{i(a)})}),[r]),l.useEffect(()=>{i(r.getDecorators())},[r]),l.useMemo(()=>{const a=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(l.Suspense,{fallback:null,children:s[d]})}),f=r.getElementByKey(d);f!==null&&a.push(yr.createPortal(p,f,d))}return a},[o,s,r])}(t,e)}function $i({editor:t,ErrorBoundary:e}){return function(r){const o=Pe.maybeFromEditor(r);if(o&&o.hasExtensionByName(Di.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Pi(320,s);return!0}return!1}(t)?null:n.jsx(Li,{editor:t,ErrorBoundary:e})}function Mr(t){return t.getEditorState().read(jo(t.isComposing()))}function Fi({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Yt();return function(s){qn(()=>x.mergeRegister(Rn.registerRichText(s),No(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Vi,{content:e}),n.jsx($i,{editor:o,ErrorBoundary:r})]})}function Vi({content:t}){const[e]=Yt(),r=function(s){const[i,a]=l.useState(()=>Mr(s));return qn(()=>{function c(){const w=Mr(s);a(w)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(e),o=di();return r?typeof t=="function"?t(o):t:null}function zi({defaultSelection:t}){const[e]=Yt();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Gi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Bi({onClear:t}){const[e]=Yt();return Gi(()=>mo(e,t),[e,t]),null}const ko=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ki({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:a,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:f,ariaRequired:h,autoCapitalize:u,className:g,id:v,role:b="textbox",spellCheck:j=!0,style:N,tabIndex:C,"data-testid":_,...z},$){const[R,L]=l.useState(t.isEditable()),E=l.useCallback(F=>{F&&F.ownerDocument&&F.ownerDocument.defaultView?t.setRootElement(F):t.setRootElement(null)},[t]),T=l.useMemo(()=>function(...F){return V=>{for(const O of F)typeof O=="function"?O(V):O!=null&&(O.current=V)}}($,E),[E,$]);return ko(()=>(L(t.isEditable()),t.registerEditableListener(F=>{L(F)})),[t]),n.jsx("div",{"aria-activedescendant":R?e:void 0,"aria-autocomplete":R?r:"none","aria-controls":R?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":R&&b==="combobox"?!!a:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":R?f:void 0,"aria-readonly":!R||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:R,"data-testid":_,id:v,ref:T,role:b,spellCheck:j,style:N,tabIndex:C,...z})}const qi=l.forwardRef(Ki);function Dr(t){return t.getEditorState().read(jo(t.isComposing()))}const Hi=l.forwardRef(Ui);function Ui(t,e){const{placeholder:r,...o}=t,[s]=Yt();return n.jsxs(n.Fragment,{children:[n.jsx(qi,{editor:s,...o,ref:e}),r!=null&&n.jsx(Yi,{editor:s,content:r})]})}function Yi({content:t,editor:e}){const r=function(a){const[c,w]=l.useState(()=>Dr(a));return ko(()=>{function d(){const p=Dr(a);w(p)}return d(),x.mergeRegister(a.registerUpdateListener(()=>{d()}),a.registerEditableListener(()=>{d()}))},[a]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(a=>{s(a)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function Xi({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Hi,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const _o=l.createContext(void 0);function Wi({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const a=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(_o.Provider,{value:a,children:i})}function Co(){const t=l.useContext(_o);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Ji(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:i,content:a}=t;return n.jsx(Fa,{open:!0,onOpenChange:r,children:n.jsxs(Yr,{children:[n.jsx(Xr,{children:n.jsx(Wr,{children:i})}),a]})})},[t,r]),s=l.useCallback((i,a,c=!1)=>{e({closeOnClickOutside:c,content:a(r),title:i})},[r]);return[o,s]}function Zi({children:t}){const[e]=Yt(),[r,o]=l.useState(e),[s,i]=l.useState("paragraph"),[a,c]=Ji(),w=()=>{};return l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Wi,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:i,showModal:c,children:[a,t({blockType:s})]})}function Qi(t){const[e]=Yt(),{activeEditor:r}=Co();l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const Eo=ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),tl=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(qr.Root,{ref:s,className:m(Eo({variant:e,size:r,className:t})),...o}));tl.displayName=qr.Root.displayName;const So=l.createContext({size:"default",variant:"default"}),un=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},i)=>{const a=dt();return n.jsx(cn.Root,{ref:i,className:m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:a,children:n.jsx(So.Provider,{value:{variant:e,size:r},children:o})})});un.displayName=cn.Root.displayName;const Ne=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},i)=>{const a=l.useContext(So);return n.jsx(cn.Item,{ref:i,className:m(Eo({variant:a.variant||r,size:a.size||o}),t),...s,children:e})});Ne.displayName=cn.Item.displayName;const Ir=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"}];function el(){const{activeEditor:t}=Co(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(x.$isRangeSelection(s)||ya.$isTableSelection(s)){const i=[];Ir.forEach(({format:a})=>{s.hasFormat(a)&&i.push(a)}),r(a=>a.length!==i.length||!i.every(c=>a.includes(c))?i:a)}},[]);return Qi(o),n.jsx(un,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Ir.map(({format:s,icon:i,label:a})=>n.jsx(Ne,{value:s,"aria-label":a,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function nl({onClear:t}){const[e]=Yt();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function rl({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Zi,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(el,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Fi,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Xi,{placeholder:t})}),ErrorBoundary:ii}),e&&n.jsx(zi,{defaultSelection:"rootEnd"}),n.jsx(nl,{onClear:r}),n.jsx(Bi,{})]})]})}const ol={namespace:"commentEditor",theme:zn,nodes:Gn,onError:t=>{console.error(t)}};function tn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:a,className:c}){return n.jsx("div",{className:m("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(ei,{initialConfig:{...ol,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(Nt,{children:[n.jsx(rl,{placeholder:s,autoFocus:i,onClear:a}),n.jsx(ri,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function sl(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!To.has(i.nodeName)){const a=Mo(i,t,s,!1);a!==null&&(o=o.concat(a))}return function(i){for(const a of i)a.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&a.insertAfter(x.$createLineBreakNode());for(const a of i){const c=a.getChildren();for(const w of c)a.insertBefore(w);a.remove()}}(s),o}function al(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)Ro(t,o[s],r,e);return r.innerHTML}function Ro(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let a=e;o!==null&&x.$isTextNode(e)&&(a=wi(o,e,"clone"));const c=x.$isElementNode(a)?a.getChildren():[],w=x.getRegisteredNode(t,a.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,a):a.exportDOM(t);const{element:p,after:f}=d;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],v=Ro(t,g,h,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),f){const u=f.call(a,p);u&&(x.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(h);return s}const To=new Set(["STYLE","SCRIPT"]);function Mo(t,e,r,o,s=new Map,i){let a=[];if(To.has(t.nodeName))return a;let c=null;const w=function(g,v){const{nodeName:b}=g,j=v._htmlConversions.get(b.toLowerCase());let N=null;if(j!==void 0)for(const C of j){const _=C(g);_!==null&&(N===null||(N.priority||0)<=(_.priority||0))&&(N=_)}return N!==null?N.conversion:null}(t,e),d=w?w(t):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,i),!c)break;c&&a.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const f=t.childNodes;let h=[];const u=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<f.length;g++)h.push(...Mo(f[g],e,r,u,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=il(t,h,u?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?a=a.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(a=a.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),a}function il(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let a=0;a<e.length;a++){const c=e[a];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),a===e.length-1||a<e.length-1&&x.$isBlockElementNode(e[a+1])){const w=r();w.setFormat(o),w.append(...i),s.push(w),i=[]}}return s}function Do(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Io(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Io(e.children)):!1}function Dt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Io(t.root.children):!1}function ll(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=zr.createHeadlessEditor({namespace:"EditorUtils",theme:zn,nodes:Gn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=sl(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function en(t){const e=zr.createHeadlessEditor({namespace:"EditorUtils",theme:zn,nodes:Gn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=al(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Hn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function Ze(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Un(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const cl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function kn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function dl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=l.useState(cl),[a,c]=l.useState(void 0),[w,d]=l.useState(!1),p=l.useRef(void 0),f=l.useRef(null);l.useEffect(()=>{let j=!0;const N=f.current;if(!N)return;const C=setTimeout(()=>{j&&Do(N)},300);return()=>{j=!1,clearTimeout(C)}},[]);const h=l.useCallback(()=>{if(!Dt(s))return;const j=en(s);e(j,a)},[s,e,a]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:n.jsx(G,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(kt,{children:n.jsx("p",{children:v})})]})}),n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:n.jsx(G,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Dt(s),children:n.jsx(k.Check,{})})}),n.jsx(kt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Ut,{open:w,onOpenChange:d,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(G,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:kn(a!==void 0?a:"",o)})]})}),n.jsx(Pt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),d(!1))},children:n.jsx(qt,{children:n.jsx(Ht,{children:t.map(j=>n.jsx(At,{onSelect:()=>{c(j===""?void 0:j),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:kn(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):Un(j)&&(j.preventDefault(),j.stopPropagation(),Dt(s)&&h())},onKeyDown:j=>{Hn(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(tn,{editorSerializedState:s,onSerializedChange:j=>i(j),placeholder:u,onClear:j=>{p.current=j}})})]})}const wl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),pl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],ul=["input","select","textarea","button"],ml=["button","textbox"],Oo=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[i,a]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(u=>{a(u);const g=t.find(b=>b.id===u);g&&(e==null||e(g));const v=document.getElementById(u);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=l.useCallback(u=>{const g=t.find(v=>v.id===u);g&&(w(v=>v===u?void 0:u),r==null||r(g))},[r,t]),f=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||ul.includes(g))return!0;const v=u.getAttribute("role");if(v&&ml.includes(v))return!0;const b=u.getAttribute("tabindex");return b!==void 0&&b!=="-1"},h=l.useCallback(u=>{var R;const g=u.target,v=L=>L?document.getElementById(L):void 0,b=v(c),j=v(i);if(!!(b&&g&&b.contains(g)&&g!==b)&&f(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const L=t.find(E=>E.id===c);L&&d(L.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!b)return;const L=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(L.length===0)return;const E=L.findIndex(F=>F===g);if(E===-1)return;let T;u.key==="ArrowDown"?T=Math.min(E+1,L.length-1):T=Math.max(E-1,0),T!==E&&(u.preventDefault(),u.stopPropagation(),(R=L[T])==null||R.focus());return}return}const _=t.findIndex(L=>L.id===i);let z=_;switch(u.key){case"ArrowDown":z=Math.min(_+1,t.length-1),u.preventDefault();break;case"ArrowUp":z=Math.max(_-1,0),u.preventDefault();break;case"Home":z=0,u.preventDefault();break;case"End":z=t.length-1,u.preventDefault();break;case" ":case"Enter":i&&p(i),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const L=j;if(L){const E=L.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=L.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),F=E??T;if(F){u.preventDefault(),F.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(f(g)||(o==null||o(u.key),u.preventDefault()));return}const $=t[z];$&&d($.id)},[t,d,i,c,p,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:h,focusOption:d}},Ao=ie.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ue=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:m("pr-twp",Ao({variant:e}),t),...r}));ue.displayName="Badge";const Yn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Yn.displayName="Card";const Po=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Po.displayName="CardHeader";const Lo=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:m("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Lo.displayName="CardTitle";const $o=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:m("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));$o.displayName="CardDescription";const Xn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-p-6 tw-pt-0",t),...e}));Xn.displayName="CardContent";const Fo=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Fo.displayName="CardFooter";const me=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(Hr.Root,{ref:s,decorative:r,orientation:e,className:m("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));me.displayName=Hr.Root.displayName;const Wn=l.forwardRef(({className:t,...e},r)=>n.jsx(Re.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Wn.displayName=Re.Root.displayName;const Vo=l.forwardRef(({className:t,...e},r)=>n.jsx(Re.Image,{ref:r,className:m("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Vo.displayName=Re.Image.displayName;const Jn=l.forwardRef(({className:t,...e},r)=>n.jsx(Re.Fallback,{ref:r,className:m("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Jn.displayName=Re.Fallback.displayName;const Zn=l.createContext(void 0);function Lt(){const t=l.useContext(Zn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Qt=ie.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),oe=Q.Trigger,Qn=Q.Group,zo=Q.Portal,Go=Q.Sub,Bo=Q.RadioGroup;function Jt({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(Zn.Provider,{value:r,children:n.jsx(Q.Root,{...e})})}const tr=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=Lt();return n.jsxs(Q.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Qt({variant:i.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});tr.displayName=Q.SubTrigger.displayName;const er=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));er.displayName=Q.SubContent.displayName;const Kt=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const i=dt();return n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:s,sideOffset:e,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});Kt.displayName=Q.Content.displayName;const Ve=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=dt(),i=Lt();return n.jsx(Q.Item,{ref:o,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Qt({variant:i.variant})),...r,dir:s})});Ve.displayName=Q.Item.displayName;const Gt=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=Lt();return n.jsxs(Q.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Qt({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Gt.displayName=Q.CheckboxItem.displayName;const nr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=Lt();return n.jsxs(Q.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Qt({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});nr.displayName=Q.RadioItem.displayName;const Me=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Me.displayName=Q.Label.displayName;const xe=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));xe.displayName=Q.Separator.displayName;function Ko({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Ko.displayName="DropdownMenuShortcut";function Or({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:a,canEditOrDelete:c=!1}){const[w,d]=l.useState(!1),[p,f]=l.useState(),h=l.useRef(null);l.useEffect(()=>{if(!w)return;let _=!0;const z=h.current;if(!z)return;const $=setTimeout(()=>{_&&Do(z)},300);return()=>{_=!1,clearTimeout($)}},[w]);const u=l.useCallback(_=>{_&&_.stopPropagation(),d(!1),f(void 0),a==null||a(!1)},[a]),g=l.useCallback(async _=>{if(_&&_.stopPropagation(),!p||!s)return;await s(t.id,en(p))&&(d(!1),f(void 0),a==null||a(!1))},[p,s,t.id,a]),v=l.useMemo(()=>{const _=new Date(t.date),z=y.formatRelativeDate(_,r["%comment_date_today%"],r["%comment_date_yesterday%"]),$=_.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return y.formatReplacementString(r["%comment_dateAtTime%"],{date:z,time:$})},[t.date,r]),b=l.useMemo(()=>t.user,[t.user]),j=l.useMemo(()=>t.user.split(" ").map(_=>_[0]).join("").toUpperCase().slice(0,2),[t.user]),N=l.useMemo(()=>y.sanitizeHtml(t.contents),[t.contents]),C=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ve,{onClick:_=>{_.stopPropagation(),d(!0),f(ll(t.contents)),a==null||a(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ve,{onClick:async _=>{_.stopPropagation(),i&&await i(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,i,a]);return n.jsxs("div",{className:m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(Wn,{className:"tw-h-8 tw-w-8",children:n.jsx(Jn,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(ue,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Ze(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:_=>{_.key==="Escape"?(_.preventDefault(),_.stopPropagation(),u()):Un(_)&&(_.preventDefault(),_.stopPropagation(),Dt(p)&&g())},onKeyDown:_=>{Hn(_),(_.key==="Enter"||_.key===" ")&&_.stopPropagation()},onClick:_=>{_.stopPropagation()},children:[n.jsx(tn,{className:m('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:_=>f(_)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(G,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(G,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(p),children:n.jsx(k.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:m("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:N}})]})]}),C&&n.jsxs(Jt,{children:[n.jsx(oe,{asChild:!0,children:n.jsx(G,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Kt,{align:"end",children:C})]})]})}const Ar={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function fl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:a,handleSelectThread:c,threadId:w,thread:d,threadStatus:p,handleAddCommentToThread:f,handleUpdateComment:h,handleDeleteComment:u,handleReadStatusChange:g,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:j,canUserResolveThreadCallback:N,canUserEditOrDeleteCommentCallback:C,isRead:_=!1,autoReadDelay:z=5,onVerseRefClick:$}){const[R,L]=l.useState(Ar),[E,T]=l.useState(void 0),F=o,[V,O]=l.useState(!1),[A,K]=l.useState(!1),[D,H]=l.useState(!1),[yt,Rt]=l.useState(!1),[Tt,it]=l.useState(!1),[P,M]=l.useState(_),[B,Y]=l.useState(!1),X=l.useRef(void 0),[nt,ht]=l.useState(new Map);l.useEffect(()=>{let I=!0;return(async()=>{const _t=N?await N(w):!1;I&&it(_t)})(),()=>{I=!1}},[w,N]),l.useEffect(()=>{let I=!0;if(!o){Rt(!1),ht(new Map);return}return(async()=>{const _t=j?await j(w):!1;I&&Rt(_t)})(),()=>{I=!1}},[o,w,j]);const lt=l.useMemo(()=>e.filter(I=>!I.deleted),[e]);l.useEffect(()=>{let I=!0;if(!o||!C){ht(new Map);return}return(async()=>{const _t=new Map;await Promise.all(lt.map(async vr=>{const pa=await C(vr.id);I&&_t.set(vr.id,pa)})),I&&ht(_t)})(),()=>{I=!1}},[o,lt,C]);const gt=l.useMemo(()=>lt[0],[lt]),Mt=l.useRef(null),wt=l.useRef(void 0),pt=l.useCallback(()=>{var I;(I=wt.current)==null||I.call(wt),L(Ar)},[]),Xt=l.useCallback(()=>{const I=!P;M(I),Y(!I),g==null||g(w,I)},[P,g,w]);l.useEffect(()=>{O(!1)},[o]),l.useEffect(()=>{if(o&&!P&&!B){const I=setTimeout(()=>{M(!0),g==null||g(w,!0)},z*1e3);return X.current=I,()=>clearTimeout(I)}X.current&&(clearTimeout(X.current),X.current=void 0)},[o,P,B,z,w,g]);const S=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),q=l.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const I=Ze(i,r);return y.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:I})},[i,r]),J=l.useMemo(()=>lt.slice(1),[lt]),Z=l.useMemo(()=>J.length??0,[J.length]),ct=l.useMemo(()=>Z>0,[Z]),Wt=l.useMemo(()=>V||Z<=2?J:J.slice(-2),[J,Z,V]),xt=l.useMemo(()=>V||Z<=2?0:Z-2,[Z,V]),Ue=l.useMemo(()=>Z===1?S.singleReply:y.formatReplacementString(S.multipleReplies,{count:Z}),[Z,S]),le=l.useMemo(()=>xt===1?S.singleReply:y.formatReplacementString(S.multipleReplies,{count:xt}),[xt,S]);l.useEffect(()=>{!o&&A&&ct&&K(!1)},[o,A,ct]);const xr=l.useCallback(async I=>{I&&I.stopPropagation();const $t=Dt(R)?en(R):void 0;if(E!==void 0){await f({threadId:w,contents:$t,assignedUser:E})&&(T(void 0),$t&&pt());return}$t&&await f({threadId:w,contents:$t})&&pt()},[pt,R,f,E,w]),br=l.useCallback(async I=>{const $t=Dt(R)?en(R):void 0,_t=await f({...I,contents:$t,assignedUser:E??I.assignedUser});return _t&&$t&&pt(),_t&&E!==void 0&&T(void 0),_t},[pt,R,f,E]);return n.jsx(Yn,{role:"option","aria-selected":o,id:w,className:m("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&P,"tw-bg-background":o&&p!=="Resolved"&&P,"tw-bg-muted":p==="Resolved","tw-bg-blue-50":!P&&!o&&p!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(Xn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[q&&n.jsx(ue,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:q}),n.jsx(G,{variant:"ghost",size:"icon",onClick:I=>{I.stopPropagation(),Xt()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":P?"Mark as unread":"Mark as read",children:P?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),Tt&&p!=="Resolved"&&n.jsx(G,{variant:"ghost",size:"icon",className:m("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:I=>{I.stopPropagation(),br({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:Mt,className:m("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":F},{"tw-whitespace-nowrap":!F}),children:[s&&$?n.jsx(G,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:I=>{I.stopPropagation(),$(d)},children:s}):s,n.jsxs("span",{className:t,children:[gt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:gt.selectedText}),gt.contextAfter]})]})}),n.jsx(Or,{comment:gt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:br,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:K,canEditOrDelete:(!A&&nt.get(gt.id))??!1,canUserResolveThread:Tt})]}),n.jsxs(n.Fragment,{children:[ct&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(me,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ue})]}),!o&&Dt(R)&&n.jsx(tn,{editorSerializedState:R,onSerializedChange:I=>L(I),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[xt>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:I=>{I.stopPropagation(),O(!0)},role:"button",tabIndex:0,onKeyDown:I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),I.stopPropagation(),O(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(me,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:le}),V?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),Wt.map(I=>n.jsx("div",{children:n.jsx(Or,{comment:I,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:K,canEditOrDelete:(!A&&nt.get(I.id))??!1})},I.id)),b!==!1&&(!A||Dt(R))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:I=>I.stopPropagation(),onKeyDownCapture:I=>{Un(I)&&(I.preventDefault(),I.stopPropagation(),(Dt(R)||E!==void 0)&&xr())},onKeyDown:I=>{Hn(I),(I.key==="Enter"||I.key===" ")&&I.stopPropagation()},children:[n.jsx(tn,{editorSerializedState:R,onSerializedChange:I=>L(I),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:I=>{wt.current=I}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[E!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:y.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Ze(E,r)})}),n.jsxs(Ut,{open:D,onOpenChange:H,children:[n.jsx(Zt,{asChild:!0,children:n.jsx(G,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!yt||!v||v.length===0||!v.includes(a),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(Pt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:I=>{I.key==="Escape"&&(I.stopPropagation(),H(!1))},children:n.jsx(qt,{children:n.jsx(Ht,{children:v==null?void 0:v.map(I=>n.jsx(At,{onSelect:()=>{T(I!==i?I:void 0),H(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Ze(I,r)})},I||"unassigned"))})})})]}),n.jsx(G,{size:"icon",onClick:xr,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(R)&&E===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function hl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:v,onVerseRefClick:b}){const[j,N]=l.useState(new Set),[C,_]=l.useState();l.useEffect(()=>{g&&(N(O=>new Set(O).add(g)),_(g))},[g]);const z=r.filter(O=>O.comments.some(A=>!A.deleted)),$=z.map(O=>({id:O.id})),R=l.useCallback(O=>{N(A=>new Set(A).add(O.id)),_(O.id),v==null||v(O.id)},[v]),L=l.useCallback(O=>{const A=j.has(O);N(K=>{const D=new Set(K);return D.has(O)?D.delete(O):D.add(O),D}),_(O),v==null||v(A?void 0:O)},[j,v]),{listboxRef:E,activeId:T,handleKeyDown:F}=Oo({options:$,onOptionSelect:R}),V=l.useCallback(O=>{O.key==="Escape"?(C&&j.has(C)&&(N(A=>{const K=new Set(A);return K.delete(C),K}),_(void 0),v==null||v(void 0)),O.preventDefault(),O.stopPropagation()):F(O)},[C,j,F,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:E,"aria-activedescendant":T??void 0,"aria-label":"Comments",className:m("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:V,children:z.map(O=>n.jsx("div",{id:O.id,className:m({"tw-opacity-60":O.status==="Resolved"}),children:n.jsx(fl,{classNameForVerseText:e,comments:O.comments,localizedStrings:s,verseRef:O.verseRef,handleSelectThread:L,threadId:O.id,thread:O,isRead:O.isRead,isSelected:j.has(O.id),currentUser:o,assignedUser:O.assignedUser,threadStatus:O.status,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:b})},O.id))})}function gl({table:t}){return n.jsxs(Jt,{children:[n.jsx(Gr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(G,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Kt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Me,{children:"Toggle columns"}),n.jsx(xe,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Gt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const fe=rt.Root,qo=rt.Group,he=rt.Value,Ho=ie.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),se=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const i=dt();return n.jsxs(rt.Trigger,{className:m(Ho({size:r,className:t})),ref:s,...o,dir:i,children:[e,n.jsx(rt.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});se.displayName=rt.Trigger.displayName;const rr=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.ScrollUpButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));rr.displayName=rt.ScrollUpButton.displayName;const or=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.ScrollDownButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));or.displayName=rt.ScrollDownButton.displayName;const ae=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const i=dt();return n.jsx(rt.Portal,{children:n.jsxs(rt.Content,{ref:s,className:m("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(rr,{}),n.jsx(rt.Viewport,{className:m("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(or,{})]})})});ae.displayName=rt.Content.displayName;const Uo=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.Label,{ref:r,className:m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));Uo.displayName=rt.Label.displayName;const jt=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(rt.Item,{ref:o,className:m("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(rt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(rt.ItemText,{children:e})]}));jt.displayName=rt.Item.displayName;const Yo=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Yo.displayName=rt.Separator.displayName;function xl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(fe,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(se,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(he,{placeholder:t.getState().pagination.pageSize})}),n.jsx(ae,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(jt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(G,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Pr=`
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
`;function bl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function ze(t,e){const r=e?`${Pr}, ${e}`:Pr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&bl(o))}const Ge=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const a=s.current;if(!a)return;const c=()=>{requestAnimationFrame(()=>{ze(a,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const i=a=>{const{current:c}=s;if(c){if(a.key==="ArrowDown"){a.preventDefault(),ze(c)[0].focus();return}a.key===" "&&document.activeElement===c&&a.preventDefault()}};return n.jsx("div",{className:m("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:m("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Ge.displayName="Table";const Be=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:m({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Be.displayName="TableHeader";const Ke=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:m("[&_tr:last-child]:tw-border-0",t),...e}));Ke.displayName="TableBody";const Xo=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Xo.displayName="TableFooter";function vl(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?ze(t.current):[],i=s.indexOf(document.activeElement),a=o.key==="ArrowRight"?i+1:i-1;a>=0&&a<s.length&&s[a].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function yl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function jl(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const zt=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const a=l.useRef(null);l.useEffect(()=>{typeof i=="function"?i(a.current):i&&"current"in i&&(i.current=a.current)},[i]),vl(a);const c=l.useMemo(()=>a.current?ze(a.current):[],[a]),w=l.useCallback(p=>{const{current:f}=a;if(!f||!f.parentElement)return;const h=f.closest("table"),u=h?ze(h).filter(b=>b.tagName==="TR"):[],g=u.indexOf(f),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),jl(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),yl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const b=f.closest("table");b&&b.focus()}e==null||e(p)},[a,c,e]),d=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:a,tabIndex:-1,onKeyDown:w,onFocus:d,className:m("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});zt.displayName="TableRow";const Ce=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:m("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Ce.displayName="TableHead";const ne=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));ne.displayName="TableCell";const Wo=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:m("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Wo.displayName="TableCaption";function nn({className:t,...e}){return n.jsx("div",{className:m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Jo({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:a=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var $;const[p,f]=l.useState([]),[h,u]=l.useState([]),[g,v]=l.useState({}),[b,j]=l.useState({}),N=l.useMemo(()=>e??[],[e]),C=ft.useReactTable({data:N,columns:t,getCoreRowModel:ft.getCoreRowModel(),...r&&{getPaginationRowModel:ft.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:ft.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:ft.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:j,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:b}}),_=C.getVisibleFlatColumns();let z;return w?z=Array.from({length:10}).map((E,T)=>`skeleton-row-${T}`).map(E=>n.jsx(zt,{className:"hover:tw-bg-transparent",children:n.jsx(ne,{colSpan:_.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(nn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},E)):(($=C.getRowModel().rows)==null?void 0:$.length)>0?z=C.getRowModel().rows.map(R=>n.jsx(zt,{onClick:()=>a(R,C),"data-state":R.getIsSelected()&&"selected",children:R.getVisibleCells().map(L=>n.jsx(ne,{children:ft.flexRender(L.column.columnDef.cell,L.getContext())},L.id))},R.id)):z=n.jsx(zt,{children:n.jsx(ne,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(gl,{table:C}),n.jsxs(Ge,{stickyHeader:i,children:[n.jsx(Be,{stickyHeader:i,children:C.getHeaderGroups().map(R=>n.jsx(zt,{children:R.headers.map(L=>n.jsx(Ce,{className:"tw-p-0",children:L.isPlaceholder?void 0:ft.flexRender(L.column.columnDef.header,L.getContext())},L.id))},R.id))}),n.jsx(Ke,{children:z})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(G,{variant:"outline",size:"sm",onClick:()=>C.previousPage(),disabled:!C.getCanPreviousPage(),children:"Previous"}),n.jsx(G,{variant:"outline",size:"sm",onClick:()=>C.nextPage(),disabled:!C.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(xl,{table:C})]})}function Nl({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:m("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Ea,{options:i,children:e})})}const Zo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Lr=(t,e)=>t[e]??e;function Qo({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Lr(r,"%webView_error_dump_header%"),i=Lr(r,"%webView_error_dump_info_message%");function a(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(G,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>a(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const kl=Object.freeze([...Zo,"%webView_error_dump_copied_message%"]);function _l({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[a,c]=l.useState(!1),w=()=>{c(!0),e&&e()},d=p=>{p||c(!1)};return n.jsxs(Ut,{onOpenChange:d,children:[n.jsx(Zt,{asChild:!0,children:o}),n.jsxs(Pt,{id:i,className:m("tw-min-w-80 tw-max-w-96",s),children:[a&&r["%webView_error_dump_copied_message%"]&&n.jsx(st,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Qo,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var ts=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(ts||{});function Cl({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[i,a]=l.useState({}),c=(d,p)=>{const f=!o[d][p];s(u=>(u[d][p]=f,{...u}));const h=r[d].items[p];h.onUpdate(h.id,f)},w=(d,p)=>{a(h=>(h[d]=p,{...h}));const f=r[d].items.find(h=>h.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Jt,{children:[n.jsx(oe,{asChild:!0,children:n.jsxs(G,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Kt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Me,{children:d.label}),n.jsx(Qn,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((f,h)=>n.jsx("div",{children:n.jsx(Gt,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:f.label})},f.id))}):n.jsx(Bo,{value:i[p],onValueChange:f=>w(p,f),children:d.items.map(f=>n.jsx("div",{children:n.jsx(nr,{value:f.id,children:f.label})},f.id))})}),n.jsx(xe,{})]},d.label))})]})})}function El({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:a,handleSupportLinkClick:c}){const w=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,f)=>p+f,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||a)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Sl({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function i(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,f=d.getUTCMonth(),h=d.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const a=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?a:a.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),a.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Rl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const a=l.useMemo(()=>y.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(y.getCurrentLocale(),{type:"language"});return d.map(f=>p.of(f))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Sl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:a})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function es({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:a="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:v="ghost",id:b}){const[j,N]=l.useState(!1),C=l.useCallback(T=>{var V;const F=(V=t.find(O=>O.label===T))==null?void 0:V.value;F&&r(e.includes(F)?e.filter(O=>O!==F):[...e,F])},[t,e,r]),_=()=>w||o,z=l.useMemo(()=>{if(!h)return t;const T=t.filter(V=>V.starred).sort((V,O)=>V.label.localeCompare(O.label)),F=t.filter(V=>!V.starred).sort((V,O)=>{const A=e.includes(V.value),K=e.includes(O.value);return A&&!K?-1:!A&&K?1:V.label.localeCompare(O.label)});return[...T,...F]},[t,e,h]),$=()=>{r(t.map(T=>T.value))},R=()=>{r([])},L=d??j,E=p??N;return n.jsx("div",{id:b,className:g,children:n.jsxs(Ut,{open:L,onOpenChange:E,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(G,{variant:v,role:"combobox","aria-expanded":L,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:_()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(qt,{children:[n.jsx(ge,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:$,children:i}),n.jsx(G,{variant:"ghost",size:"sm",onClick:R,children:a})]}),n.jsxs(Ht,{children:[n.jsx(Te,{children:c}),n.jsx(Bt,{children:z.map(T=>n.jsxs(At,{value:T.label,onSelect:C,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:m("tw-h-4 tw-w-4",e.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function Tl({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:f}){return n.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(es,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var u;return n.jsxs(ue,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(G,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(g=>g.value===h))==null?void 0:u.label]},h)})}):n.jsx(st,{children:p})]})}function ns({children:t,editorRef:e}){const r=l.useRef(null);return l.useEffect(()=>{var a;const o=/Macintosh/i.test(navigator.userAgent),s=((a=r.current)==null?void 0:a.querySelector(".editor-input"))??void 0,i=c=>{var w,d;s&&document.activeElement===s&&(o?c.metaKey:c.ctrlKey)&&(c.shiftKey&&c.key.toLowerCase()==="z"||c.key.toLowerCase()==="y"?(c.preventDefault(),(w=e.current)==null||w.redo()):c.key.toLowerCase()==="z"&&(c.preventDefault(),(d=e.current)==null||d.undo()))};return s==null||s.addEventListener("keydown",i),()=>{s==null||s.removeEventListener("keydown",i)}},[e]),n.jsx("div",{ref:r,children:t})}const be=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:m("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));be.displayName="Input";const Ml=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Dl({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=l.useRef(null),a=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(t),[p,f]=l.useState(r),[h,u]=l.useState(!1);l.useEffect(()=>{d(t)},[t]),l.useEffect(()=>{p!==r&&f(r)},[r]);const g=b=>{c.current=!1,u(b),b||(w!=="custom"||p?(e(w),o(p)):(d(t),f(r)))},v=b=>{var j,N,C,_;b.stopPropagation(),document.activeElement===a.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((j=i.current)==null||j.focus(),c.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((N=a.current)==null||N.focus(),c.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((C=i.current)==null?void 0:C.selectionStart)===0&&((_=a.current)==null||_.focus(),c.current=!1),w==="custom"&&b.key==="Enter"&&(document.activeElement===a.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(Jt,{open:h,onOpenChange:g,children:[n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:n.jsx(oe,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:Ml(t,s,r)})})}),n.jsx(kt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Kt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;c.current&&((b=i.current)==null||b.focus())},children:[n.jsx(Me,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(xe,{}),n.jsx(Gt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Ct.GENERATOR_NOTE_CALLER})]})}),n.jsx(Gt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Ct.HIDDEN_NOTE_CALLER})]})}),n.jsx(Gt,{ref:a,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:b=>{var j;b.stopPropagation(),c.current=!0,(j=i.current)==null||j.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(be,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),d("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>f(b.target.value)})]})})]})]})}const Il=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Ol=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),y.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Al({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Jt,{children:[n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsx(Vr.TooltipTrigger,{asChild:!0,children:n.jsx(oe,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:Il(t,r)})})}),n.jsx(kt,{children:n.jsx("p",{children:Ol(t,r)})})]})}),n.jsxs(Kt,{className:"tw-z-[300]",children:[n.jsx(Me,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(xe,{}),n.jsxs(Gt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const rs=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Pl({icon:t,className:e}){const r=t??k.Ban;return n.jsx(r,{className:e,size:16})}function os({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),i=l.useMemo(()=>{const a=o.trim().toLowerCase();return a?e.filter(c=>{var w;return c.marker&&((w=c.marker)==null?void 0:w.toLowerCase().includes(a))||!c.marker&&c.title.toLowerCase().includes(a)}):e},[o,e]);return n.jsxs(qt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(ge,{className:"marker-menu-search",ref:r,value:o,onValueChange:a=>s(a),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Ht,{children:[n.jsx(Te,{children:t["%markerMenu_noResults%"]}),n.jsx(Bt,{children:i.map(a=>{var c;return n.jsxs(At,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:n.jsx(Pl,{icon:a.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(Zr,{className:"tw-font-sans",children:a.isDisallowed?t["%markerMenu_disallowed_label%"]:t["%markerMenu_deprecated_label%"]})]},`item-${a.marker??((c=a.icon)==null?void 0:c.displayName)}-${a.title.replaceAll(" ","")}`)})})]})]})}function Ll(t,e,r,o){if(!o||o==="p")return[];const s=y.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,a])=>{i.push(...a.map(c=>({marker:c,title:r[y.usfmMarkers[c].description]??y.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),i.sort((a,c)=>(a.marker??a.title).localeCompare(c.marker??c.title))}function $l(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Fl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Vl={type:"USJ",version:"3.1",content:[{type:"para"}]};function zl({classNameForEditor:t,noteOps:e,onSave:r,onClose:o,scrRef:s,noteKey:i,editorOptions:a,defaultMarkerMenuTrigger:c,localizedStrings:w}){const d=l.useRef(null),p=l.useRef(null),f=l.useRef(null),[h,u]=l.useState("generated"),[g,v]=l.useState("*"),[b,j]=l.useState("f"),[N,C]=l.useState(!1),[_,z]=l.useState(!1),[$,R]=l.useState(),[L,E]=l.useState(),[T,F]=l.useState(),[V,O]=l.useState(),A=l.useRef(null),K=l.useMemo(()=>({...a,markerMenuTrigger:c,hasExternalUI:!0,view:{...a.view??Ct.getDefaultViewOptions(),noteMode:"expanded"}}),[a,c]),D=l.useMemo(()=>Ll(d,()=>z(!1),w,V),[w,V]);l.useEffect(()=>{var P;_||(P=d.current)==null||P.focus()},[b,_]),l.useEffect(()=>{var B,Y;let P;const M=e==null?void 0:e.at(0);if(M&&Ct.isInsertEmbedOpOfType("note",M)){const X=(B=M.insert.note)==null?void 0:B.caller;let nt="custom";X===Ct.GENERATOR_NOTE_CALLER?nt="generated":X===Ct.HIDDEN_NOTE_CALLER?nt="hidden":X&&v(X),u(nt),j(((Y=M.insert.note)==null?void 0:Y.style)??"f"),P=setTimeout(()=>{var ht;(ht=d.current)==null||ht.applyUpdate([M])},0)}return()=>{P&&clearTimeout(P)}},[e,i]);const H=l.useCallback(()=>{var M,B;const P=(B=(M=d.current)==null?void 0:M.getNoteOps(0))==null?void 0:B.at(0);P&&Ct.isInsertEmbedOpOfType("note",P)&&(P.insert.note&&(h==="custom"?P.insert.note.caller=g:P.insert.note.caller=h==="generated"?Ct.GENERATOR_NOTE_CALLER:Ct.HIDDEN_NOTE_CALLER),r([P]))},[h,g,r]),yt=()=>{var M;const P=(M=p.current)==null?void 0:M.getElementsByClassName("editor-input")[0];P!=null&&P.textContent&&navigator.clipboard.writeText(P.textContent)},Rt=P=>{var B,Y,X,nt,ht;j(P);const M=(Y=(B=d.current)==null?void 0:B.getNoteOps(0))==null?void 0:Y.at(0);if(M&&Ct.isInsertEmbedOpOfType("note",M)){M.insert.note&&(M.insert.note.style=P);const lt=(nt=(X=M.insert.note)==null?void 0:X.contents)==null?void 0:nt.ops;b!=="x"&&P==="x"?lt==null||lt.forEach(gt=>$l(gt)):b==="x"&&P!=="x"&&(lt==null||lt.forEach(gt=>Fl(gt))),(ht=d.current)==null||ht.applyUpdate([M,{delete:1}])}},Tt=P=>{var B,Y,X,nt,ht,lt;(B=d.current)==null||B.focus();const M=(X=(Y=d.current)==null?void 0:Y.getNoteOps(0))==null?void 0:X.at(0);if(M&&Ct.isInsertEmbedOpOfType("note",M)){P.content.length>1&&setTimeout(()=>{var wt;(wt=d.current)==null||wt.applyUpdate([{retain:2},{delete:1}])},0);const gt=(nt=M.insert.note)==null?void 0:nt.style,Mt=(lt=(ht=M.insert.note)==null?void 0:ht.contents)==null?void 0:lt.ops;gt||C(!1),C(gt==="x"?!!(Mt!=null&&Mt.every(wt=>{var Xt,S;if(!((Xt=wt.attributes)!=null&&Xt.char))return!0;const pt=((S=wt.attributes)==null?void 0:S.char).style;return pt==="xt"||pt==="xo"||pt==="xq"})):!!(Mt!=null&&Mt.every(wt=>{var Xt,S;if(!((Xt=wt.attributes)!=null&&Xt.char))return!0;const pt=((S=wt.attributes)==null?void 0:S.char).style;return pt==="ft"||pt==="fr"||pt==="fq"})))}else C(!1)},it=l.useCallback(()=>{const P=window.getSelection();if(f.current&&D.length&&P&&P.rangeCount>0){const M=P.getRangeAt(0).getBoundingClientRect(),B=f.current.getBoundingClientRect();R(M.left-B.left),E(M.top-B.top),F(M.height),z(!0)}},[D,f]);return l.useEffect(()=>{const P=()=>{_&&z(!1)};return window.addEventListener("click",P),()=>{window.removeEventListener("click",P)}},[_]),l.useEffect(()=>{var P;_&&((P=A.current)==null||P.focus())},[_]),l.useEffect(()=>{var B;const P=((B=p.current)==null?void 0:B.querySelector(".editor-input"))??void 0,M=Y=>{!_&&P&&document.activeElement===P&&Y.key===c?(Y.preventDefault(),it()):_&&Y.key==="Escape"&&(Y.preventDefault(),z(!1))};return document.addEventListener("keydown",M),()=>{document.removeEventListener("keydown",M)}},[_,it,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Al,{isTypeSwitchable:N,noteType:b,handleNoteTypeChange:Rt,localizedStrings:w}),n.jsx(Dl,{callerType:h,updateCallerType:u,customCaller:g,updateCustomCaller:v,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:n.jsx(G,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(kt,{children:n.jsx("p",{children:w["%footnoteEditor_cancelButton_tooltip%"]})})]})}),n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:n.jsx(G,{onClick:H,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:n.jsx(k.Check,{})})}),n.jsx(kt,{children:w["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),n.jsxs("div",{ref:p,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(ns,{editorRef:d,children:n.jsx(Ct.Editorial,{options:K,onStateChange:P=>O(P.contextMarker),onUsjChange:Tt,defaultUsj:Vl,onScrRefChange:()=>{},scrRef:s,ref:d})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:n.jsx(G,{onClick:yt,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(kt,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:f,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Ut,{open:_,children:[n.jsx(no,{className:"tw-absolute",style:{top:L,left:$,height:T,width:0,pointerEvents:"none"}}),n.jsx(Pt,{className:"tw-w-[500px] tw-p-0",onClick:P=>{P.preventDefault(),P.stopPropagation()},children:n.jsx(os,{markerMenuItems:D,localizedStrings:w,searchRef:A})})]})]})}const Gl=Object.freeze([...rs,...Object.entries(y.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function ss(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Bl(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let a=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(a.length>0&&i.push(a),a=[c]):a.push(c)}),a.length>0&&i.push(a),i.map((c,w)=>{const d=w===i.length-1;return n.jsxs("p",{children:[sr(t,c,r,!0,s),d&&o]},ss(t,c))})}function sr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const a=`${t}-text-${i.slice(0,10)}`;if(o){const c=m(`usfm_${t}`);return n.jsx("span",{className:c,children:i},a)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},a)}return Kl(i,ss(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function Kl(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),sr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function as({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let a,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([a,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:m("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),f=a&&n.jsxs(n.Fragment,{children:[sr(t.marker,[a],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=m(h,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[w,p]}),n.jsx("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:f}),n.jsx("div",{className:m("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Bl(t.marker,c,o,d)})})]})}function ql({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:a=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??y.getFormatCallerFunction(r,void 0),f=(N,C)=>{d==null||d(N,C,s)},h=i?r.findIndex(N=>N===i):-1,[u,g]=l.useState(h),v=(N,C,_)=>{if(r.length)switch(N.key){case"Enter":case" ":N.preventDefault(),d==null||d(C,_,s);break}},b=N=>{if(r.length)switch(N.key){case"ArrowDown":N.preventDefault(),g(C=>Math.min(C+1,r.length-1));break;case"ArrowUp":N.preventDefault(),g(C=>Math.max(C-1,0));break}},j=l.useRef([]);return l.useEffect(()=>{var N;u>=0&&u<j.current.length&&((N=j.current[u])==null||N.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:m("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:m("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((N,C)=>{const _=N===i,z=`${s}-${C}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:$=>{j.current[C]=$},role:"option","aria-selected":_,"data-marker":N.marker,"data-state":_?"selected":void 0,tabIndex:C===u?0:-1,className:m("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>f(N,C),onKeyDown:$=>v($,N,C),children:n.jsx(as,{footnote:N,layout:o,formatCaller:()=>p(N.caller,C),showMarkers:a})},z),C<r.length-1&&o==="vertical"&&n.jsx(me,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Hl(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Ul({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],a=l.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[t]);return n.jsxs(Ge,{stickyHeader:!0,children:[n.jsx(Be,{stickyHeader:!0,children:n.jsxs(zt,{children:[n.jsx(Ce,{children:s}),n.jsx(Ce,{children:i})]})}),n.jsx(Ke,{children:a.length>0&&a.map(c=>n.jsxs(zt,{onClick:()=>{e(c.reference)},children:[n.jsx(ne,{children:y.formatScrRef(c.reference,"English")}),n.jsx(ne,{className:o,children:Hl(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const mn=l.forwardRef(({className:t,...e},r)=>n.jsx(Tn.Root,{ref:r,className:m("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Tn.Indicator,{className:m("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));mn.displayName=Tn.Root.displayName;const Yl=t=>{if(t==="asc")return n.jsx(k.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(k.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},qe=(t,e,r)=>n.jsx(Nt,{children:n.jsxs(Et,{children:[n.jsxs(St,{className:m("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),Yl(t.getIsSorted())]}),n.jsx(kt,{side:"bottom",children:e})]})}),Xl=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>qe(e,t)}),Wl=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>qe(r,t)}),Jl=t=>({accessorKey:"count",header:({column:e})=>qe(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),_n=(t,e,r,o,s,i)=>{let a=[...r];t.forEach(w=>{e==="approved"?a.includes(w)||a.push(w):a=a.filter(d=>d!==w)}),o(a);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),i(c)},Zl=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>qe(i,t,"tw-justify-center"),cell:({row:i})=>{const a=i.getValue("status"),c=i.getValue("item");return n.jsxs(un,{value:a,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Ne,{onClick:w=>{w.stopPropagation(),_n([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(Ne,{onClick:w=>{w.stopPropagation(),_n([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(k.CircleXIcon,{})}),n.jsx(Ne,{onClick:w=>{w.stopPropagation(),_n([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(k.CircleHelpIcon,{})})]})}}),Ql=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),tc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},ec=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},is=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",nc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),rc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},oc=(t,e,r)=>t.map(o=>{const s=y.isString(o.key)?o.key:o.key[0];return{items:y.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||is(s,e,r),occurrences:o.occurrences||[]}}),Ft=(t,e)=>t[e]??e;function sc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:a,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:f,onItemSelected:h}){const u=Ft(r,"%webView_inventory_all%"),g=Ft(r,"%webView_inventory_approved%"),v=Ft(r,"%webView_inventory_unapproved%"),b=Ft(r,"%webView_inventory_unknown%"),j=Ft(r,"%webView_inventory_scope_currentBook%"),N=Ft(r,"%webView_inventory_scope_chapter%"),C=Ft(r,"%webView_inventory_scope_verse%"),_=Ft(r,"%webView_inventory_filter_text%"),z=Ft(r,"%webView_inventory_show_additional_items%"),$=Ft(r,"%webView_inventory_no_results%"),[R,L]=l.useState(!1),[E,T]=l.useState("all"),[F,V]=l.useState(""),[O,A]=l.useState([]),K=l.useMemo(()=>{const M=t??[];return M.length===0?[]:oc(M,s,i)},[t,s,i]),D=l.useMemo(()=>{if(R)return K;const M=[];return K.forEach(B=>{const Y=B.items[0],X=M.find(nt=>nt.items[0]===Y);X?(X.count+=B.count,X.occurrences=X.occurrences.concat(B.occurrences)):M.push({items:[Y],count:B.count,occurrences:B.occurrences,status:B.status})}),M},[R,K]),H=l.useMemo(()=>D.length===0?[]:rc(D,E,F),[D,E,F]),yt=l.useMemo(()=>{var Y,X;if(!R)return w;const M=(Y=o==null?void 0:o.tableHeaders)==null?void 0:Y.length;if(!M)return w;const B=[];for(let nt=0;nt<M;nt++)B.push(Wl(((X=o==null?void 0:o.tableHeaders)==null?void 0:X[nt])||"Additional Item",nt+1));return[...B,...w]},[o==null?void 0:o.tableHeaders,w,R]);l.useEffect(()=>{H.length===0?A([]):H.length===1&&A(H[0].items)},[H]);const Rt=(M,B)=>{B.setRowSelection(()=>{const X={};return X[M.index]=!0,X});const Y=M.original.items;A(Y),h&&Y.length>0&&h(Y[0])},Tt=M=>{if(M==="book"||M==="chapter"||M==="verse")c(M);else throw new Error(`Invalid scope value: ${M}`)},it=M=>{if(M==="all"||M==="approved"||M==="unapproved"||M==="unknown")T(M);else throw new Error(`Invalid status filter value: ${M}`)},P=l.useMemo(()=>{if(D.length===0||O.length===0)return[];const M=D.filter(B=>y.deepEqual(R?B.items:[B.items[0]],O));if(M.length>1)throw new Error("Selected item is not unique");return M.length===0?[]:M[0].occurrences},[O,R,D]);return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(fe,{onValueChange:M=>it(M),defaultValue:E,children:[n.jsx(se,{className:"tw-m-1",children:n.jsx(he,{placeholder:"Select filter"})}),n.jsxs(ae,{children:[n.jsx(jt,{value:"all",children:u}),n.jsx(jt,{value:"approved",children:g}),n.jsx(jt,{value:"unapproved",children:v}),n.jsx(jt,{value:"unknown",children:b})]})]}),n.jsxs(fe,{onValueChange:M=>Tt(M),defaultValue:a,children:[n.jsx(se,{className:"tw-m-1",children:n.jsx(he,{placeholder:"Select scope"})}),n.jsxs(ae,{children:[n.jsx(jt,{value:"book",children:j}),n.jsx(jt,{value:"chapter",children:N}),n.jsx(jt,{value:"verse",children:C})]})]}),n.jsx(be,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:F,onChange:M=>{V(M.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(mn,{className:"tw-m-1",checked:R,onCheckedChange:M=>{L(M)}}),n.jsx(st,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??z})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Jo,{columns:yt,data:H,onRowClickHandler:Rt,stickyHeader:!0,isLoading:p,noResultsMessage:$})}),P.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Ul,{classNameForText:f,occurrenceData:P,setScriptureReference:e,localizedStrings:r})})]})}const ac="16rem",ic="3rem",ls=l.createContext(void 0);function He(){const t=l.useContext(ls);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const ar=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:a="primary",...c},w)=>{const[d,p]=l.useState(t),f=e??d,h=l.useCallback(C=>{const _=typeof C=="function"?C(f):C;r?r(_):p(_)},[r,f]),u=l.useCallback(()=>h(C=>!C),[h]),g=f?"expanded":"collapsed",j=dt()==="ltr"?a:a==="primary"?"secondary":"primary",N=l.useMemo(()=>({state:g,open:f,setOpen:h,toggleSidebar:u,side:j}),[g,f,h,u,j]);return n.jsx(ls.Provider,{value:N,children:n.jsx(Nt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":ac,"--sidebar-width-icon":ic,...s},className:m("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:i})})})});ar.displayName="SidebarProvider";const ir=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},i)=>{const a=He();return e==="none"?n.jsx("div",{className:m("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":a.state,"data-collapsible":a.state==="collapsed"?e:"","data-variant":t,"data-side":a.side,children:[n.jsx("div",{className:m("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:m("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",a.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});ir.displayName="Sidebar";const cs=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=He();return n.jsxs(G,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:m("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});cs.displayName="SidebarTrigger";const ds=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=He();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:m("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});ds.displayName="SidebarRail";const lr=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:m("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));lr.displayName="SidebarInset";const ws=l.forwardRef(({className:t,...e},r)=>n.jsx(be,{ref:r,"data-sidebar":"input",className:m("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ws.displayName="SidebarInput";const ps=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ps.displayName="SidebarHeader";const us=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));us.displayName="SidebarFooter";const ms=l.forwardRef(({className:t,...e},r)=>n.jsx(me,{ref:r,"data-sidebar":"separator",className:m("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));ms.displayName="SidebarSeparator";const cr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:m("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));cr.displayName="SidebarContent";const rn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));rn.displayName="SidebarGroup";const on=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Ee.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:m("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});on.displayName="SidebarGroupLabel";const fs=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Ee.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:m("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});fs.displayName="SidebarGroupAction";const sn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:m("tw-w-full tw-text-sm",t),...e}));sn.displayName="SidebarGroupContent";const dr=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));dr.displayName="SidebarMenu";const wr=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:m("tw-group/menu-item tw-relative",t),...e}));wr.displayName="SidebarMenuItem";const lc=ie.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),pr=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,...a},c)=>{const w=t?Ee.Slot:"button",{state:d}=He(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:m(lc({variant:r,size:o}),i),...a});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:p}),n.jsx(kt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});pr.displayName="SidebarMenuButton";const hs=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const i=e?Ee.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:m("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});hs.displayName="SidebarMenuAction";const gs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:m("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));gs.displayName="SidebarMenuBadge";const xs=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(nn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(nn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});xs.displayName="SidebarMenuSkeleton";const bs=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:m("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));bs.displayName="SidebarMenuSub";const vs=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));vs.displayName="SidebarMenuSubItem";const ys=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},i)=>{const a=t?Ee.Slot:"a";return n.jsx(a,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:m("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});ys.displayName="SidebarMenuSubButton";function js({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:a,buttonPlaceholderText:c,className:w}){const d=l.useCallback((h,u)=>{o(h,u)},[o]),p=l.useCallback(h=>{const u=r.find(g=>g.projectId===h);return u?u.projectName:h},[r]),f=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(ir,{id:t,collapsible:"none",variant:"inset",className:m("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(cr,{children:[n.jsxs(rn,{children:[n.jsx(on,{className:"tw-text-sm",children:i}),n.jsx(sn,{children:n.jsx(dr,{children:Object.entries(e).map(([h,u])=>n.jsx(wr,{children:n.jsx(pr,{onClick:()=>d(h),isActive:f(h),children:n.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),n.jsxs(rn,{children:[n.jsx(on,{className:"tw-text-sm",children:a}),n.jsx(sn,{className:"tw-pl-3",children:n.jsx(Qe,{buttonVariant:"ghost",buttonClassName:m("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);d(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const fn=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:a},c)=>{const w=dt();return n.jsxs("div",{id:a,className:m("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:m("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(be,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:i}),t&&n.jsxs(G,{variant:"ghost",size:"icon",className:m("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});fn.displayName="SearchBar";function cc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:a,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(fn,{className:"tw-w-9/12",value:a,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(ar,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(js,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(lr,{className:"tw-min-w-[215px]",children:o})]})]})}const te="scrBook",dc="scrRef",we="source",wc="details",pc="Scripture Reference",uc="Scripture Book",Ns="Type",mc="Details";function fc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:te,header:(t==null?void 0:t.scriptureReferenceColumnName)??pc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?ot.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===te?y.formatScrRef(s.start):void 0},getGroupingValue:o=>ot.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>y.formatScrRef(o.start),id:dc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:y.formatScrRef(s.start)},sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:we,header:r?(t==null?void 0:t.typeColumnName)??Ns:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:wc,header:(t==null?void 0:t.detailsColumnName)??mc,cell:o=>o.getValue(),enableGrouping:!1}]}const hc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${e}`:`${y.scrRefToBBBCCCVVV(t.start)}+${e}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},$r=t=>`${hc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function gc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:a,onRowSelected:c,id:w}){const[d,p]=l.useState([]),[f,h]=l.useState([{id:te,desc:!1}]),[u,g]=l.useState({}),v=l.useMemo(()=>t.flatMap(E=>E.data.map(T=>({...T,source:E.source}))),[t]),b=l.useMemo(()=>fc({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:a},r),[o,i,a,r]);l.useEffect(()=>{d.includes(we)?h([{id:we,desc:!1},{id:te,desc:!1}]):h([{id:te,desc:!1}])},[d]);const j=ft.useReactTable({data:v,columns:b,state:{grouping:d,sorting:f,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:ft.getExpandedRowModel(),getGroupedRowModel:ft.getGroupedRowModel(),getCoreRowModel:ft.getCoreRowModel(),getSortedRowModel:ft.getSortedRowModel(),getRowId:$r,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const E=j.getSelectedRowModel().rowsById,T=Object.keys(E);if(T.length===1){const F=v.find(V=>$r(V)===T[0])||void 0;F&&c(F)}}},[u,v,c,j]);const N=s??uc,C=i??Ns,_=[{label:"No Grouping",value:[]},{label:`Group by ${N}`,value:[te]},{label:`Group by ${C}`,value:[we]},{label:`Group by ${N} and ${C}`,value:[te,we]},{label:`Group by ${C} and ${N}`,value:[we,te]}],z=E=>{p(JSON.parse(E))},$=(E,T)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(T)},R=(E,T)=>E.getIsGrouped()?"":m("banded-row",T%2===0?"even":"odd"),L=(E,T,F)=>{if(!((E==null?void 0:E.length)===0||T.depth<F.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(fe,{value:JSON.stringify(d),onValueChange:E=>{z(E)},children:[n.jsx(se,{className:"tw-mb-1 tw-mt-2",children:n.jsx(he,{})}),n.jsx(ae,{position:"item-aligned",children:n.jsx(qo,{children:_.map(E=>n.jsx(jt,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),n.jsxs(Ge,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Be,{children:j.getHeaderGroups().map(E=>n.jsx(zt,{children:E.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(Ce,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(G,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ft.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},E.id))}),n.jsx(Ke,{children:j.getRowModel().rows.map((E,T)=>{const F=dt();return n.jsx(zt,{"data-state":E.getIsSelected()?"selected":"",className:m(R(E,T)),onClick:V=>$(E,V),children:E.getVisibleCells().map(V=>{if(!(V.getIsPlaceholder()||V.column.columnDef.enableGrouping&&!V.getIsGrouped()&&(V.column.columnDef.id!==we||!r)))return n.jsx(ne,{className:m(V.column.columnDef.id,"tw-p-[1px]",L(d,E,V)),children:V.getIsGrouped()?n.jsxs(G,{variant:"link",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!E.getIsExpanded()&&(F==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",ft.flexRender(V.column.columnDef.cell,V.getContext())," (",E.subRows.length,")"]}):ft.flexRender(V.column.columnDef.cell,V.getContext())},V.id)})},E.id)})})]})]})}const ur=(t,e)=>t.filter(r=>{try{return y.getSectionForBook(r)===e}catch{return!1}}),ks=(t,e,r)=>ur(t,e).every(o=>r.includes(o));function xc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=ur(e,t).length===0,a=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(G,{variant:"outline",size:"sm",onClick:()=>o(t),className:m(ks(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Ga(t,a,c,w,d)})}const Fr=5,Cn=6;function bc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],a=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,j]=l.useState(!1),[N,C]=l.useState(""),_=l.useRef(void 0),z=l.useRef(!1);if(t.length!==ot.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const $=l.useMemo(()=>ot.Canon.allBookIds.filter((A,K)=>t[K]==="1"&&!ot.Canon.isObsolete(ot.Canon.bookIdToNumber(A))),[t]),R=l.useMemo(()=>{if(!N.trim()){const D={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return $.forEach(H=>{const yt=y.getSectionForBook(H);D[yt].push(H)}),D}const A=$.filter(D=>Fn(D,N,s)),K={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return A.forEach(D=>{const H=y.getSectionForBook(D);K[H].push(D)}),K},[$,N,s]),L=l.useCallback((A,K=!1)=>{if(!K||!_.current){r(e.includes(A)?e.filter(it=>it!==A):[...e,A]),_.current=A;return}const D=$.findIndex(it=>it===_.current),H=$.findIndex(it=>it===A);if(D===-1||H===-1)return;const[yt,Rt]=[Math.min(D,H),Math.max(D,H)],Tt=$.slice(yt,Rt+1).map(it=>it);r(e.includes(A)?e.filter(it=>!Tt.includes(it)):[...new Set([...e,...Tt])])},[e,r,$]),E=A=>{L(A,z.current),z.current=!1},T=(A,K)=>{A.preventDefault(),L(K,A.shiftKey)},F=l.useCallback(A=>{const K=ur($,A).map(D=>D);r(ks($,A,e)?e.filter(D=>!K.includes(D)):[...new Set([...e,...K])])},[e,r,$]),V=()=>{r($.map(A=>A))},O=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(y.Section).map(A=>n.jsx(xc,{section:A,availableBookIds:$,selectedBookIds:e,onToggle:F,localizedStrings:o},A))}),n.jsxs(Ut,{open:b,onOpenChange:A=>{j(A),A||C("")},children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(G,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:a,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(qt,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(z.current=A.shiftKey)},children:[n.jsx(ge,{placeholder:c,value:N,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:V,children:w}),n.jsx(G,{variant:"ghost",size:"sm",onClick:O,children:d})]}),n.jsxs(Ht,{children:[n.jsx(Te,{children:p}),Object.values(y.Section).map((A,K)=>{const D=R[A];if(D.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Bt,{heading:Qr(A,h,u,g,v),children:D.map(H=>n.jsx(eo,{bookId:H,isSelected:e.includes(H),onSelect:()=>E(H),onMouseDown:yt=>T(yt,H),section:y.getSectionForBook(H),showCheck:!0,localizedBookNames:s,commandValue:In(H,s),className:"tw-flex tw-items-center"},H))}),K<Object.values(y.Section).length-1&&n.jsx(Jr,{})]},A)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Cn?Cn:Fr).map(A=>n.jsx(ue,{className:"hover:tw-bg-secondary",variant:"secondary",children:je(A,s)},A)),e.length>Cn&&n.jsx(ue,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Fr} ${f}`})]})]})}const vc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),ce=(t,e)=>t[e]??e;function yc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:a,localizedBookNames:c,id:w}){const d=ce(a,"%webView_scope_selector_selected_text%"),p=ce(a,"%webView_scope_selector_current_verse%"),f=ce(a,"%webView_scope_selector_current_chapter%"),h=ce(a,"%webView_scope_selector_current_book%"),u=ce(a,"%webView_scope_selector_choose_books%"),g=ce(a,"%webView_scope_selector_scope%"),v=ce(a,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],j=e?b.filter(N=>e.includes(N.value)):b;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(st,{children:g}),n.jsx(dn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:N,label:C,id:_})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx($e,{className:"tw-me-2",value:N,id:_}),n.jsx(st,{htmlFor:_,children:C})]},_))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(st,{children:v}),n.jsx(bc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:a,localizedBookNames:c})]})]})}const En={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function jc({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:a}){const c={...En,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in En?En[d]:p]))},w=dt();return n.jsxs(fe,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(se,{size:s,className:m("pr-twp tw-w-auto",i),children:n.jsx(he,{placeholder:c[y.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(ae,{id:a,align:w==="rtl"?"end":"start",style:{zIndex:250},children:t.map(d=>n.jsx(jt,{value:`${d}`,children:c[y.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function Nc({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function kc({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function _c({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(me,{}):""]})}function _s(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function an({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:m("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Cs=(t,e,r,o)=>r?Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order).flatMap(([i])=>e.filter(c=>c.group===i).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:"command"in c?n.jsxs(Ve,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(an,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(an,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Go,{children:[n.jsx(tr,{children:c.label}),n.jsx(zo,{children:n.jsx(er,{children:Cs(t,e,_s(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(kt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function ln({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:a="ghost",id:c}){return n.jsxs(Jt,{variant:i,children:[n.jsx(oe,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(G,{variant:a,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Kt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(l.Fragment,{children:[n.jsx(Qn,{children:n.jsx(Nt,{children:Cs(e.groups,e.items,w,t)})}),d<p.length-1&&n.jsx(xe,{})]},w))})]})}const Es=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Cc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:a,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(Es,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(ln,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),a&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:a}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(ln,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function Ec({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Es,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(ln,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const mr=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(vt.Root,{orientation:"vertical",ref:r,className:m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});mr.displayName=vt.List.displayName;const fr=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.List,{ref:r,className:m("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));fr.displayName=vt.List.displayName;const Ss=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Trigger,{ref:r,...e,className:m("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),hr=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Content,{ref:r,className:m("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));hr.displayName=vt.Content.displayName;function Sc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:a}){return n.jsxs("div",{id:a,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(fn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(mr,{children:[n.jsx(fr,{children:t.map(c=>n.jsx(Ss,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(hr,{value:c.value,children:c.content},c.key))]})]})}function Rc({...t}){return n.jsx(tt.Menu,{...t})}function Tc({...t}){return n.jsx(tt.Sub,{"data-slot":"menubar-sub",...t})}const Rs=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(Zn.Provider,{value:s,children:n.jsx(tt.Root,{ref:o,className:m("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Rs.displayName=tt.Root.displayName;const Ts=l.forwardRef(({className:t,...e},r)=>{const o=Lt();return n.jsx(tt.Trigger,{ref:r,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Qt({variant:o.variant,className:t})),...e})});Ts.displayName=tt.Trigger.displayName;const Ms=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=Lt();return n.jsxs(tt.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Qt({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ms.displayName=tt.SubTrigger.displayName;const Ds=l.forwardRef(({className:t,...e},r)=>{const o=Lt();return n.jsx(tt.SubContent,{ref:r,className:m("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Ds.displayName=tt.SubContent.displayName;const Is=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const a=Lt();return n.jsx(tt.Portal,{children:n.jsx(tt.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:m("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":a.variant==="muted"},t),...s})})});Is.displayName=tt.Content.displayName;const Os=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=Lt();return n.jsx(tt.Item,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Qt({variant:s.variant,className:t}),t),...r})});Os.displayName=tt.Item.displayName;const Mc=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=Lt();return n.jsxs(tt.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Qt({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Mc.displayName=tt.CheckboxItem.displayName;const Dc=l.forwardRef(({className:t,children:e,...r},o)=>{const s=Lt();return n.jsxs(tt.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Qt({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Dc.displayName=tt.RadioItem.displayName;const Ic=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(tt.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ic.displayName=tt.Label.displayName;const As=l.forwardRef(({className:t,...e},r)=>n.jsx(tt.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));As.displayName=tt.Separator.displayName;const Ie=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Ps=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order);return s.flatMap(([i],a)=>{const c=e.filter(d=>d.group===i).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(Et,{children:[n.jsx(St,{asChild:!0,children:"command"in d?n.jsxs(Os,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(an,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(an,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(Tc,{children:[n.jsx(Ms,{children:d.label}),n.jsx(Ds,{children:Ps(t,e,_s(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(kt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&a<s.length-1&&w.push(n.jsx(As,{},`separator-${i}`)),w})};function Oc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),i=l.useRef(void 0),a=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=p=>{switch(p){case"platform.app":return i;case"platform.window":return a;case"platform.layout":return c;case"platform.help":return w;default:return}};if(Ma.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,v,b,j;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":Ie(i,[h]);break;case"alt+p":(g=i.current)==null||g.focus(),Ie(i,[h,u]);break;case"alt+l":(v=a.current)==null||v.focus(),Ie(a,[h,u]);break;case"alt+n":(b=c.current)==null||b.focus(),Ie(c,[h,u]);break;case"alt+h":(j=w.current)==null||j.focus(),Ie(w,[h,u]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Rs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>n.jsxs(Rc,{children:[n.jsx(Ts,{ref:d(p),children:typeof f=="object"&&"label"in f&&f.label}),n.jsx(Is,{className:"tw-z-[250]",children:n.jsx(Nt,{children:Ps(t.groups,t.items,p,e)})})]},p))})}function Ac(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Pc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:a,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:m("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[a,t&&n.jsx(Oc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Lc=(t,e)=>t[e]??e;function $c({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:a,className:c,id:w}){const d=Lc(a,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),i&&r.find(v=>v===g)&&i([...r.filter(v=>v!==g)]),f(!1)},u=(g,v)=>{var j,N,C,_,z,$;const b=v!==g?((N=(j=t[g])==null?void 0:j.uiNames)==null?void 0:N[v])??((_=(C=t[g])==null?void 0:C.uiNames)==null?void 0:_.en):void 0;return b?`${(z=t[g])==null?void 0:z.autonym} (${b})`:($=t[g])==null?void 0:$.autonym};return n.jsxs("div",{id:w,className:m("pr-twp tw-max-w-sm",c),children:[n.jsxs(fe,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>f(g),children:[n.jsx(se,{children:n.jsx(he,{})}),n.jsx(ae,{className:"tw-z-[250]",children:Object.keys(t).map(g=>n.jsx(jt,{value:g,children:u(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(st,{className:"tw-font-normal tw-text-muted-foreground",children:y.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,e)).join(", "):t.en.autonym})})})]})}function Fc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(st,{children:e(t)}):r?n.jsx(st,{children:r(t)}):n.jsx(st,{children:t})}function Vc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:a}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(mn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(Fc,{item:c,createLabel:i,createComplexLabel:a})]},c))})}function zc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:a,selectedButtons:c,hoverButtons:w,dropdownContent:d,additionalSelectedContent:p,accentColor:f}){const h=u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:h,role:"button",tabIndex:0,"aria-pressed":e,className:m("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:a}),e&&c,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(Jt,{children:[n.jsx(oe,{className:m(f&&"tw-me-1"),asChild:!0,children:n.jsx(G,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreVertical,{})})}),n.jsx(Kt,{align:"end",children:d})]})}),e&&d&&n.jsxs(Jt,{children:[n.jsx(oe,{className:m(f&&"tw-me-1"),asChild:!0,children:n.jsx(G,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreVertical,{})})}),n.jsx(Kt,{align:"end",children:d})]})]}),e&&p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),f&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${f}`})]},t)}const Ls=l.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:m("tw-animate-spin",t),...e,ref:r}));Ls.displayName="Spinner";function Gc({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:a,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:f,onFocus:h,onBlur:u}){return n.jsxs("div",{className:m("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(st,{htmlFor:t,className:m({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(be,{id:t,disabled:e,placeholder:a,required:c,className:m(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:f,onFocus:h,onBlur:u}),n.jsx("p",{className:m({"tw-hidden":!s}),children:s})]})}const Bc=ie.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),$s=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:m("pr-twp",Bc({variant:e}),t),...r}));$s.displayName="Alert";const Fs=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Fs.displayName="AlertTitle";const Vs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Vs.displayName="AlertDescription";const Kc=et.Root,qc=et.Trigger,Hc=et.Group,Uc=et.Portal,Yc=et.Sub,Xc=et.RadioGroup,zs=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(et.SubTrigger,{ref:s,className:m("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));zs.displayName=et.SubTrigger.displayName;const Gs=l.forwardRef(({className:t,...e},r)=>n.jsx(et.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Gs.displayName=et.SubContent.displayName;const Bs=l.forwardRef(({className:t,...e},r)=>n.jsx(et.Portal,{children:n.jsx(et.Content,{ref:r,className:m("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Bs.displayName=et.Content.displayName;const Ks=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Item,{ref:o,className:m("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));Ks.displayName=et.Item.displayName;const qs=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(et.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));qs.displayName=et.CheckboxItem.displayName;const Hs=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(et.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Hs.displayName=et.RadioItem.displayName;const Us=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));Us.displayName=et.Label.displayName;const Ys=l.forwardRef(({className:t,...e},r)=>n.jsx(et.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));Ys.displayName=et.Separator.displayName;function Xs({className:t,...e}){return n.jsx("span",{className:m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Xs.displayName="ContextMenuShortcut";const Ws=l.createContext({direction:"bottom"});function Js({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(Ws.Provider,{value:o,children:n.jsx(Ot.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}Js.displayName="Drawer";const Wc=Ot.Drawer.Trigger,Zs=Ot.Drawer.Portal,Jc=Ot.Drawer.Close,gr=l.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));gr.displayName=Ot.Drawer.Overlay.displayName;const Qs=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:i="bottom"}=l.useContext(Ws),a={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(Zs,{children:[n.jsx(gr,{}),n.jsxs(Ot.Drawer.Content,{ref:s,className:m("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",a[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:c[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:c[i]})]})]})});Qs.displayName="DrawerContent";function ta({className:t,...e}){return n.jsx("div",{className:m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ta.displayName="DrawerHeader";function ea({className:t,...e}){return n.jsx("div",{className:m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}ea.displayName="DrawerFooter";const na=l.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));na.displayName=Ot.Drawer.Title.displayName;const ra=l.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));ra.displayName=Ot.Drawer.Description.displayName;const oa=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Mn.Root,{ref:o,className:m("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Mn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));oa.displayName=Mn.Root.displayName;function Zc({className:t,...e}){return n.jsx(Ln.PanelGroup,{className:m("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Qc=Ln.Panel;function td({withHandle:t,className:e,...r}){return n.jsx(Ln.PanelResizeHandle,{className:m("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function ed({...t}){return n.jsx(Br.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const sa=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsxs(Oe.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Oe.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Oe.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Oe.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});sa.displayName=Oe.Root.displayName;const aa=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(Dn.Root,{className:m("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Dn.Thumb,{className:m("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});aa.displayName=Dn.Root.displayName;const nd=vt.Root,ia=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(vt.List,{ref:r,className:m("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ia.displayName=vt.List.displayName;const la=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Trigger,{ref:r,className:m("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));la.displayName=vt.Trigger.displayName;const ca=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Content,{ref:r,className:m("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));ca.displayName=vt.Content.displayName;const da=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:m("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));da.displayName="Textarea";const rd=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function od(t){return{preserveValue:!0,...t}}const wa=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=od(s.current);const[i,a]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const p=await t();d&&(a(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||a(()=>o.current)}},[t]),[i,c]},Sn=()=>!1,sd=(t,e)=>{const[r]=wa(l.useCallback(async()=>{if(!t)return Sn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Sn,{preserveValue:!1});l.useEffect(()=>()=>{r!==Sn&&r()},[r])};function ad(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Br.toast});exports.Alert=$s;exports.AlertDescription=Vs;exports.AlertTitle=Fs;exports.Avatar=Wn;exports.AvatarFallback=Jn;exports.AvatarImage=Vo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Ya;exports.BOOK_SELECTOR_STRING_KEYS=Ja;exports.Badge=ue;exports.BookChapterControl=Ua;exports.BookSelectionMode=so;exports.BookSelector=Za;exports.Button=G;exports.COMMENT_EDITOR_STRING_KEYS=wl;exports.COMMENT_LIST_STRING_KEYS=pl;exports.Card=Yn;exports.CardContent=Xn;exports.CardDescription=$o;exports.CardFooter=Fo;exports.CardHeader=Po;exports.CardTitle=Lo;exports.ChapterRangeSelector=oo;exports.Checkbox=mn;exports.Checklist=Vc;exports.ComboBox=Qe;exports.Command=qt;exports.CommandEmpty=Te;exports.CommandGroup=Bt;exports.CommandInput=ge;exports.CommandItem=At;exports.CommandList=Ht;exports.CommentEditor=dl;exports.CommentList=hl;exports.ContextMenu=Kc;exports.ContextMenuCheckboxItem=qs;exports.ContextMenuContent=Bs;exports.ContextMenuGroup=Hc;exports.ContextMenuItem=Ks;exports.ContextMenuLabel=Us;exports.ContextMenuPortal=Uc;exports.ContextMenuRadioGroup=Xc;exports.ContextMenuRadioItem=Hs;exports.ContextMenuSeparator=Ys;exports.ContextMenuShortcut=Xs;exports.ContextMenuSub=Yc;exports.ContextMenuSubContent=Gs;exports.ContextMenuSubTrigger=zs;exports.ContextMenuTrigger=qc;exports.DataTable=Jo;exports.Drawer=Js;exports.DrawerClose=Jc;exports.DrawerContent=Qs;exports.DrawerDescription=ra;exports.DrawerFooter=ea;exports.DrawerHeader=ta;exports.DrawerOverlay=gr;exports.DrawerPortal=Zs;exports.DrawerTitle=na;exports.DrawerTrigger=Wc;exports.DropdownMenu=Jt;exports.DropdownMenuCheckboxItem=Gt;exports.DropdownMenuContent=Kt;exports.DropdownMenuGroup=Qn;exports.DropdownMenuItem=Ve;exports.DropdownMenuItemType=ts;exports.DropdownMenuLabel=Me;exports.DropdownMenuPortal=zo;exports.DropdownMenuRadioGroup=Bo;exports.DropdownMenuRadioItem=nr;exports.DropdownMenuSeparator=xe;exports.DropdownMenuShortcut=Ko;exports.DropdownMenuSub=Go;exports.DropdownMenuSubContent=er;exports.DropdownMenuSubTrigger=tr;exports.DropdownMenuTrigger=oe;exports.ERROR_DUMP_STRING_KEYS=Zo;exports.ERROR_POPOVER_STRING_KEYS=kl;exports.EditorKeyboardShortcuts=ns;exports.ErrorDump=Qo;exports.ErrorPopover=_l;exports.FOOTNOTE_EDITOR_STRING_KEYS=Gl;exports.Filter=Tl;exports.FilterDropdown=Cl;exports.Footer=Rl;exports.FootnoteEditor=zl;exports.FootnoteItem=as;exports.FootnoteList=ql;exports.INVENTORY_STRING_KEYS=nc;exports.Input=be;exports.Inventory=sc;exports.Label=st;exports.MARKER_MENU_STRING_KEYS=rs;exports.MarkdownRenderer=Nl;exports.MarkerMenu=os;exports.MoreInfo=El;exports.MultiSelectComboBox=es;exports.NavigationContentSearch=Sc;exports.Popover=Ut;exports.PopoverAnchor=no;exports.PopoverContent=Pt;exports.PopoverTrigger=Zt;exports.Progress=oa;exports.RadioGroup=dn;exports.RadioGroupItem=$e;exports.RecentSearches=ro;exports.ResizableHandle=td;exports.ResizablePanel=Qc;exports.ResizablePanelGroup=Zc;exports.ResultsCard=zc;exports.SCOPE_SELECTOR_STRING_KEYS=vc;exports.ScopeSelector=yc;exports.ScriptureResultsViewer=gc;exports.ScrollGroupSelector=jc;exports.SearchBar=fn;exports.Select=fe;exports.SelectContent=ae;exports.SelectGroup=qo;exports.SelectItem=jt;exports.SelectLabel=Uo;exports.SelectScrollDownButton=or;exports.SelectScrollUpButton=rr;exports.SelectSeparator=Yo;exports.SelectTrigger=se;exports.SelectValue=he;exports.Separator=me;exports.SettingsList=Nc;exports.SettingsListHeader=_c;exports.SettingsListItem=kc;exports.SettingsSidebar=js;exports.SettingsSidebarContentSearch=cc;exports.Sidebar=ir;exports.SidebarContent=cr;exports.SidebarFooter=us;exports.SidebarGroup=rn;exports.SidebarGroupAction=fs;exports.SidebarGroupContent=sn;exports.SidebarGroupLabel=on;exports.SidebarHeader=ps;exports.SidebarInput=ws;exports.SidebarInset=lr;exports.SidebarMenu=dr;exports.SidebarMenuAction=hs;exports.SidebarMenuBadge=gs;exports.SidebarMenuButton=pr;exports.SidebarMenuItem=wr;exports.SidebarMenuSkeleton=xs;exports.SidebarMenuSub=bs;exports.SidebarMenuSubButton=ys;exports.SidebarMenuSubItem=vs;exports.SidebarProvider=ar;exports.SidebarRail=ds;exports.SidebarSeparator=ms;exports.SidebarTrigger=cs;exports.Skeleton=nn;exports.Slider=sa;exports.Sonner=ed;exports.Spinner=Ls;exports.Switch=aa;exports.TabDropdownMenu=ln;exports.TabFloatingMenu=Ec;exports.TabToolbar=Cc;exports.Table=Ge;exports.TableBody=Ke;exports.TableCaption=Wo;exports.TableCell=ne;exports.TableFooter=Xo;exports.TableHead=Ce;exports.TableHeader=Be;exports.TableRow=zt;exports.Tabs=nd;exports.TabsContent=ca;exports.TabsList=ia;exports.TabsTrigger=la;exports.TextField=Gc;exports.Textarea=da;exports.ToggleGroup=un;exports.ToggleGroupItem=Ne;exports.Toolbar=Pc;exports.Tooltip=Et;exports.TooltipContent=kt;exports.TooltipProvider=Nt;exports.TooltipTrigger=St;exports.UiLanguageSelector=$c;exports.VerticalTabs=mr;exports.VerticalTabsContent=hr;exports.VerticalTabsList=fr;exports.VerticalTabsTrigger=Ss;exports.badgeVariants=Ao;exports.buttonVariants=Vn;exports.cn=m;exports.getBookIdFromUSFM=ec;exports.getInventoryHeader=qe;exports.getLinesFromUSFM=Ql;exports.getNumberFromUSFM=tc;exports.getStatusForItem=is;exports.getToolbarOSReservedSpaceClassName=Ac;exports.inventoryCountColumn=Jl;exports.inventoryItemColumn=Xl;exports.inventoryStatusColumn=Zl;exports.selectTriggerVariants=Ho;exports.useEvent=rd;exports.useEventAsync=sd;exports.useListbox=Oo;exports.usePromise=wa;exports.useRecentSearches=Ba;exports.useSidebar=He;exports.useStylesheet=ad;function id(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}id(`*, ::before, ::after {
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
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-z-\\[300\\] {
  z-index: 300;
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
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
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
.tw-grow-\\[2\\] {
  flex-grow: 2;
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
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
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
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
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
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
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

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
