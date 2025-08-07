import{j as y}from"./jsx-runtime-CNDBSdvJ.js";import{B as it}from"./button-9Z3HDK3u.js";import{T as rt}from"./theme-provider.component-CEC7neyE.js";import"./iframe-DTsJgDGP.js";import"./index-S46eHTkP.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";const{expect:t,fn:i}=__STORYBOOK_MODULE_TEST__,vt={title:"Shadcn/Button",component:it,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive","outline","secondary","ghost","link"],control:{type:"select"}},size:{options:["default","sm","lg","icon"],control:{type:"select"}},disabled:{control:"boolean"},className:{control:"text"}},decorators:[a=>y.jsx(rt,{children:y.jsx(a,{})})]},r={args:{children:"Default Button",variant:"default",size:"default"}},c={args:{children:"Destructive Button",variant:"destructive"}},l={args:{children:"Outline Button",variant:"outline"}},u={args:{children:"Secondary Button",variant:"secondary"}},d={args:{children:"Ghost Button",variant:"ghost"}},m={args:{children:"Link Button",variant:"link"}},p={args:{children:"Disabled Button",disabled:!0}},b={args:{children:"Playground Button",variant:"default",size:"default"}},v={args:{children:"Click Me",variant:"default",onClick:i()},play:async({args:a,canvas:o,userEvent:n})=>{const e=o.getByRole("button",{name:/click me/i});await t(e).toBeInTheDocument(),await t(e).toBeVisible(),await n.click(e),await t(a.onClick).toHaveBeenCalled(),await t(a.onClick).toHaveBeenCalledTimes(1)}},w={args:{children:"Disabled Button",disabled:!0,onClick:i()},play:async({args:a,canvas:o})=>{const n=o.getByRole("button",{name:/disabled button/i});await t(n).toBeInTheDocument(),await t(n).toBeDisabled(),await t(a.onClick).not.toHaveBeenCalled()}},g={args:{children:"Variant Test",variant:"destructive",onClick:i()},play:async({args:a,canvas:o,userEvent:n})=>{const e=o.getByRole("button",{name:/variant test/i});await t(e).toBeInTheDocument(),await t(e).toHaveClass("tw-bg-destructive"),await n.click(e),await t(a.onClick).toHaveBeenCalledTimes(1),await n.hover(e),await t(e).toBeInTheDocument(),await n.unhover(e),await t(e).toBeInTheDocument()}},B={args:{children:"Size Test",size:"lg",onClick:i()},play:async({args:a,canvas:o,userEvent:n})=>{const e=o.getByRole("button",{name:/size test/i});await t(e).toBeInTheDocument(),await t(e).toHaveClass("tw-h-11"),await n.dblClick(e),await t(a.onClick).toHaveBeenCalledTimes(2),e.focus(),await t(e).toHaveFocus(),e.blur(),await t(e).not.toHaveFocus()}},h={args:{children:"Complex Test Button",variant:"default",onClick:i()},play:async({args:a,canvas:o,userEvent:n,step:e})=>{await e("Initial button verification",async()=>{const s=o.getByRole("button",{name:/complex test button/i});await t(s).toBeInTheDocument(),await t(s).toBeVisible(),await t(s).toBeEnabled()}),await e("Mouse interactions",async()=>{const s=o.getByRole("button",{name:/complex test button/i});await n.hover(s),await n.unhover(s),await n.click(s),await t(a.onClick).toHaveBeenCalledTimes(1)}),await e("Keyboard interactions",async()=>{const s=o.getByRole("button",{name:/complex test button/i});s.focus(),await t(s).toHaveFocus(),await n.keyboard("{Enter}"),await t(a.onClick).toHaveBeenCalledTimes(2),await n.keyboard(" "),await t(a.onClick).toHaveBeenCalledTimes(3)}),await e("Final verification",async()=>{const s=o.getByRole("button",{name:/complex test button/i});await t(s).toBeInTheDocument(),await t(a.onClick).toHaveBeenCalledTimes(3)})}};var C,k,T;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default'
  }
}`,...(T=(k=r.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var f,x,D;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'Destructive Button',
    variant: 'destructive'
  }
}`,...(D=(x=c.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};var H,S,I;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var E,R,z;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(z=(R=u.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var V,F,O;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...(O=(F=d.parameters)==null?void 0:F.docs)==null?void 0:O.source}}};var _,L,j;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'Link Button',
    variant: 'link'
  }
}`,...(j=(L=m.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var M,P,G;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(G=(P=p.parameters)==null?void 0:P.docs)==null?void 0:G.source}}};var K,q,A;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default'
  }
}`,...(A=(q=b.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var N,U,Y;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(Y=(U=v.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var J,Q,W;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(W=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,$;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...($=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var tt,et,nt;B.parameters={...B.parameters,docs:{...(tt=B.parameters)==null?void 0:tt.docs,source:{originalSource:`{
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
}`,...(nt=(et=B.parameters)==null?void 0:et.docs)==null?void 0:nt.source}}};var at,ot,st;h.parameters={...h.parameters,docs:{...(at=h.parameters)==null?void 0:at.docs,source:{originalSource:`{
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
}`,...(st=(ot=h.parameters)==null?void 0:ot.docs)==null?void 0:st.source}}};const wt=["Default","Destructive","Outline","Secondary","Ghost","Link","Disabled","Playground","ClickTest","DisabledTest","VariantTest","SizeTest","ComplexInteraction"];export{v as ClickTest,h as ComplexInteraction,r as Default,c as Destructive,p as Disabled,w as DisabledTest,d as Ghost,m as Link,l as Outline,b as Playground,u as Secondary,B as SizeTest,g as VariantTest,wt as __namedExportsOrder,vt as default};
