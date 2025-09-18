import{j as a}from"./jsx-runtime-4wK_0ZO4.js";import{r as g}from"./iframe-BcYeWgcr.js";import{c as J}from"./shadcn-ui.util-DMJ19wEV.js";import{S as $,a as B,b as H,c as Y,d as M}from"./select-DopLMRU5.js";import{L as C}from"./label-dXSGOCoI.js";import{T as Q}from"./theme-provider.component-Bum-YBGl.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BaQP4hhM.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-PhEMGCGr.js";import"./index-Dxmr7YCn.js";import"./index-DNc3TkLQ.js";import"./index-BJ893FO-.js";import"./index-DZhSYnG_.js";import"./index-DThCJ6FV.js";import"./index-CHtcClp9.js";import"./index-BdtTgfff.js";import"./index-BDeDN-dv.js";import"./floating-ui.react-dom-BrelV8Hr.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-b4TQRt8l.js";import"./index-hI4Fiusr.js";import"./index-D7NlkAyc.js";import"./index-BTW_afRk.js";import"./index-DuMdAayX.js";import"./index-BJ8FFPD6.js";import"./index-BPbCuWFR.js";import"./chevron-down-CT_Ph70R.js";import"./createLucideIcon-D1oFpSf_.js";import"./check-nBAr59iS.js";const X=(n,s)=>n[s]??s;function b({knownUiLanguages:n,primaryLanguage:s="en",fallbackLanguages:t=[],onLanguagesChange:l,onPrimaryLanguageChange:u,onFallbackLanguagesChange:c,localizedStrings:y,className:L,id:S}){const o=X(y,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[V,k]=g.useState(!1),D=e=>{u&&u(e),l&&l([e,...t.filter(r=>r!==e)]),c&&t.find(r=>r===e)&&c([...t.filter(r=>r!==e)]),k(!1)},w=(e,r)=>{var T,_,U,N,v,z;const j=r!==e?((_=(T=n[e])==null?void 0:T.uiNames)==null?void 0:_[r])??((N=(U=n[e])==null?void 0:U.uiNames)==null?void 0:N.en):void 0;return j?`${(v=n[e])==null?void 0:v.autonym} (${j})`:(z=n[e])==null?void 0:z.autonym};return a.jsxs("div",{id:S,className:J("pr-twp tw-max-w-sm",L),children:[a.jsxs($,{name:"uiLanguage",value:s,onValueChange:D,open:V,onOpenChange:e=>k(e),children:[a.jsx(B,{children:a.jsx(H,{})}),a.jsx(Y,{className:"tw-z-[250]",children:Object.keys(n).map(e=>a.jsx(M,{value:e,children:w(e,s)},e))})]}),s!=="en"&&a.jsxs(a.Fragment,{children:[a.jsx(C,{className:"tw-ms-3",children:o}),a.jsx("div",{className:"tw-ms-3",children:a.jsxs(C,{children:["Currently:"," ",(t==null?void 0:t.length)>0?`${t.map(e=>w(e,s)).join(", ")}`:`default (${n.en.autonym})`]})})]})]})}b.__docgenInfo={description:`A component for selecting the user interface language and managing fallback languages. Allows
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
whose values are the localized strings (in the current UI language).`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the control"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the root element"}}};const i={en:{autonym:"English",uiNames:{es:"Inglés",fr:"Anglais",de:"Englisch"}},es:{autonym:"Español",uiNames:{en:"Spanish",fr:"Espagnol",de:"Spanisch"}},fr:{autonym:"Français",uiNames:{en:"French",es:"Francés",de:"Französisch"}},de:{autonym:"Deutsch",uiNames:{en:"German",es:"Alemán",fr:"Allemand"}},pt:{autonym:"Português",uiNames:{en:"Portuguese",es:"Portugués",fr:"Portugais",de:"Portugiesisch"}},"zh-hans":{autonym:"简体中文",uiNames:{en:"Chinese (Simplified)",es:"Chino (Simplificado)",fr:"Chinois (Simplifié)"}},"zh-hant":{autonym:"繁體中文",uiNames:{en:"Chinese (Traditional)",es:"Chino (Tradicional)",fr:"Chinois (Traditionnel)"}},ja:{autonym:"日本語",uiNames:{en:"Japanese",es:"Japonés",fr:"Japonais",de:"Japanisch"}},ko:{autonym:"한국어",uiNames:{en:"Korean",es:"Coreano",fr:"Coréen",de:"Koreanisch"}},ar:{autonym:"العربية",uiNames:{en:"Arabic",es:"Árabe",fr:"Arabe",de:"Arabisch"}}},Z=n=>{console.log("Languages changed to:",n)};function f({initialPrimaryLanguage:n="en",initialFallbackLanguages:s=[],...t}){const[l,u]=g.useState(n),[c,y]=g.useState(s),L=g.useCallback(o=>{u(o),console.log("Primary language changed to:",o)},[]),S=g.useCallback(o=>{y(o),console.log("Fallback languages changed to:",o)},[]);return a.jsx(b,{...t,primaryLanguage:l,fallbackLanguages:c,onLanguagesChange:Z,onPrimaryLanguageChange:L,onFallbackLanguagesChange:S})}const xe={title:"Advanced/UI Language Selector",component:b,tags:["autodocs"],decorators:[n=>a.jsx(Q,{children:a.jsx("div",{className:"tw-max-w-md tw-p-4",children:a.jsx(n,{})})})]},m={render:()=>a.jsx(f,{knownUiLanguages:i,localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Select fallback languages"}}),parameters:{docs:{description:{story:"A language selector component for changing the UI language."}}}},d={render:()=>a.jsx(f,{knownUiLanguages:i,initialPrimaryLanguage:"es",initialFallbackLanguages:["en","pt"],localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Seleccionar idiomas de respaldo"}}),parameters:{docs:{description:{story:"Language selector with Spanish primary and English/Portuguese fallback languages."}}}},p={render:()=>{const n=Object.fromEntries(Object.entries(i).slice(0,4));return a.jsx(f,{knownUiLanguages:n,localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"Select fallback languages"}})},parameters:{docs:{description:{story:"Language selector with a limited set of available languages."}}}},h={render:()=>{const n={"zh-hans":i["zh-hans"],"zh-hant":i["zh-hant"],ja:i.ja,ko:i.ko,en:i.en};return a.jsx(f,{knownUiLanguages:n,initialPrimaryLanguage:"zh-hans",initialFallbackLanguages:["en"],localizedStrings:{"%settings_uiLanguageSelector_selectFallbackLanguages%":"选择后备语言"}})},parameters:{docs:{description:{story:"Language selector focused on Asian languages with Chinese (Simplified) as primary."}}}};var F,x,A;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <UiLanguageSelectorWithState knownUiLanguages={mockKnownLanguages} localizedStrings={{
    '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Select fallback languages'
  }} />,
  parameters: {
    docs: {
      description: {
        story: 'A language selector component for changing the UI language.'
      }
    }
  }
}`,...(A=(x=m.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var E,I,P;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <UiLanguageSelectorWithState knownUiLanguages={mockKnownLanguages} initialPrimaryLanguage="es" initialFallbackLanguages={['en', 'pt']} localizedStrings={{
    '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Seleccionar idiomas de respaldo'
  }} />,
  parameters: {
    docs: {
      description: {
        story: 'Language selector with Spanish primary and English/Portuguese fallback languages.'
      }
    }
  }
}`,...(P=(I=d.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var q,O,K;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const limitedLanguages = Object.fromEntries(Object.entries(mockKnownLanguages).slice(0, 4));
    return <UiLanguageSelectorWithState knownUiLanguages={limitedLanguages} localizedStrings={{
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
}`,...(K=(O=p.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};var R,G,W;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const asianLanguages = {
      'zh-hans': mockKnownLanguages['zh-hans'],
      'zh-hant': mockKnownLanguages['zh-hant'],
      ja: mockKnownLanguages.ja,
      ko: mockKnownLanguages.ko,
      en: mockKnownLanguages.en
    };
    return <UiLanguageSelectorWithState knownUiLanguages={asianLanguages} initialPrimaryLanguage="zh-hans" initialFallbackLanguages={['en']} localizedStrings={{
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
}`,...(W=(G=h.parameters)==null?void 0:G.docs)==null?void 0:W.source}}};const Ae=["Default","WithFallbackLanguages","LimitedLanguages","AsianLanguages"];export{h as AsianLanguages,m as Default,p as LimitedLanguages,d as WithFallbackLanguages,Ae as __namedExportsOrder,xe as default};
