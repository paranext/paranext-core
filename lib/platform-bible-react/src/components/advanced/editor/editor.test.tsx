import { render } from '@testing-library/react';
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
  expect(toolbar?.className).not.toMatch(/\bsticky\b/);
  expect(toolbar?.className).not.toMatch(/\bz-\d/);
});
