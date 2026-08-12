import{r as y,j as e}from"./iframe-Db0yrjdZ.js";import{c as K}from"./utils-BPbySc-g.js";import{I as V,a as Y}from"./input-group-DHyZ-xvq.js";import{C as Z,I as H,c as J,b as Q,e as W}from"./command-xslQ1UoE.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./button-CRMK9Nqo.js";import"./index-xLgDz77E.js";import"./input-C-A65tlF.js";import"./index-CF4Klmn0.js";import"./index-_nZ8VTuX.js";import"./index--w3j8_cI.js";import"./index-JjLkhp_p.js";import"./index-BPY64oKT.js";import"./index-C-sYFee8.js";import"./index-CkQXDgc8.js";import"./index-HMAF8pjF.js";import"./index-CkiBBR0t.js";import"./index-YAvdY1RD.js";import"./dialog-Awd0teTU.js";import"./z-index-CoNkaVR8.js";import"./createReactComponent-DZ3MqOeR.js";import"./IconCheck-GkMByHWf.js";function X(t){return[...t].sort(([n,o],[s,f])=>n==="en"&&s!=="en"?-1:s==="en"&&n!=="en"?1:o.autonym.localeCompare(f.autonym))}function w({languages:t,value:n,onChange:o,localizedStrings:s,className:f,id:M}){const[c,U]=y.useState(""),d=y.useMemo(()=>X(Object.entries(t)).map(([a,r])=>({tag:a,info:r,keywords:[r.autonym,...Object.values(r.uiNames??{}),...r.otherNames??[]]})),[t]),O=y.useMemo(()=>{if(!c)return d;const a=c.toLowerCase();return d.filter(({keywords:r})=>r.some(i=>i.toLowerCase().includes(a)))},[d,c]),B=d.length>1,S=s["%firstRun_language_search_placeholder%"]??"",$=s["%firstRun_language_noResults%"]??"",F=s["%firstRun_language_selected%"]??"";return e.jsxs(Z,{id:M,className:K("pr-twp",f),shouldFilter:!1,children:[B&&e.jsx("div",{"data-slot":"command-input-wrapper",className:"tw:p-1 tw:pb-0",children:e.jsxs(V,{className:"tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!",children:[e.jsx("input",{"data-slot":"command-input",type:"text",placeholder:S,"aria-label":S,value:c,onChange:a=>U(a.currentTarget.value),className:"tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"}),e.jsx(Y,{children:e.jsx(H,{className:"tw:size-4 tw:shrink-0 tw:opacity-50"})})]})}),e.jsxs(J,{children:[e.jsx(Q,{children:$}),O.map(({tag:a,info:r})=>{const i=a===n;return e.jsxs(W,{value:a,"aria-current":i?"true":void 0,"data-checked":i?"true":void 0,onSelect:()=>o(a),children:[e.jsx("span",{dir:"auto",children:r.autonym}),i&&e.jsx("span",{className:"tw:sr-only",children:F})]},a)})]})]})}w.__docgenInfo={description:`Searchable, scrollable list for choosing the interface language. Each option is shown by its
autonym (native script); search matches the autonym, names in other UI languages, and other known
names (the latter for matching only — never displayed). Scales to hundreds of languages.

@experimental`,methods:[],displayName:"InterfaceLanguagePicker",props:{languages:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"signature",type:"object",raw:`{
  /** The name of the language to be displayed (in its native script) */
  autonym: string;
  /**
   * The name of the language in other languages, so that the language can also be displayed in the
   * current UI language, if known.
   */
  uiNames?: Record<string, string>;
  /**
   * Other known names of the language (for searching). This can include pejorative names and should
   * never be displayed unless typed by the user.
   */
  otherNames?: string[];
}`,signature:{properties:[{key:"autonym",value:{name:"string",required:!0},description:"The name of the language to be displayed (in its native script)"},{key:"uiNames",value:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>",required:!1},description:`The name of the language in other languages, so that the language can also be displayed in the
current UI language, if known.`},{key:"otherNames",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:`Other known names of the language (for searching). This can include pejorative names and should
never be displayed unless typed by the user.`}]}}],raw:"Record<string, LanguageInfo>"},description:"Languages to offer, keyed by BCP-47 tag. Displayed by autonym (native script)."},value:{required:!0,tsType:{name:"string"},description:"Currently selected BCP-47 tag."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(tag: string) => void",signature:{arguments:[{type:{name:"string"},name:"tag"}],return:{name:"void"}}},description:"Called with the chosen BCP-47 tag."},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [K in (typeof INTERFACE_LANGUAGE_PICKER_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof INTERFACE_LANGUAGE_PICKER_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:"Localized strings (search placeholder, no-results, selected label)."},className:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""}}};const ee={"%firstRun_language_search_placeholder%":"Search languages","%firstRun_language_noResults%":"No matching languages","%firstRun_language_selected%":"Selected"},ne={en:{autonym:"English"},es:{autonym:"Español",uiNames:{en:"Spanish"}},"zh-hans":{autonym:"中文（简体）",uiNames:{en:"Chinese (Simplified)"}},tpi:{autonym:"Tok Pisin",otherNames:["Pidgin"]}},_e={title:"Advanced/InterfaceLanguagePicker",component:w,tags:["autodocs","test"]};function m({languages:t,initialValue:n="en"}){const[o,s]=y.useState(n);return e.jsx(w,{languages:t,value:o,onChange:s,localizedStrings:ee})}const g={render:()=>e.jsx(m,{languages:ne})},p={render:()=>e.jsx(m,{languages:{en:{autonym:"English"}}})},h={render:()=>{const t={en:{autonym:"English"}};for(let n=0;n<120;n++)t[`x${n}`]={autonym:`Language ${n}`,uiNames:{en:`Language ${n}`}};return e.jsx(m,{languages:t})}},u={render:()=>e.jsx(m,{initialValue:"zh-hans",languages:{en:{autonym:"English"},es:{autonym:"Español",uiNames:{en:"Spanish"}},"zh-hans":{autonym:"中文（简体）",uiNames:{en:"Chinese (Simplified)"}}}})},l={render:()=>e.jsx(m,{languages:{en:{autonym:"English"},ar:{autonym:"العربية",uiNames:{en:"Arabic"}},de:{autonym:"Deutsch (Schweizerdeutsch, sehr langer Beispielname zum Testen des Umbruchs)",uiNames:{en:"German (long example)"}}}})};var L,N,E;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Demo languages={SAMPLE_LANGUAGES} />
}`,...(E=(N=g.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var b,x,_;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Demo languages={{
    en: {
      autonym: 'English'
    }
  }} />
}`,...(_=(x=p.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var v,C,j;h.parameters={...h.parameters,docs:{...(v=h.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const many: Record<string, LanguageInfo> = {
      en: {
        autonym: 'English'
      }
    };
    for (let i = 0; i < 120; i++) many[\`x\${i}\`] = {
      autonym: \`Language \${i}\`,
      uiNames: {
        en: \`Language \${i}\`
      }
    };
    return <Demo languages={many} />;
  }
}`,...(j=(C=h.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var R,A,I,T,k;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Demo initialValue="zh-hans" languages={{
    en: {
      autonym: 'English'
    },
    es: {
      autonym: 'Español',
      uiNames: {
        en: 'Spanish'
      }
    },
    'zh-hans': {
      autonym: '中文（简体）',
      uiNames: {
        en: 'Chinese (Simplified)'
      }
    }
  }} />
}`,...(I=(A=u.parameters)==null?void 0:A.docs)==null?void 0:I.source},description:{story:'A non-first language is selected, so the check mark and "Selected" affordance show mid-list.',...(k=(T=u.parameters)==null?void 0:T.docs)==null?void 0:k.description}}};var G,P,z,q,D;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <Demo languages={{
    en: {
      autonym: 'English'
    },
    ar: {
      autonym: 'العربية',
      uiNames: {
        en: 'Arabic'
      }
    },
    de: {
      autonym: 'Deutsch (Schweizerdeutsch, sehr langer Beispielname zum Testen des Umbruchs)',
      uiNames: {
        en: 'German (long example)'
      }
    }
  }} />
}`,...(z=(P=l.parameters)==null?void 0:P.docs)==null?void 0:z.source},description:{story:"Exercises an RTL script (Arabic) and a deliberately long autonym for mirroring/overflow.",...(D=(q=l.parameters)==null?void 0:q.docs)==null?void 0:D.description}}};const ve=["FewLanguages","OneLanguage","ManyLanguages","SelectedMidList","RtlAndLongAutonyms"];export{g as FewLanguages,h as ManyLanguages,p as OneLanguage,l as RtlAndLongAutonyms,u as SelectedMidList,ve as __namedExportsOrder,_e as default};
