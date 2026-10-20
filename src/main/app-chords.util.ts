import type { CommandHandlers } from 'papi-shared-types';
import { FocusSubject, getWebViewIdFromFocusSubject } from '@shared/services/window.service-model';

/** The subset of Electron.Input this mapping reads — keeps the function trivially testable */
type AppChordInput = {
  key: string;
  control: boolean;
  alt: boolean;
  meta: boolean;
  shift: boolean;
  isAutoRepeat: boolean;
};

/** An app-wide chord the main process claims in every window */
export type AppChord = 'openHome' | 'openProjectSettings';

/**
 * Maps a keyboard input to the app-wide chord it triggers, if any: Ctrl+O opens Home and Ctrl+J
 * opens Project settings, with Command instead of Control on macOS. Any other modifier disqualifies
 * the chord — AltGr reports as Ctrl+Alt on Windows and Linux — and a held key (auto-repeat) never
 * matches, so holding a chord acts once.
 *
 * Matches `input.key`, like every other chord in `main.ts`, so on a non-Latin layout these chords
 * follow the character the layout produces rather than the physical key.
 *
 * @param input The keyboard input to map
 * @param isMacOS Whether the app is running on macOS (`process.platform === 'darwin'`)
 */
export function matchAppChord(input: AppChordInput, isMacOS: boolean): AppChord | undefined {
  if (input.isAutoRepeat) return undefined;
  const primaryModifier = isMacOS ? input.meta : input.control;
  const otherModifierPressed = input.alt || input.shift || (isMacOS ? input.control : input.meta);
  if (!primaryModifier || otherModifierPressed) return undefined;

  switch (input.key) {
    // CapsLock produces the capital letter without Shift, so match both cases
    case 'o':
    case 'O':
      return 'openHome';
    case 'j':
    case 'J':
      return 'openProjectSettings';
    default:
      return undefined;
  }
}

/** The commands an app chord sends */
type AppChordCommandName =
  | 'platformGetResources.openHome'
  | 'platform.openProjectSettingsForWebView';

/** What running a chord needs, supplied by the caller so the dispatch stays free of Electron */
export type AppChordEffects = {
  /** Reports the focus of the window that received the chord */
  getFocus: () => Promise<FocusSubject | undefined>;
  /** Sends a PAPI command */
  sendCommand: <CommandName extends AppChordCommandName>(
    commandName: CommandName,
    ...args: Parameters<CommandHandlers[CommandName]>
  ) => Promise<unknown>;
};

/**
 * Runs a chord {@link matchAppChord} matched, sending the same command the matching menu item runs.
 *
 * Project settings opens for the web view whose tab has focus in the window that received the
 * chord, the same web view its Project menu's item names. With no web view in focus it does
 * nothing, since there is no Project menu the chord could stand in for.
 */
export async function runAppChord(chord: AppChord, effects: AppChordEffects): Promise<void> {
  switch (chord) {
    case 'openHome':
      await effects.sendCommand('platformGetResources.openHome');
      return;
    case 'openProjectSettings': {
      const focus = await effects.getFocus();
      const webViewId = focus ? getWebViewIdFromFocusSubject(focus) : undefined;
      if (!webViewId) return;
      await effects.sendCommand('platform.openProjectSettingsForWebView', webViewId);
      return;
    }
    default: {
      const unhandled: never = chord;
      throw new Error(`Unhandled app chord: ${String(unhandled)}`);
    }
  }
}
