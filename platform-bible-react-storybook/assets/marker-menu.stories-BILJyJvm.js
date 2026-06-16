import{M as i}from"./marker-menu.component-Bmf9JXLS.js";import{C as t}from"./clipboard-paste-Ci6K-chU.js";import"./iframe-D18lKIKU.js";import"./preload-helper-CTOgD26E.js";import"./command-B3l8dzLC.js";import"./index-BrPop8TO.js";import"./index-BWZTOaeE.js";import"./index-C8OffPiQ.js";import"./index-DJ8FvcXn.js";import"./index-DXG0y8Eh.js";import"./index-S9SelDCj.js";import"./index-B1zy_L8S.js";import"./index-XgILNRl1.js";import"./index-CVolSeXR.js";import"./index-dVmW3GXK.js";import"./index-DgBJYSLB.js";import"./utils-BPbySc-g.js";import"./dialog-Capgj_Np.js";import"./z-index-CoNkaVR8.js";import"./button-dWMnsJ9d.js";import"./index-BnuTq2W6.js";import"./createReactComponent-C4B6fflP.js";import"./input-group-BFGE64R6.js";import"./input-B8Eaj5Wd.js";import"./IconCheck-DMWUSR0B.js";import"./createLucideIcon-BO7dMgER.js";const T={title:"Advanced/MarkerMenu",component:i,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},o={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},e={args:{localizedStrings:o,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:t,title:"Paste",action:()=>alert("Paste command selected!")},{icon:t,title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}};var n,a,r;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    localizedStrings: defaultLocalizedStrings,
    markerMenuItems: [{
      marker: 'p',
      title: 'Paragraph',
      subtitle: 'normal (with indent first line)',
      // Story action callback - alert is intentional to demonstrate marker selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('Paragraph marker selected!')
    }, {
      icon: ClipboardPaste,
      title: 'Paste',
      // Story action callback - alert is intentional to demonstrate command selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('Paste command selected!')
    }, {
      icon: ClipboardPaste,
      title: 'Paste as plaintext',
      // Story action callback - alert is intentional to demonstrate command selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('Past as plaintext selected!')
    }, {
      marker: 'pi',
      title: 'Indented Paragraph',
      subtitle: 'indent level 1 (with first line indent)',
      // Story action callback - alert is intentional to demonstrate marker selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('Indented Paragraph marker selected!'),
      isDisallowed: true
    }, {
      marker: 'ph',
      title: 'Indented paragraph with hanging indent',
      // Story action callback - alert is intentional to demonstrate marker selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('Indented paragraph with hanging indent marker selected!'),
      isDeprecated: true
    }]
  }
}`,...(r=(a=e.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const q=["Default"];export{e as Default,q as __namedExportsOrder,T as default};
