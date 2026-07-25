import { LocalizeKey } from './extension-contributions/menus.model';

/**
 * Modifier keys that don't constitute typed input
 *
 * Sourced from
 * https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#modifier_keys
 */
export const MODIFIER_KEYS = new Set([
  'Alt',
  'AltGraph',
  'CapsLock',
  'Control',
  'Fn',
  'FnLock',
  'Hyper',
  'Meta',
  'NumLock',
  'ScrollLock',
  'Shift',
  'Super',
  'Symbol',
  'SymbolLock',
]);

/**
 * Physical keys (`KeyboardEvent.key` values) that {@link getLocalizeKeyForPhysicalKey} can name. Add
 * to this union as UI needs to display more key names.
 */
export type NameablePhysicalKey = 'Backspace' | 'Delete';

/**
 * Gets the localized string key naming a physical keyboard key, for UI that needs to display a
 * translated key name (e.g. a "press {key} again to confirm" hint). The platform's core
 * localization assets (`assets/localization/*.json`) provide the translations, so any caller can
 * use this without an extension having to declare its own copy of the string.
 */
export function getLocalizeKeyForPhysicalKey(key: NameablePhysicalKey): LocalizeKey {
  return `%physicalKey_${key.toLowerCase()}%`;
}
