import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page-object helpers for the first-run wizard dialog.
 *
 * All helpers scope queries inside `[data-testid="first-run-dialog"]` — the wizard's own Radix
 * `DialogContent` — rather than a bare `role="dialog"` locator: the onboarding tour opens its own
 * dialog the instant the wizard unmounts, and a role-based locator would match that dialog too,
 * hanging {@link FirstRunPage.waitForDismissed} forever instead of observing the wizard close.
 *
 * Button-label notes (from `assets/localization/en.json`):
 *
 * - Primary action: "Next" on steps 1–3, "Finish" on the last step (SyncProgress)
 * - "Back" — absent on the first step (Language) and on the SyncProgress interstitial
 * - "Sync" — the Sync consent step's own primary action (Next is hidden on that step)
 * - "Don't sync yet" — present only on the Sync consent step (the step's own footer)
 * - "Save and restart" — the Identify step's own primary action (Next is hidden on that step)
 */
export class FirstRunPage {
  /** Locator for the first-run wizard's own dialog content. */
  readonly dialog: Locator;

  constructor(page: Page) {
    this.dialog = page.getByTestId('first-run-dialog');
  }

  /** "Don't sync yet" — present only in the Sync consent step's own footer. */
  get dontSyncYetButton(): Locator {
    return this.dialog.getByRole('button', { name: "Don't sync yet" });
  }

  /** "Sync" — the Sync consent step's own primary action. */
  get syncButton(): Locator {
    return this.dialog.getByRole('button', { name: /^sync$/i });
  }

  /** "Use Platform.Bible with internet access" on the Internet Settings step. */
  get continueWithInternetButton(): Locator {
    // %firstRun_step_internetSettings_useWithInternet%
    return this.dialog.getByRole('button', {
      name: 'Use Platform.Bible with internet access',
    });
  }

  /** "Close Platform.Bible" on the Internet Settings step. */
  get closeAppButton(): Locator {
    // %firstRun_step_internetSettings_closeApp%
    return this.dialog.getByRole('button', { name: 'Close Platform.Bible' });
  }

  /**
   * Wait for the wizard dialog to appear and for the localization service to have resolved English
   * button labels ("Next" visible). Times out if first-run is already complete or the app fails to
   * initialise.
   */
  async waitForWizard(timeout = 90_000): Promise<void> {
    await this.dialog.waitFor({ state: 'visible', timeout });
    // "Next" becoming visible confirms the wizard is in the interactive "wizard"
    // state (past the loading spinner) and that localisation strings have resolved. The dialog
    // itself shows while the registration probes are still running, and those probes legitimately
    // take tens of seconds on a cold start (up to 3 attempts x ~10-15 s plus backoffs — see
    // resolveRegistrationValidity), so this second wait needs to cover the full probe budget, not
    // just a UI render.
    await this.dialog
      .getByRole('button', { name: 'Next' })
      .waitFor({ state: 'visible', timeout: 75_000 });
  }

  /** Wait for the wizard to close after completion or skip. */
  async waitForDismissed(timeout = 15_000): Promise<void> {
    await this.dialog.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Click the primary action button. Playwright auto-waits for the button to be enabled, which
   * handles the brief disabled window that goToStep creates before each step's mount effect calls
   * setCanProceed(true).
   *
   * Label is "Next" on step 1 (Language) and "Finish" on the last step (SyncProgress). Steps 2–4
   * (Internet Settings, Identify, Sync consent) hide Next and own their own primary actions — use
   * {@link chooseUnrestrictedInternetAccess}, {@link clickSaveAndRestart} and {@link clickSync}
   * respectively.
   */
  async clickNext(): Promise<void> {
    // Long click timeout: a step can keep Next DISABLED until its async reads land, and on a loaded
    // machine that can exceed Playwright's 30 s default. click() auto-waits for enabled, so the
    // timeout IS the wait for the step to become ready.
    await this.dialog.getByRole('button', { name: /^(Next|Finish)$/i }).click({ timeout: 60_000 });
  }

  /**
   * Choose "Use Platform.Bible with internet access" on the Internet Settings step, which saves it
   * and moves on to Identify. Long timeout for the same reason as clickNext: the choices render
   * only once the async settings read and the Paratext 9 lookup land.
   */
  async chooseUnrestrictedInternetAccess(): Promise<void> {
    await this.continueWithInternetButton.click({ timeout: 60_000 });
    await expect(this.continueWithInternetButton).toBeHidden({ timeout: 15_000 });
  }

  /** Click the Back button (not present on the first step or on the SyncProgress interstitial). */
  async clickBack(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Back' }).click();
  }

  /**
   * Click the "Sync" button on the Sync consent step. In demo mode this resolves immediately and
   * advances to Sync progress; in production it triggers a real S/R sync first.
   */
  async clickSync(): Promise<void> {
    await this.syncButton.click({ timeout: 60_000 });
  }

  /** Click "Don't sync yet" (present only in the Sync consent step's own footer). */
  async clickDontSyncYet(): Promise<void> {
    await this.dontSyncYetButton.click();
  }

  /**
   * Click the "Save and restart" button on the Identify step. In demo mode this calls onNext()
   * directly without restarting; in production it saves registration data and restarts the app.
   *
   * Even in demo mode the button is DISABLED until the Registration name field is non-empty
   * (`isSaveDisabled` in identify-step.component.tsx requires a trimmed name; only the code
   * validation is bypassed), so this fills a placeholder name first.
   *
   * A project switch in the app behind the wizard, such as the one startup makes, raises the
   * "Updating project view" cover, a modal of its own that takes focus from the wizard while it is
   * up, and a fill types into whatever has focus. So this waits for the cover to go, then retries
   * the fill until the name sticks. TODO(PT-4923): drop the wait once the cover no longer takes
   * focus from the first-run wizard.
   */
  async clickSaveAndRestart(): Promise<void> {
    const nameInput = this.dialog.getByLabel('Registration name');
    await expect(this.dialog.page().getByTestId('workspace-updating-cover')).toHaveCount(0, {
      timeout: 60_000,
    });
    await expect(async () => {
      await nameInput.fill('E2E Demo User');
      await expect(nameInput).toHaveValue('E2E Demo User', { timeout: 1_000 });
    }).toPass({ timeout: 15_000 });
    await this.dialog.getByRole('button', { name: /save and restart/i }).click();
  }
}
