import{j as c}from"./iframe-B0pIEsCx.js";import{U as l}from"./undo-redo-buttons.component-D3oMhamg.js";import{s as a}from"./localizedStrings-BiySQvWD.js";import"./preload-helper-CTOgD26E.js";import"./button-CArC_7Up.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-CrNwCyhJ.js";import"./button-group-lDEF3acI.js";import"./separator-CKTycTXN.js";import"./index-DC_2fxT1.js";import"./kbd-Nx1SBCl2.js";import"./tooltip-COAsxk_p.js";import"./z-index-CoNkaVR8.js";import"./index-xhJKCXLV.js";import"./index-BkFLsX3t.js";import"./index-D0FRfdB9.js";import"./index-CtHx1C9x.js";import"./index-DX2-HE08.js";import"./index-Cz8iKTG7.js";import"./index-ByIudnWx.js";import"./index-DKtA4i5_.js";import"./index-D0xgC1GC.js";import"./index-Cs4Hp1Jg.js";import"./createLucideIcon-CV_AcP7G.js";const no={title:"Basics/UndoRedoButtons",component:l,tags:["autodocs","test"],parameters:{docs:{description:{component:"\nUndo and (optionally) Redo buttons with tooltips for use in editor toolbars.\n\n- Omit `onRedoClick` to render only the Undo button.\n- Pass `canUndo` / `canRedo` to control the disabled state of each button.\n- Pass `localizedStrings` to localize the tooltip text; keys fall back to the raw key string when omitted.\n        "}}},argTypes:{onUndoClick:{action:"undo-clicked"},variant:{control:"select",options:["ghost","outline","secondary","default","destructive","link"]},canUndo:{control:"boolean"},canRedo:{control:"boolean"},showKeyboardShortcuts:{control:"boolean"},localizedStrings:{control:"object"}}},i={"%undoButton_tooltip%":a.localizedStrings.en["%undoButton_tooltip%"],"%redoButton_tooltip%":a.localizedStrings.en["%redoButton_tooltip%"]},o={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,showKeyboardShortcuts:!0,localizedStrings:i}},e={render:({onUndoClick:s,canUndo:_,localizedStrings:T})=>c.jsx(l,{onUndoClick:s,canUndo:_,localizedStrings:T}),args:{canUndo:!0,localizedStrings:i},parameters:{docs:{description:{story:"When `onRedoClick` is not provided the Redo button is hidden entirely."}}}},n={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!1,canRedo:!1,localizedStrings:i}},t={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,localizedStrings:{}},parameters:{docs:{description:{story:"When localized strings are not provided the raw key (e.g. `%undoButton_tooltip%`) is shown as fallback tooltip text."}}}},r={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,localizedStrings:{"%undoButton_tooltip%":a.localizedStrings.es["%undoButton_tooltip%"],"%redoButton_tooltip%":a.localizedStrings.es["%redoButton_tooltip%"]}},parameters:{docs:{description:{story:"Example with Spanish localization and Redo disabled."}}}},d={argTypes:{onRedoClick:{action:"redo-clicked"}},render:s=>c.jsx("div",{style:{overflow:"hidden",width:120,border:"1px solid #ccc",padding:"4px"},children:c.jsx(l,{...s})}),args:{canUndo:!0,canRedo:!0,localizedStrings:i},parameters:{docs:{description:{story:"Rendered inside an overflow-hidden container; the tooltip should not be clipped."}}}};var p,u,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  argTypes: {
    onRedoClick: {
      action: 'redo-clicked'
    }
  },
  args: {
    canUndo: true,
    canRedo: true,
    showKeyboardShortcuts: true,
    localizedStrings: defaultLocalizedStrings
  }
}`,...(m=(u=o.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var g,h,S;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  // Use a render function so onRedoClick is never forwarded to the component, regardless of
  // what Storybook's action system injects into args.
  render: ({
    onUndoClick,
    canUndo,
    localizedStrings
  }) => <UndoRedoButtons onUndoClick={onUndoClick} canUndo={canUndo} localizedStrings={localizedStrings} />,
  args: {
    canUndo: true,
    localizedStrings: defaultLocalizedStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'When \`onRedoClick\` is not provided the Redo button is hidden entirely.'
      }
    }
  }
}`,...(S=(h=e.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var y,k,f;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  argTypes: {
    onRedoClick: {
      action: 'redo-clicked'
    }
  },
  args: {
    canUndo: false,
    canRedo: false,
    localizedStrings: defaultLocalizedStrings
  }
}`,...(f=(k=n.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var R,z,U;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`{
  argTypes: {
    onRedoClick: {
      action: 'redo-clicked'
    }
  },
  args: {
    canUndo: true,
    canRedo: true,
    localizedStrings: {}
  },
  parameters: {
    docs: {
      description: {
        story: 'When localized strings are not provided the raw key (e.g. \`%undoButton_tooltip%\`) is shown as fallback tooltip text.'
      }
    }
  }
}`,...(U=(z=t.parameters)==null?void 0:z.docs)==null?void 0:U.source}}};var b,C,w;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  argTypes: {
    onRedoClick: {
      action: 'redo-clicked'
    }
  },
  args: {
    canUndo: true,
    canRedo: true,
    localizedStrings: {
      '%undoButton_tooltip%': standardStrings.localizedStrings.es['%undoButton_tooltip%'],
      '%redoButton_tooltip%': standardStrings.localizedStrings.es['%redoButton_tooltip%']
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with Spanish localization and Redo disabled.'
      }
    }
  }
}`,...(w=(C=r.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var B,x,v;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  argTypes: {
    onRedoClick: {
      action: 'redo-clicked'
    }
  },
  render: args => <div style={{
    overflow: 'hidden',
    width: 120,
    border: '1px solid #ccc',
    padding: '4px'
  }}>
      <UndoRedoButtons {...args} />
    </div>,
  args: {
    canUndo: true,
    canRedo: true,
    localizedStrings: defaultLocalizedStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendered inside an overflow-hidden container; the tooltip should not be clipped.'
      }
    }
  }
}`,...(v=(x=d.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const to=["Default","UndoOnly","BothDisabled","FallbackLocalization","CustomLocalizedStrings","InOverflowContainer"];export{n as BothDisabled,r as CustomLocalizedStrings,o as Default,t as FallbackLocalization,d as InOverflowContainer,e as UndoOnly,to as __namedExportsOrder,no as default};
