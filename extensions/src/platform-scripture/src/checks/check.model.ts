/** All services that run checks are expected to register a network object of this type */
export const CHECK_RUNNER_NETWORK_OBJECT_TYPE = 'checkRunner';

/** Name of event emitted when check results have been invalidated */
export const CHECK_RESULTS_INVALIDATED_EVENT = 'checkResultsInvalidated' as const;

// This should match the stop default timeout in CheckRunner.cs
/** Default timeout in milliseconds to wait for a check job to stop gracefully */
export const CHECK_STOP_DEFAULT_TIMEOUT_MS = 2000;

/**
 * OpenRPC documentation for the `lookupCheckSetupStatus` method of check runners and the check
 * aggregator. Marked experimental on the wire to match the `@experimental` tag on the type.
 */
export const LOOKUP_CHECK_SETUP_STATUS_METHOD_DOCUMENTATION = {
  name: 'lookupCheckSetupStatus',
  'x-experimental': true,
  summary:
    'Whether a check is ready to run on a project, needs setup first, or does not apply to it',
  params: [
    {
      name: 'checkId',
      required: true,
      summary: 'ID of the check',
      schema: { type: 'string' as const },
    },
    {
      name: 'projectId',
      required: true,
      summary: 'ID of the project',
      schema: { type: 'string' as const },
    },
  ],
  result: { name: 'checkSetupState', schema: { type: 'object' as const } },
};
