/**
 * Validation functions for overlay service requests. Validates context menu items count, nesting
 * depth, and label lengths.
 */

import { newPlatformError, INVALID_ARGUMENT } from 'platform-bible-utils';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import { CommandPaletteRequest, PopoverRequest } from './overlay.service-model';

/** Throws a PlatformError with INVALID_ARGUMENT code */
function throwValidationError(message: string): never {
  const error = newPlatformError(message);
  error.code = INVALID_ARGUMENT;
  throw error;
}

const MAX_ITEMS_PER_LEVEL = 50;
const MAX_NESTING_DEPTH = 2;
const MAX_LABEL_LENGTH = 500;

/**
 * Validates a string label does not exceed MAX_LABEL_LENGTH.
 *
 * @param label The label string to validate
 * @throws PlatformError with code INVALID_ARGUMENT if the label exceeds the max length
 */
function validateLabelLength(label: string | undefined): void {
  if (label && typeof label === 'string' && label.length > MAX_LABEL_LENGTH) {
    throwValidationError(`Label exceeds maximum length of ${MAX_LABEL_LENGTH} characters`);
  }
}

/**
 * Validates an array of context menu items' count, nesting depth, and label lengths.
 *
 * @param items The context menu items to validate
 * @throws PlatformError with code INVALID_ARGUMENT if validation fails
 */
export function validateContextMenuItems(items: OverlayContextMenuItem[]): void {
  if (!items || items.length === 0) {
    throwValidationError('Items array must not be empty');
  }
  validateMenuItems(items, 0);
}

/**
 * Recursively validates menu items at a given depth.
 *
 * @param items The menu items to validate
 * @param depth The current nesting depth (0-based)
 * @throws PlatformError with code INVALID_ARGUMENT if validation fails
 */
export function validateMenuItems(items: OverlayContextMenuItem[], depth: number): void {
  if (items.length > MAX_ITEMS_PER_LEVEL) {
    throwValidationError(`Too many items at one level (max ${MAX_ITEMS_PER_LEVEL})`);
  }

  items.forEach((item) => {
    // Check label length for items that have labels
    if ('label' in item) validateLabelLength(item.label);

    // Check submenu nesting depth
    if (item.type === 'submenu') {
      if (depth >= MAX_NESTING_DEPTH) {
        throwValidationError(`Submenu nesting too deep (max ${MAX_NESTING_DEPTH} levels)`);
      }
      validateMenuItems(item.items, depth + 1);
    }
  });
}

/**
 * Validates a popover request's anchor, content, and options.
 *
 * @param request The popover request to validate
 * @throws PlatformError with code INVALID_ARGUMENT if validation fails
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
    throwValidationError('Anchor must have valid x and y coordinates');
  }

  // Validate content based on type
  const { content } = request;
  if (content.type === 'card') {
    if (!content.actions || content.actions.length === 0) {
      throwValidationError('Card content must have at least one action');
    }
  } else if (content.type === 'markdown') {
    if (
      !content.markdown ||
      (typeof content.markdown === 'string' && content.markdown.trim() === '')
    ) {
      throwValidationError('Markdown content must not be empty');
    }
  }

  // Validate optional numeric fields
  if (request.maxWidth !== undefined && request.maxWidth <= 0) {
    throwValidationError('maxWidth must be greater than 0');
  }

  if (request.dismissAfterMs !== undefined && request.dismissAfterMs <= 0) {
    throwValidationError('dismissAfterMs must be greater than 0');
  }
}

const MAX_COMMAND_PALETTE_ITEMS = 200;

/**
 * Validates a command palette request's items, anchor, and options.
 *
 * @param request The command palette request to validate
 * @throws PlatformError with code INVALID_ARGUMENT if validation fails
 */
export function validateCommandPaletteRequest(request: CommandPaletteRequest): void {
  if (!request.items || request.items.length === 0) {
    throwValidationError('Items array must not be empty');
  }
  if (request.items.length > MAX_COMMAND_PALETTE_ITEMS) {
    throwValidationError(`Too many items (max ${MAX_COMMAND_PALETTE_ITEMS})`);
  }

  request.items.forEach((item) => {
    if (!item.id) {
      throwValidationError('Each item must have an id');
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
      throwValidationError('Anchor must have valid x and y coordinates');
    }
  }

  if (request.maxWidth !== undefined && request.maxWidth <= 0) {
    throwValidationError('maxWidth must be greater than 0');
  }
  if (request.maxHeight !== undefined && request.maxHeight <= 0) {
    throwValidationError('maxHeight must be greater than 0');
  }
}
