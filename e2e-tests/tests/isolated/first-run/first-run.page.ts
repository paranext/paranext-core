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
 * - "Back" — absent on the first step (Language) and on the SyncProgress interstitial
 * - "Sync" — the Sync consent step's own primary action (Next is hidden on that step)
 * - "Skip automatic sync" — present only on the Sync consent step (shell footer)
 * - "Save and restart" — the Identify step's own primary action (Next is hidden on that step)
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
   * Label is "Next" on steps 1–2 (Language, Internet Settings) and "Finish" on the last step
   * (SyncProgress). Steps 3–4 (Identify, Sync consent) hide Next and own their own primary actions
   * — use {@link clickSaveAndRestart} and {@link clickSync} respectively.
   */
  async clickNext(): Promise<void> {
    await this.dialog.getByRole('button', { name: /^(Next|Finish)$/i }).click();
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
    await this.dialog.getByRole('button', { name: /^sync$/i }).click();
  }

  /** Click "Skip automatic sync" (present only on the Sync consent step shell footer). */
  async clickSkipAutomaticSync(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Skip automatic sync' }).click();
  }

  /**
   * Click the "Save and restart" button on the Identify step. In demo mode this calls onNext()
   * directly without restarting; in production it saves registration data and restarts the app.
   */
  async clickSaveAndRestart(): Promise<void> {
    await this.dialog.getByRole('button', { name: /save and restart/i }).click();
  }
}
