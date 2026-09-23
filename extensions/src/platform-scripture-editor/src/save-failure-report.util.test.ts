import { describe, expect, it } from 'vitest';
import {
  classifySaveFailure,
  clearOutstandingSaveFailure,
  createSaveFailureMemory,
  planSaveFailureResponse,
  SaveFailureKind,
  SaveFailureMemory,
  shouldReportSaveFailure,
} from './save-failure-report.util';

/** A memory already holding `lastReportedKind`, for a case that starts mid-run. */
function memoryHolding(lastReportedKind: SaveFailureKind | undefined): SaveFailureMemory {
  return { lastReportedKind };
}

describe('classifySaveFailure', () => {
  it('recognizes a Send/Receive edit block', () => {
    expect(classifySaveFailure('write refused (SR_EDIT_BLOCKED) during sync')).toBe(
      'syncEditBlocked',
    );
  });

  it('recognizes a permissions failure', () => {
    expect(classifySaveFailure('Permissions exception for projectId abc123')).toBe('permissions');
  });

  it('classifies a chapterization rejection as unknown', () => {
    expect(
      classifySaveFailure('Text: MyProject Book: GEN\nMultiple chapter markers present.'),
    ).toBe('unknown');
  });

  it('classifies a wrong-chapter-number rejection as unknown', () => {
    expect(classifySaveFailure('Text: MyProject Book: GEN\nWrong chapter number')).toBe('unknown');
  });
});

describe('shouldReportSaveFailure', () => {
  it('reports the first failure', () => {
    expect(shouldReportSaveFailure('unknown', undefined)).toBe(true);
  });

  it('does not re-report the same failure while it keeps happening', () => {
    expect(shouldReportSaveFailure('unknown', 'unknown')).toBe(false);
  });

  it('reports again when the failure changes kind', () => {
    expect(shouldReportSaveFailure('permissions', 'unknown')).toBe(true);
  });

  // A run of identical rejections reports once, but a success in between clears the memory, so the
  // SAME kind striking again afterwards is news rather than a repeat.
  it('reports the same kind again once a success has cleared the memory', () => {
    expect(shouldReportSaveFailure('unknown', 'unknown')).toBe(false);
    expect(shouldReportSaveFailure('unknown', undefined)).toBe(true);
  });
});

describe('planSaveFailureResponse', () => {
  const SYNC_BLOCKED = 'write refused (SR_EDIT_BLOCKED) during sync';
  const PERMISSIONS = 'Permissions exception for projectId abc123';
  const CHAPTERIZATION = 'Text: MyProject Book: GEN\nMultiple chapter markers present.';

  it('decides the revert with nothing to await', () => {
    // The caller has to restore the PDP's document BEFORE it awaits the notification: awaiting
    // first yields long enough for a newer delivery to reach the editor and be overwritten.
    const plan = planSaveFailureResponse(createSaveFailureMemory(), SYNC_BLOCKED);
    expect(plan).not.toBeInstanceOf(Promise);
    expect(plan.shouldRevert).toBe(true);
  });

  it('never reverts an unrecognized rejection, first time or repeating', () => {
    expect(planSaveFailureResponse(createSaveFailureMemory(), CHAPTERIZATION).shouldRevert).toBe(
      false,
    );
    expect(planSaveFailureResponse(memoryHolding('unknown'), CHAPTERIZATION).shouldRevert).toBe(
      false,
    );
  });

  it('reverts a recoverable rejection on EVERY occurrence, reported or not', () => {
    const firstBlock = planSaveFailureResponse(createSaveFailureMemory(), SYNC_BLOCKED);
    expect(firstBlock).toEqual({ kind: 'syncEditBlocked', shouldReport: true, shouldRevert: true });

    // The same rejection again: the toast is deduplicated, but the editor must still be restored.
    const repeatBlock = planSaveFailureResponse(memoryHolding('syncEditBlocked'), SYNC_BLOCKED);
    expect(repeatBlock).toEqual({
      kind: 'syncEditBlocked',
      shouldReport: false,
      shouldRevert: true,
    });

    const repeatPermissions = planSaveFailureResponse(memoryHolding('permissions'), PERMISSIONS);
    expect(repeatPermissions).toEqual({
      kind: 'permissions',
      shouldReport: false,
      shouldRevert: true,
    });
  });

  it('reports again when the failure changes kind', () => {
    expect(planSaveFailureResponse(memoryHolding('unknown'), PERMISSIONS)).toEqual({
      kind: 'permissions',
      shouldReport: true,
      shouldRevert: true,
    });
    expect(planSaveFailureResponse(memoryHolding('permissions'), CHAPTERIZATION)).toEqual({
      kind: 'unknown',
      shouldReport: true,
      shouldRevert: false,
    });
  });
});

