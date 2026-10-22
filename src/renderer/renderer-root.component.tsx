import { App } from '@renderer/app.component';
import { RendererErrorBoundary } from '@renderer/components/renderer-error-boundary.component';

/**
 * Everything the renderer's one `root.render` call mounts: the app, inside the boundary that turns
 * a render failure anywhere in it into the crash screen rather than a blank window.
 *
 * Nothing sits above the boundary, so there is nothing whose own failure it could miss.
 */
export function RendererRoot() {
  return (
    <RendererErrorBoundary>
      <App />
    </RendererErrorBoundary>
  );
}

export default RendererRoot;
