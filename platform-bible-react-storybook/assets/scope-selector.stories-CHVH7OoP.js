import{j as n}from"./jsx-runtime-CpJVLSOc.js";import{r as s}from"./iframe-yPAa1VDz.js";import{S as l}from"./scope-selector.component-B2s1A_hm.js";import{T as v}from"./theme-provider.component-DixGqTDZ.js";import"./book-item.utils-CxgToK3-.js";import"./command-B8x1x_AT.js";import"./index-Dx3A5YYn.js";import"./index-CrNzMSiX.js";import"./index-C99YDX8w.js";import"./index-ctT1G4HE.js";import"./index-OsuKPKfK.js";import"./index-T4bvVDRr.js";import"./index-BPGejIto.js";import"./index-DcnJBkHD.js";import"./index-Cw0TAvo3.js";import"./index-DHqLgwnr.js";import"./index-Cj8LlVSJ.js";import"./index-5ThZyF2R.js";import"./index-DVCRKRbD.js";import"./index-DxDigvl0.js";import"./index-BqxcBgKB.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-DxSfESH7.js";import"./x-BcVjjpgZ.js";import"./createLucideIcon-BDjl8ByP.js";import"./search-Ceuc_BRJ.js";import"./index.es-D4jfZzAn.js";import"./index-BYC3xje7.js";import"./check-3chwUSWF.js";import"./badge-UkGqvW0P.js";import"./index-BPbCuWFR.js";import"./button-BDR9lzh4.js";import"./popover-BDCIbTy0.js";import"./index-Cz-YcScH.js";import"./floating-ui.react-dom-OoAXyBqi.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-DOMlVbt-.js";import"./index-CF-tLLH3.js";import"./chevrons-up-down-DFzSUQqV.js";import"./label-bNx9NLAp.js";import"./radio-group-D4g4EO_X.js";import"./index-CvkBkUOm.js";import"./index-BI6grIak.js";import"./index-CgWi8wAG.js";import"./index-CKLcROOb.js";import"./circle-1BHq-oi9.js";const _="1".repeat(123),k=new Map([["GEN",{localizedId:"Gen",localizedName:"Genesis"}],["EXO",{localizedId:"Exo",localizedName:"Exodus"}],["LEV",{localizedId:"Lev",localizedName:"Leviticus"}],["NUM",{localizedId:"Num",localizedName:"Numbers"}],["DEU",{localizedId:"Deu",localizedName:"Deuteronomy"}],["MAT",{localizedId:"Mat",localizedName:"Matthew"}],["MRK",{localizedId:"Mrk",localizedName:"Mark"}],["LUK",{localizedId:"Luk",localizedName:"Luke"}],["JHN",{localizedId:"Jhn",localizedName:"John"}],["ROM",{localizedId:"Rom",localizedName:"Romans"}]]),he={title:"Advanced/Scope Selector",component:l,tags:["autodocs"],decorators:[o=>n.jsx(v,{children:n.jsx("div",{className:"tw-max-w-md tw-p-4",children:n.jsx(o,{})})})]},p={render:()=>{const[o,c]=s.useState("book"),[t,r]=s.useState(["GEN","MAT"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to book scope with book selection capabilities."}}}},a={render:()=>{const[o,c]=s.useState("chapter"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to chapter scope."}}}},i={render:()=>{const[o,c]=s.useState("verse"),[t,r]=s.useState([]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector set to verse scope."}}}},d={render:()=>{const[o,c]=s.useState("selectedBooks"),[t,r]=s.useState(["GEN","EXO","MAT","JHN"]);return n.jsx(l,{scope:o,availableBookInfo:_,selectedBookIds:t,onScopeChange:e=>{console.log("Scope changed to:",e),c(e)},onSelectedBookIdsChange:e=>{console.log("Selected books:",e),r(e)},localizedStrings:{"%webView_scope_selector_current_book%":"Current book","%webView_scope_selector_current_chapter%":"Current chapter","%webView_scope_selector_current_verse%":"Current verse","%webView_scope_selector_scope%":"Scope","%webView_scope_selector_choose_books%":"Choose specific books","%webView_book_selector_books_selected%":"books selected","%webView_book_selector_select_books%":"Select books","%webView_book_selector_search_books%":"Search books","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all"},localizedBookNames:k})},parameters:{docs:{description:{story:"Scope selector with selected books scope showing book selection interface."}}}};var b,S,w;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
