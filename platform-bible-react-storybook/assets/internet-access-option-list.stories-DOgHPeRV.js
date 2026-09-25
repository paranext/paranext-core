import{r as xe,j as t}from"./iframe-BuAslHK5.js";import{A as ve,a as fe,b as Re}from"./alert-CM9wCsL3.js";import{B as Ee}from"./badge-DftPAK3_.js";import{B as Be}from"./button-CkwNhtvy.js";import{R as Te,a as Se}from"./radio-group-B1_GwlVy.js";import{T as Oe,a as Ce,b as De,c as Ue}from"./tooltip-gIIwWVMh.js";import{c as S}from"./utils-BPbySc-g.js";import"./index-AIIJ_tDp.js";import{T as Pe}from"./triangle-alert-T0Pln8ly.js";import{e as Ve}from"./scripture-util-DArajUVn-CPHPTCtZ.js";import{I as je}from"./info-BBnidFVP.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-CSFiBaRo.js";import"./index-B4hIMw6l.js";import"./index-DvCyZILw.js";import"./index-Rk8NGxiK.js";import"./index-Dhw2S8oA.js";import"./index-DxRrSfPy.js";import"./index-aoH12Seb.js";import"./index-SoSK5Jm7.js";import"./index-D1hQSaXA.js";import"./index-B6YZRYAm.js";import"./index-D6kSPupD.js";import"./index-ubIJ78tM.js";import"./z-index-DiGYIwoM.js";import"./portal-container.context-C4F8KuBG.js";import"./index-DVJjMwqa.js";import"./index-DZwQDr2_.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-HblD8LHi.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./createLucideIcon-DhMC1uO-.js";import"./index.es-CXoS8DB2.js";const Ie=300,v=[{value:"Enabled",labelKey:"%paratextRegistration_description_internetUse_option_Enabled_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_Enabled_details%",isEnabled:!0},{value:"VpnRequired",labelKey:"%paratextRegistration_description_internetUse_option_VpnRequired_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_VpnRequired_details%",isEnabled:!0},{value:"Disabled",labelKey:"%paratextRegistration_description_internetUse_option_Disabled_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_Disabled_details%",isEnabled:!1},{value:"BlockInSensitiveLocations",labelKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%",descriptionKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%",isEnabled:!1},{value:"ProxyOnly",labelKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_details%",isEnabled:!1}],Ne=e=>v.some(i=>i.value!=="BlockInSensitiveLocations"&&i.value===e);function ke(e){return v.some(i=>i.value===e&&i.isEnabled)}[...v.flatMap(e=>[e.labelKey,e.descriptionKey])];function E({localizedStrings:e,value:i,onChange:o,disabled:a}){const r=xe.useId(),p=n=>`${r}-${n}`,c=n=>`${p(n)}-description`,f=!ke(i),l=v.find(n=>n.value===i);return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-1",children:[f&&t.jsxs(ve,{role:"status",className:"tw:mb-2",children:[t.jsx(Pe,{}),t.jsx(fe,{children:e["%paratextRegistration_internetUse_unsupportedSelection_title%"]}),t.jsx(Re,{children:Ve(e["%paratextRegistration_internetUse_unsupportedSelection_description%"]??"",{selectedOption:l?e[l.labelKey]??l.value:i})})]}),t.jsx(Oe,{delayDuration:Ie,children:t.jsx(Te,{value:i,onValueChange:n=>{Ne(n)&&o(n)},disabled:a,children:v.map(n=>t.jsxs("div",{className:S("tw:relative tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5",!a&&n.isEnabled&&"tw:hover:bg-accent"),children:[t.jsx(Se,{value:n.value,id:p(n.value),"aria-describedby":c(n.value),disabled:a||!n.isEnabled,className:"tw:mt-0.5"}),t.jsxs("div",{className:"tw:flex tw:flex-1 tw:flex-col",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between tw:gap-2",children:[t.jsxs("div",{className:"tw:flex-1 tw:text-sm",children:[t.jsx("label",{htmlFor:p(n.value),"aria-disabled":!n.isEnabled||void 0,className:S("tw:font-medium tw:after:absolute tw:after:inset-0",n.isEnabled&&!a?"tw:cursor-pointer":"tw:cursor-not-allowed tw:text-muted-foreground"),children:e[n.labelKey]}),t.jsxs(Ce,{children:[t.jsx(De,{asChild:!0,children:t.jsx(Be,{variant:"ghost",size:"icon","aria-label":e[n.descriptionKey],className:"tw:relative tw:ms-1 tw:size-5 tw:align-middle",children:t.jsx(je,{className:"tw:size-3.5"})})}),t.jsx(Ue,{children:e[n.descriptionKey]})]})]}),!n.isEnabled&&t.jsx(Ee,{variant:"muted",children:e["%paratextRegistration_internetUse_comingSoon%"]})]}),t.jsx("span",{id:c(n.value),className:"tw:sr-only",children:e[n.descriptionKey]})]})]},n.value))})})]})}E.__docgenInfo={description:`The five internet-access options as radio rows. Each row's description sits behind an info icon
button, revealed as a tooltip on hover or keyboard focus.

The descriptions run to two sentences — longer than \`Guidelines/Tooltips\` allows a tooltip on a
control, and within the one-to-two sentences the guidelines allow an info icon button's tooltip.
That allowance and the info icon button pattern are defined in \`Guidelines/Providing Help\`, added
by paranext-core PR #2787 (open as of 2026-09-11).

@experimental This export is unstable and may change shape or disappear without notice`,methods:[],displayName:"InternetAccessOptionList",props:{localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:"Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`."},value:{required:!0,tsType:{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},description:"The currently selected internet use value."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: InternetUse) => void",signature:{arguments:[{type:{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},name:"value"}],return:{name:"void"}}},description:"Called when the user selects an active (non-coming-soon) option."},disabled:{required:!0,tsType:{name:"boolean"},description:"When true, all rows are non-interactive (loading or saving in progress)."}}};const{expect:d,waitFor:Ae,within:B}=__STORYBOOK_MODULE_TEST__,T={"%paratextRegistration_description_internetUse_option_Enabled_2%":"Unrestricted","%paratextRegistration_description_internetUse_option_Enabled_details%":"Allows Paratext to use the internet for all services: Registry, Send/Receive, and resource downloads.","%paratextRegistration_description_internetUse_option_VpnRequired_2%":"Disable access to some Bible translation services","%paratextRegistration_description_internetUse_option_VpnRequired_details%":"Disables access to Registry, Send/Receive, and the Digital Bible Library within the Paratext app. Other internet features and other applications are not affected.","%paratextRegistration_description_internetUse_option_Disabled_2%":"Disable ALL internet access","%paratextRegistration_description_internetUse_option_Disabled_details%":"Blocks all internet access within the Paratext app. Other applications on your computer are not affected.","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%":"Block internet when in sensitive locations","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%":"Automatically blocks Paratext internet access in configured sensitive areas.","%paratextRegistration_description_internetUse_option_ProxyOnly_2%":"Configure proxy","%paratextRegistration_description_internetUse_option_ProxyOnly_details%":"Routes Paratext internet traffic through a configured proxy server.","%paratextRegistration_internetUse_comingSoon%":"Coming soon","%paratextRegistration_internetUse_unsupportedSelection_title%":"This internet setting is not supported yet","%paratextRegistration_internetUse_unsupportedSelection_description%":"Your Paratext internet settings have “{selectedOption}” selected. This version of Paratext does not support that option yet, so choose one of the available options to continue."},R=T["%paratextRegistration_description_internetUse_option_Enabled_details%"];function s(e){const{initialValue:i,...o}=e,[a,r]=xe.useState(i);return t.jsx(E,{...o,value:a,onChange:r})}const yt={title:"Advanced/InternetAccessOptionList",component:E,tags:["autodocs"],args:{localizedStrings:T,disabled:!1},parameters:{docs:{description:{component:`Each option's description sits behind an info icon button beside its label, revealed as a tooltip
on hover or keyboard focus, rather than under the label as body copy — which kept the list from
becoming five stacked paragraphs of small grey text. The button carries the description as its
accessible name and is its own tab stop, so the description is reachable on every row, including
the "Coming soon" rows whose radios are disabled. A visually-hidden copy of the same description
is also wired to each radio via \`aria-describedby\`, so a screen reader moving through the radios
hears it too.`}}}},u={render:e=>t.jsx(s,{...e,initialValue:"Enabled"})};async function ye(e){await Ae(()=>{const i=document.querySelector('[data-slot="tooltip-content"]');d(i).toBeInTheDocument(),d(i).toHaveTextContent(e)})}const m={render:e=>t.jsx(s,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{await i.hover(B(e).getByRole("button",{name:R})),await ye(R)}},h={render:e=>t.jsx(s,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{const o=T["%paratextRegistration_description_internetUse_option_Disabled_details%"];await i.tab(),await i.tab(),await i.tab(),await i.tab(),await d(B(e).getByRole("button",{name:o})).toHaveFocus(),await ye(o)}},g={render:e=>t.jsx(s,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{const o=B(e),a=o.getByRole("button",{name:R}),r=a.getBoundingClientRect(),p=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);await d(a.contains(p)).toBe(!0);const c=o.getByRole("radio",{name:"Disable access to some Bible translation services"}),f=c.closest("div");if(!f)throw new Error("expected the radio to sit inside its row");const l=f.getBoundingClientRect(),n=document.elementFromPoint(l.right-4,l.top+l.height/2);if(!(n instanceof HTMLElement))throw new Error("expected an element at the far end of the row");await d(n).toHaveAttribute("for",c.id),await i.click(n),await d(c).toBeChecked()}},b={render:e=>t.jsx("div",{className:"tw:w-[380px]",children:t.jsx(s,{...e,initialValue:"Enabled"})})},_={render:e=>t.jsx(s,{...e,initialValue:"VpnRequired"})},w={render:e=>t.jsx(s,{...e,initialValue:"Disabled"})},x={render:e=>t.jsx(s,{...e,initialValue:"ProxyOnly"})},y={render:e=>t.jsx(s,{...e,initialValue:"VpnRequired"}),args:{disabled:!0}};var O,C,D,U,P;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />
}`,...(D=(C=u.parameters)==null?void 0:C.docs)==null?void 0:D.source},description:{story:`Option 1 (Unrestricted) selected — active row, no description shown until its info button is
used.`,...(P=(U=u.parameters)==null?void 0:U.docs)==null?void 0:P.description}}};var V,j,I,N,k;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />,
  play: async ({
    canvasElement,
    userEvent
  }) => {
    await userEvent.hover(within(canvasElement).getByRole('button', {
      name: ENABLED_DESCRIPTION
    }));
    await expectVisibleTooltip(ENABLED_DESCRIPTION);
  }
}`,...(I=(j=m.parameters)==null?void 0:j.docs)==null?void 0:I.source},description:{story:"Hovering an option's info button opens its description tooltip.",...(k=(N=m.parameters)==null?void 0:N.docs)==null?void 0:k.description}}};var A,L,K,q,F;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />,
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const comingSoonDescription = localizedStrings['%paratextRegistration_description_internetUse_option_Disabled_details%'];
    await userEvent.tab(); // the checked radio
    await userEvent.tab(); // Unrestricted's info button
    await userEvent.tab(); // "Disable access to some Bible translation services" info button
    await userEvent.tab(); // "Disable ALL internet access" info button, on a "Coming soon" row
    await expect(within(canvasElement).getByRole('button', {
      name: comingSoonDescription
    })).toHaveFocus();
    await expectVisibleTooltip(comingSoonDescription);
  }
}`,...(K=(L=h.parameters)==null?void 0:L.docs)==null?void 0:K.source},description:{story:`The same descriptions are reachable without a mouse, on every row. Tabbing into the group lands
on the checked radio, and each info button after it is a tab stop of its own — so a "Coming soon"
row's description opens even though its disabled radio never takes focus.

The mirror image — the panel's programmatic focus on the checked radio revealing nothing — is
asserted in a real browser by the \`internet-settings\` Playwright spec.`,...(F=(q=h.parameters)==null?void 0:q.docs)==null?void 0:F.description}}};var H,G,M,Y,$;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />,
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const canvas = within(canvasElement);
    const infoButton = canvas.getByRole('button', {
      name: ENABLED_DESCRIPTION
    });
    const buttonBox = infoButton.getBoundingClientRect();
    const hitOnButton = document.elementFromPoint(buttonBox.left + buttonBox.width / 2, buttonBox.top + buttonBox.height / 2);
    await expect(infoButton.contains(hitOnButton)).toBe(true);
    const radio = canvas.getByRole('radio', {
      name: 'Disable access to some Bible translation services'
    });
    const row = radio.closest('div');
    if (!row) throw new Error('expected the radio to sit inside its row');
    const rowBox = row.getBoundingClientRect();
    // The far end of the row, past both the label's text and its info button.
    const hitOnRowEnd = document.elementFromPoint(rowBox.right - 4, rowBox.top + rowBox.height / 2);
    if (!(hitOnRowEnd instanceof HTMLElement)) throw new Error('expected an element at the far end of the row');
    await expect(hitOnRowEnd).toHaveAttribute('for', radio.id);
    await userEvent.click(hitOnRowEnd);
    await expect(radio).toBeChecked();
  }
}`,...(M=(G=g.parameters)==null?void 0:G.docs)==null?void 0:M.source},description:{story:`Each label's click target stretches over its whole row, so clicking anywhere on a row selects its
option. The info button has to sit above that target, or a click meant for the description would
select the option instead. Both are hit-tested against real layout, which jsdom lacks.`,...($=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:$.description}}};var W,z,J,Q,X;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <div className="tw:w-[380px]">
      <Controlled {...args} initialValue="Enabled" />
    </div>
}`,...(J=(z=b.parameters)==null?void 0:z.docs)==null?void 0:J.source},description:{story:`Roughly the width the first-run wizard gives this list, where the longer labels wrap onto a
second line. The info button stays with its label's last word instead of drifting out to the
row's edge next to the "Coming soon" badge, which reads as if it belonged to the badge.`,...(X=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:X.description}}};var Z,ee,te,ne,ie;_.parameters={..._.parameters,docs:{...(Z=_.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="VpnRequired" />
}`,...(te=(ee=_.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:'Option 2 selected — "Disable access to some Bible translation services".',...(ie=(ne=_.parameters)==null?void 0:ne.docs)==null?void 0:ie.description}}};var oe,ae,se,re,le;w.parameters={...w.parameters,docs:{...(oe=w.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Disabled" />
}`,...(se=(ae=w.parameters)==null?void 0:ae.docs)==null?void 0:se.source},description:{story:`A coming-soon value is the current setting — \`InternetSettings.xml\` is seeded once from a
co-installed Paratext 9 on first launch, so it can name an option this app does not implement
yet. The row renders selected-but-disabled so the carried-over setting is visible rather than
silently swapped, and a banner says why nothing acts on it.`,...(le=(re=w.parameters)==null?void 0:re.docs)==null?void 0:le.description}}};var ce,de,pe,ue,me;x.parameters={...x.parameters,docs:{...(ce=x.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="ProxyOnly" />
}`,...(pe=(de=x.parameters)==null?void 0:de.docs)==null?void 0:pe.source},description:{story:'The other unsupported value a settings file can carry: "Configure proxy".',...(me=(ue=x.parameters)==null?void 0:ue.docs)==null?void 0:me.description}}};var he,ge,be,_e,we;y.parameters={...y.parameters,docs:{...(he=y.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="VpnRequired" />,
  args: {
    disabled: true
  }
}`,...(be=(ge=y.parameters)==null?void 0:ge.docs)==null?void 0:be.source},description:{story:`All radios non-interactive — simulates the loading or saving state. The info buttons stay usable,
since the descriptions explain the options rather than being part of the setting.`,...(we=(_e=y.parameters)==null?void 0:_e.docs)==null?void 0:we.description}}};const vt=["Unrestricted","DescriptionTooltipOnHover","DescriptionTooltipOnKeyboardFocus","RowClickTargets","NarrowColumn","DisabledAccess","ComingSoonSelected","ComingSoonProxySelected","FormDisabled"];export{x as ComingSoonProxySelected,w as ComingSoonSelected,m as DescriptionTooltipOnHover,h as DescriptionTooltipOnKeyboardFocus,_ as DisabledAccess,y as FormDisabled,b as NarrowColumn,g as RowClickTargets,u as Unrestricted,vt as __namedExportsOrder,yt as default};
