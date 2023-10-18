import { ReactNode } from 'react';
import './platform-panel.component.css';

/**
 * Used for possible styling on every panel in Platform
 * @param children The children of the panel (usually supplied from an extension)
 */
export default function PlatformPanel({ children }: { children: ReactNode }) {
  return <div className="platform-panel">{children}</div>;
}
