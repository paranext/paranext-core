// @vitest-environment jsdom
// D-015 regression: API may return multiple senses with the same `sense.id`. The component
// must render without emitting React's "Encountered two children with the same key" warning,
// and each rendered sense must be present (none silently dropped).
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DictionaryEntryDetail } from './dictionary-entry-detail.component';
import type { DictionarySenseDisplay } from '../shared/dictionary-sense-item.component';

const makeSense = (
  id: string,
  senseNumber: number,
  definition: string,
): DictionarySenseDisplay => ({
  id,
  senseNumber,
  definition,
  isRelevant: true,
});

describe('DictionaryEntryDetail', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders without duplicate-key warning when API returns senses with colliding ids (D-015)', () => {
    // Mirrors the walkthrough repro: 12 senses with several duplicates (5 collisions seen live).
    const senses: DictionarySenseDisplay[] = [
      makeSense('s-A', 1, 'first sense for collision A'),
      makeSense('s-A', 2, 'second sense reusing id A'),
      makeSense('s-B', 3, 'first sense for collision B'),
      makeSense('s-B', 4, 'second sense reusing id B'),
      makeSense('s-B', 5, 'third sense reusing id B'),
      makeSense('s-C', 6, 'unique sense C'),
    ];

    render(
      <DictionaryEntryDetail
        tokenId="tok-d015"
        sourceText="אֱלֹהִים"
        transliteration="ʾĕlōhîm"
        senses={senses}
      />,
    );

    // No React duplicate-key warning emitted.
    const duplicateKeyWarnings = consoleErrorSpy.mock.calls.filter((call) => {
      const first = call[0];
      return typeof first === 'string' && first.includes('two children with the same key');
    });
    expect(duplicateKeyWarnings).toHaveLength(0);

    // Every sense rendered (none silently dropped by React's de-dup behaviour).
    expect(screen.getByText('first sense for collision A')).toBeInTheDocument();
    expect(screen.getByText('second sense reusing id A')).toBeInTheDocument();
    expect(screen.getByText('first sense for collision B')).toBeInTheDocument();
    expect(screen.getByText('second sense reusing id B')).toBeInTheDocument();
    expect(screen.getByText('third sense reusing id B')).toBeInTheDocument();
    expect(screen.getByText('unique sense C')).toBeInTheDocument();
  });
});
