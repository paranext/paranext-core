import{r as o,j as e}from"./iframe-Dw0rVdo7.js";import{c}from"./utils-BPbySc-g.js";import{u as me}from"./listbox-keyboard-navigation.hook-Bbf5KQxZ.js";import{S as pe}from"./separator-Qzj8Neef.js";import{S as he}from"./skeleton-DT7L7V6X.js";import{R as ge,a as C,b as fe}from"./resizable-D64F1qK2.js";import"./preload-helper-CTOgD26E.js";import"./index-B66_QFvp.js";import"./index-BYchALu_.js";function Y({items:t,renderItem:r,renderDetailContent:l,onItemClick:d,selectedItemId:Q,emptyStateMessage:Z="No items found",detailRegionLabel:ee="Selected item details",isLoading:te=!1,variant:v="text",showSourceLanguage:ae=!1,showTransliteration:ne=!1,onCharacterPress:se,className:x}){const[i,T]=o.useState(),re=o.useRef(null),ie=Q??i,u=o.useMemo(()=>i?t.find(a=>a.id===i):void 0,[i,t]),oe=o.useMemo(()=>t.map(a=>({id:a.id})),[t]),b=a=>{d==null||d(a),l&&T(a.id===i?void 0:a.id)},le=a=>{const n=t.find(s=>s.id===a.id);n&&b(n)},{listboxRef:S,activeId:de,handleKeyDown:ce,focusOption:ue}=me({options:oe,onOptionSelect:le,onCharacterPress:se}),L=()=>{const a=i;T(void 0),a&&requestAnimationFrame(()=>{var n;ue(a),(n=S.current)==null||n.focus()})},I=o.useRef(null);if(o.useEffect(()=>{if(!u)return;const a=I.current;if(!a)return;const n=s=>{s.key==="Escape"&&(s.preventDefault(),L())};return a.addEventListener("keydown",n),()=>a.removeEventListener("keydown",n)},[u]),te)return e.jsx("div",{className:c("tw:flex tw:flex-col tw:gap-2 tw:p-2",x),children:Array.from({length:6},(a,n)=>e.jsx(he,{className:c("tw:h-12 tw:w-full tw:rounded",{"tw:h-20":v==="thumbnail"})},n))});if(t.length===0)return e.jsx("div",{className:c("tw:flex tw:items-center tw:justify-center tw:p-8 tw:text-sm tw:text-muted-foreground",x),children:Z});const N=e.jsx("ul",{role:"listbox",tabIndex:0,ref:S,"aria-activedescendant":de??void 0,className:"tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",onKeyDown:ce,children:t.map(a=>{const n=ie===a.id;return e.jsx("li",{id:a.id,role:"option","aria-selected":n,tabIndex:-1,onClick:()=>b(a),onKeyDown:s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),b(a))},className:c("tw:flex tw:cursor-pointer tw:items-center tw:gap-3 tw:p-2 tw:outline-none",{"tw:bg-muted":n,"tw:hover:bg-muted":!n}),children:r?r(a):e.jsx(we,{item:a,variant:v,showSourceLanguage:ae,showTransliteration:ne})},a.id)})}),j=l&&u?l(u,L):void 0;return e.jsx("div",{ref:re,className:c("tw:relative tw:flex tw:h-full tw:overflow-hidden",x),children:j?e.jsxs(ge,{direction:"horizontal",className:"tw:h-full tw:w-full",children:[e.jsx(C,{defaultSize:33.3333,minSize:20,children:e.jsx("div",{className:"tw:h-full tw:overflow-y-auto",children:N})}),e.jsx(fe,{}),e.jsx(C,{defaultSize:66.6667,minSize:30,children:e.jsx("div",{ref:I,role:"region","aria-label":ee,className:"tw:h-full tw:overflow-y-auto tw:bg-background tw:p-4",children:j})})]}):e.jsx("div",{className:"tw:h-full tw:w-full tw:overflow-y-auto",children:N})})}function we({item:t,variant:r,showSourceLanguage:l,showTransliteration:d}){return e.jsxs(e.Fragment,{children:[r==="thumbnail"&&t.thumbnailUrl&&e.jsx("img",{src:t.thumbnailUrl,alt:t.thumbnailAlt??t.primaryText,className:"tw:h-14 tw:w-14 tw:shrink-0 tw:rounded tw:object-cover"}),e.jsxs("div",{className:"tw:flex tw:flex-1 tw:items-baseline tw:gap-4 tw:overflow-hidden",children:[e.jsx("span",{className:"tw:shrink-0 tw:truncate tw:text-sm",children:t.primaryText}),l&&t.sourceLanguageText&&e.jsxs("span",{className:"tw:truncate tw:text-sm tw:text-muted-foreground",children:[t.sourceLanguageText,d&&t.transliteration&&e.jsxs("span",{className:"tw:ml-1",children:["(",t.transliteration,")"]})]})]}),e.jsx(pe,{className:"tw:absolute tw:bottom-0 tw:left-0 tw:right-0"})]})}Y.__docgenInfo={description:`A shared list component for displaying source-language indexed items. Supports two-column layout
(resource term + source language term), keyboard navigation, text and thumbnail variants,
loading/empty states, and an optional side-by-side detail panel.

When \`renderDetailContent\` is provided, clicking an item opens a side-by-side detail panel using
a \`ResizablePanelGroup\` split (list at ~33%, detail at ~67%, with a draggable handle). This is
the pattern from PR #2209's stories (\`source-language-indexed-list.stories.tsx\`); the previous
absolute-positioned and vaul-\`Drawer\` implementations are both abandoned because the former
obscured the list and the latter triggered Radix \`pointer-events: none\` body locks that left only
the "back to list" button interactive across the whole page.

Click swap: clicking a different list item while the panel is open swaps the detail content
without requiring a close-then-reopen cycle. Clicking the already-selected item closes the
detail. Pressing Escape while focus is inside the detail panel closes it (focus returns to the
listbox). The list and detail are siblings inside the same scrollable container, so outer
toolbars, tab switches, scope selectors, and any controls outside the SLI remain fully live.

Used by Enhanced Resources (dictionary, encyclopedia, media) and lexical tools (dictionary).

@example

\`\`\`tsx
<SourceLanguageIndexedList
  items={dictionaryItems}
  onItemClick={handleItemClick}
  selectedItemId={selectedId}
  showSourceLanguage
  showTransliteration
  renderDetailContent={(item, onClose) => (
    <DictionaryEntryDetail entry={item} onBack={onClose} />
  )}
/>;
\`\`\``,methods:[],displayName:"SourceLanguageIndexedList",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"Array of items to display in the list"},renderItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"item"}],return:{name:"ReactNode"}}},description:"Custom render function for each list item row. If not provided, the default layout is used"},renderDetailContent:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: T, onClose: () => void) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"item"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"onClose"}],return:{name:"ReactNode"}}},description:"Render function for the detail content shown in a right-side drawer when an item is selected.\nIf not provided, no drawer is shown and `onItemClick` fires directly."},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: T) => void",signature:{arguments:[{type:{name:"T"},name:"item"}],return:{name:"void"}}},description:"Callback when an item is clicked (fires in addition to opening the drawer if both exist)"},selectedItemId:{required:!1,tsType:{name:"string"},description:"ID of the currently selected item"},emptyStateMessage:{required:!1,tsType:{name:"string"},description:"Message to display when items array is empty",defaultValue:{value:"'No items found'",computed:!1}},detailRegionLabel:{required:!1,tsType:{name:"string"},description:`Accessible label for the detail panel region (announced to screen readers). Pass a localized
string. Defaults to the English "Selected item details".`,defaultValue:{value:"'Selected item details'",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether items are currently being loaded",defaultValue:{value:"false",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'text' | 'thumbnail'",elements:[{name:"literal",value:"'text'"},{name:"literal",value:"'thumbnail'"}]},description:"Display variant: 'text' for default text list, 'thumbnail' for media/maps with image preview",defaultValue:{value:"'text'",computed:!1}},showSourceLanguage:{required:!1,tsType:{name:"boolean"},description:"Whether to show the source language column",defaultValue:{value:"false",computed:!1}},showTransliteration:{required:!1,tsType:{name:"boolean"},description:"Whether to show transliteration in brackets after source language text",defaultValue:{value:"false",computed:!1}},onCharacterPress:{required:!1,tsType:{name:"signature",type:"function",raw:"(char: string) => void",signature:{arguments:[{type:{name:"string"},name:"char"}],return:{name:"void"}}},description:"Callback fired when user presses a character key (for type-ahead search)"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class names"}}};const{fn:k}=__STORYBOOK_MODULE_TEST__,ye=[{id:"logos",primaryText:"word",sourceLanguageText:"λόγος",transliteration:"logos"},{id:"agape",primaryText:"love",sourceLanguageText:"ἀγάπη",transliteration:"agapē"},{id:"pistis",primaryText:"faith",sourceLanguageText:"πίστις",transliteration:"pistis"},{id:"charis",primaryText:"grace",sourceLanguageText:"χάρις",transliteration:"charis"},{id:"eirene",primaryText:"peace",sourceLanguageText:"εἰρήνη",transliteration:"eirēnē"}],xe=[{id:"jerusalem",primaryText:"Jerusalem",sourceLanguageText:"יְרוּשָׁלַיִם",thumbnailUrl:"https://placehold.co/64x64?text=Map",thumbnailAlt:"Map of Jerusalem"},{id:"temple",primaryText:"Temple",sourceLanguageText:"הֵיכָל",thumbnailUrl:"https://placehold.co/64x64?text=Img",thumbnailAlt:"Image of the Temple"},{id:"jordan",primaryText:"Jordan River",thumbnailUrl:"https://placehold.co/64x64?text=Map",thumbnailAlt:"Map of the Jordan River"}],ke={title:"Advanced/SourceLanguageIndexedList",component:Y,tags:["autodocs","test"],parameters:{docs:{description:{component:`
A shared list component for displaying source-language indexed items (dictionary, encyclopedia, and media entries).

