import { ReactNode } from 'react';
import './paranext-panel.component.css';

/**
 * Used for possible styling on every panel in Paranext
 * @param children The children of the panel (usually supplied from an extension)
 */
export default function ParanextPanel({ children }: { children: ReactNode }) {
  return <div className="paranext-panel">{children}</div>;
}
