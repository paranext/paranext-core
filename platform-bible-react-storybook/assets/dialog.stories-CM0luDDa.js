import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{B as t}from"./button-BklEqBlb.js";import{I as x}from"./input-CLS-C3Rv.js";import{L as j}from"./label-dXSGOCoI.js";import{D as i,a as c,b as r,c as o,d as a,e as s,f as l}from"./dialog-CvNK3B2l.js";import{T as P}from"./theme-provider.component-Bum-YBGl.js";import{r as R}from"./iframe-BcYeWgcr.js";import"./index-BJ893FO-.js";import"./index-DNc3TkLQ.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-CHtcClp9.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BRjj-Bil.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-Dxmr7YCn.js";import"./index-BTW_afRk.js";import"./index-BdtTgfff.js";import"./index-BDeDN-dv.js";import"./index-D2kttkiv.js";import"./index-hI4Fiusr.js";import"./x-GMUNTJKS.js";import"./createLucideIcon-D1oFpSf_.js";const de={title:"Shadcn/Dialog",component:i,tags:["autodocs"],decorators:[n=>e.jsx(P,{children:e.jsx(n,{})})]},g={render:()=>e.jsxs(i,{children:[e.jsx(c,{asChild:!0,children:e.jsx(t,{children:"Open Dialog"})}),e.jsxs(r,{children:[e.jsxs(o,{children:[e.jsx(a,{children:"Dialog Title"}),e.jsx(s,{children:"This is a dialog description. You can place any content here."})]}),e.jsx(l,{children:e.jsx(t,{type:"submit",children:"Save changes"})})]})]}),parameters:{docs:{description:{story:"A basic dialog with title, description, and footer."}}}},p={render:()=>e.jsxs(i,{children:[e.jsx(c,{asChild:!0,children:e.jsx(t,{children:"Clear Filters"})}),e.jsxs(r,{className:"tw-max-w-sm",children:[e.jsxs(o,{children:[e.jsx(a,{children:"Clear filters"}),e.jsx(s,{children:"Clear filters to show all results?"})]}),e.jsx(l,{children:e.jsx(t,{children:"Show all results"})})]})]}),parameters:{docs:{description:{story:"A confirmation dialog for clearing filters, similar to the original example."}}}},m={render:()=>e.jsxs(i,{children:[e.jsx(c,{asChild:!0,children:e.jsx(t,{children:"Edit Profile"})}),e.jsxs(r,{className:"tw-max-w-md",children:[e.jsxs(o,{children:[e.jsx(a,{children:"Edit profile"}),e.jsx(s,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"tw-grid tw-gap-4 tw-py-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-4 tw-items-center tw-gap-4",children:[e.jsx(j,{htmlFor:"name",className:"tw-text-right",children:"Name"}),e.jsx(x,{id:"name",defaultValue:"Pedro Duarte",className:"tw-col-span-3"})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-4 tw-items-center tw-gap-4",children:[e.jsx(j,{htmlFor:"username",className:"tw-text-right",children:"Username"}),e.jsx(x,{id:"username",defaultValue:"@peduarte",className:"tw-col-span-3"})]})]}),e.jsx(l,{children:e.jsx(t,{type:"submit",children:"Save changes"})})]})]}),parameters:{docs:{description:{story:"A dialog containing a form with input fields."}}}},u={render:()=>{const[n,d]=R.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(t,{onClick:()=>d(!0),children:"Open Controlled Dialog"}),e.jsx(i,{open:n,onOpenChange:d,children:e.jsxs(r,{children:[e.jsxs(o,{children:[e.jsx(a,{children:"Controlled Dialog"}),e.jsx(s,{children:"This dialog's open state is controlled by React state."})]}),e.jsxs(l,{children:[e.jsx(t,{variant:"outline",onClick:()=>d(!1),children:"Cancel"}),e.jsx(t,{onClick:()=>d(!1),children:"Confirm"})]})]})})]})},parameters:{docs:{description:{story:"A dialog with controlled open state using React state."}}}},h={render:()=>e.jsxs(i,{children:[e.jsx(c,{asChild:!0,children:e.jsx(t,{variant:"destructive",children:"Delete Item"})}),e.jsxs(r,{className:"tw-max-w-sm",children:[e.jsxs(o,{children:[e.jsx(a,{children:"Are you absolutely sure?"}),e.jsx(s,{children:"This action cannot be undone. This will permanently delete your data."})]}),e.jsxs(l,{children:[e.jsx(t,{variant:"outline",children:"Cancel"}),e.jsx(t,{variant:"destructive",children:"Delete"})]})]})]}),parameters:{docs:{description:{story:"A destructive confirmation dialog for dangerous actions."}}}},D={render:n=>e.jsxs(i,{...n,children:[e.jsx(c,{asChild:!0,children:e.jsx(t,{children:"Interactive Dialog"})}),e.jsxs(r,{children:[e.jsxs(o,{children:[e.jsx(a,{children:"Interactive Dialog"}),e.jsx(s,{children:"Use the controls to experiment with different dialog properties."})]}),e.jsx(l,{children:e.jsx(t,{children:"Close"})})]})]}),parameters:{docs:{description:{story:"An interactive dialog where you can experiment with properties using the controls."}}}};var w,f,C;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(C=(f=g.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var y,v,T;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Clear Filters</Button>
      </DialogTrigger>
      <DialogContent className="tw-max-w-sm">
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
}`,...(T=(v=p.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var B,F,N;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="tw-max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="tw-grid tw-gap-4 tw-py-4">
          <div className="tw-grid tw-grid-cols-4 tw-items-center tw-gap-4">
            <Label htmlFor="name" className="tw-text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="tw-col-span-3" />
          </div>
          <div className="tw-grid tw-grid-cols-4 tw-items-center tw-gap-4">
            <Label htmlFor="username" className="tw-text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="tw-col-span-3" />
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
}`,...(N=(F=m.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var b,S,A;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(A=(S=u.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var H,O,I;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent className="tw-max-w-sm">
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
}`,...(I=(O=h.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var k,E,L;D.parameters={...D.parameters,docs:{...(k=D.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(L=(E=D.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};const ge=["Default","ClearFilters","WithForm","Controlled","Destructive","Interactive"];export{p as ClearFilters,u as Controlled,g as Default,h as Destructive,D as Interactive,m as WithForm,ge as __namedExportsOrder,de as default};
