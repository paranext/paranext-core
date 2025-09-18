import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{A as Ie,D as Se}from"./data-table.component-BYqM5WC1.js";import{T as ke,b as Te,c as M,d as U,e as be,f as W}from"./table-B46c0xj4.js";import{m as _e}from"./index.es-D4jfZzAn.js";import{a as D,b as q}from"./index-DOKkQ3oI.js";import{r as u}from"./iframe-BcYeWgcr.js";import{C as je}from"./checkbox-Cz82JFhx.js";import{I as Ce}from"./input-CLS-C3Rv.js";import{L as Ne}from"./label-dXSGOCoI.js";import{S as B,a as $,b as P,c as K,d as y}from"./select-DopLMRU5.js";import{B as _}from"./button-BklEqBlb.js";import{T as Re,a as E}from"./toggle-group-C_H0U3Wr.js";import{C as Ve}from"./circle-check-m0xEGIhY.js";import{C as Ae}from"./circle-x-BjyDMdNC.js";import{C as qe}from"./circle-help-B97ECGcO.js";import{c as re}from"./createLucideIcon-D1oFpSf_.js";import{T as Ee}from"./theme-provider.component-Bum-YBGl.js";import"./index-DYZ4n2rz.js";import"./dropdown-menu-oTjsz9YM.js";import"./menu.context-DzzKApc-.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-PhEMGCGr.js";import"./index-Dxmr7YCn.js";import"./index-DNc3TkLQ.js";import"./index-BJ893FO-.js";import"./index-DZhSYnG_.js";import"./index-DThCJ6FV.js";import"./index-CHtcClp9.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BdtTgfff.js";import"./index-BDeDN-dv.js";import"./floating-ui.react-dom-BrelV8Hr.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-b4TQRt8l.js";import"./index-hI4Fiusr.js";import"./index-D7NlkAyc.js";import"./index-BTW_afRk.js";import"./index-D2kttkiv.js";import"./index-DBWqXr8V.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./check-nBAr59iS.js";import"./circle-DQ3gVi4L.js";import"./chevron-right-BI3aT3bw.js";import"./filter-gUQtPoPv.js";import"./arrow-right-Dff24GFZ.js";import"./chevron-left-RRZnmkX1.js";import"./index-DuMdAayX.js";import"./index-BaQP4hhM.js";import"./index-BJ8FFPD6.js";import"./chevron-down-CT_Ph70R.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],De=re("ArrowDown",ze);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],He=re("ArrowUp",Oe);function ne({occurrenceData:n,setScriptureReference:t,localizedStrings:o}){const s=o["%webView_inventory_occurrences_table_header_reference%"],r=o["%webView_inventory_occurrences_table_header_occurrence%"],c=u.useMemo(()=>{const a=[];return n.forEach(d=>{a.some(p=>D(p,d))||a.push(d)}),a},[n]);return e.jsxs(ke,{stickyHeader:!0,children:[e.jsx(Te,{stickyHeader:!0,children:e.jsxs(M,{children:[e.jsx(U,{children:s}),e.jsx(U,{children:r})]})}),e.jsx(be,{children:c.length>0&&c.map(a=>e.jsxs(M,{onClick:()=>{t(a.reference)},children:[e.jsx(W,{children:`${_e.bookIdToEnglishName(a.reference.book)} ${a.reference.chapterNum}:${a.reference.verseNum}`}),e.jsx(W,{children:a.text})]},`${a.reference.book} ${a.reference.chapterNum}:${a.reference.verseNum}-${a.text}`))})]})}ne.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`}}};const j=n=>n==="asc"?e.jsx(He,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n==="desc"?e.jsx(De,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(Ie,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Ge=n=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>e.jsxs(_,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n,j(t.getIsSorted())]})}),Me=(n,t)=>({accessorKey:`item${t}`,accessorFn:o=>o.items[t],header:({column:o})=>e.jsxs(_,{variant:"ghost",onClick:()=>o.toggleSorting(void 0),children:[n,j(o.getIsSorted())]})}),Ue=n=>({accessorKey:"count",header:({column:t})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(_,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n,j(t.getIsSorted())]})}),cell:({row:t})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),z=(n,t,o,s,r,c)=>{let a=[...o];n.forEach(p=>{t==="approved"?a.includes(p)||a.push(p):a=a.filter(g=>g!==p)}),s(a);let d=[...r];n.forEach(p=>{t==="unapproved"?d.includes(p)||d.push(p):d=d.filter(g=>g!==p)}),c(d)},We=(n,t,o,s,r)=>({accessorKey:"status",header:({column:c})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(_,{variant:"ghost",onClick:()=>c.toggleSorting(void 0),children:[n,j(c.getIsSorted())]})}),cell:({row:c})=>{const a=c.getValue("status"),d=c.getValue("item");return e.jsxs(Re,{value:a,variant:"outline",type:"single",children:[e.jsx(E,{onClick:p=>{p.stopPropagation(),z([d],"approved",t,o,s,r)},value:"approved",children:e.jsx(Ve,{})}),e.jsx(E,{onClick:p=>{p.stopPropagation(),z([d],"unapproved",t,o,s,r)},value:"unapproved",children:e.jsx(Ae,{})}),e.jsx(E,{onClick:p=>{p.stopPropagation(),z([d],"unknown",t,o,s,r)},value:"unknown",children:e.jsx(qe,{})})]})}}),Be=(n,t,o)=>o.includes(n)?"unapproved":t.includes(n)?"approved":"unknown",$e=(n,t,o)=>{let s=n;return t!=="all"&&(s=s.filter(r=>t==="approved"&&r.status==="approved"||t==="unapproved"&&r.status==="unapproved"||t==="unknown"&&r.status==="unknown")),o!==""&&(s=s.filter(r=>r.items[0].includes(o))),s},Pe=(n,t,o)=>{const s=[];return n.forEach(r=>{const c=s.find(a=>D(a.items,q(r.inventoryText)?[r.inventoryText]:r.inventoryText));if(c)c.count+=1,c.occurrences.push({reference:r.verseRef,text:r.verse});else{const a={items:q(r.inventoryText)?[r.inventoryText]:r.inventoryText,count:1,status:Be(q(r.inventoryText)?r.inventoryText:r.inventoryText[0],t,o),occurrences:[{reference:r.verseRef,text:r.verse}]};s.push(a)}}),s},m=(n,t)=>n[t]??t;function S({inventoryItems:n,setVerseRef:t,localizedStrings:o,additionalItemsLabels:s,approvedItems:r,unapprovedItems:c,scope:a,onScopeChange:d,columns:p,id:g}){const se=m(o,"%webView_inventory_all%"),ie=m(o,"%webView_inventory_approved%"),ae=m(o,"%webView_inventory_unapproved%"),ce=m(o,"%webView_inventory_unknown%"),pe=m(o,"%webView_inventory_scope_currentBook%"),ue=m(o,"%webView_inventory_scope_chapter%"),de=m(o,"%webView_inventory_scope_verse%"),le=m(o,"%webView_inventory_filter_text%"),me=m(o,"%webView_inventory_show_additional_items%"),[v,he]=u.useState(!1),[C,ve]=u.useState("all"),[N,fe]=u.useState(""),[R,V]=u.useState([]),A=u.useMemo(()=>n.length===0?[]:Pe(n,r,c),[n,r,c]),x=u.useMemo(()=>{if(v)return A;const i=[];return A.forEach(l=>{const h=l.items[0],f=i.find(w=>w.items[0]===h);f?(f.count+=l.count,f.occurrences=f.occurrences.concat(l.occurrences)):i.push({items:[h],count:l.count,occurrences:l.occurrences,status:l.status})}),i},[v,A]),I=u.useMemo(()=>$e(x,C,N),[x,C,N]),ye=u.useMemo(()=>{var h,f;if(!v)return p;const i=(h=s==null?void 0:s.tableHeaders)==null?void 0:h.length;if(!i)return p;const l=[];for(let w=0;w<i;w++)l.push(Me(((f=s==null?void 0:s.tableHeaders)==null?void 0:f[w])||"Additional Item",w+1));return[...l,...p]},[s==null?void 0:s.tableHeaders,p,v]);u.useEffect(()=>{I.length===0?V([]):I.length===1&&V(I[0].items)},[I]);const we=(i,l)=>{l.setRowSelection(()=>{const h={};return h[i.index]=!0,h}),V(i.original.items)},ge=i=>{if(i==="book"||i==="chapter"||i==="verse")d(i);else throw new Error(`Invalid scope value: ${i}`)},xe=i=>{if(i==="all"||i==="approved"||i==="unapproved"||i==="unknown")ve(i);else throw new Error(`Invalid status filter value: ${i}`)},G=u.useMemo(()=>{if(x.length===0||R.length===0)return[];const i=x.filter(l=>D(v?l.items:[l.items[0]],R));if(i.length>1)throw new Error("Selected item is not unique");return i.length===0?[]:i[0].occurrences},[R,v,x]);return e.jsxs("div",{id:g,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(B,{onValueChange:i=>xe(i),defaultValue:C,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(P,{placeholder:"Select filter"})}),e.jsxs(K,{children:[e.jsx(y,{value:"all",children:se}),e.jsx(y,{value:"approved",children:ie}),e.jsx(y,{value:"unapproved",children:ae}),e.jsx(y,{value:"unknown",children:ce})]})]}),e.jsxs(B,{onValueChange:i=>ge(i),defaultValue:a,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(P,{placeholder:"Select scope"})}),e.jsxs(K,{children:[e.jsx(y,{value:"book",children:pe}),e.jsx(y,{value:"chapter",children:ue}),e.jsx(y,{value:"verse",children:de})]})]}),e.jsx(Ce,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:le,value:N,onChange:i=>{fe(i.target.value)}}),s&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(je,{className:"tw-m-1",checked:v,onCheckedChange:i=>{he(i)}}),e.jsx(Ne,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(s==null?void 0:s.checkboxText)??me})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(Se,{columns:ye,data:I,onRowClickHandler:we,stickyHeader:!0})}),G.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ne,{occurrenceData:G,setScriptureReference:t,localizedStrings:o})})]})}S.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
the second item in the array)`},{key:"verse",value:{name:"string",required:!0},description:"The snippet of scripture where this occurrence of the `inventoryItem` is found"},{key:"verseRef",value:{name:"SerializedVerseRef",required:!0},description:"The reference to the location where the `verse` can be found in scripture"},{key:"offset",value:{name:"number",required:!0},description:"Offset used to locate the `inventoryText` (or inventoryText[0] in case of an array) in the\n`verse` string"}]}}],raw:"InventoryItem[]"},description:"The inventory items that the inventory should be populated with"},setVerseRef:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"}}};const O={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse"},Ke=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"JHN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4},{inventoryText:"word  word",verse:"Every word  word has meaning",verseRef:{book:"MAT",chapterNum:4,verseNum:4},offset:6}],oe="book",H=(n,t,o,s,r,c,a)=>[Ge(n),Ue(t),We(o,s,r,c,a)],Kt={title:"Advanced/Inventory",component:S,tags:["autodocs"],decorators:[n=>e.jsx(Ee,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(n,{})})})]},k={render:()=>{const[n,t]=u.useState(["the the"]),[o,s]=u.useState(["and and","word  word"]);return e.jsx(S,{inventoryItems:Ke,setVerseRef:r=>console.log("Set verse ref:",r),localizedStrings:O,approvedItems:n,unapprovedItems:o,scope:oe,onScopeChange:r=>console.log("Scope changed:",r),columns:H("Item","Count","Status",n,t,o,s)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},T={render:()=>{const n=[{inventoryText:"the the",verse:"In the the beginning was the Word",verseRef:{book:"GEN",chapterNum:1,verseNum:1},offset:7},{inventoryText:"and and",verse:"And and God said, Let there be light",verseRef:{book:"GEN",chapterNum:1,verseNum:3},offset:4},{inventoryText:"is is",verse:"God is is good and merciful",verseRef:{book:"PSA",chapterNum:25,verseNum:8},offset:4}],[t,o]=u.useState(["and and"]),[s,r]=u.useState(["the the","is is"]);return e.jsx(S,{inventoryItems:n,setVerseRef:c=>console.log("Set verse ref:",c),localizedStrings:O,approvedItems:t,unapprovedItems:s,scope:"chapter",onScopeChange:c=>console.log("Scope changed:",c),columns:H("Repeated Words","Count","Status",t,o,s,r)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}},b={render:()=>{const[n,t]=u.useState([]),[o,s]=u.useState([]);return e.jsx(S,{inventoryItems:[],setVerseRef:r=>console.log("Set verse ref:",r),localizedStrings:O,approvedItems:n,unapprovedItems:o,scope:oe,onScopeChange:r=>console.log("Scope changed:",r),columns:H("Item","Count","Status",n,t,o,s)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var Y,F,J;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(te=(ee=b.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const Yt=["Default","RepeatedWords","EmptyInventory"];export{k as Default,b as EmptyInventory,T as RepeatedWords,Yt as __namedExportsOrder,Kt as default};
