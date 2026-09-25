import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeAll } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import {
  Dialog,
  DialogContent,
  Z_INDEX_MODAL,
  Z_INDEX_NESTED_MODAL,
  Z_INDEX_NESTED_MODAL_BACKDROP,
} from 'platform-bible-react';
import { TeamLayoutDialogContent } from './team-layout.component';

// jsdom does not implement ResizeObserver; platform-bible-react's Tooltip wires ResizeObservers.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies runtime contract but not structural
    // typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
});

const ESV: ResourceReference = {
  type: 'dblResource',
  name: 'ESV',
  id: 'esv-uid',
  isInTextCollection: true,
};
const NIV: ResourceReference = { type: 'dblResource', name: 'NIV', id: 'niv-uid' };
const IVP: ResourceReference = {
  type: 'dblResource',
  name: 'IVP Commentary',
  id: 'ivp-uid',
  isInTextCollection: true,
};

const ALL_RESOURCES: DblResourceData[] = [
  {
    dblEntryUid: 'esv-uid',
    displayName: 'ESV',
    fullName: 'English Standard Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 10,
    installed: true,
    updateAvailable: false,
    projectId: 'esv-proj',
  },
  {
    dblEntryUid: 'nlt-uid',
    displayName: 'NLT',
    fullName: 'New Living Translation',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 10,
    installed: true,
    updateAvailable: false,
    projectId: 'nlt-proj',
  },
];

function renderContent(overrides: Partial<Parameters<typeof TeamLayoutDialogContent>[0]> = {}) {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  render(
    // The host is a real modal `DialogContent` at `Z_INDEX_MODAL`, because that is what
    // `OverlayModalDialog` gives this dialog in the app. Rendering the content bare leaves the
    // page non-modal and emits no host overlay, which silently weakens every assertion here about
    // the nested picker's relationship to the dialog it covers — a document-wide
    // `[data-slot="dialog-overlay"]` query would find the picker's own overlay and pass against
    // any z-index at all.
    <Dialog open>
      <DialogContent style={{ zIndex: Z_INDEX_MODAL }} data-testid="host-dialog-content">
        <TeamLayoutDialogContent
          initialModelText={undefined}
          initialActiveTab="ScriptureResource"
          initialScriptureResources={[ESV, NIV]}
          initialCommentaryResources={[]}
          initialIsStructureProtectedForTeam={false}
          isTeamLockUnknown={false}
          hasSaveError={false}
          hiddenInTextCollectionCount={0}
          projectName="HNF - Hanif Bible"
          allResources={ALL_RESOURCES}
          isResourcesLoading={false}
          hasResourcesError={false}
          onRetryResources={vi.fn()}
          areDownloadsUnavailable={false}
          hiddenResourceCount={0}
          resourcePickerLocalizedStrings={{}}
          localizedStrings={{}}
          onConfirm={onConfirm}
          onCancel={onCancel}
          {...overrides}
        />
      </DialogContent>
    </Dialog>,
  );
  return { onConfirm, onCancel };
}

/**
 * The picker's own `DialogContent`, found from something only it renders.
 *
 * Every query about the picker is scoped through this. The host dialog is a `DialogContent` with an
 * overlay and a close button of its own, so a document-wide `querySelector` for any dialog part
 * answers about the host just as readily as about the picker.
 */
function getPickerContent(): HTMLElement {
  const pickerTitle = screen.getByText('%resourcePicker_title%');
  const content = pickerTitle.closest<HTMLElement>('[data-slot="dialog-content"]');
  if (!content) throw new Error('The resource picker is not rendering inside a dialog content.');
  return content;
}

/**
 * The overlay Radix portals alongside the picker's content, as opposed to the host's own.
 *
 * Both dialogs portal straight to `<body>`, so the two overlays are siblings and cannot be told
 * apart by position in the tree. `DialogPortal` appends in mount order and the picker mounts
 * second, so the picker's is the last one. The count assertion is what keeps that reading honest:
 * if the harness ever stops nesting, this returns the host's overlay and every assertion built on
 * it goes quietly green.
 */
