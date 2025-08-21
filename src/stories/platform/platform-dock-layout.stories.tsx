import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DockMode, LayoutData, DockLayout, TabData } from 'rc-dock';
import { CSSProperties } from 'react';
import 'rc-dock/dist/rc-dock.css';

// Using `as` here simplifies type changes.
/* eslint-disable no-type-assertion/no-type-assertion */
const defaultLayout: LayoutData = {
  dockbox: {
    mode: 'horizontal' as DockMode,
    children: [
      {
        tabs: [
          {
            id: 'tab1',
            title: 'Tab 1',
            content: (
              <div style={{ padding: '20px' }}>
                <h3>Tab 1</h3>
                <p>This is content for Tab 1</p>
              </div>
            ),
          },
          {
            id: 'tab2',
            title: 'Tab 2',
            content: (
              <div style={{ padding: '20px' }}>
                <h3>Tab 2</h3>
                <p>This is content for Tab 2</p>
              </div>
            ),
          },
          {
            id: 'tab3',
            title: 'Tab 3',
            content: (
              <div style={{ padding: '20px' }}>
                <h3>Tab 3</h3>
                <p>This is content for Tab 3</p>
              </div>
            ),
          },
        ] as TabData[],
      },
      {
        mode: 'vertical',
        children: [
          {
            tabs: [
              {
                id: 'tab4',
                title: 'Tab 4',
                content: (
                  <div style={{ padding: '20px' }}>
                    <h3>Tab 4</h3>
                    <p>This is content for Tab 4</p>
                  </div>
                ),
              },
              {
                id: 'tab5',
                title: 'Tab 5',
                content: (
                  <div style={{ padding: '20px' }}>
                    <h3>Tab 5</h3>
                    <p>This is content for Tab 5</p>
                  </div>
                ),
              },
            ] as TabData[],
          },
        ],
      },
    ],
  },
};

const style: CSSProperties = {
  height: '400px',
};

function SimpleDockLayout() {
  return <DockLayout defaultLayout={defaultLayout} style={style} dropMode="edge" />;
}

type Story = StoryObj<typeof SimpleDockLayout>;

export const Default: Story = {
  args: {},
};

const meta: Meta<typeof SimpleDockLayout> = {
  title: 'platform/DockLayout',
  component: SimpleDockLayout,
  tags: ['autodocs'],
};
export default meta;
