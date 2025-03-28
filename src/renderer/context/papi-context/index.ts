import { TestContext } from '@renderer/context/papi-context/test.context';

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiContext {
  TestContext: typeof TestContext;
}

/**
 * JSDOC SOURCE papiContext
 *
 * All React contexts to be exposed on the papi
 */
export const papiContext: PapiContext = {
  TestContext,
};

export default papiContext;
