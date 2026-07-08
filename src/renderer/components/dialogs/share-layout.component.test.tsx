import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import { Dialog } from 'platform-bible-react';
import { ShareLayoutDialogContent } from './share-layout.component';

const ESV: ResourceReference = {
  type: 'dblResource',
  name: 'ESV',
  id: 'esv-uid',
  isResourceShownByDefault: true,
};
const NIV: ResourceReference = { type: 'dblResource', name: 'NIV', id: 'niv-uid' };

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
        allResources={ALL_RESOURCES}
        isResourcesLoading={false}
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

  it('toggles isResourceShownByDefault when the checkbox for a resource is toggled', () => {
    const { onConfirm } = renderContent();

    // Rows render in array order (ESV, then NIV) — no sorting. NIV starts unchecked; toggling
    // flips it to true.
    const [, nivCheckbox] = screen.getAllByRole('checkbox');
    fireEvent.click(nivCheckbox);
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ id: 'niv-uid', isResourceShownByDefault: true }),
    );
  });

  it('adds a resource to the Bible Texts list via the manage popover', () => {
    const { onConfirm } = renderContent();

    // The Bible Texts card is rendered first, so its manage button is the first match.
    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    // The popover's ResourcePickerDialog renders NLT (not yet selected) as a clickable row.
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ type: 'dblResource', id: 'nlt-uid', name: 'NLT' }),
    );
  });

  it('does not render two elements with the same id when the manage popover is open', () => {
    renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);

    // Sanity-check the popover actually opened before asserting on ids.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('does not close the manage popover after selecting a resource', () => {
    renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);
    fireEvent.click(screen.getByRole('button', { name: 'NLT' }));

    // The picker (and the now-included NLT row within it) should still be in the document.
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();
  });

  it('removes an already-included resource when it is clicked again in the manage popover', () => {
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

  it('closes the manage popover when its close button is clicked', () => {
    renderContent();

    const [manageButton] = screen.getAllByText(
      '%shareLayoutDialog_manageScriptureResources_label%',
    );
    fireEvent.click(manageButton);
    expect(screen.getByRole('button', { name: 'NLT' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('%shareLayoutDialog_closePicker_label%'));
    expect(screen.queryByRole('button', { name: 'NLT' })).not.toBeInTheDocument();
  });
});