// The memory's lifecycle, which is the half that decides whether a user ever sees a failing
// chapter: what suppresses a repeat report is also the only thing that knows when to stop
// suppressing, and the `duration: 0` notice raised for a suppressed run stays on screen until a
// completed write takes it down.
describe('the save-failure memory across a run of saves', () => {
  const SYNC_BLOCKED = 'write refused (SR_EDIT_BLOCKED) during sync';
  const PERMISSIONS = 'Permissions exception for projectId abc123';
  const CHAPTERIZATION = 'Text: MyProject Book: GEN\nMultiple chapter markers present.';

  it('starts with nothing outstanding', () => {
    expect(createSaveFailureMemory().lastReportedKind).toBeUndefined();
  });

  it('reports a run of identical rejections exactly once', () => {
    const memory = createSaveFailureMemory();
    const reports = [CHAPTERIZATION, CHAPTERIZATION, CHAPTERIZATION].map(
      (message) => planSaveFailureResponse(memory, message).shouldReport,
    );
    expect(reports).toEqual([true, false, false]);
  });

  it('records the kind it said to report, and only that kind', () => {
    const memory = createSaveFailureMemory();
    planSaveFailureResponse(memory, PERMISSIONS);
    expect(memory.lastReportedKind).toBe('permissions');
    // Suppressed, so there is nothing new to remember.
    planSaveFailureResponse(memory, PERMISSIONS);
    expect(memory.lastReportedKind).toBe('permissions');
    planSaveFailureResponse(memory, CHAPTERIZATION);
    expect(memory.lastReportedKind).toBe('unknown');
  });

  // The failure mode this guards: the notice is raised once per run and stays up under a stable id,
  // so a write that completes without clearing the memory would leave a stale "could not be saved"
  // toast on screen AND leave the next rejection of the same kind unreported.
  it('takes the notice down and re-arms reporting once a write completes', () => {
    const memory = createSaveFailureMemory();
    expect(planSaveFailureResponse(memory, CHAPTERIZATION).shouldReport).toBe(true);
    expect(planSaveFailureResponse(memory, CHAPTERIZATION).shouldReport).toBe(false);

    expect(clearOutstandingSaveFailure(memory)).toBe(true);
    expect(memory.lastReportedKind).toBeUndefined();

    expect(planSaveFailureResponse(memory, CHAPTERIZATION).shouldReport).toBe(true);
  });

  it('does not ask the caller to dismiss a notice it never raised', () => {
    const memory = createSaveFailureMemory();
    // Nothing has failed yet.
    expect(clearOutstandingSaveFailure(memory)).toBe(false);

    planSaveFailureResponse(memory, SYNC_BLOCKED);
    expect(clearOutstandingSaveFailure(memory)).toBe(true);
    // Already cleared by the write before this one.
    expect(clearOutstandingSaveFailure(memory)).toBe(false);
  });

  it('keeps reverting a recoverable rejection while its report stays suppressed', () => {
    const memory = createSaveFailureMemory();
    const plans = [SYNC_BLOCKED, SYNC_BLOCKED, SYNC_BLOCKED].map((message) =>
      planSaveFailureResponse(memory, message),
    );
    expect(plans.map((plan) => plan.shouldReport)).toEqual([true, false, false]);
    expect(plans.map((plan) => plan.shouldRevert)).toEqual([true, true, true]);
  });
});
