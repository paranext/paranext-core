import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MOCK_RIBBONS_ALL, MOCK_RIBBONS_NONE } from '../../data/marble-form.story-data';
import {
  WarningRibbons,
  WARNING_RIBBONS_STRING_KEYS,
  type RibbonStates,
} from './warning-ribbons.component';

// MOCK_RIBBONS_* are structurally compatible with RibbonStates - no `as` cast needed.
const INITIAL_STATE: RibbonStates = MOCK_RIBBONS_ALL;

const localizedStrings = getLocalizedStrings([...WARNING_RIBBONS_STRING_KEYS]);

const meta: Meta<typeof WarningRibbons> = {
  title: 'Bundled Extensions/platform-enhanced-resources/WarningRibbons',
  component: WarningRibbons,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    resourceName: 'SDBH/SDBG',
  },
};
export default meta;

type Story = StoryObj<typeof WarningRibbons>;

/**
 * [Revised: 2026-04-29] Theme 4 — fully interactive default story. Reviewers toggle each ribbon via
 * the controls panel and exercise the dismiss buttons; dismissing flips `dismissed: true` so the
 * ribbon disappears (matches the production state model in ui-state-contracts.md).
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [state, setState] = useState<RibbonStates>(INITIAL_STATE);

    const set = (patch: Partial<RibbonStates>) => setState((prev) => ({ ...prev, ...patch }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            padding: 8,
            borderBottom: '1px solid #ccc',
            fontSize: 12,
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={state.missingBook}
              onChange={(e) => set({ missingBook: e.target.checked })}
            />{' '}
            missingBook
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.reviewStatus.visible && !state.reviewStatus.dismissed}
              onChange={(e) =>
                set({ reviewStatus: { visible: e.target.checked, dismissed: false } })
              }
            />{' '}
            reviewStatus (pre-release)
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.imageWarning}
              onChange={(e) => set({ imageWarning: e.target.checked })}
            />{' '}
            imageWarning
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.copyright.visible && !state.copyright.dismissed}
              onChange={(e) => set({ copyright: { visible: e.target.checked, dismissed: false } })}
            />{' '}
            copyright
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.updateRequiredData}
              onChange={(e) => set({ updateRequiredData: e.target.checked })}
            />{' '}
            metadataUpdateRequired
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.updateAvailable.visible && !state.updateAvailable.dismissed}
              onChange={(e) =>
                set({ updateAvailable: { visible: e.target.checked, dismissed: false } })
              }
            />{' '}
            updateAvailable
          </label>
        </div>

        <WarningRibbons
          localizedStringsWithLoadingState={[localizedStrings, false]}
          resourceName="SDBH/SDBG"
          ribbons={state}
          onDismissReviewStatus={() =>
            set({ reviewStatus: { visible: state.reviewStatus.visible, dismissed: true } })
          }
          onDismissCopyright={() =>
            set({ copyright: { visible: state.copyright.visible, dismissed: true } })
          }
          onDismissUpdateAvailable={() =>
            set({
              updateAvailable: { visible: state.updateAvailable.visible, dismissed: true },
            })
          }
          onCopyrightMoreInfo={() => alert('Phase-3-ui wires this to the CopyrightOverlay Dialog.')}
          onMetadataUpdate={() => alert('Phase-3-ui wires this to the metadata-update command.')}
        />
      </div>
    );
  },
};

/** None visible — unreachable as initial state from the interactive flow. */
export const None: Story = {
  args: {
    ribbons: MOCK_RIBBONS_NONE,
  },
};
