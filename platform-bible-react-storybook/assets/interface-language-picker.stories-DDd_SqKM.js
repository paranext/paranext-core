import{r,j as a}from"./iframe-D1SZpvhJ.js";import{c as ne}from"./utils-BPbySc-g.js";import{I as ae,a as te}from"./input-group-A4OTI5n_.js";import{C as se,I as re,c as oe,b as ie,d as ue,e as ce}from"./command-SEt-AVAr.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./button-TwHp1ArR.js";import"./index-CalxZy4E.js";import"./input-DpFBWK6L.js";import"./index-C_aqGRsp.js";import"./index-BF4lifi6.js";import"./index-D6Nkly0L.js";import"./index-uZO2Rb5_.js";import"./index-CShuqExK.js";import"./index-BNImGkpL.js";import"./index-VrRHttHj.js";import"./index-CaP0C2LT.js";import"./index-DN1DuW3l.js";import"./index-C0ycuobO.js";import"./dialog-CiPIS4e5.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-JPrj0szX.js";import"./IconCheck-DWJaLGrX.js";function Z(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function le(t,n){if(!n)return t;const i=Z(n);return t.filter(({keywords:o})=>o.some(u=>u.includes(i)))}function me(t){return[...t].sort(([n,i],[o,u])=>n==="en"&&o!=="en"?-1:o==="en"&&n!=="en"?1:i.autonym.localeCompare(u.autonym))}function x({languages:t,value:n,onChange:i,localizedStrings:o,className:u,id:H}){const[b,J]=r.useState(""),[c,R]=r.useState(),_=r.useRef(null),v=r.useRef(null),L=r.useRef(new Map),[Q,W]=r.useState(),N=r.useMemo(()=>me(Object.entries(t)).map(([e,s])=>({tag:e,info:s,keywords:[s.autonym,...Object.values(s.uiNames??{}),...s.otherNames??[]].map(Z)})),[t]),p=r.useMemo(()=>le(N,b),[N,b]),h=r.useMemo(()=>{var s;const e=l=>!!l&&p.some(f=>f.tag===l);return e(c)?c:e(n)?n:((s=p[0])==null?void 0:s.tag)??""},[c,n,p]),E=N.length>1;r.useLayoutEffect(()=>{var e;W((e=v.current)==null?void 0:e.id)},[]),r.useLayoutEffect(()=>{const e=L.current.get(h),s=E?_.current:void 0;s&&(e?s.setAttribute("aria-activedescendant",e.id):s.removeAttribute("aria-activedescendant")),e&&h!==c&&e.scrollIntoView({block:"nearest"})},[h,c,E]);const C=o["%firstRun_language_search_placeholder%"]??"",X=o["%firstRun_language_noResults%"]??"",ee=o["%firstRun_language_selected%"]??"";return a.jsxs(se,{id:H,className:ne("pr-twp",u),shouldFilter:!1,value:h,onValueChange:R,children:[E&&a.jsx("div",{"data-slot":"command-input-wrapper",className:"tw:p-1 tw:pb-0",children:a.jsxs(ae,{className:"tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!",children:[a.jsx("input",{ref:_,"data-slot":"command-input",type:"text",role:"combobox","aria-expanded":!0,"aria-controls":Q,"aria-autocomplete":"list",placeholder:C,"aria-label":C,value:b,onChange:e=>{J(e.currentTarget.value),R(void 0)},className:"tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"}),a.jsx(te,{children:a.jsx(re,{className:"tw:size-4 tw:shrink-0 tw:opacity-50"})})]})}),a.jsxs(oe,{ref:v,children:[a.jsx(ie,{children:X}),a.jsx(ue,{children:p.map(({tag:e,info:s})=>{const l=e===n;return a.jsxs(ce,{ref:f=>{f?L.current.set(e,f):L.current.delete(e)},value:e,"data-checked":l,"aria-checked":void 0,onSelect:()=>i(e),children:[a.jsx("span",{dir:"auto",children:s.autonym}),l&&a.jsx("span",{className:"tw:sr-only",children:ee})]},e)})})]})]})}x.__docgenInfo={description:`Searchable, scrollable list for choosing the interface language. Each option is shown by its
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
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof INTERFACE_LANGUAGE_PICKER_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:"Localized strings (search placeholder, no-results, selected label)."},className:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""}}};const de={"%firstRun_language_search_placeholder%":"Search languages","%firstRun_language_noResults%":"No matching languages","%firstRun_language_selected%":"Selected"},ge={en:{autonym:"English"},es:{autonym:"Español",uiNames:{en:"Spanish"}},fr:{autonym:"Français",uiNames:{en:"French"}},"zh-hans":{autonym:"中文（简体）",uiNames:{en:"Chinese (Simplified)"}},tpi:{autonym:"Tok Pisin",otherNames:["Pidgin"]}},qe={title:"Advanced/InterfaceLanguagePicker",component:x,tags:["autodocs","test"]};function g({languages:t,initialValue:n="en"}){const[i,o]=r.useState(n);return a.jsx(x,{languages:t,value:i,onChange:o,localizedStrings:de})}const y={render:()=>a.jsx(g,{languages:ge})},w={render:()=>a.jsx(g,{languages:{en:{autonym:"English"}}})},S={render:()=>{const t={en:{autonym:"English"}};for(let n=0;n<120;n++)t[`x${n}`]={autonym:`Language ${n}`,uiNames:{en:`Language ${n}`}};return a.jsx(g,{languages:t})}},m={render:()=>a.jsx(g,{initialValue:"zh-hans",languages:{en:{autonym:"English"},es:{autonym:"Español",uiNames:{en:"Spanish"}},"zh-hans":{autonym:"中文（简体）",uiNames:{en:"Chinese (Simplified)"}}}})},d={render:()=>a.jsx(g,{languages:{en:{autonym:"English"},ar:{autonym:"العربية",uiNames:{en:"Arabic"}},de:{autonym:"Deutsch (Schweizerdeutsch, sehr langer Beispielname zum Testen des Umbruchs)",uiNames:{en:"German (long example)"}}}})};var j,A,I;y.parameters={...y.parameters,docs:{...(j=y.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Demo languages={SAMPLE_LANGUAGES} />
}`,...(I=(A=y.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var T,k,G;w.parameters={...w.parameters,docs:{...(T=w.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...($=(B=d.parameters)==null?void 0:B.docs)==null?void 0:$.source},description:{story:"Exercises an RTL script (Arabic) and a deliberately long autonym for mirroring/overflow.",...(Y=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Y.description}}};const De=["FewLanguages","OneLanguage","ManyLanguages","SelectedMidList","RtlAndLongAutonyms"];export{y as FewLanguages,S as ManyLanguages,w as OneLanguage,d as RtlAndLongAutonyms,m as SelectedMidList,De as __namedExportsOrder,qe as default};
