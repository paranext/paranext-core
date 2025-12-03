import{j as e}from"./jsx-runtime-B8v8HYgF.js";import{C as a}from"./combo-box.component-CLuabthb.js";import{T as ne}from"./theme-provider.component-D55AK_jg.js";import{r as s}from"./iframe-wA5_ufbN.js";import{B as S}from"./book-open-BNeauBdQ.js";import{C as ae,F as oe}from"./folder-CiGvxPcK.js";import{U as se}from"./user-D_ZUiaFN.js";import{S as re}from"./settings-Cc4pwy_j.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./button-WUPlij_G.js";import"./index-kl1T-muK.js";import"./index-BPbCuWFR.js";import"./popover-Wnxrag2j.js";import"./index-DTAXz6r9.js";import"./index-CYSVQpyQ.js";import"./index-CyQ4BrOj.js";import"./index-Dgn3iPdc.js";import"./index-DxDRW8WT.js";import"./index--ZI0cJ_5.js";import"./index-BXIWRdYH.js";import"./index-Ds97O1eS.js";import"./floating-ui.react-dom-F1oUyk9O.js";import"./index-RTB3joAI.js";import"./index-Cj671iFp.js";import"./index-CtiJYQhQ.js";import"./index-4X_rwmeG.js";import"./index-CuUu24xS.js";import"./index-CApyxngy.js";import"./index-p83Qy7Y0.js";import"./index-CHQRIj27.js";import"./command-oCVezWvB.js";import"./index-B8O928T-.js";import"./index-o7vWqJWe.js";import"./dialog-wH28Fynt.js";import"./index-Czfav6j7.js";import"./x-CluxvIyU.js";import"./createLucideIcon-nJrjCKYQ.js";import"./search-BjtDQfj-.js";import"./chevron-down-DP4DOjaO.js";import"./check-B8b8tw64.js";const{fn:ie}=__STORYBOOK_MODULE_TEST__,le=["Option1","Option2","Option3"],v=["08/24/24 05:50PM - Revision author","08/24/24 05:30PM - Revision author","08/24/24 05:45PM - Revision author"],w=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth"],de=[{id:"1",label:"WEB",secondaryLabel:"World English Bible"},{id:"2",label:"BSB",secondaryLabel:"Berean Standard Bible"},{id:"3",label:"NET",secondaryLabel:"New English Translation"},{id:"4",label:"ESV",secondaryLabel:"English Standard Version"}],Qe={title:"Basics/ComboBox",component:a,tags:["autodocs","test"],argTypes:{options:{control:"object"},textPlaceholder:{control:"text"},buttonPlaceholder:{control:"text"},commandEmptyMessage:{control:"text"},buttonVariant:{options:["default","destructive","outline","secondary","ghost","link"],control:{type:"select"}},alignDropDown:{options:["start","center","end"],control:{type:"select"}},className:{control:"text"},isDisabled:{control:"boolean"}},decorators:[t=>e.jsx(ne,{children:e.jsx("div",{className:"tw-max-w-lg tw-p-4",children:e.jsx(t,{})})})]},i={render:t=>{const[o,n]=s.useState(void 0);return e.jsx(a,{...t,value:o,onChange:n})},args:{options:le,textPlaceholder:"Text Placeholder",buttonPlaceholder:"Button Placeholder",commandEmptyMessage:"No options found"},parameters:{docs:{description:{story:"A basic combo box with simple string options."}}}},l={render:t=>{const[o,n]=s.useState(void 0);return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"Combobox with long text options that will truncate - using ghost variant here"}),e.jsx(a,{...t,value:o,onChange:n})]})},args:{options:v,textPlaceholder:"Select revision ...",buttonPlaceholder:"Select revision ...",commandEmptyMessage:"No revisions found",buttonVariant:"ghost"},parameters:{docs:{description:{story:"A combo box with longer text options that will be truncated to fit the container."}}}},d={render:t=>{const[o,n]=s.useState(void 0);return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"An icon can be shown on the trigger button"}),e.jsx(a,{...t,value:o,onChange:n,buttonVariant:o?"outline":"ghost"})]})},args:{options:v,textPlaceholder:"Select revision ...",buttonPlaceholder:"Select revision ...",commandEmptyMessage:"No revisions found",icon:e.jsx(S,{})},parameters:{docs:{description:{story:"A combo box with an icon displayed on the trigger button. The button variant changes based on selection."}}}},c={render:t=>{const[o,n]=s.useState(void 0);return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"Alignment of dropdown menu can be controlled"}),e.jsx(a,{...t,value:o,onChange:n})]})},args:{options:v,textPlaceholder:"Select revision ...",buttonPlaceholder:"Select revision ...",commandEmptyMessage:"No revisions found",className:"tw-w-[400px]",alignDropDown:"end"},parameters:{docs:{description:{story:"A wider combo box demonstrating dropdown alignment control."}}}},u={render:()=>{const[t,o]=s.useState(void 0),[n,r]=s.useState(void 0),[f,y]=s.useState(void 0);return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Default Variant"}),e.jsx(a,{options:w,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",value:t,onChange:o,buttonVariant:"default"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Outline Variant"}),e.jsx(a,{options:w,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",value:n,onChange:r,buttonVariant:"outline"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Ghost Variant"}),e.jsx(a,{options:w,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",value:f,onChange:y,buttonVariant:"ghost"})]})]})},parameters:{docs:{description:{story:"Comparison of different button variants available for the combo box trigger."}}}},m={render:()=>{const[t,o]=s.useState(void 0),[n,r]=s.useState(void 0),[f,y]=s.useState(void 0);return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Calendar Icon"}),e.jsx(a,{options:["Today","Tomorrow","Next Week"],textPlaceholder:"Select date...",buttonPlaceholder:"Select date",commandEmptyMessage:"No dates found",value:t,onChange:o,icon:e.jsx(ae,{}),buttonVariant:"outline"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"User Icon"}),e.jsx(a,{options:["John Doe","Jane Smith","Bob Wilson"],textPlaceholder:"Search users...",buttonPlaceholder:"Select user",commandEmptyMessage:"No users found",value:n,onChange:r,icon:e.jsx(se,{}),buttonVariant:"outline"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Settings Icon"}),e.jsx(a,{options:["Theme","Language","Notifications"],textPlaceholder:"Search settings...",buttonPlaceholder:"Select setting",commandEmptyMessage:"No settings found",value:f,onChange:y,icon:e.jsx(re,{}),buttonVariant:"outline"})]})]})},parameters:{docs:{description:{story:"Examples of combo boxes with different icons to represent different data types."}}}},p={render:()=>{const[t,o]=s.useState(void 0),n=[{groupHeading:"Old Testament",options:["Genesis","Exodus","Leviticus","Numbers","Deuteronomy"]},{groupHeading:"New Testament",options:["Matthew","Mark","Luke","John","Acts"]},{groupHeading:"Long Named Items",options:["This is a very long item that should be truncated properly in the UI","Another extremely long item to test the truncation behavior of the combo box component"]}];return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"Combo box with multiple groups and headings"}),e.jsx(a,{options:n,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",value:t,onChange:o,buttonVariant:"outline",icon:e.jsx(S,{})})]})},parameters:{docs:{description:{story:"A combo box demonstrating multiple groups with headings. The options are organized into Old Testament and New Testament sections."}}}},h={render:()=>{const[t,o]=s.useState(void 0);return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"Combo box with primary and secondary labels - short name in normal text, full name in muted text"}),e.jsx(a,{options:de,textPlaceholder:"Search projects...",buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",value:t,onChange:o,getButtonLabel:n=>n.secondaryLabel||n.label,buttonVariant:"outline",icon:e.jsx(oe,{})}),t&&e.jsxs("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:["Selected: ",t.label," - ",t.secondaryLabel]})]})},parameters:{docs:{description:{story:"A combo box using the ComboBoxLabelOption interface to display a short name as the primary label and a full name as muted secondary label, separated by a middot (·)."}}}},b={render:()=>{const[t,o]=s.useState(void 0),n=[{groupHeading:"Recently Opened",options:[{id:"1",label:"WEB",secondaryLabel:"World English Bible"},{id:"2",label:"BSB",secondaryLabel:"Berean Standard Bible"}]},{groupHeading:"All Projects",options:[{id:"3",label:"NET",secondaryLabel:"New English Translation"},{id:"4",label:"ESV",secondaryLabel:"English Standard Version"},{id:"5",label:"NASB",secondaryLabel:"New American Standard Bible"}]}];return e.jsxs("div",{children:[e.jsx("p",{className:"tw-mb-2 tw-text-sm tw-text-muted-foreground",children:"Grouped combo box with secondary labels - demonstrating project selector with recent and all projects"}),e.jsx(a,{options:n,textPlaceholder:"Search projects...",buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",value:t,onChange:o,getButtonLabel:r=>r.secondaryLabel||r.label,buttonVariant:"outline",icon:e.jsx(oe,{})}),t&&e.jsxs("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:["Selected: ",t.label," - ",t.secondaryLabel]})]})},parameters:{docs:{description:{story:'A combo box combining group headings with secondary labels. Shows how to build a project selector with "Recently Opened" and "All Projects" sections, where each project displays its short name prominently with the full name in muted text.'}}}},g={render:t=>{const[o,n]=s.useState(void 0);return e.jsx(a,{...t,value:o,onChange:r=>{n(r),ie()(r)}})},args:{options:w,textPlaceholder:"Search books...",buttonPlaceholder:"Select a book",commandEmptyMessage:"No books found",buttonVariant:"outline",icon:e.jsx(S,{})},parameters:{docs:{description:{story:"An interactive combo box where you can experiment with all the available properties using the controls panel."}}}},x={render:()=>{const[t,o]=s.useState("08/24/24 05:50PM - Revision author with very long name");return e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"Resize the container below to test overflow behavior. The text should truncate with ellipsis when the container becomes too narrow."}),e.jsx("div",{className:"tw-resize tw-overflow-auto tw-rounded tw-border-2 tw-border-dashed tw-border-muted-foreground tw-p-4",style:{minWidth:"150px",width:"300px",maxWidth:"600px"},children:e.jsx(a,{options:v,textPlaceholder:"Select revision...",buttonPlaceholder:"Select revision...",commandEmptyMessage:"No revisions found",value:t,onChange:o,buttonVariant:"outline",buttonClassName:"tw-w-full"})}),e.jsxs("div",{className:"tw-mt-4",children:[e.jsx("p",{className:"tw-font-semibold",children:"Selected value:"}),e.jsx("p",{className:"tw-text-sm",children:t||"None"})]})]})},parameters:{docs:{description:{story:"A resizable container demonstrating text truncation and overflow handling. Drag the bottom-right corner to resize."}}}};var N,j,V;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(V=(j=i.parameters)==null?void 0:j.docs)==null?void 0:V.source}}};var P,C,B;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(B=(C=l.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var E,k,L;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(L=(k=d.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var M,O,T;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(T=(O=c.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var A,W,D;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(D=(W=u.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var I,R,z;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(z=(R=m.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var G,H,J;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    // Grouped options: Old Testament and New Testament books
    const groupedBookOptions = [{
      groupHeading: 'Old Testament',
      options: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy']
    }, {
      groupHeading: 'New Testament',
      options: ['Matthew', 'Mark', 'Luke', 'John', 'Acts']
    }, {
      groupHeading: 'Long Named Items',
      options: ['This is a very long item that should be truncated properly in the UI', 'Another extremely long item to test the truncation behavior of the combo box component']
    }];
    return <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Combo box with multiple groups and headings
        </p>
        <ComboBox<string> options={groupedBookOptions} textPlaceholder="Search books..." buttonPlaceholder="Select a book" commandEmptyMessage="No books found" value={value} onChange={setValue} buttonVariant="outline" icon={<BookOpen />} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A combo box demonstrating multiple groups with headings. The options are organized into Old Testament and New Testament sections.'
      }
    }
  }
}`,...(J=(H=p.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var U,_,F;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<Project | undefined>(undefined);
    return <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Combo box with primary and secondary labels - short name in normal text, full name in
          muted text
        </p>
        <ComboBox<Project> options={projectOptions} textPlaceholder="Search projects..." buttonPlaceholder="Select a project" commandEmptyMessage="No projects found" value={value} onChange={setValue} getButtonLabel={project => project.secondaryLabel || project.label} buttonVariant="outline" icon={<Folder />} />
        {value && <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
            Selected: {value.label} - {value.secondaryLabel}
          </p>}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A combo box using the ComboBoxLabelOption interface to display a short name as the primary label and a full name as muted secondary label, separated by a middot (·).'
      }
    }
  }
}`,...(F=(_=h.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var q,K,Y;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<Project | undefined>(undefined);
    const groupedProjects = [{
      groupHeading: 'Recently Opened',
      options: [{
        id: '1',
        label: 'WEB',
        secondaryLabel: 'World English Bible'
      }, {
        id: '2',
        label: 'BSB',
        secondaryLabel: 'Berean Standard Bible'
      }]
    }, {
      groupHeading: 'All Projects',
      options: [{
        id: '3',
        label: 'NET',
        secondaryLabel: 'New English Translation'
      }, {
        id: '4',
        label: 'ESV',
        secondaryLabel: 'English Standard Version'
      }, {
        id: '5',
        label: 'NASB',
        secondaryLabel: 'New American Standard Bible'
      }]
    }];
    return <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Grouped combo box with secondary labels - demonstrating project selector with recent and
          all projects
        </p>
        <ComboBox<Project> options={groupedProjects} textPlaceholder="Search projects..." buttonPlaceholder="Select a project" commandEmptyMessage="No projects found" value={value} onChange={setValue} getButtonLabel={project => project.secondaryLabel || project.label} buttonVariant="outline" icon={<Folder />} />
        {value && <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
            Selected: {value.label} - {value.secondaryLabel}
          </p>}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A combo box combining group headings with secondary labels. Shows how to build a project selector with "Recently Opened" and "All Projects" sections, where each project displays its short name prominently with the full name in muted text.'
      }
    }
  }
}`,...(Y=(K=b.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var Q,X,Z;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Z=(X=g.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,te;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string | undefined>('08/24/24 05:50PM - Revision author with very long name');
    return <div className="tw-flex tw-flex-col tw-gap-4">
        <p className="tw-text-sm tw-text-muted-foreground">
          Resize the container below to test overflow behavior. The text should truncate with
          ellipsis when the container becomes too narrow.
        </p>
        <div className="tw-resize tw-overflow-auto tw-rounded tw-border-2 tw-border-dashed tw-border-muted-foreground tw-p-4" style={{
        minWidth: '150px',
        width: '300px',
        maxWidth: '600px'
      }}>
          <ComboBox<string> options={revisionOptions} textPlaceholder="Select revision..." buttonPlaceholder="Select revision..." commandEmptyMessage="No revisions found" value={value} onChange={setValue} buttonVariant="outline" buttonClassName="tw-w-full" />
        </div>
        <div className="tw-mt-4">
          <p className="tw-font-semibold">Selected value:</p>
          <p className="tw-text-sm">{value || 'None'}</p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A resizable container demonstrating text truncation and overflow handling. Drag the bottom-right corner to resize.'
      }
    }
  }
}`,...(te=(ee=x.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const Xe=["Default","WithLongText","WithIcon","CustomAlignment","DifferentVariants","WithDifferentIcons","WithMultipleGroups","WithSecondaryLabel","WithSecondaryLabelGrouped","Interactive","ResizableContainer"];export{c as CustomAlignment,i as Default,u as DifferentVariants,g as Interactive,x as ResizableContainer,m as WithDifferentIcons,d as WithIcon,l as WithLongText,p as WithMultipleGroups,h as WithSecondaryLabel,b as WithSecondaryLabelGrouped,Xe as __namedExportsOrder,Qe as default};
