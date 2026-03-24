"use strict";var pa=Object.defineProperty;var ua=(e,t,r)=>t in e?pa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var xt=(e,t,r)=>ua(e,typeof t!="symbol"?t+"":t,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),a=require("react"),Et=require("cmdk"),_=require("lucide-react"),ma=require("clsx"),fa=require("tailwind-merge"),ha=require("@radix-ui/react-dialog"),at=require("@sillsdev/scripture"),N=require("platform-bible-utils"),we=require("class-variance-authority"),Te=require("@radix-ui/react-slot"),ga=require("@radix-ui/react-label"),xa=require("@radix-ui/react-radio-group"),ba=require("@radix-ui/react-popover"),x=require("lexical"),$r=require("@radix-ui/react-tooltip"),Tn=require("@lexical/rich-text"),br=require("react-dom"),va=require("@lexical/table"),ya=require("@radix-ui/react-toggle-group"),ja=require("@radix-ui/react-toggle"),Fr=require("@lexical/headless"),Na=require("@radix-ui/react-separator"),ka=require("@radix-ui/react-avatar"),Vr=require("@radix-ui/react-dropdown-menu"),vt=require("@tanstack/react-table"),_a=require("@radix-ui/react-select"),Ca=require("markdown-to-jsx"),At=require("@eten-tech-foundation/platform-editor"),Ea=require("@radix-ui/react-checkbox"),Sa=require("@radix-ui/react-tabs"),Ra=require("@radix-ui/react-menubar"),Ta=require("react-hotkeys-hook"),Ma=require("@radix-ui/react-context-menu"),Vt=require("vaul"),Da=require("@radix-ui/react-progress"),Ia=require("react-resizable-panels"),zr=require("sonner"),Oa=require("@radix-ui/react-slider"),Aa=require("@radix-ui/react-switch");function lt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const Ft=lt(ha),Br=lt(ga),Fe=lt(xa),Ee=lt(ba),he=lt($r),dn=lt(ya),Gr=lt(ja),qr=lt(Na),Me=lt(ka),J=lt(Vr),ot=lt(_a),Mn=lt(Ea),St=lt(Sa),Z=lt(Ra),Q=lt(Ma),Dn=lt(Da),Ln=lt(Ia),Ae=lt(Oa),In=lt(Aa),Pa=fa.extendTailwindMerge({prefix:"tw-"});function h(...e){return Pa(ma.clsx(e))}const La="layoutDirection";function ut(){const e=localStorage.getItem(La);return e==="rtl"?e:"ltr"}const Kr=Ft.Root,$a=Ft.Portal,Ur=a.forwardRef(({className:e,...t},r)=>n.jsx(Ft.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Ur.displayName=Ft.Overlay.displayName;const $n=a.forwardRef(({className:e,children:t,...r},o)=>{const s=ut();return n.jsxs($a,{children:[n.jsx(Ur,{}),n.jsxs(Ft.Content,{ref:o,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...r,dir:s,children:[t,n.jsxs(Ft.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});$n.displayName=Ft.Content.displayName;function Hr({className:e,...t}){return n.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",e),...t})}Hr.displayName="DialogHeader";const Yr=a.forwardRef(({className:e,...t},r)=>n.jsx(Ft.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));Yr.displayName=Ft.Title.displayName;const Fa=a.forwardRef(({className:e,...t},r)=>n.jsx(Ft.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",e),...t}));Fa.displayName=Ft.Description.displayName;const Yt=a.forwardRef(({className:e,...t},r)=>n.jsx(Et.Command,{ref:r,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Yt.displayName=Et.Command.displayName;function Xr({children:e,shouldFilter:t,...r}){return n.jsx(Kr,{...r,children:n.jsx($n,{className:"tw-overflow-hidden tw-p-0 tw-shadow-lg",children:n.jsx(Yt,{shouldFilter:t,className:"[&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:tw-pt-0 [&_[cmdk-group]]:tw-px-2 [&_[cmdk-input-wrapper]_svg]:tw-h-5 [&_[cmdk-input-wrapper]_svg]:tw-w-5 [&_[cmdk-input]]:tw-h-12 [&_[cmdk-item]]:tw-px-2 [&_[cmdk-item]]:tw-py-3 [&_[cmdk-item]_svg]:tw-h-5 [&_[cmdk-item]_svg]:tw-w-5",children:e})})})}const ve=a.forwardRef(({className:e,icon:t,...r},o)=>{const s=ut();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:s,children:[t??n.jsx(_.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(Et.Command.Input,{ref:o,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...r})]})});ve.displayName=Et.Command.Input.displayName;const Xt=a.forwardRef(({className:e,...t},r)=>n.jsx(Et.Command.List,{ref:r,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));Xt.displayName=Et.Command.List.displayName;const ye=a.forwardRef((e,t)=>n.jsx(Et.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));ye.displayName=Et.Command.Empty.displayName;const de=a.forwardRef(({className:e,...t},r)=>n.jsx(Et.Command.Group,{ref:r,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));de.displayName=Et.Command.Group.displayName;const Wr=a.forwardRef(({className:e,...t},r)=>n.jsx(Et.Command.Separator,{ref:r,className:h("tw--mx-1 tw-h-px tw-bg-border",e),...t}));Wr.displayName=Et.Command.Separator.displayName;const te=a.forwardRef(({className:e,...t},r)=>n.jsx(Et.Command.Item,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));te.displayName=Et.Command.Item.displayName;function Jr({className:e,...t}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}Jr.displayName="CommandShortcut";const Zr=(e,t,r,o,s)=>{switch(e){case N.Section.OT:return t??"Old Testament";case N.Section.NT:return r??"New Testament";case N.Section.DC:return o??"Deuterocanon";case N.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},Va=(e,t,r,o,s)=>{switch(e){case N.Section.OT:return t??"OT";case N.Section.NT:return r??"NT";case N.Section.DC:return o??"DC";case N.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${e}`)}};function Pt(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedName)??at.Canon.bookIdToEnglishName(e)}function Qr(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedId)??e.toUpperCase()}const to=at.Canon.allBookIds.filter(e=>!at.Canon.isObsolete(at.Canon.bookIdToNumber(e))),Ve=Object.fromEntries(to.map(e=>[e,at.Canon.bookIdToEnglishName(e)]));function Fn(e,t,r){const o=t.trim().toLowerCase();if(!o)return!1;const s=at.Canon.bookIdToEnglishName(e),i=r==null?void 0:r.get(e);return!!(N.includes(s.toLowerCase(),o)||N.includes(e.toLowerCase(),o)||(i?N.includes(i.localizedName.toLowerCase(),o)||N.includes(i.localizedId.toLowerCase(),o):!1))}const eo=a.forwardRef(({bookId:e,isSelected:t,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:l=!1,localizedBookNames:c,commandValue:d},w)=>{const p=a.useRef(!1),m=()=>{p.current||r==null||r(e),setTimeout(()=>{p.current=!1},100)},f=b=>{p.current=!0,o?o(b):r==null||r(e)},u=a.useMemo(()=>Pt(e,c),[e,c]),g=a.useMemo(()=>Qr(e,c),[e,c]);return n.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===N.Section.OT,"tw-border-s-purple-200":s===N.Section.NT,"tw-border-s-indigo-200":s===N.Section.DC,"tw-border-s-amber-200":s===N.Section.Extra}),children:n.jsxs(te,{ref:w,value:d||`${e} ${at.Canon.bookIdToEnglishName(e)}`,onSelect:m,onMouseDown:f,role:"option","aria-selected":t,"aria-label":`${at.Canon.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,className:i,children:[l&&n.jsx(_.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",t?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),no=we.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Zt=a.forwardRef(({className:e,variant:t,...r},o)=>n.jsx("div",{ref:o,className:h("pr-twp",no({variant:t}),e),...r}));Zt.displayName="Badge";const Vn=we.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),F=a.forwardRef(({className:e,variant:t,size:r,asChild:o=!1,...s},i)=>{const l=o?Te.Slot:"button";return n.jsx(l,{className:h(Vn({variant:t,size:r,className:e})),ref:i,...s})});F.displayName="Button";const xn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},za=[xn.BOOK_ONLY,xn.BOOK_CHAPTER,xn.BOOK_CHAPTER_VERSE];function Ba(e){const t=/^[a-zA-Z]$/.test(e),r=/^[0-9]$/.test(e);return{isLetter:t,isDigit:r}}function Pe(e){return N.getChaptersForBook(at.Canon.bookIdToNumber(e))}function Ga(e,t,r){if(!e.trim()||t.length===0)return;const o=za.reduce((s,i)=>{if(s)return s;const l=i.exec(e.trim());if(l){const[c,d=void 0,w=void 0]=l.slice(1);let p;const m=t.filter(f=>Fn(f,c,r));if(m.length===1&&([p]=m),!p&&d){if(at.Canon.isBookIdValid(c)){const f=c.toUpperCase();t.includes(f)&&(p=f)}if(!p&&r){const f=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());f&&t.includes(f[0])&&([p]=f)}}if(!p&&d){const u=(g=>Object.keys(Ve).find(b=>Ve[b].toLowerCase()===g.toLowerCase()))(c);if(u&&t.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,b])=>b.localizedName.toLowerCase()===c.toLowerCase());g&&t.includes(g[0])&&([p]=g)}}if(p){let f=d?parseInt(d,10):void 0;f&&f>Pe(p)&&(f=Math.max(Pe(p),1));const u=w?parseInt(w,10):void 0;return{book:p,chapterNum:f,verseNum:u}}}},void 0);if(o)return o}function ro({scrRef:e,handleSubmit:t,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:l,onAddRecentSearch:c,id:d}){const[w,p]=a.useState(!1),[m,f]=a.useState(""),[u,g]=a.useState(-1),[b,v]=a.useState(-1),j=a.useRef(null),C=a.useRef(null),S=a.useRef(null),E=a.useMemo(()=>o?o():to,[o]),$=a.useMemo(()=>({[N.Section.OT]:E.filter(q=>at.Canon.isBookOT(q)),[N.Section.NT]:E.filter(q=>at.Canon.isBookNT(q)),[N.Section.DC]:E.filter(q=>at.Canon.isBookDC(q)),[N.Section.Extra]:E.filter(q=>at.Canon.extraBooks().includes(q))}),[E]),V=a.useMemo(()=>Object.values($).flat(),[$]),M=a.useMemo(()=>{if(!m.trim())return $;const k={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return[N.Section.OT,N.Section.NT,N.Section.DC,N.Section.Extra].forEach(K=>{k[K]=$[K].filter(rt=>Fn(rt,m,s))}),k},[$,m,s]),D=a.useMemo(()=>Object.values(M).flat(),[M]),y=a.useMemo(()=>Ga(m,V,s),[m,V,s]),T=a.useMemo(()=>{if(m.trim()&&(y==null?void 0:y.chapterNum)===void 0){if(y)return y.book;if(D.length===1)return D[0]}},[m,y,D]),I=(y==null?void 0:y.book)??T??void 0,L=a.useCallback(k=>{t(k),c&&c(k)},[t,c]),O=a.useCallback((k,q)=>{L({book:k,chapterNum:q,verseNum:1}),p(!1)},[L]),A=a.useCallback(k=>{var rt;if(Pe(k)<=1){O(k,1);return}const K=s?Pt(k,s):Ve[k];f(`${K} `),g(-1),v(-1),(rt=j.current)==null||rt.focus()},[O,s]),U=a.useCallback(k=>{I&&O(I,k)},[I,O]),G=a.useCallback(()=>{y&&O(y.book,y.chapterNum??1)},[y,O]),H=a.useCallback(k=>{p(k),k&&(f(""),g(-1),v(-1),setTimeout(()=>{var q;return(q=j.current)==null?void 0:q.focus()},100))},[]);a.useEffect(()=>{if(!w)return;const k=setTimeout(()=>{if(!C.current||m)return;const q=C.current.querySelector(`[data-book-id="${e.book}"]`);q&&q.scrollIntoView({block:"center",behavior:"instant"})},150);return()=>clearTimeout(k)},[w,e.book,m]);const Nt=a.useCallback(()=>{if(!S.current)return 10;const k=S.current.querySelectorAll("[data-chapter-btn]");if(k.length<2)return 1;const q=k[0].offsetTop;let K=0;for(let rt=0;rt<k.length&&k[rt].offsetTop===q;rt++)K++;return K||1},[]),Rt=a.useCallback(()=>{var k;g(-1),v(-1),(k=j.current)==null||k.focus()},[]),Ot=a.useCallback(k=>{var q;if(k.key==="Escape"){I&&m?(f(""),v(-1),k.stopPropagation(),k.preventDefault()):p(!1);return}if(k.key==="Tab"){k.preventDefault(),k.stopPropagation(),k.shiftKey?Rt():I?v(0):D.length>0&&g(0);return}if(I&&b>=0){const K=Pe(I),rt=Nt(),Tt=z=>{v(z)};if(k.key==="ArrowRight"){k.preventDefault(),b<K-1&&Tt(b+1);return}if(k.key==="ArrowLeft"){k.preventDefault(),b>0&&Tt(b-1);return}if(k.key==="ArrowDown"){k.preventDefault();const z=b+rt;z<K&&Tt(z);return}if(k.key==="ArrowUp"){k.preventDefault();const z=b-rt;z<0?Rt():Tt(z);return}if(k.key==="Enter"||k.key===" "){k.preventDefault(),U(b+1);return}const{isLetter:mt,isDigit:P}=Ba(k.key);(mt||P)&&(k.preventDefault(),f(z=>z+k.key),v(-1),(q=j.current)==null||q.focus());return}if(!I&&D.length>0){if(k.key==="ArrowDown"){k.preventDefault(),k.stopPropagation(),u<0?g(0):u+1<D.length&&g(u+1);return}if(k.key==="ArrowUp"){if(k.preventDefault(),k.stopPropagation(),u<0)return;u-1<0?Rt():g(u-1);return}}if(I&&b<0&&k.key==="ArrowDown"){k.preventDefault();const K=y!=null&&y.chapterNum?y.chapterNum-1:0;v(K);return}if(k.key==="Enter"){if(y!=null&&y.chapterNum){G();return}if(!I&&u>=0&&u<D.length){k.preventDefault(),A(D[u]);return}if(!I&&D.length===1){A(D[0]);return}}k.key===" "&&!I&&u>=0&&(k.preventDefault(),A(D[u]))},[I,m,b,u,D,y,Rt,Nt,U,G,A]);a.useEffect(()=>{g(-1)},[D.length]),a.useEffect(()=>{v(-1)},[I]),a.useEffect(()=>{if(!S.current)return;const k=b>=0?b:void 0;if(k===void 0)return;const K=S.current.querySelectorAll("[data-chapter-btn]")[k];K&&K.scrollIntoView({block:"nearest",behavior:"smooth"})},[b]);const dt=a.useMemo(()=>N.formatScrRef(e,s?Pt(e.book,s):"English"),[e,s]),{otLong:ct,ntLong:B,dcLong:tt,extraLong:et}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},st=a.useCallback(k=>Zr(k,ct,B,tt,et),[ct,B,tt,et]),kt=!m&&!I&&l&&l.length>0,Bt=I?Pe(I):0,Gt=a.useMemo(()=>b>=0&&I?`Enter to go to ${Pt(I,s)} ${b+1}`:y!=null&&y.chapterNum?`Press Enter to go to ${Pt(y.book,s)} ${y.chapterNum}`:T?"Type a chapter number or click to select":D.length===1&&m?`↓ Enter to select ${Pt(D[0],s)}`:u>=0&&u<D.length?`Enter to select ${Pt(D[u],s)}`:`${D.length} books available · Search books… e.g. "GEN 5" or "Genesis 5"`,[b,I,y,T,D,m,u,s]);return n.jsxs(n.Fragment,{children:[n.jsx(F,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":w,onClick:()=>H(!0),className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:dt})}),n.jsxs(Xr,{open:w,onOpenChange:H,shouldFilter:!1,children:[n.jsx(ve,{ref:j,icon:I?n.jsx(F,{variant:"ghost",size:"icon",className:"tw-me-2 tw-h-8 tw-w-8 tw-shrink-0",onClick:()=>{var k;f(""),v(-1),(k=j.current)==null||k.focus()},children:n.jsx(_.ArrowLeft,{className:"tw-h-4 tw-w-4"})}):void 0,value:m,onValueChange:k=>{f(k),v(-1),g(-1)},onKeyDown:Ot,onFocus:()=>{v(-1),g(-1)},placeholder:'Search books… e.g. "GEN 5" or "Genesis 5"',autoFocus:!0}),(y==null?void 0:y.chapterNum)&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-border-b tw-bg-muted tw-px-4 tw-py-2",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(_.CornerDownLeftIcon,{className:"tw-h-3.5 tw-w-3.5 tw-text-muted-foreground"}),n.jsxs("span",{className:"tw-text-sm tw-text-foreground",children:["Go to"," ",n.jsxs("span",{className:"tw-font-semibold",children:[Pt(y.book,s)," ",y.chapterNum,y.verseNum?`:${y.verseNum}`:""]})]})]}),n.jsx(Zt,{variant:"secondary",children:"ENTER"})]}),!(y!=null&&y.chapterNum)&&T&&n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-border-b tw-bg-muted tw-px-4 tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(_.CornerDownLeftIcon,{className:"tw-h-3.5 tw-w-3.5 tw-text-muted-foreground"}),n.jsxs("span",{className:"tw-text-sm tw-text-foreground",children:["Select chapter in"," ",n.jsx("span",{className:"tw-font-semibold",children:Pt(T,s)})]})]})}),I&&n.jsxs("div",{className:"tw-flex tw-items-baseline tw-justify-between tw-border-b tw-px-4 tw-py-3",children:[n.jsx("h3",{className:"tw-text-lg tw-font-bold",children:Pt(I,s)}),n.jsxs("span",{className:"tw-text-xs tw-uppercase tw-tracking-wider tw-text-muted-foreground",children:[Bt," Chapters"]})]}),kt&&n.jsxs("div",{className:"tw-border-b tw-px-2 tw-py-2",children:[n.jsxs("div",{className:"tw-mb-2 tw-flex tw-items-center tw-gap-1.5 tw-px-2",children:[n.jsx(_.ClockIcon,{className:"tw-h-3 tw-w-3 tw-text-muted-foreground"}),n.jsx("span",{className:"tw-text-xs tw-font-medium tw-text-muted-foreground",children:(i==null?void 0:i["%history_recent%"])??"Recent"})]}),n.jsx("div",{className:"tw-flex tw-flex-col tw-gap-1",children:l.map(k=>{const q=k.book===e.book&&k.chapterNum===e.chapterNum;return n.jsxs("button",{type:"button",tabIndex:-1,onClick:()=>{L(k),p(!1)},className:h("tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors",q?"tw-bg-accent tw-text-accent-foreground":"hover:tw-bg-accent hover:tw-text-accent-foreground"),children:[n.jsx("span",{children:N.formatScrRef(k,"English")}),q&&n.jsx(Zt,{variant:"secondary",className:"tw-text-[10px]",children:"Current"})]},`${k.book}-${k.chapterNum}-${k.verseNum}`)})})]}),I?n.jsx("div",{className:"tw-max-h-[300px] tw-overflow-x-hidden tw-overflow-y-auto tw-p-4",children:n.jsx("div",{ref:S,className:"tw-grid tw-grid-cols-5 sm:tw-grid-cols-8 md:tw-grid-cols-10 tw-gap-2",children:Array.from({length:Bt}).map((k,q)=>{const K=q+1,rt=(y==null?void 0:y.chapterNum)===K,Tt=I===e.book&&K===e.chapterNum,mt=b===q;return n.jsx(F,{"data-chapter-btn":!0,tabIndex:-1,variant:mt||rt?"default":Tt?"secondary":"outline",onClick:()=>U(K),className:h("tw-aspect-square tw-h-auto tw-p-0 tw-font-mono",mt&&"tw-ring-2 tw-ring-ring tw-ring-offset-2"),children:K},K)})})}):n.jsxs(Xt,{ref:C,id:d,children:[Object.entries(M).map(([k,q])=>{if(q.length!==0)return n.jsx(de,{heading:st(k),children:q.map(K=>{const rt=D.indexOf(K),Tt=u===rt;return n.jsx(eo,{bookId:K,onSelect:mt=>A(mt),section:N.getSectionForBook(K),commandValue:`${K} ${Ve[K]}`,localizedBookNames:s,className:h(e.book===K&&!Tt&&"tw-bg-accent/50",Tt&&"tw-bg-accent tw-text-accent-foreground")},K)})},k)}),D.length===0&&n.jsxs(ye,{children:["No books found matching “",m,"”"]})]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-border-t tw-px-4 tw-py-2 tw-text-xs tw-text-muted-foreground",children:[n.jsx("span",{children:Gt}),n.jsxs("div",{className:"tw-flex tw-gap-3",children:[n.jsxs("span",{className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(_.BookOpenIcon,{className:"tw-h-3 tw-w-3"}),n.jsx("span",{children:"Book"})]}),n.jsxs("span",{className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(_.HashIcon,{className:"tw-h-3 tw-w-3"}),n.jsx("span",{children:"Chapter"})]})]})]})]})]})}function qa(e){return n.jsx(ro,{...e})}const Ka=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Ua=we.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),it=a.forwardRef(({className:e,...t},r)=>n.jsx(Br.Root,{ref:r,className:h("pr-twp",Ua(),e),...t}));it.displayName=Br.Root.displayName;const pn=a.forwardRef(({className:e,...t},r)=>{const o=ut();return n.jsx(Fe.Root,{className:h("pr-twp tw-grid tw-gap-2",e),...t,ref:r,dir:o})});pn.displayName=Fe.Root.displayName;const ze=a.forwardRef(({className:e,...t},r)=>n.jsx(Fe.Item,{ref:r,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:n.jsx(Fe.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(_.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ze.displayName=Fe.Item.displayName;const ee=Ee.Root,pe=Ee.Trigger,oo=Ee.Anchor,Wt=a.forwardRef(({className:e,align:t="center",sideOffset:r=4,...o},s)=>{const i=ut();return n.jsx(Ee.Portal,{children:n.jsx(Ee.Content,{ref:s,align:t,sideOffset:r,className:h("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,dir:i})})});Wt.displayName=Ee.Content.displayName;function Ha(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function en({id:e,options:t=[],className:r,buttonClassName:o,popoverContentClassName:s,value:i,onChange:l=()=>{},getOptionLabel:c=Ha,getButtonLabel:d,icon:w=void 0,buttonPlaceholder:p="",textPlaceholder:m="",commandEmptyMessage:f="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:b=!1,ariaLabel:v,...j}){const[C,S]=a.useState(!1),E=d??c,$=M=>M.length>0&&typeof M[0]=="object"&&"options"in M[0],V=(M,D)=>{const y=c(M),T=typeof M=="object"&&"secondaryLabel"in M?M.secondaryLabel:void 0,I=`${D??""}${y}${T??""}`;return n.jsxs(te,{value:y,onSelect:()=>{l(M),S(!1)},className:"tw-flex tw-items-center",children:[n.jsx(_.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||c(i)!==y})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[y,T&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",T]})]})]},I)};return n.jsxs(ee,{open:C,onOpenChange:S,...j,children:[n.jsx(pe,{asChild:!0,children:n.jsxs(F,{variant:u,role:"combobox","aria-expanded":C,"aria-label":v,id:e,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[w&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:w}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?E(i):p})]}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Wt,{align:g,className:h("tw-w-[200px] tw-p-0",s),children:n.jsxs(Yt,{children:[n.jsx(ve,{placeholder:m,className:"tw-text-inherit"}),n.jsx(ye,{children:f}),n.jsx(Xt,{children:$(t)?t.map(M=>n.jsx(de,{heading:M.groupHeading,children:M.options.map(D=>V(D,M.groupHeading))},M.groupHeading)):t.map(M=>V(M))})]})})]})}function so({startChapter:e,endChapter:t,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const l=a.useMemo(()=>Array.from({length:i},(w,p)=>p+1),[i]),c=w=>{r(w),w>t&&o(w)},d=w=>{o(w),w<e&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(it,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(en,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:e},"start chapter"),n.jsx(it,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(en,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:t},"end chapter")]})}exports.BookSelectionMode=(e=>(e.CurrentBook="current book",e.ChooseBooks="choose books",e))(exports.BookSelectionMode||{});(e=>{e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const Ya=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),bn=(e,t)=>e[t]??t;function Xa({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=bn(w,"%webView_bookSelector_currentBook%"),m=bn(w,"%webView_bookSelector_choose%"),f=bn(w,"%webView_bookSelector_chooseBooks%"),[u,g]=a.useState("current book"),b=v=>{g(v),e(v)};return n.jsx(pn,{className:"pr-twp tw-flex",value:u,onValueChange:v=>b(v),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"current book"}),n.jsx(it,{className:"tw-ms-1",children:p})]}),n.jsx(it,{className:"tw-flex tw-items-center",children:t}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(so,{isDisabled:u==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"choose books"}),n.jsx(it,{className:"tw-ms-1",children:f})]}),n.jsx(it,{className:"tw-flex tw-items-center",children:o.map(v=>at.Canon.bookIdToEnglishName(v)).join(", ")}),n.jsx(F,{disabled:u==="current book",onClick:()=>r(),children:m})]})]})})}function Wa({recentSearches:e,onSearchItemSelect:t,renderItem:r=p=>String(p),getItemKey:o=p=>String(p),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:l,classNameForItems:c,buttonClassName:d="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:w="ghost"}){const[p,m]=a.useState(!1);if(e.length===0)return;const f=u=>{t(u),m(!1)};return n.jsxs(ee,{open:p,onOpenChange:m,children:[n.jsx(pe,{asChild:!0,children:n.jsx(F,{variant:w,size:"icon",className:d,"aria-label":s,children:n.jsx(_.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Wt,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Yt,{children:n.jsx(Xt,{children:n.jsx(de,{heading:i,children:e.map(u=>n.jsxs(te,{onSelect:()=>f(u),className:h("tw-flex tw-items-center",c),children:[n.jsx(_.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function Ja(e,t,r=(s,i)=>s===i,o=15){return s=>{const i=e.filter(c=>!r(c,s)),l=[s,...i.slice(0,o-1)];t(l)}}const ao=a.createContext(null);function Za(e,t){return{getTheme:function(){return t??null}}}function Jt(){const e=a.useContext(ao);return e==null&&function(t,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",t);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),e}const io=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Qa=io?a.useLayoutEffect:a.useEffect,We={tag:x.HISTORY_MERGE_TAG};function ti({initialConfig:e,children:t}){const r=a.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:l,editorState:c,html:d}=e,w=Za(null,o),p=x.createEditor({editable:e.editable,html:d,namespace:s,nodes:i,onError:m=>l(m,p),theme:o});return function(m,f){if(f!==null){if(f===void 0)m.update(()=>{const u=x.$getRoot();if(u.isEmpty()){const g=x.$createParagraphNode();u.append(g);const b=io?document.activeElement:null;(x.$getSelection()!==null||b!==null&&b===m.getRootElement())&&g.select()}},We);else if(f!==null)switch(typeof f){case"string":{const u=m.parseEditorState(f);m.setEditorState(u,We);break}case"object":m.setEditorState(f,We);break;case"function":m.update(()=>{x.$getRoot().isEmpty()&&f(m)},We)}}}(p,c),[p,w]},[]);return Qa(()=>{const o=e.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(ao.Provider,{value:r,children:t})}const ei=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function ni({ignoreHistoryMergeTagChange:e=!0,ignoreSelectionChange:t=!1,onChange:r}){const[o]=Jt();return ei(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:l,prevEditorState:c,tags:d})=>{t&&i.size===0&&l.size===0||e&&d.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,e,t,r]),null}const zn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},yt=he.Provider,_t=he.Root,Ct=a.forwardRef(({className:e,variant:t,...r},o)=>n.jsx(he.Trigger,{ref:o,className:t?h(Vn({variant:t}),e):e,...r}));Ct.displayName=he.Trigger.displayName;const jt=a.forwardRef(({className:e,sideOffset:t=4,...r},o)=>n.jsx(he.Portal,{children:n.jsx(he.Content,{ref:o,sideOffset:t,className:h("pr-twp tw-z-[250] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r})}));jt.displayName=he.Content.displayName;const Bn=[Tn.HeadingNode,x.ParagraphNode,x.TextNode,Tn.QuoteNode],ri=a.createContext(null),vn={didCatch:!1,error:null};class oi extends a.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=vn}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var r,o,s=arguments.length,i=new Array(s),l=0;l<s;l++)i[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(vn)}}componentDidCatch(t,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,t,r)}componentDidUpdate(t,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&si(t.resetKeys,s)){var i,l;(i=(l=this.props).onReset)===null||i===void 0||i.call(l,{next:s,prev:t.resetKeys,reason:"keys"}),this.setState(vn)}}render(){const{children:t,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:l}=this.state;let c=t;if(i){const d={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=a.createElement(o,d);else if(s!==void 0)c=s;else throw l}return a.createElement(ri.Provider,{value:{didCatch:i,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function si(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((r,o)=>!Object.is(r,t[o]))}function ai({children:e,onError:t}){return n.jsx(oi,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:t,children:e})}const ii=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function li(e){return{initialValueFn:()=>e.isEditable(),subscribe:t=>e.registerEditableListener(t)}}function ci(){return function(e){const[t]=Jt(),r=a.useMemo(()=>e(t),[t,e]),[o,s]=a.useState(()=>r.initialValueFn()),i=a.useRef(o);return ii(()=>{const{initialValueFn:l,subscribe:c}=r,d=l();return i.current!==d&&(i.current=d,s(d)),c(w=>{i.current=w,s(w)})},[r,e]),o}(li)}function wi(e,t,r="self"){const o=e.getStartEndPoints();if(t.isSelected(e)&&!x.$isTokenOrSegmented(t)&&o!==null){const[s,i]=o,l=e.isBackward(),c=s.getNode(),d=i.getNode(),w=t.is(c),p=t.is(d);if(w||p){const[m,f]=x.$getCharacterOffsets(e),u=c.is(d),g=t.is(l?d:c),b=t.is(l?c:d);let v,j=0;u?(j=m>f?f:m,v=m>f?m:f):g?(j=l?f:m,v=void 0):b&&(j=0,v=l?m:f);const C=t.__text.slice(j,v);C!==t.__text&&(r==="clone"&&(t=x.$cloneWithPropertiesEphemeral(t)),t.__text=C)}}return t}function di(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const lo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,pi=lo&&"documentMode"in document?document.documentMode:null;!(!lo||!("InputEvent"in window)||pi)&&"getTargetRanges"in new window.InputEvent("input");function vr(e){const t=x.$findMatchingParent(e,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(t)||di(4,e.__key),t}const ui=Symbol.for("preact-signals");function un(){if(oe>1)return void oe--;let e,t=!1;for(;Le!==void 0;){let r=Le;for(Le=void 0,On++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&co(r))try{r.c()}catch(s){t||(e=s,t=!0)}r=o}}if(On=0,oe--,t)throw e}function mi(e){if(oe>0)return e();oe++;try{return e()}finally{un()}}let Y,Le;function yr(e){const t=Y;Y=void 0;try{return e()}finally{Y=t}}let oe=0,On=0,Qe=0;function jr(e){if(Y===void 0)return;let t=e.n;return t===void 0||t.t!==Y?(t={i:0,S:e,p:Y.s,n:void 0,t:Y,e:void 0,x:void 0,r:t},Y.s!==void 0&&(Y.s.n=t),Y.s=t,e.n=t,32&Y.f&&e.S(t),t):t.i===-1?(t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=Y.s,t.n=void 0,Y.s.n=t,Y.s=t),t):void 0}function bt(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Be(e,t){return new bt(e,t)}function co(e){for(let t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Nr(e){for(let t=e.s;t!==void 0;t=t.n){const r=t.S.n;if(r!==void 0&&(t.r=r),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function wo(e){let t,r=e.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):t=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}e.s=t}function me(e,t){bt.call(this,void 0),this.x=e,this.s=void 0,this.g=Qe-1,this.f=4,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function fi(e,t){return new me(e,t)}function po(e){const t=e.u;if(e.u=void 0,typeof t=="function"){oe++;const r=Y;Y=void 0;try{t()}catch(o){throw e.f&=-2,e.f|=8,Gn(e),o}finally{Y=r,un()}}}function Gn(e){for(let t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,po(e)}function hi(e){if(Y!==this)throw new Error("Out-of-order effect");wo(this),Y=e,this.f&=-2,8&this.f&&Gn(this),un()}function _e(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t==null?void 0:t.name}function ae(e,t){const r=new _e(e,t);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function mn(e,t={}){const r={};for(const o in e){const s=t[o],i=Be(s===void 0?e[o]:s);r[o]=i}return r}bt.prototype.brand=ui,bt.prototype.h=function(){return!0},bt.prototype.S=function(e){const t=this.t;t!==e&&e.e===void 0&&(e.x=t,this.t=e,t!==void 0?t.e=e:yr(()=>{var r;(r=this.W)==null||r.call(this)}))},bt.prototype.U=function(e){if(this.t!==void 0){const t=e.e,r=e.x;t!==void 0&&(t.x=r,e.e=void 0),r!==void 0&&(r.e=t,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&yr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},bt.prototype.subscribe=function(e){return ae(()=>{const t=this.value,r=Y;Y=void 0;try{e(t)}finally{Y=r}},{name:"sub"})},bt.prototype.valueOf=function(){return this.value},bt.prototype.toString=function(){return this.value+""},bt.prototype.toJSON=function(){return this.value},bt.prototype.peek=function(){const e=Y;Y=void 0;try{return this.value}finally{Y=e}},Object.defineProperty(bt.prototype,"value",{get(){const e=jr(this);return e!==void 0&&(e.i=this.i),this.v},set(e){if(e!==this.v){if(On>100)throw new Error("Cycle detected");this.v=e,this.i++,Qe++,oe++;try{for(let t=this.t;t!==void 0;t=t.x)t.t.N()}finally{un()}}}}),me.prototype=new bt,me.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Qe))return!0;if(this.g=Qe,this.f|=1,this.i>0&&!co(this))return this.f&=-2,!0;const e=Y;try{Nr(this),Y=this;const t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return Y=e,wo(this),this.f&=-2,!0},me.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(let t=this.s;t!==void 0;t=t.n)t.S.S(t)}bt.prototype.S.call(this,e)},me.prototype.U=function(e){if(this.t!==void 0&&(bt.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(let t=this.s;t!==void 0;t=t.n)t.S.U(t)}},me.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(me.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const e=jr(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}}),_e.prototype.c=function(){const e=this.S();try{if(8&this.f||this.x===void 0)return;const t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}},_e.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,po(this),Nr(this),oe++;const e=Y;return Y=this,hi.bind(this,e)},_e.prototype.N=function(){2&this.f||(this.f|=2,this.o=Le,Le=this)},_e.prototype.d=function(){this.f|=8,1&this.f||Gn(this)},_e.prototype.dispose=function(){this.d()};x.defineExtension({build:(e,t,r)=>mn(t),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(e,t,r){const o=r.getOutput();return ae(()=>o.disabled.value?void 0:e.registerRootListener(s=>{e.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function uo(){const e=x.$getRoot(),t=x.$getSelection(),r=x.$createParagraphNode();e.clear(),e.append(r),t!==null&&r.select(),x.$isRangeSelection(t)&&(t.format=0)}function mo(e,t=uo){return e.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(e.update(t),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(e,t,r)=>mn(t),config:x.safeCast({$onClear:uo}),name:"@lexical/extension/ClearEditor",register(e,t,r){const{$onClear:o}=r.getOutput();return ae(()=>mo(e,o.value))}});function gi(e){return(typeof e.nodes=="function"?e.nodes():e.nodes)||[]}function fo(e,t){let r;return Be(e(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=e(),r=t(this)}})}const An=x.defineExtension({build:e=>fo(()=>e.getEditorState(),t=>e.registerUpdateListener(r=>{t.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function ho(e,t){if(e&&t&&!Array.isArray(t)&&typeof e=="object"&&typeof t=="object"){const r=e,o=t;for(const s in o)r[s]=ho(r[s],o[s]);return e}return t}const qn=0,Pn=1,go=2,yn=3,Je=4,ke=5,jn=6,Ie=7;function Nn(e){return e.id===qn}function xo(e){return e.id===go}function xi(e){return function(t){return t.id===Pn}(e)||W(305,String(e.id),String(Pn)),Object.assign(e,{id:go})}const bi=new Set;class vi{constructor(t,r){xt(this,"builder");xt(this,"configs");xt(this,"_dependency");xt(this,"_peerNameSet");xt(this,"extension");xt(this,"state");xt(this,"_signal");this.builder=t,this.extension=r,this.configs=new Set,this.state={id:qn}}mergeConfigs(){let t=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)t=r(t,o);return t}init(t){const r=this.state;xo(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,d,w){return Object.assign(c,{config:d,id:yn,registerState:w})}(r,this.mergeConfigs(),o);let l;this.state=i,this.extension.init&&(l=this.extension.init(t,i.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:Je,initResult:d,registerState:w})}(i,l,s)}build(t){const r=this.state;let o;r.id!==Je&&W(307,String(r.id),String(ke)),this.extension.build&&(o=this.extension.build(t,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,l,c){return Object.assign(i,{id:ke,output:l,registerState:c})}(r,o,s)}register(t,r){this._signal=r;const o=this.state;o.id!==ke&&W(308,String(o.id),String(ke));const s=this.extension.register&&this.extension.register(t,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:jn})}(o),()=>{const i=this.state;i.id!==Ie&&W(309,String(o.id),String(Ie)),this.state=function(l){return Object.assign(l,{id:ke})}(i),s&&s()}}afterRegistration(t){const r=this.state;let o;return r.id!==jn&&W(310,String(r.id),String(jn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(t,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ie})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const t=this.state;return function(r){return r.id>=Je}(t)||W(313,String(t.id),String(Je)),t.initResult}getInitPeer(t){const r=this.builder.extensionNameMap.get(t);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const t=this.state;return function(r){return r.id>=yn}(t)||W(314,String(t.id),String(yn)),{config:t.config}}getPeer(t){const r=this.builder.extensionNameMap.get(t);return r?r.getExtensionDependency():void 0}getInitDependency(t){const r=this.builder.getExtensionRep(t);return r===void 0&&W(315,this.extension.name,t.name),r.getExtensionInitDependency()}getDependency(t){const r=this.builder.getExtensionRep(t);return r===void 0&&W(315,this.extension.name,t.name),r.getExtensionDependency()}getState(){const t=this.state;return function(r){return r.id>=Ie}(t)||W(316,String(t.id),String(Ie)),t}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||bi}getPeerNameSet(){let t=this._peerNameSet;return t||(t=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=t),t}getExtensionDependency(){if(!this._dependency){const t=this.state;(function(r){return r.id>=ke})(t)||W(317,this.extension.name),this._dependency={config:t.config,init:t.initResult,output:t.output}}return this._dependency}}const kr={tag:x.HISTORY_MERGE_TAG};function yi(){const e=x.$getRoot();e.isEmpty()&&e.append(x.$createParagraphNode())}const ji=x.defineExtension({config:x.safeCast({setOptions:kr,updateOptions:kr}),init:({$initialEditorState:e=yi})=>({$initialEditorState:e,initialized:!1}),afterRegistration(e,{updateOptions:t,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))e.setEditorState(i,r);else if(typeof i=="function")e.update(()=>{i(e)},t);else if(i&&(typeof i=="string"||typeof i=="object")){const l=e.parseEditorState(i);e.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),_r=Symbol.for("@lexical/extension/LexicalBuilder");function Cr(){}function Ni(e){throw e}function Ze(e){return Array.isArray(e)?e:[e]}const kn="0.40.0+prod.esm";class $e{constructor(t){xt(this,"roots");xt(this,"extensionNameMap");xt(this,"outgoingConfigEdges");xt(this,"incomingEdges");xt(this,"conflicts");xt(this,"_sortedExtensionReps");xt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=kn,this.roots=t;for(const r of t)this.addExtension(r)}static fromExtensions(t){const r=[Ze(ji)];for(const o of t)r.push(Ze(o));return new $e(r)}static maybeFromEditor(t){const r=t[_r];return r&&(r.PACKAGE_VERSION!==kn&&W(292,r.PACKAGE_VERSION,kn),r instanceof $e||W(293)),r}static fromEditor(t){const r=$e.maybeFromEditor(t);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:t,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[_r]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let t=Cr;function r(){try{t()}finally{t=Cr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return t=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(t){return this.extensionNameMap.has(t)}getExtensionRep(t){const r=this.extensionNameMap.get(t.name);if(r)return r.extension!==t&&W(295,t.name),r}addEdge(t,r,o){const s=this.outgoingConfigEdges.get(t);s?s.set(r,o):this.outgoingConfigEdges.set(t,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(t):this.incomingEdges.set(r,new Set([t]))}addExtension(t){this._sortedExtensionReps!==void 0&&W(296);const r=Ze(t),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new vi(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&W(299,o.name,i);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&W(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=Ze(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const t=[],r=(o,s)=>{let i=o.state;if(xo(i))return;const l=o.extension.name;var c;Nn(i)||W(300,l,s||"[unknown]"),Nn(c=i)||W(304,String(c.id),String(qn)),i=Object.assign(c,{id:Pn}),o.state=i;const d=this.outgoingConfigEdges.get(l);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&r(p,l)}i=xi(i),o.state=i,t.push(o)};for(const o of this.extensionNameMap.values())Nn(o.state)&&r(o);for(const o of t)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of i)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&W(301,o.name);for(const l of s)i.configs.add(l)}return this._sortedExtensionReps=t,this._sortedExtensionReps}registerEditor(t){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const l of r){const c=l.register(t,i);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(t);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const t={},r=new Set,o=new Map,s=new Map,i={},l={},c=this.sortedExtensionReps();for(const p of c){const{extension:m}=p;if(m.onError!==void 0&&(t.onError=m.onError),m.disableEvents!==void 0&&(t.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(t.parentEditor=m.parentEditor),m.editable!==void 0&&(t.editable=m.editable),m.namespace!==void 0&&(t.namespace=m.namespace),m.$initialEditorState!==void 0&&(t.$initialEditorState=m.$initialEditorState),m.nodes)for(const f of gi(m)){if(typeof f!="function"){const u=o.get(f.replace);u&&W(302,m.name,f.replace.name,u.extension.name),o.set(f.replace,p)}r.add(f)}if(m.html){if(m.html.export)for(const[f,u]of m.html.export.entries())s.set(f,u);m.html.import&&Object.assign(i,m.html.import)}m.theme&&ho(l,m.theme)}Object.keys(l).length>0&&(t.theme=l),r.size&&(t.nodes=[...r]);const d=Object.keys(i).length>0,w=s.size>0;(d||w)&&(t.html={},d&&(t.html.import=i),w&&(t.html.export=s));for(const p of c)p.init(t);return t.onError||(t.onError=Ni),t}}const ki=new Set,Er=x.defineExtension({build(e,t,r){const o=r.getDependency(An).output,s=Be({watchedNodeKeys:new Map}),i=fo(()=>{},()=>ae(()=>{const l=i.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,m]of c.entries()){if(m.size===0){c.delete(p);continue}const f=x.$getNodeByKey(p),u=f&&f.isSelected()||!1;w=w||u!==(!!l&&l.has(p)),u&&(d=d||new Set,d.add(p))}}),!w&&d&&l&&d.size===l.size||(i.value=d)}));return{watchNodeKey:function(l){const c=fi(()=>(i.value||ki).has(l)),{watchedNodeKeys:d}=s.peek();let w=d.get(l);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(l,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[An],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Se extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(t){return new Se(t.__key)}static importJSON(t){return bo().updateFromJSON(t)}static importDOM(){return{hr:()=>({conversion:_i,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(t){const r=document.createElement("hr");return x.addClassNamesToElement(r,t.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function _i(){return{node:bo()}}function bo(){return x.$create(Se)}function Ci(e){return e instanceof Se}x.defineExtension({dependencies:[An,Er],name:"@lexical/extension/HorizontalRule",nodes:()=>[Se],register(e,t,r){const{watchNodeKey:o}=r.getDependency(Er).output,s=Be({nodeSelections:new Map}),i=e._config.theme.hrSelected??"selected";return x.mergeRegister(e.registerCommand(x.CLICK_COMMAND,l=>{if(x.isDOMNode(l.target)){const c=x.$getNodeFromDOMNode(l.target);if(Ci(c))return function(d,w=!1){const p=x.$getSelection(),m=d.isSelected(),f=d.getKey();let u;w&&x.$isNodeSelection(p)?u=p:(u=x.$createNodeSelection(),x.$setSelection(u)),m?u.delete(f):u.add(f)}(c,l.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),e.registerMutationListener(Se,(l,c)=>{mi(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,m]of l.entries())if(m==="destroyed")w.delete(p),d=!0;else{const f=w.get(p),u=e.getElementByKey(p);f?f.domNode.value=u:(d=!0,w.set(p,{domNode:Be(u),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),ae(()=>{const l=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())l.push(ae(()=>{const w=c.value;w&&(d.value?x.addClassNamesToElement(w,i):x.removeClassNamesFromElement(w,i))}));return x.mergeRegister(...l)}))}});function Ei(e,t){return x.mergeRegister(e.registerCommand(x.KEY_TAB_COMMAND,r=>{const o=x.$getSelection();if(!x.$isRangeSelection(o))return!1;r.preventDefault();const s=function(i){if(i.getNodes().filter(m=>x.$isBlockElementNode(m)&&m.canIndent()).length>0)return!0;const l=i.anchor,c=i.focus,d=c.isBefore(l)?c:l,w=d.getNode(),p=vr(w);if(p.canIndent()){const m=p.getKey();let f=x.$createRangeSelection();if(f.anchor.set(m,0,"element"),f.focus.set(m,0,"element"),f=x.$normalizeSelection__EXPERIMENTAL(f),f.anchor.is(d))return!0}return!1}(o)?r.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return e.dispatchCommand(s,void 0)},x.COMMAND_PRIORITY_EDITOR),e.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const r=typeof t=="number"?t:t?t.peek():null;if(r==null)return!1;const o=x.$getSelection();if(!x.$isRangeSelection(o))return!1;const s=o.getNodes().map(i=>vr(i).getIndent());return Math.max(...s)+1>=r},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(e,t,r)=>mn(t),config:x.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(e,t,r){const{disabled:o,maxIndent:s}=r.getOutput();return ae(()=>{if(!o.value)return Ei(e,s)})}});const Si=x.defineExtension({name:"@lexical/react/ReactProvider"});function Ri(){return x.$getRoot().getTextContent()}function Ti(e,t=!0){if(e)return!1;let r=Ri();return t&&(r=r.trim()),r===""}function Mi(e){if(!Ti(e,!1))return!1;const t=x.$getRoot().getChildren(),r=t.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=t[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),l=i.length;for(let c=0;c<l;c++){const d=i[o];if(!x.$isTextNode(d))return!1}}}return!0}function vo(e){return()=>Mi(e)}function yo(e){const t=window.location.origin,r=o=>{if(o.origin!==t)return;const s=e.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let l;try{l=JSON.parse(i)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,m,f,u]=d;e.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const b=g.anchor;let v=b.getNode(),j=0,C=0;if(x.$isTextNode(v)&&w>=0&&p>=0&&(j=w,C=w+p,g.setTextNodeRange(v,j,v,C)),j===C&&m===""||(g.insertRawText(m),v=b.getNode()),x.$isTextNode(v)){j=f,C=f+u;const S=v.getTextContentSize();j=j>S?S:j,C=C>S?S:C,g.setTextNodeRange(v,j,v,C)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(e,t,r)=>mn(t),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(e,t,r)=>ae(()=>r.getOutput().disabled.value?void 0:yo(e))});function Di(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Kn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Ii({editor:e,ErrorBoundary:t}){return function(r,o){const[s,i]=a.useState(()=>r.getDecorators());return Kn(()=>r.registerDecoratorListener(l=>{br.flushSync(()=>{i(l)})}),[r]),a.useEffect(()=>{i(r.getDecorators())},[r]),a.useMemo(()=>{const l=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=n.jsx(o,{onError:f=>r._onError(f),children:n.jsx(a.Suspense,{fallback:null,children:s[w]})}),m=r.getElementByKey(w);m!==null&&l.push(br.createPortal(p,m,w))}return l},[o,s,r])}(e,t)}function Oi({editor:e,ErrorBoundary:t}){return function(r){const o=$e.maybeFromEditor(r);if(o&&o.hasExtensionByName(Si.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Di(320,s);return!0}return!1}(e)?null:n.jsx(Ii,{editor:e,ErrorBoundary:t})}function Sr(e){return e.getEditorState().read(vo(e.isComposing()))}function Ai({contentEditable:e,placeholder:t=null,ErrorBoundary:r}){const[o]=Jt();return function(s){Kn(()=>x.mergeRegister(Tn.registerRichText(s),yo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[e,n.jsx(Pi,{content:t}),n.jsx(Oi,{editor:o,ErrorBoundary:r})]})}function Pi({content:e}){const[t]=Jt(),r=function(s){const[i,l]=a.useState(()=>Sr(s));return Kn(()=>{function c(){const d=Sr(s);l(d)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(t),o=ci();return r?typeof e=="function"?e(o):e:null}function Li({defaultSelection:e}){const[t]=Jt();return a.useEffect(()=>{t.focus(()=>{const r=document.activeElement,o=t.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:e})},[e,t]),null}const $i=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Fi({onClear:e}){const[t]=Jt();return $i(()=>mo(t,e),[t,e]),null}const jo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Vi({editor:e,ariaActiveDescendant:t,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:l,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:m,ariaRequired:f,autoCapitalize:u,className:g,id:b,role:v="textbox",spellCheck:j=!0,style:C,tabIndex:S,"data-testid":E,...$},V){const[M,D]=a.useState(e.isEditable()),y=a.useCallback(I=>{I&&I.ownerDocument&&I.ownerDocument.defaultView?e.setRootElement(I):e.setRootElement(null)},[e]),T=a.useMemo(()=>function(...I){return L=>{for(const O of I)typeof O=="function"?O(L):O!=null&&(O.current=L)}}(V,y),[y,V]);return jo(()=>(D(e.isEditable()),e.registerEditableListener(I=>{D(I)})),[e]),n.jsx("div",{"aria-activedescendant":M?t:void 0,"aria-autocomplete":M?r:"none","aria-controls":M?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":M&&v==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":M?m:void 0,"aria-readonly":!M||void 0,"aria-required":f,autoCapitalize:u,className:g,contentEditable:M,"data-testid":E,id:b,ref:T,role:v,spellCheck:j,style:C,tabIndex:S,...$})}const zi=a.forwardRef(Vi);function Rr(e){return e.getEditorState().read(vo(e.isComposing()))}const Bi=a.forwardRef(Gi);function Gi(e,t){const{placeholder:r,...o}=e,[s]=Jt();return n.jsxs(n.Fragment,{children:[n.jsx(zi,{editor:s,...o,ref:t}),r!=null&&n.jsx(qi,{editor:s,content:r})]})}function qi({content:e,editor:t}){const r=function(l){const[c,d]=a.useState(()=>Rr(l));return jo(()=>{function w(){const p=Rr(l);d(p)}return w(),x.mergeRegister(l.registerUpdateListener(()=>{w()}),l.registerEditableListener(()=>{w()}))},[l]),c}(t),[o,s]=a.useState(t.isEditable());if(a.useLayoutEffect(()=>(s(t.isEditable()),t.registerEditableListener(l=>{s(l)})),[t]),!r)return null;let i=null;return typeof e=="function"?i=e(o):e!==null&&(i=e),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function Ki({placeholder:e,className:t,placeholderClassName:r}){return n.jsx(Bi,{className:t??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":e,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:e})})}const No=a.createContext(void 0);function Ui({activeEditor:e,$updateToolbar:t,blockType:r,setBlockType:o,showModal:s,children:i}){const l=a.useMemo(()=>({activeEditor:e,$updateToolbar:t,blockType:r,setBlockType:o,showModal:s}),[e,t,r,o,s]);return n.jsx(No.Provider,{value:l,children:i})}function ko(){const e=a.useContext(No);if(!e)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return e}function Hi(){const[e,t]=a.useState(void 0),r=a.useCallback(()=>{t(void 0)},[]),o=a.useMemo(()=>{if(e===void 0)return;const{title:i,content:l}=e;return n.jsx(Kr,{open:!0,onOpenChange:r,children:n.jsxs($n,{children:[n.jsx(Hr,{children:n.jsx(Yr,{children:i})}),l]})})},[e,r]),s=a.useCallback((i,l,c=!1)=>{t({closeOnClickOutside:c,content:l(r),title:i})},[r]);return[o,s]}function Yi({children:e}){const[t]=Jt(),[r,o]=a.useState(t),[s,i]=a.useState("paragraph"),[l,c]=Hi(),d=()=>{};return a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Ui,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:i,showModal:c,children:[l,e({blockType:s})]})}function Xi(e){const[t]=Jt(),{activeEditor:r}=ko();a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&e(o),!1},x.COMMAND_PRIORITY_CRITICAL),[t,e]),a.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&e(o)})},[r,e])}const _o=we.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Wi=a.forwardRef(({className:e,variant:t,size:r,...o},s)=>n.jsx(Gr.Root,{ref:s,className:h(_o({variant:t,size:r,className:e})),...o}));Wi.displayName=Gr.Root.displayName;const Co=a.createContext({size:"default",variant:"default"}),fn=a.forwardRef(({className:e,variant:t,size:r,children:o,...s},i)=>{const l=ut();return n.jsx(dn.Root,{ref:i,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...s,dir:l,children:n.jsx(Co.Provider,{value:{variant:t,size:r},children:o})})});fn.displayName=dn.Root.displayName;const Ce=a.forwardRef(({className:e,children:t,variant:r,size:o,...s},i)=>{const l=a.useContext(Co);return n.jsx(dn.Item,{ref:i,className:h(_o({variant:l.variant||r,size:l.size||o}),e),...s,children:t})});Ce.displayName=dn.Item.displayName;const Tr=[{format:"bold",icon:_.BoldIcon,label:"Bold"},{format:"italic",icon:_.ItalicIcon,label:"Italic"}];function Ji(){const{activeEditor:e}=ko(),[t,r]=a.useState([]),o=a.useCallback(s=>{if(x.$isRangeSelection(s)||va.$isTableSelection(s)){const i=[];Tr.forEach(({format:l})=>{s.hasFormat(l)&&i.push(l)}),r(l=>l.length!==i.length||!i.every(c=>l.includes(c))?i:l)}},[]);return Xi(o),n.jsx(fn,{type:"multiple",value:t,onValueChange:r,variant:"outline",size:"sm",children:Tr.map(({format:s,icon:i,label:l})=>n.jsx(Ce,{value:s,"aria-label":l,onClick:()=>{e.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function Zi({onClear:e}){const[t]=Jt();a.useEffect(()=>{e&&e(()=>{t.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[t,e])}function Qi({placeholder:e="Start typing ...",autoFocus:t=!1,onClear:r}){const[,o]=a.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Yi,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Ji,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Ai,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Ki,{placeholder:e})}),ErrorBoundary:ai}),t&&n.jsx(Li,{defaultSelection:"rootEnd"}),n.jsx(Zi,{onClear:r}),n.jsx(Fi,{})]})]})}const tl={namespace:"commentEditor",theme:zn,nodes:Bn,onError:e=>{console.error(e)}};function nn({editorState:e,editorSerializedState:t,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:l,className:c}){return n.jsx("div",{className:h("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(ti,{initialConfig:{...tl,...e?{editorState:e}:{},...t?{editorState:JSON.stringify(t)}:{}},children:n.jsxs(yt,{children:[n.jsx(Qi,{placeholder:s,autoFocus:i,onClear:l}),n.jsx(ni,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function el(e,t){const r=x.isDOMDocumentNode(t)?t.body.childNodes:t.childNodes;let o=[];const s=[];for(const i of r)if(!So.has(i.nodeName)){const l=Ro(i,e,s,!1);l!==null&&(o=o.concat(l))}return function(i){for(const l of i)l.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&l.insertAfter(x.$createLineBreakNode());for(const l of i){const c=l.getChildren();for(const d of c)l.insertBefore(d);l.remove()}}(s),o}function nl(e,t){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)Eo(e,o[s],r,t);return r.innerHTML}function Eo(e,t,r,o=null){let s=o===null||t.isSelected(o);const i=x.$isElementNode(t)&&t.excludeFromCopy("html");let l=t;o!==null&&x.$isTextNode(t)&&(l=wi(o,t,"clone"));const c=x.$isElementNode(l)?l.getChildren():[],d=x.getRegisteredNode(e,l.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(e,l):l.exportDOM(e);const{element:p,after:m}=w;if(!p)return!1;const f=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],b=Eo(e,g,f,o);!s&&x.$isElementNode(t)&&b&&t.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(f),r.append(p),m){const u=m.call(l,p);u&&(x.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(f);return s}const So=new Set(["STYLE","SCRIPT"]);function Ro(e,t,r,o,s=new Map,i){let l=[];if(So.has(e.nodeName))return l;let c=null;const d=function(g,b){const{nodeName:v}=g,j=b._htmlConversions.get(v.toLowerCase());let C=null;if(j!==void 0)for(const S of j){const E=S(g);E!==null&&(C===null||(C.priority||0)<=(E.priority||0))&&(C=E)}return C!==null?C.conversion:null}(e,t),w=d?d(e):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,b]of s)if(c=b(c,i),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(e.nodeName,w.forChild)}const m=e.childNodes;let f=[];const u=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<m.length;g++)f.push(...Ro(m[g],t,r,u,new Map(s),c));return p!=null&&(f=p(f)),x.isBlockDomNode(e)&&(f=rl(e,f,u?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?f.length>0?l=l.concat(f):x.isBlockDomNode(e)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(e)&&(l=l.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...f),l}function rl(e,t,r){const o=e.style.textAlign,s=[];let i=[];for(let l=0;l<t.length;l++){const c=t[l];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),l===t.length-1||l<t.length-1&&x.$isBlockElementNode(t[l+1])){const d=r();d.setFormat(o),d.append(...i),s.push(d),i=[]}}return s}function To(e){const t=e.querySelector('[contenteditable="true"]');if(!t)return!1;t.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(t),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Mo(e){return e?e.some(t=>t&&"text"in t&&t.text.trim().length>0?!0:!t||!("children"in t)?!1:Mo(t.children)):!1}function $t(e){var t;return(t=e==null?void 0:e.root)!=null&&t.children?Mo(e.root.children):!1}function ol(e){if(!e||e.trim()==="")throw new Error("Input HTML is empty");const t=Fr.createHeadlessEditor({namespace:"EditorUtils",theme:zn,nodes:Bn,onError:o=>{console.error(o)}});let r;if(t.update(()=>{const s=new DOMParser().parseFromString(e,"text/html"),i=el(t,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),t.getEditorState().read(()=>{r=t.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function rn(e){const t=Fr.createHeadlessEditor({namespace:"EditorUtils",theme:zn,nodes:Bn,onError:s=>{console.error(s)}}),r=t.parseEditorState(JSON.stringify(e));t.setEditorState(r);let o="";return t.getEditorState().read(()=>{o=nl(t)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Un(e){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(e.key)?(e.stopPropagation(),!0):!1}function tn(e,t){return e===""?t["%comment_assign_unassigned%"]??"Unassigned":e==="Team"?t["%comment_assign_team%"]??"Team":e}function Hn(e){const t=/Macintosh/i.test(navigator.userAgent);return e.key==="Enter"&&(t&&e.metaKey||!t&&e.ctrlKey)}const sl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function _n(e,t){return e===""?t["%commentEditor_unassigned%"]??"Unassigned":e==="Team"?t["%commentEditor_team%"]??"Team":e}function al({assignableUsers:e,onSave:t,onClose:r,localizedStrings:o}){const[s,i]=a.useState(sl),[l,c]=a.useState(void 0),[d,w]=a.useState(!1),p=a.useRef(void 0),m=a.useRef(null);a.useEffect(()=>{let j=!0;const C=m.current;if(!C)return;const S=setTimeout(()=>{j&&To(C)},300);return()=>{j=!1,clearTimeout(S)}},[]);const f=a.useCallback(()=>{if(!$t(s))return;const j=rn(s);t(j,l)},[s,t,l]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",b=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",v=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:v}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(_.X,{})})}),n.jsx(jt,{children:n.jsx("p",{children:b})})]})}),n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:f,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!$t(s),children:n.jsx(_.Check,{})})}),n.jsx(jt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(ee,{open:d,onOpenChange:w,children:[n.jsx(pe,{asChild:!0,children:n.jsxs(F,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:e.length===0,children:[n.jsx(_.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:_n(l!==void 0?l:"",o)})]})}),n.jsx(Wt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),w(!1))},children:n.jsx(Yt,{children:n.jsx(Xt,{children:e.map(j=>n.jsx(te,{onSelect:()=>{c(j===""?void 0:j),w(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:_n(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):Hn(j)&&(j.preventDefault(),j.stopPropagation(),$t(s)&&f())},onKeyDown:j=>{Un(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(nn,{editorSerializedState:s,onSerializedChange:j=>i(j),placeholder:u,onClear:j=>{p.current=j}})})]})}const il=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),ll=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],cl=["input","select","textarea","button"],wl=["button","textbox"],Do=({options:e,onFocusChange:t,onOptionSelect:r,onCharacterPress:o})=>{const s=a.useRef(null),[i,l]=a.useState(void 0),[c,d]=a.useState(void 0),w=a.useCallback(u=>{l(u);const g=e.find(v=>v.id===u);g&&(t==null||t(g));const b=document.getElementById(u);b&&(b.scrollIntoView({block:"center"}),b.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[t,e]),p=a.useCallback(u=>{const g=e.find(b=>b.id===u);g&&(d(b=>b===u?void 0:u),r==null||r(g))},[r,e]),m=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||cl.includes(g))return!0;const b=u.getAttribute("role");if(b&&wl.includes(b))return!0;const v=u.getAttribute("tabindex");return v!==void 0&&v!=="-1"},f=a.useCallback(u=>{var M;const g=u.target,b=D=>D?document.getElementById(D):void 0,v=b(c),j=b(i);if(!!(v&&g&&v.contains(g)&&g!==v)&&m(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const D=e.find(y=>y.id===c);D&&w(D.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!v)return;const D=Array.from(v.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(D.length===0)return;const y=D.findIndex(I=>I===g);if(y===-1)return;let T;u.key==="ArrowDown"?T=Math.min(y+1,D.length-1):T=Math.max(y-1,0),T!==y&&(u.preventDefault(),u.stopPropagation(),(M=D[T])==null||M.focus());return}return}const E=e.findIndex(D=>D.id===i);let $=E;switch(u.key){case"ArrowDown":$=Math.min(E+1,e.length-1),u.preventDefault();break;case"ArrowUp":$=Math.max(E-1,0),u.preventDefault();break;case"Home":$=0,u.preventDefault();break;case"End":$=e.length-1,u.preventDefault();break;case" ":case"Enter":i&&p(i),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const D=j;if(D){const y=D.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=D.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),I=y??T;if(I){u.preventDefault(),I.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(m(g)||(o==null||o(u.key),u.preventDefault()));return}const V=e[$];V&&w(V.id)},[e,w,i,c,p,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:f,focusOption:w}},Yn=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Yn.displayName="Card";const Io=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Io.displayName="CardHeader";const Oo=a.forwardRef(({className:e,...t},r)=>n.jsx("h3",{ref:r,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Oo.displayName="CardTitle";const Ao=a.forwardRef(({className:e,...t},r)=>n.jsx("p",{ref:r,className:h("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Ao.displayName="CardDescription";const Xn=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-p-6 tw-pt-0",e),...t}));Xn.displayName="CardContent";const Po=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Po.displayName="CardFooter";const ge=a.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...o},s)=>n.jsx(qr.Root,{ref:s,decorative:r,orientation:t,className:h("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...o}));ge.displayName=qr.Root.displayName;const Wn=a.forwardRef(({className:e,...t},r)=>n.jsx(Me.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...t}));Wn.displayName=Me.Root.displayName;const Lo=a.forwardRef(({className:e,...t},r)=>n.jsx(Me.Image,{ref:r,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...t}));Lo.displayName=Me.Image.displayName;const Jn=a.forwardRef(({className:e,...t},r)=>n.jsx(Me.Fallback,{ref:r,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...t}));Jn.displayName=Me.Fallback.displayName;const Zn=a.createContext(void 0);function zt(){const e=a.useContext(Zn);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const ne=we.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ie=J.Trigger,Qn=J.Group,$o=J.Portal,Fo=J.Sub,Vo=J.RadioGroup;function Qt({variant:e="default",...t}){const r=a.useMemo(()=>({variant:e}),[e]);return n.jsx(Zn.Provider,{value:r,children:n.jsx(J.Root,{...t})})}const tr=a.forwardRef(({className:e,inset:t,children:r,...o},s)=>{const i=zt();return n.jsxs(J.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e,ne({variant:i.variant})),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});tr.displayName=J.SubTrigger.displayName;const er=a.forwardRef(({className:e,...t},r)=>n.jsx(J.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));er.displayName=J.SubContent.displayName;const Ht=a.forwardRef(({className:e,sideOffset:t=4,children:r,...o},s)=>{const i=ut();return n.jsx(J.Portal,{children:n.jsx(J.Content,{ref:s,sideOffset:t,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,children:n.jsx("div",{dir:i,children:r})})})});Ht.displayName=J.Content.displayName;const Ge=a.forwardRef(({className:e,inset:t,...r},o)=>{const s=ut(),i=zt();return n.jsx(J.Item,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e,ne({variant:i.variant})),...r,dir:s})});Ge.displayName=J.Item.displayName;const Ut=a.forwardRef(({className:e,children:t,checked:r,...o},s)=>{const i=zt();return n.jsxs(J.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,ne({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Ut.displayName=J.CheckboxItem.displayName;const nr=a.forwardRef(({className:e,children:t,...r},o)=>{const s=zt();return n.jsxs(J.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,ne({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});nr.displayName=J.RadioItem.displayName;const De=a.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(J.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...r}));De.displayName=J.Label.displayName;const je=a.forwardRef(({className:e,...t},r)=>n.jsx(J.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));je.displayName=J.Separator.displayName;function zo({className:e,...t}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}zo.displayName="DropdownMenuShortcut";function Mr({comment:e,isReply:t=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:l,canEditOrDelete:c=!1}){const[d,w]=a.useState(!1),[p,m]=a.useState(),f=a.useRef(null);a.useEffect(()=>{if(!d)return;let E=!0;const $=f.current;if(!$)return;const V=setTimeout(()=>{E&&To($)},300);return()=>{E=!1,clearTimeout(V)}},[d]);const u=a.useCallback(E=>{E&&E.stopPropagation(),w(!1),m(void 0),l==null||l(!1)},[l]),g=a.useCallback(async E=>{if(E&&E.stopPropagation(),!p||!s)return;await s(e.id,rn(p))&&(w(!1),m(void 0),l==null||l(!1))},[p,s,e.id,l]),b=a.useMemo(()=>{const E=new Date(e.date),$=N.formatRelativeDate(E,r["%comment_date_today%"],r["%comment_date_yesterday%"]),V=E.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return N.formatReplacementString(r["%comment_dateAtTime%"],{date:$,time:V})},[e.date,r]),v=a.useMemo(()=>e.user,[e.user]),j=a.useMemo(()=>e.user.split(" ").map(E=>E[0]).join("").toUpperCase().slice(0,2),[e.user]),C=a.useMemo(()=>N.sanitizeHtml(e.contents),[e.contents]),S=a.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ge,{onClick:E=>{E.stopPropagation(),w(!0),m(ol(e.contents)),l==null||l(!0)},children:[n.jsx(_.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ge,{onClick:async E=>{E.stopPropagation(),i&&await i(e.id)},children:[n.jsx(_.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,e.contents,e.id,i,l]);return n.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":t}),children:[n.jsx(Wn,{className:"tw-h-8 tw-w-8",children:n.jsx(Jn,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:v}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:b}),n.jsx("div",{className:"tw-flex-1"}),t&&e.assignedUser!==void 0&&n.jsxs(Zt,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",tn(e.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:f,onKeyDownCapture:E=>{E.key==="Escape"?(E.preventDefault(),E.stopPropagation(),u()):Hn(E)&&(E.preventDefault(),E.stopPropagation(),$t(p)&&g())},onKeyDown:E=>{Un(E),(E.key==="Enter"||E.key===" ")&&E.stopPropagation()},onClick:E=>{E.stopPropagation()},children:[n.jsx(nn,{className:h('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:E=>m(E)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(F,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(_.X,{})}),n.jsx(F,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!$t(p),children:n.jsx(_.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[e.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),e.status==="Todo"&&t&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:C}})]})]}),S&&n.jsxs(Qt,{children:[n.jsx(ie,{asChild:!0,children:n.jsx(F,{variant:"ghost",size:"icon",children:n.jsx(_.MoreHorizontal,{})})}),n.jsx(Ht,{align:"end",children:S})]})]})}const Dr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function dl({classNameForVerseText:e,comments:t,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:l,handleSelectThread:c,threadId:d,thread:w,threadStatus:p,handleAddCommentToThread:m,handleUpdateComment:f,handleDeleteComment:u,handleReadStatusChange:g,assignableUsers:b,canUserAddCommentToThread:v,canUserAssignThreadCallback:j,canUserResolveThreadCallback:C,canUserEditOrDeleteCommentCallback:S,isRead:E=!1,autoReadDelay:$=5,onVerseRefClick:V}){const[M,D]=a.useState(Dr),[y,T]=a.useState(void 0),I=o,[L,O]=a.useState(!1),[A,U]=a.useState(!1),[G,H]=a.useState(!1),[Nt,Rt]=a.useState(!1),[Ot,dt]=a.useState(!1),[ct,B]=a.useState(E),[tt,et]=a.useState(!1),st=a.useRef(void 0),[kt,Bt]=a.useState(new Map);a.useEffect(()=>{let R=!0;return(async()=>{const wt=C?await C(d):!1;R&&dt(wt)})(),()=>{R=!1}},[d,C]),a.useEffect(()=>{let R=!0;if(!o){Rt(!1),Bt(new Map);return}return(async()=>{const wt=j?await j(d):!1;R&&Rt(wt)})(),()=>{R=!1}},[o,d,j]);const Gt=a.useMemo(()=>t.filter(R=>!R.deleted),[t]);a.useEffect(()=>{let R=!0;if(!o||!S){Bt(new Map);return}return(async()=>{const wt=new Map;await Promise.all(Gt.map(async xr=>{const da=await S(xr.id);R&&wt.set(xr.id,da)})),R&&Bt(wt)})(),()=>{R=!1}},[o,Gt,S]);const k=a.useMemo(()=>Gt[0],[Gt]),q=a.useRef(null),K=a.useRef(void 0),rt=a.useCallback(()=>{var R;(R=K.current)==null||R.call(K),D(Dr)},[]),Tt=a.useCallback(()=>{const R=!ct;B(R),et(!R),g==null||g(d,R)},[ct,g,d]);a.useEffect(()=>{O(!1)},[o]),a.useEffect(()=>{if(o&&!ct&&!tt){const R=setTimeout(()=>{B(!0),g==null||g(d,!0)},$*1e3);return st.current=R,()=>clearTimeout(R)}st.current&&(clearTimeout(st.current),st.current=void 0)},[o,ct,tt,$,d,g]);const mt=a.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),P=a.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const R=tn(i,r);return N.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:R})},[i,r]),z=a.useMemo(()=>Gt.slice(1),[Gt]),X=a.useMemo(()=>z.length??0,[z.length]),nt=a.useMemo(()=>X>0,[X]),gt=a.useMemo(()=>L||X<=2?z:z.slice(-2),[z,X,L]),pt=a.useMemo(()=>L||X<=2?0:X-2,[X,L]),Mt=a.useMemo(()=>X===1?mt.singleReply:N.formatReplacementString(mt.multipleReplies,{count:X}),[X,mt]),ft=a.useMemo(()=>pt===1?mt.singleReply:N.formatReplacementString(mt.multipleReplies,{count:pt}),[pt,mt]);a.useEffect(()=>{!o&&A&&nt&&U(!1)},[o,A,nt]);const Dt=a.useCallback(async R=>{R&&R.stopPropagation();const ht=$t(M)?rn(M):void 0;if(y!==void 0){await m({threadId:d,contents:ht,assignedUser:y})&&(T(void 0),ht&&rt());return}ht&&await m({threadId:d,contents:ht})&&rt()},[rt,M,m,y,d]),Lt=a.useCallback(async R=>{const ht=$t(M)?rn(M):void 0,wt=await m({...R,contents:ht,assignedUser:y??R.assignedUser});return wt&&ht&&rt(),wt&&y!==void 0&&T(void 0),wt},[rt,M,m,y]);return n.jsx(Yn,{role:"option","aria-selected":o,id:d,className:h("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&ct,"tw-bg-background":o&&p!=="Resolved"&&ct,"tw-bg-muted":p==="Resolved","tw-bg-accent":!ct&&!o&&p!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(Xn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[P&&n.jsx(Zt,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:P}),n.jsx(F,{variant:"ghost",size:"icon",onClick:R=>{R.stopPropagation(),Tt()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":ct?"Mark as unread":"Mark as read",children:ct?n.jsx(_.MailOpen,{}):n.jsx(_.Mail,{})}),Ot&&p!=="Resolved"&&n.jsx(F,{variant:"ghost",size:"icon",className:h("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:R=>{R.stopPropagation(),Lt({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:q,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":I},{"tw-whitespace-nowrap":!I}),children:[s&&V?n.jsx(F,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:R=>{R.stopPropagation(),V(w)},children:s}):s,n.jsxs("span",{className:e,children:[k.contextBefore,n.jsx("span",{className:"tw-font-bold",children:k.selectedText}),k.contextAfter]})]})}),n.jsx(Mr,{comment:k,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:Lt,handleUpdateComment:f,handleDeleteComment:u,onEditingChange:U,canEditOrDelete:(!A&&kt.get(k.id))??!1,canUserResolveThread:Ot})]}),n.jsxs(n.Fragment,{children:[nt&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ge,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Mt})]}),!o&&$t(M)&&n.jsx(nn,{editorSerializedState:M,onSerializedChange:R=>D(R),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[pt>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:R=>{R.stopPropagation(),O(!0)},role:"button",tabIndex:0,onKeyDown:R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),R.stopPropagation(),O(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ge,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ft}),L?n.jsx(_.ChevronUp,{}):n.jsx(_.ChevronDown,{})]})]}),gt.map(R=>n.jsx("div",{children:n.jsx(Mr,{comment:R,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:f,handleDeleteComment:u,onEditingChange:U,canEditOrDelete:(!A&&kt.get(R.id))??!1})},R.id)),v!==!1&&(!A||$t(M))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:R=>R.stopPropagation(),onKeyDownCapture:R=>{Hn(R)&&(R.preventDefault(),R.stopPropagation(),($t(M)||y!==void 0)&&Dt())},onKeyDown:R=>{Un(R),(R.key==="Enter"||R.key===" ")&&R.stopPropagation()},children:[n.jsx(nn,{editorSerializedState:M,onSerializedChange:R=>D(R),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:R=>{K.current=R}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[y!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:N.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:tn(y,r)})}),n.jsxs(ee,{open:G,onOpenChange:H,children:[n.jsx(pe,{asChild:!0,children:n.jsx(F,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Nt||!b||b.length===0||!b.includes(l),"aria-label":"Assign user",children:n.jsx(_.AtSign,{})})}),n.jsx(Wt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:R=>{R.key==="Escape"&&(R.stopPropagation(),H(!1))},children:n.jsx(Yt,{children:n.jsx(Xt,{children:b==null?void 0:b.map(R=>n.jsx(te,{onSelect:()=>{T(R!==i?R:void 0),H(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:tn(R,r)})},R||"unassigned"))})})})]}),n.jsx(F,{size:"icon",onClick:Dt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!$t(M)&&y===void 0,"aria-label":"Submit comment",children:n.jsx(_.ArrowUp,{})})]})]})]})]})]})})}function pl({className:e="",classNameForVerseText:t,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:b,onVerseRefClick:v}){const[j,C]=a.useState(new Set),[S,E]=a.useState();a.useEffect(()=>{g&&(C(O=>new Set(O).add(g)),E(g))},[g]);const $=r.filter(O=>O.comments.some(A=>!A.deleted)),V=$.map(O=>({id:O.id})),M=a.useCallback(O=>{C(A=>new Set(A).add(O.id)),E(O.id),b==null||b(O.id)},[b]),D=a.useCallback(O=>{const A=j.has(O);C(U=>{const G=new Set(U);return G.has(O)?G.delete(O):G.add(O),G}),E(O),b==null||b(A?void 0:O)},[j,b]),{listboxRef:y,activeId:T,handleKeyDown:I}=Do({options:V,onOptionSelect:M}),L=a.useCallback(O=>{O.key==="Escape"?(S&&j.has(S)&&(C(A=>{const U=new Set(A);return U.delete(S),U}),E(void 0),b==null||b(void 0)),O.preventDefault(),O.stopPropagation()):I(O)},[S,j,I,b]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:y,"aria-activedescendant":T??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),onKeyDown:L,children:$.map(O=>n.jsx("div",{id:O.id,className:h({"tw-opacity-60":O.status==="Resolved"}),children:n.jsx(dl,{classNameForVerseText:t,comments:O.comments,localizedStrings:s,verseRef:O.verseRef,handleSelectThread:D,threadId:O.id,thread:O,isRead:O.isRead,isSelected:j.has(O.id),currentUser:o,assignedUser:O.assignedUser,threadStatus:O.status,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:v})},O.id))})}function ul({table:e}){return n.jsxs(Qt,{children:[n.jsx(Vr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(F,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(_.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Ht,{align:"end",className:"tw-w-[150px]",children:[n.jsx(De,{children:"Toggle columns"}),n.jsx(je,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>n.jsx(Ut,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const xe=ot.Root,Bo=ot.Group,be=ot.Value,Go=we.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),le=a.forwardRef(({className:e,children:t,size:r,...o},s)=>{const i=ut();return n.jsxs(ot.Trigger,{className:h(Go({size:r,className:e})),ref:s,...o,dir:i,children:[t,n.jsx(ot.Icon,{asChild:!0,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});le.displayName=ot.Trigger.displayName;const rr=a.forwardRef(({className:e,...t},r)=>n.jsx(ot.ScrollUpButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:n.jsx(_.ChevronUp,{className:"tw-h-4 tw-w-4"})}));rr.displayName=ot.ScrollUpButton.displayName;const or=a.forwardRef(({className:e,...t},r)=>n.jsx(ot.ScrollDownButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4"})}));or.displayName=ot.ScrollDownButton.displayName;const ce=a.forwardRef(({className:e,children:t,position:r="popper",...o},s)=>{const i=ut();return n.jsx(ot.Portal,{children:n.jsxs(ot.Content,{ref:s,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:r,...o,children:[n.jsx(rr,{}),n.jsx(ot.Viewport,{className:h("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:t})}),n.jsx(or,{})]})})});ce.displayName=ot.Content.displayName;const qo=a.forwardRef(({className:e,...t},r)=>n.jsx(ot.Label,{ref:r,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));qo.displayName=ot.Label.displayName;const It=a.forwardRef(({className:e,children:t,...r},o)=>n.jsxs(ot.Item,{ref:o,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ot.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(ot.ItemText,{children:t})]}));It.displayName=ot.Item.displayName;const Ko=a.forwardRef(({className:e,...t},r)=>n.jsx(ot.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Ko.displayName=ot.Separator.displayName;function ml({table:e}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(xe,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[n.jsx(le,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(be,{placeholder:e.getState().pagination.pageSize})}),n.jsx(ce,{side:"top",children:[10,20,30,40,50].map(t=>n.jsx(It,{value:`${t}`,children:t},t))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(F,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(_.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(_.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(_.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(_.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Ir=`
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
`;function fl(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function qe(e,t){const r=t?`${Ir}, ${t}`:Ir;return Array.from(e.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&fl(o))}const Ke=a.forwardRef(({className:e,stickyHeader:t,...r},o)=>{const s=a.useRef(null);a.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),a.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{qe(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const i=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),qe(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":t}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Ke.displayName="Table";const Ue=a.forwardRef(({className:e,stickyHeader:t,...r},o)=>n.jsx("thead",{ref:o,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...r}));Ue.displayName="TableHeader";const He=a.forwardRef(({className:e,...t},r)=>n.jsx("tbody",{ref:r,className:h("[&_tr:last-child]:tw-border-0",e),...t}));He.displayName="TableBody";const Uo=a.forwardRef(({className:e,...t},r)=>n.jsx("tfoot",{ref:r,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Uo.displayName="TableFooter";function hl(e){a.useEffect(()=>{const t=e.current;if(!t)return;const r=o=>{if(t.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=e.current?qe(e.current):[],i=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?i+1:i-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),t.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return t.addEventListener("keydown",r),()=>{t.removeEventListener("keydown",r)}},[e])}function gl(e,t,r){let o;return r==="ArrowLeft"&&t>0?o=e[t-1]:r==="ArrowRight"&&t<e.length-1&&(o=e[t+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function xl(e,t,r){let o;return r==="ArrowDown"&&t<e.length-1?o=e[t+1]:r==="ArrowUp"&&t>0&&(o=e[t-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Kt=a.forwardRef(({className:e,onKeyDown:t,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const l=a.useRef(null);a.useEffect(()=>{typeof i=="function"?i(l.current):i&&"current"in i&&(i.current=l.current)},[i]),hl(l);const c=a.useMemo(()=>l.current?qe(l.current):[],[l]),d=a.useCallback(p=>{const{current:m}=l;if(!m||!m.parentElement)return;const f=m.closest("table"),u=f?qe(f).filter(v=>v.tagName==="TR"):[],g=u.indexOf(m),b=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),xl(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),gl(c,b,p.key);else if(p.key==="Escape"){p.preventDefault();const v=m.closest("table");v&&v.focus()}t==null||t(p)},[l,c,t]),w=a.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:d,onFocus:w,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",e),...s})});Kt.displayName="TableRow";const Re=a.forwardRef(({className:e,...t},r)=>n.jsx("th",{ref:r,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));Re.displayName="TableHead";const se=a.forwardRef(({className:e,...t},r)=>n.jsx("td",{ref:r,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));se.displayName="TableCell";const Ho=a.forwardRef(({className:e,...t},r)=>n.jsx("caption",{ref:r,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Ho.displayName="TableCaption";function on({className:e,...t}){return n.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}function Yo({columns:e,data:t,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:l=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var V;const[p,m]=a.useState([]),[f,u]=a.useState([]),[g,b]=a.useState({}),[v,j]=a.useState({}),C=a.useMemo(()=>t??[],[t]),S=vt.useReactTable({data:C,columns:e,getCoreRowModel:vt.getCoreRowModel(),...r&&{getPaginationRowModel:vt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:vt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:vt.getFilteredRowModel(),onColumnVisibilityChange:b,onRowSelectionChange:j,state:{sorting:p,columnFilters:f,columnVisibility:g,rowSelection:v}}),E=S.getVisibleFlatColumns();let $;return d?$=Array.from({length:10}).map((y,T)=>`skeleton-row-${T}`).map(y=>n.jsx(Kt,{className:"hover:tw-bg-transparent",children:n.jsx(se,{colSpan:E.length??e.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(on,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},y)):((V=S.getRowModel().rows)==null?void 0:V.length)>0?$=S.getRowModel().rows.map(M=>n.jsx(Kt,{onClick:()=>l(M,S),"data-state":M.getIsSelected()&&"selected",children:M.getVisibleCells().map(D=>n.jsx(se,{children:vt.flexRender(D.column.columnDef.cell,D.getContext())},D.id))},M.id)):$=n.jsx(Kt,{children:n.jsx(se,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(ul,{table:S}),n.jsxs(Ke,{stickyHeader:i,children:[n.jsx(Ue,{stickyHeader:i,children:S.getHeaderGroups().map(M=>n.jsx(Kt,{children:M.headers.map(D=>n.jsx(Re,{className:"tw-p-0",children:D.isPlaceholder?void 0:vt.flexRender(D.column.columnDef.header,D.getContext())},D.id))},M.id))}),n.jsx(He,{children:$})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(F,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),n.jsx(F,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(ml,{table:S})]})}function bl({id:e,markdown:t,className:r,anchorTarget:o,truncate:s}){const i=a.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:e,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Ca,{options:i,children:t})})}const Xo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Or=(e,t)=>e[t]??t;function Wo({errorDetails:e,handleCopyNotify:t,localizedStrings:r,id:o}){const s=Or(r,"%webView_error_dump_header%"),i=Or(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(e),t&&t()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(F,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(_.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:e})})]})}const vl=Object.freeze([...Xo,"%webView_error_dump_copied_message%"]);function yl({errorDetails:e,handleCopyNotify:t,localizedStrings:r,children:o,className:s,id:i}){const[l,c]=a.useState(!1),d=()=>{c(!0),t&&t()},w=p=>{p||c(!1)};return n.jsxs(ee,{onOpenChange:w,children:[n.jsx(pe,{asChild:!0,children:o}),n.jsxs(Wt,{id:i,className:h("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(it,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Wo,{errorDetails:e,handleCopyNotify:d,localizedStrings:r})]})]})}var Jo=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Jo||{});function jl({id:e,label:t,groups:r}){const[o,s]=a.useState(Object.fromEntries(r.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[i,l]=a.useState({}),c=(w,p)=>{const m=!o[w][p];s(u=>(u[w][p]=m,{...u}));const f=r[w].items[p];f.onUpdate(f.id,m)},d=(w,p)=>{l(f=>(f[w]=p,{...f}));const m=r[w].items.find(f=>f.id===p);m?m.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:e,children:n.jsxs(Qt,{children:[n.jsx(ie,{asChild:!0,children:n.jsxs(F,{variant:"default",children:[n.jsx(_.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),t,n.jsx(_.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Ht,{children:r.map((w,p)=>n.jsxs("div",{children:[n.jsx(De,{children:w.label}),n.jsx(Qn,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((m,f)=>n.jsx("div",{children:n.jsx(Ut,{checked:o[p][f],onCheckedChange:()=>c(p,f),children:m.label})},m.id))}):n.jsx(Vo,{value:i[p],onValueChange:m=>d(p,m),children:w.items.map(m=>n.jsx("div",{children:n.jsx(nr,{value:m.id,children:m.label})},m.id))})}),n.jsx(je,{})]},w.label))})]})})}function Nl({id:e,category:t,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:l,handleSupportLinkClick:c}){const d=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,m)=>p+m,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:e,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:t})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(_.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(F,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(_.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(F,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(_.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function kl({id:e,versionHistory:t}){const[r,o]=a.useState(!1),s=new Date;function i(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,m=w.getUTCMonth(),f=w.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:m>0?u=`${m.toString()} month${m===1?"":"s"} ago`:f===0?u="today":u=`${f.toString()} day${f===1?"":"s"} ago`,u}const l=Object.entries(t).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:e,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function _l({id:e,publisherDisplayName:t,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const l=a.useMemo(()=>N.formatBytes(r),[r]),d=(w=>{const p=new Intl.DisplayNames(N.getCurrentLocale(),{type:"language"});return w.map(m=>p.of(m))})(o);return n.jsx("div",{id:e,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(kl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:t}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function Zo({entries:e,selected:t,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:m=!1,sortSelected:f=!1,icon:u=void 0,className:g=void 0,variant:b="ghost",id:v}){const[j,C]=a.useState(!1),S=a.useCallback(T=>{var L;const I=(L=e.find(O=>O.label===T))==null?void 0:L.value;I&&r(t.includes(I)?t.filter(O=>O!==I):[...t,I])},[e,t,r]),E=()=>d||o,$=a.useMemo(()=>{if(!f)return e;const T=e.filter(L=>L.starred).sort((L,O)=>L.label.localeCompare(O.label)),I=e.filter(L=>!L.starred).sort((L,O)=>{const A=t.includes(L.value),U=t.includes(O.value);return A&&!U?-1:!A&&U?1:L.label.localeCompare(O.label)});return[...T,...I]},[e,t,f]),V=()=>{r(e.map(T=>T.value))},M=()=>{r([])},D=w??j,y=p??C;return n.jsx("div",{id:v,className:g,children:n.jsxs(ee,{open:D,onOpenChange:y,children:[n.jsx(pe,{asChild:!0,children:n.jsxs(F,{variant:b,role:"combobox","aria-expanded":D,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:E()})]}),n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Wt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Yt,{children:[n.jsx(ve,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:V,children:i}),n.jsx(F,{variant:"ghost",size:"sm",onClick:M,children:l})]}),n.jsxs(Xt,{children:[n.jsx(ye,{children:c}),n.jsx(de,{children:$.map(T=>n.jsxs(te,{value:T.label,onSelect:S,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(_.Check,{className:h("tw-h-4 tw-w-4",t.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(_.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function Cl({entries:e,selected:t,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Zo,{entries:e,selected:t,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:d,className:w}),t.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:t.map(f=>{var u;return n.jsxs(Zt,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(F,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(t.filter(g=>g!==f)),children:n.jsx(_.X,{className:"tw-h-3 tw-w-3"})}),(u=e.find(g=>g.value===f))==null?void 0:u.label]},f)})}):n.jsx(it,{children:p})]})}const Qo=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),Ar=(e,t)=>e[t]??t;function ts({onUndoClick:e,onRedoClick:t,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:i=!0,className:l="tw-h-6 tw-w-6",variant:c="ghost"}){const d=a.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{"aria-label":"Undo",className:l,size:"icon",onClick:e,disabled:!r,variant:c,children:n.jsx(_.Undo,{})})}),n.jsx(jt,{children:n.jsxs("p",{children:[Ar(s,"%undoButton_tooltip%"),i&&` (${d?"⌘Z":"Ctrl+Z"})`]})})]})}),t&&n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{"aria-label":"Redo",className:l,size:"icon",onClick:t,disabled:!o,variant:c,children:n.jsx(_.Redo,{})})}),n.jsx(jt,{children:n.jsxs("p",{children:[Ar(s,"%redoButton_tooltip%"),i&&` (${d?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function es({children:e,editorRef:t}){const r=a.useRef(null);return a.useEffect(()=>{var l;const o=/Macintosh/i.test(navigator.userAgent),s=((l=r.current)==null?void 0:l.querySelector(".editor-input"))??void 0,i=c=>{var w,p,m,f;if(!s||document.activeElement!==s)return;const d=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(w=t.current)==null||w.undo()):c.shiftKey&&d==="z"&&(c.preventDefault(),(p=t.current)==null||p.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(m=t.current)==null||m.undo()):(d==="y"||c.shiftKey&&d==="z")&&(c.preventDefault(),(f=t.current)==null||f.redo())}};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[t]),n.jsx("div",{ref:r,children:e})}const Ne=a.forwardRef(({className:e,type:t,...r},o)=>n.jsx("input",{type:t,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:o,...r}));Ne.displayName="Input";const El=(e,t,r)=>e==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",t["%footnoteEditor_callerDropdown_item_generated%"]]}):e==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",t["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",t["%footnoteEditor_callerDropdown_item_custom%"]]});function Sl({callerType:e,updateCallerType:t,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=a.useRef(null),l=a.useRef(null),c=a.useRef(!1),[d,w]=a.useState(e),[p,m]=a.useState(r),[f,u]=a.useState(!1);a.useEffect(()=>{w(e)},[e]),a.useEffect(()=>{p!==r&&m(r)},[r]);const g=v=>{c.current=!1,u(v),v||(d!=="custom"||p?(t(d),o(p)):(w(e),m(r)))},b=v=>{var j,C,S,E;v.stopPropagation(),document.activeElement===l.current&&v.key==="ArrowDown"||v.key==="ArrowRight"?((j=i.current)==null||j.focus(),c.current=!0):document.activeElement===i.current&&v.key==="ArrowUp"?((C=l.current)==null||C.focus(),c.current=!1):document.activeElement===i.current&&v.key==="ArrowLeft"&&((S=i.current)==null?void 0:S.selectionStart)===0&&((E=l.current)==null||E.focus(),c.current=!1),d==="custom"&&v.key==="Enter"&&(document.activeElement===l.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(Qt,{open:f,onOpenChange:g,children:[n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(ie,{asChild:!0,children:n.jsx(F,{variant:"outline",className:"tw-h-6",children:El(e,s,r)})})}),n.jsx(jt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Ht,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:b,onMouseMove:()=>{var v;c.current&&((v=i.current)==null||v.focus())},children:[n.jsx(De,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(je,{}),n.jsx(Ut,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:At.GENERATOR_NOTE_CALLER})]})}),n.jsx(Ut,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:At.HIDDEN_NOTE_CALLER})]})}),n.jsx(Ut,{ref:l,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:v=>{var j;v.stopPropagation(),c.current=!0,(j=i.current)==null||j.focus()},onSelect:v=>v.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Ne,{tabIndex:0,onMouseDown:v=>{v.stopPropagation(),w("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:v=>{v.key==="Enter"||v.key==="ArrowUp"||v.key==="ArrowDown"||v.key==="ArrowLeft"||v.key==="ArrowRight"||v.stopPropagation()},maxLength:1,onChange:v=>m(v.target.value)})]})})]})]})}const Rl=(e,t)=>e==="f"?n.jsxs(n.Fragment,{children:[n.jsx(_.FunctionSquare,{})," ",t["%footnoteEditor_noteType_footnote_label%"]]}):e==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(_.SquareSigma,{})," ",t["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(_.SquareX,{})," ",t["%footnoteEditor_noteType_crossReference_label%"]]}),Tl=(e,t)=>{if(e==="x")return t["%footnoteEditor_noteType_crossReference_label%"];let r=t["%footnoteEditor_noteType_endNote_label%"];return e==="f"&&(r=t["%footnoteEditor_noteType_footnote_label%"]),N.formatReplacementString(t["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Ml({noteType:e,handleNoteTypeChange:t,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Qt,{children:[n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx($r.TooltipTrigger,{asChild:!0,children:n.jsx(ie,{asChild:!0,children:n.jsx(F,{variant:"outline",className:"tw-h-6",children:Rl(e,r)})})}),n.jsx(jt,{children:n.jsx("p",{children:Tl(e,r)})})]})}),n.jsxs(Ht,{className:"tw-z-[300]",children:[n.jsx(De,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(je,{}),n.jsxs(Ut,{disabled:e!=="x"&&!o,checked:e==="x",onCheckedChange:()=>t("x"),className:"tw-gap-2",children:[n.jsx(_.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Ut,{disabled:e==="x"&&!o,checked:e==="f",onCheckedChange:()=>t("f"),className:"tw-gap-2",children:[n.jsx(_.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Ut,{disabled:e==="x"&&!o,checked:e==="fe",onCheckedChange:()=>t("fe"),className:"tw-gap-2",children:[n.jsx(_.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const ns=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Dl({icon:e,className:t}){const r=e??_.Ban;return n.jsx(r,{className:t,size:16})}function rs({localizedStrings:e,markerMenuItems:t,searchRef:r}){const[o,s]=a.useState(""),i=a.useMemo(()=>{const l=o.trim().toLowerCase();if(!l)return t;const c=t.filter(d=>{var w;return(w=d.marker)==null?void 0:w.toLowerCase().includes(l)});return c.push(...t.filter(d=>d.title.toLowerCase().includes(l)&&!c.includes(d))),c},[o,t]);return n.jsxs(Yt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(ve,{className:"marker-menu-search",ref:r,value:o,onValueChange:l=>s(l),placeholder:e["%markerMenu_searchPlaceholder%"]}),n.jsxs(Xt,{children:[n.jsx(ye,{children:e["%markerMenu_noResults%"]}),n.jsx(de,{children:i.map(l=>{var c;return n.jsxs(te,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:l.isDisallowed||l.isDeprecated,onSelect:l.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:l.marker?n.jsx("span",{className:"tw-text-xs",children:l.marker}):n.jsx("div",{children:n.jsx(Dl,{icon:l.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:l.title}),l.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:l.subtitle})]}),(l.isDisallowed||l.isDeprecated)&&n.jsx(Jr,{className:"tw-font-sans",children:l.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]},`item-${l.marker??((c=l.icon)==null?void 0:c.displayName)}-${l.title.replaceAll(" ","")}`)})})]})]})}function Il(e,t,r,o){if(!o||o==="p")return[];const s=N.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,l])=>{i.push(...l.map(c=>({marker:c,title:r[N.usfmMarkers[c].description]??N.usfmMarkers[c].description,action:()=>{var d;(d=e.current)==null||d.insertMarker(c),t()}})))}),i.sort((l,c)=>(l.marker??l.title).localeCompare(c.marker??c.title))}function Ol(e){var r;const t=(r=e.attributes)==null?void 0:r.char;t.style&&(t.style==="ft"&&(t.style="xt"),t.style==="fr"&&(t.style="xo"),t.style==="fq"&&(t.style="xq"))}function Al(e){var r;const t=(r=e.attributes)==null?void 0:r.char;t.style&&(t.style==="xt"&&(t.style="ft"),t.style==="xo"&&(t.style="fr"),t.style==="xq"&&(t.style="fq"))}const Pl={type:"USJ",version:"3.1",content:[{type:"para"}]};function Ll({classNameForEditor:e,noteOps:t,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:l,defaultMarkerMenuTrigger:c,localizedStrings:d,parentEditorRef:w}){const p=a.useRef(null),m=a.useRef(null),f=a.useRef(null),u=a.useRef(null);a.useLayoutEffect(()=>{if(!u.current)return;const{width:P}=u.current.getBoundingClientRect();P>0&&(u.current.style.width=`${P}px`)},[]);const[g,b]=a.useState("generated"),[v,j]=a.useState("*"),[C,S]=a.useState("f"),[E,$]=a.useState(!1),[V,M]=a.useState(!0),[D,y]=a.useState(!1),T=a.useRef(!1),I=a.useRef(""),[L,O]=a.useState(!1),[A,U]=a.useState(),[G,H]=a.useState(),[Nt,Rt]=a.useState(),[Ot,dt]=a.useState(),ct=a.useRef(null),B=a.useMemo(()=>({...l,markerMenuTrigger:c,hasExternalUI:!0,view:{...l.view??At.getDefaultViewOptions(),noteMode:"expanded"}}),[l,c]),tt=a.useMemo(()=>Il(p,()=>O(!1),d,Ot),[d,Ot]);a.useEffect(()=>{var P;L||(P=p.current)==null||P.focus()},[C,L]),a.useEffect(()=>{var X,nt;let P;T.current=!1,M(!0);const z=t==null?void 0:t.at(0);if(z&&At.isInsertEmbedOpOfType("note",z)){const gt=(X=z.insert.note)==null?void 0:X.caller;let pt="custom";gt===At.GENERATOR_NOTE_CALLER?pt="generated":gt===At.HIDDEN_NOTE_CALLER?pt="hidden":gt&&j(gt),b(pt),S(((nt=z.insert.note)==null?void 0:nt.style)??"f"),P=setTimeout(()=>{var Mt;(Mt=p.current)==null||Mt.applyUpdate([z])},0)}return()=>{P&&clearTimeout(P)}},[t,i]);const et=a.useCallback((P,z,X=!1)=>{var gt,pt,Mt;const nt=(pt=(gt=p.current)==null?void 0:gt.getNoteOps(0))==null?void 0:pt.at(0);if(nt&&At.isInsertEmbedOpOfType("note",nt)){if(nt.insert.note){let ft;P==="custom"?ft=z:P==="generated"?ft=At.GENERATOR_NOTE_CALLER:ft=At.HIDDEN_NOTE_CALLER,nt.insert.note.caller=ft}r==null||r([nt]),X&&w&&i&&((Mt=w.current)==null||Mt.replaceEmbedUpdate(i,[nt]))}},[i,r,w]),st=a.useCallback(()=>{et(g,v,!0),o()},[g,v,o,et]),kt=a.useRef(st);a.useLayoutEffect(()=>{kt.current=st});const Bt=a.useRef({book:s.book,chapterNum:s.chapterNum});a.useLayoutEffect(()=>{(Bt.current.book!==s.book||Bt.current.chapterNum!==s.chapterNum)&&(Bt.current={book:s.book,chapterNum:s.chapterNum},kt.current())},[s.book,s.chapterNum]);const Gt=()=>{var z;const P=(z=m.current)==null?void 0:z.getElementsByClassName("editor-input")[0];P!=null&&P.textContent&&navigator.clipboard.writeText(P.textContent)},k=a.useCallback(P=>{b(P),et(P,v)},[v,et]),q=a.useCallback(P=>{j(P),et(g,P)},[g,et]),K=P=>{var X,nt,gt,pt,Mt;S(P);const z=(nt=(X=p.current)==null?void 0:X.getNoteOps(0))==null?void 0:nt.at(0);if(z&&At.isInsertEmbedOpOfType("note",z)){z.insert.note&&(z.insert.note.style=P);const ft=(pt=(gt=z.insert.note)==null?void 0:gt.contents)==null?void 0:pt.ops;C!=="x"&&P==="x"?ft==null||ft.forEach(Dt=>Ol(Dt)):C==="x"&&P!=="x"&&(ft==null||ft.forEach(Dt=>Al(Dt))),(Mt=p.current)==null||Mt.applyUpdate([z,{delete:1}])}},rt=P=>{dt(P.contextMarker),y(P.canRedo)},Tt=a.useCallback(P=>{var X,nt,gt,pt,Mt;const z=(nt=(X=p.current)==null?void 0:X.getNoteOps(0))==null?void 0:nt.at(0);if(z&&At.isInsertEmbedOpOfType("note",z)){P.content.length>1&&setTimeout(()=>{var Lt;(Lt=p.current)==null||Lt.applyUpdate([{retain:2},{delete:1}])},0);const ft=(gt=z.insert.note)==null?void 0:gt.style,Dt=(Mt=(pt=z.insert.note)==null?void 0:pt.contents)==null?void 0:Mt.ops;if(ft||$(!1),$(ft==="x"?!!(Dt!=null&&Dt.every(Lt=>{var ht,wt;if(!((ht=Lt.attributes)!=null&&ht.char))return!0;const R=((wt=Lt.attributes)==null?void 0:wt.char).style;return R==="xt"||R==="xo"||R==="xq"})):!!(Dt!=null&&Dt.every(Lt=>{var ht,wt;if(!((ht=Lt.attributes)!=null&&ht.char))return!0;const R=((wt=Lt.attributes)==null?void 0:wt.char).style;return R==="ft"||R==="fr"||R==="fq"}))),!T.current){T.current=!0,I.current=JSON.stringify(z),M(!0);return}M(JSON.stringify(z)===I.current),et(g,v)}else $(!1),M(!0)},[g,v,et]),mt=a.useCallback(()=>{const P=window.getSelection();if(f.current&&tt.length&&P&&P.rangeCount>0){const z=P.getRangeAt(0).getBoundingClientRect(),X=f.current.getBoundingClientRect();U(z.left-X.left),H(z.top-X.top),Rt(z.height),O(!0)}},[tt,f]);return a.useEffect(()=>{const P=()=>{L&&O(!1)};return window.addEventListener("click",P),()=>{window.removeEventListener("click",P)}},[L]),a.useEffect(()=>{var P;L&&((P=ct.current)==null||P.focus())},[L]),a.useEffect(()=>{var X;const P=((X=m.current)==null?void 0:X.querySelector(".editor-input"))??void 0,z=nt=>{!L&&P&&document.activeElement===P&&nt.key===c?(nt.preventDefault(),mt()):L&&nt.key==="Escape"&&(nt.preventDefault(),O(!1))};return document.addEventListener("keydown",z),()=>{document.removeEventListener("keydown",z)}},[L,mt,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:u,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Ml,{isTypeSwitchable:E,noteType:C,handleNoteTypeChange:K,localizedStrings:d}),n.jsx(Sl,{callerType:g,updateCallerType:k,customCaller:v,updateCustomCaller:q,localizedStrings:d})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(ts,{onUndoClick:()=>{var P;return(P=p.current)==null?void 0:P.undo()},onRedoClick:()=>{var P;return(P=p.current)==null?void 0:P.redo()},canUndo:!V,canRedo:D,localizedStrings:d}),n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:st,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.Check,{})})}),n.jsx(jt,{children:n.jsx("p",{children:d["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.X,{})})}),n.jsx(jt,{children:n.jsx("p",{children:d["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:e,children:n.jsx(es,{editorRef:p,children:n.jsx(At.Editorial,{options:B,onStateChange:rt,onUsjChange:Tt,defaultUsj:Pl,onScrRefChange:()=>{},scrRef:s,ref:p})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:Gt,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.Copy,{})})}),n.jsx(jt,{children:n.jsx("p",{children:d["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:f,style:{top:0,left:0,height:0,width:0}}),n.jsxs(ee,{open:L,children:[n.jsx(oo,{className:"tw-absolute",style:{top:G,left:A,height:Nt,width:0,pointerEvents:"none"}}),n.jsx(Wt,{className:"tw-w-[500px] tw-p-0",onClick:P=>{P.preventDefault(),P.stopPropagation()},children:n.jsx(rs,{markerMenuItems:tt,localizedStrings:d,searchRef:ct})})]})]})}const $l=Object.freeze([...ns,...Object.entries(N.usfmMarkers).map(([,e])=>e.description).filter(e=>!!e),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...Qo]);function os(e,t){if(!t||t.length===0)return e??"empty";const r=t.find(s=>typeof s=="string");if(r)return`key-${e??"unknown"}-${r.slice(0,10)}`;const o=typeof t[0]=="string"?"impossible":t[0].marker??"unknown";return`key-${e??"unknown"}-${o}`}function Fl(e,t,r=!0,o=void 0){if(!t||t.length===0)return;const s=[],i=[];let l=[];return t.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&i.push(l),l=[c]):l.push(c)}),l.length>0&&i.push(l),i.map((c,d)=>{const w=d===i.length-1;return n.jsxs("p",{children:[sr(e,c,r,!0,s),w&&o]},os(e,c))})}function sr(e,t,r=!0,o=!0,s=[]){if(!(!t||t.length===0))return t.map(i=>{if(typeof i=="string"){const l=`${e}-text-${i.slice(0,10)}`;if(o){const c=h(`usfm_${e}`);return n.jsx("span",{className:c,children:i},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return Vl(i,os(`${e}\\${i.marker}`,[i]),r,[...s,e??"unknown"])})}function Vl(e,t,r,o=[]){const{marker:s}=e;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(_.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),sr(s,e.content,r,!0,[...o,s??"unknown"])]},t)}function ss({footnote:e,layout:t="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(e.caller):e.caller,i=s!==e.caller;let l,c=e.content;Array.isArray(e.content)&&e.content.length>0&&typeof e.content[0]!="string"&&(e.content[0].marker==="fr"||e.content[0].marker==="xo")&&([l,...c]=e.content);const d=o?n.jsx("span",{className:"marker",children:`\\${e.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${e.marker}*`}):void 0,p=s&&n.jsxs("span",{className:h("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),m=l&&n.jsxs(n.Fragment,{children:[sr(e.marker,[l],o,!1)," "]}),f=t==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=t==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",b=h(f,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",b),children:[d,p]}),n.jsx("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",b),children:m}),n.jsx("div",{className:h("textual-note-body tw-flex tw-flex-col tw-gap-1",g,b),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Fl(e.marker,c,o,w)})})]})}function zl({className:e,classNameForItems:t,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??N.getFormatCallerFunction(r,void 0),m=(C,S)=>{w==null||w(C,S,s)},f=i?r.findIndex(C=>C===i):-1,[u,g]=a.useState(f),b=(C,S,E)=>{if(r.length)switch(C.key){case"Enter":case" ":C.preventDefault(),w==null||w(S,E,s);break}},v=C=>{if(r.length)switch(C.key){case"ArrowDown":C.preventDefault(),g(S=>Math.min(S+1,r.length-1));break;case"ArrowUp":C.preventDefault(),g(S=>Math.max(S-1,0));break}},j=a.useRef([]);return a.useEffect(()=>{var C;u>=0&&u<j.current.length&&((C=j.current[u])==null||C.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:h("tw-h-full tw-overflow-y-auto",e),onKeyDown:v,children:n.jsx("ul",{className:h("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((C,S)=>{const E=C===i,$=`${s}-${S}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:V=>{j.current[S]=V},role:"option","aria-selected":E,"data-marker":C.marker,"data-state":E?"selected":void 0,tabIndex:S===u?0:-1,className:h("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",t),onClick:()=>m(C,S),onKeyDown:V=>b(V,C,S),children:n.jsx(ss,{footnote:C,layout:o,formatCaller:()=>p(C.caller,S),showMarkers:l})},$),S<r.length-1&&o==="vertical"&&n.jsx(ge,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Bl(e){const t=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(e))!==null;)s.index>r&&t.push(e.substring(r,s.index)),t.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<e.length&&t.push(e.substring(r)),t.length>0?t:[e]}function Gl({occurrenceData:e,setScriptureReference:t,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],l=a.useMemo(()=>{const c=[],d=new Set;return e.forEach(w=>{const p=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(p)||(d.add(p),c.push(w))}),c},[e]);return n.jsxs(Ke,{stickyHeader:!0,children:[n.jsx(Ue,{stickyHeader:!0,children:n.jsxs(Kt,{children:[n.jsx(Re,{children:s}),n.jsx(Re,{children:i})]})}),n.jsx(He,{children:l.length>0&&l.map(c=>n.jsxs(Kt,{onClick:()=>{t(c.reference)},children:[n.jsx(se,{children:N.formatScrRef(c.reference,"English")}),n.jsx(se,{className:o,children:Bl(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const hn=a.forwardRef(({className:e,...t},r)=>n.jsx(Mn.Root,{ref:r,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:n.jsx(Mn.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}));hn.displayName=Mn.Root.displayName;const ql=e=>{if(e==="asc")return n.jsx(_.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(e==="desc")return n.jsx(_.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Ye=(e,t,r)=>n.jsx(yt,{children:n.jsxs(_t,{children:[n.jsxs(Ct,{className:h("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:t}),ql(e.getIsSorted())]}),n.jsx(jt,{side:"bottom",children:t})]})}),Kl=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>Ye(t,e)}),Ul=(e,t)=>({accessorKey:`item${t}`,accessorFn:r=>r.items[t],header:({column:r})=>Ye(r,e)}),Hl=e=>({accessorKey:"count",header:({column:t})=>Ye(t,e,"tw-justify-end"),cell:({row:t})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:t.getValue("count")})}),Cn=(e,t,r,o,s,i)=>{let l=[...r];e.forEach(d=>{t==="approved"?l.includes(d)||l.push(d):l=l.filter(w=>w!==d)}),o(l);let c=[...s];e.forEach(d=>{t==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),i(c)},Yl=(e,t,r,o,s)=>({accessorKey:"status",header:({column:i})=>Ye(i,e,"tw-justify-center"),cell:({row:i})=>{const l=i.getValue("status"),c=i.getValue("item");return n.jsxs(fn,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Ce,{onClick:d=>{d.stopPropagation(),Cn([c],"approved",t,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(_.CircleCheckIcon,{})}),n.jsx(Ce,{onClick:d=>{d.stopPropagation(),Cn([c],"unapproved",t,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(_.CircleXIcon,{})}),n.jsx(Ce,{onClick:d=>{d.stopPropagation(),Cn([c],"unknown",t,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(_.CircleHelpIcon,{})})]})}}),Xl=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Wl=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);if(r)return+r[1]},Jl=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?t[1]:""},as=(e,t,r)=>r.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Zl=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Ql=(e,t,r)=>{let o=e;return t!=="all"&&(o=o.filter(s=>t==="approved"&&s.status==="approved"||t==="unapproved"&&s.status==="unapproved"||t==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},tc=(e,t,r)=>e.map(o=>{const s=N.isString(o.key)?o.key:o.key[0];return{items:N.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||as(s,t,r),occurrences:o.occurrences||[]}}),qt=(e,t)=>e[t]??t;function ec({inventoryItems:e,setVerseRef:t,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:l,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1,classNameForVerseText:m,onItemSelected:f}){const u=qt(r,"%webView_inventory_all%"),g=qt(r,"%webView_inventory_approved%"),b=qt(r,"%webView_inventory_unapproved%"),v=qt(r,"%webView_inventory_unknown%"),j=qt(r,"%webView_inventory_scope_currentBook%"),C=qt(r,"%webView_inventory_scope_chapter%"),S=qt(r,"%webView_inventory_scope_verse%"),E=qt(r,"%webView_inventory_filter_text%"),$=qt(r,"%webView_inventory_show_additional_items%"),V=qt(r,"%webView_inventory_no_results%"),[M,D]=a.useState(!1),[y,T]=a.useState("all"),[I,L]=a.useState(""),[O,A]=a.useState([]),U=a.useMemo(()=>{const B=e??[];return B.length===0?[]:tc(B,s,i)},[e,s,i]),G=a.useMemo(()=>{if(M)return U;const B=[];return U.forEach(tt=>{const et=tt.items[0],st=B.find(kt=>kt.items[0]===et);st?(st.count+=tt.count,st.occurrences=st.occurrences.concat(tt.occurrences)):B.push({items:[et],count:tt.count,occurrences:tt.occurrences,status:tt.status})}),B},[M,U]),H=a.useMemo(()=>G.length===0?[]:Ql(G,y,I),[G,y,I]),Nt=a.useMemo(()=>{var et,st;if(!M)return d;const B=(et=o==null?void 0:o.tableHeaders)==null?void 0:et.length;if(!B)return d;const tt=[];for(let kt=0;kt<B;kt++)tt.push(Ul(((st=o==null?void 0:o.tableHeaders)==null?void 0:st[kt])||"Additional Item",kt+1));return[...tt,...d]},[o==null?void 0:o.tableHeaders,d,M]);a.useEffect(()=>{H.length===0?A([]):H.length===1&&A(H[0].items)},[H]);const Rt=(B,tt)=>{tt.setRowSelection(()=>{const st={};return st[B.index]=!0,st});const et=B.original.items;A(et),f&&et.length>0&&f(et[0])},Ot=B=>{if(B==="book"||B==="chapter"||B==="verse")c(B);else throw new Error(`Invalid scope value: ${B}`)},dt=B=>{if(B==="all"||B==="approved"||B==="unapproved"||B==="unknown")T(B);else throw new Error(`Invalid status filter value: ${B}`)},ct=a.useMemo(()=>{if(G.length===0||O.length===0)return[];const B=G.filter(tt=>N.deepEqual(M?tt.items:[tt.items[0]],O));if(B.length>1)throw new Error("Selected item is not unique");return B.length===0?[]:B[0].occurrences},[O,M,G]);return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(xe,{onValueChange:B=>dt(B),defaultValue:y,children:[n.jsx(le,{className:"tw-m-1",children:n.jsx(be,{placeholder:"Select filter"})}),n.jsxs(ce,{children:[n.jsx(It,{value:"all",children:u}),n.jsx(It,{value:"approved",children:g}),n.jsx(It,{value:"unapproved",children:b}),n.jsx(It,{value:"unknown",children:v})]})]}),n.jsxs(xe,{onValueChange:B=>Ot(B),defaultValue:l,children:[n.jsx(le,{className:"tw-m-1",children:n.jsx(be,{placeholder:"Select scope"})}),n.jsxs(ce,{children:[n.jsx(It,{value:"book",children:j}),n.jsx(It,{value:"chapter",children:C}),n.jsx(It,{value:"verse",children:S})]})]}),n.jsx(Ne,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:E,value:I,onChange:B=>{L(B.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(hn,{className:"tw-m-1",checked:M,onCheckedChange:B=>{D(B)}}),n.jsx(it,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??$})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Yo,{columns:Nt,data:H,onRowClickHandler:Rt,stickyHeader:!0,isLoading:p,noResultsMessage:V})}),ct.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Gl,{classNameForText:m,occurrenceData:ct,setScriptureReference:t,localizedStrings:r})})]})}const nc="16rem",rc="3rem",is=a.createContext(void 0);function Xe(){const e=a.useContext(is);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const ar=a.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:r,className:o,style:s,children:i,side:l="primary",...c},d)=>{const[w,p]=a.useState(e),m=t??w,f=a.useCallback(S=>{const E=typeof S=="function"?S(m):S;r?r(E):p(E)},[r,m]),u=a.useCallback(()=>f(S=>!S),[f]),g=m?"expanded":"collapsed",j=ut()==="ltr"?l:l==="primary"?"secondary":"primary",C=a.useMemo(()=>({state:g,open:m,setOpen:f,toggleSidebar:u,side:j}),[g,m,f,u,j]);return n.jsx(is.Provider,{value:C,children:n.jsx(yt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":nc,"--sidebar-width-icon":rc,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:i})})})});ar.displayName="SidebarProvider";const ir=a.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:r,children:o,...s},i)=>{const l=Xe();return t==="none"?n.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?t:"","data-variant":e,"data-side":l.side,children:[n.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});ir.displayName="Sidebar";const ls=a.forwardRef(({className:e,onClick:t,...r},o)=>{const s=Xe();return n.jsxs(F,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",e),onClick:i=>{t==null||t(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(_.PanelLeft,{}):n.jsx(_.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ls.displayName="SidebarTrigger";const cs=a.forwardRef(({className:e,...t},r)=>{const{toggleSidebar:o}=Xe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});cs.displayName="SidebarRail";const lr=a.forwardRef(({className:e,...t},r)=>n.jsx("main",{ref:r,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));lr.displayName="SidebarInset";const ws=a.forwardRef(({className:e,...t},r)=>n.jsx(Ne,{ref:r,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));ws.displayName="SidebarInput";const ds=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));ds.displayName="SidebarHeader";const ps=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));ps.displayName="SidebarFooter";const us=a.forwardRef(({className:e,...t},r)=>n.jsx(ge,{ref:r,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));us.displayName="SidebarSeparator";const cr=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));cr.displayName="SidebarContent";const sn=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));sn.displayName="SidebarGroup";const an=a.forwardRef(({className:e,asChild:t=!1,...r},o)=>{const s=t?Te.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...r})});an.displayName="SidebarGroupLabel";const ms=a.forwardRef(({className:e,asChild:t=!1,...r},o)=>{const s=t?Te.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...r})});ms.displayName="SidebarGroupAction";const ln=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",e),...t}));ln.displayName="SidebarGroupContent";const wr=a.forwardRef(({className:e,...t},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));wr.displayName="SidebarMenu";const dr=a.forwardRef(({className:e,...t},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",e),...t}));dr.displayName="SidebarMenuItem";const oc=we.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),pr=a.forwardRef(({asChild:e=!1,isActive:t=!1,variant:r="default",size:o="default",tooltip:s,className:i,...l},c)=>{const d=e?Te.Slot:"button",{state:w}=Xe(),p=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":t,className:h(oc({variant:r,size:o}),i),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:p}),n.jsx(jt,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});pr.displayName="SidebarMenuButton";const fs=a.forwardRef(({className:e,asChild:t=!1,showOnHover:r=!1,...o},s)=>{const i=t?Te.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...o})});fs.displayName="SidebarMenuAction";const hs=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));hs.displayName="SidebarMenuBadge";const gs=a.forwardRef(({className:e,showIcon:t=!1,...r},o)=>{const s=a.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...r,children:[t&&n.jsx(on,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(on,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});gs.displayName="SidebarMenuSkeleton";const xs=a.forwardRef(({className:e,...t},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));xs.displayName="SidebarMenuSub";const bs=a.forwardRef(({...e},t)=>n.jsx("li",{ref:t,...e}));bs.displayName="SidebarMenuSubItem";const vs=a.forwardRef(({asChild:e=!1,size:t="md",isActive:r,className:o,...s},i)=>{const l=e?Te.Slot:"a";return n.jsx(l,{ref:i,"data-sidebar":"menu-sub-button","data-size":t,"data-active":r,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});vs.displayName="SidebarMenuSubButton";function ys({id:e,extensionLabels:t,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:d}){const w=a.useCallback((f,u)=>{o(f,u)},[o]),p=a.useCallback(f=>{const u=r.find(g=>g.projectId===f);return u?u.projectName:f},[r]),m=a.useCallback(f=>!s.projectId&&f===s.label,[s]);return n.jsx(ir,{id:e,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(cr,{children:[n.jsxs(sn,{children:[n.jsx(an,{className:"tw-text-sm",children:i}),n.jsx(ln,{children:n.jsx(wr,{children:Object.entries(t).map(([f,u])=>n.jsx(dr,{children:n.jsx(pr,{onClick:()=>w(f),isActive:m(f),children:n.jsx("span",{className:"tw-pl-3",children:u})})},f))})})]}),n.jsxs(sn,{children:[n.jsx(an,{className:"tw-text-sm",children:l}),n.jsx(ln,{className:"tw-pl-3",children:n.jsx(en,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(f=>f.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:f=>{const u=p(f);w(u,f)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(_.ScrollText,{})})})]})]})})}const gn=a.forwardRef(({value:e,onSearch:t,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:l},c)=>{const d=ut();return n.jsxs("div",{id:l,className:h("tw-relative",{"tw-w-full":o},s),children:[n.jsx(_.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(Ne,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:e,onChange:w=>t(w.target.value),disabled:i}),e&&n.jsxs(F,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{t("")},children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});gn.displayName="SearchBar";function sc({id:e,extensionLabels:t,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(gn,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(ar,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(ys,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:t,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),n.jsx(lr,{className:"tw-min-w-[215px]",children:o})]})]})}const re="scrBook",ac="scrRef",fe="source",ic="details",lc="Scripture Reference",cc="Scripture Book",js="Type",wc="Details";function dc(e,t){const r=t??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:re,header:(e==null?void 0:e.scriptureReferenceColumnName)??lc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?at.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===re?N.formatScrRef(s.start):void 0},getGroupingValue:o=>at.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>N.formatScrRef(o.start),id:ac,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:N.formatScrRef(s.start)},sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:fe,header:r?(e==null?void 0:e.typeColumnName)??js:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:ic,header:(e==null?void 0:e.detailsColumnName)??wc,cell:o=>o.getValue(),enableGrouping:!1}]}const pc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let r=0;return e.end&&({offset:r}=e.end),!e.end||N.compareScrRefs(e.start,e.end)===0?`${N.scrRefToBBBCCCVVV(e.start)}+${t}`:`${N.scrRefToBBBCCCVVV(e.start)}+${t}-${N.scrRefToBBBCCCVVV(e.end)}+${r}`},Pr=e=>`${pc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function uc({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:l,onRowSelected:c,id:d}){const[w,p]=a.useState([]),[m,f]=a.useState([{id:re,desc:!1}]),[u,g]=a.useState({}),b=a.useMemo(()=>e.flatMap(y=>y.data.map(T=>({...T,source:y.source}))),[e]),v=a.useMemo(()=>dc({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:l},r),[o,i,l,r]);a.useEffect(()=>{w.includes(fe)?f([{id:fe,desc:!1},{id:re,desc:!1}]):f([{id:re,desc:!1}])},[w]);const j=vt.useReactTable({data:b,columns:v,state:{grouping:w,sorting:m,rowSelection:u},onGroupingChange:p,onSortingChange:f,onRowSelectionChange:g,getExpandedRowModel:vt.getExpandedRowModel(),getGroupedRowModel:vt.getGroupedRowModel(),getCoreRowModel:vt.getCoreRowModel(),getSortedRowModel:vt.getSortedRowModel(),getRowId:Pr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});a.useEffect(()=>{if(c){const y=j.getSelectedRowModel().rowsById,T=Object.keys(y);if(T.length===1){const I=b.find(L=>Pr(L)===T[0])||void 0;I&&c(I)}}},[u,b,c,j]);const C=s??cc,S=i??js,E=[{label:"No Grouping",value:[]},{label:`Group by ${C}`,value:[re]},{label:`Group by ${S}`,value:[fe]},{label:`Group by ${C} and ${S}`,value:[re,fe]},{label:`Group by ${S} and ${C}`,value:[fe,re]}],$=y=>{p(JSON.parse(y))},V=(y,T)=>{!y.getIsGrouped()&&!y.getIsSelected()&&y.getToggleSelectedHandler()(T)},M=(y,T)=>y.getIsGrouped()?"":h("banded-row",T%2===0?"even":"odd"),D=(y,T,I)=>{if(!((y==null?void 0:y.length)===0||T.depth<I.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&n.jsxs(xe,{value:JSON.stringify(w),onValueChange:y=>{$(y)},children:[n.jsx(le,{className:"tw-mb-1 tw-mt-2",children:n.jsx(be,{})}),n.jsx(ce,{position:"item-aligned",children:n.jsx(Bo,{children:E.map(y=>n.jsx(It,{value:JSON.stringify(y.value),children:y.label},y.label))})})]}),n.jsxs(Ke,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&n.jsx(Ue,{children:j.getHeaderGroups().map(y=>n.jsx(Kt,{children:y.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(Re,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(F,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",vt.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},y.id))}),n.jsx(He,{children:j.getRowModel().rows.map((y,T)=>{const I=ut();return n.jsx(Kt,{"data-state":y.getIsSelected()?"selected":"",className:h(M(y,T)),onClick:L=>V(y,L),children:y.getVisibleCells().map(L=>{if(!(L.getIsPlaceholder()||L.column.columnDef.enableGrouping&&!L.getIsGrouped()&&(L.column.columnDef.id!==fe||!r)))return n.jsx(se,{className:h(L.column.columnDef.id,"tw-p-[1px]",D(w,y,L)),children:L.getIsGrouped()?n.jsxs(F,{variant:"link",onClick:y.getToggleExpandedHandler(),type:"button",children:[y.getIsExpanded()&&n.jsx(_.ChevronDown,{}),!y.getIsExpanded()&&(I==="ltr"?n.jsx(_.ChevronRight,{}):n.jsx(_.ChevronLeft,{}))," ",vt.flexRender(L.column.columnDef.cell,L.getContext())," (",y.subRows.length,")"]}):vt.flexRender(L.column.columnDef.cell,L.getContext())},L.id)})},y.id)})})]})]})}function mc(e,t,r){return`${e} ${Ve[e]}${t?` ${Qr(e,t)} ${Pt(e,t)}`:""}`}const ur=(e,t)=>e.filter(r=>{try{return N.getSectionForBook(r)===t}catch{return!1}}),Ns=(e,t,r)=>ur(e,t).every(o=>r.includes(o));function fc({section:e,availableBookIds:t,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=ur(t,e).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(F,{variant:"outline",size:"sm",onClick:()=>o(e),className:h(Ns(t,e,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Va(e,l,c,d,w)})}const Lr=5,En=6;function hc({availableBookInfo:e,selectedBookIds:t,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:f,ntLong:u,dcLong:g,extraLong:b}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[v,j]=a.useState(!1),[C,S]=a.useState(""),E=a.useRef(void 0),$=a.useRef(!1);if(e.length!==at.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const V=a.useMemo(()=>at.Canon.allBookIds.filter((A,U)=>e[U]==="1"&&!at.Canon.isObsolete(at.Canon.bookIdToNumber(A))),[e]),M=a.useMemo(()=>{if(!C.trim()){const G={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return V.forEach(H=>{const Nt=N.getSectionForBook(H);G[Nt].push(H)}),G}const A=V.filter(G=>Fn(G,C,s)),U={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return A.forEach(G=>{const H=N.getSectionForBook(G);U[H].push(G)}),U},[V,C,s]),D=a.useCallback((A,U=!1)=>{if(!U||!E.current){r(t.includes(A)?t.filter(dt=>dt!==A):[...t,A]),E.current=A;return}const G=V.findIndex(dt=>dt===E.current),H=V.findIndex(dt=>dt===A);if(G===-1||H===-1)return;const[Nt,Rt]=[Math.min(G,H),Math.max(G,H)],Ot=V.slice(Nt,Rt+1).map(dt=>dt);r(t.includes(A)?t.filter(dt=>!Ot.includes(dt)):[...new Set([...t,...Ot])])},[t,r,V]),y=A=>{D(A,$.current),$.current=!1},T=(A,U)=>{A.preventDefault(),D(U,A.shiftKey)},I=a.useCallback(A=>{const U=ur(V,A).map(G=>G);r(Ns(V,A,t)?t.filter(G=>!U.includes(G)):[...new Set([...t,...U])])},[t,r,V]),L=()=>{r(V.map(A=>A))},O=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(N.Section).map(A=>n.jsx(fc,{section:A,availableBookIds:V,selectedBookIds:t,onToggle:I,localizedStrings:o},A))}),n.jsxs(ee,{open:v,onOpenChange:A=>{j(A),A||S("")},children:[n.jsx(pe,{asChild:!0,children:n.jsxs(F,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[t.length>0?`${i}: ${t.length}`:l,n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Wt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Yt,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&($.current=A.shiftKey)},children:[n.jsx(ve,{placeholder:c,value:C,onValueChange:S}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:L,children:d}),n.jsx(F,{variant:"ghost",size:"sm",onClick:O,children:w})]}),n.jsxs(Xt,{children:[n.jsx(ye,{children:p}),Object.values(N.Section).map((A,U)=>{const G=M[A];if(G.length!==0)return n.jsxs(a.Fragment,{children:[n.jsx(de,{heading:Zr(A,f,u,g,b),children:G.map(H=>n.jsx(eo,{bookId:H,isSelected:t.includes(H),onSelect:()=>y(H),onMouseDown:Nt=>T(Nt,H),section:N.getSectionForBook(H),showCheck:!0,localizedBookNames:s,commandValue:mc(H,s),className:"tw-flex tw-items-center"},H))}),U<Object.values(N.Section).length-1&&n.jsx(Wr,{})]},A)})]})]})})]}),t.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[t.slice(0,t.length===En?En:Lr).map(A=>n.jsx(Zt,{className:"hover:tw-bg-secondary",variant:"secondary",children:Pt(A,s)},A)),t.length>En&&n.jsx(Zt,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${t.length-Lr} ${m}`})]})]})}const gc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),ue=(e,t)=>e[t]??t;function xc({scope:e,availableScopes:t,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:l,localizedBookNames:c,id:d}){const w=ue(l,"%webView_scope_selector_selected_text%"),p=ue(l,"%webView_scope_selector_current_verse%"),m=ue(l,"%webView_scope_selector_current_chapter%"),f=ue(l,"%webView_scope_selector_current_book%"),u=ue(l,"%webView_scope_selector_choose_books%"),g=ue(l,"%webView_scope_selector_scope%"),b=ue(l,"%webView_scope_selector_select_books%"),v=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],j=t?v.filter(C=>t.includes(C.value)):v;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(it,{children:g}),n.jsx(pn,{value:e,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:C,label:S,id:E})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{className:"tw-me-2",value:C,id:E}),n.jsx(it,{htmlFor:E,children:S})]},E))})]}),e==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(it,{children:b}),n.jsx(hc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:l,localizedBookNames:c})]})]})}const Sn={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function bc({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:l}){const c={...Sn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in Sn?Sn[w]:p]))},d=ut();return n.jsxs(xe,{value:`${t}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(le,{size:s,className:h("pr-twp tw-w-auto",i),children:n.jsx(be,{placeholder:c[N.getLocalizeKeyForScrollGroupId(t)]??t})}),n.jsx(ce,{id:l,align:d==="rtl"?"end":"start",style:{zIndex:250},children:e.map(w=>n.jsx(It,{value:`${w}`,children:c[N.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function vc({children:e}){return n.jsx("div",{className:"pr-twp tw-grid",children:e})}function yc({primary:e,secondary:t,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function jc({primary:e,secondary:t,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),r?n.jsx(ge,{}):""]})}function ks(e,t){var r;return(r=Object.entries(e).find(([,o])=>"menuItem"in o&&o.menuItem===t))==null?void 0:r[0]}function cn({icon:e,menuLabel:t,leading:r}){return e?n.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`}):void 0}const _s=(e,t,r,o)=>r?Object.entries(e).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order).flatMap(([i])=>t.filter(c=>c.group===i).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:"command"in c?n.jsxs(Ge,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(cn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(cn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Fo,{children:[n.jsx(tr,{children:c.label}),n.jsx($o,{children:n.jsx(er,{children:_s(e,t,ks(e,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(jt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function wn({onSelectMenuItem:e,menuData:t,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:l="ghost",id:c}){return n.jsxs(Qt,{variant:i,children:[n.jsx(ie,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(F,{variant:l,size:"icon",children:o??n.jsx(_.MenuIcon,{})})}),n.jsx(Ht,{align:"start",className:"tw-z-[250]",children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>n.jsxs(a.Fragment,{children:[n.jsx(Qn,{children:n.jsx(yt,{children:_s(t.groups,t.items,d,e)})}),w<p.length-1&&n.jsx(je,{})]},d))})]})}const Cs=a.forwardRef(({id:e,className:t,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,id:e,children:r}));function Nc({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:t,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(Cs,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(wn,{onSelectMenuItem:e,menuData:r,tabLabel:"Project",icon:w??n.jsx(_.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(wn,{onSelectMenuItem:t,menuData:o,tabLabel:"View Info",icon:n.jsx(_.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function kc({onSelectProjectMenuItem:e,projectMenuData:t,id:r,className:o,menuButtonIcon:s}){return n.jsx(Cs,{className:"tw-pointer-events-none",id:r,children:t&&n.jsx(wn,{onSelectMenuItem:e,menuData:t,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const mr=a.forwardRef(({className:e,...t},r)=>{const o=ut();return n.jsx(St.Root,{orientation:"vertical",ref:r,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:o})});mr.displayName=St.List.displayName;const fr=a.forwardRef(({className:e,...t},r)=>n.jsx(St.List,{ref:r,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));fr.displayName=St.List.displayName;const Es=a.forwardRef(({className:e,...t},r)=>n.jsx(St.Trigger,{ref:r,...t,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),hr=a.forwardRef(({className:e,...t},r)=>n.jsx(St.Content,{ref:r,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));hr.displayName=St.Content.displayName;function _c({tabList:e,searchValue:t,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(gn,{className:i,value:t,onSearch:r,placeholder:o})]}),n.jsxs(mr,{children:[n.jsx(fr,{children:e.map(c=>n.jsx(Es,{value:c.value,children:c.value},c.key))}),e.map(c=>n.jsx(hr,{value:c.value,children:c.content},c.key))]})]})}function Cc({...e}){return n.jsx(Z.Menu,{...e})}function Ec({...e}){return n.jsx(Z.Sub,{"data-slot":"menubar-sub",...e})}const Ss=a.forwardRef(({className:e,variant:t="default",...r},o)=>{const s=a.useMemo(()=>({variant:t}),[t]);return n.jsx(Zn.Provider,{value:s,children:n.jsx(Z.Root,{ref:o,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...r})})});Ss.displayName=Z.Root.displayName;const Rs=a.forwardRef(({className:e,...t},r)=>{const o=zt();return n.jsx(Z.Trigger,{ref:r,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ne({variant:o.variant,className:e})),...t})});Rs.displayName=Z.Trigger.displayName;const Ts=a.forwardRef(({className:e,inset:t,children:r,...o},s)=>{const i=zt();return n.jsxs(Z.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",ne({variant:i.variant,className:e}),e),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ts.displayName=Z.SubTrigger.displayName;const Ms=a.forwardRef(({className:e,...t},r)=>{const o=zt();return n.jsx(Z.SubContent,{ref:r,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},e),...t})});Ms.displayName=Z.SubContent.displayName;const Ds=a.forwardRef(({className:e,align:t="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const l=zt();return n.jsx(Z.Portal,{children:n.jsx(Z.Content,{ref:i,align:t,alignOffset:r,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},e),...s})})});Ds.displayName=Z.Content.displayName;const Is=a.forwardRef(({className:e,inset:t,...r},o)=>{const s=zt();return n.jsx(Z.Item,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",ne({variant:s.variant,className:e}),e),...r})});Is.displayName=Z.Item.displayName;const Sc=a.forwardRef(({className:e,children:t,checked:r,...o},s)=>{const i=zt();return n.jsxs(Z.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ne({variant:i.variant,className:e}),e),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Sc.displayName=Z.CheckboxItem.displayName;const Rc=a.forwardRef(({className:e,children:t,...r},o)=>{const s=zt();return n.jsxs(Z.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ne({variant:s.variant,className:e}),e),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});Rc.displayName=Z.RadioItem.displayName;const Tc=a.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Z.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...r}));Tc.displayName=Z.Label.displayName;const Os=a.forwardRef(({className:e,...t},r)=>n.jsx(Z.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Os.displayName=Z.Separator.displayName;const Oe=(e,t)=>{setTimeout(()=>{t.forEach(r=>{var o;(o=e.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},As=(e,t,r,o)=>{if(!r)return;const s=Object.entries(e).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order);return s.flatMap(([i],l)=>{const c=t.filter(w=>w.group===i).sort((w,p)=>w.order-p.order).map(w=>n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:"command"in w?n.jsxs(Is,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(cn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(cn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(Ec,{children:[n.jsx(Ts,{children:w.label}),n.jsx(Ms,{children:As(e,t,ks(e,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(jt,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&l<s.length-1&&d.push(n.jsx(Os,{},`separator-${i}`)),d})};function Mc({menuData:e,onSelectMenuItem:t,onOpenChange:r,variant:o}){const s=a.useRef(void 0),i=a.useRef(void 0),l=a.useRef(void 0),c=a.useRef(void 0),d=a.useRef(void 0),w=p=>{switch(p){case"platform.app":return i;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return d;default:return}};if(Ta.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,m)=>{var g,b,v,j;p.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":Oe(i,[f]);break;case"alt+p":(g=i.current)==null||g.focus(),Oe(i,[f,u]);break;case"alt+l":(b=l.current)==null||b.focus(),Oe(l,[f,u]);break;case"alt+n":(v=c.current)==null||v.focus(),Oe(c,[f,u]);break;case"alt+h":(j=d.current)==null||j.focus(),Oe(d,[f,u]);break}}),a.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const b=g.target.getAttribute("data-state");r(b==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!e)return n.jsx(Ss,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(e.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,m])=>typeof p=="boolean"||typeof m=="boolean"?0:p.order-m.order).map(([p,m])=>n.jsxs(Cc,{children:[n.jsx(Rs,{ref:w(p),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(Ds,{className:"tw-z-[250]",children:n.jsx(yt,{children:As(e.groups,e.items,p,t)})})]},p))})}function Dc(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Ic({menuData:e,onOpenChange:t,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=a.useRef(void 0);return n.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[l,e&&n.jsx(Mc,{menuData:e,onOpenChange:t,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Oc=(e,t)=>e[t]??t;function Ac({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:l,className:c,id:d}){const w=Oc(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,m]=a.useState(!1),f=g=>{s&&s(g),o&&o([g,...r.filter(b=>b!==g)]),i&&r.find(b=>b===g)&&i([...r.filter(b=>b!==g)]),m(!1)},u=(g,b)=>{var j,C,S,E,$,V;const v=b!==g?((C=(j=e[g])==null?void 0:j.uiNames)==null?void 0:C[b])??((E=(S=e[g])==null?void 0:S.uiNames)==null?void 0:E.en):void 0;return v?`${($=e[g])==null?void 0:$.autonym} (${v})`:(V=e[g])==null?void 0:V.autonym};return n.jsxs("div",{id:d,className:h("pr-twp tw-max-w-sm",c),children:[n.jsxs(xe,{name:"uiLanguage",value:t,onValueChange:f,open:p,onOpenChange:g=>m(g),children:[n.jsx(le,{children:n.jsx(be,{})}),n.jsx(ce,{className:"tw-z-[250]",children:Object.keys(e).map(g=>n.jsx(It,{value:g,children:u(g,t)},g))})]}),t!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(it,{className:"tw-font-normal tw-text-muted-foreground",children:N.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,t)).join(", "):e.en.autonym})})})]})}function Pc({item:e,createLabel:t,createComplexLabel:r}){return t?n.jsx(it,{children:t(e)}):r?n.jsx(it,{children:r(e)}):n.jsx(it,{children:e})}function Lc({id:e,className:t,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:l}){return n.jsx("div",{id:e,className:t,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(hn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(Pc,{item:c,createLabel:i,createComplexLabel:l})]},c))})}function $c({cardKey:e,isSelected:t,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:l,selectedButtons:c,hoverButtons:d,dropdownContent:w,additionalSelectedContent:p,accentColor:m,showDropdownOnHover:f=!1}){const u=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":t,className:h("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!t},{"tw-bg-accent":t},{"tw-bg-transparent":!t},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),t&&c,!t&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:d}),!t&&f&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(Qt,{children:[n.jsx(ie,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(F,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(Ht,{align:"end",children:w})]})}),t&&w&&n.jsxs(Qt,{children:[n.jsx(ie,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(F,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(Ht,{align:"end",children:w})]})]}),t&&p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},e)}const Ps=a.forwardRef(({className:e,...t},r)=>n.jsx(_.LoaderCircle,{size:35,className:h("tw-animate-spin",e),...t,ref:r}));Ps.displayName="Spinner";function Fc({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:l,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:m,onFocus:f,onBlur:u}){return n.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(it,{htmlFor:e,className:h({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(Ne,{id:e,disabled:t,placeholder:l,required:c,className:h(d,{"tw-border-red-600":r}),defaultValue:w,value:p,onChange:m,onFocus:f,onBlur:u}),n.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const Vc=we.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ls=a.forwardRef(({className:e,variant:t,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:h("pr-twp",Vc({variant:t}),e),...r}));Ls.displayName="Alert";const $s=a.forwardRef(({className:e,...t},r)=>n.jsxs("h5",{ref:r,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));$s.displayName="AlertTitle";const Fs=a.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Fs.displayName="AlertDescription";const zc=Q.Root,Bc=Q.Trigger,Gc=Q.Group,qc=Q.Portal,Kc=Q.Sub,Uc=Q.RadioGroup,Vs=a.forwardRef(({className:e,inset:t,children:r,...o},s)=>n.jsxs(Q.SubTrigger,{ref:s,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",e),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Vs.displayName=Q.SubTrigger.displayName;const zs=a.forwardRef(({className:e,...t},r)=>n.jsx(Q.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));zs.displayName=Q.SubContent.displayName;const Bs=a.forwardRef(({className:e,...t},r)=>n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:r,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t})}));Bs.displayName=Q.Content.displayName;const Gs=a.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Q.Item,{ref:o,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...r}));Gs.displayName=Q.Item.displayName;const qs=a.forwardRef(({className:e,children:t,checked:r,...o},s)=>n.jsxs(Q.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));qs.displayName=Q.CheckboxItem.displayName;const Ks=a.forwardRef(({className:e,children:t,...r},o)=>n.jsxs(Q.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));Ks.displayName=Q.RadioItem.displayName;const Us=a.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Q.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",t&&"tw-pl-8",e),...r}));Us.displayName=Q.Label.displayName;const Hs=a.forwardRef(({className:e,...t},r)=>n.jsx(Q.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",e),...t}));Hs.displayName=Q.Separator.displayName;function Ys({className:e,...t}){return n.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}Ys.displayName="ContextMenuShortcut";const Xs=a.createContext({direction:"bottom"});function Ws({shouldScaleBackground:e=!0,direction:t="bottom",...r}){const o=a.useMemo(()=>({direction:t}),[t]);return n.jsx(Xs.Provider,{value:o,children:n.jsx(Vt.Drawer.Root,{shouldScaleBackground:e,direction:t,...r})})}Ws.displayName="Drawer";const Hc=Vt.Drawer.Trigger,Js=Vt.Drawer.Portal,Yc=Vt.Drawer.Close,gr=a.forwardRef(({className:e,...t},r)=>n.jsx(Vt.Drawer.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...t}));gr.displayName=Vt.Drawer.Overlay.displayName;const Zs=a.forwardRef(({className:e,children:t,hideDrawerHandle:r=!1,...o},s)=>{const{direction:i="bottom"}=a.useContext(Xs),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(Js,{children:[n.jsx(gr,{}),n.jsxs(Vt.Drawer.Content,{ref:s,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",l[i],e),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:c[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:t}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:c[i]})]})]})});Zs.displayName="DrawerContent";function Qs({className:e,...t}){return n.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...t})}Qs.displayName="DrawerHeader";function ta({className:e,...t}){return n.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...t})}ta.displayName="DrawerFooter";const ea=a.forwardRef(({className:e,...t},r)=>n.jsx(Vt.Drawer.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));ea.displayName=Vt.Drawer.Title.displayName;const na=a.forwardRef(({className:e,...t},r)=>n.jsx(Vt.Drawer.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",e),...t}));na.displayName=Vt.Drawer.Description.displayName;const ra=a.forwardRef(({className:e,value:t,...r},o)=>n.jsx(Dn.Root,{ref:o,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...r,children:n.jsx(Dn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})}));ra.displayName=Dn.Root.displayName;function Xc({className:e,...t}){return n.jsx(Ln.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",e),...t})}const Wc=Ln.Panel;function Jc({withHandle:e,className:t,...r}){return n.jsx(Ln.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",t),...r,children:e&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(_.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Zc({...e}){return n.jsx(zr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const oa=a.forwardRef(({className:e,...t},r)=>{const o=ut();return n.jsxs(Ae.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:o,children:[n.jsx(Ae.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Ae.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Ae.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});oa.displayName=Ae.Root.displayName;const sa=a.forwardRef(({className:e,...t},r)=>{const o=ut();return n.jsx(In.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:r,children:n.jsx(In.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});sa.displayName=In.Root.displayName;const Qc=St.Root,aa=a.forwardRef(({className:e,...t},r)=>{const o=ut();return n.jsx(St.List,{ref:r,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:o})});aa.displayName=St.List.displayName;const ia=a.forwardRef(({className:e,...t},r)=>n.jsx(St.Trigger,{ref:r,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));ia.displayName=St.Trigger.displayName;const la=a.forwardRef(({className:e,...t},r)=>n.jsx(St.Content,{ref:r,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));la.displayName=St.Content.displayName;const ca=a.forwardRef(({className:e,...t},r)=>n.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",e),ref:r,...t}));ca.displayName="Textarea";const tw=(e,t)=>{a.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])};function ew(e){return{preserveValue:!0,...e}}const wa=(e,t,r={})=>{const o=a.useRef(t);o.current=t;const s=a.useRef(r);s.current=ew(s.current);const[i,l]=a.useState(()=>o.current),[c,d]=a.useState(!0);return a.useEffect(()=>{let w=!0;return d(!!e),(async()=>{if(e){const p=await e();w&&(l(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||l(()=>o.current)}},[e]),[i,c]},Rn=()=>!1,nw=(e,t)=>{const[r]=wa(a.useCallback(async()=>{if(!e)return Rn;const o=await Promise.resolve(e(t));return async()=>o()},[t,e]),Rn,{preserveValue:!1});a.useEffect(()=>()=>{r!==Rn&&r()},[r])};function rw(e){a.useEffect(()=>{let t;return e&&(t=document.createElement("style"),t.appendChild(document.createTextNode(e)),document.head.appendChild(t)),()=>{t&&document.head.removeChild(t)}},[e])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>zr.toast});exports.Alert=Ls;exports.AlertDescription=Fs;exports.AlertTitle=$s;exports.Avatar=Wn;exports.AvatarFallback=Jn;exports.AvatarImage=Lo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Ka;exports.BOOK_SELECTOR_STRING_KEYS=Ya;exports.Badge=Zt;exports.BookChapterControl=qa;exports.BookSelector=Xa;exports.Button=F;exports.COMMENT_EDITOR_STRING_KEYS=il;exports.COMMENT_LIST_STRING_KEYS=ll;exports.Card=Yn;exports.CardContent=Xn;exports.CardDescription=Ao;exports.CardFooter=Po;exports.CardHeader=Io;exports.CardTitle=Oo;exports.ChapterRangeSelector=so;exports.Checkbox=hn;exports.Checklist=Lc;exports.ComboBox=en;exports.Command=Yt;exports.CommandDialog=Xr;exports.CommandEmpty=ye;exports.CommandGroup=de;exports.CommandInput=ve;exports.CommandItem=te;exports.CommandList=Xt;exports.CommandNavigator=ro;exports.CommentEditor=al;exports.CommentList=pl;exports.ContextMenu=zc;exports.ContextMenuCheckboxItem=qs;exports.ContextMenuContent=Bs;exports.ContextMenuGroup=Gc;exports.ContextMenuItem=Gs;exports.ContextMenuLabel=Us;exports.ContextMenuPortal=qc;exports.ContextMenuRadioGroup=Uc;exports.ContextMenuRadioItem=Ks;exports.ContextMenuSeparator=Hs;exports.ContextMenuShortcut=Ys;exports.ContextMenuSub=Kc;exports.ContextMenuSubContent=zs;exports.ContextMenuSubTrigger=Vs;exports.ContextMenuTrigger=Bc;exports.DataTable=Yo;exports.Drawer=Ws;exports.DrawerClose=Yc;exports.DrawerContent=Zs;exports.DrawerDescription=na;exports.DrawerFooter=ta;exports.DrawerHeader=Qs;exports.DrawerOverlay=gr;exports.DrawerPortal=Js;exports.DrawerTitle=ea;exports.DrawerTrigger=Hc;exports.DropdownMenu=Qt;exports.DropdownMenuCheckboxItem=Ut;exports.DropdownMenuContent=Ht;exports.DropdownMenuGroup=Qn;exports.DropdownMenuItem=Ge;exports.DropdownMenuItemType=Jo;exports.DropdownMenuLabel=De;exports.DropdownMenuPortal=$o;exports.DropdownMenuRadioGroup=Vo;exports.DropdownMenuRadioItem=nr;exports.DropdownMenuSeparator=je;exports.DropdownMenuShortcut=zo;exports.DropdownMenuSub=Fo;exports.DropdownMenuSubContent=er;exports.DropdownMenuSubTrigger=tr;exports.DropdownMenuTrigger=ie;exports.ERROR_DUMP_STRING_KEYS=Xo;exports.ERROR_POPOVER_STRING_KEYS=vl;exports.EditorKeyboardShortcuts=es;exports.ErrorDump=Wo;exports.ErrorPopover=yl;exports.FOOTNOTE_EDITOR_STRING_KEYS=$l;exports.Filter=Cl;exports.FilterDropdown=jl;exports.Footer=_l;exports.FootnoteEditor=Ll;exports.FootnoteItem=ss;exports.FootnoteList=zl;exports.INVENTORY_STRING_KEYS=Zl;exports.Input=Ne;exports.Inventory=ec;exports.Label=it;exports.MARKER_MENU_STRING_KEYS=ns;exports.MarkdownRenderer=bl;exports.MarkerMenu=rs;exports.MoreInfo=Nl;exports.MultiSelectComboBox=Zo;exports.NavigationContentSearch=_c;exports.Popover=ee;exports.PopoverAnchor=oo;exports.PopoverContent=Wt;exports.PopoverTrigger=pe;exports.Progress=ra;exports.RadioGroup=pn;exports.RadioGroupItem=ze;exports.RecentSearches=Wa;exports.ResizableHandle=Jc;exports.ResizablePanel=Wc;exports.ResizablePanelGroup=Xc;exports.ResultsCard=$c;exports.SCOPE_SELECTOR_STRING_KEYS=gc;exports.ScopeSelector=xc;exports.ScriptureResultsViewer=uc;exports.ScrollGroupSelector=bc;exports.SearchBar=gn;exports.Select=xe;exports.SelectContent=ce;exports.SelectGroup=Bo;exports.SelectItem=It;exports.SelectLabel=qo;exports.SelectScrollDownButton=or;exports.SelectScrollUpButton=rr;exports.SelectSeparator=Ko;exports.SelectTrigger=le;exports.SelectValue=be;exports.Separator=ge;exports.SettingsList=vc;exports.SettingsListHeader=jc;exports.SettingsListItem=yc;exports.SettingsSidebar=ys;exports.SettingsSidebarContentSearch=sc;exports.Sidebar=ir;exports.SidebarContent=cr;exports.SidebarFooter=ps;exports.SidebarGroup=sn;exports.SidebarGroupAction=ms;exports.SidebarGroupContent=ln;exports.SidebarGroupLabel=an;exports.SidebarHeader=ds;exports.SidebarInput=ws;exports.SidebarInset=lr;exports.SidebarMenu=wr;exports.SidebarMenuAction=fs;exports.SidebarMenuBadge=hs;exports.SidebarMenuButton=pr;exports.SidebarMenuItem=dr;exports.SidebarMenuSkeleton=gs;exports.SidebarMenuSub=xs;exports.SidebarMenuSubButton=vs;exports.SidebarMenuSubItem=bs;exports.SidebarProvider=ar;exports.SidebarRail=cs;exports.SidebarSeparator=us;exports.SidebarTrigger=ls;exports.Skeleton=on;exports.Slider=oa;exports.Sonner=Zc;exports.Spinner=Ps;exports.Switch=sa;exports.TabDropdownMenu=wn;exports.TabFloatingMenu=kc;exports.TabToolbar=Nc;exports.Table=Ke;exports.TableBody=He;exports.TableCaption=Ho;exports.TableCell=se;exports.TableFooter=Uo;exports.TableHead=Re;exports.TableHeader=Ue;exports.TableRow=Kt;exports.Tabs=Qc;exports.TabsContent=la;exports.TabsList=aa;exports.TabsTrigger=ia;exports.TextField=Fc;exports.Textarea=ca;exports.ToggleGroup=fn;exports.ToggleGroupItem=Ce;exports.Toolbar=Ic;exports.Tooltip=_t;exports.TooltipContent=jt;exports.TooltipProvider=yt;exports.TooltipTrigger=Ct;exports.UNDO_REDO_BUTTONS_STRING_KEYS=Qo;exports.UiLanguageSelector=Ac;exports.UndoRedoButtons=ts;exports.VerticalTabs=mr;exports.VerticalTabsContent=hr;exports.VerticalTabsList=fr;exports.VerticalTabsTrigger=Es;exports.badgeVariants=no;exports.buttonVariants=Vn;exports.cn=h;exports.getBookIdFromUSFM=Jl;exports.getInventoryHeader=Ye;exports.getLinesFromUSFM=Xl;exports.getNumberFromUSFM=Wl;exports.getStatusForItem=as;exports.getToolbarOSReservedSpaceClassName=Dc;exports.inventoryCountColumn=Hl;exports.inventoryItemColumn=Kl;exports.inventoryStatusColumn=Yl;exports.selectTriggerVariants=Go;exports.useEvent=tw;exports.useEventAsync=nw;exports.useListbox=Do;exports.usePromise=wa;exports.useRecentSearches=Ja;exports.useSidebar=Xe;exports.useStylesheet=rw;function ow(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(e)),t==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}ow(`*, ::before, ::after {
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
.tw-grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
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
.tw-bg-accent\\/50 {
  background-color: hsl(var(--accent) / 0.5);
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
.tw-pb-0 {
  padding-bottom: 0px;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
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
.tw-text-\\[10px\\] {
  font-size: 10px;
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
.tw-tracking-wider {
  letter-spacing: 0.05em;
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

  .sm\\:tw-grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
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

  .md\\:tw-grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
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
