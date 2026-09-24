/**
 * The editor right-click menu offers the same inserts as the Insert top-menu (footnote,
 * cross-reference, endnote, comment — in that order), and inserting an endnote creates a real `\fe`
 * note (caller `+`, PT9 shape) that survives the PDP save/USFM echo round-trip.
 *
 * The context menu is the Lexical ContextMenuPlugin portal INSIDE the editor iframe (the
 * `.typeahead-popover.auto-embed-menu` portal, with `li[role="option"]` items), not the app's Radix
 * PAPI menu. The plugin nests a second `.typeahead-popover` inside that portal, so the outer
 * `auto-embed-menu` class is what makes the locator unambiguous.
 *
 * The menu's CONTENTS are asserted here, and so is selecting an item BY KEYBOARD — arrow keys to
 * the item, then Enter. That path needs the real app: the menu claims Enter from a capture-phase
 * listener on the editor iframe's `document`, while this web view claims it from one on `window`,
 * and only the real two-listener stack shows which of them the press reaches. The same stack is
 * what decides the open menu's other keyboard claims — Enter with nothing highlighted, and the
 * marker palette's backslash — which is why those are asserted here rather than in a unit test.
 *
 * The item is also asserted BY MOUSE: with scripture-editors#14, `ContextMenuPlugin` keys each item
 * by its index and title (not a counter that increments on every rebuild), so an options rebuild
 * with unchanged content keeps the same `<li>` elements and a mouse click no longer risks the item
 * detaching mid-click. The keyboard and mouse paths exercise different code inside the plugin
 * (arrow/Enter vs. a pointer event), so both are asserted. The final insert is additionally driven
 * from the visible Insert top menu, exercising the `menus.json` wiring a unit test cannot reach.
 *
 * Two constraints shape the step order below.
 *
 * 1. Every insert has to put the caret in a VERSE paragraph, because that is what an endnote is for:
 *    `\fe` anchors at the caret's reference, and the paragraphs above `\c 1` — the `\id` line,
 *    `\h`, `\toc*`, `\mt*` — are not verses. The chapter's FIRST paragraph is the `\id` line, so
 *    reaching a verse takes a locator that says so.
 * 2. Inserting a note auto-opens the footnote editor over that paragraph, and that popover is a
 *    CONTROLLED Radix `Popover` with no `onOpenChange` (see `showFootnoteEditor` in the web view),
 *    so neither Escape nor a click outside dismisses it. Its own buttons close it, and so does a
 *    chapter change — which is why the chapter round trip runs BETWEEN the two inserts rather than
 *    after both: it is what clears the popover off the second insert's paragraph.
 *
 * Later steps widen the coverage of the menu's keyboard ownership and its own layout:
 *
 * - A one-shot read of `[data-overlay-command-palette]` right after a keypress cannot see a palette
 *   that is still crossing the async `papi.overlays.showCommandPalette` round trip, so the
 *   no-stray-palette checks install a `MutationObserver` instead. In the arrow-keys/insert step
 *   below, it is read back after the note-count wait — a barrier guaranteed to be on the far side
 *   of that round trip. The "nothing highlighted" step has no such barrier before its own read;
 *   what actually guards THAT step is the Escape check just after it, since a palette that had
 *   stolen the Escape would leave the menu detached with nothing left to reattach it.
 * - The insert shortcuts (Ctrl+T, Ctrl+Shift+T) and the comment hotkey are pressed WHILE the menu is
 *   open and must be inert, proven by note counts taken immediately before them and re-checked both
 *   right after and after the chapter round trip (an async insert that slipped through would still
 *   be racing the PDP at the first check). With scripture-editors#14, the menu's own
 *   document-capture listener claims every key before it can reach these keys' HOST-side guards
 *   (`platform-scripture-editor.web-view.tsx`'s Ctrl+T/Ctrl+Shift+T and comment-hotkey checks), so
 *   this proves the menu's own blanket claim, not those host guards — which stand ready here only
 *   as an unexercised fallback for an editor package that doesn't claim every key itself.
 * - Cycling the SAME editor to Formatted view proves the menu's blanket key-claim holds outside
 *   Standard view too: the same document-capture listener claims `\` before it can ever reach the
 *   host's own Formatted-view guard (`isEditorContextMenuOpen` inside `handleKeyDown`), so this is
 *   another case of the menu itself being under test — with a positive control (the same key with
 *   the menu closed) showing the check is falsifiable — and the host's own guard again exercised
 *   only as an unexercised fallback.
 * - A real window resize (never `page.setViewportSize()` — see `setWindowHeight`) forces the menu's
 *   list past its natural height, proving the scrollbar declared in the step above is not just
 *   declared but load-bearing: the list actually caps, actually scrolls, and stays open while doing
 *   so.
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 * Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { setWindowHeight, sleep } from '../../../fixtures/helpers';
import {
  EDITOR_HAMBURGER_SELECTOR,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  sendPapiCommandWhenRegistered,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/**
 * Budget for the double-rAF settle wait below, mirroring `WINDOW_WIDTH_RAF_SETTLE_TIMEOUT_MS` in
 * `helpers.ts`: Chromium's `backgroundThrottling` stops `requestAnimationFrame` entirely for a
 * hidden or occluded window, and `page.evaluate` (here, `Locator.evaluate`) carries no timeout of
 * its own, so this wait needs its own bound rather than relying on the test's overall timeout to
 * end it.
 */
