import { PropsWithChildren } from 'react';
import './platform-panel.component.css';

type PlatformPanelProps = PropsWithChildren<{
  /** ID of the tab */
  id: string;
}>;

/**
 * Used for possible styling on every panel in Platform
 *
 * @param children The children of the panel (usually supplied from an extension)
 */
export function PlatformPanel({ id, children }: PlatformPanelProps) {
  return (
    <div data-tab-id={id} className="platform-panel">
      {children}
    </div>
  );
}

export default PlatformPanel;
