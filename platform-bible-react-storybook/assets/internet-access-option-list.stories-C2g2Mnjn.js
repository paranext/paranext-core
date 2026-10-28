import{r as Oe,j as t}from"./iframe-D_QaArY6.js";import{A as Ue,a as De,b as Ce}from"./alert-CLsZqbsH.js";import{B as Ne}from"./badge-D097t9LZ.js";import{B as je}from"./button-B7OXSEtf.js";import{R as Pe,a as Ie}from"./radio-group-CZmxWjQU.js";import{T as Ve,a as ke,b as Ae,c as Le}from"./tooltip-Ce8FAwR8.js";import{c as U}from"./utils-BPbySc-g.js";import{t as D}from"./index-B2Agy_j1.js";import{T as Ke}from"./triangle-alert-CE07v3TH.js";import{I as qe}from"./info-BhHrO8IF.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-DNLMwBpt.js";import"./index-Cb7FBU_G.js";import"./index-C57a9V_i.js";import"./index-CPDtzcbO.js";import"./index-Ba2Pbzvh.js";import"./index-CQbJDs8l.js";import"./index-CZwiao3G.js";import"./index-D9DWWWKY.js";import"./index-BI5Lbtku.js";import"./index-Cm9cojJg.js";import"./index-VyAv74S4.js";import"./index-CP3Y5ewV.js";import"./z-index-DiGYIwoM.js";import"./portal-container.context-BXJbxrPo.js";import"./index-DzQKBq-w.js";import"./index-sWqjOPPk.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BoSVLT2z.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./createLucideIcon-BJ5i1ICg.js";const Fe=300,R=[{value:"Enabled",labelKey:"%paratextRegistration_description_internetUse_option_Enabled_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_Enabled_details_2%",isEnabled:!0},{value:"Disabled",labelKey:"%paratextRegistration_description_internetUse_option_VpnRequired_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_DisableSomeServices_details%",isEnabled:!0},{value:"VpnRequired",labelKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%",descriptionKey:"%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%",isEnabled:!1},{value:"ProxyOnly",labelKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_2%",descriptionKey:"%paratextRegistration_description_internetUse_option_ProxyOnly_details%",isEnabled:!1}],He=e=>R.some(n=>n.value===e);function Ye(e){return R.some(n=>n.value===e&&n.isEnabled)}[...R.flatMap(e=>[e.labelKey,e.descriptionKey])];function T({localizedStrings:e,value:n,onChange:o,disabled:s}){const r=Oe.useId(),u=i=>`${r}-${i}`,l=i=>`${u(i)}-description`,c=R.find(i=>i.value===n),m=n!==void 0&&!Ye(n),d=c?e[c.labelKey]??c.value:n;return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-1",children:[m&&t.jsxs(Ue,{role:"status",className:"tw:mb-2",children:[t.jsx(Ke,{}),t.jsx(De,{children:D(e["%paratextRegistration_internetUse_unsupportedSelection_title_2%"]??"",{selectedOption:d})}),t.jsx(Ce,{children:D(e["%paratextRegistration_internetUse_unsupportedSelection_description_2%"]??"",{selectedOption:d})})]}),t.jsx(Ve,{delayDuration:Fe,children:t.jsx(Pe,{value:n??"",onValueChange:i=>{He(i)&&o(i)},disabled:s,children:R.map(i=>t.jsxs("div",{className:U("tw:relative tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5",!s&&i.isEnabled&&"tw:hover:bg-accent"),children:[t.jsx(Ie,{value:i.value,id:u(i.value),"aria-describedby":l(i.value),disabled:s||!i.isEnabled,className:"tw:mt-0.5"}),t.jsxs("div",{className:"tw:flex tw:flex-1 tw:flex-col",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between tw:gap-2",children:[t.jsxs("div",{className:"tw:flex-1 tw:text-sm",children:[t.jsx("label",{htmlFor:u(i.value),"aria-disabled":!i.isEnabled||void 0,className:U("tw:font-medium tw:after:absolute tw:after:inset-0",i.isEnabled&&!s?"tw:cursor-pointer":"tw:cursor-not-allowed tw:text-muted-foreground"),children:e[i.labelKey]}),t.jsxs(ke,{children:[t.jsx(Ae,{asChild:!0,children:t.jsx(je,{variant:"ghost",size:"icon","aria-label":e[i.descriptionKey],className:"tw:relative tw:ms-1 tw:size-5 tw:align-middle",children:t.jsx(qe,{className:"tw:size-3.5"})})}),t.jsx(Le,{children:e[i.descriptionKey]})]})]}),!i.isEnabled&&t.jsx(Ne,{variant:"muted",children:e["%paratextRegistration_internetUse_notYetAvailable%"]})]}),t.jsx("span",{id:l(i.value),className:"tw:sr-only",children:e[i.descriptionKey]})]})]},i.value))})})]})}T.__docgenInfo={description:`The internet-access options as radio rows. Each row's description sits behind an info icon
button, revealed as a tooltip on hover or keyboard focus.

The descriptions run to two sentences — longer than \`Guidelines/Tooltips\` allows a tooltip on a
control, and within the one-to-two sentences the guidelines allow an info icon button's tooltip.
That allowance and the info icon button pattern are defined in \`Guidelines/Providing Help\`, added
by paranext-core PR #2787 (open as of 2026-09-11).

@experimental This export is unstable and may change shape or disappear without notice`,methods:[],displayName:"InternetAccessOptionList",props:{localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:"Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`."},value:{required:!0,tsType:{name:"union",raw:"InternetUse | undefined",elements:[{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},{name:"undefined"}]},description:"The currently selected internet use value, or `undefined` to select no option — for a caller\nthat needs the user to make an explicit choice rather than accept the stored value."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: InternetUse) => void",signature:{arguments:[{type:{name:"union",raw:"'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly'",elements:[{name:"literal",value:"'Enabled'"},{name:"literal",value:"'VpnRequired'"},{name:"literal",value:"'Disabled'"},{name:"literal",value:"'ProxyOnly'"}]},name:"value"}],return:{name:"void"}}},description:"Called when the user selects an active (available) option."},disabled:{required:!0,tsType:{name:"boolean"},description:"When true, all rows are non-interactive (loading or saving in progress)."}}};const{expect:p,waitFor:Ge,within:O}=__STORYBOOK_MODULE_TEST__,S={"%paratextRegistration_description_internetUse_option_Enabled_2%":"Unrestricted","%paratextRegistration_description_internetUse_option_Enabled_details_2%":"Allows Paratext to use the internet for all services: Registry, sync, and resource downloads.","%paratextRegistration_description_internetUse_option_VpnRequired_2%":"Disable access to some Bible translation services","%paratextRegistration_description_internetUse_option_DisableSomeServices_details%":"Disables access to Registry, Send-Receive (sync), and the Digital Bible Library within Paratext 10. Paratext may connect to other internet services! This option will automatically change to “Disable all Internet access” once available.","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%":"Block internet when in sensitive locations","%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%":"Automatically blocks Paratext internet access in configured sensitive areas.","%paratextRegistration_description_internetUse_option_ProxyOnly_2%":"Configure proxy","%paratextRegistration_description_internetUse_option_ProxyOnly_details%":"Routes Paratext internet traffic through a configured proxy server.","%paratextRegistration_internetUse_notYetAvailable%":"Not yet available","%paratextRegistration_internetUse_unsupportedSelection_title_2%":"“{selectedOption}” is not supported yet","%paratextRegistration_internetUse_unsupportedSelection_description_2%":"Choose one of the available options to continue or stop using Paratext 10 until it is supported."},B=S["%paratextRegistration_description_internetUse_option_Enabled_details_2%"];function a(e){const{initialValue:n,...o}=e,[s,r]=Oe.useState(n);return t.jsx(T,{...o,value:s,onChange:r})}const Tt={title:"Advanced/InternetAccessOptionList",component:T,tags:["autodocs"],args:{localizedStrings:S,disabled:!1},parameters:{docs:{description:{component:`Each option's description sits behind an info icon button beside its label, revealed as a tooltip
on hover or keyboard focus, rather than under the label as body copy — which kept the list from
becoming stacked paragraphs of small grey text. The button carries the description as its
accessible name and is its own tab stop, so the description is reachable on every row, including
the "Not yet available" rows whose radios are disabled. A visually-hidden copy of the same
description is also wired to each radio via \`aria-describedby\`, so a screen reader moving through
the radios hears it too.`}}}},h={render:e=>t.jsx(a,{...e,initialValue:"Enabled"})};async function Se(e){await Ge(()=>{const n=document.querySelector('[data-slot="tooltip-content"]');p(n).toBeInTheDocument(),p(n).toHaveTextContent(e)})}const b={render:e=>t.jsx(a,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:n})=>{await n.hover(O(e).getByRole("button",{name:B})),await Se(B)}},g={render:e=>t.jsx(a,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:n})=>{const o=S["%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%"];await n.tab(),await n.tab(),await n.tab(),await n.tab(),await p(O(e).getByRole("button",{name:o})).toHaveFocus(),await Se(o)}},_={render:e=>t.jsx(a,{...e,initialValue:"Enabled"}),play:async({canvasElement:e,userEvent:n})=>{const o=O(e),s=o.getByRole("button",{name:B}),r=s.getBoundingClientRect(),u=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);await p(s.contains(u)).toBe(!0);const l=o.getByRole("radio",{name:"Disable access to some Bible translation services"}),c=l.closest("div");if(!c)throw new Error("expected the radio to sit inside its row");const m=c.getBoundingClientRect(),d=document.elementFromPoint(m.right-4,m.top+m.height/2);if(!(d instanceof HTMLElement))throw new Error("expected an element at the far end of the row");await p(d).toHaveAttribute("for",l.id),await n.click(d),await p(l).toBeChecked()}},w={render:e=>t.jsx("div",{className:"tw:w-[380px]",children:t.jsx(a,{...e,initialValue:"Enabled"})})},v={render:e=>t.jsx(a,{...e,initialValue:"Disabled"})},x={render:e=>t.jsx(a,{...e,initialValue:void 0})},y={render:e=>t.jsx(a,{...e,initialValue:"VpnRequired"})},f={render:e=>t.jsx(a,{...e,initialValue:"ProxyOnly"})},E={render:e=>t.jsx(a,{...e,initialValue:"Enabled"}),args:{disabled:!0}};var C,N,j,P,I;h.parameters={...h.parameters,docs:{...(C=h.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />
}`,...(j=(N=h.parameters)==null?void 0:N.docs)==null?void 0:j.source},description:{story:`Option 1 (Unrestricted) selected — active row, no description shown until its info button is
used.`,...(I=(P=h.parameters)==null?void 0:P.docs)==null?void 0:I.description}}};var V,k,A,L,K;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(A=(k=b.parameters)==null?void 0:k.docs)==null?void 0:A.source},description:{story:"Hovering an option's info button opens its description tooltip.",...(K=(L=b.parameters)==null?void 0:L.docs)==null?void 0:K.description}}};var q,F,H,Y,G;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />,
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const unavailableOptionDescription = localizedStrings['%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%'];
    await userEvent.tab(); // the checked radio
    await userEvent.tab(); // Unrestricted's info button
    await userEvent.tab(); // "Disable access to some Bible translation services" info button
    // "Block internet when in sensitive locations" info button, on an unavailable row
    await userEvent.tab();
    await expect(within(canvasElement).getByRole('button', {
      name: unavailableOptionDescription
    })).toHaveFocus();
    await expectVisibleTooltip(unavailableOptionDescription);
  }
}`,...(H=(F=g.parameters)==null?void 0:F.docs)==null?void 0:H.source},description:{story:`The same descriptions are reachable without a mouse, on every row. Tabbing into the group lands
on the checked radio, and each info button after it is a tab stop of its own — so a "Not yet
available" row's description opens even though its disabled radio never takes focus.

The mirror image — the panel's programmatic focus on the checked radio revealing nothing — is
asserted in a real browser by the \`internet-settings\` Playwright spec.`,...(G=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:G.description}}};var M,$,W,z,J;_.parameters={..._.parameters,docs:{...(M=_.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(W=($=_.parameters)==null?void 0:$.docs)==null?void 0:W.source},description:{story:`Each label's click target stretches over its whole row, so clicking anywhere on a row selects its
option. The info button has to sit above that target, or a click meant for the description would
select the option instead. Both are hit-tested against real layout, which jsdom lacks.`,...(J=(z=_.parameters)==null?void 0:z.docs)==null?void 0:J.description}}};var Q,X,Z,ee,te;w.parameters={...w.parameters,docs:{...(Q=w.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <div className="tw:w-[380px]">
      <Controlled {...args} initialValue="Enabled" />
    </div>
}`,...(Z=(X=w.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:`A narrow column, where the longer labels wrap onto a second line. The info button stays with its
label's last word instead of drifting out to the row's edge next to the "Not yet available"
badge, which reads as if it belonged to the badge.`,...(te=(ee=w.parameters)==null?void 0:ee.docs)==null?void 0:te.description}}};var ne,ie,ae,oe,se;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Disabled" />
}`,...(ae=(ie=v.parameters)==null?void 0:ie.docs)==null?void 0:ae.source},description:{story:'Option 2 selected — "Disable access to some Bible translation services", which saves `Disabled`.',...(se=(oe=v.parameters)==null?void 0:oe.docs)==null?void 0:se.description}}};var re,le,ce,de,pe;x.parameters={...x.parameters,docs:{...(re=x.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue={undefined} />
}`,...(ce=(le=x.parameters)==null?void 0:le.docs)==null?void 0:ce.source},description:{story:`No option selected — for a caller that needs the user to choose rather than accept a stored value
they never chose. No banner: nothing unsupported is selected.`,...(pe=(de=x.parameters)==null?void 0:de.docs)==null?void 0:pe.description}}};var ue,me,he,be,ge;y.parameters={...y.parameters,docs:{...(ue=y.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="VpnRequired" />
}`,...(he=(me=y.parameters)==null?void 0:me.docs)==null?void 0:he.source},description:{story:"A not-yet-available value is the current setting. The row renders selected-but-disabled so the\nstored setting is visible rather than silently swapped, and a banner says why nothing acts on it.\nThe app replaces a stored `VpnRequired` at startup, so this shows only if that fails; see\n`UnavailableProxySelected` for the value a Paratext 9 settings file usually carries.",...(ge=(be=y.parameters)==null?void 0:be.docs)==null?void 0:ge.description}}};var _e,we,ve,xe,ye;f.parameters={...f.parameters,docs:{...(_e=f.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="ProxyOnly" />
}`,...(ve=(we=f.parameters)==null?void 0:we.docs)==null?void 0:ve.source},description:{story:'The other unsupported value a settings file can carry: "Configure proxy".',...(ye=(xe=f.parameters)==null?void 0:xe.docs)==null?void 0:ye.description}}};var fe,Ee,Re,Be,Te;E.parameters={...E.parameters,docs:{...(fe=E.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: args => <Controlled {...args} initialValue="Enabled" />,
  args: {
    disabled: true
  }
}`,...(Re=(Ee=E.parameters)==null?void 0:Ee.docs)==null?void 0:Re.source},description:{story:`All radios non-interactive — simulates the loading or saving state. The info buttons stay usable,
since the descriptions explain the options rather than being part of the setting.`,...(Te=(Be=E.parameters)==null?void 0:Be.docs)==null?void 0:Te.description}}};const Ot=["Unrestricted","DescriptionTooltipOnHover","DescriptionTooltipOnKeyboardFocus","RowClickTargets","NarrowColumn","DisabledAccess","NothingSelected","UnavailableOptionSelected","UnavailableProxySelected","FormDisabled"];export{b as DescriptionTooltipOnHover,g as DescriptionTooltipOnKeyboardFocus,v as DisabledAccess,E as FormDisabled,w as NarrowColumn,x as NothingSelected,_ as RowClickTargets,y as UnavailableOptionSelected,f as UnavailableProxySelected,h as Unrestricted,Ot as __namedExportsOrder,Tt as default};
