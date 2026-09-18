import { useEffect } from 'react';
import { trackInteractionModality } from '@/utils/focus.util';

/**
 * Starts the document-wide tracking that `getLastInteractionModality` reads, for a component whose
 * behavior depends on whether the user last used the pointer or the keyboard.
 *
 * The underlying registration is idempotent, so calling this from several components costs one pair
 * of document listeners in total. It exists so that no consumer has to decide where to put the
 * call: registering from an effect keeps render pure, and the listeners are in place long before
 * any interaction can reach the component that mounted them.
 */
export function useInteractionModality() {
  useEffect(() => {
    trackInteractionModality();
  }, []);
}

export default useInteractionModality;
