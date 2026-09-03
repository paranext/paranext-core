export function scrollToRef(ref: HTMLElement | null) {
  ref?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
  });
}

/** Representation of whether the user has saved changes */
export enum SaveState {
  HasNotSaved,
  IsSaving,
  IsRestarting,
  HasSaved,
}

// No trailing slash: this is the exact string ParatextData returns for the Production environment,
// so the fallback and a real backend response are the same value.
export const PRODUCTION_REGISTRY_URL = 'https://registry.paratext.org';
