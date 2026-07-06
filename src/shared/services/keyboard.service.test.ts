// CAP-008 (keyboard-switching) RED-phase tests — thin consumer wrapper for the
// platform.keyboard data provider.
//
// Traceability: strategic-plan-backend.md ### CAP-008 (PT10-only contract — no TS-XXX/BHV-XXX);
// backend-alignment.md §"TypeScript Consumer Surface" — `keyboard.service.ts` delegates to
// `papi.dataProviders.get('platform.keyboard')` underneath (precedent: theme.service.ts).

// Tests cast a partial fake provider to the full provider interface for conciseness
// (repo precedent: project-lookup.service.test.ts).
/* eslint-disable no-type-assertion/no-type-assertion */

import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { DataProviders } from 'papi-shared-types';
import type { KeyboardOption, IKeyboardService } from '@shared/services/keyboard.service-model';
import { keyboardServiceProviderName } from '@shared/services/keyboard.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { keyboardService } from '@shared/services/keyboard.service';

vi.mock('@shared/services/data-provider.service', () => ({
  __esModule: true,
  dataProviderService: {
    get: vi.fn(),
  },
}));

describe('keyboardService consumer wrapper', () => {
  beforeEach(() => {
    vi.mocked(dataProviderService.get).mockClear();
  });

  it('is typed as the full IKeyboardService consumer surface', () => {
    expectTypeOf(keyboardService).toExtend<IKeyboardService>();
    expect(keyboardService).toBeDefined();
  });

  it('exposes dataProviderName synchronously without resolving the provider (sync-proxy member)', () => {
    expect(keyboardService.dataProviderName).toBe('platform.keyboard');
    // Must not have triggered async resolution just to read the sync member
    expect(dataProviderService.get).not.toHaveBeenCalled();
  });

  it('delegates method calls to the platform.keyboard data provider', async () => {
    const fakeKeyboards: KeyboardOption[] = [
      { id: 'en-US', name: 'English (US)' },
      { id: 'ar-SA', name: 'العربية', isRtlScript: true },
    ];
    const getAvailableKeyboards = vi.fn().mockResolvedValue(fakeKeyboards);
    const fakeProvider = { getAvailableKeyboards } as unknown as DataProviders['platform.keyboard'];
    vi.mocked(dataProviderService.get).mockResolvedValue(fakeProvider);

    const result = await keyboardService.getAvailableKeyboards(undefined);

    expect(dataProviderService.get).toHaveBeenCalledWith(keyboardServiceProviderName);
    expect(getAvailableKeyboards).toHaveBeenCalledWith(undefined);
    expect(result).toEqual(fakeKeyboards);
  });
});
