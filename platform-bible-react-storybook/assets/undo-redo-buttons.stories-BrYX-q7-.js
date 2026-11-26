import{j as c}from"./iframe-BqYvhf7C.js";import{U as l}from"./undo-redo-buttons.component-DjpG3K54.js";import{s as d}from"./localizedStrings-JxsxCAyp.js";import"./preload-helper-CTOgD26E.js";import"./button-DtGA6OYm.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-PEkvp2XX.js";import"./button-group-C2UWk24V.js";import"./separator-D7EoUDmT.js";import"./index-DwKr2vXH.js";import"./shortcut-keys.component-fWrvvkJz.js";import"./index-VL4OM5EA.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./kbd-DWGW2eXL.js";import"./tooltip-iyNlpbe0.js";import"./z-index-DhRj3SmA.js";import"./portal-container.context-Bq5le6pR.js";import"./index-CyQshAAy.js";import"./index-BvJCGcWd.js";import"./index-Cm-cmOD4.js";import"./index--NDpXzwn.js";import"./index-CFcgSA2o.js";import"./index-B_V2pCCV.js";import"./index-BmzRO4KU.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DQKmi0Ri.js";import"./index-CV-3M0tS.js";import"./index-B_byjAdI.js";import"./platform.util-Dj487_od.js";import"./createLucideIcon-D8JX_TTK.js";const po={title:"Basics/UndoRedoButtons",component:l,tags:["autodocs","test"],parameters:{docs:{description:{component:"\nUndo and (optionally) Redo buttons with tooltips for use in editor toolbars.\n\n- Omit `onRedoClick` to render only the Undo button.\n- Pass `canUndo` / `canRedo` to control the disabled state of each button.\n- Pass `localizedStrings` to localize the tooltip text; keys fall back to the raw key string when omitted.\n        "}}},argTypes:{onUndoClick:{action:"undo-clicked"},variant:{control:"select",options:["ghost","outline","secondary","default","destructive","link"]},canUndo:{control:"boolean"},canRedo:{control:"boolean"},showKeyboardShortcuts:{control:"boolean"},localizedStrings:{control:"object"}}},a={"%undoButton_tooltip%":d.localizedStrings.en["%undoButton_tooltip%"],"%redoButton_tooltip%":d.localizedStrings.en["%redoButton_tooltip%"]},o={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,showKeyboardShortcuts:!0,localizedStrings:a}},e={render:({onUndoClick:s,canUndo:_,localizedStrings:T})=>c.jsx(l,{onUndoClick:s,canUndo:_,localizedStrings:T}),args:{canUndo:!0,localizedStrings:a},parameters:{docs:{description:{story:"When `onRedoClick` is not provided the Redo button is hidden entirely."}}}},n={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!1,canRedo:!1,localizedStrings:a}},t={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,localizedStrings:{}},parameters:{docs:{description:{story:"When localized strings are not provided the raw key (e.g. `%undoButton_tooltip%`) is shown as fallback tooltip text."}}}},r={argTypes:{onRedoClick:{action:"redo-clicked"}},args:{canUndo:!0,canRedo:!0,localizedStrings:{"%undoButton_tooltip%":d.localizedStrings.es["%undoButton_tooltip%"],"%redoButton_tooltip%":d.localizedStrings.es["%redoButton_tooltip%"]}},parameters:{docs:{description:{story:"Example with Spanish localization and Redo disabled."}}}},i={argTypes:{onRedoClick:{action:"redo-clicked"}},render:s=>c.jsx("div",{style:{overflow:"hidden",width:120,border:"1px solid #ccc",padding:"4px"},children:c.jsx(l,{...s})}),args:{canUndo:!0,canRedo:!0,localizedStrings:a},parameters:{docs:{description:{story:"Rendered inside an overflow-hidden container; the tooltip should not be clipped."}}}};var p,u,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(w=(C=r.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var B,x,v;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(v=(x=i.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const uo=["Default","UndoOnly","BothDisabled","FallbackLocalization","CustomLocalizedStrings","InOverflowContainer"];export{n as BothDisabled,r as CustomLocalizedStrings,o as Default,t as FallbackLocalization,i as InOverflowContainer,e as UndoOnly,uo as __namedExportsOrder,po as default};
