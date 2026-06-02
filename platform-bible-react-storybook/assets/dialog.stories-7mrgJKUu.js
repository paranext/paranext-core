import{j as e}from"./jsx-runtime-BqcUmbcY.js";import{B as t}from"./button-dkJvOxUX.js";import{I as x}from"./input-C3oppNdn.js";import{L as j}from"./label-BcGyWUzn.js";import{D as i,a as n,b as r,c as o,d as a,e as s,f as l}from"./dialog-BqAl_-3v.js";import{r as R}from"./iframe-D17QVIDO.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-DJ047YhM.js";import"./index-zpKQ5tK1.js";import"./index-BVjp2WFi.js";import"./index-BIk49uii.js";import"./z-index-BATlIu8s.js";import"./createReactComponent-Bu8AVici.js";import"./index-DoBqkLsE.js";import"./index-DEvm9O_R.js";import"./index-DV9lKDb2.js";import"./index-CbpZKNaP.js";import"./index-peZ2z8Un.js";import"./index-Dnwn17LQ.js";import"./index-C9EIuECM.js";import"./index-B7R79KiY.js";import"./index-DlqDXG03.js";import"./preload-helper-CTOgD26E.js";const ne={title:"Shadcn/Dialog",component:i,tags:["autodocs"]},d={render:()=>e.jsxs(i,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{children:"Open Dialog"})}),e.jsxs(r,{children:[e.jsxs(o,{children:[e.jsx(a,{children:"Dialog Title"}),e.jsx(s,{children:"This is a dialog description. You can place any content here."})]}),e.jsx(l,{children:e.jsx(t,{type:"submit",children:"Save changes"})})]})]}),parameters:{docs:{description:{story:"A basic dialog with title, description, and footer."}}}},g={render:()=>e.jsxs(i,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{children:"Clear Filters"})}),e.jsxs(r,{className:"tw:max-w-sm",children:[e.jsxs(o,{children:[e.jsx(a,{children:"Clear filters"}),e.jsx(s,{children:"Clear filters to show all results?"})]}),e.jsx(l,{children:e.jsx(t,{children:"Show all results"})})]})]}),parameters:{docs:{description:{story:"A confirmation dialog for clearing filters, similar to the original example."}}}},p={render:()=>e.jsxs(i,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{children:"Edit Profile"})}),e.jsxs(r,{className:"tw:max-w-md",children:[e.jsxs(o,{children:[e.jsx(a,{children:"Edit profile"}),e.jsx(s,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"tw:grid tw:gap-4 tw:py-4",children:[e.jsxs("div",{className:"tw:grid tw:grid-cols-4 tw:items-center tw:gap-4",children:[e.jsx(j,{htmlFor:"name",className:"tw:text-right",children:"Name"}),e.jsx(x,{id:"name",defaultValue:"Pedro Duarte",className:"tw:col-span-3"})]}),e.jsxs("div",{className:"tw:grid tw:grid-cols-4 tw:items-center tw:gap-4",children:[e.jsx(j,{htmlFor:"username",className:"tw:text-right",children:"Username"}),e.jsx(x,{id:"username",defaultValue:"@peduarte",className:"tw:col-span-3"})]})]}),e.jsx(l,{children:e.jsx(t,{type:"submit",children:"Save changes"})})]})]}),parameters:{docs:{description:{story:"A dialog containing a form with input fields."}}}},m={render:()=>{const[D,c]=R.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(t,{onClick:()=>c(!0),children:"Open Controlled Dialog"}),e.jsx(i,{open:D,onOpenChange:c,children:e.jsxs(r,{children:[e.jsxs(o,{children:[e.jsx(a,{children:"Controlled Dialog"}),e.jsx(s,{children:"This dialog's open state is controlled by React state."})]}),e.jsxs(l,{children:[e.jsx(t,{variant:"outline",onClick:()=>c(!1),children:"Cancel"}),e.jsx(t,{onClick:()=>c(!1),children:"Confirm"})]})]})})]})},parameters:{docs:{description:{story:"A dialog with controlled open state using React state."}}}},u={render:()=>e.jsxs(i,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"destructive",children:"Delete Item"})}),e.jsxs(r,{className:"tw:max-w-sm",children:[e.jsxs(o,{children:[e.jsx(a,{children:"Are you absolutely sure?"}),e.jsx(s,{children:"This action cannot be undone. This will permanently delete your data."})]}),e.jsxs(l,{children:[e.jsx(t,{variant:"outline",children:"Cancel"}),e.jsx(t,{variant:"destructive",children:"Delete"})]})]})]}),parameters:{docs:{description:{story:"A destructive confirmation dialog for dangerous actions."}}}},h={render:D=>e.jsxs(i,{...D,children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{children:"Interactive Dialog"})}),e.jsxs(r,{children:[e.jsxs(o,{children:[e.jsx(a,{children:"Interactive Dialog"}),e.jsx(s,{children:"Use the controls to experiment with different dialog properties."})]}),e.jsx(l,{children:e.jsx(t,{children:"Close"})})]})]}),parameters:{docs:{description:{story:"An interactive dialog where you can experiment with properties using the controls."}}}};var w,f,C;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. You can place any content here.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  parameters: {
    docs: {
      description: {
        story: 'A basic dialog with title, description, and footer.'
      }
    }
  }
}`,...(C=(f=d.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var y,v,T;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Clear Filters</Button>
      </DialogTrigger>
      <DialogContent className="tw:max-w-sm">
        <DialogHeader>
          <DialogTitle>Clear filters</DialogTitle>
          <DialogDescription>Clear filters to show all results?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Show all results</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  parameters: {
    docs: {
      description: {
        story: 'A confirmation dialog for clearing filters, similar to the original example.'
      }
    }
  }
}`,...(T=(v=g.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var B,F,N;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="tw:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="tw:grid tw:gap-4 tw:py-4">
          <div className="tw:grid tw:grid-cols-4 tw:items-center tw:gap-4">
            <Label htmlFor="name" className="tw:text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="tw:col-span-3" />
          </div>
          <div className="tw:grid tw:grid-cols-4 tw:items-center tw:gap-4">
            <Label htmlFor="username" className="tw:text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="tw:col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  parameters: {
    docs: {
      description: {
        story: 'A dialog containing a form with input fields.'
      }
    }
  }
}`,...(N=(F=p.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var b,S,A;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog&apos;s open state is controlled by React state.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A dialog with controlled open state using React state.'
      }
    }
  }
}`,...(A=(S=m.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var H,O,I;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent className="tw:max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  parameters: {
    docs: {
      description: {
        story: 'A destructive confirmation dialog for dangerous actions.'
      }
    }
  }
}`,...(I=(O=u.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var k,E,L;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Interactive Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Interactive Dialog</DialogTitle>
          <DialogDescription>
            Use the controls to experiment with different dialog properties.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  parameters: {
    docs: {
      description: {
        story: 'An interactive dialog where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(L=(E=h.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};const ce=["Default","ClearFilters","WithForm","Controlled","Destructive","Interactive"];export{g as ClearFilters,m as Controlled,d as Default,u as Destructive,h as Interactive,p as WithForm,ce as __namedExportsOrder,ne as default};
