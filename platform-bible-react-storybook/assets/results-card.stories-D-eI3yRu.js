import{j as e,r as B}from"./iframe-BYK0y_rY.js";import{D as v,a as b,b as k,e as m}from"./dropdown-menu-BoNSJjDD.js";import{c as g}from"./utils-BPbySc-g.js";import{B as C}from"./button-B4SqqzeN.js";import{E as N}from"./ellipsis-vertical-Dzu3jHDE.js";import{B as S}from"./badge-Di_abIOx.js";import{B as F}from"./book-open-C1mt01jD.js";import{C as L}from"./copy-7MxzvIb7.js";import{E as M}from"./external-link-D6KVr6Mj.js";import{S as $}from"./settings-B0X8xGrs.js";import"./preload-helper-CTOgD26E.js";import"./menu.context-D7lSyX-q.js";import"./index-BnuTq2W6.js";import"./IconCheck-BX1WtCYX.js";import"./createReactComponent-DzQOGgN1.js";import"./IconChevronRight-T2y5Czsk.js";import"./index-Dg6aOH6y.js";import"./index-Dn4C1LeI.js";import"./index-BfOHqkWc.js";import"./index-CZBe_90t.js";import"./index-Cb6Oi4Vy.js";import"./index-CY5symUT.js";import"./index-dk62z9Wh.js";import"./index-CCYdsGWI.js";import"./index--uKwbXCS.js";import"./index-C8k5lB4n.js";import"./index-CIiy_9uL.js";import"./index-DUMnjcHg.js";import"./index-CCpTIJRc.js";import"./index-DpO58ye7.js";import"./createLucideIcon-B2rwuD4X.js";function f({cardKey:s,isSelected:a,onSelect:n,isDenied:o,isHidden:d=!1,className:t,children:i,selectedButtons:c,hoverButtons:r,dropdownContent:l,additionalContent:x,accentColor:w,showDropdownOnHover:_=!1}){const A=y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),n())};return e.jsxs("div",{hidden:d,onClick:n,onKeyDown:A,role:"button",tabIndex:0,"aria-pressed":a,className:g("tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",{"tw:opacity-50 tw:hover:opacity-100":o&&!a},{"tw:bg-accent":a},{"tw:bg-transparent":!a},t),children:[e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2 tw:p-4",children:[e.jsxs("div",{className:"tw:flex tw:justify-between tw:overflow-hidden",children:[e.jsx("div",{className:"tw:min-w-0 tw:flex-1",children:i}),a&&c,!a&&r&&e.jsx("div",{className:"tw:invisible tw:group-hover:visible",children:r}),!a&&_&&l&&e.jsx("div",{className:"tw:invisible tw:group-hover:visible",children:e.jsxs(v,{children:[e.jsx(b,{className:g(w&&"tw:me-1"),asChild:!0,children:e.jsx(C,{className:"tw:m-1 tw:h-6 tw:w-6",variant:"ghost",size:"icon",children:e.jsx(N,{})})}),e.jsx(k,{align:"end",children:l})]})}),a&&l&&e.jsxs(v,{children:[e.jsx(b,{className:g(w&&"tw:me-1"),asChild:!0,children:e.jsx(C,{className:"tw:m-1 tw:h-6 tw:w-6",variant:"ghost",size:"icon",children:e.jsx(N,{})})}),e.jsx(k,{align:"end",children:l})]})]}),x&&e.jsx("div",{className:"tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden",children:x})]}),w&&e.jsx("div",{className:`tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${w}`})]},s)}f.__docgenInfo={description:`ResultsCard is a base component for displaying scripture-related results in a card format, even
though it is not based on the Card component. It provides common functionality like selection
state, dropdown menus, and expandable content.`,methods:[],displayName:"ResultsCard",props:{cardKey:{required:!0,tsType:{name:"string"},description:"Unique key for the card"},isSelected:{required:!0,tsType:{name:"boolean"},description:"Whether this card is currently selected/focused"},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback function called when the card is clicked"},isDenied:{required:!1,tsType:{name:"boolean"},description:"Whether the content of this card are in a denied state"},isHidden:{required:!1,tsType:{name:"boolean"},description:"Whether the card should be hidden",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes to apply to the card"},children:{required:!0,tsType:{name:"ReactNode"},description:"Main content to display on the card"},selectedButtons:{required:!1,tsType:{name:"ReactNode"},description:"Additional buttons to show to the end of the card when selected, before the dropdown menu"},hoverButtons:{required:!1,tsType:{name:"ReactNode"},description:"Additional buttons to show when the card is hovered but not selected"},dropdownContent:{required:!1,tsType:{name:"ReactNode"},description:"Content to show in the dropdown menu when selected"},showDropdownOnHover:{required:!1,tsType:{name:"boolean"},description:"Whether to show the dropdown menu button on hover even when not selected. Defaults to false",defaultValue:{value:"false",computed:!1}},additionalContent:{required:!1,tsType:{name:"ReactNode"},description:"Additional content to show below the main content"},accentColor:{required:!1,tsType:{name:"string"},description:"Color to use for the card's accent border"}}};const{fn:V}=__STORYBOOK_MODULE_TEST__,be={title:"Basics/ResultsCard",component:f,tags:["autodocs"],parameters:{docs:{description:{component:`
A base component for displaying results in a card format. It provides common functionality like selection state, dropdown menus, and expandable content.

**Features:**
- Selectable state with visual feedback
- Optional dropdown menu when selected
- Expandable additional content when selected
- Responsive design with proper accessibility
        `}}},decorators:[s=>e.jsx("div",{className:"tw:max-w-lg tw:p-4",children:e.jsx(s,{})})]},O=e.jsxs(e.Fragment,{children:[e.jsxs(m,{children:[e.jsx(F,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"View Details"]}),e.jsxs(m,{children:[e.jsx(L,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Copy Reference"]}),e.jsxs(m,{children:[e.jsx(M,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Open in New Tab"]}),e.jsxs(m,{children:[e.jsx($,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Settings"]})]}),h={args:{isSelected:!1,onSelect:V(),cardKey:"default-card",children:e.jsxs("div",{className:"tw:space-y-1",children:[e.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"John 3:16"}),e.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."})]})}},u={render:()=>{var d;const s=[{key:"check-card-1",title:"GEN 1:1",badges:["Setup required"],description:"Invalid or unknown character: ("},{key:"check-card-2",title:"GEN 1:1",badges:["Setup required"],description:"Invalid or unknown character: (",defaultSelected:!0},{key:"check-card-3",title:"GEN 1:1",badges:["Denied","Setup required"],description:"There's a place in Scotland called Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch, which has the longest place name in Europe.",isDenied:!0}],a=(d=s.find(t=>t.defaultSelected))==null?void 0:d.key,[n,o]=B.useState(a);return e.jsxs("div",{className:"tw:space-y-2",children:[e.jsx("p",{className:"tw:mb-4 tw:text-sm tw:text-muted-foreground",children:"Click a card to select it. Only one card can be selected at a time."}),s.map(t=>{const i=n===t.key;return e.jsx(f,{cardKey:t.key,isSelected:i,isDenied:t.isDenied,accentColor:"tw:bg-blue-500",onSelect:()=>o(r=>r===t.key?void 0:t.key),dropdownContent:O,additionalContent:e.jsx(S,{className:"tw:block tw:min-w-0 tw:max-w-full tw:truncate tw:rounded-md tw:bg-blue-500",children:"Characters Check"}),children:e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:overflow-hidden",children:[e.jsx("span",{className:"tw:shrink-0 tw:text-nowrap tw:text-xs tw:font-medium",children:t.title}),t.badges&&t.badges.map(r=>e.jsx(S,{className:"tw:block tw:min-w-0 tw:max-w-full tw:truncate tw:rounded-md",variant:"secondary",children:r},`${t.key}-${r}`))]}),e.jsx("span",{className:"tw:font-regular tw:overflow-hidden tw:text-ellipsis tw:text-xs tw:text-muted-foreground",children:t.description})]})})})]})},parameters:{docs:{description:{story:"Interactive collection of check cards demonstrating different statuses with single-selection behavior."}}}},p={render:()=>{var d;const s=[{key:"find-card-1",title:"GEN 1:1 God",description:"In the beginning God created the heavens and the earth."},{key:"find-card-2",title:"GEN 1:3 God",description:'And God said, "Let there be light," and there was light.',defaultSelected:!0},{key:"find-card-3",title:"GEN 1:5 God",description:'God called the light "day," and the darkness he called "night." And there was evening and there was morning, the first day.'}],a=(d=s.find(t=>t.defaultSelected))==null?void 0:d.key,[n,o]=B.useState(a);return e.jsxs("div",{className:"tw:space-y-2",children:[e.jsx("p",{className:"tw:mb-4 tw:text-sm tw:text-muted-foreground",children:"Click a card to select it. Only one card can be selected at a time."}),s.map(t=>{const i=n===t.key;return e.jsx(f,{cardKey:t.key,isSelected:i,onSelect:()=>o(c=>c===t.key?void 0:t.key),dropdownContent:O,additionalContent:e.jsx("div",{className:"tw:text-xs tw:font-medium tw:text-muted-foreground",children:t.description}),children:e.jsx("div",{className:"tw:text-xs tw:font-medium",children:t.title})})})]})},parameters:{docs:{description:{story:"Interactive collection of check cards demonstrating different statuses with single-selection behavior."}}}};var j,D,E;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    isSelected: false,
    onSelect: fn(),
    cardKey: 'default-card',
    children: <div className="tw:space-y-1">
        <h3 className="tw:text-lg tw:font-semibold">John 3:16</h3>
        <p className="tw:text-sm tw:text-muted-foreground">
          For God so loved the world that he gave his one and only Son, that whoever believes in him
          shall not perish but have eternal life.
        </p>
      </div>
  }
}`,...(E=(D=h.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var G,q,K;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => {
    const checkCards: CardConfig[] = [{
      key: 'check-card-1',
      title: 'GEN 1:1',
      badges: ['Setup required'],
      description: 'Invalid or unknown character: ('
    }, {
      key: 'check-card-2',
      title: 'GEN 1:1',
      badges: ['Setup required'],
      description: 'Invalid or unknown character: (',
      defaultSelected: true
    }, {
      key: 'check-card-3',
      title: 'GEN 1:1',
      badges: ['Denied', 'Setup required'],
      description: "There's a place in Scotland called Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch, which has the longest place name in Europe.",
      isDenied: true
    }];
    const defaultSelectedCard = checkCards.find(card => card.defaultSelected)?.key;
    const [selectedCardKey, setSelectedCardKey] = useState<string | undefined>(defaultSelectedCard);
    return <div className="tw:space-y-2">
        <p className="tw:mb-4 tw:text-sm tw:text-muted-foreground">
          Click a card to select it. Only one card can be selected at a time.
        </p>
        {checkCards.map(card => {
        const isSelected = selectedCardKey === card.key;
        const accentColor = 'tw:bg-blue-500';
        return <ResultsCard cardKey={card.key} isSelected={isSelected} isDenied={card.isDenied} accentColor={accentColor} onSelect={() => setSelectedCardKey(current => current === card.key ? undefined : card.key)} dropdownContent={mockDropdownContent} additionalContent={<Badge className="tw:block tw:min-w-0 tw:max-w-full tw:truncate tw:rounded-md tw:bg-blue-500">
                  Characters Check
                </Badge>}>
              <div className="tw:flex tw:flex-col tw:gap-2">
                <div className="tw:flex tw:items-center tw:gap-2 tw:overflow-hidden">
                  <span className="tw:shrink-0 tw:text-nowrap tw:text-xs tw:font-medium">
                    {card.title}
                  </span>
                  {card.badges && card.badges.map(badge => <Badge key={\`\${card.key}-\${badge}\`} className="tw:block tw:min-w-0 tw:max-w-full tw:truncate tw:rounded-md" variant="secondary">
                        {badge}
                      </Badge>)}
                </div>
                <span className="tw:font-regular tw:overflow-hidden tw:text-ellipsis tw:text-xs tw:text-muted-foreground">
                  {card.description}
                </span>
              </div>
            </ResultsCard>;
      })}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive collection of check cards demonstrating different statuses with single-selection behavior.'
      }
    }
  }
}`,...(K=(q=u.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};var T,R,I;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const findCards: CardConfig[] = [{
      key: 'find-card-1',
      title: 'GEN 1:1 God',
      description: 'In the beginning God created the heavens and the earth.'
    }, {
      key: 'find-card-2',
      title: 'GEN 1:3 God',
      description: 'And God said, "Let there be light," and there was light.',
      defaultSelected: true
    }, {
      key: 'find-card-3',
      title: 'GEN 1:5 God',
      description: 'God called the light "day," and the darkness he called "night." And there was evening and there was morning, the first day.'
    }];
    const defaultSelectedCard = findCards.find(card => card.defaultSelected)?.key;
    const [selectedCardKey, setSelectedCardKey] = useState<string | undefined>(defaultSelectedCard);
    return <div className="tw:space-y-2">
        <p className="tw:mb-4 tw:text-sm tw:text-muted-foreground">
          Click a card to select it. Only one card can be selected at a time.
        </p>
        {findCards.map(card => {
        const isSelected = selectedCardKey === card.key;
        return <ResultsCard cardKey={card.key} isSelected={isSelected} onSelect={() => setSelectedCardKey(current => current === card.key ? undefined : card.key)} dropdownContent={mockDropdownContent} additionalContent={<div className="tw:text-xs tw:font-medium tw:text-muted-foreground">
                  {card.description}
                </div>}>
              <div className="tw:text-xs tw:font-medium">{card.title}</div>
            </ResultsCard>;
      })}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive collection of check cards demonstrating different statuses with single-selection behavior.'
      }
    }
  }
}`,...(I=(R=p.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};const ke=["Default","CheckCards","FindCards"];export{u as CheckCards,h as Default,p as FindCards,ke as __namedExportsOrder,be as default};
