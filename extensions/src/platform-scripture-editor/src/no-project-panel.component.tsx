import { NoProjectView, type NoProjectViewLocalizedStrings } from './no-project-view.component';
import { useProjectPresence } from './use-project-presence.hook';

export type NoProjectPanelProps = {
  localizedStrings?: NoProjectViewLocalizedStrings;
  isPowerMode: boolean;
  isInterfaceModeLoading: boolean;
};

/**
 * The editor's no-project state: {@link NoProjectView}, fed by {@link useProjectPresence}.
 *
 * Mounted only while the editor has no project, so an editor with a project holds none of the
 * hook's subscriptions and does not re-render for them. The hook is on only once the interface mode
 * is known to be Simple: the guidance is written for Simple mode's first-run experience, so Power
 * mode keeps the plain message. A disabled hook answers `unknown`, which shows that message.
 */
export function NoProjectPanel({
  localizedStrings,
  isPowerMode,
  isInterfaceModeLoading,
}: NoProjectPanelProps) {
  const presence = useProjectPresence({ enabled: !isPowerMode && !isInterfaceModeLoading });

  return <NoProjectView localizedStrings={localizedStrings} presence={presence} />;
}

export default NoProjectPanel;
