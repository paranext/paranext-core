import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{T as n,a as x,b as o,c as t,d as a,e as d,f as l,g as M}from"./table-B46c0xj4.js";import{T as D}from"./theme-provider.component-Bum-YBGl.js";import"./iframe-BcYeWgcr.js";import"./shadcn-ui.util-DMJ19wEV.js";const U={title:"Shadcn/Table",component:n,tags:["autodocs"],decorators:[s=>e.jsx(D,{children:e.jsx(s,{})})],argTypes:{stickyHeader:{control:"boolean"}}},p=[{invoice:"INV001",paymentStatus:"Paid",totalAmount:"$250.00",paymentMethod:"Credit Card"},{invoice:"INV002",paymentStatus:"Pending",totalAmount:"$150.00",paymentMethod:"PayPal"},{invoice:"INV003",paymentStatus:"Unpaid",totalAmount:"$350.00",paymentMethod:"Bank Transfer"},{invoice:"INV004",paymentStatus:"Paid",totalAmount:"$450.00",paymentMethod:"Credit Card"},{invoice:"INV005",paymentStatus:"Paid",totalAmount:"$550.00",paymentMethod:"PayPal"}],i={render:()=>e.jsxs(n,{children:[e.jsx(x,{children:"A list of your recent invoices."}),e.jsx(o,{children:e.jsxs(t,{children:[e.jsx(a,{className:"w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"tw-text-end",children:"Amount"})]})}),e.jsx(d,{children:p.map(s=>e.jsxs(t,{children:[e.jsx(l,{className:"font-medium",children:s.invoice}),e.jsx(l,{children:s.paymentStatus}),e.jsx(l,{children:s.paymentMethod}),e.jsx(l,{className:"tw-text-end",children:s.totalAmount})]},s.invoice))})]}),parameters:{docs:{description:{story:"A basic table with caption, headers, and data rows."}}}},c={render:()=>e.jsxs(n,{className:"tw-border",children:[e.jsx(x,{children:"A list of your recent invoices."}),e.jsx(o,{children:e.jsxs(t,{children:[e.jsx(a,{className:"w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"tw-text-end",children:"Amount"})]})}),e.jsx(d,{children:p.slice(0,3).map(s=>e.jsxs(t,{"data-state":s.paymentStatus==="Paid"?"selected":"",children:[e.jsx(l,{className:"font-medium",children:s.invoice}),e.jsx(l,{children:s.paymentStatus}),e.jsx(l,{children:s.paymentMethod}),e.jsx(l,{className:"tw-text-end",children:s.totalAmount})]},s.invoice))}),e.jsx(M,{children:e.jsxs(t,{children:[e.jsx(l,{colSpan:3,children:"Total"}),e.jsx(l,{className:"tw-text-end",children:"$750.00"})]})})]}),parameters:{docs:{description:{story:"A table with borders, selected rows, and footer, similar to the original example."}}}},b={render:()=>{const s=Array(15).fill(p).flat();return e.jsx("div",{className:"tw-relative tw-max-h-80 tw-overflow-auto",children:e.jsxs(n,{stickyHeader:!0,className:"tw-border",children:[e.jsx(o,{stickyHeader:!0,children:e.jsxs(t,{children:[e.jsx(a,{className:"w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"tw-text-end",children:"Amount"})]})}),e.jsx(d,{children:s.map((r,E)=>e.jsxs(t,{"data-state":r.paymentStatus==="Paid"?"selected":"",children:[e.jsx(l,{className:"font-medium",children:r.invoice}),e.jsx(l,{children:r.paymentStatus}),e.jsx(l,{children:r.paymentMethod}),e.jsx(l,{className:"tw-text-end",children:r.totalAmount})]},`${r.invoice}-${E}`))}),e.jsx(M,{children:e.jsxs(t,{children:[e.jsx(l,{colSpan:3,children:"Total"}),e.jsx(l,{className:"tw-text-end",children:"$12,750.00"})]})})]})})},parameters:{docs:{description:{story:"A table with sticky header for scrollable content, matching the original example."}}}},T={render:()=>e.jsxs(n,{children:[e.jsx(o,{children:e.jsxs(t,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Email"}),e.jsx(a,{children:"Role"})]})}),e.jsxs(d,{children:[e.jsxs(t,{children:[e.jsx(l,{children:"John Doe"}),e.jsx(l,{children:"john@example.com"}),e.jsx(l,{children:"Admin"})]}),e.jsxs(t,{children:[e.jsx(l,{children:"Jane Smith"}),e.jsx(l,{children:"jane@example.com"}),e.jsx(l,{children:"User"})]}),e.jsxs(t,{children:[e.jsx(l,{children:"Bob Johnson"}),e.jsx(l,{children:"bob@example.com"}),e.jsx(l,{children:"Editor"})]})]})]}),parameters:{docs:{description:{story:"A simple table without caption or footer."}}}},m={render:()=>e.jsxs(n,{children:[e.jsx(o,{children:e.jsxs(t,{children:[e.jsx(a,{children:"Product"}),e.jsx(a,{children:"Price"}),e.jsx(a,{children:"Stock"}),e.jsx(a,{className:"tw-text-end",children:"Actions"})]})}),e.jsxs(d,{children:[e.jsxs(t,{children:[e.jsx(l,{className:"font-medium",children:"Laptop"}),e.jsx(l,{children:"$999.00"}),e.jsx(l,{children:"5"}),e.jsxs(l,{className:"tw-text-end",children:[e.jsx("button",{type:"button",className:"tw-mr-2 tw-text-blue-600 hover:tw-underline",children:"Edit"}),e.jsx("button",{type:"button",className:"tw-text-red-600 hover:tw-underline",children:"Delete"})]})]}),e.jsxs(t,{children:[e.jsx(l,{className:"font-medium",children:"Phone"}),e.jsx(l,{children:"$699.00"}),e.jsx(l,{children:"12"}),e.jsxs(l,{className:"tw-text-end",children:[e.jsx("button",{type:"button",className:"tw-mr-2 tw-text-blue-600 hover:tw-underline",children:"Edit"}),e.jsx("button",{type:"button",className:"tw-text-red-600 hover:tw-underline",children:"Delete"})]})]}),e.jsxs(t,{children:[e.jsx(l,{className:"font-medium",children:"Tablet"}),e.jsx(l,{children:"$399.00"}),e.jsx(l,{children:"8"}),e.jsxs(l,{className:"tw-text-end",children:[e.jsx("button",{type:"button",className:"tw-mr-2 tw-text-blue-600 hover:tw-underline",children:"Edit"}),e.jsx("button",{type:"button",className:"tw-text-red-600 hover:tw-underline",children:"Delete"})]})]})]})]}),parameters:{docs:{description:{story:"A table with action buttons in the last column."}}}},h={render:s=>e.jsxs(n,{...s,children:[e.jsx(x,{children:"Interactive table example"}),e.jsx(o,{children:e.jsxs(t,{children:[e.jsx(a,{children:"ID"}),e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Status"}),e.jsx(a,{className:"tw-text-end",children:"Value"})]})}),e.jsxs(d,{children:[e.jsxs(t,{children:[e.jsx(l,{children:"1"}),e.jsx(l,{children:"Item A"}),e.jsx(l,{children:"Active"}),e.jsx(l,{className:"tw-text-end",children:"$100"})]}),e.jsxs(t,{"data-state":"selected",children:[e.jsx(l,{children:"2"}),e.jsx(l,{children:"Item B"}),e.jsx(l,{children:"Selected"}),e.jsx(l,{className:"tw-text-end",children:"$200"})]}),e.jsxs(t,{children:[e.jsx(l,{children:"3"}),e.jsx(l,{children:"Item C"}),e.jsx(l,{children:"Inactive"}),e.jsx(l,{className:"tw-text-end",children:"$150"})]})]})]}),args:{stickyHeader:!1},parameters:{docs:{description:{story:"An interactive table where you can experiment with properties using the controls."}}}};var u,w,j;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="tw-text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="tw-text-end">{invoice.totalAmount}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>,
  parameters: {
    docs: {
      description: {
        story: 'A basic table with caption, headers, and data rows.'
      }
    }
  }
}`,...(j=(w=i.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var C,y,N;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Table className="tw-border">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="tw-text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 3).map(invoice => <TableRow key={invoice.invoice} data-state={invoice.paymentStatus === 'Paid' ? 'selected' : ''}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="tw-text-end">{invoice.totalAmount}</TableCell>
          </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="tw-text-end">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  parameters: {
    docs: {
      description: {
        story: 'A table with borders, selected rows, and footer, similar to the original example.'
      }
    }
  }
}`,...(N=(y=c.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var v,H,f;b.parameters={...b.parameters,docs:{...(v=b.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const lotsOfInvoices = Array(15).fill(invoices).flat() as typeof invoices;
    return <div className="tw-relative tw-max-h-80 tw-overflow-auto">
        <Table stickyHeader className="tw-border">
          <TableHeader stickyHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="tw-text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lotsOfInvoices.map((invoice, index) => <TableRow
          // eslint-disable-next-line react/no-array-index-key
          key={\`\${invoice.invoice}-\${index}\`} data-state={invoice.paymentStatus === 'Paid' ? 'selected' : ''}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="tw-text-end">{invoice.totalAmount}</TableCell>
              </TableRow>)}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="tw-text-end">$12,750.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A table with sticky header for scrollable content, matching the original example.'
      }
    }
  }
}`,...(f=(H=b.parameters)==null?void 0:H.docs)==null?void 0:f.source}}};var S,A,R;T.parameters={...T.parameters,docs:{...(S=T.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  parameters: {
    docs: {
      description: {
        story: 'A simple table without caption or footer.'
      }
    }
  }
}`,...(R=(A=T.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};var I,$,g;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="tw-text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Laptop</TableCell>
          <TableCell>$999.00</TableCell>
          <TableCell>5</TableCell>
          <TableCell className="tw-text-end">
            <button type="button" className="tw-mr-2 tw-text-blue-600 hover:tw-underline">
              Edit
            </button>
            <button type="button" className="tw-text-red-600 hover:tw-underline">
              Delete
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Phone</TableCell>
          <TableCell>$699.00</TableCell>
          <TableCell>12</TableCell>
          <TableCell className="tw-text-end">
            <button type="button" className="tw-mr-2 tw-text-blue-600 hover:tw-underline">
              Edit
            </button>
            <button type="button" className="tw-text-red-600 hover:tw-underline">
              Delete
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Tablet</TableCell>
          <TableCell>$399.00</TableCell>
          <TableCell>8</TableCell>
          <TableCell className="tw-text-end">
            <button type="button" className="tw-mr-2 tw-text-blue-600 hover:tw-underline">
              Edit
            </button>
            <button type="button" className="tw-text-red-600 hover:tw-underline">
              Delete
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  parameters: {
    docs: {
      description: {
        story: 'A table with action buttons in the last column.'
      }
    }
  }
}`,...(g=($=m.parameters)==null?void 0:$.docs)==null?void 0:g.source}}};var B,P,k;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <Table {...args}>
      <TableCaption>Interactive table example</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="tw-text-end">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Item A</TableCell>
          <TableCell>Active</TableCell>
          <TableCell className="tw-text-end">$100</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>2</TableCell>
          <TableCell>Item B</TableCell>
          <TableCell>Selected</TableCell>
          <TableCell className="tw-text-end">$200</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>Item C</TableCell>
          <TableCell>Inactive</TableCell>
          <TableCell className="tw-text-end">$150</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  args: {
    stickyHeader: false
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive table where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(k=(P=h.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};const q=["Default","WithBorder","StickyHeader","Simple","WithActions","Interactive"];export{i as Default,h as Interactive,T as Simple,b as StickyHeader,m as WithActions,c as WithBorder,q as __namedExportsOrder,U as default};
