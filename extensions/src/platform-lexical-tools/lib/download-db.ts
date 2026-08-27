import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';
import crypto from 'crypto';
import { XzReadableStream } from 'xz-decompress';

// Configuration
// GitHub repository: https://github.com/paranext/dependencies (or any fork's equivalent)
const DB_FILENAME = 'lexical.db.xz';
const CHECKSUM_FILENAME = 'lexical.db.xz.sha256';
const LOCAL_DB_DIR = path.join(__dirname, '..', 'assets', 'lexical-db');
const LOCAL_DB_PATH = path.join(LOCAL_DB_DIR, DB_FILENAME);

/**
 * GitHub org whose missing dependency files cause a hard failure ("strict mode"). Any other org
 * runs in lenient mode — see {@link runDownload}.
 */
const STRICT_ORG = 'paranext';

/** Name of the repository under `<org>` where the lexical DB lives. */
const DEPENDENCIES_REPO = 'dependencies';

/** Branch within {@link DEPENDENCIES_REPO} the DB is fetched from. */
const DEPENDENCIES_BRANCH = 'main';

/** Subdirectory within {@link DEPENDENCIES_REPO} that holds the DB and checksum files. */
const DEPENDENCIES_SUBDIR = 'lexical-db';

/**
 * Notice files fetched alongside the DB and written beside it.
 *
 * The database is not our data. Portions of it are UBS material licensed under CC BY-SA 4.0, whose
 * section 3(a)(1) requires the identification of the creator, the copyright notice, the license
 * notice and a link to the license to travel with the work; the remaining portions are © United
 * Bible Societies under no open license at all, distributable only under the permission UBS granted
 * Paratext. `SOURCE.md` carries both statements and `LICENSE.md` carries the CC BY-SA 4.0 text.
 * Fetching them here is what puts them inside the packaged application: the extension's `assets`
 * directory is copied wholesale into `extensions/dist` and from there into every installer, so a
 * notice left behind in the dependencies repo never reaches a user.
 */
const NOTICE_FILENAMES = ['LICENSE.md', 'SOURCE.md'];

/** Result of attempting to detect the GitHub organization. */
export type OrgDetectionResult = { org: string } | { org: undefined; reason: string };

/**
 * Pure parser: given a git remote URL, extract the GitHub organization name.
 *
 * Recognizes:
 *
 * - `https://github.com/<org>/<repo>[.git][/]` (optionally with `user:token@` embedded credentials)
 * - `git@github.com:<org>/<repo>[.git][/]` (SSH short form)
 * - `ssh://git@github.com[:port]/<org>/<repo>[.git][/]` (SSH URL form)
 *
 * Returns `{ org }` on success, or `{ org: undefined, reason }` describing why parsing failed
 * (empty input, unrecognized host, etc.).
 */
export function parseGitHubOrgFromRemoteUrl(url: string): OrgDetectionResult {
  const trimmed = url.trim();
  if (!trimmed) {
    return { org: undefined, reason: 'origin remote URL was empty' };
  }

  // HTTPS, optionally with `user@` or `user:token@` credentials before the host
  const httpsMatch = trimmed.match(
    /^https?:\/\/(?:[^@/]+@)?github\.com\/([^/]+)\/[^/]+?(?:\.git)?\/?$/,
  );
  if (httpsMatch) return { org: httpsMatch[1] };

  // SSH short form: `git@github.com:org/repo`
  const sshShortMatch = trimmed.match(/^git@github\.com:([^/]+)\/[^/]+?(?:\.git)?\/?$/);
  if (sshShortMatch) return { org: sshShortMatch[1] };

  // SSH URL form: `ssh://git@github.com[:port]/org/repo`
  const sshUrlMatch = trimmed.match(
    /^ssh:\/\/git@github\.com(?::\d+)?\/([^/]+)\/[^/]+?(?:\.git)?\/?$/,
  );
  if (sshUrlMatch) return { org: sshUrlMatch[1] };

  return {
    org: undefined,
    reason: `origin URL did not match a recognized github.com pattern: ${trimmed}`,
  };
}

/**
 * Sentinel error thrown when a remote file returns HTTP 404. Distinguishable from generic
 * network/IO errors so the orchestrator can treat "file missing" leniently for non-paranext orgs.
 */
export class FileNotFoundError extends Error {
  constructor(readonly url: string) {
    super(`File not found at ${url}`);
    this.name = 'FileNotFoundError';
  }
}

