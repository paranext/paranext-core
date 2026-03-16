"use strict";var ha=Object.defineProperty;var ga=(t,e,r)=>e in t?ha(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var ft=(t,e,r)=>ga(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),vt=require("cmdk"),_=require("lucide-react"),xa=require("clsx"),ba=require("tailwind-merge"),va=require("@radix-ui/react-dialog"),it=require("@sillsdev/scripture"),j=require("platform-bible-utils"),Me=require("@radix-ui/react-slot"),ae=require("class-variance-authority"),ya=require("@radix-ui/react-popover"),ja=require("@radix-ui/react-label"),Na=require("@radix-ui/react-radio-group"),x=require("lexical"),zr=require("@radix-ui/react-tooltip"),Mn=require("@lexical/rich-text"),yr=require("react-dom"),ka=require("@lexical/table"),_a=require("@radix-ui/react-toggle-group"),Ca=require("@radix-ui/react-toggle"),Br=require("@lexical/headless"),Ea=require("@radix-ui/react-separator"),Sa=require("@radix-ui/react-avatar"),Gr=require("@radix-ui/react-dropdown-menu"),gt=require("@tanstack/react-table"),Ra=require("@radix-ui/react-select"),Ta=require("markdown-to-jsx"),St=require("@eten-tech-foundation/platform-editor"),Ma=require("@radix-ui/react-checkbox"),Da=require("@radix-ui/react-tabs"),Ia=require("@radix-ui/react-menubar"),Oa=require("react-hotkeys-hook"),Aa=require("@radix-ui/react-context-menu"),It=require("vaul"),Pa=require("@radix-ui/react-progress"),La=require("react-resizable-panels"),Kr=require("sonner"),$a=require("@radix-ui/react-slider"),Fa=require("@radix-ui/react-switch");function ct(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Dt=ct(va),Se=ct(ya),qr=ct(ja),Ve=ct(Na),ue=ct(zr),wn=ct(_a),Ur=ct(Ca),Hr=ct(Ea),De=ct(Sa),J=ct(Gr),st=ct(Ra),Dn=ct(Ma),yt=ct(Da),Z=ct(Ia),Q=ct(Aa),In=ct(Pa),Fn=ct(La),Le=ct($a),On=ct(Fa),Va=ba.extendTailwindMerge({prefix:"tw-"});function f(...t){return Va(xa.clsx(t))}const za="layoutDirection";function dt(){const t=localStorage.getItem(za);return t==="rtl"?t:"ltr"}const Ba=Dt.Root,Ga=Dt.Portal,Yr=l.forwardRef(({className:t,...e},r)=>n.jsx(Dt.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Yr.displayName=Dt.Overlay.displayName;const Xr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=dt();return n.jsxs(Ga,{children:[n.jsx(Yr,{}),n.jsxs(Dt.Content,{ref:o,className:f("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(Dt.Close,{className:f("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Xr.displayName=Dt.Content.displayName;function Wr({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Wr.displayName="DialogHeader";const Jr=l.forwardRef(({className:t,...e},r)=>n.jsx(Dt.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Jr.displayName=Dt.Title.displayName;const Ka=l.forwardRef(({className:t,...e},r)=>n.jsx(Dt.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));Ka.displayName=Dt.Description.displayName;const Kt=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command,{ref:r,className:f("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Kt.displayName=vt.Command.displayName;const xe=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(_.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(vt.Command.Input,{ref:r,className:f("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});xe.displayName=vt.Command.Input.displayName;const qt=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.List,{ref:r,className:f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));qt.displayName=vt.Command.List.displayName;const Ie=l.forwardRef((t,e)=>n.jsx(vt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ie.displayName=vt.Command.Empty.displayName;const Gt=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.Group,{ref:r,className:f("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Gt.displayName=vt.Command.Group.displayName;const Zr=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.Separator,{ref:r,className:f("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Zr.displayName=vt.Command.Separator.displayName;const Ot=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.Item,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Ot.displayName=vt.Command.Item.displayName;function Qr({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Qr.displayName="CommandShortcut";const to=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"Old Testament";case j.Section.NT:return r??"New Testament";case j.Section.DC:return o??"Deuterocanon";case j.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},qa=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"OT";case j.Section.NT:return r??"NT";case j.Section.DC:return o??"DC";case j.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ce(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??it.Canon.bookIdToEnglishName(t)}function Vn(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const eo=it.Canon.allBookIds.filter(t=>!it.Canon.isObsolete(it.Canon.bookIdToNumber(t))),pe=Object.fromEntries(eo.map(t=>[t,it.Canon.bookIdToEnglishName(t)]));function zn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=it.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(j.includes(s.toLowerCase(),o)||j.includes(t.toLowerCase(),o)||(i?j.includes(i.localizedName.toLowerCase(),o)||j.includes(i.localizedId.toLowerCase(),o):!1))}const no=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:a=!1,localizedBookNames:c,commandValue:d},w)=>{const p=l.useRef(!1),u=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=y=>{p.current=!0,o?o(y):r==null||r(t)},m=l.useMemo(()=>Ce(t,c),[t,c]),g=l.useMemo(()=>Vn(t,c),[t,c]);return n.jsx("div",{className:f("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===j.Section.OT,"tw-border-s-purple-200":s===j.Section.NT,"tw-border-s-indigo-200":s===j.Section.DC,"tw-border-s-amber-200":s===j.Section.Extra}),children:n.jsxs(Ot,{ref:w,value:d||`${t} ${it.Canon.bookIdToEnglishName(t)}`,onSelect:u,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${it.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[a&&n.jsx(_.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:m}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Bn=ae.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),z=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},i)=>{const a=o?Me.Slot:"button";return n.jsx(a,{className:f(Bn({variant:e,size:r,className:t})),ref:i,...s})});z.displayName="Button";const Ut=Se.Root,Wt=Se.Trigger,ro=Se.Anchor,At=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},s)=>{const i=dt();return n.jsx(Se.Portal,{children:n.jsx(Se.Content,{ref:s,align:e,sideOffset:r,className:f("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});At.displayName=Se.Content.displayName;function An(t,e,r){return`${t} ${pe[t]}${e?` ${Vn(t,e)} ${Ce(t,e)}`:""}${r?` ${r}`:""}`}function oo({recentSearches:t,onSearchItemSelect:e,renderItem:r=d=>String(d),getItemKey:o=d=>String(d),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:a,classNameForItems:c}){const[d,w]=l.useState(!1);if(t.length===0)return;const p=u=>{e(u),w(!1)};return n.jsxs(Ut,{open:d,onOpenChange:w,children:[n.jsx(Wt,{asChild:!0,children:n.jsx(z,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(_.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(At,{id:a,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Kt,{children:n.jsx(qt,{children:n.jsx(Gt,{heading:i,children:t.map(u=>n.jsxs(Ot,{onSelect:()=>p(u),className:f("tw-flex tw-items-center",c),children:[n.jsx(_.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function Ua(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(c=>!r(c,s)),a=[s,...i.slice(0,o-1)];e(a)}}const xn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Ha=[xn.BOOK_ONLY,xn.BOOK_CHAPTER,xn.BOOK_CHAPTER_VERSE];function jr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Vt(t){return j.getChaptersForBook(it.Canon.bookIdToNumber(t))}function Ya(t,e,r){if(!t.trim()||e.length===0)return;const o=Ha.reduce((s,i)=>{if(s)return s;const a=i.exec(t.trim());if(a){const[c,d=void 0,w=void 0]=a.slice(1);let p;const u=e.filter(h=>zn(h,c,r));if(u.length===1&&([p]=u),!p&&d){if(it.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,m])=>m.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&d){const m=(g=>Object.keys(pe).find(y=>pe[y].toLowerCase()===g.toLowerCase()))(c);if(m&&e.includes(m)&&(p=m),!p&&r){const g=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=d?parseInt(d,10):void 0;h&&h>Vt(p)&&(h=Math.max(Vt(p),1));const m=w?parseInt(w,10):void 0;return{book:p,chapterNum:h,verseNum:m}}}},void 0);if(o)return o}function Xa(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],p=Math.max(Vt(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{const d=Vt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const p=e[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?_.ChevronsLeft:_.ChevronsRight},{onClick:a,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?_.ChevronLeft:_.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?_.ChevronRight:_.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===Vt(t.book)||Vt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?_.ChevronsRight:_.ChevronsLeft}],[t,e,r,s,a,c,i])}function Nr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(Gt,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:Vt(t)},(a,c)=>c+1).map(a=>n.jsx(Ot,{value:`${t} ${pe[t]||""} ${a}`,onSelect:()=>r(a),ref:o(a),className:f("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&a===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(a))??!1}),children:a},a))})})}function Wa({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:a,onAddRecentSearch:c,id:d}){const w=dt(),[p,u]=l.useState(!1),[h,m]=l.useState(""),[g,y]=l.useState(""),[b,N]=l.useState("books"),[k,C]=l.useState(void 0),[E,V]=l.useState(!1),F=l.useRef(void 0),R=l.useRef(void 0),L=l.useRef(void 0),S=l.useRef(void 0),M=l.useRef({}),$=l.useCallback(v=>{e(v),c&&c(v)},[e,c]),P=l.useMemo(()=>o?o():eo,[o]),I=l.useMemo(()=>({[j.Section.OT]:P.filter(O=>it.Canon.isBookOT(O)),[j.Section.NT]:P.filter(O=>it.Canon.isBookNT(O)),[j.Section.DC]:P.filter(O=>it.Canon.isBookDC(O)),[j.Section.Extra]:P.filter(O=>it.Canon.extraBooks().includes(O))}),[P]),A=l.useMemo(()=>Object.values(I).flat(),[I]),q=l.useMemo(()=>{if(!g.trim())return I;const v={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return[j.Section.OT,j.Section.NT,j.Section.DC,j.Section.Extra].forEach(K=>{v[K]=I[K].filter(B=>zn(B,g,s))}),v},[I,g,s]),D=l.useMemo(()=>Ya(g,A,s),[g,A,s]),H=l.useCallback(()=>{D&&($({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),u(!1),y(""),m(""))},[$,D]),jt=l.useCallback(v=>{if(Vt(v)<=1){$({book:v,chapterNum:1,verseNum:1}),u(!1),y("");return}C(v),N("chapters")},[$]),Rt=l.useCallback(v=>{const O=b==="chapters"?k:D==null?void 0:D.book;O&&($({book:O,chapterNum:v,verseNum:1}),u(!1),N("books"),C(void 0),y(""))},[$,b,k,D]),Ct=l.useCallback(v=>{$(v),u(!1),y("")},[$]),wt=Xa(t,A,w,e),at=l.useCallback(()=>{N("books"),C(void 0),setTimeout(()=>{R.current&&R.current.focus()},0)},[]),G=l.useCallback(v=>{if(!v&&b==="chapters"){at();return}u(v),v&&(N("books"),C(void 0),y(""))},[b,at]),{otLong:tt,ntLong:et,dcLong:rt,extraLong:ut}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},le=l.useCallback(v=>to(v,tt,et,rt,ut),[tt,et,rt,ut]),Lt=l.useCallback(v=>D?!!D.chapterNum&&!v.toString().includes(D.chapterNum.toString()):!1,[D]),Yt=l.useMemo(()=>j.formatScrRef(t,s?Ce(t.book,s):"English"),[t,s]),je=l.useCallback(v=>O=>{M.current[v]=O},[]),Qt=l.useCallback(v=>{(v.key==="Home"||v.key==="End")&&v.stopPropagation()},[]),Xt=l.useCallback(v=>{if(v.ctrlKey)return;const{isLetter:O,isDigit:K}=jr(v.key);if(b==="chapters"){if(v.key==="Backspace"){v.preventDefault(),v.stopPropagation(),at();return}if(O||K){if(v.preventDefault(),v.stopPropagation(),N("books"),C(void 0),K&&k){const B=pe[k];y(`${B} ${v.key}`)}else y(v.key);setTimeout(()=>{R.current&&R.current.focus()},0);return}}if((b==="chapters"||b==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(v.key)){const B=b==="chapters"?k:D==null?void 0:D.book;if(!B)return;const U=(()=>{if(!h)return 1;const nt=h.match(/(\d+)$/);return nt?parseInt(nt[1],10):0})(),ot=Vt(B);if(!ot)return;let W=U;const pt=6;switch(v.key){case"ArrowLeft":U!==0&&(W=U>1?U-1:ot);break;case"ArrowRight":U!==0&&(W=U<ot?U+1:1);break;case"ArrowUp":W=U===0?ot:Math.max(1,U-pt);break;case"ArrowDown":W=U===0?1:Math.min(ot,U+pt);break;default:return}W!==U&&(v.preventDefault(),v.stopPropagation(),m(An(B,s,W)),setTimeout(()=>{const nt=M.current[W];nt&&nt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,D,at,k,h,s]),Ne=l.useCallback(v=>{if(v.shiftKey||v.key==="Tab"||v.key===" ")return;const{isLetter:O,isDigit:K}=jr(v.key);(O||K)&&(v.preventDefault(),y(B=>B+v.key),R.current.focus(),V(!1))},[]);return l.useLayoutEffect(()=>{const v=setTimeout(()=>{if(p&&b==="books"&&L.current&&S.current){const O=L.current,K=S.current,B=K.offsetTop,U=O.clientHeight,ot=K.clientHeight,W=B-U/2+ot/2;O.scrollTo({top:Math.max(0,W),behavior:"smooth"}),m(An(t.book))}},0);return()=>{clearTimeout(v)}},[p,b,g,D,t.book]),l.useLayoutEffect(()=>{if(b==="chapters"&&k){const v=k===t.book;setTimeout(()=>{if(L.current)if(v){const O=M.current[t.chapterNum];O&&O.scrollIntoView({block:"center",behavior:"smooth"})}else L.current.scrollTo({top:0});F.current&&F.current.focus()},0)}},[b,k,D,t.book,t.chapterNum]),n.jsxs(Ut,{open:p,onOpenChange:G,children:[n.jsx(Wt,{asChild:!0,children:n.jsx(z,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:f("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Yt})})}),n.jsx(At,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Kt,{ref:F,onKeyDown:Xt,loop:!0,value:h,onValueChange:m,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(xe,{ref:R,value:g,onValueChange:y,onKeyDown:Qt,onFocus:()=>V(!1),className:a&&a.length>0?"!tw-pr-10":""}),a&&a.length>0&&n.jsx(oo,{recentSearches:a,onSearchItemSelect:Ct,renderItem:v=>j.formatScrRef(v,"English"),getItemKey:v=>`${v.book}-${v.chapterNum}-${v.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:wt.map(({onClick:v,disabled:O,title:K,icon:B})=>n.jsx(z,{variant:"ghost",size:"sm",onClick:()=>{V(!0),v()},disabled:O,className:"tw-h-10 tw-w-4 tw-p-0",title:K,onKeyDown:Ne,children:n.jsx(B,{})},K))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(z,{variant:"ghost",size:"sm",onClick:at,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(_.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(_.ArrowRight,{className:"tw-h-4 tw-w-4"})}),k&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ce(k,s)})]}),!E&&n.jsxs(qt,{ref:L,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!D&&Object.entries(q).map(([v,O])=>{if(O.length!==0)return n.jsx(Gt,{heading:le(v),children:O.map(K=>n.jsx(no,{bookId:K,onSelect:B=>jt(B),section:j.getSectionForBook(K),commandValue:`${K} ${pe[K]}`,ref:K===t.book?S:void 0,localizedBookNames:s},K))},v)}),D&&n.jsx(Gt,{children:n.jsx(Ot,{value:`${D.book} ${pe[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:H,className:"tw-font-semibold tw-text-primary",children:j.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},s?Vn(D.book,s):void 0)},"top-match")}),D&&Vt(D.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Ce(D.book,s)}),n.jsx(Nr,{bookId:D.book,scrRef:t,onChapterSelect:Rt,setChapterRef:je,isChapterDimmed:Lt,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&k&&n.jsx(Nr,{bookId:k,scrRef:t,onChapterSelect:Rt,setChapterRef:je,className:"tw-p-4"})]})]})})]})}const Ja=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Za=ae.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),lt=l.forwardRef(({className:t,...e},r)=>n.jsx(qr.Root,{ref:r,className:f("pr-twp",Za(),t),...e}));lt.displayName=qr.Root.displayName;const pn=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(Ve.Root,{className:f("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});pn.displayName=Ve.Root.displayName;const ze=l.forwardRef(({className:t,...e},r)=>n.jsx(Ve.Item,{ref:r,className:f("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ve.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(_.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ze.displayName=Ve.Item.displayName;function Qa(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function en({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:i,onChange:a=()=>{},getOptionLabel:c=Qa,getButtonLabel:d,icon:w=void 0,buttonPlaceholder:p="",textPlaceholder:u="",commandEmptyMessage:h="No option found",buttonVariant:m="outline",alignDropDown:g="start",isDisabled:y=!1,ariaLabel:b,...N}){const[k,C]=l.useState(!1),E=d??c,V=R=>R.length>0&&typeof R[0]=="object"&&"options"in R[0],F=(R,L)=>{const S=c(R),M=typeof R=="object"&&"secondaryLabel"in R?R.secondaryLabel:void 0,$=`${L??""}${S}${M??""}`;return n.jsxs(Ot,{value:S,onSelect:()=>{a(R),C(!1)},className:"tw-flex tw-items-center",children:[n.jsx(_.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||c(i)!==S})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[S,M&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",M]})]})]},$)};return n.jsxs(Ut,{open:k,onOpenChange:C,...N,children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(z,{variant:m,role:"combobox","aria-expanded":k,"aria-label":b,id:t,className:f("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:y,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[w&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:w}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?E(i):p})]}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(At,{align:g,className:f("tw-w-[200px] tw-p-0",s),children:n.jsxs(Kt,{children:[n.jsx(xe,{placeholder:u,className:"tw-text-inherit"}),n.jsx(Ie,{children:h}),n.jsx(qt,{children:V(e)?e.map(R=>n.jsx(Gt,{heading:R.groupHeading,children:R.options.map(L=>F(L,R.groupHeading))},R.groupHeading)):e.map(R=>F(R))})]})})]})}function so({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const a=l.useMemo(()=>Array.from({length:i},(w,p)=>p+1),[i]),c=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(lt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(en,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:a,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(lt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(en,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:a,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}var ao=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(ao||{});const ti=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),bn=(t,e)=>t[e]??e;function ei({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:a,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=bn(w,"%webView_bookSelector_currentBook%"),u=bn(w,"%webView_bookSelector_choose%"),h=bn(w,"%webView_bookSelector_chooseBooks%"),[m,g]=l.useState("current book"),y=b=>{g(b),t(b)};return n.jsx(pn,{className:"pr-twp tw-flex",value:m,onValueChange:b=>y(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"current book"}),n.jsx(lt,{className:"tw-ms-1",children:p})]}),n.jsx(lt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(so,{isDisabled:m==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:a,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"choose books"}),n.jsx(lt,{className:"tw-ms-1",children:h})]}),n.jsx(lt,{className:"tw-flex tw-items-center",children:o.map(b=>it.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(z,{disabled:m==="current book",onClick:()=>r(),children:u})]})]})})}const io=l.createContext(null);function ni(t,e){return{getTheme:function(){return e??null}}}function Ht(){const t=l.useContext(io);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const lo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ri=lo?l.useLayoutEffect:l.useEffect,We={tag:x.HISTORY_MERGE_TAG};function oi({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:a,editorState:c,html:d}=t,w=ni(null,o),p=x.createEditor({editable:t.editable,html:d,namespace:s,nodes:i,onError:u=>a(u,p),theme:o});return function(u,h){if(h!==null){if(h===void 0)u.update(()=>{const m=x.$getRoot();if(m.isEmpty()){const g=x.$createParagraphNode();m.append(g);const y=lo?document.activeElement:null;(x.$getSelection()!==null||y!==null&&y===u.getRootElement())&&g.select()}},We);else if(h!==null)switch(typeof h){case"string":{const m=u.parseEditorState(h);u.setEditorState(m,We);break}case"object":u.setEditorState(h,We);break;case"function":u.update(()=>{x.$getRoot().isEmpty()&&h(u)},We)}}}(p,c),[p,w]},[]);return ri(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(io.Provider,{value:r,children:e})}const si=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ai({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Ht();return si(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:c,tags:d})=>{e&&i.size===0&&a.size===0||t&&d.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const Gn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},xt=ue.Provider,kt=ue.Root,_t=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(ue.Trigger,{ref:o,className:e?f(Bn({variant:e}),t):t,...r}));_t.displayName=ue.Trigger.displayName;const bt=l.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(ue.Portal,{children:n.jsx(ue.Content,{ref:o,sideOffset:e,className:f("pr-twp tw-z-[250] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})}));bt.displayName=ue.Content.displayName;const Kn=[Mn.HeadingNode,x.ParagraphNode,x.TextNode,Mn.QuoteNode],ii=l.createContext(null),vn={didCatch:!1,error:null};class li extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=vn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(vn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&ci(e.resetKeys,s)){var i,a;(i=(a=this.props).onReset)===null||i===void 0||i.call(a,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(vn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:a}=this.state;let c=e;if(i){const d={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=l.createElement(o,d);else if(s!==void 0)c=s;else throw a}return l.createElement(ii.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},c)}}function ci(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function di({children:t,onError:e}){return n.jsx(li,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const wi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function pi(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function ui(){return function(t){const[e]=Ht(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),i=l.useRef(o);return wi(()=>{const{initialValueFn:a,subscribe:c}=r,d=a();return i.current!==d&&(i.current=d,s(d)),c(w=>{i.current=w,s(w)})},[r,t]),o}(pi)}function mi(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,a=t.isBackward(),c=s.getNode(),d=i.getNode(),w=e.is(c),p=e.is(d);if(w||p){const[u,h]=x.$getCharacterOffsets(t),m=c.is(d),g=e.is(a?d:c),y=e.is(a?c:d);let b,N=0;m?(N=u>h?h:u,b=u>h?u:h):g?(N=a?h:u,b=void 0):y&&(N=0,b=a?u:h);const k=e.__text.slice(N,b);k!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=k)}}return e}function fi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const co=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,hi=co&&"documentMode"in document?document.documentMode:null;!(!co||!("InputEvent"in window)||hi)&&"getTargetRanges"in new window.InputEvent("input");function gi(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||fi(4,t.__key),e}function xi(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],a=i.getKey();if(r.has(a))continue;const c=x.$findMatchingParent(i,w=>x.$isElementNode(w)&&!w.isInline());if(c===null)continue;const d=c.getKey();c.canIndent()&&!r.has(d)&&(r.add(d),t(c))}return r.size>0}const bi=Symbol.for("preact-signals");function un(){if(ee>1)return void ee--;let t,e=!1;for(;$e!==void 0;){let r=$e;for($e=void 0,Pn++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&wo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(Pn=0,ee--,e)throw t}function vi(t){if(ee>0)return t();ee++;try{return t()}finally{un()}}let Y,$e;function kr(t){const e=Y;Y=void 0;try{return t()}finally{Y=e}}let ee=0,Pn=0,Qe=0;function _r(t){if(Y===void 0)return;let e=t.n;return e===void 0||e.t!==Y?(e={i:0,S:t,p:Y.s,n:void 0,t:Y,e:void 0,x:void 0,r:e},Y.s!==void 0&&(Y.s.n=e),Y.s=e,t.n=e,32&Y.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=Y.s,e.n=void 0,Y.s.n=e,Y.s=e),e):void 0}function ht(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Be(t,e){return new ht(t,e)}function wo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Cr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function po(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function de(t,e){ht.call(this,void 0),this.x=t,this.s=void 0,this.g=Qe-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function yi(t,e){return new de(t,e)}function uo(t){const e=t.u;if(t.u=void 0,typeof e=="function"){ee++;const r=Y;Y=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,qn(t),o}finally{Y=r,un()}}}function qn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,uo(t)}function ji(t){if(Y!==this)throw new Error("Out-of-order effect");po(this),Y=t,this.f&=-2,8&this.f&&qn(this),un()}function _e(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function re(t,e){const r=new _e(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function mn(t,e={}){const r={};for(const o in t){const s=e[o],i=Be(s===void 0?t[o]:s);r[o]=i}return r}ht.prototype.brand=bi,ht.prototype.h=function(){return!0},ht.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:kr(()=>{var r;(r=this.W)==null||r.call(this)}))},ht.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&kr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},ht.prototype.subscribe=function(t){return re(()=>{const e=this.value,r=Y;Y=void 0;try{t(e)}finally{Y=r}},{name:"sub"})},ht.prototype.valueOf=function(){return this.value},ht.prototype.toString=function(){return this.value+""},ht.prototype.toJSON=function(){return this.value},ht.prototype.peek=function(){const t=Y;Y=void 0;try{return this.value}finally{Y=t}},Object.defineProperty(ht.prototype,"value",{get(){const t=_r(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Pn>100)throw new Error("Cycle detected");this.v=t,this.i++,Qe++,ee++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{un()}}}}),de.prototype=new ht,de.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Qe))return!0;if(this.g=Qe,this.f|=1,this.i>0&&!wo(this))return this.f&=-2,!0;const t=Y;try{Cr(this),Y=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Y=t,po(this),this.f&=-2,!0},de.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}ht.prototype.S.call(this,t)},de.prototype.U=function(t){if(this.t!==void 0&&(ht.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},de.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(de.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=_r(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),_e.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},_e.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,uo(this),Cr(this),ee++;const t=Y;return Y=this,ji.bind(this,t)},_e.prototype.N=function(){2&this.f||(this.f|=2,this.o=$e,$e=this)},_e.prototype.d=function(){this.f|=8,1&this.f||qn(this)},_e.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>mn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return re(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function mo(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function fo(t,e=mo){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>mn(e),config:x.safeCast({$onClear:mo}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return re(()=>fo(t,o.value))}});function Ni(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const yn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class ho extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:yn}]})}getFormat(){return x.$getState(this,yn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,yn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function ki(t){return t instanceof ho}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[ho],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())ki(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function go(t,e){let r;return Be(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const Ln=x.defineExtension({build:t=>go(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function X(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function xo(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=xo(r[s],o[s]);return t}return e}const Un=0,$n=1,bo=2,jn=3,Je=4,ke=5,Nn=6,Ae=7;function kn(t){return t.id===Un}function vo(t){return t.id===bo}function _i(t){return function(e){return e.id===$n}(t)||X(305,String(t.id),String($n)),Object.assign(t,{id:bo})}const Ci=new Set;class Ei{constructor(e,r){ft(this,"builder");ft(this,"configs");ft(this,"_dependency");ft(this,"_peerNameSet");ft(this,"extension");ft(this,"state");ft(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Un}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;vo(r)||X(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,d,w){return Object.assign(c,{config:d,id:jn,registerState:w})}(r,this.mergeConfigs(),o);let a;this.state=i,this.extension.init&&(a=this.extension.init(e,i.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:Je,initResult:d,registerState:w})}(i,a,s)}build(e){const r=this.state;let o;r.id!==Je&&X(307,String(r.id),String(ke)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,a,c){return Object.assign(i,{id:ke,output:a,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==ke&&X(308,String(o.id),String(ke));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:Nn})}(o),()=>{const i=this.state;i.id!==Ae&&X(309,String(o.id),String(Ae)),this.state=function(a){return Object.assign(a,{id:ke})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==Nn&&X(310,String(r.id),String(Nn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ae})}(r),o}getSignal(){return this._signal===void 0&&X(311),this._signal}getInitResult(){this.extension.init===void 0&&X(312,this.extension.name);const e=this.state;return function(r){return r.id>=Je}(e)||X(313,String(e.id),String(Je)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=jn}(e)||X(314,String(e.id),String(jn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&X(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&X(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Ae}(e)||X(316,String(e.id),String(Ae)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Ci}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=ke})(e)||X(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Er={tag:x.HISTORY_MERGE_TAG};function Si(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Ri=x.defineExtension({config:x.safeCast({setOptions:Er,updateOptions:Er}),init:({$initialEditorState:t=Si})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const a=t.parseEditorState(i);t.setEditorState(a,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Sr=Symbol.for("@lexical/extension/LexicalBuilder");function Rr(){}function Ti(t){throw t}function Ze(t){return Array.isArray(t)?t:[t]}const _n="0.41.0+prod.esm";class Fe{constructor(e){ft(this,"roots");ft(this,"extensionNameMap");ft(this,"outgoingConfigEdges");ft(this,"incomingEdges");ft(this,"conflicts");ft(this,"_sortedExtensionReps");ft(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=_n,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Ze(Ri)];for(const o of e)r.push(Ze(o));return new Fe(r)}static maybeFromEditor(e){const r=e[Sr];return r&&(r.PACKAGE_VERSION!==_n&&X(292,r.PACKAGE_VERSION,_n),r instanceof Fe||X(293)),r}static fromEditor(e){const r=Fe.maybeFromEditor(e);return r===void 0&&X(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[Sr]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=Rr;function r(){try{e()}finally{e=Rr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&X(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&X(296);const r=Ze(e),[o]=r;typeof o.name!="string"&&X(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&X(298,o.name),!s){s=new Ei(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&X(299,o.name,i);for(const a of o.conflictsWith||[])this.extensionNameMap.has(a)&&X(299,o.name,a),this.conflicts.set(a,o.name);for(const a of o.dependencies||[]){const c=Ze(a);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[a,c]of o.peerDependencies||[])this.addEdge(o.name,a,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(vo(i))return;const a=o.extension.name;var c;kn(i)||X(300,a,s||"[unknown]"),kn(c=i)||X(304,String(c.id),String(Un)),i=Object.assign(c,{id:$n}),o.state=i;const d=this.outgoingConfigEdges.get(a);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&r(p,a)}i=_i(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())kn(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const a=this.extensionNameMap.get(s);if(a)for(const c of i)a.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&X(301,o.name);for(const a of s)i.configs.add(a)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const a of r){const c=a.register(e,i);c&&s.push(c)}for(const a of r){const c=a.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},a={},c=this.sortedExtensionReps();for(const p of c){const{extension:u}=p;if(u.onError!==void 0&&(e.onError=u.onError),u.disableEvents!==void 0&&(e.disableEvents=u.disableEvents),u.parentEditor!==void 0&&(e.parentEditor=u.parentEditor),u.editable!==void 0&&(e.editable=u.editable),u.namespace!==void 0&&(e.namespace=u.namespace),u.$initialEditorState!==void 0&&(e.$initialEditorState=u.$initialEditorState),u.nodes)for(const h of Ni(u)){if(typeof h!="function"){const m=o.get(h.replace);m&&X(302,u.name,h.replace.name,m.extension.name),o.set(h.replace,p)}r.add(h)}if(u.html){if(u.html.export)for(const[h,m]of u.html.export.entries())s.set(h,m);u.html.import&&Object.assign(i,u.html.import)}u.theme&&xo(a,u.theme)}Object.keys(a).length>0&&(e.theme=a),r.size&&(e.nodes=[...r]);const d=Object.keys(i).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=i),w&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=Ti),e}}const Mi=new Set,Tr=x.defineExtension({build(t,e,r){const o=r.getDependency(Ln).output,s=Be({watchedNodeKeys:new Map}),i=go(()=>{},()=>re(()=>{const a=i.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,u]of c.entries()){if(u.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),m=h&&h.isSelected()||!1;w=w||m!==(!!a&&a.has(p)),m&&(d=d||new Set,d.add(p))}}),!w&&d&&a&&d.size===a.size||(i.value=d)}));return{watchNodeKey:function(a){const c=yi(()=>(i.value||Mi).has(a)),{watchedNodeKeys:d}=s.peek();let w=d.get(a);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(a,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[Ln],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Re extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Re(e.__key)}static importJSON(e){return yo().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Di,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Di(){return{node:yo()}}function yo(){return x.$create(Re)}function Ii(t){return t instanceof Re}x.defineExtension({dependencies:[Ln,Tr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Re],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Tr).output,s=Be({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,a=>{if(x.isDOMNode(a.target)){const c=x.$getNodeFromDOMNode(a.target);if(Ii(c))return function(d,w=!1){const p=x.$getSelection(),u=d.isSelected(),h=d.getKey();let m;w&&x.$isNodeSelection(p)?m=p:(m=x.$createNodeSelection(),x.$setSelection(m)),u?m.delete(h):m.add(h)}(c,a.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(Re,(a,c)=>{vi(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,u]of a.entries())if(u==="destroyed")w.delete(p),d=!0;else{const h=w.get(p),m=t.getElementByKey(p);h?h.domNode.value=m:(d=!0,w.set(p,{domNode:Be(m),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),re(()=>{const a=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())a.push(re(()=>{const w=c.value;w&&(d.value?x.addClassNamesToElement(w,i):x.removeClassNamesFromElement(w,i))}));return x.mergeRegister(...a)}))}});function jo(t){return t.canBeEmpty()}function Oi(t,e,r=jo){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(a){if(a.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const c=a.anchor,d=a.focus,w=d.isBefore(c)?d:c,p=w.getNode(),u=gi(p);if(u.canIndent()){const h=u.getKey();let m=x.$createRangeSelection();if(m.anchor.set(h,0,"element"),m.focus.set(h,0,"element"),m=x.$normalizeSelection__EXPERIMENTAL(m),m.anchor.is(w))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return xi(a=>{if(i(a)){const c=a.getIndent()+1;(!o||c<o)&&a.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>mn(e),config:x.safeCast({$canIndent:jo,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return re(()=>{if(!o.value)return Oi(t,s,i)})}});const Ai=x.defineExtension({name:"@lexical/react/ReactProvider"});function Pi(){return x.$getRoot().getTextContent()}function Li(t,e=!0){if(t)return!1;let r=Pi();return e&&(r=r.trim()),r===""}function $i(t){if(!Li(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),a=i.length;for(let c=0;c<a;c++){const d=i[o];if(!x.$isTextNode(d))return!1}}}return!0}function No(t){return()=>$i(t)}function ko(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let a;try{a=JSON.parse(i)}catch{return}if(a&&a.protocol==="nuanria_messaging"&&a.type==="request"){const c=a.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,u,h,m]=d;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const y=g.anchor;let b=y.getNode(),N=0,k=0;if(x.$isTextNode(b)&&w>=0&&p>=0&&(N=w,k=w+p,g.setTextNodeRange(b,N,b,k)),N===k&&u===""||(g.insertRawText(u),b=y.getNode()),x.$isTextNode(b)){N=h,k=h+m;const C=b.getTextContentSize();N=N>C?C:N,k=k>C?C:k,g.setTextNodeRange(b,N,b,k)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>mn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>re(()=>r.getOutput().disabled.value?void 0:ko(t))});function Fi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Hn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Vi({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=l.useState(()=>r.getDecorators());return Hn(()=>r.registerDecoratorListener(a=>{yr.flushSync(()=>{i(a)})}),[r]),l.useEffect(()=>{i(r.getDecorators())},[r]),l.useMemo(()=>{const a=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(l.Suspense,{fallback:null,children:s[w]})}),u=r.getElementByKey(w);u!==null&&a.push(yr.createPortal(p,u,w))}return a},[o,s,r])}(t,e)}function zi({editor:t,ErrorBoundary:e}){return function(r){const o=Fe.maybeFromEditor(r);if(o&&o.hasExtensionByName(Ai.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Fi(320,s);return!0}return!1}(t)?null:n.jsx(Vi,{editor:t,ErrorBoundary:e})}function Mr(t){return t.getEditorState().read(No(t.isComposing()))}function Bi({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Ht();return function(s){Hn(()=>x.mergeRegister(Mn.registerRichText(s),ko(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Gi,{content:e}),n.jsx(zi,{editor:o,ErrorBoundary:r})]})}function Gi({content:t}){const[e]=Ht(),r=function(s){const[i,a]=l.useState(()=>Mr(s));return Hn(()=>{function c(){const d=Mr(s);a(d)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(e),o=ui();return r?typeof t=="function"?t(o):t:null}function Ki({defaultSelection:t}){const[e]=Ht();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const qi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ui({onClear:t}){const[e]=Ht();return qi(()=>fo(e,t),[e,t]),null}const _o=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Hi({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:a,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:u,ariaRequired:h,autoCapitalize:m,className:g,id:y,role:b="textbox",spellCheck:N=!0,style:k,tabIndex:C,"data-testid":E,...V},F){const[R,L]=l.useState(t.isEditable()),S=l.useCallback($=>{$&&$.ownerDocument&&$.ownerDocument.defaultView?t.setRootElement($):t.setRootElement(null)},[t]),M=l.useMemo(()=>function(...$){return P=>{for(const I of $)typeof I=="function"?I(P):I!=null&&(I.current=P)}}(F,S),[S,F]);return _o(()=>(L(t.isEditable()),t.registerEditableListener($=>{L($)})),[t]),n.jsx("div",{"aria-activedescendant":R?e:void 0,"aria-autocomplete":R?r:"none","aria-controls":R?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":R&&b==="combobox"?!!a:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":R?u:void 0,"aria-readonly":!R||void 0,"aria-required":h,autoCapitalize:m,className:g,contentEditable:R,"data-testid":E,id:y,ref:M,role:b,spellCheck:N,style:k,tabIndex:C,...V})}const Yi=l.forwardRef(Hi);function Dr(t){return t.getEditorState().read(No(t.isComposing()))}const Xi=l.forwardRef(Wi);function Wi(t,e){const{placeholder:r,...o}=t,[s]=Ht();return n.jsxs(n.Fragment,{children:[n.jsx(Yi,{editor:s,...o,ref:e}),r!=null&&n.jsx(Ji,{editor:s,content:r})]})}function Ji({content:t,editor:e}){const r=function(a){const[c,d]=l.useState(()=>Dr(a));return _o(()=>{function w(){const p=Dr(a);d(p)}return w(),x.mergeRegister(a.registerUpdateListener(()=>{w()}),a.registerEditableListener(()=>{w()}))},[a]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(a=>{s(a)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function Zi({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Xi,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Co=l.createContext(void 0);function Qi({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const a=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Co.Provider,{value:a,children:i})}function Eo(){const t=l.useContext(Co);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function tl(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:i,content:a}=t;return n.jsx(Ba,{open:!0,onOpenChange:r,children:n.jsxs(Xr,{children:[n.jsx(Wr,{children:n.jsx(Jr,{children:i})}),a]})})},[t,r]),s=l.useCallback((i,a,c=!1)=>{e({closeOnClickOutside:c,content:a(r),title:i})},[r]);return[o,s]}function el({children:t}){const[e]=Ht(),[r,o]=l.useState(e),[s,i]=l.useState("paragraph"),[a,c]=tl(),d=()=>{};return l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Qi,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:i,showModal:c,children:[a,t({blockType:s})]})}function nl(t){const[e]=Ht(),{activeEditor:r}=Eo();l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const So=ae.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),rl=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(Ur.Root,{ref:s,className:f(So({variant:e,size:r,className:t})),...o}));rl.displayName=Ur.Root.displayName;const Ro=l.createContext({size:"default",variant:"default"}),fn=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},i)=>{const a=dt();return n.jsx(wn.Root,{ref:i,className:f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:a,children:n.jsx(Ro.Provider,{value:{variant:e,size:r},children:o})})});fn.displayName=wn.Root.displayName;const Ee=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},i)=>{const a=l.useContext(Ro);return n.jsx(wn.Item,{ref:i,className:f(So({variant:a.variant||r,size:a.size||o}),t),...s,children:e})});Ee.displayName=wn.Item.displayName;const Ir=[{format:"bold",icon:_.BoldIcon,label:"Bold"},{format:"italic",icon:_.ItalicIcon,label:"Italic"}];function ol(){const{activeEditor:t}=Eo(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(x.$isRangeSelection(s)||ka.$isTableSelection(s)){const i=[];Ir.forEach(({format:a})=>{s.hasFormat(a)&&i.push(a)}),r(a=>a.length!==i.length||!i.every(c=>a.includes(c))?i:a)}},[]);return nl(o),n.jsx(fn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Ir.map(({format:s,icon:i,label:a})=>n.jsx(Ee,{value:s,"aria-label":a,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function sl({onClear:t}){const[e]=Ht();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function al({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(el,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(ol,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Bi,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Zi,{placeholder:t})}),ErrorBoundary:di}),e&&n.jsx(Ki,{defaultSelection:"rootEnd"}),n.jsx(sl,{onClear:r}),n.jsx(Ui,{})]})]})}const il={namespace:"commentEditor",theme:Gn,nodes:Kn,onError:t=>{console.error(t)}};function nn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:a,className:c}){return n.jsx("div",{className:f("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(oi,{initialConfig:{...il,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(xt,{children:[n.jsx(al,{placeholder:s,autoFocus:i,onClear:a}),n.jsx(ai,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function ll(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!Mo.has(i.nodeName)){const a=Do(i,t,s,!1);a!==null&&(o=o.concat(a))}return function(i){for(const a of i)a.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&a.insertAfter(x.$createLineBreakNode());for(const a of i){const c=a.getChildren();for(const d of c)a.insertBefore(d);a.remove()}}(s),o}function cl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)To(t,o[s],r,e);return r.innerHTML}function To(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let a=e;o!==null&&x.$isTextNode(e)&&(a=mi(o,e,"clone"));const c=x.$isElementNode(a)?a.getChildren():[],d=x.getRegisteredNode(t,a.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,a):a.exportDOM(t);const{element:p,after:u}=w;if(!p)return!1;const h=document.createDocumentFragment();for(let m=0;m<c.length;m++){const g=c[m],y=To(t,g,h,o);!s&&x.$isElementNode(e)&&y&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),u){const m=u.call(a,p);m&&(x.isDocumentFragment(p)?p.replaceChildren(m):p.replaceWith(m))}}else r.append(h);return s}const Mo=new Set(["STYLE","SCRIPT"]);function Do(t,e,r,o,s=new Map,i){let a=[];if(Mo.has(t.nodeName))return a;let c=null;const d=function(g,y){const{nodeName:b}=g,N=y._htmlConversions.get(b.toLowerCase());let k=null;if(N!==void 0)for(const C of N){const E=C(g);E!==null&&(k===null||(k.priority||0)<=(E.priority||0))&&(k=E)}return k!==null?k.conversion:null}(t,e),w=d?d(t):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,y]of s)if(c=y(c,i),!c)break;c&&a.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const u=t.childNodes;let h=[];const m=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<u.length;g++)h.push(...Do(u[g],e,r,m,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=dl(t,h,m?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?a=a.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(a=a.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),a}function dl(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let a=0;a<e.length;a++){const c=e[a];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),a===e.length-1||a<e.length-1&&x.$isBlockElementNode(e[a+1])){const d=r();d.setFormat(o),d.append(...i),s.push(d),i=[]}}return s}function Io(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Oo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Oo(e.children)):!1}function Mt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Oo(t.root.children):!1}function wl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Br.createHeadlessEditor({namespace:"EditorUtils",theme:Gn,nodes:Kn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=ll(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function rn(t){const e=Br.createHeadlessEditor({namespace:"EditorUtils",theme:Gn,nodes:Kn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=cl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Yn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function tn(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Xn(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const pl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Cn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function ul({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=l.useState(pl),[a,c]=l.useState(void 0),[d,w]=l.useState(!1),p=l.useRef(void 0),u=l.useRef(null);l.useEffect(()=>{let N=!0;const k=u.current;if(!k)return;const C=setTimeout(()=>{N&&Io(k)},300);return()=>{N=!1,clearTimeout(C)}},[]);const h=l.useCallback(()=>{if(!Mt(s))return;const N=rn(s);e(N,a)},[s,e,a]),m=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",y=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:n.jsx(z,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(_.X,{})})}),n.jsx(bt,{children:n.jsx("p",{children:y})})]})}),n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:n.jsx(z,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Mt(s),children:n.jsx(_.Check,{})})}),n.jsx(bt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Ut,{open:d,onOpenChange:w,children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(z,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(_.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Cn(a!==void 0?a:"",o)})]})}),n.jsx(At,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:N=>{N.key==="Escape"&&(N.stopPropagation(),w(!1))},children:n.jsx(Kt,{children:n.jsx(qt,{children:t.map(N=>n.jsx(Ot,{onSelect:()=>{c(N===""?void 0:N),w(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Cn(N,o)})},N||"unassigned"))})})})]})}),n.jsx("div",{ref:u,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:N=>{N.key==="Escape"?(N.preventDefault(),N.stopPropagation(),r()):Xn(N)&&(N.preventDefault(),N.stopPropagation(),Mt(s)&&h())},onKeyDown:N=>{Yn(N),(N.key==="Enter"||N.key===" ")&&N.stopPropagation()},children:n.jsx(nn,{editorSerializedState:s,onSerializedChange:N=>i(N),placeholder:m,onClear:N=>{p.current=N}})})]})}const ml=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),fl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],hl=["input","select","textarea","button"],gl=["button","textbox"],Ao=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[i,a]=l.useState(void 0),[c,d]=l.useState(void 0),w=l.useCallback(m=>{a(m);const g=t.find(b=>b.id===m);g&&(e==null||e(g));const y=document.getElementById(m);y&&(y.scrollIntoView({block:"center"}),y.focus()),s.current&&s.current.setAttribute("aria-activedescendant",m)},[e,t]),p=l.useCallback(m=>{const g=t.find(y=>y.id===m);g&&(d(y=>y===m?void 0:m),r==null||r(g))},[r,t]),u=m=>{if(!m)return!1;const g=m.tagName.toLowerCase();if(m.isContentEditable||hl.includes(g))return!0;const y=m.getAttribute("role");if(y&&gl.includes(y))return!0;const b=m.getAttribute("tabindex");return b!==void 0&&b!=="-1"},h=l.useCallback(m=>{var R;const g=m.target,y=L=>L?document.getElementById(L):void 0,b=y(c),N=y(i);if(!!(b&&g&&b.contains(g)&&g!==b)&&u(g)){if(m.key==="Escape"||m.key==="ArrowLeft"&&!g.isContentEditable){if(c){m.preventDefault(),m.stopPropagation();const L=t.find(S=>S.id===c);L&&w(L.id)}return}if(m.key==="ArrowDown"||m.key==="ArrowUp"){if(!b)return;const L=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(L.length===0)return;const S=L.findIndex($=>$===g);if(S===-1)return;let M;m.key==="ArrowDown"?M=Math.min(S+1,L.length-1):M=Math.max(S-1,0),M!==S&&(m.preventDefault(),m.stopPropagation(),(R=L[M])==null||R.focus());return}return}const E=t.findIndex(L=>L.id===i);let V=E;switch(m.key){case"ArrowDown":V=Math.min(E+1,t.length-1),m.preventDefault();break;case"ArrowUp":V=Math.max(E-1,0),m.preventDefault();break;case"Home":V=0,m.preventDefault();break;case"End":V=t.length-1,m.preventDefault();break;case" ":case"Enter":i&&p(i),m.preventDefault(),m.stopPropagation();return;case"ArrowRight":{const L=N;if(L){const S=L.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),M=L.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),$=S??M;if($){m.preventDefault(),$.focus();return}}break}default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(u(g)||(o==null||o(m.key),m.preventDefault()));return}const F=t[V];F&&w(F.id)},[t,w,i,c,p,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:h,focusOption:w}},Po=ae.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),me=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:f("pr-twp",Po({variant:e}),t),...r}));me.displayName="Badge";const Wn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Wn.displayName="Card";const Lo=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Lo.displayName="CardHeader";const $o=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:f("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));$o.displayName="CardTitle";const Fo=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:f("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Fo.displayName="CardDescription";const Jn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-p-6 tw-pt-0",t),...e}));Jn.displayName="CardContent";const Vo=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Vo.displayName="CardFooter";const fe=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(Hr.Root,{ref:s,decorative:r,orientation:e,className:f("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));fe.displayName=Hr.Root.displayName;const Zn=l.forwardRef(({className:t,...e},r)=>n.jsx(De.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Zn.displayName=De.Root.displayName;const zo=l.forwardRef(({className:t,...e},r)=>n.jsx(De.Image,{ref:r,className:f("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));zo.displayName=De.Image.displayName;const Qn=l.forwardRef(({className:t,...e},r)=>n.jsx(De.Fallback,{ref:r,className:f("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Qn.displayName=De.Fallback.displayName;const tr=l.createContext(void 0);function Pt(){const t=l.useContext(tr);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Jt=ae.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),be=J.Trigger,er=J.Group,Bo=J.Portal,Go=J.Sub,Ko=J.RadioGroup;function ie({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(tr.Provider,{value:r,children:n.jsx(J.Root,{...e})})}const nr=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=Pt();return n.jsxs(J.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Jt({variant:i.variant})),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});nr.displayName=J.SubTrigger.displayName;const rr=l.forwardRef(({className:t,...e},r)=>n.jsx(J.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));rr.displayName=J.SubContent.displayName;const Zt=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const i=dt();return n.jsx(J.Portal,{children:n.jsx(J.Content,{ref:s,sideOffset:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});Zt.displayName=J.Content.displayName;const Ge=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=dt(),i=Pt();return n.jsx(J.Item,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Jt({variant:i.variant})),...r,dir:s})});Ge.displayName=J.Item.displayName;const Bt=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=Pt();return n.jsxs(J.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Jt({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Bt.displayName=J.CheckboxItem.displayName;const or=l.forwardRef(({className:t,children:e,...r},o)=>{const s=Pt();return n.jsxs(J.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Jt({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});or.displayName=J.RadioItem.displayName;const Oe=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(J.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Oe.displayName=J.Label.displayName;const ve=l.forwardRef(({className:t,...e},r)=>n.jsx(J.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ve.displayName=J.Separator.displayName;function qo({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}qo.displayName="DropdownMenuShortcut";function Or({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:a,canEditOrDelete:c=!1}){const[d,w]=l.useState(!1),[p,u]=l.useState(),h=l.useRef(null);l.useEffect(()=>{if(!d)return;let E=!0;const V=h.current;if(!V)return;const F=setTimeout(()=>{E&&Io(V)},300);return()=>{E=!1,clearTimeout(F)}},[d]);const m=l.useCallback(E=>{E&&E.stopPropagation(),w(!1),u(void 0),a==null||a(!1)},[a]),g=l.useCallback(async E=>{if(E&&E.stopPropagation(),!p||!s)return;await s(t.id,rn(p))&&(w(!1),u(void 0),a==null||a(!1))},[p,s,t.id,a]),y=l.useMemo(()=>{const E=new Date(t.date),V=j.formatRelativeDate(E,r["%comment_date_today%"],r["%comment_date_yesterday%"]),F=E.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return j.formatReplacementString(r["%comment_dateAtTime%"],{date:V,time:F})},[t.date,r]),b=l.useMemo(()=>t.user,[t.user]),N=l.useMemo(()=>t.user.split(" ").map(E=>E[0]).join("").toUpperCase().slice(0,2),[t.user]),k=l.useMemo(()=>j.sanitizeHtml(t.contents),[t.contents]),C=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ge,{onClick:E=>{E.stopPropagation(),w(!0),u(wl(t.contents)),a==null||a(!0)},children:[n.jsx(_.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ge,{onClick:async E=>{E.stopPropagation(),i&&await i(t.id)},children:[n.jsx(_.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,i,a]);return n.jsxs("div",{className:f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(Zn,{className:"tw-h-8 tw-w-8",children:n.jsx(Qn,{className:"tw-text-xs tw-font-medium",children:N})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:y}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(me,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",tn(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:E=>{E.key==="Escape"?(E.preventDefault(),E.stopPropagation(),m()):Xn(E)&&(E.preventDefault(),E.stopPropagation(),Mt(p)&&g())},onKeyDown:E=>{Yn(E),(E.key==="Enter"||E.key===" ")&&E.stopPropagation()},onClick:E=>{E.stopPropagation()},children:[n.jsx(nn,{className:f('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:E=>u(E)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(z,{size:"icon",onClick:m,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(_.X,{})}),n.jsx(z,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Mt(p),children:n.jsx(_.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:f("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:k}})]})]}),C&&n.jsxs(ie,{children:[n.jsx(be,{asChild:!0,children:n.jsx(z,{variant:"ghost",size:"icon",children:n.jsx(_.MoreHorizontal,{})})}),n.jsx(Zt,{align:"end",children:C})]})]})}const Ar={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function xl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:a,handleSelectThread:c,threadId:d,thread:w,threadStatus:p,handleAddCommentToThread:u,handleUpdateComment:h,handleDeleteComment:m,handleReadStatusChange:g,assignableUsers:y,canUserAddCommentToThread:b,canUserAssignThreadCallback:N,canUserResolveThreadCallback:k,canUserEditOrDeleteCommentCallback:C,isRead:E=!1,autoReadDelay:V=5,onVerseRefClick:F}){const[R,L]=l.useState(Ar),[S,M]=l.useState(void 0),$=o,[P,I]=l.useState(!1),[A,q]=l.useState(!1),[D,H]=l.useState(!1),[jt,Rt]=l.useState(!1),[Ct,wt]=l.useState(!1),[at,G]=l.useState(E),[tt,et]=l.useState(!1),rt=l.useRef(void 0),[ut,le]=l.useState(new Map);l.useEffect(()=>{let T=!0;return(async()=>{const Et=k?await k(d):!1;T&&wt(Et)})(),()=>{T=!1}},[d,k]),l.useEffect(()=>{let T=!0;if(!o){Rt(!1),le(new Map);return}return(async()=>{const Et=N?await N(d):!1;T&&Rt(Et)})(),()=>{T=!1}},[o,d,N]);const Lt=l.useMemo(()=>e.filter(T=>!T.deleted),[e]);l.useEffect(()=>{let T=!0;if(!o||!C){le(new Map);return}return(async()=>{const Et=new Map;await Promise.all(Lt.map(async vr=>{const fa=await C(vr.id);T&&Et.set(vr.id,fa)})),T&&le(Et)})(),()=>{T=!1}},[o,Lt,C]);const Yt=l.useMemo(()=>Lt[0],[Lt]),je=l.useRef(null),Qt=l.useRef(void 0),Xt=l.useCallback(()=>{var T;(T=Qt.current)==null||T.call(Qt),L(Ar)},[]),Ne=l.useCallback(()=>{const T=!at;G(T),et(!T),g==null||g(d,T)},[at,g,d]);l.useEffect(()=>{I(!1)},[o]),l.useEffect(()=>{if(o&&!at&&!tt){const T=setTimeout(()=>{G(!0),g==null||g(d,!0)},V*1e3);return rt.current=T,()=>clearTimeout(T)}rt.current&&(clearTimeout(rt.current),rt.current=void 0)},[o,at,tt,V,d,g]);const v=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),O=l.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const T=tn(i,r);return j.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:T})},[i,r]),K=l.useMemo(()=>Lt.slice(1),[Lt]),B=l.useMemo(()=>K.length??0,[K.length]),U=l.useMemo(()=>B>0,[B]),ot=l.useMemo(()=>P||B<=2?K:K.slice(-2),[K,B,P]),W=l.useMemo(()=>P||B<=2?0:B-2,[B,P]),pt=l.useMemo(()=>B===1?v.singleReply:j.formatReplacementString(v.multipleReplies,{count:B}),[B,v]),nt=l.useMemo(()=>W===1?v.singleReply:j.formatReplacementString(v.multipleReplies,{count:W}),[W,v]);l.useEffect(()=>{!o&&A&&U&&q(!1)},[o,A,U]);const Tt=l.useCallback(async T=>{T&&T.stopPropagation();const mt=Mt(R)?rn(R):void 0;if(S!==void 0){await u({threadId:d,contents:mt,assignedUser:S})&&(M(void 0),mt&&Xt());return}mt&&await u({threadId:d,contents:mt})&&Xt()},[Xt,R,u,S,d]),$t=l.useCallback(async T=>{const mt=Mt(R)?rn(R):void 0,Et=await u({...T,contents:mt,assignedUser:S??T.assignedUser});return Et&&mt&&Xt(),Et&&S!==void 0&&M(void 0),Et},[Xt,R,u,S]);return n.jsx(Wn,{role:"option","aria-selected":o,id:d,className:f("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&at,"tw-bg-background":o&&p!=="Resolved"&&at,"tw-bg-muted":p==="Resolved","tw-bg-blue-50":!at&&!o&&p!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(Jn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[O&&n.jsx(me,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:O}),n.jsx(z,{variant:"ghost",size:"icon",onClick:T=>{T.stopPropagation(),Ne()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":at?"Mark as unread":"Mark as read",children:at?n.jsx(_.MailOpen,{}):n.jsx(_.Mail,{})}),Ct&&p!=="Resolved"&&n.jsx(z,{variant:"ghost",size:"icon",className:f("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:T=>{T.stopPropagation(),$t({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:je,className:f("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":$},{"tw-whitespace-nowrap":!$}),children:[s&&F?n.jsx(z,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:T=>{T.stopPropagation(),F(w)},children:s}):s,n.jsxs("span",{className:t,children:[Yt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Yt.selectedText}),Yt.contextAfter]})]})}),n.jsx(Or,{comment:Yt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:$t,handleUpdateComment:h,handleDeleteComment:m,onEditingChange:q,canEditOrDelete:(!A&&ut.get(Yt.id))??!1,canUserResolveThread:Ct})]}),n.jsxs(n.Fragment,{children:[U&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(fe,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:pt})]}),!o&&Mt(R)&&n.jsx(nn,{editorSerializedState:R,onSerializedChange:T=>L(T),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[W>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:T=>{T.stopPropagation(),I(!0)},role:"button",tabIndex:0,onKeyDown:T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),T.stopPropagation(),I(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(fe,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:nt}),P?n.jsx(_.ChevronUp,{}):n.jsx(_.ChevronDown,{})]})]}),ot.map(T=>n.jsx("div",{children:n.jsx(Or,{comment:T,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:m,onEditingChange:q,canEditOrDelete:(!A&&ut.get(T.id))??!1})},T.id)),b!==!1&&(!A||Mt(R))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:T=>T.stopPropagation(),onKeyDownCapture:T=>{Xn(T)&&(T.preventDefault(),T.stopPropagation(),(Mt(R)||S!==void 0)&&Tt())},onKeyDown:T=>{Yn(T),(T.key==="Enter"||T.key===" ")&&T.stopPropagation()},children:[n.jsx(nn,{editorSerializedState:R,onSerializedChange:T=>L(T),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:T=>{Qt.current=T}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[S!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:j.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:tn(S,r)})}),n.jsxs(Ut,{open:D,onOpenChange:H,children:[n.jsx(Wt,{asChild:!0,children:n.jsx(z,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!jt||!y||y.length===0||!y.includes(a),"aria-label":"Assign user",children:n.jsx(_.AtSign,{})})}),n.jsx(At,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:T=>{T.key==="Escape"&&(T.stopPropagation(),H(!1))},children:n.jsx(Kt,{children:n.jsx(qt,{children:y==null?void 0:y.map(T=>n.jsx(Ot,{onSelect:()=>{M(T!==i?T:void 0),H(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:tn(T,r)})},T||"unassigned"))})})})]}),n.jsx(z,{size:"icon",onClick:Tt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Mt(R)&&S===void 0,"aria-label":"Submit comment",children:n.jsx(_.ArrowUp,{})})]})]})]})]})]})})}function bl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:m,selectedThreadId:g,onSelectedThreadChange:y,onVerseRefClick:b}){const[N,k]=l.useState(new Set),[C,E]=l.useState();l.useEffect(()=>{g&&(k(I=>new Set(I).add(g)),E(g))},[g]);const V=r.filter(I=>I.comments.some(A=>!A.deleted)),F=V.map(I=>({id:I.id})),R=l.useCallback(I=>{k(A=>new Set(A).add(I.id)),E(I.id),y==null||y(I.id)},[y]),L=l.useCallback(I=>{const A=N.has(I);k(q=>{const D=new Set(q);return D.has(I)?D.delete(I):D.add(I),D}),E(I),y==null||y(A?void 0:I)},[N,y]),{listboxRef:S,activeId:M,handleKeyDown:$}=Ao({options:F,onOptionSelect:R}),P=l.useCallback(I=>{I.key==="Escape"?(C&&N.has(C)&&(k(A=>{const q=new Set(A);return q.delete(C),q}),E(void 0),y==null||y(void 0)),I.preventDefault(),I.stopPropagation()):$(I)},[C,N,$,y]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:S,"aria-activedescendant":M??void 0,"aria-label":"Comments",className:f("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:P,children:V.map(I=>n.jsx("div",{id:I.id,className:f({"tw-opacity-60":I.status==="Resolved"}),children:n.jsx(xl,{classNameForVerseText:e,comments:I.comments,localizedStrings:s,verseRef:I.verseRef,handleSelectThread:L,threadId:I.id,thread:I,isRead:I.isRead,isSelected:N.has(I.id),currentUser:o,assignedUser:I.assignedUser,threadStatus:I.status,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:m,onVerseRefClick:b})},I.id))})}function vl({table:t}){return n.jsxs(ie,{children:[n.jsx(Gr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(z,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(_.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Zt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Oe,{children:"Toggle columns"}),n.jsx(ve,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Bt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const he=st.Root,Uo=st.Group,ge=st.Value,Ho=ae.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),oe=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const i=dt();return n.jsxs(st.Trigger,{className:f(Ho({size:r,className:t})),ref:s,...o,dir:i,children:[e,n.jsx(st.Icon,{asChild:!0,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});oe.displayName=st.Trigger.displayName;const sr=l.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollUpButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(_.ChevronUp,{className:"tw-h-4 tw-w-4"})}));sr.displayName=st.ScrollUpButton.displayName;const ar=l.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollDownButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4"})}));ar.displayName=st.ScrollDownButton.displayName;const se=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const i=dt();return n.jsx(st.Portal,{children:n.jsxs(st.Content,{ref:s,className:f("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(sr,{}),n.jsx(st.Viewport,{className:f("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(ar,{})]})})});se.displayName=st.Content.displayName;const Yo=l.forwardRef(({className:t,...e},r)=>n.jsx(st.Label,{ref:r,className:f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));Yo.displayName=st.Label.displayName;const Nt=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(st.Item,{ref:o,className:f("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(st.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(st.ItemText,{children:e})]}));Nt.displayName=st.Item.displayName;const Xo=l.forwardRef(({className:t,...e},r)=>n.jsx(st.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Xo.displayName=st.Separator.displayName;function yl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(he,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(oe,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(ge,{placeholder:t.getState().pagination.pageSize})}),n.jsx(se,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(Nt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(z,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(_.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(z,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(_.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(z,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(_.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(z,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(_.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Pr=`
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
`;function jl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ke(t,e){const r=e?`${Pr}, ${e}`:Pr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&jl(o))}const qe=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const a=s.current;if(!a)return;const c=()=>{requestAnimationFrame(()=>{Ke(a,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const i=a=>{const{current:c}=s;if(c){if(a.key==="ArrowDown"){a.preventDefault(),Ke(c)[0].focus();return}a.key===" "&&document.activeElement===c&&a.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});qe.displayName="Table";const Ue=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Ue.displayName="TableHeader";const He=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:f("[&_tr:last-child]:tw-border-0",t),...e}));He.displayName="TableBody";const Wo=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Wo.displayName="TableFooter";function Nl(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ke(t.current):[],i=s.indexOf(document.activeElement),a=o.key==="ArrowRight"?i+1:i-1;a>=0&&a<s.length&&s[a].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function kl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function _l(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const zt=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const a=l.useRef(null);l.useEffect(()=>{typeof i=="function"?i(a.current):i&&"current"in i&&(i.current=a.current)},[i]),Nl(a);const c=l.useMemo(()=>a.current?Ke(a.current):[],[a]),d=l.useCallback(p=>{const{current:u}=a;if(!u||!u.parentElement)return;const h=u.closest("table"),m=h?Ke(h).filter(b=>b.tagName==="TR"):[],g=m.indexOf(u),y=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),_l(m,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),kl(c,y,p.key);else if(p.key==="Escape"){p.preventDefault();const b=u.closest("table");b&&b.focus()}e==null||e(p)},[a,c,e]),w=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:a,tabIndex:-1,onKeyDown:d,onFocus:w,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});zt.displayName="TableRow";const Te=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Te.displayName="TableHead";const ne=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));ne.displayName="TableCell";const Jo=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Jo.displayName="TableCaption";function on({className:t,...e}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Zo({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:a=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var F;const[p,u]=l.useState([]),[h,m]=l.useState([]),[g,y]=l.useState({}),[b,N]=l.useState({}),k=l.useMemo(()=>e??[],[e]),C=gt.useReactTable({data:k,columns:t,getCoreRowModel:gt.getCoreRowModel(),...r&&{getPaginationRowModel:gt.getPaginationRowModel()},onSortingChange:u,getSortedRowModel:gt.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:gt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:N,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:b}}),E=C.getVisibleFlatColumns();let V;return d?V=Array.from({length:10}).map((S,M)=>`skeleton-row-${M}`).map(S=>n.jsx(zt,{className:"hover:tw-bg-transparent",children:n.jsx(ne,{colSpan:E.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(on,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},S)):((F=C.getRowModel().rows)==null?void 0:F.length)>0?V=C.getRowModel().rows.map(R=>n.jsx(zt,{onClick:()=>a(R,C),"data-state":R.getIsSelected()&&"selected",children:R.getVisibleCells().map(L=>n.jsx(ne,{children:gt.flexRender(L.column.columnDef.cell,L.getContext())},L.id))},R.id)):V=n.jsx(zt,{children:n.jsx(ne,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(vl,{table:C}),n.jsxs(qe,{stickyHeader:i,children:[n.jsx(Ue,{stickyHeader:i,children:C.getHeaderGroups().map(R=>n.jsx(zt,{children:R.headers.map(L=>n.jsx(Te,{className:"tw-p-0",children:L.isPlaceholder?void 0:gt.flexRender(L.column.columnDef.header,L.getContext())},L.id))},R.id))}),n.jsx(He,{children:V})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(z,{variant:"outline",size:"sm",onClick:()=>C.previousPage(),disabled:!C.getCanPreviousPage(),children:"Previous"}),n.jsx(z,{variant:"outline",size:"sm",onClick:()=>C.nextPage(),disabled:!C.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(yl,{table:C})]})}function Cl({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Ta,{options:i,children:e})})}const Qo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Lr=(t,e)=>t[e]??e;function ts({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Lr(r,"%webView_error_dump_header%"),i=Lr(r,"%webView_error_dump_info_message%");function a(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(z,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>a(),children:n.jsx(_.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const El=Object.freeze([...Qo,"%webView_error_dump_copied_message%"]);function Sl({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[a,c]=l.useState(!1),d=()=>{c(!0),e&&e()},w=p=>{p||c(!1)};return n.jsxs(Ut,{onOpenChange:w,children:[n.jsx(Wt,{asChild:!0,children:o}),n.jsxs(At,{id:i,className:f("tw-min-w-80 tw-max-w-96",s),children:[a&&r["%webView_error_dump_copied_message%"]&&n.jsx(lt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(ts,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var es=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(es||{});function Rl({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[i,a]=l.useState({}),c=(w,p)=>{const u=!o[w][p];s(m=>(m[w][p]=u,{...m}));const h=r[w].items[p];h.onUpdate(h.id,u)},d=(w,p)=>{a(h=>(h[w]=p,{...h}));const u=r[w].items.find(h=>h.id===p);u?u.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(ie,{children:[n.jsx(be,{asChild:!0,children:n.jsxs(z,{variant:"default",children:[n.jsx(_.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(_.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Zt,{children:r.map((w,p)=>n.jsxs("div",{children:[n.jsx(Oe,{children:w.label}),n.jsx(er,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((u,h)=>n.jsx("div",{children:n.jsx(Bt,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:u.label})},u.id))}):n.jsx(Ko,{value:i[p],onValueChange:u=>d(p,u),children:w.items.map(u=>n.jsx("div",{children:n.jsx(or,{value:u.id,children:u.label})},u.id))})}),n.jsx(ve,{})]},w.label))})]})})}function Tl({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:a,handleSupportLinkClick:c}){const d=new j.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,u)=>p+u,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(_.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||a)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(z,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(_.Link,{className:"tw-h-4 tw-w-4"})]})}),a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(z,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(_.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Ml({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function i(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,u=w.getUTCMonth(),h=w.getUTCDate()-1;let m="";return p>0?m=`${p.toString()} year${p===1?"":"s"} ago`:u>0?m=`${u.toString()} month${u===1?"":"s"} ago`:h===0?m="today":m=`${h.toString()} day${h===1?"":"s"} ago`,m}const a=Object.entries(e).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?a:a.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),a.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Dl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const a=l.useMemo(()=>j.formatBytes(r),[r]),d=(w=>{const p=new Intl.DisplayNames(j.getCurrentLocale(),{type:"language"});return w.map(u=>p.of(u))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Ml,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:a})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function ns({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:a="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:u=!1,sortSelected:h=!1,icon:m=void 0,className:g=void 0,variant:y="ghost",id:b}){const[N,k]=l.useState(!1),C=l.useCallback(M=>{var P;const $=(P=t.find(I=>I.label===M))==null?void 0:P.value;$&&r(e.includes($)?e.filter(I=>I!==$):[...e,$])},[t,e,r]),E=()=>d||o,V=l.useMemo(()=>{if(!h)return t;const M=t.filter(P=>P.starred).sort((P,I)=>P.label.localeCompare(I.label)),$=t.filter(P=>!P.starred).sort((P,I)=>{const A=e.includes(P.value),q=e.includes(I.value);return A&&!q?-1:!A&&q?1:P.label.localeCompare(I.label)});return[...M,...$]},[t,e,h]),F=()=>{r(t.map(M=>M.value))},R=()=>{r([])},L=w??N,S=p??k;return n.jsx("div",{id:b,className:g,children:n.jsxs(Ut,{open:L,onOpenChange:S,children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(z,{variant:y,role:"combobox","aria-expanded":L,className:"tw-group tw-w-full tw-justify-between",disabled:u,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[m&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:m})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:E()})]}),n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(At,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Kt,{children:[n.jsx(xe,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(z,{variant:"ghost",size:"sm",onClick:F,children:i}),n.jsx(z,{variant:"ghost",size:"sm",onClick:R,children:a})]}),n.jsxs(qt,{children:[n.jsx(Ie,{children:c}),n.jsx(Gt,{children:V.map(M=>n.jsxs(Ot,{value:M.label,onSelect:C,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(_.Check,{className:f("tw-h-4 tw-w-4",e.includes(M.value)?"tw-opacity-100":"tw-opacity-0")})}),M.starred&&n.jsx(_.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:M.label}),M.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:M.secondaryLabel})]},M.label))})]})]})})]})})}function Il({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:u}){return n.jsxs("div",{id:u,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(ns,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var m;return n.jsxs(me,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(z,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(_.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(g=>g.value===h))==null?void 0:m.label]},h)})}):n.jsx(lt,{children:p})]})}const rs=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),$r=(t,e)=>t[e]??e;function os({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:i=!0,className:a="tw-h-6 tw-w-6",variant:c="ghost"}){const d=l.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:n.jsx(z,{"aria-label":"Undo",className:a,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(_.Undo,{})})}),n.jsx(bt,{children:n.jsxs("p",{children:[$r(s,"%undoButton_tooltip%"),i&&` (${d?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:n.jsx(z,{"aria-label":"Redo",className:a,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(_.Redo,{})})}),n.jsx(bt,{children:n.jsxs("p",{children:[$r(s,"%redoButton_tooltip%"),i&&` (${d?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function ss({children:t,editorRef:e}){const r=l.useRef(null);return l.useEffect(()=>{var a;const o=/Macintosh/i.test(navigator.userAgent),s=((a=r.current)==null?void 0:a.querySelector(".editor-input"))??void 0,i=c=>{var w,p,u,h;if(!s||document.activeElement!==s)return;const d=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(w=e.current)==null||w.undo()):c.shiftKey&&d==="z"&&(c.preventDefault(),(p=e.current)==null||p.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(u=e.current)==null||u.undo()):(d==="y"||c.shiftKey&&d==="z")&&(c.preventDefault(),(h=e.current)==null||h.redo())}};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[e]),n.jsx("div",{ref:r,children:t})}const ye=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));ye.displayName="Input";const Ol=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Al({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=l.useRef(null),a=l.useRef(null),c=l.useRef(!1),[d,w]=l.useState(t),[p,u]=l.useState(r),[h,m]=l.useState(!1);l.useEffect(()=>{w(t)},[t]),l.useEffect(()=>{p!==r&&u(r)},[r]);const g=b=>{c.current=!1,m(b),b||(d!=="custom"||p?(e(d),o(p)):(w(t),u(r)))},y=b=>{var N,k,C,E;b.stopPropagation(),document.activeElement===a.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((N=i.current)==null||N.focus(),c.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((k=a.current)==null||k.focus(),c.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((C=i.current)==null?void 0:C.selectionStart)===0&&((E=a.current)==null||E.focus(),c.current=!1),d==="custom"&&b.key==="Enter"&&(document.activeElement===a.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(ie,{open:h,onOpenChange:g,children:[n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:n.jsx(be,{asChild:!0,children:n.jsx(z,{variant:"outline",className:"tw-h-6",children:Ol(t,s,r)})})}),n.jsx(bt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Zt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:y,onMouseMove:()=>{var b;c.current&&((b=i.current)==null||b.focus())},children:[n.jsx(Oe,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(ve,{}),n.jsx(Bt,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:St.GENERATOR_NOTE_CALLER})]})}),n.jsx(Bt,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:St.HIDDEN_NOTE_CALLER})]})}),n.jsx(Bt,{ref:a,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:b=>{var N;b.stopPropagation(),c.current=!0,(N=i.current)==null||N.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(ye,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),w("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>u(b.target.value)})]})})]})]})}const Pl=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(_.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(_.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(_.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Ll=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),j.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function $l({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(ie,{children:[n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(zr.TooltipTrigger,{asChild:!0,children:n.jsx(be,{asChild:!0,children:n.jsx(z,{variant:"outline",className:"tw-h-6",children:Pl(t,r)})})}),n.jsx(bt,{children:n.jsx("p",{children:Ll(t,r)})})]})}),n.jsxs(Zt,{className:"tw-z-[300]",children:[n.jsx(Oe,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(ve,{}),n.jsxs(Bt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(_.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Bt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(_.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Bt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(_.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const as=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Fl({icon:t,className:e}){const r=t??_.Ban;return n.jsx(r,{className:e,size:16})}function is({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),i=l.useMemo(()=>{const a=o.trim().toLowerCase();return a?e.filter(c=>{var d;return c.marker&&((d=c.marker)==null?void 0:d.toLowerCase().includes(a))||!c.marker&&c.title.toLowerCase().includes(a)}):e},[o,e]);return n.jsxs(Kt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(xe,{className:"marker-menu-search",ref:r,value:o,onValueChange:a=>s(a),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(qt,{children:[n.jsx(Ie,{children:t["%markerMenu_noResults%"]}),n.jsx(Gt,{children:i.map(a=>{var c;return n.jsxs(Ot,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:n.jsx(Fl,{icon:a.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(Qr,{className:"tw-font-sans",children:a.isDisallowed?t["%markerMenu_disallowed_label%"]:t["%markerMenu_deprecated_label%"]})]},`item-${a.marker??((c=a.icon)==null?void 0:c.displayName)}-${a.title.replaceAll(" ","")}`)})})]})]})}function Vl(t,e,r,o){if(!o||o==="p")return[];const s=j.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,a])=>{i.push(...a.map(c=>({marker:c,title:r[j.usfmMarkers[c].description]??j.usfmMarkers[c].description,action:()=>{var d;(d=t.current)==null||d.insertMarker(c),e()}})))}),i.sort((a,c)=>(a.marker??a.title).localeCompare(c.marker??c.title))}function zl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Bl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Gl={type:"USJ",version:"3.1",content:[{type:"para"}]};function Kl({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:a,defaultMarkerMenuTrigger:c,localizedStrings:d,parentEditorRef:w,noteKeyRef:p}){const u=l.useRef(null),h=l.useRef(null),m=l.useRef(null),[g,y]=l.useState("generated"),[b,N]=l.useState("*"),[k,C]=l.useState("f"),[E,V]=l.useState(!1),[F,R]=l.useState(!0),[L,S]=l.useState(!1),M=l.useRef(!1),$=l.useRef(""),[P,I]=l.useState(!1),[A,q]=l.useState(),[D,H]=l.useState(),[jt,Rt]=l.useState(),[Ct,wt]=l.useState(),at=l.useRef(null),G=l.useMemo(()=>({...a,markerMenuTrigger:c,hasExternalUI:!0,view:{...a.view??St.getDefaultViewOptions(),noteMode:"expanded"}}),[a,c]),tt=l.useMemo(()=>Vl(u,()=>I(!1),d,Ct),[d,Ct]);l.useEffect(()=>{var v;P||(v=u.current)==null||v.focus()},[k,P]),l.useEffect(()=>{var K,B;let v;M.current=!1,R(!0);const O=e==null?void 0:e.at(0);if(O&&St.isInsertEmbedOpOfType("note",O)){const U=(K=O.insert.note)==null?void 0:K.caller;let ot="custom";U===St.GENERATOR_NOTE_CALLER?ot="generated":U===St.HIDDEN_NOTE_CALLER?ot="hidden":U&&N(U),y(ot),C(((B=O.insert.note)==null?void 0:B.style)??"f"),v=setTimeout(()=>{var W;(W=u.current)==null||W.applyUpdate([O])},0)}return()=>{v&&clearTimeout(v)}},[e,i]);const et=l.useCallback((v,O,K=!1)=>{var U,ot,W;const B=(ot=(U=u.current)==null?void 0:U.getNoteOps(0))==null?void 0:ot.at(0);if(B&&St.isInsertEmbedOpOfType("note",B)){if(B.insert.note){let nt;v==="custom"?nt=O:v==="generated"?nt=St.GENERATOR_NOTE_CALLER:nt=St.HIDDEN_NOTE_CALLER,B.insert.note.caller=nt}r==null||r([B]);const pt=(p==null?void 0:p.current)??i;K&&w&&pt&&((W=w.current)==null||W.replaceEmbedUpdate(pt,[B]))}},[i,p,r,w]),rt=l.useCallback(()=>{et(g,b,!0),o()},[g,b,o,et]),ut=l.useRef({book:s.book,chapterNum:s.chapterNum});l.useLayoutEffect(()=>{(ut.current.book!==s.book||ut.current.chapterNum!==s.chapterNum)&&(ut.current={book:s.book,chapterNum:s.chapterNum},rt())},[rt,s.book,s.chapterNum]);const le=()=>{var O;const v=(O=h.current)==null?void 0:O.getElementsByClassName("editor-input")[0];v!=null&&v.textContent&&navigator.clipboard.writeText(v.textContent)},Lt=l.useCallback(v=>{y(v),et(v,b)},[b,et]),Yt=l.useCallback(v=>{N(v),et(g,v)},[g,et]),je=v=>{var K,B,U,ot,W;C(v);const O=(B=(K=u.current)==null?void 0:K.getNoteOps(0))==null?void 0:B.at(0);if(O&&St.isInsertEmbedOpOfType("note",O)){O.insert.note&&(O.insert.note.style=v);const pt=(ot=(U=O.insert.note)==null?void 0:U.contents)==null?void 0:ot.ops;k!=="x"&&v==="x"?pt==null||pt.forEach(nt=>zl(nt)):k==="x"&&v!=="x"&&(pt==null||pt.forEach(nt=>Bl(nt))),(W=u.current)==null||W.applyUpdate([O,{delete:1}])}},Qt=v=>{wt(v.contextMarker),S(v.canRedo)},Xt=v=>{var K,B,U,ot,W;const O=(B=(K=u.current)==null?void 0:K.getNoteOps(0))==null?void 0:B.at(0);if(O&&St.isInsertEmbedOpOfType("note",O)){v.content.length>1&&setTimeout(()=>{var Tt;(Tt=u.current)==null||Tt.applyUpdate([{retain:2},{delete:1}])},0);const pt=(U=O.insert.note)==null?void 0:U.style,nt=(W=(ot=O.insert.note)==null?void 0:ot.contents)==null?void 0:W.ops;if(pt||V(!1),V(pt==="x"?!!(nt!=null&&nt.every(Tt=>{var T,mt;if(!((T=Tt.attributes)!=null&&T.char))return!0;const $t=((mt=Tt.attributes)==null?void 0:mt.char).style;return $t==="xt"||$t==="xo"||$t==="xq"})):!!(nt!=null&&nt.every(Tt=>{var T,mt;if(!((T=Tt.attributes)!=null&&T.char))return!0;const $t=((mt=Tt.attributes)==null?void 0:mt.char).style;return $t==="ft"||$t==="fr"||$t==="fq"}))),!M.current){M.current=!0,$.current=JSON.stringify(O),R(!0);return}R(JSON.stringify(O)===$.current),et(g,b)}else V(!1),R(!0)},Ne=l.useCallback(()=>{const v=window.getSelection();if(m.current&&tt.length&&v&&v.rangeCount>0){const O=v.getRangeAt(0).getBoundingClientRect(),K=m.current.getBoundingClientRect();q(O.left-K.left),H(O.top-K.top),Rt(O.height),I(!0)}},[tt,m]);return l.useEffect(()=>{const v=()=>{P&&I(!1)};return window.addEventListener("click",v),()=>{window.removeEventListener("click",v)}},[P]),l.useEffect(()=>{var v;P&&((v=at.current)==null||v.focus())},[P]),l.useEffect(()=>{var K;const v=((K=h.current)==null?void 0:K.querySelector(".editor-input"))??void 0,O=B=>{!P&&v&&document.activeElement===v&&B.key===c?(B.preventDefault(),Ne()):P&&B.key==="Escape"&&(B.preventDefault(),I(!1))};return document.addEventListener("keydown",O),()=>{document.removeEventListener("keydown",O)}},[P,Ne,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx($l,{isTypeSwitchable:E,noteType:k,handleNoteTypeChange:je,localizedStrings:d}),n.jsx(Al,{callerType:g,updateCallerType:Lt,customCaller:b,updateCustomCaller:Yt,localizedStrings:d})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(os,{onUndoClick:()=>{var v;return(v=u.current)==null?void 0:v.undo()},onRedoClick:()=>{var v;return(v=u.current)==null?void 0:v.redo()},canUndo:!F,canRedo:L,localizedStrings:d}),n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:n.jsx(z,{onClick:rt,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.X,{})})}),n.jsx(bt,{children:n.jsx("p",{children:d["%footnoteEditor_closeButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:h,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(ss,{editorRef:u,children:n.jsx(St.Editorial,{options:G,onStateChange:v=>Qt(v),onUsjChange:Xt,defaultUsj:Gl,onScrRefChange:()=>{},scrRef:s,ref:u})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:n.jsx(z,{onClick:le,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.Copy,{})})}),n.jsx(bt,{children:n.jsx("p",{children:d["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:m,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Ut,{open:P,children:[n.jsx(ro,{className:"tw-absolute",style:{top:D,left:A,height:jt,width:0,pointerEvents:"none"}}),n.jsx(At,{className:"tw-w-[500px] tw-p-0",onClick:v=>{v.preventDefault(),v.stopPropagation()},children:n.jsx(is,{markerMenuItems:tt,localizedStrings:d,searchRef:at})})]})]})}const ql=Object.freeze([...as,...Object.entries(j.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_closeButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%",...rs]);function ls(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Ul(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let a=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(a.length>0&&i.push(a),a=[c]):a.push(c)}),a.length>0&&i.push(a),i.map((c,d)=>{const w=d===i.length-1;return n.jsxs("p",{children:[ir(t,c,r,!0,s),w&&o]},ls(t,c))})}function ir(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const a=`${t}-text-${i.slice(0,10)}`;if(o){const c=f(`usfm_${t}`);return n.jsx("span",{className:c,children:i},a)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},a)}return Hl(i,ls(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function Hl(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(_.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),ir(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function cs({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let a,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([a,...c]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),u=a&&n.jsxs(n.Fragment,{children:[ir(t.marker,[a],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",m=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",y=f(h,m);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:[d,p]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:u}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,y),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Ul(t.marker,c,o,w)})})]})}function Yl({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:a=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??j.getFormatCallerFunction(r,void 0),u=(k,C)=>{w==null||w(k,C,s)},h=i?r.findIndex(k=>k===i):-1,[m,g]=l.useState(h),y=(k,C,E)=>{if(r.length)switch(k.key){case"Enter":case" ":k.preventDefault(),w==null||w(C,E,s);break}},b=k=>{if(r.length)switch(k.key){case"ArrowDown":k.preventDefault(),g(C=>Math.min(C+1,r.length-1));break;case"ArrowUp":k.preventDefault(),g(C=>Math.max(C-1,0));break}},N=l.useRef([]);return l.useEffect(()=>{var k;m>=0&&m<N.current.length&&((k=N.current[m])==null||k.focus())},[m]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:m<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((k,C)=>{const E=k===i,V=`${s}-${C}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:F=>{N.current[C]=F},role:"option","aria-selected":E,"data-marker":k.marker,"data-state":E?"selected":void 0,tabIndex:C===m?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>u(k,C),onKeyDown:F=>y(F,k,C),children:n.jsx(cs,{footnote:k,layout:o,formatCaller:()=>p(k.caller,C),showMarkers:a})},V),C<r.length-1&&o==="vertical"&&n.jsx(fe,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Xl(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Wl({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],a=l.useMemo(()=>{const c=[],d=new Set;return t.forEach(w=>{const p=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(p)||(d.add(p),c.push(w))}),c},[t]);return n.jsxs(qe,{stickyHeader:!0,children:[n.jsx(Ue,{stickyHeader:!0,children:n.jsxs(zt,{children:[n.jsx(Te,{children:s}),n.jsx(Te,{children:i})]})}),n.jsx(He,{children:a.length>0&&a.map(c=>n.jsxs(zt,{onClick:()=>{e(c.reference)},children:[n.jsx(ne,{children:j.formatScrRef(c.reference,"English")}),n.jsx(ne,{className:o,children:Xl(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const hn=l.forwardRef(({className:t,...e},r)=>n.jsx(Dn.Root,{ref:r,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Dn.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}));hn.displayName=Dn.Root.displayName;const Jl=t=>{if(t==="asc")return n.jsx(_.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(_.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Ye=(t,e,r)=>n.jsx(xt,{children:n.jsxs(kt,{children:[n.jsxs(_t,{className:f("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),Jl(t.getIsSorted())]}),n.jsx(bt,{side:"bottom",children:e})]})}),Zl=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Ye(e,t)}),Ql=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Ye(r,t)}),tc=t=>({accessorKey:"count",header:({column:e})=>Ye(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),En=(t,e,r,o,s,i)=>{let a=[...r];t.forEach(d=>{e==="approved"?a.includes(d)||a.push(d):a=a.filter(w=>w!==d)}),o(a);let c=[...s];t.forEach(d=>{e==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),i(c)},ec=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>Ye(i,t,"tw-justify-center"),cell:({row:i})=>{const a=i.getValue("status"),c=i.getValue("item");return n.jsxs(fn,{value:a,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Ee,{onClick:d=>{d.stopPropagation(),En([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(_.CircleCheckIcon,{})}),n.jsx(Ee,{onClick:d=>{d.stopPropagation(),En([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(_.CircleXIcon,{})}),n.jsx(Ee,{onClick:d=>{d.stopPropagation(),En([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(_.CircleHelpIcon,{})})]})}}),nc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),rc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},oc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},ds=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",sc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),ac=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},ic=(t,e,r)=>t.map(o=>{const s=j.isString(o.key)?o.key:o.key[0];return{items:j.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||ds(s,e,r),occurrences:o.occurrences||[]}}),Ft=(t,e)=>t[e]??e;function lc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:a,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1,classNameForVerseText:u,onItemSelected:h}){const m=Ft(r,"%webView_inventory_all%"),g=Ft(r,"%webView_inventory_approved%"),y=Ft(r,"%webView_inventory_unapproved%"),b=Ft(r,"%webView_inventory_unknown%"),N=Ft(r,"%webView_inventory_scope_currentBook%"),k=Ft(r,"%webView_inventory_scope_chapter%"),C=Ft(r,"%webView_inventory_scope_verse%"),E=Ft(r,"%webView_inventory_filter_text%"),V=Ft(r,"%webView_inventory_show_additional_items%"),F=Ft(r,"%webView_inventory_no_results%"),[R,L]=l.useState(!1),[S,M]=l.useState("all"),[$,P]=l.useState(""),[I,A]=l.useState([]),q=l.useMemo(()=>{const G=t??[];return G.length===0?[]:ic(G,s,i)},[t,s,i]),D=l.useMemo(()=>{if(R)return q;const G=[];return q.forEach(tt=>{const et=tt.items[0],rt=G.find(ut=>ut.items[0]===et);rt?(rt.count+=tt.count,rt.occurrences=rt.occurrences.concat(tt.occurrences)):G.push({items:[et],count:tt.count,occurrences:tt.occurrences,status:tt.status})}),G},[R,q]),H=l.useMemo(()=>D.length===0?[]:ac(D,S,$),[D,S,$]),jt=l.useMemo(()=>{var et,rt;if(!R)return d;const G=(et=o==null?void 0:o.tableHeaders)==null?void 0:et.length;if(!G)return d;const tt=[];for(let ut=0;ut<G;ut++)tt.push(Ql(((rt=o==null?void 0:o.tableHeaders)==null?void 0:rt[ut])||"Additional Item",ut+1));return[...tt,...d]},[o==null?void 0:o.tableHeaders,d,R]);l.useEffect(()=>{H.length===0?A([]):H.length===1&&A(H[0].items)},[H]);const Rt=(G,tt)=>{tt.setRowSelection(()=>{const rt={};return rt[G.index]=!0,rt});const et=G.original.items;A(et),h&&et.length>0&&h(et[0])},Ct=G=>{if(G==="book"||G==="chapter"||G==="verse")c(G);else throw new Error(`Invalid scope value: ${G}`)},wt=G=>{if(G==="all"||G==="approved"||G==="unapproved"||G==="unknown")M(G);else throw new Error(`Invalid status filter value: ${G}`)},at=l.useMemo(()=>{if(D.length===0||I.length===0)return[];const G=D.filter(tt=>j.deepEqual(R?tt.items:[tt.items[0]],I));if(G.length>1)throw new Error("Selected item is not unique");return G.length===0?[]:G[0].occurrences},[I,R,D]);return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(he,{onValueChange:G=>wt(G),defaultValue:S,children:[n.jsx(oe,{className:"tw-m-1",children:n.jsx(ge,{placeholder:"Select filter"})}),n.jsxs(se,{children:[n.jsx(Nt,{value:"all",children:m}),n.jsx(Nt,{value:"approved",children:g}),n.jsx(Nt,{value:"unapproved",children:y}),n.jsx(Nt,{value:"unknown",children:b})]})]}),n.jsxs(he,{onValueChange:G=>Ct(G),defaultValue:a,children:[n.jsx(oe,{className:"tw-m-1",children:n.jsx(ge,{placeholder:"Select scope"})}),n.jsxs(se,{children:[n.jsx(Nt,{value:"book",children:N}),n.jsx(Nt,{value:"chapter",children:k}),n.jsx(Nt,{value:"verse",children:C})]})]}),n.jsx(ye,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:E,value:$,onChange:G=>{P(G.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(hn,{className:"tw-m-1",checked:R,onCheckedChange:G=>{L(G)}}),n.jsx(lt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??V})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Zo,{columns:jt,data:H,onRowClickHandler:Rt,stickyHeader:!0,isLoading:p,noResultsMessage:F})}),at.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Wl,{classNameForText:u,occurrenceData:at,setScriptureReference:e,localizedStrings:r})})]})}const cc="16rem",dc="3rem",ws=l.createContext(void 0);function Xe(){const t=l.useContext(ws);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const lr=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:a="primary",...c},d)=>{const[w,p]=l.useState(t),u=e??w,h=l.useCallback(C=>{const E=typeof C=="function"?C(u):C;r?r(E):p(E)},[r,u]),m=l.useCallback(()=>h(C=>!C),[h]),g=u?"expanded":"collapsed",N=dt()==="ltr"?a:a==="primary"?"secondary":"primary",k=l.useMemo(()=>({state:g,open:u,setOpen:h,toggleSidebar:m,side:N}),[g,u,h,m,N]);return n.jsx(ws.Provider,{value:k,children:n.jsx(xt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":cc,"--sidebar-width-icon":dc,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:i})})})});lr.displayName="SidebarProvider";const cr=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},i)=>{const a=Xe();return e==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":a.state,"data-collapsible":a.state==="collapsed"?e:"","data-variant":t,"data-side":a.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",a.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});cr.displayName="Sidebar";const ps=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Xe();return n.jsxs(z,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(_.PanelLeft,{}):n.jsx(_.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ps.displayName="SidebarTrigger";const us=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Xe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});us.displayName="SidebarRail";const dr=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));dr.displayName="SidebarInset";const ms=l.forwardRef(({className:t,...e},r)=>n.jsx(ye,{ref:r,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ms.displayName="SidebarInput";const fs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));fs.displayName="SidebarHeader";const hs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));hs.displayName="SidebarFooter";const gs=l.forwardRef(({className:t,...e},r)=>n.jsx(fe,{ref:r,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));gs.displayName="SidebarSeparator";const wr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));wr.displayName="SidebarContent";const sn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));sn.displayName="SidebarGroup";const an=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Me.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});an.displayName="SidebarGroupLabel";const xs=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Me.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});xs.displayName="SidebarGroupAction";const ln=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",t),...e}));ln.displayName="SidebarGroupContent";const pr=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));pr.displayName="SidebarMenu";const ur=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",t),...e}));ur.displayName="SidebarMenuItem";const wc=ae.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),mr=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,...a},c)=>{const d=t?Me.Slot:"button",{state:w}=Xe(),p=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:f(wc({variant:r,size:o}),i),...a});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:p}),n.jsx(bt,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});mr.displayName="SidebarMenuButton";const bs=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const i=e?Me.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});bs.displayName="SidebarMenuAction";const vs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));vs.displayName="SidebarMenuBadge";const ys=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(on,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(on,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});ys.displayName="SidebarMenuSkeleton";const js=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));js.displayName="SidebarMenuSub";const Ns=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Ns.displayName="SidebarMenuSubItem";const ks=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},i)=>{const a=t?Me.Slot:"a";return n.jsx(a,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});ks.displayName="SidebarMenuSubButton";function _s({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:a,buttonPlaceholderText:c,className:d}){const w=l.useCallback((h,m)=>{o(h,m)},[o]),p=l.useCallback(h=>{const m=r.find(g=>g.projectId===h);return m?m.projectName:h},[r]),u=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(cr,{id:t,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(wr,{children:[n.jsxs(sn,{children:[n.jsx(an,{className:"tw-text-sm",children:i}),n.jsx(ln,{children:n.jsx(pr,{children:Object.entries(e).map(([h,m])=>n.jsx(ur,{children:n.jsx(mr,{onClick:()=>w(h),isActive:u(h),children:n.jsx("span",{className:"tw-pl-3",children:m})})},h))})})]}),n.jsxs(sn,{children:[n.jsx(an,{className:"tw-text-sm",children:a}),n.jsx(ln,{className:"tw-pl-3",children:n.jsx(en,{buttonVariant:"ghost",buttonClassName:f("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const m=p(h);w(m,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(_.ScrollText,{})})})]})]})})}const gn=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:a},c)=>{const d=dt();return n.jsxs("div",{id:a,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(_.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(ye,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:i}),t&&n.jsxs(z,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});gn.displayName="SearchBar";function pc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:a,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(gn,{className:"tw-w-9/12",value:a,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(lr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(_s,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),n.jsx(dr,{className:"tw-min-w-[215px]",children:o})]})]})}const te="scrBook",uc="scrRef",we="source",mc="details",fc="Scripture Reference",hc="Scripture Book",Cs="Type",gc="Details";function xc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:te,header:(t==null?void 0:t.scriptureReferenceColumnName)??fc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?it.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===te?j.formatScrRef(s.start):void 0},getGroupingValue:o=>it.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>j.formatScrRef(o.start),id:uc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:j.formatScrRef(s.start)},sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:we,header:r?(t==null?void 0:t.typeColumnName)??Cs:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:mc,header:(t==null?void 0:t.detailsColumnName)??gc,cell:o=>o.getValue(),enableGrouping:!1}]}const bc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||j.compareScrRefs(t.start,t.end)===0?`${j.scrRefToBBBCCCVVV(t.start)}+${e}`:`${j.scrRefToBBBCCCVVV(t.start)}+${e}-${j.scrRefToBBBCCCVVV(t.end)}+${r}`},Fr=t=>`${bc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function vc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:a,onRowSelected:c,id:d}){const[w,p]=l.useState([]),[u,h]=l.useState([{id:te,desc:!1}]),[m,g]=l.useState({}),y=l.useMemo(()=>t.flatMap(S=>S.data.map(M=>({...M,source:S.source}))),[t]),b=l.useMemo(()=>xc({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:a},r),[o,i,a,r]);l.useEffect(()=>{w.includes(we)?h([{id:we,desc:!1},{id:te,desc:!1}]):h([{id:te,desc:!1}])},[w]);const N=gt.useReactTable({data:y,columns:b,state:{grouping:w,sorting:u,rowSelection:m},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:gt.getExpandedRowModel(),getGroupedRowModel:gt.getGroupedRowModel(),getCoreRowModel:gt.getCoreRowModel(),getSortedRowModel:gt.getSortedRowModel(),getRowId:Fr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const S=N.getSelectedRowModel().rowsById,M=Object.keys(S);if(M.length===1){const $=y.find(P=>Fr(P)===M[0])||void 0;$&&c($)}}},[m,y,c,N]);const k=s??hc,C=i??Cs,E=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[te]},{label:`Group by ${C}`,value:[we]},{label:`Group by ${k} and ${C}`,value:[te,we]},{label:`Group by ${C} and ${k}`,value:[we,te]}],V=S=>{p(JSON.parse(S))},F=(S,M)=>{!S.getIsGrouped()&&!S.getIsSelected()&&S.getToggleSelectedHandler()(M)},R=(S,M)=>S.getIsGrouped()?"":f("banded-row",M%2===0?"even":"odd"),L=(S,M,$)=>{if(!((S==null?void 0:S.length)===0||M.depth<$.column.getGroupedIndex())){if(M.getIsGrouped())switch(M.depth){case 1:return"tw-ps-4";default:return}switch(M.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(he,{value:JSON.stringify(w),onValueChange:S=>{V(S)},children:[n.jsx(oe,{className:"tw-mb-1 tw-mt-2",children:n.jsx(ge,{})}),n.jsx(se,{position:"item-aligned",children:n.jsx(Uo,{children:E.map(S=>n.jsx(Nt,{value:JSON.stringify(S.value),children:S.label},S.label))})})]}),n.jsxs(qe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Ue,{children:N.getHeaderGroups().map(S=>n.jsx(zt,{children:S.headers.filter(M=>M.column.columnDef.header).map(M=>n.jsx(Te,{colSpan:M.colSpan,className:"top-0 tw-sticky",children:M.isPlaceholder?void 0:n.jsxs("div",{children:[M.column.getCanGroup()?n.jsx(z,{variant:"ghost",title:`Toggle grouping by ${M.column.columnDef.header}`,onClick:M.column.getToggleGroupingHandler(),type:"button",children:M.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",gt.flexRender(M.column.columnDef.header,M.getContext())]})},M.id))},S.id))}),n.jsx(He,{children:N.getRowModel().rows.map((S,M)=>{const $=dt();return n.jsx(zt,{"data-state":S.getIsSelected()?"selected":"",className:f(R(S,M)),onClick:P=>F(S,P),children:S.getVisibleCells().map(P=>{if(!(P.getIsPlaceholder()||P.column.columnDef.enableGrouping&&!P.getIsGrouped()&&(P.column.columnDef.id!==we||!r)))return n.jsx(ne,{className:f(P.column.columnDef.id,"tw-p-[1px]",L(w,S,P)),children:P.getIsGrouped()?n.jsxs(z,{variant:"link",onClick:S.getToggleExpandedHandler(),type:"button",children:[S.getIsExpanded()&&n.jsx(_.ChevronDown,{}),!S.getIsExpanded()&&($==="ltr"?n.jsx(_.ChevronRight,{}):n.jsx(_.ChevronLeft,{}))," ",gt.flexRender(P.column.columnDef.cell,P.getContext())," (",S.subRows.length,")"]}):gt.flexRender(P.column.columnDef.cell,P.getContext())},P.id)})},S.id)})})]})]})}const fr=(t,e)=>t.filter(r=>{try{return j.getSectionForBook(r)===e}catch{return!1}}),Es=(t,e,r)=>fr(t,e).every(o=>r.includes(o));function yc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=fr(e,t).length===0,a=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(z,{variant:"outline",size:"sm",onClick:()=>o(t),className:f(Es(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:qa(t,a,c,d,w)})}const Vr=5,Sn=6;function jc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],a=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],u=o["%webView_book_selector_more%"],{otLong:h,ntLong:m,dcLong:g,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,N]=l.useState(!1),[k,C]=l.useState(""),E=l.useRef(void 0),V=l.useRef(!1);if(t.length!==it.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const F=l.useMemo(()=>it.Canon.allBookIds.filter((A,q)=>t[q]==="1"&&!it.Canon.isObsolete(it.Canon.bookIdToNumber(A))),[t]),R=l.useMemo(()=>{if(!k.trim()){const D={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return F.forEach(H=>{const jt=j.getSectionForBook(H);D[jt].push(H)}),D}const A=F.filter(D=>zn(D,k,s)),q={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return A.forEach(D=>{const H=j.getSectionForBook(D);q[H].push(D)}),q},[F,k,s]),L=l.useCallback((A,q=!1)=>{if(!q||!E.current){r(e.includes(A)?e.filter(wt=>wt!==A):[...e,A]),E.current=A;return}const D=F.findIndex(wt=>wt===E.current),H=F.findIndex(wt=>wt===A);if(D===-1||H===-1)return;const[jt,Rt]=[Math.min(D,H),Math.max(D,H)],Ct=F.slice(jt,Rt+1).map(wt=>wt);r(e.includes(A)?e.filter(wt=>!Ct.includes(wt)):[...new Set([...e,...Ct])])},[e,r,F]),S=A=>{L(A,V.current),V.current=!1},M=(A,q)=>{A.preventDefault(),L(q,A.shiftKey)},$=l.useCallback(A=>{const q=fr(F,A).map(D=>D);r(Es(F,A,e)?e.filter(D=>!q.includes(D)):[...new Set([...e,...q])])},[e,r,F]),P=()=>{r(F.map(A=>A))},I=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(j.Section).map(A=>n.jsx(yc,{section:A,availableBookIds:F,selectedBookIds:e,onToggle:$,localizedStrings:o},A))}),n.jsxs(Ut,{open:b,onOpenChange:A=>{N(A),A||C("")},children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(z,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:a,n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(At,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Kt,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(V.current=A.shiftKey)},children:[n.jsx(xe,{placeholder:c,value:k,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(z,{variant:"ghost",size:"sm",onClick:P,children:d}),n.jsx(z,{variant:"ghost",size:"sm",onClick:I,children:w})]}),n.jsxs(qt,{children:[n.jsx(Ie,{children:p}),Object.values(j.Section).map((A,q)=>{const D=R[A];if(D.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Gt,{heading:to(A,h,m,g,y),children:D.map(H=>n.jsx(no,{bookId:H,isSelected:e.includes(H),onSelect:()=>S(H),onMouseDown:jt=>M(jt,H),section:j.getSectionForBook(H),showCheck:!0,localizedBookNames:s,commandValue:An(H,s),className:"tw-flex tw-items-center"},H))}),q<Object.values(j.Section).length-1&&n.jsx(Zr,{})]},A)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Sn?Sn:Vr).map(A=>n.jsx(me,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ce(A,s)},A)),e.length>Sn&&n.jsx(me,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Vr} ${u}`})]})]})}const Nc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),ce=(t,e)=>t[e]??e;function kc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:a,localizedBookNames:c,id:d}){const w=ce(a,"%webView_scope_selector_selected_text%"),p=ce(a,"%webView_scope_selector_current_verse%"),u=ce(a,"%webView_scope_selector_current_chapter%"),h=ce(a,"%webView_scope_selector_current_book%"),m=ce(a,"%webView_scope_selector_choose_books%"),g=ce(a,"%webView_scope_selector_scope%"),y=ce(a,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:u,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],N=e?b.filter(k=>e.includes(k.value)):b;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(lt,{children:g}),n.jsx(pn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:N.map(({value:k,label:C,id:E})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{className:"tw-me-2",value:k,id:E}),n.jsx(lt,{htmlFor:E,children:C})]},E))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(lt,{children:y}),n.jsx(jc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:a,localizedBookNames:c})]})]})}const Rn={[j.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[j.getLocalizeKeyForScrollGroupId(0)]:"A",[j.getLocalizeKeyForScrollGroupId(1)]:"B",[j.getLocalizeKeyForScrollGroupId(2)]:"C",[j.getLocalizeKeyForScrollGroupId(3)]:"D",[j.getLocalizeKeyForScrollGroupId(4)]:"E",[j.getLocalizeKeyForScrollGroupId(5)]:"F",[j.getLocalizeKeyForScrollGroupId(6)]:"G",[j.getLocalizeKeyForScrollGroupId(7)]:"H",[j.getLocalizeKeyForScrollGroupId(8)]:"I",[j.getLocalizeKeyForScrollGroupId(9)]:"J",[j.getLocalizeKeyForScrollGroupId(10)]:"K",[j.getLocalizeKeyForScrollGroupId(11)]:"L",[j.getLocalizeKeyForScrollGroupId(12)]:"M",[j.getLocalizeKeyForScrollGroupId(13)]:"N",[j.getLocalizeKeyForScrollGroupId(14)]:"O",[j.getLocalizeKeyForScrollGroupId(15)]:"P",[j.getLocalizeKeyForScrollGroupId(16)]:"Q",[j.getLocalizeKeyForScrollGroupId(17)]:"R",[j.getLocalizeKeyForScrollGroupId(18)]:"S",[j.getLocalizeKeyForScrollGroupId(19)]:"T",[j.getLocalizeKeyForScrollGroupId(20)]:"U",[j.getLocalizeKeyForScrollGroupId(21)]:"V",[j.getLocalizeKeyForScrollGroupId(22)]:"W",[j.getLocalizeKeyForScrollGroupId(23)]:"X",[j.getLocalizeKeyForScrollGroupId(24)]:"Y",[j.getLocalizeKeyForScrollGroupId(25)]:"Z"};function _c({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:a}){const c={...Rn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in Rn?Rn[w]:p]))},d=dt();return n.jsxs(he,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(oe,{size:s,className:f("pr-twp tw-w-auto",i),children:n.jsx(ge,{placeholder:c[j.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(se,{id:a,align:d==="rtl"?"end":"start",style:{zIndex:250},children:t.map(w=>n.jsx(Nt,{value:`${w}`,children:c[j.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function Cc({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function Ec({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function Sc({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(fe,{}):""]})}function Ss(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function cn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Rs=(t,e,r,o)=>r?Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order).flatMap(([i])=>e.filter(c=>c.group===i).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:"command"in c?n.jsxs(Ge,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(cn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(cn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Go,{children:[n.jsx(nr,{children:c.label}),n.jsx(Bo,{children:n.jsx(rr,{children:Rs(t,e,Ss(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(bt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function dn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:a="ghost",id:c}){return n.jsxs(ie,{variant:i,children:[n.jsx(be,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(z,{variant:a,size:"icon",children:o??n.jsx(_.MenuIcon,{})})}),n.jsx(Zt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>n.jsxs(l.Fragment,{children:[n.jsx(er,{children:n.jsx(xt,{children:Rs(e.groups,e.items,d,t)})}),w<p.length-1&&n.jsx(ve,{})]},d))})]})}const Ts=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Rc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:a,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(Ts,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(dn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(_.Menu,{}),buttonVariant:"ghost"}),a&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:a}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(dn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(_.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function Tc({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Ts,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(dn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const hr=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(yt.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});hr.displayName=yt.List.displayName;const gr=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));gr.displayName=yt.List.displayName;const Ms=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Trigger,{ref:r,...e,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),xr=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));xr.displayName=yt.Content.displayName;function Mc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:a}){return n.jsxs("div",{id:a,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(gn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(hr,{children:[n.jsx(gr,{children:t.map(c=>n.jsx(Ms,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(xr,{value:c.value,children:c.content},c.key))]})]})}function Dc({...t}){return n.jsx(Z.Menu,{...t})}function Ic({...t}){return n.jsx(Z.Sub,{"data-slot":"menubar-sub",...t})}const Ds=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(tr.Provider,{value:s,children:n.jsx(Z.Root,{ref:o,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Ds.displayName=Z.Root.displayName;const Is=l.forwardRef(({className:t,...e},r)=>{const o=Pt();return n.jsx(Z.Trigger,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Jt({variant:o.variant,className:t})),...e})});Is.displayName=Z.Trigger.displayName;const Os=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=Pt();return n.jsxs(Z.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Jt({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Os.displayName=Z.SubTrigger.displayName;const As=l.forwardRef(({className:t,...e},r)=>{const o=Pt();return n.jsx(Z.SubContent,{ref:r,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});As.displayName=Z.SubContent.displayName;const Ps=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const a=Pt();return n.jsx(Z.Portal,{children:n.jsx(Z.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":a.variant==="muted"},t),...s})})});Ps.displayName=Z.Content.displayName;const Ls=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=Pt();return n.jsx(Z.Item,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Jt({variant:s.variant,className:t}),t),...r})});Ls.displayName=Z.Item.displayName;const Oc=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=Pt();return n.jsxs(Z.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Jt({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Oc.displayName=Z.CheckboxItem.displayName;const Ac=l.forwardRef(({className:t,children:e,...r},o)=>{const s=Pt();return n.jsxs(Z.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Jt({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Ac.displayName=Z.RadioItem.displayName;const Pc=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Z.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Pc.displayName=Z.Label.displayName;const $s=l.forwardRef(({className:t,...e},r)=>n.jsx(Z.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));$s.displayName=Z.Separator.displayName;const Pe=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Fs=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order);return s.flatMap(([i],a)=>{const c=e.filter(w=>w.group===i).sort((w,p)=>w.order-p.order).map(w=>n.jsxs(kt,{children:[n.jsx(_t,{asChild:!0,children:"command"in w?n.jsxs(Ls,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(cn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(cn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(Ic,{children:[n.jsx(Os,{children:w.label}),n.jsx(As,{children:Fs(t,e,Ss(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(bt,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&a<s.length-1&&d.push(n.jsx($s,{},`separator-${i}`)),d})};function Lc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),i=l.useRef(void 0),a=l.useRef(void 0),c=l.useRef(void 0),d=l.useRef(void 0),w=p=>{switch(p){case"platform.app":return i;case"platform.window":return a;case"platform.layout":return c;case"platform.help":return d;default:return}};if(Oa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,u)=>{var g,y,b,N;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(u.hotkey){case"alt":Pe(i,[h]);break;case"alt+p":(g=i.current)==null||g.focus(),Pe(i,[h,m]);break;case"alt+l":(y=a.current)==null||y.focus(),Pe(a,[h,m]);break;case"alt+n":(b=c.current)==null||b.focus(),Pe(c,[h,m]);break;case"alt+h":(N=d.current)==null||N.focus(),Pe(d,[h,m]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(m=>{m.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const y=g.target.getAttribute("data-state");r(y==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(m=>{p.observe(m,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Ds,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,u])=>typeof p=="boolean"||typeof u=="boolean"?0:p.order-u.order).map(([p,u])=>n.jsxs(Dc,{children:[n.jsx(Is,{ref:w(p),children:typeof u=="object"&&"label"in u&&u.label}),n.jsx(Ps,{className:"tw-z-[250]",children:n.jsx(xt,{children:Fs(t.groups,t.items,p,e)})})]},p))})}function $c(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Fc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:a,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[a,t&&n.jsx(Lc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Vc=(t,e)=>t[e]??e;function zc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:a,className:c,id:d}){const w=Vc(a,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,u]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(y=>y!==g)]),i&&r.find(y=>y===g)&&i([...r.filter(y=>y!==g)]),u(!1)},m=(g,y)=>{var N,k,C,E,V,F;const b=y!==g?((k=(N=t[g])==null?void 0:N.uiNames)==null?void 0:k[y])??((E=(C=t[g])==null?void 0:C.uiNames)==null?void 0:E.en):void 0;return b?`${(V=t[g])==null?void 0:V.autonym} (${b})`:(F=t[g])==null?void 0:F.autonym};return n.jsxs("div",{id:d,className:f("pr-twp tw-max-w-sm",c),children:[n.jsxs(he,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>u(g),children:[n.jsx(oe,{children:n.jsx(ge,{})}),n.jsx(se,{className:"tw-z-[250]",children:Object.keys(t).map(g=>n.jsx(Nt,{value:g,children:m(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(lt,{className:"tw-font-normal tw-text-muted-foreground",children:j.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>m(g,e)).join(", "):t.en.autonym})})})]})}function Bc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(lt,{children:e(t)}):r?n.jsx(lt,{children:r(t)}):n.jsx(lt,{children:t})}function Gc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:a}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(hn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(Bc,{item:c,createLabel:i,createComplexLabel:a})]},c))})}function Kc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:a,dropdownContent:c,additionalSelectedContent:d,accentColor:w}){const p=u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:f("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:a}),e&&c&&n.jsxs(ie,{children:[n.jsx(be,{className:f(w&&"tw-me-1"),asChild:!0,children:n.jsx(z,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreHorizontal,{})})}),n.jsx(Zt,{align:"end",children:c})]})]}),e&&d&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:d})]}),w&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`})]},t)}const Vs=l.forwardRef(({className:t,...e},r)=>n.jsx(_.LoaderCircle,{size:35,className:f("tw-animate-spin",t),...e,ref:r}));Vs.displayName="Spinner";function qc({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:a,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:u,onFocus:h,onBlur:m}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(lt,{htmlFor:t,className:f({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(ye,{id:t,disabled:e,placeholder:a,required:c,className:f(d,{"tw-border-red-600":r}),defaultValue:w,value:p,onChange:u,onFocus:h,onBlur:m}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const Uc=ae.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),zs=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:f("pr-twp",Uc({variant:e}),t),...r}));zs.displayName="Alert";const Bs=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Bs.displayName="AlertTitle";const Gs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Gs.displayName="AlertDescription";const Hc=Q.Root,Yc=Q.Trigger,Xc=Q.Group,Wc=Q.Portal,Jc=Q.Sub,Zc=Q.RadioGroup,Ks=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(Q.SubTrigger,{ref:s,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ks.displayName=Q.SubTrigger.displayName;const qs=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));qs.displayName=Q.SubContent.displayName;const Us=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:r,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Us.displayName=Q.Content.displayName;const Hs=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Item,{ref:o,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));Hs.displayName=Q.Item.displayName;const Ys=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(Q.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Ys.displayName=Q.CheckboxItem.displayName;const Xs=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(Q.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Xs.displayName=Q.RadioItem.displayName;const Ws=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));Ws.displayName=Q.Label.displayName;const Js=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));Js.displayName=Q.Separator.displayName;function Zs({className:t,...e}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Zs.displayName="ContextMenuShortcut";const Qs=l.createContext({direction:"bottom"});function ta({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(Qs.Provider,{value:o,children:n.jsx(It.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}ta.displayName="Drawer";const Qc=It.Drawer.Trigger,ea=It.Drawer.Portal,td=It.Drawer.Close,br=l.forwardRef(({className:t,...e},r)=>n.jsx(It.Drawer.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));br.displayName=It.Drawer.Overlay.displayName;const na=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:i="bottom"}=l.useContext(Qs),a={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ea,{children:[n.jsx(br,{}),n.jsxs(It.Drawer.Content,{ref:s,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",a[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:c[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:c[i]})]})]})});na.displayName="DrawerContent";function ra({className:t,...e}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ra.displayName="DrawerHeader";function oa({className:t,...e}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}oa.displayName="DrawerFooter";const sa=l.forwardRef(({className:t,...e},r)=>n.jsx(It.Drawer.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));sa.displayName=It.Drawer.Title.displayName;const aa=l.forwardRef(({className:t,...e},r)=>n.jsx(It.Drawer.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));aa.displayName=It.Drawer.Description.displayName;const ia=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(In.Root,{ref:o,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(In.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));ia.displayName=In.Root.displayName;function ed({className:t,...e}){return n.jsx(Fn.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const nd=Fn.Panel;function rd({withHandle:t,className:e,...r}){return n.jsx(Fn.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(_.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function od({...t}){return n.jsx(Kr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const la=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsxs(Le.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Le.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Le.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Le.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});la.displayName=Le.Root.displayName;const ca=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(On.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(On.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ca.displayName=On.Root.displayName;const sd=yt.Root,da=l.forwardRef(({className:t,...e},r)=>{const o=dt();return n.jsx(yt.List,{ref:r,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});da.displayName=yt.List.displayName;const wa=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Trigger,{ref:r,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));wa.displayName=yt.Trigger.displayName;const pa=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Content,{ref:r,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));pa.displayName=yt.Content.displayName;const ua=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ua.displayName="Textarea";const ad=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function id(t){return{preserveValue:!0,...t}}const ma=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=id(s.current);const[i,a]=l.useState(()=>o.current),[c,d]=l.useState(!0);return l.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const p=await t();w&&(a(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||a(()=>o.current)}},[t]),[i,c]},Tn=()=>!1,ld=(t,e)=>{const[r]=ma(l.useCallback(async()=>{if(!t)return Tn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Tn,{preserveValue:!1});l.useEffect(()=>()=>{r!==Tn&&r()},[r])};function cd(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Kr.toast});exports.Alert=zs;exports.AlertDescription=Gs;exports.AlertTitle=Bs;exports.Avatar=Zn;exports.AvatarFallback=Qn;exports.AvatarImage=zo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Ja;exports.BOOK_SELECTOR_STRING_KEYS=ti;exports.Badge=me;exports.BookChapterControl=Wa;exports.BookSelectionMode=ao;exports.BookSelector=ei;exports.Button=z;exports.COMMENT_EDITOR_STRING_KEYS=ml;exports.COMMENT_LIST_STRING_KEYS=fl;exports.Card=Wn;exports.CardContent=Jn;exports.CardDescription=Fo;exports.CardFooter=Vo;exports.CardHeader=Lo;exports.CardTitle=$o;exports.ChapterRangeSelector=so;exports.Checkbox=hn;exports.Checklist=Gc;exports.ComboBox=en;exports.Command=Kt;exports.CommandEmpty=Ie;exports.CommandGroup=Gt;exports.CommandInput=xe;exports.CommandItem=Ot;exports.CommandList=qt;exports.CommentEditor=ul;exports.CommentList=bl;exports.ContextMenu=Hc;exports.ContextMenuCheckboxItem=Ys;exports.ContextMenuContent=Us;exports.ContextMenuGroup=Xc;exports.ContextMenuItem=Hs;exports.ContextMenuLabel=Ws;exports.ContextMenuPortal=Wc;exports.ContextMenuRadioGroup=Zc;exports.ContextMenuRadioItem=Xs;exports.ContextMenuSeparator=Js;exports.ContextMenuShortcut=Zs;exports.ContextMenuSub=Jc;exports.ContextMenuSubContent=qs;exports.ContextMenuSubTrigger=Ks;exports.ContextMenuTrigger=Yc;exports.DataTable=Zo;exports.Drawer=ta;exports.DrawerClose=td;exports.DrawerContent=na;exports.DrawerDescription=aa;exports.DrawerFooter=oa;exports.DrawerHeader=ra;exports.DrawerOverlay=br;exports.DrawerPortal=ea;exports.DrawerTitle=sa;exports.DrawerTrigger=Qc;exports.DropdownMenu=ie;exports.DropdownMenuCheckboxItem=Bt;exports.DropdownMenuContent=Zt;exports.DropdownMenuGroup=er;exports.DropdownMenuItem=Ge;exports.DropdownMenuItemType=es;exports.DropdownMenuLabel=Oe;exports.DropdownMenuPortal=Bo;exports.DropdownMenuRadioGroup=Ko;exports.DropdownMenuRadioItem=or;exports.DropdownMenuSeparator=ve;exports.DropdownMenuShortcut=qo;exports.DropdownMenuSub=Go;exports.DropdownMenuSubContent=rr;exports.DropdownMenuSubTrigger=nr;exports.DropdownMenuTrigger=be;exports.ERROR_DUMP_STRING_KEYS=Qo;exports.ERROR_POPOVER_STRING_KEYS=El;exports.EditorKeyboardShortcuts=ss;exports.ErrorDump=ts;exports.ErrorPopover=Sl;exports.FOOTNOTE_EDITOR_STRING_KEYS=ql;exports.Filter=Il;exports.FilterDropdown=Rl;exports.Footer=Dl;exports.FootnoteEditor=Kl;exports.FootnoteItem=cs;exports.FootnoteList=Yl;exports.INVENTORY_STRING_KEYS=sc;exports.Input=ye;exports.Inventory=lc;exports.Label=lt;exports.MARKER_MENU_STRING_KEYS=as;exports.MarkdownRenderer=Cl;exports.MarkerMenu=is;exports.MoreInfo=Tl;exports.MultiSelectComboBox=ns;exports.NavigationContentSearch=Mc;exports.Popover=Ut;exports.PopoverAnchor=ro;exports.PopoverContent=At;exports.PopoverTrigger=Wt;exports.Progress=ia;exports.RadioGroup=pn;exports.RadioGroupItem=ze;exports.RecentSearches=oo;exports.ResizableHandle=rd;exports.ResizablePanel=nd;exports.ResizablePanelGroup=ed;exports.ResultsCard=Kc;exports.SCOPE_SELECTOR_STRING_KEYS=Nc;exports.ScopeSelector=kc;exports.ScriptureResultsViewer=vc;exports.ScrollGroupSelector=_c;exports.SearchBar=gn;exports.Select=he;exports.SelectContent=se;exports.SelectGroup=Uo;exports.SelectItem=Nt;exports.SelectLabel=Yo;exports.SelectScrollDownButton=ar;exports.SelectScrollUpButton=sr;exports.SelectSeparator=Xo;exports.SelectTrigger=oe;exports.SelectValue=ge;exports.Separator=fe;exports.SettingsList=Cc;exports.SettingsListHeader=Sc;exports.SettingsListItem=Ec;exports.SettingsSidebar=_s;exports.SettingsSidebarContentSearch=pc;exports.Sidebar=cr;exports.SidebarContent=wr;exports.SidebarFooter=hs;exports.SidebarGroup=sn;exports.SidebarGroupAction=xs;exports.SidebarGroupContent=ln;exports.SidebarGroupLabel=an;exports.SidebarHeader=fs;exports.SidebarInput=ms;exports.SidebarInset=dr;exports.SidebarMenu=pr;exports.SidebarMenuAction=bs;exports.SidebarMenuBadge=vs;exports.SidebarMenuButton=mr;exports.SidebarMenuItem=ur;exports.SidebarMenuSkeleton=ys;exports.SidebarMenuSub=js;exports.SidebarMenuSubButton=ks;exports.SidebarMenuSubItem=Ns;exports.SidebarProvider=lr;exports.SidebarRail=us;exports.SidebarSeparator=gs;exports.SidebarTrigger=ps;exports.Skeleton=on;exports.Slider=la;exports.Sonner=od;exports.Spinner=Vs;exports.Switch=ca;exports.TabDropdownMenu=dn;exports.TabFloatingMenu=Tc;exports.TabToolbar=Rc;exports.Table=qe;exports.TableBody=He;exports.TableCaption=Jo;exports.TableCell=ne;exports.TableFooter=Wo;exports.TableHead=Te;exports.TableHeader=Ue;exports.TableRow=zt;exports.Tabs=sd;exports.TabsContent=pa;exports.TabsList=da;exports.TabsTrigger=wa;exports.TextField=qc;exports.Textarea=ua;exports.ToggleGroup=fn;exports.ToggleGroupItem=Ee;exports.Toolbar=Fc;exports.Tooltip=kt;exports.TooltipContent=bt;exports.TooltipProvider=xt;exports.TooltipTrigger=_t;exports.UNDO_REDO_BUTTONS_STRING_KEYS=rs;exports.UiLanguageSelector=zc;exports.UndoRedoButtons=os;exports.VerticalTabs=hr;exports.VerticalTabsContent=xr;exports.VerticalTabsList=gr;exports.VerticalTabsTrigger=Ms;exports.badgeVariants=Po;exports.buttonVariants=Bn;exports.cn=f;exports.getBookIdFromUSFM=oc;exports.getInventoryHeader=Ye;exports.getLinesFromUSFM=nc;exports.getNumberFromUSFM=rc;exports.getStatusForItem=ds;exports.getToolbarOSReservedSpaceClassName=$c;exports.inventoryCountColumn=tc;exports.inventoryItemColumn=Zl;exports.inventoryStatusColumn=ec;exports.selectTriggerVariants=Ho;exports.useEvent=ad;exports.useEventAsync=ld;exports.useListbox=Ao;exports.usePromise=ma;exports.useRecentSearches=Ua;exports.useSidebar=Xe;exports.useStylesheet=cd;function dd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}dd(`*, ::before, ::after {
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
.tw-min-w-\\[500px\\] {
  min-width: 500px;
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
