import{r as b,j as u}from"./iframe-BPF-R-UD.js";import{i as h}from"./index-CDH2oUpg.js";import{B as j,G as X}from"./book-chapter-control.component-CMaTQhem.js";import{u as bt}from"./recent-searches.component-DfOufVi3.js";import"./preload-helper-CTOgD26E.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./book-item.utils-BssHHbRs.js";import"./command-Nh6xQ24M.js";import"./index-v3JLTwos.js";import"./index-ly9xhPst.js";import"./index-C0w0zQ0t.js";import"./index-CPG7kB0Q.js";import"./index-DmIXZMgv.js";import"./index-Da3yhwMf.js";import"./index-DqaedGcJ.js";import"./index-C6fm6W68.js";import"./index-DHiUvkhL.js";import"./index-BNnIqOyj.js";import"./index-B0GSiVzs.js";import"./utils-BPbySc-g.js";import"./dialog-G-ElPLXV.js";import"./z-index-DiGYIwoM.js";import"./button-Com_UOae.js";import"./index-BnuTq2W6.js";import"./createReactComponent-Chh4Z2k0.js";import"./input-group-CpVuJ3tc.js";import"./input-BV27Psd9.js";import"./IconCheck-DJ0PhXUl.js";import"./focus.util-DRSEP984.js";import"./check-CfKbyv38.js";import"./createLucideIcon-B2E9GWhU.js";import"./button-group-CyaOVFLZ.js";import"./separator-DTyLun9u.js";import"./popover-Dg8Y3TpB.js";import"./portal-container.context-Czj2Rvq-.js";import"./index-CsmJoP63.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-B_BMTrAt.js";import"./tooltip-DSkVSDcT.js";import"./index-BDocIx-A.js";import"./localization.util-C4JImkK1.js";import"./shrink-step.context-D9Sa0WBW.js";import"./toolbar-compound-label.component-DLDdrfw-.js";import"./use-truncation-tooltip.hook-AVYkihHs.js";import"./use-interaction-modality.hook-BaL6h0rt.js";import"./experimental-BSvYSGY7.js";import"./chevron-up-BiMkOaSb.js";import"./chevron-down-rDC0d7s1.js";import"./IconSelector-CLJBKQrP.js";import"./arrow-left-Bh7bSGGF.js";import"./arrow-right-CjGZgW0a.js";import"./dropdown-menu-DL5Fhj8d.js";import"./menu.context-D7tHRtUf.js";import"./IconChevronRight-Dd8_Juqq.js";import"./index-CHheFBfD.js";import"./index-m7pU9qNX.js";const{expect:s,fn:v,screen:$,waitFor:F,within:i}=__STORYBOOK_MODULE_TEST__,kt={GEN:{1:31,2:25,3:24},PSA:{23:6,117:2,119:176,135:21},MAT:{1:25,5:48,15:39},JHN:{3:36},ROM:{8:39,12:21},"1CO":{13:13},REV:{22:21},OBA:{1:21}};function q(o,a){var n;return((n=kt[o])==null?void 0:n[a])??30}function Rt({scrRef:o,handleSubmit:a,...n}){const[r,e]=b.useState(o),t=b.useCallback(l=>{e(l),a(l)},[a]);return u.jsxs("div",{className:"tw:p-4",children:[u.jsx(j,{...n,scrRef:r,handleSubmit:t}),u.jsxs("div",{className:"tw:mt-4 tw:text-sm tw:text-gray-600",children:["Current Reference: ",JSON.stringify(r,void 0,2)]})]})}const d="combobox",y="combobox",w="option";async function m(){const o=$.getByRole("dialog");return await F(()=>s(o).toHaveStyle("opacity: 1")),await s(o).toBeVisible(),o}async function f(){const o=$.queryByRole("dialog");o?await F(()=>s(o).toHaveAttribute("data-state","closed")):await s(o).not.toBeInTheDocument()}function c(){return $.getByRole("dialog")}async function k(o){await F(async()=>{await s(i(c()).getByRole(w,{name:o})).toHaveAttribute("data-selected","true")})}const gt=1;function vt(o){var l;const a=document.createTreeWalker(o,NodeFilter.SHOW_TEXT);let n;for(let p=a.nextNode();p;p=a.nextNode())if((l=p.textContent)!=null&&l.trim()){n=p;break}if(!n)throw new Error(`No digit text node in cell "${o.textContent}"`);const r=document.createRange();r.selectNodeContents(n);const e=r.getBoundingClientRect(),t=o.getBoundingClientRect();return{digit:e,box:t,horizontalOffset:e.left+e.width/2-(t.left+t.width/2)}}async function Z(o,a){const{digit:n,box:r,horizontalOffset:e}=vt(o),t=`${e.toFixed(1)}px`;await s(Math.abs(e),`chapter ${a}: digit center is ${t} from the center of its highlight box`).toBeLessThanOrEqual(gt),await s(n.left>=r.left&&n.right<=r.right,`chapter ${a}: digit falls outside its own highlight box (off center by ${t})`).toBe(!0)}const zn={title:"Advanced/BookChapterControl",component:j,tags:["autodocs"],args:{scrRef:h,handleSubmit:v(o=>console.log("Scripture reference changed:",o)),onOpenChange:v()},render:o=>u.jsx(Rt,{...o})},C={args:{scrRef:h}},B={args:{scrRef:h,disabled:!0}},R={render:o=>{const a=b.useRef(void 0),[n,r]=b.useState(o.scrRef);return u.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:p-4",children:[u.jsx(j,{...o,ref:e=>{a.current=e??void 0},scrRef:n,handleSubmit:r}),u.jsx("button",{type:"button",className:"tw:rounded tw:border tw:px-2 tw:py-1",onClick:()=>{var e;return(e=a.current)==null?void 0:e.open()},children:"Open via handle"})]})},args:{scrRef:h}},T={args:{scrRef:{book:"PSA",chapterNum:135,verseNum:10}}},N={args:{scrRef:h,getActiveBookIds:()=>["GEN","EXO","MAT","JHN","ROM","REV"]},parameters:{docs:{description:{story:"Shows the component with a limited set of available books."}}}},I={args:{scrRef:h,getActiveBookIds:()=>["GEN","EXO","MAT","JHN"],getAdditionalBookIds:()=>["PSA","ROM","REV","TOB"]},parameters:{docs:{description:{story:`The active project has four books; four more are reachable through open resources. The list shows only the project's books until "Show more books" is pressed, after which the reachable books appear greyed — still selectable, with a tooltip and an accessible name explaining why they are greyed.`}}},play:async({canvas:o,userEvent:a,step:n})=>{await n("Open the control",async()=>{await a.click(o.getByRole(d)),await m()}),await n("Only the project's books are listed",async()=>{const r=i(c());await s(r.queryByRole("option",{name:/Romans/})).not.toBeInTheDocument()}),await n("Reveal the books from open resources",async()=>{const r=i(c());await a.click(r.getByRole("button",{name:"Show more books"}));const e=await r.findByRole("option",{name:/Romans/});await s(e).toHaveAccessibleName(/not in this project/),await s(e).not.toHaveAttribute("aria-disabled","true")}),await n("Return to the project's own books",async()=>{const r=i(c());await a.click(r.getByRole("button",{name:"Show project books only"})),await F(()=>s(r.queryByRole("option",{name:/Romans/})).not.toBeInTheDocument())})}},S={args:{scrRef:h,className:"tw:w-64 tw:bg-blue-50 tw:rounded-xl tw:p-4"},parameters:{docs:{description:{story:"Shows the component with custom styling applied to the trigger button."}}}},E={args:{scrRef:h,getActiveBookIds:()=>[]},parameters:{docs:{description:{story:"Shows the component with an empty list of available books."}}}},O={args:{scrRef:{book:"ROM",chapterNum:8,verseNum:1}},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open the book chapter control",async()=>{const e=o.getByRole(d);await s(e).toBeInTheDocument(),await a.click(e)}),await n("Select Romans book",async()=>{const e=await m(),t=i(e).getByText("Romans");await s(t).toBeInTheDocument(),await a.click(t)}),await n("Verify chapter grid is displayed for Romans",async()=>{const e=c(),t=i(e).getByRole(w,{name:"8"});await s(t).toBeInTheDocument()}),await n("Verify the correct number of chapters is shown for Romans",async()=>{const e=c(),t=i(e).getAllByRole(w);await s(t.length).toBe(16)}),await n("Select a different chapter",async()=>{const e=c(),t=i(e).getByRole(w,{name:"12"});await a.click(t)}),await n("Verify the different chapter number is selected",async()=>{await f();const e=o.getByRole(d);await s(e).toHaveTextContent("Romans 12:1"),await s(r.handleSubmit).toHaveBeenCalledWith({book:"ROM",chapterNum:12,verseNum:1})})},parameters:{docs:{description:{story:`
**Chapter Selection Demo** - Interactive test that demonstrates chapter navigation.

This test:
1. Opens the component starting with Romans 8:1
2. Clicks the trigger to open the dropdown
3. Selects the Romans book from the dropdown
4. Verifies the chapter grid is displayed for Romans
5. Confirms all 16 chapters are shown in the grid
6. Selects chapter 12 from the grid
7. Verifies the selection updates to Romans 12:1 and the dropdown closes
        `}}}},z={args:{scrRef:h},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open the component and test smart parsing",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n('Test complete reference parsing: "John 3:16"',async()=>{const e=c(),t=i(e).getByRole(y);await a.clear(t),await a.type(t,"John 3:16");const l=await i(e).findByText("John 3:16");await s(l).toBeInTheDocument(),await a.click(l),await s(r.handleSubmit).toHaveBeenCalledWith({book:"JHN",chapterNum:3,verseNum:16})}),await n('Test book with chapter parsing: "Romans 8"',async()=>{const e=o.getByRole(d);await a.click(e);const t=c(),l=i(t).getByRole(y);await a.clear(l),await a.type(l,"Roma 8");const p=await i(t).findByText("Romans 8:1");await s(p).toBeInTheDocument(),await a.click(p),await s(r.handleSubmit).toHaveBeenCalledWith({book:"ROM",chapterNum:8,verseNum:1})}),await n('Test book ID parsing: "1CO 13:4"',async()=>{const e=o.getByRole(d);await a.click(e);const t=c(),l=i(t).getByRole(y);await a.clear(l),await a.type(l,"1 co 13:4");const p=await i(t).findByText("1 Corinthians 13:4");await s(p).toBeInTheDocument(),await a.click(p),await s(r.handleSubmit).toHaveBeenCalledWith({book:"1CO",chapterNum:13,verseNum:4})})},parameters:{docs:{description:{story:`
**Smart Parsing Demo** - Interactive test that demonstrates intelligent scripture reference parsing.

This test verifies:
1. Opens the component and activates the search input
2. Tests complete reference parsing by typing "John 3:16" and verifying "John 3:16" appears as top match
3. Confirms selection submits correct reference (JHN 3:16)
4. Tests partial book name parsing by typing "Roma 8" and verifying "Romans 8:1" appears as top match
5. Confirms selection submits correct reference (ROM 8:1)
6. Tests book ID parsing by typing "1 co 13:4" and verifying "1 Corinthians 13:4" appears as top match
7. Confirms selection submits correct reference (1CO 13:4)
8. Validates that all selections properly call handleSubmit with the expected SerializedVerseRef objects
        `}}}},x={args:{scrRef:h},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open the component",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Type search query for Psalms",async()=>{const e=c(),t=i(e).getByRole(y);await a.type(t,"Psalms")}),await n("Verify Psalms appears in search results",async()=>{const e=c(),t=await i(e).findByText("Psalms");await s(t).toBeInTheDocument()}),await n("Click Psalms to navigate to chapter view",async()=>{const e=c(),t=i(e).getByText("Psalms");await a.click(t)}),await n("Verify chapter grid shows many chapters for Psalms",async()=>{const e=c(),t=i(e).getAllByRole(w);await s(t.length).toBeGreaterThan(50)}),await n("Select chapter 23",async()=>{const e=c(),t=i(e).getByRole(w,{name:"23"});await a.click(t)}),await n("Verify submission and component closes",async()=>{await s(r.handleSubmit).toHaveBeenCalledWith({book:"PSA",chapterNum:23,verseNum:1}),await f()}),await n("Reopen component for back navigation test",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Search for Romans",async()=>{const e=c(),t=i(e).getByRole(y);await a.type(t,"Ro")}),await n("Click Romans to enter chapter view",async()=>{const e=c(),t=await i(e).findByText("Romans");await a.click(t)}),await n("Click back button to return to book search",async()=>{const e=c(),t=await i(e).findByRole("button");await a.click(t)}),await n("Verify back navigation returns to search mode",async()=>{const e=c(),t=i(e).getByRole(y);await s(t).toBeInTheDocument(),await s(t).toHaveFocus()})},parameters:{docs:{description:{story:`
**Book Search and Navigation** - Tests book search filtering and chapter navigation workflow.

This interactive test demonstrates:
1. Opening the component dropdown
2. Typing a search query to filter books
3. Verifying search results appear correctly
4. Navigating from book search to chapter view
5. Verifying chapter grid displays the correct number of chapters
6. Selecting a specific chapter
7. Confirming the selection submits and component closes
8. Reopening component for navigation testing
9. Searching for another book
10. Entering chapter view for the new book
11. Using back navigation to return to search mode
12. Verifying focus management during navigation
        `}}}},A={args:{scrRef:h},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open component for Obadiah test",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Verify Obadiah appears in book list",async()=>{const e=c(),t=await i(e).findByText("Obadiah");await s(t).toBeInTheDocument()}),await n("Click Obadiah to select immediately",async()=>{const e=c(),t=i(e).getByText("Obadiah");await a.click(t)}),await n("Verify Obadiah submits immediately without chapter grid",async()=>{await s(r.handleSubmit).toHaveBeenCalledWith({book:"OBA",chapterNum:1,verseNum:1}),await f()}),await n("Open component for Odes test",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Search for Odes",async()=>{const e=c(),t=i(e).getByRole(y);await a.clear(t),await a.type(t,"Ode")}),await n("Verify Odes smart parsing result appears",async()=>{const e=c(),t=await i(e).findByText("Odes 1:1");await s(t).toBeInTheDocument()}),await n("Click Odes result to submit",async()=>{const e=c(),t=i(e).getByText("Odes 1:1");await a.click(t)}),await n("Verify Odes submission",async()=>{await s(r.handleSubmit).toHaveBeenCalledWith({book:"ODA",chapterNum:1,verseNum:1}),await f()})},parameters:{docs:{description:{story:`
**Single Chapter Book Demo** - Tests immediate selection behavior for books with only one chapter.

This interactive test demonstrates:
1. Opening the component for testing single-chapter books
2. Verifying single-chapter books appear in the book list
3. Clicking a single-chapter book (Obadiah)
4. Confirming immediate submission without showing chapter grid
5. Reopening component for additional testing
6. Using search to find another single-chapter book (Odes)
7. Verifying smart parsing results for single-chapter books
8. Clicking the smart parsing result
9. Confirming proper submission with correct book ID and chapter/verse
        `}}}},D={args:{scrRef:{book:"MAT",chapterNum:15,verseNum:1}},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open component with Matthew reference",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Verify Matthew appears in book list",async()=>{const e=c(),t=i(e).getByText("Matthew");await s(t).toBeInTheDocument()}),await n("Click Matthew to enter chapter view",async()=>{const e=c(),t=i(e).getByText("Matthew");await a.click(t)}),await n("Verify the grid opens with the current chapter highlighted",async()=>{await k("15")}),await n("Right arrow moves the highlight to the next chapter",async()=>{await a.keyboard("{ArrowRight}"),await k("16")}),await n("Down arrow moves the highlight one full row",async()=>{await a.keyboard("{ArrowDown}"),await k("22")}),await n("Left arrow moves the highlight to the previous chapter",async()=>{await a.keyboard("{ArrowLeft}"),await k("21")}),await n("Up arrow moves the highlight back one full row",async()=>{await a.keyboard("{ArrowUp}"),await k("15")}),await n("Enter submits the highlighted chapter",async()=>{await a.keyboard("{Enter}"),await s(r.handleSubmit).toHaveBeenCalledWith({book:"MAT",chapterNum:15,verseNum:1})}),await n("Verify component closes after Enter key selection",async()=>{await f();const e=o.getByRole(d);await s(e).toBeInTheDocument()})},parameters:{docs:{description:{story:`
**Keyboard Navigation** - Tests keyboard interactions within the chapter grid.

This interactive test demonstrates:
1. Opening the component with a multi-chapter book (Matthew)
2. Verifying the book appears in the dropdown
3. Clicking the book to enter chapter view
4. Confirming the grid opens with the current chapter (15) already highlighted
5. Right arrow moving the highlight to chapter 16
6. Down arrow moving the highlight one full row, to chapter 22
7. Left arrow moving the highlight back to chapter 21
8. Up arrow moving the highlight one full row back, to chapter 15
9. Enter submitting the highlighted chapter
10. Verifying the component closes after keyboard selection

Each arrow step asserts which cell carries the \`data-selected\` highlight, so the grid arithmetic
is actually exercised rather than only checking that the popover stayed open.
        `}}}},V={args:{scrRef:{book:"MAT",chapterNum:15,verseNum:1}},play:async({canvas:o,userEvent:a,step:n})=>{await n("Open the chapter grid for Matthew",async()=>{const e=o.getByRole(d);await a.click(e),await m();const t=c();await a.click(i(t).getByText("Matthew")),await i(t).findByRole(w,{name:"1"})});const r=["1",`${X}`,`${X+1}`,"15","28"];await n("Every sampled chapter digit is centered in its own highlight box",async()=>{const e=c();for(let t=0;t<r.length;t++){const l=r[t],p=i(e).getByRole(w,{name:l});await Z(p,l)}}),await n("Keyboard focus lands on a cell whose digit is aligned the same way",async()=>{await a.keyboard("{ArrowRight}"),await k("16");const e=i(c()).getByRole(w,{name:"16"});await Z(e,"16")})},parameters:{docs:{description:{story:`
**Chapter Highlight Alignment** - Pins the geometry of the chapter grid: each digit's center must
sit within ${gt}px of the center of the cell that highlights it, and the
digit must lie inside that cell.

Guards a defect where \`CommandItem\` laid out a trailing element the grid never shows — an
invisible \`opacity-0\` check icon, 16px wide plus an 8px flex gap — inside a 16px content box.
\`justify-center\` split the overflow, putting every digit 12px left of its own highlight and
outside its left edge, so the highlight read as belonging to the neighboring chapter. Hiding that
child from layout is a single utility class, which is why this needs a test that measures rather
than one that names a class: the class can be dropped, or a new laid-out child added upstream, with
nothing else failing.

It measures rather than asserts a class name because the cause was upstream — a shadcn baseline
re-apply, a script that will run again — so the next regression may arrive by a different route and
still have to be caught here.

The geometry is measured at rest and under keyboard focus. Hover is not measured separately: it
repaints the cell's background rather than laying the cell out again, so the alignment hover reveals
is the resting alignment already asserted here. Keyboard focus is deliberately styled differently
from pointer hover (a ring versus a muted background), so what the two are asserted to agree on is
where the digit sits, not how the cell looks.

Only the chapter grid is measured. The verse grid renders through the same \`NumberedItemGrid\`, so
it shares the layout pinned here rather than being separately asserted.

Runs in Storybook's browser mode. It cannot run under jsdom, which performs no layout and reports
every rect as zero.
        `}}}},M={args:{scrRef:h},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open component for filtering test",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Type partial search term for John books",async()=>{const e=c(),t=i(e).getByRole(y);await a.type(t,"joh")}),await n("Verify multiple John books appear in results",async()=>{const e=c(),t=i(e).getAllByText(/john/i);await s(t.length).toBe(4)}),await n("Continue typing to select specific John book",async()=>{const e=c(),t=i(e).getByRole(y);await a.type(t,"n")}),await n("Click John book to enter chapter view",async()=>{const e=c(),t=i(e).getByText("John");await s(t).toBeInTheDocument(),await a.click(t)}),await n("Test first Escape key press in chapter view",async()=>{await a.keyboard("{Escape}");const e=c();await s(e).toBeVisible()}),await n("Test second Escape key press to close component",async()=>{await a.keyboard("{Escape}"),await f()}),await n("Verify trigger returns to original value",async()=>{const e=o.getByRole(d);await s(e).toHaveTextContent("Genesis 1:1")}),await n("Open component for rapid switching test",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Search for first book (Obadiah)",async()=>{const e=c(),t=i(e).getByRole(y);await a.clear(t),await a.type(t,"obad")}),await n("Click Obadiah smart parsing result",async()=>{const e=c(),t=await i(e).findByText("Obadiah 1:1");await a.click(t)}),await n("Verify first book submission",async()=>{await s(r.handleSubmit).toHaveBeenCalledWith({book:"OBA",chapterNum:1,verseNum:1}),await f()}),await n("Immediately open component for second book",async()=>{const e=o.getByRole(d);await a.click(e),await m()}),await n("Search for second book with specific reference",async()=>{const e=c(),t=i(e).getByRole(y);await a.clear(t),await a.type(t,"Rev 22:21")}),await n("Click Revelation smart parsing result",async()=>{const e=c(),t=await i(e).findByText("Revelation 22:21");await a.click(t)}),await n("Verify second book submission",async()=>{await s(r.handleSubmit).toHaveBeenCalledWith({book:"REV",chapterNum:22,verseNum:21}),await f()})},parameters:{docs:{description:{story:`
**Comprehensive Interaction Test** - Tests complex user workflows and edge cases.

This interactive test demonstrates:
1. Opening the component for filtering tests
2. Typing partial search terms to filter books
3. Verifying multiple matching books appear
4. Continuing to type to refine search results
5. Clicking a book to enter chapter view
6. Testing first Escape key press behavior in chapter view
7. Testing second Escape key press to close component
8. Verifying trigger text resets to original value
9. Reopening component for rapid book switching test
10. Searching for a single-chapter book using smart parsing
11. Clicking the smart parsing result for immediate selection
12. Verifying the first book submission
13. Immediately reopening for rapid switching
14. Searching for a different book with specific chapter and verse
15. Clicking the second smart parsing result
16. Verifying the second book submission and proper state management
        `}}}},ut=new Map([["GEN",{localizedId:"GÉN",localizedName:"Génesis"}],["EXO",{localizedId:"ÉXO",localizedName:"Éxodo"}],["LEV",{localizedId:"LEV",localizedName:"Levítico"}],["NUM",{localizedId:"NÚM",localizedName:"Números"}],["DEU",{localizedId:"DEU",localizedName:"Deuteronomio"}],["JOS",{localizedId:"JOS",localizedName:"Josué"}],["JDG",{localizedId:"JUE",localizedName:"Jueces"}],["RUT",{localizedId:"RUT",localizedName:"Rut"}],["1SA",{localizedId:"1SA",localizedName:"1 Samuel"}],["2SA",{localizedId:"2SA",localizedName:"2 Samuel"}],["1KI",{localizedId:"1RE",localizedName:"1 Reyes"}],["2KI",{localizedId:"2RE",localizedName:"2 Reyes"}],["1CH",{localizedId:"1CR",localizedName:"1 Crónicas"}],["2CH",{localizedId:"2CR",localizedName:"2 Crónicas"}],["EZR",{localizedId:"ESD",localizedName:"Esdras"}],["NEH",{localizedId:"NEH",localizedName:"Nehemías"}],["EST",{localizedId:"EST",localizedName:"Ester"}],["JOB",{localizedId:"JOB",localizedName:"Job"}],["PSA",{localizedId:"SAL",localizedName:"Salmos"}],["PRO",{localizedId:"PRO",localizedName:"Proverbios"}],["ECC",{localizedId:"ECL",localizedName:"Eclesiastés"}],["SNG",{localizedId:"CNT",localizedName:"Cantares"}],["ISA",{localizedId:"ISA",localizedName:"Isaías"}],["JER",{localizedId:"JER",localizedName:"Jeremías"}],["LAM",{localizedId:"LAM",localizedName:"Lamentaciones"}],["EZK",{localizedId:"EZE",localizedName:"Ezequiel"}],["DAN",{localizedId:"DAN",localizedName:"Daniel"}],["HOS",{localizedId:"OSE",localizedName:"Oseas"}],["JOL",{localizedId:"JOE",localizedName:"Joel"}],["AMO",{localizedId:"AMÓ",localizedName:"Amós"}],["OBA",{localizedId:"ABD",localizedName:"Abdías"}],["JON",{localizedId:"JON",localizedName:"Jonás"}],["MIC",{localizedId:"MIQ",localizedName:"Miqueas"}],["NAM",{localizedId:"NAH",localizedName:"Nahúm"}],["HAB",{localizedId:"HAB",localizedName:"Habacuc"}],["ZEP",{localizedId:"SOF",localizedName:"Sofonías"}],["HAG",{localizedId:"HAG",localizedName:"Hageo"}],["ZEC",{localizedId:"ZAC",localizedName:"Zacarías"}],["MAL",{localizedId:"MAL",localizedName:"Malaquías"}],["MAT",{localizedId:"MAT",localizedName:"Mateo"}],["MRK",{localizedId:"MAR",localizedName:"Marcos"}],["LUK",{localizedId:"LUC",localizedName:"Lucas"}],["JHN",{localizedId:"JUA",localizedName:"Juan"}],["ACT",{localizedId:"HEC",localizedName:"Hechos"}],["ROM",{localizedId:"ROM",localizedName:"Romanos"}],["1CO",{localizedId:"1CO",localizedName:"1 Corintios"}],["2CO",{localizedId:"2CO",localizedName:"2 Corintios"}],["GAL",{localizedId:"GÁL",localizedName:"Gálatas"}],["EPH",{localizedId:"EFE",localizedName:"Efesios"}],["PHP",{localizedId:"FIL",localizedName:"Filipenses"}],["COL",{localizedId:"COL",localizedName:"Colosenses"}],["1TH",{localizedId:"1TE",localizedName:"1 Tesalonicenses"}],["2TH",{localizedId:"2TE",localizedName:"2 Tesalonicenses"}],["1TI",{localizedId:"1TI",localizedName:"1 Timoteo"}],["2TI",{localizedId:"2TI",localizedName:"2 Timoteo"}],["TIT",{localizedId:"TIT",localizedName:"Tito"}],["PHM",{localizedId:"FLM",localizedName:"Filemón"}],["HEB",{localizedId:"HEB",localizedName:"Hebreos"}],["JAS",{localizedId:"STG",localizedName:"Santiago"}],["1PE",{localizedId:"1PE",localizedName:"1 Pedro"}],["2PE",{localizedId:"2PE",localizedName:"2 Pedro"}],["1JN",{localizedId:"1JN",localizedName:"1 Juan"}],["2JN",{localizedId:"2JN",localizedName:"2 Juan"}],["3JN",{localizedId:"3JN",localizedName:"3 Juan"}],["JUD",{localizedId:"JUD",localizedName:"Judas"}],["REV",{localizedId:"APO",localizedName:"Apocalipsis"}]]),Ct=new Map([["GEN",{localizedId:"GEN",localizedName:"Genèse"}],["EXO",{localizedId:"EXO",localizedName:"Exode"}],["LEV",{localizedId:"LÉV",localizedName:"Lévitique"}],["NUM",{localizedId:"NOM",localizedName:"Nombres"}],["DEU",{localizedId:"DEU",localizedName:"Deutéronome"}],["MAT",{localizedId:"MAT",localizedName:"Matthieu"}],["MRK",{localizedId:"MAR",localizedName:"Marc"}],["LUK",{localizedId:"LUC",localizedName:"Luc"}],["JHN",{localizedId:"JEA",localizedName:"Jean"}],["ACT",{localizedId:"ACT",localizedName:"Actes"}],["ROM",{localizedId:"ROM",localizedName:"Romains"}],["1CO",{localizedId:"1CO",localizedName:"1 Corinthiens"}],["2CO",{localizedId:"2CO",localizedName:"2 Corinthiens"}],["GAL",{localizedId:"GAL",localizedName:"Galates"}],["EPH",{localizedId:"ÉPH",localizedName:"Éphésiens"}],["PHP",{localizedId:"PHI",localizedName:"Philippiens"}],["REV",{localizedId:"APO",localizedName:"Apocalypse"}]]),P={args:{scrRef:h,handleSubmit:v(),localizedBookNames:ut},parameters:{docs:{description:{story:`
**Localized Book Names (Spanish)** - Demonstrates the BookChapterControl with Spanish localized book names.

This example shows how the component displays localized book names in Spanish alongside the localized book IDs. When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN")
- Proper search functionality with both English and Spanish terms

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents.
        `}}}},H={args:{scrRef:h,handleSubmit:v(),localizedBookNames:Ct},parameters:{docs:{description:{story:`
**Localized Book Names (French)** - Demonstrates the BookChapterControl with French localized book names.

This example shows how the component displays localized book names in French. Features include:
- French book names (e.g., "Matthieu" instead of "Matthew")
- French book IDs where different (e.g., "JEA" for John)
- Seamless integration with search and navigation

Note: This example includes a subset of books to demonstrate the localization feature. In practice, you would provide localized names for all available books.
        `}}}},Bt={"%scripture_section_ot_long%":"Antiguo Testamento","%scripture_section_nt_long%":"Nuevo Testamento","%scripture_section_dc_long%":"Deuterocanónicos","%scripture_section_extra_long%":"Material Extra"},L={args:{scrRef:h,handleSubmit:v(),localizedBookNames:ut,localizedStrings:Bt},parameters:{docs:{description:{story:`
**Localized Section Names** - Demonstrates the BookChapterControl with localized section names.

This example shows how the component displays localized section headers in Spanish. Features include:
- Spanish section names ("Antiguo Testamento" instead of "Old Testament")
- Spanish book names from the previous example
- Proper integration of both types of localization

This demonstrates the full localization capabilities of the component.
        `}}}};function Tt({scrRef:o,handleSubmit:a,...n}){const[r,e]=b.useState(o),[t,l]=b.useState([{book:"GEN",chapterNum:1,verseNum:1},{book:"MAT",chapterNum:5,verseNum:3},{book:"JHN",chapterNum:3,verseNum:16},{book:"ROM",chapterNum:8,verseNum:28}]),p=bt(t,l,(g,K)=>g.book===K.book&&g.chapterNum===K.chapterNum&&g.verseNum===K.verseNum),yt=b.useCallback(g=>{e(g),a(g)},[a]),ft=b.useCallback(g=>{p(g)},[p]);return u.jsxs("div",{className:"tw:p-4",children:[u.jsx(j,{...n,scrRef:r,handleSubmit:yt,recentSearches:t,onAddRecentSearch:ft}),u.jsxs("div",{className:"tw:mt-4 tw:text-sm tw:text-gray-600",children:["Current Reference: ",JSON.stringify(r,void 0,2)]}),u.jsxs("div",{className:"tw:mt-2 tw:text-sm tw:text-gray-500",children:["Recent Searches:"," ",t.map(g=>`${g.book} ${g.chapterNum}:${g.verseNum}`).join(", ")]})]})}const _={args:{scrRef:{book:"REV",chapterNum:22,verseNum:21},getEndVerse:q,disableReferencesUpTo:{book:"MAT",chapterNum:5,verseNum:10}},parameters:{docs:{description:{story:`
**Disabled References** - When \`disableReferencesUpTo\` is provided, any reference that comes
strictly before the given one is shown as disabled: books before MAT, chapters before MAT 5,
and verses before MAT 5:10. Useful for range pickers where the "end" selector should not allow
picking a reference before the "start".
        `}}}},G={args:{scrRef:{book:"JHN",chapterNum:3,verseNum:16},getEndVerse:q},parameters:{docs:{description:{story:`
**Verse Selection** - When the \`getEndVerse\` prop is provided, the control enables verse
selection. After clicking a chapter in the chapter grid, the control transitions to a verse
selection sub-screen instead of submitting immediately. Additionally, typing a reference with a
chapter-verse separator (e.g. "John 3:" or "John 3:16") shows a verse grid below the top match.
        `}}}},J={args:{scrRef:h,getEndVerse:q},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open control and type reference with colon",async()=>{const e=o.getByRole(d);await a.click(e),await m();const t=c(),l=i(t).getByRole(y);await a.type(l,"John 3:")}),await n("Click verse 16 from the verse grid",async()=>{const e=c(),t=await i(e).findByRole(w,{name:"16"});await a.click(t)}),await n("Verify submission with selected verse",async()=>{await s(r.handleSubmit).toHaveBeenCalledWith({book:"JHN",chapterNum:3,verseNum:16}),await f()})},parameters:{docs:{description:{story:'Typing a reference with the chapter-verse separator present (e.g. "John 3:") shows the verse grid so the user can pick a verse.'}}}},U={args:{scrRef:h,getEndVerse:q},play:async({canvas:o,userEvent:a,step:n,args:r})=>{await n("Open control and click Matthew",async()=>{const e=o.getByRole(d);await a.click(e),await m();const t=c(),l=i(t).getByText("Matthew");await a.click(l)}),await n("Click chapter 5 from chapter grid",async()=>{const e=c(),t=await i(e).findByRole(w,{name:"5"});await a.click(t)}),await n("Verify verse grid appears (did not submit yet)",async()=>{await s(r.handleSubmit).not.toHaveBeenCalled();const e=c(),t=await i(e).findByRole(w,{name:"3"});await s(t).toBeInTheDocument()}),await n("Click verse 3 to submit",async()=>{const e=c(),t=i(e).getByRole(w,{name:"3"});await a.click(t)}),await n("Verify submission",async()=>{await s(r.handleSubmit).toHaveBeenCalledWith({book:"MAT",chapterNum:5,verseNum:3}),await f()})},parameters:{docs:{description:{story:"After selecting a chapter from the chapter grid, the control shows a verse grid instead of submitting immediately. The user then picks the verse to finalize the reference."}}}},W={args:{scrRef:h},render:o=>u.jsx(Tt,{...o}),parameters:{docs:{description:{story:"BookChapterControl with recent searches functionality. Click the clock icon in the search input to see recent scripture references."}}}};var Q,Y,ee;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef
  }
}`,...(ee=(Y=C.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};var te,ne,ae;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    disabled: true
  }
}`,...(ae=(ne=B.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var oe,ie,re,se,ce;R.parameters={...R.parameters,docs:{...(oe=R.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: args => {
    const controlRef = useRef<BookChapterControlHandle | undefined>(undefined);
    const [scrRef, setScrRef] = useState<SerializedVerseRef>(args.scrRef);
    return <div className="tw:flex tw:items-center tw:gap-2 tw:p-4">
        <BookChapterControl {...args} ref={handle => {
        controlRef.current = handle ?? undefined;
      }} scrRef={scrRef} handleSubmit={setScrRef} />
        <button type="button" className="tw:rounded tw:border tw:px-2 tw:py-1" onClick={() => controlRef.current?.open()}>
          Open via handle
        </button>
      </div>;
  },
  args: {
    scrRef: defaultScrRef
  }
}`,...(re=(ie=R.parameters)==null?void 0:ie.docs)==null?void 0:re.source},description:{story:"Demonstrates opening the control (with the search input focused) via its imperative handle",...(ce=(se=R.parameters)==null?void 0:se.docs)==null?void 0:ce.description}}};var le,de,he;T.parameters={...T.parameters,docs:{...(le=T.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'PSA',
      chapterNum: 135,
      verseNum: 10
    }
  }
}`,...(he=(de=T.parameters)==null?void 0:de.docs)==null?void 0:he.source}}};var pe,me,we;N.parameters={...N.parameters,docs:{...(pe=N.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    getActiveBookIds: () => ['GEN', 'EXO', 'MAT', 'JHN', 'ROM', 'REV']
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a limited set of available books.'
      }
    }
  }
}`,...(we=(me=N.parameters)==null?void 0:me.docs)==null?void 0:we.source}}};var ge,ue,ye;I.parameters={...I.parameters,docs:{...(ge=I.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    getActiveBookIds: () => ['GEN', 'EXO', 'MAT', 'JHN'],
    // Books the active project lacks but an open resource has. They stay hidden until the user asks
    // for them, then render greyed and selectable rather than disabled.
    getAdditionalBookIds: () => ['PSA', 'ROM', 'REV', 'TOB']
  },
  parameters: {
    docs: {
      description: {
        story: 'The active project has four books; four more are reachable through open resources. ' + 'The list shows only the project\\'s books until "Show more books" is pressed, after ' + 'which the reachable books appear greyed — still selectable, with a tooltip and an ' + 'accessible name explaining why they are greyed.'
      }
    }
  },
  play: async ({
    canvas,
    userEvent,
    step
  }) => {
    await step('Open the control', async () => {
      await userEvent.click(canvas.getByRole(TRIGGER_ROLE));
      await expectPopoverToBeOpenAndVisible();
    });
    await step("Only the project's books are listed", async () => {
      const dropdown = within(getDropdown());
      await expect(dropdown.queryByRole('option', {
        name: /Romans/
      })).not.toBeInTheDocument();
    });
    await step('Reveal the books from open resources', async () => {
      const dropdown = within(getDropdown());
      await userEvent.click(dropdown.getByRole('button', {
        name: 'Show more books'
      }));
      const romans = await dropdown.findByRole('option', {
        name: /Romans/
      });
      await expect(romans).toHaveAccessibleName(/not in this project/);
      // Greyed, but never marked unavailable — the user can still navigate there
      await expect(romans).not.toHaveAttribute('aria-disabled', 'true');
    });
    await step("Return to the project's own books", async () => {
      const dropdown = within(getDropdown());
      await userEvent.click(dropdown.getByRole('button', {
        name: 'Show project books only'
      }));
      await waitFor(() => expect(dropdown.queryByRole('option', {
        name: /Romans/
      })).not.toBeInTheDocument());
    });
  }
}`,...(ye=(ue=I.parameters)==null?void 0:ue.docs)==null?void 0:ye.source}}};var fe,be,ke;S.parameters={...S.parameters,docs:{...(fe=S.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    className: 'tw:w-64 tw:bg-blue-50 tw:rounded-xl tw:p-4'
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with custom styling applied to the trigger button.'
      }
    }
  }
}`,...(ke=(be=S.parameters)==null?void 0:be.docs)==null?void 0:ke.source}}};var Re,ve,Ce;E.parameters={...E.parameters,docs:{...(Re=E.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    getActiveBookIds: () => []
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with an empty list of available books.'
      }
    }
  }
}`,...(Ce=(ve=E.parameters)==null?void 0:ve.docs)==null?void 0:Ce.source}}};var Be,Te,Ne;O.parameters={...O.parameters,docs:{...(Be=O.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'ROM',
      chapterNum: 8,
      verseNum: 1
    }
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open the book chapter control', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await expect(trigger).toBeInTheDocument();
      await userEvent.click(trigger);
    });
    await step('Select Romans book', async () => {
      // Wait for the dropdown to appear
      const dropdownContent = await expectPopoverToBeOpenAndVisible();
      const romansItem = within(dropdownContent).getByText('Romans');
      await expect(romansItem).toBeInTheDocument();
      await userEvent.click(romansItem);
    });
    await step('Verify chapter grid is displayed for Romans', async () => {
      const dropdownContent = getDropdown();

      // Look for chapter 8 button in the dropdown (current chapter)
      const chapter8Button = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, {
        name: '8'
      });
      await expect(chapter8Button).toBeInTheDocument();
    });
    await step('Verify the correct number of chapters is shown for Romans', async () => {
      const dropdownContent = getDropdown();

      // Verify we have multiple chapter buttons (Romans has 16 chapters)
      const allChapterButtons = within(dropdownContent).getAllByRole(CHAPTER_BUTTON_ROLE);
      await expect(allChapterButtons.length).toBe(16);
    });
    await step('Select a different chapter', async () => {
      // Click on chapter 12
      const dropdownContent = getDropdown();
      const chapter12Button = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, {
        name: '12'
      });
      await userEvent.click(chapter12Button);
    });
    await step('Verify the different chapter number is selected', async () => {
      // Verify the popover closes and the trigger shows the new reference
      await expectPopoverToBeClosed();
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await expect(trigger).toHaveTextContent('Romans 12:1');
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ROM',
        chapterNum: 12,
        verseNum: 1
      });
    });
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Chapter Selection Demo** - Interactive test that demonstrates chapter navigation.

