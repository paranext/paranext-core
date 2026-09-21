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
import { ShareLayoutDialogContent } from './share-layout.component';

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

function renderContent(overrides: Partial<Parameters<typeof ShareLayoutDialogContent>[0]> = {}) {
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
        <ShareLayoutDialogContent
          initialModelText={undefined}
          initialActiveTab="ScriptureResource"
          initialScriptureResources={[ESV, NIV]}
          initialCommentaryResources={[]}
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
      const [manageButton] = screen.getAllByText(
        '%shareLayoutDialog_manageScriptureResources_label%',
      );
      fireEvent.click(manageButton);
    },
  ],
  [
    'model-text picker',
    () => {
      fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));
    },
  ],
];

describe('ShareLayoutDialogContent', () => {
  it('confirms with the initial state unchanged when nothing is edited', () => {
    const { onConfirm } = renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    expect(onConfirm).toHaveBeenCalledWith({
      modelText: undefined,
      activeTab: 'ScriptureResource',
      scriptureResources: [ESV, NIV],
      commentaryResources: [],
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
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ id: 'niv-uid', isInTextCollection: true }),
    );
  });

  it('adds a resource to the Bible Texts list via the manage picker', () => {
    const { onConfirm } = renderContent();

    // The Bible Texts card is rendered first, so its manage button is the first match.
    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    // The picker's ResourcePickerDialog renders NLT (not yet selected) as a clickable row.
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ type: 'dblResource', id: 'nlt-uid', name: 'NLT' }),
    );
  });

  it('does not render two elements with the same id when the manage picker is open', () => {
    renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    // Sanity-check the picker actually opened before asserting on ids.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('does not close the manage picker after selecting a resource', () => {
    renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));

    // The picker (and the now-included NLT row within it) should still be in the document.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();
  });

  it('removes an already-included resource when it is clicked again in the manage picker', () => {
    const { onConfirm } = renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    // ESV is already included, so it renders as a clickable "Already Selected" row now that
    // allowDeselect is on.
    fireEvent.click(screen.getByRole('button', { name: 'ESV' }));
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

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

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

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

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '%shareLayoutDialog_closePicker_label%' }));
    expect(screen.queryByRole('button', { name: 'NLT' })).not.toBeInTheDocument();
  });

  // Dismissing the inner modal has to leave the outer one usable. A nested dialog that takes the
  // outer dialog's focus trap or backdrop down with it still passes "the picker is gone".
  //
  // The `aria-hidden` assertions are the load-bearing half. `fireEvent.click` dispatches straight
  // at the node and goes through `pointer-events: none`, so a share dialog left inert by the
  // dismissed picker would still satisfy the confirm click below; what Radix actually leaves behind
  // on a botched teardown is the host marked hidden from assistive technology.
  //
  // Scoped to the host rather than to `<body>`: the host here is a real modal, as it is in the app,
  // so `body` legitimately keeps `pointer-events: none` for as long as the share dialog is open. A
  // `body`-level assertion would be asserting that the outer dialog had stopped being modal.
  it('leaves the share dialog usable after the manage picker is dismissed', () => {
    const { onConfirm } = renderContent();
    const hostContent = screen.getByTestId('host-dialog-content');

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    // The positive control: while the picker is open Radix hides the host from assistive
    // technology, so the assertion after dismissal can tell "correctly restored" apart from "never
    // set in the first place".
    expect(hostContent).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(screen.getByRole('button', { name: '%shareLayoutDialog_closePicker_label%' }));

    // The host is reachable again, and still modal in its own right.
    expect(hostContent).not.toHaveAttribute('aria-hidden');
    expect(document.body.style.pointerEvents).toBe('none');

    // The outer dialog's own controls still respond, and its state survived the round trip.
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));
    expect(onConfirm).toHaveBeenCalledWith(
      expect.objectContaining({ scriptureResources: [ESV, NIV] }),
    );
  });

  // The defect this fix was reported against is Manage Commentaries, not Manage Bible texts. Both
  // run through one code path that picks the label by tab, so this guards against a future split
  // of that path rather than a different bug today.
  it('opens the commentary manage picker as a modal too', () => {
    renderContent({ initialCommentaryResources: [IVP] });

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageCommentaryResources_label%',
    );
    fireEvent.click(manageButton);

    // Anchored on the picker's own title rather than a row: the commentary picker filters to
    // CommentaryResource, and this fixture's resources are all ScriptureResource, so it opens empty.
    const pickerTitle = screen.getByText('%resourcePicker_title%');
    expect(pickerTitle.closest('[data-slot="dialog-content"]')).not.toBeNull();
    expect(pickerTitle.closest('[data-slot="popover-content"]')).toBeNull();
    // The picker's own backdrop, not the host's — the host is a modal `DialogContent` here too.
    expect(getPickerOverlay()).toBeInTheDocument();
  });

  // `DialogContent` names its close button "Close" unless the caller passes `closeButtonLabel`, and
  // that default is a hardcoded English string. Asserting the absence of it is the load-bearing
  // half: a picker that forgets the prop still has a working close button, so testing only that it
  // closes would pass. The model-text picker has the same assertion in its own test.
  it('gives the manage pickers a localized close button', () => {
    renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    expect(
      screen.getByRole('button', { name: '%shareLayoutDialog_closePicker_label%' }),
    ).toBeInTheDocument();
    // Scoped to the picker's own content: the host dialog ships a close button too, and it takes
    // the English default, so an unscoped lookup would fail on a correctly labelled picker.
    expect(
      within(getPickerContent()).queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });

  // The same contract as the Manage pickers above, on the picker that closes this dialog rather
  // than staying open: the close button reaches the user by the localized name, never the English
  // default `DialogContent` falls back to.
  it('gives the model-text picker the same localized close button as the manage pickers', () => {
    renderContent({ initialModelText: undefined });

    fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));

    expect(
      screen.getByRole('button', { name: '%shareLayoutDialog_closePicker_label%' }),
    ).toBeInTheDocument();
    // See the manage-picker test above on why this is scoped to the picker: the host dialog ships
    // a close button too, and it keeps the English default.
    expect(
      within(getPickerContent()).queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '%shareLayoutDialog_closePicker_label%' }));
    expect(screen.queryByText('%resourcePicker_search_placeholder%')).not.toBeInTheDocument();
  });

  // Manage opens a second modal that sits OVER this dialog, rather than a popover anchored to its
  // trigger: a popover reads as a menu hanging off the dialog rather than the separate task it is,
  // and a narrow window pushes it off-screen. The negative assertions below are what hold that —
  // a popover would satisfy "the picker is showing" just as well.
  it('opens the resource picker as a modal dialog rather than a popover anchored to the button', () => {
    renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    const pickerRow = screen.getByRole('button', { name: 'NLT' });
    // A dialog surface with a backdrop, not a popover anchored to the trigger. The backdrop is what
    // makes it read as replacing this dialog rather than hanging off it.
    expect(pickerRow.closest('[data-slot="dialog-content"]')).not.toBeNull();
    expect(pickerRow.closest('[data-slot="popover-content"]')).toBeNull();
    expect(getPickerOverlay()).toBeInTheDocument();
  });

  // The backdrop above is only half the claim: an overlay that renders at the shared modal tier
  // paints *behind* the Share Layout dialog it is meant to cover, so the host stays bright while
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

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageCommentaryResources_label%',
    );
    fireEvent.click(manageButton);

    const searchBox = screen.getByPlaceholderText('%resourcePicker_search_placeholder%');
    // A positive control for the premise: without a disabled search box this test would be
    // asserting the fallback branch against a state that never reaches it.
    expect(searchBox).toBeDisabled();

    const closeButton = screen.getByRole('button', {
      name: '%shareLayoutDialog_closePicker_label%',
    });
    expect(closeButton).not.toHaveFocus();
    expect(
      screen.getByText('%resourcePicker_title%').closest('[data-slot="dialog-content"]'),
    ).toHaveFocus();
  });

  it('renders the Text Collection Resources section with a checkbox per scripture and commentary resource', () => {
    renderContent({ initialCommentaryResources: [IVP] });

    expect(
      screen.getByText('%shareLayoutDialog_textCollectionResources_label%'),
    ).toBeInTheDocument();

    // ESV, NIV (scripture) and IVP (commentary) each get a "shown by default" checkbox.
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('toggles isInTextCollection on a commentary resource without touching scripture resources', () => {
    const { onConfirm } = renderContent({ initialCommentaryResources: [IVP] });

    // Rows render scripture first (ESV, NIV), then commentary (IVP) — the third checkbox is IVP's.
    const [, , ivpCheckbox] = screen.getAllByRole('checkbox');
    fireEvent.click(ivpCheckbox);
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    const [result] = onConfirm.mock.calls[0];
    expect(result.commentaryResources).toContainEqual(
      expect.objectContaining({ id: 'ivp-uid', isInTextCollection: false }),
    );
    expect(result.scriptureResources).toEqual([ESV, NIV]);
  });
});
