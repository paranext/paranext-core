import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{D as s,A as i}from"./data-table.component-BYqM5WC1.js";import{B as n}from"./button-BklEqBlb.js";import{B as c}from"./badge-DdQS0ixi.js";import{C as x}from"./checkbox-Cz82JFhx.js";import{D as q,a as z,b as J,j as O,e as l,d as $}from"./dropdown-menu-oTjsz9YM.js";import{c as y}from"./createLucideIcon-D1oFpSf_.js";import"./iframe-BcYeWgcr.js";import"./index-DYZ4n2rz.js";import"./filter-gUQtPoPv.js";import"./select-DopLMRU5.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BaQP4hhM.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-PhEMGCGr.js";import"./index-Dxmr7YCn.js";import"./index-DNc3TkLQ.js";import"./index-BJ893FO-.js";import"./index-DZhSYnG_.js";import"./index-DThCJ6FV.js";import"./index-CHtcClp9.js";import"./index-BdtTgfff.js";import"./index-BDeDN-dv.js";import"./floating-ui.react-dom-BrelV8Hr.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-b4TQRt8l.js";import"./index-hI4Fiusr.js";import"./index-D7NlkAyc.js";import"./index-BTW_afRk.js";import"./index-DuMdAayX.js";import"./index-BJ8FFPD6.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CT_Ph70R.js";import"./check-nBAr59iS.js";import"./arrow-right-Dff24GFZ.js";import"./chevron-left-RRZnmkX1.js";import"./chevron-right-BI3aT3bw.js";import"./table-B46c0xj4.js";import"./index-D2kttkiv.js";import"./menu.context-DzzKApc-.js";import"./index-DBWqXr8V.js";import"./circle-DQ3gVi4L.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],G=y("Ellipsis",Y);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],X=y("Eye",Q);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],ee=y("SquarePen",Z);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],ae=y("Trash2",te),$e={title:"Advanced/DataTable",component:s,tags:["autodocs"],parameters:{docs:{description:{component:`
A feature-rich table component that infuses the basic shadcn-based Table component with features from TanStack's React Table library.

Features include:
- Sorting
- Filtering
- Pagination
- Column visibility controls
- Row selection
- Sticky headers
- Custom row click handlers

