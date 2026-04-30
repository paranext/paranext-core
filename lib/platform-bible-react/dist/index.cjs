"use strict";var Pa=Object.defineProperty;var $a=(t,e,r)=>e in t?Pa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Nt=(t,e,r)=>$a(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),Ct=require("cmdk"),_=require("lucide-react"),Fa=require("clsx"),Va=require("tailwind-merge"),za=require("@radix-ui/react-dialog"),dt=require("@sillsdev/scripture"),k=require("platform-bible-utils"),Oe=require("@radix-ui/react-slot"),ue=require("class-variance-authority"),Ba=require("@radix-ui/react-popover"),Ka=require("@radix-ui/react-label"),Ga=require("@radix-ui/react-radio-group"),x=require("lexical"),ao=require("@radix-ui/react-tooltip"),Fn=require("@lexical/rich-text"),$r=require("react-dom"),qa=require("@lexical/table"),Ua=require("@radix-ui/react-toggle-group"),Ha=require("@radix-ui/react-toggle"),io=require("@lexical/headless"),Ya=require("@radix-ui/react-separator"),Xa=require("@radix-ui/react-avatar"),lo=require("@radix-ui/react-dropdown-menu"),_t=require("@tanstack/react-table"),Wa=require("@radix-ui/react-select"),Za=require("markdown-to-jsx"),Mt=require("@eten-tech-foundation/platform-editor"),Ja=require("@radix-ui/react-checkbox"),Qa=require("@radix-ui/react-tabs"),ti=require("@radix-ui/react-menubar"),ei=require("react-hotkeys-hook"),ni=require("react-resizable-panels"),ri=require("@radix-ui/react-context-menu"),Pt=require("vaul"),oi=require("@radix-ui/react-progress"),co=require("sonner"),si=require("@radix-ui/react-slider"),ai=require("@radix-ui/react-switch");function gt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Tt=gt(za),Te=gt(Ba),wo=gt(Ka),Ge=gt(Ga),ge=gt(ao),gn=gt(Ua),uo=gt(Ha),po=gt(Ya),Le=gt(Xa),et=gt(lo),ct=gt(Wa),Vn=gt(Ja),Et=gt(Qa),nt=gt(ti),Yn=gt(ni),rt=gt(ri),zn=gt(oi),Be=gt(si),Bn=gt(ai),ii=Va.extendTailwindMerge({prefix:"tw-"});function g(...t){return ii(Fa.clsx(t))}const ve=250,Xn=300,mo=400,fo=450,Wn=500,li="layoutDirection";function wt(){const t=localStorage.getItem(li);return t==="rtl"?t:"ltr"}const ho=Tt.Root,ci=Tt.Trigger,go=Tt.Portal,di=Tt.Close,Zn=l.forwardRef(({className:t,style:e,...r},o)=>n.jsx(Tt.Overlay,{ref:o,className:g("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:fo,...e},...r}));Zn.displayName=Tt.Overlay.displayName;const Jn=l.forwardRef(({className:t,children:e,overlayClassName:r,style:o,...s},i)=>{const a=wt();return n.jsxs(go,{children:[n.jsx(Zn,{className:r}),n.jsxs(Tt.Content,{ref:i,className:g("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:Wn,...o},...s,dir:a,children:[e,n.jsxs(Tt.Close,{className:g("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Jn.displayName=Tt.Content.displayName;function Qn({className:t,...e}){return n.jsx("div",{className:g("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Qn.displayName="DialogHeader";function xo({className:t,...e}){return n.jsx("div",{className:g("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}xo.displayName="DialogFooter";const tr=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Title,{ref:r,className:g("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));tr.displayName=Tt.Title.displayName;const bo=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Description,{ref:r,className:g("tw-text-sm tw-text-muted-foreground",t),...e}));bo.displayName=Tt.Description.displayName;const Wt=l.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Command,{ref:r,className:g("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Wt.displayName=Ct.Command.displayName;const ye=l.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(_.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(Ct.Command.Input,{ref:r,className:g("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});ye.displayName=Ct.Command.Input.displayName;const Zt=l.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Command.List,{ref:r,className:g("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Zt.displayName=Ct.Command.List.displayName;const Ae=l.forwardRef((t,e)=>n.jsx(Ct.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ae.displayName=Ct.Command.Empty.displayName;const Lt=l.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Command.Group,{ref:r,className:g("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Lt.displayName=Ct.Command.Group.displayName;const er=l.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Command.Separator,{ref:r,className:g("tw--mx-1 tw-h-px tw-bg-border",t),...e}));er.displayName=Ct.Command.Separator.displayName;const $t=l.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Command.Item,{ref:r,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));$t.displayName=Ct.Command.Item.displayName;function vo({className:t,...e}){return n.jsx("span",{className:g("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}vo.displayName="CommandShortcut";const yo=(t,e,r,o,s)=>{switch(t){case k.Section.OT:return e??"Old Testament";case k.Section.NT:return r??"New Testament";case k.Section.DC:return o??"Deuterocanon";case k.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},wi=(t,e,r,o,s)=>{switch(t){case k.Section.OT:return e??"OT";case k.Section.NT:return r??"NT";case k.Section.DC:return o??"DC";case k.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ee(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??dt.Canon.bookIdToEnglishName(t)}function nr(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const jo=dt.Canon.allBookIds.filter(t=>!dt.Canon.isObsolete(dt.Canon.bookIdToNumber(t))),he=Object.fromEntries(jo.map(t=>[t,dt.Canon.bookIdToEnglishName(t)]));function rr(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=dt.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(k.includes(s.toLowerCase(),o)||k.includes(t.toLowerCase(),o)||(i?k.includes(i.localizedName.toLowerCase(),o)||k.includes(i.localizedId.toLowerCase(),o):!1))}const No=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:a=!1,localizedBookNames:c,commandValue:d},w)=>{const u=l.useRef(!1),p=()=>{u.current||r==null||r(t),setTimeout(()=>{u.current=!1},100)},m=v=>{u.current=!0,o?o(v):r==null||r(t)},f=l.useMemo(()=>Ee(t,c),[t,c]),h=l.useMemo(()=>nr(t,c),[t,c]);return n.jsx("div",{className:g("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===k.Section.OT,"tw-border-s-purple-200":s===k.Section.NT,"tw-border-s-indigo-200":s===k.Section.DC,"tw-border-s-amber-200":s===k.Section.Extra}),children:n.jsxs($t,{ref:w,value:d||`${t} ${dt.Canon.bookIdToEnglishName(t)}`,onSelect:p,onMouseDown:m,role:"option","aria-selected":e,"aria-label":`${dt.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[a&&n.jsx(_.Check,{className:g("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:f}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:h})]})})}),or=ue.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},i)=>{const a=o?Oe.Slot:"button";return n.jsx(a,{className:g(or({variant:e,size:r,className:t})),ref:i,...s})});B.displayName="Button";const Jt=Te.Root,oe=Te.Trigger,ko=Te.Anchor,Ft=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},i)=>{const a=wt();return n.jsx(Te.Portal,{children:n.jsx(Te.Content,{ref:i,align:e,sideOffset:r,className:g("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:ve,...o},...s,dir:a})})});Ft.displayName=Te.Content.displayName;function Kn(t,e,r){return`${t} ${he[t]}${e?` ${nr(t,e)} ${Ee(t,e)}`:""}${r?` ${r}`:""}`}function _o({recentSearches:t,onSearchItemSelect:e,renderItem:r=u=>String(u),getItemKey:o=u=>String(u),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:a,classNameForItems:c,buttonClassName:d="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:w="ghost"}){const[u,p]=l.useState(!1);if(t.length===0)return;const m=f=>{e(f),p(!1)};return n.jsxs(Jt,{open:u,onOpenChange:p,children:[n.jsx(oe,{asChild:!0,children:n.jsx(B,{variant:w,size:"icon",className:d,"aria-label":s,children:n.jsx(_.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Ft,{id:a,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Wt,{children:n.jsx(Zt,{children:n.jsx(Lt,{heading:i,children:t.map(f=>n.jsxs($t,{onSelect:()=>m(f),className:g("tw-flex tw-items-center",c),children:[n.jsx(_.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(f)})]},o(f)))})})})})]})}function ui(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(c=>!r(c,s)),a=[s,...i.slice(0,o-1)];e(a)}}const _n={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},pi=[_n.BOOK_ONLY,_n.BOOK_CHAPTER,_n.BOOK_CHAPTER_VERSE];function Fr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function qt(t){return k.getChaptersForBook(dt.Canon.bookIdToNumber(t))}function mi(t,e,r){if(!t.trim()||e.length===0)return;const o=pi.reduce((s,i)=>{if(s)return s;const a=i.exec(t.trim());if(a){const[c,d=void 0,w=void 0]=a.slice(1);let u;const p=e.filter(m=>rr(m,c,r));if(p.length===1&&([u]=p),!u&&d){if(dt.Canon.isBookIdValid(c)){const m=c.toUpperCase();e.includes(m)&&(u=m)}if(!u&&r){const m=Array.from(r.entries()).find(([,f])=>f.localizedId.toLowerCase()===c.toLowerCase());m&&e.includes(m[0])&&([u]=m)}}if(!u&&d){const f=(h=>Object.keys(he).find(v=>he[v].toLowerCase()===h.toLowerCase()))(c);if(f&&e.includes(f)&&(u=f),!u&&r){const h=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([u]=h)}}if(u){let m=d?parseInt(d,10):void 0;m&&m>qt(u)&&(m=Math.max(qt(u),1));const f=w?parseInt(w,10):void 0;return{book:u,chapterNum:m,verseNum:f}}}},void 0);if(o)return o}function fi(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],u=Math.max(qt(w),1);o({book:w,chapterNum:u,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{const d=qt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const u=e[w+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?_.ChevronsLeft:_.ChevronsRight},{onClick:a,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?_.ChevronLeft:_.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?_.ChevronRight:_.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===qt(t.book)||qt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?_.ChevronsRight:_.ChevronsLeft}],[t,e,r,s,a,c,i])}function Vr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(Lt,{children:n.jsx("div",{className:g("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:qt(t)},(a,c)=>c+1).map(a=>n.jsx($t,{value:`${t} ${he[t]||""} ${a}`,onSelect:()=>r(a),ref:o(a),className:g("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&a===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(a))??!1}),children:a},a))})})}function hi({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:a,onAddRecentSearch:c,id:d}){const w=wt(),[u,p]=l.useState(!1),[m,f]=l.useState(""),[h,v]=l.useState(""),[b,y]=l.useState("books"),[j,C]=l.useState(void 0),[N,$]=l.useState(!1),V=l.useRef(void 0),L=l.useRef(void 0),T=l.useRef(void 0),E=l.useRef(void 0),S=l.useRef({}),R=l.useCallback(P=>{e(P),c&&c(P)},[e,c]),M=l.useMemo(()=>o?o():jo,[o]),I=l.useMemo(()=>({[k.Section.OT]:M.filter(D=>dt.Canon.isBookOT(D)),[k.Section.NT]:M.filter(D=>dt.Canon.isBookNT(D)),[k.Section.DC]:M.filter(D=>dt.Canon.isBookDC(D)),[k.Section.Extra]:M.filter(D=>dt.Canon.extraBooks().includes(D))}),[M]),F=l.useMemo(()=>Object.values(I).flat(),[I]),H=l.useMemo(()=>{if(!h.trim())return I;const P={[k.Section.OT]:[],[k.Section.NT]:[],[k.Section.DC]:[],[k.Section.Extra]:[]};return[k.Section.OT,k.Section.NT,k.Section.DC,k.Section.Extra].forEach(z=>{P[z]=I[z].filter(q=>rr(q,h,s))}),P},[I,h,s]),A=l.useMemo(()=>mi(h,F,s),[h,F,s]),W=l.useCallback(()=>{A&&(R({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1}),p(!1),v(""),f(""))},[R,A]),yt=l.useCallback(P=>{if(qt(P)<=1){R({book:P,chapterNum:1,verseNum:1}),p(!1),v("");return}C(P),y("chapters")},[R]),K=l.useCallback(P=>{const D=b==="chapters"?j:A==null?void 0:A.book;D&&(R({book:D,chapterNum:P,verseNum:1}),p(!1),y("books"),C(void 0),v(""))},[R,b,j,A]),tt=l.useCallback(P=>{R(P),p(!1),v("")},[R]),Y=fi(t,F,w,e),X=l.useCallback(()=>{y("books"),C(void 0),setTimeout(()=>{L.current&&L.current.focus()},0)},[]),G=l.useCallback(P=>{if(!P&&b==="chapters"){X();return}p(P),P&&(y("books"),C(void 0),v(""))},[b,X]),{otLong:ot,ntLong:st,dcLong:it,extraLong:jt}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},te=l.useCallback(P=>yo(P,ot,st,it,jt),[ot,st,it,jt]),zt=l.useCallback(P=>A?!!A.chapterNum&&!P.toString().includes(A.chapterNum.toString()):!1,[A]),Bt=l.useMemo(()=>k.formatScrRef(t,s?Ee(t.book,s):"English"),[t,s]),ke=l.useCallback(P=>D=>{S.current[P]=D},[]),ae=l.useCallback(P=>{(P.key==="Home"||P.key==="End")&&P.stopPropagation()},[]),ee=l.useCallback(P=>{if(P.ctrlKey)return;const{isLetter:D,isDigit:z}=Fr(P.key);if(b==="chapters"){if(P.key==="Backspace"){P.preventDefault(),P.stopPropagation(),X();return}if(D||z){if(P.preventDefault(),P.stopPropagation(),y("books"),C(void 0),z&&j){const q=he[j];v(`${q} ${P.key}`)}else v(P.key);setTimeout(()=>{L.current&&L.current.focus()},0);return}}if((b==="chapters"||b==="books"&&A)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(P.key)){const q=b==="chapters"?j:A==null?void 0:A.book;if(!q)return;const U=(()=>{if(!m)return 1;const lt=m.match(/(\d+)$/);return lt?parseInt(lt[1],10):0})(),at=qt(q);if(!at)return;let J=U;const bt=6;switch(P.key){case"ArrowLeft":U!==0&&(J=U>1?U-1:at);break;case"ArrowRight":U!==0&&(J=U<at?U+1:1);break;case"ArrowUp":J=U===0?at:Math.max(1,U-bt);break;case"ArrowDown":J=U===0?1:Math.min(at,U+bt);break;default:return}J!==U&&(P.preventDefault(),P.stopPropagation(),f(Kn(q,s,J)),setTimeout(()=>{const lt=S.current[J];lt&&lt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,A,X,j,m,s]),Fe=l.useCallback(P=>{if(P.shiftKey||P.key==="Tab"||P.key===" ")return;const{isLetter:D,isDigit:z}=Fr(P.key);(D||z)&&(P.preventDefault(),v(q=>q+P.key),L.current.focus(),$(!1))},[]);return l.useLayoutEffect(()=>{const P=setTimeout(()=>{if(u&&b==="books"&&T.current&&E.current){const D=T.current,z=E.current,q=z.offsetTop,U=D.clientHeight,at=z.clientHeight,J=q-U/2+at/2;D.scrollTo({top:Math.max(0,J),behavior:"smooth"}),f(Kn(t.book))}},0);return()=>{clearTimeout(P)}},[u,b,h,A,t.book]),l.useLayoutEffect(()=>{if(b==="chapters"&&j){const P=j===t.book;setTimeout(()=>{if(T.current)if(P){const D=S.current[t.chapterNum];D&&D.scrollIntoView({block:"center",behavior:"smooth"})}else T.current.scrollTo({top:0});V.current&&V.current.focus()},0)}},[b,j,A,t.book,t.chapterNum]),n.jsxs(Jt,{open:u,onOpenChange:G,children:[n.jsx(oe,{asChild:!0,children:n.jsx(B,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":u,className:g("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Bt})})}),n.jsx(Ft,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Wt,{ref:V,onKeyDown:ee,loop:!0,value:m,onValueChange:f,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(ye,{ref:L,value:h,onValueChange:v,onKeyDown:ae,onFocus:()=>$(!1),className:a&&a.length>0?"!tw-pr-10":""}),a&&a.length>0&&n.jsx(_o,{recentSearches:a,onSearchItemSelect:tt,renderItem:P=>k.formatScrRef(P,"English"),getItemKey:P=>`${P.book}-${P.chapterNum}-${P.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:Y.map(({onClick:P,disabled:D,title:z,icon:q})=>n.jsx(B,{variant:"ghost",size:"sm",onClick:()=>{$(!0),P()},disabled:D,className:"tw-h-10 tw-w-4 tw-p-0",title:z,onKeyDown:Fe,children:n.jsx(q,{})},z))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:X,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(_.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(_.ArrowRight,{className:"tw-h-4 tw-w-4"})}),j&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ee(j,s)})]}),!N&&n.jsxs(Zt,{ref:T,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!A&&Object.entries(H).map(([P,D])=>{if(D.length!==0)return n.jsx(Lt,{heading:te(P),children:D.map(z=>n.jsx(No,{bookId:z,onSelect:q=>yt(q),section:k.getSectionForBook(z),commandValue:`${z} ${he[z]}`,ref:z===t.book?E:void 0,localizedBookNames:s},z))},P)}),A&&n.jsx(Lt,{children:n.jsx($t,{value:`${A.book} ${he[A.book]} ${A.chapterNum||""}:${A.verseNum||""})}`,onSelect:W,className:"tw-font-semibold tw-text-primary",children:k.formatScrRef({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1},s?nr(A.book,s):void 0)},"top-match")}),A&&qt(A.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Ee(A.book,s)}),n.jsx(Vr,{bookId:A.book,scrRef:t,onChapterSelect:K,setChapterRef:ke,isChapterDimmed:zt,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&j&&n.jsx(Vr,{bookId:j,scrRef:t,onChapterSelect:K,setChapterRef:ke,className:"tw-p-4"})]})]})})]})}const gi=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),xi=ue.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),mt=l.forwardRef(({className:t,...e},r)=>n.jsx(wo.Root,{ref:r,className:g("pr-twp",xi(),t),...e}));mt.displayName=wo.Root.displayName;const xn=l.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(Ge.Root,{className:g("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});xn.displayName=Ge.Root.displayName;const qe=l.forwardRef(({className:t,...e},r)=>n.jsx(Ge.Item,{ref:r,className:g("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ge.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(_.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));qe.displayName=Ge.Item.displayName;function bi(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function sn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:i,value:a,onChange:c=()=>{},getOptionLabel:d=bi,getButtonLabel:w,icon:u=void 0,buttonPlaceholder:p="",textPlaceholder:m="",commandEmptyMessage:f="No option found",buttonVariant:h="outline",alignDropDown:v="start",isDisabled:b=!1,ariaLabel:y,...j}){const[C,N]=l.useState(!1),$=w??d,V=T=>T.length>0&&typeof T[0]=="object"&&"options"in T[0],L=(T,E)=>{const S=d(T),R=typeof T=="object"&&"secondaryLabel"in T?T.secondaryLabel:void 0,M=`${E??""}${S}${R??""}`;return n.jsxs($t,{value:S,onSelect:()=>{c(T),N(!1)},className:"tw-flex tw-items-center",children:[n.jsx(_.Check,{className:g("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||d(a)!==S})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[S,R&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",R]})]})]},M)};return n.jsxs(Jt,{open:C,onOpenChange:N,...j,children:[n.jsx(oe,{asChild:!0,children:n.jsxs(B,{variant:h,role:"combobox","aria-expanded":C,"aria-label":y,id:t,className:g("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:u}),n.jsx("span",{className:g("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?$(a):p})]}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Ft,{align:v,className:g("tw-w-[200px] tw-p-0",s),style:i,children:n.jsxs(Wt,{children:[n.jsx(ye,{placeholder:m,className:"tw-text-inherit"}),n.jsx(Ae,{children:f}),n.jsx(Zt,{children:V(e)?e.map(T=>n.jsx(Lt,{heading:T.groupHeading,children:T.options.map(E=>L(E,T.groupHeading))},T.groupHeading)):e.map(T=>L(T))})]})})]})}function Co({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const a=l.useMemo(()=>Array.from({length:i},(w,u)=>u+1),[i]),c=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(mt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(sn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:a,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(mt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(sn,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:a,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const vi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Cn=(t,e)=>t[e]??e;function yi({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:a,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const u=Cn(w,"%webView_bookSelector_currentBook%"),p=Cn(w,"%webView_bookSelector_choose%"),m=Cn(w,"%webView_bookSelector_chooseBooks%"),[f,h]=l.useState("current book"),v=b=>{h(b),t(b)};return n.jsx(xn,{className:"pr-twp tw-flex",value:f,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(qe,{value:"current book"}),n.jsx(mt,{className:"tw-ms-1",children:u})]}),n.jsx(mt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Co,{isDisabled:f==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:a,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(qe,{value:"choose books"}),n.jsx(mt,{className:"tw-ms-1",children:m})]}),n.jsx(mt,{className:"tw-flex tw-items-center",children:o.map(b=>dt.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(B,{disabled:f==="current book",onClick:()=>r(),children:p})]})]})})}const Eo=l.createContext(null);function ji(t,e){return{getTheme:function(){return e??null}}}function Qt(){const t=l.useContext(Eo);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const So=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ni=So?l.useLayoutEffect:l.useEffect,tn={tag:x.HISTORY_MERGE_TAG};function ki({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:a,editorState:c,html:d}=t,w=ji(null,o),u=x.createEditor({editable:t.editable,html:d,namespace:s,nodes:i,onError:p=>a(p,u),theme:o});return function(p,m){if(m!==null){if(m===void 0)p.update(()=>{const f=x.$getRoot();if(f.isEmpty()){const h=x.$createParagraphNode();f.append(h);const v=So?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===p.getRootElement())&&h.select()}},tn);else if(m!==null)switch(typeof m){case"string":{const f=p.parseEditorState(m);p.setEditorState(f,tn);break}case"object":p.setEditorState(m,tn);break;case"function":p.update(()=>{x.$getRoot().isEmpty()&&m(p)},tn)}}}(u,c),[u,w]},[]);return Ni(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(Eo.Provider,{value:r,children:e})}const _i=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ci({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Qt();return _i(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:c,tags:d})=>{e&&i.size===0&&a.size===0||t&&d.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const sr={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},ut=ge.Provider,ft=ge.Root,ht=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(ge.Trigger,{ref:o,className:e?g(or({variant:e}),t):t,...r}));ht.displayName=ge.Trigger.displayName;const pt=l.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(ge.Portal,{children:n.jsx(ge.Content,{ref:s,sideOffset:e,style:{zIndex:ve,...r},className:g("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));pt.displayName=ge.Content.displayName;const ar=[Fn.HeadingNode,x.ParagraphNode,x.TextNode,Fn.QuoteNode],Ei=l.createContext(null),En={didCatch:!1,error:null};class Si extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=En}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(En)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&Ri(e.resetKeys,s)){var i,a;(i=(a=this.props).onReset)===null||i===void 0||i.call(a,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(En)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:a}=this.state;let c=e;if(i){const d={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=l.createElement(o,d);else if(s!==void 0)c=s;else throw a}return l.createElement(Ei.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Ri(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function Ti({children:t,onError:e}){return n.jsx(Si,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const Mi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Di(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Ii(){return function(t){const[e]=Qt(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),i=l.useRef(o);return Mi(()=>{const{initialValueFn:a,subscribe:c}=r,d=a();return i.current!==d&&(i.current=d,s(d)),c(w=>{i.current=w,s(w)})},[r,t]),o}(Di)}function Oi(t,e){const r=t.getRootElement();if(r===null)return[];const o=r.getBoundingClientRect(),s=getComputedStyle(r),i=parseFloat(s.paddingLeft)+parseFloat(s.paddingRight),a=Array.from(e.getClientRects());let c,d=a.length;a.sort((w,u)=>{const p=w.top-u.top;return Math.abs(p)<=3?w.left-u.left:p});for(let w=0;w<d;w++){const u=a[w],p=c&&c.top<=u.top&&c.top+c.height>u.top&&c.left+c.width>u.left,m=u.width+i===o.width;p||m?(a.splice(w--,1),d--):c=u}return a}function Li(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,a=t.isBackward(),c=s.getNode(),d=i.getNode(),w=e.is(c),u=e.is(d);if(w||u){const[p,m]=x.$getCharacterOffsets(t),f=c.is(d),h=e.is(a?d:c),v=e.is(a?c:d);let b,y=0;f?(y=p>m?m:p,b=p>m?p:m):h?(y=a?m:p,b=void 0):v&&(y=0,b=a?p:m);const j=e.__text.slice(y,b);j!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=j)}}return e}function an(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Ro=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ai=Ro&&"documentMode"in document?document.documentMode:null;!(!Ro||!("InputEvent"in window)||Ai)&&"getTargetRanges"in new window.InputEvent("input");function Gt(t){return`${t}px`}const Pi={attributes:!0,characterData:!0,childList:!0,subtree:!0};function $i(t,e,r){let o=null,s=null,i=null,a=[];const c=document.createElement("div");function d(){o===null&&an(182),s===null&&an(183);const{left:p,top:m}=s.getBoundingClientRect(),f=Oi(t,e);var h,v;c.isConnected||(v=c,(h=s).insertBefore(v,h.firstChild));let b=!1;for(let y=0;y<f.length;y++){const j=f[y],C=a[y]||document.createElement("div"),N=C.style;N.position!=="absolute"&&(N.position="absolute",b=!0);const $=Gt(j.left-p);N.left!==$&&(N.left=$,b=!0);const V=Gt(j.top-m);N.top!==V&&(C.style.top=V,b=!0);const L=Gt(j.width);N.width!==L&&(C.style.width=L,b=!0);const T=Gt(j.height);N.height!==T&&(C.style.height=T,b=!0),C.parentNode!==c&&(c.append(C),b=!0),a[y]=C}for(;a.length>f.length;)a.pop();b&&r(a)}function w(){s=null,o=null,i!==null&&i.disconnect(),i=null,c.remove();for(const p of a)p.remove();a=[]}c.style.position="relative";const u=t.registerRootListener(function p(){const m=t.getRootElement();if(m===null)return w();const f=m.parentElement;if(!x.isHTMLElement(f))return w();w(),o=m,s=f,i=new MutationObserver(h=>{const v=t.getRootElement(),b=v&&v.parentElement;if(v!==o||b!==s)return p();for(const y of h)if(!c.contains(y.target))return d()}),i.observe(f,Pi),d()});return()=>{u(),w()}}function zr(t,e,r){if(t.type!=="text"&&x.$isElementNode(e)){const o=e.getDOMSlot(r);return[o.element,o.getFirstChildOffset()+t.offset]}return[x.getDOMTextNode(r)||r,t.offset]}function Fi(t){for(const e of t){const r=e.style;r.background!=="Highlight"&&(r.background="Highlight"),r.color!=="HighlightText"&&(r.color="HighlightText"),r.marginTop!==Gt(-1.5)&&(r.marginTop=Gt(-1.5)),r.paddingTop!==Gt(4)&&(r.paddingTop=Gt(4)),r.paddingBottom!==Gt(0)&&(r.paddingBottom=Gt(0))}}function Vi(t,e=Fi){let r=null,o=null,s=null,i=null,a=null,c=null,d=()=>{};function w(u){u.read(()=>{const p=x.$getSelection();if(!x.$isRangeSelection(p))return r=null,s=null,i=null,c=null,d(),void(d=()=>{});const[m,f]=function(T){const E=T.getStartEndPoints();return T.isBackward()?[E[1],E[0]]:E}(p),h=m.getNode(),v=h.getKey(),b=m.offset,y=f.getNode(),j=y.getKey(),C=f.offset,N=t.getElementByKey(v),$=t.getElementByKey(j),V=r===null||N!==o||b!==s||v!==r.getKey(),L=i===null||$!==a||C!==c||j!==i.getKey();if((V||L)&&N!==null&&$!==null){const T=function(E,S,R,M,I,F,H){const A=(E._window?E._window.document:document).createRange();return A.setStart(...zr(S,R,M)),A.setEnd(...zr(I,F,H)),A}(t,m,h,N,f,y,$);d(),d=$i(t,T,e)}r=h,o=N,s=b,i=y,a=$,c=C})}return w(t.getEditorState()),x.mergeRegister(t.registerUpdateListener(({editorState:u})=>w(u)),()=>{d()})}function zi(t,e){let r=null;const o=()=>{const s=getSelection(),i=s&&s.anchorNode,a=t.getRootElement();i!==null&&a!==null&&a.contains(i)?r!==null&&(r(),r=null):r===null&&(r=Vi(t,e))};return t.registerRootListener(s=>{if(s){const i=s.ownerDocument;return i.addEventListener("selectionchange",o),o(),()=>{r!==null&&r(),i.removeEventListener("selectionchange",o)}}})}function Bi(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||an(4,t.__key),e}function Ki(t){const e=x.$getSelection()||x.$getPreviousSelection();let r;if(x.$isRangeSelection(e))r=x.$caretFromPoint(e.focus,"next");else{if(e!=null){const a=e.getNodes(),c=a[a.length-1];c&&(r=x.$getSiblingCaret(c,"next"))}r=r||x.$getChildCaret(x.$getRoot(),"previous").getFlipped().insert(x.$createParagraphNode())}const o=Gi(t,r),s=x.$getAdjacentChildCaret(o),i=x.$isChildCaret(s)?x.$normalizeCaret(s):o;return x.$setSelectionFromCaretRange(x.$getCollapsedCaretRange(i)),t.getLatest()}function Gi(t,e,r){let o=x.$getCaretInDirection(e,"next");for(let s=o;s;s=x.$splitAtPointCaretNext(s,r))o=s;return x.$isTextPointCaret(o)&&an(283),o.insert(t.isInline()?x.$createParagraphNode().append(t):t),x.$getCaretInDirection(x.$getSiblingCaret(t.getLatest(),"next"),e.direction)}function qi(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],a=i.getKey();if(r.has(a))continue;const c=x.$findMatchingParent(i,w=>x.$isElementNode(w)&&!w.isInline());if(c===null)continue;const d=c.getKey();c.canIndent()&&!r.has(d)&&(r.add(d),t(c))}return r.size>0}const Ui=Symbol.for("preact-signals");function bn(){if(ne>1)return void ne--;let t,e=!1;for(!function(){let r=ln;for(ln=void 0;r!==void 0;)r.S.v===r.v&&(r.S.i=r.i),r=r.o}();Ke!==void 0;){let r=Ke;for(Ke=void 0,cn++;r!==void 0;){const o=r.u;if(r.u=void 0,r.f&=-3,!(8&r.f)&&To(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(cn=0,ne--,e)throw t}function Hi(t){if(ne>0)return t();Gn=++Yi,ne++;try{return t()}finally{bn()}}let Z,Ke;function Br(t){const e=Z;Z=void 0;try{return t()}finally{Z=e}}let ln,ne=0,cn=0,Yi=0,Gn=0,rn=0;function Kr(t){if(Z===void 0)return;let e=t.n;return e===void 0||e.t!==Z?(e={i:0,S:t,p:Z.s,n:void 0,t:Z,e:void 0,x:void 0,r:e},Z.s!==void 0&&(Z.s.n=e),Z.s=e,t.n=e,32&Z.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=Z.s,e.n=void 0,Z.s.n=e,Z.s=e),e):void 0}function kt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Ue(t,e){return new kt(t,e)}function To(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Gr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Mo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function me(t,e){kt.call(this,void 0),this.x=t,this.s=void 0,this.g=rn-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Xi(t,e){return new me(t,e)}function Do(t){const e=t.m;if(t.m=void 0,typeof e=="function"){ne++;const r=Z;Z=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,ir(t),o}finally{Z=r,bn()}}}function ir(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Do(t)}function Wi(t){if(Z!==this)throw new Error("Out-of-order effect");Mo(this),Z=t,this.f&=-2,8&this.f&&ir(this),bn()}function Ce(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}function Yt(t,e){const r=new Ce(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function Pe(t,e={}){const r={};for(const o in t){const s=e[o],i=Ue(s===void 0?t[o]:s);r[o]=i}return r}kt.prototype.brand=Ui,kt.prototype.h=function(){return!0},kt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Br(()=>{var r;(r=this.W)==null||r.call(this)}))},kt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Br(()=>{var o;(o=this.Z)==null||o.call(this)}))}},kt.prototype.subscribe=function(t){return Yt(()=>{const e=this.value,r=Z;Z=void 0;try{t(e)}finally{Z=r}},{name:"sub"})},kt.prototype.valueOf=function(){return this.value},kt.prototype.toString=function(){return this.value+""},kt.prototype.toJSON=function(){return this.value},kt.prototype.peek=function(){const t=Z;Z=void 0;try{return this.value}finally{Z=t}},Object.defineProperty(kt.prototype,"value",{get(){const t=Kr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(cn>100)throw new Error("Cycle detected");(function(e){ne!==0&&cn===0&&e.l!==Gn&&(e.l=Gn,ln={S:e,v:e.v,i:e.i,o:ln})})(this),this.v=t,this.i++,rn++,ne++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{bn()}}}}),me.prototype=new kt,me.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===rn))return!0;if(this.g=rn,this.f|=1,this.i>0&&!To(this))return this.f&=-2,!0;const t=Z;try{Gr(this),Z=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Z=t,Mo(this),this.f&=-2,!0},me.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}kt.prototype.S.call(this,t)},me.prototype.U=function(t){if(this.t!==void 0&&(kt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},me.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(me.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Kr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Ce.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}},Ce.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Do(this),Gr(this),ne++;const t=Z;return Z=this,Wi.bind(this,t)},Ce.prototype.N=function(){2&this.f||(this.f|=2,this.u=Ke,Ke=this)},Ce.prototype.d=function(){this.f|=8,1&this.f||ir(this)},Ce.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>Pe(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return Yt(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Io(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function Oo(t,e=Io){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>Pe(e),config:x.safeCast({$onClear:Io}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return Yt(()=>Oo(t,o.value))}});function Zi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const Sn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class Lo extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:Sn}]})}getFormat(){return x.$getState(this,Sn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,Sn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Ji(t){return t instanceof Lo}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Lo],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())Ji(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function Ao(t,e){let r;return Ue(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const qn=x.defineExtension({build:t=>Ao(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function Q(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Po(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=Po(r[s],o[s]);return t}return e}const lr=0,Un=1,$o=2,Rn=3,en=4,_e=5,Tn=6,Ve=7;function Mn(t){return t.id===lr}function Fo(t){return t.id===$o}function Qi(t){return function(e){return e.id===Un}(t)||Q(305,String(t.id),String(Un)),Object.assign(t,{id:$o})}const tl=new Set;class el{constructor(e,r){Nt(this,"builder");Nt(this,"configs");Nt(this,"_dependency");Nt(this,"_peerNameSet");Nt(this,"extension");Nt(this,"state");Nt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:lr}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Fo(r)||Q(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,d,w){return Object.assign(c,{config:d,id:Rn,registerState:w})}(r,this.mergeConfigs(),o);let a;this.state=i,this.extension.init&&(a=this.extension.init(e,i.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:en,initResult:d,registerState:w})}(i,a,s)}build(e){const r=this.state;let o;r.id!==en&&Q(307,String(r.id),String(_e)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,a,c){return Object.assign(i,{id:_e,output:a,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==_e&&Q(308,String(o.id),String(_e));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:Tn})}(o),()=>{const i=this.state;i.id!==Ve&&Q(309,String(o.id),String(Ve)),this.state=function(a){return Object.assign(a,{id:_e})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==Tn&&Q(310,String(r.id),String(Tn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ve})}(r),o}getSignal(){return this._signal===void 0&&Q(311),this._signal}getInitResult(){this.extension.init===void 0&&Q(312,this.extension.name);const e=this.state;return function(r){return r.id>=en}(e)||Q(313,String(e.id),String(en)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=Rn}(e)||Q(314,String(e.id),String(Rn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Q(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Q(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Ve}(e)||Q(316,String(e.id),String(Ve)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||tl}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=_e})(e)||Q(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const qr={tag:x.HISTORY_MERGE_TAG};function nl(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const rl=x.defineExtension({config:x.safeCast({setOptions:qr,updateOptions:qr}),init:({$initialEditorState:t=nl})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const a=t.parseEditorState(i);t.setEditorState(a,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Ur=Symbol.for("@lexical/extension/LexicalBuilder");function Hr(){}function ol(t){throw t}function nn(t){return Array.isArray(t)?t:[t]}const Dn="0.43.0+prod.esm";class Se{constructor(e){Nt(this,"roots");Nt(this,"extensionNameMap");Nt(this,"outgoingConfigEdges");Nt(this,"incomingEdges");Nt(this,"conflicts");Nt(this,"_sortedExtensionReps");Nt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Dn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[nn(rl)];for(const o of e)r.push(nn(o));return new Se(r)}static maybeFromEditor(e){const r=e[Ur];return r&&(r.PACKAGE_VERSION!==Dn&&Q(292,r.PACKAGE_VERSION,Dn),r instanceof Se||Q(293)),r}static fromEditor(e){const r=Se.maybeFromEditor(e);return r===void 0&&Q(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[Ur]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=Hr;function r(){try{e()}finally{e=Hr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&Q(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&Q(296);const r=nn(e),[o]=r;typeof o.name!="string"&&Q(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&Q(298,o.name),!s){s=new el(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&Q(299,o.name,i);for(const a of o.conflictsWith||[])this.extensionNameMap.has(a)&&Q(299,o.name,a),this.conflicts.set(a,o.name);for(const a of o.dependencies||[]){const c=nn(a);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[a,c]of o.peerDependencies||[])this.addEdge(o.name,a,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(Fo(i))return;const a=o.extension.name;var c;Mn(i)||Q(300,a,s||"[unknown]"),Mn(c=i)||Q(304,String(c.id),String(lr)),i=Object.assign(c,{id:Un}),o.state=i;const d=this.outgoingConfigEdges.get(a);if(d)for(const w of d.keys()){const u=this.extensionNameMap.get(w);u&&r(u,a)}i=Qi(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())Mn(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const a=this.extensionNameMap.get(s);if(a)for(const c of i)a.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&Q(301,o.name);for(const a of s)i.configs.add(a)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const a of r){const c=a.register(e,i);c&&s.push(c)}for(const a of r){const c=a.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},a={},c=this.sortedExtensionReps();for(const u of c){const{extension:p}=u;if(p.onError!==void 0&&(e.onError=p.onError),p.disableEvents!==void 0&&(e.disableEvents=p.disableEvents),p.parentEditor!==void 0&&(e.parentEditor=p.parentEditor),p.editable!==void 0&&(e.editable=p.editable),p.namespace!==void 0&&(e.namespace=p.namespace),p.$initialEditorState!==void 0&&(e.$initialEditorState=p.$initialEditorState),p.nodes)for(const m of Zi(p)){if(typeof m!="function"){const f=o.get(m.replace);f&&Q(302,p.name,m.replace.name,f.extension.name),o.set(m.replace,u)}r.add(m)}if(p.html){if(p.html.export)for(const[m,f]of p.html.export.entries())s.set(m,f);p.html.import&&Object.assign(i,p.html.import)}p.theme&&Po(a,p.theme)}Object.keys(a).length>0&&(e.theme=a),r.size&&(e.nodes=[...r]);const d=Object.keys(i).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=i),w&&(e.html.export=s));for(const u of c)u.init(e);return e.onError||(e.onError=ol),e}}const sl=new Set,Yr=x.defineExtension({build(t,e,r){const o=r.getDependency(qn).output,s=Ue({watchedNodeKeys:new Map}),i=Ao(()=>{},()=>Yt(()=>{const a=i.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(x.$getSelection())for(const[u,p]of c.entries()){if(p.size===0){c.delete(u);continue}const m=x.$getNodeByKey(u),f=m&&m.isSelected()||!1;w=w||f!==(!!a&&a.has(u)),f&&(d=d||new Set,d.add(u))}}),!w&&d&&a&&d.size===a.size||(i.value=d)}));return{watchNodeKey:function(a){const c=Xi(()=>(i.value||sl).has(a)),{watchedNodeKeys:d}=s.peek();let w=d.get(a);const u=w!==void 0;return w=w||new Set,w.add(c),u||(d.set(a,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[qn],name:"@lexical/extension/NodeSelection"}),al=x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Me extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Me(e.__key)}static importJSON(e){return cr().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:il,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function il(){return{node:cr()}}function cr(){return x.$create(Me)}function ll(t){return t instanceof Me}x.defineExtension({dependencies:[qn,Yr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Me],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Yr).output,s=Ue({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(al,a=>{const c=x.$getSelection();if(!x.$isRangeSelection(c))return!1;if(c.focus.getNode()!==null){const d=cr();Ki(d)}return!0},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.CLICK_COMMAND,a=>{if(x.isDOMNode(a.target)){const c=x.$getNodeFromDOMNode(a.target);if(ll(c))return function(d,w=!1){const u=x.$getSelection(),p=d.isSelected(),m=d.getKey();let f;w&&x.$isNodeSelection(u)?f=u:(f=x.$createNodeSelection(),x.$setSelection(f)),p?f.delete(m):f.add(m)}(c,a.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(Me,(a,c)=>{Hi(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[u,p]of a.entries())if(p==="destroyed")w.delete(u),d=!0;else{const m=w.get(u),f=t.getElementByKey(u);m?m.domNode.value=f:(d=!0,w.set(u,{domNode:Ue(f),selectedSignal:o(u)}))}d&&(s.value={nodeSelections:w})})}),Yt(()=>{const a=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())a.push(Yt(()=>{const w=c.value;w&&(d.value?x.addClassNamesToElement(w,i):x.removeClassNamesFromElement(w,i))}));return x.mergeRegister(...a)}))}});x.defineExtension({build:(t,e)=>Pe({inheritEditableFromParent:e.inheritEditableFromParent}),config:x.safeCast({$getParentEditor:function(){const t=x.$getEditor();return Se.fromEditor(t),t},inheritEditableFromParent:!1}),init:(t,e,r)=>{const o=e.$getParentEditor();t.parentEditor=o,t.theme=t.theme||o._config.theme},name:"@lexical/extension/NestedEditor",register:(t,e,r)=>Yt(()=>{const o=t._parentEditor;if(o&&r.getOutput().inheritEditableFromParent.value)return t.setEditable(o.isEditable()),o.registerEditableListener(t.setEditable.bind(t))})});x.defineExtension({build:(t,e,r)=>Pe(e),config:x.safeCast({disabled:!1,onReposition:void 0}),name:"@lexical/utils/SelectionAlwaysOnDisplay",register:(t,e,r)=>{const o=r.getOutput();return Yt(()=>{if(!o.disabled.value)return zi(t,o.onReposition.value)})}});function Vo(t){return t.canBeEmpty()}function cl(t,e,r=Vo){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(a){if(a.getNodes().filter(m=>x.$isBlockElementNode(m)&&m.canIndent()).length>0)return!0;const c=a.anchor,d=a.focus,w=d.isBefore(c)?d:c,u=w.getNode(),p=Bi(u);if(p.canIndent()){const m=p.getKey();let f=x.$createRangeSelection();if(f.anchor.set(m,0,"element"),f.focus.set(m,0,"element"),f=x.$normalizeSelection__EXPERIMENTAL(f),f.anchor.is(w))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return qi(a=>{if(i(a)){const c=a.getIndent()+1;(!o||c<o)&&a.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>Pe(e),config:x.safeCast({$canIndent:Vo,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return Yt(()=>{if(!o.value)return cl(t,s,i)})}});const dl=x.defineExtension({name:"@lexical/react/ReactProvider"});function wl(){return x.$getRoot().getTextContent()}function ul(t,e=!0){if(t)return!1;let r=wl();return e&&(r=r.trim()),r===""}function pl(t){if(!ul(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),a=i.length;for(let c=0;c<a;c++){const d=i[o];if(!x.$isTextNode(d))return!1}}}return!0}function zo(t){return()=>pl(t)}function Bo(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let a;try{a=JSON.parse(i)}catch{return}if(a&&a.protocol==="nuanria_messaging"&&a.type==="request"){const c=a.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,u,p,m,f]=d;t.update(()=>{const h=x.$getSelection();if(x.$isRangeSelection(h)){const v=h.anchor;let b=v.getNode(),y=0,j=0;if(x.$isTextNode(b)&&w>=0&&u>=0&&(y=w,j=w+u,h.setTextNodeRange(b,y,b,j)),y===j&&p===""||(h.insertRawText(p),b=v.getNode()),x.$isTextNode(b)){y=m,j=m+f;const C=b.getTextContentSize();y=y>C?C:y,j=j>C?C:j,h.setTextNodeRange(b,y,b,j)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>Pe(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>Yt(()=>r.getOutput().disabled.value?void 0:Bo(t))});function ml(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const dr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function fl({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=l.useState(()=>r.getDecorators());return dr(()=>r.registerDecoratorListener(a=>{$r.flushSync(()=>{i(a)})}),[r]),l.useEffect(()=>{i(r.getDecorators())},[r]),l.useMemo(()=>{const a=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],u=n.jsx(o,{onError:m=>r._onError(m),children:n.jsx(l.Suspense,{fallback:null,children:s[w]})}),p=r.getElementByKey(w);p!==null&&a.push($r.createPortal(u,p,w))}return a},[o,s,r])}(t,e)}function hl({editor:t,ErrorBoundary:e}){return function(r){const o=Se.maybeFromEditor(r);if(o&&o.hasExtensionByName(dl.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&ml(320,s);return!0}return!1}(t)?null:n.jsx(fl,{editor:t,ErrorBoundary:e})}function Xr(t){return t.getEditorState().read(zo(t.isComposing()))}function gl({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Qt();return function(s){dr(()=>x.mergeRegister(Fn.registerRichText(s),Bo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(xl,{content:e}),n.jsx(hl,{editor:o,ErrorBoundary:r})]})}function xl({content:t}){const[e]=Qt(),r=function(s){const[i,a]=l.useState(()=>Xr(s));return dr(()=>{function c(){const d=Xr(s);a(d)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(e),o=Ii();return r?typeof t=="function"?t(o):t:null}function bl({defaultSelection:t}){const[e]=Qt();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const vl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function yl({onClear:t}){const[e]=Qt();return vl(()=>Oo(e,t),[e,t]),null}const Ko=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function jl({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:a,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:u,ariaOwns:p,ariaRequired:m,autoCapitalize:f,className:h,id:v,role:b="textbox",spellCheck:y=!0,style:j,tabIndex:C,"data-testid":N,...$},V){const[L,T]=l.useState(t.isEditable()),E=l.useCallback(R=>{R&&R.ownerDocument&&R.ownerDocument.defaultView?t.setRootElement(R):t.setRootElement(null)},[t]),S=l.useMemo(()=>function(...R){return M=>{for(const I of R)typeof I=="function"?I(M):I!=null&&(I.current=M)}}(V,E),[E,V]);return Ko(()=>(T(t.isEditable()),t.registerEditableListener(R=>{T(R)})),[t]),n.jsx("div",{"aria-activedescendant":L?e:void 0,"aria-autocomplete":L?r:"none","aria-controls":L?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":L&&b==="combobox"?!!a:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":u,"aria-owns":L?p:void 0,"aria-readonly":!L||void 0,"aria-required":m,autoCapitalize:f,className:h,contentEditable:L,"data-testid":N,id:v,ref:S,role:b,spellCheck:y,style:j,tabIndex:C,...$})}const Nl=l.forwardRef(jl);function Wr(t){return t.getEditorState().read(zo(t.isComposing()))}const kl=l.forwardRef(_l);function _l(t,e){const{placeholder:r,...o}=t,[s]=Qt();return n.jsxs(n.Fragment,{children:[n.jsx(Nl,{editor:s,...o,ref:e}),r!=null&&n.jsx(Cl,{editor:s,content:r})]})}function Cl({content:t,editor:e}){const r=function(a){const[c,d]=l.useState(()=>Wr(a));return Ko(()=>{function w(){const u=Wr(a);d(u)}return w(),x.mergeRegister(a.registerUpdateListener(()=>{w()}),a.registerEditableListener(()=>{w()}))},[a]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(a=>{s(a)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function El({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(kl,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Go=l.createContext(void 0);function Sl({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const a=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Go.Provider,{value:a,children:i})}function qo(){const t=l.useContext(Go);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Rl(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:i,content:a}=t;return n.jsx(ho,{open:!0,onOpenChange:r,children:n.jsxs(Jn,{children:[n.jsx(Qn,{children:n.jsx(tr,{children:i})}),a]})})},[t,r]),s=l.useCallback((i,a,c=!1)=>{e({closeOnClickOutside:c,content:a(r),title:i})},[r]);return[o,s]}function Tl({children:t}){const[e]=Qt(),[r,o]=l.useState(e),[s,i]=l.useState("paragraph"),[a,c]=Rl(),d=()=>{};return l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(w,u)=>(o(u),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Sl,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:i,showModal:c,children:[a,t({blockType:s})]})}function Ml(t){const[e]=Qt(),{activeEditor:r}=qo();l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const Uo=ue.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Dl=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(uo.Root,{ref:s,className:g(Uo({variant:e,size:r,className:t})),...o}));Dl.displayName=uo.Root.displayName;const Ho=l.createContext({size:"default",variant:"default"}),vn=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},i)=>{const a=wt();return n.jsx(gn.Root,{ref:i,className:g("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:a,children:n.jsx(Ho.Provider,{value:{variant:e,size:r},children:o})})});vn.displayName=gn.Root.displayName;const Re=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},i)=>{const a=l.useContext(Ho);return n.jsx(gn.Item,{ref:i,className:g(Uo({variant:a.variant||r,size:a.size||o}),t),...s,children:e})});Re.displayName=gn.Item.displayName;const Zr=[{format:"bold",icon:_.BoldIcon,label:"Bold"},{format:"italic",icon:_.ItalicIcon,label:"Italic"}];function Il(){const{activeEditor:t}=qo(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(x.$isRangeSelection(s)||qa.$isTableSelection(s)){const i=[];Zr.forEach(({format:a})=>{s.hasFormat(a)&&i.push(a)}),r(a=>a.length!==i.length||!i.every(c=>a.includes(c))?i:a)}},[]);return Ml(o),n.jsx(vn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Zr.map(({format:s,icon:i,label:a})=>n.jsx(Re,{value:s,"aria-label":a,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function Ol({onClear:t}){const[e]=Qt();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Ll({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Tl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Il,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(gl,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(El,{placeholder:t})}),ErrorBoundary:Ti}),e&&n.jsx(bl,{defaultSelection:"rootEnd"}),n.jsx(Ol,{onClear:r}),n.jsx(yl,{})]})]})}const Al={namespace:"commentEditor",theme:sr,nodes:ar,onError:t=>{console.error(t)}};function dn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:a,className:c}){return n.jsx("div",{className:g("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(ki,{initialConfig:{...Al,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(ut,{children:[n.jsx(Ll,{placeholder:s,autoFocus:i,onClear:a}),n.jsx(Ci,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function Pl(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!Xo.has(i.nodeName)){const a=Wo(i,t,s,!1);a!==null&&(o=o.concat(a))}return function(i){for(const a of i)a.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&a.insertAfter(x.$createLineBreakNode());for(const a of i){const c=a.getChildren();for(const d of c)a.insertBefore(d);a.remove()}}(s),o}function $l(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)Yo(t,o[s],r,e);return r.innerHTML}function Yo(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let a=e;o!==null&&x.$isTextNode(e)&&(a=Li(o,e,"clone"));const c=x.$isElementNode(a)?a.getChildren():[],d=x.getRegisteredNode(t,a.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,a):a.exportDOM(t);const{element:u,after:p}=w;if(!u)return!1;const m=document.createDocumentFragment();for(let f=0;f<c.length;f++){const h=c[f],v=Yo(t,h,m,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(h,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(u)||x.isDocumentFragment(u))&&u.append(m),r.append(u),p){const f=p.call(a,u);f&&(x.isDocumentFragment(u)?u.replaceChildren(f):u.replaceWith(f))}}else r.append(m);return s}const Xo=new Set(["STYLE","SCRIPT"]);function Wo(t,e,r,o,s=new Map,i){let a=[];if(Xo.has(t.nodeName))return a;let c=null;const d=function(h,v){const{nodeName:b}=h,y=v._htmlConversions.get(b.toLowerCase());let j=null;if(y!==void 0)for(const C of y){const N=C(h);N!==null&&(j===null||(j.priority||0)<=(N.priority||0))&&(j=N)}return j!==null?j.conversion:null}(t,e),w=d?d(t):null;let u=null;if(w!==null){u=w.after;const h=w.node;if(c=Array.isArray(h)?h[h.length-1]:h,c!==null){for(const[,v]of s)if(c=v(c,i),!c)break;c&&a.push(...Array.isArray(h)?h:[c])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const p=t.childNodes;let m=[];const f=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let h=0;h<p.length;h++)m.push(...Wo(p[h],e,r,f,new Map(s),c));return u!=null&&(m=u(m)),x.isBlockDomNode(t)&&(m=Fl(t,m,f?()=>{const h=new x.ArtificialNode__DO_NOT_USE;return r.push(h),h}:x.$createParagraphNode)),c==null?m.length>0?a=a.concat(m):x.isBlockDomNode(t)&&function(h){return h.nextSibling==null||h.previousSibling==null?!1:x.isInlineDomNode(h.nextSibling)&&x.isInlineDomNode(h.previousSibling)}(t)&&(a=a.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...m),a}function Fl(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let a=0;a<e.length;a++){const c=e[a];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),a===e.length-1||a<e.length-1&&x.$isBlockElementNode(e[a+1])){const d=r();d.setFormat(o),d.append(...i),s.push(d),i=[]}}return s}function Zo(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Jo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Jo(e.children)):!1}function Ot(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Jo(t.root.children):!1}function Vl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=io.createHeadlessEditor({namespace:"EditorUtils",theme:sr,nodes:ar,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=Pl(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function wn(t){const e=io.createHeadlessEditor({namespace:"EditorUtils",theme:sr,nodes:ar,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=$l(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function wr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function on(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function ur(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const zl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function In(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function Bl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=l.useState(zl),[a,c]=l.useState(void 0),[d,w]=l.useState(!1),u=l.useRef(void 0),p=l.useRef(null);l.useEffect(()=>{let y=!0;const j=p.current;if(!j)return;const C=setTimeout(()=>{y&&Zo(j)},300);return()=>{y=!1,clearTimeout(C)}},[]);const m=l.useCallback(()=>{if(!Ot(s))return;const y=wn(s);e(y,a)},[s,e,a]),f=o["%commentEditor_placeholder%"]??"Type your comment here...",h=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(B,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(_.X,{})})}),n.jsx(pt,{children:n.jsx("p",{children:v})})]})}),n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(B,{onClick:m,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Ot(s),children:n.jsx(_.Check,{})})}),n.jsx(pt,{children:n.jsx("p",{children:h})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Jt,{open:d,onOpenChange:w,children:[n.jsx(oe,{asChild:!0,children:n.jsxs(B,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(_.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:In(a!==void 0?a:"",o)})]})}),n.jsx(Ft,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:y=>{y.key==="Escape"&&(y.stopPropagation(),w(!1))},children:n.jsx(Wt,{children:n.jsx(Zt,{children:t.map(y=>n.jsx($t,{onSelect:()=>{c(y===""?void 0:y),w(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:In(y,o)})},y||"unassigned"))})})})]})}),n.jsx("div",{ref:p,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:y=>{y.key==="Escape"?(y.preventDefault(),y.stopPropagation(),r()):ur(y)&&(y.preventDefault(),y.stopPropagation(),Ot(s)&&m())},onKeyDown:y=>{wr(y),(y.key==="Enter"||y.key===" ")&&y.stopPropagation()},children:n.jsx(dn,{editorSerializedState:s,onSerializedChange:y=>i(y),placeholder:f,onClear:y=>{u.current=y}})})]})}const Kl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),Gl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],ql=["input","select","textarea","button"],Ul=["button","textbox"],yn=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[i,a]=l.useState(void 0),[c,d]=l.useState(void 0),w=l.useCallback(f=>{a(f);const h=t.find(b=>b.id===f);h&&(e==null||e(h));const v=document.getElementById(f);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",f)},[e,t]),u=l.useCallback(f=>{const h=t.find(v=>v.id===f);h&&(d(v=>v===f?void 0:f),r==null||r(h))},[r,t]),p=f=>{if(!f)return!1;const h=f.tagName.toLowerCase();if(f.isContentEditable||ql.includes(h))return!0;const v=f.getAttribute("role");if(v&&Ul.includes(v))return!0;const b=f.getAttribute("tabindex");return b!==void 0&&b!=="-1"},m=l.useCallback(f=>{var L;const h=f.target,v=T=>T?document.getElementById(T):void 0,b=v(c),y=v(i);if(!!(b&&h&&b.contains(h)&&h!==b)&&p(h)){if(f.key==="Escape"||f.key==="ArrowLeft"&&!h.isContentEditable){if(c){f.preventDefault(),f.stopPropagation();const T=t.find(E=>E.id===c);T&&w(T.id)}return}if(f.key==="ArrowDown"||f.key==="ArrowUp"){if(!b)return;const T=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(T.length===0)return;const E=T.findIndex(R=>R===h);if(E===-1)return;let S;f.key==="ArrowDown"?S=Math.min(E+1,T.length-1):S=Math.max(E-1,0),S!==E&&(f.preventDefault(),f.stopPropagation(),(L=T[S])==null||L.focus());return}return}const N=t.findIndex(T=>T.id===i);let $=N;switch(f.key){case"ArrowDown":$=Math.min(N+1,t.length-1),f.preventDefault();break;case"ArrowUp":$=Math.max(N-1,0),f.preventDefault();break;case"Home":$=0,f.preventDefault();break;case"End":$=t.length-1,f.preventDefault();break;case" ":case"Enter":i&&u(i),f.preventDefault(),f.stopPropagation();return;case"ArrowRight":{const T=y;if(T){const E=T.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),S=T.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),R=E??S;if(R){f.preventDefault(),R.focus();return}}break}default:f.key.length===1&&!f.metaKey&&!f.ctrlKey&&!f.altKey&&(p(h)||(o==null||o(f.key),f.preventDefault()));return}const V=t[$];V&&w(V.id)},[t,w,i,c,u,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:m,focusOption:w}},Qo=ue.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ce=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:g("pr-twp",Qo({variant:e}),t),...r}));ce.displayName="Badge";const pr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:g("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));pr.displayName="Card";const ts=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:g("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));ts.displayName="CardHeader";const es=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:g("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));es.displayName="CardTitle";const ns=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:g("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));ns.displayName="CardDescription";const mr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:g("pr-twp tw-p-6 tw-pt-0",t),...e}));mr.displayName="CardContent";const rs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:g("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));rs.displayName="CardFooter";const Dt=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(po.Root,{ref:s,decorative:r,orientation:e,className:g("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));Dt.displayName=po.Root.displayName;const fr=l.forwardRef(({className:t,...e},r)=>n.jsx(Le.Root,{ref:r,className:g("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));fr.displayName=Le.Root.displayName;const os=l.forwardRef(({className:t,...e},r)=>n.jsx(Le.Image,{ref:r,className:g("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));os.displayName=Le.Image.displayName;const hr=l.forwardRef(({className:t,...e},r)=>n.jsx(Le.Fallback,{ref:r,className:g("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));hr.displayName=Le.Fallback.displayName;const gr=l.createContext(void 0);function Vt(){const t=l.useContext(gr);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const se=ue.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),re=et.Trigger,xr=et.Group,ss=et.Portal,as=et.Sub,is=et.RadioGroup;function Xt({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(gr.Provider,{value:r,children:n.jsx(et.Root,{...e})})}const br=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=Vt();return n.jsxs(et.SubTrigger,{ref:s,className:g("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,se({variant:i.variant})),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});br.displayName=et.SubTrigger.displayName;const vr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=wt();return n.jsx(et.SubContent,{ref:o,className:g("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});vr.displayName=et.SubContent.displayName;const At=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const i=wt();return n.jsx(et.Portal,{children:n.jsx(et.Content,{ref:s,sideOffset:e,className:g("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});At.displayName=et.Content.displayName;const He=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=wt(),i=Vt();return n.jsx(et.Item,{ref:o,className:g("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,se({variant:i.variant})),...r,dir:s})});He.displayName=et.Item.displayName;const Ht=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=wt(),a=Vt();return n.jsxs(et.CheckboxItem,{ref:s,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,se({variant:a.variant})),checked:r,...o,dir:i,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(et.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Ht.displayName=et.CheckboxItem.displayName;const yr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=wt(),i=Vt();return n.jsxs(et.RadioItem,{ref:o,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,se({variant:i.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(et.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});yr.displayName=et.RadioItem.displayName;const $e=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Label,{ref:o,className:g("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));$e.displayName=et.Label.displayName;const je=l.forwardRef(({className:t,...e},r)=>n.jsx(et.Separator,{ref:r,className:g("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));je.displayName=et.Separator.displayName;function ls({className:t,...e}){return n.jsx("span",{className:g("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}ls.displayName="DropdownMenuShortcut";function Jr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:a,canEditOrDelete:c=!1}){const[d,w]=l.useState(!1),[u,p]=l.useState(),m=l.useRef(null);l.useEffect(()=>{if(!d)return;let N=!0;const $=m.current;if(!$)return;const V=setTimeout(()=>{N&&Zo($)},300);return()=>{N=!1,clearTimeout(V)}},[d]);const f=l.useCallback(N=>{N&&N.stopPropagation(),w(!1),p(void 0),a==null||a(!1)},[a]),h=l.useCallback(async N=>{if(N&&N.stopPropagation(),!u||!s)return;await s(t.id,wn(u))&&(w(!1),p(void 0),a==null||a(!1))},[u,s,t.id,a]),v=l.useMemo(()=>{const N=new Date(t.date),$=k.formatRelativeDate(N,r["%comment_date_today%"],r["%comment_date_yesterday%"]),V=N.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return k.formatReplacementString(r["%comment_dateAtTime%"],{date:$,time:V})},[t.date,r]),b=l.useMemo(()=>t.user,[t.user]),y=l.useMemo(()=>t.user.split(" ").map(N=>N[0]).join("").toUpperCase().slice(0,2),[t.user]),j=l.useMemo(()=>k.sanitizeHtml(t.contents),[t.contents]),C=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(He,{onClick:N=>{N.stopPropagation(),w(!0),p(Vl(t.contents)),a==null||a(!0)},children:[n.jsx(_.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(He,{onClick:async N=>{N.stopPropagation(),i&&await i(t.id)},children:[n.jsx(_.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,i,a]);return n.jsxs("div",{className:g("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(fr,{className:"tw-h-8 tw-w-8",children:n.jsx(hr,{className:"tw-text-xs tw-font-medium",children:y})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(ce,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",on(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:m,onKeyDownCapture:N=>{N.key==="Escape"?(N.preventDefault(),N.stopPropagation(),f()):ur(N)&&(N.preventDefault(),N.stopPropagation(),Ot(u)&&h())},onKeyDown:N=>{wr(N),(N.key==="Enter"||N.key===" ")&&N.stopPropagation()},onClick:N=>{N.stopPropagation()},children:[n.jsx(dn,{className:g('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:u,onSerializedChange:N=>p(N)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(B,{size:"icon",onClick:f,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(_.X,{})}),n.jsx(B,{size:"icon",onClick:h,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Ot(u),children:n.jsx(_.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:g("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:j}})]})]}),C&&n.jsxs(Xt,{children:[n.jsx(re,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"icon",children:n.jsx(_.MoreHorizontal,{})})}),n.jsx(At,{align:"end",children:C})]})]})}const Qr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Hl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:a,handleSelectThread:c,threadId:d,thread:w,threadStatus:u,handleAddCommentToThread:p,handleUpdateComment:m,handleDeleteComment:f,handleReadStatusChange:h,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:y,canUserResolveThreadCallback:j,canUserEditOrDeleteCommentCallback:C,isRead:N=!1,autoReadDelay:$=5,onVerseRefClick:V}){const[L,T]=l.useState(Qr),[E,S]=l.useState(void 0),R=o,[M,I]=l.useState(!1),[F,H]=l.useState(!1),[A,W]=l.useState(!1),[yt,K]=l.useState(!1),[tt,Y]=l.useState(!1),[X,G]=l.useState(N),[ot,st]=l.useState(!1),it=l.useRef(void 0),[jt,te]=l.useState(new Map);l.useEffect(()=>{let O=!0;return(async()=>{const xt=j?await j(d):!1;O&&Y(xt)})(),()=>{O=!1}},[d,j]),l.useEffect(()=>{let O=!0;if(!o){K(!1),te(new Map);return}return(async()=>{const xt=y?await y(d):!1;O&&K(xt)})(),()=>{O=!1}},[o,d,y]);const zt=l.useMemo(()=>e.filter(O=>!O.deleted),[e]);l.useEffect(()=>{let O=!0;if(!o||!C){te(new Map);return}return(async()=>{const xt=new Map;await Promise.all(zt.map(async Pr=>{const Aa=await C(Pr.id);O&&xt.set(Pr.id,Aa)})),O&&te(xt)})(),()=>{O=!1}},[o,zt,C]);const Bt=l.useMemo(()=>zt[0],[zt]),ke=l.useRef(null),ae=l.useRef(void 0),ee=l.useCallback(()=>{var O;(O=ae.current)==null||O.call(ae),T(Qr)},[]),Fe=l.useCallback(()=>{const O=!X;G(O),st(!O),h==null||h(d,O)},[X,h,d]);l.useEffect(()=>{I(!1)},[o]),l.useEffect(()=>{if(o&&!X&&!ot){const O=setTimeout(()=>{G(!0),h==null||h(d,!0)},$*1e3);return it.current=O,()=>clearTimeout(O)}it.current&&(clearTimeout(it.current),it.current=void 0)},[o,X,ot,$,d,h]);const P=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),D=l.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const O=on(i,r);return k.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:O})},[i,r]),z=l.useMemo(()=>zt.slice(1),[zt]),q=l.useMemo(()=>z.length??0,[z.length]),U=l.useMemo(()=>q>0,[q]),at=l.useMemo(()=>M||q<=2?z:z.slice(-2),[z,q,M]),J=l.useMemo(()=>M||q<=2?0:q-2,[q,M]),bt=l.useMemo(()=>q===1?P.singleReply:k.formatReplacementString(P.multipleReplies,{count:q}),[q,P]),lt=l.useMemo(()=>J===1?P.singleReply:k.formatReplacementString(P.multipleReplies,{count:J}),[J,P]);l.useEffect(()=>{!o&&F&&U&&H(!1)},[o,F,U]);const St=l.useCallback(async O=>{O&&O.stopPropagation();const vt=Ot(L)?wn(L):void 0;if(E!==void 0){await p({threadId:d,contents:vt,assignedUser:E})&&(S(void 0),vt&&ee());return}vt&&await p({threadId:d,contents:vt})&&ee()},[ee,L,p,E,d]),It=l.useCallback(async O=>{const vt=Ot(L)?wn(L):void 0,xt=await p({...O,contents:vt,assignedUser:E??O.assignedUser});return xt&&vt&&ee(),xt&&E!==void 0&&S(void 0),xt},[ee,L,p,E]);if(Bt)return n.jsx(pr,{role:"option","aria-selected":o,id:d,className:g("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&u!=="Resolved"&&X,"tw-bg-background":o&&u!=="Resolved"&&X,"tw-bg-muted":u==="Resolved","tw-bg-accent":!X&&!o&&u!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(mr,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[D&&n.jsx(ce,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:D}),n.jsx(B,{variant:"ghost",size:"icon",onClick:O=>{O.stopPropagation(),Fe()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":X?"Mark as unread":"Mark as read",children:X?n.jsx(_.MailOpen,{}):n.jsx(_.Mail,{})}),tt&&u!=="Resolved"&&n.jsx(B,{variant:"ghost",size:"icon",className:g("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:O=>{O.stopPropagation(),It({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:ke,className:g("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":R},{"tw-whitespace-nowrap":!R}),children:[s&&V?n.jsx(B,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:O=>{O.stopPropagation(),V(w)},children:s}):s,n.jsxs("span",{className:t,children:[Bt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Bt.selectedText}),Bt.contextAfter]})]})}),n.jsx(Jr,{comment:Bt,localizedStrings:r,isThreadExpanded:o,threadStatus:u,handleAddCommentToThread:It,handleUpdateComment:m,handleDeleteComment:f,onEditingChange:H,canEditOrDelete:(!F&&jt.get(Bt.id))??!1,canUserResolveThread:tt})]}),n.jsxs(n.Fragment,{children:[U&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(Dt,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:bt})]}),!o&&Ot(L)&&n.jsx(dn,{editorSerializedState:L,onSerializedChange:O=>T(O),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[J>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:O=>{O.stopPropagation(),I(!0)},role:"button",tabIndex:0,onKeyDown:O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),O.stopPropagation(),I(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(Dt,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:lt}),M?n.jsx(_.ChevronUp,{}):n.jsx(_.ChevronDown,{})]})]}),at.map(O=>n.jsx("div",{children:n.jsx(Jr,{comment:O,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:m,handleDeleteComment:f,onEditingChange:H,canEditOrDelete:(!F&&jt.get(O.id))??!1})},O.id)),b!==!1&&(!F||Ot(L))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:O=>O.stopPropagation(),onKeyDownCapture:O=>{ur(O)&&(O.preventDefault(),O.stopPropagation(),(Ot(L)||E!==void 0)&&St())},onKeyDown:O=>{wr(O),(O.key==="Enter"||O.key===" ")&&O.stopPropagation()},children:[n.jsx(dn,{editorSerializedState:L,onSerializedChange:O=>T(O),placeholder:u==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:O=>{ae.current=O}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[E!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:k.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:on(E,r)})}),n.jsxs(Jt,{open:A,onOpenChange:W,children:[n.jsx(oe,{asChild:!0,children:n.jsx(B,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!yt||!v||v.length===0||!v.includes(a),"aria-label":"Assign user",children:n.jsx(_.AtSign,{})})}),n.jsx(Ft,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:O=>{O.key==="Escape"&&(O.stopPropagation(),W(!1))},children:n.jsx(Wt,{children:n.jsx(Zt,{children:v==null?void 0:v.map(O=>n.jsx($t,{onSelect:()=>{S(O!==i?O:void 0),W(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:on(O,r)})},O||"unassigned"))})})})]}),n.jsx(B,{size:"icon",onClick:St,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Ot(L)&&E===void 0,"aria-label":"Submit comment",children:n.jsx(_.ArrowUp,{})})]})]})]})]})]})})}function Yl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:u,canUserAssignThreadCallback:p,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:f,selectedThreadId:h,onSelectedThreadChange:v,onVerseRefClick:b}){const[y,j]=l.useState(new Set),[C,N]=l.useState();l.useEffect(()=>{h&&(j(I=>new Set(I).add(h)),N(h))},[h]);const $=r.filter(I=>I.comments.some(F=>!F.deleted)),V=$.map(I=>({id:I.id})),L=l.useCallback(I=>{j(F=>new Set(F).add(I.id)),N(I.id),v==null||v(I.id)},[v]),T=l.useCallback(I=>{const F=y.has(I);j(H=>{const A=new Set(H);return A.has(I)?A.delete(I):A.add(I),A}),N(I),v==null||v(F?void 0:I)},[y,v]),{listboxRef:E,activeId:S,handleKeyDown:R}=yn({options:V,onOptionSelect:L}),M=l.useCallback(I=>{I.key==="Escape"?(C&&y.has(C)&&(j(F=>{const H=new Set(F);return H.delete(C),H}),N(void 0),v==null||v(void 0)),I.preventDefault(),I.stopPropagation()):R(I)},[C,y,R,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:E,"aria-activedescendant":S??void 0,"aria-label":"Comments",className:g("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:M,children:$.map(I=>n.jsx("div",{className:g({"tw-opacity-60":I.status==="Resolved"}),children:n.jsx(Hl,{classNameForVerseText:e,comments:I.comments,localizedStrings:s,verseRef:I.verseRef,handleSelectThread:T,threadId:I.id,thread:I,isRead:I.isRead,isSelected:y.has(I.id),currentUser:o,assignedUser:I.assignedUser,threadStatus:I.status,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:u,canUserAssignThreadCallback:p,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:f,onVerseRefClick:b})},I.id))})}function Xl({table:t}){return n.jsxs(Xt,{children:[n.jsx(lo.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(_.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(At,{align:"end",className:"tw-w-[150px]",children:[n.jsx($e,{children:"Toggle columns"}),n.jsx(je,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Ht,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const xe=ct.Root,cs=ct.Group,be=ct.Value,ds=ue.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),de=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const i=wt();return n.jsxs(ct.Trigger,{className:g(ds({size:r,className:t})),ref:s,...o,dir:i,children:[e,n.jsx(ct.Icon,{asChild:!0,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});de.displayName=ct.Trigger.displayName;const jr=l.forwardRef(({className:t,...e},r)=>n.jsx(ct.ScrollUpButton,{ref:r,className:g("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(_.ChevronUp,{className:"tw-h-4 tw-w-4"})}));jr.displayName=ct.ScrollUpButton.displayName;const Nr=l.forwardRef(({className:t,...e},r)=>n.jsx(ct.ScrollDownButton,{ref:r,className:g("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Nr.displayName=ct.ScrollDownButton.displayName;const we=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const i=wt();return n.jsx(ct.Portal,{children:n.jsxs(ct.Content,{ref:s,className:g("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(jr,{}),n.jsx(ct.Viewport,{className:g("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(Nr,{})]})})});we.displayName=ct.Content.displayName;const ws=l.forwardRef(({className:t,...e},r)=>n.jsx(ct.Label,{ref:r,className:g("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));ws.displayName=ct.Label.displayName;const Rt=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(ct.Item,{ref:o,className:g("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ct.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(ct.ItemText,{children:e})]}));Rt.displayName=ct.Item.displayName;const us=l.forwardRef(({className:t,...e},r)=>n.jsx(ct.Separator,{ref:r,className:g("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));us.displayName=ct.Separator.displayName;function Wl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(xe,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(de,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(be,{placeholder:t.getState().pagination.pageSize})}),n.jsx(we,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(Rt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(_.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(_.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(_.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(_.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const to=`
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
`;function Zl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ye(t,e){const r=e?`${to}, ${e}`:to;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Zl(o))}const Xe=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const a=s.current;if(!a)return;const c=()=>{requestAnimationFrame(()=>{Ye(a,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const i=a=>{const{current:c}=s;if(c){if(a.key==="ArrowDown"){a.preventDefault(),Ye(c)[0].focus();return}a.key===" "&&document.activeElement===c&&a.preventDefault()}};return n.jsx("div",{className:g("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:g("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Xe.displayName="Table";const We=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:g({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));We.displayName="TableHeader";const Ze=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:g("[&_tr:last-child]:tw-border-0",t),...e}));Ze.displayName="TableBody";const ps=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:g("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));ps.displayName="TableFooter";function Jl(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ye(t.current):[],i=s.indexOf(document.activeElement),a=o.key==="ArrowRight"?i+1:i-1;a>=0&&a<s.length&&s[a].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Ql(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function tc(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Ut=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const a=l.useRef(null);l.useEffect(()=>{typeof i=="function"?i(a.current):i&&"current"in i&&(i.current=a.current)},[i]),Jl(a);const c=l.useMemo(()=>a.current?Ye(a.current):[],[a]),d=l.useCallback(u=>{const{current:p}=a;if(!p||!p.parentElement)return;const m=p.closest("table"),f=m?Ye(m).filter(b=>b.tagName==="TR"):[],h=f.indexOf(p),v=c.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),tc(f,h,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),Ql(c,v,u.key);else if(u.key==="Escape"){u.preventDefault();const b=p.closest("table");b&&b.focus()}e==null||e(u)},[a,c,e]),w=l.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:a,tabIndex:-1,onKeyDown:d,onFocus:w,className:g("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Ut.displayName="TableRow";const De=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:g("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));De.displayName="TableHead";const le=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:g("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));le.displayName="TableCell";const ms=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:g("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));ms.displayName="TableCaption";function Ie({className:t,...e}){return n.jsx("div",{className:g("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function fs({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:a=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var V;const[u,p]=l.useState([]),[m,f]=l.useState([]),[h,v]=l.useState({}),[b,y]=l.useState({}),j=l.useMemo(()=>e??[],[e]),C=_t.useReactTable({data:j,columns:t,getCoreRowModel:_t.getCoreRowModel(),...r&&{getPaginationRowModel:_t.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:_t.getSortedRowModel(),onColumnFiltersChange:f,getFilteredRowModel:_t.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:y,state:{sorting:u,columnFilters:m,columnVisibility:h,rowSelection:b}}),N=C.getVisibleFlatColumns();let $;return d?$=Array.from({length:10}).map((E,S)=>`skeleton-row-${S}`).map(E=>n.jsx(Ut,{className:"hover:tw-bg-transparent",children:n.jsx(le,{colSpan:N.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(Ie,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},E)):((V=C.getRowModel().rows)==null?void 0:V.length)>0?$=C.getRowModel().rows.map(L=>n.jsx(Ut,{onClick:()=>a(L,C),"data-state":L.getIsSelected()&&"selected",children:L.getVisibleCells().map(T=>n.jsx(le,{children:_t.flexRender(T.column.columnDef.cell,T.getContext())},T.id))},L.id)):$=n.jsx(Ut,{children:n.jsx(le,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Xl,{table:C}),n.jsxs(Xe,{stickyHeader:i,children:[n.jsx(We,{stickyHeader:i,children:C.getHeaderGroups().map(L=>n.jsx(Ut,{children:L.headers.map(T=>n.jsx(De,{className:"tw-p-0",children:T.isPlaceholder?void 0:_t.flexRender(T.column.columnDef.header,T.getContext())},T.id))},L.id))}),n.jsx(Ze,{children:$})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(B,{variant:"outline",size:"sm",onClick:()=>C.previousPage(),disabled:!C.getCanPreviousPage(),children:"Previous"}),n.jsx(B,{variant:"outline",size:"sm",onClick:()=>C.nextPage(),disabled:!C.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Wl,{table:C})]})}function ec({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:g("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Za,{options:i,children:e})})}const hs=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),eo=(t,e)=>t[e]??e;function gs({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=eo(r,"%webView_error_dump_header%"),i=eo(r,"%webView_error_dump_info_message%");function a(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>a(),children:n.jsx(_.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const nc=Object.freeze([...hs,"%webView_error_dump_copied_message%"]);function rc({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[a,c]=l.useState(!1),d=()=>{c(!0),e&&e()},w=u=>{u||c(!1)};return n.jsxs(Jt,{onOpenChange:w,children:[n.jsx(oe,{asChild:!0,children:o}),n.jsxs(Ft,{id:i,className:g("tw-min-w-80 tw-max-w-96",s),children:[a&&r["%webView_error_dump_copied_message%"]&&n.jsx(mt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(gs,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var xs=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(xs||{});function oc({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((w,u)=>w.itemType===0?[u,[]]:void 0).filter(w=>!!w))),[i,a]=l.useState({}),c=(w,u)=>{const p=!o[w][u];s(f=>(f[w][u]=p,{...f}));const m=r[w].items[u];m.onUpdate(m.id,p)},d=(w,u)=>{a(m=>(m[w]=u,{...m}));const p=r[w].items.find(m=>m.id===u);p?p.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Xt,{children:[n.jsx(re,{asChild:!0,children:n.jsxs(B,{variant:"default",children:[n.jsx(_.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(_.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(At,{children:r.map((w,u)=>n.jsxs("div",{children:[n.jsx($e,{children:w.label}),n.jsx(xr,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((p,m)=>n.jsx("div",{children:n.jsx(Ht,{checked:o[u][m],onCheckedChange:()=>c(u,m),children:p.label})},p.id))}):n.jsx(is,{value:i[u],onValueChange:p=>d(u,p),children:w.items.map(p=>n.jsx("div",{children:n.jsx(yr,{value:p.id,children:p.label})},p.id))})}),n.jsx(je,{})]},w.label))})]})})}function sc({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:a,handleSupportLinkClick:c}){const d=new k.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,p)=>u+p,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(_.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||a)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(_.Link,{className:"tw-h-4 tw-w-4"})]})}),a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(_.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function ac({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function i(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),u=w.getUTCFullYear()-1970,p=w.getUTCMonth(),m=w.getUTCDate()-1;let f="";return u>0?f=`${u.toString()} year${u===1?"":"s"} ago`:p>0?f=`${p.toString()} month${p===1?"":"s"} ago`:m===0?f="today":f=`${m.toString()} day${m===1?"":"s"} ago`,f}const a=Object.entries(e).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?a:a.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),a.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function ic({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const a=l.useMemo(()=>k.formatBytes(r),[r]),d=(w=>{const u=new Intl.DisplayNames(k.getCurrentLocale(),{type:"language"});return w.map(p=>u.of(p))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(ac,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:a})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function bs({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:a="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:u=void 0,isDisabled:p=!1,sortSelected:m=!1,icon:f=void 0,className:h=void 0,variant:v="ghost",id:b}){const[y,j]=l.useState(!1),C=l.useCallback(S=>{var M;const R=(M=t.find(I=>I.label===S))==null?void 0:M.value;R&&r(e.includes(R)?e.filter(I=>I!==R):[...e,R])},[t,e,r]),N=()=>d||o,$=l.useMemo(()=>{if(!m)return t;const S=t.filter(M=>M.starred).sort((M,I)=>M.label.localeCompare(I.label)),R=t.filter(M=>!M.starred).sort((M,I)=>{const F=e.includes(M.value),H=e.includes(I.value);return F&&!H?-1:!F&&H?1:M.label.localeCompare(I.label)});return[...S,...R]},[t,e,m]),V=()=>{r(t.map(S=>S.value))},L=()=>{r([])},T=w??y,E=u??j;return n.jsx("div",{id:b,className:h,children:n.jsxs(Jt,{open:T,onOpenChange:E,children:[n.jsx(oe,{asChild:!0,children:n.jsxs(B,{variant:v,role:"combobox","aria-expanded":T,className:"tw-group tw-w-full tw-justify-between",disabled:p,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[f&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:f})}),n.jsx("span",{className:g("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:N()})]}),n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Ft,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Wt,{children:[n.jsx(ye,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:V,children:i}),n.jsx(B,{variant:"ghost",size:"sm",onClick:L,children:a})]}),n.jsxs(Zt,{children:[n.jsx(Ae,{children:c}),n.jsx(Lt,{children:$.map(S=>n.jsxs($t,{value:S.label,onSelect:C,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(_.Check,{className:g("tw-h-4 tw-w-4",e.includes(S.value)?"tw-opacity-100":"tw-opacity-0")})}),S.starred&&n.jsx(_.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:S.label}),S.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:S.secondaryLabel})]},S.label))})]})]})})]})})}function lc({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:d,className:w,badgesPlaceholder:u,id:p}){return n.jsxs("div",{id:p,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(bs,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(m=>{var f;return n.jsxs(ce,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(h=>h!==m)),children:n.jsx(_.X,{className:"tw-h-3 tw-w-3"})}),(f=t.find(h=>h.value===m))==null?void 0:f.label]},m)})}):n.jsx(mt,{children:u})]})}const vs=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),no=(t,e)=>t[e]??e;function ys({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:i=!0,className:a="tw-h-6 tw-w-6",variant:c="ghost"}){const d=l.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(B,{"aria-label":"Undo",className:a,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(_.Undo,{})})}),n.jsx(pt,{children:n.jsxs("p",{children:[no(s,"%undoButton_tooltip%"),i&&` (${d?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(B,{"aria-label":"Redo",className:a,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(_.Redo,{})})}),n.jsx(pt,{children:n.jsxs("p",{children:[no(s,"%redoButton_tooltip%"),i&&` (${d?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function js({children:t,editorRef:e}){const r=l.useRef(null);return l.useEffect(()=>{var a;const o=/Macintosh/i.test(navigator.userAgent),s=((a=r.current)==null?void 0:a.querySelector(".editor-input"))??void 0,i=c=>{var w,u,p,m;if(!s||document.activeElement!==s)return;const d=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(w=e.current)==null||w.undo()):c.shiftKey&&d==="z"&&(c.preventDefault(),(u=e.current)==null||u.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(p=e.current)==null||p.undo()):(d==="y"||c.shiftKey&&d==="z")&&(c.preventDefault(),(m=e.current)==null||m.redo())}};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[e]),n.jsx("div",{ref:r,children:t})}const Ne=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:g("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Ne.displayName="Input";const cc=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function dc({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=l.useRef(null),a=l.useRef(null),c=l.useRef(!1),[d,w]=l.useState(t),[u,p]=l.useState(r),[m,f]=l.useState(!1);l.useEffect(()=>{w(t)},[t]),l.useEffect(()=>{u!==r&&p(r)},[r]);const h=b=>{c.current=!1,f(b),b||(d!=="custom"||u?(e(d),o(u)):(w(t),p(r)))},v=b=>{var y,j,C,N;b.stopPropagation(),document.activeElement===a.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((y=i.current)==null||y.focus(),c.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((j=a.current)==null||j.focus(),c.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((C=i.current)==null?void 0:C.selectionStart)===0&&((N=a.current)==null||N.focus(),c.current=!1),d==="custom"&&b.key==="Enter"&&(document.activeElement===a.current||document.activeElement===i.current)&&h(!1)};return n.jsxs(Xt,{open:m,onOpenChange:h,children:[n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(re,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:cc(t,s,r)})})}),n.jsx(pt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(At,{style:{zIndex:Xn},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;c.current&&((b=i.current)==null||b.focus())},children:[n.jsx($e,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(je,{}),n.jsx(Ht,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Mt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Ht,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Mt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Ht,{ref:a,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:b=>{var y;b.stopPropagation(),c.current=!0,(y=i.current)==null||y.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Ne,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),w("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:u,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>p(b.target.value)})]})})]})]})}const wc=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(_.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(_.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(_.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),uc=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),k.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function pc({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Xt,{children:[n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ao.TooltipTrigger,{asChild:!0,children:n.jsx(re,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:wc(t,r)})})}),n.jsx(pt,{children:n.jsx("p",{children:uc(t,r)})})]})}),n.jsxs(At,{style:{zIndex:Xn},children:[n.jsx($e,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(je,{}),n.jsxs(Ht,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(_.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Ht,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(_.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Ht,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(_.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const Ns=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function mc({icon:t,className:e}){const r=t??_.Ban;return n.jsx(r,{className:e,size:16})}function ro({item:t,localizedStrings:e}){return n.jsxs($t,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(mc,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(vo,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function ks({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),[i,a]=l.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const d=e.filter(u=>{var p;return(p=u.marker)==null?void 0:p.toLowerCase().includes(c)}),w=e.filter(u=>u.title.toLowerCase().includes(c)&&!d.includes(u));return[d,w]},[o,e]);return n.jsxs(Wt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(ye,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Zt,{children:[n.jsx(Ae,{children:t["%markerMenu_noResults%"]}),n.jsx(Lt,{children:i.map(c=>{var d;return n.jsx(ro,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})}),a.length>0&&n.jsxs(n.Fragment,{children:[i.length>0&&n.jsx(er,{alwaysRender:!0}),n.jsx(Lt,{children:a.map(c=>{var d;return n.jsx(ro,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function fc(t,e,r,o){if(!o||o==="p")return[];const s=k.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,a])=>{i.push(...a.map(c=>({marker:c,title:r[k.usfmMarkers[c].description]??k.usfmMarkers[c].description,action:()=>{var d;(d=t.current)==null||d.insertMarker(c),e()}})))}),i.sort((a,c)=>(a.marker??a.title).localeCompare(c.marker??c.title))}function hc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function gc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const xc={type:"USJ",version:"3.1",content:[{type:"para"}]};function bc({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:a,defaultMarkerMenuTrigger:c,localizedStrings:d,parentEditorRef:w}){const u=l.useRef(null),p=l.useRef(null),m=l.useRef(null),f=l.useRef(null);l.useLayoutEffect(()=>{if(!f.current)return;const{width:D}=f.current.getBoundingClientRect();D>0&&(f.current.style.width=`${D}px`)},[]);const[h,v]=l.useState("generated"),[b,y]=l.useState("*"),[j,C]=l.useState("f"),[N,$]=l.useState(!1),[V,L]=l.useState(!0),[T,E]=l.useState(!1),S=l.useRef(!1),R=l.useRef(""),[M,I]=l.useState(!1),[F,H]=l.useState(),[A,W]=l.useState(),[yt,K]=l.useState(),[tt,Y]=l.useState(),X=l.useRef(null),G=l.useMemo(()=>({...a,markerMenuTrigger:c,hasExternalUI:!0,view:{...a.view??Mt.getDefaultViewOptions(),noteMode:"expanded"}}),[a,c]),ot=l.useMemo(()=>fc(u,()=>I(!1),d,tt),[d,tt]);l.useEffect(()=>{var D;M||(D=u.current)==null||D.focus()},[j,M]),l.useEffect(()=>{var q,U;let D;S.current=!1,L(!0);const z=e==null?void 0:e.at(0);if(z&&Mt.isInsertEmbedOpOfType("note",z)){const at=(q=z.insert.note)==null?void 0:q.caller;let J="custom";at===Mt.GENERATOR_NOTE_CALLER?J="generated":at===Mt.HIDDEN_NOTE_CALLER?J="hidden":at&&y(at),v(J),C(((U=z.insert.note)==null?void 0:U.style)??"f"),D=setTimeout(()=>{var bt;(bt=u.current)==null||bt.applyUpdate([z])},0)}return()=>{D&&clearTimeout(D)}},[e,i]);const st=l.useCallback((D,z,q=!1)=>{var at,J,bt;const U=(J=(at=u.current)==null?void 0:at.getNoteOps(0))==null?void 0:J.at(0);if(U&&Mt.isInsertEmbedOpOfType("note",U)){if(U.insert.note){let lt;D==="custom"?lt=z:D==="generated"?lt=Mt.GENERATOR_NOTE_CALLER:lt=Mt.HIDDEN_NOTE_CALLER,U.insert.note.caller=lt}r==null||r([U]),q&&w&&i&&((bt=w.current)==null||bt.replaceEmbedUpdate(i,[U]))}},[i,r,w]),it=l.useCallback(()=>{st(h,b,!0),o()},[h,b,o,st]),jt=l.useRef(it);l.useLayoutEffect(()=>{jt.current=it});const te=l.useRef({book:s.book,chapterNum:s.chapterNum});l.useLayoutEffect(()=>{(te.current.book!==s.book||te.current.chapterNum!==s.chapterNum)&&(te.current={book:s.book,chapterNum:s.chapterNum},jt.current())},[s.book,s.chapterNum]);const zt=()=>{var z;const D=(z=p.current)==null?void 0:z.getElementsByClassName("editor-input")[0];D!=null&&D.textContent&&navigator.clipboard.writeText(D.textContent)},Bt=l.useCallback(D=>{v(D),st(D,b)},[b,st]),ke=l.useCallback(D=>{y(D),st(h,D)},[h,st]),ae=D=>{var q,U,at,J,bt;C(D);const z=(U=(q=u.current)==null?void 0:q.getNoteOps(0))==null?void 0:U.at(0);if(z&&Mt.isInsertEmbedOpOfType("note",z)){z.insert.note&&(z.insert.note.style=D);const lt=(J=(at=z.insert.note)==null?void 0:at.contents)==null?void 0:J.ops;j!=="x"&&D==="x"?lt==null||lt.forEach(St=>hc(St)):j==="x"&&D!=="x"&&(lt==null||lt.forEach(St=>gc(St))),(bt=u.current)==null||bt.applyUpdate([z,{delete:1}])}},ee=D=>{Y(D.contextMarker),E(D.canRedo)},Fe=l.useCallback(D=>{var q,U,at,J,bt;const z=(U=(q=u.current)==null?void 0:q.getNoteOps(0))==null?void 0:U.at(0);if(z&&Mt.isInsertEmbedOpOfType("note",z)){D.content.length>1&&setTimeout(()=>{var It;(It=u.current)==null||It.applyUpdate([{retain:2},{delete:1}])},0);const lt=(at=z.insert.note)==null?void 0:at.style,St=(bt=(J=z.insert.note)==null?void 0:J.contents)==null?void 0:bt.ops;if(lt||$(!1),$(lt==="x"?!!(St!=null&&St.every(It=>{var vt,xt;if(!((vt=It.attributes)!=null&&vt.char))return!0;const O=((xt=It.attributes)==null?void 0:xt.char).style;return O==="xt"||O==="xo"||O==="xq"})):!!(St!=null&&St.every(It=>{var vt,xt;if(!((vt=It.attributes)!=null&&vt.char))return!0;const O=((xt=It.attributes)==null?void 0:xt.char).style;return O==="ft"||O==="fr"||O==="fq"}))),!S.current){S.current=!0,R.current=JSON.stringify(z),L(!0);return}L(JSON.stringify(z)===R.current),st(h,b)}else $(!1),L(!0)},[h,b,st]),P=l.useCallback(()=>{const D=window.getSelection();if(m.current&&ot.length&&D&&D.rangeCount>0){const z=D.getRangeAt(0).getBoundingClientRect(),q=m.current.getBoundingClientRect();H(z.left-q.left),W(z.top-q.top),K(z.height),I(!0)}},[ot,m]);return l.useEffect(()=>{const D=()=>{M&&I(!1)};return window.addEventListener("click",D),()=>{window.removeEventListener("click",D)}},[M]),l.useEffect(()=>{var D;M&&((D=X.current)==null||D.focus())},[M]),l.useEffect(()=>{var q;const D=((q=p.current)==null?void 0:q.querySelector(".editor-input"))??void 0,z=U=>{!M&&D&&document.activeElement===D&&U.key===c?(U.preventDefault(),P()):M&&U.key==="Escape"&&(U.preventDefault(),I(!1))};return document.addEventListener("keydown",z),()=>{document.removeEventListener("keydown",z)}},[M,P,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:f,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(pc,{isTypeSwitchable:N,noteType:j,handleNoteTypeChange:ae,localizedStrings:d}),n.jsx(dc,{callerType:h,updateCallerType:Bt,customCaller:b,updateCustomCaller:ke,localizedStrings:d})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(ys,{onUndoClick:()=>{var D;return(D=u.current)==null?void 0:D.undo()},onRedoClick:()=>{var D;return(D=u.current)==null?void 0:D.redo()},canUndo:!V,canRedo:T,localizedStrings:d}),n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(B,{onClick:it,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.Check,{})})}),n.jsx(pt,{children:n.jsx("p",{children:d["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(B,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.X,{})})}),n.jsx(pt,{children:n.jsx("p",{children:d["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:p,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(js,{editorRef:u,children:n.jsx(Mt.Editorial,{options:G,onStateChange:ee,onUsjChange:Fe,defaultUsj:xc,onScrRefChange:()=>{},scrRef:s,ref:u})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx(B,{onClick:zt,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.Copy,{})})}),n.jsx(pt,{children:n.jsx("p",{children:d["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:m,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Jt,{open:M,children:[n.jsx(ko,{className:"tw-absolute",style:{top:A,left:F,height:yt,width:0,pointerEvents:"none"}}),n.jsx(Ft,{className:"tw-w-[500px] tw-p-0",onClick:D=>{D.preventDefault(),D.stopPropagation()},children:n.jsx(ks,{markerMenuItems:ot,localizedStrings:d,searchRef:X})})]})]})}const vc=Object.freeze([...Ns,...Object.entries(k.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...vs]);function _s(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function yc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let a=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(a.length>0&&i.push(a),a=[c]):a.push(c)}),a.length>0&&i.push(a),i.map((c,d)=>{const w=d===i.length-1;return n.jsxs("p",{children:[kr(t,c,r,!0,s),w&&o]},_s(t,c))})}function kr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const a=`${t}-text-${i.slice(0,10)}`;if(o){const c=g(`usfm_${t}`);return n.jsx("span",{className:c,children:i},a)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},a)}return jc(i,_s(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function jc(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(_.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),kr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function Cs({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let a,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([a,...c]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,u=s&&n.jsxs("span",{className:g("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),p=a&&n.jsxs(n.Fragment,{children:[kr(t.marker,[a],o,!1)," "]}),m=e==="horizontal"?"horizontal":"vertical",f=o?"marker-visible":"",h=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=g(m,f);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:g("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[d,u]}),n.jsx("div",{className:g("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:p}),n.jsx("div",{className:g("textual-note-body tw-flex tw-flex-col tw-gap-1",h,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:yc(t.marker,c,o,w)})})]})}function Nc({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:a=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const u=d??k.getFormatCallerFunction(r,void 0),p=(j,C)=>{w==null||w(j,C,s)},m=i?r.findIndex(j=>j===i):-1,[f,h]=l.useState(m),v=(j,C,N)=>{if(r.length)switch(j.key){case"Enter":case" ":j.preventDefault(),w==null||w(C,N,s);break}},b=j=>{if(r.length)switch(j.key){case"ArrowDown":j.preventDefault(),h(C=>Math.min(C+1,r.length-1));break;case"ArrowUp":j.preventDefault(),h(C=>Math.max(C-1,0));break}},y=l.useRef([]);return l.useEffect(()=>{var j;f>=0&&f<y.current.length&&((j=y.current[f])==null||j.focus())},[f]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:f<0?0:-1,className:g("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:g("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((j,C)=>{const N=j===i,$=`${s}-${C}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:V=>{y.current[C]=V},role:"option","aria-selected":N,"data-marker":j.marker,"data-state":N?"selected":void 0,tabIndex:C===f?0:-1,className:g("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>p(j,C),onKeyDown:V=>v(V,j,C),children:n.jsx(Cs,{footnote:j,layout:o,formatCaller:()=>u(j.caller,C),showMarkers:a})},$),C<r.length-1&&o==="vertical"&&n.jsx(Dt,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function kc(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function _c({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],a=l.useMemo(()=>{const c=[],d=new Set;return t.forEach(w=>{const u=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(u)||(d.add(u),c.push(w))}),c},[t]);return n.jsxs(Xe,{stickyHeader:!0,children:[n.jsx(We,{stickyHeader:!0,children:n.jsxs(Ut,{children:[n.jsx(De,{children:s}),n.jsx(De,{children:i})]})}),n.jsx(Ze,{children:a.length>0&&a.map(c=>n.jsxs(Ut,{onClick:()=>{e(c.reference)},children:[n.jsx(le,{children:k.formatScrRef(c.reference,"English")}),n.jsx(le,{className:o,children:kc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const jn=l.forwardRef(({className:t,...e},r)=>n.jsx(Vn.Root,{ref:r,className:g("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Vn.Indicator,{className:g("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}));jn.displayName=Vn.Root.displayName;const Cc=t=>{if(t==="asc")return n.jsx(_.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(_.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Je=(t,e,r)=>n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsxs(ht,{className:g("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),Cc(t.getIsSorted())]}),n.jsx(pt,{side:"bottom",children:e})]})}),Ec=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Je(e,t)}),Sc=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Je(r,t)}),Rc=t=>({accessorKey:"count",header:({column:e})=>Je(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),On=(t,e,r,o,s,i)=>{let a=[...r];t.forEach(d=>{e==="approved"?a.includes(d)||a.push(d):a=a.filter(w=>w!==d)}),o(a);let c=[...s];t.forEach(d=>{e==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),i(c)},Tc=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>Je(i,t,"tw-justify-center"),cell:({row:i})=>{const a=i.getValue("status"),c=i.getValue("item");return n.jsxs(vn,{value:a,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Re,{onClick:d=>{d.stopPropagation(),On([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(_.CircleCheckIcon,{})}),n.jsx(Re,{onClick:d=>{d.stopPropagation(),On([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(_.CircleXIcon,{})}),n.jsx(Re,{onClick:d=>{d.stopPropagation(),On([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(_.CircleHelpIcon,{})})]})}}),Mc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Dc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Ic=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Es=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Oc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Lc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Ac=(t,e,r)=>t.map(o=>{const s=k.isString(o.key)?o.key:o.key[0];return{items:k.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||Es(s,e,r),occurrences:o.occurrences||[]}}),Kt=(t,e)=>t[e]??e;function Pc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:a,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:u=!1,classNameForVerseText:p,onItemSelected:m}){const f=Kt(r,"%webView_inventory_all%"),h=Kt(r,"%webView_inventory_approved%"),v=Kt(r,"%webView_inventory_unapproved%"),b=Kt(r,"%webView_inventory_unknown%"),y=Kt(r,"%webView_inventory_scope_currentBook%"),j=Kt(r,"%webView_inventory_scope_chapter%"),C=Kt(r,"%webView_inventory_scope_verse%"),N=Kt(r,"%webView_inventory_filter_text%"),$=Kt(r,"%webView_inventory_show_additional_items%"),V=Kt(r,"%webView_inventory_no_results%"),[L,T]=l.useState(!1),[E,S]=l.useState("all"),[R,M]=l.useState(""),[I,F]=l.useState([]),H=l.useMemo(()=>{const G=t??[];return G.length===0?[]:Ac(G,s,i)},[t,s,i]),A=l.useMemo(()=>{if(L)return H;const G=[];return H.forEach(ot=>{const st=ot.items[0],it=G.find(jt=>jt.items[0]===st);it?(it.count+=ot.count,it.occurrences=it.occurrences.concat(ot.occurrences)):G.push({items:[st],count:ot.count,occurrences:ot.occurrences,status:ot.status})}),G},[L,H]),W=l.useMemo(()=>A.length===0?[]:Lc(A,E,R),[A,E,R]),yt=l.useMemo(()=>{var st,it;if(!L)return d;const G=(st=o==null?void 0:o.tableHeaders)==null?void 0:st.length;if(!G)return d;const ot=[];for(let jt=0;jt<G;jt++)ot.push(Sc(((it=o==null?void 0:o.tableHeaders)==null?void 0:it[jt])||"Additional Item",jt+1));return[...ot,...d]},[o==null?void 0:o.tableHeaders,d,L]);l.useEffect(()=>{W.length===0?F([]):W.length===1&&F(W[0].items)},[W]);const K=(G,ot)=>{ot.setRowSelection(()=>{const it={};return it[G.index]=!0,it});const st=G.original.items;F(st),m&&st.length>0&&m(st[0])},tt=G=>{if(G==="book"||G==="chapter"||G==="verse")c(G);else throw new Error(`Invalid scope value: ${G}`)},Y=G=>{if(G==="all"||G==="approved"||G==="unapproved"||G==="unknown")S(G);else throw new Error(`Invalid status filter value: ${G}`)},X=l.useMemo(()=>{if(A.length===0||I.length===0)return[];const G=A.filter(ot=>k.deepEqual(L?ot.items:[ot.items[0]],I));if(G.length>1)throw new Error("Selected item is not unique");return G.length===0?[]:G[0].occurrences},[I,L,A]);return n.jsx("div",{id:w,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(xe,{onValueChange:G=>Y(G),defaultValue:E,children:[n.jsx(de,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(be,{placeholder:"Select filter"})}),n.jsxs(we,{children:[n.jsx(Rt,{value:"all",children:f}),n.jsx(Rt,{value:"approved",children:h}),n.jsx(Rt,{value:"unapproved",children:v}),n.jsx(Rt,{value:"unknown",children:b})]})]}),n.jsxs(xe,{onValueChange:G=>tt(G),defaultValue:a,children:[n.jsx(de,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(be,{placeholder:"Select scope"})}),n.jsxs(we,{children:[n.jsx(Rt,{value:"book",children:y}),n.jsx(Rt,{value:"chapter",children:j}),n.jsx(Rt,{value:"verse",children:C})]})]}),n.jsx(Ne,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:N,value:R,onChange:G=>{M(G.target.value)}}),o&&n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(jn,{className:"tw-m-1 tw-flex-shrink-0",checked:L,onCheckedChange:G=>{T(G)}}),n.jsx(mt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??$})]})}),n.jsx(pt,{children:(o==null?void 0:o.checkboxText)??$})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(fs,{columns:yt,data:W,onRowClickHandler:K,stickyHeader:!0,isLoading:u,noResultsMessage:V})}),X.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(_c,{classNameForText:p,occurrenceData:X,setScriptureReference:e,localizedStrings:r})})]})})}const $c="16rem",Fc="3rem",Ss=l.createContext(void 0);function Qe(){const t=l.useContext(Ss);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const _r=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:a="primary",...c},d)=>{const[w,u]=l.useState(t),p=e??w,m=l.useCallback(C=>{const N=typeof C=="function"?C(p):C;r?r(N):u(N)},[r,p]),f=l.useCallback(()=>m(C=>!C),[m]),h=p?"expanded":"collapsed",y=wt()==="ltr"?a:a==="primary"?"secondary":"primary",j=l.useMemo(()=>({state:h,open:p,setOpen:m,toggleSidebar:f,side:y}),[h,p,m,f,y]);return n.jsx(Ss.Provider,{value:j,children:n.jsx(ut,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":$c,"--sidebar-width-icon":Fc,...s},className:g("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:i})})})});_r.displayName="SidebarProvider";const Cr=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},i)=>{const a=Qe();return e==="none"?n.jsx("div",{className:g("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":a.state,"data-collapsible":a.state==="collapsed"?e:"","data-variant":t,"data-side":a.side,children:[n.jsx("div",{className:g("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:g("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",a.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});Cr.displayName="Sidebar";const Rs=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Qe();return n.jsxs(B,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:g("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(_.PanelLeft,{}):n.jsx(_.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Rs.displayName="SidebarTrigger";const Ts=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Qe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:g("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});Ts.displayName="SidebarRail";const Er=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:g("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));Er.displayName="SidebarInset";const Ms=l.forwardRef(({className:t,...e},r)=>n.jsx(Ne,{ref:r,"data-sidebar":"input",className:g("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));Ms.displayName="SidebarInput";const Ds=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:g("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Ds.displayName="SidebarHeader";const Is=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:g("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Is.displayName="SidebarFooter";const Os=l.forwardRef(({className:t,...e},r)=>n.jsx(Dt,{ref:r,"data-sidebar":"separator",className:g("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Os.displayName="SidebarSeparator";const Sr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:g("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));Sr.displayName="SidebarContent";const un=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:g("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));un.displayName="SidebarGroup";const pn=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Oe.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:g("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});pn.displayName="SidebarGroupLabel";const Ls=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Oe.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:g("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Ls.displayName="SidebarGroupAction";const mn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:g("tw-w-full tw-text-sm",t),...e}));mn.displayName="SidebarGroupContent";const Rr=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:g("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));Rr.displayName="SidebarMenu";const Tr=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:g("tw-group/menu-item tw-relative",t),...e}));Tr.displayName="SidebarMenuItem";const Vc=ue.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Mr=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,...a},c)=>{const d=t?Oe.Slot:"button",{state:w}=Qe(),u=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:g(Vc({variant:r,size:o}),i),...a});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:u}),n.jsx(pt,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):u});Mr.displayName="SidebarMenuButton";const As=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const i=e?Oe.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:g("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});As.displayName="SidebarMenuAction";const Ps=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:g("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ps.displayName="SidebarMenuBadge";const $s=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:g("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(Ie,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(Ie,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});$s.displayName="SidebarMenuSkeleton";const Fs=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:g("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Fs.displayName="SidebarMenuSub";const Vs=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Vs.displayName="SidebarMenuSubItem";const zs=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},i)=>{const a=t?Oe.Slot:"a";return n.jsx(a,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:g("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});zs.displayName="SidebarMenuSubButton";function Bs({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:a,buttonPlaceholderText:c,className:d}){const w=l.useCallback((m,f)=>{o(m,f)},[o]),u=l.useCallback(m=>{const f=r.find(h=>h.projectId===m);return f?f.projectName:m},[r]),p=l.useCallback(m=>!s.projectId&&m===s.label,[s]);return n.jsx(Cr,{id:t,collapsible:"none",variant:"inset",className:g("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(Sr,{children:[n.jsxs(un,{children:[n.jsx(pn,{className:"tw-text-sm",children:i}),n.jsx(mn,{children:n.jsx(Rr,{children:Object.entries(e).map(([m,f])=>n.jsx(Tr,{children:n.jsx(Mr,{onClick:()=>w(m),isActive:p(m),children:n.jsx("span",{className:"tw-pl-3",children:f})})},m))})})]}),n.jsxs(un,{children:[n.jsx(pn,{className:"tw-text-sm",children:a}),n.jsx(mn,{className:"tw-pl-3",children:n.jsx(sn,{buttonVariant:"ghost",buttonClassName:g("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:mo},options:r.flatMap(m=>m.projectId),getOptionLabel:u,buttonPlaceholder:c,onChange:m=>{const f=u(m);w(f,m)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(_.ScrollText,{})})})]})]})})}const Nn=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:a},c)=>{const d=wt();return n.jsxs("div",{id:a,className:g("tw-relative",{"tw-w-full":o},s),children:[n.jsx(_.Search,{className:g("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(Ne,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:i}),t&&n.jsxs(B,{variant:"ghost",size:"icon",className:g("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Nn.displayName="SearchBar";function zc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:a,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Nn,{className:"tw-w-9/12",value:a,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(_r,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Bs,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:u}),n.jsx(Er,{className:"tw-min-w-[215px]",children:o})]})]})}const ie="scrBook",Bc="scrRef",fe="source",Kc="details",Gc="Scripture Reference",qc="Scripture Book",Ks="Type",Uc="Details";function Hc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:ie,header:(t==null?void 0:t.scriptureReferenceColumnName)??Gc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?dt.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===ie?k.formatScrRef(s.start):void 0},getGroupingValue:o=>dt.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>k.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>k.formatScrRef(o.start),id:Bc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:k.formatScrRef(s.start)},sortingFn:(o,s)=>k.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:fe,header:r?(t==null?void 0:t.typeColumnName)??Ks:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Kc,header:(t==null?void 0:t.detailsColumnName)??Uc,cell:o=>o.getValue(),enableGrouping:!1}]}const Yc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||k.compareScrRefs(t.start,t.end)===0?`${k.scrRefToBBBCCCVVV(t.start)}+${e}`:`${k.scrRefToBBBCCCVVV(t.start)}+${e}-${k.scrRefToBBBCCCVVV(t.end)}+${r}`},oo=t=>`${Yc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Xc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:a,onRowSelected:c,id:d}){const[w,u]=l.useState([]),[p,m]=l.useState([{id:ie,desc:!1}]),[f,h]=l.useState({}),v=l.useMemo(()=>t.flatMap(E=>E.data.map(S=>({...S,source:E.source}))),[t]),b=l.useMemo(()=>Hc({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:a},r),[o,i,a,r]);l.useEffect(()=>{w.includes(fe)?m([{id:fe,desc:!1},{id:ie,desc:!1}]):m([{id:ie,desc:!1}])},[w]);const y=_t.useReactTable({data:v,columns:b,state:{grouping:w,sorting:p,rowSelection:f},onGroupingChange:u,onSortingChange:m,onRowSelectionChange:h,getExpandedRowModel:_t.getExpandedRowModel(),getGroupedRowModel:_t.getGroupedRowModel(),getCoreRowModel:_t.getCoreRowModel(),getSortedRowModel:_t.getSortedRowModel(),getRowId:oo,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const E=y.getSelectedRowModel().rowsById,S=Object.keys(E);if(S.length===1){const R=v.find(M=>oo(M)===S[0])||void 0;R&&c(R)}}},[f,v,c,y]);const j=s??qc,C=i??Ks,N=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[ie]},{label:`Group by ${C}`,value:[fe]},{label:`Group by ${j} and ${C}`,value:[ie,fe]},{label:`Group by ${C} and ${j}`,value:[fe,ie]}],$=E=>{u(JSON.parse(E))},V=(E,S)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(S)},L=(E,S)=>E.getIsGrouped()?"":g("banded-row",S%2===0?"even":"odd"),T=(E,S,R)=>{if(!((E==null?void 0:E.length)===0||S.depth<R.column.getGroupedIndex())){if(S.getIsGrouped())switch(S.depth){case 1:return"tw-ps-4";default:return}switch(S.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(xe,{value:JSON.stringify(w),onValueChange:E=>{$(E)},children:[n.jsx(de,{className:"tw-mb-1 tw-mt-2",children:n.jsx(be,{})}),n.jsx(we,{position:"item-aligned",children:n.jsx(cs,{children:N.map(E=>n.jsx(Rt,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),n.jsxs(Xe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(We,{children:y.getHeaderGroups().map(E=>n.jsx(Ut,{children:E.headers.filter(S=>S.column.columnDef.header).map(S=>n.jsx(De,{colSpan:S.colSpan,className:"top-0 tw-sticky",children:S.isPlaceholder?void 0:n.jsxs("div",{children:[S.column.getCanGroup()?n.jsx(B,{variant:"ghost",title:`Toggle grouping by ${S.column.columnDef.header}`,onClick:S.column.getToggleGroupingHandler(),type:"button",children:S.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",_t.flexRender(S.column.columnDef.header,S.getContext())]})},S.id))},E.id))}),n.jsx(Ze,{children:y.getRowModel().rows.map((E,S)=>{const R=wt();return n.jsx(Ut,{"data-state":E.getIsSelected()?"selected":"",className:g(L(E,S)),onClick:M=>V(E,M),children:E.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==fe||!r)))return n.jsx(le,{className:g(M.column.columnDef.id,"tw-p-[1px]",T(w,E,M)),children:M.getIsGrouped()?n.jsxs(B,{variant:"link",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()&&n.jsx(_.ChevronDown,{}),!E.getIsExpanded()&&(R==="ltr"?n.jsx(_.ChevronRight,{}):n.jsx(_.ChevronLeft,{}))," ",_t.flexRender(M.column.columnDef.cell,M.getContext())," (",E.subRows.length,")"]}):_t.flexRender(M.column.columnDef.cell,M.getContext())},M.id)})},E.id)})})]})]})}const Dr=(t,e)=>t.filter(r=>{try{return k.getSectionForBook(r)===e}catch{return!1}}),Gs=(t,e,r)=>Dr(t,e).every(o=>r.includes(o));function Wc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=Dr(e,t).length===0,a=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(B,{variant:"outline",size:"sm",onClick:()=>o(t),className:g(Gs(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:wi(t,a,c,d,w)})}const so=5,Ln=6;function Zc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],a=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],p=o["%webView_book_selector_more%"],{otLong:m,ntLong:f,dcLong:h,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,y]=l.useState(!1),[j,C]=l.useState(""),N=l.useRef(void 0),$=l.useRef(!1);if(t.length!==dt.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const V=l.useMemo(()=>dt.Canon.allBookIds.filter((F,H)=>t[H]==="1"&&!dt.Canon.isObsolete(dt.Canon.bookIdToNumber(F))),[t]),L=l.useMemo(()=>{if(!j.trim()){const A={[k.Section.OT]:[],[k.Section.NT]:[],[k.Section.DC]:[],[k.Section.Extra]:[]};return V.forEach(W=>{const yt=k.getSectionForBook(W);A[yt].push(W)}),A}const F=V.filter(A=>rr(A,j,s)),H={[k.Section.OT]:[],[k.Section.NT]:[],[k.Section.DC]:[],[k.Section.Extra]:[]};return F.forEach(A=>{const W=k.getSectionForBook(A);H[W].push(A)}),H},[V,j,s]),T=l.useCallback((F,H=!1)=>{if(!H||!N.current){r(e.includes(F)?e.filter(Y=>Y!==F):[...e,F]),N.current=F;return}const A=V.findIndex(Y=>Y===N.current),W=V.findIndex(Y=>Y===F);if(A===-1||W===-1)return;const[yt,K]=[Math.min(A,W),Math.max(A,W)],tt=V.slice(yt,K+1).map(Y=>Y);r(e.includes(F)?e.filter(Y=>!tt.includes(Y)):[...new Set([...e,...tt])])},[e,r,V]),E=F=>{T(F,$.current),$.current=!1},S=(F,H)=>{F.preventDefault(),T(H,F.shiftKey)},R=l.useCallback(F=>{const H=Dr(V,F).map(A=>A);r(Gs(V,F,e)?e.filter(A=>!H.includes(A)):[...new Set([...e,...H])])},[e,r,V]),M=()=>{r(V.map(F=>F))},I=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(k.Section).map(F=>n.jsx(Wc,{section:F,availableBookIds:V,selectedBookIds:e,onToggle:R,localizedStrings:o},F))}),n.jsxs(Jt,{open:b,onOpenChange:F=>{y(F),F||C("")},children:[n.jsx(oe,{asChild:!0,children:n.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:a,n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Ft,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Wt,{shouldFilter:!1,onKeyDown:F=>{F.key==="Enter"&&($.current=F.shiftKey)},children:[n.jsx(ye,{placeholder:c,value:j,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:M,children:d}),n.jsx(B,{variant:"ghost",size:"sm",onClick:I,children:w})]}),n.jsxs(Zt,{children:[n.jsx(Ae,{children:u}),Object.values(k.Section).map((F,H)=>{const A=L[F];if(A.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Lt,{heading:yo(F,m,f,h,v),children:A.map(W=>n.jsx(No,{bookId:W,isSelected:e.includes(W),onSelect:()=>E(W),onMouseDown:yt=>S(yt,W),section:k.getSectionForBook(W),showCheck:!0,localizedBookNames:s,commandValue:Kn(W,s),className:"tw-flex tw-items-center"},W))}),H<Object.values(k.Section).length-1&&n.jsx(er,{})]},F)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Ln?Ln:so).map(F=>n.jsx(ce,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ee(F,s)},F)),e.length>Ln&&n.jsx(ce,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-so} ${p}`})]})]})}const Jc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),pe=(t,e)=>t[e]??e;function Qc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:a,localizedBookNames:c,id:d}){const w=pe(a,"%webView_scope_selector_selected_text%"),u=pe(a,"%webView_scope_selector_current_verse%"),p=pe(a,"%webView_scope_selector_current_chapter%"),m=pe(a,"%webView_scope_selector_current_book%"),f=pe(a,"%webView_scope_selector_choose_books%"),h=pe(a,"%webView_scope_selector_scope%"),v=pe(a,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:u,id:"scope-verse"},{value:"chapter",label:p,id:"scope-chapter"},{value:"book",label:m,id:"scope-book"},{value:"selectedBooks",label:f,id:"scope-selected"}],y=e?b.filter(j=>e.includes(j.value)):b;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(mt,{children:h}),n.jsx(xn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:y.map(({value:j,label:C,id:N})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(qe,{className:"tw-me-2",value:j,id:N}),n.jsx(mt,{htmlFor:N,children:C})]},N))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(mt,{children:v}),n.jsx(Zc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:a,localizedBookNames:c})]})]})}const An={[k.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[k.getLocalizeKeyForScrollGroupId(0)]:"A",[k.getLocalizeKeyForScrollGroupId(1)]:"B",[k.getLocalizeKeyForScrollGroupId(2)]:"C",[k.getLocalizeKeyForScrollGroupId(3)]:"D",[k.getLocalizeKeyForScrollGroupId(4)]:"E",[k.getLocalizeKeyForScrollGroupId(5)]:"F",[k.getLocalizeKeyForScrollGroupId(6)]:"G",[k.getLocalizeKeyForScrollGroupId(7)]:"H",[k.getLocalizeKeyForScrollGroupId(8)]:"I",[k.getLocalizeKeyForScrollGroupId(9)]:"J",[k.getLocalizeKeyForScrollGroupId(10)]:"K",[k.getLocalizeKeyForScrollGroupId(11)]:"L",[k.getLocalizeKeyForScrollGroupId(12)]:"M",[k.getLocalizeKeyForScrollGroupId(13)]:"N",[k.getLocalizeKeyForScrollGroupId(14)]:"O",[k.getLocalizeKeyForScrollGroupId(15)]:"P",[k.getLocalizeKeyForScrollGroupId(16)]:"Q",[k.getLocalizeKeyForScrollGroupId(17)]:"R",[k.getLocalizeKeyForScrollGroupId(18)]:"S",[k.getLocalizeKeyForScrollGroupId(19)]:"T",[k.getLocalizeKeyForScrollGroupId(20)]:"U",[k.getLocalizeKeyForScrollGroupId(21)]:"V",[k.getLocalizeKeyForScrollGroupId(22)]:"W",[k.getLocalizeKeyForScrollGroupId(23)]:"X",[k.getLocalizeKeyForScrollGroupId(24)]:"Y",[k.getLocalizeKeyForScrollGroupId(25)]:"Z"};function td({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:a}){const c={...An,...Object.fromEntries(Object.entries(o).map(([w,u])=>[w,w===u&&w in An?An[w]:u]))},d=wt();return n.jsxs(xe,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(de,{size:s,className:g("pr-twp tw-w-auto",i),children:n.jsx(be,{placeholder:c[k.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(we,{id:a,align:d==="rtl"?"end":"start",style:{zIndex:ve},children:t.map(w=>n.jsx(Rt,{value:`${w}`,children:c[k.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function ed({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function nd({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function rd({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(Dt,{}):""]})}function qs(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function fn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:g("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Us=(t,e,r,o)=>r?Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order).flatMap(([i])=>e.filter(c=>c.group===i).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:"command"in c?n.jsxs(He,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(fn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(fn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(as,{children:[n.jsx(br,{children:c.label}),n.jsx(ss,{children:n.jsx(vr,{children:Us(t,e,qs(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(pt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function hn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:a="ghost",id:c}){return n.jsxs(Xt,{variant:i,children:[n.jsx(re,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(B,{variant:a,size:"icon",children:o??n.jsx(_.MenuIcon,{})})}),n.jsx(At,{align:"start",style:{zIndex:ve},children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,u)=>n.jsxs(l.Fragment,{children:[n.jsx(xr,{children:n.jsx(ut,{children:Us(e.groups,e.items,d,t)})}),w<u.length-1&&n.jsx(je,{})]},d))})]})}const Hs=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function od({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:a,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(Hs,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(hn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(_.Menu,{}),buttonVariant:"ghost"}),a&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:a}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(hn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(_.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function sd({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Hs,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(hn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Ir=l.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(Et.Root,{orientation:"vertical",ref:r,className:g("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Ir.displayName=Et.List.displayName;const Or=l.forwardRef(({className:t,...e},r)=>n.jsx(Et.List,{ref:r,className:g("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Or.displayName=Et.List.displayName;const Ys=l.forwardRef(({className:t,...e},r)=>n.jsx(Et.Trigger,{ref:r,...e,className:g("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Lr=l.forwardRef(({className:t,...e},r)=>n.jsx(Et.Content,{ref:r,className:g("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Lr.displayName=Et.Content.displayName;function ad({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:a}){return n.jsxs("div",{id:a,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(Nn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Ir,{children:[n.jsx(Or,{children:t.map(c=>n.jsx(Ys,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(Lr,{value:c.value,children:c.content},c.key))]})]})}function id({...t}){return n.jsx(nt.Menu,{...t})}function ld({...t}){return n.jsx(nt.Sub,{"data-slot":"menubar-sub",...t})}const Xs=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(gr.Provider,{value:s,children:n.jsx(nt.Root,{ref:o,className:g("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Xs.displayName=nt.Root.displayName;const Ws=l.forwardRef(({className:t,...e},r)=>{const o=Vt();return n.jsx(nt.Trigger,{ref:r,className:g("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",se({variant:o.variant,className:t})),...e})});Ws.displayName=nt.Trigger.displayName;const Zs=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=Vt();return n.jsxs(nt.SubTrigger,{ref:s,className:g("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",se({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Zs.displayName=nt.SubTrigger.displayName;const Js=l.forwardRef(({className:t,...e},r)=>{const o=Vt();return n.jsx(nt.SubContent,{ref:r,className:g("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Js.displayName=nt.SubContent.displayName;const Qs=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const a=Vt();return n.jsx(nt.Portal,{children:n.jsx(nt.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:g("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":a.variant==="muted"},t),...s})})});Qs.displayName=nt.Content.displayName;const ta=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=Vt();return n.jsx(nt.Item,{ref:o,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",se({variant:s.variant,className:t}),t),...r})});ta.displayName=nt.Item.displayName;const cd=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=Vt();return n.jsxs(nt.CheckboxItem,{ref:s,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",se({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(nt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});cd.displayName=nt.CheckboxItem.displayName;const dd=l.forwardRef(({className:t,children:e,...r},o)=>{const s=Vt();return n.jsxs(nt.RadioItem,{ref:o,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",se({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(nt.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});dd.displayName=nt.RadioItem.displayName;const wd=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(nt.Label,{ref:o,className:g("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));wd.displayName=nt.Label.displayName;const ea=l.forwardRef(({className:t,...e},r)=>n.jsx(nt.Separator,{ref:r,className:g("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ea.displayName=nt.Separator.displayName;const ze=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},na=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order);return s.flatMap(([i],a)=>{const c=e.filter(w=>w.group===i).sort((w,u)=>w.order-u.order).map(w=>n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:"command"in w?n.jsxs(ta,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(fn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(fn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(ld,{children:[n.jsx(Zs,{children:w.label}),n.jsx(Js,{children:na(t,e,qs(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(pt,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&a<s.length-1&&d.push(n.jsx(ea,{},`separator-${i}`)),d})};function ud({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),i=l.useRef(void 0),a=l.useRef(void 0),c=l.useRef(void 0),d=l.useRef(void 0),w=u=>{switch(u){case"platform.app":return i;case"platform.window":return a;case"platform.layout":return c;case"platform.help":return d;default:return}};if(ei.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,p)=>{var h,v,b,y;u.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},f={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(p.hotkey){case"alt":ze(i,[m]);break;case"alt+p":(h=i.current)==null||h.focus(),ze(i,[m,f]);break;case"alt+l":(v=a.current)==null||v.focus(),ze(a,[m,f]);break;case"alt+n":(b=c.current)==null||b.focus(),ze(c,[m,f]);break;case"alt+h":(y=d.current)==null||y.focus(),ze(d,[m,f]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const u=new MutationObserver(f=>{f.forEach(h=>{if(h.attributeName==="data-state"&&h.target instanceof HTMLElement){const v=h.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(f=>{u.observe(f,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(Xs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,p])=>typeof u=="boolean"||typeof p=="boolean"?0:u.order-p.order).map(([u,p])=>n.jsxs(id,{children:[n.jsx(Ws,{ref:w(u),children:typeof p=="object"&&"label"in p&&p.label}),n.jsx(Qs,{style:{zIndex:ve},children:n.jsx(ut,{children:na(t.groups,t.items,u,e)})})]},u))})}function pd(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function md({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:a,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const u=l.useRef(void 0);return n.jsx("div",{className:g("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[a,t&&n.jsx(ud,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const fd=(t,e)=>t[e]??e;function hd({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:a,className:c,id:d}){const w=fd(a,"%settings_uiLanguageSelector_fallbackLanguages%"),[u,p]=l.useState(!1),m=h=>{s&&s(h),o&&o([h,...r.filter(v=>v!==h)]),i&&r.find(v=>v===h)&&i([...r.filter(v=>v!==h)]),p(!1)},f=(h,v)=>{var y,j,C,N,$,V;const b=v!==h?((j=(y=t[h])==null?void 0:y.uiNames)==null?void 0:j[v])??((N=(C=t[h])==null?void 0:C.uiNames)==null?void 0:N.en):void 0;return b?`${($=t[h])==null?void 0:$.autonym} (${b})`:(V=t[h])==null?void 0:V.autonym};return n.jsxs("div",{id:d,className:g("pr-twp tw-max-w-sm",c),children:[n.jsxs(xe,{name:"uiLanguage",value:e,onValueChange:m,open:u,onOpenChange:h=>p(h),children:[n.jsx(de,{children:n.jsx(be,{})}),n.jsx(we,{style:{zIndex:ve},children:Object.keys(t).map(h=>n.jsx(Rt,{value:h,children:f(h,e)},h))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(mt,{className:"tw-font-normal tw-text-muted-foreground",children:k.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(h=>f(h,e)).join(", "):t.en.autonym})})})]})}function kn({items:t,renderItem:e,renderDetailContent:r,onItemClick:o,selectedItemId:s,emptyStateMessage:i="No items found",isLoading:a=!1,variant:c="text",showSourceLanguage:d=!1,showTransliteration:w=!1,onCharacterPress:u,className:p}){const[m,f]=l.useState(),h=l.useRef(null),v=s??m,b=l.useMemo(()=>m?t.find(R=>R.id===m):void 0,[m,t]),y=l.useMemo(()=>t.map(R=>({id:R.id})),[t]),j=R=>{o==null||o(R),r&&f(R.id===m?void 0:R.id)},C=R=>{const M=t.find(I=>I.id===R.id);M&&j(M)},{listboxRef:N,activeId:$,handleKeyDown:V,focusOption:L}=yn({options:y,onOptionSelect:C,onCharacterPress:u}),T=()=>{const R=m;f(void 0),R&&requestAnimationFrame(()=>{var M;L(R),(M=N.current)==null||M.focus()})},E=l.useRef(null);if(l.useEffect(()=>{if(!b)return;const R=E.current;if(!R)return;const M=I=>{I.key==="Escape"&&(I.preventDefault(),T())};return R.addEventListener("keydown",M),()=>R.removeEventListener("keydown",M)},[b]),a)return n.jsx("div",{className:g("tw-flex tw-flex-col tw-gap-2 tw-p-2",p),children:Array.from({length:6},(R,M)=>n.jsx(Ie,{className:g("tw-h-12 tw-w-full tw-rounded",{"tw-h-20":c==="thumbnail"})},M))});if(t.length===0)return n.jsx("div",{className:g("tw-flex tw-items-center tw-justify-center tw-p-8 tw-text-sm tw-text-muted-foreground",p),children:i});const S=n.jsx("ul",{role:"listbox",tabIndex:0,ref:N,"aria-activedescendant":$??void 0,className:"tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",onKeyDown:V,children:t.map(R=>{const M=v===R.id;return n.jsx("li",{id:R.id,role:"option","aria-selected":M,tabIndex:-1,onClick:()=>j(R),onKeyDown:I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),j(R))},className:g("tw-flex tw-cursor-pointer tw-items-center tw-gap-3 tw-p-2 tw-outline-none",{"tw-bg-muted":M,"hover:tw-bg-muted":!M}),children:e?e(R):n.jsx(gd,{item:R,variant:c,showSourceLanguage:d,showTransliteration:w})},R.id)})});return n.jsxs("div",{ref:h,className:g("tw-relative tw-h-full tw-overflow-hidden",p),children:[n.jsx("div",{className:"tw-h-full tw-overflow-y-auto",children:S}),r&&b&&n.jsx("div",{ref:E,role:"region","aria-label":"Selected item details",className:"tw-absolute tw-inset-y-0 tw-right-0 tw-z-10 tw-flex tw-w-4/5 tw-flex-col tw-overflow-hidden tw-border-l tw-bg-background tw-shadow-xl",children:n.jsx("div",{className:"tw-h-full tw-overflow-y-auto tw-p-4",children:r(b,T)})})]})}function gd({item:t,variant:e,showSourceLanguage:r,showTransliteration:o}){return n.jsxs(n.Fragment,{children:[e==="thumbnail"&&t.thumbnailUrl&&n.jsx("img",{src:t.thumbnailUrl,alt:t.thumbnailAlt??t.primaryText,className:"tw-h-14 tw-w-14 tw-shrink-0 tw-rounded tw-object-cover"}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-baseline tw-gap-4 tw-overflow-hidden",children:[n.jsx("span",{className:"tw-shrink-0 tw-truncate tw-text-sm",children:t.primaryText}),r&&t.sourceLanguageText&&n.jsxs("span",{className:"tw-truncate tw-text-sm tw-text-muted-foreground",children:[t.sourceLanguageText,o&&t.transliteration&&n.jsxs("span",{className:"tw-ml-1",children:["(",t.transliteration,")"]})]})]}),n.jsx(Dt,{className:"tw-absolute tw-bottom-0 tw-left-0 tw-right-0"})]})}const xd=["%sourceLanguageIndexedList_emptyState%","%sourceLanguageIndexedList_loading%","%sourceLanguageIndexedList_occurrenceCount%","%sourceLanguageIndexedList_strongsCode%","%sourceLanguageIndexedList_filterByDomain%","%sourceLanguageIndexedList_navigationModeTree%","%sourceLanguageIndexedList_navigationModeDropdown%","%sourceLanguageIndexedList_backToList%"];function bd({getDescription:t,getBadges:e,getOccurrenceCount:r,showSourceLanguage:o=!0,showTransliteration:s=!0,...i}){return n.jsx(kn,{...i,showSourceLanguage:o,showTransliteration:s,renderItem:a=>n.jsx(vd,{item:a,showSourceLanguage:o,showTransliteration:s,description:t==null?void 0:t(a),badges:e==null?void 0:e(a),occurrenceCount:r==null?void 0:r(a)})})}function vd({item:t,showSourceLanguage:e,showTransliteration:r,description:o,badges:s,occurrenceCount:i}){return n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-0.5",children:[n.jsxs("div",{className:"tw-flex tw-items-baseline tw-gap-2",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:t.primaryText}),e&&t.sourceLanguageText&&n.jsxs("span",{className:"tw-text-sm tw-text-muted-foreground",children:[t.sourceLanguageText,r&&t.transliteration&&n.jsxs("span",{className:"tw-ml-1",children:["(",t.transliteration,")"]})]}),i!==void 0&&n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx("span",{className:"tw-ml-1 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs",children:i})}),n.jsx(pt,{children:n.jsx("p",{children:"Occurrences"})})]})})]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2 tw-overflow-hidden",children:[o&&n.jsx("p",{className:"tw-truncate tw-text-sm tw-text-muted-foreground",children:o}),s==null?void 0:s.map(a=>n.jsx("span",{className:g("tw-shrink-0 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs"),children:a},a))]}),n.jsx(Dt,{className:"tw-mt-1"})]})}function ra({className:t,...e}){return n.jsx(Yn.PanelGroup,{className:g("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Hn=Yn.Panel;function oa({withHandle:t,className:e,...r}){return n.jsx(Yn.PanelResizeHandle,{className:g("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(_.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}const yd=100,jd=150;function Nd({items:t,renderItem:e,renderDetailContent:r,onItemClick:o,selectedItemId:s,emptyStateMessage:i,isLoading:a,domainPath:c,allDomains:d,onDomainChange:w,onClose:u,className:p}){const[m,f]=l.useState(s),[h,v]=l.useState(-1),b=l.useRef(null),y=l.useRef(null),[j,C]=l.useState(!1),[N,$]=l.useState(0);l.useEffect(()=>{const K=b.current;if(!K)return;const tt=new ResizeObserver(([Y])=>{const X=(Y==null?void 0:Y.contentRect.width)??0;$(X),C(X<350)});return tt.observe(K),()=>tt.disconnect()},[]);const V=N>0?yd/N*100:20,L=N>0?jd/N*100:30;l.useEffect(()=>{var K;(K=y.current)==null||K.focus()},[]);const T=l.useCallback(K=>{w(K),f(void 0)},[w]),E=t.find(K=>K.id===m),S=E&&!j,R=E&&j,M=l.useCallback(K=>{o==null||o(K),f(K.id===m?void 0:K.id)},[o,m]),I=l.useCallback(K=>{if(t.length===0)return;const tt=m?t.findIndex(X=>X.id===m):-1,Y=h>=0?h:tt;if(K.key==="ArrowDown"){K.preventDefault();const X=Y<0?0:Math.min(Y+1,t.length-1);if(X===h)return;v(X),j||M(t[X])}else if(K.key==="ArrowUp"){K.preventDefault();const X=Y<0?t.length-1:Math.max(Y-1,0);if(X===h)return;v(X),j||M(t[X])}else(K.key==="Enter"||K.key===" ")&&j&&h>=0&&(K.preventDefault(),M(t[h]))},[t,h,j,M,m]),F=l.useCallback(()=>{const K=m;if(f(void 0),K){const tt=t.findIndex(Y=>Y.id===K);tt>=0&&v(tt),requestAnimationFrame(()=>{var Y;(Y=y.current)==null||Y.focus()})}},[t,m]);l.useEffect(()=>{if(h<0||!y.current)return;const K=y.current.children[h];K instanceof HTMLElement&&K.scrollIntoView({block:"nearest"})},[h]);const H=l.useRef(null);l.useEffect(()=>{var tt;if(!j||!m)return;const K=(tt=H.current)==null?void 0:tt.querySelector("[data-back-to-list]");K==null||K.focus()},[j,m]);const A=!!S;l.useEffect(()=>{var K;A&&((K=y.current)==null||K.focus())},[A]);const yt=a?n.jsx("div",{className:"tw-p-4 tw-text-sm tw-text-muted-foreground",children:"Loading..."}):t.length===0?n.jsx("div",{className:"tw-p-4 tw-text-sm tw-text-muted-foreground",children:i??"No items found"}):n.jsx("ul",{ref:y,role:"listbox",tabIndex:0,className:"tw-p-0.5 tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-inset focus-visible:tw-ring-ring",onKeyDown:I,children:t.map((K,tt)=>{const Y=m===K.id,X=h===tt;return n.jsx("li",{role:"option","aria-selected":Y,onClick:()=>{v(-1),M(K)},className:g("tw-cursor-pointer tw-border-b tw-p-2",{"tw-bg-muted":Y,"hover:tw-bg-muted":!Y,"tw-ring-1 tw-ring-inset tw-ring-ring":X&&!Y}),children:e?e(K):n.jsx("span",{className:"tw-text-sm",children:K.primaryText})},K.id)})});return n.jsxs("div",{className:g("tw-flex tw-h-full tw-flex-col tw-overflow-hidden",p),children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:n.jsx(_d,{path:c,allDomains:d,onDomainSelect:T})}),u&&n.jsxs(B,{variant:"ghost",size:"sm",className:"tw-shrink-0 tw-gap-1",onClick:u,children:[n.jsx(_.ArrowUp,{className:"tw-h-4 tw-w-4"}),"Back"]})]}),n.jsx("div",{ref:b,className:"tw-relative tw-flex tw-flex-1 tw-overflow-hidden",children:kd({showSideBySide:!!S,showFullDetail:!!R,listElement:yt,detailElement:E&&r?r(E,F):void 0,listMinPct:V,detailMinPct:L,detailPanelRef:H})})]})}function kd({showSideBySide:t,showFullDetail:e,listElement:r,detailElement:o,listMinPct:s,detailMinPct:i,detailPanelRef:a}){return t&&o!==void 0?n.jsxs(ra,{direction:"horizontal",children:[n.jsx(Hn,{defaultSize:33.3333,minSize:s,children:n.jsx("div",{className:"tw-h-full tw-overflow-y-auto",children:r})}),n.jsx(oa,{}),n.jsx(Hn,{defaultSize:66.6667,minSize:i,children:n.jsx("div",{className:"tw-h-full tw-overflow-y-auto tw-bg-background tw-p-4",children:o})})]}):e&&o!==void 0?n.jsx("div",{ref:a,className:"tw-h-full tw-w-full tw-overflow-y-auto tw-bg-background tw-p-4",children:o}):n.jsx("div",{className:"tw-h-full tw-w-full tw-overflow-y-auto",children:r})}function _d({path:t,allDomains:e,onDomainSelect:r}){var f,h,v;const o=l.useRef(null),s=l.useRef(null),[i,a]=l.useState(0);l.useEffect(()=>{const b=o.current,y=s.current;if(!b||!y)return;const j=()=>{const N=b.clientWidth,$=Array.from(y.children).filter(S=>S instanceof HTMLElement);if($.length===0)return;if($.reduce((S,R)=>S+R.offsetWidth,0)<=N-4){a(0);return}const L=$.map(S=>S.offsetWidth),T=t.length,E=44;for(let S=1;S<T;S+=1){let R=E;if(S<T-1){R+=L[0]??0;for(let M=S+1;M<T;M+=1)R+=L[M]??0}else R+=L[T-1]??0;if(R<=N-4){a(S);return}}a(T-1)},C=new ResizeObserver(j);return C.observe(b),j(),()=>C.disconnect()},[t]);const c=i>0,d=i>=t.length-1,u=c?d?t.slice(0,-1):t.slice(1,i+1):[],p=u.map(b=>b.label).join(" > "),m=((f=u[0])==null?void 0:f.id)??((h=t[0])==null?void 0:h.id);return n.jsxs("div",{ref:o,className:"tw-overflow-hidden",children:[n.jsx("div",{ref:s,className:"tw-pointer-events-none tw-invisible tw-absolute tw-flex tw-items-center tw-gap-0.5 tw-whitespace-nowrap","aria-hidden":!0,children:t.map((b,y)=>n.jsxs("span",{className:"tw-flex tw-shrink-0 tw-items-center tw-gap-0.5",children:[y>0&&n.jsx(_.ChevronRight,{className:"tw-h-3 tw-w-3"}),n.jsx("span",{className:"tw-px-1.5 tw-py-1 tw-text-sm",children:b.label})]},b.id))}),n.jsxs("div",{className:"tw-inline-flex tw-items-center tw-gap-0.5",children:[!d&&t[0]&&n.jsx(Pn,{label:t[0].label,isLast:t.length===1,allDomains:e,currentPath:t,expandToId:t[0].id,onDomainSelect:r}),c&&n.jsxs(n.Fragment,{children:[!d&&n.jsx(_.ChevronRight,{className:"tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground"}),n.jsx(ut,{delayDuration:0,children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx("span",{children:n.jsx(Pn,{label:n.jsx(_.MoreHorizontal,{className:"tw-h-3 tw-w-3"}),isLast:!1,allDomains:e,currentPath:t,expandToId:m??((v=t[0])==null?void 0:v.id)??"",onDomainSelect:r,isEllipsis:!0})})}),n.jsx(pt,{side:"bottom",children:n.jsx("p",{className:"tw-text-xs",children:p})})]})})]}),t.map((b,y)=>{if(y===0)return;const j=y===t.length-1;if(!(y<=i&&!j))return n.jsxs("span",{className:"tw-flex tw-shrink-0 tw-items-center tw-gap-0.5",children:[n.jsx(_.ChevronRight,{className:"tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground"}),n.jsx(Pn,{label:b.label,isLast:j,allDomains:e,currentPath:t,expandToId:b.id,onDomainSelect:r})]},b.id)})]})]})}function Pn({label:t,isLast:e,allDomains:r,currentPath:o,expandToId:s,onDomainSelect:i,isEllipsis:a=!1}){const[c,d]=l.useState(!1),w=l.useCallback(u=>{i(u),d(!1)},[i]);return n.jsxs(Xt,{open:c,onOpenChange:d,modal:!0,children:[n.jsx(re,{asChild:!0,children:n.jsx("button",{type:"button",className:g("tw-shrink-0 tw-cursor-pointer tw-rounded tw-text-sm hover:tw-bg-muted",a?"tw-flex tw-items-center tw-px-1 tw-py-1":"tw-px-1.5 tw-py-1",e&&!a&&"tw-font-bold"),children:t})}),n.jsx(At,{align:"start",className:"tw-max-h-[500px] tw-w-[300px] tw-overflow-y-auto tw-p-1",style:{zIndex:Wn+10},onEscapeKeyDown:u=>{u.stopPropagation(),u.preventDefault(),d(!1)},onKeyDown:u=>{u.key==="Escape"&&u.stopPropagation()},children:n.jsx(Cd,{domains:r,currentPath:o,expandToId:s,onSelect:w,onClose:()=>d(!1)})})]})}function Cd({domains:t,currentPath:e,expandToId:r,onSelect:o,onClose:s}){const i=l.useRef(null),a=l.useRef(null);l.useEffect(()=>{const u=requestAnimationFrame(()=>{var p;(p=a.current)==null||p.scrollIntoView({block:"center"})});return()=>cancelAnimationFrame(u)},[r]);const c=()=>i.current?Array.from(i.current.querySelectorAll("button")):[],d=u=>{const p=c();if(p.length===0)return;const m=document.activeElement;let h=(m instanceof HTMLButtonElement?p.indexOf(m):-1)+u;h<0&&(h=p.length-1),h>=p.length&&(h=0),p[h].focus()},w=u=>{switch(u.key){case"ArrowDown":u.preventDefault(),u.stopPropagation(),u.nativeEvent.stopImmediatePropagation(),d(1);break;case"ArrowUp":u.preventDefault(),u.stopPropagation(),u.nativeEvent.stopImmediatePropagation(),d(-1);break;case"Tab":u.preventDefault(),u.stopPropagation(),u.nativeEvent.stopImmediatePropagation(),d(u.shiftKey?-1:1);break;case"Escape":u.preventDefault(),u.stopPropagation(),u.nativeEvent.stopImmediatePropagation(),s();break}};return n.jsx("div",{ref:i,onKeyDown:w,children:n.jsx(aa,{domains:t,currentPath:e,expandToId:r,onSelect:o,parentPath:[],scrollRef:a})})}function sa(t,e){var r;return t.id===e?!0:((r=t.children)==null?void 0:r.some(o=>sa(o,e)))??!1}function aa({domains:t,currentPath:e,expandToId:r,onSelect:o,parentPath:s,scrollRef:i}){const a=s.length;return n.jsx("ul",{className:g("tw-space-y-0.5",{"tw-ml-3":s.length>0}),children:t.map(c=>{const d=[...s,c],w=c.id===r,u=c.children&&c.children.length>0,m=sa(c,r)&&c.id!==r,f=c.id===r;return n.jsx(Ed,{domain:c,thisPath:d,depth:a,isSelected:w,hasChildren:u??!1,defaultExpanded:m,currentPath:e,expandToId:r,onSelect:o,scrollRef:i,isScrollTarget:f},c.id)})})}function Ed({domain:t,thisPath:e,depth:r,isSelected:o,hasChildren:s,defaultExpanded:i,currentPath:a,expandToId:c,onSelect:d,scrollRef:w,isScrollTarget:u}){const[p,m]=l.useState(i);l.useEffect(()=>{i&&m(!0)},[i]);const f=r===0&&s;return n.jsxs("li",{children:[n.jsx("div",{className:"tw-flex tw-items-center tw-gap-0.5",children:f?n.jsxs("button",{type:"button",ref:u?w:void 0,className:g("tw-flex tw-flex-1 tw-items-center tw-gap-0.5 tw-rounded tw-px-1.5 tw-py-0.5 tw-text-left tw-text-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring",o?"tw-bg-accent tw-font-medium":"hover:tw-bg-muted"),"aria-expanded":p,onClick:()=>m(!p),children:[n.jsx(_.ChevronRight,{className:g("tw-h-3 tw-w-3 tw-shrink-0 tw-transition-transform",{"tw-rotate-90":p})}),n.jsx("span",{children:t.label})]}):n.jsxs(n.Fragment,{children:[s?n.jsx("button",{type:"button",className:"tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded hover:tw-bg-muted focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring","aria-expanded":p,"aria-label":p?"Collapse":"Expand",onClick:()=>m(!p),children:n.jsx(_.ChevronRight,{className:g("tw-h-3 tw-w-3 tw-transition-transform",{"tw-rotate-90":p})})}):n.jsx("span",{className:"tw-w-5 tw-shrink-0"}),n.jsx("button",{type:"button",ref:u?w:void 0,className:g("tw-flex-1 tw-rounded tw-px-1.5 tw-py-0.5 tw-text-left tw-text-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring",o?"tw-bg-accent tw-font-medium":"hover:tw-bg-muted hover:tw-underline"),onClick:()=>d(e),children:t.label})]})}),p&&t.children&&t.children.length>0&&n.jsx(aa,{domains:t.children,currentPath:a,expandToId:c,onSelect:d,parentPath:e,scrollRef:w})]})}function Sd({showSourceLanguage:t=!0,showTransliteration:e=!0,...r}){return n.jsx(kn,{...r,showSourceLanguage:t,showTransliteration:e,renderItem:o=>n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-0.5",children:[n.jsxs("div",{className:"tw-flex tw-items-baseline tw-gap-2",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:o.primaryText}),t&&o.sourceLanguageText&&n.jsxs("span",{className:"tw-text-sm tw-text-muted-foreground",children:[o.sourceLanguageText,e&&o.transliteration&&n.jsxs("span",{className:"tw-ml-1",children:["(",o.transliteration,")"]})]})]}),o.teaserText&&n.jsx("p",{className:"tw-line-clamp-2 tw-text-xs tw-text-muted-foreground",children:o.teaserText}),n.jsx(Dt,{className:"tw-mt-1"})]})})}function Rd({showSourceLanguage:t=!0,showTransliteration:e=!1,...r}){return n.jsx(kn,{...r,variant:"thumbnail",showSourceLanguage:t,showTransliteration:e,renderItem:o=>n.jsxs("div",{className:"tw-flex tw-w-full tw-items-center tw-gap-3",children:[o.thumbnailUrl&&n.jsx("img",{src:o.thumbnailUrl,alt:o.thumbnailAlt??o.primaryText,className:"tw-h-14 tw-w-14 tw-shrink-0 tw-rounded tw-object-cover"}),!o.thumbnailUrl&&n.jsx("div",{className:"tw-flex tw-h-14 tw-w-14 tw-shrink-0 tw-items-center tw-justify-center tw-rounded tw-bg-muted",children:n.jsx("span",{className:"tw-text-xs tw-text-muted-foreground",children:o.mediaType==="map"?"Map":"Img"})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-0.5 tw-overflow-hidden",children:[n.jsxs("div",{className:"tw-flex tw-items-baseline tw-gap-2",children:[n.jsx("span",{className:"tw-truncate tw-text-sm tw-font-medium",children:o.primaryText}),n.jsx(ce,{variant:"outline",className:"tw-shrink-0 tw-text-xs",children:o.mediaType})]}),t&&o.sourceLanguageText&&n.jsxs("span",{className:"tw-truncate tw-text-xs tw-text-muted-foreground",children:[o.sourceLanguageText,e&&o.transliteration&&n.jsxs("span",{className:"tw-ml-1",children:["(",o.transliteration,")"]})]}),o.caption&&n.jsx("p",{className:"tw-truncate tw-text-xs tw-text-muted-foreground",children:o.caption})]}),n.jsx(Dt,{className:"tw-absolute tw-bottom-0 tw-left-0 tw-right-0"})]})})}function Td({items:t,onItemClick:e,selectedItemId:r,emptyStateMessage:o="No entries found",isLoading:s=!1,onCharacterPress:i,className:a,occurrenceCountLabel:c="Occurrences",strongsCodeLabel:d="Strong's code"}){const w=l.useMemo(()=>t.map(h=>({id:h.id})),[t]),u=h=>{const v=t.find(b=>b.id===h.id);v&&(e==null||e(v))},{listboxRef:p,activeId:m,handleKeyDown:f}=yn({options:w,onOptionSelect:u,onCharacterPress:i});return s?n.jsx("div",{className:g("tw-flex tw-flex-col tw-gap-2 tw-p-2",a),children:Array.from({length:6},(h,v)=>n.jsx(Ie,{className:"tw-h-12 tw-w-full tw-rounded"},v))}):t.length===0?n.jsx("div",{className:g("tw-flex tw-items-center tw-justify-center tw-p-8 tw-text-sm tw-text-muted-foreground",a),children:o}):n.jsx("div",{className:g("tw-overflow-y-auto tw-px-2 tw-py-2",a),children:n.jsx("ul",{role:"listbox",tabIndex:0,ref:p,"aria-activedescendant":m??void 0,className:"tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",onKeyDown:f,children:t.map(h=>{const v=r===h.id;return n.jsxs("div",{children:[n.jsxs("li",{role:"option","aria-selected":v,id:h.id,onClick:()=>e==null?void 0:e(h),className:g("tw-flex tw-flex-col tw-p-2 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-bg-muted":v,"hover:tw-bg-muted":!v}),tabIndex:-1,children:[n.jsxs("div",{className:"tw-flex tw-items-baseline tw-gap-2",children:[n.jsx("span",{className:"scripture-font tw-text-sm",children:h.primaryText}),n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx("span",{className:"tw-ml-1 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs",children:h.occurrenceCount})}),n.jsx(pt,{children:n.jsx("p",{children:c})})]})})]}),n.jsxs("div",{className:"tw-mt-0.5 tw-flex tw-items-center tw-gap-2 tw-overflow-hidden",children:[n.jsx("p",{className:"tw-truncate tw-text-sm tw-text-muted-foreground",children:h.glosses}),h.strongsCodes.map(b=>n.jsx(ut,{children:n.jsxs(ft,{children:[n.jsx(ht,{asChild:!0,children:n.jsx("span",{className:"tw-ml-1 tw-shrink-0 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs",children:b})}),n.jsx(pt,{children:n.jsx("p",{children:d})})]})},b))]})]}),n.jsx(Dt,{})]},h.id)})})})}function Md({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(mt,{children:e(t)}):r?n.jsx(mt,{children:r(t)}):n.jsx(mt,{children:t})}function Dd({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:a}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(jn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(Md,{item:c,createLabel:i,createComplexLabel:a})]},c))})}function Id({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:a,selectedButtons:c,hoverButtons:d,dropdownContent:w,additionalContent:u,accentColor:p,showDropdownOnHover:m=!1}){const f=h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:f,role:"button",tabIndex:0,"aria-pressed":e,className:g("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:a}),e&&c,!e&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:d}),!e&&m&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(Xt,{children:[n.jsx(re,{className:g(p&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(At,{align:"end",children:w})]})}),e&&w&&n.jsxs(Xt,{children:[n.jsx(re,{className:g(p&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(At,{align:"end",children:w})]})]}),u&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:u})]}),p&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${p}`})]},t)}const ia=l.forwardRef(({className:t,...e},r)=>n.jsx(_.LoaderCircle,{size:35,className:g("tw-animate-spin",t),...e,ref:r}));ia.displayName="Spinner";function Od({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:a,isRequired:c=!1,className:d,defaultValue:w,value:u,onChange:p,onFocus:m,onBlur:f}){return n.jsxs("div",{className:g("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(mt,{htmlFor:t,className:g({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(Ne,{id:t,disabled:e,placeholder:a,required:c,className:g(d,{"tw-border-red-600":r}),defaultValue:w,value:u,onChange:p,onFocus:m,onBlur:f}),n.jsx("p",{className:g({"tw-hidden":!s}),children:s})]})}const Ld=ue.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),la=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:g("pr-twp",Ld({variant:e}),t),...r}));la.displayName="Alert";const ca=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:g("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));ca.displayName="AlertTitle";const da=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:g("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));da.displayName="AlertDescription";const Ad=rt.Root,Pd=rt.Trigger,$d=rt.Group,Fd=rt.Portal,Vd=rt.Sub,zd=rt.RadioGroup,wa=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(rt.SubTrigger,{ref:s,className:g("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));wa.displayName=rt.SubTrigger.displayName;const ua=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.SubContent,{ref:r,className:g("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));ua.displayName=rt.SubContent.displayName;const pa=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.Portal,{children:n.jsx(rt.Content,{ref:r,className:g("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));pa.displayName=rt.Content.displayName;const ma=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(rt.Item,{ref:o,className:g("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));ma.displayName=rt.Item.displayName;const fa=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(rt.CheckboxItem,{ref:s,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(rt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));fa.displayName=rt.CheckboxItem.displayName;const ha=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(rt.RadioItem,{ref:o,className:g("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(rt.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));ha.displayName=rt.RadioItem.displayName;const ga=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(rt.Label,{ref:o,className:g("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));ga.displayName=rt.Label.displayName;const xa=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.Separator,{ref:r,className:g("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));xa.displayName=rt.Separator.displayName;function ba({className:t,...e}){return n.jsx("span",{className:g("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ba.displayName="ContextMenuShortcut";const va=l.createContext({direction:"bottom"});function ya({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(va.Provider,{value:o,children:n.jsx(Pt.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}ya.displayName="Drawer";const Bd=Pt.Drawer.Trigger,ja=Pt.Drawer.Portal,Kd=Pt.Drawer.Close,Ar=l.forwardRef(({className:t,...e},r)=>n.jsx(Pt.Drawer.Overlay,{ref:r,className:g("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Ar.displayName=Pt.Drawer.Overlay.displayName;const Na=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,container:o,...s},i)=>{const{direction:a="bottom"}=l.useContext(va),c=o?"tw-absolute":"tw-fixed",d={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},w={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ja,{container:o,children:[!o&&n.jsx(Ar,{}),n.jsxs(Pt.Drawer.Content,{ref:i,className:g("pr-twp tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",c,a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",d[a],t),...s,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:w[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:w[a]})]})]})});Na.displayName="DrawerContent";function ka({className:t,...e}){return n.jsx("div",{className:g("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ka.displayName="DrawerHeader";function _a({className:t,...e}){return n.jsx("div",{className:g("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}_a.displayName="DrawerFooter";const Ca=l.forwardRef(({className:t,...e},r)=>n.jsx(Pt.Drawer.Title,{ref:r,className:g("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Ca.displayName=Pt.Drawer.Title.displayName;const Ea=l.forwardRef(({className:t,...e},r)=>n.jsx(Pt.Drawer.Description,{ref:r,className:g("tw-text-sm tw-text-muted-foreground",t),...e}));Ea.displayName=Pt.Drawer.Description.displayName;const Sa=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(zn.Root,{ref:o,className:g("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(zn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Sa.displayName=zn.Root.displayName;function Gd({...t}){return n.jsx(co.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Ra=l.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsxs(Be.Root,{ref:r,className:g("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Be.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Be.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Be.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Ra.displayName=Be.Root.displayName;const Ta=l.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(Bn.Root,{className:g("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Bn.Thumb,{className:g("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Ta.displayName=Bn.Root.displayName;const qd=Et.Root,Ma=l.forwardRef(({className:t,...e},r)=>{const o=wt();return n.jsx(Et.List,{ref:r,className:g("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});Ma.displayName=Et.List.displayName;const Da=l.forwardRef(({className:t,...e},r)=>n.jsx(Et.Trigger,{ref:r,className:g("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));Da.displayName=Et.Trigger.displayName;const Ia=l.forwardRef(({className:t,...e},r)=>n.jsx(Et.Content,{ref:r,className:g("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Ia.displayName=Et.Content.displayName;const Oa=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:g("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));Oa.displayName="Textarea";const Ud=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Hd(t){return{preserveValue:!0,...t}}const La=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=Hd(s.current);const[i,a]=l.useState(()=>o.current),[c,d]=l.useState(!0);return l.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const u=await t();w&&(a(()=>u),d(!1))}})(),()=>{w=!1,s.current.preserveValue||a(()=>o.current)}},[t]),[i,c]},$n=()=>!1,Yd=(t,e)=>{const[r]=La(l.useCallback(async()=>{if(!t)return $n;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),$n,{preserveValue:!1});l.useEffect(()=>()=>{r!==$n&&r()},[r])};function Xd(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>co.toast});exports.Alert=la;exports.AlertDescription=da;exports.AlertTitle=ca;exports.Avatar=fr;exports.AvatarFallback=hr;exports.AvatarImage=os;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=gi;exports.BOOK_SELECTOR_STRING_KEYS=vi;exports.Badge=ce;exports.BookChapterControl=hi;exports.BookSelector=yi;exports.Button=B;exports.COMMENT_EDITOR_STRING_KEYS=Kl;exports.COMMENT_LIST_STRING_KEYS=Gl;exports.Card=pr;exports.CardContent=mr;exports.CardDescription=ns;exports.CardFooter=rs;exports.CardHeader=ts;exports.CardTitle=es;exports.ChapterRangeSelector=Co;exports.Checkbox=jn;exports.Checklist=Dd;exports.ComboBox=sn;exports.Command=Wt;exports.CommandEmpty=Ae;exports.CommandGroup=Lt;exports.CommandInput=ye;exports.CommandItem=$t;exports.CommandList=Zt;exports.CommentEditor=Bl;exports.CommentList=Yl;exports.ContextMenu=Ad;exports.ContextMenuCheckboxItem=fa;exports.ContextMenuContent=pa;exports.ContextMenuGroup=$d;exports.ContextMenuItem=ma;exports.ContextMenuLabel=ga;exports.ContextMenuPortal=Fd;exports.ContextMenuRadioGroup=zd;exports.ContextMenuRadioItem=ha;exports.ContextMenuSeparator=xa;exports.ContextMenuShortcut=ba;exports.ContextMenuSub=Vd;exports.ContextMenuSubContent=ua;exports.ContextMenuSubTrigger=wa;exports.ContextMenuTrigger=Pd;exports.DataTable=fs;exports.Dialog=ho;exports.DialogClose=di;exports.DialogContent=Jn;exports.DialogDescription=bo;exports.DialogFooter=xo;exports.DialogHeader=Qn;exports.DialogOverlay=Zn;exports.DialogPortal=go;exports.DialogTitle=tr;exports.DialogTrigger=ci;exports.Drawer=ya;exports.DrawerClose=Kd;exports.DrawerContent=Na;exports.DrawerDescription=Ea;exports.DrawerFooter=_a;exports.DrawerHeader=ka;exports.DrawerOverlay=Ar;exports.DrawerPortal=ja;exports.DrawerTitle=Ca;exports.DrawerTrigger=Bd;exports.DropdownMenu=Xt;exports.DropdownMenuCheckboxItem=Ht;exports.DropdownMenuContent=At;exports.DropdownMenuGroup=xr;exports.DropdownMenuItem=He;exports.DropdownMenuItemType=xs;exports.DropdownMenuLabel=$e;exports.DropdownMenuPortal=ss;exports.DropdownMenuRadioGroup=is;exports.DropdownMenuRadioItem=yr;exports.DropdownMenuSeparator=je;exports.DropdownMenuShortcut=ls;exports.DropdownMenuSub=as;exports.DropdownMenuSubContent=vr;exports.DropdownMenuSubTrigger=br;exports.DropdownMenuTrigger=re;exports.ERROR_DUMP_STRING_KEYS=hs;exports.ERROR_POPOVER_STRING_KEYS=nc;exports.EditorKeyboardShortcuts=js;exports.ErDictionaryFilteredList=Nd;exports.ErDictionaryList=bd;exports.ErEncyclopediaList=Sd;exports.ErMediaList=Rd;exports.ErrorDump=gs;exports.ErrorPopover=rc;exports.FOOTNOTE_EDITOR_STRING_KEYS=vc;exports.Filter=lc;exports.FilterDropdown=oc;exports.Footer=ic;exports.FootnoteEditor=bc;exports.FootnoteItem=Cs;exports.FootnoteList=Nc;exports.INVENTORY_STRING_KEYS=Oc;exports.Input=Ne;exports.Inventory=Pc;exports.Label=mt;exports.LexicalDictionaryList=Td;exports.MARKER_MENU_STRING_KEYS=Ns;exports.MarkdownRenderer=ec;exports.MarkerMenu=ks;exports.MoreInfo=sc;exports.MultiSelectComboBox=bs;exports.NavigationContentSearch=ad;exports.Popover=Jt;exports.PopoverAnchor=ko;exports.PopoverContent=Ft;exports.PopoverTrigger=oe;exports.Progress=Sa;exports.RadioGroup=xn;exports.RadioGroupItem=qe;exports.RecentSearches=_o;exports.ResizableHandle=oa;exports.ResizablePanel=Hn;exports.ResizablePanelGroup=ra;exports.ResultsCard=Id;exports.SCOPE_SELECTOR_STRING_KEYS=Jc;exports.SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS=xd;exports.ScopeSelector=Qc;exports.ScriptureResultsViewer=Xc;exports.ScrollGroupSelector=td;exports.SearchBar=Nn;exports.Select=xe;exports.SelectContent=we;exports.SelectGroup=cs;exports.SelectItem=Rt;exports.SelectLabel=ws;exports.SelectScrollDownButton=Nr;exports.SelectScrollUpButton=jr;exports.SelectSeparator=us;exports.SelectTrigger=de;exports.SelectValue=be;exports.Separator=Dt;exports.SettingsList=ed;exports.SettingsListHeader=rd;exports.SettingsListItem=nd;exports.SettingsSidebar=Bs;exports.SettingsSidebarContentSearch=zc;exports.Sidebar=Cr;exports.SidebarContent=Sr;exports.SidebarFooter=Is;exports.SidebarGroup=un;exports.SidebarGroupAction=Ls;exports.SidebarGroupContent=mn;exports.SidebarGroupLabel=pn;exports.SidebarHeader=Ds;exports.SidebarInput=Ms;exports.SidebarInset=Er;exports.SidebarMenu=Rr;exports.SidebarMenuAction=As;exports.SidebarMenuBadge=Ps;exports.SidebarMenuButton=Mr;exports.SidebarMenuItem=Tr;exports.SidebarMenuSkeleton=$s;exports.SidebarMenuSub=Fs;exports.SidebarMenuSubButton=zs;exports.SidebarMenuSubItem=Vs;exports.SidebarProvider=_r;exports.SidebarRail=Ts;exports.SidebarSeparator=Os;exports.SidebarTrigger=Rs;exports.Skeleton=Ie;exports.Slider=Ra;exports.Sonner=Gd;exports.SourceLanguageIndexedList=kn;exports.Spinner=ia;exports.Switch=Ta;exports.TabDropdownMenu=hn;exports.TabFloatingMenu=sd;exports.TabToolbar=od;exports.Table=Xe;exports.TableBody=Ze;exports.TableCaption=ms;exports.TableCell=le;exports.TableFooter=ps;exports.TableHead=De;exports.TableHeader=We;exports.TableRow=Ut;exports.Tabs=qd;exports.TabsContent=Ia;exports.TabsList=Ma;exports.TabsTrigger=Da;exports.TextField=Od;exports.Textarea=Oa;exports.ToggleGroup=vn;exports.ToggleGroupItem=Re;exports.Toolbar=md;exports.Tooltip=ft;exports.TooltipContent=pt;exports.TooltipProvider=ut;exports.TooltipTrigger=ht;exports.UNDO_REDO_BUTTONS_STRING_KEYS=vs;exports.UiLanguageSelector=hd;exports.UndoRedoButtons=ys;exports.VerticalTabs=Ir;exports.VerticalTabsContent=Lr;exports.VerticalTabsList=Or;exports.VerticalTabsTrigger=Ys;exports.Z_INDEX_ABOVE_DOCK=ve;exports.Z_INDEX_FOOTNOTE_EDITOR=Xn;exports.Z_INDEX_MODAL=Wn;exports.Z_INDEX_MODAL_BACKDROP=fo;exports.Z_INDEX_OVERLAY=mo;exports.badgeVariants=Qo;exports.buttonVariants=or;exports.cn=g;exports.getBookIdFromUSFM=Ic;exports.getInventoryHeader=Je;exports.getLinesFromUSFM=Mc;exports.getNumberFromUSFM=Dc;exports.getStatusForItem=Es;exports.getToolbarOSReservedSpaceClassName=pd;exports.inventoryCountColumn=Rc;exports.inventoryItemColumn=Ec;exports.inventoryStatusColumn=Tc;exports.selectTriggerVariants=ds;exports.useEvent=Ud;exports.useEventAsync=Yd;exports.useListbox=yn;exports.usePromise=La;exports.useRecentSearches=ui;exports.useSidebar=Qe;exports.useStylesheet=Xd;function Wd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Wd(`*, ::before, ::after {
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
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-3 {
  margin-left: 0.75rem;
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
.tw-mt-0\\.5 {
  margin-top: 0.125rem;
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
.tw-line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
.tw-max-h-\\[500px\\] {
  max-height: 500px;
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
.tw-w-14 {
  width: 3.5rem;
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
.tw-rotate-90 {
  --tw-rotate: 90deg;
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
.tw-cursor-help {
  cursor: help;
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
.tw-gap-0\\.5 {
  gap: 0.125rem;
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
.tw-space-y-0\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.125rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.125rem * var(--tw-space-y-reverse));
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
.tw-object-cover {
  object-fit: cover;
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
.tw-px-1\\.5 {
  padding-left: 0.375rem;
  padding-right: 0.375rem;
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
.tw-shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
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
.tw-ring-1 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-inset {
  --tw-ring-inset: inset;
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-ring {
  --tw-ring-color: hsl(var(--ring));
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
.focus\\:tw-ring-1:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
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
.focus-visible\\:tw-ring-inset:focus-visible {
  --tw-ring-inset: inset;
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
