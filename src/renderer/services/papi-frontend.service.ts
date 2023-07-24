/**
 * Unified module for accessing API features in the renderer.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import papiShared from '@shared/services/papi.service';
import papiContext, { PapiContext } from '@renderer/context/papi-context';
import papiHooks, { PapiHooks } from '@renderer/hooks/papi-hooks';

// Note: we need to provide type assertions for all members so they carry the JSDoc comments on the
// papi.d.ts file so extension developers see the comments. Please add to all properties you add.
const papi = {
  ...papiShared,
  react: {
    context: papiContext as PapiContext,
    hooks: papiHooks as PapiHooks,
  },
};
export default papi;

export type Papi = typeof papi;
