import{j as e}from"./jsx-runtime-IYIyySKN.js";import{r as Y}from"./iframe-C-wXd9Ab.js";import{c as Z}from"./shadcn-ui.util-DMJ19wEV.js";import{B as n}from"./button-Dh2kMQGb.js";import{c as h}from"./index-B6z644vY.js";import{P as X,a as $,b as J}from"./popover-C9IqujxP.js";import{L as Q,B as u}from"./badge-CsAIFv-2.js";import"./index-Da-rSMkB.js";import"./index-CeeG3upm.js";import"./index-BPbCuWFR.js";import"./index-BqHHtCM5.js";import"./index-0F0NdbxB.js";import"./index-BMXOrXfW.js";import"./index-CuRV6Wt7.js";import"./floating-ui.react-dom-BBDukjim.js";import"./index-1CY8V3PK.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]],te=h("Bug",ee);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],b=h("CircleX",re);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],oe=h("Copy",ae);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],v=h("TriangleAlert",se),ne=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),_=(t,r)=>t[r]??r;function U({errorDetails:t,handleCopyNotify:r,localizedStrings:a}){const g=_(a,"%webView_error_dump_header%"),f=_(a,"%webView_error_dump_info_message%");function x(){navigator.clipboard.writeText(t),r&&r()}return e.jsxs("div",{className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[e.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[e.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[e.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:g}),e.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:f})]}),e.jsx(n,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>x(),children:e.jsx(oe,{})})]}),e.jsx("div",{className:"tw-prose tw-w-full",children:e.jsx("pre",{className:"tw-text-xs",children:t})})]})}U.__docgenInfo={description:"Component to render an error dump",methods:[],displayName:"ErrorDump",props:{errorDetails:{required:!0,tsType:{name:"string"},description:"String containing the error details to show"},handleCopyNotify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Handler function to notify the frontend when the error is copied"},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedInventoryKey in (typeof ERROR_DUMP_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof ERROR_DUMP_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:"List of localized strings to localize the strings in this component. Relevant keys can be found\nin `ERROR_DUMP_STRING_KEYS`"}}};Object.freeze([...ne,"%webView_error_dump_copied_message%"]);function s({errorDetails:t,handleCopyNotify:r,localizedStrings:a,children:g,className:f}){const[x,y]=Y.useState(!1),H=()=>{y(!0),r&&r()},K=W=>{W||y(!1)};return e.jsxs(X,{onOpenChange:K,children:[e.jsx($,{asChild:!0,children:g}),e.jsxs(J,{className:Z("tw-min-w-80 tw-max-w-96",f),children:[x&&a["%webView_error_dump_copied_message%"]&&e.jsx(Q,{children:a["%webView_error_dump_copied_message%"]}),e.jsx(U,{errorDetails:t,handleCopyNotify:H,localizedStrings:a})]})]})}s.__docgenInfo={description:"A popover component that displays detailed error information using the ErrorDump component.",methods:[],displayName:"ErrorPopover",props:{localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof ERROR_POPOVER_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof ERROR_POPOVER_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"List of localized strings to localize the strings in this component. Relevant keys can be\nfound in `ERROR_POPOVER_STRING_KEYS`"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS classes to insert into the `PopoverContent`"}}};const Ne={title:"Advanced/ErrorPopover",component:s,tags:["autodocs"],parameters:{docs:{description:{component:`
A popover component that displays detailed error information using the ErrorDump component.

This component wraps the ErrorDump component in a popover, making it useful for showing detailed error information without taking up permanent screen space. Users can click on a trigger element to see the error details.
        `}}},argTypes:{errorDetails:{control:"text",description:"The error details to show in the error popover"},handleCopyNotify:{action:"copy-notified",description:"Optional notification handler function to handle when the error is copied"},localizedStrings:{control:"object",description:"List of localized strings to use in the ErrorDump component"},className:{control:"text",description:"Optional CSS classes to insert into the PopoverContent"},children:{control:!1,description:"The trigger element for the popover"}}},o={"%webView_error_dump_header%":"Error Details","%webView_error_dump_info_message%":"An error occurred. You can copy the details below for troubleshooting.","%webView_error_dump_copied_message%":"Error details copied to clipboard!"},i={args:{errorDetails:`TypeError: Cannot read property 'name' of undefined
    at UserProfile.render (UserProfile.jsx:45:12)
    at updateComponent (react-dom.js:1234:56)
    at Object.invokeGuardedCallback (react-dom.js:789:10)`,localizedStrings:o,children:e.jsx(n,{variant:"destructive",children:"Show Error Details"})}},d={args:{errorDetails:`Network Error: Failed to connect to server

Request: GET /api/users
Status: 500 Internal Server Error
Timestamp: 2024-08-19T14:30:45.123Z`,localizedStrings:o,children:e.jsxs(n,{variant:"outline",size:"sm",children:[e.jsx(v,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Network Error"]})}},l={args:{errorDetails:`Validation Error: Required field missing

Field: email
Value: (empty)
Rule: required
Form: userRegistration`,localizedStrings:o,children:e.jsxs(u,{variant:"destructive",className:"tw-cursor-pointer",children:[e.jsx(b,{className:"tw-mr-1 tw-h-3 tw-w-3"}),"Validation Error"]})},parameters:{docs:{description:{story:"Using a badge as the trigger element for the error popover."}}}},c={args:{errorDetails:`Debug Information:

Component: DataTable
Props: {
  data: [Array of 150 items],
  columns: [5 column definitions],
  sortBy: "name",
  filterBy: "active"
}
State: {
  loading: false,
  selectedRows: [],
  currentPage: 3
}
Last Action: SORT_COLUMN
Performance: 2.3ms render time`,localizedStrings:{"%webView_error_dump_header%":"Debug Information","%webView_error_dump_info_message%":"Component state and performance details for debugging.","%webView_error_dump_copied_message%":"Debug details copied to clipboard!"},children:e.jsxs(n,{variant:"ghost",size:"sm",children:[e.jsx(te,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Debug Info"]})},parameters:{docs:{description:{story:"Using the ErrorPopover to show debug information instead of error details."}}}},m={args:{errorDetails:`Critical System Error: Database Connection Failed

Error Stack:
============
ConnectionTimeoutError: Connection to database timed out after 30000ms
    at Database.connect (database.js:123:45)
    at DatabaseService.initialize (service.js:67:89)
    at Application.startup (app.js:34:56)
    at Object.main (index.js:12:34)

System Information:
==================
Node.js: v18.17.0
Platform: linux x64
Memory: 1.2GB / 2GB used
CPU: 85% usage
Database: PostgreSQL 14.8
Environment: production

Connection Details:
==================
Host: db.example.com
Port: 5432
Database: production_db
SSL: enabled
Connection Pool: 10 max connections
Current Connections: 8 active

Timeline:
=========
14:30:45.000 - Application started
14:30:45.100 - Attempting database connection
14:30:45.200 - Connection attempt 1 failed
14:30:50.300 - Connection attempt 2 failed
14:30:55.400 - Connection attempt 3 failed
14:31:15.500 - Connection timeout reached
14:31:15.501 - Error thrown and caught`,localizedStrings:o,className:"tw-max-w-2xl",children:e.jsxs(n,{variant:"destructive",children:[e.jsx(v,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Critical Error"]})},parameters:{docs:{description:{story:"Example with extensive error details and custom popover width."}}}},p={render:t=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"User Registration Form"}),e.jsxs("div",{className:"tw-grid tw-grid-cols-2 tw-gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"tw-block tw-text-sm tw-font-medium",children:"First Name"}),e.jsx("input",{type:"text",className:"tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2",defaultValue:"John"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"tw-block tw-text-sm tw-font-medium",children:"Last Name"}),e.jsx("input",{type:"text",className:"tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2",defaultValue:"Doe"})]}),e.jsxs("div",{className:"tw-col-span-2",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("label",{className:"tw-block tw-text-sm tw-font-medium",children:"Email Address"}),e.jsx(s,{...t,children:e.jsx(b,{className:"tw-h-4 tw-w-4 tw-cursor-pointer tw-text-red-500"})})]}),e.jsx("input",{type:"email",className:"tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-red-300 tw-px-3 tw-py-2",defaultValue:"invalid-email"}),e.jsx("p",{className:"tw-mt-1 tw-text-sm tw-text-red-600",children:"Please enter a valid email address"})]})]})]}),args:{errorDetails:`Email Validation Error:

Input Value: "invalid-email"
Expected Format: user@domain.com
Validation Rule: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
Error Code: INVALID_EMAIL_FORMAT

Validation performed at: 2024-08-19T14:30:45.123Z
Field: email (required)
Form: userRegistration`,localizedStrings:o},parameters:{docs:{description:{story:"Example showing how to use ErrorPopover as an inline error indicator in a form."}}}},w={render:()=>e.jsxs("div",{className:"tw-space-y-6",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"System Status Dashboard"}),e.jsxs("div",{className:"tw-grid tw-grid-cols-3 tw-gap-4",children:[e.jsxs("div",{className:"tw-rounded tw-border tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("h4",{className:"tw-font-medium",children:"Database"}),e.jsx(s,{errorDetails:`Database Connection Error:
Connection timeout after 30 seconds
Host: db.example.com:5432
Last successful connection: 2024-08-19T14:25:00Z`,localizedStrings:o,children:e.jsxs(u,{variant:"destructive",className:"tw-cursor-pointer",children:[e.jsx(b,{className:"tw-mr-1 tw-h-3 tw-w-3"}),"Error"]})})]}),e.jsx("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:"Connection failed"})]}),e.jsxs("div",{className:"tw-rounded tw-border tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("h4",{className:"tw-font-medium",children:"API Server"}),e.jsx(u,{variant:"secondary",children:"Healthy"})]}),e.jsx("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:"All endpoints responding"})]}),e.jsxs("div",{className:"tw-rounded tw-border tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("h4",{className:"tw-font-medium",children:"Cache"}),e.jsx(s,{errorDetails:`Redis Cache Warning:
Memory usage: 87% (1.74GB / 2GB)
Hit rate: 73% (below threshold of 85%)
Evicted keys in last hour: 1,247
Recommendation: Increase memory or review cache policies`,localizedStrings:{"%webView_error_dump_header%":"Cache Warning","%webView_error_dump_info_message%":"Cache performance is below optimal levels.","%webView_error_dump_copied_message%":"Cache details copied to clipboard!"},children:e.jsxs(u,{variant:"outline",className:"tw-cursor-pointer tw-border-yellow-500 tw-text-yellow-600",children:[e.jsx(v,{className:"tw-mr-1 tw-h-3 tw-w-3"}),"Warning"]})})]}),e.jsx("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:"High memory usage"})]})]})]}),parameters:{docs:{description:{story:"Example showing multiple ErrorPopovers in a system status dashboard context."}}}};var N,j,E;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    errorDetails: \`TypeError: Cannot read property 'name' of undefined
    at UserProfile.render (UserProfile.jsx:45:12)
    at updateComponent (react-dom.js:1234:56)
    at Object.invokeGuardedCallback (react-dom.js:789:10)\`,
    localizedStrings: defaultLocalizedStrings,
    children: <Button variant="destructive">Show Error Details</Button>
  }
}`,...(E=(j=i.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var S,C,D;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    errorDetails: \`Network Error: Failed to connect to server

Request: GET /api/users
Status: 500 Internal Server Error
Timestamp: 2024-08-19T14:30:45.123Z\`,
    localizedStrings: defaultLocalizedStrings,
    children: <Button variant="outline" size="sm">
        <AlertTriangle className="tw-mr-2 tw-h-4 tw-w-4" />
        Network Error
      </Button>
  }
}`,...(D=(C=d.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var R,P,k;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    errorDetails: \`Validation Error: Required field missing

Field: email
Value: (empty)
Rule: required
Form: userRegistration\`,
    localizedStrings: defaultLocalizedStrings,
    children: <Badge variant="destructive" className="tw-cursor-pointer">
        <XCircle className="tw-mr-1 tw-h-3 tw-w-3" />
        Validation Error
      </Badge>
  },
  parameters: {
    docs: {
      description: {
        story: 'Using a badge as the trigger element for the error popover.'
      }
    }
  }
}`,...(k=(P=l.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var V,z,T;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    errorDetails: \`Debug Information:

Component: DataTable
Props: {
  data: [Array of 150 items],
  columns: [5 column definitions],
  sortBy: "name",
  filterBy: "active"
}
State: {
  loading: false,
  selectedRows: [],
  currentPage: 3
}
Last Action: SORT_COLUMN
Performance: 2.3ms render time\`,
    localizedStrings: {
      '%webView_error_dump_header%': 'Debug Information',
      '%webView_error_dump_info_message%': 'Component state and performance details for debugging.',
      '%webView_error_dump_copied_message%': 'Debug details copied to clipboard!'
    },
    children: <Button variant="ghost" size="sm">
        <Bug className="tw-mr-2 tw-h-4 tw-w-4" />
        Debug Info
      </Button>
  },
  parameters: {
    docs: {
      description: {
        story: 'Using the ErrorPopover to show debug information instead of error details.'
      }
    }
  }
}`,...(T=(z=c.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};var I,B,L;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    errorDetails: \`Critical System Error: Database Connection Failed

Error Stack:
============
ConnectionTimeoutError: Connection to database timed out after 30000ms
    at Database.connect (database.js:123:45)
    at DatabaseService.initialize (service.js:67:89)
    at Application.startup (app.js:34:56)
    at Object.main (index.js:12:34)

System Information:
==================
Node.js: v18.17.0
Platform: linux x64
Memory: 1.2GB / 2GB used
CPU: 85% usage
Database: PostgreSQL 14.8
Environment: production

Connection Details:
==================
Host: db.example.com
Port: 5432
Database: production_db
SSL: enabled
Connection Pool: 10 max connections
Current Connections: 8 active

Timeline:
=========
14:30:45.000 - Application started
14:30:45.100 - Attempting database connection
14:30:45.200 - Connection attempt 1 failed
14:30:50.300 - Connection attempt 2 failed
14:30:55.400 - Connection attempt 3 failed
14:31:15.500 - Connection timeout reached
14:31:15.501 - Error thrown and caught\`,
    localizedStrings: defaultLocalizedStrings,
    className: 'tw-max-w-2xl',
    children: <Button variant="destructive">
        <AlertTriangle className="tw-mr-2 tw-h-4 tw-w-4" />
        Critical Error
      </Button>
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with extensive error details and custom popover width.'
      }
    }
  }
}`,...(L=(B=m.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var A,O,M;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <div className="tw-space-y-4">
      <h3 className="tw-text-lg tw-font-semibold">User Registration Form</h3>
      <div className="tw-grid tw-grid-cols-2 tw-gap-4">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-block tw-text-sm tw-font-medium">First Name</label>
          <input type="text" className="tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2" defaultValue="John" />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-block tw-text-sm tw-font-medium">Last Name</label>
          <input type="text" className="tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2" defaultValue="Doe" />
        </div>
        <div className="tw-col-span-2">
          <div className="tw-flex tw-items-center tw-gap-2">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="tw-block tw-text-sm tw-font-medium">Email Address</label>
            <ErrorPopover {...args}>
              <XCircle className="tw-h-4 tw-w-4 tw-cursor-pointer tw-text-red-500" />
            </ErrorPopover>
          </div>
          <input type="email" className="tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-red-300 tw-px-3 tw-py-2" defaultValue="invalid-email" />
          <p className="tw-mt-1 tw-text-sm tw-text-red-600">Please enter a valid email address</p>
        </div>
      </div>
    </div>,
  args: {
    errorDetails: \`Email Validation Error:

Input Value: "invalid-email"
Expected Format: user@domain.com
Validation Rule: /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/
Error Code: INVALID_EMAIL_FORMAT

Validation performed at: 2024-08-19T14:30:45.123Z
Field: email (required)
Form: userRegistration\`,
    localizedStrings: defaultLocalizedStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to use ErrorPopover as an inline error indicator in a form.'
      }
    }
  }
}`,...(M=(O=p.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var q,F,G;w.parameters={...w.parameters,docs:{...(q=w.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-6">
      <h3 className="tw-text-lg tw-font-semibold">System Status Dashboard</h3>

      <div className="tw-grid tw-grid-cols-3 tw-gap-4">
        <div className="tw-rounded tw-border tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <h4 className="tw-font-medium">Database</h4>
            <ErrorPopover errorDetails={\`Database Connection Error:
Connection timeout after 30 seconds
Host: db.example.com:5432
Last successful connection: 2024-08-19T14:25:00Z\`} localizedStrings={defaultLocalizedStrings}>
              <Badge variant="destructive" className="tw-cursor-pointer">
                <XCircle className="tw-mr-1 tw-h-3 tw-w-3" />
                Error
              </Badge>
            </ErrorPopover>
          </div>
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">Connection failed</p>
        </div>

        <div className="tw-rounded tw-border tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <h4 className="tw-font-medium">API Server</h4>
            <Badge variant="secondary">Healthy</Badge>
          </div>
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">All endpoints responding</p>
        </div>

        <div className="tw-rounded tw-border tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <h4 className="tw-font-medium">Cache</h4>
            <ErrorPopover errorDetails={\`Redis Cache Warning:
Memory usage: 87% (1.74GB / 2GB)
Hit rate: 73% (below threshold of 85%)
Evicted keys in last hour: 1,247
Recommendation: Increase memory or review cache policies\`} localizedStrings={{
            '%webView_error_dump_header%': 'Cache Warning',
            '%webView_error_dump_info_message%': 'Cache performance is below optimal levels.',
            '%webView_error_dump_copied_message%': 'Cache details copied to clipboard!'
          }}>
              <Badge variant="outline" className="tw-cursor-pointer tw-border-yellow-500 tw-text-yellow-600">
                <AlertTriangle className="tw-mr-1 tw-h-3 tw-w-3" />
                Warning
              </Badge>
            </ErrorPopover>
          </div>
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">High memory usage</p>
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple ErrorPopovers in a system status dashboard context.'
      }
    }
  }
}`,...(G=(F=w.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};const je=["Default","WithErrorIcon","ErrorBadge","DebugInfo","LargeError","InlineErrorIndicator","MultipleErrorSources"];export{c as DebugInfo,i as Default,l as ErrorBadge,p as InlineErrorIndicator,m as LargeError,w as MultipleErrorSources,d as WithErrorIcon,je as __namedExportsOrder,Ne as default};
