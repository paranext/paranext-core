// @vitest-environment jsdom

import { renderHook, waitFor } from '@testing-library/react';
import { newPlatformError } from 'platform-bible-utils';
import type { CheckRunnerCheckDetails, CheckSetupState } from 'platform-scripture';
import { describe, expect, it, vi } from 'vitest';
import { defaultCheckRunnerCheckDetails } from './checks-side-panel.utils';
import { useChecksInfo } from './use-checks-info.hook';

type LookUp = (checkId: string, projectId: string) => Promise<CheckSetupState>;

const CHECKS: CheckRunnerCheckDetails[] = [
  { checkId: 'Quotation', checkName: 'Quotation', checkDescription: 'Quotation marks' },
  { checkId: 'RepeatedWord', checkName: 'RepeatedWord', checkDescription: 'Repeated words' },
];

const getName = (checkId: string) => `name of ${checkId}`;

function aggregatorWith(lookUp: LookUp) {
  return { lookUpCheckSetupStatus: lookUp };
}

type HookProps = Parameters<typeof useChecksInfo>;

describe('useChecksInfo', () => {
  it('looks up every available check for the project and returns its setup status', async () => {
    const lookUp = vi.fn<LookUp>(async (checkId) =>
      checkId === 'Quotation' ? { status: 'setupRequired' } : { status: 'ready' },
    );

    // A stable object, as the web view's data provider is: a new one per render would re-run the
    // lookups on every render
    const aggregator = aggregatorWith(lookUp);

    const { result } = renderHook(() => useChecksInfo(aggregator, 'P1', CHECKS, getName));

    await waitFor(() => expect(result.current).toHaveLength(2));
    expect(
      result.current.map(({ checkId, checkName, setupStatus }) => [
        checkId,
        checkName,
        setupStatus,
      ]),
    ).toEqual([
      ['Quotation', 'name of Quotation', 'setupRequired'],
      ['RepeatedWord', 'name of RepeatedWord', 'ready'],
    ]);
    expect(lookUp).toHaveBeenCalledWith('Quotation', 'P1');
    expect(lookUp).toHaveBeenCalledWith('RepeatedWord', 'P1');
  });

  it('looks the checks up again for a different project', async () => {
    const lookUp = vi.fn<LookUp>(async (_checkId, projectId) =>
      projectId === 'P1' ? { status: 'ready' } : { status: 'setupRequired' },
    );
    const aggregator = aggregatorWith(lookUp);
    const initialProps: HookProps = [aggregator, 'P1', CHECKS, getName];
    const { result, rerender } = renderHook((props: HookProps) => useChecksInfo(...props), {
      initialProps,
    });
    await waitFor(() => expect(result.current[0]?.setupStatus).toBe('ready'));

    rerender([aggregator, 'P2', CHECKS, getName]);

    await waitFor(() => expect(result.current[0]?.setupStatus).toBe('setupRequired'));
  });

  describe('returns an empty list and looks nothing up', () => {
    const placeholderChecks = [defaultCheckRunnerCheckDetails];
    const platformError = newPlatformError('The checks could not be loaded');
    const cases: [string, (aggregator: ReturnType<typeof aggregatorWith>) => HookProps][] = [
      ['there is no check runner yet', () => [undefined, 'P1', CHECKS, getName]],
      ['there is no project', (aggregator) => [aggregator, undefined, CHECKS, getName]],
      [
        'the available checks failed to load',
        (aggregator) => [aggregator, 'P1', platformError, getName],
      ],
      ['there are no available checks', (aggregator) => [aggregator, 'P1', [], getName]],
      [
        'the available checks are still the loading placeholder',
        (aggregator) => [aggregator, 'P1', placeholderChecks, getName],
      ],
    ];

    it.each(cases)('when %s', async (_name, buildProps) => {
      const lookUp = vi.fn<LookUp>();
      const props = buildProps(aggregatorWith(lookUp));

      const { result } = renderHook(() => useChecksInfo(...props));

      // Let any lookup that was wrongly started settle before looking
      await Promise.resolve();
      expect(result.current).toEqual([]);
      expect(lookUp).not.toHaveBeenCalled();
    });
  });
});
