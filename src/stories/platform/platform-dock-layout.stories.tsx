import { CSSProperties } from 'react';
import { DockMode, LayoutBase } from 'rc-dock';
import type { Meta, StoryObj } from '@storybook/react';

import DockLayoutWrapper from '@renderer/components/docking/dock-layout-wrapper.component';

import 'rc-dock/dist/rc-dock.css';
import '@renderer/components/docking/dock-layout-wrapper.component.scss';
import createRCDockTabFromTabInfo from '@renderer/components/docking/platform-dock-tab.component';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';

// Using `as` here simplifies type changes.
/* eslint-disable no-type-assertion/no-type-assertion */
const defaultLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal' as DockMode,
    children: [
      {
        tabs: [
          { id: 'tab1', tabTitle: 'tab1', content: <div>Hello World</div> },
          { id: 'tab2', tabTitle: 'tab2', content: <div>Hello 2</div> },
          { id: 'tab3', tabTitle: 'tab3', content: <div>Hello 3</div> },
          { id: 'tab4', tabTitle: 'tab4', content: <div>Hello 4</div> },
          {
            id: 'tab5',
            tabTitle: 'Hello012345678901234567890',
            content: <div>Hello012345678901234567890</div>,
          },
        ] as TabInfo[],
      },
      {
        mode: 'vertical',
        children: [
          {
            tabs: [
              { id: 'tab11', tabTitle: 'tab11', content: <div>Hello World</div> },
              { id: 'tab22', tabTitle: 'tab22', content: <div>Hello 2</div> },
              { id: 'tab33', tabTitle: 'tab33', content: <div>Hello 3</div> },
              { id: 'tab44', tabTitle: 'tab44', content: <div>Hello 4</div> },
            ] as TabInfo[],
          },
          {
            mode: 'horizontal',
            children: [
              {
                tabs: [
                  { id: 'tab111', tabTitle: 'tab111', content: <div>Hello World</div> },
                  { id: 'tab222', tabTitle: 'tab222', content: <div>Hello 2</div> },
                  { id: 'tab333', tabTitle: 'tab333', content: <div>Hello 3</div> },
                ] as TabInfo[],
              },
            ],
          },
        ],
      },
    ],
  },
  floatbox: {
    // Seems to only appear on refresh (resize the page)
    mode: 'window',
    children: [
      {
        tabs: [{ id: 'tab0', tabTitle: 'tab0', content: <div>Hello World</div> }] as TabInfo[],
      },
    ],
  },
};

const style: CSSProperties = {
  height: '400px',
};

function loadTab(tabInfo: SavedTabInfo) {
  // we will have all of the required fields
  return createRCDockTabFromTabInfo(tabInfo as TabInfo);
}

type Story = StoryObj<typeof DockLayoutWrapper>;

export const Default: Story = {
  args: { defaultLayout, style, loadTab },
};

export const meta: Meta<typeof DockLayoutWrapper> = {
  title: 'platform/DockLayout',
  component: DockLayoutWrapper,
  tags: ['autodocs'],
};

export default meta;
