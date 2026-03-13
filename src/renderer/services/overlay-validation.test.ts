import { describe, it, expect } from 'vitest';
import {
  validateCommandPaletteRequest,
  validateContextMenuRequest,
  validateMenuItems,
  validateModalDialogOptions,
  validatePopoverRequest,
} from '@renderer/services/overlay-validation';
import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuItem,
  OverlayValidationError,
  PopoverRequest,
} from '@shared/models/overlay.service-model';

describe('overlay-validation', () => {
  describe('validateContextMenuRequest', () => {
    it('should pass for a valid context menu request', () => {
      const request: ContextMenuRequest = {
        items: [
          { type: 'item', id: 'cut', label: 'Cut' },
          { type: 'separator' },
          { type: 'item', id: 'copy', label: 'Copy' },
        ],
      };
      expect(() => validateContextMenuRequest(request)).not.toThrow();
    });

    it('should throw OverlayValidationError for empty items array', () => {
      const request: ContextMenuRequest = { items: [] };
      expect(() => validateContextMenuRequest(request)).toThrow(OverlayValidationError);
      expect(() => validateContextMenuRequest(request)).toThrow('Items array must not be empty');
    });

    it('should throw OverlayValidationError for too many items (>50)', () => {
      const items: ContextMenuItem[] = Array.from({ length: 51 }, (_, i) => ({
        type: 'item' as const,
        id: `item-${i}`,
        label: `Item ${i}`,
      }));
      const request: ContextMenuRequest = { items };
      expect(() => validateContextMenuRequest(request)).toThrow(OverlayValidationError);
      expect(() => validateContextMenuRequest(request)).toThrow(
        'Too many items at one level (max 50)',
      );
    });

    it('should pass for exactly 50 items', () => {
      const items: ContextMenuItem[] = Array.from({ length: 50 }, (_, i) => ({
        type: 'item' as const,
        id: `item-${i}`,
        label: `Item ${i}`,
      }));
      const request: ContextMenuRequest = { items };
      expect(() => validateContextMenuRequest(request)).not.toThrow();
    });

    it('should throw OverlayValidationError for nesting too deep (>2 levels)', () => {
      const request: ContextMenuRequest = {
        items: [
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
        ],
      };
      expect(() => validateContextMenuRequest(request)).toThrow(OverlayValidationError);
      expect(() => validateContextMenuRequest(request)).toThrow(
        'Submenu nesting too deep (max 2 levels)',
      );
    });

    it('should pass for nesting at exactly 2 levels', () => {
      const request: ContextMenuRequest = {
        items: [
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
        ],
      };
      expect(() => validateContextMenuRequest(request)).not.toThrow();
    });

    it('should throw OverlayValidationError for label too long (>500 chars)', () => {
      const longLabel = 'a'.repeat(501);
      const request: ContextMenuRequest = {
        items: [{ type: 'item', id: 'long', label: longLabel }],
      };
      expect(() => validateContextMenuRequest(request)).toThrow(OverlayValidationError);
      expect(() => validateContextMenuRequest(request)).toThrow(
        'Label exceeds maximum length of 500 characters',
      );
    });

    it('should pass for label at exactly 500 chars', () => {
      const label = 'a'.repeat(500);
      const request: ContextMenuRequest = {
        items: [{ type: 'item', id: 'exact', label }],
      };
      expect(() => validateContextMenuRequest(request)).not.toThrow();
    });

    it('should validate checkbox items', () => {
      const request: ContextMenuRequest = {
        items: [{ type: 'checkbox', id: 'check1', label: 'Check Me', checked: true }],
      };
      expect(() => validateContextMenuRequest(request)).not.toThrow();
    });

    it('should validate radio items', () => {
      const request: ContextMenuRequest = {
        items: [
          {
            type: 'radio',
            id: 'radio1',
            label: 'Option A',
            value: 'a',
            group: 'group1',
            checked: true,
          },
        ],
      };
      expect(() => validateContextMenuRequest(request)).not.toThrow();
    });

    it('should validate submenu label length', () => {
      const longLabel = 'b'.repeat(501);
      const request: ContextMenuRequest = {
        items: [
          {
            type: 'submenu',
            label: longLabel,
            items: [{ type: 'item', id: 'sub-item', label: 'Sub Item' }],
          },
        ],
      };
      expect(() => validateContextMenuRequest(request)).toThrow(OverlayValidationError);
    });
  });

  describe('validateMenuItems', () => {
    it('should validate items at specified depth', () => {
      const items: ContextMenuItem[] = [{ type: 'item', id: 'test', label: 'Test' }];
      expect(() => validateMenuItems(items, 0)).not.toThrow();
    });

    it('should reject submenu at max depth', () => {
      const items: ContextMenuItem[] = [
        {
          type: 'submenu',
          label: 'Too Deep',
          items: [{ type: 'item', id: 'deep', label: 'Deep' }],
        },
      ];
      // At depth 2, submenus should be rejected (max 2 levels)
      expect(() => validateMenuItems(items, 2)).toThrow(OverlayValidationError);
    });
  });

  describe('validateModalDialogOptions', () => {
    describe('alert', () => {
      it('should pass for valid alert options', () => {
        expect(() =>
          validateModalDialogOptions('alert', { message: 'Are you sure?' }),
        ).not.toThrow();
      });

      it('should pass for alert with title and okLabel', () => {
        expect(() =>
          validateModalDialogOptions('alert', {
            title: 'Warning',
            message: 'Something happened',
            okLabel: 'Dismiss',
          }),
        ).not.toThrow();
      });

      it('should throw for alert with message exceeding 500 chars', () => {
        expect(() => validateModalDialogOptions('alert', { message: 'a'.repeat(501) })).toThrow(
          OverlayValidationError,
        );
        expect(() => validateModalDialogOptions('alert', { message: 'a'.repeat(501) })).toThrow(
          'Label exceeds maximum length of 500 characters',
        );
      });

      it('should throw for alert with title exceeding 500 chars', () => {
        expect(() =>
          validateModalDialogOptions('alert', { title: 'a'.repeat(501), message: 'Valid message' }),
        ).toThrow(OverlayValidationError);
      });
    });

    describe('confirm', () => {
      it('should pass for valid confirm options', () => {
        expect(() =>
          validateModalDialogOptions('confirm', { message: 'Delete this item?' }),
        ).not.toThrow();
      });

      it('should pass for confirm with destructive flag', () => {
        expect(() =>
          validateModalDialogOptions('confirm', {
            message: 'This is permanent',
            destructive: true,
          }),
        ).not.toThrow();
      });

      it('should throw for confirm with okLabel exceeding 500 chars', () => {
        expect(() =>
          validateModalDialogOptions('confirm', { message: 'Valid', okLabel: 'a'.repeat(501) }),
        ).toThrow(OverlayValidationError);
      });
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
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
        'Card content must have at least one action',
      );
    });

    it('should pass for a valid list popover with items', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'list', items: ['Item 1', 'Item 2'] },
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });

    it('should throw for list content with empty items array', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'list', items: [] },
      };
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
        'List content must have at least one item',
      );
    });

    it('should pass for a valid richText popover with body runs', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'richText', body: [{ text: 'Hello', bold: true }] },
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });

    it('should throw for richText content with empty body array', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'richText', body: [] },
      };
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
        'Rich text content must have at least one text run',
      );
    });

    it('should pass for a valid description popover with entries', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: {
          type: 'description',
          entries: [{ term: 'Key', detail: 'Value' }],
        },
      };
      expect(() => validatePopoverRequest(request)).not.toThrow();
    });

    it('should throw for description content with empty entries array', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'description', entries: [] },
      };
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
        'Description content must have at least one entry',
      );
    });

    it('should throw for negative maxWidth', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        maxWidth: -10,
      };
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow('maxWidth must be greater than 0');
    });

    it('should throw for zero maxWidth', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        maxWidth: 0,
      };
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow('maxWidth must be greater than 0');
    });

    it('should throw for negative dismissAfterMs', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        dismissAfterMs: -100,
      };
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
        'dismissAfterMs must be greater than 0',
      );
    });

    it('should throw for zero dismissAfterMs', () => {
      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Hello' },
        dismissAfterMs: 0,
      };
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
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
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
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
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
      expect(() => validatePopoverRequest(request)).toThrow(
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
      expect(() => validatePopoverRequest(request)).toThrow(OverlayValidationError);
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

  describe('validateCommandPaletteRequest', () => {
    const validRequest: CommandPaletteRequest = {
      items: [
        { id: 'ft', label: 'Footnote' },
        { id: 'xt', label: 'Cross Reference' },
      ],
    };

    it('should pass for a valid command palette request', () => {
      expect(() => validateCommandPaletteRequest(validRequest)).not.toThrow();
    });

    it('should throw for empty items array', () => {
      expect(() => validateCommandPaletteRequest({ ...validRequest, items: [] })).toThrow(
        OverlayValidationError,
      );
      expect(() => validateCommandPaletteRequest({ ...validRequest, items: [] })).toThrow(
        'Items array must not be empty',
      );
    });

    it('should throw for too many items (>200)', () => {
      const items = Array.from({ length: 201 }, (_, i) => ({ id: `id-${i}`, label: `Item ${i}` }));
      expect(() => validateCommandPaletteRequest({ ...validRequest, items })).toThrow(
        OverlayValidationError,
      );
      expect(() => validateCommandPaletteRequest({ ...validRequest, items })).toThrow(
        'Too many items (max 200)',
      );
    });

    it('should pass for exactly 200 items', () => {
      const items = Array.from({ length: 200 }, (_, i) => ({ id: `id-${i}`, label: `Item ${i}` }));
      expect(() => validateCommandPaletteRequest({ ...validRequest, items })).not.toThrow();
    });

    it('should throw for item missing id', () => {
      // Intentionally malformed input to test validation; must bypass TS to simulate bad runtime data
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const request = { items: [{ label: 'No ID' }] } as unknown as CommandPaletteRequest;
      expect(() => validateCommandPaletteRequest(request)).toThrow(OverlayValidationError);
      expect(() => validateCommandPaletteRequest(request)).toThrow('Each item must have an id');
    });

    it('should throw for label too long', () => {
      const items = [{ id: 'long', label: 'a'.repeat(501) }];
      expect(() => validateCommandPaletteRequest({ ...validRequest, items })).toThrow(
        OverlayValidationError,
      );
      expect(() => validateCommandPaletteRequest({ ...validRequest, items })).toThrow(
        'Label exceeds maximum length of 500 characters',
      );
    });

    it('should throw for invalid anchor coordinates (NaN)', () => {
      expect(() =>
        validateCommandPaletteRequest({ ...validRequest, anchor: { x: NaN, y: 100 } }),
      ).toThrow(OverlayValidationError);
      expect(() =>
        validateCommandPaletteRequest({ ...validRequest, anchor: { x: NaN, y: 100 } }),
      ).toThrow('Anchor must have valid x and y coordinates');
    });

    it('should throw for negative maxWidth', () => {
      expect(() => validateCommandPaletteRequest({ ...validRequest, maxWidth: -10 })).toThrow(
        OverlayValidationError,
      );
      expect(() => validateCommandPaletteRequest({ ...validRequest, maxWidth: -10 })).toThrow(
        'maxWidth must be greater than 0',
      );
    });

    it('should throw for zero maxWidth', () => {
      expect(() => validateCommandPaletteRequest({ ...validRequest, maxWidth: 0 })).toThrow(
        OverlayValidationError,
      );
    });

    it('should throw for negative maxHeight', () => {
      expect(() => validateCommandPaletteRequest({ ...validRequest, maxHeight: -5 })).toThrow(
        OverlayValidationError,
      );
      expect(() => validateCommandPaletteRequest({ ...validRequest, maxHeight: -5 })).toThrow(
        'maxHeight must be greater than 0',
      );
    });

    it('should throw for zero maxHeight', () => {
      expect(() => validateCommandPaletteRequest({ ...validRequest, maxHeight: 0 })).toThrow(
        OverlayValidationError,
      );
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
      expect(() => validateCommandPaletteRequest({ ...validRequest, items })).not.toThrow();
    });

    it('should pass with valid anchor coordinates', () => {
      expect(() =>
        validateCommandPaletteRequest({
          ...validRequest,
          anchor: { x: 100, y: 200 },
        }),
      ).not.toThrow();
    });

    it('should pass with no anchor (centered mode)', () => {
      expect(() => validateCommandPaletteRequest(validRequest)).not.toThrow();
    });
  });
});
