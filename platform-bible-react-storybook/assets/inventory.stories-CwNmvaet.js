import{r as u,j as e}from"./iframe-QtFa4wfL.js";import{D as Ge}from"./data-table.component-BWMusoON.js";import{T as ze,b as Me,c as F,d as U,e as De,f as $}from"./table-DpwNzqJ3.js";import{b as Oe}from"./index-AIIJ_tDp.js";import{u as He}from"./content-zoom-text.context-Bp8Jy0ao.js";import{A as Pe,h as B,s as Fe}from"./scripture-util-DArajUVn-CPHPTCtZ.js";import{C as Ue}from"./checkbox-YDcDiC9Y.js";import{I as $e}from"./input-z667Ty71.js";import{L as Be}from"./label-BNJZvb_3.js";import{S as W,a as K,b as Y,c as Q,d as g}from"./select-xBwDk8K5.js";import{T as pe,a as de,b as le,c as me}from"./tooltip-ux-0IaPA.js";import{T as We,a as z}from"./toggle-group-RbtgTYq1.js";import{c as Ke}from"./utils-BPbySc-g.js";import{C as Ye}from"./circle-check-COIcFCB-.js";import{C as Qe}from"./circle-x-3LcB8K6N.js";import{C as Je}from"./circle-question-mark-BQqNJjht.js";import{A as Xe}from"./arrow-up-CezoVhOX.js";import{c as Ze}from"./createLucideIcon-BQYIVAxF.js";import"./preload-helper-CTOgD26E.js";import"./index-C6T4itlS.js";import"./button-B4r93LFw.js";import"./index-BnuTq2W6.js";import"./index-D6YHWlXZ.js";import"./dropdown-menu-jAdSQDr9.js";import"./menu.context-DkrwUKmF.js";import"./z-index-DiGYIwoM.js";import"./IconChevronRight-BfC2A1-S.js";import"./index-7mVneCqS.js";import"./index-BhgWw5rV.js";import"./index-UR6yQvDI.js";import"./index-DAPJwYe9.js";import"./index-goK9KuNK.js";import"./index-B-LdocwY.js";import"./index-DkhQlTn3.js";import"./index-CEUeK5K_.js";import"./index-CWHL3stg.js";import"./index-BxQ5710E.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BIzHTuLA.js";import"./index-CbkIYif6.js";import"./index-BV2yTUI8.js";import"./createReactComponent-DoJGq_4c.js";import"./IconCheck-DQNeq2OF.js";import"./funnel-XSnA3_PT.js";import"./arrow-left-BRZrHDwM.js";import"./arrow-right-DpL1A0AX.js";import"./skeleton-DBzUAUF6.js";import"./focus.util-DRSEP984.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./index.es-CXoS8DB2.js";import"./index-lIR_bxO-.js";import"./IconSelector-tuKweu0f.js";import"./index-BaQP4hhM.js";import"./index-ukbfpOKe.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],et=Ze("arrow-down",Le);function tt(n){const r=[];let o=0;const t=/\\\\(.+?)\\\\/g;let s;for(;(s=t.exec(n))!==null;)s.index>o&&r.push(n.substring(o,s.index)),r.push(e.jsx("strong",{children:s[1]},s.index)),o=t.lastIndex;return o<n.length&&r.push(n.substring(o)),r.length>0?r:[n]}function he({occurrenceData:n,setScriptureReference:r,localizedStrings:o,classNameForText:t}){const s=He(),i=o["%webView_inventory_occurrences_table_header_reference%"],l=o["%webView_inventory_occurrences_table_header_occurrence%"],p=u.useMemo(()=>{const c=[],v=new Set;return n.forEach(y=>{const T=`${y.reference.book}:${y.reference.chapterNum}:${y.reference.verseNum}:${y.text}`;v.has(T)||(v.add(T),c.push(y))}),c},[n]);return e.jsxs(ze,{stickyHeader:!0,children:[e.jsx(Me,{stickyHeader:!0,children:e.jsxs(F,{children:[e.jsx(U,{children:i}),e.jsx(U,{children:l})]})}),e.jsx(De,{children:p.length>0&&p.map(c=>e.jsxs(F,{onClick:()=>{r(c.reference)},children:[e.jsx($,{children:Pe(c.reference,"English")}),e.jsx($,{className:t,"data-platform-content-zoom-root":s["data-platform-content-zoom-root"],"data-platform-content-zoom-label":s["data-platform-content-zoom-label"],children:tt(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}he.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`},classNameForText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the occurrence text"}}};const rt=n=>{if(n==="asc")return e.jsx(Xe,{className:"tw:h-4 tw:w-4"});if(n==="desc")return e.jsx(et,{className:"tw:h-4 tw:w-4"})},I=(n,r,o)=>e.jsx(pe,{children:e.jsxs(de,{children:[e.jsxs(le,{className:Ke("tw:flex tw:w-full tw:justify-start",o),variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e.jsx("span",{className:"tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis",children:r}),rt(n.getIsSorted())]}),e.jsx(me,{side:"bottom",children:r})]})}),fe=n=>({accessorKey:"item",accessorFn:r=>r.items[0],header:({column:r})=>I(r,n)}),nt=(n,r)=>({accessorKey:`item${r}`,accessorFn:o=>o.items[r],header:({column:o})=>I(o,n)}),ve=n=>({accessorKey:"count",header:({column:r})=>I(r,n,"tw:justify-end"),cell:({row:r})=>e.jsx("div",{className:"tw:flex tw:justify-end tw:tabular-nums",children:r.getValue("count")})}),M=(n,r,o,t,s,i)=>{let l=[...o];n.forEach(c=>{r==="approved"?l.includes(c)||l.push(c):l=l.filter(v=>v!==c)}),t(l);let p=[...s];n.forEach(c=>{r==="unapproved"?p.includes(c)||p.push(c):p=p.filter(v=>v!==c)}),i(p)},ye=(n,r,o,t,s)=>({accessorKey:"status",header:({column:i})=>I(i,n,"tw:justify-center"),cell:({row:i})=>{const l=i.getValue("status"),p=i.getValue("item");return e.jsx("div",{className:"tw:flex tw:justify-center",children:e.jsxs(We,{value:l,variant:"outline",type:"single",className:"tw:gap-0",children:[e.jsx(z,{onClick:c=>{c.stopPropagation(),M([p],"approved",r,o,t,s)},value:"approved",className:"tw:rounded-e-none tw:border-e-0",children:e.jsx(Ye,{})}),e.jsx(z,{onClick:c=>{c.stopPropagation(),M([p],"unapproved",r,o,t,s)},value:"unapproved",className:"tw:rounded-none",children:e.jsx(Qe,{})}),e.jsx(z,{onClick:c=>{c.stopPropagation(),M([p],"unknown",r,o,t,s)},value:"unknown",className:"tw:rounded-s-none tw:border-s-0",children:e.jsx(Je,{})})]})})}});I.__docgenInfo={description:`Generates a responsive column header for inventory columns with tooltip and sorting functionality

@param column The column received from ColumnDef.header
@param label The label field to display in the header and tooltip
@returns A ReactNode representing the header`,methods:[],displayName:"getInventoryHeader"};const ot=(n,r,o)=>o.includes(n)?"unapproved":r.includes(n)?"approved":"unknown",st=(n,r,o)=>{let t=n;return r!=="all"&&(t=t.filter(s=>r==="approved"&&s.status==="approved"||r==="unapproved"&&s.status==="unapproved"||r==="unknown"&&s.status==="unknown")),o!==""&&(t=t.filter(s=>s.items[0].includes(o))),t},at=(n,r,o)=>n.map(t=>{const s=B(t.key)?t.key:t.key[0];return{items:B(t.key)?[t.key]:t.key,count:t.count,status:t.status||ot(s,r,o),occurrences:t.occurrences||[]}}),h=(n,r)=>n[r]??r;function S({inventoryItems:n,setVerseRef:r,localizedStrings:o,additionalItemsLabels:t,approvedItems:s,unapprovedItems:i,scope:l,onScopeChange:p,columns:c,id:v,areInventoryItemsLoading:y=!1,classNameForVerseText:T,onItemSelected:O}){const ge=h(o,"%webView_inventory_all%"),xe=h(o,"%webView_inventory_approved%"),ke=h(o,"%webView_inventory_unapproved%"),Ie=h(o,"%webView_inventory_unknown%"),Se=h(o,"%webView_inventory_scope_currentBook%"),be=h(o,"%webView_inventory_scope_chapter%"),Te=h(o,"%webView_inventory_scope_verse%"),Ne=h(o,"%webView_inventory_filter_text%"),H=h(o,"%webView_inventory_show_additional_items%"),_e=h(o,"%webView_inventory_no_results%"),[w,je]=u.useState(!1),[R,Ce]=u.useState("all"),[A,Ve]=u.useState(""),[q,E]=u.useState([]),G=u.useMemo(()=>{const a=n??[];return a.length===0?[]:at(a,s,i)},[n,s,i]),x=u.useMemo(()=>{if(w)return G;const a=[];return G.forEach(d=>{const f=d.items[0],m=a.find(k=>k.items[0]===f);m?(m.count+=d.count,m.occurrences=m.occurrences.concat(d.occurrences)):a.push({items:[f],count:d.count,occurrences:d.occurrences,status:d.status})}),a},[w,G]),b=u.useMemo(()=>x.length===0?[]:st(x,R,A),[x,R,A]),Re=u.useMemo(()=>{var f,m;if(!w)return c;const a=(f=t==null?void 0:t.tableHeaders)==null?void 0:f.length;if(!a)return c;const d=[];for(let k=0;k<a;k++)d.push(nt(((m=t==null?void 0:t.tableHeaders)==null?void 0:m[k])||"Additional Item",k+1));return[...d,...c]},[t==null?void 0:t.tableHeaders,c,w]);u.useEffect(()=>{b.length===0?E([]):b.length===1&&E(b[0].items)},[b]);const Ae=(a,d)=>{d.setRowSelection(()=>{const m={};return m[a.index]=!0,m});const f=a.original.items;E(f),O&&f.length>0&&O(f[0])},qe=a=>{if(a==="book"||a==="chapter"||a==="verse")p(a);else throw new Error(`Invalid scope value: ${a}`)},Ee=a=>{if(a==="all"||a==="approved"||a==="unapproved"||a==="unknown")Ce(a);else throw new Error(`Invalid status filter value: ${a}`)},P=u.useMemo(()=>{if(x.length===0||q.length===0)return[];const a=x.filter(d=>Oe(w?d.items:[d.items[0]],q));if(a.length>1)throw new Error("Selected item is not unique");return a.length===0?[]:a[0].occurrences},[q,w,x]);return e.jsx("div",{id:v,className:"pr-twp tw:h-full tw:overflow-auto",children:e.jsxs("div",{className:"tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col",children:[e.jsxs("div",{className:"tw:flex tw:items-stretch",style:{contain:"inline-size"},children:[e.jsxs(W,{onValueChange:a=>Ee(a),defaultValue:R,children:[e.jsx(K,{className:"tw:m-1 tw:w-auto tw:flex-1",children:e.jsx(Y,{placeholder:"Select filter"})}),e.jsxs(Q,{children:[e.jsx(g,{value:"all",children:ge}),e.jsx(g,{value:"approved",children:xe}),e.jsx(g,{value:"unapproved",children:ke}),e.jsx(g,{value:"unknown",children:Ie})]})]}),e.jsxs(W,{onValueChange:a=>qe(a),defaultValue:l,children:[e.jsx(K,{className:"tw:m-1 tw:w-auto tw:flex-1",children:e.jsx(Y,{placeholder:"Select scope"})}),e.jsxs(Q,{children:[e.jsx(g,{value:"book",children:Se}),e.jsx(g,{value:"chapter",children:be}),e.jsx(g,{value:"verse",children:Te})]})]}),e.jsx($e,{className:"tw:m-1 tw:flex-1 tw:rounded-md tw:border",placeholder:Ne,value:A,onChange:a=>{Ve(a.target.value)}}),t&&e.jsx(pe,{children:e.jsxs(de,{children:[e.jsx(le,{asChild:!0,children:e.jsxs("div",{className:"tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border",children:[e.jsx(Ue,{className:"tw:m-1 tw:shrink-0",checked:w,onCheckedChange:a=>{je(a)}}),e.jsx(Be,{className:"tw:m-1 tw:truncate",children:(t==null?void 0:t.checkboxText)??H})]})}),e.jsx(me,{children:(t==null?void 0:t.checkboxText)??H})]})})]}),e.jsx("div",{className:"tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border",children:e.jsx(Ge,{columns:Re,data:b,onRowClickHandler:Ae,stickyHeader:!0,isLoading:y,noResultsMessage:_e})}),P.length>0&&e.jsx("div",{className:"tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border",children:e.jsx(he,{classNameForText:T,occurrenceData:P,setScriptureReference:r,localizedStrings:o})})]})})}S.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"union",raw:"InventorySummaryItem[] | undefined",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"},areInventoryItemsLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the inventory items are still loading",defaultValue:{value:"false",computed:!1}},classNameForVerseText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the provided occurrence verse text in the `OccurrencesTable` component"},onItemSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemKey: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemKey"}],return:{name:"void"}}},description:"Optional callback that is called when an item is selected. Receives the selected item key."}}};const V={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse","%webView_inventory_no_results%":"No results."},ct=[{key:"the the",count:1,occurrences:[{reference:{book:"JHN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]},{key:"word  word",count:1,occurrences:[{reference:{book:"MAT",chapterNum:4,verseNum:4},text:"Every word  word has meaning"}]}],we="book",D=(n,r,o,t,s,i,l)=>[fe(n),ve(r),ye(o,t,s,i,l)],pr={title:"Advanced/Inventory",component:S,tags:["autodocs"],decorators:[n=>e.jsx("div",{className:"tw:p-4",children:e.jsx(n,{})})]},N={render:()=>{const[n,r]=u.useState(["the the"]),[o,t]=u.useState(["and and","word  word"]);return e.jsx(S,{inventoryItems:ct,setVerseRef:s=>console.log("Set verse ref:",s),localizedStrings:V,approvedItems:n,unapprovedItems:o,scope:we,onScopeChange:s=>console.log("Scope changed:",s),columns:D("Item","Count","Status",n,r,o,t)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},_={render:()=>{const n=[{key:"the the",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]}],[r,o]=u.useState(["and and"]),[t,s]=u.useState(["the the","is is"]);return e.jsx(S,{inventoryItems:n,setVerseRef:i=>console.log("Set verse ref:",i),localizedStrings:V,approvedItems:r,unapprovedItems:t,scope:"chapter",onScopeChange:i=>console.log("Scope changed:",i),columns:D("Repeated Words","Count","Status",r,o,t,s)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}};function J(n,r){const o=Fe(r),t=new RegExp(`(^|[\\s.])${o}([\\s.]|$)`);return n.find(s=>t.test(s))}const X=["xt - Cross Reference - Target References","toc2 - File - Short Table of Contents Text","fig - Auxiliary - Figure/Illustration/Map","f - Footnote","fq - Footnote - Footnote Translation Quotation"],it=(n,r,o,t)=>[fe("Marker"),ve("Count"),{accessorKey:"styleName",accessorFn:s=>J(X,s.items[0])||"unknownMarkerLabel",header:({column:s})=>I(s,"Style Name"),cell:({row:s})=>{const i=s.getValue("item");return J(X,i)||"unknownMarkerLabel"}},ye("Status",n,r,o,t)],j={render:()=>{const n=[{key:["xt","p"],count:3,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:1},text:"In the beginning God created the heavens and the earth."}]},{key:["f","v"],count:5,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:'And God said, "Let there be light," and there was light.'}]},{key:["toc2","c"],count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"The LORD is good and upright; therefore he instructs sinners in his ways."}]},{key:["fig","p"],count:2,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:28},text:'God blessed them and said to them, "Be fruitful and increase in number."'}]}],[r,o]=u.useState(["xt"]),[t,s]=u.useState(["f"]);return e.jsx(S,{inventoryItems:n,setVerseRef:i=>console.log("Set verse ref:",i),localizedStrings:V,approvedItems:r,unapprovedItems:t,additionalItemsLabels:{checkboxText:"Show Preceding Markers",tableHeaders:["Preceding Markers"]},scope:"chapter",onScopeChange:i=>console.log("Scope changed:",i),columns:it(r,o,t,s)})},parameters:{docs:{description:{story:"Inventory component for checking markers."}}}},C={render:()=>{const[n,r]=u.useState([]),[o,t]=u.useState([]);return e.jsx(S,{inventoryItems:[],setVerseRef:s=>console.log("Set verse ref:",s),localizedStrings:V,approvedItems:n,unapprovedItems:o,scope:we,onScopeChange:s=>console.log("Scope changed:",s),columns:D("Item","Count","Status",n,r,o,t)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var Z,L,ee;N.parameters={...N.parameters,docs:{...(Z=N.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(ee=(L=N.parameters)==null?void 0:L.docs)==null?void 0:ee.source}}};var te,re,ne;_.parameters={..._.parameters,docs:{...(te=_.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(ne=(re=_.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var oe,se,ae;j.parameters={...j.parameters,docs:{...(oe=j.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(ae=(se=j.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var ce,ie,ue;C.parameters={...C.parameters,docs:{...(ce=C.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(ue=(ie=C.parameters)==null?void 0:ie.docs)==null?void 0:ue.source}}};const dr=["Default","RepeatedWords","MarkersInventory","EmptyInventory"];export{N as Default,C as EmptyInventory,j as MarkersInventory,_ as RepeatedWords,dr as __namedExportsOrder,pr as default};