This test:
1. Opens the component starting with Romans 8:1
2. Clicks the trigger to open the dropdown
3. Selects the Romans book from the dropdown
4. Verifies the chapter grid is displayed for Romans
5. Confirms all 16 chapters are shown in the grid
6. Selects chapter 12 from the grid
7. Verifies the selection updates to Romans 12:1 and the dropdown closes
        \`
      }
    }
  }
}`,...(Ne=(Te=O.parameters)==null?void 0:Te.docs)==null?void 0:Ne.source}}};var Ie,Se,Ee;z.parameters={...z.parameters,docs:{...(Ie=z.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open the component and test smart parsing', async () => {
      // Click to open the component
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      // Wait for the dropdown to appear
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Test complete reference parsing: "John 3:16"', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);

      // Clear any existing text and type the reference
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'John 3:16');

      // Look for the top match suggestion in the dropdown
      const topMatch = await within(dropdownContent).findByText('John 3:16');
      await expect(topMatch).toBeInTheDocument();

      // Click the top match
      await userEvent.click(topMatch);

      // Verify the handleSubmit was called with correct reference
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'JHN',
        chapterNum: 3,
        verseNum: 16
      });
    });
    await step('Test book with chapter parsing: "Romans 8"', async () => {
      // Reopen the component
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Roma 8');

      // Look for the top match in dropdown
      const topMatch = await within(dropdownContent).findByText('Romans 8:1');
      await expect(topMatch).toBeInTheDocument();

      // Click the top match
      await userEvent.click(topMatch);

      // Verify the handleSubmit was called
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ROM',
        chapterNum: 8,
        verseNum: 1
      });
    });
    await step('Test book ID parsing: "1CO 13:4"', async () => {
      // Reopen the component
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, '1 co 13:4');

      // Look for the top match in dropdown
      const topMatch = await within(dropdownContent).findByText('1 Corinthians 13:4');
      await expect(topMatch).toBeInTheDocument();

      // Click the top match
      await userEvent.click(topMatch);

      // Verify the handleSubmit was called
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: '1CO',
        chapterNum: 13,
        verseNum: 4
      });
    });
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Smart Parsing Demo** - Interactive test that demonstrates intelligent scripture reference parsing.

