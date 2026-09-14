import { describe, expect, it, vi } from 'vitest';
import { CONTENT_ZOOM_COMMANDS } from '@shared/models/content-zoom.model';
import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { macosMenubarObject } from './platform-macos-menubar.data';

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn() },
}));

/**
 * `MenuItemConstructorOptionsWithOrder.submenu` is typed as an intersection of an object type with
 * an array type rather than an array of the intersection, so TypeScript resolves `.find`/`.map` on
 * a submenu array down to a near-empty element type. Reading a submenu item's `id`, `role`,
 * `accelerator`, `click` etc. therefore goes through `unknown` and a local type guard instead of
 * trusting the (pre-existing) declared type.
 */
function isRecord(candidate: unknown): candidate is Record<string, unknown> {
  return !!candidate && typeof candidate === 'object' && !Array.isArray(candidate);
}

function isZeroArgClickHandler(candidate: unknown): candidate is () => void {
  return typeof candidate === 'function';
}

const viewMenu = macosMenubarObject.find((menu) => menu.id === 'macosMenubar.viewMenu');
const rawSubmenu: unknown = viewMenu?.submenu;
if (!Array.isArray(rawSubmenu))
  throw new Error('macosMenubarObject has no View menu with a submenu array');
const submenu = rawSubmenu.filter(isRecord);

function getItem(id: string): Record<string, unknown> | undefined {
  return submenu.find((item) => item.id === id);
}

describe('macosMenubarObject View menu', () => {
  it('labels the explicit zoom items', () => {
    const labels = submenu.map((item) => item.label);
    expect(labels).toContain('%mainMenu_view_zoomIn%');
    expect(labels).toContain('%mainMenu_view_zoomOut%');
    expect(labels).toContain('%mainMenu_view_resetZoom%');
  });

  it('does not rely on the native zoom roles', () => {
    const roles = submenu.map((item) => item.role);
    expect(roles).not.toContain('zoomIn');
    expect(roles).not.toContain('zoomOut');
    expect(roles).not.toContain('resetZoom');
  });

  it('keeps the reload, dev-tools and full-screen roles', () => {
    const roles = submenu.map((item) => item.role);
    expect(roles).toContain('reload');
    expect(roles).toContain('toggleDevTools');
    expect(roles).toContain('togglefullscreen');
  });

  it('binds the zoom-in item to CommandOrControl+= with a click handler', () => {
    const zoomIn = getItem('contentZoomIn');
    expect(zoomIn?.accelerator).toBe('CommandOrControl+=');
    expect(typeof zoomIn?.click).toBe('function');
  });

  it.each([
    ['contentZoomIn', CONTENT_ZOOM_COMMANDS.in],
    ['contentZoomOut', CONTENT_ZOOM_COMMANDS.out],
    ['contentZoomReset', CONTENT_ZOOM_COMMANDS.reset],
  ])('clicking %s sends %s with no extra arguments', (id, command) => {
    const item = getItem(id);
    if (!isZeroArgClickHandler(item?.click)) throw new Error(`${id} has no click handler`);

    item.click();

    expect(commandService.sendCommand).toHaveBeenCalledWith(command);
  });

  it.each([
    ['contentZoomInNumpad', 'CommandOrControl+numadd', CONTENT_ZOOM_COMMANDS.in],
    ['contentZoomOutNumpad', 'CommandOrControl+numsub', CONTENT_ZOOM_COMMANDS.out],
    ['contentZoomResetNumpad', 'CommandOrControl+num0', CONTENT_ZOOM_COMMANDS.reset],
  ])(
    '%s is a hidden duplicate with accelerator %s invoking the same command',
    (id, accelerator, command) => {
      const item = getItem(id);
      expect(item?.visible).toBe(false);
      expect(item?.accelerator).toBe(accelerator);
      if (!isZeroArgClickHandler(item?.click)) throw new Error(`${id} has no click handler`);

      item.click();

      expect(commandService.sendCommand).toHaveBeenCalledWith(command);
    },
  );

  it('catches a rejected sendCommand and logs it instead of throwing', async () => {
    vi.mocked(commandService.sendCommand).mockRejectedValueOnce(new Error('network unavailable'));
    const zoomIn = getItem('contentZoomIn');
    if (!isZeroArgClickHandler(zoomIn?.click))
      throw new Error('contentZoomIn has no click handler');

    zoomIn.click();

    await vi.waitFor(() => expect(logger.warn).toHaveBeenCalled());
  });
});
