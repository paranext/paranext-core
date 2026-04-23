"use strict";var Pa=Object.defineProperty;var La=(t,e,r)=>e in t?Pa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var xt=(t,e,r)=>La(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),kt=require("cmdk"),C=require("lucide-react"),$a=require("clsx"),Fa=require("tailwind-merge"),Va=require("@radix-ui/react-dialog"),at=require("@sillsdev/scripture"),N=require("platform-bible-utils"),Le=require("@radix-ui/react-slot"),pe=require("class-variance-authority"),Ba=require("@radix-ui/react-popover"),za=require("@radix-ui/react-label"),Ga=require("@radix-ui/react-radio-group"),g=require("lexical"),ao=require("@radix-ui/react-tooltip"),Vn=require("@lexical/rich-text"),$r=require("react-dom"),Ka=require("@lexical/table"),qa=require("@radix-ui/react-toggle-group"),Ua=require("@radix-ui/react-toggle"),io=require("@lexical/headless"),Ha=require("@radix-ui/react-separator"),Ya=require("@radix-ui/react-avatar"),lo=require("@radix-ui/react-dropdown-menu"),vt=require("@tanstack/react-table"),Xa=require("@radix-ui/react-select"),Wa=require("markdown-to-jsx"),Mt=require("@eten-tech-foundation/platform-editor"),Za=require("@radix-ui/react-checkbox"),Ja=require("@radix-ui/react-tabs"),Qa=require("@radix-ui/react-menubar"),ti=require("react-hotkeys-hook"),ei=require("@radix-ui/react-context-menu"),Ot=require("vaul"),ni=require("@radix-ui/react-progress"),ri=require("react-resizable-panels"),co=require("sonner"),oi=require("@radix-ui/react-slider"),si=require("@radix-ui/react-switch");function pt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const St=pt(Va),Oe=pt(Ba),wo=pt(za),He=pt(Ga),xe=pt(ao),yn=pt(qa),po=pt(Ua),uo=pt(Ha),$e=pt(Ya),Q=pt(lo),ot=pt(Xa),Bn=pt(Za),_t=pt(Ja),tt=pt(Qa),et=pt(ei),zn=pt(ni),Yn=pt(ri),qe=pt(oi),Gn=pt(si),ai=Fa.extendTailwindMerge({prefix:"tw-"});function h(...t){return ai($a.clsx(t))}const Ne=250,Xn=300,mo=400,fo=450,ho=500,ii="layoutDirection";function it(){const t=localStorage.getItem(ii);return t==="rtl"?t:"ltr"}const go=St.Root,li=St.Trigger,xo=St.Portal,ci=St.Close,Wn=l.forwardRef(({className:t,style:e,...r},o)=>n.jsx(St.Overlay,{ref:o,className:h("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:fo,...e},...r}));Wn.displayName=St.Overlay.displayName;const Zn=l.forwardRef(({className:t,children:e,overlayClassName:r,style:o,...s},a)=>{const i=it();return n.jsxs(xo,{children:[n.jsx(Wn,{className:r}),n.jsxs(St.Content,{ref:a,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:ho,...o},...s,dir:i,children:[e,n.jsxs(St.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":i==="ltr"},{"tw-left-4":i==="rtl"}),children:[n.jsx(C.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Zn.displayName=St.Content.displayName;function Jn({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Jn.displayName="DialogHeader";function bo({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}bo.displayName="DialogFooter";const Qn=l.forwardRef(({className:t,...e},r)=>n.jsx(St.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Qn.displayName=St.Title.displayName;const vo=l.forwardRef(({className:t,...e},r)=>n.jsx(St.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));vo.displayName=St.Description.displayName;const Yt=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Command,{ref:r,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Yt.displayName=kt.Command.displayName;const ke=l.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(C.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(kt.Command.Input,{ref:r,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});ke.displayName=kt.Command.Input.displayName;const Xt=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Command.List,{ref:r,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Xt.displayName=kt.Command.List.displayName;const Fe=l.forwardRef((t,e)=>n.jsx(kt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Fe.displayName=kt.Command.Empty.displayName;const It=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Command.Group,{ref:r,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));It.displayName=kt.Command.Group.displayName;const tr=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Command.Separator,{ref:r,className:h("tw--mx-1 tw-h-px tw-bg-border",t),...e}));tr.displayName=kt.Command.Separator.displayName;const At=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Command.Item,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));At.displayName=kt.Command.Item.displayName;function yo({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}yo.displayName="CommandShortcut";const jo=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"Old Testament";case N.Section.NT:return r??"New Testament";case N.Section.DC:return o??"Deuterocanon";case N.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},di=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"OT";case N.Section.NT:return r??"NT";case N.Section.DC:return o??"DC";case N.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Me(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??at.Canon.bookIdToEnglishName(t)}function er(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const No=at.Canon.allBookIds.filter(t=>!at.Canon.isObsolete(at.Canon.bookIdToNumber(t))),ge=Object.fromEntries(No.map(t=>[t,at.Canon.bookIdToEnglishName(t)]));function nr(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=at.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(N.includes(s.toLowerCase(),o)||N.includes(t.toLowerCase(),o)||(a?N.includes(a.localizedName.toLowerCase(),o)||N.includes(a.localizedId.toLowerCase(),o):!1))}const ko=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:d},w)=>{const p=l.useRef(!1),m=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},f=y=>{p.current=!0,o?o(y):r==null||r(t)},u=l.useMemo(()=>Me(t,c),[t,c]),x=l.useMemo(()=>er(t,c),[t,c]);return n.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===N.Section.OT,"tw-border-s-purple-200":s===N.Section.NT,"tw-border-s-indigo-200":s===N.Section.DC,"tw-border-s-amber-200":s===N.Section.Extra}),children:n.jsxs(At,{ref:w,value:d||`${t} ${at.Canon.bookIdToEnglishName(t)}`,onSelect:m,onMouseDown:f,role:"option","aria-selected":e,"aria-label":`${at.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:a,children:[i&&n.jsx(C.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:x})]})})}),rr=pe.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const i=o?Le.Slot:"button";return n.jsx(i,{className:h(rr({variant:e,size:r,className:t})),ref:a,...s})});B.displayName="Button";const Wt=Oe.Root,ee=Oe.Trigger,_o=Oe.Anchor,Pt=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},a)=>{const i=it();return n.jsx(Oe.Portal,{children:n.jsx(Oe.Content,{ref:a,align:e,sideOffset:r,className:h("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:Ne,...o},...s,dir:i})})});Pt.displayName=Oe.Content.displayName;function Kn(t,e,r){return`${t} ${ge[t]}${e?` ${er(t,e)} ${Me(t,e)}`:""}${r?` ${r}`:""}`}function Co({recentSearches:t,onSearchItemSelect:e,renderItem:r=p=>String(p),getItemKey:o=p=>String(p),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i,classNameForItems:c,buttonClassName:d="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:w="ghost"}){const[p,m]=l.useState(!1);if(t.length===0)return;const f=u=>{e(u),m(!1)};return n.jsxs(Wt,{open:p,onOpenChange:m,children:[n.jsx(ee,{asChild:!0,children:n.jsx(B,{variant:w,size:"icon",className:d,"aria-label":s,children:n.jsx(C.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Pt,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Yt,{children:n.jsx(Xt,{children:n.jsx(It,{heading:a,children:t.map(u=>n.jsxs(At,{onSelect:()=>f(u),className:h("tw-flex tw-items-center",c),children:[n.jsx(C.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function wi(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),i=[s,...a.slice(0,o-1)];e(i)}}const En={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},pi=[En.BOOK_ONLY,En.BOOK_CHAPTER,En.BOOK_CHAPTER_VERSE];function Fr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Gt(t){return N.getChaptersForBook(at.Canon.bookIdToNumber(t))}function ui(t,e,r){if(!t.trim()||e.length===0)return;const o=pi.reduce((s,a)=>{if(s)return s;const i=a.exec(t.trim());if(i){const[c,d=void 0,w=void 0]=i.slice(1);let p;const m=e.filter(f=>nr(f,c,r));if(m.length===1&&([p]=m),!p&&d){if(at.Canon.isBookIdValid(c)){const f=c.toUpperCase();e.includes(f)&&(p=f)}if(!p&&r){const f=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());f&&e.includes(f[0])&&([p]=f)}}if(!p&&d){const u=(x=>Object.keys(ge).find(y=>ge[y].toLowerCase()===x.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const x=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===c.toLowerCase());x&&e.includes(x[0])&&([p]=x)}}if(p){let f=d?parseInt(d,10):void 0;f&&f>Gt(p)&&(f=Math.max(Gt(p),1));const u=w?parseInt(w,10):void 0;return{book:p,chapterNum:f,verseNum:u}}}},void 0);if(o)return o}function mi(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],p=Math.max(Gt(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{const d=Gt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const p=e[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?C.ChevronsLeft:C.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?C.ChevronLeft:C.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?C.ChevronRight:C.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===Gt(t.book)||Gt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?C.ChevronsRight:C.ChevronsLeft}],[t,e,r,s,i,c,a])}function Vr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(t)return n.jsx(It,{children:n.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:Gt(t)},(i,c)=>c+1).map(i=>n.jsx(At,{value:`${t} ${ge[t]||""} ${i}`,onSelect:()=>r(i),ref:o(i),className:h("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&i===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function fi({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:d}){const w=it(),[p,m]=l.useState(!1),[f,u]=l.useState(""),[x,y]=l.useState(""),[b,E]=l.useState("books"),[v,_]=l.useState(void 0),[k,L]=l.useState(!1),F=l.useRef(void 0),A=l.useRef(void 0),R=l.useRef(void 0),M=l.useRef(void 0),T=l.useRef({}),P=l.useCallback(D=>{e(D),c&&c(D)},[e,c]),O=l.useMemo(()=>o?o():No,[o]),q=l.useMemo(()=>({[N.Section.OT]:O.filter(S=>at.Canon.isBookOT(S)),[N.Section.NT]:O.filter(S=>at.Canon.isBookNT(S)),[N.Section.DC]:O.filter(S=>at.Canon.isBookDC(S)),[N.Section.Extra]:O.filter(S=>at.Canon.extraBooks().includes(S))}),[O]),$=l.useMemo(()=>Object.values(q).flat(),[q]),H=l.useMemo(()=>{if(!x.trim())return q;const D={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return[N.Section.OT,N.Section.NT,N.Section.DC,N.Section.Extra].forEach(V=>{D[V]=q[V].filter(U=>nr(U,x,s))}),D},[q,x,s]),j=l.useMemo(()=>ui(x,$,s),[x,$,s]),G=l.useCallback(()=>{j&&(P({book:j.book,chapterNum:j.chapterNum??1,verseNum:j.verseNum??1}),m(!1),y(""),u(""))},[P,j]),lt=l.useCallback(D=>{if(Gt(D)<=1){P({book:D,chapterNum:1,verseNum:1}),m(!1),y("");return}_(D),E("chapters")},[P]),ht=l.useCallback(D=>{const S=b==="chapters"?v:j==null?void 0:j.book;S&&(P({book:S,chapterNum:D,verseNum:1}),m(!1),E("books"),_(void 0),y(""))},[P,b,v,j]),Ct=l.useCallback(D=>{P(D),m(!1),y("")},[P]),dt=mi(t,$,w,e),Nt=l.useCallback(()=>{E("books"),_(void 0),setTimeout(()=>{A.current&&A.current.focus()},0)},[]),z=l.useCallback(D=>{if(!D&&b==="chapters"){Nt();return}m(D),D&&(E("books"),_(void 0),y(""))},[b,Nt]),{otLong:nt,ntLong:Y,dcLong:ct,extraLong:gt}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},re=l.useCallback(D=>jo(D,nt,Y,ct,gt),[nt,Y,ct,gt]),oe=l.useCallback(D=>j?!!j.chapterNum&&!D.toString().includes(j.chapterNum.toString()):!1,[j]),Ee=l.useMemo(()=>N.formatScrRef(t,s?Me(t.book,s):"English"),[t,s]),se=l.useCallback(D=>S=>{T.current[D]=S},[]),Se=l.useCallback(D=>{(D.key==="Home"||D.key==="End")&&D.stopPropagation()},[]),$t=l.useCallback(D=>{if(D.ctrlKey)return;const{isLetter:S,isDigit:V}=Fr(D.key);if(b==="chapters"){if(D.key==="Backspace"){D.preventDefault(),D.stopPropagation(),Nt();return}if(S||V){if(D.preventDefault(),D.stopPropagation(),E("books"),_(void 0),V&&v){const U=ge[v];y(`${U} ${D.key}`)}else y(D.key);setTimeout(()=>{A.current&&A.current.focus()},0);return}}if((b==="chapters"||b==="books"&&j)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(D.key)){const U=b==="chapters"?v:j==null?void 0:j.book;if(!U)return;const K=(()=>{if(!f)return 1;const J=f.match(/(\d+)$/);return J?parseInt(J[1],10):0})(),rt=Gt(U);if(!rt)return;let W=K;const ut=6;switch(D.key){case"ArrowLeft":K!==0&&(W=K>1?K-1:rt);break;case"ArrowRight":K!==0&&(W=K<rt?K+1:1);break;case"ArrowUp":W=K===0?rt:Math.max(1,K-ut);break;case"ArrowDown":W=K===0?1:Math.min(rt,K+ut);break;default:return}W!==K&&(D.preventDefault(),D.stopPropagation(),u(Kn(U,s,W)),setTimeout(()=>{const J=T.current[W];J&&J.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,j,Nt,v,f,s]),ae=l.useCallback(D=>{if(D.shiftKey||D.key==="Tab"||D.key===" ")return;const{isLetter:S,isDigit:V}=Fr(D.key);(S||V)&&(D.preventDefault(),y(U=>U+D.key),A.current.focus(),L(!1))},[]);return l.useLayoutEffect(()=>{const D=setTimeout(()=>{if(p&&b==="books"&&R.current&&M.current){const S=R.current,V=M.current,U=V.offsetTop,K=S.clientHeight,rt=V.clientHeight,W=U-K/2+rt/2;S.scrollTo({top:Math.max(0,W),behavior:"smooth"}),u(Kn(t.book))}},0);return()=>{clearTimeout(D)}},[p,b,x,j,t.book]),l.useLayoutEffect(()=>{if(b==="chapters"&&v){const D=v===t.book;setTimeout(()=>{if(R.current)if(D){const S=T.current[t.chapterNum];S&&S.scrollIntoView({block:"center",behavior:"smooth"})}else R.current.scrollTo({top:0});F.current&&F.current.focus()},0)}},[b,v,j,t.book,t.chapterNum]),n.jsxs(Wt,{open:p,onOpenChange:z,children:[n.jsx(ee,{asChild:!0,children:n.jsx(B,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Ee})})}),n.jsx(Pt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Yt,{ref:F,onKeyDown:$t,loop:!0,value:f,onValueChange:u,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(ke,{ref:A,value:x,onValueChange:y,onKeyDown:Se,onFocus:()=>L(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&n.jsx(Co,{recentSearches:i,onSearchItemSelect:Ct,renderItem:D=>N.formatScrRef(D,"English"),getItemKey:D=>`${D.book}-${D.chapterNum}-${D.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:dt.map(({onClick:D,disabled:S,title:V,icon:U})=>n.jsx(B,{variant:"ghost",size:"sm",onClick:()=>{L(!0),D()},disabled:S,className:"tw-h-10 tw-w-4 tw-p-0",title:V,onKeyDown:ae,children:n.jsx(U,{})},V))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:Nt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(C.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(C.ArrowRight,{className:"tw-h-4 tw-w-4"})}),v&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Me(v,s)})]}),!k&&n.jsxs(Xt,{ref:R,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!j&&Object.entries(H).map(([D,S])=>{if(S.length!==0)return n.jsx(It,{heading:re(D),children:S.map(V=>n.jsx(ko,{bookId:V,onSelect:U=>lt(U),section:N.getSectionForBook(V),commandValue:`${V} ${ge[V]}`,ref:V===t.book?M:void 0,localizedBookNames:s},V))},D)}),j&&n.jsx(It,{children:n.jsx(At,{value:`${j.book} ${ge[j.book]} ${j.chapterNum||""}:${j.verseNum||""})}`,onSelect:G,className:"tw-font-semibold tw-text-primary",children:N.formatScrRef({book:j.book,chapterNum:j.chapterNum??1,verseNum:j.verseNum??1},s?er(j.book,s):void 0)},"top-match")}),j&&Gt(j.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Me(j.book,s)}),n.jsx(Vr,{bookId:j.book,scrRef:t,onChapterSelect:ht,setChapterRef:se,isChapterDimmed:oe,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&v&&n.jsx(Vr,{bookId:v,scrRef:t,onChapterSelect:ht,setChapterRef:se,className:"tw-p-4"})]})]})})]})}const hi=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),gi=pe.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),wt=l.forwardRef(({className:t,...e},r)=>n.jsx(wo.Root,{ref:r,className:h("pr-twp",gi(),t),...e}));wt.displayName=wo.Root.displayName;const jn=l.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsx(He.Root,{className:h("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});jn.displayName=He.Root.displayName;const Ye=l.forwardRef(({className:t,...e},r)=>n.jsx(He.Item,{ref:r,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(He.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(C.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ye.displayName=He.Item.displayName;function xi(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function cn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:a,value:i,onChange:c=()=>{},getOptionLabel:d=xi,getButtonLabel:w,icon:p=void 0,buttonPlaceholder:m="",textPlaceholder:f="",commandEmptyMessage:u="No option found",buttonVariant:x="outline",alignDropDown:y="start",isDisabled:b=!1,ariaLabel:E,...v}){const[_,k]=l.useState(!1),L=w??d,F=R=>R.length>0&&typeof R[0]=="object"&&"options"in R[0],A=(R,M)=>{const T=d(R),P=typeof R=="object"&&"secondaryLabel"in R?R.secondaryLabel:void 0,O=`${M??""}${T}${P??""}`;return n.jsxs(At,{value:T,onSelect:()=>{c(R),k(!1)},className:"tw-flex tw-items-center",children:[n.jsx(C.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||d(i)!==T})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[T,P&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",P]})]})]},O)};return n.jsxs(Wt,{open:_,onOpenChange:k,...v,children:[n.jsx(ee,{asChild:!0,children:n.jsxs(B,{variant:x,role:"combobox","aria-expanded":_,"aria-label":E,id:t,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:p}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?L(i):m})]}),n.jsx(C.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{align:y,className:h("tw-w-[200px] tw-p-0",s),style:a,children:n.jsxs(Yt,{children:[n.jsx(ke,{placeholder:f,className:"tw-text-inherit"}),n.jsx(Fe,{children:u}),n.jsx(Xt,{children:F(e)?e.map(R=>n.jsx(It,{heading:R.groupHeading,children:R.options.map(M=>A(M,R.groupHeading))},R.groupHeading)):e.map(R=>A(R))})]})})]})}function Eo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(w,p)=>p+1),[a]),c=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(wt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(cn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(wt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(cn,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const bi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Sn=(t,e)=>t[e]??e;function vi({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=Sn(w,"%webView_bookSelector_currentBook%"),m=Sn(w,"%webView_bookSelector_choose%"),f=Sn(w,"%webView_bookSelector_chooseBooks%"),[u,x]=l.useState("current book"),y=b=>{x(b),t(b)};return n.jsx(jn,{className:"pr-twp tw-flex",value:u,onValueChange:b=>y(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ye,{value:"current book"}),n.jsx(wt,{className:"tw-ms-1",children:p})]}),n.jsx(wt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Eo,{isDisabled:u==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ye,{value:"choose books"}),n.jsx(wt,{className:"tw-ms-1",children:f})]}),n.jsx(wt,{className:"tw-flex tw-items-center",children:o.map(b=>at.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(B,{disabled:u==="current book",onClick:()=>r(),children:m})]})]})})}const So=l.createContext(null);function yi(t,e){return{getTheme:function(){return e??null}}}function Zt(){const t=l.useContext(So);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Ro=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ji=Ro?l.useLayoutEffect:l.useEffect,rn={tag:g.HISTORY_MERGE_TAG};function Ni({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:d}=t,w=yi(null,o),p=g.createEditor({editable:t.editable,html:d,namespace:s,nodes:a,onError:m=>i(m,p),theme:o});return function(m,f){if(f!==null){if(f===void 0)m.update(()=>{const u=g.$getRoot();if(u.isEmpty()){const x=g.$createParagraphNode();u.append(x);const y=Ro?document.activeElement:null;(g.$getSelection()!==null||y!==null&&y===m.getRootElement())&&x.select()}},rn);else if(f!==null)switch(typeof f){case"string":{const u=m.parseEditorState(f);m.setEditorState(u,rn);break}case"object":m.setEditorState(f,rn);break;case"function":m.update(()=>{g.$getRoot().isEmpty()&&f(m)},rn)}}}(p,c),[p,w]},[]);return ji(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(So.Provider,{value:r,children:e})}const ki=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function _i({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Zt();return ki(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:d})=>{e&&a.size===0&&i.size===0||t&&d.has(g.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const or={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},mt=xe.Provider,yt=xe.Root,jt=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(xe.Trigger,{ref:o,className:e?h(rr({variant:e}),t):t,...r}));jt.displayName=xe.Trigger.displayName;const ft=l.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(xe.Portal,{children:n.jsx(xe.Content,{ref:s,sideOffset:e,style:{zIndex:Ne,...r},className:h("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));ft.displayName=xe.Content.displayName;const sr=[Vn.HeadingNode,g.ParagraphNode,g.TextNode,Vn.QuoteNode],Ci=l.createContext(null),Rn={didCatch:!1,error:null};class Ei extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Rn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(Rn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&Si(e.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(Rn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=e;if(a){const d={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=l.createElement(o,d);else if(s!==void 0)c=s;else throw i}return l.createElement(Ci.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Si(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function Ri({children:t,onError:e}){return n.jsx(Ei,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const Ti=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Mi(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Di(){return function(t){const[e]=Zt(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),a=l.useRef(o);return Ti(()=>{const{initialValueFn:i,subscribe:c}=r,d=i();return a.current!==d&&(a.current=d,s(d)),c(w=>{a.current=w,s(w)})},[r,t]),o}(Mi)}function Ii(t,e){const r=t.getRootElement();if(r===null)return[];const o=r.getBoundingClientRect(),s=getComputedStyle(r),a=parseFloat(s.paddingLeft)+parseFloat(s.paddingRight),i=Array.from(e.getClientRects());let c,d=i.length;i.sort((w,p)=>{const m=w.top-p.top;return Math.abs(m)<=3?w.left-p.left:m});for(let w=0;w<d;w++){const p=i[w],m=c&&c.top<=p.top&&c.top+c.height>p.top&&c.left+c.width>p.left,f=p.width+a===o.width;m||f?(i.splice(w--,1),d--):c=p}return i}function Oi(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!g.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,i=t.isBackward(),c=s.getNode(),d=a.getNode(),w=e.is(c),p=e.is(d);if(w||p){const[m,f]=g.$getCharacterOffsets(t),u=c.is(d),x=e.is(i?d:c),y=e.is(i?c:d);let b,E=0;u?(E=m>f?f:m,b=m>f?m:f):x?(E=i?f:m,b=void 0):y&&(E=0,b=i?m:f);const v=e.__text.slice(E,b);v!==e.__text&&(r==="clone"&&(e=g.$cloneWithPropertiesEphemeral(e)),e.__text=v)}}return e}function dn(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const To=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ai=To&&"documentMode"in document?document.documentMode:null;!(!To||!("InputEvent"in window)||Ai)&&"getTargetRanges"in new window.InputEvent("input");function zt(t){return`${t}px`}const Pi={attributes:!0,characterData:!0,childList:!0,subtree:!0};function Li(t,e,r){let o=null,s=null,a=null,i=[];const c=document.createElement("div");function d(){o===null&&dn(182),s===null&&dn(183);const{left:m,top:f}=s.getBoundingClientRect(),u=Ii(t,e);var x,y;c.isConnected||(y=c,(x=s).insertBefore(y,x.firstChild));let b=!1;for(let E=0;E<u.length;E++){const v=u[E],_=i[E]||document.createElement("div"),k=_.style;k.position!=="absolute"&&(k.position="absolute",b=!0);const L=zt(v.left-m);k.left!==L&&(k.left=L,b=!0);const F=zt(v.top-f);k.top!==F&&(_.style.top=F,b=!0);const A=zt(v.width);k.width!==A&&(_.style.width=A,b=!0);const R=zt(v.height);k.height!==R&&(_.style.height=R,b=!0),_.parentNode!==c&&(c.append(_),b=!0),i[E]=_}for(;i.length>u.length;)i.pop();b&&r(i)}function w(){s=null,o=null,a!==null&&a.disconnect(),a=null,c.remove();for(const m of i)m.remove();i=[]}c.style.position="relative";const p=t.registerRootListener(function m(){const f=t.getRootElement();if(f===null)return w();const u=f.parentElement;if(!g.isHTMLElement(u))return w();w(),o=f,s=u,a=new MutationObserver(x=>{const y=t.getRootElement(),b=y&&y.parentElement;if(y!==o||b!==s)return m();for(const E of x)if(!c.contains(E.target))return d()}),a.observe(u,Pi),d()});return()=>{p(),w()}}function Br(t,e,r){if(t.type!=="text"&&g.$isElementNode(e)){const o=e.getDOMSlot(r);return[o.element,o.getFirstChildOffset()+t.offset]}return[g.getDOMTextNode(r)||r,t.offset]}function $i(t){for(const e of t){const r=e.style;r.background!=="Highlight"&&(r.background="Highlight"),r.color!=="HighlightText"&&(r.color="HighlightText"),r.marginTop!==zt(-1.5)&&(r.marginTop=zt(-1.5)),r.paddingTop!==zt(4)&&(r.paddingTop=zt(4)),r.paddingBottom!==zt(0)&&(r.paddingBottom=zt(0))}}function Fi(t,e=$i){let r=null,o=null,s=null,a=null,i=null,c=null,d=()=>{};function w(p){p.read(()=>{const m=g.$getSelection();if(!g.$isRangeSelection(m))return r=null,s=null,a=null,c=null,d(),void(d=()=>{});const[f,u]=function(R){const M=R.getStartEndPoints();return R.isBackward()?[M[1],M[0]]:M}(m),x=f.getNode(),y=x.getKey(),b=f.offset,E=u.getNode(),v=E.getKey(),_=u.offset,k=t.getElementByKey(y),L=t.getElementByKey(v),F=r===null||k!==o||b!==s||y!==r.getKey(),A=a===null||L!==i||_!==c||v!==a.getKey();if((F||A)&&k!==null&&L!==null){const R=function(M,T,P,O,q,$,H){const j=(M._window?M._window.document:document).createRange();return j.setStart(...Br(T,P,O)),j.setEnd(...Br(q,$,H)),j}(t,f,x,k,u,E,L);d(),d=Li(t,R,e)}r=x,o=k,s=b,a=E,i=L,c=_})}return w(t.getEditorState()),g.mergeRegister(t.registerUpdateListener(({editorState:p})=>w(p)),()=>{d()})}function Vi(t,e){let r=null;const o=()=>{const s=getSelection(),a=s&&s.anchorNode,i=t.getRootElement();a!==null&&i!==null&&i.contains(a)?r!==null&&(r(),r=null):r===null&&(r=Fi(t,e))};return t.registerRootListener(s=>{if(s){const a=s.ownerDocument;return a.addEventListener("selectionchange",o),o(),()=>{r!==null&&r(),a.removeEventListener("selectionchange",o)}}})}function Bi(t){const e=g.$findMatchingParent(t,r=>g.$isElementNode(r)&&!r.isInline());return g.$isElementNode(e)||dn(4,t.__key),e}function zi(t){const e=g.$getSelection()||g.$getPreviousSelection();let r;if(g.$isRangeSelection(e))r=g.$caretFromPoint(e.focus,"next");else{if(e!=null){const i=e.getNodes(),c=i[i.length-1];c&&(r=g.$getSiblingCaret(c,"next"))}r=r||g.$getChildCaret(g.$getRoot(),"previous").getFlipped().insert(g.$createParagraphNode())}const o=Gi(t,r),s=g.$getAdjacentChildCaret(o),a=g.$isChildCaret(s)?g.$normalizeCaret(s):o;return g.$setSelectionFromCaretRange(g.$getCollapsedCaretRange(a)),t.getLatest()}function Gi(t,e,r){let o=g.$getCaretInDirection(e,"next");for(let s=o;s;s=g.$splitAtPointCaretNext(s,r))o=s;return g.$isTextPointCaret(o)&&dn(283),o.insert(t.isInline()?g.$createParagraphNode().append(t):t),g.$getCaretInDirection(g.$getSiblingCaret(t.getLatest(),"next"),e.direction)}function Ki(t){const e=g.$getSelection();if(!g.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const a=o[s],i=a.getKey();if(r.has(i))continue;const c=g.$findMatchingParent(a,w=>g.$isElementNode(w)&&!w.isInline());if(c===null)continue;const d=c.getKey();c.canIndent()&&!r.has(d)&&(r.add(d),t(c))}return r.size>0}const qi=Symbol.for("preact-signals");function Nn(){if(Qt>1)return void Qt--;let t,e=!1;for(!function(){let r=wn;for(wn=void 0;r!==void 0;)r.S.v===r.v&&(r.S.i=r.i),r=r.o}();Ue!==void 0;){let r=Ue;for(Ue=void 0,pn++;r!==void 0;){const o=r.u;if(r.u=void 0,r.f&=-3,!(8&r.f)&&Mo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(pn=0,Qt--,e)throw t}function Ui(t){if(Qt>0)return t();qn=++Hi,Qt++;try{return t()}finally{Nn()}}let X,Ue;function zr(t){const e=X;X=void 0;try{return t()}finally{X=e}}let wn,Qt=0,pn=0,Hi=0,qn=0,an=0;function Gr(t){if(X===void 0)return;let e=t.n;return e===void 0||e.t!==X?(e={i:0,S:t,p:X.s,n:void 0,t:X,e:void 0,x:void 0,r:e},X.s!==void 0&&(X.s.n=e),X.s=e,t.n=e,32&X.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=X.s,e.n=void 0,X.s.n=e,X.s=e),e):void 0}function bt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Xe(t,e){return new bt(t,e)}function Mo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Kr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Do(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function fe(t,e){bt.call(this,void 0),this.x=t,this.s=void 0,this.g=an-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Yi(t,e){return new fe(t,e)}function Io(t){const e=t.m;if(t.m=void 0,typeof e=="function"){Qt++;const r=X;X=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,ar(t),o}finally{X=r,Nn()}}}function ar(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Io(t)}function Xi(t){if(X!==this)throw new Error("Out-of-order effect");Do(this),X=t,this.f&=-2,8&this.f&&ar(this),Nn()}function Te(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}function Ut(t,e){const r=new Te(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function Ve(t,e={}){const r={};for(const o in t){const s=e[o],a=Xe(s===void 0?t[o]:s);r[o]=a}return r}bt.prototype.brand=qi,bt.prototype.h=function(){return!0},bt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:zr(()=>{var r;(r=this.W)==null||r.call(this)}))},bt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&zr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},bt.prototype.subscribe=function(t){return Ut(()=>{const e=this.value,r=X;X=void 0;try{t(e)}finally{X=r}},{name:"sub"})},bt.prototype.valueOf=function(){return this.value},bt.prototype.toString=function(){return this.value+""},bt.prototype.toJSON=function(){return this.value},bt.prototype.peek=function(){const t=X;X=void 0;try{return this.value}finally{X=t}},Object.defineProperty(bt.prototype,"value",{get(){const t=Gr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(pn>100)throw new Error("Cycle detected");(function(e){Qt!==0&&pn===0&&e.l!==qn&&(e.l=qn,wn={S:e,v:e.v,i:e.i,o:wn})})(this),this.v=t,this.i++,an++,Qt++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Nn()}}}}),fe.prototype=new bt,fe.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===an))return!0;if(this.g=an,this.f|=1,this.i>0&&!Mo(this))return this.f&=-2,!0;const t=X;try{Kr(this),X=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return X=t,Do(this),this.f&=-2,!0},fe.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}bt.prototype.S.call(this,t)},fe.prototype.U=function(t){if(this.t!==void 0&&(bt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},fe.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(fe.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Gr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Te.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}},Te.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Io(this),Kr(this),Qt++;const t=X;return X=this,Xi.bind(this,t)},Te.prototype.N=function(){2&this.f||(this.f|=2,this.u=Ue,Ue=this)},Te.prototype.d=function(){this.f|=8,1&this.f||ar(this)},Te.prototype.dispose=function(){this.d()};g.defineExtension({build:(t,e,r)=>Ve(e),config:g.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return Ut(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Oo(){const t=g.$getRoot(),e=g.$getSelection(),r=g.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),g.$isRangeSelection(e)&&(e.format=0)}function Ao(t,e=Oo){return t.registerCommand(g.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),g.COMMAND_PRIORITY_EDITOR)}g.defineExtension({build:(t,e,r)=>Ve(e),config:g.safeCast({$onClear:Oo}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return Ut(()=>Ao(t,o.value))}});function Wi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const Tn=g.createState("format",{parse:t=>typeof t=="number"?t:0});class Po extends g.DecoratorNode{$config(){return this.config("decorator-text",{extends:g.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:Tn}]})}getFormat(){return g.$getState(this,Tn)}getFormatFlags(e,r){return g.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=g.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return g.$setState(this,Tn,e)}toggleFormat(e){const r=this.getFormat(),o=g.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Zi(t){return t instanceof Po}g.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Po],register:(t,e,r)=>t.registerCommand(g.FORMAT_TEXT_COMMAND,o=>{const s=g.$getSelection();if(g.$isNodeSelection(s)||g.$isRangeSelection(s))for(const a of s.getNodes())Zi(a)&&a.toggleFormat(o);return!1},g.COMMAND_PRIORITY_LOW)});function Lo(t,e){let r;return Xe(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const Un=g.defineExtension({build:t=>Lo(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function Z(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function $o(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=$o(r[s],o[s]);return t}return e}const ir=0,Hn=1,Fo=2,Mn=3,on=4,Re=5,Dn=6,Ge=7;function In(t){return t.id===ir}function Vo(t){return t.id===Fo}function Ji(t){return function(e){return e.id===Hn}(t)||Z(305,String(t.id),String(Hn)),Object.assign(t,{id:Fo})}const Qi=new Set;class tl{constructor(e,r){xt(this,"builder");xt(this,"configs");xt(this,"_dependency");xt(this,"_peerNameSet");xt(this,"extension");xt(this,"state");xt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:ir}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):g.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Vo(r)||Z(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,d,w){return Object.assign(c,{config:d,id:Mn,registerState:w})}(r,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(e,a.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:on,initResult:d,registerState:w})}(a,i,s)}build(e){const r=this.state;let o;r.id!==on&&Z(307,String(r.id),String(Re)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:Re,output:i,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==Re&&Z(308,String(o.id),String(Re));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:Dn})}(o),()=>{const a=this.state;a.id!==Ge&&Z(309,String(o.id),String(Ge)),this.state=function(i){return Object.assign(i,{id:Re})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==Dn&&Z(310,String(r.id),String(Dn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ge})}(r),o}getSignal(){return this._signal===void 0&&Z(311),this._signal}getInitResult(){this.extension.init===void 0&&Z(312,this.extension.name);const e=this.state;return function(r){return r.id>=on}(e)||Z(313,String(e.id),String(on)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=Mn}(e)||Z(314,String(e.id),String(Mn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Z(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Z(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Ge}(e)||Z(316,String(e.id),String(Ge)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Qi}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=Re})(e)||Z(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const qr={tag:g.HISTORY_MERGE_TAG};function el(){const t=g.$getRoot();t.isEmpty()&&t.append(g.$createParagraphNode())}const nl=g.defineExtension({config:g.safeCast({setOptions:qr,updateOptions:qr}),init:({$initialEditorState:t=el})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(g.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const i=t.parseEditorState(a);t.setEditorState(i,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[g.RootNode,g.TextNode,g.LineBreakNode,g.TabNode,g.ParagraphNode]}),Ur=Symbol.for("@lexical/extension/LexicalBuilder");function Hr(){}function rl(t){throw t}function sn(t){return Array.isArray(t)?t:[t]}const On="0.43.0+prod.esm";class De{constructor(e){xt(this,"roots");xt(this,"extensionNameMap");xt(this,"outgoingConfigEdges");xt(this,"incomingEdges");xt(this,"conflicts");xt(this,"_sortedExtensionReps");xt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=On,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[sn(nl)];for(const o of e)r.push(sn(o));return new De(r)}static maybeFromEditor(e){const r=e[Ur];return r&&(r.PACKAGE_VERSION!==On&&Z(292,r.PACKAGE_VERSION,On),r instanceof De||Z(293)),r}static fromEditor(e){const r=De.maybeFromEditor(e);return r===void 0&&Z(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(g.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Ur]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=Hr;function r(){try{e()}finally{e=Hr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=g.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&Z(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&Z(296);const r=sn(e),[o]=r;typeof o.name!="string"&&Z(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&Z(298,o.name),!s){s=new tl(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&Z(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&Z(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=sn(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(Vo(a))return;const i=o.extension.name;var c;In(a)||Z(300,i,s||"[unknown]"),In(c=a)||Z(304,String(c.id),String(ir)),a=Object.assign(c,{id:Hn}),o.state=a;const d=this.outgoingConfigEdges.get(i);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&r(p,i)}a=Ji(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())In(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&Z(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of r){const c=i.register(e,a);c&&s.push(c)}for(const i of r){const c=i.afterRegistration(e);c&&s.push(c)}return g.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:m}=p;if(m.onError!==void 0&&(e.onError=m.onError),m.disableEvents!==void 0&&(e.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(e.parentEditor=m.parentEditor),m.editable!==void 0&&(e.editable=m.editable),m.namespace!==void 0&&(e.namespace=m.namespace),m.$initialEditorState!==void 0&&(e.$initialEditorState=m.$initialEditorState),m.nodes)for(const f of Wi(m)){if(typeof f!="function"){const u=o.get(f.replace);u&&Z(302,m.name,f.replace.name,u.extension.name),o.set(f.replace,p)}r.add(f)}if(m.html){if(m.html.export)for(const[f,u]of m.html.export.entries())s.set(f,u);m.html.import&&Object.assign(a,m.html.import)}m.theme&&$o(i,m.theme)}Object.keys(i).length>0&&(e.theme=i),r.size&&(e.nodes=[...r]);const d=Object.keys(a).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=a),w&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=rl),e}}const ol=new Set,Yr=g.defineExtension({build(t,e,r){const o=r.getDependency(Un).output,s=Xe({watchedNodeKeys:new Map}),a=Lo(()=>{},()=>Ut(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(g.$getSelection())for(const[p,m]of c.entries()){if(m.size===0){c.delete(p);continue}const f=g.$getNodeByKey(p),u=f&&f.isSelected()||!1;w=w||u!==(!!i&&i.has(p)),u&&(d=d||new Set,d.add(p))}}),!w&&d&&i&&d.size===i.size||(a.value=d)}));return{watchNodeKey:function(i){const c=Yi(()=>(a.value||ol).has(i)),{watchedNodeKeys:d}=s.peek();let w=d.get(i);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(i,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[Un],name:"@lexical/extension/NodeSelection"}),sl=g.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Ae extends g.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Ae(e.__key)}static importJSON(e){return lr().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:al,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return g.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function al(){return{node:lr()}}function lr(){return g.$create(Ae)}function il(t){return t instanceof Ae}g.defineExtension({dependencies:[Un,Yr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Ae],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Yr).output,s=Xe({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return g.mergeRegister(t.registerCommand(sl,i=>{const c=g.$getSelection();if(!g.$isRangeSelection(c))return!1;if(c.focus.getNode()!==null){const d=lr();zi(d)}return!0},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLICK_COMMAND,i=>{if(g.isDOMNode(i.target)){const c=g.$getNodeFromDOMNode(i.target);if(il(c))return function(d,w=!1){const p=g.$getSelection(),m=d.isSelected(),f=d.getKey();let u;w&&g.$isNodeSelection(p)?u=p:(u=g.$createNodeSelection(),g.$setSelection(u)),m?u.delete(f):u.add(f)}(c,i.shiftKey),!0}return!1},g.COMMAND_PRIORITY_LOW),t.registerMutationListener(Ae,(i,c)=>{Ui(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,m]of i.entries())if(m==="destroyed")w.delete(p),d=!0;else{const f=w.get(p),u=t.getElementByKey(p);f?f.domNode.value=u:(d=!0,w.set(p,{domNode:Xe(u),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),Ut(()=>{const i=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())i.push(Ut(()=>{const w=c.value;w&&(d.value?g.addClassNamesToElement(w,a):g.removeClassNamesFromElement(w,a))}));return g.mergeRegister(...i)}))}});g.defineExtension({build:(t,e)=>Ve({inheritEditableFromParent:e.inheritEditableFromParent}),config:g.safeCast({$getParentEditor:function(){const t=g.$getEditor();return De.fromEditor(t),t},inheritEditableFromParent:!1}),init:(t,e,r)=>{const o=e.$getParentEditor();t.parentEditor=o,t.theme=t.theme||o._config.theme},name:"@lexical/extension/NestedEditor",register:(t,e,r)=>Ut(()=>{const o=t._parentEditor;if(o&&r.getOutput().inheritEditableFromParent.value)return t.setEditable(o.isEditable()),o.registerEditableListener(t.setEditable.bind(t))})});g.defineExtension({build:(t,e,r)=>Ve(e),config:g.safeCast({disabled:!1,onReposition:void 0}),name:"@lexical/utils/SelectionAlwaysOnDisplay",register:(t,e,r)=>{const o=r.getOutput();return Ut(()=>{if(!o.disabled.value)return Vi(t,o.onReposition.value)})}});function Bo(t){return t.canBeEmpty()}function ll(t,e,r=Bo){return g.mergeRegister(t.registerCommand(g.KEY_TAB_COMMAND,o=>{const s=g.$getSelection();if(!g.$isRangeSelection(s))return!1;o.preventDefault();const a=function(i){if(i.getNodes().filter(f=>g.$isBlockElementNode(f)&&f.canIndent()).length>0)return!0;const c=i.anchor,d=i.focus,w=d.isBefore(c)?d:c,p=w.getNode(),m=Bi(p);if(m.canIndent()){const f=m.getKey();let u=g.$createRangeSelection();if(u.anchor.set(f,0,"element"),u.focus.set(f,0,"element"),u=g.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(w))return!0}return!1}(s)?o.shiftKey?g.OUTDENT_CONTENT_COMMAND:g.INDENT_CONTENT_COMMAND:g.INSERT_TAB_COMMAND;return t.dispatchCommand(a,void 0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=g.$getSelection();if(!g.$isRangeSelection(s))return!1;const a=typeof r=="function"?r:r.peek();return Ki(i=>{if(a(i)){const c=i.getIndent()+1;(!o||c<o)&&i.setIndent(c)}})},g.COMMAND_PRIORITY_CRITICAL))}g.defineExtension({build:(t,e,r)=>Ve(e),config:g.safeCast({$canIndent:Bo,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:a}=r.getOutput();return Ut(()=>{if(!o.value)return ll(t,s,a)})}});const cl=g.defineExtension({name:"@lexical/react/ReactProvider"});function dl(){return g.$getRoot().getTextContent()}function wl(t,e=!0){if(t)return!1;let r=dl();return e&&(r=r.trim()),r===""}function pl(t){if(!wl(t,!1))return!1;const e=g.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(g.$isDecoratorNode(s))return!1;if(g.$isElementNode(s)){if(!g.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const d=a[o];if(!g.$isTextNode(d))return!1}}}return!0}function zo(t){return()=>pl(t)}function Go(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,m,f,u]=d;t.update(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){const y=x.anchor;let b=y.getNode(),E=0,v=0;if(g.$isTextNode(b)&&w>=0&&p>=0&&(E=w,v=w+p,x.setTextNodeRange(b,E,b,v)),E===v&&m===""||(x.insertRawText(m),b=y.getNode()),g.$isTextNode(b)){E=f,v=f+u;const _=b.getTextContentSize();E=E>_?_:E,v=v>_?_:v,x.setTextNodeRange(b,E,b,v)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}g.defineExtension({build:(t,e,r)=>Ve(e),config:g.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>Ut(()=>r.getOutput().disabled.value?void 0:Go(t))});function ul(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const cr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ml({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=l.useState(()=>r.getDecorators());return cr(()=>r.registerDecoratorListener(i=>{$r.flushSync(()=>{a(i)})}),[r]),l.useEffect(()=>{a(r.getDecorators())},[r]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=n.jsx(o,{onError:f=>r._onError(f),children:n.jsx(l.Suspense,{fallback:null,children:s[w]})}),m=r.getElementByKey(w);m!==null&&i.push($r.createPortal(p,m,w))}return i},[o,s,r])}(t,e)}function fl({editor:t,ErrorBoundary:e}){return function(r){const o=De.maybeFromEditor(r);if(o&&o.hasExtensionByName(cl.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&ul(320,s);return!0}return!1}(t)?null:n.jsx(ml,{editor:t,ErrorBoundary:e})}function Xr(t){return t.getEditorState().read(zo(t.isComposing()))}function hl({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Zt();return function(s){cr(()=>g.mergeRegister(Vn.registerRichText(s),Go(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(gl,{content:e}),n.jsx(fl,{editor:o,ErrorBoundary:r})]})}function gl({content:t}){const[e]=Zt(),r=function(s){const[a,i]=l.useState(()=>Xr(s));return cr(()=>{function c(){const d=Xr(s);i(d)}return c(),g.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=Di();return r?typeof t=="function"?t(o):t:null}function xl({defaultSelection:t}){const[e]=Zt();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const bl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function vl({onClear:t}){const[e]=Zt();return bl(()=>Ao(e,t),[e,t]),null}const Ko=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function yl({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:m,ariaRequired:f,autoCapitalize:u,className:x,id:y,role:b="textbox",spellCheck:E=!0,style:v,tabIndex:_,"data-testid":k,...L},F){const[A,R]=l.useState(t.isEditable()),M=l.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?t.setRootElement(P):t.setRootElement(null)},[t]),T=l.useMemo(()=>function(...P){return O=>{for(const q of P)typeof q=="function"?q(O):q!=null&&(q.current=O)}}(F,M),[M,F]);return Ko(()=>(R(t.isEditable()),t.registerEditableListener(P=>{R(P)})),[t]),n.jsx("div",{"aria-activedescendant":A?e:void 0,"aria-autocomplete":A?r:"none","aria-controls":A?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":A&&b==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":A?m:void 0,"aria-readonly":!A||void 0,"aria-required":f,autoCapitalize:u,className:x,contentEditable:A,"data-testid":k,id:y,ref:T,role:b,spellCheck:E,style:v,tabIndex:_,...L})}const jl=l.forwardRef(yl);function Wr(t){return t.getEditorState().read(zo(t.isComposing()))}const Nl=l.forwardRef(kl);function kl(t,e){const{placeholder:r,...o}=t,[s]=Zt();return n.jsxs(n.Fragment,{children:[n.jsx(jl,{editor:s,...o,ref:e}),r!=null&&n.jsx(_l,{editor:s,content:r})]})}function _l({content:t,editor:e}){const r=function(i){const[c,d]=l.useState(()=>Wr(i));return Ko(()=>{function w(){const p=Wr(i);d(p)}return w(),g.mergeRegister(i.registerUpdateListener(()=>{w()}),i.registerEditableListener(()=>{w()}))},[i]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(i=>{s(i)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function Cl({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Nl,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const qo=l.createContext(void 0);function El({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(qo.Provider,{value:i,children:a})}function Uo(){const t=l.useContext(qo);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Sl(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:a,content:i}=t;return n.jsx(go,{open:!0,onOpenChange:r,children:n.jsxs(Zn,{children:[n.jsx(Jn,{children:n.jsx(Qn,{children:a})}),i]})})},[t,r]),s=l.useCallback((a,i,c=!1)=>{e({closeOnClickOutside:c,content:i(r),title:a})},[r]);return[o,s]}function Rl({children:t}){const[e]=Zt(),[r,o]=l.useState(e),[s,a]=l.useState("paragraph"),[i,c]=Sl(),d=()=>{};return l.useEffect(()=>r.registerCommand(g.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),g.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(El,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:a,showModal:c,children:[i,t({blockType:s})]})}function Tl(t){const[e]=Zt(),{activeEditor:r}=Uo();l.useEffect(()=>r.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const o=g.$getSelection();return o&&t(o),!1},g.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=g.$getSelection();o&&t(o)})},[r,t])}const Ho=pe.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Ml=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(po.Root,{ref:s,className:h(Ho({variant:e,size:r,className:t})),...o}));Ml.displayName=po.Root.displayName;const Yo=l.createContext({size:"default",variant:"default"}),kn=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const i=it();return n.jsx(yn.Root,{ref:a,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:i,children:n.jsx(Yo.Provider,{value:{variant:e,size:r},children:o})})});kn.displayName=yn.Root.displayName;const Ie=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const i=l.useContext(Yo);return n.jsx(yn.Item,{ref:a,className:h(Ho({variant:i.variant||r,size:i.size||o}),t),...s,children:e})});Ie.displayName=yn.Item.displayName;const Zr=[{format:"bold",icon:C.BoldIcon,label:"Bold"},{format:"italic",icon:C.ItalicIcon,label:"Italic"}];function Dl(){const{activeEditor:t}=Uo(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(g.$isRangeSelection(s)||Ka.$isTableSelection(s)){const a=[];Zr.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),r(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return Tl(o),n.jsx(kn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Zr.map(({format:s,icon:a,label:i})=>n.jsx(Ie,{value:s,"aria-label":i,onClick:()=>{t.dispatchCommand(g.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function Il({onClear:t}){const[e]=Zt();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(g.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Ol({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Rl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Dl,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(hl,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Cl,{placeholder:t})}),ErrorBoundary:Ri}),e&&n.jsx(xl,{defaultSelection:"rootEnd"}),n.jsx(Il,{onClear:r}),n.jsx(vl,{})]})]})}const Al={namespace:"commentEditor",theme:or,nodes:sr,onError:t=>{console.error(t)}};function un({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i,className:c}){return n.jsx("div",{className:h("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(Ni,{initialConfig:{...Al,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(mt,{children:[n.jsx(Ol,{placeholder:s,autoFocus:a,onClear:i}),n.jsx(_i,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function Pl(t,e){const r=g.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!Wo.has(a.nodeName)){const i=Zo(a,t,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof g.ArtificialNode__DO_NOT_USE&&i.insertAfter(g.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const d of c)i.insertBefore(d);i.remove()}}(s),o}function Ll(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=g.$getRoot().getChildren();for(let s=0;s<o.length;s++)Xo(t,o[s],r,e);return r.innerHTML}function Xo(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=g.$isElementNode(e)&&e.excludeFromCopy("html");let i=e;o!==null&&g.$isTextNode(e)&&(i=Oi(o,e,"clone"));const c=g.$isElementNode(i)?i.getChildren():[],d=g.getRegisteredNode(t,i.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,i):i.exportDOM(t);const{element:p,after:m}=w;if(!p)return!1;const f=document.createDocumentFragment();for(let u=0;u<c.length;u++){const x=c[u],y=Xo(t,x,f,o);!s&&g.$isElementNode(e)&&y&&e.extractWithChild(x,o,"html")&&(s=!0)}if(s&&!a){if((g.isHTMLElement(p)||g.isDocumentFragment(p))&&p.append(f),r.append(p),m){const u=m.call(i,p);u&&(g.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(f);return s}const Wo=new Set(["STYLE","SCRIPT"]);function Zo(t,e,r,o,s=new Map,a){let i=[];if(Wo.has(t.nodeName))return i;let c=null;const d=function(x,y){const{nodeName:b}=x,E=y._htmlConversions.get(b.toLowerCase());let v=null;if(E!==void 0)for(const _ of E){const k=_(x);k!==null&&(v===null||(v.priority||0)<=(k.priority||0))&&(v=k)}return v!==null?v.conversion:null}(t,e),w=d?d(t):null;let p=null;if(w!==null){p=w.after;const x=w.node;if(c=Array.isArray(x)?x[x.length-1]:x,c!==null){for(const[,y]of s)if(c=y(c,a),!c)break;c&&i.push(...Array.isArray(x)?x:[c])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const m=t.childNodes;let f=[];const u=(c==null||!g.$isRootOrShadowRoot(c))&&(c!=null&&g.$isBlockElementNode(c)||o);for(let x=0;x<m.length;x++)f.push(...Zo(m[x],e,r,u,new Map(s),c));return p!=null&&(f=p(f)),g.isBlockDomNode(t)&&(f=$l(t,f,u?()=>{const x=new g.ArtificialNode__DO_NOT_USE;return r.push(x),x}:g.$createParagraphNode)),c==null?f.length>0?i=i.concat(f):g.isBlockDomNode(t)&&function(x){return x.nextSibling==null||x.previousSibling==null?!1:g.isInlineDomNode(x.nextSibling)&&g.isInlineDomNode(x.previousSibling)}(t)&&(i=i.concat(g.$createLineBreakNode())):g.$isElementNode(c)&&c.append(...f),i}function $l(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let i=0;i<e.length;i++){const c=e[i];if(g.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===e.length-1||i<e.length-1&&g.$isBlockElementNode(e[i+1])){const d=r();d.setFormat(o),d.append(...a),s.push(d),a=[]}}return s}function Jo(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Qo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Qo(e.children)):!1}function Dt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Qo(t.root.children):!1}function Fl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=io.createHeadlessEditor({namespace:"EditorUtils",theme:or,nodes:sr,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=Pl(e,s);g.$getRoot().clear(),g.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function mn(t){const e=io.createHeadlessEditor({namespace:"EditorUtils",theme:or,nodes:sr,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=Ll(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function dr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function ln(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function wr(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const Vl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function An(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function Bl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o,initialAssignedUser:s}){const[a,i]=l.useState(Vl),[c,d]=l.useState(s),[w,p]=l.useState(!1),m=l.useRef(void 0),f=l.useRef(null);l.useEffect(()=>{let v=!0;const _=f.current;if(!_)return;const k=setTimeout(()=>{v&&Jo(_)},300);return()=>{v=!1,clearTimeout(k)}},[]);const u=l.useCallback(()=>{if(!Dt(a))return;const v=mn(a);e(v,c)},[a,e,c]),x=o["%commentEditor_placeholder%"]??"Type your comment here...",y=o["%commentEditor_saveButton_tooltip%"]??"Save comment",b=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",E=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:E}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(C.X,{})})}),n.jsx(ft,{children:n.jsx("p",{children:b})})]})}),n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:u,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Dt(a),children:n.jsx(C.Check,{})})}),n.jsx(ft,{children:n.jsx("p",{children:y})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Wt,{open:w,onOpenChange:p,children:[n.jsx(ee,{asChild:!0,children:n.jsxs(B,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(C.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:An(c!==void 0?c:"",o)})]})}),n.jsx(Pt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:v=>{v.key==="Escape"&&(v.stopPropagation(),p(!1))},children:n.jsx(Yt,{children:n.jsx(Xt,{children:t.map(v=>n.jsx(At,{onSelect:()=>{d(v||void 0),p(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:An(v,o)})},v||"unassigned"))})})})]})}),n.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:v=>{v.key==="Escape"?(v.preventDefault(),v.stopPropagation(),r()):wr(v)&&(v.preventDefault(),v.stopPropagation(),Dt(a)&&u())},onKeyDown:v=>{dr(v),(v.key==="Enter"||v.key===" ")&&v.stopPropagation()},children:n.jsx(un,{editorSerializedState:a,onSerializedChange:v=>i(v),placeholder:x,onClear:v=>{m.current=v}})})]})}const zl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),Gl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%comment_aria_assign_user%","%comment_aria_submit_comment%","%comment_aria_mark_as_read%","%comment_aria_mark_as_unread%","%comment_aria_resolve_thread%"],Kl=["input","select","textarea","button"],ql=["button","textbox"],ts=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,d]=l.useState(void 0),w=l.useCallback(u=>{i(u);const x=t.find(b=>b.id===u);x&&(e==null||e(x));const y=document.getElementById(u);y&&(y.scrollIntoView({block:"center"}),y.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=l.useCallback(u=>{const x=t.find(y=>y.id===u);x&&(d(y=>y===u?void 0:u),r==null||r(x))},[r,t]),m=u=>{if(!u)return!1;const x=u.tagName.toLowerCase();if(u.isContentEditable||Kl.includes(x))return!0;const y=u.getAttribute("role");if(y&&ql.includes(y))return!0;const b=u.getAttribute("tabindex");return b!==void 0&&b!=="-1"},f=l.useCallback(u=>{var A;const x=u.target,y=R=>R?document.getElementById(R):void 0,b=y(c),E=y(a);if(!!(b&&x&&b.contains(x)&&x!==b)&&m(x)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!x.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const R=t.find(M=>M.id===c);R&&w(R.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!b)return;const R=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(R.length===0)return;const M=R.findIndex(P=>P===x);if(M===-1)return;let T;u.key==="ArrowDown"?T=Math.min(M+1,R.length-1):T=Math.max(M-1,0),T!==M&&(u.preventDefault(),u.stopPropagation(),(A=R[T])==null||A.focus());return}return}const k=t.findIndex(R=>R.id===a);let L=k;switch(u.key){case"ArrowDown":L=Math.min(k+1,t.length-1),u.preventDefault();break;case"ArrowUp":L=Math.max(k-1,0),u.preventDefault();break;case"Home":L=0,u.preventDefault();break;case"End":L=t.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const R=E;if(R){const M=R.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=R.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=M??T;if(P){u.preventDefault(),P.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(m(x)||(o==null||o(u.key),u.preventDefault()));return}const F=t[L];F&&w(F.id)},[t,w,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:f,focusOption:w}},es=pe.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),be=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:h("pr-twp",es({variant:e}),t),...r}));be.displayName="Badge";const pr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));pr.displayName="Card";const ns=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));ns.displayName="CardHeader";const rs=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));rs.displayName="CardTitle";const os=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:h("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));os.displayName="CardDescription";const ur=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-p-6 tw-pt-0",t),...e}));ur.displayName="CardContent";const ss=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));ss.displayName="CardFooter";const ve=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(uo.Root,{ref:s,decorative:r,orientation:e,className:h("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));ve.displayName=uo.Root.displayName;const mr=l.forwardRef(({className:t,...e},r)=>n.jsx($e.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));mr.displayName=$e.Root.displayName;const as=l.forwardRef(({className:t,...e},r)=>n.jsx($e.Image,{ref:r,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));as.displayName=$e.Image.displayName;const fr=l.forwardRef(({className:t,...e},r)=>n.jsx($e.Fallback,{ref:r,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));fr.displayName=$e.Fallback.displayName;const hr=l.createContext(void 0);function Lt(){const t=l.useContext(hr);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ne=pe.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ce=Q.Trigger,gr=Q.Group,is=Q.Portal,ls=Q.Sub,cs=Q.RadioGroup;function te({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(hr.Provider,{value:r,children:n.jsx(Q.Root,{...e})})}const xr=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Lt();return n.jsxs(Q.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,ne({variant:a.variant})),...o,children:[r,n.jsx(C.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});xr.displayName=Q.SubTrigger.displayName;const br=l.forwardRef(({className:t,children:e,...r},o)=>{const s=it();return n.jsx(Q.SubContent,{ref:o,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});br.displayName=Q.SubContent.displayName;const Ht=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=it();return n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:s,sideOffset:e,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});Ht.displayName=Q.Content.displayName;const We=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=it(),a=Lt();return n.jsx(Q.Item,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,ne({variant:a.variant})),...r,dir:s})});We.displayName=Q.Item.displayName;const qt=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=it(),i=Lt();return n.jsxs(Q.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ne({variant:i.variant})),checked:r,...o,dir:a,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});qt.displayName=Q.CheckboxItem.displayName;const vr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=it(),a=Lt();return n.jsxs(Q.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ne({variant:a.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(C.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});vr.displayName=Q.RadioItem.displayName;const Be=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Be.displayName=Q.Label.displayName;const _e=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));_e.displayName=Q.Separator.displayName;function ds({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}ds.displayName="DropdownMenuShortcut";function Jr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:i,canEditOrDelete:c=!1}){const[d,w]=l.useState(!1),[p,m]=l.useState(),f=l.useRef(null);l.useEffect(()=>{if(!d)return;let k=!0;const L=f.current;if(!L)return;const F=setTimeout(()=>{k&&Jo(L)},300);return()=>{k=!1,clearTimeout(F)}},[d]);const u=l.useCallback(k=>{k&&k.stopPropagation(),w(!1),m(void 0),i==null||i(!1)},[i]),x=l.useCallback(async k=>{if(k&&k.stopPropagation(),!p||!s)return;await s(t.id,mn(p))&&(w(!1),m(void 0),i==null||i(!1))},[p,s,t.id,i]),y=l.useMemo(()=>{const k=new Date(t.date),L=N.formatRelativeDate(k,r["%comment_date_today%"],r["%comment_date_yesterday%"]),F=k.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return N.formatReplacementString(r["%comment_dateAtTime%"],{date:L,time:F})},[t.date,r]),b=l.useMemo(()=>t.user,[t.user]),E=l.useMemo(()=>t.user.split(" ").map(k=>k[0]).join("").toUpperCase().slice(0,2),[t.user]),v=l.useMemo(()=>N.sanitizeHtml(t.contents),[t.contents]),_=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(We,{onClick:k=>{k.stopPropagation(),w(!0),m(Fl(t.contents)),i==null||i(!0)},children:[n.jsx(C.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(We,{onClick:async k=>{k.stopPropagation(),a&&await a(t.id)},children:[n.jsx(C.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,i]);return n.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(mr,{className:"tw-h-8 tw-w-8",children:n.jsx(fr,{className:"tw-text-xs tw-font-medium",children:E})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:y}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(be,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",ln(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:f,onKeyDownCapture:k=>{k.key==="Escape"?(k.preventDefault(),k.stopPropagation(),u()):wr(k)&&(k.preventDefault(),k.stopPropagation(),Dt(p)&&x())},onKeyDown:k=>{dr(k),(k.key==="Enter"||k.key===" ")&&k.stopPropagation()},onClick:k=>{k.stopPropagation()},children:[n.jsx(un,{className:h('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:k=>m(k)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(B,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(C.X,{})}),n.jsx(B,{size:"icon",onClick:x,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(p),children:n.jsx(C.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:v}})]})]}),_&&n.jsxs(te,{children:[n.jsx(ce,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"icon",children:n.jsx(C.MoreHorizontal,{})})}),n.jsx(Ht,{align:"end",children:_})]})]})}const Qr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Ul({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:i,handleSelectThread:c,threadId:d,thread:w,threadStatus:p,handleAddCommentToThread:m,handleUpdateComment:f,handleDeleteComment:u,handleReadStatusChange:x,assignableUsers:y,canUserAddCommentToThread:b,canUserAssignThreadCallback:E,canUserResolveThreadCallback:v,canUserEditOrDeleteCommentCallback:_,isRead:k=!1,autoReadDelay:L=5,onVerseRefClick:F,initialAssignedUser:A}){const[R,M]=l.useState(Qr),[T,P]=l.useState(),[O,q]=l.useState(),$=o,[H,j]=l.useState(!1),[G,lt]=l.useState(!1),[ht,Ct]=l.useState(!1),[dt,Nt]=l.useState(!1),[z,nt]=l.useState(!1),[Y,ct]=l.useState(k),[gt,re]=l.useState(!1),oe=l.useRef(void 0),[Ee,se]=l.useState(new Map);l.useEffect(()=>{let I=!0;return(async()=>{const Tt=v?await v(d):!1;I&&nt(Tt)})(),()=>{I=!1}},[d,v]),l.useEffect(()=>{let I=!0;if(!o){Nt(!1),se(new Map);return}return(async()=>{const Tt=E?await E(d):!1;I&&Nt(Tt)})(),()=>{I=!1}},[o,d,E]);const Se=l.useRef(o),$t=l.useRef(!1),ae=l.useRef(!1);l.useEffect(()=>{const I=Se.current&&!o;if(Se.current=o,!o){I&&(P(void 0),q(void 0)),$t.current=!1,ae.current=!1;return}dt?!$t.current&&!ae.current&&A!==void 0&&A!==a&&(P(A),$t.current=!0):$t.current&&(P(void 0),$t.current=!1,ae.current=!1)},[o,A,dt,a]);const D=l.useMemo(()=>e.filter(I=>!I.deleted),[e]);l.useEffect(()=>{let I=!0;if(!o||!_){se(new Map);return}return(async()=>{const Tt=new Map;await Promise.all(D.map(async ze=>{const Aa=await _(ze.id);I&&Tt.set(ze.id,Aa)})),I&&se(Tt)})(),()=>{I=!1}},[o,D,_]);const S=l.useMemo(()=>D[0],[D]),V=l.useRef(null),U=l.useRef(void 0),K=l.useCallback(()=>{var I;(I=U.current)==null||I.call(U),M(Qr)},[]),rt=l.useCallback(()=>{const I=!Y;ct(I),re(!I),x==null||x(d,I)},[Y,x,d]);l.useEffect(()=>{j(!1)},[o]),l.useEffect(()=>{if(o&&!Y&&!gt){const I=setTimeout(()=>{ct(!0),x==null||x(d,!0)},L*1e3);return oe.current=I,()=>clearTimeout(I)}oe.current&&(clearTimeout(oe.current),oe.current=void 0)},[o,Y,gt,L,d,x]);const W=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),ut=l.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const I=ln(a,r);return N.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:I})},[a,r]),J=l.useMemo(()=>D.slice(1),[D]),st=l.useMemo(()=>J.length??0,[J.length]),Rt=l.useMemo(()=>st>0,[st]),Jt=l.useMemo(()=>H||st<=2?J:J.slice(-2),[J,st,H]),Ft=l.useMemo(()=>H||st<=2?0:st-2,[st,H]),ue=l.useMemo(()=>st===1?W.singleReply:N.formatReplacementString(W.multipleReplies,{count:st}),[st,W]),Oa=l.useMemo(()=>Ft===1?W.singleReply:N.formatReplacementString(W.multipleReplies,{count:Ft}),[Ft,W]);l.useEffect(()=>{!o&&G&&Rt&&lt(!1)},[o,G,Rt]);const Pr=l.useCallback(async I=>{I&&I.stopPropagation();const Vt=Dt(R)?mn(R):void 0;if(T!==void 0){await m({threadId:d,contents:Vt,assignedUser:T})&&(q(T),Vt&&K());return}Vt&&await m({threadId:d,contents:Vt})&&K()},[K,R,m,T,d]),Lr=l.useCallback(async I=>{const Vt=Dt(R)?mn(R):void 0,Tt=I.status?I.assignedUser:T??I.assignedUser,ze=await m({...I,contents:Vt,assignedUser:Tt});return ze&&(Tt!==void 0&&q(Tt),Vt&&K()),ze},[K,R,m,T]);if(D.length!==0)return n.jsx(pr,{role:"option","aria-selected":o,id:d,className:h("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&Y,"tw-bg-background":o&&p!=="Resolved"&&Y,"tw-bg-muted":p==="Resolved","tw-bg-accent":!Y&&!o&&p!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(ur,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[ut&&n.jsx(be,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:ut}),n.jsx(B,{variant:"ghost",size:"icon",onClick:I=>{I.stopPropagation(),rt()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":Y?r["%comment_aria_mark_as_unread%"]??"Mark as unread":r["%comment_aria_mark_as_read%"]??"Mark as read",children:Y?n.jsx(C.MailOpen,{}):n.jsx(C.Mail,{})}),z&&p!=="Resolved"&&n.jsx(B,{variant:"ghost",size:"icon",className:h("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:I=>{I.stopPropagation(),Lr({threadId:d,status:"Resolved"})},"aria-label":r["%comment_aria_resolve_thread%"]??"Resolve thread",children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:V,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":$},{"tw-whitespace-nowrap":!$}),children:[s&&F?n.jsx(B,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:I=>{I.stopPropagation(),F(w)},children:s}):s,n.jsxs("span",{className:t,children:[S.contextBefore,n.jsx("span",{className:"tw-font-bold",children:S.selectedText}),S.contextAfter]})]})}),n.jsx(Jr,{comment:S,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:Lr,handleUpdateComment:f,handleDeleteComment:u,onEditingChange:lt,canEditOrDelete:(!G&&Ee.get(S.id))??!1,canUserResolveThread:z})]}),n.jsxs(n.Fragment,{children:[Rt&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ve,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ue})]}),!o&&Dt(R)&&n.jsx(un,{editorSerializedState:R,onSerializedChange:I=>M(I),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[Ft>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:I=>{I.stopPropagation(),j(!0)},role:"button",tabIndex:0,onKeyDown:I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),I.stopPropagation(),j(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ve,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Oa}),H?n.jsx(C.ChevronUp,{}):n.jsx(C.ChevronDown,{})]})]}),Jt.map(I=>n.jsx("div",{children:n.jsx(Jr,{comment:I,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:f,handleDeleteComment:u,onEditingChange:lt,canEditOrDelete:(!G&&Ee.get(I.id))??!1})},I.id)),b!==!1&&(!G||Dt(R))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:I=>I.stopPropagation(),onKeyDownCapture:I=>{wr(I)&&(I.preventDefault(),I.stopPropagation(),(Dt(R)||T!==void 0&&T!==O)&&Pr())},onKeyDown:I=>{dr(I),(I.key==="Enter"||I.key===" ")&&I.stopPropagation()},children:[n.jsx(un,{editorSerializedState:R,onSerializedChange:I=>M(I),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:I=>{U.current=I}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[T!==void 0&&(Dt(R)||T!==O)&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:N.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:ln(T,r)})}),n.jsxs(Wt,{open:ht,onOpenChange:Ct,children:[n.jsx(ee,{asChild:!0,children:n.jsx(B,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!dt||!y||y.length===0||!y.includes(i),"aria-label":r["%comment_aria_assign_user%"]??"Assign user",children:n.jsx(C.AtSign,{})})}),n.jsx(Pt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:I=>{I.key==="Escape"&&(I.stopPropagation(),Ct(!1))},children:n.jsx(Yt,{children:n.jsx(Xt,{children:y==null?void 0:y.map(I=>n.jsx(At,{onSelect:()=>{P(I!==a?I:void 0),$t.current=!1,ae.current=!0,q(void 0),Ct(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:ln(I,r)})},I||"unassigned"))})})})]}),n.jsx(B,{size:"icon",onClick:Pr,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Dt(R)&&(T===void 0||T===O),"aria-label":r["%comment_aria_submit_comment%"]??"Submit comment",children:n.jsx(C.ArrowUp,{})})]})]})]})]})]})})}function Hl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:u,selectedThreadId:x,onSelectedThreadChange:y,onVerseRefClick:b}){const[E,v]=l.useState(new Set),[_,k]=l.useState(),[L,F]=l.useState(),A=l.useCallback(async j=>{const G=await a(j);return G!==void 0&&j.assignedUser!==void 0&&j.assignedUser!==""&&F(j.assignedUser),G},[a]);l.useEffect(()=>{x&&(v(j=>new Set(j).add(x)),k(x))},[x]);const R=r.filter(j=>j.comments.some(G=>!G.deleted)),M=R.map(j=>({id:j.id})),T=l.useCallback(j=>{v(G=>new Set(G).add(j.id)),k(j.id),y==null||y(j.id)},[y]),P=l.useCallback(j=>{const G=E.has(j);v(lt=>{const ht=new Set(lt);return ht.has(j)?ht.delete(j):ht.add(j),ht}),k(j),y==null||y(G?void 0:j)},[E,y]),{listboxRef:O,activeId:q,handleKeyDown:$}=ts({options:M,onOptionSelect:T}),H=l.useCallback(j=>{j.key==="Escape"?(_&&E.has(_)&&(v(G=>{const lt=new Set(G);return lt.delete(_),lt}),k(void 0),y==null||y(void 0)),j.preventDefault(),j.stopPropagation()):$(j)},[_,E,$,y]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:O,"aria-activedescendant":q??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:H,children:R.map(j=>n.jsx("div",{className:h({"tw-opacity-60":j.status==="Resolved"}),children:n.jsx(Ul,{classNameForVerseText:e,comments:j.comments,localizedStrings:s,verseRef:j.verseRef,handleSelectThread:P,threadId:j.id,thread:j,isRead:j.isRead,isSelected:E.has(j.id),currentUser:o,assignedUser:j.assignedUser,threadStatus:j.status,handleAddCommentToThread:A,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:b,initialAssignedUser:L})},j.id))})}function Yl({table:t}){return n.jsxs(te,{children:[n.jsx(lo.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(C.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Ht,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Be,{children:"Toggle columns"}),n.jsx(_e,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(qt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const ye=ot.Root,ws=ot.Group,je=ot.Value,ps=pe.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),de=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=it();return n.jsxs(ot.Trigger,{className:h(ps({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(ot.Icon,{asChild:!0,children:n.jsx(C.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});de.displayName=ot.Trigger.displayName;const yr=l.forwardRef(({className:t,...e},r)=>n.jsx(ot.ScrollUpButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(C.ChevronUp,{className:"tw-h-4 tw-w-4"})}));yr.displayName=ot.ScrollUpButton.displayName;const jr=l.forwardRef(({className:t,...e},r)=>n.jsx(ot.ScrollDownButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(C.ChevronDown,{className:"tw-h-4 tw-w-4"})}));jr.displayName=ot.ScrollDownButton.displayName;const we=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=it();return n.jsx(ot.Portal,{children:n.jsxs(ot.Content,{ref:s,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(yr,{}),n.jsx(ot.Viewport,{className:h("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(jr,{})]})})});we.displayName=ot.Content.displayName;const us=l.forwardRef(({className:t,...e},r)=>n.jsx(ot.Label,{ref:r,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));us.displayName=ot.Label.displayName;const Et=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(ot.Item,{ref:o,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ot.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(ot.ItemText,{children:e})]}));Et.displayName=ot.Item.displayName;const ms=l.forwardRef(({className:t,...e},r)=>n.jsx(ot.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ms.displayName=ot.Separator.displayName;function Xl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(ye,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(de,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(je,{placeholder:t.getState().pagination.pageSize})}),n.jsx(we,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(Et,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(C.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(C.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(C.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(C.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const to=`
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
`;function Wl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ze(t,e){const r=e?`${to}, ${e}`:to;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Wl(o))}const Je=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Ze(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Ze(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return n.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Je.displayName="Table";const Qe=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Qe.displayName="TableHeader";const tn=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:h("[&_tr:last-child]:tw-border-0",t),...e}));tn.displayName="TableBody";const fs=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));fs.displayName="TableFooter";function Zl(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ze(t.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Jl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Ql(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Kt=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),Zl(i);const c=l.useMemo(()=>i.current?Ze(i.current):[],[i]),d=l.useCallback(p=>{const{current:m}=i;if(!m||!m.parentElement)return;const f=m.closest("table"),u=f?Ze(f).filter(b=>b.tagName==="TR"):[],x=u.indexOf(m),y=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Ql(u,x,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Jl(c,y,p.key);else if(p.key==="Escape"){p.preventDefault();const b=m.closest("table");b&&b.focus()}e==null||e(p)},[i,c,e]),w=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:d,onFocus:w,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Kt.displayName="TableRow";const Pe=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Pe.displayName="TableHead";const le=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));le.displayName="TableCell";const hs=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));hs.displayName="TableCaption";function fn({className:t,...e}){return n.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function gs({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var F;const[p,m]=l.useState([]),[f,u]=l.useState([]),[x,y]=l.useState({}),[b,E]=l.useState({}),v=l.useMemo(()=>e??[],[e]),_=vt.useReactTable({data:v,columns:t,getCoreRowModel:vt.getCoreRowModel(),...r&&{getPaginationRowModel:vt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:vt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:vt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:E,state:{sorting:p,columnFilters:f,columnVisibility:x,rowSelection:b}}),k=_.getVisibleFlatColumns();let L;return d?L=Array.from({length:10}).map((M,T)=>`skeleton-row-${T}`).map(M=>n.jsx(Kt,{className:"hover:tw-bg-transparent",children:n.jsx(le,{colSpan:k.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(fn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},M)):((F=_.getRowModel().rows)==null?void 0:F.length)>0?L=_.getRowModel().rows.map(A=>n.jsx(Kt,{onClick:()=>i(A,_),"data-state":A.getIsSelected()&&"selected",children:A.getVisibleCells().map(R=>n.jsx(le,{children:vt.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},A.id)):L=n.jsx(Kt,{children:n.jsx(le,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Yl,{table:_}),n.jsxs(Je,{stickyHeader:a,children:[n.jsx(Qe,{stickyHeader:a,children:_.getHeaderGroups().map(A=>n.jsx(Kt,{children:A.headers.map(R=>n.jsx(Pe,{className:"tw-p-0",children:R.isPlaceholder?void 0:vt.flexRender(R.column.columnDef.header,R.getContext())},R.id))},A.id))}),n.jsx(tn,{children:L})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(B,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),n.jsx(B,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Xl,{table:_})]})}function tc({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Wa,{options:a,children:e})})}const xs=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),eo=(t,e)=>t[e]??e;function bs({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=eo(r,"%webView_error_dump_header%"),a=eo(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:n.jsx(C.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const ec=Object.freeze([...xs,"%webView_error_dump_copied_message%"]);function nc({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[i,c]=l.useState(!1),d=()=>{c(!0),e&&e()},w=p=>{p||c(!1)};return n.jsxs(Wt,{onOpenChange:w,children:[n.jsx(ee,{asChild:!0,children:o}),n.jsxs(Pt,{id:a,className:h("tw-min-w-80 tw-max-w-96",s),children:[i&&r["%webView_error_dump_copied_message%"]&&n.jsx(wt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(bs,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var vs=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(vs||{});function rc({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[a,i]=l.useState({}),c=(w,p)=>{const m=!o[w][p];s(u=>(u[w][p]=m,{...u}));const f=r[w].items[p];f.onUpdate(f.id,m)},d=(w,p)=>{i(f=>(f[w]=p,{...f}));const m=r[w].items.find(f=>f.id===p);m?m.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(te,{children:[n.jsx(ce,{asChild:!0,children:n.jsxs(B,{variant:"default",children:[n.jsx(C.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(C.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Ht,{children:r.map((w,p)=>n.jsxs("div",{children:[n.jsx(Be,{children:w.label}),n.jsx(gr,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((m,f)=>n.jsx("div",{children:n.jsx(qt,{checked:o[p][f],onCheckedChange:()=>c(p,f),children:m.label})},m.id))}):n.jsx(cs,{value:a[p],onValueChange:m=>d(p,m),children:w.items.map(m=>n.jsx("div",{children:n.jsx(vr,{value:m.id,children:m.label})},m.id))})}),n.jsx(_e,{})]},w.label))})]})})}function oc({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const d=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,m)=>p+m,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(C.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(C.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(C.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function sc({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function a(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,m=w.getUTCMonth(),f=w.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:m>0?u=`${m.toString()} month${m===1?"":"s"} ago`:f===0?u="today":u=`${f.toString()} day${f===1?"":"s"} ago`,u}const i=Object.entries(e).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function ac({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>N.formatBytes(r),[r]),d=(w=>{const p=new Intl.DisplayNames(N.getCurrentLocale(),{type:"language"});return w.map(m=>p.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(sc,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:i})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function ys({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:m=!1,sortSelected:f=!1,icon:u=void 0,className:x=void 0,variant:y="ghost",id:b}){const[E,v]=l.useState(!1),_=l.useCallback(T=>{var O;const P=(O=t.find(q=>q.label===T))==null?void 0:O.value;P&&r(e.includes(P)?e.filter(q=>q!==P):[...e,P])},[t,e,r]),k=()=>d||o,L=l.useMemo(()=>{if(!f)return t;const T=t.filter(O=>O.starred).sort((O,q)=>O.label.localeCompare(q.label)),P=t.filter(O=>!O.starred).sort((O,q)=>{const $=e.includes(O.value),H=e.includes(q.value);return $&&!H?-1:!$&&H?1:O.label.localeCompare(q.label)});return[...T,...P]},[t,e,f]),F=()=>{r(t.map(T=>T.value))},A=()=>{r([])},R=w??E,M=p??v;return n.jsx("div",{id:b,className:x,children:n.jsxs(Wt,{open:R,onOpenChange:M,children:[n.jsx(ee,{asChild:!0,children:n.jsxs(B,{variant:y,role:"combobox","aria-expanded":R,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:k()})]}),n.jsx(C.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Yt,{children:[n.jsx(ke,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:F,children:a}),n.jsx(B,{variant:"ghost",size:"sm",onClick:A,children:i})]}),n.jsxs(Xt,{children:[n.jsx(Fe,{children:c}),n.jsx(It,{children:L.map(T=>n.jsxs(At,{value:T.label,onSelect:_,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(C.Check,{className:h("tw-h-4 tw-w-4",e.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(C.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function ic({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(ys,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var u;return n.jsxs(be,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(x=>x!==f)),children:n.jsx(C.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(x=>x.value===f))==null?void 0:u.label]},f)})}):n.jsx(wt,{children:p})]})}const js=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),no=(t,e)=>t[e]??e;function Ns({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:a=!0,className:i="tw-h-6 tw-w-6",variant:c="ghost"}){const d=l.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{"aria-label":"Undo",className:i,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(C.Undo,{})})}),n.jsx(ft,{children:n.jsxs("p",{children:[no(s,"%undoButton_tooltip%"),a&&` (${d?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{"aria-label":"Redo",className:i,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(C.Redo,{})})}),n.jsx(ft,{children:n.jsxs("p",{children:[no(s,"%redoButton_tooltip%"),a&&` (${d?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function ks({children:t,editorRef:e}){const r=l.useRef(null);return l.useEffect(()=>{var i;const o=/Macintosh/i.test(navigator.userAgent),s=((i=r.current)==null?void 0:i.querySelector(".editor-input"))??void 0,a=c=>{var w,p,m,f;if(!s||document.activeElement!==s)return;const d=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(w=e.current)==null||w.undo()):c.shiftKey&&d==="z"&&(c.preventDefault(),(p=e.current)==null||p.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(m=e.current)==null||m.undo()):(d==="y"||c.shiftKey&&d==="z")&&(c.preventDefault(),(f=e.current)==null||f.redo())}};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[e]),n.jsx("div",{ref:r,children:t})}const Ce=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Ce.displayName="Input";const lc=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function cc({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),[d,w]=l.useState(t),[p,m]=l.useState(r),[f,u]=l.useState(!1);l.useEffect(()=>{w(t)},[t]),l.useEffect(()=>{p!==r&&m(r)},[r]);const x=b=>{c.current=!1,u(b),b||(d!=="custom"||p?(e(d),o(p)):(w(t),m(r)))},y=b=>{var E,v,_,k;b.stopPropagation(),document.activeElement===i.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((E=a.current)==null||E.focus(),c.current=!0):document.activeElement===a.current&&b.key==="ArrowUp"?((v=i.current)==null||v.focus(),c.current=!1):document.activeElement===a.current&&b.key==="ArrowLeft"&&((_=a.current)==null?void 0:_.selectionStart)===0&&((k=i.current)==null||k.focus(),c.current=!1),d==="custom"&&b.key==="Enter"&&(document.activeElement===i.current||document.activeElement===a.current)&&x(!1)};return n.jsxs(te,{open:f,onOpenChange:x,children:[n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(ce,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:lc(t,s,r)})})}),n.jsx(ft,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Ht,{style:{zIndex:Xn},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:y,onMouseMove:()=>{var b;c.current&&((b=a.current)==null||b.focus())},children:[n.jsx(Be,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(_e,{}),n.jsx(qt,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Mt.GENERATOR_NOTE_CALLER})]})}),n.jsx(qt,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Mt.HIDDEN_NOTE_CALLER})]})}),n.jsx(qt,{ref:i,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:b=>{var E;b.stopPropagation(),c.current=!0,(E=a.current)==null||E.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Ce,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),w("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>m(b.target.value)})]})})]})]})}const dc=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(C.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(C.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(C.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),wc=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),N.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function pc({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(te,{children:[n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(ao.TooltipTrigger,{asChild:!0,children:n.jsx(ce,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:dc(t,r)})})}),n.jsx(ft,{children:n.jsx("p",{children:wc(t,r)})})]})}),n.jsxs(Ht,{style:{zIndex:Xn},children:[n.jsx(Be,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(_e,{}),n.jsxs(qt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(C.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(qt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(C.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(qt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(C.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const _s=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function uc({icon:t,className:e}){const r=t??C.Ban;return n.jsx(r,{className:e,size:16})}function ro({item:t,localizedStrings:e}){return n.jsxs(At,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(uc,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(yo,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function Cs({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),[a,i]=l.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const d=e.filter(p=>{var m;return(m=p.marker)==null?void 0:m.toLowerCase().includes(c)}),w=e.filter(p=>p.title.toLowerCase().includes(c)&&!d.includes(p));return[d,w]},[o,e]);return n.jsxs(Yt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(ke,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Xt,{children:[n.jsx(Fe,{children:t["%markerMenu_noResults%"]}),n.jsx(It,{children:a.map(c=>{var d;return n.jsx(ro,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})}),i.length>0&&n.jsxs(n.Fragment,{children:[a.length>0&&n.jsx(tr,{alwaysRender:!0}),n.jsx(It,{children:i.map(c=>{var d;return n.jsx(ro,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function mc(t,e,r,o){if(!o||o==="p")return[];const s=N.usfmMarkers[o];if(!(s!=null&&s.children))return[];const a=[];return Object.entries(s.children).forEach(([,i])=>{a.push(...i.map(c=>({marker:c,title:r[N.usfmMarkers[c].description]??N.usfmMarkers[c].description,action:()=>{var d;(d=t.current)==null||d.insertMarker(c),e()}})))}),a.sort((i,c)=>(i.marker??i.title).localeCompare(c.marker??c.title))}function fc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function hc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const gc={type:"USJ",version:"3.1",content:[{type:"para"}]};function xc({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:a,editorOptions:i,defaultMarkerMenuTrigger:c,localizedStrings:d,parentEditorRef:w}){const p=l.useRef(null),m=l.useRef(null),f=l.useRef(null),u=l.useRef(null);l.useLayoutEffect(()=>{if(!u.current)return;const{width:S}=u.current.getBoundingClientRect();S>0&&(u.current.style.width=`${S}px`)},[]);const[x,y]=l.useState("generated"),[b,E]=l.useState("*"),[v,_]=l.useState("f"),[k,L]=l.useState(!1),[F,A]=l.useState(!0),[R,M]=l.useState(!1),T=l.useRef(!1),P=l.useRef(""),[O,q]=l.useState(!1),[$,H]=l.useState(),[j,G]=l.useState(),[lt,ht]=l.useState(),[Ct,dt]=l.useState(),Nt=l.useRef(null),z=l.useMemo(()=>({...i,markerMenuTrigger:c,hasExternalUI:!0,view:{...i.view??Mt.getDefaultViewOptions(),noteMode:"expanded"}}),[i,c]),nt=l.useMemo(()=>mc(p,()=>q(!1),d,Ct),[d,Ct]);l.useEffect(()=>{var S;O||(S=p.current)==null||S.focus()},[v,O]),l.useEffect(()=>{var U,K;let S;T.current=!1,A(!0);const V=e==null?void 0:e.at(0);if(V&&Mt.isInsertEmbedOpOfType("note",V)){const rt=(U=V.insert.note)==null?void 0:U.caller;let W="custom";rt===Mt.GENERATOR_NOTE_CALLER?W="generated":rt===Mt.HIDDEN_NOTE_CALLER?W="hidden":rt&&E(rt),y(W),_(((K=V.insert.note)==null?void 0:K.style)??"f"),S=setTimeout(()=>{var ut;(ut=p.current)==null||ut.applyUpdate([V])},0)}return()=>{S&&clearTimeout(S)}},[e,a]);const Y=l.useCallback((S,V,U=!1)=>{var rt,W,ut;const K=(W=(rt=p.current)==null?void 0:rt.getNoteOps(0))==null?void 0:W.at(0);if(K&&Mt.isInsertEmbedOpOfType("note",K)){if(K.insert.note){let J;S==="custom"?J=V:S==="generated"?J=Mt.GENERATOR_NOTE_CALLER:J=Mt.HIDDEN_NOTE_CALLER,K.insert.note.caller=J}r==null||r([K]),U&&w&&a&&((ut=w.current)==null||ut.replaceEmbedUpdate(a,[K]))}},[a,r,w]),ct=l.useCallback(()=>{Y(x,b,!0),o()},[x,b,o,Y]),gt=l.useRef(ct);l.useLayoutEffect(()=>{gt.current=ct});const re=l.useRef({book:s.book,chapterNum:s.chapterNum});l.useLayoutEffect(()=>{(re.current.book!==s.book||re.current.chapterNum!==s.chapterNum)&&(re.current={book:s.book,chapterNum:s.chapterNum},gt.current())},[s.book,s.chapterNum]);const oe=()=>{var V;const S=(V=m.current)==null?void 0:V.getElementsByClassName("editor-input")[0];S!=null&&S.textContent&&navigator.clipboard.writeText(S.textContent)},Ee=l.useCallback(S=>{y(S),Y(S,b)},[b,Y]),se=l.useCallback(S=>{E(S),Y(x,S)},[x,Y]),Se=S=>{var U,K,rt,W,ut;_(S);const V=(K=(U=p.current)==null?void 0:U.getNoteOps(0))==null?void 0:K.at(0);if(V&&Mt.isInsertEmbedOpOfType("note",V)){V.insert.note&&(V.insert.note.style=S);const J=(W=(rt=V.insert.note)==null?void 0:rt.contents)==null?void 0:W.ops;v!=="x"&&S==="x"?J==null||J.forEach(st=>fc(st)):v==="x"&&S!=="x"&&(J==null||J.forEach(st=>hc(st))),(ut=p.current)==null||ut.applyUpdate([V,{delete:1}])}},$t=S=>{dt(S.contextMarker),M(S.canRedo)},ae=l.useCallback(S=>{var U,K,rt,W,ut;const V=(K=(U=p.current)==null?void 0:U.getNoteOps(0))==null?void 0:K.at(0);if(V&&Mt.isInsertEmbedOpOfType("note",V)){S.content.length>1&&setTimeout(()=>{var Rt;(Rt=p.current)==null||Rt.applyUpdate([{retain:2},{delete:1}])},0);const J=(rt=V.insert.note)==null?void 0:rt.style,st=(ut=(W=V.insert.note)==null?void 0:W.contents)==null?void 0:ut.ops;if(J||L(!1),L(J==="x"?!!(st!=null&&st.every(Rt=>{var Ft,ue;if(!((Ft=Rt.attributes)!=null&&Ft.char))return!0;const Jt=((ue=Rt.attributes)==null?void 0:ue.char).style;return Jt==="xt"||Jt==="xo"||Jt==="xq"})):!!(st!=null&&st.every(Rt=>{var Ft,ue;if(!((Ft=Rt.attributes)!=null&&Ft.char))return!0;const Jt=((ue=Rt.attributes)==null?void 0:ue.char).style;return Jt==="ft"||Jt==="fr"||Jt==="fq"}))),!T.current){T.current=!0,P.current=JSON.stringify(V),A(!0);return}A(JSON.stringify(V)===P.current),Y(x,b)}else L(!1),A(!0)},[x,b,Y]),D=l.useCallback(()=>{const S=window.getSelection();if(f.current&&nt.length&&S&&S.rangeCount>0){const V=S.getRangeAt(0).getBoundingClientRect(),U=f.current.getBoundingClientRect();H(V.left-U.left),G(V.top-U.top),ht(V.height),q(!0)}},[nt,f]);return l.useEffect(()=>{const S=()=>{O&&q(!1)};return window.addEventListener("click",S),()=>{window.removeEventListener("click",S)}},[O]),l.useEffect(()=>{var S;O&&((S=Nt.current)==null||S.focus())},[O]),l.useEffect(()=>{var U;const S=((U=m.current)==null?void 0:U.querySelector(".editor-input"))??void 0,V=K=>{!O&&S&&document.activeElement===S&&K.key===c?(K.preventDefault(),D()):O&&K.key==="Escape"&&(K.preventDefault(),q(!1))};return document.addEventListener("keydown",V),()=>{document.removeEventListener("keydown",V)}},[O,D,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:u,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(pc,{isTypeSwitchable:k,noteType:v,handleNoteTypeChange:Se,localizedStrings:d}),n.jsx(cc,{callerType:x,updateCallerType:Ee,customCaller:b,updateCustomCaller:se,localizedStrings:d})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(Ns,{onUndoClick:()=>{var S;return(S=p.current)==null?void 0:S.undo()},onRedoClick:()=>{var S;return(S=p.current)==null?void 0:S.redo()},canUndo:!F,canRedo:R,localizedStrings:d}),n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:ct,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(C.Check,{})})}),n.jsx(ft,{children:n.jsx("p",{children:d["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(C.X,{})})}),n.jsx(ft,{children:n.jsx("p",{children:d["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(ks,{editorRef:p,children:n.jsx(Mt.Editorial,{options:z,onStateChange:$t,onUsjChange:ae,defaultUsj:gc,onScrRefChange:()=>{},scrRef:s,ref:p})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:oe,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(C.Copy,{})})}),n.jsx(ft,{children:n.jsx("p",{children:d["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:f,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Wt,{open:O,children:[n.jsx(_o,{className:"tw-absolute",style:{top:j,left:$,height:lt,width:0,pointerEvents:"none"}}),n.jsx(Pt,{className:"tw-w-[500px] tw-p-0",onClick:S=>{S.preventDefault(),S.stopPropagation()},children:n.jsx(Cs,{markerMenuItems:nt,localizedStrings:d,searchRef:Nt})})]})]})}const bc=Object.freeze([..._s,...Object.entries(N.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...js]);function Es(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function vc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let i=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,d)=>{const w=d===a.length-1;return n.jsxs("p",{children:[Nr(t,c,r,!0,s),w&&o]},Es(t,c))})}function Nr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const i=`${t}-text-${a.slice(0,10)}`;if(o){const c=h(`usfm_${t}`);return n.jsx("span",{className:c,children:a},i)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(C.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(C.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return yc(a,Es(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function yc(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(C.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),Nr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function Ss({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let i,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([i,...c]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:h("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=i&&n.jsxs(n.Fragment,{children:[Nr(t.marker,[i],o,!1)," "]}),f=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",x=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",y=h(f,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:[d,p]}),n.jsx("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:m}),n.jsx("div",{className:h("textual-note-body tw-flex tw-flex-col tw-gap-1",x,y),children:c&&c.length>0&&n.jsx(n.Fragment,{children:vc(t.marker,c,o,w)})})]})}function jc({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??N.getFormatCallerFunction(r,void 0),m=(v,_)=>{w==null||w(v,_,s)},f=a?r.findIndex(v=>v===a):-1,[u,x]=l.useState(f),y=(v,_,k)=>{if(r.length)switch(v.key){case"Enter":case" ":v.preventDefault(),w==null||w(_,k,s);break}},b=v=>{if(r.length)switch(v.key){case"ArrowDown":v.preventDefault(),x(_=>Math.min(_+1,r.length-1));break;case"ArrowUp":v.preventDefault(),x(_=>Math.max(_-1,0));break}},E=l.useRef([]);return l.useEffect(()=>{var v;u>=0&&u<E.current.length&&((v=E.current[u])==null||v.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:h("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:h("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((v,_)=>{const k=v===a,L=`${s}-${_}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:F=>{E.current[_]=F},role:"option","aria-selected":k,"data-marker":v.marker,"data-state":k?"selected":void 0,tabIndex:_===u?0:-1,className:h("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(v,_),onKeyDown:F=>y(F,v,_),children:n.jsx(Ss,{footnote:v,layout:o,formatCaller:()=>p(v.caller,_),showMarkers:i})},L),_<r.length-1&&o==="vertical"&&n.jsx(ve,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Nc(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function kc({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=l.useMemo(()=>{const c=[],d=new Set;return t.forEach(w=>{const p=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(p)||(d.add(p),c.push(w))}),c},[t]);return n.jsxs(Je,{stickyHeader:!0,children:[n.jsx(Qe,{stickyHeader:!0,children:n.jsxs(Kt,{children:[n.jsx(Pe,{children:s}),n.jsx(Pe,{children:a})]})}),n.jsx(tn,{children:i.length>0&&i.map(c=>n.jsxs(Kt,{onClick:()=>{e(c.reference)},children:[n.jsx(le,{children:N.formatScrRef(c.reference,"English")}),n.jsx(le,{className:o,children:Nc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const _n=l.forwardRef(({className:t,...e},r)=>n.jsx(Bn.Root,{ref:r,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Bn.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}));_n.displayName=Bn.Root.displayName;const _c=t=>{if(t==="asc")return n.jsx(C.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(C.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},en=(t,e,r)=>n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsxs(jt,{className:h("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),_c(t.getIsSorted())]}),n.jsx(ft,{side:"bottom",children:e})]})}),Cc=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>en(e,t)}),Ec=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>en(r,t)}),Sc=t=>({accessorKey:"count",header:({column:e})=>en(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),Pn=(t,e,r,o,s,a)=>{let i=[...r];t.forEach(d=>{e==="approved"?i.includes(d)||i.push(d):i=i.filter(w=>w!==d)}),o(i);let c=[...s];t.forEach(d=>{e==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),a(c)},Rc=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>en(a,t,"tw-justify-center"),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return n.jsxs(kn,{value:i,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Ie,{onClick:d=>{d.stopPropagation(),Pn([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(C.CircleCheckIcon,{})}),n.jsx(Ie,{onClick:d=>{d.stopPropagation(),Pn([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(C.CircleXIcon,{})}),n.jsx(Ie,{onClick:d=>{d.stopPropagation(),Pn([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(C.CircleHelpIcon,{})})]})}}),Tc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Mc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Dc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Rs=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Ic=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Oc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Ac=(t,e,r)=>t.map(o=>{const s=N.isString(o.key)?o.key:o.key[0];return{items:N.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||Rs(s,e,r),occurrences:o.occurrences||[]}}),Bt=(t,e)=>t[e]??e;function Pc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1,classNameForVerseText:m,onItemSelected:f}){const u=Bt(r,"%webView_inventory_all%"),x=Bt(r,"%webView_inventory_approved%"),y=Bt(r,"%webView_inventory_unapproved%"),b=Bt(r,"%webView_inventory_unknown%"),E=Bt(r,"%webView_inventory_scope_currentBook%"),v=Bt(r,"%webView_inventory_scope_chapter%"),_=Bt(r,"%webView_inventory_scope_verse%"),k=Bt(r,"%webView_inventory_filter_text%"),L=Bt(r,"%webView_inventory_show_additional_items%"),F=Bt(r,"%webView_inventory_no_results%"),[A,R]=l.useState(!1),[M,T]=l.useState("all"),[P,O]=l.useState(""),[q,$]=l.useState([]),H=l.useMemo(()=>{const z=t??[];return z.length===0?[]:Ac(z,s,a)},[t,s,a]),j=l.useMemo(()=>{if(A)return H;const z=[];return H.forEach(nt=>{const Y=nt.items[0],ct=z.find(gt=>gt.items[0]===Y);ct?(ct.count+=nt.count,ct.occurrences=ct.occurrences.concat(nt.occurrences)):z.push({items:[Y],count:nt.count,occurrences:nt.occurrences,status:nt.status})}),z},[A,H]),G=l.useMemo(()=>j.length===0?[]:Oc(j,M,P),[j,M,P]),lt=l.useMemo(()=>{var Y,ct;if(!A)return d;const z=(Y=o==null?void 0:o.tableHeaders)==null?void 0:Y.length;if(!z)return d;const nt=[];for(let gt=0;gt<z;gt++)nt.push(Ec(((ct=o==null?void 0:o.tableHeaders)==null?void 0:ct[gt])||"Additional Item",gt+1));return[...nt,...d]},[o==null?void 0:o.tableHeaders,d,A]);l.useEffect(()=>{G.length===0?$([]):G.length===1&&$(G[0].items)},[G]);const ht=(z,nt)=>{nt.setRowSelection(()=>{const ct={};return ct[z.index]=!0,ct});const Y=z.original.items;$(Y),f&&Y.length>0&&f(Y[0])},Ct=z=>{if(z==="book"||z==="chapter"||z==="verse")c(z);else throw new Error(`Invalid scope value: ${z}`)},dt=z=>{if(z==="all"||z==="approved"||z==="unapproved"||z==="unknown")T(z);else throw new Error(`Invalid status filter value: ${z}`)},Nt=l.useMemo(()=>{if(j.length===0||q.length===0)return[];const z=j.filter(nt=>N.deepEqual(A?nt.items:[nt.items[0]],q));if(z.length>1)throw new Error("Selected item is not unique");return z.length===0?[]:z[0].occurrences},[q,A,j]);return n.jsx("div",{id:w,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(ye,{onValueChange:z=>dt(z),defaultValue:M,children:[n.jsx(de,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(je,{placeholder:"Select filter"})}),n.jsxs(we,{children:[n.jsx(Et,{value:"all",children:u}),n.jsx(Et,{value:"approved",children:x}),n.jsx(Et,{value:"unapproved",children:y}),n.jsx(Et,{value:"unknown",children:b})]})]}),n.jsxs(ye,{onValueChange:z=>Ct(z),defaultValue:i,children:[n.jsx(de,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(je,{placeholder:"Select scope"})}),n.jsxs(we,{children:[n.jsx(Et,{value:"book",children:E}),n.jsx(Et,{value:"chapter",children:v}),n.jsx(Et,{value:"verse",children:_})]})]}),n.jsx(Ce,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:k,value:P,onChange:z=>{O(z.target.value)}}),o&&n.jsx(mt,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(_n,{className:"tw-m-1 tw-flex-shrink-0",checked:A,onCheckedChange:z=>{R(z)}}),n.jsx(wt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??L})]})}),n.jsx(ft,{children:(o==null?void 0:o.checkboxText)??L})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(gs,{columns:lt,data:G,onRowClickHandler:ht,stickyHeader:!0,isLoading:p,noResultsMessage:F})}),Nt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(kc,{classNameForText:m,occurrenceData:Nt,setScriptureReference:e,localizedStrings:r})})]})})}const Lc="16rem",$c="3rem",Ts=l.createContext(void 0);function nn(){const t=l.useContext(Ts);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const kr=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:i="primary",...c},d)=>{const[w,p]=l.useState(t),m=e??w,f=l.useCallback(_=>{const k=typeof _=="function"?_(m):_;r?r(k):p(k)},[r,m]),u=l.useCallback(()=>f(_=>!_),[f]),x=m?"expanded":"collapsed",E=it()==="ltr"?i:i==="primary"?"secondary":"primary",v=l.useMemo(()=>({state:x,open:m,setOpen:f,toggleSidebar:u,side:E}),[x,m,f,u,E]);return n.jsx(Ts.Provider,{value:v,children:n.jsx(mt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Lc,"--sidebar-width-icon":$c,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:a})})})});kr.displayName="SidebarProvider";const _r=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const i=nn();return e==="none"?n.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[n.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});_r.displayName="Sidebar";const Ms=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=nn();return n.jsxs(B,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(C.PanelLeft,{}):n.jsx(C.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Ms.displayName="SidebarTrigger";const Ds=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=nn();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});Ds.displayName="SidebarRail";const Cr=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));Cr.displayName="SidebarInset";const Is=l.forwardRef(({className:t,...e},r)=>n.jsx(Ce,{ref:r,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));Is.displayName="SidebarInput";const Os=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Os.displayName="SidebarHeader";const As=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));As.displayName="SidebarFooter";const Ps=l.forwardRef(({className:t,...e},r)=>n.jsx(ve,{ref:r,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Ps.displayName="SidebarSeparator";const Er=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));Er.displayName="SidebarContent";const hn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));hn.displayName="SidebarGroup";const gn=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Le.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});gn.displayName="SidebarGroupLabel";const Ls=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Le.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Ls.displayName="SidebarGroupAction";const xn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",t),...e}));xn.displayName="SidebarGroupContent";const Sr=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));Sr.displayName="SidebarMenu";const Rr=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",t),...e}));Rr.displayName="SidebarMenuItem";const Fc=pe.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Tr=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...i},c)=>{const d=t?Le.Slot:"button",{state:w}=nn(),p=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:h(Fc({variant:r,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:p}),n.jsx(ft,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});Tr.displayName="SidebarMenuButton";const $s=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?Le.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});$s.displayName="SidebarMenuAction";const Fs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Fs.displayName="SidebarMenuBadge";const Vs=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(fn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(fn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Vs.displayName="SidebarMenuSkeleton";const Bs=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Bs.displayName="SidebarMenuSub";const zs=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));zs.displayName="SidebarMenuSubItem";const Gs=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const i=t?Le.Slot:"a";return n.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Gs.displayName="SidebarMenuSubButton";function Ks({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:d}){const w=l.useCallback((f,u)=>{o(f,u)},[o]),p=l.useCallback(f=>{const u=r.find(x=>x.projectId===f);return u?u.projectName:f},[r]),m=l.useCallback(f=>!s.projectId&&f===s.label,[s]);return n.jsx(_r,{id:t,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(Er,{children:[n.jsxs(hn,{children:[n.jsx(gn,{className:"tw-text-sm",children:a}),n.jsx(xn,{children:n.jsx(Sr,{children:Object.entries(e).map(([f,u])=>n.jsx(Rr,{children:n.jsx(Tr,{onClick:()=>w(f),isActive:m(f),children:n.jsx("span",{className:"tw-pl-3",children:u})})},f))})})]}),n.jsxs(hn,{children:[n.jsx(gn,{className:"tw-text-sm",children:i}),n.jsx(xn,{className:"tw-pl-3",children:n.jsx(cn,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:mo},options:r.flatMap(f=>f.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:f=>{const u=p(f);w(u,f)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(C.ScrollText,{})})})]})]})})}const Cn=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const d=it();return n.jsxs("div",{id:i,className:h("tw-relative",{"tw-w-full":o},s),children:[n.jsx(C.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(Ce,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:a}),t&&n.jsxs(B,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(C.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Cn.displayName="SearchBar";function Vc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Cn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(kr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ks,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),n.jsx(Cr,{className:"tw-min-w-[215px]",children:o})]})]})}const ie="scrBook",Bc="scrRef",he="source",zc="details",Gc="Scripture Reference",Kc="Scripture Book",qs="Type",qc="Details";function Uc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:ie,header:(t==null?void 0:t.scriptureReferenceColumnName)??Gc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?at.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===ie?N.formatScrRef(s.start):void 0},getGroupingValue:o=>at.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>N.formatScrRef(o.start),id:Bc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:N.formatScrRef(s.start)},sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:he,header:r?(t==null?void 0:t.typeColumnName)??qs:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:zc,header:(t==null?void 0:t.detailsColumnName)??qc,cell:o=>o.getValue(),enableGrouping:!1}]}const Hc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||N.compareScrRefs(t.start,t.end)===0?`${N.scrRefToBBBCCCVVV(t.start)}+${e}`:`${N.scrRefToBBBCCCVVV(t.start)}+${e}-${N.scrRefToBBBCCCVVV(t.end)}+${r}`},oo=t=>`${Hc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Yc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:d}){const[w,p]=l.useState([]),[m,f]=l.useState([{id:ie,desc:!1}]),[u,x]=l.useState({}),y=l.useMemo(()=>t.flatMap(M=>M.data.map(T=>({...T,source:M.source}))),[t]),b=l.useMemo(()=>Uc({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},r),[o,a,i,r]);l.useEffect(()=>{w.includes(he)?f([{id:he,desc:!1},{id:ie,desc:!1}]):f([{id:ie,desc:!1}])},[w]);const E=vt.useReactTable({data:y,columns:b,state:{grouping:w,sorting:m,rowSelection:u},onGroupingChange:p,onSortingChange:f,onRowSelectionChange:x,getExpandedRowModel:vt.getExpandedRowModel(),getGroupedRowModel:vt.getGroupedRowModel(),getCoreRowModel:vt.getCoreRowModel(),getSortedRowModel:vt.getSortedRowModel(),getRowId:oo,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const M=E.getSelectedRowModel().rowsById,T=Object.keys(M);if(T.length===1){const P=y.find(O=>oo(O)===T[0])||void 0;P&&c(P)}}},[u,y,c,E]);const v=s??Kc,_=a??qs,k=[{label:"No Grouping",value:[]},{label:`Group by ${v}`,value:[ie]},{label:`Group by ${_}`,value:[he]},{label:`Group by ${v} and ${_}`,value:[ie,he]},{label:`Group by ${_} and ${v}`,value:[he,ie]}],L=M=>{p(JSON.parse(M))},F=(M,T)=>{!M.getIsGrouped()&&!M.getIsSelected()&&M.getToggleSelectedHandler()(T)},A=(M,T)=>M.getIsGrouped()?"":h("banded-row",T%2===0?"even":"odd"),R=(M,T,P)=>{if(!((M==null?void 0:M.length)===0||T.depth<P.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(ye,{value:JSON.stringify(w),onValueChange:M=>{L(M)},children:[n.jsx(de,{className:"tw-mb-1 tw-mt-2",children:n.jsx(je,{})}),n.jsx(we,{position:"item-aligned",children:n.jsx(ws,{children:k.map(M=>n.jsx(Et,{value:JSON.stringify(M.value),children:M.label},M.label))})})]}),n.jsxs(Je,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Qe,{children:E.getHeaderGroups().map(M=>n.jsx(Kt,{children:M.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(Pe,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(B,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",vt.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},M.id))}),n.jsx(tn,{children:E.getRowModel().rows.map((M,T)=>{const P=it();return n.jsx(Kt,{"data-state":M.getIsSelected()?"selected":"",className:h(A(M,T)),onClick:O=>F(M,O),children:M.getVisibleCells().map(O=>{if(!(O.getIsPlaceholder()||O.column.columnDef.enableGrouping&&!O.getIsGrouped()&&(O.column.columnDef.id!==he||!r)))return n.jsx(le,{className:h(O.column.columnDef.id,"tw-p-[1px]",R(w,M,O)),children:O.getIsGrouped()?n.jsxs(B,{variant:"link",onClick:M.getToggleExpandedHandler(),type:"button",children:[M.getIsExpanded()&&n.jsx(C.ChevronDown,{}),!M.getIsExpanded()&&(P==="ltr"?n.jsx(C.ChevronRight,{}):n.jsx(C.ChevronLeft,{}))," ",vt.flexRender(O.column.columnDef.cell,O.getContext())," (",M.subRows.length,")"]}):vt.flexRender(O.column.columnDef.cell,O.getContext())},O.id)})},M.id)})})]})]})}const Mr=(t,e)=>t.filter(r=>{try{return N.getSectionForBook(r)===e}catch{return!1}}),Us=(t,e,r)=>Mr(t,e).every(o=>r.includes(o));function Xc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=Mr(e,t).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(B,{variant:"outline",size:"sm",onClick:()=>o(t),className:h(Us(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:di(t,i,c,d,w)})}const so=5,Ln=6;function Wc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:f,ntLong:u,dcLong:x,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,E]=l.useState(!1),[v,_]=l.useState(""),k=l.useRef(void 0),L=l.useRef(!1);if(t.length!==at.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const F=l.useMemo(()=>at.Canon.allBookIds.filter(($,H)=>t[H]==="1"&&!at.Canon.isObsolete(at.Canon.bookIdToNumber($))),[t]),A=l.useMemo(()=>{if(!v.trim()){const j={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return F.forEach(G=>{const lt=N.getSectionForBook(G);j[lt].push(G)}),j}const $=F.filter(j=>nr(j,v,s)),H={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return $.forEach(j=>{const G=N.getSectionForBook(j);H[G].push(j)}),H},[F,v,s]),R=l.useCallback(($,H=!1)=>{if(!H||!k.current){r(e.includes($)?e.filter(dt=>dt!==$):[...e,$]),k.current=$;return}const j=F.findIndex(dt=>dt===k.current),G=F.findIndex(dt=>dt===$);if(j===-1||G===-1)return;const[lt,ht]=[Math.min(j,G),Math.max(j,G)],Ct=F.slice(lt,ht+1).map(dt=>dt);r(e.includes($)?e.filter(dt=>!Ct.includes(dt)):[...new Set([...e,...Ct])])},[e,r,F]),M=$=>{R($,L.current),L.current=!1},T=($,H)=>{$.preventDefault(),R(H,$.shiftKey)},P=l.useCallback($=>{const H=Mr(F,$).map(j=>j);r(Us(F,$,e)?e.filter(j=>!H.includes(j)):[...new Set([...e,...H])])},[e,r,F]),O=()=>{r(F.map($=>$))},q=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(N.Section).map($=>n.jsx(Xc,{section:$,availableBookIds:F,selectedBookIds:e,onToggle:P,localizedStrings:o},$))}),n.jsxs(Wt,{open:b,onOpenChange:$=>{E($),$||_("")},children:[n.jsx(ee,{asChild:!0,children:n.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:i,n.jsx(C.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Pt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Yt,{shouldFilter:!1,onKeyDown:$=>{$.key==="Enter"&&(L.current=$.shiftKey)},children:[n.jsx(ke,{placeholder:c,value:v,onValueChange:_}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:O,children:d}),n.jsx(B,{variant:"ghost",size:"sm",onClick:q,children:w})]}),n.jsxs(Xt,{children:[n.jsx(Fe,{children:p}),Object.values(N.Section).map(($,H)=>{const j=A[$];if(j.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(It,{heading:jo($,f,u,x,y),children:j.map(G=>n.jsx(ko,{bookId:G,isSelected:e.includes(G),onSelect:()=>M(G),onMouseDown:lt=>T(lt,G),section:N.getSectionForBook(G),showCheck:!0,localizedBookNames:s,commandValue:Kn(G,s),className:"tw-flex tw-items-center"},G))}),H<Object.values(N.Section).length-1&&n.jsx(tr,{})]},$)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Ln?Ln:so).map($=>n.jsx(be,{className:"hover:tw-bg-secondary",variant:"secondary",children:Me($,s)},$)),e.length>Ln&&n.jsx(be,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-so} ${m}`})]})]})}const Zc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),me=(t,e)=>t[e]??e;function Jc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:d}){const w=me(i,"%webView_scope_selector_selected_text%"),p=me(i,"%webView_scope_selector_current_verse%"),m=me(i,"%webView_scope_selector_current_chapter%"),f=me(i,"%webView_scope_selector_current_book%"),u=me(i,"%webView_scope_selector_choose_books%"),x=me(i,"%webView_scope_selector_scope%"),y=me(i,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],E=e?b.filter(v=>e.includes(v.value)):b;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(wt,{children:x}),n.jsx(jn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:E.map(({value:v,label:_,id:k})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ye,{className:"tw-me-2",value:v,id:k}),n.jsx(wt,{htmlFor:k,children:_})]},k))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(wt,{children:y}),n.jsx(Wc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const $n={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Qc({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...$n,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in $n?$n[w]:p]))},d=it();return n.jsxs(ye,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(de,{size:s,className:h("pr-twp tw-w-auto",a),children:n.jsx(je,{placeholder:c[N.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(we,{id:i,align:d==="rtl"?"end":"start",style:{zIndex:Ne},children:t.map(w=>n.jsx(Et,{value:`${w}`,children:c[N.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function td({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function ed({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function nd({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(ve,{}):""]})}function Hs(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function bn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Ys=(t,e,r,o)=>r?Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:"command"in c?n.jsxs(We,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(bn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(bn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(ls,{children:[n.jsx(xr,{children:c.label}),n.jsx(is,{children:n.jsx(br,{children:Ys(t,e,Hs(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(ft,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function vn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return n.jsxs(te,{variant:a,children:[n.jsx(ce,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(B,{variant:i,size:"icon",children:o??n.jsx(C.MenuIcon,{})})}),n.jsx(Ht,{align:"start",style:{zIndex:Ne},children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>n.jsxs(l.Fragment,{children:[n.jsx(gr,{children:n.jsx(mt,{children:Ys(e.groups,e.items,d,t)})}),w<p.length-1&&n.jsx(_e,{})]},d))})]})}const Xs=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function rd({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(Xs,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(vn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(C.Menu,{}),buttonVariant:"ghost"}),i&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:i}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(vn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(C.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function od({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Xs,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(vn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Dr=l.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsx(_t.Root,{orientation:"vertical",ref:r,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Dr.displayName=_t.List.displayName;const Ir=l.forwardRef(({className:t,...e},r)=>n.jsx(_t.List,{ref:r,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Ir.displayName=_t.List.displayName;const Ws=l.forwardRef(({className:t,...e},r)=>n.jsx(_t.Trigger,{ref:r,...e,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Or=l.forwardRef(({className:t,...e},r)=>n.jsx(_t.Content,{ref:r,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Or.displayName=_t.Content.displayName;function sd({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return n.jsxs("div",{id:i,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(Cn,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Dr,{children:[n.jsx(Ir,{children:t.map(c=>n.jsx(Ws,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(Or,{value:c.value,children:c.content},c.key))]})]})}function ad({...t}){return n.jsx(tt.Menu,{...t})}function id({...t}){return n.jsx(tt.Sub,{"data-slot":"menubar-sub",...t})}const Zs=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(hr.Provider,{value:s,children:n.jsx(tt.Root,{ref:o,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Zs.displayName=tt.Root.displayName;const Js=l.forwardRef(({className:t,...e},r)=>{const o=Lt();return n.jsx(tt.Trigger,{ref:r,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ne({variant:o.variant,className:t})),...e})});Js.displayName=tt.Trigger.displayName;const Qs=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Lt();return n.jsxs(tt.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",ne({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(C.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Qs.displayName=tt.SubTrigger.displayName;const ta=l.forwardRef(({className:t,...e},r)=>{const o=Lt();return n.jsx(tt.SubContent,{ref:r,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});ta.displayName=tt.SubContent.displayName;const ea=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const i=Lt();return n.jsx(tt.Portal,{children:n.jsx(tt.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...s})})});ea.displayName=tt.Content.displayName;const na=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=Lt();return n.jsx(tt.Item,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",ne({variant:s.variant,className:t}),t),...r})});na.displayName=tt.Item.displayName;const ld=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=Lt();return n.jsxs(tt.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ne({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});ld.displayName=tt.CheckboxItem.displayName;const cd=l.forwardRef(({className:t,children:e,...r},o)=>{const s=Lt();return n.jsxs(tt.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ne({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(C.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});cd.displayName=tt.RadioItem.displayName;const dd=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(tt.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));dd.displayName=tt.Label.displayName;const ra=l.forwardRef(({className:t,...e},r)=>n.jsx(tt.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ra.displayName=tt.Separator.displayName;const Ke=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},oa=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=e.filter(w=>w.group===a).sort((w,p)=>w.order-p.order).map(w=>n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:"command"in w?n.jsxs(na,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(bn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(bn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(id,{children:[n.jsx(Qs,{children:w.label}),n.jsx(ta,{children:oa(t,e,Hs(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(ft,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&i<s.length-1&&d.push(n.jsx(ra,{},`separator-${a}`)),d})};function wd({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),d=l.useRef(void 0),w=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return d;default:return}};if(ti.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,m)=>{var x,y,b,E;p.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":Ke(a,[f]);break;case"alt+p":(x=a.current)==null||x.focus(),Ke(a,[f,u]);break;case"alt+l":(y=i.current)==null||y.focus(),Ke(i,[f,u]);break;case"alt+n":(b=c.current)==null||b.focus(),Ke(c,[f,u]);break;case"alt+h":(E=d.current)==null||E.focus(),Ke(d,[f,u]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(x=>{if(x.attributeName==="data-state"&&x.target instanceof HTMLElement){const y=x.target.getAttribute("data-state");r(y==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Zs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,m])=>typeof p=="boolean"||typeof m=="boolean"?0:p.order-m.order).map(([p,m])=>n.jsxs(ad,{children:[n.jsx(Js,{ref:w(p),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(ea,{style:{zIndex:Ne},children:n.jsx(mt,{children:oa(t.groups,t.items,p,e)})})]},p))})}function pd(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function ud({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&n.jsx(wd,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const md=(t,e)=>t[e]??e;function fd({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:d}){const w=md(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,m]=l.useState(!1),f=x=>{s&&s(x),o&&o([x,...r.filter(y=>y!==x)]),a&&r.find(y=>y===x)&&a([...r.filter(y=>y!==x)]),m(!1)},u=(x,y)=>{var E,v,_,k,L,F;const b=y!==x?((v=(E=t[x])==null?void 0:E.uiNames)==null?void 0:v[y])??((k=(_=t[x])==null?void 0:_.uiNames)==null?void 0:k.en):void 0;return b?`${(L=t[x])==null?void 0:L.autonym} (${b})`:(F=t[x])==null?void 0:F.autonym};return n.jsxs("div",{id:d,className:h("pr-twp tw-max-w-sm",c),children:[n.jsxs(ye,{name:"uiLanguage",value:e,onValueChange:f,open:p,onOpenChange:x=>m(x),children:[n.jsx(de,{children:n.jsx(je,{})}),n.jsx(we,{style:{zIndex:Ne},children:Object.keys(t).map(x=>n.jsx(Et,{value:x,children:u(x,e)},x))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(wt,{className:"tw-font-normal tw-text-muted-foreground",children:N.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(x=>u(x,e)).join(", "):t.en.autonym})})})]})}function hd({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(wt,{children:e(t)}):r?n.jsx(wt,{children:r(t)}):n.jsx(wt,{children:t})}function gd({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(_n,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(hd,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function xd({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:i,selectedButtons:c,hoverButtons:d,dropdownContent:w,additionalContent:p,accentColor:m,showDropdownOnHover:f=!1}){const u=x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":e,className:h("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),e&&c,!e&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:d}),!e&&f&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(te,{children:[n.jsx(ce,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(C.MoreVertical,{})})}),n.jsx(Ht,{align:"end",children:w})]})}),e&&w&&n.jsxs(te,{children:[n.jsx(ce,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(C.MoreVertical,{})})}),n.jsx(Ht,{align:"end",children:w})]})]}),p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const sa=l.forwardRef(({className:t,...e},r)=>n.jsx(C.LoaderCircle,{size:35,className:h("tw-animate-spin",t),...e,ref:r}));sa.displayName="Spinner";function bd({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:m,onFocus:f,onBlur:u}){return n.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(wt,{htmlFor:t,className:h({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(Ce,{id:t,disabled:e,placeholder:i,required:c,className:h(d,{"tw-border-red-600":r}),defaultValue:w,value:p,onChange:m,onFocus:f,onBlur:u}),n.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const vd=pe.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),aa=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:h("pr-twp",vd({variant:e}),t),...r}));aa.displayName="Alert";const ia=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));ia.displayName="AlertTitle";const la=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));la.displayName="AlertDescription";const yd=et.Root,jd=et.Trigger,Nd=et.Group,kd=et.Portal,_d=et.Sub,Cd=et.RadioGroup,ca=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(et.SubTrigger,{ref:s,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(C.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ca.displayName=et.SubTrigger.displayName;const da=l.forwardRef(({className:t,...e},r)=>n.jsx(et.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));da.displayName=et.SubContent.displayName;const wa=l.forwardRef(({className:t,...e},r)=>n.jsx(et.Portal,{children:n.jsx(et.Content,{ref:r,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));wa.displayName=et.Content.displayName;const pa=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Item,{ref:o,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));pa.displayName=et.Item.displayName;const ua=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(et.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));ua.displayName=et.CheckboxItem.displayName;const ma=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(et.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(C.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));ma.displayName=et.RadioItem.displayName;const fa=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));fa.displayName=et.Label.displayName;const ha=l.forwardRef(({className:t,...e},r)=>n.jsx(et.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));ha.displayName=et.Separator.displayName;function ga({className:t,...e}){return n.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ga.displayName="ContextMenuShortcut";const xa=l.createContext({direction:"bottom"});function ba({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(xa.Provider,{value:o,children:n.jsx(Ot.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}ba.displayName="Drawer";const Ed=Ot.Drawer.Trigger,va=Ot.Drawer.Portal,Sd=Ot.Drawer.Close,Ar=l.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Ar.displayName=Ot.Drawer.Overlay.displayName;const ya=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(xa),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(va,{children:[n.jsx(Ar,{}),n.jsxs(Ot.Drawer.Content,{ref:s,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});ya.displayName="DrawerContent";function ja({className:t,...e}){return n.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ja.displayName="DrawerHeader";function Na({className:t,...e}){return n.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Na.displayName="DrawerFooter";const ka=l.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));ka.displayName=Ot.Drawer.Title.displayName;const _a=l.forwardRef(({className:t,...e},r)=>n.jsx(Ot.Drawer.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));_a.displayName=Ot.Drawer.Description.displayName;const Ca=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(zn.Root,{ref:o,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(zn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Ca.displayName=zn.Root.displayName;function Rd({className:t,...e}){return n.jsx(Yn.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Td=Yn.Panel;function Md({withHandle:t,className:e,...r}){return n.jsx(Yn.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(C.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Dd({...t}){return n.jsx(co.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Ea=l.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsxs(qe.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(qe.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(qe.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(qe.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Ea.displayName=qe.Root.displayName;const Sa=l.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsx(Gn.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Gn.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Sa.displayName=Gn.Root.displayName;const Id=_t.Root,Ra=l.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsx(_t.List,{ref:r,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});Ra.displayName=_t.List.displayName;const Ta=l.forwardRef(({className:t,...e},r)=>n.jsx(_t.Trigger,{ref:r,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));Ta.displayName=_t.Trigger.displayName;const Ma=l.forwardRef(({className:t,...e},r)=>n.jsx(_t.Content,{ref:r,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Ma.displayName=_t.Content.displayName;const Da=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));Da.displayName="Textarea";const Od=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Ad(t){return{preserveValue:!0,...t}}const Ia=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=Ad(s.current);const[a,i]=l.useState(()=>o.current),[c,d]=l.useState(!0);return l.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const p=await t();w&&(i(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||i(()=>o.current)}},[t]),[a,c]},Fn=()=>!1,Pd=(t,e)=>{const[r]=Ia(l.useCallback(async()=>{if(!t)return Fn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Fn,{preserveValue:!1});l.useEffect(()=>()=>{r!==Fn&&r()},[r])};function Ld(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>co.toast});exports.Alert=aa;exports.AlertDescription=la;exports.AlertTitle=ia;exports.Avatar=mr;exports.AvatarFallback=fr;exports.AvatarImage=as;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=hi;exports.BOOK_SELECTOR_STRING_KEYS=bi;exports.Badge=be;exports.BookChapterControl=fi;exports.BookSelector=vi;exports.Button=B;exports.COMMENT_EDITOR_STRING_KEYS=zl;exports.COMMENT_LIST_STRING_KEYS=Gl;exports.Card=pr;exports.CardContent=ur;exports.CardDescription=os;exports.CardFooter=ss;exports.CardHeader=ns;exports.CardTitle=rs;exports.ChapterRangeSelector=Eo;exports.Checkbox=_n;exports.Checklist=gd;exports.ComboBox=cn;exports.Command=Yt;exports.CommandEmpty=Fe;exports.CommandGroup=It;exports.CommandInput=ke;exports.CommandItem=At;exports.CommandList=Xt;exports.CommentEditor=Bl;exports.CommentList=Hl;exports.ContextMenu=yd;exports.ContextMenuCheckboxItem=ua;exports.ContextMenuContent=wa;exports.ContextMenuGroup=Nd;exports.ContextMenuItem=pa;exports.ContextMenuLabel=fa;exports.ContextMenuPortal=kd;exports.ContextMenuRadioGroup=Cd;exports.ContextMenuRadioItem=ma;exports.ContextMenuSeparator=ha;exports.ContextMenuShortcut=ga;exports.ContextMenuSub=_d;exports.ContextMenuSubContent=da;exports.ContextMenuSubTrigger=ca;exports.ContextMenuTrigger=jd;exports.DataTable=gs;exports.Dialog=go;exports.DialogClose=ci;exports.DialogContent=Zn;exports.DialogDescription=vo;exports.DialogFooter=bo;exports.DialogHeader=Jn;exports.DialogOverlay=Wn;exports.DialogPortal=xo;exports.DialogTitle=Qn;exports.DialogTrigger=li;exports.Drawer=ba;exports.DrawerClose=Sd;exports.DrawerContent=ya;exports.DrawerDescription=_a;exports.DrawerFooter=Na;exports.DrawerHeader=ja;exports.DrawerOverlay=Ar;exports.DrawerPortal=va;exports.DrawerTitle=ka;exports.DrawerTrigger=Ed;exports.DropdownMenu=te;exports.DropdownMenuCheckboxItem=qt;exports.DropdownMenuContent=Ht;exports.DropdownMenuGroup=gr;exports.DropdownMenuItem=We;exports.DropdownMenuItemType=vs;exports.DropdownMenuLabel=Be;exports.DropdownMenuPortal=is;exports.DropdownMenuRadioGroup=cs;exports.DropdownMenuRadioItem=vr;exports.DropdownMenuSeparator=_e;exports.DropdownMenuShortcut=ds;exports.DropdownMenuSub=ls;exports.DropdownMenuSubContent=br;exports.DropdownMenuSubTrigger=xr;exports.DropdownMenuTrigger=ce;exports.ERROR_DUMP_STRING_KEYS=xs;exports.ERROR_POPOVER_STRING_KEYS=ec;exports.EditorKeyboardShortcuts=ks;exports.ErrorDump=bs;exports.ErrorPopover=nc;exports.FOOTNOTE_EDITOR_STRING_KEYS=bc;exports.Filter=ic;exports.FilterDropdown=rc;exports.Footer=ac;exports.FootnoteEditor=xc;exports.FootnoteItem=Ss;exports.FootnoteList=jc;exports.INVENTORY_STRING_KEYS=Ic;exports.Input=Ce;exports.Inventory=Pc;exports.Label=wt;exports.MARKER_MENU_STRING_KEYS=_s;exports.MarkdownRenderer=tc;exports.MarkerMenu=Cs;exports.MoreInfo=oc;exports.MultiSelectComboBox=ys;exports.NavigationContentSearch=sd;exports.Popover=Wt;exports.PopoverAnchor=_o;exports.PopoverContent=Pt;exports.PopoverTrigger=ee;exports.Progress=Ca;exports.RadioGroup=jn;exports.RadioGroupItem=Ye;exports.RecentSearches=Co;exports.ResizableHandle=Md;exports.ResizablePanel=Td;exports.ResizablePanelGroup=Rd;exports.ResultsCard=xd;exports.SCOPE_SELECTOR_STRING_KEYS=Zc;exports.ScopeSelector=Jc;exports.ScriptureResultsViewer=Yc;exports.ScrollGroupSelector=Qc;exports.SearchBar=Cn;exports.Select=ye;exports.SelectContent=we;exports.SelectGroup=ws;exports.SelectItem=Et;exports.SelectLabel=us;exports.SelectScrollDownButton=jr;exports.SelectScrollUpButton=yr;exports.SelectSeparator=ms;exports.SelectTrigger=de;exports.SelectValue=je;exports.Separator=ve;exports.SettingsList=td;exports.SettingsListHeader=nd;exports.SettingsListItem=ed;exports.SettingsSidebar=Ks;exports.SettingsSidebarContentSearch=Vc;exports.Sidebar=_r;exports.SidebarContent=Er;exports.SidebarFooter=As;exports.SidebarGroup=hn;exports.SidebarGroupAction=Ls;exports.SidebarGroupContent=xn;exports.SidebarGroupLabel=gn;exports.SidebarHeader=Os;exports.SidebarInput=Is;exports.SidebarInset=Cr;exports.SidebarMenu=Sr;exports.SidebarMenuAction=$s;exports.SidebarMenuBadge=Fs;exports.SidebarMenuButton=Tr;exports.SidebarMenuItem=Rr;exports.SidebarMenuSkeleton=Vs;exports.SidebarMenuSub=Bs;exports.SidebarMenuSubButton=Gs;exports.SidebarMenuSubItem=zs;exports.SidebarProvider=kr;exports.SidebarRail=Ds;exports.SidebarSeparator=Ps;exports.SidebarTrigger=Ms;exports.Skeleton=fn;exports.Slider=Ea;exports.Sonner=Dd;exports.Spinner=sa;exports.Switch=Sa;exports.TabDropdownMenu=vn;exports.TabFloatingMenu=od;exports.TabToolbar=rd;exports.Table=Je;exports.TableBody=tn;exports.TableCaption=hs;exports.TableCell=le;exports.TableFooter=fs;exports.TableHead=Pe;exports.TableHeader=Qe;exports.TableRow=Kt;exports.Tabs=Id;exports.TabsContent=Ma;exports.TabsList=Ra;exports.TabsTrigger=Ta;exports.TextField=bd;exports.Textarea=Da;exports.ToggleGroup=kn;exports.ToggleGroupItem=Ie;exports.Toolbar=ud;exports.Tooltip=yt;exports.TooltipContent=ft;exports.TooltipProvider=mt;exports.TooltipTrigger=jt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=js;exports.UiLanguageSelector=fd;exports.UndoRedoButtons=Ns;exports.VerticalTabs=Dr;exports.VerticalTabsContent=Or;exports.VerticalTabsList=Ir;exports.VerticalTabsTrigger=Ws;exports.Z_INDEX_ABOVE_DOCK=Ne;exports.Z_INDEX_FOOTNOTE_EDITOR=Xn;exports.Z_INDEX_MODAL=ho;exports.Z_INDEX_MODAL_BACKDROP=fo;exports.Z_INDEX_OVERLAY=mo;exports.badgeVariants=es;exports.buttonVariants=rr;exports.cn=h;exports.getBookIdFromUSFM=Dc;exports.getInventoryHeader=en;exports.getLinesFromUSFM=Tc;exports.getNumberFromUSFM=Mc;exports.getStatusForItem=Rs;exports.getToolbarOSReservedSpaceClassName=pd;exports.inventoryCountColumn=Sc;exports.inventoryItemColumn=Cc;exports.inventoryStatusColumn=Rc;exports.selectTriggerVariants=ps;exports.useEvent=Od;exports.useEventAsync=Pd;exports.useListbox=ts;exports.usePromise=Ia;exports.useRecentSearches=wi;exports.useSidebar=nn;exports.useStylesheet=Ld;function $d(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}$d(`*, ::before, ::after {
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
