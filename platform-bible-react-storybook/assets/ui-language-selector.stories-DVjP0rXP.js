import{j as n}from"./jsx-runtime-CvGToidP.js";import{r as g}from"./iframe-FHgAwj54.js";import{h as D}from"./index-Bf4Kv1PK.js";import{c as J}from"./shadcn-ui.util-DMJ19wEV.js";import{S as B,a as H,b as Y,c as $,d as M}from"./select-Db4UU3si.js";import{L as Q}from"./label-B_TcSZF3.js";import{T as X}from"./theme-provider.component-BRfsG9zC.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-BaQP4hhM.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-CnlM3g2y.js";import"./index-DvVrmaIy.js";import"./index-D-wbo5Oc.js";import"./index-C6LUVuya.js";import"./index-lUSupRFo.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DEtppfdW.js";import"./index-q5xUhQdo.js";import"./index-BPbCuWFR.js";import"./chevron-down-i-XYDP49.js";import"./createLucideIcon-B4WsWZHQ.js";import"./check-Ce2iVscw.js";const Z=(a,t)=>a[t]??t;function b({knownUiLanguages:a,primaryLanguage:t="en",fallbackLanguages:s=[],onLanguagesChange:l,onPrimaryLanguageChange:u,onFallbackLanguagesChange:c,localizedStrings:y,className:L,id:S}){const o=Z(y,"%settings_uiLanguageSelector_fallbackLanguages%"),[W,k]=g.useState(!1),V=e=>{u&&u(e),l&&l([e,...s.filter(r=>r!==e)]),c&&s.find(r=>r===e)&&c([...s.filter(r=>r!==e)]),k(!1)},w=(e,r)=>{var T,_,U,z,N,v;const j=r!==e?((_=(T=a[e])==null?void 0:T.uiNames)==null?void 0:_[r])??((z=(U=a[e])==null?void 0:U.uiNames)==null?void 0:z.en):void 0;return j?`${(N=a[e])==null?void 0:N.autonym} (${j})`:(v=a[e])==null?void 0:v.autonym};return n.jsxs("div",{id:S,className:J("pr-twp tw-max-w-sm",L),children:[n.jsxs(B,{name:"uiLanguage",value:t,onValueChange:V,open:W,onOpenChange:e=>k(e),children:[n.jsx(H,{children:n.jsx(Y,{})}),n.jsx($,{className:"tw-z-[250]",children:Object.keys(a).map(e=>n.jsx(M,{value:e,children:w(e,t)},e))})]}),t!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(Q,{className:"tw-font-normal tw-text-muted-foreground",children:D(o,{fallbackLanguages:(s==null?void 0:s.length)>0?s.map(e=>w(e,t)).join(", "):a.en.autonym})})})]})}b.__docgenInfo={description:`A component for selecting the user interface language and managing fallback languages. Allows
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
whose values are the localized strings (in the current UI language).`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the control"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the root element"}}};const i={en:{autonym:"English",uiNames:{es:"Inglés",fr:"Anglais",de:"Englisch"}},es:{autonym:"Español",uiNames:{en:"Spanish",fr:"Espagnol",de:"Spanisch"}},fr:{autonym:"Français",uiNames:{en:"French",es:"Francés",de:"Französisch"}},de:{autonym:"Deutsch",uiNames:{en:"German",es:"Alemán",fr:"Allemand"}},pt:{autonym:"Português",uiNames:{en:"Portuguese",es:"Portugués",fr:"Portugais",de:"Portugiesisch"}},"zh-hans":{autonym:"简体中文",uiNames:{en:"Chinese (Simplified)",es:"Chino (Simplificado)",fr:"Chinois (Simplifié)"}},"zh-hant":{autonym:"繁體中文",uiNames:{en:"Chinese (Traditional)",es:"Chino (Tradicional)",fr:"Chinois (Traditionnel)"}},ja:{autonym:"日本語",uiNames:{en:"Japanese",es:"Japonés",fr:"Japonais",de:"Japanisch"}},ko:{autonym:"한국어",uiNames:{en:"Korean",es:"Coreano",fr:"Coréen",de:"Koreanisch"}},ar:{autonym:"العربية",uiNames:{en:"Arabic",es:"Árabe",fr:"Arabe",de:"Arabisch"}}},ee=a=>{console.log("Languages changed to:",a)};function f({initialPrimaryLanguage:a="en",initialFallbackLanguages:t=[],...s}){const[l,u]=g.useState(a),[c,y]=g.useState(t),L=g.useCallback(o=>{u(o),console.log("Primary language changed to:",o)},[]),S=g.useCallback(o=>{y(o),console.log("Fallback languages changed to:",o)},[]);return n.jsx(b,{...s,primaryLanguage:l,fallbackLanguages:c,onLanguagesChange:ee,onPrimaryLanguageChange:L,onFallbackLanguagesChange:S})}const Ee={title:"Advanced/UI Language Selector",component:b,tags:["autodocs"],decorators:[a=>n.jsx(X,{children:n.jsx("div",{className:"tw-max-w-md tw-p-4",children:n.jsx(a,{})})})]},m={render:()=>n.jsx(f,{knownUiLanguages:i,localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Fallback languages"}}),parameters:{docs:{description:{story:"A language selector component for changing the UI language."}}}},d={render:()=>n.jsx(f,{knownUiLanguages:i,initialPrimaryLanguage:"es",initialFallbackLanguages:["en","pt"],localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Idiomas de respaldo de Interfaz"}}),parameters:{docs:{description:{story:"Language selector with Spanish primary and English/Portuguese fallback languages."}}}},p={render:()=>{const a=Object.fromEntries(Object.entries(i).slice(0,4));return n.jsx(f,{knownUiLanguages:a,localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"Fallback Languages"}})},parameters:{docs:{description:{story:"Language selector with a limited set of available languages."}}}},h={render:()=>{const a={"zh-hans":i["zh-hans"],"zh-hant":i["zh-hant"],ja:i.ja,ko:i.ko,en:i.en};return n.jsx(f,{knownUiLanguages:a,initialPrimaryLanguage:"zh-hans",initialFallbackLanguages:["en"],localizedStrings:{"%settings_uiLanguageSelector_fallbackLanguages%":"后备语言"}})},parameters:{docs:{description:{story:"Language selector focused on Asian languages with Chinese (Simplified) as primary."}}}};var C,x,A;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(A=(x=m.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var E,I,F;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(F=(I=d.parameters)==null?void 0:I.docs)==null?void 0:F.source}}};var P,q,O;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(O=(q=p.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};var K,R,G;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(G=(R=h.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};const Ie=["Default","WithFallbackLanguages","LimitedLanguages","AsianLanguages"];export{h as AsianLanguages,m as Default,p as LimitedLanguages,d as WithFallbackLanguages,Ie as __namedExportsOrder,Ee as default};
