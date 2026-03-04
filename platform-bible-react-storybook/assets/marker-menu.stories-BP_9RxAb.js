import{j as t}from"./jsx-runtime-DQENgDIO.js";import{r as d}from"./iframe-DFc6vHIg.js";import{C as g,a as w,c as x,b as M,d as b,e as y,f as _}from"./command-bm1wH1nI.js";import{B as j}from"./ban-6AJbm2ng.js";import{c as P}from"./createLucideIcon-C7agq0Ik.js";import"./preload-helper-CTOgD26E.js";import"./index-CQJwIC8G.js";import"./index-gJZ8GGUL.js";import"./index-AbgQcpJC.js";import"./index-BUfPUw2W.js";import"./index-DlnZPKNd.js";import"./index-C1CIvkuD.js";import"./index-Bp7Li-wt.js";import"./index-CRxCUaKB.js";import"./index-C2ifgHEu.js";import"./index-Dd6BBOJG.js";import"./index-v2Leg7ms.js";import"./index-CMwd9sXx.js";import"./index-BMfZutIv.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-J_H7UTVN.js";import"./x-DEdp8DXh.js";import"./search-CD8MNOZF.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z",key:"1pp7kr"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10",key:"2ik1ml"}],["path",{d:"m17 10 4 4-4 4",key:"vp2hj1"}]],c=P("ClipboardPaste",C);function I({icon:r,className:n}){const i=r??j;return t.jsx(i,{className:n,size:16})}function h({localizedStrings:r,markerMenuItems:n,searchRef:i}){const[o,f]=d.useState(""),k=d.useMemo(()=>{const e=o.trim().toLowerCase();return e?n.filter(a=>{var l;return a.marker&&((l=a.marker)==null?void 0:l.toLowerCase().includes(e))||!a.marker&&a.title.toLowerCase().includes(e)}):n},[o,n]);return t.jsxs(g,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[t.jsx(w,{className:"marker-menu-search",ref:i,value:o,onValueChange:e=>f(e),placeholder:r["%markerMenu_searchPlaceholder%"]}),t.jsxs(x,{children:[t.jsx(M,{children:r["%markerMenu_noResults%"]}),t.jsx(b,{children:k.map(e=>{var a;return t.jsxs(y,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:e.isDisallowed||e.isDeprecated,onSelect:e.action,children:[t.jsx("div",{className:"tw-w-8 tw-min-w-8",children:e.marker?t.jsx("span",{className:"tw-text-xs",children:e.marker}):t.jsx("div",{children:t.jsx(I,{icon:e.icon})})}),t.jsxs("div",{children:[t.jsx("p",{className:"tw-text-sm",children:e.title}),e.subtitle&&t.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:e.subtitle})]}),(e.isDisallowed||e.isDeprecated)&&t.jsx(_,{className:"tw-font-sans",children:e.isDisallowed?r["%markerMenu_disallowed_label%"]:r["%markerMenu_deprecated_label%"]})]},`item-${e.marker??((a=e.icon)==null?void 0:a.displayName)}-${e.title.replaceAll(" ","")}`)})})]})]})}h.__docgenInfo={description:"Marker menu component to render the list of markers and a few commands in the scripture editor",methods:[],displayName:"MarkerMenu",props:{localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof MARKER_MENU_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof MARKER_MENU_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings to pass through for the marker menu"},markerMenuItems:{required:!0,tsType:{name:"Array",elements:[{name:"MarkerMenuItem"}],raw:"MarkerMenuItem[]"},description:`A list of the marker menu items which can either be a marker to insert or some basic command
actions`},searchRef:{required:!1,tsType:{name:"LegacyRef",elements:[{name:"HTMLInputElement"}],raw:"LegacyRef<HTMLInputElement>"},description:"Optional ref for the command search input to be able to focus it manually"}}};const W={title:"Advanced/MarkerMenu",component:h,tags:["autodocs"],parameters:{docs:{description:{component:"A component that lists the markers and a few commands that can be used in the scripture editor."}}},argTypes:{localizedStrings:{control:"object",description:"List of localized strings to use in the MarkerMenu component"},markerMenuItems:{control:"object",description:"List of marker items to be displayed which can include both marker options or commands"}}},N={"%markerMenu_deprecated_label%":"Deprecated","%markerMenu_disallowed_label%":"Disallowed","%markerMenu_noResults%":"No results found.","%markerMenu_searchPlaceholder%":"Type a style or search."},s={args:{localizedStrings:N,markerMenuItems:[{marker:"p",title:"Paragraph",subtitle:"normal (with indent first line)",action:()=>alert("Paragraph marker selected!")},{icon:c,title:"Paste",action:()=>alert("Paste command selected!")},{icon:c,title:"Paste as plaintext",action:()=>alert("Past as plaintext selected!")},{marker:"pi",title:"Indented Paragraph",subtitle:"indent level 1 (with first line indent)",action:()=>alert("Indented Paragraph marker selected!"),isDisallowed:!0},{marker:"ph",title:"Indented paragraph with hanging indent",action:()=>alert("Indented paragraph with hanging indent marker selected!"),isDeprecated:!0}]}};var m,p,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const X=["Default"];export{s as Default,X as __namedExportsOrder,W as default};
