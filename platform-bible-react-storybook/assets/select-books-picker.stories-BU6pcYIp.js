import{j as n,r as g}from"./iframe-CQVXH8dP.js";import{c as f}from"./index.es-CXoS8DB2.js";import{S as b}from"./select-books-picker.component-Ca37dmIX.js";import"./preload-helper-CTOgD26E.js";import"./book-item.utils-DEaRKZcF.js";import"./command-B3Gpqozq.js";import"./index-O3c7sd4R.js";import"./index-Dwf8PPqG.js";import"./index-CdEHYLv4.js";import"./index-VBr7ZWxl.js";import"./index-DWoPjAS6.js";import"./index-DRKyJXHj.js";import"./index-BYz028re.js";import"./index-DBqT66sm.js";import"./index-CQi_BkXG.js";import"./index-C_qgP7lI.js";import"./index-D7uulicm.js";import"./utils-BPbySc-g.js";import"./dialog-azvYHE_A.js";import"./z-index-DiGYIwoM.js";import"./button-DkerN_ES.js";import"./index-BnuTq2W6.js";import"./createReactComponent-ByF2l1UW.js";import"./input-group-nB8u8o5P.js";import"./input-CMd6GnJp.js";import"./IconCheck-Dxatj7Ai.js";import"./focus.util-BufU4Tbq.js";import"./use-dismiss-on-window-blur.hook-kAiDhbn0.js";import"./index-CV9Q4DLM.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./check-CZKygLPS.js";import"./createLucideIcon-CnN7Rgpm.js";import"./popover-DDenjLwF.js";import"./portal-container.context-dyUORi5L.js";import"./index-CTjo_m3x.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-JMbmdekh.js";import"./chevrons-up-down-DPI7qCI-.js";const{expect:l,within:v}=__STORYBOOK_MODULE_TEST__,y="1".repeat(f.allBookIds.length),k={"%webView_book_selector_books_selected%":"Books selected","%webView_book_selector_select_books%":"Select books...","%webView_book_selector_search_books%":"Search books...","%webView_book_selector_select_all%":"Select all","%webView_book_selector_clear_all%":"Clear all","%webView_book_selector_no_book_found%":"No book found.","%scripture_section_ot_long%":"Old Testament","%scripture_section_nt_long%":"New Testament","%scripture_section_dc_long%":"Deuterocanonical","%scripture_section_extra_long%":"Extra material"};function _({selectedBookIds:e,onChangeSelectedBookIds:c,...o}){const[r,s]=g.useState(e);return n.jsx("div",{className:"tw:max-w-md tw:p-4",children:n.jsx(b,{...o,selectedBookIds:r,onChangeSelectedBookIds:t=>{s(t),c(t)}})})}const ce={title:"Advanced/Select Books Picker",component:b,tags:["autodocs"],parameters:{docs:{description:{component:'The standalone searchable dropdown (combobox) used by SelectBooks. It offers a trigger button summarizing the selection, a searchable list of available books grouped by section, "Select all" / "Clear all" shortcuts, and shift-click range selection.'}}},args:{availableBookInfo:y,selectedBookIds:["GEN","EXO","MAT"],localizedStrings:k,onChangeSelectedBookIds:e=>console.log("Selected books changed:",e)},render:e=>n.jsx(_,{...e})},a={parameters:{docs:{description:{story:"Open the dropdown to search, select all/clear all, or shift-click to select a range."}}}},i={args:{selectedBookIds:["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","MAT","MRK","LUK","JHN","ACT"]},globals:{viewport:{value:"shortWebView"}},decorators:[e=>n.jsx("div",{className:"tw:flex tw:h-screen tw:w-full tw:flex-col tw:justify-end tw:p-2",children:n.jsx(e,{})})],play:async({canvasElement:e,userEvent:c,step:o})=>{const r=v(e.ownerDocument.body);await o("Open the picker from a trigger pinned to the bottom of a short viewport",async()=>{await c.click(r.getByRole("combobox"))}),await o("The search input stays on screen even though the popover flipped",async()=>{const t=(await r.findByPlaceholderText("Search books...")).getBoundingClientRect().top;await l(t).toBeGreaterThanOrEqual(0)}),await o("The book list absorbs the shortfall by scrolling instead of overflowing",async()=>{const s=await r.findByRole("dialog"),{height:t}=s.getBoundingClientRect();await l(t).toBeLessThanOrEqual(e.ownerDocument.documentElement.clientHeight)})},parameters:{layout:"fullscreen",viewport:{options:{shortWebView:{name:"Short web view",styles:{width:"640px",height:"300px"}}}},docs:{description:{story:"Regression guard for the books picker overrunning a short viewport. The picker sits at the bottom of a short viewport, so opening it flips the popover upward. The play function asserts that the search input stays on screen and that the popover fits within the viewport; before the fix the full-height popover overran the top and clipped the search input away inside a web view."}}}};var p,h,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Open the dropdown to search, select all/clear all, or shift-click to select a range.'
      }
    }
  }
}`,...(d=(h=a.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};var w,m,u;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const le=["Default","ConstrainedHeightFlipsUpward"];export{i as ConstrainedHeightFlipsUpward,a as Default,le as __namedExportsOrder,ce as default};
