import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getProjectPickerOpen,
  resetProjectPickerOpen,
  setProjectPickerOpen,
  subscribeToProjectPickerOpen,
} from './project-picker-open-store';

describe('project-picker-open-store', () => {
  beforeEach(() => {
    resetProjectPickerOpen();
  });

  it('starts closed', () => {
    expect(getProjectPickerOpen()).toBe(false);
  });

  it('toggles open and closed', () => {
    setProjectPickerOpen(true);
    expect(getProjectPickerOpen()).toBe(true);
    setProjectPickerOpen(false);
    expect(getProjectPickerOpen()).toBe(false);
  });

  it('notifies subscribers on change', () => {
    const listener = vi.fn();
    subscribeToProjectPickerOpen(listener);
    setProjectPickerOpen(true);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('does not notify when value is unchanged', () => {
    const listener = vi.fn();
    subscribeToProjectPickerOpen(listener);
    setProjectPickerOpen(false); // already false
    expect(listener).not.toHaveBeenCalled();
  });

  it('returned unsubscriber stops notifications', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToProjectPickerOpen(listener);
    unsubscribe();
    setProjectPickerOpen(true);
    expect(listener).not.toHaveBeenCalled();
  });
});
