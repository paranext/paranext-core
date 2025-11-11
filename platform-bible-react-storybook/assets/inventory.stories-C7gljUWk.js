import{j as e}from"./jsx-runtime-CvGToidP.js";import{A as ke,D as Te}from"./data-table.component-Bja-CxMh.js";import{T as be,b as _e,c as M,d as U,e as je,f as W}from"./table-B4VX8ezE.js";import{m as Ce}from"./index.es-D4jfZzAn.js";import{a as z,b as q}from"./index-Bf4Kv1PK.js";import{r as u}from"./iframe-FHgAwj54.js";import{C as Re}from"./checkbox-B9DyLOT9.js";import{I as Ne}from"./input-BU551Jib.js";import{L as Ve}from"./label-B_TcSZF3.js";import{S as B,a as $,b as P,c as K,d as y}from"./select-Db4UU3si.js";import{B as _}from"./button-cud2eTA2.js";import{T as Ae,a as E}from"./toggle-group-m-jQmysA.js";import{C as qe}from"./circle-check-DRRbzZoK.js";import{C as Ee}from"./circle-x-Axk1cWpG.js";import{C as De}from"./circle-help-DWfkWpCO.js";import{c as re}from"./createLucideIcon-B4WsWZHQ.js";import{T as ze}from"./theme-provider.component-BRfsG9zC.js";import"./index-CjDI1P3A.js";import"./dropdown-menu-CmJD305T.js";import"./menu.context-BrEJJXIC.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-CnlM3g2y.js";import"./index-DvVrmaIy.js";import"./index-D-wbo5Oc.js";import"./index-C6LUVuya.js";import"./index-lUSupRFo.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DLzBYexm.js";import"./index--W5ZaJkm.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./check-Ce2iVscw.js";import"./circle-EX5G5xxd.js";import"./chevron-right-Cncp9OTI.js";import"./filter-HnPcgLh2.js";import"./arrow-right-DKiik7w5.js";import"./chevron-left-bdRDGp6P.js";import"./skeleton-VGhCf4P8.js";import"./index-DEtppfdW.js";import"./index-BaQP4hhM.js";import"./index-q5xUhQdo.js";import"./chevron-down-i-XYDP49.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],He=re("ArrowDown",Oe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],Me=re("ArrowUp",Ge);function ne({occurrenceData:o,setScriptureReference:t,localizedStrings:r}){const s=r["%webView_inventory_occurrences_table_header_reference%"],n=r["%webView_inventory_occurrences_table_header_occurrence%"],c=u.useMemo(()=>{const a=[];return o.forEach(d=>{a.some(p=>z(p,d))||a.push(d)}),a},[o]);return e.jsxs(be,{stickyHeader:!0,children:[e.jsx(_e,{stickyHeader:!0,children:e.jsxs(M,{children:[e.jsx(U,{children:s}),e.jsx(U,{children:n})]})}),e.jsx(je,{children:c.length>0&&c.map(a=>e.jsxs(M,{onClick:()=>{t(a.reference)},children:[e.jsx(W,{children:`${Ce.bookIdToEnglishName(a.reference.book)} ${a.reference.chapterNum}:${a.reference.verseNum}`}),e.jsx(W,{children:a.text})]},`${a.reference.book} ${a.reference.chapterNum}:${a.reference.verseNum}-${a.text}`))})]})}ne.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`}}};const j=o=>o==="asc"?e.jsx(Me,{className:"tw-ms-2 tw-h-4 tw-w-4"}):o==="desc"?e.jsx(He,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(ke,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Ue=o=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>e.jsxs(_,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[o,j(t.getIsSorted())]})}),We=(o,t)=>({accessorKey:`item${t}`,accessorFn:r=>r.items[t],header:({column:r})=>e.jsxs(_,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[o,j(r.getIsSorted())]})}),Be=o=>({accessorKey:"count",header:({column:t})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(_,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[o,j(t.getIsSorted())]})}),cell:({row:t})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),D=(o,t,r,s,n,c)=>{let a=[...r];o.forEach(p=>{t==="approved"?a.includes(p)||a.push(p):a=a.filter(x=>x!==p)}),s(a);let d=[...n];o.forEach(p=>{t==="unapproved"?d.includes(p)||d.push(p):d=d.filter(x=>x!==p)}),c(d)},$e=(o,t,r,s,n)=>({accessorKey:"status",header:({column:c})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(_,{variant:"ghost",onClick:()=>c.toggleSorting(void 0),children:[o,j(c.getIsSorted())]})}),cell:({row:c})=>{const a=c.getValue("status"),d=c.getValue("item");return e.jsxs(Ae,{value:a,variant:"outline",type:"single",children:[e.jsx(E,{onClick:p=>{p.stopPropagation(),D([d],"approved",t,r,s,n)},value:"approved",children:e.jsx(qe,{})}),e.jsx(E,{onClick:p=>{p.stopPropagation(),D([d],"unapproved",t,r,s,n)},value:"unapproved",children:e.jsx(Ee,{})}),e.jsx(E,{onClick:p=>{p.stopPropagation(),D([d],"unknown",t,r,s,n)},value:"unknown",children:e.jsx(De,{})})]})}}),Pe=(o,t,r)=>r.includes(o)?"unapproved":t.includes(o)?"approved":"unknown",Ke=(o,t,r)=>{let s=o;return t!=="all"&&(s=s.filter(n=>t==="approved"&&n.status==="approved"||t==="unapproved"&&n.status==="unapproved"||t==="unknown"&&n.status==="unknown")),r!==""&&(s=s.filter(n=>n.items[0].includes(r))),s},Ye=(o,t,r)=>{const s=[];return o.forEach(n=>{const c=s.find(a=>z(a.items,q(n.inventoryText)?[n.inventoryText]:n.inventoryText));if(c)c.count+=1,c.occurrences.push({reference:n.verseRef,text:n.verse});else{const a={items:q(n.inventoryText)?[n.inventoryText]:n.inventoryText,count:1,status:Pe(q(n.inventoryText)?n.inventoryText:n.inventoryText[0],t,r),occurrences:[{reference:n.verseRef,text:n.verse}]};s.push(a)}}),s},m=(o,t)=>o[t]??t;function S({inventoryItems:o,setVerseRef:t,localizedStrings:r,additionalItemsLabels:s,approvedItems:n,unapprovedItems:c,scope:a,onScopeChange:d,columns:p,id:x,areInventoryItemsLoading:se=!1}){const ie=m(r,"%webView_inventory_all%"),ae=m(r,"%webView_inventory_approved%"),ce=m(r,"%webView_inventory_unapproved%"),pe=m(r,"%webView_inventory_unknown%"),ue=m(r,"%webView_inventory_scope_currentBook%"),de=m(r,"%webView_inventory_scope_chapter%"),le=m(r,"%webView_inventory_scope_verse%"),me=m(r,"%webView_inventory_filter_text%"),he=m(r,"%webView_inventory_show_additional_items%"),ve=m(r,"%webView_inventory_no_results%"),[v,fe]=u.useState(!1),[C,ye]=u.useState("all"),[R,we]=u.useState(""),[N,V]=u.useState([]),A=u.useMemo(()=>{const i=o??[];return i.length===0?[]:Ye(i,n,c)},[o,n,c]),w=u.useMemo(()=>{if(v)return A;const i=[];return A.forEach(l=>{const h=l.items[0],f=i.find(g=>g.items[0]===h);f?(f.count+=l.count,f.occurrences=f.occurrences.concat(l.occurrences)):i.push({items:[h],count:l.count,occurrences:l.occurrences,status:l.status})}),i},[v,A]),I=u.useMemo(()=>w.length===0?[]:Ke(w,C,R),[w,C,R]),ge=u.useMemo(()=>{var h,f;if(!v)return p;const i=(h=s==null?void 0:s.tableHeaders)==null?void 0:h.length;if(!i)return p;const l=[];for(let g=0;g<i;g++)l.push(We(((f=s==null?void 0:s.tableHeaders)==null?void 0:f[g])||"Additional Item",g+1));return[...l,...p]},[s==null?void 0:s.tableHeaders,p,v]);u.useEffect(()=>{I.length===0?V([]):I.length===1&&V(I[0].items)},[I]);const xe=(i,l)=>{l.setRowSelection(()=>{const h={};return h[i.index]=!0,h}),V(i.original.items)},Ie=i=>{if(i==="book"||i==="chapter"||i==="verse")d(i);else throw new Error(`Invalid scope value: ${i}`)},Se=i=>{if(i==="all"||i==="approved"||i==="unapproved"||i==="unknown")ye(i);else throw new Error(`Invalid status filter value: ${i}`)},G=u.useMemo(()=>{if(w.length===0||N.length===0)return[];const i=w.filter(l=>z(v?l.items:[l.items[0]],N));if(i.length>1)throw new Error("Selected item is not unique");return i.length===0?[]:i[0].occurrences},[N,v,w]);return e.jsxs("div",{id:x,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(B,{onValueChange:i=>Se(i),defaultValue:C,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(P,{placeholder:"Select filter"})}),e.jsxs(K,{children:[e.jsx(y,{value:"all",children:ie}),e.jsx(y,{value:"approved",children:ae}),e.jsx(y,{value:"unapproved",children:ce}),e.jsx(y,{value:"unknown",children:pe})]})]}),e.jsxs(B,{onValueChange:i=>Ie(i),defaultValue:a,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(P,{placeholder:"Select scope"})}),e.jsxs(K,{children:[e.jsx(y,{value:"book",children:ue}),e.jsx(y,{value:"chapter",children:de}),e.jsx(y,{value:"verse",children:le})]})]}),e.jsx(Ne,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:me,value:R,onChange:i=>{we(i.target.value)}}),s&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Re,{className:"tw-m-1",checked:v,onCheckedChange:i=>{fe(i)}}),e.jsx(Ve,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(s==null?void 0:s.checkboxText)??he})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(Te,{columns:ge,data:I,onRowClickHandler:xe,stickyHeader:!0,isLoading:se,noResultsMessage:ve})}),G.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ne,{occurrenceData:G,setScriptureReference:t,localizedStrings:r})})]})}S.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"union",raw:"InventoryItem[] | undefined",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"},areInventoryItemsLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the inventory items are still loading",defaultValue:{value:"false",computed:!1}}}};const O={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse"},Fe=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"JHN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4},{inventoryText:"word  word",verse:"Every word  word has meaning",verseRef:{book:"MAT",chapterNum:4,verseNum:4},offset:6}],oe="book",H=(o,t,r,s,n,c,a)=>[Ue(o),Be(t),$e(r,s,n,c,a)],Ft={title:"Advanced/Inventory",component:S,tags:["autodocs"],decorators:[o=>e.jsx(ze,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(o,{})})})]},k={render:()=>{const[o,t]=u.useState(["the the"]),[r,s]=u.useState(["and and","word  word"]);return e.jsx(S,{inventoryItems:Fe,setVerseRef:n=>console.log("Set verse ref:",n),localizedStrings:O,approvedItems:o,unapprovedItems:r,scope:oe,onScopeChange:n=>console.log("Scope changed:",n),columns:H("Item","Count","Status",o,t,r,s)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},T={render:()=>{const o=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"GEN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4}],[t,r]=u.useState(["and and"]),[s,n]=u.useState(["the the","is is"]);return e.jsx(S,{inventoryItems:o,setVerseRef:c=>console.log("Set verse ref:",c),localizedStrings:O,approvedItems:t,unapprovedItems:s,scope:"chapter",onScopeChange:c=>console.log("Scope changed:",c),columns:H("Repeated Words","Count","Status",t,r,s,n)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}},b={render:()=>{const[o,t]=u.useState([]),[r,s]=u.useState([]);return e.jsx(S,{inventoryItems:[],setVerseRef:n=>console.log("Set verse ref:",n),localizedStrings:O,approvedItems:o,unapprovedItems:r,scope:oe,onScopeChange:n=>console.log("Scope changed:",n),columns:H("Item","Count","Status",o,t,r,s)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var Y,F,J;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(J=(F=k.parameters)==null?void 0:F.docs)==null?void 0:J.source}}};var X,Q,Z;T.parameters={...T.parameters,docs:{...(X=T.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var L,ee,te;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(te=(ee=b.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const Jt=["Default","RepeatedWords","EmptyInventory"];export{k as Default,b as EmptyInventory,T as RepeatedWords,Jt as __namedExportsOrder,Ft as default};
