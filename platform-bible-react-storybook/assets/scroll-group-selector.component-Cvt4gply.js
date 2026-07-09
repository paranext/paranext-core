import{b as f,j as o}from"./iframe-C8C5euZN.js";import"./index-D7R6UePp.js";import{Z as r,u as s}from"./scripture-util-A_1QUftH-D53X2Fsv.js";import{S as g,a as h,b as S,c as y,d as I}from"./select-DLm214Kt.js";import{c as z}from"./utils-BPbySc-g.js";import{Z as G}from"./z-index-CoNkaVR8.js";function w({availableScrollGroupIds:i,scrollGroupId:n,onChangeScrollGroupId:a,localizedStrings:d={},size:c="sm",className:u,id:p}){const l={...r,...Object.fromEntries(Object.entries(d).map(([e,t])=>[e,e===t&&e in r?r[e]:t]))},m=f();return o.jsxs(g,{value:`${n}`,onValueChange:e=>a(e==="undefined"?void 0:parseInt(e,10)),children:[o.jsx(h,{size:c,className:z("pr-twp tw:w-auto",u),children:o.jsx(S,{placeholder:l[s(n)]??n})}),o.jsx(y,{id:p,align:m==="rtl"?"end":"start",style:{zIndex:G},children:i.map(e=>o.jsx(I,{value:`${e}`,children:l[s(e)]},`${e}`))})]})}w.__docgenInfo={description:"Selector component for choosing a scroll group",methods:[],displayName:"ScrollGroupSelector",props:{availableScrollGroupIds:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(ScrollGroupId | undefined)[]"},description:"List of scroll group ids to show to the user. Either a `ScrollGroupId` or `undefined` for no\nscroll group"},scrollGroupId:{required:!0,tsType:{name:"union",raw:"ScrollGroupId | undefined",elements:[{name:"ScrollGroupId"},{name:"undefined"}]},description:"Currently selected scroll group id. `undefined` for no scroll group"},onChangeScrollGroupId:{required:!0,tsType:{name:"signature",type:"function",raw:"(newScrollGroupId: ScrollGroupId | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"ScrollGroupId | undefined",elements:[{name:"ScrollGroupId"},{name:"undefined"}]},name:"newScrollGroupId"}],return:{name:"void"}}},description:"Callback function run when the user tries to change the scroll group id"},localizedStrings:{required:!1,tsType:{name:"LanguageStrings"},description:`Localized strings to use for displaying scroll group ids. Must be an object whose keys are
\`getLocalizeKeyForScrollGroupId(scrollGroupId)\` for all scroll group ids (and \`undefined\` if
included) in {@link ScrollGroupSelectorProps.availableScrollGroupIds} and whose values are the
localized strings to use for those scroll group ids.

Defaults to English localizations of English alphabet for scroll groups 0-25 (e.g. 0 is A) and
Ø for \`undefined\`. Will fill in any that are not provided with these English localizations.
Also, if any values match the keys, the English localization will be used. This is useful in
case you want to pass in a temporary version of the localized strings while your localized
strings load.

@example

\`\`\`typescript
const myScrollGroupIdLocalizedStrings = {
  [getLocalizeKeyForScrollGroupId('undefined')]: 'Ø',
  [getLocalizeKeyForScrollGroupId(0)]: 'A',
  [getLocalizeKeyForScrollGroupId(1)]: 'B',
  [getLocalizeKeyForScrollGroupId(2)]: 'C',
  [getLocalizeKeyForScrollGroupId(3)]: 'D',
  [getLocalizeKeyForScrollGroupId(4)]: 'E',
};
\`\`\`

@example

\`\`\`tsx
const availableScrollGroupIds = [undefined, 0, 1, 2, 3, 4];

const localizeKeys = getLocalizeKeysForScrollGroupIds();

const [localizedStrings] = useLocalizedStrings(localizeKeys);

...

<ScrollGroupSelector localizedStrings={localizedStrings} />
\`\`\``,defaultValue:{value:"{}",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'default' | 'sm'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'sm'"}]},description:"Size of the scroll group dropdown button. Defaults to 'sm'",defaultValue:{value:"'sm'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the select element"}}};export{w as S};
