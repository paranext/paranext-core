import{j as t}from"./jsx-runtime-B0mj53Uj.js";import{r as i}from"./iframe-9Zhl2CkU.js";import{T as H}from"./theme-provider.component-DjAzKAD4.js";import{E as b,h as N,e as y}from"./editor-utils-Ck1wrZKV.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-CkmWXpv9.js";import"./index-zIv3hLbJ.js";import"./index-eZTIp-nj.js";import"./tooltip-6RIbarFp.js";import"./index-DTAXz6r9.js";import"./index-Cn-FdYao.js";import"./index-Dj-VCL0K.js";import"./index-D-ktTNAQ.js";import"./index-BxWNdA6r.js";import"./index-BUTdLPnK.js";import"./index-BtLdhcm0.js";import"./floating-ui.react-dom-CwX0otsg.js";import"./index-BcL1YFU6.js";import"./index-w3Oj2mU8.js";import"./index-Ch6-ikge.js";import"./index-BLg3_FZ3.js";import"./index-CGUQXvUO.js";import"./index-BmiXKKsm.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-BYDdLLMh.js";import"./index-DxfOTCbt.js";import"./index-CO0yGGT5.js";import"./x-BlhA8cFy.js";import"./createLucideIcon-D4vYydla.js";import"./toggle-group-BK3iq1N0.js";import"./index-DyBgsuyh.js";import"./index-BSPEc8l8.js";import"./index-BWKubMEI.js";import"./index-BPbCuWFR.js";import"./underline-B_emDaRO.js";const{fn:j}=__STORYBOOK_MODULE_TEST__,lt={title:"Advanced/Editor",component:b,tags:["autodocs"],decorators:[o=>t.jsx(H,{children:t.jsx("div",{className:"tw-max-w-2xl tw-bg-background tw-p-4",children:t.jsx(o,{})})})],argTypes:{placeholder:{control:"text"}},args:{onClear:j()}},r={args:{placeholder:"Start typing..."}},a={args:{placeholder:"Enter your comment here..."}},e={render:()=>{const o='<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>',[S,f]=i.useState(N(o)),[T,v]=i.useState(""),E=s=>{f(s),v(y(s))};return t.jsxs("div",{className:"tw-space-y-4",children:[t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Editor with Pre-populated HTML Content"}),t.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"The editor below is populated with HTML that has been converted to editor format. You can edit it, and see the HTML output below."})]}),t.jsx("div",{className:"tw-rounded-md tw-border tw-border-border",children:t.jsx(b,{editorSerializedState:S,onSerializedChange:E,placeholder:"Type something..."})}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h4",{className:"tw-text-sm tw-font-semibold",children:"HTML Output:"}),t.jsx("p",{className:"tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs",children:T||"(Edit the content above to see HTML output)"})]}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h4",{className:"tw-text-sm tw-font-semibold",children:"Original HTML Input:"}),t.jsx("p",{className:"tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs",children:o})]})]})}};var d,n,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    placeholder: 'Start typing...'
  }
}`,...(l=(n=r.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var m,p,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your comment here...'
  }
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var h,u,w,x,g;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const originalHtml = \`<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>\`;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editorState, setEditorState] = useState<SerializedEditorState>(htmlToEditorState(originalHtml));
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
Editor State → (user edits) → Editor State → HTML`,...(g=(x=e.parameters)==null?void 0:x.docs)==null?void 0:g.description}}};const mt=["Default","WithCustomPlaceholder","WithHtmlContent"];export{r as Default,a as WithCustomPlaceholder,e as WithHtmlContent,mt as __namedExportsOrder,lt as default};