This test verifies:
1. Opens the component and activates the search input
2. Tests complete reference parsing by typing "John 3:16" and verifying "John 3:16" appears as top match
3. Confirms selection submits correct reference (JHN 3:16)
4. Tests partial book name parsing by typing "Roma 8" and verifying "Romans 8:1" appears as top match
5. Confirms selection submits correct reference (ROM 8:1)
6. Tests book ID parsing by typing "1 co 13:4" and verifying "1 Corinthians 13:4" appears as top match
7. Confirms selection submits correct reference (1CO 13:4)
8. Validates that all selections properly call handleSubmit with the expected SerializedVerseRef objects
        \`
      }
    }
  }
}`,...(Ee=(Se=z.parameters)==null?void 0:Se.docs)==null?void 0:Ee.source}}};var Oe,ze,xe;x.parameters={...x.parameters,docs:{...(Oe=x.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Type search query for Psalms', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Psalms');
    });
    await step('Verify Psalms appears in search results', async () => {
      const dropdownContent = getDropdown();
      const psalmsItem = await within(dropdownContent).findByText('Psalms');
      await expect(psalmsItem).toBeInTheDocument();
    });
    await step('Click Psalms to navigate to chapter view', async () => {
      const dropdownContent = getDropdown();
      const psalmsItem = within(dropdownContent).getByText('Psalms');
      await userEvent.click(psalmsItem);
    });
    await step('Verify chapter grid shows many chapters for Psalms', async () => {
      const dropdownContent = getDropdown();
      const chapterButtons = within(dropdownContent).getAllByRole(CHAPTER_BUTTON_ROLE);
      await expect(chapterButtons.length).toBeGreaterThan(50);
    });
    await step('Select chapter 23', async () => {
      const dropdownContent = getDropdown();
      const chapter23 = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, {
        name: '23'
      });
      await userEvent.click(chapter23);
    });
    await step('Verify submission and component closes', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'PSA',
        chapterNum: 23,
        verseNum: 1
      });
      await expectPopoverToBeClosed();
    });
    await step('Reopen component for back navigation test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Search for Romans', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Ro');
    });
    await step('Click Romans to enter chapter view', async () => {
      const dropdownContent = getDropdown();
      const romansItem = await within(dropdownContent).findByText('Romans');
      await userEvent.click(romansItem);
    });
    await step('Click back button to return to book search', async () => {
      const dropdownContent = getDropdown();
      const backButton = await within(dropdownContent).findByRole('button');
      await userEvent.click(backButton);
    });
    await step('Verify back navigation returns to search mode', async () => {
      const dropdownContent = getDropdown();
      const searchInputAgain = within(dropdownContent).getByRole(INPUT_ROLE);
      await expect(searchInputAgain).toBeInTheDocument();
      await expect(searchInputAgain).toHaveFocus();
    });
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Book Search and Navigation** - Tests book search filtering and chapter navigation workflow.

