import{j as e}from"./iframe-DsKGTJ0C.js";import{S as x,a as K}from"./shortcut-keys.component-BwyX4mNb.js";import"./preload-helper-CTOgD26E.js";import"./index-VL4OM5EA.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./kbd-BbQU0ttn.js";import"./utils-BPbySc-g.js";import"./tooltip-BVlo2QVx.js";import"./button-HiGuhB9N.js";import"./index-BnuTq2W6.js";import"./index-DsO9uvxN.js";import"./z-index-DhRj3SmA.js";import"./portal-container.context-B1UGeRDQ.js";import"./index-B70DhQhO.js";import"./index-CLhrTcEo.js";import"./index-Bwjhe5ep.js";import"./index-BVwZUHQT.js";import"./index-Dy_F8hi-.js";import"./index-ujwRXZKv.js";import"./index-Ct_MZZCi.js";import"./index-CxokEsP-.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BmhNkxiC.js";import"./index-CwAKGSCW.js";import"./index-BI4FYyb1.js";const X={title:"Basics/ShortcutKeys",component:x,tags:["autodocs","test"],parameters:{docs:{description:{component:"\nRenders one already-resolved keyboard shortcut hint as keycaps: a single key is a lone `Kbd`, while a combination puts each key in its own `Kbd` inside a `KbdGroup`. Prefer this over building the `KbdGroup` by hand. It follows the hint's own spelling (see [Guidelines/Keyboard shortcuts](?path=/docs/guidelines-keyboard-shortcuts--docs)): macOS symbols sit adjacent with no separator, while Windows/Linux keys get a literal `+` between keycaps. Choosing the spelling for the user's OS is up to the caller.\n\nHovering the keycaps shows a tooltip that reads the shortcut out (\"Press Control and +\"). The app provides its text at the root of every window and web view through `ShortcutKeysLocalizedStringsProvider`, which these stories add themselves. Inside another tooltip's content the keycaps add no tooltip of their own.\n\n`hint` takes a single key combination — such as a menu item's `shortcut` string — not a raw keyboard shortcuts catalog `keys` string with `/`-separated alternatives.\n        "}}},argTypes:{hint:{control:"text",description:"One already-resolved keyboard shortcut hint to render as keycaps."}},decorators:[a=>e.jsx(K,{localizedStrings:{"%shortcutKeys_tooltip%":"Press {keys}"},children:e.jsx("div",{className:"tw:p-4",children:e.jsx(a,{})})})]},t={args:{hint:"F7"},parameters:{docs:{description:{story:"A single-key shortcut renders as one naked `Kbd`, with no surrounding `KbdGroup`."}}}},s={args:{hint:"Ctrl+Shift+N"},parameters:{docs:{description:{story:"The Windows/Linux spelling: each key gets its own keycap, joined by a plain-text `+`."}}}},r={args:{hint:"⇧⌘Z"},parameters:{docs:{description:{story:"The macOS spelling: modifier symbols sit adjacent with no separator between the keycaps."}}}},o={args:{hint:"Ctrl++"},parameters:{docs:{description:{story:"A `+` directly after another `+` is the key itself rather than a separator, so this renders two keycaps (`Ctrl` and `+`), not three."}}}},n={render:a=>e.jsxs("div",{className:"tw:flex tw:w-64 tw:items-center tw:justify-between tw:rounded-sm tw:bg-popover tw:px-2 tw:py-1.5 tw:text-sm",children:[e.jsx("span",{children:"Redo"}),e.jsx(x,{...a})]}),args:{hint:"⇧⌘Z"},parameters:{docs:{description:{story:"A typical consumer: a menu item row with its label on the start side and the shortcut hint on the end side."}}}};var i,d,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    hint: 'F7'
  },
  parameters: {
    docs: {
      description: {
        story: 'A single-key shortcut renders as one naked \`Kbd\`, with no surrounding \`KbdGroup\`.'
      }
    }
  }
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,h,l;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    hint: 'Ctrl+Shift+N'
  },
  parameters: {
    docs: {
      description: {
        story: 'The Windows/Linux spelling: each key gets its own keycap, joined by a plain-text \`+\`.'
      }
    }
  }
}`,...(l=(h=s.parameters)==null?void 0:h.docs)==null?void 0:l.source}}};var m,u,y;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    hint: '⇧⌘Z'
  },
  parameters: {
    docs: {
      description: {
        story: 'The macOS spelling: modifier symbols sit adjacent with no separator between the keycaps.'
      }
    }
  }
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var w,g,b;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    hint: 'Ctrl++'
  },
  parameters: {
    docs: {
      description: {
        story: 'A \`+\` directly after another \`+\` is the key itself rather than a separator, so this renders two keycaps (\`Ctrl\` and \`+\`), not three.'
      }
    }
  }
}`,...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var k,f,S;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <div className="tw:flex tw:w-64 tw:items-center tw:justify-between tw:rounded-sm tw:bg-popover tw:px-2 tw:py-1.5 tw:text-sm">
      <span>Redo</span>
      <ShortcutKeys {...args} />
    </div>,
  args: {
    hint: '⇧⌘Z'
  },
  parameters: {
    docs: {
      description: {
        story: 'A typical consumer: a menu item row with its label on the start side and the shortcut hint on the end side.'
      }
    }
  }
}`,...(S=(f=n.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};const Y=["SingleKey","WindowsMultiKey","MacOsAdjacentSymbols","CtrlPlusPlus","InMenuRow"];export{o as CtrlPlusPlus,n as InMenuRow,r as MacOsAdjacentSymbols,t as SingleKey,s as WindowsMultiKey,Y as __namedExportsOrder,X as default};
