import * as commandService from '@shared/services/command.service';
import { MenuItemContainingCommand } from 'platform-bible-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { handleMenuCommand } from './platform-bible-menu.commands';

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(async () => undefined),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/** A minimal menu item carrying `command`, which is the only field `handleMenuCommand` reads. */
function menuItem(command: `${string}.${string}`): MenuItemContainingCommand {
  return {
    command,
    label: '%test%',
    group: 'test.group',
    order: 1,
    localizeNotes: 'Dispatch test fixture',
  };
}

beforeEach(() => {
  vi.mocked(commandService.sendCommand).mockClear();
});

describe('Help menu links open the destinations their labels promise', () => {
  /**
   * The label and the destination are the two halves of a menu link that can drift apart, and a
   * rename is exactly when that happens: "Community support" is a relabel of the item formerly
   * called "FAQs".
   */
  test('Community support opens the Support.Bible page', () => {
    handleMenuCommand(menuItem('platform.visitFAQsPage'));

    expect(commandService.sendCommand).toHaveBeenCalledWith(
      'platform.openWindow',
      'https://support.bible/paratext-10',
    );
  });

  test('Browse help opens the Paratext 10 help articles', () => {
    handleMenuCommand(menuItem('platform.visitGettingStartedPage'));

    expect(commandService.sendCommand).toHaveBeenCalledWith(
      'platform.openWindow',
      'https://paratext.org/tutorial-article/paratext-10/',
    );
  });
});

describe('handleMenuCommand falls through to dispatching unhandled commands', () => {
  /**
   * A command with no case is sent as itself. The unpublished Feature roadmap id is used so a case
   * that opens a page for it fails this test.
   */
  test('a command with no case is dispatched unchanged rather than opened as a page', () => {
    handleMenuCommand(menuItem('platform.visitFeatureRoadmapPage'));

    expect(commandService.sendCommand).toHaveBeenCalledWith(
      'platform.visitFeatureRoadmapPage',
      undefined,
    );
    expect(commandService.sendCommand).not.toHaveBeenCalledWith(
      'platform.openWindow',
      expect.anything(),
    );
  });
});
