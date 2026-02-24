import{j as t}from"./jsx-runtime-ByhiKpOJ.js";import{r as l}from"./iframe-ChO9S-yu.js";import{C as f,a as g,c as w,b as x,d as M,e as b,f as y}from"./command-Ds-BUoyM.js";import{B as _}from"./ban-BP3W52CU.js";import{c as j}from"./createLucideIcon-D3kgklP4.js";import"./preload-helper-CTOgD26E.js";import"./index-tkMziL9d.js";import"./index-fWfJ5uqY.js";import"./index-DYwfqbVx.js";import"./index-DnQiTyJn.js";import"./index-BZDhxX1I.js";import"./index-Bu6iQluy.js";import"./index-D97NFnTf.js";import"./index-CFcaIACy.js";import"./index-JyFyXt8X.js";import"./index-D8kg2Bik.js";import"./index-B6Da9D8T.js";import"./index-CcxGHNAr.js";import"./index-3cpk_XYT.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-CESVXb1_.js";import"./x-BaoaJ8Xr.js";import"./search-BT4mgQXQ.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z",key:"1pp7kr"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10",key:"2ik1ml"}],["path",{d:"m17 10 4 4-4 4",key:"vp2hj1"}]],d=j("ClipboardPaste",P);function C({icon:a,className:r}){const n=a??_;return t.jsx(n,{className:r,size:16})}function u({localizedStrings:a,markerMenuItems:r}){const[n,h]=l.useState(""),k=l.useMemo(()=>{const e=n.trim().toLowerCase();return e?r.filter(s=>{var o;return((o=s.marker)==null?void 0:o.toLowerCase().includes(e))||s.title.toLowerCase().includes(e)}):r},[n,r]);return t.jsxs(f,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[t.jsx(g,{value:n,onValueChange:e=>h(e),placeholder:a["%markerMenu_searchPlaceholder%"],autoFocus:!1}),t.jsxs(w,{children:[t.jsx(x,{children:a["%markerMenu_noResults%"]}),t.jsx(M,{children:k.map(e=>{var s;return t.jsxs(b,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:e.isDisallowed||e.isDeprecated,onSelect:e.action,children:[t.jsx("div",{className:"tw-w-6",children:e.marker?t.jsx("span",{className:"tw-text-xs",children:e.marker}):t.jsx("div",{children:t.jsx(C,{icon:e.icon})})}),t.jsxs("div",{children:[t.jsx("p",{className:"tw-text-sm",children:e.title}),e.subtitle&&t.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:e.subtitle})]}),(e.isDisallowed||e.isDeprecated)&&t.jsx(y,{className:"tw-font-sans",children:e.isDisallowed?a["%markerMenu_disallowed_label%"]:a["%markerMenu_deprecated_label%"]})]},`item-${e.marker??((s=e.icon)==null?void 0:s.displayName)}-${e.title.replaceAll(" ","")}`)})})]})]})}u.__docgenInfo={description:"Marker menu component to render the list of markers and a few commands in the scripture editor",methods:[],displayName:"MarkerMenu",props:{localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof MARKER_MENU_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof MARKER_MENU_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings to pass through for the marker menu"},markerMenuItems:{required:!0,tsType:{name:"Array",elements:[{name:"MarkerMenuItem"}],raw:"MarkerMenuItem[]"},description:`A list of the marker menu items which can either be a marker to insert or some basic command
actions`}}};const Q={title:"Advanced/MarkerMenu",component:u,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},I={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},i={args:{localizedStrings:I,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:d,title:"Paste",action:()=>alert("Paste command selected!")},{icon:d,title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}};var c,m,p;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    localizedStrings: defaultLocalizedStrings,
    markerMenuItems: [{
      marker: 'p',
      title: 'Paragraph',
      subtitle: 'normal (with indent first line)',
      // eslint-disable-next-line no-alert
      action: () => alert('Paragraph marker selected!')
    }, {
      icon: ClipboardPaste,
      title: 'Paste',
      // eslint-disable-next-line no-alert
      action: () => alert('Paste command selected!')
    }, {
      icon: ClipboardPaste,
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
}`,...(p=(m=i.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const W=["Default"];export{i as Default,W as __namedExportsOrder,Q as default};
