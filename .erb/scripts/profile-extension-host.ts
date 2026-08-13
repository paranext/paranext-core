import { execSync } from 'child_process';
import fs from 'fs';
import { defaultLogPath } from './startup-waterfall.util';

/**
 * Records a V8 CPU profile of the extension host process, from as early in its life as possible,
 * and writes a `.cpuprofile` you open in Chrome DevTools.
 *
 * Startup marks (`PT_STARTUP_MARKS=true` plus `npm run startup-waterfall`) tell you WHICH phase is
 * slow; this tells you WHAT is running inside it.
 *
 * ## Running it - two terminals
 *
 * ```bash
 * # Terminal 1: launch the app. Port 0 means "pick a free port", so the inspector this adds to
 * # every Node process in the chain (webpack, electronmon, main, extension host) cannot collide.
 * PT_STARTUP_MARKS=true NODE_OPTIONS="--inspect=0" npm start
 * ```
 *
 * ```bash
 * # Terminal 2: start this right away. It polls until the extension host appears, so running it
 * # early costs nothing - while starting it late misses the beginning of extension activation.
 * npm run profile-extension-host
 * ```
 *
 * Then open the `.cpuprofile` in Chrome DevTools: F12 > Performance > the "Load profile" arrow, or
 * drag the file onto the panel, for the flame chart, call tree and bottom-up views. Run with
 * `--help` for the full option list.
 *
 * ## Why a script instead of attaching by hand
 *
 * The extension host is forked without an inspector flag (`extension-host.service.ts` builds the
 * child's `execArgv` from `process.execArgv`, and Electron puts `--inspect` in `argv`), so the
 * inspector has to come from `NODE_OPTIONS`. Even then, only ~1.5s separates the extension host's
 * first instruction from the start of extension activation, which is too little time to find its
 * port and press Record in DevTools. This attaches within ~100ms of the inspector opening.
 *
 * `--cpu-prof` is not a workaround: V8 flushes that file only on a clean exit, and main hard-kills
 * the extension host shortly after asking it to shut down (`PROCESS_CLOSE_TIME_OUT_MS` in
 * `src/main/main.ts`), so the profile is usually lost. Driving the profiler over the inspector
 * protocol does not care how the process dies.
 *
 * ## Reading the result
 *
 * - **A CPU profile only explains CPU time.** Where a phase is waiting on the .NET data provider or
 *   the network it shows up as idle, however long it takes. Add startup marks around the await
 *   instead.
 * - **Dev-mode profiles are dominated by tooling.** ts-node compiles the extension host's TypeScript
 *   in-process, so the TypeScript compiler and Node's module loader outweigh extension code.
 *   Profile a packaged build before optimizing anything.
 * - **The SQLite worker thread is not included.** `database.service-host.ts` gives that `Worker` an
 *   explicit `execArgv`, which replaces the inherited inspector flag.
 */

/** Milliseconds between polls while waiting for the extension host's inspector to appear. */
const TARGET_POLL_INTERVAL_MS = 100;
/** Milliseconds between reads of the log while waiting for the stop mark. */
const MARK_POLL_INTERVAL_MS = 250;
/** Sampling interval used when `--interval-us` is not given. Matches V8's own default. */
const DEFAULT_INTERVAL_US = 1000;
/** How long to record before giving up on the stop mark, when `--max-seconds` is absent. */
const DEFAULT_MAX_SECONDS = 120;
/**
 * How long to wait for the extension host to appear, when `--wait-seconds` is absent. Budgeted
 * separately from `--max-seconds`: `npm start` can spend minutes on webpack before main forks the
 * extension host, and that wait should not eat into the recording window.
 */
const DEFAULT_WAIT_SECONDS = 600;
const DEFAULT_OUT_PATH = 'extension-host.cpuprofile';
const DEFAULT_UNTIL_MARK = 'all-extensions-activated';

type Options = {
  outPath: string;
  untilMark: string;
  maxSeconds: number;
  waitSeconds: number;
  intervalUs: number;
  logPath: string;
};

/** Shape of the `Profiler.stop` payload this script needs. */
type ProfileSummary = {
  /** The profile exactly as V8 returned it, for writing verbatim. */
  profile: unknown;
  sampleCount: number;
  frameCount: number;
  durationMs: number;
};

