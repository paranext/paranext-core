import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{S as F}from"./separator-JFhBrTJf.js";import{I as s}from"./input-FiVrRUt5.js";import{S as u}from"./switch-CtclNo7N.js";import{B as U}from"./button-BOi5X0CC.js";import{S as M,a as R,b as q,c as O,d as a}from"./select-BaRi3ik1.js";import{T as z}from"./theme-provider.component-DRoiPDtx.js";import"./iframe-ChjBVkNN.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-uX5GIGLq.js";import"./index-DI1pkOJa.js";import"./index-CJGEWkUs.js";import"./index-BPbCuWFR.js";import"./index-BaQP4hhM.js";import"./index-DBlYwqkt.js";import"./index-CKeV44jl.js";import"./index-VUEIl7Yq.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-Db6mirig.js";import"./index-CPgSHOWO.js";import"./index-BjqnVq7v.js";import"./index-CTXI5JpQ.js";import"./chevron-down-BQV-xBvd.js";import"./createLucideIcon-CVIRtPIF.js";import"./check-DhWHefu6.js";function i({children:r}){return e.jsx("div",{className:"pr-twp tw-grid",children:r})}function t({primary:r,secondary:g,children:h,isLoading:W=!1,loadingMessage:_}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:r}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:g})]}),W?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:_}):e.jsx("div",{children:h})]})}function n({primary:r,secondary:g,includeSeparator:h=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:r}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:g})]}),h?e.jsx(F,{}):""]})}i.__docgenInfo={description:`SettingsList component is a wrapper for list items. Rendered with a formatted div

@deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
  is discouraged and it may be removed in the future.
@param children To populate the list with
@returns Formatted div encompassing the children`,methods:[],displayName:"SettingsList"};t.__docgenInfo={description:`SettingsListItem component is a common list item. Rendered with a formatted div

@deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
  is discouraged and it may be removed in the future.
@param SettingsListItemProps
@returns Formatted div encompassing the list item content`,methods:[],displayName:"SettingsListItem",props:{primary:{required:!0,tsType:{name:"string"},description:"Primary text of the list item"},secondary:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:"Optional text of the list item"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Optional boolean to display a message if the children aren't loaded yet. Defaults to false",defaultValue:{value:"false",computed:!1}},loadingMessage:{required:!1,tsType:{name:"string"},description:"Optional message to display if isLoading"}}};n.__docgenInfo={description:`SettingsListHeader component displays text above the list

@deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
  is discouraged and it may be removed in the future.
@param SettingsListHeaderProps
@returns Formatted div with list header content`,methods:[],displayName:"SettingsListHeader",props:{primary:{required:!0,tsType:{name:"string"},description:"The primary text of the list header"},secondary:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:"Optional secondary text of the list header"},includeSeparator:{required:!1,tsType:{name:"boolean"},description:"Optional boolean to include a separator underneath the secondary text. Defaults to false",defaultValue:{value:"false",computed:!1}}}};const Ie={title:"Advanced/Settings/SettingsList",component:i,tags:["autodocs"],decorators:[r=>e.jsx(z,{children:e.jsx("div",{className:"tw-max-w-2xl tw-p-4",children:e.jsx(r,{})})})]},o={render:()=>e.jsxs(i,{children:[e.jsx(n,{primary:"Settings",secondary:"User settings for styling the header",includeSeparator:!0}),e.jsx(t,{primary:"Header color",secondary:"The color of the header",isLoading:!1,loadingMessage:"Loading setting",children:e.jsx(s,{placeholder:"Red"})}),e.jsx(t,{primary:"Header size",secondary:"The size of the header",isLoading:!0,loadingMessage:"Loading setting",children:e.jsx(s,{placeholder:"56"})}),e.jsx(t,{primary:"Header bold",secondary:"Whether or not the header is bold",isLoading:!1,loadingMessage:"Loading setting",children:e.jsx(s,{placeholder:"color"})})]}),parameters:{docs:{description:{story:"A basic settings list with header and multiple items, matching the original example."}}}},d={render:()=>e.jsxs(i,{children:[e.jsx(t,{primary:"Theme",secondary:"Choose your preferred theme",isLoading:!1,children:e.jsxs(M,{children:[e.jsx(R,{className:"tw-w-[180px]",children:e.jsx(q,{placeholder:"Select theme"})}),e.jsxs(O,{children:[e.jsx(a,{value:"light",children:"Light"}),e.jsx(a,{value:"dark",children:"Dark"}),e.jsx(a,{value:"system",children:"System"})]})]})}),e.jsx(t,{primary:"Notifications",secondary:"Receive notifications for important updates",isLoading:!1,children:e.jsx(u,{})})]}),parameters:{docs:{description:{story:"A settings list without a header, showing different input types."}}}},l={render:()=>e.jsxs(i,{children:[e.jsx(n,{primary:"Loading Examples",secondary:"Settings showing different loading states",includeSeparator:!0}),e.jsx(t,{primary:"Loaded setting",secondary:"This setting has finished loading",isLoading:!1,loadingMessage:"Loading setting",children:e.jsx(s,{placeholder:"Value loaded"})}),e.jsx(t,{primary:"Loading setting",secondary:"This setting is currently loading",isLoading:!0,loadingMessage:"Fetching user preferences...",children:e.jsx(s,{placeholder:"Loading...",disabled:!0})}),e.jsx(t,{primary:"Another loading setting",secondary:"This setting is also loading",isLoading:!0,loadingMessage:"Syncing with server",children:e.jsx(u,{disabled:!0})})]}),parameters:{docs:{description:{story:"Settings list showing both loaded and loading states with custom loading messages."}}}},c={render:()=>e.jsxs(i,{children:[e.jsx(n,{primary:"Application Settings",secondary:"Configure your application preferences",includeSeparator:!0}),e.jsx(t,{primary:"Username",secondary:"Your display name",isLoading:!1,children:e.jsx(s,{placeholder:"Enter username"})}),e.jsx(t,{primary:"Auto-save",secondary:"Automatically save changes",isLoading:!1,children:e.jsx(u,{})}),e.jsx(t,{primary:"Language",secondary:"Choose your preferred language",isLoading:!1,children:e.jsxs(M,{children:[e.jsx(R,{className:"tw-w-[180px]",children:e.jsx(q,{placeholder:"Select language"})}),e.jsxs(O,{children:[e.jsx(a,{value:"en",children:"English"}),e.jsx(a,{value:"es",children:"Español"}),e.jsx(a,{value:"fr",children:"Français"}),e.jsx(a,{value:"de",children:"Deutsch"})]})]})}),e.jsx(t,{primary:"Reset Settings",secondary:"Reset all settings to default values",isLoading:!1,children:e.jsx(U,{variant:"destructive",size:"sm",children:"Reset"})})]}),parameters:{docs:{description:{story:"Settings list with various control types including inputs, switches, selects, and buttons."}}}},p={render:()=>e.jsx(i,{children:e.jsx(t,{primary:"Simple setting",secondary:"A basic setting without loading state",children:e.jsx(s,{placeholder:"Enter value"})})}),parameters:{docs:{description:{story:"A minimal settings list with just one item."}}}},m={render:()=>e.jsxs("div",{className:"tw-space-y-8",children:[e.jsxs(i,{children:[e.jsx(n,{primary:"With Separator",secondary:"This header includes a separator",includeSeparator:!0}),e.jsx(t,{primary:"Setting 1",secondary:"Description",children:e.jsx(s,{placeholder:"Value"})})]}),e.jsxs(i,{children:[e.jsx(n,{primary:"Without Separator",secondary:"This header does not include a separator",includeSeparator:!1}),e.jsx(t,{primary:"Setting 2",secondary:"Description",children:e.jsx(s,{placeholder:"Value"})})]}),e.jsxs(i,{children:[e.jsx(n,{primary:"Primary Only",includeSeparator:!0}),e.jsx(t,{primary:"Setting 3",secondary:"Description",children:e.jsx(s,{placeholder:"Value"})})]})]}),parameters:{docs:{description:{story:"Different header configurations showing separator and text variations."}}}};var S,y,f;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <SettingsList>
      <SettingsListHeader primary="Settings" secondary="User settings for styling the header" includeSeparator />
      <SettingsListItem primary="Header color" secondary="The color of the header" isLoading={false} loadingMessage="Loading setting">
        <Input placeholder="Red" />
      </SettingsListItem>
      <SettingsListItem primary="Header size" secondary="The size of the header" isLoading loadingMessage="Loading setting">
        <Input placeholder="56" />
      </SettingsListItem>
      <SettingsListItem primary="Header bold" secondary="Whether or not the header is bold" isLoading={false} loadingMessage="Loading setting">
        <Input placeholder="color" />
      </SettingsListItem>
    </SettingsList>,
  parameters: {
    docs: {
      description: {
        story: 'A basic settings list with header and multiple items, matching the original example.'
      }
    }
  }
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var L,x,j;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <SettingsList>
      <SettingsListItem primary="Theme" secondary="Choose your preferred theme" isLoading={false}>
        <Select>
          <SelectTrigger className="tw-w-[180px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </SettingsListItem>
      <SettingsListItem primary="Notifications" secondary="Receive notifications for important updates" isLoading={false}>
        <Switch />
      </SettingsListItem>
    </SettingsList>,
  parameters: {
    docs: {
      description: {
        story: 'A settings list without a header, showing different input types.'
      }
    }
  }
}`,...(j=(x=d.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var w,I,v;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <SettingsList>
      <SettingsListHeader primary="Loading Examples" secondary="Settings showing different loading states" includeSeparator />
      <SettingsListItem primary="Loaded setting" secondary="This setting has finished loading" isLoading={false} loadingMessage="Loading setting">
        <Input placeholder="Value loaded" />
      </SettingsListItem>
      <SettingsListItem primary="Loading setting" secondary="This setting is currently loading" isLoading loadingMessage="Fetching user preferences...">
        <Input placeholder="Loading..." disabled />
      </SettingsListItem>
      <SettingsListItem primary="Another loading setting" secondary="This setting is also loading" isLoading loadingMessage="Syncing with server">
        <Switch disabled />
      </SettingsListItem>
    </SettingsList>,
  parameters: {
    docs: {
      description: {
        story: 'Settings list showing both loaded and loading states with custom loading messages.'
      }
    }
  }
}`,...(v=(I=l.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var T,b,N;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <SettingsList>
      <SettingsListHeader primary="Application Settings" secondary="Configure your application preferences" includeSeparator />
      <SettingsListItem primary="Username" secondary="Your display name" isLoading={false}>
        <Input placeholder="Enter username" />
      </SettingsListItem>
      <SettingsListItem primary="Auto-save" secondary="Automatically save changes" isLoading={false}>
        <Switch />
      </SettingsListItem>
      <SettingsListItem primary="Language" secondary="Choose your preferred language" isLoading={false}>
        <Select>
          <SelectTrigger className="tw-w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
          </SelectContent>
        </Select>
      </SettingsListItem>
      <SettingsListItem primary="Reset Settings" secondary="Reset all settings to default values" isLoading={false}>
        <Button variant="destructive" size="sm">
          Reset
        </Button>
      </SettingsListItem>
    </SettingsList>,
  parameters: {
    docs: {
      description: {
        story: 'Settings list with various control types including inputs, switches, selects, and buttons.'
      }
    }
  }
}`,...(N=(b=c.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var H,A,V;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <SettingsList>
      <SettingsListItem primary="Simple setting" secondary="A basic setting without loading state">
        <Input placeholder="Enter value" />
      </SettingsListItem>
    </SettingsList>,
  parameters: {
    docs: {
      description: {
        story: 'A minimal settings list with just one item.'
      }
    }
  }
}`,...(V=(A=p.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};var C,D,E;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-8">
      <SettingsList>
        <SettingsListHeader primary="With Separator" secondary="This header includes a separator" includeSeparator />
        <SettingsListItem primary="Setting 1" secondary="Description">
          <Input placeholder="Value" />
        </SettingsListItem>
      </SettingsList>

      <SettingsList>
        <SettingsListHeader primary="Without Separator" secondary="This header does not include a separator" includeSeparator={false} />
        <SettingsListItem primary="Setting 2" secondary="Description">
          <Input placeholder="Value" />
        </SettingsListItem>
      </SettingsList>

      <SettingsList>
        <SettingsListHeader primary="Primary Only" includeSeparator />
        <SettingsListItem primary="Setting 3" secondary="Description">
          <Input placeholder="Value" />
        </SettingsListItem>
      </SettingsList>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different header configurations showing separator and text variations.'
      }
    }
  }
}`,...(E=(D=m.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};const ve=["Default","WithoutHeader","LoadingStates","VariousControls","MinimalExample","HeaderVariations"];export{o as Default,m as HeaderVariations,l as LoadingStates,p as MinimalExample,c as VariousControls,d as WithoutHeader,ve as __namedExportsOrder,Ie as default};
