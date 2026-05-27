import{j as n}from"./jsx-runtime-BqcUmbcY.js";import{r as s}from"./iframe-CKflvdvn.js";import{S as l}from"./scope-selector.component-DDASV3rY.js";import"./preload-helper-CTOgD26E.js";import"./select-books.component-BI1KS5oW.js";import"./badge-cEBkxGRc.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-QqC1-sxW.js";import"./index-CnlRi_gH.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./book-item.utils-DD2_xFf5.js";import"./command-C5Op6E3u.js";import"./index-D8Wbvxz3.js";import"./index-g6R6dbOx.js";import"./index-CE97t_bS.js";import"./index-DqyCvr26.js";import"./index-BE10OdAQ.js";import"./index-C7WE_720.js";import"./index--ZTgFw_J.js";import"./index-dlp9uhfX.js";import"./index-B1P5Zed1.js";import"./index-BSsIpLB9.js";import"./index-BNkgWWoZ.js";import"./index-CqeAXET4.js";import"./dialog-0eXj9kdA.js";import"./z-index-BATlIu8s.js";import"./button-S9ULx3V_.js";import"./createReactComponent-3TWuUfbO.js";import"./input-group-DifA2PPn.js";import"./input-C3oppNdn.js";import"./IconCheck-mO2eSmMV.js";import"./check-gMf4-exB.js";import"./createLucideIcon-DqTD5B-M.js";import"./select-books-picker.component-CyghcDO9.js";import"./popover-Caq4yvbf.js";import"./index-DfMVU6kA.js";import"./index-v0GNlEG9.js";import"./chevrons-up-down-fq-xj5fo.js";import"./label-CLpuMizz.js";import"./radio-group-BGwxIodb.js";import"./index-DjyKEzXS.js";import"./index-CEG0_plt.js";import"./index-DhRlZZ3A.js";const _="1".repeat(123),k=new Map([["GEN",{localizedId:"Gen",localizedName:"Genesis"}],["EXO",{localizedId:"Exo",localizedName:"Exodus"}],["LEV",{localizedId:"Lev",localizedName:"Leviticus"}],["NUM",{localizedId:"Num",localizedName:"Numbers"}],["DEU",{localizedId:"Deu",localizedName:"Deuteronomy"}],["MAT",{localizedId:"Mat",localizedName:"Matthew"}],["MRK",{localizedId:"Mrk",localizedName:"Mark"}],["LUK",{localizedId:"Luk",localizedName:"Luke"}],["JHN",{localizedId:"Jhn",localizedName:"John"}],["ROM",{localizedId:"Rom",localizedName:"Romans"}]]),me={title:"Advanced/Scope Selector",component:l,tags:["autodocs"],decorators:[o=>n.jsx("div",{className:"tw:max-w-md tw:p-4",children:n.jsx(o,{})})]},p={render:()=>{const[o,c]=s.useState("book"),[t,r]=s.useState(["GEN","MAT"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to book scope with book selection capabilities."}}}},a={render:()=>{const[o,c]=s.useState("chapter"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to chapter scope."}}}},i={render:()=>{const[o,c]=s.useState("verse"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to verse scope."}}}},d={render:()=>{const[o,c]=s.useState("selectedBooks"),[t,r]=s.useState(["GEN","EXO","MAT","JHN"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector with selected books scope showing book selection interface."}}}};var b,S,w;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(z=(C=d.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};const ue=["BookScope","ChapterScope","VerseScope","SelectedBooksScope"];export{p as BookScope,a as ChapterScope,d as SelectedBooksScope,i as VerseScope,ue as __namedExportsOrder,me as default};
