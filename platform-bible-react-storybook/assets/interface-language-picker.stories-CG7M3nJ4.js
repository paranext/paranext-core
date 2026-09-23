import{r as s,j as a}from"./iframe-BLouS63C.js";import{c as ne}from"./utils-BPbySc-g.js";import{I as ae,a as te}from"./input-group-CmJhcCTe.js";import{C as re,I as se,c as oe,b as ie,e as ue}from"./command-DhoZS6hs.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./button-DkEoLQZ3.js";import"./index-BZHZa2Al.js";import"./input-DdHzlEzQ.js";import"./index-CtaTf5_H.js";import"./index-BJI4uwE5.js";import"./index-CHiGwW9C.js";import"./index-BXTkrbmv.js";import"./index-ddkEJgJn.js";import"./index-CKZ_WzNU.js";import"./index-Bi6vM45r.js";import"./index-BYpYHQSQ.js";import"./index-Dnc0Ht0Z.js";import"./index-DdoOfSqE.js";import"./dialog-RT-NBuMG.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-ChkUQwtL.js";import"./IconCheck-iMS4ghXR.js";function Z(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function ce(t,n){if(!n)return t;const i=Z(n);return t.filter(({keywords:o})=>o.some(c=>c.includes(i)))}function le(t){return[...t].sort(([n,i],[o,c])=>n==="en"&&o!=="en"?-1:o==="en"&&n!=="en"?1:i.autonym.localeCompare(c.autonym))}function x({languages:t,value:n,onChange:i,localizedStrings:o,className:c,id:H}){const[b,J]=s.useState(""),[l,R]=s.useState(),v=s.useRef(null),_=s.useRef(null),L=s.useRef(new Map),[Q,W]=s.useState(),N=s.useMemo(()=>le(Object.entries(t)).map(([e,r])=>({tag:e,info:r,keywords:[r.autonym,...Object.values(r.uiNames??{}),...r.otherNames??[]].map(Z)})),[t]),p=s.useMemo(()=>ce(N,b),[N,b]),h=s.useMemo(()=>{var r;const e=u=>!!u&&p.some(f=>f.tag===u);return e(l)?l:e(n)?n:((r=p[0])==null?void 0:r.tag)??""},[l,n,p]),E=N.length>1;s.useLayoutEffect(()=>{var e;W((e=_.current)==null?void 0:e.id)},[]),s.useLayoutEffect(()=>{const e=L.current.get(h),r=E?v.current:void 0;r&&(e?r.setAttribute("aria-activedescendant",e.id):r.removeAttribute("aria-activedescendant")),e&&h!==l&&e.scrollIntoView({block:"nearest"})},[h,l,E]);const A=o["%firstRun_language_search_placeholder%"]??"",X=o["%firstRun_language_noResults%"]??"",ee=o["%firstRun_language_selected%"]??"";return a.jsxs(re,{id:H,className:ne("pr-twp",c),shouldFilter:!1,value:h,onValueChange:R,children:[E&&a.jsx("div",{"data-slot":"command-input-wrapper",className:"tw:p-1 tw:pb-0",children:a.jsxs(ae,{className:"tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!",children:[a.jsx("input",{ref:v,"data-slot":"command-input",type:"text",role:"combobox","aria-expanded":!0,"aria-controls":Q,"aria-autocomplete":"list",placeholder:A,"aria-label":A,value:b,onChange:e=>{J(e.currentTarget.value),R(void 0)},className:"tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"}),a.jsx(te,{children:a.jsx(se,{className:"tw:size-4 tw:shrink-0 tw:opacity-50"})})]})}),a.jsxs(oe,{ref:_,children:[a.jsx(ie,{children:X}),p.map(({tag:e,info:r})=>{const u=e===n;return a.jsxs(ue,{ref:f=>{f?L.current.set(e,f):L.current.delete(e)},value:e,"aria-current":u?"true":void 0,"data-checked":u?"true":void 0,onSelect:()=>i(e),children:[a.jsx("span",{dir:"auto",children:r.autonym}),u&&a.jsx("span",{className:"tw:sr-only",children:ee})]},e)})]})]})}x.__docgenInfo={description:`Searchable, scrollable list for choosing the interface language. Each option is shown by its
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
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof INTERFACE_LANGUAGE_PICKER_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:"Localized strings (search placeholder, no-results, selected label)."},className:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""}}};const me={"%firstRun_language_search_placeholder%":"Search languages","%firstRun_language_noResults%":"No matching languages","%firstRun_language_selected%":"Selected"},de={en:{autonym:"English"},es:{autonym:"Español",uiNames:{en:"Spanish"}},fr:{autonym:"Français",uiNames:{en:"French"}},"zh-hans":{autonym:"中文（简体）",uiNames:{en:"Chinese (Simplified)"}},tpi:{autonym:"Tok Pisin",otherNames:["Pidgin"]}},ze={title:"Advanced/InterfaceLanguagePicker",component:x,tags:["autodocs","test"]};function g({languages:t,initialValue:n="en"}){const[i,o]=s.useState(n);return a.jsx(x,{languages:t,value:i,onChange:o,localizedStrings:me})}const y={render:()=>a.jsx(g,{languages:de})},w={render:()=>a.jsx(g,{languages:{en:{autonym:"English"}}})},S={render:()=>{const t={en:{autonym:"English"}};for(let n=0;n<120;n++)t[`x${n}`]={autonym:`Language ${n}`,uiNames:{en:`Language ${n}`}};return a.jsx(g,{languages:t})}},m={render:()=>a.jsx(g,{initialValue:"zh-hans",languages:{en:{autonym:"English"},es:{autonym:"Español",uiNames:{en:"Spanish"}},"zh-hans":{autonym:"中文（简体）",uiNames:{en:"Chinese (Simplified)"}}}})},d={render:()=>a.jsx(g,{languages:{en:{autonym:"English"},ar:{autonym:"العربية",uiNames:{en:"Arabic"}},de:{autonym:"Deutsch (Schweizerdeutsch, sehr langer Beispielname zum Testen des Umbruchs)",uiNames:{en:"German (long example)"}}}})};var C,j,I;y.parameters={...y.parameters,docs:{...(C=y.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Demo languages={SAMPLE_LANGUAGES} />
}`,...(I=(j=y.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var T,k,G;w.parameters={...w.parameters,docs:{...(T=w.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Demo languages={{
    en: {
      autonym: 'English'
    }
  }} />
}`,...(G=(k=w.parameters)==null?void 0:k.docs)==null?void 0:G.source}}};var P,z,q;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(q=(z=S.parameters)==null?void 0:z.docs)==null?void 0:q.source}}};var D,M,F,U,O;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(F=(M=m.parameters)==null?void 0:M.docs)==null?void 0:F.source},description:{story:'A non-first language is selected, so the check mark and "Selected" affordance show mid-list.',...(O=(U=m.parameters)==null?void 0:U.docs)==null?void 0:O.description}}};var V,B,$,K,Y;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...($=(B=d.parameters)==null?void 0:B.docs)==null?void 0:$.source},description:{story:"Exercises an RTL script (Arabic) and a deliberately long autonym for mirroring/overflow.",...(Y=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Y.description}}};const qe=["FewLanguages","OneLanguage","ManyLanguages","SelectedMidList","RtlAndLongAutonyms"];export{y as FewLanguages,S as ManyLanguages,w as OneLanguage,d as RtlAndLongAutonyms,m as SelectedMidList,qe as __namedExportsOrder,ze as default};
