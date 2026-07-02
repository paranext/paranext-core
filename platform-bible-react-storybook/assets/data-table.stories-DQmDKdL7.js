import{j as e}from"./iframe-Dw0rVdo7.js";import{D as r}from"./data-table.component-D00rKD_j.js";import{B as n}from"./button-DMNDC7aB.js";import{B as c}from"./badge-CRNfBaMu.js";import{C as k}from"./checkbox-CXA87VMf.js";import{D as Y,a as $,b as G,c as Q,e as l,d as X}from"./dropdown-menu-BuTlWkB8.js";import{c as O}from"./createLucideIcon-CuO2Cm-m.js";import{E as Z,T as ee}from"./trash-2-B7XjUK4p.js";import{E as te}from"./eye-yUtKz29v.js";import"./preload-helper-CTOgD26E.js";import"./index-BkEuJfNM.js";import"./funnel-Df2Jmsbf.js";import"./select-Cs-EZS9q.js";import"./utils-BPbySc-g.js";import"./createReactComponent-1MGnNPfE.js";import"./IconCheck-DYO8bJDn.js";import"./index-BaQP4hhM.js";import"./index-BStPAbu_.js";import"./index-D9mJ00bA.js";import"./index-CtGA9XXZ.js";import"./index-BjWwjg1F.js";import"./index-BYchALu_.js";import"./index-Cfl-M2qe.js";import"./index-B66_QFvp.js";import"./index-wxsUL-3S.js";import"./index-BT3cHHEV.js";import"./index-Uwo-3Th-.js";import"./index-Do87lSy7.js";import"./index-Dnj6JFjT.js";import"./index-Bz0x5Def.js";import"./index-B_8u8Kfy.js";import"./arrow-left-Bier-1w2.js";import"./chevron-right-CsX4k_sJ.js";import"./arrow-right-DdSiD699.js";import"./table-_td6qrBz.js";import"./skeleton-DT7L7V6X.js";import"./index-BnuTq2W6.js";import"./index-DXjIsSlA.js";import"./menu.context-pr3jKN2R.js";import"./IconChevronRight-Co7cDFO2.js";import"./index-CJqYzo72.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]],i=O("arrow-up-down",se);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],ae=O("square-pen",oe),Oe={title:"Advanced/DataTable",component:r,tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{columns:{control:!1,description:"Array of column definitions"},data:{control:!1,description:"Array of data to display in the table"},enablePagination:{control:"boolean",description:"Enable pagination for the table"},showPaginationControls:{control:"boolean",description:"Show detailed pagination controls"},showColumnVisibilityControls:{control:"boolean",description:"Show column visibility toggle controls"},stickyHeader:{control:"boolean",description:"Make the table header sticky when scrolling"},onRowClickHandler:{action:"row-clicked",description:"Handler function called when a row is clicked"}}},f=[{id:"1",name:"John Doe",email:"john@example.com",role:"Admin",status:"active",joinDate:"2023-01-15",lastLogin:"2024-08-19"},{id:"2",name:"Jane Smith",email:"jane@example.com",role:"User",status:"active",joinDate:"2023-03-22",lastLogin:"2024-08-18"},{id:"3",name:"Bob Johnson",email:"bob@example.com",role:"Moderator",status:"inactive",joinDate:"2023-05-10",lastLogin:"2024-08-15"},{id:"4",name:"Alice Brown",email:"alice@example.com",role:"User",status:"pending",joinDate:"2024-08-01",lastLogin:"Never"},{id:"5",name:"Charlie Wilson",email:"charlie@example.com",role:"User",status:"active",joinDate:"2023-12-05",lastLogin:"2024-08-17"}],a=[{id:"1",name:"Laptop Pro",category:"Electronics",price:1299.99,stock:15,featured:!0},{id:"2",name:"Wireless Mouse",category:"Electronics",price:29.99,stock:50,featured:!1},{id:"3",name:"Office Chair",category:"Furniture",price:249.99,stock:8,featured:!0},{id:"4",name:"Notebook Set",category:"Stationery",price:12.99,stock:100,featured:!1},{id:"5",name:"Standing Desk",category:"Furniture",price:499.99,stock:3,featured:!0},{id:"6",name:"Wireless Headphones",category:"Electronics",price:199.99,stock:25,featured:!1},{id:"7",name:"Pen Set",category:"Stationery",price:8.99,stock:75,featured:!1},{id:"8",name:"Monitor 4K",category:"Electronics",price:399.99,stock:12,featured:!0}],b=[{accessorKey:"name",header:"Name"},{accessorKey:"email",header:"Email"},{accessorKey:"role",header:"Role"},{accessorKey:"status",header:"Status",cell:({row:t})=>{const s=t.getValue("status");let o="outline";return s==="active"?o="default":s==="inactive"&&(o="secondary"),e.jsx(c,{variant:o,children:s})}}],z=[{id:"select",header:({table:t})=>e.jsx(k,{checked:t.getIsAllPageRowsSelected()||t.getIsSomePageRowsSelected()&&"indeterminate",onCheckedChange:s=>t.toggleAllPageRowsSelected(!!s),"aria-label":"Select all"}),cell:({row:t})=>e.jsx(k,{checked:t.getIsSelected(),onCheckedChange:s=>t.toggleSelected(!!s),"aria-label":"Select row"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Name",e.jsx(i,{className:"tw:ml-2 tw:h-4 tw:w-4"})]})},{accessorKey:"email",header:"Email"},{accessorKey:"role",header:"Role",cell:({row:t})=>{const s=t.getValue("role");return e.jsx(c,{variant:"outline",children:s})}},{accessorKey:"status",header:"Status",cell:({row:t})=>{const s=t.getValue("status");let o="outline";return s==="active"?o="default":s==="inactive"&&(o="secondary"),e.jsx(c,{variant:o,children:s})}},{accessorKey:"joinDate",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Join Date",e.jsx(i,{className:"tw:ml-2 tw:h-4 tw:w-4"})]})},{id:"actions",header:"Actions",cell:({row:t})=>{const s=t.original;return e.jsxs(Y,{children:[e.jsx($,{asChild:!0,children:e.jsxs(n,{variant:"ghost",className:"tw:h-8 tw:w-8 tw:p-0",children:[e.jsx("span",{className:"tw:sr-only",children:"Open menu"}),e.jsx(Z,{className:"tw:h-4 tw:w-4"})]})}),e.jsxs(G,{align:"end",children:[e.jsx(Q,{children:"Actions"}),e.jsx(l,{onClick:()=>navigator.clipboard.writeText(s.id),children:"Copy user ID"}),e.jsx(X,{}),e.jsxs(l,{children:[e.jsx(te,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"View details"]}),e.jsxs(l,{children:[e.jsx(ae,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Edit user"]}),e.jsxs(l,{className:"tw:text-red-600",children:[e.jsx(ee,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Delete user"]})]})]})}}],x=[{accessorKey:"name",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Product Name",e.jsx(i,{className:"tw:ml-2 tw:h-4 tw:w-4"})]})},{accessorKey:"category",header:"Category"},{accessorKey:"price",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Price",e.jsx(i,{className:"tw:ml-2 tw:h-4 tw:w-4"})]}),cell:({row:t})=>{const s=parseFloat(t.getValue("price")),o=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(s);return e.jsx("div",{className:"tw:font-medium",children:o})}},{accessorKey:"stock",header:({column:t})=>e.jsxs(n,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Stock",e.jsx(i,{className:"tw:ml-2 tw:h-4 tw:w-4"})]}),cell:({row:t})=>{const s=parseInt(String(t.getValue("stock")),10);let o="default";return s<10?o="destructive":s<25&&(o="outline"),e.jsxs(c,{variant:o,children:[s," units"]})}},{accessorKey:"featured",header:"Featured",cell:({row:t})=>{const s=t.getValue("featured");return e.jsx(c,{variant:s?"default":"secondary",children:s?"Yes":"No"})}}],d={render:()=>e.jsx(r,{columns:b,data:f,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"A basic table showing user data with minimal configuration."}}}},u={render:()=>e.jsx(r,{columns:x,data:[...a,...a,...a],enablePagination:!0,noResultsMessage:"No products found"}),parameters:{docs:{description:{story:"Table with pagination enabled to handle larger datasets."}}}},m={render:()=>e.jsx(r,{columns:x,data:[...a,...a,...a],enablePagination:!0,showPaginationControls:!0,noResultsMessage:"No products found"}),parameters:{docs:{description:{story:"Table with detailed pagination controls for better navigation."}}}},p={render:()=>e.jsx(r,{columns:z,data:f,showColumnVisibilityControls:!0,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Table with column visibility controls allowing users to show/hide columns."}}}},h={render:()=>e.jsx(r,{columns:x,data:[...a,...a,...a],stickyHeader:!0,noResultsMessage:"No products found"}),parameters:{docs:{description:{story:"Table with sticky header - scroll down to see the header remain fixed."}}}},g={render:()=>e.jsx(r,{columns:z,data:f,enablePagination:!0,showPaginationControls:!0,showColumnVisibilityControls:!0,stickyHeader:!0,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Full-featured DataTable with built-in column visibility controls, pagination, and all features enabled."}}}},w={render:()=>e.jsx(r,{columns:b,data:[],noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Table with no data to show the empty state."}}}},y={render:()=>e.jsx(r,{columns:b,data:void 0,isLoading:!0,noResultsMessage:"No users found"}),parameters:{docs:{description:{story:"Table with loading data to show the loading state."}}}};var C,j,S;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={users} noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'A basic table showing user data with minimal configuration.'
      }
    }
  }
}`,...(S=(j=d.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var v,T,N;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} enablePagination noResultsMessage="No products found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with pagination enabled to handle larger datasets.'
      }
    }
  }
}`,...(N=(T=u.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var D,M,P;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} enablePagination showPaginationControls noResultsMessage="No products found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with detailed pagination controls for better navigation.'
      }
    }
  }
}`,...(P=(M=m.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var R,E,K;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={advancedUserColumns} data={users} showColumnVisibilityControls noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with column visibility controls allowing users to show/hide columns.'
      }
    }
  }
}`,...(K=(E=p.parameters)==null?void 0:E.docs)==null?void 0:K.source}}};var V,U,A;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <DataTable<Product, unknown> columns={productColumns} data={[...products, ...products, ...products]} // Triple the data to show scrolling
  stickyHeader noResultsMessage="No products found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with sticky header - scroll down to see the header remain fixed.'
      }
    }
  }
}`,...(A=(U=h.parameters)==null?void 0:U.docs)==null?void 0:A.source}}};var F,I,H;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={advancedUserColumns} data={users} enablePagination showPaginationControls showColumnVisibilityControls stickyHeader noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Full-featured DataTable with built-in column visibility controls, pagination, and all features enabled.'
      }
    }
  }
}`,...(H=(I=g.parameters)==null?void 0:I.docs)==null?void 0:H.source}}};var L,B,W;w.parameters={...w.parameters,docs:{...(L=w.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={[]} noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with no data to show the empty state.'
      }
    }
  }
}`,...(W=(B=w.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var _,q,J;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <DataTable<User, unknown> columns={userColumns} data={undefined} isLoading noResultsMessage="No users found" />,
  parameters: {
    docs: {
      description: {
        story: 'Table with loading data to show the loading state.'
      }
    }
  }
}`,...(J=(q=y.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};const ze=["BasicTable","WithPagination","WithPaginationControls","WithColumnVisibilityControls","StickyHeader","FullFeatured","EmptyTable","LoadingTable"];export{d as BasicTable,w as EmptyTable,g as FullFeatured,y as LoadingTable,h as StickyHeader,p as WithColumnVisibilityControls,u as WithPagination,m as WithPaginationControls,ze as __namedExportsOrder,Oe as default};
