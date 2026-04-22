import { AppZoomService } from './app-zoom.service';

type InstallOptions = {
  service: AppZoomService;
};

export function installAppZoomInput({ service }: InstallOptions): () => void {
  function onKeyDown(e: KeyboardEvent): void {
    if (e.repeat) return;
    const isModifier = e.ctrlKey || e.metaKey;
    if (!isModifier || !e.shiftKey) return;

    if (e.key === '=' || e.key === '+') {
      e.preventDefault();
      e.stopPropagation();
      service.adjust(+0.1);
    } else if (e.key === '-') {
      e.preventDefault();
      e.stopPropagation();
      service.adjust(-0.1);
    } else if (e.key === '0') {
      e.preventDefault();
      e.stopPropagation();
      service.reset();
    }
  }

  // capture: true so this fires before per-view zoom handlers
  window.addEventListener('keydown', onKeyDown, { capture: true });
  return () => {
    window.removeEventListener('keydown', onKeyDown, { capture: true });
  };
}
