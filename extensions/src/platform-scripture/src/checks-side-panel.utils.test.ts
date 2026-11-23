import { describe, expect, it } from 'vitest';
import { LanguageStrings } from 'platform-bible-utils';
import type { CheckResultsInvalidated } from 'platform-scripture';
import {
  buildChecksInfo,
  CheckInfo,
  getCheckTypeSecondaryLabel,
  shouldRefreshChecksInfo,
} from './checks-side-panel.utils';

const STRINGS: LanguageStrings = {
  '%webView_checksSidePanel_checkCouldNotRun%': 'Couldn’t run',
  '%webView_checksSidePanel_checkRequiresSetup%': 'Setup required',
  '%checkSetup_notApplicable_quotationMarksNotUsed%': 'Not used in this project',
};

function info(overrides: Partial<CheckInfo>): CheckInfo {
  return {
    checkId: 'Quotation',
    checkName: 'Quotations',
    setupStatus: 'ready',
    ...overrides,
  };
}

describe('getCheckTypeSecondaryLabel', () => {
  it('says the check could not run before anything else', () => {
    expect(
      getCheckTypeSecondaryLabel(
        info({ setupStatus: 'setupRequired' }),
        [{ checkId: 'Quotation', message: 'bad' }],
        STRINGS,
      ),
    ).toBe('Couldn’t run');
  });

  it('gives the reason a check does not apply', () => {
    expect(
      getCheckTypeSecondaryLabel(
        info({
          setupStatus: 'notApplicable',
          notApplicableReason: '%checkSetup_notApplicable_quotationMarksNotUsed%',
        }),
        undefined,
        STRINGS,
      ),
    ).toBe('Not used in this project');
  });

  it('says setup is required', () => {
    expect(getCheckTypeSecondaryLabel(info({ setupStatus: 'setupRequired' }), [], STRINGS)).toBe(
      'Setup required',
    );
  });

  it('has no label for a ready check without errors', () => {
    expect(
      getCheckTypeSecondaryLabel(info({}), [{ checkId: 'Other', message: 'x' }], STRINGS),
    ).toBeUndefined();
  });
});

describe('buildChecksInfo', () => {
  const checks = [
    { checkId: 'Quotation', checkName: 'Quotation', checkDescription: 'Quotations' },
    { checkId: 'registered-x', checkName: 'x', checkDescription: 'X' },
  ];

  it('maps each lookup to its status and reason', async () => {
    const result = await buildChecksInfo(
      checks,
      async (checkId) =>
        checkId === 'Quotation'
          ? { status: 'notApplicable', reason: '%checkSetup_notApplicable_quotationMarksNotUsed%' }
          : { status: 'setupRequired' },
      (checkId) => `${checkId} name`,
    );
    expect(result).toEqual([
      {
        checkId: 'Quotation',
        checkName: 'Quotation name',
        setupStatus: 'notApplicable',
        notApplicableReason: '%checkSetup_notApplicable_quotationMarksNotUsed%',
        setUpLink: undefined,
      },
      {
        checkId: 'registered-x',
        checkName: 'registered-x name',
        setupStatus: 'setupRequired',
        notApplicableReason: undefined,
        setUpLink: undefined,
      },
    ]);
  });

  it('falls back to ready when a lookup rejects', async () => {
    const result = await buildChecksInfo(
      checks,
      async (checkId) => {
        if (checkId === 'registered-x') throw new Error('not implemented');
        return { status: 'setupRequired' };
      },
      (checkId) => checkId,
    );
    expect(result.map((c) => c.setupStatus)).toEqual(['setupRequired', 'ready']);
  });
});

describe('shouldRefreshChecksInfo', () => {
  const wholeProject: CheckResultsInvalidated = {
    checkIds: ['Quotation'],
    projectId: 'P1',
    scope: 'all',
  };

  it('refreshes for a whole-project change to this project', () => {
    expect(shouldRefreshChecksInfo(wholeProject, 'P1')).toBe(true);
  });

  it('does not refresh for a change to one book', () => {
    expect(shouldRefreshChecksInfo({ ...wholeProject, scope: 'book', bookId: 'GEN' }, 'P1')).toBe(
      false,
    );
  });

  it('does not refresh for a whole-project change to another project', () => {
    expect(shouldRefreshChecksInfo({ ...wholeProject, projectId: 'P2' }, 'P1')).toBe(false);
  });

  it('does not refresh when there is no project', () => {
    expect(shouldRefreshChecksInfo(wholeProject, undefined)).toBe(false);
  });
});
