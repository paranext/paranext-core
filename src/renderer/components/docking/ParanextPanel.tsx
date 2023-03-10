import { ReactNode } from 'react';
import './ParanextPanel.css';

/**
 * Used for possible styling on every panel in Paranext
 * @param children The children of the panel (usually supplied from an extension)
 */
const ParanextPanel = ({ children }: { children: ReactNode }) => {
  return <div className="paranext-panel">{children}</div>;
};

export default ParanextPanel;