This component is highly customizable and suitable for displaying complex data sets with various interactive features.
        `}}},argTypes:{columns:{control:!1,description:"Array of column definitions"},data:{control:!1,description:"Array of data to display in the table"},enablePagination:{control:"boolean",description:"Enable pagination for the table"},showPaginationControls:{control:"boolean",description:"Show detailed pagination controls"},showColumnVisibilityControls:{control:"boolean",description:"Show column visibility toggle controls"},stickyHeader:{control:"boolean",description:"Make the table header sticky when scrolling"},onRowClickHandler:{action:"row-clicked",description:"Handler function called when a row is clicked"}}},b=[{id:"1",name:"John Doe",email:"john@example.com",role:"Admin",status:"active",joinDate:"2023-01-15",lastLogin:"2024-08-19"},{id:"2",name:"Jane Smith",email:"jane@example.com",role:"User",status:"active",joinDate:"2023-03-22",lastLogin:"2024-08-18"},{id:"3",name:"Bob Johnson",email:"bob@example.com",role:"Moderator",status:"inactive",joinDate:"2023-05-10",lastLogin:"2024-08-15"},{id:"4",name:"Alice Brown",email:"alice@example.com",role:"User",status:"pending",joinDate:"2024-08-01",lastLogin:"Never"},{id:"5",name:"Charlie Wilson",email:"charlie@example.com",role:"User",status:"active",joinDate:"2023-12-05",lastLogin:"2024-08-17"}],o=[{id:"1",name:"Laptop Pro",category:"Electronics",price:1299.99,stock:15,featured:!0},{id:"2",name:"Wireless Mouse",category:"Electronics",price:29.99,stock:50,featured:!1},{id:"3",name:"Office Chair",category:"Furniture",price:249.99,stock:8,featured:!0},{id:"4",name:"Notebook Set",category:"Stationery",price:12.99,stock:100,featured:!1},{id:"5",name:"Standing Desk",category:"Furniture",price:499.99,stock:3,featured:!0},{id:"6",name:"Wireless Headphones",category:"Electronics",price:199.99,stock:25,featured:!1},{id:"7",name:"Pen Set",category:"Stationery",price:8.99,stock:75,featured:!1},{id:"8",name:"Monitor 4K",category:"Electronics",price:399.99,stock:12,featured:!0}],W=[{accessorKey:"name",header:"Name"},{accessorKey:"email",header:"Email"},{accessorKey:"role",header:"Role"},{accessorKey:"status",header:"Status",cell:({row:t})=>{const a=t.getValue("status");let r="outline";return a==="active"?r="default":a==="inactive"&&(r="secondary"),e.jsx(c,{variant:r,children:a})}}],L=[{id:"select",header:({table:t})=>e.jsx(x,{checked:t.getIsAllPageRowsSelected()||t.getIsSomePageRowsSelected()&&"indeterminate",onCheckedChange:a=>t.toggleAllPageRowsSelected(!!a),"aria-label":"Select all"}),cell:({row:t})=>e.jsx(x,{checked:t.getIsSelected(),onCheckedChange:a=>t.toggleSelected(!!a),"aria-label":"Select row"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Name",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]})},{accessorKey:"email",header:"Email"},{accessorKey:"role",header:"Role",cell:({row:t})=>{const a=t.getValue("role");return e.jsx(c,{variant:"outline",children:a})}},{accessorKey:"status",header:"Status",cell:({row:t})=>{const a=t.getValue("status");let r="outline";return a==="active"?r="default":a==="inactive"&&(r="secondary"),e.jsx(c,{variant:r,children:a})}},{accessorKey:"joinDate",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Join Date",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]})},{id:"actions",header:"Actions",cell:({row:t})=>{const a=t.original;return e.jsxs(q,{children:[e.jsx(z,{asChild:!0,children:e.jsxs(n,{variant:"ghost",className:"tw-h-8 tw-w-8 tw-p-0",children:[e.jsx("span",{className:"tw-sr-only",children:"Open menu"}),e.jsx(G,{className:"tw-h-4 tw-w-4"})]})}),e.jsxs(J,{align:"end",children:[e.jsx(O,{children:"Actions"}),e.jsx(l,{onClick:()=>navigator.clipboard.writeText(a.id),children:"Copy user ID"}),e.jsx($,{}),e.jsxs(l,{children:[e.jsx(X,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View details"]}),e.jsxs(l,{children:[e.jsx(ee,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Edit user"]}),e.jsxs(l,{className:"tw-text-red-600",children:[e.jsx(ae,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Delete user"]})]})]})}}],f=[{accessorKey:"name",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Product Name",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]})},{accessorKey:"category",header:"Category"},{accessorKey:"price",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Price",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]}),cell:({row:t})=>{const a=parseFloat(t.getValue("price")),r=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a);return e.jsx("div",{className:"tw-font-medium",children:r})}},{accessorKey:"stock",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Stock",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]}),cell:({row:t})=>{const a=parseInt(String(t.getValue("stock")),10);let r="default";return a<10?r="destructive":a<25&&(r="outline"),e.jsxs(c,{variant:r,children:[a," units"]})}},{accessorKey:"featured",header:"Featured",cell:({row:t})=>{const a=t.getValue("featured");return e.jsx(c,{variant:a?"default":"secondary",children:a?"Yes":"No"})}}],d={render:()=>e.jsx(s,{columns:W,data:b}),parameters:{docs:{description:{story:"A basic table showing user data with minimal configuration."}}}},m={render:()=>e.jsx(s,{columns:f,data:[...o,...o,...o],enablePagination:!0}),parameters:{docs:{description:{story:"Table with pagination enabled to handle larger datasets."}}}},u={render:()=>e.jsx(s,{columns:f,data:[...o,...o,...o],enablePagination:!0,showPaginationControls:!0}),parameters:{docs:{description:{story:"Table with detailed pagination controls for better navigation."}}}},p={render:()=>e.jsx(s,{columns:L,data:b,showColumnVisibilityControls:!0}),parameters:{docs:{description:{story:"Table with column visibility controls allowing users to show/hide columns."}}}},h={render:()=>e.jsx(s,{columns:f,data:[...o,...o,...o],stickyHeader:!0}),parameters:{docs:{description:{story:"Table with sticky header - scroll down to see the header remain fixed."}}}},g={render:()=>e.jsx(s,{columns:L,data:b,enablePagination:!0,showPaginationControls:!0,showColumnVisibilityControls:!0,stickyHeader:!0}),parameters:{docs:{description:{story:"Full-featured DataTable with built-in column visibility controls, pagination, and all features enabled."}}}},w={render:()=>e.jsx(s,{columns:W,data:[]}),parameters:{docs:{description:{story:"Table with no data to show the empty state."}}}};var k,C,j;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={users} />,
  parameters: {
    docs: {
      description: {
        story: 'A basic table showing user data with minimal configuration.'
      }
    }
  }
}`,...(j=(C=d.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var S,v,T;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} enablePagination />,
  parameters: {
    docs: {
      description: {
        story: 'Table with pagination enabled to handle larger datasets.'
      }
    }
  }
}`,...(T=(v=m.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var D,P,N;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} enablePagination showPaginationControls />,
  parameters: {
    docs: {
      description: {
        story: 'Table with detailed pagination controls for better navigation.'
      }
    }
  }
}`,...(N=(P=u.parameters)==null?void 0:P.docs)==null?void 0:N.source}}};var E,M,V;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={advancedUserColumns} data={users} showColumnVisibilityControls />,
  parameters: {
    docs: {
      description: {
        story: 'Table with column visibility controls allowing users to show/hide columns.'
      }
    }
  }
}`,...(V=(M=p.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var K,A,F;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} // Triple the data to show scrolling
  stickyHeader />,
  parameters: {
    docs: {
      description: {
        story: 'Table with sticky header - scroll down to see the header remain fixed.'
      }
    }
  }
}`,...(F=(A=h.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var H,I,U;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={advancedUserColumns} data={users} enablePagination showPaginationControls showColumnVisibilityControls stickyHeader />,
  parameters: {
    docs: {
      description: {
        story: 'Full-featured DataTable with built-in column visibility controls, pagination, and all features enabled.'
      }
    }
  }
}`,...(U=(I=g.parameters)==null?void 0:I.docs)==null?void 0:U.source}}};var _,B,R;w.parameters={...w.parameters,docs:{...(_=w.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={[]} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with no data to show the empty state.'
      }
    }
  }
}`,...(R=(B=w.parameters)==null?void 0:B.docs)==null?void 0:R.source}}};const Ye=["BasicTable","WithPagination","WithPaginationControls","WithColumnVisibilityControls","StickyHeader","FullFeatured","EmptyTable"];export{d as BasicTable,w as EmptyTable,g as FullFeatured,h as StickyHeader,p as WithColumnVisibilityControls,m as WithPagination,u as WithPaginationControls,Ye as __namedExportsOrder,$e as default};
