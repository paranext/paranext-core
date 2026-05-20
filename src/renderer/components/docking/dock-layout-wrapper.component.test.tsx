import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { DockLayoutWrapper } from './dock-layout-wrapper.component';

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

// rc-dock pulls in a lot of stuff in jsdom — capture the props it receives via a mock.
const mockDockLayoutProps = vi.fn();
vi.mock('rc-dock', async () => {
  const actual = await vi.importActual<object>('rc-dock');
  return {
    ...actual,
    default: (props: Record<string, unknown>) => {
      mockDockLayoutProps(props);
      return <div data-testid="mock-dock-layout" />;
    },
  };
});

describe('DockLayoutWrapper', () => {
  beforeEach(() => {
    mockDockLayoutProps.mockClear();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
  });

  it('passes dropMode="edge" in power mode', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    render(<DockLayoutWrapper loadTab={vi.fn()} saveTab={vi.fn()} onLayoutChange={vi.fn()} />);
    expect(mockDockLayoutProps).toHaveBeenCalled();
    const props = mockDockLayoutProps.mock.calls[0][0];
    expect(props.dropMode).toBe('edge');
  });

  it('omits dropMode in simple mode', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<DockLayoutWrapper loadTab={vi.fn()} saveTab={vi.fn()} onLayoutChange={vi.fn()} />);
    const props = mockDockLayoutProps.mock.calls[0][0];
    expect(props.dropMode).toBeUndefined();
  });

  it('supplies groups with tabLocked in simple mode', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<DockLayoutWrapper loadTab={vi.fn()} saveTab={vi.fn()} onLayoutChange={vi.fn()} />);
    const props = mockDockLayoutProps.mock.calls[0][0];
    // 'card platform-bible' is TAB_GROUP from positioning util
    expect(props.groups['card platform-bible'].tabLocked).toBe(true);
    expect(props.groups['card platform-bible'].panelExtra).toBeUndefined();
  });
});
