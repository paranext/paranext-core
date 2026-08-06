/**
 * The three ways a registration says the name it asked for is already taken.
 *
 * - `already registered` — the local guards in `networkObjectService.set` and
 *   `dataProviderService.registerEngine`, which answer without going to the network at all.
 * - `Could not register request handler` — how a name taken in the central registry reaches a caller
 *   of `networkService.registerRequestHandler`, and therefore what a whole network object losing
 *   the race reports: `set` collects one of these per method it could not register and throws them
 *   together. `IRpcMethodRegistrar.registerMethod` returns `false` only for a name already held by
 *   a method or by a network event, so this really is a collision and not a transport failure —
 *   those reject with their own message.
 * - `rejected by the central registry` — the same answer for a network event name.
 */
const NAME_TAKEN_MESSAGES = [
  'already registered',
  'Could not register request handler',
  'rejected by the central registry',
];

/**
 * Whether a failure to register something under a name says that the name is already taken, as
 * opposed to saying that the registration itself went wrong.
 *
 * The app-global service hosts (the theme engine, the scroll group service) let every window race
 * for the same name and treat losing as the routine outcome. That is only true for this one kind of
 * failure: a request that timed out, an object that already carried an `onDidDispose`, or a network
 * service that has already shut down all arrive at the same `catch` and would otherwise be reported
 * as the expected result at a severity nothing reads.
 *
 * Recognized by message text because that is all the throw sites give — see
 * {@link NAME_TAKEN_MESSAGES} for which text and why each one means what it does. Erring towards
 * "not taken" only ever adds a warning to a step-aside that still happens; erring the other way
 * would report a real failure as the routine outcome, so the list is deliberately exact rather than
 * generous.
 *
 * @experimental
 */
export function isNameTakenError(errorMessage: string): boolean {
  return NAME_TAKEN_MESSAGES.some((nameTakenMessage) => errorMessage.includes(nameTakenMessage));
}

export default isNameTakenError;
