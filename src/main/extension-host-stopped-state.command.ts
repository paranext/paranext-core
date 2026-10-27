import { extensionHostService } from '@main/services/extension-host.service';
import { registerCommand } from '@shared/services/command.service';
import { EXTENSION_HOST_STOPPED_EVENT_SCHEMA } from '@shared/models/extension-host-lifecycle.model';

/**
 * Register `platform.getExtensionHostStoppedState`, the catch-up for a window that was not
 * listening when `platform.onDidStopExtensionHost` fired: one opened after the stop, or one whose
 * renderer had not subscribed yet. Call once during main-process startup, after the network service
 * is initialized.
 */
export async function registerExtensionHostStoppedStateCommand(): Promise<void> {
  await registerCommand(
    'platform.getExtensionHostStoppedState',
    async () => extensionHostService.getLastUnexpectedStop(),
    {
      method: {
        'x-experimental': true,
        summary:
          'Whether the extension host is currently stopped without main having asked it to, and ' +
          'why. Null while it is running or has been restarted since.',
        params: [],
        result: {
          name: 'return value',
          summary: 'The stop, or null',
          schema: {
            anyOf: [
              EXTENSION_HOST_STOPPED_EVENT_SCHEMA,
              // JSON-RPC carries a missing result as null.
              { type: 'null' },
            ],
          },
        },
      },
    },
  );
}
