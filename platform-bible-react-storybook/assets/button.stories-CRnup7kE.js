import{j as s}from"./jsx-runtime-sYJah_-G.js";import{B as r}from"./button-SoRqZ2VX.js";import{T as bt}from"./theme-provider.component-D3Kvlde7.js";import"./iframe-CqZw80g5.js";import"./index-CwOi29x3.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";const{expect:t,fn:c}=__STORYBOOK_MODULE_TEST__,xt={title:"Shadcn/Button",component:r,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive","outline","secondary","ghost","link"],control:{type:"select"}},size:{options:["default","sm","lg","icon"],control:{type:"select"}},disabled:{control:"boolean"},className:{control:"text"}},decorators:[n=>s.jsx(bt,{children:s.jsx(n,{})})]},l={args:{children:"Default Button",variant:"default",size:"default"}},u={render:n=>s.jsxs("div",{className:"tw-space-y-4",children:[s.jsx(r,{...n,children:n.children||"Click me!"}),s.jsx("p",{className:"tw-text-sm tw-text-gray-600",children:"Use the Code Editor tab to modify this button in real-time!"})]}),args:{children:"Editable Button",variant:"default"},parameters:{docs:{description:{story:"This story allows live code editing. Try changing the variant, size, or adding click handlers in the Code Editor panel."}}}},d={render:()=>s.jsxs("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:[s.jsx(r,{variant:"default",children:"Default"}),s.jsx(r,{variant:"destructive",children:"Destructive"}),s.jsx(r,{variant:"outline",children:"Outline"}),s.jsx(r,{variant:"secondary",children:"Secondary"}),s.jsx(r,{variant:"ghost",children:"Ghost"}),s.jsx(r,{variant:"link",children:"Link"})]}),parameters:{docs:{description:{story:"All button variants displayed together. Try editing this code to add new variants or modify existing ones."}}}},m={args:{children:"Destructive Button",variant:"destructive"}},p={args:{children:"Outline Button",variant:"outline"}},v={args:{children:"Secondary Button",variant:"secondary"}},b={args:{children:"Ghost Button",variant:"ghost"}},h={args:{children:"Link Button",variant:"link"}},g={args:{children:"Disabled Button",disabled:!0}},w={args:{children:"Playground Button",variant:"default",size:"default"}},y={args:{children:"Click Me",variant:"default",onClick:c()},play:async({args:n,canvas:o,userEvent:a})=>{const e=o.getByRole("button",{name:/click me/i});await t(e).toBeInTheDocument(),await t(e).toBeVisible(),await a.click(e),await t(n.onClick).toHaveBeenCalled(),await t(n.onClick).toHaveBeenCalledTimes(1)}},B={args:{children:"Disabled Button",disabled:!0,onClick:c()},play:async({args:n,canvas:o})=>{const a=o.getByRole("button",{name:/disabled button/i});await t(a).toBeInTheDocument(),await t(a).toBeDisabled(),await t(n.onClick).not.toHaveBeenCalled()}},C={args:{children:"Variant Test",variant:"destructive",onClick:c()},play:async({args:n,canvas:o,userEvent:a})=>{const e=o.getByRole("button",{name:/variant test/i});await t(e).toBeInTheDocument(),await t(e).toHaveClass("tw-bg-destructive"),await a.click(e),await t(n.onClick).toHaveBeenCalledTimes(1),await a.hover(e),await t(e).toBeInTheDocument(),await a.unhover(e),await t(e).toBeInTheDocument()}},k={args:{children:"Size Test",size:"lg",onClick:c()},play:async({args:n,canvas:o,userEvent:a})=>{const e=o.getByRole("button",{name:/size test/i});await t(e).toBeInTheDocument(),await t(e).toHaveClass("tw-h-11"),await a.dblClick(e),await t(n.onClick).toHaveBeenCalledTimes(2),e.focus(),await t(e).toHaveFocus(),e.blur(),await t(e).not.toHaveFocus()}},x={args:{children:"Complex Test Button",variant:"default",onClick:c()},play:async({args:n,canvas:o,userEvent:a,step:e})=>{await e("Initial button verification",async()=>{const i=o.getByRole("button",{name:/complex test button/i});await t(i).toBeInTheDocument(),await t(i).toBeVisible(),await t(i).toBeEnabled()}),await e("Mouse interactions",async()=>{const i=o.getByRole("button",{name:/complex test button/i});await a.hover(i),await a.unhover(i),await a.click(i),await t(n.onClick).toHaveBeenCalledTimes(1)}),await e("Keyboard interactions",async()=>{const i=o.getByRole("button",{name:/complex test button/i});i.focus(),await t(i).toHaveFocus(),await a.keyboard("{Enter}"),await t(n.onClick).toHaveBeenCalledTimes(2),await a.keyboard(" "),await t(n.onClick).toHaveBeenCalledTimes(3)}),await e("Final verification",async()=>{const i=o.getByRole("button",{name:/complex test button/i});await t(i).toBeInTheDocument(),await t(n.onClick).toHaveBeenCalledTimes(3)})}};var f,T,D;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default'
  }
}`,...(D=(T=l.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var S,H,E;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(E=(H=u.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var I,R,z;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(z=(R=d.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var V,j,O;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'Destructive Button',
    variant: 'destructive'
  }
}`,...(O=(j=m.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var L,F,N;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...(N=(F=p.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var _,G,M;v.parameters={...v.parameters,docs:{...(_=v.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(M=(G=v.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var P,A,K;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...(K=(A=b.parameters)==null?void 0:A.docs)==null?void 0:K.source}}};var U,q,Y;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'Link Button',
    variant: 'link'
  }
}`,...(Y=(q=h.parameters)==null?void 0:q.docs)==null?void 0:Y.source}}};var J,Q,W;g.parameters={...g.parameters,docs:{...(J=g.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(W=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,$;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default'
  }
}`,...($=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var tt,et,nt;y.parameters={...y.parameters,docs:{...(tt=y.parameters)==null?void 0:tt.docs,source:{originalSource:`{
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
}`,...(nt=(et=y.parameters)==null?void 0:et.docs)==null?void 0:nt.source}}};var at,ot,it;B.parameters={...B.parameters,docs:{...(at=B.parameters)==null?void 0:at.docs,source:{originalSource:`{
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
}`,...(it=(ot=B.parameters)==null?void 0:ot.docs)==null?void 0:it.source}}};var st,rt,ct;C.parameters={...C.parameters,docs:{...(st=C.parameters)==null?void 0:st.docs,source:{originalSource:`{
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
}`,...(ct=(rt=C.parameters)==null?void 0:rt.docs)==null?void 0:ct.source}}};var lt,ut,dt;k.parameters={...k.parameters,docs:{...(lt=k.parameters)==null?void 0:lt.docs,source:{originalSource:`{
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
}`,...(dt=(ut=k.parameters)==null?void 0:ut.docs)==null?void 0:dt.source}}};var mt,pt,vt;x.parameters={...x.parameters,docs:{...(mt=x.parameters)==null?void 0:mt.docs,source:{originalSource:`{
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
}`,...(vt=(pt=x.parameters)==null?void 0:pt.docs)==null?void 0:vt.source}}};const ft=["Default","LiveEditable","VariantsDemo","Destructive","Outline","Secondary","Ghost","Link","Disabled","Playground","ClickTest","DisabledTest","VariantTest","SizeTest","ComplexInteraction"];export{y as ClickTest,x as ComplexInteraction,l as Default,m as Destructive,g as Disabled,B as DisabledTest,b as Ghost,h as Link,u as LiveEditable,p as Outline,w as Playground,v as Secondary,k as SizeTest,C as VariantTest,d as VariantsDemo,ft as __namedExportsOrder,xt as default};
