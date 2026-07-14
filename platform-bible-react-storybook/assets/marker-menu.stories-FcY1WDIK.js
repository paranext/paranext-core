import{M as k}from"./marker-menu.component-kx6GNDOo.js";import{C as i}from"./clipboard-paste-CpdOhnDl.js";import"./iframe-BLkHDPc2.js";import"./preload-helper-CTOgD26E.js";import"./command-36gfJdDk.js";import"./index-gtn3iczf.js";import"./index-BBD39aQq.js";import"./index-2yPxWZHY.js";import"./index-gvAmBDm-.js";import"./index-D1smWl4G.js";import"./index-BCsxYZLu.js";import"./index-CW99kNrp.js";import"./index-DSr6X7wm.js";import"./index-CY23NRY2.js";import"./index-ysGa6Pyv.js";import"./index-D7xUp3nn.js";import"./utils-BPbySc-g.js";import"./dialog-NQHaPWIJ.js";import"./z-index-CoNkaVR8.js";import"./button-NRzSW9tx.js";import"./index-BnuTq2W6.js";import"./createReactComponent-B2fp3t83.js";import"./input-group-BL7hRQFM.js";import"./input-DmkUthwU.js";import"./IconCheck-GwzAolTc.js";import"./createLucideIcon-DB98mUf9.js";const{expect:o}=__STORYBOOK_MODULE_TEST__,U={title:"Advanced/MarkerMenu",component:k,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},y={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},t={args:{localizedStrings:y,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:i,title:"Paste",action:()=>alert("Paste command selected!")},{icon:i,title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}},e={args:t.args,play:async({canvas:a,userEvent:g,step:n})=>{await n('Search for the disallowed "Indented Paragraph" (pi) marker',async()=>{const r=a.getByPlaceholderText("Type a style or search.");await g.type(r,"pi")}),await n("Verify the disallowed marker is revealed, disabled, with its badge",async()=>{const r=await a.findByRole("option",{name:/Indented Paragraph/});await o(r).toHaveAttribute("aria-disabled","true"),await o(a.getByText("Disallowed")).toBeInTheDocument()})}};var s,l,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,p,m,h,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: Default.args,
  play: async ({
    canvas,
    userEvent,
    step
  }) => {
    await step('Search for the disallowed "Indented Paragraph" (pi) marker', async () => {
      const searchInput = canvas.getByPlaceholderText('Type a style or search.');
      await userEvent.type(searchInput, 'pi');
    });
    await step('Verify the disallowed marker is revealed, disabled, with its badge', async () => {
      const item = await canvas.findByRole('option', {
        name: /Indented Paragraph/
      });
      await expect(item).toHaveAttribute('aria-disabled', 'true');
      await expect(canvas.getByText('Disallowed')).toBeInTheDocument();
    });
  }
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source},description:{story:`Disallowed markers (for example, styles blocked while the document's structure is protected) are
hidden until the search query matches them, so on an empty query the "Disallowed" badge is not
visible. This story types the disallowed marker's code to reveal it, demonstrating that a
revealed disallowed item is rendered disabled with a "Disallowed" badge.`,...(u=(h=e.parameters)==null?void 0:h.docs)==null?void 0:u.description}}};const Y=["Default","DisallowedMarker"];export{t as Default,e as DisallowedMarker,Y as __namedExportsOrder,U as default};
