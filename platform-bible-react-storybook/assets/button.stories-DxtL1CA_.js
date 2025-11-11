import{j as e}from"./jsx-runtime-CvGToidP.js";import{B as r}from"./button-cud2eTA2.js";import{T as Bt}from"./theme-provider.component-BRfsG9zC.js";import"./iframe-FHgAwj54.js";import"./index-C6LUVuya.js";import"./index-D-wbo5Oc.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";const{expect:t,fn:c}=__STORYBOOK_MODULE_TEST__,zt={title:"Shadcn/Button",component:r,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive","outline","secondary","ghost","link"],control:{type:"select"}},size:{options:["default","sm","lg","icon"],control:{type:"select"}},disabled:{control:"boolean"},className:{control:"text"}},decorators:[a=>e.jsx(Bt,{children:e.jsx(a,{})})]},l={args:{children:"Default Button",variant:"default",size:"default"}},d={render:a=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(r,{...a,children:a.children||"Click me!"}),e.jsx("p",{className:"tw-text-sm tw-text-gray-600",children:"Use the Code Editor tab to modify this button in real-time!"})]}),args:{children:"Editable Button",variant:"default"},parameters:{docs:{description:{story:"This story allows live code editing. Try changing the variant, size, or adding click handlers in the Code Editor panel."}}}},u={render:()=>e.jsxs("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:[e.jsx(r,{variant:"default",children:"Default"}),e.jsx(r,{variant:"destructive",children:"Destructive"}),e.jsx(r,{variant:"outline",children:"Outline"}),e.jsx(r,{variant:"secondary",children:"Secondary"}),e.jsx(r,{variant:"ghost",children:"Ghost"}),e.jsx(r,{variant:"link",children:"Link"})]}),parameters:{docs:{description:{story:"All button variants displayed together. Try editing this code to add new variants or modify existing ones."}}}},m={render:()=>e.jsxs("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-text-sm",children:"default:"}),e.jsx(r,{size:"default",children:"Button"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-text-sm",children:"sm:"}),e.jsx(r,{size:"sm",children:"Button"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-text-sm",children:"lg:"}),e.jsx(r,{size:"lg",children:"Button"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-text-sm",children:"icon:"}),e.jsx(r,{size:"icon",children:"★"})]})]}),parameters:{docs:{description:{story:"All button sizes displayed together."}}}},p={args:{children:"Destructive Button",variant:"destructive"}},v={args:{children:"Outline Button",variant:"outline"}},w={args:{children:"Secondary Button",variant:"secondary"}},b={args:{children:"Ghost Button",variant:"ghost"}},h={args:{children:"Link Button",variant:"link"}},g={args:{children:"Disabled Button",disabled:!0}},B={args:{children:"Playground Button",variant:"default",size:"default"}},y={args:{children:"Click Me",variant:"default",onClick:c()},play:async({args:a,canvas:o,userEvent:s})=>{const n=o.getByRole("button",{name:/click me/i});await t(n).toBeInTheDocument(),await t(n).toBeVisible(),await s.click(n),await t(a.onClick).toHaveBeenCalled(),await t(a.onClick).toHaveBeenCalledTimes(1)}},x={args:{children:"Disabled Button",disabled:!0,onClick:c()},play:async({args:a,canvas:o})=>{const s=o.getByRole("button",{name:/disabled button/i});await t(s).toBeInTheDocument(),await t(s).toBeDisabled(),await t(a.onClick).not.toHaveBeenCalled()}},f={args:{children:"Variant Test",variant:"destructive",onClick:c()},play:async({args:a,canvas:o,userEvent:s})=>{const n=o.getByRole("button",{name:/variant test/i});await t(n).toBeInTheDocument(),await t(n).toHaveClass("tw-bg-destructive"),await s.click(n),await t(a.onClick).toHaveBeenCalledTimes(1),await s.hover(n),await t(n).toBeInTheDocument(),await s.unhover(n),await t(n).toBeInTheDocument()}},C={args:{children:"Size Test",size:"lg",onClick:c()},play:async({args:a,canvas:o,userEvent:s})=>{const n=o.getByRole("button",{name:/size test/i});await t(n).toBeInTheDocument(),await t(n).toHaveClass("tw-h-11"),await s.dblClick(n),await t(a.onClick).toHaveBeenCalledTimes(2),n.focus(),await t(n).toHaveFocus(),n.blur(),await t(n).not.toHaveFocus()}},k={args:{children:"Complex Test Button",variant:"default",onClick:c()},play:async({args:a,canvas:o,userEvent:s,step:n})=>{await n("Initial button verification",async()=>{const i=o.getByRole("button",{name:/complex test button/i});await t(i).toBeInTheDocument(),await t(i).toBeVisible(),await t(i).toBeEnabled()}),await n("Mouse interactions",async()=>{const i=o.getByRole("button",{name:/complex test button/i});await s.hover(i),await s.unhover(i),await s.click(i),await t(a.onClick).toHaveBeenCalledTimes(1)}),await n("Keyboard interactions",async()=>{const i=o.getByRole("button",{name:/complex test button/i});i.focus(),await t(i).toHaveFocus(),await s.keyboard("{Enter}"),await t(a.onClick).toHaveBeenCalledTimes(2),await s.keyboard(" "),await t(a.onClick).toHaveBeenCalledTimes(3)}),await n("Final verification",async()=>{const i=o.getByRole("button",{name:/complex test button/i});await t(i).toBeInTheDocument(),await t(a.onClick).toHaveBeenCalledTimes(3)})}};var T,D,S;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default'
  }
}`,...(S=(D=l.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var z,H,j;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <div className="tw-space-y-4">
      <Button {...args}>{args.children || 'Click me!'}</Button>
      <p className="tw-text-sm tw-text-gray-600">
        Use the Code Editor tab to modify this button in real-time!
      </p>
    </div>,
  args: {
    children: 'Editable Button',
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'This story allows live code editing. Try changing the variant, size, or adding click handlers in the Code Editor panel.'
      }
    }
  }
}`,...(j=(H=d.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var E,N,I;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together. Try editing this code to add new variants or modify existing ones.'
      }
    }
  }
}`,...(I=(N=u.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var R,V,O;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4">
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">default:</span>
        <Button size="default">Button</Button>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">sm:</span>
        <Button size="sm">Button</Button>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">lg:</span>
        <Button size="lg">Button</Button>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">icon:</span>
        <Button size="icon">★</Button>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.'
      }
    }
  }
}`,...(O=(V=m.parameters)==null?void 0:V.docs)==null?void 0:O.source}}};var L,F,_;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    children: 'Destructive Button',
    variant: 'destructive'
  }
}`,...(_=(F=p.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var A,G,M;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...(M=(G=v.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var P,K,U;w.parameters={...w.parameters,docs:{...(P=w.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(U=(K=w.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var q,Y,J;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...(J=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var Q,W,X;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    children: 'Link Button',
    variant: 'link'
  }
}`,...(X=(W=h.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Z,$,tt;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(tt=($=g.parameters)==null?void 0:$.docs)==null?void 0:tt.source}}};var et,nt,at;B.parameters={...B.parameters,docs:{...(et=B.parameters)==null?void 0:et.docs,source:{originalSource:`{
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default'
  }
}`,...(at=(nt=B.parameters)==null?void 0:nt.docs)==null?void 0:at.source}}};var st,ot,it;y.parameters={...y.parameters,docs:{...(st=y.parameters)==null?void 0:st.docs,source:{originalSource:`{
  args: {
    children: 'Click Me',
    variant: 'default',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const button = canvas.getByRole('button', {
      name: /click me/i
    });

    // Verify button is rendered
    await expect(button).toBeInTheDocument();
    await expect(button).toBeVisible();

    // Click the button
    await userEvent.click(button);

    // Verify the onClick handler was called
    await expect(args.onClick).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
}`,...(it=(ot=y.parameters)==null?void 0:ot.docs)==null?void 0:it.source}}};var rt,ct,lt;x.parameters={...x.parameters,docs:{...(rt=x.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true,
    onClick: fn()
  },
  play: async ({
    args,
    canvas
  }) => {
    const button = canvas.getByRole('button', {
      name: /disabled button/i
    });

    // Verify button is rendered and disabled
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();

    // Verify the onClick handler was not called (disabled buttons don't trigger clicks)
    await expect(args.onClick).not.toHaveBeenCalled();
  }
}`,...(lt=(ct=x.parameters)==null?void 0:ct.docs)==null?void 0:lt.source}}};var dt,ut,mt;f.parameters={...f.parameters,docs:{...(dt=f.parameters)==null?void 0:dt.docs,source:{originalSource:`{
  args: {
    children: 'Variant Test',
    variant: 'destructive',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const button = canvas.getByRole('button', {
      name: /variant test/i
    });

    // Verify button is rendered with destructive variant styles
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('tw-bg-destructive');

    // Test button interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Test hover state by hovering over the button
    await userEvent.hover(button);
    await expect(button).toBeInTheDocument();

    // Test unhover
    await userEvent.unhover(button);
    await expect(button).toBeInTheDocument();
  }
}`,...(mt=(ut=f.parameters)==null?void 0:ut.docs)==null?void 0:mt.source}}};var pt,vt,wt;C.parameters={...C.parameters,docs:{...(pt=C.parameters)==null?void 0:pt.docs,source:{originalSource:`{
  args: {
    children: 'Size Test',
    size: 'lg',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const button = canvas.getByRole('button', {
      name: /size test/i
    });

    // Verify button is rendered with large size styles
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('tw-h-11'); // Large size class

    // Test double click
    await userEvent.dblClick(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);

    // Test focus and blur
    button.focus();
    await expect(button).toHaveFocus();
    button.blur();
    await expect(button).not.toHaveFocus();
  }
}`,...(wt=(vt=C.parameters)==null?void 0:vt.docs)==null?void 0:wt.source}}};var bt,ht,gt;k.parameters={...k.parameters,docs:{...(bt=k.parameters)==null?void 0:bt.docs,source:{originalSource:`{
  args: {
    children: 'Complex Test Button',
    variant: 'default',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent,
    step
  }) => {
    await step('Initial button verification', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    });
    await step('Mouse interactions', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });

      // Hover and unhover
      await userEvent.hover(button);
      await userEvent.unhover(button);

      // Single click
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
    await step('Keyboard interactions', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });

      // Focus the button directly
      button.focus();
      await expect(button).toHaveFocus();

      // Activate via Enter key
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(2);

      // Activate via Space key
      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });
    await step('Final verification', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });
      await expect(button).toBeInTheDocument();
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });
  }
}`,...(gt=(ht=k.parameters)==null?void 0:ht.docs)==null?void 0:gt.source}}};const Ht=["Default","LiveEditable","VariantsDemo","SizesDemo","Destructive","Outline","Secondary","Ghost","Link","Disabled","Playground","ClickTest","DisabledTest","VariantTest","SizeTest","ComplexInteraction"];export{y as ClickTest,k as ComplexInteraction,l as Default,p as Destructive,g as Disabled,x as DisabledTest,b as Ghost,h as Link,d as LiveEditable,v as Outline,B as Playground,w as Secondary,C as SizeTest,m as SizesDemo,f as VariantTest,u as VariantsDemo,Ht as __namedExportsOrder,zt as default};
