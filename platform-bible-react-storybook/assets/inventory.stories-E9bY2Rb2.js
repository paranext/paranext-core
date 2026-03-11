import{j as t}from"./jsx-runtime-0Go213k1.js";import{D as Re}from"./data-table.component-CpG4wrZK.js";import{T as Ae,b as qe,c as H,d as P,e as Ee,f as U}from"./table-CqsfWR30.js";import{v as Ge,J as Me,a as F,c as De}from"./index-DgvB8rDJ.js";import{r as p}from"./iframe-bNjfC5uw.js";import{C as Oe}from"./checkbox-CmKAdYm9.js";import{I as ze}from"./input-Bk1sDCmt.js";import{L as He}from"./label-Dbvs2ar4.js";import{S as B,a as W,b as $,c as K,d as g}from"./select-D3UDqIRj.js";import{T as Pe,a as G}from"./toggle-group-DwJPKhFE.js";import{c as Ue,T as Fe,a as Be,b as We}from"./tooltip-DRwEIrSF.js";import{c as $e}from"./shadcn-ui.util-DMJ19wEV.js";import{C as Ke}from"./circle-check-C9PzZbjO.js";import{C as Ye}from"./circle-x-DyZH4arg.js";import{C as Je}from"./circle-help-B61MTcBd.js";import{A as Le}from"./arrow-up--GjeX-rX.js";import{c as Qe}from"./createLucideIcon-BX3vbOio.js";import{T as Xe}from"./theme-provider.component-B0ilSNzl.js";import"./index-BGTmL3a4.js";import"./dropdown-menu-hqyu3dzY.js";import"./index-D6LZFrBV.js";import"./index-BPbCuWFR.js";import"./index-DTAXz6r9.js";import"./index-DSl0yC1i.js";import"./index-Dex35Jx1.js";import"./index-BM-XIx5U.js";import"./index-BquX8890.js";import"./index-qxEUa3Do.js";import"./index-BrBClH4V.js";import"./index-DNvUFeIc.js";import"./index-CHD8lin8.js";import"./index-GDld9hL6.js";import"./index-CRIfLYcB.js";import"./floating-ui.react-dom-Dlfd39BO.js";import"./index-D-7UCR8F.js";import"./index-uphFw2gN.js";import"./index-CfrGbT8J.js";import"./index-DYUz5mHp.js";import"./index-DR41w9_0.js";import"./index-BH5X-dKl.js";import"./index-DXkPpNdh.js";import"./index-qRl1EjvR.js";import"./index-DS6LoWzj.js";import"./check-mpKdXrZD.js";import"./circle-CvH1rjca.js";import"./chevron-right-V7iHuDZO.js";import"./button-C838hrKI.js";import"./filter-Dx90Y-9E.js";import"./arrow-right-yVpLi2YL.js";import"./chevron-left-Apqc8QiK.js";import"./skeleton-KOujB31r.js";import"./index-RSIxtB2F.js";import"./preload-helper-CTOgD26E.js";import"./index-DU7E-sCz.js";import"./index-BaQP4hhM.js";import"./index-D-BZ7qh2.js";import"./chevron-down-CZymMUgy.js";import"./chevron-up-rI8K9jO8.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],et=Qe("ArrowDown",Ze);function tt(n){const e=[];let o=0;const r=/\\\\(.+?)\\\\/g;let s;for(;(s=r.exec(n))!==null;)s.index>o&&e.push(n.substring(o,s.index)),e.push(t.jsx("strong",{children:s[1]},s.index)),o=r.lastIndex;return o<n.length&&e.push(n.substring(o)),e.length>0?e:[n]}function ie({occurrenceData:n,setScriptureReference:e,localizedStrings:o,classNameForText:r}){const s=o["%webView_inventory_occurrences_table_header_reference%"],c=o["%webView_inventory_occurrences_table_header_occurrence%"],d=p.useMemo(()=>{const i=[],u=new Set;return n.forEach(l=>{const b=`${l.reference.book}:${l.reference.chapterNum}:${l.reference.verseNum}:${l.text}`;u.has(b)||(u.add(b),i.push(l))}),i},[n]);return t.jsxs(Ae,{stickyHeader:!0,children:[t.jsx(qe,{stickyHeader:!0,children:t.jsxs(H,{children:[t.jsx(P,{children:s}),t.jsx(P,{children:c})]})}),t.jsx(Ee,{children:d.length>0&&d.map(i=>t.jsxs(H,{onClick:()=>{e(i.reference)},children:[t.jsx(U,{children:Ge(i.reference,"English")}),t.jsx(U,{className:r,children:tt(i.text)})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}ie.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`},classNameForText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the occurrence text"}}};const rt=n=>{if(n==="asc")return t.jsx(Le,{className:"tw-h-4 tw-w-4"});if(n==="desc")return t.jsx(et,{className:"tw-h-4 tw-w-4"})},I=(n,e,o)=>t.jsx(Ue,{children:t.jsxs(Fe,{children:[t.jsxs(Be,{className:$e("tw-flex tw-w-full tw-justify-start",o),variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),rt(n.getIsSorted())]}),t.jsx(We,{side:"bottom",children:e})]})}),ue=n=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>I(e,n)}),nt=(n,e)=>({accessorKey:`item${e}`,accessorFn:o=>o.items[e],header:({column:o})=>I(o,n)}),pe=n=>({accessorKey:"count",header:({column:e})=>I(e,n,"tw-justify-end"),cell:({row:e})=>t.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),M=(n,e,o,r,s,c)=>{let d=[...o];n.forEach(u=>{e==="approved"?d.includes(u)||d.push(u):d=d.filter(l=>l!==u)}),r(d);let i=[...s];n.forEach(u=>{e==="unapproved"?i.includes(u)||i.push(u):i=i.filter(l=>l!==u)}),c(i)},de=(n,e,o,r,s)=>({accessorKey:"status",header:({column:c})=>I(c,n,"tw-justify-center"),cell:({row:c})=>{const d=c.getValue("status"),i=c.getValue("item");return t.jsxs(Pe,{value:d,variant:"outline",type:"single",className:"tw-gap-0",children:[t.jsx(G,{onClick:u=>{u.stopPropagation(),M([i],"approved",e,o,r,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:t.jsx(Ke,{})}),t.jsx(G,{onClick:u=>{u.stopPropagation(),M([i],"unapproved",e,o,r,s)},value:"unapproved",className:"tw-rounded-none",children:t.jsx(Ye,{})}),t.jsx(G,{onClick:u=>{u.stopPropagation(),M([i],"unknown",e,o,r,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:t.jsx(Je,{})})]})}});I.__docgenInfo={description:`Generates a responsive column header for inventory columns with tooltip and sorting functionality

@param column The column received from ColumnDef.header
@param label The label field to display in the header and tooltip
@returns A ReactNode representing the header`,methods:[],displayName:"getInventoryHeader"};const ot=(n,e,o)=>o.includes(n)?"unapproved":e.includes(n)?"approved":"unknown",st=(n,e,o)=>{let r=n;return e!=="all"&&(r=r.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),o!==""&&(r=r.filter(s=>s.items[0].includes(o))),r},at=(n,e,o)=>n.map(r=>{const s=F(r.key)?r.key:r.key[0];return{items:F(r.key)?[r.key]:r.key,count:r.count,status:r.status||ot(s,e,o),occurrences:r.occurrences||[]}}),f=(n,e)=>n[e]??e;function x({inventoryItems:n,setVerseRef:e,localizedStrings:o,additionalItemsLabels:r,approvedItems:s,unapprovedItems:c,scope:d,onScopeChange:i,columns:u,id:l,areInventoryItemsLoading:b=!1,classNameForVerseText:le,onItemSelected:O}){const he=f(o,"%webView_inventory_all%"),fe=f(o,"%webView_inventory_approved%"),ve=f(o,"%webView_inventory_unapproved%"),ye=f(o,"%webView_inventory_unknown%"),ge=f(o,"%webView_inventory_scope_currentBook%"),we=f(o,"%webView_inventory_scope_chapter%"),ke=f(o,"%webView_inventory_scope_verse%"),Ie=f(o,"%webView_inventory_filter_text%"),xe=f(o,"%webView_inventory_show_additional_items%"),Se=f(o,"%webView_inventory_no_results%"),[y,be]=p.useState(!1),[V,Te]=p.useState("all"),[R,Ne]=p.useState(""),[A,q]=p.useState([]),E=p.useMemo(()=>{const a=n??[];return a.length===0?[]:at(a,s,c)},[n,s,c]),w=p.useMemo(()=>{if(y)return E;const a=[];return E.forEach(m=>{const v=m.items[0],h=a.find(k=>k.items[0]===v);h?(h.count+=m.count,h.occurrences=h.occurrences.concat(m.occurrences)):a.push({items:[v],count:m.count,occurrences:m.occurrences,status:m.status})}),a},[y,E]),S=p.useMemo(()=>w.length===0?[]:st(w,V,R),[w,V,R]),_e=p.useMemo(()=>{var v,h;if(!y)return u;const a=(v=r==null?void 0:r.tableHeaders)==null?void 0:v.length;if(!a)return u;const m=[];for(let k=0;k<a;k++)m.push(nt(((h=r==null?void 0:r.tableHeaders)==null?void 0:h[k])||"Additional Item",k+1));return[...m,...u]},[r==null?void 0:r.tableHeaders,u,y]);p.useEffect(()=>{S.length===0?q([]):S.length===1&&q(S[0].items)},[S]);const Ce=(a,m)=>{m.setRowSelection(()=>{const h={};return h[a.index]=!0,h});const v=a.original.items;q(v),O&&v.length>0&&O(v[0])},je=a=>{if(a==="book"||a==="chapter"||a==="verse")i(a);else throw new Error(`Invalid scope value: ${a}`)},Ve=a=>{if(a==="all"||a==="approved"||a==="unapproved"||a==="unknown")Te(a);else throw new Error(`Invalid status filter value: ${a}`)},z=p.useMemo(()=>{if(w.length===0||A.length===0)return[];const a=w.filter(m=>Me(y?m.items:[m.items[0]],A));if(a.length>1)throw new Error("Selected item is not unique");return a.length===0?[]:a[0].occurrences},[A,y,w]);return t.jsxs("div",{id:l,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[t.jsxs("div",{className:"tw-flex tw-items-stretch",children:[t.jsxs(B,{onValueChange:a=>Ve(a),defaultValue:V,children:[t.jsx(W,{className:"tw-m-1",children:t.jsx($,{placeholder:"Select filter"})}),t.jsxs(K,{children:[t.jsx(g,{value:"all",children:he}),t.jsx(g,{value:"approved",children:fe}),t.jsx(g,{value:"unapproved",children:ve}),t.jsx(g,{value:"unknown",children:ye})]})]}),t.jsxs(B,{onValueChange:a=>je(a),defaultValue:d,children:[t.jsx(W,{className:"tw-m-1",children:t.jsx($,{placeholder:"Select scope"})}),t.jsxs(K,{children:[t.jsx(g,{value:"book",children:ge}),t.jsx(g,{value:"chapter",children:we}),t.jsx(g,{value:"verse",children:ke})]})]}),t.jsx(ze,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:Ie,value:R,onChange:a=>{Ne(a.target.value)}}),r&&t.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[t.jsx(Oe,{className:"tw-m-1",checked:y,onCheckedChange:a=>{be(a)}}),t.jsx(He,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(r==null?void 0:r.checkboxText)??xe})]})]}),t.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:t.jsx(Re,{columns:_e,data:S,onRowClickHandler:Ce,stickyHeader:!0,isLoading:b,noResultsMessage:Se})}),z.length>0&&t.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:t.jsx(ie,{classNameForText:le,occurrenceData:z,setScriptureReference:e,localizedStrings:o})})]})}x.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"union",raw:"InventorySummaryItem[] | undefined",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"},areInventoryItemsLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the inventory items are still loading",defaultValue:{value:"false",computed:!1}},classNameForVerseText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the provided occurrence verse text in the `OccurrencesTable` component"},onItemSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemKey: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemKey"}],return:{name:"void"}}},description:"Optional callback that is called when an item is selected. Receives the selected item key."}}};const j={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse"},ct=[{key:"the the",count:1,occurrences:[{reference:{book:"JHN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]},{key:"word  word",count:1,occurrences:[{reference:{book:"MAT",chapterNum:4,verseNum:4},text:"Every word  word has meaning"}]}],me="book",D=(n,e,o,r,s,c,d)=>[ue(n),pe(e),de(o,r,s,c,d)],lr={title:"Advanced/Inventory",component:x,tags:["autodocs"],decorators:[n=>t.jsx(Xe,{children:t.jsx("div",{className:"tw-p-4",children:t.jsx(n,{})})})]},T={render:()=>{const[n,e]=p.useState(["the the"]),[o,r]=p.useState(["and and","word  word"]);return t.jsx(x,{inventoryItems:ct,setVerseRef:s=>console.log("Set verse ref:",s),localizedStrings:j,approvedItems:n,unapprovedItems:o,scope:me,onScopeChange:s=>console.log("Scope changed:",s),columns:D("Item","Count","Status",n,e,o,r)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},N={render:()=>{const n=[{key:"the the",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]}],[e,o]=p.useState(["and and"]),[r,s]=p.useState(["the the","is is"]);return t.jsx(x,{inventoryItems:n,setVerseRef:c=>console.log("Set verse ref:",c),localizedStrings:j,approvedItems:e,unapprovedItems:r,scope:"chapter",onScopeChange:c=>console.log("Scope changed:",c),columns:D("Repeated Words","Count","Status",e,o,r,s)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}};function Y(n,e){const o=De(e),r=new RegExp(`(^|[\\s.])${o}([\\s.]|$)`);return n.find(s=>r.test(s))}const J=["xt - Cross Reference - Target References","toc2 - File - Short Table of Contents Text","fig - Auxiliary - Figure/Illustration/Map","f - Footnote","fq - Footnote - Footnote Translation Quotation"],it=(n,e,o,r)=>[ue("Marker"),pe("Count"),{accessorKey:"styleName",accessorFn:s=>Y(J,s.items[0])||"unknownMarkerLabel",header:({column:s})=>I(s,"Style Name"),cell:({row:s})=>{const c=s.getValue("item");return Y(J,c)||"unknownMarkerLabel"}},de("Status",n,e,o,r)],_={render:()=>{const n=[{key:["xt","p"],count:3,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:1},text:"In the beginning God created the heavens and the earth."}]},{key:["f","v"],count:5,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:'And God said, "Let there be light," and there was light.'}]},{key:["toc2","c"],count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"The LORD is good and upright; therefore he instructs sinners in his ways."}]},{key:["fig","p"],count:2,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:28},text:'God blessed them and said to them, "Be fruitful and increase in number."'}]}],[e,o]=p.useState(["xt"]),[r,s]=p.useState(["f"]);return t.jsx(x,{inventoryItems:n,setVerseRef:c=>console.log("Set verse ref:",c),localizedStrings:j,approvedItems:e,unapprovedItems:r,additionalItemsLabels:{checkboxText:"Show Preceding Markers",tableHeaders:["Preceding Markers"]},scope:"chapter",onScopeChange:c=>console.log("Scope changed:",c),columns:it(e,o,r,s)})},parameters:{docs:{description:{story:"Inventory component for checking markers."}}}},C={render:()=>{const[n,e]=p.useState([]),[o,r]=p.useState([]);return t.jsx(x,{inventoryItems:[],setVerseRef:s=>console.log("Set verse ref:",s),localizedStrings:j,approvedItems:n,unapprovedItems:o,scope:me,onScopeChange:s=>console.log("Scope changed:",s),columns:D("Item","Count","Status",n,e,o,r)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var L,Q,X;T.parameters={...T.parameters,docs:{...(L=T.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(X=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,te;N.parameters={...N.parameters,docs:{...(Z=N.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(te=(ee=N.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var re,ne,oe;_.parameters={..._.parameters,docs:{...(re=_.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(oe=(ne=_.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var se,ae,ce;C.parameters={...C.parameters,docs:{...(se=C.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(ce=(ae=C.parameters)==null?void 0:ae.docs)==null?void 0:ce.source}}};const hr=["Default","RepeatedWords","MarkersInventory","EmptyInventory"];export{T as Default,C as EmptyInventory,_ as MarkersInventory,N as RepeatedWords,hr as __namedExportsOrder,lr as default};
