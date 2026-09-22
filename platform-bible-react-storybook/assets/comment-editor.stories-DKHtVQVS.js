import{r,j as t}from"./iframe-DQrAbGQD.js";import{f as M,a as p,e as G,E as H,b as W}from"./editor-utils-BOdgHCKI.js";import{B as Y}from"./button-BYce_Amc.js";import{C as F,c as V,e as J}from"./command-CPv9QEmK.js";import{P as Q,a as X,b as Z}from"./popover-DGiPMP3P.js";import{C as $}from"./cancel-accept-buttons.component-z8gmsK01.js";import{d as ee}from"./comment-list.utils-D7gu1FXT.js";import{A as te}from"./at-sign-BTbXFT_Y.js";import"./preload-helper-CTOgD26E.js";import"./LexicalTable.prod-DRsgQN2y.js";import"./tooltip-MkcIo6_2.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./index-Bhpj6xT6.js";import"./index-Dngjmm0T.js";import"./index-DVfF_f8e.js";import"./index-phgBlHJ1.js";import"./index-_tmiVwYG.js";import"./index-BPS_wkqe.js";import"./index-BKH5uLHG.js";import"./index-CLmBZYdX.js";import"./index-C0dkzHJE.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DspoZFbb.js";import"./index-D1e6PSbt.js";import"./index-C4qooBg7.js";import"./dialog-7OdX_8Jo.js";import"./createReactComponent-DLkFj8nh.js";import"./index-o0EV-nFd.js";import"./index-WV8JTAzf.js";import"./toggle-group-BXa_Lqxu.js";import"./index-BnuTq2W6.js";import"./index-B5NkQ9l3.js";import"./index-CQaM6tPf.js";import"./italic-MJDKr-3f.js";import"./createLucideIcon-Chnka1T1.js";import"./input-group-HqqnvGqz.js";import"./input-UqGH2zq1.js";import"./IconCheck-DDwXc9Yw.js";import"./button-group-BrMn5RU1.js";import"./separator-Bduv_qzl.js";import"./x-YqjmVrBA.js";import"./check-D5nKloxC.js";import"./platform.util-Dj487_od.js";const oe={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function g(o,n){return o===""?n["%commentEditor_unassigned%"]??"Unassigned":o==="Team"?n["%commentEditor_team%"]??"Team":o}function P({assignableUsers:o,onSave:n,onClose:h,localizedStrings:s,initialAssignedUser:D}){const[i,L]=r.useState(oe),[m,O]=r.useState(D),[B,l]=r.useState(!1),R=r.useRef(void 0),f=r.useRef(null);r.useEffect(()=>{let e=!0;const v=f.current;if(!v)return;const K=setTimeout(()=>{e&&M(v)},300);return()=>{e=!1,clearTimeout(K)}},[]);const w=r.useCallback(()=>{if(!p(i))return;const e=G(i);n(e,m)},[i,n,m]),q=s["%commentEditor_placeholder%"]??"Type your comment here...",z=s["%commentEditor_assignTo_label%"]??"Assign to";return t.jsxs("div",{className:"pr-twp tw:grid tw:gap-3",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between",children:[t.jsx("span",{className:"tw:text-sm tw:font-medium",children:z}),t.jsx($,{onCancelClick:h,onAcceptClick:w,canAccept:p(i),localizedStrings:s,acceptLabel:s["%commentEditor_saveButton_tooltip%"]})]}),t.jsx("div",{className:"tw:flex tw:items-center tw:gap-2",children:t.jsxs(Q,{open:B,onOpenChange:l,children:[t.jsx(X,{asChild:!0,children:t.jsxs(Y,{variant:"outline",className:"tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",disabled:o.length===0,children:[t.jsx(te,{className:"tw:h-4 tw:w-4"}),t.jsx("span",{children:g(m!==void 0?m:"",s)})]})}),t.jsx(Z,{className:"tw:w-auto tw:p-0",align:"start",onKeyDown:e=>{e.key==="Escape"&&(e.stopPropagation(),l(!1))},children:t.jsx(F,{children:t.jsx(V,{children:o.map(e=>t.jsx(J,{onSelect:()=>{O(e||void 0),l(!1)},className:"tw:flex tw:items-center",children:t.jsx("span",{children:g(e,s)})},e||"unassigned"))})})})]})}),t.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw:outline-hidden",onKeyDownCapture:e=>{e.key==="Escape"?(e.preventDefault(),e.stopPropagation(),h()):ee(e)&&(e.preventDefault(),e.stopPropagation(),p(i)&&w())},onKeyDown:e=>{W(e),(e.key==="Enter"||e.key===" ")&&e.stopPropagation()},children:t.jsx(H,{editorSerializedState:i,onSerializedChange:e=>L(e),placeholder:q,onClear:e=>{R.current=e}})})]})}P.__docgenInfo={description:`Component to create a new project comment from within the scripture editor

@param CommentEditorProps - The properties for the comment editor component`,methods:[],displayName:"CommentEditor",props:{assignableUsers:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"List of users that can be assigned to the new comment thread"},onSave:{required:!0,tsType:{name:"signature",type:"function",raw:"(contents: string, assignedUser?: string) => void",signature:{arguments:[{type:{name:"string"},name:"contents"},{type:{name:"string"},name:"assignedUser"}],return:{name:"void"}}},description:`External function to handle saving the new comment

@param contents HTML content of the comment
@param assignedUser Optional user to assign the comment to`},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`External function to handle closing the comment editor. Gets called when the editor is closed
without saving changes`},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [localizedKey in (typeof COMMENT_EDITOR_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof COMMENT_EDITOR_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings to be passed to the comment editor component"},initialAssignedUser:{required:!1,tsType:{name:"string"},description:`The user to pre-select in the "Assign to" dropdown when the editor opens. Used to persist the
last chosen assignee across consecutive comment creations within a session.`}}};const u={"%acceptButton_tooltip%":"Save","%cancelButton_tooltip%":"Cancel","%commentEditor_saveButton_tooltip%":"Save comment","%commentEditor_placeholder%":"Type your comment here...","%commentEditor_assignTo_label%":"Assign to","%commentEditor_unassigned%":"Unassigned","%commentEditor_team%":"Team"},I=["","Team","Alice","Bob","Charlie"],Fe={title:"Advanced/CommentEditor",component:P,tags:["autodocs"],decorators:[o=>t.jsx("div",{className:"tw:w-80",children:t.jsx(o,{})})],argTypes:{assignableUsers:{control:"object"}}},d={args:{assignableUsers:I,localizedStrings:u,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},a={args:{assignableUsers:I,localizedStrings:u,initialAssignedUser:"Alice",onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}},c={args:{assignableUsers:[],localizedStrings:u,onSave:(o,n)=>{console.log("Comment saved:",{contents:o,assignedUser:n})},onClose:()=>{console.log("Editor closed")}}};var E,y,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(_=(j=c.parameters)==null?void 0:j.docs)==null?void 0:_.source},description:{story:"Story demonstrating the editor when no users are available for assignment",...(k=(N=c.parameters)==null?void 0:N.docs)==null?void 0:k.description}}};const Ve=["Default","WithInitialAssignee","NoAssignableUsers"];export{d as Default,c as NoAssignableUsers,a as WithInitialAssignee,Ve as __namedExportsOrder,Fe as default};
