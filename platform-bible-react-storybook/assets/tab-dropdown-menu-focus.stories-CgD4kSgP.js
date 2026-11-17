import{T as A}from"./tab-dropdown-menu.component-BlUAtQ4u.js";import{Q as C}from"./focus.util-DQBXaFqZ.js";import"./iframe-D5HlImOa.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-CiUStciL.js";import"./menu.context-YWHqWABD.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./use-dismiss-on-window-blur.hook-D4dM7pUv.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-YEwv6Jge.js";import"./IconChevronRight-CP2sqJ2Y.js";import"./index-C2d4cA2o.js";import"./index-DME7ft0G.js";import"./index-BSYvk-oS.js";import"./index-BMeabMXL.js";import"./index-4Wgd1wMo.js";import"./index-BJkgyMJn.js";import"./index-JVzyoOpS.js";import"./index-C-lxSuqc.js";import"./index-DDsZVhRu.js";import"./index-ClRY_qCi.js";import"./index-D1f-7DIn.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-FhOVgzns.js";import"./index-BV26EAnG.js";import"./index-Bo3QTjtn.js";import"./IconCheck-DGqFqnM9.js";import"./tooltip-CzraHdR-.js";import"./button-FvU5FqRO.js";import"./portal-container.context-CZmoE3lX.js";import"./index-CUpTqqTq.js";import"./use-interaction-modality.hook-Bhi9rOGU.js";import"./shortcut-keys.component-DhHEH4zo.js";import"./index-CpyFeyxh.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./kbd-Wo0cysI7.js";import"./menu.util-B0vjBAYj.js";import"./lucide-icon.component-CVnQzepS.js";import"./createLucideIcon-BXibvb7W.js";import"./circle-check-big-DDamIle9.js";import"./message-square-ChfpvV8k.js";import"./search-TR6VK_88.js";import"./book-open-Cpqp5H6T.js";import"./square-x-GyPg44Pr.js";import"./file-text-BRFUxEme.js";import"./eye-DBvg0yhr.js";import"./pencil-DxfMZZXC.js";import"./external-link-DWSIEa-h.js";import"./circle-question-mark-caNlMiva.js";import"./settings-DVvdANjP.js";import"./house-D8_QCjcH.js";import"./menu-icon.component-CdLwgVxK.js";const{expect:t,screen:c,userEvent:p,waitFor:B}=__STORYBOOK_MODULE_TEST__,S="Show footnotes",F={columns:{"tab.view":{label:"View",order:1}},groups:{"tab.view.display":{column:"tab.view",order:1}},items:[{label:S,localizeNotes:"Toggles footnote visibility",group:"tab.view.display",order:1,command:"tab.showFootnotes"}]},xe={title:"Advanced/Menu/TabDropdownMenu Focus",component:A,tags:["!autodocs","test"],args:{menuData:F,tabLabel:"Project",onSelectMenuItem:()=>{}},parameters:{docs:{description:{component:`Closing a menu always hands focus back to its trigger, because the tab order depends on it. What
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
