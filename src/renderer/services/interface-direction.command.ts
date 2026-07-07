import { registerCommand } from '@shared/services/command.service';
import { readDirection } from 'platform-bible-react/experimental';

/**
 * Register the `platform.getInterfaceDirection` command. Lives in the renderer because the UI
 * layout direction is renderer-local state (`readDirection()` reads the same source all RTL-aware
 * components use). Used by the main process to apply the RTL swap to the reference-history keyboard
 * shortcuts.
 */
export async function startInterfaceDirectionCommand(): Promise<void> {
  await registerCommand('platform.getInterfaceDirection', async () => readDirection(), {
    method: {
      summary: "Get the current UI layout direction ('ltr' or 'rtl')",
      params: [],
      result: { name: 'direction', schema: { type: 'string', enum: ['ltr', 'rtl'] } },
    },
  });
}
