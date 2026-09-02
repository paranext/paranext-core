import{j as s}from"./iframe-Aki_My0G.js";import{R as j,D as g}from"./LexicalTable.prod-Bxq4f96r.js";import{P as H,c as K,b as U}from"./popover-DLwycyVF.js";import{F as G}from"./footnote-editor.component-DgqeRR13.js";import{H as W}from"./index-DWoQdr4d.js";import{a as Y}from"./cancel-accept-buttons.component-zhf2Rx-9.js";import{a as z}from"./undo-redo-buttons.component-DWj_f3Wt.js";import{a as J}from"./marker-menu.component-Dx0JHWSZ.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./z-index-bJLdNcga.js";import"./index-dDtVLQ9G.js";import"./index-1v5Tr8B7.js";import"./index-B3zql-RX.js";import"./index-DQeZTMHr.js";import"./index-BvyFfcUf.js";import"./index-B-4iVfEK.js";import"./index-B7f-WFSQ.js";import"./index-CtHoJRkb.js";import"./index-HU0OeD_E.js";import"./index-BvTdP7jg.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DuR8RoD4.js";import"./index-VrB1t4Rj.js";import"./button-Bb70_rXO.js";import"./index-BnuTq2W6.js";import"./button-group-Be6vPm4H.js";import"./separator-BvWS9jcP.js";import"./tooltip-5sXY_sS5.js";import"./index-CGGOmS9d.js";import"./platform.util-Dj487_od.js";import"./dropdown-menu-Cug-h7GI.js";import"./menu.context-K_ezdJzB.js";import"./IconCheck-CYD_Ffbe.js";import"./createReactComponent-BPYMTuyS.js";import"./IconChevronRight-3b-n0B91.js";import"./index-CoCXFnRV.js";import"./index-Dh0_JDZ5.js";import"./input-CgvXAimX.js";import"./createLucideIcon-BVOJaIDX.js";import"./scripture-util-CUueoNBU-BtWINhWV.js";import"./index.es-LuWhpyxP.js";import"./index-DCo3rgjq.js";import"./copy-B5kKOGaJ.js";import"./index-C77E7Q-s.js";import"./x-JZjGZsDJ.js";import"./check-_BODhQWt.js";import"./kbd-D4W4Mc_e.js";import"./index-D8rZSbDD.js";import"./command-BB2-nWai.js";import"./index-3GjXWm87.js";import"./dialog-CK9kNES7.js";import"./input-group-BbUM2Gik.js";const V=Object.freeze([...J,...Object.entries(W).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...z,...Y]);function $(){const t=V.map(e=>[e,e]);return Object.fromEntries(t)}const Q={book:"GEN",chapterNum:1,verseNum:1,verse:"1"},X={insert:{note:{style:"f",caller:"+",contents:{ops:[{insert:"1:1 ",attributes:{char:{style:"fr",closed:"false"}}},{insert:"sentinel note text",attributes:{char:{style:"ft",closed:"false"}}}]}}}},Z={insert:{note:{style:"f",caller:"+",contents:{ops:[{insert:"1:1 ",attributes:{char:{style:"fr",closed:"false"}}},{insert:"first paragraph ",attributes:{char:{style:"ft",closed:"false"}}},{insert:"second paragraph ",attributes:{char:{style:"fp",closed:"false",cid:"fp-1"}}},{insert:"third paragraph",attributes:{char:{style:"fp",closed:"false",cid:"fp-2"}}}]}}}},tt={markerMode:"editable",hasSpacing:!0,isFormattedFont:!0},{expect:n,userEvent:q,waitFor:h}=__STORYBOOK_MODULE_TEST__;function C(){const t=document.querySelector(".editor-input");return t==null?void 0:t.__lexicalEditor}function d(t){return t.getEditorState().read(()=>j().getChildrenSize())}function f(t){return t.getEditorState().read(()=>{const e=[],r=o=>{if(o.getType()==="char"){const i=o;typeof i.getMarker=="function"&&e.push(i.getMarker())}g(o)&&o.getChildren().forEach(r)},a=j().getChildren().flatMap(o=>g(o)?o.getChildren():[]).find(o=>o.getType()==="note");return a&&g(a)&&a.getChildren().forEach(r),e})}async function w(){await h(()=>n(C()).toBeTruthy(),{timeout:4e3}),await new Promise(r=>{setTimeout(r,400)});const t=document.querySelector(".editor-input"),e=C();if(!(t instanceof HTMLElement)||!e)throw new Error("popover editor did not mount");return{editorInput:t,lexical:e}}function S(t){t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0,cancelable:!0}))}const te={title:"Advanced/FootnoteEditor",component:G,tags:["test"]};function E({noteOps:t=[X]}){return s.jsxs(H,{open:!0,children:[s.jsx(K,{className:"tw:absolute",style:{top:120,left:120}}),s.jsx(U,{className:"tw:w-max tw:min-w-[500px] tw:p-[10px]",children:s.jsx(G,{noteOps:t,onClose:()=>{},scrRef:Q,noteKey:void 0,editorOptions:{view:tt},defaultMarkerMenuTrigger:"\\",localizedStrings:$()})})]})}const p={render:()=>s.jsx(E,{}),play:async()=>{const{editorInput:t,lexical:e}=await w();n(d(e)).toBe(1),n(f(e)).not.toContain("fp"),t.focus(),await q.keyboard("{Enter}"),await h(()=>n(f(e)).toContain("fp")),n(d(e)).toBe(1)}},c={render:()=>s.jsx(E,{noteOps:[Z]}),play:async()=>{const{editorInput:t}=await w(),e=t.querySelector("span.note");if(!e)throw new Error("expanded note span not found");n(e.classList.contains("expanded")).toBe(!0);const r=e.querySelector("span.usfm_ft"),a=e.querySelectorAll("span.usfm_fp");if(!r)throw new Error("\\ft span not found");n(a).toHaveLength(2);const o=r.getBoundingClientRect(),i=a[0].getBoundingClientRect(),u=a[1].getBoundingClientRect();n(i.top).toBeGreaterThan(o.top),n(u.top).toBeGreaterThan(i.top);const y=e.querySelector('span.closing[data-marker="f"]');if(!y)throw new Error("\\f* closer glyph not found");const x=y.getBoundingClientRect();n(x.top).toBeLessThan(u.bottom),n(x.bottom).toBeGreaterThan(u.top),n(t.textContent).not.toContain(`
`),await q.pointer({keys:"[MouseLeft]",target:a[1]}),await h(()=>{const m=document.getSelection(),_=m==null?void 0:m.anchorNode;n(_&&a[1].contains(_)).toBe(!0)})}},l={render:()=>s.jsx(E,{}),play:async()=>{const{editorInput:t,lexical:e}=await w(),r=t.ownerDocument;(()=>{t.focus();const o=r.getSelection();if(!o)throw new Error("no DOM selection available");const i=r.createRange();i.setStart(t,0),i.collapse(!0),o.removeAllRanges(),o.addRange(i)})(),S(t),await new Promise(o=>{setTimeout(o,40)}),n(d(e)).toBe(1),n(f(e)).not.toContain("fp"),S(t),await h(()=>n(f(e)).toContain("fp")),n(d(e)).toBe(1)}};var R,b,T,k,v;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <PopoverHost />,
  play: async () => {
    const {
      editorInput,
      lexical
    } = await waitForPopover();
    expect(rootChildCount(lexical)).toBe(1);
    expect(noteCharMarkers(lexical)).not.toContain('fp');
    editorInput.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(noteCharMarkers(lexical)).toContain('fp'));

    // Enter inserted a footnote paragraph inside the note; the wrapper para was not split.
    expect(rootChildCount(lexical)).toBe(1);
  }
}`,...(T=(b=p.parameters)==null?void 0:b.docs)==null?void 0:T.source},description:{story:"Happy path: opening a new-note popover and pressing Enter inserts a footnote paragraph (`\\fp`)\ninside the note and does NOT split the wrapper paragraph. Pre-fix, the DOM caret parked by\nRadix's open-autofocus left Enter splitting the wrapper instead.",...(v=(k=p.parameters)==null?void 0:k.docs)==null?void 0:v.description}}};var O,B,N,M,I;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <PopoverHost noteOps={[twoFpNoteOp]} />,
  play: async () => {
    const {
      editorInput
    } = await waitForPopover();
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
}`,...(N=(B=c.parameters)==null?void 0:B.docs)==null?void 0:N.source},description:{story:"Each `\\fp` (footnote paragraph) must DISPLAY like a paragraph start — its span begins on a new\nvisual line — while the note stays one inline run in the data (no newline in the DOM text, USJ,\nor USFM). The break comes from a `::before { content: '\\A' }` generated line break in\neditor-overrides.css, so this needs a real layout engine: jsdom computes no line boxes. Also pins\nthat the mechanism keeps the spans inline: the `\\f*` closer glyph stays on the SAME line as the\nlast `\\fp`'s content (a `display: block` approach would push it to its own line), and that a\nclick inside an `\\fp` still lands the caret in that span (the pseudo-element is not in the DOM,\nso it can't capture the caret).",...(I=(M=c.parameters)==null?void 0:M.docs)==null?void 0:I.description}}};var P,D,F,L,A;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <PopoverHost />,
  play: async () => {
    const {
      editorInput,
      lexical
    } = await waitForPopover();
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
}`,...(F=(D=l.parameters)==null?void 0:D.docs)==null?void 0:F.source},description:{story:"The host Enter-guard's contract, reproduced deterministically against real Lexical: with the DOM\ncaret parked OUTSIDE the note content (the state Radix's open-autofocus produces), the guard\nCLAIMS the first Enter and reroutes the caret into the note (no `\\fp` inserted on that press);\nthe second Enter — now with the caret inside — reaches Lexical's `$handleEnterInNote` and inserts\nthe `\\fp`. Falsifiable: temporarily disabling the guard makes that first Enter reach the engine\ndirectly and insert `\\fp` immediately, failing the `not.toContain('fp')` assertion (verified).\nThe wrapper is never split either way — the engine's own KEY_ENTER fix prevents that\nindependently — so this story isolates the host guard's claim-and-reroute behavior.",...(A=(L=l.parameters)==null?void 0:L.docs)==null?void 0:A.description}}};const ee=["EnterInsertsFootnoteParagraph","FootnoteParagraphsRenderOnNewLines","EnterWithCaretParkedOutsideNoteIsGuarded"];export{p as EnterInsertsFootnoteParagraph,l as EnterWithCaretParkedOutsideNoteIsGuarded,c as FootnoteParagraphsRenderOnNewLines,ee as __namedExportsOrder,te as default};
