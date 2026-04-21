import{j as t}from"./jsx-runtime-7eNCgUAa.js";import{r as i}from"./iframe-CYFq18C6.js";import{T as H}from"./theme-provider.component-DGtZWidA.js";import{E as b,h as y,e as N}from"./editor-utils-Dq0-Ls_-.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-BFBdhBl9.js";import"./index-CMSUoF7B.js";import"./index-TWCD4B01.js";import"./tooltip-jRxxArB0.js";import"./index-DTAXz6r9.js";import"./index-D8ajtxer.js";import"./index-Bns5XpWP.js";import"./index-CgREmPeT.js";import"./index-CS4LosYl.js";import"./index-BWcirV2a.js";import"./index-DwImD94U.js";import"./floating-ui.react-dom-C0bYBFTY.js";import"./index-pHFji2xB.js";import"./index-DvIYHHW7.js";import"./index-BfopVIcW.js";import"./index-DLo8dUx5.js";import"./index-BIYzcUAZ.js";import"./index-D3K67bMc.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./button-CdrllqyM.js";import"./index-BPbCuWFR.js";import"./z-index-B4JyHfu5.js";import"./dialog-39KBTz71.js";import"./index-knnq9pQ-.js";import"./index-Cg2shgCH.js";import"./x-Bm1pv9vg.js";import"./createLucideIcon-CZyv5WDD.js";import"./toggle-group-DUw0tKb3.js";import"./index-_aLxcAqE.js";import"./index--0fVmrWw.js";import"./index-BYkFWaGr.js";import"./italic-JXbfi79F.js";const{fn:k}=__STORYBOOK_MODULE_TEST__,pt={title:"Advanced/Editor",component:b,tags:["autodocs"],decorators:[o=>t.jsx(H,{children:t.jsx("div",{className:"tw-max-w-2xl tw-bg-background tw-p-4",children:t.jsx(o,{})})})],argTypes:{placeholder:{control:"text"}},args:{onClear:k()}},r={args:{placeholder:"Start typing..."}},s={args:{placeholder:"Enter your comment here..."}},e={render:()=>{const o='<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>',[S,f]=i.useState(y(o)),[T,v]=i.useState(""),E=a=>{f(a),v(N(a))};return t.jsxs("div",{className:"tw-space-y-4",children:[t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Editor with Pre-populated HTML Content"}),t.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"The editor below is populated with HTML that has been converted to editor format. You can edit it, and see the HTML output below."})]}),t.jsx("div",{className:"tw-rounded-md tw-border tw-border-border",children:t.jsx(b,{editorSerializedState:S,onSerializedChange:E,placeholder:"Type something..."})}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h4",{className:"tw-text-sm tw-font-semibold",children:"HTML Output:"}),t.jsx("p",{className:"tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs",children:T||"(Edit the content above to see HTML output)"})]}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h4",{className:"tw-text-sm tw-font-semibold",children:"Original HTML Input:"}),t.jsx("p",{className:"tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs",children:o})]})]})}};var d,n,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    placeholder: 'Start typing...'
  }
}`,...(l=(n=r.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var m,p,c;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your comment here...'
  }
}`,...(c=(p=s.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var h,u,w,x,g;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const originalHtml = \`<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>\`;
    // Storybook render functions don't look like React components, so hooks must be called with this disable
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editorState, setEditorState] = useState<SerializedEditorState>(htmlToEditorState(originalHtml));
    // Storybook render functions don't look like React components, so hooks must be called with this disable
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [htmlOutput, setHtmlOutput] = useState<string>('');
    const handleChange = (newState: SerializedEditorState) => {
      setEditorState(newState);
      setHtmlOutput(editorStateToHtml(newState));
    };
    return <div className="tw-space-y-4">
        <div className="tw-space-y-2">
          <h3 className="tw-text-lg tw-font-semibold">Editor with Pre-populated HTML Content</h3>
          <p className="tw-text-sm tw-text-muted-foreground">
            The editor below is populated with HTML that has been converted to editor format. You
            can edit it, and see the HTML output below.
          </p>
        </div>
        <div className="tw-rounded-md tw-border tw-border-border">
          <Editor editorSerializedState={editorState} onSerializedChange={handleChange} placeholder="Type something..." />
        </div>
        <div className="tw-space-y-2">
          <h4 className="tw-text-sm tw-font-semibold">HTML Output:</h4>
          <p className="tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs">
            {htmlOutput || '(Edit the content above to see HTML output)'}
          </p>
        </div>
        <div className="tw-space-y-2">
          <h4 className="tw-text-sm tw-font-semibold">Original HTML Input:</h4>
          <p className="tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs">
            {originalHtml}
          </p>
        </div>
      </div>;
  }
}`,...(w=(u=e.parameters)==null?void 0:u.docs)==null?void 0:w.source},description:{story:`This story demonstrates the Editor component being populated with HTML content that has been
converted to the editor's internal format. This shows the full round-trip conversion: HTML →
Editor State → (user edits) → Editor State → HTML`,...(g=(x=e.parameters)==null?void 0:x.docs)==null?void 0:g.description}}};const ct=["Default","WithCustomPlaceholder","WithHtmlContent"];export{r as Default,s as WithCustomPlaceholder,e as WithHtmlContent,ct as __namedExportsOrder,pt as default};
