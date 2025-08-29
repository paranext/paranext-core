import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{r as T}from"./iframe-ChjBVkNN.js";import{D as w}from"./data-table-column-toggle.component-BzzXfGYx.js";import{u as R,g as H}from"./index-BaXKvACY.js";import"./dropdown-menu-uzP2kFQW.js";import"./menu.context-CpkRnBjl.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-DBlYwqkt.js";import"./index-uX5GIGLq.js";import"./index-CtW3L1xI.js";import"./index-B3HFQzOn.js";import"./index-CKeV44jl.js";import"./index-VUEIl7Yq.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-CJGEWkUs.js";import"./index-Db6mirig.js";import"./index-CPgSHOWO.js";import"./index-BjqnVq7v.js";import"./index-a8-6909D.js";import"./index-BeaXc5ys.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./check-DhWHefu6.js";import"./createLucideIcon-CVIRtPIF.js";import"./circle-CPJPDZbi.js";import"./chevron-right-DW0kcE5l.js";import"./button-BOi5X0CC.js";import"./filter-DcynEAUZ.js";const ue={title:"Advanced/DataTableViewOptions",component:w,tags:["autodocs"],parameters:{docs:{description:{component:`
A dropdown component for toggling column visibility in data tables.

This component provides:
- Dropdown menu with checkboxes for each hideable column
- Toggle individual column visibility
- Responsive design (hidden on smaller screens)
- Integration with TanStack Table's column visibility state

Perfect for allowing users to customize which columns they want to see in large data tables.
        `}}},argTypes:{table:{control:!1,description:"TanStack Table instance with column visibility state"}}},p=[{id:"1",firstName:"John",lastName:"Doe",email:"john.doe@company.com",department:"Engineering",position:"Senior Developer",salary:85e3,startDate:"2022-01-15",status:"active"},{id:"2",firstName:"Jane",lastName:"Smith",email:"jane.smith@company.com",department:"Marketing",position:"Marketing Manager",salary:75e3,startDate:"2021-06-10",status:"active"},{id:"3",firstName:"Bob",lastName:"Johnson",email:"bob.johnson@company.com",department:"Sales",position:"Sales Representative",salary:55e3,startDate:"2023-03-22",status:"active"},{id:"4",firstName:"Alice",lastName:"Brown",email:"alice.brown@company.com",department:"HR",position:"HR Specialist",salary:6e4,startDate:"2022-11-05",status:"inactive"}],E=[{id:"firstName",accessorKey:"firstName",header:"First Name"},{id:"lastName",accessorKey:"lastName",header:"Last Name"},{id:"email",accessorKey:"email",header:"Email"},{id:"department",accessorKey:"department",header:"Department"},{id:"position",accessorKey:"position",header:"Position"},{id:"salary",accessorKey:"salary",header:"Salary",cell:({row:i})=>{const n=i.getValue("salary");return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n)}},{id:"startDate",accessorKey:"startDate",header:"Start Date"},{id:"status",accessorKey:"status",header:"Status"}];function h({hideableColumns:i=["department","position","salary","startDate","status"]}){const[n,u]=T.useState({}),o=E.map(t=>({...t,enableHiding:t.id?i.includes(t.id):!1})),a=R({data:p,columns:o,getCoreRowModel:H(),onColumnVisibilityChange:u,state:{columnVisibility:n}});return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Employee Data"}),e.jsx(w,{table:a})]}),e.jsx("div",{className:"tw-overflow-x-auto tw-rounded tw-border",children:e.jsxs("table",{className:"tw-w-full",children:[e.jsx("thead",{children:e.jsx("tr",{className:"tw-border-b",children:a.getHeaderGroups().map(t=>t.headers.map(s=>e.jsx("th",{className:"tw-p-3 tw-text-left tw-text-sm tw-font-medium",children:s.isPlaceholder?void 0:e.jsx("span",{children:typeof s.column.columnDef.header=="string"?s.column.columnDef.header:"Column"})},s.id)))})}),e.jsx("tbody",{children:a.getRowModel().rows.map(t=>e.jsx("tr",{className:"tw-border-b",children:t.getVisibleCells().map(s=>e.jsx("td",{className:"tw-p-3 tw-text-sm",children:typeof s.column.columnDef.cell=="function"?s.column.columnDef.cell(s.getContext()):s.getValue()},s.id))},t.id))})]})}),e.jsxs("div",{className:"tw-text-xs tw-text-muted-foreground",children:["Visible columns: ",a.getVisibleLeafColumns().length," of"," ",a.getAllLeafColumns().length]})]})}const r={render:()=>e.jsx(h,{})},m={render:()=>e.jsx(h,{hideableColumns:["firstName","lastName","email","department","position","salary","startDate","status"]}),parameters:{docs:{description:{story:"All columns can be hidden/shown using the column toggle."}}}},d={render:()=>e.jsx(h,{hideableColumns:["department","salary"]}),parameters:{docs:{description:{story:"Only specific columns (department and salary) can be toggled."}}}},c={render:()=>{const[i,n]=T.useState({salary:!1,startDate:!1}),u=E.map(t=>({...t,enableHiding:t.id?["department","position","salary","startDate","status"].includes(t.id):!1})),o=R({data:p,columns:u,getCoreRowModel:H(),onColumnVisibilityChange:n,state:{columnVisibility:i}}),a=Object.entries(i).filter(([,t])=>!t).map(([t])=>t);return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Interactive Column Toggle"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:'Use the "View" button to show/hide columns'})]}),e.jsx(w,{table:o})]}),a.length>0&&e.jsx("div",{className:"tw-rounded tw-border tw-bg-orange-50 tw-p-3",children:e.jsxs("div",{className:"tw-text-sm tw-font-medium tw-text-orange-800",children:["Hidden columns: ",a.join(", ")]})}),e.jsx("div",{className:"tw-overflow-x-auto tw-rounded tw-border",children:e.jsxs("table",{className:"tw-w-full",children:[e.jsx("thead",{children:e.jsx("tr",{className:"tw-border-b tw-bg-gray-50",children:o.getHeaderGroups().map(t=>t.headers.map(s=>e.jsx("th",{className:"tw-p-3 tw-text-left tw-text-sm tw-font-medium",children:s.isPlaceholder?void 0:e.jsx("span",{children:typeof s.column.columnDef.header=="string"?s.column.columnDef.header:"Column"})},s.id)))})}),e.jsx("tbody",{children:o.getRowModel().rows.map((t,s)=>e.jsx("tr",{className:`tw-border-b ${s%2===0?"tw-bg-gray-25":""}`,children:t.getVisibleCells().map(l=>e.jsx("td",{className:"tw-p-3 tw-text-sm",children:typeof l.column.columnDef.cell=="function"?l.column.columnDef.cell(l.getContext()):l.getValue()},l.id))},t.id))})]})}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-text-xs tw-text-muted-foreground",children:[e.jsxs("div",{children:["Showing ",o.getVisibleLeafColumns().length," of ",o.getAllLeafColumns().length," ","columns"]}),e.jsxs("div",{children:[p.length," employees total"]})]})]})},parameters:{docs:{description:{story:"Interactive example starting with some columns hidden and showing dynamic updates."}}}};var g,b,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <ColumnToggleDemo />
}`,...(y=(b=r.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var f,x,v;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <ColumnToggleDemo hideableColumns={['firstName', 'lastName', 'email', 'department', 'position', 'salary', 'startDate', 'status']} />,
  parameters: {
    docs: {
      description: {
        story: 'All columns can be hidden/shown using the column toggle.'
      }
    }
  }
}`,...(v=(x=m.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var N,j,C;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <ColumnToggleDemo hideableColumns={['department', 'salary']} />,
  parameters: {
    docs: {
      description: {
        story: 'Only specific columns (department and salary) can be toggled.'
      }
    }
  }
}`,...(C=(j=d.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var D,V,S;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
      salary: false,
      // Start with salary hidden
      startDate: false // Start with start date hidden
    });
    const columnsWithHiding = employeeColumns.map(col => ({
      ...col,
      enableHiding: col.id ? ['department', 'position', 'salary', 'startDate', 'status'].includes(col.id) : false
    }));
    const table = useReactTable({
      data: sampleEmployees,
      columns: columnsWithHiding,
      getCoreRowModel: getCoreRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
        columnVisibility
      }
    });
    const hiddenColumns = Object.entries(columnVisibility).filter(([, visible]) => !visible).map(([column]) => column);
    return <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div>
            <h3 className="tw-text-lg tw-font-semibold">Interactive Column Toggle</h3>
            <p className="tw-text-sm tw-text-muted-foreground">
              Use the &quot;View&quot; button to show/hide columns
            </p>
          </div>
          <DataTableViewOptions table={table} />
        </div>

        {hiddenColumns.length > 0 && <div className="tw-rounded tw-border tw-bg-orange-50 tw-p-3">
            <div className="tw-text-sm tw-font-medium tw-text-orange-800">
              Hidden columns: {hiddenColumns.join(', ')}
            </div>
          </div>}

        <div className="tw-overflow-x-auto tw-rounded tw-border">
          <table className="tw-w-full">
            <thead>
              <tr className="tw-border-b tw-bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => headerGroup.headers.map(header => <th key={header.id} className="tw-p-3 tw-text-left tw-text-sm tw-font-medium">
                      {header.isPlaceholder ? undefined : <span>
                          {typeof header.column.columnDef.header === 'string' ? header.column.columnDef.header : 'Column'}
                        </span>}
                    </th>))}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => <tr key={row.id} className={\`tw-border-b \${index % 2 === 0 ? 'tw-bg-gray-25' : ''}\`}>
                  {row.getVisibleCells().map(cell => <td key={cell.id} className="tw-p-3 tw-text-sm">
                      {typeof cell.column.columnDef.cell === 'function' ? cell.column.columnDef.cell(cell.getContext()) :
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                cell.getValue() as React.ReactNode}
                    </td>)}
                </tr>)}
            </tbody>
          </table>
        </div>

        <div className="tw-flex tw-items-center tw-justify-between tw-text-xs tw-text-muted-foreground">
          <div>
            Showing {table.getVisibleLeafColumns().length} of {table.getAllLeafColumns().length}{' '}
            columns
          </div>
          <div>{sampleEmployees.length} employees total</div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example starting with some columns hidden and showing dynamic updates.'
      }
    }
  }
}`,...(S=(V=c.parameters)==null?void 0:V.docs)==null?void 0:S.source}}};const pe=["Default","AllColumnsHideable","LimitedToggle","InteractiveExample"];export{m as AllColumnsHideable,r as Default,c as InteractiveExample,d as LimitedToggle,pe as __namedExportsOrder,ue as default};
