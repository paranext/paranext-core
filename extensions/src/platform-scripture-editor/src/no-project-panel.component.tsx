import { NoProjectView, type NoProjectViewLocalizedStrings } from './no-project-view.component';
import { useProjectPresence } from './use-project-presence.hook';
import { useRegistrationValidity } from './use-registration-validity.hook';

export type NoProjectPanelProps = {
  localizedStrings?: NoProjectViewLocalizedStrings;
  isPowerMode: boolean;
  isInterfaceModeLoading: boolean;
};

/**
 * The editor's no-project state: {@link NoProjectView}, fed by {@link useProjectPresence} and
 * {@link useRegistrationValidity}.
 *
 * Mounted only while the editor has no project, so an editor with a project holds none of the
 * hooks' subscriptions and does not re-render for them. The presence hook is on only once the
 * interface mode is known to be Simple: the guidance is written for Simple mode's first-run
 * experience, so Power mode keeps the plain message. A disabled hook answers `unknown`, which shows
 * that message.
 *
 * Registration is asked only once the user is known to have no projects, since only then is it
 * shown. The guidance waits for that answer, so a registered user is not shown the text meant for
 * an unregistered one first. A registration that cannot be determined keeps the unregistered text.
 */
export function NoProjectPanel({
  localizedStrings,
  isPowerMode,
  isInterfaceModeLoading,
}: NoProjectPanelProps) {
  const presence = useProjectPresence({ enabled: !isPowerMode && !isInterfaceModeLoading });
  const registrationValidity = useRegistrationValidity({ enabled: presence === 'none' });
  const shownPresence =
    presence === 'none' && registrationValidity === undefined ? 'unknown' : presence;

  return (
    <NoProjectView
      localizedStrings={localizedStrings}
      presence={shownPresence}
      isRegistered={registrationValidity === 'valid'}
    />
  );
}

export default NoProjectPanel;
