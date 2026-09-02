import{r as i,j as t}from"./iframe-DInutuwa.js";import{E as b,h as H,e as y}from"./editor-utils-BwS7Sd05.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-ByAqTkNa.js";import"./tooltip-B9duP8Qq.js";import"./utils-BPbySc-g.js";import"./button-d-vGTRwO.js";import"./index-BnuTq2W6.js";import"./index-DppzcPFK.js";import"./z-index-bJLdNcga.js";import"./index-DoVBmhjw.js";import"./index-7RkYLgwz.js";import"./index-Bkq6BRHv.js";import"./index-CN9-0arl.js";import"./index-DH8Vqtm9.js";import"./index-DkNC0Np5.js";import"./index-LQSgDJ_B.js";import"./index-DshlUElr.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CNLY0Z2l.js";import"./index-Cl8VBXls.js";import"./index-CIa-whw0.js";import"./dialog-r0PFTBPI.js";import"./createReactComponent-CJ7pOCWk.js";import"./index-BOoNn5Cy.js";import"./index-BOL8JYvB.js";import"./toggle-group-Bd1p4Bsq.js";import"./index-ByKUdsOF.js";import"./index-CK2uEbXY.js";import"./italic-Q01QTJ_m.js";import"./createLucideIcon-BnKlZKnL.js";const{fn:N}=__STORYBOOK_MODULE_TEST__,st={title:"Advanced/Editor",component:b,tags:["autodocs"],decorators:[o=>t.jsx("div",{className:"tw:max-w-2xl tw:bg-background tw:p-4",children:t.jsx(o,{})})],argTypes:{placeholder:{control:"text"}},args:{onClear:N()}},r={args:{placeholder:"Start typing..."}},s={args:{placeholder:"Enter your comment here..."}},e={render:()=>{const o='<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>',[S,f]=i.useState(H(o)),[T,v]=i.useState(""),E=a=>{f(a),v(y(a))};return t.jsxs("div",{className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Editor with Pre-populated HTML Content"}),t.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"The editor below is populated with HTML that has been converted to editor format. You can edit it, and see the HTML output below."})]}),t.jsx("div",{className:"tw:rounded-md tw:border tw:border-border",children:t.jsx(b,{editorSerializedState:S,onSerializedChange:E,placeholder:"Type something..."})}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h4",{className:"tw:text-sm tw:font-semibold",children:"HTML Output:"}),t.jsx("p",{className:"tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs",children:T||"(Edit the content above to see HTML output)"})]}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h4",{className:"tw:text-sm tw:font-semibold",children:"Original HTML Input:"}),t.jsx("p",{className:"tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs",children:o})]})]})}};var d,n,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
Editor State → (user edits) → Editor State → HTML`,...(x=(g=e.parameters)==null?void 0:g.docs)==null?void 0:x.description}}};const at=["Default","WithCustomPlaceholder","WithHtmlContent"];export{r as Default,s as WithCustomPlaceholder,e as WithHtmlContent,at as __namedExportsOrder,st as default};
