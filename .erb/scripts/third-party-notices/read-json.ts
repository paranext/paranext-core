import * as fs from 'fs';

/**
 * The message of whatever was thrown.
 *
 * `catch (err)` gives `unknown`, and rightly: `throw 'a string'` is legal JavaScript, so reading
 * `.message` off it is how a reporting path throws while reporting.
 */
export function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/**
 * The `code` of whatever was thrown, when it carries one.
 *
 * Node puts `ENOENT`/`EACCES` on a system error, and it is the only thing that tells a MISSING file
 * apart from an unreadable one. It is not a property of `Error`, so reading it needs the same
 * `unknown`-shaped care as `messageOf`.
 */
export function codeOf(err: unknown): string | undefined {
  return err && typeof err === 'object' && 'code' in err && typeof err.code === 'string'
    ? err.code
    : undefined;
}

/**
 * Reads and parses a JSON file, naming the file in every failure.
 *
 * `JSON.parse(fs.readFileSync(file, 'utf8'))` was written inline at thirteen places here, across
 * the lockfile, the policy, the notices lock, the vendored SPDX index, the webpack module
 * manifests, the .NET restore assets and roughly 8,500 third-party `package.json` files. None of
 * them named the file. `main.ts` deliberately prints `err.message` alone rather than a stack - the
 * whole pipeline's convention is that a failure states what is wrong and what repairs it - so a
 * truncated manifest from an interrupted install surfaced as a bare `SyntaxError: Unexpected end of
 * JSON input` identifying none of them, and an unreadable one as a raw ENOENT. That is precisely
 * the shape the message-only convention exists to avoid.
 *
 * Read failure and parse failure are reported separately because they have different remedies: one
 * is a missing or unreadable file, the other is a file whose contents are wrong.
 *
 * THROWS rather than returning `undefined`, which is the opposite of `readTextFile` in
 * `package-files.ts` - deliberately. That one reads an OPTIONAL licence text, where "not there" is
 * an ordinary answer the document reports. Every caller here reads something STRUCTURAL, where a
 * file that cannot be read means the shipping set is short by whatever it described: swallowing it
 * would be the silent under-report this pipeline exists to refuse.
 *
 * Generic in what the caller expects to find, with no default: parsed JSON is unknown at this
 * boundary, and the shape belongs at the call site, which is the only place that knows what it
 * asked for. Naming it there also means the `types.ts` shapes are checked against every use of the
 * data rather than only against the functions that pass it on.
 *
 * @param file Absolute path to the file.
 * @param what What the file is, in a phrase that completes "could not read ..." - so a reader who
 *   has never seen this code knows what was being looked for and why.
 */
export function readJsonFile<T>(file: string, what: string): T {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (err) {
    // `unknown` under strict TypeScript, and `throw 'a string'` is legal JavaScript - so the
    // message is extracted rather than assumed, or this path would itself throw while reporting.
    //
    // `code` is CARRIED THROUGH. Replacing a system error with a plain `Error` dropped it, and a
    // caller that needs to tell "the file is not there yet" from "the file is unreadable" - the
    // first-ever notices generation is exactly that caller - had its ENOENT branch made
    // unreachable: the tolerance was dead code and the bootstrap could not run at all.
    throw Object.assign(new Error(`could not read ${what} at ${file}: ${messageOf(err)}`), {
      code: codeOf(err),
    });
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`${what} at ${file} is not valid JSON: ${messageOf(err)}`);
  }
}