const USAGE = `Record a CPU profile of the Platform.Bible extension host and write a .cpuprofile.

Usage:
  # terminal 1 - launch the app with an inspector on every Node process in the chain.
  # Port 0 means "pick a free port", so nothing collides.
  PT_STARTUP_MARKS=true NODE_OPTIONS="--inspect=0" npm start

  # terminal 2 - start this right away; it waits for the extension host, then records
  npm run profile-extension-host [-- <options>]

Open the result in Chrome DevTools: F12 > Performance > the "Load profile" arrow (or
drag the .cpuprofile onto the panel) for the flame chart, call tree and bottom-up
views.

Options:
  --out <path>, --out=<path>               Where to write the profile.
                                           Default: ${DEFAULT_OUT_PATH}
  --until-mark <name>, --until-mark=<name> Startup mark that stops the recording.
                                           Default: ${DEFAULT_UNTIL_MARK}
  --max-seconds <n>, --max-seconds=<n>     Stop recording after this long if the mark
                                           never arrives. Timed from when recording
                                           starts, not from launch.
                                           Default: ${DEFAULT_MAX_SECONDS}
  --wait-seconds <n>, --wait-seconds=<n>   How long to wait for the extension host to
                                           appear before giving up.
                                           Default: ${DEFAULT_WAIT_SECONDS}
  --interval-us <n>, --interval-us=<n>     Sampling interval in microseconds. Lower
                                           is more detail and more overhead.
                                           Default: ${DEFAULT_INTERVAL_US}
  --log <path>, --log=<path>               Log to watch for the stop mark. Defaults
                                           to this platform's dev Electron main.log.
  --help, -h                               Show this help.

Stopping on a mark needs PT_STARTUP_MARKS=true (see the "Startup performance
timing" section of README.md). Without it, pass --max-seconds and let it time out.`;

const KNOWN_FLAGS = [
  '--out',
  '--until-mark',
  '--max-seconds',
  '--wait-seconds',
  '--interval-us',
  '--log',
];

/**
 * Read one `--flag <value>` / `--flag=<value>` option out of argv.
 *
 * Returns an error string rather than silently falling back to the default when a flag is given
 * without a value, so a typo cannot quietly write the profile somewhere unexpected or stop the
 * recording on the wrong condition.
 */
function parseFlag(args: string[], flag: string): { value?: string; error?: string } {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === flag) {
      const next = args[i + 1];
      if (!next || next.startsWith('--'))
        return { error: `${flag} requires a value (use ${flag} <value> or ${flag}=<value>)` };
      return { value: next };
    }
    if (arg.startsWith(`${flag}=`)) {
      const value = arg.slice(flag.length + 1);
      if (!value)
        return { error: `${flag}= requires a value (use ${flag} <value> or ${flag}=<value>)` };
      return { value };
    }
  }
  return {};
}

/** Like {@link parseFlag}, but for options that must be a positive number. */
function parseNumericFlag(args: string[], flag: string): { value?: number; error?: string } {
  const { value: raw, error } = parseFlag(args, flag);
  if (error) return { error };
  if (raw === undefined) return {};
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0)
    return { error: `${flag} must be a positive number (got "${raw}")` };
  return { value };
}

