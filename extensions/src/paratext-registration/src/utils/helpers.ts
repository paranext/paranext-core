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
