import{j as s}from"./jsx-runtime-CoJcBlqr.js";import{r as V}from"./iframe-ChjBVkNN.js";import{c as D}from"./shadcn-ui.util-DMJ19wEV.js";import{S as J,a as $,b as B,c as H,d as Y}from"./select-BaRi3ik1.js";import{L as F}from"./label-DboBKY13.js";import{T as W}from"./theme-provider.component-DRoiPDtx.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-BaQP4hhM.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-DBlYwqkt.js";import"./index-uX5GIGLq.js";import"./index-CtW3L1xI.js";import"./index-B3HFQzOn.js";import"./index-CKeV44jl.js";import"./index-VUEIl7Yq.js";import"./index-DF789n87.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-CJGEWkUs.js";import"./index-Db6mirig.js";import"./index-CPgSHOWO.js";import"./index-BjqnVq7v.js";import"./index-DI1pkOJa.js";import"./index-CTXI5JpQ.js";import"./index-BPbCuWFR.js";import"./chevron-down-BQV-xBvd.js";import"./createLucideIcon-CVIRtPIF.js";import"./check-DhWHefu6.js";const M=(e,a)=>e[a]??a;function o({knownUiLanguages:e,primaryLanguage:a="en",fallbackLanguages:t=[],onLanguagesChange:m,onPrimaryLanguageChange:d,onFallbackLanguagesChange:h,localizedStrings:q,className:K}){const O=M(q,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[R,p]=V.useState(!1),G=n=>{d&&d(n),m&&m([n,...t.filter(g=>g!==n)]),h&&t.find(g=>g===n)&&h([...t.filter(g=>g!==n)]),p(!1)},L=(n,g)=>{var y,b,k,S,w,C;const f=g!==n?((b=(y=e[n])==null?void 0:y.uiNames)==null?void 0:b[g])??((S=(k=e[n])==null?void 0:k.uiNames)==null?void 0:S.en):void 0;return f?`${(w=e[n])==null?void 0:w.autonym} (${f})`:(C=e[n])==null?void 0:C.autonym};return s.jsxs("div",{className:D("pr-twp tw-max-w-sm",K),children:[s.jsxs(J,{name:"uiLanguage",value:a,onValueChange:G,open:R,onOpenChange:n=>p(n),children:[s.jsx($,{children:s.jsx(B,{})}),s.jsx(H,{className:"tw-z-[250]",children:Object.keys(e).map(n=>s.jsx(Y,{value:n,children:L(n,a)},n))})]}),a!=="en"&&s.jsxs(s.Fragment,{children:[s.jsx(F,{className:"tw-ms-3",children:O}),s.jsx("div",{className:"tw-ms-3",children:s.jsxs(F,{children:["Currently:"," ",(t==null?void 0:t.length)>0?`${t.map(n=>L(n,a)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}o.__docgenInfo={description:`A component for selecting the user interface language and managing fallback languages. Allows
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
whose values are the localized strings (in the current UI language).`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the control"}}};const r={en:{autonym:"English",uiNames:{es:"Inglés",fr:"Anglais",de:"Englisch"}},es:{autonym:"Español",uiNames:{en:"Spanish",fr:"Espagnol",de:"Spanisch"}},fr:{autonym:"Français",uiNames:{en:"French",es:"Francés",de:"Französisch"}},de:{autonym:"Deutsch",uiNames:{en:"German",es:"Alemán",fr:"Allemand"}},pt:{autonym:"Português",uiNames:{en:"Portuguese",es:"Portugués",fr:"Portugais",de:"Portugiesisch"}},"zh-hans":{autonym:"简体中文",uiNames:{en:"Chinese (Simplified)",es:"Chino (Simplificado)",fr:"Chinois (Simplifié)"}},"zh-hant":{autonym:"繁體中文",uiNames:{en:"Chinese (Traditional)",es:"Chino (Tradicional)",fr:"Chinois (Traditionnel)"}},ja:{autonym:"日本語",uiNames:{en:"Japanese",es:"Japonés",fr:"Japonais",de:"Japanisch"}},ko:{autonym:"한국어",uiNames:{en:"Korean",es:"Coreano",fr:"Coréen",de:"Koreanisch"}},ar:{autonym:"العربية",uiNames:{en:"Arabic",es:"Árabe",fr:"Arabe",de:"Arabisch"}}},Ne={title:"Advanced/UI Language Selector",component:o,tags:["autodocs"],decorators:[e=>s.jsx(W,{children:s.jsx("div",{className:"tw-max-w-md tw-p-4",children:s.jsx(e,{})})})]},i={render:()=>s.jsx(o,{knownUiLanguages:r,primaryLanguage:"en",fallbackLanguages:[],onLanguagesChange:e=>console.log("Languages changed to:",e),onPrimaryLanguageChange:e=>console.log("Primary language changed to:",e),onFallbackLanguagesChange:e=>console.log("Fallback languages changed to:",e),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Select fallback languages"}}),parameters:{docs:{description:{story:"A language selector component for changing the UI language."}}}},l={render:()=>s.jsx(o,{knownUiLanguages:r,primaryLanguage:"es",fallbackLanguages:["en","pt"],onLanguagesChange:e=>console.log("Languages changed to:",e),onPrimaryLanguageChange:e=>console.log("Primary language changed to:",e),onFallbackLanguagesChange:e=>console.log("Fallback languages changed to:",e),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Seleccionar idiomas de respaldo"}}),parameters:{docs:{description:{story:"Language selector with Spanish primary and English/Portuguese fallback languages."}}}},u={render:()=>{const e=Object.fromEntries(Object.entries(r).slice(0,4));return s.jsx(o,{knownUiLanguages:e,primaryLanguage:"en",fallbackLanguages:[],onLanguagesChange:a=>console.log("Languages changed to:",a),onPrimaryLanguageChange:a=>console.log("Primary language changed to:",a),onFallbackLanguagesChange:a=>console.log("Fallback languages changed to:",a),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Select fallback languages"}})},parameters:{docs:{description:{story:"Language selector with a limited set of available languages."}}}},c={render:()=>{const e={"zh-hans":r["zh-hans"],"zh-hant":r["zh-hant"],ja:r.ja,ko:r.ko,en:r.en};return s.jsx(o,{knownUiLanguages:e,primaryLanguage:"zh-hans",fallbackLanguages:["en"],onLanguagesChange:a=>console.log("Languages changed to:",a),onPrimaryLanguageChange:a=>console.log("Primary language changed to:",a),onFallbackLanguagesChange:a=>console.log("Fallback languages changed to:",a),localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"选择后备语言"}})},parameters:{docs:{description:{story:"Language selector focused on Asian languages with Chinese (Simplified) as primary."}}}};var j,_,T;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(T=(_=i.parameters)==null?void 0:_.docs)==null?void 0:T.source}}};var N,U,v;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(I=(E=c.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const Ue=["Default","WithFallbackLanguages","LimitedLanguages","AsianLanguages"];export{c as AsianLanguages,i as Default,u as LimitedLanguages,l as WithFallbackLanguages,Ue as __namedExportsOrder,Ne as default};
