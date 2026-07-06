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

  it('removes a resource from the Bible Texts list when its remove button is clicked', () => {
    const { onConfirm } = renderContent();

    fireEvent.click(screen.getAllByLabelText('%shareLayoutDialog_removeResource_label%')[0]);
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).not.toContainEqual(
      expect.objectContaining({ id: 'esv-uid' }),
    );
    expect(result.scriptureResources).toContainEqual(expect.objectContaining({ id: 'niv-uid' }));
  });

  it('toggles isResourceShownByDefault when the checkbox for a resource is toggled', () => {
    const { onConfirm } = renderContent();

    // Resources are sorted with isResourceShownByDefault ones first, so ESV (shown by default) is
    // index 0 and NIV (not shown by default) is index 1. NIV starts unchecked; toggling flips it to
    // true.
    const [, nivCheckbox] = screen.getAllByRole('checkbox');
    fireEvent.click(nivCheckbox);
    fireEvent.click(screen.getByText('%shareLayoutDialog_confirm_label%'));

    const [result] = onConfirm.mock.calls[0];
    expect(result.scriptureResources).toContainEqual(
      expect.objectContaining({ id: 'niv-uid', isResourceShownByDefault: true }),
    );
  });
});
