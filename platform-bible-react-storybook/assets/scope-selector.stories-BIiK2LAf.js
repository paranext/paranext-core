import{j as n}from"./jsx-runtime-Bcv5qG8q.js";import{r as s}from"./iframe-B1JTTRWo.js";import{S as l}from"./scope-selector.component-NgrSPsVp.js";import{T as v}from"./theme-provider.component-C8MRwuJ-.js";import"./book-item.utils-oLMmvw31.js";import"./command-BVV8sMkD.js";import"./index-DjyA1L9d.js";import"./index-XotOfbKj.js";import"./index-D_1KZAH0.js";import"./index-Do0jtVL9.js";import"./index-CTM9cwMY.js";import"./index-DMp7ZY4R.js";import"./index-C1q67m9i.js";import"./index-DTO8bnlh.js";import"./index-eZ3yBUPT.js";import"./index-D6BjlBM-.js";import"./index-BROf7i17.js";import"./index-D7GLu0tr.js";import"./index-KUyDGunJ.js";import"./index-COW61aIP.js";import"./index-BXcv23gM.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-CNSZKljK.js";import"./x-CLU8XW88.js";import"./createLucideIcon-C3oRQsbk.js";import"./search-BiVyKh7w.js";import"./index.es-D4jfZzAn.js";import"./index-BYC3xje7.js";import"./check-Bt4cFXTp.js";import"./badge-DUjbQOp5.js";import"./index-BPbCuWFR.js";import"./button-6VyDGdlk.js";import"./popover-S1kS_V2r.js";import"./index-SR4aJxrH.js";import"./floating-ui.react-dom-MXs8wDJ-.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-nGoFfWgl.js";import"./index-BwCWUYfy.js";import"./chevrons-up-down-33wEXLuS.js";import"./label-Wtkzyhd0.js";import"./radio-group-BTH0Pq2F.js";import"./index-B9wosXK5.js";import"./index-CW5Uy6nx.js";import"./index-BAJ2K8La.js";import"./index-Cel2m5vc.js";import"./circle--CK5goaI.js";const _="1".repeat(123),k=new Map([["GEN",{localizedId:"Gen",localizedName:"Genesis"}],["EXO",{localizedId:"Exo",localizedName:"Exodus"}],["LEV",{localizedId:"Lev",localizedName:"Leviticus"}],["NUM",{localizedId:"Num",localizedName:"Numbers"}],["DEU",{localizedId:"Deu",localizedName:"Deuteronomy"}],["MAT",{localizedId:"Mat",localizedName:"Matthew"}],["MRK",{localizedId:"Mrk",localizedName:"Mark"}],["LUK",{localizedId:"Luk",localizedName:"Luke"}],["JHN",{localizedId:"Jhn",localizedName:"John"}],["ROM",{localizedId:"Rom",localizedName:"Romans"}]]),he={title:"Advanced/Scope Selector",component:l,tags:["autodocs"],decorators:[o=>n.jsx(v,{children:n.jsx("div",{className:"tw-max-w-md tw-p-4",children:n.jsx(o,{})})})]},p={render:()=>{const[o,c]=s.useState("book"),[t,r]=s.useState(["GEN","MAT"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to book scope with book selection capabilities."}}}},a={render:()=>{const[o,c]=s.useState("chapter"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to chapter scope."}}}},i={render:()=>{const[o,c]=s.useState("verse"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to verse scope."}}}},d={render:()=>{const[o,c]=s.useState("selectedBooks"),[t,r]=s.useState(["GEN","EXO","MAT","JHN"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector with selected books scope showing book selection interface."}}}};var b,S,w;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(z=(C=d.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};const Be=["BookScope","ChapterScope","VerseScope","SelectedBooksScope"];export{p as BookScope,a as ChapterScope,d as SelectedBooksScope,i as VerseScope,Be as __namedExportsOrder,he as default};
