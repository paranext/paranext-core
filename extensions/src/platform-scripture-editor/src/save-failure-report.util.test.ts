import { describe, expect, it } from 'vitest';
import {
  classifySaveFailure,
  clearOutstandingSaveFailure,
  createSaveFailureMemory,
  planSaveFailureResponse,
  SaveFailureMemory,
  shouldReportSaveFailure,
} from './save-failure-report.util';

/** A memory whose "could not be saved" notice is, or is not, still outstanding. */
function memoryWith(isUnknownFailureOutstanding: boolean): SaveFailureMemory {
  return { isUnknownFailureOutstanding };
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
  it('reports the first rejection it cannot name', () => {
    expect(shouldReportSaveFailure('unknown', false)).toBe(true);
  });

  it('does not re-report a rejection it cannot name while its notice is still up', () => {
    expect(shouldReportSaveFailure('unknown', true)).toBe(false);
  });

  // Each of these is its own transient notice, raised on every occurrence.
  it.each(['syncEditBlocked', 'permissions'] as const)('always reports %s', (kind) => {
    expect(shouldReportSaveFailure(kind, false)).toBe(true);
    expect(shouldReportSaveFailure(kind, true)).toBe(true);
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
    expect(planSaveFailureResponse(memoryWith(true), CHAPTERIZATION).shouldRevert).toBe(false);
  });

  it('reports and reverts a recoverable rejection on every occurrence', () => {
    const memory = createSaveFailureMemory();
    const plans = [SYNC_BLOCKED, SYNC_BLOCKED, PERMISSIONS, PERMISSIONS].map((message) =>
      planSaveFailureResponse(memory, message),
    );
    expect(plans).toEqual([
      { kind: 'syncEditBlocked', shouldReport: true, shouldRevert: true },
      { kind: 'syncEditBlocked', shouldReport: true, shouldRevert: true },
      { kind: 'permissions', shouldReport: true, shouldRevert: true },
      { kind: 'permissions', shouldReport: true, shouldRevert: true },
    ]);
  });

  it('still reports a recoverable rejection while a "could not be saved" notice is up', () => {
    expect(planSaveFailureResponse(memoryWith(true), PERMISSIONS).shouldReport).toBe(true);
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
    expect(createSaveFailureMemory().isUnknownFailureOutstanding).toBe(false);
  });

  it('reports a run of rejections it cannot name exactly once', () => {
    const memory = createSaveFailureMemory();
    const reports = [CHAPTERIZATION, CHAPTERIZATION, CHAPTERIZATION].map(
      (message) => planSaveFailureResponse(memory, message).shouldReport,
    );
    expect(reports).toEqual([true, false, false]);
  });

  it('remembers only a rejection it cannot name', () => {
    const memory = createSaveFailureMemory();
    planSaveFailureResponse(memory, SYNC_BLOCKED);
    planSaveFailureResponse(memory, PERMISSIONS);
    expect(memory.isUnknownFailureOutstanding).toBe(false);
    planSaveFailureResponse(memory, CHAPTERIZATION);
    expect(memory.isUnknownFailureOutstanding).toBe(true);
  });

  // The notice is raised once per run and stays up under a stable id, so a write that completes
  // without clearing the memory would leave a stale "could not be saved" toast on screen AND leave
  // the next such rejection unreported.
  it('takes the notice down and re-arms reporting once a write completes', () => {
    const memory = createSaveFailureMemory();
    expect(planSaveFailureResponse(memory, CHAPTERIZATION).shouldReport).toBe(true);
    expect(planSaveFailureResponse(memory, CHAPTERIZATION).shouldReport).toBe(false);

    expect(clearOutstandingSaveFailure(memory)).toBe(true);
    expect(memory.isUnknownFailureOutstanding).toBe(false);

    expect(planSaveFailureResponse(memory, CHAPTERIZATION).shouldReport).toBe(true);
  });

  it('does not ask the caller to dismiss a notice it never raised', () => {
    const memory = createSaveFailureMemory();
    expect(clearOutstandingSaveFailure(memory)).toBe(false);

    // Their notices are transient, so there is nothing to take down.
    planSaveFailureResponse(memory, SYNC_BLOCKED);
    planSaveFailureResponse(memory, PERMISSIONS);
    expect(clearOutstandingSaveFailure(memory)).toBe(false);

    planSaveFailureResponse(memory, CHAPTERIZATION);
    expect(clearOutstandingSaveFailure(memory)).toBe(true);
    // Already cleared by the write before this one.
    expect(clearOutstandingSaveFailure(memory)).toBe(false);
  });
});
