import{j as u}from"./jsx-runtime-CGqcnyod.js";import{r as S}from"./iframe-BGERtbWY.js";import{D as l}from"./index-5K9QuiCI.js";import{B as de}from"./book-chapter-control.component-DuN7Lyxn.js";import{T as he}from"./theme-provider.component-CeRTxlV2.js";import"./button-BlaLgrh3.js";import"./index-_-Q-9olp.js";import"./index-fuzlvlSd.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index.es-DDLAHxPz.js";import"./index-D3Ne76bK.js";import"./floating-ui.react-dom-Vk0wRTDB.js";import"./index-BsSZ0V7C.js";import"./index-Ca8bhDCW.js";import"./index-BeajvoAs.js";import"./index-C0PMLv4J.js";import"./index-DijZWYtb.js";import"./chevron-right-DZtNoKeO.js";const{expect:a,fn:le,screen:E,waitFor:we,within:r}=__STORYBOOK_MODULE_TEST__;function ge({scrRef:s,handleSubmit:o,...n}){const[c,e]=S.useState(s),t=S.useCallback(d=>{e(d),o(d)},[o]);return u.jsx(he,{children:u.jsxs("div",{className:"tw-p-4",children:[u.jsx(de,{...n,scrRef:c,handleSubmit:t}),u.jsxs("div",{className:"tw-mt-4 tw-text-sm tw-text-gray-600",children:["Current Reference: ",JSON.stringify(c,void 0,2)]})]})})}const p="combobox",w="combobox",m="option";async function h(){const s=E.getByRole("dialog");return await we(()=>a(s).toHaveStyle("opacity: 1")),await a(s).toBeVisible(),s}async function g(){const s=E.queryByRole("dialog");s?await we(()=>a(s).toHaveAttribute("data-state","closed")):a(s).not.toBeInTheDocument()}function i(){return E.getByRole("dialog")}const Ae={title:"Advanced/BookChapterControl",component:de,tags:["autodocs"],args:{scrRef:l,handleSubmit:le(s=>console.log("Scripture reference changed:",s))},render:s=>u.jsx(ge,{...s})},f={args:{scrRef:l}},b={args:{scrRef:{book:"PSA",chapterNum:135,verseNum:10}}},k={args:{scrRef:l,getActiveBookIds:()=>["GEN","EXO","MAT","JHN","ROM","REV"]},parameters:{docs:{description:{story:"Shows the component with a limited set of available books."}}}},C={args:{scrRef:l,className:"tw-w-64 tw-bg-blue-50 tw-rounded-xl tw-p-4"},parameters:{docs:{description:{story:"Shows the component with custom styling applied to the trigger button."}}}},R={args:{scrRef:l,getActiveBookIds:()=>[]},parameters:{docs:{description:{story:"Shows the component with an empty list of available books."}}}},B={args:{scrRef:{book:"ROM",chapterNum:8,verseNum:1}},play:async({canvas:s,userEvent:o,step:n,args:c})=>{await n("Open the book chapter control",async()=>{const e=s.getByRole(p);await a(e).toBeInTheDocument(),await o.click(e)}),await n("Select Romans book",async()=>{const e=await h(),t=r(e).getByText("Romans");await a(t).toBeInTheDocument(),await o.click(t)}),await n("Verify chapter grid is displayed for Romans",async()=>{const e=i(),t=r(e).getByRole(m,{name:"8"});await a(t).toBeInTheDocument()}),await n("Verify the correct number of chapters is shown for Romans",async()=>{const e=i(),t=r(e).getAllByRole(m);await a(t.length).toBe(16)}),await n("Select a different chapter",async()=>{const e=i(),t=r(e).getByRole(m,{name:"12"});await o.click(t)}),await n("Verify the different chapter number is selected",async()=>{await g();const e=s.getByRole(p);await a(e).toHaveTextContent("Romans 12:1"),await a(c.handleSubmit).toHaveBeenCalledWith({book:"ROM",chapterNum:12,verseNum:1})})},parameters:{docs:{description:{story:`
**Chapter Selection Demo** - Interactive test that demonstrates chapter navigation.

This test:
1. Opens the component starting with Romans 8:1
2. Clicks the trigger to open the dropdown
3. Selects the Romans book from the dropdown
4. Verifies the chapter grid is displayed for Romans
5. Confirms all 16 chapters are shown in the grid
6. Selects chapter 12 from the grid
7. Verifies the selection updates to Romans 12:1 and the dropdown closes
        `}}}},T={args:{scrRef:l},play:async({canvas:s,userEvent:o,step:n,args:c})=>{await n("Open the component and test smart parsing",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n('Test complete reference parsing: "John 3:16"',async()=>{const e=i(),t=r(e).getByRole(w);await o.clear(t),await o.type(t,"John 3:16");const d=await r(e).findByText("JHN 3:16");await a(d).toBeInTheDocument(),await o.click(d),await a(c.handleSubmit).toHaveBeenCalledWith({book:"JHN",chapterNum:3,verseNum:16})}),await n('Test book with chapter parsing: "Romans 8"',async()=>{const e=s.getByRole(p);await o.click(e);const t=i(),d=r(t).getByRole(w);await o.clear(d),await o.type(d,"Roma 8");const y=await r(t).findByText("ROM 8:1");await a(y).toBeInTheDocument(),await o.click(y),await a(c.handleSubmit).toHaveBeenCalledWith({book:"ROM",chapterNum:8,verseNum:1})}),await n('Test book ID parsing: "1CO 13:4"',async()=>{const e=s.getByRole(p);await o.click(e);const t=i(),d=r(t).getByRole(w);await o.clear(d),await o.type(d,"1 co 13:4");const y=await r(t).findByText("1CO 13:4");await a(y).toBeInTheDocument(),await o.click(y),await a(c.handleSubmit).toHaveBeenCalledWith({book:"1CO",chapterNum:13,verseNum:4})})},parameters:{docs:{description:{story:`
**Smart Parsing Demo** - Interactive test that demonstrates intelligent scripture reference parsing.

This test verifies:
1. Opens the component and activates the search input
2. Tests complete reference parsing by typing "John 3:16" and verifying "JHN 3:16" appears as top match
3. Confirms selection submits correct reference (JHN 3:16)
4. Tests partial book name parsing by typing "Roma 8" and verifying "ROM 8:1" appears as top match
5. Confirms selection submits correct reference (ROM 8:1)
6. Tests book ID parsing by typing "1 co 13:4" and verifying "1CO 13:4" appears as top match
7. Confirms selection submits correct reference (1CO 13:4)
8. Validates that all selections properly call handleSubmit with the expected SerializedVerseRef objects
        `}}}},v={args:{scrRef:l},play:async({canvas:s,userEvent:o,step:n,args:c})=>{await n("Open the component",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n("Type search query for Psalms",async()=>{const e=i(),t=r(e).getByRole(w);await o.type(t,"Psalms")}),await n("Verify Psalms appears in search results",async()=>{const e=i(),t=await r(e).findByText("Psalms");await a(t).toBeInTheDocument()}),await n("Click Psalms to navigate to chapter view",async()=>{const e=i(),t=r(e).getByText("Psalms");await o.click(t)}),await n("Verify chapter grid shows many chapters for Psalms",async()=>{const e=i(),t=r(e).getAllByRole(m);await a(t.length).toBeGreaterThan(50)}),await n("Select chapter 23",async()=>{const e=i(),t=r(e).getByRole(m,{name:"23"});await o.click(t)}),await n("Verify submission and component closes",async()=>{await a(c.handleSubmit).toHaveBeenCalledWith({book:"PSA",chapterNum:23,verseNum:1}),await g()}),await n("Reopen component for back navigation test",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n("Search for Romans",async()=>{const e=i(),t=r(e).getByRole(w);await o.type(t,"Ro")}),await n("Click Romans to enter chapter view",async()=>{const e=i(),t=await r(e).findByText("Romans");await o.click(t)}),await n("Click back button to return to book search",async()=>{const e=i(),t=await r(e).findByRole("button");await o.click(t)}),await n("Verify back navigation returns to search mode",async()=>{const e=i(),t=r(e).getByRole(w);await a(t).toBeInTheDocument(),await a(t).toHaveFocus()})},parameters:{docs:{description:{story:`
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
        `}}}},I={args:{scrRef:l},play:async({canvas:s,userEvent:o,step:n,args:c})=>{await n("Open component for Obadiah test",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n("Verify Obadiah appears in book list",async()=>{const e=i(),t=await r(e).findByText("Obadiah");await a(t).toBeInTheDocument()}),await n("Click Obadiah to select immediately",async()=>{const e=i(),t=r(e).getByText("Obadiah");await o.click(t)}),await n("Verify Obadiah submits immediately without chapter grid",async()=>{await a(c.handleSubmit).toHaveBeenCalledWith({book:"OBA",chapterNum:1,verseNum:1}),await g()}),await n("Open component for Odes test",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n("Search for Odes",async()=>{const e=i(),t=r(e).getByRole(w);await o.clear(t),await o.type(t,"Ode")}),await n("Verify Odes smart parsing result appears",async()=>{const e=i(),t=await r(e).findByText("ODA 1:1");await a(t).toBeInTheDocument()}),await n("Click Odes result to submit",async()=>{const e=i(),t=r(e).getByText("ODA 1:1");await o.click(t)}),await n("Verify Odes submission",async()=>{await a(c.handleSubmit).toHaveBeenCalledWith({book:"ODA",chapterNum:1,verseNum:1}),await g()})},parameters:{docs:{description:{story:`
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
        `}}}},O={args:{scrRef:{book:"MAT",chapterNum:15,verseNum:1}},play:async({canvas:s,userEvent:o,step:n})=>{await n("Open component with Matthew reference",async()=>{const c=s.getByRole(p);await o.click(c),await h()}),await n("Verify Matthew appears in book list",async()=>{const c=i(),e=r(c).getByText("Matthew");await a(e).toBeInTheDocument()}),await n("Click Matthew to enter chapter view",async()=>{const c=i(),e=r(c).getByText("Matthew");await o.click(e)}),await n("Verify chapter 15 button exists in chapter grid",async()=>{const c=i(),e=await r(c).findByRole(m,{name:"15"});await a(e).toBeInTheDocument()}),await n("Test right arrow key navigation",async()=>{await o.keyboard("{ArrowRight}");const c=i();await a(c).toBeVisible()}),await n("Test down arrow key navigation",async()=>{await o.keyboard("{ArrowDown}");const c=i();await a(c).toBeVisible()}),await n("Test left arrow key navigation",async()=>{await o.keyboard("{ArrowLeft}");const c=i();await a(c).toBeVisible()}),await n("Test up arrow key navigation",async()=>{await o.keyboard("{ArrowUp}");const c=i();await a(c).toBeVisible()}),await n("Test Enter key to select focused chapter",async()=>{await o.keyboard("{Enter}")}),await n("Verify component closes after Enter key selection",async()=>{await g();const c=s.getByRole(p);await a(c).toBeInTheDocument()})},parameters:{docs:{description:{story:`
**Keyboard Navigation** - Tests keyboard interactions within the chapter grid.

This interactive test demonstrates:
1. Opening the component with a multi-chapter book (Matthew)
2. Verifying the book appears in the dropdown
3. Clicking the book to enter chapter view
4. Confirming the current chapter button exists in the grid
5. Testing right arrow key navigation
6. Testing down arrow key navigation
7. Testing left arrow key navigation
8. Testing up arrow key navigation
9. Using Enter key to select the focused chapter
10. Verifying the component closes after keyboard selection
        `}}}},x={args:{scrRef:l},play:async({canvas:s,userEvent:o,step:n,args:c})=>{await n("Open component for filtering test",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n("Type partial search term for John books",async()=>{const e=i(),t=r(e).getByRole(w);await o.type(t,"joh")}),await n("Verify multiple John books appear in results",async()=>{const e=i(),t=r(e).getAllByText(/john/i);await a(t.length).toBe(4)}),await n("Continue typing to select specific John book",async()=>{const e=i(),t=r(e).getByRole(w);await o.type(t,"n")}),await n("Click John book to enter chapter view",async()=>{const e=i(),t=r(e).getByText("John");await a(t).toBeInTheDocument(),await o.click(t)}),await n("Test first Escape key press in chapter view",async()=>{await o.keyboard("{Escape}");const e=i();a(e).toBeVisible()}),await n("Test second Escape key press to close component",async()=>{await o.keyboard("{Escape}"),await g()}),await n("Verify trigger returns to original value",async()=>{const e=s.getByRole(p);await a(e).toHaveTextContent("Genesis 1:1")}),await n("Open component for rapid switching test",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n("Search for first book (Obadiah)",async()=>{const e=i(),t=r(e).getByRole(w);await o.clear(t),await o.type(t,"obad")}),await n("Click Obadiah smart parsing result",async()=>{const e=i(),t=await r(e).findByText("OBA 1:1");await o.click(t)}),await n("Verify first book submission",async()=>{await a(c.handleSubmit).toHaveBeenCalledWith({book:"OBA",chapterNum:1,verseNum:1}),await g()}),await n("Immediately open component for second book",async()=>{const e=s.getByRole(p);await o.click(e),await h()}),await n("Search for second book with specific reference",async()=>{const e=i(),t=r(e).getByRole(w);await o.clear(t),await o.type(t,"Rev 22:21")}),await n("Click Revelation smart parsing result",async()=>{const e=i(),t=await r(e).findByText("REV 22:21");await o.click(t)}),await n("Verify second book submission",async()=>{await a(c.handleSubmit).toHaveBeenCalledWith({book:"REV",chapterNum:22,verseNum:21}),await g()})},parameters:{docs:{description:{story:`
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
        `}}}};var V,D,N;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef
  }
}`,...(N=(D=f.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var A,P,_;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'PSA',
      chapterNum: 135,
      verseNum: 10
    }
  }
}`,...(_=(P=b.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var L,M,H;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(H=(M=k.parameters)==null?void 0:M.docs)==null?void 0:H.source}}};var G,U,W;C.parameters={...C.parameters,docs:{...(G=C.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    scrRef: defaultScrRef,
    className: 'tw-w-64 tw-bg-blue-50 tw-rounded-xl tw-p-4'
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with custom styling applied to the trigger button.'
      }
    }
  }
}`,...(W=(U=C.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var J,j,q;R.parameters={...R.parameters,docs:{...(J=R.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(q=(j=R.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var K,F,z;B.parameters={...B.parameters,docs:{...(K=B.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(z=(F=B.parameters)==null?void 0:F.docs)==null?void 0:z.source}}};var X,Y,Q;T.parameters={...T.parameters,docs:{...(X=T.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
      const topMatch = await within(dropdownContent).findByText('JHN 3:16');
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
      const topMatch = await within(dropdownContent).findByText('ROM 8:1');
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
      const topMatch = await within(dropdownContent).findByText('1CO 13:4');
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
2. Tests complete reference parsing by typing "John 3:16" and verifying "JHN 3:16" appears as top match
3. Confirms selection submits correct reference (JHN 3:16)
4. Tests partial book name parsing by typing "Roma 8" and verifying "ROM 8:1" appears as top match
5. Confirms selection submits correct reference (ROM 8:1)
6. Tests book ID parsing by typing "1 co 13:4" and verifying "1CO 13:4" appears as top match
7. Confirms selection submits correct reference (1CO 13:4)
8. Validates that all selections properly call handleSubmit with the expected SerializedVerseRef objects
        \`
      }
    }
  }
}`,...(Q=(Y=T.parameters)==null?void 0:Y.docs)==null?void 0:Q.source}}};var Z,$,ee;v.parameters={...v.parameters,docs:{...(Z=v.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(ee=($=v.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var te,ne,oe;I.parameters={...I.parameters,docs:{...(te=I.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
      const odesItem = await within(dropdownContent).findByText('ODA 1:1');
      await expect(odesItem).toBeInTheDocument();
    });
    await step('Click Odes result to submit', async () => {
      const dropdownContent = getDropdown();
      const odesItem = within(dropdownContent).getByText('ODA 1:1');
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
}`,...(oe=(ne=I.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var ae,ie,re;O.parameters={...O.parameters,docs:{...(ae=O.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
    await step('Verify chapter 15 button exists in chapter grid', async () => {
      const dropdownContent = getDropdown();
      const chapter15 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '15'
      });
      await expect(chapter15).toBeInTheDocument();
    });
    await step('Test right arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowRight}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });
    await step('Test down arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowDown}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });
    await step('Test left arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });
    await step('Test up arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowUp}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });
    await step('Test Enter key to select focused chapter', async () => {
      await userEvent.keyboard('{Enter}');
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
4. Confirming the current chapter button exists in the grid
5. Testing right arrow key navigation
6. Testing down arrow key navigation
7. Testing left arrow key navigation
8. Testing up arrow key navigation
9. Using Enter key to select the focused chapter
10. Verifying the component closes after keyboard selection
        \`
      }
    }
  }
}`,...(re=(ie=O.parameters)==null?void 0:ie.docs)==null?void 0:re.source}}};var se,ce,pe;x.parameters={...x.parameters,docs:{...(se=x.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
      expect(dropdownContent).toBeVisible();
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
      const obadiahItem = await within(dropdownContent).findByText('OBA 1:1');
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
      const revMatch = await within(dropdownContent).findByText('REV 22:21');
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
}`,...(pe=(ce=x.parameters)==null?void 0:ce.docs)==null?void 0:pe.source}}};const Pe=["Default","WithSpecificBook","WithLimitedBooks","WithCustomTrigger","EmptyBookList","ChapterSelectionDemo","SmartParsingDemo","BookSearchAndNavigation","SingleChapterBookDemo","KeyboardNavigation","ComprehensiveInteractionTest"];export{v as BookSearchAndNavigation,B as ChapterSelectionDemo,x as ComprehensiveInteractionTest,f as Default,R as EmptyBookList,O as KeyboardNavigation,I as SingleChapterBookDemo,T as SmartParsingDemo,C as WithCustomTrigger,k as WithLimitedBooks,b as WithSpecificBook,Pe as __namedExportsOrder,Ae as default};
