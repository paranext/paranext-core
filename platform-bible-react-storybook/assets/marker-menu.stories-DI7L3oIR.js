import{M}from"./marker-menu.component-DxCfgtdy.js";import{c as P}from"./createLucideIcon-C8Wp5_Vu.js";import{C as l}from"./clipboard-paste-Dx9hMC-s.js";import"./iframe-Bt9TM0xh.js";import"./preload-helper-CTOgD26E.js";import"./command-BzbZT7CB.js";import"./index-C5IoInJ3.js";import"./index-CQojmEyu.js";import"./index-DsTjQvaI.js";import"./index-CMhZfGs4.js";import"./index-BeBxVkZf.js";import"./index-DNYXTelE.js";import"./index-B_DicGWO.js";import"./index-DxTa9BPG.js";import"./index-dyLoG1Q_.js";import"./index-CwlvFxjK.js";import"./index-DsXcVGxs.js";import"./utils-BPbySc-g.js";import"./dialog-XipQ-bm-.js";import"./z-index-CoNkaVR8.js";import"./button-m25p6vlO.js";import"./index-BnuTq2W6.js";import"./createReactComponent-DYJKoFlw.js";import"./input-group-CtE7_C6R.js";import"./input-Ceb0_ypj.js";import"./IconCheck-JRzfShW2.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M4 7V4h16v3",key:"9msm58"}],["path",{d:"M5 20h6",key:"1h6pxn"}],["path",{d:"M13 4 8 20",key:"kqq6aj"}],["path",{d:"m15 15 5 5",key:"me55sn"}],["path",{d:"m20 15-5 5",key:"11p7ol"}]],I=P("remove-formatting",S),{expect:i}=__STORYBOOK_MODULE_TEST__,$={title:"Advanced/MarkerMenu",component:M,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},x={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},n={args:{localizedStrings:x,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:l,title:"Paste",action:()=>alert("Paste command selected!")},{icon:l,title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}},a={args:n.args,play:async({canvas:e,userEvent:o,step:t})=>{await t('Search for the disallowed "Indented Paragraph" (pi) marker',async()=>{const s=e.getByPlaceholderText("Type a style or search.");await o.type(s,"pi")}),await t("Verify the disallowed marker is revealed, disabled, with its badge",async()=>{const s=await e.findByRole("option",{name:/Indented Paragraph/});await i(s).toHaveAttribute("aria-disabled","true"),await i(e.getByText("Disallowed")).toBeInTheDocument()})}},r={args:{localizedStrings:x,markerMenuItems:[{icon:I,title:"Remove character marker",action:()=>alert("Remove character marker selected!")},{marker:"bd",title:"A character style, use bold text",action:()=>alert("bd marker selected!")},{marker:"nd",title:"For name of deity (basic)",action:()=>alert("nd marker selected!")}]},play:async({canvas:e,step:o})=>{await o("Verify the remove row renders first and is selectable",async()=>{const t=await e.findAllByRole("option");await i(t[0]).toHaveTextContent("Remove character marker"),await i(t[0]).not.toHaveAttribute("aria-disabled","true")})}};var c,d,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,h,k,u,y;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(k=(h=a.parameters)==null?void 0:h.docs)==null?void 0:k.source},description:{story:`Disallowed markers (for example, styles blocked while the document's structure is protected) are
hidden until the search query matches them, so on an empty query the "Disallowed" badge is not
visible. This story types the disallowed marker's code to reveal it, demonstrating that a
revealed disallowed item is rendered disabled with a "Disallowed" badge.`,...(y=(u=a.parameters)==null?void 0:u.docs)==null?void 0:y.description}}};var b,w,g,f,v;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    localizedStrings: defaultLocalizedStrings,
    markerMenuItems: [{
      icon: RemoveFormatting,
      title: 'Remove character marker',
      // Story action callback - alert is intentional to demonstrate command selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('Remove character marker selected!')
    }, {
      marker: 'bd',
      title: 'A character style, use bold text',
      // Story action callback - alert is intentional to demonstrate marker selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('bd marker selected!')
    }, {
      marker: 'nd',
      title: 'For name of deity (basic)',
      // Story action callback - alert is intentional to demonstrate marker selection feedback
      // eslint-disable-next-line no-alert
      action: () => alert('nd marker selected!')
    }]
  },
  play: async ({
    canvas,
    step
  }) => {
    await step('Verify the remove row renders first and is selectable', async () => {
      const options = await canvas.findAllByRole('option');
      await expect(options[0]).toHaveTextContent('Remove character marker');
      await expect(options[0]).not.toHaveAttribute('aria-disabled', 'true');
    });
  }
}`,...(g=(w=r.parameters)==null?void 0:w.docs)==null?void 0:g.source},description:{story:`The character-marker menu leads with a remove row: an icon-and-title command row with no marker
code, which takes the character marker off the selected text and leaves the text itself in place.
It appears only while a character marker is applied to the selection, ahead of the marker rows,
which are sorted by marker code.

Note that the row's icon must be passed explicitly. With \`icon\` absent, \`MarkerMenu\` falls back
to a \`Ban\` glyph, which reads as "disallowed" rather than "remove" in a menu that already renders
a disallowed affordance.`,...(v=(f=r.parameters)==null?void 0:f.docs)==null?void 0:v.description}}};const ee=["Default","DisallowedMarker","CharacterMarkerRemoveRow"];export{r as CharacterMarkerRemoveRow,n as Default,a as DisallowedMarker,ee as __namedExportsOrder,$ as default};
