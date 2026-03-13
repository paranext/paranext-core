/**
 * Validation functions for overlay service requests. Validates context menu items count, nesting
 * depth, and label lengths.
 */

import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuItem,
  ModalDialogOptions,
  ModalDialogType,
  OverlayValidationError,
  PopoverRequest,
} from '@shared/models/overlay.service-model';

const MAX_ITEMS_PER_LEVEL = 50;
const MAX_NESTING_DEPTH = 2;
const MAX_LABEL_LENGTH = 500;

/**
 * Validates a string label does not exceed MAX_LABEL_LENGTH.
 *
 * @param label The label string to validate
 * @throws OverlayValidationError if the label exceeds the max length
 */
function validateLabelLength(label: string | undefined): void {
  if (label && typeof label === 'string' && label.length > MAX_LABEL_LENGTH) {
    throw new OverlayValidationError(
      `Label exceeds maximum length of ${MAX_LABEL_LENGTH} characters`,
    );
  }
}

/**
 * Validates a context menu request's items, nesting depth, and label lengths.
 *
 * @param request The context menu request to validate
 * @throws OverlayValidationError if validation fails
 */
export function validateContextMenuRequest(request: ContextMenuRequest): void {
  if (!request.items || request.items.length === 0) {
    throw new OverlayValidationError('Items array must not be empty');
  }
  validateMenuItems(request.items, 0);
}

/**
 * Recursively validates menu items at a given depth.
 *
 * @param items The menu items to validate
 * @param depth The current nesting depth (0-based)
 * @throws OverlayValidationError if validation fails
 */
export function validateMenuItems(items: ContextMenuItem[], depth: number): void {
  if (items.length > MAX_ITEMS_PER_LEVEL) {
    throw new OverlayValidationError(`Too many items at one level (max ${MAX_ITEMS_PER_LEVEL})`);
  }

  items.forEach((item) => {
    // Check label length for items that have labels
    if ('label' in item) validateLabelLength(item.label);

    // Check submenu nesting depth
    if (item.type === 'submenu') {
      if (depth >= MAX_NESTING_DEPTH) {
        throw new OverlayValidationError(
          `Submenu nesting too deep (max ${MAX_NESTING_DEPTH} levels)`,
        );
      }
      validateMenuItems(item.items, depth + 1);
    }
  });
}

/**
 * Validates a popover request's anchor, content, and options.
 *
 * @param request The popover request to validate
 * @throws OverlayValidationError if validation fails
 */
export function validatePopoverRequest(request: PopoverRequest): void {
  // Validate anchor coordinates
  if (
    !request.anchor ||
    typeof request.anchor.x !== 'number' ||
    typeof request.anchor.y !== 'number' ||
    Number.isNaN(request.anchor.x) ||
    Number.isNaN(request.anchor.y)
  ) {
    throw new OverlayValidationError('Anchor must have valid x and y coordinates');
  }

  // Validate content based on type
  const { content } = request;
  if (content.type === 'card') {
    if (!content.actions || content.actions.length === 0) {
      throw new OverlayValidationError('Card content must have at least one action');
    }
  } else if (content.type === 'list') {
    if (!content.items || content.items.length === 0) {
      throw new OverlayValidationError('List content must have at least one item');
    }
  } else if (content.type === 'richText') {
    if (!content.body || content.body.length === 0) {
      throw new OverlayValidationError('Rich text content must have at least one text run');
    }
  } else if (content.type === 'description') {
    if (!content.entries || content.entries.length === 0) {
      throw new OverlayValidationError('Description content must have at least one entry');
    }
  }

  // Validate optional numeric fields
  if (request.maxWidth !== undefined && request.maxWidth <= 0) {
    throw new OverlayValidationError('maxWidth must be greater than 0');
  }

  if (request.dismissAfterMs !== undefined && request.dismissAfterMs <= 0) {
    throw new OverlayValidationError('dismissAfterMs must be greater than 0');
  }
}

const MAX_COMMAND_PALETTE_ITEMS = 200;

/**
 * Validates a command palette request's items, anchor, and options.
 *
 * @param request The command palette request to validate
 * @throws OverlayValidationError if validation fails
 */
export function validateCommandPaletteRequest(request: CommandPaletteRequest): void {
  if (!request.items || request.items.length === 0) {
    throw new OverlayValidationError('Items array must not be empty');
  }
  if (request.items.length > MAX_COMMAND_PALETTE_ITEMS) {
    throw new OverlayValidationError(`Too many items (max ${MAX_COMMAND_PALETTE_ITEMS})`);
  }

  request.items.forEach((item) => {
    if (!item.id) {
      throw new OverlayValidationError('Each item must have an id');
    }
    validateLabelLength(item.label);
    if (item.description) validateLabelLength(item.description);
  });

  // Validate anchor if provided
  if (request.anchor) {
    if (
      typeof request.anchor.x !== 'number' ||
      typeof request.anchor.y !== 'number' ||
      Number.isNaN(request.anchor.x) ||
      Number.isNaN(request.anchor.y)
    ) {
      throw new OverlayValidationError('Anchor must have valid x and y coordinates');
    }
  }

  if (request.maxWidth !== undefined && request.maxWidth <= 0) {
    throw new OverlayValidationError('maxWidth must be greater than 0');
  }
  if (request.maxHeight !== undefined && request.maxHeight <= 0) {
    throw new OverlayValidationError('maxHeight must be greater than 0');
  }
}

/**
 * Validates modal dialog options based on dialog type.
 *
 * @param dialogType The type of dialog (alert, confirm)
 * @param options The dialog options to validate
 * @throws OverlayValidationError if validation fails
 */
export function validateModalDialogOptions<T extends ModalDialogType>(
  dialogType: T,
  options: ModalDialogOptions[T],
): void {
  // Validate that message is present (required for all dialog types)
  if (!('message' in options) || !options.message) {
    throw new OverlayValidationError(`${dialogType} dialog requires a message`);
  }

  // Validate labels common to all dialog types
  if ('title' in options) validateLabelLength(options.title);
  if ('message' in options) validateLabelLength(options.message);
  if ('okLabel' in options) validateLabelLength(options.okLabel);
  if ('cancelLabel' in options) validateLabelLength(options.cancelLabel);
}
