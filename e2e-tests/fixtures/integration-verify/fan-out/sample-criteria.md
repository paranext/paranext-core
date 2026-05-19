<!--
Sample criteria file demonstrating the `[auto, fan-out: ...]` directive syntax.

Run it against the sample feature dir alongside this file:

    npx tsx .claude/scripts/integration-verify/fan-out.ts \
      --criteria e2e-tests/fixtures/integration-verify/fan-out/sample-criteria.md \
      --feature-dir e2e-tests/fixtures/integration-verify/fan-out/sample-feature \
      --output /tmp/sample-fan-out-results.json

See PR-A foundation plan section A.2 for the directive resolution rules.
-->

# Sample criteria (fan-out demonstration)

These criteria iterate over arrays inside `implementation/integration-plan.json` and
assert per-entry conditions about proof files that downstream PRs (PR-B / PR-C) will
emit. PR-A only ships the helper; no real criteria file uses fan-out in PR-A.

## Wire conformance fan-out

- [auto, fan-out: implementation/integration-plan.json#/commands]
  For each command, verify that a wire-conformance proof file exists.
  pass-when: test -f "proofs/runtime-backend/wire-conformance/{name}.json"

## Touchpoint fan-out

- [auto, fan-out: implementation/integration-plan.json#/touchpoints]
  For each touchpoint, verify proof file present and status == "PASS".
  pass-when: test -f "proofs/runtime-backend/touchpoints/{id}.json"

## Startup-services fan-out

- [auto, fan-out: implementation/integration-plan.json#/startup/services]
  For each service, verify the service-name appears in the startup-services proof.
  pass-when: grep -q "{className}" proofs/runtime-backend/startup-services.json
