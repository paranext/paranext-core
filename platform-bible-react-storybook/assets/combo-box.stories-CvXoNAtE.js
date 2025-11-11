import{j as e}from"./jsx-runtime-CvGToidP.js";import{C as s}from"./combo-box.component-CA8nXznD.js";import{T as L}from"./theme-provider.component-BRfsG9zC.js";import{r as a}from"./iframe-FHgAwj54.js";import{B as J}from"./book-open-C1sut9aa.js";import{C as R}from"./calendar-Z7fHkCbF.js";import{U}from"./user-CfQN57u9.js";import{S as G}from"./settings-BAaw9YOD.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./button-cud2eTA2.js";import"./index-C6LUVuya.js";import"./index-D-wbo5Oc.js";import"./index-BPbCuWFR.js";import"./popover-CevumqeB.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-DvVrmaIy.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DLzBYexm.js";import"./command-D3tc6HP1.js";import"./index-DGcOpdI4.js";import"./index-np2ZhOVR.js";import"./dialog-C1cDbYMW.js";import"./x-CFBWqveS.js";import"./createLucideIcon-B4WsWZHQ.js";import"./search-DYGW0Xl3.js";import"./chevrons-up-down-PdOvZfnq.js";import"./check-Ce2iVscw.js";const{fn:q}=__STORYBOOK_MODULE_TEST__,K=["Option1","Option2","Option3"],x=["08/24/24 05:50PM - Revision author","08/24/24 05:30PM - Revision author","08/24/24 05:45PM - Revision author"],h=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth"],Me={title:"Basics/ComboBox",component:s,tags:["autodocs","test"],argTypes:{options:{control:"object"},textPlaceholder:{control:"text"},buttonPlaceholder:{control:"text"},commandEmptyMessage:{control:"text"},buttonVariant:{options:["default","destructive","outline","secondary","ghost","link"],control:{type:"select"}},alignDropDown:{options:["start","center","end"],control:{type:"select"}},className:{control:"text"},isDisabled:{control:"boolean"}},decorators:[t=>e.jsx(L,{children:e.jsx("div",{className:"tw-max-w-lg tw-p-4",children:e.jsx(t,{})})})]},i={render:t=>{const[o,n]=a.useState(void 0);return e.jsx(s,{...t,value:o,onChange:n})},args:{options:K,textPlaceholder:"Text Placeholder",buttonPlaceholder:"Button Placeholder",commandEmptyMessage:"No options found"},parameters:{docs:{description:{story:"A basic combo box with simple string options."}}}},l={render:t=>{const[o,n]=a.useState(void 0);return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"Combobox with long text options that will truncate - using ghost variant here"}),e.jsx(s,{...t,value:o,onChange:n})]})},args:{options:x,textPlaceholder:"Select revision ...",buttonPlaceholder:"Select revision ...",commandEmptyMessage:"No revisions found",buttonVariant:"ghost"},parameters:{docs:{description:{story:"A combo box with longer text options that will be truncated to fit the container."}}}},c={render:t=>{const[o,n]=a.useState(void 0);return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"An icon can be shown on the trigger button"}),e.jsx(s,{...t,value:o,onChange:n,buttonVariant:o?"outline":"ghost"})]})},args:{options:x,textPlaceholder:"Select revision ...",buttonPlaceholder:"Select revision ...",commandEmptyMessage:"No revisions found",icon:e.jsx(J,{})},parameters:{docs:{description:{story:"A combo box with an icon displayed on the trigger button. The button variant changes based on selection."}}}},d={render:t=>{const[o,n]=a.useState(void 0);return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"Alignment of dropdown menu can be controlled"}),e.jsx(s,{...t,value:o,onChange:n})]})},args:{options:x,textPlaceholder:"Select revision ...",buttonPlaceholder:"Select revision ...",commandEmptyMessage:"No revisions found",className:"tw-w-[400px]",alignDropDown:"end"},parameters:{docs:{description:{story:"A wider combo box demonstrating dropdown alignment control."}}}},u={render:()=>{const[t,o]=a.useState(void 0),[n,r]=a.useState(void 0),[g,b]=a.useState(void 0);return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Default Variant"}),e.jsx(s,{options:h,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",value:t,onChange:o,buttonVariant:"default"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Outline Variant"}),e.jsx(s,{options:h,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",value:n,onChange:r,buttonVariant:"outline"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Ghost Variant"}),e.jsx(s,{options:h,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",value:g,onChange:b,buttonVariant:"ghost"})]})]})},parameters:{docs:{description:{story:"Comparison of different button variants available for the combo box trigger."}}}},m={render:()=>{const[t,o]=a.useState(void 0),[n,r]=a.useState(void 0),[g,b]=a.useState(void 0);return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Calendar Icon"}),e.jsx(s,{options:["Today","Tomorrow","Next Week"],textPlaceholder:"Select date...",buttonPlaceholder:"Select date",commandEmptyMessage:"No dates found",value:t,onChange:o,icon:e.jsx(R,{}),buttonVariant:"outline"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"User Icon"}),e.jsx(s,{options:["John Doe","Jane Smith","Bob Wilson"],textPlaceholder:"Search users...",buttonPlaceholder:"Select user",commandEmptyMessage:"No users found",value:n,onChange:r,icon:e.jsx(U,{}),buttonVariant:"outline"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Settings Icon"}),e.jsx(s,{options:["Theme","Language","Notifications"],textPlaceholder:"Search settings...",buttonPlaceholder:"Select setting",commandEmptyMessage:"No settings found",value:g,onChange:b,icon:e.jsx(G,{}),buttonVariant:"outline"})]})]})},parameters:{docs:{description:{story:"Examples of combo boxes with different icons to represent different data types."}}}},p={render:t=>{const[o,n]=a.useState(void 0);return e.jsx(s,{...t,value:o,onChange:r=>{n(r),q()(r)}})},args:{options:h,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",buttonVariant:"outline",icon:e.jsx(J,{})},parameters:{docs:{description:{story:"An interactive combo box where you can experiment with all the available properties using the controls panel."}}}};var v,f,w;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <ComboBox<string> {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: simpleOptions,
    textPlaceholder: 'Text Placeholder',
    buttonPlaceholder: 'Button Placeholder',
    commandEmptyMessage: 'No options found'
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic combo box with simple string options.'
      }
    }
  }
}`,...(w=(f=i.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var S,V,y;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Combobox with long text options that will truncate - using ghost variant here
        </p>
        <ComboBox<string> {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    options: revisionOptions,
    textPlaceholder: 'Select revision ...',
    buttonPlaceholder: 'Select revision ...',
    commandEmptyMessage: 'No revisions found',
    buttonVariant: 'ghost'
  },
  parameters: {
    docs: {
      description: {
        story: 'A combo box with longer text options that will be truncated to fit the container.'
      }
    }
  }
}`,...(y=(V=l.parameters)==null?void 0:V.docs)==null?void 0:y.source}}};var N,P,C;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          An icon can be shown on the trigger button
        </p>
        <ComboBox<string> {...args} value={value} onChange={setValue} buttonVariant={value ? 'outline' : 'ghost'} />
      </div>;
  },
  args: {
    options: revisionOptions,
    textPlaceholder: 'Select revision ...',
    buttonPlaceholder: 'Select revision ...',
    commandEmptyMessage: 'No revisions found',
    icon: <BookOpen />
  },
  parameters: {
    docs: {
      description: {
        story: 'A combo box with an icon displayed on the trigger button. The button variant changes based on selection.'
      }
    }
  }
}`,...(C=(P=c.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};var j,k,E;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Alignment of dropdown menu can be controlled
        </p>
        <ComboBox<string> {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    options: revisionOptions,
    textPlaceholder: 'Select revision ...',
    buttonPlaceholder: 'Select revision ...',
    commandEmptyMessage: 'No revisions found',
    className: 'tw-w-[400px]',
    alignDropDown: 'end'
  },
  parameters: {
    docs: {
      description: {
        story: 'A wider combo box demonstrating dropdown alignment control.'
      }
    }
  }
}`,...(E=(k=d.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var M,B,O;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string | undefined>(undefined);
    const [value2, setValue2] = useState<string | undefined>(undefined);
    const [value3, setValue3] = useState<string | undefined>(undefined);
    return <div className="tw-space-y-4">
        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Default Variant</p>
          <ComboBox<string> options={bookOptions} textPlaceholder="Search books..." buttonPlaceholder="Select a book" commandEmptyMessage="No books found" value={value1} onChange={setValue1} buttonVariant="default" />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Outline Variant</p>
          <ComboBox<string> options={bookOptions} textPlaceholder="Search books..." buttonPlaceholder="Select a book" commandEmptyMessage="No books found" value={value2} onChange={setValue2} buttonVariant="outline" />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Ghost Variant</p>
          <ComboBox<string> options={bookOptions} textPlaceholder="Search books..." buttonPlaceholder="Select a book" commandEmptyMessage="No books found" value={value3} onChange={setValue3} buttonVariant="ghost" />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different button variants available for the combo box trigger.'
      }
    }
  }
}`,...(O=(B=u.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var D,T,A;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string | undefined>(undefined);
    const [value2, setValue2] = useState<string | undefined>(undefined);
    const [value3, setValue3] = useState<string | undefined>(undefined);
    return <div className="tw-space-y-4">
        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Calendar Icon</p>
          <ComboBox<string> options={['Today', 'Tomorrow', 'Next Week']} textPlaceholder="Select date..." buttonPlaceholder="Select date" commandEmptyMessage="No dates found" value={value1} onChange={setValue1} icon={<Calendar />} buttonVariant="outline" />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">User Icon</p>
          <ComboBox<string> options={['John Doe', 'Jane Smith', 'Bob Wilson']} textPlaceholder="Search users..." buttonPlaceholder="Select user" commandEmptyMessage="No users found" value={value2} onChange={setValue2} icon={<User />} buttonVariant="outline" />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Settings Icon</p>
          <ComboBox<string> options={['Theme', 'Language', 'Notifications']} textPlaceholder="Search settings..." buttonPlaceholder="Select setting" commandEmptyMessage="No settings found" value={value3} onChange={setValue3} icon={<Settings />} buttonVariant="outline" />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of combo boxes with different icons to represent different data types.'
      }
    }
  }
}`,...(A=(T=m.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var I,W,_;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <ComboBox<string> {...args} value={value} onChange={(newValue: string) => {
      setValue(newValue);
      fn()(newValue);
    }} />;
  },
  args: {
    options: bookOptions,
    textPlaceholder: 'Search books...',
    buttonPlaceholder: 'Select a book',
    commandEmptyMessage: 'No books found',
    buttonVariant: 'outline',
    icon: <BookOpen />
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive combo box where you can experiment with all the available properties using the controls panel.'
      }
    }
  }
}`,...(_=(W=p.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};const Be=["Default","WithLongText","WithIcon","CustomAlignment","DifferentVariants","WithDifferentIcons","Interactive"];export{d as CustomAlignment,i as Default,u as DifferentVariants,p as Interactive,m as WithDifferentIcons,c as WithIcon,l as WithLongText,Be as __namedExportsOrder,Me as default};
