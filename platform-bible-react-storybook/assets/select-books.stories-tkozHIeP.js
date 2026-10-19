import{j as c,r as x}from"./iframe-CeWWK8jt.js";import{c as V}from"./index.es-CXoS8DB2.js";import{S as w}from"./select-books.component-DRgYjj3z.js";import"./preload-helper-CTOgD26E.js";import"./badge-CG8Sosid.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-xOzl37LY.js";import"./index-BvARUw0N.js";import"./index-DDt_EViq.js";import"./index-Cn7xqC4M.js";import"./book-item.utils-DqwEkZXg.js";import"./command-Bj2cXUtB.js";import"./index-BYEVU-zC.js";import"./index-11SXDAqH.js";import"./index-MR7oD8av.js";import"./index-fvW_jPm9.js";import"./index-C4V-DiUk.js";import"./index-BqcuO69j.js";import"./index-SjFQssXs.js";import"./index-EtbWHvvu.js";import"./index-KwgYhnfm.js";import"./index-NcS87iie.js";import"./dialog-B0DUmOZa.js";import"./z-index-DiGYIwoM.js";import"./button-DWOn8fXg.js";import"./createReactComponent-CSM5DX75.js";import"./input-group-B0SQ4n9B.js";import"./input-BcshK38h.js";import"./IconCheck--BW5zZaI.js";import"./focus.util-DRSEP984.js";import"./check-rV8tKYRZ.js";import"./createLucideIcon-BFstFP8Y.js";import"./select-books-picker.component-DvKx-LTy.js";import"./popover-CpnHdgFI.js";import"./portal-container.context-BLMgODsG.js";import"./index-C06sfqlc.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CC6EOSML.js";import"./chevrons-up-down-MwMRBZ7h.js";import"./tooltip-gPVjaOnu.js";import"./index-Czu6jkqf.js";import"./disabled-tooltip-wrapper.component-Bg2tdYew.js";const O="1".repeat(V.allBookIds.length),T="100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",D={"%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%webView_book_selector_more%":"more","%scripture_section_ot_long%":"Old Testament","%scripture_section_ot_short%":"OT","%scripture_section_nt_long%":"New Testament","%scripture_section_nt_short%":"NT","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_dc_short%":"DC","%scripture_section_extra_long%":"Extra material","%scripture_section_extra_short%":"Extra"},G=new Map([["GEN",{localizedId:"GÉN",localizedName:"Génesis"}],["EXO",{localizedId:"ÉXO",localizedName:"Éxodo"}],["LEV",{localizedId:"LEV",localizedName:"Levítico"}],["PSA",{localizedId:"SAL",localizedName:"Salmos"}],["MAT",{localizedId:"MAT",localizedName:"Mateo"}],["MRK",{localizedId:"MAR",localizedName:"Marcos"}],["LUK",{localizedId:"LUC",localizedName:"Lucas"}],["JHN",{localizedId:"JUA",localizedName:"Juan"}],["ROM",{localizedId:"ROM",localizedName:"Romanos"}],["REV",{localizedId:"APO",localizedName:"Apocalipsis"}]]);function R({selectedBookIds:e,onChangeSelectedBookIds:A,...M}){const[v,L]=x.useState(e);return c.jsx("div",{className:"tw:max-w-md tw:p-4",children:c.jsx(w,{...M,selectedBookIds:v,onChangeSelectedBookIds:n=>{L(n),A(n)}})})}const Ae={title:"Advanced/Select Books",component:w,tags:["autodocs"],parameters:{docs:{description:{component:"A component for selecting multiple books from the Bible canon. It offers quick section buttons (OT, NT, DC, Extra), a searchable dropdown of the available books, shift-click range selection, and badges summarizing the current selection."}}},args:{availableBookInfo:O,selectedBookIds:[],localizedStrings:D,onChangeSelectedBookIds:e=>console.log("Selected books changed:",e)},render:e=>c.jsx(R,{...e})},o={parameters:{docs:{description:{story:"All books available with no initial selection."}}}},s={args:{selectedBookIds:["GEN","EXO","LEV","MAT","JHN"]},parameters:{docs:{description:{story:"Some books pre-selected, showing the summary badges."}}}},t={args:{selectedBookIds:["GEN","EXO","LEV","NUM","DEU","MAT","MRK","LUK"]},parameters:{docs:{description:{story:'When more than the visible limit of books is selected, a "+X more" badge appears.'}}}},a={args:{availableBookInfo:T,selectedBookIds:["GEN"]},parameters:{docs:{description:{story:"Only a subset of books is available, so section buttons for empty sections are disabled."}}}},r={args:{selectedBookIds:["GEN","PSA","MAT","JHN","REV"],localizedBookNames:G},parameters:{docs:{description:{story:"Displays localized (Spanish) book names. Search works against both English and localized names and IDs."}}}},i={args:{localizedStrings:{}},parameters:{docs:{description:{story:"When no localized strings are provided the component falls back to displaying the raw localization keys."}}}};var l,d,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'All books available with no initial selection.'
      }
    }
  }
}`,...(m=(d=o.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,k,b;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    selectedBookIds: ['GEN', 'EXO', 'LEV', 'MAT', 'JHN']
  },
  parameters: {
    docs: {
      description: {
        story: 'Some books pre-selected, showing the summary badges.'
      }
    }
  }
}`,...(b=(k=s.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var u,h,_;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    selectedBookIds: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK']
  },
  parameters: {
    docs: {
      description: {
        story: 'When more than the visible limit of books is selected, a "+X more" badge appears.'
      }
    }
  }
}`,...(_=(h=t.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};var g,S,B;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    availableBookInfo: someBooksAvailable,
    selectedBookIds: ['GEN']
  },
  parameters: {
    docs: {
      description: {
        story: 'Only a subset of books is available, so section buttons for empty sections are disabled.'
      }
    }
  }
}`,...(B=(S=a.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var N,z,f;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'JHN', 'REV'],
    localizedBookNames: spanishBookNames
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays localized (Spanish) book names. Search works against both English and ' + 'localized names and IDs.'
      }
    }
  }
}`,...(f=(z=r.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};var E,y,I;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    localizedStrings: {}
  },
  parameters: {
    docs: {
      description: {
        story: 'When no localized strings are provided the component falls back to displaying the raw ' + 'localization keys.'
      }
    }
  }
}`,...(I=(y=i.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};const Me=["Default","WithSelectedBooks","ManySelectedBooks","LimitedAvailableBooks","WithLocalizedBookNames","MissingLocalizedStrings"];export{o as Default,a as LimitedAvailableBooks,t as ManySelectedBooks,i as MissingLocalizedStrings,r as WithLocalizedBookNames,s as WithSelectedBooks,Me as __namedExportsOrder,Ae as default};
