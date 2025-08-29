import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{r as d}from"./iframe-ChjBVkNN.js";import{S as n}from"./switch-CtclNo7N.js";import{L as s}from"./label-DboBKY13.js";import{I as q}from"./input-FiVrRUt5.js";import{B as L}from"./button-BOi5X0CC.js";import{S,a as k,b as N,c as b,d as c}from"./select-BaRi3ik1.js";import{C as m,a as u,b as h,c as w,d as x}from"./card-D-ett0Sz.js";import{S as G}from"./separator-JFhBrTJf.js";import{T as U}from"./theme-provider.component-DRoiPDtx.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-CtW3L1xI.js";import"./index-uX5GIGLq.js";import"./index-DI1pkOJa.js";import"./index-CJGEWkUs.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-B3HFQzOn.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./index-BaQP4hhM.js";import"./index-DBlYwqkt.js";import"./index-CKeV44jl.js";import"./index-VUEIl7Yq.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-Db6mirig.js";import"./index-CPgSHOWO.js";import"./index-BjqnVq7v.js";import"./index-CTXI5JpQ.js";import"./chevron-down-BQV-xBvd.js";import"./createLucideIcon-CVIRtPIF.js";import"./check-DhWHefu6.js";function O(){return e.jsx("div",{children:"Settings Examples"})}const be={title:"Advanced/Settings/SettingsExamples",component:O,tags:["autodocs"],decorators:[t=>e.jsx(U,{children:e.jsx(t,{})})],parameters:{docs:{description:{component:`
Examples of common settings patterns and layouts using various UI components.

These examples demonstrate:
- Switch-based settings with proper state management
- Mixed control types (switches, inputs, selects)
- Settings organization with cards and sections
- Form-like settings interfaces
- Real-world settings patterns
        `}}}},p={render:()=>{const[t,l]=d.useState(!1),[i,a]=d.useState(!0),[r,o]=d.useState(!1);return e.jsxs(m,{className:"tw-w-full tw-max-w-md",children:[e.jsxs(u,{children:[e.jsx(h,{children:"Device Settings"}),e.jsx(w,{children:"Configure your device preferences"})]}),e.jsxs(x,{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(s,{htmlFor:"airplane-mode",className:"tw-text-sm tw-font-medium",children:"Airplane Mode"}),e.jsx(n,{id:"airplane-mode",checked:t,onCheckedChange:l})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(s,{htmlFor:"notifications",className:"tw-text-sm tw-font-medium",children:"Push Notifications"}),e.jsx(n,{id:"notifications",checked:i,onCheckedChange:a})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx(s,{htmlFor:"location",className:"tw-text-sm tw-font-medium",children:"Location Services"}),e.jsx(n,{id:"location",checked:r,onCheckedChange:o,disabled:!0})]})]})]})},parameters:{docs:{description:{story:"Basic settings layout using switches with clear labels and card container."}}}},f={render:()=>{const[t,l]=d.useState({emailNotifications:!0,pushNotifications:!1,smsNotifications:!1,marketingEmails:!1,autoSave:!0,darkMode:!1}),i=a=>r=>{l(o=>({...o,[a]:r}))};return e.jsxs("div",{className:"tw-max-w-2xl tw-space-y-6",children:[e.jsxs(m,{children:[e.jsxs(u,{children:[e.jsx(h,{children:"Notification Settings"}),e.jsx(w,{children:"Manage how you receive notifications"})]}),e.jsxs(x,{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"email-notifications",className:"tw-text-sm tw-font-medium",children:"Email Notifications"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Receive notifications via email"})]}),e.jsx(n,{id:"email-notifications",checked:t.emailNotifications,onCheckedChange:i("emailNotifications")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"push-notifications",className:"tw-text-sm tw-font-medium",children:"Push Notifications"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Receive push notifications"})]}),e.jsx(n,{id:"push-notifications",checked:t.pushNotifications,onCheckedChange:i("pushNotifications")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"sms-notifications",className:"tw-text-sm tw-font-medium",children:"SMS Notifications"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Receive notifications via SMS"})]}),e.jsx(n,{id:"sms-notifications",checked:t.smsNotifications,onCheckedChange:i("smsNotifications")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"marketing-emails",className:"tw-text-sm tw-font-medium",children:"Marketing Emails"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Receive marketing and promotional emails"})]}),e.jsx(n,{id:"marketing-emails",checked:t.marketingEmails,onCheckedChange:i("marketingEmails")})]})]})]}),e.jsxs(m,{children:[e.jsxs(u,{children:[e.jsx(h,{children:"App Settings"}),e.jsx(w,{children:"Configure application behavior"})]}),e.jsxs(x,{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"auto-save",className:"tw-text-sm tw-font-medium",children:"Auto Save"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Automatically save your work"})]}),e.jsx(n,{id:"auto-save",checked:t.autoSave,onCheckedChange:i("autoSave")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"dark-mode",className:"tw-text-sm tw-font-medium",children:"Dark Mode"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Use dark theme"})]}),e.jsx(n,{id:"dark-mode",checked:t.darkMode,onCheckedChange:i("darkMode")})]})]})]}),e.jsxs(m,{children:[e.jsxs(u,{children:[e.jsx(h,{children:"Current Settings"}),e.jsx(w,{children:"Debug view of current settings state"})]}),e.jsx(x,{children:e.jsx("pre",{className:"tw-text-xs tw-text-muted-foreground",children:JSON.stringify(t,void 0,2)})})]})]})},parameters:{docs:{description:{story:"Comprehensive settings example with grouped sections, descriptions, and state display."}}}},g={render:()=>{const[t,l]=d.useState({notifications:!0,theme:"light",language:"en",username:"user@example.com",autoBackup:!1,backupFrequency:"daily"}),i=(a,r)=>{l(o=>({...o,[a]:r}))};return e.jsxs("div",{className:"tw-max-w-2xl tw-space-y-6",children:[e.jsxs(m,{children:[e.jsxs(u,{children:[e.jsx(h,{children:"Account Settings"}),e.jsx(w,{children:"Manage your account preferences"})]}),e.jsxs(x,{className:"tw-space-y-6",children:[e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx(s,{htmlFor:"username",children:"Username"}),e.jsx(q,{id:"username",type:"email",value:t.username,onChange:a=>i("username",a.target.value),placeholder:"Enter your email"})]}),e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx(s,{htmlFor:"language",children:"Language"}),e.jsxs(S,{value:t.language,onValueChange:a=>i("language",a),children:[e.jsx(k,{children:e.jsx(N,{})}),e.jsxs(b,{children:[e.jsx(c,{value:"en",children:"English"}),e.jsx(c,{value:"es",children:"Spanish"}),e.jsx(c,{value:"fr",children:"French"}),e.jsx(c,{value:"de",children:"German"})]})]})]}),e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx(s,{htmlFor:"theme",children:"Theme"}),e.jsxs(S,{value:t.theme,onValueChange:a=>i("theme",a),children:[e.jsx(k,{children:e.jsx(N,{})}),e.jsxs(b,{children:[e.jsx(c,{value:"light",children:"Light"}),e.jsx(c,{value:"dark",children:"Dark"}),e.jsx(c,{value:"system",children:"System"})]})]})]}),e.jsx(G,{}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"notifications",className:"tw-text-sm tw-font-medium",children:"Enable Notifications"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Receive app notifications"})]}),e.jsx(n,{id:"notifications",checked:t.notifications,onCheckedChange:a=>i("notifications",a)})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{htmlFor:"auto-backup",className:"tw-text-sm tw-font-medium",children:"Auto Backup"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Automatically backup your data"})]}),e.jsx(n,{id:"auto-backup",checked:t.autoBackup,onCheckedChange:a=>i("autoBackup",a)})]}),t.autoBackup&&e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx(s,{htmlFor:"backup-frequency",children:"Backup Frequency"}),e.jsxs(S,{value:t.backupFrequency,onValueChange:a=>i("backupFrequency",a),children:[e.jsx(k,{children:e.jsx(N,{})}),e.jsxs(b,{children:[e.jsx(c,{value:"hourly",children:"Hourly"}),e.jsx(c,{value:"daily",children:"Daily"}),e.jsx(c,{value:"weekly",children:"Weekly"}),e.jsx(c,{value:"monthly",children:"Monthly"})]})]})]})]})]}),e.jsxs("div",{className:"tw-flex tw-justify-end tw-space-x-2",children:[e.jsx(L,{variant:"outline",onClick:()=>console.log("Settings reset"),children:"Reset"}),e.jsx(L,{onClick:()=>console.log("Settings saved:",t),children:"Save Changes"})]})]})},parameters:{docs:{description:{story:"Settings form with mixed control types: inputs, selects, switches, and conditional fields."}}}},v={render:()=>{const[t,l]=d.useState({profileVisible:!0,showEmail:!1,showPhone:!1,allowTracking:!1}),[i,a]=d.useState({twoFactor:!0,loginAlerts:!0,sessionTimeout:!1,deviceTrust:!0}),r=y=>j=>{l(C=>({...C,[y]:j}))},o=y=>j=>{a(C=>({...C,[y]:j}))};return e.jsxs("div",{className:"tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2",children:[e.jsxs(m,{children:[e.jsxs(u,{children:[e.jsx(h,{children:"Privacy Settings"}),e.jsx(w,{children:"Control your privacy preferences"})]}),e.jsxs(x,{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Profile Visible"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Make your profile visible to others"})]}),e.jsx(n,{checked:t.profileVisible,onCheckedChange:r("profileVisible")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Show Email"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Display email on profile"})]}),e.jsx(n,{checked:t.showEmail,onCheckedChange:r("showEmail")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Show Phone"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Display phone number"})]}),e.jsx(n,{checked:t.showPhone,onCheckedChange:r("showPhone")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Allow Tracking"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Allow analytics tracking"})]}),e.jsx(n,{checked:t.allowTracking,onCheckedChange:r("allowTracking")})]})]})]}),e.jsxs(m,{children:[e.jsxs(u,{children:[e.jsx(h,{children:"Security Settings"}),e.jsx(w,{children:"Manage your security preferences"})]}),e.jsxs(x,{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Two-Factor Auth"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Enable 2FA for added security"})]}),e.jsx(n,{checked:i.twoFactor,onCheckedChange:o("twoFactor")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Login Alerts"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Get notified of new logins"})]}),e.jsx(n,{checked:i.loginAlerts,onCheckedChange:o("loginAlerts")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Auto Session Timeout"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Auto logout after inactivity"})]}),e.jsx(n,{checked:i.sessionTimeout,onCheckedChange:o("sessionTimeout")})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsxs("div",{children:[e.jsx(s,{className:"tw-text-sm tw-font-medium",children:"Trust This Device"}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Remember this device"})]}),e.jsx(n,{checked:i.deviceTrust,onCheckedChange:o("deviceTrust")})]})]})]})]})},parameters:{docs:{description:{story:"Grid layout for settings with multiple related sections displayed side by side."}}}};var T,F,A;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [airplaneMode, setAirplaneMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [locationServices, setLocationServices] = useState(false);
    return <Card className="tw-w-full tw-max-w-md">
        <CardHeader>
          <CardTitle>Device Settings</CardTitle>
          <CardDescription>Configure your device preferences</CardDescription>
        </CardHeader>
        <CardContent className="tw-space-y-4">
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
        </CardContent>
      </Card>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic settings layout using switches with clear labels and card container.'
      }
    }
  }
}`,...(A=(F=p.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var M,E,D;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
    return <div className="tw-max-w-2xl tw-space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="email-notifications" className="tw-text-sm tw-font-medium">
                  Email Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch id="email-notifications" checked={settings.emailNotifications} onCheckedChange={updateSetting('emailNotifications')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="push-notifications" className="tw-text-sm tw-font-medium">
                  Push Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch id="push-notifications" checked={settings.pushNotifications} onCheckedChange={updateSetting('pushNotifications')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="sms-notifications" className="tw-text-sm tw-font-medium">
                  SMS Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <Switch id="sms-notifications" checked={settings.smsNotifications} onCheckedChange={updateSetting('smsNotifications')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="marketing-emails" className="tw-text-sm tw-font-medium">
                  Marketing Emails
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Receive marketing and promotional emails
                </p>
              </div>
              <Switch id="marketing-emails" checked={settings.marketingEmails} onCheckedChange={updateSetting('marketingEmails')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
            <CardDescription>Configure application behavior</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="auto-save" className="tw-text-sm tw-font-medium">
                  Auto Save
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Automatically save your work</p>
              </div>
              <Switch id="auto-save" checked={settings.autoSave} onCheckedChange={updateSetting('autoSave')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="dark-mode" className="tw-text-sm tw-font-medium">
                  Dark Mode
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Use dark theme</p>
              </div>
              <Switch id="dark-mode" checked={settings.darkMode} onCheckedChange={updateSetting('darkMode')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Settings</CardTitle>
            <CardDescription>Debug view of current settings state</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="tw-text-xs tw-text-muted-foreground">
              {JSON.stringify(settings, undefined, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive settings example with grouped sections, descriptions, and state display.'
      }
    }
  }
}`,...(D=(E=f.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var I,P,B;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      theme: 'light',
      language: 'en',
      username: 'user@example.com',
      autoBackup: false,
      backupFrequency: 'daily'
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateSetting = (key: keyof typeof settings, value: any) => {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    };
    return <div className="tw-max-w-2xl tw-space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-6">
            <div className="tw-space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="email" value={settings.username} onChange={e => updateSetting('username', e.target.value)} placeholder="Enter your email" />
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={value => updateSetting('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.theme} onValueChange={value => updateSetting('theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="notifications" className="tw-text-sm tw-font-medium">
                  Enable Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Receive app notifications</p>
              </div>
              <Switch id="notifications" checked={settings.notifications} onCheckedChange={checked => updateSetting('notifications', checked)} />
            </div>

            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="auto-backup" className="tw-text-sm tw-font-medium">
                  Auto Backup
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Automatically backup your data
                </p>
              </div>
              <Switch id="auto-backup" checked={settings.autoBackup} onCheckedChange={checked => updateSetting('autoBackup', checked)} />
            </div>

            {settings.autoBackup && <div className="tw-space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select value={settings.backupFrequency} onValueChange={value => updateSetting('backupFrequency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>}
          </CardContent>
        </Card>

        <div className="tw-flex tw-justify-end tw-space-x-2">
          <Button variant="outline" onClick={() => console.log('Settings reset')}>
            Reset
          </Button>
          <Button onClick={() => console.log('Settings saved:', settings)}>Save Changes</Button>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings form with mixed control types: inputs, selects, switches, and conditional fields.'
      }
    }
  }
}`,...(B=(P=g.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var V,H,R;v.parameters={...v.parameters,docs:{...(V=v.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [privacy, setPrivacy] = useState({
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowTracking: false
    });
    const [security, setSecurity] = useState({
      twoFactor: true,
      loginAlerts: true,
      sessionTimeout: false,
      deviceTrust: true
    });
    const updatePrivacy = (key: keyof typeof privacy) => (checked: boolean) => {
      setPrivacy(prev => ({
        ...prev,
        [key]: checked
      }));
    };
    const updateSecurity = (key: keyof typeof security) => (checked: boolean) => {
      setSecurity(prev => ({
        ...prev,
        [key]: checked
      }));
    };
    return <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control your privacy preferences</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Profile Visible</Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Make your profile visible to others
                </p>
              </div>
              <Switch checked={privacy.profileVisible} onCheckedChange={updatePrivacy('profileVisible')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Show Email</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Display email on profile</p>
              </div>
              <Switch checked={privacy.showEmail} onCheckedChange={updatePrivacy('showEmail')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Show Phone</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Display phone number</p>
              </div>
              <Switch checked={privacy.showPhone} onCheckedChange={updatePrivacy('showPhone')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Allow Tracking</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Allow analytics tracking</p>
              </div>
              <Switch checked={privacy.allowTracking} onCheckedChange={updatePrivacy('allowTracking')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your security preferences</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Two-Factor Auth</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Enable 2FA for added security</p>
              </div>
              <Switch checked={security.twoFactor} onCheckedChange={updateSecurity('twoFactor')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Login Alerts</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Get notified of new logins</p>
              </div>
              <Switch checked={security.loginAlerts} onCheckedChange={updateSecurity('loginAlerts')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Auto Session Timeout</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Auto logout after inactivity</p>
              </div>
              <Switch checked={security.sessionTimeout} onCheckedChange={updateSecurity('sessionTimeout')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Trust This Device</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Remember this device</p>
              </div>
              <Switch checked={security.deviceTrust} onCheckedChange={updateSecurity('deviceTrust')} />
            </div>
          </CardContent>
        </Card>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid layout for settings with multiple related sections displayed side by side.'
      }
    }
  }
}`,...(R=(H=v.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};const Le=["BasicSettings","ComprehensiveSettings","MixedControlTypes","SettingsGrid"];export{p as BasicSettings,f as ComprehensiveSettings,g as MixedControlTypes,v as SettingsGrid,Le as __namedExportsOrder,be as default};
