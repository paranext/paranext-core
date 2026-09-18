import { describe, expect, it } from 'vitest';
import { getInternetBlockedNotification } from './internet-block-notification.utils';

// ParatextData's own texts, as they arrive after crossing a process boundary.
const ALL_ACCESS_DISABLED_ERROR =
  'JSON-RPC Request error (-32000): Bug in Paratext caused attempted access to Internet. Request has been blocked.';
const SENSITIVE_LOCATION_ERROR =
  "JSON-RPC Request error (-32000): Exception of type 'Paratext.Data.VpnDisconnectedException' was thrown.";

describe('getInternetBlockedNotification', () => {
  it('reports a "Disable all Internet access" block with a link to the internet settings', () => {
    expect(
      getInternetBlockedNotification(new Error(ALL_ACCESS_DISABLED_ERROR), 'notification-1'),
    ).toEqual({
      severity: 'error',
      message: '%data_loading_error_internetAccess_disabled_2%',
      clickCommandLabel: '%general_open%',
      clickCommand: 'paratextRegistration.showInternetSettings',
      notificationId: 'notification-1',
    });
  });

  // The "disabled" message tells the user they turned internet off, which is false for someone on
  // the sensitive-locations setting.
  it('reports a sensitive-location block with its own message', () => {
    expect(getInternetBlockedNotification(SENSITIVE_LOCATION_ERROR, 'notification-2')).toEqual({
      severity: 'error',
      message: '%data_loading_error_internetAccess_sensitiveLocation%',
      clickCommandLabel: '%general_open%',
      clickCommand: 'paratextRegistration.showInternetSettings',
      notificationId: 'notification-2',
    });
  });

  it('ignores failures that are not internet blocks', () => {
    expect(
      getInternetBlockedNotification(
        new Error('JSON-RPC Request error (-32000): This resource is no longer available'),
        'notification-3',
      ),
    ).toBeUndefined();
    expect(
      getInternetBlockedNotification(
        'User registration is not valid. Cannot retrieve resources from DBL.',
        'notification-3',
      ),
    ).toBeUndefined();
  });
});
