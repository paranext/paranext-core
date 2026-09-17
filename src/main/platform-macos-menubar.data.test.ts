import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CONTENT_ZOOM_CHORDS, CONTENT_ZOOM_COMMANDS } from '@shared/models/content-zoom.model';
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

/** A submenu item's `order`, or -1 when the item (or its order) is missing. */
function orderOf(id: string): number {
  const order = getItem(id)?.order;
  return typeof order === 'number' ? order : -1;
}

describe('macosMenubarObject View menu', () => {
  // Without this, `sendCommand`'s call history accumulates across tests in this file, so a later
  // `toHaveBeenCalledWith` assertion can pass on a call an EARLIER test made rather than the one
  // this test's own click just produced — silently hiding a wrong-command wiring bug on a later item.
  beforeEach(() => vi.clearAllMocks());

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

  it('binds ⌘= to zoom in, and ⇧⌘= to the same action through a hidden duplicate', () => {
    expect(getItem('contentZoomIn')?.accelerator).toBe('CommandOrControl+=');
    const hidden = getItem('contentZoomInShift');
    expect(hidden?.accelerator).toBe('CommandOrControl+Shift+=');
    expect(hidden?.visible).toBe(false);
  });

  it('gives every chord in the shared table its declared View-menu items', () => {
    CONTENT_ZOOM_CHORDS.forEach((chord) => {
      chord.macosMenuItems.forEach((declared) => {
        const item = getItem(declared.id);
        expect(item, `missing View-menu item ${declared.id}`).toBeDefined();
        expect(item?.accelerator).toBe(declared.accelerator);
        expect(item?.label).toBe(chord.macosLabel);
      });
    });
  });

  it('keeps the View-menu zoom items in order between the dev-tools and full-screen separators', () => {
    const zoomOrders = CONTENT_ZOOM_CHORDS.flatMap((chord) =>
      chord.macosMenuItems.map((item) => orderOf(item.id)),
    );
    expect(Math.min(...zoomOrders)).toBeGreaterThan(orderOf('viewSeparatorAfterDevTools'));
    expect(Math.max(...zoomOrders)).toBeLessThan(orderOf('viewSeparatorBeforeFullScreen'));
    expect([...zoomOrders].sort((a, b) => a - b)).toEqual(zoomOrders);
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
