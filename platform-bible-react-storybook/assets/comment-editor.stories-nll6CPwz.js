import{j as e}from"./jsx-runtime-DdMd9hEz.js";import{T as X}from"./theme-provider.component-BNMWEsSq.js";import{f as J,a as p,e as Q,E as Z,b as $}from"./editor-utils-C8BQ4TKT.js";import{B as g}from"./button-CxdJtNv-.js";import{C as ee,c as te,e as oe}from"./command-8FJ3zfCm.js";import{P as ne,a as se,b as re}from"./popover-C9c44_G8.js";import{c as E,T as y,a as C,b as j}from"./tooltip-E7jnIlPA.js";import{r}from"./iframe-CP9w8tG2.js";import{A as ie,d as ae}from"./comment-list.utils-DWVdX_zN.js";import{X as ce}from"./x-CsedCQn8.js";import{C as me}from"./check-D4bL0kiR.js";import"./LexicalTable.prod-BUmXxOI6.js";import"./index-tvnb6adJ.js";import"./index-Df0-lD-y.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./dialog-B5zpwzX2.js";import"./index-a1KmDMUa.js";import"./index-DmWLjvBA.js";import"./index-BHtFMn9j.js";import"./index-DVSn98zC.js";import"./index-aksreBNd.js";import"./index-CAOtyErT.js";import"./index-CPSYZMgP.js";import"./index-dC6bSqj8.js";import"./index-X-ZBUBVA.js";import"./z-index-B4JyHfu5.js";import"./toggle-group-B4UHip-q.js";import"./index-CI-w-sM5.js";import"./index-B0nEOtAF.js";import"./index-DTAXz6r9.js";import"./index-C7iw6H11.js";import"./index-wyvJkCZf.js";import"./index-BPbCuWFR.js";import"./italic-2seZSd5G.js";import"./createLucideIcon-BIs2lEw6.js";import"./index-COLRcBkh.js";import"./search-SOWzjx_f.js";import"./index-DhFSPgnG.js";import"./floating-ui.react-dom-BkKl4Thl.js";import"./index-gGKWoAED.js";import"./index-DoNwQboG.js";import"./index-OXvW7xgX.js";import"./index-BLN0HQOT.js";import"./index-Bb27ygNT.js";import"./preload-helper-CTOgD26E.js";const de={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function u(o,n){return o===""?n["%commentEditor_unassigned%"]??"Unassigned":o==="Team"?n["%commentEditor_team%"]??"Team":o}function L({assignableUsers:o,onSave:n,onClose:f,localizedStrings:s,initialAssignedUser:q}){const[i,B]=r.useState(de),[m,K]=r.useState(q),[M,l]=r.useState(!1),G=r.useRef(void 0),w=r.useRef(null);r.useEffect(()=>{let t=!0;const x=w.current;if(!x)return;const V=setTimeout(()=>{t&&J(x)},300);return()=>{t=!1,clearTimeout(V)}},[]);const v=r.useCallback(()=>{if(!p(i))return;const t=Q(i);n(t,m)},[i,n,m]),H=s["%commentEditor_placeholder%"]??"Type your comment here...",W=s["%commentEditor_saveButton_tooltip%"]??"Save comment",Y=s["%commentEditor_cancelButton_tooltip%"]??"Cancel",F=s["%commentEditor_assignTo_label%"]??"Assign to";return e.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[e.jsx("span",{className:"tw-text-sm tw-font-medium",children:F}),e.jsxs("div",{className:"tw-flex tw-gap-2",children:[e.jsx(E,{children:e.jsxs(y,{children:[e.jsx(C,{asChild:!0,children:e.jsx(g,{onClick:f,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:e.jsx(ce,{})})}),e.jsx(j,{children:e.jsx("p",{children:Y})})]})}),e.jsx(E,{children:e.jsxs(y,{children:[e.jsx(C,{asChild:!0,children:e.jsx(g,{onClick:v,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!p(i),children:e.jsx(me,{})})}),e.jsx(j,{children:e.jsx("p",{children:W})})]})})]})]}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs(ne,{open:M,onOpenChange:l,children:[e.jsx(se,{asChild:!0,children:e.jsxs(g,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:o.length===0,children:[e.jsx(ie,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{children:u(m!==void 0?m:"",s)})]})}),e.jsx(re,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:t=>{t.key==="Escape"&&(t.stopPropagation(),l(!1))},children:e.jsx(ee,{children:e.jsx(te,{children:o.map(t=>e.jsx(oe,{onSelect:()=>{K(t||void 0),l(!1)},className:"tw-flex tw-items-center",children:e.jsx("span",{children:u(t,s)})},t||"unassigned"))})})})]})}),e.jsx("div",{ref:w,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:t=>{t.key==="Escape"?(t.preventDefault(),t.stopPropagation(),f()):ae(t)&&(t.preventDefault(),t.stopPropagation(),p(i)&&v())},onKeyDown:t=>{$(t),(t.key==="Enter"||t.key===" ")&&t.stopPropagation()},children:e.jsx(Z,{editorSerializedState:i,onSerializedChange:t=>B(t),placeholder:H,onClear:t=>{G.current=t}})})]})}L.__docgenInfo={description:`Component to create a new project comment from within the scripture editor

@param CommentEditorProps - The properties for the comment editor component`,methods:[],displayName:"CommentEditor",props:{assignableUsers:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"List of users that can be assigned to the new comment thread"},onSave:{required:!0,tsType:{name:"signature",type:"function",raw:"(contents: string, assignedUser?: string) => void",signature:{arguments:[{type:{name:"string"},name:"contents"},{type:{name:"string"},name:"assignedUser"}],return:{name:"void"}}},description:`External function to handle saving the new comment

@param contents HTML content of the comment
@param assignedUser Optional user to assign the comment to`},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`External function to handle closing the comment editor. Gets called when the editor is closed
without saving changes`},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof COMMENT_EDITOR_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof COMMENT_EDITOR_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings to be passed to the comment editor component"},initialAssignedUser:{required:!1,tsType:{name:"string"},description:`The user to pre-select in the "Assign to" dropdown when the editor opens. Used to persist the
last chosen assignee across consecutive comment creations within a session.`}}};const h={"%commentEditor_placeholder%":"Type your comment here...","%commentEditor_saveButton_tooltip%":"Save comment","%commentEditor_cancelButton_tooltip%":"Cancel","%commentEditor_assignTo_label%":"Assign to","%commentEditor_unassigned%":"Unassigned","%commentEditor_team%":"Team"},R=["","Team","Alice","Bob","Charlie"],ot={title:"Advanced/CommentEditor",component:L,tags:["autodocs"],decorators:[o=>e.jsx(X,{children:e.jsx("div",{className:"tw-w-80",children:e.jsx(o,{})})})],argTypes:{assignableUsers:{control:"object"}}},d={args:{assignableUsers:R,localizedStrings:h,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},a={args:{assignableUsers:R,localizedStrings:h,initialAssignedUser:"Alice",onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},c={args:{assignableUsers:[],localizedStrings:h,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}};var S,T,b;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(b=(T=d.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var U,_,A,N,P;a.parameters={...a.parameters,docs:{...(U=a.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(A=(_=a.parameters)==null?void 0:_.docs)==null?void 0:A.source},description:{story:`Story demonstrating the editor with a pre-selected assignee. Simulates opening the editor after a
previous comment was assigned to Alice — the dropdown shows Alice pre-selected.`,...(P=(N=a.parameters)==null?void 0:N.docs)==null?void 0:P.description}}};var k,I,z,D,O;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(z=(I=c.parameters)==null?void 0:I.docs)==null?void 0:z.source},description:{story:"Story demonstrating the editor when no users are available for assignment",...(O=(D=c.parameters)==null?void 0:D.docs)==null?void 0:O.description}}};const nt=["Default","WithInitialAssignee","NoAssignableUsers"];export{d as Default,c as NoAssignableUsers,a as WithInitialAssignee,nt as __namedExportsOrder,ot as default};
