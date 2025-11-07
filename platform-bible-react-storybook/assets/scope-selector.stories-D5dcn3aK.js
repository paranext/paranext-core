import{j as n}from"./jsx-runtime-h5Pf4ZvI.js";import{r as s}from"./iframe-DWd-I4o0.js";import{S as l}from"./scope-selector.component-yn7kOgFL.js";import{T as v}from"./theme-provider.component-hotuVk0c.js";import"./book-item.utils-DNKLHduY.js";import"./command-DevCtNns.js";import"./index-BYpq_VP5.js";import"./index-QcNrMaf-.js";import"./index-CFOMdl73.js";import"./index-Dv0KcFtC.js";import"./index-BxjA6QLR.js";import"./index-CrpMIWGB.js";import"./index-CamZnR72.js";import"./index-gIHxiZf4.js";import"./index-DXeImQd9.js";import"./index-DLHva6Xh.js";import"./index-DuS1DBZa.js";import"./Combination-CcrWGBML.js";import"./index-B0PtFMzi.js";import"./index-Cq6BDpxU.js";import"./index-MPeO3Qkh.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-BMO_h7Wt.js";import"./x-DsHM7tMC.js";import"./createLucideIcon-evFQ3xPA.js";import"./search-C9TSQsRd.js";import"./index.es-D4jfZzAn.js";import"./index-Bf4Kv1PK.js";import"./check-DdMiXrHK.js";import"./badge-BREmNLUQ.js";import"./index-BPbCuWFR.js";import"./button-mcZUptPN.js";import"./popover-0U53NYYi.js";import"./index-C-r9ROto.js";import"./floating-ui.react-dom-DeYcCeRL.js";import"./index-CEh8cBVX.js";import"./index-5k3n5so8.js";import"./chevrons-up-down-DwFhsd2C.js";import"./label-C3bmeify.js";import"./radio-group-zDUBYvQt.js";import"./index-CgQQPfON.js";import"./index-CHISAOSX.js";import"./index-DJU0prsb.js";import"./index-D-G2Y-Ix.js";import"./circle-y63LbNEI.js";const _="1".repeat(123),k=new Map([["GEN",{localizedId:"Gen",localizedName:"Genesis"}],["EXO",{localizedId:"Exo",localizedName:"Exodus"}],["LEV",{localizedId:"Lev",localizedName:"Leviticus"}],["NUM",{localizedId:"Num",localizedName:"Numbers"}],["DEU",{localizedId:"Deu",localizedName:"Deuteronomy"}],["MAT",{localizedId:"Mat",localizedName:"Matthew"}],["MRK",{localizedId:"Mrk",localizedName:"Mark"}],["LUK",{localizedId:"Luk",localizedName:"Luke"}],["JHN",{localizedId:"Jhn",localizedName:"John"}],["ROM",{localizedId:"Rom",localizedName:"Romans"}]]),ue={title:"Advanced/Scope Selector",component:l,tags:["autodocs"],decorators:[o=>n.jsx(v,{children:n.jsx("div",{className:"tw-max-w-md tw-p-4",children:n.jsx(o,{})})})]},p={render:()=>{const[o,c]=s.useState("book"),[t,r]=s.useState(["GEN","MAT"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to book scope with book selection capabilities."}}}},a={render:()=>{const[o,c]=s.useState("chapter"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to chapter scope."}}}},i={render:()=>{const[o,c]=s.useState("verse"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to verse scope."}}}},d={render:()=>{const[o,c]=s.useState("selectedBooks"),[t,r]=s.useState(["GEN","EXO","MAT","JHN"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector with selected books scope showing book selection interface."}}}};var b,S,w;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<Scope>('book');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'MAT']);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: Scope) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
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
}`,...(w=(S=p.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var m,u,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<Scope>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: Scope) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
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
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var B,I,g;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<Scope>('verse');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: Scope) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
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
}`,...(g=(I=i.parameters)==null?void 0:I.docs)==null?void 0:g.source}}};var V,C,z;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [scope, setScope] = useState<Scope>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'EXO', 'MAT', 'JHN']);
    return <ScopeSelector scope={scope} availableBookInfo={mockAvailableBookInfo} selectedBookIds={selectedBookIds} onScopeChange={(newScope: Scope) => {
      console.log('Scope changed to:', newScope);
      setScope(newScope);
    }} onSelectedBookIdsChange={(bookIds: string[]) => {
      console.log('Selected books:', bookIds);
      setSelectedBookIds(bookIds);
    }} localizedStrings={{
      '%webView_scope_selector_current_book%': 'Current book',
      '%webView_scope_selector_current_chapter%': 'Current chapter',
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
}`,...(z=(C=d.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};const he=["BookScope","ChapterScope","VerseScope","SelectedBooksScope"];export{p as BookScope,a as ChapterScope,d as SelectedBooksScope,i as VerseScope,he as __namedExportsOrder,ue as default};