const RAF_SETTLE_TIMEOUT_MS = 2_000;

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor endnote insert + context-menu parity', () => {
  test('right-click menu mirrors the Insert menu and inserts a \\fe endnote', async ({
    mainPage,
    electronApp,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    // Scoped by view-agnostic markup (not `.editor-input.marker-editable`, which only matches
    // Standard view) so it stays valid once a later step cycles the view to Formatted.
    const editorContainer = editorFrame.locator('.editor-container');
    await editorContainer.waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:2');

    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    const contextMenu = editorFrame.locator('.typeahead-popover.auto-embed-menu');

    // Scoped to the FIRST editor input, not the whole iframe and not every `.editor-input`: the
    // footnote editor auto-opens on insert, carries an `.editor-input.marker-editable` of its own
    // (see marker-palette-trigger-focus.spec.ts), and renders the note being edited — so a wider
    // locator counts one inserted note twice.
    const mainEditor = editorInput.first();
    const endnotes = mainEditor.locator('span.note.usfm_fe');
    /** The endnotes that landed where an endnote belongs — inside a body paragraph. */
    const endnotesInVerseParas = mainEditor.locator('p.usfm_p span.note.usfm_fe');

    /**
     * A body paragraph that holds a verse and no note yet. Inserting into one takes it out of this
     * set, so each call lands in a paragraph that is still clear — which is what keeps a click at
     * the paragraph's centre off a note caller, where it would open that note's editor instead of
     * moving the caret.
     */
    const nextClearVersePara = () =>
      mainEditor.locator('p.usfm_p:has(span.verse):not(:has(span.note))').first();

    /**
     * Same idea as {@link nextClearVersePara}, scoped to {@link editorContainer} instead of
     * {@link mainEditor}: the later Formatted-view and overflow steps run after a view switch that
     * drops the `.marker-editable` class `mainEditor` depends on, but `.editor-container` is stable
     * across every view.
     */
    const nextClearVersePicker = () =>
      editorContainer.locator('p.usfm_p:has(span.verse):not(:has(span.note))').first();

    /**
     * Watches `document` in the MAIN page for the command palette overlay ever appearing, from
     * install through whatever barrier the caller checks it after. A one-shot `.count()` read taken
     * right after a keypress cannot see a palette that is still crossing the cross-process
     * `papi.overlays.showCommandPalette` round trip — this catches it even if it opens and is gone
     * again before the caller gets a chance to look.
     *
     * @returns A check that disconnects the observer and asserts the palette was never seen.
     */
    const watchForStrayCommandPalette = async (): Promise<() => Promise<void>> => {
      await mainPage.evaluate(() => {
        // Stashed on `window` so the disconnect-and-check call below can find the same observer and
        // flag; neither is part of the standard DOM typings.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const w = window as unknown as {
          strayPaletteObserver?: MutationObserver;
          strayPaletteSeen?: boolean;
        };
        const markIfPresent = () => {
          if (document.querySelector('[data-overlay-command-palette]')) w.strayPaletteSeen = true;
        };
        w.strayPaletteSeen = false;
        markIfPresent();
        const observer = new MutationObserver(markIfPresent);
        observer.observe(document, { childList: true, subtree: true });
        w.strayPaletteObserver = observer;
      });

      return async () => {
        const seen = await mainPage.evaluate(() => {
          // See the install call above for why this cast is needed.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const w = window as unknown as {
            strayPaletteObserver?: MutationObserver;
            strayPaletteSeen?: boolean;
          };
          w.strayPaletteObserver?.disconnect();
          w.strayPaletteObserver = undefined;
          const result = w.strayPaletteSeen;
          w.strayPaletteSeen = undefined;
          return result;
        });
        expect(seen).toBe(false);
      };
    };

    // Baselines for the insert-shortcut inertness checks, set immediately before the shortcuts are
    // pressed (in the arrow-keys step) and re-checked both right after and after the chapter
    // round-trip step, since an insert that slipped through the guard is itself async (it awaits a
    // version-history snapshot) and could still be in flight at the first check.
    let footnoteCountBeforeGuardedShortcuts = 0;
    let crossReferenceCountBeforeGuardedShortcuts = 0;

    /**
     * Natural (uncapped) height of the menu's option list, measured while it fits at full window
     * size.
     */
    let menuNaturalScrollHeightPx = 0;

    // ContextMenuPlugin suppresses the menu when the right-click target IS the content-editable
    // root, so aim at a paragraph inside it. The right-click also moves the caret there, which is
    // what puts the keyboard-driven insert below inside a verse.
    // Closed first, and the close awaited, for two reasons. An already-open menu makes the
    // `toBeAttached` below pass without the right-click having reached `handleContextMenu` at all,
    // and the open menu is a `position: fixed` portal clamped into the viewport, so it can cover
    // the very point being right-clicked — Playwright's hit-target check then resolves to the menu
    // and the click never becomes actionable. Escape is what the plugin closes on; it reaches the
    // plugin's `document` listener because focus is inside the editor iframe.
    const openContextMenu = async (target = nextClearVersePara()) => {
      if (await contextMenu.count()) {
        await mainPage.keyboard.press('Escape');
        await expect(contextMenu).not.toBeAttached({ timeout: 15_000 });
      }
      await target.click({ button: 'right' });
      await expect(contextMenu).toBeAttached({ timeout: 15_000 });
    };
    // Every option's text, in menu order — the built-in Cut/Copy/Paste entries first, then the
    // host's insert items. Captured once and used by the steps below.
    let optionTexts: string[] = [];
    // Endnote count the chapter must hold once the insert has landed, set by the insert step and
    // re-checked after the save/echo round-trip.
    let endnotesExpected = 0;

    await test.step('context menu lists the four Insert-menu inserts in Insert-menu order', async () => {
      const versePara = nextClearVersePara();
      await expect(versePara).toBeVisible({ timeout: 30_000 });
      await versePara.click();
      await openContextMenu(versePara);
      optionTexts = await contextMenu.locator('[role="option"]').allTextContents();
      const insertOptions = optionTexts.filter((text) => text.startsWith('Insert'));
      expect(insertOptions).toEqual([
        'Insert footnote',
        'Insert cross-reference',
        'Insert endnote',
        'Insert comment',
      ]);
    });

    await test.step('the menu fits without scrolling at full window height, and declares a visible scrollbar for when it cannot', async () => {
      // Re-opened rather than reused from the step above: with scripture-editors#14, the plugin
      // closes the menu on a scroll of anything but itself (an editor without that in-menu
      // exemption closes on ANY scroll — see the "genuinely overflows and scrolls" step below), and
      // the chapter is still settling, so an already-open menu is not something a later step can
      // rely on either way.
      await openContextMenu();
      // The popover markup is shared with the marker typeahead, whose `ul` is capped at 200px and
      // scrolls. This menu is a short fixed list that must show all of itself: it has no filter to
      // narrow the list with.
      //
      // The item count is pinned alongside the overflow check because the overflow check alone is
      // only falsifiable while the list is taller than that 200px cap: a shorter menu would fit
      // under the cap and pass with the override deleted.
      await expect(contextMenu.locator('[role="option"]')).toHaveCount(optionTexts.length);
      const listOverflow = await contextMenu.locator('ul').evaluate((ul) => ({
        scrollHeight: ul.scrollHeight,
        clientHeight: ul.clientHeight,
      }));
      expect(listOverflow.scrollHeight).toBeLessThanOrEqual(listOverflow.clientHeight + 1);
      // Not clipped here means `scrollHeight` IS the list's natural content height — saved for the
      // short-panel step at the end of this test, which needs a real (not guessed) target to shrink
      // the window below.
      menuNaturalScrollHeightPx = listOverflow.scrollHeight;

      // …and when the panel IS too short for the whole list, the fold has to be visible. The rule
      // this menu inherits hides the scrollbar, which suits the filterable marker typeahead and
      // leaves this one with nothing on screen saying there is more.
      //
      // Read from the computed style rather than by measuring `offsetWidth - clientWidth`: that
      // gutter is zero wherever Chromium draws OVERLAY scrollbars (macOS, and any headless run),
      // so a measurement would fail there no matter what the stylesheet says. These two properties
      // are what the override changes, and the vendored rule this menu would otherwise inherit
      // sets both to the opposite values (`scroll` + `none`), so the pair stays falsifiable.
      //
      // `overscroll-behavior` rides along because it protects the same gesture: without it a wheel
      // that reaches the end of the list chains to the ancestor scroller, whose scroll event is NOT
      // inside the menu, so the close-on-scroll listener closes the menu mid-read even with
      // scripture-editors#14's in-menu exemption — that exemption covers a scroll TARGETING the
      // menu, not this chained scroll of an ancestor outside it.
      const listScrollStyle = await contextMenu.locator('ul').evaluate((ul: HTMLElement) => {
        const style = getComputedStyle(ul);
        return {
          overflowY: style.overflowY,
          scrollbarWidth: style.scrollbarWidth,
          overscrollBehaviorY: style.overscrollBehaviorY,
        };
      });
      expect(listScrollStyle).toEqual({
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        overscrollBehaviorY: 'contain',
      });
    });

    await test.step('with nothing highlighted the menu still owns Enter and the backslash', async () => {
      const versePara = nextClearVersePara();
      const paraCountBefore = await mainEditor.locator('p').count();
      const textBefore = await versePara.innerText();

      // The plugin opens the menu with its own top-left corner AT the click point, then clamps it
      // into the viewport if it would overflow — which can leave the (stationary) pointer over an
      // item under the clamped box, pre-highlighting it via the browser's post-layout hover
      // recompute with no real pointer motion. Confirming the click leaves room for the menu's full
      // natural height below it is what makes the `li.selected` assertion below meaningful rather
      // than incidentally true because this click happened to land away from the clamp zone.
      const targetBox = await versePara.boundingBox();
      if (!targetBox) throw new Error('versePara has no bounding box to check clamp room against');
      const clickY = targetBox.y + targetBox.height / 2;
      const iframeInnerHeight = await editorContainer.evaluate(() => window.innerHeight);
      expect(clickY + menuNaturalScrollHeightPx).toBeLessThan(iframeInnerHeight);

      await openContextMenu(versePara);
      await expect(contextMenu.locator('li.selected')).toHaveCount(0);

      // Neither key may start a palette underneath the menu, and neither may reach the document
      // behind it: the editor still holds DOM focus, so an unclaimed Enter plain-splits the
      // paragraph and an unclaimed backslash types a `\\` into it.
      const checkNoStrayPalette = await watchForStrayCommandPalette();
      await mainPage.keyboard.press('Enter');
      await mainPage.keyboard.press('\\');

      await checkNoStrayPalette();
      await expect(contextMenu).toBeAttached();
      expect(await mainEditor.locator('p').count()).toBe(paraCountBefore);
      expect(await versePara.innerText()).toBe(textBefore);

      // A strong, falsifiable version of the check above: if either trigger HAD opened a palette
      // underneath the menu, that palette's session would claim this Escape one capture step above
      // the menu's own `document` listener, and the menu would survive it — its highlighted item
      // (there is none here, but the mechanism is the same one the next step depends on) would stay
      // armed for a later Enter. Detaching here is what proves no such palette is sitting on top of
      // the dismissal.
      await mainPage.keyboard.press('Escape');
      await expect(contextMenu).not.toBeAttached({ timeout: 15_000 });
    });

    await test.step('arrow keys then Enter invoke the highlighted item, not the Enter palette', async () => {
      const endNoteIndex = optionTexts.indexOf('Insert endnote');
      expect(endNoteIndex).toBeGreaterThanOrEqual(0);
      const endnotesBefore = await endnotes.count();

      // A freshly opened menu has nothing highlighted, so the first ArrowDown highlights option 0
      // and reaching option N takes N + 1 presses.
      await openContextMenu();

      // Insert shortcuts pressed while the menu is open must be inert — the menu is the only
      // keyboard mode on screen, and none of these may open a popup over it. With the menu's own
      // document-capture listener claiming every key first (scripture-editors#14), this exercises
      // THAT claim rather than the host's own Ctrl+T/Ctrl+Shift+T/comment-hotkey guards in
      // platform-scripture-editor.web-view.tsx, which this spec leaves untested as a fallback for an
      // editor package that doesn't claim every key itself. Baselines are taken here, immediately
      // before the presses, so the later checks can tell "nothing happened" from "something happened
      // and was later undone".
      footnoteCountBeforeGuardedShortcuts = await mainEditor.locator('span.note.usfm_f').count();
      crossReferenceCountBeforeGuardedShortcuts = await mainEditor
        .locator('span.note.usfm_x')
        .count();
      await mainPage.keyboard.press('Control+t');
      await mainPage.keyboard.press('Control+Shift+T');
      // ControlOrMeta, not Control: on macOS the comment hotkey is Cmd+Option+M
      // (platform-scripture-editor.web-view.tsx's isMac branch), which a literal `Control+Alt+m`
      // would never match, leaving this press a no-op there whether or not the menu claims it.
      await mainPage.keyboard.press('ControlOrMeta+Alt+m');

      for (let i = 0; i <= endNoteIndex; i += 1) {
        await mainPage.keyboard.press('ArrowDown');
      }
      // Proves the shortcuts above did not steal the highlight or close the menu out from under
      // this loop.
      await expect(contextMenu.locator('li.selected')).toHaveText('Insert endnote');

      const checkNoStrayPalette = await watchForStrayCommandPalette();
      await mainPage.keyboard.press('Enter');

      // The note-count wait below is the barrier: the insert awaits a PAPI round trip, so by the
      // time it resolves, an Enter-triggered palette that opened and was then dismissed by the
      // insert's own focus change would already have shown up in the observer above.
      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      await checkNoStrayPalette();
      // The note has to have landed where an endnote belongs. One anchored outside a verse still
      // saves, so a count on its own never notices a caret that never reached the text.
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
      endnotesExpected = endnotesBefore + 1;

      // None of the insert shortcuts pressed while the menu was open produced anything: only the
      // endnote above landed.
      await expect(mainEditor.locator('span.note.usfm_f')).toHaveCount(
        footnoteCountBeforeGuardedShortcuts,
      );
      await expect(mainEditor.locator('span.note.usfm_x')).toHaveCount(
        crossReferenceCountBeforeGuardedShortcuts,
      );
      // The comment editor's "Assign to" label is the one text unique to it, rendered inside the
      // Popover CommentEditor mounts; that Popover has no `forceMount`, so nothing of it exists in
      // the DOM unless `insertCommentAtCurrentSelection` actually ran. The isolated sample project's
      // current user CAN create comments here, so this is a real check, not a vacuous one that would
      // pass whether or not the guard exists.
      await expect(editorFrame.getByText('Assign to', { exact: true })).toHaveCount(0);
    });

    await test.step('the endnote survives a save and chapter-navigation round-trip', async () => {
      // Navigating away flushes the pending save and forces a fresh PDP read of the chapter on the
      // way back, which is what makes this step falsifiable: waiting in place and re-counting
      // asserts something already true before the echo lands, so an echo that never happened would
      // pass it.
      //
      // Positive control first — Jonah 2:1's own text, which appears nowhere in chapter 1 — so the
      // count below runs against a RENDERED chapter rather than the empty mid-navigation editor
      // (same rationale as type-through-save-echo.spec.ts).
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(mainEditor).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
      await expect(endnotes).toHaveCount(0);

      await navigateToolbarBcv(mainPage, 'Jonah 1:2');
      await expect(mainEditor).toContainText('word came to Jonah', { timeout: 60_000 });
      await expect(endnotes).toHaveCount(endnotesExpected, { timeout: 30_000 });
      await expect(endnotesInVerseParas).toHaveCount(endnotesExpected);
      // Re-checked after the round trip, not just right after the keypresses: an insert that
      // slipped through the menu-open guard is itself async (it awaits a version-history snapshot
      // before it writes), so it could still have been in flight at the earlier check and only
      // land — or fail to — somewhere around this one.
      await expect(mainEditor.locator('span.note.usfm_f')).toHaveCount(
        footnoteCountBeforeGuardedShortcuts,
      );
      await expect(mainEditor.locator('span.note.usfm_x')).toHaveCount(
        crossReferenceCountBeforeGuardedShortcuts,
      );
      // The chapter change is also what closed the footnote editor the insert opened, which leaves
      // the chapter clickable again for the step below.
      await expect(editorInput).toHaveCount(1);
    });

    await test.step('inserting an endnote from the visible Insert top menu creates a \\fe note with the + caller', async () => {
      await nextClearVersePara().click();

      // Counted here, immediately before the insert, NOT at spec start: the chapter's content is
      // still settling when the editor first attaches, and a retry re-opens a project an earlier
      // attempt may already have written an endnote into. Both make an early baseline read low.
      const endnotesBefore = await endnotes.count();

      // Driven through the visible UI rather than `sendPapiCommandWhenRegistered`: this is the one
      // step that exercises the Insert top menu's own `menus.json` wiring — a typo in its
      // `command` string would break the feature for every user with the unit parity test (which
      // compares labels and order, not the command name) still green.
      const hamburger = editorFrame.locator(EDITOR_HAMBURGER_SELECTOR);
      await expect(hamburger).toBeVisible({ timeout: 15_000 });
      await hamburger.click();
      const insertEndnoteMenuItem = editorFrame.getByRole('menuitem', {
        name: 'Insert endnote',
        exact: true,
      });
      await expect(insertEndnoteMenuItem).toBeVisible({ timeout: 5_000 });
      await insertEndnoteMenuItem.click();

      // Count-based: the chapter may already contain endnotes, so assert this insert added one
      // rather than that any `\fe` exists.
      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      await expect(mainEditor.locator('span.note.usfm_fe[data-caller="+"]')).toHaveCount(
        endnotesBefore + 1,
      );
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
    });

    await test.step('clicking "Insert endnote" in the right-click menu with the mouse inserts an endnote', async () => {
      const versePara = nextClearVersePara();
      await expect(versePara).toBeVisible({ timeout: 30_000 });

      // Counted here, immediately before the insert, for the same reason as the top-menu step
      // above: the chapter may already contain endnotes from an earlier step.
      const endnotesBefore = await endnotes.count();

      await openContextMenu(versePara);
      const insertEndnoteOption = contextMenu.getByRole('option', {
        name: 'Insert endnote',
        exact: true,
      });
      await insertEndnoteOption.click();

      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
    });

    await test.step('the backslash does not open the inline markers menu while the context menu is open, in Formatted view', async () => {
      // The footnote editor popover from earlier steps has no `onOpenChange` and only closes on a
      // chapter change; leaving it open here would sit over the click below. Also re-establishes a
      // rendered chapter (rather than the empty mid-navigation editor) before the view switch.
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(mainEditor).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
      await navigateToolbarBcv(mainPage, 'Jonah 1:2');
      await expect(mainEditor).toContainText('word came to Jonah', { timeout: 60_000 });

      // Power mode cycles Standard -> Markers -> Formatted; Simple mode's view is pinned to the
      // same 'formatted' endpoint. Waiting for the intermediate Markers step to land before firing
      // the second command avoids racing a stale pre-cycle state.
      await sendPapiCommandWhenRegistered('platformScriptureEditor.changeView', editorId);
      await expect(editorFrame.locator('.editor-input.marker-visible')).toBeAttached({
        timeout: 20_000,
      });
      await sendPapiCommandWhenRegistered('platformScriptureEditor.changeView', editorId);
      await expect(editorFrame.locator('.editor-input.marker-hidden')).toBeAttached({
        timeout: 20_000,
      });

      const versePara = nextClearVersePicker();
      await expect(versePara).toBeVisible({ timeout: 30_000 });
      await versePara.click();
      await openContextMenu(versePara);

      // The inline markers menu's search input (`.marker-menu-search`, the one class unique to this
      // popover's `CommandInput`) is the DOM signal to watch for: its `Popover` has no
      // `forceMount`, so nothing of it exists until React actually opens it. Watched inside the
      // EDITOR frame's own document — this popover renders there, not in the main page.
      await editorContainer.evaluate(() => {
        // Stashed on `window` so the disconnect-and-check call below can find the same observer and
        // flag; neither is part of the standard DOM typings.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const w = window as unknown as {
          strayMarkerMenuObserver?: MutationObserver;
          strayMarkerMenuSeen?: boolean;
        };
        const markIfPresent = () => {
          if (document.querySelector('.marker-menu-search')) w.strayMarkerMenuSeen = true;
        };
        w.strayMarkerMenuSeen = false;
        markIfPresent();
        const observer = new MutationObserver(markIfPresent);
        observer.observe(document, { childList: true, subtree: true });
        w.strayMarkerMenuObserver = observer;
      });

      await mainPage.keyboard.press('\\');

      // The open is a synchronous React state update from a discrete keydown handler, so it has
      // committed (or not) by the time two animation frames inside the editor frame have run.
      // Raced against a bounded sleep, not awaited outright: a hidden/occluded window suspends
      // requestAnimationFrame indefinitely (see RAF_SETTLE_TIMEOUT_MS), so this must fail fast
      // instead of hanging — mirrors `setWindowWidth` in `helpers.ts`. `Promise.race` never cancels
      // its loser, so the `.catch(() => {})` keeps the abandoned `evaluate` call from surfacing as
      // an unhandled rejection once the window becomes visible again after the race has settled.
      await Promise.race([
        editorContainer
          .evaluate(
            () =>
              new Promise<void>((resolve) => {
                requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
              }),
          )
          .catch(() => {}),
        sleep(RAF_SETTLE_TIMEOUT_MS),
      ]);

      const strayMarkerMenuSeen = await editorContainer.evaluate(() => {
        // See the install call above for why this cast is needed.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const w = window as unknown as {
          strayMarkerMenuObserver?: MutationObserver;
          strayMarkerMenuSeen?: boolean;
        };
        w.strayMarkerMenuObserver?.disconnect();
        w.strayMarkerMenuObserver = undefined;
        const result = w.strayMarkerMenuSeen;
        w.strayMarkerMenuSeen = undefined;
        return result;
      });
      expect(strayMarkerMenuSeen).toBe(false);
      await expect(contextMenu).toBeAttached();

      // Positive control: the same backslash DOES open the inline markers menu once the context
      // menu is out of the way — proof the check above is falsifiable rather than vacuously true
      // because Formatted view never opens that menu at all.
      await mainPage.keyboard.press('Escape');
      await expect(contextMenu).not.toBeAttached({ timeout: 15_000 });
      await versePara.click();
      await mainPage.keyboard.press('\\');
      const markerMenuSearch = editorFrame.locator('.marker-menu-search');
      await expect(markerMenuSearch).toBeVisible({ timeout: 15_000 });
      await mainPage.keyboard.press('Escape');
      await expect(markerMenuSearch).not.toBeVisible({ timeout: 15_000 });
    });

    await test.step('the menu genuinely overflows and scrolls when the editor panel is too short to fit it', async () => {
      // How much of the window belongs to chrome outside the editor iframe (toolbars, tab strip),
      // measured at the window's current size, so the target height below is computed rather than
      // guessed. Run LAST, after the view switch above, because shrinking the real window affects
      // every locator after it.
      const iframeInnerHeightBefore = await editorContainer.evaluate(() => window.innerHeight);
      const windowOuterHeightBefore = await mainPage.evaluate(() => window.outerHeight);
      const chromeOverheadPx = windowOuterHeightBefore - iframeInnerHeightBefore;

      // Half the menu's own measured natural height is clearly below it, forcing the
      // `max-height: calc(100vh - 16px)` rule to actually cap the list rather than merely approach
      // the cap.
      const targetIframeInnerHeightPx = Math.round(menuNaturalScrollHeightPx / 2);
      await setWindowHeight(electronApp, mainPage, targetIframeInnerHeightPx + chromeOverheadPx);

      const iframeInnerHeightAfter = await editorContainer.evaluate(() => window.innerHeight);
      // The resize actually produced a short-enough panel — otherwise everything below would be
      // vacuous, passing regardless of whether the menu's own cap does anything.
      expect(iframeInnerHeightAfter).toBeLessThan(menuNaturalScrollHeightPx);

      const versePara = nextClearVersePicker();
      await expect(versePara).toBeVisible({ timeout: 30_000 });
      await openContextMenu(versePara);

      const list = contextMenu.locator('ul');
      const overflow = await list.evaluate((ul) => ({
        scrollHeight: ul.scrollHeight,
        clientHeight: ul.clientHeight,
        bottom: ul.getBoundingClientRect().bottom,
        overflowY: getComputedStyle(ul).overflowY,
        scrollbarWidth: getComputedStyle(ul).scrollbarWidth,
      }));
      // The list is genuinely capped shorter than its content — not merely declared scrollable
      // while secretly still showing everything.
      expect(overflow.scrollHeight).toBeGreaterThan(overflow.clientHeight + 1);
      // The menu never grows past the panel it opened in, whatever the list's true content height.
      // Compared against the SETTLED iframe height, not the requested target: Electron's own
      // rounding can leave the two a pixel or two apart.
      expect(overflow.bottom).toBeLessThanOrEqual(iframeInnerHeightAfter + 1);
      expect(overflow.overflowY).toBe('auto');
      expect(overflow.scrollbarWidth).toBe('thin');

      // The fold is reachable: scrolling the list to its own end does not close the menu. This
      // depends on scripture-editors#14: `ContextMenuPlugin`'s close-on-scroll listener exempts a
      // scroll whose target is inside the menu only there — an editor without that exemption closes
      // on ANY scroll, this one included. Driven with a real wheel gesture rather than setting
      // `scrollTop` directly, so the step goes through the same close-on-scroll listener a user's
      // scroll would trigger, and the assertion below only passes once the scroll has actually
      // happened rather than on the same tick it was requested. `list.boundingBox()` already
      // resolves to page coordinates across the nested editor iframe, so `mainPage.mouse` can target
      // it directly.
      const listBoxForWheel = await list.boundingBox();
      if (!listBoxForWheel) throw new Error('list has no bounding box to scroll over');
      await mainPage.mouse.move(
        listBoxForWheel.x + listBoxForWheel.width / 2,
        listBoxForWheel.y + listBoxForWheel.height / 2,
      );
      const scrollTopBeforeWheel = await list.evaluate((ul) => ul.scrollTop);
      // A large delta so one wheel gesture reaches the list's true end regardless of its height —
      // the browser clamps `scrollTop` at `scrollHeight - clientHeight` rather than overshooting,
      // which is what lets the assertions below treat the list as fully scrolled.
      await mainPage.mouse.wheel(0, 100_000);
      await expect
        .poll(() => list.evaluate((ul) => ul.scrollTop), { timeout: 15_000 })
        .toBeGreaterThan(scrollTopBeforeWheel);
      // The menu survived the scroll it was just put through, and the last option ends up inside
      // the list's own visible box rather than still hidden past it.
      await expect(contextMenu).toBeAttached();
      // `getBoundingClientRect()` itself is not returned — its fields sit on the prototype, not as
      // own properties, so Playwright's structured-clone serialization would hand back `{}`. Each
      // number is pulled out explicitly instead.
      const lastOptionBox = await contextMenu
        .locator('[role="option"]')
        .last()
        .evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return { top: rect.top, bottom: rect.bottom };
        });
      const listBox = await list.evaluate((ul) => {
        const rect = ul.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      });
      expect(lastOptionBox.bottom).toBeLessThanOrEqual(listBox.bottom + 1);
      expect(lastOptionBox.top).toBeGreaterThanOrEqual(listBox.top - 1);
    });
  });
});
