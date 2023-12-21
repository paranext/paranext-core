import 'rc-dock/dist/rc-dock.css';
import './dock-layout-wrapper.component.scss';

import { CSSProperties, ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import DockLayout, { LayoutProps, LayoutData, LayoutBase } from 'rc-dock';

import { SavedTabInfo } from '@shared/models/docking-framework.model';

import { RCDockTabInfo } from './docking-framework-internal.model';
import { GROUPS } from './platform-dock-layout-positioning.util';

export type DockLayoutWrapperProps = PropsWithChildren<{
  loadTab: (savedTabInfo: SavedTabInfo) => RCDockTabInfo;
  saveTab: (dockTabInfo: RCDockTabInfo) => SavedTabInfo | undefined;
  onLayoutChange: LayoutProps['onLayoutChange'];
  defaultLayout?: LayoutBase;
  style?: CSSProperties;
}>;

const DockLayoutWrapper = forwardRef(function DockLayoutWrapper(
  { loadTab, saveTab, onLayoutChange, defaultLayout, style }: DockLayoutWrapperProps,
  ref: ForwardedRef<DockLayout> | undefined,
) {
  return (
    <DockLayout
      ref={ref}
      groups={GROUPS}
      // DockLayout requires LayoutData, but it needs to be LayoutBase in case we use loadTab
      /* eslint-disable no-type-assertion/no-type-assertion */
      defaultLayout={
        (defaultLayout as LayoutData) || { dockbox: { mode: 'horizontal', children: [] } }
      }
      style={style}
      dropMode="edge"
      loadTab={loadTab}
      // Type assert `saveTab` as not returning `undefined` because rc-dock's types are wrong
      // Here, if `saveTab` returns `undefined` the tab is not saved
      // https://github.com/ticlo/rc-dock/blob/8b6481dca4b4dd07f89107d6f48b1831bbdf0470/src/Serializer.ts#L68
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      saveTab={saveTab as (dockTabInfo: RCDockTabInfo) => SavedTabInfo}
      onLayoutChange={onLayoutChange}
    />
  );
});

export default DockLayoutWrapper;
