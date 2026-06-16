/**
 * Tiny store that tracks whether the toolbar's project picker dropdown is currently open.
 *
 * The workspace-updating overlay subscribes to this so it can left-align its text when the picker
 * is open at narrow widths — the centered text would otherwise be hidden behind the dropdown.
 */

let isOpen = false;
const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function setProjectPickerOpen(value: boolean): void {
  if (isOpen === value) return;
  isOpen = value;
  notifyListeners();
}

export function getProjectPickerOpen(): boolean {
  return isOpen;
}

export function subscribeToProjectPickerOpen(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Resets the store to its initial state.
 *
 * WARNING: Test-only. @internal
 */
export function resetProjectPickerOpen(): void {
  isOpen = false;
  listeners.clear();
}
