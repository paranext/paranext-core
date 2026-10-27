import{j as i}from"./iframe-DSF-sE21.js";import{R as se,D as C}from"./LexicalTable.prod-BKFTjeeb.js";import{P as le,a as he,b as ue}from"./popover-DHb_CALr.js";import{F as me}from"./footnote-list.component-BZNqU7bd.js";import{u as we}from"./footnotes.usj.data-DFswq0yG.js";import"./usj-nodes-l0sNRNKZ.js";import{F as v}from"./footnote-editor.component-BEPWY4Sa.js";import{t as fe,e as ie,s as pe,a as ce,b as de}from"./footnote-editor.fixtures-T5aBjThr.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./portal-container.context-zc3RAMtC.js";import"./z-index-DiGYIwoM.js";import"./index-CrfySvbl.js";import"./index-BTOqpVf0.js";import"./index-BS0UHk5Z.js";import"./index-DKdHS9Sq.js";import"./index-DMHHbBu_.js";import"./index-C94P7jMl.js";import"./index-Dc8VmIz8.js";import"./index-DRPJdift.js";import"./index-Db7iKQGb.js";import"./index-DUFRVWww.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DIV1PhVJ.js";import"./index-BWdpzvs_.js";import"./separator-Bni30KaJ.js";import"./index-aWm5KcgP.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./footnote-item.component-Be7RAY1v.js";import"./circle-alert-CCaQ0Hgq.js";import"./createLucideIcon-CB5cpmGN.js";import"./button-B9Ub8haq.js";import"./index-BnuTq2W6.js";import"./button-group-VXa4dweP.js";import"./cancel-accept-buttons.component-BuWvtoRc.js";import"./tooltip-ofDMAzdk.js";import"./index-DN9yueCy.js";import"./x-CAOe1Mmg.js";import"./check-DHQy8kar.js";import"./marker-menu.component-DCrsdmSP.js";import"./command-HyxLAQX3.js";import"./index-C_oaX4Cl.js";import"./dialog-nNzDIL_z.js";import"./createReactComponent-DK9R2Iqe.js";import"./input-group-DdJfOvQi.js";import"./input-jCw7W7LY.js";import"./IconCheck-CAJAOFgL.js";import"./platform.util-Dj487_od.js";import"./undo-redo-buttons.component-DbjbxzHi.js";import"./shortcut-keys.component-BTCnoRxA.js";import"./kbd-CCQkRm9_.js";import"./dropdown-menu-5ivRNWqm.js";import"./menu.context-Ckqexq6m.js";import"./IconChevronRight-41MestBT.js";import"./index-CxzsIhxQ.js";import"./index-Cjk6BwNS.js";import"./square-x-W0vgUXXl.js";import"./copy-CMdp--jk.js";const{expect:o,userEvent:y,waitFor:T,within:ge}=__STORYBOOK_MODULE_TEST__;function k(){const e=document.querySelector(".editor-input");return e==null?void 0:e.__lexicalEditor}function x(e){return e.getEditorState().read(()=>se().getChildrenSize())}function E(e){return e.getEditorState().read(()=>{const t=[],r=n=>{if(n.getType()==="char"){const s=n;typeof s.getMarker=="function"&&t.push(s.getMarker())}C(n)&&n.getChildren().forEach(r)},a=se().getChildren().flatMap(n=>C(n)?n.getChildren():[]).find(n=>n.getType()==="note");return a&&C(a)&&a.getChildren().forEach(r),t})}async function c(){await T(()=>o(k()).toBeTruthy(),{timeout:4e3}),await new Promise(r=>{setTimeout(r,400)});const e=document.querySelector(".editor-input"),t=k();if(!(e instanceof HTMLElement)||!t)throw new Error("note editor did not mount");return{editorInput:e,lexical:t}}function M(e){e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0,cancelable:!0}))}const Rt={title:"Advanced/FootnoteEditor",component:v,tags:["test"]};function g({noteOps:e=[ce],contentClassName:t="tw:w-max tw:min-w-[500px]"}){return i.jsxs(le,{open:!0,children:[i.jsx(he,{className:"tw:absolute",style:{top:120,left:120}}),i.jsx(ue,{className:`${t} tw:p-[10px]`,children:i.jsx(v,{noteOps:e,onClose:()=>{},scrRef:pe,noteKey:void 0,editorOptions:{view:ie},defaultMarkerMenuTrigger:"\\",localizedStrings:de()})})]})}function ye(){return i.jsx("div",{className:"tw:flex tw:h-[300px] tw:w-[700px] tw:flex-col tw:bg-sidebar tw:pb-0 tw:pl-2 tw:pr-0 tw:pt-2",children:i.jsx(me,{listId:"inline-pane",layout:"horizontal",footnotes:we,showMarkers:!0,formatCaller:e=>e,editingFootnoteIndex:1,renderEditingFootnote:()=>i.jsx(v,{inline:!0,noteOps:[ce],onClose:()=>{},scrRef:pe,noteKey:void 0,editorOptions:{view:ie},defaultMarkerMenuTrigger:"\\",localizedStrings:de()})})})}function xe(){const e=document.querySelector('li[data-state="editing"]');if(!(e instanceof HTMLElement))throw new Error("editing row not found");return e}function B(){var p,d;const e=document.querySelector(".footnote-editor");if(!(e instanceof HTMLElement))throw new Error("footnote editor not found");const t=ge(e),r=t.getByRole("button",{name:/Auto-generated/}),a=t.getByRole("button",{name:"Undo"}),n=(p=r.parentElement)==null?void 0:p.parentElement;if(!n)throw new Error("toolbar row not found");const s=(d=r.parentElement)==null?void 0:d.querySelector("button");if(!s)throw new Error("note-type dropdown not found");return{scope:t,noteType:s.getBoundingClientRect(),caller:r.getBoundingClientRect(),undo:a.getBoundingClientRect(),row:n.getBoundingClientRect()}}const l={render:()=>i.jsx(ye,{}),play:async()=>{await c();const{caller:e,undo:t,row:r}=B();o(t.left-e.right).toBeLessThan(40),o(r.right-t.right).toBeGreaterThan(100);const a=xe(),n=document.querySelectorAll('li[role="option"]');n[0].focus(),await y.tab(),o(a.contains(document.activeElement)).toBe(!0),n[1].focus(),await y.tab({shift:!0}),o(a.contains(document.activeElement)).toBe(!0)}},h={render:()=>i.jsx(g,{}),play:async()=>{await c();const{scope:e,noteType:t,caller:r,undo:a,row:n}=B();o(Math.abs(r.top-t.top)).toBeLessThan(1),o(a.left-r.right).toBeGreaterThan(40);const s=e.getByRole("button",{name:"Save footnote"}).getBoundingClientRect();o(s.right).toBeGreaterThan(a.right),o(n.right-s.right).toBeLessThan(4)}},u={render:()=>i.jsx(g,{contentClassName:"tw:w-[270px]"}),play:async()=>{await c();const{caller:e,noteType:t}=B();o(Math.abs(e.top-t.top)).toBeLessThan(1)}},m={render:()=>i.jsx(g,{}),play:async()=>{const{editorInput:e,lexical:t}=await c();o(x(t)).toBe(1),o(E(t)).not.toContain("fp"),e.focus(),await y.keyboard("{Enter}"),await T(()=>o(E(t)).toContain("fp")),o(x(t)).toBe(1)}},w={render:()=>i.jsx(g,{noteOps:[fe]}),play:async()=>{const{editorInput:e}=await c(),t=e.querySelector("span.note");if(!t)throw new Error("expanded note span not found");o(t.classList.contains("expanded")).toBe(!0);const r=t.querySelector("span.usfm_ft"),a=t.querySelectorAll("span.usfm_fp");if(!r)throw new Error("\\ft span not found");o(a).toHaveLength(2);const n=r.getBoundingClientRect(),s=a[0].getBoundingClientRect(),p=a[1].getBoundingClientRect();o(s.top).toBeGreaterThan(n.top),o(p.top).toBeGreaterThan(s.top);const d=t.querySelector('span.closing[data-marker="f"]');if(!d)throw new Error("\\f* closer glyph not found");const R=d.getBoundingClientRect();o(R.top).toBeLessThan(p.bottom),o(R.bottom).toBeGreaterThan(p.top),o(e.textContent).not.toContain(`
`),await y.pointer({keys:"[MouseLeft]",target:a[1]}),await T(()=>{const b=document.getSelection(),S=b==null?void 0:b.anchorNode;o(S&&a[1].contains(S)).toBe(!0)})}},f={render:()=>i.jsx(g,{}),play:async()=>{const{editorInput:e,lexical:t}=await c(),r=e.ownerDocument;(()=>{e.focus();const n=r.getSelection();if(!n)throw new Error("no DOM selection available");const s=r.createRange();s.setStart(e,0),s.collapse(!0),n.removeAllRanges(),n.addRange(s)})(),M(e),await new Promise(n=>{setTimeout(n,40)}),o(x(t)).toBe(1),o(E(t)).not.toContain("fp"),M(e),await T(()=>o(E(t)).toContain("fp")),o(x(t)).toBe(1)}};var N,L,F,P,I;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <FootnotesPaneHost />,
  play: async () => {
    await waitForNoteEditor();
    const {
      caller,
      undo,
      row
    } = measureToolbar();

    // Undo starts just past the caller dropdown - one gap, not a gulf.
    expect(undo.left - caller.right).toBeLessThan(40);
    // And the cluster stays at the start of the row rather than riding its trailing edge.
    expect(row.right - undo.right).toBeGreaterThan(100);

    // The editing row takes its turn in the tab order where the note it replaced sat: tabbing
    // forward off the row above it, and backward off the row below it, both land inside it.
    const editingRow = getEditingRow();
    const rows = document.querySelectorAll<HTMLElement>('li[role="option"]');
    rows[0].focus();
    await userEvent.tab();
    expect(editingRow.contains(document.activeElement)).toBe(true);
    rows[1].focus();
    await userEvent.tab({
      shift: true
    });
    expect(editingRow.contains(document.activeElement)).toBe(true);
  }
}`,...(F=(L=l.parameters)==null?void 0:L.docs)==null?void 0:F.source},description:{story:`In the pane the editor is one row among the notes and the row is as wide as the pane, so the
undo/redo pair joins the note-type and caller dropdowns in a single cluster instead of being
pushed to the far end away from them. Also pins the tab handoff the row swap depends on: Tab
reaches the editing row's controls at the position that row occupies in the list, from either
direction.`,...(I=(P=l.parameters)==null?void 0:P.docs)==null?void 0:I.description}}};var O,A,D,j,q;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <PopoverHost />,
  play: async () => {
    await waitForNoteEditor();
    const {
      scope,
      noteType,
      caller,
      undo,
      row
    } = measureToolbar();

    // Both dropdowns on one line (at a width where wrapping would split them, see
    // \`NarrowPopoverKeepsTheDropdownsTogether\`).
    expect(Math.abs(caller.top - noteType.top)).toBeLessThan(1);
    // Clearly separated from the caller dropdown, not clustered with it.
    expect(undo.left - caller.right).toBeGreaterThan(40);
    // And the group it leads runs out to the end of the row, with Save last.
    const save = scope.getByRole('button', {
      name: 'Save footnote'
    }).getBoundingClientRect();
    expect(save.right).toBeGreaterThan(undo.right);
    expect(row.right - save.right).toBeLessThan(4);
  }
}`,...(D=(A=h.parameters)==null?void 0:A.docs)==null?void 0:D.source},description:{story:`The popover is sized to its own content and carries Cancel/Save, so it keeps the opposite
arrangement: undo/redo sit with those two at the end of the toolbar row, well clear of the caller
dropdown. The contrast with the story above is what makes each layout falsifiable - moving the
buttons on either surface breaks exactly one of the two.`,...(q=(j=h.parameters)==null?void 0:j.docs)==null?void 0:q.description}}};var G,H,_,K,U;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <PopoverHost contentClassName="tw:w-[270px]" />,
  play: async () => {
    await waitForNoteEditor();
    const {
      caller,
      noteType
    } = measureToolbar();
    expect(Math.abs(caller.top - noteType.top)).toBeLessThan(1);
  }
}`,...(_=(H=u.parameters)==null?void 0:H.docs)==null?void 0:_.source},description:{story:`The popover's minimum width gives way to a narrow pane or a zoomed pop-up, so the toolbar row can
be far narrower than the default story's. There the note-type and caller dropdowns must still
share a line: only the inline editor's cluster wraps.`,...(U=(K=u.parameters)==null?void 0:K.docs)==null?void 0:U.description}}};var W,z,Y,$,J;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <PopoverHost />,
  play: async () => {
    const {
      editorInput,
      lexical
    } = await waitForNoteEditor();
    expect(rootChildCount(lexical)).toBe(1);
    expect(noteCharMarkers(lexical)).not.toContain('fp');
    editorInput.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(noteCharMarkers(lexical)).toContain('fp'));

    // Enter inserted a footnote paragraph inside the note; the wrapper para was not split.
    expect(rootChildCount(lexical)).toBe(1);
  }
}`,...(Y=(z=m.parameters)==null?void 0:z.docs)==null?void 0:Y.source},description:{story:"Happy path: opening a new-note popover and pressing Enter inserts a footnote paragraph (`\\fp`)\ninside the note and does NOT split the wrapper paragraph. Pre-fix, the DOM caret parked by\nRadix's open-autofocus left Enter splitting the wrapper instead.",...(J=($=m.parameters)==null?void 0:$.docs)==null?void 0:J.description}}};var V,Q,X,Z,ee;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <PopoverHost noteOps={[twoFpNoteOp]} />,
  play: async () => {
    const {
      editorInput
    } = await waitForNoteEditor();
    const note = editorInput.querySelector('span.note');
    if (!note) throw new Error('expanded note span not found');
    expect(note.classList.contains('expanded')).toBe(true);
    const ft = note.querySelector('span.usfm_ft');
    const fps = note.querySelectorAll('span.usfm_fp');
    if (!ft) throw new Error('\\\\ft span not found');
    expect(fps).toHaveLength(2);

    // Each \\fp starts a NEW visual line: strictly increasing line tops from \\ft to each \\fp.
    const ftRect = ft.getBoundingClientRect();
    const fp1Rect = fps[0].getBoundingClientRect();
    const fp2Rect = fps[1].getBoundingClientRect();
    expect(fp1Rect.top).toBeGreaterThan(ftRect.top);
    expect(fp2Rect.top).toBeGreaterThan(fp1Rect.top);

    // The note's \\f* closer glyph shares the last \\fp's line (vertical bands overlap) — the
    // break mechanism must keep the \\fp spans inline rather than turning them into blocks.
    const closer = note.querySelector('span.closing[data-marker="f"]');
    if (!closer) throw new Error('\\\\f* closer glyph not found');
    const closerRect = closer.getBoundingClientRect();
    expect(closerRect.top).toBeLessThan(fp2Rect.bottom);
    expect(closerRect.bottom).toBeGreaterThan(fp2Rect.top);

    // The line breaks are generated content only — no newline character exists in the DOM text.
    expect(editorInput.textContent).not.toContain('\\n');

    // Click targeting: clicking the second \\fp's text parks the caret inside that span.
    await userEvent.pointer({
      keys: '[MouseLeft]',
      target: fps[1]
    });
    await waitFor(() => {
      const selection = document.getSelection();
      const anchorNode = selection?.anchorNode;
      expect(anchorNode && fps[1].contains(anchorNode)).toBe(true);
    });
  }
}`,...(X=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:X.source},description:{story:"Each `\\fp` (footnote paragraph) must DISPLAY like a paragraph start — its span begins on a new\nvisual line — while the note stays one inline run in the data (no newline in the DOM text, USJ,\nor USFM). The break comes from a `::before { content: '\\A' }` generated line break in\neditor-overrides.css, so this needs a real layout engine: jsdom computes no line boxes. Also pins\nthat the mechanism keeps the spans inline: the `\\f*` closer glyph stays on the SAME line as the\nlast `\\fp`'s content (a `display: block` approach would push it to its own line), and that a\nclick inside an `\\fp` still lands the caret in that span (the pseudo-element is not in the DOM,\nso it can't capture the caret).",...(ee=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:ee.description}}};var te,oe,ne,re,ae;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <PopoverHost />,
  play: async () => {
    const {
      editorInput,
      lexical
    } = await waitForNoteEditor();
    const doc = editorInput.ownerDocument;

    // Park the DOM caret at the wrapper-para start (outside span.note) and focus the editor — the
    // exact precondition Radix's open-autofocus creates.
    const parkCaretAtWrapperStart = () => {
      editorInput.focus();
      const selection = doc.getSelection();
      if (!selection) throw new Error('no DOM selection available');
      const range = doc.createRange();
      range.setStart(editorInput, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    };
    parkCaretAtWrapperStart();
    dispatchEnter(editorInput);
    await new Promise(resolve => {
      setTimeout(resolve, 40);
    });

    // First Enter was claimed by the guard: no wrapper split and no \`\\fp\` inserted yet.
    expect(rootChildCount(lexical)).toBe(1);
    expect(noteCharMarkers(lexical)).not.toContain('fp');

    // Second Enter, now with the caret routed into the note, inserts the footnote paragraph.
    dispatchEnter(editorInput);
    await waitFor(() => expect(noteCharMarkers(lexical)).toContain('fp'));
    expect(rootChildCount(lexical)).toBe(1);
  }
}`,...(ne=(oe=f.parameters)==null?void 0:oe.docs)==null?void 0:ne.source},description:{story:"The host Enter-guard's contract, reproduced deterministically against real Lexical: with the DOM\ncaret parked OUTSIDE the note content (the state Radix's open-autofocus produces), the guard\nCLAIMS the first Enter and reroutes the caret into the note (no `\\fp` inserted on that press);\nthe second Enter — now with the caret inside — reaches Lexical's `$handleEnterInNote` and inserts\nthe `\\fp`. Falsifiable: temporarily disabling the guard makes that first Enter reach the engine\ndirectly and insert `\\fp` immediately, failing the `not.toContain('fp')` assertion (verified).\nThe wrapper is never split either way — the engine's own KEY_ENTER fix prevents that\nindependently — so this story isolates the host guard's claim-and-reroute behavior.",...(ae=(re=f.parameters)==null?void 0:re.docs)==null?void 0:ae.description}}};const St=["InlineToolbarGroupsUndoRedoWithTheDropdowns","PopoverToolbarKeepsUndoRedoAtTheEnd","NarrowPopoverKeepsTheDropdownsTogether","EnterInsertsFootnoteParagraph","FootnoteParagraphsRenderOnNewLines","EnterWithCaretParkedOutsideNoteIsGuarded"];export{m as EnterInsertsFootnoteParagraph,f as EnterWithCaretParkedOutsideNoteIsGuarded,w as FootnoteParagraphsRenderOnNewLines,l as InlineToolbarGroupsUndoRedoWithTheDropdowns,u as NarrowPopoverKeepsTheDropdownsTogether,h as PopoverToolbarKeepsUndoRedoAtTheEnd,St as __namedExportsOrder,Rt as default};
