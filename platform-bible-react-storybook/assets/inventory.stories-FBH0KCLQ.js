import{j as e}from"./jsx-runtime-IhsRMfz-.js";import{A as Te,D as be}from"./data-table.component-Bqs5VS68.js";import{T as ke,b as _e,c as W,d as B,e as je,f as M}from"./table-ByenYIBD.js";import{F as Ce,e as re,w as E}from"./index-DDGSC55c.js";import{r as d}from"./iframe-BEkIYDFd.js";import{C as Ne}from"./checkbox-CSEmJPa4.js";import{I as Re}from"./input-DD3RO-T6.js";import{L as Ve}from"./label-2j3HyiWL.js";import{S as U,a as $,b as F,c as P,d as w}from"./select-CQljjvzI.js";import{B as j}from"./button-BUqiHGDC.js";import{T as Ae,a as D}from"./toggle-group-dFUeD_Ru.js";import{C as qe}from"./circle-check-WR4-0ipO.js";import{C as Ee}from"./circle-x-B0cMDBmI.js";import{C as De}from"./circle-help-CEzqjDuL.js";import{A as Oe}from"./arrow-up-CYDNC_58.js";import{c as ze}from"./createLucideIcon-V2TOh_E5.js";import{T as He}from"./theme-provider.component-CFcMaVWS.js";import"./index-UQF4trVD.js";import"./dropdown-menu-cI8zSGd3.js";import"./index-ChySRygr.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-DTAXz6r9.js";import"./index-BoooQ5Vc.js";import"./index-XxVU_kFc.js";import"./index-WYM9zlxO.js";import"./index-CBWjV_pj.js";import"./index-BiU24exg.js";import"./index-2dpMA6jy.js";import"./index-Dmd90w97.js";import"./index-CVhpxhbt.js";import"./index-wBtfa0qv.js";import"./index-22B1sOri.js";import"./floating-ui.react-dom-B6oF68L7.js";import"./index-CLfA14le.js";import"./index-B0vq7zLc.js";import"./index-B3C1qyps.js";import"./index-D_yOVkU1.js";import"./index-DPxc3de3.js";import"./index-B0tvycoj.js";import"./index-2zOqEBvV.js";import"./index-Dan0uWk1.js";import"./index-DWP0h7Ug.js";import"./check-VfS0hG9j.js";import"./circle-Dd5Jid4n.js";import"./chevron-right-9Uc-PIlE.js";import"./filter-o_IYXWyB.js";import"./arrow-right-CZlovsfJ.js";import"./chevron-left-VpJY7mYW.js";import"./skeleton-D3MYmrce.js";import"./index-Bl2C2VvJ.js";import"./preload-helper-CTOgD26E.js";import"./index-nn3clDEh.js";import"./index-BaQP4hhM.js";import"./index-C-VxI_Sc.js";import"./chevron-down-DUPlHsA5.js";import"./chevron-up-CnB98DIp.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],We=ze("ArrowDown",Ge);function Be(s){const t=[];let r=0;const o=/\\\\(.+?)\\\\/g;let n;for(;(n=o.exec(s))!==null;)n.index>r&&t.push(s.substring(r,n.index)),t.push(e.jsx("strong",{children:n[1]},n.index)),r=o.lastIndex;return r<s.length&&t.push(s.substring(r)),t.length>0?t:[s]}function ne({occurrenceData:s,setScriptureReference:t,localizedStrings:r,classNameForText:o}){const n=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],u=d.useMemo(()=>{const c=[],p=new Set;return s.forEach(m=>{const T=`${m.reference.book}:${m.reference.chapterNum}:${m.reference.verseNum}:${m.text}`;p.has(T)||(p.add(T),c.push(m))}),c},[s]);return e.jsxs(ke,{stickyHeader:!0,children:[e.jsx(_e,{stickyHeader:!0,children:e.jsxs(W,{children:[e.jsx(B,{children:n}),e.jsx(B,{children:a})]})}),e.jsx(je,{children:u.length>0&&u.map(c=>e.jsxs(W,{onClick:()=>{t(c.reference)},children:[e.jsx(M,{children:Ce(c.reference,"English")}),e.jsx(M,{className:o,children:Be(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}ne.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`},classNameForText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the occurrence text"}}};const C=s=>s==="asc"?e.jsx(Oe,{className:"tw-ms-2 tw-h-4 tw-w-4"}):s==="desc"?e.jsx(We,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(Te,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Me=s=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>e.jsxs(j,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[s,C(t.getIsSorted())]})}),Ue=(s,t)=>({accessorKey:`item${t}`,accessorFn:r=>r.items[t],header:({column:r})=>e.jsxs(j,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[s,C(r.getIsSorted())]})}),$e=s=>({accessorKey:"count",header:({column:t})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(j,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[s,C(t.getIsSorted())]})}),cell:({row:t})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),O=(s,t,r,o,n,a)=>{let u=[...r];s.forEach(p=>{t==="approved"?u.includes(p)||u.push(p):u=u.filter(m=>m!==p)}),o(u);let c=[...n];s.forEach(p=>{t==="unapproved"?c.includes(p)||c.push(p):c=c.filter(m=>m!==p)}),a(c)},Fe=(s,t,r,o,n)=>({accessorKey:"status",header:({column:a})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(j,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[s,C(a.getIsSorted())]})}),cell:({row:a})=>{const u=a.getValue("status"),c=a.getValue("item");return e.jsxs(Ae,{value:u,variant:"outline",type:"single",children:[e.jsx(D,{onClick:p=>{p.stopPropagation(),O([c],"approved",t,r,o,n)},value:"approved",children:e.jsx(qe,{})}),e.jsx(D,{onClick:p=>{p.stopPropagation(),O([c],"unapproved",t,r,o,n)},value:"unapproved",children:e.jsx(Ee,{})}),e.jsx(D,{onClick:p=>{p.stopPropagation(),O([c],"unknown",t,r,o,n)},value:"unknown",children:e.jsx(De,{})})]})}}),Pe=(s,t,r)=>r.includes(s)?"unapproved":t.includes(s)?"approved":"unknown",Ke=(s,t,r)=>{let o=s;return t!=="all"&&(o=o.filter(n=>t==="approved"&&n.status==="approved"||t==="unapproved"&&n.status==="unapproved"||t==="unknown"&&n.status==="unknown")),r!==""&&(o=o.filter(n=>n.items[0].includes(r))),o},Ye=(s,t,r)=>{const o=[];return s.forEach(n=>{const a=o.find(u=>re(u.items,E(n.inventoryText)?[n.inventoryText]:n.inventoryText));if(a)a.count+=1,a.occurrences.push({reference:n.verseRef,text:n.verse});else{const u={items:E(n.inventoryText)?[n.inventoryText]:n.inventoryText,count:1,status:Pe(E(n.inventoryText)?n.inventoryText:n.inventoryText[0],t,r),occurrences:[{reference:n.verseRef,text:n.verse}]};o.push(u)}}),o},h=(s,t)=>s[t]??t;function S({inventoryItems:s,setVerseRef:t,localizedStrings:r,additionalItemsLabels:o,approvedItems:n,unapprovedItems:a,scope:u,onScopeChange:c,columns:p,id:m,areInventoryItemsLoading:T=!1,classNameForVerseText:oe}){const ie=h(r,"%webView_inventory_all%"),ae=h(r,"%webView_inventory_approved%"),ce=h(r,"%webView_inventory_unapproved%"),pe=h(r,"%webView_inventory_unknown%"),ue=h(r,"%webView_inventory_scope_currentBook%"),de=h(r,"%webView_inventory_scope_chapter%"),le=h(r,"%webView_inventory_scope_verse%"),me=h(r,"%webView_inventory_filter_text%"),he=h(r,"%webView_inventory_show_additional_items%"),fe=h(r,"%webView_inventory_no_results%"),[v,ve]=d.useState(!1),[N,ye]=d.useState("all"),[R,we]=d.useState(""),[V,A]=d.useState([]),q=d.useMemo(()=>{const i=s??[];return i.length===0?[]:Ye(i,n,a)},[s,n,a]),g=d.useMemo(()=>{if(v)return q;const i=[];return q.forEach(l=>{const f=l.items[0],y=i.find(x=>x.items[0]===f);y?(y.count+=l.count,y.occurrences=y.occurrences.concat(l.occurrences)):i.push({items:[f],count:l.count,occurrences:l.occurrences,status:l.status})}),i},[v,q]),I=d.useMemo(()=>g.length===0?[]:Ke(g,N,R),[g,N,R]),ge=d.useMemo(()=>{var f,y;if(!v)return p;const i=(f=o==null?void 0:o.tableHeaders)==null?void 0:f.length;if(!i)return p;const l=[];for(let x=0;x<i;x++)l.push(Ue(((y=o==null?void 0:o.tableHeaders)==null?void 0:y[x])||"Additional Item",x+1));return[...l,...p]},[o==null?void 0:o.tableHeaders,p,v]);d.useEffect(()=>{I.length===0?A([]):I.length===1&&A(I[0].items)},[I]);const xe=(i,l)=>{l.setRowSelection(()=>{const f={};return f[i.index]=!0,f}),A(i.original.items)},Ie=i=>{if(i==="book"||i==="chapter"||i==="verse")c(i);else throw new Error(`Invalid scope value: ${i}`)},Se=i=>{if(i==="all"||i==="approved"||i==="unapproved"||i==="unknown")ye(i);else throw new Error(`Invalid status filter value: ${i}`)},G=d.useMemo(()=>{if(g.length===0||V.length===0)return[];const i=g.filter(l=>re(v?l.items:[l.items[0]],V));if(i.length>1)throw new Error("Selected item is not unique");return i.length===0?[]:i[0].occurrences},[V,v,g]);return e.jsxs("div",{id:m,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(U,{onValueChange:i=>Se(i),defaultValue:N,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(F,{placeholder:"Select filter"})}),e.jsxs(P,{children:[e.jsx(w,{value:"all",children:ie}),e.jsx(w,{value:"approved",children:ae}),e.jsx(w,{value:"unapproved",children:ce}),e.jsx(w,{value:"unknown",children:pe})]})]}),e.jsxs(U,{onValueChange:i=>Ie(i),defaultValue:u,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(F,{placeholder:"Select scope"})}),e.jsxs(P,{children:[e.jsx(w,{value:"book",children:ue}),e.jsx(w,{value:"chapter",children:de}),e.jsx(w,{value:"verse",children:le})]})]}),e.jsx(Re,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:me,value:R,onChange:i=>{we(i.target.value)}}),o&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Ne,{className:"tw-m-1",checked:v,onCheckedChange:i=>{ve(i)}}),e.jsx(Ve,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??he})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(be,{columns:ge,data:I,onRowClickHandler:xe,stickyHeader:!0,isLoading:T,noResultsMessage:fe})}),G.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ne,{classNameForText:oe,occurrenceData:G,setScriptureReference:t,localizedStrings:r})})]})}S.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"union",raw:"InventoryItem[] | undefined",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"},areInventoryItemsLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the inventory items are still loading",defaultValue:{value:"false",computed:!1}},classNameForVerseText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the provided occurrence verse text in the `OccurrencesTable` component"}}};const z={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse"},Je=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"JHN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4},{inventoryText:"word  word",verse:"Every word  word has meaning",verseRef:{book:"MAT",chapterNum:4,verseNum:4},offset:6}],se="book",H=(s,t,r,o,n,a,u)=>[Me(s),$e(t),Fe(r,o,n,a,u)],Lt={title:"Advanced/Inventory",component:S,tags:["autodocs"],decorators:[s=>e.jsx(He,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(s,{})})})]},b={render:()=>{const[s,t]=d.useState(["the the"]),[r,o]=d.useState(["and and","word  word"]);return e.jsx(S,{inventoryItems:Je,setVerseRef:n=>console.log("Set verse ref:",n),localizedStrings:z,approvedItems:s,unapprovedItems:r,scope:se,onScopeChange:n=>console.log("Scope changed:",n),columns:H("Item","Count","Status",s,t,r,o)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},k={render:()=>{const s=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"GEN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4}],[t,r]=d.useState(["and and"]),[o,n]=d.useState(["the the","is is"]);return e.jsx(S,{inventoryItems:s,setVerseRef:a=>console.log("Set verse ref:",a),localizedStrings:z,approvedItems:t,unapprovedItems:o,scope:"chapter",onScopeChange:a=>console.log("Scope changed:",a),columns:H("Repeated Words","Count","Status",t,r,o,n)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}},_={render:()=>{const[s,t]=d.useState([]),[r,o]=d.useState([]);return e.jsx(S,{inventoryItems:[],setVerseRef:n=>console.log("Set verse ref:",n),localizedStrings:z,approvedItems:s,unapprovedItems:r,scope:se,onScopeChange:n=>console.log("Scope changed:",n),columns:H("Item","Count","Status",s,t,r,o)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var K,Y,J;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(J=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var X,Q,Z;k.parameters={...k.parameters,docs:{...(X=k.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var L,ee,te;_.parameters={..._.parameters,docs:{...(L=_.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(te=(ee=_.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const er=["Default","RepeatedWords","EmptyInventory"];export{b as Default,_ as EmptyInventory,k as RepeatedWords,er as __namedExportsOrder,Lt as default};
