import{j as e}from"./jsx-runtime-BCWqFc22.js";import{A as Se,D as ke}from"./data-table.component-B-1nEVsF.js";import{T as be,b as Te,c as G,d as W,e as _e,f as $}from"./table-yN5qeprz.js";import{m as je}from"./index.es-D4jfZzAn.js";import{r as u}from"./iframe-D4H6vy13.js";import{C as Ce}from"./checkbox-C0EvHfw6.js";import{I as Ne}from"./input-DBYLY2Wk.js";import{L as Re}from"./label-BQAHlCmc.js";import{S as B,a as M,b as U,c as P,d as w}from"./select-C8V1VmMY.js";import{e as te,N as q}from"./index-DcB2WZF4.js";import{B as _}from"./button-CdZ1NL_l.js";import{T as Ve,a as E}from"./toggle-group-CIU_mkl9.js";import{C as Ae}from"./circle-check-Tj9z8xpW.js";import{C as qe}from"./circle-x-CDFrYsBQ.js";import{C as Ee}from"./circle-help-BNo5x11Y.js";import{A as De}from"./arrow-up-DbRHIMDX.js";import{c as ze}from"./createLucideIcon-Sjh79QfM.js";import{T as Oe}from"./theme-provider.component-CUyKES67.js";import"./index-CMgOuBOm.js";import"./dropdown-menu-DRW-egVC.js";import"./index-BC1uChk6.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-DTAXz6r9.js";import"./index-zeqOlb0X.js";import"./index-Cy-SgJtU.js";import"./index-C0_6PNM5.js";import"./index-DNXzknkU.js";import"./index-C1pSkSrw.js";import"./index-RwtEhj9E.js";import"./index-DTC_Qw5R.js";import"./index-Fw-K9XR6.js";import"./index-9SZFGiTQ.js";import"./index-Bmyp0LJh.js";import"./floating-ui.react-dom-CgSKXkjV.js";import"./index-6ngsv_ay.js";import"./index-Csx9tKk_.js";import"./index-BpZnfpQS.js";import"./index-BaC-R38R.js";import"./index-CmZYTQ7U.js";import"./index-Dxz4sBz1.js";import"./index-VYdWfvWZ.js";import"./index-BkQq8srz.js";import"./index-kj7PR5f2.js";import"./check-CIi-_P5b.js";import"./circle-CY0dxRID.js";import"./chevron-right-ioRKrMKU.js";import"./filter-Ck9vy9xt.js";import"./arrow-right-COtqWYo0.js";import"./chevron-left-BSjZGLTs.js";import"./skeleton-Dod9b212.js";import"./index-BtKK4L4G.js";import"./index-BaQP4hhM.js";import"./index-Cu_Z6Nu8.js";import"./chevron-down-Le6JIpCy.js";import"./chevron-up-CmV3cHC9.js";import"./index-D2w9gCAG.js";import"./index-Czfav6j7.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],Ge=ze("ArrowDown",He);function We(o){const t=[];let r=0;const s=/\\\\(.+?)\\\\/g;let n;for(;(n=s.exec(o))!==null;)n.index>r&&t.push(o.substring(r,n.index)),t.push(e.jsx("strong",{children:n[1]},n.index)),r=s.lastIndex;return r<o.length&&t.push(o.substring(r)),t.length>0?t:[o]}function re({occurrenceData:o,setScriptureReference:t,localizedStrings:r}){const s=r["%webView_inventory_occurrences_table_header_reference%"],n=r["%webView_inventory_occurrences_table_header_occurrence%"],p=u.useMemo(()=>{const a=[],d=new Set;return o.forEach(c=>{const h=`${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;d.has(h)||(d.add(h),a.push(c))}),a},[o]);return e.jsxs(be,{stickyHeader:!0,children:[e.jsx(Te,{stickyHeader:!0,children:e.jsxs(G,{children:[e.jsx(W,{children:s}),e.jsx(W,{children:n})]})}),e.jsx(_e,{children:p.length>0&&p.map(a=>e.jsxs(G,{onClick:()=>{t(a.reference)},children:[e.jsx($,{children:`${je.bookIdToEnglishName(a.reference.book)} ${a.reference.chapterNum}:${a.reference.verseNum}`}),e.jsx($,{children:We(a.text)})]},`${a.reference.book} ${a.reference.chapterNum}:${a.reference.verseNum}-${a.text}`))})]})}re.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`}}};const j=o=>o==="asc"?e.jsx(De,{className:"tw-ms-2 tw-h-4 tw-w-4"}):o==="desc"?e.jsx(Ge,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(Se,{className:"tw-ms-2 tw-h-4 tw-w-4"}),$e=o=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>e.jsxs(_,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[o,j(t.getIsSorted())]})}),Be=(o,t)=>({accessorKey:`item${t}`,accessorFn:r=>r.items[t],header:({column:r})=>e.jsxs(_,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[o,j(r.getIsSorted())]})}),Me=o=>({accessorKey:"count",header:({column:t})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(_,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[o,j(t.getIsSorted())]})}),cell:({row:t})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),D=(o,t,r,s,n,p)=>{let a=[...r];o.forEach(c=>{t==="approved"?a.includes(c)||a.push(c):a=a.filter(h=>h!==c)}),s(a);let d=[...n];o.forEach(c=>{t==="unapproved"?d.includes(c)||d.push(c):d=d.filter(h=>h!==c)}),p(d)},Ue=(o,t,r,s,n)=>({accessorKey:"status",header:({column:p})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(_,{variant:"ghost",onClick:()=>p.toggleSorting(void 0),children:[o,j(p.getIsSorted())]})}),cell:({row:p})=>{const a=p.getValue("status"),d=p.getValue("item");return e.jsxs(Ve,{value:a,variant:"outline",type:"single",children:[e.jsx(E,{onClick:c=>{c.stopPropagation(),D([d],"approved",t,r,s,n)},value:"approved",children:e.jsx(Ae,{})}),e.jsx(E,{onClick:c=>{c.stopPropagation(),D([d],"unapproved",t,r,s,n)},value:"unapproved",children:e.jsx(qe,{})}),e.jsx(E,{onClick:c=>{c.stopPropagation(),D([d],"unknown",t,r,s,n)},value:"unknown",children:e.jsx(Ee,{})})]})}}),Pe=(o,t,r)=>r.includes(o)?"unapproved":t.includes(o)?"approved":"unknown",Ke=(o,t,r)=>{let s=o;return t!=="all"&&(s=s.filter(n=>t==="approved"&&n.status==="approved"||t==="unapproved"&&n.status==="unapproved"||t==="unknown"&&n.status==="unknown")),r!==""&&(s=s.filter(n=>n.items[0].includes(r))),s},Ye=(o,t,r)=>{const s=[];return o.forEach(n=>{const p=s.find(a=>te(a.items,q(n.inventoryText)?[n.inventoryText]:n.inventoryText));if(p)p.count+=1,p.occurrences.push({reference:n.verseRef,text:n.verse});else{const a={items:q(n.inventoryText)?[n.inventoryText]:n.inventoryText,count:1,status:Pe(q(n.inventoryText)?n.inventoryText:n.inventoryText[0],t,r),occurrences:[{reference:n.verseRef,text:n.verse}]};s.push(a)}}),s},m=(o,t)=>o[t]??t;function S({inventoryItems:o,setVerseRef:t,localizedStrings:r,additionalItemsLabels:s,approvedItems:n,unapprovedItems:p,scope:a,onScopeChange:d,columns:c,id:h,areInventoryItemsLoading:oe=!1}){const se=m(r,"%webView_inventory_all%"),ie=m(r,"%webView_inventory_approved%"),ae=m(r,"%webView_inventory_unapproved%"),ce=m(r,"%webView_inventory_unknown%"),pe=m(r,"%webView_inventory_scope_currentBook%"),ue=m(r,"%webView_inventory_scope_chapter%"),de=m(r,"%webView_inventory_scope_verse%"),le=m(r,"%webView_inventory_filter_text%"),me=m(r,"%webView_inventory_show_additional_items%"),he=m(r,"%webView_inventory_no_results%"),[v,fe]=u.useState(!1),[C,ve]=u.useState("all"),[N,ye]=u.useState(""),[R,V]=u.useState([]),A=u.useMemo(()=>{const i=o??[];return i.length===0?[]:Ye(i,n,p)},[o,n,p]),g=u.useMemo(()=>{if(v)return A;const i=[];return A.forEach(l=>{const f=l.items[0],y=i.find(x=>x.items[0]===f);y?(y.count+=l.count,y.occurrences=y.occurrences.concat(l.occurrences)):i.push({items:[f],count:l.count,occurrences:l.occurrences,status:l.status})}),i},[v,A]),I=u.useMemo(()=>g.length===0?[]:Ke(g,C,N),[g,C,N]),we=u.useMemo(()=>{var f,y;if(!v)return c;const i=(f=s==null?void 0:s.tableHeaders)==null?void 0:f.length;if(!i)return c;const l=[];for(let x=0;x<i;x++)l.push(Be(((y=s==null?void 0:s.tableHeaders)==null?void 0:y[x])||"Additional Item",x+1));return[...l,...c]},[s==null?void 0:s.tableHeaders,c,v]);u.useEffect(()=>{I.length===0?V([]):I.length===1&&V(I[0].items)},[I]);const ge=(i,l)=>{l.setRowSelection(()=>{const f={};return f[i.index]=!0,f}),V(i.original.items)},xe=i=>{if(i==="book"||i==="chapter"||i==="verse")d(i);else throw new Error(`Invalid scope value: ${i}`)},Ie=i=>{if(i==="all"||i==="approved"||i==="unapproved"||i==="unknown")ve(i);else throw new Error(`Invalid status filter value: ${i}`)},H=u.useMemo(()=>{if(g.length===0||R.length===0)return[];const i=g.filter(l=>te(v?l.items:[l.items[0]],R));if(i.length>1)throw new Error("Selected item is not unique");return i.length===0?[]:i[0].occurrences},[R,v,g]);return e.jsxs("div",{id:h,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(B,{onValueChange:i=>Ie(i),defaultValue:C,children:[e.jsx(M,{className:"tw-m-1",children:e.jsx(U,{placeholder:"Select filter"})}),e.jsxs(P,{children:[e.jsx(w,{value:"all",children:se}),e.jsx(w,{value:"approved",children:ie}),e.jsx(w,{value:"unapproved",children:ae}),e.jsx(w,{value:"unknown",children:ce})]})]}),e.jsxs(B,{onValueChange:i=>xe(i),defaultValue:a,children:[e.jsx(M,{className:"tw-m-1",children:e.jsx(U,{placeholder:"Select scope"})}),e.jsxs(P,{children:[e.jsx(w,{value:"book",children:pe}),e.jsx(w,{value:"chapter",children:ue}),e.jsx(w,{value:"verse",children:de})]})]}),e.jsx(Ne,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:le,value:N,onChange:i=>{ye(i.target.value)}}),s&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Ce,{className:"tw-m-1",checked:v,onCheckedChange:i=>{fe(i)}}),e.jsx(Re,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(s==null?void 0:s.checkboxText)??me})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ke,{columns:we,data:I,onRowClickHandler:ge,stickyHeader:!0,isLoading:oe,noResultsMessage:he})}),H.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(re,{occurrenceData:H,setScriptureReference:t,localizedStrings:r})})]})}S.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"union",raw:"InventoryItem[] | undefined",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The label by which the item is shown in the inventory (e.g. the word that is repeated in case
   * of the Repeated Words check). It serves as a unique identifier for the item. It usually is a
   * string, but can be a string[] when there are multiple defining attributes (e.g. when 'show
   * preceding marker' is enabled for the Markers Inventory, the preceding marker will be stored as
   * the second item in the array)
   */
  inventoryText: string | string[];
  /** The snippet of scripture where this occurrence of the \`inventoryItem\` is found */
  verse: string;
  /** The reference to the location where the \`verse\` can be found in scripture */
  verseRef: SerializedVerseRef;
  /**
   * Offset used to locate the \`inventoryText\` (or inventoryText[0] in case of an array) in the
   * \`verse\` string
   */
  offset: number;
}`,signature:{properties:[{key:"inventoryText",value:{name:"union",raw:"string | string[]",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}],required:!0},description:`The label by which the item is shown in the inventory (e.g. the word that is repeated in case
of the Repeated Words check). It serves as a unique identifier for the item. It usually is a
string, but can be a string[] when there are multiple defining attributes (e.g. when 'show
preceding marker' is enabled for the Markers Inventory, the preceding marker will be stored as
the second item in the array)`},{key:"verse",value:{name:"string",required:!0},description:"The snippet of scripture where this occurrence of the `inventoryItem` is found"},{key:"verseRef",value:{name:"SerializedVerseRef",required:!0},description:"The reference to the location where the `verse` can be found in scripture"},{key:"offset",value:{name:"number",required:!0},description:"Offset used to locate the `inventoryText` (or inventoryText[0] in case of an array) in the\n`verse` string"}]}}],raw:"InventoryItem[]"},{name:"undefined"}]},description:"The inventory items that the inventory should be populated with"},setVerseRef:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedInventoryKey in (typeof INVENTORY_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof INVENTORY_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:`Object with all localized strings that the Inventory needs to work well across multiple
languages. When using this component with Platform.Bible, you can import
\`INVENTORY_STRING_KEYS\` from this library, pass it in to the Platform's localization hook, and
pass the localized keys that are returned by the hook into this prop.`},additionalItemsLabels:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  checkboxText?: string;
  tableHeaders?: string[];
}`,signature:{properties:[{key:"checkboxText",value:{name:"string",required:!1}},{key:"tableHeaders",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}}]}},description:`Text labels for control elements and additional column headers in case your Inventory has more
than one item to show (e.g. The 'Preceding Marker' in the Markers Inventory)`},approvedItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of approved items, typically as defined in `Settings.xml`"},unapprovedItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of unapproved items, typically as defined in `Settings.xml`"},scope:{required:!0,tsType:{name:"union",raw:"'selectedText' | 'verse' | 'chapter' | 'book' | 'selectedBooks'",elements:[{name:"literal",value:"'selectedText'"},{name:"literal",value:"'verse'"},{name:"literal",value:"'chapter'"},{name:"literal",value:"'book'"},{name:"literal",value:"'selectedBooks'"}]},description:"Scope of scripture that the inventory will operate on"},onScopeChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(scope: Scope) => void",signature:{arguments:[{type:{name:"union",raw:"'selectedText' | 'verse' | 'chapter' | 'book' | 'selectedBooks'",elements:[{name:"literal",value:"'selectedText'"},{name:"literal",value:"'verse'"},{name:"literal",value:"'chapter'"},{name:"literal",value:"'book'"},{name:"literal",value:"'selectedBooks'"}]},name:"scope"}],return:{name:"void"}}},description:"Callback function that is executed when the scope is changed from the Inventory"},columns:{required:!0,tsType:{name:"Array",elements:[{name:"TSColumnDef",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The item (e.g. a character in the characters inventory, a marker in the marker inventory) In
   * most cases the array will only have one element. In case of additional items (e.g. the
   * preceding marker in the markers check), the primary item should be stored in the first index.
   * To show additional items in the inventory, make sure to configure the \`additionalItemsLabels\`
   * prop for the Inventory component
   */
  items: string[];
  /** The number of times this item occurs in the selected scope */
  count: number;
  /** The status of this item (see documentation for \`Status\` type for more information) */
  status: Status;
  /** Occurrences of this item in the scripture text for the selected scope */
  occurrences: InventoryItemOccurrence[];
}`,signature:{properties:[{key:"items",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0},description:`The item (e.g. a character in the characters inventory, a marker in the marker inventory) In
most cases the array will only have one element. In case of additional items (e.g. the
preceding marker in the markers check), the primary item should be stored in the first index.
To show additional items in the inventory, make sure to configure the \`additionalItemsLabels\`
prop for the Inventory component`},{key:"count",value:{name:"number",required:!0},description:"The number of times this item occurs in the selected scope"},{key:"status",value:{name:"union",raw:"'approved' | 'unapproved' | 'unknown'",elements:[{name:"literal",value:"'approved'"},{name:"literal",value:"'unapproved'"},{name:"literal",value:"'unknown'"}],required:!0},description:"The status of this item (see documentation for `Status` type for more information)"},{key:"occurrences",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]",required:!0},description:"Occurrences of this item in the scripture text for the selected scope"}]}},{name:"unknown"}],raw:"TSColumnDef<TData, TValue>"}],raw:"ColumnDef<InventoryTableData>[]"},description:`Column definitions for the Inventory data table. The most commonly used column definitions are
pre-configured for your convenience and can be imported (e.g. inventoryItemColumn,
inventoryAdditionalItemColumn inventoryCountColumn, and inventoryStatusColumn). If you need any
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"},areInventoryItemsLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the inventory items are still loading",defaultValue:{value:"false",computed:!1}}}};const z={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse"},Fe=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"JHN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4},{inventoryText:"word  word",verse:"Every word  word has meaning",verseRef:{book:"MAT",chapterNum:4,verseNum:4},offset:6}],ne="book",O=(o,t,r,s,n,p,a)=>[$e(o),Me(t),Ue(r,s,n,p,a)],Lt={title:"Advanced/Inventory",component:S,tags:["autodocs"],decorators:[o=>e.jsx(Oe,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(o,{})})})]},k={render:()=>{const[o,t]=u.useState(["the the"]),[r,s]=u.useState(["and and","word  word"]);return e.jsx(S,{inventoryItems:Fe,setVerseRef:n=>console.log("Set verse ref:",n),localizedStrings:z,approvedItems:o,unapprovedItems:r,scope:ne,onScopeChange:n=>console.log("Scope changed:",n),columns:O("Item","Count","Status",o,t,r,s)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},b={render:()=>{const o=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"GEN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4}],[t,r]=u.useState(["and and"]),[s,n]=u.useState(["the the","is is"]);return e.jsx(S,{inventoryItems:o,setVerseRef:p=>console.log("Set verse ref:",p),localizedStrings:z,approvedItems:t,unapprovedItems:s,scope:"chapter",onScopeChange:p=>console.log("Scope changed:",p),columns:O("Repeated Words","Count","Status",t,r,s,n)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}},T={render:()=>{const[o,t]=u.useState([]),[r,s]=u.useState([]);return e.jsx(S,{inventoryItems:[],setVerseRef:n=>console.log("Set verse ref:",n),localizedStrings:z,approvedItems:o,unapprovedItems:r,scope:ne,onScopeChange:n=>console.log("Scope changed:",n),columns:O("Item","Count","Status",o,t,r,s)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var K,Y,F;k.parameters={...k.parameters,docs:{...(K=k.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const [approvedItems, setApprovedItems] = useState<string[]>(['the the']);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['and and', 'word  word']);
    return <Inventory inventoryItems={sampleInventoryItems} setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)} localizedStrings={localizedStrings} approvedItems={approvedItems} unapprovedItems={unapprovedItems} scope={defaultScope} onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)} columns={createColumns('Item', 'Count', 'Status', approvedItems, setApprovedItems, unapprovedItems, setUnapprovedItems)} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete inventory component for reviewing and managing translation checking items.'
      }
    }
  }
}`,...(F=(Y=k.parameters)==null?void 0:Y.docs)==null?void 0:F.source}}};var J,X,Q;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    const repeatedWordsItems: InventoryItem[] = [{
      inventoryText: 'the the',
      verse: 'In the the beginning was the Word',
      verseRef: {
        book: 'GEN',
        chapterNum: 1,
        verseNum: 1
      },
      offset: 7
    }, {
      inventoryText: 'and and',
      verse: 'And and God said, Let there be light',
      verseRef: {
        book: 'GEN',
        chapterNum: 1,
        verseNum: 3
      },
      offset: 4
    }, {
      inventoryText: 'is is',
      verse: 'God is is good and merciful',
      verseRef: {
        book: 'PSA',
        chapterNum: 25,
        verseNum: 8
      },
      offset: 4
    }];
    const [approvedItems, setApprovedItems] = useState<string[]>(['and and']);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['the the', 'is is']);
    return <Inventory inventoryItems={repeatedWordsItems} setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)} localizedStrings={localizedStrings} approvedItems={approvedItems} unapprovedItems={unapprovedItems} scope="chapter" onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)} columns={createColumns('Repeated Words', 'Count', 'Status', approvedItems, setApprovedItems, unapprovedItems, setUnapprovedItems)} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory component specifically configured for repeated words checking.'
      }
    }
  }
}`,...(Q=(X=b.parameters)==null?void 0:X.docs)==null?void 0:Q.source}}};var Z,L,ee;T.parameters={...T.parameters,docs:{...(Z=T.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => {
    const [approvedItems, setApprovedItems] = useState<string[]>([]);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>([]);
    return <Inventory inventoryItems={[]} setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)} localizedStrings={localizedStrings} approvedItems={approvedItems} unapprovedItems={unapprovedItems} scope={defaultScope} onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)} columns={createColumns('Item', 'Count', 'Status', approvedItems, setApprovedItems, unapprovedItems, setUnapprovedItems)} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory component with no items to display.'
      }
    }
  }
}`,...(ee=(L=T.parameters)==null?void 0:L.docs)==null?void 0:ee.source}}};const er=["Default","RepeatedWords","EmptyInventory"];export{k as Default,T as EmptyInventory,b as RepeatedWords,er as __namedExportsOrder,Lt as default};
