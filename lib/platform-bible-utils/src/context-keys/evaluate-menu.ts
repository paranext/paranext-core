import {
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
  SingleColumnMenu,
} from '../extension-contributions/menus.model';
import { deepClone } from '../util';
import { ContextKeyLookup } from './context-keys.model';
import { evaluateWhenExpression } from './when-expression';

/** Menu document shapes that {@link evaluateMenu} can process */
export type EvaluatableMenu =
  | SingleColumnMenu
  | MultiColumnMenu
  | Localized<SingleColumnMenu>
  | Localized<MultiColumnMenu>;

/** Callback invoked when a when-expression fails to evaluate */
export type WhenExpressionErrorHandler = (expression: string, error: unknown) => void;

type AnyMenuItem =
  | MenuItemContainingCommand
  | MenuItemContainingSubmenu
  | Localized<MenuItemContainingCommand>
  | Localized<MenuItemContainingSubmenu>;

/**
 * Evaluates all when-expressions in a menu document against the current context key values.
 *
 * - Items whose `when` evaluates falsy are removed.
 * - Items with `enabledWhen` get `disabled` set to the negated result.
 * - Command items with `checkedWhen` get `checked` set to the result.
 * - Submenu items whose submenus were emptied by that filtering are removed (recursively), and so are
 *   groups and columns it emptied. Containers with no items in the document to begin with are left
 *   alone, since a surface may fill them at open time.
 * - The `when`/`enabledWhen`/`checkedWhen` fields are stripped from the output.
 *
 * The input document is not mutated; a deep clone is returned.
 *
 * @param menu The menu document to evaluate (localized or not)
 * @param getContextKey Function that looks up the current value of a context key
 * @param templateVars Values for `{placeholder}` segments in property references
 * @param onError Called for each expression that fails to evaluate (rare — expressions are
 *   validated at contribution load time). Failed expressions fail safe: `when` → hidden,
 *   `enabledWhen` → disabled, `checkedWhen` → unchecked
 * @returns A new menu document with expressions applied and stripped
 */
export function evaluateMenu<T extends EvaluatableMenu>(
  menu: T,
  getContextKey: ContextKeyLookup,
  templateVars: Record<string, string | undefined> = {},
  onError: WhenExpressionErrorHandler = () => {},
): T {
  const result = deepClone(menu);

  const safeEvaluate = (
    expression: string | undefined,
    resultOnMissing: boolean,
    resultOnError: boolean,
  ): boolean => {
    if (expression === undefined) return resultOnMissing;
    try {
      return evaluateWhenExpression(expression, getContextKey, templateVars);
    } catch (error) {
      onError(expression, error);
      return resultOnError;
    }
  };

  // The items array is structurally the same for all EvaluatableMenu variants.
  // Type assertion needed because TypeScript cannot narrow the generic T's items array type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const allItems = result.items as AnyMenuItem[];
  // Groups keyed by plain strings for ergonomic indexing (keys are ReferencedItem branded strings).
  // Type assertion needed because TypeScript preserves the branded-string index signature from the
  // model types, which prevents plain string iteration.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const groups = result.groups as Record<
    string,
    { order: number; column?: string; menuItem?: string }
  >;

  // 1. Visibility filtering and enabled/checked decoration
  let visibleItems = allItems.filter((item) => safeEvaluate(item.when, true, false));
  visibleItems.forEach((item) => {
    if (item.enabledWhen !== undefined)
      item.disabled = !safeEvaluate(item.enabledWhen, true, false);
    if ('command' in item && item.checkedWhen !== undefined)
      item.checked = safeEvaluate(item.checkedWhen, false, false);
    delete item.when;
    delete item.enabledWhen;
    if ('command' in item) delete item.checkedWhen;
  });

  // Containers are pruned only when evaluation emptied them. A submenu, group, or column with no
  // items in the document to begin with is left alone: some surfaces fill such a container at open
  // time (the tab menu's move-to-window list), so an empty one is not evidence that anything hid.
  const groupKeysWithItems = new Set(allItems.map((item) => item.group));
  const getSubmenuGroupKeys = (submenuId: string): string[] =>
    Object.keys(groups).filter((groupKey) => groups[groupKey].menuItem === submenuId);

  // 2. Prune submenu items whose submenus were emptied. Loop until stable to handle nested
  // submenus emptying out bottom-up. `snapshot` captures the pre-iteration set so the filter tests
  // against items-before-this-pass, not the partially-pruned result.
  let changed = true;
  while (changed) {
    const snapshot = visibleItems;
    const pruned = snapshot.filter((item) => {
      if (!('id' in item)) return true;
      const submenuGroupKeys = getSubmenuGroupKeys(item.id);
      const hadItems = submenuGroupKeys.some((groupKey) => groupKeysWithItems.has(groupKey));
      if (!hadItems) return true;
      return snapshot.some((other) => submenuGroupKeys.includes(other.group));
    });
    changed = pruned.length !== snapshot.length;
    visibleItems = pruned;
  }

  // 3. Prune groups that were emptied
  const columnKeysWithGroups = new Set<string>();
  Object.values(groups).forEach((group) => {
    if (group.column !== undefined) columnKeysWithGroups.add(group.column);
  });
  const visibleGroupKeys = new Set(visibleItems.map((item) => item.group));
  Object.keys(groups).forEach((groupKey) => {
    if (groupKeysWithItems.has(groupKey) && !visibleGroupKeys.has(groupKey))
      delete groups[groupKey];
  });

  // 4. Prune columns that were emptied (multi-column menus only)
  if ('columns' in result && result.columns) {
    // Columns keyed by plain strings for ergonomic indexing (same branded-string index reason as
    // groups above).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const columns = result.columns as Record<string, unknown>;
    const usedColumnKeys = new Set<string>();
    Object.values(groups).forEach((group) => {
      if (group.column !== undefined) usedColumnKeys.add(group.column);
    });
    Object.keys(columns).forEach((columnKey) => {
      if (columnKeysWithGroups.has(columnKey) && !usedColumnKeys.has(columnKey))
        delete columns[columnKey];
    });
  }

  // Assign filtered items back; the cast is safe because we only removed items, not changed type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  result.items = visibleItems as typeof result.items;
  return result;
}
