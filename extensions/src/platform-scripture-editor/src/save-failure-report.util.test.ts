import { describe, expect, it } from 'vitest';
import {
  classifySaveFailure,
  planSaveFailureResponse,
  shouldReportSaveFailure,
} from './save-failure-report.util';

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

  it('reports again after a success cleared the memory', () => {
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
    const plan = planSaveFailureResponse(SYNC_BLOCKED, undefined);
    expect(plan).not.toBeInstanceOf(Promise);
    expect(plan.shouldRevert).toBe(true);
  });

  it('never reverts an unrecognized rejection, first time or repeating', () => {
    expect(planSaveFailureResponse(CHAPTERIZATION, undefined).shouldRevert).toBe(false);
    expect(planSaveFailureResponse(CHAPTERIZATION, 'unknown').shouldRevert).toBe(false);
  });

  it('reverts a recoverable rejection on EVERY occurrence, reported or not', () => {
    const firstBlock = planSaveFailureResponse(SYNC_BLOCKED, undefined);
    expect(firstBlock).toEqual({ kind: 'syncEditBlocked', shouldReport: true, shouldRevert: true });

    // The same rejection again: the toast is deduplicated, but the editor must still be restored.
    const repeatBlock = planSaveFailureResponse(SYNC_BLOCKED, 'syncEditBlocked');
    expect(repeatBlock).toEqual({
      kind: 'syncEditBlocked',
      shouldReport: false,
      shouldRevert: true,
    });

    const repeatPermissions = planSaveFailureResponse(PERMISSIONS, 'permissions');
    expect(repeatPermissions).toEqual({
      kind: 'permissions',
      shouldReport: false,
      shouldRevert: true,
    });
  });

  it('reports again when the failure changes kind', () => {
    expect(planSaveFailureResponse(PERMISSIONS, 'unknown')).toEqual({
      kind: 'permissions',
      shouldReport: true,
      shouldRevert: true,
    });
    expect(planSaveFailureResponse(CHAPTERIZATION, 'permissions')).toEqual({
      kind: 'unknown',
      shouldReport: true,
      shouldRevert: false,
    });
  });
});
