import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '@/components/shadcn-ui/button';
import { ContentZoomRoot } from './content-zoom-root.component';

/**
 * Storybook has no platform, so the story supplies the two things the platform injects into every
 * web view: the main area's zoom rule and a factor for it (200 %).
 */
const PLATFORM_ZOOM_STAND_IN =
  '.content-zoom-story{--platform-content-zoom-main:2}' +
  '[data-platform-content-zoom-root=""]{zoom:var(--platform-content-zoom-main,1)}';

const meta: Meta<typeof ContentZoomRoot> = {
  title: 'Advanced/ContentZoomRoot',
  component: ContentZoomRoot,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ContentZoomRoot>;

/** Only the marked span grows; the reference button beside it in the same line stays at 100 %. */
export const InlineSpanAt200Percent: Story = {
  render: () => (
    <div className="content-zoom-story">
      <style>{PLATFORM_ZOOM_STAND_IN}</style>
      <p className="tw:flex tw:items-baseline tw:gap-2 tw:text-sm">
        <Button variant="ghost" size="sm">
          GEN 1:1
        </Button>
        <ContentZoomRoot as="span" className="scripture-font">
          In the beginning God created the heavens and the earth.
        </ContentZoomRoot>
      </p>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step('The marker is a span and the button is outside it', async () => {
      const marker = canvasElement.querySelector('[data-platform-content-zoom-root]');
      await expect(marker?.tagName).toBe('SPAN');
      await expect(marker?.querySelector('button')).toBeNull();
    });
  },
};
