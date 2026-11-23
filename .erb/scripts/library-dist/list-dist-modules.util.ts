// Standard library only and erasable TypeScript only, so plain `node` can load this file.
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { Script } from 'node:vm';

/**
 * Lists the built scripts directly inside a library's `dist` folder, split by module format.
 * Declaration files and source maps are excluded. Paths are absolute and sorted.
 */
export function listDistModules(distDir: string): { commonJs: string[]; esModules: string[] } {
  const files = readdirSync(distDir).sort();
  const inDist = (extension: string): string[] =>
    files.filter((name) => name.endsWith(extension)).map((name) => path.join(distDir, name));
  return { commonJs: inDist('.cjs'), esModules: inDist('.js') };
}

/**
 * Whether `source` compiles as a CommonJS module, wrapped the way Node wraps one. ES module syntax
 * (`import`, `export`, `import.meta`) does not compile there. Nothing is executed.
 */
export function isCommonJsSource(source: string, filename: string): boolean {
  try {
    const script = new Script(
      `(function (exports, require, module, __filename, __dirname) {${source}\n})`,
      { filename },
    );
    return script.runInThisContext !== undefined;
  } catch {
    return false;
  }
}
