import{j as i}from"./jsx-runtime-41bNZknh.js";import{S as E}from"./scope-selector.component-CdEq_E4E.js";import{T as D}from"./theme-provider.component-DJidomi1.js";import{r as t}from"./iframe-DezKLm1V.js";import"./badge-7Zr0Wp1d.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./button-BNImaUK1.js";import"./index-D0KJGRUa.js";import"./index-CUlupESh.js";import"./command-0z1d5FR1.js";import"./index-C9uOEbzz.js";import"./index-DCZ4hzzP.js";import"./index-Ds3a2SEj.js";import"./index-DnT6kkIn.js";import"./index--VrIerAB.js";import"./index-Cm_lBpWX.js";import"./index-bmjVsPBM.js";import"./index-CGW-eGMe.js";import"./index-5i6OQTW1.js";import"./index-DWkLH5K8.js";import"./index-C4F-WIu_.js";import"./index-GymTf0II.js";import"./index-DsNnbpps.js";import"./dialog-DYziUFbh.js";import"./x-Ds41Yxs5.js";import"./createLucideIcon-DTaFhFy2.js";import"./search-BlP6EaUr.js";import"./popover-BN2Ikyre.js";import"./index-C_lQNFk6.js";import"./floating-ui.react-dom-DRRlu4dy.js";import"./index-Cl2ghorV.js";import"./index-bv5lnDsn.js";import"./index.es-D4jfZzAn.js";import"./check-sRo6ZDjs.js";import"./chevrons-up-down-NGa6b8t8.js";import"./label-Brsh7Jn1.js";import"./radio-group-D_OqrtXX.js";import"./index-D_DKG39-.js";import"./index-yLsKtSDm.js";import"./index-DRzs5cDs.js";import"./index-SLflGqxF.js";import"./circle-BeT2qg1c.js";const L={"%webView_scope_selector_selected_text%":"Selected text","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_choose_books%":"Choose books","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_select_books%":"Select books","%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%webView_book_selector_more%":"more","%scripture_section_ot_long%":"Old Testament","%scripture_section_ot_short%":"OT","%scripture_section_nt_long%":"New Testament","%scripture_section_nt_short%":"NT","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_dc_short%":"DC","%scripture_section_extra_long%":"Extra material","%scripture_section_extra_short%":"Extra"};function M({scope:e,selectedBookIds:O,onScopeChange:p,onSelectedBookIdsChange:d,...N}){const[j,A]=t.useState(e),[G,Y]=t.useState(O),P=t.useCallback(o=>{A(o),p(o)},[p]),R=t.useCallback(o=>{Y(o),d(o)},[d]);return i.jsx(D,{children:i.jsx(E,{...N,scope:j,selectedBookIds:G,onScopeChange:P,onSelectedBookIdsChange:R})})}const Oe={title:"Advanced/ScopeSelector",component:E,tags:["autodocs"],decorators:[e=>i.jsx(e,{})],args:{scope:"chapter",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",selectedBookIds:[],localizedStrings:L,onScopeChange:e=>console.log("Search scope changed:",e),onSelectedBookIdsChange:e=>console.log("Selected books changed:",e)},render:e=>i.jsx(M,{...e})},s={},c={args:{scope:"chapter",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in chapter scope. You can change the scope and select books - the state will be managed automatically."}}}},r={args:{scope:"book",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in book scope. You can change the scope and select books - the state will be managed automatically."}}}},a={args:{scope:"verse",selectedBookIds:[],availableScopes:["selectedText","verse","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000"}},n={args:{scope:"selectedBooks",selectedBookIds:["GEN","EXO","LEV"],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in selectedBooks mode with some initial book selections. The selected books state will be preserved as you interact with the component."}}}},l={args:{scope:"selectedBooks",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:["GEN","PSA","MAT","REV","JHN","ACT","ROM","1CO","2CO","GAL"]},parameters:{docs:{description:{story:`Interactive ScopeSelector component with state management. The component maintains its own state for selected scope and books, while still calling the provided callbacks. You can:
 - Switch between different scopes (selectedText, chapter, book, selectedBooks)
 - Select and deselect books when in selectedBooks mode
 - See the state changes logged to the console
The availableBookInfo string represents which books are available in the current project.`}}}};var m,k,b;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(b=(k=s.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var h,_,u;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(u=(_=c.parameters)==null?void 0:_.docs)==null?void 0:u.source}}};var S,g,w;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(w=(g=r.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var B,v,f;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    scope: 'verse',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'verse', 'book', 'selectedBooks'],
    availableBookInfo: '100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000'
  }
}`,...(f=(v=a.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var T,x,C;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(C=(x=n.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var I,y,V;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(V=(y=l.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};const Ne=["Default","Chapter","Book","Verse","SelectedBooks","Playground"];export{r as Book,c as Chapter,s as Default,l as Playground,n as SelectedBooks,a as Verse,Ne as __namedExportsOrder,Oe as default};
