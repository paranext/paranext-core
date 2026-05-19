# Schema-validation fixtures

Sample JSON sidecars used to verify the PR-A artifact schemas via
`.claude/scripts/integration-verify/validate-schema.ts`.

Each schema has at least one `valid-*.json` (must validate) and one or more `invalid-*.json`
files (must FAIL validation, each demonstrating a specific failure mode).

These fixtures double as documentation: the `valid-*.json` files show a minimal complete
shape an agent should aim for, and the `invalid-*.json` files spell out which mistakes
will fail the gate.

A small driver script under `.claude/scripts/integration-verify/__tests__/` (run as part of
`npm test`) iterates over this directory and asserts each file produces the expected exit
code.