This interactive test demonstrates:
1. Opening the component dropdown
2. Typing a search query to filter books
3. Verifying search results appear correctly
4. Navigating from book search to chapter view
5. Verifying chapter grid displays the correct number of chapters
6. Selecting a specific chapter
7. Confirming the selection submits and component closes
8. Reopening component for navigation testing
9. Searching for another book
10. Entering chapter view for the new book
11. Using back navigation to return to search mode
12. Verifying focus management during navigation
        \`
      }
    }
  }
}`,...(xe=(ze=x.parameters)==null?void 0:ze.docs)==null?void 0:xe.source}}};var Ae,De,Ve;A.parameters={...A.parameters,docs:{...(Ae=A.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open component for Obadiah test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Verify Obadiah appears in book list', async () => {
      const dropdownContent = getDropdown();
      const obadiahItem = await within(dropdownContent).findByText('Obadiah');
      await expect(obadiahItem).toBeInTheDocument();
    });
    await step('Click Obadiah to select immediately', async () => {
      const dropdownContent = getDropdown();
      const obadiahItem = within(dropdownContent).getByText('Obadiah');
      await userEvent.click(obadiahItem);
    });
    await step('Verify Obadiah submits immediately without chapter grid', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'OBA',
        chapterNum: 1,
        verseNum: 1
      });
      await expectPopoverToBeClosed();
    });
    await step('Open component for Odes test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Search for Odes', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Ode');
    });
    await step('Verify Odes smart parsing result appears', async () => {
      const dropdownContent = getDropdown();
      const odesItem = await within(dropdownContent).findByText('Odes 1:1');
      await expect(odesItem).toBeInTheDocument();
    });
    await step('Click Odes result to submit', async () => {
      const dropdownContent = getDropdown();
      const odesItem = within(dropdownContent).getByText('Odes 1:1');
      await userEvent.click(odesItem);
    });
    await step('Verify Odes submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ODA',
        chapterNum: 1,
        verseNum: 1
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Single Chapter Book Demo** - Tests immediate selection behavior for books with only one chapter.

This interactive test demonstrates:
1. Opening the component for testing single-chapter books
2. Verifying single-chapter books appear in the book list
3. Clicking a single-chapter book (Obadiah)
4. Confirming immediate submission without showing chapter grid
5. Reopening component for additional testing
6. Using search to find another single-chapter book (Odes)
7. Verifying smart parsing results for single-chapter books
8. Clicking the smart parsing result
9. Confirming proper submission with correct book ID and chapter/verse
        \`
      }
    }
  }
}`,...(Ve=(De=A.parameters)==null?void 0:De.docs)==null?void 0:Ve.source}}};var Me,Pe,He;D.parameters={...D.parameters,docs:{...(Me=D.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'MAT',
      chapterNum: 15,
      verseNum: 1
    }
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open component with Matthew reference', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Verify Matthew appears in book list', async () => {
      const dropdownContent = getDropdown();
      const matthewItem = within(dropdownContent).getByText('Matthew');
      await expect(matthewItem).toBeInTheDocument();
    });
    await step('Click Matthew to enter chapter view', async () => {
      const dropdownContent = getDropdown();
      const matthewItem = within(dropdownContent).getByText('Matthew');
      await userEvent.click(matthewItem);
    });
    await step('Verify the grid opens with the current chapter highlighted', async () => {
      await expectChapterHighlighted('15');
    });

    // Matthew has 28 chapters in a 6-column grid, so from 15: right 16, down 22, left 21, up 15.
    await step('Right arrow moves the highlight to the next chapter', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await expectChapterHighlighted('16');
    });
    await step('Down arrow moves the highlight one full row', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await expectChapterHighlighted('22');
    });
    await step('Left arrow moves the highlight to the previous chapter', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await expectChapterHighlighted('21');
    });
    await step('Up arrow moves the highlight back one full row', async () => {
      await userEvent.keyboard('{ArrowUp}');
      await expectChapterHighlighted('15');
    });
    await step('Enter submits the highlighted chapter', async () => {
      await userEvent.keyboard('{Enter}');
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'MAT',
        chapterNum: 15,
        verseNum: 1
      });
    });
    await step('Verify component closes after Enter key selection', async () => {
      await expectPopoverToBeClosed();
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await expect(trigger).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Keyboard Navigation** - Tests keyboard interactions within the chapter grid.

This interactive test demonstrates:
1. Opening the component with a multi-chapter book (Matthew)
2. Verifying the book appears in the dropdown
3. Clicking the book to enter chapter view
4. Confirming the grid opens with the current chapter (15) already highlighted
5. Right arrow moving the highlight to chapter 16
6. Down arrow moving the highlight one full row, to chapter 22
7. Left arrow moving the highlight back to chapter 21
8. Up arrow moving the highlight one full row back, to chapter 15
9. Enter submitting the highlighted chapter
10. Verifying the component closes after keyboard selection

Each arrow step asserts which cell carries the \\\`data-selected\\\` highlight, so the grid arithmetic
is actually exercised rather than only checking that the popover stayed open.
        \`
      }
    }
  }
}`,...(He=(Pe=D.parameters)==null?void 0:Pe.docs)==null?void 0:He.source}}};var Le,_e,Ge;V.parameters={...V.parameters,docs:{...(Le=V.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'MAT',
      chapterNum: 15,
      verseNum: 1
    }
  },
  play: async ({
    canvas,
    userEvent,
    step
  }) => {
    await step('Open the chapter grid for Matthew', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      const dropdownContent = getDropdown();
      await userEvent.click(within(dropdownContent).getByText('Matthew'));
      await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '1'
      });
    });

    // Matthew's 28 chapters cover every grid condition that can move a digit: first column, last
    // column, a row wrap, two-digit labels, and the current chapter (15), which renders with the
    // filled \`bg-primary\` treatment rather than the default one. The column positions are derived
    // from \`GRID_COLUMNS\` so they keep covering what they claim to if the grid is ever rewidened.
    // The popover is a fixed 280px, so there is no width axis to sweep — what varies here is digit
    // width and the cell's position in the grid.
    const SAMPLED_CHAPTERS = ['1',
    // first column, first row
    \`\${GRID_COLUMNS}\`,
    // last column
    \`\${GRID_COLUMNS + 1}\`,
    // first column again, one row down
    '15',
    // two digits, and the current chapter's filled treatment
    '28' // two digits, last chapter in the book
    ];

    // Hover repaints the cell's background; it does not lay the cell out again. So the alignment
    // hover makes visible is the resting alignment measured here, which is also how the defect
    // presents: the digit sits outside a box that only becomes visible under the pointer.
    await step('Every sampled chapter digit is centered in its own highlight box', async () => {
      const dropdownContent = getDropdown();
      for (let i = 0; i < SAMPLED_CHAPTERS.length; i++) {
        const chapter = SAMPLED_CHAPTERS[i];
        const cell = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, {
          name: chapter
        });
        // Sequential on purpose: awaiting these together would report whichever cell settled first
        // rather than the first misaligned one, and each message names the chapter it measured.
        // eslint-disable-next-line no-await-in-loop
        await expectDigitAlignedWithCell(cell, chapter);
      }
    });

    // Keyboard focus is styled differently from pointer hover (a ring rather than a muted
    // background), so what the two are asserted to agree on is where the digit sits, not how the
    // cell looks.
    await step('Keyboard focus lands on a cell whose digit is aligned the same way', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await expectChapterHighlighted('16');
      const focusedCell = within(getDropdown()).getByRole(CHAPTER_BUTTON_ROLE, {
        name: '16'
      });
      await expectDigitAlignedWithCell(focusedCell, '16');
    });
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Chapter Highlight Alignment** - Pins the geometry of the chapter grid: each digit's center must
sit within \${MAX_DIGIT_CENTER_OFFSET_PX}px of the center of the cell that highlights it, and the
digit must lie inside that cell.

Guards a defect where \\\`CommandItem\\\` laid out a trailing element the grid never shows — an
invisible \\\`opacity-0\\\` check icon, 16px wide plus an 8px flex gap — inside a 16px content box.
\\\`justify-center\\\` split the overflow, putting every digit 12px left of its own highlight and
outside its left edge, so the highlight read as belonging to the neighboring chapter. Hiding that
child from layout is a single utility class, which is why this needs a test that measures rather
than one that names a class: the class can be dropped, or a new laid-out child added upstream, with
nothing else failing.

It measures rather than asserts a class name because the cause was upstream — a shadcn baseline
re-apply, a script that will run again — so the next regression may arrive by a different route and
still have to be caught here.

The geometry is measured at rest and under keyboard focus. Hover is not measured separately: it
repaints the cell's background rather than laying the cell out again, so the alignment hover reveals
is the resting alignment already asserted here. Keyboard focus is deliberately styled differently
from pointer hover (a ring versus a muted background), so what the two are asserted to agree on is
where the digit sits, not how the cell looks.

Only the chapter grid is measured. The verse grid renders through the same \\\`NumberedItemGrid\\\`, so
it shares the layout pinned here rather than being separately asserted.

Runs in Storybook's browser mode. It cannot run under jsdom, which performs no layout and reports
every rect as zero.
        \`
      }
    }
  }
}`,...(Ge=(_e=V.parameters)==null?void 0:_e.docs)==null?void 0:Ge.source}}};var Je,Ue,We;M.parameters={...M.parameters,docs:{...(Je=M.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open component for filtering test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Type partial search term for John books', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'joh');
    });
    await step('Verify multiple John books appear in results', async () => {
      const dropdownContent = getDropdown();
      const johnItems = within(dropdownContent).getAllByText(/john/i);
      await expect(johnItems.length).toBe(4);
    });
    await step('Continue typing to select specific John book', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'n');
    });
    await step('Click John book to enter chapter view', async () => {
      const dropdownContent = getDropdown();
      const johnItems = within(dropdownContent).getByText('John');
      await expect(johnItems).toBeInTheDocument();
      await userEvent.click(johnItems);
    });
    await step('Test first Escape key press in chapter view', async () => {
      await userEvent.keyboard('{Escape}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });
    await step('Test second Escape key press to close component', async () => {
      await userEvent.keyboard('{Escape}');
      await expectPopoverToBeClosed();
    });
    await step('Verify trigger returns to original value', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await expect(trigger).toHaveTextContent('Genesis 1:1');
    });
    await step('Open component for rapid switching test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Search for first book (Obadiah)', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'obad');
    });
    await step('Click Obadiah smart parsing result', async () => {
      const dropdownContent = getDropdown();
      const obadiahItem = await within(dropdownContent).findByText('Obadiah 1:1');
      await userEvent.click(obadiahItem);
    });
    await step('Verify first book submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'OBA',
        chapterNum: 1,
        verseNum: 1
      });
      await expectPopoverToBeClosed();
    });
    await step('Immediately open component for second book', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });
    await step('Search for second book with specific reference', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Rev 22:21');
    });
    await step('Click Revelation smart parsing result', async () => {
      const dropdownContent = getDropdown();
      const revMatch = await within(dropdownContent).findByText('Revelation 22:21');
      await userEvent.click(revMatch);
    });
    await step('Verify second book submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'REV',
        chapterNum: 22,
        verseNum: 21
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Comprehensive Interaction Test** - Tests complex user workflows and edge cases.

This interactive test demonstrates:
1. Opening the component for filtering tests
2. Typing partial search terms to filter books
3. Verifying multiple matching books appear
4. Continuing to type to refine search results
5. Clicking a book to enter chapter view
6. Testing first Escape key press behavior in chapter view
7. Testing second Escape key press to close component
8. Verifying trigger text resets to original value
9. Reopening component for rapid book switching test
10. Searching for a single-chapter book using smart parsing
11. Clicking the smart parsing result for immediate selection
12. Verifying the first book submission
13. Immediately reopening for rapid switching
14. Searching for a different book with specific chapter and verse
15. Clicking the second smart parsing result
16. Verifying the second book submission and proper state management
        \`
      }
    }
  }
}`,...(We=(Ue=M.parameters)==null?void 0:Ue.docs)==null?void 0:We.source}}};var je,Fe,qe;P.parameters={...P.parameters,docs:{...(je=P.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn(),
    localizedBookNames: spanishBookNames
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Localized Book Names (Spanish)** - Demonstrates the BookChapterControl with Spanish localized book names.

This example shows how the component displays localized book names in Spanish alongside the localized book IDs. When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN")
- Proper search functionality with both English and Spanish terms

The localization is provided through the \\\`localizedBookNames\\\` prop, which maps English book IDs to their localized equivalents.
        \`
      }
    }
  }
}`,...(qe=(Fe=P.parameters)==null?void 0:Fe.docs)==null?void 0:qe.source}}};var Ke,$e,Xe;H.parameters={...H.parameters,docs:{...(Ke=H.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn(),
    localizedBookNames: frenchBookNames
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Localized Book Names (French)** - Demonstrates the BookChapterControl with French localized book names.

This example shows how the component displays localized book names in French. Features include:
- French book names (e.g., "Matthieu" instead of "Matthew")
- French book IDs where different (e.g., "JEA" for John)
- Seamless integration with search and navigation

Note: This example includes a subset of books to demonstrate the localization feature. In practice, you would provide localized names for all available books.
        \`
      }
    }
  }
}`,...(Xe=($e=H.parameters)==null?void 0:$e.docs)==null?void 0:Xe.source}}};var Ze,Qe,Ye;L.parameters={...L.parameters,docs:{...(Ze=L.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn(),
    localizedBookNames: spanishBookNames,
    localizedStrings: spanishLocalizedStrings
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Localized Section Names** - Demonstrates the BookChapterControl with localized section names.

This example shows how the component displays localized section headers in Spanish. Features include:
- Spanish section names ("Antiguo Testamento" instead of "Old Testament")
- Spanish book names from the previous example
- Proper integration of both types of localization

This demonstrates the full localization capabilities of the component.
        \`
      }
    }
  }
}`,...(Ye=(Qe=L.parameters)==null?void 0:Qe.docs)==null?void 0:Ye.source}}};var et,tt,nt;_.parameters={..._.parameters,docs:{...(et=_.parameters)==null?void 0:et.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'REV',
      chapterNum: 22,
      verseNum: 21
    },
    getEndVerse: sampleGetEndVerse,
    disableReferencesUpTo: {
      book: 'MAT',
      chapterNum: 5,
      verseNum: 10
    }
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Disabled References** - When \\\`disableReferencesUpTo\\\` is provided, any reference that comes
strictly before the given one is shown as disabled: books before MAT, chapters before MAT 5,
and verses before MAT 5:10. Useful for range pickers where the "end" selector should not allow
picking a reference before the "start".
        \`
      }
    }
  }
}`,...(nt=(tt=_.parameters)==null?void 0:tt.docs)==null?void 0:nt.source}}};var at,ot,it;G.parameters={...G.parameters,docs:{...(at=G.parameters)==null?void 0:at.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'JHN',
      chapterNum: 3,
      verseNum: 16
    },
    getEndVerse: sampleGetEndVerse
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Verse Selection** - When the \\\`getEndVerse\\\` prop is provided, the control enables verse
selection. After clicking a chapter in the chapter grid, the control transitions to a verse
selection sub-screen instead of submitting immediately. Additionally, typing a reference with a
chapter-verse separator (e.g. "John 3:" or "John 3:16") shows a verse grid below the top match.
        \`
      }
    }
  }
}`,...(it=(ot=G.parameters)==null?void 0:ot.docs)==null?void 0:it.source}}};var rt,st,ct;J.parameters={...J.parameters,docs:{...(rt=J.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    getEndVerse: sampleGetEndVerse
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open control and type reference with colon', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'John 3:');
    });
    await step('Click verse 16 from the verse grid', async () => {
      const dropdownContent = getDropdown();
      const verse16 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '16'
      });
      await userEvent.click(verse16);
    });
    await step('Verify submission with selected verse', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'JHN',
        chapterNum: 3,
        verseNum: 16
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Typing a reference with the chapter-verse separator present (e.g. "John 3:") shows the verse grid so the user can pick a verse.'
      }
    }
  }
}`,...(ct=(st=J.parameters)==null?void 0:st.docs)==null?void 0:ct.source}}};var lt,dt,ht;U.parameters={...U.parameters,docs:{...(lt=U.parameters)==null?void 0:lt.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    getEndVerse: sampleGetEndVerse
  },
  play: async ({
    canvas,
    userEvent,
    step,
    args
  }) => {
    await step('Open control and click Matthew', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      const dropdownContent = getDropdown();
      const matthewItem = within(dropdownContent).getByText('Matthew');
      await userEvent.click(matthewItem);
    });
    await step('Click chapter 5 from chapter grid', async () => {
      const dropdownContent = getDropdown();
      const chapter5 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '5'
      });
      await userEvent.click(chapter5);
    });
    await step('Verify verse grid appears (did not submit yet)', async () => {
      await expect(args.handleSubmit).not.toHaveBeenCalled();
      const dropdownContent = getDropdown();
      const verse3 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '3'
      });
      await expect(verse3).toBeInTheDocument();
    });
    await step('Click verse 3 to submit', async () => {
      const dropdownContent = getDropdown();
      const verse3 = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, {
        name: '3'
      });
      await userEvent.click(verse3);
    });
    await step('Verify submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'MAT',
        chapterNum: 5,
        verseNum: 3
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'After selecting a chapter from the chapter grid, the control shows a verse grid instead of submitting immediately. The user then picks the verse to finalize the reference.'
      }
    }
  }
}`,...(ht=(dt=U.parameters)==null?void 0:dt.docs)==null?void 0:ht.source}}};var pt,mt,wt;W.parameters={...W.parameters,docs:{...(pt=W.parameters)==null?void 0:pt.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef
  },
  render: args => <BookChapterControlWithRecentSearches {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'BookChapterControl with recent searches functionality. Click the clock icon in the search input to see recent scripture references.'
      }
    }
  }
}`,...(wt=(mt=W.parameters)==null?void 0:mt.docs)==null?void 0:wt.source}}};const xn=["Default","Disabled","ImperativeOpen","WithSpecificBook","WithLimitedBooks","WithBooksFromOpenResources","WithCustomTrigger","EmptyBookList","ChapterSelectionDemo","SmartParsingDemo","BookSearchAndNavigation","SingleChapterBookDemo","KeyboardNavigation","ChapterHighlightAlignment","ComprehensiveInteractionTest","WithLocalizedSpanishBookNames","WithLocalizedFrenchBookNames","WithLocalizedSectionNames","WithDisabledReferences","WithVerseSelection","VerseSelectionByTyping","VerseSelectionFromChapterGrid","WithRecentSearches"];export{x as BookSearchAndNavigation,V as ChapterHighlightAlignment,O as ChapterSelectionDemo,M as ComprehensiveInteractionTest,C as Default,B as Disabled,E as EmptyBookList,R as ImperativeOpen,D as KeyboardNavigation,A as SingleChapterBookDemo,z as SmartParsingDemo,J as VerseSelectionByTyping,U as VerseSelectionFromChapterGrid,I as WithBooksFromOpenResources,S as WithCustomTrigger,_ as WithDisabledReferences,N as WithLimitedBooks,H as WithLocalizedFrenchBookNames,L as WithLocalizedSectionNames,P as WithLocalizedSpanishBookNames,W as WithRecentSearches,T as WithSpecificBook,G as WithVerseSelection,xn as __namedExportsOrder,zn as default};
