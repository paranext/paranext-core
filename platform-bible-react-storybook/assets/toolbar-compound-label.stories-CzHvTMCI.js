import{j as n}from"./iframe-hJznJ-fq.js";import{T as P}from"./toolbar-compound-label.component-D4HV_m6U.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./tooltip-CD14-jKx.js";import"./button-D9VVs_Zx.js";import"./index-BnuTq2W6.js";import"./index-DY_Jw78b.js";import"./z-index-bJLdNcga.js";import"./index-BA9u1S_d.js";import"./index-BCmd3Zbz.js";import"./index-CDgyGOe0.js";import"./index-DGvQcAn4.js";import"./index-D1ajGflk.js";import"./index-BFUHZVf1.js";import"./index-CucgBRV8.js";import"./index-MoRTzhHJ.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-je6aT-PO.js";import"./index-CD9DDU3y.js";import"./index-kQ7Y2XDg.js";import"./use-truncation-tooltip.hook-D1P6KWrU.js";const V={title:"Advanced/ToolbarCompoundLabel",component:P,tags:["autodocs"],parameters:{docs:{description:{component:`A two-field toolbar label that degrades predictably as its slot narrows. The second field is always the one that gives way: it clips with an ellipsis, then disappears, leaving the first field alone. A tooltip carries the complete text whenever what is rendered is not all of it.

Use this for any toolbar item whose text can outgrow its space — a scripture reference, a project name, a paragraph style. Handling it here rather than per-item is what keeps them behaving the same way as they shrink.`}}},args:{primary:"GEN",secondary:"1:1",fullText:"Genesis 1:1"}},e={},r={render:k=>n.jsx("div",{className:"tw:w-24 tw:overflow-hidden tw:border tw:p-1",children:n.jsx(P,{...k})}),args:{primary:"1 Chronicles",secondary:"29:30",fullText:"1 Chronicles 29:30"},parameters:{docs:{description:{story:"The secondary field absorbs the shrinking, so it clips to an ellipsis while the book name stays whole. Hover to see the full reference — the tooltip opens only because something is actually clipped."}}}},t={args:{isPartial:!0},parameters:{docs:{description:{story:"`GEN` stands in for `Genesis`. Nothing is clipped, so CSS cannot detect that anything is missing — `isPartial` is what tells the label to offer its tooltip anyway. Without it the full book name would be unreachable."}}}},s={args:{showSecondary:!1},parameters:{docs:{description:{story:"At the narrowest step the second field is removed entirely. The tooltip becomes unconditional, since the label is incomplete by construction."}}}},o={args:{primary:"(TP1)",secondary:"Translation Project 1",secondaryFirst:!0,fullText:"Translation Project 1 (TP1)"},parameters:{docs:{description:{story:"A project selector reads full-name-then-short-name, but the short name is the identifying half and has to survive. `secondaryFirst` keeps the reading order while leaving the shrink order alone."}}}},a={args:{primary:n.jsx("span",{className:"tw:font-mono",children:"p"}),secondary:"Paragraph",separator:" - ",fullText:"p - Paragraph"},parameters:{docs:{description:{story:"The separator is a real text node, not a CSS gap, so it survives into `textContent` — screen readers and text-matching tests both read one continuous label. The paragraph-style trigger uses ` - ` and renders its marker code in monospace."}}}};var i,c,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,d,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(y=(u=t.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var g,f,b;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var w,T,S;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(S=(T=o.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var v,x,C;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(C=(x=a.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};const X=["Default","InANarrowSlot","AbbreviatedPrimary","SecondaryDropped","SecondaryFirst","CustomSeparator"];export{t as AbbreviatedPrimary,a as CustomSeparator,e as Default,r as InANarrowSlot,s as SecondaryDropped,o as SecondaryFirst,X as __namedExportsOrder,V as default};
