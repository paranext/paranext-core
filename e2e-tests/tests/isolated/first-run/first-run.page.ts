import type { Locator, Page } from '@playwright/test';

/**
 * Page-object helpers for the first-run wizard dialog.
 *
 * All helpers scope queries inside the full-screen `role="dialog"` (the Radix `DialogContent`) so
 * they cannot accidentally match content in the aria-hidden app behind the overlay.
 *
 * Button-label notes (from `assets/localization/en.json`):
 *
 * - Primary action: "Next" on steps 1–3, "Finish" on the last step (SyncProgress)
 * - "Back" — absent on the first step (Language)
 * - "Skip setup" — present only on the Sync consent step
 */
export class FirstRunPage {
  /** Locator for the full-screen first-run dialog. */
  readonly dialog: Locator;

  constructor(private readonly page: Page) {
    this.dialog = page.getByRole('dialog');
  }

  /**
   * Wait for the wizard dialog to appear and for the localization service to have resolved English
   * button labels ("Next" visible). Times out if first-run is already complete or the app fails to
   * initialise.
   */
  async waitForWizard(timeout = 90_000): Promise<void> {
    await this.dialog.waitFor({ state: 'visible', timeout });
    // "Next" becoming visible confirms the wizard is in the interactive "wizard"
    // state (past the loading spinner) and that localisation strings have resolved.
    await this.dialog
      .getByRole('button', { name: 'Next' })
      .waitFor({ state: 'visible', timeout: 15_000 });
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
   * Label is "Next" on steps 1–3 and "Finish" on the last step.
   */
  async clickNext(): Promise<void> {
    await this.dialog.getByRole('button', { name: /^(Next|Finish)$/i }).click();
  }

  /** Click the Back button (not present on the first step). */
  async clickBack(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Back' }).click();
  }

  /** Click "Skip setup" (present only on the Sync consent step). */
  async clickSkipSetup(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Skip setup' }).click();
  }
}
