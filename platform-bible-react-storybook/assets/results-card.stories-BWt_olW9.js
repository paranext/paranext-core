import{j as e}from"./jsx-runtime-CvGToidP.js";import{T}from"./theme-provider.component-BRfsG9zC.js";import{r as G}from"./iframe-FHgAwj54.js";import{D as q,a as I,b as R,c as l}from"./dropdown-menu-CmJD305T.js";import{c as y}from"./shadcn-ui.util-DMJ19wEV.js";import{B}from"./button-cud2eTA2.js";import{E as O}from"./ellipsis-BmqjpadT.js";import{B as g}from"./badge-CoxKbSil.js";import{B as _}from"./book-open-C1sut9aa.js";import{C as A}from"./copy-Bb-SS_US.js";import{E as F}from"./external-link-Poon8Rh5.js";import{S as L}from"./settings-BAaw9YOD.js";import"./menu.context-BrEJJXIC.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-CnlM3g2y.js";import"./index-DvVrmaIy.js";import"./index-D-wbo5Oc.js";import"./index-C6LUVuya.js";import"./index-lUSupRFo.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DLzBYexm.js";import"./index--W5ZaJkm.js";import"./index-BPbCuWFR.js";import"./check-Ce2iVscw.js";import"./createLucideIcon-B4WsWZHQ.js";import"./circle-EX5G5xxd.js";import"./chevron-right-Cncp9OTI.js";function h({cardKey:a,isSelected:r,onSelect:n,isDenied:o,isHidden:d=!1,className:t,children:i,dropdownContent:c,additionalSelectedContent:s,accentColor:u}){const K=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),n())};return e.jsxs("div",{hidden:d,onClick:n,onKeyDown:K,role:"button",tabIndex:0,"aria-pressed":r,className:y("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!r},{"tw-bg-accent":r},{"tw-bg-transparent":!r},t),children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[e.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),r&&c&&e.jsxs(q,{children:[e.jsx(I,{className:y(u&&"tw-me-1"),asChild:!0,children:e.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:e.jsx(O,{})})}),e.jsx(R,{align:"end",children:c})]})]}),r&&s&&e.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:s})]}),u&&e.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${u}`})]},a)}h.__docgenInfo={description:`ResultsCard is a base component for displaying scripture-related results in a card format, even
though it is not based on the Card component. It provides common functionality like selection
state, dropdown menus, and expandable content.`,methods:[],displayName:"ResultsCard",props:{cardKey:{required:!0,tsType:{name:"string"},description:"Unique key for the card"},isSelected:{required:!0,tsType:{name:"boolean"},description:"Whether this card is currently selected/focused"},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback function called when the card is clicked"},isDenied:{required:!1,tsType:{name:"boolean"},description:"Whether the content of this card are in a denied state"},isHidden:{required:!1,tsType:{name:"boolean"},description:"Whether the card should be hidden",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes to apply to the card"},children:{required:!0,tsType:{name:"ReactNode"},description:"Main content to display on the card"},dropdownContent:{required:!1,tsType:{name:"ReactNode"},description:"Content to show in the dropdown menu when selected"},additionalSelectedContent:{required:!1,tsType:{name:"ReactNode"},description:"Additional content to show below the main content when selected"},accentColor:{required:!1,tsType:{name:"string"},description:"Color to use for the card's accent border"}}};const{fn:M}=__STORYBOOK_MODULE_TEST__,je={title:"Basics/ResultsCard",component:h,tags:["autodocs"],parameters:{docs:{description:{component:`
A base component for displaying results in a card format. It provides common functionality like selection state, dropdown menus, and expandable content.

**Features:**
- Selectable state with visual feedback
- Optional dropdown menu when selected
- Expandable additional content when selected
- Responsive design with proper accessibility
        `}}},decorators:[a=>e.jsx(T,{children:e.jsx("div",{className:"tw-max-w-lg tw-p-4",children:e.jsx(a,{})})})]},D=e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsx(_,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View Details"]}),e.jsxs(l,{children:[e.jsx(A,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Copy Reference"]}),e.jsxs(l,{children:[e.jsx(F,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Open in New Tab"]}),e.jsxs(l,{children:[e.jsx(L,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"Settings"]})]}),m={args:{isSelected:!1,onSelect:M(),cardKey:"default-card",children:e.jsxs("div",{className:"tw-space-y-1",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"John 3:16"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."})]})}},w={render:()=>{var d;const a=[{key:"check-card-1",title:"GEN 1:1",badges:["Setup required"],description:"Invalid or unknown character: ("},{key:"check-card-2",title:"GEN 1:1",badges:["Setup required"],description:"Invalid or unknown character: (",defaultSelected:!0},{key:"check-card-3",title:"GEN 1:1",badges:["Denied","Setup required"],description:"There's a place in Scotland called Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch, which has the longest place name in Europe.",isDenied:!0}],r=(d=a.find(t=>t.defaultSelected))==null?void 0:d.key,[n,o]=G.useState(r);return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("p",{className:"tw-mb-4 tw-text-sm tw-text-muted-foreground",children:"Click a card to select it. Only one card can be selected at a time."}),a.map(t=>{const i=n===t.key;return e.jsx(h,{cardKey:t.key,isSelected:i,isDenied:t.isDenied,accentColor:"tw-bg-blue-500",onSelect:()=>o(s=>s===t.key?void 0:t.key),dropdownContent:D,additionalSelectedContent:e.jsx(g,{className:"tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md tw-bg-blue-500",children:"Characters Check"}),children:e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2 tw-overflow-hidden",children:[e.jsx("span",{className:"tw-shrink-0 tw-text-nowrap tw-text-xs tw-font-medium",children:t.title}),t.badges&&t.badges.map(s=>e.jsx(g,{className:"tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md",variant:"secondary",children:s},`${t.key}-${s}`))]}),e.jsx("span",{className:"tw-font-regular tw-overflow-hidden tw-text-ellipsis tw-text-xs tw-text-muted-foreground",children:t.description})]})})})]})},parameters:{docs:{description:{story:"Interactive collection of check cards demonstrating different statuses with single-selection behavior."}}}},p={render:()=>{var d;const a=[{key:"find-card-1",title:"GEN 1:1 God",description:"In the beginning God created the heavens and the earth."},{key:"find-card-2",title:"GEN 1:3 God",description:'And God said, "Let there be light," and there was light.',defaultSelected:!0},{key:"find-card-3",title:"GEN 1:5 God",description:'God called the light "day," and the darkness he called "night." And there was evening and there was morning, the first day.'}],r=(d=a.find(t=>t.defaultSelected))==null?void 0:d.key,[n,o]=G.useState(r);return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("p",{className:"tw-mb-4 tw-text-sm tw-text-muted-foreground",children:"Click a card to select it. Only one card can be selected at a time."}),a.map(t=>{const i=n===t.key;return e.jsx(h,{cardKey:t.key,isSelected:i,onSelect:()=>o(c=>c===t.key?void 0:t.key),dropdownContent:D,additionalSelectedContent:e.jsx("div",{className:"tw-text-xs tw-font-medium tw-text-muted-foreground",children:t.description}),children:e.jsx("div",{className:"tw-text-xs tw-font-medium",children:t.title})})})]})},parameters:{docs:{description:{story:"Interactive collection of check cards demonstrating different statuses with single-selection behavior."}}}};var x,k,C;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    isSelected: false,
    onSelect: fn(),
    cardKey: 'default-card',
    children: <div className="tw-space-y-1">
        <h3 className="tw-text-lg tw-font-semibold">John 3:16</h3>
        <p className="tw-text-sm tw-text-muted-foreground">
          For God so loved the world that he gave his one and only Son, that whoever believes in him
          shall not perish but have eternal life.
        </p>
      </div>
  }
}`,...(C=(k=m.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var v,b,S;w.parameters={...w.parameters,docs:{...(v=w.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
    return <div className="tw-space-y-2">
        <p className="tw-mb-4 tw-text-sm tw-text-muted-foreground">
          Click a card to select it. Only one card can be selected at a time.
        </p>
        {checkCards.map(card => {
        const isSelected = selectedCardKey === card.key;
        const accentColor = 'tw-bg-blue-500';
        return <ResultsCard cardKey={card.key} isSelected={isSelected} isDenied={card.isDenied} accentColor={accentColor} onSelect={() => setSelectedCardKey(current => current === card.key ? undefined : card.key)} dropdownContent={mockDropdownContent} additionalSelectedContent={<Badge className="tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md tw-bg-blue-500">
                  Characters Check
                </Badge>}>
              <div className="tw-flex tw-flex-col tw-gap-2">
                <div className="tw-flex tw-items-center tw-gap-2 tw-overflow-hidden">
                  <span className="tw-shrink-0 tw-text-nowrap tw-text-xs tw-font-medium">
                    {card.title}
                  </span>
                  {card.badges && card.badges.map(badge => <Badge key={\`\${card.key}-\${badge}\`} className="tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md" variant="secondary">
                        {badge}
                      </Badge>)}
                </div>
                <span className="tw-font-regular tw-overflow-hidden tw-text-ellipsis tw-text-xs tw-text-muted-foreground">
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
}`,...(S=(b=w.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var N,j,E;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
    return <div className="tw-space-y-2">
        <p className="tw-mb-4 tw-text-sm tw-text-muted-foreground">
          Click a card to select it. Only one card can be selected at a time.
        </p>
        {findCards.map(card => {
        const isSelected = selectedCardKey === card.key;
        return <ResultsCard cardKey={card.key} isSelected={isSelected} onSelect={() => setSelectedCardKey(current => current === card.key ? undefined : card.key)} dropdownContent={mockDropdownContent} additionalSelectedContent={<div className="tw-text-xs tw-font-medium tw-text-muted-foreground">
                  {card.description}
                </div>}>
              <div className="tw-text-xs tw-font-medium">{card.title}</div>
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
}`,...(E=(j=p.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};const Ee=["Default","CheckCards","FindCards"];export{w as CheckCards,m as Default,p as FindCards,Ee as __namedExportsOrder,je as default};
