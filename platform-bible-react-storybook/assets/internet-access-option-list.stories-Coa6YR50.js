import{r as Be,j as t}from"./iframe-rLF9vsh8.js";import{A as Se,a as Ce,b as Oe}from"./alert-BEojP0RV.js";import{B as De}from"./badge-naLI0-Us.js";import{B as Ue}from"./button-B5x4nOPy.js";import{R as Ve,a as je}from"./radio-group-Cl5dAXvg.js";import{T as Pe,a as Ie,b as Ne,c as ke}from"./tooltip-CHEJpKpI.js";import{c as C}from"./utils-BPbySc-g.js";import{t as Ae}from"./index-B0qwtMYq.js";import{T as Le}from"./triangle-alert-ChRGTlz6.js";import{I as Ke}from"./info-BBoJVQoh.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-BghdBo9n.js";import"./index-C544dqB2.js";import"./index-C6VhfXcK.js";import"./index-d-katl-A.js";import"./index-BAd_bxPv.js";import"./index-D3TIcJfT.js";import"./index-B1kDWQf8.js";import"./index-Wo3QQhJE.js";import"./index-DLiGhJQB.js";import"./index-DT8e0yhB.js";import"./index-BjEgfOcq.js";import"./index-DZeVYwCK.js";import"./z-index-DiGYIwoM.js";import"./portal-container.context-uLX-WK0m.js";import"./index-KM8q9xSZ.js";import"./index-C_Zu7waH.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-xS_4aRd8.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./createLucideIcon-ryJjTFAX.js";const qe=300,v=[{value:"Enabled",labelKey:"%paratextRegistration_description_internetUse_option_Enabled_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_Enabled_details_2%",isEnabled:!0},{value:"VpnRequired",labelKey:"%paratextRegistration_description_internetUse_option_VpnRequired_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_VpnRequired_details_2%",isEnabled:!0},{value:"Disabled",labelKey:"%paratextRegistration_description_internetUse_option_Disabled_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_Disabled_details%",isEnabled:!1},{value:"BlockInSensitiveLocations",labelKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%",descriptionKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%",isEnabled:!1},{value:"ProxyOnly",labelKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_details%",isEnabled:!1}],Fe=e=>v.some(i=>i.value!=="BlockInSensitiveLocations"&&i.value===e);function He(e){return v.some(i=>i.value===e&&i.isEnabled)}[...v.flatMap(e=>[e.labelKey,e.descriptionKey])];function B({localizedStrings:e,value:i,onChange:a,disabled:s}){const r=Be.useId(),p=n=>`${r}-${n}`,c=n=>`${p(n)}-description`,R=i!==void 0&&!He(i),l=v.find(n=>n.value===i);return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-1",children:[R&&t.jsxs(Se,{role:"status",className:"tw:mb-2",children:[t.jsx(Le,{}),t.jsx(Ce,{children:e["%paratextRegistration_internetUse_unsupportedSelection_title%"]}),t.jsx(Oe,{children:Ae(e["%paratextRegistration_internetUse_unsupportedSelection_description%"]??"",{selectedOption:l?e[l.labelKey]??l.value:i})})]}),t.jsx(Pe,{delayDuration:qe,children:t.jsx(Ve,{value:i??"",onValueChange:n=>{Fe(n)&&a(n)},disabled:s,children:v.map(n=>t.jsxs("div",{className:C("tw:relative tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5",!s&&n.isEnabled&&"tw:hover:bg-accent"),children:[t.jsx(je,{value:n.value,id:p(n.value),"aria-describedby":c(n.value),disabled:s||!n.isEnabled,className:"tw:mt-0.5"}),t.jsxs("div",{className:"tw:flex tw:flex-1 tw:flex-col",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between tw:gap-2",children:[t.jsxs("div",{className:"tw:flex-1 tw:text-sm",children:[t.jsx("label",{htmlFor:p(n.value),"aria-disabled":!n.isEnabled||void 0,className:C("tw:font-medium tw:after:absolute tw:after:inset-0",n.isEnabled&&!s?"tw:cursor-pointer":"tw:cursor-not-allowed tw:text-muted-foreground"),children:e[n.labelKey]}),t.jsxs(Ie,{children:[t.jsx(Ne,{asChild:!0,children:t.jsx(Ue,{variant:"ghost",size:"icon","aria-label":e[n.descriptionKey],className:"tw:relative tw:ms-1 tw:size-5 tw:align-middle",children:t.jsx(Ke,{className:"tw:size-3.5"})})}),t.jsx(ke,{children:e[n.descriptionKey]})]})]}),!n.isEnabled&&t.jsx(De,{variant:"muted",children:e["%paratextRegistration_internetUse_comingSoon%"]})]}),t.jsx("span",{id:c(n.value),className:"tw:sr-only",children:e[n.descriptionKey]})]})]},n.value))})})]})}B.__docgenInfo={description:`The five internet-access options as radio rows. Each row's description sits behind an info icon
button, revealed as a tooltip on hover or keyboard focus.

The descriptions run to two sentences — longer than \`Guidelines/Tooltips\` allows a tooltip on a
control, and within the one-to-two sentences the guidelines allow an info icon button's tooltip.
That allowance and the info icon button pattern are defined in \`Guidelines/Providing Help\`, added
by paranext-core PR #2787 (open as of 2026-09-11).

@experimental This export is unstable and may change shape or disappear without notice`,methods:[],displayName:"InternetAccessOptionList",props:{localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:"Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`."},value:{required:!0,tsType:{name:"union",raw:"InternetUse | undefined",elements:[{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},{name:"undefined"}]},description:"The currently selected internet use value, or `undefined` to select no option — for a caller\nthat needs the user to make an explicit choice rather than accept the stored value."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: InternetUse) => void",signature:{arguments:[{type:{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},name:"value"}],return:{name:"void"}}},description:"Called when the user selects an active (non-coming-soon) option."},disabled:{required:!0,tsType:{name:"boolean"},description:"When true, all rows are non-interactive (loading or saving in progress)."}}};const{expect:d,waitFor:Ge,within:T}=__STORYBOOK_MODULE_TEST__,S={"%paratextRegistration_description_internetUse_option_Enabled_2%":"Unrestricted","%paratextRegistration_description_internetUse_option_Enabled_details_2%":"Allows Paratext to use the internet for all services: Registry, sync, and resource downloads.","%paratextRegistration_description_internetUse_option_VpnRequired_2%":"Disable access to some Bible translation services","%paratextRegistration_description_internetUse_option_VpnRequired_details_2%":"Disables access to Registry, sync, and the Digital Bible Library within the Paratext app. Other internet features and other applications are not affected.","%paratextRegistration_description_internetUse_option_Disabled_2%":"Disable ALL internet access","%paratextRegistration_description_internetUse_option_Disabled_details%":"Blocks all internet access within the Paratext app. Other applications on your computer are not affected.","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%":"Block internet when in sensitive locations","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%":"Automatically blocks Paratext internet access in configured sensitive areas.","%paratextRegistration_description_internetUse_option_ProxyOnly_2%":"Configure proxy","%paratextRegistration_description_internetUse_option_ProxyOnly_details%":"Routes Paratext internet traffic through a configured proxy server.","%paratextRegistration_internetUse_comingSoon%":"Coming soon","%paratextRegistration_internetUse_unsupportedSelection_title%":"This internet setting is not supported yet","%paratextRegistration_internetUse_unsupportedSelection_description%":"Your Paratext internet settings have “{selectedOption}” selected. This version of Paratext does not support that option yet, so choose one of the available options to continue."},E=S["%paratextRegistration_description_internetUse_option_Enabled_details_2%"];function o(e){const{initialValue:i,...a}=e,[s,r]=Be.useState(i);return t.jsx(B,{...a,value:s,onChange:r})}const Bt={title:"Advanced/InternetAccessOptionList",component:B,tags:["autodocs"],args:{localizedStrings:S,disabled:!1},parameters:{docs:{description:{component:`Each option's description sits behind an info icon button beside its label, revealed as a tooltip
on hover or keyboard focus, rather than under the label as body copy — which kept the list from
becoming five stacked paragraphs of small grey text. The button carries the description as its
accessible name and is its own tab stop, so the description is reachable on every row, including
the "Coming soon" rows whose radios are disabled. A visually-hidden copy of the same description
is also wired to each radio via \`aria-describedby\`, so a screen reader moving through the radios
hears it too.`}}}},u={render:e=>t.jsx(o,{...e,initialValue:"Enabled"})};async function Te(e){await Ge(()=>{const i=document.querySelector('[data-slot="tooltip-content"]');d(i).toBeInTheDocument(),d(i).toHaveTextContent(e)})}const m={render:e=>t.jsx(o,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{await i.hover(T(e).getByRole("button",{name:E})),await Te(E)}},h={render:e=>t.jsx(o,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{const a=S["%paratextRegistration_description_internetUse_option_Disabled_details%"];await i.tab(),await i.tab(),await i.tab(),await i.tab(),await d(T(e).getByRole("button",{name:a})).toHaveFocus(),await Te(a)}},g={render:e=>t.jsx(o,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{const a=T(e),s=a.getByRole("button",{name:E}),r=s.getBoundingClientRect(),p=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);await d(s.contains(p)).toBe(!0);const c=a.getByRole("radio",{name:"Disable access to some Bible translation services"}),R=c.closest("div");if(!R)throw new Error("expected the radio to sit inside its row");const l=R.getBoundingClientRect(),n=document.elementFromPoint(l.right-4,l.top+l.height/2);if(!(n instanceof HTMLElement))throw new Error("expected an element at the far end of the row");await d(n).toHaveAttribute("for",c.id),await i.click(n),await d(c).toBeChecked()}},b={render:e=>t.jsx("div",{className:"tw:w-[380px]",children:t.jsx(o,{...e,initialValue:"Enabled"})})},_={render:e=>t.jsx(o,{...e,initialValue:"VpnRequired"})},w={render:e=>t.jsx(o,{...e,initialValue:void 0})},x={render:e=>t.jsx(o,{...e,initialValue:"Disabled"})},y={render:e=>t.jsx(o,{...e,initialValue:"ProxyOnly"})},f={render:e=>t.jsx(o,{...e,initialValue:"VpnRequired"}),args:{disabled:!0}};var O,D,U,V,j;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />
}`,...(U=(D=u.parameters)==null?void 0:D.docs)==null?void 0:U.source},description:{story:`Option 1 (Unrestricted) selected — active row, no description shown until its info button is
used.`,...(j=(V=u.parameters)==null?void 0:V.docs)==null?void 0:j.description}}};var P,I,N,k,A;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(N=(I=m.parameters)==null?void 0:I.docs)==null?void 0:N.source},description:{story:"Hovering an option's info button opens its description tooltip.",...(A=(k=m.parameters)==null?void 0:k.docs)==null?void 0:A.description}}};var L,K,q,F,H;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:q.source},description:{story:`The same descriptions are reachable without a mouse, on every row. Tabbing into the group lands
on the checked radio, and each info button after it is a tab stop of its own — so a "Coming soon"
row's description opens even though its disabled radio never takes focus.

The mirror image — the panel's programmatic focus on the checked radio revealing nothing — is
asserted in a real browser by the \`internet-settings\` Playwright spec.`,...(H=(F=h.parameters)==null?void 0:F.docs)==null?void 0:H.description}}};var G,M,Y,$,z;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(Y=(M=g.parameters)==null?void 0:M.docs)==null?void 0:Y.source},description:{story:`Each label's click target stretches over its whole row, so clicking anywhere on a row selects its
option. The info button has to sit above that target, or a click meant for the description would
select the option instead. Both are hit-tested against real layout, which jsdom lacks.`,...(z=($=g.parameters)==null?void 0:$.docs)==null?void 0:z.description}}};var W,J,Q,X,Z;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <div className="tw:w-[380px]">
      <Controlled {...args} initialValue="Enabled" />
    </div>
}`,...(Q=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:`Roughly the width the first-run wizard gives this list, where the longer labels wrap onto a
second line. The info button stays with its label's last word instead of drifting out to the
row's edge next to the "Coming soon" badge, which reads as if it belonged to the badge.`,...(Z=(X=b.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var ee,te,ne,ie,oe;_.parameters={..._.parameters,docs:{...(ee=_.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="VpnRequired" />
}`,...(ne=(te=_.parameters)==null?void 0:te.docs)==null?void 0:ne.source},description:{story:'Option 2 selected — "Disable access to some Bible translation services".',...(oe=(ie=_.parameters)==null?void 0:ie.docs)==null?void 0:oe.description}}};var ae,se,re,le,ce;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue={undefined} />
}`,...(re=(se=w.parameters)==null?void 0:se.docs)==null?void 0:re.source},description:{story:`No option selected — how the first-run wizard shows the list until the user picks one, so a
stored value they never chose is not presented as their choice. No banner: nothing unsupported is
selected.`,...(ce=(le=w.parameters)==null?void 0:le.docs)==null?void 0:ce.description}}};var de,pe,ue,me,he;x.parameters={...x.parameters,docs:{...(de=x.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Disabled" />
}`,...(ue=(pe=x.parameters)==null?void 0:pe.docs)==null?void 0:ue.source},description:{story:`A coming-soon value is the current setting — \`InternetSettings.xml\` is seeded once from a
co-installed Paratext 9 on first launch, so it can name an option this app does not implement
yet. The row renders selected-but-disabled so the carried-over setting is visible rather than
silently swapped, and a banner says why nothing acts on it.`,...(he=(me=x.parameters)==null?void 0:me.docs)==null?void 0:he.description}}};var ge,be,_e,we,xe;y.parameters={...y.parameters,docs:{...(ge=y.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="ProxyOnly" />
}`,...(_e=(be=y.parameters)==null?void 0:be.docs)==null?void 0:_e.source},description:{story:'The other unsupported value a settings file can carry: "Configure proxy".',...(xe=(we=y.parameters)==null?void 0:we.docs)==null?void 0:xe.description}}};var ye,fe,ve,Re,Ee;f.parameters={...f.parameters,docs:{...(ye=f.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="VpnRequired" />,
  args: {
    disabled: true
  }
}`,...(ve=(fe=f.parameters)==null?void 0:fe.docs)==null?void 0:ve.source},description:{story:`All radios non-interactive — simulates the loading or saving state. The info buttons stay usable,
since the descriptions explain the options rather than being part of the setting.`,...(Ee=(Re=f.parameters)==null?void 0:Re.docs)==null?void 0:Ee.description}}};const Tt=["Unrestricted","DescriptionTooltipOnHover","DescriptionTooltipOnKeyboardFocus","RowClickTargets","NarrowColumn","DisabledAccess","NothingSelected","ComingSoonSelected","ComingSoonProxySelected","FormDisabled"];export{y as ComingSoonProxySelected,x as ComingSoonSelected,m as DescriptionTooltipOnHover,h as DescriptionTooltipOnKeyboardFocus,_ as DisabledAccess,f as FormDisabled,b as NarrowColumn,w as NothingSelected,g as RowClickTargets,u as Unrestricted,Tt as __namedExportsOrder,Bt as default};
