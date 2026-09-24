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

  test('Getting started opens the Getting Started page', () => {
    handleMenuCommand(menuItem('platform.visitGettingStartedPage'));

    expect(commandService.sendCommand).toHaveBeenCalledWith(
      'platform.openWindow',
      'https://studio.paratext.org/start',
    );
  });

  /**
   * Feature roadmap has no menu item and no case of its own, so a stray item carrying its id must
   * not reach the unpublished roadmap page.
   */
  test('the retired Feature roadmap command does not open a web page', () => {
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
