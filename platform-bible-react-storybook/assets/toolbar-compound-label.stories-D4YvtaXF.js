import{j as n}from"./iframe-CwCaby_0.js";import{T as k}from"./toolbar-compound-label.component-CB7OTxZX.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./tooltip-IA-E6O3k.js";import"./button-D1Rh3Vm6.js";import"./index-BnuTq2W6.js";import"./index-Bv-dt4QP.js";import"./z-index-DiGYIwoM.js";import"./index-C7xk-KdH.js";import"./index-B8PL1_My.js";import"./index-DjzsZX1g.js";import"./index-oBa7vK3t.js";import"./index-BmfWWMld.js";import"./index-CFPoxtm7.js";import"./index-SZvYyM_S.js";import"./index-BNTXN8Kk.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Chz3DA-e.js";import"./index-kT857MVF.js";import"./index-CWNu5mL2.js";import"./use-truncation-tooltip.hook-0ZmUVk-2.js";import"./focus.util-DRSEP984.js";import"./use-interaction-modality.hook-8Capyn5h.js";const Y={title:"Advanced/ToolbarCompoundLabel",component:k,tags:["autodocs"],parameters:{docs:{description:{component:`A two-field toolbar label that degrades predictably as its slot narrows. The second field is always the one that gives way: it clips with an ellipsis, then disappears, leaving the first field alone. A tooltip carries the complete text whenever what is rendered is not all of it.

Use this for any toolbar item whose text can outgrow its space — a scripture reference, a project name, a paragraph style. Handling it here rather than per-item is what keeps them behaving the same way as they shrink.`}}},args:{primary:"GEN",secondary:"1:1",fullText:"Genesis 1:1"}},e={},r={render:N=>n.jsx("div",{className:"tw:w-24 tw:overflow-hidden tw:border tw:p-1",children:n.jsx(k,{...N})}),args:{primary:"1 Chronicles",secondary:"29:30",fullText:"1 Chronicles 29:30"},parameters:{docs:{description:{story:"The secondary field absorbs the shrinking, so it clips to an ellipsis while the book name stays whole. Hover to see the full reference — the tooltip opens only because something is actually clipped."}}}},t={args:{isPartial:!0},parameters:{docs:{description:{story:"`GEN` stands in for `Genesis`. Nothing is clipped, so CSS cannot detect that anything is missing — `isPartial` is what tells the label to offer its tooltip anyway. Without it the full book name would be unreachable."}}}},s={args:{showSecondary:!1},parameters:{docs:{description:{story:"At the narrowest step the second field is removed entirely. The tooltip becomes unconditional, since the label is incomplete by construction."}}}},o={args:{primary:"pt",secondary:"12",secondaryFirst:!0,fullText:"12 pt"},parameters:{docs:{description:{story:"A measurement reads number-then-unit, but the unit is the field that must survive. `secondaryFirst` keeps the reading order while leaving the shrink order alone."}}}},a={args:{primary:n.jsx("span",{className:"tw:font-mono",children:"p"}),secondary:"Paragraph",separator:" - ",fullText:"p - Paragraph"},parameters:{docs:{description:{story:"The separator is a real text node, not a CSS gap, so it survives into `textContent` — screen readers and text-matching tests both read one continuous label. The paragraph-style trigger uses ` - ` and renders its marker code in monospace."}}}};var i,p,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var l,d,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var w,S,v;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    primary: 'pt',
    secondary: '12',
    secondaryFirst: true,
    fullText: '12 pt'
  },
  parameters: {
    docs: {
      description: {
        story: 'A measurement reads number-then-unit, but the unit is the field that must survive. \`secondaryFirst\` keeps the reading order while leaving the shrink order alone.'
      }
    }
  }
}`,...(v=(S=o.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var x,T,C;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(C=(T=a.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};const Z=["Default","InANarrowSlot","AbbreviatedPrimary","SecondaryDropped","SecondaryFirst","CustomSeparator"];export{t as AbbreviatedPrimary,a as CustomSeparator,e as Default,r as InANarrowSlot,s as SecondaryDropped,o as SecondaryFirst,Z as __namedExportsOrder,Y as default};
