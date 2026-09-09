// @vitest-environment jsdom

import { fireEvent, render } from '@testing-library/react';
import {
  useInteractionModalityRef,
  type InteractionModality,
} from './use-interaction-modality.hook';

/** Renders the hook and exposes its ref, so a test can read the live modality after events. */
function renderTracker() {
  const read: { current: () => InteractionModality } = { current: () => 'none' };
  function Tracker() {
    const modality = useInteractionModalityRef();
    read.current = () => modality.current;
    return undefined;
  }
  const view = render(<Tracker />);
  return { ...view, modality: () => read.current() };
}

describe('useInteractionModalityRef', () => {
  test('starts at "none" before any input', () => {
    const { modality } = renderTracker();
    expect(modality()).toBe('none');
  });

  test.each([
    ['keydown', 'keyboard'],
    ['pointerdown', 'pointer'],
  ] as const)('a document %s sets the modality to "%s"', (eventName, expected) => {
    const { modality } = renderTracker();
    fireEvent[eventName === 'keydown' ? 'keyDown' : 'pointerDown'](document.body);
    expect(modality()).toBe(expected);
  });

  // The whole reason this is document-wide rather than per-component state: a label that mounts
  // after the user's last click must still read "pointer", or it treats the focus Radix hands back
  // on menu close as a keyboard arrival and reveals a tooltip nobody asked for.
  test('a component mounted after the input still reads what the user last did', () => {
    const first = renderTracker();
    fireEvent.pointerDown(document.body);
    first.unmount();

    const second = renderTracker();
    expect(second.modality()).toBe('pointer');
  });

  // The listeners are refcounted, so the last unmount has to detach them and a later mount has to
  // attach them again — otherwise tracking dies silently the first time the tree empties.
  test('tracking resumes after every consumer has unmounted', () => {
    renderTracker().unmount();

    const { modality } = renderTracker();
    fireEvent.keyDown(document.body);
    expect(modality()).toBe('keyboard');
  });

  test('one consumer unmounting does not stop tracking for another', () => {
    const first = renderTracker();
    const second = renderTracker();
    first.unmount();

    fireEvent.keyDown(document.body);
    expect(second.modality()).toBe('keyboard');
  });
});
