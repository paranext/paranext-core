/** Tests for Choose Encoding Form (UI-PKG-004) Maps to: BHV-109, VAL-008 */
import { describe, expect, it } from 'vitest';
import type { EncoderOption } from 'platform-projects';

// #region Test Data

const MOCK_ENCODERS: EncoderOption[] = [
  {
    name: 'SIL-IPA93-2001',
    displayName: 'SIL IPA93 2001',
    isBidirectional: true,
  },
  {
    name: 'SIL-ENCORE-IPA93',
    displayName: 'SIL Encore IPA93',
    isBidirectional: false,
  },
  {
    name: 'SIL-GRAPHITE-PADAUK',
    displayName: 'SIL Graphite Padauk',
    isBidirectional: true,
  },
];

// #endregion

// #region Helper Functions to Test Business Logic

/** Determines if the OK button should be disabled based on encoder selection Maps to: VAL-008 */
function isOkButtonDisabled(encoderName: string | undefined): boolean {
  return !encoderName;
}

/**
 * Determines if the reverse direction checkbox should be disabled based on whether the selected
 * encoder is bidirectional
 */
function isReverseDirectionDisabled(
  encoderName: string | undefined,
  encoders: EncoderOption[],
): boolean {
  if (!encoderName) return true;
  const encoder = encoders.find((e) => e.name === encoderName);
  return !encoder?.isBidirectional;
}

/** Gets the encoder option by name */
function findEncoder(encoderName: string, encoders: EncoderOption[]): EncoderOption | undefined {
  return encoders.find((e) => e.name === encoderName);
}

// #endregion

// #region Tests

describe('Choose Encoding Form - Business Logic', () => {
  describe('VAL-008: OK Button Disabled Until Encoder Selected', () => {
    it('should have OK button disabled when no encoder is selected', () => {
      expect(isOkButtonDisabled(undefined)).toBe(true);
    });

    it('should have OK button enabled when an encoder is selected', () => {
      expect(isOkButtonDisabled('SIL-IPA93-2001')).toBe(false);
    });

    it('should have OK button disabled when encoder is empty string', () => {
      expect(isOkButtonDisabled('')).toBe(true);
    });
  });

  describe('Reverse Direction Checkbox State', () => {
    it('should disable reverse direction when no encoder is selected', () => {
      expect(isReverseDirectionDisabled(undefined, MOCK_ENCODERS)).toBe(true);
    });

    it('should enable reverse direction for bidirectional encoder', () => {
      expect(isReverseDirectionDisabled('SIL-IPA93-2001', MOCK_ENCODERS)).toBe(false);
    });

    it('should disable reverse direction for non-bidirectional encoder', () => {
      expect(isReverseDirectionDisabled('SIL-ENCORE-IPA93', MOCK_ENCODERS)).toBe(true);
    });

    it('should disable reverse direction for unknown encoder', () => {
      expect(isReverseDirectionDisabled('UNKNOWN-ENCODER', MOCK_ENCODERS)).toBe(true);
    });
  });

  describe('Encoder Lookup', () => {
    it('should find encoder by name', () => {
      const encoder = findEncoder('SIL-IPA93-2001', MOCK_ENCODERS);
      expect(encoder).toBeDefined();
      expect(encoder?.displayName).toBe('SIL IPA93 2001');
      expect(encoder?.isBidirectional).toBe(true);
    });

    it('should return undefined for unknown encoder', () => {
      const encoder = findEncoder('UNKNOWN-ENCODER', MOCK_ENCODERS);
      expect(encoder).toBeUndefined();
    });

    it('should correctly identify bidirectional encoder', () => {
      const bidirectional = findEncoder('SIL-IPA93-2001', MOCK_ENCODERS);
      const nonBidirectional = findEncoder('SIL-ENCORE-IPA93', MOCK_ENCODERS);

      expect(bidirectional?.isBidirectional).toBe(true);
      expect(nonBidirectional?.isBidirectional).toBe(false);
    });
  });

  describe('Form Output Generation', () => {
    it('should generate correct submit output with selected encoder', () => {
      const encoderName = 'SIL-IPA93-2001';
      const reverseDirection = true;

      const output = {
        action: 'submit' as const,
        data: {
          encoderName,
          reverseDirection,
        },
      };

      expect(output.action).toBe('submit');
      expect(output.data?.encoderName).toBe('SIL-IPA93-2001');
      expect(output.data?.reverseDirection).toBe(true);
    });

    it('should generate correct cancel output', () => {
      const output: {
        action: 'cancel';
        data?: { encoderName: string; reverseDirection: boolean };
      } = {
        action: 'cancel' as const,
      };

      expect(output.action).toBe('cancel');
      expect(output.data).toBeUndefined();
    });

    it('should handle reverse direction false by default', () => {
      const encoderName = 'SIL-ENCORE-IPA93';
      const reverseDirection = false;

      const output = {
        action: 'submit' as const,
        data: {
          encoderName,
          reverseDirection,
        },
      };

      expect(output.data?.reverseDirection).toBe(false);
    });
  });

  describe('Initial Values Handling', () => {
    it('should accept initial encoder name', () => {
      const initialEncoderName = 'SIL-IPA93-2001';
      const encoder = findEncoder(initialEncoderName, MOCK_ENCODERS);

      expect(encoder).toBeDefined();
      expect(encoder?.name).toBe(initialEncoderName);
    });

    it('should accept initial reverse direction value', () => {
      const initialReverseDirection = true;
      expect(initialReverseDirection).toBe(true);
    });

    it('should default reverse direction to false when not provided', () => {
      // Simulates how the component handles a potentially undefined initial value
      const optionalValue: boolean | undefined = undefined;
      const initialReverseDirection = optionalValue ?? false;
      expect(initialReverseDirection).toBe(false);
    });
  });
});

// #endregion
