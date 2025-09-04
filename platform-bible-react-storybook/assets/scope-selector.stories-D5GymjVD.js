import{j as m}from"./jsx-runtime-Dp1lb1Uf.js";import{S as H}from"./scope-selector.component-fRsM2reG.js";import{T as Y}from"./theme-provider.component-1wbz6BHc.js";import{r as a}from"./iframe-bGuH-Abg.js";import"./book-item.utils-Dp8W_gsn.js";import"./command-DJHy4uBY.js";import"./index-C2sGph5-.js";import"./index-B8OM6TYd.js";import"./index-DDdVzcAn.js";import"./index-z4Q_vUym.js";import"./index-DzkNuuhM.js";import"./index-CxVRFFEA.js";import"./index-BkoBbs9Y.js";import"./index-BhiuDxmi.js";import"./index-9OUeuJVn.js";import"./index-Da_NMWbH.js";import"./index-Cp9fuXBs.js";import"./index-Py-aa8T1.js";import"./index-Cum9p26y.js";import"./index-1rRh4qjs.js";import"./index-Blre2vGl.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-Dhqhrk0K.js";import"./x-DGpw5JG5.js";import"./createLucideIcon-DYoKyj6y.js";import"./search-BEhapZh1.js";import"./index.es-D4jfZzAn.js";import"./index-BYC3xje7.js";import"./check-BP1taHaR.js";import"./badge-DS36Mpp6.js";import"./index-BPbCuWFR.js";import"./button-C2duuinP.js";import"./popover-OKJ4Fsc_.js";import"./index-DL8D4WRY.js";import"./floating-ui.react-dom-GvR0HUTI.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-DNIXYOBq.js";import"./index-BWEqzBJi.js";import"./chevrons-up-down-BwvlL0ZA.js";import"./label-CJfTsZjw.js";import"./radio-group-sm8LhH55.js";import"./index-D1k6xfzT.js";import"./index-CkLtAkfY.js";import"./index-Dutw9uIA.js";import"./index-CCSv2wWf.js";import"./circle-CKBkbHBO.js";const q={"%webView_scope_selector_selected_text%":"Selected text","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_choose_books%":"Choose books","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_select_books%":"Select books","%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%webView_book_selector_more%":"more","%scripture_section_ot_long%":"Old Testament","%scripture_section_ot_short%":"OT","%scripture_section_nt_long%":"New Testament","%scripture_section_nt_short%":"NT","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_dc_short%":"DC","%scripture_section_extra_long%":"Extra material","%scripture_section_extra_short%":"Extra"};function W({scope:e,selectedBookIds:P,onScopeChange:p,onSelectedBookIdsChange:h,...R}){const[D,V]=a.useState(e),[U,K]=a.useState(P),F=a.useCallback(o=>{V(o),p(o)},[p]),j=a.useCallback(o=>{K(o),h(o)},[h]);return m.jsx(Y,{children:m.jsx(H,{...R,scope:D,selectedBookIds:U,onScopeChange:F,onSelectedBookIdsChange:j})})}const Ke={title:"Advanced/ScopeSelector",component:H,tags:["autodocs"],decorators:[e=>m.jsx(e,{})],args:{scope:"chapter",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",selectedBookIds:[],localizedStrings:q,onScopeChange:e=>console.log("Search scope changed:",e),onSelectedBookIdsChange:e=>console.log("Selected books changed:",e)},render:e=>m.jsx(W,{...e})},l={},s={args:{scope:"chapter",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in chapter scope. You can change the scope and select books - the state will be managed automatically."}}}},c={args:{scope:"book",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in book scope. You can change the scope and select books - the state will be managed automatically."}}}},t={args:{scope:"verse",selectedBookIds:[],availableScopes:["selectedText","verse","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000"}},i={args:{scope:"selectedBooks",selectedBookIds:["GEN","EXO","LEV"],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in selectedBooks mode with some initial book selections. The selected books state will be preserved as you interact with the component."}}}},d={args:{scope:"selectedBooks",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:["GEN","PSA","MAT","REV","JHN","ACT","ROM","1CO","2CO","GAL"]},parameters:{docs:{description:{story:`Interactive ScopeSelector component with state management. The component maintains its own state for selected scope and books, while still calling the provided callbacks. You can:
 - Switch between different scopes (selectedText, chapter, book, selectedBooks)
 - Select and deselect books when in selectedBooks mode
 - See the state changes logged to the console
The availableBookInfo string represents which books are available in the current project.`}}}},Z=new Map([["GEN",{localizedId:"GÉN",localizedName:"Génesis"}],["EXO",{localizedId:"ÉXO",localizedName:"Éxodo"}],["LEV",{localizedId:"LEV",localizedName:"Levítico"}],["NUM",{localizedId:"NÚM",localizedName:"Números"}],["DEU",{localizedId:"DEU",localizedName:"Deuteronomio"}],["JOS",{localizedId:"JOS",localizedName:"Josué"}],["JDG",{localizedId:"JUE",localizedName:"Jueces"}],["RUT",{localizedId:"RUT",localizedName:"Rut"}],["1SA",{localizedId:"1SA",localizedName:"1 Samuel"}],["2SA",{localizedId:"2SA",localizedName:"2 Samuel"}],["1KI",{localizedId:"1RE",localizedName:"1 Reyes"}],["2KI",{localizedId:"2RE",localizedName:"2 Reyes"}],["1CH",{localizedId:"1CR",localizedName:"1 Crónicas"}],["2CH",{localizedId:"2CR",localizedName:"2 Crónicas"}],["EZR",{localizedId:"ESD",localizedName:"Esdras"}],["NEH",{localizedId:"NEH",localizedName:"Nehemías"}],["EST",{localizedId:"EST",localizedName:"Ester"}],["JOB",{localizedId:"JOB",localizedName:"Job"}],["PSA",{localizedId:"SAL",localizedName:"Salmos"}],["PRO",{localizedId:"PRO",localizedName:"Proverbios"}],["ECC",{localizedId:"ECL",localizedName:"Eclesiastés"}],["SNG",{localizedId:"CNT",localizedName:"Cantares"}],["ISA",{localizedId:"ISA",localizedName:"Isaías"}],["JER",{localizedId:"JER",localizedName:"Jeremías"}],["LAM",{localizedId:"LAM",localizedName:"Lamentaciones"}],["EZK",{localizedId:"EZE",localizedName:"Ezequiel"}],["DAN",{localizedId:"DAN",localizedName:"Daniel"}],["HOS",{localizedId:"OSE",localizedName:"Oseas"}],["JOL",{localizedId:"JOE",localizedName:"Joel"}],["AMO",{localizedId:"AMÓ",localizedName:"Amós"}],["OBA",{localizedId:"ABD",localizedName:"Abdías"}],["JON",{localizedId:"JON",localizedName:"Jonás"}],["MIC",{localizedId:"MIQ",localizedName:"Miqueas"}],["NAM",{localizedId:"NAH",localizedName:"Nahúm"}],["HAB",{localizedId:"HAB",localizedName:"Habacuc"}],["ZEP",{localizedId:"SOF",localizedName:"Sofonías"}],["HAG",{localizedId:"HAG",localizedName:"Hageo"}],["ZEC",{localizedId:"ZAC",localizedName:"Zacarías"}],["MAL",{localizedId:"MAL",localizedName:"Malaquías"}],["MAT",{localizedId:"MAT",localizedName:"Mateo"}],["MRK",{localizedId:"MAR",localizedName:"Marcos"}],["LUK",{localizedId:"LUC",localizedName:"Lucas"}],["JHN",{localizedId:"JUA",localizedName:"Juan"}],["ACT",{localizedId:"HEC",localizedName:"Hechos"}],["ROM",{localizedId:"ROM",localizedName:"Romanos"}],["1CO",{localizedId:"1CO",localizedName:"1 Corintios"}],["2CO",{localizedId:"2CO",localizedName:"2 Corintios"}],["GAL",{localizedId:"GÁL",localizedName:"Gálatas"}],["EPH",{localizedId:"EFE",localizedName:"Efesios"}],["PHP",{localizedId:"FIL",localizedName:"Filipenses"}],["COL",{localizedId:"COL",localizedName:"Colosenses"}],["1TH",{localizedId:"1TE",localizedName:"1 Tesalonicenses"}],["2TH",{localizedId:"2TE",localizedName:"2 Tesalonicenses"}],["1TI",{localizedId:"1TI",localizedName:"1 Timoteo"}],["2TI",{localizedId:"2TI",localizedName:"2 Timoteo"}],["TIT",{localizedId:"TIT",localizedName:"Tito"}],["PHM",{localizedId:"FLM",localizedName:"Filemón"}],["HEB",{localizedId:"HEB",localizedName:"Hebreos"}],["JAS",{localizedId:"STG",localizedName:"Santiago"}],["1PE",{localizedId:"1PE",localizedName:"1 Pedro"}],["2PE",{localizedId:"2PE",localizedName:"2 Pedro"}],["1JN",{localizedId:"1JN",localizedName:"1 Juan"}],["2JN",{localizedId:"2JN",localizedName:"2 Juan"}],["3JN",{localizedId:"3JN",localizedName:"3 Juan"}],["JUD",{localizedId:"JUD",localizedName:"Judas"}],["REV",{localizedId:"APO",localizedName:"Apocalipsis"}]]),X=new Map([["GEN",{localizedId:"1MO",localizedName:"1. Mose"}],["EXO",{localizedId:"2MO",localizedName:"2. Mose"}],["LEV",{localizedId:"3MO",localizedName:"3. Mose"}],["NUM",{localizedId:"4MO",localizedName:"4. Mose"}],["DEU",{localizedId:"5MO",localizedName:"5. Mose"}],["PSA",{localizedId:"PS",localizedName:"Psalmen"}],["MAT",{localizedId:"MT",localizedName:"Matthäus"}],["MRK",{localizedId:"MK",localizedName:"Markus"}],["LUK",{localizedId:"LK",localizedName:"Lukas"}],["JHN",{localizedId:"JOH",localizedName:"Johannes"}],["ACT",{localizedId:"APG",localizedName:"Apostelgeschichte"}],["ROM",{localizedId:"RÖM",localizedName:"Römer"}],["1CO",{localizedId:"1KOR",localizedName:"1. Korinther"}],["2CO",{localizedId:"2KOR",localizedName:"2. Korinther"}],["GAL",{localizedId:"GAL",localizedName:"Galater"}],["EPH",{localizedId:"EPH",localizedName:"Epheser"}],["PHP",{localizedId:"PHIL",localizedName:"Philipper"}],["REV",{localizedId:"OFFB",localizedName:"Offenbarung"}]]),r={args:{scope:"selectedBooks",selectedBookIds:["GEN","PSA","MAT","JHN","REV"],availableScopes:["selectedText","chapter","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",localizedBookNames:Z},parameters:{docs:{description:{story:`
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

This example shows how the component displays localized book names in Spanish. When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents. You can search for books using either English or Spanish names and IDs.
        `}}}},n={args:{scope:"selectedBooks",selectedBookIds:["GEN","PSA","MAT","JHN","REV"],availableScopes:["selectedText","chapter","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",localizedBookNames:X},parameters:{docs:{description:{story:`
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

This example shows how the component displays localized book names in German. Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns. German biblical translations often use traditional naming conventions that differ significantly from English.
        `}}}};var z,k,N;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:"{}",...(N=(k=l.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var b,I,u;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    scope: 'chapter',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks']
  },
  parameters: {
    docs: {
      description: {
        story: 'ScopeSelector in chapter scope. You can change the scope and select books - the state will be managed automatically.'
      }
    }
  }
}`,...(u=(I=s.parameters)==null?void 0:I.docs)==null?void 0:u.source}}};var S,g,B;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    scope: 'book',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks']
  },
  parameters: {
    docs: {
      description: {
        story: 'ScopeSelector in book scope. You can change the scope and select books - the state will be managed automatically.'
      }
    }
  }
}`,...(B=(g=c.parameters)==null?void 0:g.docs)==null?void 0:B.source}}};var E,T,_;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    scope: 'verse',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'verse', 'book', 'selectedBooks'],
    availableBookInfo: '100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000'
  }
}`,...(_=(T=t.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var w,f,A;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    scope: 'selectedBooks',
    selectedBookIds: ['GEN', 'EXO', 'LEV'],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks']
  },
  parameters: {
    docs: {
      description: {
        story: 'ScopeSelector in selectedBooks mode with some initial book selections. The selected books state will be preserved as you interact with the component.'
      }
    }
  }
}`,...(A=(f=i.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var M,O,v;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    scope: 'selectedBooks',
    availableBookInfo: '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'REV', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL']
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive ScopeSelector component with state management. The component maintains its own state for selected scope and books, while still calling the provided callbacks. You can:\\n' + ' - Switch between different scopes (selectedText, chapter, book, selectedBooks)\\n' + ' - Select and deselect books when in selectedBooks mode\\n' + ' - See the state changes logged to the console\\n' + 'The availableBookInfo string represents which books are available in the current project.'
      }
    }
  }
}`,...(v=(O=d.parameters)==null?void 0:O.docs)==null?void 0:v.source}}};var G,C,J;r.parameters={...r.parameters,docs:{...(G=r.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    scope: 'selectedBooks',
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'JHN', 'REV'],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
    availableBookInfo: '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    localizedBookNames: spanishBookNames
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

This example shows how the component displays localized book names in Spanish. When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \\\`localizedBookNames\\\` prop, which maps English book IDs to their localized equivalents. You can search for books using either English or Spanish names and IDs.
        \`
      }
    }
  }
}`,...(J=(C=r.parameters)==null?void 0:C.docs)==null?void 0:J.source}}};var x,y,L;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    scope: 'selectedBooks',
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'JHN', 'REV'],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
    availableBookInfo: '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    localizedBookNames: germanBookNames
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

This example shows how the component displays localized book names in German. Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns. German biblical translations often use traditional naming conventions that differ significantly from English.
        \`
      }
    }
  }
}`,...(L=(y=n.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};const Fe=["Default","Chapter","Book","Verse","SelectedBooks","Playground","WithLocalizedSpanishBookNames","WithLocalizedGermanBookNames"];export{c as Book,s as Chapter,l as Default,d as Playground,i as SelectedBooks,t as Verse,n as WithLocalizedGermanBookNames,r as WithLocalizedSpanishBookNames,Fe as __namedExportsOrder,Ke as default};
