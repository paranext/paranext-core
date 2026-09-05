// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';

function renderOpenPopover(className?: string) {
  render(
    <Popover open>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent className={className}>Content</PopoverContent>
    </Popover>,
  );

  const content = document.querySelector('[data-slot="popover-content"]');
  if (!content) throw new Error('Popover content did not render');
  return content.className;
}

describe('PopoverContent', () => {
  // jsdom computes no Tailwind CSS and gives Radix no viewport to collide with, so these pin the
  // class strings a `shadcn apply` would revert. Without the cap a popover that flips above its
  // trigger overruns the top of a web view's iframe and is clipped away with no way to scroll to
  // it, so the cap and its scroller have to ship together by default.

  it('caps its height to the space Radix has available', () => {
    expect(renderOpenPopover()).toContain('tw:max-h-(--radix-popover-content-available-height)');
  });

  it('scrolls vertically so capped content stays reachable', () => {
    expect(renderOpenPopover()).toContain('tw:overflow-y-auto');
  });

  it('hides horizontal overflow so the y-axis scroller cannot promote the x-axis to `auto`', () => {
    expect(renderOpenPopover()).toContain('tw:overflow-x-hidden');
  });

  it('lets a call site override the defaults', () => {
    const className = renderOpenPopover('tw:max-h-[70vh] tw:overflow-y-visible');

    expect(className).toContain('tw:max-h-[70vh]');
    expect(className).not.toContain('tw:max-h-(--radix-popover-content-available-height)');
    expect(className).toContain('tw:overflow-y-visible');
    expect(className).not.toContain('tw:overflow-y-auto');
  });
});
