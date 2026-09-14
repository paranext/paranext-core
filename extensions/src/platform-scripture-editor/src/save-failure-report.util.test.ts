import { describe, expect, it } from 'vitest';
import { classifySaveFailure, shouldReportSaveFailure } from './save-failure-report.util';

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
