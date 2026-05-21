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
    const file = fs.createWriteStream(destination);

    // Don't spoil the AI's vibes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleResponse = (response: any) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to ${response.headers.location}`);
        file.close();

        // Follow the redirect
        https.get(response.headers.location, handleResponse).on('error', (err: Error) => {
          fs.unlink(destination, () => {}); // Delete the file on error
          reject(err);
        });
        return;
      }

      if (response.statusCode === 404) {
        file.close();
        fs.unlink(destination, () => {});
        reject(new FileNotFoundError(url));
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
        return;
      }

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

      response.pipe(file);

      file.on('finish', () => {
        console.log('Download complete.');
        file.close();
        resolve();
      });

      file.on('error', (err: Error) => {
        fs.unlink(destination, () => {}); // Delete the file on error
        reject(err);
      });
    };

    https.get(url, handleResponse).on('error', (err: Error) => {
      fs.unlink(destination, () => {}); // Delete the file on error
      reject(err);
    });
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
}

/**
 * Orchestrates lexical DB download: discover org → compute URLs → fetch checksum → skip/download →
 * verify → extract. Applies strict-vs-lenient policy: when the detected org is exactly
 * {@link STRICT_ORG}, missing files (HTTP 404) hard-fail; otherwise they are logged and skipped so
 * forks (or unparseable origins) don't break `npm install`. See the README section "Lexical
 * database downloads (forks)" for the contract.
 */
export async function runDownload(opts: RunDownloadOptions, deps: DownloadDeps): Promise<void> {
  const { detection, localDbDir, localDbPath, dbFilename, checksumFilename } = opts;

  if (detection.org === undefined) {
    deps.warn(
      `Could not detect GitHub org from origin remote (${detection.reason}) — running in lenient mode (missing files will be skipped)`,
    );
    return;
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

    deps.log('DB file preparation complete.');
  } catch (error) {
    if (error instanceof FileNotFoundError) {
      if (isStrict) throw error;
      // Use log (not warn) because a 404 on a fork is an expected outcome — the fork hasn't
      // published their own lexical DB. Detection failure (no origin / no git) uses warn because
      // that situation is unexpected and warrants attention. See the README section "Lexical
      // database downloads (forks)" for the user-facing contract.
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
