import{j as n}from"./iframe-DInutuwa.js";import{T as P}from"./toolbar-compound-label.component-CKe3A_yO.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./tooltip-B9duP8Qq.js";import"./button-d-vGTRwO.js";import"./index-BnuTq2W6.js";import"./index-DppzcPFK.js";import"./z-index-bJLdNcga.js";import"./index-DoVBmhjw.js";import"./index-7RkYLgwz.js";import"./index-Bkq6BRHv.js";import"./index-CN9-0arl.js";import"./index-DH8Vqtm9.js";import"./index-DkNC0Np5.js";import"./index-LQSgDJ_B.js";import"./index-DshlUElr.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CNLY0Z2l.js";import"./index-Cl8VBXls.js";import"./index-CIa-whw0.js";import"./use-truncation-tooltip.hook-BiatRDPU.js";const V={title:"Advanced/ToolbarCompoundLabel",component:P,tags:["autodocs"],parameters:{docs:{description:{component:`A two-field toolbar label that degrades predictably as its slot narrows. The second field is always the one that gives way: it clips with an ellipsis, then disappears, leaving the first field alone. A tooltip carries the complete text whenever what is rendered is not all of it.

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
