// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/shadcn-ui/sidebar';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';

// Radix positions an open tooltip with a ResizeObserver, which jsdom lacks
beforeAll(() => {
  installNoopResizeObserver();
});

describe('SidebarTrigger', () => {
  it('shows its label as a hover tooltip', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <SidebarProvider>
        <SidebarTrigger label="Barra lateral" />
      </SidebarProvider>,
    );

    const trigger = screen.getByRole('button', { name: 'Barra lateral' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Barra lateral');
  });

  it('falls back to English when no label is given', () => {
    render(
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>,
    );

    expect(screen.getByRole('button', { name: 'Toggle Sidebar' })).toBeInTheDocument();
  });
});
