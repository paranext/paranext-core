// @vitest-environment jsdom

import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDismissOnWindowBlur } from '@/hooks/use-dismiss-on-window-blur.hook';
import { getLastInteractionModality, trackInteractionModality } from './focus.util';

function Host() {
  const { ref } = useDismissOnWindowBlur<HTMLDivElement>({});
  return (
    <section>
      <div ref={ref} />
    </section>
  );
}

// The tracker's state is module-wide and persists across tests, so this is a single test
describe('trackInteractionModality', () => {
  it('a window-blur press does not count as the user choosing the pointer', () => {
    trackInteractionModality();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(getLastInteractionModality()).toBe('keyboard');

    render(<Host />);
    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    expect(getLastInteractionModality()).toBe('keyboard');

    // Positive control: a real press still switches the modality
    fireEvent.pointerDown(document.body);
    expect(getLastInteractionModality()).toBe('pointer');
  });
});
