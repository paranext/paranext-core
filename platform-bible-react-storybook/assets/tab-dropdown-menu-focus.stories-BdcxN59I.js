import{T as A}from"./tab-dropdown-menu.component-vTRa8K9x.js";import{Q as C}from"./focus.util-cVKObA_R.js";import"./iframe-DsKGTJ0C.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-Rn_hcZs8.js";import"./menu.context-BB7Aqotp.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-BeI42sf5.js";import"./z-index-DhRj3SmA.js";import"./createReactComponent-C7og7JoC.js";import"./IconChevronRight-B5XOh3LK.js";import"./index-B70DhQhO.js";import"./index-CLhrTcEo.js";import"./index-a4WZhx4v.js";import"./index-Bwjhe5ep.js";import"./index-DsO9uvxN.js";import"./index-BVwZUHQT.js";import"./index-Dy_F8hi-.js";import"./index-ujwRXZKv.js";import"./index-B5mLaEOw.js";import"./index-Ct_MZZCi.js";import"./index-CxokEsP-.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BmhNkxiC.js";import"./index-CwAKGSCW.js";import"./index-n0TDSW8j.js";import"./IconCheck-DQ2Z414u.js";import"./tooltip-BVlo2QVx.js";import"./button-HiGuhB9N.js";import"./portal-container.context-B1UGeRDQ.js";import"./index-BI4FYyb1.js";import"./use-interaction-modality.hook-B6LSg7Gx.js";import"./shortcut-keys.component-BwyX4mNb.js";import"./index-VL4OM5EA.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./kbd-BbQU0ttn.js";import"./menu.util-BiWfgQQT.js";import"./lucide-icon.component-v2jcJjs3.js";import"./createLucideIcon-YuEPqwUW.js";import"./undo-2-CrDr0pve.js";import"./circle-check-big-DqHxQdIz.js";import"./message-square-CFleQLMx.js";import"./search-BwJmIOUr.js";import"./book-open-W-VNSezW.js";import"./square-x-DiFSCuSk.js";import"./file-text-DaXv5-_X.js";import"./eye-lOlvz9Hg.js";import"./external-link-DL9QXQhG.js";import"./circle-question-mark-Bh96nhcn.js";import"./settings-CP0yHxxf.js";import"./house-B0IvgZc4.js";import"./menu-icon.component-C5k7QmfO.js";const{expect:t,screen:c,userEvent:p,waitFor:B}=__STORYBOOK_MODULE_TEST__,S="Show footnotes",F={columns:{"tab.view":{label:"View",order:1}},groups:{"tab.view.display":{column:"tab.view",order:1}},items:[{label:S,localizeNotes:"Toggles footnote visibility",group:"tab.view.display",order:1,command:"tab.showFootnotes"}]},xe={title:"Advanced/Menu/TabDropdownMenu Focus",component:A,tags:["!autodocs","test"],args:{menuData:F,tabLabel:"Project",onSelectMenuItem:()=>{}},parameters:{docs:{description:{component:`Closing a menu always hands focus back to its trigger, because the tab order depends on it. What
differs is whether the focus ring shows: it belongs there after a keyboard close and not after a
pointer close, and the trigger carries \`data-quiet-focus\` to say which.

These stories add the half jsdom cannot judge — \`:focus-visible\`, which jsdom reports for any
programmatic focus and so cannot distinguish.

What they can and cannot see is worth knowing before adding to them. The trigger's \`box-shadow\`
ring never renders in this harness (it stays zero-width even with the suppression removed), so
asserting on it would pass whatever the code did. \`outline\` is a different matter: the stories
below inject a host rule and assert the computed \`outline-style\`, which does distinguish a
working suppression from a broken one. Anything resting on the ring itself still has to be
confirmed in the running app.`}}}};async function s(e){const o=c.getByRole("button",{name:"Project"});await p.click(o);const k=await c.findByRole("menuitem",{name:S});return e==="item click"?await p.click(k):await p.keyboard("{Escape}"),await B(()=>t(c.queryByRole("menu")).not.toBeInTheDocument()),o}const r={play:async()=>{const e=await s("item click");await t(e).toHaveFocus(),await t(e.hasAttribute(C)).toBe(!0)}},i={play:async()=>{const e=await s("Escape");await t(e).toHaveFocus(),await t(e.hasAttribute(C)).toBe(!1),await t(e.matches(":focus-visible")).toBe(!0)}},O=":focus-visible:not(.editor-input) { outline: 2px solid transparent; }";async function E(e){const o=document.createElement("style");o.textContent=O,document.head.appendChild(o);try{await e()}finally{o.remove()}}const a={play:async()=>{await E(async()=>{const e=await s("item click");await t(e).toHaveFocus(),await t(getComputedStyle(e).outlineStyle).toBe("none")})}},n={play:async()=>{await E(async()=>{const e=await s("Escape");await t(e).toHaveFocus(),await t(getComputedStyle(e).outlineStyle).toBe("solid")})}};var m,l,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  play: async () => {
    const trigger = await openAndCloseMenu('item click');
    await expect(trigger).toHaveFocus();
    await expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(true);
  }
}`,...(u=(l=r.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var d,g,h;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  play: async () => {
    const trigger = await openAndCloseMenu('Escape');
    await expect(trigger).toHaveFocus();
    await expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
    // The ring the attribute would suppress is genuinely owed here, which is what makes leaving the
    // trigger unmarked the whole point of the keyboard path.
    await expect(trigger.matches(':focus-visible')).toBe(true);
  }
}`,...(h=(g=i.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var w,y,f;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  play: async () => {
    await withHostFocusOutline(async () => {
      const trigger = await openAndCloseMenu('item click');
      await expect(trigger).toHaveFocus();
      await expect(getComputedStyle(trigger).outlineStyle).toBe('none');
    });
  }
}`,...(f=(y=a.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var b,T,v;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  play: async () => {
    await withHostFocusOutline(async () => {
      const trigger = await openAndCloseMenu('Escape');

      // The positive control for the story above: it proves the injected rule reaches this trigger,
      // so \`outline-style: none\` there is the suppression working rather than the rule never landing.
      await expect(trigger).toHaveFocus();
      await expect(getComputedStyle(trigger).outlineStyle).toBe('solid');
    });
  }
}`,...(v=(T=n.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};const He=["PointerCloseMarksTheTrigger","KeyboardCloseLeavesTheTriggerUnmarked","PointerCloseSuppressesAHostOutline","KeyboardCloseKeepsAHostOutline"];export{n as KeyboardCloseKeepsAHostOutline,i as KeyboardCloseLeavesTheTriggerUnmarked,r as PointerCloseMarksTheTrigger,a as PointerCloseSuppressesAHostOutline,He as __namedExportsOrder,xe as default};
