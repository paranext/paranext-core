import { describe, expect, test } from 'vitest';
import {
  EMPTY_WINDOW_LABEL_KEY,
  getWindowLabel,
} from '@renderer/components/docking/window-label.util';

/** Stand-in for looking a tab up in the live dock layout */
const lookUpIn =
  (titles: Record<string, string | undefined>) =>
  (tabId: string): { tabTitle?: string } | undefined =>
    tabId in titles ? { tabTitle: titles[tabId] } : undefined;

const panel = (activeId: string | undefined, ...tabIds: string[]) => ({
  activeId,
  tabs: tabIds.map((id) => ({ id })),
});

describe('getWindowLabel', () => {
  test('names the window after the first panel’s active tab', () => {
    const layout = { dockbox: { children: [panel('b', 'a', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ a: 'Home', b: 'MRK — wgPIDGIN' }))).toBe(
      'MRK — wgPIDGIN',
    );
  });

  test('falls through to the next tab carrying a title', () => {
    const layout = { dockbox: { children: [panel('a', 'a', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ a: undefined, b: 'Biblical Terms' }))).toBe(
      'Biblical Terms',
    );
  });

  test('keeps looking past a panel whose tabs are all untitled', () => {
    const layout = { dockbox: { children: [panel('a', 'a'), panel('b', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ a: undefined, b: 'Notes' }))).toBe('Notes');
  });

  test('finds a panel nested inside another box', () => {
    const layout = { dockbox: { children: [{ children: [panel('a', 'a')] }] } };

    expect(getWindowLabel(layout, lookUpIn({ a: 'Notes' }))).toBe('Notes');
  });

  test('ignores in-app float panels, which are transient and often modal', () => {
    // A dialog floating over the layout must not rename the window for as long as it is open
    const layout = {
      dockbox: { children: [panel('a', 'a')] },
      floatbox: { children: [panel('d', 'd')] },
    };

    expect(getWindowLabel(layout, lookUpIn({ a: 'MRK — wgPIDGIN', d: 'About' }))).toBe(
      'MRK — wgPIDGIN',
    );
  });

  test('names a window whose only float is a dialog after its docked content, not the dialog', () => {
    // The positive control for the case above: if float panels were walked, this would read 'About'
    const layout = {
      floatbox: { children: [panel('d', 'd')] },
      dockbox: { children: [panel('a', 'a')] },
    };

    expect(getWindowLabel(layout, lookUpIn({ a: 'Home', d: 'About' }))).toBe('Home');
  });

  test('stays unnamed rather than borrowing a float’s title when nothing docked has one', () => {
    // Whichever order a walk visited boxes in, reaching floats at all would name this window
    // 'About'. This is what pins floats out, rather than the cases where docked content wins anyway
    const layout = {
      dockbox: { children: [panel('a', 'a')] },
      floatbox: { children: [panel('d', 'd')] },
    };

    expect(getWindowLabel(layout, lookUpIn({ a: undefined, d: 'About' }))).toBe(
      EMPTY_WINDOW_LABEL_KEY,
    );
  });

  test('falls back to one string when no docked tab carries a title', () => {
    const layout = { dockbox: { children: [panel(undefined)] } };

    expect(getWindowLabel(layout, lookUpIn({}))).toBe(EMPTY_WINDOW_LABEL_KEY);
  });

  test('falls back when the layout holds nothing at all', () => {
    expect(getWindowLabel({}, lookUpIn({}))).toBe(EMPTY_WINDOW_LABEL_KEY);
  });

  test('skips a tab the layout names but the dock cannot find', () => {
    const layout = { dockbox: { children: [panel('gone', 'gone', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ b: 'Notes' }))).toBe('Notes');
  });
});