function getPickerOverlay(): HTMLElement {
  const overlays = Array.from(
    document.querySelectorAll<HTMLElement>('[data-slot="dialog-overlay"]'),
  );
  expect(overlays).toHaveLength(2);
  return overlays[overlays.length - 1];
}

/**
 * Every embedded picker, by how it is opened.
 *
 * All three `DialogContent`s in this dialog carry the same nested-tier `style`/`overlayStyle`/
 * `overlayClassName` triple and the same `onOpenAutoFocus`, from one shared constant and one shared
 * helper — but each spells them out at its own call site, so dropping one is invisible unless
 * something opens that picker. The model-text picker is the one that had no coverage.
 */
const PICKER_OPENERS: [name: string, open: () => void][] = [
  [
    'manage picker',
    () => {
      fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));
    },
  ],
  [
    'model-text picker',
    () => {
      fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));
    },
  ],
];

describe('TeamLayoutDialogContent', () => {
  const SAVE_LABEL = '%shareLayoutDialog_saveForTeam_label%';
  const TEAM_LOCK_LABEL = '%shareLayoutDialog_teamLock_label%';
  const COMMENTARY_TAB = '%shareLayoutDialog_tab_commentaryResources%';

  /**
   * Brings the commentary tab's rows into the DOM — Radix mounts only the open tab's panel.
   *
   * Radix `TabsTrigger` selects on mousedown rather than click, so a bare `fireEvent.click` leaves
   * the tab strip untouched and every assertion after it silently reads the wrong panel.
   */
  function showCommentaryTab() {
    fireEvent.mouseDown(screen.getByRole('tab', { name: COMMENTARY_TAB }));
  }

  const LOCALIZED_STRINGS = {
    '%shareLayoutDialog_textCollection_hint%':
      'Text collection includes checked resources from all tabs ({count})',
    '%shareLayoutDialog_shownByDefault_label%': 'Show {resourceName} by default',
  };

  it('confirms with the initial state unchanged when nothing is edited', () => {
    const { onConfirm } = renderContent();

    fireEvent.click(screen.getByText(SAVE_LABEL));

    expect(onConfirm).toHaveBeenCalledWith({
      modelText: undefined,
      activeTab: 'ScriptureResource',
      scriptureResources: [ESV, NIV],
      commentaryResources: [],
      isStructureProtectedForTeam: false,
    });
  });

  it('calls onCancel when Cancel is clicked, without calling onConfirm', () => {
    const { onConfirm, onCancel } = renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_cancel_label%'));

    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('toggles isInTextCollection when the checkbox for a resource is toggled', () => {
    const { onConfirm } = renderContent();

    // Rows render in array order (ESV, then NIV) — no sorting. NIV starts unchecked; toggling
    // flips it to true.
    const [, nivCheckbox] = screen.getAllByRole('checkbox');
    fireEvent.click(nivCheckbox);
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ id: 'niv-uid', isInTextCollection: true }),
    );
  });

  it('adds a resource to the Bible texts list via the manage picker', () => {
    const { onConfirm } = renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    // The picker's ResourcePickerDialog renders NLT (not yet selected) as a clickable row.
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ type: 'dblResource', id: 'nlt-uid', name: 'NLT' }),
    );
  });

  it('does not render two elements with the same id when the manage picker is open', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    // Sanity-check the picker actually opened before asserting on ids.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('does not close the manage picker after selecting a resource', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));

    // The picker (and the now-included NLT row within it) should still be in the document.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();
  });

  it('removes an already-included resource when it is clicked again in the manage picker', () => {
    const { onConfirm } = renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    // ESV is already included, so it renders as a clickable "Already Selected" row now that
    // allowDeselect is on.
    fireEvent.click(screen.getByRole('button', { name: 'ESV' }));
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).not.toContainEqual(
      expect.objectContaining({ id: 'esv-uid' }),
    );
  });

  // This dialog embeds the picker twice — the per-tab manage picker and the model-text picker —
  // so a failed catalog fetch has to reach both. Wiring only one leaves the other reporting the
  // failure as an empty catalog.
  it('reports a failed catalog fetch in the manage picker instead of claiming there are no results', () => {
    renderContent({ allResources: [], hasResourcesError: true });

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument();
    expect(screen.queryByText('%resourcePicker_no_results%')).not.toBeInTheDocument();
  });

  it('reports a failed catalog fetch in the model-text picker too', () => {
    renderContent({ allResources: [], hasResourcesError: true, initialModelText: undefined });

    fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));

    expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument();
  });

  it('closes the manage picker when its close button is clicked', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('%shareLayoutDialog_closePicker_label%'));
    expect(screen.queryByRole('button', { name: 'NLT' })).not.toBeInTheDocument();
  });

  // `DialogContent` builds in a close button whose screen-reader label is a hardcoded English
  // "Close" no consumer can translate, so every picker here opts out of it. Without this, dropping
  // `showCloseButton={false}` on the Manage pickers ships two stacked close buttons and that
  // untranslated label, and every other test in this file still passes.
  it.each(PICKER_OPENERS)(
    'gives the %s the localized close button rather than the built-in one',
    (_name, open) => {
      renderContent();

      open();

      expect(screen.getByLabelText('%shareLayoutDialog_closePicker_label%')).toBeInTheDocument();
      // Matched on the slot rather than on the name 'Close': that name is the untranslatable
      // string this assertion exists to keep out, so localizing it would turn the name lookup
      // green against a dialog still shipping two stacked close buttons. Scoped to the picker's
      // own content, because the host dialog ships the built-in close button this picker opts
      // out of.
      expect(getPickerContent().querySelector('[data-slot="dialog-close"]')).toBeNull();
    },
  );

  // Manage opens a second modal that sits OVER this dialog, rather than a popover anchored to its
  // trigger: a popover reads as a menu hanging off the dialog rather than the separate task it is,
  // and a narrow window pushes it off-screen. The negative assertions below are what hold that —
  // a popover would satisfy "the picker is showing" just as well.
  it('opens the resource picker as a modal dialog rather than a popover anchored to the button', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    const pickerRow = screen.getByRole('button', { name: 'NLT' });
    // A dialog surface with a backdrop, not a popover anchored to the trigger. The backdrop is
    // what makes it read as replacing this dialog rather than hanging off it.
    expect(pickerRow.closest('[data-slot="dialog-content"]')).not.toBeNull();
    expect(pickerRow.closest('[data-slot="popover-content"]')).toBeNull();
    expect(getPickerOverlay()).toBeInTheDocument();
  });

  // The defect this fix was reported against is Manage Commentaries, not Manage Bible texts. Both
  // run through one code path that picks the label by tab, so this guards against a future split
  // of that path rather than a different bug today.
  it('opens the commentary manage picker as a modal too', () => {
    renderContent({ initialCommentaryResources: [IVP] });

    showCommentaryTab();
    fireEvent.click(screen.getByText('%shareLayoutDialog_manageCommentaryResources_label%'));

    // Anchored on the picker's own title rather than a row: the commentary picker filters to
    // CommentaryResource, and this fixture's resources are all ScriptureResource, so it opens
    // empty.
    const pickerTitle = screen.getByText('%resourcePicker_title%');
    expect(pickerTitle.closest('[data-slot="dialog-content"]')).not.toBeNull();
    expect(pickerTitle.closest('[data-slot="popover-content"]')).toBeNull();
    // The picker's own backdrop, not the host's — the host is a modal `DialogContent` here too.
    expect(getPickerOverlay()).toBeInTheDocument();
  });

  // The backdrop above is only half the claim: an overlay that renders at the shared modal tier
  // paints *behind* the team layout dialog it is meant to cover, so the host stays bright while
  // Radix makes it inert — a panel that looks live and swallows every click. The nested tiers are
  // what put both layers over the host, and nothing else in this file can see them: every
  // assertion about the overlay is satisfied by any z-index at all.
  //
  // Compared as declared strings rather than through `Number(...)`, since `Number('')` is `0` and
  // would make a missing z-index look like a deliberate one.
  it.each(PICKER_OPENERS)('stacks the nested %s and its backdrop above its host', (_name, open) => {
    renderContent();

    open();

    const pickerContent = getPickerContent();
    const pickerOverlay = getPickerOverlay();
    const hostContent = screen.getByTestId('host-dialog-content');

    expect(pickerContent.style.zIndex).toBe(String(Z_INDEX_NESTED_MODAL));
    expect(pickerOverlay.style.zIndex).toBe(String(Z_INDEX_NESTED_MODAL_BACKDROP));

    // The relation, not just the two values: both picker layers have to clear the host. Without
    // this the test passes for any pair of constants, including a pair that puts the backdrop
    // back underneath the dialog it is meant to dim.
    expect(Number(pickerOverlay.style.zIndex)).toBeGreaterThan(Number(hostContent.style.zIndex));
    expect(Number(pickerContent.style.zIndex)).toBeGreaterThan(Number(hostContent.style.zIndex));

    // The backdrop also has to dim as much as the host's does. At `DialogOverlay`'s default
    // `bg-black/10` it paints over the host without visibly darkening it, so the host still reads
    // as live while Radix holds it inert — the exact effect the nested tier exists to prevent.
    expect(pickerOverlay.className).toContain('overlay-modal-backdrop');
  });

  // A dialog focuses its first tabbable element on open, which would be the close button: it pops
  // its own tooltip over the picker the instant it opens and starts the keyboard user on "leave"
  // rather than on the search they came to do. The picker names its target in `onOpenAutoFocus`
  // rather than relying on DOM order, so reordering the JSX for layout cannot move opening focus.
  it.each(PICKER_OPENERS)(
    'puts opening focus in the %s on the search box, not on the close button',
    (_name, open) => {
      renderContent();

      open();

      expect(screen.getByPlaceholderText('%resourcePicker_search_placeholder%')).toHaveFocus();
    },
  );

  // The case the ordering alone never covered: an empty picker disables its own search box, so
  // Radix's default auto-focus falls through to the next tabbable element — the close button. This
  // fixture's resources are all ScriptureResource, so the commentary picker opens empty and the
  // search box is disabled, which is exactly the Manage Commentaries state the defect was reported
  // against. Focus holds on the dialog itself instead, where Escape and the title announcement
  // both still work.
  it('holds focus on the dialog rather than the close button when the search box is disabled', () => {
    renderContent();

    showCommentaryTab();
    fireEvent.click(screen.getByText('%shareLayoutDialog_manageCommentaryResources_label%'));

    const searchBox = screen.getByPlaceholderText('%resourcePicker_search_placeholder%');
    // A positive control for the premise: without a disabled search box this test would be
    // asserting the fallback branch against a state that never reaches it.
    expect(searchBox).toBeDisabled();

    const closeButton = screen.getByLabelText('%shareLayoutDialog_closePicker_label%');
    expect(closeButton).not.toHaveFocus();
    expect(getPickerContent()).toHaveFocus();
  });

  // Dismissing the inner modal has to leave the outer one usable. A nested dialog that takes the
  // outer dialog's focus trap or backdrop down with it still passes "the picker is gone".
  //
  // The `aria-hidden` assertions are the load-bearing half. `fireEvent.click` dispatches straight
  // at the node and goes through `pointer-events: none`, so a team layout dialog left inert by the
  // dismissed picker would still satisfy the save click below; what Radix actually leaves behind
  // on a botched teardown is the host marked hidden from assistive technology.
  //
  // Scoped to the host rather than to `<body>`: the host here is a real modal, as it is in the
  // app, so `body` legitimately keeps `pointer-events: none` for as long as the dialog is open. A
  // `body`-level assertion would be asserting that the outer dialog had stopped being modal.
  it('leaves the team layout dialog usable after the manage picker is dismissed', () => {
    const { onConfirm } = renderContent();
    const hostContent = screen.getByTestId('host-dialog-content');

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    // The positive control: while the picker is open Radix hides the host from assistive
    // technology, so the assertion after dismissal can tell "correctly restored" apart from "never
    // set in the first place".
    expect(hostContent).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(screen.getByLabelText('%shareLayoutDialog_closePicker_label%'));

    // The host is reachable again, and still modal in its own right.
    expect(hostContent).not.toHaveAttribute('aria-hidden');
    expect(document.body.style.pointerEvents).toBe('none');

    // The outer dialog's own controls still respond, and its state survived the round trip.
    fireEvent.click(screen.getByText(SAVE_LABEL));
    expect(onConfirm).toHaveBeenCalledWith(
      expect.objectContaining({ scriptureResources: [ESV, NIV] }),
    );
  });

  it('titles the dialog with the team layout name', () => {
    renderContent();

    expect(screen.getByText('%shareLayoutDialog_teamLayout_title%')).toBeInTheDocument();
    expect(screen.queryByText('%shareLayoutDialog_title%')).not.toBeInTheDocument();
  });

  // The Save button names what saving does, and the description says when the team will actually
  // see it — a layout saved here does not reach anyone until the next sync, and a button reading
  // only "Save" invites the reader to assume otherwise.
  it('names the save action for the team and says when the team will see it', () => {
    renderContent();

    expect(screen.getByText(SAVE_LABEL)).toBeInTheDocument();
    expect(screen.getByText('%shareLayoutDialog_reviewAndSyncNotice%')).toBeInTheDocument();
    expect(screen.queryByText('%shareLayoutDialog_confirm_label%')).not.toBeInTheDocument();
  });

  // The default-tab choice and the text-collection rule name column three as a whole, so they sit
  // in its panel. Asserted structurally: the smallest element holding both the default-tab control
  // and the resource tabs must not also hold the dialog's actions — otherwise the assertion would
  // pass merely because everything shares the dialog body.
  it('groups the default-tab control in the same column as the resource tabs it refers to', () => {
    renderContent();

    const defaultTabLabel = screen.getByText('%shareLayoutDialog_activeTab_label%');
    const commentaryTab = screen.getByRole('tab', { name: COMMENTARY_TAB });
    const saveButton = screen.getByText(SAVE_LABEL);

    let column: HTMLElement | undefined = defaultTabLabel.parentElement ?? undefined;
    while (column && !column.contains(commentaryTab)) column = column.parentElement ?? undefined;

    expect(column).toBeDefined();
    expect(column?.contains(saveButton)).toBe(false);
  });

  it('shows the project being edited as the middle column heading', () => {
    renderContent();

    expect(screen.getByText('HNF - Hanif Bible')).toBeInTheDocument();
  });

  it('labels a catalogued resource short-name-first, and by short name alone when it has no catalog entry', () => {
    renderContent();

    // ESV is in the catalog, so its row carries both names, short name leading. NIV is not, so it
    // falls back to the reference's own short name rather than composing a partial label.
    expect(screen.getByText('ESV - English Standard Version')).toBeInTheDocument();
    expect(screen.getByText('NIV')).toBeInTheDocument();
  });

  // Column three's two resource types are tabs for the team, so they are tabs here. Only the open
  // tab's rows are mounted, which is the point: the column stops growing with the resource count.
  it('puts each resource type on its own tab and shows one tab at a time', () => {
    renderContent({ initialCommentaryResources: [IVP] });

    expect(screen.getByText('ESV - English Standard Version')).toBeInTheDocument();
    expect(screen.queryByText('IVP Commentary')).not.toBeInTheDocument();

    showCommentaryTab();

    expect(screen.getByText('IVP Commentary')).toBeInTheDocument();
    expect(screen.queryByText('ESV - English Standard Version')).not.toBeInTheDocument();
  });

  // The count is the only place the dialog states that the text collection draws on both tabs at
  // once, so it must not report only the tab that happens to be open.
  it('counts checked resources across both tabs, not just the open one', () => {
    renderContent({ initialCommentaryResources: [IVP], localizedStrings: LOCALIZED_STRINGS });

    // ESV and IVP start checked; NIV does not. One is on each tab.
    expect(screen.getByText(/all tabs \(2\)/)).toBeInTheDocument();

    const [, nivCheckbox] = screen.getAllByRole('checkbox');
    fireEvent.click(nivCheckbox);

    expect(screen.getByText(/all tabs \(3\)/)).toBeInTheDocument();
  });

  it('still states the text-collection rule when nothing is checked', () => {
    renderContent({
      initialScriptureResources: [],
      initialCommentaryResources: [],
      localizedStrings: LOCALIZED_STRINGS,
    });

    expect(screen.getByText(/all tabs \(0\)/)).toBeInTheDocument();
  });

  // An empty tab with nothing in it reads as a failed load rather than as a set the admin has not
  // chosen yet.
  it('explains an empty resource tab instead of leaving it blank', () => {
    renderContent({ initialScriptureResources: [], initialCommentaryResources: [] });

    // One message, not two: only the open tab is mounted.
    expect(screen.getAllByText('%shareLayoutDialog_resources_empty%')).toHaveLength(1);
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });

  it('toggles isInTextCollection on a commentary resource without touching scripture resources', () => {
    const { onConfirm } = renderContent({ initialCommentaryResources: [IVP] });

    showCommentaryTab();

    const [ivpCheckbox] = screen.getAllByRole('checkbox');
    fireEvent.click(ivpCheckbox);
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.commentaryResources).toContainEqual(
      expect.objectContaining({ id: 'ivp-uid', isInTextCollection: false }),
    );
    expect(result.scriptureResources).toEqual([ESV, NIV]);
  });

  // The team lock is staged like everything else in this dialog, so Cancel has to discard it.
  it('reports the edited team lock on confirm', () => {
    const { onConfirm } = renderContent({ initialIsStructureProtectedForTeam: false });

    fireEvent.click(screen.getByRole('switch', { name: TEAM_LOCK_LABEL }));
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.isStructureProtectedForTeam).toBe(true);
  });

  it('does not report the team lock at all when the dialog is cancelled', () => {
    const { onConfirm, onCancel } = renderContent({ initialIsStructureProtectedForTeam: false });

    fireEvent.click(screen.getByRole('switch', { name: TEAM_LOCK_LABEL }));
    fireEvent.click(screen.getByText('%shareLayoutDialog_cancel_label%'));

    expect(onCancel).toHaveBeenCalled();
    // The staged `true` must not reach the caller by any route. `onCancel` is wired straight to the
    // button's `onClick`, so React invokes it with a SyntheticEvent — hence `not.toHaveBeenCalledWith`
    // on the value rather than an argument-less assertion, which would fail against correct code.
    expect(onCancel).not.toHaveBeenCalledWith(true);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  // The label is a `Label htmlFor`, not a bare span named by `aria-labelledby` — the words
  // themselves activate the switch, as they do at every other Switch in the app.
  it('toggles the team lock when its label text is clicked', () => {
    renderContent({ initialIsStructureProtectedForTeam: false });

    fireEvent.click(screen.getByText(TEAM_LOCK_LABEL));

    expect(screen.getByRole('switch', { name: TEAM_LOCK_LABEL })).toBeChecked();
  });

  // A failed read of the team lock falls back to `false` so the switch has something to render, and
  // that fallback must never be savable — writing it would unlock structure for the whole team.
  it('disables the team lock and explains itself when the current value could not be read', () => {
    renderContent({ isTeamLockUnknown: true });

    expect(screen.getByRole('switch', { name: TEAM_LOCK_LABEL })).toBeDisabled();
    expect(screen.getByText('%shareLayoutDialog_teamLock_loadError%')).toBeInTheDocument();
    expect(screen.queryByText('%shareLayoutDialog_teamLock_description%')).not.toBeInTheDocument();
  });

  // A refused save keeps the dialog open and says so, rather than closing as though it had worked.
  it('reports a refused save in place of closing silently', () => {
    renderContent({ hasSaveError: true });

    expect(screen.getByText('%shareLayoutDialog_saveFailed%')).toBeInTheDocument();
  });

  // One control carrying the answer in its own state, rather than two look-alike pills where the
  // answer is whichever one happens to be pressed.
  it('shows the team lock as a single switch reflecting the current answer', () => {
    renderContent({ initialIsStructureProtectedForTeam: true });

    const teamLockSwitch = screen.getByRole('switch', { name: TEAM_LOCK_LABEL });

    expect(teamLockSwitch).toBeChecked();
    expect(screen.getAllByRole('switch')).toHaveLength(1);
  });

  it('turns the team lock back off when the switch is toggled from on', () => {
    const { onConfirm } = renderContent({ initialIsStructureProtectedForTeam: true });

    fireEvent.click(screen.getByRole('switch', { name: TEAM_LOCK_LABEL }));
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.isStructureProtectedForTeam).toBe(false);
  });

  it('does not let a text whose license restricts it be picked as the model text', () => {
    const { onConfirm } = renderContent({
      initialModelText: undefined,
      getModelTextDisabledReason: (resource) =>
        resource.dblEntryUid === 'esv-uid' ? 'Licensing prohibits this.' : undefined,
    });

    fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));
    const esvRow = screen.getByText('English Standard Version').closest('tr');
    if (!esvRow) throw new Error('ESV row not found');
    fireEvent.click(esvRow);

    expect(esvRow).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(screen.getByText(SAVE_LABEL));
    const [result] = onConfirm.mock.calls[0];
    expect(result.modelText).toBeUndefined();
  });

  // The model-text picker deliberately closes on select, where the Manage picker deliberately stays
  // open (pinned separately above) — so a refactor that unified the two would break exactly one of
  // them silently. Both halves are asserted here: the pick reaches `onConfirm`, and the picker goes.
  it('records the picked model text and closes its picker', () => {
    const { onConfirm } = renderContent({ initialModelText: undefined });

    fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));
    fireEvent.click(screen.getByText('English Standard Version'));

    expect(screen.queryByTestId('resource-picker-scrim')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(SAVE_LABEL));
    const [result] = onConfirm.mock.calls[0];
    expect(result.modelText).toEqual(
      expect.objectContaining({ type: 'dblResource', id: 'esv-uid' }),
    );
  });

  // "No model text" is a first-class persisted state — the wrapper writes an empty list for it and
  // the trigger names it — so the picker has to be able to reach it. Without `allowDeselect` the
  // already-selected row is inert and the choice is a one-way door.
  it('clears the model text when the already-selected resource is picked again', () => {
    const { onConfirm } = renderContent({ initialModelText: ESV });

    // Open the picker from the trigger, which now names the current selection.
    const trigger = screen.getByText('%shareLayoutDialog_modelText_label%').closest('div');
    fireEvent.click(within(trigger ?? document.body).getByRole('button'));
    // The already-selected row: clicking it is the deselect.
    fireEvent.click(screen.getByRole('button', { name: 'ESV' }));

    fireEvent.click(screen.getByText(SAVE_LABEL));
    const [result] = onConfirm.mock.calls[0];
    expect(result.modelText).toBeUndefined();
  });

  // Same one-way door on the other control: the empty value is persisted and `seedScalar` treats
  // `''` as unset, but without a sentinel item "none" is reachable only as the initial state.
  it('can return the default tab to none after a tab has been picked', () => {
    const { onConfirm } = renderContent({ initialActiveTab: 'Comments' });

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: '%shareLayoutDialog_activeTab_none%' }));

    fireEvent.click(screen.getByText(SAVE_LABEL));
    const [result] = onConfirm.mock.calls[0];
    expect(result.activeTab).toBeUndefined();
  });

  // The picker overlaps the dialog it was opened from, so the dialog behind it is dimmed and
  // blurred while it is open — otherwise the two read as equally live surfaces.
  it('dims the dialog while a picker is open and clears it again on close', () => {
    renderContent();

    expect(screen.queryByTestId('resource-picker-scrim')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));
    expect(screen.getByTestId('resource-picker-scrim')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('%shareLayoutDialog_closePicker_label%'));
    expect(screen.queryByTestId('resource-picker-scrim')).not.toBeInTheDocument();
  });

  it('dims the dialog while the model-text picker is open too', () => {
    renderContent();

    // Control, as in the manage-picker case below: both are reachable first, so their absence
    // afterwards means the picker is genuinely modal rather than that they were never exposed.
    expect(screen.getByRole('button', { name: SAVE_LABEL })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: TEAM_LOCK_LABEL })).toBeInTheDocument();

    fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));

    expect(screen.getByTestId('resource-picker-scrim')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: SAVE_LABEL })).not.toBeInTheDocument();
    expect(screen.queryByRole('switch', { name: TEAM_LOCK_LABEL })).not.toBeInTheDocument();
  });

  // The scrim claims the dialog behind an open picker is inert, so it has to actually be inert. The
  // picker is modal, which hides what is behind it from assistive technology and traps focus there;
  // a non-modal one would leave every control behind the scrim Tab-reachable.
  it('puts the content behind the scrim out of reach while a picker is open', () => {
    renderContent();

    // Control: both are reachable before the picker opens, so their absence afterwards means
    // something happened rather than that they were never exposed.
    expect(screen.getByRole('button', { name: SAVE_LABEL })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: TEAM_LOCK_LABEL })).toBeInTheDocument();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    expect(screen.getByTestId('resource-picker-scrim')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: SAVE_LABEL })).not.toBeInTheDocument();
    expect(screen.queryByRole('switch', { name: TEAM_LOCK_LABEL })).not.toBeInTheDocument();
  });

  // Cancel and save are the whole of the footer. A third action here would be a second way out of
  // the dialog, and the scoped query is what makes that visible rather than lost among the dialog's
  // other buttons.
  it('offers exactly two actions in the footer', () => {
    renderContent();

    const saveButton = screen.getByText(SAVE_LABEL);
    const footer = saveButton.parentElement;
    if (!footer) throw new Error('The save button is not inside a footer element.');

    expect(
      within(footer)
        .getAllByRole('button')
        .map((button) => button.textContent),
    ).toEqual(['%shareLayoutDialog_cancel_label%', SAVE_LABEL]);
  });

  // The dialog sets a model text and nothing else per-resource: a preferred text per commentary or
  // Bible text is deliberately out of scope. Guards against one appearing.
  it('offers no preferred-text control for commentaries or Bible texts', () => {
    renderContent({ initialCommentaryResources: [IVP] });

    expect(screen.queryByText(/preferred/i)).not.toBeInTheDocument();
    // The default-tab select is the dialog's only combobox, so a preferred-text picker — which
    // would have to be one too — cannot hide inside this count.
    expect(screen.getAllByRole('combobox')).toHaveLength(1);
  });
});