function parseOptions(argv: string[]): { options?: Options; error?: string } {
  const args = argv.slice(2);

  // Reject unknown options instead of ignoring them, so typos surface immediately.
  const unknown = args.find(
    (arg) =>
      arg.startsWith('--') &&
      !KNOWN_FLAGS.some((flag) => arg === flag || arg.startsWith(`${flag}=`)),
  );
  if (unknown) return { error: `Unrecognized argument "${unknown}" (see --help)` };

  const out = parseFlag(args, '--out');
  const untilMark = parseFlag(args, '--until-mark');
  const log = parseFlag(args, '--log');
  const maxSeconds = parseNumericFlag(args, '--max-seconds');
  const waitSeconds = parseNumericFlag(args, '--wait-seconds');
  const intervalUs = parseNumericFlag(args, '--interval-us');

  const error =
    out.error ??
    untilMark.error ??
    log.error ??
    maxSeconds.error ??
    waitSeconds.error ??
    intervalUs.error ??
    undefined;
  if (error) return { error };

  return {
    options: {
      outPath: out.value ?? DEFAULT_OUT_PATH,
      untilMark: untilMark.value ?? DEFAULT_UNTIL_MARK,
      logPath: log.value ?? defaultLogPath(),
      maxSeconds: maxSeconds.value ?? DEFAULT_MAX_SECONDS,
      waitSeconds: waitSeconds.value ?? DEFAULT_WAIT_SECONDS,
      intervalUs: intervalUs.value ?? DEFAULT_INTERVAL_US,
    },
  };
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
const report = (message: string) => console.log(`[profile-extension-host] ${message}`);

/**
 * Matches the extension host's entry module, dev (`.ts`) or packaged (`.js`).
 *
 * The leading path separator matters: without it this also matches THIS script
 * (`profile-extension-host.ts`), whose own command line is the first thing `pgrep -f` finds - so
 * the profiler would wait forever for an inspector on itself.
 */
const EXTENSION_HOST_ENTRY_PATTERN = String.raw`[/\\]extension-host\.(ts|js)`;

/** The extension host's pid, or undefined. */
function findExtensionHostPid(): string | undefined {
  try {
    const output = execSync(`pgrep -f '${EXTENSION_HOST_ENTRY_PATTERN}' || true`, {
      encoding: 'utf8',
    });
    return (
      output
        .trim()
        .split('\n')
        .filter(Boolean)
        // Belt and braces alongside the path-separator anchor above.
        .find((pid) => pid !== String(process.pid)) || undefined
    );
  } catch {
    return undefined;
  }
}

/**
 * A loopback TCP port the given pid is listening on, which for the extension host is its inspector.
 * Uses `ss`, so this is Linux/macOS only; on Windows, read the port from the `Debugger listening
 * on` line the extension host prints into the `npm start` output and attach DevTools by hand.
 */
function findInspectorPort(pid: string): string | undefined {
  try {
    const output = execSync(`ss -tlnpH 2>/dev/null | grep "pid=${pid}," || true`, {
      encoding: 'utf8',
    });
    const match = /127\.0\.0\.1:(\d+)/.exec(output);
    return match ? match[1] : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Whether this is a non-nullish object, so a property can be read off it. `!value` stands in for a
 * `null` comparison, which the repo's `no-null` rule disallows; among values of `typeof 'object'`,
 * only `null` is falsy.
 */
function isObject(value: unknown): value is object {
  return typeof value === 'object' && !!value;
}

/** Read a property off a value of unknown shape, without asserting the whole shape. */
function readProperty(value: unknown, key: string): unknown {
  if (!isObject(value) || !(key in value)) return undefined;
  return Reflect.get(value, key);
}

/** Read a string property off a value of unknown shape. */
function readStringProperty(value: unknown, key: string): string | undefined {
  const property = readProperty(value, key);
  return typeof property === 'string' ? property : undefined;
}

/** Read a number property off a value of unknown shape. */
function readNumberProperty(value: unknown, key: string): number | undefined {
  const property = readProperty(value, key);
  return typeof property === 'number' ? property : undefined;
}

/**
 * The inspector WebSocket URL for the extension host on this port, or undefined.
 *
 * Confirms the target really is the extension host, since `NODE_OPTIONS` gives every other Node
 * process in the chain (webpack, electronmon, main) an inspector too.
 */
async function resolveExtensionHostTarget(port: string): Promise<string | undefined> {
  const response = await fetch(`http://127.0.0.1:${port}/json/list`);
  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) return undefined;
  // Anchored on a path separator for the same reason as EXTENSION_HOST_ENTRY_PATTERN.
  const target = payload.find((entry: unknown) =>
    /[/\\]extension-host\.(ts|js)$/.test(readStringProperty(entry, 'url') ?? ''),
  );
  return readStringProperty(target, 'webSocketDebuggerUrl');
}

async function waitForExtensionHostTarget(deadline: number, waitSeconds: number): Promise<string> {
  let announcedWait = false;
  while (Date.now() < deadline) {
    const pid = findExtensionHostPid();
    if (pid) {
      const port = findInspectorPort(pid);
      if (port) {
        try {
          // Polling is inherently sequential: each attempt must finish before the next.
          // eslint-disable-next-line no-await-in-loop
          const url = await resolveExtensionHostTarget(port);
          if (url) {
            report(`attached to extension host pid ${pid} on inspector port ${port}`);
            return url;
          }
        } catch {
          // Inspector is not serving HTTP yet; keep polling.
        }
      }
    }
    if (!announcedWait) {
      report('waiting for the extension host to start...');
      announcedWait = true;
    }
    // Sequential by design: this is the poll interval.
    // eslint-disable-next-line no-await-in-loop
    await sleep(TARGET_POLL_INTERVAL_MS);
  }
  throw new Error(
    `No extension-host inspector appeared within ${waitSeconds}s. Launch the app with NODE_OPTIONS="--inspect=0" (see --help).`,
  );
}

/** Minimal Chrome DevTools Protocol client over the inspector WebSocket. */
function connect(url: string) {
  const socket = new WebSocket(url);
  let lastId = 0;
  const pending = new Map<number, (result: unknown) => void>();

  socket.addEventListener('message', (event) => {
    const message: unknown = JSON.parse(String(event.data));
    const id = readNumberProperty(message, 'id');
    if (id === undefined) return;
    const resolve = pending.get(id);
    if (!resolve) return;
    pending.delete(id);
    resolve(readProperty(message, 'result'));
  });

  return {
    socket,
    /** Send a CDP command and resolve with its `result` payload. */
    send(method: string, params?: Record<string, unknown>) {
      lastId += 1;
      const id = lastId;
      return new Promise<unknown>((resolve, reject) => {
        pending.set(id, resolve);
        try {
          socket.send(JSON.stringify({ id, method, params }));
        } catch (error) {
          pending.delete(id);
          reject(error instanceof Error ? error : new Error(String(error)));
        }
      });
    },
    opened: new Promise<void>((resolve, reject) => {
      socket.addEventListener('open', () => resolve());
      socket.addEventListener('error', () => reject(new Error('Inspector socket error')));
    }),
    closed: new Promise<'closed'>((resolve) => {
      socket.addEventListener('close', () => resolve('closed'));
    }),
  };
}

/**
 * Resolve true once `mark` appears in the log after `fromByte`, false at the deadline.
 *
 * Reading only bytes appended after recording began is what keeps the same mark from a PREVIOUS
 * launch from ending the recording immediately, since `main.log` accumulates across runs.
 * electron-log rotates the file at 3MB, so a size below our starting offset means rotation happened
 * and the whole file is new again.
 */
async function waitForMark(
  logPath: string,
  mark: string,
  fromByte: number,
  deadline: number,
): Promise<boolean> {
  let offset = fromByte;
  while (Date.now() < deadline) {
    if (fs.existsSync(logPath)) {
      const { size } = fs.statSync(logPath);
      if (size < offset) {
        report('main.log rotated mid-run; reading the new file from the start');
        offset = 0;
      }
      if (size > offset && fs.readFileSync(logPath, 'utf8').slice(offset).includes(mark))
        return true;
    }
    // Sequential by design: this is the poll interval.
    // eslint-disable-next-line no-await-in-loop
    await sleep(MARK_POLL_INTERVAL_MS);
  }
  return false;
}

/** Pull the profile and its headline counts out of a `Profiler.stop` result. */
function readProfileSummary(result: unknown): ProfileSummary | undefined {
  const profile = readProperty(result, 'profile');
  if (!isObject(profile)) return undefined;
  const startTime = readNumberProperty(profile, 'startTime');
  const endTime = readNumberProperty(profile, 'endTime');
  const samples: unknown = Reflect.get(profile, 'samples');
  const nodes: unknown = Reflect.get(profile, 'nodes');
  if (startTime === undefined || endTime === undefined) return undefined;
  return {
    profile,
    sampleCount: Array.isArray(samples) ? samples.length : 0,
    frameCount: Array.isArray(nodes) ? nodes.length : 0,
    durationMs: Math.round((endTime - startTime) / 1000),
  };
}

async function main(): Promise<void> {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(USAGE);
    return;
  }
  const { options, error: argError } = parseOptions(process.argv);
  if (argError !== undefined || options === undefined) {
    console.error(argError ?? 'Could not parse arguments (see --help)');
    process.exit(1);
  }
  const { outPath, untilMark, maxSeconds, waitSeconds, intervalUs, logPath } = options;

  // Two separate budgets: waiting for the extension host to exist, then recording it. Sharing one
  // would let a slow webpack build consume the recording window and fail as if nothing were wrong.
  const client = connect(
    await waitForExtensionHostTarget(Date.now() + waitSeconds * 1000, waitSeconds),
  );
  await client.opened;

  const logStartByte = fs.existsSync(logPath) ? fs.statSync(logPath).size : 0;
  await client.send('Profiler.enable');
  await client.send('Profiler.setSamplingInterval', { interval: intervalUs });
  await client.send('Profiler.start');
  report(`recording every ${intervalUs}us; stopping on "${untilMark}" or after ${maxSeconds}s`);

  const outcome = await Promise.race([
    waitForMark(logPath, untilMark, logStartByte, Date.now() + maxSeconds * 1000),
    client.closed,
  ]);
  if (outcome === 'closed') {
    console.error(
      '[profile-extension-host] The extension host exited before the stop condition, so no profile was captured.',
    );
    process.exit(1);
  }
  report(outcome ? `saw "${untilMark}"; stopping` : `reached ${maxSeconds}s; stopping`);

  const summary = readProfileSummary(await client.send('Profiler.stop'));
  if (!summary) {
    console.error('[profile-extension-host] Profiler.stop returned no usable profile.');
    process.exit(1);
  }
  fs.writeFileSync(outPath, JSON.stringify(summary.profile));
  client.socket.close();

  report(
    `wrote ${outPath}: ${summary.durationMs}ms, ${summary.sampleCount} samples, ${summary.frameCount} call frames`,
  );
  report('open it in Chrome DevTools: F12 > Performance > drag the file onto the panel');
}

main().catch((error: unknown) => {
  console.error(`[profile-extension-host] ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
