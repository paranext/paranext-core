import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DblResourceData } from 'platform-bible-utils';
import { Button } from '@/components/shadcn-ui/button';
import { WorkspaceShell } from '@/storybook/decorators/workspace-shell';
import {
  ModelTextPickerCommandPalette,
  ModelTextPickerModal,
  ModelTextPickerPopover,
} from './model-text-picker.component';
import { ModelTextPopulated } from './model-text-zero-state.component';
import {
  MODEL_TEXT_RESOURCES,
  SAMPLE_MODEL_TEXT_ID,
  SAMPLE_MODEL_TEXT_PARAGRAPH,
  SAMPLE_USER_LANGUAGES,
} from './model-text-zero-state.data';

// ---------------------------------------------------------------------------
// Shared column shell — a "populated" column behind the picker so reviewers can see
// the picker over a real-feeling workspace.
// ---------------------------------------------------------------------------

function PopulatedColumnBehindPicker({ resource }: { resource: DblResourceData }) {
  return (
    <ModelTextPopulated
      resource={resource}
      body={
        <>
          <p className="tw:mb-3 tw:text-xs tw:uppercase tw:tracking-wider tw:text-muted-foreground">
            John 1
          </p>
          <p>{SAMPLE_MODEL_TEXT_PARAGRAPH}</p>
        </>
      }
    />
  );
}

const initiallyPickedResource =
  MODEL_TEXT_RESOURCES.find((r) => r.dblEntryUid === SAMPLE_MODEL_TEXT_ID) ??
  MODEL_TEXT_RESOURCES[0];

const meta: Meta = {
  title: 'Advanced/ModelTextPicker',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Variant A — Modal + search + flat list
// ---------------------------------------------------------------------------

export const ModalVariant: Story = {
  name: 'A · Modal — focusing dialog',
  render: () => {
    function Inner() {
      const [open, setOpen] = useState(true);
      const [picked, setPicked] = useState<DblResourceData>(initiallyPickedResource);
      return (
        <WorkspaceShell columnIndex={1}>
          <div className="tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:text-xs tw:text-muted-foreground">
            (Editor column — not the picker target)
          </div>
          {open && (
            <ModelTextPickerModal
              allResources={MODEL_TEXT_RESOURCES}
              userLanguages={SAMPLE_USER_LANGUAGES}
              selectedResourceIds={[picked.dblEntryUid]}
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

// ---------------------------------------------------------------------------
// Variant B — Popover anchored to trigger
// ---------------------------------------------------------------------------

export const PopoverVariant: Story = {
  name: 'B · Popover — anchored to trigger',
  render: () => {
    function Inner() {
      const [picked, setPicked] = useState<DblResourceData>(initiallyPickedResource);
      return (
        <WorkspaceShell columnIndex={0}>
          <div className="tw:flex tw:h-full tw:w-full tw:flex-col">
            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:px-4 tw:py-2">
              <div className="tw:flex tw:items-center tw:gap-2">
                <span className="tw:text-sm tw:font-medium">{picked.displayName}</span>
                <span className="tw:text-xs tw:text-muted-foreground">{picked.fullName}</span>
              </div>
              <ModelTextPickerPopover
                defaultOpen
                trigger={
                  <Button size="sm" variant="outline">
                    Change…
                  </Button>
                }
                allResources={MODEL_TEXT_RESOURCES}
                userLanguages={SAMPLE_USER_LANGUAGES}
                selectedResourceIds={[picked.dblEntryUid]}
                onSelect={(r) => setPicked(r)}
                onClose={() => {}}
              />
            </div>
            <div className="tw:flex-1 tw:overflow-y-auto tw:px-6 tw:py-6 tw:text-sm tw:leading-relaxed">
              <p className="tw:mb-3 tw:text-xs tw:uppercase tw:tracking-wider tw:text-muted-foreground">
                John 1
              </p>
              <p>{SAMPLE_MODEL_TEXT_PARAGRAPH}</p>
            </div>
          </div>
        </WorkspaceShell>
      );
    }
    return <Inner />;
  },
};

// ---------------------------------------------------------------------------
// Variant C — Command palette (also carries the "project as model text" affordance)
// ---------------------------------------------------------------------------

export const CommandPaletteVariant: Story = {
  name: 'C · Command palette — keyboard-first',
  render: () => {
    function Inner() {
      const [open, setOpen] = useState(true);
      const [picked, setPicked] = useState<DblResourceData>(initiallyPickedResource);
      return (
        <WorkspaceShell columnIndex={0}>
          <PopulatedColumnBehindPicker resource={picked} />
          {open && (
            <ModelTextPickerCommandPalette
              allResources={MODEL_TEXT_RESOURCES}
              userLanguages={SAMPLE_USER_LANGUAGES}
              selectedResourceIds={[picked.dblEntryUid]}
              onSelect={(r) => {
                setPicked(r);
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
              onUseProjectAsModelText={() => {
                // Stub — opens the "named team members' projects" picker in the real app.
                // Story-only: log to console so reviewers can see the wire-up exists.
                // eslint-disable-next-line no-console
                console.log('Project-as-model-text affordance clicked');
                setOpen(false);
              }}
            />
          )}
        </WorkspaceShell>
      );
    }
    return <Inner />;
  },
};
