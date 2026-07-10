import{j as e}from"./iframe-C5EseNWy.js";import{M as u}from"./markdown-renderer.component-D4iAxZuW.js";import{A as r,b as s,a as n}from"./alert-CogwLTaw.js";import{c as U}from"./createLucideIcon-Bzn6b-6R.js";import{C as X}from"./circle-alert-CuGC0aDM.js";import{I as B}from"./info-Bhc3iwgA.js";import{C as L}from"./circle-x-DFcuKRca.js";import{C as F}from"./circle-check-5DXpmgUE.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./index-BnuTq2W6.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],h=U("terminal",J),ie={title:"Shadcn/Alert",component:r,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive"],control:{type:"select"}},className:{control:"text"}},decorators:[t=>e.jsx("div",{className:"tw:max-w-lg tw:p-4",children:e.jsx(t,{})})]},a={render:t=>e.jsxs(r,{...t,children:[e.jsx(h,{className:"tw:h-4 tw:w-4"}),e.jsx(n,{children:"Heads up!"}),e.jsx(s,{children:"You can add an svg icon, title, and description to your alert."})]}),parameters:{docs:{description:{story:"A basic alert with an icon, title, and description."}}}},i={render:t=>e.jsxs(r,{...t,variant:"destructive",children:[e.jsx(X,{className:"tw:h-4 tw:w-4"}),e.jsx(n,{children:"Settings are incomplete"}),e.jsx(s,{children:"Results from the Capitalization check may be misleading because settings are incomplete"})]}),parameters:{docs:{description:{story:"A destructive alert variant used for errors or warnings."}}}},o={render:t=>e.jsxs(r,{...t,children:[e.jsx(h,{className:"tw:h-4 tw:w-4"}),e.jsx(s,{children:"You don't have to provide a title. Here is just an svg icon and a description."})]}),parameters:{docs:{description:{story:"An alert with only an icon and description, no title."}}}},c={render:t=>e.jsxs(r,{...t,children:[e.jsx("img",{className:"tw:h-4 tw:w-4",src:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg",alt:"Wifi icon"}),e.jsx(n,{children:"Connection Status"}),e.jsx(s,{children:"You can alternatively use an img for your icon."})]}),parameters:{docs:{description:{story:"An alert using an image icon instead of an SVG icon."}}}},l={render:t=>e.jsx(r,{...t,children:e.jsx(s,{children:"Alert! With only AlertDescription, this looks like a Card 🤔"})}),parameters:{docs:{description:{story:"An alert with only description content."}}}},d={render:t=>e.jsx(r,{...t,children:"Alert! With nothing else in it, this looks like a Card 🤔"}),parameters:{docs:{description:{story:"An alert with just plain text content."}}}},m={render:t=>e.jsxs(r,{...t,children:[e.jsx("img",{className:"tw:h-4 tw:w-4",src:"https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg",alt:"Markdown icon"}),e.jsx(n,{children:e.jsx(u,{anchorTarget:"_blank",className:"tw:mb-1 tw:max-w-none tw:font-medium tw:leading-none tw:tracking-tight",markdown:"[Markdown Support](https://www.markdownguide.org/cheat-sheet/)"})}),e.jsx(s,{children:e.jsx(u,{anchorTarget:"_blank",className:"tw:max-w-none tw:text-sm",markdown:"You can put a **markdown editor** in the *title* and *description*!\n- To match the markdown title with the original title, add `tw:max-w-none tw:mb-1 tw:font-medium tw:leading-none tw:tracking-tight` to the `MarkdownRenderer` class.\n- To match the markdown description with the normal description, add `tw:max-w-none tw:text-sm` to the `MarkdownRenderer` class."})})]}),parameters:{docs:{description:{story:"An alert demonstrating markdown content support in both title and description."}}}},p={render:()=>e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs(r,{children:[e.jsx(B,{className:"tw:h-4 tw:w-4"}),e.jsx(n,{children:"Info"}),e.jsx(s,{children:"This is an informational alert."})]}),e.jsxs(r,{variant:"destructive",children:[e.jsx(L,{className:"tw:h-4 tw:w-4"}),e.jsx(n,{children:"Error"}),e.jsx(s,{children:"This is an error alert."})]}),e.jsxs(r,{children:[e.jsx(F,{className:"tw:h-4 tw:w-4"}),e.jsx(n,{children:"Success"}),e.jsx(s,{children:"This looks like a success alert (using default variant)."})]})]}),parameters:{docs:{description:{story:"A showcase of different alert styles with various icons and purposes."}}}},w={render:t=>e.jsxs(r,{...t,children:[e.jsx(h,{className:"tw:h-4 tw:w-4"}),e.jsx(n,{children:"Interactive Alert"}),e.jsx(s,{children:"Use the controls panel to experiment with different variants and properties."})]}),args:{variant:"default"},parameters:{docs:{description:{story:"An interactive alert where you can test different properties using the controls."}}}};var g,A,x;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="tw:h-4 tw:w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add an svg icon, title, and description to your alert.
      </AlertDescription>
    </Alert>,
  parameters: {
    docs: {
      description: {
        story: 'A basic alert with an icon, title, and description.'
      }
    }
  }
}`,...(x=(A=a.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var f,k,y;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <Alert {...args} variant="destructive">
      <AlertCircle className="tw:h-4 tw:w-4" />
      <AlertTitle>Settings are incomplete</AlertTitle>
      <AlertDescription>
        Results from the Capitalization check may be misleading because settings are incomplete
      </AlertDescription>
    </Alert>,
  parameters: {
    docs: {
      description: {
        story: 'A destructive alert variant used for errors or warnings.'
      }
    }
  }
}`,...(y=(k=i.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var j,v,T;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="tw:h-4 tw:w-4" />
      <AlertDescription>
        You don&apos;t have to provide a title. Here is just an svg icon and a description.
      </AlertDescription>
    </Alert>,
  parameters: {
    docs: {
      description: {
        story: 'An alert with only an icon and description, no title.'
      }
    }
  }
}`,...(T=(v=o.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var D,N,S;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <img className="tw:h-4 tw:w-4" src="https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg" alt="Wifi icon" />
      <AlertTitle>Connection Status</AlertTitle>
      <AlertDescription>You can alternatively use an img for your icon.</AlertDescription>
    </Alert>,
  parameters: {
    docs: {
      description: {
        story: 'An alert using an image icon instead of an SVG icon.'
      }
    }
  }
}`,...(S=(N=c.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var C,b,M;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <AlertDescription>
        Alert! With only AlertDescription, this looks like a Card 🤔
      </AlertDescription>
    </Alert>,
  parameters: {
    docs: {
      description: {
        story: 'An alert with only description content.'
      }
    }
  }
}`,...(M=(b=l.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};var I,R,W;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <Alert {...args}>Alert! With nothing else in it, this looks like a Card 🤔</Alert>,
  parameters: {
    docs: {
      description: {
        story: 'An alert with just plain text content.'
      }
    }
  }
}`,...(W=(R=d.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var Y,_,O;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <img className="tw:h-4 tw:w-4" src="https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg" alt="Markdown icon" />
      <AlertTitle>
        <MarkdownRenderer anchorTarget="_blank" className="tw:mb-1 tw:max-w-none tw:font-medium tw:leading-none tw:tracking-tight" markdown="[Markdown Support](https://www.markdownguide.org/cheat-sheet/)" />
      </AlertTitle>
      <AlertDescription>
        <MarkdownRenderer anchorTarget="_blank" className="tw:max-w-none tw:text-sm" markdown={\`You can put a **markdown editor** in the *title* and *description*!\\n- To match the markdown title with the original title, add \\\`tw:max-w-none tw:mb-1 tw:font-medium tw:leading-none tw:tracking-tight\\\` to the \\\`MarkdownRenderer\\\` class.\\n- To match the markdown description with the normal description, add \\\`tw:max-w-none tw:text-sm\\\` to the \\\`MarkdownRenderer\\\` class.\`} />
      </AlertDescription>
    </Alert>,
  parameters: {
    docs: {
      description: {
        story: 'An alert demonstrating markdown content support in both title and description.'
      }
    }
  }
}`,...(O=(_=m.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var E,H,V;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="tw:space-y-4">
      <Alert>
        <Info className="tw:h-4 tw:w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational alert.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircle className="tw:h-4 tw:w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error alert.</AlertDescription>
      </Alert>

      <Alert>
        <CheckCircle2 className="tw:h-4 tw:w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          This looks like a success alert (using default variant).
        </AlertDescription>
      </Alert>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'A showcase of different alert styles with various icons and purposes.'
      }
    }
  }
}`,...(V=(H=p.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};var q,z,G;w.parameters={...w.parameters,docs:{...(q=w.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="tw:h-4 tw:w-4" />
      <AlertTitle>Interactive Alert</AlertTitle>
      <AlertDescription>
        Use the controls panel to experiment with different variants and properties.
      </AlertDescription>
    </Alert>,
  args: {
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive alert where you can test different properties using the controls.'
      }
    }
  }
}`,...(G=(z=w.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};const oe=["Default","Destructive","DescriptionOnly","WithImageIcon","ContentOnly","TextOnly","WithMarkdown","VariantsShowcase","Interactive"];export{l as ContentOnly,a as Default,o as DescriptionOnly,i as Destructive,w as Interactive,d as TextOnly,p as VariantsShowcase,c as WithImageIcon,m as WithMarkdown,oe as __namedExportsOrder,ie as default};
