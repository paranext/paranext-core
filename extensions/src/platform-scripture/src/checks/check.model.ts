/** All services that run checks are expected to register a network object of this type */
export const CHECK_RUNNER_NETWORK_OBJECT_TYPE = 'checkRunner';

/** Name of event emitted when check results have been invalidated */
export const CHECK_RESULTS_INVALIDATED_EVENT = 'checkResultsInvalidated';

// This should match the stop default timeout in CheckRunner.cs
/** Default timeout in milliseconds to wait for a check job to stop gracefully */
export const CHECK_STOP_DEFAULT_TIMEOUT_MS = 2000;
