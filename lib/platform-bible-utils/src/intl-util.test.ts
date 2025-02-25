import { vi } from 'vitest';
import getCurrentLocale from './intl-util';

vi.mock('./intl-date-time-format', () => ({
  default: vi.fn(() => ({
    resolvedOptions: vi.fn(() => ({ locale: 'he' })),
  })),
}));

let originalNavigator: Navigator | undefined;

describe('getCurrentLocale', () => {
  beforeAll(() => {
    // Store the original global.navigator before tests modify
    originalNavigator = global.navigator;
  });

  afterEach(() => {
    // Reset global.navigator to its original value
    if (originalNavigator) {
      global.navigator = originalNavigator;
    }
  });

  it('should return the first language in navigator.languages array', () => {
    // Set the languages so that navigator is defined
    Object.defineProperty(global, 'navigator', {
      value: {
        languages: ['en', 'fr'],
      },
      writable: true,
    });

    expect(getCurrentLocale()).toEqual('en');
  });

  it('should return the locale resolved by DateTimeFormat when navigator.languages is not available', () => {
    // Set navigator to undefined
    Object.defineProperty(global, 'navigator', {
      value: {
        undefined,
      },
      writable: true,
    });

    expect(getCurrentLocale()).toEqual('he');
  });
});
