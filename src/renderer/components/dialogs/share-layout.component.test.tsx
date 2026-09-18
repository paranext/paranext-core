import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeAll } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import { Dialog } from 'platform-bible-react';
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
    <Dialog open>
      <ShareLayoutDialogContent
        initialModelText={undefined}
        initialActiveTab="ScriptureResource"
        initialScriptureResources={[ESV, NIV]}
        initialCommentaryResources={[]}
        initialIsStructureProtectedForTeam={false}
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
    </Dialog>,
  );
  return { onConfirm, onCancel };
}

describe('ShareLayoutDialogContent', () => {
  const SAVE_LABEL = '%shareLayoutDialog_saveForTeam_label%';
  const COMMENTARY_TAB = '%shareLayoutDialog_activeTab_commentaryResource%';

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

  it('adds a resource to the Bible texts list via the manage popover', () => {
    const { onConfirm } = renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    // The popover's ResourcePickerDialog renders NLT (not yet selected) as a clickable row.
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ type: 'dblResource', id: 'nlt-uid', name: 'NLT' }),
    );
  });

  it('does not render two elements with the same id when the manage popover is open', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    // Sanity-check the popover actually opened before asserting on ids.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('does not close the manage popover after selecting a resource', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));

    // The picker (and the now-included NLT row within it) should still be in the document.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();
  });

  it('removes an already-included resource when it is clicked again in the manage popover', () => {
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

  // This dialog embeds the picker twice — the per-tab manage popover and the model-text popover —
  // so a failed catalog fetch has to reach both. Wiring only one leaves the other reporting the
  // failure as an empty catalog.
  it('reports a failed catalog fetch in the manage popover instead of claiming there are no results', () => {
    renderContent({ allResources: [], hasResourcesError: true });

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument();
    expect(screen.queryByText('%resourcePicker_no_results%')).not.toBeInTheDocument();
  });

  it('reports a failed catalog fetch in the model-text popover too', () => {
    renderContent({ allResources: [], hasResourcesError: true, initialModelText: undefined });

    fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));

    expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument();
  });

  it('closes the manage popover when its close button is clicked', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('%shareLayoutDialog_closePicker_label%'));
    expect(screen.queryByRole('button', { name: 'NLT' })).not.toBeInTheDocument();
  });

  // The popover opens underneath a stationary cursor, so the close button renders already hovered
  // and Radix would show a tooltip unprompted — then, with the pointer never moving, no
  // pointerleave follows and it strands over the dialog. The button keeps its accessible name and
  // carries no hover tooltip.
  it('gives the picker close button an accessible name but no tooltip to strand', () => {
    renderContent();

    fireEvent.click(screen.getByText('%shareLayoutDialog_manageScriptureResources_label%'));

    expect(screen.getByLabelText('%shareLayoutDialog_closePicker_label%')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('titles the dialog as the team layout rather than as the act of sharing it', () => {
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
    expect(screen.getByText('%shareLayoutDialog_descriptionWithSync%')).toBeInTheDocument();
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

  // Column three's two resource types are tabs for the team, so they are tabs here. Only the open
  // tab's rows are mounted, which is the point: the column stops growing with the resource count.
  it('puts each resource type on its own tab and shows one tab at a time', () => {
    renderContent({ initialCommentaryResources: [IVP] });

    expect(screen.getByText('English Standard Version (ESV)')).toBeInTheDocument();
    expect(screen.queryByText('IVP Commentary')).not.toBeInTheDocument();

    showCommentaryTab();

    expect(screen.getByText('IVP Commentary')).toBeInTheDocument();
    expect(screen.queryByText('English Standard Version (ESV)')).not.toBeInTheDocument();
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

  // The team lock moved here from the editor toolbar, where it wrote the project setting on click.
  // In this dialog it is staged like everything else, so Cancel has to discard it.
  it('reports the edited team lock on confirm', () => {
    const { onConfirm } = renderContent({ initialIsStructureProtectedForTeam: false });

    fireEvent.click(screen.getByText('%shareLayoutDialog_teamLock_yes%'));
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.isStructureProtectedForTeam).toBe(true);
  });

  it('does not report the team lock at all when the dialog is cancelled', () => {
    const { onConfirm, onCancel } = renderContent({ initialIsStructureProtectedForTeam: false });

    fireEvent.click(screen.getByText('%shareLayoutDialog_teamLock_yes%'));
    fireEvent.click(screen.getByText('%shareLayoutDialog_cancel_label%'));

    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  // Radix clears a single-select ToggleGroup when the pressed item is pressed again. For a yes/no
  // that is not an answer, so the current one has to survive it.
  it('keeps the current team-lock answer when the pressed option is pressed again', () => {
    const { onConfirm } = renderContent({ initialIsStructureProtectedForTeam: true });

    fireEvent.click(screen.getByText('%shareLayoutDialog_teamLock_yes%'));
    fireEvent.click(screen.getByText(SAVE_LABEL));

    const [result] = onConfirm.mock.calls[0];
    expect(result.isStructureProtectedForTeam).toBe(true);
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

    fireEvent.click(screen.getByText('%shareLayoutDialog_modelText_none%'));

    expect(screen.getByTestId('resource-picker-scrim')).toBeInTheDocument();
  });
});
