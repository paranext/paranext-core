import{j as e}from"./jsx-runtime-BqcUmbcY.js";import{T as F}from"./theme-provider.component-Bj38Kzrh.js";import{c as G}from"./index.es-LuWhpyxP.js";import{r as p}from"./iframe-ZKpGX0KN.js";import{B as X}from"./button-DYE7RU8d.js";import{L as m}from"./label-BApzt2Yf.js";import{R as J,a as x}from"./radio-group-B3YGUqmt.js";import{C as T}from"./combo-box.component-B7Pkl_Ue.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-BudW6VR5.js";import"./index-TgqKh979.js";import"./index-CnloVQJn.js";import"./index-Bg_4tnBj.js";import"./index-PNcVeA5e.js";import"./index-eTMKcc8H.js";import"./index-DM87G3Od.js";import"./index-BvMfdTkh.js";import"./index-Ca38kZSS.js";import"./index--kh8Y710.js";import"./index-ruZt9Za8.js";import"./index-C1xKAuWJ.js";import"./index-DvNDNgFp.js";import"./index-D26TI6Bv.js";import"./popover-1WBeLCQq.js";import"./z-index-BATlIu8s.js";import"./index-CS8xc6DM.js";import"./index-BN6WLbyU.js";import"./index-BA1Ox0Ff.js";import"./command-EOU9t6sG.js";import"./index-xObK63o5.js";import"./dialog-CReSc4In.js";import"./createReactComponent-DlDi6iFi.js";import"./input-group-Cv_Axpb7.js";import"./input-C3oppNdn.js";import"./IconCheck-o2t_6qgP.js";import"./chevron-down-K66MgTwN.js";import"./createLucideIcon-TqLaCPYn.js";import"./check-C8GKxndM.js";function U({startChapter:o,endChapter:r,handleSelectStartChapter:a,handleSelectEndChapter:s,isDisabled:i=!1,chapterCount:n}){const c=p.useMemo(()=>Array.from({length:n},(t,d)=>d+1),[n]),h=t=>{a(t),t>r&&s(t)},u=t=>{s(t),t<o&&a(t)};return e.jsxs(e.Fragment,{children:[e.jsx(m,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(T,{isDisabled:i,onChange:h,buttonClassName:"tw:me-2 tw:ms-2 tw:w-20",options:c,getOptionLabel:t=>t.toString(),value:o},"start chapter"),e.jsx(m,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(T,{isDisabled:i,onChange:u,buttonClassName:"tw:ms-2 tw:w-20",options:c,getOptionLabel:t=>t.toString(),value:r},"end chapter")]})}U.__docgenInfo={description:`ChapterRangeSelector is a component that provides a UI for selecting a range of chapters. It
consists of two combo boxes for selecting the start and end chapters. The component ensures that
the selected start chapter is always less than or equal to the end chapter, and vice versa.

@deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
  is discouraged and it may be removed in the future.
@param {ChapterRangeSelectorProps} props - The props for the component.`,methods:[],displayName:"ChapterRangeSelector",props:{startChapter:{required:!0,tsType:{name:"number"},description:"The selected start chapter"},endChapter:{required:!0,tsType:{name:"number"},description:"The selected end chapter"},handleSelectStartChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the start chapter"},handleSelectEndChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the end chapter"},isDisabled:{required:!1,tsType:{name:"boolean"},description:"Flag to disable the component",defaultValue:{value:"false",computed:!1}},chapterCount:{required:!0,tsType:{name:"number"},description:"The total number of chapters available"}}};var w=(o=>(o.CurrentBook="current book",o.ChooseBooks="choose books",o))(w||{});(o=>{o.CURRENT_BOOK="current book",o.CHOOSE_BOOKS="choose books"})(w||(w={}));const B=(o,r)=>o[r]??r;function y({handleBookSelectionModeChange:o,currentBookName:r,onSelectBooks:a,selectedBookIds:s,chapterCount:i,endChapter:n,handleSelectEndChapter:c,startChapter:h,handleSelectStartChapter:u,localizedStrings:t}){const d=B(t,"%webView_bookSelector_currentBook%"),V=B(t,"%webView_bookSelector_choose%"),D=B(t,"%webView_bookSelector_chooseBooks%"),[C,K]=p.useState("current book"),A=l=>{K(l),o(l)};return e.jsx(J,{className:"pr-twp tw:flex",value:C,onValueChange:l=>A(l),children:e.jsxs("div",{className:"tw:flex tw:w-full tw:flex-col tw:gap-4",children:[e.jsxs("div",{className:"tw:grid tw:grid-cols-[25%_25%_50%]",children:[e.jsxs("div",{className:"tw:flex tw:items-center",children:[e.jsx(x,{value:"current book"}),e.jsx(m,{className:"tw:ms-1",children:d})]}),e.jsx(m,{className:"tw:flex tw:items-center",children:r}),e.jsx("div",{className:"tw:flex tw:items-center tw:justify-end",children:e.jsx(U,{isDisabled:C==="choose books",handleSelectStartChapter:u,handleSelectEndChapter:c,chapterCount:i,startChapter:h,endChapter:n})})]}),e.jsxs("div",{className:"tw:grid tw:grid-cols-[25%_50%_25%]",children:[e.jsxs("div",{className:"tw:flex tw:items-center",children:[e.jsx(x,{value:"choose books"}),e.jsx(m,{className:"tw:ms-1",children:D})]}),e.jsx(m,{className:"tw:flex tw:items-center",children:s.map(l=>G.bookIdToEnglishName(l)).join(", ")}),e.jsx(X,{disabled:C==="current book",onClick:()=>a(),children:V})]})]})})}y.__docgenInfo={description:`BookSelector is a component that provides an interactive UI for selecting books. It can be set to
either allow the user to select a single book or to choose multiple books. In the former case, it
will display the range of chapters in the selected book, and in the latter case it will display a
list of the selected books.

@deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
  is discouraged and it may be removed in the future.
@param {BookSelectorProps} props
@param {function} props.handleBookSelectionModeChange - Callback function to handle changes in
  book selection mode.
@param {string} props.currentBookName - The name of the currently selected book.
@param {function} props.onSelectBooks - Callback function to handle book selection.
@param {string[]} props.selectedBookIds - An array of book IDs that have been selected.
@param {BookSelectorLocalizedStrings} props.localizedStrings - Object containing localized
  strings for the component.`,methods:[],displayName:"BookSelector",props:{startChapter:{required:!0,tsType:{name:"number"},description:"The selected start chapter"},endChapter:{required:!0,tsType:{name:"number"},description:"The selected end chapter"},handleSelectStartChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the start chapter"},handleSelectEndChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the end chapter"},isDisabled:{required:!1,tsType:{name:"boolean"},description:"Flag to disable the component"},chapterCount:{required:!0,tsType:{name:"number"},description:"The total number of chapters available"},handleBookSelectionModeChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newMode: BookSelectionMode) => void",signature:{arguments:[{type:{name:"BookSelectionMode"},name:"newMode"}],return:{name:"void"}}},description:""},currentBookName:{required:!0,tsType:{name:"string"},description:""},onSelectBooks:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},selectedBookIds:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedBookSelectorKey in (typeof BOOK_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof BOOK_SELECTOR_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:""}}};const{fn:g}=__STORYBOOK_MODULE_TEST__,Me={title:"Advanced/BookSelector",component:y,tags:["autodocs"],parameters:{docs:{description:{component:`
> **Deprecated** (Jul 18 2025) — This component is no longer supported or tested. Use of this component is discouraged and it may be removed in the future.

A UI for selecting books and chapter ranges. The user can either use the current book (with a start/end chapter range) or choose multiple books from a picker.
        `}}},decorators:[o=>e.jsx(F,{children:e.jsx("div",{className:"tw:max-w-2xl tw:p-4",children:e.jsx(o,{})})})],args:{currentBookName:"Genesis",chapterCount:50,startChapter:1,endChapter:50,selectedBookIds:["GEN"],localizedStrings:{"%webView_bookSelector_currentBook%":"Current Book","%webView_bookSelector_choose%":"Choose","%webView_bookSelector_chooseBooks%":"Choose Books"},handleBookSelectionModeChange:g(),onSelectBooks:g(),handleSelectStartChapter:g(),handleSelectEndChapter:g()}},k={parameters:{docs:{description:{story:"Default state with the current book selected and a full chapter range."}}}},b={args:{selectedBookIds:["GEN","EXO","LEV","NUM","DEU"]},parameters:{docs:{description:{story:'Shows multiple books already selected in the "Choose Books" list.'}}}},f={render:o=>{const[r,a]=p.useState(1),[s,i]=p.useState(50),[n,c]=p.useState(["GEN"]),[h,u]=p.useState(w.CurrentBook),t=()=>{c(["GEN","EXO","MAT"])};return e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-4",children:[e.jsx(y,{...o,startChapter:r,endChapter:s,selectedBookIds:n,handleSelectStartChapter:a,handleSelectEndChapter:i,handleBookSelectionModeChange:u,onSelectBooks:t}),e.jsxs("p",{className:"tw:text-sm tw:text-muted-foreground",children:["Mode: ",e.jsx("strong",{children:h}),"  |  Chapters: ",e.jsx("strong",{children:r}),"–",e.jsx("strong",{children:s}),"  |  Books:"," ",e.jsx("strong",{children:n.map(d=>G.bookIdToEnglishName(d)).join(", ")})]})]})},parameters:{docs:{description:{story:"Fully interactive story. Toggle between modes, adjust chapter range, or simulate book selection."}}}},S={args:{localizedStrings:{}},parameters:{docs:{description:{story:"When no localized strings are provided the component falls back to displaying the raw localization keys."}}}};var v,j,E;k.parameters={...k.parameters,docs:{...(v=k.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Default state with the current book selected and a full chapter range.'
      }
    }
  }
}`,...(E=(j=k.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var N,_,I;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    selectedBookIds: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU']
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows multiple books already selected in the "Choose Books" list.'
      }
    }
  }
}`,...(I=(_=b.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var O,M,q;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => {
    const [startChapter, setStartChapter] = useState(1);
    const [endChapter, setEndChapter] = useState(50);
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN']);
    const [mode, setMode] = useState<BookSelectionMode>(BookSelectionMode.CurrentBook);
    const handleOnSelectBooks = () => {
      // Simulate picking a couple of extra books
      const nextBooks = ['GEN', 'EXO', 'MAT'];
      setSelectedBookIds(nextBooks);
    };
    return <div className="tw:flex tw:flex-col tw:gap-4">
        <BookSelector {...args} startChapter={startChapter} endChapter={endChapter} selectedBookIds={selectedBookIds} handleSelectStartChapter={setStartChapter} handleSelectEndChapter={setEndChapter} handleBookSelectionModeChange={setMode} onSelectBooks={handleOnSelectBooks} />
        <p className="tw:text-sm tw:text-muted-foreground">
          Mode: <strong>{mode}</strong> &nbsp;|&nbsp; Chapters: <strong>{startChapter}</strong>–
          <strong>{endChapter}</strong> &nbsp;|&nbsp; Books:{' '}
          <strong>{selectedBookIds.map(id => Canon.bookIdToEnglishName(id)).join(', ')}</strong>
        </p>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive story. Toggle between modes, adjust chapter range, or simulate book selection.'
      }
    }
  }
}`,...(q=(M=f.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var z,R,L;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    localizedStrings: {}
  },
  parameters: {
    docs: {
      description: {
        story: 'When no localized strings are provided the component falls back to displaying the raw localization keys.'
      }
    }
  }
}`,...(L=(R=S.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};const qe=["Default","MultipleSelectedBooks","Interactive","MissingLocalizedStrings"];export{k as Default,f as Interactive,S as MissingLocalizedStrings,b as MultipleSelectedBooks,qe as __namedExportsOrder,Me as default};
