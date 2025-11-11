import{j as o}from"./jsx-runtime-CvGToidP.js";import{B as A}from"./button-cud2eTA2.js";import{S as ge,a as fe,b as ye,c as we,e as Ce,d as Se}from"./select-Db4UU3si.js";import{T as be,b as Ne,c as V,d as ke,e as ve,f as Re}from"./table-B4VX8ezE.js";import{c as j}from"./shadcn-ui.util-DMJ19wEV.js";import{m as H}from"./index.es-D4jfZzAn.js";import{u as xe,f as M,b as Te,c as De,d as Ee,e as je}from"./index-CjDI1P3A.js";import{x as I,O as q,g as G}from"./index-Bf4Kv1PK.js";import{r as d,a as Me}from"./iframe-FHgAwj54.js";import{C as Ie}from"./chevron-down-i-XYDP49.js";import{C as Ge}from"./chevron-right-Cncp9OTI.js";import{C as Ae}from"./chevron-left-bdRDGp6P.js";import{T as qe}from"./theme-provider.component-BRfsG9zC.js";import"./index-C6LUVuya.js";import"./index-D-wbo5Oc.js";import"./index-BPbCuWFR.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-BaQP4hhM.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-CnlM3g2y.js";import"./index-DvVrmaIy.js";import"./index-lUSupRFo.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DEtppfdW.js";import"./index-q5xUhQdo.js";import"./check-Ce2iVscw.js";import"./createLucideIcon-B4WsWZHQ.js";const p="scrBook",Oe="scrRef",g="source",Be="details",Je="Scripture Reference",Ve="Scripture Book",ne="Type",He="Details";function $e(e,c){const i=c??!1;return[{accessorFn:t=>`${t.start.book} ${t.start.chapterNum}:${t.start.verseNum}`,id:p,header:(e==null?void 0:e.scriptureReferenceColumnName)??Je,cell:t=>{const n=t.row.original;return t.row.getIsGrouped()?H.bookIdToEnglishName(n.start.book):t.row.groupingColumnId===p?I(n.start):void 0},getGroupingValue:t=>H.bookIdToNumber(t.start.book),sortingFn:(t,n)=>q(t.original.start,n.original.start),enableGrouping:!0},{accessorFn:t=>I(t.start),id:Oe,header:void 0,cell:t=>{const n=t.row.original;return t.row.getIsGrouped()?void 0:I(n.start)},sortingFn:(t,n)=>q(t.original.start,n.original.start),enableGrouping:!1},{accessorFn:t=>t.source.displayName,id:g,header:i?(e==null?void 0:e.typeColumnName)??ne:void 0,cell:t=>i||t.row.getIsGrouped()?t.getValue():void 0,getGroupingValue:t=>t.source.id,sortingFn:(t,n)=>t.original.source.displayName.localeCompare(n.original.source.displayName),enableGrouping:!0},{accessorFn:t=>t.detail,id:Be,header:(e==null?void 0:e.detailsColumnName)??He,cell:t=>t.getValue(),enableGrouping:!1}]}const Ue=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:c}=e.start;let i=0;return e.end&&({offset:i}=e.end),!e.end||q(e.start,e.end)===0?`${G(e.start)}+${c}`:`${G(e.start)}+${c}-${G(e.end)}+${i}`},$=e=>`${Ue({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function O({sources:e,showColumnHeaders:c=!1,showSourceColumn:i=!1,scriptureReferenceColumnName:t,scriptureBookGroupName:n,typeColumnName:u,detailsColumnName:m,onRowSelected:l,id:R}){const[h,B]=d.useState([]),[ie,x]=d.useState([{id:p,desc:!1}]),[J,ce]=d.useState({}),T=d.useMemo(()=>e.flatMap(r=>r.data.map(s=>({...s,source:r.source}))),[e]),ue=d.useMemo(()=>$e({scriptureReferenceColumnName:t,typeColumnName:u,detailsColumnName:m},i),[t,u,m,i]);d.useEffect(()=>{h.includes(g)?x([{id:g,desc:!1},{id:p,desc:!1}]):x([{id:p,desc:!1}])},[h]);const w=xe({data:T,columns:ue,state:{grouping:h,sorting:ie,rowSelection:J},onGroupingChange:B,onSortingChange:x,onRowSelectionChange:ce,getExpandedRowModel:je(),getGroupedRowModel:Ee(),getCoreRowModel:De(),getSortedRowModel:Te(),getRowId:$,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});d.useEffect(()=>{if(l){const r=w.getSelectedRowModel().rowsById,s=Object.keys(r);if(s.length===1){const f=T.find(a=>$(a)===s[0])||void 0;f&&l(f)}}},[J,T,l,w]);const D=n??Ve,E=u??ne,le=[{label:"No Grouping",value:[]},{label:`Group by ${D}`,value:[p]},{label:`Group by ${E}`,value:[g]},{label:`Group by ${D} and ${E}`,value:[p,g]},{label:`Group by ${E} and ${D}`,value:[g,p]}],de=r=>{B(JSON.parse(r))},pe=(r,s)=>{!r.getIsGrouped()&&!r.getIsSelected()&&r.getToggleSelectedHandler()(s)},me=(r,s)=>r.getIsGrouped()?"":j("banded-row",s%2===0?"even":"odd"),he=(r,s,f)=>{if(!((r==null?void 0:r.length)===0||s.depth<f.column.getGroupedIndex())){if(s.getIsGrouped())switch(s.depth){case 1:return"tw-ps-4";default:return}switch(s.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return o.jsxs("div",{id:R,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!c&&o.jsxs(ge,{value:JSON.stringify(h),onValueChange:r=>{de(r)},children:[o.jsx(fe,{className:"tw-mb-1 tw-mt-2",children:o.jsx(ye,{})}),o.jsx(we,{position:"item-aligned",children:o.jsx(Ce,{children:le.map(r=>o.jsx(Se,{value:JSON.stringify(r.value),children:r.label},r.label))})})]}),o.jsxs(be,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[c&&o.jsx(Ne,{children:w.getHeaderGroups().map(r=>o.jsx(V,{children:r.headers.filter(s=>s.column.columnDef.header).map(s=>o.jsx(ke,{colSpan:s.colSpan,className:"top-0 tw-sticky",children:s.isPlaceholder?void 0:o.jsxs("div",{children:[s.column.getCanGroup()?o.jsx(A,{variant:"ghost",title:`Toggle grouping by ${s.column.columnDef.header}`,onClick:s.column.getToggleGroupingHandler(),type:"button",children:s.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",M(s.column.columnDef.header,s.getContext())]})},s.id))},r.id))}),o.jsx(ve,{children:w.getRowModel().rows.map((r,s)=>{const f=Me();return o.jsx(V,{"data-state":r.getIsSelected()?"selected":"",className:j(me(r,s)),onClick:a=>pe(r,a),children:r.getVisibleCells().map(a=>{if(!(a.getIsPlaceholder()||a.column.columnDef.enableGrouping&&!a.getIsGrouped()&&(a.column.columnDef.id!==g||!i)))return o.jsx(Re,{className:j(a.column.columnDef.id,"tw-p-[1px]",he(h,r,a)),children:a.getIsGrouped()?o.jsxs(A,{variant:"link",onClick:r.getToggleExpandedHandler(),type:"button",children:[r.getIsExpanded()&&o.jsx(Ie,{}),!r.getIsExpanded()&&(f==="ltr"?o.jsx(Ge,{}):o.jsx(Ae,{}))," ",M(a.column.columnDef.cell,a.getContext())," (",r.subRows.length,")"]}):M(a.column.columnDef.cell,a.getContext())},a.id)})},r.id)})})]})]})}O.__docgenInfo={description:`Component to display a combined list of detailed items from one or more sources, where the items
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

