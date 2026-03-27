"use strict";var ja=Object.defineProperty;var Na=(t,e,r)=>e in t?ja(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var ht=(t,e,r)=>Na(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),a=require("react"),yt=require("cmdk"),N=require("lucide-react"),ka=require("clsx"),_a=require("tailwind-merge"),Ca=require("@radix-ui/react-dialog"),it=require("@sillsdev/scripture"),y=require("platform-bible-utils"),Te=require("@radix-ui/react-slot"),Qt=require("class-variance-authority"),Ea=require("@radix-ui/react-popover"),Sa=require("@radix-ui/react-label"),Ra=require("@radix-ui/react-radio-group"),x=require("lexical"),qr=require("@radix-ui/react-tooltip"),Dn=require("@lexical/rich-text"),Nr=require("react-dom"),Ta=require("@lexical/table"),Ma=require("@radix-ui/react-toggle-group"),Da=require("@radix-ui/react-toggle"),Ur=require("@lexical/headless"),Ia=require("@radix-ui/react-separator"),Oa=require("@radix-ui/react-avatar"),Hr=require("@radix-ui/react-dropdown-menu"),xt=require("@tanstack/react-table"),Aa=require("@radix-ui/react-select"),Pa=require("markdown-to-jsx"),Rt=require("@eten-tech-foundation/platform-editor"),La=require("@radix-ui/react-checkbox"),$a=require("@radix-ui/react-tabs"),Fa=require("@radix-ui/react-menubar"),Va=require("react-hotkeys-hook"),za=require("@radix-ui/react-context-menu"),At=require("vaul"),Ba=require("@radix-ui/react-progress"),Ga=require("react-resizable-panels"),Yr=require("sonner"),Ka=require("@radix-ui/react-slider"),qa=require("@radix-ui/react-switch");function ct(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const It=ct(Ca),Ee=ct(Ea),Xr=ct(Sa),Ve=ct(Ra),fe=ct(qr),pn=ct(Ma),Wr=ct(Da),Jr=ct(Ia),Me=ct(Oa),J=ct(Hr),st=ct(Aa),In=ct(La),jt=ct($a),Z=ct(Fa),Q=ct(za),On=ct(Ba),Vn=ct(Ga),Le=ct(Ka),An=ct(qa),Ua=_a.extendTailwindMerge({prefix:"tw-"});function f(...t){return Ua(ka.clsx(t))}const Ha="layoutDirection";function wt(){const t=localStorage.getItem(Ha);return t==="rtl"?t:"ltr"}const Ya=It.Root,Xa=It.Portal,Zr=a.forwardRef(({className:t,...e},r)=>n.jsx(It.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Zr.displayName=It.Overlay.displayName;const Qr=a.forwardRef(({className:t,children:e,...r},o)=>{const s=wt();return n.jsxs(Xa,{children:[n.jsx(Zr,{}),n.jsxs(It.Content,{ref:o,className:f("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(It.Close,{className:f("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(N.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Qr.displayName=It.Content.displayName;function to({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}to.displayName="DialogHeader";const eo=a.forwardRef(({className:t,...e},r)=>n.jsx(It.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));eo.displayName=It.Title.displayName;const Wa=a.forwardRef(({className:t,...e},r)=>n.jsx(It.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));Wa.displayName=It.Description.displayName;const qt=a.forwardRef(({className:t,...e},r)=>n.jsx(yt.Command,{ref:r,className:f("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));qt.displayName=yt.Command.displayName;const be=a.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(N.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(yt.Command.Input,{ref:r,className:f("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});be.displayName=yt.Command.Input.displayName;const Ut=a.forwardRef(({className:t,...e},r)=>n.jsx(yt.Command.List,{ref:r,className:f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Ut.displayName=yt.Command.List.displayName;const De=a.forwardRef((t,e)=>n.jsx(yt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));De.displayName=yt.Command.Empty.displayName;const Ot=a.forwardRef(({className:t,...e},r)=>n.jsx(yt.Command.Group,{ref:r,className:f("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Ot.displayName=yt.Command.Group.displayName;const zn=a.forwardRef(({className:t,...e},r)=>n.jsx(yt.Command.Separator,{ref:r,className:f("tw--mx-1 tw-h-px tw-bg-border",t),...e}));zn.displayName=yt.Command.Separator.displayName;const Pt=a.forwardRef(({className:t,...e},r)=>n.jsx(yt.Command.Item,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Pt.displayName=yt.Command.Item.displayName;function no({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}no.displayName="CommandShortcut";const ro=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"Old Testament";case y.Section.NT:return r??"New Testament";case y.Section.DC:return o??"Deuterocanon";case y.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Ja=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"OT";case y.Section.NT:return r??"NT";case y.Section.DC:return o??"DC";case y.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function _e(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??it.Canon.bookIdToEnglishName(t)}function Bn(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const oo=it.Canon.allBookIds.filter(t=>!it.Canon.isObsolete(it.Canon.bookIdToNumber(t))),me=Object.fromEntries(oo.map(t=>[t,it.Canon.bookIdToEnglishName(t)]));function Gn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=it.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(y.includes(s.toLowerCase(),o)||y.includes(t.toLowerCase(),o)||(i?y.includes(i.localizedName.toLowerCase(),o)||y.includes(i.localizedId.toLowerCase(),o):!1))}const so=a.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:l=!1,localizedBookNames:c,commandValue:w},d)=>{const p=a.useRef(!1),m=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=b=>{p.current=!0,o?o(b):r==null||r(t)},u=a.useMemo(()=>_e(t,c),[t,c]),g=a.useMemo(()=>Bn(t,c),[t,c]);return n.jsx("div",{className:f("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===y.Section.OT,"tw-border-s-purple-200":s===y.Section.NT,"tw-border-s-indigo-200":s===y.Section.DC,"tw-border-s-amber-200":s===y.Section.Extra}),children:n.jsxs(Pt,{ref:d,value:w||`${t} ${it.Canon.bookIdToEnglishName(t)}`,onSelect:m,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${it.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[l&&n.jsx(N.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Kn=Qt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=a.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},i)=>{const l=o?Te.Slot:"button";return n.jsx(l,{className:f(Kn({variant:e,size:r,className:t})),ref:i,...s})});B.displayName="Button";const Ht=Ee.Root,te=Ee.Trigger,ao=Ee.Anchor,Lt=a.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},s)=>{const i=wt();return n.jsx(Ee.Portal,{children:n.jsx(Ee.Content,{ref:s,align:e,sideOffset:r,className:f("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Lt.displayName=Ee.Content.displayName;function Pn(t,e,r){return`${t} ${me[t]}${e?` ${Bn(t,e)} ${_e(t,e)}`:""}${r?` ${r}`:""}`}function io({recentSearches:t,onSearchItemSelect:e,renderItem:r=p=>String(p),getItemKey:o=p=>String(p),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:l,classNameForItems:c,buttonClassName:w="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:d="ghost"}){const[p,m]=a.useState(!1);if(t.length===0)return;const h=u=>{e(u),m(!1)};return n.jsxs(Ht,{open:p,onOpenChange:m,children:[n.jsx(te,{asChild:!0,children:n.jsx(B,{variant:d,size:"icon",className:w,"aria-label":s,children:n.jsx(N.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Lt,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(qt,{children:n.jsx(Ut,{children:n.jsx(Ot,{heading:i,children:t.map(u=>n.jsxs(Pt,{onSelect:()=>h(u),className:f("tw-flex tw-items-center",c),children:[n.jsx(N.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function Za(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(c=>!r(c,s)),l=[s,...i.slice(0,o-1)];e(l)}}const bn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Qa=[bn.BOOK_ONLY,bn.BOOK_CHAPTER,bn.BOOK_CHAPTER_VERSE];function kr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function zt(t){return y.getChaptersForBook(it.Canon.bookIdToNumber(t))}function ti(t,e,r){if(!t.trim()||e.length===0)return;const o=Qa.reduce((s,i)=>{if(s)return s;const l=i.exec(t.trim());if(l){const[c,w=void 0,d=void 0]=l.slice(1);let p;const m=e.filter(h=>Gn(h,c,r));if(m.length===1&&([p]=m),!p&&w){if(it.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&w){const u=(g=>Object.keys(me).find(b=>me[b].toLowerCase()===g.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,b])=>b.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=w?parseInt(w,10):void 0;h&&h>zt(p)&&(h=Math.max(zt(p),1));const u=d?parseInt(d,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function ei(t,e,r,o){const s=a.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],p=Math.max(zt(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[t,e,o]),i=a.useCallback(()=>{const w=zt(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const p=e[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),l=a.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=a.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return a.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?N.ChevronsLeft:N.ChevronsRight},{onClick:l,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?N.ChevronLeft:N.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?N.ChevronRight:N.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===zt(t.book)||zt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?N.ChevronsRight:N.ChevronsLeft}],[t,e,r,s,l,c,i])}function _r({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(Ot,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:zt(t)},(l,c)=>c+1).map(l=>n.jsx(Pt,{value:`${t} ${me[t]||""} ${l}`,onSelect:()=>r(l),ref:o(l),className:f("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&l===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(l))??!1}),children:l},l))})})}function ni({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:l,onAddRecentSearch:c,id:w}){const d=wt(),[p,m]=a.useState(!1),[h,u]=a.useState(""),[g,b]=a.useState(""),[v,S]=a.useState("books"),[j,_]=a.useState(void 0),[C,z]=a.useState(!1),F=a.useRef(void 0),T=a.useRef(void 0),L=a.useRef(void 0),E=a.useRef(void 0),M=a.useRef({}),V=a.useCallback(D=>{e(D),c&&c(D)},[e,c]),P=a.useMemo(()=>o?o():oo,[o]),O=a.useMemo(()=>({[y.Section.OT]:P.filter(k=>it.Canon.isBookOT(k)),[y.Section.NT]:P.filter(k=>it.Canon.isBookNT(k)),[y.Section.DC]:P.filter(k=>it.Canon.isBookDC(k)),[y.Section.Extra]:P.filter(k=>it.Canon.extraBooks().includes(k))}),[P]),A=a.useMemo(()=>Object.values(O).flat(),[O]),U=a.useMemo(()=>{if(!g.trim())return O;const D={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return[y.Section.OT,y.Section.NT,y.Section.DC,y.Section.Extra].forEach($=>{D[$]=O[$].filter(K=>Gn(K,g,s))}),D},[O,g,s]),I=a.useMemo(()=>ti(g,A,s),[g,A,s]),H=a.useCallback(()=>{I&&(V({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1}),m(!1),b(""),u(""))},[V,I]),Nt=a.useCallback(D=>{if(zt(D)<=1){V({book:D,chapterNum:1,verseNum:1}),m(!1),b("");return}_(D),S("chapters")},[V]),Tt=a.useCallback(D=>{const k=v==="chapters"?j:I==null?void 0:I.book;k&&(V({book:k,chapterNum:D,verseNum:1}),m(!1),S("books"),_(void 0),b(""))},[V,v,j,I]),St=a.useCallback(D=>{V(D),m(!1),b("")},[V]),pt=ei(t,A,d,e),at=a.useCallback(()=>{S("books"),_(void 0),setTimeout(()=>{T.current&&T.current.focus()},0)},[]),G=a.useCallback(D=>{if(!D&&v==="chapters"){at();return}m(D),D&&(S("books"),_(void 0),b(""))},[v,at]),{otLong:tt,ntLong:et,dcLong:rt,extraLong:ft}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},Xt=a.useCallback(D=>ro(D,tt,et,rt,ft),[tt,et,rt,ft]),Ft=a.useCallback(D=>I?!!I.chapterNum&&!D.toString().includes(I.chapterNum.toString()):!1,[I]),Wt=a.useMemo(()=>y.formatScrRef(t,s?_e(t.book,s):"English"),[t,s]),je=a.useCallback(D=>k=>{M.current[D]=k},[]),ne=a.useCallback(D=>{(D.key==="Home"||D.key==="End")&&D.stopPropagation()},[]),Jt=a.useCallback(D=>{if(D.ctrlKey)return;const{isLetter:k,isDigit:$}=kr(D.key);if(v==="chapters"){if(D.key==="Backspace"){D.preventDefault(),D.stopPropagation(),at();return}if(k||$){if(D.preventDefault(),D.stopPropagation(),S("books"),_(void 0),$&&j){const K=me[j];b(`${K} ${D.key}`)}else b(D.key);setTimeout(()=>{T.current&&T.current.focus()},0);return}}if((v==="chapters"||v==="books"&&I)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(D.key)){const K=v==="chapters"?j:I==null?void 0:I.book;if(!K)return;const q=(()=>{if(!h)return 1;const ot=h.match(/(\d+)$/);return ot?parseInt(ot[1],10):0})(),nt=zt(K);if(!nt)return;let X=q;const ut=6;switch(D.key){case"ArrowLeft":q!==0&&(X=q>1?q-1:nt);break;case"ArrowRight":q!==0&&(X=q<nt?q+1:1);break;case"ArrowUp":X=q===0?nt:Math.max(1,q-ut);break;case"ArrowDown":X=q===0?1:Math.min(nt,q+ut);break;default:return}X!==q&&(D.preventDefault(),D.stopPropagation(),u(Pn(K,s,X)),setTimeout(()=>{const ot=M.current[X];ot&&ot.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[v,I,at,j,h,s]),Oe=a.useCallback(D=>{if(D.shiftKey||D.key==="Tab"||D.key===" ")return;const{isLetter:k,isDigit:$}=kr(D.key);(k||$)&&(D.preventDefault(),b(K=>K+D.key),T.current.focus(),z(!1))},[]);return a.useLayoutEffect(()=>{const D=setTimeout(()=>{if(p&&v==="books"&&L.current&&E.current){const k=L.current,$=E.current,K=$.offsetTop,q=k.clientHeight,nt=$.clientHeight,X=K-q/2+nt/2;k.scrollTo({top:Math.max(0,X),behavior:"smooth"}),u(Pn(t.book))}},0);return()=>{clearTimeout(D)}},[p,v,g,I,t.book]),a.useLayoutEffect(()=>{if(v==="chapters"&&j){const D=j===t.book;setTimeout(()=>{if(L.current)if(D){const k=M.current[t.chapterNum];k&&k.scrollIntoView({block:"center",behavior:"smooth"})}else L.current.scrollTo({top:0});F.current&&F.current.focus()},0)}},[v,j,I,t.book,t.chapterNum]),n.jsxs(Ht,{open:p,onOpenChange:G,children:[n.jsx(te,{asChild:!0,children:n.jsx(B,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:f("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Wt})})}),n.jsx(Lt,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(qt,{ref:F,onKeyDown:Jt,loop:!0,value:h,onValueChange:u,shouldFilter:!1,children:[v==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(be,{ref:T,value:g,onValueChange:b,onKeyDown:ne,onFocus:()=>z(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&n.jsx(io,{recentSearches:l,onSearchItemSelect:St,renderItem:D=>y.formatScrRef(D,"English"),getItemKey:D=>`${D.book}-${D.chapterNum}-${D.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:pt.map(({onClick:D,disabled:k,title:$,icon:K})=>n.jsx(B,{variant:"ghost",size:"sm",onClick:()=>{z(!0),D()},disabled:k,className:"tw-h-10 tw-w-4 tw-p-0",title:$,onKeyDown:Oe,children:n.jsx(K,{})},$))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:at,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(N.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(N.ArrowRight,{className:"tw-h-4 tw-w-4"})}),j&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:_e(j,s)})]}),!C&&n.jsxs(Ut,{ref:L,children:[v==="books"&&n.jsxs(n.Fragment,{children:[!I&&Object.entries(U).map(([D,k])=>{if(k.length!==0)return n.jsx(Ot,{heading:Xt(D),children:k.map($=>n.jsx(so,{bookId:$,onSelect:K=>Nt(K),section:y.getSectionForBook($),commandValue:`${$} ${me[$]}`,ref:$===t.book?E:void 0,localizedBookNames:s},$))},D)}),I&&n.jsx(Ot,{children:n.jsx(Pt,{value:`${I.book} ${me[I.book]} ${I.chapterNum||""}:${I.verseNum||""})}`,onSelect:H,className:"tw-font-semibold tw-text-primary",children:y.formatScrRef({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1},s?Bn(I.book,s):void 0)},"top-match")}),I&&zt(I.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:_e(I.book,s)}),n.jsx(_r,{bookId:I.book,scrRef:t,onChapterSelect:Tt,setChapterRef:je,isChapterDimmed:Ft,className:"tw-px-4 tw-pb-4"})]})]}),v==="chapters"&&j&&n.jsx(_r,{bookId:j,scrRef:t,onChapterSelect:Tt,setChapterRef:je,className:"tw-p-4"})]})]})})]})}const ri=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),oi=Qt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),lt=a.forwardRef(({className:t,...e},r)=>n.jsx(Xr.Root,{ref:r,className:f("pr-twp",oi(),t),...e}));lt.displayName=Xr.Root.displayName;const un=a.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(Ve.Root,{className:f("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});un.displayName=Ve.Root.displayName;const ze=a.forwardRef(({className:t,...e},r)=>n.jsx(Ve.Item,{ref:r,className:f("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ve.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(N.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ze.displayName=Ve.Item.displayName;function si(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function en({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:i,onChange:l=()=>{},getOptionLabel:c=si,getButtonLabel:w,icon:d=void 0,buttonPlaceholder:p="",textPlaceholder:m="",commandEmptyMessage:h="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:b=!1,ariaLabel:v,...S}){const[j,_]=a.useState(!1),C=w??c,z=T=>T.length>0&&typeof T[0]=="object"&&"options"in T[0],F=(T,L)=>{const E=c(T),M=typeof T=="object"&&"secondaryLabel"in T?T.secondaryLabel:void 0,V=`${L??""}${E}${M??""}`;return n.jsxs(Pt,{value:E,onSelect:()=>{l(T),_(!1)},className:"tw-flex tw-items-center",children:[n.jsx(N.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||c(i)!==E})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[E,M&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",M]})]})]},V)};return n.jsxs(Ht,{open:j,onOpenChange:_,...S,children:[n.jsx(te,{asChild:!0,children:n.jsxs(B,{variant:u,role:"combobox","aria-expanded":j,"aria-label":v,id:t,className:f("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[d&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:d}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?C(i):p})]}),n.jsx(N.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:g,className:f("tw-w-[200px] tw-p-0",s),children:n.jsxs(qt,{children:[n.jsx(be,{placeholder:m,className:"tw-text-inherit"}),n.jsx(De,{children:h}),n.jsx(Ut,{children:z(e)?e.map(T=>n.jsx(Ot,{heading:T.groupHeading,children:T.options.map(L=>F(L,T.groupHeading))},T.groupHeading)):e.map(T=>F(T))})]})})]})}function lo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const l=a.useMemo(()=>Array.from({length:i},(d,p)=>p+1),[i]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(lt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(en,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(lt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(en,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const ai=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),vn=(t,e)=>t[e]??e;function ii({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=vn(d,"%webView_bookSelector_currentBook%"),m=vn(d,"%webView_bookSelector_choose%"),h=vn(d,"%webView_bookSelector_chooseBooks%"),[u,g]=a.useState("current book"),b=v=>{g(v),t(v)};return n.jsx(un,{className:"pr-twp tw-flex",value:u,onValueChange:v=>b(v),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"current book"}),n.jsx(lt,{className:"tw-ms-1",children:p})]}),n.jsx(lt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(lo,{isDisabled:u==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"choose books"}),n.jsx(lt,{className:"tw-ms-1",children:h})]}),n.jsx(lt,{className:"tw-flex tw-items-center",children:o.map(v=>it.Canon.bookIdToEnglishName(v)).join(", ")}),n.jsx(B,{disabled:u==="current book",onClick:()=>r(),children:m})]})]})})}const co=a.createContext(null);function li(t,e){return{getTheme:function(){return e??null}}}function Yt(){const t=a.useContext(co);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const wo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ci=wo?a.useLayoutEffect:a.useEffect,We={tag:x.HISTORY_MERGE_TAG};function di({initialConfig:t,children:e}){const r=a.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:l,editorState:c,html:w}=t,d=li(null,o),p=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:i,onError:m=>l(m,p),theme:o});return function(m,h){if(h!==null){if(h===void 0)m.update(()=>{const u=x.$getRoot();if(u.isEmpty()){const g=x.$createParagraphNode();u.append(g);const b=wo?document.activeElement:null;(x.$getSelection()!==null||b!==null&&b===m.getRootElement())&&g.select()}},We);else if(h!==null)switch(typeof h){case"string":{const u=m.parseEditorState(h);m.setEditorState(u,We);break}case"object":m.setEditorState(h,We);break;case"function":m.update(()=>{x.$getRoot().isEmpty()&&h(m)},We)}}}(p,c),[p,d]},[]);return ci(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(co.Provider,{value:r,children:e})}const wi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function pi({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Yt();return wi(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:l,prevEditorState:c,tags:w})=>{e&&i.size===0&&l.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const qn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},bt=fe.Provider,Ct=fe.Root,Et=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(fe.Trigger,{ref:o,className:e?f(Kn({variant:e}),t):t,...r}));Et.displayName=fe.Trigger.displayName;const vt=a.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(fe.Portal,{children:n.jsx(fe.Content,{ref:o,sideOffset:e,className:f("pr-twp tw-z-[250] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})}));vt.displayName=fe.Content.displayName;const Un=[Dn.HeadingNode,x.ParagraphNode,x.TextNode,Dn.QuoteNode],ui=a.createContext(null),yn={didCatch:!1,error:null};class mi extends a.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=yn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),l=0;l<s;l++)i[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(yn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&fi(e.resetKeys,s)){var i,l;(i=(l=this.props).onReset)===null||i===void 0||i.call(l,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(yn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:l}=this.state;let c=e;if(i){const w={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=a.createElement(o,w);else if(s!==void 0)c=s;else throw l}return a.createElement(ui.Provider,{value:{didCatch:i,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function fi(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function hi({children:t,onError:e}){return n.jsx(mi,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const gi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function xi(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function bi(){return function(t){const[e]=Yt(),r=a.useMemo(()=>t(e),[e,t]),[o,s]=a.useState(()=>r.initialValueFn()),i=a.useRef(o);return gi(()=>{const{initialValueFn:l,subscribe:c}=r,w=l();return i.current!==w&&(i.current=w,s(w)),c(d=>{i.current=d,s(d)})},[r,t]),o}(xi)}function vi(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,l=t.isBackward(),c=s.getNode(),w=i.getNode(),d=e.is(c),p=e.is(w);if(d||p){const[m,h]=x.$getCharacterOffsets(t),u=c.is(w),g=e.is(l?w:c),b=e.is(l?c:w);let v,S=0;u?(S=m>h?h:m,v=m>h?m:h):g?(S=l?h:m,v=void 0):b&&(S=0,v=l?m:h);const j=e.__text.slice(S,v);j!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=j)}}return e}function yi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const po=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ji=po&&"documentMode"in document?document.documentMode:null;!(!po||!("InputEvent"in window)||ji)&&"getTargetRanges"in new window.InputEvent("input");function Ni(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||yi(4,t.__key),e}function ki(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],l=i.getKey();if(r.has(l))continue;const c=x.$findMatchingParent(i,d=>x.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!r.has(w)&&(r.add(w),t(c))}return r.size>0}const _i=Symbol.for("preact-signals");function mn(){if(oe>1)return void oe--;let t,e=!1;for(;$e!==void 0;){let r=$e;for($e=void 0,Ln++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&uo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(Ln=0,oe--,e)throw t}function Ci(t){if(oe>0)return t();oe++;try{return t()}finally{mn()}}let Y,$e;function Cr(t){const e=Y;Y=void 0;try{return t()}finally{Y=e}}let oe=0,Ln=0,Qe=0;function Er(t){if(Y===void 0)return;let e=t.n;return e===void 0||e.t!==Y?(e={i:0,S:t,p:Y.s,n:void 0,t:Y,e:void 0,x:void 0,r:e},Y.s!==void 0&&(Y.s.n=e),Y.s=e,t.n=e,32&Y.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=Y.s,e.n=void 0,Y.s.n=e,Y.s=e),e):void 0}function gt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Be(t,e){return new gt(t,e)}function uo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Sr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function mo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function pe(t,e){gt.call(this,void 0),this.x=t,this.s=void 0,this.g=Qe-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Ei(t,e){return new pe(t,e)}function fo(t){const e=t.u;if(t.u=void 0,typeof e=="function"){oe++;const r=Y;Y=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Hn(t),o}finally{Y=r,mn()}}}function Hn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,fo(t)}function Si(t){if(Y!==this)throw new Error("Out-of-order effect");mo(this),Y=t,this.f&=-2,8&this.f&&Hn(this),mn()}function ke(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function ae(t,e){const r=new ke(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function fn(t,e={}){const r={};for(const o in t){const s=e[o],i=Be(s===void 0?t[o]:s);r[o]=i}return r}gt.prototype.brand=_i,gt.prototype.h=function(){return!0},gt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Cr(()=>{var r;(r=this.W)==null||r.call(this)}))},gt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Cr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},gt.prototype.subscribe=function(t){return ae(()=>{const e=this.value,r=Y;Y=void 0;try{t(e)}finally{Y=r}},{name:"sub"})},gt.prototype.valueOf=function(){return this.value},gt.prototype.toString=function(){return this.value+""},gt.prototype.toJSON=function(){return this.value},gt.prototype.peek=function(){const t=Y;Y=void 0;try{return this.value}finally{Y=t}},Object.defineProperty(gt.prototype,"value",{get(){const t=Er(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Ln>100)throw new Error("Cycle detected");this.v=t,this.i++,Qe++,oe++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{mn()}}}}),pe.prototype=new gt,pe.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Qe))return!0;if(this.g=Qe,this.f|=1,this.i>0&&!uo(this))return this.f&=-2,!0;const t=Y;try{Sr(this),Y=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Y=t,mo(this),this.f&=-2,!0},pe.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}gt.prototype.S.call(this,t)},pe.prototype.U=function(t){if(this.t!==void 0&&(gt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},pe.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(pe.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Er(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),ke.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},ke.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,fo(this),Sr(this),oe++;const t=Y;return Y=this,Si.bind(this,t)},ke.prototype.N=function(){2&this.f||(this.f|=2,this.o=$e,$e=this)},ke.prototype.d=function(){this.f|=8,1&this.f||Hn(this)},ke.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return ae(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function ho(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function go(t,e=ho){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({$onClear:ho}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return ae(()=>go(t,o.value))}});function Ri(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const jn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class xo extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:jn}]})}getFormat(){return x.$getState(this,jn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,jn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Ti(t){return t instanceof xo}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[xo],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())Ti(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function bo(t,e){let r;return Be(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const $n=x.defineExtension({build:t=>bo(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function vo(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=vo(r[s],o[s]);return t}return e}const Yn=0,Fn=1,yo=2,Nn=3,Je=4,Ne=5,kn=6,Ae=7;function _n(t){return t.id===Yn}function jo(t){return t.id===yo}function Mi(t){return function(e){return e.id===Fn}(t)||W(305,String(t.id),String(Fn)),Object.assign(t,{id:yo})}const Di=new Set;class Ii{constructor(e,r){ht(this,"builder");ht(this,"configs");ht(this,"_dependency");ht(this,"_peerNameSet");ht(this,"extension");ht(this,"state");ht(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Yn}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;jo(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,w,d){return Object.assign(c,{config:w,id:Nn,registerState:d})}(r,this.mergeConfigs(),o);let l;this.state=i,this.extension.init&&(l=this.extension.init(e,i.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:Je,initResult:w,registerState:d})}(i,l,s)}build(e){const r=this.state;let o;r.id!==Je&&W(307,String(r.id),String(Ne)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,l,c){return Object.assign(i,{id:Ne,output:l,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==Ne&&W(308,String(o.id),String(Ne));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:kn})}(o),()=>{const i=this.state;i.id!==Ae&&W(309,String(o.id),String(Ae)),this.state=function(l){return Object.assign(l,{id:Ne})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==kn&&W(310,String(r.id),String(kn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ae})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const e=this.state;return function(r){return r.id>=Je}(e)||W(313,String(e.id),String(Je)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=Nn}(e)||W(314,String(e.id),String(Nn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Ae}(e)||W(316,String(e.id),String(Ae)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Di}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=Ne})(e)||W(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Rr={tag:x.HISTORY_MERGE_TAG};function Oi(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Ai=x.defineExtension({config:x.safeCast({setOptions:Rr,updateOptions:Rr}),init:({$initialEditorState:t=Oi})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const l=t.parseEditorState(i);t.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Tr=Symbol.for("@lexical/extension/LexicalBuilder");function Mr(){}function Pi(t){throw t}function Ze(t){return Array.isArray(t)?t:[t]}const Cn="0.41.0+prod.esm";class Fe{constructor(e){ht(this,"roots");ht(this,"extensionNameMap");ht(this,"outgoingConfigEdges");ht(this,"incomingEdges");ht(this,"conflicts");ht(this,"_sortedExtensionReps");ht(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Cn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Ze(Ai)];for(const o of e)r.push(Ze(o));return new Fe(r)}static maybeFromEditor(e){const r=e[Tr];return r&&(r.PACKAGE_VERSION!==Cn&&W(292,r.PACKAGE_VERSION,Cn),r instanceof Fe||W(293)),r}static fromEditor(e){const r=Fe.maybeFromEditor(e);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[Tr]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=Mr;function r(){try{e()}finally{e=Mr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&W(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&W(296);const r=Ze(e),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new Ii(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&W(299,o.name,i);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&W(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=Ze(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(jo(i))return;const l=o.extension.name;var c;_n(i)||W(300,l,s||"[unknown]"),_n(c=i)||W(304,String(c.id),String(Yn)),i=Object.assign(c,{id:Fn}),o.state=i;const w=this.outgoingConfigEdges.get(l);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,l)}i=Mi(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())_n(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of i)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&W(301,o.name);for(const l of s)i.configs.add(l)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const l of r){const c=l.register(e,i);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},l={},c=this.sortedExtensionReps();for(const p of c){const{extension:m}=p;if(m.onError!==void 0&&(e.onError=m.onError),m.disableEvents!==void 0&&(e.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(e.parentEditor=m.parentEditor),m.editable!==void 0&&(e.editable=m.editable),m.namespace!==void 0&&(e.namespace=m.namespace),m.$initialEditorState!==void 0&&(e.$initialEditorState=m.$initialEditorState),m.nodes)for(const h of Ri(m)){if(typeof h!="function"){const u=o.get(h.replace);u&&W(302,m.name,h.replace.name,u.extension.name),o.set(h.replace,p)}r.add(h)}if(m.html){if(m.html.export)for(const[h,u]of m.html.export.entries())s.set(h,u);m.html.import&&Object.assign(i,m.html.import)}m.theme&&vo(l,m.theme)}Object.keys(l).length>0&&(e.theme=l),r.size&&(e.nodes=[...r]);const w=Object.keys(i).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=i),d&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=Pi),e}}const Li=new Set,Dr=x.defineExtension({build(t,e,r){const o=r.getDependency($n).output,s=Be({watchedNodeKeys:new Map}),i=bo(()=>{},()=>ae(()=>{const l=i.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,m]of c.entries()){if(m.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),u=h&&h.isSelected()||!1;d=d||u!==(!!l&&l.has(p)),u&&(w=w||new Set,w.add(p))}}),!d&&w&&l&&w.size===l.size||(i.value=w)}));return{watchNodeKey:function(l){const c=Ei(()=>(i.value||Li).has(l)),{watchedNodeKeys:w}=s.peek();let d=w.get(l);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(l,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[$n],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Se extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Se(e.__key)}static importJSON(e){return No().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:$i,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function $i(){return{node:No()}}function No(){return x.$create(Se)}function Fi(t){return t instanceof Se}x.defineExtension({dependencies:[$n,Dr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Se],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Dr).output,s=Be({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,l=>{if(x.isDOMNode(l.target)){const c=x.$getNodeFromDOMNode(l.target);if(Fi(c))return function(w,d=!1){const p=x.$getSelection(),m=w.isSelected(),h=w.getKey();let u;d&&x.$isNodeSelection(p)?u=p:(u=x.$createNodeSelection(),x.$setSelection(u)),m?u.delete(h):u.add(h)}(c,l.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(Se,(l,c)=>{Ci(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,m]of l.entries())if(m==="destroyed")d.delete(p),w=!0;else{const h=d.get(p),u=t.getElementByKey(p);h?h.domNode.value=u:(w=!0,d.set(p,{domNode:Be(u),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),ae(()=>{const l=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())l.push(ae(()=>{const d=c.value;d&&(w.value?x.addClassNamesToElement(d,i):x.removeClassNamesFromElement(d,i))}));return x.mergeRegister(...l)}))}});function ko(t){return t.canBeEmpty()}function Vi(t,e,r=ko){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(l){if(l.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const c=l.anchor,w=l.focus,d=w.isBefore(c)?w:c,p=d.getNode(),m=Ni(p);if(m.canIndent()){const h=m.getKey();let u=x.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=x.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(d))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return ki(l=>{if(i(l)){const c=l.getIndent()+1;(!o||c<o)&&l.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({$canIndent:ko,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return ae(()=>{if(!o.value)return Vi(t,s,i)})}});const zi=x.defineExtension({name:"@lexical/react/ReactProvider"});function Bi(){return x.$getRoot().getTextContent()}function Gi(t,e=!0){if(t)return!1;let r=Bi();return e&&(r=r.trim()),r===""}function Ki(t){if(!Gi(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),l=i.length;for(let c=0;c<l;c++){const w=i[o];if(!x.$isTextNode(w))return!1}}}return!0}function _o(t){return()=>Ki(t)}function Co(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let l;try{l=JSON.parse(i)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,m,h,u]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const b=g.anchor;let v=b.getNode(),S=0,j=0;if(x.$isTextNode(v)&&d>=0&&p>=0&&(S=d,j=d+p,g.setTextNodeRange(v,S,v,j)),S===j&&m===""||(g.insertRawText(m),v=b.getNode()),x.$isTextNode(v)){S=h,j=h+u;const _=v.getTextContentSize();S=S>_?_:S,j=j>_?_:j,g.setTextNodeRange(v,S,v,j)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>ae(()=>r.getOutput().disabled.value?void 0:Co(t))});function qi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Xn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Ui({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=a.useState(()=>r.getDecorators());return Xn(()=>r.registerDecoratorListener(l=>{Nr.flushSync(()=>{i(l)})}),[r]),a.useEffect(()=>{i(r.getDecorators())},[r]),a.useMemo(()=>{const l=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(a.Suspense,{fallback:null,children:s[d]})}),m=r.getElementByKey(d);m!==null&&l.push(Nr.createPortal(p,m,d))}return l},[o,s,r])}(t,e)}function Hi({editor:t,ErrorBoundary:e}){return function(r){const o=Fe.maybeFromEditor(r);if(o&&o.hasExtensionByName(zi.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&qi(320,s);return!0}return!1}(t)?null:n.jsx(Ui,{editor:t,ErrorBoundary:e})}function Ir(t){return t.getEditorState().read(_o(t.isComposing()))}function Yi({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Yt();return function(s){Xn(()=>x.mergeRegister(Dn.registerRichText(s),Co(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Xi,{content:e}),n.jsx(Hi,{editor:o,ErrorBoundary:r})]})}function Xi({content:t}){const[e]=Yt(),r=function(s){const[i,l]=a.useState(()=>Ir(s));return Xn(()=>{function c(){const w=Ir(s);l(w)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(e),o=bi();return r?typeof t=="function"?t(o):t:null}function Wi({defaultSelection:t}){const[e]=Yt();return a.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Ji=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Zi({onClear:t}){const[e]=Yt();return Ji(()=>go(e,t),[e,t]),null}const Eo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Qi({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:l,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:m,ariaRequired:h,autoCapitalize:u,className:g,id:b,role:v="textbox",spellCheck:S=!0,style:j,tabIndex:_,"data-testid":C,...z},F){const[T,L]=a.useState(t.isEditable()),E=a.useCallback(V=>{V&&V.ownerDocument&&V.ownerDocument.defaultView?t.setRootElement(V):t.setRootElement(null)},[t]),M=a.useMemo(()=>function(...V){return P=>{for(const O of V)typeof O=="function"?O(P):O!=null&&(O.current=P)}}(F,E),[E,F]);return Eo(()=>(L(t.isEditable()),t.registerEditableListener(V=>{L(V)})),[t]),n.jsx("div",{"aria-activedescendant":T?e:void 0,"aria-autocomplete":T?r:"none","aria-controls":T?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":T&&v==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":T?m:void 0,"aria-readonly":!T||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:T,"data-testid":C,id:b,ref:M,role:v,spellCheck:S,style:j,tabIndex:_,...z})}const tl=a.forwardRef(Qi);function Or(t){return t.getEditorState().read(_o(t.isComposing()))}const el=a.forwardRef(nl);function nl(t,e){const{placeholder:r,...o}=t,[s]=Yt();return n.jsxs(n.Fragment,{children:[n.jsx(tl,{editor:s,...o,ref:e}),r!=null&&n.jsx(rl,{editor:s,content:r})]})}function rl({content:t,editor:e}){const r=function(l){const[c,w]=a.useState(()=>Or(l));return Eo(()=>{function d(){const p=Or(l);w(p)}return d(),x.mergeRegister(l.registerUpdateListener(()=>{d()}),l.registerEditableListener(()=>{d()}))},[l]),c}(e),[o,s]=a.useState(e.isEditable());if(a.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(l=>{s(l)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function ol({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(el,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const So=a.createContext(void 0);function sl({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const l=a.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(So.Provider,{value:l,children:i})}function Ro(){const t=a.useContext(So);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function al(){const[t,e]=a.useState(void 0),r=a.useCallback(()=>{e(void 0)},[]),o=a.useMemo(()=>{if(t===void 0)return;const{title:i,content:l}=t;return n.jsx(Ya,{open:!0,onOpenChange:r,children:n.jsxs(Qr,{children:[n.jsx(to,{children:n.jsx(eo,{children:i})}),l]})})},[t,r]),s=a.useCallback((i,l,c=!1)=>{e({closeOnClickOutside:c,content:l(r),title:i})},[r]);return[o,s]}function il({children:t}){const[e]=Yt(),[r,o]=a.useState(e),[s,i]=a.useState("paragraph"),[l,c]=al(),w=()=>{};return a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(sl,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:i,showModal:c,children:[l,t({blockType:s})]})}function ll(t){const[e]=Yt(),{activeEditor:r}=Ro();a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),a.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const To=Qt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),cl=a.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(Wr.Root,{ref:s,className:f(To({variant:e,size:r,className:t})),...o}));cl.displayName=Wr.Root.displayName;const Mo=a.createContext({size:"default",variant:"default"}),hn=a.forwardRef(({className:t,variant:e,size:r,children:o,...s},i)=>{const l=wt();return n.jsx(pn.Root,{ref:i,className:f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:l,children:n.jsx(Mo.Provider,{value:{variant:e,size:r},children:o})})});hn.displayName=pn.Root.displayName;const Ce=a.forwardRef(({className:t,children:e,variant:r,size:o,...s},i)=>{const l=a.useContext(Mo);return n.jsx(pn.Item,{ref:i,className:f(To({variant:l.variant||r,size:l.size||o}),t),...s,children:e})});Ce.displayName=pn.Item.displayName;const Ar=[{format:"bold",icon:N.BoldIcon,label:"Bold"},{format:"italic",icon:N.ItalicIcon,label:"Italic"}];function dl(){const{activeEditor:t}=Ro(),[e,r]=a.useState([]),o=a.useCallback(s=>{if(x.$isRangeSelection(s)||Ta.$isTableSelection(s)){const i=[];Ar.forEach(({format:l})=>{s.hasFormat(l)&&i.push(l)}),r(l=>l.length!==i.length||!i.every(c=>l.includes(c))?i:l)}},[]);return ll(o),n.jsx(hn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Ar.map(({format:s,icon:i,label:l})=>n.jsx(Ce,{value:s,"aria-label":l,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function wl({onClear:t}){const[e]=Yt();a.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function pl({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=a.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(il,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(dl,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Yi,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(ol,{placeholder:t})}),ErrorBoundary:hi}),e&&n.jsx(Wi,{defaultSelection:"rootEnd"}),n.jsx(wl,{onClear:r}),n.jsx(Zi,{})]})]})}const ul={namespace:"commentEditor",theme:qn,nodes:Un,onError:t=>{console.error(t)}};function nn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:l,className:c}){return n.jsx("div",{className:f("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(di,{initialConfig:{...ul,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(bt,{children:[n.jsx(pl,{placeholder:s,autoFocus:i,onClear:l}),n.jsx(pi,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function ml(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!Io.has(i.nodeName)){const l=Oo(i,t,s,!1);l!==null&&(o=o.concat(l))}return function(i){for(const l of i)l.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&l.insertAfter(x.$createLineBreakNode());for(const l of i){const c=l.getChildren();for(const w of c)l.insertBefore(w);l.remove()}}(s),o}function fl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)Do(t,o[s],r,e);return r.innerHTML}function Do(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let l=e;o!==null&&x.$isTextNode(e)&&(l=vi(o,e,"clone"));const c=x.$isElementNode(l)?l.getChildren():[],w=x.getRegisteredNode(t,l.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,l):l.exportDOM(t);const{element:p,after:m}=d;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],b=Do(t,g,h,o);!s&&x.$isElementNode(e)&&b&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),m){const u=m.call(l,p);u&&(x.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(h);return s}const Io=new Set(["STYLE","SCRIPT"]);function Oo(t,e,r,o,s=new Map,i){let l=[];if(Io.has(t.nodeName))return l;let c=null;const w=function(g,b){const{nodeName:v}=g,S=b._htmlConversions.get(v.toLowerCase());let j=null;if(S!==void 0)for(const _ of S){const C=_(g);C!==null&&(j===null||(j.priority||0)<=(C.priority||0))&&(j=C)}return j!==null?j.conversion:null}(t,e),d=w?w(t):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,b]of s)if(c=b(c,i),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const m=t.childNodes;let h=[];const u=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<m.length;g++)h.push(...Oo(m[g],e,r,u,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=hl(t,h,u?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?l=l.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),l}function hl(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let l=0;l<e.length;l++){const c=e[l];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),l===e.length-1||l<e.length-1&&x.$isBlockElementNode(e[l+1])){const w=r();w.setFormat(o),w.append(...i),s.push(w),i=[]}}return s}function Ao(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Po(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Po(e.children)):!1}function Dt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Po(t.root.children):!1}function gl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Ur.createHeadlessEditor({namespace:"EditorUtils",theme:qn,nodes:Un,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=ml(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function rn(t){const e=Ur.createHeadlessEditor({namespace:"EditorUtils",theme:qn,nodes:Un,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=fl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Wn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const ie=a.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(Jr.Root,{ref:s,decorative:r,orientation:e,className:f("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));ie.displayName=Jr.Root.displayName;const xl=Qt.cva("tw-flex tw-w-fit tw-items-stretch has-[>[data-slot=button-group]]:tw-gap-2 [&>*]:focus-visible:tw-relative [&>*]:focus-visible:tw-z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:tw-rounded-r-md [&>[data-slot=select-trigger]:not([class*=w-])]:tw-w-fit [&>input]:tw-flex-1",{variants:{orientation:{horizontal:"[&>*:not(:first-child)]:tw-rounded-l-none [&>*:not(:first-child)]:tw-border-l-0 [&>*:not(:last-child)]:tw-rounded-r-none",vertical:"tw-flex-col [&>*:not(:first-child)]:tw-rounded-t-none [&>*:not(:first-child)]:tw-border-t-0 [&>*:not(:last-child)]:tw-rounded-b-none"}},defaultVariants:{orientation:"horizontal"}});function Lo({className:t,orientation:e,...r}){return n.jsx("div",{role:"group","data-slot":"button-group","data-orientation":e,className:f("pr-twp",xl({orientation:e}),t),...r})}function $o({className:t,orientation:e="vertical",...r}){return n.jsx(ie,{"data-slot":"button-group-separator",orientation:e,className:f("tw-!m-0 tw-relative tw-self-stretch tw-bg-input data-[orientation=vertical]:tw-h-auto",t),...r})}const Fo=Object.freeze(["%cancelButton_tooltip%","%acceptButton_tooltip%"]),Pr=(t,e)=>t[e]??e;function Vo({onCancelClick:t,onAcceptClick:e,canCancel:r=!0,canAccept:o=!0,localizedStrings:s={},className:i="tw-h-6 tw-w-6",variant:l="ghost"}){const c=Pr(s,"%cancelButton_tooltip%"),w=Pr(s,"%acceptButton_tooltip%"),d=l==="secondary"||l==="default";return n.jsxs(Lo,{children:[n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:n.jsx(B,{"aria-label":c,className:i,size:"icon",onClick:t,disabled:!r,variant:l,children:n.jsx(N.X,{})})}),n.jsx(vt,{children:n.jsx("p",{children:c})})]})}),d&&n.jsx($o,{}),n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:n.jsx(B,{"aria-label":w,className:i,size:"icon",onClick:e,disabled:!o,variant:l,children:n.jsx(N.Check,{})})}),n.jsx(vt,{children:n.jsx("p",{children:w})})]})})]})}function tn(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Jn(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const bl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function En(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function vl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=a.useState(bl),[l,c]=a.useState(void 0),[w,d]=a.useState(!1),p=a.useRef(void 0),m=a.useRef(null);a.useEffect(()=>{let b=!0;const v=m.current;if(!v)return;const S=setTimeout(()=>{b&&Ao(v)},300);return()=>{b=!1,clearTimeout(S)}},[]);const h=a.useCallback(()=>{if(!Dt(s))return;const b=rn(s);e(b,l)},[s,e,l]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:g}),n.jsx(Vo,{onCancelClick:r,onAcceptClick:h,canAccept:Dt(s),localizedStrings:o,variant:"secondary"})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Ht,{open:w,onOpenChange:d,children:[n.jsx(te,{asChild:!0,children:n.jsxs(B,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(N.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:En(l!==void 0?l:"",o)})]})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:b=>{b.key==="Escape"&&(b.stopPropagation(),d(!1))},children:n.jsx(qt,{children:n.jsx(Ut,{children:t.map(b=>n.jsx(Pt,{onSelect:()=>{c(b===""?void 0:b),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:En(b,o)})},b||"unassigned"))})})})]})}),n.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),r()):Jn(b)&&(b.preventDefault(),b.stopPropagation(),Dt(s)&&h())},onKeyDown:b=>{Wn(b),(b.key==="Enter"||b.key===" ")&&b.stopPropagation()},children:n.jsx(nn,{editorSerializedState:s,onSerializedChange:b=>i(b),placeholder:u,onClear:b=>{p.current=b}})})]})}const yl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%",...Fo]),jl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],Nl=["input","select","textarea","button"],kl=["button","textbox"],zo=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=a.useRef(null),[i,l]=a.useState(void 0),[c,w]=a.useState(void 0),d=a.useCallback(u=>{l(u);const g=t.find(v=>v.id===u);g&&(e==null||e(g));const b=document.getElementById(u);b&&(b.scrollIntoView({block:"center"}),b.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=a.useCallback(u=>{const g=t.find(b=>b.id===u);g&&(w(b=>b===u?void 0:u),r==null||r(g))},[r,t]),m=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||Nl.includes(g))return!0;const b=u.getAttribute("role");if(b&&kl.includes(b))return!0;const v=u.getAttribute("tabindex");return v!==void 0&&v!=="-1"},h=a.useCallback(u=>{var T;const g=u.target,b=L=>L?document.getElementById(L):void 0,v=b(c),S=b(i);if(!!(v&&g&&v.contains(g)&&g!==v)&&m(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const L=t.find(E=>E.id===c);L&&d(L.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!v)return;const L=Array.from(v.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(L.length===0)return;const E=L.findIndex(V=>V===g);if(E===-1)return;let M;u.key==="ArrowDown"?M=Math.min(E+1,L.length-1):M=Math.max(E-1,0),M!==E&&(u.preventDefault(),u.stopPropagation(),(T=L[M])==null||T.focus());return}return}const C=t.findIndex(L=>L.id===i);let z=C;switch(u.key){case"ArrowDown":z=Math.min(C+1,t.length-1),u.preventDefault();break;case"ArrowUp":z=Math.max(C-1,0),u.preventDefault();break;case"Home":z=0,u.preventDefault();break;case"End":z=t.length-1,u.preventDefault();break;case" ":case"Enter":i&&p(i),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const L=S;if(L){const E=L.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),M=L.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),V=E??M;if(V){u.preventDefault(),V.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(m(g)||(o==null||o(u.key),u.preventDefault()));return}const F=t[z];F&&d(F.id)},[t,d,i,c,p,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:h,focusOption:d}},Bo=Qt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),he=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:f("pr-twp",Bo({variant:e}),t),...r}));he.displayName="Badge";const Zn=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Zn.displayName="Card";const Go=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Go.displayName="CardHeader";const Ko=a.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:f("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Ko.displayName="CardTitle";const qo=a.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:f("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));qo.displayName="CardDescription";const Qn=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-p-6 tw-pt-0",t),...e}));Qn.displayName="CardContent";const Uo=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Uo.displayName="CardFooter";const tr=a.forwardRef(({className:t,...e},r)=>n.jsx(Me.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));tr.displayName=Me.Root.displayName;const Ho=a.forwardRef(({className:t,...e},r)=>n.jsx(Me.Image,{ref:r,className:f("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Ho.displayName=Me.Image.displayName;const er=a.forwardRef(({className:t,...e},r)=>n.jsx(Me.Fallback,{ref:r,className:f("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));er.displayName=Me.Fallback.displayName;const nr=a.createContext(void 0);function $t(){const t=a.useContext(nr);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ee=Qt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),le=J.Trigger,rr=J.Group,Yo=J.Portal,Xo=J.Sub,Wo=J.RadioGroup;function Zt({variant:t="default",...e}){const r=a.useMemo(()=>({variant:t}),[t]);return n.jsx(nr.Provider,{value:r,children:n.jsx(J.Root,{...e})})}const or=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=$t();return n.jsxs(J.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,ee({variant:i.variant})),...o,children:[r,n.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});or.displayName=J.SubTrigger.displayName;const sr=a.forwardRef(({className:t,...e},r)=>n.jsx(J.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));sr.displayName=J.SubContent.displayName;const Kt=a.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const i=wt();return n.jsx(J.Portal,{children:n.jsx(J.Content,{ref:s,sideOffset:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});Kt.displayName=J.Content.displayName;const Ge=a.forwardRef(({className:t,inset:e,...r},o)=>{const s=wt(),i=$t();return n.jsx(J.Item,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,ee({variant:i.variant})),...r,dir:s})});Ge.displayName=J.Item.displayName;const Gt=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=$t();return n.jsxs(J.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ee({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Gt.displayName=J.CheckboxItem.displayName;const ar=a.forwardRef(({className:t,children:e,...r},o)=>{const s=$t();return n.jsxs(J.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ee({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});ar.displayName=J.RadioItem.displayName;const Ie=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(J.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ie.displayName=J.Label.displayName;const ve=a.forwardRef(({className:t,...e},r)=>n.jsx(J.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ve.displayName=J.Separator.displayName;function Jo({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Jo.displayName="DropdownMenuShortcut";function Lr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:l,canEditOrDelete:c=!1}){const[w,d]=a.useState(!1),[p,m]=a.useState(),h=a.useRef(null);a.useEffect(()=>{if(!w)return;let C=!0;const z=h.current;if(!z)return;const F=setTimeout(()=>{C&&Ao(z)},300);return()=>{C=!1,clearTimeout(F)}},[w]);const u=a.useCallback(C=>{C&&C.stopPropagation(),d(!1),m(void 0),l==null||l(!1)},[l]),g=a.useCallback(async C=>{if(C&&C.stopPropagation(),!p||!s)return;await s(t.id,rn(p))&&(d(!1),m(void 0),l==null||l(!1))},[p,s,t.id,l]),b=a.useMemo(()=>{const C=new Date(t.date),z=y.formatRelativeDate(C,r["%comment_date_today%"],r["%comment_date_yesterday%"]),F=C.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return y.formatReplacementString(r["%comment_dateAtTime%"],{date:z,time:F})},[t.date,r]),v=a.useMemo(()=>t.user,[t.user]),S=a.useMemo(()=>t.user.split(" ").map(C=>C[0]).join("").toUpperCase().slice(0,2),[t.user]),j=a.useMemo(()=>y.sanitizeHtml(t.contents),[t.contents]),_=a.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ge,{onClick:C=>{C.stopPropagation(),d(!0),m(gl(t.contents)),l==null||l(!0)},children:[n.jsx(N.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ge,{onClick:async C=>{C.stopPropagation(),i&&await i(t.id)},children:[n.jsx(N.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,i,l]);return n.jsxs("div",{className:f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(tr,{className:"tw-h-8 tw-w-8",children:n.jsx(er,{className:"tw-text-xs tw-font-medium",children:S})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:v}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:b}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(he,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",tn(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:C=>{C.key==="Escape"?(C.preventDefault(),C.stopPropagation(),u()):Jn(C)&&(C.preventDefault(),C.stopPropagation(),Dt(p)&&g())},onKeyDown:C=>{Wn(C),(C.key==="Enter"||C.key===" ")&&C.stopPropagation()},onClick:C=>{C.stopPropagation()},children:[n.jsx(nn,{className:f('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:C=>m(C)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(B,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(N.X,{})}),n.jsx(B,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(p),children:n.jsx(N.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:f("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:j}})]})]}),_&&n.jsxs(Zt,{children:[n.jsx(le,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"icon",children:n.jsx(N.MoreHorizontal,{})})}),n.jsx(Kt,{align:"end",children:_})]})]})}const $r={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function _l({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:l,handleSelectThread:c,threadId:w,thread:d,threadStatus:p,handleAddCommentToThread:m,handleUpdateComment:h,handleDeleteComment:u,handleReadStatusChange:g,assignableUsers:b,canUserAddCommentToThread:v,canUserAssignThreadCallback:S,canUserResolveThreadCallback:j,canUserEditOrDeleteCommentCallback:_,isRead:C=!1,autoReadDelay:z=5,onVerseRefClick:F}){const[T,L]=a.useState($r),[E,M]=a.useState(void 0),V=o,[P,O]=a.useState(!1),[A,U]=a.useState(!1),[I,H]=a.useState(!1),[Nt,Tt]=a.useState(!1),[St,pt]=a.useState(!1),[at,G]=a.useState(C),[tt,et]=a.useState(!1),rt=a.useRef(void 0),[ft,Xt]=a.useState(new Map);a.useEffect(()=>{let R=!0;return(async()=>{const dt=j?await j(w):!1;R&&pt(dt)})(),()=>{R=!1}},[w,j]),a.useEffect(()=>{let R=!0;if(!o){Tt(!1),Xt(new Map);return}return(async()=>{const dt=S?await S(w):!1;R&&Tt(dt)})(),()=>{R=!1}},[o,w,S]);const Ft=a.useMemo(()=>e.filter(R=>!R.deleted),[e]);a.useEffect(()=>{let R=!0;if(!o||!_){Xt(new Map);return}return(async()=>{const dt=new Map;await Promise.all(Ft.map(async jr=>{const ya=await _(jr.id);R&&dt.set(jr.id,ya)})),R&&Xt(dt)})(),()=>{R=!1}},[o,Ft,_]);const Wt=a.useMemo(()=>Ft[0],[Ft]),je=a.useRef(null),ne=a.useRef(void 0),Jt=a.useCallback(()=>{var R;(R=ne.current)==null||R.call(ne),L($r)},[]),Oe=a.useCallback(()=>{const R=!at;G(R),et(!R),g==null||g(w,R)},[at,g,w]);a.useEffect(()=>{O(!1)},[o]),a.useEffect(()=>{if(o&&!at&&!tt){const R=setTimeout(()=>{G(!0),g==null||g(w,!0)},z*1e3);return rt.current=R,()=>clearTimeout(R)}rt.current&&(clearTimeout(rt.current),rt.current=void 0)},[o,at,tt,z,w,g]);const D=a.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),k=a.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const R=tn(i,r);return y.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:R})},[i,r]),$=a.useMemo(()=>Ft.slice(1),[Ft]),K=a.useMemo(()=>$.length??0,[$.length]),q=a.useMemo(()=>K>0,[K]),nt=a.useMemo(()=>P||K<=2?$:$.slice(-2),[$,K,P]),X=a.useMemo(()=>P||K<=2?0:K-2,[K,P]),ut=a.useMemo(()=>K===1?D.singleReply:y.formatReplacementString(D.multipleReplies,{count:K}),[K,D]),ot=a.useMemo(()=>X===1?D.singleReply:y.formatReplacementString(D.multipleReplies,{count:X}),[X,D]);a.useEffect(()=>{!o&&A&&q&&U(!1)},[o,A,q]);const kt=a.useCallback(async R=>{R&&R.stopPropagation();const mt=Dt(T)?rn(T):void 0;if(E!==void 0){await m({threadId:w,contents:mt,assignedUser:E})&&(M(void 0),mt&&Jt());return}mt&&await m({threadId:w,contents:mt})&&Jt()},[Jt,T,m,E,w]),Mt=a.useCallback(async R=>{const mt=Dt(T)?rn(T):void 0,dt=await m({...R,contents:mt,assignedUser:E??R.assignedUser});return dt&&mt&&Jt(),dt&&E!==void 0&&M(void 0),dt},[Jt,T,m,E]);return n.jsx(Zn,{role:"option","aria-selected":o,id:w,className:f("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&at,"tw-bg-background":o&&p!=="Resolved"&&at,"tw-bg-muted":p==="Resolved","tw-bg-accent":!at&&!o&&p!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(Qn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[k&&n.jsx(he,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:k}),n.jsx(B,{variant:"ghost",size:"icon",onClick:R=>{R.stopPropagation(),Oe()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":at?"Mark as unread":"Mark as read",children:at?n.jsx(N.MailOpen,{}):n.jsx(N.Mail,{})}),St&&p!=="Resolved"&&n.jsx(B,{variant:"ghost",size:"icon",className:f("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:R=>{R.stopPropagation(),Mt({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:je,className:f("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":V},{"tw-whitespace-nowrap":!V}),children:[s&&F?n.jsx(B,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:R=>{R.stopPropagation(),F(d)},children:s}):s,n.jsxs("span",{className:t,children:[Wt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Wt.selectedText}),Wt.contextAfter]})]})}),n.jsx(Lr,{comment:Wt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:Mt,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:U,canEditOrDelete:(!A&&ft.get(Wt.id))??!1,canUserResolveThread:St})]}),n.jsxs(n.Fragment,{children:[q&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ie,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ut})]}),!o&&Dt(T)&&n.jsx(nn,{editorSerializedState:T,onSerializedChange:R=>L(R),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[X>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:R=>{R.stopPropagation(),O(!0)},role:"button",tabIndex:0,onKeyDown:R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),R.stopPropagation(),O(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ie,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ot}),P?n.jsx(N.ChevronUp,{}):n.jsx(N.ChevronDown,{})]})]}),nt.map(R=>n.jsx("div",{children:n.jsx(Lr,{comment:R,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:u,onEditingChange:U,canEditOrDelete:(!A&&ft.get(R.id))??!1})},R.id)),v!==!1&&(!A||Dt(T))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:R=>R.stopPropagation(),onKeyDownCapture:R=>{Jn(R)&&(R.preventDefault(),R.stopPropagation(),(Dt(T)||E!==void 0)&&kt())},onKeyDown:R=>{Wn(R),(R.key==="Enter"||R.key===" ")&&R.stopPropagation()},children:[n.jsx(nn,{editorSerializedState:T,onSerializedChange:R=>L(R),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:R=>{ne.current=R}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[E!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:y.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:tn(E,r)})}),n.jsxs(Ht,{open:I,onOpenChange:H,children:[n.jsx(te,{asChild:!0,children:n.jsx(B,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Nt||!b||b.length===0||!b.includes(l),"aria-label":"Assign user",children:n.jsx(N.AtSign,{})})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:R=>{R.key==="Escape"&&(R.stopPropagation(),H(!1))},children:n.jsx(qt,{children:n.jsx(Ut,{children:b==null?void 0:b.map(R=>n.jsx(Pt,{onSelect:()=>{M(R!==i?R:void 0),H(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:tn(R,r)})},R||"unassigned"))})})})]}),n.jsx(B,{size:"icon",onClick:kt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(T)&&E===void 0,"aria-label":"Submit comment",children:n.jsx(N.ArrowUp,{})})]})]})]})]})]})})}function Cl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:b,onVerseRefClick:v}){const[S,j]=a.useState(new Set),[_,C]=a.useState();a.useEffect(()=>{g&&(j(O=>new Set(O).add(g)),C(g))},[g]);const z=r.filter(O=>O.comments.some(A=>!A.deleted)),F=z.map(O=>({id:O.id})),T=a.useCallback(O=>{j(A=>new Set(A).add(O.id)),C(O.id),b==null||b(O.id)},[b]),L=a.useCallback(O=>{const A=S.has(O);j(U=>{const I=new Set(U);return I.has(O)?I.delete(O):I.add(O),I}),C(O),b==null||b(A?void 0:O)},[S,b]),{listboxRef:E,activeId:M,handleKeyDown:V}=zo({options:F,onOptionSelect:T}),P=a.useCallback(O=>{O.key==="Escape"?(_&&S.has(_)&&(j(A=>{const U=new Set(A);return U.delete(_),U}),C(void 0),b==null||b(void 0)),O.preventDefault(),O.stopPropagation()):V(O)},[_,S,V,b]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:E,"aria-activedescendant":M??void 0,"aria-label":"Comments",className:f("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:P,children:z.map(O=>n.jsx("div",{id:O.id,className:f({"tw-opacity-60":O.status==="Resolved"}),children:n.jsx(_l,{classNameForVerseText:e,comments:O.comments,localizedStrings:s,verseRef:O.verseRef,handleSelectThread:L,threadId:O.id,thread:O,isRead:O.isRead,isSelected:S.has(O.id),currentUser:o,assignedUser:O.assignedUser,threadStatus:O.status,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:v})},O.id))})}function El({table:t}){return n.jsxs(Zt,{children:[n.jsx(Hr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(N.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Kt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ie,{children:"Toggle columns"}),n.jsx(ve,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Gt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const ge=st.Root,Zo=st.Group,xe=st.Value,Qo=Qt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),ce=a.forwardRef(({className:t,children:e,size:r,...o},s)=>{const i=wt();return n.jsxs(st.Trigger,{className:f(Qo({size:r,className:t})),ref:s,...o,dir:i,children:[e,n.jsx(st.Icon,{asChild:!0,children:n.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});ce.displayName=st.Trigger.displayName;const ir=a.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollUpButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(N.ChevronUp,{className:"tw-h-4 tw-w-4"})}));ir.displayName=st.ScrollUpButton.displayName;const lr=a.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollDownButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4"})}));lr.displayName=st.ScrollDownButton.displayName;const de=a.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const i=wt();return n.jsx(st.Portal,{children:n.jsxs(st.Content,{ref:s,className:f("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(ir,{}),n.jsx(st.Viewport,{className:f("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(lr,{})]})})});de.displayName=st.Content.displayName;const ts=a.forwardRef(({className:t,...e},r)=>n.jsx(st.Label,{ref:r,className:f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));ts.displayName=st.Label.displayName;const _t=a.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(st.Item,{ref:o,className:f("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(st.ItemIndicator,{children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(st.ItemText,{children:e})]}));_t.displayName=st.Item.displayName;const es=a.forwardRef(({className:t,...e},r)=>n.jsx(st.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));es.displayName=st.Separator.displayName;function Sl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(ge,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(ce,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(xe,{placeholder:t.getState().pagination.pageSize})}),n.jsx(de,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(_t,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(N.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(N.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(N.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(N.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Fr=`
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
`;function Rl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ke(t,e){const r=e?`${Fr}, ${e}`:Fr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Rl(o))}const qe=a.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=a.useRef(null);a.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),a.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{Ke(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const i=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),Ke(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});qe.displayName="Table";const Ue=a.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Ue.displayName="TableHeader";const He=a.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:f("[&_tr:last-child]:tw-border-0",t),...e}));He.displayName="TableBody";const ns=a.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));ns.displayName="TableFooter";function Tl(t){a.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ke(t.current):[],i=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?i+1:i-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Ml(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Dl(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Bt=a.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const l=a.useRef(null);a.useEffect(()=>{typeof i=="function"?i(l.current):i&&"current"in i&&(i.current=l.current)},[i]),Tl(l);const c=a.useMemo(()=>l.current?Ke(l.current):[],[l]),w=a.useCallback(p=>{const{current:m}=l;if(!m||!m.parentElement)return;const h=m.closest("table"),u=h?Ke(h).filter(v=>v.tagName==="TR"):[],g=u.indexOf(m),b=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Dl(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Ml(c,b,p.key);else if(p.key==="Escape"){p.preventDefault();const v=m.closest("table");v&&v.focus()}e==null||e(p)},[l,c,e]),d=a.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:w,onFocus:d,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Bt.displayName="TableRow";const Re=a.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Re.displayName="TableHead";const se=a.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));se.displayName="TableCell";const rs=a.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));rs.displayName="TableCaption";function on({className:t,...e}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function os({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:l=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var F;const[p,m]=a.useState([]),[h,u]=a.useState([]),[g,b]=a.useState({}),[v,S]=a.useState({}),j=a.useMemo(()=>e??[],[e]),_=xt.useReactTable({data:j,columns:t,getCoreRowModel:xt.getCoreRowModel(),...r&&{getPaginationRowModel:xt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:xt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:xt.getFilteredRowModel(),onColumnVisibilityChange:b,onRowSelectionChange:S,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:v}}),C=_.getVisibleFlatColumns();let z;return w?z=Array.from({length:10}).map((E,M)=>`skeleton-row-${M}`).map(E=>n.jsx(Bt,{className:"hover:tw-bg-transparent",children:n.jsx(se,{colSpan:C.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(on,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},E)):((F=_.getRowModel().rows)==null?void 0:F.length)>0?z=_.getRowModel().rows.map(T=>n.jsx(Bt,{onClick:()=>l(T,_),"data-state":T.getIsSelected()&&"selected",children:T.getVisibleCells().map(L=>n.jsx(se,{children:xt.flexRender(L.column.columnDef.cell,L.getContext())},L.id))},T.id)):z=n.jsx(Bt,{children:n.jsx(se,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(El,{table:_}),n.jsxs(qe,{stickyHeader:i,children:[n.jsx(Ue,{stickyHeader:i,children:_.getHeaderGroups().map(T=>n.jsx(Bt,{children:T.headers.map(L=>n.jsx(Re,{className:"tw-p-0",children:L.isPlaceholder?void 0:xt.flexRender(L.column.columnDef.header,L.getContext())},L.id))},T.id))}),n.jsx(He,{children:z})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(B,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),n.jsx(B,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Sl,{table:_})]})}function Il({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=a.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Pa,{options:i,children:e})})}const ss=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Vr=(t,e)=>t[e]??e;function as({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Vr(r,"%webView_error_dump_header%"),i=Vr(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(N.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Ol=Object.freeze([...ss,"%webView_error_dump_copied_message%"]);function Al({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[l,c]=a.useState(!1),w=()=>{c(!0),e&&e()},d=p=>{p||c(!1)};return n.jsxs(Ht,{onOpenChange:d,children:[n.jsx(te,{asChild:!0,children:o}),n.jsxs(Lt,{id:i,className:f("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(lt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(as,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var is=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(is||{});function Pl({id:t,label:e,groups:r}){const[o,s]=a.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[i,l]=a.useState({}),c=(d,p)=>{const m=!o[d][p];s(u=>(u[d][p]=m,{...u}));const h=r[d].items[p];h.onUpdate(h.id,m)},w=(d,p)=>{l(h=>(h[d]=p,{...h}));const m=r[d].items.find(h=>h.id===p);m?m.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Zt,{children:[n.jsx(le,{asChild:!0,children:n.jsxs(B,{variant:"default",children:[n.jsx(N.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(N.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Kt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Ie,{children:d.label}),n.jsx(rr,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((m,h)=>n.jsx("div",{children:n.jsx(Gt,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:m.label})},m.id))}):n.jsx(Wo,{value:i[p],onValueChange:m=>w(p,m),children:d.items.map(m=>n.jsx("div",{children:n.jsx(ar,{value:m.id,children:m.label})},m.id))})}),n.jsx(ve,{})]},d.label))})]})})}function Ll({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:l,handleSupportLinkClick:c}){const w=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,m)=>p+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(N.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(N.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(N.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function $l({id:t,versionHistory:e}){const[r,o]=a.useState(!1),s=new Date;function i(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,m=d.getUTCMonth(),h=d.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:m>0?u=`${m.toString()} month${m===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const l=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Fl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const l=a.useMemo(()=>y.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(y.getCurrentLocale(),{type:"language"});return d.map(m=>p.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx($l,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function ls({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:m=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:b="ghost",id:v}){const[S,j]=a.useState(!1),_=a.useCallback(M=>{var P;const V=(P=t.find(O=>O.label===M))==null?void 0:P.value;V&&r(e.includes(V)?e.filter(O=>O!==V):[...e,V])},[t,e,r]),C=()=>w||o,z=a.useMemo(()=>{if(!h)return t;const M=t.filter(P=>P.starred).sort((P,O)=>P.label.localeCompare(O.label)),V=t.filter(P=>!P.starred).sort((P,O)=>{const A=e.includes(P.value),U=e.includes(O.value);return A&&!U?-1:!A&&U?1:P.label.localeCompare(O.label)});return[...M,...V]},[t,e,h]),F=()=>{r(t.map(M=>M.value))},T=()=>{r([])},L=d??S,E=p??j;return n.jsx("div",{id:v,className:g,children:n.jsxs(Ht,{open:L,onOpenChange:E,children:[n.jsx(te,{asChild:!0,children:n.jsxs(B,{variant:b,role:"combobox","aria-expanded":L,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:C()})]}),n.jsx(N.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(qt,{children:[n.jsx(be,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:F,children:i}),n.jsx(B,{variant:"ghost",size:"sm",onClick:T,children:l})]}),n.jsxs(Ut,{children:[n.jsx(De,{children:c}),n.jsx(Ot,{children:z.map(M=>n.jsxs(Pt,{value:M.label,onSelect:_,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(N.Check,{className:f("tw-h-4 tw-w-4",e.includes(M.value)?"tw-opacity-100":"tw-opacity-0")})}),M.starred&&n.jsx(N.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:M.label}),M.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:M.secondaryLabel})]},M.label))})]})]})})]})})}function Vl({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(ls,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var u;return n.jsxs(he,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(N.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(g=>g.value===h))==null?void 0:u.label]},h)})}):n.jsx(lt,{children:p})]})}const sn=a.forwardRef(({className:t,...e},r)=>n.jsx("kbd",{ref:r,className:f("pr-twp tw-rounded tw-border tw-border-border tw-bg-muted tw-px-1 tw-py-0.5 tw-font-mono tw-text-xs",t),...e}));sn.displayName="Kbd";const cs=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),zr=(t,e)=>t[e]??e;function ds({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:i=!0,className:l="tw-h-6 tw-w-6",variant:c="ghost"}){const w=a.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]),d=zr(s,"%undoButton_tooltip%"),p=zr(s,"%redoButton_tooltip%"),m=c==="secondary"||c==="default";return n.jsxs(Lo,{children:[n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:n.jsx(B,{"aria-label":d,className:l,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(N.Undo,{})})}),n.jsx(vt,{children:n.jsxs("p",{children:[d,i&&n.jsxs(n.Fragment,{children:[" ",n.jsx(sn,{children:w?"⌘Z":"Ctrl+Z"})]})]})})]})}),e&&m&&n.jsx($o,{}),e&&n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:n.jsx(B,{"aria-label":p,className:l,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(N.Redo,{})})}),n.jsx(vt,{children:n.jsxs("p",{children:[p,i&&n.jsxs(n.Fragment,{children:[" ",n.jsx(sn,{children:w?"⌘⇧Z":"Ctrl+Y"})]})]})})]})})]})}function ws({children:t,editorRef:e,canUndo:r=!0,canRedo:o=!0}){const s=a.useRef(null);return a.useEffect(()=>{var w;const i=/Macintosh/i.test(navigator.userAgent),l=((w=s.current)==null?void 0:w.querySelector(".editor-input"))??void 0,c=d=>{var m,h,u,g;if(!l||document.activeElement!==l)return;const p=d.key.toLowerCase();if(i){if(!d.metaKey)return;!d.shiftKey&&p==="z"?(d.preventDefault(),r&&((m=e.current)==null||m.undo())):d.shiftKey&&p==="z"&&(d.preventDefault(),o&&((h=e.current)==null||h.redo()))}else{if(!d.ctrlKey)return;!d.shiftKey&&p==="z"?(d.preventDefault(),r&&((u=e.current)==null||u.undo())):(p==="y"||d.shiftKey&&p==="z")&&(d.preventDefault(),o&&((g=e.current)==null||g.redo()))}};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[o,r,e]),n.jsx("div",{ref:s,children:t})}const ye=a.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));ye.displayName="Input";const zl=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Bl({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=a.useRef(null),l=a.useRef(null),c=a.useRef(!1),[w,d]=a.useState(t),[p,m]=a.useState(r),[h,u]=a.useState(!1);a.useEffect(()=>{d(t)},[t]),a.useEffect(()=>{p!==r&&m(r)},[r]);const g=v=>{c.current=!1,u(v),v||(w!=="custom"||p?(e(w),o(p)):(d(t),m(r)))},b=v=>{var S,j,_,C;v.stopPropagation(),document.activeElement===l.current&&v.key==="ArrowDown"||v.key==="ArrowRight"?((S=i.current)==null||S.focus(),c.current=!0):document.activeElement===i.current&&v.key==="ArrowUp"?((j=l.current)==null||j.focus(),c.current=!1):document.activeElement===i.current&&v.key==="ArrowLeft"&&((_=i.current)==null?void 0:_.selectionStart)===0&&((C=l.current)==null||C.focus(),c.current=!1),w==="custom"&&v.key==="Enter"&&(document.activeElement===l.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(Zt,{open:h,onOpenChange:g,children:[n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:n.jsx(le,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:zl(t,s,r)})})}),n.jsx(vt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Kt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:b,onMouseMove:()=>{var v;c.current&&((v=i.current)==null||v.focus())},children:[n.jsx(Ie,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(ve,{}),n.jsx(Gt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Rt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Gt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Rt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Gt,{ref:l,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:v=>{var S;v.stopPropagation(),c.current=!0,(S=i.current)==null||S.focus()},onSelect:v=>v.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(ye,{tabIndex:0,onMouseDown:v=>{v.stopPropagation(),d("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:v=>{v.key==="Enter"||v.key==="ArrowUp"||v.key==="ArrowDown"||v.key==="ArrowLeft"||v.key==="ArrowRight"||v.stopPropagation()},maxLength:1,onChange:v=>m(v.target.value)})]})})]})]})}const Gl=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(N.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(N.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(N.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Kl=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),y.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function ql({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Zt,{children:[n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(qr.TooltipTrigger,{asChild:!0,children:n.jsx(le,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:Gl(t,r)})})}),n.jsx(vt,{children:n.jsx("p",{children:Kl(t,r)})})]})}),n.jsxs(Kt,{className:"tw-z-[300]",children:[n.jsx(Ie,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(ve,{}),n.jsxs(Gt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(N.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(N.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(N.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const ps=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Ul({icon:t,className:e}){const r=t??N.Ban;return n.jsx(r,{className:e,size:16})}function Br({item:t,localizedStrings:e}){return n.jsxs(Pt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(Ul,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(no,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function us({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=a.useState(""),[i,l]=a.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const w=e.filter(p=>{var m;return(m=p.marker)==null?void 0:m.toLowerCase().includes(c)}),d=e.filter(p=>p.title.toLowerCase().includes(c)&&!w.includes(p));return[w,d]},[o,e]);return n.jsxs(qt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(be,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Ut,{children:[n.jsx(De,{children:t["%markerMenu_noResults%"]}),n.jsx(Ot,{children:i.map(c=>{var w;return n.jsx(Br,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})}),l.length>0&&n.jsxs(n.Fragment,{children:[i.length>0&&n.jsx(zn,{alwaysRender:!0}),n.jsx(Ot,{children:l.map(c=>{var w;return n.jsx(Br,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function Hl(t,e,r,o){if(!o||o==="p")return[];const s=y.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,l])=>{i.push(...l.map(c=>({marker:c,title:r[y.usfmMarkers[c].description]??y.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),i.sort((l,c)=>(l.marker??l.title).localeCompare(c.marker??c.title))}function Yl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Xl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Wl={type:"USJ",version:"3.1",content:[{type:"para"}]};function Jl({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:l,defaultMarkerMenuTrigger:c,localizedStrings:w,parentEditorRef:d}){const p=a.useRef(null),m=a.useRef(null),h=a.useRef(null),u=a.useRef(null);a.useLayoutEffect(()=>{if(!u.current)return;const{width:k}=u.current.getBoundingClientRect();k>0&&(u.current.style.width=`${k}px`)},[]);const[g,b]=a.useState("generated"),[v,S]=a.useState("*"),[j,_]=a.useState("f"),[C,z]=a.useState(!1),[F,T]=a.useState(!0),[L,E]=a.useState(!1),M=a.useRef(!1),V=a.useRef(""),[P,O]=a.useState(!1),[A,U]=a.useState(),[I,H]=a.useState(),[Nt,Tt]=a.useState(),[St,pt]=a.useState(),at=a.useRef(null),G=a.useMemo(()=>({...l,markerMenuTrigger:c,hasExternalUI:!0,view:{...l.view??Rt.getDefaultViewOptions(),noteMode:"expanded"}}),[l,c]),tt=a.useMemo(()=>Hl(p,()=>O(!1),w,St),[w,St]);a.useEffect(()=>{var k;P||(k=p.current)==null||k.focus()},[j,P]),a.useEffect(()=>{var K,q;let k;M.current=!1,T(!0);const $=e==null?void 0:e.at(0);if($&&Rt.isInsertEmbedOpOfType("note",$)){const nt=(K=$.insert.note)==null?void 0:K.caller;let X="custom";nt===Rt.GENERATOR_NOTE_CALLER?X="generated":nt===Rt.HIDDEN_NOTE_CALLER?X="hidden":nt&&S(nt),b(X),_(((q=$.insert.note)==null?void 0:q.style)??"f"),k=setTimeout(()=>{var ut;(ut=p.current)==null||ut.applyUpdate([$])},0)}return()=>{k&&clearTimeout(k)}},[e,i]);const et=a.useCallback((k,$,K=!1)=>{var nt,X,ut;const q=(X=(nt=p.current)==null?void 0:nt.getNoteOps(0))==null?void 0:X.at(0);if(q&&Rt.isInsertEmbedOpOfType("note",q)){if(q.insert.note){let ot;k==="custom"?ot=$:k==="generated"?ot=Rt.GENERATOR_NOTE_CALLER:ot=Rt.HIDDEN_NOTE_CALLER,q.insert.note.caller=ot}r==null||r([q]),K&&d&&i&&((ut=d.current)==null||ut.replaceEmbedUpdate(i,[q]))}},[i,r,d]),rt=a.useCallback(()=>{et(g,v,!0),o()},[g,v,o,et]),ft=a.useRef(rt);a.useLayoutEffect(()=>{ft.current=rt});const Xt=a.useRef({book:s.book,chapterNum:s.chapterNum});a.useLayoutEffect(()=>{(Xt.current.book!==s.book||Xt.current.chapterNum!==s.chapterNum)&&(Xt.current={book:s.book,chapterNum:s.chapterNum},ft.current())},[s.book,s.chapterNum]);const Ft=()=>{var $;const k=($=m.current)==null?void 0:$.getElementsByClassName("editor-input")[0];k!=null&&k.textContent&&navigator.clipboard.writeText(k.textContent)},Wt=a.useCallback(k=>{b(k),et(k,v)},[v,et]),je=a.useCallback(k=>{S(k),et(g,k)},[g,et]),ne=k=>{var K,q,nt,X,ut;_(k);const $=(q=(K=p.current)==null?void 0:K.getNoteOps(0))==null?void 0:q.at(0);if($&&Rt.isInsertEmbedOpOfType("note",$)){$.insert.note&&($.insert.note.style=k);const ot=(X=(nt=$.insert.note)==null?void 0:nt.contents)==null?void 0:X.ops;j!=="x"&&k==="x"?ot==null||ot.forEach(kt=>Yl(kt)):j==="x"&&k!=="x"&&(ot==null||ot.forEach(kt=>Xl(kt))),(ut=p.current)==null||ut.applyUpdate([$,{delete:1}])}},Jt=k=>{pt(k.contextMarker),E(k.canRedo)},Oe=a.useCallback(k=>{var K,q,nt,X,ut;const $=(q=(K=p.current)==null?void 0:K.getNoteOps(0))==null?void 0:q.at(0);if($&&Rt.isInsertEmbedOpOfType("note",$)){k.content.length>1&&setTimeout(()=>{var Mt;(Mt=p.current)==null||Mt.applyUpdate([{retain:2},{delete:1}])},0);const ot=(nt=$.insert.note)==null?void 0:nt.style,kt=(ut=(X=$.insert.note)==null?void 0:X.contents)==null?void 0:ut.ops;if(ot||z(!1),z(ot==="x"?!!(kt!=null&&kt.every(Mt=>{var mt,dt;if(!((mt=Mt.attributes)!=null&&mt.char))return!0;const R=((dt=Mt.attributes)==null?void 0:dt.char).style;return R==="xt"||R==="xo"||R==="xq"})):!!(kt!=null&&kt.every(Mt=>{var mt,dt;if(!((mt=Mt.attributes)!=null&&mt.char))return!0;const R=((dt=Mt.attributes)==null?void 0:dt.char).style;return R==="ft"||R==="fr"||R==="fq"}))),!M.current){M.current=!0,V.current=JSON.stringify($),T(!0);return}T(JSON.stringify($)===V.current),et(g,v)}else z(!1),T(!0)},[g,v,et]),D=a.useCallback(()=>{const k=window.getSelection();if(h.current&&tt.length&&k&&k.rangeCount>0){const $=k.getRangeAt(0).getBoundingClientRect(),K=h.current.getBoundingClientRect();U($.left-K.left),H($.top-K.top),Tt($.height),O(!0)}},[tt,h]);return a.useEffect(()=>{const k=()=>{P&&O(!1)};return window.addEventListener("click",k),()=>{window.removeEventListener("click",k)}},[P]),a.useEffect(()=>{var k;P&&((k=at.current)==null||k.focus())},[P]),a.useEffect(()=>{var K;const k=((K=m.current)==null?void 0:K.querySelector(".editor-input"))??void 0,$=q=>{!P&&k&&document.activeElement===k&&q.key===c?(q.preventDefault(),D()):P&&q.key==="Escape"&&(q.preventDefault(),O(!1))};return document.addEventListener("keydown",$),()=>{document.removeEventListener("keydown",$)}},[P,D,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:u,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(ql,{isTypeSwitchable:C,noteType:j,handleNoteTypeChange:ne,localizedStrings:w}),n.jsx(Bl,{callerType:g,updateCallerType:Wt,customCaller:v,updateCustomCaller:je,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(ds,{onUndoClick:()=>{var k;return(k=p.current)==null?void 0:k.undo()},onRedoClick:()=>{var k;return(k=p.current)==null?void 0:k.redo()},canUndo:!F,canRedo:L,localizedStrings:w}),n.jsx(Vo,{onCancelClick:o,onAcceptClick:rt,canAccept:!F,localizedStrings:w})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(ws,{editorRef:p,canUndo:!F,canRedo:L,children:n.jsx(Rt.Editorial,{options:G,onStateChange:Jt,onUsjChange:Oe,defaultUsj:Wl,onScrRefChange:()=>{},scrRef:s,ref:p})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:n.jsx(B,{onClick:Ft,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(N.Copy,{})})}),n.jsx(vt,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:h,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Ht,{open:P,children:[n.jsx(ao,{className:"tw-absolute",style:{top:I,left:A,height:Nt,width:0,pointerEvents:"none"}}),n.jsx(Lt,{className:"tw-w-[500px] tw-p-0",onClick:k=>{k.preventDefault(),k.stopPropagation()},children:n.jsx(us,{markerMenuItems:tt,localizedStrings:w,searchRef:at})})]})]})}const Zl=Object.freeze([...ps,...Object.entries(y.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...cs,...Fo]);function ms(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Ql(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&i.push(l),l=[c]):l.push(c)}),l.length>0&&i.push(l),i.map((c,w)=>{const d=w===i.length-1;return n.jsxs("p",{children:[cr(t,c,r,!0,s),d&&o]},ms(t,c))})}function cr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const l=`${t}-text-${i.slice(0,10)}`;if(o){const c=f(`usfm_${t}`);return n.jsx("span",{className:c,children:i},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(N.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(N.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return tc(i,ms(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function tc(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(N.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),cr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function fs({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),m=l&&n.jsxs(n.Fragment,{children:[cr(t.marker,[l],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",b=f(h,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",b),children:[w,p]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",b),children:m}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,b),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Ql(t.marker,c,o,d)})})]})}function ec({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??y.getFormatCallerFunction(r,void 0),m=(j,_)=>{d==null||d(j,_,s)},h=i?r.findIndex(j=>j===i):-1,[u,g]=a.useState(h),b=(j,_,C)=>{if(r.length)switch(j.key){case"Enter":case" ":j.preventDefault(),d==null||d(_,C,s);break}},v=j=>{if(r.length)switch(j.key){case"ArrowDown":j.preventDefault(),g(_=>Math.min(_+1,r.length-1));break;case"ArrowUp":j.preventDefault(),g(_=>Math.max(_-1,0));break}},S=a.useRef([]);return a.useEffect(()=>{var j;u>=0&&u<S.current.length&&((j=S.current[u])==null||j.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",t),onKeyDown:v,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((j,_)=>{const C=j===i,z=`${s}-${_}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:F=>{S.current[_]=F},role:"option","aria-selected":C,"data-marker":j.marker,"data-state":C?"selected":void 0,tabIndex:_===u?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(j,_),onKeyDown:F=>b(F,j,_),children:n.jsx(fs,{footnote:j,layout:o,formatCaller:()=>p(j.caller,_),showMarkers:l})},z),_<r.length-1&&o==="vertical"&&n.jsx(ie,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function nc(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function rc({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],l=a.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[t]);return n.jsxs(qe,{stickyHeader:!0,children:[n.jsx(Ue,{stickyHeader:!0,children:n.jsxs(Bt,{children:[n.jsx(Re,{children:s}),n.jsx(Re,{children:i})]})}),n.jsx(He,{children:l.length>0&&l.map(c=>n.jsxs(Bt,{onClick:()=>{e(c.reference)},children:[n.jsx(se,{children:y.formatScrRef(c.reference,"English")}),n.jsx(se,{className:o,children:nc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const gn=a.forwardRef(({className:t,...e},r)=>n.jsx(In.Root,{ref:r,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(In.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}));gn.displayName=In.Root.displayName;const oc=t=>{if(t==="asc")return n.jsx(N.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(N.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Ye=(t,e,r)=>n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsxs(Et,{className:f("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),oc(t.getIsSorted())]}),n.jsx(vt,{side:"bottom",children:e})]})}),sc=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Ye(e,t)}),ac=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Ye(r,t)}),ic=t=>({accessorKey:"count",header:({column:e})=>Ye(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),Sn=(t,e,r,o,s,i)=>{let l=[...r];t.forEach(w=>{e==="approved"?l.includes(w)||l.push(w):l=l.filter(d=>d!==w)}),o(l);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),i(c)},lc=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>Ye(i,t,"tw-justify-center"),cell:({row:i})=>{const l=i.getValue("status"),c=i.getValue("item");return n.jsxs(hn,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Ce,{onClick:w=>{w.stopPropagation(),Sn([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(N.CircleCheckIcon,{})}),n.jsx(Ce,{onClick:w=>{w.stopPropagation(),Sn([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(N.CircleXIcon,{})}),n.jsx(Ce,{onClick:w=>{w.stopPropagation(),Sn([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(N.CircleHelpIcon,{})})]})}}),cc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),dc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},wc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},hs=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",pc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),uc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},mc=(t,e,r)=>t.map(o=>{const s=y.isString(o.key)?o.key:o.key[0];return{items:y.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||hs(s,e,r),occurrences:o.occurrences||[]}}),Vt=(t,e)=>t[e]??e;function fc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:l,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:m,onItemSelected:h}){const u=Vt(r,"%webView_inventory_all%"),g=Vt(r,"%webView_inventory_approved%"),b=Vt(r,"%webView_inventory_unapproved%"),v=Vt(r,"%webView_inventory_unknown%"),S=Vt(r,"%webView_inventory_scope_currentBook%"),j=Vt(r,"%webView_inventory_scope_chapter%"),_=Vt(r,"%webView_inventory_scope_verse%"),C=Vt(r,"%webView_inventory_filter_text%"),z=Vt(r,"%webView_inventory_show_additional_items%"),F=Vt(r,"%webView_inventory_no_results%"),[T,L]=a.useState(!1),[E,M]=a.useState("all"),[V,P]=a.useState(""),[O,A]=a.useState([]),U=a.useMemo(()=>{const G=t??[];return G.length===0?[]:mc(G,s,i)},[t,s,i]),I=a.useMemo(()=>{if(T)return U;const G=[];return U.forEach(tt=>{const et=tt.items[0],rt=G.find(ft=>ft.items[0]===et);rt?(rt.count+=tt.count,rt.occurrences=rt.occurrences.concat(tt.occurrences)):G.push({items:[et],count:tt.count,occurrences:tt.occurrences,status:tt.status})}),G},[T,U]),H=a.useMemo(()=>I.length===0?[]:uc(I,E,V),[I,E,V]),Nt=a.useMemo(()=>{var et,rt;if(!T)return w;const G=(et=o==null?void 0:o.tableHeaders)==null?void 0:et.length;if(!G)return w;const tt=[];for(let ft=0;ft<G;ft++)tt.push(ac(((rt=o==null?void 0:o.tableHeaders)==null?void 0:rt[ft])||"Additional Item",ft+1));return[...tt,...w]},[o==null?void 0:o.tableHeaders,w,T]);a.useEffect(()=>{H.length===0?A([]):H.length===1&&A(H[0].items)},[H]);const Tt=(G,tt)=>{tt.setRowSelection(()=>{const rt={};return rt[G.index]=!0,rt});const et=G.original.items;A(et),h&&et.length>0&&h(et[0])},St=G=>{if(G==="book"||G==="chapter"||G==="verse")c(G);else throw new Error(`Invalid scope value: ${G}`)},pt=G=>{if(G==="all"||G==="approved"||G==="unapproved"||G==="unknown")M(G);else throw new Error(`Invalid status filter value: ${G}`)},at=a.useMemo(()=>{if(I.length===0||O.length===0)return[];const G=I.filter(tt=>y.deepEqual(T?tt.items:[tt.items[0]],O));if(G.length>1)throw new Error("Selected item is not unique");return G.length===0?[]:G[0].occurrences},[O,T,I]);return n.jsx("div",{id:d,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(ge,{onValueChange:G=>pt(G),defaultValue:E,children:[n.jsx(ce,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(xe,{placeholder:"Select filter"})}),n.jsxs(de,{children:[n.jsx(_t,{value:"all",children:u}),n.jsx(_t,{value:"approved",children:g}),n.jsx(_t,{value:"unapproved",children:b}),n.jsx(_t,{value:"unknown",children:v})]})]}),n.jsxs(ge,{onValueChange:G=>St(G),defaultValue:l,children:[n.jsx(ce,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(xe,{placeholder:"Select scope"})}),n.jsxs(de,{children:[n.jsx(_t,{value:"book",children:S}),n.jsx(_t,{value:"chapter",children:j}),n.jsx(_t,{value:"verse",children:_})]})]}),n.jsx(ye,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:C,value:V,onChange:G=>{P(G.target.value)}}),o&&n.jsx(bt,{children:n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(gn,{className:"tw-m-1 tw-flex-shrink-0",checked:T,onCheckedChange:G=>{L(G)}}),n.jsx(lt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??z})]})}),n.jsx(vt,{children:(o==null?void 0:o.checkboxText)??z})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(os,{columns:Nt,data:H,onRowClickHandler:Tt,stickyHeader:!0,isLoading:p,noResultsMessage:F})}),at.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(rc,{classNameForText:m,occurrenceData:at,setScriptureReference:e,localizedStrings:r})})]})})}const hc="16rem",gc="3rem",gs=a.createContext(void 0);function Xe(){const t=a.useContext(gs);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const dr=a.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:l="primary",...c},w)=>{const[d,p]=a.useState(t),m=e??d,h=a.useCallback(_=>{const C=typeof _=="function"?_(m):_;r?r(C):p(C)},[r,m]),u=a.useCallback(()=>h(_=>!_),[h]),g=m?"expanded":"collapsed",S=wt()==="ltr"?l:l==="primary"?"secondary":"primary",j=a.useMemo(()=>({state:g,open:m,setOpen:h,toggleSidebar:u,side:S}),[g,m,h,u,S]);return n.jsx(gs.Provider,{value:j,children:n.jsx(bt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":hc,"--sidebar-width-icon":gc,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:i})})})});dr.displayName="SidebarProvider";const wr=a.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},i)=>{const l=Xe();return e==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});wr.displayName="Sidebar";const xs=a.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Xe();return n.jsxs(B,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(N.PanelLeft,{}):n.jsx(N.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});xs.displayName="SidebarTrigger";const bs=a.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Xe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});bs.displayName="SidebarRail";const pr=a.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));pr.displayName="SidebarInset";const vs=a.forwardRef(({className:t,...e},r)=>n.jsx(ye,{ref:r,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));vs.displayName="SidebarInput";const ys=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ys.displayName="SidebarHeader";const js=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));js.displayName="SidebarFooter";const Ns=a.forwardRef(({className:t,...e},r)=>n.jsx(ie,{ref:r,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Ns.displayName="SidebarSeparator";const ur=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));ur.displayName="SidebarContent";const an=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));an.displayName="SidebarGroup";const ln=a.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Te.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});ln.displayName="SidebarGroupLabel";const ks=a.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Te.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});ks.displayName="SidebarGroupAction";const cn=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",t),...e}));cn.displayName="SidebarGroupContent";const mr=a.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));mr.displayName="SidebarMenu";const fr=a.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",t),...e}));fr.displayName="SidebarMenuItem";const xc=Qt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),hr=a.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,...l},c)=>{const w=t?Te.Slot:"button",{state:d}=Xe(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:f(xc({variant:r,size:o}),i),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:p}),n.jsx(vt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});hr.displayName="SidebarMenuButton";const _s=a.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const i=e?Te.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});_s.displayName="SidebarMenuAction";const Cs=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Cs.displayName="SidebarMenuBadge";const Es=a.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=a.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(on,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(on,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Es.displayName="SidebarMenuSkeleton";const Ss=a.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ss.displayName="SidebarMenuSub";const Rs=a.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Rs.displayName="SidebarMenuSubItem";const Ts=a.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},i)=>{const l=t?Te.Slot:"a";return n.jsx(l,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Ts.displayName="SidebarMenuSubButton";function Ms({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:w}){const d=a.useCallback((h,u)=>{o(h,u)},[o]),p=a.useCallback(h=>{const u=r.find(g=>g.projectId===h);return u?u.projectName:h},[r]),m=a.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(wr,{id:t,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(ur,{children:[n.jsxs(an,{children:[n.jsx(ln,{className:"tw-text-sm",children:i}),n.jsx(cn,{children:n.jsx(mr,{children:Object.entries(e).map(([h,u])=>n.jsx(fr,{children:n.jsx(hr,{onClick:()=>d(h),isActive:m(h),children:n.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),n.jsxs(an,{children:[n.jsx(ln,{className:"tw-text-sm",children:l}),n.jsx(cn,{className:"tw-pl-3",children:n.jsx(en,{buttonVariant:"ghost",buttonClassName:f("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);d(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(N.ScrollText,{})})})]})]})})}const xn=a.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:l},c)=>{const w=wt();return n.jsxs("div",{id:l,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(N.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(ye,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:i}),t&&n.jsxs(B,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(N.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});xn.displayName="SearchBar";function bc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(xn,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(dr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ms,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(pr,{className:"tw-min-w-[215px]",children:o})]})]})}const re="scrBook",vc="scrRef",ue="source",yc="details",jc="Scripture Reference",Nc="Scripture Book",Ds="Type",kc="Details";function _c(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:re,header:(t==null?void 0:t.scriptureReferenceColumnName)??jc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?it.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===re?y.formatScrRef(s.start):void 0},getGroupingValue:o=>it.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>y.formatScrRef(o.start),id:vc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:y.formatScrRef(s.start)},sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ue,header:r?(t==null?void 0:t.typeColumnName)??Ds:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:yc,header:(t==null?void 0:t.detailsColumnName)??kc,cell:o=>o.getValue(),enableGrouping:!1}]}const Cc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${e}`:`${y.scrRefToBBBCCCVVV(t.start)}+${e}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},Gr=t=>`${Cc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Ec({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:l,onRowSelected:c,id:w}){const[d,p]=a.useState([]),[m,h]=a.useState([{id:re,desc:!1}]),[u,g]=a.useState({}),b=a.useMemo(()=>t.flatMap(E=>E.data.map(M=>({...M,source:E.source}))),[t]),v=a.useMemo(()=>_c({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:l},r),[o,i,l,r]);a.useEffect(()=>{d.includes(ue)?h([{id:ue,desc:!1},{id:re,desc:!1}]):h([{id:re,desc:!1}])},[d]);const S=xt.useReactTable({data:b,columns:v,state:{grouping:d,sorting:m,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:xt.getExpandedRowModel(),getGroupedRowModel:xt.getGroupedRowModel(),getCoreRowModel:xt.getCoreRowModel(),getSortedRowModel:xt.getSortedRowModel(),getRowId:Gr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});a.useEffect(()=>{if(c){const E=S.getSelectedRowModel().rowsById,M=Object.keys(E);if(M.length===1){const V=b.find(P=>Gr(P)===M[0])||void 0;V&&c(V)}}},[u,b,c,S]);const j=s??Nc,_=i??Ds,C=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[re]},{label:`Group by ${_}`,value:[ue]},{label:`Group by ${j} and ${_}`,value:[re,ue]},{label:`Group by ${_} and ${j}`,value:[ue,re]}],z=E=>{p(JSON.parse(E))},F=(E,M)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(M)},T=(E,M)=>E.getIsGrouped()?"":f("banded-row",M%2===0?"even":"odd"),L=(E,M,V)=>{if(!((E==null?void 0:E.length)===0||M.depth<V.column.getGroupedIndex())){if(M.getIsGrouped())switch(M.depth){case 1:return"tw-ps-4";default:return}switch(M.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(ge,{value:JSON.stringify(d),onValueChange:E=>{z(E)},children:[n.jsx(ce,{className:"tw-mb-1 tw-mt-2",children:n.jsx(xe,{})}),n.jsx(de,{position:"item-aligned",children:n.jsx(Zo,{children:C.map(E=>n.jsx(_t,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),n.jsxs(qe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Ue,{children:S.getHeaderGroups().map(E=>n.jsx(Bt,{children:E.headers.filter(M=>M.column.columnDef.header).map(M=>n.jsx(Re,{colSpan:M.colSpan,className:"top-0 tw-sticky",children:M.isPlaceholder?void 0:n.jsxs("div",{children:[M.column.getCanGroup()?n.jsx(B,{variant:"ghost",title:`Toggle grouping by ${M.column.columnDef.header}`,onClick:M.column.getToggleGroupingHandler(),type:"button",children:M.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",xt.flexRender(M.column.columnDef.header,M.getContext())]})},M.id))},E.id))}),n.jsx(He,{children:S.getRowModel().rows.map((E,M)=>{const V=wt();return n.jsx(Bt,{"data-state":E.getIsSelected()?"selected":"",className:f(T(E,M)),onClick:P=>F(E,P),children:E.getVisibleCells().map(P=>{if(!(P.getIsPlaceholder()||P.column.columnDef.enableGrouping&&!P.getIsGrouped()&&(P.column.columnDef.id!==ue||!r)))return n.jsx(se,{className:f(P.column.columnDef.id,"tw-p-[1px]",L(d,E,P)),children:P.getIsGrouped()?n.jsxs(B,{variant:"link",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()&&n.jsx(N.ChevronDown,{}),!E.getIsExpanded()&&(V==="ltr"?n.jsx(N.ChevronRight,{}):n.jsx(N.ChevronLeft,{}))," ",xt.flexRender(P.column.columnDef.cell,P.getContext())," (",E.subRows.length,")"]}):xt.flexRender(P.column.columnDef.cell,P.getContext())},P.id)})},E.id)})})]})]})}const gr=(t,e)=>t.filter(r=>{try{return y.getSectionForBook(r)===e}catch{return!1}}),Is=(t,e,r)=>gr(t,e).every(o=>r.includes(o));function Sc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=gr(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(B,{variant:"outline",size:"sm",onClick:()=>o(t),className:f(Is(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Ja(t,l,c,w,d)})}const Kr=5,Rn=6;function Rc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:b}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[v,S]=a.useState(!1),[j,_]=a.useState(""),C=a.useRef(void 0),z=a.useRef(!1);if(t.length!==it.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const F=a.useMemo(()=>it.Canon.allBookIds.filter((A,U)=>t[U]==="1"&&!it.Canon.isObsolete(it.Canon.bookIdToNumber(A))),[t]),T=a.useMemo(()=>{if(!j.trim()){const I={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return F.forEach(H=>{const Nt=y.getSectionForBook(H);I[Nt].push(H)}),I}const A=F.filter(I=>Gn(I,j,s)),U={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return A.forEach(I=>{const H=y.getSectionForBook(I);U[H].push(I)}),U},[F,j,s]),L=a.useCallback((A,U=!1)=>{if(!U||!C.current){r(e.includes(A)?e.filter(pt=>pt!==A):[...e,A]),C.current=A;return}const I=F.findIndex(pt=>pt===C.current),H=F.findIndex(pt=>pt===A);if(I===-1||H===-1)return;const[Nt,Tt]=[Math.min(I,H),Math.max(I,H)],St=F.slice(Nt,Tt+1).map(pt=>pt);r(e.includes(A)?e.filter(pt=>!St.includes(pt)):[...new Set([...e,...St])])},[e,r,F]),E=A=>{L(A,z.current),z.current=!1},M=(A,U)=>{A.preventDefault(),L(U,A.shiftKey)},V=a.useCallback(A=>{const U=gr(F,A).map(I=>I);r(Is(F,A,e)?e.filter(I=>!U.includes(I)):[...new Set([...e,...U])])},[e,r,F]),P=()=>{r(F.map(A=>A))},O=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(y.Section).map(A=>n.jsx(Sc,{section:A,availableBookIds:F,selectedBookIds:e,onToggle:V,localizedStrings:o},A))}),n.jsxs(Ht,{open:v,onOpenChange:A=>{S(A),A||_("")},children:[n.jsx(te,{asChild:!0,children:n.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:l,n.jsx(N.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(qt,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(z.current=A.shiftKey)},children:[n.jsx(be,{placeholder:c,value:j,onValueChange:_}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:P,children:w}),n.jsx(B,{variant:"ghost",size:"sm",onClick:O,children:d})]}),n.jsxs(Ut,{children:[n.jsx(De,{children:p}),Object.values(y.Section).map((A,U)=>{const I=T[A];if(I.length!==0)return n.jsxs(a.Fragment,{children:[n.jsx(Ot,{heading:ro(A,h,u,g,b),children:I.map(H=>n.jsx(so,{bookId:H,isSelected:e.includes(H),onSelect:()=>E(H),onMouseDown:Nt=>M(Nt,H),section:y.getSectionForBook(H),showCheck:!0,localizedBookNames:s,commandValue:Pn(H,s),className:"tw-flex tw-items-center"},H))}),U<Object.values(y.Section).length-1&&n.jsx(zn,{})]},A)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Rn?Rn:Kr).map(A=>n.jsx(he,{className:"hover:tw-bg-secondary",variant:"secondary",children:_e(A,s)},A)),e.length>Rn&&n.jsx(he,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Kr} ${m}`})]})]})}const Tc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),we=(t,e)=>t[e]??e;function Mc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:l,localizedBookNames:c,id:w}){const d=we(l,"%webView_scope_selector_selected_text%"),p=we(l,"%webView_scope_selector_current_verse%"),m=we(l,"%webView_scope_selector_current_chapter%"),h=we(l,"%webView_scope_selector_current_book%"),u=we(l,"%webView_scope_selector_choose_books%"),g=we(l,"%webView_scope_selector_scope%"),b=we(l,"%webView_scope_selector_select_books%"),v=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],S=e?v.filter(j=>e.includes(j.value)):v;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(lt,{children:g}),n.jsx(un,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:S.map(({value:j,label:_,id:C})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{className:"tw-me-2",value:j,id:C}),n.jsx(lt,{htmlFor:C,children:_})]},C))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(lt,{children:b}),n.jsx(Rc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:l,localizedBookNames:c})]})]})}const Tn={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Dc({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:l}){const c={...Tn,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in Tn?Tn[d]:p]))},w=wt();return n.jsxs(ge,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(ce,{size:s,className:f("pr-twp tw-w-auto",i),children:n.jsx(xe,{placeholder:c[y.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(de,{id:l,align:w==="rtl"?"end":"start",style:{zIndex:250},children:t.map(d=>n.jsx(_t,{value:`${d}`,children:c[y.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function Ic({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function Oc({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function Ac({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(ie,{}):""]})}function Os(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function dn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const As=(t,e,r,o)=>r?Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order).flatMap(([i])=>e.filter(c=>c.group===i).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:"command"in c?n.jsxs(Ge,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(dn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(dn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Xo,{children:[n.jsx(or,{children:c.label}),n.jsx(Yo,{children:n.jsx(sr,{children:As(t,e,Os(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(vt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function wn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:l="ghost",id:c}){return n.jsxs(Zt,{variant:i,children:[n.jsx(le,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(B,{variant:l,size:"icon",children:o??n.jsx(N.MenuIcon,{})})}),n.jsx(Kt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(a.Fragment,{children:[n.jsx(rr,{children:n.jsx(bt,{children:As(e.groups,e.items,w,t)})}),d<p.length-1&&n.jsx(ve,{})]},w))})]})}const Ps=a.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Pc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(Ps,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(wn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(N.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(wn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(N.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function Lc({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Ps,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(wn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const xr=a.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(jt.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});xr.displayName=jt.List.displayName;const br=a.forwardRef(({className:t,...e},r)=>n.jsx(jt.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));br.displayName=jt.List.displayName;const Ls=a.forwardRef(({className:t,...e},r)=>n.jsx(jt.Trigger,{ref:r,...e,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),vr=a.forwardRef(({className:t,...e},r)=>n.jsx(jt.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));vr.displayName=jt.Content.displayName;function $c({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(xn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(xr,{children:[n.jsx(br,{children:t.map(c=>n.jsx(Ls,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(vr,{value:c.value,children:c.content},c.key))]})]})}function Fc({...t}){return n.jsx(Z.Menu,{...t})}function Vc({...t}){return n.jsx(Z.Sub,{"data-slot":"menubar-sub",...t})}const $s=a.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=a.useMemo(()=>({variant:e}),[e]);return n.jsx(nr.Provider,{value:s,children:n.jsx(Z.Root,{ref:o,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});$s.displayName=Z.Root.displayName;const Fs=a.forwardRef(({className:t,...e},r)=>{const o=$t();return n.jsx(Z.Trigger,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ee({variant:o.variant,className:t})),...e})});Fs.displayName=Z.Trigger.displayName;const Vs=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=$t();return n.jsxs(Z.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",ee({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Vs.displayName=Z.SubTrigger.displayName;const zs=a.forwardRef(({className:t,...e},r)=>{const o=$t();return n.jsx(Z.SubContent,{ref:r,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});zs.displayName=Z.SubContent.displayName;const Bs=a.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const l=$t();return n.jsx(Z.Portal,{children:n.jsx(Z.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Bs.displayName=Z.Content.displayName;const Gs=a.forwardRef(({className:t,inset:e,...r},o)=>{const s=$t();return n.jsx(Z.Item,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",ee({variant:s.variant,className:t}),t),...r})});Gs.displayName=Z.Item.displayName;const zc=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=$t();return n.jsxs(Z.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ee({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});zc.displayName=Z.CheckboxItem.displayName;const Bc=a.forwardRef(({className:t,children:e,...r},o)=>{const s=$t();return n.jsxs(Z.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ee({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Bc.displayName=Z.RadioItem.displayName;const Gc=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Z.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Gc.displayName=Z.Label.displayName;const Ks=a.forwardRef(({className:t,...e},r)=>n.jsx(Z.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ks.displayName=Z.Separator.displayName;const Pe=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},qs=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order);return s.flatMap(([i],l)=>{const c=e.filter(d=>d.group===i).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(Ct,{children:[n.jsx(Et,{asChild:!0,children:"command"in d?n.jsxs(Gs,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(dn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(dn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(Vc,{children:[n.jsx(Vs,{children:d.label}),n.jsx(zs,{children:qs(t,e,Os(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(vt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&l<s.length-1&&w.push(n.jsx(Ks,{},`separator-${i}`)),w})};function Kc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=a.useRef(void 0),i=a.useRef(void 0),l=a.useRef(void 0),c=a.useRef(void 0),w=a.useRef(void 0),d=p=>{switch(p){case"platform.app":return i;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return w;default:return}};if(Va.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,m)=>{var g,b,v,S;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":Pe(i,[h]);break;case"alt+p":(g=i.current)==null||g.focus(),Pe(i,[h,u]);break;case"alt+l":(b=l.current)==null||b.focus(),Pe(l,[h,u]);break;case"alt+n":(v=c.current)==null||v.focus(),Pe(c,[h,u]);break;case"alt+h":(S=w.current)==null||S.focus(),Pe(w,[h,u]);break}}),a.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const b=g.target.getAttribute("data-state");r(b==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx($s,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,m])=>typeof p=="boolean"||typeof m=="boolean"?0:p.order-m.order).map(([p,m])=>n.jsxs(Fc,{children:[n.jsx(Fs,{ref:d(p),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(Bs,{className:"tw-z-[250]",children:n.jsx(bt,{children:qs(t.groups,t.items,p,e)})})]},p))})}function qc(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Uc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=a.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(Kc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Hc=(t,e)=>t[e]??e;function Yc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:l,className:c,id:w}){const d=Hc(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,m]=a.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(b=>b!==g)]),i&&r.find(b=>b===g)&&i([...r.filter(b=>b!==g)]),m(!1)},u=(g,b)=>{var S,j,_,C,z,F;const v=b!==g?((j=(S=t[g])==null?void 0:S.uiNames)==null?void 0:j[b])??((C=(_=t[g])==null?void 0:_.uiNames)==null?void 0:C.en):void 0;return v?`${(z=t[g])==null?void 0:z.autonym} (${v})`:(F=t[g])==null?void 0:F.autonym};return n.jsxs("div",{id:w,className:f("pr-twp tw-max-w-sm",c),children:[n.jsxs(ge,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>m(g),children:[n.jsx(ce,{children:n.jsx(xe,{})}),n.jsx(de,{className:"tw-z-[250]",children:Object.keys(t).map(g=>n.jsx(_t,{value:g,children:u(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(lt,{className:"tw-font-normal tw-text-muted-foreground",children:y.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,e)).join(", "):t.en.autonym})})})]})}function Xc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(lt,{children:e(t)}):r?n.jsx(lt,{children:r(t)}):n.jsx(lt,{children:t})}function Wc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(gn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(Xc,{item:c,createLabel:i,createComplexLabel:l})]},c))})}function Jc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:l,selectedButtons:c,hoverButtons:w,dropdownContent:d,additionalSelectedContent:p,accentColor:m,showDropdownOnHover:h=!1}){const u=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":e,className:f("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&h&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(Zt,{children:[n.jsx(le,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(N.MoreVertical,{})})}),n.jsx(Kt,{align:"end",children:d})]})}),e&&d&&n.jsxs(Zt,{children:[n.jsx(le,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(N.MoreVertical,{})})}),n.jsx(Kt,{align:"end",children:d})]})]}),e&&p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const Us=a.forwardRef(({className:t,...e},r)=>n.jsx(N.LoaderCircle,{size:35,className:f("tw-animate-spin",t),...e,ref:r}));Us.displayName="Spinner";function Zc({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:l,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:m,onFocus:h,onBlur:u}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(lt,{htmlFor:t,className:f({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(ye,{id:t,disabled:e,placeholder:l,required:c,className:f(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:m,onFocus:h,onBlur:u}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const Qc=Qt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Hs=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:f("pr-twp",Qc({variant:e}),t),...r}));Hs.displayName="Alert";const Ys=a.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Ys.displayName="AlertTitle";const Xs=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Xs.displayName="AlertDescription";const td=Q.Root,ed=Q.Trigger,nd=Q.Group,rd=Q.Portal,od=Q.Sub,sd=Q.RadioGroup,Ws=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(Q.SubTrigger,{ref:s,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ws.displayName=Q.SubTrigger.displayName;const Js=a.forwardRef(({className:t,...e},r)=>n.jsx(Q.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Js.displayName=Q.SubContent.displayName;const Zs=a.forwardRef(({className:t,...e},r)=>n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:r,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Zs.displayName=Q.Content.displayName;const Qs=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Item,{ref:o,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));Qs.displayName=Q.Item.displayName;const ta=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(Q.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));ta.displayName=Q.CheckboxItem.displayName;const ea=a.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(Q.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));ea.displayName=Q.RadioItem.displayName;const na=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));na.displayName=Q.Label.displayName;const ra=a.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));ra.displayName=Q.Separator.displayName;function oa({className:t,...e}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}oa.displayName="ContextMenuShortcut";const sa=a.createContext({direction:"bottom"});function aa({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=a.useMemo(()=>({direction:e}),[e]);return n.jsx(sa.Provider,{value:o,children:n.jsx(At.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}aa.displayName="Drawer";const ad=At.Drawer.Trigger,ia=At.Drawer.Portal,id=At.Drawer.Close,yr=a.forwardRef(({className:t,...e},r)=>n.jsx(At.Drawer.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));yr.displayName=At.Drawer.Overlay.displayName;const la=a.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:i="bottom"}=a.useContext(sa),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ia,{children:[n.jsx(yr,{}),n.jsxs(At.Drawer.Content,{ref:s,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",l[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:c[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:c[i]})]})]})});la.displayName="DrawerContent";function ca({className:t,...e}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ca.displayName="DrawerHeader";function da({className:t,...e}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}da.displayName="DrawerFooter";const wa=a.forwardRef(({className:t,...e},r)=>n.jsx(At.Drawer.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));wa.displayName=At.Drawer.Title.displayName;const pa=a.forwardRef(({className:t,...e},r)=>n.jsx(At.Drawer.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));pa.displayName=At.Drawer.Description.displayName;const ua=a.forwardRef(({className:t,value:e,...r},o)=>n.jsx(On.Root,{ref:o,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(On.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));ua.displayName=On.Root.displayName;function ld({className:t,...e}){return n.jsx(Vn.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const cd=Vn.Panel;function dd({withHandle:t,className:e,...r}){return n.jsx(Vn.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(N.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function wd({...t}){return n.jsx(Yr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ma=a.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsxs(Le.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Le.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Le.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Le.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ma.displayName=Le.Root.displayName;const fa=a.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(An.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(An.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});fa.displayName=An.Root.displayName;const pd=jt.Root,ha=a.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(jt.List,{ref:r,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ha.displayName=jt.List.displayName;const ga=a.forwardRef(({className:t,...e},r)=>n.jsx(jt.Trigger,{ref:r,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));ga.displayName=jt.Trigger.displayName;const xa=a.forwardRef(({className:t,...e},r)=>n.jsx(jt.Content,{ref:r,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));xa.displayName=jt.Content.displayName;const ba=a.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ba.displayName="Textarea";const ud=(t,e)=>{a.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function md(t){return{preserveValue:!0,...t}}const va=(t,e,r={})=>{const o=a.useRef(e);o.current=e;const s=a.useRef(r);s.current=md(s.current);const[i,l]=a.useState(()=>o.current),[c,w]=a.useState(!0);return a.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const p=await t();d&&(l(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[i,c]},Mn=()=>!1,fd=(t,e)=>{const[r]=va(a.useCallback(async()=>{if(!t)return Mn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Mn,{preserveValue:!1});a.useEffect(()=>()=>{r!==Mn&&r()},[r])};function hd(t){a.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Yr.toast});exports.Alert=Hs;exports.AlertDescription=Xs;exports.AlertTitle=Ys;exports.Avatar=tr;exports.AvatarFallback=er;exports.AvatarImage=Ho;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=ri;exports.BOOK_SELECTOR_STRING_KEYS=ai;exports.Badge=he;exports.BookChapterControl=ni;exports.BookSelector=ii;exports.Button=B;exports.COMMENT_EDITOR_STRING_KEYS=yl;exports.COMMENT_LIST_STRING_KEYS=jl;exports.Card=Zn;exports.CardContent=Qn;exports.CardDescription=qo;exports.CardFooter=Uo;exports.CardHeader=Go;exports.CardTitle=Ko;exports.ChapterRangeSelector=lo;exports.Checkbox=gn;exports.Checklist=Wc;exports.ComboBox=en;exports.Command=qt;exports.CommandEmpty=De;exports.CommandGroup=Ot;exports.CommandInput=be;exports.CommandItem=Pt;exports.CommandList=Ut;exports.CommentEditor=vl;exports.CommentList=Cl;exports.ContextMenu=td;exports.ContextMenuCheckboxItem=ta;exports.ContextMenuContent=Zs;exports.ContextMenuGroup=nd;exports.ContextMenuItem=Qs;exports.ContextMenuLabel=na;exports.ContextMenuPortal=rd;exports.ContextMenuRadioGroup=sd;exports.ContextMenuRadioItem=ea;exports.ContextMenuSeparator=ra;exports.ContextMenuShortcut=oa;exports.ContextMenuSub=od;exports.ContextMenuSubContent=Js;exports.ContextMenuSubTrigger=Ws;exports.ContextMenuTrigger=ed;exports.DataTable=os;exports.Drawer=aa;exports.DrawerClose=id;exports.DrawerContent=la;exports.DrawerDescription=pa;exports.DrawerFooter=da;exports.DrawerHeader=ca;exports.DrawerOverlay=yr;exports.DrawerPortal=ia;exports.DrawerTitle=wa;exports.DrawerTrigger=ad;exports.DropdownMenu=Zt;exports.DropdownMenuCheckboxItem=Gt;exports.DropdownMenuContent=Kt;exports.DropdownMenuGroup=rr;exports.DropdownMenuItem=Ge;exports.DropdownMenuItemType=is;exports.DropdownMenuLabel=Ie;exports.DropdownMenuPortal=Yo;exports.DropdownMenuRadioGroup=Wo;exports.DropdownMenuRadioItem=ar;exports.DropdownMenuSeparator=ve;exports.DropdownMenuShortcut=Jo;exports.DropdownMenuSub=Xo;exports.DropdownMenuSubContent=sr;exports.DropdownMenuSubTrigger=or;exports.DropdownMenuTrigger=le;exports.ERROR_DUMP_STRING_KEYS=ss;exports.ERROR_POPOVER_STRING_KEYS=Ol;exports.EditorKeyboardShortcuts=ws;exports.ErrorDump=as;exports.ErrorPopover=Al;exports.FOOTNOTE_EDITOR_STRING_KEYS=Zl;exports.Filter=Vl;exports.FilterDropdown=Pl;exports.Footer=Fl;exports.FootnoteEditor=Jl;exports.FootnoteItem=fs;exports.FootnoteList=ec;exports.INVENTORY_STRING_KEYS=pc;exports.Input=ye;exports.Inventory=fc;exports.Kbd=sn;exports.Label=lt;exports.MARKER_MENU_STRING_KEYS=ps;exports.MarkdownRenderer=Il;exports.MarkerMenu=us;exports.MoreInfo=Ll;exports.MultiSelectComboBox=ls;exports.NavigationContentSearch=$c;exports.Popover=Ht;exports.PopoverAnchor=ao;exports.PopoverContent=Lt;exports.PopoverTrigger=te;exports.Progress=ua;exports.RadioGroup=un;exports.RadioGroupItem=ze;exports.RecentSearches=io;exports.ResizableHandle=dd;exports.ResizablePanel=cd;exports.ResizablePanelGroup=ld;exports.ResultsCard=Jc;exports.SCOPE_SELECTOR_STRING_KEYS=Tc;exports.ScopeSelector=Mc;exports.ScriptureResultsViewer=Ec;exports.ScrollGroupSelector=Dc;exports.SearchBar=xn;exports.Select=ge;exports.SelectContent=de;exports.SelectGroup=Zo;exports.SelectItem=_t;exports.SelectLabel=ts;exports.SelectScrollDownButton=lr;exports.SelectScrollUpButton=ir;exports.SelectSeparator=es;exports.SelectTrigger=ce;exports.SelectValue=xe;exports.Separator=ie;exports.SettingsList=Ic;exports.SettingsListHeader=Ac;exports.SettingsListItem=Oc;exports.SettingsSidebar=Ms;exports.SettingsSidebarContentSearch=bc;exports.Sidebar=wr;exports.SidebarContent=ur;exports.SidebarFooter=js;exports.SidebarGroup=an;exports.SidebarGroupAction=ks;exports.SidebarGroupContent=cn;exports.SidebarGroupLabel=ln;exports.SidebarHeader=ys;exports.SidebarInput=vs;exports.SidebarInset=pr;exports.SidebarMenu=mr;exports.SidebarMenuAction=_s;exports.SidebarMenuBadge=Cs;exports.SidebarMenuButton=hr;exports.SidebarMenuItem=fr;exports.SidebarMenuSkeleton=Es;exports.SidebarMenuSub=Ss;exports.SidebarMenuSubButton=Ts;exports.SidebarMenuSubItem=Rs;exports.SidebarProvider=dr;exports.SidebarRail=bs;exports.SidebarSeparator=Ns;exports.SidebarTrigger=xs;exports.Skeleton=on;exports.Slider=ma;exports.Sonner=wd;exports.Spinner=Us;exports.Switch=fa;exports.TabDropdownMenu=wn;exports.TabFloatingMenu=Lc;exports.TabToolbar=Pc;exports.Table=qe;exports.TableBody=He;exports.TableCaption=rs;exports.TableCell=se;exports.TableFooter=ns;exports.TableHead=Re;exports.TableHeader=Ue;exports.TableRow=Bt;exports.Tabs=pd;exports.TabsContent=xa;exports.TabsList=ha;exports.TabsTrigger=ga;exports.TextField=Zc;exports.Textarea=ba;exports.ToggleGroup=hn;exports.ToggleGroupItem=Ce;exports.Toolbar=Uc;exports.Tooltip=Ct;exports.TooltipContent=vt;exports.TooltipProvider=bt;exports.TooltipTrigger=Et;exports.UNDO_REDO_BUTTONS_STRING_KEYS=cs;exports.UiLanguageSelector=Yc;exports.UndoRedoButtons=ds;exports.VerticalTabs=xr;exports.VerticalTabsContent=vr;exports.VerticalTabsList=br;exports.VerticalTabsTrigger=Ls;exports.badgeVariants=Bo;exports.buttonVariants=Kn;exports.cn=f;exports.getBookIdFromUSFM=wc;exports.getInventoryHeader=Ye;exports.getLinesFromUSFM=cc;exports.getNumberFromUSFM=dc;exports.getStatusForItem=hs;exports.getToolbarOSReservedSpaceClassName=qc;exports.inventoryCountColumn=ic;exports.inventoryItemColumn=sc;exports.inventoryStatusColumn=lc;exports.selectTriggerVariants=Qo;exports.useEvent=ud;exports.useEventAsync=fd;exports.useListbox=zo;exports.usePromise=va;exports.useRecentSearches=Za;exports.useSidebar=Xe;exports.useStylesheet=hd;function gd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}gd(`*, ::before, ::after {
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
