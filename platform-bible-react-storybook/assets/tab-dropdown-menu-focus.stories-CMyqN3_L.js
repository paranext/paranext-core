import{T as A}from"./tab-dropdown-menu.component-Bv035Rj3.js";import{Q as C}from"./focus.util-DRSEP984.js";import"./iframe-ze4avWdd.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-BmZSymZn.js";import"./menu.context-DbEsqcPe.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-CoSSI8fM.js";import"./IconChevronRight-4Ke-Vq5b.js";import"./index-TpGLS-S0.js";import"./index-CDWdS3tY.js";import"./index-CeASkoP5.js";import"./index-CxyQQClr.js";import"./index-DmjxLBPL.js";import"./index-DJSqm_zn.js";import"./index-CMVeQhYJ.js";import"./index-CMrNonGZ.js";import"./index-DFk0SW_g.js";import"./index-B3zwgKDi.js";import"./index-Dx5caObM.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-C2t4oVWx.js";import"./index-NYeJaA2C.js";import"./index-DS7NIJqf.js";import"./IconCheck-DyoxddBo.js";import"./tooltip-Bn9NvpJL.js";import"./button-9iR9Zi-p.js";import"./portal-container.context-iXDnBVGg.js";import"./index-BdVPq_hm.js";import"./use-interaction-modality.hook-BFFlxhc6.js";import"./menu.util-B4Sg39gp.js";import"./menu-icon.component-Dkeu95dY.js";import"./createLucideIcon-BsArLMr6.js";const{expect:t,screen:c,userEvent:p,waitFor:B}=__STORYBOOK_MODULE_TEST__,S="Show footnotes",F={columns:{"tab.view":{label:"View",order:1}},groups:{"tab.view.display":{column:"tab.view",order:1}},items:[{label:S,localizeNotes:"Toggles footnote visibility",group:"tab.view.display",order:1,command:"tab.showFootnotes"}]},ue={title:"Advanced/Menu/TabDropdownMenu Focus",component:A,tags:["!autodocs","test"],args:{menuData:F,tabLabel:"Project",onSelectMenuItem:()=>{}},parameters:{docs:{description:{component:`Closing a menu always hands focus back to its trigger, because the tab order depends on it. What
differs is whether the focus ring shows: it belongs there after a keyboard close and not after a
pointer close, and the trigger carries \`data-quiet-focus\` to say which.

These stories add the half jsdom cannot judge — \`:focus-visible\`, which jsdom reports for any
programmatic focus and so cannot distinguish.

What they can and cannot see is worth knowing before adding to them. The trigger's \`box-shadow\`
ring never renders in this harness (it stays zero-width even with the suppression removed), so
asserting on it would pass whatever the code did. \`outline\` is a different matter: the stories
below inject a host rule and assert the computed \`outline-style\`, which does distinguish a
working suppression from a broken one. Anything resting on the ring itself still has to be
confirmed in the running app.`}}}};async function s(e){const o=c.getByRole("button",{name:"Project"});await p.click(o);const k=await c.findByRole("menuitem",{name:S});return e==="item click"?await p.click(k):await p.keyboard("{Escape}"),await B(()=>t(c.queryByRole("menu")).not.toBeInTheDocument()),o}const r={play:async()=>{const e=await s("item click");await t(e).toHaveFocus(),await t(e.hasAttribute(C)).toBe(!0)}},a={play:async()=>{const e=await s("Escape");await t(e).toHaveFocus(),await t(e.hasAttribute(C)).toBe(!1),await t(e.matches(":focus-visible")).toBe(!0)}},O=":focus-visible:not(.editor-input) { outline: 2px solid transparent; }";async function E(e){const o=document.createElement("style");o.textContent=O,document.head.appendChild(o);try{await e()}finally{o.remove()}}const i={play:async()=>{await E(async()=>{const e=await s("item click");await t(e).toHaveFocus(),await t(getComputedStyle(e).outlineStyle).toBe("none")})}},n={play:async()=>{await E(async()=>{const e=await s("Escape");await t(e).toHaveFocus(),await t(getComputedStyle(e).outlineStyle).toBe("solid")})}};var l,u,d;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  play: async () => {
    const trigger = await openAndCloseMenu('item click');
    await expect(trigger).toHaveFocus();
    await expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(true);
  }
}`,...(d=(u=r.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var m,g,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  play: async () => {
    const trigger = await openAndCloseMenu('Escape');
    await expect(trigger).toHaveFocus();
    await expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
    // The ring the attribute would suppress is genuinely owed here, which is what makes leaving the
    // trigger unmarked the whole point of the keyboard path.
    await expect(trigger.matches(':focus-visible')).toBe(true);
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var w,y,f;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  play: async () => {
    await withHostFocusOutline(async () => {
      const trigger = await openAndCloseMenu('item click');
      await expect(trigger).toHaveFocus();
      await expect(getComputedStyle(trigger).outlineStyle).toBe('none');
    });
  }
}`,...(f=(y=i.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var b,T,v;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  play: async () => {
    await withHostFocusOutline(async () => {
      const trigger = await openAndCloseMenu('Escape');

      // The positive control for the story above: it proves the injected rule reaches this trigger,
      // so \`outline-style: none\` there is the suppression working rather than the rule never landing.
      await expect(trigger).toHaveFocus();
      await expect(getComputedStyle(trigger).outlineStyle).toBe('solid');
    });
  }
}`,...(v=(T=n.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};const de=["PointerCloseMarksTheTrigger","KeyboardCloseLeavesTheTriggerUnmarked","PointerCloseSuppressesAHostOutline","KeyboardCloseKeepsAHostOutline"];export{n as KeyboardCloseKeepsAHostOutline,a as KeyboardCloseLeavesTheTriggerUnmarked,r as PointerCloseMarksTheTrigger,i as PointerCloseSuppressesAHostOutline,de as __namedExportsOrder,ue as default};
