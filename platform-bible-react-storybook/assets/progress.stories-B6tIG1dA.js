import{r as x,j as s}from"./iframe-C7TUfA8h.js";import{c as W}from"./utils-BPbySc-g.js";import{c as Y}from"./index-Ir2ETEeL.js";import{P as X}from"./index-aHEBl2oj.js";import"./preload-helper-CTOgD26E.js";import"./index-Unc-oc7i.js";var f="Progress",h=100,[Z]=Y(f),[ee,se]=Z(f),z=x.forwardRef((e,t)=>{const{__scopeProgress:o,value:n=null,max:r,getValueLabel:J=te,...K}=e;(r||r===0)&&!N(r)&&console.error(re(`${r}`,"Progress"));const i=N(r)?r:h;n!==null&&!P(n,i)&&console.error(ae(`${n}`,"Progress"));const c=P(n,i)?n:null,Q=v(c)?J(c,i):void 0;return s.jsx(ee,{scope:o,value:c,max:i,children:s.jsx(X.div,{"aria-valuemax":i,"aria-valuemin":0,"aria-valuenow":v(c)?c:void 0,"aria-valuetext":Q,role:"progressbar","data-state":H(c,i),"data-value":c??void 0,"data-max":i,...K,ref:t})})});z.displayName=f;var B="ProgressIndicator",F=x.forwardRef((e,t)=>{const{__scopeProgress:o,...n}=e,r=se(B,o);return s.jsx(X.div,{"data-state":H(r.value,r.max),"data-value":r.value??void 0,"data-max":r.max,...n,ref:t})});F.displayName=B;function te(e,t){return`${Math.round(e/t*100)}%`}function H(e,t){return e==null?"indeterminate":e===t?"complete":"loading"}function v(e){return typeof e=="number"}function N(e){return v(e)&&!isNaN(e)&&e>0}function P(e,t){return v(e)&&!isNaN(e)&&e<=t&&e>=0}function re(e,t){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${h}\`.`}function ae(e,t){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${h} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var oe=z,ne=F;function a({className:e,value:t,...o}){return s.jsx(oe,{"data-slot":"progress",className:W("pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",e),...o,children:s.jsx(ne,{"data-slot":"progress-indicator",className:"tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})})}a.__docgenInfo={description:`Displays an indicator showing the completion progress of a task, typically displayed as a
progress bar. This component is built on Radix UI primitives and styled with Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/progress}
@see Radix UI Documentation:
  {@link https://www.radix-ui.com/primitives/docs/components/progress#api-reference}`,methods:[],displayName:"Progress"};const ue={title:"Shadcn/Progress",component:a,tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},className:{control:"text"}}},l={args:{value:50}},m={args:{value:0},parameters:{docs:{description:{story:"Progress bar at 0% completion."}}}},d={args:{value:60},parameters:{docs:{description:{story:"Progress bar at 60% completion."}}}},p={args:{value:100},parameters:{docs:{description:{story:"Progress bar at 100% completion."}}}},u={render:()=>s.jsxs("div",{className:"tw:flex tw:w-80 tw:flex-col tw:gap-4",children:[s.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[s.jsx(a,{value:0,className:"tw:flex-1"}),s.jsx("span",{className:"tw:w-8 tw:text-sm",children:"0%"})]}),s.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[s.jsx(a,{value:25,className:"tw:flex-1"}),s.jsx("span",{className:"tw:w-8 tw:text-sm",children:"25%"})]}),s.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[s.jsx(a,{value:50,className:"tw:flex-1"}),s.jsx("span",{className:"tw:w-8 tw:text-sm",children:"50%"})]}),s.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[s.jsx(a,{value:75,className:"tw:flex-1"}),s.jsx("span",{className:"tw:w-8 tw:text-sm",children:"75%"})]}),s.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[s.jsx(a,{value:100,className:"tw:flex-1"}),s.jsx("span",{className:"tw:w-8 tw:text-sm",children:"100%"})]})]}),parameters:{docs:{description:{story:"Progress bars showing different completion states with labels."}}}},w={render:()=>{const[e,t]=x.useState(0);return x.useEffect(()=>{const o=setTimeout(()=>t(66),500);return()=>clearTimeout(o)},[]),s.jsxs("div",{className:"tw:w-80",children:[s.jsx(a,{value:e}),s.jsxs("p",{className:"tw:mt-2 tw:text-sm tw:text-muted-foreground",children:["Progress: ",e,"%"]})]})},parameters:{docs:{description:{story:"An animated progress bar that updates after a delay."}}}},g={render:e=>s.jsxs("div",{className:"tw:w-80",children:[s.jsx(a,{...e}),s.jsx("p",{className:"tw:mt-2 tw:text-sm tw:text-muted-foreground",children:"Use the controls to adjust the progress value."})]}),args:{value:33},parameters:{docs:{description:{story:"An interactive progress bar where you can experiment with properties using the controls."}}}};var y,j,b;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    value: 50
  }
}`,...(b=(j=l.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var S,I,E;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(E=(I=m.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};var A,_,$;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...($=(_=d.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var T,C,D;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var R,U,M;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:w-80 tw:flex-col tw:gap-4">
      <div className="tw:flex tw:items-center tw:gap-2">
        <Progress value={0} className="tw:flex-1" />
        <span className="tw:w-8 tw:text-sm">0%</span>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <Progress value={25} className="tw:flex-1" />
        <span className="tw:w-8 tw:text-sm">25%</span>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <Progress value={50} className="tw:flex-1" />
        <span className="tw:w-8 tw:text-sm">50%</span>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <Progress value={75} className="tw:flex-1" />
        <span className="tw:w-8 tw:text-sm">75%</span>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <Progress value={100} className="tw:flex-1" />
        <span className="tw:w-8 tw:text-sm">100%</span>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Progress bars showing different completion states with labels.'
      }
    }
  }
}`,...(M=(U=u.parameters)==null?void 0:U.docs)==null?void 0:M.source}}};var V,L,O;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);
    return <div className="tw:w-80">
        <Progress value={progress} />
        <p className="tw:mt-2 tw:text-sm tw:text-muted-foreground">Progress: {progress}%</p>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'An animated progress bar that updates after a delay.'
      }
    }
  }
}`,...(O=(L=w.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var k,q,G;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <div className="tw:w-80">
      <Progress {...args} />
      <p className="tw:mt-2 tw:text-sm tw:text-muted-foreground">
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
}`,...(G=(q=g.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};const we=["Default","Empty","Partial","Complete","States","Animated","Interactive"];export{w as Animated,p as Complete,l as Default,m as Empty,g as Interactive,d as Partial,u as States,we as __namedExportsOrder,ue as default};
