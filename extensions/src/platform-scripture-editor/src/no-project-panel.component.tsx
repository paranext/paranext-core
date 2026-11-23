import { NoProjectView, type NoProjectViewLocalizedStrings } from './no-project-view.component';
import { useProjectPresence } from './use-project-presence.hook';
import { useRegistrationValidity } from './use-registration-validity.hook';

export type NoProjectPanelProps = {
  localizedStrings?: NoProjectViewLocalizedStrings;
  isPowerMode: boolean;
  isInterfaceModeLoading: boolean;
  /** Whether the web view is shown. Pass `useViewVisibility()`. */
  isViewVisible: boolean;
};

/**
 * The editor's no-project state: {@link NoProjectView}, fed by {@link useProjectPresence} and
 * {@link useRegistrationValidity}.
 *
 * Mounted only while the editor has no project, so an editor with a project holds none of the
 * hooks' subscriptions and does not re-render for them. The hooks are on only once the interface
 * mode is known to be Simple: the guidance is written for Simple mode's first-run experience, so
 * Power mode keeps the plain message. A disabled hook answers `unknown`, which shows that message.
 *
 * Hidden case: the hooks are off while the view is hidden, so a hidden tab makes no lookups. On
 * activation the presence hook asks afresh, and the plain message shows until it answers; a
 * definitive registration answer is kept.
 *
 * Registration is asked alongside presence, and no longer once the user is known to have projects,
 * so the two checks overlap rather than run one after the other. The guidance waits for both
 * answers, so a registered user is not shown the text meant for an unregistered one first. A
 * registration that cannot be determined keeps the unregistered text.
 */
export function NoProjectPanel({
  localizedStrings,
  isPowerMode,
  isInterfaceModeLoading,
  isViewVisible,
}: NoProjectPanelProps) {
  const isAsking = !isPowerMode && !isInterfaceModeLoading && isViewVisible;
  const presence = useProjectPresence({ enabled: isAsking });
  const registrationValidity = useRegistrationValidity({
    enabled: isAsking && presence !== 'some',
  });
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
