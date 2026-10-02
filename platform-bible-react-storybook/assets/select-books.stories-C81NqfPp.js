import{j as c,r as x}from"./iframe-CNwPhygf.js";import{c as V}from"./index.es-CXoS8DB2.js";import{S as w}from"./select-books.component-0CQIxZUa.js";import"./preload-helper-CTOgD26E.js";import"./badge-COBIm7Mh.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-36fm6Tqo.js";import"./index-FGdHILLe.js";import"./scripture-util-DArajUVn-CpoMU_29.js";import"./index-DCo3rgjq.js";import"./grapheme-CMWZWa5_.js";import"./index-C77E7Q-s.js";import"./book-item.utils-By_3XVMn.js";import"./command-CZnUvAb3.js";import"./index-C7_SagG9.js";import"./index-BuDaAPKG.js";import"./index-Blg-BLDa.js";import"./index-BGd2ushH.js";import"./index-B8M0SSFd.js";import"./index-Ckmh6uok.js";import"./index-C_cCc8is.js";import"./index-C55uHr_V.js";import"./index-D9m1k4o8.js";import"./index-1KM652Vt.js";import"./dialog-DvscR6KY.js";import"./z-index-DiGYIwoM.js";import"./button-BC_8cVFC.js";import"./createReactComponent-VcwsCU-L.js";import"./input-group-Crs9bluR.js";import"./input-uvSRxzz_.js";import"./IconCheck-Ukef-0H6.js";import"./focus.util-DRSEP984.js";import"./check-DbM4hTgj.js";import"./createLucideIcon-Crb48Yqb.js";import"./select-books-picker.component-BiwKXTq-.js";import"./popover-Vru2gW2W.js";import"./portal-container.context-BkmmT0Ft.js";import"./index-Dt8fqMTu.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-WanKTmE6.js";import"./chevrons-up-down-B8GawHub.js";import"./tooltip-DN-par-y.js";import"./index-BhR_R8XD.js";import"./disabled-tooltip-wrapper.component-Ad1SOgdk.js";const O="1".repeat(V.allBookIds.length),T="100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",D={"%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%webView_book_selector_more%":"more","%scripture_section_ot_long%":"Old Testament","%scripture_section_ot_short%":"OT","%scripture_section_nt_long%":"New Testament","%scripture_section_nt_short%":"NT","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_dc_short%":"DC","%scripture_section_extra_long%":"Extra material","%scripture_section_extra_short%":"Extra"},G=new Map([["GEN",{localizedId:"GÉN",localizedName:"Génesis"}],["EXO",{localizedId:"ÉXO",localizedName:"Éxodo"}],["LEV",{localizedId:"LEV",localizedName:"Levítico"}],["PSA",{localizedId:"SAL",localizedName:"Salmos"}],["MAT",{localizedId:"MAT",localizedName:"Mateo"}],["MRK",{localizedId:"MAR",localizedName:"Marcos"}],["LUK",{localizedId:"LUC",localizedName:"Lucas"}],["JHN",{localizedId:"JUA",localizedName:"Juan"}],["ROM",{localizedId:"ROM",localizedName:"Romanos"}],["REV",{localizedId:"APO",localizedName:"Apocalipsis"}]]);function R({selectedBookIds:e,onChangeSelectedBookIds:A,...M}){const[v,L]=x.useState(e);return c.jsx("div",{className:"tw:max-w-md tw:p-4",children:c.jsx(w,{...M,selectedBookIds:v,onChangeSelectedBookIds:n=>{L(n),A(n)}})})}const ve={title:"Advanced/Select Books",component:w,tags:["autodocs"],parameters:{docs:{description:{component:"A component for selecting multiple books from the Bible canon. It offers quick section buttons (OT, NT, DC, Extra), a searchable dropdown of the available books, shift-click range selection, and badges summarizing the current selection."}}},args:{availableBookInfo:O,selectedBookIds:[],localizedStrings:D,onChangeSelectedBookIds:e=>console.log("Selected books changed:",e)},render:e=>c.jsx(R,{...e})},o={parameters:{docs:{description:{story:"All books available with no initial selection."}}}},s={args:{selectedBookIds:["GEN","EXO","LEV","MAT","JHN"]},parameters:{docs:{description:{story:"Some books pre-selected, showing the summary badges."}}}},t={args:{selectedBookIds:["GEN","EXO","LEV","NUM","DEU","MAT","MRK","LUK"]},parameters:{docs:{description:{story:'When more than the visible limit of books is selected, a "+X more" badge appears.'}}}},a={args:{availableBookInfo:T,selectedBookIds:["GEN"]},parameters:{docs:{description:{story:"Only a subset of books is available, so section buttons for empty sections are disabled."}}}},r={args:{selectedBookIds:["GEN","PSA","MAT","JHN","REV"],localizedBookNames:G},parameters:{docs:{description:{story:"Displays localized (Spanish) book names. Search works against both English and localized names and IDs."}}}},i={args:{localizedStrings:{}},parameters:{docs:{description:{story:"When no localized strings are provided the component falls back to displaying the raw localization keys."}}}};var l,d,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(I=(y=i.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};const Le=["Default","WithSelectedBooks","ManySelectedBooks","LimitedAvailableBooks","WithLocalizedBookNames","MissingLocalizedStrings"];export{o as Default,a as LimitedAvailableBooks,t as ManySelectedBooks,i as MissingLocalizedStrings,r as WithLocalizedBookNames,s as WithSelectedBooks,Le as __namedExportsOrder,ve as default};
