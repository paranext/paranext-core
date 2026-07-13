import{r as c,j as s,b as Ee,e as Ne}from"./iframe-CUViGiCy.js";import{c as Ae}from"./utils-BPbySc-g.js";import{c as fe}from"./index-BaQP4hhM.js";import{u as Ie,c as _}from"./index-CvwydXN6.js";import{u as E}from"./index-DaDx4I5g.js";import{c as Me}from"./index-D47tV5Zl.js";import{c as Te,u as ke}from"./index-w1gv1aDZ.js";import{u as Be}from"./index-CLOlVQZ5.js";import{u as Ke}from"./index-BT2EZ1j-.js";import{P as T}from"./index-CeoofYkA.js";import"./preload-helper-CTOgD26E.js";import"./index-DDgyFuA2.js";var pe=["PageUp","PageDown"],he=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],we={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},N="Slider",[$,ze,Oe]=Te(N),[ge]=Me(N,[Oe]),[Fe,F]=ge(N),ve=c.forwardRef((e,t)=>{const{name:n,min:r=0,max:o=100,step:d=1,orientation:a="horizontal",disabled:i=!1,minStepsBetweenThumbs:u=0,defaultValue:p=[r],value:g,onValueChange:l=()=>{},onValueCommit:m=()=>{},inverted:x=!1,form:y,...v}=e,h=c.useRef(new Set),f=c.useRef(0),b=a==="horizontal"?He:Ue,[w=[],A]=Ie({prop:g,defaultProp:p,onChange:S=>{var D;(D=[...h.current][f.current])==null||D.focus(),l(S)}}),U=c.useRef(w);function L(S){const V=Xe(w,S);I(S,V)}function _e(S){I(S,f.current)}function je(){const S=U.current[f.current];w[f.current]!==S&&m(w)}function I(S,V,{commit:D}={commit:!1}){const W=Qe(d),Y=Ze(Math.round((S-r)/d)*d+r,W),M=fe(Y,[r,o]);A((P=[])=>{const C=$e(P,M,V);if(Je(C,u*d)){f.current=C.indexOf(M);const J=String(C)!==String(P);return J&&D&&m(C),J?C:P}else return P})}return s.jsx(Fe,{scope:e.__scopeSlider,name:n,disabled:i,min:r,max:o,valueIndexToChangeRef:f,thumbs:h.current,values:w,orientation:a,form:y,children:s.jsx($.Provider,{scope:e.__scopeSlider,children:s.jsx($.Slot,{scope:e.__scopeSlider,children:s.jsx(b,{"aria-disabled":i,"data-disabled":i?"":void 0,...v,ref:t,onPointerDown:_(v.onPointerDown,()=>{i||(U.current=w)}),min:r,max:o,inverted:x,onSlideStart:i?void 0:L,onSlideMove:i?void 0:_e,onSlideEnd:i?void 0:je,onHomeKeyDown:()=>!i&&I(r,0,{commit:!0}),onEndKeyDown:()=>!i&&I(o,w.length-1,{commit:!0}),onStepKeyDown:({event:S,direction:V})=>{if(!i){const Y=pe.includes(S.key)||S.shiftKey&&he.includes(S.key)?10:1,M=f.current,P=w[M],C=d*Y*V;I(P+C,M,{commit:!0})}}})})})})});ve.displayName=N;var[xe,be]=ge(N,{startEdge:"left",endEdge:"right",size:"width",direction:1}),He=c.forwardRef((e,t)=>{const{min:n,max:r,dir:o,inverted:d,onSlideStart:a,onSlideMove:i,onSlideEnd:u,onStepKeyDown:p,...g}=e,[l,m]=c.useState(null),x=E(t,b=>m(b)),y=c.useRef(void 0),v=ke(o),h=v==="ltr",f=h&&!d||!h&&d;function R(b){const w=y.current||l.getBoundingClientRect(),A=[0,w.width],L=G(A,f?[n,r]:[r,n]);return y.current=w,L(b-w.left)}return s.jsx(xe,{scope:e.__scopeSlider,startEdge:f?"left":"right",endEdge:f?"right":"left",direction:f?1:-1,size:"width",children:s.jsx(Se,{dir:v,"data-orientation":"horizontal",...g,ref:x,style:{...g.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:b=>{const w=R(b.clientX);a==null||a(w)},onSlideMove:b=>{const w=R(b.clientX);i==null||i(w)},onSlideEnd:()=>{y.current=void 0,u==null||u()},onStepKeyDown:b=>{const A=we[f?"from-left":"from-right"].includes(b.key);p==null||p({event:b,direction:A?-1:1})}})})}),Ue=c.forwardRef((e,t)=>{const{min:n,max:r,inverted:o,onSlideStart:d,onSlideMove:a,onSlideEnd:i,onStepKeyDown:u,...p}=e,g=c.useRef(null),l=E(t,g),m=c.useRef(void 0),x=!o;function y(v){const h=m.current||g.current.getBoundingClientRect(),f=[0,h.height],b=G(f,x?[r,n]:[n,r]);return m.current=h,b(v-h.top)}return s.jsx(xe,{scope:e.__scopeSlider,startEdge:x?"bottom":"top",endEdge:x?"top":"bottom",size:"height",direction:x?1:-1,children:s.jsx(Se,{"data-orientation":"vertical",...p,ref:l,style:{...p.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:v=>{const h=y(v.clientY);d==null||d(h)},onSlideMove:v=>{const h=y(v.clientY);a==null||a(h)},onSlideEnd:()=>{m.current=void 0,i==null||i()},onStepKeyDown:v=>{const f=we[x?"from-bottom":"from-top"].includes(v.key);u==null||u({event:v,direction:f?-1:1})}})})}),Se=c.forwardRef((e,t)=>{const{__scopeSlider:n,onSlideStart:r,onSlideMove:o,onSlideEnd:d,onHomeKeyDown:a,onEndKeyDown:i,onStepKeyDown:u,...p}=e,g=F(N,n);return s.jsx(T.span,{...p,ref:t,onKeyDown:_(e.onKeyDown,l=>{l.key==="Home"?(a(l),l.preventDefault()):l.key==="End"?(i(l),l.preventDefault()):pe.concat(he).includes(l.key)&&(u(l),l.preventDefault())}),onPointerDown:_(e.onPointerDown,l=>{const m=l.target;m.setPointerCapture(l.pointerId),l.preventDefault(),g.thumbs.has(m)?m.focus():r(l)}),onPointerMove:_(e.onPointerMove,l=>{l.target.hasPointerCapture(l.pointerId)&&o(l)}),onPointerUp:_(e.onPointerUp,l=>{const m=l.target;m.hasPointerCapture(l.pointerId)&&(m.releasePointerCapture(l.pointerId),d(l))})})}),ye="SliderTrack",Ve=c.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,o=F(ye,n);return s.jsx(T.span,{"data-disabled":o.disabled?"":void 0,"data-orientation":o.orientation,...r,ref:t})});Ve.displayName=ye;var q="SliderRange",Ce=c.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,o=F(q,n),d=be(q,n),a=c.useRef(null),i=E(t,a),u=o.values.length,p=o.values.map(m=>Pe(m,o.min,o.max)),g=u>1?Math.min(...p):0,l=100-Math.max(...p);return s.jsx(T.span,{"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,...r,ref:i,style:{...e.style,[d.startEdge]:g+"%",[d.endEdge]:l+"%"}})});Ce.displayName=q;var X="SliderThumb",Re=c.forwardRef((e,t)=>{const n=ze(e.__scopeSlider),[r,o]=c.useState(null),d=E(t,i=>o(i)),a=c.useMemo(()=>r?n().findIndex(i=>i.ref.current===r):-1,[n,r]);return s.jsx(Le,{...e,ref:d,index:a})}),Le=c.forwardRef((e,t)=>{const{__scopeSlider:n,index:r,name:o,...d}=e,a=F(X,n),i=be(X,n),[u,p]=c.useState(null),g=E(t,R=>p(R)),l=u?a.form||!!u.closest("form"):!0,m=Ke(u),x=a.values[r],y=x===void 0?0:Pe(x,a.min,a.max),v=qe(r,a.values.length),h=m==null?void 0:m[i.size],f=h?Ge(h,y,i.direction):0;return c.useEffect(()=>{if(u)return a.thumbs.add(u),()=>{a.thumbs.delete(u)}},[u,a.thumbs]),s.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[i.startEdge]:`calc(${y}% + ${f}px)`},children:[s.jsx($.ItemSlot,{scope:e.__scopeSlider,children:s.jsx(T.span,{role:"slider","aria-label":e["aria-label"]||v,"aria-valuemin":a.min,"aria-valuenow":x,"aria-valuemax":a.max,"aria-orientation":a.orientation,"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,tabIndex:a.disabled?void 0:0,...d,ref:g,style:x===void 0?{display:"none"}:e.style,onFocus:_(e.onFocus,()=>{a.valueIndexToChangeRef.current=r})})}),l&&s.jsx(De,{name:o??(a.name?a.name+(a.values.length>1?"[]":""):void 0),form:a.form,value:x},r)]})});Re.displayName=X;var Ye="RadioBubbleInput",De=c.forwardRef(({__scopeSlider:e,value:t,...n},r)=>{const o=c.useRef(null),d=E(o,r),a=Be(t);return c.useEffect(()=>{const i=o.current;if(!i)return;const u=window.HTMLInputElement.prototype,g=Object.getOwnPropertyDescriptor(u,"value").set;if(a!==t&&g){const l=new Event("input",{bubbles:!0});g.call(i,t),i.dispatchEvent(l)}},[a,t]),s.jsx(T.input,{style:{display:"none"},...n,ref:d,defaultValue:t})});De.displayName=Ye;function $e(e=[],t,n){const r=[...e];return r[n]=t,r.sort((o,d)=>o-d)}function Pe(e,t,n){const d=100/(n-t)*(e-t);return fe(d,[0,100])}function qe(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function Xe(e,t){if(e.length===1)return 0;const n=e.map(o=>Math.abs(o-t)),r=Math.min(...n);return n.indexOf(r)}function Ge(e,t,n){const r=e/2,d=G([0,50],[0,r]);return(r-d(t)*n)*n}function We(e){return e.slice(0,-1).map((t,n)=>e[n+1]-t)}function Je(e,t){if(t>0){const n=We(e);return Math.min(...n)>=t}return!0}function G(e,t){return n=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const r=(t[1]-t[0])/(e[1]-e[0]);return t[0]+r*(n-e[0])}}function Qe(e){return(String(e).split(".")[1]||"").length}function Ze(e,t){const n=Math.pow(10,t);return Math.round(e*n)/n}var et=ve,tt=Ve,nt=Ce,rt=Re;function j({className:e,defaultValue:t,value:n,min:r=0,max:o=100,...d}){const a=Ee(),i=Ne.useMemo(()=>Array.isArray(n)?n:Array.isArray(t)?t:[r,o],[n,t,r,o]);return s.jsxs(et,{"data-slot":"slider",defaultValue:t,value:n,min:r,max:o,className:Ae("pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",e),dir:a,...d,children:[s.jsx(tt,{"data-slot":"slider-track",className:"tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",children:s.jsx(nt,{"data-slot":"slider-range",className:"tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"})}),Array.from({length:i.length},(u,p)=>s.jsx(rt,{"data-slot":"slider-thumb",className:"tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"},p))]})}j.__docgenInfo={description:`The Slider component is an input where the user selects a value from within a given range. This
component is built on Radix UI primitives and styled with Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/slider}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/slider}`,methods:[],displayName:"Slider",props:{min:{defaultValue:{value:"0",computed:!1},required:!1},max:{defaultValue:{value:"100",computed:!1},required:!1}}};const{fn:H}=__STORYBOOK_MODULE_TEST__,wt={title:"Shadcn/Slider",component:j,tags:["autodocs"],argTypes:{min:{control:{type:"number"}},max:{control:{type:"number"}},step:{control:{type:"number"}},disabled:{control:"boolean"},onValueChange:{action:"value changed"}}},k={args:{defaultValue:[50],min:0,max:100,step:1,onValueChange:H()}},B={args:{defaultValue:[25,75],min:0,max:100,step:1,onValueChange:H()},parameters:{docs:{description:{story:"A slider with dual handles for selecting a range."}}}},K={args:{defaultValue:[50],disabled:!0,min:0,max:100,step:1,onValueChange:H()},parameters:{docs:{description:{story:"A disabled slider that cannot be interacted with."}}}},z={render:()=>{const[e,t]=c.useState([40]),[n,r]=c.useState([20,80]);return s.jsxs("div",{className:"tw:w-80 tw:space-y-6",children:[s.jsxs("div",{children:[s.jsx("label",{htmlFor:"single-slider",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Single Value"}),s.jsx(j,{id:"single-slider",value:e,onValueChange:t,max:100,step:1}),s.jsxs("div",{className:"tw:mt-1 tw:text-sm tw:text-muted-foreground",children:["Value: ",e[0]]})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"range-slider",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Range Selection"}),s.jsx(j,{id:"range-slider",value:n,onValueChange:r,max:100,step:1}),s.jsxs("div",{className:"tw:mt-1 tw:text-sm tw:text-muted-foreground",children:["Range: ",n[0]," - ",n[1]]})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"disabled-slider",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Disabled"}),s.jsx(j,{id:"disabled-slider",defaultValue:[50],disabled:!0,max:100,step:1})]})]})},parameters:{docs:{description:{story:"Different slider variants showing single value, range, and disabled states."}}}},O={render:e=>{const[t,n]=c.useState([33]),r=o=>{var d;n(o),(d=e.onValueChange)==null||d.call(e,o)};return s.jsxs("div",{className:"tw:w-80 tw:space-y-4",children:[s.jsx(j,{...e,value:t,onValueChange:r}),s.jsxs("div",{className:"tw:text-sm tw:text-muted-foreground",children:["Current value: ",s.jsx("code",{children:t[0]})]})]})},args:{min:0,max:100,step:1,onValueChange:H()},parameters:{docs:{description:{story:"An interactive slider that shows the current value, similar to the original example."}}}};var Q,Z,ee;k.parameters={...k.parameters,docs:{...(Q=k.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  }
}`,...(ee=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ne,re;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A slider with dual handles for selecting a range.'
      }
    }
  }
}`,...(re=(ne=B.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var ae,oe,se;K.parameters={...K.parameters,docs:{...(ae=K.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    defaultValue: [50],
    disabled: true,
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled slider that cannot be interacted with.'
      }
    }
  }
}`,...(se=(oe=K.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ie,le,de;z.parameters={...z.parameters,docs:{...(ie=z.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState([40]);
    const [value2, setValue2] = useState([20, 80]);
    return <div className="tw:w-80 tw:space-y-6">
        <div>
          <label htmlFor="single-slider" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
            Single Value
          </label>
          <Slider id="single-slider" value={value1} onValueChange={setValue1} max={100} step={1} />
          <div className="tw:mt-1 tw:text-sm tw:text-muted-foreground">Value: {value1[0]}</div>
        </div>
        <div>
          <label htmlFor="range-slider" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
            Range Selection
          </label>
          <Slider id="range-slider" value={value2} onValueChange={setValue2} max={100} step={1} />
          <div className="tw:mt-1 tw:text-sm tw:text-muted-foreground">
            Range: {value2[0]} - {value2[1]}
          </div>
        </div>
        <div>
          <label htmlFor="disabled-slider" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
            Disabled
          </label>
          <Slider id="disabled-slider" defaultValue={[50]} disabled max={100} step={1} />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Different slider variants showing single value, range, and disabled states.'
      }
    }
  }
}`,...(de=(le=z.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ce,ue,me;O.parameters={...O.parameters,docs:{...(ce=O.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState([33]);
    const handleValueChange = (newValue: number[]) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };
    return <div className="tw:w-80 tw:space-y-4">
        <Slider {...args} value={value} onValueChange={handleValueChange} />
        <div className="tw:text-sm tw:text-muted-foreground">
          Current value: <code>{value[0]}</code>
        </div>
      </div>;
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive slider that shows the current value, similar to the original example.'
      }
    }
  }
}`,...(me=(ue=O.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};const gt=["Default","Range","Disabled","Variants","Interactive"];export{k as Default,K as Disabled,O as Interactive,B as Range,z as Variants,gt as __namedExportsOrder,wt as default};
