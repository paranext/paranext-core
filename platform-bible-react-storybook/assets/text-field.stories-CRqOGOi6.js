import{j as r}from"./jsx-runtime-CoJcBlqr.js";import{r as w}from"./iframe-ChjBVkNN.js";import{I as se}from"./input-FiVrRUt5.js";import{L as le}from"./label-DboBKY13.js";import{c as d}from"./shadcn-ui.util-DMJ19wEV.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-BPbCuWFR.js";function n({id:e,isDisabled:s=!1,hasError:a=!1,isFullWidth:i=!1,helperText:o,label:t,placeholder:l,isRequired:v=!1,className:Y,defaultValue:Z,value:ee,onChange:te,onFocus:ae,onBlur:re}){return r.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":i}),children:[r.jsx(le,{htmlFor:e,className:d({"tw-text-red-600":a,"tw-hidden":!t}),children:`${t}${v?"*":""}`}),r.jsx(se,{id:e,disabled:s,placeholder:l,required:v,className:d(Y,{"tw-border-red-600":a}),defaultValue:Z,value:ee,onChange:te,onFocus:ae,onBlur:re}),r.jsx("p",{className:d({"tw-hidden":!o}),children:o})]})}n.__docgenInfo={description:`Text input field

Thanks to Shadcn for heavy inspiration and documentation
https://ui.shadcn.com/docs/components/input#with-label`,methods:[],displayName:"TextField",props:{id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},isDisabled:{required:!1,tsType:{name:"boolean"},description:"If `true`, the component is disabled.\n\n@default false",defaultValue:{value:"false",computed:!1}},hasError:{required:!1,tsType:{name:"boolean"},description:"If `true`, the label is displayed in an error state.\n\n@default false",defaultValue:{value:"false",computed:!1}},isFullWidth:{required:!1,tsType:{name:"boolean"},description:"If `true`, the input will take up the full width of its container.\n\n@default false",defaultValue:{value:"false",computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:"Text that gives the user instructions on what contents the TextField expects"},label:{required:!1,tsType:{name:"string"},description:"The title of the TextField"},placeholder:{required:!1,tsType:{name:"string"},description:"The short hint displayed in the `input` before the user enters a value."},isRequired:{required:!1,tsType:{name:"boolean"},description:"If `true`, the label is displayed as required and the `input` element is required.\n\n@default false",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the text field"},defaultValue:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Starting value for the text field if it is not controlled"},value:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Value of the text field if controlled"},onChange:{required:!1,tsType:{name:"ChangeEventHandler",elements:[{name:"HTMLInputElement"}],raw:"ChangeEventHandler<HTMLInputElement>"},description:"Triggers when content of textfield is changed"},onFocus:{required:!1,tsType:{name:"FocusEventHandler",elements:[{name:"HTMLInputElement"}],raw:"FocusEventHandler<HTMLInputElement>"},description:"Triggers when textfield gets focus"},onBlur:{required:!1,tsType:{name:"FocusEventHandler",elements:[{name:"HTMLInputElement"}],raw:"FocusEventHandler<HTMLInputElement>"},description:"Triggers when textfield loses focus"}}};const xe={title:"Basics/TextField",component:n,tags:["autodocs"],parameters:{docs:{description:{component:`
A text input field component with label, validation, and helper text support.

Based on shadcn-ui Input component with additional features like error states and full-width support.
        `}}},argTypes:{isDisabled:{control:"boolean",description:"If true, the component is disabled"},hasError:{control:"boolean",description:"If true, the label is displayed in an error state"},isFullWidth:{control:"boolean",description:"If true, the input will take up the full width of its container"},isRequired:{control:"boolean",description:"If true, the label is displayed as required and the input element is required"},label:{control:"text",description:"The title of the TextField"},placeholder:{control:"text",description:"The short hint displayed in the input before the user enters a value"},helperText:{control:"text",description:"Text that gives the user instructions on what contents the TextField expects"},defaultValue:{control:"text",description:"Starting value for the text field if it is not controlled"}}},u={args:{label:"Username",placeholder:"Enter your username"}},c={args:{label:"Email",placeholder:"user@example.com",helperText:"We will never share your email with anyone else."}},m={args:{label:"Password",placeholder:"Enter your password",isRequired:!0,helperText:"Password must be at least 8 characters long."}},p={args:{label:"Email",placeholder:"user@example.com",hasError:!0,helperText:"Please enter a valid email address.",defaultValue:"invalid-email"}},h={args:{label:"Read Only Field",defaultValue:"This field is disabled",isDisabled:!0,helperText:"This field cannot be edited."}},f={args:{label:"Description",placeholder:"Enter a detailed description...",isFullWidth:!0,helperText:"This field takes up the full width of its container."},parameters:{layout:"padded"}},b={args:{placeholder:"Search...",helperText:"This field has no label, only placeholder text."}},x={args:{label:"Name",defaultValue:"John Doe",helperText:"This field has a default value."}},g={render:e=>{const[s,a]=w.useState("Controlled value");return r.jsx(n,{...e,value:s,onChange:i=>a(i.target.value)})},args:{label:"Controlled Input",helperText:"This input is controlled by React state."}},T={render:()=>{const[e,s]=w.useState({firstName:"",lastName:"",email:"",feedback:""}),[a,i]=w.useState({}),o=t=>{t.preventDefault();const l={};e.firstName||(l.firstName=!0),e.lastName||(l.lastName=!0),(!e.email||!e.email.includes("@"))&&(l.email=!0),i(l),Object.keys(l).length===0&&alert("Form submitted successfully!")};return r.jsxs("form",{onSubmit:o,className:"tw-max-w-md tw-space-y-4",children:[r.jsx(n,{label:"First Name",placeholder:"John",isRequired:!0,value:e.firstName,onChange:t=>s({...e,firstName:t.target.value}),hasError:a.firstName,helperText:a.firstName?"First name is required":void 0,isFullWidth:!0}),r.jsx(n,{label:"Last Name",placeholder:"Doe",isRequired:!0,value:e.lastName,onChange:t=>s({...e,lastName:t.target.value}),hasError:a.lastName,helperText:a.lastName?"Last name is required":void 0,isFullWidth:!0}),r.jsx(n,{label:"Email",placeholder:"john.doe@example.com",isRequired:!0,value:e.email,onChange:t=>s({...e,email:t.target.value}),hasError:a.email,helperText:a.email?"Please enter a valid email address":"We will never share your email",isFullWidth:!0}),r.jsx(n,{label:"Feedback",placeholder:"Optional feedback...",value:e.feedback,onChange:t=>s({...e,feedback:t.target.value}),helperText:"Tell us what you think (optional)",isFullWidth:!0}),r.jsx("button",{type:"submit",className:"tw-rounded tw-bg-blue-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-blue-600",children:"Submit Form"})]})},parameters:{docs:{description:{story:"Interactive form example showing validation, controlled inputs, and error states."}}}};var y,E,F;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    placeholder: 'Enter your username'
  }
}`,...(F=(E=u.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var N,q,D;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'user@example.com',
    helperText: 'We will never share your email with anyone else.'
  }
}`,...(D=(q=c.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var S,I,W;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    isRequired: true,
    helperText: 'Password must be at least 8 characters long.'
  }
}`,...(W=(I=m.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var C,k,R;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'user@example.com',
    hasError: true,
    helperText: 'Please enter a valid email address.',
    defaultValue: 'invalid-email'
  }
}`,...(R=(k=p.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var j,V,H;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Read Only Field',
    defaultValue: 'This field is disabled',
    isDisabled: true,
    helperText: 'This field cannot be edited.'
  }
}`,...(H=(V=h.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};var L,O,P;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
    isFullWidth: true,
    helperText: 'This field takes up the full width of its container.'
  },
  parameters: {
    layout: 'padded'
  }
}`,...(P=(O=f.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var M,B,J;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    helperText: 'This field has no label, only placeholder text.'
  }
}`,...(J=(B=b.parameters)==null?void 0:B.docs)==null?void 0:J.source}}};var _,A,U;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    defaultValue: 'John Doe',
    helperText: 'This field has a default value.'
  }
}`,...(U=(A=x.parameters)==null?void 0:A.docs)==null?void 0:U.source}}};var $,z,G;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('Controlled value');
    return <TextField {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
  args: {
    label: 'Controlled Input',
    helperText: 'This input is controlled by React state.'
  }
}`,...(G=(z=g.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var K,Q,X;T.parameters={...T.parameters,docs:{...(K=T.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      feedback: ''
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, boolean> = {};
      if (!formData.firstName) newErrors.firstName = true;
      if (!formData.lastName) newErrors.lastName = true;
      if (!formData.email || !formData.email.includes('@')) newErrors.email = true;
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        // eslint-disable-next-line no-alert
        alert('Form submitted successfully!');
      }
    };
    return <form onSubmit={handleSubmit} className="tw-max-w-md tw-space-y-4">
        <TextField label="First Name" placeholder="John" isRequired value={formData.firstName} onChange={e => setFormData({
        ...formData,
        firstName: e.target.value
      })} hasError={errors.firstName} helperText={errors.firstName ? 'First name is required' : undefined} isFullWidth />

        <TextField label="Last Name" placeholder="Doe" isRequired value={formData.lastName} onChange={e => setFormData({
        ...formData,
        lastName: e.target.value
      })} hasError={errors.lastName} helperText={errors.lastName ? 'Last name is required' : undefined} isFullWidth />

        <TextField label="Email" placeholder="john.doe@example.com" isRequired value={formData.email} onChange={e => setFormData({
        ...formData,
        email: e.target.value
      })} hasError={errors.email} helperText={errors.email ? 'Please enter a valid email address' : 'We will never share your email'} isFullWidth />

        <TextField label="Feedback" placeholder="Optional feedback..." value={formData.feedback} onChange={e => setFormData({
        ...formData,
        feedback: e.target.value
      })} helperText="Tell us what you think (optional)" isFullWidth />

        <button type="submit" className="tw-rounded tw-bg-blue-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-blue-600">
          Submit Form
        </button>
      </form>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive form example showing validation, controlled inputs, and error states.'
      }
    }
  }
}`,...(X=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const ge=["Default","WithHelperText","Required","WithError","Disabled","FullWidth","NoLabel","WithDefaultValue","Controlled","InteractiveExample"];export{g as Controlled,u as Default,h as Disabled,f as FullWidth,T as InteractiveExample,b as NoLabel,m as Required,x as WithDefaultValue,p as WithError,c as WithHelperText,ge as __namedExportsOrder,xe as default};
