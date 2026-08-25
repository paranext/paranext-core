import{C as B}from"./cancel-accept-buttons.component-CCm8Os07.js";import{s as n}from"./localizedStrings-CI5JPfGO.js";import"./iframe-DDQDXtiz.js";import"./preload-helper-CTOgD26E.js";import"./button-Df_pPVQw.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-DGLROqqR.js";import"./button-group-kfIDAWEv.js";import"./separator-DkY5MqGr.js";import"./index-D7DCBoQi.js";import"./tooltip-CLZJxuRg.js";import"./z-index-CoNkaVR8.js";import"./index-BMr2j2iK.js";import"./index-D26IjmbI.js";import"./index-Dv1ie57a.js";import"./index-D7-Y0dh9.js";import"./index-DPUe_4OT.js";import"./index-CqsqfbMp.js";import"./index-C13VS38P.js";import"./index-xQHd7Z4C.js";import"./index-Bb_H9XBm.js";import"./index-B10LyWar.js";import"./x-4WUmiKig.js";import"./createLucideIcon-DXfRdUnE.js";import"./check-v6Xk2PqK.js";const V={title:"Basics/CancelAcceptButtons",component:B,tags:["autodocs","test"],parameters:{docs:{description:{component:`
Cancel and Accept buttons with tooltips for use in editor toolbars.

- Pass \`canAccept\` to control the disabled state of each button.
- Pass \`localizedStrings\` to localize the tooltip text; keys fall back to the raw key string when omitted.
        `}}},argTypes:{onCancelClick:{action:"cancel-clicked"},onAcceptClick:{action:"accept-clicked"},canAccept:{control:"boolean"},localizedStrings:{control:"object"},acceptLabel:{control:"text"}}},r={"%cancelButton_tooltip%":n.localizedStrings.en["%cancelButton_tooltip%"],"%acceptButton_tooltip%":n.localizedStrings.en["%acceptButton_tooltip%"]},t={args:{canAccept:!0,localizedStrings:r}},e={args:{canAccept:!1,localizedStrings:r},parameters:{docs:{description:{story:"Pass `canAccept={false}` to disable the Accept button, e.g. when an editor has no content to save."}}}},o={args:{canAccept:!0,localizedStrings:{}},parameters:{docs:{description:{story:"When localized strings are not provided the raw key (e.g. `%cancelButton_tooltip%`) is shown as fallback tooltip text."}}}},c={args:{canAccept:!0,localizedStrings:r,acceptLabel:"Save Comment"},parameters:{docs:{description:{story:'Pass `acceptLabel` to override the generic accept tooltip with a context-specific label such as "Save Comment" or "Save Footnote".'}}}},a={args:{canAccept:!0,localizedStrings:{"%cancelButton_tooltip%":n.localizedStrings.es["%cancelButton_tooltip%"],"%acceptButton_tooltip%":n.localizedStrings.es["%acceptButton_tooltip%"]}},parameters:{docs:{description:{story:"Example with Spanish localization."}}}};var s,i,l;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    canAccept: true,
    localizedStrings: defaultLocalizedStrings
  }
}`,...(l=(i=t.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,d,m;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    canAccept: false,
    localizedStrings: defaultLocalizedStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'Pass \`canAccept={false}\` to disable the Accept button, e.g. when an editor has no content to save.'
      }
    }
  }
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,g,S;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    canAccept: true,
    localizedStrings: {}
  },
  parameters: {
    docs: {
      description: {
        story: 'When localized strings are not provided the raw key (e.g. \`%cancelButton_tooltip%\`) is shown as fallback tooltip text.'
      }
    }
  }
}`,...(S=(g=o.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var h,z,f;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    canAccept: true,
    localizedStrings: defaultLocalizedStrings,
    acceptLabel: 'Save Comment'
  },
  parameters: {
    docs: {
      description: {
        story: 'Pass \`acceptLabel\` to override the generic accept tooltip with a context-specific label such as "Save Comment" or "Save Footnote".'
      }
    }
  }
}`,...(f=(z=c.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};var b,A,y;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    canAccept: true,
    localizedStrings: {
      '%cancelButton_tooltip%': standardStrings.localizedStrings.es['%cancelButton_tooltip%'],
      '%acceptButton_tooltip%': standardStrings.localizedStrings.es['%acceptButton_tooltip%']
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with Spanish localization.'
      }
    }
  }
}`,...(y=(A=a.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};const X=["Default","AcceptDisabled","FallbackLocalization","ContextSpecificLabel","CustomLocalizedStrings"];export{e as AcceptDisabled,c as ContextSpecificLabel,a as CustomLocalizedStrings,t as Default,o as FallbackLocalization,X as __namedExportsOrder,V as default};
