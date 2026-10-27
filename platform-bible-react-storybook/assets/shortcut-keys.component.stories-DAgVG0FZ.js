import{j as e}from"./iframe-DkkYII9s.js";import{S}from"./shortcut-keys.component-tE0PUGd_.js";import"./preload-helper-CTOgD26E.js";import"./index-aWm5KcgP.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./kbd-DJRXPnnE.js";import"./utils-BPbySc-g.js";const T={title:"Basics/ShortcutKeys",component:S,tags:["autodocs","test"],parameters:{docs:{description:{component:"\nRenders one already-resolved keyboard shortcut hint as keycaps: a single key is a lone `Kbd`, while a combination puts each key in its own `Kbd` inside a `KbdGroup`. Prefer this over building the `KbdGroup` by hand. It follows the hint's own spelling (see [Guidelines/Keyboard shortcuts](?path=/docs/guidelines-keyboard-shortcuts--docs)): macOS symbols sit adjacent with no separator, while Windows/Linux keys get a literal `+` between keycaps. Choosing the spelling for the user's OS is up to the caller.\n\n`hint` takes a single key combination — such as a menu item's `shortcut` string — not a raw keyboard shortcuts catalog `keys` string with `/`-separated alternatives.\n        "}}},argTypes:{hint:{control:"text",description:"One already-resolved keyboard shortcut hint to render as keycaps."}},decorators:[a=>e.jsx("div",{className:"tw:p-4",children:e.jsx(a,{})})]},t={args:{hint:"F7"},parameters:{docs:{description:{story:"A single-key shortcut renders as one naked `Kbd`, with no surrounding `KbdGroup`."}}}},s={args:{hint:"Ctrl+Shift+N"},parameters:{docs:{description:{story:"The Windows/Linux spelling: each key gets its own keycap, joined by a plain-text `+`."}}}},r={args:{hint:"⇧⌘Z"},parameters:{docs:{description:{story:"The macOS spelling: modifier symbols sit adjacent with no separator between the keycaps."}}}},n={args:{hint:"Ctrl++"},parameters:{docs:{description:{story:"A `+` directly after another `+` is the key itself rather than a separator, so this renders two keycaps (`Ctrl` and `+`), not three."}}}},o={render:a=>e.jsxs("div",{className:"tw:flex tw:w-64 tw:items-center tw:justify-between tw:rounded-sm tw:bg-popover tw:px-2 tw:py-1.5 tw:text-sm",children:[e.jsx("span",{children:"Redo"}),e.jsx(S,{...a})]}),args:{hint:"⇧⌘Z"},parameters:{docs:{description:{story:"A typical consumer: a menu item row with its label on the start side and the shortcut hint on the end side."}}}};var i,c,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,l,h;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(h=(l=s.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var m,u,y;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var w,g,b;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(b=(g=n.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var k,f,x;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};const G=["SingleKey","WindowsMultiKey","MacOsAdjacentSymbols","CtrlPlusPlus","InMenuRow"];export{n as CtrlPlusPlus,o as InMenuRow,r as MacOsAdjacentSymbols,t as SingleKey,s as WindowsMultiKey,G as __namedExportsOrder,T as default};
