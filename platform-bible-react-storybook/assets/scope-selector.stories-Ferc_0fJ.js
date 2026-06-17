import{r as t,j as e}from"./iframe-CLwNfwVl.js";import"./index-BnMb6O87.js";import{S as lt}from"./select-books.component-KLk4wM-W.js";import{B as we}from"./book-chapter-control.component-CdKGZlTP.js";import{B as E}from"./button-CEWq4HXk.js";import{D as qe,b as Fe,c as Ke,d as Ue,f as Ye}from"./dialog-LBlTGWC3.js";import{D as it,a as dt,b as pt,e as K,d as Xe,c as _t}from"./dropdown-menu-C2SzzSM1.js";import{L as T}from"./label-YLy8M-As.js";import{c as be}from"./popover-BmcrnQCT.js";import{R as ut,a as wt}from"./radio-group-B5bh5luO.js";import{c as f}from"./utils-BPbySc-g.js";import{z as se,Y as Ze,Q as bt}from"./scripture-util-CIEEBU92-Dw9itcOy.js";import{C as $e}from"./chevron-down-BitE2dD2.js";import{C as Qe}from"./check-0LIGNcyg.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./badge-BaPh6x8N.js";import"./index-BnuTq2W6.js";import"./index-CcG6yWs3.js";import"./book-item.utils-LAK444qg.js";import"./command-Zn4jb2gh.js";import"./index-Ljh9Q6tN.js";import"./index-DPG_fq1D.js";import"./index-BR9T9iFo.js";import"./index-BknFX5Ak.js";import"./index-CF718w5O.js";import"./index-478GqJmP.js";import"./index-Ysg2h3n1.js";import"./index--ngCVwnt.js";import"./index-CLhbbpDh.js";import"./index-OKweZHoL.js";import"./input-group-DoPKuDWW.js";import"./input-hTUpxUli.js";import"./IconCheck-CAKcSGy2.js";import"./createReactComponent-CevCSTJK.js";import"./select-books-picker.component-BIRp1ebL.js";import"./chevrons-up-down-zEB9_t_u.js";import"./createLucideIcon-_9NXAraM.js";import"./chevron-right-BmOr-VzM.js";import"./arrow-left-BHL8L1Wh.js";import"./arrow-right--1OLjsmY.js";import"./z-index-CoNkaVR8.js";import"./menu.context-CIZdrbLT.js";import"./IconChevronRight-DR4dTSs7.js";import"./index-CMRVfScC.js";import"./index-COpHnQu2.js";import"./index-BX2v2BSb.js";import"./index-BpjmltjB.js";import"./index-rX--jc7r.js";const mt=Object.freeze(["%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]);Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_verse%","%webView_scope_selector_chapter%","%webView_scope_selector_book%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_scope_selector_range%","%webView_scope_selector_select_range%","%webView_scope_selector_range_start%","%webView_scope_selector_range_end%","%webView_scope_selector_ok%","%webView_scope_selector_cancel%","%webView_scope_selector_navigate%",...mt]);const d=(c,n)=>c[n]??n,kt=Object.freeze([" ","-"]);function b({scope:c,availableScopes:n,onScopeChange:l,availableBookInfo:i,selectedBookIds:s,onSelectedBookIdsChange:w,localizedStrings:a,localizedBookNames:k,id:S,variant:m="radio",rangeStart:N,rangeEnd:Ro,onRangeStartChange:h,onRangeEndChange:_,currentScrRef:u,onCurrentScrRefChange:he,bookChapterControlLocalizedStrings:re,getEndVerse:ce,hideLabel:xo=!1,buttonClassName:Eo}){const To=d(a,"%webView_scope_selector_selected_text%"),yo=d(a,"%webView_scope_selector_verse%"),Oo=d(a,"%webView_scope_selector_chapter%"),Ao=d(a,"%webView_scope_selector_book%"),jo=d(a,"%webView_scope_selector_current_verse%"),Mo=d(a,"%webView_scope_selector_current_chapter%"),Do=d(a,"%webView_scope_selector_current_book%"),Se=d(a,"%webView_scope_selector_choose_books%"),Lo=d(a,"%webView_scope_selector_scope%"),Go=d(a,"%webView_scope_selector_select_books%"),Po=d(a,"%webView_scope_selector_range%"),Jo=d(a,"%webView_scope_selector_select_range%"),Ho=d(a,"%webView_scope_selector_range_start%"),Wo=d(a,"%webView_scope_selector_range_end%"),ge=d(a,"%webView_scope_selector_ok%"),fe=d(a,"%webView_scope_selector_cancel%"),qo=d(a,"%webView_scope_selector_navigate%"),ae=o=>{if(!u)return;const r=u.book.toUpperCase();switch(o){case"verse":return Ze(u,"id");case"chapter":return`${r} ${u.chapterNum}`;case"book":return r;default:return}},ze=[{value:"selectedText",label:To,id:"scope-selected-text"},{value:"verse",label:yo,dropdownLabel:jo,scrRefSuffix:ae("verse"),id:"scope-verse"},{value:"chapter",label:Oo,dropdownLabel:Mo,scrRefSuffix:ae("chapter"),id:"scope-chapter"},{value:"book",label:Ao,dropdownLabel:Do,scrRefSuffix:ae("book"),id:"scope-book"},{value:"selectedBooks",label:Se,id:"scope-selected"},{value:"range",label:Po,id:"scope-range"}],ne=(o,r,p=!1)=>e.jsxs(e.Fragment,{children:[o,r&&!p&&e.jsxs("span",{className:"tw:text-muted-foreground",children:[": ",r]})]}),v=n?ze.filter(o=>n.includes(o.value)):ze,Ie=u??se,g=N??Ie,V=Ro??Ie,Fo=()=>{},Ne=t.useRef(null),ve=t.useRef(null),y=t.useRef(!1),Ve=t.useRef(null),Be=t.useRef(!1),[Ce,O]=t.useState(void 0),A=t.useRef(!1),j=t.useRef(!1),Re=t.useRef(null),Ko=t.useCallback(o=>{if(o){O("start"),A.current=!1;return}O(r=>r==="start"?void 0:r),A.current&&(A.current=!1,requestAnimationFrame(()=>{var p;const r=(p=Ne.current)==null?void 0:p.querySelector("button");r==null||r.click()}))},[]),Uo=t.useCallback(o=>{if(o){O("end"),j.current=!1;return}O(r=>r==="end"?void 0:r)},[]),Yo=t.useCallback(o=>{h==null||h(o),_==null||_(o),A.current=!0},[h,_]),Xo=t.useCallback(o=>{_==null||_(o),j.current=!0},[_]),M=t.useCallback(o=>{l(o),o==="selectedBooks"&&s.length===0&&(u!=null&&u.book)&&w([u.book])},[l,s,u,w]),le=v.find(o=>o.value===c),Zo=()=>c==="selectedBooks"&&s.length>0?s.map(o=>o.toUpperCase()).join(", "):c==="range"?bt(g,V,{optionOrLocalizedBookName:"id",endRefOptionOrLocalizedBookName:"id",repeatBookName:!0}):le?ne(le.label,le.scrRefSuffix):c,$o=v.filter(o=>o.value!=="selectedBooks"&&o.value!=="range"),D=v.find(o=>o.value==="selectedBooks"),L=v.find(o=>o.value==="range"),[ie,xe]=t.useState(!1),[G,de]=t.useState(void 0),[B,pe]=t.useState(void 0),[C,Ee]=t.useState(void 0),[P,Te]=t.useState(void 0),[_e,ye]=t.useState([]),Oe=m==="dropdown"&&G==="selectedBooks",Ae=e.jsx(lt,{availableBookInfo:i,selectedBookIds:Oe?_e:s,onChangeSelectedBookIds:Oe?ye:w,localizedStrings:a,localizedBookNames:k}),je=Ce==="end",Me=Ce==="start",J="tw:text-muted-foreground",R=m==="dropdown"&&G==="range",Qo=R?Ee:Yo,et=R?Te:_?Xo:Fo,De=e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:items-end tw:gap-4",children:[e.jsxs("div",{className:"tw:grid tw:gap-2",children:[e.jsx(T,{htmlFor:"scope-range-start",className:f(je&&J),children:Ho}),e.jsx(we,{id:"scope-range-start",scrRef:R?C??g:g,handleSubmit:Qo,localizedBookNames:k,localizedStrings:re,getEndVerse:ce,submitKeys:kt,onOpenChange:Ko,className:f(je&&J),modal:!0})]}),e.jsxs("div",{ref:Ne,className:"tw:grid tw:gap-2",children:[e.jsx(T,{htmlFor:"scope-range-end",className:f(Me&&J),children:Wo}),e.jsx(we,{id:"scope-range-end",scrRef:R?P??V:V,handleSubmit:et,localizedBookNames:k,localizedStrings:re,getEndVerse:ce,disableReferencesUpTo:R?C??g:g,onOpenChange:Uo,onCloseAutoFocus:o=>{var r;j.current&&(j.current=!1,o.preventDefault(),(r=Re.current)==null||r.focus())},className:f(Me&&J),modal:!0,align:"start"})]})]}),Le=t.useRef({}),ue=t.useCallback(o=>r=>{Le.current[o]=r},[]),Ge=t.useRef(null);t.useEffect(()=>{if(!ie)return;let o=0;const r=requestAnimationFrame(()=>{o=requestAnimationFrame(()=>{var p;(p=Le.current[c])==null||p.focus()})});return()=>{cancelAnimationFrame(r),o&&cancelAnimationFrame(o)}},[ie,c]);const[H,ot]=t.useState(null),[W,tt]=t.useState(null),[q,st]=t.useState(null),rt=200,[ct,at]=t.useState(!1);t.useEffect(()=>{if(!q||typeof ResizeObserver>"u")return;const o=new ResizeObserver(([r])=>{at(r.contentRect.width<rt)});return o.observe(q),()=>o.disconnect()},[q]);const Pe=t.useCallback(o=>{pe(o),Ee(g),Te(V),ye(s),xe(!1),de(o)},[g,V,s]),Je=t.useCallback(()=>{B!==void 0&&(B==="range"?(C&&(h==null||h(C)),P&&(_==null||_(P))):B==="selectedBooks"&&w(_e),M(B),de(void 0),pe(void 0))},[B,C,P,_e,h,_,w,M]),F=t.useCallback(o=>{o||(de(void 0),pe(void 0))},[]),He=t.useCallback(o=>{var r;o.preventDefault(),(r=Ge.current)==null||r.focus()},[]),We=o=>c===o?e.jsx("span",{className:"tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2",children:e.jsx(Qe,{className:"tw:h-4 tw:w-4"})}):void 0;return e.jsxs("div",{id:S,className:"tw:grid tw:gap-4",children:[e.jsxs("div",{className:"tw:grid tw:gap-2",children:[!xo&&e.jsx(T,{children:Lo}),m==="dropdown"?e.jsxs(it,{open:ie,onOpenChange:xe,children:[e.jsx(dt,{asChild:!0,children:e.jsxs(E,{ref:Ge,variant:"outline",role:"combobox",className:f("tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",Eo),children:[e.jsx("span",{className:"tw:min-w-0 tw:flex-1 tw:truncate tw:text-start",children:Zo()}),e.jsx($e,{className:"tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50"})]})}),e.jsx(pt,{ref:st,className:"tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",align:"start",children:e.jsxs(be,{container:q,children:[$o.map(({value:o,label:r,dropdownLabel:p,scrRefSuffix:x,id:nt})=>e.jsxs(K,{ref:ue(o),className:"tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",onSelect:()=>M(o),"data-selected":c===o?"true":void 0,children:[c===o&&e.jsx("span",{className:"tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2",children:e.jsx(Qe,{className:"tw:h-4 tw:w-4"})}),ne(p??r,x,ct)]},nt)),(D||L)&&e.jsx(Xe,{}),D&&e.jsxs(K,{ref:ue("selectedBooks"),className:f("tw:relative tw:ps-8","data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"),onSelect:()=>Pe("selectedBooks"),"data-selected":c==="selectedBooks"?"true":void 0,children:[We("selectedBooks"),`${D.label}…`]}),L&&e.jsxs(K,{ref:ue("range"),className:f("tw:relative tw:ps-8","data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"),onSelect:()=>Pe("range"),"data-selected":c==="range"?"true":void 0,children:[We("range"),`${L.label}…`]}),he&&e.jsxs(e.Fragment,{children:[e.jsx(Xe,{}),e.jsx(_t,{className:"tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground",children:qo}),e.jsx(K,{ref:Ve,className:"tw:p-0",onSelect:o=>{var r,p;if(o.preventDefault(),y.current){y.current=!1;return}Be.current||(p=(r=ve.current)==null?void 0:r.querySelector("button"))==null||p.click()},children:e.jsx("div",{ref:ve,className:"tw:w-full tw:px-1 tw:pb-1",onPointerDownCapture:o=>{const r=o.target instanceof HTMLElement?o.target:void 0;r!=null&&r.closest("button")&&(y.current=!0,requestAnimationFrame(()=>{y.current=!1}))},children:e.jsx(we,{id:"scope-navigate",scrRef:u??se,handleSubmit:he,localizedBookNames:k,localizedStrings:re,getEndVerse:ce,triggerVariant:"ghost",onOpenChange:o=>{Be.current=o},onCloseAutoFocus:o=>{var r;o.preventDefault(),(r=Ve.current)==null||r.focus()},modal:!0,className:"tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",triggerContent:e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"tw:min-w-0 tw:flex-1 tw:truncate tw:text-start",children:Ze(u??se,"id")}),e.jsx($e,{className:"tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50"})]})})})})]})]})})]}):e.jsx(ut,{value:c,onValueChange:M,className:"tw:flex tw:flex-col tw:space-y-1",children:v.map(({value:o,label:r,scrRefSuffix:p,id:x})=>e.jsxs("div",{className:"tw:flex tw:items-center",children:[e.jsx(wt,{className:"tw:me-2",value:o,id:x}),e.jsx(T,{htmlFor:x,children:ne(r,p)})]},x))})]}),m==="radio"&&c==="selectedBooks"&&e.jsxs("div",{className:"tw:grid tw:gap-2",children:[e.jsx(T,{children:Go}),Ae]}),m==="radio"&&c==="range"&&De,m==="dropdown"&&D&&e.jsx(qe,{open:G==="selectedBooks",onOpenChange:F,children:e.jsx(Fe,{ref:tt,onCloseAutoFocus:He,onEscapeKeyDown:o=>{W!=null&&W.querySelector('[data-state="open"]')&&o.preventDefault()},children:e.jsxs(be,{container:W,children:[e.jsx(Ke,{className:"tw:pe-8",children:e.jsx(Ue,{children:Se})}),Ae,e.jsxs(Ye,{children:[e.jsx(E,{variant:"outline",onClick:()=>F(!1),children:fe}),e.jsx(E,{onClick:Je,children:ge})]})]})})}),m==="dropdown"&&L&&e.jsx(qe,{open:G==="range",onOpenChange:F,children:e.jsx(Fe,{ref:ot,onCloseAutoFocus:He,onEscapeKeyDown:o=>{H!=null&&H.querySelector('[data-state="open"]')&&o.preventDefault()},children:e.jsxs(be,{container:H,children:[e.jsx(Ke,{className:"tw:pe-8",children:e.jsx(Ue,{children:Jo})}),De,e.jsxs(Ye,{children:[e.jsx(E,{variant:"outline",onClick:()=>F(!1),children:fe}),e.jsx(E,{ref:Re,onClick:Je,children:ge})]})]})})})]})}b.__docgenInfo={description:`A component that allows users to select the scope of their search or operation. Available scopes
are defined in the ScopeWithRange type. When 'selectedBooks' is chosen as the scope, a
SelectBooks component is displayed to allow users to choose specific books. When 'range' is
chosen, two BookChapterControl pickers are displayed for selecting the start and end verse of the
range.`,methods:[],displayName:"ScopeSelector",props:{scope:{required:!0,tsType:{name:"union",raw:"Scope | 'range'",elements:[{name:"union",raw:"'selectedText' | 'verse' | 'chapter' | 'book' | 'selectedBooks'",elements:[{name:"literal",value:"'selectedText'"},{name:"literal",value:"'verse'"},{name:"literal",value:"'chapter'"},{name:"literal",value:"'book'"},{name:"literal",value:"'selectedBooks'"}]},{name:"literal",value:"'range'"}]},description:"The current scope selection"},availableScopes:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"Scope | 'range'",elements:[{name:"union",raw:"'selectedText' | 'verse' | 'chapter' | 'book' | 'selectedBooks'",elements:[{name:"literal",value:"'selectedText'"},{name:"literal",value:"'verse'"},{name:"literal",value:"'chapter'"},{name:"literal",value:"'book'"},{name:"literal",value:"'selectedBooks'"}]},{name:"literal",value:"'range'"}]}],raw:"ScopeWithRange[]"},description:`Optional array of scopes that should be available in the selector. If not provided, all scopes
will be shown as defined in the ScopeWithRange type`},onScopeChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(scope: ScopeWithRange) => void",signature:{arguments:[{type:{name:"union",raw:"Scope | 'range'",elements:[{name:"union",raw:"'selectedText' | 'verse' | 'chapter' | 'book' | 'selectedBooks'",elements:[{name:"literal",value:"'selectedText'"},{name:"literal",value:"'verse'"},{name:"literal",value:"'chapter'"},{name:"literal",value:"'book'"},{name:"literal",value:"'selectedBooks'"}]},{name:"literal",value:"'range'"}]},name:"scope"}],return:{name:"void"}}},description:"Callback function that is executed when the user changes the scope selection"},availableBookInfo:{required:!0,tsType:{name:"string"},description:`Information about available books, formatted as a 123 character long string as defined in a
projects BooksPresent setting`},selectedBookIds:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of currently selected book IDs"},onSelectedBookIdsChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(books: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"books"}],return:{name:"void"}}},description:"Callback function that is executed when the user changes the book selection"},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedInventoryKey in (typeof SCOPE_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof SCOPE_SELECTOR_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:`Object with all localized strings that the component needs to work well across multiple
languages. When using this component with Platform.Bible, you can import
\`SCOPE_SELECTOR_STRING_KEYS\` from this library, pass it in to the Platform's localization hook,
and pass the localized keys that are returned by the hook into this prop.`},localizedBookNames:{required:!1,tsType:{name:"Map",elements:[{name:"string"},{name:"signature",type:"object",raw:"{ localizedId: string; localizedName: string }",signature:{properties:[{key:"localizedId",value:{name:"string",required:!0}},{key:"localizedName",value:{name:"string",required:!0}}]}}],raw:"Map<string, { localizedId: string; localizedName: string }>"},description:`Optional map of localized book IDs/short names and full names. Key is the (English) book ID,
value contains localized versions of the ID and full book name`},id:{required:!1,tsType:{name:"string"},description:"Optional ID that is applied to the root element of this component"},variant:{required:!1,tsType:{name:"union",raw:"'radio' | 'dropdown'",elements:[{name:"literal",value:"'radio'"},{name:"literal",value:"'dropdown'"}]},description:"Controls how the scope options are presented. `'radio'` (default) renders a vertical list of\nradio buttons. `'dropdown'` renders a single Select trigger whose popover contains the\noptions.",defaultValue:{value:"'radio'",computed:!1}},rangeStart:{required:!1,tsType:{name:"SerializedVerseRef"},description:"The start of the verse range. Only used when `scope === 'range'`. Defaults to `defaultScrRef`\n(GEN 1:1) if neither this nor `currentScrRef` is provided."},rangeEnd:{required:!1,tsType:{name:"SerializedVerseRef"},description:"The end of the verse range. Only used when `scope === 'range'`. Every time the user submits a\nnew `rangeStart`, `onRangeEndChange` is also fired with that same reference so the end mirrors\nthe start; the user is free to narrow the end afterward. Defaults to `defaultScrRef` (GEN 1:1)\nif neither this nor `currentScrRef` is provided."},onRangeStartChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(scrRef: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scrRef"}],return:{name:"void"}}},description:"Callback when the range start reference changes. Required to make the range UI functional."},onRangeEndChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(scrRef: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scrRef"}],return:{name:"void"}}},description:"Callback when the range end reference changes. Required to make the range UI functional."},currentScrRef:{required:!1,tsType:{name:"SerializedVerseRef"},description:"Optional current scripture reference. When provided and no explicit `rangeStart` or `rangeEnd`\nis supplied, it is used as the initial value for the range controls."},onCurrentScrRefChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(scrRef: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scrRef"}],return:{name:"void"}}},description:'Optional callback fired when the user picks a new scripture reference from the "Navigate"\nfooter entry at the bottom of the dropdown variant. Provide this alongside `currentScrRef` (and\nusing `variant="dropdown"`) to surface the footer button — a BookChapterControl picker prefixed\nwith a "Navigate" headline and the current reference. Without this callback the footer is not\nrendered.'},bookChapterControlLocalizedStrings:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:`Optional localized strings passed to the range BCV controls. When omitted, the BCV controls
will fall back to their internal defaults.`},getEndVerse:{required:!1,tsType:{name:"signature",type:"function",raw:"(bookId: string, chapterNum: number) => number",signature:{arguments:[{type:{name:"string"},name:"bookId"},{type:{name:"number"},name:"chapterNum"}],return:{name:"number"}}},description:"Optional callback returning the number of verses for a given book and chapter. When provided,\nthe range BCV controls enable verse selection. See `BookChapterControlProps.getEndVerse`."},hideLabel:{required:!1,tsType:{name:"boolean"},description:`When true, suppresses the "Scope" label rendered above the trigger. Useful for compact
placements (e.g. inside a tab toolbar) where the trigger speaks for itself and the extra
vertical space pushes the trigger off-screen.`,defaultValue:{value:"false",computed:!1}},buttonClassName:{required:!1,tsType:{name:"string"},description:"Additional Tailwind classes applied to the trigger button. Use this to control the trigger\nheight in compact contexts (e.g. `'tw:h-8'` to align with other toolbar controls)."}}};const z="1".repeat(123),I=new Map([["GEN",{localizedId:"Gen",localizedName:"Genesis"}],["EXO",{localizedId:"Exo",localizedName:"Exodus"}],["LEV",{localizedId:"Lev",localizedName:"Leviticus"}],["NUM",{localizedId:"Num",localizedName:"Numbers"}],["DEU",{localizedId:"Deu",localizedName:"Deuteronomy"}],["MAT",{localizedId:"Mat",localizedName:"Matthew"}],["MRK",{localizedId:"Mrk",localizedName:"Mark"}],["LUK",{localizedId:"Luk",localizedName:"Luke"}],["JHN",{localizedId:"Jhn",localizedName:"John"}],["ROM",{localizedId:"Rom",localizedName:"Romans"}]]),hs={title:"Advanced/Scope Selector",component:b,tags:["autodocs"],argTypes:{variant:{control:{type:"radio"},options:["radio","dropdown"],description:"Visual layout of the scope options."}},decorators:[c=>e.jsx("div",{className:"tw:max-w-md tw:p-4",children:e.jsx(c,{})})]},U={render:()=>{const[c,n]=t.useState("book"),[l,i]=t.useState(["GEN","MAT"]);return e.jsx(b,{scope:c,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector set to book scope with book selection capabilities."}}}},Y={render:()=>{const[c,n]=t.useState("chapter"),[l,i]=t.useState([]);return e.jsx(b,{scope:c,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector set to chapter scope."}}}},X={render:()=>{const[c,n]=t.useState("verse"),[l,i]=t.useState([]);return e.jsx(b,{scope:c,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector set to verse scope."}}}},me={"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_selected_text%":"Selected text","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_scope_selector_range%":"Range","%webView_scope_selector_select_range%":"Select a range","%webView_scope_selector_range_start%":"From","%webView_scope_selector_range_end%":"To","%webView_scope_selector_ok%":"OK","%webView_scope_selector_navigate%":"Change current reference","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found","%webView_book_selector_more%":"more"},ht={GEN:{1:31,2:25,3:24},MAT:{1:25,5:48},JHN:{3:36},REV:{22:21}};function ke(c,n){var l;return((l=ht[c])==null?void 0:l[n])??30}const Z={render:()=>{const[c,n]=t.useState("chapter"),[l,i]=t.useState([]),[s,w]=t.useState({book:"MAT",chapterNum:5,verseNum:3});return e.jsx(b,{variant:"dropdown",scope:c,availableBookInfo:z,selectedBookIds:l,onScopeChange:a=>n(a),onSelectedBookIdsChange:a=>i(a),localizedStrings:me,localizedBookNames:I,currentScrRef:s,onCurrentScrRefChange:w,getEndVerse:ke})},parameters:{docs:{description:{story:'Scope selector rendered as a dropdown instead of radio buttons. Use `variant="dropdown"` when screen space is tight.'}}}},$={render:()=>{const[c,n]=t.useState("range"),[l,i]=t.useState([]),[s,w]=t.useState(se),[a,k]=t.useState({book:"GEN",chapterNum:3,verseNum:24});return e.jsx(b,{scope:c,availableBookInfo:z,selectedBookIds:l,onScopeChange:S=>n(S),onSelectedBookIdsChange:S=>i(S),localizedStrings:me,localizedBookNames:I,rangeStart:s,rangeEnd:a,onRangeStartChange:w,onRangeEndChange:k,getEndVerse:ke})},parameters:{docs:{description:{story:"Range scope renders two BookChapterControl pickers so the user can pick the first and last verse. When `getEndVerse` is provided, the BCV controls also allow verse selection."}}}},Q={render:()=>{const[c,n]=t.useState("range"),[l,i]=t.useState([]),[s,w]=t.useState(void 0),[a,k]=t.useState(void 0),[S,m]=t.useState({book:"MAT",chapterNum:5,verseNum:3});return e.jsx(b,{variant:"dropdown",scope:c,availableBookInfo:z,selectedBookIds:l,onScopeChange:N=>n(N),onSelectedBookIdsChange:N=>i(N),localizedStrings:me,localizedBookNames:I,currentScrRef:S,onCurrentScrRefChange:m,rangeStart:s,rangeEnd:a,onRangeStartChange:w,onRangeEndChange:k,getEndVerse:ke})},parameters:{docs:{description:{story:"Combines the dropdown variant with the range scope."}}}},ee={render:()=>{const[c,n]=t.useState("selectedBooks"),[l,i]=t.useState(["GEN","EXO","MAT","JHN"]);return e.jsx(b,{scope:c,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector with selected books scope showing book selection interface."}}}},St=new Map([["GEN",{localizedId:"GÉN",localizedName:"Génesis"}],["EXO",{localizedId:"ÉXO",localizedName:"Éxodo"}],["LEV",{localizedId:"LEV",localizedName:"Levítico"}],["NUM",{localizedId:"NÚM",localizedName:"Números"}],["DEU",{localizedId:"DEU",localizedName:"Deuteronomio"}],["JOS",{localizedId:"JOS",localizedName:"Josué"}],["JDG",{localizedId:"JUE",localizedName:"Jueces"}],["RUT",{localizedId:"RUT",localizedName:"Rut"}],["1SA",{localizedId:"1SA",localizedName:"1 Samuel"}],["2SA",{localizedId:"2SA",localizedName:"2 Samuel"}],["1KI",{localizedId:"1RE",localizedName:"1 Reyes"}],["2KI",{localizedId:"2RE",localizedName:"2 Reyes"}],["1CH",{localizedId:"1CR",localizedName:"1 Crónicas"}],["2CH",{localizedId:"2CR",localizedName:"2 Crónicas"}],["EZR",{localizedId:"ESD",localizedName:"Esdras"}],["NEH",{localizedId:"NEH",localizedName:"Nehemías"}],["EST",{localizedId:"EST",localizedName:"Ester"}],["JOB",{localizedId:"JOB",localizedName:"Job"}],["PSA",{localizedId:"SAL",localizedName:"Salmos"}],["PRO",{localizedId:"PRO",localizedName:"Proverbios"}],["ECC",{localizedId:"ECL",localizedName:"Eclesiastés"}],["SNG",{localizedId:"CNT",localizedName:"Cantares"}],["ISA",{localizedId:"ISA",localizedName:"Isaías"}],["JER",{localizedId:"JER",localizedName:"Jeremías"}],["LAM",{localizedId:"LAM",localizedName:"Lamentaciones"}],["EZK",{localizedId:"EZE",localizedName:"Ezequiel"}],["DAN",{localizedId:"DAN",localizedName:"Daniel"}],["HOS",{localizedId:"OSE",localizedName:"Oseas"}],["JOL",{localizedId:"JOE",localizedName:"Joel"}],["AMO",{localizedId:"AMÓ",localizedName:"Amós"}],["OBA",{localizedId:"ABD",localizedName:"Abdías"}],["JON",{localizedId:"JON",localizedName:"Jonás"}],["MIC",{localizedId:"MIQ",localizedName:"Miqueas"}],["NAM",{localizedId:"NAH",localizedName:"Nahúm"}],["HAB",{localizedId:"HAB",localizedName:"Habacuc"}],["ZEP",{localizedId:"SOF",localizedName:"Sofonías"}],["HAG",{localizedId:"HAG",localizedName:"Hageo"}],["ZEC",{localizedId:"ZAC",localizedName:"Zacarías"}],["MAL",{localizedId:"MAL",localizedName:"Malaquías"}],["MAT",{localizedId:"MAT",localizedName:"Mateo"}],["MRK",{localizedId:"MAR",localizedName:"Marcos"}],["LUK",{localizedId:"LUC",localizedName:"Lucas"}],["JHN",{localizedId:"JUA",localizedName:"Juan"}],["ACT",{localizedId:"HEC",localizedName:"Hechos"}],["ROM",{localizedId:"ROM",localizedName:"Romanos"}],["1CO",{localizedId:"1CO",localizedName:"1 Corintios"}],["2CO",{localizedId:"2CO",localizedName:"2 Corintios"}],["GAL",{localizedId:"GÁL",localizedName:"Gálatas"}],["EPH",{localizedId:"EFE",localizedName:"Efesios"}],["PHP",{localizedId:"FIL",localizedName:"Filipenses"}],["COL",{localizedId:"COL",localizedName:"Colosenses"}],["1TH",{localizedId:"1TE",localizedName:"1 Tesalonicenses"}],["2TH",{localizedId:"2TE",localizedName:"2 Tesalonicenses"}],["1TI",{localizedId:"1TI",localizedName:"1 Timoteo"}],["2TI",{localizedId:"2TI",localizedName:"2 Timoteo"}],["TIT",{localizedId:"TIT",localizedName:"Tito"}],["PHM",{localizedId:"FLM",localizedName:"Filemón"}],["HEB",{localizedId:"HEB",localizedName:"Hebreos"}],["JAS",{localizedId:"STG",localizedName:"Santiago"}],["1PE",{localizedId:"1PE",localizedName:"1 Pedro"}],["2PE",{localizedId:"2PE",localizedName:"2 Pedro"}],["1JN",{localizedId:"1JN",localizedName:"1 Juan"}],["2JN",{localizedId:"2JN",localizedName:"2 Juan"}],["3JN",{localizedId:"3JN",localizedName:"3 Juan"}],["JUD",{localizedId:"JUD",localizedName:"Judas"}],["REV",{localizedId:"APO",localizedName:"Apocalipsis"}]]),gt=new Map([["GEN",{localizedId:"1MO",localizedName:"1. Mose"}],["EXO",{localizedId:"2MO",localizedName:"2. Mose"}],["LEV",{localizedId:"3MO",localizedName:"3. Mose"}],["NUM",{localizedId:"4MO",localizedName:"4. Mose"}],["DEU",{localizedId:"5MO",localizedName:"5. Mose"}],["PSA",{localizedId:"PS",localizedName:"Psalmen"}],["MAT",{localizedId:"MT",localizedName:"Matthäus"}],["MRK",{localizedId:"MK",localizedName:"Markus"}],["LUK",{localizedId:"LK",localizedName:"Lukas"}],["JHN",{localizedId:"JOH",localizedName:"Johannes"}],["ACT",{localizedId:"APG",localizedName:"Apostelgeschichte"}],["ROM",{localizedId:"RÖM",localizedName:"Römer"}],["1CO",{localizedId:"1KOR",localizedName:"1. Korinther"}],["2CO",{localizedId:"2KOR",localizedName:"2. Korinther"}],["GAL",{localizedId:"GAL",localizedName:"Galater"}],["EPH",{localizedId:"EPH",localizedName:"Epheser"}],["PHP",{localizedId:"PHIL",localizedName:"Philipper"}],["REV",{localizedId:"OFFB",localizedName:"Offenbarung"}]]),Co="100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",oe={render:()=>{const[c,n]=t.useState("selectedBooks"),[l,i]=t.useState(["GEN","PSA","MAT","JHN","REV"]);return e.jsx(b,{scope:c,availableBookInfo:Co,availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:St})},parameters:{docs:{description:{story:`
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents.
        `}}}},te={render:()=>{const[c,n]=t.useState("selectedBooks"),[l,i]=t.useState(["GEN","PSA","MAT","JHN","REV"]);return e.jsx(b,{scope:c,availableBookInfo:Co,availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:gt})},parameters:{docs:{description:{story:`
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns.
        `}}}};var eo,oo,to;U.parameters={...U.parameters,docs:{...(eo=U.parameters)==null?void 0:eo.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('book');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'MAT']);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_book%': 'Book',
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_chapter%': 'Chapter',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
      '%webView_scope_selector_verse%': 'Verse',
      '%webView_scope_selector_current_verse%': 'Current verse',
      '%webView_scope_selector_scope%': 'Scope',
      '%webView_scope_selector_choose_books%': 'Choose specific books',
      '%webView_book_selector_books_selected%': 'books selected',
      '%webView_book_selector_select_books%': 'Select books'
    }} localizedBookNames={mockLocalizedBookNames} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to book scope with book selection capabilities.'
      }
    }
  }
}`,...(to=(oo=U.parameters)==null?void 0:oo.docs)==null?void 0:to.source}}};var so,ro,co;Y.parameters={...Y.parameters,docs:{...(so=Y.parameters)==null?void 0:so.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_book%': 'Book',
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_chapter%': 'Chapter',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
      '%webView_scope_selector_verse%': 'Verse',
      '%webView_scope_selector_current_verse%': 'Current verse',
      '%webView_scope_selector_scope%': 'Scope',
      '%webView_scope_selector_choose_books%': 'Choose specific books'
    }} localizedBookNames={mockLocalizedBookNames} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to chapter scope.'
      }
    }
  }
}`,...(co=(ro=Y.parameters)==null?void 0:ro.docs)==null?void 0:co.source}}};var ao,no,lo;X.parameters={...X.parameters,docs:{...(ao=X.parameters)==null?void 0:ao.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('verse');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_book%': 'Book',
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_chapter%': 'Chapter',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
      '%webView_scope_selector_verse%': 'Verse',
      '%webView_scope_selector_current_verse%': 'Current verse',
      '%webView_scope_selector_scope%': 'Scope',
      '%webView_scope_selector_choose_books%': 'Choose specific books'
    }} localizedBookNames={mockLocalizedBookNames} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to verse scope.'
      }
    }
  }
}`,...(lo=(no=X.parameters)==null?void 0:no.docs)==null?void 0:lo.source}}};var io,po,_o;Z.parameters={...Z.parameters,docs:{...(io=Z.parameters)==null?void 0:io.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const [currentScrRef, setCurrentScrRef] = useState<SerializedVerseRef>({
      book: 'MAT',
      chapterNum: 5,
      verseNum: 3
    });
    return <ScopeSelector variant="dropdown" scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => setScope(newScope)} onSelectedBookIdsChange={(bookIds: string[]) => setSelectedBookIds(bookIds)} localizedStrings={rangeLocalizedStrings} localizedBookNames={mockLocalizedBookNames} currentScrRef={currentScrRef} onCurrentScrRefChange={setCurrentScrRef} getEndVerse={sampleGetEndVerse} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector rendered as a dropdown instead of radio buttons. Use \`variant="dropdown"\` when screen space is tight.'
      }
    }
  }
}`,...(_o=(po=Z.parameters)==null?void 0:po.docs)==null?void 0:_o.source}}};var uo,wo,bo;$.parameters={...$.parameters,docs:{...(uo=$.parameters)==null?void 0:uo.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('range');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const [rangeStart, setRangeStart] = useState<SerializedVerseRef>(defaultScrRef);
    const [rangeEnd, setRangeEnd] = useState<SerializedVerseRef>({
      book: 'GEN',
      chapterNum: 3,
      verseNum: 24
    });
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => setScope(newScope)} onSelectedBookIdsChange={(bookIds: string[]) => setSelectedBookIds(bookIds)} localizedStrings={rangeLocalizedStrings} localizedBookNames={mockLocalizedBookNames} rangeStart={rangeStart} rangeEnd={rangeEnd} onRangeStartChange={setRangeStart} onRangeEndChange={setRangeEnd} getEndVerse={sampleGetEndVerse} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Range scope renders two BookChapterControl pickers so the user can pick the first and last verse. When \`getEndVerse\` is provided, the BCV controls also allow verse selection.'
      }
    }
  }
}`,...(bo=(wo=$.parameters)==null?void 0:wo.docs)==null?void 0:bo.source}}};var mo,ko,ho;Q.parameters={...Q.parameters,docs:{...(mo=Q.parameters)==null?void 0:mo.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('range');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const [rangeStart, setRangeStart] = useState<SerializedVerseRef | undefined>(undefined);
    const [rangeEnd, setRangeEnd] = useState<SerializedVerseRef | undefined>(undefined);
    const [currentScrRef, setCurrentScrRef] = useState<SerializedVerseRef>({
      book: 'MAT',
      chapterNum: 5,
      verseNum: 3
    });
    return <ScopeSelector variant="dropdown" scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => setScope(newScope)} onSelectedBookIdsChange={(bookIds: string[]) => setSelectedBookIds(bookIds)} localizedStrings={rangeLocalizedStrings} localizedBookNames={mockLocalizedBookNames} currentScrRef={currentScrRef} onCurrentScrRefChange={setCurrentScrRef} rangeStart={rangeStart} rangeEnd={rangeEnd} onRangeStartChange={setRangeStart} onRangeEndChange={setRangeEnd} getEndVerse={sampleGetEndVerse} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Combines the dropdown variant with the range scope.'
      }
    }
  }
}`,...(ho=(ko=Q.parameters)==null?void 0:ko.docs)==null?void 0:ho.source}}};var So,go,fo;ee.parameters={...ee.parameters,docs:{...(So=ee.parameters)==null?void 0:So.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'EXO', 'MAT', 'JHN']);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_book%': 'Book',
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_chapter%': 'Chapter',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
      '%webView_scope_selector_verse%': 'Verse',
      '%webView_scope_selector_current_verse%': 'Current verse',
      '%webView_scope_selector_scope%': 'Scope',
      '%webView_scope_selector_choose_books%': 'Choose specific books',
      '%webView_book_selector_books_selected%': 'books selected',
      '%webView_book_selector_select_books%': 'Select books',
      '%webView_book_selector_search_books%': 'Search books',
      '%webView_book_selector_select_all%': 'Select all',
      '%webView_book_selector_clear_all%': 'Clear all'
    }} localizedBookNames={mockLocalizedBookNames} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector with selected books scope showing book selection interface.'
      }
    }
  }
}`,...(fo=(go=ee.parameters)==null?void 0:go.docs)==null?void 0:fo.source}}};var zo,Io,No;oe.parameters={...oe.parameters,docs:{...(zo=oe.parameters)==null?void 0:zo.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'PSA', 'MAT', 'JHN', 'REV']);
    return <ScopeSelector scope={scope} availableBookInfo={fullProjectAvailableBookInfo} availableScopes={['selectedText', 'chapter', 'book', 'selectedBooks']} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_book%': 'Book',
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_chapter%': 'Chapter',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
      '%webView_scope_selector_scope%': 'Scope',
      '%webView_scope_selector_choose_books%': 'Choose specific books',
      '%webView_book_selector_books_selected%': 'books selected',
      '%webView_book_selector_select_books%': 'Select books',
      '%webView_book_selector_search_books%': 'Search books',
      '%webView_book_selector_select_all%': 'Select all',
      '%webView_book_selector_clear_all%': 'Clear all'
    }} localizedBookNames={spanishBookNames} />;
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \\\`localizedBookNames\\\` prop, which maps English book IDs to their localized equivalents.
        \`
      }
    }
  }
}`,...(No=(Io=oe.parameters)==null?void 0:Io.docs)==null?void 0:No.source}}};var vo,Vo,Bo;te.parameters={...te.parameters,docs:{...(vo=te.parameters)==null?void 0:vo.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'PSA', 'MAT', 'JHN', 'REV']);
    return <ScopeSelector scope={scope} availableBookInfo={fullProjectAvailableBookInfo} availableScopes={['selectedText', 'chapter', 'book', 'selectedBooks']} selectedBookIds={selectedBookIds} onScopeChange={(newScope: ScopeWithRange) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_book%': 'Book',
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_chapter%': 'Chapter',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
      '%webView_scope_selector_scope%': 'Scope',
      '%webView_scope_selector_choose_books%': 'Choose specific books',
      '%webView_book_selector_books_selected%': 'books selected',
      '%webView_book_selector_select_books%': 'Select books',
      '%webView_book_selector_search_books%': 'Search books',
      '%webView_book_selector_select_all%': 'Select all',
      '%webView_book_selector_clear_all%': 'Clear all'
    }} localizedBookNames={germanBookNames} />;
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns.
        \`
      }
    }
  }
}`,...(Bo=(Vo=te.parameters)==null?void 0:Vo.docs)==null?void 0:Bo.source}}};const Ss=["BookScope","ChapterScope","VerseScope","DropdownVariant","RangeScope","DropdownVariantWithRange","SelectedBooksScope","WithLocalizedSpanishBookNames","WithLocalizedGermanBookNames"];export{U as BookScope,Y as ChapterScope,Z as DropdownVariant,Q as DropdownVariantWithRange,$ as RangeScope,ee as SelectedBooksScope,X as VerseScope,te as WithLocalizedGermanBookNames,oe as WithLocalizedSpanishBookNames,Ss as __namedExportsOrder,hs as default};