@type {string}`}]},required:!0},description:"Source/type of detail. Can be used for grouping."}]}}]},{name:"undefined"}]},name:"selectedRow"}],return:{name:"void"}}},description:"Callback function to notify when a row is selected"},id:{required:!1,tsType:{name:"string"},description:"Optional id attribute for the outermost element"}}};const Pe=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"],U=["Missing punctuation at end of verse","Inconsistent capitalization detected","Possible spelling error found","Quotation marks not properly balanced","Unusual word spacing detected","Chapter number formatting issue","Verse number out of sequence","Cross-reference formatting error","Footnote marker missing","Paragraph break issue detected"],P=["Spell Check","Grammar Check","Formatting Check","Reference Check","Consistency Check","Style Check"];function v(e=20){const c=Array.isArray(e)?e.length:e,i=[];for(let t=0;t<c;t++){const n=Math.floor(Math.random()*66)+1,u=Pe[n-1],m=Math.floor(Math.random()*50)+1,l=Math.floor(Math.random()*30)+1,R=Array.isArray(e)?e[t%e.length]:U[Math.floor(Math.random()*U.length)],h=P[Math.floor(Math.random()*P.length)];i.push({start:{bookNum:n,chapterNum:m,verseNum:l,jsonPath:"",book:u,offset:Math.floor(Math.random()*100)},end:{bookNum:n,chapterNum:m,verseNum:l,jsonPath:"",book:u,offset:Math.floor(Math.random()*100)+100},detail:R,source:h})}return i}const Tt={title:"Advanced/ScriptureResultsViewer",component:O,tags:["autodocs"],decorators:[e=>o.jsx(qe,{children:o.jsx("div",{className:"tw-p-4",children:o.jsx(e,{})})})],argTypes:{scriptureReferenceColumnName:{control:"text"},typeColumnName:{control:"text"},detailsColumnName:{control:"text"}}},y=[{id:"preview.repeatedWords",displayName:"Repeated Words",possibleErrors:["Word repeated"]},{id:"preview.characters",displayName:"Characters",possibleErrors:["Invalid character","Unknown character"]},{id:"preview.quotationMarks",displayName:"Quotation Marks",possibleErrors:["Closing first-level quotation mark missing","Closing second-level quotation mark missing","Closing third-level quotation mark missing","Missing continuer"]},{id:"preview.chapterVerseNumbers",displayName:"Chapter/Verse Numbers",possibleErrors:["Missing Verse number","Missing chapter","Empty verse","Verse out of order","Repeated verse number"]}],ae=y.map(e=>({source:e,data:v(e.possibleErrors)})),C={args:{sources:ae,scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"A scripture results viewer showing checking data with default column names."}}}},S={args:{sources:ae,scriptureReferenceColumnName:"Reference",typeColumnName:"Issue Type",detailsColumnName:"Description"},parameters:{docs:{description:{story:"A scripture results viewer with custom column names."}}}},b={args:{sources:[],scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"A scripture results viewer with no data sources."}}}},N={args:{sources:[{source:y[0],data:v(y[0].possibleErrors)}],scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"A scripture results viewer showing results from a single check."}}}},k={render:e=>{const[c,i]=d.useState(()=>y.map(n=>({source:n,data:v(n.possibleErrors)}))),t=n=>{const u=v(y[n].possibleErrors),m={...c[n],data:u},l=[...c];l[n]=m,i(l)};return o.jsxs("div",{className:"tw-h-96 tw-overflow-y-hidden",children:[o.jsx("div",{className:"tw-mb-4",children:y.map((n,u)=>o.jsxs(A,{type:"button",onClick:()=>t(u),className:"tw-mb-2 tw-mr-2",children:["Update ",n.displayName," check results"]},n.id))}),o.jsx(O,{...e,sources:c})]})},args:{scriptureReferenceColumnName:"Scripture Reference",typeColumnName:"Check Type",detailsColumnName:"Error Details"},parameters:{docs:{description:{story:"An interactive scripture results viewer where you can update check results dynamically, matching the original example."}}}};var F,L,X;C.parameters={...C.parameters,docs:{...(F=C.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
    return <div className="tw-h-96 tw-overflow-y-hidden">
        <div className="tw-mb-4">
          {sampleChecks.map((check, index) => <Button key={check.id} type="button" onClick={() => updateSource(index)} className="tw-mb-2 tw-mr-2">
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
}`,...(oe=(se=k.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};const Dt=["Default","CustomColumnNames","EmptyState","SingleCheck","Interactive"];export{S as CustomColumnNames,C as Default,b as EmptyState,k as Interactive,N as SingleCheck,Dt as __namedExportsOrder,Tt as default};