Features:
- Two-column layout (resource term + source-language term, with optional transliteration)
- Keyboard navigation (arrow keys, type-ahead)
- \`text\` and \`thumbnail\` display variants
- Loading and empty states
- Optional side-by-side detail panel via \`renderDetailContent\`
        `}}},decorators:[t=>e.jsx("div",{className:"tw:h-[400px] tw:max-w-2xl tw:border",children:e.jsx(t,{})})],args:{items:ye,showSourceLanguage:!0,showTransliteration:!0,onItemClick:k(),onCharacterPress:k()}},m={parameters:{docs:{description:{story:"Default text list with source-language text and transliteration shown."}}}},p={args:{showSourceLanguage:!1,showTransliteration:!1},parameters:{docs:{description:{story:"Primary text only, with the source-language column hidden."}}}},h={args:{selectedItemId:"agape"},parameters:{docs:{description:{story:'A controlled selection highlighting the "love / ἀγάπη" entry.'}}}},g={args:{renderDetailContent:(t,r)=>e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[e.jsx("h3",{className:"tw:text-lg tw:font-bold",children:t.primaryText}),t.sourceLanguageText&&e.jsxs("p",{className:"tw:text-sm tw:text-muted-foreground",children:[t.sourceLanguageText,t.transliteration?` (${t.transliteration})`:""]}),e.jsx("button",{type:"button",className:"tw:self-start tw:text-sm tw:underline",onClick:r,children:"Close"})]})},parameters:{docs:{description:{story:"Clicking an item opens a side-by-side detail panel rendered by `renderDetailContent`."}}}},f={args:{items:xe,variant:"thumbnail",showSourceLanguage:!0,showTransliteration:!1},parameters:{docs:{description:{story:"Thumbnail variant used for media/maps entries with image previews."}}}},w={args:{items:[],isLoading:!0},parameters:{docs:{description:{story:"Loading state shown while items are being fetched."}}}},y={args:{items:[],emptyStateMessage:"No entries found"},parameters:{docs:{description:{story:"Empty state with a custom message when no items match."}}}};var D,E,R;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Default text list with source-language text and transliteration shown.'
      }
    }
  }
}`,...(R=(E=m.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var q,A,M;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    showSourceLanguage: false,
    showTransliteration: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary text only, with the source-language column hidden.'
      }
    }
  }
}`,...(M=(A=p.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var _,P,z;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    selectedItemId: 'agape'
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled selection highlighting the "love / ἀγάπη" entry.'
      }
    }
  }
}`,...(z=(P=h.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var O,U,V;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    renderDetailContent: (item, onClose) => <div className="tw:flex tw:flex-col tw:gap-2">
        <h3 className="tw:text-lg tw:font-bold">{item.primaryText}</h3>
        {item.sourceLanguageText && <p className="tw:text-sm tw:text-muted-foreground">
            {item.sourceLanguageText}
            {item.transliteration ? \` (\${item.transliteration})\` : ''}
          </p>}
        <button type="button" className="tw:self-start tw:text-sm tw:underline" onClick={onClose}>
          Close
        </button>
      </div>
  },
  parameters: {
    docs: {
      description: {
        story: 'Clicking an item opens a side-by-side detail panel rendered by \`renderDetailContent\`.'
      }
    }
  }
}`,...(V=(U=g.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var W,K,B;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    items: THUMBNAIL_ITEMS,
    variant: 'thumbnail',
    showSourceLanguage: true,
    showTransliteration: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Thumbnail variant used for media/maps entries with image previews.'
      }
    }
  }
}`,...(B=(K=f.parameters)==null?void 0:K.docs)==null?void 0:B.source}}};var J,F,H;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    items: [],
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shown while items are being fetched.'
      }
    }
  }
}`,...(H=(F=w.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var G,$,X;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    items: [],
    emptyStateMessage: 'No entries found'
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with a custom message when no items match.'
      }
    }
  }
}`,...(X=($=y.parameters)==null?void 0:$.docs)==null?void 0:X.source}}};const De=["Default","WithoutSourceLanguage","SelectedItem","WithDetailPanel","ThumbnailVariant","Loading","Empty"];export{m as Default,y as Empty,w as Loading,h as SelectedItem,f as ThumbnailVariant,g as WithDetailPanel,p as WithoutSourceLanguage,De as __namedExportsOrder,ke as default};
