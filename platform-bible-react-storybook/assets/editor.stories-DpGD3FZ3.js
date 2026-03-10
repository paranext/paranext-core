import{j as t}from"./jsx-runtime-0n10FHbf.js";import{r as i}from"./iframe-CrA6hLjd.js";import{T as H}from"./theme-provider.component-EJf0MO_U.js";import{E as b,h as N,e as y}from"./editor-utils-Be7USBhP.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-BG616GnA.js";import"./index-JsiFs-1C.js";import"./index-BwPvjrzS.js";import"./tooltip-t2In_JZq.js";import"./index-DTAXz6r9.js";import"./index-C-euXnQ_.js";import"./index-CQ3ZZfds.js";import"./index-Hm4JIHjh.js";import"./index-CztYIw5n.js";import"./index-DhziNXYZ.js";import"./index-LhGV0FVu.js";import"./floating-ui.react-dom-CgjoH1Zw.js";import"./index-DeQzfF6i.js";import"./index-BI-xLmJE.js";import"./index-_Tv5pBjX.js";import"./index-6oGVmBbU.js";import"./index-DpWuK4cO.js";import"./index-D6V8voRD.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./button-D-EhjlNU.js";import"./index-BPbCuWFR.js";import"./dialog-DHn4lceu.js";import"./index-DzBmFdrM.js";import"./index-Bh1weZxB.js";import"./x-BBT-GwrH.js";import"./createLucideIcon-DgczJKdr.js";import"./toggle-group-CnUTkpGe.js";import"./index-CwaU9oCg.js";import"./index-BTa3HrhZ.js";import"./index-XnAP8DkX.js";import"./italic-Cj-rwGqC.js";const{fn:j}=__STORYBOOK_MODULE_TEST__,mt={title:"Advanced/Editor",component:b,tags:["autodocs"],decorators:[o=>t.jsx(H,{children:t.jsx("div",{className:"tw-max-w-2xl tw-bg-background tw-p-4",children:t.jsx(o,{})})})],argTypes:{placeholder:{control:"text"}},args:{onClear:j()}},r={args:{placeholder:"Start typing..."}},a={args:{placeholder:"Enter your comment here..."}},e={render:()=>{const o='<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p><p>This is a <color name="red">paragraph</color> with some <language name="es-015-vaidika">Paratext</language> <strikethrough>specific</strikethrough> tags</p>',[S,f]=i.useState(N(o)),[T,v]=i.useState(""),E=s=>{f(s),v(y(s))};return t.jsxs("div",{className:"tw-space-y-4",children:[t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Editor with Pre-populated HTML Content"}),t.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"The editor below is populated with HTML that has been converted to editor format. You can edit it, and see the HTML output below."})]}),t.jsx("div",{className:"tw-rounded-md tw-border tw-border-border",children:t.jsx(b,{editorSerializedState:S,onSerializedChange:E,placeholder:"Type something..."})}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h4",{className:"tw-text-sm tw-font-semibold",children:"HTML Output:"}),t.jsx("p",{className:"tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs",children:T||"(Edit the content above to see HTML output)"})]}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("h4",{className:"tw-text-sm tw-font-semibold",children:"Original HTML Input:"}),t.jsx("p",{className:"tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs",children:o})]})]})}};var d,n,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
Editor State → (user edits) → Editor State → HTML`,...(g=(x=e.parameters)==null?void 0:x.docs)==null?void 0:g.description}}};const pt=["Default","WithCustomPlaceholder","WithHtmlContent"];export{r as Default,a as WithCustomPlaceholder,e as WithHtmlContent,pt as __namedExportsOrder,mt as default};
