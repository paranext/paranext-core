import{j as e}from"./iframe-BLkHDPc2.js";import{S as K}from"./smart-label.component-BH3MP9LD.js";import{B as Y}from"./button-NRzSW9tx.js";import{B as y}from"./badge-B1vGSQRt.js";import{E as Q}from"./external-link-D6y-7Jn7.js";import{U as V}from"./user-O7v3Syom.js";import{S as u}from"./star-V4uwY4JI.js";import"./preload-helper-CTOgD26E.js";import"./label-BJjoqCZA.js";import"./utils-BPbySc-g.js";import"./index-DSr6X7wm.js";import"./index-gvAmBDm-.js";import"./index-BnuTq2W6.js";import"./createLucideIcon-DB98mUf9.js";const we={title:"Basics/SmartLabel",component:K,tags:["autodocs"],parameters:{docs:{description:{component:`
A flexible label component that can create labels with plain text, transformed text, or complex React elements.

This component provides three ways to render labels:
1. **Default**: Direct display of the item string
2. **Text transformation**: Use \`createLabel\` to transform the item string
3. **Complex content**: Use \`createComplexLabel\` to return React elements

Perfect for dynamic labeling scenarios where the label content depends on the data.
        `}}},argTypes:{item:{control:"text",description:"The base item string to create a label from"},createLabel:{control:!1,description:"Function to transform the item string into a label string"},createComplexLabel:{control:!1,description:"Function to transform the item string into React elements"}}},i={args:{item:"Simple Label"}},l={args:{item:"john.doe@example.com",createLabel:t=>`User: ${t.split("@")[0]}`},parameters:{docs:{description:{story:"Using createLabel to transform the email into a formatted username label."}}}},c={args:{item:"external-link",createComplexLabel:t=>e.jsxs("span",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(Q,{className:"tw:h-4 tw:w-4"}),t.replace("-"," ").replace(/\b\w/g,a=>a.toUpperCase())]})},parameters:{docs:{description:{story:"Using createComplexLabel to render an icon with formatted text."}}}},m={args:{item:"john_doe_admin",createComplexLabel:t=>{const[a,r,n]=t.split("_");return e.jsxs("span",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(V,{className:"tw:h-4 tw:w-4"}),e.jsxs("span",{children:[a," ",r]}),e.jsx(y,{variant:"secondary",className:"tw:text-xs",children:n})]})}},parameters:{docs:{description:{story:"Creating a user profile label with icon, formatted name, and role badge."}}}},p={args:{item:"4.5",createComplexLabel:t=>{const a=parseFloat(t),r=Math.floor(a),n=a%1!==0;return e.jsxs("span",{className:"tw:flex tw:items-center tw:gap-1",children:[e.jsx("span",{className:"tw:text-sm tw:font-medium",children:a}),e.jsxs("div",{className:"tw:flex",children:[[...Array(r)].map((o,s)=>e.jsx(u,{className:"tw:h-4 tw:w-4 tw:fill-yellow-400 tw:text-yellow-400"},s)),n&&e.jsx(u,{className:"tw:h-4 tw:w-4 tw:fill-yellow-400/50 tw:text-yellow-400"}),[...Array(5-Math.ceil(a))].map((o,s)=>e.jsx(u,{className:"tw:h-4 tw:w-4 tw:text-gray-300"},`empty-${s}`))]})]})}},parameters:{docs:{description:{story:"Creating a star rating display from a numeric rating value."}}}},d={args:{item:"online",createComplexLabel:t=>{const a={online:{color:"tw:bg-green-500",text:"Online",textColor:"tw:text-green-700"},offline:{color:"tw:bg-gray-500",text:"Offline",textColor:"tw:text-gray-700"},away:{color:"tw:bg-yellow-500",text:"Away",textColor:"tw:text-yellow-700"},busy:{color:"tw:bg-red-500",text:"Busy",textColor:"tw:text-red-700"}},r=a[t]||a.offline;return e.jsxs("span",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx("div",{className:`tw:h-2 tw:w-2 tw:rounded-full ${r.color}`}),e.jsx("span",{className:`tw:text-sm tw:font-medium ${r.textColor}`,children:r.text})]})}},parameters:{docs:{description:{story:"Creating a status indicator with colored dot and text."}}}},w={args:{item:"document.pdf",createComplexLabel:t=>{var s;const a=(s=t.split(".").pop())==null?void 0:s.toLowerCase(),r=t.split(".").slice(0,-1).join("."),o={pdf:{color:"tw:bg-red-100 tw:text-red-800",label:"PDF"},doc:{color:"tw:bg-blue-100 tw:text-blue-800",label:"DOC"},docx:{color:"tw:bg-blue-100 tw:text-blue-800",label:"DOCX"},txt:{color:"tw:bg-gray-100 tw:text-gray-800",label:"TXT"},jpg:{color:"tw:bg-green-100 tw:text-green-800",label:"JPG"},png:{color:"tw:bg-green-100 tw:text-green-800",label:"PNG"}}[a]||{color:"tw:bg-gray-100 tw:text-gray-800",label:(a==null?void 0:a.toUpperCase())||"FILE"};return e.jsxs("span",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx("span",{className:"tw:truncate tw:text-sm",children:r}),e.jsx(y,{variant:"outline",className:o.color,children:o.label})]})}},parameters:{docs:{description:{story:"Creating a file label with name and type indicator."}}}},g={args:{item:"https://example.com",createComplexLabel:t=>e.jsx(Y,{variant:"link",className:"tw:h-auto tw:p-0 tw:text-left",onClick:()=>window.open(t,"_blank"),children:e.jsxs("span",{className:"tw:flex tw:items-center tw:gap-1",children:[t,e.jsx(Q,{className:"tw:h-3 tw:w-3"})]})})},parameters:{docs:{description:{story:"Creating a clickable label that opens a link."}}}},x={render:()=>{const t=["john.doe@example.com","jane.smith@example.com","admin@example.com"];return e.jsxs("div",{className:"tw:space-y-2",children:[e.jsx("h4",{className:"tw:font-medium",children:"User List"}),t.map(a=>e.jsx("div",{className:"tw:flex tw:items-center tw:gap-2",children:e.jsx(K,{item:a,createComplexLabel:r=>{const[n,o]=r.split("@"),s=n.includes("admin");return e.jsxs("span",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(V,{className:`tw:h-4 tw:w-4 ${s?"tw:text-red-500":"tw:text-blue-500"}`}),e.jsx("span",{children:n}),e.jsxs("span",{className:"tw:text-xs tw:text-muted-foreground",children:["@",o]}),s&&e.jsx(y,{variant:"destructive",className:"tw:text-xs",children:"Admin"})]})}})},a))]})},parameters:{docs:{description:{story:"Example showing multiple SmartLabels in a list with different formatting."}}}},f={args:{item:"high",createLabel:t=>({low:"🟢 Low Priority",medium:"🟡 Medium Priority",high:"🔴 High Priority",urgent:"🚨 Urgent Priority"})[t]||`❓ ${t} Priority`},parameters:{docs:{description:{story:"Using createLabel to transform priority levels into formatted text with emojis."}}}};var b,h,C;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: 'Simple Label'
  }
}`,...(C=(h=i.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var N,L,j;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    item: 'john.doe@example.com',
    createLabel: (item: string) => \`User: \${item.split('@')[0]}\`
  },
  parameters: {
    docs: {
      description: {
        story: 'Using createLabel to transform the email into a formatted username label.'
      }
    }
  }
}`,...(j=(L=l.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var S,k,v;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    item: 'external-link',
    createComplexLabel: (item: string) => <span className="tw:flex tw:items-center tw:gap-2">
        <ExternalLink className="tw:h-4 tw:w-4" />
        {item.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
      </span>
  },
  parameters: {
    docs: {
      description: {
        story: 'Using createComplexLabel to render an icon with formatted text.'
      }
    }
  }
}`,...(v=(k=c.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var U,P,T;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    item: 'john_doe_admin',
    createComplexLabel: (item: string) => {
      const [firstName, lastName, role] = item.split('_');
      return <span className="tw:flex tw:items-center tw:gap-2">
          <User className="tw:h-4 tw:w-4" />
          <span>
            {firstName} {lastName}
          </span>
          <Badge variant="secondary" className="tw:text-xs">
            {role}
          </Badge>
        </span>;
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a user profile label with icon, formatted name, and role badge.'
      }
    }
  }
}`,...(T=(P=m.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var B,_,A;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    item: '4.5',
    createComplexLabel: (item: string) => {
      const rating = parseFloat(item);
      const stars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      return <span className="tw:flex tw:items-center tw:gap-1">
          <span className="tw:text-sm tw:font-medium">{rating}</span>
          <div className="tw:flex">
            {[...Array(stars)].map((_, i) =>
          // Stars are generated from count; index is the only meaningful key here
          // eslint-disable-next-line react/no-array-index-key
          <Star key={i} className="tw:h-4 tw:w-4 tw:fill-yellow-400 tw:text-yellow-400" />)}
            {hasHalfStar && <Star className="tw:h-4 tw:w-4 tw:fill-yellow-400/50 tw:text-yellow-400" />}
            {[...Array(5 - Math.ceil(rating))].map((_, i) =>
          // Empty stars generated from count; index is the only meaningful key here
          // eslint-disable-next-line react/no-array-index-key
          <Star key={\`empty-\${i}\`} className="tw:h-4 tw:w-4 tw:text-gray-300" />)}
          </div>
        </span>;
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a star rating display from a numeric rating value.'
      }
    }
  }
}`,...(A=(_=p.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var E,$,D;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: 'online',
    createComplexLabel: (item: string) => {
      const statusConfig = {
        online: {
          color: 'tw:bg-green-500',
          text: 'Online',
          textColor: 'tw:text-green-700'
        },
        offline: {
          color: 'tw:bg-gray-500',
          text: 'Offline',
          textColor: 'tw:text-gray-700'
        },
        away: {
          color: 'tw:bg-yellow-500',
          text: 'Away',
          textColor: 'tw:text-yellow-700'
        },
        busy: {
          color: 'tw:bg-red-500',
          text: 'Busy',
          textColor: 'tw:text-red-700'
        }
      };

      // item comes from the story args as a generic string; cast is needed to index statusConfig
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const config = statusConfig[item as keyof typeof statusConfig] || statusConfig.offline;
      return <span className="tw:flex tw:items-center tw:gap-2">
          <div className={\`tw:h-2 tw:w-2 tw:rounded-full \${config.color}\`} />
          <span className={\`tw:text-sm tw:font-medium \${config.textColor}\`}>{config.text}</span>
        </span>;
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a status indicator with colored dot and text.'
      }
    }
  }
}`,...(D=($=d.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var F,O,M;w.parameters={...w.parameters,docs:{...(F=w.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    item: 'document.pdf',
    createComplexLabel: (item: string) => {
      const extension = item.split('.').pop()?.toLowerCase();
      const fileName = item.split('.').slice(0, -1).join('.');
      const typeConfig = {
        pdf: {
          color: 'tw:bg-red-100 tw:text-red-800',
          label: 'PDF'
        },
        doc: {
          color: 'tw:bg-blue-100 tw:text-blue-800',
          label: 'DOC'
        },
        docx: {
          color: 'tw:bg-blue-100 tw:text-blue-800',
          label: 'DOCX'
        },
        txt: {
          color: 'tw:bg-gray-100 tw:text-gray-800',
          label: 'TXT'
        },
        jpg: {
          color: 'tw:bg-green-100 tw:text-green-800',
          label: 'JPG'
        },
        png: {
          color: 'tw:bg-green-100 tw:text-green-800',
          label: 'PNG'
        }
      };

      // extension comes from the story args as a generic string; cast is needed to index typeConfig
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const config = typeConfig[extension as keyof typeof typeConfig] || {
        color: 'tw:bg-gray-100 tw:text-gray-800',
        label: extension?.toUpperCase() || 'FILE'
      };
      return <span className="tw:flex tw:items-center tw:gap-2">
          <span className="tw:truncate tw:text-sm">{fileName}</span>
          <Badge variant="outline" className={config.color}>
            {config.label}
          </Badge>
        </span>;
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a file label with name and type indicator.'
      }
    }
  }
}`,...(M=(O=w.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var R,H,G;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    item: 'https://example.com',
    createComplexLabel: (item: string) => <Button variant="link" className="tw:h-auto tw:p-0 tw:text-left" onClick={() => window.open(item, '_blank')}>
        <span className="tw:flex tw:items-center tw:gap-1">
          {item}
          <ExternalLink className="tw:h-3 tw:w-3" />
        </span>
      </Button>
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a clickable label that opens a link.'
      }
    }
  }
}`,...(G=(H=g.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var I,W,X;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const items = ['john.doe@example.com', 'jane.smith@example.com', 'admin@example.com'];
    return <div className="tw:space-y-2">
        <h4 className="tw:font-medium">User List</h4>
        {items.map(item => <div key={item} className="tw:flex tw:items-center tw:gap-2">
            <SmartLabel item={item} createComplexLabel={(email: string) => {
          const [username, domain] = email.split('@');
          const isAdmin = username.includes('admin');
          return <span className="tw:flex tw:items-center tw:gap-2">
                    <User className={\`tw:h-4 tw:w-4 \${isAdmin ? 'tw:text-red-500' : 'tw:text-blue-500'}\`} />
                    <span>{username}</span>
                    <span className="tw:text-xs tw:text-muted-foreground">@{domain}</span>
                    {isAdmin && <Badge variant="destructive" className="tw:text-xs">
                        Admin
                      </Badge>}
                  </span>;
        }} />
          </div>)}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple SmartLabels in a list with different formatting.'
      }
    }
  }
}`,...(X=(W=x.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var q,J,z;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    item: 'high',
    createLabel: (item: string) => {
      const priorities = {
        low: '🟢 Low Priority',
        medium: '🟡 Medium Priority',
        high: '🔴 High Priority',
        urgent: '🚨 Urgent Priority'
      };
      // item comes from the story args as a generic string; cast is needed to index priorities
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return priorities[item as keyof typeof priorities] || \`❓ \${item} Priority\`;
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Using createLabel to transform priority levels into formatted text with emojis.'
      }
    }
  }
}`,...(z=(J=f.parameters)==null?void 0:J.docs)==null?void 0:z.source}}};const ge=["Default","WithTextTransformation","WithComplexContent","UserProfile","Rating","StatusIndicator","FileType","ClickableLabel","MultipleLabels","PriorityTransformation"];export{g as ClickableLabel,i as Default,w as FileType,x as MultipleLabels,f as PriorityTransformation,p as Rating,d as StatusIndicator,m as UserProfile,c as WithComplexContent,l as WithTextTransformation,ge as __namedExportsOrder,we as default};
