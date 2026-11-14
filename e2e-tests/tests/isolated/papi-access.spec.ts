/**
 * What a client that connects to the PAPI WebSocket without a launch secret may do — a browser
 * page, an external tool, or this test runner. Main serves it as `unidentified`: it keeps every
 * request type except the short restricted list in `src/shared/data/request-access.data.ts`.
 *
 * Each refusal is checked against a request type its real handler has already registered, so the
 * error comes from the access check and not from a missing handler.
 */
import { test, expect } from '../../fixtures/isolated.fixture';
import {
  sendPapiRequestOnce,
  waitForAppReady,
  waitForPapiMethodRegistered,
} from '../../fixtures/helpers';

const REFUSED_MESSAGE = 'is not available on this connection';

const RESTRICTED_REQUESTS: { method: string; params: unknown[] }[] = [
  { method: 'requestRegistryTokens:getAccessToken', params: ['e2e', 'https://example.org', []] },
  { method: 'command:platform.getLogFileContent', params: [] },
  { method: 'command:paratextRegistration.resetForFirstRun', params: ['keep'] },
  {
    method: 'object:paratextRegistration.internetSettingsDataProvider-data.setInternetSettings',
    params: [undefined, {}],
  },
];

test.describe('An unidentified PAPI client', () => {
  test('an unidentified socket is refused the restricted request types', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    await Promise.all(RESTRICTED_REQUESTS.map(({ method }) => waitForPapiMethodRegistered(method)));

    await Promise.all(
      RESTRICTED_REQUESTS.map(({ method, params }) =>
        expect(sendPapiRequestOnce(method, params)).rejects.toThrow(REFUSED_MESSAGE),
      ),
    );
  });

  test('an unidentified socket cannot register a restricted request type', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Positive control: an open request type registers, so the refusal below is the rule's doing
    await expect(
      sendPapiRequestOnce('network:registerMethod', ['command:e2e.papiAccessProbe']),
    ).resolves.toBe(true);
    await expect(
      sendPapiRequestOnce('network:registerMethod', ['requestRegistryTokens:e2eProbe']),
    ).resolves.toBe(false);
  });

  test('an unidentified socket can still list methods and run an open command', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    const discovered = await sendPapiRequestOnce<{ methods: { name: string }[] }>('rpc.discover');
    expect(discovered.methods.map((method) => method.name)).toContain(
      'command:platform.getLogFileContent',
    );
    await waitForPapiMethodRegistered('command:platform.getOSPlatform');
    await expect(sendPapiRequestOnce('command:platform.getOSPlatform')).resolves.toEqual(
      expect.any(String),
    );
  });
});
