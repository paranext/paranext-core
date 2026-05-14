import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DblResourceData } from 'platform-bible-utils';
import { WorkspaceShell } from '@/storybook/decorators/workspace-shell';
import {
  ModelTextPopulated,
  ModelTextZeroStateIllustrated,
  ModelTextZeroStateInline,
  ModelTextZeroStateSetupPanel,
} from './model-text-zero-state.component';
import {
  ModelTextPickerCommandPalette,
  ModelTextPickerModal,
} from './model-text-picker.component';
import {
  MODEL_TEXT_RESOURCES,
  SAMPLE_MODEL_TEXT_ID,
  SAMPLE_MODEL_TEXT_PARAGRAPH,
  SAMPLE_USER_LANGUAGES,
} from './model-text-zero-state.data';

const meta: Meta = {
  title: 'Advanced/ModelTextZeroState',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj;

const initiallyPickedResource =
  MODEL_TEXT_RESOURCES.find((r) => r.dblEntryUid === SAMPLE_MODEL_TEXT_ID) ?? MODEL_TEXT_RESOURCES[0];

// ---------------------------------------------------------------------------
// Zero state, picker CLOSED — one story per variant
// ---------------------------------------------------------------------------

export const IllustratedZeroState: Story = {
  name: 'A · Illustrated — picker closed',
  render: () => (
    <WorkspaceShell columnIndex={0}>
      <ModelTextZeroStateIllustrated onOpenPicker={() => {}} />
    </WorkspaceShell>
  ),
};

export const InlineZeroState: Story = {
  name: 'B · Inline prompt — picker closed',
  render: () => (
    <WorkspaceShell columnIndex={0}>
      <ModelTextZeroStateInline onOpenPicker={() => {}} />
    </WorkspaceShell>
  ),
};

export const SetupPanelZeroState: Story = {
  name: 'C · Setup panel — picker closed (inline picker visible by design)',
  render: () => (
    <WorkspaceShell columnIndex={0}>
      <ModelTextZeroStateSetupPanel
        allResources={MODEL_TEXT_RESOURCES}
        userLanguages={SAMPLE_USER_LANGUAGES}
        selectedResourceIds={[]}
        onSelect={() => {}}
      />
    </WorkspaceShell>
  ),
};

// ---------------------------------------------------------------------------
// Zero state, picker OPEN — pair each variant with a picker variant
// ---------------------------------------------------------------------------

/**
 * Pairing: Illustrated zero state + Modal picker. The editorial onboarding moment hands off
 * to a focusing modal — most aligned with the "deliberate, considered choice" framing.
 */
export const IllustratedWithPickerOpen: Story = {
  name: 'A · Illustrated — modal picker open',
  render: () => {
    function Inner() {
      const [open, setOpen] = useState(true);
      const [picked, setPicked] = useState<DblResourceData | undefined>(undefined);
      return (
        <WorkspaceShell columnIndex={0}>
          <ModelTextZeroStateIllustrated onOpenPicker={() => setOpen(true)} />
          {open && (
            <ModelTextPickerModal
              allResources={MODEL_TEXT_RESOURCES}
              userLanguages={SAMPLE_USER_LANGUAGES}
              selectedResourceIds={picked ? [picked.dblEntryUid] : []}
              onSelect={(r) => {
                setPicked(r);
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
            />
          )}
        </WorkspaceShell>
      );
    }
    return <Inner />;
  },
};

/**
 * Pairing: Inline prompt zero state + Modal picker. The inline prompt is a low-key handoff;
 * the modal then takes over for the actual choice. Keeps the moment-of-decision focused.
 */
export const InlineWithPickerOpen: Story = {
  name: 'B · Inline prompt — modal picker open',
  render: () => {
    function Inner() {
      const [open, setOpen] = useState(true);
      const [picked, setPicked] = useState<DblResourceData | undefined>(undefined);
      return (
        <WorkspaceShell columnIndex={0}>
          <ModelTextZeroStateInline onOpenPicker={() => setOpen(true)} />
          {open && (
            <ModelTextPickerModal
              allResources={MODEL_TEXT_RESOURCES}
              userLanguages={SAMPLE_USER_LANGUAGES}
              selectedResourceIds={picked ? [picked.dblEntryUid] : []}
              onSelect={(r) => {
                setPicked(r);
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
            />
          )}
        </WorkspaceShell>
      );
    }
    return <Inner />;
  },
};

/**
 * Pairing: Setup panel + Command palette. The setup panel already shows a ranked list inline,
 * so the "picker open" variant for it demonstrates a Cmd-K layered on top — i.e. the
 * panel is the lightweight path, the palette is the power-user shortcut from the same column.
 */
export const SetupPanelWithPickerOpen: Story = {
  name: 'C · Setup panel — command palette open',
  render: () => {
    function Inner() {
      const [open, setOpen] = useState(true);
      const [picked, setPicked] = useState<DblResourceData | undefined>(undefined);
      return (
        <WorkspaceShell columnIndex={0}>
          <ModelTextZeroStateSetupPanel
            allResources={MODEL_TEXT_RESOURCES}
            userLanguages={SAMPLE_USER_LANGUAGES}
            selectedResourceIds={picked ? [picked.dblEntryUid] : []}
            onSelect={(r) => setPicked(r)}
          />
          {open && (
            <ModelTextPickerCommandPalette
              allResources={MODEL_TEXT_RESOURCES}
              userLanguages={SAMPLE_USER_LANGUAGES}
              selectedResourceIds={picked ? [picked.dblEntryUid] : []}
              onSelect={(r) => {
                setPicked(r);
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
              onUseProjectAsModelText={() => setOpen(false)}
            />
          )}
        </WorkspaceShell>
      );
    }
    return <Inner />;
  },
};

// ---------------------------------------------------------------------------
// Populated — proves the column has content after picker selection
// ---------------------------------------------------------------------------

export const Populated: Story = {
  name: 'Populated — after selection',
  render: () => (
    <WorkspaceShell columnIndex={0}>
      <ModelTextPopulated
        resource={initiallyPickedResource}
        onChange={() => {}}
        body={
          <>
            <p className="tw:mb-3 tw:text-xs tw:uppercase tw:tracking-wider tw:text-muted-foreground">
              John 1
            </p>
            <p>{SAMPLE_MODEL_TEXT_PARAGRAPH}</p>
          </>
        }
      />
    </WorkspaceShell>
  ),
};
