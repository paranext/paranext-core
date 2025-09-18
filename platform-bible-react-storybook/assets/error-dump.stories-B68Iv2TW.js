import{E as A}from"./error-dump.component-DtlxraNf.js";import"./jsx-runtime-4wK_0ZO4.js";import"./iframe-BcYeWgcr.js";import"./button-BklEqBlb.js";import"./index-BJ893FO-.js";import"./index-DNc3TkLQ.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./createLucideIcon-D1oFpSf_.js";const H={title:"Basics/ErrorDump",component:A,tags:["autodocs"],parameters:{docs:{description:{component:`
A component for displaying error details with a copy-to-clipboard functionality.

This component is useful for showing detailed error information to users and allowing them to easily copy the error details for sharing or debugging purposes.
        `}}},argTypes:{errorDetails:{control:"text",description:"String containing the error details to show"},handleCopyNotify:{action:"copy-notified",description:"Handler function to notify the frontend when the error is copied"},localizedStrings:{control:"object",description:"List of localized strings to localize the strings in this component"}}},e={"%webView_error_dump_header%":"Error Details","%webView_error_dump_info_message%":"An error occurred. You can copy the details below for troubleshooting."},r={args:{errorDetails:`Error: Failed to load resource
    at loadResource (app.js:123:45)
    at handleRequest (server.js:67:89)
    at Object.process (main.js:12:34)
Time: 2024-08-19 14:30:45
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`,localizedStrings:e}},t={args:{errorDetails:'TypeError: Cannot read property "name" of undefined',localizedStrings:e}},o={args:{errorDetails:`ReferenceError: myFunction is not defined
    at Object.handleClick (component.js:45:12)
    at HTMLButtonElement.<anonymous> (events.js:23:7)
    at HTMLButtonElement.dispatch (jquery.min.js:2:42571)
    at HTMLButtonElement.v.handle (jquery.min.js:2:40523)

Stack trace:
  - handleClick @ component.js:45:12
  - <anonymous> @ events.js:23:7
  - dispatch @ jquery.min.js:2:42571
  - handle @ jquery.min.js:2:40523

Environment:
  Browser: Chrome 117.0.0.0
  OS: Windows 11
  Timestamp: 2024-08-19T14:30:45.123Z`,localizedStrings:e}},n={args:{errorDetails:`Network Error: Failed to fetch data from API

Request Details:
  URL: https://api.example.com/data
  Method: GET
  Headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer xxx...xxx"
  }

Response:
  Status: 500 Internal Server Error
  Body: {
    "error": "Database connection failed",
    "code": "DB_CONNECTION_ERROR",
    "timestamp": "2024-08-19T14:30:45.123Z"
  }

Additional Context:
  - User was trying to load dashboard data
  - Last successful request: 2024-08-19T14:28:12.456Z
  - Number of retry attempts: 3`,localizedStrings:e}},a={args:{errorDetails:"Error loading user preferences from storage.",localizedStrings:{"%webView_error_dump_header%":"Erreur Système","%webView_error_dump_info_message%":"Une erreur est survenue. Vous pouvez copier les détails ci-dessous pour le dépannage."}},parameters:{docs:{description:{story:"Example with French localization to demonstrate the localized strings feature."}}}},s={args:{errorDetails:`System Error: Critical failure in data processing pipeline

Error Trace:
===========
[14:30:45.123] ERROR: Database connection pool exhausted
[14:30:45.124] WARN: Attempting to reconnect to database
[14:30:45.456] ERROR: Reconnection failed after 3 attempts
[14:30:45.789] ERROR: Falling back to cache layer
[14:30:46.012] ERROR: Cache layer also unavailable
[14:30:46.345] CRITICAL: System entering emergency mode

Stack Trace:
============
DatabaseConnectionError: Connection pool exhausted
    at ConnectionPool.getConnection (pool.js:123:45)
    at DatabaseService.query (database.js:67:89)
    at UserService.getUserData (user.js:34:56)
    at RequestHandler.handleGetUser (handler.js:78:90)
    at Router.handleRequest (router.js:12:34)
    at Application.process (app.js:56:78)

Environment Information:
========================
Node.js Version: v18.17.0
Platform: linux x64
Memory Usage: 1.2GB / 2GB (60%)
CPU Usage: 85%
Database: PostgreSQL 14.8
Cache: Redis 7.0.11

Request Details:
================
User ID: user_12345
Endpoint: /api/users/profile
Request Time: 2024-08-19T14:30:45.123Z
Session ID: sess_abcdef123456
IP Address: 192.168.1.100
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`,localizedStrings:e},parameters:{docs:{description:{story:"Example with extensive error details showing how the component handles long text content."}}}},i={args:{errorDetails:"Connection timeout after 30 seconds",localizedStrings:e,handleCopyNotify:()=>{alert("Error details copied to clipboard!")}},parameters:{docs:{description:{story:"Click the copy button to see the copy notification handler in action."}}}},c={args:{errorDetails:"Localization keys will be displayed as fallback text",localizedStrings:{}},parameters:{docs:{description:{story:"Example showing fallback behavior when localized strings are not provided."}}}};var l,d,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    errorDetails: \`Error: Failed to load resource
    at loadResource (app.js:123:45)
    at handleRequest (server.js:67:89)
    at Object.process (main.js:12:34)
Time: 2024-08-19 14:30:45
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\`,
    localizedStrings: defaultLocalizedStrings
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,u,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    errorDetails: 'TypeError: Cannot read property "name" of undefined',
    localizedStrings: defaultLocalizedStrings
  }
}`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,f,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    errorDetails: \`ReferenceError: myFunction is not defined
    at Object.handleClick (component.js:45:12)
    at HTMLButtonElement.<anonymous> (events.js:23:7)
    at HTMLButtonElement.dispatch (jquery.min.js:2:42571)
    at HTMLButtonElement.v.handle (jquery.min.js:2:40523)

Stack trace:
  - handleClick @ component.js:45:12
  - <anonymous> @ events.js:23:7
  - dispatch @ jquery.min.js:2:42571
  - handle @ jquery.min.js:2:40523

Environment:
  Browser: Chrome 117.0.0.0
  OS: Windows 11
  Timestamp: 2024-08-19T14:30:45.123Z\`,
    localizedStrings: defaultLocalizedStrings
  }
}`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var S,E,R;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    errorDetails: \`Network Error: Failed to fetch data from API

Request Details:
  URL: https://api.example.com/data
  Method: GET
  Headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer xxx...xxx"
  }

Response:
  Status: 500 Internal Server Error
  Body: {
    "error": "Database connection failed",
    "code": "DB_CONNECTION_ERROR",
    "timestamp": "2024-08-19T14:30:45.123Z"
  }

Additional Context:
  - User was trying to load dashboard data
  - Last successful request: 2024-08-19T14:28:12.456Z
  - Number of retry attempts: 3\`,
    localizedStrings: defaultLocalizedStrings
  }
}`,...(R=(E=n.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var b,j,C;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    errorDetails: 'Error loading user preferences from storage.',
    localizedStrings: {
      '%webView_error_dump_header%': 'Erreur Système',
      '%webView_error_dump_info_message%': 'Une erreur est survenue. Vous pouvez copier les détails ci-dessous pour le dépannage.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with French localization to demonstrate the localized strings feature.'
      }
    }
  }
}`,...(C=(j=a.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var w,z,D;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    errorDetails: \`System Error: Critical failure in data processing pipeline

Error Trace:
===========
[14:30:45.123] ERROR: Database connection pool exhausted
[14:30:45.124] WARN: Attempting to reconnect to database
[14:30:45.456] ERROR: Reconnection failed after 3 attempts
[14:30:45.789] ERROR: Falling back to cache layer
[14:30:46.012] ERROR: Cache layer also unavailable
[14:30:46.345] CRITICAL: System entering emergency mode

Stack Trace:
============
DatabaseConnectionError: Connection pool exhausted
    at ConnectionPool.getConnection (pool.js:123:45)
    at DatabaseService.query (database.js:67:89)
    at UserService.getUserData (user.js:34:56)
    at RequestHandler.handleGetUser (handler.js:78:90)
    at Router.handleRequest (router.js:12:34)
    at Application.process (app.js:56:78)

Environment Information:
========================
Node.js Version: v18.17.0
Platform: linux x64
Memory Usage: 1.2GB / 2GB (60%)
CPU Usage: 85%
Database: PostgreSQL 14.8
Cache: Redis 7.0.11

Request Details:
================
User ID: user_12345
Endpoint: /api/users/profile
Request Time: 2024-08-19T14:30:45.123Z
Session ID: sess_abcdef123456
IP Address: 192.168.1.100
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\`,
    localizedStrings: defaultLocalizedStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with extensive error details showing how the component handles long text content.'
      }
    }
  }
}`,...(D=(z=s.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var x,T,v;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    errorDetails: 'Connection timeout after 30 seconds',
    localizedStrings: defaultLocalizedStrings,
    handleCopyNotify: () => {
      // In a real application, this would show a toast notification
      // eslint-disable-next-line no-alert
      alert('Error details copied to clipboard!');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the copy button to see the copy notification handler in action.'
      }
    }
  }
}`,...(v=(T=i.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var _,L,q;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    errorDetails: 'Localization keys will be displayed as fallback text',
    localizedStrings: {} // Empty object to show fallback behavior
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing fallback behavior when localized strings are not provided.'
      }
    }
  }
}`,...(q=(L=c.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};const F=["Default","SimpleError","JavaScriptStackTrace","NetworkError","CustomLocalizedStrings","LongErrorDetails","WithCopyNotification","MissingLocalizedStrings"];export{a as CustomLocalizedStrings,r as Default,o as JavaScriptStackTrace,s as LongErrorDetails,c as MissingLocalizedStrings,n as NetworkError,t as SimpleError,i as WithCopyNotification,F as __namedExportsOrder,H as default};
