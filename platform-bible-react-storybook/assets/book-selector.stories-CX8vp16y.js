import{r as p,j as e}from"./iframe-COb45IwV.js";import{c as G}from"./index.es-LuWhpyxP.js";import{B as F}from"./button-DozBsPq3.js";import{L as m}from"./label-DAR40hub.js";import{R as X,a as x}from"./radio-group-CopLXsIB.js";import{C as T}from"./combo-box.component-BWP_kmBH.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-DboLGT3H.js";import"./index-_kArjOiu.js";import"./index-DDSQ0o7y.js";import"./index-xbo3mtTl.js";import"./index-ZHYHteTF.js";import"./index-BKE2i8Qm.js";import"./index-CQLbl2DG.js";import"./index-9TVXlp2k.js";import"./index-XdW_zJu-.js";import"./index-CIxGC5RY.js";import"./index-DCsVB9P_.js";import"./index-CgTMAuBH.js";import"./popover-DPekFh80.js";import"./z-index-CoNkaVR8.js";import"./index-DdGC6dB2.js";import"./index-DXJqgs70.js";import"./index-Dg2KbB2t.js";import"./command-T9fjYx0n.js";import"./index-CnlbB7yn.js";import"./dialog-hiLx-tmM.js";import"./createReactComponent-DQBVSrXs.js";import"./input-group-QRoyEtfp.js";import"./input-CC4VnbpC.js";import"./IconCheck-DS5AmBfs.js";import"./chevron-down-C_w1_48a.js";import"./createLucideIcon-D5hKx0BG.js";import"./check-C-xupoTo.js";function V({startChapter:o,endChapter:r,handleSelectStartChapter:a,handleSelectEndChapter:s,isDisabled:c=!1,chapterCount:n}){const i=p.useMemo(()=>Array.from({length:n},(t,l)=>l+1),[n]),h=t=>{a(t),t>r&&s(t)},u=t=>{s(t),t<o&&a(t)};return e.jsxs(e.Fragment,{children:[e.jsx(m,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(T,{isDisabled:c,onChange:h,buttonClassName:"tw:me-2 tw:ms-2 tw:w-20",options:i,getOptionLabel:t=>t.toString(),value:o},"start chapter"),e.jsx(m,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(T,{isDisabled:c,onChange:u,buttonClassName:"tw:ms-2 tw:w-20",options:i,getOptionLabel:t=>t.toString(),value:r},"end chapter")]})}V.__docgenInfo={description:`ChapterRangeSelector is a component that provides a UI for selecting a range of chapters. It
consists of two combo boxes for selecting the start and end chapters. The component ensures that
the selected start chapter is always less than or equal to the end chapter, and vice versa.

@deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
  is discouraged and it may be removed in the future.
@param {ChapterRangeSelectorProps} props - The props for the component.`,methods:[],displayName:"ChapterRangeSelector",props:{startChapter:{required:!0,tsType:{name:"number"},description:"The selected start chapter"},endChapter:{required:!0,tsType:{name:"number"},description:"The selected end chapter"},handleSelectStartChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the start chapter"},handleSelectEndChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the end chapter"},isDisabled:{required:!1,tsType:{name:"boolean"},description:"Flag to disable the component",defaultValue:{value:"false",computed:!1}},chapterCount:{required:!0,tsType:{name:"number"},description:"The total number of chapters available"}}};var w=(o=>(o.CurrentBook="current book",o.ChooseBooks="choose books",o))(w||{});(o=>{o.CURRENT_BOOK="current book",o.CHOOSE_BOOKS="choose books"})(w||(w={}));const B=(o,r)=>o[r]??r;function y({handleBookSelectionModeChange:o,currentBookName:r,onSelectBooks:a,selectedBookIds:s,chapterCount:c,endChapter:n,handleSelectEndChapter:i,startChapter:h,handleSelectStartChapter:u,localizedStrings:t}){const l=B(t,"%webView_bookSelector_currentBook%"),D=B(t,"%webView_bookSelector_choose%"),U=B(t,"%webView_bookSelector_chooseBooks%"),[C,K]=p.useState("current book"),A=d=>{K(d),o(d)};return e.jsx(X,{className:"pr-twp tw:flex",value:C,onValueChange:d=>A(d),children:e.jsxs("div",{className:"tw:flex tw:w-full tw:flex-col tw:gap-4",children:[e.jsxs("div",{className:"tw:grid tw:grid-cols-[25%_25%_50%]",children:[e.jsxs("div",{className:"tw:flex tw:items-center",children:[e.jsx(x,{value:"current book"}),e.jsx(m,{className:"tw:ms-1",children:l})]}),e.jsx(m,{className:"tw:flex tw:items-center",children:r}),e.jsx("div",{className:"tw:flex tw:items-center tw:justify-end",children:e.jsx(V,{isDisabled:C==="choose books",handleSelectStartChapter:u,handleSelectEndChapter:i,chapterCount:c,startChapter:h,endChapter:n})})]}),e.jsxs("div",{className:"tw:grid tw:grid-cols-[25%_50%_25%]",children:[e.jsxs("div",{className:"tw:flex tw:items-center",children:[e.jsx(x,{value:"choose books"}),e.jsx(m,{className:"tw:ms-1",children:U})]}),e.jsx(m,{className:"tw:flex tw:items-center",children:s.map(d=>G.bookIdToEnglishName(d)).join(", ")}),e.jsx(F,{disabled:C==="current book",onClick:()=>a(),children:D})]})]})})}y.__docgenInfo={description:`BookSelector is a component that provides an interactive UI for selecting books. It can be set to
either allow the user to select a single book or to choose multiple books. In the former case, it
will display the range of chapters in the selected book, and in the latter case it will display a
list of the selected books.

@deprecated Jul 18 2025. This component is no longer supported or tested and will be removed in a
  later version. To let users select books, use the \`SelectBooks\` component instead (or
  \`ScopeSelector\` to combine scope and book selection).
@param {BookSelectorProps} props
@param {function} props.handleBookSelectionModeChange - Callback function to handle changes in
  book selection mode.
@param {string} props.currentBookName - The name of the currently selected book.
@param {function} props.onSelectBooks - Callback function to handle book selection.
@param {string[]} props.selectedBookIds - An array of book IDs that have been selected.
@param {BookSelectorLocalizedStrings} props.localizedStrings - Object containing localized
  strings for the component.`,methods:[],displayName:"BookSelector",props:{startChapter:{required:!0,tsType:{name:"number"},description:"The selected start chapter"},endChapter:{required:!0,tsType:{name:"number"},description:"The selected end chapter"},handleSelectStartChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the start chapter"},handleSelectEndChapter:{required:!0,tsType:{name:"signature",type:"function",raw:"(chapter: number) => void",signature:{arguments:[{type:{name:"number"},name:"chapter"}],return:{name:"void"}}},description:"Callback function to handle the selection of the end chapter"},isDisabled:{required:!1,tsType:{name:"boolean"},description:"Flag to disable the component"},chapterCount:{required:!0,tsType:{name:"number"},description:"The total number of chapters available"},handleBookSelectionModeChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newMode: BookSelectionMode) => void",signature:{arguments:[{type:{name:"BookSelectionMode"},name:"newMode"}],return:{name:"void"}}},description:""},currentBookName:{required:!0,tsType:{name:"string"},description:""},onSelectBooks:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},selectedBookIds:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedBookSelectorKey in (typeof BOOK_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof BOOK_SELECTOR_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:""}}};const{fn:g}=__STORYBOOK_MODULE_TEST__,Ee={title:"Advanced/🚫 BookSelector",component:y,tags:["autodocs"],parameters:{docs:{description:{component:"\n> **Deprecated** (Jul 18 2025) — This component is no longer supported or tested and will be removed in a later version. To let users select books, use the `SelectBooks` component instead (or `ScopeSelector` to combine scope and book selection).\n\nA UI for selecting books and chapter ranges. The user can either use the current book (with a start/end chapter range) or choose multiple books from a picker.\n        "}}},decorators:[o=>e.jsx("div",{className:"tw:max-w-2xl tw:p-4",children:e.jsx(o,{})})],args:{currentBookName:"Genesis",chapterCount:50,startChapter:1,endChapter:50,selectedBookIds:["GEN"],localizedStrings:{"%webView_bookSelector_currentBook%":"Current Book","%webView_bookSelector_choose%":"Choose","%webView_bookSelector_chooseBooks%":"Choose Books"},handleBookSelectionModeChange:g(),onSelectBooks:g(),handleSelectStartChapter:g(),handleSelectEndChapter:g()}},k={parameters:{docs:{description:{story:"Default state with the current book selected and a full chapter range."}}}},b={args:{selectedBookIds:["GEN","EXO","LEV","NUM","DEU"]},parameters:{docs:{description:{story:'Shows multiple books already selected in the "Choose Books" list.'}}}},S={render:o=>{const[r,a]=p.useState(1),[s,c]=p.useState(50),[n,i]=p.useState(["GEN"]),[h,u]=p.useState(w.CurrentBook),t=()=>{i(["GEN","EXO","MAT"])};return e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-4",children:[e.jsx(y,{...o,startChapter:r,endChapter:s,selectedBookIds:n,handleSelectStartChapter:a,handleSelectEndChapter:c,handleBookSelectionModeChange:u,onSelectBooks:t}),e.jsxs("p",{className:"tw:text-sm tw:text-muted-foreground",children:["Mode: ",e.jsx("strong",{children:h}),"  |  Chapters: ",e.jsx("strong",{children:r}),"–",e.jsx("strong",{children:s}),"  |  Books:"," ",e.jsx("strong",{children:n.map(l=>G.bookIdToEnglishName(l)).join(", ")})]})]})},parameters:{docs:{description:{story:"Fully interactive story. Toggle between modes, adjust chapter range, or simulate book selection."}}}},f={args:{localizedStrings:{}},parameters:{docs:{description:{story:"When no localized strings are provided the component falls back to displaying the raw localization keys."}}}};var v,j,E;k.parameters={...k.parameters,docs:{...(v=k.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(I=(_=b.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var O,M,q;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(q=(M=S.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var z,R,L;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(L=(R=f.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};const Ne=["Default","MultipleSelectedBooks","Interactive","MissingLocalizedStrings"];export{k as Default,S as Interactive,f as MissingLocalizedStrings,b as MultipleSelectedBooks,Ne as __namedExportsOrder,Ee as default};