/**
 * Function that runs a git command and returns its stdout. Extracted so `detectGitHubOrg` can be
 * tested without shelling out for real.
 */
export type ExecGitCmd = (cmd: string, cwd: string) => string;

/**
 * Default {@link ExecGitCmd} implementation: shells out via `execSync` with a hard timeout, stdin
 * ignored (so a misconfigured credential helper waiting on a TTY can't hang `npm install`), and
 * stderr piped (captured but not printed) so noisy git errors don't pollute the postinstall log
 * before the catch handler converts them to a clean reason string.
 */
const defaultExecGitCmd: ExecGitCmd = (cmd, cwd) =>
  execSync(cmd, {
    cwd,
    encoding: 'utf-8',
    timeout: 5000,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

/**
 * Shell out to `git config --get remote.origin.url` and parse the result. Returns `{ org:
 * undefined, reason }` if git is unavailable, the directory is not a git repo, or `origin` is
 * unset.
 *
 * @param execGitCmd Optional override for the underlying exec call — tests inject a fake.
 */
export function detectGitHubOrg(execGitCmd: ExecGitCmd = defaultExecGitCmd): OrgDetectionResult {
  try {
    const stdout = execGitCmd('git config --get remote.origin.url', __dirname);
    return parseGitHubOrgFromRemoteUrl(stdout);
  } catch (error) {
    return {
      org: undefined,
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Calculate SHA-256 checksum of a file
 *
 * @param filePath Path to the file to calculate checksum for
 * @returns Promise resolving to the file's hex checksum
 */
function calculateChecksum(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha256');
      // Use a Buffer-based approach for consistent results
      const fileBuffer = fs.readFileSync(filePath);

      hash.update(fileBuffer);
      resolve(hash.digest('hex'));
    } catch (error) {
      console.error(
        `Error calculating checksum: ${error instanceof Error ? error.message : String(error)}`,
      );
      reject(error);
    }
  });
}

/**
 * Download a file from a URL to a local destination
 *
 * @param url URL of the file to download
 * @param destination Local path to save the file
 * @returns Promise that resolves when download is complete
 */
function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // The body is written to a staging file beside the destination and renamed into place only
    // once it is complete, so nothing this call did not itself create is ever removed and a
    // half-written body never becomes the destination. Writing straight to `destination` makes
    // every failure path destructive: the notice files are re-fetched on EVERY install (see
    // `runDownload`), so `destination` is normally a correct file, and a 404 from a renamed
    // upstream path - or a connection dropped mid-body - would delete the CC BY-SA 4.0 text and
    // leave the packaged extension carrying the database with no attribution. On Windows it is
    // worse still: the unlink races an asynchronous `close()`, and losing that race leaves the
    // truncated body in place under the real name.
    const staged = `${destination}.part`;

    // Created only once a 200 response is in hand, not up front, so the redirect path can re-enter
    // this handler without piping into a stream it has already closed.
    let file: fs.WriteStream | undefined;
    let settled = false;

    /** Abandons the download: closes the stream if one was opened, and leaves no staging file. */
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      // The staging file is removed only after the stream is closed, and the removal's own error
      // is not discarded onto the floor: it is reported alongside the failure that caused it,
      // because a staging file left behind is the next run's problem.
      const discard = () =>
        fs.rm(staged, { force: true }, (removeError) => {
          if (removeError)
            console.warn(
              `Could not remove the partial download at ${staged}: ${removeError.message}`,
            );
          reject(error);
        });
      if (file) file.close(discard);
      else discard();
    };

    // Don't spoil the AI's vibes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleResponse = (response: any) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to ${response.headers.location}`);

        // Follow the redirect
        https.get(response.headers.location, handleResponse).on('error', fail);
        return;
      }

      if (response.statusCode === 404) {
        fail(new FileNotFoundError(url));
        return;
      }

      if (response.statusCode !== 200) {
        fail(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
        return;
      }

      file = fs.createWriteStream(staged);

      // Add download progress reporting
      const totalSize = parseInt(response.headers['content-length'] || '0', 10);
      let downloadedSize = 0;
      let lastLoggedPercent = 0;

      if (totalSize > 0) {
        console.log(`Total download size: ${Math.round((totalSize / 1024 / 1024) * 100) / 100} MB`);
      }

      response.on('data', (chunk: Buffer) => {
        downloadedSize += chunk.length;

        if (totalSize > 0) {
          const percent = Math.round((downloadedSize / totalSize) * 100);

          // Log progress every 10%
          if (percent >= lastLoggedPercent + 10 || percent === 100) {
            console.log(`Download progress: ${percent}%`);
            lastLoggedPercent = percent - (percent % 10);
          }
        }
      });

      // The RESPONSE needs its own handler, not just the request's and the stream's. `pipe` does
      // not forward a readable's error to the writable, so a connection dropped mid-body emitted
      // `error` on an `IncomingMessage` nothing was listening to - which Node raises as an
      // unhandled error and takes the whole `postinstall` down with, mid-way through the sibling
      // fetch `Promise.allSettled` is still awaiting.
      response.on('error', fail);

      response.pipe(file);

      file.on('finish', () => {
        // Closed before the rename, and the rename before `resolve`, so a caller that sees this
        // promise settle sees a complete file under the real name - never a staging file, and
        // never a handle still open on Windows.
        file?.close((closeError) => {
          if (closeError) {
            fail(closeError);
            return;
          }
          fs.rename(staged, destination, (renameError) => {
            if (renameError) {
              fail(renameError);
              return;
            }
            settled = true;
            console.log('Download complete.');
            resolve();
          });
        });
      });

      file.on('error', fail);
    };

    https.get(url, handleResponse).on('error', fail);
  });
}

