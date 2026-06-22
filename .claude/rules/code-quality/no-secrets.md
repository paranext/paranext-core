## Never Commit Secrets

This is an open-source repository. Never introduce secrets into the codebase:

- **No hardcoded credentials**: API keys, tokens, passwords, connection strings, private keys
- **No secret files**: `.env`, `.env.*`, `*.pem`, `*.key`, `*.pfx`, `*.p12`, `credentials.json`, `service-account.json`
- **No secrets in commit messages or PR descriptions**
- **No base64-encoded or obfuscated secrets** — encoding is not encryption

If a feature needs a secret at runtime, use environment variables or Platform.Bible's settings system. Never provide a default value that is an actual secret.

If you suspect you've staged a file containing secrets, unstage it before committing.
