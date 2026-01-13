import{j as n}from"./jsx-runtime-IhsRMfz-.js";import{r as s}from"./iframe-BEkIYDFd.js";import{S as l}from"./scope-selector.component-Cd5yLN3q.js";import{T as v}from"./theme-provider.component-CFcMaVWS.js";import"./preload-helper-CTOgD26E.js";import"./book-item.utils-zoJ3nFE1.js";import"./command-7X8wokro.js";import"./index-CVLiV-0S.js";import"./index-WYM9zlxO.js";import"./index-XxVU_kFc.js";import"./index-DPxc3de3.js";import"./index-CLfA14le.js";import"./index-Dan0uWk1.js";import"./index-BiU24exg.js";import"./index-2dpMA6jy.js";import"./index-wBtfa0qv.js";import"./index-22B1sOri.js";import"./index-DWP0h7Ug.js";import"./index-CBWjV_pj.js";import"./index-527Jm9Pv.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-C1cIpGkJ.js";import"./x-C0Cp72uN.js";import"./createLucideIcon-V2TOh_E5.js";import"./search-CWhFy9LD.js";import"./index.es-D4jfZzAn.js";import"./index-DDGSC55c.js";import"./index-Bl2C2VvJ.js";import"./check-VfS0hG9j.js";import"./badge-BfqkkXaG.js";import"./index-BPbCuWFR.js";import"./button-BUqiHGDC.js";import"./popover-DT77T75A.js";import"./index-DTAXz6r9.js";import"./index-CVhpxhbt.js";import"./floating-ui.react-dom-B6oF68L7.js";import"./index-B0vq7zLc.js";import"./index-B3C1qyps.js";import"./index-D_yOVkU1.js";import"./index-B0tvycoj.js";import"./chevrons-up-down-S4vttpHN.js";import"./label-2j3HyiWL.js";import"./radio-group-BfE_EELs.js";import"./index-2zOqEBvV.js";import"./index-BoooQ5Vc.js";import"./index-Dmd90w97.js";import"./index-nn3clDEh.js";import"./circle-Dd5Jid4n.js";const _="1".repeat(123),k=new Map([["GEN",{localizedId:"Gen",localizedName:"Genesis"}],["EXO",{localizedId:"Exo",localizedName:"Exodus"}],["LEV",{localizedId:"Lev",localizedName:"Leviticus"}],["NUM",{localizedId:"Num",localizedName:"Numbers"}],["DEU",{localizedId:"Deu",localizedName:"Deuteronomy"}],["MAT",{localizedId:"Mat",localizedName:"Matthew"}],["MRK",{localizedId:"Mrk",localizedName:"Mark"}],["LUK",{localizedId:"Luk",localizedName:"Luke"}],["JHN",{localizedId:"Jhn",localizedName:"John"}],["ROM",{localizedId:"Rom",localizedName:"Romans"}]]),Ie={title:"Advanced/Scope Selector",component:l,tags:["autodocs"],decorators:[o=>n.jsx(v,{children:n.jsx("div",{className:"tw-max-w-md tw-p-4",children:n.jsx(o,{})})})]},p={render:()=>{const[o,c]=s.useState("book"),[t,r]=s.useState(["GEN","MAT"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to book scope with book selection capabilities."}}}},a={render:()=>{const[o,c]=s.useState("chapter"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to chapter scope."}}}},i={render:()=>{const[o,c]=s.useState("verse"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to verse scope."}}}},d={render:()=>{const[o,c]=s.useState("selectedBooks"),[t,r]=s.useState(["GEN","EXO","MAT","JHN"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector with selected books scope showing book selection interface."}}}};var b,S,m;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(m=(S=p.parameters)==null?void 0:S.docs)==null?void 0:m.source}}};var w,u,h;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(z=(C=d.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};const ge=["BookScope","ChapterScope","VerseScope","SelectedBooksScope"];export{p as BookScope,a as ChapterScope,d as SelectedBooksScope,i as VerseScope,ge as __namedExportsOrder,Ie as default};
