import{r as g,j as e}from"./iframe-B0QPoExt.js";import{D as O,a as _,b as A,e as w}from"./dropdown-menu-BWRTkPsw.js";import{c as y}from"./utils-BPbySc-g.js";import{B as F}from"./button-BZsSMpo1.js";import{E as M}from"./ellipsis-vertical-DrZUC2af.js";import{B as C}from"./badge-C0gTW-YM.js";import{B as L}from"./book-open-BrWm1Tk5.js";import{C as $}from"./copy-CRE4bWm1.js";import{E as H}from"./external-link-Dw11Zx7i.js";import{S as V}from"./settings-DDgCl24m.js";import"./preload-helper-CTOgD26E.js";import"./menu.context-BV0etJPY.js";import"./index-BnuTq2W6.js";import"./IconCheck-0X0cEIGQ.js";import"./createReactComponent-rJoA7p0W.js";import"./IconChevronRight-CKyzNuV3.js";import"./index-Cffw8u4b.js";import"./index-DUnTc8LI.js";import"./index-Qb1f7yK5.js";import"./index-7feSoujl.js";import"./index-uzc-mgJu.js";import"./index-ChBZ5lDH.js";import"./index-BcFtINXg.js";import"./index-DHmjPMt4.js";import"./index-Dpi5B48O.js";import"./index-CiK5G8IB.js";import"./index-CVUfQ6V2.js";import"./index-CYGDd-mI.js";import"./index-ChkVlXuY.js";import"./index-DnxaYsWV.js";import"./createLucideIcon-C5tbx1nB.js";function h({cardKey:r,isSelected:a,onSelect:o,isDenied:i,isHidden:d=!1,className:t,children:c,selectedButtons:l,hoverButtons:n,dropdownContent:x,additionalContent:v,accentColor:f,showDropdownOnHover:b=!1}){const B=s=>{if(s.key==="Enter"||s.key===" "){if(s.target!==s.currentTarget)return;s.preventDefault(),o()}},[I,k]=g.useState(!1);return e.jsxs("div",{hidden:d,onClick:o,onKeyDown:B,onMouseEnter:()=>k(!0),onFocus:()=>k(!0),role:"button",tabIndex:0,"aria-pressed":a,className:y("tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",{"tw:opacity-50 tw:hover:opacity-100":i&&!a},{"tw:bg-accent":a},{"tw:bg-transparent":!a},t),children:[e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2 tw:p-4",children:[e.jsxs("div",{className:"tw:flex tw:justify-between tw:overflow-hidden",children:[e.jsx("div",{className:"tw:min-w-0 tw:flex-1",children:c}),a&&l,!a&&n&&e.jsx("div",{className:"tw:invisible tw:group-hover:visible",children:n}),x&&(a||b&&I)&&e.jsx("div",{className:y(!a&&b&&"tw:invisible tw:group-hover:visible"),children:e.jsxs(O,{children:[e.jsx(_,{className:y(f&&"tw:me-1"),asChild:!0,children:e.jsx(F,{className:"tw:m-1 tw:h-6 tw:w-6",variant:"ghost",size:"icon",onClick:s=>s.stopPropagation(),onFocus:s=>s.stopPropagation(),children:e.jsx(M,{})})}),e.jsx(A,{align:"end",children:x})]})})]}),v&&e.jsx("div",{className:"tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden",children:v})]}),f&&e.jsx("div",{className:`tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${f}`})]},r)}h.__docgenInfo={description:`ResultsCard is a base component for displaying scripture-related results in a card format, even
though it is not based on the Card component. It provides common functionality like selection
state, dropdown menus, and expandable content.`,methods:[],displayName:"ResultsCard",props:{cardKey:{required:!0,tsType:{name:"string"},description:"Unique key for the card"},isSelected:{required:!0,tsType:{name:"boolean"},description:"Whether this card is currently selected/focused"},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback function called when the card is clicked"},isDenied:{required:!1,tsType:{name:"boolean"},description:"Whether the content of this card are in a denied state"},isHidden:{required:!1,tsType:{name:"boolean"},description:"Whether the card should be hidden",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes to apply to the card"},children:{required:!0,tsType:{name:"ReactNode"},description:"Main content to display on the card"},selectedButtons:{required:!1,tsType:{name:"ReactNode"},description:"Additional buttons to show to the end of the card when selected, before the dropdown menu"},hoverButtons:{required:!1,tsType:{name:"ReactNode"},description:"Additional buttons to show when the card is hovered but not selected"},dropdownContent:{required:!1,tsType:{name:"ReactNode"},description:"Content to show in the dropdown menu when selected"},showDropdownOnHover:{required:!1,tsType:{name:"boolean"},description:"Whether to show the dropdown menu button on hover even when not selected. Defaults to false",defaultValue:{value:"false",computed:!1}},additionalContent:{required:!1,tsType:{name:"ReactNode"},description:"Additional content to show below the main content"},accentColor:{required:!1,tsType:{name:"string"},description:"Color to use for the card's accent border"}}};const{fn:W}=__STORYBOOK_MODULE_TEST__,Ce={title:"Basics/ResultsCard",component:h,tags:["autodocs"],parameters:{docs:{description:{component:`
A base component for displaying results in a card format. It provides common functionality like selection state, dropdown menus, and expandable content.

**Features:**
- Selectable state with visual feedback
- Optional dropdown menu when selected
- Expandable additional content when selected
- Responsive design with proper accessibility
        `}}},decorators:[r=>e.jsx("div",{className:"tw:max-w-lg tw:p-4",children:e.jsx(r,{})})]},R=e.jsxs(e.Fragment,{children:[e.jsxs(w,{children:[e.jsx(L,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"View Details"]}),e.jsxs(w,{children:[e.jsx($,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Copy Reference"]}),e.jsxs(w,{children:[e.jsx(H,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Open in New Tab"]}),e.jsxs(w,{children:[e.jsx(V,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"Settings"]})]}),m={args:{isSelected:!1,onSelect:W(),cardKey:"default-card",children:e.jsxs("div",{className:"tw:space-y-1",children:[e.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"John 3:16"}),e.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."})]})}},u={render:()=>{var d;const r=[{key:"check-card-1",title:"GEN 1:1",badges:["Setup required"],description:"Invalid or unknown character: ("},{key:"check-card-2",title:"GEN 1:1",badges:["Setup required"],description:"Invalid or unknown character: (",defaultSelected:!0},{key:"check-card-3",title:"GEN 1:1",badges:["Denied","Setup required"],description:"There's a place in Scotland called Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch, which has the longest place name in Europe.",isDenied:!0}],a=(d=r.find(t=>t.defaultSelected))==null?void 0:d.key,[o,i]=g.useState(a);return e.jsxs("div",{className:"tw:space-y-2",children:[e.jsx("p",{className:"tw:mb-4 tw:text-sm tw:text-muted-foreground",children:"Click a card to select it. Only one card can be selected at a time."}),r.map(t=>{const c=o===t.key;return e.jsx(h,{cardKey:t.key,isSelected:c,isDenied:t.isDenied,accentColor:"tw:bg-blue-500",onSelect:()=>i(n=>n===t.key?void 0:t.key),dropdownContent:R,additionalContent:e.jsx(C,{className:"tw:block tw:min-w-0 tw:max-w-full tw:truncate tw:rounded-md tw:bg-blue-500",children:"Characters Check"}),children:e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:overflow-hidden",children:[e.jsx("span",{className:"tw:shrink-0 tw:text-nowrap tw:text-xs tw:font-medium",children:t.title}),t.badges&&t.badges.map(n=>e.jsx(C,{className:"tw:block tw:min-w-0 tw:max-w-full tw:truncate tw:rounded-md",variant:"secondary",children:n},`${t.key}-${n}`))]}),e.jsx("span",{className:"tw:font-regular tw:overflow-hidden tw:text-ellipsis tw:text-xs tw:text-muted-foreground",children:t.description})]})})})]})},parameters:{docs:{description:{story:"Interactive collection of check cards demonstrating different statuses with single-selection behavior."}}}},p={render:()=>{var d;const r=[{key:"find-card-1",title:"GEN 1:1 God",description:"In the beginning God created the heavens and the earth."},{key:"find-card-2",title:"GEN 1:3 God",description:'And God said, "Let there be light," and there was light.',defaultSelected:!0},{key:"find-card-3",title:"GEN 1:5 God",description:'God called the light "day," and the darkness he called "night." And there was evening and there was morning, the first day.'}],a=(d=r.find(t=>t.defaultSelected))==null?void 0:d.key,[o,i]=g.useState(a);return e.jsxs("div",{className:"tw:space-y-2",children:[e.jsx("p",{className:"tw:mb-4 tw:text-sm tw:text-muted-foreground",children:"Click a card to select it. Only one card can be selected at a time."}),r.map(t=>{const c=o===t.key;return e.jsx(h,{cardKey:t.key,isSelected:c,onSelect:()=>i(l=>l===t.key?void 0:t.key),dropdownContent:R,additionalContent:e.jsx("div",{className:"tw:text-xs tw:font-medium tw:text-muted-foreground",children:t.description}),children:e.jsx("div",{className:"tw:text-xs tw:font-medium",children:t.title})})})]})},parameters:{docs:{description:{story:"Interactive collection of check cards demonstrating different statuses with single-selection behavior."}}}};var N,S,j;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(j=(S=m.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var E,G,D;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(D=(G=u.parameters)==null?void 0:G.docs)==null?void 0:D.source}}};var q,K,T;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(T=(K=p.parameters)==null?void 0:K.docs)==null?void 0:T.source}}};const Ne=["Default","CheckCards","FindCards"];export{u as CheckCards,m as Default,p as FindCards,Ne as __namedExportsOrder,Ce as default};
