import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { type ComponentType, useEffect, useMemo, useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { SyncStatusButton } from './sync-status-button.component';
// Deep relative (not aliased) so the story drives the webpack-aliased `useSyncStatus` mock without
// pulling it into tsc typecheck. Mirrors how the first-run steps reach `.storybook/*` helpers.
import {
  type SyncStatusMock,
  SyncStatusMockContext,
} from '../../../.storybook/mocks/sync-status-mock-channel';

// The button reads nothing but `useSyncStatus()`, and in Storybook that hook has no Send/Receive
// backend to derive a status from — so every state below is reached by naming the hook's return
// value through `.storybook/mocks/use-sync-status.hook.ts` rather than by giving the component props
// it does not have in the app. `Cancelling…` is the one state the hook cannot express (the button
// owns it, entered by clicking Cancel): the Storybook command stub leaves `cancelSync` outstanding,
// which is also what a real accepted cancel looks like until Send/Receive reaches a stopping point.

const ONE_PROJECT = [{ projectId: 'proj-hnf', name: 'HNF' }];

const SEVERAL_PROJECTS = [
  { projectId: 'proj-hnf', name: 'HNF' },
  { projectId: 'proj-tpts', name: 'TPTS' },
  { projectId: 'proj-web', name: 'WEB' },
];

/** Long enough to clip inside the button's 180px cap, so the truncation tooltip is exercisable. */
const LONG_NAME_PROJECT = [
  { projectId: 'proj-long', name: 'Hunde New Testament and Portions Revision' },
];

/**
 * Each story wraps the button in its own provider so stories rendered together on the autodocs page
 * each read their own status. The value is built outside the render function to keep its identity
 * stable across re-renders.
 */
function withSyncStatus(mock: SyncStatusMock) {
  return function StoryDecorator(Story: ComponentType) {
    return (
      <SyncStatusMockContext.Provider value={mock}>
        <Story />
      </SyncStatusMockContext.Provider>
    );
  };
}

/** How long the story below leaves the sync running after Cancel is clicked. */
const CANCEL_TAKES_EFFECT_MS = 600;

/**
 * Drives the one sequence a fixed mock cannot express: a sync that is running, then ends as a
 * non-success once the cancel takes effect. The button reads the two together — its own pending
 * request plus the non-success outcome — to report a cancellation rather than a failure, so both
 * halves have to happen in order for that state to exist.
 */
function withSyncEndingAfterCancel(syncingProjects: SyncStatusMock['syncingProjects']) {
  return function StoryDecorator(Story: ComponentType) {
    const [hasEnded, setHasEnded] = useState(false);
    useEffect(() => {
      const timeout = setTimeout(() => setHasEnded(true), CANCEL_TAKES_EFFECT_MS);
      return () => clearTimeout(timeout);
    }, []);
    const mock = useMemo<SyncStatusMock>(
      () =>
        hasEnded
          ? { status: 'failed', syncingProjects: [] }
          : { status: 'syncing', syncingProjects },
      // `syncingProjects` is the decorator factory's own argument, fixed for the story's lifetime.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [hasEnded],
    );
    return (
      <SyncStatusMockContext.Provider value={mock}>
        <Story />
      </SyncStatusMockContext.Provider>
    );
  };
}

const meta: Meta<typeof SyncStatusButton> = {
  title: 'Advanced/SyncStatusButton',
  component: SyncStatusButton,
  tags: ['autodocs'],
  decorators: [
    // Stands in for the toolbar: the button is sized to shrink and truncate inside a bar, so
    // reviewing it outside one would hide the clipping it is designed for.
    (Story) => (
      <div className="tw:flex tw:h-14 tw:w-[420px] tw:items-center tw:justify-end tw:gap-1 tw:rounded-md tw:border tw:bg-background tw:px-2">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SyncStatusButton>;

/** Clicks the button, which is what opens the popover — it has no controlled `open` prop. */
const openPopover: NonNullable<Story['play']> = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByTestId('toolbar-sync-button'));
};

/**
 * Nothing has synced this session and nothing is running: the resting "Sync" label behind the sync
 * glyph. Every state carries an icon, because the label is capped and truncates — a squeezed
 * toolbar would otherwise leave this control a clipped word with nothing identifying it.
 */
export const Idle: Story = {
  decorators: [withSyncStatus({ status: 'idle', syncingProjects: [] })],
};

/**
 * A sync is running but its projects are not knowable — a Send/Receive build predating
 * `syncingProjectIds`, or a state read that failed. The bare "Syncing" is the honest label; naming
 * a guessed project is the untruthfulness this control exists to remove.
 */
export const SyncingUnknownProjects: Story = {
  decorators: [withSyncStatus({ status: 'syncing', syncingProjects: [] })],
};

/** One project syncing, named in the label. */
export const SyncingOneProject: Story = {
  decorators: [withSyncStatus({ status: 'syncing', syncingProjects: ONE_PROJECT })],
};

/** Several projects syncing: the label counts them rather than listing them in the bar. */
export const SyncingSeveralProjects: Story = {
  decorators: [withSyncStatus({ status: 'syncing', syncingProjects: SEVERAL_PROJECTS })],
};

/** The last sync finished and every project in it succeeded. */
export const Synced: Story = {
  decorators: [withSyncStatus({ status: 'synced', syncingProjects: [] })],
};

/**
 * The last sync finished with at least one project that did not succeed, and nobody asked for it to
 * stop. Send/Receive reports a user-cancelled sync the same way — its unfinished projects get a
 * non-success result rather than a cancellation of their own — so `Cancelled` below is this state
 * plus the button's own knowledge that it made the request.
 */
export const Failed: Story = {
  decorators: [withSyncStatus({ status: 'failed', syncingProjects: [] })],
};

/**
 * The sync the user cancelled has now stopped. Reported as a cancellation, muted rather than in
 * destructive red: the sync did not go wrong, it was stopped on request, and colouring it as an
 * error reports the user's own click back to them as a fault. Send/Receive carries no `cancelled`
 * result status, so this control's pending request is the only thing separating the two.
 */
export const Cancelled: Story = {
  decorators: [withSyncEndingAfterCancel(ONE_PROJECT)],
  play: async (context) => {
    await openPopover(context);
    // Radix portals the popover content to `document.body`, so it is outside the story canvas.
    await userEvent.click(within(document.body).getByTestId('toolbar-sync-cancel-button'));
  },
};

/**
 * The status could not be read at all. Deliberately not `idle`: "nothing has synced" would be a
 * positive claim resting on a read that never answered — which is what the question-mark icon says,
 * in place of `Idle`'s sync glyph.
 */
export const Unknown: Story = {
  decorators: [withSyncStatus({ status: 'unknown', syncingProjects: [] })],
};

/**
 * A project name too long for the button, so the label truncates instead of pushing its toolbar
 * neighbours off the bar. Hover it to see the tooltip that keeps the full name recoverable — the
 * tooltip appears only while the label is actually clipped.
 */
export const TruncatedProjectName: Story = {
  decorators: [withSyncStatus({ status: 'syncing', syncingProjects: LONG_NAME_PROJECT })],
};

/** Popover during a sync: the projects by name, Cancel sync, and the way through to the details. */
export const PopoverSyncing: Story = {
  decorators: [withSyncStatus({ status: 'syncing', syncingProjects: SEVERAL_PROJECTS })],
  play: openPopover,
};

/** Popover during a sync whose projects are unknown: the bare "Syncing" line in place of the list. */
export const PopoverSyncingUnknownProjects: Story = {
  decorators: [withSyncStatus({ status: 'syncing', syncingProjects: [] })],
  play: openPopover,
};

/** Popover while idle: no Cancel, since there is nothing to cancel. */
export const PopoverIdle: Story = {
  decorators: [withSyncStatus({ status: 'idle', syncingProjects: [] })],
  play: openPopover,
};

/** Popover after a successful sync. */
export const PopoverSynced: Story = {
  decorators: [withSyncStatus({ status: 'synced', syncingProjects: [] })],
  play: openPopover,
};

/** Popover after a sync that did not succeed — the case "View sync details" exists for. */
export const PopoverFailed: Story = {
  decorators: [withSyncStatus({ status: 'failed', syncingProjects: [] })],
  play: openPopover,
};

/** Popover when the status is unreadable: it says so rather than claiming no sync is running. */
export const PopoverUnknown: Story = {
  decorators: [withSyncStatus({ status: 'unknown', syncingProjects: [] })],
  play: openPopover,
};

/**
 * Cancel has been clicked and the request accepted, so the button reads "Cancelling…" and is
 * `aria-disabled` (not `disabled`, which would drop focus out of this non-modal popover). The sync
 * keeps reporting `syncing` meanwhile, because a cancel only takes effect when Send/Receive reaches
 * a stopping point.
 */
export const Cancelling: Story = {
  decorators: [withSyncStatus({ status: 'syncing', syncingProjects: ONE_PROJECT })],
  play: async (context) => {
    await openPopover(context);
    // Radix portals the popover content to `document.body`, so it is outside the story canvas.
    await userEvent.click(within(document.body).getByTestId('toolbar-sync-cancel-button'));
  },
};
