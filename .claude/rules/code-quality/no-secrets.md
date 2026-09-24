## Never Commit Secrets

This is an open-source repository. Never introduce secrets into the codebase:

- **No hardcoded credentials**: API keys, tokens, passwords, connection strings, private keys
- **No secret files**: `.env`, `.env.*`, `*.pem`, `*.key`, `*.pfx`, `*.p12`, `credentials.json`, `service-account.json`
- **No secrets in commit messages or PR descriptions**
- **No base64-encoded or obfuscated secrets** — encoding is not encryption

If a feature needs a secret at runtime, use environment variables or Platform.Bible's settings system. Never provide a default value that is an actual secret.

### PT9 porting

When porting PT9 features that involve encryption, decryption, or secrets, document the _mechanism_ (e.g., "uses AES-256 decryption with a key from user config") but never copy actual keys, passwords, or secret values into PT10 artifacts, test fixtures, or code. Use placeholder values like `"<encryption-key-from-user-config>"` in specifications and contracts.

If you suspect you've staged a file containing secrets, unstage it before committing.
