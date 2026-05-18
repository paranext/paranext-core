import{j as t}from"./jsx-runtime-BqcUmbcY.js";import{T as M}from"./theme-provider.component-Cvjq5fm5.js";import{f as G,a as p,e as H,E as W,b as Y}from"./editor-utils-3CToZEBY.js";import{B as F}from"./button-D-Y0-MVZ.js";import{C as V,b as J,e as Q}from"./command-DqDyBX47.js";import{P as X,a as Z,b as $}from"./popover-Ly8a1DJp.js";import{C as ee}from"./cancel-accept-buttons.component-BCTHUyVh.js";import{r}from"./iframe-CTFeqsaU.js";import{d as te}from"./comment-list.utils-Dc9Zd_Xc.js";import{A as oe}from"./at-sign-DJxBNeR8.js";import"./LexicalTable.prod-C7lALwUT.js";import"./index-DyG1FY6L.js";import"./index-DasKyulm.js";import"./tooltip-CvMAf3Er.js";import"./utils-BPbySc-g.js";import"./z-index-BATlIu8s.js";import"./index-CrprARdV.js";import"./index-h6nU96Nj.js";import"./index-Bz_elcL5.js";import"./index-BIiwzcA3.js";import"./index-B_gWPIE3.js";import"./index-NDEKFPcd.js";import"./index-DEEuL5ue.js";import"./index-DxJHqNyO.js";import"./index-Bz1D5jMs.js";import"./index-Dp4Xx3Xx.js";import"./index-CKqOUpvW.js";import"./index-X2wtV6fy.js";import"./dialog-yXWWjOyd.js";import"./createReactComponent-CR06EuV8.js";import"./index-B0H16lvL.js";import"./index-C5GGbPN7.js";import"./toggle-group-D9zudFgZ.js";import"./index-BnuTq2W6.js";import"./index-C-Hux5y1.js";import"./index-CZ7swpmc.js";import"./italic-DNDJbYbz.js";import"./createLucideIcon-D22C0aMl.js";import"./input-group-CPDw1C9i.js";import"./input-C3oppNdn.js";import"./IconCheck-D0oGOz8f.js";import"./button-group-zes0f7RR.js";import"./separator-oryLP7nC.js";import"./x-CUZF7dO-.js";import"./check-Dcwxp7Xx.js";import"./preload-helper-CTOgD26E.js";const ne={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function g(o,n){return o===""?n["%commentEditor_unassigned%"]??"Unassigned":o==="Team"?n["%commentEditor_team%"]??"Team":o}function k({assignableUsers:o,onSave:n,onClose:h,localizedStrings:s,initialAssignedUser:D}){const[i,L]=r.useState(ne),[m,O]=r.useState(D),[B,l]=r.useState(!1),R=r.useRef(void 0),f=r.useRef(null);r.useEffect(()=>{let e=!0;const v=f.current;if(!v)return;const K=setTimeout(()=>{e&&G(v)},300);return()=>{e=!1,clearTimeout(K)}},[]);const w=r.useCallback(()=>{if(!p(i))return;const e=H(i);n(e,m)},[i,n,m]),q=s["%commentEditor_placeholder%"]??"Type your comment here...",z=s["%commentEditor_assignTo_label%"]??"Assign to";return t.jsxs("div",{className:"pr-twp tw:grid tw:gap-3",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between",children:[t.jsx("span",{className:"tw:text-sm tw:font-medium",children:z}),t.jsx(ee,{onCancelClick:h,onAcceptClick:w,canAccept:p(i),localizedStrings:s,acceptLabel:s["%commentEditor_saveButton_tooltip%"]})]}),t.jsx("div",{className:"tw:flex tw:items-center tw:gap-2",children:t.jsxs(X,{open:B,onOpenChange:l,children:[t.jsx(Z,{asChild:!0,children:t.jsxs(F,{variant:"outline",className:"tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",disabled:o.length===0,children:[t.jsx(oe,{className:"tw:h-4 tw:w-4"}),t.jsx("span",{children:g(m!==void 0?m:"",s)})]})}),t.jsx($,{className:"tw:w-auto tw:p-0",align:"start",onKeyDown:e=>{e.key==="Escape"&&(e.stopPropagation(),l(!1))},children:t.jsx(V,{children:t.jsx(J,{children:o.map(e=>t.jsx(Q,{onSelect:()=>{O(e||void 0),l(!1)},className:"tw:flex tw:items-center",children:t.jsx("span",{children:g(e,s)})},e||"unassigned"))})})})]})}),t.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw:outline-hidden",onKeyDownCapture:e=>{e.key==="Escape"?(e.preventDefault(),e.stopPropagation(),h()):te(e)&&(e.preventDefault(),e.stopPropagation(),p(i)&&w())},onKeyDown:e=>{Y(e),(e.key==="Enter"||e.key===" ")&&e.stopPropagation()},children:t.jsx(W,{editorSerializedState:i,onSerializedChange:e=>L(e),placeholder:q,onClear:e=>{R.current=e}})})]})}k.__docgenInfo={description:`Component to create a new project comment from within the scripture editor

@param CommentEditorProps - The properties for the comment editor component`,methods:[],displayName:"CommentEditor",props:{assignableUsers:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"List of users that can be assigned to the new comment thread"},onSave:{required:!0,tsType:{name:"signature",type:"function",raw:"(contents: string, assignedUser?: string) => void",signature:{arguments:[{type:{name:"string"},name:"contents"},{type:{name:"string"},name:"assignedUser"}],return:{name:"void"}}},description:`External function to handle saving the new comment

@param contents HTML content of the comment
@param assignedUser Optional user to assign the comment to`},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`External function to handle closing the comment editor. Gets called when the editor is closed
without saving changes`},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof COMMENT_EDITOR_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof COMMENT_EDITOR_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings to be passed to the comment editor component"},initialAssignedUser:{required:!1,tsType:{name:"string"},description:`The user to pre-select in the "Assign to" dropdown when the editor opens. Used to persist the
last chosen assignee across consecutive comment creations within a session.`}}};const u={"%acceptButton_tooltip%":"Save","%cancelButton_tooltip%":"Cancel","%commentEditor_saveButton_tooltip%":"Save comment","%commentEditor_placeholder%":"Type your comment here...","%commentEditor_assignTo_label%":"Assign to","%commentEditor_unassigned%":"Unassigned","%commentEditor_team%":"Team"},I=["","Team","Alice","Bob","Charlie"],Qe={title:"Advanced/CommentEditor",component:k,tags:["autodocs"],decorators:[o=>t.jsx(M,{children:t.jsx("div",{className:"tw:w-80",children:t.jsx(o,{})})})],argTypes:{assignableUsers:{control:"object"}}},d={args:{assignableUsers:I,localizedStrings:u,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},a={args:{assignableUsers:I,localizedStrings:u,initialAssignedUser:"Alice",onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},c={args:{assignableUsers:[],localizedStrings:u,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}};var E,y,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(C=(y=d.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var x,S,b,T,U;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
previous comment was assigned to Alice — the dropdown shows Alice pre-selected.`,...(U=(T=a.parameters)==null?void 0:T.docs)==null?void 0:U.description}}};var j,A,_,N,P;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(_=(A=c.parameters)==null?void 0:A.docs)==null?void 0:_.source},description:{story:"Story demonstrating the editor when no users are available for assignment",...(P=(N=c.parameters)==null?void 0:N.docs)==null?void 0:P.description}}};const Xe=["Default","WithInitialAssignee","NoAssignableUsers"];export{d as Default,c as NoAssignableUsers,a as WithInitialAssignee,Xe as __namedExportsOrder,Qe as default};
