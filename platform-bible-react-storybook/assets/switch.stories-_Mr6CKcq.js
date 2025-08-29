import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{S as s}from"./switch-CtclNo7N.js";import{L as d}from"./label-DboBKY13.js";import{r}from"./iframe-ChjBVkNN.js";import{T as B}from"./theme-provider.component-DRoiPDtx.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-CtW3L1xI.js";import"./index-uX5GIGLq.js";import"./index-DI1pkOJa.js";import"./index-CJGEWkUs.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-B3HFQzOn.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";const{fn:p}=__STORYBOOK_MODULE_TEST__,ae={title:"Shadcn/Switch",component:s,tags:["autodocs"],decorators:[t=>e.jsx(B,{children:e.jsx(t,{})})],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},onCheckedChange:{action:"checked changed"}}},h={render:t=>{const[c,a]=r.useState(t.checked||!1),o=n=>{var i;a(n),(i=t.onCheckedChange)==null||i.call(t,n)};return e.jsx(s,{...t,checked:c,onCheckedChange:o})},args:{checked:!1,onCheckedChange:p()}},l={render:t=>{const[c,a]=r.useState(t.checked??!0),o=n=>{var i;a(n),(i=t.onCheckedChange)==null||i.call(t,n)};return e.jsx(s,{...t,checked:c,onCheckedChange:o})},args:{checked:!0,onCheckedChange:p()},parameters:{docs:{description:{story:"A switch in the checked state."}}}},m={render:t=>{const[c,a]=r.useState(t.checked||!1),o=n=>{var i;a(n),(i=t.onCheckedChange)==null||i.call(t,n)};return e.jsx(s,{...t,checked:c,onCheckedChange:o})},args:{checked:!1,disabled:!0,onCheckedChange:p()},parameters:{docs:{description:{story:"A disabled switch that cannot be toggled."}}}},w={render:t=>{const[c,a]=r.useState(t.checked??!0),o=n=>{var i;a(n),(i=t.onCheckedChange)==null||i.call(t,n)};return e.jsx(s,{...t,checked:c,onCheckedChange:o})},args:{checked:!0,disabled:!0,onCheckedChange:p()},parameters:{docs:{description:{story:"A disabled switch in the checked state."}}}},u={render:()=>{const[t,c]=r.useState(!1);return e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{checked:t,onCheckedChange:c}),e.jsx(d,{children:"Interactive switch"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{disabled:!0}),e.jsx(d,{children:"Disabled (unchecked)"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{checked:!0,disabled:!0}),e.jsx(d,{children:"Disabled (checked)"})]})]})},parameters:{docs:{description:{story:"Different switch states including interactive, disabled unchecked, and disabled checked."}}}},f={render:()=>{const[t,c]=r.useState(!1),[a,o]=r.useState(!0),[n,i]=r.useState(!1);return e.jsxs("div",{className:"tw-space-y-6",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"airplane-mode",className:"tw-text-sm tw-font-medium",children:"Airplane Mode"}),e.jsx(s,{id:"airplane-mode",checked:t,onCheckedChange:c})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"notifications",className:"tw-text-sm tw-font-medium",children:"Push Notifications"}),e.jsx(s,{id:"notifications",checked:a,onCheckedChange:o})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"location",className:"tw-text-sm tw-font-medium",children:"Location Services"}),e.jsx(s,{id:"location",checked:n,onCheckedChange:i,disabled:!0})]})]})},parameters:{docs:{description:{story:"Switches with labels arranged in a settings-style layout with proper state management."}}}},k={render:()=>{const[t,c]=r.useState({emailNotifications:!0,pushNotifications:!1,smsNotifications:!1,marketingEmails:!1,autoSave:!0,darkMode:!1}),a=o=>n=>{c(i=>({...i,[o]:n}))};return e.jsxs("div",{className:"tw-max-w-md tw-space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-mb-4 tw-text-lg tw-font-medium",children:"Notification Settings"}),e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"email-notifications",className:"tw-text-sm tw-font-medium",children:"Email Notifications"}),e.jsx(s,{id:"email-notifications",checked:t.emailNotifications,onCheckedChange:a("emailNotifications")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"push-notifications",className:"tw-text-sm tw-font-medium",children:"Push Notifications"}),e.jsx(s,{id:"push-notifications",checked:t.pushNotifications,onCheckedChange:a("pushNotifications")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"sms-notifications",className:"tw-text-sm tw-font-medium",children:"SMS Notifications"}),e.jsx(s,{id:"sms-notifications",checked:t.smsNotifications,onCheckedChange:a("smsNotifications")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"marketing-emails",className:"tw-text-sm tw-font-medium",children:"Marketing Emails"}),e.jsx(s,{id:"marketing-emails",checked:t.marketingEmails,onCheckedChange:a("marketingEmails")})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"tw-mb-4 tw-text-lg tw-font-medium",children:"App Settings"}),e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"auto-save",className:"tw-text-sm tw-font-medium",children:"Auto Save"}),e.jsx(s,{id:"auto-save",checked:t.autoSave,onCheckedChange:a("autoSave")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(d,{htmlFor:"dark-mode",className:"tw-text-sm tw-font-medium",children:"Dark Mode"}),e.jsx(s,{id:"dark-mode",checked:t.darkMode,onCheckedChange:a("darkMode")})]})]})]}),e.jsxs("div",{className:"tw-mt-6 tw-rounded-lg tw-bg-gray-50 tw-p-4",children:[e.jsx("h4",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Current Settings:"}),e.jsx("pre",{className:"tw-text-xs tw-text-gray-600",children:JSON.stringify(t,void 0,2)})]})]})},parameters:{docs:{description:{story:"A comprehensive form example showing multiple switches with grouped settings and state display."}}}};var g,C,x;h.parameters={...h.parameters,docs:{...(g=h.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(args.checked || false);
    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };
    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: false,
    onCheckedChange: fn()
  }
}`,...(x=(C=h.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var N,v,S;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(args.checked ?? true);
    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };
    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: true,
    onCheckedChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A switch in the checked state.'
      }
    }
  }
}`,...(S=(v=l.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var b,j,y;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(args.checked || false);
    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };
    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: false,
    disabled: true,
    onCheckedChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled switch that cannot be toggled.'
      }
    }
  }
}`,...(y=(j=m.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var L,M,F;w.parameters={...w.parameters,docs:{...(L=w.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(args.checked ?? true);
    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };
    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: true,
    disabled: true,
    onCheckedChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled switch in the checked state.'
      }
    }
  }
}`,...(F=(M=w.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var E,A,D;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState(false);
    return <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Switch checked={value} onCheckedChange={setValue} />
          <Label>Interactive switch</Label>
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Switch disabled />
          <Label>Disabled (unchecked)</Label>
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Switch checked disabled />
          <Label>Disabled (checked)</Label>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Different switch states including interactive, disabled unchecked, and disabled checked.'
      }
    }
  }
}`,...(D=(A=u.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var _,O,T;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const [airplaneMode, setAirplaneMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [locationServices, setLocationServices] = useState(false);
    return <div className="tw-space-y-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="airplane-mode" className="tw-text-sm tw-font-medium">
            Airplane Mode
          </Label>
          <Switch id="airplane-mode" checked={airplaneMode} onCheckedChange={setAirplaneMode} />
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="notifications" className="tw-text-sm tw-font-medium">
            Push Notifications
          </Label>
          <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="location" className="tw-text-sm tw-font-medium">
            Location Services
          </Label>
          <Switch id="location" checked={locationServices} onCheckedChange={setLocationServices} disabled />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Switches with labels arranged in a settings-style layout with proper state management.'
      }
    }
  }
}`,...(T=(O=f.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var P,V,q;k.parameters={...k.parameters,docs:{...(P=k.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const [settings, setSettings] = useState({
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      marketingEmails: false,
      autoSave: true,
      darkMode: false
    });
    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({
        ...prev,
        [key]: checked
      }));
    };
    return <div className="tw-max-w-md tw-space-y-6">
        <div>
          <h3 className="tw-mb-4 tw-text-lg tw-font-medium">Notification Settings</h3>
          <div className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="email-notifications" className="tw-text-sm tw-font-medium">
                Email Notifications
              </Label>
              <Switch id="email-notifications" checked={settings.emailNotifications} onCheckedChange={updateSetting('emailNotifications')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="push-notifications" className="tw-text-sm tw-font-medium">
                Push Notifications
              </Label>
              <Switch id="push-notifications" checked={settings.pushNotifications} onCheckedChange={updateSetting('pushNotifications')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="sms-notifications" className="tw-text-sm tw-font-medium">
                SMS Notifications
              </Label>
              <Switch id="sms-notifications" checked={settings.smsNotifications} onCheckedChange={updateSetting('smsNotifications')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="marketing-emails" className="tw-text-sm tw-font-medium">
                Marketing Emails
              </Label>
              <Switch id="marketing-emails" checked={settings.marketingEmails} onCheckedChange={updateSetting('marketingEmails')} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="tw-mb-4 tw-text-lg tw-font-medium">App Settings</h3>
          <div className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="auto-save" className="tw-text-sm tw-font-medium">
                Auto Save
              </Label>
              <Switch id="auto-save" checked={settings.autoSave} onCheckedChange={updateSetting('autoSave')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="dark-mode" className="tw-text-sm tw-font-medium">
                Dark Mode
              </Label>
              <Switch id="dark-mode" checked={settings.darkMode} onCheckedChange={updateSetting('darkMode')} />
            </div>
          </div>
        </div>

        <div className="tw-mt-6 tw-rounded-lg tw-bg-gray-50 tw-p-4">
          <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Current Settings:</h4>
          <pre className="tw-text-xs tw-text-gray-600">
            {JSON.stringify(settings, undefined, 2)}
          </pre>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive form example showing multiple switches with grouped settings and state display.'
      }
    }
  }
}`,...(q=(V=k.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const ne=["Default","Checked","Disabled","DisabledChecked","States","WithLabels","FormExample"];export{l as Checked,h as Default,m as Disabled,w as DisabledChecked,k as FormExample,u as States,f as WithLabels,ne as __namedExportsOrder,ae as default};
