/**
 * Validation functions for overlay service requests. Validates context menu items count, nesting
 * depth, and label lengths.
 */

import {
  newPlatformError,
  INVALID_ARGUMENT,
  type Localized,
  type MultiColumnMenu,
} from 'platform-bible-utils';
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

/** Most items a tab menu may hold, counting the items of its submenus */
const MAX_TAB_MENU_ITEMS = 200;

/** Whether a value is a non-null object that is not an array */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !!value && !Array.isArray(value);
}

/** Whether a value is a number that is neither NaN nor infinite */
function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Throws if following the menu's submenus from any submenu item ever leads back to it. The tab menu
 * builds its tree by following them, so a cycle would recurse forever while the window renders.
 */
function validateNoSubmenuCycle(menu: Localized<MultiColumnMenu>): void {
  // Submenu items (the ones without a command) in each group
  const submenuIdsByGroup = new Map<string, string[]>();
  menu.items.forEach((item) => {
    if ('command' in item) return;
    submenuIdsByGroup.set(item.group, [...(submenuIdsByGroup.get(item.group) ?? []), item.id]);
  });
  const childSubmenuIds = (submenuId: string) =>
    Object.entries(menu.groups).flatMap(([groupKey, group]) =>
      'menuItem' in group && group.menuItem === submenuId
        ? (submenuIdsByGroup.get(groupKey) ?? [])
        : [],
    );

  const finished = new Set<string>();
  const visit = (submenuId: string, path: Set<string>): void => {
    if (path.has(submenuId)) throwValidationError(`Submenu ${submenuId} contains itself`);
    if (finished.has(submenuId)) return;
    path.add(submenuId);
    childSubmenuIds(submenuId).forEach((childId) => visit(childId, path));
    path.delete(submenuId);
    finished.add(submenuId);
  };
  [...submenuIdsByGroup.values()].flat().forEach((submenuId) => visit(submenuId, new Set()));
}

/**
 * Validates a tab menu and the anchor it opens at: the menu's shape (columns, groups and items as
 * the tab menu reads them), its item count and label lengths, that no submenu contains itself, and
 * that the anchor is a rectangle of finite numbers. The menu comes from a WebView but renders in
 * the window, so anything here that would throw while rendering must be refused up front.
 *
 * @param menu The tab menu to validate
 * @param anchor The rectangle of the menu's trigger
 * @throws PlatformError with code INVALID_ARGUMENT if validation fails
 */
export function validateTabMenu(menu: Localized<MultiColumnMenu>, anchor: unknown): void {
  if (!isRecord(menu)) throwValidationError('Menu is missing');
  if (!isRecord(menu.columns)) throwValidationError('Menu has no columns');
  if (!isRecord(menu.groups) || !Object.values(menu.groups).every(isRecord))
    throwValidationError('Menu groups must be objects');
  if (!Array.isArray(menu.items) || menu.items.length === 0)
    throwValidationError('Menu has no items');
  if (menu.items.length > MAX_TAB_MENU_ITEMS)
    throwValidationError(`Too many menu items (max ${MAX_TAB_MENU_ITEMS})`);
  menu.items.forEach((item) => {
    if (!isRecord(item) || typeof item.group !== 'string')
      throwValidationError('Every menu item needs a group');
    if (!('command' in item) && typeof item.id !== 'string')
      throwValidationError('A submenu item needs an id');
    validateLabelLength(item.label);
  });
  validateNoSubmenuCycle(menu);

  if (
    !isRecord(anchor) ||
    !isFiniteNumber(anchor.x) ||
    !isFiniteNumber(anchor.y) ||
    !isFiniteNumber(anchor.width) ||
    !isFiniteNumber(anchor.height)
  )
    throwValidationError('Anchor must have finite x, y, width and height');
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

  if (request.maxHeight !== undefined && request.maxHeight <= 0) {
    throwValidationError('maxHeight must be greater than 0');
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

  // A list-focused palette has no driver of its own. It focuses the list and renders its filter
  // READ-ONLY, and the component handles nothing but Escape outside forwarding — so without a
  // requester driving it, typing does nothing, the arrows do not move the highlight and Enter does
  // not commit. The user could only press Escape or click. The two options are one feature.
  //
  // `passive` is excluded because it takes no focus at all, which makes `focusTarget` moot: the
  // requester already receives every key.
  if (!request.passive && request.focusTarget === 'list' && !request.keyForwarding) {
    throwValidationError("focusTarget 'list' requires keyForwarding");
  }

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
