// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import type { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import {
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
  Z_INDEX_NESTED_MODAL,
  Z_INDEX_NESTED_MODAL_BACKDROP,
} from '@/components/z-index';

/**
 * `DialogOverlay` sets its `zIndex` inline, and inline styles beat classes — so `overlayClassName`
 * cannot restack the backdrop and `overlayStyle` is the only way a nested modal can lift its
 * backdrop above the dialog hosting it. Without the forwarding these pin, the backdrop silently
 * falls back to the flat modal tier and the host dialog it should dim stays bright.
 *
 * Compared as declared strings rather than through `Number(...)`: `Number('')` is `0`, which would
 * make a missing z-index read as a deliberate one.
 */
describe('DialogContent overlay styling', () => {
  const renderDialog = (props: ComponentProps<typeof DialogContent> = {}) =>
    render(
      <Dialog open>
        <DialogContent {...props}>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

  // Through the nested-modal constants rather than their literal values: this asserts that what a
  // caller passes is what arrives, so pinning the numbers would leave it passing against stale ones
  // if either tier is ever re-valued.
  it('forwards overlayStyle to the backdrop', () => {
    renderDialog({
      overlayStyle: { zIndex: Z_INDEX_NESTED_MODAL_BACKDROP },
      style: { zIndex: Z_INDEX_NESTED_MODAL },
    });

    expect(document.querySelector<HTMLElement>('[data-slot="dialog-overlay"]')?.style.zIndex).toBe(
      String(Z_INDEX_NESTED_MODAL_BACKDROP),
    );
    expect(document.querySelector<HTMLElement>('[data-slot="dialog-content"]')?.style.zIndex).toBe(
      String(Z_INDEX_NESTED_MODAL),
    );
  });

  it('leaves both layers on the shared modal tiers when no override is given', () => {
    renderDialog();

    expect(document.querySelector<HTMLElement>('[data-slot="dialog-overlay"]')?.style.zIndex).toBe(
      String(Z_INDEX_MODAL_BACKDROP),
    );
    expect(document.querySelector<HTMLElement>('[data-slot="dialog-content"]')?.style.zIndex).toBe(
      String(Z_INDEX_MODAL),
    );
  });
});
