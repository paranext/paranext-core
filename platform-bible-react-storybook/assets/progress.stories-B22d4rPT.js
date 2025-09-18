import{j as s}from"./jsx-runtime-4wK_0ZO4.js";import{r as n,e as ee}from"./iframe-BcYeWgcr.js";import{c as te}from"./index-Dxmr7YCn.js";import"./index-CiidgNRF.js";import{c as re}from"./index-DNc3TkLQ.js";import{c as se}from"./shadcn-ui.util-DMJ19wEV.js";import{T as ae}from"./theme-provider.component-Bum-YBGl.js";import"./index-xAGYJ6Tj.js";function oe(e){const t=ne(e),o=n.forwardRef((a,r)=>{const{children:c,...d}=a,i=n.Children.toArray(c),l=i.find(le);if(l){const m=l.props.children,Y=i.map(j=>j===l?n.Children.count(m)>1?n.Children.only(null):n.isValidElement(m)?m.props.children:null:j);return s.jsx(t,{...d,ref:r,children:n.isValidElement(m)?n.cloneElement(m,void 0,Y):null})}return s.jsx(t,{...d,ref:r,children:c})});return o.displayName=`${e}.Slot`,o}function ne(e){const t=n.forwardRef((o,a)=>{const{children:r,...c}=o;if(n.isValidElement(r)){const d=de(r),i=ce(c,r.props);return r.type!==n.Fragment&&(i.ref=a?re(a,d):d),n.cloneElement(r,i)}return n.Children.count(r)>1?n.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var ie=Symbol("radix.slottable");function le(e){return n.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===ie}function ce(e,t){const o={...t};for(const a in t){const r=e[a],c=t[a];/^on[A-Z]/.test(a)?r&&c?o[a]=(...i)=>{const l=c(...i);return r(...i),l}:r&&(o[a]=r):a==="style"?o[a]={...r,...c}:a==="className"&&(o[a]=[r,c].filter(Boolean).join(" "))}return{...e,...o}}function de(e){var a,r;let t=(a=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:a.get,o=t&&"isReactWarning"in t&&t.isReactWarning;return o?e.ref:(t=(r=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:r.get,o=t&&"isReactWarning"in t&&t.isReactWarning,o?e.props.ref:e.props.ref||e.ref)}var pe=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],k=pe.reduce((e,t)=>{const o=oe(`Primitive.${t}`),a=n.forwardRef((r,c)=>{const{asChild:d,...i}=r,l=d?o:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),s.jsx(l,{...i,ref:c})});return a.displayName=`Primitive.${t}`,{...e,[t]:a}},{}),y="Progress",P=100,[me,Ce]=te(y),[ue,we]=me(y),Z=n.forwardRef((e,t)=>{const{__scopeProgress:o,value:a=null,max:r,getValueLabel:c=fe,...d}=e;(r||r===0)&&!b(r)&&console.error(ge(`${r}`,"Progress"));const i=b(r)?r:P;a!==null&&!S(a,i)&&console.error(xe(`${a}`,"Progress"));const l=S(a,i)?a:null,m=N(l)?c(l,i):void 0;return s.jsx(ue,{scope:o,value:l,max:i,children:s.jsx(k.div,{"aria-valuemax":i,"aria-valuemin":0,"aria-valuenow":N(l)?l:void 0,"aria-valuetext":m,role:"progressbar","data-state":K(l,i),"data-value":l??void 0,"data-max":i,...d,ref:t})})});Z.displayName=y;var z="ProgressIndicator",J=n.forwardRef((e,t)=>{const{__scopeProgress:o,...a}=e,r=we(z,o);return s.jsx(k.div,{"data-state":K(r.value,r.max),"data-value":r.value??void 0,"data-max":r.max,...a,ref:t})});J.displayName=z;function fe(e,t){return`${Math.round(e/t*100)}%`}function K(e,t){return e==null?"indeterminate":e===t?"complete":"loading"}function N(e){return typeof e=="number"}function b(e){return N(e)&&!isNaN(e)&&e>0}function S(e,t){return N(e)&&!isNaN(e)&&e<=t&&e>=0}function ge(e,t){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${P}\`.`}function xe(e,t){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${P} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var Q=Z,ve=J;const p=ee.forwardRef(({className:e,value:t,...o},a)=>s.jsx(Q,{ref:a,className:se("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...o,children:s.jsx(ve,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})}));p.displayName=Q.displayName;p.__docgenInfo={description:`Displays an indicator showing the completion progress of a task, typically displayed as a
progress bar. This component is built on Radix UI primitives and styled with Shadcn UI. See
Shadcn UI documentation: https://ui.shadcn.com/docs/components/progress See Radix UI
documentation: https://www.radix-ui.com/primitives/docs/components/progress#api-reference`,methods:[]};const Ie={title:"Shadcn/Progress",component:p,tags:["autodocs"],decorators:[e=>s.jsx(ae,{children:s.jsx(e,{})})],argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},className:{control:"text"}}},u={args:{value:50}},w={args:{value:0},parameters:{docs:{description:{story:"Progress bar at 0% completion."}}}},f={args:{value:60},parameters:{docs:{description:{story:"Progress bar at 60% completion."}}}},g={args:{value:100},parameters:{docs:{description:{story:"Progress bar at 100% completion."}}}},x={render:()=>s.jsxs("div",{className:"tw-flex tw-w-80 tw-flex-col tw-gap-4",children:[s.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx(p,{value:0,className:"tw-flex-1"}),s.jsx("span",{className:"tw-w-8 tw-text-sm",children:"0%"})]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx(p,{value:25,className:"tw-flex-1"}),s.jsx("span",{className:"tw-w-8 tw-text-sm",children:"25%"})]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx(p,{value:50,className:"tw-flex-1"}),s.jsx("span",{className:"tw-w-8 tw-text-sm",children:"50%"})]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx(p,{value:75,className:"tw-flex-1"}),s.jsx("span",{className:"tw-w-8 tw-text-sm",children:"75%"})]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx(p,{value:100,className:"tw-flex-1"}),s.jsx("span",{className:"tw-w-8 tw-text-sm",children:"100%"})]})]}),parameters:{docs:{description:{story:"Progress bars showing different completion states with labels."}}}},v={render:()=>{const[e,t]=n.useState(0);return n.useEffect(()=>{const o=setTimeout(()=>t(66),500);return()=>clearTimeout(o)},[]),s.jsxs("div",{className:"tw-w-80",children:[s.jsx(p,{value:e}),s.jsxs("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:["Progress: ",e,"%"]})]})},parameters:{docs:{description:{story:"An animated progress bar that updates after a delay."}}}},h={render:e=>s.jsxs("div",{className:"tw-w-80",children:[s.jsx(p,{...e}),s.jsx("p",{className:"tw-mt-2 tw-text-sm tw-text-muted-foreground",children:"Use the controls to adjust the progress value."})]}),args:{value:33},parameters:{docs:{description:{story:"An interactive progress bar where you can experiment with properties using the controls."}}}};var E,C,I;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    value: 50
  }
}`,...(I=(C=u.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var R,_,A;w.parameters={...w.parameters,docs:{...(R=w.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    value: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 0% completion.'
      }
    }
  }
}`,...(A=(_=w.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var T,$,V;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    value: 60
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 60% completion.'
      }
    }
  }
}`,...(V=($=f.parameters)==null?void 0:$.docs)==null?void 0:V.source}}};var D,O,U;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    value: 100
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 100% completion.'
      }
    }
  }
}`,...(U=(O=g.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var L,M,W;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="tw-flex tw-w-80 tw-flex-col tw-gap-4">
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={0} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">0%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={25} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">25%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={50} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">50%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={75} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">75%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={100} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">100%</span>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Progress bars showing different completion states with labels.'
      }
    }
  }
}`,...(W=(M=x.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var B,F,q;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);
    return <div className="tw-w-80">
        <Progress value={progress} />
        <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">Progress: {progress}%</p>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'An animated progress bar that updates after a delay.'
      }
    }
  }
}`,...(q=(F=v.parameters)==null?void 0:F.docs)==null?void 0:q.source}}};var G,H,X;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <div className="tw-w-80">
      <Progress {...args} />
      <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
        Use the controls to adjust the progress value.
      </p>
    </div>,
  args: {
    value: 33
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive progress bar where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(X=(H=h.parameters)==null?void 0:H.docs)==null?void 0:X.source}}};const Re=["Default","Empty","Partial","Complete","States","Animated","Interactive"];export{v as Animated,g as Complete,u as Default,w as Empty,h as Interactive,f as Partial,x as States,Re as __namedExportsOrder,Ie as default};
