// Declares WizardStepper on 'platform-bible-react' for the root tsconfig consumers (renderer,
// main, etc.). This shim is needed because the root tsconfig resolves 'platform-bible-react' to
// the shared dist under lib/platform-bible-react/dist — and on this branch (pt-3257-stepper) the
// dist has not been rebuilt to include WizardStepper yet. The component ships in Task 1; this shim
// bridges the TypeScript resolution gap until the dist is built from the updated source.
//
// Remove this file once lib/platform-bible-react/dist/index.d.ts exports WizardStepper.
import type { ComponentType } from 'react';

declare module 'platform-bible-react' {
  export interface WizardStepperProps {
    /** 1-based index of the currently active step. */
    currentStep: number;
    /** Total number of numbered steps. */
    totalSteps: number;
    /**
     * BCP 47 locale tag for numeral formatting in the circle labels. E.g. `'ar'` → ١٢٣٤. Defaults
     * to `'en'`.
     */
    locale?: string;
  }

  export const WizardStepper: ComponentType<WizardStepperProps>;
}
