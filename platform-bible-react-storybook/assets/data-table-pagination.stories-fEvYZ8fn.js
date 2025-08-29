import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{D as h}from"./data-table-pagination.component-OLyZGhFZ.js";import{u as C,a as T,g as I}from"./index-BaXKvACY.js";import{r as g}from"./iframe-ChjBVkNN.js";import"./button-BOi5X0CC.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./select-BaRi3ik1.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-BaQP4hhM.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-DBlYwqkt.js";import"./index-uX5GIGLq.js";import"./index-CKeV44jl.js";import"./index-VUEIl7Yq.js";import"./index-DF789n87.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-CJGEWkUs.js";import"./index-Db6mirig.js";import"./index-CPgSHOWO.js";import"./index-BjqnVq7v.js";import"./index-DI1pkOJa.js";import"./index-CTXI5JpQ.js";import"./chevron-down-BQV-xBvd.js";import"./createLucideIcon-CVIRtPIF.js";import"./check-DhWHefu6.js";import"./arrow-right-C51dLHJc.js";import"./chevron-left-CSrm-Qxr.js";import"./chevron-right-DW0kcE5l.js";const we={title:"Advanced/DataTablePagination",component:h,tags:["autodocs"],parameters:{docs:{description:{component:`
A pagination component designed to work with TanStack Table for data table navigation.

This component provides:
- Page navigation (first, previous, next, last)
- Rows per page selection
- Current page and total pages display
- Selected rows count
- Responsive design (some buttons hidden on smaller screens)

Typically used as part of the DataTable component ecosystem.
        `}}},argTypes:{table:{control:!1,description:"TanStack Table instance with pagination state"}}},w=Array.from({length:100},(a,i)=>({id:`${i+1}`,name:`User ${i+1}`,email:`user${i+1}@example.com`,role:["Admin","User","Moderator"][i%3],status:i%4===0?"inactive":"active"})),M=[{accessorKey:"name",header:"Name"},{accessorKey:"email",header:"Email"},{accessorKey:"role",header:"Role"},{accessorKey:"status",header:"Status"}];function u({initialPageSize:a=10}){const[i,r]=g.useState({}),d=C({data:w,columns:M,getCoreRowModel:I(),getPaginationRowModel:T(),onRowSelectionChange:r,state:{rowSelection:i},initialState:{pagination:{pageSize:a}}});return e.jsx("div",{className:"tw-space-y-4",children:e.jsxs("div",{className:"tw-rounded tw-border",children:[e.jsxs("div",{className:"tw-p-4",children:[e.jsx("h3",{className:"tw-mb-2 tw-text-lg tw-font-semibold",children:"Data Table Example"}),e.jsx("p",{className:"tw-mb-4 tw-text-sm tw-text-muted-foreground",children:"This shows the pagination component with a simulated data table."}),e.jsxs("div",{className:"tw-mb-2 tw-grid tw-grid-cols-4 tw-gap-4 tw-border-b tw-pb-2 tw-text-sm tw-font-medium",children:[e.jsx("div",{children:"Name"}),e.jsx("div",{children:"Email"}),e.jsx("div",{children:"Role"}),e.jsx("div",{children:"Status"})]}),d.getRowModel().rows.map(o=>e.jsxs("div",{className:"tw-grid tw-grid-cols-4 tw-gap-4 tw-border-b tw-py-2 tw-text-sm",children:[e.jsx("div",{children:o.original.name}),e.jsx("div",{children:o.original.email}),e.jsx("div",{children:o.original.role}),e.jsx("div",{children:o.original.status})]},o.id))]}),e.jsx(h,{table:d})]})})}const c={render:()=>e.jsx(u,{})},l={render:()=>e.jsx(u,{initialPageSize:5}),parameters:{docs:{description:{story:"Pagination with a smaller page size to show more navigation interactions."}}}},m={render:()=>e.jsx(u,{initialPageSize:25}),parameters:{docs:{description:{story:"Pagination with a larger page size, showing fewer pages."}}}},p={render:()=>{const[a,i]=g.useState({}),[r,d]=g.useState(10),o=C({data:w,columns:[{id:"select",header:"Select",cell:({row:t})=>e.jsx("input",{type:"checkbox",checked:t.getIsSelected(),onChange:s=>{const n={...a};s.target.checked?n[t.id]=!0:delete n[t.id],i(n)}})},...M],getCoreRowModel:I(),getPaginationRowModel:T(),onRowSelectionChange:i,state:{rowSelection:a,pagination:{pageIndex:0,pageSize:r}},onPaginationChange:t=>{if(typeof t=="function"){const s=t({pageIndex:0,pageSize:r});d(s.pageSize)}}});return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Interactive Pagination"}),e.jsx("div",{className:"tw-text-sm tw-text-muted-foreground",children:"Try selecting rows and changing page size"})]}),e.jsxs("div",{className:"tw-rounded tw-border",children:[e.jsxs("div",{className:"tw-p-4",children:[e.jsxs("div",{className:"tw-mb-2 tw-grid tw-grid-cols-5 tw-gap-4 tw-border-b tw-pb-2 tw-text-sm tw-font-medium",children:[e.jsx("div",{children:"Select"}),e.jsx("div",{children:"Name"}),e.jsx("div",{children:"Email"}),e.jsx("div",{children:"Role"}),e.jsx("div",{children:"Status"})]}),o.getRowModel().rows.map(t=>e.jsxs("div",{className:"tw-grid tw-grid-cols-5 tw-gap-4 tw-border-b tw-py-2 tw-text-sm",children:[e.jsx("div",{children:e.jsx("input",{type:"checkbox",checked:t.getIsSelected(),onChange:s=>{const n={...a};s.target.checked?n[t.id]=!0:delete n[t.id],i(n)}})}),e.jsx("div",{children:t.original.name}),e.jsx("div",{children:t.original.email}),e.jsx("div",{children:t.original.role}),e.jsx("div",{children:t.original.status})]},t.id))]}),e.jsx(h,{table:o})]}),Object.keys(a).length>0&&e.jsxs("div",{className:"tw-rounded tw-border tw-bg-blue-50 tw-p-4",children:[e.jsx("h4",{className:"tw-mb-2 tw-font-medium",children:"Selected Rows:"}),e.jsx("div",{className:"tw-text-sm tw-text-muted-foreground",children:Object.keys(a).map(t=>{var s;return(s=w[parseInt(t,10)])==null?void 0:s.name}).join(", ")})]})]})},parameters:{docs:{description:{story:"Interactive example with row selection and dynamic pagination updates."}}}};var v,x,S;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <PaginationDemo />
}`,...(S=(x=c.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var b,j,f;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <PaginationDemo initialPageSize={5} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a smaller page size to show more navigation interactions.'
      }
    }
  }
}`,...(f=(j=l.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};var y,N,R;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <PaginationDemo initialPageSize={25} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a larger page size, showing fewer pages.'
      }
    }
  }
}`,...(R=(N=m.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var P,z,k;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [pageSize, setPageSize] = useState(10);
    const table = useReactTable({
      data: sampleUsers,
      columns: [{
        id: 'select',
        header: 'Select',
        cell: ({
          row
        }) => <input type="checkbox" checked={row.getIsSelected()} onChange={e => {
          const newSelection = {
            ...rowSelection
          };
          if (e.target.checked) {
            newSelection[row.id] = true;
          } else {
            delete newSelection[row.id];
          }
          setRowSelection(newSelection);
        }} />
      }, ...columns],
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        rowSelection,
        pagination: {
          pageIndex: 0,
          pageSize
        }
      },
      onPaginationChange: updater => {
        if (typeof updater === 'function') {
          const newState = updater({
            pageIndex: 0,
            pageSize
          });
          setPageSize(newState.pageSize);
        }
      }
    });
    return <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-gap-4">
          <h3 className="tw-text-lg tw-font-semibold">Interactive Pagination</h3>
          <div className="tw-text-sm tw-text-muted-foreground">
            Try selecting rows and changing page size
          </div>
        </div>

        <div className="tw-rounded tw-border">
          <div className="tw-p-4">
            <div className="tw-mb-2 tw-grid tw-grid-cols-5 tw-gap-4 tw-border-b tw-pb-2 tw-text-sm tw-font-medium">
              <div>Select</div>
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Status</div>
            </div>

            {table.getRowModel().rows.map(row => <div key={row.id} className="tw-grid tw-grid-cols-5 tw-gap-4 tw-border-b tw-py-2 tw-text-sm">
                <div>
                  <input type="checkbox" checked={row.getIsSelected()} onChange={e => {
                const newSelection = {
                  ...rowSelection
                };
                if (e.target.checked) {
                  newSelection[row.id] = true;
                } else {
                  delete newSelection[row.id];
                }
                setRowSelection(newSelection);
              }} />
                </div>
                <div>{row.original.name}</div>
                <div>{row.original.email}</div>
                <div>{row.original.role}</div>
                <div>{row.original.status}</div>
              </div>)}
          </div>

          <DataTablePagination table={table} />
        </div>

        {Object.keys(rowSelection).length > 0 && <div className="tw-rounded tw-border tw-bg-blue-50 tw-p-4">
            <h4 className="tw-mb-2 tw-font-medium">Selected Rows:</h4>
            <div className="tw-text-sm tw-text-muted-foreground">
              {Object.keys(rowSelection).map(id => sampleUsers[parseInt(id, 10)]?.name).join(', ')}
            </div>
          </div>}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with row selection and dynamic pagination updates.'
      }
    }
  }
}`,...(k=(z=p.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};const he=["Default","SmallPageSize","LargePageSize","InteractiveExample"];export{c as Default,p as InteractiveExample,m as LargePageSize,l as SmallPageSize,he as __namedExportsOrder,we as default};
