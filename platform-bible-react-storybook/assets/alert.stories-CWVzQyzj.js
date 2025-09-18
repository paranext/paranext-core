import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{M as x}from"./markdown-renderer.component-DWWrHvCP.js";import{e as g}from"./iframe-BcYeWgcr.js";import{c as F}from"./index-BPbCuWFR.js";import{c as A}from"./shadcn-ui.util-DMJ19wEV.js";import{T as J}from"./theme-provider.component-Bum-YBGl.js";import{c as K}from"./createLucideIcon-D1oFpSf_.js";import{C as Q}from"./circle-alert-ZIS4O6V_.js";import{I as Z}from"./info-DNtakeLH.js";import{C as $}from"./circle-x-BjyDMdNC.js";import{C as ee}from"./circle-check-m0xEGIhY.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],f=K("Terminal",te),re=F("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),r=g.forwardRef(({className:t,variant:n,...i},P)=>e.jsx("div",{ref:P,role:"alert",className:A("pr-twp",re({variant:n}),t),...i}));r.displayName="Alert";const a=g.forwardRef(({className:t,...n},i)=>e.jsxs("h5",{ref:i,className:A("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));a.displayName="AlertTitle";const s=g.forwardRef(({className:t,...n},i)=>e.jsx("div",{ref:i,className:A("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));s.displayName="AlertDescription";r.__docgenInfo={description:`The Alert displays a callout for user attention. The component is built and styled by Shadcn UI.
See Shadcn UI Documentation https://ui.shadcn.com/docs/components/alert`,methods:[],displayName:"Alert"};a.__docgenInfo={description:"@inheritdoc Alert",methods:[],displayName:"AlertTitle"};s.__docgenInfo={description:"@inheritdoc Alert",methods:[],displayName:"AlertDescription"};const he={title:"Shadcn/Alert",component:r,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive"],control:{type:"select"}},className:{control:"text"}},decorators:[t=>e.jsx(J,{children:e.jsx("div",{className:"tw-max-w-lg tw-p-4",children:e.jsx(t,{})})})]},o={render:t=>e.jsxs(r,{...t,children:[e.jsx(f,{className:"tw-h-4 tw-w-4"}),e.jsx(a,{children:"Heads up!"}),e.jsx(s,{children:"You can add an svg icon, title, and description to your alert."})]}),parameters:{docs:{description:{story:"A basic alert with an icon, title, and description."}}}},c={render:t=>e.jsxs(r,{...t,variant:"destructive",children:[e.jsx(Q,{className:"tw-h-4 tw-w-4"}),e.jsx(a,{children:"Settings are incomplete"}),e.jsx(s,{children:"Results from the Capitalization check may be misleading because settings are incomplete"})]}),parameters:{docs:{description:{story:"A destructive alert variant used for errors or warnings."}}}},l={render:t=>e.jsxs(r,{...t,children:[e.jsx(f,{className:"tw-h-4 tw-w-4"}),e.jsx(s,{children:"You don't have to provide a title. Here is just an svg icon and a description."})]}),parameters:{docs:{description:{story:"An alert with only an icon and description, no title."}}}},d={render:t=>e.jsxs(r,{...t,children:[e.jsx("img",{className:"tw-h-4 tw-w-4",src:"https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg",alt:"Wifi icon"}),e.jsx(a,{children:"Connection Status"}),e.jsx(s,{children:"You can alternatively use an img for your icon."})]}),parameters:{docs:{description:{story:"An alert using an image icon instead of an SVG icon."}}}},m={render:t=>e.jsx(r,{...t,children:e.jsx(s,{children:"Alert! With only AlertDescription, this looks like a Card 🤔"})}),parameters:{docs:{description:{story:"An alert with only description content."}}}},p={render:t=>e.jsx(r,{...t,children:"Alert! With nothing else in it, this looks like a Card 🤔"}),parameters:{docs:{description:{story:"An alert with just plain text content."}}}},w={render:t=>e.jsxs(r,{...t,children:[e.jsx("img",{className:"tw-h-4 tw-w-4",src:"https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg",alt:"Markdown icon"}),e.jsx(a,{children:e.jsx(x,{anchorTarget:"_blank",className:"tw-mb-1 tw-max-w-none tw-font-medium tw-leading-none tw-tracking-tight",markdown:"[Markdown Support](https://www.markdownguide.org/cheat-sheet/)"})}),e.jsx(s,{children:e.jsx(x,{anchorTarget:"_blank",className:"tw-max-w-none tw-text-sm",markdown:"You can put a **markdown editor** in the *title* and *description*!\n- To match the markdown title with the original title, add `tw-max-w-none tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight` to the `MarkdownRenderer` class.\n- To match the markdown description with the normal description, add `tw-max-w-none tw-text-sm` to the `MarkdownRenderer` class."})})]}),parameters:{docs:{description:{story:"An alert demonstrating markdown content support in both title and description."}}}},h={render:()=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs(r,{children:[e.jsx(Z,{className:"tw-h-4 tw-w-4"}),e.jsx(a,{children:"Info"}),e.jsx(s,{children:"This is an informational alert."})]}),e.jsxs(r,{variant:"destructive",children:[e.jsx($,{className:"tw-h-4 tw-w-4"}),e.jsx(a,{children:"Error"}),e.jsx(s,{children:"This is an error alert."})]}),e.jsxs(r,{children:[e.jsx(ee,{className:"tw-h-4 tw-w-4"}),e.jsx(a,{children:"Success"}),e.jsx(s,{children:"This looks like a success alert (using default variant)."})]})]}),parameters:{docs:{description:{story:"A showcase of different alert styles with various icons and purposes."}}}},u={render:t=>e.jsxs(r,{...t,children:[e.jsx(f,{className:"tw-h-4 tw-w-4"}),e.jsx(a,{children:"Interactive Alert"}),e.jsx(s,{children:"Use the controls panel to experiment with different variants and properties."})]}),args:{variant:"default"},parameters:{docs:{description:{story:"An interactive alert where you can test different properties using the controls."}}}};var v,y,k;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="tw-h-4 tw-w-4" />
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
}`,...(k=(y=o.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};var j,T,N;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <Alert {...args} variant="destructive">
      <AlertCircle className="tw-h-4 tw-w-4" />
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
}`,...(N=(T=c.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var D,b,S;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="tw-h-4 tw-w-4" />
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
}`,...(S=(b=l.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var C,I,M;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <img className="tw-h-4 tw-w-4" src="https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg" alt="Wifi icon" />
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
}`,...(M=(I=d.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var _,R,W;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(W=(R=m.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var Y,O,V;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <Alert {...args}>Alert! With nothing else in it, this looks like a Card 🤔</Alert>,
  parameters: {
    docs: {
      description: {
        story: 'An alert with just plain text content.'
      }
    }
  }
}`,...(V=(O=p.parameters)==null?void 0:O.docs)==null?void 0:V.source}}};var q,E,H;w.parameters={...w.parameters,docs:{...(q=w.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <img className="tw-h-4 tw-w-4" src="https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg" alt="Markdown icon" />
      <AlertTitle>
        <MarkdownRenderer anchorTarget="_blank" className="tw-mb-1 tw-max-w-none tw-font-medium tw-leading-none tw-tracking-tight" markdown="[Markdown Support](https://www.markdownguide.org/cheat-sheet/)" />
      </AlertTitle>
      <AlertDescription>
        <MarkdownRenderer anchorTarget="_blank" className="tw-max-w-none tw-text-sm" markdown={\`You can put a **markdown editor** in the *title* and *description*!\\n- To match the markdown title with the original title, add \\\`tw-max-w-none tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight\\\` to the \\\`MarkdownRenderer\\\` class.\\n- To match the markdown description with the normal description, add \\\`tw-max-w-none tw-text-sm\\\` to the \\\`MarkdownRenderer\\\` class.\`} />
      </AlertDescription>
    </Alert>,
  parameters: {
    docs: {
      description: {
        story: 'An alert demonstrating markdown content support in both title and description.'
      }
    }
  }
}`,...(H=(E=w.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var U,z,G;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-4">
      <Alert>
        <Info className="tw-h-4 tw-w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational alert.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircle className="tw-h-4 tw-w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error alert.</AlertDescription>
      </Alert>

      <Alert>
        <CheckCircle2 className="tw-h-4 tw-w-4" />
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
}`,...(G=(z=h.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var X,B,L;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="tw-h-4 tw-w-4" />
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
}`,...(L=(B=u.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};const ue=["Default","Destructive","DescriptionOnly","WithImageIcon","ContentOnly","TextOnly","WithMarkdown","VariantsShowcase","Interactive"];export{m as ContentOnly,o as Default,l as DescriptionOnly,c as Destructive,u as Interactive,p as TextOnly,h as VariantsShowcase,d as WithImageIcon,w as WithMarkdown,ue as __namedExportsOrder,he as default};
