/**
 * Whether the user has picked an internet-use option in the first-run wizard, and had it saved,
 * since the app started.
 *
 * The wizard's Internet & connectivity step asks for an explicit choice rather than accepting the
 * stored value, because nobody may have chosen it: ParatextData saves "Disable access to some Bible
 * translation services" on first startup when no setting exists, and an upgrade from Paratext 9
 * carries over whatever that app had, often its own unchosen default. That option turns off sync
 * and the Digital Bible Library, so accepting it silently would turn them off for a user who never
 * asked for that.
 *
 * Kept outside the step so the choice survives the wizard shell unmounting the step on Back and
 * Next. It lasts for the renderer's lifetime: the identify step's restart clears it, but the wizard
 * resumes after that restart past the internet step, so the user is asked again only if startup
 * sends the whole wizard back to its first step.
 */
let hasSavedChoice = false;

/** Whether an internet-use choice has been saved this session. See the module comment. */
export function hasSavedInternetUseChoice(): boolean {
  return hasSavedChoice;
}

/** Records that the user's internet-use choice was saved. */
export function markInternetUseChoiceSaved(): void {
  hasSavedChoice = true;
}

/**
 * Forgets the recorded choice.
 *
 * WARNING: Test-only (tests and stories). @internal
 */
export function resetInternetUseChoiceForTesting(): void {
  hasSavedChoice = false;
}
