import{j as n}from"./jsx-runtime-Bm6RJosq.js";import{r as g}from"./iframe-D0FeDqUk.js";import{k as D}from"./index-r3mwEuN3.js";import{c as B}from"./shadcn-ui.util-DMJ19wEV.js";import{Z as J}from"./z-index-B4JyHfu5.js";import{S as H,a as Y,b as Z,c as $,d as M}from"./select-C0Tpa1os.js";import{L as X}from"./label-BqSmQ5OP.js";import{T as Q}from"./theme-provider.component-DhNmAQhU.js";import"./preload-helper-CTOgD26E.js";import"./index-D2t4nnj1.js";import"./index-DG_O-XpZ.js";import"./index-B1S_03uM.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-B28n2woS.js";import"./index-D2C5bHKX.js";import"./index-Ba0gPqvh.js";import"./index-BYOTvneD.js";import"./index-COkWRoGW.js";import"./index-lDWBJGcX.js";import"./index-DiCsyBj-.js";import"./index-BTAqJSMj.js";import"./floating-ui.react-dom-CmNm4NcA.js";import"./index-BZ1L3Tz8.js";import"./index-C3BWXVNo.js";import"./index-D1M03-o8.js";import"./index-ByN0dbUA.js";import"./index-BnCJVQmx.js";import"./index-CmJSbOej.js";import"./index-CL8cTDgM.js";import"./index-Br_EeTL9.js";import"./index-CrOGXnsx.js";import"./index-BPbCuWFR.js";import"./chevron-down-DnbK0ab_.js";import"./createLucideIcon-dCEsKvaC.js";import"./check-CvHajwyZ.js";import"./chevron-up-DZSc1h11.js";const ee=(a,t)=>a[t]??t;function k({knownUiLanguages:a,primaryLanguage:t="en",fallbackLanguages:r=[],onLanguagesChange:l,onPrimaryLanguageChange:u,onFallbackLanguagesChange:c,localizedStrings:y,className:L,id:S}){const o=ee(y,"%settings_uiLanguageSelector_fallbackLanguages%"),[V,b]=g.useState(!1),W=e=>{u&&u(e),l&&l([e,...r.filter(s=>s!==e)]),c&&r.find(s=>s===e)&&c([...r.filter(s=>s!==e)]),b(!1)},w=(e,s)=>{var j,T,U,z,N,v;const _=s!==e?((T=(j=a[e])==null?void 0:j.uiNames)==null?void 0:T[s])??((z=(U=a[e])==null?void 0:U.uiNames)==null?void 0:z.en):void 0;return _?`${(N=a[e])==null?void 0:N.autonym} (${_})`:(v=a[e])==null?void 0:v.autonym};return n.jsxs("div",{id:S,className:B("pr-twp tw-max-w-sm",L),children:[n.jsxs(H,{name:"uiLanguage",value:t,onValueChange:W,open:V,onOpenChange:e=>b(e),children:[n.jsx(Y,{children:n.jsx(Z,{})}),n.jsx($,{style:{zIndex:J},children:Object.keys(a).map(e=>n.jsx(M,{value:e,children:w(e,t)},e))})]}),t!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(X,{className:"tw-font-normal tw-text-muted-foreground",children:D(o,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(e=>w(e,t)).join(", "):a.en.autonym})})})]})}k.__docgenInfo={description:`A component for selecting the user interface language and managing fallback languages. Allows
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
whose values are the localized strings (in the current UI language).`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the control"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the root element"}}};const i={en:{autonym:"English",uiNames:{es:"Inglés",fr:"Anglais",de:"Englisch"}},es:{autonym:"Español",uiNames:{en:"Spanish",fr:"Espagnol",de:"Spanisch"}},fr:{autonym:"Français",uiNames:{en:"French",es:"Francés",de:"Französisch"}},de:{autonym:"Deutsch",uiNames:{en:"German",es:"Alemán",fr:"Allemand"}},pt:{autonym:"Português",uiNames:{en:"Portuguese",es:"Portugués",fr:"Portugais",de:"Portugiesisch"}},"zh-hans":{autonym:"简体中文",uiNames:{en:"Chinese (Simplified)",es:"Chino (Simplificado)",fr:"Chinois (Simplifié)"}},"zh-hant":{autonym:"繁體中文",uiNames:{en:"Chinese (Traditional)",es:"Chino (Tradicional)",fr:"Chinois (Traditionnel)"}},ja:{autonym:"日本語",uiNames:{en:"Japanese",es:"Japonés",fr:"Japonais",de:"Japanisch"}},ko:{autonym:"한국어",uiNames:{en:"Korean",es:"Coreano",fr:"Coréen",de:"Koreanisch"}},ar:{autonym:"العربية",uiNames:{en:"Arabic",es:"Árabe",fr:"Arabe",de:"Arabisch"}}},ae=a=>{console.log("Languages changed to:",a)};function f({initialPrimaryLanguage:a="en",initialFallbackLanguages:t=[],...r}){const[l,u]=g.useState(a),[c,y]=g.useState(t),L=g.useCallback(o=>{u(o),console.log("Primary language changed to:",o)},[]),S=g.useCallback(o=>{y(o),console.log("Fallback languages changed to:",o)},[]);return n.jsx(k,{...r,primaryLanguage:l,fallbackLanguages:c,onLanguagesChange:ae,onPrimaryLanguageChange:L,onFallbackLanguagesChange:S})}const Ke={title:"Advanced/UI Language Selector",component:k,tags:["autodocs"],decorators:[a=>n.jsx(Q,{children:n.jsx("div",{className:"tw-max-w-md tw-p-4",children:n.jsx(a,{})})})]},m={render:()=>n.jsx(f,{knownUiLanguages:i,localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Fallback languages"}}),parameters:{docs:{description:{story:"A language selector component for changing the UI language."}}}},d={render:()=>n.jsx(f,{knownUiLanguages:i,initialPrimaryLanguage:"es",initialFallbackLanguages:["en","pt"],localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Idiomas de respaldo de Interfaz"}}),parameters:{docs:{description:{story:"Language selector with Spanish primary and English/Portuguese fallback languages."}}}},p={render:()=>{const a=Object.fromEntries(Object.entries(i).slice(0,4));return n.jsx(f,{knownUiLanguages:a,localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Fallback Languages"}})},parameters:{docs:{description:{story:"Language selector with a limited set of available languages."}}}},h={render:()=>{const a={"zh-hans":i["zh-hans"],"zh-hant":i["zh-hant"],ja:i.ja,ko:i.ko,en:i.en};return n.jsx(f,{knownUiLanguages:a,initialPrimaryLanguage:"zh-hans",initialFallbackLanguages:["en"],localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"后备语言"}})},parameters:{docs:{description:{story:"Language selector focused on Asian languages with Chinese (Simplified) as primary."}}}};var C,E,I;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <UiLanguageSelectorWithState knownUiLanguages={mockKnownLanguages} localizedStrings={{
    '%settings_uiLanguageSelector_fallbackLanguages%': 'Fallback languages'
  }} />,
  parameters: {
    docs: {
      description: {
        story: 'A language selector component for changing the UI language.'
      }
    }
  }
}`,...(I=(E=m.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var x,A,F;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <UiLanguageSelectorWithState knownUiLanguages={mockKnownLanguages} initialPrimaryLanguage="es" initialFallbackLanguages={['en', 'pt']} localizedStrings={{
    '%settings_uiLanguageSelector_fallbackLanguages%': 'Idiomas de respaldo de Interfaz'
  }} />,
  parameters: {
    docs: {
      description: {
        story: 'Language selector with Spanish primary and English/Portuguese fallback languages.'
      }
    }
  }
}`,...(F=(A=d.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var P,O,q;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const limitedLanguages = Object.fromEntries(Object.entries(mockKnownLanguages).slice(0, 4));
    return <UiLanguageSelectorWithState knownUiLanguages={limitedLanguages} localizedStrings={{
      '%settings_uiLanguageSelector_fallbackLanguages%': 'Fallback Languages'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selector with a limited set of available languages.'
      }
    }
  }
}`,...(q=(O=p.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var K,R,G;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const asianLanguages = {
      'zh-hans': mockKnownLanguages['zh-hans'],
      'zh-hant': mockKnownLanguages['zh-hant'],
      ja: mockKnownLanguages.ja,
      ko: mockKnownLanguages.ko,
      en: mockKnownLanguages.en
    };
    return <UiLanguageSelectorWithState knownUiLanguages={asianLanguages} initialPrimaryLanguage="zh-hans" initialFallbackLanguages={['en']} localizedStrings={{
      '%settings_uiLanguageSelector_fallbackLanguages%': '后备语言'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selector focused on Asian languages with Chinese (Simplified) as primary.'
      }
    }
  }
}`,...(G=(R=h.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};const Re=["Default","WithFallbackLanguages","LimitedLanguages","AsianLanguages"];export{h as AsianLanguages,m as Default,p as LimitedLanguages,d as WithFallbackLanguages,Re as __namedExportsOrder,Ke as default};
