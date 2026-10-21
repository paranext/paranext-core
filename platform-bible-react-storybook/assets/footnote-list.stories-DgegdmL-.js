import{r as u,j as e}from"./iframe-CQzJ-cS1.js";import{F as x}from"./footnote-list.component-BQORNdWl.js";import{U as re}from"./index-DQIETk9w.js";import"./usj-nodes-l0sNRNKZ.js";import{R as ne,a as b,b as se}from"./resizable-CmgOEwgl.js";import{u as s}from"./footnotes.usj.data-BkjIEbHS.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./separator-5q5XrTBW.js";import"./index-CG0k3Y-P.js";import"./index-CDJHyqHQ.js";import"./footnote-item.component-gTzwjRgl.js";import"./circle-alert-DDo6sQgt.js";import"./createLucideIcon-B8y_kOv6.js";import"./index.es-CXoS8DB2.js";import"./index-DDt_EViq.js";import"./index-Cn7xqC4M.js";const{expect:i,userEvent:Z,waitFor:R,within:ee}=__STORYBOOK_MODULE_TEST__,ke={title:"Advanced/FootnoteList",component:x,tags:["autodocs"],decorators:[o=>e.jsx("div",{className:"tw:h-[300px] tw:overflow-hidden tw:border tw:border-slate-300 tw:p-4",children:e.jsx(o,{})})],argTypes:{layout:{control:{type:"radio"},options:["horizontal","vertical"]}}};function l({footnotes:o=[],listId:r="default-list-id",...n}={}){const[t,a]=u.useState();return e.jsx(x,{...n,footnotes:o,listId:r,selectedFootnote:t,onFootnoteSelected:y=>a(y)})}function te({footnotes:o=[],listId:r="default-list-id",showMarkers:n,...t}={}){const[a,y]=u.useState();return e.jsxs(ne,{direction:t.layout==="horizontal"?"vertical":"horizontal",className:"tw:h-full tw:min-h-0 tw:w-full",children:[e.jsx(b,{className:"tw:flex tw:min-h-0 tw:flex-col",children:e.jsx("div",{className:"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col",children:e.jsxs("p",{children:[e.jsx("sup",{children:"11"}),"In the beginning",n?e.jsx("span",{className:"tw:text-blue-400",children:"\\f + \\fr 1.11 \\fr* This is a simple footnote \\f"}):e.jsx("sup",{children:"a"}),"..."]})})}),e.jsxs(e.Fragment,{children:[e.jsx(se,{}),e.jsx(b,{defaultSize:39,className:"tw:flex tw:min-h-0 tw:flex-col tw:bg-sidebar tw:pb-0 tw:pl-2 tw:pr-0 tw:pt-2",minSize:15,maxSize:85,children:e.jsx("div",{className:"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col",children:e.jsx(l,{...t,footnotes:o,listId:r,selectedFootnote:a,showMarkers:n,onFootnoteSelected:oe=>y(oe)})})})]})]})}const m={render:l,args:{footnotes:s,listId:"storybook-Basic",showMarkers:!1,layout:"horizontal"}},d={render:l,args:{footnotes:s,listId:"storybook-KeyboardFocusRing",showMarkers:!1,layout:"horizontal"},play:async({canvasElement:o})=>{const[r]=ee(o).getAllByRole("option");await Z.tab(),i(document.activeElement).toBe(r),i(r.matches(":focus-visible")).toBe(!0);const n=getComputedStyle(r).boxShadow.split(/,(?![^(]*\))/).map(t=>t.trim()).filter(t=>!/0px 0px 0px 0px( inset)?$/.test(t));i(n.length).toBeGreaterThan(0),i(n.filter(t=>!/\binset\b/.test(t))).toEqual([])}},h={render:l,args:{footnotes:s,listId:"storybook-WithCustomCallerFormatting",showMarkers:!0,layout:"horizontal",formatCaller:re(s,["†","‡","⁂","★","☆"])}},w={render:l,args:{footnotes:s,listId:"storybook-Raw",showMarkers:!0,layout:"horizontal",formatCaller:o=>o}},c={render:l,args:{footnotes:s,listId:"storybook-EditingRow",showMarkers:!1,layout:"horizontal",editingFootnoteIndex:1,renderEditingFootnote:(o,r)=>e.jsx("div",{className:"tw:rounded-[6px] tw:border-2 tw:border-ring tw:p-2 tw:text-sm",children:`Host-supplied editor for note ${r+1} (\\${o.marker})`})}};function ae({index:o}){const[r,n]=u.useState(!1);return u.useEffect(()=>{const t=setTimeout(()=>n(!0),150);return()=>clearTimeout(t)},[]),e.jsx("div",{className:"tw:rounded-[6px] tw:border-2 tw:border-ring tw:p-2 tw:text-sm",style:{height:r?180:40},children:`Editor for note ${o+1}`})}function ie(o={}){const[r,n]=u.useState(s.length-1);return e.jsxs("div",{className:"tw:flex tw:h-full tw:flex-col",children:[e.jsx("button",{type:"button",onClick:()=>n(0),children:"Edit the first note"}),e.jsx("div",{className:"tw:min-h-0 tw:flex-1",children:e.jsx(x,{...o,footnotes:s,listId:"storybook-EditingRowRevealed",editingFootnoteIndex:r,renderEditingFootnote:(t,a)=>e.jsx(ae,{index:a},a)})})]})}function E(o,r){const n=o.getBoundingClientRect(),t=r.getBoundingClientRect();return n.top>=t.top-.5&&n.bottom<=t.bottom+.5}const p={render:ie,args:{showMarkers:!1,layout:"horizontal"},play:async({canvasElement:o})=>{const r=ee(o),n=r.getByRole("listbox"),t=()=>{const a=n.querySelector('[data-state="editing"]');if(!a)throw new Error("no editing row");return a};await R(()=>{i(t().getBoundingClientRect().height).toBeGreaterThan(180),i(E(t(),n)).toBe(!0)}),await Z.click(r.getByRole("button",{name:"Edit the first note"})),await R(()=>{i(t().textContent).toContain("Editor for note 1"),i(t().getBoundingClientRect().height).toBeGreaterThan(180),i(E(t(),n)).toBe(!0)})}},g={render:te,args:{footnotes:s,listId:"storybook-Formatted",showMarkers:!1,layout:"vertical"}},f={render:te,args:{footnotes:s,listId:"storybook-ShowMarkers",showMarkers:!0,layout:"vertical",formatCaller:o=>o}};var F,v,k;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false,
    layout: 'horizontal'
  }
}`,...(k=(v=m.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var S,j,T,B,C;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-KeyboardFocusRing',
    showMarkers: false,
    layout: 'horizontal'
  },
  play: async ({
    canvasElement
  }) => {
    const [firstRow] = within(canvasElement).getAllByRole('option');
    await userEvent.tab();
    expect(document.activeElement).toBe(firstRow);
    expect(firstRow.matches(':focus-visible')).toBe(true);

    // Tailwind composes a ring from several \`box-shadow\` layers, most of them zero-size
    // placeholders. Split on the commas BETWEEN layers, not the ones inside a color function.
    const paintedLayers = getComputedStyle(firstRow).boxShadow.split(/,(?![^(]*\\))/).map(layer => layer.trim()).filter(layer => !/0px 0px 0px 0px( inset)?$/.test(layer));
    // A ring is painted at all ...
    expect(paintedLayers.length).toBeGreaterThan(0);
    // ... and every painted layer is inset, so none of it lies outside the row box.
    expect(paintedLayers.filter(layer => !/\\binset\\b/.test(layer))).toEqual([]);
  }
}`,...(T=(j=d.parameters)==null?void 0:j.docs)==null?void 0:T.source},description:{story:`A row reached from the keyboard shows its focus ring INSIDE the row. The list scrolls, and a
scrolling element clips anything its rows paint past its edges, so a ring drawn outside the row
would lose its sides.`,...(C=(B=d.parameters)==null?void 0:B.docs)==null?void 0:C.description}}};var I,z,M;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-WithCustomCallerFormatting',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: getFormatCallerFunction(usjFootnotes, ['†', '‡', '⁂', '★', '☆'])
  }
}`,...(M=(z=h.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var N,G,L;w.parameters={...w.parameters,docs:{...(N=w.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: caller => caller
  }
}`,...(L=(G=w.parameters)==null?void 0:G.docs)==null?void 0:L.source}}};var W,_,$,q,O;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-EditingRow',
    showMarkers: false,
    layout: 'horizontal',
    editingFootnoteIndex: 1,
    renderEditingFootnote: (footnote, index) => <div className="tw:rounded-[6px] tw:border-2 tw:border-ring tw:p-2 tw:text-sm">
        {\`Host-supplied editor for note \${index + 1} (\\\\\${footnote.marker})\`}
      </div>
  }
}`,...($=(_=c.parameters)==null?void 0:_.docs)==null?void 0:$.source},description:{story:"One row swapped for a host-supplied editor, via `editingFootnoteIndex` + `renderEditingFootnote`.\nThe row keeps its place in the list and is tinted as the entry being edited, and Tab reaches the\neditor's own controls at that position rather than skipping past the row.\n\nThe stand-in below is deliberately not the real footnote editor: this list's contract is only\nthat it renders whatever node the host returns, in that note's place. For the real editor in this\nslot, see the `InlineToolbarGroupsUndoRedoWithTheDropdowns` story under\n`Advanced/FootnoteEditor`.",...(O=(q=c.parameters)==null?void 0:q.docs)==null?void 0:O.description}}};var A,K,P,U,D;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: EditingRowRevealTemplate,
  args: {
    showMarkers: false,
    layout: 'horizontal'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('listbox');
    const editingRow = () => {
      const row = list.querySelector('[data-state="editing"]');
      if (!row) throw new Error('no editing row');
      return row;
    };
    await waitFor(() => {
      expect(editingRow().getBoundingClientRect().height).toBeGreaterThan(180);
      expect(isWhollyInside(editingRow(), list)).toBe(true);
    });
    await userEvent.click(canvas.getByRole('button', {
      name: 'Edit the first note'
    }));
    await waitFor(() => {
      expect(editingRow().textContent).toContain('Editor for note 1');
      expect(editingRow().getBoundingClientRect().height).toBeGreaterThan(180);
      expect(isWhollyInside(editingRow(), list)).toBe(true);
    });
  }
}`,...(P=(K=p.parameters)==null?void 0:K.docs)==null?void 0:P.source},description:{story:`The row being edited is brought wholly into view when editing starts on it - also once the editor
inside it has loaded and grown, and when editing moves to another row.`,...(D=(U=p.parameters)==null?void 0:U.docs)==null?void 0:D.description}}};var H,Y,J;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Formatted',
    showMarkers: false,
    layout: 'vertical'
  }
}`,...(J=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var Q,V,X;f.parameters={...f.parameters,docs:{...(Q=f.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-ShowMarkers',
    showMarkers: true,
    layout: 'vertical',
    formatCaller: caller => caller
  }
}`,...(X=(V=f.parameters)==null?void 0:V.docs)==null?void 0:X.source}}};const Se=["Basic","KeyboardFocusRing","WithCustomCallerFormatting","Raw","EditingRow","EditingRowRevealed","Formatted","ShowMarkers"];export{m as Basic,c as EditingRow,p as EditingRowRevealed,g as Formatted,d as KeyboardFocusRing,w as Raw,f as ShowMarkers,h as WithCustomCallerFormatting,Se as __namedExportsOrder,ke as default};
