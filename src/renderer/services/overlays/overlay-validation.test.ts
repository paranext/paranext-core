import { describe, it, expect } from 'vitest';
import { isPlatformError, INVALID_ARGUMENT } from 'platform-bible-utils';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import { ComboBoxRequest, PopoverRequest } from './overlay.service-model';
import {
  validateComboBoxRequest,
  validateContextMenuItems,
  validateMenuItems,
  validatePopoverRequest,
} from './overlay-validation';

/* eslint vitest/expect-expect: ["error", { assertFunctionNames: ["expect", "expectValidationError"] }] */

/** Asserts that fn() throws a PlatformError with code INVALID_ARGUMENT and optional message */
function expectValidationError(fn: () => void, expectedMessage?: string): void {
  try {
    fn();
    expect.unreachable('Expected a PlatformError to be thrown');
  } catch (error) {
    expect(isPlatformError(error)).toBe(true);
    if (isPlatformError(error)) {
      expect(error.code).toBe(INVALID_ARGUMENT);
      if (expectedMessage) expect(error.message).toBe(expectedMessage);
    }
  }
}

describe('overlay-validation', () => {
  describe('validateContextMenuItems', () => {
    it('should pass for a valid context menu items array', () => {
      const items: OverlayContextMenuItem[] = [
        { type: 'item', id: 'cut', label: 'Cut' },
        { type: 'separator' },
        { type: 'item', id: 'copy', label: 'Copy' },
      ];
      expect(() => validateContextMenuItems(items)).not.toThrow();
    });

    it('should throw INVALID_ARGUMENT for empty items array', () => {
      expectValidationError(() => validateContextMenuItems([]), 'Items array must not be empty');
    });

    it('should throw INVALID_ARGUMENT for too many items (>50)', () => {
      const items: OverlayContextMenuItem[] = Array.from({ length: 51 }, (_, i) => ({
        type: 'item' as const,
        id: `item-${i}`,
        label: `Item ${i}`,
      }));
      expectValidationError(
        () => validateContextMenuItems(items),
        'Too many items at one level (max 50)',
      );
    });

    it('should pass for exactly 50 items', () => {
      const items: OverlayContextMenuItem[] = Array.from({ length: 50 }, (_, i) => ({
        type: 'item' as const,
        id: `item-${i}`,
        label: `Item ${i}`,
      }));
      expect(() => validateContextMenuItems(items)).not.toThrow();
    });

    it('should throw INVALID_ARGUMENT for nesting too deep (>2 levels)', () => {
      const items: OverlayContextMenuItem[] = [
        {
          type: 'submenu',
          label: 'Level 1',
          items: [
            {
              type: 'submenu',
              label: 'Level 2',
              items: [
                {
                  type: 'submenu',
                  label: 'Level 3 - too deep',
                  items: [{ type: 'item', id: 'deep', label: 'Deep Item' }],
                },
              ],
            },
          ],
        },
      ];
      expectValidationError(
        () => validateContextMenuItems(items),
        'Submenu nesting too deep (max 2 levels)',
      );
    });

    it('should pass for nesting at exactly 2 levels', () => {
      const items: OverlayContextMenuItem[] = [
        {
          type: 'submenu',
          label: 'Level 1',
          items: [
            {
              type: 'submenu',
              label: 'Level 2',
              items: [{ type: 'item', id: 'leaf', label: 'Leaf Item' }],
            },
          ],
        },
      ];
      expect(() => validateContextMenuItems(items)).not.toThrow();
    });

    it('should throw INVALID_ARGUMENT for label too long (>500 chars)', () => {
      const longLabel = 'a'.repeat(501);
      const items: OverlayContextMenuItem[] = [{ type: 'item', id: 'long', label: longLabel }];
      expectValidationError(
        () => validateContextMenuItems(items),
        'Label exceeds maximum length of 500 characters',
      );
    });

    it('should pass for label at exactly 500 chars', () => {
      const label = 'a'.repeat(500);
      const items: OverlayContextMenuItem[] = [{ type: 'item', id: 'exact', label }];
      expect(() => validateContextMenuItems(items)).not.toThrow();
    });

    it('should validate submenu label length', () => {
      const longLabel = 'b'.repeat(501);
      const items: OverlayContextMenuItem[] = [
        {
          type: 'submenu',
          label: longLabel,
          items: [{ type: 'item', id: 'sub-item', label: 'Sub Item' }],
        },
      ];
      expectValidationError(() => validateContextMenuItems(items));
    });
  });

  describe('validateMenuItems', () => {
    it('should validate items at specified depth', () => {
      const items: OverlayContextMenuItem[] = [{ type: 'item', id: 'test', label: 'Test' }];
      expect(() => validateMenuItems(items, 0)).not.toThrow();
    });

    it('should reject submenu at max depth', () => {
      const items: OverlayContextMenuItem[] = [
        {
          type: 'submenu',
          label: 'Too Deep',
          items: [{ type: 'item', id: 'deep', label: 'Deep' }],
        },
      ];
      // At depth 2, submenus should be rejected (max 2 levels)
      expectValidationError(() => validateMenuItems(items, 2));
    });
  });

  describe('validatePopoverRequest', () => {
    const validTextRequest: PopoverRequest = {
      anchor: { x: 100, y: 200 },
      content: { type: 'text', body: 'Hello world' },
    };

    it('should pass for a valid text popover request', () => {
      expect(() => validatePopoverRequest(validTextRequest)).not.toThrow();
    });

    it('should pass for a valid text popover with title', () => {
      const request: PopoverRequest = {
        anchor: { x: 50, y: 50 },
        content: { type: 'text', title: 'Info', body: 'Some text' },
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });

    it('should pass for a valid card popover with actions', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: {
          type: 'card',
          title: 'Card',
          body: 'Card body',
          actions: [{ id: 'ok', label: 'OK' }],
        },
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });

    it('should throw for card content with empty actions array', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: {
          type: 'card',
          title: 'Card',
          body: 'Card body',
          actions: [],
        },
      };
      expectValidationError(
        () => validatePopoverRequest(request),
        'Card content must have at least one action',
      );
    });

    it('should pass for a valid markdown popover', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'markdown', markdown: '# Title\n\nSome **bold** text' },
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });

    it('should throw for markdown content with empty string', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'markdown', markdown: '' },
      };
      expectValidationError(
        () => validatePopoverRequest(request),
        'Markdown content must not be empty',
      );
    });

    it('should throw for markdown content with only whitespace', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'markdown', markdown: '   ' },
      };
      expectValidationError(
        () => validatePopoverRequest(request),
        'Markdown content must not be empty',
      );
    });

    it('should throw for negative maxWidth', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        maxWidth: -10,
      };
      expectValidationError(
        () => validatePopoverRequest(request),
        'maxWidth must be greater than 0',
      );
    });

    it('should throw for zero maxWidth', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        maxWidth: 0,
      };
      expectValidationError(
        () => validatePopoverRequest(request),
        'maxWidth must be greater than 0',
      );
    });

    it('should throw for negative dismissAfterMs', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        dismissAfterMs: -100,
      };
      expectValidationError(
        () => validatePopoverRequest(request),
        'dismissAfterMs must be greater than 0',
      );
    });

    it('should throw for zero dismissAfterMs', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        dismissAfterMs: 0,
      };
      expectValidationError(
        () => validatePopoverRequest(request),
        'dismissAfterMs must be greater than 0',
      );
    });

    it('should throw for anchor missing x', () => {
      // Intentionally malformed input to test validation; must bypass TS to simulate bad runtime data
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const request = {
        anchor: { y: 20 },
        content: { type: 'text', body: 'Hello' },
      } as unknown as PopoverRequest;
      expectValidationError(
        () => validatePopoverRequest(request),
        'Anchor must have valid x and y coordinates',
      );
    });

    it('should throw for anchor missing y', () => {
      // Intentionally malformed input to test validation; must bypass TS to simulate bad runtime data
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const request = {
        anchor: { x: 10 },
        content: { type: 'text', body: 'Hello' },
      } as unknown as PopoverRequest;
      expectValidationError(
        () => validatePopoverRequest(request),
        'Anchor must have valid x and y coordinates',
      );
    });

    it('should throw for anchor with non-number x', () => {
      // Intentionally malformed input to test validation; must bypass TS to simulate bad runtime data
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const request = {
        anchor: { x: 'abc', y: 20 },
        content: { type: 'text', body: 'Hello' },
      } as unknown as PopoverRequest;
      expectValidationError(() => validatePopoverRequest(request));
    });

    it('should pass with valid maxWidth', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        maxWidth: 400,
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });

    it('should pass with valid dismissAfterMs', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        dismissAfterMs: 3000,
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });
  });

  describe('validateComboBoxRequest', () => {
    const validRequest: ComboBoxRequest = {
      items: [
        { id: 'ft', label: 'Footnote' },
        { id: 'xt', label: 'Cross Reference' },
      ],
    };

    it('should pass for a valid combo box request', () => {
      expect(() => validateComboBoxRequest(validRequest)).not.toThrow();
    });

    it('should throw for empty items array', () => {
      expectValidationError(
        () => validateComboBoxRequest({ ...validRequest, items: [] }),
        'Items array must not be empty',
      );
    });

    it('should throw for too many items (>200)', () => {
      const items = Array.from({ length: 201 }, (_, i) => ({ id: `id-${i}`, label: `Item ${i}` }));
      expectValidationError(
        () => validateComboBoxRequest({ ...validRequest, items }),
        'Too many items (max 200)',
      );
    });

    it('should pass for exactly 200 items', () => {
      const items = Array.from({ length: 200 }, (_, i) => ({ id: `id-${i}`, label: `Item ${i}` }));
      expect(() => validateComboBoxRequest({ ...validRequest, items })).not.toThrow();
    });

    it('should throw for item missing id', () => {
      // Intentionally malformed input to test validation; must bypass TS to simulate bad runtime data
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const request = { items: [{ label: 'No ID' }] } as unknown as ComboBoxRequest;
      expectValidationError(() => validateComboBoxRequest(request), 'Each item must have an id');
    });

    it('should throw for label too long', () => {
      const items = [{ id: 'long', label: 'a'.repeat(501) }];
      expectValidationError(
        () => validateComboBoxRequest({ ...validRequest, items }),
        'Label exceeds maximum length of 500 characters',
      );
    });

    it('should throw for invalid anchor coordinates (NaN)', () => {
      expectValidationError(
        () => validateComboBoxRequest({ ...validRequest, anchor: { x: NaN, y: 100 } }),
        'Anchor must have valid x and y coordinates',
      );
    });

    it('should throw for negative maxWidth', () => {
      expectValidationError(
        () => validateComboBoxRequest({ ...validRequest, maxWidth: -10 }),
        'maxWidth must be greater than 0',
      );
    });

    it('should throw for zero maxWidth', () => {
      expectValidationError(() => validateComboBoxRequest({ ...validRequest, maxWidth: 0 }));
    });

    it('should throw for negative maxHeight', () => {
      expectValidationError(
        () => validateComboBoxRequest({ ...validRequest, maxHeight: -5 }),
        'maxHeight must be greater than 0',
      );
    });

    it('should throw for zero maxHeight', () => {
      expectValidationError(() => validateComboBoxRequest({ ...validRequest, maxHeight: 0 }));
    });

    it('should pass with all optional fields on items', () => {
      const items = [
        {
          id: 'ft',
          label: 'Footnote',
          description: 'A footnote',
          icon: 'book',
          badge: 'Common',
          group: 'inline',
          disabled: false,
        },
      ];
      expect(() => validateComboBoxRequest({ ...validRequest, items })).not.toThrow();
    });

    it('should pass with valid anchor coordinates', () => {
      expect(() =>
        validateComboBoxRequest({
          ...validRequest,
          anchor: { x: 100, y: 200 },
        }),
      ).not.toThrow();
    });

    it('should pass with no anchor (centered mode)', () => {
      expect(() => validateComboBoxRequest(validRequest)).not.toThrow();
    });
  });
});
