import{j as L}from"./jsx-runtime-BqcUmbcY.js";import{S as H}from"./scope-selector.component-9OqFq4IB.js";import{r as a}from"./iframe-DVzoy_2T.js";import"./select-books.component-BbZZSnzZ.js";import"./badge-DEBHUNEJ.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-KL7XIe3I.js";import"./index-CnlRi_gH.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./book-item.utils-BxISHSK3.js";import"./command-C_9bmQio.js";import"./index--3VvimRN.js";import"./index-CDGua9s3.js";import"./index-B5PLzNQN.js";import"./index-CNXBC9Lw.js";import"./index-BiRvx9Ci.js";import"./index-A3oOgNwG.js";import"./index-CwSQyPQw.js";import"./index-DZERpc4P.js";import"./index-eje3GdQb.js";import"./index-B_MVzxYV.js";import"./index-CoAlinuw.js";import"./index-Do5K9IBo.js";import"./dialog-D1d6Y4JM.js";import"./z-index-BATlIu8s.js";import"./button-BrOu8u1B.js";import"./createReactComponent-CpHwkYPO.js";import"./input-group-CMWXcwx4.js";import"./input-C3oppNdn.js";import"./IconCheck-H0BOuOQn.js";import"./check-nexYlsVK.js";import"./createLucideIcon-jHIlWQwE.js";import"./select-books-picker.component-Bigmzfyl.js";import"./popover-BiyPmbDV.js";import"./index-BZ5WnZXT.js";import"./index-CxCaaAIH.js";import"./chevrons-up-down-DAHgTjCV.js";import"./label-DEBz0LIz.js";import"./radio-group-ClkzZ6Xu.js";import"./index-CaKLRLTq.js";import"./index-Du4Fy0Y1.js";import"./index-BkEYcMMh.js";import"./preload-helper-CTOgD26E.js";const j={"%webView_scope_selector_selected_text%":"Selected text","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_choose_books%":"Choose books","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_select_books%":"Select books","%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%webView_book_selector_more%":"more","%scripture_section_ot_long%":"Old Testament","%scripture_section_ot_short%":"OT","%scripture_section_nt_long%":"New Testament","%scripture_section_nt_short%":"NT","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_dc_short%":"DC","%scripture_section_extra_long%":"Extra material","%scripture_section_extra_short%":"Extra"};function q({scope:e,selectedBookIds:P,onScopeChange:m,onSelectedBookIdsChange:p,...R}){const[D,V]=a.useState(e),[U,K]=a.useState(P),F=a.useCallback(o=>{V(o),m(o)},[m]),Y=a.useCallback(o=>{K(o),p(o)},[p]);return L.jsx(H,{...R,scope:D,selectedBookIds:U,onScopeChange:F,onSelectedBookIdsChange:Y})}const Ve={title:"Advanced/ScopeSelector",component:H,tags:["autodocs"],args:{scope:"chapter",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",selectedBookIds:[],localizedStrings:j,onScopeChange:e=>console.log("Search scope changed:",e),onSelectedBookIdsChange:e=>console.log("Selected books changed:",e)},render:e=>L.jsx(q,{...e})},l={},s={args:{scope:"chapter",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in chapter scope. You can change the scope and select books - the state will be managed automatically."}}}},c={args:{scope:"book",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in book scope. You can change the scope and select books - the state will be managed automatically."}}}},t={args:{scope:"verse",selectedBookIds:[],availableScopes:["selectedText","verse","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000"}},i={args:{scope:"selectedBooks",selectedBookIds:["GEN","EXO","LEV"],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in selectedBooks mode with some initial book selections. The selected books state will be preserved as you interact with the component."}}}},d={args:{scope:"selectedBooks",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:["GEN","PSA","MAT","REV","JHN","ACT","ROM","1CO","2CO","GAL"]},parameters:{docs:{description:{story:`Interactive ScopeSelector component with state management. The component maintains its own state for selected scope and books, while still calling the provided callbacks. You can:
 - Switch between different scopes (selectedText, chapter, book, selectedBooks)
 - Select and deselect books when in selectedBooks mode
 - See the state changes logged to the console
The availableBookInfo string represents which books are available in the current project.`}}}},W=new Map([["GEN",{localizedId:"GÉN",localizedName:"Génesis"}],["EXO",{localizedId:"ÉXO",localizedName:"Éxodo"}],["LEV",{localizedId:"LEV",localizedName:"Levítico"}],["NUM",{localizedId:"NÚM",localizedName:"Números"}],["DEU",{localizedId:"DEU",localizedName:"Deuteronomio"}],["JOS",{localizedId:"JOS",localizedName:"Josué"}],["JDG",{localizedId:"JUE",localizedName:"Jueces"}],["RUT",{localizedId:"RUT",localizedName:"Rut"}],["1SA",{localizedId:"1SA",localizedName:"1 Samuel"}],["2SA",{localizedId:"2SA",localizedName:"2 Samuel"}],["1KI",{localizedId:"1RE",localizedName:"1 Reyes"}],["2KI",{localizedId:"2RE",localizedName:"2 Reyes"}],["1CH",{localizedId:"1CR",localizedName:"1 Crónicas"}],["2CH",{localizedId:"2CR",localizedName:"2 Crónicas"}],["EZR",{localizedId:"ESD",localizedName:"Esdras"}],["NEH",{localizedId:"NEH",localizedName:"Nehemías"}],["EST",{localizedId:"EST",localizedName:"Ester"}],["JOB",{localizedId:"JOB",localizedName:"Job"}],["PSA",{localizedId:"SAL",localizedName:"Salmos"}],["PRO",{localizedId:"PRO",localizedName:"Proverbios"}],["ECC",{localizedId:"ECL",localizedName:"Eclesiastés"}],["SNG",{localizedId:"CNT",localizedName:"Cantares"}],["ISA",{localizedId:"ISA",localizedName:"Isaías"}],["JER",{localizedId:"JER",localizedName:"Jeremías"}],["LAM",{localizedId:"LAM",localizedName:"Lamentaciones"}],["EZK",{localizedId:"EZE",localizedName:"Ezequiel"}],["DAN",{localizedId:"DAN",localizedName:"Daniel"}],["HOS",{localizedId:"OSE",localizedName:"Oseas"}],["JOL",{localizedId:"JOE",localizedName:"Joel"}],["AMO",{localizedId:"AMÓ",localizedName:"Amós"}],["OBA",{localizedId:"ABD",localizedName:"Abdías"}],["JON",{localizedId:"JON",localizedName:"Jonás"}],["MIC",{localizedId:"MIQ",localizedName:"Miqueas"}],["NAM",{localizedId:"NAH",localizedName:"Nahúm"}],["HAB",{localizedId:"HAB",localizedName:"Habacuc"}],["ZEP",{localizedId:"SOF",localizedName:"Sofonías"}],["HAG",{localizedId:"HAG",localizedName:"Hageo"}],["ZEC",{localizedId:"ZAC",localizedName:"Zacarías"}],["MAL",{localizedId:"MAL",localizedName:"Malaquías"}],["MAT",{localizedId:"MAT",localizedName:"Mateo"}],["MRK",{localizedId:"MAR",localizedName:"Marcos"}],["LUK",{localizedId:"LUC",localizedName:"Lucas"}],["JHN",{localizedId:"JUA",localizedName:"Juan"}],["ACT",{localizedId:"HEC",localizedName:"Hechos"}],["ROM",{localizedId:"ROM",localizedName:"Romanos"}],["1CO",{localizedId:"1CO",localizedName:"1 Corintios"}],["2CO",{localizedId:"2CO",localizedName:"2 Corintios"}],["GAL",{localizedId:"GÁL",localizedName:"Gálatas"}],["EPH",{localizedId:"EFE",localizedName:"Efesios"}],["PHP",{localizedId:"FIL",localizedName:"Filipenses"}],["COL",{localizedId:"COL",localizedName:"Colosenses"}],["1TH",{localizedId:"1TE",localizedName:"1 Tesalonicenses"}],["2TH",{localizedId:"2TE",localizedName:"2 Tesalonicenses"}],["1TI",{localizedId:"1TI",localizedName:"1 Timoteo"}],["2TI",{localizedId:"2TI",localizedName:"2 Timoteo"}],["TIT",{localizedId:"TIT",localizedName:"Tito"}],["PHM",{localizedId:"FLM",localizedName:"Filemón"}],["HEB",{localizedId:"HEB",localizedName:"Hebreos"}],["JAS",{localizedId:"STG",localizedName:"Santiago"}],["1PE",{localizedId:"1PE",localizedName:"1 Pedro"}],["2PE",{localizedId:"2PE",localizedName:"2 Pedro"}],["1JN",{localizedId:"1JN",localizedName:"1 Juan"}],["2JN",{localizedId:"2JN",localizedName:"2 Juan"}],["3JN",{localizedId:"3JN",localizedName:"3 Juan"}],["JUD",{localizedId:"JUD",localizedName:"Judas"}],["REV",{localizedId:"APO",localizedName:"Apocalipsis"}]]),Z=new Map([["GEN",{localizedId:"1MO",localizedName:"1. Mose"}],["EXO",{localizedId:"2MO",localizedName:"2. Mose"}],["LEV",{localizedId:"3MO",localizedName:"3. Mose"}],["NUM",{localizedId:"4MO",localizedName:"4. Mose"}],["DEU",{localizedId:"5MO",localizedName:"5. Mose"}],["PSA",{localizedId:"PS",localizedName:"Psalmen"}],["MAT",{localizedId:"MT",localizedName:"Matthäus"}],["MRK",{localizedId:"MK",localizedName:"Markus"}],["LUK",{localizedId:"LK",localizedName:"Lukas"}],["JHN",{localizedId:"JOH",localizedName:"Johannes"}],["ACT",{localizedId:"APG",localizedName:"Apostelgeschichte"}],["ROM",{localizedId:"RÖM",localizedName:"Römer"}],["1CO",{localizedId:"1KOR",localizedName:"1. Korinther"}],["2CO",{localizedId:"2KOR",localizedName:"2. Korinther"}],["GAL",{localizedId:"GAL",localizedName:"Galater"}],["EPH",{localizedId:"EPH",localizedName:"Epheser"}],["PHP",{localizedId:"PHIL",localizedName:"Philipper"}],["REV",{localizedId:"OFFB",localizedName:"Offenbarung"}]]),r={args:{scope:"selectedBooks",selectedBookIds:["GEN","PSA","MAT","JHN","REV"],availableScopes:["selectedText","chapter","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",localizedBookNames:W},parameters:{docs:{description:{story:`
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

This example shows how the component displays localized book names in Spanish. When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents. You can search for books using either English or Spanish names and IDs.
        `}}}},n={args:{scope:"selectedBooks",selectedBookIds:["GEN","PSA","MAT","JHN","REV"],availableScopes:["selectedText","chapter","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",localizedBookNames:Z},parameters:{docs:{description:{story:`
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

This example shows how the component displays localized book names in German. Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns. German biblical translations often use traditional naming conventions that differ significantly from English.
        `}}}};var h,z,k;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(k=(z=l.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var N,b,I;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(I=(b=s.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var u,S,g;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(g=(S=c.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var B,E,_;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    scope: 'verse',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'verse', 'book', 'selectedBooks'],
    availableBookInfo: '100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000'
  }
}`,...(_=(E=t.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var T,w,f;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(f=(w=i.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var A,M,O;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(O=(M=d.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var v,G,C;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(C=(G=r.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};var J,y,x;n.parameters={...n.parameters,docs:{...(J=n.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const Ue=["Default","Chapter","Book","Verse","SelectedBooks","Playground","WithLocalizedSpanishBookNames","WithLocalizedGermanBookNames"];export{c as Book,s as Chapter,l as Default,d as Playground,i as SelectedBooks,t as Verse,n as WithLocalizedGermanBookNames,r as WithLocalizedSpanishBookNames,Ue as __namedExportsOrder,Ve as default};
