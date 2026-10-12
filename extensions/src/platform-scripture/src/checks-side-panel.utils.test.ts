import { describe, expect, it } from 'vitest';
import { LanguageStrings } from 'platform-bible-utils';
import { buildChecksInfo, CheckInfo, getCheckTypeSecondaryLabel } from './checks-side-panel.utils';

const STRINGS: LanguageStrings = {
  '%webView_checksSidePanel_checkCouldNotRun%': 'Couldn’t run',
  '%webView_checksSidePanel_checkRequiresSetup%': 'Setup required',
  '%checkSetup_notApplicable_quotationMarksNotUsed%': 'Not used in this project',
};

function info(overrides: Partial<CheckInfo>): CheckInfo {
  return {
    checkId: 'Quotation',
    checkName: 'Quotations',
    isSetup: true,
    setupStatus: 'ready',
    ...overrides,
  };
}

describe('getCheckTypeSecondaryLabel', () => {
  it('says the check could not run before anything else', () => {
    expect(
      getCheckTypeSecondaryLabel(
        info({ isSetup: false, setupStatus: 'setupRequired' }),
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
    expect(
      getCheckTypeSecondaryLabel(
        info({ isSetup: false, setupStatus: 'setupRequired' }),
        [],
        STRINGS,
      ),
    ).toBe('Setup required');
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
        isSetup: true,
        setupStatus: 'notApplicable',
        notApplicableReason: '%checkSetup_notApplicable_quotationMarksNotUsed%',
        setUpLink: undefined,
      },
      {
        checkId: 'registered-x',
        checkName: 'registered-x name',
        isSetup: false,
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
