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

function menuItem(command: string): MenuItemContainingCommand {
  // The menu document's branded key types aren't worth reconstructing for a dispatch test; the
  // handler only reads `command`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { command, label: '%test%', group: 'test.group', order: 1 } as MenuItemContainingCommand;
}

describe('Help menu links open the destinations their labels promise', () => {
  beforeEach(() => {
    vi.mocked(commandService.sendCommand).mockClear();
  });

  /**
   * The label and the destination are the two halves of a menu link that can drift apart, and a
   * rename is exactly when that happens: "Community support" is a relabel of the item formerly
   * called "FAQs", and its Support.Bible target is deliberately unchanged.
   */
  test('Community support opens the Support.Bible page', () => {
    handleMenuCommand(menuItem('platform.visitFAQsPage'));

    expect(commandService.sendCommand).toHaveBeenCalledWith(
      'platform.openWindow',
      'https://support.bible/paratext-10-studio',
    );
  });

  test.each([
    ['platform.visitGettingStartedPage', 'https://studio.paratext.org/start '],
    ['platform.visitFeatureRoadmapPage', 'https://studio.paratext.org/roadmap'],
  ])('%s still opens %s', (command, url) => {
    handleMenuCommand(menuItem(command));

    expect(commandService.sendCommand).toHaveBeenCalledWith('platform.openWindow', url);
  });
});
