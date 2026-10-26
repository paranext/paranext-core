import{j as n,r as g}from"./iframe-Bw6Q8mp3.js";import{c as f}from"./index.es-CXoS8DB2.js";import{S as b}from"./select-books-picker.component-mN4cZFdH.js";import"./preload-helper-CTOgD26E.js";import"./book-item.utils-BLQ0dBj5.js";import"./command-B5BtceDT.js";import"./index-BIYe8wUI.js";import"./index-0-Q_eK08.js";import"./index-TnbcRjPa.js";import"./index-CxjTkcQ3.js";import"./index-ChopNoVk.js";import"./index-BtkK6P2p.js";import"./index-h3ZjU0a0.js";import"./index-CFQ5XYIa.js";import"./index-DicXpkfy.js";import"./index-DkzI_T12.js";import"./index-R3Sg0M3r.js";import"./utils-BPbySc-g.js";import"./dialog-6SRY6o9_.js";import"./z-index-DiGYIwoM.js";import"./button-DnoC34s_.js";import"./index-BnuTq2W6.js";import"./createReactComponent-DbNOOzm3.js";import"./input-group--1rCiz3e.js";import"./input-Ch6shkgE.js";import"./IconCheck-CmZywjU6.js";import"./focus.util-DRSEP984.js";import"./index-w_rW2Gsf.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./check-CGHiCOR6.js";import"./createLucideIcon-B8Gj4A_G.js";import"./popover-DvW1-WqU.js";import"./portal-container.context-B_zU8wN9.js";import"./index-gbfT1IFZ.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-C7549nbM.js";import"./chevrons-up-down-DWX_v1HN.js";const{expect:l,within:v}=__STORYBOOK_MODULE_TEST__,y="1".repeat(f.allBookIds.length),k={"%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%scripture_section_ot_long%":"Old Testament","%scripture_section_nt_long%":"New Testament","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_extra_long%":"Extra material"};function _({selectedBookIds:e,onChangeSelectedBookIds:c,...o}){const[r,s]=g.useState(e);return n.jsx("div",{className:"tw:max-w-md tw:p-4",children:n.jsx(b,{...o,selectedBookIds:r,onChangeSelectedBookIds:t=>{s(t),c(t)}})})}const ie={title:"Advanced/Select Books Picker",component:b,tags:["autodocs"],parameters:{docs:{description:{component:'The standalone searchable dropdown (combobox) used by SelectBooks. It offers a trigger button summarizing the selection, a searchable list of available books grouped by section, "Select all" / "Clear all" shortcuts, and shift-click range selection.'}}},args:{availableBookInfo:y,selectedBookIds:["GEN","EXO","MAT"],localizedStrings:k,onChangeSelectedBookIds:e=>console.log("Selected books changed:",e)},render:e=>n.jsx(_,{...e})},a={parameters:{docs:{description:{story:"Open the dropdown to search, select all/clear all, or shift-click to select a range."}}}},i={args:{selectedBookIds:["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","MAT","MRK","LUK","JHN","ACT"]},globals:{viewport:{value:"shortWebView"}},decorators:[e=>n.jsx("div",{className:"tw:flex tw:h-screen tw:w-full tw:flex-col tw:justify-end tw:p-2",children:n.jsx(e,{})})],play:async({canvasElement:e,userEvent:c,step:o})=>{const r=v(e.ownerDocument.body);await o("Open the picker from a trigger pinned to the bottom of a short viewport",async()=>{await c.click(r.getByRole("combobox"))}),await o("The search input stays on screen even though the popover flipped",async()=>{const t=(await r.findByPlaceholderText("Search books...")).getBoundingClientRect().top;await l(t).toBeGreaterThanOrEqual(0)}),await o("The book list absorbs the shortfall by scrolling instead of overflowing",async()=>{const s=await r.findByRole("dialog"),{height:t}=s.getBoundingClientRect();await l(t).toBeLessThanOrEqual(e.ownerDocument.documentElement.clientHeight)})},parameters:{layout:"fullscreen",viewport:{options:{shortWebView:{name:"Short web view",styles:{width:"640px",height:"300px"}}}},docs:{description:{story:"Regression guard for the books picker overrunning a short viewport. The picker sits at the bottom of a short viewport, so opening it flips the popover upward. The play function asserts that the search input stays on screen and that the popover fits within the viewport; before the fix the full-height popover overran the top and clipped the search input away inside a web view."}}}};var p,h,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Open the dropdown to search, select all/clear all, or shift-click to select a range.'
      }
    }
  }
}`,...(d=(h=a.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};var w,u,m;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    selectedBookIds: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT']
  },
  // The popover portals to \`document.body\`, so Radix measures collisions against the viewport —
  // a short wrapper element around the trigger would not constrain it. Only a short viewport
  // reproduces the web view this bug was reported in, hence the small-screen global plus a
  // full-bleed layout that lets the decorator own the whole of it.
  globals: {
    viewport: {
      value: 'shortWebView'
    }
  },
  decorators: [Story => <div className="tw:flex tw:h-screen tw:w-full tw:flex-col tw:justify-end tw:p-2">
        <Story />
      </div>],
  play: async ({
    canvasElement,
    userEvent,
    step
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await step('Open the picker from a trigger pinned to the bottom of a short viewport', async () => {
      await userEvent.click(body.getByRole('combobox'));
    });
    await step('The search input stays on screen even though the popover flipped', async () => {
      // The regression: at full height the popover overran the top of the viewport and took the
      // search input with it, leaving no way to filter the list.
      const searchInput = await body.findByPlaceholderText('Search books...');
      const inputTop = searchInput.getBoundingClientRect().top;
      await expect(inputTop).toBeGreaterThanOrEqual(0);
    });
    await step('The book list absorbs the shortfall by scrolling instead of overflowing', async () => {
      const popover = await body.findByRole('dialog');
      const {
        height
      } = popover.getBoundingClientRect();
      await expect(height).toBeLessThanOrEqual(canvasElement.ownerDocument.documentElement.clientHeight);
    });
  },
  parameters: {
    layout: 'fullscreen',
    // A web view docked into a short panel — the shape this bug was reported in. Storybook's
    // stock viewports are all phone-portrait or taller, none short enough to reproduce it.
    viewport: {
      options: {
        shortWebView: {
          name: 'Short web view',
          styles: {
            width: '640px',
            height: '300px'
          }
        }
      }
    },
    docs: {
      description: {
        story: 'Regression guard for the books picker overrunning a short viewport. The picker sits at ' + 'the bottom of a short viewport, so opening it flips the popover upward. The play ' + 'function asserts that the search input stays on screen and that the popover fits ' + 'within the viewport; before the fix the full-height popover overran the top and ' + 'clipped the search input away inside a web view.'
      }
    }
  }
}`,...(m=(u=i.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};const ce=["Default","ConstrainedHeightFlipsUpward"];export{i as ConstrainedHeightFlipsUpward,a as Default,ce as __namedExportsOrder,ie as default};
