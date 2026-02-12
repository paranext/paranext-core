import{j as e}from"./jsx-runtime-BSJuBmzn.js";import{A as Se,D as be}from"./data-table.component-DoPgEQ0B.js";import{T as Te,b as _e,c as B,d as U,e as je,f as W}from"./table-D7iyvv_T.js";import{y as Ce,J as Ne,b as K}from"./index-Dnd4bzmK.js";import{r as p}from"./iframe-DXlwAJEx.js";import{C as Ve}from"./checkbox-BxmAbaoE.js";import{I as Re}from"./input-CSIMbjeU.js";import{L as Ae}from"./label-B3AsC3IG.js";import{S as M,a as $,b as P,c as F,d as w}from"./select-DIV_dmca.js";import{B as j}from"./button-l0bwmMbR.js";import{T as qe,a as E}from"./toggle-group-CHhaPY4z.js";import{C as Ee}from"./circle-check-DVdHFMeK.js";import{C as De}from"./circle-x-D-0SYQbn.js";import{C as Oe}from"./circle-help-BXPB5IgY.js";import{A as ze}from"./arrow-up-C8JbO_ro.js";import{c as He}from"./createLucideIcon-CZFJfSKI.js";import{T as Ge}from"./theme-provider.component-DC9X_jGf.js";import"./index-DL7absl9.js";import"./dropdown-menu-lMTIlbnk.js";import"./index-jR_Lra-J.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-DTAXz6r9.js";import"./index-NI0vhJY8.js";import"./index-BUYKZufV.js";import"./index-CRmxrkdC.js";import"./index-BupTB1ps.js";import"./index-Czge54uc.js";import"./index-CiRaequs.js";import"./index-BnuDOY9G.js";import"./index-CVB1QioM.js";import"./index-BanEGo_l.js";import"./index-DR9OuzjU.js";import"./floating-ui.react-dom-UQVQJ5VE.js";import"./index-Bu4Dkq_u.js";import"./index-Kr8YALac.js";import"./index-W3OaPUYB.js";import"./index-DBiAyT42.js";import"./index-DrWLotR9.js";import"./index-5dBNr6Vy.js";import"./index-BGlJ3Amo.js";import"./index-CFBoECQ_.js";import"./index-Dpe83Wtg.js";import"./check-DEMcXaMk.js";import"./circle-CIfkT0B7.js";import"./chevron-right-DVXpcevj.js";import"./filter-6y4mI4TX.js";import"./arrow-right-ChfgZzvc.js";import"./chevron-left-BG7XUaXc.js";import"./skeleton-BZ41VyD2.js";import"./index-Bl2C2VvJ.js";import"./preload-helper-CTOgD26E.js";import"./index-DN9HoiTU.js";import"./index-BaQP4hhM.js";import"./index-D6NKOhRr.js";import"./chevron-down-Br4Ddl5s.js";import"./chevron-up-D-kB8UQM.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],Ue=He("ArrowDown",Be);function We(o){const t=[];let n=0;const r=/\\\\(.+?)\\\\/g;let a;for(;(a=r.exec(o))!==null;)a.index>n&&t.push(o.substring(n,a.index)),t.push(e.jsx("strong",{children:a[1]},a.index)),n=r.lastIndex;return n<o.length&&t.push(o.substring(n)),t.length>0?t:[o]}function ne({occurrenceData:o,setScriptureReference:t,localizedStrings:n,classNameForText:r}){const a=n["%webView_inventory_occurrences_table_header_reference%"],u=n["%webView_inventory_occurrences_table_header_occurrence%"],d=p.useMemo(()=>{const i=[],c=new Set;return o.forEach(m=>{const S=`${m.reference.book}:${m.reference.chapterNum}:${m.reference.verseNum}:${m.text}`;c.has(S)||(c.add(S),i.push(m))}),i},[o]);return e.jsxs(Te,{stickyHeader:!0,children:[e.jsx(_e,{stickyHeader:!0,children:e.jsxs(B,{children:[e.jsx(U,{children:a}),e.jsx(U,{children:u})]})}),e.jsx(je,{children:d.length>0&&d.map(i=>e.jsxs(B,{onClick:()=>{t(i.reference)},children:[e.jsx(W,{children:Ce(i.reference,"English")}),e.jsx(W,{className:r,children:We(i.text)})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}ne.__docgenInfo={description:`Table that shows occurrences of specified inventory item(s). The first column shows the related
scripture reference. The second column shows the snippet of scripture that contains the specified
inventory item`,methods:[],displayName:"OccurrencesTable",props:{occurrenceData:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
}`,signature:{properties:[{key:"reference",value:{name:"SerializedVerseRef",required:!0},description:"Reference to scripture where the item appears"},{key:"text",value:{name:"string",required:!0},description:"Snippet of scripture that contains the occurrence"}]}}],raw:"InventoryItemOccurrence[]"},description:"Data that contains scriptures references and snippets of scripture"},setScriptureReference:{required:!0,tsType:{name:"signature",type:"function",raw:"(scriptureReference: SerializedVerseRef) => void",signature:{arguments:[{type:{name:"SerializedVerseRef"},name:"scriptureReference"}],return:{name:"void"}}},description:"Callback function that is executed when the scripture reference is changed"},localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:`Object with all localized strings that the OccurrencesTable needs to work well across multiple
languages`},classNameForText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the occurrence text"}}};const C=o=>o==="asc"?e.jsx(ze,{className:"tw-ms-2 tw-h-4 tw-w-4"}):o==="desc"?e.jsx(Ue,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(Se,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Ke=o=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>e.jsxs(j,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[o,C(t.getIsSorted())]})}),Me=(o,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>e.jsxs(j,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[o,C(n.getIsSorted())]})}),$e=o=>({accessorKey:"count",header:({column:t})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(j,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[o,C(t.getIsSorted())]})}),cell:({row:t})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),D=(o,t,n,r,a,u)=>{let d=[...n];o.forEach(c=>{t==="approved"?d.includes(c)||d.push(c):d=d.filter(m=>m!==c)}),r(d);let i=[...a];o.forEach(c=>{t==="unapproved"?i.includes(c)||i.push(c):i=i.filter(m=>m!==c)}),u(i)},Pe=(o,t,n,r,a)=>({accessorKey:"status",header:({column:u})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(j,{variant:"ghost",onClick:()=>u.toggleSorting(void 0),children:[o,C(u.getIsSorted())]})}),cell:({row:u})=>{const d=u.getValue("status"),i=u.getValue("item");return e.jsxs(qe,{value:d,variant:"outline",type:"single",children:[e.jsx(E,{onClick:c=>{c.stopPropagation(),D([i],"approved",t,n,r,a)},value:"approved",children:e.jsx(Ee,{})}),e.jsx(E,{onClick:c=>{c.stopPropagation(),D([i],"unapproved",t,n,r,a)},value:"unapproved",children:e.jsx(De,{})}),e.jsx(E,{onClick:c=>{c.stopPropagation(),D([i],"unknown",t,n,r,a)},value:"unknown",children:e.jsx(Oe,{})})]})}}),Fe=(o,t,n)=>n.includes(o)?"unapproved":t.includes(o)?"approved":"unknown",Ye=(o,t,n)=>{let r=o;return t!=="all"&&(r=r.filter(a=>t==="approved"&&a.status==="approved"||t==="unapproved"&&a.status==="unapproved"||t==="unknown"&&a.status==="unknown")),n!==""&&(r=r.filter(a=>a.items[0].includes(n))),r},Je=(o,t,n)=>o.map(r=>{const a=K(r.key)?r.key:r.key[0];return{items:K(r.key)?[r.key]:r.key,count:r.count,status:r.status||Fe(a,t,n),occurrences:r.occurrences||[]}}),f=(o,t)=>o[t]??t;function k({inventoryItems:o,setVerseRef:t,localizedStrings:n,additionalItemsLabels:r,approvedItems:a,unapprovedItems:u,scope:d,onScopeChange:i,columns:c,id:m,areInventoryItemsLoading:S=!1,classNameForVerseText:se,onItemSelected:H}){const ae=f(n,"%webView_inventory_all%"),ie=f(n,"%webView_inventory_approved%"),ce=f(n,"%webView_inventory_unapproved%"),ue=f(n,"%webView_inventory_unknown%"),pe=f(n,"%webView_inventory_scope_currentBook%"),de=f(n,"%webView_inventory_scope_chapter%"),le=f(n,"%webView_inventory_scope_verse%"),me=f(n,"%webView_inventory_filter_text%"),he=f(n,"%webView_inventory_show_additional_items%"),fe=f(n,"%webView_inventory_no_results%"),[y,ve]=p.useState(!1),[N,ye]=p.useState("all"),[V,we]=p.useState(""),[R,A]=p.useState([]),q=p.useMemo(()=>{const s=o??[];return s.length===0?[]:Je(s,a,u)},[o,a,u]),g=p.useMemo(()=>{if(y)return q;const s=[];return q.forEach(l=>{const v=l.items[0],h=s.find(x=>x.items[0]===v);h?(h.count+=l.count,h.occurrences=h.occurrences.concat(l.occurrences)):s.push({items:[v],count:l.count,occurrences:l.occurrences,status:l.status})}),s},[y,q]),I=p.useMemo(()=>g.length===0?[]:Ye(g,N,V),[g,N,V]),ge=p.useMemo(()=>{var v,h;if(!y)return c;const s=(v=r==null?void 0:r.tableHeaders)==null?void 0:v.length;if(!s)return c;const l=[];for(let x=0;x<s;x++)l.push(Me(((h=r==null?void 0:r.tableHeaders)==null?void 0:h[x])||"Additional Item",x+1));return[...l,...c]},[r==null?void 0:r.tableHeaders,c,y]);p.useEffect(()=>{I.length===0?A([]):I.length===1&&A(I[0].items)},[I]);const xe=(s,l)=>{l.setRowSelection(()=>{const h={};return h[s.index]=!0,h});const v=s.original.items;A(v),H&&v.length>0&&H(v[0])},Ie=s=>{if(s==="book"||s==="chapter"||s==="verse")i(s);else throw new Error(`Invalid scope value: ${s}`)},ke=s=>{if(s==="all"||s==="approved"||s==="unapproved"||s==="unknown")ye(s);else throw new Error(`Invalid status filter value: ${s}`)},G=p.useMemo(()=>{if(g.length===0||R.length===0)return[];const s=g.filter(l=>Ne(y?l.items:[l.items[0]],R));if(s.length>1)throw new Error("Selected item is not unique");return s.length===0?[]:s[0].occurrences},[R,y,g]);return e.jsxs("div",{id:m,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(M,{onValueChange:s=>ke(s),defaultValue:N,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(P,{placeholder:"Select filter"})}),e.jsxs(F,{children:[e.jsx(w,{value:"all",children:ae}),e.jsx(w,{value:"approved",children:ie}),e.jsx(w,{value:"unapproved",children:ce}),e.jsx(w,{value:"unknown",children:ue})]})]}),e.jsxs(M,{onValueChange:s=>Ie(s),defaultValue:d,children:[e.jsx($,{className:"tw-m-1",children:e.jsx(P,{placeholder:"Select scope"})}),e.jsxs(F,{children:[e.jsx(w,{value:"book",children:pe}),e.jsx(w,{value:"chapter",children:de}),e.jsx(w,{value:"verse",children:le})]})]}),e.jsx(Re,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:me,value:V,onChange:s=>{we(s.target.value)}}),r&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Ve,{className:"tw-m-1",checked:y,onCheckedChange:s=>{ve(s)}}),e.jsx(Ae,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(r==null?void 0:r.checkboxText)??he})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(be,{columns:ge,data:I,onRowClickHandler:xe,stickyHeader:!0,isLoading:S,noResultsMessage:fe})}),G.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ne,{classNameForText:se,occurrenceData:G,setScriptureReference:t,localizedStrings:n})})]})}k.__docgenInfo={description:"Inventory component that is used to view and control the status of provided project settings",methods:[],displayName:"Inventory",props:{inventoryItems:{required:!0,tsType:{name:"union",raw:"InventorySummaryItem[] | undefined",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
other columns you can add these yourself`},id:{required:!1,tsType:{name:"string"},description:"Unique identifier for the Inventory component"},areInventoryItemsLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the inventory items are still loading",defaultValue:{value:"false",computed:!1}},classNameForVerseText:{required:!1,tsType:{name:"string"},description:"Class name to apply to the provided occurrence verse text in the `OccurrencesTable` component"},onItemSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemKey: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemKey"}],return:{name:"void"}}},description:"Optional callback that is called when an item is selected. Receives the selected item key."}}};const O={"%webView_inventory_all%":"All items","%webView_inventory_approved%":"Approved items","%webView_inventory_unapproved%":"Unapproved items","%webView_inventory_unknown%":"Unknown items","%webView_inventory_filter_text%":"Filter text...","%webView_inventory_show_additional_items%":"Show Additional Items","%webView_inventory_occurrences_table_header_occurrence%":"Occurrence","%webView_inventory_occurrences_table_header_reference%":"Reference","%webView_inventory_scope_currentBook%":"Current book","%webView_inventory_scope_chapter%":"Current chapter","%webView_inventory_scope_verse%":"Current verse"},Xe=[{key:"the the",count:1,occurrences:[{reference:{book:"JHN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]},{key:"word  word",count:1,occurrences:[{reference:{book:"MAT",chapterNum:4,verseNum:4},text:"Every word  word has meaning"}]}],oe="book",z=(o,t,n,r,a,u,d)=>[Ke(o),$e(t),Pe(n,r,a,u,d)],er={title:"Advanced/Inventory",component:k,tags:["autodocs"],decorators:[o=>e.jsx(Ge,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(o,{})})})]},b={render:()=>{const[o,t]=p.useState(["the the"]),[n,r]=p.useState(["and and","word  word"]);return e.jsx(k,{inventoryItems:Xe,setVerseRef:a=>console.log("Set verse ref:",a),localizedStrings:O,approvedItems:o,unapprovedItems:n,scope:oe,onScopeChange:a=>console.log("Scope changed:",a),columns:z("Item","Count","Status",o,t,n,r)})},parameters:{docs:{description:{story:"A complete inventory component for reviewing and managing translation checking items."}}}},T={render:()=>{const o=[{key:"the the",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:1},text:"In the the beginning was the Word"}]},{key:"and and",count:1,occurrences:[{reference:{book:"GEN",chapterNum:1,verseNum:3},text:"And and God said, Let there be light"}]},{key:"is is",count:1,occurrences:[{reference:{book:"PSA",chapterNum:25,verseNum:8},text:"God is is good and merciful"}]}],[t,n]=p.useState(["and and"]),[r,a]=p.useState(["the the","is is"]);return e.jsx(k,{inventoryItems:o,setVerseRef:u=>console.log("Set verse ref:",u),localizedStrings:O,approvedItems:t,unapprovedItems:r,scope:"chapter",onScopeChange:u=>console.log("Scope changed:",u),columns:z("Repeated Words","Count","Status",t,n,r,a)})},parameters:{docs:{description:{story:"Inventory component specifically configured for repeated words checking."}}}},_={render:()=>{const[o,t]=p.useState([]),[n,r]=p.useState([]);return e.jsx(k,{inventoryItems:[],setVerseRef:a=>console.log("Set verse ref:",a),localizedStrings:O,approvedItems:o,unapprovedItems:n,scope:oe,onScopeChange:a=>console.log("Scope changed:",a),columns:z("Item","Count","Status",o,t,n,r)})},parameters:{docs:{description:{story:"Inventory component with no items to display."}}}};var Y,J,X;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(X=(J=b.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Q,Z,L;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(L=(Z=T.parameters)==null?void 0:Z.docs)==null?void 0:L.source}}};var ee,te,re;_.parameters={..._.parameters,docs:{...(ee=_.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(re=(te=_.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const tr=["Default","RepeatedWords","EmptyInventory"];export{b as Default,_ as EmptyInventory,T as RepeatedWords,tr as __namedExportsOrder,er as default};
