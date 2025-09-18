import{j as t}from"./jsx-runtime-4wK_0ZO4.js";import{B as e}from"./button-BklEqBlb.js";import{I as m}from"./input-CLS-C3Rv.js";import{C as p,a as h,b as u,c as x,d as w}from"./card-BSWwl2Bs.js";import{T as j}from"./theme-provider.component-Bum-YBGl.js";import"./iframe-BcYeWgcr.js";import"./index-BJ893FO-.js";import"./index-DNc3TkLQ.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";const R={title:"Demo/RTL Direction",tags:["autodocs"],decorators:[l=>t.jsx(j,{children:t.jsx(l,{})})]};function g(){return t.jsx("div",{className:"pr-twp tw-max-w-md tw-space-y-4 tw-p-6",children:t.jsxs(p,{children:[t.jsxs(h,{children:[t.jsx(u,{children:"Direction Test Card"}),t.jsx(x,{children:"This card tests RTL/LTR direction changes. العربية: هذا نص تجريبي باللغة العربية"})]}),t.jsxs(w,{className:"tw-space-y-4",children:[t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("label",{htmlFor:"test-input",className:"tw-block tw-text-sm tw-font-medium",children:"Test Input (English + עברית)"}),t.jsx(m,{id:"test-input",placeholder:"Type here... اكتب هنا",className:"tw-w-full"})]}),t.jsxs("div",{className:"tw-flex tw-gap-2",children:[t.jsx(e,{variant:"default",children:"Button 1 (زر)"}),t.jsx(e,{variant:"outline",children:"Button 2 (כפתור)"})]}),t.jsxs("div",{className:"tw-space-y-1 tw-text-sm",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"English:"})," This text should align left in LTR mode and right in RTL mode."]}),t.jsxs("p",{children:[t.jsx("strong",{children:"عربي:"})," هذا النص يجب أن يظهر من اليمين إلى اليسار في وضع RTL."]}),t.jsxs("p",{children:[t.jsx("strong",{children:"עברית:"})," הטקסט הזה צריך להופיע מימין לשמאל במצב RTL."]})]}),t.jsxs("div",{className:"tw-rounded tw-border tw-p-3",children:[t.jsx("p",{className:"tw-mb-2 tw-text-xs tw-text-muted-foreground",children:"Mixed content test:"}),t.jsx("p",{children:"Hello مرحبا שלום world! Numbers: 123 ١٢٣"})]})]})]})})}const s={render:()=>t.jsx(g,{}),parameters:{docs:{description:{story:"Use the Direction toggle in the toolbar above to switch between LTR and RTL modes. Notice how the layout, text alignment, and component positioning changes."}}}},n={render:()=>t.jsxs("div",{className:"pr-twp tw-space-y-4 tw-p-6",children:[t.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Button Alignment Test"}),t.jsxs("div",{className:"tw-flex tw-justify-start tw-gap-2",children:[t.jsx(e,{children:"First زر"}),t.jsx(e,{variant:"outline",children:"Second כפתור"}),t.jsx(e,{variant:"ghost",children:"Third Button"})]}),t.jsxs("div",{className:"tw-flex tw-justify-end tw-gap-2",children:[t.jsx(e,{size:"sm",children:"Small"}),t.jsx(e,{children:"Medium"}),t.jsx(e,{size:"lg",children:"Large"})]})]})};var r,o,i;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <DemoComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Use the Direction toggle in the toolbar above to switch between LTR and RTL modes. Notice how the layout, text alignment, and component positioning changes.'
      }
    }
  }
}`,...(i=(o=s.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var a,d,c;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <div className="pr-twp tw-space-y-4 tw-p-6">
      <h3 className="tw-text-lg tw-font-semibold">Button Alignment Test</h3>
      <div className="tw-flex tw-justify-start tw-gap-2">
        <Button>First زر</Button>
        <Button variant="outline">Second כפתור</Button>
        <Button variant="ghost">Third Button</Button>
      </div>
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const S=["DirectionDemo","ButtonAlignment"];export{n as ButtonAlignment,s as DirectionDemo,S as __namedExportsOrder,R as default};
