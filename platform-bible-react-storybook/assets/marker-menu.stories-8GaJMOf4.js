import{M as i}from"./marker-menu.component-F6wNv5eZ.js";import{C as t}from"./clipboard-paste-DFm3gZ3C.js";import"./iframe-98cSUu9c.js";import"./preload-helper-CTOgD26E.js";import"./command-DheF-AoX.js";import"./index-Bw38msmw.js";import"./index-DrMPsYHH.js";import"./index-DZGb75Mo.js";import"./index-DJ2JoP6m.js";import"./index-ClT2oVr8.js";import"./index-DauiKX_X.js";import"./index-BR1gMkug.js";import"./index-CYqoEYJG.js";import"./index-DADO2Svg.js";import"./index-CoA807i-.js";import"./index-C5_U7A7s.js";import"./utils-BPbySc-g.js";import"./dialog-CTqLbQqz.js";import"./z-index-CoNkaVR8.js";import"./button-DpB0n7EC.js";import"./index-BnuTq2W6.js";import"./createReactComponent-lsnGyuxL.js";import"./input-group-CF7hXWjk.js";import"./input-CZaZ1CrR.js";import"./IconCheck-CfAUR7bJ.js";import"./createLucideIcon-DVmJNh1p.js";const T={title:"Advanced/MarkerMenu",component:i,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},o={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},e={args:{localizedStrings:o,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:t,title:"Paste",action:()=>alert("Paste command selected!")},{icon:t,title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}};var n,a,r;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
