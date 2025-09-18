import{j as n}from"./jsx-runtime-4wK_0ZO4.js";import{V as e}from"./index-DOKkQ3oI.js";import{S as f,a as g,b as S,c as h,d as y}from"./select-DopLMRU5.js";import{a as I}from"./iframe-BcYeWgcr.js";import{c as G}from"./shadcn-ui.util-DMJ19wEV.js";const r={[e("undefined")]:"Ø",[e(0)]:"A",[e(1)]:"B",[e(2)]:"C",[e(3)]:"D",[e(4)]:"E",[e(5)]:"F",[e(6)]:"G",[e(7)]:"H",[e(8)]:"I",[e(9)]:"J",[e(10)]:"K",[e(11)]:"L",[e(12)]:"M",[e(13)]:"N",[e(14)]:"O",[e(15)]:"P",[e(16)]:"Q",[e(17)]:"R",[e(18)]:"S",[e(19)]:"T",[e(20)]:"U",[e(21)]:"V",[e(22)]:"W",[e(23)]:"X",[e(24)]:"Y",[e(25)]:"Z"};function z({availableScrollGroupIds:i,scrollGroupId:l,onChangeScrollGroupId:a,localizedStrings:d={},size:c="sm",className:u,id:p}){const t={...r,...Object.fromEntries(Object.entries(d).map(([o,s])=>[o,o===s&&o in r?r[o]:s]))},m=I();return n.jsxs(f,{value:`${l}`,onValueChange:o=>a(o==="undefined"?void 0:parseInt(o,10)),children:[n.jsx(g,{size:c,className:G("pr-twp tw-w-auto",u),children:n.jsx(S,{placeholder:t[e(l)]??l})}),n.jsx(h,{id:p,align:m==="rtl"?"end":"start",style:{zIndex:250},children:i.map(o=>n.jsx(y,{value:`${o}`,children:t[e(o)]},`${o}`))})]})}z.__docgenInfo={description:"Selector component for choosing a scroll group",methods:[],displayName:"ScrollGroupSelector",props:{availableScrollGroupIds:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(ScrollGroupId | undefined)[]"},description:"List of scroll group ids to show to the user. Either a `ScrollGroupId` or `undefined` for no\nscroll group"},scrollGroupId:{required:!0,tsType:{name:"union",raw:"ScrollGroupId | undefined",elements:[{name:"ScrollGroupId"},{name:"undefined"}]},description:"Currently selected scroll group id. `undefined` for no scroll group"},onChangeScrollGroupId:{required:!0,tsType:{name:"signature",type:"function",raw:"(newScrollGroupId: ScrollGroupId | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"ScrollGroupId | undefined",elements:[{name:"ScrollGroupId"},{name:"undefined"}]},name:"newScrollGroupId"}],return:{name:"void"}}},description:"Callback function run when the user tries to change the scroll group id"},localizedStrings:{required:!1,tsType:{name:"LanguageStrings"},description:`Localized strings to use for displaying scroll group ids. Must be an object whose keys are
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
\`\`\``,defaultValue:{value:"{}",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'default' | 'sm' | 'lg' | 'icon'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'icon'"}]},description:"Size of the scroll group dropdown button. Defaults to 'sm'",defaultValue:{value:"'sm'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the select element"}}};export{z as S};
