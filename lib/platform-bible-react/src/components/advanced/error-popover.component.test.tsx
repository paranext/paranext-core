// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { ErrorPopover } from './error-popover.component';

beforeAll(() => {
  installNoopResizeObserver();
});

async function openErrorPopover(id?: string) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <ErrorPopover errorDetails="boom" localizedStrings={{}} id={id}>
      <button type="button">details</button>
    </ErrorPopover>,
  );
  const trigger = screen.getByRole('button', { name: 'details' });
  await user.click(trigger);
  const content = await waitFor(() => {
    const element = document.querySelector<HTMLElement>('[data-slot="popover-content"]');
    if (!element) throw new Error('error popover did not open');
    return element;
  });
  return { trigger, content };
}

describe('ErrorPopover', () => {
  test("the trigger's aria-controls names the open content when no id is given", async () => {
    const { trigger, content } = await openErrorPopover();

    expect(document.getElementById(trigger.getAttribute('aria-controls') ?? '')).toBe(content);
  });

  test("the trigger's aria-controls names the open content when an id is given", async () => {
    const { trigger, content } = await openErrorPopover('error-under-test');

    expect(trigger).toHaveAttribute('aria-controls', 'error-under-test');
    expect(document.getElementById('error-under-test')).toBe(content);
  });
});
