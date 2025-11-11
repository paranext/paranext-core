import{j as e}from"./jsx-runtime-CvGToidP.js";import{D as r,A as i}from"./data-table.component-Bja-CxMh.js";import{B as n}from"./button-cud2eTA2.js";import{B as c}from"./badge-CoxKbSil.js";import{C}from"./checkbox-B9DyLOT9.js";import{D as $,a as Y,b as G,j as Q,c as l,e as X}from"./dropdown-menu-CmJD305T.js";import{E as Z}from"./ellipsis-BmqjpadT.js";import{c as b}from"./createLucideIcon-B4WsWZHQ.js";import"./iframe-FHgAwj54.js";import"./index-CjDI1P3A.js";import"./filter-HnPcgLh2.js";import"./select-Db4UU3si.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-BaQP4hhM.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-CnlM3g2y.js";import"./index-DvVrmaIy.js";import"./index-D-wbo5Oc.js";import"./index-C6LUVuya.js";import"./index-lUSupRFo.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DEtppfdW.js";import"./index-q5xUhQdo.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-i-XYDP49.js";import"./check-Ce2iVscw.js";import"./arrow-right-DKiik7w5.js";import"./chevron-left-bdRDGp6P.js";import"./chevron-right-Cncp9OTI.js";import"./table-B4VX8ezE.js";import"./skeleton-VGhCf4P8.js";import"./index-DLzBYexm.js";import"./menu.context-BrEJJXIC.js";import"./index--W5ZaJkm.js";import"./circle-EX5G5xxd.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],te=b("Eye",ee);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],se=b("SquarePen",oe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],re=b("Trash2",ae),Xe={title:"Advanced/DataTable",component:r,tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{columns:{control:!1,description:"Array of column definitions"},data:{control:!1,description:"Array of data to display in the table"},enablePagination:{control:"boolean",description:"Enable pagination for the table"},showPaginationControls:{control:"boolean",description:"Show detailed pagination controls"},showColumnVisibilityControls:{control:"boolean",description:"Show column visibility toggle controls"},stickyHeader:{control:"boolean",description:"Make the table header sticky when scrolling"},onRowClickHandler:{action:"row-clicked",description:"Handler function called when a row is clicked"}}},f=[{id:"1",name:"John Doe",email:"john@example.com",role:"Admin",status:"active",joinDate:"2023-01-15",lastLogin:"2024-08-19"},{id:"2",name:"Jane Smith",email:"jane@example.com",role:"User",status:"active",joinDate:"2023-03-22",lastLogin:"2024-08-18"},{id:"3",name:"Bob Johnson",email:"bob@example.com",role:"Moderator",status:"inactive",joinDate:"2023-05-10",lastLogin:"2024-08-15"},{id:"4",name:"Alice Brown",email:"alice@example.com",role:"User",status:"pending",joinDate:"2024-08-01",lastLogin:"Never"},{id:"5",name:"Charlie Wilson",email:"charlie@example.com",role:"User",status:"active",joinDate:"2023-12-05",lastLogin:"2024-08-17"}],a=[{id:"1",name:"Laptop Pro",category:"Electronics",price:1299.99,stock:15,featured:!0},{id:"2",name:"Wireless Mouse",category:"Electronics",price:29.99,stock:50,featured:!1},{id:"3",name:"Office Chair",category:"Furniture",price:249.99,stock:8,featured:!0},{id:"4",name:"Notebook Set",category:"Stationery",price:12.99,stock:100,featured:!1},{id:"5",name:"Standing Desk",category:"Furniture",price:499.99,stock:3,featured:!0},{id:"6",name:"Wireless Headphones",category:"Electronics",price:199.99,stock:25,featured:!1},{id:"7",name:"Pen Set",category:"Stationery",price:8.99,stock:75,featured:!1},{id:"8",name:"Monitor 4K",category:"Electronics",price:399.99,stock:12,featured:!0}],x=[{accessorKey:"name",header:"Name"},{accessorKey:"email",header:"Email"},{accessorKey:"role",header:"Role"},{accessorKey:"status",header:"Status",cell:({row:t})=>{const o=t.getValue("status");let s="outline";return o==="active"?s="default":o==="inactive"&&(s="secondary"),e.jsx(c,{variant:s,children:o})}}],O=[{id:"select",header:({table:t})=>e.jsx(C,{checked:t.getIsAllPageRowsSelected()||t.getIsSomePageRowsSelected()&&"indeterminate",onCheckedChange:o=>t.toggleAllPageRowsSelected(!!o),"aria-label":"Select all"}),cell:({row:t})=>e.jsx(C,{checked:t.getIsSelected(),onCheckedChange:o=>t.toggleSelected(!!o),"aria-label":"Select row"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Name",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]})},{accessorKey:"email",header:"Email"},{accessorKey:"role",header:"Role",cell:({row:t})=>{const o=t.getValue("role");return e.jsx(c,{variant:"outline",children:o})}},{accessorKey:"status",header:"Status",cell:({row:t})=>{const o=t.getValue("status");let s="outline";return o==="active"?s="default":o==="inactive"&&(s="secondary"),e.jsx(c,{variant:s,children:o})}},{accessorKey:"joinDate",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Join Date",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]})},{id:"actions",header:"Actions",cell:({row:t})=>{const o=t.original;return e.jsxs($,{children:[e.jsx(Y,{asChild:!0,children:e.jsxs(n,{variant:"ghost",className:"tw-h-8 tw-w-8 tw-p-0",children:[e.jsx("span",{className:"tw-sr-only",children:"Open menu"}),e.jsx(Z,{className:"tw-h-4 tw-w-4"})]})}),e.jsxs(G,{align:"end",children:[e.jsx(Q,{children:"Actions"}),e.jsx(l,{onClick:()=>navigator.clipboard.writeText(o.id),children:"Copy user ID"}),e.jsx(X,{}),e.jsxs(l,{children:[e.jsx(te,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View details"]}),e.jsxs(l,{children:[e.jsx(se,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Edit user"]}),e.jsxs(l,{className:"tw-text-red-600",children:[e.jsx(re,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Delete user"]})]})]})}}],k=[{accessorKey:"name",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Product Name",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]})},{accessorKey:"category",header:"Category"},{accessorKey:"price",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Price",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]}),cell:({row:t})=>{const o=parseFloat(t.getValue("price")),s=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(o);return e.jsx("div",{className:"tw-font-medium",children:s})}},{accessorKey:"stock",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Stock",e.jsx(i,{className:"tw-ml-2 tw-h-4 tw-w-4"})]}),cell:({row:t})=>{const o=parseInt(String(t.getValue("stock")),10);let s="default";return o<10?s="destructive":o<25&&(s="outline"),e.jsxs(c,{variant:s,children:[o," units"]})}},{accessorKey:"featured",header:"Featured",cell:({row:t})=>{const o=t.getValue("featured");return e.jsx(c,{variant:o?"default":"secondary",children:o?"Yes":"No"})}}],d={render:()=>e.jsx(r,{columns:x,data:f,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"A basic table showing user data with minimal configuration."}}}},u={render:()=>e.jsx(r,{columns:k,data:[...a,...a,...a],enablePagination:!0,noResultsMessage:"No products found"}),parameters:{docs:{description:{story:"Table with pagination enabled to handle larger datasets."}}}},m={render:()=>e.jsx(r,{columns:k,data:[...a,...a,...a],enablePagination:!0,showPaginationControls:!0,noResultsMessage:"No products found"}),parameters:{docs:{description:{story:"Table with detailed pagination controls for better navigation."}}}},p={render:()=>e.jsx(r,{columns:O,data:f,showColumnVisibilityControls:!0,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Table with column visibility controls allowing users to show/hide columns."}}}},h={render:()=>e.jsx(r,{columns:k,data:[...a,...a,...a],stickyHeader:!0,noResultsMessage:"No products found"}),parameters:{docs:{description:{story:"Table with sticky header - scroll down to see the header remain fixed."}}}},g={render:()=>e.jsx(r,{columns:O,data:f,enablePagination:!0,showPaginationControls:!0,showColumnVisibilityControls:!0,stickyHeader:!0,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Full-featured DataTable with built-in column visibility controls, pagination, and all features enabled."}}}},w={render:()=>e.jsx(r,{columns:x,data:[],noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Table with no data to show the empty state."}}}},y={render:()=>e.jsx(r,{columns:x,data:void 0,isLoading:!0,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Table with loading data to show the loading state."}}}};var j,S,v;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={users} noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'A basic table showing user data with minimal configuration.'
      }
    }
  }
}`,...(v=(S=d.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var T,N,D;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} enablePagination noResultsMessage="No products found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with pagination enabled to handle larger datasets.'
      }
    }
  }
}`,...(D=(N=u.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var M,P,R;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} enablePagination showPaginationControls noResultsMessage="No products found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with detailed pagination controls for better navigation.'
      }
    }
  }
}`,...(R=(P=m.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var E,V,K;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={advancedUserColumns} data={users} showColumnVisibilityControls noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with column visibility controls allowing users to show/hide columns.'
      }
    }
  }
}`,...(K=(V=p.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var A,U,F;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} // Triple the data to show scrolling
  stickyHeader noResultsMessage="No products found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with sticky header - scroll down to see the header remain fixed.'
      }
    }
  }
}`,...(F=(U=h.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var H,I,L;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={advancedUserColumns} data={users} enablePagination showPaginationControls showColumnVisibilityControls stickyHeader noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Full-featured DataTable with built-in column visibility controls, pagination, and all features enabled.'
      }
    }
  }
}`,...(L=(I=g.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var B,W,_;w.parameters={...w.parameters,docs:{...(B=w.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={[]} noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with no data to show the empty state.'
      }
    }
  }
}`,...(_=(W=w.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var q,J,z;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={undefined} isLoading noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with loading data to show the loading state.'
      }
    }
  }
}`,...(z=(J=y.parameters)==null?void 0:J.docs)==null?void 0:z.source}}};const Ze=["BasicTable","WithPagination","WithPaginationControls","WithColumnVisibilityControls","StickyHeader","FullFeatured","EmptyTable","LoadingTable"];export{d as BasicTable,w as EmptyTable,g as FullFeatured,y as LoadingTable,h as StickyHeader,p as WithColumnVisibilityControls,u as WithPagination,m as WithPaginationControls,Ze as __namedExportsOrder,Xe as default};
