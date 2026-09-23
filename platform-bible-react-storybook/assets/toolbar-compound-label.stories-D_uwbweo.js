import{j as n}from"./iframe-1xS10mWO.js";import{T as P}from"./toolbar-compound-label.component--sKxe9zl.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./tooltip-C1-eHY7w.js";import"./button-CBp0OKt6.js";import"./index-BnuTq2W6.js";import"./index-D6838Qhp.js";import"./z-index-DiGYIwoM.js";import"./index-DcP8YhXs.js";import"./index-MOaP1ecW.js";import"./index-BfR6ksIh.js";import"./index-pODYanT9.js";import"./index-BW9rFzdm.js";import"./index-fWGOqHis.js";import"./index-CEh2qCGR.js";import"./index-Ce8YDrKz.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Dbg6Vmdx.js";import"./index-Cl-CdJSN.js";import"./index-C47IpFxS.js";import"./use-truncation-tooltip.hook-KB2v_By4.js";import"./focus.util-DRSEP984.js";import"./use-interaction-modality.hook-CN-Jt4xW.js";const Y={title:"Advanced/ToolbarCompoundLabel",component:P,tags:["autodocs"],parameters:{docs:{description:{component:`A two-field toolbar label that degrades predictably as its slot narrows. The second field is always the one that gives way: it clips with an ellipsis, then disappears, leaving the first field alone. A tooltip carries the complete text whenever what is rendered is not all of it.

Use this for any toolbar item whose text can outgrow its space — a scripture reference, a project name, a paragraph style. Handling it here rather than per-item is what keeps them behaving the same way as they shrink.`}}},args:{primary:"GEN",secondary:"1:1",fullText:"Genesis 1:1"}},e={},r={render:k=>n.jsx("div",{className:"tw:w-24 tw:overflow-hidden tw:border tw:p-1",children:n.jsx(P,{...k})}),args:{primary:"1 Chronicles",secondary:"29:30",fullText:"1 Chronicles 29:30"},parameters:{docs:{description:{story:"The secondary field absorbs the shrinking, so it clips to an ellipsis while the book name stays whole. Hover to see the full reference — the tooltip opens only because something is actually clipped."}}}},t={args:{isPartial:!0},parameters:{docs:{description:{story:"`GEN` stands in for `Genesis`. Nothing is clipped, so CSS cannot detect that anything is missing — `isPartial` is what tells the label to offer its tooltip anyway. Without it the full book name would be unreachable."}}}},o={args:{showSecondary:!1},parameters:{docs:{description:{story:"At the narrowest step the second field is removed entirely. The tooltip becomes unconditional, since the label is incomplete by construction."}}}},s={args:{primary:"(TP1)",secondary:"Translation Project 1",secondaryFirst:!0,fullText:"Translation Project 1 (TP1)"},parameters:{docs:{description:{story:"A project selector reads full-name-then-short-name, but the short name is the identifying half and has to survive. `secondaryFirst` keeps the reading order while leaving the shrink order alone."}}}},a={args:{primary:n.jsx("span",{className:"tw:font-mono",children:"p"}),secondary:"Paragraph",separator:" - ",fullText:"p - Paragraph"},parameters:{docs:{description:{story:"The separator is a real text node, not a CSS gap, so it survives into `textContent` — screen readers and text-matching tests both read one continuous label. The paragraph-style trigger uses ` - ` and renders its marker code in monospace."}}}};var i,c,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,d,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <div className="tw:w-24 tw:overflow-hidden tw:border tw:p-1">
      <ToolbarCompoundLabel {...args} />
    </div>,
  args: {
    primary: '1 Chronicles',
    secondary: '29:30',
    fullText: '1 Chronicles 29:30'
  },
  parameters: {
    docs: {
      description: {
        story: 'The secondary field absorbs the shrinking, so it clips to an ellipsis while the book name stays whole. Hover to see the full reference — the tooltip opens only because something is actually clipped.'
      }
    }
  }
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var h,u,y;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    isPartial: true
  },
  parameters: {
    docs: {
      description: {
        story: '\`GEN\` stands in for \`Genesis\`. Nothing is clipped, so CSS cannot detect that anything is missing — \`isPartial\` is what tells the label to offer its tooltip anyway. Without it the full book name would be unreachable.'
      }
    }
  }
}`,...(y=(u=t.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var g,f,b;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    showSecondary: false
  },
  parameters: {
    docs: {
      description: {
        story: 'At the narrowest step the second field is removed entirely. The tooltip becomes unconditional, since the label is incomplete by construction.'
      }
    }
  }
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var w,T,S;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    primary: '(TP1)',
    secondary: 'Translation Project 1',
    secondaryFirst: true,
    fullText: 'Translation Project 1 (TP1)'
  },
  parameters: {
    docs: {
      description: {
        story: 'A project selector reads full-name-then-short-name, but the short name is the identifying half and has to survive. \`secondaryFirst\` keeps the reading order while leaving the shrink order alone.'
      }
    }
  }
}`,...(S=(T=s.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var v,x,C;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    primary: <span className="tw:font-mono">p</span>,
    secondary: 'Paragraph',
    separator: ' - ',
    fullText: 'p - Paragraph'
  },
  parameters: {
    docs: {
      description: {
        story: 'The separator is a real text node, not a CSS gap, so it survives into \`textContent\` — screen readers and text-matching tests both read one continuous label. The paragraph-style trigger uses \` - \` and renders its marker code in monospace.'
      }
    }
  }
}`,...(C=(x=a.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};const Z=["Default","InANarrowSlot","AbbreviatedPrimary","SecondaryDropped","SecondaryFirst","CustomSeparator"];export{t as AbbreviatedPrimary,a as CustomSeparator,e as Default,r as InANarrowSlot,o as SecondaryDropped,s as SecondaryFirst,Z as __namedExportsOrder,Y as default};
