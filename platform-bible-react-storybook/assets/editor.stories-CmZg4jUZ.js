import{r as i,j as t}from"./iframe-Cjd8K6rr.js";import{E as b,h as H,e as y}from"./editor-utils-KbgWgW0r.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-DzYIC6sd.js";import"./tooltip-DRb5cZ9y.js";import"./utils-BPbySc-g.js";import"./button-BkthGOlw.js";import"./index-BnuTq2W6.js";import"./index-OQ8ICDmY.js";import"./z-index-CoNkaVR8.js";import"./index-DT0Bnqsr.js";import"./index-DNEhF5dt.js";import"./index-Crlv5ps3.js";import"./index-BGy_Epmr.js";import"./index-EAadaIyr.js";import"./index-CFLZB9Uz.js";import"./index-Biq7eL06.js";import"./index-CpnI_z9g.js";import"./index-B6IQxoVU.js";import"./index-DlnHB-Wj.js";import"./index-ajjszFiV.js";import"./dialog-DfTFndGr.js";import"./createReactComponent-BpEgrW-_.js";import"./index-C_ZiM-ez.js";import"./index-BCcntoC3.js";import"./toggle-group-BFP3K9_l.js";import"./index-CG7as3er.js";import"./index-D4hl755m.js";import"./italic-C1f-xyMK.js";import"./createLucideIcon-By4T22Hz.js";const{fn:N}=__STORYBOOK_MODULE_TEST__,rt={title:"Advanced/Editor",component:b,tags:["autodocs"],decorators:[o=>t.jsx("div",{className:"tw:max-w-2xl tw:bg-background tw:p-4",children:t.jsx(o,{})})],argTypes:{placeholder:{control:"text"}},args:{onClear:N()}},r={args:{placeholder:"Start typing..."}},s={args:{placeholder:"Enter your comment here..."}},e={render:()=>{const o='<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>',[S,f]=i.useState(H(o)),[T,v]=i.useState(""),E=a=>{f(a),v(y(a))};return t.jsxs("div",{className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Editor with Pre-populated HTML Content"}),t.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"The editor below is populated with HTML that has been converted to editor format. You can edit it, and see the HTML output below."})]}),t.jsx("div",{className:"tw:rounded-md tw:border tw:border-border",children:t.jsx(b,{editorSerializedState:S,onSerializedChange:E,placeholder:"Type something..."})}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h4",{className:"tw:text-sm tw:font-semibold",children:"HTML Output:"}),t.jsx("p",{className:"tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs",children:T||"(Edit the content above to see HTML output)"})]}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h4",{className:"tw:text-sm tw:font-semibold",children:"Original HTML Input:"}),t.jsx("p",{className:"tw:overflow-x-auto tw:rounded-md tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-xs",children:o})]})]})}};var d,n,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
Editor State → (user edits) → Editor State → HTML`,...(x=(g=e.parameters)==null?void 0:g.docs)==null?void 0:x.description}}};const st=["Default","WithCustomPlaceholder","WithHtmlContent"];export{r as Default,s as WithCustomPlaceholder,e as WithHtmlContent,st as __namedExportsOrder,rt as default};
