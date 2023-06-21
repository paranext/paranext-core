/**
 * Unified module for accessing API features in the renderer.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import papiShared from '@shared/services/papi.service';
import papiContext from '@renderer/context/papi-context';
import papiHooks from '@renderer/hooks/papi-hooks';

const papi = {
  ...papiShared,
  react: {
    context: papiContext,
    hooks: papiHooks,
  },
};
export default papi;

export type Papi = typeof papi;
