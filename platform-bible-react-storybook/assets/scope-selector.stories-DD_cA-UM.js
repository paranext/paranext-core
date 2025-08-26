import{j as i}from"./jsx-runtime-BaEeaJSh.js";import{S as E}from"./scope-selector.component-BMyRtimq.js";import{T as D}from"./theme-provider.component-jEMqdE5s.js";import{r as t}from"./iframe-g9R9mzPN.js";import"./badge-CfGzFaNj.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./button-qAHPocV6.js";import"./index-DVfymDq5.js";import"./index-D8tVnZ95.js";import"./command-Bd0F5pQT.js";import"./index-CPoPa44g.js";import"./index-Cqip-xWB.js";import"./index-CWP3moHD.js";import"./index-CAv7KJp4.js";import"./index-C4dq5yF9.js";import"./index-D0KhAmoC.js";import"./index-B_D_lJog.js";import"./index-DWKckw7X.js";import"./index-CNwTBO2y.js";import"./index-DhdIACi3.js";import"./index-B8ZdkWoR.js";import"./index-CbXecFet.js";import"./index-BKahgIYu.js";import"./dialog-DTuA8vdc.js";import"./x-BZ7rhIBB.js";import"./createLucideIcon-CwdE09Ww.js";import"./search-EWa6-e-s.js";import"./popover-BxNBuDh6.js";import"./index-D-WT52Y8.js";import"./floating-ui.react-dom-DrAQJVS7.js";import"./index-Dghecx1W.js";import"./index-DzL44Jgs.js";import"./index.es-D4jfZzAn.js";import"./check-BIj5f9ub.js";import"./chevrons-up-down-C4SeDCup.js";import"./label-BsAcOXnv.js";import"./radio-group-DlTqKFnQ.js";import"./index-C4Aieo-7.js";import"./index-sh5i1j1T.js";import"./index-BDiSr5er.js";import"./index-Dv-s0lqh.js";import"./circle-D0BI_JWa.js";const L={"%webView_scope_selector_selected_text%":"Selected text","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_choose_books%":"Choose books","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_select_books%":"Select books","%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%webView_book_selector_more%":"more","%scripture_section_ot_long%":"Old Testament","%scripture_section_ot_short%":"OT","%scripture_section_nt_long%":"New Testament","%scripture_section_nt_short%":"NT","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_dc_short%":"DC","%scripture_section_extra_long%":"Extra material","%scripture_section_extra_short%":"Extra"};function M({scope:e,selectedBookIds:O,onScopeChange:p,onSelectedBookIdsChange:d,...N}){const[j,A]=t.useState(e),[G,Y]=t.useState(O),P=t.useCallback(o=>{A(o),p(o)},[p]),R=t.useCallback(o=>{Y(o),d(o)},[d]);return i.jsx(D,{children:i.jsx(E,{...N,scope:j,selectedBookIds:G,onScopeChange:P,onSelectedBookIdsChange:R})})}const Oe={title:"Advanced/ScopeSelector",component:E,tags:["autodocs"],decorators:[e=>i.jsx(e,{})],args:{scope:"chapter",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",selectedBookIds:[],localizedStrings:L,onScopeChange:e=>console.log("Search scope changed:",e),onSelectedBookIdsChange:e=>console.log("Selected books changed:",e)},render:e=>i.jsx(M,{...e})},s={},c={args:{scope:"chapter",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in chapter scope. You can change the scope and select books - the state will be managed automatically."}}}},r={args:{scope:"book",selectedBookIds:[],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in book scope. You can change the scope and select books - the state will be managed automatically."}}}},a={args:{scope:"verse",selectedBookIds:[],availableScopes:["selectedText","verse","book","selectedBooks"],availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000"}},n={args:{scope:"selectedBooks",selectedBookIds:["GEN","EXO","LEV"],availableScopes:["selectedText","chapter","book","selectedBooks"]},parameters:{docs:{description:{story:"ScopeSelector in selectedBooks mode with some initial book selections. The selected books state will be preserved as you interact with the component."}}}},l={args:{scope:"selectedBooks",availableBookInfo:"100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000",availableScopes:["selectedText","chapter","book","selectedBooks"],selectedBookIds:["GEN","PSA","MAT","REV","JHN","ACT","ROM","1CO","2CO","GAL"]},parameters:{docs:{description:{story:`Interactive ScopeSelector component with state management. The component maintains its own state for selected scope and books, while still calling the provided callbacks. You can:
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
