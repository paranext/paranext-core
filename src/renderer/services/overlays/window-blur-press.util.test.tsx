import { act, render } from '@testing-library/react';
import { useDismissOnWindowBlur } from 'platform-bible-react';
import { isWindowBlurPress } from '@renderer/services/overlays/window-blur-press.util';

function Host() {
  const { ref } = useDismissOnWindowBlur<HTMLDivElement>({});
  return (
    <section>
      <div ref={ref} />
    </section>
  );
}

describe('isWindowBlurPress', () => {
  it('reads the marker the library puts on its window-blur press', () => {
    const captured: Event[] = [];
    const capture = (event: Event) => {
      captured.push(event);
    };
    document.addEventListener('pointerdown', capture);
    try {
      render(<Host />);

      act(() => {
        window.dispatchEvent(new Event('blur'));
      });

      expect(captured).toHaveLength(1);
      expect(isWindowBlurPress(captured[0])).toBe(true);
      expect(isWindowBlurPress(new Event('pointerdown'))).toBe(false);
    } finally {
      document.removeEventListener('pointerdown', capture);
    }
  });
});
