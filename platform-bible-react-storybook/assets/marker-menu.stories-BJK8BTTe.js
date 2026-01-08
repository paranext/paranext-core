import{j as t}from"./jsx-runtime-NBxPu_RQ.js";import{r as l}from"./iframe-DqyNn6dQ.js";import{C as f,a as g,c as w,b as x,d as b,e as M,f as y}from"./command-VzMsBwHw.js";import{c as _}from"./createLucideIcon-ChClvniI.js";import"./index-0kHFM7lt.js";import"./index-DTAXz6r9.js";import"./index-JmnYvUHf.js";import"./index-BS7JiZCw.js";import"./index-DzOCTLUZ.js";import"./index-p-D2zjEs.js";import"./index-CvLmzNXn.js";import"./index-DgIfDI0d.js";import"./index-BsbuKiFW.js";import"./index-Fs7xnYF6.js";import"./index-DLwJpgK8.js";import"./index-1SXiDTPQ.js";import"./index-C_hoCkfE.js";import"./index-DztKOWc1.js";import"./index-WBqoZvtE.js";import"./index-C7Mx95la.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-CQ0q9gYP.js";import"./index-Czfav6j7.js";import"./x-28rpzuMr.js";import"./search-D0Esy7Kj.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z",key:"1pp7kr"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10",key:"2ik1ml"}],["path",{d:"m17 10 4 4-4 4",key:"vp2hj1"}]],d=_("ClipboardPaste",j);function u({localizedStrings:r,markerMenuItems:n}){const[s,h]=l.useState(""),k=l.useMemo(()=>{const e=s.trim().toLowerCase();return e?n.filter(i=>{var o;return((o=i.marker)==null?void 0:o.toLowerCase().includes(e))||i.title.toLowerCase().includes(e)}):n},[s,n]);return t.jsxs(f,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[t.jsx(g,{value:s,onValueChange:e=>h(e),placeholder:r["%markerMenu_searchPlaceholder%"]}),t.jsxs(w,{children:[t.jsx(x,{children:r["%markerMenu_noResults%"]}),t.jsx(b,{children:k.map(e=>t.jsxs(M,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:e.isDisallowed||e.isDeprecated,onSelect:e.action,children:[t.jsx("div",{className:"tw-w-6",children:e.marker?t.jsx("span",{className:"tw-text-xs",children:e.marker}):t.jsx("div",{children:e.icon})}),t.jsxs("div",{children:[t.jsx("p",{className:"tw-text-sm",children:e.title}),e.subtitle&&t.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:e.subtitle})]}),(e.isDisallowed||e.isDeprecated)&&t.jsx(y,{className:"tw-font-sans",children:e.isDisallowed?r["%markerMenu_disallowed_label%"]:r["%markerMenu_deprecated_label%"]})]},`item-${e.title}`))})]})]})}u.__docgenInfo={description:"Marker menu component to render the list of markers and a few commands in the scripture editor",methods:[],displayName:"MarkerMenu",props:{localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof MARKER_MENU_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof MARKER_MENU_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings to pass through for the marker menu"},markerMenuItems:{required:!0,tsType:{name:"Array",elements:[{name:"MarkerMenuItem"}],raw:"MarkerMenuItem[]"},description:`A list of the marker menu items which can either be a marker to insert or some basic command
actions`}}};const Q={title:"Advanced/MarkerMenu",component:u,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},P={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},a={args:{localizedStrings:P,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:t.jsx(d,{size:16}),title:"Paste",action:()=>alert("Paste command selected!")},{icon:t.jsx(d,{size:16}),title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}};var c,m,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    localizedStrings: defaultLocalizedStrings,
    markerMenuItems: [{
      marker: 'p',
      title: 'Paragraph',
      subtitle: 'normal (with indent first line)',
      // eslint-disable-next-line no-alert
      action: () => alert('Paragraph marker selected!')
    }, {
      icon: <ClipboardPaste size={16} />,
      title: 'Paste',
      // eslint-disable-next-line no-alert
      action: () => alert('Paste command selected!')
    }, {
      icon: <ClipboardPaste size={16} />,
      title: 'Paste as plaintext',
      // eslint-disable-next-line no-alert
      action: () => alert('Past as plaintext selected!')
    }, {
      marker: 'pi',
      title: 'Indented Paragraph',
      subtitle: 'indent level 1 (with first line indent)',
      // eslint-disable-next-line no-alert
      action: () => alert('Indented Paragraph marker selected!'),
      isDisallowed: true
    }, {
      marker: 'ph',
      title: 'Indented paragraph with hanging indent',
      // eslint-disable-next-line no-alert
      action: () => alert('Indented paragraph with hanging indent marker selected!'),
      isDeprecated: true
    }]
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const W=["Default"];export{a as Default,W as __namedExportsOrder,Q as default};