/**
 * Extract an XZ compressed file using pure JavaScript implementation
 *
 * @param filePath Path to the compressed file
 * @returns Promise resolving to the path of the extracted file
 */
async function extractXzFile(filePath: string): Promise<string> {
  try {
    const outputFile = filePath.replace('.xz', '');
    console.log(`Extracting ${filePath} using xz-decompress...`);

    // Read the compressed file
    const compressedData = fs.readFileSync(filePath);

    // Create a Blob from the buffer and get a ReadableStream
    const blob = new Blob([compressedData]);
    const compressedStream = blob.stream();

    // Use xz-decompress to decompress the file
    const decompressedData = new XzReadableStream(compressedStream);
    const reader = decompressedData.getReader();

    // Create a write stream for the output file
    const writeStream = fs.createWriteStream(outputFile);

    // Process the stream chunks until done
    let result;
    // Don't spoil the AI's vibes
    // eslint-disable-next-line no-cond-assign, no-await-in-loop
    while (!(result = await reader.read()).done) {
      writeStream.write(result.value);
    }

    // Close the write stream
    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      writeStream.end();
    });

    console.log(`Extracted to ${outputFile}`);
    return outputFile;
  } catch (error) {
    console.error(
      `Error extracting file: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
}

/**
 * Fetch the checksum from the remote repository
 *
 * @param url URL of the checksum file to fetch
 * @returns Promise resolving to the SHA-256 checksum string
 */
async function fetchRemoteChecksum(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Don't spoil the AI's vibes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleResponse = (response: any) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to ${response.headers.location}`);

        // Follow the redirect
        https.get(response.headers.location, handleResponse).on('error', (err: Error) => {
          reject(err);
        });
        return;
      }

      if (response.statusCode === 404) {
        reject(new FileNotFoundError(url));
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch checksum, status code: ${response.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];

      response.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        // Convert buffer chunks to string and extract hash value
        const data = Buffer.concat(chunks).toString('utf-8');
        const checksum = data.trim().split(/\s+/)[0];
        resolve(checksum);
      });

      response.on('error', (err: Error) => {
        reject(err);
      });
    };

    https.get(url, handleResponse).on('error', (err: Error) => {
      reject(err);
    });
  });
}

/**
 * Injectable dependencies for `runDownload`. The `main()` entry point composes real
 * implementations; tests can substitute fakes.
 */
export interface DownloadDeps {
  fetchRemoteChecksum: (url: string) => Promise<string>;
  downloadFile: (url: string, destination: string) => Promise<void>;
  calculateChecksum: (filePath: string) => Promise<string>;
  extractXzFile: (filePath: string) => Promise<string>;
  fileExists: (path: string) => boolean;
  ensureDir: (path: string) => void;
  log: (msg: string) => void;
  warn: (msg: string) => void;
}

