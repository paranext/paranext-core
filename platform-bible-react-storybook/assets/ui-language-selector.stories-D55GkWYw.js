import{r as g,j as n}from"./iframe-D6qzhel6.js";import{t as Z}from"./index-CDH2oUpg.js";import{c as $}from"./utils-BPbySc-g.js";import{Z as M}from"./z-index-DiGYIwoM.js";import{S as X,a as Q,b as ee,c as ae,d as ne}from"./select-u9I1dUsr.js";import{L as te}from"./label-B3fwETIB.js";import"./preload-helper-CTOgD26E.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./IconSelector-BALucwI1.js";import"./createReactComponent-B6e7OIYC.js";import"./IconCheck-SFYu-nv6.js";import"./index-BaQP4hhM.js";import"./index-DFJW6cTk.js";import"./index-Dx_EUVst.js";import"./index-Clusq2-X.js";import"./index-Bq8IynJa.js";import"./index-DGQ8nCgH.js";import"./index-L5PNLNdN.js";import"./index-DVysrPzB.js";import"./index-yoF_26Pk.js";import"./index-BwDFrZcO.js";import"./index-kIXlDSa5.js";import"./index-D09Hciog.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BkUPP-oW.js";import"./index-BzuWWWRE.js";import"./index-DXLezhGG.js";const se=(a,t)=>a[t]??t;function k({knownUiLanguages:a,primaryLanguage:t="en",fallbackLanguages:s=[],onLanguagesChange:u,onPrimaryLanguageChange:c,onFallbackLanguagesChange:d,localizedStrings:y,className:b,id:S,disabled:o=!1}){const J=se(y,"%settings_uiLanguageSelector_fallbackLanguages%"),[H,w]=g.useState(!1),Y=e=>{c&&c(e),u&&u([e,...s.filter(i=>i!==e)]),d&&s.find(i=>i===e)&&d([...s.filter(i=>i!==e)]),w(!1)},_=(e,i)=>{var j,z,T,N,v,C;const U=i!==e?((z=(j=a[e])==null?void 0:j.uiNames)==null?void 0:z[i])??((N=(T=a[e])==null?void 0:T.uiNames)==null?void 0:N.en):void 0;return U?`${(v=a[e])==null?void 0:v.autonym} (${U})`:(C=a[e])==null?void 0:C.autonym};return n.jsxs("div",{id:S,className:$("pr-twp tw:max-w-sm",b),children:[n.jsxs(X,{name:"uiLanguage",value:t,onValueChange:Y,open:H,onOpenChange:e=>w(e),disabled:o,children:[n.jsx(Q,{children:n.jsx(ee,{})}),n.jsx(ae,{style:{zIndex:M},children:Object.keys(a).map(e=>n.jsx(ne,{value:e,children:_(e,t)},e))})]}),t!=="en"&&n.jsx("div",{className:"tw:pt-3",children:n.jsx(te,{className:"tw:font-normal tw:text-muted-foreground",children:Z(J,{fallbackLanguages:(s==null?void 0:s.length)>0?s.map(e=>_(e,t)).join(", "):a.en.autonym})})})]})}k.__docgenInfo={description:`A component for selecting the user interface language and managing fallback languages. Allows
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
whose values are the localized strings (in the current UI language).`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the control"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the root element"},disabled:{required:!1,tsType:{name:"boolean"},description:"When true, the language cannot be changed. Defaults to `false`.",defaultValue:{value:"false",computed:!1}}}};const r={en:{autonym:"English",uiNames:{es:"Inglés",fr:"Anglais",de:"Englisch"}},es:{autonym:"Español",uiNames:{en:"Spanish",fr:"Espagnol",de:"Spanisch"}},fr:{autonym:"Français",uiNames:{en:"French",es:"Francés",de:"Französisch"}},de:{autonym:"Deutsch",uiNames:{en:"German",es:"Alemán",fr:"Allemand"}},pt:{autonym:"Português",uiNames:{en:"Portuguese",es:"Portugués",fr:"Portugais",de:"Portugiesisch"}},"zh-hans":{autonym:"简体中文",uiNames:{en:"Chinese (Simplified)",es:"Chino (Simplificado)",fr:"Chinois (Simplifié)"}},"zh-hant":{autonym:"繁體中文",uiNames:{en:"Chinese (Traditional)",es:"Chino (Tradicional)",fr:"Chinois (Traditionnel)"}},ja:{autonym:"日本語",uiNames:{en:"Japanese",es:"Japonés",fr:"Japonais",de:"Japanisch"}},ko:{autonym:"한국어",uiNames:{en:"Korean",es:"Coreano",fr:"Coréen",de:"Koreanisch"}},ar:{autonym:"العربية",uiNames:{en:"Arabic",es:"Árabe",fr:"Arabe",de:"Arabisch"}}},re=a=>{console.log("Languages changed to:",a)};function l({initialPrimaryLanguage:a="en",initialFallbackLanguages:t=[],...s}){const[u,c]=g.useState(a),[d,y]=g.useState(t),b=g.useCallback(o=>{c(o),console.log("Primary language changed to:",o)},[]),S=g.useCallback(o=>{y(o),console.log("Fallback languages changed to:",o)},[]);return n.jsx(k,{...s,primaryLanguage:u,fallbackLanguages:d,onLanguagesChange:re,onPrimaryLanguageChange:b,onFallbackLanguagesChange:S})}const Fe={title:"Advanced/UI Language Selector",component:k,tags:["autodocs"],decorators:[a=>n.jsx("div",{className:"tw:max-w-md tw:p-4",children:n.jsx(a,{})})]},m={render:()=>n.jsx(l,{knownUiLanguages:r,localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Fallback languages"}}),parameters:{docs:{description:{story:"A language selector component for changing the UI language."}}}},p={render:()=>n.jsx(l,{knownUiLanguages:r,initialPrimaryLanguage:"es",initialFallbackLanguages:["en","pt"],localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Idiomas de respaldo de Interfaz"}}),parameters:{docs:{description:{story:"Language selector with Spanish primary and English/Portuguese fallback languages."}}}},h={render:()=>n.jsx(l,{knownUiLanguages:r,initialPrimaryLanguage:"es",initialFallbackLanguages:["en"],localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Fallback languages"},disabled:!0}),parameters:{docs:{description:{story:"Language selector that shows the current languages but cannot be changed."}}}},f={render:()=>{const a=Object.fromEntries(Object.entries(r).slice(0,4));return n.jsx(l,{knownUiLanguages:a,localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Fallback Languages"}})},parameters:{docs:{description:{story:"Language selector with a limited set of available languages."}}}},L={render:()=>{const a={"zh-hans":r["zh-hans"],"zh-hant":r["zh-hant"],ja:r.ja,ko:r.ko,en:r.en};return n.jsx(l,{knownUiLanguages:a,initialPrimaryLanguage:"zh-hans",initialFallbackLanguages:["en"],localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"后备语言"}})},parameters:{docs:{description:{story:"Language selector focused on Asian languages with Chinese (Simplified) as primary."}}}};var E,I,x;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(x=(I=m.parameters)==null?void 0:I.docs)==null?void 0:x.source}}};var A,F,P;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(P=(F=p.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var O,q,K;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <UiLanguageSelectorWithState knownUiLanguages={mockKnownLanguages} initialPrimaryLanguage="es" initialFallbackLanguages={['en']} localizedStrings={{
    '%settings_uiLanguageSelector_fallbackLanguages%': 'Fallback languages'
  }} disabled />,
  parameters: {
    docs: {
      description: {
        story: 'Language selector that shows the current languages but cannot be changed.'
      }
    }
  }
}`,...(K=(q=h.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};var R,G,D;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(D=(G=f.parameters)==null?void 0:G.docs)==null?void 0:D.source}}};var W,V,B;L.parameters={...L.parameters,docs:{...(W=L.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(B=(V=L.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};const Pe=["Default","WithFallbackLanguages","Disabled","LimitedLanguages","AsianLanguages"];export{L as AsianLanguages,m as Default,h as Disabled,f as LimitedLanguages,p as WithFallbackLanguages,Pe as __namedExportsOrder,Fe as default};
