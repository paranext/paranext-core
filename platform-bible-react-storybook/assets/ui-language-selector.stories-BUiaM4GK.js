import{j as s}from"./jsx-runtime-Bcv5qG8q.js";import{r as D}from"./iframe-B1JTTRWo.js";import{c as J}from"./shadcn-ui.util-DMJ19wEV.js";import{S as $,a as B,b as H,c as Y,d as W}from"./select-BqUV7Gyb.js";import{L as F}from"./label-Wtkzyhd0.js";import{T as M}from"./theme-provider.component-C8MRwuJ-.js";import"./index-C1q67m9i.js";import"./index-DTO8bnlh.js";import"./index-BaQP4hhM.js";import"./index-XotOfbKj.js";import"./index-D_1KZAH0.js";import"./index-CW5Uy6nx.js";import"./index-CTM9cwMY.js";import"./index-Do0jtVL9.js";import"./index-COW61aIP.js";import"./index-BAJ2K8La.js";import"./index-SR4aJxrH.js";import"./index-KUyDGunJ.js";import"./index-eZ3yBUPT.js";import"./index-D6BjlBM-.js";import"./floating-ui.react-dom-MXs8wDJ-.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-nGoFfWgl.js";import"./index-D7GLu0tr.js";import"./index-BwCWUYfy.js";import"./index-DMp7ZY4R.js";import"./index-Cel2m5vc.js";import"./index-Cc4Vve9q.js";import"./index-BPbCuWFR.js";import"./chevron-down-DVP9bTQs.js";import"./createLucideIcon-C3oRQsbk.js";import"./check-Bt4cFXTp.js";const Q=(e,a)=>e[a]??a;function o({knownUiLanguages:e,primaryLanguage:a="en",fallbackLanguages:t=[],onLanguagesChange:m,onPrimaryLanguageChange:d,onFallbackLanguagesChange:h,localizedStrings:q,className:O,id:K}){const R=Q(q,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[G,p]=D.useState(!1),V=n=>{d&&d(n),m&&m([n,...t.filter(g=>g!==n)]),h&&t.find(g=>g===n)&&h([...t.filter(g=>g!==n)]),p(!1)},L=(n,g)=>{var y,b,k,S,w,C;const f=g!==n?((b=(y=e[n])==null?void 0:y.uiNames)==null?void 0:b[g])??((S=(k=e[n])==null?void 0:k.uiNames)==null?void 0:S.en):void 0;return f?`${(w=e[n])==null?void 0:w.autonym} (${f})`:(C=e[n])==null?void 0:C.autonym};return s.jsxs("div",{id:K,className:J("pr-twp tw-max-w-sm",O),children:[s.jsxs($,{name:"uiLanguage",value:a,onValueChange:V,open:G,onOpenChange:n=>p(n),children:[s.jsx(B,{children:s.jsx(H,{})}),s.jsx(Y,{className:"tw-z-[250]",children:Object.keys(e).map(n=>s.jsx(W,{value:n,children:L(n,a)},n))})]}),a!=="en"&&s.jsxs(s.Fragment,{children:[s.jsx(F,{className:"tw-ms-3",children:R}),s.jsx("div",{className:"tw-ms-3",children:s.jsxs(F,{children:["Currently:"," ",(t==null?void 0:t.length)>0?`${t.map(n=>L(n,a)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}o.__docgenInfo={description:`A component for selecting the user interface language and managing fallback languages. Allows
users to choose a primary UI language and optionally select fallback languages.

@param {UiLanguageSelectorProps} props - The props for the component.`,methods:[],displayName:"UiLanguageSelector",props:{knownUiLanguages:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"signature",type:"object",raw:`{
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
never be displayed unless typed by the user.`}]}}],raw:"Record<string, LanguageInfo>"},description:"Full set of known languages to display. The keys are valid BCP-47 tags."},primaryLanguage:{required:!1,tsType:{name:"string"},description:"IETF BCP-47 language tag of the current primary UI language. `undefined` => 'en'",defaultValue:{value:"'en'",computed:!1}},fallbackLanguages:{required:!1,tsType:{name:"union",raw:"string[] | undefined",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"undefined"}]},description:`Ordered list of fallback language tags to use if the localization key can't be found in the
current primary UI language. This list never contains English ('en') because it is the ultimate
fallback.`,defaultValue:{value:"[]",computed:!1}},onLanguagesChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(newUiLanguages: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"newUiLanguages"}],return:{name:"void"}}},description:`Handler for when either the primary or the fallback languages change (or both). For this
handler, the primary UI language is the first one in the array, followed by the fallback
languages in order of decreasing preference.`},onPrimaryLanguageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(newPrimaryUiLanguage: string) => void",signature:{arguments:[{type:{name:"string"},name:"newPrimaryUiLanguage"}],return:{name:"void"}}},description:"Handler for the primary language changes."},onFallbackLanguagesChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(newFallbackLanguages: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"newFallbackLanguages"}],return:{name:"void"}}},description:`Handler for when the fallback languages change. The array contains the fallback languages in
order of decreasing preference.`},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedUiLanguageSelectorKey in (typeof UI_LANGUAGE_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof UI_LANGUAGE_SELECTOR_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:`Map whose keys are localized string keys as contained in UI_LANGUAGE_SELECTOR_STRING_KEYS and
whose values are the localized strings (in the current UI language).`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the control"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the root element"}}};const r={en:{autonym:"English",uiNames:{es:"Inglés",fr:"Anglais",de:"Englisch"}},es:{autonym:"Español",uiNames:{en:"Spanish",fr:"Espagnol",de:"Spanisch"}},fr:{autonym:"Français",uiNames:{en:"French",es:"Francés",de:"Französisch"}},de:{autonym:"Deutsch",uiNames:{en:"German",es:"Alemán",fr:"Allemand"}},pt:{autonym:"Português",uiNames:{en:"Portuguese",es:"Portugués",fr:"Portugais",de:"Portugiesisch"}},"zh-hans":{autonym:"简体中文",uiNames:{en:"Chinese (Simplified)",es:"Chino (Simplificado)",fr:"Chinois (Simplifié)"}},"zh-hant":{autonym:"繁體中文",uiNames:{en:"Chinese (Traditional)",es:"Chino (Tradicional)",fr:"Chinois (Traditionnel)"}},ja:{autonym:"日本語",uiNames:{en:"Japanese",es:"Japonés",fr:"Japonais",de:"Japanisch"}},ko:{autonym:"한국어",uiNames:{en:"Korean",es:"Coreano",fr:"Coréen",de:"Koreanisch"}},ar:{autonym:"العربية",uiNames:{en:"Arabic",es:"Árabe",fr:"Arabe",de:"Arabisch"}}},ve={title:"Advanced/UI Language Selector",component:o,tags:["autodocs"],decorators:[e=>s.jsx(M,{children:s.jsx("div",{className:"tw-max-w-md tw-p-4",children:s.jsx(e,{})})})]},i={render:()=>s.jsx(o,{knownUiLanguages:r,primaryLanguage:"en",fallbackLanguages:[],onLanguagesChange:e=>console.log("Languages changed to:",e),onPrimaryLanguageChange:e=>console.log("Primary language changed to:",e),onFallbackLanguagesChange:e=>console.log("Fallback languages changed to:",e),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Select fallback languages"}}),parameters:{docs:{description:{story:"A language selector component for changing the UI language."}}}},l={render:()=>s.jsx(o,{knownUiLanguages:r,primaryLanguage:"es",fallbackLanguages:["en","pt"],onLanguagesChange:e=>console.log("Languages changed to:",e),onPrimaryLanguageChange:e=>console.log("Primary language changed to:",e),onFallbackLanguagesChange:e=>console.log("Fallback languages changed to:",e),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Seleccionar idiomas de respaldo"}}),parameters:{docs:{description:{story:"Language selector with Spanish primary and English/Portuguese fallback languages."}}}},u={render:()=>{const e=Object.fromEntries(Object.entries(r).slice(0,4));return s.jsx(o,{knownUiLanguages:e,primaryLanguage:"en",fallbackLanguages:[],onLanguagesChange:a=>console.log("Languages changed to:",a),onPrimaryLanguageChange:a=>console.log("Primary language changed to:",a),onFallbackLanguagesChange:a=>console.log("Fallback languages changed to:",a),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Select fallback languages"}})},parameters:{docs:{description:{story:"Language selector with a limited set of available languages."}}}},c={render:()=>{const e={"zh-hans":r["zh-hans"],"zh-hant":r["zh-hant"],ja:r.ja,ko:r.ko,en:r.en};return s.jsx(o,{knownUiLanguages:e,primaryLanguage:"zh-hans",fallbackLanguages:["en"],onLanguagesChange:a=>console.log("Languages changed to:",a),onPrimaryLanguageChange:a=>console.log("Primary language changed to:",a),onFallbackLanguagesChange:a=>console.log("Fallback languages changed to:",a),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"选择后备语言"}})},parameters:{docs:{description:{story:"Language selector focused on Asian languages with Chinese (Simplified) as primary."}}}};var j,T,_;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <UiLanguageSelector knownUiLanguages={mockKnownLanguages} primaryLanguage="en" fallbackLanguages={[]} onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)} onPrimaryLanguageChange={(languageCode: string) => console.log('Primary language changed to:', languageCode)} onFallbackLanguagesChange={(fallbackLanguages: string[]) => console.log('Fallback languages changed to:', fallbackLanguages)} localizedStrings={{
    '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Select fallback languages'
  }} />,
  parameters: {
    docs: {
      description: {
        story: 'A language selector component for changing the UI language.'
      }
    }
  }
}`,...(_=(T=i.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var N,U,v;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <UiLanguageSelector knownUiLanguages={mockKnownLanguages} primaryLanguage="es" fallbackLanguages={['en', 'pt']} onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)} onPrimaryLanguageChange={(languageCode: string) => console.log('Primary language changed to:', languageCode)} onFallbackLanguagesChange={(fallbackLanguages: string[]) => console.log('Fallback languages changed to:', fallbackLanguages)} localizedStrings={{
    '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Seleccionar idiomas de respaldo'
  }} />,
  parameters: {
    docs: {
      description: {
        story: 'Language selector with Spanish primary and English/Portuguese fallback languages.'
      }
    }
  }
}`,...(v=(U=l.parameters)==null?void 0:U.docs)==null?void 0:v.source}}};var z,P,x;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    const limitedLanguages = Object.fromEntries(Object.entries(mockKnownLanguages).slice(0, 4));
    return <UiLanguageSelector knownUiLanguages={limitedLanguages} primaryLanguage="en" fallbackLanguages={[]} onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)} onPrimaryLanguageChange={(languageCode: string) => console.log('Primary language changed to:', languageCode)} onFallbackLanguagesChange={(fallbackLanguages: string[]) => console.log('Fallback languages changed to:', fallbackLanguages)} localizedStrings={{
      '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Select fallback languages'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selector with a limited set of available languages.'
      }
    }
  }
}`,...(x=(P=u.parameters)==null?void 0:P.docs)==null?void 0:x.source}}};var A,E,I;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const asianLanguages = {
      'zh-hans': mockKnownLanguages['zh-hans'],
      'zh-hant': mockKnownLanguages['zh-hant'],
      ja: mockKnownLanguages.ja,
      ko: mockKnownLanguages.ko,
      en: mockKnownLanguages.en
    };
    return <UiLanguageSelector knownUiLanguages={asianLanguages} primaryLanguage="zh-hans" fallbackLanguages={['en']} onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)} onPrimaryLanguageChange={(languageCode: string) => console.log('Primary language changed to:', languageCode)} onFallbackLanguagesChange={(fallbackLanguages: string[]) => console.log('Fallback languages changed to:', fallbackLanguages)} localizedStrings={{
      '%settings_uiLanguageSelector_selectFallbackLanguages%': '选择后备语言'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selector focused on Asian languages with Chinese (Simplified) as primary.'
      }
    }
  }
}`,...(I=(E=c.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const ze=["Default","WithFallbackLanguages","LimitedLanguages","AsianLanguages"];export{c as AsianLanguages,i as Default,u as LimitedLanguages,l as WithFallbackLanguages,ze as __namedExportsOrder,ve as default};