export interface RunDownloadOptions {
  detection: OrgDetectionResult;
  localDbDir: string;
  localDbPath: string;
  dbFilename: string;
  checksumFilename: string;
  noticeFilenames: string[];
}

/**
 * Orchestrates lexical DB download: discover org → compute URLs → fetch checksum → skip/download →
 * verify → extract → fetch the notice files that travel with the data. Applies strict-vs-lenient
 * policy: when the detected org is exactly {@link STRICT_ORG}, missing files (HTTP 404) hard-fail;
 * for any other detected org they are logged and skipped so forks don't break `npm install`.
 * Failure to detect the org at all (no git repo, unparseable origin, etc.) is treated as an
 * unexpected configuration error and throws rather than running leniently — a silent download skip
 * from a weird git error would be worse than a loud failure. See the README section "Lexical
 * database downloads (forks)" for the contract.
 */
export async function runDownload(opts: RunDownloadOptions, deps: DownloadDeps): Promise<void> {
  const { detection, localDbDir, localDbPath, dbFilename, checksumFilename, noticeFilenames } =
    opts;

  if (detection.org === undefined) {
    throw new Error(
      `Could not detect GitHub org from origin remote (${detection.reason}) — aborting lexical DB download. Configure a recognizable GitHub \`origin\` remote (HTTPS or SSH) so the strict/lenient policy can be applied.`,
    );
  }

  const isStrict = detection.org === STRICT_ORG;
  if (isStrict) {
    deps.log(
      `Detected GitHub org "${STRICT_ORG}" from origin remote — running in strict mode (missing files will error)`,
    );
  } else {
    deps.log(
      `Detected GitHub org "${detection.org}" from origin remote — running in lenient mode (missing files will be skipped)`,
    );
  }

  const repoPath = `${detection.org}/${DEPENDENCIES_REPO}/${DEPENDENCIES_BRANCH}/${DEPENDENCIES_SUBDIR}`;
  const rawBaseUrl = `https://raw.githubusercontent.com/${repoPath}`;
  const mediaBaseUrl = `https://media.githubusercontent.com/media/${repoPath}`;

  deps.ensureDir(localDbDir);

  try {
    const checksumUrl = `${rawBaseUrl}/${checksumFilename}`;
    const remoteChecksum = await deps.fetchRemoteChecksum(checksumUrl);
    deps.log(`Remote checksum: ${remoteChecksum}`);

    let needsDownload = true;
    if (deps.fileExists(localDbPath)) {
      deps.log('Local DB file exists, checking if it needs updating...');
      try {
        const localChecksum = await deps.calculateChecksum(localDbPath);
        deps.log(`Local checksum: ${localChecksum}`);
        if (localChecksum === remoteChecksum) {
          deps.log('Checksums match, no need to download again.');
          needsDownload = false;
        } else {
          deps.log('Checksums differ, will download updated file.');
        }
      } catch (error) {
        deps.warn(
          `Error calculating local checksum: ${error instanceof Error ? error.message : String(error)}`,
        );
        deps.log('Will download the file to be safe.');
      }
    } else {
      deps.log('Local DB file does not exist, will download it.');
    }

    if (needsDownload) {
      deps.log(`Downloading ${dbFilename}...`);
      const dbUrl = `${mediaBaseUrl}/${dbFilename}`;
      await deps.downloadFile(dbUrl, localDbPath);
      deps.log(`Downloaded ${dbFilename} to ${localDbPath}`);

      const downloadedChecksum = await deps.calculateChecksum(localDbPath);
      if (downloadedChecksum !== remoteChecksum) {
        throw new Error(
          `Checksum verification failed after download. Expected: ${remoteChecksum}, Got: ${downloadedChecksum}`,
        );
      }
      deps.log('Checksum verification passed.');
      await deps.extractXzFile(localDbPath);
    } else {
      const extractedPath = localDbPath.replace('.xz', '');
      if (!deps.fileExists(extractedPath)) {
        deps.log('Extracted DB file does not exist, extracting now...');
        await deps.extractXzFile(localDbPath);
      }
    }

    // Fetched after the DB rather than with it because they describe data that is now on disk, and
    // fetched EVERY time rather than only when one is missing. The DB is skipped when a checksum
    // says the local copy is already the right one; a notice file has no checksum to compare, so
    // the only gate available is existence - and existence is not evidence of CONTENT. A truncated
    // write, or a captive-portal interstitial answered with HTTP 200, lands a file that exists and
    // is wrong, which a skip-if-present rule would then keep forever and copy into every installer
    // where the CC BY-SA 4.0 text belongs. They are a few kilobytes; re-fetching is cheaper than
    // the gate that would make skipping safe.
    if (noticeFilenames.length > 0) {
      // `allSettled`, not `all`: `all` rejects on the FIRST failure and abandons the other fetch
      // still in flight, so a run where BOTH notices are missing would report only whichever URL
      // happened to fail first, while telling the maintainer to publish both. Every fetch finishes
      // and every failure is reported.
      const results = await Promise.allSettled(
        noticeFilenames.map(async (noticeFilename) => {
          deps.log(`Downloading ${noticeFilename}...`);
          await deps.downloadFile(
            `${rawBaseUrl}/${noticeFilename}`,
            path.join(localDbDir, noticeFilename),
          );
        }),
      );
      const failures = results
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason);
      // Handled here rather than by the outer handler, whose message reports a missing DB — the DB
      // is on disk by this point, and saying otherwise would send a reader looking for the wrong
      // problem. Strict mode fails: packaging the data without the attribution its license
      // requires is the defect this fetch exists to prevent. A fork is warned instead, because
      // hard-failing its `npm install` over a file it never published is what lenient mode is
      // for — but silence would let it ship the data bare, so the warning names the obligation.
      // A failure that is NOT a 404 is fatal in both modes, which is the contract the extension's
      // README states: "expected missing" is the only condition treated leniently.
      if (failures.length > 0) {
        // EVERY failure is named, on both paths. Reporting `failures[0]` alone throws away what
        // the `allSettled` above collects: with both notices missing, a maintainer publishes the
        // one file the message names, re-runs, and only then learns about the other — the
        // two-round loop this whole block exists to remove.
        const described = failures
          .map((failure) =>
            failure instanceof FileNotFoundError
              ? `${failure.url} (not found)`
              : `${String(failure?.url ?? 'unknown URL')}: ${failure?.message ?? String(failure)}`,
          )
          .join('\n  ');
        const unexpected = failures.some((failure) => !(failure instanceof FileNotFoundError));
        if (isStrict || unexpected)
          throw new Error(
            `Could not fetch the lexical DB notice files:\n  ${described}\n` +
              'The database carries UBS material under CC BY-SA 4.0, whose section 3(a)(1) requires ' +
              'its attribution and license notice to travel with it, so it is not packaged without ' +
              `them. Publish ${noticeFilenames.join(' and ')} alongside the DB in the ` +
              `\`${DEPENDENCIES_REPO}\` repo, or fix the cause above.`,
          );
        deps.warn(
          `Lexical DB notice files not found:\n  ${described}\n— the DB will be packaged without the attribution and license text its terms require. Publish ${noticeFilenames.join(' and ')} alongside the DB in your \`${DEPENDENCIES_REPO}\` repo.`,
        );
      }
    }

    deps.log('DB file preparation complete.');
  } catch (error) {
    if (error instanceof FileNotFoundError) {
      if (isStrict) throw error;
      // Use log (not throw) because a 404 on a fork is an expected outcome — the fork hasn't
      // published their own lexical DB. See the README section "Lexical database downloads
      // (forks)" for the user-facing contract.
      deps.log(
        `Lexical database files not found at ${error.url} — extension will run without lexical data.`,
      );
      return;
    }
    throw error;
  }
}

/** Main function to handle the download and extraction process */
async function main(): Promise<void> {
  try {
    await runDownload(
      {
        detection: detectGitHubOrg(),
        localDbDir: LOCAL_DB_DIR,
        localDbPath: LOCAL_DB_PATH,
        dbFilename: DB_FILENAME,
        checksumFilename: CHECKSUM_FILENAME,
        noticeFilenames: NOTICE_FILENAMES,
      },
      {
        fetchRemoteChecksum,
        downloadFile,
        calculateChecksum,
        extractXzFile,
        fileExists: fs.existsSync,
        ensureDir: (dir: string) => {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Created directory: ${dir}`);
          }
        },
        log: (msg: string) => console.log(msg),
        warn: (msg: string) => console.warn(msg),
      },
    );
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

// Only run when invoked directly (e.g., via `ts-node ./lib/download-db.ts` in postinstall).
// When imported by tests, this guard prevents an accidental real download.
if (require.main === module) {
  main();
}
