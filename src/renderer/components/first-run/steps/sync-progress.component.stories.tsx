import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useMemo } from 'react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import type { SyncProgressDetail, SyncProgressEvent } from 'paratext-bible-send-receive';
import { FirstRunStepProps } from '../first-run-step-props.model';
import { SyncProgressStep } from './sync-progress.component';

// The real step renders only from live Send/Receive network events, which have no PAPI backend in
// Storybook (this is why the shell story stubs it — see first-run-shell.stories.tsx). Rather than
// mock PAPI, these stories use the step's injectable event-source props: each story owns a local
// PlatformEventEmitter pair (NOT the process-wide network bus) and pushes a fixed event script into
// it, so every story instance is fully isolated even when rendered together on the autodocs page.

/** A fixed sequence of events to drive one story into a target visual state. */
type SyncScript = {
  /** `isSyncing` values emitted on `onSyncStateChanged`, in order. */
  state?: boolean[];
  /** Progress details emitted on `onSyncProgress`, in order. */
  progress?: SyncProgressDetail[];
};

/** Wraps the step with its own isolated emitters and replays `script` once after it subscribes. */
function DrivenSyncProgressStep({
  script,
  ...stepProps
}: FirstRunStepProps & { script: SyncScript }) {
  // One emitter pair per mounted instance → isolation from any other instance on the same page.
  const emitters = useMemo(
    () => ({
      state: new PlatformEventEmitter<SyncProgressEvent>(),
      progress: new PlatformEventEmitter<SyncProgressDetail>(),
    }),
    [],
  );
  // `PlatformEventEmitter.event` is a memoized getter that returns the same subscriber reference on
  // every access, so these props stay reference-stable without extra memoization (a changing event
  // reference would make the step's useEvent tear down and re-subscribe).
  const stateEvent = emitters.state.event;
  const progressEvent = emitters.progress.event;

  useEffect(() => {
    // A parent's effect runs AFTER its children's effects, so by now the step's useEvent listeners
    // are attached and these emits reach them. Replaying the same script on a StrictMode remount is
    // harmless: the scripts are idempotent and land the step in the same terminal state.
    script.progress?.forEach((detail) => emitters.progress.emit(detail));
    script.state?.forEach((isSyncing) => emitters.state.emit({ isSyncing }));
  }, [emitters, script]);

  return (
    <SyncProgressStep
      {...stepProps}
      onSyncStateChangedEvent={stateEvent}
      onSyncProgressEvent={progressEvent}
    />
  );
}

const meta: Meta<typeof DrivenSyncProgressStep> = {
  title: 'First run/SyncProgressStep',
  component: DrivenSyncProgressStep,
  tags: ['autodocs'],
  args: { onNext: () => undefined, setCanProceed: () => undefined },
};
export default meta;

type Story = StoryObj<typeof DrivenSyncProgressStep>;

/**
 * Sync has started but no progress detail has arrived yet — the step shows the indeterminate
 * spinner and keeps Next disabled (`setCanProceed(false)`). Emitting `isSyncing: true` (rather than
 * no events at all) both models this "starting" state and suppresses the component's 30 s recovery
 * timeout, so the story stays on this state instead of flipping to "complete" while left open.
 */
export const Default: Story = {
  args: { script: { state: [true] } },
};

/**
 * Sync is under way: a determinate progress bar (50%) with the current item name. Next stays
 * disabled until a full sync cycle completes.
 */
export const MidSync: Story = {
  args: { script: { state: [true], progress: [{ progressText: 'GreekNT', progressValue: 0.5 }] } },
};

/**
 * Sync finished (`isSyncing` went true → false): the completion heading is shown and Next is
 * enabled (`setCanProceed(true)`).
 */
export const AllDone: Story = {
  args: { script: { state: [true, false] } },
};

/**
 * Two projects in progress: GreekNT finished, TPTS is currently syncing at 75%. Demonstrates row
 * accumulation — each unique `progressText` in a determinate event creates a new row, and the
 * previous row flips to done when the next project arrives.
 *
 * Terminal state (all events emitted synchronously on mount):
 *
 * - GreekNT row: done (✓)
 * - TPTS row: syncing (spinner), global bar at 75 %
 */
export const MultiProject: Story = {
  args: {
    script: {
      state: [true],
      progress: [
        { progressText: 'GreekNT', progressValue: 0.1 },
        { progressText: 'GreekNT', progressValue: 0.5 },
        { progressText: 'TPTS', progressValue: 0.75 },
      ],
    },
  },
};

/**
 * Sync finished after two projects. Shows the completion heading with both project rows marked done
 * (✓). Demonstrates that rows persist into the completion state.
 *
 * Terminal state:
 *
 * - Completion heading shown
 * - GreekNT row: done (✓)
 * - TPTS row: done (✓)
 */
export const AllDoneWithProjects: Story = {
  args: {
    script: {
      state: [true, false],
      progress: [
        { progressText: 'GreekNT', progressValue: 0.3 },
        { progressText: 'TPTS', progressValue: 0.7 },
      ],
    },
  },
};
