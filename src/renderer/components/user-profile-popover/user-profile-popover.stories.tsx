import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within } from 'storybook/test';
import { resetRegistrationValidityStore } from '@renderer/services/registration-validity-store';
// Deep relative (not aliased) so tsc follows only the dependency-free channel, never the
// webpack-only mock it drives. Same reasoning as the first-run language mock.
import {
  resetCommandServiceMock,
  setCommandServiceMock,
} from '../../../../.storybook/mocks/command-service-mock-channel';
import { UserProfilePopover } from './user-profile-popover.component';

const REGISTERED_PROFILE = {
  name: 'Alice Translator',
  code: '******-******-******-******-******',
  email: 'alice@example.com',
  supporterName: '',
};
const UNREGISTERED_PROFILE = { name: '', code: '', email: '', supporterName: '' };

/**
 * Answers the two registration commands the popover sends, so the dot comes from the real hook →
 * store → resolver path rather than injected component state.
 *
 * Keyed by command name rather than call order: opening the popover fires the validity re-check and
 * the profile fetch together, and their order is not guaranteed. The store caches one probe per
 * session and is module-global, so it is reset on both sides — otherwise a story would inherit the
 * previous story's cached answer.
 */
function withRegistration(
  isValid: boolean,
  profile: typeof REGISTERED_PROFILE = isValid ? REGISTERED_PROFILE : UNREGISTERED_PROFILE,
) {
  return () => {
    resetRegistrationValidityStore();
    setCommandServiceMock((commandName) =>
      commandName === 'paratextRegistration.doesUserHaveValidRegistration' ? isValid : profile,
    );
    return () => {
      resetCommandServiceMock();
      resetRegistrationValidityStore();
    };
  };
}

/**
 * Places the trigger against a toolbar-like strip, right-aligned, so the dot can be judged at the
 * size and contrast it actually ships at rather than floating on a blank canvas.
 *
 * The strip is `bg-muted`, not `bg-background`: the real toolbar is transparent over `#root`, which
 * `app.component.scss` paints with a muted tint, and the ghost trigger itself turns `muted` on
 * hover and while the popover is open. Using `background` here would flatter the dot's contrast.
 */
function WithSimulatedToolbar(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
  return (
    <div className="pr-twp">
      <div className="tw:flex tw:h-14 tw:items-center tw:justify-end tw:gap-2 tw:border-b tw:border-border tw:bg-muted tw:px-3">
        <Story />
      </div>
    </div>
  );
}

/**
 * Deliberately NOT tagged `autodocs`. These stories are driven by two module-level singletons — the
 * registration-validity store (module-global by production design, so it cannot be scoped per
 * story) and the command-service mock channel. An autodocs page renders every story at once against
 * those same globals, so each story's `beforeEach` resets the store and notifies EVERY mounted
 * popover: the last story to run flattens them all to `'unknown'` and no dot appears anywhere. View
 * these one at a time from the sidebar. (`first-run-language-mock-channel.ts` documents the same
 * hazard.)
 */
const meta: Meta<typeof UserProfilePopover> = {
  title: 'Advanced/UserProfilePopover',
  component: UserProfilePopover,
  decorators: [WithSimulatedToolbar],
};

export default meta;
type Story = StoryObj<typeof UserProfilePopover>;

/** A validly registered user: no dot, and the trigger keeps its plain "User profile" label. */
export const Registered: Story = {
  beforeEach: withRegistration(true),
};

/**
 * Registration missing or invalid — the state this feature exists for. The dot sits on the trigger,
 * and the trigger's accessible label and tooltip become "User profile — registration needed" so the
 * signal is never carried by color alone.
 */
export const RegistrationNeeded: Story = {
  beforeEach: withRegistration(false),
};

/**
 * The same invalid registration with the popover opened, so the rest of the reminder is visible:
 * the header's "Registration needed" line beneath the name and email, and a matching dot on the
 * "Profile & registration" row (which also carries screen-reader-only text in its accessible
 * name).
 */
export const RegistrationNeededPopoverOpen: Story = {
  beforeEach: withRegistration(false),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('user-profile-popover-trigger'));
    // Assert rather than just pose: this makes the story fail loudly if the row marker or its
    // accessible text ever stops rendering. The popover portals outside canvasElement.
    const popover = within(document.body);
    await expect(
      await popover.findByTestId('user-profile-action-registration-dot'),
    ).toBeInTheDocument();
    await expect(popover.getByTestId('user-profile-registration-warning')).toBeInTheDocument();
  },
};

/**
 * The case the header reconciliation exists for: a stored name and email whose registration code
 * has expired or been revoked. Without the warning line the header would read as a perfectly
 * healthy profile while the dots said otherwise — so it keeps the identity AND states the problem.
 */
export const RegistrationNeededWithProfile: Story = {
  beforeEach: withRegistration(false, REGISTERED_PROFILE),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('user-profile-popover-trigger'));
    const popover = within(document.body);
    // The identity survives...
    await expect(await popover.findByText('alice@example.com')).toBeInTheDocument();
    // ...and the header still says something is wrong.
    await expect(popover.getByTestId('user-profile-registration-warning')).toBeInTheDocument();
  },
};

/**
 * The probe could not complete — the provider isn't up, or the command errored. Deliberately
 * identical to the registered state: an unverifiable registration is never nagged about, because
 * `'unknown'` never means the registration is bad. The command rejects here, which is what the
 * resolver turns into `'unknown'` after it exhausts its retries.
 */
export const ValidityUnknown: Story = {
  beforeEach: () => {
    resetRegistrationValidityStore();
    setCommandServiceMock(() => {
      throw new Error('Registration provider is not available');
    });
    return () => {
      resetCommandServiceMock();
      resetRegistrationValidityStore();
    };
  },
};
