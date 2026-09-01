import{r as t,j as e}from"./iframe-B-wbwbin.js";import"./index-DWoQdr4d.js";import{S as it}from"./select-books.component-CwwFRM0l.js";import{B as we}from"./book-chapter-control.component-D9D1CzqE.js";import{B as x}from"./button-8-24dQ6Q.js";import{D as qe,b as Fe,c as Ke,d as Ue,f as Xe}from"./dialog-ClyRqPiC.js";import{D as dt,a as pt,b as _t,e as F,d as Ye,c as ut}from"./dropdown-menu-CCeibXjQ.js";import{L as E}from"./label-CAjW0fWK.js";import{d as be}from"./popover-yBn5v79-.js";import{R as wt,a as bt}from"./radio-group-B7hvf-_8.js";import{c as f}from"./utils-BPbySc-g.js";import{j as te,o as Ze,n as mt}from"./scripture-util-CUueoNBU-BtWINhWV.js";import{C as $e}from"./chevron-down-fRxdt_0q.js";import{C as Qe}from"./check-CBE64NRy.js";import"./preload-helper-CTOgD26E.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./badge-CdxdIe1K.js";import"./index-BnuTq2W6.js";import"./index-DlZpfVmH.js";import"./book-item.utils-BkJX0Xoo.js";import"./command-Cj_8dAz_.js";import"./index-CyDJfQBn.js";import"./index-B1fExnXD.js";import"./index-0d9zFQCb.js";import"./index-CnVK_juB.js";import"./index-C0hwpg07.js";import"./index-CjS56BLF.js";import"./index-DD8fYc4k.js";import"./index-jtCaO0Wu.js";import"./index-BY7-fAIz.js";import"./index-v-L2syWD.js";import"./input-group-Bwk2Kkhd.js";import"./input-DoM4oxw2.js";import"./IconCheck-C34uq8b6.js";import"./createReactComponent-f3CqHfFf.js";import"./index.es-LuWhpyxP.js";import"./select-books-picker.component-D5MQZdWa.js";import"./chevrons-up-down-cFa-pelR.js";import"./createLucideIcon-CnbuA9fl.js";import"./tooltip-CNq9hOiU.js";import"./z-index-bJLdNcga.js";import"./index-DeZzWBkR.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-D3aII-dT.js";import"./index-CysVnWkb.js";import"./shrink-step.context-Dd2AUigd.js";import"./toolbar-compound-label.component-C78EH8Gz.js";import"./use-truncation-tooltip.hook-C_pkwVuI.js";import"./experimental-s1zzGzcT.js";import"./chevron-right-DT6759gU.js";import"./IconSelector-CzE_S1GN.js";import"./arrow-left-ByZpIsm0.js";import"./arrow-right-DiFtBSNK.js";import"./menu.context-CCTZD5Su.js";import"./IconChevronRight-uTiG-TGS.js";import"./index-CrW9EUz_.js";import"./index-Cdn-eKCx.js";import"./index-C8PlMtfo.js";const kt=Object.freeze(["%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]);Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_verse%","%webView_scope_selector_chapter%","%webView_scope_selector_book%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_scope_selector_range%","%webView_scope_selector_select_range%","%webView_scope_selector_range_start%","%webView_scope_selector_range_end%","%webView_scope_selector_ok%","%webView_scope_selector_cancel%","%webView_scope_selector_navigate%",...kt]);const d=(a,n)=>a[n]??n,ht=Object.freeze([" ","-"]);function m({scope:a,availableScopes:n,onScopeChange:l,availableBookInfo:i,selectedBookIds:s,onSelectedBookIdsChange:w,localizedStrings:c,localizedBookNames:k,disabledSectionExplanations:S,id:se,variant:b="radio",rangeStart:Ro,rangeEnd:xo,onRangeStartChange:h,onRangeEndChange:_,currentScrRef:u,onCurrentScrRefChange:he,bookChapterControlLocalizedStrings:re,getEndVerse:ae,hideLabel:Eo=!1,buttonClassName:To}){const yo=d(c,"%webView_scope_selector_selected_text%"),Oo=d(c,"%webView_scope_selector_verse%"),Ao=d(c,"%webView_scope_selector_chapter%"),jo=d(c,"%webView_scope_selector_book%"),Mo=d(c,"%webView_scope_selector_current_verse%"),Do=d(c,"%webView_scope_selector_current_chapter%"),Lo=d(c,"%webView_scope_selector_current_book%"),Se=d(c,"%webView_scope_selector_choose_books%"),Go=d(c,"%webView_scope_selector_scope%"),Po=d(c,"%webView_scope_selector_select_books%"),Jo=d(c,"%webView_scope_selector_range%"),Ho=d(c,"%webView_scope_selector_select_range%"),Wo=d(c,"%webView_scope_selector_range_start%"),qo=d(c,"%webView_scope_selector_range_end%"),ge=d(c,"%webView_scope_selector_ok%"),fe=d(c,"%webView_scope_selector_cancel%"),Fo=d(c,"%webView_scope_selector_navigate%"),ce=o=>{if(!u)return;const r=u.book.toUpperCase();switch(o){case"verse":return Ze(u,"id");case"chapter":return`${r} ${u.chapterNum}`;case"book":return r;default:return}},ze=[{value:"selectedText",label:yo,id:"scope-selected-text"},{value:"verse",label:Oo,dropdownLabel:Mo,scrRefSuffix:ce("verse"),id:"scope-verse"},{value:"chapter",label:Ao,dropdownLabel:Do,scrRefSuffix:ce("chapter"),id:"scope-chapter"},{value:"book",label:jo,dropdownLabel:Lo,scrRefSuffix:ce("book"),id:"scope-book"},{value:"selectedBooks",label:Se,id:"scope-selected"},{value:"range",label:Jo,id:"scope-range"}],ne=(o,r,p=!1)=>e.jsxs(e.Fragment,{children:[o,r&&!p&&e.jsxs("span",{className:"tw:text-muted-foreground",children:[": ",r]})]}),N=n?ze.filter(o=>n.includes(o.value)):ze,Ie=u??te,g=Ro??Ie,v=xo??Ie,Ko=()=>{},Ne=t.useRef(null),ve=t.useRef(null),T=t.useRef(!1),Ve=t.useRef(null),Be=t.useRef(!1),[Ce,y]=t.useState(void 0),O=t.useRef(!1),A=t.useRef(!1),Re=t.useRef(null),Uo=t.useCallback(o=>{if(o){y("start"),O.current=!1;return}y(r=>r==="start"?void 0:r),O.current&&(O.current=!1,requestAnimationFrame(()=>{var p;const r=(p=Ne.current)==null?void 0:p.querySelector("button");r==null||r.click()}))},[]),Xo=t.useCallback(o=>{if(o){y("end"),A.current=!1;return}y(r=>r==="end"?void 0:r)},[]),Yo=t.useCallback(o=>{h==null||h(o),_==null||_(o),O.current=!0},[h,_]),Zo=t.useCallback(o=>{_==null||_(o),A.current=!0},[_]),j=t.useCallback(o=>{l(o),o==="selectedBooks"&&s.length===0&&(u!=null&&u.book)&&w([u.book])},[l,s,u,w]),le=N.find(o=>o.value===a),$o=()=>a==="selectedBooks"&&s.length>0?s.map(o=>o.toUpperCase()).join(", "):a==="range"?mt(g,v,{optionOrLocalizedBookName:"id",endRefOptionOrLocalizedBookName:"id",repeatBookName:!0}):le?ne(le.label,le.scrRefSuffix):a,Qo=N.filter(o=>o.value!=="selectedBooks"&&o.value!=="range"),M=N.find(o=>o.value==="selectedBooks"),D=N.find(o=>o.value==="range"),[ie,xe]=t.useState(!1),[L,de]=t.useState(void 0),[V,pe]=t.useState(void 0),[B,Ee]=t.useState(void 0),[G,Te]=t.useState(void 0),[_e,ye]=t.useState([]),Oe=b==="dropdown"&&L==="selectedBooks",Ae=e.jsx(it,{availableBookInfo:i,selectedBookIds:Oe?_e:s,onChangeSelectedBookIds:Oe?ye:w,localizedStrings:c,localizedBookNames:k,disabledSectionExplanations:S}),je=Ce==="end",Me=Ce==="start",P="tw:text-muted-foreground",C=b==="dropdown"&&L==="range",et=C?Ee:Yo,ot=C?Te:_?Zo:Ko,De=e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:items-end tw:gap-4",children:[e.jsxs("div",{className:"tw:grid tw:gap-2",children:[e.jsx(E,{htmlFor:"scope-range-start",className:f(je&&P),children:Wo}),e.jsx(we,{id:"scope-range-start",scrRef:C?B??g:g,handleSubmit:et,localizedBookNames:k,localizedStrings:re,getEndVerse:ae,submitKeys:ht,onOpenChange:Uo,className:f(je&&P),modal:!0})]}),e.jsxs("div",{ref:Ne,className:"tw:grid tw:gap-2",children:[e.jsx(E,{htmlFor:"scope-range-end",className:f(Me&&P),children:qo}),e.jsx(we,{id:"scope-range-end",scrRef:C?G??v:v,handleSubmit:ot,localizedBookNames:k,localizedStrings:re,getEndVerse:ae,disableReferencesUpTo:C?B??g:g,onOpenChange:Xo,onCloseAutoFocus:o=>{var r;A.current&&(A.current=!1,o.preventDefault(),(r=Re.current)==null||r.focus())},className:f(Me&&P),modal:!0,align:"start"})]})]}),Le=t.useRef({}),ue=t.useCallback(o=>r=>{Le.current[o]=r},[]),Ge=t.useRef(null);t.useEffect(()=>{if(!ie)return;let o=0;const r=requestAnimationFrame(()=>{o=requestAnimationFrame(()=>{var p;(p=Le.current[a])==null||p.focus()})});return()=>{cancelAnimationFrame(r),o&&cancelAnimationFrame(o)}},[ie,a]);const[J,tt]=t.useState(null),[H,st]=t.useState(null),[W,rt]=t.useState(null),at=200,[ct,nt]=t.useState(!1);t.useEffect(()=>{if(!W||typeof ResizeObserver>"u")return;const o=new ResizeObserver(([r])=>{nt(r.contentRect.width<at)});return o.observe(W),()=>o.disconnect()},[W]);const Pe=t.useCallback(o=>{pe(o),Ee(g),Te(v),ye(s),xe(!1),de(o)},[g,v,s]),Je=t.useCallback(()=>{V!==void 0&&(V==="range"?(B&&(h==null||h(B)),G&&(_==null||_(G))):V==="selectedBooks"&&w(_e),j(V),de(void 0),pe(void 0))},[V,B,G,_e,h,_,w,j]),q=t.useCallback(o=>{o||(de(void 0),pe(void 0))},[]),He=t.useCallback(o=>{var r;o.preventDefault(),(r=Ge.current)==null||r.focus()},[]),We=o=>a===o?e.jsx("span",{className:"tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2",children:e.jsx(Qe,{className:"tw:h-4 tw:w-4"})}):void 0;return e.jsxs("div",{id:se,className:"tw:grid tw:gap-4",children:[e.jsxs("div",{className:"tw:grid tw:gap-2",children:[!Eo&&e.jsx(E,{children:Go}),b==="dropdown"?e.jsxs(dt,{open:ie,onOpenChange:xe,children:[e.jsx(pt,{asChild:!0,children:e.jsxs(x,{ref:Ge,variant:"outline",role:"combobox",className:f("tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",To),children:[e.jsx("span",{className:"tw:min-w-0 tw:flex-1 tw:truncate tw:text-start",children:$o()}),e.jsx($e,{className:"tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50"})]})}),e.jsx(_t,{ref:rt,className:"tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",align:"start",children:e.jsxs(be,{container:W,children:[Qo.map(({value:o,label:r,dropdownLabel:p,scrRefSuffix:R,id:lt})=>e.jsxs(F,{ref:ue(o),className:"tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",onSelect:()=>j(o),"data-selected":a===o?"true":void 0,children:[a===o&&e.jsx("span",{className:"tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2",children:e.jsx(Qe,{className:"tw:h-4 tw:w-4"})}),ne(p??r,R,ct)]},lt)),(M||D)&&e.jsx(Ye,{}),M&&e.jsxs(F,{ref:ue("selectedBooks"),className:f("tw:relative tw:ps-8","data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"),onSelect:()=>Pe("selectedBooks"),"data-selected":a==="selectedBooks"?"true":void 0,children:[We("selectedBooks"),`${M.label}…`]}),D&&e.jsxs(F,{ref:ue("range"),className:f("tw:relative tw:ps-8","data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"),onSelect:()=>Pe("range"),"data-selected":a==="range"?"true":void 0,children:[We("range"),`${D.label}…`]}),he&&e.jsxs(e.Fragment,{children:[e.jsx(Ye,{}),e.jsx(ut,{className:"tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground",children:Fo}),e.jsx(F,{ref:Ve,className:"tw:p-0",onSelect:o=>{var r,p;if(o.preventDefault(),T.current){T.current=!1;return}Be.current||(p=(r=ve.current)==null?void 0:r.querySelector("button"))==null||p.click()},children:e.jsx("div",{ref:ve,className:"tw:w-full tw:px-1 tw:pb-1",onPointerDownCapture:o=>{const r=o.target instanceof HTMLElement?o.target:void 0;r!=null&&r.closest("button")&&(T.current=!0,requestAnimationFrame(()=>{T.current=!1}))},children:e.jsx(we,{id:"scope-navigate",scrRef:u??te,handleSubmit:he,localizedBookNames:k,localizedStrings:re,getEndVerse:ae,triggerVariant:"ghost",onOpenChange:o=>{Be.current=o},onCloseAutoFocus:o=>{var r;o.preventDefault(),(r=Ve.current)==null||r.focus()},modal:!0,className:"tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",triggerContent:e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"tw:min-w-0 tw:flex-1 tw:truncate tw:text-start",children:Ze(u??te,"id")}),e.jsx($e,{className:"tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50"})]})})})})]})]})})]}):e.jsx(wt,{value:a,onValueChange:j,className:"tw:flex tw:flex-col tw:space-y-1",children:N.map(({value:o,label:r,scrRefSuffix:p,id:R})=>e.jsxs("div",{className:"tw:flex tw:items-center",children:[e.jsx(bt,{className:"tw:me-2",value:o,id:R}),e.jsx(E,{htmlFor:R,children:ne(r,p)})]},R))})]}),b==="radio"&&a==="selectedBooks"&&e.jsxs("div",{className:"tw:grid tw:gap-2",children:[e.jsx(E,{children:Po}),Ae]}),b==="radio"&&a==="range"&&De,b==="dropdown"&&M&&e.jsx(qe,{open:L==="selectedBooks",onOpenChange:q,children:e.jsx(Fe,{ref:st,onCloseAutoFocus:He,onEscapeKeyDown:o=>{H!=null&&H.querySelector('[data-state="open"]')&&o.preventDefault()},children:e.jsxs(be,{container:H,children:[e.jsx(Ke,{className:"tw:pe-8",children:e.jsx(Ue,{children:Se})}),Ae,e.jsxs(Xe,{children:[e.jsx(x,{variant:"outline",onClick:()=>q(!1),children:fe}),e.jsx(x,{onClick:Je,children:ge})]})]})})}),b==="dropdown"&&D&&e.jsx(qe,{open:L==="range",onOpenChange:q,children:e.jsx(Fe,{ref:tt,onCloseAutoFocus:He,onEscapeKeyDown:o=>{J!=null&&J.querySelector('[data-state="open"]')&&o.preventDefault()},children:e.jsxs(be,{container:J,children:[e.jsx(Ke,{className:"tw:pe-8",children:e.jsx(Ue,{children:Ho})}),De,e.jsxs(Xe,{children:[e.jsx(x,{variant:"outline",onClick:()=>q(!1),children:fe}),e.jsx(x,{ref:Re,onClick:Je,children:ge})]})]})})})]})}m.__docgenInfo={description:`A component that allows users to select the scope of their search or operation. Available scopes
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
value contains localized versions of the ID and full book name`},disabledSectionExplanations:{required:!1,tsType:{name:"Partial",elements:[{name:"Record",elements:[{name:"Section"},{name:"string"}],raw:"Record<Section, string>"}],raw:"Partial<Record<Section, string>>"},description:`Optional explanations, by section, for why that section has no available books. Forwarded to
{@link SelectBooks} and shown as a tooltip on that section's disabled quick-select button.`},id:{required:!1,tsType:{name:"string"},description:"Optional ID that is applied to the root element of this component"},variant:{required:!1,tsType:{name:"union",raw:"'radio' | 'dropdown'",elements:[{name:"literal",value:"'radio'"},{name:"literal",value:"'dropdown'"}]},description:"Controls how the scope options are presented. `'radio'` (default) renders a vertical list of\nradio buttons. `'dropdown'` renders a single Select trigger whose popover contains the\noptions.",defaultValue:{value:"'radio'",computed:!1}},rangeStart:{required:!1,tsType:{name:"SerializedVerseRef"},description:"The start of the verse range. Only used when `scope === 'range'`. Defaults to `defaultScrRef`\n(GEN 1:1) if neither this nor `currentScrRef` is provided."},rangeEnd:{required:!1,tsType:{name:"SerializedVerseRef"},description:"The end of the verse range. Only used when `scope === 'range'`. Every time the user submits a\nnew `rangeStart`, `onRangeEndChange` is also fired with that same reference so the end mirrors\nthe start; the user is free to narrow the end afterward. Defaults to `defaultScrRef` (GEN 1:1)\nif neither this nor `currentScrRef` is provided."},onRangeStartChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(scrRef: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scrRef"}],return:{name:"void"}}},description:"Callback when the range start reference changes. Required to make the range UI functional."},onRangeEndChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(scrRef: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scrRef"}],return:{name:"void"}}},description:"Callback when the range end reference changes. Required to make the range UI functional."},currentScrRef:{required:!1,tsType:{name:"SerializedVerseRef"},description:"Optional current scripture reference. When provided and no explicit `rangeStart` or `rangeEnd`\nis supplied, it is used as the initial value for the range controls."},onCurrentScrRefChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(scrRef: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scrRef"}],return:{name:"void"}}},description:'Optional callback fired when the user picks a new scripture reference from the "Navigate"\nfooter entry at the bottom of the dropdown variant. Provide this alongside `currentScrRef` (and\nusing `variant="dropdown"`) to surface the footer button — a BookChapterControl picker prefixed\nwith a "Navigate" headline and the current reference. Without this callback the footer is not\nrendered.'},bookChapterControlLocalizedStrings:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:`Optional localized strings passed to the range BCV controls. When omitted, the BCV controls
will fall back to their internal defaults.`},getEndVerse:{required:!1,tsType:{name:"signature",type:"function",raw:"(bookId: string, chapterNum: number) => number",signature:{arguments:[{type:{name:"string"},name:"bookId"},{type:{name:"number"},name:"chapterNum"}],return:{name:"number"}}},description:"Optional callback returning the number of verses for a given book and chapter. When provided,\nthe range BCV controls enable verse selection. See `BookChapterControlProps.getEndVerse`."},hideLabel:{required:!1,tsType:{name:"boolean"},description:`When true, suppresses the "Scope" label rendered above the trigger. Useful for compact
placements (e.g. inside a tab toolbar) where the trigger speaks for itself and the extra
vertical space pushes the trigger off-screen.`,defaultValue:{value:"false",computed:!1}},buttonClassName:{required:!1,tsType:{name:"string"},description:"Additional Tailwind classes applied to the trigger button. Use this to control the trigger\nheight in compact contexts (e.g. `'tw:h-8'` to align with other toolbar controls)."}}};const z="1".repeat(123),I=new Map([["GEN",{localizedId:"Gen",localizedName:"Genesis"}],["EXO",{localizedId:"Exo",localizedName:"Exodus"}],["LEV",{localizedId:"Lev",localizedName:"Leviticus"}],["NUM",{localizedId:"Num",localizedName:"Numbers"}],["DEU",{localizedId:"Deu",localizedName:"Deuteronomy"}],["MAT",{localizedId:"Mat",localizedName:"Matthew"}],["MRK",{localizedId:"Mrk",localizedName:"Mark"}],["LUK",{localizedId:"Luk",localizedName:"Luke"}],["JHN",{localizedId:"Jhn",localizedName:"John"}],["ROM",{localizedId:"Rom",localizedName:"Romans"}]]),Cs={title:"Advanced/Scope Selector",component:m,tags:["autodocs"],argTypes:{variant:{control:{type:"radio"},options:["radio","dropdown"],description:"Visual layout of the scope options."}},decorators:[a=>e.jsx("div",{className:"tw:max-w-md tw:p-4",children:e.jsx(a,{})})]},K={render:()=>{const[a,n]=t.useState("book"),[l,i]=t.useState(["GEN","MAT"]);return e.jsx(m,{scope:a,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector set to book scope with book selection capabilities."}}}},U={render:()=>{const[a,n]=t.useState("chapter"),[l,i]=t.useState([]);return e.jsx(m,{scope:a,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector set to chapter scope."}}}},X={render:()=>{const[a,n]=t.useState("verse"),[l,i]=t.useState([]);return e.jsx(m,{scope:a,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector set to verse scope."}}}},me={"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_selected_text%":"Selected text","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_scope_selector_range%":"Range","%webView_scope_selector_select_range%":"Select a range","%webView_scope_selector_range_start%":"From","%webView_scope_selector_range_end%":"To","%webView_scope_selector_ok%":"OK","%webView_scope_selector_navigate%":"Change current reference","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found","%webView_book_selector_more%":"more"},St={GEN:{1:31,2:25,3:24},MAT:{1:25,5:48},JHN:{3:36},REV:{22:21}};function ke(a,n){var l;return((l=St[a])==null?void 0:l[n])??30}const Y={render:()=>{const[a,n]=t.useState("chapter"),[l,i]=t.useState([]),[s,w]=t.useState({book:"MAT",chapterNum:5,verseNum:3});return e.jsx(m,{variant:"dropdown",scope:a,availableBookInfo:z,selectedBookIds:l,onScopeChange:c=>n(c),onSelectedBookIdsChange:c=>i(c),localizedStrings:me,localizedBookNames:I,currentScrRef:s,onCurrentScrRefChange:w,getEndVerse:ke})},parameters:{docs:{description:{story:'Scope selector rendered as a dropdown instead of radio buttons. Use `variant="dropdown"` when screen space is tight.'}}}},Z={render:()=>{const[a,n]=t.useState("range"),[l,i]=t.useState([]),[s,w]=t.useState(te),[c,k]=t.useState({book:"GEN",chapterNum:3,verseNum:24});return e.jsx(m,{scope:a,availableBookInfo:z,selectedBookIds:l,onScopeChange:S=>n(S),onSelectedBookIdsChange:S=>i(S),localizedStrings:me,localizedBookNames:I,rangeStart:s,rangeEnd:c,onRangeStartChange:w,onRangeEndChange:k,getEndVerse:ke})},parameters:{docs:{description:{story:"Range scope renders two BookChapterControl pickers so the user can pick the first and last verse. When `getEndVerse` is provided, the BCV controls also allow verse selection."}}}},$={render:()=>{const[a,n]=t.useState("range"),[l,i]=t.useState([]),[s,w]=t.useState(void 0),[c,k]=t.useState(void 0),[S,se]=t.useState({book:"MAT",chapterNum:5,verseNum:3});return e.jsx(m,{variant:"dropdown",scope:a,availableBookInfo:z,selectedBookIds:l,onScopeChange:b=>n(b),onSelectedBookIdsChange:b=>i(b),localizedStrings:me,localizedBookNames:I,currentScrRef:S,onCurrentScrRefChange:se,rangeStart:s,rangeEnd:c,onRangeStartChange:w,onRangeEndChange:k,getEndVerse:ke})},parameters:{docs:{description:{story:"Combines the dropdown variant with the range scope."}}}},Q={render:()=>{const[a,n]=t.useState("selectedBooks"),[l,i]=t.useState(["GEN","EXO","MAT","JHN"]);return e.jsx(m,{scope:a,availableBookInfo:z,selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_verse%":"Verse","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:I})},parameters:{docs:{description:{story:"Scope selector with selected books scope showing book selection interface."}}}},gt=new Map([["GEN",{localizedId:"GÉN",localizedName:"Génesis"}],["EXO",{localizedId:"ÉXO",localizedName:"Éxodo"}],["LEV",{localizedId:"LEV",localizedName:"Levítico"}],["NUM",{localizedId:"NÚM",localizedName:"Números"}],["DEU",{localizedId:"DEU",localizedName:"Deuteronomio"}],["JOS",{localizedId:"JOS",localizedName:"Josué"}],["JDG",{localizedId:"JUE",localizedName:"Jueces"}],["RUT",{localizedId:"RUT",localizedName:"Rut"}],["1SA",{localizedId:"1SA",localizedName:"1 Samuel"}],["2SA",{localizedId:"2SA",localizedName:"2 Samuel"}],["1KI",{localizedId:"1RE",localizedName:"1 Reyes"}],["2KI",{localizedId:"2RE",localizedName:"2 Reyes"}],["1CH",{localizedId:"1CR",localizedName:"1 Crónicas"}],["2CH",{localizedId:"2CR",localizedName:"2 Crónicas"}],["EZR",{localizedId:"ESD",localizedName:"Esdras"}],["NEH",{localizedId:"NEH",localizedName:"Nehemías"}],["EST",{localizedId:"EST",localizedName:"Ester"}],["JOB",{localizedId:"JOB",localizedName:"Job"}],["PSA",{localizedId:"SAL",localizedName:"Salmos"}],["PRO",{localizedId:"PRO",localizedName:"Proverbios"}],["ECC",{localizedId:"ECL",localizedName:"Eclesiastés"}],["SNG",{localizedId:"CNT",localizedName:"Cantares"}],["ISA",{localizedId:"ISA",localizedName:"Isaías"}],["JER",{localizedId:"JER",localizedName:"Jeremías"}],["LAM",{localizedId:"LAM",localizedName:"Lamentaciones"}],["EZK",{localizedId:"EZE",localizedName:"Ezequiel"}],["DAN",{localizedId:"DAN",localizedName:"Daniel"}],["HOS",{localizedId:"OSE",localizedName:"Oseas"}],["JOL",{localizedId:"JOE",localizedName:"Joel"}],["AMO",{localizedId:"AMÓ",localizedName:"Amós"}],["OBA",{localizedId:"ABD",localizedName:"Abdías"}],["JON",{localizedId:"JON",localizedName:"Jonás"}],["MIC",{localizedId:"MIQ",localizedName:"Miqueas"}],["NAM",{localizedId:"NAH",localizedName:"Nahúm"}],["HAB",{localizedId:"HAB",localizedName:"Habacuc"}],["ZEP",{localizedId:"SOF",localizedName:"Sofonías"}],["HAG",{localizedId:"HAG",localizedName:"Hageo"}],["ZEC",{localizedId:"ZAC",localizedName:"Zacarías"}],["MAL",{localizedId:"MAL",localizedName:"Malaquías"}],["MAT",{localizedId:"MAT",localizedName:"Mateo"}],["MRK",{localizedId:"MAR",localizedName:"Marcos"}],["LUK",{localizedId:"LUC",localizedName:"Lucas"}],["JHN",{localizedId:"JUA",localizedName:"Juan"}],["ACT",{localizedId:"HEC",localizedName:"Hechos"}],["ROM",{localizedId:"ROM",localizedName:"Romanos"}],["1CO",{localizedId:"1CO",localizedName:"1 Corintios"}],["2CO",{localizedId:"2CO",localizedName:"2 Corintios"}],["GAL",{localizedId:"GÁL",localizedName:"Gálatas"}],["EPH",{localizedId:"EFE",localizedName:"Efesios"}],["PHP",{localizedId:"FIL",localizedName:"Filipenses"}],["COL",{localizedId:"COL",localizedName:"Colosenses"}],["1TH",{localizedId:"1TE",localizedName:"1 Tesalonicenses"}],["2TH",{localizedId:"2TE",localizedName:"2 Tesalonicenses"}],["1TI",{localizedId:"1TI",localizedName:"1 Timoteo"}],["2TI",{localizedId:"2TI",localizedName:"2 Timoteo"}],["TIT",{localizedId:"TIT",localizedName:"Tito"}],["PHM",{localizedId:"FLM",localizedName:"Filemón"}],["HEB",{localizedId:"HEB",localizedName:"Hebreos"}],["JAS",{localizedId:"STG",localizedName:"Santiago"}],["1PE",{localizedId:"1PE",localizedName:"1 Pedro"}],["2PE",{localizedId:"2PE",localizedName:"2 Pedro"}],["1JN",{localizedId:"1JN",localizedName:"1 Juan"}],["2JN",{localizedId:"2JN",localizedName:"2 Juan"}],["3JN",{localizedId:"3JN",localizedName:"3 Juan"}],["JUD",{localizedId:"JUD",localizedName:"Judas"}],["REV",{localizedId:"APO",localizedName:"Apocalipsis"}]]),ft=new Map([["GEN",{localizedId:"1MO",localizedName:"1. Mose"}],["EXO",{localizedId:"2MO",localizedName:"2. Mose"}],["LEV",{localizedId:"3MO",localizedName:"3. Mose"}],["NUM",{localizedId:"4MO",localizedName:"4. Mose"}],["DEU",{localizedId:"5MO",localizedName:"5. Mose"}],["PSA",{localizedId:"PS",localizedName:"Psalmen"}],["MAT",{localizedId:"MT",localizedName:"Matthäus"}],["MRK",{localizedId:"MK",localizedName:"Markus"}],["LUK",{localizedId:"LK",localizedName:"Lukas"}],["JHN",{localizedId:"JOH",localizedName:"Johannes"}],["ACT",{localizedId:"APG",localizedName:"Apostelgeschichte"}],["ROM",{localizedId:"RÖM",localizedName:"Römer"}],["1CO",{localizedId:"1KOR",localizedName:"1. Korinther"}],["2CO",{localizedId:"2KOR",localizedName:"2. Korinther"}],["GAL",{localizedId:"GAL",localizedName:"Galater"}],["EPH",{localizedId:"EPH",localizedName:"Epheser"}],["PHP",{localizedId:"PHIL",localizedName:"Philipper"}],["REV",{localizedId:"OFFB",localizedName:"Offenbarung"}]]),Co="100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",ee={render:()=>{const[a,n]=t.useState("selectedBooks"),[l,i]=t.useState(["GEN","PSA","MAT","JHN","REV"]);return e.jsx(m,{scope:a,availableBookInfo:Co,availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:gt})},parameters:{docs:{description:{story:`
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents.
        `}}}},oe={render:()=>{const[a,n]=t.useState("selectedBooks"),[l,i]=t.useState(["GEN","PSA","MAT","JHN","REV"]);return e.jsx(m,{scope:a,availableBookInfo:Co,availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:l,onScopeChange:s=>{console.log("Scope changed to:",s),n(s)},onSelectedBookIdsChange:s=>{console.log("Selected books:",s),i(s)},localizedStrings:{"%webView_scope_selector_book%":"Book","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_chapter%":"Chapter","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:ft})},parameters:{docs:{description:{story:`
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns.
        `}}}};var eo,oo,to;K.parameters={...K.parameters,docs:{...(eo=K.parameters)==null?void 0:eo.docs,source:{originalSource:`{
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
}`,...(to=(oo=K.parameters)==null?void 0:oo.docs)==null?void 0:to.source}}};var so,ro,ao;U.parameters={...U.parameters,docs:{...(so=U.parameters)==null?void 0:so.docs,source:{originalSource:`{
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
}`,...(ao=(ro=U.parameters)==null?void 0:ro.docs)==null?void 0:ao.source}}};var co,no,lo;X.parameters={...X.parameters,docs:{...(co=X.parameters)==null?void 0:co.docs,source:{originalSource:`{
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
}`,...(lo=(no=X.parameters)==null?void 0:no.docs)==null?void 0:lo.source}}};var io,po,_o;Y.parameters={...Y.parameters,docs:{...(io=Y.parameters)==null?void 0:io.docs,source:{originalSource:`{
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
}`,...(_o=(po=Y.parameters)==null?void 0:po.docs)==null?void 0:_o.source}}};var uo,wo,bo;Z.parameters={...Z.parameters,docs:{...(uo=Z.parameters)==null?void 0:uo.docs,source:{originalSource:`{
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
}`,...(bo=(wo=Z.parameters)==null?void 0:wo.docs)==null?void 0:bo.source}}};var mo,ko,ho;$.parameters={...$.parameters,docs:{...(mo=$.parameters)==null?void 0:mo.docs,source:{originalSource:`{
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
}`,...(ho=(ko=$.parameters)==null?void 0:ko.docs)==null?void 0:ho.source}}};var So,go,fo;Q.parameters={...Q.parameters,docs:{...(So=Q.parameters)==null?void 0:So.docs,source:{originalSource:`{
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
}`,...(fo=(go=Q.parameters)==null?void 0:go.docs)==null?void 0:fo.source}}};var zo,Io,No;ee.parameters={...ee.parameters,docs:{...(zo=ee.parameters)==null?void 0:zo.docs,source:{originalSource:`{
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
}`,...(No=(Io=ee.parameters)==null?void 0:Io.docs)==null?void 0:No.source}}};var vo,Vo,Bo;oe.parameters={...oe.parameters,docs:{...(vo=oe.parameters)==null?void 0:vo.docs,source:{originalSource:`{
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
}`,...(Bo=(Vo=oe.parameters)==null?void 0:Vo.docs)==null?void 0:Bo.source}}};const Rs=["BookScope","ChapterScope","VerseScope","DropdownVariant","RangeScope","DropdownVariantWithRange","SelectedBooksScope","WithLocalizedSpanishBookNames","WithLocalizedGermanBookNames"];export{K as BookScope,U as ChapterScope,Y as DropdownVariant,$ as DropdownVariantWithRange,Z as RangeScope,Q as SelectedBooksScope,X as VerseScope,oe as WithLocalizedGermanBookNames,ee as WithLocalizedSpanishBookNames,Rs as __namedExportsOrder,Cs as default};
