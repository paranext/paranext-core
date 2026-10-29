import{T as A}from"./tab-dropdown-menu.component-B6hFw9uR.js";import{Q as C}from"./focus.util-DRSEP984.js";import"./iframe-CTiqha1F.js";import"./preload-helper-CTOgD26E.js";import"./dropdown-menu-D2Nl54O_.js";import"./menu.context-C_Ga1dyN.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-3Stgw6AR.js";import"./IconChevronRight-BpsTUUo-.js";import"./index-BrKo-VD1.js";import"./index-aQscZVDh.js";import"./index-DAktaj2P.js";import"./index-DiPFuyzQ.js";import"./index-B21Eheaz.js";import"./index-DzoTJT8T.js";import"./index-B8sVvzOx.js";import"./index-4H2VFBTy.js";import"./index-DghOQhbD.js";import"./index-BnRkFOQK.js";import"./index-Crw73O5a.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Kew961MA.js";import"./index-CBrmAWKC.js";import"./index-BOFlDtU0.js";import"./IconCheck-BWLyNpeJ.js";import"./tooltip-Dj3cN8D6.js";import"./button-CCR5A31h.js";import"./portal-container.context-DrmkKJsd.js";import"./index-Bxy-bvsl.js";import"./use-interaction-modality.hook-CaH6b2dT.js";import"./shortcut-keys.component-CCy7gQ0F.js";import"./index-B2Agy_j1.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./kbd-CEhu4OLE.js";import"./menu.util-DsBSUbiW.js";import"./lucide-icon.component-C5N_9Vz0.js";import"./createLucideIcon-CGw6ljBM.js";import"./circle-check-big-DMR_RDtK.js";import"./message-square-CtKa_WZd.js";import"./search-DcC7BO9N.js";import"./book-open-BQdDEnje.js";import"./square-x-B-zbBcZx.js";import"./file-text-Deqyvood.js";import"./eye-BRkCxQy0.js";import"./pencil-Df3aFoV8.js";import"./external-link-DgvEuS5R.js";import"./circle-question-mark-DwVF5dmr.js";import"./settings-DJhZp-Is.js";import"./house-C4UgMauX.js";import"./menu-icon.component-CKIi08T6.js";const{expect:t,screen:c,userEvent:p,waitFor:B}=__STORYBOOK_MODULE_TEST__,S="Show footnotes",F={columns:{"tab.view":{label:"View",order:1}},groups:{"tab.view.display":{column:"tab.view",order:1}},items:[{label:S,localizeNotes:"Toggles footnote visibility",group:"tab.view.display",order:1,command:"tab.showFootnotes"}]},_e={title:"Advanced/Menu/TabDropdownMenu Focus",component:A,tags:["!autodocs","test"],args:{menuData:F,tabLabel:"Project",onSelectMenuItem:()=>{}},parameters:{docs:{description:{component:`Closing a menu always hands focus back to its trigger, because the tab order depends on it. What
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
}`,...(v=(T=n.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};const xe=["PointerCloseMarksTheTrigger","KeyboardCloseLeavesTheTriggerUnmarked","PointerCloseSuppressesAHostOutline","KeyboardCloseKeepsAHostOutline"];export{n as KeyboardCloseKeepsAHostOutline,i as KeyboardCloseLeavesTheTriggerUnmarked,r as PointerCloseMarksTheTrigger,a as PointerCloseSuppressesAHostOutline,xe as __namedExportsOrder,_e as default};
