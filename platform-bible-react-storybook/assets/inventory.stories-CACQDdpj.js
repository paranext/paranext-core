import{j as e}from"./jsx-runtime-BqcUmbcY.js";import{D as Ge}from"./data-table.component-mevY5iRQ.js";import{T as Me,b as Oe,c as P,d as U,e as ze,f as F}from"./table-BtReNwR2.js";import{O as De,a as He,v as B,N as Pe}from"./index-CnlRi_gH.js";import{r as p}from"./iframe-DVzoy_2T.js";import{C as Ue}from"./checkbox-BcOjzvuN.js";import{I as Fe}from"./input-C3oppNdn.js";import{L as Be}from"./label-DEBz0LIz.js";import{S as W,a as $,b as K,c as Y,d as w}from"./select-5rjS-XOy.js";import{T as ue,a as pe,b as de,c as le}from"./tooltip-EN1HpYHZ.js";import{T as We,a as G}from"./toggle-group-3Ij3vZDE.js";import{c as $e}from"./utils-BPbySc-g.js";import{C as Ke}from"./circle-check-D9Hhsde5.js";import{C as Ye}from"./circle-x-yZ-Q6NEG.js";import{C as Qe}from"./circle-question-mark--BsVHAbP.js";import{A as Je}from"./arrow-up-D32p61LM.js";import{c as Xe}from"./createLucideIcon-jHIlWQwE.js";import"./index-Z6Eq9gwI.js";import"./button-BrOu8u1B.js";import"./index-BnuTq2W6.js";import"./index-KL7XIe3I.js";import"./dropdown-menu-Bzupk4zM.js";import"./menu.context-BfhkbfQa.js";import"./IconCheck-H0BOuOQn.js";import"./createReactComponent-CpHwkYPO.js";import"./IconChevronRight-DsInCE4j.js";import"./index-CDGua9s3.js";import"./index-B5PLzNQN.js";import"./index-Du4Fy0Y1.js";import"./index-CNXBC9Lw.js";import"./index-A3oOgNwG.js";import"./index-CwSQyPQw.js";import"./index-DZERpc4P.js";import"./index-eje3GdQb.js";import"./index-B_MVzxYV.js";import"./index-CoAlinuw.js";import"./index-BiRvx9Ci.js";import"./index-BZ5WnZXT.js";import"./index-CxCaaAIH.js";import"./index-Do5K9IBo.js";import"./index-CaKLRLTq.js";import"./funnel-qEQEun9v.js";import"./arrow-right-BkP7sKX5.js";import"./chevron-right-BQD_cOGG.js";import"./skeleton-Dta6l_1c.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./preload-helper-CTOgD26E.js";import"./index-BkEYcMMh.js";import"./index-BaQP4hhM.js";import"./index-Bh_eLffo.js";import"./z-index-BATlIu8s.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],Le=Xe("arrow-down",Ze);function et(n){const r=[];let o=0;const t=/\\\\(.+?)\\\\/g;let s;for(;(s=t.exec(n))!==null;)s.index>o&&r.push(n.substring(o,s.index)),r.push(e.jsx("strong",{children:s[1]},s.index)),o=t.lastIndex;return o<n.length&&r.push(n.substring(o)),r.length>0?r:[n]}function me({occurrenceData:n,setScriptureReference:r,localizedStrings:o,classNameForText:t}){const s=o["%webView_inventory_occurrences_table_header_reference%"],c=o["%webView_inventory_occurrences_table_header_occurrence%"],d=p.useMemo(()=>{const i=[],u=new Set;return n.forEach(m=>{const b=`${m.reference.book}:${m.reference.chapterNum}:${m.reference.verseNum}:${m.text}`;u.has(b)||(u.add(b),i.push(m))}),i},[n]);return e.jsxs(Me,{stickyHeader:!0,children:[e.jsx(Oe,{stickyHeader:!0,children:e.jsxs(P,{children:[e.jsx(U,{children:s}),e.jsx(U,{children:c})]})}),e.jsx(ze,{children:d.length>0&&d.map(i=>e.jsxs(P,{onClick:()=>{r(i.reference)},children:[e.jsx(F,{children:De(i.reference,"English")}),e.jsx(F,{className:t,children:et(i.text)})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}me.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`},classNameForText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the occurrence text"}}};const tt=n=>{if(n==="asc")return e.jsx(Je,{className:"tw:h-4 tw:w-4"});if(n==="desc")return e.jsx(Le,{className:"tw:h-4 tw:w-4"})},x=(n,r,o)=>e.jsx(ue,{children:e.jsxs(pe,{children:[e.jsxs(de,{className:$e("tw:flex tw:w-full tw:justify-start",o),variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e.jsx("span",{className:"tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis",children:r}),tt(n.getIsSorted())]}),e.jsx(le,{side:"bottom",children:r})]})}),he=n=>({accessorKey:"item",accessorFn:r=>r.items[0],header:({column:r})=>x(r,n)}),rt=(n,r)=>({accessorKey:`item${r}`,accessorFn:o=>o.items[r],header:({column:o})=>x(o,n)}),fe=n=>({accessorKey:"count",header:({column:r})=>x(r,n,"tw:justify-end"),cell:({row:r})=>e.jsx("div",{className:"tw:flex tw:justify-end tw:tabular-nums",children:r.getValue("count")})}),M=(n,r,o,t,s,c)=>{let d=[...o];n.forEach(u=>{r==="approved"?d.includes(u)||d.push(u):d=d.filter(m=>m!==u)}),t(d);let i=[...s];n.forEach(u=>{r==="unapproved"?i.includes(u)||i.push(u):i=i.filter(m=>m!==u)}),c(i)},ve=(n,r,o,t,s)=>({accessorKey:"status",header:({column:c})=>x(c,n,"tw:justify-center"),cell:({row:c})=>{const d=c.getValue("status"),i=c.getValue("item");return e.jsxs(We,{value:d,variant:"outline",type:"single",className:"tw:gap-0",children:[e.jsx(G,{onClick:u=>{u.stopPropagation(),M([i],"approved",r,o,t,s)},value:"approved",className:"tw:rounded-e-none tw:border-e-0",children:e.jsx(Ke,{})}),e.jsx(G,{onClick:u=>{u.stopPropagation(),M([i],"unapproved",r,o,t,s)},value:"unapproved",className:"tw:rounded-none",children:e.jsx(Ye,{})}),e.jsx(G,{onClick:u=>{u.stopPropagation(),M([i],"unknown",r,o,t,s)},value:"unknown",className:"tw:rounded-s-none tw:border-s-0",children:e.jsx(Qe,{})})]})}});x.__docgenInfo={description:`Generates a responsive column header for inventory columns with tooltip and sorting functionality

@param column The column received from ColumnDef.header
@param label The label field to display in the header and tooltip
@returns A ReactNode representing the header`,methods:[],displayName:"getInventoryHeader"};const nt=(n,r,o)=>o.includes(n)?"unapproved":r.includes(n)?"approved":"unknown",ot=(n,r,o)=>{let t=n;return r!=="all"&&(t=t.filter(s=>r==="approved"&&s.status==="approved"||r==="unapproved"&&s.status==="unapproved"||r==="unknown"&&s.status==="unknown")),o!==""&&(t=t.filter(s=>s.items[0].includes(o))),t},st=(n,r,o)=>n.map(t=>{const s=B(t.key)?t.key:t.key[0];return{items:B(t.key)?[t.key]:t.key,count:t.count,status:t.status||nt(s,r,o),occurrences:t.occurrences||[]}}),f=(n,r)=>n[r]??r;function I({inventoryItems:n,setVerseRef:r,localizedStrings:o,additionalItemsLabels:t,approvedItems:s,unapprovedItems:c,scope:d,onScopeChange:i,columns:u,id:m,areInventoryItemsLoading:b=!1,classNameForVerseText:we,onItemSelected:z}){const ge=f(o,"%webView_inventory_all%"),ke=f(o,"%webView_inventory_approved%"),xe=f(o,"%webView_inventory_unapproved%"),Ie=f(o,"%webView_inventory_unknown%"),Se=f(o,"%webView_inventory_scope_currentBook%"),be=f(o,"%webView_inventory_scope_chapter%"),Te=f(o,"%webView_inventory_scope_verse%"),Ne=f(o,"%webView_inventory_filter_text%"),D=f(o,"%webView_inventory_show_additional_items%"),_e=f(o,"%webView_inventory_no_results%"),[y,je]=p.useState(!1),[V,Ce]=p.useState("all"),[R,Ve]=p.useState(""),[A,q]=p.useState([]),E=p.useMemo(()=>{const a=n??[];return a.length===0?[]:st(a,s,c)},[n,s,c]),g=p.useMemo(()=>{if(y)return E;const a=[];return E.forEach(l=>{const v=l.items[0],h=a.find(k=>k.items[0]===v);h?(h.count+=l.count,h.occurrences=h.occurrences.concat(l.occurrences)):a.push({items:[v],count:l.count,occurrences:l.occurrences,status:l.status})}),a},[y,E]),S=p.useMemo(()=>g.length===0?[]:ot(g,V,R),[g,V,R]),Re=p.useMemo(()=>{var v,h;if(!y)return u;const a=(v=t==null?void 0:t.tableHeaders)==null?void 0:v.length;if(!a)return u;const l=[];for(let k=0;k<a;k++)l.push(rt(((h=t==null?void 0:t.tableHeaders)==null?void 0:h[k])||"Additional Item",k+1));return[...l,...u]},[t==null?void 0:t.tableHeaders,u,y]);p.useEffect(()=>{S.length===0?q([]):S.length===1&&q(S[0].items)},[S]);const Ae=(a,l)=>{l.setRowSelection(()=>{const h={};return h[a.index]=!0,h});const v=a.original.items;q(v),z&&v.length>0&&z(v[0])},qe=a=>{if(a==="book"||a==="chapter"||a==="verse")i(a);else throw new Error(`Invalid scope value: ${a}`)},Ee=a=>{if(a==="all"||a==="approved"||a==="unapproved"||a==="unknown")Ce(a);else throw new Error(`Invalid status filter value: ${a}`)},H=p.useMemo(()=>{if(g.length===0||A.length===0)return[];const a=g.filter(l=>He(y?l.items:[l.items[0]],A));if(a.length>1)throw new Error("Selected item is not unique");return a.length===0?[]:a[0].occurrences},[A,y,g]);return e.jsx("div",{id:m,className:"pr-twp tw:h-full tw:overflow-auto",children:e.jsxs("div",{className:"tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col",children:[e.jsxs("div",{className:"tw:flex tw:items-stretch",style:{contain:"inline-size"},children:[e.jsxs(W,{onValueChange:a=>Ee(a),defaultValue:V,children:[e.jsx($,{className:"tw:m-1 tw:w-auto tw:flex-1",children:e.jsx(K,{placeholder:"Select filter"})}),e.jsxs(Y,{children:[e.jsx(w,{value:"all",children:ge}),e.jsx(w,{value:"approved",children:ke}),e.jsx(w,{value:"unapproved",children:xe}),e.jsx(w,{value:"unknown",children:Ie})]})]}),e.jsxs(W,{onValueChange:a=>qe(a),defaultValue:d,children:[e.jsx($,{className:"tw:m-1 tw:w-auto tw:flex-1",children:e.jsx(K,{placeholder:"Select scope"})}),e.jsxs(Y,{children:[e.jsx(w,{value:"book",children:Se}),e.jsx(w,{value:"chapter",children:be}),e.jsx(w,{value:"verse",children:Te})]})]}),e.jsx(Fe,{className:"tw:m-1 tw:flex-1 tw:rounded-md tw:border",placeholder:Ne,value:R,onChange:a=>{Ve(a.target.value)}}),t&&e.jsx(ue,{children:e.jsxs(pe,{children:[e.jsx(de,{asChild:!0,children:e.jsxs("div",{className:"tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border",children:[e.jsx(Ue,{className:"tw:m-1 tw:shrink-0",checked:y,onCheckedChange:a=>{je(a)}}),e.jsx(Be,{className:"tw:m-1 tw:truncate",children:(t==null?void 0:t.checkboxText)??D})]})}),e.jsx(le,{children:(t==null?void 0:t.checkboxText)??D})]})})]}),e.jsx("div",{className:"tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border",children:e.jsx(Ge,{columns:Re,data:S,onRowClickHandler:Ae,stickyHeader:!0,isLoading:b,noResultsMessage:_e})}),H.length>0&&e.jsx("div",{className:"tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border",children:e.jsx(me,{classNameForText:we,occurrenceData:H,setScriptureReference:r,localizedStrings:o})})]})})}I.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"union",raw:"InventorySummaryItem[] | undefined",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** The item key (e.g., character, word, etc.) */
  key: string | string[];
  /** Total count of occurrences */
  count: number;
  /** Status of the item */
  status?: Status;
  /** Detailed occurrences - optional, loaded on demand */
  occurrences?: InventoryItemOccurrence[];
}`,signature:{properties:[{key:"key",value:{name:"union",raw:"string | string[]",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}],required:!0},description:"The item key (e.g., character, word, etc.)"},{key:"count",value:{name:"number",required:!0},description:"Total count of occurrences"},{key:"status",value:{name:"union",raw:"'approved' | 'unapproved' | 'unknown'",elements:[{name:"literal",value:"'approved'"},{name:"literal",value:"'unapproved'"},{name:"literal",value:"'unknown'"}],required:!1},description:"Status of the item"},{key:"occurrences",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]",required:!1},description:"Detailed occurrences - optional, loaded on demand"}]}}],raw:"InventorySummaryItem[]"},{name:"undefined"}]},description:"The inventory items that the inventory should be populated with"},setVerseRef:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"},areInventoryItemsLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the inventory items are still loading",defaultValue:{value:"false",computed:!1}},classNameForVerseText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the provided occurrence verse text in the `OccurrencesTable` component"},onItemSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemKey: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemKey"}],return:{name:"void"}}},description:"Optional callback that is called when an item is selected. Receives the selected item key."}}};const C={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse"},at=[{key:"the the",count:1,occurrences:[{reference:{book:"JHN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]},{key:"word  word",count:1,occurrences:[{reference:{book:"MAT",chapterNum:4,verseNum:4},text:"Every word  word has meaning"}]}],ye="book",O=(n,r,o,t,s,c,d)=>[he(n),fe(r),ve(o,t,s,c,d)],ar={title:"Advanced/Inventory",component:I,tags:["autodocs"],decorators:[n=>e.jsx("div",{className:"tw:p-4",children:e.jsx(n,{})})]},T={render:()=>{const[n,r]=p.useState(["the the"]),[o,t]=p.useState(["and and","word  word"]);return e.jsx(I,{inventoryItems:at,setVerseRef:s=>console.log("Set verse ref:",s),localizedStrings:C,approvedItems:n,unapprovedItems:o,scope:ye,onScopeChange:s=>console.log("Scope changed:",s),columns:O("Item","Count","Status",n,r,o,t)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},N={render:()=>{const n=[{key:"the the",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]}],[r,o]=p.useState(["and and"]),[t,s]=p.useState(["the the","is is"]);return e.jsx(I,{inventoryItems:n,setVerseRef:c=>console.log("Set verse ref:",c),localizedStrings:C,approvedItems:r,unapprovedItems:t,scope:"chapter",onScopeChange:c=>console.log("Scope changed:",c),columns:O("Repeated Words","Count","Status",r,o,t,s)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}};function Q(n,r){const o=Pe(r),t=new RegExp(`(^|[\\s.])${o}([\\s.]|$)`);return n.find(s=>t.test(s))}const J=["xt - Cross Reference - Target References","toc2 - File - Short Table of Contents Text","fig - Auxiliary - Figure/Illustration/Map","f - Footnote","fq - Footnote - Footnote Translation Quotation"],ct=(n,r,o,t)=>[he("Marker"),fe("Count"),{accessorKey:"styleName",accessorFn:s=>Q(J,s.items[0])||"unknownMarkerLabel",header:({column:s})=>x(s,"Style Name"),cell:({row:s})=>{const c=s.getValue("item");return Q(J,c)||"unknownMarkerLabel"}},ve("Status",n,r,o,t)],_={render:()=>{const n=[{key:["xt","p"],count:3,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:1},text:"In the beginning God created the heavens and the earth."}]},{key:["f","v"],count:5,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:'And God said, "Let there be light," and there was light.'}]},{key:["toc2","c"],count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"The LORD is good and upright; therefore he instructs sinners in his ways."}]},{key:["fig","p"],count:2,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:28},text:'God blessed them and said to them, "Be fruitful and increase in number."'}]}],[r,o]=p.useState(["xt"]),[t,s]=p.useState(["f"]);return e.jsx(I,{inventoryItems:n,setVerseRef:c=>console.log("Set verse ref:",c),localizedStrings:C,approvedItems:r,unapprovedItems:t,additionalItemsLabels:{checkboxText:"Show Preceding Markers",tableHeaders:["Preceding Markers"]},scope:"chapter",onScopeChange:c=>console.log("Scope changed:",c),columns:ct(r,o,t,s)})},parameters:{docs:{description:{story:"Inventory component for checking markers."}}}},j={render:()=>{const[n,r]=p.useState([]),[o,t]=p.useState([]);return e.jsx(I,{inventoryItems:[],setVerseRef:s=>console.log("Set verse ref:",s),localizedStrings:C,approvedItems:n,unapprovedItems:o,scope:ye,onScopeChange:s=>console.log("Scope changed:",s),columns:O("Item","Count","Status",n,r,o,t)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var X,Z,L;T.parameters={...T.parameters,docs:{...(X=T.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(L=(Z=T.parameters)==null?void 0:Z.docs)==null?void 0:L.source}}};var ee,te,re;N.parameters={...N.parameters,docs:{...(ee=N.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => {
    const repeatedWordsItems: InventorySummaryItem[] = [{
      key: 'the the',
      count: 1,
      occurrences: [{
        reference: {
          book: 'GEN',
          chapterNum: 1,
          verseNum: 1
        },
        text: 'In the the beginning was the Word'
      }]
    }, {
      key: 'and and',
      count: 1,
      occurrences: [{
        reference: {
          book: 'GEN',
          chapterNum: 1,
          verseNum: 3
        },
        text: 'And and God said, Let there be light'
      }]
    }, {
      key: 'is is',
      count: 1,
      occurrences: [{
        reference: {
          book: 'PSA',
          chapterNum: 25,
          verseNum: 8
        },
        text: 'God is is good and merciful'
      }]
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
}`,...(re=(te=N.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ne,oe,se;_.parameters={..._.parameters,docs:{...(ne=_.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => {
    const markersItems: InventorySummaryItem[] = [{
      key: ['xt', 'p'],
      count: 3,
      occurrences: [{
        reference: {
          book: 'GEN',
          chapterNum: 1,
          verseNum: 1
        },
        text: 'In the beginning God created the heavens and the earth.'
      }]
    }, {
      key: ['f', 'v'],
      count: 5,
      occurrences: [{
        reference: {
          book: 'GEN',
          chapterNum: 1,
          verseNum: 3
        },
        text: 'And God said, "Let there be light," and there was light.'
      }]
    }, {
      key: ['toc2', 'c'],
      count: 1,
      occurrences: [{
        reference: {
          book: 'PSA',
          chapterNum: 25,
          verseNum: 8
        },
        text: 'The LORD is good and upright; therefore he instructs sinners in his ways.'
      }]
    }, {
      key: ['fig', 'p'],
      count: 2,
      occurrences: [{
        reference: {
          book: 'GEN',
          chapterNum: 1,
          verseNum: 28
        },
        text: 'God blessed them and said to them, "Be fruitful and increase in number."'
      }]
    }];
    const [approvedItems, setApprovedItems] = useState<string[]>(['xt']);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['f']);
    return <Inventory inventoryItems={markersItems} setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)} localizedStrings={localizedStrings} approvedItems={approvedItems} unapprovedItems={unapprovedItems} additionalItemsLabels={{
      checkboxText: 'Show Preceding Markers',
      tableHeaders: ['Preceding Markers']
    }} scope="chapter" onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)} columns={createMarkerColumns(approvedItems, setApprovedItems, unapprovedItems, setUnapprovedItems)} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory component for checking markers.'
      }
    }
  }
}`,...(se=(oe=_.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ae,ce,ie;j.parameters={...j.parameters,docs:{...(ae=j.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(ie=(ce=j.parameters)==null?void 0:ce.docs)==null?void 0:ie.source}}};const cr=["Default","RepeatedWords","MarkersInventory","EmptyInventory"];export{T as Default,j as EmptyInventory,_ as MarkersInventory,N as RepeatedWords,cr as __namedExportsOrder,ar as default};
