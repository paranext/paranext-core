import{j as u}from"./iframe-D69FfaBZ.js";import{M as te}from"./marker-menu.component-B5_BSIEp.js";import{c as ee}from"./createLucideIcon-STXHUi6D.js";import{C as g}from"./clipboard-paste-mw4Vl_yy.js";import"./preload-helper-CTOgD26E.js";import"./command-DiOE0XVn.js";import"./index-SQrsNanv.js";import"./index-DTW5rNb6.js";import"./index-MkZ1XHNt.js";import"./index-ChCBGGyQ.js";import"./index-DuvD4cei.js";import"./index-Dz20dyaK.js";import"./index-DiQkJZ5U.js";import"./index-lUbuAXv8.js";import"./index-CdQT6yDR.js";import"./index-BMMwc6Mi.js";import"./index-CbyQ4SmH.js";import"./utils-BPbySc-g.js";import"./dialog-D_ae75Wc.js";import"./z-index-CoNkaVR8.js";import"./button-D_c3RBk2.js";import"./index-BnuTq2W6.js";import"./createReactComponent-B7HB1DAY.js";import"./input-group-BoxH-AKM.js";import"./input-PuFqaSV4.js";import"./IconCheck-BH0eKxue.js";import"./check-H4_N9GaM.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",key:"g5wo59"}],["path",{d:"m5.082 11.09 8.828 8.828",key:"1wx5vj"}]],y=ee("eraser",ae);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"M4 7V4h16v3",key:"9msm58"}],["path",{d:"M5 20h6",key:"1h6pxn"}],["path",{d:"M13 4 8 20",key:"kqq6aj"}],["path",{d:"m15 15 5 5",key:"me55sn"}],["path",{d:"m20 15-5 5",key:"11p7ol"}]],ne=ee("remove-formatting",re),{expect:w,fn:e}=__STORYBOOK_MODULE_TEST__,se={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},Be={title:"Advanced/MarkerMenu",component:te,tags:["autodocs","test"],parameters:{docs:{description:{component:"A searchable list of markers (and marker-like commands) for the scripture editor. Rows can carry a selection state (how much of the current selection the marker covers), a disabled state (the consumer has no operation for the row right now), and the marker-level deprecated/disallowed states."}}},decorators:[t=>u.jsx("div",{className:"tw:w-80 tw:rounded-md tw:border tw:border-border",children:u.jsx(t,{})})],args:{localizedStrings:se}},k=[{marker:"bd",title:"Bold",subtitle:"A character style, use bold text",action:e()},{marker:"it",title:"Italic",subtitle:"A character style, use italic text",action:e()},{marker:"nd",title:"Name of God",subtitle:"For name of deity",action:e()},{icon:y,title:"Remove character style",action:e()}],r={args:{markerMenuItems:k},parameters:{docs:{description:{story:"The inert/legacy case: no item supplies `selectionState`, so no selection affordance renders and no `aria-checked` is set. Consumers that do not track a selection see exactly the rows they saw before the affordance existed."}}}},n={args:{markerMenuItems:k.map(t=>({...t,selectionState:"all"}))},parameters:{docs:{description:{story:'Every row covers the whole selection: a check, and `aria-checked="true"`.'}}}},s={args:{markerMenuItems:k.map(t=>({...t,selectionState:"partial"}))},parameters:{docs:{description:{story:'Every row covers part of the selection. Visually identical to `all` — a checked row means "on the selection" — while `aria-checked="mixed"` preserves the distinction for screen readers.'}}}},o={args:{markerMenuItems:k.map(t=>({...t,selectionState:"none"}))},parameters:{docs:{description:{story:"No row is on the selection. The indicator renders empty but still reserves its width, so rows stay aligned with the checked ones."}}}},i={args:{markerMenuItems:[{marker:"bd",title:"Bold",subtitle:"A character style, use bold text",selectionState:"all",action:e()},{marker:"it",title:"Italic",subtitle:"A character style, use italic text",selectionState:"partial",action:e()},{marker:"nd",title:"Name of God",subtitle:"For name of deity",selectionState:"none",action:e()},{marker:"wj",title:"Words of Jesus",subtitle:"For marking the words of Jesus",action:e()},{icon:y,title:"Remove character style",selectionState:"none",action:e()}]},parameters:{docs:{description:{story:"The realistic case: `all`, `partial`, and `none` alongside a row with no `selectionState` at all (Words of Jesus), which renders no indicator and shifts left."}}}},l={args:{markerMenuItems:[{marker:"bd",title:"Bold",subtitle:"A character style, use bold text",selectionState:"all",action:e()},{marker:"it",title:"Italic",subtitle:"A character style, use italic text",selectionState:"none",isDisabled:!0,action:e()},{icon:y,title:"Remove character style",selectionState:"none",isDisabled:!0,action:e()}]},parameters:{docs:{description:{story:"`isDisabled` says the consumer has no operation for the row right now (e.g. nothing to remove). The row stays listed and renders no trailing label — unlike deprecated and disallowed, it describes the moment, not the marker."}}}},c={args:{markerMenuItems:[{marker:"bd",title:"Bold",subtitle:"A character style, use bold text",selectionState:"none",action:e()},{marker:"pro",title:"Pronunciation",subtitle:"For indicating pronunciation in CJK texts",isDeprecated:!0,action:e()},{marker:"q",title:"Poetry",subtitle:'Only reachable by searching for "q" or "Poetry"',isDisallowed:!0,action:e()}]},play:async({canvas:t,userEvent:b,step:a})=>{await a('Search for the disallowed "Poetry" (q) marker',async()=>{const f=t.getByPlaceholderText("Type a style or search.");await b.type(f,"q")}),await a("Verify the disallowed marker is revealed, disabled, with its badge",async()=>{const f=await t.findByRole("option",{name:/Poetry/});await w(f).toHaveAttribute("aria-disabled","true"),await w(t.getByText("Disallowed")).toBeInTheDocument()})},parameters:{docs:{description:{story:"Deprecated items stay visible but disabled with a trailing label. Disallowed items are hidden while the query is empty (because allowed items exist) — type `q` or `Poetry` to reveal the disallowed row, which also renders disabled."}}}},d={args:{markerMenuItems:[{marker:"q",title:"Poetry",isDisallowed:!0,action:e()},{marker:"q1",title:"Poetry level 1",isDisallowed:!0,action:e()},{marker:"q2",title:"Poetry level 2",isDisallowed:!0,action:e()}]},parameters:{docs:{description:{story:'When every item is disallowed the menu shows them (disabled) rather than reading as an empty "No results" state.'}}}},m={decorators:[t=>u.jsx("div",{className:"tw:w-[200px] tw:rounded-md tw:border tw:border-border",children:u.jsx(t,{})})],args:{searchPlaceholder:"Search character markers",markerMenuItems:[{marker:"addpn",title:"Addition with proper name, dot underline",subtitle:"For Chinese words to be dot underline & underline",selectionState:"all",action:e()},{marker:"qt",title:"Quoted text — Old Testament quotation in the New Testament",subtitle:"Old Testament quotations in the New Testament",selectionState:"partial",action:e()},{icon:y,title:"Remove all character styles from the selection",selectionState:"none",isDisabled:!0,action:e()}]},parameters:{docs:{description:{story:"At the 200px width consumers pin the popover to, long titles and subtitles truncate rather than wrap, per the Responsiveness guideline. Hover a row to see the full text."}}}},h={args:{searchPlaceholder:"Search character markers",markerMenuItems:[{icon:ne,title:"Remove character marker",action:e()},{marker:"bd",title:"Bold",subtitle:"A character style, use bold text",action:e()},{marker:"nd",title:"Name of God",subtitle:"For name of deity",action:e()}]},play:async({canvas:t,step:b})=>{await b("Verify the remove row renders first and is selectable",async()=>{const a=await t.findAllByRole("option");await w(a[0]).toHaveTextContent("Remove character marker"),await w(a[0]).not.toHaveAttribute("aria-disabled","true")})},parameters:{docs:{description:{story:'The character-marker menu leads with a remove row: an icon-and-title command row with no marker code, which takes the character marker off the selected text and leaves the text itself in place. It appears only while a character marker is applied to the selection. `MarkerMenu` does no sorting of its own — it renders `markerMenuItems` in the order given, so the consumer is the one that puts the remove row ahead of the marker rows and sorts those by marker code.\n\nNote that the row\'s icon must be passed explicitly. With `icon` absent, `MarkerMenu` falls back to a `Ban` glyph, which reads as "disallowed" rather than "remove" in a menu that already renders a disallowed affordance.'}}}},p={args:{searchPlaceholder:"Search to change paragraph style.",markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:e()},{icon:g,title:"Paste",action:e()},{icon:g,title:"Paste as plaintext",action:e()},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",isDisallowed:!0,action:e()},{marker:"ph",title:"Indented paragraph with hanging indent",isDeprecated:!0,action:e()}]},parameters:{docs:{description:{story:"The paragraph-marker surface, which is what the other stories do not show: paragraph markers whose subtitles carry the indent level, and more than one non-marker command row (the two paste commands) rather than a single remove row. It also passes the paragraph menu's own `searchPlaceholder` instead of the generic one — type `pi` to reveal the disallowed row."}}}};var v,S,x;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    markerMenuItems: legacyItems
  },
  parameters: {
    docs: {
      description: {
        story: 'The inert/legacy case: no item supplies \`selectionState\`, so no selection affordance ' + 'renders and no \`aria-checked\` is set. Consumers that do not track a selection see ' + 'exactly the rows they saw before the affordance existed.'
      }
    }
  }
}`,...(x=(S=r.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var I,M,P;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    markerMenuItems: legacyItems.map(item => ({
      ...item,
      selectionState: 'all' as const
    }))
  },
  parameters: {
    docs: {
      description: {
        story: 'Every row covers the whole selection: a check, and \`aria-checked="true"\`.'
      }
    }
  }
}`,...(P=(M=n.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var D,T,A;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    markerMenuItems: legacyItems.map(item => ({
      ...item,
      selectionState: 'partial' as const
    }))
  },
  parameters: {
    docs: {
      description: {
        story: 'Every row covers part of the selection. Visually identical to \`all\` — a checked row ' + 'means "on the selection" — while \`aria-checked="mixed"\` preserves the distinction for ' + 'screen readers.'
      }
    }
  }
}`,...(A=(T=s.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var q,R,N;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    markerMenuItems: legacyItems.map(item => ({
      ...item,
      selectionState: 'none' as const
    }))
  },
  parameters: {
    docs: {
      description: {
        story: 'No row is on the selection. The indicator renders empty but still reserves its width, ' + 'so rows stay aligned with the checked ones.'
      }
    }
  }
}`,...(N=(R=o.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};var B,C,_;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    markerMenuItems: [{
      marker: 'bd',
      title: 'Bold',
      subtitle: 'A character style, use bold text',
      selectionState: 'all',
      action: fn()
    }, {
      marker: 'it',
      title: 'Italic',
      subtitle: 'A character style, use italic text',
      selectionState: 'partial',
      action: fn()
    }, {
      marker: 'nd',
      title: 'Name of God',
      subtitle: 'For name of deity',
      selectionState: 'none',
      action: fn()
    }, {
      marker: 'wj',
      title: 'Words of Jesus',
      subtitle: 'For marking the words of Jesus',
      action: fn()
    }, {
      icon: Eraser,
      title: 'Remove character style',
      selectionState: 'none',
      action: fn()
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'The realistic case: \`all\`, \`partial\`, and \`none\` alongside a row with no ' + '\`selectionState\` at all (Words of Jesus), which renders no indicator and shifts left.'
      }
    }
  }
}`,...(_=(C=i.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var E,F,j;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    markerMenuItems: [{
      marker: 'bd',
      title: 'Bold',
      subtitle: 'A character style, use bold text',
      selectionState: 'all',
      action: fn()
    }, {
      marker: 'it',
      title: 'Italic',
      subtitle: 'A character style, use italic text',
      selectionState: 'none',
      isDisabled: true,
      action: fn()
    }, {
      icon: Eraser,
      title: 'Remove character style',
      selectionState: 'none',
      isDisabled: true,
      action: fn()
    }]
  },
  parameters: {
    docs: {
      description: {
        story: '\`isDisabled\` says the consumer has no operation for the row right now (e.g. nothing to ' + 'remove). The row stays listed and renders no trailing label — unlike deprecated and ' + 'disallowed, it describes the moment, not the marker.'
      }
    }
  }
}`,...(j=(F=l.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var O,W,H;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    markerMenuItems: [{
      marker: 'bd',
      title: 'Bold',
      subtitle: 'A character style, use bold text',
      selectionState: 'none',
      action: fn()
    }, {
      marker: 'pro',
      title: 'Pronunciation',
      subtitle: 'For indicating pronunciation in CJK texts',
      isDeprecated: true,
      action: fn()
    },
    // The play function types \`q\`, so this must stay the only item matching that query by marker
    // code or title — otherwise the \`option\` assertion below stops being unambiguous.
    {
      marker: 'q',
      title: 'Poetry',
      subtitle: 'Only reachable by searching for "q" or "Poetry"',
      isDisallowed: true,
      action: fn()
    }]
  },
  play: async ({
    canvas,
    userEvent,
    step
  }) => {
    await step('Search for the disallowed "Poetry" (q) marker', async () => {
      const searchInput = canvas.getByPlaceholderText('Type a style or search.');
      await userEvent.type(searchInput, 'q');
    });
    await step('Verify the disallowed marker is revealed, disabled, with its badge', async () => {
      const item = await canvas.findByRole('option', {
        name: /Poetry/
      });
      await expect(item).toHaveAttribute('aria-disabled', 'true');
      await expect(canvas.getByText('Disallowed')).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Deprecated items stay visible but disabled with a trailing label. Disallowed items are ' + 'hidden while the query is empty (because allowed items exist) — type \`q\` or \`Poetry\` ' + 'to reveal the disallowed row, which also renders disabled.'
      }
    }
  }
}`,...(H=(W=c.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var J,V,G;d.parameters={...d.parameters,docs:{...(J=d.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    markerMenuItems: [{
      marker: 'q',
      title: 'Poetry',
      isDisallowed: true,
      action: fn()
    }, {
      marker: 'q1',
      title: 'Poetry level 1',
      isDisallowed: true,
      action: fn()
    }, {
      marker: 'q2',
      title: 'Poetry level 2',
      isDisallowed: true,
      action: fn()
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'When every item is disallowed the menu shows them (disabled) rather than reading as an ' + 'empty "No results" state.'
      }
    }
  }
}`,...(G=(V=d.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var L,K,Q;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  // 200px is the narrow end consumers pin the popover to, which is what makes truncation visible.
  decorators: [Story => <div className="tw:w-[200px] tw:rounded-md tw:border tw:border-border">
        <Story />
      </div>],
  args: {
    searchPlaceholder: 'Search character markers',
    markerMenuItems: [{
      marker: 'addpn',
      title: 'Addition with proper name, dot underline',
      subtitle: 'For Chinese words to be dot underline & underline',
      selectionState: 'all',
      action: fn()
    }, {
      marker: 'qt',
      title: 'Quoted text — Old Testament quotation in the New Testament',
      subtitle: 'Old Testament quotations in the New Testament',
      selectionState: 'partial',
      action: fn()
    }, {
      icon: Eraser,
      title: 'Remove all character styles from the selection',
      selectionState: 'none',
      isDisabled: true,
      action: fn()
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'At the 200px width consumers pin the popover to, long titles and subtitles truncate ' + 'rather than wrap, per the Responsiveness guideline. Hover a row to see the full text.'
      }
    }
  }
}`,...(Q=(K=m.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var z,U,Y;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    searchPlaceholder: 'Search character markers',
    markerMenuItems: [{
      icon: RemoveFormatting,
      title: 'Remove character marker',
      action: fn()
    }, {
      marker: 'bd',
      title: 'Bold',
      subtitle: 'A character style, use bold text',
      action: fn()
    }, {
      marker: 'nd',
      title: 'Name of God',
      subtitle: 'For name of deity',
      action: fn()
    }]
  },
  play: async ({
    canvas,
    step
  }) => {
    await step('Verify the remove row renders first and is selectable', async () => {
      const options = await canvas.findAllByRole('option');
      await expect(options[0]).toHaveTextContent('Remove character marker');
      await expect(options[0]).not.toHaveAttribute('aria-disabled', 'true');
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'The character-marker menu leads with a remove row: an icon-and-title command row with ' + 'no marker code, which takes the character marker off the selected text and leaves the ' + 'text itself in place. It appears only while a character marker is applied to the ' + 'selection. \`MarkerMenu\` does no sorting of its own — it renders \`markerMenuItems\` in ' + 'the order given, so the consumer is the one that puts the remove row ahead of the ' + 'marker rows and sorts those by marker code.\\n\\n' + "Note that the row's icon must be passed explicitly. With \`icon\` absent, \`MarkerMenu\` " + 'falls back to a \`Ban\` glyph, which reads as "disallowed" rather than "remove" in a ' + 'menu that already renders a disallowed affordance.'
      }
    }
  }
}`,...(Y=(U=h.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var $,X,Z;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    searchPlaceholder: 'Search to change paragraph style.',
    markerMenuItems: [{
      marker: 'p',
      title: 'Paragraph',
      subtitle: 'normal (with indent first line)',
      action: fn()
    }, {
      icon: ClipboardPaste,
      title: 'Paste',
      action: fn()
    }, {
      icon: ClipboardPaste,
      title: 'Paste as plaintext',
      action: fn()
    }, {
      marker: 'pi',
      title: 'Indented Paragraph',
      subtitle: 'indent level 1 (with first line indent)',
      isDisallowed: true,
      action: fn()
    }, {
      marker: 'ph',
      title: 'Indented paragraph with hanging indent',
      isDeprecated: true,
      action: fn()
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'The paragraph-marker surface, which is what the other stories do not show: paragraph ' + 'markers whose subtitles carry the indent level, and more than one non-marker command ' + 'row (the two paste commands) rather than a single remove row. It also passes the ' + "paragraph menu's own \`searchPlaceholder\` instead of the generic one — type \`pi\` to " + 'reveal the disallowed row.'
      }
    }
  }
}`,...(Z=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const Ce=["Default","SelectionStateAll","SelectionStatePartial","SelectionStateNone","MixedSelectionStates","DisabledItems","DeprecatedAndDisallowed","AllItemsDisallowed","NarrowWithLongTitles","CharacterMarkerRemoveRow","ParagraphMarkersAndCommands"];export{d as AllItemsDisallowed,h as CharacterMarkerRemoveRow,r as Default,c as DeprecatedAndDisallowed,l as DisabledItems,i as MixedSelectionStates,m as NarrowWithLongTitles,p as ParagraphMarkersAndCommands,n as SelectionStateAll,o as SelectionStateNone,s as SelectionStatePartial,Ce as __namedExportsOrder,Be as default};
