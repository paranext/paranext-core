import{M as i}from"./marker-menu.component-BN3SCKli.js";import{C as t}from"./clipboard-paste-B8dwb-EZ.js";import"./iframe-CZvc88lx.js";import"./preload-helper-CTOgD26E.js";import"./command-CUBjRbSK.js";import"./index-BOm9fHiL.js";import"./index-DMirlbJm.js";import"./index-BBxiJWLu.js";import"./index-CunXfxNe.js";import"./index-BCFJY3Yb.js";import"./index-F8sX17OF.js";import"./index-DsDi7nag.js";import"./index-DsJ4sOKZ.js";import"./index-DMyhmGx1.js";import"./index-C7ufJrAw.js";import"./index-CYDYM2TV.js";import"./utils-BPbySc-g.js";import"./dialog-Bqv_EOE3.js";import"./z-index-CoNkaVR8.js";import"./button-Dy0avwbE.js";import"./index-BnuTq2W6.js";import"./createReactComponent-q1AXX6-f.js";import"./input-group-lgufQjBH.js";import"./input-DzGrap8a.js";import"./IconCheck-D4IYIWDF.js";import"./createLucideIcon-DPxMjWIt.js";const T={title:"Advanced/MarkerMenu",component:i,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},o={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},e={args:{localizedStrings:o,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:t,title:"Paste",action:()=>alert("Paste command selected!")},{icon:t,title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}};var n,a,r;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
