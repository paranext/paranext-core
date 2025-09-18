import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{r as Z}from"./iframe-BcYeWgcr.js";import{c as K}from"./shadcn-ui.util-DMJ19wEV.js";import{E as Y,a as X}from"./error-dump.component-DtlxraNf.js";import{P as $,a as J,b as Q}from"./popover-DBT5nGAg.js";import{L as ee}from"./label-dXSGOCoI.js";import{B as c}from"./badge-DdQS0ixi.js";import{B as m}from"./button-BklEqBlb.js";import{c as O}from"./createLucideIcon-D1oFpSf_.js";import{C as u}from"./circle-x-BjyDMdNC.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-DNc3TkLQ.js";import"./index-Dxmr7YCn.js";import"./index-DThCJ6FV.js";import"./index-CHtcClp9.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BJ893FO-.js";import"./index-BdtTgfff.js";import"./index-BDeDN-dv.js";import"./floating-ui.react-dom-BrelV8Hr.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-b4TQRt8l.js";import"./index-hI4Fiusr.js";import"./index-D7NlkAyc.js";import"./index-BTW_afRk.js";import"./index-D2kttkiv.js";import"./index-BPbCuWFR.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]],re=O("Bug",te);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],h=O("TriangleAlert",oe);Object.freeze([...X,"%webView_error_dump_copied_message%"]);function r({errorDetails:p,handleCopyNotify:g,localizedStrings:w,children:M,className:F,id:q}){const[G,f]=Z.useState(!1),U=()=>{f(!0),g&&g()},H=W=>{W||f(!1)};return e.jsxs($,{onOpenChange:H,children:[e.jsx(J,{asChild:!0,children:M}),e.jsxs(Q,{id:q,className:K("tw-min-w-80 tw-max-w-96",F),children:[G&&w["%webView_error_dump_copied_message%"]&&e.jsx(ee,{children:w["%webView_error_dump_copied_message%"]}),e.jsx(Y,{errorDetails:p,handleCopyNotify:U,localizedStrings:w})]})]})}r.__docgenInfo={description:"A popover component that displays detailed error information using the ErrorDump component.",methods:[],displayName:"ErrorPopover",props:{localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof ERROR_POPOVER_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof ERROR_POPOVER_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"List of localized strings to localize the strings in this component. Relevant keys can be\nfound in `ERROR_POPOVER_STRING_KEYS`"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS classes to insert into the `PopoverContent`"},id:{required:!1,tsType:{name:"string"},description:"Optional ID for the popover content for accessibility"}}};const Te={title:"Advanced/ErrorPopover",component:r,tags:["autodocs"],parameters:{docs:{description:{component:`
A popover component that displays detailed error information using the ErrorDump component.

This component wraps the ErrorDump component in a popover, making it useful for showing detailed error information without taking up permanent screen space. Users can click on a trigger element to see the error details.
        `}}},argTypes:{errorDetails:{control:"text",description:"The error details to show in the error popover"},handleCopyNotify:{action:"copy-notified",description:"Optional notification handler function to handle when the error is copied"},localizedStrings:{control:"object",description:"List of localized strings to use in the ErrorDump component"},className:{control:"text",description:"Optional CSS classes to insert into the PopoverContent"},children:{control:!1,description:"The trigger element for the popover"}}},t={"%webView_error_dump_header%":"Error Details","%webView_error_dump_info_message%":"An error occurred. You can copy the details below for troubleshooting.","%webView_error_dump_copied_message%":"Error details copied to clipboard!"},o={args:{errorDetails:`TypeError: Cannot read property 'name' of undefined
    at UserProfile.render (UserProfile.jsx:45:12)
    at updateComponent (react-dom.js:1234:56)
    at Object.invokeGuardedCallback (react-dom.js:789:10)`,localizedStrings:t,children:e.jsx(m,{variant:"destructive",children:"Show Error Details"})}},a={args:{errorDetails:`Network Error: Failed to connect to server

Request: GET /api/users
Status: 500 Internal Server Error
Timestamp: 2024-08-19T14:30:45.123Z`,localizedStrings:t,children:e.jsxs(m,{variant:"outline",size:"sm",children:[e.jsx(h,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Network Error"]})}},s={args:{errorDetails:`Validation Error: Required field missing

Field: email
Value: (empty)
Rule: required
Form: userRegistration`,localizedStrings:t,children:e.jsxs(c,{variant:"destructive",className:"tw-cursor-pointer",children:[e.jsx(u,{className:"tw-mr-1 tw-h-3 tw-w-3"}),"Validation Error"]})},parameters:{docs:{description:{story:"Using a badge as the trigger element for the error popover."}}}},i={args:{errorDetails:`Debug Information:

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
Performance: 2.3ms render time`,localizedStrings:{"%webView_error_dump_header%":"Debug Information","%webView_error_dump_info_message%":"Component state and performance details for debugging.","%webView_error_dump_copied_message%":"Debug details copied to clipboard!"},children:e.jsxs(m,{variant:"ghost",size:"sm",children:[e.jsx(re,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Debug Info"]})},parameters:{docs:{description:{story:"Using the ErrorPopover to show debug information instead of error details."}}}},n={args:{errorDetails:`Critical System Error: Database Connection Failed

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
14:31:15.501 - Error thrown and caught`,localizedStrings:t,className:"tw-max-w-2xl",children:e.jsxs(m,{variant:"destructive",children:[e.jsx(h,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Critical Error"]})},parameters:{docs:{description:{story:"Example with extensive error details and custom popover width."}}}},d={render:p=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"User Registration Form"}),e.jsxs("div",{className:"tw-grid tw-grid-cols-2 tw-gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"tw-block tw-text-sm tw-font-medium",children:"First Name"}),e.jsx("input",{type:"text",className:"tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2",defaultValue:"John"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"tw-block tw-text-sm tw-font-medium",children:"Last Name"}),e.jsx("input",{type:"text",className:"tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2",defaultValue:"Doe"})]}),e.jsxs("div",{className:"tw-col-span-2",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("label",{className:"tw-block tw-text-sm tw-font-medium",children:"Email Address"}),e.jsx(r,{...p,children:e.jsx(u,{className:"tw-h-4 tw-w-4 tw-cursor-pointer tw-text-red-500"})})]}),e.jsx("input",{type:"email",className:"tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-red-300 tw-px-3 tw-py-2",defaultValue:"invalid-email"}),e.jsx("p",{className:"tw-mt-1 tw-text-sm tw-text-red-600",children:"Please enter a valid email address"})]})]})]}),args:{errorDetails:`Email Validation Error:

Input Value: "invalid-email"
Expected Format: user@domain.com
Validation Rule: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
Error Code: INVALID_EMAIL_FORMAT

Validation performed at: 2024-08-19T14:30:45.123Z
Field: email (required)
Form: userRegistration`,localizedStrings:t},parameters:{docs:{description:{story:"Example showing how to use ErrorPopover as an inline error indicator in a form."}}}},l={render:()=>e.jsxs("div",{className:"tw-space-y-6",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"System Status Dashboard"}),e.jsxs("div",{className:"tw-grid tw-grid-cols-3 tw-gap-4",children:[e.jsxs("div",{className:"tw-rounded tw-border tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("h4",{className:"tw-font-medium",children:"Database"}),e.jsx(r,{errorDetails:`Database Connection Error:
Connection timeout after 30 seconds
Host: db.example.com:5432
Last successful connection: 2024-08-19T14:25:00Z`,localizedStrings:t,children:e.jsxs(c,{variant:"destructive",className:"tw-cursor-pointer",children:[e.jsx(u,{className:"tw-mr-1 tw-h-3 tw-w-3"}),"Error"]})})]}),e.jsx("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:"Connection failed"})]}),e.jsxs("div",{className:"tw-rounded tw-border tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("h4",{className:"tw-font-medium",children:"API Server"}),e.jsx(c,{variant:"secondary",children:"Healthy"})]}),e.jsx("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:"All endpoints responding"})]}),e.jsxs("div",{className:"tw-rounded tw-border tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("h4",{className:"tw-font-medium",children:"Cache"}),e.jsx(r,{errorDetails:`Redis Cache Warning:
Memory usage: 87% (1.74GB / 2GB)
Hit rate: 73% (below threshold of 85%)
Evicted keys in last hour: 1,247
Recommendation: Increase memory or review cache policies`,localizedStrings:{"%webView_error_dump_header%":"Cache Warning","%webView_error_dump_info_message%":"Cache performance is below optimal levels.","%webView_error_dump_copied_message%":"Cache details copied to clipboard!"},children:e.jsxs(c,{variant:"outline",className:"tw-cursor-pointer tw-border-yellow-500 tw-text-yellow-600",children:[e.jsx(h,{className:"tw-mr-1 tw-h-3 tw-w-3"}),"Warning"]})})]}),e.jsx("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:"High memory usage"})]})]})]}),parameters:{docs:{description:{story:"Example showing multiple ErrorPopovers in a system status dashboard context."}}}};var b,x,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    errorDetails: \`TypeError: Cannot read property 'name' of undefined
    at UserProfile.render (UserProfile.jsx:45:12)
    at updateComponent (react-dom.js:1234:56)
    at Object.invokeGuardedCallback (react-dom.js:789:10)\`,
    localizedStrings: defaultLocalizedStrings,
    children: <Button variant="destructive">Show Error Details</Button>
  }
}`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var y,N,E;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(E=(N=a.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var _,j,S;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(S=(j=s.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var C,D,P;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(P=(D=i.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};var k,R,V;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(V=(R=n.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var T,B,I;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(I=(B=d.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var z,A,L;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(L=(A=l.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};const Be=["Default","WithErrorIcon","ErrorBadge","DebugInfo","LargeError","InlineErrorIndicator","MultipleErrorSources"];export{i as DebugInfo,o as Default,s as ErrorBadge,d as InlineErrorIndicator,n as LargeError,l as MultipleErrorSources,a as WithErrorIcon,Be as __namedExportsOrder,Te as default};
