import{j as c}from"./jsx-runtime-Dh5-W1u5.js";import{s as a,U as l}from"./localizedStrings-BVU3Outi.js";import"./iframe-djGCT5cb.js";import"./preload-helper-CTOgD26E.js";import"./button-CMgSPqjz.js";import"./index-BCfTqW4f.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./tooltip-BLAMhMGn.js";import"./index-DTAXz6r9.js";import"./index-oSCfe8u5.js";import"./index-FtzLejpH.js";import"./index-CRh60EhJ.js";import"./index-CK5Rc5hv.js";import"./index-DZqbfIAv.js";import"./index-BWVTlZ07.js";import"./index-CHLBiURO.js";import"./floating-ui.react-dom-DspJq7Hk.js";import"./index-B8GggJE5.js";import"./index-DJo_iyRf.js";import"./index-BvNg_5Mh.js";import"./index-lgs0ViwM.js";import"./index-Bi_rNfCZ.js";import"./index-BmCy8j2e.js";import"./z-index-B4JyHfu5.js";import"./createLucideIcon-vp2osuRH.js";const to={title:"Basics/UndoRedoButtons",component:l,tags:["autodocs"],parameters:{docs:{description:{component:"\nUndo and (optionally) Redo buttons with tooltips for use in editor toolbars.\n\n- Omit `onRedoClick` to render only the Undo button.\n- Pass `canUndo` / `canRedo` to control the disabled state of each button.\n- Pass `localizedStrings` to localize the tooltip text; keys fall back to the raw key string when omitted.\n        "}}},argTypes:{onUndoClick:{action:"undo-clicked"},canUndo:{control:"boolean"},canRedo:{control:"boolean"},showKeyboardShortcuts:{control:"boolean"},localizedStrings:{control:"object"}}},i={"%undoButton_tooltip%":a.localizedStrings.en["%undoButton_tooltip%"],"%redoButton_tooltip%":a.localizedStrings.en["%redoButton_tooltip%"]},o={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,showKeyboardShortcuts:!0,localizedStrings:i}},n={render:({onUndoClick:s,canUndo:v,localizedStrings:T})=>c.jsx(l,{onUndoClick:s,canUndo:v,localizedStrings:T}),args:{canUndo:!0,localizedStrings:i},parameters:{docs:{description:{story:"When `onRedoClick` is not provided the Redo button is hidden entirely."}}}},e={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!1,canRedo:!1,localizedStrings:i}},t={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,localizedStrings:{}},parameters:{docs:{description:{story:"When localized strings are not provided the raw key (e.g. `%undoButton_tooltip%`) is shown as fallback tooltip text."}}}},r={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,localizedStrings:{"%undoButton_tooltip%":a.localizedStrings.es["%undoButton_tooltip%"],"%redoButton_tooltip%":a.localizedStrings.es["%redoButton_tooltip%"]}},parameters:{docs:{description:{story:"Example with Spanish localization and Redo disabled."}}}},d={argTypes:{onRedoClick:{action:"redo-clicked"}},render:s=>c.jsx("div",{style:{overflow:"hidden",width:120,border:"1px solid #ccc",padding:"4px"},children:c.jsx(l,{...s})}),args:{canUndo:!0,canRedo:!0,localizedStrings:i},parameters:{docs:{description:{story:"Rendered inside an overflow-hidden container; the tooltip should not be clipped."}}}};var p,u,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(m=(u=o.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var g,h,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(S=(h=n.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var y,k,R;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(R=(k=e.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var z,f,U;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(U=(f=t.parameters)==null?void 0:f.docs)==null?void 0:U.source}}};var b,C,w;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(w=(C=r.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var B,x,_;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(_=(x=d.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};const ro=["Default","UndoOnly","BothDisabled","FallbackLocalization","CustomLocalizedStrings","InOverflowContainer"];export{e as BothDisabled,r as CustomLocalizedStrings,o as Default,t as FallbackLocalization,d as InOverflowContainer,n as UndoOnly,ro as __namedExportsOrder,to as default};
