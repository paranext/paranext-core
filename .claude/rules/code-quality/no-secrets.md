## Secrets When Porting PT9 Features

The general secrets policy lives in [CLAUDE.md](../../../CLAUDE.md#never-commit-secrets) and is
enforced at commit time by gitleaks in `.husky/pre-commit`. This rule covers only the case that
policy does not: porting.

When porting PT9 features that involve encryption, decryption, or secrets, document the
_mechanism_ (e.g., "uses AES-256 decryption with a key from user config") but never copy actual
keys, passwords, or secret values into PT10 artifacts, test fixtures, or code. Use placeholder
values like `"<encryption-key-from-user-config>"` in specifications and contracts.
