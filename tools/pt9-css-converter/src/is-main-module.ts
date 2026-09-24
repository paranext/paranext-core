import process from 'node:process';
import { pathToFileURL } from 'node:url';

/**
 * True when the given module was invoked directly as the entry script (rather than imported), so a
 * CLI's `main()` should run. Pass the caller's `import.meta.url`.
 *
 * Shared by the tool's CLI entry points (`cli.ts`, `audit-cli.ts`) so the entry-detection logic
 * cannot drift between them.
 *
 * @param moduleUrl The calling module's `import.meta.url`.
 */
export function isMainModule(moduleUrl: string): boolean {
  if (!process.argv[1]) return false;
  try {
    return moduleUrl === pathToFileURL(process.argv[1]).href;
  } catch {
    return false;
  }
}
