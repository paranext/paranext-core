import{r,j as t}from"./iframe-B0QPoExt.js";import{f as M,a as p,e as G,E as H,b as W}from"./editor-utils-BErtwsFL.js";import{B as Y}from"./button-BZsSMpo1.js";import{C as F,c as V,e as J}from"./command-CDfwD6I5.js";import{P as Q,a as X,b as Z}from"./popover-o7JwuEeU.js";import{C as $}from"./cancel-accept-buttons.component-CRBKwvqN.js";import{d as ee}from"./comment-list.utils-DeAjlqtC.js";import{A as te}from"./at-sign-BH95N18E.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-Ck84E_jq.js";import"./tooltip-VHxf8BnT.js";import"./utils-BPbySc-g.js";import"./z-index-CoNkaVR8.js";import"./index-Cffw8u4b.js";import"./index-DUnTc8LI.js";import"./index-uzc-mgJu.js";import"./index-7feSoujl.js";import"./index-ChBZ5lDH.js";import"./index-BcFtINXg.js";import"./index-DHmjPMt4.js";import"./index-CiK5G8IB.js";import"./index-CVUfQ6V2.js";import"./index-CYGDd-mI.js";import"./index-ChkVlXuY.js";import"./index-2UHnUVBX.js";import"./dialog-Bmc6Wzsd.js";import"./createReactComponent-rJoA7p0W.js";import"./index-CS3F6kIj.js";import"./index-Dpi5B48O.js";import"./toggle-group-CZebaQH4.js";import"./index-BnuTq2W6.js";import"./index-DnxaYsWV.js";import"./index-Qb1f7yK5.js";import"./italic-DlNl_fVE.js";import"./createLucideIcon-C5tbx1nB.js";import"./input-group-DaLNsHdP.js";import"./input-C--i0uuX.js";import"./IconCheck-0X0cEIGQ.js";import"./button-group-4AwEgIHL.js";import"./separator-DmEIW8po.js";import"./x-6ZM9XFjs.js";import"./check-C3kAoTGj.js";import"./platform.util-Dj487_od.js";const oe={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function g(o,n){return o===""?n["%commentEditor_unassigned%"]??"Unassigned":o==="Team"?n["%commentEditor_team%"]??"Team":o}function P({assignableUsers:o,onSave:n,onClose:h,localizedStrings:s,initialAssignedUser:D}){const[i,L]=r.useState(oe),[m,O]=r.useState(D),[B,l]=r.useState(!1),R=r.useRef(void 0),f=r.useRef(null);r.useEffect(()=>{let e=!0;const v=f.current;if(!v)return;const K=setTimeout(()=>{e&&M(v)},300);return()=>{e=!1,clearTimeout(K)}},[]);const w=r.useCallback(()=>{if(!p(i))return;const e=G(i);n(e,m)},[i,n,m]),q=s["%commentEditor_placeholder%"]??"Type your comment here...",z=s["%commentEditor_assignTo_label%"]??"Assign to";return t.jsxs("div",{className:"pr-twp tw:grid tw:gap-3",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between",children:[t.jsx("span",{className:"tw:text-sm tw:font-medium",children:z}),t.jsx($,{onCancelClick:h,onAcceptClick:w,canAccept:p(i),localizedStrings:s,acceptLabel:s["%commentEditor_saveButton_tooltip%"]})]}),t.jsx("div",{className:"tw:flex tw:items-center tw:gap-2",children:t.jsxs(Q,{open:B,onOpenChange:l,children:[t.jsx(X,{asChild:!0,children:t.jsxs(Y,{variant:"outline",className:"tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",disabled:o.length===0,children:[t.jsx(te,{className:"tw:h-4 tw:w-4"}),t.jsx("span",{children:g(m!==void 0?m:"",s)})]})}),t.jsx(Z,{className:"tw:w-auto tw:p-0",align:"start",onKeyDown:e=>{e.key==="Escape"&&(e.stopPropagation(),l(!1))},children:t.jsx(F,{children:t.jsx(V,{children:o.map(e=>t.jsx(J,{onSelect:()=>{O(e||void 0),l(!1)},className:"tw:flex tw:items-center",children:t.jsx("span",{children:g(e,s)})},e||"unassigned"))})})})]})}),t.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw:outline-hidden",onKeyDownCapture:e=>{e.key==="Escape"?(e.preventDefault(),e.stopPropagation(),h()):ee(e)&&(e.preventDefault(),e.stopPropagation(),p(i)&&w())},onKeyDown:e=>{W(e),(e.key==="Enter"||e.key===" ")&&e.stopPropagation()},children:t.jsx(H,{editorSerializedState:i,onSerializedChange:e=>L(e),placeholder:q,onClear:e=>{R.current=e}})})]})}P.__docgenInfo={description:`Component to create a new project comment from within the scripture editor

@param CommentEditorProps - The properties for the comment editor component`,methods:[],displayName:"CommentEditor",props:{assignableUsers:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"List of users that can be assigned to the new comment thread"},onSave:{required:!0,tsType:{name:"signature",type:"function",raw:"(contents: string, assignedUser?: string) => void",signature:{arguments:[{type:{name:"string"},name:"contents"},{type:{name:"string"},name:"assignedUser"}],return:{name:"void"}}},description:`External function to handle saving the new comment

@param contents HTML content of the comment
@param assignedUser Optional user to assign the comment to`},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`External function to handle closing the comment editor. Gets called when the editor is closed
without saving changes`},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof COMMENT_EDITOR_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof COMMENT_EDITOR_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings to be passed to the comment editor component"},initialAssignedUser:{required:!1,tsType:{name:"string"},description:`The user to pre-select in the "Assign to" dropdown when the editor opens. Used to persist the
last chosen assignee across consecutive comment creations within a session.`}}};const u={"%acceptButton_tooltip%":"Save","%cancelButton_tooltip%":"Cancel","%commentEditor_saveButton_tooltip%":"Save comment","%commentEditor_placeholder%":"Type your comment here...","%commentEditor_assignTo_label%":"Assign to","%commentEditor_unassigned%":"Unassigned","%commentEditor_team%":"Team"},I=["","Team","Alice","Bob","Charlie"],Ye={title:"Advanced/CommentEditor",component:P,tags:["autodocs"],decorators:[o=>t.jsx("div",{className:"tw:w-80",children:t.jsx(o,{})})],argTypes:{assignableUsers:{control:"object"}}},d={args:{assignableUsers:I,localizedStrings:u,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},a={args:{assignableUsers:I,localizedStrings:u,initialAssignedUser:"Alice",onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},c={args:{assignableUsers:[],localizedStrings:u,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}};var E,y,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    assignableUsers: mockAssignableUsers,
    localizedStrings: commentEditorLocalizedStrings,
    onSave: (contents, assignedUser) => {
      console.log('Comment saved:', {
        contents,
        assignedUser
      });
    },
    onClose: () => {
      console.log('Editor closed');
    }
  }
}`,...(C=(y=d.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var x,S,b,U,T;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    assignableUsers: mockAssignableUsers,
    localizedStrings: commentEditorLocalizedStrings,
    initialAssignedUser: 'Alice',
    onSave: (contents, assignedUser) => {
      console.log('Comment saved:', {
        contents,
        assignedUser
      });
    },
    onClose: () => {
      console.log('Editor closed');
    }
  }
}`,...(b=(S=a.parameters)==null?void 0:S.docs)==null?void 0:b.source},description:{story:`Story demonstrating the editor with a pre-selected assignee. Simulates opening the editor after a
previous comment was assigned to Alice — the dropdown shows Alice pre-selected.`,...(T=(U=a.parameters)==null?void 0:U.docs)==null?void 0:T.description}}};var A,j,_,N,k;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    assignableUsers: [],
    localizedStrings: commentEditorLocalizedStrings,
    onSave: (contents, assignedUser) => {
      console.log('Comment saved:', {
        contents,
        assignedUser
      });
    },
    onClose: () => {
      console.log('Editor closed');
    }
  }
}`,...(_=(j=c.parameters)==null?void 0:j.docs)==null?void 0:_.source},description:{story:"Story demonstrating the editor when no users are available for assignment",...(k=(N=c.parameters)==null?void 0:N.docs)==null?void 0:k.description}}};const Fe=["Default","WithInitialAssignee","NoAssignableUsers"];export{d as Default,c as NoAssignableUsers,a as WithInitialAssignee,Fe as __namedExportsOrder,Ye as default};
