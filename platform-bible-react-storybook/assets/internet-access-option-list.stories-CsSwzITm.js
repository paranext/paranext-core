import{r as Be,j as t}from"./iframe-BviFMyD8.js";import{A as Oe,a as De,b as Ue}from"./alert-CH3tswVd.js";import{B as Se}from"./badge-CgkqJlC9.js";import{B as Ce}from"./button-DO99NKV2.js";import{R as Ve,a as Ne}from"./radio-group-MUXqMTw-.js";import{T as je,a as Pe,b as Ie,c as ke}from"./tooltip-Cd07mrQf.js";import{c as D}from"./utils-BPbySc-g.js";import{t as Ae}from"./index-CDH2oUpg.js";import{T as Le}from"./triangle-alert-DhVNWmLX.js";import{I as Ke}from"./info-CaQZ3AFW.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-B36jDClP.js";import"./index-CvEozBId.js";import"./index-Y9nnsuhJ.js";import"./index-Cei7ViKf.js";import"./index-DYwqWE6w.js";import"./index-B06NX8s0.js";import"./index-DBLf6_8g.js";import"./index-CLHmg8ES.js";import"./index-D8WmnGds.js";import"./index-C-GIczWv.js";import"./index-1IQDu7OE.js";import"./index-CkiTBEx7.js";import"./z-index-DiGYIwoM.js";import"./portal-container.context-D7KcjXR7.js";import"./index-C4FdJfsg.js";import"./index-DWYkoCJY.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BnC_qFhR.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./createLucideIcon-Ce9IPsKX.js";const qe=300,f=[{value:"Enabled",labelKey:"%paratextRegistration_description_internetUse_option_Enabled_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_Enabled_details_2%",isEnabled:!0},{value:"VpnRequired",labelKey:"%paratextRegistration_description_internetUse_option_VpnRequired_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_VpnRequired_details_2%",isEnabled:!0},{value:"Disabled",labelKey:"%paratextRegistration_description_internetUse_option_Disabled_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_Disabled_details%",isEnabled:!1},{value:"BlockInSensitiveLocations",labelKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%",descriptionKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%",isEnabled:!1},{value:"ProxyOnly",labelKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_details%",isEnabled:!1}],Fe=e=>f.some(i=>i.value!=="BlockInSensitiveLocations"&&i.value===e);function He(e){return f.some(i=>i.value===e&&i.isEnabled)}[...f.flatMap(e=>[e.labelKey,e.descriptionKey])];function B({localizedStrings:e,value:i,onChange:o,disabled:s}){const r=Be.useId(),p=n=>`${r}-${n}`,c=n=>`${p(n)}-description`,R=i!==void 0&&!He(i),l=f.find(n=>n.value===i);return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-1",children:[R&&t.jsxs(Oe,{role:"status",className:"tw:mb-2",children:[t.jsx(Le,{}),t.jsx(De,{children:e["%paratextRegistration_internetUse_unsupportedSelection_title%"]}),t.jsx(Ue,{children:Ae(e["%paratextRegistration_internetUse_unsupportedSelection_description%"]??"",{selectedOption:l?e[l.labelKey]??l.value:i})})]}),t.jsx(je,{delayDuration:qe,children:t.jsx(Ve,{value:i??"",onValueChange:n=>{Fe(n)&&o(n)},disabled:s,children:f.map(n=>t.jsxs("div",{className:D("tw:relative tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5",!s&&n.isEnabled&&"tw:hover:bg-accent"),children:[t.jsx(Ne,{value:n.value,id:p(n.value),"aria-describedby":c(n.value),disabled:s||!n.isEnabled,className:"tw:mt-0.5"}),t.jsxs("div",{className:"tw:flex tw:flex-1 tw:flex-col",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between tw:gap-2",children:[t.jsxs("div",{className:"tw:flex-1 tw:text-sm",children:[t.jsx("label",{htmlFor:p(n.value),"aria-disabled":!n.isEnabled||void 0,className:D("tw:font-medium tw:after:absolute tw:after:inset-0",n.isEnabled&&!s?"tw:cursor-pointer":"tw:cursor-not-allowed tw:text-muted-foreground"),children:e[n.labelKey]}),t.jsxs(Pe,{children:[t.jsx(Ie,{asChild:!0,children:t.jsx(Ce,{variant:"ghost",size:"icon","aria-label":e[n.descriptionKey],className:"tw:relative tw:ms-1 tw:size-5 tw:align-middle",children:t.jsx(Ke,{className:"tw:size-3.5"})})}),t.jsx(ke,{children:e[n.descriptionKey]})]})]}),!n.isEnabled&&t.jsx(Se,{variant:"muted",children:e["%paratextRegistration_internetUse_notYetAvailable%"]})]}),t.jsx("span",{id:c(n.value),className:"tw:sr-only",children:e[n.descriptionKey]})]})]},n.value))})})]})}B.__docgenInfo={description:`The five internet-access options as radio rows. Each row's description sits behind an info icon
button, revealed as a tooltip on hover or keyboard focus.

The descriptions run to two sentences — longer than \`Guidelines/Tooltips\` allows a tooltip on a
control, and within the one-to-two sentences the guidelines allow an info icon button's tooltip.
That allowance and the info icon button pattern are defined in \`Guidelines/Providing Help\`, added
by paranext-core PR #2787 (open as of 2026-09-11).

@experimental This export is unstable and may change shape or disappear without notice`,methods:[],displayName:"InternetAccessOptionList",props:{localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:"Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`."},value:{required:!0,tsType:{name:"union",raw:"InternetUse | undefined",elements:[{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},{name:"undefined"}]},description:"The currently selected internet use value, or `undefined` to select no option — for a caller\nthat needs the user to make an explicit choice rather than accept the stored value."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: InternetUse) => void",signature:{arguments:[{type:{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},name:"value"}],return:{name:"void"}}},description:"Called when the user selects an active (available) option."},disabled:{required:!0,tsType:{name:"boolean"},description:"When true, all rows are non-interactive (loading or saving in progress)."}}};const{expect:d,waitFor:Ye,within:T}=__STORYBOOK_MODULE_TEST__,O={"%paratextRegistration_description_internetUse_option_Enabled_2%":"Unrestricted","%paratextRegistration_description_internetUse_option_Enabled_details_2%":"Allows Paratext to use the internet for all services: Registry, sync, and resource downloads.","%paratextRegistration_description_internetUse_option_VpnRequired_2%":"Disable access to some Bible translation services","%paratextRegistration_description_internetUse_option_VpnRequired_details_2%":"Disables access to Registry, sync, and the Digital Bible Library within the Paratext app. Other internet features and other applications are not affected.","%paratextRegistration_description_internetUse_option_Disabled_2%":"Disable ALL internet access","%paratextRegistration_description_internetUse_option_Disabled_details%":"Blocks all internet access within the Paratext app. Other applications on your computer are not affected.","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%":"Block internet when in sensitive locations","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%":"Automatically blocks Paratext internet access in configured sensitive areas.","%paratextRegistration_description_internetUse_option_ProxyOnly_2%":"Configure proxy","%paratextRegistration_description_internetUse_option_ProxyOnly_details%":"Routes Paratext internet traffic through a configured proxy server.","%paratextRegistration_internetUse_notYetAvailable%":"Not yet available","%paratextRegistration_internetUse_unsupportedSelection_title%":"This internet setting is not supported yet","%paratextRegistration_internetUse_unsupportedSelection_description%":"Your Paratext internet settings have “{selectedOption}” selected. This version of Paratext does not support that option yet, so choose one of the available options to continue."},E=O["%paratextRegistration_description_internetUse_option_Enabled_details_2%"];function a(e){const{initialValue:i,...o}=e,[s,r]=Be.useState(i);return t.jsx(B,{...o,value:s,onChange:r})}const Bt={title:"Advanced/InternetAccessOptionList",component:B,tags:["autodocs"],args:{localizedStrings:O,disabled:!1},parameters:{docs:{description:{component:`Each option's description sits behind an info icon button beside its label, revealed as a tooltip
on hover or keyboard focus, rather than under the label as body copy — which kept the list from
becoming five stacked paragraphs of small grey text. The button carries the description as its
accessible name and is its own tab stop, so the description is reachable on every row, including
the "Not yet available" rows whose radios are disabled. A visually-hidden copy of the same
description is also wired to each radio via \`aria-describedby\`, so a screen reader moving through
the radios hears it too.`}}}},u={render:e=>t.jsx(a,{...e,initialValue:"Enabled"})};async function Te(e){await Ye(()=>{const i=document.querySelector('[data-slot="tooltip-content"]');d(i).toBeInTheDocument(),d(i).toHaveTextContent(e)})}const m={render:e=>t.jsx(a,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{await i.hover(T(e).getByRole("button",{name:E})),await Te(E)}},h={render:e=>t.jsx(a,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{const o=O["%paratextRegistration_description_internetUse_option_Disabled_details%"];await i.tab(),await i.tab(),await i.tab(),await i.tab(),await d(T(e).getByRole("button",{name:o})).toHaveFocus(),await Te(o)}},b={render:e=>t.jsx(a,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:i})=>{const o=T(e),s=o.getByRole("button",{name:E}),r=s.getBoundingClientRect(),p=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);await d(s.contains(p)).toBe(!0);const c=o.getByRole("radio",{name:"Disable access to some Bible translation services"}),R=c.closest("div");if(!R)throw new Error("expected the radio to sit inside its row");const l=R.getBoundingClientRect(),n=document.elementFromPoint(l.right-4,l.top+l.height/2);if(!(n instanceof HTMLElement))throw new Error("expected an element at the far end of the row");await d(n).toHaveAttribute("for",c.id),await i.click(n),await d(c).toBeChecked()}},g={render:e=>t.jsx("div",{className:"tw:w-[380px]",children:t.jsx(a,{...e,initialValue:"Enabled"})})},_={render:e=>t.jsx(a,{...e,initialValue:"VpnRequired"})},w={render:e=>t.jsx(a,{...e,initialValue:void 0})},v={render:e=>t.jsx(a,{...e,initialValue:"Disabled"})},x={render:e=>t.jsx(a,{...e,initialValue:"ProxyOnly"})},y={render:e=>t.jsx(a,{...e,initialValue:"VpnRequired"}),args:{disabled:!0}};var U,S,C,V,N;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />
}`,...(C=(S=u.parameters)==null?void 0:S.docs)==null?void 0:C.source},description:{story:`Option 1 (Unrestricted) selected — active row, no description shown until its info button is
used.`,...(N=(V=u.parameters)==null?void 0:V.docs)==null?void 0:N.description}}};var j,P,I,k,A;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(I=(P=m.parameters)==null?void 0:P.docs)==null?void 0:I.source},description:{story:"Hovering an option's info button opens its description tooltip.",...(A=(k=m.parameters)==null?void 0:k.docs)==null?void 0:A.description}}};var L,K,q,F,H;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />,
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const unavailableOptionDescription = localizedStrings['%paratextRegistration_description_internetUse_option_Disabled_details%'];
    await userEvent.tab(); // the checked radio
    await userEvent.tab(); // Unrestricted's info button
    await userEvent.tab(); // "Disable access to some Bible translation services" info button
    await userEvent.tab(); // "Disable ALL internet access" info button, on an unavailable row
    await expect(within(canvasElement).getByRole('button', {
      name: unavailableOptionDescription
    })).toHaveFocus();
    await expectVisibleTooltip(unavailableOptionDescription);
  }
}`,...(q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:q.source},description:{story:`The same descriptions are reachable without a mouse, on every row. Tabbing into the group lands
on the checked radio, and each info button after it is a tab stop of its own — so a "Not yet
available" row's description opens even though its disabled radio never takes focus.

The mirror image — the panel's programmatic focus on the checked radio revealing nothing — is
asserted in a real browser by the \`internet-settings\` Playwright spec.`,...(H=(F=h.parameters)==null?void 0:F.docs)==null?void 0:H.description}}};var Y,G,M,$,z;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(M=(G=b.parameters)==null?void 0:G.docs)==null?void 0:M.source},description:{story:`Each label's click target stretches over its whole row, so clicking anywhere on a row selects its
option. The info button has to sit above that target, or a click meant for the description would
select the option instead. Both are hit-tested against real layout, which jsdom lacks.`,...(z=($=b.parameters)==null?void 0:$.docs)==null?void 0:z.description}}};var W,J,Q,X,Z;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <div className="tw:w-[380px]">
      <Controlled {...args} initialValue="Enabled" />
    </div>
}`,...(Q=(J=g.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:`Roughly the width the first-run wizard gives this list, where the longer labels wrap onto a
second line. The info button stays with its label's last word instead of drifting out to the
row's edge next to the "Not yet available" badge, which reads as if it belonged to the badge.`,...(Z=(X=g.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var ee,te,ne,ie,ae;_.parameters={..._.parameters,docs:{...(ee=_.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="VpnRequired" />
}`,...(ne=(te=_.parameters)==null?void 0:te.docs)==null?void 0:ne.source},description:{story:'Option 2 selected — "Disable access to some Bible translation services".',...(ae=(ie=_.parameters)==null?void 0:ie.docs)==null?void 0:ae.description}}};var oe,se,re,le,ce;w.parameters={...w.parameters,docs:{...(oe=w.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue={undefined} />
}`,...(re=(se=w.parameters)==null?void 0:se.docs)==null?void 0:re.source},description:{story:`No option selected — how the first-run wizard shows the list until the user picks one, so a
stored value they never chose is not presented as their choice. No banner: nothing unsupported is
selected.`,...(ce=(le=w.parameters)==null?void 0:le.docs)==null?void 0:ce.description}}};var de,pe,ue,me,he;v.parameters={...v.parameters,docs:{...(de=v.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Disabled" />
}`,...(ue=(pe=v.parameters)==null?void 0:pe.docs)==null?void 0:ue.source},description:{story:`A not-yet-available value is the current setting — \`InternetSettings.xml\` is seeded once from a
co-installed Paratext 9 on first launch, so it can name an option this app does not implement
yet. The row renders selected-but-disabled so the carried-over setting is visible rather than
silently swapped, and a banner says why nothing acts on it.`,...(he=(me=v.parameters)==null?void 0:me.docs)==null?void 0:he.description}}};var be,ge,_e,we,ve;x.parameters={...x.parameters,docs:{...(be=x.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="ProxyOnly" />
}`,...(_e=(ge=x.parameters)==null?void 0:ge.docs)==null?void 0:_e.source},description:{story:'The other unsupported value a settings file can carry: "Configure proxy".',...(ve=(we=x.parameters)==null?void 0:we.docs)==null?void 0:ve.description}}};var xe,ye,fe,Re,Ee;y.parameters={...y.parameters,docs:{...(xe=y.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="VpnRequired" />,
  args: {
    disabled: true
  }
}`,...(fe=(ye=y.parameters)==null?void 0:ye.docs)==null?void 0:fe.source},description:{story:`All radios non-interactive — simulates the loading or saving state. The info buttons stay usable,
since the descriptions explain the options rather than being part of the setting.`,...(Ee=(Re=y.parameters)==null?void 0:Re.docs)==null?void 0:Ee.description}}};const Tt=["Unrestricted","DescriptionTooltipOnHover","DescriptionTooltipOnKeyboardFocus","RowClickTargets","NarrowColumn","DisabledAccess","NothingSelected","UnavailableOptionSelected","UnavailableProxySelected","FormDisabled"];export{m as DescriptionTooltipOnHover,h as DescriptionTooltipOnKeyboardFocus,_ as DisabledAccess,y as FormDisabled,g as NarrowColumn,w as NothingSelected,b as RowClickTargets,v as UnavailableOptionSelected,x as UnavailableProxySelected,u as Unrestricted,Tt as __namedExportsOrder,Bt as default};
