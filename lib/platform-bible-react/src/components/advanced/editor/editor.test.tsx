import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { Editor } from './editor';

/**
 * The editor's format toolbar must not be sticky. It shares no scroll container with the comment
 * panel's filter toolbar, so an equal z-index plus a later DOM position made it paint over that
 * toolbar. The editor box never scrolls internally, so sticky buys nothing here either.
 */
test('the format toolbar is not sticky, so it cannot paint over panel chrome', () => {
  const { container } = render(<Editor />);

  const toolbar = container.querySelector('[data-testid="editor-format-toolbar"]');
  expect(toolbar).not.toBeNull();
  expect(toolbar?.className).not.toMatch(/\b(sticky|fixed)\b/);
  expect(toolbar?.className).not.toMatch(/\bz-/);
  expect(toolbar?.getAttribute('style') ?? '').not.toMatch(/position|z-index/);
});

test('renders the actions slot inside the bordered box, after the content area', () => {
  const { container } = render(<Editor actions={<button type="button">Send</button>} />);

  const box = container.firstElementChild;
  const actions = container.querySelector('[data-slot="editor-actions"]');
  const contentEditable = container.querySelector('[contenteditable]');
  if (!actions || !contentEditable) {
    throw new Error('expected both the content-editable element and the actions slot to render');
  }
  // Inside the bordered box, so it reads as part of the editor rather than a detached row.
  expect(box?.contains(actions)).toBe(true);
  // After the content area, so tab order runs text -> actions with no tabIndex juggling.
  const position = contentEditable.compareDocumentPosition(actions);
  // compareDocumentPosition returns a bitmask; testing the FOLLOWING bit has no non-bitwise form.
  // eslint-disable-next-line no-bitwise
  expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('renders no actions container when no actions are passed', () => {
  const { container } = render(<Editor />);
  expect(container.querySelector('[data-slot="editor-actions"]')).toBeNull();
});

test('actions stay keyboard reachable once inside the box', async () => {
  // Moving controls inside a contenteditable's container is the kind of change that quietly
  // strands them behind a tabIndex={-1} wrapper, so assert reachability directly rather than
  // inferring it from DOM order.
  render(
    <Editor
      actions={
        <>
          <button type="button">Assign</button>
          <button type="button">Submit</button>
        </>
      }
    />,
  );

  const assign = screen.getByRole('button', { name: 'Assign' });
  const submit = screen.getByRole('button', { name: 'Submit' });

  expect(assign).not.toHaveAttribute('tabindex', '-1');
  expect(submit).not.toHaveAttribute('tabindex', '-1');

  // Walk forward until focus lands on the actions; the contenteditable and any toolbar buttons
  // come first, and how many of those there are is not this test's business. Recursion (rather
  // than a loop) keeps each tab sequential without an await-in-loop suppression.
  const tabUntilFocused = async (target: Element, stepsRemaining: number): Promise<void> => {
    if (stepsRemaining <= 0 || document.activeElement === target) return;
    await userEvent.tab();
    await tabUntilFocused(target, stepsRemaining - 1);
  };
  await tabUntilFocused(assign, 10);
  expect(document.activeElement).toBe(assign);

  await userEvent.tab();
  expect(document.activeElement).toBe(submit);
});
