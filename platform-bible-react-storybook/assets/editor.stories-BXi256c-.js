import{r as i,j as t}from"./iframe-CxpMZWA4.js";import{E as b,h as H,e as y}from"./editor-utils-C8DJRbWF.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-DzlThnNN.js";import"./tooltip-D-_P5wgZ.js";import"./utils-BPbySc-g.js";import"./button-lwB-upNX.js";import"./index-BnuTq2W6.js";import"./index-DjNjy7Lo.js";import"./z-index-DiGYIwoM.js";import"./portal-container.context-hMA5Z4Gm.js";import"./index-CslBAX4M.js";import"./index-DeLg4VWN.js";import"./index-BjTVqp3Y.js";import"./index-U9613mwl.js";import"./index-rco7ndv8.js";import"./index-BogaXmxi.js";import"./index-DiAd_Eld.js";import"./index-CafQSZJZ.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-C3GYpelw.js";import"./index-aQ0eCFje.js";import"./index-Bu4iRImk.js";import"./dialog-dJcICQB9.js";import"./createReactComponent-rbsJghO4.js";import"./index-CV1-rLhd.js";import"./index-C9Xdqlpk.js";import"./toggle-group-Bwe_0Hh8.js";import"./index-ZAp1KI2K.js";import"./index-Et3xAuYZ.js";import"./italic-KwI2AnD3.js";import"./createLucideIcon-yVnZ8r52.js";import"./content-zoom-text.context-DeRAFWt9.js";const{fn:N}=__STORYBOOK_MODULE_TEST__,it={title:"Advanced/Editor",component:b,tags:["autodocs"],decorators:[o=>t.jsx("div",{className:"tw:max-w-2xl tw:bg-background tw:p-4",children:t.jsx(o,{})})],argTypes:{placeholder:{control:"text"}},args:{onClear:N()}},r={args:{placeholder:"Start typing..."}},s={args:{placeholder:"Enter your comment here..."}},e={render:()=>{const o='<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>',[S,f]=i.useState(H(o)),[T,v]=i.useState(""),E=a=>{f(a),v(y(a))};return t.jsxs("div",{className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Editor with Pre-populated HTML Content"}),t.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"The editor below is populated with HTML that has been converted to editor format. You can edit it, and see the HTML output below."})]}),t.jsx("div",{className:"tw:rounded-md tw:border tw:border-border",children:t.jsx(b,{editorSerializedState:S,onSerializedChange:E,placeholder:"Type something..."})}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h4",{className:"tw:text-sm tw:font-semibold",children:"HTML Output:"}),t.jsx("p",{className:"tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs",children:T||"(Edit the content above to see HTML output)"})]}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h4",{className:"tw:text-sm tw:font-semibold",children:"Original HTML Input:"}),t.jsx("p",{className:"tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs",children:o})]})]})}};var d,n,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    placeholder: 'Start typing...'
  }
}`,...(l=(n=r.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var m,c,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your comment here...'
  }
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var h,u,w,g,x;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
    return <div className="tw:space-y-4">
        <div className="tw:space-y-2">
          <h3 className="tw:text-lg tw:font-semibold">Editor with Pre-populated HTML Content</h3>
          <p className="tw:text-sm tw:text-muted-foreground">
            The editor below is populated with HTML that has been converted to editor format. You
            can edit it, and see the HTML output below.
          </p>
        </div>
        <div className="tw:rounded-md tw:border tw:border-border">
          <Editor editorSerializedState={editorState} onSerializedChange={handleChange} placeholder="Type something..." />
        </div>
        <div className="tw:space-y-2">
          <h4 className="tw:text-sm tw:font-semibold">HTML Output:</h4>
          <p className="tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs">
            {htmlOutput || '(Edit the content above to see HTML output)'}
          </p>
        </div>
        <div className="tw:space-y-2">
          <h4 className="tw:text-sm tw:font-semibold">Original HTML Input:</h4>
          <p className="tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs">
            {originalHtml}
          </p>
        </div>
      </div>;
  }
}`,...(w=(u=e.parameters)==null?void 0:u.docs)==null?void 0:w.source},description:{story:`This story demonstrates the Editor component being populated with HTML content that has been
converted to the editor's internal format. This shows the full round-trip conversion: HTML →
Editor State → (user edits) → Editor State → HTML`,...(x=(g=e.parameters)==null?void 0:g.docs)==null?void 0:x.description}}};const dt=["Default","WithCustomPlaceholder","WithHtmlContent"];export{r as Default,s as WithCustomPlaceholder,e as WithHtmlContent,dt as __namedExportsOrder,it as default};
