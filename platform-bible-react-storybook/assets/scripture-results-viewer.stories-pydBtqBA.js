import{r as d,j as n,b as ge}from"./iframe-Bg16bUpB.js";import{B as A}from"./button-BJQHTSXq.js";import{S as fe,a as ye,b as we,c as Ce,e as Se,d as be}from"./select-Bh-qu_Xt.js";import{T as Ne,b as ke,c as V,d as ve,e as Re,f as xe}from"./table-BcoG3lGK.js";import{c as j}from"./utils-BPbySc-g.js";import{c as H}from"./index.es-LuWhpyxP.js";import{u as Te,f as M,b as De,c as Ee,d as je,e as Me}from"./index-BY3zQNXh.js";import{n as q,O as I,e as G}from"./index-CnlRi_gH.js";import{C as Ie}from"./chevron-down-1xqYwlw3.js";import{a as Ge,C as Ae}from"./chevron-right-CENf81uW.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-DQXf0UQ-.js";import"./createReactComponent-vWb_poFw.js";import"./IconCheck-BuyZZxJd.js";import"./index-BaQP4hhM.js";import"./index-Bg2XXjZV.js";import"./index-CX9lJG7Z.js";import"./index-B7A9Ed5q.js";import"./index-ObiIUBzF.js";import"./index-B845Cln6.js";import"./index-Cx9UEZyE.js";import"./index-DoVg9QsX.js";import"./index-CkEq7Ejk.js";import"./index-Cov1MebO.js";import"./index-Bsg5WJFo.js";import"./index-BU0thIjZ.js";import"./index-Ba5uaDV5.js";import"./index-Bpzm0bLg.js";import"./index-D2t4nnj1.js";import"./createLucideIcon-B-Sm7tvi.js";const p="scrBook",qe="scrRef",g="source",Oe="details",Be="Scripture Reference",Je="Scripture Book",ne="Type",Ve="Details";function He(e,c){const i=c??!1;return[{accessorFn:t=>`${t.start.book} ${t.start.chapterNum}:${t.start.verseNum}`,id:p,header:(e==null?void 0:e.scriptureReferenceColumnName)??Be,cell:t=>{const o=t.row.original;return t.row.getIsGrouped()?H.bookIdToEnglishName(o.start.book):t.row.groupingColumnId===p?I(o.start):void 0},getGroupingValue:t=>H.bookIdToNumber(t.start.book),sortingFn:(t,o)=>q(t.original.start,o.original.start),enableGrouping:!0},{accessorFn:t=>I(t.start),id:qe,header:void 0,cell:t=>{const o=t.row.original;return t.row.getIsGrouped()?void 0:I(o.start)},sortingFn:(t,o)=>q(t.original.start,o.original.start),enableGrouping:!1},{accessorFn:t=>t.source.displayName,id:g,header:i?(e==null?void 0:e.typeColumnName)??ne:void 0,cell:t=>i||t.row.getIsGrouped()?t.getValue():void 0,getGroupingValue:t=>t.source.id,sortingFn:(t,o)=>t.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:t=>t.detail,id:Oe,header:(e==null?void 0:e.detailsColumnName)??Ve,cell:t=>t.getValue(),enableGrouping:!1}]}const $e=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:c}=e.start;let i=0;return e.end&&({offset:i}=e.end),!e.end||q(e.start,e.end)===0?`${G(e.start)}+${c}`:`${G(e.start)}+${c}-${G(e.end)}+${i}`},$=e=>`${$e({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function O({sources:e,showColumnHeaders:c=!1,showSourceColumn:i=!1,scriptureReferenceColumnName:t,scriptureBookGroupName:o,typeColumnName:u,detailsColumnName:m,onRowSelected:l,id:R}){const[h,B]=d.useState([]),[ie,x]=d.useState([{id:p,desc:!1}]),[J,ce]=d.useState({}),T=d.useMemo(()=>e.flatMap(r=>r.data.map(s=>({...s,source:r.source}))),[e]),ue=d.useMemo(()=>He({scriptureReferenceColumnName:t,typeColumnName:u,detailsColumnName:m},i),[t,u,m,i]);d.useEffect(()=>{h.includes(g)?x([{id:g,desc:!1},{id:p,desc:!1}]):x([{id:p,desc:!1}])},[h]);const w=Te({data:T,columns:ue,state:{grouping:h,sorting:ie,rowSelection:J},onGroupingChange:B,onSortingChange:x,onRowSelectionChange:ce,getExpandedRowModel:Me(),getGroupedRowModel:je(),getCoreRowModel:Ee(),getSortedRowModel:De(),getRowId:$,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});d.useEffect(()=>{if(l){const r=w.getSelectedRowModel().rowsById,s=Object.keys(r);if(s.length===1){const f=T.find(a=>$(a)===s[0])||void 0;f&&l(f)}}},[J,T,l,w]);const D=o??Je,E=u??ne,le=[{label:"No Grouping",value:[]},{label:`Group by ${D}`,value:[p]},{label:`Group by ${E}`,value:[g]},{label:`Group by ${D} and ${E}`,value:[p,g]},{label:`Group by ${E} and ${D}`,value:[g,p]}],de=r=>{B(JSON.parse(r))},pe=(r,s)=>{!r.getIsGrouped()&&!r.getIsSelected()&&r.getToggleSelectedHandler()(s)},me=(r,s)=>r.getIsGrouped()?"":j("banded-row",s%2===0?"even":"odd"),he=(r,s,f)=>{if(!((r==null?void 0:r.length)===0||s.depth<f.column.getGroupedIndex())){if(s.getIsGrouped())switch(s.depth){case 1:return"tw:ps-4";default:return}switch(s.depth){case 1:return"tw:ps-8";case 2:return"tw:ps-12";default:return}}};return n.jsxs("div",{id:R,className:"pr-twp tw:flex tw:h-full tw:w-full tw:flex-col",children:[!c&&n.jsxs(fe,{value:JSON.stringify(h),onValueChange:r=>{de(r)},children:[n.jsx(ye,{className:"tw:mb-1 tw:mt-2",children:n.jsx(we,{})}),n.jsx(Ce,{position:"item-aligned",children:n.jsx(Se,{children:le.map(r=>n.jsx(be,{value:JSON.stringify(r.value),children:r.label},r.label))})})]}),n.jsxs(Ne,{className:"tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0",children:[c&&n.jsx(ke,{children:w.getHeaderGroups().map(r=>n.jsx(V,{children:r.headers.filter(s=>s.column.columnDef.header).map(s=>n.jsx(ve,{colSpan:s.colSpan,className:"tw:sticky top-0",children:s.isPlaceholder?void 0:n.jsxs("div",{children:[s.column.getCanGroup()?n.jsx(A,{variant:"ghost",title:`Toggle grouping by ${s.column.columnDef.header}`,onClick:s.column.getToggleGroupingHandler(),type:"button",children:s.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",M(s.column.columnDef.header,s.getContext())]})},s.id))},r.id))}),n.jsx(Re,{children:w.getRowModel().rows.map((r,s)=>{const f=ge();return n.jsx(V,{"data-state":r.getIsSelected()?"selected":"",className:j(me(r,s)),onClick:a=>pe(r,a),children:r.getVisibleCells().map(a=>{if(!(a.getIsPlaceholder()||a.column.columnDef.enableGrouping&&!a.getIsGrouped()&&(a.column.columnDef.id!==g||!i)))return n.jsx(xe,{className:j(a.column.columnDef.id,"tw:p-[1px]",he(h,r,a)),children:a.getIsGrouped()?n.jsxs(A,{variant:"link",onClick:r.getToggleExpandedHandler(),type:"button",children:[r.getIsExpanded()&&n.jsx(Ie,{}),!r.getIsExpanded()&&(f==="ltr"?n.jsx(Ge,{}):n.jsx(Ae,{}))," ",M(a.column.columnDef.cell,a.getContext())," (",r.subRows.length,")"]}):M(a.column.columnDef.cell,a.getContext())},a.id)})},r.id)})})]})]})}O.__docgenInfo={description:`Component to display a combined list of detailed items from one or more sources, where the items
are keyed primarily by Scripture reference. This is particularly useful for displaying a list of
results from Scripture checks, but more generally could be used to display any "results" from any
source(s). The component allows for grouping by Scripture book, source, or both. By default, it
displays somewhat "tree-like" which allows it to be more horizontally compact and intuitive. But
it also has the option of displaying as a traditional table with column headings (with or without
the source column showing).`,methods:[],displayName:"ScriptureResultsViewer",props:{scriptureReferenceColumnName:{required:!1,tsType:{name:"string"},description:"Optional header to display for the Reference column. Default value: 'Scripture Reference'."},scriptureBookGroupName:{required:!1,tsType:{name:"string"},description:"Optional text to display to refer to the Scripture book group. Default value: 'Scripture Book'."},typeColumnName:{required:!1,tsType:{name:"string"},description:"Optional header to display for the Type column. Default value: 'Type'."},detailsColumnName:{required:!1,tsType:{name:"string"},description:"Optional header to display for the Details column. Default value: 'Details'"},sources:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The backing source associated with this set of results.
   *
   * @type {ResultsSource}
   */
  source: ResultsSource;

  /**
   * Array of Scripture item details (messages keyed by Scripture reference).
   *
   * @type {ScriptureItemDetail[]}
   */
  data: ScriptureItemDetail[];
}`,signature:{properties:[{key:"source",value:{name:"signature",type:"object",raw:`{
  /**
   * Uniquely identifies the source.
   *
   * @type {string}
   */
  id: string;

  /**
   * Name (potentially localized) of the source, suitable for display in the UI.
   *
   * @type {string}
   */
  displayName: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:`Uniquely identifies the source.

@type {string}`},{key:"displayName",value:{name:"string",required:!0},description:`Name (potentially localized) of the source, suitable for display in the UI.

@type {string}`}]},required:!0},description:`The backing source associated with this set of results.

@type {ResultsSource}`},{key:"data",value:{name:"Array",elements:[{name:"intersection",raw:`ScriptureSelection & {
  /**
   * Text of the error, note, etc. In the future, we might want to support something more than just
   * text so that a JSX element could be provided with a link or some other controls related to the
   * issue being reported.
   */
  detail: string;
}`,elements:[{name:"ScriptureSelection"},{name:"signature",type:"object",raw:`{
  /**
   * Text of the error, note, etc. In the future, we might want to support something more than just
   * text so that a JSX element could be provided with a link or some other controls related to the
   * issue being reported.
   */
  detail: string;
}`,signature:{properties:[{key:"detail",value:{name:"string",required:!0},description:`Text of the error, note, etc. In the future, we might want to support something more than just
text so that a JSX element could be provided with a link or some other controls related to the
issue being reported.`}]}}]}],raw:"ScriptureItemDetail[]",required:!0},description:`Array of Scripture item details (messages keyed by Scripture reference).

@type {ScriptureItemDetail[]}`}]}}],raw:"ResultsSet[]"},description:"Groups of ScriptureItemDetail objects from particular sources (e.g., Scripture checks)"},showColumnHeaders:{required:!1,tsType:{name:"boolean"},description:"Flag indicating whether to display column headers. Default is false.",defaultValue:{value:"false",computed:!1}},showSourceColumn:{required:!1,tsType:{name:"boolean"},description:"Flag indicating whether to display source column. Default is false.",defaultValue:{value:"false",computed:!1}},onRowSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(selectedRow: ScriptureSrcItemDetail | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"ScriptureSrcItemDetail | undefined",elements:[{name:"intersection",raw:`ScriptureItemDetail & {
  /** Source/type of detail. Can be used for grouping. */
  source: ResultsSource;
}`,elements:[{name:"intersection",raw:`ScriptureSelection & {
  /**
   * Text of the error, note, etc. In the future, we might want to support something more than just
   * text so that a JSX element could be provided with a link or some other controls related to the
   * issue being reported.
   */
  detail: string;
}`,elements:[{name:"ScriptureSelection"},{name:"signature",type:"object",raw:`{
  /**
   * Text of the error, note, etc. In the future, we might want to support something more than just
   * text so that a JSX element could be provided with a link or some other controls related to the
   * issue being reported.
   */
  detail: string;
}`,signature:{properties:[{key:"detail",value:{name:"string",required:!0},description:`Text of the error, note, etc. In the future, we might want to support something more than just
text so that a JSX element could be provided with a link or some other controls related to the
issue being reported.`}]}}]},{name:"signature",type:"object",raw:`{
  /** Source/type of detail. Can be used for grouping. */
  source: ResultsSource;
}`,signature:{properties:[{key:"source",value:{name:"signature",type:"object",raw:`{
  /**
   * Uniquely identifies the source.
   *
   * @type {string}
   */
  id: string;

  /**
   * Name (potentially localized) of the source, suitable for display in the UI.
   *
   * @type {string}
   */
  displayName: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:`Uniquely identifies the source.

@type {string}`},{key:"displayName",value:{name:"string",required:!0},description:`Name (potentially localized) of the source, suitable for display in the UI.

@type {string}`}]},required:!0},description:"Source/type of detail. Can be used for grouping."}]}}]},{name:"undefined"}]},name:"selectedRow"}],return:{name:"void"}}},description:"Callback function to notify when a row is selected"},id:{required:!1,tsType:{name:"string"},description:"Optional id attribute for the outermost element"}}};const Ue=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"],U=["Missing punctuation at end of verse","Inconsistent capitalization detected","Possible spelling error found","Quotation marks not properly balanced","Unusual word spacing detected","Chapter number formatting issue","Verse number out of sequence","Cross-reference formatting error","Footnote marker missing","Paragraph break issue detected"],P=["Spell Check","Grammar Check","Formatting Check","Reference Check","Consistency Check","Style Check"];function v(e=20){const c=Array.isArray(e)?e.length:e,i=[];for(let t=0;t<c;t++){const o=Math.floor(Math.random()*66)+1,u=Ue[o-1],m=Math.floor(Math.random()*50)+1,l=Math.floor(Math.random()*30)+1,R=Array.isArray(e)?e[t%e.length]:U[Math.floor(Math.random()*U.length)],h=P[Math.floor(Math.random()*P.length)];i.push({start:{bookNum:o,chapterNum:m,verseNum:l,jsonPath:"",book:u,offset:Math.floor(Math.random()*100)},end:{bookNum:o,chapterNum:m,verseNum:l,jsonPath:"",book:u,offset:Math.floor(Math.random()*100)+100},detail:R,source:h})}return i}const St={title:"Advanced/ScriptureResultsViewer",component:O,tags:["autodocs"],decorators:[e=>n.jsx("div",{className:"tw:p-4",children:n.jsx(e,{})})],argTypes:{scriptureReferenceColumnName:{control:"text"},typeColumnName:{control:"text"},detailsColumnName:{control:"text"}}},y=[{id:"preview.repeatedWords",displayName:"Repeated Words",possibleErrors:["Word repeated"]},{id:"preview.characters",displayName:"Characters",possibleErrors:["Invalid character","Unknown character"]},{id:"preview.quotationMarks",displayName:"Quotation Marks",possibleErrors:["Closing first-level quotation mark missing","Closing second-level quotation mark missing","Closing third-level quotation mark missing","Missing continuer"]},{id:"preview.chapterVerseNumbers",displayName:"Chapter/Verse Numbers",possibleErrors:["Missing Verse number","Missing chapter","Empty verse","Verse out of order","Repeated verse number"]}],ae=y.map(e=>({source:e,data:v(e.possibleErrors)})),C={args:{sources:ae,scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"A scripture results viewer showing checking data with default column names."}}}},S={args:{sources:ae,scriptureReferenceColumnName:"Reference",typeColumnName:"Issue Type",detailsColumnName:"Description"},parameters:{docs:{description:{story:"A scripture results viewer with custom column names."}}}},b={args:{sources:[],scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"A scripture results viewer with no data sources."}}}},N={args:{sources:[{source:y[0],data:v(y[0].possibleErrors)}],scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"A scripture results viewer showing results from a single check."}}}},k={render:e=>{const[c,i]=d.useState(()=>y.map(o=>({source:o,data:v(o.possibleErrors)}))),t=o=>{const u=v(y[o].possibleErrors),m={...c[o],data:u},l=[...c];l[o]=m,i(l)};return n.jsxs("div",{className:"tw:h-96 tw:overflow-y-hidden",children:[n.jsx("div",{className:"tw:mb-4",children:y.map((o,u)=>n.jsxs(A,{type:"button",onClick:()=>t(u),className:"tw:mb-2 tw:mr-2",children:["Update ",o.displayName," check results"]},o.id))}),n.jsx(O,{...e,sources:c})]})},args:{scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"An interactive scripture results viewer where you can update check results dynamically, matching the original example."}}}};var F,L,X;C.parameters={...C.parameters,docs:{...(F=C.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    sources: staticSources,
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details'
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer showing checking data with default column names.'
      }
    }
  }
}`,...(X=(L=C.parameters)==null?void 0:L.docs)==null?void 0:X.source}}};var z,K,Z;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    sources: staticSources,
    scriptureReferenceColumnName: 'Reference',
    typeColumnName: 'Issue Type',
    detailsColumnName: 'Description'
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer with custom column names.'
      }
    }
  }
}`,...(Z=(K=S.parameters)==null?void 0:K.docs)==null?void 0:Z.source}}};var _,W,Q;b.parameters={...b.parameters,docs:{...(_=b.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    sources: [],
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details'
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer with no data sources.'
      }
    }
  }
}`,...(Q=(W=b.parameters)==null?void 0:W.docs)==null?void 0:Q.source}}};var Y,ee,te;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    sources: [{
      source: sampleChecks[0],
      data: generateRandomCheckingData(sampleChecks[0].possibleErrors)
    }],
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details'
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer showing results from a single check.'
      }
    }
  }
}`,...(te=(ee=N.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var re,se,oe;k.parameters={...k.parameters,docs:{...(re=k.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: args => {
    const [sources, setSources] = useState(() => sampleChecks.map(check => ({
      source: check,
      data: generateRandomCheckingData(check.possibleErrors)
    })));
    const updateSource = (index: number) => {
      const newData = generateRandomCheckingData(sampleChecks[index].possibleErrors);
      const updatedSource = {
        ...sources[index],
        data: newData
      };
      const updatedSources = [...sources];
      updatedSources[index] = updatedSource;
      setSources(updatedSources);
    };
    return <div className="tw:h-96 tw:overflow-y-hidden">
        <div className="tw:mb-4">
          {sampleChecks.map((check, index) => <Button key={check.id} type="button" onClick={() => updateSource(index)} className="tw:mb-2 tw:mr-2">
              Update {check.displayName} check results
            </Button>)}
        </div>
        <ScriptureResultsViewer {...args} sources={sources} />
      </div>;
  },
  args: {
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details'
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive scripture results viewer where you can update check results dynamically, matching the original example.'
      }
    }
  }
}`,...(oe=(se=k.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};const bt=["Default","CustomColumnNames","EmptyState","SingleCheck","Interactive"];export{S as CustomColumnNames,C as Default,b as EmptyState,k as Interactive,N as SingleCheck,bt as __namedExportsOrder,St as default};
