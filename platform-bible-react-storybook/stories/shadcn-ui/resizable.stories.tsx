import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/shadcn-ui/resizable';

const meta: Meta = {
  title: 'Shadcn/Resizable',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '600px', height: '300px', border: '1px solid #ccc' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#f0f0f0', height: '100%' }}>Left panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#e0e0e0', height: '100%' }}>Right panel</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup orientation="vertical">
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#f0f0f0', height: '100%' }}>Top panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#e0e0e0', height: '100%' }}>Bottom panel</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#f0f0f0', height: '100%' }}>Panel 1</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#e0e0e0', height: '100%' }}>Panel 2</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#d0d0d0', height: '100%' }}>Panel 3</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithMinMax: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel>
        <div style={{ padding: '1rem', background: '#f0f0f0', height: '100%' }}>Auto panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={39} minSize={15} maxSize={85}>
        <div style={{ padding: '1rem', background: '#e0e0e0', height: '100%' }}>
          39% default, 15–85% range
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
