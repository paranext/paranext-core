import { PlatformDockLayout } from '@renderer/components/docking/platform-dock-layout.component';
import { TestContext } from '@renderer/context/papi-context/test.context';
import { pruneStaleZoomEntries } from '@renderer/services/view-zoom.bootstrap';
import { installViewZoomInput } from '@renderer/services/view-zoom.input';
import { viewZoomService } from '@renderer/services/view-zoom.service';
import { registerCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { useEffect, useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './app.component.scss';
import { NotificationDisplay } from './components/notification-display';
import { OverlayHost } from './components/overlay-host.component';
import { PlatformBibleToolbar } from './components/platform-bible-toolbar';

function Main() {
  // Block first paint until persisted view-zoom settings have loaded so views render at their
  // saved zoom factor instead of flashing 1.0 → saved value.
  const [zoomReady, setZoomReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    viewZoomService.ready
      .then(() => {
        if (!cancelled) setZoomReady(true);
        return undefined;
      })
      .catch(() => {
        if (!cancelled) setZoomReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const resolveFocusedKey = (): string | undefined => {
      // 1) Whichever view contains the focused element. When a modal dialog is open, focus is
      //    trapped inside it (Radix manages this), so the active element naturally lives inside
      //    the dialog's ZoomContainer wrapper — no separate dialog scan needed.
      const active = document.activeElement;
      if (active instanceof Element) {
        const holder = active.closest('[data-view-type]');
        if (holder) return holder.getAttribute('data-view-type') ?? undefined;
      }
      // 2) Fallback: if focus is on the body (e.g., document.activeElement is body) but a modal
      //    dialog is open, target it. Take the LAST one in the DOM as a best-effort proxy for
      //    "topmost" — Radix mounts dialogs in open order, so the last is usually on top.
      const dialogs = document.querySelectorAll<HTMLElement>(
        '[data-overlay-modal-dialog] [data-view-type]',
      );
      if (dialogs.length > 0) {
        const last = dialogs[dialogs.length - 1];
        return last.getAttribute('data-view-type') ?? undefined;
      }
      return undefined;
    };

    const uninstall = installViewZoomInput({
      service: viewZoomService,
      resolveFocusedKey,
    });

    // Deprecated `platform.zoomIn` / `platform.zoomOut` commands. Kept as shims that adjust the
    // currently focused view's zoom by one step, so existing callers don't break. Logs a one-time
    // deprecation warning per command. Prefer Ctrl/Cmd+= / Ctrl/Cmd+- shortcuts (or Ctrl+wheel)
    // which can target any view; these commands have no way to specify a target.
    let deprecationWarned = false;
    function warnDeprecatedZoomCommand(name: string) {
      if (deprecationWarned) return;
      deprecationWarned = true;
      logger.warn(
        `${name} is deprecated. Use Ctrl/Cmd+= or Ctrl/Cmd+- (or Ctrl+scroll) on the focused view instead. The command remains as a shim that adjusts the focused view's zoom.`,
      );
    }
    let zoomCommandsCancelled = false;
    const zoomCommandUnsubs: Array<() => Promise<unknown>> = [];
    (async () => {
      try {
        const unsubIn = await registerCommand('platform.zoomIn', async () => {
          warnDeprecatedZoomCommand('platform.zoomIn');
          const key = resolveFocusedKey();
          if (key) viewZoomService.adjustZoom(key, +1);
        });
        if (zoomCommandsCancelled) {
          unsubIn().catch(() => undefined);
          return;
        }
        zoomCommandUnsubs.push(unsubIn);
        const unsubOut = await registerCommand('platform.zoomOut', async () => {
          warnDeprecatedZoomCommand('platform.zoomOut');
          const key = resolveFocusedKey();
          if (key) viewZoomService.adjustZoom(key, -1);
        });
        if (zoomCommandsCancelled) {
          unsubOut().catch(() => undefined);
          return;
        }
        zoomCommandUnsubs.push(unsubOut);
      } catch {
        // Non-fatal; the commands just won't be available.
      }
    })();

    // Prune per-instance zoom entries whose tab ids no longer exist in the persisted dock layout.
    // Non-fatal; don't disrupt startup.
    (async () => {
      try {
        await pruneStaleZoomEntries();
      } catch {
        // swallowed
      }
    })();

    // Flush any debounced zoom changes before the window unloads so a quick zoom-then-quit
    // doesn't lose the user's last adjustment. Note: flush() is async and beforeunload is
    // synchronous, so the settings write is fire-and-forget; Electron usually allows enough
    // time for the IPC to complete before teardown.
    const onBeforeUnload = () => {
      viewZoomService.flush();
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      zoomCommandsCancelled = true;
      window.removeEventListener('beforeunload', onBeforeUnload);
      uninstall();
      zoomCommandUnsubs.forEach((unsub) => {
        unsub().catch(() => undefined);
      });
    };
  }, []);

  if (!zoomReady) return undefined;

  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar />
      <PlatformDockLayout />
      <NotificationDisplay />
      <OverlayHost />
    </TestContext.Provider>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
